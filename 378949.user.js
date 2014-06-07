// ==UserScript==
//
// @name            CivClicker Special Resource Rate
//
// @description     Calculates the average resource rate of special resources in CivClicker.
//
// @author          RevMuun (http://userscripts.org/users/579666)
//
// @homepage        http://userscripts.org/scripts/show/378949
//
// @version         1.0
// 
// @include         http://dhmholley.co.uk/civclicker.html*
//
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
//
// ==/UserScript==

var skinRateCell, herbRateCell, oreRateCell, leatherRateCell, pietyRateCell, metalRateCell;
var skinValue, herbValue, oreValue, leatherValue, pietyValue, metalValue;
var skinBuffer = [60], herbBuffer = [60], oreBuffer = [60], leatherBuffer = [60], pietyBuffer = [60], metalBuffer = [60];
var skinPrevious = 0, herbPrevious = 0, orePrevious = 0, leatherPrevious = 0, pietyPrevious = 0, metalPrevious = 0;
var skinIndex = 0, herbIndex = 0, oreIndex = 0, leatherIndex = 0, pietyIndex = 0, metalIndex = 0;

civClicker_insertHTML();
civClicker_getCells();
civClicker_getValues();

setInterval(rateLoop, 1000);

function rateLoop(){
    console.log("Calculating");
    calcSkin();
    calcHerbs();
    calcOres();
    calcLeathers();
    calcPiety();
    calcMetal();
    console.log("Calculated");
}

function calcSkin(){
    var skinCurrent = skinValue.innerHTML.replace(/\s/g, "");
    var change = skinCurrent - skinPrevious;
    skinPrevious = skinCurrent;
    
    skinBuffer[skinIndex] = change;
    skinIndex++;
    if(skinIndex===60) skinIndex = 0;
    
    var total = 0;
    for(var i=0;i<skinBuffer.length;i++){
        total += skinBuffer[i];
    }
    var avg = total/skinBuffer.length;
    
    skinRateCell.innerHTML = civClicker_colorify(Math.floor(avg*10)/10) + "/s";
}
function calcHerbs(){
    var herbCurrent = herbValue.innerHTML.replace(/\s/g, "");
    var change = herbCurrent - herbPrevious;
    herbPrevious = herbCurrent;
    
    herbBuffer[herbIndex] = change;
    herbIndex++;
    if(herbIndex===60) herbIndex = 0;
    
    var total = 0;
    for(var i=0;i<herbBuffer.length;i++){
        total += herbBuffer[i];
    }
    var avg = total/herbBuffer.length;
    
    herbRateCell.innerHTML = civClicker_colorify(Math.floor(avg*10)/10) + "/s";
}
function calcOres(){
    var oreCurrent = oreValue.innerHTML.replace(/\s/g, "");
    var change = oreCurrent - orePrevious;
    orePrevious = oreCurrent;
    
    oreBuffer[oreIndex] = change;
    oreIndex++;
    if(oreIndex===60) oreIndex = 0;
    
    var total = 0;
    for(var i=0;i<oreBuffer.length;i++){
        total += oreBuffer[i];
    }
    var avg = total/oreBuffer.length;
    
    oreRateCell.innerHTML = civClicker_colorify(Math.floor(avg*10)/10) + "/s";
}
function calcLeathers(){
    var leatherCurrent = leatherValue.innerHTML.replace(/\s/g, "");
    var change = leatherCurrent - leatherPrevious;
    leatherPrevious = leatherCurrent;
    
    leatherBuffer[leatherIndex] = change;
    leatherIndex++;
    if(leatherIndex===60) leatherIndex = 0;
    
    var total = 0;
    for(var i=0;i<leatherBuffer.length;i++){
        total += leatherBuffer[i];
    }
    var avg = total/leatherBuffer.length;
    
    leatherRateCell.innerHTML = civClicker_colorify(Math.floor(avg*10)/10) + "/s";
}
function calcPiety(){
    var pietyCurrent = pietyValue.innerHTML.replace(/\s/g, "");
    var change = pietyCurrent - pietyPrevious;
    pietyPrevious = pietyCurrent;
    
    pietyBuffer[pietyIndex] = change;
    pietyIndex++;
    if(pietyIndex===60) pietyIndex = 0;
    
    var total = 0;
    for(var i=0;i<pietyBuffer.length;i++){
        total += pietyBuffer[i];
    }
    var avg = total/pietyBuffer.length;
    
    pietyRateCell.innerHTML = civClicker_colorify(Math.floor(avg*10)/10) + "/s";
}
function calcMetal(){
    var metalCurrent = metalValue.innerHTML.replace(/\s/g, "");
    var change = metalCurrent - metalPrevious;
    metalPrevious = metalCurrent;
    
    metalBuffer[metalIndex] = change;
    metalIndex++;
    if(metalIndex===60) metalIndex = 0;
    
    var total = 0;
    for(var i=0;i<metalBuffer.length;i++){
        total += metalBuffer[i];
    }
    var avg = total/metalBuffer.length;
    
    metalRateCell.innerHTML = civClicker_colorify(civClicker_colorify(Math.floor(avg*10)/10)) + "/s";
}

