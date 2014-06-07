/*//////////////////////////////////////////////////////////////////////////
// ==UserScript===
// @name            US Update
// @author          Jerone UserScript Productions
// @namespace       http://userscripts.org/users/31497
// @homepage        http://jervw.freehostia.com/articles/art006/US_updater.html
// @description     Part 4 of US Framework
// @description     Checks for new script versions.
// @description     US Update v2 Beta
// @copyright       2007 - 2008 Jerone
// @version         v2 Beta
// @versiontext     Cleaned up code a lot, updated versionUrl to userscripts.org api, updated detection and updated update message.
// @browser         FF3
// @include         *
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////
// ToC:
// - Copyrights
// - History
// - Todo
// - Note
// - Usage Instructions
// - Default Settings
// - User Script
// - Framework Check
// - Statistics
////////////////////////////////////////////////////////////////////////////
THIS  SCRIPT  IS  PROVIDED BY THE AUTHOR `AS IS' AND ANY EXPRESS OR IMPLIED
WARRANTIES,  INCLUDING, BUT  NOT  LIMITED  TO, THE  IMPLIED  WARRANTIES  OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO
EVENT  SHALL  THE  AUTHOR  BE  LIABLE  FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;  LOSS OF USE, DATA, OR PROFITS;
OR BUSINESS INTERRUPTION) HOWEVER  CAUSED  AND  ON  ANY THEORY OF LIABILITY,
WHETHER  IN  CONTRACT, STRICT  LIABILITY, OR  TORT  (INCLUDING NEGLIGENCE OR
OTHERWISE)  ARISING  IN  ANY  WAY  OUT  OF  THE  USE OF THIS SCRIPT, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
////////////////////////////////////////////////////////////////////////////
// History:
// [+] = added; [-] = removed; [/] = fixed; [*] = updated;
// - 02-05-2008 15:00 [v1 Alpha]:
//   [+] initial release;
// - 03-05-2008 18:00 [v1.1 Beta]:
//   [*] cleaned up code;
//   [+] added framework check;
//   [/] fixed updating install count;
// - 04-05-2008 18:00 [v1.2 Beta]:
//   [*] cleaned up code;
//   [+] added instructions;
//   [+] added option for only userscripts.org script number;
// - 05-05-2008 13:00 [v1.3 Beta]:
//   [/] fixed bug in not available US Language;
// - 18-05-2008 20:00 [v1.3.1 Beta]:
//   [*] update to latest US Language version;
// - 19-05-2008 14:00 [v1.3.2 Beta]:
//   [/] fixed bug with wrong update url;
// - 30-05-2008 18:00 [v1.4 Beta]:
//   [/] fixed framework check;
// - 02-06-2008 18:00 [v1.5 Beta]:
//   [+] added custom loader;
// - 02-06-2008 19:00 [v1.5.1 Beta]:
//   [/] fixed bug for double run of USU.loader when o.readyState==1;
// - 02-06-2008 23:30 [v1.5.2 Beta]:
//   [*] cleaned up init;
//   [+] added more overrides;
// - 03-06-2008 14:00 [v1.5.3 Beta]:
//   [*] cleaned up code;
//   [/] changed custom loader for more use;
// - 03-06-2008 14:30 [v1.6 Beta]:
//   [+] added function to return all data;
//   [+] added function to return all script names;
// - 08-08-2008 16:00 [v1.6.1 Beta]:
//   [*] cleaned up code;
// - 10-08-2008 12:45 [v1.6.2 Beta]:
//   [*] updated minor function;
// - 16-08-2008 14:30 [v1.6.3 Beta]:
//   [*] updated to latest US Functions version;
//   [+] added real live US Framework versions;
// - 19-08-2008 16:30 [v1.6.4 Beta]:
//   [*] minor changes;
//   [*] updated to latest US Framework versions;
// - 23-09-2008 16:00 [v1.7 Beta]:
//   [/] fixed reset translation;
//   [+] added version comment;
//   [/] fixed check with no version number;
//   [/] fixed check when version number higher then ten;
//   [*] cleaned up code;
// - 21-11-2008 21:30 [v1.7.1 Beta]:
//   [/] fixed small bug in framework check;
//   [/] fixed bug in version check for 10 and higher;
// - 10-01-2009 17:30 [v2 Beta]:
//   [*] updated versionUrl to userscripts.org api;
//   [*] cleaned up code;
//   [*] updated detection;
//   [*] updated update message;
////////////////////////////////////////////////////////////////////////////
// Todo:
// - exclude checks from (i)frames;
// - The about:config preference: network.http.max-persistent-connections-per-server limits the number of connections to 2 by default;
// - option to check manual;
////////////////////////////////////////////////////////////////////////////
// Note:
// - This script is part of a framework:
//   - US Framework => http://userscripts.org/scripts/show/39678
//   - US Functions => http://userscripts.org/scripts/show/16142
//   - US Language => http://userscripts.org/scripts/show/16143
//   - US Options => http://userscripts.org/scripts/show/31458
//   - US Update => http://userscripts.org/scripts/show/16144
/*//////////////////////////////////////////////////////////////////////////



