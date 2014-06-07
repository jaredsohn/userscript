// ==UserScript==
// @name           Freie Bauernhofplätze
// @namespace      sdgsdgserg
// @include        http://de*.die-staemme.de*game.php*screen=report*view=*
// ==/UserScript==


var diff;
if(document.getElementById("attack_spy"))
{
var belegte = 0;


var hauptgebäudestufen = new Array("","5","6","7","8","9","11","13","15","18","21","24","28","33","38","45","53","62","72","84","99","116","135","158","185","216","253","296","347","406","475");
var kasernestufen = new Array("","7","8","10","11","13","15","18","21","25","29","34","39","46","54","63","74","86","101","118","138","162","189","221","259","303");
var stallstufen = new Array("","8","9","11","13","15","18","21","24","28","33","38","45","53","62","72","84","99","115","135","158");
var werkstattstufen = new Array("","8","9","11","13","15","18","21","24","28","33","38","45","53","62","72");
var kirchestufen = new Array("","5000","7750","12013");
var erstekirchestufen = new Array("","5");
var adelshofstufen = new Array("","80")
var schmiedestufen = new Array("","20","23","27","32","37","44","51","60","70","82","96","112","132","154","180","211","247","289","338","395");
var versammlungsplatzstufen = new Array("","0");
var statuestufen = new Array("","10");
var marktplatzstufen = new Array("","20","23","27","32","37","44","51","60","70","82","96","112","132","154","180","211","247","289","338","395","462","541","633","740","866");
var holzfällerstufen = new Array("","5","6","7","8","9","10","12","14","16","18","21","24","28","33","38","43","50","58","67","77","89","103","119","138","159","183","212","245","283","326");
var lehmgrubestufen = new Array("","10","11","13","15","17","19","22","25","29","33","37","42","48","55","63","71","81","93","106","121","137","157","179","204","232","265","302","344","392","447");
var eisenminestufen = new Array("","10","12","14","16","19","22","26","30","35","41","48","56","66","77","90","105","123","144","169","197","231","270","316","370","433","507","593","693","811","949");
var bauernhofstufen = new Array("","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0");
var speicherstufen = new Array("","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0");
var versteckstufen = new Array("","2","2","3","3","4","4","5","6","7","8");
var wallstufen = new Array("","5","6","7","8","9","11","13","15","18","21","24","28","33","38","45","53","62","72","84","99");
var bh = new Array("","240","281","329","386","452","530","622","729","854","1002","1174","1376","1613","1891","2216","2598","3045","3569","4183","4904","5748","6737","7896","9255","10848","12715","14904","17469","20476","24000");





var hauptgebäude = /hauptgebäude <b>\(Stufe (\d+)\)/i;
if(document.getElementById("attack_spy").innerHTML.search(hauptgebäude) != -1)
{
hauptgebäude = hauptgebäude.exec(document.getElementById("attack_spy").innerHTML)[1];
belegte += parseInt(hauptgebäudestufen[hauptgebäude]);
}

var kaserne = /kaserne <b>\(Stufe (\d+)\)/i;
if(document.getElementById("attack_spy").innerHTML.search(kaserne) != -1)
{
kaserne = kaserne.exec(document.getElementById("attack_spy").innerHTML)[1];
belegte += parseInt(kasernestufen[kaserne]);
}

var stall = /stall <b>\(Stufe (\d+)\)/i;
if(document.getElementById("attack_spy").innerHTML.search(stall) != -1)
{
stall = stall.exec(document.getElementById("attack_spy").innerHTML)[1];
belegte += parseInt(stallstufen[stall]);
}

var werkstatt = /werkstatt <b>\(Stufe (\d+)\)/i;
if(document.getElementById("attack_spy").innerHTML.search(werkstatt) != -1)
{
werkstatt = werkstatt.exec(document.getElementById("attack_spy").innerHTML)[1];
belegte += parseInt(werkstattstufen[werkstatt]);
}

var kirche = /kirche <b>\(Stufe (\d+)\)/i;
if(document.getElementById("attack_spy").innerHTML.search(kirche) != -1)
{
kirche = kirche.exec(document.getElementById("attack_spy").innerHTML)[1];
belegte += parseInt(kirchestufen[kirche]);
}

var erstekirche = /erste kirche <b>\(Stufe (\d+)\)/i;
if(document.getElementById("attack_spy").innerHTML.search(erstekirche) != -1)
{
erstekirche = erstekirche.exec(document.getElementById("attack_spy").innerHTML)[1];
belegte += parseInt(erstekirchestufen[erstekirche]);
}

var adelshof = /adelshof <b>\(Stufe (\d+)\)/i;
if(document.getElementById("attack_spy").innerHTML.search(adelshof) != -1)
{
adelshof = adelshof.exec(document.getElementById("attack_spy").innerHTML)[1];
belegte += parseInt(adelshofstufen[adelshof]);
}

var schmiede = /schmiede <b>\(Stufe (\d+)\)/i;
if(document.getElementById("attack_spy").innerHTML.search(schmiede) != -1)
{
schmiede = schmiede.exec(document.getElementById("attack_spy").innerHTML)[1];
belegte += parseInt(schmiedestufen[schmiede]);
}

var versammlungsplatz = /versammlungsplatz <b>\(Stufe (\d+)\)/i;
if(document.getElementById("attack_spy").innerHTML.search(versammlungsplatz) != -1)
{
versammlungsplatz = versammlungsplatz.exec(document.getElementById("attack_spy").innerHTML)[1];
belegte += parseInt(versammlungsplatzstufen[versammlungsplatz]);
}

var statue = /statue <b>\(Stufe (\d+)\)/i;
if(document.getElementById("attack_spy").innerHTML.search(statue) != -1)
{
statue = statue.exec(document.getElementById("attack_spy").innerHTML)[1];
belegte += parseInt(statuestufen[statue]);
}

var marktplatz = /marktplatz <b>\(Stufe (\d+)\)/i;
if(document.getElementById("attack_spy").innerHTML.search(marktplatz) != -1)
{
marktplatz = marktplatz.exec(document.getElementById("attack_spy").innerHTML)[1];
belegte += parseInt(marktplatzstufen[marktplatz]);
}


var holzfäller = /holzfäller <b>\(Stufe (\d+)\)/i;
if(document.getElementById("attack_spy").innerHTML.search(holzfäller) != -1)
{
holzfäller = holzfäller.exec(document.getElementById("attack_spy").innerHTML)[1];
belegte += parseInt(holzfällerstufen[holzfäller]);
}


var lehmgrube = /lehmgrube <b>\(Stufe (\d+)\)/i;
if(document.getElementById("attack_spy").innerHTML.search(lehmgrube) != -1)
{
lehmgrube = lehmgrube.exec(document.getElementById("attack_spy").innerHTML)[1];
belegte += parseInt(lehmgrubestufen[lehmgrube]);
}


var eisenmine = /eisenmine <b>\(Stufe (\d+)\)/i;
if(document.getElementById("attack_spy").innerHTML.search(eisenmine) != -1)
{
eisenmine = eisenmine.exec(document.getElementById("attack_spy").innerHTML)[1];
belegte += parseInt(eisenminestufen[eisenmine]);
}


var bauernhof = /bauernhof <b>\(Stufe (\d+)\)/i;
if(document.getElementById("attack_spy").innerHTML.search(bauernhof) != -1)
{
bauernhof = bauernhof.exec(document.getElementById("attack_spy").innerHTML)[1];
belegte += parseInt(bauernhofstufen[bauernhof]);
}


var speicher = /speicher <b>\(Stufe (\d+)\)/i;
if(document.getElementById("attack_spy").innerHTML.search(speicher) != -1)
{
speicher = speicher.exec(document.getElementById("attack_spy").innerHTML)[1];
belegte += parseInt(speicherstufen[speicher]);
}


var versteck = /versteck <b>\(Stufe (\d+)\)/i;
if(document.getElementById("attack_spy").innerHTML.search(versteck) != -1)
{
versteck = versteck.exec(document.getElementById("attack_spy").innerHTML)[1];
belegte += parseInt(versteckstufen[versteck]);
}


var wall = /wall <b>\(Stufe (\d+)\)/i;
if(document.getElementById("attack_spy").innerHTML.search(wall) != -1)
{
wall = wall.exec(document.getElementById("attack_spy").innerHTML)[1];
belegte += parseInt(wallstufen[wall]);
}


diff = parseInt(bh[bauernhof])-belegte;
var bhp = document.createElement("tr");
var bhp2 = document.createElement("td");
var bhp3 = document.createElement("p");
bhp3.innerHTML = "<center><b>Noch freie Bauernhofplätze: <u>"+diff+"</u></b></center>";
bhp2.setAttribute("colspan","4");
bhp2.appendChild(bhp3);
bhp.appendChild(bhp2);
document.getElementsByTagName("table")[28].appendChild(bhp);
}
else
{
diff = "Gebäude konnten nicht eingelesen werden";
var bhp = document.createElement("tr");
var bhp2 = document.createElement("td");
var bhp3 = document.createElement("p");
bhp3.innerHTML = "<center><b>"+diff+"</b></center>";
bhp2.setAttribute("colspan","4");
bhp2.appendChild(bhp3);
bhp.appendChild(bhp2);
document.getElementsByTagName("table")[27].appendChild(bhp);
}