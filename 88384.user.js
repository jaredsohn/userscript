// ==UserScript==
// @name           fileserve.com helper
// @description    automatically opens captcha input, pressing enter submits captcha and automatic starts download afterwards.
// @namespace      V@no
// @version        1.1
// @date           2011-01-06
// @include        http://fileserve.com/file/*
// @include        http://www.fileserve.com/file/*
// ==/UserScript==

var btn = document.getElementById("regularBtn");
if (btn)
{
	unsafeWindow.popLink = "";
}
window.addEventListener('load', function()
{

	var js = <r><![CDATA[
		popLink = "";
		var simulateClick = function(el)
		{
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			return el.dispatchEvent(evt);
		};
		document.getElementById("downloadBox1").style.position="absolute";
		document.getElementById("downloadBox1").style.left="0";
		document.getElementById("downloadBox1").style.top="0";
		document.getElementById("downloadBox1").style.backgroundColor="white";
		document.getElementById("captchaArea").style.display="";
		document.getElementById("recaptcha_response_field").focus();
		simulateClick(document.getElementById("regularBtn"));
		document.getElementById("recaptcha_response_field").addEventListener("keypress", function(e)
		{
			if(e.keyCode == 13)
			{
				popLink = "";
				simulateClick(document.getElementById("regularBtn"));
			}
		}, true);


//code from download_captcha.js

		Landing.submitAfter = function(){
			$.post(Landing.dlLink, {'downloadLink': 'show'}, function(data) {
				if(data == 'fail'){
					location.reload(true);
				 }else if( data == 'fail404'){
					location.href = '/error-404.html';
				 }else{
					$("#regularLoading").hide();
					$("#regularBtn2").show();

					$("#regularBtn2").click(function(){
						$("#regularBtn2").unbind('click');
						$("#regularForm").submit();
						return false;
					});
					$("body").append(data);
					$("#regularBtn2").click(); //auto click
				}
			});
		}
	]]></r>;
	document.body.appendChild(document.createElement("script")).innerHTML = js;

}, true);