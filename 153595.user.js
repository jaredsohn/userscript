<mason>
Charset=UTF-8
Author=AyuanX
Created=2010/12/23
Version=1.1
Website=http://ayuanx.web.fc2.com/
Description=(Xuite.net) Show Link without Clicking ADs
Comment=No need to click ADs to show download link
Usage=Just import this script into mason
Url=^http://webhd\.xuite\.net/_oops/\w+/\w{3}
</mason>

<script>
function _FakeADsAction()
{
	var FakeADwin = document.createElement("iframe");
	FakeADwin.style.display = 'none';
	document.body.appendChild(FakeADwin);
	FakeADwin.setAttribute('src', 'http://webhd.xuite.net/_oops/@AD?' + document.getElementById('click_ad_key').value + '&');
	setTimeout('if (getOopsFile()) document.myForm.submit();', 1000); 
	return false;
}
function _ShowLink()
{
	isClick = 1;
	//document.getElementById('download-file-begin').style.display = 'block';
	document.getElementById('download-file-begin').onclick = Function("_FakeADsAction()");
}
window.addEventListener("DOMContentLoaded", _ShowLink, false);
</script>
// ==UserScript==
// @name (Xuite.net) Show Link without Clicking ADs
// @description No need to click ADs to show download link
// ==/UserScript==