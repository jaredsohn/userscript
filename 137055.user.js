// ==UserScript==
// @name OTRS Erweiterungen
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @namespace http://redkom2.spoe.at/otrs/
// @autor Paul Reisenauer
// @include http://redkom2.spoe.at/otrs/*
// @date 16/04/2011
// @version 0.1
// ==/UserScript==

function stripString(ftext, srchstr, endstr, ab){
var i = ab;
i = ftext.indexOf(srchstr,i);
return ftext.substr(i + srchstr.length, ftext.indexOf(endstr,i + srchstr.length+1)-(i + srchstr.length));
};

function clone(o){
return eval(uneval(o));
};


var GetVars;
GetVars=location.search.substring(1,location.search.length).split('&');

if(GetVars[0] == "Action=AgentCustomer"){
var ftext=document.body.innerHTML;
var srchstr="/otrs/index.pl?Action=AgentZoom&amp;TicketID=";
var i = 1;
var zwisch;
var ids = new Array();
var s = 0;


zwisch = stripString(ftext, srchstr, '&',i);
i = ftext.indexOf(srchstr,i);

while(i > -1){
if(ftext.substr(ftext.indexOf("Status: ", i)+8,3)=='new'){
ids[s] = zwisch;
s = s+1;
}

i = i + 1;
i = ftext.indexOf(srchstr,i);
zwisch = stripString(document.body.innerHTML, "/otrs/index.pl?Action=AgentZoom&amp;TicketID=", '&',i);
}
document.forms[0].innerHTML = document.forms[0].innerHTML + '<br/><br/><hr/><input type="button" value="Alle offenen Mails des Kunden schlie&szlig;en" onclick="testest();"><hr/><br/>' ;

unsafeWindow.testest = function(){
for(var i = 0; i < ids.length;i++){
$.post("/otrs/index.pl", { Action: "AgentClose", Subaction: "Store", QueueID: "2", TicketID: ids[i], NextScreen: "", Subject: "Schließen! - Informationen", Body: "Informationen", CloseNoteID: "9", CloseStateID: "14", TimeUnits: ""}, function(data){}, "json");
document.forms[0].innerHTML = document.forms[0].innerHTML + ".";
}
setTimeout("location.reload(true);",2000);
};
} else if((GetVars[0] == "Action=AgentQueueView" && GetVars[1]) || GetVars[0] =="Action=AgentMailbox"){
var einelement = false;
var zwischenspeicherungid;
var zwischenspeicherungid2;
for(var i = 1; i < document.getElementsByTagName("td").length; i = i + 1){
//document.getElementsByTagName("td")[i].innerHTML +="&nbsp;<b>" + i + "</b>";
if(document.getElementsByTagName("td")[i].innerHTML.indexOf("<b>[ Ticket#: ",0)>-1){
zwischenspeicherungid = stripString(document.getElementsByTagName("td")[i+2].innerHTML,"/otrs/index.pl?Action=AgentZoom&amp;TicketID=", '"',0);
document.getElementsByTagName("td")[i].innerHTML = document.getElementsByTagName("td")[i].innerHTML + '&nbsp;<input type=checkbox name="mycheckedid" value="' + zwischenspeicherungid + '"checked>';
einelement = true;
}
var welcheW;
if(GetVars[0] == "Action=AgentQueueView"){
welcheW = "Eskalation in:";
}else{
welcheW = "Warteschlange:";
}

if(einelement && (document.getElementsByTagName("td")[i].innerHTML.indexOf(welcheW,0) > -1)){
if(zwischenspeicherungid2 == zwischenspeicherungid){
document.getElementsByTagName("td")[i+2].id = "id" + zwischenspeicherungid;
$.get('http://redkom2.spoe.at/otrs/index.pl?Action=AgentCustomer&TicketID='+zwischenspeicherungid, function(data){
var theid = stripString(data,"<input type=\"hidden\" name=\"TicketID\" value=\"", "\"",1);
if(data.indexOf("Warteschlange: Telefonisch",0) > -1){
document.getElementById("id" + theid).innerHTML += "<br/><b>TEL vorhanden!</b>";
}
var shtml = data.slice(0,data.indexOf("/otrs/index.pl?Action=AgentZoom&TicketID="+theid,0)) + data.slice(data.indexOf("<!-- end recorde -->",data.indexOf("/otrs/index.pl?Action=AgentZoom&TicketID="+theid,0)),data.length-1);
if((shtml.indexOf("Status: open",0) > -1) || (shtml.indexOf("Status: new",0) > -1)){
document.getElementById("id" + theid).innerHTML += "<br/><b>Weiteres Ticket offen!</b>";
}
document.getElementById("id" + theid).innerHTML += "<br/><b>Gesamtmails: " + (data.split('onmouseover="window.status=' + "'" + "Inhalt'; return true;" + '"').length-1) + "</b>";
});

}else{
zwischenspeicherungid2 = zwischenspeicherungid;
}

}
}
if(einelement){
document.getElementsByTagName("td")[document.getElementsByTagName("td").length-4].innerHTML = '<h2>[ Ticket-Serienbearbeitung ]</h3><input type="button" value="Alle auf Information stellen!" onclick="alleaufInfo();"><hr/>';
if(typeof document.getElementsByName("NewUserID")[0] == 'undefined'){
$.get('http://redkom2.spoe.at/otrs/index.pl?Action=AgentUtilities', function(data){
document.getElementsByTagName("td")[document.getElementsByTagName("td").length-4].innerHTML += '<select name="NewUserID" id="serienbearbeitungbenutzer">' + stripString(data,'<select name="UnlockUser" multiple  size=5>', '</select>',0) + '</select>' + '<input type="button" value="Neuer Besitzer" onclick="alleNeuerBesitzer();"><hr/>';
document.getElementsByTagName("td")[document.getElementsByTagName("td").length-4].innerHTML += '<select name="DestQueueID" id="serienbearbeitungqueue" onchange="alleQueueWechseln();">' + '<option selected value="-100">-</option>' + stripString(data,'<select name="QueueID" size=' + "'5'" + ' multiple >', '</select>',0) + '</select>';
unsafeWindow.alleQueueWechseln = function(){
if(document.getElementById("serienbearbeitungqueue").value != "-100"){
for(var i = 0; i < document.getElementsByName("mycheckedid").length;i++){
if(document.getElementsByName("mycheckedid")[i].checked){
$.get("/otrs/index.pl", { Action: "AgentMove", Subaction: "InRage", TicketID: document.getElementsByName("mycheckedid")[i].value, DestQueueID: document.getElementById("serienbearbeitungqueue").value}, function(data){}, "json");
}
}
setTimeout("location.reload(true);",1000);
}};
});

}else{
newobj = document.getElementsByName("NewUserID")[0].cloneNode(true);
newobj.id = "serienbearbeitungbenutzer";
document.getElementsByTagName("td")[document.getElementsByTagName("td").length-4].appendChild(newobj);
document.getElementsByTagName("td")[document.getElementsByTagName("td").length-4].innerHTML += '<input type="button" value="Neuer Besitzer" onclick="alleNeuerBesitzer();"><hr/>';

newobj = document.getElementsByName("DestQueueID")[0].cloneNode(true);
newobj.id = "serienbearbeitungqueue";
newobj.addEventListener('change', function(){
if(document.getElementById("serienbearbeitungqueue").value != "-100"){
for(var i = 0; i < document.getElementsByName("mycheckedid").length;i++){
if(document.getElementsByName("mycheckedid")[i].checked){
$.get("/otrs/index.pl", { Action: "AgentMove", Subaction: "InRage", TicketID: document.getElementsByName("mycheckedid")[i].value, DestQueueID: document.getElementById("serienbearbeitungqueue").value}, function(data){}, "json");
}
}
setTimeout("location.reload(true);",1000);
}},true);
document.getElementsByTagName("td")[document.getElementsByTagName("td").length-4].appendChild(newobj);
}

unsafeWindow.alleQueueWechseln = function(){
if(document.getElementById("serienbearbeitungqueue").value != "-100"){
for(var i = 0; i < document.getElementsByName("mycheckedid").length;i++){
if(document.getElementsByName("mycheckedid")[i].checked){
$.get("/otrs/index.pl", { Action: "AgentMove", Subaction: "InRage", TicketID: document.getElementsByName("mycheckedid")[i].value, DestQueueID: document.getElementById("serienbearbeitungqueue").value}, function(data){}, "json");
}
}
setTimeout("location.reload(true);",1000);
}};

unsafeWindow.alleaufInfo = function(){
for(var i = 0; i < document.getElementsByName("mycheckedid").length;i++){
if(document.getElementsByName("mycheckedid")[i].checked){
$.post("/otrs/index.pl", { Action: "AgentClose", Subaction: "Store", TicketID: document.getElementsByName("mycheckedid")[i].value, NextScreen: "", Subject: "Schließen! - Informationen", Body: "Informationen", CloseNoteID: "9", CloseStateID: "14", TimeUnits: ""}, function(data){}, "json");
}
}
setTimeout("location.reload(true);",1000);
};

unsafeWindow.alleNeuerBesitzer = function(){
for(var i = 0; i < document.getElementsByName("mycheckedid").length;i++){
if(document.getElementsByName("mycheckedid")[i].checked){
$.get("/otrs/index.pl", { Action: "AgentOwner", Subaction: "Update", TicketID: document.getElementsByName("mycheckedid")[i].value, NewUserID: document.getElementById("serienbearbeitungbenutzer").value}, function(data){}, "json");
}
}
setTimeout("location.reload(true);",1000);
};
}
} else if((GetVars[0] == "Action=AgentUtilities" && !GetVars[1])){
var t=0;
for(var y=0; y < document.getElementsByTagName("td").length;y++){
if(document.getElementsByTagName("td")[y].innerHTML.indexOf("[ Ticket-Freigabe ]", 0) > -1){
t = y + 1;
}
}

var zwisch = document.getElementsByTagName("td")[t].innerHTML;
document.getElementsByTagName("td")[t].innerHTML ='<table border="0" width="100%"><tr><td style="border-right:solid #DE0000 1px" align="center">' + zwisch + '</td><td align="right">' + '<select name="serienb" id="serienbearbeitunguser"  size=5>' + stripString(zwisch,'<select name="UnlockUser" multiple="multiple" size="5">', '</select>',1) + '</select><br/><br/></td><td valign="middle" align="center">' + '<input type="button" value="&ge;&ge;" onclick="BesitzerWechseln();"><br/><br/></td><td>' + '<select name="serienb" id="serienbearbeitunguser1"  size=5>' + stripString(zwisch,'<select name="UnlockUser" multiple="multiple" size="5">', '</select>',1) + '</select><br/><br/></td></tr></table>';

unsafeWindow.BesitzerWechseln = function(){
if(document.getElementById("serienbearbeitunguser").value != "" && document.getElementById("serienbearbeitunguser1").value != ""){
$.get('http://redkom2.spoe.at/otrs/index.pl?Action=AgentUtilities&Subaction=Search&Want=&What=From&What=Subject&What=Body&TicketNumber=&Locked=1&UserID='+document.getElementById("serienbearbeitunguser").value, function(data){
var ftext=data;
var srchstr="/otrs/index.pl?Action=AgentZoom&TicketID=";
var i = 1;
var zwisch;
var ids = new Array();
var s = 0;

zwisch = stripString(ftext, srchstr, '&',i);
i = ftext.indexOf(srchstr,i);

while(i > -1){
if(ids[s-1] != zwisch){ 
ids[s] = zwisch;
s = s+1;
}

i = i + 1;
i = ftext.indexOf(srchstr,i);
zwisch = stripString(ftext, srchstr, '&',i);
}
i=0;
for(var i = 0; i < ids.length;i++){
$.get("/otrs/index.pl", { Action: "AgentOwner", Subaction: "Update", TicketID: ids[i], NewUserID: document.getElementById("serienbearbeitunguser1").value}, function(data){}, "json");
}
setTimeout("location.reload(true);",800);

});
}
};
}