// ==UserScript==
// @name        Youtube MP3
// @namespace   http://localhost
// @include     http://www.youtube.com/watch*
// @include     http://www.youtube-mp3.org/*
// @require     http://pblg1.zzl.org/hlib.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @version     1.0
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

if(window.location.toString().match(/youtube.com\/watch/)){
pushTo('div','mp3','#page',0);
typeTo('#mp3','<a id="mp3button" target="new">&nbsp;MP3&nbsp;</a>');
sel('#mp3').style.width="40px";
sel('#mp3').style.height="20px";
move('#mp3','relative',225,5);
injectCss("#mp3button{outline:none;text-decoration:none;color:black;line-height:20px;border:5px groove white} #mp3{background:#d8d8d8;}");

sel('#mp3button').onclick=function open(){
    var link = "http://www.youtube-mp3.org/UNIQUEIDENTIFIER"+window.location.toString().slice(23);
    window.open(link,"blank");
    }
}

if(window.location.toString().match(/[a-zA-z0-9]*UNIQUEIDENTIFIER[a-zA-z0-9]*/)){
    sel('body').style.display='none';
    var process = window.location.toString().split('org/');
    var id = process[1].toString().slice(16);
    GM_setValue('youtube-url','http://www.youtube.com/'+id);
    window.location="http://www.youtube-mp3.org";
}

if(window.location.toString().match(/mp3/)){

  $(document).ready(function() {
        sel('#youtube-url').value=GM_getValue('youtube-url');
        display('#rad',0); display('#description',0); display('#sad',0); display('#footer',0);
        sel('#submit').style.display='none';sel('#youtube-url').style.display='none';
        
        setTimeout(function(){
         $("#submit").click();
        },100);
        
        setTimeout(function(){
            var src=document.documentElement.innerHTML;
            var check = sel('#error_text').innerHTML.toString().match(/error/);
                if(check){
                    sel('#error_text').innerHTML=sel('#error_text').innerHTML+'<br><br><b>Sorry. The Video You Have Chosen Is Not A Music Video.';
                    //alert('Sorry. The Video You Have Chosen Is Not A Music Video.');
                }
        },2000);
 
    });
    
   
}






















