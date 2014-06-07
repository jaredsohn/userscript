// DoH UI Changer
// version 1.4
// 2009-12-08
//---------------------------------------------------------------------
//---------------------------------------------------------------------
//
// ==UserScript==
// @name          DoH Menu Resizer
// @version       2.0.1
// @author        Athy
// @namespace     http://www.google.com/?q='Domain of Heroes'
// @description   hide elements, change chat/menu sizes/positions
// @include       http://domainofheroes.com/Game.aspx*
// @include       http://*.domainofheroes.com/Game.aspx*
// ==/UserScript==

//to-do
//seperate toggles for trade and yard
//show inv/mule/storage in info tab
//click and drag handles


var manualSettings = 0; 			//change to 1 for manual tweaking

if (manualSettings){

  	var infoGrow 		= 935;		//pixels to increase the info window starting height by (negative shrinks) 1135 (starts at 200)
  	var infoWidth 		= 700;		//width of the info box in pixels (486 is default)

	var tradeVpos		= 190;		//trade box vertical
	var tradeHpos		= 690;		//trade box horizontal

  	var chatGrow		= 1141;		//pixels to increase the chat starting height by (negative shrinks)
  	var chatWidth		 = 810;		//width of the whole chat in pixels (including toon list)
  	var toonWidth	= 165;		//width of the toon list (i.e: text area = chatWidth - toonWidth)
  	var chatHpos 		= 728;		//horizontal offset of the chat from it's original position

  	var invGrow 		= 500;		//pixels to increase the inventory starting height by (negative shrinks)
	var invWidth 		= 700;		//width of the inv box in pixels (486 is default)
  	var muleGrow 	= 500;		//pixels to increase the mule starting height by (negative shrinks)
  	var muleWidth 	= 700;		//width of the mule box in pixels (486 is default)
  	var storageGrow = 500;		//pixels to increase the storage starting height by (negative shrinks)
  	var storageWidth = 700;		//width of the storage box in pixels (486 is default)

} else {
	viewportwidth 	= window.innerWidth;
	viewportheight 	= window.innerHeight;
	if  ( viewportwidth < 1510 ) {		infoWidth = 500;	chatWidth = 500; chatHpos = 528;}
	else { var infoWidth	= (viewportwidth-410)/2 -50; var chatWidth = infoWidth +100; var chatHpos = infoWidth +28;	}
  	var chatGrow		= viewportheight -55; var infoGrow 		= viewportheight -260;  	var invGrow 		= viewportheight -495;  	var muleGrow 	= viewportheight -495;	var storageGrow = viewportheight -495;
	var invWidth 		= infoWidth;  	var muleWidth 	= infoWidth;  	var storageWidth = infoWidth;
  	var toonWidth	= 165;	var tradeVpos		= 190;	var tradeHpos		= viewportwidth/2 -270;
}
	var guildless;	var chatNumOn = 1;
	var chatVpos 		= 4;
  	var infoHpos 		= 5;
  	var infoVpos 		= 35;