function civClicker_colorify(value){
    if(value > 0){
        return "<font color=\"green\">" + value + "</font>";
    }
    else if(value < 0){
        return "<font color=\"red\">" + value + "</font>";
    }
    else{
        return "<font color=\"black\">" + value + "</font>";
    }
}

function civClicker_insertHTML(){
    var specialRecContainer = document.getElementById("specialResourcesContainer");
    var resourceTable = specialRecContainer.childNodes[3];
    
    var tbody = resourceTable.childNodes[1];
    
    for(var i=0; i<(tbody.childNodes.length)-1; i+=2){
        var newCell = tbody.childNodes[i].insertCell(-1);
        civClicker_formatCell(newCell,i, 1);
        newCell = tbody.childNodes[i].insertCell(3);
        civClicker_formatCell(newCell,i, 0);
    }
}

function civClicker_formatCell(cell, i, col){
    cell.setAttribute("id", indexToID(i, col));
    cell.innerHTML = "0/s";
    if(col===0){
        cell.cellPadding = "10px";
    }
}

function indexToID(row, col){
    var idString = "rate";
    if(col === 0){
        switch(row){
            case 0: idString = idString + "Skins"; break;
            case 2: idString = idString + "Herbs"; break;
            case 4: idString = idString + "Ore"; break;
            default: idString = idString + "FAIL"; break;
        }
    }
    else{
        switch(row){
            case 0: idString = idString + "Leather"; break;
            case 2: idString = idString + "Piety"; break;
            case 4: idString = idString + "Metal"; break;
            default: idString = idString + "FAIL"; break;
        }
    }
    return idString;
}

function civClicker_getCells(){
    skinRateCell = document.getElementById("rateSkins");
    herbRateCell = document.getElementById("rateHerbs");
    oreRateCell = document.getElementById("rateOre");
    leatherRateCell = document.getElementById("rateLeather");
    pietyRateCell = document.getElementById("ratePiety");
    metalRateCell = document.getElementById("rateMetal");
}

function civClicker_getValues(){
    skinValue = document.getElementById("skins");
    skinPrevious = skinValue.innerHTML.replace(/\s/g, "");
    herbValue = document.getElementById("herbs");
    herbPrevious = herbValue.innerHTML.replace(/\s/g, "");
    oreValue = document.getElementById("ore");
    orePrevious = oreValue.innerHTML.replace(/\s/g, "");
    leatherValue = document.getElementById("leather");
    leatherPrevious = leatherValue.innerHTML.replace(/\s/g, "");
    pietyValue = document.getElementById("piety");
    pietyPrevious = pietyValue.innerHTML.replace(/\s/g, "");
    metalValue = document.getElementById("metal");
    metalPrevious = metalValue.innerHTML.replace(/\s/g, "");
}