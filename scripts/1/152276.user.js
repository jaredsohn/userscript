// ==UserScript==
// @name          Torn - Addiction Monitor
// @namespace     http://foppe.org/greasemonkey
// @version       0.09999
// @description   Keeps track of your drug habit in the RPG Torn
// @include       http://*torn.com/*
// @copyright     2012+, Foppe HEMMINGA
// @licence       GPLv2 or higher
// @require       http://code.jquery.com/jquery-1.8.2.min.js
// @grant				GM_getValue
// @grant				GM_setValue
// @grant				GM_deleteValue
// @grant				GM_log
// ==/UserScript==

// GM_setValue("_xanax", 0);
// GM_setValue("_addic", "0");

// Pages
// console.log("document.URL = " + document.URL);
var _index = document.URL.indexOf("index.php");
var _shoot = document.URL.indexOf("itemuse.php");
var _rehab = document.URL.indexOf("page=rehab");
var _items = document.URL.indexOf("item.php");
// console.log("Plus " + _index + _shoot + _rehab + _items);
// Initialization of drug variables
var _xanax = GM_getValue("_xanax");
if (_xanax == undefined) {
    _xanax = 0;
}
var _vicod = GM_getValue("_vicod");
if (_vicod == undefined) {
    _vicod = 0;
}
var _speed= GM_getValue("_speed");
if (_speed == undefined) {
    _speed = 0;
}
var _pcp = GM_getValue("_pcp");
if (_pcp == undefined) {
    _pcp = 0;
}
var _lsd = GM_getValue("_lsd");
if (_lsd == undefined) {
    _lsd = 0;
}
var _shroo = GM_getValue("_shroo");
if (_shroo == undefined) {
    _shroo = 0;
}
var _opium= GM_getValue("_opium");
if (_opium == undefined) {
    _opium = 0;
}
var _ketam = GM_getValue("_ketam");
if (_ketam == undefined) {
    _ketam = 0;
}
var _ecsta = GM_getValue("_ecsta");
if (_ecsta == undefined) {
    _ecsta = 0;
}
var _canna = GM_getValue("_canna");
if (_canna == undefined) {
    _canna = 0;
}

var _addic = GM_getValue("_addic");
console.log("_addic raw: " + _addic);
if (_addic == undefined) {
    _addic = parseFloat(0).toFixed(2);
}
else {
    _addic = parseFloat(_addic).toFixed(2);
}
console.log( "_addic: " + _addic);

var _fgain = GM_getValue("_fgain");
if (_fgain == undefined) {
    _fgain = 0;
}

// Look for faction benefit in Personal Perks
if (_index > 0) {
//    console.log("calculating _fgain");
    if ($("h2:contains('Personal Perks')").text().length) {
        // We're on the Mother Of All index.php pages
        string = $(".bgAlt1:contains('Addiction Gain')").text();
//        console.log("string = " + string);
        if (string.length) {
            percentage = string.match(/\d?\d/);
//            console.log("percentage = " + percentage );
            if (parseInt(_fgain) != parseInt(percentage)) {
                _fgain = parseInt(percentage);
                GM_setValue("_fgain", String(_fgain));
//                console.log("GM_getValue(\"_fgain\") = " + GM_getValue("_fgain") );
            }
        }
        else {
           GM_setValue("_fgain", 0);
       }
//       console.log("GM_getValue(\"_fgain\") = " + GM_getValue("_fgain") );
    }
}


// var _fgain = 0;
// Page index.php: Output only
if (_index > 0) {
    var string = '';
    var dash = " - ";
    if (_xanax > 0) {
        string += "<span id=\"xanax\">" + _xanax + "</span> Xanax";
    }
    if (_vicod > 0) {
        if (string != '') string += " +";
        string += "<span id=\"vicod\">" + _vicod + "</span> Vicodin";
    }
    if (_speed > 0) {
        if (string != '') string += " +";
        string += "<span id=\"speed\">" + _speed + "</span> Speed";
    }
    if (_pcp > 0) {
        if (string != '') string += " +";
        string += "<span id=\"pcp\">" + _pcp + "</span> PCP";
    }
    if (_lsd > 0) {
        if (string != '') string += " +";
        string += "<span id=\"lsd\">" + _lsd + "</span> LSD";
    }
    if (_shroo > 0) {
        if (string != '') string += " +";
        string += "<span id=\"shrooms\">" + _shroo + "</span> Shrooms";
    }
    if (_opium > 0) {
        if (string != '') string += " +";
        string += "<span id=\"opium\">" + _opium + "</span> Opium";
    }
    if (_ketam > 0) {
        if (string != '') string += " +";
        string += "<span id=\"ketam\">" + _ketam + "</span> Ketamine";
    }
    if (_ecsta > 0) {
        if (string != '') string += " +";
        string += "<span id=\"ecsta\">" + _ecsta + "</span> Ecstasy";
    }
    if (_canna > 0) {
        if (string != '') string += " +";
        string += "<span id=\"canna\">" + _canna + "</span> Cannabis";
    }
    if (string != '') {
        string += " <span id=\"plus\">taken</span>";
    }
    if (string == '') {
        dash = '';
    }
    
    _addic = _addic - _fgain / 100 * _addic;
    _addic = _addic.toFixed(2);
    
    // Output colour
    var _color = "green";                
    if (_addic > 70) {
        _color = "#F88017"; // Dark Orange
    }
    if (_addic > 87.8) {
        _color = "red";
    }

    $("h1:first").append(dash + "<span style=\"color: " + _color + "\">" + string + "</span>"
          + " - " + _addic + "% addicted");
}

