// ==UserScript==
// @name        Private TPTH
// @namespace   craja
// @description with Image fixed
// @version     9.9.7
// @require     http://userscripts.org/scripts/source/87479.user.js
// @license     GPL
// @author      craja
// @include     http://*.travian*.*/*
// @exclude     http://*.travian*.*/
// ==/UserScript==

function ID(ID){return document.getElementById(ID); };
function CLASS(CLASS){return document.getElementsByClassName(CLASS); };
function TAG(TAG){return document.getElementsByTagName(TAG); };
function PR(string, radix){if(!radix){ return parseInt(string, radix)}else{return parseInt(string);}};
function CB(id, cd) {return ID(id).checked = cd};
function GM_Setup(Name, Id) {return GM_setValue(Name, ID(Id).checked);};
function AEL(Id, Type, Function, Return){return ID(Id).addEventListener(Type, Function, Return);};

var SCRIPT = {
	url : 'http://userscripts.org/scripts/source/97634.user.js',
	version : '9.9.7', //same value as @version
	name : 'Travian Utility Scritp <Craja>'
};


if (ID("ltimeWrap") !=null) {
var version = '9.9.6';
var scriptP = 'http://userscripts.org/scripts/show/97634';

var total = new Array();
var unit = new Array();
var PURPOSE=CROP=5;
var GMcookieID = '';
var market_all = [];
var market_fi = [];
var market_fc = [];
var res='true';
var thepop; 
var res_m;
var nav_m;
var resWidth=254;
var navWidth=150;
var toolsWidth=254;
var startform;
var lang;
var order=0;//
var fields=[];
var langfile=[]; 
var resource=[];
var ratio=[]; 
var overflow;
var autotime;
var pagetime;
var military=true;
var lang=window.location.href.match(/travian\d*(\.[a-zA-Z\.]+)/).pop();
var Linksfile=new Array();
var Allyfile=new Array();
var Notefile=new Array();
var bigIfile=new Array();
var battlefile=new Array();
var Spilerfile=new Array();
var Searchfile=new Array();

function createCookie(name,value,days){
if (days){var date = new Date();
date.setTime(date.getTime()+(days*24*60*60*1000));
var expires = "; expires="+date.toGMTString();
}else var expires = ""; document.cookie = name+"="+value+expires+"; path=/";}

function readCookie(name){
var nameEQ = name + "="; var ca = document.cookie.split(';');
for(var i=0;i < ca.length;i++){var c = ca[i];while (c.charAt(0)==' ') c = c.substring(1,c.length);
if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);}return null;};

switch (lang) {default:
setupFile = ['Show: Big Icons',
             'Show: Market Filter',
             'Show: Resource Needed',
             'Show: Links',
             'Show: NPC Trading',
             'Show: Village List Icons',
             'Show: Search Bar',
             'Show: Total Resource'];
             
SEVFile =   ['Save', 'Exit', 'Version'];
Searchfile= ['Players', 'Villages', 'Alliances', 'Attackers', 'Defenders', 'Heroes', 'Search'];
Linksfile=  ['Links', 'Link URL', 'Link Name', 'add Link', 'delete All'];
Allyfile =  ['allianz', 'Login'];
Notefile =  ['Notes', '- saved -'];
bigIfile =  ['Marketplace', 'Barracks', 'Rally point', 'Academy', 'stable', 'Workshop'];
Buildfile=  ['building time end in'];
Spilerfile= ['Total:'];
battlefile= ['Losses:', 'Attacker:', 'Defender:', 'FULL Bounty'];
var StyleX= ['text-align: left;', ' 5px 25px 25px 5px;']
};

switch (lang) {case '.com.sa':case '.com.eg':case '.ae':
setupFile = ['???: ????? ???????',
             '???: ????? ?????',
             '???: ??????? ????????',
             '???: ????? ???????',
             '???: ????? ???? ????????',
             '???: ????? ?????',
             '??? ???? ?????',
             '????? ????? ??????? ? ???????'];
             
SEVFile =  ['???', '????', '???????'];
Searchfile=['???????', '?????', '?????????', '?????????', '?????????', '???????', '???'];
Linksfile =['???????', '????? ??????', '??? ??????', '????? ????', '??? ????'];
bigIfile = ['?????', '??????', '???? ??????', '??????????', '???????', '??????? ???????'];
Notefile = ['???? ?????????', '- ???? -'];
Allyfile = ['??? ???????', '????? ??????'];
Buildfile= ['?????? ????? ???'];
Spilerfile= ['????? ??????:'];
battlefile= ['???????:', '???????:', '???????:', '??????? ?????'];
var StyleX=['text-align: right;', ' 25px 5px 5px 25px;']
} /*Arabic 1 */

if(document.location.href.indexOf("http://sy") != -1){
setupFile = ['????? ????? ???????',
             '???: ????? ?????',
             '???: ??????? ????????',
             '?????: ????? ???????',
             '???: ????? ???? ????????',
             '???: ????? ?????',
             '????? ???? ?????',
             '????? ????? ??????? ? ???????'];
             
SEVFile =  ['???', '????', '???????'];
Searchfile=['???????', '?????', '?????????', '?????????', '?????????', '???????', '???'];
Linksfile =['???????', '????? ??????', '??? ??????', '????? ????', '??? ????'];
bigIfile = ['?????', '??????', '???? ??????', '??????????', '???????', '??????? ???????'];
Notefile = ['???? ?????????', '- ???? -'];
Allyfile = ['??? ???????', '????? ??????'];
Buildfile= ['?????? ????? ???'];
Spilerfile= ['????? ??????:'];
battlefile= ['???????:', '???????:', '???????:', '??????? ?????'];
var StyleX=['text-align: right;', ' 25px 5px 5px 25px;']
}/*Arabic 2 */

switch (lang) {case '.ru': case '.com.ua':
setupFile = ['??????????: ??????? ??????',
             '??????????: ?????? ?? ?????',  
             '??????????: ??????????? ???????',  
             '??????????: ??????',  
             '??????????: NPC ????????',  
             '??????????: ?????? ? ?????? ????????',  
             '??????????: ?????? ??????',  
             '??????????: ????? ????????'];  

SEVFile = ['?????????', '?????', '??????'];
Searchfile= ['??????', '???????', '???????', '?????????', '?????????????', '?????', '?????'];
Linksfile= ['??????', 'URL ??????', '???????? ??????', '???????? ??????', '??????? ???'];
Allyfile = ['??????', '?????'];
Notefile = ['???????', '- ????????? -'];
bigIfile = ['?????', '???????', '????? ?????', '????????', '???????', '??????????'];
Buildfile= ['????????????? ?????????? ?:'];
Spilerfile= ['?????:'];
battlefile= ['??????:', '?????????:', '?????????????:', '????? ??????????:'];
var StyleX= ['text-align: left;', ' 5px 25px 25px 5px;']
} //Russian (Ukranian)

var Xcss = '#xTable { background-color: white; width: 110%; padding: 2px; border: 1px solid silver; width: auto; margin-bottom: 5px; -moz-border-radius:'+StyleX[1]+'  -moz-box-shadow: 0px 0px 35px 0px rgb(125, 125, 125);}'+
           '#xName {text-align: center; text-shadow: gray 3px 2px 4px;}'+
           '#setting {opacity:0.94; z-index: 9999; top:185px; left:920px; position: absolute;}';
TAG("body")[0].setAttribute("id", "body");

var setting = document.createElement("div"); setting.setAttribute("id", "setting");
setting.innerHTML = ''+
'<table id="xTable" width="50%" cellspacing="1">'+
'<tbody>'+
'<tr><td id="xName">Travian Plus Tool hacked</td></tr>'+
'<tr><td style="text-align: center;">'+SEVFile[2]+': '+version+'</td></tr><div align="center"><hr></div>'+
'<tr style="color:gray; font-size:13px;">&nbsp;'+setupFile[0]+'<td><input type="CHECKBOX" id="GM_Icons"></td></tr>'+
'<tr style="color:gray; font-size:13px;">&nbsp;'+setupFile[1]+'<td><input type="CHECKBOX" id="GM_MPlus"></td></tr>'+
'<tr style="color:gray; font-size:13px;">&nbsp;'+setupFile[2]+'<td><input type="CHECKBOX" id="GM_RNeed"></td></tr>'+
'<tr style="color:gray; font-size:13px;">&nbsp;'+setupFile[3]+'<td><input type="CHECKBOX" id="GM_Links"></td></tr>'+
'<tr style="color:gray; font-size:13px;">&nbsp;'+setupFile[4]+'<td><input type="CHECKBOX" id="GM_ShNPC"></td></tr>'+
'<tr style="color:gray; font-size:13px;">&nbsp;'+setupFile[5]+'<td><input type="CHECKBOX" id="GM_VList"></td></tr>'+
'<tr style="color:gray; font-size:13px;">&nbsp;'+setupFile[6]+'<td><input type="CHECKBOX" id="GM_ShBox"></td></tr>'+
'<tr style="color:gray; font-size:13px;">&nbsp;'+setupFile[7]+'<td><input type="CHECKBOX" id="GM_Total"></td></tr>'+
'<hr>'+
'<tr><td style="'+StyleX[0]+'"><button id="save">'+SEVFile[0]+'</button><button id="out">'+SEVFile[1]+'</button></td></tr>'+
'</tbody>'+
'</table>';
document.body.appendChild(setting);
GM_addStyle(Xcss);

function saveSetting(){
GM_Setup("BI", "GM_Icons");
GM_Setup("MP", "GM_MPlus");
GM_Setup("rN", "GM_RNeed");
GM_Setup("PL", "GM_Links");
GM_Setup("NC", "GM_ShNPC");
GM_Setup("VL", "GM_VList");
GM_Setup("SB", "GM_ShBox");
GM_Setup("TR", "GM_Total");
window.location.reload();};

CB("GM_Icons", GM_getValue("BI"));
CB("GM_MPlus", GM_getValue("MP"));
CB("GM_RNeed", GM_getValue("rN"));
CB("GM_Links", GM_getValue("PL"));
CB("GM_ShNPC", GM_getValue("NC"));
CB("GM_VList", GM_getValue("VL"));
CB("GM_ShBox", GM_getValue("SB"));
CB("GM_Total", GM_getValue("TR"));


function closeX(){var XP = ID("setting"); XP.parentNode.removeChild(XP); }
AEL("save", "click", saveSetting, true);
AEL("out", "click", closeX, true);

var img_att = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2gkbASEmqindLwAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAACd0lEQVQokW2SW0hTARyHf56dnV3dvG5TSKMw6eaNHopMqMDILkLgk/YQ1FtPSV5KvGW1aYQPPiRZPaRgNyvDhyR0Cqk1nVaaKzOvmzk359Qz5852/j0UEdEHv8fv5ccHsuYRTZqI+EkTiYKKiPDvQqKoWtvYMI3NzZP54yix0KQAnl4g6CmC/kwImowKhEkE/IaIpCu87+qs01nkWvHCEBsLBjE5dWAU8Mya4Z9pLsXqUAX+wsP7yr/ZHaWTs3PgOA7xEdo6BuqdVYg5YVTIZBi3dkBYeHUJ3sFrALC8zlfPu92FA1YrpCwLQ4TWqFEqqsOICBAFbmGwppxZfFY4ZXfKUw+dD/iicvlpPlbV2dPDxel0/q1xhttZGelVDMMEGAAQRb9en154363MvaXX+APDEz+4L0uI7Onv56QsK+i04beyUpPuQeT1AMAAQMDnOOKdbmzYceBCk9twhUdiAYY+z2DD7we8U3z2voQm73RjQ8DnOPpHEkOAw/b6OG87+1CScFI1MLqA1bU1uMZeYJfqkzLMZSwmNt4uhn6dwwKAPDyxnZEnNS9+v1PQ5WmHVKHH+lQ39kd0g/WInNuesScyzZgvkcrXAQBBwa9aHO+8Ya4/Rq3FHNkeg7zWg+R3dZPXmkm2J6DWEimZ67PJNdF7MxQMqCQX8w/XfHheVjJkGcAy7cb21NMtq25nSnD5KZZcMgSVOS3vhkMpjgkLpJv2TI1um5SdsTwqGhkZAaL34tS568bktKzaTe/XNxRaQTSrhUyT/JKJ7p3reFBW8v5tF9RRWy6jr81IdyvzaNTSWSsIAfX/2hOEgHrM0mlqqsyjvjYj/QRCn02dqlhoUAAAAABJRU5ErkJggg%3D%3D';
var img_Car="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAMCAYAAAC5tzfZAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2gkBFxgdMqnRiAAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAABPklEQVQokW2RPUvDUBiFnxRnBcVAC21ISg2oi7OgW6W49Bc4qGCd3IQuglPB3UX/gIJIh4JQP7Yq4kcVDBqCDWlthRTq4A+4DiEX2+RM917OwznvfRUhBJ9vl6J5e0rLbWM7HUpb6xjzq0wlZxVilPCsagTwXJsf34nzB9D/y95+RZ7PTw45O9oUB+W8GIUUIQSeVRUAD40aF/UGAIX8Ippu4rk2LbfNbqUuqyYAtLmiMjmdZqW4LYGW20ZN5dB0E0PPcFDOC6t5LSL1Bv0OZi4tjaPqehYAYwC//pPsbegZ1FQu9gNe7msYMwtCJg36HQA03QSIgGFy17OG68WZQ4Ur+f6yA+jj9SZi8nsOfs/Bc+2h9/EJNZgplV3i7upYVgOGzGEKgJrMBnsCeH+uCeuxGqkESGBtY4flQkn5A4gLi9DMcKbiAAAAAElFTkSuQmCC";
var img_set="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2ggbDBEt1wWItwAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAEI0lEQVQ4jX2Ta0ybVRzGn/ft2yuXIrR00AKDLQLVMaYsbnOCYYlLFqdb/KAJGcmWTEyWLfGGH6YzxkviB5XMJYsRZxaDc0skRkGmSDcaRsd9hRKuoS2XUlp6v719b8dPLJMuPsn5ck5+T54n5/+nqqurqfr6emzJH4qAYZgjcobZbZsYc5eZSm8XGArBr1gpSRCIOr8G0Q1PlUiozYqaZze3OKvVCrS0tFCEEGydQfv0a7bJuWDf8Dhpeu+DK513BqqsTs/EyOCtg4QQ/PPL9T2tTScdF9889fyjXEtLC0Vjm5LJ1NvBUPiJB1MONNQduKIvMLzrXFyrnfZmvZ/2jZdNjlhuTDimzYl4QLadZbZfxFNsJMXyMBaVQKVWnk3EE0c0MhrBhHeXIh3tOf1yUfUhUwVyC4q2o5lmMhmuEoo6SoORgTDvSCJBKLCOjeWJmpRXg4jfAykdh7bmRIZZRs24LxhJsyJhRQFpXsTMwgJ++vkaTDkKCAyFRDQMhcwHgQv+f7K2cy/pEoX7TqwinzHqs6DWGNDxw9cwxWdwvG0Auaq7MOfz8N3/GzOO/pLS/c2PTxZbsu09fLzZEvM4L2i1OcjL08EX3IQ86EG5vgAaDQGEIEjKhaUVEZ0dv35z/kXjpbazB6n/JIu6xmqldPK3pyp3luW8dQ6jKxFITA5GbDaoeBZPHzoJpTwBEp6De2oUVhsFKcnqOT7+ScRPp/3u2a8AiDQAiKL0XJrjcpOxCHbIo3i1thjFOUp4nXbQAoeSHQSyYAfc9rvo7AxiM5oDmZwBJQEAXqcAw8OayXis3Tnj6PGtrSLNckj7nKjTJfHRhfMwms14Zk8EI7e78MfvcqRYHVQKJWiKRoyTEIqkjurKqtYe1jTubRQJl+Bc9nsIe90o3bUbSoFDbXEuPv/sEsYt32Fz1QSlioOKiyCcSGLKzYIAiHOhaMYHZGnzUFZpBk14TA8PIBoOgU/G4BnuhX1oEVqtDhq1Ep5AEj02PzwBAWq1HGqNInM0hsccfTo1/0q+wZCfna2Ga34a/iwtZu2TCIdCGBq1I8bLcH9qAyIhyFLRJMQSLw+JZCTTarNv9A7am++Nz88SmpFMJSVQquWoqH4ScqUcq+thuDybUCsVUDAy3hMn08Nu/vqCX8zNMDtw7JRYU1X+55DDeebLH7u7WV4UdfpC1NbtQ5HJCEpGgZErwBOknAmxe50l7byEPgpUIsMMAI6d+ZBcvdlr21mkb/riWlfr4IP5ZU4QCSEEgkREVyA5a1uJX44J6JBR+OuFcrl10c+nHrtOW/q0vSv2/cenv714+dbEG4urrYI/vt+6ELWtxcQ7hMCuoTFZlE0HrEuc9ChHmc1mqqGhARaLBXNzc4/z1gE4DCAGYBnACgB267GyshKNjY3o7+/HvwkJDUqJ+Z7eAAAAAElFTkSuQmCC";
var img_not="data:image/gif;base64,R0lGODlhFwAQAIABAODg4AAAACH5BAEAAAEALAAAAAAXABAAQAIVjI+py+0Po5y02ouz3rxjAIbiSIIFADs=";

function ajaxRequest(url, aMethod, param, onSuccess, onFailure) {
var aR = new XMLHttpRequest();
aR.onreadystatechange = function() {
if( aR.readyState == 4 && (aR.status == 200 || aR.status == 304))
onSuccess(aR);
else if (aR.readyState == 4 && aR.status != 200) onFailure(aR);};
aR.open(aMethod, url, true);
if (aMethod == 'POST') aR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
aR.send(param);};

function htmltocontext(source)
{ var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
  var doc = document.implementation.createDocument('','', dt);
  html = doc.createElement('html');
  html.innerHTML = source;
  doc.appendChild(html);
  return doc;}

function GET(url){
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.send("");
  respText=xhttp.responseText;
  return respText;
}

function format(maxtime){
var hrs = Math.floor(maxtime/3600);
var min = Math.floor(maxtime/60) % 60;
var sec = maxtime % 60;
var t = hrs + ":"; if(min < 10){t += "0";}
t += min + ":"; if(sec < 10){t += "0";}
t += sec; return t;}

