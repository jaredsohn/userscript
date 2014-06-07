// ==UserScript==
// @name           miley-bot-Marvin-Ghey-Mod
// @namespace      test
// @include        http://www.appspect.com/index.php?q=aHR0cDovL3R3ZWV0ZXJ3YWxsLm1hbGxwbGFjZS5jb20vdHcvZmFuLXNlcmllcy9taWxleS1jeXJ1cy1mYW5z&hl=0
// ==/UserScript==


// this script also works with Opera

var LIST = '@kanye @satan'; // you can add more accounts here
var REFRESH_INTERVAL = 70000; // these are milliseconds (i.e. 4 seconds)

LIST=LIST.split(' ');
function cc(n,c){
	for(var i=0,cn=n.childNodes,t;t=cn[i];i++)
		if(t.className&&t.className.indexOf(c)>=0)return t;
}
for(var i=0,j,n,as=document.getElementsByTagName('a');a=as[i++];)
	if(a.parentNode.className.indexOf('tweeter-username')>=0){
		for(j=0;j<LIST.length&&a.textContent!=LIST[j];j++);
		if(j<LIST.length){
			n=cc(cc(cc(a.parentNode.parentNode,'tweeter-picture'),'tweeter-vote'),'vote-user');
			e=document.createEvent('MouseEvent');
			e.initMouseEvent('click',1,1,window,1,12,345,7,220,0,0,1,0,0,null);
			n.dispatchEvent(e);
		}
	}
setInterval(function(){ location.reload(true); }, REFRESH_INTERVAL);