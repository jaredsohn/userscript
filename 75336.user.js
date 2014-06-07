// ==UserScript==
// @name           Steam Info
// @namespace      http://userscripts.org/users/156737
// @include        http://steamcommunity.com/id/*
// @include        http://steamcommunity.com/profiles/*
// ==/UserScript==

function sourcebans_callback(response, div) {
	if (response.responseText.indexOf('Total Bans:') < 0) {
		div.innerHTML = 'down';
	} else if (response.responseText.indexOf('Total Bans: 0') < 0) {
        div.innerHTML = 'banned';
        div.className = 'hiliteTextRed';
    } else {
        div.innerHTML = 'clean';
        div.className = 'hiliteTextGreen';
    }
}

function query_sourcebans(steam_id, url, div) {
    var query = url + 'index.php?p=banlist&hideinactive=true&advType=steamid&advSearch=' + steam_id;
    GM_xmlhttpRequest({
        method:"GET",
        url:query,
        onload: function(response) {
            sourcebans_callback(response, div);
        }
    });
}

function calculate_steam_id(scid) {
    var scid = parseInt(scid.substr(-10),10);
    var srv = scid % 2;
    var auth = ((scid - srv) - 7960265728) / 2;
    return "STEAM_0:" + srv + ":" + auth;
}

function steam_id_callback(response) {
    var xmlobject = (new DOMParser()).parseFromString(response.responseText, "text/xml");
    var root = xmlobject.getElementsByTagName('profile')[0];
    var community_id = root.getElementsByTagName('steamID64')[0].firstChild.nodeValue;
    var steam_id = calculate_steam_id(community_id)
    document.getElementById('steam_id').innerHTML = steam_id;
    query_sourcebans(steam_id, 'http://www.gotgames.com.au/sb/', document.getElementById('sb_gg'));
    query_sourcebans(steam_id, 'http://sourcebans.cybergamer.com.au/', document.getElementById('sb_cg'));
}

function getElementByClass(class, root) {
	if (root.className == class) {
        return root;
    }
    for (var i = 0; i < root.childNodes.length; i++) {
        var tmp = getElementByClass(class, root.childNodes[i]);
        if (tmp != null) {
            return tmp;
        }
    }
    return null;
}

function friends_callback(response) {
	
}

search_html = '<div id="headerSearch" style="margin-right:10px"><form id="headerSearchForm" onsubmit="var parts = this.elements[0].value.split(\':\');var url = \'http://steamcommunity.com/profiles/7656119\' + (7960265728 + parts[2] * 2 + parts[1] * 1);location.href = url;return false;"><input type="text" id="searchInputBoxNew" value="SteamID" onClick="if( this.value == \'SteamID\' ) { this.value=\'\' }" onFocus="if( this.value == \'SteamID\' ) { this.value=\'\' }" onBlur="if( this.value == \'\' ) { this.value=\'SteamID\' }"/><input id="searchSubmitImg" type="image" src="http://steamcommunity.com/public/images/skin_1/searchbox_submit.gif" width="23" height="18" border="0" /></form></div>';
searchBox = document.getElementById('userControls');
searchBox.innerHTML = searchBox.innerHTML + search_html;

rightStatsBlock = getElementByClass('rightSectionHeader', document.body);
if (rightStatsBlock != null) {
    test_html = '<div class="rightSectionHeader">Details</div>\
    <div class="rightStatsBlock">\
    <div class="statsItem"><div class="statsItemName">SteamID:</div><div id="steam_id">Loading...</div></div>\
    <div class="rightGreyHR"><img src="http://steamcommunity.com/public/images/trans.gif" width="253" height="1" border="0" /></div>\
    <div class="statsItem"><div class="statsItemName">GotGames SB:</div><div id="sb_gg">Loading...</div></div>\
    <div class="rightGreyHR"><img src="http://steamcommunity.com/public/images/trans.gif" width="253" height="1" border="0" /></div>\
    <div class="statsItem"><div class="statsItemName">CyberGamer SB:</div><div id="sb_cg">Loading...</div></div>\
    </div>\
    <div class="rightSectionFooter"><img border="0" src="http://steamcommunity.com/public/images/skin_1/rightColFootRibbon2.gif" width="254" height="2"></div>';

    new_node = document.createElement("div");
    new_node.innerHTML = test_html;

    parent = rightStatsBlock.parentNode;
    parent.insertBefore(new_node, rightStatsBlock);

    GM_xmlhttpRequest({
        method:"GET",
        url:window.location.href + "/?xml=1",
        onload: function(response) {
            steam_id_callback(response);
        }
    });
	
	GM_xmlhttpRequest({
        method:"GET",
        url:window.location.href + "/friends",
        onload: function(response) {
            friends_callback(response);
        }
    });
}