function saveNote(){ Xpath("id('saved')").snapshotItem(0).innerHTML=''+Notefile[1]+''; };
function closer(){var XP = Xpath("id('Note_Pad')").snapshotItem(0); XP.parentNode.removeChild(XP); };

function NotePad(){
//-<{( Begin the NoteBook )}>-//
var note = document.createElement('div'); note.id = 'Note_Pad'; var saves = GM_getValue("notepadlog");
var csx = '#xNote {background-color: white; border: 2px solid gray; width: auto; -moz-border-radius: 0px 0px 25px 25px; -moz-box-shadow: 0px 0px 35px 0px rgb(125, 125, 125);}'+
          '#Note_Pad {opacity:0.97; z-index: 9999; top: 195px; left: 830px; position: absolute;}'+
          '#NP {text-shadow: gray 3px 2px 4px;}';
note.innerHTML+= ''+
'<table cellspacing="0" id="xNote">'+
'<thead><tr id="drag" class="rbg">&nbsp;<img src="img/x.gif" class="del" id="closeNote" style="cursor: pointer;">&nbsp;</tr></thead>'+
'<tbody><div align="center" id="NP">-~:{'+Notefile[0]+'}:~-</div><hr>'+
'<textarea style="border: 0px solid silver; background-image: url(&quot;'+img_not+'&quot;);" rows="7" cols="39" id="notic"></textarea>'+
'<div>&nbsp;</div><div align="center" class="btn"><input type="image" alt="save" src="img/x.gif" class="dynamic_img" id="btn_save" value="save">'+
'<div id="saved">&nbsp;</div></div></tbody></table>'; GM_addStyle(csx);
document.body.appendChild(note);
var savebutton = ID('btn_save');
function savelog() {var writtentext = ID('notic').value; GM_setValue("notepadlog", writtentext);};
AEL("btn_save", "click", function(){savelog(); saveNote();}, true);
AEL("closeNote", "click", closer, true);
var textboxy = ID('notic').value = saves;
if (ID("notic").value.match(/undefined/) !=null){ID("notic").value='';}
};

function ajaXpath(xpath, context){return document.evaluate(xpath, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);}
function Xpath(query, object) {if(!object) var object = document;return document.evaluate(query, document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);}
function Xhack(xpath, xpt, startnode, aDoc) {
    var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
    var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
    var XPIterate = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
    var XPResult = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
    if (!aDoc) aDoc = document;
    if (!startnode) startnode = document;
    var xpres = XPFirst;
    switch (xpt) {case 'i': xpres = XPIterator; break; case 'l': xpres = XPList; break; case 'r': xpres = XPResult; break;};
    var ret = aDoc.evaluate(xpath, startnode, null, xpres, null);
    return (xpres == XPFirst ? ret.singleNodeValue : ret);
};

ID("ltimeWrap").innerHTML+=' <div align="auto"> Travian Plus Tool hacked <a href="'+scriptP+'" title="'+SEVFile[2]+':'+version+'" target="_blank"> '+version+' </a> </div> ';
ID("ltimeWrap").innerHTML+=''+
                                                '<div align="center" class="rbg" style="width:auto; position: absolute; top: 38px;">'+
                                                '&nbsp;<img style="cursor:pointer;" id="NoteBook" src="data:image/gif;base64,R0lGODlhEAAQAHcAACH5BAEAAAAALAAAAAAQABAAh/+HiiZsJiabJkWsRUd9R22BbXaNdn3BfYSJho2SjpmZmZnMmZyOdKalpqjEqKy1rK21pa+vr7LMsrOys7W9tb25xb29v8LGx8XHzszMzNDS2dGob9LCrtLUz9bW1tfb1tfdwd/u9eC1f+GiUuHm6+bm5ufRtOfd7efr6OrbzOrp6+zn5+/r5+/v7+/37/L4//Pv7fT08vy0IPz49P2Dg/3xzP328P7fvP+uo//Hw//Kef/Wif/ZrP/kt//mvf//6P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAi0AEskUDCwoAKCCDwAWUiCwoWHEB9aaKBgIZAWFjNafJDAxUIWGjU+OHACRw4UITNGKGAiAw2MKRdyEIFhQ4gSMYHA2NFjRIiLMX/o6CEDxEKcIXf6kDGgg0eYGWfoWAohgAeQSC3O2FFDRo0LAjqQAJrxxtIULioQkBADCNIZMWDw0JECRQsLAxwcjRHjhY0EDDJo+NBigoEFe1nEUFEihgsWJUpQoODxIl++LTKjWIEiQ8aAADs=" />'+
                                                '&nbsp;-<a href="allianz.php"><img title="'+Allyfile[0]+'" src="img/x.gif" class="unit ugeb" /></a>'+
                                                '&nbsp;-<img id="setup" style="cursor: pointer;" src="'+img_set+'" />&nbsp;</div>';
AEL("NoteBook", "click", NotePad, false);

function setup(){

document.body.appendChild(setting);
function saveSetting(){
GM_Setup("BI", "GM_Icons");
GM_Setup("MP", "GM_MPlus");
GM_Setup("rN", "GM_RNeed");
GM_Setup("PL", "GM_Links");
GM_Setup("NC", "GM_ShNPC");
GM_Setup("VL", "GM_VList");
GM_Setup("SB", "GM_ShBox");
GM_Setup("TR", "GM_Total");
window.location.reload();};
CB("GM_Icons", GM_getValue("BI"));
CB("GM_MPlus", GM_getValue("MP"));
CB("GM_RNeed", GM_getValue("rN"));
CB("GM_Links", GM_getValue("PL"));
CB("GM_ShNPC", GM_getValue("NC"));
CB("GM_VList", GM_getValue("VL"));
CB("GM_ShBox", GM_getValue("SB"));
CB("GM_Total", GM_getValue("TR"));

function closeIt(){var close = ID("setting"); close.parentNode.removeChild(close);};
                   
AEL("save", "click", saveSetting, true);
AEL("out", "click", closeX, true);};
AEL("setup", "click", setup, true);

var LinkN = document.createElement("span");
LinkN.innerHTML = '<div><a href="login.php">'+Allyfile[1]+'</a></div>';
TargeN = ID("side_navi").getElementsByTagName("p")[1].getElementsByTagName("a")[1];
//TargeN.parentNode.appendChild(LinkN);


function getID(aID) {return (aID != '' ? ID(aID) : null);};
function UNDF(aElem, att) {if (att !== undefined) {for (var xi = 0; xi < att.length; xi++) {aElem.setAttribute(att[xi][0], att[xi][1]); if (att[xi][0].toUpperCase() == 'TITLE') aElem.setAttribute('alt', att[xi][1]);};};};//Acr111-addAttributes
function CTD(iHTML, att) {var aCell = document.createElement("TD"); aCell.innerHTML = iHTML; UNDF(aCell, att); return aCell;};
function CA(iHTML, att) {var aLink = document.createElement("A"); aLink.innerHTML = iHTML; UNDF(aLink, att); return aLink;};
function CELM(nElem, att) {var Elem = document.createElement(nElem); UNDF(Elem, att); return Elem;};
function CELMe(nElem, oElem, att) {var Elem = document.createElement(nElem); if (oElem !== undefined) if( typeof(oElem) == 'object' ) Elem.appendChild(oElem); else Elem.innerHTML = oElem; UNDF(Elem, att); return Elem;};
function ajaxNDIV(aR) {var ad = CELMe('div',aR.responseText,[['style','display:none;']]); return ad;};
function dummy() {return;};
jsVoid = 'javaScript:void(0)';
jsNone = 'return false;';

//--> market place <--//
if (ID("GM_MPlus").checked == true){
if (ID("send_select") != null) {
targetLM = ID("send_select");
var getHack = CLASS("max")[0].getElementsByTagName("a")[0].innerHTML;
var marketPl = document.createElement("div"); marketPl.innerHTML = ''+
'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
' <a class="sAll" href="javascript:void(0)" onmouseup="add_res(1);add_res(2);add_res(3);add_res(4);" title="All Res + Wheat">'+getHack+'</a> | <a class="sAll" href="javascript:void(0)" onmouseup="add_res(1);add_res(2);add_res(3);" title="Res Only">'+getHack+'</a>';
targetLM.parentNode.insertBefore(marketPl, targetLM);
function DeleteAll(){
ID("r1").value=null;
ID("r2").value=null;
ID("r3").value=null;
ID("r4").value=null;};
var Creat = document.createElement("span");
Creat.innerHTML = ' / <a href="'+jsVoid+'"><img title="Delete All" src="img/x.gif" class="del"></a> ';
Creat.addEventListener("click", DeleteAll, false);
var TBtn = CLASS("sAll")[0];
TBtn.parentNode.appendChild(Creat);}

acss =	"table#mbuyf {width:auto; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:white; padding:2px; margin:1px;}" +
    "table#mbuyf tr {border-collapse:collapse; border:1px solid silver; text-align:center;}" +
    "table#mbuyf td {border:1px solid silver; background-color:transparent; padding:2px; border-collapse:collapse;}" +
    "table#mbuyf td.sf {background-color:yellow;}";

GM_addStyle(acss);

if (document.location.href.indexOf("/nachrichten.php") != -1) {
if (ID("overview") != null) {
ID("overview").getElementsByTagName("tfoot")[0].getElementsByTagName("tr")[0].getElementsByTagName("th")[0].innerHTML='<input class="check" id="s10" name="s10" onclick="Allmsg(this.form);" type="checkbox">';
}}

function getUserID() {
    dleft = "side_navi";
    var uLink = Xhack("//div[@id='" + dleft + "']//a[contains(@href, 'spieler.php')]");
    return (uLink) ? uLink.href.split("uid=")[1] : null;
};

function applyFilter_hide() {
    var market = ID("range").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    for (mr in market) {
        var market_hide = [0,0,0];
        var mf = market_all[mr].split(";");
        for ( var i = 1; i < 3; i++ ) {
            for ( var j = 1; j < 5; j++ ) {
                if( mf[i-1] == market_fi[10*i+j-1]*j || market_fc[i] == 0 ) {
                    market_hide[i] = 1;
                }
            }
        }
        if( market_fi[30] == 1 && mf[2] < 1 ) { market_hide[0] = 1; }
        if( market_fi[31] == 1 && mf[2] == 1 ) { market_hide[0] = 1; }
        if( market_fi[32] == 1 && mf[2] >= 1 ) { market_hide[0] = 1; }
        if( market_fi[33] == 1 && mf[2] > 1 ) { market_hide[0] = 1; }
        if( market_fc[3] == 0 ) { market_hide[0] = 1; }
        // apply filter
        if( market_hide[0]*market_hide[1]*market_hide[2] == 1 ) {
            market[mr].style.display = '';
        } else {
            market[mr].style.display = 'none';
        }
    }
}

function applyFilter_row( row ) {
    market_fc[row] = 0;
    for ( var i = 0; i < 4; i++ ) {
        var TD = ID('filter' + (row*10+i));
        if ( market_fi[row*10+i] != 0 ) {
            market_fc[row]++;
            TD.setAttribute('class', 'sf');
        } else {
            TD.removeAttribute('class');
        }
    }
}

function applyFilter( fi ) {
    var row = Math.round(fi/10);
    if( market_fi[fi] == 0 && ( market_fc[row] > 2 || row > 2 )) {
        for ( var i = 0; i < 4; i++ ) {
            market_fi[row*10+i] = 0;
        }
    }
    market_fi[fi] = 1 - market_fi[fi];
    applyFilter_row( row );
    applyFilter_hide();

    var mf_cookie = '';
    for( var i=1; i < 4; i++ ) {
        for ( var j=0; j < 4; j++ ) {
            mf_cookie += market_fi[i*10+j] + ',';
        }
        mf_cookie += ';';
    }
    GM_setValue(GMcookieID + "-mf", mf_cookie);
}

function market_restore() {
    var mf_cookie;
    mf_cookie = GM_getValue(GMcookieID + "-mf", "0,0,0,0,;0,0,0,0,;0,0,0,0,;");
    if ( mf_cookie == undefined ) return;
    var rows = [];
    rows = mf_cookie.split(";");
    for( var i=1; i < 4; i++ ) {
        var cels = [];
        cels = rows[i-1].split(",");
        for ( var j=0; j < 4; j++ ) {
            market_fi[i*10+j] = cels[j];
        }
        applyFilter_row( i );
    }
    applyFilter_hide();
}

function marketBuy() {

    if ( crtPath.indexOf('&t=1') == -1 && crtPage.indexOf('&t=1&u=') != -1 ) return;

    var resIMG = [];
    for ( var i=0; i<4; i++ ) {
        resIMG[i] = ID("resWrap").getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[i*2].getElementsByTagName("img")[0].getAttribute("alt");
    }

    // add new 2 field (ally & x/y)
    var market = ID("range").getElementsByTagName("thead")[0].getElementsByTagName("tr");
    market[0].getElementsByTagName("th")[0].setAttribute("colspan","7");

    var TM = [];
//	TM.push(market[1].getElementsByTagName("td")[0].childNodes.item(0).nodeValue);
    TM.push(market[1].getElementsByTagName("td")[0].innerHTML.replace(/<.*>/g, ""));
    TM.push(market[1].getElementsByTagName("td")[1].innerHTML.replace(/<.*>/g, ""));

    ID("range").getElementsByTagName("tfoot")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].setAttribute("colspan","7");

    // create filter table
    var d = ID('build');
    var p = document.createElement('p');
        p.setAttribute("align", "center")
    var newTABLE = document.createElement('table');
    p.appendChild(newTABLE);

    newTABLE.setAttribute('id', 'mbuyf');
    d.insertBefore(p, ID('range'));

    for( var i=1; i<3; i++ ) {
        var newTR = document.createElement('tr');
        var newTD = document.createElement('td');
        newTD.appendChild(document.createTextNode(TM[i-1]));
        newTR.appendChild(newTD);
        for( var j = 0; j < 4; j++ ) {
            var newTD = CTD('', [['id', 'filter' + i + j]]);
            var newIMG = document.createElement('img');newIMG.innerHTML='<img alt="'+resIMG[j]+'" title="'+resIMG[j]+'" class="r'+(j+1)+'" src="img/x.gif" />';
            newTD.appendChild(newIMG);
            newTD.addEventListener('click', function(x) { return function() { applyFilter(x); }}(i*10+j), 0);
            newTR.appendChild(newTD);
            market_fi[i*10+j] = 0;
        }
        newTABLE.appendChild(newTR);
        market_fc[i] = 0;
    }
    var aLabels = ['->1', '1:1', '>1<', '1<-'];
    for (var i = 0; i < 4; i++){
        var newTD = CTD('', [['id', 'filter' + 3 + i]]);
        var ref = CA(aLabels[i], [['href', jsVoid]]);
        newTD.addEventListener('click', function(x) { return function() { applyFilter(x); }}(30+i), 0);
        newTD.appendChild(ref);
        newTR.appendChild(newTD);
        market_fi[30+i] = 0;
    };
    newTABLE.appendChild(newTR);

    // calculate offer/wanted rate
    var market = ID("range").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    for (mr in market)
    {
        var offer
        var wanted;

        offer = market[mr].getElementsByTagName("td")[0];
        wanted = market[mr].getElementsByTagName("td")[1];
        market[mr].getElementsByTagName("td")[4].setAttribute("style","font-size:8pt;");

        offer.value = PR( offer.childNodes.item(2).nodeValue );
        offer.type = offer.childNodes.item(1).getAttribute('class').substring(1);

        wanted.value = PR( wanted.childNodes.item(2).nodeValue );
        wanted.type = wanted.childNodes.item(1).getAttribute('class').substring(1);

        var mrate = Math.round(offer.value/wanted.value * 100)/100;
        market_all[mr] = offer.type + ';' + wanted.type + ';' + mrate;
    }
    // restore filter settings
    market_restore();
}

function start_script() {
    GMcookieID = crtName + '-' + getUserID();

    if (crtPath.match(/build.php\?(.*)&t=1/)) marketBuy();
    GM_registerMenuCommand("Check update - Private TPTH <Craja>", updateTPTH);
}

var crtPath = window.location.href;
var	crtName = crtPath.replace(/.*\/(.*)\/.*/, "$1");
window.addEventListener('load', start_script , false);}
//************('RES-TRP-OVERVIEW')*****************//
var Vlist = ID("vlist")
if (Vlist !=null) {
	var GM = "#RView {opacity:0.94; z-index: 9999; top: 25px;"+
    	" right: -99px; width: auto; position: absolute;"+
        " border: 1px solid silver;"+
        " -moz-border-radius: 5px 5px 5px 5px;"+
        " -moz-box-shadow: 0px 0px 35px 0px rgb(125, 125, 125);}"+
        "#Qview {width:auto; text-shadow: 0px 0px 5px gray;}";
  	function CX(){
	  	ID("RView").setAttribute("style", "display: none;");
		AEL("RV", "click", function(){ID("RView").removeAttribute("style");}, true);
  	};
  	var JS = ID("vlist").getElementsByClassName("link").length;
	function resView(){
		ID("side_info").innerHTML+=''+
		'<table id="RView" cellspacing="1">'+
		'<thead style="width:auto;"><tr>&nbsp;</tr>'+
		'<tbody id="Qview"></tbody>'+
		'<tbody><tr><td><button id="X" style="text-align: center;">'+SEVFile[1]+'</button></td></tr></tbody></table>'; 
		GM_addStyle(GM);
		for (var X=0;X<JS;X++){
			var getTds = ID("vlist").getElementsByClassName("link")[X];
			var getIt = getTds.getElementsByTagName("div")[0];
			getA = getIt.getElementsByTagName("a")[0].href.split("newdid=")[1];
			var testA = GET('nachrichten.php?newdid='+getA+'&t=6');
			var tempA = document.createElement("span"); 
			tempA.innerHTML = testA; 
			var A = ajaXpath("//div[@id='resWrap']/table/tbody/tr", tempA).snapshotItem(0).innerHTML;
			//alert(A); craja
			ID("Qview").innerHTML+='<tr style="width:auto;" id="RPlus"><td style="text-align: center; text-shadow: 0px 0px 0px white;">'+getIt.innerHTML+'</td>'+A+'&nbsp;</tr>';
		}
		AEL("X", "click", CX, false);
	};
	var TX = ID("vlist").getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].innerHTML.split(":")[0];
	ID("vlist").getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].innerHTML = ''+TX+'<span style="font-size:11px;">('+JS+')</span>:';
	Xpath("//table[@id='vlist']/thead/tr/td").snapshotItem(0).innerHTML+='&nbsp;<a id="RV" style="cursor:pointer; font-size:11px; color:green;">[+]</a>';
	AEL("RV", "click", function(){resView();}, true);
}
//*****************//

