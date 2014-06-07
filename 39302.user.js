// ==UserScript==
// @name           New Messages/Alerts In GLB Toolbar
// @namespace      pbr
// @description    Add New Messages and Alerts To GLB Toolbar
// @include        http://goallineblitz.com/game/*
// @version        09.07.01
// @copyright      2008, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// ==/UserScript==


/*
 *
 * written by pabst 12/26/08+
 *
*/

window.setTimeout( function() {
    messageMain();
}, 200);

function messageMain() {
    var saved = GM_getValue("glb-mess_in_tbar",new Date().getTime()-120000+" 0 0").split(" ");
    var lastTime = saved[0];
    var inbox = saved[1];
    var alerts = saved[2];
    
    var page = "";
    var addr = window.location.href.toString(); 
    if (addr.indexOf("home.pl") == (addr.length-"home.pl".length)) {
        page = document.getElementsByTagName("body")[0].innerHTML;
        parseHomePage(page);
    }
    else {
	var newTime = new Date().getTime();
        //console.log(lastTime+" - "+newTime+" = "+ (newTime - lastTime));
        var diff = newTime - lastTime;        
        if (diff > 60000) {
            getPage();
        }
        else if (window.location.href.toString().indexOf("message.pl") != -1) {
            getPage();
        }
        else {
            applyChanges(inbox, alerts);
        }
    }
    
}

function parseHomePage(page) {
    //console.log(page);
    var inbox = page.split('inbox_button"><div>')[1];
    inbox = parseInt(inbox);
    var alerts = page.split('alerts_button"><div>')[1];
    alerts = parseInt(alerts);
    GM_setValue("glb-mess_in_tbar",new Date().getTime()+" "+inbox+" "+alerts);
    applyChanges(inbox, alerts);
}

function applyChanges(inbox, alerts) {
    var links = document.links;
    for (var i=0; i<links.length; i++) {
        if (links[i].href.indexOf("/game/inbox.pl") != -1) {
            links[i].innerHTML += " ("+inbox+" / "+alerts+")";
            break;
        }
    }
}

function getPage() {
        var address = 'http://goallineblitz.com/game/home.pl';
	var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
	req.onload = function() {
		if (this.status != 200) {
			alert("pbr gm script: Error "+this.status+" loading "+address);
		}
		else {
			console.log("loaded: "+address)
                        parseHomePage(this.responseText);
		}
	};
	
	req.send(null); 
	return req;
}