function toonToggle(){
	if(document.getElementById('chatListMembersM').style.width == "0px") {		document.getElementById('chatListMembersU').style.width= toonWidth +"px";	document.getElementById('chatListMembersY').style.width= toonWidth +"px";		document.getElementById('chatListMembersX').style.width= toonWidth +"px";	document.getElementById('chatListMembersF').style.width= toonWidth +"px";	document.getElementById('chatListMembersP').style.width= toonWidth +"px";		document.getElementById('chatListMembersM').style.width= toonWidth +"px";					if (guildless == 0) { document.getElementById('chatListMembersG').style.width= toonWidth +"px";}		document.getElementById('chatListDuel').style.width = (chatWidth - toonWidth) + "px";	document.getElementById('chatListYardSale').style.width = (chatWidth - toonWidth) + "px";	document.getElementById('chatListPublicTrade').style.width = (chatWidth - toonWidth) + "px";	document.getElementById('chatListFaction').style.width = (chatWidth - toonWidth) + "px";		document.getElementById('chatListLocal').style.width = (chatWidth - toonWidth) + "px";	document.getElementById('chatListMain').style.width = (chatWidth - toonWidth) + "px";	if (guildless == 0) { document.getElementById('chatListGuild').style.width = (chatWidth - toonWidth) + "px";}	}
	else {	document.getElementById('chatListMembersU').style.width="0px";	document.getElementById('chatListMembersY').style.width="0px";					document.getElementById('chatListMembersX').style.width="0px";						document.getElementById('chatListMembersF').style.width="0px";					document.getElementById('chatListMembersP').style.width="0px";					document.getElementById('chatListMembersM').style.width="0px";						if (guildless == 0) { document.getElementById('chatListMembersG').style.width="0px";}		document.getElementById('chatListDuel').style.width = (chatWidth) + "px";										document.getElementById('chatListYardSale').style.width = (chatWidth) + "px";				document.getElementById('chatListPublicTrade').style.width = (chatWidth) + "px";					document.getElementById('chatListFaction').style.width = (chatWidth) + "px";	document.getElementById('chatListLocal').style.width = (chatWidth) + "px";	document.getElementById('chatListMain').style.width = (chatWidth) + "px";  	if (guildless == 0) { document.getElementById('chatListGuild').style.width = (chatWidth) + "px";}	}
}
function chatToggle(name){
	if(document.getElementById('chat' +name+ 'Wrapper').parentNode.style.display=="none")	{	document.getElementById('chat' +name+ 'Wrapper').parentNode.style.display="";			chatNumOn++;	document.getElementById('tabChat' +name).setAttribute("class", "chatTabActive");
	}	else if ( chatNumOn > 1 ) 																						{	document.getElementById('chat' +name+ 'Wrapper').parentNode.style.display="none";		chatNumOn--;	document.getElementById('tabChat' +name).setAttribute("class", "chatTabInactive");	}
	document.getElementById('chatListMembersM').style.height = (chatGrow/chatNumOn -21) + "px";		document.getElementById('chatListMain').style.height = (chatGrow/chatNumOn -21) + "px";	document.getElementById('chatListMembersP').style.height = (chatGrow/chatNumOn -21) + "px";		document.getElementById('chatListLocal').style.height = (chatGrow/chatNumOn -21) + "px";	document.getElementById('chatListMembersF').style.height = (chatGrow/chatNumOn -21) + "px";		document.getElementById('chatListFaction').style.height = (chatGrow/chatNumOn -21) + "px";	document.getElementById('chatListMembersX').style.height = (chatGrow/chatNumOn -21) + "px";		document.getElementById('chatListPublicTrade').style.height = (chatGrow/chatNumOn -21) + "px";	document.getElementById('chatListMembersY').style.height = (chatGrow/chatNumOn -21) + "px";		document.getElementById('chatListYardSale').style.height = (chatGrow/chatNumOn -21) + "px";	document.getElementById('chatListMembersU').style.height = (chatGrow/chatNumOn -21) + "px";		document.getElementById('chatListDuel').style.height = (chatGrow/chatNumOn -21) + "px";
	if (guildless == 0) { document.getElementById('chatListMembersG').style.height = (chatGrow/chatNumOn -21) + "px";		document.getElementById('chatListGuild').style.height = (chatGrow/chatNumOn -21) + "px"; }
}
function invToggle(){		if(document.getElementById('invWrapper').parentNode.style.display=="block") 		{	document.getElementById('invWrapper').parentNode.style.display="none"; 		}	else { document.getElementById('invWrapper').parentNode.style.display="block";		}	 }	function muleToggle(){	if(document.getElementById('muleWrapper').parentNode.style.display=="block") 		{	document.getElementById('muleWrapper').parentNode.style.display="none"; 	}	else { document.getElementById('muleWrapper').parentNode.style.display="block";	}	 }	function storageToggle(){	if(document.getElementById('storageWrapper').parentNode.style.display=="block")	{	document.getElementById('storageWrapper').parentNode.style.display="none"; }	else { document.getElementById('storageWrapper').parentNode.style.display="block";}	 }

