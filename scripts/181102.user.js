// ==UserScript==
// @name       Sandcastle Builder - Keyboard Clicker
// @description  Type "id" to enable, then press or hold z to click
// @version    1.2
// @namespace  http://userscripts.org/scripts/show/181102
// @match      http://castle.chirpingmustard.com/castle.html
// ==/UserScript==

// Type "id" to enable/disable keyboard clicking

// To change # keyclicks per press, edit keyClicksFormula's "Math.pow(10,n);" where  n = toggle level 0 to 3
var keyClicksFormula = function(n){return Math.pow(10,n);}
var firstKey='';
var clickerKey='';
var clickerMethod=0;
var keyClicks=1;
var clickNotify=' click ';
var kfa=0;

Molpy.LazyClicker=function(k){
    key = String.fromCharCode(k.keyCode||k.charCode).toLowerCase();
    if(key=='d' && firstKey=='i'){                      // Enable keyboard clicking
        if(kfa==1){
            kfa = 0;
            clickerKey='';
            clickerMethod=0;
            keyClicks=1;
            Molpy.Notify('Keyboard clicking DISABLED');
        } else {
            Molpy.Notify('Keyboard clicking ENABLED');
            Molpy.Notify('Press key twice to bind clicking key');
            firstKey='';
            kfa = 1;
        }
    }
    if(kfa==1){                                         // Keyboard clicking enabled
        if(key==clickerKey && Molpy.npbONG==1){         // Actual keyboard clicking functionality
            if(clickerMethod==0){ Molpy.ClickBeach();
            } else if(clickerMethod>0){
                var i=0;
                while(i<keyClicks){ Molpy.ClickBeach(); i++; }
            }
        }
        if (clickerKey != '') {
            if (key == 't') {
                clickerMethod--;
                if (clickerMethod < 0) { clickerMethod = 3;}
                keyClicks = keyClicksFormula(clickerMethod);
                if (keyClicks != 1){ clickNotify = ' clicks '; } else { clickNotify = ' click '; }                    
                Molpy.Notify(keyClicks + clickNotify + 'per keypress');
            }
        }
        if(key==firstKey && clickerKey==''){            // Bind key for keyboard clicking
            clickerKey=key;
            if(clickerKey=='t'){ clickerKey=''; Molpy.Notify('Please choose a key other than T');
            } else {
                Molpy.Notify('Clicking key bound to ' + clickerKey);
                Molpy.Notify(keyClicks + clickNotify + 'per keypress');
                Molpy.Notify('Press T to toggle number of clicks');
            }
        }
    }                                                   // End of keyboard clicker section
    firstKey=key;
}
window.onkeypress=Molpy.LazyClicker;