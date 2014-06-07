// ==UserScript==
// @name           Skanetrafiken snabbsok
// @description    Fixa klickbara favoritsokningar pa Skanetrafikens hemsida
// @include        http://www.skanetrafiken.se/templates/StartPage.aspx?id=2182
// @include        http://www.reseplaneraren.skanetrafiken.se/querypage_lite.asp*
// @namespace      snild_imaginary_namespace
// ==/UserScript==

/*
Version history

[Aug 10 2006]
Fixade installningar pa sidan istallet for att tvinga in anvandaren i koden
Fixade automatisk submit pa formularet pa andra sidan (dar man far valja)
En massa andra grejor som verkligen behovdes. Kommer inte ihag allt.

[Aug 9 2006]
Startade, lade upp forsta versionen pa userscripts.org

*/
if(document.getElementById("frmMain").action == "http://www.reseplaneraren.skanetrafiken.se/resultspage.asp")
{
	//auto-submit pa andra sidan
	var autosubmit=true;
	var waitObj;
	var i;
	var antal;
	if (GM_getValue)
		autosubmit = (GM_getValue("sida2auto") == true);
	
	if (autosubmit)
	{
		document.body.setAttribute("onload","javascript:document.getElementById('frmMain').submit();");
		
		document.body.style.display="none";
		document.body.style.backgroundColor="white";
		antal=document.body.childNodes.length;
		for (i=0;i<antal;i++)
		{
			if (typeof(document.body.childNodes[i].style)!="undefined")
				document.body.childNodes[i].style.display="none";
		}
		waitObj=document.createElement("div");
		waitObj.style.fontSize="3em";
		waitObj.style.marginTop="5em";
		waitObj.appendChild(document.createTextNode("Lugna dig..."));
		document.body.appendChild(waitObj);
		document.body.style.display="";
	}
		
	if (GM_setValue)
	{
		GM_setValue("sida2auto",false);
	}
}
else
{
	function objSokning(fran, till, namn)
	{
		this.fran = fran;
		this.till = till;
		this.namn = namn;
	}

	function sparaSokningar()
	{
		if (GM_setValue)
		{
			var franstr = new Array();
			var tillstr = new Array();
			var namnstr = new Array();
			for (i in sokning)
			{
				franstr.push(sokning[i].fran);
				tillstr.push(sokning[i].till);
				namnstr.push(sokning[i].namn);
			}
			GM_setValue("fran",franstr.join("|"));
			GM_setValue("till",tillstr.join("|"));
			GM_setValue("namn",namnstr.join("|"));
		}
	}

	function laddaSokningar()
	{
		var i;
		var franstr;
		var tillstr;
		var namnstr;
		var antal;
		sokning = new Array();

		//LADDA SOKNINGAR
		franstr=GM_getValue("fran");
		if (typeof(franstr)!="undefined")
			if(franstr!="")
				franstr=franstr.split("|");

		tillstr=GM_getValue("till");
		if (typeof(tillstr)!="undefined")
			if(tillstr!="")
				tillstr=tillstr.split("|");

		namnstr=GM_getValue("namn");
		if (typeof(namnstr)!="undefined")
			if(namnstr!="")
				namnstr=namnstr.split("|");

		if (typeof(franstr)!="undefined" && typeof(tillstr)!="undefined" && typeof(namnstr)!="undefined")
		{
			antal=Math.min(Math.min(franstr.length,tillstr.length),namnstr.length);
		}
		else
		{
			antal=0;
		}

		for (i=0;i<antal;i++)
		{
			sokning[i]=new objSokning(franstr[i],tillstr[i],namnstr[i])
		}
	}

	unsafeWindow.GM_Action = function(action, aargs) {
		if (GM_setValue)
		{
			GM_setValue("todo",action);
			GM_setValue("todoArgs",aargs);
			window.location.reload();
		}
	}

	unsafeWindow.GM_SkapaNy = function() {
		var nyfran;
		var nytill;
		var nynamn;
		var nyargs;
		var formular;

		if (GM_setValue)
		{
			formular=document.getElementById("frmMain");

			nyfran=formular.elements[0].value;
			nytill=formular.elements[1].value;

			if (nyfran!="" && nytill!="")
			{
				nynamn=prompt("Ny sokning:\n" + nyfran + " -> " + nytill + "\n\nNamn:","");

				if (nynamn!=null)
				{
					nyargs=nyfran + "|" + nytill + "|" + nynamn;

					GM_setValue("todo","skapany");
					GM_setValue("todoArgs",nyargs);
					window.location.reload();
				}
			}
			else
			{
				alert("Skriv in en sokning forst");
			}
		}
	}
	


	unsafeWindow.GM_sattSida2Auto = function() {
		if (GM_setValue)
		{
			GM_setValue("sida2auto",true);
		}
	}



	//Definiera lite variabler
	var todo;			//Nagon installning som ska andras?
	var todoArgs;			//Parametrar for todo
	var todoSplit;			//Parametrar, fast uppdelade i en array
	var showoptions;		//Visa installningar eller inte?
	var sokruta;			//Den vanliga sokrutan
	var lankruta;			//rutan dar vi ska lagga in lankarna
	var rubrikDiv;			//Rubrik-div. Duh!
	var sokning;			//Array med olika sokningar
	var skriptObj;			//Objekt for javascriptet som ska laggas till
	var skript;			//javascriptet som ska laggas till
	var aObj;			//Objekt for lankar som ska laggas in

	//Satt lite varden pa variablerna
	showoptions=false;
	lankruta = document.createElement("div");
	sokruta = document.getElementById("startpage-travelplanner-advancedsearch-container");
	rubrikDiv = document.createElement("div");
	skript = "";
	skriptObj = document.createElement("script");
	skriptObj.setAttribute("type","text/javascript");
	
	rubrikDiv.appendChild(document.createTextNode("Snabbsok"));
	rubrikDiv.style.margin="0";
	rubrikDiv.style.background="#C8272F";
	rubrikDiv.style.color="white";
	rubrikDiv.style.width="109px";
	rubrikDiv.style.paddingLeft="6px";
	rubrikDiv.style.paddingRight="6px";
	rubrikDiv.style.paddingTop="2px";
	rubrikDiv.style.paddingBottom="2px";
	rubrikDiv.style.border="1px solid #999999";
	rubrikDiv.style.borderBottom="0px none #999999";
	rubrikDiv.style.fontWeight="bold";
	sokruta.insertBefore(rubrikDiv,sokruta.childNodes[0]);
	
	//lankruta.style.width="115px";
	lankruta.style.border="1px solid #999999";
	lankruta.style.borderTop="0px none #999999";
	lankruta.style.padding="6px";
	lankruta.style.marginBottom="6px";
	lankruta.style.overflow="hidden";
	lankruta.style.wordWrap="break-word";

	sokruta.insertBefore(lankruta,sokruta.childNodes[1]);
	
	if (GM_setValue)
	{
		var i;

		laddaSokningar();	

		//Hamta todo
		todo = GM_getValue("todo");
		todoArgs = GM_getValue("todoArgs");
		if(typeof(todoArgs)!="undefined")
		{
			todoSplit = todoArgs.split("|");
		}
		else
		{
			todoSplit = new Array("");
		}
		showoptions = (GM_getValue("showoptions") == true);

		//UTFOR TODO
		if (todo == "showoptions")
		{
			showoptions=!showoptions;
			GM_setValue("showoptions",showoptions);
		}
		else if (todo == "move")
		{
			i=Number(todoSplit[0]);
			if (typeof(sokning[i])!="undefined" && typeof(sokning[i-1])!="undefined")
			{
				temp=sokning[i-1];
				sokning[i-1]=sokning[i];
				sokning[i]=temp;
			}
			sparaSokningar();
		}
		else if (todo == "skapany")
		{
			sokning.push(new objSokning(todoSplit[0],todoSplit[1],todoSplit[2]));
			sparaSokningar();
		}
		else if (todo == "tabort")
		{
			i=Number(todoSplit[0]);
			if (typeof(sokning[i])!="undefined")
			{
				if (confirm("Ta bort sokningen '" + sokning[i].namn + "'?"))
				{
					sokning.splice(i,1);
					sparaSokningar();
				}
			}
		}
		//rensa
		GM_setValue("todo","nothing");
		GM_setValue("todoArgs","");
	}
	else
	{
		sokning = new Array();
		//Lagg till dina sokningar har!!
			//Se till att ha olika siffror mellan [ och ], annars skriver de over varandra
			//De tre texterna ar "fran", "till", och "namn" pa sokningen.
			//Exempel:
			//sokning[0] = new objSokning("Osby","Lund C", "Till Lund");
		sokning[0] = new objSokning("Osby", "Lund C", "Osby->Lund");
		sokning[1] = new objSokning("Lund C", "Osby", "Lund->Osby");
	}


	
	//Javascript att lagga till pa sidan
	skript = skript + 'var autoSubmit = true; ';
	skript = skript + 'var formular = document.getElementById("frmMain"); ';
	skript = skript + 'var frText; var toText; ';
	skript = skript + 'frText=formular.elements[0].value; ';
	skript = skript + 'toText=formular.elements[1].value; ';
	skript = skript + 'formular.elements[0].setAttribute("onkeyup","javascript:frText=formular.elements[0].value"); ';
	skript = skript + 'formular.elements[1].setAttribute("onkeyup","javascript:toText=formular.elements[1].value"); ';
	
	skript = skript + 'function sok(fran, till) { ';
	skript = skript + 'sattText(fran,till); ';
	skript = skript + 'frText=fran; ';
	skript = skript + 'toText=till; ';
	skript = skript + 'GM_sattSida2Auto(); ';
	skript = skript + 'if (autoSubmit==true) { formular.submit(); } ';
	skript = skript + '}';

	skript = skript + 'function sattText(fran, till) { ';
	skript = skript + 'formular.elements[0].value = fran; ';
	skript = skript + 'formular.elements[1].value = till; ';
	skript = skript + '} ';

	skript = skript + 'function aterSatt() { ';
	skript = skript + 'sattText(frText,toText); ';
	skript = skript + '} ';
	
	skriptObj.appendChild(document.createTextNode(skript)); //Lagg till scriptet in i objektet for taggen
	lankruta.appendChild(skriptObj); // lagg in script-objektet i lankrutan

	for (i in sokning)
	{
		aObj=document.createElement("a"); //skapa nytt anchor-objekt
		aObj.setAttribute("href","javascript:sok('" + sokning[i].fran + "', '" + sokning[i].till + "');"); //satt lankens href-attribut
		aObj.setAttribute("onmouseover","javascript:sattText('" + sokning[i].fran + "', '" + sokning[i].till + "');"); //satt mouseover
		aObj.setAttribute("onmouseout","javascript:aterSatt();"); //satt mouseout (atersatt = "reset" =P)
		aObj.appendChild(document.createTextNode(sokning[i].namn)); //lagg in sokningens namn mellan <a> och </a>
		lankruta.appendChild(aObj); //lagg till a-objektet i lankrutan.
		
		
		//andra hallet! :P
		lankruta.appendChild(document.createTextNode(" - "));
		aObj=document.createElement("a"); //skapa nytt anchor-objekt
		aObj.setAttribute("href","javascript:sok('" + sokning[i].till + "', '" + sokning[i].fran + "');"); //satt lankens href-attribut
		aObj.setAttribute("onmouseover","javascript:sattText('" + sokning[i].till + "', '" + sokning[i].fran + "');"); //satt mouseover
		aObj.setAttribute("onmouseout","javascript:aterSatt();"); //satt mouseout (atersatt = "reset" =P)
		aObj.appendChild(document.createTextNode("tillbaka")); //lagg in sokningens namn mellan <a> och </a>
		lankruta.appendChild(aObj); //lagg till a-objektet i lankrutan.

		if (showoptions)
		{
			lankruta.appendChild(document.createElement("br")); //lagg in en br
			
			//flytta-upp-knapp
			lankruta.appendChild(document.createTextNode("-- "));
			aObj=document.createElement("a"); //skapa nytt anchor-objekt
			aObj.setAttribute("href","javascript:GM_Action('move','" + i + "');"); //satt lankens href-attribut
			aObj.appendChild(document.createTextNode("upp")); //lagg in namn mellan <a> och </a>
			lankruta.appendChild(aObj); //lagg till a-objektet i lankrutan.

			//ta bort-knapp
			lankruta.appendChild(document.createTextNode(" - "));
			aObj=document.createElement("a"); //skapa nytt anchor-objekt
			aObj.setAttribute("href","javascript:GM_Action('tabort','" + i + "');"); //satt lankens href-attribut
			aObj.appendChild(document.createTextNode("ta bort")); //lagg in namn mellan <a> och </a>
			lankruta.appendChild(aObj); //lagg till a-objektet i lankrutan.
		}
		lankruta.appendChild(document.createElement("br")); //lagg in en br
	}
	
	if (sokning.length==0)
	{
		lankruta.appendChild(document.createTextNode("Du har inga sokningar."));
	}

	lankruta.appendChild(document.createElement("br")); //lagg in en br
	
	if (GM_setValue)
	{
		if (showoptions || sokning.length==0)
		{
			aObj=document.createElement("a");
			aObj.setAttribute("href","javascript:GM_SkapaNy();");
			aObj.appendChild(document.createTextNode("Lagg till ifylld"));
			lankruta.appendChild(aObj);
			lankruta.appendChild(document.createElement("br")); //lagg in en br
		}

		if (sokning.length!=0)
		{
			//Lagg in visa/gom installningar
			aObj=document.createElement("a"); //skapa nytt anchor-objekt
			aObj.setAttribute("href","javascript:GM_Action('showoptions','')");
			if (showoptions)
			{
				aObj.appendChild(document.createTextNode("Alternativ pa/av"));
			}
			else
			{
				aObj.appendChild(document.createTextNode("Alternativ pa/av"));
			}

			lankruta.appendChild(aObj); //lagg in anchor
			lankruta.appendChild(document.createElement("br")); //lagg in en br
		}
	}

	document.body.setAttribute("onunload","javascript:aterSatt();");
}