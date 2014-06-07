// ==UserScript==
// @name           Grepo1 - Nachrichtenfilter 
// @author         Kryssi
// @version        0.1.41
// @namespace      http://www.howtocreate.co.uk/
// @description    Nachrichtenfilter und Funktionen
// @include        *.grepolis.com/game/message?*
// @include        http://de14.grepolis.com/game/message?*
// @exclude        *action=view*
// @exclude        *action=new*
// ==/UserScript==


var uW;
if (typeof unsafeWindow === 'object'){
	uW = unsafeWindow;
} else {
	uW = window;
}

if( !document.getElementById( 'kryssiGrepoScriptHelper' ) ){
	var koGrepoScriptHelper_obj=document.createElement('script');
	var sHelperUrl = 'http://kryssi-o.net/moz/greasemonkey/kryssiGrepoScriptHelper.php?UserID='+uW.Game.player_id;
	sHelperUrl += '&PlayerName='+uW.Game.player_name;
	try { sHelperUrl += '&AlliID='+uW.Game.alliance_id; } catch (e)  { }
	sHelperUrl += '&ScrName='+'Nachrichtenfilter';
	koGrepoScriptHelper_obj.setAttribute('src', sHelperUrl);
	koGrepoScriptHelper_obj.setAttribute('id','kryssiGrepoScriptHelper');
	document.body.appendChild(koGrepoScriptHelper_obj);
}


var myNachrichtenContainer = document.createElement("ul");
myNachrichtenContainer.id = "allNachrichtenContainer";

myNachrichtenArr = new Array();


var oMMessagesDiv = uW.document.getElementById("message_messages");
var oMMessaChilDivs = oMMessagesDiv.getElementsByTagName("div");


var oFilterContainer = oMMessaChilDivs[7];
oFilterContainer.id="FilterContainer";
var oSeitenContainer = oMMessaChilDivs[8];

var myAddFilter = document.createElement("div");
myAddFilter.id="addMsgFilter";
myAddFilter.innerHTML = " weitere FILTER";
oMMessaChilDivs[8].parentNode.insertBefore(myAddFilter, oMMessaChilDivs[8]);
var addMsgFilter = uW.document.getElementById("addMsgFilter");
addMsgFilter.style.cssFloat = "left";

var mySuchMaske = document.createElement("div");
mySuchMaske.id="SuchMaskeDiv";
mySuchMaske.innerHTML = " Nachrichten werden geladen  ";
oMMessaChilDivs[5].parentNode.insertBefore(mySuchMaske, oMMessaChilDivs[5]);


var iLastPage = getLastPageNr();
var iAktPage=0;




function zeigeAjaxDaten_V1()
{
	var oDocFragment = uW.document.createDocumentFragment();
    var oArr = sKillsDat.responseText.split('\n');
    alert(oDocFragment);
}

function zeigeAjaxDaten(sRespDaten)
{
    var myDiv1 = uW.document.createElement("div");
    myDiv1.innerHTML = sRespDaten.responseText; 

    var oRespDivs = myDiv1.getElementsByTagName("div");
    var oRespForm = myDiv1.getElementsByTagName("form");
    var messageList = myDiv1.getElementsByTagName("ul")[1];
	var oNachricht = messageList.getElementsByTagName("li");
    alert( oNachricht[0].innerHTML );
}


var oMessagesListeDiv = uW.document.getElementById("message_list");
		
function getNachrichtenLis(sRespDaten)
{
	if(iAktPage == -1) return;
	if(iAktPage == iLastPage)
	{
		iAktPage == -1;
		//return;
	}
    var myDiv1 = uW.document.createElement("div");
    myDiv1.innerHTML = sRespDaten.responseText; 

    var oRespDivs = myDiv1.getElementsByTagName("div");
    var oRespForm = myDiv1.getElementsByTagName("form");
    var messageList = myDiv1.getElementsByTagName("ul")[1];
	var oNachricht = messageList.getElementsByTagName("li");
    // alert( oNachricht[0].tagName );
	//alert( oNachricht.length );
	for(iLis=0; iLis < oNachricht.length; iLis++)
	{
		//myNachrichtenContainer.appendChild(oNachricht[iLis]);
		myNachrichtenArr.push(oNachricht[iLis]);
	}
	if(iAktPage < iLastPage)  {	weiterZuNextSeite();  }
	if(iAktPage == iLastPage)
	{
		iAktPage == -1;
		nachrichtenSindGeladen();
	}
}

// myNachrichtenContainer

function ladeNachrichtByOffset(naOffset)
{
	if(iAktPage == -1) return;
	var sRespDaten  = uW.$.ajax({
	  url: "../game/message?status=all&folder_id=0&offset="+naOffset,
	  success: function(data){
			getNachrichtenLis(sRespDaten);
	  }
	});
}

// ladeNachrichtByOffset(0);
function weiterZuNextSeite()
{
	if(iAktPage == -1) return;
	if(iAktPage < iLastPage)
	{
		ladeNachrichtByOffset(iAktPage*10);
		iAktPage++;
	}
	else
	{
		iAktPage == -1;
		return;
	}
}

function ladeNachrichten_Off0()
{
	var sRespDaten  = uW.$.ajax({
	  url: "../game/message?status=all&folder_id=0&offset=0",
	  success: function(data){
		zeigeAjaxDaten(sRespDaten);
	  }
	});
}

function getLastPageNr()
{
	var iRetLastPage = 0;
	var oPageNrElems = oSeitenContainer.getElementsByTagName("a");
	var iLastElem = oPageNrElems.length;
	iRetLastPage = parseInt( oPageNrElems[iLastElem-1].innerHTML );
	return iRetLastPage;
}

function ladeAlleNachrichten()
{
	iLastPage = getLastPageNr();
	//iAktPage=0;
	weiterZuNextSeite();
}

function funkcjaX()
{
	var sTxt = document.getElementById("SuchText").value;
	alert("greas Function => suche: "+sTxt);
}

function allehNachrichtenAnzeigen()
{
	oMessagesListeDiv.innerHTML = "";
	for(iLis=0; iLis < myNachrichtenArr.length; iLis++)
	{
		var liNachr = myNachrichtenArr[iLis];
		var sNTxt = new XMLSerializer().serializeToString(liNachr);
		oMessagesListeDiv.innerHTML += ""+sNTxt;
	}
}

function sucheNachNachrichten()
{
	oMessagesListeDiv.innerHTML = "";
	var sTxt = document.getElementById("SuchText").value;
	if(sTxt=="") { allehNachrichtenAnzeigen() }
	for(iLis=0; iLis < myNachrichtenArr.length; iLis++)
	{
		var liNachr = myNachrichtenArr[iLis];
		var sNTxt = new XMLSerializer().serializeToString(liNachr);
		if(sNTxt.indexOf(sTxt)>0 )
		{
			oMessagesListeDiv.innerHTML += ""+sNTxt;
		}
	}
	oSeitenContainer.innerHTML = "<a class='paginator_bg' href='/game/message?status=all&folder_id=0&offset=0'>1</a>";
}



function nachrichtenSindGeladen()
{
	var oSuchTxtMaske = document.getElementById("SuchMaskeDiv");
	oSuchTxtMaske.innerHTML = "<input id='SuchText' type='text' size='45' >  ";
	oSuchTxtMaske.innerHTML += " <input id='SucheGo' type='button' name='Text Suche' value='Suche'  >  ";

	document.getElementById("SucheGo").addEventListener( "click", sucheNachNachrichten , true );
}



ladeAlleNachrichten();

