// ==UserScript==
// @name         Pennergame Kampfwert errechner by basti1012
// @namespace    basti1012 by pennerhack visit(http://pennerhack.foren-city.de
// @author       basti1012 by pennerhack.foren-city.de
// @description   einfach att und def werte eingeben ,oder mit plunder banden tier und co infos ,dann errechnet dir das script den kampfwert
// @include      http://*.pennergame.de/overview/
// @version      1.0
// ==/UserScript==

var div_settingpoint = document.getElementsByClassName('settingpoint');
var div_tieritemA = document.getElementsByClassName('tieritemA');

newdiv = document.createElement('div');
newdiv.setAttribute('class', 'tieritemA');
newdiv.style.width = "445px";
newdiv.innerHTML = ''


+'<form action = "skills.php" method= "post"></p></p><p>Bitte <a onmouseover="Tip("Grundskills sind die Werte die du unter Weiterbildungen findest. Bitte nicht zu verwechseln mit den Lets Fight-Werten")" onmouseout="UnTip()"> Grundskills </a> eingeben</p>'
+'Angriff <a onmouseover="Tip("Bitte gib hier deinen Skill ein")" onmouseout="UnTip()"> [?] </a>   <input name = "att" size="2"> Verteidigung <a onmouseover="Tip("Bitte gib hier deinen Skill ein")" onmouseout="UnTip()"> [?] </a> <input name = "def"size="2"> <p><p>Haustier<select name="tier"><option value="t00"> Bitte wähle dein Haustier'
+'<option value="t01"> Silberfisch<option value="t02"> Grasfrosch<option value="t03"> Rotkehlchen<option value="t04"> Clownfisch<option value="t05"> Erdmännchen<option value="t06"> Möwe<option value="t07"> Opussum<option value="t08"> Streifenhörnchen<option value="t09"> Igel<option value="t10"> Hausschwein<option value="t11"> Schneeeule'
+'<option value="t12"> Bisamratte<option value="t13"> Moorschnucke<option value="t14"> Yorkshire Terrier<option value="t15"> Habicht<option value="t16"> Border Collie<option value="t17"> Dogge<option value="t18"> Golden Retriever<option value="t19"> Mops<option value="t20"> Elch<option value="t21"> Zebtra<option value="t22"> Kamel'
+'<option value="t23"> Schnappschildkröte<option value="t24"> Leopard<option value="t25"> Waschbär<option value="t26"> Tapir<option value="t27"> T-Rex<option value="t28"> Braunbär<option value="t29"> Phoenix<option value="t30"> Dressierte Mau</select><p>Eigenheim<select name="eigenheim"><option value="e00">Bitte wähle dein Eigenheim'
+'<option value="e01"> Bürgersteig<option value="e02"> Park<option value="e03"> Treptower Park<option value="e04"> Tonne<option value="e05"> Wannsee<option value="e06"> Warschauer Brücke<option value="e07"> Bunker<option value="e08"> Spree<option value="e09"> Dixiklo<option value="e10"> Litfassäule<option value="e11"> Dönerbude'
+'<option value="e12"> Ausgemusterter Imbisswagen<option value="e13"> Alter Kiosk<option value="e14"> Stillgelegter U-Bahnschacht<option value="e15"> Mauerreste<option value="e16"> Datsche<option value="e17"> Kanalistation<option value="e18"> Verwaistes Ansagerhäuschen<option value="e19"> Alter Wachturm<option value="e20">'
+' Schloss Charlottenburg<option value="e21"> Fernsehturm<option value="e22"> Bundeskanzleramt</select><p>Waffe<select name="waffe"><option value="w00">Bitte wähle deine Waffe<option value="w01"> Imbiss-Zahnstocher<option value="w02"> Abgebrochene Flasche<option value="w03"> Wasserbomben<option value="w04"> Böller<option value="w05">'
+' Spraydose<option value="w06"> Ledergürtel<option value="w07"> Gummiknüppel<option value="w08"> Gullydeckel<option value="w09"> Kettenschloss<option value="w10"> Schlagring<option value="w11"> Rohr<option value="w12"> Hammer<option value="w13"> Pfefferspray<option value="w14"> Elektroschocker<option value="w15"> Feuerlöscher'
+'<option value="w16"> Schwert<option value="w17"> Alte Knarre<option value="w18"> Dirty Harry (Pistole)<option value="w19"> Maschinenpistole<option value="w20"> Double Barrel Shotgun<option value="w21"> Riesenkanone<option value="w22"> Derber Panzer<option value="w23"> Atombombe<option value="w24"> Schwarzes Loch</select><p>'
+'Angelegter Plunder<select name="plunder1"><option value="p00">Bitte wähle deinen Plunder<option value="p01">Eierschalen<option value="p02">Zerplatzes Ei<option value="p03">Regenmantel<option value="p04">Rostiger Nagel<option value="p05">Marodes Holzbrett<option value="p06">Murmel<option value="p07">Deoreste<option value="p08">'
+'Hopfen<option value="p09">Altes Wasser<option value="p10">Tonofen<option value="p11">Bierfass<option value="p12">Glasscherbe<option value="p13">Kürbiskopf<option value="p15">Textilfetzen<option value="p16">Zertrümmerte Vase<option value="p17">Verdreckter Zauberstab<option value="p18">Pinke Schleife<option value="p19">Blaue Schleife'
+'<option value="p20">Malfarben<option value="p21">Seife<option value="p22">Kaputte Schuhe<option value="p23">Kaputter Regenschirm<option value="p24">Klebstof<option value="p25">Faden<option value="p26">Floh<option value="p27">Styroporkügelchen<option value="p28">Geldbeutel<option value="p29">"Haustiertricks für Vollidioten"<option value="p30">'
+'Verbogenes Fahrrad<option value="p31">Fussball<option value="p32">Kaputter Fußball<option value="p33">Stofftier<option value="p34">Rostiges Taschenmesser<option value="p35">Vermoderter Holzroller<option value="p36">Kleeblatt<option value="p37">Kaputte Brille<option value="p38">Cowboystiefel<option value="p39">Dose "Dr. Penner"<option value="p40">'
+'Regenschirm<option value="p41">Erste Hilfe Koffer<option value="p42">Skateboard<option value="p43">Lexikon<option value="p44">Dir unbekanntes Artefakt<option value="p45">Alter Mofamotor<option value="p46">Tageskarte<option value="p47">Schilf<option value="p48">Schnürsenkel<option value="p49">Schilfrohrbogen<option value="p50">Goldenes Kleeblatt'
+'<option value="p51">I-WIN (Berlin)<option value="p52">Hussmans Spezialwaffe<option value="p53">Rostiger Angelhaken<option value="p54">Alte Hockey Torwartausrüstung<option value="p55">Boxhandschuhe<option value="p56">Jetpack<option value="p57">Goldenes Bier<option value="p58">Nagelkeule<option value="p59">Holzschild<option value="p60">Stachelschild'
+'<option value="p61">Glasstachelschild<option value="p62">Ramponierter Anzug<option value="p63">DoppeltesHolzschild<option value="p64">Feiner Anzug<option value="p65">Fester Holzpanzer<option value="p66">Scherbengranate</select><p><p>Waffenkammer (in %)<a onmouseover="Tip("Bitte gib hier den Wert ein, den du unter Bandeneigentümer findest - Waffenkammer")" onmouseout="UnTip()">'
+' [?] </a>  <input name = "bandekammer" size="2"> Bandenhaus (in %) <a onmouseover="Tip("Bitte gib hier den Wert ein, den du unter Bandeneigentümer findest - Bandenhaus")" onmouseout="UnTip()"> [?] </a> <input name = "bandehaus" size="2">'


