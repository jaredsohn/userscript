// ==UserScript==
// @name        LoTS Raid Helper
// @namespace   tag://kongregate
// @description Easier to manage Kongregate's Legacy of a Thousand Suns raids
// @author      innou
// @version     1
// @date        1.8.2013
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @include     *kongregate.com/games/5thPlanetGames/legacy-of-a-thousand-suns*
// @include     *pastebin.com*
// @include     http://userscripts.org/scripts/review/156053
// ==/UserScript==

var $j = jQuery.noConflict();

window.lots = {
    version: {
        major: "1",
        minor: "0"
    },
}

function createRaidPanel()
{
    var versionStr = "v" + lots.version.major + "." + lots.version.minor;
    $j('#chat_tab').after('<li id="lots_tab" class="tab"><a href="#">Raid</a></li>');
    $j('#chat_tab_pane').after(' \
        <div id="lots_tab_pane" class="tabpane" style="height: 649px; display: none;"> \
            <div id="lots_window"> \
                <div id="lots_window_header"> \
                    <div id="lots_tabs"> \
                        <div id="raids_tab" class="chat_room_tab active"> \
                            <a href="#">Raids</a> \
                        </div> \
                        <div id="pastebin_tab" class="chat_room_tab"> \
                            <a href="#">Pastebins</a> \
                        </div> \
                    </div> \
                    <div style="float: right;"> \
                        ' + versionStr + ' \
                    </div> \
                </div> \
                <div id="lots_container" class="clear" style="height: 600px; background: white;"> \
                    <div id="test_panel" class="collapsible_panel"> \
                        <p class="panel_handle spritegame mts opened_link"><a>Testing</a></p> \
                        <div id="test" class="panel_body cntrToggle media"> \
                            Testing stuff \
                        </div> \
                </div> \
            </div> \
        </div> \
    ');

    // JS UI Functions
    $j("#lots_tab").click(function() {
        $j(".tabpane").hide();
        $j("#lots_tab_pane").show();
        return false;
    });

    $j("#main_tab_set .tab a").click(function() {
        $j("#main_tab_set .tab a").removeClass("active");
        $j(this).addClass("active");
    });

    $j("#lots_window .panel_handle").click(function() {
        if ($j(this).hasClass("opened_link")) {
            $j(this).removeClass("opened_link").addClass("closed_link");
            $j(this).next(".panel_body").hide();
        } else {
            $j(this).removeClass("closed_link").addClass("opened_link");
            $j(this).next(".panel_body").show();
        }
    });

    console.log('[LoTS] Raid tab added.');
}

createRaidPanel();
