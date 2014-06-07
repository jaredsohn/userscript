// ==UserScript==
// @name            Hide Offline Friends on Facebook
// @author          MARC GAUTAM NAGPAL
// @namespace       http://www.doo1987.com
// @description     Hide offline friends from the new chat bar.
// @include	    http://*.facebook.com/*
// @include	    https://*.facebook.com/*
// @version         v1.5
// ==/UserScript==

if(location.hostname=='www.facebook.com'){
var w=typeof unsafeWindow!='undefined'?unsafeWindow:window;
w.addEventListener("load",function(){
w.setTimeout(function(){
	var d=w.document,
	b="_hide_offline",
	c=b+new Date().getTime(),
	k=function(){
		var h=d.getElementsByTagName('head');if(h=h&&h[0])
		if(d.getElementById(c)){
			h.removeChild(d.getElementById(c))
		}else{
			var s=d.createElement("style");
			s.setAttribute("id",c);
			s.setAttribute("type","text/css");
			s.innerHTML=".fbChatOrderedList .item,.fbChatOrderedList .mobile,.fbChatOrderedList .separator.moreOnlineFriends{display:none}.fbChatOrderedList .active,.fbChatOrderedList .idle{display:inline}";
			h.appendChild(s)
		}
	},
	i="uiMenuItem";
	if(w.localStorage[b]=="1"){k();i+=" checked"}
	w.setTimeout(function(){
	for(var n=0,t=d.getElementsByClassName("fbChatSidebarDropdown");n<t.length;n++){
		var u=t[n].getElementsByTagName("ul");
		if(u=u&&u[0])u.innerHTML='<!--<li class="uiMenuItem"></li>--><li class="'+i+'"><a tabindex="-1" class="itemAnchor '+c+'">Hide Offline Friends</a></li>'+u.innerHTML
	}
	w.setTimeout(function(){
	for(var n=0,t=d.getElementsByClassName(c);n<t.length;n++){
		t[n].addEventListener('click',function(e){
			var p=this.parentNode;
			if(p){
				var m=p.className.match(' checked');
				p.className=m?p.className.replace(' checked',''):p.className+' checked';
				w.localStorage[b]=m?"0":"1";
			}
			k();
			if(!e)e=w.event;
			if(e.stopPropagation)e.stopPropagation();else e.cancelBubble=true;
		},true)
	}
	},0)
	},0)
},0)
},false)
}