// ==UserScript==
// @name Transit V1.0
// @description Total des ressources en transit
// @include http://*ogame.fr/game/index.php*
// ==/UserScript==
url=location.href;
var egrave = String.fromCharCode(232);
	var eaigu = String.fromCharCode(233);	
	var ptvirg = String.fromCharCode(59);
	var deuxpts = String.fromCharCode(58);
		var Default_bewegteress = true;	
		var Default_handelsrechner = true;
		var HP_ID = 0; // zum Speichern der HP-ID
		var Default_max_tab_breite = 520;
		var Default_kursmet = '3';
		var Default_kurskris = '2';
		var Default_kursdeut = '1';
	var diese = String.fromCharCode(35);
	var WidthTableNeeded = 600;
	const cnst_ranking = ' classý  ';
	
function getElementsByClassName(clsName, htmltag, what)
				{
					var arr = new Array();
					var elems = document.getElementsByTagName(htmltag);
					var mmm = 0;
					for (var i = 0; i < elems.length; i++)
					{
						if (elems[i].className == clsName)
						{
							if (elems[i].getAttribute('onmouseover', 0).indexOf(what) + 1)
							{
								arr[mmm] = elems[i];
								mmm++;
							}
						}
					}
					return arr;
				}
		
		function trim(string){
	return string.replace(/(^\s*)|(\s*$)/g,'');
}		

	function RessEval(a, b)
					{
						var c = eval('/' + a + ': ([\.0-9]+)/');
						return parseInt(b.match(c)[1].replace(/\./g, ''), 10);
					}
		function RessLoop(a, b)
					{
						var s = getElementsByClassName(a, 'a', 'Métal');
						var c = d = e = 0, t = '';
						for (var i = 0; i < s.length; i++)
						{
							t = s[i].getAttribute('onmouseover');
							c += RessEval('Métal', t);
							d += RessEval('Cristal', t);
							e += RessEval('Deutérium', t);
						}
						if (c != 0 || d != 0 || e != 0)
						{
							code += '<tr><th>' + b + '</th><th>' + TausenderZahl(c) + '</th><th>' + TausenderZahl(d) + '</th><th>' + TausenderZahl(e) + '</th></tr>';
						}
						return new Array(c, d, e);
					}

function locate(xpath, xpres) {
	return document.evaluate(xpath, document, null, xpres, null);
}

function locateFirst(xpath) {
	return locate(xpath, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
}
		function FindeXPath(XPath)
		{
			var Wurzel = document;
			if (FindeXPath.arguments.length > 1) // weitere Argumente der Funktion
			{
				Wurzel = FindeXPath.arguments[1];
			}
			var Erg = document.evaluate(XPath, Wurzel, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
			var Arr = new Array();
			var AktKnoten = Erg.iterateNext();
			while (AktKnoten)
			{
				Arr[Arr.length] = AktKnoten;
				AktKnoten = Erg.iterateNext();
			}
			return Arr;
		}
				var ContDiv = FindeXPath('//div[@id="content"]')[0];
		function TausenderZahl(z)
		{
			z = String(Number(z));
			var i = z.length % 3;
			if (!i) { i = 3; }
			var erg = z.substr(0, i);
			for (; i < z.length; i += 3)
			{
				erg += '.' + z.substr(i, 3);
			}
			return erg;
		}
		
				function LadeAccEinst(Name, Default)
		{
			Default = (Default == undefined) ? eval('Default_' + Name) : Default;
			if (!HP_ID) { return Default; } // falls es nicht bekannt ist, welches der Account ist, den Defaultwert zurueckgeben
			return GM_getValue(Server + '_' + HP_ID + '_' + Name, Default); // Einstellung laden
		}
function GetServerName(){
	var ServerName = "";
	var sentenceIni = window.location.href;
	var sentence1 = "http://";
	var sentence2 = "/game/";
	var pos1 = sentenceIni.indexOf(sentence1,0);
	if (pos1 >= 0 ){
		var pos2 = sentenceIni.indexOf(sentence2,pos1+sentence1.length);
		ServerName = sentenceIni.substring(pos1+sentence1.length,pos2);
	}
	//alert(ServerName);
	return ServerName;
}
	function formatNmb(numero)
   {
	  var nNmb = String(numero); 
    var sRes = "";
    for (var j, i = nNmb.length - 1, j = 0; i >= 0; i--, j++)
     sRes = nNmb.charAt(i) + ((j > 0) && (j % 3 == 0)? ".": "") + sRes;
    return sRes;
   }
	function GetUniverse(){
	var ServerName = "";
	var sentenceIni = window.document.URL;
	var sentence1 = "http://uni";
	var sentence2 = ".ogame";
	var pos1 = sentenceIni.indexOf(sentence1,0);
	if (pos1 >= 0 ){
		var pos2 = sentenceIni.indexOf(sentence2,pos1+sentence1.length);
		Universe = sentenceIni.substring(pos1+sentence1.length,pos2);
	}
	return Universe;
}
if ((url.indexOf('/game/index.php?page=overview',0))>=0) {
				var code;
				code = "";
				if (LadeAccEinst('bewegteress') == true)
				{
					code += '<td class="c" colspan="4">Aperçu des ressources en transit :</td></tr>';
					code += '<tr><th><b>Mission</b></th><th><b>Métal</b></th><th><b>Cristal</b></th><th><b>Deutérium</b></th></tr>';
					var typ = new Array('owntransport', 'Transporter', 'owndeploy', 'Stationner', 'owncolony', 'Coloniser', 'ownhold', 'Stationner (Allié)', 'ownharvest', 'Exploiter', 'ownattack', 'Attaquer', 'ownfederation', 'Attaque groupée');
					var mkd = new Array();
					for (var i = 0; i < typ.length; i += 2) { mkd = mkd.concat(RessLoop(typ[i], typ[i + 1])); }
					var met = kris = deut = 0;
					for (var i = 0; i < mkd.length; i += 3) { met += mkd[i]; kris += mkd[i + 1]; deut += mkd[i + 2]; }
					code += '<tr><th><span style="color:yellow;">Total:</span></th><th><span style="color:yellow;">' + TausenderZahl(met) + '</span></th><th><span style="color:yellow;">' + TausenderZahl(kris) + '</span></th><th><span style="color:yellow;">' + TausenderZahl(deut) + '</span></th>';
				}
		if (LadeAccEinst('handelsrechner') == true)
				{
					code2 = '<br><tr><td class="c" colspan="5"><input type="text" id="kursmet" value="' + LadeAccEinst('kursmet') + '" size="4" style="border-color:yellow; color:yellow; text-align:center; font-weight:bold; background-color:transparent;">:<input type="text" id="kurskris" value="' + LadeAccEinst('kurskris') + '" size="4" style="border-color:yellow; color:yellow; text-align:center; font-weight:bold; background-color:transparent;">:<input type="text" id="kursdeut" value="' + LadeAccEinst('kursdeut') + '" size="4" style="border-color:yellow; color:yellow; text-align:center; font-weight:bold; background-color:transparent;"></th></tr>';
					var tablenode = document.getElementsByTagName('table');
					var f=0;
					while (f<tablenode.length){
					var sentence1 = "Heure du serv"
					var sentence2 = "veur";
					var pos1 = (tablenode[f].innerHTML).indexOf(sentence1,0);
						if (pos1>=0) {
						var pos2 = (tablenode[f].innerHTML).indexOf(sentence2,pos1);
						var Sentence  = (tablenode[f].innerHTML).substring(pos1,pos2+sentence2.length);
					tablenode[f].innerHTML += code;
						}
					f++;
					}
				}
}