// Page 'drugs taken' (itemuse.php): Do administration
if (_shoot > 0) {
    if ($("td:contains('You pop the Xanax pill in to your mouth and down a glass of water.')").length) {
        _xanax++;
        GM_setValue("_xanax", String(_xanax));
        _addic = parseFloat(_addic) + parseFloat(11.2);
        GM_setValue("_addic", String(_addic));
    }
    if ($("td:contains('You pop the Vicodin pill in to your mouth and down a glass of water')").length) {
        _vicod++;
        GM_setValue("_vicod", String(_vicod));
        _addic = parseFloat(_addic) + parseFloat(3.3);
        GM_setValue("_addic", String(_addic));
    }
    if ($("td:contains('You eat a few Magic Mushrooms')").length) {
        _shroo++;
        GM_setValue("_shroo", String(_shroo));
        _addic = parseFloat(_addic) + parseFloat(1.6);
        GM_setValue("_addic", String(_addic));
    }
    if ($("td:contains('You pop the pill into your mouth and down a glass of water. After some time you feel a little happier.')").length) {
        _ecsta++;
        GM_setValue("_ecsta", String(_ecsta));
        _addic = parseFloat(_addic) + parseFloat(3.0);
        GM_setValue("_addic", String(_addic));
    }    
    if ($("td:contains('You roll up a joint and smoke the cannabis.')").length) {
        _canna++;
        GM_setValue("_canna", String(_canna));
        _addic = parseFloat(_addic) + parseFloat(0.2);
        GM_setValue("_addic", String(_addic));
    }
    if ($("td:contains('You pop the LSD pill in to your mouth and down a glass of water.')").length) {
        _lsd++;
        GM_setValue("_lsd", String(_lsd));
        _addic = parseFloat(_addic) + parseFloat(6.25);
        GM_setValue("_addic", String(_addic));
    }    
     if ($("td:contains('You snort one bump for each nostril of Ketamine.')").length) {
        _ketam++;
        GM_setValue("_ketam", String(_ketam));
        _addic = parseFloat(_addic) + parseFloat(1.9);
        GM_setValue("_addic", String(_addic));
    }
    if ($("td:contains('You smoke the Opium in a pipe. After a while you begin to feel very relaxed.')").length) {
        _opium++;
        GM_setValue("_opium", String(_opium));
        _addic = parseFloat(_addic) + parseFloat(2.8);
        GM_setValue("_addic", String(_addic));
    }    
    if ($("td:contains('You snort a line of Speed')").length) {
        _speed++;
//        alert( "_speed = " + String(_speed));
        GM_setValue("_speed", String(_speed));
        _addic = parseFloat(_addic) + parseFloat(4.2);
        GM_setValue("_addic", String(_addic));
    }
    if ($("td:contains('You snort a line of PCP.')").length) {
        _pcp++;
        GM_setValue("_pcp", String(_pcp));
        _addic = parseFloat(_addic) + parseFloat(7.6);
        GM_setValue("_addic", String(_addic));
    }
}
    
