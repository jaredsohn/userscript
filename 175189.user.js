<mason>
Charset=UTF-8
Author=AyuanX
Created=2013/07/07
Updated=2013/07/07
Version=1.0
Website=http://ayuanx.nazuka.com/
Description=(YunFile.com) No Timer Wait
Comment=No need to wait for timer to expire and then click
Usage=Just import this script into mason
Url=^http://page\d\.yunfile\.com/(?:fs|file)/\w+/
</mason>

<parts>
part1=^.*/$
part2=^.*\.html$
</parts>
<part1>
<script>
function _GoTo1() {
document.getElementById('slow_button').onclick = redirectDownPage;
}
window.addEventListener("DOMContentLoaded", _GoTo1, false);
</script>
</part1>
<part2>
<script>
function _GoTo2() {
doDownload = function(){return true;};
}
window.addEventListener("DOMContentLoaded", _GoTo2, false);
</script>
</part2>

// ==UserScript==
// @name (YunFile.com) No Timer Wait
// @description No need to wait for timer to expire and then click
// ==/UserScript==