//******************************//
if (document.location.href.indexOf("/a2b.php") != -1 || document.location.href.indexOf("/berichte.php?id=") != -1 || document.location.href.indexOf("/karte.php?d=") != -1){
function $(id){
	return ID(id);
};
var ats=new Array(0,0,0,0,0,0,0,0,0,0); 
var dts=new Array(0,0,0,0,0,0); 
var tab;
var warsim=0;
var grafpack='';
var worksave = 1;
var saveBeta = '';
romans=new Array();
romans[0] = new Array(40,35,50,120,100,180,40,1,6,40);
romans[1] = new Array(30,65,35,100,130,160,70,1,5,20);
romans[2] = new Array(70,40,25,150,160,210,80,1,7,50);
romans[3] = new Array(0,20,10,140,160,20,40,2,16,0);
romans[4] = new Array(120,65,50,550,440,320,100,3,14,100);
romans[5] = new Array(180,80,105,550,640,800,180,4,10,70);
romans[6] = new Array(60,30,75,900,360,500,70,3,4,0);
romans[7] = new Array(75,60,10,950,1350,600,90,6,3,0);
romans[8] = new Array(50,40,30,30750,27200,45000,37500,4,4,0);
romans[9] = new Array(0,80,80,5800,5300,7200,5500,1,5,1600);
romans[10] = new Array(0,0,0,0,0,0,0,6,0,0);
romans[11] = new Array(1,1,1,0,0,0,1,1,1,1,0)
romans[12] = new Array(0,0,0,1,1,1,0,0,0,0,0)
teutons=new Array();
teutons[0] = new Array(40,20,5,95,75,40,40,1,7,60);
teutons[1] = new Array(10,35,60,145,70,85,40,1,7,40);
teutons[2] = new Array(60,30,30,130,120,170,70,1,6,50);
teutons[3] = new Array(0,10,5,160,100,50,50,1,9,0);
teutons[4] = new Array(55,100,40,370,270,290,75,2,10,110);
teutons[5] = new Array(150,50,75,450,515,480,80,3,9,80);
teutons[6] = new Array(65,30,80,1000,300,350,70,3,4,0);
teutons[7] = new Array(50,60,10,900,1200,600,60,6,3,0);
teutons[8] = new Array(40,60,40,35500,26600,25000,27200,4,4,0);
teutons[9] = new Array(10,80,80,7200,5500,5800,6500,1,5,1600);
teutons[10] = new Array(0,0,0,0,0,0,0,6,0,0);
teutons[11] = new Array(1,1,1,0,0,0,1,1,1,1,0)
teutons[12] = new Array(0,0,0,1,1,1,0,0,0,0,0)
gauls = new Array(10);
gauls[0] = new Array(15,40,50,100,130,55,30,1,7,30);
gauls[1] = new Array(65,35,20,140,150,185,60,1,6,45);
gauls[2] = new Array(0,20,10,170,150,20,40,2,17,0);
gauls[3] = new Array(90,25,40,350,450,230,60,2,19,75);
gauls[4] = new Array(45,115,55,360,330,280,120,2,16,35);
gauls[5] = new Array(140,50,165,500,620,675,170,3,13,65);
gauls[6] = new Array(50,30,105,950,555,330,75,3,4,0);
gauls[7] = new Array(70,45,10,960,1450,630,90,6,3,0);
gauls[8] = new Array(40,50,50,30750,45400,31000,37500,4,5,0);
gauls[9] = new Array(0,80,80,5500,7000,5300,4900,1,5,1600); 
gauls[10] = new Array(0,0,0,0,0,0,0,6,0,0);
gauls[11] = new Array(1,1,1,0,0,0,1,1,1,1,0)
gauls[12] = new Array(0,0,1,1,1,1,0,0,0,0,0)
nature = new Array(10)
nature[0] = new Array(10,25,10,0,0,0,0,1,20,0);
nature[1] = new Array(20,35,40,0,0,0,0,1,20,0);
nature[2] = new Array(60,40,60,0,0,0,0,1,20,0);
nature[3] = new Array(80,66,50,0,0,0,0,1,20,0);
nature[4] = new Array(50,70,33,0,0,0,0,2,20,0);
nature[5] = new Array(100,80,70,0,0,0,0,2,20,0);
nature[6] = new Array(250,140,200,0,0,0,0,3,20,0);
nature[7] = new Array(450,380,240,0,0,0,0,3,20,0);
nature[8] = new Array(200,170,250,0,0,0,0,3,20,0);
nature[9] = new Array(600,440,520,0,0,0,0,5,20,0);

var imgatti="http://travian.kirilloid.ru/img/un/a/att_i.gif";
var imgattc="http://travian.kirilloid.ru/img/un/a/att_c.gif";

var cssString = ".TPH_help{" +
"position:absolute;" +
"padding: 4px;" +
"z-index: 400;" +
"border: solid 1px #00C000;" +
"background-color: #FEFFE3;" +
"}";

var XPFirst=XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList=XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
function find(xpath,xpres){
  var ret=document.evaluate(xpath,document,null,xpres,null);
  return  xpres==XPFirst ? ret.singleNodeValue : ret;
}
function elem(tag,class,content){
	var ret=document.createElement(tag);
	ret.innerHTML=content;
	if(class!="")ret.className=class;
	return ret;
}

function imgp(src){
	if(grafpack!=''){
		return grafpack+src;
	}else return src;
}

function showHelp(ev) {
	var imgNode = ev.target;
	var imgTitle = imgNode.title;
	var imgNumber = imgNode.className.match(/u(\d+)/).pop();
	var race = PR((imgNumber-1)/10);
	var unit = imgNumber - race * 10 - 1;
	switch (race) {
		case 0:tm=romans;break;
		case 1:tm=teutons;break;
		case 2:tm=gauls;break;
		case 3:tm=nature;break;
		default:tm=null;break;
	}
	$("TPH_help").innerHTML = "";
	$("TPH_help").appendChild(elem("div", "f10 b", imgTitle));
	if (tm != null) {
		var str =   "<div><img class='att2' src='img/x.gif'><span>=" + tm[unit][0] + "</span></div>"
		str = str + "<div><img class='def_i' src='img/x.gif'><span>=" + tm[unit][1] + "</span></div>"
		str = str + "<div><img class='def_c' src='img/x.gif'><span>=" + tm[unit][2] + "</span></div>"
		str = str + "<div><img class='unit u14' src='img/x.gif'><span>=" + tm[unit][8] + "</span></div>"
		str = str + "<div><img src='"+img_Car+"'><span>=" + tm[unit][9] + "</span></div>"
		$("TPH_help").appendChild(elem("div", "f10 b", str));
	}
	$("TPH_help").style.display = "";
}

function showHelp_move(ev){
	var x=ev.pageX;
	var y=ev.pageY;
	$("TPH_help").style.top=y + 30 + 'px';
	$("TPH_help").style.left=x + -20 + 'px';
}

function main(){
	var access=0;
	if (window.location.href.match(/a2b.php/)) access=1;
	if (window.location.href.match(/berichte.php\?/)) access=1;
	if (window.location.href.match(/warsim.php/)) access=1;
	if (window.location.href.match(/karte.php\?/)) access=1;
	if (access==0) return;
	
	GM_addStyle(cssString);
	if(GM_getValue('TPH_tooltips', '1') == '1') {
		var imgList = find("//img[contains(@class, 'unit')]", XPList);
		
		var div = document.createElement("div");
		div.id = "TPH_help";
		div.setAttribute("style", "position:absolute; padding: 4px; z-index: 400; border: solid 1px black; background-color: white; display: none;");
		document.body.appendChild(div);
	
		document.addEventListener('mousemove', showHelp_move, false);
	
		for( var i = 0; i < imgList.snapshotLength; i++) {
			imgList.snapshotItem(i).addEventListener("mouseover", showHelp, false);
			imgList.snapshotItem(i).addEventListener("mouseout", function() { $("TPH_help").style.display = "none";}, false);
		}
	}
	
	if(GM_getValue('oazis')==undefined)GM_setValue('oazis','');
	var gp=find('//link[@rel="stylesheet"]',XPList);
	for(var i=0;i<gp.snapshotLength;i++){
		var csspos=gp.snapshotItem(i).href.indexOf('unx.css');
		if (csspos!=-1){
			grafpack=gp.snapshotItem(i).href.substring(0,csspos);
		}
	};
	if (window.location.href.match(/a2b.php/)){
		genreporta2b();
		document.addEventListener('keyup',a2b,false);
		document.addEventListener('click',a2b,false);
		return;
	}
	if (window.location.href.match(/karte.php\?/)){
		nn=ID('troop_info');
		if(nn==null)return;
		imgc=document.createElement('img');
		imgc.src='img/x.gif';
		imgc.id='TPH_imgcopy';
		imgc.setAttribute('style', 'cursor:pointer');
		imgc.addEventListener('click',kartec,false);
		nn.childNodes[1].childNodes[0].childNodes[1].appendChild(imgc);
		oazicinfo()
		return;
	}	
	tab=find("//table[@class='tbg']/tbody",XPList);
	if (window.location.href.match(/warsim.php/)){
			nn=find("//table[@id='defender']/thead/tr/th", XPList);
			if(nn.snapshotLength==0)return;
			imgpa=document.createElement('img');
			imgpa.id='ba_imgp';
			imgpa.src='img/x.gif';
			imgpa.setAttribute('style', 'cursor:pointer');
			imgpa.addEventListener('click',kartep,false);
			nn.snapshotItem(0).appendChild(imgpa);
			var mass=GM_getValue('oazis').split(',');
			if(document.getElementsByName('a2_'+mass[0]).length==0){
				imgpa.style.display='none';
			};
		warsim=1;
	}else{
		
		var tabreport = ID('report_surround');
		if(!tabreport) return;
			var fa = tabreport.getElementsByTagName('a');
			for( var i = 0; i < fa.length; i++) {
				fa[i].href = fa[i].href;
			}
		//
		saveBeta ='<table><tbody>' + tabreport.innerHTML + '</tbody></table>';
		
		for( var i = 1; i < 60; i++) 
			saveBeta = saveBeta.
			replace('img/x.gif" class="unit u'+i+'"','img/un/u/'+i+'.gif" class="unit u'+i+'"').
			replace('img/x.gif" class="unit u'+i+'"','img/un/u/'+i+'.gif" class="unit u'+i+'"').
			replace('img/x.gif" class="unit u'+i+'"','img/un/u/'+i+'.gif" class="unit u'+i+'"').
			replace('img/x.gif" class="unit u'+i+'"','img/un/u/'+i+'.gif" class="unit u'+i+'"').
			replace('img/x.gif" class="unit u'+i+'"','img/un/u/'+i+'.gif" class="unit u'+i+'"');
		saveBeta = saveBeta.replace(/img ilo-full-src=/ig, 'img src=');

	}
	if(warsim==1){
		table=find("//table[@class='results attacker']", XPFirst).getElementsByTagName("td");
	} else {
		table=ID('attacker').getElementsByTagName("td");
	}
	attacktable();

	if(warsim==1){
		tab=find("//table[@class='results defender']", XPList);
	} else {
		tab=find("//table[@class='defender']",XPList);
	}
	
	
	for(var i=0;i<tab.snapshotLength;i++){
		if(tab.snapshotItem(i).parentNode.id!='war'){
			table=tab.snapshotItem(i).getElementsByTagName("td");
			deftable();
		};
	}
	generatereport();
}

function attacktable(){
	GM_log("+attacktable");
	var statushero=0;
	var statustrap=0;
	var troops=0;
	var lostres=new Array(0,0,0,0);
	var atstemp=new Array(0,0,0,0,0,0,0,0,0,0);
	if(table[3-warsim*2].innerHTML.indexOf("u1")>0) troops=1;
	if(table[3-warsim*2].innerHTML.indexOf("u11")>0) troops=2;
	if(table[3-warsim*2].innerHTML.indexOf("u21")>0) troops=3;
	switch (troops){
		case 1:tm=romans;break;
		case 2:tm=teutons;break;
		case 3:tm=gauls;break;
		default:tm=null;break;
	}
	if(tm!=null){
		if(table[13-warsim*2].innerHTML.indexOf("img")>0) {statushero=1;ats[5]=1;}
		if (warsim != 1) {
			var tda=13+statushero;
			var tdl=23+statushero*2;
		} else {
			var tda=11+statushero;
			var tdl=21+statushero*2;
		}
		var tdt=0;
		if(!warsim&&(table.rows>4)){
			if(table[36+statushero*3].getAttribute('colspan')==null)tdt=36+statushero*3;
		}
		for(var i=0;i<=(9+statushero);i++){
			atstemp[0]=atstemp[0]+table[tda+i].textContent*tm[i][0];
			lostres[0]=lostres[0]+table[tdl+i].textContent*tm[i][3];
			lostres[1]=lostres[1]+table[tdl+i].textContent*tm[i][4];
			lostres[2]=lostres[2]+table[tdl+i].textContent*tm[i][5];
			lostres[3]=lostres[3]+table[tdl+i].textContent*tm[i][6];
			atstemp[4]=atstemp[4]+table[tda+i].textContent*tm[i][7];
			atstemp[6]=atstemp[6]+table[tdl+i].textContent*tm[i][7];
			atstemp[8]=atstemp[8]+table[tda+i].textContent*tm[11][i]*tm[i][0];
			atstemp[9]=atstemp[9]+table[tda+i].textContent*tm[12][i]*tm[i][0];
			if(tdt!=0){
				atstemp[7]=atstemp[7]+table[tdt+i].textContent*tm[i][7];
				atstemp[3]=atstemp[3]+(table[tda+i].textContent-table[tdl+i].textContent-table[tdt+i].textContent)*tm[i][9];
			}else{
				atstemp[3]=atstemp[3]+(table[tda+i].textContent-table[tdl+i].textContent)*tm[i][9];
			}
		}
		atstemp[1]=lostres[0]+lostres[1]+lostres[2]+lostres[3];
		var rescell=find("//tbody[@class='goods']/tr/td/div[@class='res']",XPFirst);
		if(rescell==null) rescell=find("//tbody[@class='res']/tr/td",XPFirst)
		if (rescell!=null){
			res=rescell.innerHTML.match(/>(\d+).+>(\d+).+>(\d+).+>(\d+)/);
//			alert(res);
			atstemp[2]=PR(res[1])+PR(res[2])+PR(res[3])+PR(res[4]);
		}
		attHTML = '<img src="'+imgatti+'" align="auto">&nbsp;<font class="f8">'+atstemp[8]+'</font>&nbsp; | &nbsp;';
		attHTML += '<img src="'+imgattc+'" align="auto">&nbsp;<font class="f8">'+atstemp[9]+'</font>&nbsp; | &nbsp;';
		attHTML += '<img src="'+img_att+'" align="auto">&nbsp;<font class="f8">'+atstemp[0]+'</font>';

        ID("attacker").innerHTML+='<tbody id="" class="goods"><tr><td><font class="f8">'+battlefile[1]+'</font></td><td align="auto" colspan="99"><font class="f8">'+attHTML+'</font></td></tr></tbody>';
        
        if (CLASS("carry")[0] !=null){
        var getA = CLASS("carry")[0].innerHTML.split(">")[1];
        CLASS("carry")[0].innerHTML+=' <span id="carryA">'+getA+'</span>';
        var getA = ID("carryA").innerHTML.split("/")[0];
        var getB = ID("carryA").innerHTML.split("/")[1];
        var getC = PR(getA) - PR(getB);
        ID("carryA").innerHTML='<span style="font-size:11px; font-weight: bold;">'+getC+'</span>';
        if (ID("carryA").innerHTML.match(/-/) !=null){ID("carryA").setAttribute("style", "color: red;");}
        if (getC >= 0){ID("carryA").innerHTML='';
        CLASS("carry")[0].setAttribute("style", "color: green;");
        CLASS("carry")[0].setAttribute("title", ""+battlefile[3]+"");}}

		rowi=document.createElement("tr");
		cell1=document.createElement("td");
		cell1.innerHTML='<font class="f8">'+battlefile[0]+'</font>';
		cell2=document.createElement("td");
		cell2.setAttribute("align","auto");
		cell2.setAttribute("colspan",10+statushero);
		cell2.style.textAlign = "auto";
		cell2.innerHTML='<font class="f8"> <img class="r1" src="img/x.gif">'+lostres[0]+'&nbsp;+&nbsp;<img class="r2" src="img/x.gif">'+lostres[1]+'&nbsp;+&nbsp;<img class="r3" src="img/x.gif">'+lostres[2]+'&nbsp;+&nbsp;<img class="r4" src="img/x.gif">'+lostres[3]+'&nbsp;=&nbsp;[<b>-'+atstemp[1]+'</b>]</font>';
		rowi.appendChild(cell1);
		rowi.appendChild(cell2);
		tbody=document.createElement("tbody");
		tbody.id="TPH_info";
		tbody.className="goods";
		tbody.appendChild(rowi);

		table[0].parentNode.parentNode.parentNode.appendChild(tbody);

	};
	for(var i=0;i<ats.length;i++){
		ats[i]=ats[i]+atstemp[i];
	};
};

function deftable(){
	GM_log("+deftable")
	var statushero=0;
	var troops=0;
	var lostres=new Array(0,0,0,0);
	var dtstemp=new Array(0,0,0,0,0,0);
	var lostEnable = 1
	if(table[3-warsim*2].innerHTML.indexOf("u1")>0) troops=1;
	if(table[3-warsim*2].innerHTML.indexOf("u11")>0) troops=2;
	if(table[3-warsim*2].innerHTML.indexOf("u21")>0) troops=3;
	if(table[3-warsim*2].innerHTML.indexOf("u31")>0) troops=4;
	switch (troops){
		case 1:tm=romans;break;
		case 2:tm=teutons;break;
		case 3:tm=gauls;break;
		case 4:tm=nature;break;
		default:tm=null;break;
	}
	if(tm!=null){
		if(table[13-warsim*2].innerHTML.indexOf("img")>0) {statushero=1;dts[4]=1;}
		if (warsim != 1) {
			var tda=13+statushero;
			var tdl=23+statushero*2;
		} else {
			var tda=11+statushero;
			var tdl=21+statushero*2;
		}
		if (!table[tdl]) {
			lostEnable = 0;
		}
		for(var i=0;i<=(9+statushero);i++){
			dtstemp[0]=dtstemp[0]+table[tda+i].textContent*tm[i][1];
			dtstemp[1]=dtstemp[1]+table[tda+i].textContent*tm[i][2];
			dtstemp[3]=dtstemp[3]+table[tda+i].textContent*tm[i][7];
			if (lostEnable){
				lostres[0]=lostres[0]+table[tdl+i].textContent*tm[i][3];
				lostres[1]=lostres[1]+table[tdl+i].textContent*tm[i][4];
				lostres[2]=lostres[2]+table[tdl+i].textContent*tm[i][5];
				lostres[3]=lostres[3]+table[tdl+i].textContent*tm[i][6];
				dtstemp[5]=dtstemp[5]+table[tdl+i].textContent*tm[i][7];
			}
		}
	dtstemp[2]=lostres[0]+lostres[1]+lostres[2]+lostres[3];
	var getA = '<img class="def_i" src="img/x.gif" align="auto">&nbsp;<font class="f8">'+dtstemp[0]+'</font>&nbsp; | &nbsp;<img class="def_c" src="img/x.gif" align="auto">&nbsp;<font class="f8">'+dtstemp[1]+'</font>';
    CLASS("defender")[0].innerHTML+='<tbody class="goods"><tr><td><font class="f8">'+battlefile[2]+'</font></td><td align="auto" colspan="99" style=""><font class="f8">'+getA+'</font></td></tr></tbody>';
	rowi=document.createElement("tr");
	cell1=document.createElement("td");
	cell1.innerHTML='<font class="f8">'+battlefile[0]+'</font>';
	cell2=document.createElement("td");
	cell2.setAttribute("align","auto");
	cell2.setAttribute("colspan",10+statushero);
	cell2.style.textAlign = "auto";
	cell2.innerHTML='<font class="f8"><img class="r1" src="img/x.gif">'+lostres[0]+'&nbsp;+&nbsp;<img class="r2" src="img/x.gif">'+lostres[1]+'&nbsp;+&nbsp;<img class="r3" src="img/x.gif">'+lostres[2]+'&nbsp;+&nbsp;<img class="r4" src="img/x.gif">'+lostres[3]+'&nbsp;=&nbsp;[<b>-'+dtstemp[2]+'</b>]</font>';
	rowi.appendChild(cell1);
	rowi.appendChild(cell2);
	tbody=document.createElement("tbody");
	tbody.className="goods";
	tbody.appendChild(rowi);
	table[0].parentNode.parentNode.parentNode.appendChild(tbody);
	};
	for(var i=0;i<dts.length;i++){
		dts[i]=dts[i]+dtstemp[i];
	}
}

function generatereport(){}

function a2b(){
	ats=[0,0,0,0,0,0,0,0];
	var list=find('//form[@action="a2b.php"]/table[@id="troops"]/tbody/tr/td/input',XPList);
	if(list.snapshotItem(0).parentNode.parentNode.childNodes[1].innerHTML.indexOf("u1")>0) troops=1;
	if(list.snapshotItem(0).parentNode.parentNode.childNodes[1].innerHTML.indexOf("u11")>0) troops=2;
	if(list.snapshotItem(0).parentNode.parentNode.childNodes[1].innerHTML.indexOf("u21")>0) troops=3;
	switch (troops){
		case 1:tm=romans;break;
		case 2:tm=teutons;break;
		case 3:tm=gauls;break;
		default:tm=null;break;
	}


	for(var i=0;i<list.snapshotLength;i++){
		unit=PR(list.snapshotItem(i).getAttribute('name').match(/(\d+)/).pop())-1;
		val=PR(list.snapshotItem(i).value);
		if(isNaN(val))val=0;
		ats[0]=ats[0]+val*tm[unit][0];
		ats[1]=ats[1]+val*tm[unit][1];
		ats[2]=ats[2]+val*tm[unit][2];
		ats[3]=ats[3]+val*tm[unit][9];
		ats[4]=ats[4]+val*tm[unit][7];
	}
	eats0=ID('ats0');
	eats1=ID('ats1');
	eats2=ID('ats2');
	eats3=ID('ats3');
	eats4=ID('ats4');
	eats0.textContent=ats[0];
	eats1.textContent=ats[1];
	eats2.textContent=ats[2];
	eats3.textContent=ats[3];
	eats4.textContent=ats[4];
};

function genreporta2b(){
	trep=document.createElement("table");
	row1=document.createElement("tr");
	row3=document.createElement("tr");
	
	cell=document.createElement("td");
	cell.appendChild(elem("b","c1 b","&nbsp;"));
	cell.setAttribute("colspan","5");
	row1.className="rbg";
	row1.appendChild(cell);
	
	cell1=document.createElement("td");
	cell1.setAttribute("align","auto");
	cell1.innerHTML='<img class="att2" src="img/x.gif">=<span id="ats0">'+ats[0]+'</span>';
	cell2=document.createElement("td");
	cell2.setAttribute("align","auto");
	cell2.innerHTML='<img class="def_i" src="img/x.gif">=<span id="ats1">'+ats[1]+'</span>';
	cell3=document.createElement("td");
	cell3.setAttribute("align","auto");
	cell3.innerHTML='<img class="def_c" src="img/x.gif">=<span id="ats2">'+ats[2]+'</span>';
	cell4=document.createElement("td");
	cell4.setAttribute("align","auto");
	cell4.innerHTML='<img class="r5" src="img/x.gif">=<span id="ats4">'+ats[4]+'</span>';
	cell5=document.createElement("td");
	cell5.setAttribute("align","auto");
//	cell5.setAttribute("rowspan","2");
	cell5.innerHTML='<img src="'+img_Car+'">=<span id="ats3">'+ats[3]+'</span>';
	row3.appendChild(cell1);
	row3.appendChild(cell2);
	row3.appendChild(cell3);
	row3.appendChild(cell4);
	row3.appendChild(cell5);
		
	trep.setAttribute("cellpadding","2");
	trep.setAttribute("cellspacing","1");
	trep.className="tbg";
	trep.appendChild(row1);
	trep.appendChild(row3);
	
	if ( ID("coords") !=null){
	var t=find('//form/table[@id="coords"]',XPList);
	t.snapshotItem(0).parentNode.insertBefore(elem('p','',''),t.snapshotItem(0));
	t.snapshotItem(0).parentNode.insertBefore(trep,t.snapshotItem(0));
}}

function oazicinfo(){
	var m=[0,0,0,0];
	var tdl=find('//table[@id="troop_info"]/tbody/tr/td',XPList);
	
	if(tdl.snapshotItem(0).firstChild.className==undefined){
		$('TPH_imgcopy').style.display='none';
		return;
	};
	var race=PR(tdl.snapshotItem(0).firstChild.className.match(/u(\d+)/).pop()/10)*10;
	for(var i=0;i<tdl.snapshotLength;i+=3){
		ut=PR(tdl.snapshotItem(i).firstChild.className.match(/u(\d+)/).pop())-race-1;
		uc=PR(tdl.snapshotItem(i+1).innerHTML.match(/(\d+)/).pop());
		m[0]=m[0]+uc*nature[ut][0];
		m[1]=m[1]+uc*nature[ut][1];
		m[2]=m[2]+uc*nature[ut][2];
		m[3]=m[3]+uc*nature[ut][7];
	}
	trep=document.createElement("table");
	row1=document.createElement("tr");
	row2=document.createElement("tr");
	row3=document.createElement("tr");
	row4=document.createElement("tr");
	
	cell1=document.createElement("td");
	cell1.setAttribute("align","auto");
	cell1.innerHTML=+m[0]+'=<img class="att2" src="img/x.gif">';
	row1.appendChild(cell1);
	
	cell1=document.createElement("td");
	cell1.setAttribute("align","auto");
	cell1.innerHTML='<span id="ats1">'+m[1]+'</span>=<img class="def_i" src="img/x.gif">';
	row2.appendChild(cell1);

	cell1=document.createElement("td");
	cell1.setAttribute("align","auto");
	cell1.innerHTML='<span id="ats2">'+m[2]+'</span>=<img class="def_c" src="img/x.gif">';
	row3.appendChild(cell1);

	cell1=document.createElement("td");
	cell1.setAttribute("align","auto");
	cell1.innerHTML='<span id="ats4">'+m[3]+'</span>=<img class="r5" src="img/x.gif">';
	row4.appendChild(cell1);
	
	trep.setAttribute("style","float: auto; width:180px; margin-auto: 20px");
	trep.className="tbg";
	trep.appendChild(row1);
	trep.appendChild(row2);
	trep.appendChild(row3);	
	trep.appendChild(row4);
	
	ID('troop_info').parentNode.insertBefore(trep, ID('troop_info').nextSibling);
	
}

function kartec(ev){
	var str='';
	var tdl=find('//table[@id="troop_info"]/tbody/tr/td',XPList);
	var race=PR(tdl.snapshotItem(0).firstChild.className.match(/u(\d+)/).pop()/10);
	for(var i=0;i<tdl.snapshotLength;i+=3){
		ut=PR(tdl.snapshotItem(i).firstChild.className.match(/u(\d+)/).pop());
		uc=PR(tdl.snapshotItem(i+1).innerHTML.match(/(\d+)/).pop());
		str=str+ut+','+uc+',';
	}
	GM_setValue('oazis',str);
}

function kartep(ev){
	var mass=GM_getValue('oazis').split(',');
	if(document.getElementsByName('a2_'+mass[0]).length==0)return;
	for(var i=1;i<11;i++){
		document.getElementsByName('a2_'+PR(30+i))[0].value=0;
	};
	for(var i=0;i<mass.length-1;i+=2){
		document.getElementsByName('a2_'+mass[i])[0].value=mass[i+1];
	};
}

main();
	
unsafeWindow.TPH_saveBattlePress = function() {
	ID("TPH_travilogIframeRow").style.display = "";
	ID("TPH_travilogIframeRowDiv").style.display = "";
	ID("TPH_travilogIFrameId").style.display = "none";
}

unsafeWindow.TPH_saveBattleLoaded = function() {
	ID("TPH_travilogIFrameId").style.display = "";
	ID("TPH_travilogIframeRowDiv").style.display = "none";
}}

