<mason>
Charset=UTF-8
Author=AyuanX
Created=2012/10/05
Updated=2013/02/06
Version=1.1
Website=http://ayuanx.web.fc2.com/
Description=(Google.com) No RWT
Comment=Disable search result redirection
Usage=Just import this script into mason
Url=^https?://www\.google\.com(?:|\.\w+)/search
</mason>

<script>
function _RemoveRWT(e) {
if (e.target.tagName === 'A')
	e.target.onmousedown = function(){};
}
window.addEventListener('mouseover', _RemoveRWT, false);
</script>
// ==UserScript==
// @name (Google.com) No Nasty Redirection
// @description Disable search result redirection
// ==/UserScript==