// ==UserScript==
// @name       CookieClicker Automated Tasks
// @namespace  http://mrbongiolo.com/
// @version    0.1
// @description  Enable auto click of the Big Cookie and Golden Cookies. Enable auto purchase of products/upgrades. Unlock the 'Gold Hoard'.
// @match      http://orteil.dashnet.org/cookieclicker/
// @copyright  2012+, Ralf S. Bongiolo
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {
    
    var acBigCookie = false;
    var acGoldenCookies = false;
    var apProducts = false;
    var apUpgrades = false;
    var togGoldHoard = false;
    
    var timerBigCookie;
    var timerGoldenCookies;
    var timerProducts;
    var timerUpgrades;
    
    function AddCss(cssString) {
        var head = document.getElementsByTagName('head')[0];
        if(!head)
            return;
        var newCss = document.createElement('style');
        newCss.type = "text/css";
        newCss.innerHTML = cssString;
        head.appendChild(newCss);
    }
    
    function AddSettings() {
        // Add the required CSS
        AddCss("\
            #settingsButton{border-bottom: 1px solid rgb(102, 102, 102); border-right: 1px solid rgb(102, 102, 102); background: none repeat scroll 0% 0% rgb(238, 238, 238); display: block; position: fixed; overflow: auto; left: 0px; bottom: 30px; padding: 4px; z-index: 1000; color: #000; font-size: 16px;}\
            #settingsPanel{border-bottom: 1px solid rgb(102, 102, 102); border-right: 1px solid rgb(102, 102, 102); background: none repeat scroll 0% 0% rgb(238, 238, 238); color: rgb(0, 0, 0); position: fixed; overflow: auto; left: 0px; bottom: 55px; width: 172px; font: 12px sans-serif; text-align: center; display: block; z-index: 1000; padding: 8px;}\
			#settingsPanel .settingsButton{padding: 4px 6px; margin: 4px 0; cursor: pointer;}\
        ");
        
        //Add settings menu
        $('body').append(
            '<div id="settingsPanel">\
                <button id="acBigCookie" class="settingsButton">Auto Click Big Cookie (OFF)</button>\
                <button id="acGoldenCookies" class="settingsButton">Auto Click Golden Cookies (OFF)</button>\
                <button id="apProducts" class="settingsButton">Auto Purchase Products (OFF)</button>\
                <button id="apUpgrades" class="settingsButton">Auto Purchase Upgrades (OFF)</button>\
				<br /><br />\
				<button id="togGoldHoard" class="settingsButton">Loads of Golden Cookies (OFF)</button>\
            </div>'
        );
        
        // Add open settings button to page
        $("body").append('<div id="settingsButton" style="cursor: pointer;">MENU</div>');
        
        // Add the javascript
        $("#settingsPanel").hide();
        $("#settingsButton").click(function() {
            $("#settingsPanel").toggle();
        });
        
        //Auto Click Big Cookie Handler
        $('#acBigCookie').click(function() {
            if(acBigCookie) {
            	clearInterval(timerBigCookie);
                acBigCookie = false;
                $(this).text('Auto Click Big Cookie (OFF)');
            } else {
                timerBigCookie = setInterval(function(){$('#bigCookie').click();},10);
                acBigCookie = true;
                $(this).text('Auto Click Big Cookie (ON)');
            }
        });
        
        //Auto Click Golden Cookies Handler
        $('#acGoldenCookies').click(function() {
            if(acGoldenCookies) {
            	clearInterval(timerGoldenCookies);
                acGoldenCookies = false;
                $(this).text('Auto Click Golden Cookies (OFF)');
            } else {
                timerGoldenCookies = setInterval(function(){$('#goldenCookie').click();},100);
                acGoldenCookies = true;
                $(this).text('Auto Click Golden Cookies (ON)');
            }
        });
        
        //Auto Purchase Products Handler
        $('#apProducts').click(function() {
            if(apProducts) {
            	clearInterval(timerProducts);
                apProducts = false;
                $(this).text('Auto Purchase Products (OFF)');
            } else {
                timerProducts = setInterval(function(){$('#products .product.enabled').first().click();},10);
                apProducts = true;
                $(this).text('Auto Purchase Products (ON)');
            }
        });
        
        //Auto Purchase Upgrades Handler
        $('#apUpgrades').click(function() {
            if(apUpgrades) {
            	clearInterval(timerUpgrades);
                apUpgrades = false;
                $(this).text('Auto Purchase Upgrades (OFF)');
            } else {
                timerUpgrades = setInterval(function(){$('#upgrades .upgrade.enabled').first().click();},1500);
                apUpgrades = true;
                $(this).text('Auto Purchase Upgrades (ON)');
            }
        });
        
        //Toggle Gold Hoard
        $('#togGoldHoard').click(function() {
            if(togGoldHoard) {
            	Game.Lock('Gold hoard');
                togGoldHoard = false;
                $(this).text('Loads of Golden Cookies (OFF)');
            } else {
                Game.Unlock('Gold hoard');
                Game.UpgradesById[83].buy();
                $('#upgrade0').click();
                Game.goldenCookie.spawn();
                togGoldHoard = true;
                $(this).text('Loads of Golden Cookies (ON)');
            }
        });
        
    }
    
    AddSettings();
})();