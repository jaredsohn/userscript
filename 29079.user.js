// ==UserScript==
// @name           Blackcats Signup
// @namespace      download
// @description    Automatically tries to sign you up for a Blackcats-Games account. Requires some user-interaction.
// @include        http://www.blackcats-games.net/signup.php
// ==/UserScript==

//Set prefences here:
username="user";
password="pass";
//remember that you can't use free accounts like hotmail of gmail to sign up.
email="you@isp.tld";
//0 for male, 1 for female
gender=0;

(function()
{
	if(unsafeWindow.document.forms[2]==undefined)
	{
		setTimeout("window.location.reload()",4000);
	}
	else
	{
		unsafeWindow.document.forms[2].wantusername.value=username;
		unsafeWindow.document.forms[2].wantpassword.value=password;
		unsafeWindow.document.forms[2].passagain.value=password;
		unsafeWindow.document.forms[2].email.value=email;
		unsafeWindow.document.forms[2].country.value=2;
		unsafeWindow.document.forms[2].gender[gender].checked=true;
		unsafeWindow.document.forms[2].rulesverify.checked=true;
		unsafeWindow.document.forms[2].faqverify.checked=true;
		unsafeWindow.document.forms[2].ageverify.checked=true;
		//this part doesn't work unless you have a media player plugin installed, alerts you when you got a signup
		unsafeWindow.document.body.innerHTML+="<embed autostart=true src='http://upload.wikimedia.org/wikipedia/commons/7/79/En-us-alert.ogg'>";
		unsafeWindow.document.forms[2].recaptcha_response_field.focus();
	}
})();