// ==UserScript==
// @name           FUMFood
// @namespace      FUM
// @include        http://pooya.um.ac.ir/gateway/PuyaMainFrame.php
// @include        http://chip.um.ac.ir/portal/modules/sale/sale.php
// ==/UserScript==

function CorrectField(fieldname) {
    var elem = document.getElementById(fieldname);    
    if (elem == null)
        return 0;
    if (elem.childNodes.length == 1) {
        elem.attributes.removeNamedItem('disabled');
        elem.innerHTML = " \
            <option value='0' selected ></option> \
            <option value='1'  >فجر                                               </option> \
            <option value='2'  >پرديس                                             </option> \
            <option value='7'  >خوابگاه بقا                                       </option> \
            "
    }
                
}

var Days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
var Meal = new Array('DINNER','BRKFST');
var MealTypes = new Array('TYPE1', 'TYPE2');
for (var iDays = 0; iDays < Days.length; iDays++) {
    for (var iMeal = 0; iMeal < Meal.length; iMeal++) {
        for (var iMealTypes = 0; iMealTypes < MealTypes.length; iMealTypes++) {
            CorrectField(Meal[iMeal] + '_' + MealTypes[iMealTypes] + '_' + Days[iDays] + '_self');
        }
    }
}



//var at = elem1
//var attrib = elem.firstChild.attributes.item(1).nodeName;
//window.alert();

/*
<select name='DINNER_TYPE1_Saturday_self' id='DINNER_TYPE1_Saturday_self' 
        style="width:75%;float:right" onchange=chg("DINNER","TYPE1","Saturday","0","1389/05/30","1","1");
        lastValue="0"  Count=" 1"disabled>
    <option value='0' selected ></option>
</select>

<select name='DINNER_TYPE1_Monday_self' id='DINNER_TYPE1_Monday_self'
        style="width:75%;float:right" onchange=chg("DINNER","TYPE1","Monday","0","1389/06/01","1","1");
        lastValue="0"  Count=" 4">
    <option value='0' selected ></option>
    <option value='1'  >فجر                                               </option>
    <option value='2'  >پرديس                                             </option>
    <option value='7'  >خوابگاه بقا                                       </option>
</select>
*/