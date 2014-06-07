// ==UserScript==
// @name         Nexus War Pet Counter
// @namespace    http://www.abnormalcy.org/
// @description  Submits your faction's infusions that you make or come across to a central database.
// @include      http://*nexuswar.com/map/*
// ==/UserScript==

var plurals = new Array();
plurals['Homonculus'] = 'Homonculi';
plurals['Fossil Monstrosity'] = 'Fossil Monstrosities';
plurals['Wheel of Righteousness'] = 'Wheels of Righteousness';
plurals['Tentacle of G\'Nak'] = 'Tentacles of G\'Nak';

function countPets() {
    var elem=document.getElementById('locdesc').innerHTML;
    var results=elem.match(/(?:\(|Pet\(\'\d+?\'\)\">)[^\(\)1234567890\.<>]+(?:\)|<\/a>)<img/g);
    
    var classes=new Array();
    if (!results) 
        return;
    for (var i=0; i<results.length; i++) {
        /\(?(A|An) ([\'\w\s]+)\)?/.exec(results[i]);
        var class = RegExp.$2;
        if (class) {
            if (classes[class]==undefined) 
                classes[class]=1;
            else 
                classes[class]++;
        }
    } 
    
    var printout="(";
    for (var class in classes) {
        if (classes[class] == 1)
            printout = printout + 1 + " " + class + ", ";
        else
            if (plurals[class]) {
                printout = printout + classes[class] + " " + plurals[class] + ", ";
            }
            else {
                printout = printout + classes[class] + " " + class + "s, ";
            }
    }
    
    printout = printout + ")";
    printout = printout.replace(", )",")");
    
    p=document.getElementsByTagName("p");
    for(x = 0; x < p.length; x++) {
        if (p[x].innerHTML.match(/^There are (\d+?) creatures here: /)) {
            p[x].innerHTML = p[x].innerHTML.replace(/^There are \d+? creatures here: /,"There are " + RegExp.$1 + " creatures here " + printout + ": ");
            return;
        }
    }
}

countPets();