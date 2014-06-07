// ==UserScript==
// @version        1.0
// @name           Battle Helper
// @author         DG-Root
// @description    Forumwarz.com - Shows battle information in titlebar.
// @include        http://forumwarz.com/forums/battle

// @include        http://*.forumwarz.com/forums/battle

// ==/UserScript==
/*
History:
05.06.2010 - v1.0 - First version uploaded to userscripts.org
*/
window.strForum = document.title.split('Forumwarz - ')[1]; 
window.numPwnageLeft = 0;
window.numPwnageDone = 0;
window.numPwnageMax = 0;

window.updateBattleInfo = function(){
    // Get data from the document.
    // > Get thread pwnage.
    if(document.getElementById('enemy_property_bar_pwnage_values')!=null){
        tempArray = document.getElementById('enemy_property_bar_pwnage_values').innerHTML.split(' / ');
        numPwnageMax = (+tempArray[1]);
        numPwnageDone = (+tempArray[0]);
        numPwnageLeft = numPwnageMax-numPwnageDone;
    }

    // Set the titlebar to show information.
    document.title = numPwnageLeft+ "p";
    // Re-run the script in a second.
    setTimeout(updateINCITinfo, 1000);
}

updateBattleInfo();