//*** USAGE INSTRUCTIONS ***//
// UPDATE SCRIPT
// This script compares the current version with the new version which is stored somewhere on the web.
// When a new version is available it shows a message if you want to update and opens a link if you approve.
// The update url should be a valid url to the new script itself or it can be the scripts number reflecting the one from Userscripts.org.
// The new scripts version is grabbed from the url
// This script also includes a anti-DoS attack by avoiding a flood of dialogs, caused by multiple pages open or when you visited the site to update to the new version.
// There are also some addons available which are optional, but add some more control over update function.
// Add the following code to your script and fill the correct information in, like below:
//  (please note the special characters and there places, like: ,"'(){}:; etc...)
/*\
	new US.update({
		title:			"This is just a test!!!",			// [String] UserScript name;
		check4Update:	true,								// [Boolean] check for updates;
		updateTime:		1*60*60*1000,						// [Integer MILLISECONDS] time-interval between update check;
		language:		"en",								// [String LANGUAGE SHORT/"browser"] language;
		thisVersion:	"v2.0.3 Beta",						// [String "Integer(.Integer(.Integer(.etc...)))"] this scripts version (all extra content will be removed);
		versionUrl:		12345,								// [Number/String URL] userscripts.org script number or url were new version number is stored;
		updateUrl:		"http://some.site.com",				// [Number/String URL] userscripts.org script number or url to visited for new update;
		addon:{												// [Object] some optional extra addons (optional):
			headers: 		{"User-Agent":"Mozilla/5.0"},		// [Object] use specific HTTP headers;
			mimeType:		"text/html; charset=ISO-8859-1",	// [String] use specific MimeType;
			showLog: 		true,								// [Boolean] show log;
			showVcomment:	true,								// [Boolean] show new versions comment;
			showLoader:		true,								// [Boolean] show loader overlay;
			customLoader:	function(o,USU){}					// [Function] override normal loader ("o" and "USU" are given variable you can use);
		}															// o	[Object] contains onreadystatechange response;
	});																// USU	[Object] contains all scripts data;
\*/
////////////////////////////////////////////////////////////////////////////
// ALL UPDATE SCRIPTS NAMES
// If you want to show all script names that have checked for an update use the following code:
/*\
	new US.update().names();								// returns array of script names;
\*/
// Note: when adding above code, only the earlier executed scripts are returned. 
//       The code can't check scripts that haven't been executed yet;
//       That's why it's recommended to enclose th code in a setTimeout() function;
////////////////////////////////////////////////////////////////////////////
// ALL UPDATE SCRIPTS DATA
// If you want to show all scripts data that have checked for an update use the following code:
/*\
	new US.update().all();									// returns array of both the scripts variablen and the used variablen;
\*/
// Note: when adding above code, only the earlier executed scripts are returned. 
//       The code can't check scripts that haven't been executed yet;
//       That's why it's recommended to enclose th code in a setTimeout() function;
////////////////////////////////////////////////////////////////////////////



//*** DEFAULT SETTINGS ***//
const USUcheck4UpdateDefault = true;
const USUtitleDefault = "this script";
const USUupdateTimeDefault = 1*60*60*1000;  // => 1 hour update interval;
const USUDoSDefault = 2*60*1000;  // => two minutes anti-DoS;
const USUlanguageDefault = "en";
const USUthisVersionDefault = "v0";
const USUheadersDefault = {};
const USUmimeTypeDefault = "";
const USUshowLogDefault = true;
const USUshowVcommentDefault = true;
const USUshowLoaderDefault = true;
const USUcustomLoaderDefault = false;



