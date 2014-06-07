// ==UserScript==
// @name           Remove Ads: Musicuo 
// @namespace      removeadsmusicuo
// @description    Removes ads from Musicuo
// @author         Emilio López
// @version        1.1
// @include        http://*musicuo.com*
// ==/UserScript==

//Hide the banner and resize the page
head = document.getElementsByTagName('head')[0];
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML =	'#banner {display:none !important; visibility:hidden !important; width:0 !important;height:0 !important;}' + 
					'#top, #player {width:100% !important;}' +
					'#right {width:auto !important;}';
head.appendChild(style);


//To make the banner disappear, without getting the continuous alerts
//put in place by Musicuo, we should fake the .is function

//Watch for jQuery loading, and tamper the .is function
unsafeWindow.watch('jQuery',function(prop,old,newy){
	//Add the fake stub
	newy.fn.is = (function(thing){return true;});		
	return newy;
});

