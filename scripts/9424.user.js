// ==UserScript==
// @name           Dojo debugging enabler
// @namespace      http://shaneosullivan.wordpress.com
// @description    Enables debugging for Dojo applications
// @include        *
// ==/UserScript==
/*
LICENSE

=======



This program is free software; you can redistribute it and/or modify it

under the terms of the GNU General Public License as published by the

Free Software Foundation; either version 2 of the License, or (at your

option) any later version.



This program is distributed in the hope that it will be useful, but

WITHOUT ANY WARRANTY; without even the implied warranty of

MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General

Public License for more details.



You should have received a copy of the GNU General Public License along

with this program; if not, write to the Free Software Foundation, Inc.,

59 Temple Place, Suite 330, Boston, MA 02111-1307 USA

CHANGELOG

=========



Version 1.00

	- initial release
*/

unsafeWindow.setTimeout(function(){
		
try{
	function enableDebug(){
		if(typeof(unsafeWindow["dojo"]) != "undefined" && unsafeWindow["dojo"] != null && typeof(unsafeWindow["dojo"]["require"]) != "undefined"){
			var dojo =  unsafeWindow["dojo"];
			if(typeof(unsafeWindow["djConfig"]) == "undefined" || 
				unsafeWindow["djConfig"] == null){unsafeWindow["djConfig"]={};}
			unsafeWindow["djConfig"].isDebug = true;
			
			dojo.require("dojo.debug",true,true);
			var doFirebug = false;
			try{				
				dojo.require("dojo.debug.console",true,true);
				if(!dojo.hostenv.findModule("dojo.debug.console")){
					doFirebug=true;
				}
			}catch(e){
				doFirebug=true;
			}
			if(doFirebug){
				try{
					dojo.require("dojo.debug.Firebug",true,true);
					dojo.debug("Debugging enabled");
				}catch(e){}
			}
			return;
		}
		
	}
		
	if((this["document"])&&(this["document"]["getElementsByTagName"])){
	
		var scripts = document.getElementsByTagName("script");
		var rePkg = /(__package__|dojo|bootstrap1)\.js([\?\.]|$)/i;
		for(var i = 0; i < scripts.length; i++) {
			var src = scripts[i].getAttribute("src");
			if(!src) { continue; }
			var m = src.match(rePkg);
			if(m) {
				//unsafeWindow.setTimeout(enableDebug,1000);
				enableDebug();
				break;
			}
		}
	}
	
}catch(e){alert('caught '+e);}
},10);