// ==UserScript==
// @name       Osimulate DSU Calc
// @namespace  http://udkm.ch
// @version    2.1
// @description  click the button to get the DSU Win of the Attacker (2:1:1 Ratio)
// @match      http://*.osimulate.com/*
// @match      http://osimulate.com/*
// @copyright  2012+, Alexander Murray
// ==/UserScript==

// changelog 1.9
// fixed negative thousand separator (-.123.123)

// Logic
////////////////////////////////////////////////////////////////////////////////
function calcToDSU() {
    var result, resources = new Array(), raw, pos, i = 1, resultDiv, rawArr = new Array(), ratio = new Array(); 

    raw = document.getElementById('tdMediaGuadagnoAttaccante').innerHTML;
    rawArr = raw.split(', ');
    // loop met/kris/deut
    while (i<4) {
        pos = rawArr[i].search(' ');
        resources[i] = rawArr[i].substring(0, pos);
        resources[i] = resources[i].replace(/\./g,'');
        i++;
    }
//    ratio = getRatio();
/* temporary fix */
ratio[0] = '2';
ratio[1] = '1';
ratio[2] = '1';
/* temporary fix */
    
    result = parseInt((parseInt(resources[1])/ratio[0])+(parseInt(resources[2])/ratio[1])+(parseInt(resources[3])/ratio[2]));
    result = format(result);
    
    resultDiv = document.getElementById('dsu-calc-result');
    resultDiv.innerHTML = result+' DSU';
}

// thanks baavgai (http://www.dreamincode.net/forums/user/52176-baavgai/)
function format(number) {
    var result = '', a = number.toString().split(''), ct = (a.length % 3) + 1;
    for(var i=0; i<a.length; i++) {
        if (--ct < 1) {
            if (i!=0) {
                result += '.';
            }
            ct = 3;
        }
        result += a[i];
    }
    if (result.indexOf('-.')>-1) {
            result = result.replace('-.', '-');
    }
    return result;
}



//function getRatio() {
//    var ratio = new Array (document.getElementById('dsu-ratio-met').value, document.getElementById('dsu-ratio-kri').value, doctype.getElementById('dsu-ratio-deu').value);
//    if (ratio[0] <= 0) {
//        ratio[0] = 2.5;
//    }
//    if (ratio[1] <= 0) {
//        ratio[1] = 1.5;
//    }
//    if (ratio[2] <= 0) {
//        ratio[2] = 1;
//    }
//    return ratio;
//}


// GUI Builder
////////////////////////////////////////////////////////////////////////////////
function addBox() {
    var box, parent;
    
    // create
    box = adiv('dsu-calc');
    parent = document.body.getElementsByTagName('div')[5];
    
    // set attributes
    box.setAttribute('class', 'ui-widget-content ui-corner-all');
    
    // append
    parent.appendChild(box);
}

function addHeader(text) {
    var boxHeader, boxHeaderWrap, boxHeaderText, dsuDiv;
    
    // create
    dsuDiv = document.getElementById('dsu-calc');
    boxHeader = adiv();
    boxHeaderWrap = adiv();
    boxHeaderText = atext(text);
    
    // set attributes
    boxHeaderWrap.setAttribute('style', 'font-size:medium;text-align:center;clear:both;');
    boxHeader.setAttribute('class', 'ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all');
    
    // append
    boxHeaderWrap.appendChild(boxHeaderText);
    boxHeader.appendChild(boxHeaderWrap);
    dsuDiv.appendChild(boxHeader);
}

function addButton() {
    var btn, dsuDiv;
    
    // create
    dsuDiv = document.getElementById('dsu-calc');
    btn = ainput('button', 'dsu-calc-getresult', 'Get Result');
    
    // set attributes
    btn.addEventListener('click', calcToDSU);
    
    // append
    dsuDiv.appendChild(btn);    
}

function addResult() {
    var dsuDiv, resDiv;
    
    // create
    dsuDiv = document.getElementById('dsu-calc');
    resDiv = adiv('dsu-calc-result');
    
    // set attribute
    resDiv.setAttribute('style', 'float:right;margin:2px;padding:3px;');
    
    // append
    dsuDiv = document.getElementById('dsu-calc');
    dsuDiv.appendChild(resDiv);    
}

//function addRatio() {
//    var inputMet, inputKri, inputDeu, dsuDiv, ratioDiv, textMet, textKri, textDeu
//    
//    // create
//    ratioDiv = adiv('dsu-calc-ratio-div');
//    inputMet = ainput('text', 'dsu-ratio-met', '2.5');
//    inputKri = ainput('text', 'dsu-ratio-kri', '1.5');
//    inputDeu = ainput('text', 'dsu-ratio-deu', '1');
//    textMet = atext('Met. ');
//    textKri = atext('Kri. ');
//    textDeu = atext('Deu. ');
//    dsuDiv = document.getElementById('dsu-calc');
//    
//    // append
//    ratioDiv.appendChild(textMet);
//    ratioDiv.appendChild(inputMet);
//    ratioDiv.appendChild(textKri);
//    ratioDiv.appendChild(inputKri);
//    ratioDiv.appendChild(textDeu);
//    ratioDiv.appendChild(inputDeu);
//    dsuDiv.appendChild(ratioDiv);
//}
//
//function addLog() {
//    var dsuDiv;
//    
//    // create & append
//    dsuDiv = document.getElementById('dsu-calc');
//    dsuDiv.appendChild(adiv('dsu-calc-log'));
//}
//
//function addCss() {
//    var styleElement, cssCode;
//    
//    // create
//    cssCode = document.createTextNode('#dsu-calc-ratio-div {float:left;} #dsu-ratio-met #dsu-ratio-kri #dsu-ratio-deu {width:10px;}');
//    styleElement = document.createElement("style")
//    
//    // set attribute
//    styleElement.setAttribute('type', 'text/css');
//    
//    // append
//    styleElement.appendChild(cssCode);
//    document.head.appendChild(styleElement);
//}

// html element creators
////////////////////////////////////////////////////////////////////////////////
function atext(text) {
    return document.createTextNode(arguments[0]);
}

function ainput(type, id, value) {
    var input = document.createElement('input');
    if (typeof arguments[0] != 'undefined') {
        input.setAttribute('type', arguments[0]);
    } else {
        input.setAttribute('type', 'text');
    }
    if (typeof arguments[1] != 'undefined') {
        input.setAttribute('id', arguments[1]);
    }
    if (typeof arguments[2] != 'undefined') {
        input.setAttribute('value', arguments[2]);
    } else {
        input.setAttribute('value', "");        
    }
    return input;
}

function adiv(id) {
    var div = document.createElement('div');
    if (typeof arguments[0] != 'undefined') {
        div.setAttribute('id', arguments[0]);
    }
    return div;    
}

// Main Function
////////////////////////////////////////////////////////////////////////////////

function createDSUCalc() {
    addBox();
    addHeader('DSU Calc');
    addButton();
    addResult();
//    addHeader('Ratio');
//    addRatio();
//    addHeader('Log');
//    addLog();
//    addCss();
}

createDSUCalc();