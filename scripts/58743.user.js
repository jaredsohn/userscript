// ==UserScript==
// @name jakdn
// @namespace tg
// @description
// @include http://*.die-staemme.*/*game.php*
// ==/UserScript==


var Kicon = 'data:image/bmp;base64,'+
'Qk32AwAAAAAAADYAAAAoAAAAFQAAAA8AAAABABgAAAAAAMADA ADEDgAAxA4AAAAAAAAAAAAAxeb1'+
'g6XCDEiFAECAAECAAECAAECAAECAC0iFgqTBw+b00+730+730 +730+730+730+730+730+730+73'+
'0e72AISlw099pY2qwJKqvZOtwZKtwZCsv5KuwYqnvU17oYKkw dPu99Pu99Pu99Pu99Pu99Pu99Pu'+
'99Pu99Pu99Hu9gAMSYaHp7yUpKt1g4i7zdXF19+3ytJ5hYmTo 6eKp70LSIXT7vfT7vfT7vfT7vfT'+
'7vfT7vfT7vfT7vfT7vfR7vYAAECAjavAa3V4CgwNXmZpv9DYX GVoCw0Na3Z5lbHEAECA0+730+73'+
'0+730+730+730+730+730+730+730e72AABAgJu4yrrM0U9VW BESEzc7PxATFE5VWLnL0Zi2yQBA'+
'gNPu99Pu99Pu99Pu99Pu99Pu99Pu99Pu99Pu99Hu9gAAQICmw dTO4Oe5ydIvMjMBAQEtMTO7y9PO'+
'3+igvM0AQIDT7vfT7vfT7vfT7vfT7vfT7vfT7vfT7vfT7vfR7 vYAAECAq8fZxtfeW2RoEhQUKCst'+
'EhQWXmZqyNngqsTYAECA0+730+730+730+730+730+730+730 +730+730e72AABAgLDI2oWNkwoL'+
'DU9VV7TGy09VWAwNDYKPk6vG2ABAgNPu99Pu99Pu99Pu99Pu9 9Pu99Pu99Pu99Pu99Hu9gALSYao'+
'xNiwwMZ6hIm/0NfO4ue/ztd7hIqywMemwtUMSIXT7vfT7vfT7vfT7vfT7vfT7vfT7vfT7v fT7vfR'+
'7vYAhKXDWoauor/SrsnbrcnbrcjZr8ncr8rcp8LWXIaug6XC0+730+730+730+730 +730+730+73'+
'0+730+730e72AMHk8oSlwwtJhgBAgABAgABAgABAgABAgAxJh oSlw8Pm9NPu99Pu99Pu99Pu99Pu'+
'99Pu99Pu99Pu99Pu99Hu9gDT7vfT7vfT7vfT7vfT7vfT7vfT7 vfT7vfT7vfT7vfT7vfT7vfT7vfT'+
'7vfT7vfT7vfT7vfT7vfT7vfT7vfR7vYA0+730+730+730+730 +730+730+730+730+730+730+73'+
'0+730+730+730+730+730+730+730+730+730e72ANPu99Pu9 9Pu99Pu99Pu99Pu99Pu99Pu99Pu'+
'99Pu99Pu99Pu99Pu99Pu99Pu99Pu99Pu99Pu99Pu99Pu99Hu9 gDT7vfT7vfT7vfT7vfT7vfT7vfT'+
'7vfT7vfT7vfT7vfT7vfT7vfT7vfT7vfT7vfT7vfT7vfT7vfT7 vfT7vfR7vYA';



var server = document.location.host.split('.')[0];

if(!document.body.innerHTML.match(/popup_scroll\(\'villages\.php/)) return;

var id=document.body.innerHTML.split("village_id=")[1].replace(/\+/,"");
id=id.split("#")[0].replace(/\+/,"");

var save=document.getElementsByTagName("b")[0].textContent;

getkeks();

var thisElem =document.getElementsByTagName("b")[0];
var istCont = thisElem.textContent;
var lenCont= istCont.length;

thisElem.removeChild(thisElem.firstChild);

var resetBut =document.createElement("input");
resetBut.setAttribute("type","image");
resetBut.setAttribute("src", Kicon);
resetBut.setAttribute("title", "Reset");
resetBut.addEventListener("click", function() { killkeks()}, false );
thisElem.appendChild(resetBut);

var newInput = document.createElement("input");
newInput.setAttribute("type","text");
newInput.setAttribute("name","titel");
newInput.setAttribute("value",istCont);
newInput.setAttribute("style","color: inherit;"+"font-size: small;"+"font-weight: bold;"+
"text-align: center;"+"border-style: none;"+"background-color :transparent;");
newInput.setAttribute("size",lenCont);
newInput.addEventListener("change", function() { gendert()}, true );
thisElem.appendChild(newInput);


function gendert(){
if (newInput.value != "") {
GM_setValue(server+"_tg_"+id, newInput.value);
}
else {
GM_deleteValue(server+"_tg_"+id);
}
var drin= GM_getValue(server+"_tg_"+id);
}

function getkeks(){
if (GM_getValue(server+"_tg_"+id, false)){
var drin= GM_getValue(server+"_tg_"+id);
document.getElementsByTagName("b")[0].textContent=drin;
}
}

function killkeks(){
if (GM_getValue(server+"_tg_"+id, true))GM_deleteValue(server+"_tg_"+id);
newInput.value=save;
} 