// ==UserScript==
// @author      Richard Laffers
// @email	rlaffers@gmail.com
// @namespace	http://userscripts.org/
// @name		Travian Croptool Updater
// @description	Update your crop tool (wheat manager) with a one click from the market.
// @include     http://s*.travian.*/*
// @include     http://s*.travian3.*/*
// @include     http://welt*.travian.*/*
// @exclude     http://forum.travian.*
// @exclude     http://www.travian.*
// @version     0.3
// ==/UserScript==



var LOG_LEVEL = 0; // 0 - errors, 1 - warnings & errors, 2 - info, warnings & errors, 3 - all
var sLang = "en";
var sGetParameters = "";
var sCurrentServer = "";    // Set this to the server's url to override automatic server detection
                            // (i.e. s1.travian.net)
                            // Dont set it if you're playing on multiple servers simultaneously!

var sAuthKey;

var init = detectLanguage() && initialize();


if(init) {
	// Images
	var sCloseBtn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAIAAAAmdTLBAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gYKECMhBqiEGQAAADJ0RVh0Q29tbWVudABFcnN0ZWxsdCB2b24gRmxvcmlhbiBTY2hyZWllciBtaXQgVGhlIEdJTVCOHcWrAAADLUlEQVR42pWUPYhdRRiG32/OuTdZXTcas0n2ZiVVYBttLFLFQuNPZTQgiIIphGBAtNTC0lZBRRQVEYWoBAyk8ActRFCRLa3SpNH9icm699695+6Z+X5ei7Obtc1UH+/MM+/M9w4jJD0wnNi9czVuZ3iwSlKbQ5ohP3rzn+FGTBvmlqbUgpRgBQDdAbC0AOAepbV2ezI3v/Txd+nuQ0Jy4+3XqsMDqeqYjHxryJJRCiPgRneAMKU7rbBktlNrtoaj0WrvrpMXlxMAH29Kf5/0+6hqqXtS16h7SImpkqqSVCHVkipIQqq6NanuTdZXDs7VNQA2WzEZS12znTJvM2eWQi1UpSnDqQUgtcCVpnRHSqmqACQA1BKToY83oxnPPvz0/BvvR9OwaaKZeDOO8TC2NmP077FPfjzw/CvM23STlKTu3eKV04bbE+a8/8FTAI6+dTG00Aq00DK1LF78HcDs6bNwAwPcSaHjc5TCXKh6/fVz3cTggytwQzjc7vt6uRP/OrOEcGEAAXKHB8DcRm5pCvf1V5/pxGOf/kT64pd/7MBPnoArXEEXUrDLRztFyVCFOSMoXH35TMcsfvFrV6ycXUqJIiFwoUmYROz6mzK30LJ7Nwq5+tITt57a6rP3S6IIk0TqeBrC9/oXVhjOcGGIAAmDD7+/xQ+++jMl7PmHwlXC9vrHkqkFYWSQXHjvSkeun3+oK458tizdFjAJEytpz98KNdMK3Ri+8M43O/CFRwBef/EkALlj7sila4IQBlzFC013+bLjT9WFdy938NqFx0CCBHjj3AOdePjyqoSmDv7f+Qtzy9JS8/SXbwGsnT8NN3b5hzP8xnMnALQ/fI5wmkELzQAIyWun5qsD98jMbNq3X6oaAjAEAYRQJYpYFi+wgtKyFMtlPPWrW3zqatQAVEu020kqiZCqliQIh6CLOoXCi1iBFahRzdTVQh0A6pujaA4OuHkDyqqfUdWAgCFCYQi9gsNVwukqZjQ35UghC8cByDSTG3///MKjo7WVfq+mSEhCRJVEAKFXdAlPDPdAeMUozjh6/PFLv/UPDYRkVuzr3dbfh5sjv3OmmunjP4EhhHJu9NM9AAAAAElFTkSuQmCC";

	//Styles
	var cssStyle = "";
	cssStyle += ".ctu_draghandle {font-size: 120%; font-weight:bold;}";
	cssStyle += ".ctu_close_btn {float:right; padding:2px 4px; color:white; margin:-5px -15px 0 0;}";
	cssStyle +=	"#ctu_message {position:absolute; z-index:100; border:1px solid black; padding:10px 20px; color:black; width:335px}";
	cssStyle += ".handle {cursor: move;}";


	GM_addStyle(cssStyle);
	window.addEventListener('load', onLoad, false);
} else {
        _log("Initialization failed", 0);
    alert("Crop tool updater initialization failed.");
}

