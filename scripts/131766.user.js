// ==UserScript==
// @name           Medium Drinks Tracker
// @namespace      userscripts.org/scripts/show/131766
// @description    Lists missing happy medium drinks for the trophy.
// @include        http://*kingdomofloathing.com/showconsumption.php
// @include        http://127.0.0.1:*/showconsumption.php
// ==/UserScript==

//Version 1.0

var drinks = 
    new Array(
              {name:'Zoodriver',descr:''},
              {name:'Slow Comfortable Zoo',descr:''},
              {name:'Sloe Comfortable Zoo on Fire',descr:''},
              {name:'Grasshopper',descr:''},
              {name:'Locust',descr:''},
              {name:'Plague of Locusts',descr:''},
              {name:'Green Velvet',descr:''},
              {name:'Green Muslin',descr:''},
              {name:'Green Burlap',descr:''},
              {name:'Dark & Starry',descr:''},
              {name:'Black Hole',descr:''},
              {name:'Event Horizon',descr:''},
              {name:'Lollipop Drop',descr:''},
              {name:'Candy Aexander',descr:''},
              {name:'Candicaine',descr:''},
              {name:'Suffering Sinner',descr:''},
              {name:'Suppurating Sinner',descr:''},
              {name:'Sizzling Sinner',descr:''},
              {name:'Drac & Tan',descr:''},
              {name:'Transylvania Sling',descr:''}
              {name:'Shot of the Living Dead',descr:''}
              {name:'Firewater',descr:''}
              {name:'Earth and Firewater',descr:''}
              {name:'Earth, Wind and Firewater',descr:''}
              {name:'Caipiranha',descr:''}
              {name:'Flying Caipiranha',descr:''}
              {name:'Flaming Caipiranha',descr:''}
              {name:'Buttery Knob',descr:''}
              {name:'Slippery Knob',descr:''}
              {name:'Flaming Knob',descr:''}
              {name:'Humanitini',descr:''}
              {name:'More Humanitini than Humanitini',descr:''}
              {name:'Oh, the Humanitini',descr:''}
              {name:'Red Dwarf',descr:''}
              {name:'Golden Mean',descr:''}
              {name:'Green Giant',descr:''}
              {name:'Fauna Libre',descr:''}
              {name:'Chakra Libre',descr:''}
              {name:'Aura Libre',descr:''}
              {name:'Mohobo',descr:''}
              {name:'Moonshine Mohobo',descr:''}
              {name:'Flaming Mohobo',descr:''}
              {name:'Great Old Fashioned',descr:''}
              {name:'Fuzzy Tentacle',descr:''}
              {name:'Crazymaker',descr:''}
              {name:'Punchplanter',descr:''}
              {name:'Doublepunchplanter',descr:''}
              {name:'Haymaker',descr:''}
              {name:'Cement Mixer',descr:''}
              {name:'Jackhammer',descr:''}
              {name:'Dump Truck',descr:''}
              {name:'Sazerorc',descr:''}
              {name:'Sazuruk-hai',descr:''}
              {name:'Flaming Sazerorc',descr:''}
              {name:'Herring Daquiri',descr:''}
              {name:'Herring Wallbanger',descr:''}
              {name:'Herringtini',descr:''}
              {name:'Aye Aye',descr:''}
              {name:'Aye Aye, Captain',descr:''}
              {name:'Aye Aye, Tooth Tooth',descr:''}
              {name:'Slimosa',descr:''}
              {name:'Extra-Slimy Slimosa',descr:''}
              {name:'Slimebite',descr:''}
              {name:'Drunken Philosopher',descr:''}
              {name:'Drunkern Neurologist',descr:''}
              {name:'Drunken Astrophysicist',descr:''}
			  );

function doPage() {
    var listing = document.getElementsByTagName('td');
    var count=0;
    var existing = new Array();
    var tblnode=null;
    for (var i=0;i<listing.length;i++) {
        tblnode = listing[i];
        if (tblnode.firstChild && tblnode.firstChild.data &&
			tblnode.firstChild.data.indexOf('You have consumed the following booze items:')>0) {
            // found the table
            var list = tblnode.firstChild.nextSibling; // ul
            var olist = document.createElement('ol');
            for (var j=0;j<list.childNodes.length;j++) {
                var item = list.childNodes[j];
                if (item.firstChild) {
                    existing[count++] = item.firstChild.data;
                    //GM_log(existing[count-1]);
                    olist.appendChild(item.cloneNode(true));
                    //item.firstChild.data = count+'. '+item.firstChild.data;
                } 
            }
            list.parentNode.replaceChild(olist,list);
            break;
        }
    }
    if (!tblnode)
        return;
    // now to display any missing
    var toprow = document.createElement('tr');
    var topcell = document.createElement('td');
    var missing = drinks.length-count;
    if (missing==0) {
        topcell.appendChild(document.createTextNode('You are drank all the drinks, drunk'));
    } else {
        topcell.appendChild(document.createTextNode('You still need to drink:');
    }
    var newlist = document.createElement('ol');
    newlist.setAttribute('start',count+1);
    for (var i=0;i<drinks.length;i++) {
        for (var j=0;j<count;j++) {
            if (existing[j]==drinks[i].name)
                break;
        }

    }
    topcell.appendChild(newlist);
    topcell.appendChild(document.createElement('br'));
    toprow.appendChild(topcell);
    tblnode.parentNode.parentNode.appendChild(toprow);
 
}

doPage();
