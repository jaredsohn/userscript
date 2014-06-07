// ==UserScript==
// @name          Google Menu
// @creator       Emmanuel CHARETTE 
// @version       1.0.0
// @date          10/12/2011
// @description	  Add externals links to New Google Bar
// @license       GPL version 3; http://www.gnu.org/copyleft/gpl.html
// @include       https://plus.google.com/*
// @include       http://plus.google.com/*
// @include       https://mail.google.com/*
// @include       http://mail.google.com/*
// @include       https://docs.google.com/*
// @include       http://docs.google.com/*
// @include       https://picasaweb.google.com/*
// @include       http://picasaweb.google.com/*
// @include       https://www.google.com/reader/*
// @include       http://www.google.com/reader/*
// @include       http://www.google.com/calendar/*
// @include       https://www.google.com/calendar/*
// ==/UserScript==

// Ajouter ci-dessous les icones en base64 ou le lien direct (images png)
Icon1="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAMFBMVEVpCwxdGRo4ODa6AwKiGh3/AAD/EBD/HyKWZmb/REOJi4j/c3P/lJP9wML93t39//wJ3oDmAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAAMTQAADE0B0s6tTgAAAAd0SU1FB9UKCxcRGT1NhrkAAADWSURBVCjPXZEhDsJQDIZLCB7DBXCoiYfgHqNbOMAEGQsKjeAMGMw8B5jFcQQskiOQAUvZa/u2pTXv5cu3vfYvjJ1bXbVOzi1hgpg8iavJEGMPsBDwwABE8YICUbwQgFeawwB45cWXNSxQFRbwAtGZL7s3H5sPRLUoGR9lC0gUrpQ8qHtwZNArKQmoe0FAUFpBgSr7DkgPmJP5JLnZn+Zknk1K29iWTOs8iw5XddOKUHwzzaMLqNLEZiFCUQYh0x3NGn6ZWdRgc4XZbVi2V2KYAozmoQDgDzWVBHWpYAX7AAAAAElFTkSuQmCC"
Icon2="http://upload.wikimedia.org/wikipedia/commons/4/4e/Cross.png"

// Ajouter ci-dessous des nouveaux liens suivant la syntaxe suivante :
// gBar("<gBar ou More>",<Place dans la file>,<Nom du site>,<Lien du site>,<icone du site>")
function addLinks() {
Insert("",3,"Link \#0","http://fr.wikipedia.org/wiki/Google",Icon1)
Insert("",4,"Link \#1","http://fr.wikipedia.org/wiki/Google",Icon2)
Insert("",5,"Link \#2","http://fr.wikipedia.org/wiki/Google",Icon1)
Insert("More",0,"Link \#3","http://fr.wikipedia.org/wiki/Google",Icon2)
Insert("More",1,"Link \#4","http://fr.wikipedia.org/wiki/Google",Icon1)
Insert("More",2,"Link \#5","http://fr.wikipedia.org/wiki/Google",Icon2)
}

// Ne rien modifier ci-dessous
function Insert(bar,position,text,href,icon) {
if (bar!="More") {classname1="gbtc";} else {classname1="gbmasc";}
if (bar!="More") {classname2="gbzt";} else {classname2="gbmt";}
gbar = document.getElementById('gbz').getElementsByClassName(classname1)[0];
refsite=gbar.childNodes[position];
newlink=refsite.cloneNode(true);
newlink.getElementsByClassName('gbts')[0].textContent=text;
newlink.getElementsByClassName(classname2)[0].setAttribute('href', href);
newlink.getElementsByClassName(classname2)[0].removeAttribute('onclick');
newlink.getElementsByClassName(classname2)[0].removeAttribute('id');
newlink.getElementsByClassName(classname2)[0].setAttribute('target', '_blank');
newlink.getElementsByClassName('gbtb2')[0].style.cssText = "background-repeat:no-repeat;background-position:center;background-image:url("+icon+");";
gbar.insertBefore(newlink, refsite);
};

try {addLinks();} 
catch (e) {setTimeout(addLinks, 2000);}