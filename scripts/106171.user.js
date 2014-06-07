// ==UserScript==
// @name           ptest
// @namespace      http://userscripts.org/users/125050
// @description    Tests performance
// @include        http://www.venly.org/index.php/Main_Page
// ==/UserScript==
#!/bin/sh
PROFILE=ptest
FIREFOX=firefox

touch empty.html
#ignore the first two runs
$FIREFOX -P $PROFILE -no-remote empty.html?trunc=true\&close=true#start:`python -c 'import time; print int(time.time() * 1000);'`
$FIREFOX -P $PROFILE -no-remote empty.html?trunc=true\&close=true#start:`python -c 'import time; print int(time.time() * 1000);'`
$FIREFOX -P $PROFILE -no-remote empty.html?trunc=true\&close=true#start:`python -c 'import time; print int(time.time() * 1000);'`
for x in `seq 10` ; do
$FIREFOX -P $PROFILE -no-remote empty.html?close=true#start:`python -c 'import time; print int(time.time() * 1000);'`
done
$FIREFOX -P $PROFILE -no-remote empty.html?calc=true\&close=true#start:`python -c 'import time; print int(time.time() * 1000);'`