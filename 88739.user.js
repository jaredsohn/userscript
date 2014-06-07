// ==UserScript==
// @name           Travian: Auto fake from spieler
// @author         Psea
// @namespace      T3
// @version        0.2.3
// @description    Travian 3.6 auto fake (bayond compatible)
// @include        http://s*.travian.*/spieler.php*
// ==/UserScript==

// Logging - for debugging purposes.----------------------------------------------
var logDebugMesages = true;
var LOG_LEVEL = 0; // 0 - quiet, 1 - nearly quite, 2 - verbose, 3 - detailed

var server = location.hostname;
var myPlayerID;
var placeNames = new Object();


        sCurrentServer = server + "_";
// Host --------------------------------------------------------------------------
myhost = "http://" + window.location.hostname;
var currentActiveVillage = getActiveVillage();
		_log(1,"Start Host= " + myhost );
		_log(1, "timestamp= " + timest() );
		_log(1, "currentActiveVillage= " + currentActiveVillage );

// -------------------------------------------------------------------------------

    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }

    GM_wait();


function letsJQuery() {

	function getRandom(n,m){ return n+Math.floor(Math.random()*(m-n)); }
	

	var select="<select name=\"truppa\" id=\"truppa\"> <option value=\"_1_0_0_0_0_0_0_0_0_0_0\">-1- <option value=\"_0_1_0_0_0_0_0_0_0_0_0\">-2- <option value=\"_0_0_1_0_0_0_0_0_0_0_0\">-3- <option value=\"_0_0_0_1_0_0_0_0_0_0_0\">-4- <option value=\"_0_0_0_0_1_0_0_0_0_0_0\">-5- <option value=\"_0_0_0_0_0_1_0_0_0_0_0\">-6- <option value=\"_0_0_0_0_0_0_1_0_0_0_0\">-7- <option value=\"_0_0_0_0_0_0_0_0_1_0_0\">-9-<option value=\"_0_0_0_0_0_0_0_0_0_1_0\">-10- <option value=\"_3_0_0_0_0_0_0_0_0_0_0\">-1X3- <option value=\"_0_3_0_0_0_0_0_0_0_0_0\">-2X3- <option value=\"_0_0_3_0_0_0_0_0_0_0_0\">-3X3- <option value=\"_0_0_0_3_0_0_0_0_0_0_0\">-4X3- <option value=\"_0_0_0_0_3_0_0_0_0_0_0\">-5X3- <option value=\"_0_0_0_0_0_3_0_0_0_0_0\">-6X3- <option value=\"_0_0_0_0_0_0_3_0_0_0_0\">-7X3- <option value=\"_0_0_0_0_0_0_0_0_3_0_0\">-9X3-<option value=\"_0_0_0_0_0_0_0_0_0_3_0\">-10X3- </select>";

	var icons = '<table class="allvtroops" cellpadding="1" cellspacing="1"><tbody class="units"><tr><th></th><td><img src="img/x.gif" class="unit u1"></td><td><img src="img/x.gif" class="unit u2"></td><td><img src="img/x.gif" class="unit u3" ></td><td><img src="img/x.gif" class="unit u4"></td><td><img src="img/x.gif" class="unit u5" ></td><td><img src="img/x.gif" class="unit u6"></td><td><img src="img/x.gif" class="unit u7" ></td><td><img src="img/x.gif" class="unit u8"></td><td><img src="img/x.gif" class="unit u9"></td><td><img src="img/x.gif" class="unit u10"></td></tr><tr><th></th><td><img src="img/x.gif" class="unit u11" ></td><td><img src="img/x.gif" class="unit u12"></td><td><img src="img/x.gif" class="unit u13" ></td><td><img src="img/x.gif" class="unit u14"></td><td><img src="img/x.gif" class="unit u15"></td><td><img src="img/x.gif" class="unit u16"></td><td><img src="img/x.gif" class="unit u17"></td><td><img src="img/x.gif" class="unit u18" </td><td><img src="img/x.gif" class="unit u19" ></td><td><img src="img/x.gif" class="unit u20" </td></tr><tr><th></th><td><img src="img/x.gif" class="unit u21" </td><td><img src="img/x.gif" class="unit u22" ></td><td><img src="img/x.gif" class="unit u23" ></td><td><img src="img/x.gif" class="unit u24"></td><td><img src="img/x.gif" class="unit u25"></td><td><img src="img/x.gif" class="unit u26"></td><td><img src="img/x.gif" class="unit u27"></td><td><img src="img/x.gif" class="unit u28" ></td><td><img src="img/x.gif" class="unit u29"></td><td><img src="img/x.gif" class="unit u30" ></td></tr><tr><th><i>Num</i></th><td>-1-</td><td>-2-</td><td>-3-</td><td>-4-</td><td>-5-</td><td>-6-</td><td>-7-</td><td>-8-</td><td>-9-</td><td>-10-</td></tr></tbody></table>'



//    Inserisce selezione e Pulsante di fake  ----------------------------------------------------

	$("div#content").append("<br><b><font size=2>Select unit type: </font></b><br>"+icons+"<br> <center> <i>Num.</i> " + select + " <input id=\"fake\" type=\"button\" value=\"start fake\" ></center>");
	
	
	myPlayerID = $("side_navi");
	_log(0,"myPlayerID= "+myPlayerID);
	
	
		$("div#side_info").append("<i>(warning, under construction) </i><br>");
		$("div#side_info").append("<b>Fake Input From LinkBun.ch </b>"+"<input id=\"LiBu\" class=\"text name\" name=\"name\">" + " <input id=\"fakeLiBu\" type=\"button\" value=\"start LiBu fake\">");

//    ON CLICK -fake player----------------------------------------------------------------------------

	$("#fake").click(function(){

		$("div#content").append("<br><div id=result><b>Results:</b>");
		$("div#content").append("<br><div id=toLinkBun><b>To LinkBun.ch:</b>");


		_log(1,"Click function:");
		var truppa=$("#truppa option:selected").val(); 
		_log(1,"truppa = " + truppa + " "); 
		var id=$(".nam a");
		
				
		$.each(id,function(index,value){ 
			

			urlorig= document.URL;
			_log(1,"Url Orig...:" + urlorig);
			var prova=urlorig.toString().split("=");
			var mezzo=$.trim(prova[1]);
			var petto=mezzo.toString().split("&");
			var idiniziale=$.trim(petto[0]);
			_log(1,"idiniziale = " + idiniziale + " "); 
			_log(1,"value = " + value + " "); 
			var prova=value.toString().split("karte.php?d=");
			var mezzo=$.trim(prova[1]);
			var petto=mezzo.toString().split("&");
			var idfinale=$.trim(petto[0]);
			_log(1,"idfinale = >" + idfinale + "< "); 
			
		if (idfinale != "") {
			

			_log(1,"timestamp2 = " +timest());

			var tipoattacco="3";   // attack=3   raid=4     other=reinforce
			
			var aTask = [];
			aTask[0]="2";
			aTask[1]= timest();
			aTask[2]= idfinale;
			aTask[3]= tipoattacco+truppa;
			aTask[4]= currentActiveVillage;

//			var aTask = "2,"+timest()+","+idfinale+","+tipoattacco+truppa+","+currentActiveVillage;
			_log(1,"stringa di attacco aTask("+aTask+") "+aTask[0]+" "+aTask[1]+" "+aTask[2]+" "+aTask[3]+" "+aTask[4]);

// Send FAKE		
			attack(aTask);
			
			
		}
			
		});
	$("div#content").append("<div id=bottomline>");
	$("#bottomline").append("<b>End Send Block</b>");
	});



//    ON CLICK -Fake Input From LinkB un.ch   -----------------------------------------------------

	$("#fakeLiBu").click(function(){

		$("div#side_info").append("<br><div id=ListaLiBu><b>Fake List:</b>");

		_log(0,"Click function fake LiBu:");
		var LiBu=$("#LiBu").val(); 
		_log(0,"LiBu = " + LiBu + " "); 
		
//		$("#side_info").append("----------->" + LiBu + "<----------------");
				
		var myhosta2b = "http://" + window.location.hostname+"/a2b.php?z=";
		_log(1,myhosta2b);
		
		$("div#content").append("<br><div id=result><b>Results:</b>");
		$("div#content").append("<br><div id=toLinkBun><b>To LinkBun.ch:</b>");
		
		_log(1,"Click function:");
		var truppa=$("#truppa option:selected").val(); 
		_log(1,"truppa = " + truppa + " "); 
		
		var zeta=LiBu.toString().split(myhosta2b); 

		for (ind in zeta) { 
		
			if (ind>0)  { 
				_log(0,"--->"+zeta[ind]+" ind="+ind); 
			
				var tipoattacco="3";   // attack=3   raid=4     other=reinforce
				
				var aTask = [];
				aTask[0]="2";
				aTask[1]= timest();
				aTask[2]= zeta[ind];
				aTask[3]= tipoattacco+truppa;
				aTask[4]= currentActiveVillage;
	
				_log(0,"stringa di attacco aTask("+aTask+") "+aTask[0]+" "+aTask[1]+" "+aTask[2]+" "+aTask[3]+" "+aTask[4]);
			
			
				attack(aTask);
			
			}
		
		
		
		}

	$("div#content").append("<div id=bottomline>");
	$("#bottomline").append("<b>End Send Block</b>");


	});





}
// **********************************************************************************
// **********************************************************************************



