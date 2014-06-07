// ==UserScript==
// @name          Farmtown Gift Link Revealer
// @namespace     gift-link-generator
// @description   Reveals a link somewhere in farmtown that is very handy if you know about it :)
// @version       1.0.4
// @include       http://apps.facebook.com/farmtown/send/?target_uid=*&type=*
// @include				http://apps.facebook.com/farmtown/select_friends/
// @require       http://userscripts.org/scripts/source/57756.user.js
// @history				1.0.4 Changed the fix for from_name to use escape() should work properly now
// @history				1.0.3 Changed Init(), now using DOMNodeInserted as soon as the game form exists script fires
// @history				1.0.2 Added http://apps.facebook.com/farmtown/select_friends/ to the includes
// @history       1.0.1 Added the reload button & fixed issue with spaces in the visible "name" parsing, cleaned up and modularised code a bit!
// @history       1.0.0 Initial release
// ==/UserScript==
var bEnabled = GM_getValue('enabled',false);
var gift_links = GM_getValue('gift_links', null);
var gift_type = null;
var from_uid = null; 
var from_name = null; 
var time = null;
var gift_sig = null;
var gift_link = null;
var game_type = null;

// Helpers
//--
function Updater()
{
	//var SUC_script_num = 57047; // Change this to the number given to the script by userscripts.org (check the address bar)
	//try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + (86400000*7) <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}	
	var script_id = 79214;
	try {
		ScriptUpdater.check(script_id);
	} catch(e) { };
	return;
}

// get a Snapshot based on an XPath
function getSnapshot(_strPattern,_doc) {
    // default is document if _doc is not provided
    return document.evaluate(_strPattern, (_doc===undefined?document:_doc), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

// Popup a msg
function MsgBox(msg)
{
	return window.alert(msg);
}

// Create by avg, modified by JoeSimmons
function create(a,b) {
	if(!a || a=="" || !b) return;
	var ret=document.createElement(a);
	for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(prop=="kids" && (prop=b[prop])) for each(var p in prop) ret.appendChild(p);
		//else if(/^(style|accesskey|class|id|name|src|href|readonly|value|cols||rows)$/.test(prop)) ret.setAttribute(prop, b[prop]);
		else if(/^(style|accesskey|class|id|name|src|href|value|rows|cols|wrap)$/.test(prop)) ret.setAttribute(prop, b[prop]);
		else ret[prop]=b[prop];
	return ret;
}

// Returns true if data is in some way "empty"
function HasData(data)
{
	var bReturn = false;
	if(data != null && data != "" && typeof(data) != "undefined") {
		bReturn = true;
	}
	return bReturn;
}

// Returns the value of param if it exists in query
function GetQueryParam(query,param)
{
	var bReturn = null;
	var regexS = "[\\?&]"+param+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec(query);
	if(results != null){
		bReturn = results[1];
	}
	return bReturn;
}

function EncodeHtml(str)
{
  str = str.replace(/&/g, "&amp;");
  str = str.replace(/>/g, "&gt;");
  str = str.replace(/</g, "&lt;");
  str = str.replace(/"/g, "&quot;");
  str = str.replace(/'/g, "&#039;");
  return str;
}


function DecodeHtml(str)
{
  str = str.replace(/\&amp;/g,"&");
  str = str.replace(/\&gt;/g, ">");
  str = str.replace(/\&lt;/g, "<");
  str = str.replace(/\&quot;/g, '"');
  str = str.replace(/\&#039;/g, "'");
	return str;
}

/*
function php_urlencode (str) {
	str = escape(str);	
	return str.replace(/[*+\/@]|%20/g,function(s){switch(s){case "*": s = "%2A"; break;case "+": s = "%2B"; break;case "/": s = "%2F"; break;case "@": s = "%40"; break;case "%20": s = "+"; break;}return s;});
}
*/

function GetGameType(g){
	//MsgBox('GetGameType()');	
	bReturn = null;
	if(g.indexOf('http://apps.facebook.com/farmtown/play/?rcid=gift') != -1){
		game_type = "FarmTown";
		bReturn = "farmtown";
	}
	return bReturn;
}

function ParseAction(a){
	//MsgBox('ParseAction()');
	var bReturn = false;
	if(GetGameType(a) == "farmtown"){
		//MsgBox('Found farmtown!');
		gift_type = GetQueryParam(a,'type');
		from_uid = GetQueryParam(a,'from_uid'); 
		from_name = GetQueryParam(a,'from_name');
		from_name = escape(from_name);
		time = GetQueryParam(a,'time');
		gift_sig = GetQueryParam(a,'gift_sig');
		gift_link = 'http://apps.facebook.com/farmtown/play/?type=' + gift_type + '&from_uid=' + from_uid + '&from_name=' + from_name + '&time=' + time + '&gift_sig=' + gift_sig + '&ruid=' + from_uid;
		bReturn = true;
	}
	return bReturn;
}

function GetFormAction()
{
	//MsgBox('GetGiftLink()');
	var bReturn = false;
	var forms = document.getElementsByTagName("form"); 
	if(forms){
		for (var i = 0; i < forms.length; i++) {
			var action = forms[i].getAttribute("action");
			action = DecodeHtml(action);
			if(ParseAction(action) == true){
				bReturn = true;
				break;
			}
		}
	}
	return bReturn;
}

function FindGameForm()
{
	var bReturn = false;
	var form = document.getElementsByTagName("form"); 
	if(form){
		for (var i = 0; i < form.length; i++) {
			var action = form[i].getAttribute("action");
			action = DecodeHtml(action);
			if(GetGameType(action) != null){
				bReturn = true;
				break;
			}
		}
	}	
	return bReturn;
}

function ShowLink()
{
	MsgBox(gift_link);
	return;
}

function DisplayLink(obj)
{
	obj.insertBefore(create('input',{class:"inputbutton",id:"reload_page",style:"margin: 0px 5px 5px 5px;",type:'button',value:"Reload " + game_type,onclick:PageReload}),obj.childNodes[0]);	
	var boxData = gift_link;
	var boxStyle = 'text-align:left;vertical-align:middle;font-family:Verdana;font-size:10px;display: block;;white-space: pre;overflow: auto;max-height: 10em;margin: 5px 5px 5px 5px;padding: 5px 8px 5px 8px;border:1px dashed #000';
	obj.insertBefore(create('textbox',{innerHTML:boxData,id:"gift_links",style:boxStyle}),obj.childNodes[0]);
	//obj.insertBefore(create('br'),obj.childNodes[0]);		
	//obj.insertBefore(create('input',{class:"inputbutton",id:"alert_links",style:"float:left;margin: 5px 5px 10px 5px;",type:'button',value:"Popup Link",onclick:ShowLink}),obj.childNodes[0]);	
}

function PageReload()
{
	return location.reload();
}

// Script init bits
//-- OLD
/*
function Init(){
	window.removeEventListener("load", Init, false);
	if(GetFormAction() == true) {
		var obj = document.getElementsByClassName("fb_content")[0];
		if(obj){
			DisplayLink(obj);
		}
	} else {
	}
	return;
}

window.addEventListener("load", Init, false); //invoke
*/
function Init(){
	if(FindGameForm() == true){
		window.removeEventListener("DOMNodeInserted", Init, false);
		if(GetFormAction() == true) {
			var obj = document.getElementsByClassName("fb_content")[0];
			if(obj){
				DisplayLink(obj);
			}
		}		
	}
	return;
}
window.addEventListener("DOMNodeInserted",Init,false);