function MyGrowChatWrapper(height) {
        location.href 				= "javascript:makeTaller('chatListMembersM'," + height + ");";	location.href = "javascript:makeTaller('chatListMain'," + height + ");";        location.href 				= "javascript:makeTaller('chatListMembersP'," + height + ");";		location.href = "javascript:makeTaller('chatListLocal'," + height + ");";        location.href 				= "javascript:makeTaller('chatListMembersF'," + height + ");";		location.href = "javascript:makeTaller('chatListFaction'," + height + ");";        location.href 				= "javascript:makeTaller('chatListMembersX', " + height + ");";	location.href = "javascript:makeTaller('chatListPublicTrade'," + height + ");";        location.href 				= "javascript:makeTaller('chatListMembersY', " + height + ");";	location.href = "javascript:makeTaller('chatListYardSale'," + height + ");";        location.href 				= "javascript:makeTaller('chatListMembersU'," + height + ");";		location.href = "javascript:makeTaller('chatListDuel', " + height + ");";
        if (guildless == 0) { location.href 	= "javascript:makeTaller('chatListMembersG'," + height + ");";	location.href = "javascript:makeTaller('chatListGuild'," + height + ");"; }
}
function hideStuff(){
	guildless =	( ( document.getElementById('tabChatGuild').style.display=="none" ) ? 1 : 0 );
 	//the next line hides the 4 sell/recycle items from the inventory (to not accidentally sell runes lol
	document.getElementById('lnkMassShopSellItemsFromI').style.visibility="hidden";	document.getElementById('lnkMassHoboSellItemsFromI').style.visibility="hidden";	document.getElementById('lnkMassShopRecycleItemsFromI').style.visibility="hidden";		document.getElementById('lnkMassHoboRecycleItemsFromI').style.visibility="hidden";
	//hides the donate to guild button from the inventory
	if (guildless == 0) { document.getElementById('lnkMassDonateToGuildFromI').style.visibility="hidden"; }
	//the next line removes the top and side ads
	document.getElementById('vertAds').style.display="none";		document.getElementById('ifAdsSide').style.display="none";		document.getElementById('topAds').style.display="none";	document.getElementById('ifAdsTop').style.display="none";
	//the next line removes the select all buttons in the inv/mule/storage
//	document.getElementById('imgToggleInv').style.display="none";	document.getElementById('imgToggleMule').style.display="none";	document.getElementById('imgToggleStorage').style.display="none";
	//hides the stamps counter
	document.getElementById('stamps').style.display="none";
	//hides the twitter section
	document.getElementById('twitter_div').style.display="none";		document.getElementById('twitter-link').style.display="none";		document.getElementById('twitter_div').parentNode.style.display="none";
	//hides the top DOH logo, scrolls the whole game up a chunk of pixels
	document.getElementById('logo').style.display="none";
	//doesn't show the sparkles on the info and charactr tab
	document.getElementById('imgTabInfoSparkles').style.visibility="hidden";		document.getElementById('imgTabCharacterSparkles').style.visibility="hidden";
	//hides the chat filters
	document.getElementById('btnInfoETC').style.display="none";		document.getElementById('btnInfoTRAD').style.display="none";	document.getElementById('btnInfoSHOP').style.display="none";	document.getElementById('btnInfoQST').style.display="none";	document.getElementById('btnInfoBATL').style.display="none";	document.getElementById('btnInfoNPC').style.display="none";	document.getElementById('btnInfoLORE').style.display="none";	document.getElementById('btnInfoTRVL').style.display="none";
	//hides the popup in the equip tab that shows all the possible equips
	document.getElementById('imgEquippable1').style.display="none";	document.getElementById('imgEquippable2').style.display="none";	document.getElementById('imgEquippable3').style.display="none";	document.getElementById('imgEquippable4').style.display="none";	document.getElementById('imgEquippable5').style.display="none";	document.getElementById('imgEquippable6').style.display="none";	document.getElementById('imgEquippable7').style.display="none";	document.getElementById('imgEquippable8').style.display="none";	document.getElementById('imgEquippable9').style.display="none";	document.getElementById('imgEquippable10').style.display="none";	document.getElementById('imgEquippable11').style.display="none";	document.getElementById('imgEquippable12').style.display="none";	document.getElementById('imgEquippable13').style.display="none";	document.getElementById('imgEquippable14').style.display="none";	document.getElementById('imgEquippable15').style.display="none";
	//hide the mule sales pitch, sometimes it pops up on bad loads
	document.getElementById('muleSalesPitch').style.display="none";	document.getElementById('muleSell').style.display="none";
	//hide the quit guild button
	if (guildless == 0) { document.getElementById('guildQuit').style.display="none";	}
	//the next 3 are the starting displays of the inv/mule/storage... i begin with inv and storage hidden but mule shown
	document.getElementById('invWrapper').parentNode.style.display="none";
	document.getElementById('muleWrapper').parentNode.style.display="block";
	document.getElementById('storageWrapper').parentNode.style.display="none";
	document.getElementById('game1').style.background="#000000";	document.getElementById('game2').style.background="#000000";	document.getElementById('chatWrapper').style.background="#000000";
	var allHTMLTags=document.getElementsByTagName("*");	for (i=0; i<allHTMLTags.length; i++) {		       if (allHTMLTags[i].className=="h12px h12px-gameColBot518")	{ allHTMLTags[i].style.display="none"; }		else if (allHTMLTags[i].className=="h16px h16px-gameColTop330")	{ allHTMLTags[i].style.display="none"; }		else if (allHTMLTags[i].className=="h7px h7px-gameColTop518")		{ allHTMLTags[i].style.display="none"; }		else if (allHTMLTags[i].className=="h12px h12px-gameColBot330")	{ allHTMLTags[i].style.display="none"; }	}
	//dont touch these, used to reposition chat
	document.getElementById('tabInfoChatSpacer').style.display="none";	if (guildless == 0) { document.getElementById('tabGuildChatSpacer').style.display="none"; }
	//this removes the game links and referal links
	for(i=document.images.length-1; i>=0; i--) {		var image = document.images[i];		if(image.src=="http://media.domainofheroes.com/social-stumbleupon.png") {
			//image.parentNode.parentNode.parentNode.parentNode.style.display="none";
			image.parentNode.parentNode.parentNode.parentNode.innerHTML = document.getElementById('statPow').parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML + "<br/><table>" + document.getElementById('tdCol1ResistPhysical').parentNode.parentNode.parentNode.parentNode.innerHTML + "</table><br/>";
		}
	}
}


