noflash_hide="<!--"/*        ## Active: bash ##
###############################################################################
#
# Copyright (C) 2013  Bilgehan Uygar Oztekin
# Licence: GPLv3
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
###############################################################################
#
# NoFlash. Watch online videos using mplayer, quvi, youtube-dl etc.
#
# Developed on debian testing / firefox. No plans to support non-unix systems.
#
# Requires: netcat(openbsd or traditional), quvi (+ grep, awk, sed etc.).
# Optional: mplayer firefox youtube-dl greasemonkey (xul-ext-greasemonkey)
# apt-get install netcat-openbsd quvi youtube-dl mplayer2 xul-ext-greasemonkey
#
###############################################################################
# Parameters

PLAYER="mplayer -fs -really-quiet -slave -input file=/tmp/noflash.mp.fifo 2>/dev/null"
ONE_PLAYER_INSTANCE="1"
QUVI_OPTS="-f best"
YTDL_OPTS="-f best"

# For security, bind to localhost by default. If you want the server and client
# to be on separate machines, set NOFLASH_SERVER to server's IP number.
# These two parameters are parsed by bash and greasemonkey.
# *///                       ## Active: bash, greasemonkey ##
NOFLASH_SERVER="127.0.0.1"
NOFLASH_PORT="9000"

noflash_hide=""/*            ## Active: bash ##
###############################################################################

echo "NoFlash  Copyright (C) 2013  Bilgehan Uygar Oztekin,  License: GPLv3"

INFO="Watch online videos without flash using mplayer, quvi, youtube-dl etc.

This script is a valid bash script, greasemonkey (gm) script, and an html page.
- As a bash script, becomes a web server accepting the following request types:
  - http://*  -> Play a remote video extracted from URL.
  - file://*  -> Play a local video at the specified path.
  - mplayer:* -> Send command to mplayer running in slave mode.
- Server has a basic web interface to control mplayer, submit URLs, or download
  a js bookmarklet and/or a gm script.  Gm script pings the server with visited
  web pages (http only).  Js bookmarklet sends the current page when clicked on.

How to use it:
- On server, run this as a bash script (e.g. bash `basename $0`).
- On client (can be the same machine), go to http://$NOFLASH_SERVER:$NOFLASH_PORT
  and install the javascript bookmarklet and/or the greasemonkey script.
- With the gm script, videos from supported sites should start automatically as
  you browse.  If you prefer to use the js bookmarklet, click on it to initiate.
- Server binds to localhost only by default.  Change NOFLASH_SERVER to server's
  IP to be able to access and remote control it from other computers (clients).
- See http://www.cs.umn.edu/~oztekin/software/noflash for more information."

echo -e "$INFO\n\nServer listening on http://$NOFLASH_SERVER:$NOFLASH_PORT"
which youtube-dl &>/dev/null || which quvi &>/dev/null || \
(echo -e "\nError: NoFlash requires youtube-dl and/or quvi but none were detected. Aborting.\n" && exit 0)

# Create the fifos we will use.
NCFIFO=/tmp/noflash.nc.fifo && [ -p $NCFIFO ] || mkfifo $NCFIFO
MPFIFO=/tmp/noflash.mp.fifo && [ -p $MPFIFO ] || mkfifo $MPFIFO
trap "rm $NCFIFO $MPFIFO" EXIT

YTDL_PAT=`youtube-dl --list-extractors 2>/dev/null | sort | grep -vE "vimeo|generic" | grep -v ':\|(' | awk '{printf"|%s",tolower($1)}' | sed 's/^|//g'`

function kill_players {
  [ "$ONE_PLAYER_INSTANCE" == "1" ] && fuser -TERM -k -w $MPFIFO &>/dev/null || true;
  rm $MPFIFO &>/dev/null ; mkfifo $MPFIFO
}

# Start the web server
while true ; do
  ( cat $NCFIFO ) | nc -l $NOFLASH_SERVER -p $NOFLASH_PORT | (
    TYPE="plain" && DOC=""
    REQ=`while read L && [ " " "<" "$L" ] ; do echo "$L" ; done`
    URL=`echo "$REQ" | grep '^GET /' | awk '{print $2}' | sed 's#^/##g'`
    URL=`echo -e $(echo "$URL" | sed -e's/%\([0-9A-F][0-9A-F]\)/\\\\\x\1/g')`
    case $URL in
      noflash.sh|noflash.user.js) DOC=`cat $0`;;
      mplayer:*)
        COMMAND=`echo "$URL" | sed 's/^mplayer://g' `
        [ -n "$COMMAND" ] && MSG="mplayer:$COMMAND" && (echo $COMMAND > $MPFIFO &)
        DOC="exec: $COMMAND"
        ;;
      http://*)
        if quvi --verbosity=mute --support $URL 2>/dev/null ; then
          DOC="1 (quvi) $URL" && kill_players
          quvi --verbosity=mute $QUVI_OPTS --exec "$PLAYER %u &>/dev/null" "$URL" &>/dev/null &
          sleep 1
        elif echo "$URL" | grep -qE "$YTDL_PAT" ; then
          VID=`youtube-dl -g $YTDL_OPTS "$URL" 2>/dev/null`
          [ -n "$VID" ] && DOC="1 (ytdl) $URL" && kill_players && ($PLAYER "$VID" &>/dev/null &)
          sleep 1
        fi
        ;;
      file://*) VID=`echo $URL | sed 's#^file://##g'`
        DOC="0 $URL" && [ -f "$VID" ] && kill_players && ($PLAYER "$VID" &>/dev/null &) && DOC="1 $URL"
        ;;
      *) TYPE="html" && DOC=`cat $0`
        ;;
    esac
    [ -n "$DOC" ] && [ -n "$URL" ] && echo "$URL"

    cat >$NCFIFO <<EOF
HTTP/1.0 200 OK
Cache-Control: private
Content-Type: text/$TYPE
Server: noflash/1.0
Connection: Close
Content-Length: ${#DOC}

$DOC
EOF
  )
done
exit 0
# *///                       ## Active: greasemonkey ##

