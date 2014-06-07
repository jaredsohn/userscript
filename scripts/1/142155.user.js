// ==UserScript==
// @name        Light Rising Remember Number of Items
// @namespace   http://userscripts.org/users/125692
// @description AutoSelects value used for number of items for Give/Drop/Take actions
// @include        *lightrising.com*game.cgi
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1
// ==/UserScript==


//event fuction to be fire upon clicking a button in a form with a number select for storing that number in GMvariable
var storenumber=function(e) {
//alert("running");
        var parentform=e.target.form;
        var dropdowns=parentform.getElementsByTagName('select');
        var dropdownwewant=dropdowns[0];
        GM_setValue('GMNumberSelect'+e.target.value,dropdownwewant[dropdownwewant.selectedIndex].value)
        }


//TWEAK
//remember via gm variables the value of quantity dropdowns.
//first get the number dropdowns
var numberselects=document.evaluate( "//select[@name='number']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
//if we have any then for each check for gm variable and set that number selected.
//also set up listener to record the number upon it being used.

if(numberselects.snapshotLength>0){//we have some

//alert("we have: "+numberselects.snapshotLength+" selects to process");;
    //recall and set value
    var numberselectslength=numberselects.snapshotLength;
    for (i=0;i<numberselectslength;i++ ){//for each dropdown
//alert("we are processing select: "+i);
        var numberselect=numberselects.snapshotItem(i);
        //var formbutton=document.evaluate( ".//input[@type='submit']", numberselect.form, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        //var formbutton=numberselect.parentNode.firstChild;
        var formbutton=numberselect.form.getElementsByTagName('input')[0]//first input is button to press
        
        var numbervalue=GM_getValue('GMNumberSelect'+formbutton.value,-1);
//alert("recalled:"+numbervalue);
        var keeper=0;
        var testnum;    
        if (numbervalue>-1){//we have a stored value. lets try and select it.
            //first set value to first index!
            numberselect.selectedIndex=0;
            var len=numberselect.length;
            for (j=0;j<len;j++ ){//need 'j's here as nested for
                testnum=numberselect[j].value;
                if (testnum==numbervalue){
                    keeper=j;
                    break;//stop looking
                }
            }
            numberselect.selectedIndex=keeper;
        }
        //setup event for storing the value
        //setup event
        formbutton.addEventListener("click",storenumber,false);
//alert("Setup a listener");
    }
}