//*****extract timestamp from milliseconds (number of MS since the epoch)
function timest() 
{
	var millisec=new Date().getTime();    // returns the number of MS since the epoch
	var timestamp=parseInt(millisec / 1000);
	return timestamp;
}

// Custom log function
function _log(level, msg) { if (level <= LOG_LEVEL && navigator.userAgent.indexOf("Opera") == -1) GM_log(msg); }



/* ************************************************************************************************************
       aTask           Begin attack(2,1287350355,306405,2_0_0_1_0_0_0_0_0_0_0_0,162466)

  Attac number function                                   (2)
  Timestamp                                               (1287350355)
  Attack to  (z)                                          (306405)
  Attack string                                           (2_0_0_1_0_0_0_0_0_0_0_0)
           Attack type 3=attack 4=raid other reinforce     ^
           11 number of troups                                         ^
  Newdid (attack from)                                    (162466)
 ************************************************************************************************************ */



function attack(aTask) {
	_log(1,"Begin attack("+aTask+") "+aTask[0]+" "+aTask[1]+" "+aTask[2]+" "+aTask[3]+" "+aTask[4]+" ");
	if(aTask[4] != 'null') {  //multiple villages
		//we need to switch village (while at the same time, setting the target destination)
		_log(1," dati passati url a get::::   a2b.php?newdid=" + aTask[4] + "&z=" + aTask[2])
		get("a2b.php?newdid=" + aTask[4] + "&z=" + aTask[2], attack2, aTask);
	} else {  //only 1 village. Perform attack immediately
		post("a2b.php", "z=" + aTask[2], attack2, aTask);
		_log(2, "The attack was requested.");
	}	
	_log(1, "End attack("+aTask+")");
}

