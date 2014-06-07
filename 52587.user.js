// ==UserScript==
// @name           Automatische Spendenseite
// @namespace      by basti1012 (http://pennerhack.foren-city.de)
// @description    Es gibt nun eine neue Seite, auf der man Spendenlinks eintragen kann und diesen spenden kann.Ein klick und allen spieler werden einer spende gesendet
// @include        http://*dossergame.co.uk/*
// @include        http://*menelgame.pl/*
// @include        http://*berlin.pennergame.de/*
// @include        http://*pennergame.de/*
// @exclude        http://newboard.pennergame.de
// ==/UserScript==

var li = document.getElementsByTagName('li');

var len = li.length;
for (i=11;i<=len;i++) {

var li0 = li[i].innerHTML;

if (li0.indexOf('ebay') >=0){

li[i].innerHTML ='<a href="/?Bastispendenseite"style="color: blue; alt="Plunder" title="3.1" >Spenden</a>';









var url = document.location.href;
if(url.indexOf('/change_please/statistics/')>=0) {
  document.getElementById('content').getElementsByTagName('h1')[0].innerHTML = 'Spenden-Statistik/<a href="/?Bastispendenseite" target="_blank">Spendenseite</a>';
};

if (url.indexOf('/?Bastispendenseite')>=0){
var inhalt1 = '<input type="button" id="spende" value="Einmal klicken um alle eine Spende zu geben jeder klick eine Spende" /><br><span style=\"color:blue; font-size:120%;\"><u>Einfach klicken und es werden in 5 Sekunden alle eingetragenen Leuten Eine Spende gegeben.Man kann ja einen Spieler 1 mal die Stunde Spenden< wenn du die Seite im Extra tab auf lassen tust Spendet das Script jede Stunde alle eingetragenen Leute durch/u></span><span style="color: white;">Anzahl der Spendenlinks:</span>';// <input type="text" id="anzahl" size="1" value="'+GM_getValue("linkanzahl")+'" /><input type="button" id="anzahlspeichern" value="Bastis homepage" /><br>';

  document.getElementsByTagName('html')[0].innerHTML = '<head><title>Spendenseite</title>';
  var body = document.createElement('body');
  body.innerHTML = '<a href="/overview/"><- Zur Pennergame &Uuml;bersichtsseite Zur&uuml;rck;</a><br><center><span style=\"color:green; font-size:160%;\"><b><u>Automatische Spendenseite</u></b></span></center><br><br>'+inhalt1+'<br><br><br><br><input type="button" id="namenundlinksspeichern" value="Namen und Links speichern" /><br><span style=\"color:green; font-size:120%;\"><b>Also hier könnt ihr eure spendenlinks eingeben für alle games einfach name eingeben wie ihr es nennnen wollt da ist egal was da steht  und unter spendenlink den link den ihr automatisch spenden wollt eingeben speichern und fertig ist die spendenseite<br>';
  document.getElementsByTagName('html')[0].appendChild(body);
  var links = document.createElement('div');
  body.appendChild(links);

links.innerHTML += ''
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name1" size="30" value="'+GM_getValue("spendenname1")+'" /><span style="color: red;"> Link:</span><input type="text" id="link1" size="60" value="'+GM_getValue("spendenlink1")+'" /> <a href="'+GM_getValue("spendenlink1")+'" target="_blank">'+GM_getValue("spendenname1")+'</a><br>'
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name2" size="30" value="'+GM_getValue("spendenname2")+'" /><span style="color: red;"> Link:</span><input type="text" id="link2" size="60" value="'+GM_getValue("spendenlink2")+'" /> <a href="'+GM_getValue("spendenlink2")+'" target="_blank">'+GM_getValue("spendenname2")+'</a><br>'
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name3" size="30" value="'+GM_getValue("spendenname3")+'" /><span style="color: red;"> Link:</span><input type="text" id="link3" size="60" value="'+GM_getValue("spendenlink3")+'" /> <a href="'+GM_getValue("spendenlink3")+'" target="_blank">'+GM_getValue("spendenname3")+'</a><br>'
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name4" size="30" value="'+GM_getValue("spendenname4")+'" /><span style="color: red;"> Link:</span><input type="text" id="link4" size="60" value="'+GM_getValue("spendenlink4")+'" /> <a href="'+GM_getValue("spendenlink4")+'" target="_blank">'+GM_getValue("spendenname4")+'</a><br>'
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name5" size="30" value="'+GM_getValue("spendenname5")+'" /><span style="color: red;"> Link:</span><input type="text" id="link5" size="60" value="'+GM_getValue("spendenlink5")+'" /> <a href="'+GM_getValue("spendenlink5")+'" target="_blank">'+GM_getValue("spendenname5")+'</a><br>'
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name6" size="30" value="'+GM_getValue("spendenname6")+'" /><span style="color: red;"> Link:</span><input type="text" id="link6" size="60" value="'+GM_getValue("spendenlink6")+'" /> <a href="'+GM_getValue("spendenlink6")+'" target="_blank">'+GM_getValue("spendenname6")+'</a><br>'
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name7" size="30" value="'+GM_getValue("spendenname7")+'" /><span style="color: red;"> Link:</span><input type="text" id="link7" size="60" value="'+GM_getValue("spendenlink7")+'" /> <a href="'+GM_getValue("spendenlink7")+'" target="_blank">'+GM_getValue("spendenname7")+'</a><br>'
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name8" size="30" value="'+GM_getValue("spendenname8")+'" /><span style="color: red;"> Link:</span><input type="text" id="link8" size="60" value="'+GM_getValue("spendenlink8")+'" /> <a href="'+GM_getValue("spendenlink8")+'" target="_blank">'+GM_getValue("spendenname8")+'</a><br>'
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name9" size="30" value="'+GM_getValue("spendenname9")+'" /><span style="color: red;"> Link:</span><input type="text" id="link9" size="60" value="'+GM_getValue("spendenlink9")+'" /> <a href="'+GM_getValue("spendenlink9")+'" target="_blank">'+GM_getValue("spendenname9")+'</a><br>'
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name10" size="30" value="'+GM_getValue("spendenname10")+'" /><span style="color: red;"> Link:</span><input type="text" id="link10" size="60" value="'+GM_getValue("spendenlink10")+'" /> <a href="'+GM_getValue("spendenlink10")+'" target="_blank">'+GM_getValue("spendenname10")+'</a><br>'
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name11" size="30" value="'+GM_getValue("spendenname11")+'" /><span style="color: red;"> Link:</span><input type="text" id="link11" size="60" value="'+GM_getValue("spendenlink11")+'" /> <a href="'+GM_getValue("spendenlink11")+'" target="_blank">'+GM_getValue("spendenname11")+'</a><br>'
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name12" size="30" value="'+GM_getValue("spendenname12")+'" /><span style="color: red;"> Link:</span><input type="text" id="link12" size="60" value="'+GM_getValue("spendenlink12")+'" /> <a href="'+GM_getValue("spendenlink12")+'" target="_blank">'+GM_getValue("spendenname12")+'</a><br>'
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name13" size="30" value="'+GM_getValue("spendenname13")+'" /><span style="color: red;"> Link:</span><input type="text" id="link13" size="60" value="'+GM_getValue("spendenlink13")+'" /> <a href="'+GM_getValue("spendenlink13")+'" target="_blank">'+GM_getValue("spendenname13")+'</a><br>'
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name14" size="30" value="'+GM_getValue("spendenname14")+'" /><span style="color: red;"> Link:</span><input type="text" id="link14" size="60" value="'+GM_getValue("spendenlink14")+'" /> <a href="'+GM_getValue("spendenlink14")+'" target="_blank">'+GM_getValue("spendenname14")+'</a><br>'
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name15" size="30" value="'+GM_getValue("spendenname15")+'" /><span style="color: red;"> Link:</span><input type="text" id="link15" size="60" value="'+GM_getValue("spendenlink15")+'" /> <a href="'+GM_getValue("spendenlink15")+'" target="_blank">'+GM_getValue("spendenname15")+'</a><br>'
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name16" size="30" value="'+GM_getValue("spendenname16")+'" /><span style="color: red;"> Link:</span><input type="text" id="link16" size="60" value="'+GM_getValue("spendenlink16")+'" /> <a href="'+GM_getValue("spendenlink16")+'" target="_blank">'+GM_getValue("spendenname16")+'</a><br>'
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name17" size="30" value="'+GM_getValue("spendenname17")+'" /><span style="color: red;"> Link:</span><input type="text" id="link17" size="60" value="'+GM_getValue("spendenlink17")+'" /> <a href="'+GM_getValue("spendenlink17")+'" target="_blank">'+GM_getValue("spendenname17")+'</a><br>'
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name18" size="30" value="'+GM_getValue("spendenname18")+'" /><span style="color: red;"> Link:</span><input type="text" id="link18" size="60" value="'+GM_getValue("spendenlink18")+'" /> <a href="'+GM_getValue("spendenlink18")+'" target="_blank">'+GM_getValue("spendenname18")+'</a><br>'
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name19" size="30" value="'+GM_getValue("spendenname19")+'" /><span style="color: red;"> Link:</span><input type="text" id="link19" size="60" value="'+GM_getValue("spendenlink19")+'" /> <a href="'+GM_getValue("spendenlink19")+'" target="_blank">'+GM_getValue("spendenname19")+'</a><br>'
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name20" size="30" value="'+GM_getValue("spendenname20")+'" /><span style="color: red;"> Link:</span><input type="text" id="link20" size="60" value="'+GM_getValue("spendenlink20")+'" /> <a href="'+GM_getValue("spendenlink20")+'" target="_blank">'+GM_getValue("spendenname20")+'</a><br>'
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name21" size="30" value="'+GM_getValue("spendenname21")+'" /><span style="color: red;"> Link:</span><input type="text" id="link21" size="60" value="'+GM_getValue("spendenlink21")+'" /> <a href="'+GM_getValue("spendenlink21")+'" target="_blank">'+GM_getValue("spendenname21")+'</a><br>'
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name22" size="30" value="'+GM_getValue("spendenname22")+'" /><span style="color: red;"> Link:</span><input type="text" id="link22" size="60" value="'+GM_getValue("spendenlink22")+'" /> <a href="'+GM_getValue("spendenlink22")+'" target="_blank">'+GM_getValue("spendenname22")+'</a><br>'
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name23" size="30" value="'+GM_getValue("spendenname23")+'" /><span style="color: red;"> Link:</span><input type="text" id="link23" size="60" value="'+GM_getValue("spendenlink23")+'" /> <a href="'+GM_getValue("spendenlink23")+'" target="_blank">'+GM_getValue("spendenname23")+'</a><br>'
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name24" size="30" value="'+GM_getValue("spendenname24")+'" /><span style="color: red;"> Link:</span><input type="text" id="link24" size="60" value="'+GM_getValue("spendenlink24")+'" /> <a href="'+GM_getValue("spendenlink24")+'" target="_blank">'+GM_getValue("spendenname24")+'</a><br>'
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name25" size="30" value="'+GM_getValue("spendenname25")+'" /><span style="color: red;"> Link:</span><input type="text" id="link25" size="60" value="'+GM_getValue("spendenlink25")+'" /> <a href="'+GM_getValue("spendenlink25")+'" target="_blank">'+GM_getValue("spendenname25")+'</a><br>'
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name26" size="30" value="'+GM_getValue("spendenname26")+'" /><span style="color: red;"> Link:</span><input type="text" id="link26" size="60" value="'+GM_getValue("spendenlink26")+'" /> <a href="'+GM_getValue("spendenlink26")+'" target="_blank">'+GM_getValue("spendenname26")+'</a><br>'
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name27" size="30" value="'+GM_getValue("spendenname27")+'" /><span style="color: red;"> Link:</span><input type="text" id="link27" size="60" value="'+GM_getValue("spendenlink27")+'" /> <a href="'+GM_getValue("spendenlink27")+'" target="_blank">'+GM_getValue("spendenname27")+'</a><br>'
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name28" size="30" value="'+GM_getValue("spendenname28")+'" /><span style="color: red;"> Link:</span><input type="text" id="link28" size="60" value="'+GM_getValue("spendenlink28")+'" /> <a href="'+GM_getValue("spendenlink28")+'" target="_blank">'+GM_getValue("spendenname28")+'</a><br>'
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name29" size="30" value="'+GM_getValue("spendenname29")+'" /><span style="color: red;"> Link:</span><input type="text" id="link29" size="60" value="'+GM_getValue("spendenlink29")+'" /> <a href="'+GM_getValue("spendenlink29")+'" target="_blank">'+GM_getValue("spendenname29")+'</a><br>'
+'<span style="color: red;">Zb Name oder so:</span><input type="text" id="name30" size="30" value="'+GM_getValue("spendenname30")+'" /><span style="color: red;"> Link:</span><input type="text" id="link30" size="60" value="'+GM_getValue("spendenlink30")+'" /> <a href="'+GM_getValue("spendenlink30")+'" target="_blank">'+GM_getValue("spendenname30")+'</a><br>'
+'<span style=\"color:blue; font-size:150%;\"><b>Erkl&auml;rung zur Benutzung dieses Scriptes</b></span><br>'
+'<span style=\"color:green; font-size:110%;\"><b>1 . Euch umkucken wie es hier aussieht w&uuml;rde ich auch machen</b></span><br>'
+'<span style=\"color:orange; font-size:110%;\"><b>2 . Dann unter Namen euch einen Namen aussuchen wie ihr den Spendenlink nennen wollt egal was "Ralf" oder so reicht vollkommen.</b></span><br>'
+'<span style=\"color:green; font-size:110%;\"><b>3 . Unter Link gibt ihr den Spendenlink ein den ihr Spenden wollt.Wichtig dabei ist </span><span style=\"color:red; font-size:150%;\">Zur zeit nur Spendenlinks eingeben</b></span><span style=\"color:green; font-size:110%;\">Wollte das mit allen Links bauen aber geht nicht wie ich wollte also machen wir das erstmal so</span><br>'
+'<span style=\"color:orange; font-size:110%;\"><b>4 . Ihr k&ouml;nnt und d&uuml;rft Hamburg Menelgame und Dossergame eingeben und Spenden es geht jeder Link.</b></span><br>'
//+'<span style=\"color:green; font-size:110%;\"><b>5 . Tipp: Ihr k&ouml;nnt auch normale Internet Seiten eingeben damit ihr da Direkt draufklicken k&ouml;nnt oder es gibt im Internet Seiten die Z&auml;hlen die klicks und dann kriegt man daf&uumlr besondere Sachen wenn genug klicks da sind diese Links k&ouml;nnt ihr auch hier rein schreiben und immer Spenden klicken dann z&auml;hlen die klicks auch ,habe damit auch schon einige Sachen gemacht kommt cool man.</b></span><br>'
+'<span style=\"color:orange; font-size:110%;\"><b>6 . Nach der eingabe der Links klickt ihr auf Speichern und die Daten wurden gespeichert</b></span><br>'
+'<span style=\"color:green; font-size:110%;\"><b>7 . Dann k&ouml;nnt ihr Spenden ein klick auf Spenden und die gaze Liste wird durchgespendet( Nicht wundern dauert nur ca 1 Sekunde)</b></span><br>'
+'<span style=\"color:orange; font-size:110%;\"><b>8 . Neben den Spendenlink wird euer Spendennamen als Link gespeichert damit ihr die m&ouml;glichkeit habt die eingegebeene Seite auch so zu betretten</b></span><br>' 
+'<span style=\"color:orange; font-size:110%;\"><b>8a . Wichtig ist die Links von oben nach unten einzutragen wenn ihr eine L&uuml;cke habt wir nur bis zur L&ouml;cke gespendet .Habt ihr alle 30 voll kriegt ihr beim Senden ein Fenster als best&auml;tigung geht aber nur wenn alle voll sind k&ouml;nnt ja welche doppel rein schreiben oder so.Ansonsten seht ihr nur mit Extra Programm ob gespendet wird aber er Spendet beim klicken des Buttons</b></span><br>' 

//+'<span style=\"color:green; font-size:110%;\"><b>9 . Wenn ihr die Seite in einen Extra Tab auf macht wird nach einer Stunde wieder Automatisch gespendet , weil bei Pennergame jeder nach einer Stunde wieder Spenden erhalten kann von den der gerade gespendet hat,deswegen habe ich das mal so mit eingebaut</b></span><br>'
+'<center><span style=\"color:blue; font-size:150%;\"><b>10 . Viel Spass damit und bei Problemen mich fragen  Mfg Basti1012</b></span></center><br>'
+'<center><span style=\"color:black; font-size:100%;\"><b>11 . Copyright by Basti1012</b></span></center><br>';
//};




  document.getElementById('namenundlinksspeichern').addEventListener('click', function speichern2() 
   {
      var spendenname1 = document.getElementById('name1').value;
      GM_setValue("spendenname1" , spendenname1);
      var spendenlink1 = document.getElementById('link1').value;
      GM_setValue("spendenlink1" , spendenlink1);
      var spendenname2 = document.getElementById('name2').value;
      GM_setValue("spendenname2" , spendenname2);
      var spendenlink2 = document.getElementById('link2').value;
      GM_setValue("spendenlink2" , spendenlink2);
      var spendenname3 = document.getElementById('name3').value;
      GM_setValue("spendenname3" , spendenname3);
      var spendenlink3 = document.getElementById('link3').value;
      GM_setValue("spendenlink3" , spendenlink3);
      var spendenname4 = document.getElementById('name4').value;
      GM_setValue("spendenname4" , spendenname4);
      var spendenlink4 = document.getElementById('link4').value;
      GM_setValue("spendenlink4" , spendenlink4);

      var spendenname5 = document.getElementById('name5').value;
      GM_setValue("spendenname5" , spendenname5);
      var spendenlink5 = document.getElementById('link5').value;
      GM_setValue("spendenlink5" , spendenlink5);
      var spendenname6 = document.getElementById('name6').value;
      GM_setValue("spendenname6" , spendenname6);
      var spendenlink6 = document.getElementById('link6').value;
      GM_setValue("spendenlink6" , spendenlink6);
      var spendenname7 = document.getElementById('name7').value;
      GM_setValue("spendenname7" , spendenname7);
      var spendenlink7 = document.getElementById('link7').value;
      GM_setValue("spendenlink7" , spendenlink7);
      var spendenname8 = document.getElementById('name8').value;
      GM_setValue("spendenname8" , spendenname8);
      var spendenlink8 = document.getElementById('link8').value;
      GM_setValue("spendenlink8" , spendenlink8);

      var spendenname9 = document.getElementById('name9').value;
      GM_setValue("spendenname9" , spendenname9);
      var spendenlink9 = document.getElementById('link9').value;
      GM_setValue("spendenlink9" , spendenlink9);
      var spendenname10 = document.getElementById('name10').value;
      GM_setValue("spendenname10" , spendenname10);
      var spendenlink10 = document.getElementById('link10').value;
      GM_setValue("spendenlink10" , spendenlink10);
      var spendenname11 = document.getElementById('name11').value;
      GM_setValue("spendenname11" , spendenname11);
      var spendenlink11 = document.getElementById('link11').value;
      GM_setValue("spendenlink11" , spendenlink11);
      var spendenname12 = document.getElementById('name12').value;
      GM_setValue("spendenname12" , spendenname12);
      var spendenlink12 = document.getElementById('link12').value;
      GM_setValue("spendenlink12" , spendenlink12);


      var spendenname13 = document.getElementById('name13').value;
      GM_setValue("spendenname13" , spendenname13);
      var spendenlink13 = document.getElementById('link13').value;
      GM_setValue("spendenlink13" , spendenlink13);
      var spendenname14 = document.getElementById('name14').value;
      GM_setValue("spendenname14" , spendenname14);
      var spendenlink14 = document.getElementById('link14').value;
      GM_setValue("spendenlink14" , spendenlink14);
      var spendenname15 = document.getElementById('name15').value;
      GM_setValue("spendenname15" , spendenname15);
      var spendenlink15 = document.getElementById('link15').value;
      GM_setValue("spendenlink15" , spendenlink15);
      var spendenname16 = document.getElementById('name16').value;
      GM_setValue("spendenname16" , spendenname16);
      var spendenlink16 = document.getElementById('link16').value;
      GM_setValue("spendenlink16" , spendenlink16);


      var spendenname17 = document.getElementById('name17').value;
      GM_setValue("spendenname17" , spendenname17);
      var spendenlink17 = document.getElementById('link17').value;
      GM_setValue("spendenlink17" , spendenlink17);
      var spendenname18 = document.getElementById('name18').value;
      GM_setValue("spendenname18" , spendenname18);
      var spendenlink18 = document.getElementById('link18').value;
      GM_setValue("spendenlink18" , spendenlink18);
      var spendenname19 = document.getElementById('name19').value;
      GM_setValue("spendenname19" , spendenname19);
      var spendenlink19 = document.getElementById('link19').value;
      GM_setValue("spendenlink19" , spendenlink19);
      var spendenname20 = document.getElementById('name20').value;
      GM_setValue("spendenname20" , spendenname20);
      var spendenlink20 = document.getElementById('link20').value;
      GM_setValue("spendenlink20" , spendenlink20);



      var spendenname21 = document.getElementById('name21').value;
      GM_setValue("spendenname21" , spendenname21);
      var spendenlink21 = document.getElementById('link21').value;
      GM_setValue("spendenlink21" , spendenlink21);
      var spendenname22 = document.getElementById('name22').value;
      GM_setValue("spendenname22" , spendenname22);
      var spendenlink22 = document.getElementById('link22').value;
      GM_setValue("spendenlink22" , spendenlink22);
      var spendenname23 = document.getElementById('name23').value;
      GM_setValue("spendenname23" , spendenname23);
      var spendenlink23 = document.getElementById('link23').value;
      GM_setValue("spendenlink23" , spendenlink23);
      var spendenname24 = document.getElementById('name24').value;
      GM_setValue("spendenname24" , spendenname24);
      var spendenlink24 = document.getElementById('link24').value;
      GM_setValue("spendenlink24" , spendenlink24);

      var spendenname25 = document.getElementById('name25').value;
      GM_setValue("spendenname25" , spendenname25);
      var spendenlink25 = document.getElementById('link25').value;
      GM_setValue("spendenlink25" , spendenlink25);
      var spendenname26 = document.getElementById('name26').value;
      GM_setValue("spendenname26" , spendenname26);
      var spendenlink26 = document.getElementById('link26').value;
      GM_setValue("spendenlink26" , spendenlink26);
      var spendenname27 = document.getElementById('name27').value;
      GM_setValue("spendenname27" , spendenname27);
      var spendenlink27 = document.getElementById('link27').value;
      GM_setValue("spendenlink27" , spendenlink27);
      var spendenname28 = document.getElementById('name28').value;
      GM_setValue("spendenname28" , spendenname28);
      var spendenlink28 = document.getElementById('link28').value;
      GM_setValue("spendenlink28" , spendenlink28);

      var spendenname29 = document.getElementById('name29').value;
      GM_setValue("spendenname29" , spendenname29);
      var spendenlink29 = document.getElementById('link29').value;
      GM_setValue("spendenlink29" , spendenlink29);
      var spendenname30 = document.getElementById('name30').value;
      GM_setValue("spendenname30" , spendenname30);
      var spendenlink30 = document.getElementById('link30').value;
      GM_setValue("spendenlink30" , spendenlink30);

    //};
alert("Dein eingegebener Name und der Link wurde gespeichhert ,Seite wird Relodet");
location.reload();
},false);
};

var spende1 = GM_getValue("spendenlink1");
var spende2 = GM_getValue("spendenlink2");
var spende3 = GM_getValue("spendenlink3");
var spende4 = GM_getValue("spendenlink4");
var spende5 = GM_getValue("spendenlink5");
var spende6 = GM_getValue("spendenlink6");
var spende7 = GM_getValue("spendenlink7");
var spende8 = GM_getValue("spendenlink8");
var spende9 = GM_getValue("spendenlink9");
var spende10 = GM_getValue("spendenlink10");
var spende11 = GM_getValue("spendenlink11");
var spende12 = GM_getValue("spendenlink12");
var spende13 = GM_getValue("spendenlink13");
var spende14 = GM_getValue("spendenlink14");
var spende15 = GM_getValue("spendenlink15");
var spende16 = GM_getValue("spendenlink16");
var spende17 = GM_getValue("spendenlink17");
var spende18 = GM_getValue("spendenlink18");
var spende19 = GM_getValue("spendenlink19");
var spende20 = GM_getValue("spendenlink20");
var spende21 = GM_getValue("spendenlink21");
var spende22 = GM_getValue("spendenlink22");
var spende23 = GM_getValue("spendenlink23");
var spende24 = GM_getValue("spendenlink24");
var spende25 = GM_getValue("spendenlink25");
var spende26 = GM_getValue("spendenlink26");
var spende27 = GM_getValue("spendenlink27");
var spende28 = GM_getValue("spendenlink28");
var spende29 = GM_getValue("spendenlink29");
var spende30 = GM_getValue("spendenlink30");




document.getElementById('spende').addEventListener('click', function speichern1() {
//var anzahl = document.getElementById('anzahl').value;
//GM_setValue("linkanzahl1", anzahl);

GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende1+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende2+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende3+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende4+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende5+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende6+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende7+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende8+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende9+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende10+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende11+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende12+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende13+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende14+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;// ok
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende15+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende16+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende17+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende18+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende19+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende20+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende21+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende22+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende23+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende24+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende25+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende26+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende27+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende28+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende29+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+spende30+'',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
GM_xmlhttpRequest({
  	method: 'GET',
   	url: 'http://change.pennergame.de/change_please/2636221/',
        onload: function(responseDetails) {
        var content = responseDetails.responseText;
}});
alert("Anzahl der Spendenlinks gespeichert! Seite wird neu geladen...");
location.reload();
}, false);

//setTimeout("document.getElementById('spende')[0].click();",2000);


// Copyright by basti1012
// Ein Teil dieses Scriptes habe ich von by Flying Dutchman (visit thx.spacequadrat.de)(spandenliste ) Übernommen,also Danke an ihn sonst würde das hier etwas anders aussehen 


}
}







