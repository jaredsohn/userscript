// ==UserScript==
// @name           Trauto
// @namespace      http://taguri.org/
// @include        http://ts4.travian.hu/*
// @resource Vanooo http://pandageci.freewebsitehosting.com/Vanooo.txt
// @resource template http://pandageci.freewebsitehosting.com/template.txt
// ==/UserScript==
var SUC_script_num = 126518; //ezt nem valtoztatni
var felhasznalo = "Vanooo";//ide kell beirni a sajat felhasznalod es a "@resource template"-t átírni  "@resource felhasznalonév"-re
var oazisStr = GM_getResourceText(felhasznalo);
var egysegek = {"phalanx" : "t1", "kardos" : "t2", "felderito" : "t3", "villam" : "t4", "druida" : "t5", "haeduan" : "t6", "rombolo" : "t7","katapult" : "t8","torzsfonok" : "t9","telepes" : "t10","hos" : "t11","legio" : "t1", "testor" : "t2" ,"birodalmi" : "t3", "legati" : "t4","imperatori" : "t5","cesaris" : "t6","kos" : "t7","szenator" : "t9"};
var onoff = {"0" : "Off", "1" : "On"};
var faluk = {"90857": "[03]", "87409":"[02]", "77884":"[01]", "60989":"[00]"};
var t_timeout = Math.floor(Math.random()*1800001);
var FaluLista = new Array();
var OazisLista = new Array();
var EpitesLista = new Array();
var KatonaLista = new Array();
var jelenlegiMP = t_timeout.toFixed();
if (t_timeout > 1000){
	jelenlegiMP = t_timeout/1000;
	jelenlegiMP = jelenlegiMP.toFixed();
}
t_timeout = t_timeout.toFixed();

//todo:Prompting.....var n = prompt("Check your number", "Type your number here");
ParseString(oazisStr);
document.title = onoff[GM_getValue("TravAutomat", "0")] +": (" + GM_getValue("GMcounter", "0") + "->" + OazisLista[GM_getValue('GMcounter', '0')].tamadok[0].darab+")";
var allButtonTags=document.getElementsByTagName("button");
for (i=0; i<allButtonTags.length; i++){
	if(allButtonTags[i].value == "Belépés")
	{
		SetFelhasznalo(felhasznalo);
		window.setTimeout(Login, 1000);
	}
}
ProbaljTamadni()
TamadasStatusz();
//AddMarket();
window.addEventListener("load", function(e) {AddButton();}, false);
if(window.location.href == "http://ts4.travian.hu/berichte.php"){
	var allCheckBoxes=document.getElementsByClassName("check");
	if(allCheckBoxes.length > 0)
	{
		AddCheckBoxButton();
	}
}
 
