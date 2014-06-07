// ==UserScript==
// @name           TestScript for automatic deployment of userscripts
// @namespace      http://nysoft.de
// @version        1.2
// @copyright      2012+, NySoft
// @author         Manuel Richarz
// ==/UserScript==

//THIS IS AN BASH SCRIPT AND NOT JAVASCRIPT!!!! FOR ALL THOSE WHO WANT TO AUTOMATE HIS DEPLOYMENT PROCESS TO USERSCRIPTS.ORG.

#!/bin/bash

USERNAME="[your username for userscripts.org]"
PASSWORD="[your password for userscripts.org]"
SCRIPTID="[id of your userscript you wish to upload]"
SCRIPTFILE="[path of the file to upload]"

PROTOKOL="http"
HOST="userscripts.org"
PORT="80"
CONTEXTPATH="/"
USORG="$PROTOKOL://$HOST:$PORT$CONTEXTPATH"

COOKIE="/tmp/session.cookies"
TMPFILE="/tmp/document.tmp"

echo -n "Do login to userscripts.org... "
curl --silent --cookie $COOKIE --cookie-jar $COOKIE --data "login=$USERNAME" --data "password=$PASSWORD" --data "commit=Login" --data "redirect" --data "remember_me=0" http://userscripts.org:80/sessions >/dev/null
echo "DONE"

echo -n "Uploading scriptfile... "
curl --silent --cookie $COOKIE -F "src=@$SCRIPTFILE" -F "commit=Upload" http://userscripts.org/scripts/upload/$SCRIPTID >/dev/null
echo "DONE"