/*********\begin building Links/*******/

if (ID("GM_Icons").checked==true){
var icons = ID("plus");
icons.removeAttribute("href");
icons.setAttribute("style", "margin:-8px 20px;"); // thx to serj_LV
var icon = '<table cellspacing="1" style="border: 1px solid silver; width: auto; -moz-border-radius: 0px 0px 5px 5px;"><tbody>'+
               '<tr>'+
               '<td><a href="build.php?id=39">'+
               '<img title="'+bigIfile[2]+'" src="data:image/gif;base64,R0lGODlhIwAjAFUAACH5BAAAAAAALAAAAAAjACMAxRYWFBgyLx06TiVLaSwnGC8wKTBUKDFgjT4yC0RGPUR8OVVCDldXSFi4qV5iVl9SK2NNEGVqXGW+VGdZQHZmNnp3ZYFcHYFxPYVqFIqHdJJ/Q5WdiZ2mkaE8B6OslqWQTKWghqyzoLagVbeIKbfCqbi2msDLscfEpMvXu9DJp9O5Y9PcwdnWs9zpzOLs0e3pwv36+P/+1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb+QJhwSCwaha7QJuNxuYqoo3AVYWyQmQKjJV0lIJaQFJaJpJCRSIJjIh8OJBgpEVmRLZDL01MIZKAbISZtQy4ZDxAQGhknDIkEBnFjSEQhBQsECw8XExkbHE+ToqItGxUgIaFCCQ4VFxcQmAUOGQ4EFUIodBUuKHYuGxd/RBttLhEVDlIuDgARTysOCX+qcmVW1UUhExYUhMBlRS4cGxESXKPpMCYPDwsLCAmp6tkcVmNzDxGMGSiGFyJAsPBQgUQEChW4mEhwgEE1EiGGbSDwABeIDHZguGjBrsOECiFWpKiwYYWJFhwSCEjF4UGBXxlqiYHRgkSoFhk4DCExoIH+A3QbAhQgNMTDAwwPMjjJIEDAMCMm9mUcsvCBPBgpHzBA9mTDVgeShGRgsIaIixUMLiS4cCJEOwCQDFyZBCzBtKUJOlhw0EoShyjZlqErBNHDCSfqEh+xlGDBhGIrAis2S5DCA8thJ2v0N2aFBw8hSEQZ46JChNGlWUleV8DCBQ8rQESpqcqJNF4wUBxQM1ijII0RNG0AhgIFNwwjJiQoYPpCwtx2HVaqMGxFBZIrHlgAsYLE2AqNJzBwMA9FBQ4Q7UbJoAI3kg0kYsQo0sJdhhcwYpRxcHKcgARRkFAAAW2EgIBVJRzBTB1CzHGAPFw4MIAAbbQQAhcrcAMBLhqZjfWURkOgRQcWBBQgzgbu3PLEHAUopaADBcwFQ2RJBPJEjSGQ40QEBQzwISUozFTIBtxsUoJbsRQgQSgkOMDAhzVWMFUuCViAgDAlRJBiAQoI6VkJJqjSggMQPODAjSGAxMFFbZDwwQWQFNObEb1kMcFURE5whlkobNBEOsBEdAUHABQKAAILxFjTPJrt1BgBE4BQgmejSREEADs="></a></td>'+
               '<td><a href="build.php?gid=17">'+
               '<img title="'+bigIfile[0]+'" src="data:image/gif;base64,R0lGODlhKAAfAEQAACH5BAAAAAAALAAAAAAoAB8AhBgxSCIZCjdhkj1aJUk3E0tJRV9jR26ERHNSFXl2cX4xCoORm4ioX5xvFpyiopzAcqy1ubTKoLh/GbrFysHgqsTQ1crhw8xLEtDb4tWcKNaoWtrm7eTx+OnGDv///wAAAAX+oCeOZDlyVsREm+m+sLhZGtNlkhXv8BZpkkxn2HnwjieakEhstJC7TeLQyCyZmQg0Jm14G0wmQ7c1YRwNiRocHja05REmcjCk04g27vAsVxwHCAgKCGtpRBkIDQgHFX1IGwcEgpOKhjiLkwSBDBVbGwZ1BgxpaxIIlaiCCwwJBg4THEdSDlNoahJ4il52XgcMEAgGsR4VLC8YrQUFBoR3pwRVqAUJXw+jERwMAwoFD8QkoAYABQTmhbmCVuYGrlUZDQkOHmeVr7IiExAG5ebRX9CCBCgg6N2pAtk8ROAn6AA+DAZ2oSqVC88kL7gw+VsAwQEDBAAs1MJXoYECBRf+g0hg4BEVgWWKcFAyR22fuZAqZPlAcMGlSg2w/hho146gy5cGFiRIQClAHQYcIkSAUG3ogEIOHFTAwLUCBGYTEvQTpvWMoF0K4nGYUGECVwdDE0D4A4Erhg1t6+rjB8sBR34QFliSZ2EGhgqIJ7BdEMhA3a0YJjio8QACW0DCDAxYEDkrZBEcInedsGgZ564PrkiIzJQSgLl3J1jAgM8DhxmOKixoIMAAAblthQjvNEGDBn8F2HK1UJtE6La6xS5CsGACAw0PamiV7Iqa2wqFd8yesKC3hkxLHYTOWtarA9jNY6DoCKGjMEHy4E5iC/1umdsU8KcUQakQMAwGEMwyFscIG+BGXgFV4JKAWxtwYOGCzo0HiBoMSJAgbRi+EJpiHb1HW3whlrABBhaAh+IOIQAAOw=="></a></td>'+
               '<td><a href="build.php?gid=20">'+
               '<img title="'+bigIfile[4]+'" src="data:image/gif;base64,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"></a></td>'+
               '</tr>'+
               '<tr>'+
               '<td><a href="build.php?gid=22">'+
               '<img title="'+bigIfile[3]+'" src="data:image/gif;base64,R0lGODlhKQAkAGYAACH5BAAAAAAALAAAAAApACQAhgMCAg0NCRYMARoVChs8PBwaESAfGCYlGicZAyoxIS0gCTAsHDNgYTUzJTckBTs2HTtHKD8wD0A9KkMrBERSL0Y4F0hGNklDK0pZNUwzB049HVFNO1NlOlRFGlRLLFc5B1dQM1hVRFpvPWBdSWE/BmJGEGJSMmN8RGZhTWlmVWuHSmxGBm9nTXBQG3BsWHRLBnZxW3mYVHtRCXt3X4FVDIF9Z4KjWYZZDIaCbYtcDYuIcY9gDZGKapKOdpK3ZZRiDZZhBpllDpmUe51oDp2agp6Zf57GbaFrD6OehKlxD6mkia1zEK2pjbGrj7OukbWxlLd4DbizlLy2mL64msK8ncbBocjFqcrEo83Iqs/IptPMqtjSr9vVsuHateXeuebguuzlv/Lqw/fwyP/50P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf+gGSCg2RjOC0nRVlhhI2Oj5CEVy1LR0MqMzxSXGKRnp5YM0ejo0lAlzxVnJ+sgmA9QZakpEmVRzM4TmFjjrysYjxBsbPEpUk7IidCVGJhSkQzXJ9jRKPDxElHtqOV2So8RTYQHFadkVY7R9dH2bTu7ElJUFBAOR4cIzWMj1wwScNDhrCbFU8bqSXZTB2hwaJGgxGQgCUJSEzgwGKzEAb5EGGCCx1WejkhSMsiRmOjgDBssAAJFyFfGlVhMRHhu4sViQVh0eRBgx5KWBDxJYhFwEq2Kllsh7FdEBpKojxYUKKECRhMCMVgkeOHrIsFjwAplk1YDhMzWHRAK6TJFBv+WwZdoVKDBY8jOQi2S0hqrDUSFdAiiTKFihMqV4iAEcSkSCYtRdAe+bHuHVOGPZA0ceukcxEhKHB0QtLiwgguQa8wMdEiHdMlQJiqKxFFipMpSpw0QaIWBA6QZJq0uCGjhQkPWahw0NyhhcFiQErUiILkMw8Ta2GwwOHlScgqQnh0WLGCRCYTSq6M4KGktddZZ5EgqWvChNoeW3jgmB9SCxUtGxzgQAYvyEACC0J4gAQYOODQ3g1e/fDBevUdF8UVLBTRBAvDtfDdFVqg0EABAIDAggw03HBgFJl0wQISQpTQgQIZaHABElSYkEUWI7SQAw00lADCFGRooQoKPgH+gMMWM9C4Ag0vfMCCEyE0QQULUsyAhBYhUJEjhykaB0MPRISExRVciDhiDVs4dMAAEXTYgnRImHAFjll4kJYMBZZQAQg1NOFEEWaCGEIDa3aBQwMHBNDAE0KYUMKTc/bQAw8zrMAnCQ5EgOiLyRGBRZFnWlBBAwNE00MDDxQggRZazBDBAxNoGqSPJWQggAAHSHCBBi8+oQQScWkBYhEtdBABC1qs2oABFlgRqwSNlihpCxmmEACvF3ggQQo4MsFESE88wQUXWCAxwwyx+jSABFa0ecGIAQhxBQ8wzhdAAAt44MEDKRQRRQ/jkiGfIl10sUUWsWZQAQISXNHmAxL+FDCAS0oMKwQMARTQr7coEIxEwWL4Z8MyWyScRZ0laFCFFjA0UHEBGCtRBBLaFtCAvxKE0EMWuI0qiBhgRMEEylx40UUURWxxBQg+FRAAsUo0EUVQAgzgwAIXPBDCBikI0QObhIwxRhhOCBEFFQknHGsLGUygABJdDGb1DBNkoPesLPSAAwYMcFDFI2Nw4YRmWaTchRZOXJcB3UgcTgUOC2RAwt4jqDCuEiJIA8kYYmxxchRtb0FFEVRsMZhuOhBAQQMJzGCDDVYsRgQHWnzyxRZjMEHEFImXvllUPHzgQQoUEJGFOWRg4UQr+5DBhA9SRJHyFptdcQUOPBiBRQom5bTiiRdJP6HbFZs1Ac4WYlAhwhPiix+GFRtriYUYvIDxRFyPBAIAOw=="></a></td>'+
               '<td><a href="build.php?gid=19">'+
               '<img title="'+bigIfile[1]+'" src="data:image/png;base64,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"></a></td>'+
               '<td><a href="build.php?gid=21">'+
               '<img title="'+bigIfile[5]+'" src="data:image/png;base64,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"></a></td>'+
               '</tr></tbody></table>'; icons.innerHTML = icon;
               };

