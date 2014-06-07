// ==UserScript==
// @name           WofH Assistant
// @namespace      http://userscripts.org/scripts/show/80232
// @include        http://*.wofh.ru/*
// ==/UserScript==
document.getElementsByClassName = function(cl) 
{
	var retnode = [];
	var myclass = new RegExp('\\b'+cl+'\\b');
	var elem = this.getElementsByTagName('*');
	
	for (var i = 0; i < elem.length; i++) 
	{
		var classes = elem[i].className;
		if (myclass.test(classes)) retnode.push(elem[i]);
	}
	
	return retnode;
}; 

isSciPage = /http\:\/\/.+\.wofh\.ru\/\?help\&science/;
isTownPage = /http\:\/\/.+\.wofh\.ru\/\?towninfo\&id=.*/;
isTradeSendPage = /http\:\/\/.+\.wofh\.ru\/\?trade\&send.*/;

if(isSciPage.test(location.href))
{
	var SciDone = document.getElementsByClassName('clr2');
	var SciAvail = document.getElementsByClassName('clr1');
	var SciUnavail = document.getElementsByClassName('clr0');
	
	var SciLameList = document.getElementsByClassName('encp_sci');
	var SciContainer = SciLameList[0].parentNode;
	SciContainer.removeChild(SciLameList[0]);	
	var SciTable = document.createElement('table');
	var TmpData = '<tr><td style="vertical-align:text-top;">';
	
	for(var i = 0; i < SciDone.length; i++)
	{
		TmpData += '<a href="' + SciDone[i].href + '" class="clr2">' + SciDone[i].innerHTML + '</a><br />';
	}
	
	TmpData += '</td><td style="vertical-align:text-top;">';
	
	for(var i = 0; i < SciAvail.length; i++)
	{
		TmpData += '<a href="' + SciAvail[i].href + '" class="clr1">' + SciAvail[i].innerHTML + '</a><br />';
	}
	
	TmpData += '</td><td style="vertical-align:text-top;">';
	
	for(var i = 0; i < SciUnavail.length; i++)
	{
		TmpData += '<a href="' + SciUnavail[i].href + '" class="clr0">' + SciUnavail[i].innerHTML + '</a><br />';
	}
	
	TmpData += '</td></tr>';

	SciTable.innerHTML = TmpData;
	SciContainer.appendChild(SciTable);
	SciTable.setAttribute('width', '894');
	SciTable.setAttribute('id', 'wa_sci_table');
	SciContainer.appendChild(SciTable);
}

if(isTownPage.test(location.href))
{
	var T = document.getElementsByClassName('pagetitle');
	var Title = T[0].childNodes[0].innerHTML;
	var RE = /^(.*)\s\((\d+)-(\d+)\)/i;
	var SRes = Title.match(RE);
	var TownName = SRes[1];
	var TownPosX = SRes[2];
	var TownPosY = SRes[3];
	
	var P = document.getElementsByClassName('page_tinfo');
	var Player = P[0].innerHTML; 
	RE = /<a href=\"\?account\&amp;id=(\d+)\".(.*).+?\/a>/i;
	SRes = Player.match(RE);
	var TownOwner = SRes[2];

	var RE = /http\:\/\/(w.)\.wofh\.ru/i;
	var SRes = location.href.match(RE);
	var curWorld = SRes[1];
	
	var RE = /http\:\/\/.+\.wofh\.ru\/\?towninfo\&id=(\d+?)$/i
	SRes = location.href.match(RE);
	var TownID = SRes[1];
	
	var TownInfo = new Array(6);
	TownInfo[0] = curWorld;
	TownInfo[1] = TownID;
	TownInfo[2] = TownName;
	TownInfo[3] = TownPosX;
	TownInfo[4] = TownPosY;
	TownInfo[5] = TownOwner;
	
	var FavButtonCont = document.createElement('a');
	var FavButton = document.createElement('img');
	FavButton.setAttribute('src', 'http://ipicture.ru/uploads/100627/xvUEWQcrEI.png');
	FavButton.setAttribute('width', '35');
	FavButton.setAttribute('height', '35');
	FavButton.setAttribute('title', 'Add to favorites');
	FavButton.setAttribute('align', 'absmiddle');
	FavButton.setAttribute('style', 'cursor:pointer;');
	FavButton.addEventListener('click', function()
	{	
		GM_setValue('ft@' + TownInfo[0] + '@' + TownInfo[1], TownInfo[0] + '"' + TownInfo[1] + '"' + TownInfo[2] + '"' + TownInfo[3] + '"' + TownInfo[4] + '"' + TownInfo[5]);
	}, false);
	FavButtonCont.appendChild(FavButton);
	T[0].childNodes[0].appendChild(FavButtonCont);
	
}

if(isTradeSendPage.test(location.href))
{	
	// var listT = GM_listValues();
	// for(var i = 0; i < listT.length; i++)
	// {
		// GM_deleteValue(listT[i]);
	// }
	// var tmpT = document.getElementsByClassName('pagetitle');
	// alarm(tmpT[0]);
	// tmp = tmp[0];
	// alarm(tmp.innerHTML);
	// tmp.addEventListener('click', function(event)
	// {
		// alarm(1);
	// }, false);
	
	var SendForm = document.getElementsByTagName('form');
	var RE = /(<p>.+?<\/p>).br.([\s\S]+)/i;
	var FormText = SendForm[0].innerHTML;
	var SRes = FormText.match(RE);
	
	var ListCont = document.createElement('div');
	
	for(var i = 0; i < GM_listValues().length; i++)
	{
		var RET = /ft@.+@\d+/i;
		
		if(RET.test(GM_listValues()[i]))
		{
			tmp = GM_getValue(GM_listValues()[i]);
			var RET = /(.+)\"(.+)\"(.+)\"(.+)\"(.+)\"(.+)/i;
			var SResT = tmp.match(RET);
			
			var FTListItemCont = document.createElement('div');
			var FTListItem = document.createElement('a');
			var FTListDeleteItem = document.createElement('a');
			
			FTListItem.setAttribute('style', 'cursor: pointer;');
			FTListItem.setAttribute('onclick', 'var XField = getElementsByName("x")[0]; var YField = getElementsByName("y")[0]; XField.value = "' + SResT[4] + '"; YField.value = "' + SResT[5] + '";');
			FTListItem.innerHTML = SResT[3] + ' [' + SResT[4] + '-' + SResT[5] + '] [' + SResT[6] + '] ';
			FTListItemCont.appendChild(FTListItem);
			
			FTListDeleteItem.innerHTML = '[X]';
			FTListDeleteItem.setAttribute('title', 'Delete from list');
			FTListDeleteItem.setAttribute('style', 'color:#ff0000;font-weight:bold;cursor:pointer;');
			FTListDeleteItem.addEventListener('click', function()
			{
				alert(1);
			}, false);
			FTListItemCont.appendChild(FTListDeleteItem);
			// alert(FTListDeleteItem.onClick);
			ListCont.appendChild(FTListItemCont);
		}
	}
	
	SendForm[0].innerHTML = SRes[1];
	SendForm[0].appendChild(ListCont);
	SendForm[0].innerHTML += SRes[2];
}