function changeUI(){
	location.href = "javascript:makeTaller('infoList'," + infoGrow + ");";  	location.href = "javascript:makeTaller('invListWrapper'," + invGrow + ");";  	location.href = "javascript:makeTaller('muleListWrapper'," + muleGrow + ");";  	location.href = "javascript:makeTaller('storageListWrapper'," + storageGrow + ");";
	location.href = "javascript:ChatSetStatus('LFT');";		location.href = "javascript:ChatSetStatus('LFD');";
	tr1Obj = document.createElement("TR");	tr1Obj.id = "BelowVXP";	document.getElementById('vxpWrapper').parentNode.parentNode.parentNode.appendChild(tr1Obj);
	document.getElementById('BelowVXP').innerHTML = ("<td><a title=\"Keep Rollin!\" href=\"javascript:InstantFvF();\">Nearby</a></td><td><a title=\"Attack!\" href=\"javascript:JoinBattleFvF();\">FVF!</a></td><td><img alt=\"Coin\" class=\"h12px h12px-sellToShop\" src=\"http://media.domainofheroes.com/clear.gif\"/><span id=\"coin\" class=\"coin\">6302227</span></td><td><a title=\"Ditch the Junk!\"  href=\"javascript:GoToNearestInn();\">Inn</a></td>");
	document.getElementById('infoList').style.width= (infoWidth) + "px";		document.getElementById('allContainer').style.width= (infoWidth + 430) + "px";		document.getElementById('game2').style.width= (infoWidth + 15) + "px";	document.getElementById('tblChatTabs').style.width= (chatWidth) + "px";
	document.getElementById('imgToggleInv').parentNode.parentNode.parentNode.parentNode.style.width = (invWidth) + "px";				document.getElementById('invListWrapper').style.width= (invWidth) + "px";				document.getElementById('lnkMassUpgradeQualityFromI').parentNode.parentNode.parentNode.parentNode.style.width = (invWidth) + "px";
	document.getElementById('imgToggleMule').parentNode.parentNode.parentNode.parentNode.style.width = (muleWidth) + "px";			document.getElementById('muleListWrapper').style.width= (muleWidth) + "px";			document.getElementById('lnkMassMoveToStorageFromMule').parentNode.parentNode.parentNode.parentNode.style.width = (muleWidth) + "px";
	document.getElementById('imgToggleStorage').parentNode.parentNode.parentNode.parentNode.style.width = (storageWidth) + "px";	document.getElementById('storageListWrapper').style.width= (storageWidth) + "px";	document.getElementById('lnkMassMoveToMuleFromStorage').parentNode.parentNode.parentNode.parentNode.style.width = (storageWidth) + "px";
	var textColor = document.getElementById('txtChatMainInput').style.color;
	document.getElementById('divMainChat').innerHTML										=  "<div id='chatMainWrapper' 				class='content' ><input type='text' id='txtChatMainInput' 			class='chatInput' onkeydown=\"return ChatKeyPressed(event, 'Main');\" 			 onchange=\"return ChatKeyPressed(event, 'Main');\" 			maxlength=275 style=\"color:" + textColor + ";font-face:verdana;width:" +  (chatWidth -80) + "px;\" /><input type='button' value='Main' onclick=\"ChatSend('Main');\" 				class='clickable'/>&nbsp;<span id='chatMainCharsLeft'			> 275</span><table cellspacing=0 cellpadding=0 style='width:"+  (chatWidth) + "px;'><tr><td valign=top style='height:100%;'><ul class='chatList' id='chatListMembersM' style='visibility:visible;height:230px;width:" + toonWidth + "px;cursor:help;'></ul></td><td valign=top style='height:100%;'><ul class='chatList' id='chatListMain' style='height:230px;width:"+  			(chatWidth - toonWidth) + "px;'></ul></td></tr></table></div>";
	document.getElementById('divLocalChat').innerHTML										=  "<div id='chatLocalWrapper' 			class='content' ><input type='text' id='txtChatLocalInput' 			class='chatInput' onkeydown=\"return ChatKeyPressed(event, 'Local');\" 		 onchange=\"return ChatKeyPressed(event, 'Local');\" 			maxlength=275 style=\"color:" + textColor + ";font-face:verdana;width:" +  (chatWidth -80) + "px;\" /><input type='button' value='Local' onclick=\"ChatSend('Local');\" 			class='clickable'/>&nbsp;<span id='chatLocalCharsLeft'			> 275</span><table cellspacing=0 cellpadding=0 style='width:"+  (chatWidth) + "px;'><tr><td valign=top style='height:100%;'><ul class='chatList' id='chatListMembersP' style='visibility:visible;height:230px;width:" + toonWidth + "px;cursor:help;'></ul></td><td valign=top style='height:100%;'><ul class='chatList' id='chatListLocal' style='height:230px;width:"+  		(chatWidth - toonWidth) + "px;'></ul></td></tr></table></div>";
	document.getElementById('divFactionChat').innerHTML									=  "<div id='chatFactionWrapper'			class='content' ><input type='text' id='txtChatFactionInput' 		class='chatInput' onkeydown=\"return ChatKeyPressed(event, 'Faction');\" 		 onchange=\"return ChatKeyPressed(event, 'Faction');\"		maxlength=275 style=\"color:" + textColor + ";font-face:verdana;width:" +  (chatWidth -80) + "px;\" /><input type='button' value='Fact' onclick=\"ChatSend('Faction');\" 			class='clickable'/>&nbsp;<span id='chatFactionCharsLeft'		> 275</span><table cellspacing=0 cellpadding=0 style='width:"+  (chatWidth) + "px;'><tr><td valign=top style='height:100%;'><ul class='chatList' id='chatListMembersF' style='visibility:visible;height:230px;width:" + toonWidth + "px;cursor:help;'></ul></td><td valign=top style='height:100%;'><ul class='chatList' id='chatListFaction' style='height:230px;width:"+  		(chatWidth - toonWidth) + "px;'></ul></td></tr></table></div>";
	document.getElementById('divPublicTradeChat').innerHTML								=  "<div id='chatPublicTradeWrapper' 	class='content' ><input type='text' id='txtChatPublicTradeInput' 	class='chatInput' onkeydown=\"return ChatKeyPressed(event, 'PublicTrade');\" onchange=\"return ChatKeyPressed(event, 'PublicTrade');\" maxlength=275 style=\"color:" + textColor + ";font-face:verdana;width:" +  (chatWidth -80) + "px;\" /><input type='button' value='Trade' onclick=\"ChatSend('PublicTrade');\" 	class='clickable'/>&nbsp;<span id='chatPublicTradeCharsLeft'	> 275</span><table cellspacing=0 cellpadding=0 style='width:"+  (chatWidth) + "px;'><tr><td valign=top style='height:100%;'><ul class='chatList' id='chatListMembersX' style='visibility:visible;height:230px;width:" + toonWidth + "px;cursor:help;'></ul></td><td valign=top style='height:100%;'><ul class='chatList' id='chatListPublicTrade' style='height:230px;width:"+ (chatWidth - toonWidth) + "px;'></ul></td></tr></table></div>";
	document.getElementById('divYardSaleChat').innerHTML									=  "<div id='chatYardSaleWrapper'		 	class='content' ><input type='text' id='txtChatYardSaleInput' 		class='chatInput' onkeydown=\"return ChatKeyPressed(event, 'YardSale');\" 	 onchange=\"return ChatKeyPressed(event, 'YardSale');\" 	maxlength=275 style=\"color:" + textColor + ";font-face:verdana;width:" +  (chatWidth -80) + "px;\" /><input type='button' value='Yard' onclick=\"ChatSend('YardSale');\"	 	class='clickable'/>&nbsp;<span id='chatYardSaleCharsLeft'		> 275</span><table cellspacing=0 cellpadding=0 style='width:"+  (chatWidth) + "px;'><tr><td valign=top style='height:100%;'><ul class='chatList' id='chatListMembersY' style='visibility:visible;height:230px;width:" + toonWidth + "px;cursor:help;'></ul></td><td valign=top style='height:100%;'><ul class='chatList' id='chatListYardSale' style='height:230px;width:"+  	(chatWidth - toonWidth) + "px;'></ul></td></tr></table></div>";
	document.getElementById('divDuelChat').innerHTML										=  "<div id='chatDuelWrapper' 				class='content' ><input type='text' id='txtChatDuelInput' 			class='chatInput' onkeydown=\"return ChatKeyPressed(event, 'Duel');\" 			 onchange=\"return ChatKeyPressed(event, 'Duel');\" 			maxlength=275 style=\"color:" + textColor + ";font-face:verdana;width:" +  (chatWidth -80) + "px;\" /><input type='button' value='Duel' onclick=\"ChatSend('Duel');\" 				class='clickable'/>&nbsp;<span id='chatDuelCharsLeft'			> 275</span><table cellspacing=0 cellpadding=0 style='width:"+  (chatWidth) + "px;'><tr><td valign=top style='height:100%;'><ul class='chatList' id='chatListMembersU' style='visibility:visible;height:230px;width:" + toonWidth + "px;cursor:help;'></ul></td><td valign=top style='height:100%;'><ul class='chatList' id='chatListDuel' style='height:230px;width:"+  			(chatWidth - toonWidth) + "px;'></ul></td></tr></table></div>";
	if (guildless == 0) {		document.getElementById('divGuildChat').innerHTML		=  "<div id='chatGuildWrapper' 				class='content' ><input type='text' id='txtChatGuildInput' 			class='chatInput' onkeydown=\"return ChatKeyPressed(event, 'Guild');\" 		 onchange=\"return ChatKeyPressed(event, 'Guild');\" 			maxlength=275 style=\"color:" + textColor + ";font-face:verdana;width:" +  (chatWidth -80) + "px;\" /><input type='button' value='Guild' onclick=\"ChatSend('Guild');\" 			class='clickable'/>&nbsp;<span id='chatGuildCharsLeft'			> 275</span><table cellspacing=0 cellpadding=0 style='width:"+  (chatWidth) + "px;'><tr><td valign=top style='height:100%;'><ul class='chatList' id='chatListMembersG' style='visibility:visible;height:230px;width:" + toonWidth + "px;cursor:help;'></ul></td><td valign=top style='height:100%;'><ul class='chatList' id='chatListGuild' style='height:230px;width:"+  		(chatWidth - toonWidth) + "px;'></ul></td></tr></table></div>"; }
	document.getElementById('chatWrapper').innerHTML 			=  "<span style='position: absolute; top: " + chatVpos + "px; left: " + chatHpos + "px'>" + document.getElementById('chatWrapper').innerHTML + "</span>";
	document.getElementById('envGameInfo').innerHTML 		=  "<span style='position: absolute; top: " + infoVpos + "px; left: " + infoHpos + "px;'>" + document.getElementById('envGameInfo').innerHTML + "</span>";
	document.getElementById('tradewin').style.top = tradeVpos + "px";
	document.getElementById('tradewin').style.left = tradeHpos + "px";
	document.getElementById('lnkBuyARound').parentNode.style.width = (chatWidth - 10) + "px";
	//document.getElementById('chatListTrade').style.height = "280px";

	document.getElementById('tabChatMain').setAttribute("onclick", "javascript:void(0)");							document.getElementById('tabChatMain').innerHTML ="";			var mainChatToggleLink = document.createElement('a');  	  	mainChatToggleLink.href = 'javascript:void(0)';  	  	mainChatToggleLink.addEventListener('click',foo=function(){chatToggle("Main");}, false);			  	mainChatToggleLink.innerHTML 	="Main";			document.getElementById('tabChatMain').appendChild(mainChatToggleLink);
	document.getElementById('tabChatLocal').setAttribute("onclick", "javascript:void(0)");							document.getElementById('tabChatLocal').innerHTML ="";			var localChatToggleLink = document.createElement('a');  	  	localChatToggleLink.href = 'javascript:void(0)';  	  	localChatToggleLink.addEventListener('click',foo=function(){chatToggle("Local");}, false);			localChatToggleLink.innerHTML 	="Local";			document.getElementById('tabChatLocal').appendChild(localChatToggleLink);
	document.getElementById('tabChatFaction').setAttribute("onclick", "javascript:void(0)");						document.getElementById('tabChatFaction').innerHTML ="";		var factionChatToggleLink = document.createElement('a');  	factionChatToggleLink.href = 'javascript:void(0)';  	factionChatToggleLink.addEventListener('click',foo=function(){chatToggle("Faction");}, false);		factionChatToggleLink.innerHTML ="Faction";		document.getElementById('tabChatFaction').appendChild(factionChatToggleLink);
	document.getElementById('tabChatPublicTrade').setAttribute("onclick", "javascript:void(0)");					document.getElementById('tabChatPublicTrade').innerHTML ="";	var tradeChatToggleLink = document.createElement('a');  	  	tradeChatToggleLink.href = 'javascript:void(0)';  	  	tradeChatToggleLink.addEventListener('click',foo=function(){chatToggle("PublicTrade");}, false);	tradeChatToggleLink.innerHTML 	="Trade";			document.getElementById('tabChatPublicTrade').appendChild(tradeChatToggleLink);
	document.getElementById('tabChatYardSale').setAttribute("onclick", "javascript:void(0)");						document.getElementById('tabChatYardSale').innerHTML ="";		var yardChatToggleLink = document.createElement('a');  	  	yardChatToggleLink.href = 'javascript:void(0)';  	  	yardChatToggleLink.addEventListener('click',foo=function(){chatToggle("YardSale");}, false);		yardChatToggleLink.innerHTML 	="Yard";			document.getElementById('tabChatYardSale').appendChild(yardChatToggleLink);
	document.getElementById('tabChatDuel').setAttribute("onclick", "javascript:void(0)");							document.getElementById('tabChatDuel').innerHTML ="";			var duelChatToggleLink = document.createElement('a');  	  	duelChatToggleLink.href = 'javascript:void(0)';  	  	duelChatToggleLink.addEventListener('click',foo=function(){chatToggle("Duel");}, false);				duelChatToggleLink.innerHTML 	="Duel";			document.getElementById('tabChatDuel').appendChild(duelChatToggleLink);
	if (guildless == 0) { document.getElementById('tabChatGuild').setAttribute("onclick", "javascript:void(0)");	document.getElementById('tabChatGuild').innerHTML ="";			var guildChatToggleLink = document.createElement('a');  	  	guildChatToggleLink.href = 'javascript:void(0)';  	  	guildChatToggleLink.addEventListener('click',foo=function(){chatToggle("Guild");}, false);				guildChatToggleLink.innerHTML 	="Guild";			document.getElementById('tabChatGuild').appendChild(guildChatToggleLink); }

	document.getElementById('tabInventoryChatSpacer').id="tabInventoryToggles";		document.getElementById('tabInventoryToggles').style.display="block";		document.getElementById('tabInventoryToggles').style.height="20px";	document.getElementById('tabInventoryToggles').innerHTML="<table style=\"width:" + (invWidth) + "px\"><tbody align=\"center\"><tr><td id=\"toggleA\" nowrap=\"\"></td><td id=\"toggleB\" nowrap=\"\"></td><td id=\"toggleC\" nowrap=\"\"></td></tr></tbody></table>";
  	var toonToggleLink = document.createElement('a');  	  	toonToggleLink.href = 'javascript:void(0)';  	  	toonToggleLink.addEventListener('click',foo=function(){toonToggle();}, false);		  	toonToggleLink.innerHTML ="Toggle Toons";				document.getElementById('lnkBuyARound').parentNode.appendChild(toonToggleLink);
  	var invToggleLink = document.createElement('a');  		  	invToggleLink.href = 'javascript:void(0)';  	  	invToggleLink.addEventListener('click',foo=function(){invToggle();}, false);	  			invToggleLink.innerHTML ="Toggle Inv";						document.getElementById('toggleA').appendChild(invToggleLink);
  	var muleToggleLink = document.createElement('a');  	  	muleToggleLink.href = 'javascript:void(0)';  	muleToggleLink.addEventListener('click',foo=function(){muleToggle();}, false);	  		muleToggleLink.innerHTML = "Toggle Mule ";				document.getElementById('toggleB').appendChild(muleToggleLink);
  	var storageToggleLink = document.createElement('a');  	storageToggleLink.href = 'javascript:void(0)';  	storageToggleLink.addEventListener('click',foo=function(){storageToggle();}, false);	storageToggleLink.innerHTML =" Toggle Storage ";		document.getElementById('toggleC').appendChild(storageToggleLink);
	document.getElementById('chatWrapper').id = "chatWrapperFrozen";	//freezes the chat portion from going away in characater/quest/wish etc screens
}
function loadToggles() {
	//if (guildless == 0)  chatToggle("Guild");
	chatToggle("PublicTrade");

}
function loadM(){	location.href = "javascript:ShowChat('Main');";			setTimeout(loadToggles, 1000);	}
function loadT(){		location.href = "javascript:ShowChat('PublicTrade');";	setTimeout(loadM, 1000);	}
function loadD(){		location.href = "javascript:ShowChat('Duel');";			setTimeout( loadT, 1000);}
function loadY(){		location.href = "javascript:ShowChat('YardSale');";		setTimeout(loadD, 1000);}
function loadG(){		location.href = "javascript:ShowChat('Guild');";			setTimeout(loadY, 1000);	}
function loadF(){		location.href = "javascript:ShowChat('Faction');";		if (guildless == 0)	{	setTimeout( loadG, 1000); }	else { setTimeout( loadY, 1000);	} 	}
function loadL(){		location.href = "javascript:ShowChat('Local');";			setTimeout(loadF, 1000);	}