function CheckMind(){
	var allCheckBoxes=document.getElementsByClassName("check");
	if(allCheckBoxes.length != 0)
	{
		for (i=0; i<allCheckBoxes.length; i++){
			allCheckBoxes[i].checked = true ;
		}
	}
}
function addCheckBoxButtonListener(){
  var button = document.getElementById("checkmind");
  button.addEventListener('click',CheckMind,true);
}
function AddCheckBoxButton(){
	var endDiv = document.getElementById("del");
	
	if(endDiv != null)
	{
		var element = document.createElement("input");
		element.setAttribute("type", "button");
		element.setAttribute("value", "Check Mind");
		element.setAttribute("id", "checkmind");
		endDiv.parentNode.appendChild(element);
		addCheckBoxButtonListener();
	}
}
function addButtonListener(){
	/* var buttonID = new Array("on/off", "showuzenet", "resetuzenet", "showepites", "resetepites", "checkoazis");
	var buttonRole = new Array("ToggleAutomat()", "ShowUzenetek()", "ResetUzenetek", "ShowEpitesUzenetek", "CheckOazis");
	for(i = 0; i<buttonID.length; i++)
	{
		var button = document.getElementById(buttonID[i]);
		if(button != null)
		{
			button.addEventListener('click',buttonRole[i],true);
		}
	} */
	
	var button = document.getElementById("on/off");
	button.addEventListener('click',ToggleAutomat,true);
	button = document.getElementById("showuzenet");
	button.addEventListener('click',ShowUzenetek,true);
	button = document.getElementById("resetuzenet");
	button.addEventListener('click',ResetUzenetek,true);
	button = document.getElementById("showepites");
	button.addEventListener('click',ShowEpitesUzenetek,true);
	button = document.getElementById("resetepites");
	button.addEventListener('click',ResetEpitesUzenetek,true);
	button = document.getElementById("checkoazis");
	if(button != null)
	{
		button.addEventListener('click',CheckOazis,true);
	}
}
function AddButton(){
	var endDiv = document.getElementsByClassName("list");
	if(endDiv.length == 1)
	{
		if(window.location.href.indexOf("http://ts4.travian.hu/a2b.php?") != -1)
		{
			endDiv[0].innerHTML = endDiv[0].innerHTML + '<br/><div style="text-align:center"><input type="button" id="on/off" value="On/Off"/><br/><input type="button" id="showuzenet" value="ShowUzenet"/><input type="button" id="resetuzenet" value="ResetUzenet"/><br/><input type="button" id="showepites" value="Epites Uzenetek"/><input type="button" id="resetepites" value="Reset Epites"/><input type="button" id="checkoazis" value="Check Oazis"/></div>';
		}
		else
		{
				endDiv[0].innerHTML = endDiv[0].innerHTML + '<br/><div style="text-align:center"><input type="button" id="on/off" value="On/Off"/><br/><input type="button" id="showuzenet" value="ShowUzenet"/><input type="button" id="resetuzenet" value="ResetUzenet"/><br/><input type="button" id="showepites" value="Epites Uzenetek"/><input type="button" id="resetepites" value="Reset Epites"/></div>';
		}
		if(GM_getValue('NoFight', '0') == 1)
		{
			endDiv[0].innerHTML = endDiv[0].innerHTML + '<br/><div style="color:red;text-align:center"><b>NoFight is On!!!</b></div>';
		}
		addButtonListener();
	}
}
function AddMarket(){
	var entryClassElements = document.getElementsByClassName("entry");
	for (i=0; i<entryClassElements.length; i++)
	{
		var id = entryClassElements[i].innerHTML.split("?newdid=")[1];
		id = id.split('"')[0];
		var anchor = entryClassElements[i].getElementsByTagName('*')[0];
		anchor.style.width = "25%";
		anchor.style.display = "text";
		entryClassElements[i].innerHTML = entryClassElements[i].innerHTML + "-><a href='http://ts4.travian.hu/build.php?newdid=?newdid="+id.split("&")[0]+"&id=34&gid=17' style='width: 25%;display:text'>Piac</a>";
	}
}

