////////////////////////////////////////////////////////////////////////////
// ==UserScript===
// @name            Userscripts.org Input Button
// @author          Jerone UserScript Productions
// @namespace       http://userscripts.org/users/31497
// @description     Adds a styled button to the text fields on userscripts.org (ie. search field).
// @description     Userscripts.org Input Button v3.2.4
// @version         v3.2.4 beta
// @statussize      
// @defaulticon     
// @homepage        http://userscripts.org/users/31497
// @include         http://userscripts.org*
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////
// ToC:
// - Rights
// - History
// - Todo List
// - User Settings
// - Functions Framework
// - Userscript
// - Translation
// - Update Script
// - Command Options
//(- Validation script)
/*//////////////////////////////////////////////////////////////////////////
THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR IMPLIED
WARRANTIES,  INCLUDING,  BUT  NOT  LIMITED  TO,  THE  IMPLIED  WARRANTIES OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO
EVENT  SHALL  THE  AUTHOR  BE  LIABLE  FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;  LOSS OF USE, DATA, OR PROFITS;
OR BUSINESS INTERRUPTION) HOWEVER  CAUSED  AND  ON  ANY THEORY OF LIABILITY,
WHETHER  IN  CONTRACT, STRICT  LIABILITY, OR  TORT  (INCLUDING NEGLIGENCE OR
OTHERWISE)  ARISING  IN  ANY  WAY  OUT  OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
/*//////////////////////////////////////////////////////////////////////////
// History:
// - 28-09-2007: finaly fixed 'setTimeout()' bug and added opacity for closing.
// - 29-09-2007: added support for system colours in validation.
// - 30-09-2007: update node functions, added opacity fadein & fadeout and changed unchanged to $hs.
// - 02-10-2007: updated GM_update to work better when timeouted & added attr title.
// - 03-10-2007: updated updateToggle() and added a new node function: $tn.
// - 04-10-2007: fixed bug with cmdContent & opyright not showing right, 
//               updated updateToggle() with 2 begin cases, cleaned up code and added information.
// - 05-10-2007: added firtTimeVisit() notivication.
// - 10-10-2007: updated z-index.
// - 11-10-2007: updated GM_update() & additional info and added UserScript_functions (cross addon).
// - 14-10-2007: added $timeDateWords() and fixed problem with GM_update() when thisVHigherThenServerV.
// - 15-10-2007: made different colors for commandTable (blue, red, yellow, green), added global control 
//				 for GreaseMonkey addon correct version and fixed cancelCommandSettings() with return back settings.
// - 16-10-2007: added cursors, added $getStyle().
// - 23-10-2007: updated update info and added GM_updateAddon().
// - 24-10-2007: fixed bug when cancels and no button is availible.
// - 25-10-2007: added 3 lettered color and obj for validateColorInput(), improved searchArray(), cleaned up code and released beta code.
// - 26-10-2007: fixed GMupdateOverlay hide, added tobber to server version, added icons to buttons,
//				 fix for multiple alternativeObj's for validateColorInput() and added icons to inputs with undo fix.
// - 29-10-2007: added begin for multilangual.
// - 30-10-2007: updated $opacityFade with functie options.
// - 31-10-2007: updated language with better system and a backup.
// - 02-11-2007: fixed language mod system.
// - 05-11-2007: improved language system.
////////////////////////////////////////////////////////////////////////////

UIB = new Object();

//*** USER SETTINGS ***//
var GMUcheck4UpdateDefault 	= true;			// search for updates [true / false];
var GMUupdateTimeDefault	= 1*60*60*1000;	// timeinterval between update check [numbers in miliseconds];
UIB.visibleDefault			= true;			// show Userscripts.org Input Button [true / false];
UIB.bordercolorDefault		= "#a7a6aa";	// button border color [valid color];
UIB.backgcolorDefault		= "White";		// button background oolor [valid color];
UIB.textcolorDefault		= "#888888";	// button text color [valid color];
UIB.textvalueDefault		= ">";			// button text ["any text you like"];
var CMDlanguageDefault		= "en";			// language;
var CMDlanguageMod			= 'normal';		// ["auto" = always use navigator language], ["normal" = first time defined auto, after that options], [string = always override]
var CMDshowUpdaterDefault	= false;		// show updater information [true / false];
var CMDtableColor			= "blue";		// command color ["blue" / "red" / "yellow" / "green"];
var debugHide				= false;		// hide the debugs logs [true / false];

var $lang = window.navigator.language.substr(0,2).toLowerCase(); setLanguage(CMDlanguageMod.toLowerCase()); var language=languageS.locals[languageS.lang];

GM_update({
	title:		 'Userscripts.org Input Button',									// name of the userscript
	thisVersion: 'v3.2.4 beta',														// this version
	updateUrl:	 'http:\/\/userscripts.org\/scripts\/show\/11400',					// url when to visited
	versionUrl:	 'http:\/\/userscripts.org\/scripts\/source\/11400.user.js?source',	// url were versionnumber needs to be searched. When stored on userscripts.org '?source' needs to be added to don't increase the installs-count just for update checks!
});


//*** FUNCTIONS FRAMEWORK ***//
var $d = document;
var $today = new Date();
var $now = $today.getTime();
function $gi(str){return $d.getElementById(str);};									// Get Element Id	|| $gi("myDiv");
function $ce(obj){return $d.createElement(obj);};									// Create Element	|| $ce("div");
function $re(obj){obj.parentNode.removeChild(obj);};								// Remove Element	|| $re($gi("myDiv"));
function $ct(str){return $d.createTextNode(str);};									// Create Text		|| $ct("Hello World!");
function $ih(obj,HTML){obj.innerHTML=HTML;};										// Inner Html		|| $ih($gi("myDiv"),"<strong>innerHTML</strong>");
function $sa(obj,attr,val,flag){obj.setAttribute(attr,val,flag);};					// Set Attribute	|| $sa($ce("div"),"id","myDiv");
function $ga(obj,attr,flag){return obj.getAttribute(attr,flag);};					// Get Attribute	|| $ga($gi("myDiv"),"id");  // gives "myDiv"
function $ac(obj,nObj){obj.appendChild(nObj);};										// Append Child		|| $ac($ce("div"),$ct("Hello World!"));
function $ia(obj,nObj){return obj.parentNode.insertBefore(nObj,obj.nextSibling);};	// Insert After		|| $ia($ce("div"),$ct("Hello World!"));
function $ib(obj,nObj){return obj.parentNode.insertBefore(nObj,obj);};				// Insert Before	|| $ib($ce("div"),$ct("Hello World!"));
// Get Tag Name  || var inputs=$tn("input");
function $tn(obj){if($d.getElementsByTagName){return $d.getElementsByTagName(obj);}else if($d.all){return $d.all.tags(obj);}};
// value between min and max  || $beTween(100,1986,2000);
function $beTween(min,value,max){return(min<=value&&value<max);};
// detect the browser window measurements; [richting: 'h' = height / 'w' = width]  || $meaSureMentWindow('h');
function $meaSureMentWindow(richting){var richting=richting.toLowerCase();if(richting=='h'){if(window.innerHeight){return window.innerHeight;}if($d.documentElement&&$d.documentElement.clientHeight){return $d.documentElement.clientHeight;}if($d.body){return $d.body.clientHeight;}else return 1000;}if(richting=='w'){if(window.innerWidth){return window.innerWidth;}if($d.documentElement&&$d.documentElement.clientWidth){return $d.documentElement.clientWidth;}if($d.body){return $d.body.clientWidth;}else return 1000;}else if(richting==''){return 1000;}};
// add Event  || $addEvent($gi("testID"),"click",command);
function $addEvent(obj,evType,fn,useCapture){if(obj.addEventListener){obj.addEventListener(evType,fn,useCapture);return true;}else if(obj.attachEvent){var ae=obj.attachEvent("on"+evType,fn);return ae;}else{alert("Event Handler could not be attached to: "+obj.toString());}};
// remove Event;
function $removeEvent(obj,evType,fn,useCapture){if(obj.removeEventListener){obj.removeEventListener(evType,fn,useCapture);return true;}else if(obj.detachEvent){var r=obj.detachEvent("on"+evType,fn);return r;}else{alert("Handler could not be removed");}};
// add style to the page  || $addCSS("table.commandTable{width:100%;padding:5px;background-color:#3399FF;border:1px solid #0066CC}");
function $addCSS(css){var css;if(typeof US_addStyle!="undefined"){US_addStyle(css);}else if(typeof addStyle!="undefined"){addStyle(css);}else{var heads=$d.getElementsByTagName("head");if(heads.length>0){var node=$ce("style");node.type="text/css";$ih(node,css);$ac(heads[0],node);}}};
// get rendered style  || $getStyle($gi("testID"),"font-size");
function $getStyle(obj,styleAttr){if(window.getComputedStyle){/**Mozilla,Opera,Safari**/var style=document.defaultView.getComputedStyle(obj,null).getPropertyValue(styleAttr);}else if(obj.currentStyle){/**IE**/var style=obj.currentStyle[styleAttr];}return style;}
// set opacity from 0 t/m 100 %  || $setOpacity($gi("testID"),70);
function $setOpacity(obj,n){var obj=obj.style;obj.opacity=(n/100);/**CSS3**/obj.MozOpacity=(n/100);/**Mozilla**/obj.KhtmlOpacity=(n/100);/**KHTML**/obj.filter="alpha(opacity="+n+")";/**IE**/obj.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+n+")";/**IE old**/};
// set return opacity from 0 t/m 100 %  || $setReturnOpacity(70);
function $setReturnOpacity(n){return opacity="filter:alpha(opacity="+n+");"+/**IE**/"filter:progid:DXImageTransform.Microsoft.Alpha(opacity="+n+");"+/**IE old**/"opacity:"+(n/100)+";"+/**CSS3**/"-moz-opacity:"+(n/100)+";"+/**Mozilla**/"-khtml-opacity:"+(n/100)+";";/**KHTML**/};
// alert msg; [type: 'n'=normal / 'g'=US_log / 'c'=console] [methode: '1'=debug / '2'=info / '3'=warn / '4'=error] (use '' for empty)(on console-debug and -info no contacttext is shown)  || $alert('c',2,'test01','testtxt');
function $alert(type,methode,error,msg){contactTxt="\nContact. : Please contact the owner/scripter about this problem.";if(typeof(console)!="undefined"&&type!='g'&&type!='n'){var consoleErrorTxt="Error Nr : "+error+" (console)\n"+"Message  : "+msg+contactTxt;var consoleInfoTxt="Error Nr : "+error+" (console)\n"+"Message  : "+msg;if(methode==1)console.debug(consoleInfoTxt);else if(methode==2)console.info(consoleInfoTxt);else if(methode==3)console.warn(consoleErrorTxt);else if(methode==4)console.error(consoleErrorTxt);else console.warn(consoleErrorTxt);}if(typeof(US_log)!="undefined"&&type!='c'&&type!='n'){US_log("Error Nr. : "+error+" (US_log)\n"+"Message : "+msg+contactTxt);}if(type!='c'&&type!='g')alert("Error Nr. : "+error+" (normal)\n"+"Message : "+msg+contactTxt);};
// Hide/Show object; [way: 1=show / 2=hide / 3=toggle] [riturn=true if you want to check (optional)]  || if($hs($gi("cmdUpdater"),1,true)){$hs($gi("cmdUpdater"),2);};
function $hs(obj,way,riturn){if(riturn){if(way==1){if(obj.style.display=="block"||obj.style.visibility=="visible"||!(obj.style.display=="none"||obj.style.visibility=="hidden")){return true;}else return false;}else if(way==2){if(obj.style.display=="none"||obj.style.visibility=="hidden"){return true;}else return false;}else if(way==3){$alert('',4,'$hs01','There is no toggle return');}}else{if(way==1){obj.style.display="block";obj.style.visibility="visible";}else if(way==2){obj.style.display="none";obj.style.visibility="hidden";}else if(way==3){if(obj.style.display=="none"||obj.style.visibility=="hidden"){obj.style.display="block";obj.style.visibility="visible";}else{obj.style.display="none";obj.style.visibility="hidden";}}}};
// fades positive; opacStart & opacEnd = [0-100%], opacTime = [milisec], opacSteps = [between opacStart & opacEnd], functBusy = function while busy [string], functFinish = function when finished [string]  || $opacityFadeIn($gi(id),$gi(id).style.opacity*100,100,100,5,'alert("busy")','alert("finished")');
function $opacityFadeIn(obj,opacStart,opacEnd,opacTime,opacSteps,functBusy,functFinish){if(opacStart<opacEnd){$setOpacity(obj,opacStart);eval(functBusy);window.setTimeout(function(){opacStart+=(opacSteps);$opacityFadeIn(obj,opacStart,opacEnd,opacTime,opacSteps,functBusy,functFinish)},opacTime);}else if(opacStart>=opacEnd){eval(functFinish);}};
// fades negative; opacStart & opacEnd = [0-100%], opacTime = [milisec], opacSteps = [between opacStart & opacEnd], functBusy = function while busy [string], functFinish = function when finished [string]  || $opacityFadeOut($gi(id),$gi(id).style.opacity*100,-1,100,5,'alert("busy")','alert("finished")');
function $opacityFadeOut(obj,opacStart,opacEnd,opacTime,opacSteps,functBusy,functFinish){if(opacStart>opacEnd){$setOpacity(obj,opacStart);eval(functBusy);window.setTimeout(function(){opacStart-=(opacSteps);$opacityFadeOut(obj,opacStart,opacEnd,opacTime,opacSteps,functBusy,functFinish)},opacTime);}else if(opacStart<=opacEnd){eval(functFinish);}};
// time and date converted into words  || $timeDateWords(24*60*60*1000);
function $timeDateWords(t){var shorten=false;var timeDateWord=false;var timeUnits=[{name:language.tDW.millisecond,pluralName:language.tDW.milliseconds,min:0,max:1000},{name:language.tDW.second,pluralName:language.tDW.secondes,min:1000,max:60*1000},{name:language.tDW.minute,pluralName:language.tDW.minutes,min:60*1000,max:60*60*1000},{name:language.tDW.hour,pluralName:language.tDW.hours,min:60*60*1000,max:24*60*60*1000},{name:language.tDW.day,pluralName:language.tDW.days,min:24*60*60*1000,max:7*24*60*60*1000},{name:language.tDW.week,pluralName:language.tDW.weeks,min:7*24*60*60*1000,max:365*24*60*60*1000},{name:language.tDW.year,pluralName:language.tDW.years,min:365*24*60*60*1000,max:Infinity}];for(var i=0,timeUnit=null;timeUnit=timeUnits[i];i++){if ($beTween(timeUnit.min,t,timeUnit.max)){var timeVal=Math.floor(t/(timeUnit.min!=0?timeUnit.min:1));timeDateWord=(timeVal!=(1&&shorten)?timeVal+" ":'')+(timeVal!=1?timeUnit.pluralName:timeUnit.name);}}return timeDateWord;};
// search array [caseInsensitive > default true] [ignoreSpaces > default true]  || testArray.searchArray("test",false,false);
Array.prototype.searchArray=function(searchString,caseInsensitive,ignoreSpaces){var inArray=false;for(var i=0;i<this.length;i++){if(caseInsensitive!=false){searchString=searchString.toLowerCase();this[i]=this[i].toLowerCase();}if(ignoreSpaces!=false){spaceRegExp=/\s+/g;searchString=searchString.replace(spaceRegExp,"");this[i]=this[i].replace(spaceRegExp,"");}if(this[i]==searchString){inArray=true;break;}}return inArray;}

