// ==UserScript==
// @name           wöe
// @version        0.3
// @author         cafaro
// @namespace      http://userscripts.org/scripts/show/24295
// @description    Enhances Omerta's gameplay.
// @include        http://*barafranca.*/*
// @include        http://*omerta.*/*
// @include        http://cafaro.vennezia.com/sleepy/interface.xul?extension=*
// @resource       logo http://cafaro.vennezia.com/sleepy/images/logo.png
// @resource       favorite http://cafaro.vennezia.com/sleepy/images/favorite.png
// @resource       lock http://cafaro.vennezia.com/sleepy/images/lock.gif
// @resource       favicon http://cafaro.vennezia.com/sleepy/images/favicon.png
// @resource       interface http://cafaro.vennezia.com/sleepy/images/interface.png
// @resource       customize_menu http://cafaro.vennezia.com/sleepy/images/customize_menu.png
// ==/UserScript==


//##################################################################################
var sitelink = "http://www.barafranca.gen.tr/";;
var botting = false;
var action = undefined;
var freeeta = undefined;
var crimeeta = undefined;
var carseta = undefined;
var bfeta = undefined;
var injail = false;
var timeout = 0;
var timeouteta = undefined;
var code_right = false;
var code_hash = false;
var err_time = 5000;
var errors = 0;
var boozeeta = undefined;
var drugseta = undefined;
var trie = false;
var jailcheck = undefined;
var statusdivklok;
//bullets
var bfam = undefined;
//max price if 400 present
var maxprice = 500;
//min buy if not 400 present
var minbullets = 300;
//min price if more then minbullets present
var minbullets_price = 350;
var bfeta = undefined;

// * Deze familie krijgt voorrang bij busten *
var preferClan = "";
var preferBust = [
];

// * Soort drugs en drank *
var buytype = new Object;
buytype["Drugs"] = 6; /// Lijm
buytype["Booze"] = 4; /// Bier

// * Aantal d&d transacties per uur *
var aantal_dd = 2;

// Kans(%) om iemand te gaan busten als er niets anders te doen is
var bustChance = 10;
// Flesje schieten (1) of niet (0)?
var schietFlesje = 1;

// Reisbestemmingen
// Alle
//var bestemmingen = ["Detroit","Chicago","Palermo","New York","Las Vegas","Philadelphia","Baltimore","Corleone"];
// Amerika
var bestemmingen = ["Detroit","Chicago","New York","Las Vegas","Philadelphia","Baltimore"];
// Italie
//var bestemmingen = ["Corleone","Palermo"];

// Rang naar D/D
rangen=[
["Empty-Suit", 1, 0, 0], //0
["Deliveryboy", 2, 0, 0], //1
["Picciotto", 5, 1, 1], //2
["Shoplifter", 7, 2, 80], //3
["Pickpocket", 10, 4, 100], //4
["Thief", 15, 5, 120], //5
["Associate", 20, 7, 140], //6
["Mobster", 25, 8, 160], //7
["Soldier", 30, 10, 180], //8
["Swindler", 35, 11, 200], //9
["Assassin", 40, 13, 220], //10
["Local Chief", 45, 14, 240], //11
["Chief", 50, 16, 260], //12
["Bruglione", 60, 17, 280], //13
["Godfather", 70, 20, 300] //14
];

var rank = 5;

// Reisbestemmingen
var steden = new Object;
steden["Detroit"] = 'nul';
steden["Chicago"] = '1';
steden["Palermo"] = '2';
steden["New York"] = '3';
steden["Las Vegas"] = '4';
steden["Philadelphia"] = '5';
steden["Baltimore"] = '6';
steden["Corleone"] = '7';

var alleSteden = ["Detroit","Chicago","Palermo","New York","Las Vegas","Philadelphia","Baltimore","Corleone"];

var buycount = new Object;
buycount["Booze"] = rangen[rank][1];
buycount["Drugs"] = rangen[rank][2];
var crimename;

/// D&D gedaan dit uur?

/// Status dit uur

/// Laatste d&d
var lastdd = new Date();

