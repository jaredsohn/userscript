<mason>
Charset=UTF-8
Author=AyuanX
Created=2010/11/01
Version=1.5
Website=http://ayuanx.web.fc2.com/
Description=(LinkBucks.net) Auto Redirection
Comment=No need to wait for timer to expire and then click
Usage=Just import this script into mason
Url=^http://\w{8}\.(?:tnabucks\.com|linkbucks\.com|picbucks\.com|tinybucks\.net|tinylinks\.co|thesegalleries\.com|thesefiles\.com|theseblogs\.com|galleries\.bz|whackyvidz\.com|allanalpass\.com|fapoff\.com|youfap\.me|amy\.gs|any\.gs|dyo\.gs|rqq\.co|qqc\.co|yyv\.co|zff\.co|miniurls\.co|sexpalace\.gs|poontown\.net|hornywood\.tv|seriousdeals\.net)/
</mason>

<script>
function _GoTo() {
	Lbjs.IsClick = true;
	window.onbeforeunload = function() {};
	window.location.href = Lbjs.TargetUrl;
}
var Lbjs = {
	TargetUrl: "",
	IsClick: true,
	Init: function() { _GoTO(); }
};
window.addEventListener("DOMContentLoaded", _GoTo, false);
</script>
// ==UserScript==
// @name (LinkBucks.net) Auto Redirection
// @description No need to wait for timer to expire and then click
// ==/UserScript==