function US_setValue(name,value){
	if(GM_setValue){  // GM
		return GM_setValue(name,value);
	}
	else if(PRO_setValue){  // IEpro
		return PRO_setValue(name,value);
	}
};
function US_getValue(name,defaultValue){
	if(GM_getValue){  // GM
		return GM_getValue(name,defaultValue);
	}
	else if(PRO_getValue){  // IEpro
		return PRO_getValue(name);
	}
};
function US_log(msg){
	if(GM_log){  // GM
		return GM_log(msg);
	}
	else if(PRO_log){  // IEpro
		return PRO_log(msg);
	}
};
function US_openInTab(url,flags) {
	if(GM_openInTab){  // GM
		return GM_openInTab(url);
	}
	else if(PRO_openInTab){  // IEpro
		return PRO_openInTab(url,flags);
	}
};
function US_addStyle(css,documentFrame) {
	if(GM_addStyle){  // GM
		return GM_addStyle(css);
	}
	else if(PRO_addStyle){  // IEpro
		return PRO_addStyle(css,documentFrame);
	}
};
function US_prompt(label,defaultValue) {
	if(PRO_prompt){  // IEpro
		return PRO_prompt(label,defaultValue);
	}
};
function US_registerMenuCommand(commandName, commandFunc, accelKey, accelModifiers, accessKey) {
	if(GM_registerMenuCommand){  // GM
		return GM_registerMenuCommand(commandName, commandFunc, accelKey, accelModifiers, accessKey);
	}
	else if (PRO_registerMenuCommand){  // IEpro
		return PRO_registerMenuCommand(accelKey,commandFunc);
	}
};


//*** USERSCRIPT ***//
var GMUcheck4UpdateGet 	= GMUcheck4UpdateDefault;
var GMUupdateTimeGet	= GMUupdateTimeDefault;
UIB.visibleGet			= US_getValue("visible",UIB.visibleDefault);
UIB.bordercolorGet		= US_getValue("border-color",UIB.bordercolorDefault);
UIB.backgcolorGet		= US_getValue("background-color",UIB.backgcolorDefault);
UIB.textcolorGet		= US_getValue("text-color",UIB.textcolorDefault);
UIB.textvalueGet		= US_getValue("text",UIB.textvalueDefault);
var CMDlanguageGet		= US_getValue("CMDlanguage",CMDlanguageDefault);
var CMDshowUpdaterGet	= CMDshowUpdaterDefault;

UIB.UIB = function() {
	if (UIB.visibleGet == true) {
		$alert('c',1,'UIB01','UIB is ingeschakeld');
		UIB.inputs = $tn("input");
		for(var i=0; i < UIB.inputs.length; i++) {
			if (UIB.inputs[i].getAttribute("type")=="text") {
				UIB.dci = $ce("INPUT");
				UIB.dci = UIB.dci.cloneNode(true);
				$sa(UIB.dci,"id","UIBsubmitButton");
				$sa(UIB.dci,"type","submit");
				$sa(UIB.dci,"title",language.UIB.submitTip);
				$sa(UIB.dci,"value",UIB.textvalueGet);
				$sa(UIB.dci,"style","border:1px solid " + UIB.bordercolorGet + ";border-left-style:none;background:" + UIB.backgcolorGet + ";color:" + UIB.textcolorGet + ";margin:0px;padding:1px;cursor:pointer;")
				$ia(UIB.inputs[i],UIB.dci);
			}
		}
	}
	else $alert('c',1,'UIB01','UIB is uitgeschakeld');
}
UIB.UIB();


//*** TRANSLATION ***//
function setLanguage(searchLang){
	languageS = {
		lang : CMDlanguageDefault.toLowerCase(),
		init : function(langMod){
			langMod = langMod.toLowerCase();
			if(langMod == 'auto'){
				var lang = $lang;
			}
			else if (langMod == 'normal'){
				var lang = (US_getValue("CMDlanguage",$lang)==''?$lang:US_getValue("CMDlanguage",$lang));
			}
			else{
				var lang = langMod;
			}
			languageS.lang = (lang && (languageS.locals.hasOwnProperty(lang) || lang in languageS.locals)) ? lang : languageS.lang;
			var CMDlanguageSet = US_setValue("CMDlanguage",languageS.lang);
		},
		locals : {
			en : {
				common : {
					languageShort	: 'en',
					languageLong	: 'English',
					translator		: 'Jerone',
					name			: 'Userscripts.org Input Button',
					def				: 0},
				UIB : {
					submitTip		: 'Submit',
					def				: 1},
				tDW : {
					millisecond		: 'millisecond',	milliseconds	: 'milliseconds',
					second			: 'second',			secondes		: 'secondes',
					minute			: 'minute',			minutes			: 'minutes',
					hour			: 'hour',			hours			: 'hours',
					day				: 'day',			days			: 'days',
					week			: 'week',			weeks			: 'weeks',
					year			: 'year',			years			: 'years',
					def				: 2},
				GMU : {
					notYetDefined	: 'Not yet defined',
					upDate			: "Update ### with version #### to version #####?",
					noUpdate		: "You'll be informed again when you visit this website again after ###.",
					lower			: 'is lower then',
					equel			: 'is equel to',
					higher			: 'is higher then',
					def				: 3},
				CMD : {
					title			: 'Userscripts.org Input Button',
					closeTip		: 'Close',
					setting			: 'Setting',
					value			: 'Value',
					input			: 'Input',
					default			: 'Default',
					visible			: 'Visible',
					show			: 'Show',
					hide			: 'Hide',
					borderColor		: 'Border-color',
					backgroundColor	: 'Background-color',
					textColor		: 'Text-color',
					text			: 'Text',
					anyTextYouLike	: 'Any text you like',
					language		: 'Language',
					selectOne		: 'Select one',
					submit			: 'Submit',
					preview			: 'Preview',
					cancel			: 'Cancel',
					updater			: 'Updater',
					thisVersion		: 'This Version',
					servVersion		: 'Server Version',
					lastUpdate		: 'Last Update',
					nextUpdate		: 'Next Update',
					def				: 4},
				US_rMC : {
					title			: 'Userscripts.org Input Button Settings',
					notCorrect		: 'Please update to the new version of GreaseMonkey, because this script requires the newest features !',
					def				: 5}},
			nl : {
				common : {
					languageShort	: 'nl',
					languageLong	: 'Nederlands',
					translator		: 'Jerone',
					name			: 'Userscripts.org Input Button',
					def				: 0},
				UIB : {
					submitTip		: 'Toepassen',
					def				: 1},
				tDW : {
					millisecond		: 'milliseconde',	milliseconds	: 'milliseconden',
					second			: 'seconde',		secondes		: 'seconden',
					minute			: 'minuut',			minutes			: 'minuten',
					hour			: 'uur',			hours			: 'uren',
					day				: 'dag',			days			: 'dagen',
					week			: 'week',			weeks			: 'weken',
					year			: 'jaar',			years			: 'jaren',
					def				: 2},
				GMU : {
					notYetDefined	: 'Nog niet gespecificeerd',
					upDate			: "Update ### with version #### to version #####?",
					noUpdate		: "Je wordt opnieuw geinformeerd zodra je deze site weer bezoekt na ###.",
					lower			: 'is lager dan',
					equel			: 'is gelijk aan',
					higher			: 'is hoger dan',
					def				: 3},
				CMD : {
					title			: 'Userscripts.org Input Button',
					closeTip		: 'Sluiten',
					setting			: 'Instelling',
					value			: 'Value',
					input			: 'Invulling',
					default			: 'Standaard',
					visible			: 'Zichtbaar',
					show			: 'Weergeven',
					hide			: 'Verbergen',
					borderColor		: 'Rand kleur',
					backgroundColor	: 'Achtergrond kleur',
					textColor		: 'Tekst kleur',
					text			: 'Tekst',
					anyTextYouLike	: 'Elke tekst die je wilt',
					language		: 'Taal',
					selectOne		: 'Eén selecteren',
					submit			: 'Toepassen',
					preview			: 'Voorbeeld',
					cancel			: 'Annuleren',
					updater			: 'Updater',
					thisVersion		: 'Deze versie',
					servVersion		: 'Server versie',
					lastUpdate		: 'Laatste update',
					nextUpdate		: 'Volgende update',
					def				: 4},
				US_rMC : {
					title			: 'Userscripts.org Input Button Instellingen',
					notCorrect		: 'Please update to the new version of GreaseMonkey, because this script requires the newest features !',
					def				: 5}},
		}
	};
	languageS.init(CMDlanguageMod);
}


