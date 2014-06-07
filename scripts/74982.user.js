// ==UserScript==
// @name           Facebook Groups Utility
// @namespace      FacebookGroupsUtility
// @include        http://*.facebook.com/*
// ==/UserScript==





function LeaveAllGroups() {
	var leaveAllText=document.getElementById('leaveAllText');
	var textSearch=leaveAllText.value.toLowerCase();
	IterateGroupLinks(function(href,gid) {
		if(href.innerHTML.toLowerCase().indexOf(textSearch)<0) return;
		LeaveGroup(gid);
		href.style.border='2px solid #008';
	});
}

function LeaveGroup(gid) {
	addScript("new AsyncRequest().setURI('/ajax/group_actions_ajax.php').setData({"+
		"gid: "+gid+",remove: 1"+
		"}).send();"
	);
}

function IterateGroupLinks(f) {
	if(!document.body) return;
	var as=document.body.getElementsByTagName('a');
	for(var a=0; a<as.length; a++) {
		var href=as[a];
		if(!href.href) continue;
		if(href.href.indexOf('group.php')<0) continue;
		if(href.href.indexOf('gid=')<0) continue;
		var imgs=href.getElementsByTagName('img');
		if(imgs.length>0) continue;
		var m=/gid=([0-9]+)/.exec(href.href);
		if(!m) continue;

		f(href,m[1]);
	}
}

function LeaveGroupLinks() {
	var leaveAll=document.getElementById('leaveAllGroups');
	if(!leaveAll) {
		var ca=document.getElementById('contentArea');
		if(ca) {
			leaveAll=document.createElement('input');
			leaveAll.type='button';
			leaveAll.id='leaveAllGroups';
			leaveAll.value='Leave All Groups with this text:';
			leaveAll.href='javascript:;';
			leaveAll.addEventListener('click',function() {
				LeaveAllGroups();
			},false);
			leaveAllText=document.createElement('input');
			leaveAllText.id='leaveAllText';
			ca.insertBefore(leaveAllText,ca.childNodes[0]);
			ca.insertBefore(leaveAll,ca.childNodes[0]);
		}
	}

	IterateGroupLinks(function(href,gid) {
		if(href.nextSibling && href.nextSibling.className && href.nextSibling.className.indexOf('leaveGroup')>=0) return;
		var leaveA=document.createElement('a');
		leaveA.className='leaveGroup';
		leaveA.innerHTML=' (Leave Group)';
		leaveA.href='javascript:;';
		leaveA.setAttribute('gid',gid);

		leaveA.addEventListener('click',function() {
			var b = this.getAttribute('gid');
			LeaveGroup(b);
		},false);
		//.setHandler(goURI.bind(null, a))
		href.parentNode.insertBefore(leaveA,href.nextSibling);
	});
	
	window.setTimeout(function() {
		LeaveGroupLinks();
	},3000);
}


function addScript(script){
	var a = document.createElement('script');
	a.innerHTML = script;
	document.body.appendChild(a);
}



LeaveGroupLinks();



