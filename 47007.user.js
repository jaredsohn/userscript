// ==UserScript==
// @name           BugMeNot auto-getter and filler.
// @namespace      #aVg
// @description    An easy one-click BugMeNotter.
// @version        0.8.2
// @license        CC by Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// @include        *
// ==/UserScript==
var u, p, curPass=-1, user=false, pass=false, key=0, gotten=false, error;
function fix(a) {
	for(var w=a.length-1;w>=0;--w) {
		a[w]=atob(a[w].substring(33)).substring(1);
		var b = "";
		for (var i = a[w].length - 1; i >=0 ; --i)
			b = String.fromCharCode(a[w].charCodeAt(i) - key) + b;
		a[w]=b;
	}
	return a;
}
function show() {
	if(!gotten) {
		for(var inputs=document.getElementsByTagName("input"), input, i=0; i < inputs.length ; ++i) {
			input=inputs[i];
			if(input.offsetHeight==0)
				continue;
			if(!pass && input.type=="password") {
				pass=input;
				if (user) break;
				continue;
			}
			if(!user) {
				if(/name|user|login|email/i.test(input.name)) user=input;
				if (pass) break;
			}
		}
		gotten=true;
	}
	if(user && pass) {
		user.value=u[curPass];
		pass.value=p[curPass];
		pass.type="text";
	}
	else
	if (confirm(
		"Autologin failed! Here are the top-rated credentials:\n\n" +
		"Username:\t" + u[curPass] + "\n" +
		"Password:\t" + p[curPass] + "\n\n" +
		"If you wish for me to add autologin for this site,\n" +
		"go to the script's page and add a comment with the link!\n\n" +
		"The url is: http://userscripts.org/scripts/show/47007\n\n" +
		"Alternatively, just email me: aavindraa@gmail.com\n\n"  +
		"Would you like to go to this script's page right now?"
	)) location.href = "http://userscripts.org/scripts/show/47007";
}
GM_registerMenuCommand("BugMeNot!", function() {
if(error) {
	alert(error);
	return;
}
if(curPass == -1) {
var site= /service=youtube/.test(location.href) ? "youtube.com" : document.domain;
GM_xmlhttpRequest({
	url : "http://www.bugmenot.com/view/" + site,
	method : "GET",
	onload : function(a) {
		++curPass;
		key=(Number(a.responseText.match(/= (\d+)/)[1]) + 112) / 12;
		if(a.responseText.indexOf("Site Blocked") > -1) {
			alert(error="The domain \"" + site + "\" is blocked by BugMeNot!");
			return;
		}
		if(a.responseText.indexOf("No Accounts") > -1) {
			alert(error="BugMeNot has no accounts logged for the domain  \""+site+"\"!");
			return;
		}
		u=fix(a.responseText.match(/Username <\/th><td><script>d\('[^']+/g));
		p=fix(a.responseText.match(/Password <\/th><td><script>d\('[^']+/g));
		show();
	}
});
} else {
	(++ curPass < u.length-1)
		? show()
		: alert("No more passwords are left in BugMeNot!");
}
});