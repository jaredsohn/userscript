// ==UserScript==
// @name       Read Big Numbers
// @namespace  http://none
// @version    0.6
// @description  Try to add some commas to read the numbers better
// @match      http://conquest.playstarfleet.com/buildings/shipyard*
// @match	   http://conquest.playstarfleet.com/buildings/fortifications*
// @match		http://conquest.playstarfleet.com/fleet*
// @match   http://conquest.playstarfleet.com/galaxy/show*
// @match http://*.playstarfleet.com/buildings/shipyard* 
// @match	 http://*.playstarfleet.com/buildings/fortifications* 
// @match	 http://*.playstarfleet.com/fleet* 
// @match http://*.playstarfleet.com/galaxy/show* 
// @copyright  2012+, Me and I don't care if anyone copies
// ==/UserScript==

//v0.6 Added match statements to allow to work in all universes - thanks Timelord!
//Note - if you use AddResTotal, install this afterwards.  in some cases the
// listeners wont add on the fleet page to show the reses you are sending with commas
//v0.5 Added ship count to the Add to queue button.  Also workaround for using MAX button and addapted to FF
//v0.4 made FF compatible (textContent instead of innerText)
//v0.3 added change to Fleet Screen only.  Widen fields, change labels to make numbers more readable
//v0.2 Add defense pages
//globals
// var vCurrentFleet, vThisShipCount, vCount;

fMain();

function fMain(){
    
    //Find Ship counts in Current Fleet and add commas
    fAddCommasToFleetShipCount();
    fAddCommasToPendingShipCount();
    fAddCommasToDefenseCount();
    fAddCommasToShipBuild();
    
    //Add clear res display on fleet screen
    if(/\.com\/fleet|\.com\/galaxy\/show/i.test(document.location.href)) {
        //console.log (document.location.href);
        fAddClearRes();
        //fUpdateTotals();
    }
}

function addCommas(vNumber) {
    return vNumber.toLocaleString();
}

function removeX(vString) {
    return vString.replace(/^x/, "");
}

function fCCSStylesheetRuleStyle(stylesheet, selectorText, style, value){
    //copied and modified
    /* returns the value of the element style of the rule in the stylesheet
  *  If no value is given, reads the value
  *  If value is given, the value is changed and returned
  *  If '' (empty string) is given, erases the value.
  *  The browser will apply the default one
  *
  * string stylesheet: part of the .css name to be recognized, e.g. 'default'
  * string selectorText: css selector, e.g. '#myId', '.myClass', 'thead td'
  * string style: camelCase element style, e.g. 'fontSize'
  * string value optionnal : the new value
  */
    var CCSstyle = undefined, rules;
    for(var m in document.styleSheets){
        if(document.styleSheets[m].href.indexOf(stylesheet) !== -1){
            rules = document.styleSheets[m][document.all ? 'rules' : 'cssRules'];
            for(var n in rules){
                if(rules[n].selectorText == selectorText){
                    CCSstyle = rules[n].style;
                    break;
                }
            }
            break;
        }
    }
    if(value === undefined)
    {
        return CCSstyle[style];
    }
    else
    {
        return CCSstyle[style]=value;
    }
}

function fAddCommasToFleetShipCount(){
    try{
        var vCurrentFleet = document.getElementById('current_fleet').getElementsByClassName("highlight2");
        
        for (i=0;i<vCurrentFleet.length;i++) {
            vThisShipCount = vCurrentFleet[i];
            var vCount = vThisShipCount.innerHTML;
            vCount = addCommas(parseFloat(removeX(vCount)));
            vThisShipCount.innerHTML = vCount;
        }
    }
    catch(e){
    }
}

function fAddCommasToPendingShipCount(){
    try{
        var vCurrentFleet = document.getElementById('pending_items').getElementsByClassName("quantity");
        
        for (i=0;i<vCurrentFleet.length;i++) {
            vThisShipCount = vCurrentFleet[i];
            var vCount = vThisShipCount.innerHTML;
            vCount = addCommas(parseFloat(removeX(vCount)));
            vThisShipCount.innerHTML = vCount;
        }
    }
    catch(e){
    }
}

