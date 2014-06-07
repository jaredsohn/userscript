// ==UserScript==
// @name		codr
// @author		Rolando Garza <rolandog@gmail.com>
// @namespace	http://rolandog.com
// @description	Outputs a Litebox-friendly code from your Flickr image sets.
// @include		http://flickr.com/photos/*/sets/*
// @include		http://flickr.com/photos/*/sets/*/
// @include		http://*.flickr.com/photos/*/sets/*
// @include		http://*.flickr.com/photos/*/sets/*/
// @include		http://www.flickr.com/photos/*/sets/*
// @include		http://www.flickr.com/photos/*/sets/*/
// @include		http://flickr.com/photos/*/favorites
// @include		http://flickr.com/photos/*/favorites/
// @include		http://*.flickr.com/photos/*/favorites
// @include		http://*.flickr.com/photos/*/favorites/
// @include		http://www.flickr.com/photos/*/favorites
// @include		http://www.flickr.com/photos/*/favorites/
// @include		http://flickr.com/photos/*/sets/*/*
// @include		http://flickr.com/photos/*/sets/*/*/
// @include		http://*.flickr.com/photos/*/sets/*/*
// @include		http://*.flickr.com/photos/*/sets/*/*/
// @include		http://www.flickr.com/photos/*/sets/*/*
// @include		http://www.flickr.com/photos/*/sets/*/*/
// @include		http://flickr.com/photos/*/favorites/*
// @include		http://flickr.com/photos/*/favorites/*/
// @include		http://*.flickr.com/photos/*/favorites/*
// @include		http://*.flickr.com/photos/*/favorites/*/
// @include		http://www.flickr.com/photos/*/favorites/*
// @include		http://www.flickr.com/photos/*/favorites/*/
// ==/UserScript==

function codr() {
	function killsChildNodes(an_element){
		while (an_element.hasChildNodes()){
			if (!an_element.firstChild.hasChildNodes()){
				var k=an_element.firstChild;
				an_element.removeChild(k);
			}else{
				killsChildNodes2(an_element.firstChild);
			}
		}
	}
	function killsChildNodes2(another_element){
		while (another_element.hasChildNodes()){
			if (!another_element.firstChild.hasChildNodes()){
				var k2=another_element.firstChild;
				another_element.removeChild(k2);
			}else{
				killsChildNodes(another_element.firstChild);
			}
		}
	}
	function killAllChildNodesFrom(bob){
		if(document.getElementById(bob).hasChildNodes()){
			killsChildNodes(document.getElementById(bob));
		}
	}
	function cleanWhitespace(someelement){
		var element=document.getElementById(someelement);
		for(var i=0;i<element.childNodes.length;++i){
			var node=element.childNodes[i];
			if(node.nodeType==3 && !(/S/.test(node.nodeValue))){
				element.removeChild(node);
			}
		}
	}
	var yourclass='center';
	var ml='xhtml';
	var d=new Date();
	var month=d.getMonth();
	if(month<10){
		month='0'+d.getMonth();
	}
	var day=d.getDate();
	if(day<10){
		day='0'+d.getDate();
	}
	var rel='lightbox '+d.getFullYear()+month+day;
	var divId='setThumbs';
	if(document.getElementById('favoriteThumbs')){
		var has_p=1;
		divId='favoriteThumbs';
	}
	cleanWhitespace(divId);
	var thumbs=document.getElementById(divId);
	if(has_p){thumbs.removeChild(thumbs.firstChild);}
	for(var i=0;i<thumbs.childNodes.length;++i){
		var a_el=thumbs.childNodes[i];
		var img_src=thumbs.childNodes[i].firstChild.src;
		a_el.setAttribute('href',img_src.replace(/_s.jpg/g,'.jpg'));
		a_el.setAttribute('rel',rel);
	}
	var div=document.createElement('div');
	div.setAttribute('id','sourcecode');
	div.setAttribute('style','text-align:center;');
	var f_rm=document.createElement('form');
	var fieldset=document.createElement('fieldset');
	var legend=document.createElement('legend');
	var b0=document.createElement('big');
	var sp0=document.createElement('span');
	sp0.setAttribute('style','color:#0063DC;');
	var sp1=document.createElement('span');
	sp1.setAttribute('style','color:#FF0084;');
	var tN0=document.createTextNode('cod');
	var tN1=document.createTextNode('r');
	sp1.appendChild(tN1);
	sp0.appendChild(tN0);
	b0.appendChild(sp0);
	b0.appendChild(sp1);
	legend.appendChild(b0);
	var textarea=document.createElement('textarea');
	textarea.setAttribute('id','yourcode');
	textarea.setAttribute('rows','10');
	textarea.setAttribute('cols','63');
	fieldset.appendChild(legend);
	fieldset.appendChild(textarea);
	f_rm.appendChild(fieldset);
	div.appendChild(f_rm);
	var thumbcode='<div class=\''+yourclass+'\'>\n'+thumbs.innerHTML+'\n<\/div>';
	if(ml=='xhtml'){
		thumbcode=thumbcode.replace(/><\/a>/g,' /></a>');
	}
	thumbs.parentNode.insertBefore(div,thumbs);
	document.getElementById('yourcode').value=thumbcode;
	killAllChildNodesFrom('codrLink');
	var there=document.getElementById('codrLink');
	there.parentNode.removeChild(there);
}
function codrLink() {
	var divId='setThumbs';
	if(document.getElementById('favoriteThumbs')){
		var has_p=1;
		divId='favoriteThumbs';
	}
	var theThumbs = document.getElementById(divId);
	var codrLinkDiv = document.createElement("div");
	codrLinkDiv.setAttribute("style","text-align:center;font-size:x-large;");
	var bigA = document.createElement("big");
	var codrAnchor = document.createElement("a");
	codrAnchor.setAttribute("href","javascript:void(0);");
	codrAnchor.setAttribute("style","text-decoration:none;");
	codrAnchor.setAttribute("id","codrAnchor");
	codrLinkDiv.setAttribute("id","codrLink");
	var cod = document.createTextNode("cod");
	var r = document.createTextNode("r");
	var s0 = document.createElement("span");
	var s1 = document.createElement("span");
	s0.setAttribute("style","color:#FF0084;background-color:#FEFEFE;");
	s1.setAttribute("style","color:#0063DC;background-color:#FEFEFE;");
	s0.appendChild(cod);
	s1.appendChild(r);
	codrAnchor.appendChild(s0);
	codrAnchor.appendChild(s1);
	bigA.appendChild(codrAnchor);
	codrLinkDiv.appendChild(bigA);
	theThumbs.parentNode.insertBefore(codrLinkDiv,theThumbs);
	document.getElementById("codrLink").firstChild.firstChild.onclick=codr();
}
codrLink();