// ==UserScript==
// @name           Kosovo je Penis!
// @namespace      http://internetjockey.posterous.com/we-must-not-say-we-wont-go-to-war-over-penis
// @description    Replace text reading "Kosovo" on every web page with "Penis" 
// @version        0.3
// @date           2011-11-23
// @author         Benny R. / artistic interpretation Cyber Wanderlust
// @license        AGPL
// @include        *
// ==/UserScript==

(function(){
	
	var arrGoogleInstances = document.body.innerHTML.match(/Kosovo/ig);
	
	if (arrGoogleInstances != null)
	{
		if (arrGoogleInstances.length > 0)
		{
                    document.body.innerHTML = document.body.innerHTML.replace(/ Kosovo /ig,' Penis ');
                    document.body.innerHTML = document.body.innerHTML.replace(/ Kosovu /ig,' Penisu ');
                    document.body.innerHTML = document.body.innerHTML.replace(/ Kosovom /ig,' Penisom ');
                    document.body.innerHTML = document.body.innerHTML.replace(/ Kosovskim /ig,' Peniskim ');
                    document.body.innerHTML = document.body.innerHTML.replace(/ Kosovskom /ig,' Peniskom ');
                    document.body.innerHTML = document.body.innerHTML.replace(/ Kosovski /ig,' Peniski ');
                    document.body.innerHTML = document.body.innerHTML.replace(/ Kosovsku /ig,' Penisku ');
                    document.body.innerHTML = document.body.innerHTML.replace(/ Kosovska /ig,' Peniska ');
                    document.body.innerHTML = document.body.innerHTML.replace(/ Kosovske /ig,' Peniske ');
                    document.body.innerHTML = document.body.innerHTML.replace(/ Kosovskih /ig,' Peniskih ');
                    document.body.innerHTML = document.body.innerHTML.replace(/ Kosovsko /ig,' Penisko ');
                    document.body.innerHTML = document.body.innerHTML.replace(/ Kosovo/ig,' Penis');
                    document.body.innerHTML = document.body.innerHTML.replace(/ Kosovu/ig,' Penisu');
                    document.body.innerHTML = document.body.innerHTML.replace(/ Kosovom/ig,' Penisom');
                    document.body.innerHTML = document.body.innerHTML.replace(/ Kosovskim/ig,' Peniskim');
                    document.body.innerHTML = document.body.innerHTML.replace(/ Kosovskom/ig,' Peniskom');
                    document.body.innerHTML = document.body.innerHTML.replace(/ Kosovski/ig,' Peniski');
                    document.body.innerHTML = document.body.innerHTML.replace(/ Kosovsku/ig,' Penisku');
                    document.body.innerHTML = document.body.innerHTML.replace(/ Kosovska/ig,' Peniska');
                    document.body.innerHTML = document.body.innerHTML.replace(/ Kosovske/ig,' Peniske');
                    document.body.innerHTML = document.body.innerHTML.replace(/ Kosovskih/ig,' Peniskih');
                    document.body.innerHTML = document.body.innerHTML.replace(/ Kosovsko/ig,' Penisko');
                    document.body.innerHTML = document.body.innerHTML.replace(/Kosovo /ig,'Penis ');
                    document.body.innerHTML = document.body.innerHTML.replace(/Kosovu /ig,'Penisu ');
                    document.body.innerHTML = document.body.innerHTML.replace(/Kosovom /ig,'Penisom ');
                    document.body.innerHTML = document.body.innerHTML.replace(/Kosovskim /ig,'Peniskim ');
                    document.body.innerHTML = document.body.innerHTML.replace(/Kosovskom /ig,'Peniskom ');
                    document.body.innerHTML = document.body.innerHTML.replace(/Kosovski /ig,'Peniski ');
                    document.body.innerHTML = document.body.innerHTML.replace(/Kosovsku /ig,'Penisku ');
                    document.body.innerHTML = document.body.innerHTML.replace(/Kosovska /ig,'Peniska ');
                    document.body.innerHTML = document.body.innerHTML.replace(/Kosovske /ig,'Peniske ');
                    document.body.innerHTML = document.body.innerHTML.replace(/Kosovskih /ig,'Peniskih ');
                    document.body.innerHTML = document.body.innerHTML.replace(/Kosovsko /ig,'Penisko ');
                    
		}	
	}
	
})();