function ParseString(parseString){
	//kiolvassa a resourcebol az ojjektumokat es letrehozza oket
	var kommentnelkul = parseString.split("*/")[1];
	var oazisEgyseg = kommentnelkul.split("\n");
	
	for(i=1;i<oazisEgyseg.length;i++)
	{
		var falue = oazisEgyseg[i].split("falu:");
		var epitese = oazisEgyseg[i].split("epites:");
		var katonae = oazisEgyseg[i].split("katona:");
		
		if(falue.length == 2) //falu id
		{
			AddFaluLista(falue[1]);
		}
		else if(epitese.length == 2)//epites link
		{
			AddEpitesLista(epitese[1]);
		}
		else if(katonae.length == 2)//katonlink
		{
			AddKatonaLista(katonae[1]);
		}
		else//oazis vagy falu link
		{
			AddOazisLista(oazisEgyseg[i]);
		}
	}
}
function AddOazisLista(oazisEgyseg){
	var foglalte = 0;
	//http://ts4.travian.hu/a2b.php?z=378374;phalanx_20@kardos_10@villam_8€foglalt$komment
	var foglaltStr = oazisEgyseg.split("€");
	if(foglaltStr.length == 2)
	{
		foglalte = 1;
	}
	foglaltStr = foglaltStr[0].split("$");//kommentet levagja
	var oazisLink = oazisEgyseg.split(";")[0];
	var tamadoEgyseg = foglaltStr[0].split(";")[1].split("@");
	var tamadokTmp = new Array();
	for(j=0;j<tamadoEgyseg.length;j++)
	{
		tamadokTmp[j] = new Tamado(tamadoEgyseg[j].split("_")[0], tamadoEgyseg[j].split("_")[1]);
	}
	
	OazisLista[OazisLista.length] = new Oazis(oazisLink, tamadokTmp, foglalte);	
}
function AddFaluLista(faluid){
	FaluLista[FaluLista.length] = faluid.split("$")[0];
}
function AddEpitesLista(epitesEgyseg){
	//epites:    
	//http://ts4.travian.hu/build.php?newdid=77884&id=4;Szint 10$favago galandfala
	var epitesLink = epitesEgyseg.split(";")[0];
	var szint = epitesEgyseg.split(";")[1].split("$")[0];
	EpitesLista[EpitesLista.length] = new Epites(epitesLink, szint);	
}
function AddKatonaLista(katonaEgyseg){
	//katona:
	//http://ts4.travian.hu/build.php?newdid=60989&id=32&gid=19;phalanx_1$kalandfala
	var katonaLink = katonaEgyseg.split(";")[0];
	var egyseg = katonaEgyseg.split(";")[1].split("_")[0];
	var darab = katonaEgyseg.split(";")[1].split("_")[1].split("$")[0];
	KatonaLista[KatonaLista.length] = new Katona(katonaLink, egyseg, darab);	
}
function Tamado(egyseg, darab){
	//letrehoz egy Tamado ojjektumot
	this.egyseg = egyseg;
	this.darab = darab;
}
function Epites(link, szint){
	//letrehoz egy Epites ojjektumot
	this.link = link;
	this.szint = szint;
}
function Katona(link, egyseg, darab){
	this.link = link;
	this.egyseg = egyseg;
	this.darab = darab;
}
function Oazis(link, tamadok, foglalt){
	//letrehoz egy Oazis ojjektumot
	this.link = link;
	this.tamadok = tamadok;
	this.foglalt = foglalt;
}

function TamadasStatusz(){
	var huseg = document.getElementById("villageNameField");
	if (huseg != null)
	{
		huseg.innerHTML = huseg.innerHTML+"<span class='loyalty high'> " + onoff[GM_getValue("TravAutomat", "0")] + " (" + GM_getValue('GMcounter', '0') + "->" + OazisLista[GM_getValue('GMcounter', '0')].tamadok[0].darab + "/" + (OazisLista.length - 1) + ")</span>";
	}
}
function Login(){
	var allButtonTags=document.getElementsByTagName("button");
	for (i=0; i<allButtonTags.length; i++)
	{
		if(allButtonTags[i].value == "Belépés")
		{
			allButtonTags[i].click();
		}
	}
}
function SetFelhasznalo(nev){
//beirja a felhasznalo textboxba a felhasznalo nevet
	var allInputTags=document.getElementsByTagName("input");
	for (i=0; i<allInputTags.length; i++)
	{
		if(allInputTags[i].name == "name")
		{
			allInputTags[i].value = nev;
		}
	}
}

