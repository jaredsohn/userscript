// ==UserScript==
// @name                T.EXE
// @namespace	        T.EXE
// @description	        T.EXE v1.0
// @author		Andriy
// @version		1.0
// @email		info@game-universe.zz.mu
// @license		Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License
// @exclude		http://*.travian*.*/hilfe.php*
// @exclude		http://*.travian*.*/index.php*
// @exclude		http://*.travian*.*/anleitung.php*
// @exclude		http://*.travian*.*/impressum.php*
// @exclude		http://*.travian*.*/anmelden.php*
// @exclude		http://*.travian*.*/gutscheine.php*
// @exclude		http://*.travian*.*/spielregeln.php*
// @exclude		http://*.travian*.*/links.php*
// @exclude		http://*.travian*.*/geschichte.php*
// @exclude		http://*.travian*.*/gold.php*
// @exclude		http://*.travian*.*/tutorial.php*
// @exclude		http://*.travian*.*/manual.php*
// @exclude		http://*.travian*.*/manual.php*
// @exclude		http://*.travian*.*/ajax.php*
// @exclude		http://*.travian*.*/ad/*
// @exclude		http://*.travian*.*/chat/*
// @exclude		http://forum.travian*.*
// @exclude		http://board.travian*.*
// @exclude		http://shop.travian*.*
// @exclude		http://*.travian*.*/activate.php*
// @exclude		http://*.travian*.*/support.php*
// @exclude		http://help.travian*.*
// @include		http://*.travian*.*/*.php*
// @require		http://game-universe.zz.mu/texe/jquery-ui-1.10.2.custom/js/jquery-1.9.1.js
// ==/UserScript==

$.noConflict();
jQuery(document).ready(function ($) {
    var eGameVersion = {
        None:        0,
        Version_4_0: 1,
        Version_4_2: 2
    };

    function getVersion() {
        var script = document.scripts[1].innerHTML;
        var matches = script.match("Travian.Game.version = '([0-9.]+)';");
        if (matches) {
            if (matches[1] == "4.2") {
                if ($("ul#navigation li#n7 a") != "undefined")
                    return eGameVersion.Version_4_2;
            } else if (matches[1] == "4.0") {
                if ($("div#gs p.gold a") != "undefined")
                    return eGameVersion.Version_4_0;
            }
        }
        return eGameVersion.None;
    }

    var GameVersion = getVersion();
    
    switch (GameVersion)
    {
        case eGameVersion.Version_4_0:
            {
                $("div#side_info").append(
                    "<div id=\"villageList\" class=\"listing\">" +
	                "    <div class=\"head\">" +
	                "        <a style=\"background:none;\">T.EXE</a>" +
                    "    </div>" +
                    "    <div class=\"list\" style=\"padding-left:15px; padding/top:0;\">" +
	                "        Username:<br /><input type=\"text\" /><br />" +
                    "        Password:<br /><input type=\"password\" /><br />" +
                    "    </div>" +
                    "    <div class=\"foot\">" +
                    "</div>"
                );
                break;
            }
        case eGameVersion.Version_4_2:
            {
                $("div#sidebarAfterContent").append(
                    "<div id=\"sidebarBoxInfobox\" class=\"sidebarBox toggleable expanded\">" +
                    "	<div class=\"sidebarBoxBaseBox\">" +
                    "		<div class=\"baseBox baseBoxTop\">" +
                    "			<div class=\"baseBox baseBoxBottom\">" +
                    "				<div class=\"baseBox baseBoxCenter\"></div>" +
                    "			</div>" +
                    "		</div>" +
                    "	</div>" +
                    "	<div class=\"sidebarBoxInnerBox\">" +
                    "		<div class=\"innerBox header\">" +
                    "			<div class=\"boxTitle\">T.EXE</div>" +
                    "		</div>" +
                    "		<div class=\"innerBox content\">" +
                    "           <input type=\"text\" />" +
                    "		</div>" +
                    "	</div>" +
                    "</div>"
                );
                break;
            }
    }
});

