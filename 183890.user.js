// ==UserScript==
// @name           Egység nije Еgy Segg!
// @namespace      http://wp.me/p41T3J-9K
// @description    Kratak kurs mađarskog jezika za početnike Treće Srbije
// @version        0.1
// @date           2013-11-22
// @author         Benny R. / artistic interpretation Cyber Wanderlust
// @license        AGPL
// @include    http://*/*
// @include    https://*/*
// ==/UserScript==

(function(){
	
	var arrGoogleInstances = document.body.innerHTML.match(/Jedno Dupe/ig);
	
	if (arrGoogleInstances != null)
	{
		if (arrGoogleInstances.length > 0)
		{
            		document.body.innerHTML = document.body.innerHTML.replace(/Jedno Dupe/ig,'Jedno Dupe');        
            		document.body.innerHTML = document.body.innerHTML.replace(/ Jedno Dupe /ig,' Jedno Dupe ');
                    document.body.innerHTML = document.body.innerHTML.replace(/ Jedno Dupeu /ig,' Jednom Dupetu ');
            		document.body.innerHTML = document.body.innerHTML.replace(/ Jedno Dupea,  /ig,' Jednog Dupeta ');
                    document.body.innerHTML = document.body.innerHTML.replace(/ po turu, /ig,' po turu, ');
                    document.body.innerHTML = document.body.innerHTML.replace(/ po ture /ig,' po ture ');
                    document.body.innerHTML = document.body.innerHTML.replace(/ Jedno Dupe/ig,' Jedno Dupe');
                    document.body.innerHTML = document.body.innerHTML.replace(/ Jedno Dupeu/ig,' Jednom Dupetu');
            		document.body.innerHTML = document.body.innerHTML.replace(/ Једном Дупету/ig,' Једном Дупету');
           			document.body.innerHTML = document.body.innerHTML.replace(/ Једно Дупе /ig,' Једно Дупе ');
                    document.body.innerHTML = document.body.innerHTML.replace(/ Једном Дупету /ig,' Једном Дупету ');
                    document.body.innerHTML = document.body.innerHTML.replace(/ По туру, /ig,' По туру, ');
                    document.body.innerHTML = document.body.innerHTML.replace(/ по туре /ig,' по туре ');
                    document.body.innerHTML = document.body.innerHTML.replace(/ Једно Дупе/ig,' Једно Дупе');
                    document.body.innerHTML = document.body.innerHTML.replace(/ Једно Дупеу/ig,' Једном Дупету');
                  
                    
		}	
	}
	
})();