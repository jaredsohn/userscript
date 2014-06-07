// ==UserScript==
// @name           AETradeHelper
// @namespace      AETradeHelper
// @description    Interface Enhancement of Astroempires (Berzerk version) (Ver:2.11)
// @include        http://*.astroempires.com/base.aspx*
// @include        http://*.astroempires.com/empire.aspx*
// @include        http://*.astroempires.com/board.aspx*
// @include        http://*.astroempires.com/map.aspx*
// @exclude        http://*.astroempires.com/account.aspx*
// @exclude 	     http://*.astroempires.com/home.aspx*
// @exclude 	     http://*.astroempires.com/login.aspx*
// @exclude 	     http://forum.astroempires.com/*
// @exclude 	     http://support.astroempires.com/*
// ==/UserScript==
//****************************************
var ServerURL="http://ae.ourdatabase.info/AETradeHelperV2/";
var Website="http://ae.ourdatabase.info/";
var Version="2.11";
var Name="AETradeHelper";
var Updated="Aug. 20/2009"
var MaxTrades="50";
var MinTradeDistance="0";
var MinTradeEconomy="0";
var AccountID=GetAccountID();
var HideMyPlanets="FALSE"; 
var HideUniquePartners="FALSE";
var EnhanceTradeScreen="FALSE";
var pagetype=getPageType();
var Universe=GetUniverse();
var ServerAlive="FALSE";

CheckIfServerIsAlive();
function Initialize(){
	if (ServerAlive=="TRUE" && AccountID!==null && AccountID!==""){
  	 LoadSettings();
	 InsertSettingsLink();
  	 CheckIfNewInstall();
  	 GetTableWidths();
  	 CheckScriptUpdates();
     if (pagetype=="tradePage"){StartTradeRoutePage()};
     if (pagetype=="trade"){UpdateLinks()};
  	 if (pagetype=="baseOverviewPage"){ReadBaseOverviewPage()};
  	 if (pagetype=="empirePage" && LoadTradeScriptSettings()=="TRUE"){ShowSettings()};
  }else{
  	 ShowServerUnavailable();
  }
}
//***************************************************************
//*****************START OF SCRIPTS
//***************************************************************
function getPageType() {
	
	if (location.search.indexOf('trade')!=-1 && location.search.indexOf('new')!=-1){
			return 'tradePage';
	}
	if (location.href.indexOf('board.aspx')!=-1 && location.search.indexOf('trade')!=-1)  {
			return 'tradeBoard';
	}
	if (location.href.indexOf('tables.aspx')!=-1)  {
			return 'tablesPage';
	}
	if (location.href.indexOf('map.aspx')!=-1){
			var slength = queryURL("loc");
			if (slength.length==12){
			  return 'mapBasePage';
			}
	}
	if (location.href.indexOf('empire.aspx')!=-1) {
		if (location.search.indexOf('trade')!=-1){
			return 'trade';
		}	
		if (location.search=='' ){
			return 'empirePage';
		}	
	}else if (location.href.indexOf('base.aspx')!=-1) {
	  if (location.search.indexOf('trade')!=-1 && location.search.indexOf('new')!=-1){
			return 'tradePage';
		}
		if (location.search.indexOf('base')!=-1 && queryURL("view")==""){
			return 'baseOverviewPage';
		}	
	}else if (location.href.indexOf('account.aspx')!=-1) {
		  return 'accountPage';
	}else{
		return 'other'; 
  }	
	return 'other'; 	 	
}


//***************************************************************
//*****************UPDATES PAGE (Check for Updated Script)
//***************************************************************
function CheckScriptUpdates(){
		CheckUpdates();
		PostCheck();
		CheckNotices();
		
		function CheckUpdates(){
		    Universe=GetUniverse();
    		GM_xmlhttpRequest({
           method:"GET",
           url:ServerURL+"AETradeHelper_UpdateCheck.php?Version="+Version+"&Server="+Universe+"&AccountID="+AccountID,
    			 headers:{
             "User-Agent":"Mozilla/5.0",
             "Accept":"text/xml"
           },
           onload:function(response) {
        		 var ResponseText = response.responseText;
    				 var trimmed = trim(ResponseText);
						 var xValue = trimmed.split("|");
						 if (xValue[0]=='UPGRADE'){	
								AlertUpgradeLink(xValue[2],xValue[1]);										 
						 }
           }
         });
		 }
		 
		 function AlertUpgradeLink(sLink,sNewVer){
				var sUpdateText="<font color='red'><B>NEW VERSION OF "+Name+" Released.</B><BR>MUST go to (Tools/Clear Private Date/Clear Cache) before clicking on the Upgrade Link.<BR>Version: (Current: "+Version+") - (New: "+sNewVer+")</color><BR><a href="+sLink+">Upgrade Link</a><BR><BR>";
				NotifyMessage(sUpdateText);
		 }
		 
		 function CheckNotices(){
		    Universe=GetUniverse();
				GM_xmlhttpRequest({
           method:"GET",
           url:ServerURL+"AETradeHelper_NoticeCheck.php?Version="+Version+"&Server="+Universe+"&AccountID="+AccountID,
    			 headers:{
             "User-Agent":"Mozilla/5.0",
             "Accept":"text/xml"
           },
           onload:function(response) {
        		 var ResponseText = response.responseText;
    				 var trimmed = trim(ResponseText);

						 if (trimmed.match("NOTICE")){	
								NotifyMessage(trimmed);	 								 
						 }
           }
         });
		 }
		 
		 function PostCheck(){
    		GM_xmlhttpRequest({
           method:"GET",
           url:ServerURL+"AETradeHelper_PostCheck.php",
    			 headers:{
             "User-Agent":"Mozilla/5.0",
             "Accept":"text/xml"
           }
         });
		 }
}
function CheckIfServerIsAlive(){
		GM_xmlhttpRequest({
         method:"GET",
         url:ServerURL+"AETradeHelper_ServerAlive.php",
  			 headers:{
           "User-Agent":"Mozilla/5.0",
           "Accept":"text/xml"
         },
         onload:function(response) {
      		 var ResponseText = response.responseText;
  				 var trimmed = trim(ResponseText);

  				 if (trimmed=="ALIVE"){	
						 ServerAlive="TRUE";
						 Initialize();
					 }else{
					   ServerAlive="FALSE";
					   Initialize();
					 }	 			 								 
         }
       });
 }

function ShowServerUnavailable(){
   NotifyMessage("<font color='red'><B>TradeRoute Helper - Server Unavailable</B></font><BR><BR>");
}
//***************************************************************
//*****************TRADES PAGE (Open Or Close TRs)
//***************************************************************

