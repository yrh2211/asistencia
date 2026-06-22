═══════════════════════════════════════════════════════════════════
  CONTROL DE ASISTENCIA DAMUR CONSTRUCTORA
  Guía de Instalación y Configuración
═══════════════════════════════════════════════════════════════════

CONTENIDO DE ARCHIVOS:
├── index.html .................... Página principal de la app
├── app.js ........................ Lógica de la aplicación
├── manifest.json ................. Configuración PWA
├── service-worker.js ............. Funcionalidad sin internet
└── README.txt .................... Este archivo

═══════════════════════════════════════════════════════════════════
PASO 1: SUBIR ARCHIVOS A UN SERVIDOR (Opción A - Recomendada)
═══════════════════════════════════════════════════════════════════

Si tienes acceso a un servidor web (como GitHub Pages, Firebase, Netlify):

1. Crea una carpeta llamada "asistencia"
2. Sube TODOS los archivos (index.html, app.js, manifest.json, service-worker.js)
3. Accede desde el celular a: https://tudominio.com/asistencia/

NOTA: El sitio DEBE ser HTTPS (no HTTP) para que funcione como PWA


═══════════════════════════════════════════════════════════════════
PASO 2: INSTALAR EN EL CELULAR ANDROID
═══════════════════════════════════════════════════════════════════

A) OPCIÓN 1: Instalar como PWA (Recomendado)
   ────────────────────────────────────────
   1. Abre Chrome en el Android
   2. Entra a la URL de tu aplicación
   3. Espera a que aparezca el banner "📱 Instalar como app"
   4. Toca el botón "Instalar ahora"
   5. ✅ La app aparecerá en tu pantalla principal


B) OPCIÓN 2: Guardar página como archivo local
   ──────────────────────────────────────────
   1. En el celular, crea una carpeta llamada "Asistencia"
   2. Guarda todos los archivos HTML/JS ahí
   3. Abre el archivo index.html con Chrome
   
   ⚠️ NOTA: Sin servidor HTTPS, algunas funciones pueden no funcionar


═══════════════════════════════════════════════════════════════════
PASO 3: BLOQUEAR LA APLICACIÓN (KIOSK MODE)
═══════════════════════════════════════════════════════════════════

Para que los empleados no puedan salir de la app:

MÉTODO A: SCREEN PINNING (Android 5+) - SIN APP EXTERNA
────────────────────────────────────────────────────────
1. Ve a: Ajustes > Seguridad > Pantalla bloqueada y seguridad
2. Busca "Screen Pinning" o "Bloqueo de aplicaciones"
3. Actívalo
4. Abre la app de Asistencia
5. Abre el menú de apps recientes (arriba del botón de home)
6. Mantén presionada la app "Asistencia"
7. Selecciona "Fijar en pantalla" o "Pin this app"
8. ✅ Ahora solo se verá esta app


MÉTODO B: MODO NIÑO (Si tiene controles parentales)
───────────────────────────────────────────────────
1. Ve a: Ajustes > Control Parental
2. Activa "Modo Niño"
3. Selecciona SOLO la app de Asistencia
4. Establece contraseña de salida
5. ✅ Solo accesible desde esta app


MÉTODO C: CONTRASEÑA DE SEGURIDAD
─────────────────────────────────
1. Ve a: Ajustes > Seguridad > Bloqueo de pantalla
2. Establece una contraseña o PIN
3. Ve a: Desarrollador > Aplicaciones > Asistencia
4. Activa "Bloquear ajustes"
5. ✅ Requerirá contraseña para cambios


═══════════════════════════════════════════════════════════════════
PASO 4: CONFIGURACIÓN RECOMENDADA DEL DISPOSITIVO
═══════════════════════════════════════════════════════════════════

Para mejor experiencia:

1. PANTALLA:
   - Brillo: Máximo
   - Rotación: Bloqueada en Vertical
   - Timeout: Nunca apague la pantalla (mientras está en use)

2. SONIDO:
   - Volumen: Máximo (para confirmaciones)
   - Modo: Normal o Vibración

3. CONEXIÓN:
   - WiFi: Conectada (recomendado)
   - Bluetooth: Desactivado
   - Datos: Activados (como backup)

