// ==UserScript==
// @name           Production Helper
// @namespace      C3isCool
// @description    Enahnces the newly added production page.
// @include        http://*.astroempires.com/empire.aspx?view=bases_production
// ==/UserScript==

//---Variables---
var listBoxes = document.evaluate("//tr[contains(@id,'row')]//select", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var inputBoxes = document.evaluate("//tbody//input[contains(@id,'quant_')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var width = document.getElementById('empire_ production').getAttribute('width');
var sever = document.getElementById('account').nextSibling.innerHTML.charAt(0);
var names = eval(GM_getValue(sever + 'names', "[]"));

var start = []
for (var i = 1; i <= listBoxes.snapshotLength; i++) {
    start[i] = Math.round(document.getElementById('timer' + i).title / 36)/100;
    inputBoxes.snapshotItem(i - 1).setAttribute('onKeyUp', "update_row(" + i + ");");
    inputBoxes.snapshotItem(i - 1).addEventListener('change', boxChange, true);
}

//---Main Line---
intiateDisplay();

//---Functions---
function intiateDisplay() {
    var master = document.createElement('td');
    master.setAttribute('colspan', '4');
    master.setAttribute('align', 'center');
    master.innerHTML = "<select name='masterList' id='masterList'><option value='Fighters'>Fighters</option><option value='Bombers'>Bombers</option><option value='Heavy Bombers'>Heavy Bombers</option><option value='Ion Bombers'>Ion Bombers</option><option value='Corvette'>Corvette</option><option value='Recycler'>Recycler</option><option value='Destroyer'>Destroyer</option><option value='Frigate'>Frigate</option><option value='Ion Frigate'>Ion Frigate</option><option value='Scout Ship'>Scout Ship</option><option value='Outpost Ship'>Outpost Ship</option><option value='Cruiser'>Cruiser</option><option value='Carrier'>Carrier</option><option value='Heavy Cruiser'>Heavy Cruiser</option><option value='Battleship'>Battleship</option><option value='Fleet Carrier'>Fleet Carrier</option><option value='Dreadnought'>Dreadnought</option><option value='Titan'>Titan</option><option value='Leviathan'>Leviathan</option><option value='Death Star'>Death Star</option><option value='Goods'>Goods</option></select>";

    var masterCount = document.createElement('input');
    masterCount.setAttribute('type', 'text')
    masterCount.setAttribute('maxLength', 5);
    masterCount.setAttribute('size', 5);
    masterCount.setAttribute('id', 'masterCount');
    master.appendChild(masterCount);

    var masterButton = document.createElement("input");
    masterButton.setAttribute("type", "button");
    masterButton.setAttribute("id", "masterButton");
    masterButton.value = "Submit";
    masterButton.addEventListener("click", masterSubmit, true);
    master.appendChild(masterButton);

    var masterHeading = document.createElement('td');
    masterHeading.setAttribute('colspan', '4');
    masterHeading.setAttribute('align', 'center');
    masterHeading.innerHTML = "Master Control";

    a = document.createElement('table');
    a.setAttribute('align', 'center');
    a.setAttribute('width', width);
    document.getElementById("empire_ production").parentNode.insertBefore(a, document.getElementById("empire_ production"));
    document.getElementById("empire_ production").parentNode.insertBefore(document.createElement('br'), document.getElementById("empire_ production"));

    var comment = document.getElementById("empire_ production").firstChild.lastChild.lastChild.appendChild(document.createElement('span'));
    comment.setAttribute('class', 'help comment');
    comment.innerHTML = "It is also possible to use the 'f' keyword (finish), e.g. 15f will have the base prod finish in 15 hours.<BR>Inorder to set a preset by time use capital letters, e.g. M,H,D,F." 
    var b = a.appendChild(document.createElement('tr'));
    var c = a.appendChild(document.createElement('tr'));
    var d = a.appendChild(document.createElement('tr'));
    c.setAttribute('align', 'center');
    c.setAttribute('id', 'c');
    b.appendChild(masterHeading);
    d.appendChild(master);

    for (var i = 0; i < 4; i++) {
        c.appendChild(document.createElement('td'))
        c.childNodes[i].appendChild(document.createElement('a'));
        c.childNodes[i].setAttribute('align', 'center');
        c.childNodes[i].setAttribute('width', '25%');
        c.childNodes[i].firstChild.innerHTML = "Set Preset " + (1 + i);
        c.childNodes[i].firstChild.name = "Preset" + (i + 1);
        c.childNodes[i].firstChild.setAttribute('id', "Preset" + (i + 1));
        c.childNodes[i].firstChild.href = 'javascript:void(1)';
        c.childNodes[i].firstChild.addEventListener('click', presetButton, true);
        var g = document.createElement('a');
        g.href = 'javascript:void(1)';
        g.innerHTML = "*";
        g.name = i+1;
        g.addEventListener('click', clearPreset, true);
        c.childNodes[i].appendChild(g);
    }
    updatePresetNames();

    for (var i = 0; i < inputBoxes.snapshotLength; i++) {
        var reset = document.createElement('a');
        reset.href = 'javascript:void(1)';
        inputBoxes.snapshotItem(i).parentNode.appendChild(reset);
        reset.name = reset.previousSibling.name;
        reset.addEventListener('click', resetInput, true);
        reset.innerHTML = 'reset';
    }
}

function clearPreset() {
    if (confirm("Clear Preset " + this.name + "?")) {
        var temp = this.name;
        temp -= 1;
        GM_setValue(sever + 'Preset' + this.name, "[]");
        names[temp] = 'Set Preset ' + this.name;
        updatePresetNames();
        GM_setValue(sever + 'names', uneval(names));
    }
}

function presetButton() {
    var info = eval(GM_getValue(sever + this.name, "[]"));
    if (info != "") {
        for (var i = 0; i < listBoxes.snapshotLength; i++) {
            listBoxes.snapshotItem(i).value = info[0][i];
            inputBoxes.snapshotItem(i).value = info[1][i];
            if (inputBoxes.snapshotItem(i).value.search('f')!=-1) {
                var needed = inputBoxes.snapshotItem(i).value.replace('f', "") - start[i + 1];
                if (needed < 0) {
                    needed = 0;
                }
                inputBoxes.snapshotItem(i).value = needed + 'h';
            }
            var row = i + 1;
            location.href = "javascript:void(update_row(" + row + "));"
        }
    } else {
        var info = [];
        info[0] = [];
        info[1] = [];

        for (var i = 0; i < listBoxes.snapshotLength; i++) {
            info[0][i] = listBoxes.snapshotItem(i).value;
            info[1][i] = inputBoxes.snapshotItem(i).value.toLowerCase();
        }
        GM_setValue(sever + this.name, uneval(info));

        var name = prompt("Enter a custom name for the preset. (optional)", this.name);
        var temp = this.name.replace("Preset", "") - 1;
        names[temp] = name;
        this.innerHTML = name;
        GM_setValue(sever + 'names', uneval(names));
    }
}

function masterSubmit() {
    if (document.getElementById('masterCount').value.search('f')==-1) {
        for (var i = 1; i <= listBoxes.snapshotLength; i++) {
            listBoxes.snapshotItem(i - 1).value = document.getElementById('masterList').value;
            if (listBoxes.snapshotItem(i - 1).value == document.getElementById('masterList').value) {
                inputBoxes.snapshotItem(i - 1).value = document.getElementById('masterCount').value;
            }
            location.href = "javascript:void(update_row(" + i + "));"
        }
    } else {
        for (var i = 1; i <= listBoxes.snapshotLength; i++) {
            listBoxes.snapshotItem(i - 1).value = document.getElementById('masterList').value;
            if (listBoxes.snapshotItem(i - 1).value == document.getElementById('masterList').value) {
                var needed = document.getElementById('masterCount').value.replace('f', "") - start[i];
                if (needed < 0) {
                    needed = 0;
                }
                inputBoxes.snapshotItem(i - 1).value = needed + 'h';
            } location.href = "javascript:void(update_row(" + i + "));"
        }
    }
}

function updatePresetNames() {
    for(var i = 0; i < names.length; i++) {
        if (names[i]) {
            document.getElementById('c').childNodes[i].firstChild.innerHTML = names[i];
        }
    }
}


function resetInput() {
    document.getElementById(this.name).value = "";
    location.href = "javascript:void(update_row(" + this.name.replace("quant_", "") + "));";
}

function boxChange() {
    GM_log(this.value.search(/f/));
    if (this.value.search('f')!=-1) {
        var needed = this.value.replace('f', "")
        needed -= start[this.name.replace("quant_", "")];
        if (needed < 0) {
            needed = 0;
        }
        this.value = needed + 'h';
        location.href = "javascript:void(update_row(" + this.name.replace("quant_", "") + "));";
    }
}
        