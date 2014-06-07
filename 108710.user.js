// ==UserScript==
// @name           fs-unflag
// @namespace      http://userscripts.org/users/133663
// @description    Unflag questions automagically!
// @include        http://www.formspring.me/account/inbox
// ==/UserScript==

if(document.getElementById('flagged_link')){
	var a = parseInt(/(\d+?)/.exec(document.getElementById('flagged_link').innerHTML)[0]);
	var b = parseInt(/(\d+?)/.exec(document.getElementById('inboxCount').innerHTML)[0]);
	b += a;
	document.getElementById('inboxCount').innerHTML = b.toString();
	delete a; delete b;
	var a = new XMLHttpRequest();
	a.onreadystatechange = function(){
		if (a.readyState==4){
			if (a.status==200){
				var b = document.createElement('div');
				b.innerHTML = /"content":"(.*?)[^\\]"/.exec(a.responseText)[1].replace(/\\[nt]/g,'').replace(/\\\//g,'/').replace(/\\"/g,'"').replace(/\\u(....)/g,'&#x$1;');
				var c = document.getElementById('inbox_questions');
				c.insertBefore(b,c.firstChild);
	}	}	}
	a.open('GET','http://www.formspring.me/account/flagged/?ajax=1&class=even&flagged=true&magic=false',true);
	a.send(null);
	GM_addStyle('.inbox_delete_all{display:none;}');
}
	