(function allInOneOpera () {
var crtPath = window.location.href;
var crtName = crtPath.replace(/.*\/(.*)\/.*/, "$1");
var speedAK = [0,0.5,1,2];
var bgcolor = ['#66ff66','yellow','red'];
var pageElem = [
'side_navi', // 0- left side. include menu, profile etc.
'content', // 1- main block in center
'side_info', // 2- right side. include village list, links, quest.
'mid', // 3- central block. include left menu, main content and right menu
];
var RB = new Object();
RB.XY = [200, 10, 700, 430, 200, 100, 5, 400, 400, 50,];
var flOpera;
var flChrome;
var flFirefox;
var noGM = /Chrome\/[0-6]/;

var useDOMs = typeof window.localStorage == 'undefined' ? false: true;

var allIDs = [
'rb_tooltip', // 3-rb_tooltip
'flDIV', // 4-flDIV (class)
'newDd', // 5-newDd (class)
'gnTable', // 7-gnTable (class)
'rbLinks', // 9-rbLinks
'sf', // 18-sf
];
function randomizeIDs () {}
acss ="table#"+allIDs[0]+" {width:auto; border-collapse:collapse; font-size:8pt; text-align:auto; background-color:white; padding:2px; margin:1px;}" +
"table#"+allIDs[1]+" th a {color:black; font-size:11px;}" +
"."+allIDs[4]+" {position:absolute;z-index:9999;border:1px solid silver;text-align:auto;background-color:gray;}" +
"."+allIDs[13]+" {width:auto; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:auto; background-color:#FFC0C0; padding:2px; margin:1px;}" ;
GM_addStyle(acss);
var dragMaster = (function() {
var dragObject;
var mouseOffset;
var mouseDownAt;
function getMouseOffset(target, e) {
var docPos	= getPosition(target);
return {x:e.pageX - docPos.x, y:e.pageY - docPos.y};}
function mouseUp(){
if (mouseDownAt) {
mouseDownAt = null;} else {
dragObject = null;}
document.removeEventListener('mousemove', mouseMove, true);
document.removeEventListener('mouseup', mouseUp, true);
//document.ondragstart = null;
//document.body.onselectstart = null;
}function mouseMove(e){
if (mouseDownAt) if (Math.abs(mouseDownAt.x-e.pageX)<10 && Math.abs(mouseDownAt.y-e.pageY)<10) return;
with(dragObject.style) {
position = 'absolute';
top = e.pageY - mouseOffset.y + 'px';
left = e.pageX - mouseOffset.x + 'px';}
mouseDownAt = null;
return false;}
function mouseDown(e) {
if (e.which!=1) return;
dragObject  = this.parentNode;
mouseOffset = getMouseOffset(this, e);
mouseDownAt = { x: e.pageX, y: e.pageY, dragObject: this };
document.addEventListener('mousemove', mouseMove, true);
document.addEventListener('mouseup', mouseUp, true);
//document.ondragstart = function() { return false };
//document.body.onselectstart = function() { return false };
return false;}
return {
makeDraggable: function(element){
element.addEventListener('mousedown', mouseDown, true);}}}())
function getPosition(e){
var left = 0; var top = 0;
while (e.offsetParent){
left += e.offsetLeft; top += e.offsetTop; e = e.offsetParent;}
left += e.offsetLeft; top += e.offsetTop;
return {x:left, y:top};}
//end drag //
function makeFloat(flObj, ix, iy, sid) {
flId = sid !== undefined ? sid : ++divSN;
bd = CELM('div',[['id',allIDs[14] + flId],['class',allIDs[4]],['style','left:'+ ix +'px;top:'+ iy +'px;']]);
bdr = CELMe('div','&nbsp;',[['class',allIDs[5]],['onmousedown',jsNone]]);
bd.appendChild(bdr);
bd.appendChild(flObj);
document.body.appendChild(bd);
dragMaster.makeDraggable(bdr);
return allIDs[14] + flId;}
function makeFloatD(flObj, mNum) {
var ix = RB.XY[mNum*2] < 1 ? 1: RB.XY[mNum*2];
var iy = RB.XY[mNum*2+1] < 1 ? 1: RB.XY[mNum*2+1];
return makeFloat(flObj, ix, iy, mNum);}
function viewMessageIW() {
var allRows = Xhack('//table//tr[td[@class="sel"]]','l');
for( var i = 0; i < allRows.snapshotLength; i++ ) {
var td = allRows.snapshotItem(i).getElementsByTagName('TD')[1];
var newImg = CELM('IMG',[['src',"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAJCAYAAADpeqZqAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2gkbAg4EbxMa/wAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAABFklEQVQYlYWQvW4TURSEv2vvRgizsSUkiBBSXoCXII9PWrqkRJElEDa22V3fe84MheOaqaaZ3/L89OSu77FNpmiRZFbaudHamVqDIKnnRp0mvj480Bn4dH+PMKlEkURtZG1krSwXfwDYfv/Bs81+v2chCVvIxjaWyfGFAlAKV9x9+UxEEBF0UiJdRIpkmiZcNsQ0UufK7QC/fwbLZUe3WCCJTikygpSJaPzabrHEPM+cjn8ZT0fWwy13Hz4iG4Au8rJBGLWGJCzjFFZe+LV2ba+iaJwOByQji2G1IlO8ublhtXqL3ieZyWE80rJRSqFbr9c8fntkmif8Gn91NobrQTbvhoG+7ynjOHq329Fa43/o+57NZsM/S3zsrNoIpVwAAAAASUVORK5CYII="],['style',"cursor:pointer"]]);
newImg.addEventListener('click', function(x) { return function() { selectMessage(x); }}(i), false);
td.insertBefore(newImg, td.firstChild);}
var viewMessageID = '';
function messageClose () {
var vMID = getID(viewMessageID);
if( vMID ) document.body.removeChild(vMID);}
var viewPref = [
['//form[@action="nachrichten.php"]','messages','width:440px;background-color:white;padding:5px;text-align:auto;'],
['//table[@id="report_surround"]','reports','width:500px;background-color:white;padding:5px;']];
function selectMessage (num) {
var allRows = Xhack('//table//tr[td[@class="sel"]]','l');
var tds = allRows.snapshotItem(num).getElementsByTagName('TD');
var aLink = tds[1].getElementsByTagName('A')[0].getAttribute('href');
var tV = /berichte/.test(aLink) ? 1: 0;
ajaxRequest(aLink, 'GET', null, function(ajaxResp) {
messageClose();
var ad = ajaxNDIV(ajaxResp);
if( ! flFirefox ) getID(pageElem[0]).appendChild(ad);
var aV = Xhack(viewPref[tV][0], 'f', ad);
ad = null;
if (aV) {
var newD = CELMe('DIV',aV,[['class',viewPref[tV][1]],['style',viewPref[tV][2]]]);
var newBTX = CELMe('BUTTON','Close',[['onClick',jsNone],['style','margin:5px 5px 0px;direction:ltr']]);
newBTX.addEventListener('click', messageClose, true);
newD.appendChild(CELMe('DIV',newBTX,[['style','text-align:center;']]));
viewMessageID = makeFloatD(newD, 4);}}, dummy);}};
//function start_script() {
if( /(?:nachrichten|berichte).php/.test(crtPath) ) {viewMessageIW(); }//}
//start_script();
})();
if (ID("GM_Links").checked==true) {
function AddNewLink(){
 GM_log("AddNewLink() :: called");
 loc =  document.location.href;
 GM_log("links1 :" + links1.length);
 new_link = prompt(Linksfile[1],loc);
 if(!new_link) { return}
 new_link_name = prompt(Linksfile[2],"");
 if(!new_link_name) { return; }
// links1[links1.length][0] = new_link_name;
// links1[links1.length][1] = new_link;
links1.push(new_link_name);
links1.push(new_link);
 GM_setValue('a1', uneval(links1));
// GM_log(links1);
document.location.href = loc;};
function DeleteLinks(){
 GM_deleteValue("a1");
 window.location.reload()};
links1 = eval(GM_getValue('a1', '[]')); 
var target = ID("side_info");
target.appendChild(document.createElement('br'));
var tbl     = document.createElement("table");
var tblHead = document.createElement("thead");
var tblBody = document.createElement("tbody");
for (var j = 0; j < links1.length/2; j++) {
var row = document.createElement("tr");
row.setAttribute("id", "linkP"+(j+1));
for (var i = 0; i < 2; i++) {
var cell = document.createElement("td");
if (i == 0) {
var test = document.createElement("span");
test.innerHTML = "&#x25CF";
var cellText = test;
if (document.location.href == links1[2*j+1]) {
cell.setAttribute("class", "dot hl");}else {
cell.setAttribute("class", "dot");}}
else if (i == 1) {
var curId = i - 1;
var alink = document.createElement("a");
alink.setAttribute("href", links1[2*j+1]);
cell.setAttribute("class", ""+Linksfile[0]+"");
alink.appendChild(document.createTextNode(links1[2*j]));
var cellText = alink;}
cell.appendChild(cellText);
row.appendChild(cell);}
tblBody.appendChild(row);}
var row = document.createElement("tr");
var cell = document.createElement("td");
var alink = document.createElement("span");
var alink2 = document.createElement("span");
var alink3 = document.createElement("span");
var alink4 = document.createElement("span");
alink3.innerHTML= '<a> '+Linksfile[0]+' </a>';
alink.innerHTML = ' <a href="javascript:void(0)" title="'+Linksfile[3]+'"> (+ </a> ';
alink.addEventListener("click", AddNewLink, false);
alink4.innerHTML = ' / ';
alink2.innerHTML = ' <a href="javascript:void(0)" title="'+Linksfile[4]+'"> -) </a> ';
alink2.addEventListener("click", DeleteLinks, false);
cell.appendChild(alink3);
cell.appendChild(alink);
cell.appendChild(alink4);
cell.appendChild(alink2);
cell.setAttribute("colspan", "5");
row.appendChild(cell);
tblHead.appendChild(row);
tbl.appendChild(tblHead);
tbl.appendChild(tblBody);	
target.appendChild(tbl);	
tbl.setAttribute("cellspacing", "1");
tbl.setAttribute("cellpadding", "1");
tbl.setAttribute("id", "llist");};
/////////////////////////

var eventSource= (navigator.appName.indexOf('Opera') == -1) ? window : document; // I use this because I might want to make it cross browser later
eventSource.addEventListener( 'load', function( e ) { onLoad(); }, false); //to be run on load of the page
var loc=eventSource.location.href; // the current page href

//for drag effect
var dragObj = new Object(), x, y;
dragObj.zIndex = 500;

function location(){
    lang = loc.match(/travian(\.[a-zA-Z]{2,3})+/);
    if(!lang) {
        lang = loc.match(/travian3(\.[a-zA-Z]{2,3})+/).pop(); 
    } else {
        lang = loc.match(/travian(\.[a-zA-Z]{2,3})+/).pop();
    }
}

function onLoad(){ 
    switch(lang){
    default:
        langfile[lang]=[];						
        break;
    }    if(!langfile[lang]) {
        return;
    }
    
    readSettings();
    
    var side=ID('side_navi');
    if(side){}
    
    if(links=='true') {
        msg();
        linksPlus();
    }
    

    if(res=='true'){
        if(returnObjById('ResBlock')){ 
            autotime = window.setTimeout(countdown, 1000); 
        } else { 
            return;
        }
    }
}

function returnObjById( id ){ //compatibility, gets the object by id, based on different returns of document 
  if (ID)
    return ID(id);
  else if (document.all)
    return document.all[id];
  else if (document.layers)
    return document.layers[id];
}