// ==UserScript==
// @name NoFlash - Watch Online Videos with Mplayer
// @namespace Bilgehan Uygar Oztekin
// @include http://*
// @grant none
// ==/UserScript==

//                           ## Active: greasemonkey + html ## --><script>
function noflash_send(param) {
  async = true;
  noflash_ajax = new XMLHttpRequest();
  noflash_ajax.open("GET", param, true);
  if (document.getElementById("noflash_response") != null) {
    noflash_ajax.onreadystatechange = function() {
      if (noflash_ajax.readyState==4 && noflash_ajax.status==200) {
        clearTimeout(noflash_send.timeout);
        document.getElementById("noflash_response").innerHTML=noflash_ajax.responseText;
        noflash_send.timeout = setTimeout('document.getElementById("noflash_response").innerHTML=""', 5000);
      }
    }
  }
  noflash_ajax.send();
}
// </script><!--             ## Active: greasemonkey ##

noflash_send("http://" + NOFLASH_SERVER + ":" + NOFLASH_PORT + "/" + window.location, true);

/*                           ## Active: html ## -->
<script>var usage = document.body.innerHTML.match(/INFO="([^"]*)"/)[1];document.body.innerHTML="";</script>
<style>
body { background-color:#fff; color:#000066; font-family:sans-serif,verdana,helvetica,arial; }
table { box-shadow:2px 2px 3px #aaaaaa; padding:10px 10px 10px 10px; margin:10px; border:1px solid #BFBFBF; }
input { box-shadow:1px 1px 1px #aaaaaa; }
a { color:#000066; text-shadow: 1px 1px 1px #aaaaaa; }
a:hover { color:#000066; text-shadow: 2px 2px 4px #aaaaaa; }
b { text-shadow: 1px 1px 1px #aaaaaa; }
</style>
<div align=center><table><tr><td rowspan=2>
<b>Mplayer RC</b></td><td>
<input type="button" value="<<" onclick="noflash_send('/mplayer:seek -60 0')">
<input type="button" value="<" onclick="noflash_send('/mplayer:seek -10 0')">
<input type="button" value="||" onclick="noflash_send('/mplayer:pause')">
<input type="button" value=">" onclick="noflash_send('/mplayer:seek +10 0')">
<input type="button" value=">>" onclick="noflash_send('/mplayer:seek +60 0')">
<input type="button" value="-" onclick="noflash_send('/mplayer:volume -10')">
<input type="button" value="+" onclick="noflash_send('/mplayer:volume +10')">
<input type="button" value="OSD" onclick="noflash_send('/mplayer:osd')">
<input type="button" value="Quit" onclick="noflash_send('/mplayer:quit')"></td></tr>
<tr><td><form style="display:inline" onsubmit="noflash_send('/mplayer:' + document.getElementById('command').value);return false;">
<a target='_blank' href='http://www.mplayerhq.hu/DOCS/tech/slave.txt'>Command</a>: <input id="command" type="text" size=10></form></td></tr>
<form style="display:inline" onsubmit="noflash_send('/' + document.getElementById('url').value);return false;">
<tr><td><b>Play URL</b></td><td><input id="url" type="text" size="40"></form>
<tr><td><b>Bookmarklet</b></td><td><script>
var a = document.createElement('a'); a.href = window.location; var url = a.protocol + "//" + a.host + '/';
document.write("<a href='javascript:r=new XMLHttpRequest(); r.open(\"GET\", \"" + url +"\"+window.location, true); r.send();'>noflash</a>");
</script></td></tr>
<tr><td><b>Greasemonkey</b></td><td><a href='/noflash.user.js'>noflash.user.js</a></td></tr>
<tr><td><b>Bash script</b></td><td><a href='/noflash.sh'>noflash.sh</a></td></tr>
</table></div>
<script>document.write("<div align=center><table><tr><td><pre>" + usage + "</pre>" +
"<a href='http://www.cs.umn.edu/~oztekin/software/noflash'>NoFLash</a>, " +
"Copyright (C) 2013 <a href='http://www.cs.umn.edu/~oztekin'>Bilgehan Uygar Oztekin</a>, " +
"License: <a href='http://www.gnu.org/licenses/gpl.html'>GPLv3</a></td></tr></table></div>");</script>
<div id="noflash_response" style='position:absolute; bottom:0;'> </div>
<!-- *///                    ## Active: none ## -->
