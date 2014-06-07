// ==UserScript==
// @name        Lounge_new
// @namespace   http://dota2lounge.com/result*
// @include     http://dota2lounge.com/result*
// @version     1
// ==/UserScript==

// insert courier name: "Unusual Enduring War Dog", "Unusual Baby Roshan" etc.
// or gems: "Ethereal Gem", "Prismatic Gem"
var cour = "Unusual Baby Roshan"; 

// effect name: Burning, Searing, Ethereal, Luminous etc; insert space if no preference 
var eff = "Ethereal" 

// color, leave empty if no preference 
var col = "" 
// Colors:
// indigo 3d68c4, blue 0097ce, violet 8232cf, teal 4ab78d,
// gold cfab31, red d03d33, orange d07733, green 51b350, lgreen b7cf33, 
// white ffffff, ruby d11fa1, polycount 37864d
// ember ffc604, etc 
// all color codes:  http://www.d2lp.com/tutorial/

// search for legacy color: 1 = yes, 0 = no 
var leg = 0; 

////////////////////////////////////////////////////////////////////////////////////////

var colors=new Array("ffffff", "ca0123", "d03d33", "d11fa1", "cfab31", "0097ce", "8232cf", "d07733", "b7cf33", "3d68c4", "4ab78d", "51b350", "37864d", "8232ed", "a1ff59", "94cad0", "ffeebc", "ff4200", "dcf2ff", "d76092", "1a3d85", "60606", "626e5b", "507dfe", "15a515", "ffca15", "5ac355", "ffc604", "f79d00", "bdb76b", "7b68ee", "bcddb3", "f0e68c", "808000", "191970", "c0c0c0", "d5e3f5");

if (cour.indexOf("Prismatic") != -1) {

    var new_eff = 1; 

} else {

    var new_eff = 0; 
}

var loungeurls = "";

var legFound = 0;

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
                
                var colpos = tradestr.indexOf("Color"); ///
                
                if (cour.indexOf("Ethereal") != -1) {
                    
                    var offset = 30; 
                     
                } else {
                
                    var offset = colpos - effpos;
                }
                    
                if (effpos != -1 || new_eff == 1) { // && effpos < colpos
                 
                    if (tradestr.substring(effpos + 7, effpos + offset).indexOf(eff) != -1 || new_eff == 1) {
                        
                        if (cour.indexOf("Ethereal") != -1) {
                    
                            var link = links.snapshotItem(i);
                                            
                            loungeurls = loungeurls + "\n" + link.href;
                            break;
                        }
                        
                        if (new_eff == 0) {
                            tradestr = tradestr.substring(effpos);
                        }
                        
                        colpos = tradestr.indexOf("Color");
                    
                        if (colpos != -1 && colpos < 80) {
                            
                            if (leg == 1) {
                                
                                legFound = 1;
                            
                                for (var k = 0; k < colors.length; k++) { 
                                
                                    if (tradestr.substring(colpos + 6, colpos + 16).indexOf(colors[k]) != -1) {
                                        
                                        legFound = 0;
                                        break;
                                    }
                                }
                                if (legFound == 1) {
                                    
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

var ev = document.createElement("div"); 
ev.innerHTML = loungeurls;                     
document.body.appendChild(ev);