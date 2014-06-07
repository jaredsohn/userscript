// ==UserScript==
// @name           TrophyBuddy v1.1
// @include        http://trophymanager.com/showprofile.php*
// @include        http://trophymanager.com/*
// @exclude        http://trophymanager.com/userguide.php*
// @exclude        http://trophymanager.com/livematch.php*manual_show.php
// @exclude        http://trophymanager.com/manual_show.php*
// @exclude        http://trophymanager.com/live*
// @exclude        http://trophymanager.com/transform.php
// ==/UserScript==


// @version        1.1

// ==/UserScript==

var myurl=document.URL;
//alert ("Skript ist aktiv")
if (myurl.match(/showprofile.*/))  { // hier wird geprueft, ob das die richtige Seite ist

		aux = document.getElementsByTagName("table")[0]; // holt die gesamte Tabelle

// fuer jeden Skill muss so geprueft werden, ob ein img-Tag oder ein span-Tag innerhalb der tabellenzelle vorliegt

//Stärke
stae_td = aux.getElementsByTagName("tr")[1].getElementsByTagName("td")[0];

if(stae_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var stae = stae_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + stae)
}
else if(stae_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var stae = stae_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + stae)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var stae = aux.rows[1].cells[0].innerHTML;
//alert ("normal " + stae)
}

//Kondition
kon_td = aux.getElementsByTagName("tr")[1].getElementsByTagName("td")[1];

if(kon_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var kon = kon_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + kon)
}
else if(kon_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var kon = kon_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + kon)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var kon = aux.rows[1].cells[1].innerHTML;
//alert ("normal " + kon)
}

// Geschwindigkeit
ges_td = aux.getElementsByTagName("tr")[1].getElementsByTagName("td")[2];

if(ges_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var ges = ges_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + ges)
}
else if(ges_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var ges = ges_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + ges)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var ges = aux.rows[1].cells[2].innerHTML;
//alert ("normal " + ges)
}

//Manndeckung
man_td = aux.getElementsByTagName("tr")[1].getElementsByTagName("td")[3];

if(man_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var man = man_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + man)
}
else if(man_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var man = man_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + man)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var man = aux.rows[1].cells[3].innerHTML;
//alert ("normal " + man)
}

//Zweikampf
zwe_td = aux.getElementsByTagName("tr")[1].getElementsByTagName("td")[4];

if(zwe_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var zwe = zwe_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + zwe)
}
else if(zwe_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var zwe = zwe_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + zwe)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var zwe = aux.rows[1].cells[4].innerHTML;
//alert ("normal " + zwe)
}

//Laufbereitschaft
lau_td = aux.getElementsByTagName("tr")[1].getElementsByTagName("td")[5];

if(lau_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var lau = lau_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + lau)
}
else if(lau_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var lau = lau_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + lau)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var lau = aux.rows[1].cells[5].innerHTML;
//alert ("normal " + lau)
}

//Stellungsspiel
ste_td = aux.getElementsByTagName("tr")[1].getElementsByTagName("td")[6];

if(ste_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var ste = ste_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + ste)
}
else if(ste_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var ste = ste_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + ste)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var ste = aux.rows[1].cells[6].innerHTML;
//alert ("normal " + ste)
}

//Passspiel
pass_td = aux.getElementsByTagName("tr")[3].getElementsByTagName("td")[0];

if(pass_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var pass = pass_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + pass)
}
else if(pass_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var pass = pass_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + pass)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var pass = aux.rows[3].cells[0].innerHTML;
//alert ("normal " + pass)
}

//Flanken
fla_td = aux.getElementsByTagName("tr")[3].getElementsByTagName("td")[1];

if(fla_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var fla = fla_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + fla)
}
else if(fla_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var fla = fla_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + fla)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var fla = aux.rows[3].cells[1].innerHTML;
//alert ("normal " + fla)
}

//Technik
tec_td = aux.getElementsByTagName("tr")[3].getElementsByTagName("td")[2];

if(tec_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var tec = tec_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + tec)
}
else if(tec_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var tec = tec_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + tec)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var tec = aux.rows[3].cells[2].innerHTML;
//alert ("normal " + tec)
}

//Kopfball
kop_td = aux.getElementsByTagName("tr")[3].getElementsByTagName("td")[3];

if(kop_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var kop = kop_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + kop)
}
else if(kop_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var kop = kop_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + kop)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var kop = aux.rows[3].cells[3].innerHTML;
//alert ("normal " + kop)
}

//Torschuss
tor_td = aux.getElementsByTagName("tr")[3].getElementsByTagName("td")[4];

if(tor_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var tor = tor_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + tor)
}
else if(tor_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var tor = tor_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + tor)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var tor = aux.rows[3].cells[4].innerHTML;
//alert ("normal " + tor)
}

//Weitschuss
wei_td = aux.getElementsByTagName("tr")[3].getElementsByTagName("td")[5];

if(wei_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var wei = wei_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + wei)
}
else if(wei_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var wei = wei_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + wei)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var wei = aux.rows[3].cells[5].innerHTML;
//alert ("normal " + wei)
}

//Standards
sta_td = aux.getElementsByTagName("tr")[3].getElementsByTagName("td")[6];

if(sta_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var sta = sta_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + sta)
}
else if(sta_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var sta = sta_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + sta)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var sta = aux.rows[3].cells[6].innerHTML;
//alert ("normal " + sta)
}

//Lieblingsposition auslesen
		var pos = aux.rows[5].cells[0].innerHTML;
		
//Erfahrung auslesen		
		var rou = aux.rows[5].cells[1].innerHTML;
		
//		alert ("pos: " + pos)
		stae=parseInt(stae);
		kon=parseInt(kon);
		ges=parseInt(ges);
		man=parseInt(man);
		zwe=parseInt(zwe);
		lau=parseInt(lau);
		ste=parseInt(ste);
		pass=parseInt(pass);
		fla=parseInt(fla);
		tec=parseInt(tec);
		kop=parseInt(kop);
		tor=parseInt(tor);
		wei=parseInt(wei);
		sta=parseInt(sta);
		
	// Skillsummen berechnen je nachdem wie deinen Positionen hei�en. zb att und def
		
		
	switch (pos) {

		case "GK":
//		alert ("case gk")		
			var skillsumme = (((10.83333*man) + (9.999982*lau) + 5.833338*(stae+ges+zwe+ste+kop)+0.00*(kon+tor+wei+sta))/10)*(1+0.00405*rou);
		break;

		case "D C":
//		alert ("case dc")		
			var skillsumme = ((6.98324*(man + zwe + stae + kop + ges) + 4.067738*(pass + fla + tec) + 0.5761173*(kon + lau + ste + tor + wei + sta))/10)*(1+0.00405*rou);
		break;

		case "D L":
//		alert ("case dl")
			var skillsumme = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+0.00405*rou);
		break;

		case "D R":
//		alert ("case dr")		
			var skillsumme = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+0.00405*rou);
		break;

		case "D LR":
//		alert ("case dlr")
			var skillsumme = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+0.00405*rou);
		break;

		case "D CR":
			var skillsumme1 = ((6.98324*(man + zwe + stae + kop + ges) + 4.067738*(pass + fla + tec) + 0.5761173*(kon + lau + ste + tor + wei + sta))/10)*(1+0.00405*rou);
			var skillsumme2 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+0.00405*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "D LC":
			var skillsumme1 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+0.00405*rou);
			var skillsumme2 = ((6.98324*(man + zwe + stae + kop + ges) + 4.067738*(pass + fla + tec) + 0.5761173*(kon + lau + ste + tor + wei + sta))/10)*(1+0.00405*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;		

		case "D/DM C":
			var skillsumme1 = ((6.98324*(man + zwe + stae + kop + ges) + 4.067738*(pass + fla + tec) + 0.5761173*(kon + lau + ste + tor + wei + sta))/10)*(1+0.00405*rou);
			var skillsumme2 = ((5.263158*(ste + lau + pass + man + zwe + stae + kop) + 3.070175*(kon + ges + fla + tec) + 0.4385965*(tor + wei + sta))/10)*(1+0.00405*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "D/DM R":
			var skillsumme1 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+0.00405*rou);
			var skillsumme2 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+0.00405*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "D/DM L":
			var skillsumme1 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+0.00405*rou);
			var skillsumme2 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+0.00405*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "DM C":