function attack2(httpRequest,aTask) {
	_log(1,"Begin attack2("+aTask+")");
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) {
			var holder = document.createElement('div');
			holder.innerHTML = httpRequest.responseText;
			var aTroops = new Array();  //extract troops numbers and attack type
			aTroops = aTask[3].split("_");
			var tInputs = holder.getElementsByTagName('input');
			var sParams = '';
			for (var q = 0 ; q < tInputs.length ; ++q) {
				if ( tInputs[q].name == "t1" ) {
					for(var i = 1; i < 12; ++q)	sParams += "t" +i+ "=" + aTroops[i++] + "&";
				} else if ( tInputs[q].name == "c" ) {
					sParams += "c=" + aTroops[0] + "&";
				} else sParams += tInputs[q].name + "=" + tInputs[q].value + "&";
			}
			sParams = sParams.substring(0, sParams.length - 1);
			post('a2b.php', sParams, attack3, aTask);
		}
	}
	_log(1,"End attack2("+aTask+")");
}

function attack3(httpRequest,aTask){
	_log(1,"Begin attack3("+aTask+")");
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) { // ok
			var holder = document.createElement('div');
			holder.innerHTML = httpRequest.responseText;
			var aTroops = new Array();  //extract troops numbers and attack type
			aTroops = aTask[3].split("_");
			var sParams = '';
			var q;
			var tSelect = holder.getElementsByTagName('select');
			for (q = 0 ; q < tSelect.length ; ++q) {
				if ( tSelect[q].name == "kata" ) {
					if ( aTroops[12] ) sParams += "kata=" + aTroops[12] + "&";
					else sParams += "kata=" + tSelect[q].value + "&"; //default, dont change anything... random?
				} else if ( tSelect[q].name == "kata2" ) {
					if ( aTroops[13] ) sParams += "kata2=" + aTroops[13] + "&";
					else sParams += "kata2=" + tSelect[q].value + "&";  //default, dont change anything... random?
				}
			}
			var tInputs = holder.getElementsByTagName('input');
			for (q = 0 ; q < tInputs.length ; ++q) {
				if ( tInputs[q].name == "spy" ){
					if ( aTroops[12] ) sParams += "spy=" + aTroops[12] + "&";
					else sParams += "spy=1&";  //"Spy troops  and resources" by default	
					++q;
				} else sParams += tInputs[q].name + "=" + tInputs[q].value + "&";
			}
			if(aTask[4] != 'null') var myOptions = [aTask, currentActiveVillage];
			else var myOptions = [aTask, false];
			sParams = sParams.substring(0, sParams.length - 1);
			post('a2b.php', sParams, handleRequestAttack, myOptions);
		}
	}
	_log(1,"End attack3("+aTask+")");
}

