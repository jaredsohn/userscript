// ==UserScript==
// @name           cRPG equipment page info addon
// @description    Adds item weight and effective WPF info to inventory page
// @namespace      crpg.addons
// @match          http://c-rpg.net/index.php?page=equipinvgear*
// @version        0.0.2
// @grant          none
// ==/UserScript==

var armorWeight = null;
var effectiveArmorWeight = null;
var weaponWeight = null;
var weightLabel = null;
var totalweightLabel = null;
var e1hWpfElement = null;
var e2hWpfElement = null;
var poleWpfElement = null;
var throwWpfElement = null;
var xbowWpfElement = null;
var archeryWpfElement = null;
var head = null;
var body = null;
var legs = null;
var hand = null;
var item1 = null; 
var item2 = null; 
var item3 = null; 
var item4 = null;
var basePT = null;
var basePD = null;
var base1hWpf = null;
var base2hWpf = null;
var basePoleWpf = null;
var baseThrowWpf = null;
var baseXbowWpf = null;
var baseArcheryWpf = null;
var isChrome = null;
var isFirefox = null;

function UpdateArmorWeight(){
    if(weightLabel != null && totalweightLabel != null && head != null && body != null && legs != null && hand != null)
    {
        var headItem = null;
        var bodyItem = null;
        var legsItem = null;
        var handItem = null;

        if(isFirefox){
            headItem = unsafeWindow.getItem(head.options[head.selectedIndex].value);
            bodyItem = unsafeWindow.getItem(body.options[body.selectedIndex].value);
            legsItem = unsafeWindow.getItem(legs.options[legs.selectedIndex].value);
            handItem = unsafeWindow.getItem(hand.options[hand.selectedIndex].value);
        }
        else{ // Chrome
            headItem = window.getItem(head.options[head.selectedIndex].value);
            bodyItem = window.getItem(body.options[body.selectedIndex].value);
            legsItem = window.getItem(legs.options[legs.selectedIndex].value);
            handItem = window.getItem(hand.options[hand.selectedIndex].value);
        }
        var weight = 0;
        effectiveArmorWeight = 0;
        armorWeight = 0;

        if(headItem != null){
            weight += headItem.weight;
            effectiveArmorWeight += 2*headItem.weight;}
        if(bodyItem != null){
            weight += bodyItem.weight;
            effectiveArmorWeight += bodyItem.weight;}
        if(legsItem != null){
            weight += legsItem.weight;
            effectiveArmorWeight += legsItem.weight;}
        if(handItem != null){
            weight += handItem.weight;
            effectiveArmorWeight += 4*handItem.weight;}
        
        armorWeight = weight.toFixed(1);
        weightLabel.innerHTML = armorWeight
        total = (parseFloat(armorWeight) + parseFloat(weaponWeight)).toFixed(1);
        totalweightLabel.innerHTML = total;
        UpdateWpfTable();
    }
}

function UpdateItemWeight(){    
    if(totalweightLabel != null && item1 != null && item2 != null && item3 != null && item4 != null)
    {
        var item1Item = null;
        var item2Item = null;
        var item3Item = null;
        var item4Item = null;

        if(isFirefox){
            item1Item = unsafeWindow.getItem(item1.options[item1.selectedIndex].value);
            item2Item = unsafeWindow.getItem(item2.options[item2.selectedIndex].value);
            item3Item = unsafeWindow.getItem(item3.options[item3.selectedIndex].value);
            item4Item = unsafeWindow.getItem(item4.options[item4.selectedIndex].value);
        }
        else{
            item1Item = window.getItem(item1.options[item1.selectedIndex].value);
            item2Item = window.getItem(item2.options[item2.selectedIndex].value);
            item3Item = window.getItem(item3.options[item3.selectedIndex].value);
            item4Item = window.getItem(item4.options[item4.selectedIndex].value);
        }

        var weight = 0;
        
        if(item1Item != null){
            weight += item1Item.weight;}
        if(item2Item != null){
            weight += item2Item.weight;}
        if(item3Item != null){
            weight += item3Item.weight;}
        if(item4Item != null){
            weight += item4Item.weight;}
        
        weaponWeight = weight.toFixed(1);
        total = (parseFloat(armorWeight) + parseFloat(weaponWeight)).toFixed(1);
        totalweightLabel.innerHTML = total;
    }
}

