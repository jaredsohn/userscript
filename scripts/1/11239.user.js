// ==UserScript==
// @name 			Wykop Spam Cleaner with interface
// @description 	Remove spam links from Wykop
// @author			Dziudek
// @version 		0.3
// @include 		http://*wykop.pl/
// @include 		http://*wykop.pl/#*
// @include 		http://*wykop.pl/kategoria*
// @include 		http://*wykop.pl/wykopalisko*
// @include 		http://*wykop.pl/search?*
// ==/UserScript==

var panelVisible = false;
var namespace = 'wykopSpamCleaner03';
userR = eval('(' + GM_getValue(namespace, '{"rules":[]}') + ')');
var d = document;
function $(el){return d.getElementById(el);}
function $$(c){var a = new Array();var es = d.getElementsByTagName("*");var exp = new RegExp("^(.* )?"+c+"( .*)?$", "g");
for(var i=0;i<es.length;i++){if(exp.test(es[i].className)){a.push(es[i]);}}
return a;}
String.prototype.test = function(regexp, parametry){return ((regexp) ? new RegExp(regexp, parametry) : regexp).test(this);}
function panel(event){event.preventDefault();(!panelVisible) ? $("panelWSC").style.display = 'block' : $("panelWSC").style.display = 'none';  panelVisible = !panelVisible;}
function $defined(obj){return (obj != undefined);};
function $type(obj){if(!$defined(obj)) return false;var type = typeof obj;if (type == 'object' || type == 'function'){switch(obj.constructor){case Array: return 'array';}}return type;};
function toString(obj){switch($type(obj)){case 'string':return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';case 'array':return '[' + obj.map(toString).join(',') + ']';case 'object':var string = [];for (var property in obj) string.push(toString(property) + ':' + toString(obj[property]));return '{' + string.join(',') + '}';}return String(obj);}
function textToJson(text){eval('(' + text + ')');}
function WSCsave(obj){var userRstr = toString(obj);GM_setValue(namespace, userRstr);}
function WSCadd(){var rtype = "", rrule = "";($("user").checked) ? rrule = "user" : rrule = "link"; ($("style").checked) ? rtype = "style" : rtype = "remove";userR.rules[userR.rules.length || 0] = {rule: rrule,regexp: $("addRule").value,type: rtype,style: $("addStyle").value};WSCsave(userR);
var el = d.createElement("li");el.setAttribute("style","margin-top: 4px;");el.setAttribute("id","WSCL-"+$("addRule").value);var style = "";
($("addStyle").value == "") ? style = "brak" : style = $("addStyle").value;
el.innerHTML = "&raquo; <span title=\"Parametry: " + style + "\" style=\"cursor: pointer;\">" + $("addRule").value + "</span> (<a href=\"#\" id=\"" + $("addRule").value + "\" style=\"color: Red;font-style: bold;\">\u00D7</a>)";
(rrule == "user") ? $("ruserlist").appendChild(el) : $("rlinklist").appendChild(el);
$($("addRule").value).addEventListener("click",function(event){event.preventDefault();userR.rules.forEach(function(el,i){if(el.regexp == event.target.id){userR.rules.splice(i,1);$("WSCL-"+el.regexp).parentNode.removeChild($("WSCL-"+el.regexp));WSCsave(userR);spam_remove(true);}});},false);spam_remove(true);}
function WSClistCreate(){userR.rules.forEach(function(Rule){var el = d.createElement("li");el.setAttribute("style","margin-top: 4px;");el.setAttribute("id","WSCL-"+Rule.regexp);var style = "";(Rule.style == "") ? style = "brak" : style = Rule.style;el.innerHTML = "&raquo; <span title=\"Parametry: " + style + "\" style=\"cursor: pointer;\">" + Rule.regexp + "</span> (<a href=\"#\" id=\"" + Rule.regexp + "\" style=\"color: Red;font-style: bold;\">\u00D7</a>)";(Rule.rule == "user") ? $("ruserlist").appendChild(el) : $("rlinklist").appendChild(el);$(Rule.regexp).addEventListener("click",function(event){event.preventDefault();userR.rules.forEach(function(el,i){if(el.regexp == event.target.id){userR.rules.splice(i,1);$("WSCL-"+el.regexp).parentNode.removeChild($("WSCL-"+el.regexp));WSCsave(userR);spam_remove(true);}});},false);});}
function spam_remove(listRefresh){var iloscSpamu = 0, usuniete = 0;var linkTable = [];if(userR.rules){$$('details').forEach(function(el,i){linkTable[i] = el;});linkTable.forEach(function(element,j){var spelniaWarunki = false;userR.rules.forEach(function(Rule){
if(Rule.rule == "user" && Rule){if(element.childNodes[3].href.test(Rule.regexp,'i')){
switch(Rule.type){case 'style': linkTable[j].parentNode.parentNode.setAttribute("style",Rule.style);break;
case 'remove': (linkTable[j].parentNode.parentNode).parentNode.removeChild(linkTable[j].parentNode.parentNode);usuniete++;break;}iloscSpamu++;spelniaWarunki = true;}}else{if(element.childNodes[7].href.test(Rule.regexp,'i') && element.childNodes[7] && Rule){switch(Rule.type){case 'style': linkTable[j].parentNode.parentNode.setAttribute("style",Rule.style);break;case 'remove': (linkTable[j].parentNode.parentNode).parentNode.removeChild(linkTable[j].parentNode.parentNode);usuniete++;break;}(spelniaWarunki) ? false : iloscSpamu++;}}});});}if(listRefresh){$('wykop-kinds').childNodes[11].innerHTML = "<a href=\"#\"><strong>Wykop Spam Cleaner (" + iloscSpamu + "|" + usuniete + ")</strong><a>";$('wykop-kinds').childNodes[11].childNodes[0].addEventListener('click', panel, false);}
if(!listRefresh){if(d.getElementById('wykop-kinds')){var pa = d.createElement("li");$('wykop-kinds').appendChild(pa);}	else{var pa = d.createElement("div");pa.setAttribute("style","margin: 0 auto;width: 600px;text-align: center;padding: 20px;font-size: 14px;");$$('wykop-item')[0].parentNode.insertBefore(pa, $$('wykop-item')[0]);}pa.innerHTML = "<a href=\"#\"><strong>Wykop Spam Cleaner (" + iloscSpamu + "|" + usuniete + ")</strong><a>";pa.childNodes[0].addEventListener('click', panel, false);var padiv = d.createElement("div");
padiv.innerHTML = "<p style=\"border-bottom: 1px solid #EFF3F6;padding-bottom: 5px;\">W tym miejscu możesz zarządzać swoimi regułami filtrowania linków. O tym jak tworzyć wyrażenia regularne dowiesz się na <a href=\"http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:RegExp\" style=\"border-bottom-width: 1px;border-bottom-style: dashed;\">stronach MDC</a>. Więcej informacji na <a href=\"http://dziudek.jogger.pl\" style=\"border-bottom-width: 1px;border-bottom-style: dashed;\">dziudek.jogger.pl</a></p><div style=\"padding: 10px;border-bottom: 1px solid #EFF3F6;font-size: 12px;\"><ul id=\"panelWSCadd\"><li style=\"margin: 5px;\"><strong>Reguła:</strong> <input type=\"text\" id=\"addRule\" /> <strong>Typ:</strong> <input type=\"radio\" id=\"user\" name=\"addType\" /> user <input type=\"radio\" id=\"link\" name=\"addType\" checked=\"checked\" /> link</li><li style=\"margin: 5px;\"><strong>Oznaczanie:</strong> <input type=\"radio\" id=\"style\" name=\"addMethod\" /> styl użytkownika <input type=\"radio\" id=\"remove\" name=\"addMethod\" checked=\"checked\" /> ukrycie</li><li style=\"margin: 5px;\"><strong>Styl użytkownika:</strong> <input type=\"text\" id=\"addStyle\" /></li><li style=\"margin: 5px;text-align: right;\"><button>Dodaj regułę</button></li></ul></div><div style=\"display: table;\"><div style=\"display: table-cell;padding: 5px;border-right: 3px solid #EFF3F6;width: 285px;\"><ul id=\"ruserlist\"><li><strong>Użytkownicy</strong></li></ul></div><div style=\"display: table-cell;padding: 5px;width: 285px;\"><ul id=\"rlinklist\"><li><strong>Linki</strong></li></ul></div></div>";
padiv.setAttribute("id","panelWSC");padiv.setAttribute("style","display:none;width:600px;border:5px solid #EFF3F6;margin:0 auto;padding:10px;margin-bottom:10px;font-family:Verdana;font-size:11px;color:#4B6A7C;");
$$('wykop-item')[0].parentNode.insertBefore(padiv, $$('wykop-item')[0]);
$("panelWSCadd").childNodes[2].style.display = 'none';
$("style").addEventListener("click",function(){$("addStyle").value = "";$("panelWSCadd").childNodes[2].style.display = 'block';},false);$("remove").addEventListener("click",function(){$("addStyle").value = "";$("panelWSCadd").childNodes[2].style.display = 'none';},false);
$("panelWSCadd").childNodes[3].childNodes[0].addEventListener("click", WSCadd,false); WSClistCreate();}}
spam_remove(false);