//*** UPDATE SCRIPT ***//
// This script compares the current version to the new version on Userscripts.org.
// When a new version is availible it shows a message if you want to update.
// This script also includes a anti-DoS attack by avoiding a flood of dialogs, 
//   caused by for example multiple pages open or when you visited the site to update to the new version.
function GM_update(script) {
	var GMU = this;
	var GMupdateLoadingImage='data:image/gif;base64,R0lGODlhEgASALMPAKysqpWVk1RUUmJiYIqKiW9vbqCgnomJh35+faGhnnBwb39/fqGhn3FxcYCAgP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAPACwAAAAAEgASAAAEV/DJSautzt29+toTQTxIiTxNc4kieSqwYh30QRV4cdEWbgUB0GMwmACBGyJRcgxelEWmMxmlMBgWgeCS6CYoWq3FQDY8AIBHeDs2o9FqNuidFlLg9rwkAgAh+QQFAAAPACwBAAEAEAAQAAAEUvDJ+QihmFqbZwjPIR6P42DfF5JLu1ApOCE0gsoUTTFMNzWNR2KY8CmOCoPS4Cs4Cw+lT+KkAACZwQBzvVK0Wmv3IRA8wFsxuWwO+9jm6aTciQAAIfkEBQAADwAsAQABABAAEAAABFHwyflCoJhamydj1fYQBJacSTiS5WS8BnXMB/ZmMwUA3eQ4j92utyguhLwOYokIJntLikCQaTQw0ylFwVVIs4/B4FEoF7BUsZh87qnHPco6EwEAIfkEBQAADwAsAQABABAAEAAABFLwyfkYo5imnfIEwGOMxhMEGAiK5XlSaji5KCxT7yQI3kQQj92u9/sJeZ6D8hBE9pSUwSDjcGCkUspiu4hiH43GA0FGXKeKtGJs7hXehR7m7YkAACH5BAUAAA8ALAEAAQAQABAAAART8Mn5AKCYWpunENX2MAz2feGTrAl1gpMhGyZMydQwdFMQPDodz+cL7jrEn5D38FEajQyBgFFYFZTplFLoFh4Ox+NAPmC6j4V6MTbzEHAEkwLvRAAAIfkEBQAADwAsAQABABAAEAAABFHwyfmEoJham+cY1fYAAPZ94UiW3kmtbJuRVNN0E8M8Sq/giWCiQCzgDEjDg4iTICkORyYQwCyuCwqVSkF4EQ8C4bGtdsFiMdncObgPTYq7EwEAIfkEBQAADwAsAQABABAAEAAABFLwyfnGoJham2dr1fYIAqacSjiS5VS8BcW2boyRlON0EwA8i+CC5/Mhjghi8XHkSXwUAiHDYGCkUkpim6AcvodHIPAwmA2Yr3hMNjvZZOdk3IkAACH5BAUAAA8ALAEAAQAQABAAAARS8Mn5WqOYqq3ydM5TjMUzDNiiLmJ5nhQiI9SLxjQGTwThTQLBo9f7BYOH5MF4fCR/kiAlEMgAABgqlXK9TrUPBuPRxX4fiXSCbPYY3gYo5e2JAAA7';				

	GM_updateTitle = script.title;
	GM_updateThisVersion = script.thisVersion;
	GM_updateUpdateUrl = script.updateUrl;
	GM_updateVersionUrl = script.versionUrl;
	GM_updateServVersion = language.GMU.notYetDefined;
	dateLastChecked = language.GMU.notYetDefined;
	dateNextCheck = language.GMU.notYetDefined;
	
	var $now = new Date().getTime();
	var GMUDoS = 2 * 60 * 1000;
	
	GMU.checkChecked = function() {
		var alreadyChecking = GM_getValue('GMUDoS',null);
		GM_setValue('GMUDoS', $now.toString());
		if (alreadyChecking && ($now - alreadyChecking) < GMUDoS) return;
		var lastChecked = GM_getValue('GM_updatelastChecked', null);
		if (lastChecked && ($now - lastChecked) < GMUupdateTimeDefault) return;
		GMU.httpRequest();
	}
	GMU.httpRequest = function() {
		GM_xmlhttpRequest({
			method: "GET",
			url: script.versionUrl,
			onreadystatechange: GMU.updateScript,
			onerror: GMU.error,
			onabort: function(){ alert('ttest');}
		});
	}
	GMU.error = function(x) {
		$alert('c',2,'GMu08',"[Status: " + statusText + " (" + status + ")]; " + "[ResponsHeaders: " + responsHeaders + "]; " + "[Respons: " + responseText + "]; ");
	}
	GMU.updateScript = function(o) {
		GM_updaterReadyState=o.readyState;
		if(o.readyState == 1) {  // loading...
			GMU.addon(2);
			if (!$gi("GMupdateOverlay") && !$gi("cmdOverlayGray")) {
				GMupdateHeight = 20;  // px
				GMupdateWidth = 20;  // px
				GMupdateTop = Math.min(($meaSureMentWindow('h') - GMupdateHeight)/2);
				GMupdateLeft = Math.min(($meaSureMentWindow('w') - GMupdateWidth)/2);
				var GMupdateOverlay = $ce("DIV");
				$sa(GMupdateOverlay,"id","GMupdateOverlay");
				$sa(GMupdateOverlay,"style",$setReturnOpacity(70) + "visibility:visible;background-color:#000;display:block;position:fixed;height:100%;width:100%;top:0px;left:0px;z-index:9998");
				$ac($d.body,GMupdateOverlay);
				var GMupdateLoading = $ce("IMG");
				$sa(GMupdateLoading,"src",GMupdateLoadingImage);
				$sa(GMupdateLoading,"style",$setReturnOpacity(100) + "visibility:visible;display:block;position:fixed;height:" + GMupdateHeight + "px;width:" + GMupdateWidth + "px;top:" + GMupdateTop + "px;left:" + GMupdateLeft + "px;z-index:9999");
				$ac(GMupdateOverlay,GMupdateLoading);
				$addEvent(GMupdateOverlay,"dblclick",function(){$re($gi("GMupdateOverlay"));});
			}
		}
		else if(o.readyState == 4) {
			if ($gi("GMupdateOverlay")) {
				$re($gi("GMupdateOverlay"));
			}
			GMU.addon(3);
			if (o.status == 200) {
				var current = o.responseText;
				RegExp0 = /\/\/\s+==UserScript==/i;
				RegExp1 = /@version\s+(v?\s?[\d.]+\s?\w+)/i;
				RegExp2 = /([\d.]+)/i;
				if (current.match(RegExp0)){
					if (current.match(RegExp1)) {
						RegExp$1 = RegExp.$1;
						RegExp$1.match(RegExp2);
						serverVersionX = RegExp.$1;
						serverVersion = serverVersionX.split(".");

						script.thisVersion.match(RegExp2);
						thisVersionX = RegExp.$1;
						thisVersion = thisVersionX.split(".");

						var notyetprompted2Update = true;
						var thisVHigherThenServerV = false;
						var answer;

						GM_updateServVersion = RegExp$1;
						
						if(console) {
							console.group("GM_update versions");
						}
						for(var c=0; c < Math.max(serverVersion.length,thisVersion.length); c++) {
							if(thisVersion[c]=="undefined" || thisVersion[c]=="" || thisVersion[c]==null){
								thisVersion[c] = 0;
							}
							if(serverVersion[c]=="undefined" || serverVersion[c]=="" || serverVersion[c]==null){
								serverVersion[c] = 0;
							}
							if(thisVersion[c] < serverVersion[c] && notyetprompted2Update && !thisVHigherThenServerV) {
								answer = confirm(language.GMU.upDate.replace(/###/,script.title).replace(/####/,script.thisVersion).replace(/#####/,RegExp$1));
								if(answer) { US_openInTab(script.updateUrl); }
								else { alert(language.GMU.noUpdate.replace(/###/,$timeDateWords(GMUupdateTimeDefault))); }
								notyetprompted2Update = false;
								$alert('c',2,'GMu07 ['+c+']',"{" + script.thisVersion + " && " + RegExp$1 + "}; " + thisVersion[c] + " " + language.GMU.lower + " " + serverVersion[c]);
							} 
							else if(thisVersion[c] == serverVersion[c]) {
								$alert('c',2,'GMu06 ['+c+']',"{" + script.thisVersion + " && " + RegExp$1 + "}; " + thisVersion[c] + " " + language.GMU.equel + " " + serverVersion[c]);
							}
							else if(thisVersion[c] > serverVersion[c]) {
								$alert('c',3,'GMu05 ['+c+']',"{" + script.thisVersion + " && " + RegExp$1 + "}; " + thisVersion[c] + " " + language.GMU.higher + " " + serverVersion[c]);
								thisVHigherThenServerV = true;
							}
							else { 
								$alert('c',2,'GMu04 ['+c+']',"{" + script.thisVersion + " && " + RegExp$1 + "}; " + thisVersion[c] + " " + language.GMU.lower + " " + serverVersion[c]);
							}
							GM_setValue('GM_updatelastChecked',$now.toString());
						}
						if(console) {
							console.groupEnd();
						}
						GMU.addon(4);  // everything is done, so let a addon do its work;
					}
					else $alert('',4,'GMu03',"Version is written very strange, so i can't check for updates");
				}
				else $alert('',4,'GMu02',"There isn't a '==UserScript==' header, so i can't check for updates");
			}
			else $alert('',4,'GMu01',"Detected problems loading url: " + o.statusText + " [" + o.status + "].");
		}
	}
	GMU.addon = function(fase) {
		if (typeof GM_updateAddon == 'function') {
			GM_updateAddon(fase);
		}
	}
	if (GMUcheck4UpdateDefault) GMU.checkChecked();
}

function GM_updateAddon(fase) {
	var GMupdateLoadingImage='data:image/gif;base64,R0lGODlhEgASALMPAKysqpWVk1RUUmJiYIqKiW9vbqCgnomJh35+faGhnnBwb39/fqGhn3FxcYCAgP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAPACwAAAAAEgASAAAEV/DJSautzt29+toTQTxIiTxNc4kieSqwYh30QRV4cdEWbgUB0GMwmACBGyJRcgxelEWmMxmlMBgWgeCS6CYoWq3FQDY8AIBHeDs2o9FqNuidFlLg9rwkAgAh+QQFAAAPACwBAAEAEAAQAAAEUvDJ+QihmFqbZwjPIR6P42DfF5JLu1ApOCE0gsoUTTFMNzWNR2KY8CmOCoPS4Cs4Cw+lT+KkAACZwQBzvVK0Wmv3IRA8wFsxuWwO+9jm6aTciQAAIfkEBQAADwAsAQABABAAEAAABFHwyflCoJhamydj1fYQBJacSTiS5WS8BnXMB/ZmMwUA3eQ4j92utyguhLwOYokIJntLikCQaTQw0ylFwVVIs4/B4FEoF7BUsZh87qnHPco6EwEAIfkEBQAADwAsAQABABAAEAAABFLwyfkYo5imnfIEwGOMxhMEGAiK5XlSaji5KCxT7yQI3kQQj92u9/sJeZ6D8hBE9pSUwSDjcGCkUspiu4hiH43GA0FGXKeKtGJs7hXehR7m7YkAACH5BAUAAA8ALAEAAQAQABAAAART8Mn5AKCYWpunENX2MAz2feGTrAl1gpMhGyZMydQwdFMQPDodz+cL7jrEn5D38FEajQyBgFFYFZTplFLoFh4Ox+NAPmC6j4V6MTbzEHAEkwLvRAAAIfkEBQAADwAsAQABABAAEAAABFHwyfmEoJham+cY1fYAAPZ94UiW3kmtbJuRVNN0E8M8Sq/giWCiQCzgDEjDg4iTICkORyYQwCyuCwqVSkF4EQ8C4bGtdsFiMdncObgPTYq7EwEAIfkEBQAADwAsAQABABAAEAAABFLwyfnGoJham2dr1fYIAqacSjiS5VS8BcW2boyRlON0EwA8i+CC5/Mhjghi8XHkSXwUAiHDYGCkUkpim6AcvodHIPAwmA2Yr3hMNjvZZOdk3IkAACH5BAUAAA8ALAEAAQAQABAAAARS8Mn5WqOYqq3ydM5TjMUzDNiiLmJ5nhQiI9SLxjQGTwThTQLBo9f7BYOH5MF4fCR/kiAlEMgAABgqlXK9TrUPBuPRxX4fiXSCbPYY3gYo5e2JAAA7';				
	switch(fase){
		case 1:
			alert(fase);
		break;
		case 2:
			if ($gi("GM_updateServVersion")) {
				$sa($gi("GM_updateServVersion"),"style","background-image:url(" + GMupdateLoadingImage + ");background-repeat:no-repeat;background-position:right;");
			}
			if ($gi("GM_updateLastUpdate")) {
				$sa($gi("GM_updateLastUpdate"),"style","background-image:url(" + GMupdateLoadingImage + ");background-repeat:no-repeat;background-position:right;");
			}
			if ($gi("GM_updateNextUpdate")) {
				$sa($gi("GM_updateNextUpdate"),"style","background-image:url(" + GMupdateLoadingImage + ");background-repeat:no-repeat;background-position:right;");
			}
		break;
		case 3:
			if ($gi("GM_updateServVersion")) {
				$sa($gi("GM_updateServVersion"),"style","background-image:");
			}
			if ($gi("GM_updateLastUpdate")) {
				$sa($gi("GM_updateLastUpdate"),"style","background-image:");
			}
			if ($gi("GM_updateNextUpdate")) {
				$sa($gi("GM_updateNextUpdate"),"style","background-image:");
			}
		break;
		case 4: 
			if ($gi("GM_updateThisVersion")) {
				$sa($gi("GM_updateThisVersion"),"value",GM_updateThisVersion);
			}
			if ($gi("GM_updateServVersion")) {
				$sa($gi("GM_updateServVersion"),"value",GM_updateServVersion);
			}
			$today.setTime(US_getValue('GM_updatelastChecked', null));
			var dateLastChecked = $timeDateWords($now - US_getValue('GM_updatelastChecked', null)) + " ago";
			var dateNextCheck = "in " + $timeDateWords(($now - GM_getValue('GMUDoS',null)));
			if ($gi("GM_updateLastUpdate")) {
				$sa($gi("GM_updateLastUpdate"),"value",dateLastChecked);
			}
			if ($gi("GM_updateNextUpdate")) {
				$sa($gi("GM_updateNextUpdate"),"value",dateNextCheck);
			}
		break;
	}
}


//*** COMMAND OPTIONS ***//
/** cmd DOM:
	0: document.body
	|-- 1.1: cmdOverlayGray
	`-- 1.2: cmdOverlayTransP
	    `-- 2: cmdShadow
	        `-- 3: cmdCommand
	            |-- 4.1: cmdHeader
	            |   |-- 5.1.1: title
	            |   `-- 5.1.2: close
	            |-- 4.2: cmdContent
	            |   `-- 5.2: table
	            `-- 4.3: cmdFooter
	                |-- 5.3.1: confirm button
	                |-- 5.3.2: preview button
	                |-- 5.3.3: cancel button
	                |-- 5.3.4: update button
	                `-- 5.3.5: cmdUpdater
	                    `-- 6.1: table
End **/
var cmdHeaderBGImageLeft = 'data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAVCAYAAACDp1Q5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAGpJREFUKFNj1PJd\/Z8BBoyS9v5v2XAfjBlgnPx1rxCczGUvEJyURUgycXOeImRQOGFTkUyzbbqMUGZRdR7Bsaw6g+BYV55AcBzKjyE4Tsgc94qjCBnfKlycoBokmbB6JE5UC5I9AbXn\/gMAn5KjVIRnVzoAAAAASUVORK5CYIIA';
var cmdHeaderBGImageCenter = 'data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAVCAYAAACDp1Q5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAIVJREFUKFNVx6EKwgAARdHn1whDQZkoJqPJOpCFlRUtKxax7h8EwTSwCKIgYjCIwWSwmDWJ7Ceu6YVdOOHWgtEWuXz\/xpTtSkzTzQ9TWpSYkvUXq854+cE0yF+Y+osnpt78gakzu2PqZjdM4eSKKUwvmNrJGatOKz5hakYHTI3oiKk+XGF\/6kSayftvVKIAAAAASUVORK5CYIIA';
var cmdHeaderBGImageRightNormal = 'data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAVCAYAAABG1c6oAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAe5JREFUOE+tkltLG0EAhfW\/CKYaxXppFS1tfdGXgAhubAJaRB+02rRYWo1CQfOg+Oaltl6aoiCSQHQllD4oSEpV8ArFBHxRvLWkP+J0zoTJrrqYh83Ax87MnvPNwG5ugSuMnGyOwOopskVp2wZyfJEksgEvJYVdS39hl07hSAvbF5OwzULSELbOX4O80f9BG96Hq\/dnRphjXnVb5q7uChl6P5vA11jyXubEe+aYtxS+mD4D4c3Go1cYjl5nZDx6KfOqq02l\/hT5UZ4GjkHc3dsY1S\/wdvkCanCuMO8xx7zqPhn6bQirBo5AeOJtISXmA9SaOeZVt9J\/aAgf9++BuHpjGIqcoyOYwmqod8wxr7pV\/j1DWP5uC+T5qzC6gyeoH4kLjiXmofb47BG52p6w7JHq\/h1D+MgXAyl5uQDftwRqBnckVqNa7BNfMIFSkVfdZx+2DGFZ5yZIRZMhNMtuy7mmkHnVrb0hbF9HmcDh+YwvG2doG9tO+zhXqE2umWOePVLX98u44cPWHyAOz7QMjoTiGUkJP8kecfkthMXeFbye2EVk909GmGPeUlji\/Q7ibNJRqIXg8E4IJtM8EHNi3nM2h2RedRsHTTcs0nTYoditQ\/toEjq1KOxQpK3BEzD9h\/l1M7BDXkMIDQMH6a\/8H4GOWyPBiTg7AAAAAElFTkSuQmCCAA==';
var cmdHeaderBGImageRightOver = 'data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAVCAYAAABG1c6oAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAotJREFUOE+tkt9LU2EYx+2ym6Cr6KLoQshKZzqpJCKbkd6MJNiRNlAMoXSOFRa6Hzpdy5kmhKkDMxNXoxyFC20liWKmBeZiYdNKbat0beG\/8G3PE2dnI6GLeeDDznve7\/ezh\/ecbQeVbqRt5WUbXsVWkXthHGn6pxFsBTQUC6tdYaRKVcwRF1Y6I0iZwYgkLL+3BuKyJwrh+nsoa1\/\/F8pRXuyW9f38V0ihnpYHCLQZmRVHK344u7Hu7sOay4FQbxtW2w1Mr93Jf76p8LzjGwiabNHeCn+1AK++DLMmLfytdQjcbsSnNgP85ireI5btds6LXaH775fCL+WkbQFEac0sC30qBcTLbzJi0dqEQIMp\/synKmQh5cXuCetHSZhv+gCCJ+xoxLuz+fEy3cy3XEta0\/7nDjPnxe4xo08SHjXMgVDWTmExdnYzZ7IxJkhTJtqmShW8v3TTwHmxm2+ck4R5V2dAnNK6sWDRYTx9B57k7sVowaGkybyFMnjle3g\/0FgDhc7NPeK44a0kPKKfApFT4YydlRbT+7ZjWLY7SSYuxrJ38f5SQzXkFYPcIwrqZiShvGoSxAFNP7406+HP3Jkk85WfTlrT\/tdmHefFriJJWPkK8hh5qgEErc0IFmfFBctXLiFYr0Ow9mL8WbBYhpDVwnnqEUX1b6QJc8pfgMhQO1i4YtMzoU4LwvdvIfKwE9GBdvzqakD4hpYhYYa6h3uE0riJMFPlgd3yCN+H+pn10SFEJ0awMf0SG5Mj+O19jKj7LtPe5ALlNxUe1jwHQQEiQ3MnRlfCb1fsvGgtIWbF7jlzwoRZggepICv1QLAkCDOFEaRClvAMalvCd7i\/qBepkF4yhBLTfPwt\/wHTYkF8MS26XgAAAABJRU5ErkJgggA=';
var cmdHeaderBGImageRightDown = 'data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAVCAYAAABG1c6oAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAgRJREFUOE+tkt1LU3EcxvUfCBIhShcohSlTqpNviGy9zOOg0dB1oqVTY+ILyrwI0iklMSjqRiMpR94UvRrRIqKLghAULyQD8dpuklh\/xON5fvI952gTg7PBh+2c7\/N8+PL7rbAqNI+CfH5SHzaQL05f\/4aCxPss8gGXUsLBl3\/glgHTYQnjz7NwzbOsLeya2wQZyfxFQ\/sMDh65iKKSEIqPhlHsuWRjPvN9kTlnjnnpxp7+\/lfIUGvFWUzW1u5L0Mwxn1N49fEvkOPaKKYCAcxFIvvCXGnlsOoRY2b7n6IuxZdaB6EwHYjgkR7ERvquYvZCu4W84\/zJ+TYllG7znTVb2Dj+E+RQ3QimW1pw3+ezhJTken6o6zjgjaseaUiu2sL6sRUQCh\/4\/bilaQrZyPktM+YolG5jcsUWnrmxBEIhL6Tf47FwypzvmaNQuk1jy7awLrEAQiE3kGKuDWXGHIXS9d9csoXawHcQp3D3ZrufRSjdczuE8a\/QTHjLqZpm9JV4rPNLHD4BQaScM8dbZo\/oo4v2hqe6voDIGQ6Xl2OorGxPOJczlG4ouYcw1tqLF9EoXnV04E0shvnubrzr6VHw9+vOTjVnjmeYU3jy2mcQ7+UMSoP3\/hvmpds24diw2sjADTVXMjBuO4Re4xPcUG18RDTl+B9W6Gm44Vj4LcLjP6xb3gLn+MRxaDWcvwAAAABJRU5ErkJgggA=';

var cmdConfirmImage='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGrSURBVDjLvZPZLkNhFIV75zjvYm7VGFNCqoZUJ+roKUUpjRuqp61Wq0NKDMelGGqOxBSUIBKXWtWGZxAvobr8lWjChRgSF//dv9be+9trCwAI/vIE/26gXmviW5bqnb8yUK028qZjPfoPWEj4Ku5HBspgAz941IXZeze8N1bottSo8BTZviVWrEh546EO03EXpuJOdG63otJbjBKHkEp/Ml6yNYYzpuezWL4s5VMtT8acCMQcb5XL3eJE8VgBlR7BeMGW9Z4yT9y1CeyucuhdTGDxfftaBO7G4L+zg91UocxVmCiy51NpiP3n2treUPujL8xhOjYOzZYsQWANyRYlU4Y9Br6oHd5bDh0bCpSOixJiWx71YY09J5pM/WEbzFcDmHvwwBu2wnikg+lEj4mwBe5bC5h1OUqcwpdC60dxegRmR06TyjCF9G9z+qM2uCJmuMJmaNZaUrCSIi6X+jJIBBYtW5Cge7cd7sgoHDfDaAvKQGAlRZYc6ltJlMxX03UzlaRlBdQrzSCwksLRbOpHUSb7pcsnxCCwngvM2Rm/ugUCi84fycr4l2t8Bb6iqTxSCgNIAAAAAElFTkSuQmCCAA==';
var cmdPreviewImage='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG9SURBVBgZpcG/S9RxHMfx5/f8fPXyrMyOhGgoWrLJ4m6Ii2hrCyRwiKa2fg06aKNjLRVHQkNEtOnQUNReg5RLBJHUEhe4iEiUnj8+3/f7lR/j/gDz8cgksRfZyNjMrfMXa/dX2qpIgDtyx9yQC5cjM1xCZpg7B7rj2sLC4uTLB6PTodaoNfNypTRYZjcqa21rAtOhHVVqr6yyW+tRJbYFmRi71M9u3X3aIgmSk8zPz/Oi5yg9eZnBrpOYZxQOheDaoSec7W/xe2uAua+naTQamBtJQKKj6H3Ot83v7IunGOoap6xjRIe3v67yc+MdR0pLZFlG4oWRBHOjoy9b50Q50Nf9heg3iXEIbZ3h8+ow75cv4JvGxP6PJG5OEuSiozbQQ54fpxIOYtrgjy2xaa8Rb3BEXM/JWldI3I0kuBtJvV6nTp3E3emQRIcqQodF4u4koYiRarWKxA7xjwSSSCQQYA5ZBuU8o4gFSZA5yfVXyyTPLldZ/TRK0js8w725KZLJc1PkE3fY8egxcmfH7eYH/Y+R8RltIyz+aM3eeBhH3Qw3x8xwdyxG3B2XkBsy4XLkjjvJLNsySexFiT36C4QDM7+0SJboAAAAAElFTkSuQmCCAA==';
var cmdCancelImage='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJgggA=';
var cmdUpdateImage='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIsSURBVDjLpVNLSJQBEP7+h6uu62vLVAJDW1KQTMrINQ1vPQzq1GOpa9EppGOHLh0kCEKL7JBEhVCHihAsESyJiE4FWShGRmauu7KYiv6Pma+DGoFrBQ7MzGFmPr5vmDFIYj1mr1WYfrHPovA9VVOqbC7e/1rS9ZlrAVDYHig5WB0oPtBI0TNrUiC5yhP9jeF4X8NPcWfopoY48XT39PjjXeF0vWkZqOjd7LJYrmGasHPCCJbHwhS9/F8M4s8baid764Xi0Ilfp5voorpJfn2wwx/r3l77TwZUvR+qajXVn8PnvocYfXYH6k2ioOaCpaIdf11ivDcayyiMVudsOYqFb60gARJYHG9DbqQFmSVNjaO3K2NpAeK90ZCqtgcrjkP9aUCXp0moetDFEeRXnYCKXhm+uTW0CkBFu4JlxzZkFlbASz4CQGQVBFeEwZm8geyiMuRVntzsL3oXV+YMkvjRsydC1U+lhwZsWXgHb+oWVAEzIwvzyVlk5igsi7DymmHlHsFQR50rjl+981Jy1Fw6Gu0ObTtnU+cgs28AKgDiy+Awpj5OACBAhZ/qh2HOo6i+NeA73jUAML4/qWux8mt6NjW1w599CS9xb0mSEqQBEDAtwqALUmBaG5FV3oYPnTHMjAwetlWksyByaukxQg2wQ9FlccaK/OXA3/uAEUDp3rNIDQ1ctSk6kHh1/jRFoaL4M4snEMeD73gQx4M4PsT1IZ5AfYH68tZY7zv/ApRMY9mnuVMvAAAAAElFTkSuQmCCAA==';

var cmdTextImage='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADMSURBVDjLY/z//z8DJYCJgUKAYUBE+440IHYh1gAWLGIzgXgPFINBVFTU/1+/fjH8/v2bAUSD8N69exlBcozIYQCyHUgZAzGIdl1R6bGHVBeEAjW5Qr1QDnOFj4/Pf5jNMHzmzBlUFwA1hQIpkMZ7QKxErCtYoJqVoDaGATXcg/JBBnQAsYmdnR2GC27duoUZBuQAeBhERkZi2IKOYbEAop8/f05lF3h7e/8nZDsy/vz5M5VdYGtr+//nz59Y/QvDf/78QcbUcQHFuREAOJ3Rs6CmnfsAAAAASUVORK5CYIIA';
var cmdColorImage='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABjSURBVDjLY/j//z8DJZiBagb8y8/+D8NgsVXF/+EYyP9wNf0/DA9SAygOgwuvN/2HYRA/4EzufxgG8RM2vP4Pw4PUAIrDIKJqw38YBvFvzr77H4bBaso3/ofjwWnAwGcmcjEAc0v+JGPFQvwAAAAASUVORK5CYIIA';
function GM_userCommands() {
	if (!$gi("cmdOverlayGray") || !$gi("cmdOverlayTransP")) {
		commandHeight = 300;
		commandWidth  = 550;
		commandTop = Math.min(($meaSureMentWindow('h') - commandHeight)/2);
		commandLeft = Math.min(($meaSureMentWindow('w') - commandWidth)/2);

		var cmdOverlayGray = $ce("DIV");
		$sa(cmdOverlayGray,"id","cmdOverlayGray");
		$sa(cmdOverlayGray,"style",$setReturnOpacity(70) + "visibility:visible;background-color:#000;display:block;position:fixed;height:100%;width:100%;top:0px;left:0px;z-index:9992");

		var cmdOverlayTransP = $ce("DIV");
		$sa(cmdOverlayTransP,"id","cmdOverlayTransP");
		$sa(cmdOverlayTransP,"style",$setReturnOpacity(100) + "visibility:visible;display:block;position:fixed; /*height:" + commandHeight + "px;*/ width:" + commandWidth + "px;top:" + commandTop + "px;left:" + commandLeft + "px;z-index:9993");

		var cmdShadow = $ce("DIV");
		$sa(cmdShadow,"id","cmdShadow");
		$sa(cmdShadow,"style","background-color:#333333;position:relative;width:100%;top:5px;left:5px;z-index:9994");

		var cmdCommand = $ce("DIV");
		$sa(cmdCommand,"id","cmdCommand");
		$sa(cmdCommand,"style",$setReturnOpacity(90) + "border:1px solid gray;background-color:#fff;padding:5px;position:relative;left:-5px;top:-5px;display:block;z-index:9995");

		var cmdHeader = $ce("DIV");
		$sa(cmdHeader,"id","cmdHeader");
		$sa(cmdHeader,"style","line-height:20px;font-family:sans-serif;font-size:10pt;color:#FFFFFF;font-weight:bold;vertical-align:center;background-color:#fff;background:url(" + cmdHeaderBGImageCenter + ");background-repeat:repeat-x;position:relative;height:21px;width:100%;top:0px;left:0px;z-index:9996");

		var cmdContent = $ce("DIV");
		$sa(cmdContent,"id","cmdContent");
		$sa(cmdContent,"style","background-color:#fff;position:relative;width:100%;bottom:0px;left:0px;z-index:9996");

		var cmdFooter = $ce("DIV");
		$sa(cmdFooter,"id","cmdFooter");
		$sa(cmdFooter,"style","background-color:#fff;position:relative;/*height:20px;*/width:100%;bottom:0px;left:0px;text-align:center;margin-top:4px;z-index:9996");

		var cmdUpdater = $ce("DIV");
		$sa(cmdUpdater,"id","cmdUpdater");
		$sa(cmdUpdater,"style","/*visibility:hidden;display:none;position:relative;*/background-color:#fff;width:100%;bottom:0px;left:0px;text-align:center;margin-top:4px;z-index:9997");

		var cmdHeaderRight = $ce("A");
		$sa(cmdHeaderRight,"id","cmdHeaderRight");
		$sa(cmdHeaderRight,"href","#");
		$sa(cmdHeaderRight,"title",language.CMD.closeTip);
		$sa(cmdHeaderRight,"style","float:right;width:20px;height:100%;background:url(" + cmdHeaderBGImageRightNormal + ");background-repeat:no-repeat;background-position:right;z-index:9997");

		var cmdHeaderLeft = $ce("DIV");
		$sa(cmdHeaderLeft,"style","float:left;width:5px;height:100%;background:url(" + cmdHeaderBGImageLeft + ");background-repeat:no-repeat;background-position: left;z-index:9997;");

		var cmdFooterC = $ce("SPAN");
		$sa(cmdFooterC,"id","cmdFooterC");
		$sa(cmdFooterC,"title","\u00a9"+" "+"\u004a"+"\u0065"+"\u0072"+"\u006f"+"\u006e"+"\u0065");
		$sa(cmdFooterC,"style","position:absolute;right:-4px;top:4px;font-size:8pt;text-align:right;z-index:9998");

		var cmdHeaderTitleText = $ct(language.CMD.title);
		var cmdFooterCText = ("\u00a9"+" "+"\u004a"+"\u0065"+"\u0072"+"\u006f"+"\u006e"+"\u0065");

		switch(CMDtableColor.toLowerCase()){
			case "blue":
				$addCSS("table.commandTable{width:100%;padding:5px;background-color:#3399FF;border:1px solid #0066CC;font-family:Arial, Helvetica, sans-serif;font-size:10pt;color:#000000;text-align:left;}.commandTable tr{border-color:#3399FF;}.commandTable td{border:1px;font-family:Arial,Helvetica,sans-serif;font-size:10pt;text-align:left;height:24px;border:solid;empty-cells:show;border-color:inherit;border-left-style:none;border-right-style:none;border-width:2px;padding:1px 3px;}.commandTable tr:hover{background-color:#0066CC;color:#FFFFFF;}.commandTable td:hover{border-bottom:2px solid blue;border-top:2px solid blue;}.commandTable td.commandValue{width:153px;}.commandTable .commandButton,.commandTable input.commandInput,.commandTable select.commandInput,.commandTable option.commandInput{text-indent:3px;height:17px;width:146px;background-color:#3399FF;border:1px solid #0066CC;}.commandTable select.commandInput{height:19px;width:148px;text-indent:0px;}.commandTable .commandButton{width:148px;height:21px;margin:0px;}.commandButton{background-color:#3399FF;border:1px solid #0066CC;height:21px;text-indent:0px;margin:0px 2px;width:110px;text-align:center;cursor:pointer;}.commandButton:hover,.commandTable tr:hover input.commandInput,.commandTable tr:hover select.commandInput{background-color:#0066CC;border:1px solid #3399FF;color:#FFFFFF;}.commandTable tr.commandTableHead{font-weight:bold;border-bottom:2px solid #0066CC;}.commandTable tr.commandTableHead:hover{border-bottom:2px solid blue;border-top:2px solid #3399FF;}.commandTable .commandTableHead td:hover{border-bottom:2px solid blue;border-top: 2px solid #3399FF;}");
			break;
			case "red":
				$addCSS("table.commandTable{width:100%;padding:5px;background-color:#FFDFDF;border:1px solid #FF4C4C;font-family:Arial, Helvetica, sans-serif;font-size:10pt;color:#000000;text-align:left;}.commandTable tr{border-color:#FFDFDF;}.commandTable td{border:1px;font-family:Arial,Helvetica,sans-serif;font-size:10pt;text-align:left;height:24px;border:solid;empty-cells:show;border-color:inherit;border-left-style:none;border-right-style:none;border-width:2px;padding:1px 3px;}.commandTable tr:hover{background-color:#FF4C4C;color:#FFFFFF;}.commandTable td:hover{border-bottom:2px solid Red;border-top:2px solid Red;}.commandTable td.commandValue{width:153px;}.commandTable .commandButton,.commandTable input.commandInput,.commandTable select.commandInput,.commandTable option.commandInput{text-indent:3px;height:17px;width:146px;background-color:#FFDFDF;border:1px solid #FF4C4C;}.commandTable select.commandInput{height:19px;width:148px;text-indent:0px;}.commandTable .commandButton{width:148px;height:21px;margin:0px;}.commandButton{background-color:#FFDFDF;border:1px solid #FF4C4C;height:21px;text-indent:0px;margin:0px 2px;width:110px;text-align:center;cursor:pointer;}.commandButton:hover,.commandTable tr:hover input.commandInput,.commandTable tr:hover select.commandInput{background-color:#FF4C4C;border:1px solid #FFDFDF;color:#FFFFFF;}.commandTable tr.commandTableHead{font-weight:bold;border-bottom:2px solid #FF4C4C;}.commandTable tr.commandTableHead:hover{border-bottom:2px solid Red;border-top:2px solid #FFDFDF;}.commandTable .commandTableHead td:hover{border-bottom:2px solid Red;border-top:2px solid #FFDFDF;}");
			break;
			case "yellow":
				$addCSS("table.commandTable{width:100%;padding:5px;background-color:#FFFFCC;border:1px solid #FFCC33;font-family:Arial, Helvetica, sans-serif;font-size:10pt;color:#000000;text-align:left;}.commandTable tr{border-color:#FFFFCC;}.commandTable td{border:1px;font-family:Arial,Helvetica,sans-serif;font-size:10pt;text-align:left;height:24px;border:solid;empty-cells:show;border-color:inherit;border-left-style:none;border-right-style:none;border-width:2px;padding:1px 3px;}.commandTable tr:hover{background-color:#FFFF66;color:#000000;}.commandTable td:hover{border-bottom:2px solid #FFCC00;border-top:2px solid #FFCC00;}.commandTable td.commandValue{width:153px;}.commandTable .commandButton,.commandTable input.commandInput,.commandTable select.commandInput,.commandTable option.commandInput{text-indent:3px;height:17px;width:146px;background-color:#FFFFCC;border:1px solid #FFCC33;}.commandTable select.commandInput{height:19px;width:148px;text-indent:0px;}.commandTable .commandButton{width:148px;height:21px;margin:0px;}.commandButton{background-color:#FFFFCC;border:1px solid #FFCC33;height:21px;text-indent:0px;margin:0px 2px;width:110px;text-align:center;cursor:pointer;}.commandButton:hover,.commandTable tr:hover input.commandInput,.commandTable tr:hover select.commandInput{background-color:#FFFF66;border:1px solid #FFCC00;color:#000000;}.commandTable tr.commandTableHead{font-weight:bold;border-bottom:2px solid #FFCC66;}.commandTable tr.commandTableHead:hover{border-bottom:2px solid #FFCC00;border-top:2px solid #FFFFCC;}.commandTable .commandTableHead td:hover{border-bottom:2px solid #FFCC00;border-top:2px solid #FFFFCC;}");
			break;
			case "green":
				$addCSS("table.commandTable{width:100%;padding:5px;background-color:#90EE90;border:1px solid #00FF00;font-family:Arial,Helvetica,sans-serif;font-size:10pt;color:#000000;text-align:left;}.commandTable tr{border-color:#90EE90;}.commandTable td{border:1px;font-family:Arial,Helvetica,sans-serif;font-size:10pt;text-align:left;height:24px;border:solid;empty-cells:show;border-color:inherit;border-left-style:none;border-right-style:none;border-width:2px;padding:1px 3px;}.commandTable tr:hover{background-color:#00FF00;color:#FFFFFF;}.commandTable td:hover{border-bottom:2px solid Green;border-top:2px solid Green;}.commandTable td.commandValue{width:153px;}.commandTable .commandButton,.commandTable input.commandInput,.commandTable select.commandInput,.commandTable option.commandInput{text-indent:3px;height:17px;width:146px;background-color:#90EE90;border:1px solid #00FF00;}.commandTable select.commandInput{height:19px;width:148px;text-indent:0px;}.commandTable .commandButton{width:148px;height:21px;margin:0px;}.commandButton{background-color:#90EE90;border:1px solid #00FF00;height:21px;text-indent:0px;margin:0px 2px;width:110px;text-align:center;cursor:pointer;}.commandButton:hover,.commandTable tr:hover input.commandInput,.commandTable tr:hover select.commandInput{background-color:#00FF00;border:1px solid #90EE90;color:#FFFFFF;}.commandTable tr.commandTableHead{font-weight:bold;border-bottom:2px solid #00FF00;}.commandTable tr.commandTableHead:hover{border-bottom:2px solid Green;border-top:2px solid #90EE90;}.commandTable .commandTableHead td:hover{border-bottom:2px solid Green;border-top:2px solid #90EE90;}");
			break;
			default:
				$addCSS("table.commandTable{width:100%;padding:5px;background-color:#3399FF;border:1px solid #0066CC;font-family:Arial, Helvetica, sans-serif;font-size:10pt;color:#000000;text-align:left;}.commandTable tr{border-color:#3399FF;}.commandTable td{border:1px;font-family:Arial,Helvetica,sans-serif;font-size:10pt;text-align:left;height:24px;border:solid;empty-cells:show;border-color:inherit;border-left-style:none;border-right-style:none;border-width:2px;padding:1px 3px;}.commandTable tr:hover{background-color:#0066CC;color:#FFFFFF;}.commandTable td:hover{border-bottom:2px solid blue;border-top:2px solid blue;}.commandTable td.commandValue{width:153px;}.commandTable .commandButton,.commandTable input.commandInput,.commandTable select.commandInput,.commandTable option.commandInput{text-indent:3px;height:17px;width:146px;background-color:#3399FF;border:1px solid #0066CC;}.commandTable select.commandInput{height:19px;width:148px;text-indent:0px;}.commandTable .commandButton{width:148px;height:21px;margin:0px;}.commandButton{background-color:#3399FF;border:1px solid #0066CC;height:21px;text-indent:0px;margin:0px 2px;width:110px;text-align:center;cursor:pointer;}.commandButton:hover,.commandTable tr:hover input.commandInput,.commandTable tr:hover select.commandInput{background-color:#0066CC;border:1px solid #3399FF;color:#FFFFFF;}.commandTable tr.commandTableHead{font-weight:bold;border-bottom:2px solid #0066CC;}.commandTable tr.commandTableHead:hover{border-bottom:2px solid blue;border-top:2px solid #3399FF;}.commandTable .commandTableHead td:hover{border-bottom:2px solid blue;border-top: 2px solid #3399FF;}");
			break;
		};

var tableHTML = '<table cellpadding="0" cellspacing="0" class="commandTable"><tr class="commandTableHead">' +
					'<td>'+language.CMD.setting+':</td>				<td class="commandValue">'+language.CMD.value+':</td><td>Input:</td><td>'+language.CMD.default+':</td></tr>' +
				'<tr><td>'+language.CMD.visible+':</td><td>			<input id="UIBvisibleID" class="" type="checkbox"' + (UIB.visibleGet==true?"checked=\'checked\' ":"") + ' /></td><td>'+language.CMD.show+'<input name="" type="checkbox" value="" checked="checked" /> || '+language.CMD.hide+'<input name="" type="checkbox" value="" /></td><td>' + (UIB.visibleDefault==true?language.CMD.show:language.CMD.hide) + '</td></tr>' +
				'<tr><td>'+language.CMD.borderColor+':</td><td>		<input id="UIBborderColor" class="commandInput" name="color" value="' + UIB.bordercolorGet + '" ' + '/></td><td>black || #000000</td><td>' + UIB.bordercolorDefault + '</td></tr>' +
				'<tr><td>'+language.CMD.backgroundColor+':</td><td>	<input id="UIBbackgColor" class="commandInput" name="color" value="' + UIB.backgcolorGet + '"/></td><td>white || #FFFFFF</td><td>' + UIB.backgcolorDefault + '</td></tr>' +
				'<tr><td>'+language.CMD.textColor+':</td><td>		<input id="UIBtextColor" class="commandInput" name="color" value="' + UIB.textcolorGet + '"/></td><td>black || #000000</td><td>' + UIB.textcolorDefault + '</td></tr>' +
				'<tr><td>'+language.CMD.text+':</td><td>			<input id="UIBtextValue" class="commandInput" name="text" value="' + UIB.textvalueGet + '"/></td><td>'+language.CMD.anyTextYouLike+'</td><td>' + UIB.textvalueDefault + '</td></tr>' +
				'<tr><td>'+language.CMD.language+':</td><td>		' + getAllLanguages() + '</td><td>'+language.CMD.selectOne+'</td><td>English</td></tr>' +
				'</table>';

var updateTableHTML ='<table cellspacing="0" cellpadding="0" class="commandTable"><tr>'+
					 '<td>'+language.CMD.thisVersion+':</td><td class="commandValue">	<input id="GM_updateThisVersion" class="commandInput" name="GM_updateThisVersion" value="' + GM_updateThisVersion + '" readonly="true"/></td>'+
					 '<td>'+language.CMD.servVersion+':</td><td class="commandValue">	<input id="GM_updateServVersion" class="commandInput" name="GM_updateServVersion" value="' + GM_updateServVersion + '" readonly="true"/></td></tr><tr>'+
					 '<td>'+language.CMD.lastUpdate+':</td><td>							<input id="GM_updateLastUpdate" class="commandInput" name="GM_updateLastUpdate" value="' + dateLastChecked + '" readonly="true"/></td>'+
					 '<td>'+language.CMD.nextUpdate+':</td><td>							<input id="GM_updateNextUpdate" class="commandInput" name="GM_updateNextUpdate" value="' + dateNextCheck + '" readonly="true"/></td></tr>'+
					 '</table>';

var confirmHTML = '<input id="confirmButton" class="commandButton" type="submit" name="'+language.CMD.submit+'" value="'+language.CMD.submit+'" title="'+language.CMD.submit+'" />';
var previewHTML = '<input id="previewButton" class="commandButton" type="submit" name="'+language.CMD.preview+'" value="'+language.CMD.preview+'" title="'+language.CMD.preview+'" />';
var cancelHTML  = '<input id="cancelButton" class="commandButton" type="submit" name="'+language.CMD.cancel+'" value="'+language.CMD.cancel+'" title="'+language.CMD.cancel+'" />';
var updateHTML  = '<input id="updateButton" class="commandButton" type="submit" name="'+language.CMD.updater+'" value="'+language.CMD.updater+'" title="'+language.CMD.updater+'" />';

		// inject in DOM in this order
		$ac($d.body,cmdOverlayGray);
			$addEvent($gi("cmdOverlayGray"),"dblclick",closeCommand);
		$ac($d.body,cmdOverlayTransP);
			$ac(cmdOverlayTransP,cmdShadow);
				$ac(cmdShadow,cmdCommand);
					$ac(cmdCommand,cmdHeader);
						$ac(cmdHeader,cmdHeaderLeft);
						$ac(cmdHeader,cmdHeaderRight);
							$addEvent($gi("cmdHeaderRight"),"mouseover",closeCommandOver);
							$addEvent($gi("cmdHeaderRight"),"mouseout",closeCommandOut);
							$addEvent($gi("cmdHeaderRight"),"mousedown",closeCommandDown);
							$addEvent($gi("cmdHeaderRight"),"click",closeCommand);
						$ac(cmdHeader,cmdHeaderTitleText);
					$ac(cmdCommand,cmdContent);
						$ih($gi("cmdContent"),tableHTML);
							$addEvent($gi("UIBvisibleID"),"click",disableCommandSettings);
							$addEvent($gi("UIBlangSelect"),"change",function(){languageS.init($gi("UIBlangSelect").value)});
							$sa($gi("UIBborderColor"),"style","background-image:url(" + cmdColorImage + ");background-repeat:no-repeat;background-position:right;");
							$sa($gi("UIBbackgColor"),"style","background-image:url(" + cmdColorImage + ");background-repeat:no-repeat;background-position:right;");
							$sa($gi("UIBtextColor"),"style","background-image:url(" + cmdColorImage + ");background-repeat:no-repeat;background-position:right;");
							$sa($gi("UIBtextValue"),"style","background-image:url(" + cmdTextImage + ");background-repeat:no-repeat;background-position:right;");
							var colorField2 = new Array ($gi("UIBborderColor"),$gi("UIBbackgColor"),$gi("UIBtextColor"),$gi("UIBtextValue"));
							for(var f=0; f < colorField2.length; f++) {
								$addEvent(colorField2[f],"keypress",function(){$sa(this,"style","background-image:" + $getStyle(this,"background-image") + ";background-repeat:no-repeat;background-position:right;" + "border-color: ;");});
							}
					$ac(cmdCommand,cmdFooter);
						$ih($gi("cmdFooter"),$gi("cmdFooter").innerHTML + confirmHTML + previewHTML + cancelHTML + updateHTML);
							$addEvent($gi("confirmButton"),"click",setCommandSettings);
							$addEvent($gi("previewButton"),"click",previewCommandSettings);
							$addEvent($gi("cancelButton"),"click",cancelCommandSettings);
							$addEvent($gi("updateButton"),"click",function(){updateToggle('click');});
							$addEvent($gi("updateButton"),"mouseover",function(){updateToggle('over');});
							$addEvent($gi("updateButton"),"mouseout",function(){updateToggle('out');});
							$sa($gi("confirmButton"),"style","background-image:url(" + cmdConfirmImage + ");background-repeat:no-repeat;background-position:2px;");
							$sa($gi("previewButton"),"style","background-image:url(" + cmdPreviewImage + ");background-repeat:no-repeat;background-position:2px;");
							$sa($gi("cancelButton"),"style","background-image:url(" + cmdCancelImage + ");background-repeat:no-repeat;background-position:2px;");
							$sa($gi("updateButton"),"style","background-image:url(" + cmdUpdateImage + ");background-repeat:no-repeat;background-position:2px;");
						$ac(cmdFooter,cmdFooterC);
							$ih(cmdFooterC,cmdFooterCText);
						$ac(cmdFooter,cmdUpdater);
							$ih(cmdUpdater,updateTableHTML);

		disableCommandSettings();	
		if(CMDshowUpdaterDefault){
			updateToggle('beginDown');
		}
		else {
			updateToggle('beginUp');
		}
		var id1 = $gi("cmdOverlayTransP");
		var id2 = $gi("cmdOverlayGray");
		var idOpac1 = id1.style.opacity*100;
		var idOpac2 = id2.style.opacity*100;
		$hs(id1,1);
		$hs(id2,1);
		$opacityFadeIn(id1,idOpac1,100,100,15);
		$opacityFadeIn(id2,idOpac2,70,100,5);
	}
	else if ($hs($gi("cmdOverlayTransP"),2,true) || $hs($gi("cmdOverlayGray"),2,true)) {
		var id1 = $gi("cmdOverlayTransP");
		var id2 = $gi("cmdOverlayGray");
		var idOpac1 = id1.style.opacity*100;
		var idOpac2 = id2.style.opacity*100;
		$hs(id1,1);
		$hs(id2,1);
		$opacityFadeIn(id1,idOpac1,100,100,15);
		$opacityFadeIn(id2,idOpac2,70,100,5);

		if ($gi("UIBvisibleID").checked){
			var colorField = new Array ($gi("UIBborderColor"), $gi("UIBbackgColor"), $gi("UIBtextColor"), $gi("UIBtextValue"));
			for(var j=0; j < colorField.length; j++) {
				$sa(colorField[j],"style","background-image:" + $getStyle(colorField[j],"background-image") + ";background-repeat:no-repeat;background-position:right;" + "border-color: ;");
			}	
		}
	}
	else $alert('c',4,'CMD01',"You can't open more than one command options");
}

function disableCommandSettings() {
	$gi("UIBvisibleID").checked==false?$gi("UIBborderColor").disabled=true:$gi("UIBborderColor").disabled=false;
	$gi("UIBvisibleID").checked==false?$sa($gi("UIBborderColor"),"style","border-color:#9b9b9b;"):$sa($gi("UIBborderColor"),"style","background-image:" + $getStyle($gi("UIBborderColor"),"background-image") + ";background-repeat:no-repeat;background-position:right;" + "border-color:;");
	$gi("UIBvisibleID").checked==false?$gi("UIBbackgColor").disabled=true:$gi("UIBbackgColor").disabled=false;
	$gi("UIBvisibleID").checked==false?$sa($gi("UIBbackgColor"),"style","border-color:#9b9b9b;"):$sa($gi("UIBbackgColor"),"style","background-image:" + $getStyle($gi("UIBbackgColor"),"background-image") + ";background-repeat:no-repeat;background-position:right;" + "border-color:;");
	$gi("UIBvisibleID").checked==false?$gi("UIBtextColor").disabled=true:$gi("UIBtextColor").disabled=false;
	$gi("UIBvisibleID").checked==false?$sa($gi("UIBtextColor"),"style","border-color:#9b9b9b;"):$sa($gi("UIBtextColor"),"style","background-image:" + $getStyle($gi("UIBtextColor"),"background-image") + ";background-repeat:no-repeat;background-position:right;" + "border-color:;");
	$gi("UIBvisibleID").checked==false?$gi("UIBtextValue").disabled=true:$gi("UIBtextValue").disabled=false;
	$gi("UIBvisibleID").checked==false?$sa($gi("UIBtextValue"),"style","border-color:#9b9b9b;"):$sa($gi("UIBtextValue"),"style","background-image:" + $getStyle($gi("UIBtextValue"),"background-image") + ";background-repeat:no-repeat;background-position:right;" + "border-color:;");
}
	
function getAllLanguages(){
	var langLocals=languageS.locals; 
	var content = "<SELECT id='UIBlangSelect' class='commandInput' name='UIBlangSelect' >" +
				(function(){
					var result = "";
					for(key in langLocals){
						result += "<OPTION title='" + key + "' value='" + key + "' " + (key==CMDlanguageGet.toLowerCase()?"selected=\'selected\' ":"") + " >" + langLocals[key].common.languageLong + "</OPTION>";
					}
					return result;
				 })() +
			"</SELECT>";
	return content;
}

function closeCommandOver(){
	$gi("cmdHeaderRight").style.background = 'url(' + cmdHeaderBGImageRightOver + ');background-repeat:no-repeat;background-position:right;';
}
function closeCommandOut(){
	$gi("cmdHeaderRight").style.background = 'url(' + cmdHeaderBGImageRightNormal + ');background-repeat:no-repeat;background-position:right;';
}
function closeCommandDown(){
	$gi("cmdHeaderRight").style.background = 'url(' + cmdHeaderBGImageRightDown + ');background-repeat:no-repeat;background-position:right;';
}

var GMupdateButtonArrowUp = 'data:image/png;base64,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';
var GMupdateButtonArrowUpHover = 'data:image/png;base64,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';
var GMupdateButtonArrowDown = 'data:image/png;base64,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';
var GMupdateButtonArrowDownHover = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABJ0lEQVR42uxTPUvDUBQ97yWxffUDbLDqLKKoIHYUpNAhq4hF3ezgz+qgdFIqxTVDoVg6VgMabP6AGkksjfKo+XgOJVCrdekmnunAPfdwuedeIoTAOKAYE3/AQI7J/G5d0EkZlClgUzLSTMHMdL/c9QK43Ad/CxBxH9F7gOerHPliEHm8tLw0d7KdVcEUCpaQwCYkAAD/CMF7Ibgfodly0L59KcV9ZDDGjKafrmxmjneys+j5ApSSvnkkkFAIrluvaBv2ma1rxR93YOta0TLdcsPoIJWkkAggESCVpGgYHVimWx5s/jZBjIW92vnqmnqQ30oDAGo3Lh5M5+Kpmj8c1pJRl7hYqFfWN9R9ALi/cy4fK7nCrykMI+zyI9PyqjEfpSP/v4DPAQA01HOm6g89fgAAAABJRU5ErkJggg==';
function updateToggle(events) {
	switch(events){
		case 'over': // onmouseover
			if ($hs($gi("cmdUpdater"),2,true)) {
				if ($gi("updateButton")) {
					$sa($gi("updateButton"),"style","background-image:url(" + GMupdateButtonArrowDown + ");background-repeat:no-repeat;background-position:right;");
				}
			}
			else if ($hs($gi("cmdUpdater"),1,true)) {
				if ($gi("updateButton")) {
					$sa($gi("updateButton"),"style","background-image:url(" + GMupdateButtonArrowUp + ");background-repeat:no-repeat;background-position:right;");
				}
			}
		break;
		case 'out':  // onmouseout
		default:
			if ($hs($gi("cmdUpdater"),2,true)) {
				if ($gi("updateButton")) {
					$sa($gi("updateButton"),"style","background-image:url(" + GMupdateButtonArrowDownHover + ");background-repeat:no-repeat;background-position:right;");
				}
			}
			else if ($hs($gi("cmdUpdater"),1,true)) {
				if ($gi("updateButton")) {
					$sa($gi("updateButton"),"style","background-image:url(" + GMupdateButtonArrowUpHover + ");background-repeat:no-repeat;background-position:right;");
				}
			}
		break;
		case 'click':  // onclick
			if ($hs($gi("cmdUpdater"),2,true)) {
				$hs($gi("cmdUpdater"),1);
				if ($gi("updateButton")) {
					$sa($gi("updateButton"),"style","background-image:url(" + GMupdateButtonArrowUp + ");background-repeat:no-repeat;background-position:right;");
				}
			}
			else if ($hs($gi("cmdUpdater"),1,true)) {
				$hs($gi("cmdUpdater"),2);
				if ($gi("updateButton")) {
					$sa($gi("updateButton"),"style","background-image:url(" + GMupdateButtonArrowDown + ");background-repeat:no-repeat;background-position:right;");
				}
			}
		break;
		case 'beginDown':  // begin down
			if ($hs($gi("cmdUpdater"),2,true)) {
				$hs($gi("cmdUpdater"),1);
				if ($gi("updateButton")) {
					$sa($gi("updateButton"),"style","background-image:url(" + GMupdateButtonArrowUpHover + ");background-repeat:no-repeat;background-position:right;");
				}
			}
			else {
				$hs($gi("cmdUpdater"),1);
				if ($gi("updateButton")) {
					$sa($gi("updateButton"),"style","background-image:url(" + GMupdateButtonArrowUpHover + ");background-repeat:no-repeat;background-position:right;");
				}
			}
		break;
		case 'beginUp':  // begin up
			if ($hs($gi("cmdUpdater"),1,true)) {
				$hs($gi("cmdUpdater"),2);
				if ($gi("updateButton")) {
					$sa($gi("updateButton"),"style","background-image:url(" + GMupdateButtonArrowDownHover + ");background-repeat:no-repeat;background-position:right;");
				}
			}
			else {
				$hs($gi("cmdUpdater"),2);
				if ($gi("updateButton")) {
					$sa($gi("updateButton"),"style","background-image:url(" + GMupdateButtonArrowDownHover + ");background-repeat:no-repeat;background-position:right;");
				}
			}
		break;
	}
}

function closeCommand(){
	var id = $gi("cmdOverlayTransP");
	var id2 = $gi("cmdOverlayGray");
	var idOpac = id.style.opacity*100;
	var idOpac2 = id2.style.opacity*100;
	$opacityFadeOut(id,idOpac,-1,1,5,'',"$hs(obj,2)");
	$opacityFadeOut(id2,idOpac2,-1,1,15,'',"$hs(obj,2)");
}

function setCommandSettings() {
	if ($gi("UIBvisibleID").checked==true) {
		if (validateColorInput([$gi("UIBborderColor"),$gi("UIBbackgColor"),$gi("UIBtextColor")],[$gi("UIBtextValue")/*,$gi("UIBlangSelect")*/])==true){
			if ($gi("UIBsubmitButton")) {
				var aa = $gi("UIBsubmitButton");
				$sa(aa,"value",$gi("UIBtextValue").value);
				$sa(aa,"style","border:1px solid " + $gi("UIBborderColor").value + ";border-left-style:none;background:" + $gi("UIBbackgColor").value + ";color:" + $gi("UIBtextColor").value + ";margin:0px;padding:1px;")
			}
			else {
				alert('Buton bestaat nog niet, maar wordt aangemaakt zodra u de pagina vernieuwd.');
			}

			UIB.visibleSet 		= US_setValue("visible",($gi("UIBvisibleID").checked==true?true:false));
			UIB.bordercolorSet 	= US_setValue("border-color",$gi("UIBborderColor").value);
			UIB.backgcolorSet 	= US_setValue("background-color",$gi("UIBbackgColor").value);
			UIB.textcolorSet 	= US_setValue("text-color",$gi("UIBtextColor").value);
			UIB.textvalueSet 	= US_setValue("text",$gi("UIBtextValue").value);
			closeCommand();
		}
		else $alert('c',1,'sCS01','validateColorInput([$gi("UIBborderColor"),$gi("UIBbackgColor"),$gi("UIBtextColor")],[$gi("UIBtextValue")/*,$gi("UIBlangSelect")*/])==false');
	}
	else if (!$gi("UIBvisibleID").checked==true) {
		if ($gi("UIBsubmitButton")) {
			$hs($gi("UIBsubmitButton"),2);
		}
		else {
			alert("button bestond al niet");
		}
		UIB.visibleSet = US_setValue("visible",($gi("UIBvisibleID").checked==true?true:false));
		closeCommand();
	}
}

function previewCommandSettings() {
	if ($gi("UIBvisibleID").checked==true) {
		if ($gi("UIBsubmitButton")) {
			if (validateColorInput([$gi("UIBborderColor"),$gi("UIBbackgColor"),$gi("UIBtextColor")],[$gi("UIBtextValue")/*,$gi("UIBlangSelect")*/])==true){
				bb = $gi("UIBsubmitButton");
				$sa(bb,"value",$gi("UIBtextValue").value);
				$sa(bb,"style","border:1px solid " + $gi("UIBborderColor").value + ";border-left-style:none;background:" + $gi("UIBbackgColor").value + ";color:" + $gi("UIBtextColor").value + ";margin:0px;padding:1px;")
			}
			else $alert('c',1,'pCS01','validateColorInput([$gi("UIBborderColor"),$gi("UIBbackgColor"),$gi("UIBtextColor")],[$gi("UIBtextValue")/*,$gi("UIBlangSelect")*/])==false');
		}
		else { 
			alert('buton bestaat nog niet. zet visible aan, submit en refresh pagina');
		}
	}
	else if (!$gi("UIBvisibleID").checked==true) {
		if ($gi("UIBsubmitButton")) {
			$hs($gi("UIBsubmitButton"),2);
		}
		else {
			alert("button bestond al niet");
		}
	}
}

function cancelCommandSettings() {
	closeCommand();

	$gi("UIBvisibleID").checked=UIB.visibleGet;
	$gi("UIBborderColor").value=UIB.bordercolorGet;
	$gi("UIBbackgColor").value=UIB.backgcolorGet;
	$gi("UIBtextColor").value=UIB.textcolorGet;
	$gi("UIBtextValue").value=UIB.textvalueGet;

	if ($gi("UIBsubmitButton")) {
		cc = $gi("UIBsubmitButton");
		$sa(cc,"value",$gi("UIBtextValue").value);
		$sa(cc,"style","border:1px solid " + $gi("UIBborderColor").value + ";border-left-style:none;background:" + $gi("UIBbackgColor").value + ";color:" + $gi("UIBtextColor").value + ";margin:0px;padding:1px;")
	}
}

function firstTimeVisit(){
	alert(	'Thank you for downloading this userscript.\n'+
			'\n'+
			'This is the first time that you use this script,\n'+
			'so a onetime settings field opened automatic.\n'+
			'Here you can make settings for future use.\n'+
			'\n'+
			'If you want to change some settings, go to:\n'+
			' "Tools" >>\n'+
			'  "GreaseMonkey" >>\n'+
			'   "User Script Commands" >>\n'+
			'    "Userscripts.org Input Button Settings".\n'+
			'This will open the settings field again.\n'+
			'\n'+
			'Have fun using it, gr Jerone');
}


/** VALIDATE COLOR **/
function validateColorInput(obj,alternativeObj) {
	var namedColors = new Array('AliceBlue','AntiqueWhite','Aqua','Aquamarine','Azure','Beige','Bisque','Black','BlanchedAlmond','Blue','BlueViolet','Brown','BurlyWood','CadetBlue','Chartreuse','Chocolate','Coral','CornflowerBlue','Cornsilk','Crimson','Cyan','DarkBlue','DarkCyan','DarkGoldenRod','DarkGray','DarkGreen','DarkKhaki','DarkMagenta','DarkOliveGreen','Darkorange','DarkOrchid','DarkRed','DarkSalmon','DarkSeaGreen','DarkSlateBlue','DarkSlateGray','DarkTurquoise','DarkViolet','DeepPink','DeepSkyBlue','DimGray','DodgerBlue','Feldspar','FireBrick','FloralWhite','ForestGreen','Fuchsia','Gainsboro','GhostWhite','Gold','GoldenRod','Gray','Grey','Green','GreenYellow','HoneyDew','HotPink','IndianRed','Indigo','Ivory','Khaki','Lavender','LavenderBlush','LawnGreen','LemonChiffon','LightBlue','LightCoral','LightCyan','LightGoldenRodYellow','LightGrey','LightGreen','LightPink','LightSalmon','LightSeaGreen','LightSkyBlue','LightSlateBlue','LightSlateGray','LightSteelBlue','LightYellow','Lime','LimeGreen','Linen',
								'Magenta','Maroon','MediumAquaMarine','MediumBlue','MediumOrchid','MediumPurple','MediumSeaGreen','MediumSlateBlue','MediumSpringGreen','MediumTurquoise','MediumVioletRed','MidnightBlue','MintCream','MistyRose','Moccasin','NavajoWhite','Navy','OldLace','Olive','OliveDrab','Orange','OrangeRed','Orchid','PaleGoldenRod','PaleGreen','PaleTurquoise','PaleVioletRed','PapayaWhip','PeachPuff','Peru','Pink','Plum','PowderBlue','Purple','Red','RosyBrown','RoyalBlue','SaddleBrown','Salmon','SandyBrown','SeaGreen','SeaShell','Sienna','Silver','SkyBlue','SlateBlue','SlateGray','Snow','SpringGreen','SteelBlue','Tan','Teal','Thistle','Tomato','Turquoise','Violet','VioletRed','Wheat','White','WhiteSmoke','Yellow','YellowGreen',
		/* system colors => */	'ActiveBorder','ActiveCaption','AppWorkspace','Background','ButtonFace','ButtonHighlight','ButtonShadow','ButtonText','CaptionText','GrayText','Highlight','HighlightText','InactiveBorder','InactiveCaption','InactiveCaptionText','InfoBackground','InfoText','Menu','MenuText','Scrollbar','ThreeDDarkShadow','ThreeDFace','ThreeDHighlight','ThreeDLightShadow','ThreeDShadow','Window','WindowFrame','WindowText');
	var colorField = obj;
	var validateColorFalse = new Array();
	var v = 0;
	var spaceRegExp   = /\s+/g;
	var colorRegExp1a = /^#?([a-fA-F0-9]){6,6}\s*$/;	// e.g.: "#123456" / "123456" / "#123abc" / "123abc" / "#abcdef" / "abcdef" ( + hoofdletter ongevoelig)
	var colorRegExp1b = /^#?([a-fA-F0-9]){3,3}\s*$/;	// e.g.: "#123" / "123" / "#12a" / "12a" / "#abc" / "abc" ( + hoofdletter ongevoelig)
	var colorRegExp2  = /^([a-zA-Z]){1}/;				// e.g.: "red" / "Red"
	var colorRegExp3  = /^#?([a-fA-F0-9]{1})([a-fA-F0-9]{1})([a-fA-F0-9]{1})\s*$/;

	for(var f=0; f < colorField.length; f++) {
		colorField[f].value = colorField[f].value.replace(spaceRegExp,"");
		if(colorRegExp1a.test(colorField[f].value)) {
			if(colorField[f].value.indexOf("#",0)) {
				colorField[f].value = "#" + colorField[f].value;
				validateColorFalse[v] = f;
				v++;
			}
			else {
				colorField[f].value = colorField[f].value;
				validateColorFalse[v] = f;
				v++;
			}
		}
		else if(colorRegExp1b.test(colorField[f].value)) {
			colorField[f].value = colorField[f].value.replace(colorRegExp3,"$1$1$2$2$3$3");
			if(colorField[f].value.indexOf("#",0)) {
				colorField[f].value = "#" + colorField[f].value;
				validateColorFalse[v] = f;
				v++;
			}
			else {
				colorField[f].value = colorField[f].value;
				validateColorFalse[v] = f;
				v++;
			}
		}
		else if(colorRegExp2.test(colorField[f].value)) {
			if(namedColors.searchArray(colorField[f].value)) {
				colorField[f].value = colorField[f].value.charAt(0).toUpperCase() + colorField[f].value.substring(1,colorField[f].value.length).toLowerCase();
				validateColorFalse[v] = f;
				v++;
			}
			else colorField[f].value = colorField[f].value;
		}
		else {
			colorField[f].value = colorField[f].value;
		}
		
		$sa(colorField[f],"style","background-image:" + $getStyle(colorField[f],"background-image") + ";background-repeat:no-repeat;background-position:right;" + "border-color: red;");
		for(j=0;j<v;j++) {
			$sa(colorField[validateColorFalse[j]],"style","background-image:" + $getStyle(colorField[j],"background-image") + ";background-repeat:no-repeat;background-position:right;" + "border-color: green;");
		}	
	}

	for(var a=0; a < alternativeObj.length; a++) {
		$sa(alternativeObj[a],"style","background-image:" + $getStyle(alternativeObj[a],"background-image") + ";background-repeat:no-repeat;background-position:right;" + "border-color: green;");
	}

	// return false / true
	if((colorField.length - v) > 0) {return false;}
	else return true;
}


/** US_registerMenuCommand **/
if(GM_setValue && GM_getValue && GM_openInTab && GM_addStyle && GM_registerMenuCommand){
	if(US_getValue("beenthere")!=true){GM_userCommands();firstTimeVisit();US_setValue("beenthere",true);}
	US_registerMenuCommand("Userscripts.org Input Button Settings",function(){GM_userCommands()},"u","alt","u");
//	GM_userCommands();
}
else { alert('Please update to the new version of GreaseMonkey, because this script requires the newest features !'); };


// Words: 4.379;
// Karakters (no spaces): 83.154;
// Karakters (with spaces): 89.830;
// Lines: 1048;