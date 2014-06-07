// ==UserScript==
// @name       Glow Autoreset
// @version    0.2
// @description   This scripts takes care of reseting the session before it timesout in Glow
// @match     https://glow.corp.globant.com/*
// @copyright  2012+, You
// ==/UserScript==

(function(document, window){
    var buttonContainer = document.getElementById('idletimeout'),
        button = document.getElementById('idletimeout-resume'),
        evt = document.createEvent('MouseEvents');
    
	evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    function updateTitlePage(textToAppend){
    	document.title = textToAppend + document.title;
    }
    
    function checkIfTimedout(){
        console.log('Glow SessionAutoreset: interval fired');
        
        var isHidden = buttonContainer.style.display === 'none';
        
        if( !isHidden ){
            button.dispatchEvent(evt);
            console.log('Glow SessionAutoreset: session extended');
        }
    }

    console.log('Glow SessionAutoreset: started');
    updateTitlePage('[[extended session]] ');
    window.setInterval(checkIfTimedout, 36000); //1 minute
    
})(document, window);