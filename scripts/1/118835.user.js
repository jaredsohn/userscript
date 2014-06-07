// ==UserScript==
// @name           Mafia Wars Free Gift Replacement [BETA]
// @namespace      http://mmfu-lucifer.com
// @version        1.20.0
// @description    Mafia Wars Free Gift Replacement gives you gifts that are not listed in the Free Gifts Section you can auto send to favourite users & auto 50 friends
// @include        http://apps.facebook.com/inthemafia/*
// @include        https://apps.facebook.com/inthemafia/*
// @include        http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include        https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          http://apps.facebook.com/inthemafia/*
// @match          https://apps.facebook.com/inthemafia/*
// @match          http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// ==/UserScript==
//

//19/12/2011
//Fixed load & small mistake of default onload fixed
//15/12/2011
//Added backup server
//11/12/2011
//Removed events no longer in use. button to load zyngas internal free gifts center
//11/12/2011
//Fixed issue with Spockholm ZMC modifying the html
//10/12/2011
//Added option to Show Gift List When Mafia Wars Loads
//07/12/2011
//Added new Toe Jammers Gift
//06/12/2011
//Fix for kicking out other scripts/toolbars from loading gift list
//05/12/2011
//Added/Fixed Red Mystery Bag Working on a bulk sender so you can send to 1k+ users
//03/12/2011
//Just added a skip button if not wanting to send a gift on mafia wars load


(function(){
var scriptname = 'mwgiftlinks_user'   

	if (/html_server/.test(document.location.href)) {
		if (typeof $ == 'undefined') {
		setTimeout(function(){ServerCheck();},1500)
		}else{
                try{
                    ServerCheck();
                }catch(err){
                    log('UserScript '+scriptname+' error!: '+err);
                }
	}}
	

function log(msg) {
//For us to debug out to browser java console
    setTimeout(function() {
        throw new Error(msg);
    }, 0);
}
	
	
function ServerCheck(){
var img = new Image(); 
img.src = 'http://screepts.com/ping.gif';
img.onload = function () {
server ='screepts.com';
clearTimeout(speedtest);
loadscript(server);
} 
img.onError = function(){
server = 'backupserver.hardiman.co.nz';
clearTimeout(speedtest);
loadscript(server);
}

var speedtest = setTimeout(function(){   
//If main server is slow responding
server = 'backupserver.hardiman.co.nz';
loadscript(server)    
},5000)            
           
}

function loadscript(server){
var file ='http://'+server+'/bm/'+scriptname+'.js?'+Math.random();
     
     		var head = document.getElementsByTagName('head').item(0);
		var scriptTag = document.getElementById('loadScript'+scriptname);
		if (scriptTag) {
			head.removeChild(scriptTag);
		}
		script = document.createElement('script');
		script.src = file;
		script.type = 'text/javascript';
		script.id = 'loadScript'+scriptname;
		head.appendChild(script);
    
}    
        
        
        
})();