/// Wachttijden na auto/misdaad
var waitAfterCar = 300; // 5 min
var waitAfterCrime = 100; // 1 min 40 sec
var waitAfterTravel = 30*60; // 30 min

var lasthash;
//###################################################################################
//###################################################################################
function writeln(s) {
WScript.Echo(s);
}

function getBustPriority(name)
{
for(x=0; x<preferBust.length; ++x)
if(preferBust

== name)
return x;
return 10000;
}

function s()
{
var main = document.frames(2);
var i = main.document.images.length-1;
var result = doImage(main.document.images(i), -2);
if(result && result.length == 3 && result != "111" && result != undefined)
{
var form = main.document.forms
;
form.ver.value = result;
form.elements[form.elements.length-1].click();
return true;
}
else
{
error = "Match invalid length";
return false;
}
}

function doImage(img, offset)
{
error = "";
var document = img.ownerDocument;
var win = document.parentWindow;
if(img.clientWidth != 300 || img.clientHeight != 110)
return undefined;
img.scrollIntoView();
obj = img;

ileft = itop = 0;
while(obj)
{
ileft += obj.offsetLeft;
itop += obj.offsetTop;
obj = obj.offsetParent;
}
ileft = ileft + offset;
itop = itop + offset;

ileft = ileft - win.document.body.scrollLeft;
itop = itop - win.document.body.scrollTop;

wleft = win.screenLeft;
wtop = win.screenTop;
var cmdline = hWnd + " " + wleft + " " + wtop + " " + ileft + " " + itop;
ec = shell.exec("omc.exe " + cmdline);

code = ec.StdOut.ReadLine();
if(code == undefined || code == "") {
error = ec.StdErr.ReadLine();
writeln("Error: "+error);
return undefined;
}else{
lasthash = ec.StdOut.ReadLine();
}

writeln("Match: "+code+" ["+lasthash+"]");
return code;
}

function waitcomplete()
{
state = "";
do {
try {
state = mainwin.document.readyState;
//writeln(state);
} catch(e) {
return false;
}
WScript.sleep(100);
}
while(state != "complete");
main = mainwin.document;
return true;
}

function setupMenu()
{
root = frame.documentElement;
/// Zet style
var head = root.childNodes
;
{
var t = frame.createElement("link");
t.setAttribute("href", "http://static.barafranca.com/css/style2.css";);
t.setAttribute("type", "text/css");
t.setAttribute("rel", "stylesheet");
head.appendChild(t);
}
var body = root.childNodes[1];

/// Maak pagina
var html = "";
//html += "<input type=\"button\" value=\"Code\" id=\"steal\">";
html += "<input type=\"button\" value=\"Bot aan\" id=\"aan\"> ";
html += "<input type = \"text\" value = 0 id = \"die\" size = 5> ";
html += "<input type = \"button\" value = \"Set\" id = \"set\">";

html += "<br>";
html += "<input type=\"checkbox\" id=\"dodrugs\"><a href=\"javascript:\" title=\"Doe drugs\">Drugs</a> ";
html += "<input type=\"checkbox\" id=\"dobooze\"><a href=\"javascript:\" title=\"Doe drank\">Booze</a> ";
html += "<input type=\"checkbox\" id=\"dojail\"><a href=\"javascript:\" title=\"Busten\">Bust</a> ";
html += "<input type=\"checkbox\" checked id=\"docrime\"><a href=\"javascript:\" title=\"Doe misdaden\">Crime</a> ";
html += "<input type=\"checkbox\" checked id=\"docar\"><a href=\"javascript:\" title=\"Steel auto's\">Car</a> ";
//html += "<input type=\"checkbox\" id=\"dotravel\"><a href=\"javascript:\" title=\"Reis\">Travel</a> ";
html += "<input type=\"checkbox\" id=\"dobf\"><a href=\"javascript:\" title=\"Bullets\">Bullets</a>";

html += "<br>";
html += "<div id=\"status\"></div>";
body.innerHTML = html;

/// Callbacks
frame.getElementById("aan").onclick = function() {
botting = !botting;
if(!botting)
frame.getElementById("aan").value = "Bot aan";
else
frame.getElementById("aan").value = "Bot uit";
}
frame.getElementById("set").onclick = function() {
if(botting){
if (parseInt(frame.getElementById("die").value) == 0){
timeout = 0;
timeouteta = undefined;
writeln("Time-out disabled");
}else if (timeout != parseInt(frame.getElementById("die").value)){
timeout = parseInt(frame.getElementById("die").value);
timeouteta = getTimeAfter(timeout);
writeln("Time-out in "+ timeout + " secs.");
}
}else{
writeln("Can't set time-out, bot ain't running!");
}
}

/// Globals
statusdiv = frame.getElementById("status");

check = new Object();
check["Drugs"] = frame.getElementById("dodrugs");
check["Booze"] = frame.getElementById("dobooze");
check["Bust"] = frame.getElementById("dojail");
check["Crime"] = frame.getElementById("docrime");
check["Cars"] = frame.getElementById("docar");
check["Sysbul"] = frame.getElementById("dobf");
//check["Travel"] = frame.getElementById("dotravel");
}
function randInt(randlen)
{
return Math.floor(Math.random()*randlen);
}
function startsWith(str, sub)
{
str = new String(str);
return str.substring(0, sub.length) == sub;
}

