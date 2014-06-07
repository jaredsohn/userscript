<mason>
Charset=UTF-8
Author=AyuanX
Created=2012/11/26
Version=1.0
Website=http://ayuanx.web.fc2.com/
Description=(ImgUr.com) Show Only the Image
Comment=Show only the image skipping server redirection
Usage=Just import this script into mason
Url=^http://imgur\.com/\w+
</mason>

<parts>
part1=^@@@L3
</parts>
<part1>
function _masonRedirect(spec)
{ return spec.replace('http://', 'http://i.') + '.jpg'; }
</part1>
// ==UserScript==
// @name (ImgUr.com) Show Only the Image
// @description Show only the image skipping server redirection
// ==/UserScript==