function CalculateWpf(baseWpf){
    // src: http://forum.melee.org/beginner%27s-help-and-guides/game-mechanic-megathread!/msg341261/#msg341261
    // Armor weight modified proficiency = base proficiency * (1 - 0.01 * effective armor weight)
    // Effective armor weight = 2*head armor weight + body armor weight + leg armor weight + 4*hand armor weight - 10
    // (Source: WaltF4, updated 31.7.2012 based on the new formula)//
    return Math.floor(baseWpf * (1 - 0.01 * (effectiveArmorWeight - 10)))
}

function UpdateWpfTable(){

    var penalty = effectiveArmorWeight - 10 > 0;
    e1hWpfElement.innerHTML = '<b>' + (penalty ? CalculateWpf(base1hWpf) : base1hWpf) + '</b>/' + base1hWpf;
    e2hWpfElement.innerHTML = '<b>' + (penalty ? CalculateWpf(base2hWpf) : base2hWpf) + '</b>/' + base2hWpf;
    epolewpfElement.innerHTML = '<b>' + (penalty ? CalculateWpf(basePoleWpf) : basePoleWpf) + '</b>/' + basePoleWpf;
    var tmp = baseThrowWpf - 11*basePT;
    throwWpfElement.innerHTML = '<b>' + (penalty ? (tmp > 0 ? CalculateWpf(tmp) : 0) : baseThrowWpf) + '</b>/' + baseThrowWpf;
    xbowWpfElement.innerHTML = '<b>' + (penalty ? CalculateWpf(baseXbowWpf) : baseXbowWpf) + '</b>/' + baseXbowWpf;
    tmp = baseArcheryWpf - Math.max(14*basePD - (1.5^basePD), 0);
    archeryWpfElement.innerHTML = '<b>' + (penalty ? (tmp > 0 ? CalculateWpf(tmp) : 0) : baseArcheryWpf) + '</b>/' + baseArcheryWpf;
}

function EndIndexOf(text, search){
    if(text != null && search != null){
        var ind = text.indexOf(search);
        if(ind > -1)
            return ind + search.length;
    }
}

function LoadWpfValues(){
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'http://c-rpg.net/index.php?page=charstats', false );
    xmlHttp.send( null );
    var data = xmlHttp.responseText;

    var start = EndIndexOf(data, 'id="wpfOneHandedField" value="');
    var val = data.substring(start, data.indexOf('"', start));
    base1hWpfTemp = parseInt(val);

    start = EndIndexOf(data, 'id="wpfTwoHandedField" value="');
    val = data.substring(start, data.indexOf('"', start));
    base2hWpfTemp = parseInt(val);

    start = EndIndexOf(data, 'id="wpfPolearmField" value="');
    val = data.substring(start, data.indexOf('"', start));
    basePoleWpfTemp = parseInt(val);

    start = EndIndexOf(data, 'id="wpfThrowingField" value="');
    val = data.substring(start, data.indexOf('"', start));
    baseThrowWpf = parseInt(val);

    start = EndIndexOf(data, 'id="wpfCrossbowField" value="');
    val = data.substring(start, data.indexOf('"', start));
    baseXbowWpf = parseInt(val);

    start = EndIndexOf(data, 'id="wpfArcheryField" value="');
    val = data.substring(start, data.indexOf('"', start));
    baseArcheryWpf = parseInt(val);

    start = EndIndexOf(data, 'id="skillPowerDrawField" value="');
    val = data.substring(start, data.indexOf('"', start));
    basePD = parseInt(val);

    start = EndIndexOf(data, 'id="skillPowerThrowField" value="');
    val = data.substring(start, data.indexOf('"', start));
    basePT = parseInt(val);

    base1hWpf = Math.floor((Math.max(base2hWpfTemp*0.7-30, 0) + Math.max(basePoleWpfTemp*0.7-30, 0)) * 0.3 + base1hWpfTemp);
    base2hWpf = Math.floor((Math.max(base1hWpfTemp*0.7-30, 0) + Math.max(basePoleWpfTemp*0.7-30, 0)) * 0.3 + base2hWpfTemp);
    basePoleWpf = Math.floor((Math.max(base1hWpfTemp*0.7-30, 0) + Math.max(base2hWpfTemp*0.7-30, 0)) * 0.3 + basePoleWpfTemp);
    e1hWpfElement = document.getElementById('effective1hWpf');
    e2hWpfElement = document.getElementById('effective2hWpf');
    epolewpfElement = document.getElementById('effectivePoleWpf');
    throwWpfElement = document.getElementById('effectiveThrowWpf');
    xbowWpfElement = document.getElementById('effectiveXbowWpf');
    archeryWpfElement = document.getElementById('effectiveArcheryWpf');
}

