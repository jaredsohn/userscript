// ==UserScript==
// @name        ChatFilter
// @description Allow user to create ignore and white lists and add Autopilot bot for manage of broadcast
// @version     1.0
// @include     http://smotri.com/live/*
// @include     http://video.gdate.ru/live/*
// @include     http://video.passion.ru/live/*
// @include     http://video.qip.ru/live/*
// @include     http://video.comedy.ru/live/*
// @run        onload
// ==/UserScript==



function Createfunc( name, attributes ) 
{
var el = document.createElement( name );
if ( typeof attributes == 'object' ) {
for ( var i in attributes ) {
el.setAttribute( i, attributes[i] );

if ( i.toLowerCase() == 'class' ) {
el.className = attributes[i]; 

} else if ( i.toLowerCase() == 'style' ) {
el.style.cssText = attributes[i]; 
}
}
}
for ( var i = 2;i < arguments.length; i++ ) {
var val = arguments[i];
if ( typeof val == 'string' ) { val = document.createTextNode( val ) };
el.appendChild( val );
}
return el;
}



var Variables = 'var CFScript_ver = "1.0"; var CFNotify_flag = false; '

var vrbls = Createfunc( "script",{type: "text/javascript"});
vrbls.innerHTML = Variables;
document.getElementById('chat_block').appendChild(vrbls);


var Scrpt = Createfunc("script",{type: "text/javascript", src: "https://dl-web.dropbox.com/get/botovod/666/ChatFilterAPI.js?w=AABl6n9jn20O5Qq9Aff9ikv_giDfjoFoxC8yTtGAfq59qg" });
document.getElementsByTagName('head')[0].appendChild(Scrpt);

var DocStile = Createfunc( "link",{href: "http://dl.dropbox.com/u/52549691/ChatFilter.css", type: "text/css", rel: "stylesheet"});
document.getElementsByTagName('head')[0].appendChild(DocStile);


if(!document.getElementById('myaudio')){
    document.body.appendChild(Createfunc( "audio", { id: "myaudio"}));
}



//creating Chat Filter elements on page

document.getElementById('chat_block').appendChild(Createfunc( "div", { id: "ChatFilterBase"},
    Createfunc( "div", { id:'ChFMenu_div', class:'ChFMainElements', onclick:"ChatFilterMenu(); return false;"},'ChatFilter:'),
    Createfunc( "div", { id:'ChFOnOff_div', class:'ChFMainElements OnOffMark_Off'},'OFF'),
    Createfunc( "div", { id:'ChFBtn_div', class:'ChFMainElements'},
        Createfunc("input", {id:'BtnOnOff', type:'button', onclick: "OnOffFilter(); return false;", value:'Вкл'})
    )


));