function UpdateLinks(){
    var RouteStatus2="0";
    var arrCells = document.getElementsByTagName('td');
		var ii=1,BaseIDCount=1;
		var PlanetAddress=""; var sFirstSkipped_Eco = "FALSE"; var sPlanetCountDone = 0; var sTotalPlanetCount = 0;
		var PlanetEconomy=""; var sSkipRest_Eco     = "FALSE"; var sFirstSkipped_Num = 0;
    ShowQueryMSG("TRUE");
		GetTotalTradingPartners();
		
		for (idx=0;idx<arrCells.length;idx++) {
		    //Count the Total Planets
			  strValue = arrCells[idx].innerHTML;
				if (strValue.match("loc=")){
					 sTotalPlanetCount=sTotalPlanetCount+1;
				}
    }

		//****************************************************
   	if (AdExist()==true){
  	   var rows = document.evaluate( "//table[4]//tr[@align='center']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  	}else{
  	   var rows = document.evaluate( "//table[3]//tr[@align='center']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  	}

    	for (var i = 0; i < rows.snapshotLength; i++) {
    		var BaseIDCell = document.evaluate( "td[1]", rows.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
				var PlanetAddress = document.evaluate( "td[2]", rows.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
				var PlanetEconomy = document.evaluate( "td[3]", rows.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);								 
        var TradesFilled = document.evaluate( "td[4]", rows.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
				
				BaseIDCell = BaseIDCell.innerHTML;
				
				PlanetAddress=PlanetAddress.innerHTML;
				PlanetAddress=PlanetAddress.replace(/<\/?(A)[^>]*>/gi,"");
				
				PlanetEconomy=PlanetEconomy.innerHTML;
				PlanetEconomy=PlanetEconomy.charAt(0)+PlanetEconomy.charAt(1)+PlanetEconomy.charAt(2);
				PlanetEconomy=trim(PlanetEconomy);
				
				TradesFilled=TradesFilled.innerHTML;
				TradesFilled=TradesFilled.replace(/<\/?(A)[^>]*>/gi,"");

				var FirstPos=BaseIDCell.search('base='); //26
  			FirstPos=FirstPos+5;
  			var BaseID="";
  			 for (idx=FirstPos;idx<BaseIDCell.length;idx++) {
  			   if (BaseIDCell.charAt(idx)=='"'){
						 break;
  				 }
  				 BaseID=BaseID+BaseIDCell.charAt(idx);
  			 }
				 
				 if (IsNumeric(BaseID)==true){
					   UpdateMyBaseIDTrades(PlanetAddress,BaseID,PlanetEconomy);
					   CheckIfRouteIsOpen(PlanetAddress,TradesFilled,sTotalPlanetCount);
				 }
    	}
 	  //****************************************************
		function GetTotalTradingPartners(){
    		var arrCells2 = document.getElementsByTagName('td');
    		for (idx=0;idx<arrCells2.length;idx++) {
    		   strValue = arrCells2[idx].innerHTML;
    			 strValue = strValue.toLowerCase() //Players = Total players involved in trading = 0
    			 if (strValue.match("involved in trading")){
    				  TotalPlayersTrading = strValue.split("=");
    					TotalPlayersTrading = trim(TotalPlayersTrading[3]);
    					TotalPlayersTrading=TotalPlayersTrading.replace('</center>','');
						SaveTotalPlayersTrading(TotalPlayersTrading);
    				}
    		}
		}
//**************************************************************************
    function CheckIfRouteIsOpen(sAddress,TRFilled,sTotalPlanetCount){
		Server=sAddress.charAt(0);
		var TotalRealCount=0;
		
		TotalRealCount=sTotalPlanetCount-1;
		if (sAddress==""){	
			return;
		}
		
    GM_xmlhttpRequest({
         method:"GET",
				 url:ServerURL+"AETradeHelper_Check.php?Server="+Server+"&CheckAddress="+sAddress+"&AID="+AccountID+"&Version="+Version,
    	 headers:{
           "User-Agent":"Mozilla/5.0",            
           "Accept":"text/xml"
         },
         onload:function(response) {
             var ResponseVar = response.responseText;
    				 var trimmed = trim(ResponseVar);
				 
						 TRFilled=TRFilled.replace(/<\/?(A)[^>]*>/gi,"");

						 var TradesOpen = TRFilled.split("/");		 
    				 var x1 = TradesOpen[0].replace(/^(\s|\n|\r)*((.|\n|\r)*?)(\s|\n|\r)*$/g,"$2");
						 var x2 = TradesOpen[1].replace(/^(\s|\n|\r)*((.|\n|\r)*?)(\s|\n|\r)*$/g,"$2");

						 if (trimmed=='OPEN'){
								 if (x1==x2){
										UpdateTradesStatusText(sAddress,"CLOSING TR");		
										CloseTrade(sAddress);
								 }
								 else
								 {
										UpdateTradesStatusText(sAddress,"OPEN TR");		
								 }				 
						 }
						 if (trimmed=='CLOSED_TR_EXPIRED'){								 
										UpdateTradesStatusText(sAddress,"TR EXPIRED");							 
						 }
    				 if (trimmed=='CLOSED'){
    				   if (x1==x2){
							    //UpdateTradesStatusText(sAddress,"CLOSED TR");		
  						 }
  						 else
  						 {
									UpdateTradesStatusText(sAddress,"CAN OPEN TR");
									UpdateTradeOpenText(sAddress);				
  						 }
    				 }
    				 if (trimmed=='FAILED'){
    				   if (x1==x2){
							    //UpdateTradesStatusText(sAddress,"...");		
  						 }
  						 else
  						 {
									UpdateTradesStatusText(sAddress,"CAN OPEN TR");	
									UpdateTradeOpenText(sAddress);			
  						 }	
    				 }
						 sPlanetCountDone=sPlanetCountDone+1;
						 if (sPlanetCountDone>=TotalRealCount){
							 checkTradePage();				 
							 ShowQueryMSG("FALSE");
						 }
    		}
       });
    }	
}
function UpdateMyBaseIDTrades(PlanetAddress,BaseID,PlanetEconomy) {
		s_server=GetUniverse();

		data="?SaveMyPlanetInfo=TRUE&AccountID="+AccountID+"&PlanetID="+PlanetAddress+"&BaseID="+BaseID+"&PlanetEconomy="+PlanetEconomy+"&Server="+s_server+"&Version="+Version;
    url=ServerURL+"AETradeHelper_PostSettings.php";

  	GM_xmlhttpRequest({
      method: "POST",
      url: url+data,
      headers:{'Content-type':'application/x-www-form-urlencoded'},
      data:data
     });
}

function UpdateTradesStatusText(SelectPlanetAddress,NewValue){
   	if (AdExist()==true){
  	   var rows = document.evaluate( "//table[4]//tr[@align='center']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  	}else{
  	   var rows = document.evaluate( "//table[3]//tr[@align='center']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  	}

  	for (var i = 0; i < rows.snapshotLength; i++) {
		  var PlanetAddress = document.evaluate( "td[2]", rows.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);				 
      var TradesFilled = document.evaluate( "td[4]", rows.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
						
		  PlanetAddress=PlanetAddress.innerHTML;
		  PlanetAddress=PlanetAddress.replace(/<\/?(A)[^>]*>/gi,"");

  		if (PlanetAddress==SelectPlanetAddress){
  			 TradesFilled.innerHTML=TradesFilled.innerHTML+"&nbsp&nbsp<font color='red'>"+NewValue+"</color>";
  			 break;
  		}				
  	}
}
function UpdateTradeOpenText(SelectPlanetAddress){
   	if (AdExist()==true){
  	   var rows = document.evaluate( "//table[4]//tr[@align='center']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  	}else{
  	   var rows = document.evaluate( "//table[3]//tr[@align='center']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  	} 

  	for (var i = 0; i < rows.snapshotLength; i++) {
		  var PlanetAddress = document.evaluate( "td[2]", rows.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);				 
      var TradesEconomy = document.evaluate( "td[3]", rows.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
						
		  PlanetAddress=PlanetAddress.innerHTML;
		  PlanetAddress=PlanetAddress.replace(/<\/?(A)[^>]*>/gi,"");

  		if (PlanetAddress==SelectPlanetAddress){
				 LinkID="GM_OpenTR_Link_"+SelectPlanetAddress;
				 SettingsLinkCode="<a id='"+LinkID+"' href='javascript:void(0)'>OPEN TR</a>";
				 TradesEconomy.innerHTML=TradesEconomy.innerHTML+"&nbsp&nbsp"+SettingsLinkCode;

				 document.getElementById(LinkID).addEventListener("click", function(){UpdateTradeOpenText_Link(SelectPlanetAddress);}, false);
  			 break;
  		}				
  	}
}

function UpdateTradeOpenText_Link(sPlanetAddress){
  Server=sPlanetAddress.charAt(0);

	var sURL=ServerURL+"AETradeHelper_PostSettings.php?PlanetID="+sPlanetAddress+"&Server="+Server+"&LinkPushOpenTR=TRUE&AccountID="+AccountID+"&Version="+Version+"&MinEconomy="+MinTradeEconomy+"&MinDistance="+MinTradeDistance;
	GM_xmlhttpRequest({
    method: "POST",
    url: sURL,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
      data:data,
     });	
  
	reloadPage();
}

function CloseTrade(sAddress){
	Server=sAddress.charAt(0);
	
	var sURL=ServerURL+"AETradeHelper_Check.php?Server="+Server+"&CheckAddress="+sAddress+"&CloseAddress=TRUE&AID="+AccountID+"&Version="+Version;
	GM_xmlhttpRequest({
    method: "POST",
    url: sURL,
    headers:{'Content-type':'application/x-www-form-urlencoded'}
  });	
}
function ShowQueryMSG(bShow){
	if (bShow=="TRUE"){
		  var qMsgCells = document.getElementsByTagName('a');
      for (qidx=0;qidx<qMsgCells.length;qidx++) {
      	  if (qMsgCells[qidx].innerHTML=="Trade Routes"){
						qMsgCells[qidx].innerHTML="<font color='red'>Loading...</font>";
					}
      }
	}
	if (bShow=="FALSE"){
		 var qMsgCells = document.getElementsByTagName('a');
      for (qidx=0;qidx<qMsgCells.length;qidx++) {
					if (qMsgCells[qidx].innerHTML=='<font color="red">Loading...</font>'){
						qMsgCells[qidx].innerHTML="Trade Routes";
					}
      }
	}
}

//***************************************************************
//*****************Enhance Trade Screen
//***************************************************************
  var tradeNames = new Array();
  var tradeNodes = new Array();
function checkTradePage() {
  var MyName="";
  	
	UpdateUserBaseIDTrades();
	if (EnhanceTradeScreen=="TRUE"){
     StartTREnhance();
		 highlightInActiveTR();
	   findPoorTradeDistance();
	   findPoorTrades();
	 }

	function highlightTrade(nameToFind) {
		var allNames, thisName, lastName;
  	allNames = document.evaluate( "//small[@class='gray']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  	var saveData = "";
  	for (var i = 0; i < allNames.snapshotLength; i++) {
			
			if(i%2==1) {
  			   thisName = allNames.snapshotItem(i);
  			    if (thisName.innerHTML==nameToFind){
				  thisName.innerHTML=thisName.innerHTML+" <font color='red'>(Duplicate TR)</font>";
				}
				if (thisName.innerHTML==MyName){
				  thisName.innerHTML=thisName.innerHTML+" <font color='red'>(Self TR)</font>";
				}
  		}
  	}
	}
  function highlightInActiveTR() {
		var varCells = document.getElementsByTagName('td');
		for (idx=0;idx<varCells.length;idx++) {
			if (varCells[idx].innerHTML=='Inactive'){
				varCells[idx].innerHTML="<Font color='red'><B>Inactive</B></font>";
			}
    }
	}
	
	function StartTREnhance(){
    	var allNames, thisName, lastName;
    	allNames = document.evaluate( "//small[@class='gray']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    	var saveData = "";
    	for (var i = 0; i < allNames.snapshotLength; i++) {
    		if(i%2==1) {
    			thisName = allNames.snapshotItem(i);
    			saveData = thisName.innerHTML+";"+saveData;
    		}
    		if(i%2==0) {
    			    thisName = allNames.snapshotItem(i);
    					MyName=thisName.innerHTML;
    			}
    	}
    	
    	var SplitData1 = saveData.split(";");
    	var SplitData2 = saveData.split(";");
    	for (var i = 1; i < SplitData1.length; i++) {
    		for (var ii = 1; ii < SplitData2.length; ii++) {
    		  if(SplitData1[i] == SplitData2[ii]) {
           if (i !== ii){
    				 highlightTrade(SplitData1[i]);
           }
    		  }
    		}
    	}
	}
}
function findPoorTrades() {
	if (AdExist()==true){
	   var rows = document.evaluate( "//table[5]//tr[@align='center']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}else{
	   var rows = document.evaluate( "//table[4]//tr[@align='center']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	} 
	var upperThreshold = LoadMinimumTradeEconomy();
	var lowerThreshold = LoadMinimumTradeEconomy();

	if (upperThreshold!=="0" || lowerThreshold!=="0"){
    	for (var i = 0; i < rows.snapshotLength; i++) {
    		var eco1Cell = document.evaluate( "td[3]", rows.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0); 
    		var eco2Cell = document.evaluate( "td[4]", rows.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0); 
    		var eco1 = parseInt(eco1Cell.innerHTML);
    		var eco2 = parseInt(eco2Cell.innerHTML);
    		if(eco2 - eco1 > upperThreshold) {
    			eco2Cell.style.color = "orange";
    		}
    		if(eco2 - eco1 < -1*lowerThreshold) {		
    			eco2Cell.style.color = "red";
    		}
    	}
	}
}
function findPoorTradeDistance() {
	if (AdExist()==true){
	   var rows = document.evaluate( "//table[5]//tr[@align='center']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}else{
	   var rows = document.evaluate( "//table[4]//tr[@align='center']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	} 
	var lowerThreshold = LoadMinTradeDistance();

	if (lowerThreshold!=="0"){
    	for (var i = 0; i < rows.snapshotLength; i++) {
    		var eco1Cell = document.evaluate( "td[5]", rows.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0); 

				var distance = eco1Cell.innerHTML;
				distance = distance.replace(" ","");
				distance = distance.replace(",","");
				distance = distance.replace(".","");
    		if(distance < lowerThreshold) {
    			eco1Cell.style.color = "red";
    		}
    	}
	}
}
function UpdateUserBaseIDTrades() {
	if (AdExist()==true){
	   var rows = document.evaluate( "//table[5]//tr[@align='center']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}else{
	   var rows = document.evaluate( "//table[4]//tr[@align='center']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	} 
	var AllBaseIDs="";

  	for (var i = 0; i < rows.snapshotLength; i++) {
  		var eco1Cell = document.evaluate( "td[2]", rows.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0); 

  		var distance = eco1Cell.innerHTML;
  
  		if (distance.match("base=")){
  		   var FirstPos=distance.search('base='); //26
  			 FirstPos=FirstPos+5;
  			 var BaseID="";
  			 for (idx=FirstPos;idx<distance.length;idx++) {
  			   if (distance.charAt(idx)=='"'){
  				   break;
  				 }
  				 BaseID=BaseID+distance.charAt(idx);
  			 }
				 if (AllBaseIDs==""){
				   AllBaseIDs="|"+BaseID
				 }
				 if (AllBaseIDs!==""){
				   AllBaseIDs=AllBaseIDs+"|"+BaseID
				 }
  		}
  	}

 	  data="?SaveBasesTradingWith=TRUE&AccountID="+AccountID+"&Version="+Version+"&BaseIDs="+AllBaseIDs+"|";
    url=ServerURL+"AETradeHelper_PostSettings.php";
  	
  	GM_xmlhttpRequest({
      method: "POST",
      url: url+data,
      headers:{'Content-type':'application/x-www-form-urlencoded'},
      data:data,
			 onload:function(response) {
         var ReturnResponse = response.responseText;
				 var trimmed = trim(ReturnResponse);

				 if (trimmed=='POST_U_OK'){
				   //alert("Planet Address: as been updated.");
				 }
				 if (trimmed=='POST_N_OK'){
				   //alert("Planet Address:  has been added.");
				 }
				 if (trimmed=='POST_FAILED'){
				 	 //alert("Adding Planet Address:  has FAILED.");	
				 }
		   }
     });
}
//***************************************************************
//*****************SHOW AVAILABLE TRADE ROUTES
//***************************************************************
function StartTradeRoutePage(){
 	var arrCells = document.getElementsByTagName('center');
      for (idx=0;idx<arrCells.length;idx++) {
        ButtonValue=arrCells[idx].innerHTML;
  			ButtonValue=ButtonValue.toLowerCase();
  			if (ButtonValue.match("have enough spaceports")){
  			  arrCells[idx].innerHTML="Destination base doesn't have enough Spaceports.<BR>AETradeHelper - Closed TradeRoute";
					CloseDestinationTradeRoute();
  			}
				if (ButtonValue.match("have a spaceports")){
  			  arrCells[idx].innerHTML="Destination base doesn't have a Spaceports.<BR>AETradeHelper - Closed TradeRoute";
					CloseDestinationTradeRoute();
  			}
				if (ButtonValue.match("plundered")){
  			  arrCells[idx].innerHTML="Not possible, destination base was plundered recently.<BR>AETradeHelper - Closed TradeRoute";
					CloseDestinationTradeRoute();
  			}
				if (ButtonValue.match("invalid")){
  			  arrCells[idx].innerHTML="Invalid Destination";
  			}
      }
  var arrCells = document.getElementsByTagName('small');
      for (idx=0;idx<arrCells.length;idx++) {
        ButtonValue=arrCells[idx].innerHTML;
				ButtonValue=ButtonValue.toLowerCase();
  			//if (ButtonValue.match("(Note: You already have a trade route with this player)")){
				if (ButtonValue.match("route with this player")){
  			  PAddress=document.getElementById("destination").value;
					arrCells[idx].innerHTML="<font size='3' color='orange'>(Note: You already have a trade route with this player) "+PAddress+"</font>";
  			}
      }			  
GetTradeRoutes();
}

function GetTradeRoutes(){
		start=document.getElementById("start").innerHTML;
	  var s_server=String(start.charAt(0));
		var s_TotalTraders=GetTotalPlayersTrading();
		var TableWidth=LoadTableWidth(); 
		
		//Show Loading Data Trade List
    var logo = document.createElement("div");
		logo.setAttribute('id','AETraderLoading1');
		logo.innerHTML = "<div id='AETraderLoading2'><center><B><H2><font color='red'>LOADING TRADE LIST DATA</font></H2></B></center></div>"
		document.body.appendChild(logo, document.body.lastChild);
		//*****
		
		GM_xmlhttpRequest({
       method:"GET",
       url:ServerURL+"AETradeHelper_List.php?Server="+s_server+"&Version="+Version+"&PlanetAddress="+start+"&TotalTraders="+s_TotalTraders+"&AccountID="+AccountID+"&HideMyPlanets="+HideMyPlanets+"&MinDistance="+MinTradeDistance+"&MaxTradesToShow="+MaxTrades+"&TableWidth="+TableWidth+"&HideUniquePartners="+HideUniquePartners,
			 headers:{
         "User-Agent":"Mozilla/5.0", 
         "Accept":"text/xml"
       },
       onload:function(response) {
				 if (pagetype=='tradePage') {
          	var logo = document.createElement("div");
            	
            logo.innerHTML = "<BR><BR><center><B>AstroEmpires - Trade Route Helper</B></center>"
            logo.innerHTML += "<BR><center><input type='submit' id='LOT' name='submit' value='List Open Trade' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name='submit' id='RLT' type='submit' value='Remove Listed Trades' /></center>"
            logo.innerHTML += "<BR>"
            logo.innerHTML += (response.responseText);

        	  document.body.appendChild(logo, document.body.lastChild);
						
						//Remove Loading Data Div
						var child = document.getElementById('AETraderLoading2');
            var parent = document.getElementById('AETraderLoading1');
            parent.removeChild(child);
						//*****
						
            var button = document.getElementById('LOT');
						button.addEventListener('click', Post_AddTradeRoute, false);
						
						var button = document.getElementById('RLT');
						button.addEventListener('click', RemoveListedTrades, false);
					}
       }
     });
 }
 
function Post_AddTradeRoute(){
	start=document.getElementById("start").innerHTML;
	s_server=String(start.charAt(0));
  
	var bFailFunction = false;
	var PlanetAddress = document.getElementById("start").innerHTML;
  MinTradeEconomy=LoadMinimumTradeEconomy();
	
  var arrCells = document.getElementsByTagName('td');
	var StringData = "";
	var DoesAdExist = AdExist();
  for (idx=0;idx<arrCells.length;idx++) {
		if (DoesAdExist==true){
			if (idx==13){
    	  		PlanetEco=arrCells[idx].innerHTML;
    		}
		}else{	
  			if (idx==12){
    	  		PlanetEco=arrCells[idx].innerHTML;
    		}
		}
  }
  
	data="?PlanetID="+PlanetAddress+"&PlanetEconomy="+PlanetEco+"&Status=OPEN&BasePost=FALSE&Post=TRUE&Server="+s_server+"&Version="+Version+"&AccountID="+AccountID+"&MinDistance="+MinTradeDistance+"&MinEconomy="+MinTradeEconomy;
  url=ServerURL+"AETradeHelper_Post.php";

	if (PlanetAddress=="" || PlanetAddress==null){
		 alert("Error: Problem reading the Planet Address, can not open the trade route.");
		 bFailFunction = true;
	}
	if (PlanetEco=="" || PlanetEco==null){
		 alert("Error: Problem reading the Planet Economy, can not open the trade route.");
		 bFailFunction = true;
	}
	if (IsNumeric(PlanetEco)=="true" && bFailFunction==false){
		 alert("Error: Problem reading the Planet Economy, can not open the trade route.");
		 bFailFunction = true;
	}
	if (MinTradeDistance=="" || MinTradeDistance==null){
		 alert("Error: Problem reading the Trade Distance, can not open the trade route.");
		 bFailFunction = true;
	}
	if (MinTradeEconomy=="" || MinTradeEconomy==null){
		 alert("Error: Problem reading the Trade Economy, can not open the trade route.");
		 bFailFunction = true;
	}
	if (bFailFunction == true){return}

	GM_xmlhttpRequest({
    method: "POST",
    url: url+data,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:data,
		onload:function(response) {
         var ReturnResponse = response.responseText;
				 var trimmed = trim(ReturnResponse);

				 if (trimmed=='POST_FAILED'){
				 	 alert("Adding Planet Address: "+PlanetAddress+" has FAILED.");	
				 }
		}
  });	
	reloadPage();
}

function RemoveListedTrades(bCloseSelectedTR){	
  var PlanetAddress = document.getElementById("start").innerHTML;
	start=document.getElementById("start").innerHTML;
	s_server=String(start.charAt(0));
			
  var arrCells = document.getElementsByTagName('td');
	var DoesAdExist = AdExist();
  for (idx=0;idx<arrCells.length;idx++) {
		if (DoesAdExist==true){
			if (idx==13){
    	  		PlanetEco=arrCells[idx].innerHTML;
    		}
		}else{	
  			if (idx==12){
    	  		PlanetEco=arrCells[idx].innerHTML;
    		}
		}
  }

	data="?PlanetID="+PlanetAddress+"&PlanetEconomy="+PlanetEco+"&Status=CLOSED&BasePost=FALSE&Post=FALSE&Server="+s_server+"&Version="+Version+"&AccountID="+AccountID;
	url=ServerURL+"AETradeHelper_Post.php";

	GM_xmlhttpRequest({
    method: "POST",
    url: url+data,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:data,
		onload:function(response) {
         var ReturnResponse = response.responseText;
				 var trimmed = trim(ReturnResponse);

				 if (trimmed=='POST_FAILED'){
				 	 alert("Removing Planet Address: "+PlanetAddress+" has FAILED.");	
				 }
		}
  });	
	reloadPage();
}
function CloseDestinationTradeRoute(){	
	var PlanetAddress = document.getElementById("destination").value;
  
	data="?PlanetID="+PlanetAddress+"&PlanetEconomy=0&Status=CLOSED&Post=FALSE&BasePost=FALSE&Server="+Universe+"&Version="+Version+"&CloseDestinationRoute=TRUE&AccountID="+AccountID;
	url=ServerURL+"AETradeHelper_Post.php";

	GM_xmlhttpRequest({
    method: "POST",
    url: url+data,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:data,
		onload:function(response) {
         var ReturnResponse = response.responseText;
				 var trimmed = trim(ReturnResponse);

				 if (trimmed=='POST_U_OK'){
				   //alert("Planet Address: "+PlanetAddress+" has been removed.");
				 }
				 if (trimmed=='POST_FAILED'){
				 	 alert("Removing Planet Address: "+PlanetAddress+" has FAILED.");	
				 }
		}
  });	
	//document.getElementById("destination").value="";
}
//***************************************************************
//*****************Process Single Base Information
//***************************************************************
function ReadBaseOverviewPage(){
  var BaseID=queryURL("base");
	var PlayerID="";
	var PlanetAddress="";
	var PlayerName="";
	var PlanetEconomy=0;
	var bPlanetEconomyFailed="FALSE";
  //This is not suppose to work on your own bases, only other peoples.
	
	if (GetPlayerTotalTRs()=="OPEN" || GetPlayerTotalTRs()=="CLOSED"){
	   PlanetAddress=GetPlanetAddress();
	   PlayerID=GetUniverse()+"."+GetPlayerID();
	   PlanetEconomy=GetPlayerEconomy();
		 if (bPlanetEconomyFailed=="TRUE"){
		   AlertUserBase("LOADING","FALSE");
			 SaveBaseInformation("CLOSED");
			 return;
		 }
		 if (GetPlayerTotalTRs()=="OPEN" && PlayerName==""){
		   AlertUserBase("LOADING","FALSE");
			 SaveBaseInformation("OPEN");
			 return;
		 }
		 if (GetPlayerTotalTRs()=="CLOSED" && PlayerName==""){
			 AlertUserBase("LOADING","FALSE");
			 SaveBaseInformation("CLOSED");
			 return;
		 }
		 if (PlayerName!==""){
			 AlertUserBase("TR - POST FAILED","FALSE");
			 return;
		 }
	}

	function GetPlanetAddress(){
		var rows = document.evaluate( "//table[2]//tr[@align='center']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
  		  var PlanetAddress = document.evaluate( "td[2]", rows.snapshotItem(0), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);				 
  			PlanetAddress=PlanetAddress.innerHTML;
				PlanetAddress=PlanetAddress.replace(/<\/?(A)[^>]*>/gi,"");
				if (PlanetAddress.length==12){
				  return PlanetAddress;
				}else{
				  return "";
				}	
	}
	function GetPlayerID(){
  	var rows = document.evaluate( "//table[3]//tr[@align='center']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
    	for (var i = 0; i < rows.snapshotLength; i++) {
  		  var TDTitle = document.evaluate( "td[1]", rows.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);				 
  		  var TDPlayer = document.evaluate( "td[2]", rows.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
				
				TDTitle=TDTitle.innerHTML;
				PlayerID="";
				PlayerName="";
				// 			
				if (TDTitle=="Base Owner"){
  				TDPlayer=queryString(TDPlayer.innerHTML,"player");
					var TDPlayerName=TDPlayer.toLowerCase();
					FirstPos=0;

					if (TDPlayerName.match("united")){
					  PlayerName="United Colonies";
					}
					if (TDPlayerName.match("drekons")){
					  PlayerName="Drekons";
					}
					for (idx=FirstPos;idx<TDPlayer.length;idx++) {
  			     if (TDPlayer.charAt(idx)=='"'){
  				     break;
  				   }
  				   PlayerID=PlayerID+TDPlayer.charAt(idx);
  			  }
    			if (IsNumeric(PlayerID)==true){
						return PlayerID;
  				}
    		}		
    	}
			return "";	
	}	
	function GetPlayerEconomy(){
  	var rows = document.evaluate( "//table[3]//tr[@align='center']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var strEconomy = "";
		var strIncome = "";
		 
    	for (var i = 0; i < rows.snapshotLength; i++) {
  		  var TDTitle = document.evaluate( "td[1]", rows.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);				 
  		  var TDEconomy = document.evaluate( "td[2]", rows.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
				TDTitle=TDTitle.innerHTML;
				TDEconomy=TDEconomy.innerHTML;  	

				if (TDTitle=="Economy"){
  				strEconomy=TDEconomy;
    		}
				if (TDTitle=="Owner Income"){
				  strIncome=TDEconomy; 
					if (strEconomy==strIncome){
					   bPlanetEconomyFailed="FALSE";
						 return strEconomy;
					}else{
					   bPlanetEconomyFailed="TRUE";
						 return strEconomy;
					}
				}		
    	}
			return "";
	}
	function GetPlayerTotalTRs(){
  	var rows = document.evaluate( "//table[2]//tr[@align='center']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
    var TotalTRs = document.evaluate( "td[6]", rows.snapshotItem(0), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);				 
	  TotalTRs=trim(TotalTRs.innerHTML);
		if (TotalTRs!==""){
		  SplitTRs=TotalTRs.split("/");
			if (SplitTRs[0]==SplitTRs[1]){
			   return "CLOSED";
			}else{
			   return "OPEN";
			}
		}
		return "";
	}
	function AlertUserBase(sMessage,bReplace){
	  if (bReplace=="TRUE"){
		   var MsgValue = document.getElementById("ATH_Message");
			 MsgValue.innerHTML="<font color='red'><B>"+sMessage+"</B></font>";
			 return "";
		}
		var rows = document.evaluate( "//table[2]//tr[@align='center']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
    	for (var i = 0; i < rows.snapshotLength; i++) {
  		  var TDTitle = document.evaluate( "td[6]", rows.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);				 
								
				TDTitle.innerHTML=TDTitle.innerHTML+"<BR><div id='ATH_Message'><font color='red'><B>"+sMessage+"</B></font></div>";
    	}
			return "";
	}
	function SaveBaseInformation(sStatus){
	    var s_server=GetUniverse();
    	GM_xmlhttpRequest({
           method:"POST",
           url:ServerURL+"AETradeHelper_Post.php?BasePost=TRUE&Status="+sStatus+"&BaseID="+BaseID+"&PlanetID="+PlanetAddress+"&Version="+Version+"&AccountID="+AccountID+"&PlayerID="+PlayerID+"&PlanetEconomy="+PlanetEconomy+"&Server="+s_server,
    			 headers:{
             "User-Agent":"Mozilla/5.0", 
             "Accept":"text/xml"
           },
           onload:function(response) {
      				 ReturnFeedBackHTML=trim(response.responseText);
    					 if (ReturnFeedBackHTML=="POST_OPEN"){
    					    AlertUserBase("TR - OPEN","TRUE");
    					 }
							 if (ReturnFeedBackHTML=="POST_OK"){
							    AlertUserBase("TR - POSTED OK","TRUE");
							 }		 
							 if (ReturnFeedBackHTML=="POST_FAILED"){
							    AlertUserBase("TR - POST FAILED","TRUE");
							 }
							 if (ReturnFeedBackHTML=="POST_PENDING"){
							    AlertUserBase("TR - ALREADY OPEN","TRUE");
							 }
							 if (bPlanetEconomyFailed=="TRUE"){
							    AlertUserBase("TR - ECO NOT FULL","TRUE");
							 }
           }
         });
	}
}

//***************************************************************
//*****************LOAD/SAVE Trade Settings
//***************************************************************
function InsertSettingsLink(){
    var arrCells = document.getElementsByTagName('div');
    for (idx=0;idx<arrCells.length;idx++) {
  	  strValue = arrCells[idx].innerHTML;
  		if (strValue.match("home.aspx")){
			  FirstPartHTML=arrCells[idx].innerHTML;
				SettingsLinkCode="<a id='GM_TH_Settings_Link' href='javascript:void(0)'>AETradeHelper</a>";
				SecondPartHTML=FirstPartHTML.replace("Home</a> - ","Home</a> - "+SettingsLinkCode+" - ");
				arrCells[idx].innerHTML=SecondPartHTML;
        document.getElementById('GM_TH_Settings_Link').addEventListener("click", ShowAETraderSettings, false);
				break;
      }
    }    
}

function ShowAETraderSettings(event){
	SaveTradeScriptSettings("TRUE");
	window.location = "empire.aspx";
}

function ShowSettings(){ 
	var arrCells = document.getElementsByTagName('body');
    for (idx=0;idx<arrCells.length;idx++) {
  	  NewHTML="<br><center><B><font size='4' color='red'>AETradeHelper Script Settings</font></B><br><br><a href='empire.aspx'>Return to Empire</a><br><br><a href='"+Website+"' target='_blank'>Link to Website</a><br></center>";
			arrCells[idx].innerHTML=NewHTML;
    }	
	InsertSettings();
	SaveTradeScriptSettings("FALSE");
}

function InsertSettings(){
   var logo = document.createElement("div");
   var ScriptUpdatesHTML="";
	 var TableWidth=LoadTableWidth(); 

	 GM_xmlhttpRequest({
       method:"GET",
       url:ServerURL+"AETradeHelper_UpdateStats.php",
			 headers:{
         "User-Agent":"Mozilla/5.0",
         "Accept":"text/xml"
       },
       onload:function(response) {
  				 ScriptUpdatesHTML=response.responseText;
  				 
					var dataHTML="";
          dataHTML = dataHTML+"<BR><center><table width='"+TableWidth+"'><tr><th class='th_header2' colspan='3'><font size='+1'>A</font>stroEmpires - Trade Route Helper (Settings)</th></tr>";
          dataHTML = dataHTML+"<tr><th colspan='3'><BR><small><font color='orange'>Script Version:</font> &nbsp "+Version+"<BR><font color='orange'>Script Released:</font> &nbsp "+Updated+"</small><BR><BR>"+ScriptUpdatesHTML+"<BR><BR></th></tr>";
          dataHTML = dataHTML+"<tbody><tr><th width='170'>Feature</th><th>Description</th><th width='130'>Value</th></tr>";
          dataHTML = dataHTML+"<tr><td style='padding-left: 5px;'>Max Trades to Show</td><td style='padding-left: 10px;'><Small>Max trades to show when viewing the trade list.</Small></td><td style='padding-left: 10px;'><input type='text' id='TRH_Setting_MaxTrades' size='8'></td></tr>";
          dataHTML = dataHTML+"<tr><td style='padding-left: 5px;'>Hide my own Bases</td><td style='padding-left: 10px;'><Small>Hide your own bases when viewing the trade list screen.</Small></td><td style='padding-left: 10px;'><select id='TRH_Setting_ShowMyBases'><option value='TRUE'>TRUE</option><option value='FALSE'>FALSE</option></select></td></tr>";
          dataHTML = dataHTML+"<tr><td style='padding-left: 5px;'>Minimum Trade Distance</td><td style='padding-left: 10px;'><Small>Minimum trade distance shown to you and remote player in the trade lists, set to Zero to not apply the rule.</Small></td><td style='padding-left: 10px;'><input type='text' id='TRH_Setting_MinTradeDistance' size='8'></td></tr>";
          dataHTML = dataHTML+"<tr><td style='padding-left: 5px;'>Minimum Trade Diff</td><td style='padding-left: 10px;'><Small>Set to Zero if you do not want a rule applied. If you enter 10 it will only list +10 or -10 of your base economy to the remote user. </Small></td><td style='padding-left: 10px;'><input type='text' id='TRH_Setting_MinTradeEconomy' size='8'></td></tr>";
          dataHTML = dataHTML+"<tr><td style='padding-left: 5px;'>Enhance Trade Screen</td><td style='padding-left: 10px;'><Small>Enhance Trade Screen.</Small></td><td style='padding-left: 10px;'><select id='TRH_Setting_EnhanceTRScreen'><option value='TRUE'>TRUE</option><option value='FALSE'>FALSE</option></select></td></tr>";					
          dataHTML = dataHTML+"<tr><td style='padding-left: 5px;'>Hide Unique Trade Partners</td><td style='padding-left: 10px;'><Small>Hide all trade routes with a player that you are already trading with.</Small></td><td style='padding-left: 10px;'><select id='TRH_Setting_HideUniqueTRParters'><option value='TRUE'>TRUE</option><option value='FALSE'>FALSE</option></select></td></tr>";
          dataHTML = dataHTML+"<tr><td style='padding-left: 5px;'></td><td><BR><center><input type='submit' id='TRH_SaveSettings' name='Save Settings' value='Save Settings' /></center></td><td>&nbsp</td></tr>";
          dataHTML = dataHTML+"</tbody></table></center>";				
					 
					 logo.innerHTML = dataHTML;

					 
           document.body.appendChild(logo, document.body.lastChild);
        	 var button = document.getElementById('TRH_SaveSettings'); 
        	 button.addEventListener('click', SaveSettings, false);

					 //****************************        
        	 if (LoadMaxTrades()==null){
        		 SaveMaxTrades("50");
        		 document.getElementById("TRH_Setting_MaxTrades").value="50";
        	 }
        	 if (LoadMaxTrades()!==null){ 
        	   if (LoadMaxTrades()>50){document.getElementById("TRH_Setting_MaxTrades").value=50;}
						 if (LoadMaxTrades()<51){document.getElementById("TRH_Setting_MaxTrades").value=LoadMaxTrades();}
        	 }
					 //****************************
					 if (LoadMinTradeDistance()==null){
        		 SaveMinTradeDistance("0");
        		 document.getElementById("TRH_Setting_MinTradeDistance").value="0";
        	 }
        	 if (LoadMinTradeDistance()!==null){ 
        	   document.getElementById("TRH_Setting_MinTradeDistance").value=LoadMinTradeDistance();
        	 }					 
					 //****************************					 
        	 if (LoadShowMyOwnBases()==null){
        		 SaveShowMyOwnBases("TRUE");
        		 document.getElementById("TRH_Setting_ShowMyBases").value="TRUE";
        	 }
        	 if (LoadShowMyOwnBases()=="TRUE" || LoadShowMyOwnBases()=="FALSE"){
        	   document.getElementById("TRH_Setting_ShowMyBases").value=LoadShowMyOwnBases();
        	 }
					 //****************************	
					 if (LoadMinimumTradeEconomy()==null){
        		 SaveMinimumTradeEconomy("0");
        		 document.getElementById("TRH_Setting_MinTradeEconomy").value="0";
        	 }
        	 if (LoadMinimumTradeEconomy()!==null){ 
        	   document.getElementById("TRH_Setting_MinTradeEconomy").value=LoadMinimumTradeEconomy();
        	 }
					 //****************************	
					 if (LoadHideUniquePartners()==null){
        		 SaveHideUniquePartners("FALSE");
        		 document.getElementById("TRH_Setting_HideUniqueTRParters").value="FALSE";
        	 }
        	 if (LoadHideUniquePartners()=="TRUE" || LoadHideUniquePartners()=="FALSE"){
        	   document.getElementById("TRH_Setting_HideUniqueTRParters").value=LoadHideUniquePartners();
        	 }
					 //****************************	
					 if (LoadEnhanceTradeScreen()==null){
        		 SaveEnhanceTradeScreen("FALSE");
        		 document.getElementById("TRH_Setting_EnhanceTRScreen").value="FALSE";
        	 }
        	 if (LoadEnhanceTradeScreen()=="TRUE" || LoadEnhanceTradeScreen()=="FALSE"){
        	   document.getElementById("TRH_Setting_EnhanceTRScreen").value=LoadEnhanceTradeScreen();
        	 }
					 //****************************	
					 InsertFeedBack(); //Insert Feedback Table after the Settings Table
					 //****************************				 
       }
     });
		 
}

function InsertFeedBack(){
   var logo = document.createElement("div");
   var ScriptFeedBackHTML="";
	 var TableWidth=LoadTableWidth(); 

	 GM_xmlhttpRequest({
       method:"GET",
       url:ServerURL+"AETradeHelper_FeedBack.php?ReadFeedBacks=TRUE",
			 headers:{
         "User-Agent":"Mozilla/5.0", 
         "Accept":"text/xml"
       },
       onload:function(response) {
  				 ScriptFeedBackHTML=response.responseText;
					 if (ScriptFeedBackHTML.length<10){ScriptFeedBackHTML=trim(ScriptFeedBackHTML);}
					 
					 if (ScriptFeedBackHTML=="" || ScriptFeedBackHTML==null){
					   logo.innerHTML = "<BR><BR><table align='center' width='"+TableWidth+"'><tr><th class='th_header2'><font size='+1'>A</font>stroEmpires - Trade Route Helper (FeedBack Form)</th></tr><center><BR><small><B>Posting your feedback will allow the developers to further enhance your gaming experience.</small></B><BR><BR> <textarea id='TRH_FeedBack_Text' rows='10' cols='100%'></textarea><BR><BR><BR><input type='submit' id='TRH_PostFeedBack' name='Post FeedBack' value='Post FeedBack' /></center><BR>&nbsp</TR></table>";
					 }
					 if (!ScriptFeedBackHTML==""){
					   logo.innerHTML = "<BR><BR><table align='center' width='"+TableWidth+"'><tr><th class='th_header2'><font size='+1'>A</font>stroEmpires - Trade Route Helper (FeedBack Form)</th></tr><center><BR><small><B>Posting your feedback will allow the developers to further enhance your gaming experience.</small></B><BR><BR><font color='orange'>The Devolopers would like some feedback on the following topics, before we implement.</font><BR><small>"+ScriptFeedBackHTML+"</small><BR> <textarea id='TRH_FeedBack_Text' rows='10' cols='100%'></textarea><BR><BR><BR><input type='submit' id='TRH_PostFeedBack' name='Post FeedBack' value='Post FeedBack' /></center><BR>&nbsp</TR></table>";
					 }
					 
           document.body.appendChild(logo, document.body.lastChild);
        	 var button = document.getElementById('TRH_PostFeedBack'); 
        	 button.addEventListener('click', PostFeedBack, false);

					 //****************************        
        	 InsertFAQ(); //Insert FAQ Table after the Settings Table
					 //****************************				 
       }
     });
}
function InsertFAQ(){
   var logo = document.createElement("div");
   var ScriptFeedBackHTML="";
	 var TableWidth=LoadTableWidth(); 

	 GM_xmlhttpRequest({
       method:"GET",
       url:ServerURL+"AETradeHelper_FAQ.php?TableWidth="+TableWidth,
			 headers:{
         "User-Agent":"Mozilla/5.0", 
         "Accept":"text/xml"
       },
       onload:function(response) {
  				 ScriptFeedBackHTML=response.responseText;
  				 logo.innerHTML = "<BR><BR>"+ScriptFeedBackHTML+"<BR><BR>";
					 
           document.body.appendChild(logo, document.body.lastChild);			 
       }
     });
}
function PostFeedBack(){
  var FeedBack=document.getElementById("TRH_FeedBack_Text").value;
	if (FeedBack=="" || FeedBack==null){
	  alert("Must enter some text to post a feedback first.");
	}

	if (!FeedBack==""){
		var reNewLines=/[\n\r]/g; //Remove CR's
		var FeedBackNew = FeedBack.replace(reNewLines,'|'); 

	  document.getElementById("TRH_PostFeedBack").value="SENDING";

		GM_xmlhttpRequest({
       method:"POST",
       url:ServerURL+"AETradeHelper_FeedBack.php?FeedBackText="+FeedBackNew+"&Version="+Version+"&AccountID="+AccountID,
			 headers:{
         "User-Agent":"Mozilla/5.0", 
         "Accept":"text/xml"
       },
       onload:function(response) {
  				 ReturnFeedBackHTML=trim(response.responseText);

					 if (ReturnFeedBackHTML=="POSTED"){
					   //alert("Feedback Was Posted Successfully.");
						 document.getElementById("TRH_FeedBack_Text").value="";
						 document.getElementById("TRH_PostFeedBack").value="MESSAGE SENT";
					 }
					 if (ReturnFeedBackHTML=="ERROR"){
					   alert("Feedback was not posted successfully, please try back again later.");
						 document.getElementById("TRH_PostFeedBack").value="Post FeedBack";
					 }				 
       }
     });
	}
}
function LoadSettings(){
	 var sPassCount=0;			 
	 if (LoadMaxTrades()!==null){
		 MaxTrades=LoadMaxTrades();
		 sPassCount=sPassCount+1;
	 }
	 if (LoadMinTradeDistance()!==null){
		 MinTradeDistance=LoadMinTradeDistance();
		 sPassCount=sPassCount+1;
	 }
	 if (LoadMinimumTradeEconomy()!==null){
		 MinTradeEconomy=LoadMinimumTradeEconomy();
		 sPassCount=sPassCount+1;
	 }
	 if (LoadShowMyOwnBases()=="TRUE" || LoadShowMyOwnBases()=="FALSE"){
	   HideMyPlanets=LoadShowMyOwnBases();
		 sPassCount=sPassCount+1;
	 }
	 if (LoadHideUniquePartners()=="TRUE" || LoadHideUniquePartners()=="FALSE"){
	   HideUniquePartners=LoadHideUniquePartners();
		 sPassCount=sPassCount+1;
	 }
	 if (LoadEnhanceTradeScreen()=="TRUE" || LoadEnhanceTradeScreen()=="FALSE"){
	   EnhanceTradeScreen=LoadEnhanceTradeScreen();
		 sPassCount=sPassCount+1;
	 }
	 //*********************
	 if (sPassCount!==6){
	   NotifyMessage("You must save settings before you can continue, click on AETradeHelper to the right of the Home Link.<BR><BR>");
		 return "FAILED"; 
	 }else{
	   return "PASSED";
	 }
	 //*********************	 
}
function SaveSettings(){
 var sSetMaxTrades=document.getElementById("TRH_Setting_MaxTrades").value;
 var sSetMinTradeDistance=document.getElementById("TRH_Setting_MinTradeDistance").value;
 var sSetMinTradeEconomy=document.getElementById("TRH_Setting_MinTradeEconomy").value;
 var sShowMyOwnBases=document.getElementById("TRH_Setting_ShowMyBases").value;
 var sHideUniquePartners=document.getElementById("TRH_Setting_HideUniqueTRParters").value;
 var sEnhanceTradeScreen=document.getElementById("TRH_Setting_EnhanceTRScreen").value;
 
 if (IsNumeric(sSetMaxTrades)=="FALSE" || sSetMaxTrades>50 || sSetMaxTrades.length==0){
 	 alert("View Max Trades: You must select a numeric value between 0 and 50");	
	 return 0;
 }

 if (IsNumeric(sSetMinTradeDistance)=="FALSE" || sSetMinTradeDistance>6000 || sSetMinTradeDistance.length==0){
 	 alert("Min. Trade Distance: You must select a numeric value between 0 and 6000");	
	 return 0;
 }

 if (IsNumeric(sSetMinTradeEconomy)=="FALSE" || sSetMinTradeEconomy>200 || sSetMinTradeEconomy.length==0){
 	 alert("Min. Trade Economy: You must select a numeric value between 0 and 200");	
	 return 0;
 }
 
 
 SaveSettingsToDB(sSetMaxTrades,sSetMinTradeDistance,sSetMinTradeEconomy,sShowMyOwnBases,sHideUniquePartners,sEnhanceTradeScreen);
 SaveMaxTrades(sSetMaxTrades);
 SaveMinTradeDistance(sSetMinTradeDistance);
 SaveMinimumTradeEconomy(sSetMinTradeEconomy);
 SaveShowMyOwnBases(sShowMyOwnBases);
 SaveHideUniquePartners(sHideUniquePartners);
 SaveEnhanceTradeScreen(sEnhanceTradeScreen);
 SaveTradeScriptSettings("TRUE");
 reloadPage();
}
function SaveSettingsToDB(sSetMaxTrades,sSetMinTradeDistance,sSetMinTradeEconomy,sShowMyOwnBases,sHideUniquePartners,sEnhanceTradeScreen){
					 
	data="?SaveAccountSettings=TRUE&AccountID="+AccountID+"&Version="+Version+"&MaxTrades="+sSetMaxTrades+"&MinDistance="+sSetMinTradeDistance+"&MinEconomy="+sSetMinTradeEconomy+"&HideMyOwnBases="+sShowMyOwnBases+"&HideUniquePlayers="+sHideUniquePartners+"&EnhanceTRScreen="+sEnhanceTradeScreen;
	url=ServerURL+"AETradeHelper_PostSettings.php";

	GM_xmlhttpRequest({
    method: "POST",
    url: url+data,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:data,
       onload:function(response) {
  				 ReturnFeedBackHTML=trim(response.responseText);
					 
					 if (ReturnFeedBackHTML=="POST_U_OK"){
					   alert("Saved Successfully...");
					 }	
					 if (ReturnFeedBackHTML=="POST_FAILED"){
					   alert("Null values have been found while trying to write to the database.");
					 }	
					 if (ReturnFeedBackHTML=="ERROR"){
					   alert("Error has occuried while trying to write to database.");
					 }
       }
  });	
}
//***************************************************************
//*****************LOAD/SAVE YOUR BASE LOCATIONS
//***************************************************************
function SaveTotalPlayersTrading(sTotal){
    Universe=GetUniverse();
		GM_setValue(Universe+"_"+AccountID+"_TotalPlayersTrading",sTotal);
}
function SaveMaxTrades(sMaxTrades){
    Universe=GetUniverse();
		GM_setValue(Universe+"_"+AccountID+"_MaxTradesToShow",sMaxTrades);
}
function SaveMinTradeDistance(sMinDistance){
    Universe=GetUniverse();
		GM_setValue(Universe+"_"+AccountID+"_MinTradeDistance",sMinDistance);
}
function SaveShowMyOwnBases(sShow){
    Universe=GetUniverse();
		GM_setValue(Universe+"_"+AccountID+"_ShowMyOwnBases",sShow);
}
function SaveMinimumTradeEconomy(sShow){
    Universe=GetUniverse();
		GM_setValue(Universe+"_"+AccountID+"_MinimumTradeEconomy",sShow);
}
function SaveTradeScriptVersion(sShow){
    Universe=GetUniverse();
		GM_setValue(Universe+"_"+AccountID+"_TradeScriptVersion",sShow);
}
function SaveTableWidth(sShow){
    Universe=GetUniverse();
		GM_setValue(Universe+"_"+AccountID+"_TableWidth",sShow);
}
function SaveTradeScriptSettings(sShow){
    Universe=GetUniverse();
		GM_setValue(Universe+"_"+AccountID+"_TradeScriptSettings",sShow);
}
function SaveAccountID(sShow){
    Universe=GetUniverse();
		GM_setValue(Universe+"_AccountID",sShow);
}
function SaveHideUniquePartners(sShow){
    Universe=GetUniverse();
		GM_setValue(Universe+"_"+AccountID+"_HideUniquePartners",sShow);
}
function SaveEnhanceTradeScreen(sShow){
    Universe=GetUniverse();
		GM_setValue(Universe+"_"+AccountID+"_EnhanceTradeScreen",sShow);
}
//=============================================
function GetTotalPlayersTrading(){
		Universe=GetUniverse();
		return GM_getValue(Universe+"_"+AccountID+"_TotalPlayersTrading");
}
function LoadMaxTrades(){
		Universe=GetUniverse();
		return GM_getValue(Universe+"_"+AccountID+"_MaxTradesToShow");
}
function LoadMinTradeDistance(){
		Universe=GetUniverse();
		return GM_getValue(Universe+"_"+AccountID+"_MinTradeDistance");
}
function LoadShowMyOwnBases(){
		Universe=GetUniverse();
		return GM_getValue(Universe+"_"+AccountID+"_ShowMyOwnBases");
}
function LoadMinimumTradeEconomy(){
		Universe=GetUniverse();
		return GM_getValue(Universe+"_"+AccountID+"_MinimumTradeEconomy");
}
function LoadTradeScriptVersion(){
		Universe=GetUniverse();
		return GM_getValue(Universe+"_"+AccountID+"_TradeScriptVersion");
}
function LoadTradeScriptSettings(){
		Universe=GetUniverse();
		return GM_getValue(Universe+"_"+AccountID+"_TradeScriptSettings");
}
function LoadTableWidth(){
		Universe=GetUniverse();
		Value=GM_getValue(Universe+"_"+AccountID+"_TableWidth");
		if (Value==null){Value="600";}
		if (IsNumeric(Value)==false){Value="600";}
		return Value;
}
function LoadAccountID() {
		Universe=GetUniverse();
		return GM_getValue(Universe+"_AccountID");
}
function LoadHideUniquePartners(){
		Universe=GetUniverse();
		return GM_getValue(Universe+"_"+AccountID+"_HideUniquePartners");
}
function LoadEnhanceTradeScreen(){
		Universe=GetUniverse();
		return GM_getValue(Universe+"_"+AccountID+"_EnhanceTradeScreen");
}
//***************************************************************
//*****************FUNCTIONS
//***************************************************************
function trim(s){
   return s.replace(/^\s*(.*?)\s*$/,"$1")
}

function reloadPage() {
	location.href=location.href;
}

function IsNumeric(sText){
 var ValidChars = "0123456789.";
 var IsNumber=true;
 var Char;
 var Input;

 Input = trim(sText);

 for (i = 0; i < Input.length && IsNumber == true; i++) 
    { 
    Char = Input.charAt(i); 
    if (ValidChars.indexOf(Char) == -1) 
       {
		return false;
       }
    }
 return true;
 
 }
 
 function GetUniverse(){
	var server_re = new RegExp("http:\/\/((.)[^\.]+)\\.astroempires\\.com");
  var res = server_re.exec(location.href);

	Universe=res[2].toUpperCase();
  return Universe;
}

function GetAccountID() {
	var AccCells = document.getElementsByTagName('th');

	for (tdx=0;tdx<AccCells.length;tdx++) {
		if (tdx==1) {
			var Variant=AccCells[tdx].innerHTML;
			var NewValue=Variant.split(".");

			if (IsNumeric(NewValue[1])==true) {
				SaveAccountID(NewValue[0]+"."+NewValue[1]);
				return NewValue[0]+"."+NewValue[1];
			}

			var Variant=LoadAccountID();
			var NewValue=Variant.split(".");
			if (IsNumeric(NewValue[1])==true) {
				return NewValue[0]+"."+NewValue[1];
			}
			else {
				return "";
			}
  		}
	}
}

function GetTime(){
	var timeCells = document.getElementsByTagName('small');
	var SvrTime="";
	
  for (tdx=0;tdx<timeCells.length;tdx++) {
    if (tdx==0){
		  return timeCells[tdx].innerHTML;
		}
  }			 
}

function CheckIfNewInstall(){	
	OldVersion=0;
	NewVersion=0;
	
	OldVersion=LoadTradeScriptVersion();
	NewVersion=Version;
	
	if (OldVersion==null || OldVersion==""){
		SaveTradeScriptVersion(NewVersion);
    alert("You have sucessfully installed "+Name+" Version: "+NewVersion+" to your web browser. Please note you MUST go to your Account page to enter the desired settings for your trade routes, make sure to hit the save button at the bottom. You will have to enter the settings for each of your server accounts, as your preferences may be different.");
		return 0;
	}
	if (NewVersion>OldVersion){
	  SaveTradeScriptVersion(NewVersion);
    alert("You have sucessfully upgraded "+Name+" From("+OldVersion+") To("+NewVersion+") to your web browser. Please note you MUST go to your Account page to enter the desired settings for your trade routes, make sure to hit the save button at the bottom. You will have to enter the settings for each of your server accounts, as your preferences may be different.");
	}
}

function GetTableWidths(){
		var arrCells = document.getElementsByTagName('body');
    for (idx=0;idx<arrCells.length;idx++) {
			  strValue = arrCells[idx].innerHTML;
				if (strValue.match("width")){
					 var HTML=arrCells[idx].innerHTML;
					 var FirstPOS=HTML.indexOf("width");

					 Value1=HTML.charCodeAt(FirstPOS+6);
					 Value2=HTML.charCodeAt(FirstPOS+7);
					 Value3=HTML.charCodeAt(FirstPOS+8);
					 Value4=HTML.charCodeAt(FirstPOS+9);
					 Value5=HTML.charCodeAt(FirstPOS+10);
					 Value6=HTML.charCodeAt(FirstPOS+11);					 
					 
					 ReturnedValue=String.fromCharCode(Value1,Value2,Value3,Value4,Value5,Value6);
					 ReturnedValue=ReturnedValue.replace('"',"");
					 ReturnedValue=ReturnedValue.replace('"',"");
					 ReturnedValue=ReturnedValue.replace('<',"");
					 ReturnedValue=ReturnedValue.replace('>',"");					 					 
					 ReturnedValue=trim(ReturnedValue);

					 if (IsNumeric(ReturnedValue)==true){
						 SaveTableWidth(ReturnedValue);
						 break;
					 }
					 if (IsNumeric(LoadTableWidth())==false){	 
					   SaveTableWidth("600"); //Save default if it did not find it correctly
					 }			 
			  }
    }
}

function queryURL(key){ //This returns the QString i.e. ?loc=A01:01:01:01
    var q  = unescape(location.search.substr(1)).split('&');

    for(var i=0; i<q.length; i++){
        var t=q[i].split('=');
        if(t[0].toLowerCase()==key.toLowerCase()) return t[1];
    }
    return '';
}
function queryString(string,key){ //This returns the QString i.e. ?loc=A01:01:01:01
    key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
    var qs = regex.exec(string);
    if(qs == null)
      return "";
    else
      return qs[1];	
}

function NotifyMessage(sMessage){
		GM_addStyle('#GM_AETH_Notify {'
        +'position: relative;'
        +'z-index: 99;'
        +'top: 0px;'
        +'left: 0px;'
        +'width: 60%;'
        +'background-color: Black;'
        +'text-align: center;'
        +'font-size: 11px;'
        +'font-family: Tahoma;'
        +'border: solid 1px;'
        +'margin-bottom: 10px;'
        +'margin-left: auto;'
        +'margin-right: auto;'								
        +'}'
    +'#GM_AETH_Title {'
        +'weight:bold;'
        +'color:orange;'
        +'}');
    var notification = document.createElement("div");
    notification.setAttribute('id', 'GM_AETH_Notify');
    notification.innerHTML = ''
    +'<div id="GM_AETH_Title">'+Name+' Notification</div>'
    + '<br>' + sMessage
    +'';
    document.body.insertBefore(notification, document.body.firstChild);
}

function AdExist(){
	var allTables, theAdTable;
  allTables = document.getElementsByTagName('table');
  for (var i = 0; i < allTables.length; i++) {
		if (allTables[i].innerHTML.search("advertising") != -1) {
      return true;
			//Dont want to remove the AD table
    }
  }
	return false;
}

//***************************************************************
//***************************************************************
//***************************************************************
//***************************************************************
//***************************************************************
//***************************************************************

