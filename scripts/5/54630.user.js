// ==UserScript==
// @name           libpbr2
// @include        http://www.goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// @copyright      2009, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        13.11.25
// ==/UserScript==

var fieldLayerZ = 0;
var lowerDecalLayerZ = 64;
var lineLayerZ = 128;
var middleDecalLayerZ = 192;
var playerLayerZ = 255;
var upperDecalLayerZ = 768;
var iconOverlayLayerZ = 1024;

var startLimit = 0;
var lockTime = 0;

function importPBP(address, page) {
    console.log("inserting pbp");
    var pbp = document.getElementById("pbp");
    pbp.style.visibility = "hidden";
    pbp.style.display = "none";
    var string = page.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");
    string = string.slice(string.indexOf('<div id="content">'));
    string = string.slice(0,string.indexOf('<div id="footer">'));
    pbp.innerHTML = string;
/*
	var code = page.responseText.split('<body onload="loadInbox()">')[1];
	code = code.replace(/<script /g,"<crap ");
	code = code.replace(/<\/script>/g,"/crap>");
	code = code.replace(/<link /g,"<crap ");
    pbp.innerHTML = code;
*/
}

function init(needsPBP) {
//    console.log("init");
    if (startLimit == 0) {
        startLimit++;
        addToActive();
    	activate();
    }

    if (needsPBP == true) {
        var pbptag = document.createElement("div");
        pbptag.setAttribute("id","pbp");

        var pbp = document.getElementById("pbp");
        if (pbp == null) {
            document.body.appendChild(pbptag);

            var href = window.location.toString();
            href = href.replace("replay.pl","game.pl");
            var idx = href.indexOf("&pbp_id");
            href = href.slice(0,idx) + "&mode=pbp";

            console.log("loading pbp");
            getInetPage(href, importPBP);
            return;
        }
        else if (pbp.childNodes.length == 0) {
            console.log("waiting for pbp");
            setTimeout(init, 300);
            return;
        }
    }
    
	if (document.getElementById("rrplay") == null) {
        if (startLimit >= 10) return;
        startLimit++;
		setTimeout(init, 300);
		return;
	}
    else {
        var rrplay = document.getElementById("rrplay");
        rrplay.addEventListener("change",function(e) { activate(e) }, false);
    }
}

function deinit() { }

function addToActive() {
//    console.log("addToActive");
    var list = document.getElementById("active_list");
    if (list == null) {
//    	console.log("addToActive: "+scriptName+" waiting");
        if (startLimit < 10) {
            startLimit++;
        	setTimeout(addToActive,1000);
        }
    	return;
   	}

    var div = document.createElement("div");
    div.innerHTML = scriptName+" : "+scriptVersion;
    list.appendChild(div);

    if (GM_getValue) {
        var data = GM_getValue(scriptName);
        if (data == null) {
            GM_setValue(scriptName,0+"\t"+scriptVersion);
            data = GM_getValue(scriptName);
        }

        var date = parseInt(data.split("\t")[0]);
        var ver = data.split("\t")[1];
        console.log("Checking for update : "+scriptName+" ("+date+") ("+ver+")");

        var delay = 12*60*60*1000;
        if (((new Date()).getTime() -  parseInt(date)) > delay) {
            console.log("checking for new version");
            GM_getInetPage(scriptWebpage.replace("/show/","/source/") + ".meta.js", updateCheck);
        }
        else if (ver != scriptVersion) {
            console.log("using local version");
            updateCheck(null, null, ver);
        }
        else {
            console.log("too soon to check");
        }
    }
}

function lock(e) {
    console.log("locked "+scriptName);
    lockTime = new Date();

	var pd = unsafeWindow.play_data;
	if (pd == null) {
		console.log("no play_data: turn flash replays off?");
	}

    var rrplay;
    if (e == null) {
        rrplay = document.getElementById("rrplay");
    }
    else {
        rrplay = e.target;
    }
    if (rrplay == null) {
        console.log("rrplay == null");
        return;
    }

    var div = document.createElement("div");
    div.setAttribute("id",scriptName);
    rrplay.appendChild(div);
}

