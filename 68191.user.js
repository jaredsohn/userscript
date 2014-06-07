//Thanks to robby118 writing superintendant but hes still a nub cake
// ==UserScript==
// @name           Custom Bnet Skin
// @namespace      www.bungie.net
// @description    Lets you customise the bungie.net theme to your likings.
// @include        http://*bungie.net/*
// @version        2
// ==/UserScript==
var switchy = GM_getValue("Switcher");
var bgcolor = GM_getValue("BGCOLOR");
var navcolor = GM_getValue("NAVCOLOR");
var footerlinky = document.getElementById('ctl00_footer_fMenuControl_rptMenu_ctl02_rptSubMenu_ctl07_hypMenu');
var settings = document.createElement('li');
settings.innerHTML = '<a id="skinsettings" href="#">Skin Settings</a><a id="CBSswitch" href="#">Off</a>';
footerlinky.parentNode.insertBefore(settings, footerlinky.nextSibling);
var settinglink = document.getElementById('skinsettings');
settinglink.addEventListener('click', SetupBox, true);
var switcherlink = document.getElementById('CBSswitch');
switcherlink.addEventListener('click', SWITCH, true);
var page = document.getElementsByClassName('fContent').item(0);
var setupele = document.createElement('div');
setupele.setAttribute("id", "setupID");
if(switchy == null){
GM_setValue("Switcher","On");
}
if(switchy == "On"){
eval('GM_addStyle("body {background: url(http://apx.comlu.com/uploads/bg.png) '+bgcolor+' repeat-x fixed;} div.sContent-head {background: url(http://apx.comlu.com/uploads/navtop.png) '+navcolor+' repeat-x;} .RadMenu_topNav2.RadMenu .rmHorizontal .navTopLevel:hover {background: '+navcolor+';}")');
document.getElementById('CBSswitch').innerHTML = "ON";
}
function SetupBox(){
setupele.innerHTML = '<div id="SBOX" style="z-index:9000;background-color:#212121;position:fixed;left:40%;top:20%;width:300px;height:200px;">'+
'<div style="padding: 10px 10px 10px 10px;">'+
'<h1>Custom Bnet Skin 2.0 <a style="margin-left:30px;" id="close" href="#">close</a></h1>'+
'<h3>Skin 1</h3>Background colour: <input style="margin-left:10px;" type="textfield" id="Bgcolorbox"><br>'+
'Navbar colour:<input style="margin-left:40px" type="textfield" id="Navcolorbox"><br>'+
'<a href="http://www.2createawebsite.com/build/hex-colors.html" target="_blank">Hex codes</a><br><br><a href="#" id="savebutton">Save</a></div></div>';
page.parentNode.insertBefore(setupele, page);
var savebutton = document.getElementById('savebutton');
savebutton.addEventListener('click', Savesettings, true);
var closebutton = document.getElementById('close');
closebutton.addEventListener('click', CloseBox, true);
}
function Savesettings(){
var setbgcolor = document.getElementById("Bgcolorbox").value;
GM_setValue("BGCOLOR", setbgcolor);
var setnavcolor = document.getElementById("Navcolorbox").value;
GM_setValue("NAVCOLOR", setnavcolor);
eval('GM_addStyle("body {background: url(http://apx.comlu.com/uploads/bg.png) '+setbgcolor+' repeat-x fixed;} div.sContent-head {background: url(http://apx.comlu.com/uploads/navtop.png) '+setnavcolor+' repeat-x;} .RadMenu_topNav2.RadMenu .rmHorizontal .navTopLevel:hover {background: '+setnavcolor+';}")');
alert("Saved!");
}
function CloseBox(){
document.getElementById("setupID").innerHTML = ""
}
function SWITCH(){
if(switchy=="On"){
document.getElementById("CBSswitch").innerHTML = "OFF";
GM_setValue("Switcher", "Off");}
else if(switchy=="Off"){
document.getElementById("CBSswitch").innerHTML = "On";
GM_setValue("Switcher", "On");}
window.location.reload();}