//		alert ("case dmc")		
			var skillsumme = ((5.263158*(ste + lau + pass + man + zwe + stae + kop) + 3.070175*(kon + ges + fla + tec) + 0.4385965*(tor + wei + sta))/10)*(1+0.00405*rou);
		break;

		case "DM L":
//		alert ("case dml")		
			var skillsumme = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+0.00405*rou);
		break;

		case "DM R":
//		alert ("case dmr")		
			var skillsumme = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+0.00405*rou);
		break;

		case "DM LR":
//		alert ("case dmlr")		
			var skillsumme = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+0.00405*rou);
		break;

		case "DM CR":
			var skillsumme1 = ((5.263158*(ste + lau + pass + man + zwe + stae + kop) + 3.070175*(kon + ges + fla + tec) + 0.4385965*(tor + wei + sta))/10)*(1+0.00405*rou);
			var skillsumme2 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+0.00405*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "DM LC":
			var skillsumme1 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+0.00405*rou);
			var skillsumme2 = ((5.263158*(ste + lau + pass + man + zwe + stae + kop) + 3.070175*(kon + ges + fla + tec) + 0.4385965*(tor + wei + sta))/10)*(1+0.00405*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "DM/M C":
			var skillsumme1 = ((5.263158*(ste + lau + pass + man + zwe + stae + kop) + 3.070175*(kon + ges + fla + tec) + 0.4385965*(tor + wei + sta))/10)*(1+0.00405*rou);
			var skillsumme2 = ((6.182408*(ste + lau + man + zwe + pass + tec) + 3.604903*(kon + kop + stae) + 0.5227109*(ges + fla + tor + wei + sta))/10)*(1+0.00405*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "DM/M R":
			var skillsumme1 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+0.00405*rou);
			var skillsumme2 = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+0.00405*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "DM/M L":
			var skillsumme1 = ((7.890697*(ges + man + zwe) + 4.605465*(stae + kop + tec + fla + pass) + 0.6601167*(kon + lau + ste + tor + wei + sta))/10)*(1+0.00405*rou);
			var skillsumme2 = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+0.00405*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "M C":
//		alert ("case mc")		
			var skillsumme = ((6.182408*(ste + lau + man + zwe + pass + tec) + 3.604903*(kon + kop + stae) + 0.5227109*(ges + fla + tor + wei + sta))/10)*(1+0.00405*rou);
		break;

		case "M L":
//		alert ("case ml")		
			var skillsumme = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+0.00405*rou);
		break;

		case "M R":
//		alert ("case mr")		
			var skillsumme = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+0.00405*rou);
		break;

		case "M LR":
//		alert ("case mlr")		
			var skillsumme = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+0.00405*rou);
		break;
		
		case "M CR":
			var skillsumme1 = ((6.182408*(ste + lau + man + zwe + pass + tec) + 3.604903*(kon + kop + stae) + 0.5227109*(ges + fla + tor + wei + sta))/10)*(1+0.00405*rou);
			var skillsumme2 = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+0.00405*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "M LC":
			var skillsumme1 = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+0.00405*rou);
			var skillsumme2 = ((6.182408*(ste + lau + man + zwe + pass + tec) + 3.604903*(kon + kop + stae) + 0.5227109*(ges + fla + tor + wei + sta))/10)*(1+0.00405*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;			

		case "M/OM C":
			var skillsumme1 = ((6.182408*(ste + lau + man + zwe + pass + tec) + 3.604903*(kon + kop + stae) + 0.5227109*(ges + fla + tor + wei + sta))/10)*(1+0.00405*rou);
			var skillsumme2 = ((5.824724*(lau + ste + pass + tec + tor + wei) + 3.402209*(kop + stae + man + zwe) + 0.4809405*(fla + kon + ges + sta))/10)*(1+0.00405*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "M/OM R":
			var skillsumme1 = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+0.00405*rou);
			var skillsumme2 = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+0.00405*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "M/OM L":
			var skillsumme1 = ((5.041541*(ste + lau + man + zwe + pass + tec + fla + ges) + 2.945619*(kon + kop + stae) + 0.4154079*(tor + wei + sta))/10)*(1+0.00405*rou);
			var skillsumme2 = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+0.00405*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "OM C":
//		alert ("case omc")
			var skillsumme = ((5.824724*(lau + ste + pass + tec + tor + wei) + 3.402209*(kop + stae + man + zwe) + 0.4809405*(fla + kon + ges + sta))/10)*(1+0.00405*rou);
		break;

		case "OM L":
//		alert ("case oml")
			var skillsumme = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+0.00405*rou);
		break;

		case "OM R":
//		alert ("case omr")
			var skillsumme = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+0.00405*rou);
		break;

		case "OM LR":
//		alert ("case omlr")
			var skillsumme = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+0.00405*rou);
		break;

		case "OM CR":
			var skillsumme1 = ((5.824724*(lau + ste + pass + tec + tor + wei) + 3.402209*(kop + stae + man + zwe) + 0.4809405*(fla + kon + ges + sta))/10)*(1+0.00405*rou);
			var skillsumme2 = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+0.00405*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "OM LC":
			var skillsumme1 = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+0.00405*rou);
			var skillsumme2 = ((5.824724*(lau + ste + pass + tec + tor + wei) + 3.402209*(kop + stae + man + zwe) + 0.4809405*(fla + kon + ges + sta))/10)*(1+0.00405*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "OM C, F":
			var skillsumme1 = ((5.824724*(lau + ste + pass + tec + tor + wei) + 3.402209*(kop + stae + man + zwe) + 0.4809405*(fla + kon + ges + sta))/10)*(1+0.00405*rou);
			var skillsumme2 = ((6.903289*(stae + kop + tor + wei) + 4.021492*(kon + ges + lau + ste + tec) + 0.5698469*(man + zwe + fla + pass + sta))/10)*(1+0.00405*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "OM R, F":
			var skillsumme1 = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+0.00405*rou);
			var skillsumme2 = ((6.903289*(stae + kop + tor + wei) + 4.021492*(kon + ges + lau + ste + tec) + 0.5698469*(man + zwe + fla + pass + sta))/10)*(1+0.00405*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "OM L, F":
			var skillsumme1 = ((6.807867*(ges + tec + fla) + 3.97882*(lau + ste + tor + wei + kop + stae + kon) + 0.5748866*(man + zwe + pass + sta))/10)*(1+0.00405*rou);
			var skillsumme2 = ((6.903289*(stae + kop + tor + wei) + 4.021492*(kon + ges + lau + ste + tec) + 0.5698469*(man + zwe + fla + pass + sta))/10)*(1+0.00405*rou);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "F":
//		alert ("case f")
			var skillsumme = ((6.903289*(stae + kop + tor + wei) + 4.021492*(kon + ges + lau + ste + tec) + 0.5698469*(man + zwe + fla + pass + sta))/10)*(1+0.00405*rou);
		break;

	default:
		var skillsumme = "Unknown Position";

}

		if(typeof skillsumme_str == 'undefined')
		{
			skillsumme=parseFloat(skillsumme.toFixed(2));
		}
		else{
			skillsumme=skillsumme_str;
		}
	
	//Einfuegen eines span-elements hinter FP
	var skillsumspan_HL = document.createElement("span");
	skillsumspan_HL.innerHTML="<div>تريكسيما</div>";
	document.getElementsByTagName("table")[0].getElementsByTagName('tr')[4].getElementsByTagName('th')[0].appendChild(skillsumspan_HL);

	//Einfuegen eines span-elements hinter F
	var skillsumspan_value = document.createElement("span");
	skillsumspan_value.innerHTML="<div><b>" + skillsumme + "</b></div>";
	document.getElementsByTagName("table")[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].appendChild(skillsumspan_value); 

//	alert ("Summe: " + skillsumme)
} // if showprofile