switch(sLang) {
	case "sk":
		aLangStrings = ["Prebehol pokus o aktualizáciu Crop Tool-u. Výsledok neznámy.", "Aktualizácia Crop Tool-u úspešná", "Aktualizácia Crop Tool-u zlyhala!", "Nastaviť Crop Tool Updater", "Aktualizovať Crop Tool", "Crop tool Updater:", "Skopíruj sem autentifikačný kľúč zo svojho profilu v Crop Tool-e"];
		break;
	case "en":
	case "com":
	case "uk":
	default:
        aLangStrings = ["Update attempted with unknown result.", "Your crop tool was successfully updated.", "Update failed!", "Crop Tool Updater setup", "Update Crop Tool", "Crop tool Updater:", "Enter the authentication key from your Crop tool profile"];
		break;
}

// Do not change the array below!
var aLangStringsMaster = ["Update attempted with unknown result.", "update_successful", "update_failed", "Crop Tool Updater setup", "Update Crop Tool", "Crop tool Updater:", "Enter the authentication key from your Crop tool profile"];

/**
* Custom log function .
* @param:{int} msg Message to log.
* @param {int} level
*/
function _log(msg, level) {
    if(level == undefined) {
        var level = 3;
    }
	if (level <= LOG_LEVEL && navigator.userAgent.indexOf("Opera") == -1) {
        if(typeof(console) == 'undefined' && console == null) {
            // Since Firebug 1.0, extensions.firebug.showChromeMessages must be set 
            // to true for GM_log messages to show up in the Firebug console.
            GM_log(msg);
            return true;
        }
        switch(level) {
            case 0:
                console.error(msg);
                break;
            case 1:
                console.warn(msg);
                break;
            case 2:
                console.info(msg);
                break;
            case 3:
            default:
                console.log(msg);
                break;
        }

		//GM_log(msg);
    } else {
    }
}

/**
 * Performs some initial checkings on conditions that have to be met to run the script
 *
 * @return true if initialization was successful, false otherwise
 */
function initialize() {

    if (typeof GM_getValue == "undefined") {
        alert('This script requires Greasemonkey v0.3 or newer, please upgrade to latest version!');
        _log("The current version of Greasemonkey is too old", 0);
        return false;
    }

    if (sCurrentServer != "") {
        return true;
    }

    // check what Travian server we're using
    var re = new RegExp("^https?://(.+\.travian3?\.[a-zA-Z.]+)(\/.*)?$", "i");
	var server = re.exec(window.location.href);
    if ((server) && (server[1])) {
        sCurrentServer = server[1];
        _log("using settings for server '" + server[1] + "'", 3);
        return true;
    }
    else {
         _log("ERROR, unknown Travian server!", 0);
        return false;
    }
}

/**
 * Detects the language used based on the server's url
 *
 * @return true if the language is successfully detected, false otherwise
 */
function detectLanguage() {
	//if(sLang != "") {return true;}
	var re = null; re = new RegExp("([a-zA-Z]{2,3})(\/.*)?$", "i");
	var lang = re.exec(window.location.href);

    if(!lang) {
            _log("failed to detect language automatically!", 0);
		if(sLang == "") sLang = "en";
        return true;
	} else {
        sLang = lang[1];
            _log("detected language '" + sLang + "'", 3);
        return true;
    }
}


function GM_post(url, data, callback) {
	GM_xmlhttpRequest({
		method: 'POST',
		url: url,
        data: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
		onload: callback,
	});
}


