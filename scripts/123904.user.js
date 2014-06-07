// ==UserScript==
// @name         Lagi Tools	
// @version      beta
// @description  Scripts by Lagi :)
// @author       Lagi
// @include	http://*.the-west.*/game.php*
// @require	http://code.jquery.com/jquery-1.7.1.min.js
// ==/UserScript==


var on_checker = 0;
var name1 = '';
var name2 = '';
var nameswitch = 0;
var fortnumber = '';
var statsonchecker = 0;
var _dmg = 0;
var _hit = 0;
var _dodge = 0;
var _ko = 0;

var panel = document.createElement('div');
    panel.setAttribute('id', 'panel');
    panel.setAttribute('style', 'position: absolute;visibility: visible;overflow: hidden;border:2px solid #CCC;z-index: 1000000;background-color: rgba(205,200,177,0.6);margin:0px; border:2px solid #333;padding:3.5px;width: 200px;height: 16px;top: 0px;right: 150px;border-radius: 5px;');
    panel.innerHTML = '<input id="csere_button" type="button" title="Csereíró script" onfocus="blur()" style="opacity: 0.22;font-size:12px; border-style:solid; border-color:#FF0000; margin-left: 4px; height:15px; outline-style: none; border-width:1px;" value="" />   <input id="stats_button" type="button" title="Live stats" onfocus="blur()" style="opacity: 0.22; font-size:12px; border-style:solid; border-color:#FF0000; height:15px; outline-style: none; border-width:1px;" value="" />   <input id="blackit_button" type="button" title="Blackit!" onfocus="blur()" style="opacity: 0.22; font-size:12px; border-style:solid; border-color:#FF0000; height:15px; outline-style: none; border-width:1px;" value="" />';

document.body.appendChild(panel);

var popup = document.createElement('div');
    popup.setAttribute('id', 'popupwindow');
    popup.setAttribute('style', 'position: absolute;visibility: hidden;overflow: hidden;border:2px solid #CCC;z-index: 1000000;background-color: rgba(205,200,177,0.6);border:2px solid #333;padding:5px;width: 240px;height: 100px;top: 250px;right: 8px;border-radius: 5px;');
    
document.body.appendChild(popup);

var fortstats = document.createElement('div');
    fortstats.setAttribute('id', 'fortstatswindow');
    fortstats.setAttribute('style', 'position: absolute;visibility: hidden; overflow: hidden;border:2px solid #CCC;z-index: 1000000;background-color: rgba(205,200,177,0.6);border:2px solid #333;padding:5px;width: 240px;height: 40px;top: 362px;right: 8px;border-radius: 5px;');
    fortstats.innerHTML = '<p align="center"><font color="black" size="2"><b>Live stats</b></font><p align="center"><font color="black" size="1"><b>Találatok: ' +_hit+ ' Sebzés: ' +_dmg+ ' Kitérés: ' +_dodge+ ' KO: ' +_ko+ '</b></font>';
    fortstats.onclick = function() {

$("#chatwindow_say").val('/775*/007Találatok: /000' +_hit+ ' /007Sebzés: /000' +_dmg+ ' /007Kitérés: /000' +_dodge+ ' /007KO: /000' +_ko+ '/775*');
$("#chatwindow_say_button").trigger('click');


};

document.body.appendChild(fortstats);

var popup_header = '<p align="center"><font color="black" size="2"><b>Lagi tools v1.0</b></font><br>';
    popup.innerHTML = popup_header;

function getstatsdata(evt) {


if (evt.target.innerHTML.search(" sérülést okoztál!")>1){
var s = evt.target.innerHTML.search(" sérülést okoztál!");
var data = evt.target.innerHTML.substring(s-4,s);
_dmg = _dmg + parseFloat(data.replace(/\D/g,''));
_hit++;
}
else {
if (evt.target.innerHTML.search("de nem talált el.")>1){
_dodge++;
}
else { if (evt.target.innerHTML.search("elveszítette az eszméletét.")>1){
_ko++;
}
}
}

fortstats.innerHTML = '<p align="center"><font color="black" size="2"><b>Live stats</b></font><p align="center"><font color="black" size="1"><b>Találatok: ' +_hit+ ' Sebzés: ' +_dmg+ ' Kitérés: ' +_dodge+ ' KO: ' +_ko+ '</b></font>';

}