+'<input type = "button" id="erstes" name="erstes" value="absenden">'
+'<input type = "reset"><p></form><p>Kampfrechner nur mit deinen Att und ef Werten</p>'
+'<form action = "skills2.php" method= "post"><p>Bitte Werte aus der Übersicht eingeben</p>ATT   '
+'<input name = "exatt" size="2">'
+' DEF <input name = "exdef"size="2"> <p><p>'
+'<input type = "button" id="erstes1" name="erstes1" value="absenden">'
+'<input type = "reset"><p><p><p><p><p><p></form>'
+'<div id="ausgabe" name="ausgabe"</div>';
div_settingpoint[0].insertBefore(newdiv, div_tieritemA[div_tieritemA.length-5]);


document.getElementById('erstes').addEventListener('click', function linktklickerone() {


att = document.getElementsByName('att')[0].value;
def = document.getElementsByName('def')[0].value;
tier = document.getElementsByName('tier')[0].value;
heim = document.getElementsByName('eigenheim')[0].value;
waffe = document.getElementsByName('waffe')[0].value;
plunder1 = document.getElementsByName('plunder1')[0].value;
kammer = document.getElementsByName('bandekammer')[0].value;
haus = document.getElementsByName('bandehaus')[0].value;

    GM_xmlhttpRequest(
    {
      method: 'POST',
      url: 'http://www.my-pennergame.de/skills.php',
      headers: 
      {'Content-type': 'application/x-www-form-urlencoded'},
      data: encodeURI('att='+att+'&def='+def+'&tier='+tier+'&eigenheim='+heim+'&waffe='+waffe+'&plunder1='+plunder1+'&bandekammer='+kammer+'&bandehaus='+haus+''),
      		onload: function(responseDetails){
     			 var content = responseDetails.responseText;
			 var tab = content.split("'content'></a>")[1];
			 var tabl = tab.split('<tr>')[0];
			document.getElementById('ausgabe').innerHTML = ''+tabl+'<br>Vielen Dank da sie meine Scripte nutzen .<br>Bitte schaun sie mal rein <a href="http://pennerhack.foren-city.de">Seite von Basti1012</a>';
		}
    });
},false);


document.getElementById('erstes1').addEventListener('click', function linktklickerone() {
exdef = document.getElementsByName('exdef')[0].value;
exatt = document.getElementsByName('exatt')[0].value;
    GM_xmlhttpRequest({
      		method: 'POST',
      		url: 'http://www.my-pennergame.de/skills2.php',
      		headers: 
      		{'Content-type': 'application/x-www-form-urlencoded'},
      		data: encodeURI('exatt='+exatt+'&exdef='+exdef+''),
      		onload: function(responseDetails){
     			 var content = responseDetails.responseText;
			 var tab = content.split("'content'></a>")[1];
			 var tabl = tab.split('<tr>')[0];
			document.getElementById('ausgabe').innerHTML = ''+tabl+'<br>Vielen Dank da sie meine Scripte nutzen .<br>Bitte schaun sie mal rein <a href="http://pennerhack.foren-city.de">Seite von Basti1012</a>';
		}
    });
},false);





// Copyright by basti1012




