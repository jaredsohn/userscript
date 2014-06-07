// ==UserScript==
// @name       Cookie Clicker Automatic Buyer
// @version    0.62
// @description  Buys Anything you want it to
// @copyright  2012+, Qvintus
// @include     http://orteil.dashnet.org/cookieclicker/
// @grant GM_info
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// @grant GM_registerMenuCommand
// @require     http://update.sizzlemctwizzle.com/176679.js
// @run-at      document-end
// ==/UserScript==
//#################################################################
//##################### .:¨Cookie Bot¨:. ##########################
//#################################################################
var Injector, delayGolden, delayBigCookie, selectedMachines, cookieBot, goldenClicker, bigClicker, storeClicker;
//Adds the cookie bot components to the website.
function addGUI() {
    //Panel button - Only thing shown at first, works as a show/hide button.
    var panelButton = document.createElement('div');
    panelButton.id = 'CookieBotPanelButton';
    panelButton.innerHTML = '<p>Cookie Bot</p>';
    panelButton.onclick = function() {if (document.getElementById('CookieBotPanel').style.display == 'none') { document.getElementById('CookieBotPanel').style.display = 'block'; }else{document.getElementById('CookieBotPanel').style.display = 'none';} };
    document.body.appendChild(panelButton);
    
    //The actual panel with checkboxes n' shizzle
    var panelArea = document.createElement('div');
    panelArea.id = 'CookieBotPanel';
    panelArea.style.cssText = 'display:none;'
    panelArea.innerHTML = '<br /><p style="font-weight:bold;">Cookie Bot Configuration</p><br /><hr><br />';
    panelArea.innerHTML += '<label><input type="checkbox" id="autoUpgrades" />:: Auto buy upgrades</label><br/>';
    panelArea.innerHTML += '<label><input type="checkbox" id="autoMachines" />:: Auto buy machinery</label><br/><br/>';
    panelArea.innerHTML += '<label><input type="checkbox" id="autoGolden" />:: Auto click Golden Cookie</label><br/>';
    panelArea.innerHTML += '<label><input type="checkbox" id="autoBigCookie" />:: Auto click Big Cookie</label><br/><br/>';
    panelArea.innerHTML += '<label><input type="checkbox" id="autoAppease" />:: Auto appease the Elders</label><br/>';
    panelArea.innerHTML += '<label><input type="checkbox" id="forceGolden" />:: Force spawn Golden Cookie</label><br/>';
    panelArea.innerHTML += '<br/><hr> <p style="font-weight:bold;"> Advanced settings </p><br/><hr><br />';
    panelArea.innerHTML += '<label><input type="text" id="selectMachines" value="0,1,2,3,4,5,6,7,8" />:: Selective machinery</label><br/>';
    panelArea.innerHTML += '<label><input type="text" id="delayGolden" value="2000" />:: Golden Cookie spawn delay</label><br/>';
    panelArea.innerHTML += '<label><input type="text" id="delayBigCookie" value="50" />:: Big Cookie click delay</label><br/>';
    panelArea.innerHTML += '<br/><hr><p>By Qvintus</p>';
    document.body.appendChild(panelArea);
}

