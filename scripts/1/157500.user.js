<mason>
Charset=UTF-8
Author=AyuanX
Created=2013/01/26
Updated=2013/01/26
Version=1.0
Website=http://ayuanx.web.fc2.com/
Description=(adfoc.us) Auto Redirection
Comment=No need to wait for timer to expire and then click
Usage=Just import this script into mason
Url=^http://adfoc\.us/serve/
</mason>

<parts>
part1=^http://adfoc\.us/serve/sitelinks/\?id=\d+&url=@@@L3
part2=^http://adfoc\.us/serve/\?id=
</parts>
<part1>
function _masonRedirect(spec)
{ return spec.replace(/http:\/\/.+&url=/, ''); }
</part1>
<part2>
<script>
function _GoTo() { window.location.href = click_url; }
window.addEventListener("DOMContentLoaded", _GoTo, false);
</script>
</part2>
// ==UserScript==
// @name (adfoc.us) Auto Redirection
// @description No need to wait for timer to expire and then click 
// ==/UserScript==