function didItLoad() {
	if (document.getElementById('divMainChat') == null )  { location.href = "http://www.domainofheroes.com/Game.aspx"; }
	else {
		setTimeout( loadL, 2000);
		setTimeout( changeUI, 3000);
		setTimeout( hideStuff, 2000);
	}
}
setTimeout( didItLoad, 2000);

// Lurk this is the stuff to move the inv/mule/storage around... it's far from perfect cuz it doesn't consider resizing of neighbors
//	document.getElementById('invHeader').parentNode.parentNode.style.style="position: absolute; top:  123px; left: 456px;";
//	document.getElementById('muleHeader').parentNode.parentNode.style.style="position: absolute; top:  123px; left: 456px;";
//	document.getElementById('storageHeader').parentNode.parentNode.style.style="position: absolute; top:  123px; left: 456px;";
//position: absolute; left: -300px; top: 100px;


//	tableObj = document.createElement("TABLE");
//	tbodyObj = document.createElement("TBODY");
//	tr1Obj = document.createElement("TR");
//	tableObj.appendChild(tbodyObj);
//	tbodyObj.appendChild(tr1Obj);
//	tr1Obj.id = "BelowVXP";
//	document.getElementById('vxpWrapper').parentNode.parentNode.parentNode.appendChild(tr1Obj);