function fAddCommasToDefenseCount(){
    try{
        var vCurrentFleet = document.getElementById('current_defenses').getElementsByClassName("highlight2");
        
        for (i=0;i<vCurrentFleet.length;i++) {
            vThisShipCount = vCurrentFleet[i];
            var vCount = vThisShipCount.innerHTML;
            vCount = addCommas(parseFloat(removeX(vCount)));
            vThisShipCount.innerHTML = vCount;
        }
    }
    catch(e){
    }
}

function fAddShipNumber () {
    //Listener event to put number into box
    try{
        var vLabel = this.parentElement.getElementsByClassName("to_queue")[0];
        vLabel.textContent = addCommas(parseFloat(this.value));
    }
    catch(e){
    }
}

function fAddShipBuildListeners (vInputBox) {
    vInputBox.addEventListener("keyup",fAddShipNumber, true);
}

function fAddCommasToShipBuild(){
    try{
        var vShipList = document.getElementsByClassName("build_amount");
        for (i=0;i<vShipList.length;i++) {
            fAddShipBuildListeners (vShipList[i]);
        }
    }
    catch(e){
    }
}

function fMakeFleetFieldsWider(){
    try{
        fCCSStylesheetRuleStyle('starfleet',"#assign_fleet .cargo .send_resource","width","100px");
        fCCSStylesheetRuleStyle('starfleet',"#assign_fleet .cargo label","width","275px");
    }
    catch(e){
    }
}

function fListenerfAddCargoValue (vElement) {
    try{
        vElement.addEventListener("keyup",fAddCargoValue,true);
        vElement.addEventListener("mouseup",fAddCargoValue,true);
        vElement.addEventListener("change",fAddCargoValue,true);
        vElement.addEventListener("blur",fAddCargoValue,true);
        vElement.addEventListener("mouseout",fAddCargoValue,true);
    }
    catch(e){
    }
}

function fListenerfAddCargoValueButtons (vElement) {
    try{
        vElement.addEventListener("keyup",fAddCargoValueForButton,true);
        vElement.addEventListener("mouseup",fAddCargoValueForButton,true);
        vElement.addEventListener("change",fAddCargoValueForButton,true);
        vElement.addEventListener("blur",fAddCargoValueForButton,true);
        vElement.addEventListener("mouseout",fAddCargoValueForButton,true);
    }
    catch(e){
    }
}

function fAddListeners(){
    try{
        if(document.getElementById('send_ore')) fListenerfAddCargoValue (document.getElementById('send_ore'));
        if(document.getElementById('send_crystal')) fListenerfAddCargoValue (document.getElementById('send_crystal'));
        if(document.getElementById('send_hydrogen')) fListenerfAddCargoValue (document.getElementById('send_hydrogen'));      
        
        var vMaxButtons = document.getElementsByClassName('max');
        for (i=0;i<vMaxButtons.length;i++) {
            if (vMaxButtons[i].getAttribute("type")=="button") {
                fListenerfAddCargoValueButtons(vMaxButtons[i]);
            }
        }
    }
    catch(e){
    }
}

function fAddCargoValue(){
    try{
        var vLabel = this.nextElementSibling.textContent;
        vFirstLetter = vLabel.substring(0,1);
        vInput = addCommas(parseFloat(this.value));
        this.nextElementSibling.textContent = vFirstLetter + ": " + vInput;
    }
    catch(e) {
    }
}

function fAddCargoValueForButton (vElement) {
    try{
        var vLabel = this.nextElementSibling.nextElementSibling.textContent;
        vFirstLetter = vLabel.substring(0,1);
        vInput = addCommas(parseFloat(this.nextElementSibling.value));
        this.nextElementSibling.nextElementSibling.textContent = vFirstLetter + ": " + vInput;
        
    }
    catch(e){
    }
}

function fAddClearRes(){
    try{
        fMakeFleetFieldsWider();
        fAddListeners();
    }
    catch(e){
    }
}
