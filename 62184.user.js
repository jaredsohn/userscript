// ==UserScript==
// @name           GLB Boost All Link
// @namespace      GLB
// @description    GLB to Auto Use all of your boosts
// @include        http://goallineblitz.com/game/home.pl
// @include        http://goallineblitz.com/game/boost_player.pl?player_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://jquery-ui.googlecode.com/svn/tags/latest/ui/ui.core.js
// ==/UserScript==


$(document).ready(function(){
    
    function PullBoosts(boostid){
        var newwindow2 = window.open("http://goallineblitz.com/game/boost_player.pl?player_id=" + boostid,"Boost Players" + boostid, "width=88,height=82,scrollbars=yes,resizable=yes,toolbar=no,location=no,menubar=no");
        if (!newwindow2.opener) newwindow2.opener = self;

    }
    function startprocess(){
    
        // pull each player id 
        
        $('#tab_boostall').hide();
        $('a[href*="/game/player.pl?player_id="]').each(function(i){
            var playerlink = $(this).attr('href');
            playerlink = playerlink.substring(playerlink.indexOf('player_id=')+10);
            boostlinksarr.push(playerlink)
        })
        loopcount = boostlinksarr.length;
        createCookie("DDCMassBoost",loopcount,30);
        for (var z=0;z<boostlinksarr.length;z++) {
            PullBoosts(boostlinksarr[z]);
        }
    // buffer all PBP into divs on hp
    // change links
    }
    
    function createCookie(name,value,days) {
    	if (days) {
    		var date = new Date();
    		date.setTime(date.getTime()+(days*24*60*60*1000));
    		var expires = "; expires="+date.toGMTString();
    	}
    	else var expires = "";
    	document.cookie = name+"="+value+expires+"; path=/";
    }
    
    function readCookie(name) {
    	var nameEQ = name + "=";
    	var ca = document.cookie.split(';');
    	for(var i=0;i < ca.length;i++) {
    		var c = ca[i];
    		while (c.charAt(0)==' ') c = c.substring(1,c.length);
    		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    	}
    	return null;
    }
    
    function eraseCookie(name) {
    	createCookie(name,"",-1);
    }
    
    function doBoost(){
        var remboost = $('td[class="level_up_value"]:eq(2)').text();
        if (parseInt(remboost)>0) {
            $('select[name="level_ups"] option[value="'+remboost+'"]').attr('selected', 'selected');
            cookcount = parseInt(cookcount);
            cookcount = cookcount-1;
            if (cookcount==0) {
                eraseCookie("DDCMassBoost");
            }else{
                createCookie("DDCMassBoost", cookcount, 30);
            }
            var playerid = $('input[name="player_id"]').attr('value');
    
            var offerData = 'action=Boost&player_id='+playerid+'&level_ups=' + remboost;

            GM_xmlhttpRequest({
                method: 'POST',
                url: 'http://goallineblitz.com/game/boost_player.pl',
                 headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: encodeURI(offerData),				  	
                onload: function(response1) {
                          self.close();
                }
            });
        }else{
            self.close();
        }
    }


    if (window.location.href=="http://goallineblitz.com/game/home.pl") {
        var loadlinks = document.createElement('div');
        loadlinks.setAttribute('id', 'tab_boostall');
        loadlinks.setAttribute('class', 'subtab_off');
        var boostclick = document.createElement('a');
        boostclick.setAttribute('href','javascript:;');
        linkitemtextnode = document.createTextNode('Boost All');
        boostclick.appendChild(linkitemtextnode);
        
        loadlinks.appendChild(boostclick);
        $('div[class="tabs"]').append(loadlinks);
        $('#tab_boostall').bind('click', startprocess, false);
        
        var boostlinksarr = new Array;
        var boostdivs, loopcount
    }else{
        var cookcount = readCookie("DDCMassBoost");
        if (cookcount!=null) {
            doBoost();
        }
    }

})