function statson() {
if (statsonchecker == 0) {
fortstats.style.visibility = 'visible';
$("#stats_button").fadeTo("slow", 1);
//stats_button.setAttribute('style','font-size:12px; border-style:solid; border-color:#000000; height:15px; outline-style: none; border-width:1px;');
statsonchecker = 1;

for (var i=0; i<document.getElementsByTagName("div").length; i++) {
        if (document.getElementsByTagName("div")[i].getAttribute("class") == "fort_battle_chatarea") {
document.getElementsByTagName("div")[i].addEventListener('DOMNodeInserted',getstatsdata(evt),false);
}}
}
else {
fortstats.style.visibility = 'hidden';
$("#stats_button").fadeTo("slow", 0.22);
//stats_button.setAttribute('style','font-size:12px; border-style:solid; border-color:#FF0000; height:15px; outline-style: none; border-width:1px;');
statsonchecker = 0;
for (var i=0; i<document.getElementsByTagName("div").length; i++) {
        if (document.getElementsByTagName("div")[i].getAttribute("class") == "fort_battle_chatarea") {
document.getElementsByTagName("div")[i].removeEventListener('DOMNodeInserted',getstatsdata(evt),false);
}}
}
}

var stats_button = document.getElementById('stats_button');
    stats_button.onclick = function(){
statson();
}
function getnames() {
var getname = document.getElementById('fortbattle_placement_map_' +fortnumber+ '_battleoverview').getElementsByTagName('div');
if (name1==getname[1].innerHTML || name2==getname[1].innerHTML) {
}
else {
  if (nameswitch == 0) {
name1 = getname[1].innerHTML; nameswitch = 1;
 }
  else {
name2 = getname[1].innerHTML; nameswitch = 0;
 }
}

popup.innerHTML = popup_header + '<p align="left"><font size="1" color="black"><b>Csere: </font><font size="1" color="blue">' + name1 + '</font><font size="1" color="black"> és </font><font size="1" color="blue">' + name2 + '</font></b></p><br><p align="center">Kattints a kiíratáshoz, ha helyes</p>';

popup.onclick = function() {

$("#chatwindow_say").val('/775*/007Csere: /000' + name1 + ' /007és/000 ' + name2 + '/775*');
$("#chatwindow_say_button").trigger('click');


};
}


var csere_button = document.getElementById('csere_button');
    csere_button.onclick = function(){

var getfortnumber = document.getElementById('chatwindow_contacts').getElementsByTagName('a');

    fortnumber = getfortnumber[2].href;
    fortnumber = fortnumber.replace("javascript:AjaxWindow.show('fort',{fort_id:", "");
    fortnumber = fortnumber.replace(fortnumber.substring(fortnumber.search("}"),fortnumber.length), "");

popup.innerHTML += '<p><font size="1">Erőd ID:' +fortnumber+ '</font></p>';

if (on_checker<1) {
popup.style.visibility = 'visible';
//csere_button.setAttribute('style','margin-left: 4px; font-size:12px; border-style:solid; border-color:#000000; height:15px; outline-style: none; border-width:1px;');
$("#csere_button").fadeTo("slow", 1);
on_checker = 2;
document.addEventListener('click',getnames,false);

}
else {
popup.style.visibility = 'hidden';
on_checker = 0;
//csere_button.setAttribute('style','margin-left: 4px; font-size:12px; border-style:solid; border-color:#FF0000; height:15px; outline-style: none; border-width:1px;');
$("#csere_button").fadeTo("slow", 0.22);
document.removeEventListener('click',getnames,false);
popup_header = '<p align="center"><font color="black" size="2"><b>Lagi tools v1.0</b></font><br>';
    popup.innerHTML = popup_header;
}

 


};

//Blackit!

var on = 0;
var msgnodes = "";
function blackened() {
msgnodes.removeEventListener ('DOMNodeInserted', blackened, false);
var chats = document.getElementsByClassName('chat_text');

for (var i=0;i<chats.length;i++) {
var chatselect = chats[i].innerHTML;
if (chatselect.search("div")>=0)
{
do {
chatselect = chatselect.replace(/#(?!000)\S{3}/,"#000");
}
while (chatselect.search(/#(?!000)\S{3}/)>0);
chats[i].innerHTML = chatselect;

}

}
msgnodes.addEventListener ('DOMNodeInserted', blackened, false);
}
var blackit_button = document.getElementById('blackit_button');
    blackit_button.onclick = function(){
if (on==0)
{
msgnodes = document.getElementById('chatwindow_msgs');
msgnodes.addEventListener ('DOMNodeInserted', blackened, false);
//blackit_button.setAttribute('style','font-size:12px; border-style:solid; border-color:#000000; height:15px; outline-style: none; border-width:1px;');
$("#blackit_button").fadeTo("slow", 1);
on=1;
}
else
{
msgnodes.removeEventListener ('DOMNodeInserted', blackened, false);
//blackit_button.setAttribute('style','font-size:12px; border-style:solid; border-color:#FF0000; height:15px; outline-style: none; border-width:1px;');
$("#blackit_button").fadeTo("slow", 0.22);
on=0;
}
};


//RemoveShopAD

$(document).ready(function() {
var element = document.getElementById("abdorment_left");
element.parentNode.removeChild(element);

});
