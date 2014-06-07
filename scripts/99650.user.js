// ==UserScript==
// @name AmbrosiaLinkRemover
//
// @version 0.3
//
// @history 0.3 Removal of the dutch wood banner
// @history 0.2 Added removal of the Archive link from the in and outgoing mail
// @history 0.1 Removes most of the Ambrosia links you probably never use
//
// @namespace ikariamScript
// @description Removes most of the Ambrosia links in the game which you probably never use.
// @include http://s*.ikariam.*
// ==/UserScript==

var SUC_script_num = 99650; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000               <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

var stuff_to_remove = [
    "//div[@id='facebook_button']",
    "//div[@id='tradeRoute']",
    "//div[@id='setPremiumTransports']",
    "//div[@id='setPremiumJetPropulsion']",
    "//div[@id='cizitensOrderButton']",
    "//div[@id='assignCulturalGoods']",
    "//div[@class='addRoute']",
    "//table[@class='premiumOffer twoCols']",
    "//table[@class='premiumOffer']",
    "//tr[@class='capacitiesTableBonus ']",	
    "//span[@class='right']",
    "//span[@style='float: right; padding: 5px; margin-right: 5px;']",
    "//div[@id='viewDiplomacyImperium']",
    "//div[@id='reportInboxLeft']",	
    "//div[@id='researchLibrary']",	
    "//div[@id='viewResearchImperium']",
    "//div[@id='viewMilitaryImperium']",
    "//a[@title='Archief']",
    "//a[@class='plusteaser']",
    "//img[@src='/skin/banner/NL_IK_holzbonus_468x60.jpg']",
];

function $x(p, context) {
    if (!context) context = document;
    var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
}

stuff_to_remove.forEach(
    function(xpath) {
        $x(xpath).forEach(
            function(item) {
                item.parentNode.removeChild(item);
            }
        );
    }
);