function ProbaljKepezni(){
	//katonakat probal kepezni
	if(parseInt(GM_getValue("GMKatonacounter", '0')) < KatonaLista.length)
	{
		//az epitendo linken vagyunk
		if(window.location.href == KatonaLista[GM_getValue("GMKatonacounter", "0")].link)
		{
			//megnezzuk vannak-e kikepzes alatt
			var kikepzesalatt = document.getElementsByClassName("round spacer");
			if(kikepzesalatt.length == 0)
			{
				//nincs kikepzes, megnezzuk, hogy lehet-e kikepezni
				//megkeressuk a kepzendo katona dobozat
				var allInputTags=document.getElementsByTagName("input");
				for (i=0; i<allInputTags.length; i++)
				{
					if(allInputTags[i].name==egysegek[KatonaLista[GM_getValue("GMKatonacounter", "0")].egyseg])
					{
						if(parseInt(allInputTags[i].nextSibling.nextSibling.nextSibling.innerHTML) >= parseInt(KatonaLista[GM_getValue("GMKatonacounter", "0")].darab))
						{
							allInputTags[i].value = KatonaLista[GM_getValue("GMKatonacounter", "0")].darab;
						}
						else if(parseInt(allInputTags[i].nextSibling.nextSibling.nextSibling.innerHTML) == 0)
						{
							GM_setValue('GMKatonacounter', parseInt(GM_getValue('GMKatonacounter', '0')) + 1);
							location.reload(true);
						}
						else
						{
							allInputTags[i].value = allInputTags[i].nextSibling.nextSibling.nextSibling.innerHTML;
						}
						//megnyomjuk a kikepzes gombot
						var kepzesOjjekt =  document.getElementsByClassName("button-contents");
						var kepzesGomb = null;
						for (i=0; i<kepzesOjjekt.length; i++)
						{
							if(kepzesOjjekt[i].innerHTML=="Kiképzés")
							{
								kepzesGomb = kepzesOjjekt[i];
							}
						} 
						if(kepzesGomb != null)
						{
							//megnyomja a kepzes gombot es megy is kovetkezo egysegre
							GM_setValue('GMKatonacounter', parseInt(GM_getValue('GMKatonacounter', '0')) + 1);//increment katona counter
							//megnezzuk, hogy van-e eleg buza
							//ha kevesebb van mint 10 akkor nem kepezunk tovabb, hogy legyen elelem az epitesre
							var elelem = document.getElementById("l5");
							if(elelem != null)
							{
								//tobb a buza mint 10
								if((elelem.innerHTML.split("/")[1] - elelem.innerHTML.split("/")[0]) > 10)
								{
									kepzesGomb.click();
								}
								else//ha nem, megyunk tovabb
								{
									GM_setValue('Uzenetek', GM_getValue('Uzenetek', "") + "\n " + new Date().toLocaleTimeString() + ":  nem képezünk katonát, mert nincs elég búza (" + GetFalunev() + ");");
									window.location.href = "http://ts4.travian.hu/dorf1.php";
								}
							}
						}
					}
				}
			}
			else
			{
				//kikepzes folyik (nem eroltetjuk, megyunk tovabb)
				GM_setValue('GMKatonacounter', parseInt(GM_getValue('GMKatonacounter', '0')) + 1);
				window.location.href = "http://ts4.travian.hu/dorf1.php";
			}
		}
		else
		{
			//navigal a katonas linkre
			window.location.href = KatonaLista[GM_getValue('GMKatonacounter', '0')].link;
		}
	}
	else
	{
		ResetKatonaCounters();
	}
}
function ProbaljEpiteni(){
	if(parseInt(GM_getValue("GMEpitescounter", '0')) < EpitesLista.length)
	{
		//az epitendo linken vagyunk
		if(window.location.href == EpitesLista[GM_getValue("GMEpitescounter", "0")].link)
		{
		//alert("itt");
			//megnezzuk, hogy elertuke a kivan szintet
			var szint =  document.getElementsByClassName("level");
			//alert(szint);
			if(szint.length == 1)
			{	
				//alert("itt");
				GM_log(EpitesLista[GM_getValue('GMEpitescounter', '0')].szint +"=="+ szint[0].innerHTML);
				if(EpitesLista[GM_getValue('GMEpitescounter', '0')].szint == szint[0].innerHTML){
					GM_setValue('EpitesUzenetek', GM_getValue('EpitesUzenetek', "") + "\n " + new Date().toLocaleTimeString() + ": " + EpitesLista[GM_getValue('GMEpitescounter', '0')].link + " ki van epitve a kivant szintre;");
					GM_setValue('GMEpitescounter', parseInt(GM_getValue('GMEpitescounter', '0')) + 1);
					location.reload(true);
				}
				else
				{
					//alert("itt");
					var epitesOjjekt =  document.getElementsByClassName("build");
					var epitesGomb = null;
					for (i=0; i<epitesOjjekt.length; i++)
					{
						if(epitesOjjekt[i].type=="button")
						{
							epitesGomb = epitesOjjekt[i];
						}
					}
					if(epitesGomb != null)
					{
						//lehet epiteni
						GM_setValue('EpitesUzenetek', GM_getValue('EpitesUzenetek', "") + "\n  " + new Date().toLocaleTimeString() + ":" + EpitesLista[GM_getValue('GMEpitescounter', '0')].link + " ki lett epitve a " + szint[0].innerHTML + "+1-re " + GetFalunev() + ";");
						GM_setValue('GMEpitescounter', parseInt(GM_getValue('GMEpitescounter', '0')) + 1);
						epitesGomb.click();
					}
					else
					{
						//nem lehet epiteni
						GM_setValue('GMEpitescounter', parseInt(GM_getValue('GMEpitescounter', '0')) + 1);
						location.reload(true);
					}
				}
			}
		}
		else
		{
			//navigal az epitendo linkre
			window.location.href = EpitesLista[GM_getValue('GMEpitescounter', '0')].link;
		}
	}
	else
	{
		ResetEpitesCounters();
	}
}
function ProbaljTamadni(){
	//ha nem login ablak
	if((window.location.href != "http://ts4.travian.hu/login.php") && (GM_getValue("TravAutomat", "0") == 1)){
		if(GM_getValue('CheckingAllatok', '0') == 1)
		{
			CheckingAllatok();
		}
		else if(GM_getValue('EpitesAlatt', '0') == 1)
		{
			ProbaljEpiteni();
		}
		else if(GM_getValue('KepzesAlatt', '0') == 1)
		{
			ProbaljKepezni();
		}
		else
		{
			if(GM_getValue('GMcounter', '0') < OazisLista.length)
			{
				if(GM_getValue('NoFight', '0') == 0)
				{
					Tamadas();
				}
				else
				{
					EpitEsKepez();
				}
			}
			else
			{
				ResetCounter();
			}
		}
	}
}
function GetFalunev(){
	var allActiveTags = document.getElementsByClassName("active");
	return (allActiveTags[allActiveTags.length - 1].innerHTML);
	
}

