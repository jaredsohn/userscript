// ==UserScript==
// @name        COE_status_update_PV
// @namespace   coe_tool
// @version     0.0.7
// @updateUrl   https://userscripts.org/scripts/source/178497.meta.js
// @downloadUrl https://userscripts.org/scripts/source/178497.user.js
// @include     http://dev-wued002/COE/DMRequestChangeStatus.aspx?requestID=*
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

   check_set_element('ddCreation',12,-1);
   check_set_element('ddQA',7,-1);
   check_set_element('ddCOESpecialist',208,-1);   
   check_set_element('ddDBMStatus',7,3);    
   check_set_element('ddDBMStatus',7,5); 
   check_set_element('ddDBMStatus',3,-1);
   check_set_element('ddDBMStatus',3,1);
   check_set_element('ddDBMStatus',3,2);
if(confirm('Automaticky nastavit?')){   
 document.evaluate("//input[@value='Submit' and @type='submit' and contains(@class, 'yellowbutton-small')]", document, null, 9, null).singleNodeValue.click();
}
}