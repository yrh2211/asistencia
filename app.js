// Registrar Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').catch(err => {
    console.log('Service Worker error:', err);
  });
}

// Bloquear botón atrás del navegador
document.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace') {
    e.preventDefault();
  }
});

// Prevenir gestos de atrás en Android
let touchStartX = 0;
document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].screenX;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 100) {
    e.preventDefault();
  }
});

// Variables globales
let cameraStream = null;
let lastPhotoData = null;
let deferredPrompt = null;

// Referencias DOM
const cedula = document.getElementById('cedula');
const startCameraBtn = document.getElementById('startCameraBtn');
const captureBtn = document.getElementById('captureBtn');
const closeCameraBtn = document.getElementById('closeCameraBtn');
const clearBtn = document.getElementById('clearBtn');
const submitBtn = document.getElementById('submitBtn');
const exportBtn = document.getElementById('exportBtn');
const cameraContainer = document.getElementById('cameraContainer');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photoPreview = document.getElementById('photoPreview');
const status = document.getElementById('status');
const recordsList = document.getElementById('recordsList');
const checkInBtn = document.getElementById('checkInBtn');
const currentTime = document.getElementById('currentTime');
const currentDate = document.getElementById('currentDate');
const installBanner = document.getElementById('installBanner');
const installBtn = document.getElementById('installBtn');

// Función: Actualizar hora
function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  currentTime.textContent = `${hours}:${minutes}:${seconds}`;
  
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateStr = now.toLocaleDateString('es-CO', options);
  currentDate.textContent = dateStr;
}

// Función: Mostrar estado
function showStatus(message, type) {
  status.textContent = message;
  status.className = 'status ' + type;
  setTimeout(() => {
    status.className = 'status';
  }, 4000);
}

// Función: Cargar registros
function loadRecords() {
  const records = JSON.parse(localStorage.getItem('asistencia_records') || '[]');
  recordsList.innerHTML = '';
  
  if (records.length === 0) {
    recordsList.innerHTML = '<div class="empty">Sin registros de asistencia</div>';
    exportBtn.style.display = 'none';
  } else {
    records.reverse().forEach((record, index) => {
      const item = document.createElement('div');
      item.className = 'record-item';
      const date = new Date(record.timestamp);
      const timeStr = date.toLocaleString('es-CO');
      item.innerHTML = `
        <div class="cedula">Cédula: ${record.cedula}</div>
        <div class="time">${timeStr}</div>
        <div class="actions">
          <button onclick="deleteRecord(${records.length - 1 - index})">Eliminar</button>
        </div>
      `;
      recordsList.appendChild(item);
    });
    exportBtn.style.display = 'block';
  }
}

// Función: Eliminar registro
function deleteRecord(index) {
  const records = JSON.parse(localStorage.getItem('asistencia_records') || '[]');
  records.splice(index, 1);
  localStorage.setItem('asistencia_records', JSON.stringify(records));
  loadRecords();
  showStatus('✓ Registro eliminado', 'success');
}

// Hacer deleteRecord global
window.deleteRecord = deleteRecord;

// Evento: Abrir cámara
startCameraBtn.addEventListener('click', async () => {
  cedula.value = cedula.value.trim();
  
  if (!cedula.value) {
    showStatus('⚠️ Ingresa el número de cédula', 'error');
    return;
  }
  
  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({ 
      video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } 
    });
    video.srcObject = cameraStream;
    cameraContainer.classList.add('show');
    startCameraBtn.style.display = 'none';
  } catch (err) {
    showStatus('❌ No se pudo acceder a la cámara', 'error');
    console.error(err);
  }
});

// Evento: Capturar foto
captureBtn.addEventListener('click', () => {
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0);
  lastPhotoData = canvas.toDataURL('image/jpeg', 0.8);
  photoPreview.src = lastPhotoData;
  photoPreview.style.display = 'block';
  checkInBtn.style.display = 'block';
  showStatus('✓ Foto capturada', 'success');
});

// Evento: Cerrar cámara
closeCameraBtn.addEventListener('click', () => {
  if (cameraStream) {
    cameraStream.getTracks().forEach(track => track.stop());
  }
  cameraContainer.classList.remove('show');
  startCameraBtn.style.display = 'block';
  photoPreview.style.display = 'none';
  checkInBtn.style.display = 'none';
  lastPhotoData = null;
});

// Evento: Registrar asistencia
submitBtn.addEventListener('click', () => {
  if (!cedula.value.trim()) {
    showStatus('⚠️ Ingresa la cédula', 'error');
    return;
  }
  
  const record = {
    cedula: cedula.value.trim(),
    timestamp: new Date().toISOString(),
    photo: lastPhotoData
  };
  
  const records = JSON.parse(localStorage.getItem('asistencia_records') || '[]');
  records.push(record);
  localStorage.setItem('asistencia_records', JSON.stringify(records));
  
  showStatus('✅ Asistencia registrada correctamente', 'success');
  
  cedula.value = '';
  lastPhotoData = null;
  photoPreview.style.display = 'none';
  checkInBtn.style.display = 'none';
  
  if (cameraStream) {
    cameraStream.getTracks().forEach(track => track.stop());
  }
  cameraContainer.classList.remove('show');
  startCameraBtn.style.display = 'block';
  
  loadRecords();
});

// Evento: Limpiar
clearBtn.addEventListener('click', () => {
  cedula.value = '';
  photoPreview.style.display = 'none';
  checkInBtn.style.display = 'none';
  lastPhotoData = null;
});

// Evento: Exportar a Excel
exportBtn.addEventListener('click', () => {
  const records = JSON.parse(localStorage.getItem('asistencia_records') || '[]');
  
  if (records.length === 0) {
    showStatus('⚠️ No hay registros para exportar', 'error');
    return;
  }
  
  const data = records.map(record => ({
    'Cédula': record.cedula,
    'Fecha': new Date(record.timestamp).toLocaleDateString('es-CO'),
    'Hora': new Date(record.timestamp).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }));
  
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Asistencia');
  
  worksheet['!cols'] = [
    { wch: 18 },
    { wch: 15 },
    { wch: 15 }
  ];
  
  const fileName = 'Asistencia_' + new Date().toISOString().split('T')[0] + '.xlsx';
  XLSX.writeFile(workbook, fileName);
  showStatus('✅ Excel descargado: ' + fileName, 'success');
});

// Evento: Instalar PWA
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBanner.classList.add('show');
});

installBtn.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Usuario respondió: ${outcome}`);
    deferredPrompt = null;
    installBanner.classList.remove('show');
    if (outcome === 'accepted') {
      showStatus('✅ App instalada correctamente', 'success');
    }
  }
});

// Inicialización
updateTime();
setInterval(updateTime, 1000);
loadRecords();

// Prevenir zoom
document.addEventListener('touchmove', (e) => {
  if (e.touches.length > 1) {
    e.preventDefault();
  }
}, { passive: false });

// Pantalla completa (opcional)
window.addEventListener('load', () => {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen().catch(err => {
      console.log('Fullscreen no disponible');
    });
  }
});