4. CÁMARA:
   - Permisos: Permitir acceso
   - Resolución: Alta

5. ALMACENAMIENTO:
   - Mínimo 100 MB libre


═══════════════════════════════════════════════════════════════════
USO DE LA APLICACIÓN
═══════════════════════════════════════════════════════════════════

REGISTRO DE ASISTENCIA:
────────────────────
1. Ingresa el número de cédula del empleado
2. Toca "Abrir Cámara"
3. Colócate frente a la cámara (o el empleado)
4. Toca "Capturar Foto" cuando esté bien enfocado
5. Verifica la foto
6. Toca "Registrar Asistencia"
7. ✅ Se registrará la hora automáticamente


CONSULTAR REGISTROS:
──────────────────
- Desplázate hacia abajo en la app
- Verás todos los registros del día
- Puedes eliminar registros individuales si es necesario


EXPORTAR A EXCEL:
───────────────
1. Toca el botón "⬇️ Exportar a Excel"
2. Se descargará un archivo: Asistencia_YYYY-MM-DD.xlsx
3. Abre en Excel o Sheets
4. ✅ Incluye: Cédula, Fecha, Hora


═══════════════════════════════════════════════════════════════════
FUNCIONALIDADES
═══════════════════════════════════════════════════════════════════

✅ Captura de foto con cámara frontal
✅ Registro automático de fecha y hora
✅ Almacenamiento en el celular (no pierde datos)
✅ Exportación a Excel
✅ Funciona SIN internet (offline-first)
✅ Pantalla completa sin navegador
✅ Bloqueo de botón atrás
✅ Compatible con Android 5+


═══════════════════════════════════════════════════════════════════
SOLUCIÓN DE PROBLEMAS
═══════════════════════════════════════════════════════════════════

PROBLEMA: La cámara no funciona
─────────────────────────────
→ Ve a Ajustes > Aplicaciones > Chrome > Permisos > Cámara
→ Asegúrate de que está permitida


PROBLEMA: No puedo exportar a Excel
──────────────────────────────────
→ Verifica que haya registros de asistencia
→ Intenta desde un navegador diferente (Firefox, Samsung Internet)


PROBLEMA: La app se cierra sola
───────────────────────────────
→ Reinicia el dispositivo
→ Borra el cache de Chrome: Ajustes > Apps > Chrome > Almacenamiento > Borrar datos


PROBLEMA: Screen Pinning no aparece
──────────────────────────────────
→ Es una característica de Android 5+
→ Si no ves la opción, tu dispositivo podría no soportarlo
→ Usa el "Modo Niño" como alternativa


PROBLEMA: No puedo entrar a la URL en el navegador
──────────────────────────────────────────────────
→ Verifica que el servidor esté en línea
→ Comprueba que la URL sea HTTPS (no HTTP)
→ Reinicia la conexión WiFi


═══════════════════════════════════════════════════════════════════
RESPALDO Y SEGURIDAD
═══════════════════════════════════════════════════════════════════

HACER BACKUP:
─────────────
1. Exporta los registros a Excel regularmente
2. Guarda los archivos en Google Drive o nube
3. Realiza backups semanales


LIMPIAR REGISTROS:
──────────────────
1. Toca "Limpiar" para vaciar el campo de cédula
2. Para eliminar un registro: Toca "Eliminar" en el registro
3. Para borrar TODOS los registros:
   - En Chrome: Ajustes > Apps > Almacenamiento del sitio > Vaciar todo


═══════════════════════════════════════════════════════════════════
SOPORTE TÉCNICO
═══════════════════════════════════════════════════════════════════

Si tienes problemas o sugerencias:

1. Documenta el error (qué intentaste, qué pasó)
2. Toma un screenshot
3. Intenta en otro navegador (Firefox, Samsung Internet)
4. Reinicia el dispositivo
5. Contacta al desarrollador con los detalles


═══════════════════════════════════════════════════════════════════
VERSIÓN: 1.0
ÚLTIMA ACTUALIZACIÓN: Junio 2026
DESARROLLADO PARA: DAMUR CONSTRUCTORA S.A.S.
═══════════════════════════════════════════════════════════════════
