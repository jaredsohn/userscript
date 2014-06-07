// ==UserScript==
// @name           xkcdreader
// @namespace      quad
// @description    Removes need for mouseover to read title; also removes header and footer.
// @include        http://xkcd.*
// @include        http://www.xkcd.*
// ==/UserScript==

txt="uh..."
ele=document.getElementById("bottom")
if (ele != null){
ele.parentNode.removeChild(ele);
}
ele=document.getElementById("topContainer")
if (ele != null){
ele.parentNode.removeChild(ele);
}

txt=document.images[0].title
eleadded=document.createElement("titleadded")
eleadded.innerHTML='<br><br><chunk id="added">' +txt+ '</chunk>'
com=document.getElementById("comic")
com.parentNode.insertBefore(eleadded,com.nextSibling)