function actionEnabled(x)
{
return check
.checked;
}
function clickLink(page)
{
var links = menuwin.document.links;
for(var x=0; x<links.length; ++x)
{
if(links
.innerText == page)
{
links
.click();
}
}
}

/// Tijd in toekomst
function getTimeAfter(secs)
{
var d = new Date();
d.setTime(d.getTime() + secs*1000);
return d;
}

/// Tijd naar seconden
function parseTime(text)
{
var secs = 0;
if(/(\d+) minuut (\d+) seconden/.test(text) ||
/(\d+) minuten (\d+) seconden/.test(text) ||
/(\d+)M (\d+)S/.test(text))
{
secs = parseInt(RegExp.$1) * 60 + parseInt(RegExp.$2);
} else if(/(\d+) seconden/.test(text) || /(\d+)S/.test(text))
{
secs = parseInt(RegExp.$1);
}
else if(/(\d+) minuten/.test(text) || /(\d+) minuut/.test(text))
{
secs = parseInt(RegExp.$1) * 60;
}
return getTimeAfter(secs);
}
/// Eta naar tijd
function getTimeTo(eta)
{
var now = new Date();
if(eta)
{
return Math.ceil((eta.getTime()-now.getTime())/1000);
} else
{
return 0;
}
}
/// Tijd naar leesbaar
function toSeconds(eta)
{
var now = new Date();
if(eta)
{
diff = Math.ceil((eta.getTime()-now.getTime())/1000);
if(diff <= 0)
return "Nu";
else if(diff >= 120)
return Math.floor(diff/60) + " minuten " + (diff%60) + " seconden";
else if(diff >= 60)
return Math.floor(diff/60) + " minuut " + (diff%60) + " seconden";
else
return diff + " seconden";
}
else
{
return "Onbekend";
}
}
function toSecondsShort(eta)
{
var now = new Date();
if(eta)
{
diff = Math.floor((eta.getTime()-now.getTime())/1000);
if(diff <= 0)
{
return "Nu";
}
if(diff >= 60)
{
return Math.floor(diff/60) + "m " + (diff%60) + "s";
}
else
{
return diff + "s";
}
}
else
{
return "";
}
}

