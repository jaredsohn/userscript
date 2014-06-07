// @run-at   document-start
// ==UserScript==
// @name           4chan ftw
// @namespace      4chan ftw
// @description    4chan ftw
// @include        https://boards.4chan.org/*
// @include        http://boards.4chan.org/*
// ==/UserScript==

window.addEventListener(
    "load", 
	function(){ //event listener for enlarging
		for(var i=0;i<document.links.length;i++){
			if((document.links[i].href).search(/images.4chan.org/) > 0){
				document.links[i].addEventListener('click', enlargeImg, false);}}
                //blank text to html link
        var cmt = document.getElementsByTagName("blockquote");
        for(var i=0;i<cmt.length;i++){ //step through all comments
            if (cmt[i].innerHTML.search(re) != -1){ //regexp if link is detected
                cmt[i].innerHTML = txt2url(cmt[i].innerHTML);}}
        },
	false);
    
function enlargeImg(ev){
    // minimize if enlarged
    if(ev.target.tagName == "IMG"){ 
        if(ev.target.alt == "large"){
            ev.target.width *= 0.3;
            ev.target.height *= 0.3;
            ev.target.alt = "small";}
        else{ //enlarge if minimized
            ev.target.removeAttribute("style");
            ev.target.src = ev.target.parentNode;
            var r = ev.target.height/ev.target.width;
            ev.target.width = screen.width / 1.5;
            ev.target.height = ev.target.width * r;
            ev.target.alt = "large";}
        ev.preventDefault();}}

//global url regexp
var re = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/g;
 
function txt2url(s){ 
    //the first regexp-operation ensures that such a thing doesn't happen:
    //http://abc.de<br> -> <a href ="http://abc.de<br>">http://abc.de<br></a>
    var tmp = s.replace(/(<([^>]+)>)/ig," $1 ");
    return tmp.replace(re, "<a href='$1' target='_blank'>$1</a>");}
    
    

    
