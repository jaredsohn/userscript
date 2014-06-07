// ==UserScript==
// @name           PosTab
// @namespace      http://userscripts.org/users/257845
// @description    This converts the post at 4chan from on the top of the page to a fixed translucent tab attached to the right of the page that expands when hovered over so you don't have to scroll to the top to post
// @include        *boards.4chan.org*
// ==/UserScript==
if(document.title!='4chan - 404'){
	window.location.href="javascript:void(d2p=new Object())";
	window.location.href="javascript:void(d2p.div=document.getElementsByTagName('form')[0].parentNode)";
	window.location.href="javascript:void(d2p.comment=document.getElementsByTagName('form')[0].elements['com'].value)";
	window.location.href="javascript:void(d2p.collapse='<div class=\"postblock\" style=\"display:table;height:100%;margin:0;border:none\"><p style=\"display:table-cell;vertical-align:middle;font-size:16px;font-weight:bold\">P<br>O<br>S<br>T</p></div>')";
	window.location.href="javascript:void(d2p.dform=document.getElementsByTagName('form')[0].parentNode.innerHTML.replace(/action/,'style=\"display:table-cell;vertical-align:middle\" action'))";
	window.location.href="javascript:void(d2p.toggel='<div onmouseover=\"this.style.opacity=\\'1\\';this.style.MozOpacity=\\'1\\';this.children[1].style.display=\\'none\\';this.children[0].style.display=\\'table\\';\" onmouseout=\"this.style.opacity=\\'.50\\';this.style.MozOpacity=\\'.50\\';this.children[0].style.display=\\'none\\';this.children[1].style.display=\\'table\\';\" style=\"background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABBJREFUeNpi+P///waAAAMACawDrvCCI1YAAAAASUVORK5CYII=);border:1px solid #000000;-moz-opacity:.50;opacity:.50\"><div style=\"display:none;height:100%\">'+d2p.dform+'</div>'+d2p.collapse+'</div>')";
	window.location.href="javascript:void(d2p.div.style.display='block')";
	window.location.href="javascript:void(d2p.div.style.position='fixed')";
	window.location.href="javascript:void(d2p.div.style.right='0px')";
	window.location.href="javascript:void(d2p.div.style.top='10%')";
	window.location.href="javascript:void(d2p.div.style.height='80%')";
	window.location.href="javascript:void(d2p.div.style.padding='0px')";
	window.location.href="javascript:void(d2p.div.removeChild(d2p.div.children[0]))";
	window.location.href="javascript:void(d2p.div.innerHTML=d2p.toggel)";
	window.location.href="javascript:void(document.getElementsByTagName('form')[0].elements['com'].value=d2p.comment)";
	window.location.href="javascript:if(window.location.hash.search(/^#q.*/)==0){void(d2p.div.children[0].style.opacity='1');void(d2p.div.children[0].style.MozOpacity='1');void(d2p.div.children[0].children[1].style.display='none');void(d2p.div.children[0].children[0].style.display='table')}";
	window.location.href="javascript:for(i=0;i<document.links.length;i++){if(document.links[i].href.indexOf('javascript:quote')!=-1)void(document.links[i].href=document.links[i].href.replace(/quote/,'void(d2p.div.children[0].style.opacity=\\'1\\');void(d2p.div.children[0].style.MozOpacity=\\'1\\');void(d2p.div.children[0].children[1].style.display=\\'none\\');void(d2p.div.children[0].children[0].style.display=\\'table\\');quote'))}"
}