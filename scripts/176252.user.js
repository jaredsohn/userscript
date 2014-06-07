// ==UserScript==
// @name        ET Porfolio Magic
// @namespace   SachinM
// @description Economic Times Portfolio enhancement
// @include     http://etportfolio.economictimes.indiatimes.com/*
// @version     0.2
// ==/UserScript==

var TRANACTIONS_TABLE_CLASS='Transac'; // name of a certain table class needed for inserting data

var AUTO_RUN_MAGIC='AUTO_RUN_MAGIC'; // setting saved to local storage

// converts 2 objects to string and checks if they are equal
function equalStrs(itm1, itm2) {
    if ((' ' + itm1 + ' ').indexOf(' ' + itm2 + ' ') > -1) {
        return true;
    } else {
        return false;
    }
}

// Gets first Element that matches the specified Class
function getFirstMatchingElementByClass(matchClass, elementTag) {
    var elems = document.getElementsByTagName(elementTag), i;
    for (i in elems) {
        if((' ' + elems[i].className + ' ').indexOf(' ' + matchClass + ' ')
                > -1) {
            return elems[i];
        }
    }
}

// append table cell at end of a row
function appendCell(target, text, cssClass) {
    var cell=target.insertCell(target.cells.length)
    cell.setAttribute('class',cssClass);
    cell.innerHTML=text;
}

// append column to the HTML table
function appendColumn(tbl, colTitle, cellCssClass) {
    var i;

    //if (equalStrs(tbl.rows[1].id,'noRecfound') && equalStrs(tbl.rows[1].style.display,'none')) {
    
        appendCell(tbl.rows[0], colTitle, cellCssClass);
        
        // open loop for each row and append cell
        for (i = 1; i < tbl.rows.length; i++) {
            appendCell(tbl.rows[i], i, cellCssClass);
        }        
    //}
}

// Goes through the Dividend rows and returns the sume of all these amounts
function calculateNetDividends() {
    var dividends=0;
    var tbl = getFirstMatchingElementByClass(TRANACTIONS_TABLE_CLASS,'table'); //('*','Transac');
    if (equalStrs(tbl.rows[1].id,'noRecfound') && equalStrs(tbl.rows[1].style.display,'none')) {
        for (i = 2; i < tbl.rows.length; i++) {
            if (tbl.rows[i].cells[1].innerHTML.contains('DIVIDEND')) {
                dividends+=parseFloat(tbl.rows[i].cells[4].innerHTML.replace(',',''));
            }
        }      
    }
    return dividends;
}

// Appends "Actual Gain Loss" value below regular Gain Loss
function appendActualGainLoss() {
    var anchorElement=document.getElementById('equityTransOvrlGainLossAbs');
    var value = parseFloat(anchorElement.innerHTML.replace(',',''));
    if (equalStrs(anchorElement.className,'red small')) {
        value=0-value;
    }
    var dividends=calculateNetDividends();
    value+=dividends;

    var parent=anchorElement.parentNode.parentNode;
    addMainTableValue(parent,'DIVIDENDS',dividends);
    addMainTableValue(parent,'ACTUAL GAIN/LOSS',value);
       
}

function addMainTableValue(parent, title, value) {
    // 1 - Adding Title
    var td=document.createElement('td');
    td.setAttribute('class', 'figure');
    td.innerHTML=title;
    parent.parentNode.children[2].appendChild(td);
    
    // 2 - adding new field
    td = document.createElement('td');
    parent.appendChild(td);
    td.setAttribute('class', 'figure');
    
    // 2A - first adding rupee symbol
    var span = document.createElement('span');
    td.appendChild(span);
    //span = document.createElement('span');
    span.setAttribute('class', 'WebRupee');
    span.innerHTML='&#x20B9; ';
    
    // 2B - now adding the value
    span = document.createElement('span');
    td.appendChild(span);
    span.setAttribute('id', 'equityTransOvrlGainLossAbs2');
    if (value<0) {
        span.className='red small';
    } else {
        span.className='green';
    }
    value=Math.abs(value);
    value=(value+'').replace(/\B(?=(\d{3})+(?!\d))/g, ','); //cool regex to set commas every 3 digits
    var txt = document.createTextNode(value); // create text node
    span.appendChild(txt);  
}

// The main process method that kicks of the extra value
function process()
{
    showAsBusy();
    
    try {
    // If on the detailed transactions page
    if (document.documentURI.contains('CompanyInfo.htm')) {

        // collapse graph by default
        //document.getElementById('pgtc').click();
        document.getElementById('perG').style.display='none';
        
        // This adds a new value below the regular GainLoss that also considers your dividend income
        appendActualGainLoss();
        document.getElementById('perG').style.display='none';
    } else if (document.documentURI.contains('ViewAssetDetails.htm')) {
        var tab1 = document.getElementById('stockListingTbl');
        appendColumn(tab1,'DUMMY','alignR');
    } else if (document.documentURI.contains('ViewPortfolio.htm')) {
        //Add Notional Gain/Loss % column
        var tab1 = getFirstMatchingElementByClass('Transac Transac1','table');
        appendColumn(tab1,'Notional Gain/Loss %','alignR');
    }
    } catch (e) {
        document.getElementById('SG_loaded').innerHTML=e;
    }
    showAsReady();
    //appendColumn(getFirstMatchingElementByClass('Transac'), 'New','amount figure2');
}

// Sets a busy status to show Turbo is working
function showAsBusy() {
    document.getElementById('SG_init').setAttribute('style','display:none');
    document.getElementById('SG_loading').setAttribute('style','display:block');
    document.getElementById('SG_loaded').setAttribute('style','display:none');
}

// Sets a ready  status to show Turbo is done.
function showAsReady() {
    document.getElementById('SG_init').setAttribute('style','display:none');
    document.getElementById('SG_loading').setAttribute('style','display:none');
    document.getElementById('SG_loaded').setAttribute('style','display:block');
}

function getMainPanel() {
    var nodee=document.getElementById('SG_MainStatus');
    if (nodee==null) {
        nodee=document.createElement('div');    
        nodee.setAttribute('class','nifty lc');
        nodee.setAttribute('id','SG_MainStatus');
        nodee.setAttribute('style','background: rgb(251, 236, 136)');
        /*var butn = document.createElement('a');
        butn.setAttribute('class','InputBtn rc');
        butn.addEventListener('click',showAsBusy,false);
        nodee.appendChild(butn);*/
        var contents ='<div id="SG_init"><a href="" id="SG_Init_Click" class="InputBtn rc" >Start Magic</a></div>\r\n';
        contents += '<div id="SG_loading" style="display:none">Magick working...<BR/><img alt="Loading..." src="images/preloader_circ_16x16.gif"></img></div>\r\n';
        contents += '<div id="SG_loaded" style="display:none">Magick Done</div>';
        contents += '<label style="font-size:small"><input id="SG_autoRunMagic" type="checkbox" >Auto Run?</label>';
        nodee.innerHTML=contents;
        document.getElementById('niftyLoading').parentNode.parentNode.appendChild(nodee);
        document.getElementById('SG_Init_Click').addEventListener('click',function(event){process();event.preventDefault();},false);
        document.getElementById('SG_autoRunMagic').addEventListener('change',function(event){GM_setValue(AUTO_RUN_MAGIC,event.target.checked)},false);
        //nodee=document.getElementById('SG_MainStatus');
    }
    return nodee;
}

function startMagic() {
    getMainPanel();
    if (GM_getValue(AUTO_RUN_MAGIC) == true) {
        document.getElementById('SG_autoRunMagic').checked=true;
        process();
    }
}

startMagic();