function Init(){
    var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
    isChrome = !!window.chrome && !isOpera;              // Chrome 1+

    weightLabel = document.getElementById('armorweight');
    totalweightLabel = document.getElementById('totalweight');
    totalweightLabel = document.getElementById('totalweight');
    head = document.getElementById('itemheadvalue');
    body = document.getElementById('itembodyvalue');
    legs = document.getElementById('itemlegvalue');
    hand = document.getElementById('itemhandvalue');
    item1 = document.getElementById('itemweapon1value');
    item2 = document.getElementById('itemweapon2value');
    item3 = document.getElementById('itemweapon3value');
    item4 = document.getElementById('itemweapon4value');
    
    AddItemChangedEvent(head, UpdateArmorWeight);
    AddItemChangedEvent(body, UpdateArmorWeight);
    AddItemChangedEvent(legs, UpdateArmorWeight);
    AddItemChangedEvent(hand, UpdateArmorWeight);
    AddItemChangedEvent(item1, UpdateItemWeight);
    AddItemChangedEvent(item2, UpdateItemWeight);
    AddItemChangedEvent(item3, UpdateItemWeight);
    AddItemChangedEvent(item4, UpdateItemWeight);
    LoadWpfValues();
}

function AddItemChangedEvent(el, func){
    if(el != null){
        if (el.addEventListener){
            el.addEventListener('change', func, false);}
        else{
            el.attachEvent('change', func);}
        }
}

var upkeepElement = document.getElementById('upkeep');
var saveEl = document.getElementsByName('save');

if(upkeepElement != null){
    awdiv = document.createElement('div');
    awdiv.className = 'labelvalue groupstart';
    awspan = document.createElement('span');
    awspan.id = 'armorweight';
    awspan.className = 'value';
    awlabel = document.createElement('span');
    awlabel.className = 'label';
    awlabel.innerHTML = 'Armor weight';
    awdiv.appendChild(awspan);
    awdiv.appendChild(awlabel);
    upkeepElement.parentNode.parentNode.appendChild(awdiv);
    
    twdiv = document.createElement('div');
    twdiv.className = 'labelvalue groupstart';
    twspan = document.createElement('span');
    twspan.id = 'totalweight';
    twspan.className = 'value';
    twlabel = document.createElement('span');
    twlabel.className = 'label';
    twlabel.innerHTML = 'Total weight';
    twdiv.appendChild(twspan);
    twdiv.appendChild(twlabel);
    upkeepElement.parentNode.parentNode.appendChild(twdiv);

    if(saveEl != null && saveEl.length > 0){
        gridr = document.createElement('div');
        gridr.className = 'gridrow';
        gridc = document.createElement('div');
        gridc.className = 'gridcol full';
        wpft = document.createElement('div');
        wpft.className = 'header2';
        wpfh = document.createElement('h1');
        wpfh.innerHTML = 'Stat modifiers';
        desc = document.createElement('div');
        desc.className = 'desc';
        desct = document.createElement('span');
        desct.innerHTML = 'Approximate effective WPF with selected equipment.';
        wt = document.createElement('div');
        wt.className = 'gridrow';
        wt.Id = 'wpfTable';
        wt.innerHTML = '<table style=\'border=0px; margin-left:7px;margin-top:10px\'>'+
                        '<tr><td style="padding-right:10px">One Handed:</td><td id=\'effective1hWpf\'></td></tr>'+
                        '<tr><td>Two Handed:</td><td id=\'effective2hWpf\'></td></tr>'+
                        '<tr><td>Polearm:</td><td id=\'effectivePoleWpf\'></td></tr>' +
                        '<tr><td>Throwing:</td><td id=\'effectiveThrowWpf\'></td></tr>' +
                        '<tr><td>Crossbow:</td><td id=\'effectiveXbowWpf\'></td></tr>' +
                        '<tr><td>Archery:</td><td id=\'effectiveArcheryWpf\'></td></tr></table>';

        desc.appendChild(desct);
        wpft.appendChild(wpfh);
        wpft.appendChild(desc);
        gridc.appendChild(wpft);
        gridr.appendChild(gridc);
        pnode = saveEl[0].parentNode.parentNode.parentNode;
        pnode.insertBefore(document.createElement('br'), pnode.nextSibling);
        pnode.insertBefore(gridr, pnode.nextSibling);
        pnode.insertBefore(wt, pnode.nextSibling);
    }
    
    Init();
    UpdateArmorWeight();
    UpdateItemWeight();
}