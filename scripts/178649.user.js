// ==UserScript==
// @name        Comments Remover
// @namespace   http://localhost
// @include     http://www.gamestar.hu/*
// @require     http://pblg1.zzl.org/hlib.js
// @version     1.0
// ==/UserScript==


var art_pcuser = document.querySelectorAll('.art_pcuser');
var pager = document.querySelectorAll('div.comment_pagination');

pager[0].style.display="none";
pager[1].style.display="none";

pushTo('div','next','.comment_pagination',0);
pushTo('div','next2','#article_comments_container',1);
move('#next','relative',250,0);
move('#next2','relative',500,0);

var domain="http://www.gamestar.hu/nvdia-egy-konzol-nem-lehet-mar-erosebb-egy-pc-nel.html";

if(!window.location.toString().match(/comment_page/)){
typeTo('#next','<br><a id="navigate" href="'+window.location+'?comment_page=2" >NEXT PAGE >></a>');
typeTo('#next2','<br><a class="navigate" href="'+window.location+'?comment_page=2" >NEXT PAGE >></a>');
}else if(window.location.toString().match(/comment_page/)){
window.scrollTo(0,3560);
var loc_len = window.location.toString().length;
var page = window.location.toString().slice(91);
page++;
typeTo('#next','<a class="navigate" href="'+domain+'?comment_page='+page+'" >NEXT PAGE >></a>');
typeTo('#next2','<br><a class="navigate" href="'+domain+'?comment_page='+page+'" >NEXT PAGE >></a>');
}

//The block of code below this removes the comments from the user
for(var i=0;i<art_pcuser.length;i++){  

    find=/[-]*pc[-]*maestro[-]*/ig;  //Just edit the name in between the foward slashes to the username that you want to hide
    var check=find.exec(art_pcuser[i].innerHTML);
    if(check){art_pcuser[i].parentNode.parentNode.style.display="none";}
    check=null;
    
}