function unlock() {
    var time = new Date() - lockTime;
    console.log("unlocked : "+scriptName+" : "+time.toFixed(0)+"ms");
    var div = document.getElementById(scriptName);
    if (div != null) div.parentNode.removeChild(div);
}

function updateCheck(address, page, v) {
   console.log("updateCheck : loaded "+address);
   var version = null;
   if (address != null) {
//	   console.log(page.responseText);
       version = page.responseText.split("@version")[1];
       version = version.split("/")[0];
       version = version.replace(/^\s*|\s*$/g,"");
//	   console.log("'"+version+"'");
       GM_setValue(scriptName,(new Date().getTime().toString())+"\t"+version);
   }
   else {
       version = v;
   }

   if (scriptVersion != version) {
       var div = document.getElementById("active_list");
       for (var i=0; i<div.childNodes.length; i++) {
           var c = div.childNodes[i];
           if (c.innerHTML.indexOf(scriptName) == 0) {
               c.innerHTML +=" &nbsp;(";
               var a = document.createElement("a");
               a.href = scriptWebpage;
               a.innerHTML = version+" available";
               c.appendChild(a);
               c.innerHTML +=")";
           }
       }
   }
}

function arraySum(arr,start) {
	var total = 0;
	for (var i=start; i<arr.length; i++) {
		total += arr[i];
	}
	return total;
}

function fixEscapedText(str) {
	var s = str;
	while (s.indexOf('"') != -1) {
		s = s.replace('"',"&quot;");
	}
	while (s.indexOf("'") != -1) {
		s = s.replace("'","&#39;");
	}
	return s;
}

function trim(str) {
	var s = str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	return s.replace(/\n/," ");
}

function setCookie(c_name, value) {
	var strs = new Array();
	var v = btoa(escape(value));
	if (GM_setValue != null) {
		GM_setValue(c_name,v);
		//console.log("writing gmValue ("+value.length+" --> "+v.length+") :"+c_name+" ==> "+v);
	}
	else {
		var cw = c_name + "=" + v +";";
		document.cookie = cw;
		//console.log("writing cookie ("+value.length+" --> "+v.length+") :"+c_name+" ==> "+v);
	}
}

function getCookie(c_name) {
	if (GM_getValue != null) {
		var s = GM_getValue(c_name,"");
//		console.log(c_name+" --> '"+s+"'");
		return unescape(atob(s));
	}
	else {
		var start = document.cookie.indexOf(c_name+"=");
		if (start != -1) {
			console.log(document.cookie);
			var s = document.cookie.slice(start+(c_name+"=").length);
			s = s.slice(0,s.indexOf(";"));
			var c = s;
//			console.log(c_name+" --> '"+s+"'");
			return unescape(atob(s));
		}
		else {
			console.log("cookie not set");
		}
	}
	return null;
}

function rangeCheck(arr, i) {
	if (i < 0) return false;
	if (i >= arr.length) return false;
	return true;
}

function findChild(id,node) {
	if (node.id+"" == id+"") {
		return node;
	}
	//for each (var c in node.childNodes) {
	for (var i=0; i<node.childNodes.length; i++) {
		var c = node.childNodes[i];
		var r = findChild(id,c);
		if (r != null) {
			return r;
		}
	}
	return null;
}

function getInetPage(address, func, target) {
    console.log("getInetPage : "+address);
    var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
	req.onreadystatechange = function() {
		if (target != null) {
			var d = ["..","...","."];
			var str = target.innerHTML.split(" ");
			target.innerHTML = str[0]+" "+d[str[1].length-1];
    	}
	};
	req.onload = function() {
		if (this.status != 200) {
			alert("pbr gm script: Error "+this.status+" loading "+address);
		}
		else {
			console.log("loaded: "+address)
			func(address,this);
		}
	};

	req.send(null);
	return req;
}

function GM_getInetPage(address, func, target) {
    console.log("GM_getInetPage : "+address);
    GM_xmlhttpRequest({
        method: 'GET',
        url: address,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
        },
        onload: function(page) {
                console.log("loaded: "+address)
                func(address,page);
        }
    });
}

