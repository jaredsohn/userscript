// ==UserScript==
// @name        GT2 listed-farm hider
// @namespace   http://userscripts.org/users/527178
// @description Makes it easier to find new farms on GT2, by hiding those that are already on the farm-list.
// @include     http://www.gettertools.com/ts6.travian.com.2/2-Region-Inactives
// @include     http://www.gettertools.com/ts6.travian.com.2/42-Search-inactives
// @version     1.1
// @grant       GM_log
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
// @require http://userscripts.org/scripts/source/107941.user.js
// ==/UserScript==
// The above library defines GM_SuperValue.set and GM_SuperValue.get

function input_FarmSource() {
    str_Input = prompt("Paste the farmlist sourcecode into the small input box\nDon't worry about the sizes!\nMake sure that all your lists are expanded in Travian before you copy the sourcecode!");
    var villages = parseVillageNames(str_Input);
    GM_SuperValue.set("FarmList",villages);
    hideFarms(villages);
    return;
}

function deleteStorage() {
    GM_deleteValue("FarmList");
    window.location.href = window.location.href;
    return;
}

var btn_Input = document.createElement("BUTTON");
btn_Input.innerHTML = "Parse FarmList";
btn_Input.addEventListener(
    "click", input_FarmSource, false
);

var locationBar = document.getElementById("locationInner");
locationBar.appendChild(btn_Input);


var btn_Clear = document.createElement("BUTTON");
btn_Clear.innerHTML = "Clear farmlist";
btn_Clear.addEventListener(
    "click", deleteStorage, false
);

var locationBar = document.getElementById("locationInner");
locationBar.appendChild(btn_Clear);

var storage = GM_SuperValue.get("FarmList","");
if(storage != "") {
    hideFarms(storage);
}

function parseVillageNames(str_Input) {
    var parser = new DOMParser()
      , dom_Input = parser.parseFromString(str_Input, "text/html");
    var raidList = dom_Input.getElementById("raidList");
    var tables = raidList.getElementsByTagName("table");
    var villages = [];
    for (var i = 0; i < tables.length; i++){
        var tempList = tables[i].getElementsByTagName("label");
        for(var j = 0; j < tempList.length; j++){
            villages.push(tempList[j]);   
        }
    }
    var villagesUniq = [];
    for (var i = 0; i < villages.length; i++){
        if(villagesUniq.indexOf(villages[i].innerHTML) >=0){
            continue;
        }
        villagesUniq.push(villages[i].innerHTML);
    }
    return villagesUniq;
}

function hideFarms(villagesUniq){
     var getterVillas = document.getElementsByClassName("tscity");
     for(var i = 0; i < getterVillas.length; i++){
        if(getterVillas[i].parentNode.className.indexOf("tablehead") != -1){
            continue;
        }
        if (villagesUniq.indexOf(getterVillas[i].innerHTML) != -1){
            getterVillas[i].parentNode.setAttribute("style","background-color: red");
        }
     }
}