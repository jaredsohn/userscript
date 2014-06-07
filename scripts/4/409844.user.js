// ==UserScript==
// @name    No Splash
// @author  Andrea Martinelli | http://www.xamasoft.com/
// @version 1.0.0
// @include http*://*
// ==/UserScript==



(function(){
if(window.noSplashLaunched) return;
window.noSplashLaunched = true;
var interval = null;


function checkDocument(){
    var q = 50;
    var splash = document.elementFromPoint(q, q);
    if(!splash) return;
    if(
        splash &&
        splash == document.elementFromPoint(q, window.innerHeight - q) &&
        splash == document.elementFromPoint(window.innerWidth - q, window.innerHeight - q) &&
        splash == document.elementFromPoint(window.innerWidth - q, q)
    ){
        for(var s = splash; s; s = s.parentElement){
            var computed = window.getComputedStyle(s);
            if(computed.opacity != "1" || (computed.backgroundColor.indexOf('rgba') != -1 && computed.backgroundColor.match(/\.\d+\)$/))){
                window.clearInterval(interval);
                var prevDisplay = computed.display;
                s.style.display = 'none';
                
                var warning = document.createElement('a');
                warning.style.cssText = 'z-index: 99999999; position: absolute; right: 40px; top: 40px; width: 300px; height: 60px; background: #DA542D; color: white; text-align: center; font-size: 12pt; font-family: Segoe UI, Verdana; text-shadow: 1px 1px 5px gray; box-shadow: 0 0 10px gray; padding: 5px; transition: all 0.5s; opacity: 0;';
                warning.textContent = 'A splash screen has been hidden. Click here to show it again.';
                warning.href = 'javascript:undefined';
                warning.addEventListener('click', function(){ s.style.display = prevDisplay; warning.style.display = 'none'; })
                document.body.appendChild(warning);
                window.setTimeout(function(){ warning.style.opacity = '1'; }, 1);
                
                break;
            }
            
        }
    }
}

checkDocument();

interval = window.setInterval(checkDocument, 600);
window.setTimeout(function(){ window.clearInterval(interval) }, 12000);

})();