function getElementsByClassName(oElm, strTagName, strClassName){
  var arrElements = (strTagName == '*' && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
  var arrReturnElements = new Array();
  strClassName = strClassName.replace(/\-/g, '\\-');
  var oRegExp = new RegExp('(^|\\s)' + strClassName + '(\\s|$)');
  var oElement;
  for(var i=0; i<arrElements.length; i++){
    oElement = arrElements[i];  
    if(oRegExp.test(oElement.className)){
            arrReturnElements.push(oElement);
    } 
  }
  return arrReturnElements;
}

function addElement(theElement) {
    var htmldoc=returnObjById('lmid2');
    if(!htmldoc) {
        htmldoc=TAG('body')[0];
        if(!htmldoc) return;
        theElement.style.marginLeft='192px';  
        theElement.style.marginBottom='10px';
        theElement.style.width = '550px';
        
        if(loc.indexOf('dorf2')!=-1){
            theElement.style.top='192px';
        }
        else {
            theElement.style.top='50px';
        }
            
    } else {
        theElement.style.width = '500px';
        theElement.style.top='50px';  		
        if(loc.indexOf('karte.php?d=')!=-1){
        theElement.style.top='400px'; 
        }else if(loc.indexOf('karte.php?newdid')!=-1 && loc.indexOf('d=')!=-1 ){
        theElement.style.top='400px'; 
        } else if(loc.indexOf('karte.php?newdid')!=-1){
        theElement.style.top='50px'; 
        } 
    }
    
    htmldoc.appendChild(theElement);
}

function addElementArray(root,element){
    if(root && element){
        var end=element.length;
        for (var i = 0; i < end; i++) {
            var c=element[i];
            if(c) root.appendChild( c );
        }
    }
}
/************************ Drag n drop*******************************/
if (document.location.href.indexOf("/dorf1.php") != -1) {
(function troopwatch() {
    var ALL=3;
    function getClass(aName) {return (aName != '' ? CLASS(aName) : null);};
    function cropT(v){if (v>990000){v = v>100000? Math.round(v/1000): Math.round(v/100)/10;v = v+"k";}return v;};
    var total = new Array();
    var unit = new Array();
    var PURPOSE=0,TYPE=1,CROP=2,ATT=3,DefA=4,DefB=5;
    unit[1] = new Array(ALL,false,1,40,35,50);
    unit[2] = new Array(ALL,false,1,30,65,35); 
    unit[3] = new Array(ALL,false,1,70,40,25);
    unit[4] = new Array(ALL,true,2,0,20,10);
    unit[5] = new Array(ALL,true,3,120,65,50); 
    unit[6] = new Array(ALL,true,4,180,80,105); 
    unit[7] = new Array(ALL,false,4,60,30,75);
    unit[8] = new Array(ALL,false,6,75,60,10); 
    unit[9] = new Array(ALL,false,5,50,40,30); 
    unit[10] = new Array(ALL,false,1,0,80,80); 
    unit[11] = new Array(ALL,false,1,40,20,5);
    unit[12] = new Array(ALL,false,1,10,35,60); 
    unit[13] = new Array(ALL,false,1,60,30,30); 
    unit[14] = new Array(ALL,false,1,0,10,5); 
    unit[15] = new Array(ALL,true,2,55,100,40); 
    unit[16] = new Array(ALL,true,3,150,50,75); 
    unit[17] = new Array(ALL,false,3,65,30,80); 
    unit[18] = new Array(ALL,false,6,50,60,10); 
    unit[19] = new Array(ALL,false,5,40,60,40);
    unit[20] = new Array(ALL,false,1,10,80,80); 
    unit[21] = new Array(ALL,false,1,15,40,50); 
    unit[22] = new Array(ALL,false,1,65,35,20); 
    unit[23] = new Array(ALL,true,2,0,20,10);
    unit[24] = new Array(ALL,true,2,90,25,40);
    unit[25] = new Array(ALL,true,2,45,115,55);
    unit[26] = new Array(ALL,true,3,140,50,165); 
    unit[27] = new Array(ALL,false,3,50,30,105);
    unit[28] = new Array(ALL,false,6,70,45,10);
    unit[29] = new Array(ALL,false,4,40,50,50);
    unit[30] = new Array(ALL,false,1,0,80,80); 
    unit[31] = new Array(ALL,false,1,10,25,10); 
    unit[0] = new Array(ALL,false,6);
    Total = 0;
    var u = getClass("unit");
    var n = getClass("num");
    var t = getClass("un");
    for (var i=0; i<u.length; i++) {
    var x = u[i].className.split(" u")[1];
    var tip = document.createElement("span");
    if (x.match(/hero/)) {x = 0;}
    if (unit[x]){var y = new Number(n[i+4].innerHTML);
    t[i].appendChild(tip);
    Total+= unit[x][CROP]*y;
    var attA = PR(unit[x][ATT]) * PR(y);
    var defA = PR(unit[x][DefA])* PR(y);
    var defB = PR(unit[x][DefB])* PR(y);}}
    var getTitle = CLASS("r5")[0].title;
    var getTroop = ID("troops");
    var getTbody = getTroop.getElementsByTagName("thead")[0];
    getTbody.getElementsByTagName("tr")[0].getElementsByTagName("th")[0].innerHTML+='<span style="font-size:12px;">&nbsp;'+cropT(Total)+'&nbsp;'+getTitle+'</span>';
    })();}

/************************ Links ++ *******************************/
function msg(){
    if(loc.indexOf('berichte')!=-1  || (loc.indexOf('nachrichten')!=-1 && loc.indexOf('t=4')==-1  && loc.indexOf('t=1')==-1) ) {
        addChkAll();
    }
}

function sel(){
form_all=startform;
var topend=form_all.length;
    for(var i=0;i<topend;i++){
        form_input=form_all[i].getElementsByTagName('input');
        var end=form_input.length;
        for(var x=0;x<end;x++){
            var y=form_input[x];
            if(y.name.indexOf('del')==-1 && y.name!='s10' ) y.checked=!y.checked;
        }
    }
}

function addChkAll(){
    var form_all=getElementsByClassName(document, 'table', 'tbg' );
    if(!form_all) return;
    var topend=form_all.length;
    for(var i=0;i<topend;i++){
        var form_input=form_all[i].getElementsByTagName('input');
        var end=form_input.length;
        for(var x=0;x<end;x++){
        var y=form_input[x];
            if(y.name.indexOf('del')!=-1) {  
                var select=document.createElement( 'input' );
                select.type='button';
                select.setAttribute('style','font-weight: bold; font-size: 8pt; height: 14pt;');
                select.value='Inverse Select';
                select.style.marginLeft='4px';
                select.addEventListener('click',sel,true);
                y.parentNode.appendChild(select);
            }
        }
    }
    startform=form_all;
}
///////////////
if ( ID("GM_Total").checked == true ){
var getRTa = ID("l1").title;
var getRTs = ID("l2").title;
var getRTd = ID("l3").title;
var getRTf = ID("l4").title;
var getRIa = ID("l1").innerHTML.split("/")[0];//0
var getRIs = ID("l2").innerHTML.split("/")[0];
var getRId = ID("l3").innerHTML.split("/")[0];
var getRIf = ID("l4").innerHTML.split("/")[0];
var getRIg = ID("l1").innerHTML.split("/")[1];//1
var getRIh = ID("l2").innerHTML.split("/")[1];
var getRIj = ID("l3").innerHTML.split("/")[1];
var getRIk = ID("l4").innerHTML.split("/")[1];
var collectI = PR(getRIa) + PR(getRIs) + PR(getRId) + PR(getRIf);
var collectS = PR(getRIg) + PR(getRIh) + PR(getRIj) + PR(getRIk);
var collectT = PR(getRTa) + PR(getRTs) + PR(getRTd) + PR(getRTf);
var place = ID("resWrap").innerHTML+= '<table class="Tres" style="position: absolute; top:25px;"><tbody><tr><td><img src="img/un/r/6.gif"/></td><td id="l5" title="'+collectT+'">'+collectI+'/'+collectS+'</td></tr></tbody></table>';
if (document.location.href.indexOf("/dorf1.php") != -1){
var place = ID("production").getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].getElementsByTagName("th")[0].innerHTML+= ' = '+'<span> '+collectT+'</span>';
}}//******************************//
if (document.location.href.indexOf("/spieler.php?uid=") != -1){
var SK = CLASS("details")[0].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[4].getElementsByTagName("td")[0].innerHTML;
ID("villages").getElementsByTagName("tbody")[0].innerHTML+='<tr><td align="auto">'+Spilerfile[0]+'</td><td class="hab">'+SK+'</td><td></td></tr>';}
//******************************//
{var isFF36up = false; 
if (navigator.userAgent)
{var ffver = navigator.userAgent.match(/Firefox\/3\.(\d+)/); isFF36up = ffver && PR(ffver[1], 10) >= 6; }
var nsResolver =  {lookupNamespaceURI:function (prefix) 
{if (isFF36up && prefix == "ns"){return "http://www.w3.org/1999/xhtml"; } 
else {return "";}}};}
var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
function funcDummy(){}
function funcGetElemByID(_id){ return ID(_id); }
function funcElem(tag, content){ var ret = document.createElement(tag);  ret.innerHTML = content;  return ret; }
function funcFindElem(xpath, xpres)
{var ret = document.evaluate(xpath, document, null, xpres, null); return  xpres == XPFirst ? ret.singleNodeValue : ret;}
function func2Zero(_number){ return (_number > 9 ? _number : '0' + _number); }
function funcTime2Seconds(myElement)
{var p = myElement.split(":"); return (p[0] * 3600) + (p[1] * 60) + (p[2] * 1);}
function funcSeconds2Time(s)
{if(s > -1)
{var horas = Math.floor(s/3600); var minutos = Math.floor(s/60) % 60;
var segundos = s % 60; var t = horas + ":" + func2Zero(minutos) + ":" + func2Zero(segundos);}
else var t = "0:00:0?";
return t;}    function funcCalculateFillTime()
{for (var i = 0; i < 4; i++) { if (resources_per_sec[i] < 0)
{var tiempo = Math.round(actual_resources[i] / - resources_per_sec[i]);}else if (resources_per_sec[i] == 0)
{var tiempo = -1;}else
{var tiempo = Math.round((total_resources[i] - actual_resources[i]) / resources_per_sec[i]);}
var produccionHora = funcGetElemByID('l' + (4-i)).title;
var tiempoRestante = "<span id='TimeOut' class='tOut"+(i+1)+"' style='font-weight:bold;'>" + funcSeconds2Time(tiempo) + "</span>";
var celda = funcElem("div", "<span style=' font-size:9px; color:#408080; position: absolute; align:auto; top: 13px; text-align:auto;'>&nbsp;&nbsp;(" + (produccionHora > 0 ? '+' : '') + produccionHora + '<b> / </b>' + (produccionHora < 0 ? '<font color="red">' + tiempoRestante + '</font>' : tiempoRestante) + ' )</span>');
var a = funcGetElemByID('l'+(4-i)).previousSibling;
if (a.nodeName == '#text') a = a.previousSibling;
a.appendChild(celda);}}

/*** End Calc. resource info ***/
if (ID("contract") != null){
(function buildwatch(){
    function $id(id){return (id !=''? ID(id): null);};
    function $class(aName){return (aName != '' ? CLASS(aName): null);};
    function $tag(aTag){return (aTag != ''? TAG(aTag): null);};
    function getTimeFromDivision(a, p) {
   var h,m,s; h = Math.floor(a/p);m = Math.floor(((a/p)%1)*60)>9? Math.floor(((a/p)%1)*60): "0"+Math.floor(((a/p)%1)*60);return h+":"+m;};
    function getTimeReady(delay){
        var time = $id("tp1").innerHTML.split(":");
        var d = delay.split(":");
        time[2] = new Number(time[2])+new Number(d[2]);
        time[1] = new Number(time[1])+new Number(d[1])+Math.floor(time[2]/60);
        time[0] = new Number(time[0])+new Number(d[0])+Math.floor((time[1]+1)/60);
        time[2] = time[2]%60;
        time[1] = time[1]%60;
        time[0] = time[0]%24>9? time[0]%24: "0"+time[0]%24;
        time[1] = time[1]>9? time[1]: "0"+time[1];
        time[2] = time[2]>9? time[2]: "0"+time[2];
        return time[0]+":"+time[1]; +":"+time[2];};
    function getCapacityLevel(cost){};
    function parseConstructionCosts(){
        var r = new Array();
        var STORE=0,CAPACITY=1,FREE=2,PRODUCTION=4;
        var needWarehouse = 0;
        var needGranary = 0;
        var c = $tag("p")[$tag("p").length-1];
        var s = document.createElement("div");
        s.innerHTML = "";
        for (var i=0; i<4; i++) {
        var cost = new Number(c.innerHTML.match(/\d+/g)[2*(i+1)]);
        var res = $class("r"+(i+1))[0].alt;
        if (cost > r[CAPACITY]) {
        if (i!=3 && cost>needWarehouse) {
        needWarehouse = cost;}
        if (i==3) {needGranary = cost;}}}
var e = $class("build").length>1? CLASS("build")[1]: false;
var sTime = ID("tp1").innerHTML.split(":")[2];
        if (e) {var time = document.createElement("div");time.innerHTML ="<span style='color:black;'>"+Buildfile[0]+"</span><span style='color:blue;font-size : small;'><b> (<span id='up'>"+ getTimeReady(c.childNodes[14].textContent) +":"+sTime+"</span>)</b>";
            if (CLASS("none").length){
                time.className = "none";}c.insertBefore(time,c.childNodes[c.lastChild]);}
        if (needWarehouse) {c.lastChild.innerHTML = c.lastChild.innerHTML +" ("+getCapacityLevel(needWarehouse)+")";}
        if (needGranary) {c.lastChild.innerHTML = c.lastChild.innerHTML +" ("+getCapacityLevel(needGranary)+")";}
        c.insertBefore(s,c.childNodes[c.lastChild]);};
    if(( $id("build").className.match(/25/) || $id("build").className.match(/26/) || $id("build").className.match(/17/) ) && window.location.href.match(/[s,t]=\d/)){return;}
    parseConstructionCosts();})();}
/////////////////////////////////
if (ID("GM_ShBox").checked == true){
if ( document.location.href.indexOf("/statistiken.php") != -1) {
function selected(opt){
var selectedOption = readCookie('traviansearch_selected_option');
if(opt == selectedOption){return ' selected="yes" ';}return false;}
window.selectOption = function(opt){
if(opt != "" && opt != 0){ID('hidden_field_placeholder').innerHTML='<input type="hidden" name="id" value="' + opt + '">';
createCookie('traviansearch_selected_option',Number(opt),365);}else{
ID('hidden_field_placeholder').innerHTML='';createCookie('traviansearch_selected_option',0,365);}}
var searchform='<form align="center" action="statistiken.php?id=1" id="searchform" method="POST" id="searchform" style="background-image:url(http://travian.com/img/en/pic/travian_signup.jpg); background-position:top; padding:5px; border:1px solid #c0c0c0;">';
searchform += '<span id="hidden_field_placeholder"></span>';
searchform += '<div align="center"><input class="text name" name="name" maxlength="20" size="12" value="" name="spieler" id="searchbox_player" class="fm f80" style="margin:3px;" />';
searchform += '<span align="center"><select class="fm f80" style="margin:2px; padding:1px;" id="opsel">';
searchform += '<option value="0"' + selected(0) + '>' + Searchfile[0] + '</option>';
searchform += '<option value="2"' + selected(2) + '>' + Searchfile[1] + '</option>';
searchform += '<option value="4"' + selected(4) + '>' + Searchfile[2] + '</option>';
searchform += '<option value="31"' + selected(31) + '>'+Searchfile[3] + '</option>';
searchform += '<option value="32"' + selected(32) + '>'+Searchfile[4] + '</option>';
searchform += '<option value="8"' + selected(8) + '>' + Searchfile[5] + '</option>';
searchform += '</select><span align="center"><input type="submit" value="' + Searchfile[6] + '" class="std" /></div>';
searchform += '</form>';
var rightSidebar = ID('textmenu').innerHTML+= searchform;
window.addEventListener("load", function(e) {var cookieVal = readCookie('traviansearch_selected_option');
if(cookieVal){selectOption(cookieVal);}ID('opsel').addEventListener("change",function(){
selectOption(this.value);ID("searchbox_player").focus();},false);}, false);}};


if(ID("vlist") !=null){ 
//  ^^^ ^^^ ^^^ ^^^ ^^^ ^^^ ^^^ ^^^ ^^^  //
//if the village list available do thise//

}
/* * * * * setup setting * * * * */
/*      no setting Available     */
/* * * * end setup setting * * * */


// The menus actions //

function selfoff(e){
    if(e.id=='ResBlock') {
        clearTimeout(autotime); 
        returnObjById('Resource++').value='false'
        res='false';
        resTog();
        updateSetCookie();
    }
}

function resize(e){}

function jump(on){
    on=on.target;
    var opt_key = on.selectedIndex;
    if(!opt_key) return;
    var uri_val = on.options[opt_key].value;
    window.open(uri_val,'_top');
}


function makeOption(text, value){
var co=document.createElement('option');
    co.appendChild(  document.createTextNode(  text  )    );
    co.value=value;
    return co;
}


function showSettings(){}

function toggle() {
        var frame=ID('NavPop');
        if(!frame) return;

        var state=frame.style.visibility;
        if(state.indexOf('visible')==-1){
            frame.style.visibility = 'visible';
        } else {
            frame.style.visibility = 'hidden';
        }
}

function readSettings() {	
    var value = GM_getValue('TravNavSet','Resource++:=true||');
    if (value == '' ) {resetSetting();return;}
    
    var arr = value.split(/[|]{2}/);
    var ret = new Array();
    
    for (var i = 0; i < arr.length; i++) {
        var b = arr[i].split(/[:][=]/);
        if(b.length==2)	ret.push(b);
    }
        
    if(ret.length!=4) {resetSetting();return;}
    if(ret[1][0]!='Resource++')  {resetSetting();return;}
    //I know that this seems strange but just go with it, I have reasons....
    if(ret[0][1]=='true' ) {links='true'; } else {links='false';}
    if(ret[1][1]=='true' ) {res='true'; } else {res='false';}
    if(ret[2][1]=='true' ) {nav='true'; } else {nav='false';}
    if(ret[3][1]=='true' ) {tools='true'; } else {tools='false';}
}


function resetSetting(){
    defSetting();
    links='true';
    res='true';
    nav='true';
    tools='true';
}

function eraseSetting() {
    GM_setValue('TravNavSet', '');
}

function defSetting(){
    GM_setValue('TravNavSet', 'Resource++:=true||');
}

function makeEventlink(text, href, event ){
var link=document.createElement( 'a' );
    link.href=href;
    link.title=text;
    link.appendChild(  document.createTextNode(  text ) );
    link.addEventListener('click',event,true);
return link;
}

function onoff(targ){
    if(targ.target.value=='true'){
        targ.target.value='false';} 
    else {
        targ.target.value='true';	
    }
    var res_start;
    var nav_start;
    var tools_start;
    if(targ.target.id=='Links++') {tools_start=links; links=targ.target.value;} 
    else if(targ.target.id=='Resource++') {	res_start=res; res=targ.target.value;} 
    if(res_start!=res) {resTog();} 
    if(nav_start!=nav) {navTog();}
    if(tools_start!=tools) {toolsTog();}
    updateSetCookie();
}

function resTog(){}

function navTog(){
    if(nav=='true'){
        if(!nav_m){quickLinks('visible');}
        nav_m.style.visibility = 'visible';
    } else {
        nav_m.style.visibility = 'hidden';
    }
}

function toolsTog(){}

function updateSetCookie(){
    GM_setValue('TravNavSet', 'Resource++:='+res+'||');
}