if (myurl.match(/.*/))
{
/*	
function hide (member) {
        if (document.getElementById) {
            if (document.getElementById(member).style.display = "inline") {
                document.getElementById(member).style.display = "none";
            } else {
                document.getElementById(member).style.display = "inline";
            }
        }
}
*/

//Menü oben links
var div1 = document.createElement('div');
appdiv1 = document.body.appendChild(div1);
appdiv1.innerHTML = '<div id="menu" style="position: fixed; top: 10px; left: 25px; height: 30px; width: 150px; -moz-opacity: .8; text-align: left; border: 2px #333333 outset; background: url(http://www.patrick-meurer.de/tm/TrophyBuddy_menu2.png);">&nbsp;<span style="position:relative; top:5px;left:0px"><a href="http://trophymanager.com/klubhus.php"><img src="http://patrick-meurer.de/tm/trophybuddy/home.png" title="Home" style="height: 20px;"></a></span>&nbsp;&nbsp;<span style="position:relative; top:5px;left:0px"><a href="http://trophymanager.com/mail.php"><img src="http://patrick-meurer.de/tm/trophybuddy/mail.png" title="Check your mails" style="height: 20px;"></a></span>&nbsp;&nbsp;&nbsp;<span style="position:relative; top:5px;left:0px"><a href="http://trophymanager.com/league.php"><img src="http://patrick-meurer.de/tm/trophybuddy/league.png" title="League" style="height: 20px;"></a></span>&nbsp;&nbsp;&nbsp;&nbsp;<span style="position:relative; top:5px;left:0px"><a href="http://trophymanager.com/cup.php"><img src="http://patrick-meurer.de/tm/trophybuddy/trophy.png" title="Cup" style="height: 20px;"></a></span>&nbsp;&nbsp;&nbsp;&nbsp;<span style="position:relative; top:5px;left:0px"><a href="http://trophymanager.com/index.php?logaf=true"><img src="http://patrick-meurer.de/tm/trophybuddy/logout.png" title="Exit TrophyManager" style="height: 20px;"></a></span></div>';

//Navigationsbereich
var div = document.createElement('div');
appdiv = document.body.appendChild(div);
appdiv.innerHTML = '<div id="tbuddy" style="position: fixed; top: 150px; left: 25px; height: 410px; width: 150px; -moz-opacity: .8; text-align: left; border: 2px #333333 outset; display:inline;"><img src="http://img227.imageshack.us/img227/8818/trophybuddy11.png"><p style="text-decoration: underline;">الفريق</p><ul><li><a href="http://trophymanager.com/squad.php" target="_self" style="font-size: 10px;" title="Go to Squad">اللاعبين</a></li><li><a href="http://trophymanager.com/tactics.php" target="_self" style="font-size: 10px;" title="Go to Tactics">الخطة</a></li></ul><p style="text-decoration: underline;">الموظفين</p><ul><li><a href="http://trophymanager.com/staff.php" target="_self" style="font-size: 10px;" title="Search for new staff members"> التعاقد مع الموظفين</a></li><li><a href="http://trophymanager.com/staff_reports.php" target="_self" style="font-size: 10px;" title="See what you´ve scouted"> تقارير الكشافة </a></li><li><a href="http://trophymanager.com/staff_trainers.php" target="_self" style="font-size: 10px;" titles="Take a look at your trainers & scouts">طرد الموظفين</a></li></ul><p style="text-decoration: underline;">التدريب</p><ul><li><a href="http://trophymanager.com/player_notes.php?" target="_self" style="font-size: 10px;" title="See your player notes">ملاحظة اللاعبين </a></li><li><a href="http://trophymanager.com/training.php" target="_self" style="font-size: 10px;" title="Check the training results">ملخص التدريب </a><img src= "http://static.trophymanager.com/pics/pro_req_mini2.gif"></li><li><a href="http://trophymanager.com/trainers.php" target="_self" style="font-size: 10px;" title="Change your training teams">أنظمة التدريب</a></li></ul><p style="text-decoration: underline;">روابـط جـانبـية</p><ul><li><a href="http://trophymanager.com/forum.php" target="_self" style="font-size: 10px;" title="Browse Forum">المنتدى</a> : <a href="http://trophymanager.com/forum.php?cache=meh&show=213" title="Transfer-Forum">العام</a> | <a href="http://trophymanager.com/forum.php?cache=meh&show=214" title="General Forum">الأسئلة</a> | <a href="http://trophymanager.com/forum.php?cache=meh&show=215" title="Federations (PRO only)">الخارجي</a> </li><li><a href="http://trophymanager.com/ungdom.php" target="_self" style="font-size: 10px;" title="Tutorial">اكاديمية الشباب</a></li><li><a href="http://trophymanager.com/manual_show.php?page=help_index" target="_self" style="font-size: 10px;" title="User-Guide">دليل اللعبة</a></li></ul></div>';
}
//Transferseite
if (myurl.match(/transform.php?m*/))  { // hier wird geprueft, ob das die richtige Seite ist

skillsumspan_value = document.createElement("th");
skillsumspan_value.innerHTML="<th><strong></strong></th>";
skillsumspan2_value = document.createElement("th");
skillsumspan2_value.innerHTML="<th><strong>TB-Rating</strong></th>";
document.getElementsByTagName("table")[0].getElementsByTagName('tr')[0].insertBefore(skillsumspan_value, document.getElementsByTagName("table")[0].getElementsByTagName('tr')[0].getElementsByTagName('th')[16]);
document.getElementsByTagName("table")[0].getElementsByTagName('tr')[1].insertBefore(skillsumspan2_value, document.getElementsByTagName("table")[0].getElementsByTagName('tr')[1].getElementsByTagName('th')[16]);

aux = document.getElementsByTagName("table")[0].getElementsByTagName("tr"); // holt alle Tabellenzeilen
for (var n = 0; n < aux.length; n++) {
	
	zeile=aux[n];
	skillsumme="";
	skillsumme_str="";

	
//	Position auslesen
/*	pos_n = aux[n+2].getElementsByTagName("td")[1];
	if(pos_n.getElementsByTagName("span").length==1) {
		var pos_n = pos_n.getElementsByTagName("span")[0].innerHTML;
	}
	else {*/
	pos_n = aux[n+2].cells[1].innerHTML;
//	}
//	alert(pos_n)

//  Stärke auslesen
	stae_n = aux[n+2].getElementsByTagName("td")[2];
	if(stae_n.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
			var stae_n = stae_n.getElementsByTagName("img")[0].getAttribute("alt");
	}
	else {
	stae_n = aux[n+2].cells[2].innerHTML;
	}

//  Kondition auslesen
	kon_n = aux[n+2].getElementsByTagName("td")[3];
	if(kon_n.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
			var kon_n = kon_n.getElementsByTagName("img")[0].getAttribute("alt");
	}
	else {
	kon_n = aux[n+2].cells[3].innerHTML;
	}

//  Geschwindigkeit auslesen
	ges_n = aux[n+2].getElementsByTagName("td")[4];
	if(ges_n.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
			var ges_n = ges_n.getElementsByTagName("img")[0].getAttribute("alt");
	}
	else {
	ges_n = aux[n+2].cells[4].innerHTML;
	}

//  Manndeckung auslesen
	man_n = aux[n+2].getElementsByTagName("td")[5];
	if(man_n.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
			var man_n = man_n.getElementsByTagName("img")[0].getAttribute("alt");
	}
	else {
	man_n = aux[n+2].cells[5].innerHTML;
	}

//  Zweikampf auslesen
	zwe_n = aux[n+2].getElementsByTagName("td")[6];
	if(zwe_n.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
			var zwe_n = zwe_n.getElementsByTagName("img")[0].getAttribute("alt");
	}
	else {
	zwe_n = aux[n+2].cells[6].innerHTML;
	}

//  Laufbereitschaft auslesen
	lau_n = aux[n+2].getElementsByTagName("td")[7];
	if(lau_n.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
			var lau_n = lau_n.getElementsByTagName("img")[0].getAttribute("alt");
	}
	else {
	lau_n = aux[n+2].cells[7].innerHTML;
	}

//  Stellungsspiel auslesen
	ste_n = aux[n+2].getElementsByTagName("td")[8];
	if(ste_n.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
			var ste_n = ste_n.getElementsByTagName("img")[0].getAttribute("alt");
	}
	else {
	ste_n = aux[n+2].cells[8].innerHTML;
	}

//  Passspiel auslesen
	pass_n = aux[n+2].getElementsByTagName("td")[9];
	if(pass_n.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
			var pass_n = pass_n.getElementsByTagName("img")[0].getAttribute("alt");
	}
	else {
	pass_n = aux[n+2].cells[9].innerHTML;
	}

//  Flanken auslesen
	fla_n = aux[n+2].getElementsByTagName("td")[10];
	if(fla_n.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
			var fla_n = fla_n.getElementsByTagName("img")[0].getAttribute("alt");
	}
	else {
	fla_n = aux[n+2].cells[10].innerHTML;
	}

//  Technik auslesen
	tec_n = aux[n+2].getElementsByTagName("td")[11];
	if(tec_n.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
			var tec_n = tec_n.getElementsByTagName("img")[0].getAttribute("alt");
	}
	else {
	tec_n = aux[n+2].cells[11].innerHTML;
	}

//  Kopfball auslesen
	kop_n = aux[n+2].getElementsByTagName("td")[12];
	if(kop_n.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
			var kop_n = kop_n.getElementsByTagName("img")[0].getAttribute("alt");
	}
	else {
	kop_n = aux[n+2].cells[12].innerHTML;
	}

//  Torschuss auslesen
	tor_n = aux[n+2].getElementsByTagName("td")[13];
	if(tor_n.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
			var tor_n = tor_n.getElementsByTagName("img")[0].getAttribute("alt");
	}
	else {
	tor_n = aux[n+2].cells[13].innerHTML;
	}

//  Weitschuss auslesen
	wei_n = aux[n+2].getElementsByTagName("td")[14];
	if(wei_n.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
			var wei_n = wei_n.getElementsByTagName("img")[0].getAttribute("alt");
	}
	else {
	wei_n = aux[n+2].cells[14].innerHTML;
	}

//  Standards auslesen
	sta_n = aux[n+2].getElementsByTagName("td")[15];
	if(sta_n.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
			var sta_n = sta_n.getElementsByTagName("img")[0].getAttribute("alt");
	}
	else {
	sta_n = aux[n+2].cells[15].innerHTML;
	}

		stae_n=parseInt(stae_n);
		kon_n=parseInt(kon_n);
		ges_n=parseInt(ges_n);
		man_n=parseInt(man_n);
		zwe_n=parseInt(zwe_n);
		lau_n=parseInt(lau_n);
		ste_n=parseInt(ste_n);
		pass_n=parseInt(pass_n);
		fla_n=parseInt(fla_n);
		tec_n=parseInt(tec_n);
		kop_n=parseInt(kop_n);
		tor_n=parseInt(tor_n);
		wei_n=parseInt(wei_n);
		sta_n=parseInt(sta_n);
		
// Skillsummen berechnen je nachdem wie deinen Positionen hei�en. zb att und def
		
		
	switch (pos_n) {
		
		case "GK":
			var skillsumme = (((10.83333*man_n) + (9.999982*lau_n) + 5.833338*(stae_n+ges_n+zwe_n+ste_n+kop_n)+0.00*(kon_n+pass_n+fla_n+tec_n))/10);
		break;

		case "TW":
			var skillsumme = (((10.83333*man_n) + (9.999982*lau_n) + 5.833338*(stae_n+ges_n+zwe_n+ste_n+kop_n)+0.00*(kon_n+pass_n+fla_n+tec_n))/10);
		break;
		
		case "POR":
			var skillsumme = (((10.83333*man_n) + (9.999982*lau_n) + 5.833338*(stae_n+ges_n+zwe_n+ste_n+kop_n)+0.00*(kon_n+pass_n+fla_n+tec_n))/10);
		break;

		case "D C":
//		alert ("case dc")		
			var skillsumme = ((6.98324*(man_n + zwe_n + stae_n + kop_n + ges_n) + 4.067738*(pass_n + fla_n + tec_n) + 0.5761173*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
//			alert("d c " + skillsumme)
		break;

		case "dc ":
			var skillsumme = ((6.98324*(man_n + zwe_n + stae_n + kop_n + ges_n) + 4.067738*(pass_n + fla_n + tec_n) + 0.5761173*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
		break;

		case "dc":
			var skillsumme = ((6.98324*(man_n + zwe_n + stae_n + kop_n + ges_n) + 4.067738*(pass_n + fla_n + tec_n) + 0.5761173*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
		break;

		case "D L":
//		alert ("case dl")
			var skillsumme = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
//			alert("d l " + skillsumme)
		break;
		
		case "dl ":
			var skillsumme = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
		break;		

		case "dl":
			var skillsumme = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
		break;		

		case "D R":
//		alert ("case dr")		
			var skillsumme = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
//			alert("d r " + skillsumme)
		break;
		
		case "dr ":
			var skillsumme = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
		break;			

		case "dr":
			var skillsumme = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
		break;			

		case "D LR":
//		alert ("case dlr")
			var skillsumme = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
//		alert("d lr " + skillsumme)
		break;
		
		case "dl dr":
			var skillsumme = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
		break;			

		case "dr dl":
			var skillsumme = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
		break;			

		case "D CR":
			var skillsumme1 = ((6.98324*(man_n + zwe_n + stae_n + kop_n + ges_n) + 4.067738*(pass_n + fla_n + tec_n) + 0.5761173*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
//			alert("d cr " + skillsumme)
		break;
		
		case "dc dr":
			var skillsumme1 = ((6.98324*(man_n + zwe_n + stae_n + kop_n + ges_n) + 4.067738*(pass_n + fla_n + tec_n) + 0.5761173*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;		
		
		case "dr dc":
			var skillsumme1 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((6.98324*(man_n + zwe_n + stae_n + kop_n + ges_n) + 4.067738*(pass_n + fla_n + tec_n) + 0.5761173*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;			
		
		case "D LC":
			var skillsumme1 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((6.98324*(man_n + zwe_n + stae_n + kop_n + ges_n) + 4.067738*(pass_n + fla_n + tec_n) + 0.5761173*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
//			alert("d lc " + skillsumme)
		break;		

		case "dc dl":
			var skillsumme1 = ((6.98324*(man_n + zwe_n + stae_n + kop_n + ges_n) + 4.067738*(pass_n + fla_n + tec_n) + 0.5761173*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;	

		case "dl dc":
			var skillsumme1 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((6.98324*(man_n + zwe_n + stae_n + kop_n + ges_n) + 4.067738*(pass_n + fla_n + tec_n) + 0.5761173*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;	

		case "D/DM C":
			var skillsumme1 = ((6.98324*(man_n + zwe_n + stae_n + kop_n + ges_n) + 4.067738*(pass_n + fla_n + tec_n) + 0.5761173*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((5.263158*(ste_n + lau_n + pass_n + man_n + zwe_n + stae_n + kop_n) + 3.070175*(kon_n + ges_n + fla_n + tec_n) + 0.4385965*(tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
//			alert("d/dm c " + skillsumme)
		break;
		
		case "dc dmc":
			var skillsumme1 = ((6.98324*(man_n + zwe_n + stae_n + kop_n + ges_n) + 4.067738*(pass_n + fla_n + tec_n) + 0.5761173*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((5.263158*(ste_n + lau_n + pass_n + man_n + zwe_n + stae_n + kop_n) + 3.070175*(kon_n + ges_n + fla_n + tec_n) + 0.4385965*(tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;		

		case "dmc dc":
			var skillsumme1 = ((5.263158*(ste_n + lau_n + pass_n + man_n + zwe_n + stae_n + kop_n) + 3.070175*(kon_n + ges_n + fla_n + tec_n) + 0.4385965*(tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((6.98324*(man_n + zwe_n + stae_n + kop_n + ges_n) + 4.067738*(pass_n + fla_n + tec_n) + 0.5761173*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;		

		case "D/DM R":
			var skillsumme1 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
//			alert("d/dm r " + skillsumme)
		break;
		
		case "dr dmr":
			var skillsumme1 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;		

		case "dmr dr":
			var skillsumme1 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;		

		case "D/DM L":
			var skillsumme1 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
//			alert("d/dm l " + skillsumme)
		break;

		case "dl dml":
			var skillsumme1 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "dml dl":
			var skillsumme1 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;		

		case "DM C":
//		alert ("case dmc")		
			var skillsumme = ((5.263158*(ste_n + lau_n + pass_n + man_n + zwe_n + stae_n + kop_n) + 3.070175*(kon_n + ges_n + fla_n + tec_n) + 0.4385965*(tor_n + wei_n + sta_n))/10);
//			alert("dm c " + skillsumme)
		break;
		
		case "dmc ":
			var skillsumme = ((5.263158*(ste_n + lau_n + pass_n + man_n + zwe_n + stae_n + kop_n) + 3.070175*(kon_n + ges_n + fla_n + tec_n) + 0.4385965*(tor_n + wei_n + sta_n))/10);
		break;		

		case "dmc":
			var skillsumme = ((5.263158*(ste_n + lau_n + pass_n + man_n + zwe_n + stae_n + kop_n) + 3.070175*(kon_n + ges_n + fla_n + tec_n) + 0.4385965*(tor_n + wei_n + sta_n))/10);
		break;		

		case "DM L":
//		alert ("case dml")		
			var skillsumme = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
//			alert("dm l " + skillsumme)
		break;

		case "dml ":
			var skillsumme = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
		break;

		case "dml":
			var skillsumme = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
		break;


		case "DM R":
//		alert ("case dmr")		
			var skillsumme = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
//			alert("dm r " + skillsumme)
		break;
		
		case "dmr ":
			var skillsumme = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
		break;
		
		case "dmr":
			var skillsumme = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
		break;		
		
		case "DM LR":
//		alert ("case dmlr")		
			var skillsumme = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
//			alert("dm lr " + skillsumme)
		break;
		
		case "dmr dml":
			var skillsumme = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
		break;
		
		case "dml dmr":
			var skillsumme = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
		break;		

		case "DM CR":
			var skillsumme1 = ((5.263158*(ste_n + lau_n + pass_n + man_n + zwe_n + stae_n + kop_n) + 3.070175*(kon_n + ges_n + fla_n + tec_n) + 0.4385965*(tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
//			alert("dm cr " + skillsumme)
		break;
		
		case "dmc dmr":
			var skillsumme1 = ((5.263158*(ste_n + lau_n + pass_n + man_n + zwe_n + stae_n + kop_n) + 3.070175*(kon_n + ges_n + fla_n + tec_n) + 0.4385965*(tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "dmr dmc":
			var skillsumme1 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((5.263158*(ste_n + lau_n + pass_n + man_n + zwe_n + stae_n + kop_n) + 3.070175*(kon_n + ges_n + fla_n + tec_n) + 0.4385965*(tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;		
		
		case "DM LC":
			var skillsumme1 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((5.263158*(ste_n + lau_n + pass_n + man_n + zwe_n + stae_n + kop_n) + 3.070175*(kon_n + ges_n + fla_n + tec_n) + 0.4385965*(tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
//			alert("dm lc " + skillsumme)
		break;

		case "dml dmc":
			var skillsumme1 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((5.263158*(ste_n + lau_n + pass_n + man_n + zwe_n + stae_n + kop_n) + 3.070175*(kon_n + ges_n + fla_n + tec_n) + 0.4385965*(tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "dmc dml":
			var skillsumme1 = ((5.263158*(ste_n + lau_n + pass_n + man_n + zwe_n + stae_n + kop_n) + 3.070175*(kon_n + ges_n + fla_n + tec_n) + 0.4385965*(tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;		

		case "DM/M C":
			var skillsumme1 = ((5.263158*(ste_n + lau_n + pass_n + man_n + zwe_n + stae_n + kop_n) + 3.070175*(kon_n + ges_n + fla_n + tec_n) + 0.4385965*(tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((6.182408*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n) + 3.604903*(kon_n + kop_n + stae_n) + 0.5227109*(ges_n + fla_n + tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
//			alert("dm/m c " + skillsumme)
		break;
		
		case "dmc mc":
			var skillsumme1 = ((5.263158*(ste_n + lau_n + pass_n + man_n + zwe_n + stae_n + kop_n) + 3.070175*(kon_n + ges_n + fla_n + tec_n) + 0.4385965*(tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((6.182408*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n) + 3.604903*(kon_n + kop_n + stae_n) + 0.5227109*(ges_n + fla_n + tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "mc dmc":
			var skillsumme1 = ((6.182408*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n) + 3.604903*(kon_n + kop_n + stae_n) + 0.5227109*(ges_n + fla_n + tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((5.263158*(ste_n + lau_n + pass_n + man_n + zwe_n + stae_n + kop_n) + 3.070175*(kon_n + ges_n + fla_n + tec_n) + 0.4385965*(tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "DM/M R":
			var skillsumme1 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((5.041541*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n + fla_n + ges_n) + 2.945619*(kon_n + kop_n + stae_n) + 0.4154079*(tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
//			alert("dm/m r " + skillsumme)
		break;
		
		case "dmr mr":
			var skillsumme1 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((5.041541*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n + fla_n + ges_n) + 2.945619*(kon_n + kop_n + stae_n) + 0.4154079*(tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
//			alert("dm/m r " + skillsumme)
		break;		

		case "mr dmr":
			var skillsumme1 = ((5.041541*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n + fla_n + ges_n) + 2.945619*(kon_n + kop_n + stae_n) + 0.4154079*(tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "DM/M L":
			var skillsumme1 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((5.041541*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n + fla_n + ges_n) + 2.945619*(kon_n + kop_n + stae_n) + 0.4154079*(tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
//			alert("dm/m l " + skillsumme)
		break;

		case "dml ml":
			var skillsumme1 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((5.041541*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n + fla_n + ges_n) + 2.945619*(kon_n + kop_n + stae_n) + 0.4154079*(tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "ml dml":
			var skillsumme1 = ((5.041541*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n + fla_n + ges_n) + 2.945619*(kon_n + kop_n + stae_n) + 0.4154079*(tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((7.890697*(ges_n + man_n + zwe_n) + 4.605465*(stae_n + kop_n + tec_n + fla_n + pass_n) + 0.6601167*(kon_n + lau_n + ste_n + tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "M C":
//		alert ("case mc")		
			var skillsumme = ((6.182408*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n) + 3.604903*(kon_n + kop_n + stae_n) + 0.5227109*(ges_n + fla_n + tor_n + wei_n + sta_n))/10);
//			alert("m c " + skillsumme)
		break;
		
		case "mc":
			var skillsumme = ((6.182408*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n) + 3.604903*(kon_n + kop_n + stae_n) + 0.5227109*(ges_n + fla_n + tor_n + wei_n + sta_n))/10);
		break;		

		case "mc ":
			var skillsumme = ((6.182408*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n) + 3.604903*(kon_n + kop_n + stae_n) + 0.5227109*(ges_n + fla_n + tor_n + wei_n + sta_n))/10);
		break;		

		case "M L":
//		alert ("case ml")		
			var skillsumme = ((5.041541*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n + fla_n + ges_n) + 2.945619*(kon_n + kop_n + stae_n) + 0.4154079*(tor_n + wei_n + sta_n))/10);
//			alert("m l " + skillsumme)
		break;
		
		case "ml":
			var skillsumme = ((5.041541*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n + fla_n + ges_n) + 2.945619*(kon_n + kop_n + stae_n) + 0.4154079*(tor_n + wei_n + sta_n))/10);
		break;		

		case "ml ":
			var skillsumme = ((5.041541*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n + fla_n + ges_n) + 2.945619*(kon_n + kop_n + stae_n) + 0.4154079*(tor_n + wei_n + sta_n))/10);
		break;		

		case "M R":
//		alert ("case mr")		
			var skillsumme = ((5.041541*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n + fla_n + ges_n) + 2.945619*(kon_n + kop_n + stae_n) + 0.4154079*(tor_n + wei_n + sta_n))/10);
//			alert("m r " + skillsumme)
		break;

		case "mr ":
			var skillsumme = ((5.041541*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n + fla_n + ges_n) + 2.945619*(kon_n + kop_n + stae_n) + 0.4154079*(tor_n + wei_n + sta_n))/10);
		break;

		case "mr":
			var skillsumme = ((5.041541*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n + fla_n + ges_n) + 2.945619*(kon_n + kop_n + stae_n) + 0.4154079*(tor_n + wei_n + sta_n))/10);
		break;

		case "M LR":
//		alert ("case mlr")		
			var skillsumme = ((5.041541*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n + fla_n + ges_n) + 2.945619*(kon_n + kop_n + stae_n) + 0.4154079*(tor_n + wei_n + sta_n))/10);
//			alert("m lr " + skillsumme)
		break;
		
		case "mr ml":
			var skillsumme = ((5.041541*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n + fla_n + ges_n) + 2.945619*(kon_n + kop_n + stae_n) + 0.4154079*(tor_n + wei_n + sta_n))/10);
		break;
		
		case "ml mr":
			var skillsumme = ((5.041541*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n + fla_n + ges_n) + 2.945619*(kon_n + kop_n + stae_n) + 0.4154079*(tor_n + wei_n + sta_n))/10);
		break;		
		
		case "M CR":
			var skillsumme1 = ((6.182408*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n) + 3.604903*(kon_n + kop_n + stae_n) + 0.5227109*(ges_n + fla_n + tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((5.041541*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n + fla_n + ges_n) + 2.945619*(kon_n + kop_n + stae_n) + 0.4154079*(tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
//			alert("m cr " + skillsumme)
		break;
		
		case "mc mr":
			var skillsumme1 = ((6.182408*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n) + 3.604903*(kon_n + kop_n + stae_n) + 0.5227109*(ges_n + fla_n + tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((5.041541*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n + fla_n + ges_n) + 2.945619*(kon_n + kop_n + stae_n) + 0.4154079*(tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;		

		case "mr mc":
			var skillsumme1 = ((5.041541*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n + fla_n + ges_n) + 2.945619*(kon_n + kop_n + stae_n) + 0.4154079*(tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((6.182408*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n) + 3.604903*(kon_n + kop_n + stae_n) + 0.5227109*(ges_n + fla_n + tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;		

		case "M LC":
			var skillsumme1 = ((5.041541*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n + fla_n + ges_n) + 2.945619*(kon_n + kop_n + stae_n) + 0.4154079*(tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((6.182408*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n) + 3.604903*(kon_n + kop_n + stae_n) + 0.5227109*(ges_n + fla_n + tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
//			alert("m lc " + skillsumme)
		break;
		
		case "ml mc":
			var skillsumme1 = ((5.041541*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n + fla_n + ges_n) + 2.945619*(kon_n + kop_n + stae_n) + 0.4154079*(tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((6.182408*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n) + 3.604903*(kon_n + kop_n + stae_n) + 0.5227109*(ges_n + fla_n + tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;			
		
		case "mc ml":
			var skillsumme1 = ((6.182408*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n) + 3.604903*(kon_n + kop_n + stae_n) + 0.5227109*(ges_n + fla_n + tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((5.041541*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n + fla_n + ges_n) + 2.945619*(kon_n + kop_n + stae_n) + 0.4154079*(tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;			
		

		case "M/OM C":
			var skillsumme1 = ((6.182408*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n) + 3.604903*(kon_n + kop_n + stae_n) + 0.5227109*(ges_n + fla_n + tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((5.824724*(lau_n + ste_n + pass_n + tec_n + tor_n + wei_n) + 3.402209*(kop_n + stae_n + man_n + zwe_n) + 0.4809405*(fla_n + kon_n + ges_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
//			alert("m/om c " + skillsumme)
		break;
		
		case "mc omc":
			var skillsumme1 = ((6.182408*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n) + 3.604903*(kon_n + kop_n + stae_n) + 0.5227109*(ges_n + fla_n + tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((5.824724*(lau_n + ste_n + pass_n + tec_n + tor_n + wei_n) + 3.402209*(kop_n + stae_n + man_n + zwe_n) + 0.4809405*(fla_n + kon_n + ges_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;		

		case "omc mc":
			var skillsumme1 = ((5.824724*(lau_n + ste_n + pass_n + tec_n + tor_n + wei_n) + 3.402209*(kop_n + stae_n + man_n + zwe_n) + 0.4809405*(fla_n + kon_n + ges_n + sta_n))/10);
			var skillsumme2 = ((6.182408*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n) + 3.604903*(kon_n + kop_n + stae_n) + 0.5227109*(ges_n + fla_n + tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;		


		case "M/OM R":
			var skillsumme1 = ((5.041541*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n + fla_n + ges_n) + 2.945619*(kon_n + kop_n + stae_n) + 0.4154079*(tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((6.807867*(ges_n + tec_n + fla_n) + 3.97882*(lau_n + ste_n + tor_n + wei_n + kop_n + stae_n + kon_n) + 0.5748866*(man_n + zwe_n + pass_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
//			alert("m/om r " + skillsumme)
		break;
		
		case "mr omr":
			var skillsumme1 = ((5.041541*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n + fla_n + ges_n) + 2.945619*(kon_n + kop_n + stae_n) + 0.4154079*(tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((6.807867*(ges_n + tec_n + fla_n) + 3.97882*(lau_n + ste_n + tor_n + wei_n + kop_n + stae_n + kon_n) + 0.5748866*(man_n + zwe_n + pass_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;	
		
		case "omr mr":
			var skillsumme1 = ((6.807867*(ges_n + tec_n + fla_n) + 3.97882*(lau_n + ste_n + tor_n + wei_n + kop_n + stae_n + kon_n) + 0.5748866*(man_n + zwe_n + pass_n + sta_n))/10);
			var skillsumme2 = ((5.041541*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n + fla_n + ges_n) + 2.945619*(kon_n + kop_n + stae_n) + 0.4154079*(tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;			

		case "M/OM L":
			var skillsumme1 = ((5.041541*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n + fla_n + ges_n) + 2.945619*(kon_n + kop_n + stae_n) + 0.4154079*(tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((6.807867*(ges_n + tec_n + fla_n) + 3.97882*(lau_n + ste_n + tor_n + wei_n + kop_n + stae_n + kon_n) + 0.5748866*(man_n + zwe_n + pass_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
//			alert("m/om l " + skillsumme)
		break;
		
		case "ml oml":
			var skillsumme1 = ((5.041541*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n + fla_n + ges_n) + 2.945619*(kon_n + kop_n + stae_n) + 0.4154079*(tor_n + wei_n + sta_n))/10);
			var skillsumme2 = ((6.807867*(ges_n + tec_n + fla_n) + 3.97882*(lau_n + ste_n + tor_n + wei_n + kop_n + stae_n + kon_n) + 0.5748866*(man_n + zwe_n + pass_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;		

		case "oml ml":
			var skillsumme1 = ((6.807867*(ges_n + tec_n + fla_n) + 3.97882*(lau_n + ste_n + tor_n + wei_n + kop_n + stae_n + kon_n) + 0.5748866*(man_n + zwe_n + pass_n + sta_n))/10);
			var skillsumme2 = ((5.041541*(ste_n + lau_n + man_n + zwe_n + pass_n + tec_n + fla_n + ges_n) + 2.945619*(kon_n + kop_n + stae_n) + 0.4154079*(tor_n + wei_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "OM C":
//		alert ("case omc")
			var skillsumme = ((5.824724*(lau_n + ste_n + pass_n + tec_n + tor_n + wei_n) + 3.402209*(kop_n + stae_n + man_n + zwe_n) + 0.4809405*(fla_n + kon_n + ges_n + sta_n))/10);
//			alert("om c " + skillsumme)
		break;

		case "omc ":
			var skillsumme = ((5.824724*(lau_n + ste_n + pass_n + tec_n + tor_n + wei_n) + 3.402209*(kop_n + stae_n + man_n + zwe_n) + 0.4809405*(fla_n + kon_n + ges_n + sta_n))/10);
		break;

		case "omc":
			var skillsumme = ((5.824724*(lau_n + ste_n + pass_n + tec_n + tor_n + wei_n) + 3.402209*(kop_n + stae_n + man_n + zwe_n) + 0.4809405*(fla_n + kon_n + ges_n + sta_n))/10);
		break;

		case "OM L":
//		alert ("case oml")
			var skillsumme = ((6.807867*(ges_n + tec_n + fla_n) + 3.97882*(lau_n + ste_n + tor_n + wei_n + kop_n + stae_n + kon_n) + 0.5748866*(man_n + zwe_n + pass_n + sta_n))/10);
//			alert("om l " + skillsumme)
		break;

		case "oml ":
			var skillsumme = ((6.807867*(ges_n + tec_n + fla_n) + 3.97882*(lau_n + ste_n + tor_n + wei_n + kop_n + stae_n + kon_n) + 0.5748866*(man_n + zwe_n + pass_n + sta_n))/10);
		break;
		
		case "oml":
			var skillsumme = ((6.807867*(ges_n + tec_n + fla_n) + 3.97882*(lau_n + ste_n + tor_n + wei_n + kop_n + stae_n + kon_n) + 0.5748866*(man_n + zwe_n + pass_n + sta_n))/10);
		break;		

		case "OM R":
//		alert ("case omr")
			var skillsumme = ((6.807867*(ges_n + tec_n + fla_n) + 3.97882*(lau_n + ste_n + tor_n + wei_n + kop_n + stae_n + kon_n) + 0.5748866*(man_n + zwe_n + pass_n + sta_n))/10);
//			alert("om r " + skillsumme)
		break;
		
		case "omr ":
			var skillsumme = ((6.807867*(ges_n + tec_n + fla_n) + 3.97882*(lau_n + ste_n + tor_n + wei_n + kop_n + stae_n + kon_n) + 0.5748866*(man_n + zwe_n + pass_n + sta_n))/10);
		break;
		
		case "omr":
			var skillsumme = ((6.807867*(ges_n + tec_n + fla_n) + 3.97882*(lau_n + ste_n + tor_n + wei_n + kop_n + stae_n + kon_n) + 0.5748866*(man_n + zwe_n + pass_n + sta_n))/10);
		break;		
		
		case "OM LR":
//		alert ("case omlr")
			var skillsumme = ((6.807867*(ges_n + tec_n + fla_n) + 3.97882*(lau_n + ste_n + tor_n + wei_n + kop_n + stae_n + kon_n) + 0.5748866*(man_n + zwe_n + pass_n + sta_n))/10);
//			alert("om lr " + skillsumme)
		break;

		case "oml omr":
			var skillsumme = ((6.807867*(ges_n + tec_n + fla_n) + 3.97882*(lau_n + ste_n + tor_n + wei_n + kop_n + stae_n + kon_n) + 0.5748866*(man_n + zwe_n + pass_n + sta_n))/10);
		break;

		case "omr oml":
			var skillsumme = ((6.807867*(ges_n + tec_n + fla_n) + 3.97882*(lau_n + ste_n + tor_n + wei_n + kop_n + stae_n + kon_n) + 0.5748866*(man_n + zwe_n + pass_n + sta_n))/10);
		break;

		case "OM CR":
			var skillsumme1 = ((5.824724*(lau_n + ste_n + pass_n + tec_n + tor_n + wei_n) + 3.402209*(kop_n + stae_n + man_n + zwe_n) + 0.4809405*(fla_n + kon_n + ges_n + sta_n))/10);
			var skillsumme2 = ((6.807867*(ges_n + tec_n + fla_n) + 3.97882*(lau_n + ste_n + tor_n + wei_n + kop_n + stae_n + kon_n) + 0.5748866*(man_n + zwe_n + pass_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
//			alert("om cr " + skillsumme)
		break;

		case "omc omr":
			var skillsumme1 = ((5.824724*(lau_n + ste_n + pass_n + tec_n + tor_n + wei_n) + 3.402209*(kop_n + stae_n + man_n + zwe_n) + 0.4809405*(fla_n + kon_n + ges_n + sta_n))/10);
			var skillsumme2 = ((6.807867*(ges_n + tec_n + fla_n) + 3.97882*(lau_n + ste_n + tor_n + wei_n + kop_n + stae_n + kon_n) + 0.5748866*(man_n + zwe_n + pass_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "omr omc":
			var skillsumme1 = ((6.807867*(ges_n + tec_n + fla_n) + 3.97882*(lau_n + ste_n + tor_n + wei_n + kop_n + stae_n + kon_n) + 0.5748866*(man_n + zwe_n + pass_n + sta_n))/10);
			var skillsumme2 = ((5.824724*(lau_n + ste_n + pass_n + tec_n + tor_n + wei_n) + 3.402209*(kop_n + stae_n + man_n + zwe_n) + 0.4809405*(fla_n + kon_n + ges_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;		

		case "OM LC":
			var skillsumme1 = ((6.807867*(ges_n + tec_n + fla_n) + 3.97882*(lau_n + ste_n + tor_n + wei_n + kop_n + stae_n + kon_n) + 0.5748866*(man_n + zwe_n + pass_n + sta_n))/10);
			var skillsumme2 = ((5.824724*(lau_n + ste_n + pass_n + tec_n + tor_n + wei_n) + 3.402209*(kop_n + stae_n + man_n + zwe_n) + 0.4809405*(fla_n + kon_n + ges_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
//			alert("om lc " + skillsumme)			
		break;

		case "omc oml":
			var skillsumme1 = ((6.807867*(ges_n + tec_n + fla_n) + 3.97882*(lau_n + ste_n + tor_n + wei_n + kop_n + stae_n + kon_n) + 0.5748866*(man_n + zwe_n + pass_n + sta_n))/10);
			var skillsumme2 = ((5.824724*(lau_n + ste_n + pass_n + tec_n + tor_n + wei_n) + 3.402209*(kop_n + stae_n + man_n + zwe_n) + 0.4809405*(fla_n + kon_n + ges_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "oml omc":
			var skillsumme1 = ((6.807867*(ges_n + tec_n + fla_n) + 3.97882*(lau_n + ste_n + tor_n + wei_n + kop_n + stae_n + kon_n) + 0.5748866*(man_n + zwe_n + pass_n + sta_n))/10);
			var skillsumme2 = ((5.824724*(lau_n + ste_n + pass_n + tec_n + tor_n + wei_n) + 3.402209*(kop_n + stae_n + man_n + zwe_n) + 0.4809405*(fla_n + kon_n + ges_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "OM C, F":
			var skillsumme1 = ((5.824724*(lau_n + ste_n + pass_n + tec_n + tor_n + wei_n) + 3.402209*(kop_n + stae_n + man_n + zwe_n) + 0.4809405*(fla_n + kon_n + ges_n + sta_n))/10);
			var skillsumme2 = ((6.903289*(stae_n + kop_n + tor_n + wei_n) + 4.021492*(kon_n + ges_n + lau_n + ste_n + tec_n) + 0.5698469*(man_n + zwe_n + fla_n + pass_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
//			alert("om c, f " + skillsumme)
		break;
		
		case "omc fc":
			var skillsumme1 = ((5.824724*(lau_n + ste_n + pass_n + tec_n + tor_n + wei_n) + 3.402209*(kop_n + stae_n + man_n + zwe_n) + 0.4809405*(fla_n + kon_n + ges_n + sta_n))/10);
			var skillsumme2 = ((6.903289*(stae_n + kop_n + tor_n + wei_n) + 4.021492*(kon_n + ges_n + lau_n + ste_n + tec_n) + 0.5698469*(man_n + zwe_n + fla_n + pass_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;
		
		case "fc omc":
			var skillsumme1 = ((6.903289*(stae_n + kop_n + tor_n + wei_n) + 4.021492*(kon_n + ges_n + lau_n + ste_n + tec_n) + 0.5698469*(man_n + zwe_n + fla_n + pass_n + sta_n))/10);
			var skillsumme2 = ((5.824724*(lau_n + ste_n + pass_n + tec_n + tor_n + wei_n) + 3.402209*(kop_n + stae_n + man_n + zwe_n) + 0.4809405*(fla_n + kon_n + ges_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;		

		case "OM R, F":
			var skillsumme1 = ((6.807867*(ges_n + tec_n + fla_n) + 3.97882*(lau_n + ste_n + tor_n + wei_n + kop_n + stae_n + kon_n) + 0.5748866*(man_n + zwe_n + pass_n + sta_n))/10);
			var skillsumme2 = ((6.903289*(stae_n + kop_n + tor_n + wei_n) + 4.021492*(kon_n + ges_n + lau_n + ste_n + tec_n) + 0.5698469*(man_n + zwe_n + fla_n + pass_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
//			alert("om r, f " + skillsumme)
		break;

		case "fc omr":
			var skillsumme1 = ((6.903289*(stae_n + kop_n + tor_n + wei_n) + 4.021492*(kon_n + ges_n + lau_n + ste_n + tec_n) + 0.5698469*(man_n + zwe_n + fla_n + pass_n + sta_n))/10);
			var skillsumme2 = ((6.807867*(ges_n + tec_n + fla_n) + 3.97882*(lau_n + ste_n + tor_n + wei_n + kop_n + stae_n + kon_n) + 0.5748866*(man_n + zwe_n + pass_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "omr fc":
			var skillsumme1 = ((6.807867*(ges_n + tec_n + fla_n) + 3.97882*(lau_n + ste_n + tor_n + wei_n + kop_n + stae_n + kon_n) + 0.5748866*(man_n + zwe_n + pass_n + sta_n))/10);
			var skillsumme2 = ((6.903289*(stae_n + kop_n + tor_n + wei_n) + 4.021492*(kon_n + ges_n + lau_n + ste_n + tec_n) + 0.5698469*(man_n + zwe_n + fla_n + pass_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "OM L, F":
			var skillsumme1 = ((6.807867*(ges_n + tec_n + fla_n) + 3.97882*(lau_n + ste_n + tor_n + wei_n + kop_n + stae_n + kon_n) + 0.5748866*(man_n + zwe_n + pass_n + sta_n))/10);
			var skillsumme2 = ((6.903289*(stae_n + kop_n + tor_n + wei_n) + 4.021492*(kon_n + ges_n + lau_n + ste_n + tec_n) + 0.5698469*(man_n + zwe_n + fla_n + pass_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
//			alert("om l, f " + skillsumme)
		break;
		
		case "fc oml":
			var skillsumme1 = ((6.903289*(stae_n + kop_n + tor_n + wei_n) + 4.021492*(kon_n + ges_n + lau_n + ste_n + tec_n) + 0.5698469*(man_n + zwe_n + fla_n + pass_n + sta_n))/10);
			var skillsumme2 = ((6.807867*(ges_n + tec_n + fla_n) + 3.97882*(lau_n + ste_n + tor_n + wei_n + kop_n + stae_n + kon_n) + 0.5748866*(man_n + zwe_n + pass_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "oml fc":
			var skillsumme1 = ((6.807867*(ges_n + tec_n + fla_n) + 3.97882*(lau_n + ste_n + tor_n + wei_n + kop_n + stae_n + kon_n) + 0.5748866*(man_n + zwe_n + pass_n + sta_n))/10);
			var skillsumme2 = ((6.903289*(stae_n + kop_n + tor_n + wei_n) + 4.021492*(kon_n + ges_n + lau_n + ste_n + tec_n) + 0.5698469*(man_n + zwe_n + fla_n + pass_n + sta_n))/10);
			skillsumme1 = new String(skillsumme1.toFixed(2));
			skillsumme2 = new String(skillsumme2.toFixed(2));
			var skillsumme_str = skillsumme1 + "/" + skillsumme2;
		break;

		case "F":
			var skillsumme = ((6.903289*(stae_n + kop_n + tor_n + wei_n) + 4.021492*(kon_n + ges_n + lau_n + ste_n + tec_n) + 0.5698469*(man_n + zwe_n + fla_n + pass_n + sta_n))/10);
		break;
		
		case "fc ":
			var skillsumme = ((6.903289*(stae_n + kop_n + tor_n + wei_n) + 4.021492*(kon_n + ges_n + lau_n + ste_n + tec_n) + 0.5698469*(man_n + zwe_n + fla_n + pass_n + sta_n))/10);
		break;		

		case "fc":
			var skillsumme = ((6.903289*(stae_n + kop_n + tor_n + wei_n) + 4.021492*(kon_n + ges_n + lau_n + ste_n + tec_n) + 0.5698469*(man_n + zwe_n + fla_n + pass_n + sta_n))/10);
		break;		


	default:
		var skillsumme = "Unknown Position";

}

		if(skillsumme_str == '')
		{
			skillsumme=parseFloat(skillsumme.toFixed(2));
		}
		else{
			skillsumme=skillsumme_str;
		}

skillsumspan_value = document.createElement("td");
skillsumspan_value.innerHTML="<td><b><font color=#ff9900>" + skillsumme + "</font></b></td>";
document.getElementsByTagName("table")[0].getElementsByTagName('tr')[n+2].insertBefore(skillsumspan_value, document.getElementsByTagName("table")[0].getElementsByTagName('tr')[n+2].getElementsByTagName('td')[16]);

//	alert ("Summe: " + skillsumme)
} // if showprofile
}
