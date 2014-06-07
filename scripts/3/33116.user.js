// ==UserScript==
// @name           LJ: search defaults
// @namespace      http://www.afunamatata.com/greasemonkey/
// @description    Set your default search type
// @include        http://www.livejournal.com*
// @include        http://*.livejournal.com/*.html
// @exclude        http://www.livejournal.com/admin/statushistory.bml*
// ==/UserScript==

/*=========================================
 * Options are:
 *  int             ==> Interest
 *  region          ==> Region 
 *  nav_and_user    ==> Site & User
 *  faq             ==> FAQ
 *  email           ==> email
 *  im              ==> IM Info
 *=========================================*/

var type = document.getElementsByName("type")[0];
if(type && type.tagName=='SELECT') 
{
    // create the default type selector
    createDefaultSelect(type);

    // if you have no defaults set, do not change anything
    var savedDefault = GM_getValue("default");
    if(savedDefault) 
    {
        type.value=savedDefault;
    }

}

function createDefaultSelect(type) 
{
    var selectDefault = document.createElement("option");
    selectDefault.text=">> default";

    selectDefault.addEventListener("click", function() {
        var selected = prompt("Type in your desired default: int, region, nav_and_user, faq, email, im");
        GM_setValue("default",selected);
        type.value=selected;
    }, false);
    
    type.appendChild(selectDefault);
    
}