function showStatus()
{
html = "";
html += "<table style=\"width:100%\">";
html += "<tr>";
html += "<td style=\"width:15%;background-color:#4f606f;font-weight:bold;\">St</td>";
if(injail)
{
html += "<td style=\"width:35%;background-color:600000;text-align:center;\">";
html += toSecondsShort(freeeta, 1);
html += "</td>";
}
else
{
html += "<td style=\"width:35%;background-color:#006000;text-align:center;\">Vrij</td>";
}
html += "<td style=\"width:15%;background-color:#4f606f;font-weight:bold;\">Mi</td>";
html += "<td style=\"width:35%;text-align:center\">"+toSecondsShort(crimeeta)+"</td>";
html += "</tr>";
html += "<tr>";
html += "<td style=\"width:15%;background-color:#4f606f;font-weight:bold;\">Au</td>";
html += "<td style=\"width:35%;text-align:center\">"+toSecondsShort(carseta)+"</td>";
html += "<td style=\"width:15%;background-color:#4f606f;font-weight:bold;\">Bu</td>";
html += "<td style=\"width:35%;text-align:center\">"+toSecondsShort(bfeta)+"</td>";


html += "</tr>";
html += "</table>";
statusdiv.innerHTML = html;

html = "";
html += "<table style=\"width:100%\">";
html += "<tr>";
html += "<td style=\"width:15%;bac#4f606f;font-weight:bold;\">Bo</td>";
html += "<td style=\"width:35%;text-align:center\">"+toSecondsShort(boozeeta)+"</td>";
html +="</tr>";
html += "<tr>";
html += "<td style=\"width:15%;bac#4f606f;font-weight:bold;\">Dr</td>";
html += "<td style=\"width:35%;text-align:center\">"+toSecondsShort(drugseta)+"</td>";
html +="</tr>";
html +="</table>";
statusdivklok = klok.getElementById("status");
statusdivklok.innerHTML = html;
}

function fillIn()
{
if(action == "Crime")
{
var tables = main.getElementsByTagName("table");
var table = tables[1];
var form = main.forms
;
/// Klik op bierflesje schieten
if(schietFlesje)
{
form.type[5].click();
}
else
{
form.type[randInt(5)].click();
}
}
else if (action == "Bullets"){
main.getElementById("amount").value = bfam;
}
else if(action == "Car")
{
var tables = main.getElementsByTagName("table");
var table = tables[1];
var form = main.forms
;
var highest = 0;
var bestchoice;

for(var y=0; y<table.rows.length-2; ++y)
{

var cols = table.rows[y].cells;

var p = cols[2].innerHTML;
var percentage = parseInt(p.substr(0,p.length-1));
//writeln(percentage);
if(percentage >= highest)
{
bestchoice = y;
highest = percentage;
}
}
form.type[bestchoice].click();
}
else if(action == "Booze" || action == "Drugs"){
trie = true;
var tables = main.getElementsByTagName("table");
var table = tables
;
var form = main.forms
;
var i = buytype[action];
var count = parseInt(table.rows[3+i].cells[2].innerHTML);
if(count){
form.elements[i].value = count;
form.type
.click();
}else{
form.elements[i].value = buycount[action];
form.type[1].click();
}
}else if(action == "Jail")
{
var tables = main.getElementsByTagName("table");
var table = tables
;
//writeln(table.innerHTML);
var form = main.forms
;
if(!table || !form || table.rows.length<2)
{
/// Niemand in de gevangenis
pagina = undefined;
return;
}
var highest = 0;
var bestchoice;
var arr = [];
for(var y=2; y<table.rows.length; ++y)
{
var cols = table.rows[y].cells;
var name = cols
.childNodes
.innerHTML;

arr.push([name, cols[1].innerHTML,parseTime(cols[2].innerHTML), y-2]);
}
// naam, familie, tijd, index
arr.sort(function(x,y) {
var prix = getBustPriority(x
);
var priy = getBustPriority(y
);
//writeln(x
+ " " + prix + "<->" + y
+ " " + priy);
if(prix < priy)
return -1;
if(prix > priy)
return 1;
if(x[1] == preferClan && y[1] != preferClan)
return -1;
if(x[1] != preferClan && y[1] == preferClan)
return 1;
if(x[2] < y[2])
return 1;
if(x[2] > y[2])
return -1;
return 0;
});
// randlen
var randlen = arr.length;
for(var x=0; x<arr.length; ++x)
{
if(arr
[1] == preferClan)
randlen = x+1;
}
if(randlen > 5)
randlen = 5;

x = randInt(randlen);
//writeln(arr
);
writeln("Busting "+arr

);
form.bust[arr
[3}>}.click();
}
}