/**************************************************************************
 * @param options: [aTask, iCurrentActiveVillage] (optional)  OR sNewdid in case of finding the code for construction.
 ***************************************************************************/
function get(url, callback, options) {

	_log(1,"Begin get("+url+" "+options+")");

	var httpRequest = new XMLHttpRequest();
	if(callback) {
		
			_log(1,"get callback("+url+" "+options+")");
			var millisec=new Date().getTime(); // returns the number of MS since the epoch
			_log(1,"timestamp = " + millisec + " "); 
			
			
		httpRequest.onreadystatechange = function() { 
				callback(httpRequest, options); 
		};
	}
	httpRequest.open("GET", url, true);	
	httpRequest.send(null);

	_log(1,"End get("+url+" "+options+")");

}

function post(url, data, callback, options) {
	
	_log(1,"Begin post("+url+" "+data+" "+options+")");
	
	var httpRequest = new XMLHttpRequest();
	data = encodeURI(data);
	httpRequest.open("POST", url, true);
	httpRequest.onreadystatechange = function() {
		callback(httpRequest, options)
	};
	httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpRequest.setRequestHeader("Content-length", data.length);
	httpRequest.setRequestHeader("Connection", "close");
	//httpRequest.overrideMimeType('text/html');
	httpRequest.overrideMimeType("application/xhtml+xml");
	httpRequest.send(data);
	//httpRequest.close();
	
	_log(1,"end post("+url+" "+data+" "+options+")");
	
}
//**************************************************************************


function coordZToX(z) {
	z = parseInt(z);
	var x = ((z - 1) % 801) - 400;
	return x;
}

function coordZToY(z) {
	z = parseInt(z);
	var y = 400 - (parseInt(((z - 1) / 801)));
	return y;
}

function getVillageNameZ(iVillageZid, isLong) {
	return getVillageNameXY(coordZToX(iVillageZid),coordZToY(iVillageZid), isLong);
}

function getVillageNameXY(iVillageX, iVillageY, isLong){
	_log(3,"getVillageNameXY> Begin. x = " + iVillageX + ",   y = " + iVillageY);
	iVillageX = parseInt(iVillageX);
	iVillageY = parseInt(iVillageY);
	if ( isNaN(iVillageX) || iVillageX < -400 || iVillageX > 400 || isNaN(iVillageY) ||  iVillageY < -400 || iVillageY > 400 ) {
		_log(3,"getVillageNameXY> Invalid data. End");
		return "town";
	}
	if ( typeof(placeNames[iVillageX+" "+iVillageY]) != "undefined" ) return placeNames[iVillageX+" "+iVillageY];
	var coXs = document.getElementsByClassName("cox");
	var coYs = document.getElementsByClassName("coy");
	var links = document.getElementsByClassName("link");
	var ii,xx,yy;
	if ( coXs.length == coYs.length && coXs.length == links.length ) {
		for ( ii = 0 ; ii < links.length ; ++ii ){
			xx = parseInt(coXs[ii].innerHTML.split("(")[1]);
			yy = parseInt(coYs[ii].innerHTML);
			if ( xx == iVillageX && yy == iVillageY ) {
				var tName = links[ii].firstChild.innerHTML + "" + (isLong?" ("+iVillageX+"|"+iVillageY+")":"");
				_log(3, "getVillageNameXY> Found! returning: " + tName);
				placeNames[iVillageX+" "+iVillageY] = tName;
				return tName;
			}
		}
	}
	
	_log(3,"getVillageNameXY> Didnt Find name, making one up from XY.");
	placeNames[iVillageX+" "+iVillageY] = "(" + iVillageX + "|" + iVillageY + ")";
	return placeNames[iVillageX+" "+iVillageY];
}