function handleUpdateCrop(response)
{
    _log('-> handleUpdateCrop()', 3);



	if (response.readyState == 4) {
		if (response.status == 200) { // ok
            var sResponse = response.responseText;
            _log(sResponse, 3);

			if(!sResponse) {  // error retrieving the response
				printMsg( t("Update attempted with unknown result."), true );
				return;
			}


			var re = new RegExp('<title>(.*)<\/title>\n<log>(.*)<\/log>', 'i');
			var aMatchResults = sResponse.match(re);

            if( aMatchResults != null && aMatchResults[1] == "Success") {
                var message = t('update_successful');
                //if(LOG_LEVEL > 2) message += '<br/>' + aMatchResults[2];
                message += '<br/>' + aMatchResults[2];
                printMsg(message);
			} else if( aMatchResults != null ) {
                var message = t('update_failed');
                //if(LOG_LEVEL > 2) message += '<br/>' + aMatchResults[2];
                message += '<br/>' + aMatchResults[2];
                printMsg(message, 1);
			} else {
                var message = t('update_failed');
                message += '<br/>Your Crop Tool authentication key is probably invalid.';
                printMsg(message, 1);
            }


        } else {
				_log("HTTP request status: " + response.status, 3);
        }
    }

    _log('<- handleUpdateCrop()', 3);
}



function addMsg(sMsg, obj) {
	obj.innerHTML += "<br/>" + sMsg ;
}

function printMsg(sMsg,bError) {
		_log("-> printMsg()", 3);
	var oDate = new Date();
	var sWhen = oDate.toLocaleString() + "\n";
	_log(sWhen + sMsg, 3);
	//alert(sMsg);

	// delete old message
	var oOldMessage = $("ctu_message");
	if(oOldMessage) {
			_log("Removing the old message." +oOldMessage, 3);
		oOldMessage.parentNode.removeChild(oOldMessage);
	}

	// here we generate a link which closes the message
	var sLinkClose = "<a href='#' onclick='document.getElementById(\"ctu_message\").parentNode.removeChild(document.getElementById(\"ctu_message\"));' class='ctu_close_btn'><img src='" +sCloseBtn+ "' alt='X' /></a>";

	var sBgColor = (bError) ? "#FFB89F" : "#90FF8F";
	var oMsgBox = document.createElement("div");
	//oMsgBox.innerHTML = sLinkClose + "<div id='ttq_draghandle_msg' class='handle ttq_draghandle' style='background-color:white; -moz-opacity:0.2; border:1px dashed white;' >&nbsp;</div>" + sMsg;
	oMsgBox.innerHTML = "<div id='ctu_draghandle_msg' class='handle'>" + sLinkClose + sMsg + "</div>";
	oMsgBox.style.backgroundColor = sBgColor;
	var msgCoords = getOption("MSG_POSITION", "215px_215px");
	msgCoords = msgCoords.split("_");
	oMsgBox.style.top = msgCoords[0];
	oMsgBox.style.left = msgCoords[1];
	oMsgBox.id = "ctu_message";
	document.body.appendChild(oMsgBox);
	makeDraggable($('ctu_draghandle_msg'));
		_log("<- printMsg()", 3);
}

/**
 * Retrieves the value corresponding do the given variable name and the current Travian server
 *
 * @param name          The name of the variable
 * @param defaultValue  default value if name is not found
 */
function getVariable(name, defaultValue) 
{
		_log("-> getVariable()", 3);

    if(!defaultValue) { var defaultValue = ''; }

    name = sCurrentServer + '_' + name;
    var data = GM_getValue(name, defaultValue);

        _log( "<- getVariable()", 3);
    return data;
}

/**
 * Sets the value for the given variable name and the current Travian server
 * Use greasemonkey's built-in system instead of cookies to permantenly store and read settings
 *
 * @param name  The name of the variable
 * @param value The value to be assigned
 */
function setVariable(name, value) 
{
		_log( "-> setVariable()", 3);

    name = sCurrentServer + '_' + name;
    GM_setValue(name, value);

        _log( "<- setVariable()", 3);
    return true;
}

/**
* @param key: name of the parameter in the TTQ_OPTIONS variable
* @param defaultValue: this is returned if the parameter is not found
* @param type: if set, type conversion occurs. Values {string, integer, boolean} The conversion occurs only if it is not the defaultValue being returned.
*/
function getOption(key, defaultValue, type) 
{
        _log( "-> getOption()", 3);

    var options = getVariable('CTU_OPTIONS', '');
	options = options.split(",");
	var myOption = options.indexOf(key);
	if(myOption < 0) {return defaultValue;}
	switch(type) {
		case "boolean":
			var myOption = ( options[myOption + 1] == "true") ? true:false;
			break;
		case "integer":
			var myOption = parseInt(options[myOption + 1]);
			break;
		case "string":
		default:
			var myOption = options[myOption + 1];
			break;
	}
        _log( "<- getOption()", 3);
    return myOption;
}

