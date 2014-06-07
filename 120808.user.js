// ==UserScript==
// @name           Mafia Wars Auto Collect Clan XP
// @namespace      http://mmfu-lucifer.com
// @version        1.10.0
// @description    This will auto collect your clans XP for the people that forget to do it or just lazy like me :)
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

//24/12/2011
//logs into the console when it collected & level collected

(function(){
var scriptname = 'clancollectxp_user'   

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