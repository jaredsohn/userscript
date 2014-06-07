<mason>
Charset=UTF-8
Author=AyuanX
Created=2010/11/01
Version=1.2
Website=http://ayuanx.web.fc2.com/
Description=(ViiDii.com) Auto Redirection
Comment=No need to wait and then click for redirection
Usage=Just import this script into mason
Url=^http://www\.viidii\.com/\?http://.*&z$
</mason>

<parts>
part1=^@@@L3
</parts>
<part1>
function _masonRedirect(spec)
{ return spec.substring(23, spec.length-2).replace(/______/g, '.'); }
</part1>
// ==UserScript==
// @name (ViiDii.com) Auto Redirection
// @description No need to wait and then click for redirection
// ==/UserScript==