function setOption(key, value) 
{
        _log( "-> setOption()", 3);

    var options = getVariable('CTU_OPTIONS', '');
	if(options != '') options = options.split(",");
	else options = [];
    var myOption = options.indexOf(key);
	if(myOption < 0) {
		options.push(key);
		options.push(value);
	} else {
		options[myOption + 1] = value;
	}

    setVariable('CTU_OPTIONS', options.join(","));
        _log( "<- setOption()", 3);
}

/************************ Drag n drop*******************************/
var mouseOffset = null;
var iMouseDown  = false;
var lMouseState = false;
var dragObject  = null;
var curTarget   = null;

function mouseCoords(ev){
	return {x:ev.pageX, y:ev.pageY};
}

function makeClickable(object){
	object.onmousedown = function(){
		dragObject = this;
	}
}

function getMouseOffset(target, ev){
	var docPos    = getPosition(target);
	var mousePos  = mouseCoords(ev);
	return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
}

function getPosition(e){
	var left = 0;
	var top  = 0;
	while (e.offsetParent){
		left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
		top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
		e     = e.offsetParent;
	}
	left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
	top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
	return {x:left, y:top};
}

function mouseMove(ev){
	var target   = ev.target;
	var mousePos = mouseCoords(ev);

	if(dragObject){
		dragObject.style.position = 'absolute';
		dragObject.style.top      = (mousePos.y - mouseOffset.y) +"px";
		dragObject.style.left     = (mousePos.x - mouseOffset.x) +"px";
	}
	lMouseState = iMouseDown;
	return false;
}

function mouseUp(ev){
	if(dragObject) {
		switch(dragObject.id) {
			case "ttq_message":
				var key = "MSG_POSITION";
				break;
			case "timerform_wrapper":
				var key = "FORM_POSITION";
				break;
			case "ttq_history":
				var key = "HISTORY_POSITION";
				break;
			case "ttq_tasklist":
			default:
				var key = "LIST_POSITION";
				break;
		}
		setOption(key, dragObject.style.top +"_"+ dragObject.style.left);
	}
	dragObject = null;
	iMouseDown = false;
}

function mouseDown(ev){
var mousePos = mouseCoords(ev);
	var target = ev.target;
	iMouseDown = true;
	if(target.getAttribute('DragObj')){
		return false;
	}
}

function makeDraggable(item){
	if(!item) return;
	item.addEventListener("mousedown",function(ev){
		dragObject  = this.parentNode;
		mouseOffset = getMouseOffset(this.parentNode, ev);
		return false;
	}, false);
}

document.addEventListener("mousemove", mouseMove, false);
document.addEventListener("mousedown", mouseDown, false);
document.addEventListener("mouseup", mouseUp, false);

/************************************************************************************/

