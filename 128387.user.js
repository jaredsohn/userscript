// ==UserScript==
// @name           ML
// @namespace      ML
// @include        http://*sitedemo.no-ip.org/add 
// ==/UserScript==

//alert ("ok");
infobox="<div style='position: absolute; left:10px; top:14px; width:200px; height:300px;"+
"background-color:#f2f5ff; border: 1px solid #ccc;' name='ib' id='ib'>"+
"<div style='background-color:#ccc;'><span style='color:#433333; font-size:12px; margin-left:10px;'>CONTACT<br/></span></div>"+
"<span style='color:#433333; font-size:12px; margin-left:10px;'>8(495)221-9508; 8(926)745-3047<br/></span>"+
"<span style='color:#433333; font-size:12px; margin-left:10px;'>Владимир<br/><br/><br/></span>"+
"<div style='background-color:#ccc;'><span style='color:#433333; font-size:12px; margin-left:10px;'>PRICE<br/></span></div>"+
"<span style='color:#433333; font-size:12px; margin-left:10px;'>0.1 - 2.0 kg   / 240rub.<br/></span>"+
"<span style='color:#433333; font-size:12px; margin-left:10px;'>2.1 - 5.0 kg   / 280rub.<br/></span>"+
"<span style='color:#433333; font-size:12px; margin-left:10px;'>5.1 - 20.0 kg  / 350rub.<br/></span>"+
"<span style='color:#433333; font-size:12px; margin-left:10px;'>20.1 - 40.0 kg / 400rub.<br/></span>"+
"<span style='color:#433333; font-size:12px; margin-left:10px;'>40.1 - 60.0 kg / 500rub.<br/></span>"+
"<span style='color:#433333; font-size:12px; margin-left:10px;'>60.1 - 80.0 kg / 600rub.<br/></span>"+
"<span style='color:#433333; font-size:12px; margin-left:10px;'>80.1 - 90.0 kg / 700rub.<br/></span>"+
"</div>";
var ib = document.createElement("div");
ib.innerHTML = infobox;
document.body.insertBefore(ib, document.body.firstChild);
