// ==UserScript==
// @name        Decorator
// @description Decorates the page of the broadcast
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





var Variables = 'var Script_ver = "1.0"; var Notify_flag = false; var FIRE_number; var FIRE_Cur_Num=0; var FIRE_Billede = new Array(); var Temp1; var Temp2; var Temp3;';

var vrbls = Createfunc( "script",{type: "text/javascript"});
vrbls.innerHTML = Variables;
document.getElementById('chat_block').appendChild(vrbls);


var Scrpt = Createfunc("script",{type: "text/javascript", src: "http://dl.dropbox.com/u/52549691/DecoratorAPI.js" });
document.getElementsByTagName('head')[0].appendChild(Scrpt);

var DocStile = Createfunc( "link",{href: "http://dl.dropbox.com/u/52549691/DecoratorStyle.css", type: "text/css", rel: "stylesheet"});
document.getElementsByTagName('head')[0].appendChild(DocStile);



document.body.appendChild(Createfunc( "audio", { id: "myaudio"}));




document.getElementById('chat_block').appendChild(Createfunc( "a", { id: 'DecoratorM', href: '#',onclick:"DecoratorMainMenu(event); return false;", onmouseover:"this.style.color='#1823EB'", onmouseout:"this.style.color='#0E859F'", color:'#0E859F', style:"bottom:10px; text-decoration:none; font-weight:bold; position:relative; float:left;" },'Decorator >>>'));
        

