// ==UserScript==
// @name        Lounge_newa
// @namespace   http://dota2lounge.com/*
// @include     http://dota2lounge.com/*
// @version     1
// ==/UserScript==

var cour = "Trusty" // *** insert courier name: Dog, Frog, Roshan, Morok etc ***

var eff = "Divine" // *** effect name: Burning, Searing, Ethereal etc; insert space if no preference ***

var col = "" // *** color, leave empty if no preference ***

var leg = 0; // *** search for legacy color 1=yes, 0=no ***

// Colors:
// indigo 3d68c4, blue 0097ce, violet 8232cf, teal 4ab78d,
// gold cfab31, red d03d33, orange d07733, green 51b350, lgreen b7cf33, 
// white ffffff, ruby d11fa1, polycount 37864d

////////////////////////////////////////////////////////////////////////////////////////

var loungeurls = "";

var patt = new RegExp(cour, "g");

var links = document.evaluate("//a[contains(@href, 'trade?t')]",
    document, 
    null, 
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var link = links.snapshotItem(0);

var astr = link.href;

var trade = document.evaluate("//div[@class='tradecnt']",  
    document, 
    null, 
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
 
for (var i = 0; i < trade.snapshotLength; i++) {
     
    var tradeentry = trade.snapshotItem(i);

    if (tradeentry != null){
    
        var tradestr = tradeentry.textContent;
        
        var cournr = tradestr.match(patt); 
        
        for (var j = 0; j < cournr.length; j++) {
        
            var courpos = tradestr.indexOf(cour);
            
             if (courpos != -1) {
                
                tradestr = tradestr.substring(courpos);
                var effpos = tradestr.indexOf("Effect"); 
                
                if (effpos != -1 && effpos < 80) {
                    //if (tradestr.substring(effpos + 7, effpos + 18).indexOf("Burning") != -1 | tradestr.substring(effpos + 7, effpos + 18).indexOf("Felicity") != -1 | tradestr.substring(effpos + 7, effpos + 18).indexOf("Resonant") != -1) { 
                    if (tradestr.substring(effpos + 7, effpos + 28).indexOf(eff) != -1) {
   
                        tradestr = tradestr.substring(effpos);
                        var colpos = tradestr.indexOf("Color");
                    
                        if (colpos != -1 && colpos < 80) {
                            
                            if (leg == 1) {
                                if (tradestr.substring(colpos + 6, colpos + 16).indexOf("ffffff") == -1 &
                                tradestr.substring(colpos + 6, colpos + 16).indexOf("3d68c4") == -1 &
                                tradestr.substring(colpos + 6, colpos + 16).indexOf("d03d33") == -1 &
                                tradestr.substring(colpos + 6, colpos + 16).indexOf("8232cf") == -1 &
                                tradestr.substring(colpos + 6, colpos + 16).indexOf("4ab78d") == -1 &
                                tradestr.substring(colpos + 6, colpos + 16).indexOf("0097ce") == -1 &
                                tradestr.substring(colpos + 6, colpos + 16).indexOf("cfab31") == -1 &
                                tradestr.substring(colpos + 6, colpos + 16).indexOf("d07733") == -1 &
                                tradestr.substring(colpos + 6, colpos + 16).indexOf("51b350") == -1 &
                                tradestr.substring(colpos + 6, colpos + 16).indexOf("d11fa1") == -1 &
                                tradestr.substring(colpos + 6, colpos + 16).indexOf("37864d") == -1 &
                                tradestr.substring(colpos + 6, colpos + 16).indexOf("000000") == -1 &
                                tradestr.substring(colpos + 6, colpos + 16).indexOf("b7cf33") == -1) {
                                    var link = links.snapshotItem(i);
                                    
                                    loungeurls = loungeurls + "\n" + link.href;
                                    break;
                                }
                            } else {
                                if (tradestr.substring(colpos + 6, colpos + 16).indexOf(col) != -1) { 
                                    var link = links.snapshotItem(i);
                                    
                                    loungeurls = loungeurls + "\n" + link.href;
                                    break;
                                }
                            }
                        }
                        tradestr = tradestr.substring(colpos + 16);
                    }
                }
            }
        }
    }
}

window.alert(loungeurls);