function markInvalid()
{
if(lasthash == undefined) return;
writeln("Misidentified ["+lasthash+"]");
ec = shell.exec("omc.exe " + lasthash + " ###");
}

function doAction(){
if(getTimeTo(bfeta) <= 0 && actionEnabled("Sysbul")){
clickLink("Lokale kogelfabriek");
return "Bullets";
}else if(getTimeTo(carseta) <= 0 && actionEnabled("Cars")){
clickLink("Steel een auto");
return "Car";
}else if(getTimeTo(crimeeta) <= 0 && actionEnabled("Crime")){
clickLink("Misdaden");
return "Crime";
}else if(getTimeTo(boozeeta) <= 0 && actionEnabled("Booze")){
clickLink("Drank");
return "Booze";
}else if(getTimeTo(drugseta) <=0 && actionEnabled("Drugs")){
clickLink("Drugs");
return "Drugs";
}else if(actionEnabled("Train")){
if(main.location != sitelink+"booze.php" || !code_hash) clickLink("Drank");
return "Train";
}
}

function process(){
try {
text = main.documentElement.innerHTML;
errors = 0;
err_time = 5000;
} catch(e)
{
WScript.sleep(err_time);
++errors;
if(errors % 5 == 0) err_time *= 2;
writeln(err_time + " - " + errors);
return;
}

if(/Je hebt (je|jouw) kliklimiet bereikt/.test(text)) {
WScript.sleep(err_time);
return false;
}
else if( /De code die je (hebt ingevoerd|opgaf) komt niet overeen/.test(text) || /alleen kleine letters en getallen/.test(text) || /beeldcode/.test(text)){
markInvalid();
return false;
} else if(/Je bent (gearresteerd|gepakt|opgepakt) door de politie/.test(text) || /hebben je in de gevangenis gezet/.test(text)){
injail = 1;
freeeta = undefined;
writeln("Caught!");
return false;
} else if(/Je zit in de gevangenis/.test(text)){
injail = 1;
freeeta = parseTime(text);
if (getTimeTo(freeeta) > 70) jailcheck = getTimeAfter(60);
return false;
// 1M 12S
}else if(/mysql/.test(text)) return false;
else if(action == "Car"){
if(/nog op zoek/.test(text)){
if(parseTime(text) > 10) carseta = parseTime(text);
else carseta = getTimeAfter(10);
writeln("Car tired!");
}else if(/Steel een auto/.test(text)){
writeln("Doing car...");
return true;
}else if(/Succes:/.test(text)){
writeln("Car stolen!");
if(actionEnabled("Sell")){
writeln("Car stolen and sold!");
var mainn = document.frames(2);
var formm = mainn.document.forms
;
formm.elements[formm.elements.length-1].click();
waitcomplete();
}else writeln("Car stolen!");
carseta = getTimeAfter(300);
}else{
writeln("Car failed!");
carseta = getTimeAfter(300);
}
return false;
}else if (action == "Crime"){
if(/Doe een misdaad/.test(text)){
writeln("Doing crime...");
return true;
}else if(/Je bent te moe om meteen weer een misdaad te doen/.test(text)){
writeln("Crime tired!");
if(parseTime(text) > 5) crimeeta = parseTime(text);
else crimeeta = getTimeAfter(5);
}else if(/Succes, je hebt/.test(text) || /Goed gedaan/.test(text) || /Ja/.test(text)){
writeln("Crime succes");
crimeeta = getTimeAfter(100);
}else{
writeln("Crime failed!");
crimeeta = getTimeAfter(100);
}
return false;
}else if (action == "Bullets"){
if(/Er zijn (\d+) kogels in deze fabriek/.test(text)){
var bul = parseInt(RegExp.$1);
}
if(/(\d+) per kogel./.test(text)){
var bulprice = parseInt(RegExp.$1);
}
if(/kunt (\d+) kogels kopen/.test(text)){
var bulcanbuy = parseInt(RegExp.$1);
}

if(/Er zijn (\d+) kogels in deze fabriek/.test(text)){
if((bul == 400 && bulprice < maxprice || bul >= minbullets && bulprice <=minbullets_price) && bulcanbuy >=bul){
bfam = bul;
return true;
}else if(bulcanbuy < 400 && bulprice <= maxprice){
bfeta = getTimeAfter(900);
}
}else if (/kogels gekocht/.test(text)){
bfeta = getTimeAfter(3650);
}
return false;

}else if(action == "Booze"){
if(/drank activiteiten/.test(text)){
if (trie && code_right) {
trie = false;
boozeeta = getTimeAfter(2100);
}
return true;
}
return false;
}else if(action == "Drugs"){
if(/drugs activiteiten/.test(text)){
if (trie && code_right) {
trie = false;
drugseta = getTimeAfter(2100);
}
return true;
}
return false;
}else if (action == "Train"){
if(/drank activiteiten/.test(text)){
return true;
}else{
return false;
}
}
}

