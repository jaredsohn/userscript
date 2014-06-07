// Copyright (C) 2007 Jan Winkelmann <keks@unstable.nl>
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2, or (at your option)
// any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// ==UserScript==
// @name           SchuelerVZ Sidebar
// @description    Fork der SVZ Sidebar(http://userscripts.org/scripts/show/13754). Zeigt alle Freunde im SchulerVZ die "online" sind auf jeder Seite in einer Sidebar an.
// @include        http://www.schuelervz.net/*

/* Settings */
sbWidth = 200; //sidebar width in pixels
udMin = 45000 //minimal update time in microseconds
udMax = 90000 //maximal update time in microseconds


getUsers = function(){
    //GM_log('update');
	var myAjax = GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.schuelervz.net/friends.php?search_query=&category_id=8&o=1',
		onload: function(originalRequest) {
		    //get friends table
		    tempElm = document.createElement('div')
			tempElm.innerHTML = originalRequest.responseText;
			var mainDiv = tempElm.getElementsByTagName('div');

			//make friends-array
			var friends = new Array();
			for(var i = 0; i < mainDiv.length; i++) {
			    if(mainDiv[i].className == "friendtable")
			        friends.push(mainDiv[i]);
			}
			
			//insert headline
			tempElm.innerHTML = '';
			var header = document.createElement('div');
			header.className = "secheader";
			header.appendChild(document.createElement('h2'));
			tempElm.appendChild(header);
			
			if(friends.length)
			    header.firstChild.innerHTML = 'Online ('+friends.length+') :';
			else
			    header.firstChild.innerHTML = 'niemand online';
			
            //insert friends
            checkcode = "0"
			for(var i = 0; i < friends.length; i++) {
			
				var friendbox = document.createElement('div');
			    friendbox.style.padding = "10px 0 10px 5px";
			    
			    var links = friends[i].getElementsByTagName('a');
			    links[0].innerHTML = links[0].innerHTML.replace('-m.jpg','-s.jpg');
			    links[0].style.cssFloat = 'left';
			    links[0].style.marginRight = '5px';
                friendbox.appendChild(links[0]);
                
                var friendtext = document.createElement('div');
                friendtext.style.marginLeft = "60px";
                links[0].style.fontWeight = "bold";
                checkcode += links[0].href.split('=')[1];
                friendtext.appendChild(links[0]);
                
                friendtext.appendChild(document.createElement('br'));
                var space = document.createElement('br');
                space.style.fontSize = "4px";
                friendtext.appendChild(space);
                
                links[4].innerHTML = '[ ' + links[4].innerHTML + ' ]';
                links[4].style.fontSize = "9px";
                links[4].style.lineHeight = "15px";
                friendtext.appendChild(links[4]);
                
                friendtext.appendChild(document.createElement('br'));
                
                links[3].innerHTML = '[ ' + links[3].innerHTML.toLowerCase() + ' ]';
                links[3].style.fontSize = "9px";
                links[3].style.lineHeight = "15px";
                friendtext.appendChild(links[3]);
                
                friendbox.appendChild(friendtext);
			    tempElm.appendChild(friendbox);
			    
			    var clear = document.createElement('div');
			    clear.style.clear = "both";
			    friendbox.appendChild(clear);
			    
			    if(i+1 < friends.length) {
			        var hr = document.createElement('div');
			        hr.className = "secheader";
			        hr.style.clear = "both";
			        hr.style.padding = "0";
			        hr.style.borderTop = "0";
			        tempElm.appendChild(hr);
			    }
			}

			if(checkcode != GM_getValue('stvz_sb.ccode')) {
			    GM_setValue('stvz_sb.content', tempElm.innerHTML);
			    GM_setValue('stvz_sb.ccode', checkcode);
			    updateSidebar();
			}

			var now = new Date();
            GM_setValue('stvz_sb.time', (parseInt(now.getTime()+udMin+Math.random()*(udMax-udMin))).toString());
		}  
	})
}



initSidebar = function (){
    var all = document.getElementById('allesdrin');
    all.style.width = 760 + sbWidth + "px";

    var box = document.createElement('div');
    box.id = "GM_sb";

    box.className = "friendtable";
    box.style.borderTop = "0";
    box.style.borderLeft = "0";
    box.style.marginLeft = "760px";
    box.style.width = sbWidth - 17 + "px";
    box.style.position = "absolute";

    var main = document.getElementById('haupt');
    main.parentNode.insertBefore(box,main.nextSibling);

    var link = document.getElementById('homelink');
    link.style.width = 180 + sbWidth + "px";
    link.style.height = "40px";
    link.style.backgroundImage = "url(/images/pvz/logotop3.gif)";
    link.style.backgroundPosition = "-135px 0";
    
    var top = document.getElementById('topheader');
    top.style.width = 760 + sbWidth + "px";
    top.style.backgroundPosition="right";
}

updateSidebar = function (){
    document.getElementById('GM_sb').innerHTML = GM_getValue('stvz_sb.content');
    //GM_log('..change');
}

checkUpdate = function (){
    //time
    var now = new Date();
    var timeNow = now.getTime();
    var time = GM_getValue('stvz_sb.time');
    
    if(now.getTime() > parseInt(time) && time != 'update') {
        GM_setValue('stvz_sb.time', 'update');
        getUsers();
        return;
    }

    //if other window made update, update too
    if(checkcode != GM_getValue('stvz_sb.ccode')) {
        updateSidebar();
        checkcode = GM_getValue('stvz_sb.ccode');
    }
}

var noscriptElm = document.getElementsByTagName('noscript')[0];
if(noscriptElm && noscriptElm.innerHTML.indexOf(';LoggedIn') != -1) {
    checkcode = "0";
    initSidebar();
    if(!GM_getValue('stvz_sb.content', false) || !GM_getValue('stvz_sb.time', false) || !GM_getValue('stvz_sb.ccode', false)) {
        getUsers();
    }
    else
        checkUpdate();
    window.setInterval(checkUpdate, 5000);
}