function countdown(){ //updates all countdown values and displays

    var go=false;
    getResourceInfo();
    if(!resource) return;
        
    for(var i=0; i<4; i++){
    
        if(overflow[i][0]>0){
            go=true;
            overflow[i][0]--;
            var leftval=PR(resource[i][1]/resource[i][2] *100);
            var color=(overflow[i][0]<300) ? 'red' : 'green';
            var newSpan = document.createElement('div');
            newSpan.style.cssFloat='right';
            
            newSpan.id=fields[lang][i]+'timer';
            newSpan.appendChild(  document.createTextNode(formatTimeString(overflow[i][0])));
            
            if(newSpan.style.color.indexOf(color)==-1){
                newSpan.style.color=color;
            }
            
            var old=returnObjById(fields[lang][i]+'timer');
                    
            old.parentNode.replaceChild(newSpan,old );
            old=returnObjById(fields[lang][i]+'value');

            if(PR(old.title)!=leftval){
                calOverflow();
                old=returnObjById('resbar'+i);
                var n=rowOpera(i,leftval);
                n.style.cssFloat='right';
                old.parentNode.replaceChild(n,old );
            }
            
        } else {
                var old=returnObjById(fields[lang][i]+'timer') ;
    
                if(old.textContent.indexOf('0:00:00 h')==-1){  
                    old.textContent='0:00:00 h';
                    old.style.color='red';
                    old=returnObjById('resbar'+i);
                    old.parentNode.replaceChild(rowOpera(i,100),old );
                }
        }
    }
    
    if(go){
        autotime = window.setTimeout(countdown, 1000);
        } 
    else {
        clearTimeout(autotime); //kill the timeout
        return;
    }
    
}
/**** End The menus actions*******/
if (document.location.href.indexOf("/build.php?gid=16") !=-1 || document.location.href.indexOf("/build.php?id=39") !=-1){
if (CLASS("carry") !=null){

}
}
/**** The menus*******/
function linksPlus(){var source=ID('content');
var links=source.getElementsByTagName('a');
var end=links.length;

for (var j=end-1; j>=0; j--) {
    var currentLink=links[j].getAttribute('href');
    if(!currentLink) break;
    var linkparts = currentLink.split('=');
                        
        if (currentLink.match('karte.') == 'karte.' && (linkparts[0].match('z')=='z' || linkparts[0].match('d')=='d') ) {
            linkparts[1]=linkparts[1].replace('&c','');
            
            var imgattack = new Image(); 
            imgattack.innerHTML = '&nbsp;<img src="'+img_att+'">';
            imgattack.border=0;
            imgattack.title='Attack';
            var attklink = document.createElement('a');
            attklink.href='a2b.php'+'?z='+linkparts[1];
            attklink.appendChild( imgattack );
            links[j].parentNode.appendChild( attklink);
            if ( document.location.href.indexOf("/spieler.php?uid") != -1) {
            links[j].parentNode.insertBefore( attklink ,links[j]);
            }

            var imgsend = new Image(); 
            imgsend.innerHTML = '&nbsp;<img src="'+img_Car+'">&nbsp;';
            imgsend.border=0;
            imgsend.title='Send resource';
            var bizlink = document.createElement('a');
            bizlink.href='build.php'+'?z='+linkparts[1]+'&gid=17';
            bizlink.appendChild( imgsend );
            links[j].parentNode.appendChild( bizlink);
            if ( document.location.href.indexOf("/spieler.php?uid") != -1) {
            links[j].parentNode.insertBefore( bizlink ,links[j]);}
                                    
        } else if(currentLink.match('spieler.') == 'spieler.' && linkparts[0].match('uid')=='uid' ){
                var imgsend = new Image(); 
                imgsend.innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2ggOEjkkgvu3bgAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAB60lEQVQokW2RXUhTYRyHf+/xdfN8je1sChWFrFiWIo4irBiNNbEWc4suuonIuu4iqCBpXnbbB966rjTIEiqqi5KzGrYQJPogMFnZHJx5jtvUfeSc7O3GmVH/2//z8Lt4CGMMW0+QZOH4iXCPz++Pmhrp2uS7xOXR4aFH9T/9CxZlydfb198XCl7vPuhW7DYrMtrCOULIOGOs9o/gP3n6YjAcjLg72x0tDjsyug5j0cgA4AD8EURJlnoCZy5d6D9/27W7lbQ4bFirVvH564wx+XYiUYexYWJfhzvg8R4b4PkmolgtqFSqKBTLOHSgq3ng5mDE6dp/dFNQVZXjRaGDo43NupFDNr8MI5sHpRysFhm9Po/zytVrt1r3tLVvLixoWny1XPomigI0PQtCCMwmMxo4DgQgniOHu11720KxWIxwAFj6Z3LqyfjYnUJhZdkiCaCUgjGG6vo6iqVfmE3+WFrK59IACDY6cCaT2eY/FY6MPH5Wmv0+xzTdYKm0xibiiVogdHawiRe2qapKKAAwxmqEkJUdO51WMy/z89oidm1vwIdPX3LR4fv3Xj59eBdAwev1sq0diKLYu0RJJjPJOaTmU/kHI6NDb16/iAIo/Dfcx+mpMcWudBaLJRpXX92Yfh9/XlktZ+owAPwGFRjF2QOrvJgAAAAASUVORK5CYII=">&nbsp;';
                imgsend.border=0;
                imgsend.title='Send message';
                
                var msglink = document.createElement('a');
                msglink.href='nachrichten.php?t=1&'+'id='+linkparts[1];
                msglink.appendChild( imgsend );
                links[j].parentNode.insertBefore( msglink ,links[j]);
        }
            
    }
}
// teos
if (ID("GM_ShNPC").checked == true){
var Lang   = new Array();
var local;

local = 'com';
Lang[local] = new Array();
Lang[local]['ro_'] = '';Lang[local]['ro0'] = '';Lang[local]['ro1'] = '';
Lang[local]['ro2'] = '';Lang[local]['ro3'] = '';Lang[local]['ro4'] = '';
Lang[local]['ro5'] = '';Lang[local]['ro6'] = '';Lang[local]['ro7'] = '';
Lang[local]['ro8'] = '';Lang[local]['ro9'] = '';
Lang[local]['ga_'] = '';Lang[local]['ga0'] = '';Lang[local]['ga1'] = '';
Lang[local]['ga2'] = '';Lang[local]['ga3'] = '';Lang[local]['ga4'] = '';
Lang[local]['ga5'] = '';Lang[local]['ga6'] = '';Lang[local]['ga7'] = '';
Lang[local]['ga8'] = '';Lang[local]['ga9'] = '';Lang[local]['u99'] = '';
Lang[local]['ge_'] = '';Lang[local]['ge0'] = '';Lang[local]['ge1'] = '';
Lang[local]['ge2'] = '';Lang[local]['ge3'] = '';Lang[local]['ge4'] = '';
Lang[local]['ge5'] = '';Lang[local]['ge6'] = '';Lang[local]['ge7'] = '';
Lang[local]['ge8'] = '';Lang[local]['ge9'] = '';
var einheit = new Array();

function einheitenFestlegen(local) {
  var volk = 'roemer';
  einheit[volk]   = new Array();
  einheit[volk][0] = new Array(Lang[local]['ro0'], 120, 100, 180, 40, 440);
  einheit[volk][1] = new Array(Lang[local]['ro1'], 100, 130, 160, 70, 460);
  einheit[volk][2] = new Array(Lang[local]['ro2'], 150, 160, 210, 80, 600);
  einheit[volk][3] = new Array(Lang[local]['ro3'], 140, 160, 20, 40, 360);
  einheit[volk][4] = new Array(Lang[local]['ro4'], 550, 440, 320, 100, 1410);
  einheit[volk][5] = new Array(Lang[local]['ro5'], 550, 640, 800, 180, 2170);
  einheit[volk][6] = new Array(Lang[local]['ro6'], 900, 360, 500, 70, 1830);
  einheit[volk][7] = new Array(Lang[local]['ro7'], 950, 1350, 600, 90, 2990);
  einheit[volk][8] = new Array(Lang[local]['ro8'], 30750, 27200, 45000, 37500, 140450);
  einheit[volk][9] = new Array(Lang[local]['ro9'], 5800, 5300, 7200, 5500, 23800);

  volk = 'gallier';
  einheit[volk]   = new Array();
  einheit[volk][0] = new Array(Lang[local]['ga0'], 100, 130, 55, 30, 315);
  einheit[volk][1] = new Array(Lang[local]['ga1'], 140, 150, 185, 60, 535);
  einheit[volk][2] = new Array(Lang[local]['ga2'], 170, 150, 20, 40, 380);
  einheit[volk][3] = new Array(Lang[local]['ga3'], 350, 450, 230, 60, 1090);
  einheit[volk][4] = new Array(Lang[local]['ga4'], 360, 330, 280, 120, 1090);
  einheit[volk][5] = new Array(Lang[local]['ga5'], 500, 620, 675, 170, 1965);
  einheit[volk][6] = new Array(Lang[local]['ga6'], 950, 555, 330, 75, 1910);
  einheit[volk][7] = new Array(Lang[local]['ga7'], 960, 1450, 630, 90, 3130);
  einheit[volk][8] = new Array(Lang[local]['ga8'], 30750, 45400, 31000, 37500, 144650);
  einheit[volk][9] = new Array(Lang[local]['ga9'], 5500, 7000, 5300, 4900, 22700);
  einheit[volk][10] = new Array(Lang[local]['u99'], 20, 30, 10, 20, 80);

  volk = 'germanen';
  einheit[volk]   = new Array();
  einheit[volk][0] = new Array(Lang[local]['ge0'], 95, 75, 40, 40, 250);
  einheit[volk][1] = new Array(Lang[local]['ge1'], 145, 70, 85, 40, 340);
  einheit[volk][2] = new Array(Lang[local]['ge2'], 130, 120, 170, 70, 490);
  einheit[volk][3] = new Array(Lang[local]['ge3'], 160, 100, 50, 50, 360);
  einheit[volk][4] = new Array(Lang[local]['ge4'], 370, 270, 290, 75, 1005);
  einheit[volk][5] = new Array(Lang[local]['ge5'], 450, 515, 480, 80, 1525);
  einheit[volk][6] = new Array(Lang[local]['ge6'], 1000, 300, 350, 70, 1720);
  einheit[volk][7] = new Array(Lang[local]['ge7'], 900, 1200, 600, 60, 2760);
  einheit[volk][8] = new Array(Lang[local]['ge8'], 35500, 26600, 25000, 27200, 114300);
  einheit[volk][9] = new Array(Lang[local]['ge9'], 7200, 5500, 5800, 6500, 25000);
}

//Unicode characters and other characters

var summenzeichen = '\u99';
var fragezeichen  = '?';


//Variables

var vorrat = new Array();
var lager = new Array();
var elAllDiv, newTABLE, newTEXT, newTR, newTD, newB, newBR;


// Features

function seite() {return window.location.pathname.substr(window.location.pathname.indexOf(fragezeichen)+1);}
// provides the referring site, without parameters

function seite_parameter() {return window.location.href.substr(window.location.href.indexOf(fragezeichen)+1);}
// provides the parameters of the referring page

function contains(a,b) { return (a.indexOf(b) != -1) }
// returns true if b is contained in a

function maxValue (arr) {
// returns the index number of the elmentem in the array 'arr' with the largest wert
  var maxV;
  if (arr.length > 0) { // If the array contains any elements
    maxV = 0;
    for (i = 1; i < arr.length; i++) {
      if (arr[i]>arr[maxV]) { maxV = i; }
    }
  } else {
    maxV = null
  }
  return maxV;  
}

function language() {
// provides the 'language' = XXX server address travian.XXX
  var host = window.location.host;
  var sprache = host.substr(host.indexOf('travian.')+8)
  if (Lang[sprache] == null) { sprache = 'com' }
  // if no translation exists for this server -> English
  return sprache;
}

function ressisAuslesen() {
// analyzes the original page and read the existing Ressis
  var elAllTD, kn;
  var cnt = 0;   // Counts the found Ressi species (max = 4: WoodLehm, Eisen, Getreide)
  vorrat[4] = 0; // the sum total here is going to come

  var elAllTD = TAG('TD');
  for ( i=0; ((i<elAllTD.length) && (cnt<4));i++ ) { 
                              // Examine all the TD elements, until all 4 Ressi-Arten gefunden wurden
    kn = elAllTD[i].firstChild;
    while ((kn != null) && (cnt<4)){
      if (kn.nodeType == 3) { // if there is a text node
        zeile = kn.data;
        if (contains(zeile,'/')) { 
          vorrat[cnt] = PR(zeile.substr(0,zeile.indexOf('/')));
          lager[cnt] = PR(zeile.substr(zeile.indexOf('/')+1));            
          vorrat[4] += vorrat[cnt];
          cnt += 1;
        }
      }
      kn = kn.nextSibling;
    }
  }
}

function insertTruppenLink(v,nr,elt,addy) {
// Adds a Link
  var setupLink = document.createElement('A');
  setupLink.innerHTML = '<font size="-2"> (' + berechneAnzahl(v, nr, vorrat[4])  + ') ' + einheit[v][nr][0]+'</FONT>';
  setupLink.setAttribute("href", 'javascript:void(0)');
  setupLink.addEventListener("click", function() {berechneRessis (v, nr, vorrat[4]);},false);

  newIMG = document.createElement('span');
  newIMG.innerHTML = ' <img src="img/x.gif" class="unit u' + PR(addy) + '"> ';
  elt.appendChild(newIMG);
  elt.appendChild(setupLink);
}

function insertRessiLink(r, elt) {}

function berechneAnzahl(v, nr, sum) {
// the maximum number of troops to be created
  var anzahl;
  anzahl = (sum / einheit[v][nr][5]);
  for (i=0; i<4; i++) {
    if ((anzahl * einheit[v][nr][i+1]) > lager[i]) {
      anzahl = lager[i] / einheit[v][nr][i+1];
    }
  }
  anzahl = Math.floor(anzahl)
  return anzahl
}

function setRessis (v, nr, anzahl, sum) {
  var rest = sum;
  var tmpRes = new Array(0,0,0,0);
  var resObj=document.getElementsByName("m2[]");
  var vorzeichen = '';
  for (i=0; i<4; i++) {
    tmpRes[i] = anzahl * einheit[v][nr][i+1]
    rest = rest - tmpRes[i];
  }

  // divide the remaining ressis
  while (rest > 0) {
    for (i=0; i<4;i++) {
      if (tmpRes[i] < lager[i]) {
        tmpRes[i] += 1;
        rest -= 1;
      }
    }
  }
  
  for (i=0; i<4; i++) {
    resObj[i].value = tmpRes[i];
    if ((tmpRes[i] - vorrat[i]) > 0) {vorzeichen = '+'} else {vorzeichen = ''}
    ID("diff"+i).innerHTML= vorzeichen + (tmpRes[i] - vorrat[i]);
  }
}

function setRessisRessi (r, sum) {
  var rest = sum;
  var tmpRes = new Array(0,0,0,0);
  var resObj=document.getElementsByName("m2[]");
  var vorzeichen = '';

  for (i=0; i<4; i++) { tmpRes[i] = 0}

  if (rest > lager[r]) {
    tmpRes[r] = lager[r]; 
    rest -= lager[r]
  } else {
    tmpRes[r] = rest;
    rest = 0;
  }

  // divide the remaining ressis
  while (rest > 0) {
    for (i=0; i<4;i++) {
      if (tmpRes[i] < lager[i]) {
        tmpRes[i] += 1;
        rest -= 1;
      }
    }
  }
  
  for (i=0; i<4; i++) {
    resObj[i].value = tmpRes[i];
    if ((tmpRes[i] - vorrat[i]) > 0) {vorzeichen = '+'} else {vorzeichen = ''}
    ID("diff"+i).innerHTML= vorzeichen + (tmpRes[i] - vorrat[i]);
  }
  
  ID("remain").innerHTML=0;
  ID("submitText").innerHTML="";
  ID("submitButton").style.display="block";
}

function berechneRessis (v, nr, sum) {
// calculates the individual Ressis for the maximum number of erschaffenden Truppen
  setRessis(v, nr, berechneAnzahl(v, nr, sum), sum);
  ID("newsum").innerHTML=sum;
  ID("remain").innerHTML=0;
  ID("submitText").innerHTML="";
  ID("submitButton").style.display="block";
}

function generiereNPCEintrag() {
// creates the entry on the page 
  elAllDiv = TAG('P');
                     // all P elements are found

  for ( i=0; i<elAllDiv.length; i++ ) {
    if (i == 0 ) { elAllDiv[i].parentNode.removeChild(elAllDiv[i]); }
    if (i == 2 ) {
      elAllDiv[i].innerHTML = '';

      newDIVall = document.createElement('div');
      newDIVall.setAttribute("align", "center");
      elAllDiv[i].parentNode.insertBefore(newDIVall, elAllDiv[i]); 

// Table
      newTABLE = document.createElement('TH');
      newTABLE.className = 'f10';
      newDIVall.appendChild(newTABLE);

      newTR = document.createElement('span');
      newTABLE.appendChild(newTR);

// Roemer
      newTD = document.createElement('div');
      newTD.setAttribute("align", "center");
      newTR.appendChild(newTD);
      for (j=0;j<5;j++) {insertTruppenLink('roemer',j,newTD,j+1);}
      newTD = document.createElement('div');
      newTD.setAttribute("align", "center");
      newTR.appendChild(newTD);
      for (j=0;j<5;j++) {insertTruppenLink('roemer',j,newTD,j+6);}

// Gauls
      newTD = document.createElement('div');
      newTD.innerHTML='<div align="center">&nbsp;</div>';
      newTD.setAttribute("align", "center");
      newTR.appendChild(newTD);
      for (j=0;j<5;j++) {
      insertTruppenLink('gallier',j,newTD,j+21);}
      newTD = document.createElement('div');
      newTD.setAttribute("align", "center");
      newTR.appendChild(newTD);
      for (j=0;j<5;j++) {
      insertTruppenLink('gallier',j,newTD,j+26);}
      insertTruppenLink('gallier',0,newTD,99);

// Teutons
      newTD = document.createElement('div');
      newTD.innerHTML='<div align="center">&nbsp;</div>';
      newTD.setAttribute("align", "center");
      newTR.appendChild(newTD);
      for (j=0;j<5;j++) {insertTruppenLink('germanen',j,newTD,j+11);}
      newTD = document.createElement('div');
      newTD.setAttribute("align", "center");
      newTR.appendChild(newTD);
      for (j=0;j<5;j++) {insertTruppenLink('germanen',j,newTD,j+16);}
    }
  }
}

function generiereNPCLink() {}
    //check if NPC page
    function isThisNPC()  {
        //var retValue = xpathResultEvaluate('//table[@id="npc"] | //tr[@class="rbg"]/td[@colspan="5"]').snapshotLength == 1 && document.getElementsByName('m2[]').length == 4;
        //if (retValue == false) retValue = document.getElementsByName("m2[]").length == 4;
        //return retValue;
        return xpathResultEvaluate('//table[@id="npc"] | //tr[@class="rbg"]/td[@colspan="5"]').snapshotLength == 1 && document.getElementsByName('m2[]').length == 4;
    }
    
    //check if NPC excluded
    function isThisNPCexcluded() {
        return (TB3O.boolUseNPCAssistant != '1' ||
            TB3O.boolIsThisNPC == true ||
            crtPage.indexOf("build.php") == -1 ||
            crtPage.match(/build.php\?(.*)&t=(\d+)/) != null ||
            get("map1") != null || find("//map[@name='map1']", XPFirst) != null);
    }

    //check if we are on the page where the NPC trade has been finished
    function boolIsThisPostNPC() {
        var xp = xpathResultEvaluate('//p/following-sibling::*/img[starts-with(@class,"r")] | //p[@class="txt_menue"]/following-sibling::*/img[starts-with(@class,"r")] | //p[@class="txt_menue"]/following-sibling::*/img[@class="res"]');
        return (xp.snapshotLength == 8);
    }

    //insert the NPC assistant back link
    function insertNPCHistoryLink() {
        var bname = getQueryParameters(urlNow, NPCbacklinkName);
        if (!bname) bname = "Go back";
        var div = get(dmid2);
        div.innerHTML += '<p>&nbsp;<a href="#" onclick="window.history.go(-2)"> &laquo; ' + bname + '</a></p>';
    }

    //fill in the NPC Merchant fields
    function fillinNPCfields(aURL) {
        if (aURL.indexOf('&' + NPCResources) != NPCURL.length) return false;
        var needed = getQueryParameters(aURL, NPCResources).split(',');
        var inputs = document.getElementsByName('m2[]');
        for (var i = 0; i < 4; i++) {inputs[i].value = needed[i];}
        unsafeWindow.calculateRest();
    }

// Main

einheitenFestlegen(language());
if (seite() != '/') { // z.b. www.travian.de
  generiereNPCLink();
}
if (contains(seite_parameter(),'&t=3')) {
  ressisAuslesen();
  generiereNPCEintrag();
}}
// teos
function saveNote(){
var elem1 = document.createElement("div");
elem1.innerHTML = '<div id="saved">'+Notefile[1]+'</div>';
if (ID("saved") !=null){
var tag = Xpath("id('saved')").snapshotItem(0); tag.parentNode.removeChild(tag);}
var saved = ID("btn_save");
saved.parentNode.appendChild(elem1);}
if ( document.location.href.indexOf("/nachrichten.php") != -1) {
ID("textmenu").innerHTML+= '| <a href="nachrichten.php?t=5">'+Notefile[0]+'</a>';}
if ( document.location.href.indexOf("/nachrichten.php?t=5") != -1) {
function NotePadX(){
var note = ID('textmenu'); var saves = GM_getValue("notepadlog");
note.innerHTML+= '<p><div id="block"><textarea id="notic"></textarea><p class="btn">'+
'<input type="image" alt="save" src="img/x.gif" class="dynamic_img" id="btn_save" value="save"></p></div></p>';
var savebutton = ID('btn_save');
function savelog() {var writtentext = ID('notic').value;
GM_setValue("notepadlog", writtentext);};
savebutton.addEventListener("click", savelog, false);
savebutton.addEventListener("click", saveNote, false);
var textboxy = ID('notic').value = saves;
if (ID("notic").value.match(/undefined/) !=null){ID("notic").value='';}};
window.addEventListener("load", NotePadX, true);};
//**********************************//
// teos
if (ID("GM_RNeed").checked == true){
if (ID("contract") != null){
if (ID("contract").innerHTML.match(/<img\b[^>]*>/) != null){
var basee =  ID("contract");
var details = CLASS("details")[0];
var base = basee.innerHTML;
var test = base.split(/<img\b[^>]*>/);
var neededRes = [];
var curRes = [];
var wantsRes = [];
var mColor = [];
for (var e = 0; e < 4; e++) {
neededRes[e] = test[(e+1)].replace(" | ", "").replace(/<span\b[^>]*>(.*)<\/span>/, "$1");
curRes[e] = ID("l" + (4-e)).innerHTML.split("/")[0];
var wholeRes = ID("l" + (4 - e));
var income = wholeRes.getAttribute("title");
var incomepersecond = income / 3600;
var getTitle = CLASS("r" + (e+1))[0].title;
wantsRes[e] = curRes[e] - neededRes[e];
if (wantsRes[e] >= 0) { mColor[e] = "green"; wantsRes[e] = "" }
else { mColor[e] = "red";wantsRes[e] = "<tr><td><img src='img/x.gif' class='r" + (e+1) + "' title='"+getTitle+"'></td><td id='NDL' style='font-size: small; color: red;'>" + wantsRes[e] + " </td> <td><span id='NRT"+(e+1)+"' style='color: black; font-size: small;'>&nbsp; (<span id='TimeOut'>" + format(Math.abs(Math.round(wantsRes[e] / incomepersecond)), 0) +"</span>) </span></td></tr></tbody></table>" }}
for (var j = 0; j < 4; j++) {
ID("contract").innerHTML +='<table cellspacing="0" style="width: auto;"><tbody id="needed"></tbody></table>';
ID("needed").innerHTML+= ''+wantsRes[j]+'';}

for (var e = 0; e < 4; e++) {
neededRes[e] = test[(e+1)].replace(" | ", "").replace(/<span\b[^>]*>(.*)<\/span>/, "$1");
curRes[e] = ID("l" + (4-e)).innerHTML.split("/")[0];
wantsRes[e] = curRes[e] - neededRes[e];
if (wantsRes[e] >= 0) {
var getTitle = CLASS("r" + (e+1))[0].title;
wantsRes[e] = "<td><img src='img/x.gif' class='r" + (e+1) + "' title='"+getTitle+"'></td><td style='color:green;'>+" + wantsRes[e]+"";}
else {wantsRes[e] = "" ;}}
for (var j = 0; j < 4; j++) {
basee.innerHTML +='<table id="NL" cellspacing="0" style="width: auto;"><tbody><tr id="resX"></tr></tbody></table>';
ID("resX").innerHTML+= ''+wantsRes[j]+'';}}}

if (ID("NL") != null){
var putLine = document.createElement("div");
    putLine.innerHTML = '<img id="Line" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL'+
    'AAAAACCAYAAAD4tVYgAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2gkWABcPki9m3AAAAAd0RVh0QXV0aG'+
    '9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdG'+
    'lvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2'+
    'FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7t'+
    'InAAAAI0lEQVQ4jWN0d3f/zzAKRsEQBBMnTmRgvHHjxmgCHgVDFgAAe/YHEcJ/vEsAAAAASUVORK5CYII%3D"/>';
var target = ID("NL");
target.parentNode.insertBefore(putLine, target);}};

    // Set timeouts
