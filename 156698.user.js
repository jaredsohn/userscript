// ==UserScript==
// @name           ZUGignore
// @namespace      http://zugunder.com/
// @description    Zugunder user ignoring script
// @include        http://zugunder.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.js
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

try {
    if (GM_getValue("ZugIgnoredUsers", '') == '') IgnoredList = new Array();
    else IgnoredList = GM_getValue("ZugIgnoredUsers").split(':');
    igbl = document.createElement('li');
    igbl.id = "button_ignore_list"
    igbl.innerHTML = '<a class="daddy"><span>ИГНОР</span></a>';
    igbl.addEventListener('click', IB, false);
    igblock = document.createElement('div');
    igblock.style.display = 'none';
    igblock.style.position = 'fixed';
    igblock.style.padding = '12px';
    igblock.style.border = '1px solid black';
    igblock.style.left = '2px';
    igblock.style.top = '2px';
    igblock.style.backgroundColor = '#fff';
}

catch (e) {
    alert("Error " + e.message);
}

function Ignore(nick) {
    return function () {
        IgnoredList.push(nick);
        GM_setValue("ZugIgnoredUsers", IgnoredList.join(':'));
        igblock.style.display = 'none';
        if (document.location.href.match('board')) { for (var i = 1; i < nodes.length; i++) { if (nodes[i].children[0].innerHTML == nick) { nodes[i].parentNode.parentNode.parentNode.style.display ="none"; } } }
        if (document.location.href.match('topic')) { for (var i = 0; i < pList.length; i++) { if (pList[i].getElementsByTagName('a')[0].innerHTML == nick) { pList[i].style.display = 'none'; } } }
    }
}

function UnIgnore(uid, nick) {
    return function () {
        IgnoredList.splice(uid, 1);
        GM_setValue("ZugIgnoredUsers", IgnoredList.join(':'));
        igblock.style.display = 'none';
        IB();
        if (document.location.href.match('board')) { for (var i = 1; i < tList.rows.length; i++) { if (nodes[i].children[0].innerHTML == nick) { nodes[i].parentNode.parentNode.parentNode.style.display =""; } } }
        if (document.location.href.match('topic')) { for (var i = 0; i < pList.length; i++) { if (pList[i].getElementsByTagName('a')[0].innerHTML == nick) { pList[i].style.display = ''; } } }
    }
}

function SB() {
    if (sebl.style.display == 'none') sebl.style.display = 'inline';
    else sebl.style.display = 'none';
}

function IB() {
    if (igblock.style.display == 'none') {
        igblock.style.display = 'inline';
        igblock.innerHTML = '<h3>ИГНОР-ЛИСТ</h3>';
        for (var i = 0; i < IgnoredList.length; i++) {
            var ulink = document.createElement('a');
            ulink.innerHTML = IgnoredList[i];
            ulink.style.cursor = 'pointer';
            ulink.style.marginRight = '10px';
			ulink.style.marginLeft = '10px';
            ulink.addEventListener("click", UnIgnore(i, IgnoredList[i]), false);
            igblock.appendChild(ulink);
        }

        var clink = document.createElement('a');
        clink.innerHTML = 'Закрыть';
        clink.addEventListener("click", IB, false);
        clink.style.marginTop = '20px';
        clink.style.cssFloat = 'left';
        clink.style.cursor = 'pointer';
        clink.style.color = '#DD0000';
        igblock.appendChild(clink);
    }
    else { igblock.style.display = 'none'; }
}

try {
        var el = document.getElementById('topnav');
        if (el != null) {
            el.appendChild(igbl);
            el.appendChild(igblock);
        }
    if (document.location.href.match('board')) {
        tList = document.getElementsByClassName('table_grid')[0];

		var nicks = $("td.subject > div p > a").toArray();
		var nodes = $("td.subject > div p").toArray();
		
		for (var i = 0; i < nodes.length; i++) {		    
        var userIgnored = false;
		var nick = nodes[i].children[0].innerHTML;
        for (var k = 0; k < IgnoredList.length; k++) {
                if (nick == IgnoredList[k]) {
                   nodes[i].parentNode.parentNode.parentNode.style.display ="none";
                   userIgnored = true;
                   break;
                }  
            }
            if (!userIgnored)   
            {
                var ilink = document.createElement('a');
                ilink.innerHTML = '(x)';
                ilink.style.cursor = 'pointer';
				ilink.id = "ignore";
				ilink.style.color = 'pink';
                ilink.addEventListener('click', Ignore(nick), false);
				nodes[i].appendChild(ilink);
            }
        }
    }
}

catch (e) {
    alert("Error:" + e.message);
}

if (document.location.href.match('topic')) {
    pList = $('#quickModForm > div').toArray();
    for (var i = 0; i < pList.length; i++) {
		var userIgnored = false;
        for (var l = 0; l < IgnoredList.length; l++) { 
			if (pList[i].getElementsByTagName('a')[0].innerHTML == IgnoredList[l]) 
			{
				userIgnored = true;
				pList[i].style.display = 'none';
				break;
			}
		}
        if (!userIgnored) 
        {
            var ilink = document.createElement('a');
            ilink.innerHTML = '(x)';
            ilink.style.cursor = 'pointer';
			ilink.style.color = 'pink';
            pList[i].getElementsByClassName('post_wrapper')[0].getElementsByClassName('poster')[0].children[0].appendChild(ilink);
            ilink.addEventListener('click', Ignore(pList[i].getElementsByTagName('a')[0].innerHTML), false);
        }

    }

}