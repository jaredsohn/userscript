<mason>
Charset=UTF-8
Author=AyuanX
Created=2012/9/19
Version=1.0
Website=http://ayuanx.web.fc2.com/
Description=(qjwm.com) Skip verificaion code
Comment=No need to input verification code to be redirected to the true link
Usage=Just import this script into mason
Url=^http://\w+\.qjwm\.com/download
</mason>

<script>
function _ShowLink() {
	yzm = '';
	check_yzm('downinput');
}
window.addEventListener('DOMContentLoaded', _ShowLink, false);
</script>
// ==UserScript==
// @name (qjwm.com) Skip verificaion code
// @description No need to input verification code to be redirected to the true link
// ==/UserScript==