function getVillageName(iVillageDid, isLong) {
	_log(3,"Begin getVillageName(). iVillageDid = " + iVillageDid);
	var theTown = "";
	iVillageDid = parseInt(iVillageDid);
	if ( typeof(placeNames[iVillageDid]) != "undefined" ) return placeNames[iVillageDid];
	if( !isNaN(iVillageDid) && iVillageDid > 0 ) theTown = "(" + iVillageDid + ")";
	else theTown = "Your town";
	var tDiv = $("vlist");
	if ( tDiv == null || isNaN(iVillageDid) || iVillageDid  < 1) { //if no vlist then its a single village account, Try to grab the village name from h1 if on the dorf screen.
		if ( location.pathname.indexOf("dorf") != -1 ) {
			tDiv = document.getElementsByTagName("h1")[0].innerHTML.split("<")[0];
			setOption("SINGLEVILLAGENAME",tDiv);
			placeNames[iVillageDid] = tDiv;
			return tDiv;
		} else return getOption("SINGLEVILLAGENAME", theTown, "string");
	} else {
		var xpathResult = xpath("//table[contains(@id,'vlist')]//a[contains(@href, 'newdid="+iVillageDid+"')]");
		if(xpathResult.snapshotLength > 0) {
			if (isLong) {
				var tA = xpathResult.snapshotItem(0);
				var tRow = tA.parentNode.parentNode;
				while ( tRow.tagName.toLowerCase().indexOf("tr") == -1 ) tRow = tRow.parentNode;
				var tX = tRow.getElementsByClassName("cox")[0].innerHTML;
				var tY = tRow.getElementsByClassName("coy")[0].innerHTML;
				theTown = tA.innerHTML + " " + tX + "|" + tY;
				placeNames[iVillageDid] = theTown;
			} else {
				placeNames[iVillageDid] = xpathResult.snapshotItem(0).innerHTML;
				return placeNames[iVillageDid];
			}
		}
		_log(3,"getVillageName> There is a vlist. But I didnt find the name.");
	}
	_log(3, "End getVillageName() theTown = " + theTown);
	return theTown;
}



function getActiveVillage() {
	_log(3,"Begin getActiveVillage()");
	var oActiveLink = xpath("id('vlist')/table/tbody/tr[@class='sel']//a | //table[@id='vlist']/tbody/tr[td/@class='dot hl']//a");
	if(oActiveLink.snapshotLength > 0) {
		_log(2, "Active village link found.");
		var sHref = oActiveLink.snapshotItem(0).href;
		var aMatch = sHref.match(/newdid=([0-9]*)/i);
		if(!aMatch) {
			_log(2, "Active village id could not be found.");
			return -1;
		} else {
			_log(3, "Active village id was found: " +aMatch[1]);				
			return aMatch[1];
		}
	} else {
		_log(2, "Active village could not be found.");
		return -1;
	}
	_log(3, "End getActiveVillage()");
}

function xpath(query, object) { // Searches object (or document) for string/regex, returing a list of nodes that satisfy the string/regex
	//if(!object) var object = document;
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function handleRequestAttack(httpRequest, options) {
	_log(1,"Begin handleRequestAttack("+httpRequest+", "+options+")");
	var aTask = options[0];
	var activateVillageDid = parseInt(options[1]);
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) { // ok				
			var sResponse = httpRequest.responseText;
			_log(3, sResponse);
			if(!sResponse) {  // error retrieving the response				
				_log(0, "We didn't get any response. Impossible to determine whether the attack was sent.");
				return;
			}			
			var re = new RegExp('karte\\.php\\?d=' + aTask[2], 'i');
			
			
			
			if(re.test(sResponse)) {
				_log(0, "It seems your attack was successfully sent.");
					$("#result").append("<br>1 Fake sent to "+getVillageNameZ(aTask[2],true)+"!");  // ok
					$("#toLinkBun").append("<br>http://" + window.location.hostname + "/a2b.php?z=" + aTask[2]);
					
			} else {
				_log(0, "Your attack could not be sent.");
					$("#result").append("<br>Fake ERROR at "+getVillageNameZ(aTask[2],true)+"!");  // ko
					$("#toLinkBun").append("<br>http://" + window.location.hostname + "/a2b.php?z=" + aTask[2]);
					
			}			
		} else _log(2, "HTTP request status: " + httpRequest.status); // failed
		if(!isNaN(activateVillageDid)) switchActiveVillage(activateVillageDid);
		return;
	}
	_log(1, "End handleRequestAttack("+httpRequest+", "+options+")");
}



function switchActiveVillage(did) {
	_log(2, "Switching your village back to " +did);
	if(!isInt(did)) {return;}
	get("dorf1.php?newdid="+did, null, null);
}


function isInt(x) { // Integer verification Function
   var y = parseInt(x);
   if (isNaN(y)) {return false;}
   return x==y && x.toString()==y.toString();
}


