// ==UserScript==
// @name           Youtube Video Embedee
// @namespace      pendevin
// @description    Puts an 'Embed' link next to youtube links
// @include        http://boards.endoftheinter.net/showmessages.php?*
// @include        http://archives.endoftheinter.net/showmessages.php?*
// @include        https://boards.endoftheinter.net/showmessages.php?*
// @include        https://archives.endoftheinter.net/showmessages.php?*
// ==/UserScript==

//i totally improved this one
//variables that aren't present return null
//a variable with no value returns the true
function getUrlVars(urlz){
	//thanks for the function citizenray
	var vars=[];
	var hash="";
	var hashes=urlz.slice(urlz.indexOf('?')+1).split('&');
	for(var i=0;i<hashes.length;i++){
		hash=hashes[i].split('=');
		if(hash[1]!=null&&hash[1].indexOf("#")>=0)hash[1]=hash[1].substring(0,hash[1].indexOf("#"));
		if(hash[1]==undefined){
			hash[1]=true;
			if(hash[0].indexOf("#")>=0)hash[0]=hash[0].substring(0,hash[0].indexOf("#"));
		}
		vars.push(hash[0]);
		vars[hash[0]]=hash[1];
	}
	return vars;
}

//executes a function with the document as its parameter, and adds a listener for a livelinks post which executes the function with that post as a parameter
//the only parameter of the function you feed this should be a DOM node
function livelinks(func){
	document.addEventListener(
		'DOMNodeInserted',
		function(e){if(e.target.firstChild&&e.target.firstChild.className=='message-container')func(e.target);},
		false
	);
	func(document);
}

function process(place){
	var as=place.getElementsByTagName("a");
	for (var i=0; i<as.length; i++){
		var v=null;
		if(as[i].href.indexOf("youtube.com/watch")>=0&&getUrlVars(as[i].href)["v"])
			v=getUrlVars(as[i].href)["v"];
		else if(as[i].href.match(/youtu\.be\/[a-zA-Z0-9_-]+/))
			v=as[i].href.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)[1];
		if(v!=null){
			var sp=document.createElement("span");
			sp.innerHTML=" <a href='javascript:void(0);' id='"+v+"'>[embed]</a>";
			as[i].parentNode.insertBefore(sp,as[i].nextSibling);
			sp.firstElementChild.addEventListener("click",embed,false)
		}
	}
}

function embed(e){
	var video=document.createElement('div');
	video.innerHTML="\
		<object width='425' height='344'>\
		<param name='movie' value='http://www.youtube.com/v/"+e.target.id+"&hl=en&fs=1'>\
		</param>\
		<param name='allowFullScreen' value='true'>\
		</param>\
		<embed src='http://www.youtube.com/v/"+e.target.id+"&hl=en&fs=1' type='application/x-shockwave-flash' allowfullscreen='true' width='425' height='344'>\
		</embed>\
		</object>\
	";
	e.target.parentNode.appendChild(video);
	e.target.removeEventListener("click",embed,false);
	e.target.textContent='[unembed]';
	e.target.addEventListener('click',unembed,false);
}

function unembed(e){
	e.target.parentNode.removeChild(e.target.parentNode.lastChild);
	e.target.removeEventListener("click",unembed,false);
	e.target.textContent='[embed]';
	e.target.addEventListener('click',embed,false);
}

livelinks(process);