/*//////////////////////////////////////////////////////////////////////////
// ==UserScript===
// @name           US Framework
// @author         Jerone UserScript Productions
// @namespace      http://userscripts.org/users/31497
// @homepage       http://jervw.freehostia.com/articles/art006/US_framework.html
// @description    US Framework v1 Alpha
// @copyright      2008 Jerone
// @version        v1 Alpha
// @versiontext    Initial release.
// @browser        FF3
// @require        http://userscripts.org/scripts/source/16142.user.js
// @require        http://userscripts.org/scripts/source/16143.user.js
// @require        http://userscripts.org/scripts/source/31458.user.js
// @require        http://userscripts.org/scripts/source/16144.user.js
// @include        *
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////
// ToC:
// - Copyrights
// - History
// - Todo
// - Note
// - Framework Check
// - Usage Instructions
// - User Settings
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
// - 10-01-2009 17:30 [v1 Alpha]:
//   [+] initial release;
////////////////////////////////////////////////////////////////////////////
// Todo:
// - Opera, IE7Pro, Chrome support;
////////////////////////////////////////////////////////////////////////////
// Note:
// - This script is part of a framework:
//   - US Framework => http://userscripts.org/scripts/show/39678
//   - US Functions => http://userscripts.org/scripts/show/16142
//   - US Language => http://userscripts.org/scripts/show/16143
//   - US Options => http://userscripts.org/scripts/show/31458
//   - US Update => http://userscripts.org/scripts/show/16144
/*//////////////////////////////////////////////////////////////////////////



//*** USER SETTINGS ***//
// All settings made here will override the settings made in the userscripts itself (OPTIONAL)!
/** US Functions: **/
// -

/** US Language: **/
const USLlangModOverRide		= "";		// [String LANGUAGE SHORT or "browser"/"navigator"] language;
											// [""] script depended;
/** US Options: **/
const USOaddFadeOverRide		= null;		// [Boolean] (Un-)load fade;
											// [null] script depended;
const USOaddTabsOverRide		= null;		// [Boolean] Settings tabs;
											// [null] script depended;
const USOactiveTabNrOverRide	= -1;		// [Integer] Active tab;
											// [-1] script depended;
const USOshowAtStartOverRide	= null;		// [Boolean] Show at start;
											// [null] script depended;
const USOendFunctionOverRide	= null;		// [Function] Function executed when all is loaded;
											// [null] script depended;
const USOtabFunctionOverRide	= null;		// [Object {Integer:Function,...}] ({tab:function}) Function executed when stated tab is active;
											// [null] script depended;
const USOloadPictureOverRide	= null;		// [Array [Integer,Integer,String]] ([width,height,url]) Custom loading image;
											// [null] script depended;
/** US Update: **/
const USUtitleOverRide			= "";		// [String] UserScript name;
											// [""] script depended;
const USUcheck4UpdateOverRide	= null;		// [Boolean] check for updates;
											// [null] script depended;
const USUupdateTimeOverRide		= 0; 		// [Integer MILLISECONDS] time interval between update checks;
											// [0] script depended;
const USUDoSOverRide			= 0;		// [Integer MILLISECONDS] anti-DoS time;
											// [0] script depended;
const USUlanguageOverRide		= "";		// [String LANGUAGE SHORT or "navigator"/"browser"] language;
											// [""] script depended;
const USUthisVersionOverRide	= "";		// [String "Integer"] version of script;
											// [""] script depended;
const USUheadersOverRide		= null;		// [Object] use specific HTTP headers;
											// [null] script depended;
const USUmimeTypeOverRide		= "";		// [String] use specific MimeType;
											// [""] script depended;
const USUshowLogOverRide		= null;		// [Boolean] show log;
											// [null] script depended;
const USUshowVcommentOverRide	= null;		// [Boolean] show new versions comment;
											// [null] script depended;
const USUshowLoaderOverRide		= null;		// [Boolean] show loader overlay;
											// [null] script depended;
const USUcustomLoaderOverRide	= null;		// [Function] override normal loader;
											// [null] script depended;



//*** USER SCRIPT ***//
window.US = {
	Framework : function(cnfrm){
		this.cnfrm = cnfrm || false;
		var temp=true;
		if(this.Functions.prototype()===false)temp=false;
		if(this.Language()===false)temp=false;
		if(this.Options()===false)temp=false;
		if(this.Update()===false)temp=false;
		return temp;
		// unsafeWindow.console.log([US_functionsOK,US_languageOK,US_optionsOK,US_updateOK].join(" || "));
	},
	Functions : {
		prototype : function(data){
			if(!!US_functions && !!US_functions.prototype)
				return US_functions.prototype(data);
			else
				return US.error("US Functions");
	}	},
	Language : function(data){
		if(!!US_language)
			return new US_language(data);
		else
			return US.error("US Language");
	},
	Options : function(data){
		if(!!US_options)
			return new US_options(data);
		else
			return US.error("US Options");
	},
	Update : function(data){
		if(!!US_update)
			return new US_update(data);
		else
			return US.error("US Update");
	},
	
	error : function(name){
		if(this.cnfrm!==false && confirm("Something went wrong with the "+name+" module of US Framework. "+
			 							 "\nMake sure it is installed correctly or reinstall the script. "+
			 							 "\n\nDo you want to go to the scripts homepage?"))
			GM_openInTab("http://userscripts.org/scripts/show/39678");
		return false;
}	}

if(US.Framework(true)){
	new US.Update({
		title:			'US Functions',
		check4Update:	true,
		updateTime:		1*60*60*1000,
		language:		"navigator",
		thisVersion:	(window.US_functionsOK?window.US_functionsOK:'v2 Beta'),
		versionUrl:		16142,
		updateUrl:		39678
	});
	
	new US.Update({
		title:			'US Language',
		check4Update:	true,
		updateTime:		1*60*60*1000,
		language:		"navigator",
		thisVersion:	(window.US_languageOK?window.US_languageOK:'v2 Beta'),
		versionUrl:		16143,
		updateUrl:		39678
	});
	
	new US.Update({
		title:			'US Options',
		check4Update:	true,
		updateTime:		1*60*60*1000,
		language:		"navigator",
		thisVersion:	(window.US_optionsOK?window.US_optionsOK:'v1.9.3 Beta'),
		versionUrl:		31458,
		updateUrl:		39678
	});
	
	new US.Update({
		title:			'US Update',
		check4Update:	true,
		updateTime:		1*60*60*1000,
		language:		"navigator",
		thisVersion:	(window.US_updateOK?window.US_updateOK:'v2 Beta'),
		versionUrl:		16144,
		updateUrl:		39678
	});
	
	new US.Update({
		title:			'US Framework',
		check4Update:	true,
		updateTime:		1*60*60*1000,
		language:		"navigator",
		thisVersion:	(window.US_frameworkOK="v1 Alpha"),
		versionUrl:		39678,
		updateUrl:		39678
	});

	
	
//*** FRAMEWORK CHECK ***//
console.log('US Framework ' + US_frameworkOK + ' correct imported!');}



//*** STATISTICS ***//
// Chars (exclude spaces): 6.543
// Chars (include spaces): 7.802
// Chars (Chinese): 0
// Words: 850
// Lines: 221