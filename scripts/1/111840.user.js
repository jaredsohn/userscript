// ==UserScript==
// @name           DS_RetimeHelper
// @version	   0.11
// @author	   Kevin Möchel
// @namespace      KSTM.Javascript.DS
// @description	   Ändern der Truppenanzahl im Confirm-Bildschirm
// @include        http://de*.die-staemme.de/game.php?village=*&screen=place&try=confirm*
// ==/UserScript==


var api = typeof unsafeWindow != 'undefined' ? unsafeWindow.ScriptAPI : window.ScriptAPI;
api.register( 'DS_RetimeHelper' ,7.4, 'Kevin Möchel', 'max.mustermann@innogames.de' );

var head = document.getElementsByTagName("head")[0];
var gamedata = JSON.parse(head.innerHTML.match(/var game_data = (\{.+\})\;/)[1]);
var villageID = gamedata.village.id;

var actualInputs = getActualInputs();

function set(key, value) {
    var outer = value.join(";");
    GM_setValue(key, outer);
}

function get(key) {
    var value = GM_getValue(key, new Array());
    if (value.length) {
        var array = new Array(value.split(";").length);
        var tempArray = value.split(";");

        for (var i = 0; i < tempArray.length; i++) {
            var inner = new Array(2);
            var splitted = tempArray[i].split(",");

            inner[0] = splitted[0];
            inner[1] = new Array(splitted.length - 1);
            for (var j = 0; j < inner[1].length; j++) {
                inner[1][j] = splitted[j + 1];
            }

            array[i] = inner;
        }
        return array;
    }
    else {
        return new Array();
    }
}

function getOptions() {
    var attacks = get(villageID);
    for (var i = 0; i < attacks.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", i.toString());
        option.addEventListener("mouseover", preview, null);
        option.addEventListener("mouseout", depreview, null);
        option.innerHTML = attacks[i][0].split("~")[1];
        select.options[i] = option;
    }
}

function getActionForm() {
    return document.getElementsByTagName("form")[0];
}

function getInputs() {
    return getActionForm().getElementsByTagName("input");
}

function getAttackName() {
    return getActionForm().getElementsByClassName("vis")[0].getElementsByTagName("a")[0].href + "~" + getActionForm().getElementsByClassName("vis")[0].getElementsByTagName("a")[0].innerHTML;
}

function getActualInputs() {
    var inputs = getInputs();
	var toSub = 1;
	if(document.getElementById("buttonsTd")) {
		toSub = 4;
	}
    var inputValues = new Array(inputs.length - toSub);
    var attackData = new Array(2); 
    attackData[0] = getAttackName();
    for (var i = 0; i < inputs.length - toSub; i++) {
        inputValues[i] = inputs[i].value;
    }

    attackData[1] = inputValues;
    return attackData;
}

function getUnits() {
    return getActionForm().getElementsByClassName("unit-item");
}

function saveAttack() {
    try {
        var actualValues = get(villageID);
        actualValues.push(getActualInputs())
        set(villageID, actualValues);
    } catch (e) {
        alert(e);
    }
}

function displayNewUnitAmount(newUnits) {
    var units = getUnits();
    for (var i = 0; i < newUnits.length; i++) {
        units[i].innerHTML = newUnits[i];
        if (newUnits[i] == 0) {
            units[i].setAttribute("class", "unit-item hidden");
        } else {
            units[i].setAttribute("class", "unit-item");
        }
    }
}

function restoreAttack(attackData) {
    var inputs = attackData[1];
    var oldInputs = getInputs();
    for (var i = 0; i < inputs.length; i++) {
        oldInputs[i].value = inputs[i];
    }

    displayNewUnitAmount(inputs.slice(5));
}

function setGoal(linkName) {
	var link = getActionForm().getElementsByClassName("vis")[0].getElementsByTagName("a")[0];
	link.innerHTML = linkName.split("~")[1];
	link.setAttribute("href", linkName.split("~")[0]);
}

function preview() {
	var attack = get(villageID)[this.value];
    displayNewUnitAmount(attack[1].slice(5));
	setGoal(attack[0]);
} 

function depreview() {
    displayNewUnitAmount(actualInputs[1].slice(5));
	setGoal(actualInputs[0]);
}

function clearOptions() {
    select = document.getElementById("attackSelect");
    for (var i = 0; i < select.options.length; ) {
        select.options[i] = null;
    }
}

//Create Table
var submit = document.getElementById("troop_confirm_go");
var table = document.createElement("table");

table.setAttribute("ID", "retimeHelperTable");
table.innerHTML = "<tr><td id ='toggleSettings' valign='top'></td><td id = 'selectAttackTd' style='display:none'><p style='font-size: 9px'>Angriff auswählen</p></td><td id = 'buttonsTd' valign='top' style='display:none'></td></tr>";
submit.parentNode.insertBefore(table, submit.nextSibling);

//Create Open-/Closelink
var settings = document.createElement("a");
settings.setAttribute("href", "#");
settings.setAttribute("style", "font-size: 9px");
settings.innerHTML = "> RetimeHelper";

settings.addEventListener("click", function () {
    if (this.innerHTML == "&gt; RetimeHelper") {
        this.innerHTML = "v RetimeHelper";
        document.getElementById("selectAttackTd").setAttribute("style", "");
        document.getElementById("buttonsTd").setAttribute("style", "");
    }
    else {
        this.innerHTML = "> RetimeHelper";
        document.getElementById("selectAttackTd").setAttribute("style", "display:none");
        document.getElementById("buttonsTd").setAttribute("style", "display:none");
    }
}, null);

document.getElementById("toggleSettings").appendChild(settings);

//Create Select
var select = document.createElement("select");
select.setAttribute("id", "attackSelect");
select.setAttribute("label", "Angriff auswählen");
select.setAttribute("size", "5");
getOptions();
document.getElementById("selectAttackTd").appendChild(select);

//Button Speichern
var buttonSave = document.createElement("input");
buttonSave.setAttribute("type", "button");
buttonSave.setAttribute("value", "Speichern");
buttonSave.addEventListener("click", function () { saveAttack(); getOptions(); }, null);

//Button Ersetzen
var buttonReplace = document.createElement("input");
buttonReplace.setAttribute("type", "button");
buttonReplace.setAttribute("value", "Ersetzen");
buttonReplace.addEventListener("click", function () {
	var attack = get(villageID)[document.getElementById("attackSelect").selectedIndex];
    restoreAttack(attack);
    getActionForm().getElementsByClassName("vis")[0].setAttribute("style", "color:red");
	setGoal(attack[0]);
	actualInputs = getActualInputs();
}, null);

//Button Löschen
var buttonDelete = document.createElement("input");
buttonDelete.setAttribute("type", "button");
buttonDelete.setAttribute("value", "Clear");
buttonDelete.addEventListener("click", function () { GM_deleteValue(villageID); clearOptions(); }, null);

var buttonsTd = document.getElementById("buttonsTd");
buttonsTd.appendChild(buttonSave);
buttonsTd.appendChild(buttonReplace);
buttonsTd.appendChild(buttonDelete);