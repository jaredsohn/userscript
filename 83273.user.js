// ==UserScript==
// @name			FUNK
// @namespace		jhiswin
// @description	Hides all Facebook posts on a wall
// @include		http://*facebook*/profile.php*
// ==/UserScript==

function hasmoreposts(){return !!(document.querySelector('#profile_pager_container.uiMorePager:not(.hidden_elem)'));}
function sendclick(el){
var clickevent=document.createEvent("MouseEvents");
clickevent.initEvent("click", true, true);
el.dispatchEvent(clickevent);}

stories ="";// = document.querySelectorAll('.UIStory_Hide');

i=0;
function rightaboutnow(){
if(i>=stories.length){i=0;return;}
sendclick(stories[i++].querySelector('a'));
checkit=true;
soulbrother= setInterval(function(){var outnow=document.getElementsByName('delete_story')[0];if(!!outnow){outnow.click();clearInterval(soulbrother);checkit=false;setTimeout(rightaboutnow,1);}},100);
}

function funkystart(){firstinterval= setInterval(function(){inst=unsafeWindow['ProfileStream'].getInstance(); if(i==0){if(!inst.loading && hasmoreposts())inst.showMore();stories = document.querySelectorAll('.UIStory_Hide');rightaboutnow();}},2000);}

unsafeWindow['hasmoreposts']=hasmoreposts;
unsafeWindow['sendclick']=sendclick;
unsafeWindow['rightaboutnow']=rightaboutnow;
unsafeWindow['funkystart']=funkystart;

GM_registerMenuCommand("FUNK it",function(){funkystart.apply(unsafeWindow);});
/*
window.addEventListener("load", function(e) {
document.body.innerHTML+='<input type="button" onclick="funkystart()" value="Start FUNK"></input>';
}, false);*/