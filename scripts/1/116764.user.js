// ==UserScript==
// @name           sf_scripts
// @namespace      sf_scripts
// @description    SF Scripts Collection
// @include        http://*.seafight.bigpoint.com/*
// @include        http://int6.seafight.bigpoint.com/*
// @include        http://*.seafight.com/*
// ==/UserScript==

var url_cur = location.href ;

var my_sid = argItems("sid");
var my_id = 'ss';
var inp;
var ind1=document.documentElement.innerHTML.indexOf('uid');
var ind2=document.documentElement.innerHTML.indexOf('"',ind1);
var ind3=document.documentElement.innerHTML.indexOf('"',ind2+1);

var my_id = document.documentElement.innerHTML.substr(ind2+1,ind3-ind2-1);
//alert(ind1);
//alert(ind2);
//alert(ind3);
//alert(my_id);
function argItems (theArgName) {
	sArgs = location.search.slice(1).split('&');
    r = '';
    for (var i = 0; i < sArgs.length; i++) {
        if (sArgs[i].slice(0,sArgs[i].indexOf('=')) == theArgName) {
            r = sArgs[i].slice(sArgs[i].indexOf('=')+1);
            break;
        }
    }
    return (r.length > 0 ? unescape(r).split(',') : '')
}

mojo_click = function(e) {
	for ( var i = 0 ; i < inp.value ; i++ ) {
	
	try {
			GM_xmlhttpRequest({
			method: 'GET',
			url: "http://"+location.hostname+'/indexInternal.es?action=internalVoodoo&gameapi_consoledisable=1&do=mojo&userID='+my_id+'&sid='+my_sid,
				headers: {'Cache-Control': 'no-cache'},
			})
		}catch (err) {
			if (forced) alert('Error:\n'+err);
		}

	}

}
//alert("geht 2");


if( url_cur.indexOf('indexInternal.es') != -1 ) {
	var el_main = document.getElementById ('main');
	inp = document.createElement("input");
	inp.type = "text";
	inp.value = 0;
	el_main.firstChild.nextSibling.appendChild(inp);
	var inp_p = document.createElement("input");
	inp_p.type = "button";
	inp_p.value = "Mojos!";
	inp_p.name = "mojo";
	inp_p.addEventListener ('click', mojo_click,false);
	el_main.firstChild.nextSibling.appendChild(inp_p);
}