function BuildLink(id){
	return "http://ts4.travian.hu/a2b.php?newdid=" + FaluLista[GM_getValue('Falucounter', '0')]+"&z=" + OazisLista[GM_getValue('GMcounter', '0')].link;
}
function EpitEsKepez(){
	if ((parseInt(GM_getValue('Epites_last_check', '0')) + 900000 <= (new Date().getTime()))) // minden 15 percben (900 s * 1000 ms)
	{
		GM_setValue('Epites_last_check', new Date().getTime()+'');
		GM_setValue('EpitesAlatt', '1');
		ProbaljEpiteni();
	}
	if ((parseInt(GM_getValue('Kepzes_last_check', '0')) + 900000 <= (new Date().getTime()))) // minden 15 percben (900 s * 1000 ms)//megnezi lehet-e katonat fejleszteni
	{
		GM_setValue('Kepzes_last_check', new Date().getTime()+'');
		GM_setValue('KepzesAlatt', '1');
		ProbaljKepezni();
	}
}
function CheckingAllatok(){
	var allTdTags = document.getElementsByTagName("td");
	GM_setValue("TamadOazis", "0");
	for(i=0; i<allTdTags.length;i++)
	{
		if(allTdTags[i].innerHTML == "nincs")
		{
			GM_setValue("TamadOazis", "1");
		}
	}
	var allThTags = document.getElementsByTagName("th");
	for(i=0; i<allThTags.length;i++)
	{
		if(allThTags[i].innerHTML == "Tulajdonos:")
		{
			GM_setValue("TamadOazis", "2");
		}
	}
	GM_setValue('CheckingAllatok', '0');
	window.location.href =  BuildLink(OazisLista[GM_getValue('GMcounter', '0')].link);
}
function CheckingOazisAllatokra(){
	GM_setValue('CheckingAllatok', '1');
	var isTermeszet = 0;
	var koordinata = "";
	//http://ts4.travian.hu/position_details.php?x=-93&y=-75
	var allAnchorTags = document.getElementsByTagName("a");
	//megnézzük, hogy a támadott Természet.
	for(i=0; i<allAnchorTags.length;i++)
	{
		if((allAnchorTags[i].href == "http://ts4.travian.hu/spieler.php?uid=0")&&(allAnchorTags[i].innerHTML == "Természet"))
		{
			isTermeszet = 1;
		}
	}
	//ha természet akkor megnézzük, hogy van-e állat benne
	if(isTermeszet == 1)
	{
		//karte.php?x=-99&amp;y=-72
		for(i=0; i<allAnchorTags.length;i++)
		{
			if(allAnchorTags[i].href.indexOf("karte.php?x=") != -1)
			{
				koordinata = allAnchorTags[i].href.split("?")[1];
				GM_log("koordinata:" + koordinata);
			}
		}
		//navigal az ellenorizendo oazisra.
		window.location.href = "http://ts4.travian.hu/position_details.php?"+koordinata;
	}
	//ha nem természet
	else
	{
		var coordText =  document.getElementsByClassName("coordText");
		//megnézzük, hogy Elfoglalt oázis
		if((coordText.length != 0) && (coordText[0].innerHTML == "Elfoglalt oázis"))
		{
			GM_setValue("TamadOazis", "2");
			GM_setValue('CheckingAllatok', '0');
			GM_log("elfoglalt oazis:" + OazisLista[GM_getValue('GMcounter', '0')].link);
			window.location.href =  BuildLink(OazisLista[GM_getValue('GMcounter', '0')].link);
		}
		else
		{
			//ha nem, akkor támadjuk meg
			GM_setValue("TamadOazis", "1");
			GM_setValue('CheckingAllatok', '0');
			GM_log("ez falu:" + OazisLista[GM_getValue('GMcounter', '0')].link);
			window.location.href =  BuildLink(OazisLista[GM_getValue('GMcounter', '0')].link);
		}
	}
}
function Tamadas(){
	if(window.location.href != BuildLink(OazisLista[GM_getValue('GMcounter', '0')].link))
	{
		//kuldes
		if(window.location.href == "http://ts4.travian.hu/a2b.php")
		{
			var kuldes = document.getElementById("btn_ok");
			var errorClass = document.getElementsByClassName("error");
			if(errorClass.length == 0)
			{	
				GM_log("Tamadasnal checkOazisAllatokra:" + GM_getValue('CheckOazisAllatokra', '0'));
				if(GM_getValue('CheckOazisAllatokra', '0') == 0)
				{
					CheckingOazisAllatokra();
					GM_setValue('CheckOazisAllatokra', '1');
				}
				else
				{
					GM_log("Tamadasnal TamadOazis:" + GM_getValue("TamadOazis", "0"));
					if(GM_getValue('TamadOazis', '0') == "1")
					{
						kuldes.click();
						GM_setValue('TamadOazis', '0');
						GM_setValue('CheckOazisAllatokra', '0');
					}
					else//tovabb kell menjen
					{
						if(GM_getValue('TamadOazis', '0') == 0)
						{
							GM_setValue('Uzenetek', GM_getValue('Uzenetek', "") + "\n  " + new Date().toLocaleTimeString() + ":" + OazisLista[GM_getValue('GMcounter', '0')].link + "("+ GM_getValue('GMcounter', '0')+") oazist nem tamadta meg mert vannak allatok;");
						}
						if(GM_getValue('TamadOazis', '0') == 2)
						{
							GM_setValue('Uzenetek', GM_getValue('Uzenetek', "") + "\n   " + new Date().toLocaleTimeString() + ":" + OazisLista[GM_getValue('GMcounter', '0')].link + "(" + GM_getValue('GMcounter', '0')+") oazist nem tamadta meg mert foglalt;");
						}
						
						GM_setValue('TamadOazis', '0');
						GM_setValue('CheckOazisAllatokra', '0');
						IncrementCounter();
					}
				}
			}
			else
			{
				if(errorClass[0].innerHTML == "Ezeken a koordinátákon nem található falu")
				{
					GM_setValue('Uzenetek', GM_getValue('Uzenetek', "") + "\n  " + OazisLista[GM_getValue('GMcounter', '0')].link + "(" + GM_getValue('GMcounter', '0') + ") " + errorClass[0].innerHTML+";");
					IncrementCounter();
				}
			}
		}
		//elkuldve
		else if(window.location.href == "http://ts4.travian.hu/build.php?gid=16")
		{
			IncrementCounter();
		}
		else
		{
			if(OazisLista[GM_getValue('GMcounter', '0')].foglalt == 0)
			{
				window.location.href = BuildLink(OazisLista[GM_getValue('GMcounter', '0')].link);
			}
			else
			{
				IncrementCounter();
			}
		}
	}
	else
	{
		var kivalasztva = 0;
		
		var allInputTags=document.getElementsByTagName("input");
		for(k = 0;k<OazisLista[GM_getValue('GMcounter', '0')].tamadok.length;k++)
		{
			kivalasztva = kivalasztva + ValasszHarcost(egysegek[OazisLista[GM_getValue('GMcounter', '0')].tamadok[k].egyseg], OazisLista[GM_getValue('GMcounter', '0')].tamadok[k].darab);
		}
	}
		
	//GM_log("kivalasztva="+kivalasztva);
	if(kivalasztva == 0)
	{
		for (i=0; i<allInputTags.length; i++){
			if(allInputTags[i].name=="c"  && allInputTags[i].className == "radio" && allInputTags[i].value == "4"){
				allInputTags[i].checked = true;
			}
		}
		var kuldes = document.getElementById("btn_ok");
		kuldes.click();
	}
}
function IncrementCounter(){
	GM_setValue("GMcounter", parseInt(GM_getValue('GMcounter', '0')) + 1 + "");
	if(GM_getValue('GMcounter', '0') < OazisLista.length)
	{
		if(OazisLista[parseInt(GM_getValue('GMcounter', '0'))].foglalt == 0)
		{
			window.location.href = BuildLink(OazisLista[parseInt(GM_getValue('GMcounter', '0'))].link);
		}
		else
		{
			location.reload(true);			
		}
	}
	else
	{
		ResetCounter();		
	}
}
function IncrementFaluCounter(){
	GM_setValue("Falucounter", parseInt(GM_getValue('Falucounter', '0')) + 1 + "");
	if(GM_getValue('Falucounter', '0') < FaluLista.length)
	{
		window.location.href = BuildLink(OazisLista[parseInt(GM_getValue('GMcounter', '0'))].link);
	}
}
function ValasszHarcost(nev, darabSzam){
	var allInputTags=document.getElementsByTagName("input");
	var kivalasztva = 1;
	for (i=0; i<allInputTags.length; i++)
	{
		if(allInputTags[i].name==nev)
		{
			var maradtegyseg = parseInt(allInputTags[i].nextSibling.nextSibling.innerHTML);
			if(isNaN(maradtegyseg)){
				maradtegyseg = 0;
			}
			if((allInputTags[i].className == "text") && (maradtegyseg > (parseInt(darabSzam) - 2))){
				allInputTags[i].value = darabSzam;
				kivalasztva = 0;
			}
			else
			{
				var allH1Tags=document.getElementsByClassName("titleInHeader");
				allH1Tags[0].innerHTML = allH1Tags[0].innerHTML + '<span style="color: red;font-size:smaller;"> túl kevés ' + allInputTags[i].previousSibling.previousSibling.alt +'('+darabSzam+') (timeout:'+(t_timeout/1000).toFixed()+'/<span id="visszaszamlalo"></span>)</span>';
				
				EpitEsKepez();
				IncrementFaluCounter();
				var visszaszamlalo = document.getElementById("visszaszamlalo");
				visszaszamlalo.innerHTML = jelenlegiMP;
				visszaszamolas();
				window.setTimeout(TimeOut, t_timeout);
			}
		}
	}
	return kivalasztva;
}
function visszaszamolas(){
	if (jelenlegiMP!=0)
	{
	    jelenlegiMP-=1
        document.getElementById("visszaszamlalo").innerHTML = jelenlegiMP;
		document.title = onoff[GM_getValue("TravAutomat", "0")] + ": ("+GM_getValue("GMcounter", "0") + "->" + OazisLista[GM_getValue('GMcounter', '0')].tamadok[0].darab+") - "+jelenlegiMP;
	}
	setTimeout(visszaszamolas, 1000);
}
function TimeOut(){
	location.reload(true);
	GM_setValue('Falucounter', '0');
	window.setTimeout(Timeout, t_timeout);
}
function ResetEpitesCounters(){
	GM_setValue("GMEpitescounter", "0");
	GM_setValue('EpitesAlatt', '0');
	location.reload(true);
}
function ResetKatonaCounters(){
	GM_setValue("GMKatonacounter", "0");
	GM_setValue('KepzesAlatt', '0');
	window.location.href = "http://ts4.travian.hu/dorf1.php";
}
GM_registerMenuCommand("CheckOazis", CheckOazis);
GM_registerMenuCommand("ShowUzenetek", ShowUzenetek);
GM_registerMenuCommand("ResetUzenetek", ResetUzenetek);
GM_registerMenuCommand("ShowEpitesUzenetek", ShowEpitesUzenetek);
GM_registerMenuCommand("ResetEpitesUzenetek", ResetEpitesUzenetek);
GM_registerMenuCommand("ToggleNoFight", ToggleNoFight);
function ToggleAutomat(){
	if(GM_getValue("TravAutomat", "0") == "0")
	{
		GM_setValue("TravAutomat", "1");
	}
	else
	{
		GM_setValue("TravAutomat", "0");
	}
	GM_setValue('Falucounter', '0');
	location.reload(true);
}
function ToggleNoFight(){
	if(GM_getValue("NoFight", "0") == "0")
	{
		GM_setValue("NoFight", "1");
	}
	else
	{
		GM_setValue("NoFight", "0");
	}
	location.reload(true);
}
function ResetCounter(){
	GM_setValue("GMcounter", "0");
	GM_setValue("CheckOazisAllatokra", "0");
	window.location.href = BuildLink(OazisLista[GM_getValue('GMcounter', '0')].link);
}
function CheckOazis(){
	var cim = window.location.href;
	var oazisSzerepel = 0;
	if(window.location.href.indexOf("http://ts4.travian.hu/a2b.php?") != -1)
	{
		for (i=0; i<OazisLista.length; i++)
		{
			if(cim.indexOf(OazisLista[i].link) != -1)
			{ 
				if(OazisLista[i].foglalt == 0)
				{ oazisSzerepel = 1;}
				else{ oazisSzerepel = 2;}
			}
		}
	}
	else
	{
		oazisSzerepel = 3;
	}
	if(oazisSzerepel == 0) {alert("Oazis nem szerepel a listaban!");}
	if(oazisSzerepel == 1) {alert("Oazis szerepel az OazisListaban!");}
	if(oazisSzerepel == 2) {alert("Oazis szerepel a FoglaltListaban!");}
	if(oazisSzerepel == 3) {alert("Link nem is támadható!");}
}
function ShowUzenetek(){
	var uzenetek = 	GM_getValue("Uzenetek", "üres");
	var elosztva = uzenetek.split(";");
	var kiiras = "";
	for(i=0;i<elosztva.length;i++)
	{
		kiiras = kiiras + (i + 1) + ":"+ elosztva[i] + "\n";
	}
	alert(kiiras);
}
function ResetUzenetek(){
	GM_setValue("Uzenetek", "");
}
function ShowEpitesUzenetek(){
	var uzenetek = 	GM_getValue("EpitesUzenetek", "üres");
	var elosztva = uzenetek.split(";");
	var kiiras = "";
	for(i=0;i<elosztva.length;i++)
	{
		kiiras = kiiras + (i + 1) + ":"+ elosztva[i] + "\n";
	}
	alert(kiiras);
}
function ResetEpitesUzenetek(){
	GM_setValue("EpitesUzenetek", "");
}

function updateCheck(forced){
	if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
	{
		try
		{
			GM_xmlhttpRequest(
			{
				method: 'GET',
				url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
				headers: {'Cache-Control': 'no-cache'},
				onload: function(resp)
				{
					var local_version, remote_version, rt, script_name;
					
					rt=resp.responseText;
					GM_setValue('SUC_last_update', new Date().getTime()+'');
					remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
					local_version=parseInt(GM[getValue('SUC_current_version', '-1')]);
					if(local_version!=-1)
					{
						script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
						GM_setValue('SUC_target_script_name', script_name);
						if (remote_version > local_version)
						{
							if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))
							{
								GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
								GM_setValue('SUC_current_version', remote_version);
							}
						}
						else if (forced)
							alert('No update is available for "'+script_name+'."');
					}
					else
						GM_setValue('SUC_current_version', remote_version+'');
				}
			});
		}
		catch (err)
		{
			if (forced)
				alert('An error occurred while checking for updates:\n'+err);
		}
	}
}
updateCheck(false);