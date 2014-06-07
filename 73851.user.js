// ==UserScript==
// @name           	Umbraco - File Permissions in Plesk
// @namespace      	bbz.umbraco.plesk
// @description		This script automatcally sets full control permissions for the IIS Application Pool user on all the files/folders that Umbraco CMS needs to work.
// @include       	https://server*.hostfactory.ch:8443/plesk/client@*/domain@*/hosting/file-manager*
// ==/UserScript==

/*
USAGE:
1 open the file-manager for a plesk domain
2 make sure greasemonkey is enabled, and this script is installed
3 open the httpdocs folder
4 confirm if you want to start. wait until all opened windows have finished loading (may take several minutes)
5 windows that remain open with 
  a. the permissions dialog mean that the desired permissions were already set and dont need to be saved again
  b. the folder list and an alert box mean that the item mentioned in the alert box has been edited and saved correctly.
6 done. you can close all windows opened by the script.
(Tip: I prefer to use it in firefox with the 'Tree Style Tab' extension installed.)

TODO:
- use prototype instead of jquery, cause plesk already loads prototype
- cross browser tests
.- test with different plesk languages
 -> tested with english, german
*/

(function() {

var scripts = [
	'http://jquery.com/src/jquery-latest.js'
];
for (i in scripts) {
    var script = document.createElement('script');
    script.src = scripts[i];
	script.type= "text/javascript";
    document.getElementsByTagName('head')[0].appendChild(script);
}

function log(msg, line){
	if(typeof line == 'undefined'){ line = ""; }
	GM_log(msg + ": " + line);
	if(typeof console != 'undefined'){
		console.log(msg + ": " + line);
	}
}
 
window.addEventListener('load', function(event) {
	var $j = unsafeWindow.jQuery;
	//alert($j); // check if the jQuery dollar function works
	
	var PERM_ITEMS 	= ["app_code", "bin", "config", "css", "data", "masterpages", "media", "python", "scripts", "umbraco", "usercontrols", "xslt", "web.config"];
	var WPUSER 		= "Plesk IIS WP User";
	
	function getFullControlEl(){
		return $j("table.list input[name='AllowFullControl']");
	}	
	function isFullControlChecked(){
		return getFullControlEl().is(":checked");
	}
	function setFullControl(){
		log("checking full control");
		getFullControlEl().attr("checked", true);
	}	
	function getUnameCell(uname){
		return $j("#permissions_userlist>table tr>td:contains('"+WPUSER+"')");
	}
	function getPermLink(foldername){
		return $j('table.list td>a[href$="%2F'+foldername+'"]').last();
	}
	function gotoPermLink(foldername){
		log("goto "+foldername);
		var w = window.open(getPermLink(foldername).attr("href"), '');
	}
	// states
	function isSetPermissionsState(){
		return location.href.indexOf("/permissions/?fname=") > 0;
	}
	function isFolderListState(){
		return location.href.indexOf("/file-manager") > 0 && location.href.indexOf("file=%2Fhttpdocs%2F") > 0;
	}
	function isSavedState(){
		return document.referrer.indexOf("/permissions/?fname=") > 0;
	}
	// /states
	function save(){
		log("saving");
		$j("#buttonid-ok").click();
	}
	function activateWPUser(){
		log("activating wp user");
		// 1. add to list if wp user still in dropdown
		// 2. click wpuser cell to activate permission edit view
		
		var optwpuser = $j("#user_name_input option:contains('"+WPUSER+"')");
		if(optwpuser.length != 0){
			log("adding from dropdown");
			optwpuser[0].attr("selected", "selected");
			psaEditLists[0].Add();
		}else{
			// user not in dropdown
		}
		
		log("clicking wp user cell");
		getUnameCell().click();
		log("activated");
	}
	function canStart(){
		return confirm("Start greasemonkey script to automatically set file/folder permissions?");
	}

	// constructor
	(function() {
		/*
		url format:
		https://server<sid>.hostfactory.ch:8443/plesk/client@<cid>/domain@<did>/hosting/file-manager/permissions/?fname=httpdocs%2F<subfolder>
		*/
		
		if(isSavedState()){
			// nothing todo, just returned from permissions edit dialog
			alert("saved permissions for: " + document.referrer);
		}
		else if(isFolderListState() && canStart()){
			// open item permission pages in new window
			for(var pI in PERM_ITEMS){
				gotoPermLink(PERM_ITEMS[pI]);
			}
		}
		else if(isSetPermissionsState()){
			// edit permissions
			activateWPUser();
			if(isFullControlChecked()){
				log("full control already set");
			} else{
				setFullControl();			
				save();
			}
		}
	})();
	
}, 'false'); 
})(); 