//*** USER SCRIPT ***//
window.US_update = function(script){
	if(script)this.init(script);
};
US_update.prototype = {
	init: function(script){
		var scriptNew={addon:{}};
		
		if(typeof(USUcheck4UpdateOverRide)=='boolean' && USUcheck4UpdateOverRide!=null)
			scriptNew.check4Update = USUcheck4UpdateOverRide;
		else scriptNew.check4Update = typeof(script.check4Update)=='boolean'?script.check4Update:USUcheck4UpdateDefault;
		
		if(scriptNew.check4Update===true){
			// title;
			if(typeof(USUtitleOverRide)=='string' && USUtitleOverRide!=0)
				scriptNew.title = USUtitleOverRide;
			else scriptNew.title = typeof(script.title)=='string'?script.title:USUtitleDefault;
			// updateTime;
			if(typeof(USUupdateTimeOverRide)=='number' && USUupdateTimeOverRide!=0)
				scriptNew.updateTime = USUupdateTimeOverRide;
			else scriptNew.updateTime = typeof(script.updateTime)=='number'?script.updateTime:USUupdateTimeDefault;
			// DoS;
			if(typeof(USUDoSOverRide)=='number' && USUDoSOverRide!=0)
				USUDoS = USUDoSOverRide;
			else USUDoS = USUDoSDefault;
			// language;
			if(typeof(USUlanguageOverRide)=='string' && USUlanguageOverRide!="")
				scriptNew.language = USUlanguageOverRide;
			else scriptNew.language = typeof(script.language)=='string'?script.language:USUlanguageDefault;
			// thisVersion;
			if(typeof(USUthisVersionOverRide)=='string' && USUthisVersionOverRide!="")
				scriptNew.thisVersion = USUthisVersionOverRide;
			else scriptNew.thisVersion = typeof(script.thisVersion)=='string'?script.thisVersion:USUthisVersionDefault;
			// versionUrl;
			if(typeof(script.versionUrl)!='string' && typeof(script.versionUrl)!='number'){
				$alert('c',3,'USU0a','A version url is not defined!');
				return;
			}else if(typeof(script.versionUrl)=='number')  // previous "?format=txt";
				scriptNew.versionUrl = "http:\/\/userscripts.org\/scripts\/source\/"+script.versionUrl+".meta.js";
			else scriptNew.versionUrl = script.versionUrl;
			// updateUrl;
			if(typeof(script.updateUrl)!='string' && typeof(script.updateUrl)!='number'){
				$alert('c',3,'USU0b','A update url is not defined!');
				return;
			}else if(typeof(script.updateUrl)=='number')
				scriptNew.updateUrl = "http:\/\/userscripts.org\/scripts\/show\/"+script.updateUrl;
			else scriptNew.updateUrl = script.updateUrl;

			// addon;
			if(typeof(script.addon)=="undefined") script.addon={};
			// headers;
			if(typeof(USUheadersOverRide)=='object' && USUheadersOverRide!=null)
				scriptNew.addon.headers = USUheadersOverRide;
			else scriptNew.addon.headers = typeof(script.addon.headers)=='object'?script.addon.headers:USUheadersDefault;
			// mimeType;
			if(typeof(USUmimeTypeOverRide)=='string' && USUmimeTypeOverRide!="")
				scriptNew.addon.mimeType = USUmimeTypeOverRide;
			else scriptNew.addon.mimeType = typeof(script.addon.mimeType)=='string'?script.addon.mimeType:USUmimeTypeDefault;
			// showLog;
			if(typeof(USUshowLogOverRide)=='boolean' && USUshowLogOverRide!=null)
				scriptNew.addon.showLog = USUshowLogOverRide;
			else scriptNew.addon.showLog = typeof(script.addon.showLog)=='boolean'?script.addon.showLog:USUshowLogDefault;
			// showVcomment;
			if(typeof(USUshowVcommentOverRide)=='boolean' && USUshowVcommentOverRide!=null)
				scriptNew.addon.showVcomment = USUshowVcommentOverRide;
			else scriptNew.addon.showVcomment = typeof(script.addon.showVcomment)=='boolean'?script.addon.showVcomment:USUshowVcommentDefault;
			// showLoader;
			if(typeof(USUshowLoaderOverRide)=='boolean' && USUshowLoaderOverRide!=null)
				scriptNew.addon.showLoader = USUshowLoaderOverRide;
			else scriptNew.addon.showLoader = typeof(script.addon.showLoader)=='boolean'?script.addon.showLoader:USUshowLoaderDefault;
			// customLoader;
			if(typeof(USUcustomLoaderOverRide)=='function' && USUcustomLoaderOverRide!=null)
				scriptNew.addon.customLoader = USUcustomLoaderOverRide;
			else scriptNew.addon.customLoader = typeof(script.addon.customLoader)=='function'?script.addon.customLoader:USUcustomLoaderDefault;
		
			this.translate=new US.Language({langMod:scriptNew.language});
			
			this.updater(scriptNew);
		
			if(typeof(window.USUnames)=="undefined")window.USUnames=[];
			window.USUnames.push(scriptNew.title);
			if(typeof(window.USUscripts)=="undefined")window.USUscripts=[];
			window.USUscripts.push([script,scriptNew]);
	}	},
	updater: function(script){
		var USU = this,
			USUbeenHere = false;  // fix for double run of USU.loader when o.readyState==1;
		
		USU.loadingImage='data:image/gif;base64,R0lGODlhEgASALMPAKysqpWVk1RUUmJiYIqKiW9vbqCgnomJh35+faGhnnBwb39/fqGhn3FxcYCAgP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAPACwAAAAAEgASAAAEV/DJSautzt29+toTQTxIiTxNc4kieSqwYh30QRV4cdEWbgUB0GMwmACBGyJRcgxelEWmMxmlMBgWgeCS6CYoWq3FQDY8AIBHeDs2o9FqNuidFlLg9rwkAgAh+QQFAAAPACwBAAEAEAAQAAAEUvDJ+QihmFqbZwjPIR6P42DfF5JLu1ApOCE0gsoUTTFMNzWNR2KY8CmOCoPS4Cs4Cw+lT+KkAACZwQBzvVK0Wmv3IRA8wFsxuWwO+9jm6aTciQAAIfkEBQAADwAsAQABABAAEAAABFHwyflCoJhamydj1fYQBJacSTiS5WS8BnXMB/ZmMwUA3eQ4j92utyguhLwOYokIJntLikCQaTQw0ylFwVVIs4/B4FEoF7BUsZh87qnHPco6EwEAIfkEBQAADwAsAQABABAAEAAABFLwyfkYo5imnfIEwGOMxhMEGAiK5XlSaji5KCxT7yQI3kQQj92u9/sJeZ6D8hBE9pSUwSDjcGCkUspiu4hiH43GA0FGXKeKtGJs7hXehR7m7YkAACH5BAUAAA8ALAEAAQAQABAAAART8Mn5AKCYWpunENX2MAz2feGTrAl1gpMhGyZMydQwdFMQPDodz+cL7jrEn5D38FEajQyBgFFYFZTplFLoFh4Ox+NAPmC6j4V6MTbzEHAEkwLvRAAAIfkEBQAADwAsAQABABAAEAAABFHwyfmEoJham+cY1fYAAPZ94UiW3kmtbJuRVNN0E8M8Sq/giWCiQCzgDEjDg4iTICkORyYQwCyuCwqVSkF4EQ8C4bGtdsFiMdncObgPTYq7EwEAIfkEBQAADwAsAQABABAAEAAABFLwyfnGoJham2dr1fYIAqacSjiS5VS8BcW2boyRlON0EwA8i+CC5/Mhjghi8XHkSXwUAiHDYGCkUkpim6AcvodHIPAwmA2Yr3hMNjvZZOdk3IkAACH5BAUAAA8ALAEAAQAQABAAAARS8Mn5WqOYqq3ydM5TjMUzDNiiLmJ5nhQiI9SLxjQGTwThTQLBo9f7BYOH5MF4fCR/kiAlEMgAABgqlXK9TrUPBuPRxX4fiXSCbPYY3gYo5e2JAAA7';				
		
		USU.title = script.title;
		USU.check4Update = script.check4Update;
		USU.updateTime = script.updateTime;
		USU.language = script.language;
		USU.thisVersion = script.thisVersion;
		USU.versionUrl = script.versionUrl;
		USU.updateUrl = script.updateUrl;
		USU.addon = {};
		USU.addon.headers = script.addon.headers;
		USU.addon.mimeType = script.addon.mimeType;
		USU.addon.showLog = script.addon.showLog;
		USU.addon.showVcomment = script.addon.showVcomment;
		USU.addon.showLoader = script.addon.showLoader;
		USU.addon.customLoader = script.addon.customLoader;
		
		USU.checkChecked = function(){
			var alreadyChecking = GM_getValue(USU.title+'.DoS',null);
			GM_setValue(USU.title+'.DoS', $now.toString());
			if(alreadyChecking && ($now - alreadyChecking) < USUDoS) return;
			var lastChecked = GM_getValue(USU.title+'.lastChecked', null);
			if(lastChecked && ($now - lastChecked) < USU.updateTime) return;
			USU.httpRequest();
		}
		USU.httpRequest = function(){
			GM_xmlhttpRequest({
				method:				"GET",
				url:				USU.versionUrl,
				overrideMimeType:	USU.addon.mimeType,
				headers:			USU.addon.headers,
				onreadystatechange:	USU.loader,
				onerror:			USU.error,
				onload:				function(){},
			});
		}
		USU.error = function(e){
			$alert('c',2,'USU08',"[Title: "+USU.title+"]; "+
								 "[Url: "+USU.versionUrl+"]; "+
								 "[Status: "+e.statusText+" ("+e.status+")]; "+
								 "[ReadyState: "+e.readyState+"]; "+
								 "[ResponsHeaders: "+e.responsHeaders+"]; "+
								 "[Respons: "+e.responseText+"]; ");
			if($gi("USUpdateOverlay")){
				$re($gi("USUpdateOverlay"));  // cleanup
		}	}
		USU.loader = function(o){
			if(USU.addon.showLoader){
				if(typeof(USU.addon.customLoader)=='function'){
					USU.addon.customLoader(o,USU);
				}
				else if(o.readyState==1 && USUbeenHere===false){  // loading...
					if(!$gi("USUpdateOverlay") && !$gi("cmdOverlayGray")){
						USUpdateHeight = 20;  // px
						USUpdateWidth = 20;  // px
						USUpdateTop = Math.min((Window.$height() - USUpdateHeight)/2);
						USUpdateLeft = Math.min((Window.$width() - USUpdateWidth)/2);
						var USUpdateOverlay = $ce("DIV");
						$sa(USUpdateOverlay,"id","USUpdateOverlay");
						$sa(USUpdateOverlay,"style",$setReturnOpacity(70)+"visibility:visible;background-color:#000;display:block;position:fixed;height:100%;width:100%;top:0px;left:0px;z-index:9998");
						$ac($db,USUpdateOverlay);
						var USUpdateLoading = $ce("IMG");
						$sa(USUpdateLoading,"src",USU.loadingImage);
						$sa(USUpdateLoading,"style",$setReturnOpacity(100)+"visibility:visible;display:block;position:fixed;height:"+USUpdateHeight+"px;width:"+USUpdateWidth+"px;top:"+USUpdateTop+"px;left:"+USUpdateLeft+"px;z-index:9999");
						$ac(USUpdateOverlay,USUpdateLoading);
						$addEvent(USUpdateOverlay,"dblclick",function(){$re($gi("USUpdateOverlay"));});
					}
					USUbeenHere=true;
			}	}
			if(o.readyState==4){
				if($gi("USUpdateOverlay"))
					$re($gi("USUpdateOverlay"));  // cleanup
				USU.update(o);
		}	},
		USU.update = function(o){
			if(o.status==200){
				var current = o.responseText;
				var RegExp0 = /\/\/\s+==UserScript==/i;
				var RegExp1 = /@version\s+(v?\s?[\d+\.]+\s?\w+)/i;
				var RegExp2 = /[\d+\.]+/i;
				var RegExp3 = /@versiontext\s+(.+)/i;
				if(current.match(RegExp0)){
					if(current.match(RegExp1)){
						USU.serverVersion = RegExp.$1;
						var serverVersionNrs = USU.serverVersion.match(RegExp2);
						if(serverVersionNrs==null){
							serverVersionNrs = ["0"];
							USU.serverVersion = USU.translate.localise(['USU','unknown']);
						}
						serverVersionNrs = serverVersionNrs[0].split(".");
						
						var thisVersionNrs = USU.thisVersion.match(RegExp2);
						if(thisVersionNrs==null){
							thisVersionNrs = ["0"];
							USU.thisVersion = USU.translate.localise(['USU','unknown']);
						}
						thisVersionNrs = thisVersionNrs[0].split(".");
						
						USU.versiontext = false
						if(current.match(RegExp3) && typeof(RegExp.$1)!="undefined" && RegExp.$1!=""){
							USU.versiontext = RegExp.$1;
						}
						
						var notyetprompted2Update = true,
							thisVHigherThenServerV = false;
						
						if(unsafeWindow.console && USU.addon.showLog){
							unsafeWindow.console.groupEnd();
							unsafeWindow.console.group("US Update: "+USU.title+"\n"+"["+USU.translate.localise(['USU','this'])+": "+USU.thisVersion+"] && ["+USU.translate.localise(['USU','server'])+": "+USU.serverVersion+"].");
						}
						for(var c=0; c<Math.max(serverVersionNrs.length,thisVersionNrs.length); c++){
							if(typeof(thisVersionNrs[c])=="undefined" || thisVersionNrs[c]=="" || thisVersionNrs[c]==null){
								thisVersionNrs[c] = 0;
							}else{
								thisVersionNrs[c] = Number(thisVersionNrs[c]);
							}
							if(typeof(serverVersionNrs[c])=="undefined" || serverVersionNrs[c]=="" || serverVersionNrs[c]==null){
								serverVersionNrs[c] = 0;
							}else{
								serverVersionNrs[c] = Number(serverVersionNrs[c]);
							}
							
							if(thisVersionNrs[c]<serverVersionNrs[c] && notyetprompted2Update && !thisVHigherThenServerV){
								var confirmTxt = USU.translate.localise(['USU','newUpdate'],{"name":USU.title})+
												 "\n "+USU.translate.localise(['USU','currentV'],{"version":USU.thisVersion})+
												 "\n "+USU.translate.localise(['USU','publicV'],{"version":USU.serverVersion})+
												 (USU.addon.showVcomment&&USU.versiontext?"\n\n"+USU.translate.localise(['USU','versiontext'])+"\n "+USU.versiontext.replace(/\n/g,"\n "):"")+
												 "\n\n"+USU.translate.localise(['USU','updateNow']);
								if(confirm(confirmTxt)){
									US_openInTab(USU.updateUrl);
								}
								else alert(USU.translate.localise(['USU','noUpdate'],{'time':$timeDateWords(Math.max(USU.updateTime,USUDoS),USU.translate)}));
								notyetprompted2Update = false;
								if(USU.addon.showLog){
									$alert('c',2,'USU07 ['+c+']',"["+USU.thisVersion+"] && ["+USU.serverVersion+"] => "+thisVersionNrs[c]+" "+USU.translate.localise(['USU','lower'])+" "+serverVersionNrs[c]);
							}	} 
							else if(thisVersionNrs[c] == serverVersionNrs[c]){
								if(USU.addon.showLog){
									$alert('c',1,'USU06 ['+c+']',"["+USU.thisVersion+"] && ["+USU.serverVersion+"] => "+thisVersionNrs[c]+" "+USU.translate.localise(['USU','equel'])+" "+serverVersionNrs[c]);
							}	}
							else if(thisVersionNrs[c] > serverVersionNrs[c]){
								if(USU.addon.showLog){
									$alert('c',3,'USU05 ['+c+']',"["+USU.thisVersion+"] && ["+USU.serverVersion+"] => "+thisVersionNrs[c]+" "+USU.translate.localise(['USU','higher'])+" "+serverVersionNrs[c]);
								}
								thisVHigherThenServerV = true;
							}
							else{ 
								if(USU.addon.showLog){
									$alert('c',2,'USU04 ['+c+']',"["+USU.thisVersion+"] && ["+USU.serverVersion+"] => "+thisVersionNrs[c]+" "+USU.translate.localise(['USU','lower'])+" "+serverVersionNrs[c]);
							}	}
							GM_setValue(USU.title+'.lastChecked',$now.toString());
						}
						if(unsafeWindow.console && USU.addon.showLog){
							unsafeWindow.console.groupEnd();
					}	}
					else $alert('',4,'USU03',"The '@version' is written very strange in "+USU.title+", so checking for updates is stopped!");
				}
				else $alert('',4,'USU02',"There isn't a '==UserScript==' header in "+USU.title+", so checking for updates is stopped!");
			}
			else $alert('',4,'USU01',"Detected problems loading url from "+USU.title+": "+o.statusText+" ["+o.status+"].");
		}
		if(USU.check4Update) USU.checkChecked();
	},
	names: function(){
		return $w.USUnames;
	},
	all: function(){
		return $w.USUscripts;
}	};



//*** FRAMEWORK CHECK ***//
window.US_updateOK="v2 Beta";
console.log('US Update ' + US_updateOK + ' correct imported!');



//*** STATISTICS ***//
// Chars (exclude spaces): 18.856
// Chars (include spaces): 21.900
// Chars (Chinese): 0
// Words: 1.915
// Lines: 451