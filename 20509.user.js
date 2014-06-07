// ==UserScript==
// @name           Inbox killer
// @namespace      blablabla
// @description    Delete the inbox without visiting it
// @include        http://leprosorium.ru/my/inbox/
// @include        http://www.leprosorium.ru/my/inbox/
// ==/UserScript==

// functions
function deleteInbox()
{
	var id = this.getAttribute('inboxid');
	var span = document.createElement('span');
	span.innerHTML = '[...]';
	this.style.display = 'none';
	this.parentNode.insertBefore(span, this);
	GM_xmlhttpRequest({
		method: 'POST',
		data: 'wtf=a27e84a2fadc9e1f196842ba1dfbe6b0&run=1&pid=0',
		url: 'http://leprosorium.ru/my/inbox/delete/'+id,
		headers: {
			'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey mcm69',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		onload: function (responseDetails){
			if(responseDetails.status == 200)
			{
				removediv(id)
			}
			else
			{
				span.style.color='red';
				span.innerHTML='[error]';
			}
		}
	})
}

function removediv(id)
{
	var mydiv = document.getElementById('p'+id.toString());
	mydiv.parentNode.removeChild(mydiv);
}

// attach

var all = document.getElementsByTagName('a')
		for (var i = 0, o; o = all[i]; i++) {
			if((o.href.indexOf('/my/inbox/')!=-1)&&(o.parentNode.tagName == 'SPAN')&&(o.href.indexOf('#new')==-1))
			{
				var href=o.href;
				href = href.substr(href.length-6,6);
				var a = document.createElement('a');
				a.setAttribute('inboxid', href);
				a.href='javascript:void(0);';
				a.innerHTML = '[kill]';
				o.parentNode.appendChild(a);
				a.addEventListener('click', deleteInbox, true);
				
				
			}
		}