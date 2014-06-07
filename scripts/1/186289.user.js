// ==UserScript==
// @name        Clean MangaBB
// @namespace   Yack's random script
// @description Read all pages of a chapter in one page.Advertisements also removed.
// @exclude     *mangabb.me/manga/*
// @include     *mangabb.me/*/chapter*
// @version     1.04
// @grant       none
// ==/UserScript==

//removes useless divs
var adRemove = document.getElementById("mini-announcement");
var adRemove2 = document.getElementById("mv_ad_top");
var adRemove3 = document.getElementById("mv_ad_bottom");
var adRemove4 =document.getElementById("mv_ad_side");
var footerRemove = document.getElementById("footer");
var suggestionRemove = document.getElementById("series_suggestions");
var tipRemove = document.getElementById("manga_viewer_tip");
var mchapRemove = document.getElementById("manga_chapter_links");
adRemove.parentNode.removeChild(adRemove);
adRemove2.parentNode.removeChild(adRemove2);
adRemove3.parentNode.removeChild(adRemove3);
adRemove4.parentNode.removeChild(adRemove4);
footerRemove.parentNode.removeChild(footerRemove);
suggestionRemove.parentNode.removeChild(suggestionRemove);
tipRemove.parentNode.removeChild(tipRemove);
mchapRemove.parentNode.removeChild(mchapRemove);

var title = window.location.href.substring(22);
var realTitle = "http://www.mangabb.me/manga/"+title.substring(0,title.indexOf("/"));

//# of pages in chapter
var numPages = document.getElementsByClassName("page_select")[2].length;

//# of chapters
var chapters=[], currentChap; 
var chap = document.getElementsByClassName("chapter_select")[2];
for(var i = 0; i<chap.length; i++){
    chapters[i] = chap[i].value;
    if(chap.selectedIndex == i){
        currentChap = i;
    }
}

var page = document.getElementById('page');
var content = page.getElementById('view_content_block');

content.style=('width:'+window.innerWidth+'px');
var viewer = content.getElementById('manga_viewer').innerHTML;

var stripImage = viewer.substring(viewer.indexOf('src="http://') + 5);

var frontURL;
frontURL = stripImage.substring(0, stripImage.indexOf(".jpg")-1);

while(!frontURL.endsWith("/"))
    frontURL = frontURL.substring(0,frontURL.length-1);


var pages=[];
for(var i = 0; i<=numPages; i++){
    pages[i] = frontURL+(i+1)+'.jpg';
    
}

var buttons="";

if(currentChap>0)
    buttons +='<button onclick=\"location.href=\''+chapters[currentChap-1]+'\'\">Prev Chapter</button>';
    
buttons +='<button onclick=\"location.href=\''+realTitle+'\'\" >Chapter List</button>';

if(currentChap<chap.length)
    buttons +='<button onclick=\"location.href=\''+chapters[currentChap+1]+'\'\">Next Chapter</button>';


var allPage = '';

for(var i = 0; i<pages.length-1; i++)
    allPage += '<h1>Page'+(i+1)+'</h1>'+'<img border=\"2\" src=\"' + pages[i] + '\" style=\"max-width:100%\" ><hr>'+buttons+'<hr>';


content.innerHTML = '<center>' + allPage + '</center>';