// Items page (item.php): gray out drugs that can cause addiction > 100% (adverse effects)
if (_items > 0) {
    var replaceText = "<font size='1' color='#666666'>Take</font>";
    if (_addic >= 87.8) {
        $("td:contains('Xanax') a:contains('Take')").replaceWith(replaceText);
    }
    if (_addic >= 96.7) {
        $("td:contains('Vicodin') a:contains('Take')").replaceWith(replaceText);
    }
    if (_addic >= 95.8) {
        $("td:contains('Speed') a:contains('Take')").replaceWith(replaceText);
    }
    if (_addic >= 92.4) {
        $("td:contains('PCP') a:contains('Take')").replaceWith(replaceText);
    }
    if (_addic >= 93.25) {
        $("td:contains('LSD') a:contains('Take')").replaceWith(replaceText);
    }
    if (_addic >= 97.2) {
        $("td:contains('Shrooms') a:contains('Take')").replaceWith(replaceText);
    }
    if (_addic >= 98.1) {
        $("td:contains('Opium') a:contains('Take')").replaceWith(replaceText);
    }
    if (_addic >= 95.8) {
        $("td:contains('Ketamine') a:contains('Take')").replaceWith(replaceText);
    }
    if (_addic >= 97.0) {
        $("td:contains('Ecstasy') a:contains('Take')").replaceWith(replaceText);
    }
    if (_addic >= 99.8) {
        $("td:contains('Cannabis') a:contains('Take')").replaceWith(replaceText);
    }
}

// Rehab: if succesfull reset addiction
if (_rehab > 0) {
     if($("i:contains('Our tests show that you are not addicted to drugs.')").length) {
         GM_setValue("_xanax", "0");
         GM_setValue("_vicod", "0");
         GM_setValue("_speed", "0");
         GM_setValue("_pcp", "0");
         GM_setValue("_lsd", "0");
         GM_setValue("_shroo", "0");
         GM_setValue("_opium", "0");
         GM_setValue("_ketam", "0");
         GM_setValue("_ecsta", "0");
         GM_setValue("_canna", "0");
         
         GM_setValue("_addic", "0");
     }
}

function add_drug(_drug) {
    switch(_drug) {
        case _xanax:
            _xanax++;
            GM_setValue("_xanax", String(_xanax));
            _addic = parseFloat(_addic) + parseFloat(11.2);
            GM_setValue("_addic", String(_addic));
            break;
    }
}

function reset_drug(_drug) {
    switch(_drug) {
        case _xanax:
            _xanax = 0;
            GM_setValue("_xanax", "0");
            _addic = 0;
            GM_setValue("_addic", "0");
            break;

        case _vicod:
            _vicod++;
            GM_setValue("_vicod", String(_vicod));
            _addic = parseFloat(_addic) + parseFloat(3.3);
            GM_setValue("_addic", String(_addic));
            break;

        case _shroo:
            _shroo++;
            GM_setValue("_shroo", String(_shroo));
            _addic = parseFloat(_addic) + parseFloat(1.6);
            GM_setValue("_addic", String(_addic));
            break;

        case _ecsta:
            _ecsta++;
            GM_setValue("_ecsta", String(_ecsta));
            _addic = parseFloat(_addic) + parseFloat(3.0);
            GM_setValue("_addic", String(_addic));
            break;
        
        case _canna:
            _canna++;
            GM_setValue("_canna", String(_canna));
            _addic = parseFloat(_addic) + parseFloat(0.2);
            GM_setValue("_addic", String(_addic));
            break;

        case _lsd:
            _lsd++;
            GM_setValue("_lsd", String(_lsd));
            _addic = parseFloat(_addic) + parseFloat(6.25);
            GM_setValue("_addic", String(_addic));
            break;

        case _ketam:
            _ketam++;
            GM_setValue("_ketam", String(_ketam));
            _addic = parseFloat(_addic) + parseFloat(1.9);
            GM_setValue("_addic", String(_addic));
            break;

        case _opium:
            _opium++;
            GM_setValue("_opium", String(_opium));
            _addic = parseFloat(_addic) + parseFloat(2.8);
            GM_setValue("_addic", String(_addic));
            break;

        case _speed:
            _speed++;
            GM_setValue("_speed", String(_speed));
            _addic = parseFloat(_addic) + parseFloat(4.2);
            GM_setValue("_addic", String(_addic));
            break;

        case _pcp:
            _pcp++;
            GM_setValue("_pcp", String(_pcp));
            _addic = parseFloat(_addic) + parseFloat(7.6);
            GM_setValue("_addic", String(_addic));
            break;
    }
}

$("#xanax").click(function() {
    add_drug(_xanax);
});
$("#vicod").click(function() {
    add_drug(_vicod);
});
$("#speed").click(function() {
    add_drug(_speed);
});
$("#pcp").click(function() {
    add_drug(_pcp);
});
$("#lsd").click(function() {
    add_drug(_lsd);
});
$("#shroo").click(function() {
    add_drug(_shroo);
});
$("#opium").click(function() {
    add_drug(_opium);
});
$("#ketam").click(function() {
    add_drug(_ketam);
});
$("#ecsta").click(function() {
    add_drug(_ecsta);
});
$("#canna").click(function() {
    add_drug(_canna);
});


$("#plus").dblclick(function() {
    reset_drug(_xanax);
});