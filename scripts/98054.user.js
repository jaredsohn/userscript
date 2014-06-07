// ==UserScript==
// @name           No-noko
// @namespace      http://userscripts.org/users/257845
// @description    will redirect you to your post instead of main board without needing to use noko in the email freeing it up for sage and whatnot
// @include        *sys.4chan.org*
// ==/UserScript==
function Tracker(){
	if(document.title='Post successful!'){
		var str=document.getElementsByTagName('b')[0].innerHTML.match(/\d*\,no\:\d*/);
		str=str.toString();
		str=str.split(',no:');
		if(document.referrer.indexOf('/res/')!=-1)window.location.replace(document.referrer+'#'+str[1]);
		else{
			if(str[0]=='0')window.location.replace(document.referrer+'res/'+str[1]);
			else window.location.replace(document.referrer+'res/'+str.join('#'));
		}
	}
}
Tracker()