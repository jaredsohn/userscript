// ==UserScript==
// @name           IMP (Instant Music Player)
// @namespace      *
// @description    Yet another embeded music player which supports mid,wma and mp3.
// @include        *
// @author         juiev
// ==/UserScript==


var link=document.links;
function create(omlet){
	var container=document.createElement('div');
		container.setAttribute('align','center');
		container.style.width='100%';
		container.style.position='fixed';
		container.style.top='0px';
		container.style.fontSize='10px';
	var media=document.createElement('embed');
		media.id='ms-mplayer';
		media.type='application/x-mplayer2';
		media.width='300';
		media.height='40';
		media.src=omlet.href!='javascript:void(0)'?omlet.href:omlet.title;
		media.autostart=true;
		container.appendChild(media);
		container.innerHTML+="<p>Now playing:"+omlet.innerHTML+"<br/><a href=\""+omlet.title+"\">Donwload</a></p>";
		
	return container;
}
function play(event){
	var u= event.target;
	var player=document.getElementById('ms-mplayer');
	if (!player) {
			document.body.insertBefore(create(u),document.body.firstChild);
		} else {
			player.src=u.href!='javascript:void(0)'?u.href:u.title;
			player.parentNode.lastChild.innerHTML="Now playing:"+u.innerHTML+"<br/><a href=\""+u.title+"\">Donwload</a>"
		}
		
		u.href="javascript:void(0)";
}
for (var curr in link){
	var url=link[curr].href;
	var file=url.substring(url.length-4,url.length).toLowerCase(); 
	
	switch(file){
	case ".mid":
	case ".mp3":
	case ".wma":
		link[curr].title=url;
		link[curr].addEventListener('click',play,false);
		
	break;	
	default: break;
	}
	
}