function xpath(query, object) {
	if(!object) var object = document;
	return document.evaluate(query, object, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function t(str) {
	var index = aLangStringsMaster.indexOf(str);
	var sTranslatedStr =  aLangStrings[index];
	if(sTranslatedStr) {
		return sTranslatedStr;
	} else {
		return str;
	}
}

function $(id) {
  return document.getElementById(id);
}

function createLink() {
		_log( "-->createLink", 3);
		_log( "sAuthKey = "+sAuthKey, 3);

	var xpathRes = xpath("//div[@class='gid17']//div[@id='textmenu']/a[last()]");


	if(xpathRes.snapshotLength <= 0) {
			_log( "This is not Market.", 2)
		return false;
	} 


	if(!sAuthKey) {
		var oLink = document.createElement("a");
		oLink.id = "setupCT";
		oLink.innerHTML = t("Crop Tool Updater setup");
		oLink.title = t("Crop Tool Updater setup");
		oLink.href = "#";
		oLink.addEventListener('click',	promptKey, false);
	} else {
		var oLink = document.createElement("a");
		oLink.id = "updateCT";
		oLink.innerHTML = t("Update Crop Tool");
		oLink.title = t("Update Crop Tool");
		oLink.href = "#";
		oLink.addEventListener('click',	startUpdate, false);
	}

	var oPar = xpathRes.snapshotItem(0).parentNode;
	oPar.innerHTML += " | ";
	oPar.appendChild(oLink);

		_log( "<--createLink", 3);
}

/**
 * This function supersedes createLink(), to thwart detection attempts.
 */
function createMenuCommand()
{
    // detect if we are on the market page
    var xpathRes = xpath("//div[@class='gid17']//div[@id='textmenu']/a[last()]");


	if(xpathRes.snapshotLength <= 0) {
			_log( "This is not Market.", 2)
		return false;
	} 

	if(!sAuthKey) {
        _log('Crop Tool Updater has not been configured yet.', 1);
        return false;
    } else {
	    GM_registerMenuCommand(t("Update Crop Tool now!"), startUpdate);
    }
    return true;

}




function startUpdate() {
		_log( "-->startUpdate", 3);


	//send data
    // this village's z-coordinate:
	var key = getOption("KEY_" + getCurrentZ(), false);

	if(key == false) {
			_log( "No crop tool key URL is set for this village!", 1);
		promptKey();
		return false;
	}  else {
			_log( "Sending crop...", 2);
            // get page content
            var data = parse();


			GM_post(key, data, handleUpdateCrop);

	}

		_log( "<--startUpdate", 3);
}


/**
 * XY of the active village
 *
 * @return array
 */
function getCurrentXY()
{
    _log( '->getCurrentXY()', 3);
    var coords = [];
    var oDivs = xpath("//div[@id='side_info']//td[@class='dot hl']/../td[@class='aligned_coords']/div[@class!='pi']");
    if(oDivs.snapshotLength <= 0) {
        return false;
    }
    var x = oDivs.snapshotItem(0).innerHTML;
    var matches = x.match(/([-0-9]{1,4})/gi);
    if( matches === null ) {
        return false;
    }
   
    coords[0] = matches;

    var y = oDivs.snapshotItem(1).innerHTML;
    matches = y.match(/([-0-9]{1,4})/gi);
    if( matches === null ) {
        return false;
    }
    coords[1] = matches;

    //_log( 'coords=' + coords[0] + '|' + coords[1], 2 );
    _log( '<-getCurrentXY()', 3);

    return coords;
}

function getCurrentZ()
{
    var coords = getCurrentXY();
    if(coords == false) {
        return 'default'; // this will be added to KEY_ option
    }
    var z = coordsXYToZ( coords[0], coords[1] );
    return z;
}


function coordsXYToZ(x, y)
{
	x = parseInt(x);
	y = parseInt(y);
	var coordZ = (x + 401) + ((400 - y) * 801);
	return coordZ;
}

/**
 * Get full market page content. Parse into POST string.
 * I.e.: a=1&b=second&ddd=third
 *
 * @return string
 */
function parse()
{
    var data = '';

    //var oPage = xpath('//body');
    var oXpath = xpath('//table[@class="traders"]/..');
    if(oXpath.snapshotLength < 1) {
        // no merchants
        data = 'traders=0';
    } else {
        data = 'traders=' + encodeURIComponent( oXpath.snapshotItem(0).innerHTML );
    }

    oXpath = xpath('id("tp1")');
    data += '&time=' + encodeURIComponent( oXpath.snapshotItem(0).innerHTML );

    oXpath = xpath('id("resWrap")');
    data += '&resources=' + encodeURIComponent( oXpath.snapshotItem(0).innerHTML );

    data += '&server=' + encodeURIComponent(sCurrentServer);
    data += '&z=' + getCurrentZ();
    _log( data, 3);

    return data;
}


function promptKey() {
		_log( "-->promptKey", 3);
	var newKey = false;
	var newKey = prompt(t("Crop tool Updater:") + "\n" + t("Enter the authentication key from your Crop tool profile") + "\n", sAuthKey);
	var re = /^http[s]?:\/\/[./?=&a-zA-Z0-9]*$/i;
	if(re.test(newKey)) {
			_log( "Address is valid", 3);
		setOption("KEY_" + getCurrentZ(), newKey);
		location.reload();
	} else {
			_log( "Invalid URL!", 1);
	}
		_log( "<--promptKey", 3);
}

function onLoad() {
	sAuthKey = getOption("KEY_" + getCurrentZ(), false);

    // get stored correct coordinates on this server
	GM_registerMenuCommand(t("Crop Tool Updater setup"), promptKey);
	var re = /.*build\.php.*/i;
	if (re.test(window.location.href)) {
		//createLink();
		createMenuCommand();
	}
}

