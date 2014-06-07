// ==UserScript==
// @name           Shintolin Remember Last Weapon
// @namespace      http://userscripts.org/users/125692
// @description    Remembers last weapon used and autoselects it.
// @include        http://www.shintolin.co.uk/game.cgi
// @include        *shintolin.co*game.cgi
// ==/UserScript==
(function() {

//select any remembered weapon
var gab=document.getElementsByClassName("gamebox actionbox")[0];
var attackbuttons=document.evaluate(
                    ".//input[@value='Attack']",
                    gab,
                    null,
                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                    null);//look for attack button

if(attackbuttons.snapshotLength>0){
    var attackbutton=attackbuttons.snapshotItem(0);//first input named attack
    attackbutton.id='AttackButton';
    var dropdowns=attackbutton.parentNode.getElementsByTagName('select');
    var dropdownwewant=dropdowns[1];
    var dropdownoptions=dropdownwewant.getElementsByTagName('option')
    var weaponvalue=GM_getValue('GMweaponvalue',-1);
    var keeper=0;
    if (weaponvalue>0){//we have a weapon value. lets try and select it.
        for (i=0;i<dropdownoptions.length;i++ ){
            test=dropdownoptions[i].value;
            if (test==weaponvalue){
                keeper=i;
                break;//stop looking
            }
        }
        dropdownwewant.selectedIndex=keeper;
    }
}

//event fuction to be fire upon clicking attack button
var storeattack=function(e) {
    var attackform=e.target.parentNode;
    var dropdowns=attackform.getElementsByTagName('select');
    var dropdownwewant=dropdowns[1];
    GM_setValue('GMweaponvalue',dropdownwewant[dropdownwewant.selectedIndex].value)
}

//setup event
if(document.getElementById('AttackButton')){
    document.getElementById('AttackButton').addEventListener("click",storeattack,true);
}

//EOF
})();