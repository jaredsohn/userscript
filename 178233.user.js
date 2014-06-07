// ==UserScript==
// @name        COE Status Update DM
// @namespace   coe_tool
// @include     http://dev-wued002/COE/DMRequestChangeStatus.aspx?requestID=*
// @version     0.0.4
// @updateUrl   https://userscripts.org/scripts/source/178233.meta.js
// @downloadUrl https://userscripts.org/scripts/source/178233.user.js
// ==/UserScript==

window.addEventListener ("load", LocalMain, false);

function check_set_element(element,val,changeif="N/A"){
 var sel = document.getElementById(element);
// alert(sel.value);
if(sel.value==changeif || changeif=="N/A"){
    for(var i, j = 0; i = sel.options[j]; j++) {
        if(i.value == val) {
            sel.selectedIndex = j;
            break;
        }
    }
    return true;
}else{
    return false;
}


}

function LocalMain ()
{
   check_set_element('ddCOESpecialist',208,-1);   
   check_set_element('ddDBMStatus',7,-1);
   check_set_element('ddDBMStatus',7,1);
   check_set_element('ddDBMStatus',7,2);
   check_set_element('ddDBMStatus',7,3);
   check_set_element('ddDBMStatus',7,4);
   check_set_element('ddDBMStatus',7,5);
   check_set_element('ddDBMStatus',7,6);
   check_set_element('ddDMStatus',11,7);
   check_set_element('ddDMStatus',11,-1);
   check_set_element('ddDMStatus',11,2);
if(confirm('LTS?')){   
 document.evaluate("//input[@value='Submit' and @type='submit' and contains(@class, 'yellowbutton-small')]", document, null, 9, null).singleNodeValue.click();
}
}