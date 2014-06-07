// ==UserScript==
// @name         ZzZ

// ==/UserScript== 

#!/usr/bin/sh

# Script shutdown.sh
# Dar privilegios chmod +x shutdown.sh
# Ejecutar como root: sh shutdown.sh fichero.part

# Captura el fichero introducido por pantalla
FILE=$1

if [ -e $FILE ]; then

# Mientras que exista el fichero, espera 60 sec y vuelve a comprobarlo
while [ -e $FILE ]; do

echo el fichero $FILE existe
sleep 60

done

# Cuando la descarga se haya completado el fichero ya no existe y podemos apagar
echo "Descarga finalizada, apago"
shutdown -h now

else

echo "El fichero no existe"

fi