function funcSetTimers(){
setInterval(function () {
var relojes = funcFindElem("//*[@id='TimeOut']", XPList);
for (var i = 0; i < relojes.snapshotLength; i++){
var tiempo = funcTime2Seconds(relojes.snapshotItem(i).textContent) - 1;
if (tiempo >= 0) relojes.snapshotItem(i).innerHTML = funcSeconds2Time(tiempo);}},1000);}
{
    
    function funcGetResourcesData()
    {
        for (var i = 0; i < 4; i++) 
        {
            var a = funcGetElemByID('l' + (4-i));
            if ( a == null ) return;
            actual_resources[i] = a.innerHTML.split("/")[0];
            total_resources[i] = a.innerHTML.split("/")[1];
            resources_per_hour[i] =  a.title;
            resources_per_sec[i] = resources_per_hour[i]/3600;
        }
    }
        
    function funcGetGeneralData()
    {   actual_resources = new Array(4);
        actual_resources = [0,0,0,0];
        total_resources  = new Array(4);
        total_resources = [0,0,0,0];
        resources_per_sec = new Array(4);
        resources_per_sec = [0,0,0,0];
        resources_per_hour = new Array(4);
        resources_per_hour = [0,0,0,0];
        plus = false;
        autosDelay = 5000;
        funcGetResourcesData();
    }
    function funcSetAutoTimers()
    {}}

function funcMain()
{funcGetGeneralData();
 funcCalculateFillTime();
 funcSetAutoTimers();
 funcSetTimers();}
var scriptStartTime = new Date().getTime();
if (document.evaluate("//ns:div[@id='header']", document, nsResolver, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength < 1)
{} else {funcMain();}
//******************************//
if (CLASS("tableNone")[0] != null){
ajaxRequest('/a2b.php', 'GET', null, function(ajaxResp) {
    var theDoc = htmltocontext(ajaxResp.responseText);
    if (theDoc.getElementsByClassName("slots")[0] !=null){
    var getTroo = theDoc.getElementsByClassName("slots")[0].innerHTML;
var XP = Xpath("//table[@id='options']/tbody/tr[2]/td");
if(XP.snapshotItem(0)){ var PerHour = ' <span style="color: black;">'+getTroo+'</span>'; XP.snapshotItem(0).innerHTML= XP.snapshotItem(0).innerHTML + PerHour;}
    }
});};
//******************************//
if (CLASS("building g10")[0] !=null || CLASS("building g11")[0] !=null || CLASS("building g1")[0] !=null || CLASS("building g2")[0] !=null || CLASS("building g3")[0] !=null || CLASS("building g4")[0] !=null){
if (document.location.href.indexOf('/build.php?') != -1){
var valueA = ID("build_value").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getElementsByTagName("b")[0].innerHTML;
var valueB = ID("build_value").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[0].getElementsByTagName("b")[0].innerHTML;
var getA = PR(valueB) - PR(valueA);
ID("build_value").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].innerHTML+=' : = <b>+'+getA+'</b>';}};
//----> begin vlist setting <----//
if (ID("GM_VList").checked == true){
if (ID("vlist") != null) {
function xy2id(x, y) {return (1 + (PR(x) + 400) + (801 * Math.abs(PR(y) - 400)));}
var villages = ID("vlist").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
for (vn in villages) {
  var getTds = villages[vn].getElementsByTagName("td");
  var getIt = getTds[1].getElementsByTagName("a")[0].href; getA = getIt.match(/\?newdid=(.*)/);
  if (getA == null) { alert("Error occurred"); break; }; getA = getA[1].split("&");
  var coords = getTds[2].getElementsByTagName("div"); var coordsi = new Array();
  coordsi[0] = coords[0].textContent; coordsi[2] = coords[2].textContent;
  var myVid = xy2id(coordsi[0].replace("(", ""), coordsi[2].replace(")", "")); var myCid = getA[0];
  villages[vn].innerHTML += " <td><a href='a2b.php?z=" + myVid + "'><img src='data:image/gif;base64,R0lGODlhEgAQAMZOAMeLADtsLTdcAF63Pa/CxP/SAJHOeiucAEJsH1aaPWjbPU55PZjmenjDXNXszIu6elKyLnGqXEmSLkWsHkBvLjJkH13YLtf2zIWjeqvZmYDhXDFkHmqOXCRZDzuKHi6CD6bKmdPkzHOVZnqvZtDczKK5mZmykVDWHpeqelJ9RjinD7DsmUVyM1a0M4jjZm+PVUasH2KJV0XTDzyKH4DHZlh9ObPEpVHWH9fezFl+OlWwM4KheV99M1t5Ll60PUSoHk9wH0WoH2eDPU9vHtDh45musIVRALt+IGU+AIpQADnQACF6ABZPACyhAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFyAB/ACwAAAAAEgAQAAAHiIB/f0VEgoaHf0RFhwSEhYhEigSIRQFMl5iXAYuIAUtLTU1KSqGfAYh/TJ+ho6VLTKiqoKKkTZ+wiLKstbeoCKu0rgiIAAWqu6VMBUmHSQACs622AgDMzQBMyE1M1ahHSQLaAklHiEdGSEnZrUxJSEblgudIguoHB+2C7+XzubiG+9ChGvjnXSAAIfkEBQEAfwAsAwACAAQABAAABxCAfzEVHTEzH38ViH8df46BACH5BAUBAH8ALAMAAgAGAAYAAAcfgH8pCyILGykJIwMTfwsjCYx/Igkef5YLlZZ/NZqWgQAh+QQFAQB/ACwDAAIACAAHAAAHLoB/AUwUHCUcFAFLEg0ZGhZ/TBIRGQ2QfxQRIA0Qf54cIBGdnn82ERKkpBSpnoEAIfkEBQEAfwAsAwACAAoACAAABzmAf4JMTAsYJBgLgktNAwwXBgOLSwMGFwySf0xLCQYODAqCmgkPDgahoi8PIZGioiQPma5/KAmzgoEAIfkEBQEAfwAsAwACAAsACgAAB0CAf4KCTEwLfyQmg39NSgp/Dg8Jg01Njw4Gk4JLTQN/Fwaem0ueFwyifwhLkw4Mj4uHmK+LfyGhtIMYqLhCuIKBACH5BAUBAH8ALAQAAgALAAsAAAdEgH+Cg0xMC4OISk0DfyEmiUqMIQ+Hgk1KCn8ODwmDTU2ZDgadgkuLfxcGjIJMS4wXDKuCAp0ODJmIgqK4uTiquYiVwIEAIfkEBQEAfwAsBQACAAoADAAAB02Af4KDf0wBhINNSxI7iE1NEhElhEpNEBEgHINKShANIBEUgk1KFg0ZERKjTRYaGQ2qf0uWGisNEINMnisauIM9pxoWiH8lDcPEf6LEgQAh+QQFAQB/ACwFAAMACgAMAAAHS4B/goOCSwGEg0tLG4h/TUseC4hNTR4JIoRKTRMJIy+DSkoTAyOSgk1KJwM0CUOnTScKNAOMfwKbCi4DE4QbAy4KvIgiPj+NgrWEgQAh+QQFAQB/ACwGAAQACQALAAAHO4B/goOCTISDS4aHS0sdh01LHzmETU0fFYRKTSozPINKSiowLINNSjIwLUCFTTI3LZiDHUE6sYQstoKBACH5BAEBAH8ALAcABgAIAAkAAAclgH+Cg39MhIJLCIdLhoRNSwKOTY2CSk1NkZWWlEwHB5SCTKB/gQA7'/></a></td> ";
  villages[vn].innerHTML += " <td><a href='build.php?z=" + myVid + "&gid=17'><img class='iReport iReport14' src='img/x.gif'/></a></td>";}}};
//----> end vlist setting <----//
  
if (ID("distribution") !=null){
if (CLASS("val")[5] !=null){
var getA = CLASS("val")[5].innerHTML.split("%")[0];
var levelW = ID("distribution").getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].getElementsByTagName("th")[0].innerHTML.split(">")[2].split(" ")[1];
var levelN = ID("distribution").getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].getElementsByTagName("th")[0].innerHTML.split(">")[2].match(/[0-9]/)[0];
    levelN = PR(levelN) + PR(1);
var collect = PR(getA) - PR(100);
var width = PR(collect) - PR(collect) - PR(collect) * PR(2);
var A = ID("distribution").getElementsByClassName("po")[0].innerHTML;
var B = ID("distribution").getElementsByClassName("po")[1].innerHTML;
var C = ID("distribution").getElementsByClassName("po")[2].innerHTML;
var D = ID("distribution").getElementsByClassName("po")[3].innerHTML;
var E = ID("distribution").getElementsByClassName("po")[4].innerHTML;
var begin = PR(A) + PR(B) + PR(C) + PR(D) + PR(E);
var setTitle = ''+A+'+'+B+'+'+C+'+'+D+'+'+E+'='+begin+'';
ID("distribution").getElementsByTagName("tbody")[0].innerHTML+=''+
'<tr><th>'+levelW+' '+levelN+':</th><td class="val">%'+collect+'</td><td class="xp">'+
'<img title="'+width+'" alt="'+width+'" style="width: '+width+'px;" src="img/x.gif" class="bar"></td>'+
'<td class="up" style="color:silver;">-</td><td class="rem" title="'+setTitle+'">'+begin+'</td></tr>';
}};

if (Xpath("//table[@id='overview']/tfoot/tr/th").snapshotItem(0) !=null){
Xpath("//table[@id='overview']/tfoot/tr/th").snapshotItem(0).innerHTML='<input type="checkbox" class="check" id="s10" name="s10" onclick="Allmsg(this.form);">';};
if (CLASS("building g25")[0] != null || CLASS("building g26")[0] != null){
if (document.location.href.indexOf("&s=2") != -1 ){
var getA = ID("build").getElementsByTagName("p")[5].getElementsByTagName("b")[0].innerHTML;
var getB = ID("build").getElementsByTagName("p")[5].getElementsByTagName("b")[1].innerHTML;
var getC = ID("build_value").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[0].getElementsByTagName("b")[0].innerHTML;
var getD = getC / 86400;
var getE = ID("textmenu").getElementsByTagName("a")[1].innerHTML;
var getF = PR(getA) - PR(getB); if (getF >= 0) {getF = '<span style="color:green;">+'+getF};
var getG = '&nbsp;(<span style="font-size: 11px; color: rgb(64, 128, 128);" id="TimeOut">' + format(Math.abs(Math.round(getF / getD)), 0) +'</span>)';
ID("textmenu").innerHTML+=' <div> <p>'+getE+': <span id="cas" style="color:black;"> '+getF+' </span> </p> </div> ';
if (ID("cas").innerHTML.match(/-/) != null)
{ID("cas").setAttribute("style", "color:red;"); ID("cas").innerHTML+= +getG;}}};
var close = Xpath("id('setting')").snapshotItem(0); close.parentNode.removeChild(close);};

function updateTPTH() {
		try {
			GM_xmlhttpRequest({
				method: 'GET',
				url: SCRIPT.url, // don't increase the 'installed' count; just for checking
				onload: function(result) {
					if (result.status != 200) {return;}
					if (!result.responseText.match(/@version\s+([\d.]+)/)) {return;}
					var theNewVersion = RegExp.$1;
					if (theNewVersion == SCRIPT.version) {
						//_log(2,"theNewVersion equals sCurrentVersion>" + aLangUpdate[1] + ' (v ' + sCurrentVersion + ')!');
						alert("No upadates found - for any further help mail to : craja753@rediffmail.com");
						return;
					} else if (theNewVersion < SCRIPT.version) {
						alert("NewVersion is older than the CurrentVersion>");
						return;
					} else {
						//_log(1,"theNewVersion is greater than CurrentVersion>" + aLangUpdate[0] + ' (v ' + sCurrentVersion + ') Lets update!');
						if (window.confirm(SCRIPT.name + ' (v ' + theNewVersion + ') available.\n\n' + "Update now" + '\n')) window.location.href = SCRIPT.url;
					}
				}
			});
		} catch (ex) {}
}
