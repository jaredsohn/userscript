<mason>
Charset=UTF-8
Author=eph
Created=2013/03/12
Updated=
Version=1.0
Website=
Comment=
Description=S1 Redirector
Usage=
Url=^http://(bbs|www)\.(stage1st|saraba1st|buguanshiyuminghaishiipdoubunengfangwen)\.com/
</mason>
<parts>
part1=.@@@L3
</parts>
<part1>
function _masonRedirect(spec){
return spec.replace(/^http:\/\/[^\/]+/, "http://220.196.42.172");
}
</part1>

// ==UserScript==
// @name        Stage1st Redirector
// @namespace   eph
// @description Redirect to newest IP address
// ==/UserScript==