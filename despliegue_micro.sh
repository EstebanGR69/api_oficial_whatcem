    #!/bin/zsh
    USUARIO_SSH="deploy"


    IP_SERVIDOR="69.62.86.215"

    RUTA_DESTINO="/home/deploy/empresa/api_oficial"

    CARPETA_BUILD="dist"


    # 1. Detener el script si algún comando falla
    set -e

    echo "🚀 Iniciando el proceso de despliegue..."

    # 2. Construir la aplicación
    # Asegúrate de que este comando sea el correcto para tu proyecto (puede ser 'yarn build', etc.)
    echo "🏗️  Construyendo la aplicación (npm run build)..."
    npm run build

    # 3. Sincronizar la carpeta del build con el servidor usando rsync
    # rsync es más eficiente que scp, ya que solo transfiere los archivos que han cambiado.
    # La opción --delete asegura que se borren archivos viejos en la carpeta 'dist' del servidor
    # que ya no existen en el build local.
    # **Importante**: Esto no afectará a ningún otro archivo fuera de la carpeta 'dist'
    # en el servidor, como tu 'server.js'.

    echo "☁️  Sincronizando archivos con el servidor en $IP_SERVIDOR..."
    rsync -avz --delete ./$CARPETA_BUILD/ $USUARIO_SSH@$IP_SERVIDOR:$RUTA_DESTINO/$CARPETA_BUILD/

    echo "🔄 Reiniciando la aplicación con PM2..."
    ssh $USUARIO_SSH@$IP_SERVIDOR "pm2 reload api_oficial"

    echo "✅ ¡Despliegue completado exitosamente!"
    echo "Tu aplicación está ahora en: $RUTA_DESTINO/$CARPETA_BUILD"