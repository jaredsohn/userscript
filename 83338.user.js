// ==UserScript==
// @name			SFWM
// @namespace		jhiswin
// @description	Spams Facebook Wall with Message
// @include		http://*facebook*/profile.php*
// ==/UserScript==

function sendclick(el){
var clickevent=document.createEvent("MouseEvents");
clickevent.initEvent("click", true, true);
el.dispatchEvent(clickevent);}

function spamtastic(){
var ray = ["funksoulbrother","fatboyslim","for aiur","5minrushftw","zergrushkekeke","wannapieceofmeboy?","nuclearlaunchdetected"].sort(function() {return 0.5 - Math.random()});

ii=0;
function a(){
var mytxt=ray.pop();
var UIComposer=unsafeWindow["UIComposer"];
for(var i in UIComposer.instances){if(UIComposer.instances[i].root.className.indexOf("UIComposer_STATE_INPUT_DISABLED")==-1){ii++;
UIComposer.instances[i].setMessage(mytxt);UIComposer.instances[i].focusInput();UIComposer.instances[i].post();}}
if(ray.length<=1)
ray = ["funksoulbrother","fatboyslim","for aiur","5minrushftw","zergrushkekeke","wannapieceofmeboy?","nuclearlaunchdetected"].sort(function() {return 0.5 - Math.random()});
setTimeout(a,500);

}
a();

}

GM_registerMenuCommand("spam it",function(){spamtastic()});
