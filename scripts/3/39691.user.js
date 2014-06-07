// ==UserScript==
// @name           SafeAlert
// @namespace      http://mike.ruhl.in
// @description    Prevents malicious scripts from calling "alert" infinitely and rendering your browser unusable.
// @include        *
// @version        1.0
// @date           2009-01-02
// @source         http://userscripts.org/scripts/show/39691
// @identifier     http://userscripts.org/scripts/source/39691.user.js
// @creator        Mike Ruhlin <@ruhl.in>
// ==/UserScript==

var realAlert = unsafeWindow.alert;
var realConfirm = unsafeWindow.confirm;
var realPrompt = unsafeWindow.prompt;

GM_registerMenuCommand("SafeAlert Options", function(){SA.showOptions();});

function trim(str) {
	return (new String(str)).replace(/^\s+|\s+$/g,"");
}


function readList(listString){
	var ret = [];
	var theList = (new String(listString)).split(',');
	for(i=0; i<theList.length; i++){
		if(theList[i].length > 0){
			ret.push(new RegExp(trim(theList[i])));
		}	
	}
	
	return ret;
}

function matchList(list, str){
	for(i=0; i < list.length; i++){
		if((new String(str)).search(list[i]) >= 0){
			return list[i];
		}
	}
	
	return null;
}

var whiteList = readList(GM_getValue('whiteList', ''));
var blackList = readList(GM_getValue('blackList', ''));


var safeAlert = function(){
		this.alertTimeout = GM_getValue('timeoutInterval', 5) * 1000;
		this.maxAlerts = GM_getValue('maxAlerts', 5);
		this.alertCounter = 0; /* How many alerts have been issued so far? */
		this.allowAll = false; /* If user says script is safe, let it go.*/
		this.allowNone = false; /* User says script is bad.  Ban all alerts. */
		
		// Options dialog
		this.showOptions = function() {
			var me = this;
			
			var div1=document.getElementById("modalDiv");
			if (div1==null)
			{
				GM_addStyle("#modalDiv{position:fixed; top:0px; left:0px; z-index:200; width:100%; height:100%; background-color:black; opacity:0.75;}");
				GM_addStyle(".hidden{display:none; visibility:hidden;}");
				div1=document.createElement("DIV");
				div1.id="modalDiv";
				div1.className="hidden";
				div1.title="Click to cancel and close";
				document.body.appendChild(div1);
				div1.addEventListener("click",me.hideOptions,false);
			}
			var div2=document.getElementById("optionsDiv");
			if (div2==null)
			{
				GM_addStyle("#optionsDiv{font-family: Arial; position:fixed; top:10%; left:20%; z-index:210; width:50%; height:80%; background-color:white; border:solid 3px #0033CC; overflow:auto; font-size: 10pt;}");
				div2=document.createElement("DIV");
				div2.id="optionsDiv";
				div2.className="hidden";
				div2.setAttribute("style","text-align:justify;padding:10px");
				var text1="<p style='font-size: 12pt;'><center><u><b>SafeAlert Options</b></font></u></center></p>";
				text1+="<form id=\"SafeAlertOptions\">";
				text1+="<p>URL Whitelist (comma separated, regexp allowed):<br/><textarea id='whiteList' style='width: 90%; height: 150px;'></textarea></p>";
				text1+="<p>URL Blacklist (comma separated, regexp allowed):<br/><textarea id='blackList' style='width: 90%; height: 150px;'></textarea></p>";
				text1+="<p>Timeout interval (seconds): <input type='text' id='timeoutInterval'/></p>";
				text1+="<p>Max alerts per timeout: <input type='text' id='maxAlerts'/></p>";
				text1+="<p><input type=\"button\" value=\"Ok\" id=\"okButton\" />   <input type=\"button\" value=\"Cancel\" id=\"cancelButton\" /></p></form>";
				div2.innerHTML=text1;
				
				document.body.appendChild(div2);
				document.getElementById("okButton").addEventListener("click",function(){me.saveOptions();me.hideOptions();location.reload(true);},false);
				document.getElementById("cancelButton").addEventListener("click",function(){me.hideOptions();},false);
			}
			document.getElementById("optionsDiv").className="";
			document.getElementById("modalDiv").className="";
			
			document.getElementById('whiteList').value = GM_getValue('whiteList', "");
			document.getElementById('blackList').value = GM_getValue('blackList', "");
			document.getElementById('timeoutInterval').value = GM_getValue('timeoutInterval', 5);
			document.getElementById('maxAlerts').value = GM_getValue('maxAlerts', 5);
			
			div1.className="";
			div2.className="";
		};
		
		this.saveOptions = function(){
			GM_setValue('whiteList', document.getElementById('whiteList').value);
			GM_setValue('blackList', document.getElementById('blackList').value);
			GM_setValue('timeoutInterval', document.getElementById('timeoutInterval').value);
			GM_setValue('maxAlerts', document.getElementById('maxAlerts').value);
		};
		
		this.hideOptions = function(){
			document.getElementById("optionsDiv").className="hidden";
			document.getElementById("modalDiv").className="hidden";
		};
		
		// Once the allotted timeout has elapsed, decrease the timer.
		this.decreaseAlertCounter = function(){
			if(this.alertCounter > 0){
				this.alertCounter--;
			}
		};
		
		// Check if the current script has overstepped its bounds, prompt user if it has.
		this.goneOverboard = function(){
			if(this.allowNone == true){
				return true;
			}
			
			if(this.allowAll == true){
				return false;
			}
				
			if(this.alertCounter > this.maxAlerts){
				var userSaysBlock = realConfirm("SafeAlert has detected an alarming number of calls to alert().\nClick OK to disable the alert function on this page.\nClick Cancel to let the script keep nagging you.");
				
				if(userSaysBlock){
					this.allowNone = true;
					this.allowAll = false;
					return true;
				}
				else{
					this.allowAll = true;
					this.allowNone = false;
					return false;
				}
			}
			// Hasn't hit the limit yet.  Up the count.
			else{
				this.alertCounter++;
				var me = this;
				setTimeout(function(){me.decreaseAlertCounter();}, this.alertTimeout);
				return false;
			}
		};
		
		this.doAlert = function(msg){
			if(!this.goneOverboard(alert)){
				return realAlert(msg);
			}
			
			GM_log("SafeAlert prevented alert(" + msg + ")");
			return false;
		};
			
		this.doConfirm = function(msg){
			if(!this.goneOverboard()){
				return realConfirm(msg);
			}
			
			GM_log("SafeAlert prevented confirm(" + msg + ")");
			return false;
		};
			
		this.doPrompt = function(msg, def){
			if(!this.goneOverboard()){
				return realPrompt(msg, def);
			}
			
			GM_log("SafeAlert prevented prompt(" + msg + ", " + def + ")");
			return false;
		};
};
		
var SA = new safeAlert();

var matchWhite = matchList(whiteList, location.href)
var matchBlack = matchList(blackList, location.href)
if(matchBlack != null){
	GM_log("SafeAlert - " + location.href + " is blacklisted (matched " + matchBlack + ").  All alerts disabled.");
	SA.allowNone = true;
	SA.allowAll = false;
}
else if(matchWhite != null){
	GM_log("SafeAlert - " + location.href + " is whitelisted (matched " + matchWhite + ").  All alerts enabled.");
	SA.allowNone = false;
	SA.allowAll = true;
}

unsafeWindow.alert = function(msg){return SA.doAlert(msg);};
unsafeWindow.confirm = function(msg){return SA.doConfirm(msg);};
unsafeWindow.prompt = function(msg, def){return SA.doPrompt(msg, def);};