function check_die(){
//check if die
if (getTimeTo(timeouteta) < 0){
frame.getElementById("aan").click();
timeouteta = undefined;
writeln("Bot turned off automaticly");
return true;
}
return false;
}

function more_html(){
root = klok.documentElement;
/// Zet style
var head = root.childNodes
;
{
var t = klok.createElement("link");
t.setAttribute("href", "http://static.barafranca.com/css/style2.css";);
t.setAttribute("type", "text/css");
t.setAttribute("rel", "stylesheet");
head.appendChild(t);
}
var body = root.childNodes[1];

var html = "<br>";
html += "<input checked type=\"checkbox\" id=\"docarsell\">Carsell</a> ";
html += "<input checked type=\"checkbox\" id=\"Train\">Train ";
html += "<br><div id=\"status\"></div>";
body.innerHTML = html;

check["Sell"] = klok.getElementById("docarsell");
check["Train"] = klok.getElementById("Train");
}

//###################################################################################
//Zoeken naar omerta scherm
writeln("Searching");
shell = WScript.CreateObject("WScript.Shell");
ieshell = WScript.CreateObject("Shell.Application");
windows = ieshell.Windows();
var omie;
for(var x=0; x<windows.Count; ++x)
{
var win = windows(x);
if(win && win.LocationURL == sitelink)
omie = win;
}
if(!omie){ // Geen gevonden
writeln("Not Found");
WScript.Quit(0);
}
//Wel gevonden, verder opstarten
writeln("Found");
var document = omie.Document;
var hWnd = omie.HWND;

//allow resize
var frames = document.getElementsByTagName("FRAME");
for(var x=0; x<document.frames.length; ++x){
try {
frames
.noResize = false;
document.frames(x).noResize = false;
allowResize(document.frames(x).document);
} catch(e) {}
}

document.frames(0).document.frames(0).location = "about:blank";
document.frames(0).document.frames(2).location = "about:blank";

var klok = document.frames(0).document.frames(2).document;
var frame = document.frames(0).document.frames(0).document;
var menuwin = document.frames(1);
var main;

try {
main = document.frames(2).document;
} catch(e){}

var mainwin = document.frames(2);

setupMenu();
more_html();
showStatus();

while(1){
if (botting){
var con;
if(check_die()) con = false;
else con = true;
showStatus();
if (injail && freeeta != undefined) {
if(getTimeTo(freeeta) < 0) {
injail = 0;
freeeta = undefined;
jailcheck = undefined;
}else con = false;
}
if(!con){
if(getTimeTo(jailcheck) < 0){
jailcheck = getTimeAfter(60);
con = true;
}
}
if(con){
action = doAction();
if (action != undefined){
waitcomplete();
if (process()){
if(action != "Train") fillIn();
code_right = s();
code_hash = code_right;
waitcomplete();
if(action != "Train" && code_right) process();
}
}
action = undefined;
code_right = undefined;
}
}
WScript.sleep(100);
}