<mason>
Charset=UTF-8
Author=AyuanX
Created=2012/02/10
Updated=2013/03/28
Version=1.8
Website=http://ayuanx.web.fc2.com/
Description=(adf.ly) Auto Redirection
Comment=No need to wait for timer to expire and then click 
Usage=Just import this script into mason
Url=^http://(?:adf\.ly|j\.gs|q\.gs)/\w+
</mason>

<parts>
part1=^http://\w+\.\w+/\d+/\w+@@@L3
part2=^http://\w+\.\w+/(?:ad/locked\?.+|\w+)$
</parts>
<part1>
function _masonRedirect(spec)
{ return spec.replace(/http:\/\/\w+\.\w+\/\d+\//, ''); }
</part1>
<part2>
<script>
counter_started = true;
function _Done() {
window.location.href = document.getElementById('skip_button').href;
}
function _GoTo() {
document.cookie = 'FLYSESSID=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
if(easyUrl == 'true') {
setTimeout(function() {
window.location = eu;}, 500);
}
else {
document.getElementById('skip_button').addEventListener('DOMAttrModified', _Done, false);
adf_counter();
}
}
var _CurURL = window.location.href;
if (_CurURL.match(/\/ad\/locked/)) {
setTimeout(function() {
countdown = 1;
var c, ck = document.cookie.split(';');
for(c in ck) {document.cookie = c + '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';}
window.location = _CurURL.replace(/ad\/locked\?url=/, '').replace(/&t=s/, '');
}, 500);
}
else window.addEventListener("DOMContentLoaded", _GoTo, false);
</script>
</part2>


// ==UserScript==
// @name (adf.ly) Auto Redirection
// @description No need to wait for timer to expire and then click 
// ==/UserScript==