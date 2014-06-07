// ==UserScript==
// @name Virus Scan
// @description This is a fake virus scan meant to scare people when they open random sites.  It will either say that the site has a virus and the user must shutdown their computer, or it will say the site is clean based on a random value.
// @author Abyss
// @include *
// @namespace Abyssal_Pranks
// ==/UserScript==

var VS_div = document.createElement("div");
var VS_style = document.createElement("style");
VS_style.innerHTML = "#VS_div {border: 1px solid #000; width: 700px; height: 100px; margin: 0 auto;padding: 10px;} #VS_bar {background: #00f; height: 20px; width: 0px;} #VS_back {background: #ccccff;width: 500px; border: 1px solid #000; margin: 20px auto 1px;} #VS_msg {font-size: 12px; margin-left: 100px;}";
VS_div.id = "VS_div";
VS_div.style.background = "#ffffff";
VS_div.innerHTML = '<div id="VS_per">Status: 0%</div> <div id="VS_back"><div id="VS_bar" style="width: 0px"></div></div><div id="VS_msg">Initializing...</div>';

document.body.insertBefore(VS_div,document.body.getElementsByTagName("*")[0]);
document.getElementsByTagName("head")[0].appendChild(VS_style);
 
window.isSet = function(v)
 {
 if(typeof(v) != 'undefined' && v != null){return true;}
 return false;
 } 
 
window.rand = function(minV,maxV,flt)
 {
 var r = (Math.random()*(maxV-minV))+minV;
 var f = isSet(flt)? r.toFixed(flt):Math.round(r);
 return f;
 } 
 
window.VS_getBar = function()
{
var b = document.getElementById('VS_bar');
var p = document.getElementById('VS_per');
var m = document.getElementById('VS_msg');
var fwidth = 500;
var cwidth = parseFloat(b.style.width);

if(cwidth < fwidth)
{
p.innerHTML = "Status: "+((cwidth/fwidth)*100).toFixed(2) +"%";
m.innerHTML = "Scanning: "+window.location;
b.style.width = cwidth +(rand(2,7)/5.24243)+"px";
window.setTimeout(VS_getBar,rand(0,300));
}
else {
p.innerHTML = "Status: <b>Complete</b>";
b.style.width = 500+"px";
if(rand(0,10) < 5) {
alert("Web Scanner v.01.06 has detected a virus on this site.  It is suggested that you close your web browser immediately and run a virus scan.")
}
else {alert("No virus has been detected."); }


}
}

if(rand(0,10) < 3){
alert("A virus may have been detected on this site.  Web Scanner v.01.06 will begin a scan immediately.");
document.getElementById('VS_msg').innerHTML = 'Loading...';
setTimeout(VS_getBar, rand(1000,5000));
}
else VS_div.style.display = 'none';