//Adds style rules for the cookie bot components
function addStyle() {
	var styleSheet = document.styleSheets[0];
    
    //##########Style for the panel buttone#######
    styleSheet.addRule('#CookieBotPanelButton','width:300px;height:44px;background-color:rgba(255,255,255,1);z-index:1000;position:fixed;top:31px;right:18px;box-shadow:inset 0 0 5px #000;margin:0px;padding:0px;');
    styleSheet.addRule('#CookieBotPanelButton:hover', 'cursor:pointer; font-size: 24px;');
    styleSheet.addRule('#CookieBotPanelButton p', 'margin:0px;padding:0px;line-height:44px;color:#000;text-align:center;font-size: 20px;');
    styleSheet.addRule('#CookieBotPanelButton', 'background-image: -ms-linear-gradient(bottom, #BA2323 30%, #E03E3E 65%);background-image: -moz-linear-gradient(bottom, #BA2323 30%, #E03E3E 65%);background-image: -o-linear-gradient(bottom, #BA2323 30%, #E03E3E 65%);background-image: linear-gradient(bottom, #BA2323 30%, #E03E3E 65%);background-image: -webkit-linear-gradient(bottom, #BA2323 30%, #E03E3E 65%);');
    //styleSheet.deleteRule(styleSheet.rules.length-1);
    
    //#########Style for the actual panel area
    styleSheet.addRule('#CookieBotPanel', 'top:75px;right:18px;position:fixed;width:300px;height:400px;background-color:rgba(0,0,0,0.9);display:none;margin:0px;padding:0px;z-index:1000;box-shadow:inset 0 0 6px #fff;color: #fff;font-size: 14px;');
    styleSheet.addRule('#CookieBotPanel p', 'text-align:center;');
    styleSheet.addRule('#CookieBotPanel input', 'margin:0px;padding:0px;height:15px;vertical-align: bottom;margin-right:10px;max-width:75px;');
    styleSheet.addRule('#CookieBotPanel label', 'margin-left: 15px;');
    styleSheet.addRule('#CookieBotPanel label:hover', 'cursor:pointer;');
}
function initGolden(delay) {
    goldenClicker = setInterval(function() {
    	var goldenCookie = document.getElementById('goldenCookie'), checkGolden = document.getElementById('forceGolden').checked;
        if (goldenCookie != null && document.getElementById('autoGolden').checked) {if (checkGolden) {location.href = "javascript:void( Game.goldenCookie.spawn() );";}goldenCookie.click();}
    }, delay);
}

function initBigCookie(delay) {
    bigClicker = setInterval(function() {
    	var bigCookie = document.getElementById('bigCookie');
        if (bigCookie != null && document.getElementById('autoBigCookie').checked) {bigCookie.click();}
    }, delay);
}

function checkConfig() {
    var curGolden = delayGolden, curBigCookie = delayBigCookie;
    
	delayGolden = document.getElementById('delayGolden').value;
    delayBigCookie = document.getElementById('delayBigCookie').value;
    selectedMachines = document.getElementById('selectMachines').value;
    selectedMachines = selectedMachines.split(",");
    
    if (curGolden != delayGolden || curBigCookie != delayBigCookie) {
    	clearInterval(goldenClicker);
        clearInterval(bigClicker);
        
        initGolden(delayGolden);
        initBigCookie(delayBigCookie);
    }
}

//The very bot function that does all the handy work.
function initBot() {
    checkConfig();
    storeClicker = setInterval(function() {
    	var checkUpgrades = document.getElementById('autoUpgrades').checked,
            checkMachinery = document.getElementById('autoMachines').checked,
            checkAppease = document.getElementById('autoAppease').checked;
        
        if (checkUpgrades) {var upgrades = document.getElementsByClassName('upgrade');for (var i = 0; i < upgrades.length; i++) {if(upgrades[i].onclick != null) {if(upgrades[i].onclick.toString().indexOf('[74]') == -1 && upgrades[i].onclick.toString().indexOf('[85]') == -1){upgrades[i].click();}}}}
        if (checkMachinery) {for (var x = 0; x < selectedMachines.length; x++) {var sel = document.getElementById('product'+selectedMachines[x]); if(sel.className == 'product enabled') {sel.click();}}}
        if (checkAppease) {var elderAppease=document.getElementById('upgrade0'); if (elderAppease != null) {if(elderAppease.onclick.toString().indexOf('[74]')) {elderAppease.click();} }}
    }, 1000);
    cookieBot = setInterval(function() { checkConfig(); }, 5000);
    
    //initGolden(delayGolden);
    //initBigCookie(delayBigCookie);
}

//Inject // Creation of the bot module
Injector = setInterval(function() {
	//If the store element product8 (Time Machine) exists then start executing the bot.
	//Basicly makes sure the website is done loading and the game has been loaded in aswell.
    if (document.getElementById('product8') != null) {
        addGUI();
        addStyle();
        initBot();
        clearInterval(Injector); //When creation process is done, we don't need this anymore so the interval is removed.
    }
}, 1000);