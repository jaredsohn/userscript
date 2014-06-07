// ==UserScript==
// @name            QL Gametype Switcher
// @version         1.8
// @include         http://*.quakelive.com/*
// @exclude         http://*.quakelive.com/forum*
// @description     Script that makes QuakeLive navigation between game types faster and user friendly.
// @author          aiken
// @updateURL       https://userscripts.org/scripts/source/120117.meta.js
// ==/UserScript==


// Set up some stuff for user script updating
var SCRIPT_NAME = "QL Gametype Switcher"
  , SCRIPT_VER  = "1.8";
GM_updatingEnabled = "GM_updatingEnabled" in window ? GM_updatingEnabled : false;

/**
 * Don't bother if Quake Live is down for maintenance or we're not the top frame
 * Note: Copied from wn's QL New Alt Browser script: http://userscripts.org/scripts/show/73076
 */
if (/offline/i.test(document.title)) {
  return;
}
if (window.self !== window.top) {
  return;
}

// Script initializing function
function QL_GTS_Init() {
  
    /**
     * GM_ API emulation for Chrome
     * 2009, 2010 James Campos
     * cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
     */
    if (typeof GM_getValue == "undefined") {
      GM_getValue = function(name, defaultValue) {
        var value = localStorage.getItem(name);
        if (!value)
          return defaultValue;
        var type = value[0];
        value = value.substring(1);
        switch (type) {
          case 'b':
            return value == 'true';
          case 'n':
            return Number(value);
          default:
            return value;
        }
      }
      GM_setValue = function(name, value) {
        value = (typeof value)[0] + value;
        localStorage.setItem(name, value);
      }
      GM_registerMenuCommand = function() {};
      
      
    };
    if (typeof GM_addStyle == "undefined") {
      GM_addStyle = function(css) {
        var style = document.createElement('style');
        style.textContent = css;
        document.getElementsByTagName('head')[0].appendChild(style);
      }
    }

    // Variables from Quake Live site that will be accessed
    //var $ = unsafeWindow.jQuery;
    //var quakelive = unsafeWindow.quakelive;
    //var qlPrompt = unsafeWindow.qlPrompt;

    // Add style classes used in the script
    GM_addStyle("a.qfLink {color: black; text-decoration: none; white-space: nowrap} "+
                "a.qfLink img { margin: 0 2px; vertical-align: middle; }"+
                "a.qfSvTypeLink {display: none; color: grey; font-size: 11px; font-weight: bold; text-decoration: none; margin-left:250px; margin-top: 4px; float: left;}"+
                "a.qfSvTypeLink:hover { text-decoration: underline; }"+
                "#quickFilter {margin-top: 8px; margin-left: 5px; padding: 2px; word-spacing: 3px; color: black; border-bottom: 1px solid grey; }");

    //window.addEventListener("message", QL_GTS_messageHandler, false);
                
    // Attach to QL function that initializes the whole page
    var oldHomeShowContent = quakelive.ShowContent;
    quakelive.ShowContent = function (v) {
        oldHomeShowContent(v);

        QL_GTS = {
            // Local internal variables
            MAX_GAMETYPE_NUM: 25, // used for validation
            ID: 0,
            IMAGE: 1,
            NAME: 2,
            TITLE: 3,
            // Defined game types (used fields are: gametype number, icon name from QL repository, displayed text, title hint)
            GAME_TYPES: [   [2,  'ffa',  'FFA', 'Free For All'],
                            [4,  'ca',   'CA', 'Clan Arena'], 
                            [7,  'duel', 'Duel', 'One On One'],
                            [6,  'tdm',  'TDM', 'Team Deathmatch'],
                            [3,  'ctf',  'CTF', 'Capture The Flag'],
                            [5,  'ft',   'FT', 'Freeze Tag'],
                            [1,  'tdm',  'Team', 'Any Team Game (CTF, CA, FT, TDM)'],

							[16, 'fctf', '1CTF', '1-Flag CTF'],
							[18, 'ad',   'A&D', 'Attack & Defend'],
							[15, 'dom',  'DOM', 'Domination'],
							[17, 'harvester', 'HAR', 'Harvester'],
							[19, 'rr',   'RR', 'Red Rover'],
                            
                            [8,  'ffa',  'iFFA', 'Instagib Free For All'],
                            [14, 'ca',   'iCA',  'Insta CA'],
                            [11, 'tdm',  'iTDM', 'Instagib Team Deathmatch'],
                            [9,  'ctf',  'iCTF', 'Instagib Capture The Flag'],
                            [10, 'ft',   'iFT', 'Instagib Freeze Tag'],
							[21, 'fctf', 'i1CTF', 'Insta 1-Flag CTF'],
							[23, 'ad',   'iA&D', 'Insta Attack & Defend'],
							[20, 'dom',  'iDOM', 'Insta Domination'],
							[22, 'harvester', 'iHAR', 'Insta Harvester'],
							[24, 'rr',   'iRR', 'Insta Red Rover'],
                            [25, 'race', 'Race', 'Race Mode'],
                            
                            [12, 'tdm',  'Ranked', 'Any Ranked Game'],
							[13, 'tdm',  'Unranked', 'Any Unranked Game'],
                            [0,  'tdm',  'All', 'All Game Types'],
						],

            browserInitialHeight: 0,
            
            // Helper function to check if game type is enabled in game type bitmap variable
            isGameTypeEnabled: function (bitmap, gameTypeNum) {
                return (bitmap & (1 << gameTypeNum)) > 0;
            },
            
            getProperty: function(propertyName, defaultValue) {
                var storedValue = localStorage.getItem(propertyName);
                return storedValue !== null ? storedValue : defaultValue;
            },
            
            setProperty: function(propertyName, newValue) {
              localStorage[propertyName] = newValue;
            },
            
            // Fills quick filter bar with available game type links
            fillModesBar: function () {
                var filtersBitmap = QL_GTS.getProperty("ql_gts_filters_bitmap", 0xFFFFFFFF);
                var quickFilterContent = "";
                // Dynamically create links
                for (var i in QL_GTS.GAME_TYPES) {
                    // Check if this game type is enabled in the settings
                    if (QL_GTS.isGameTypeEnabled(filtersBitmap, QL_GTS.GAME_TYPES[i][QL_GTS.ID])) { 
                        quickFilterContent += '<a id="'+QL_GTS.GAME_TYPES[i][QL_GTS.ID]+'" title="'+QL_GTS.GAME_TYPES[i][QL_GTS.TITLE]+'" class="qfLink" href="javascript:;"><img src='+quakelive.resource('/images/gametypes/xsm/'+QL_GTS.GAME_TYPES[i][QL_GTS.IMAGE]+'.png')+' />'+QL_GTS.GAME_TYPES[i][QL_GTS.NAME]+'</a> ';
                    }
                }

                // Replace content of quick filter bar
                $('#quickFilterGTList').html(quickFilterContent);
                
                // Attach action for game type links
                $('.qfLink').click(function() {
                    $("#ctrl_filter_gametype").val(this.id).attr("selected", "selected");
                    $("#ctrl_filter_gametype").change();
                    quakelive.mod_home.SaveBrowserFilter();
                });
                return false;
            },

            // Function that display QL Prompt asking for users customization settings
            configureFilters: function () {
                var filtersBitmap = QL_GTS.getProperty("ql_gts_filters_bitmap", 0xFFFFFFFF);
                var promptContent = 'Select game modes that you want to display on the quick filter bar:<br /><br />';
                
                for (var i in QL_GTS.GAME_TYPES) {
                    var chboxIdentifier = 'ql_gts_chb_'+QL_GTS.GAME_TYPES[i][QL_GTS.ID];
                    var checkedAttr = QL_GTS.isGameTypeEnabled(filtersBitmap, QL_GTS.GAME_TYPES[i][QL_GTS.ID]) ? 'checked="checked"' : '';
                    promptContent += '<span style="display: inline-block;"><input type="checkbox" id="'+chboxIdentifier+'" value="'+QL_GTS.GAME_TYPES[i][QL_GTS.ID]+'" '+checkedAttr+' /> <label for="'+chboxIdentifier+'"><img src='+quakelive.resource('/images/gametypes/xsm/'+QL_GTS.GAME_TYPES[i][QL_GTS.IMAGE]+'.png')+' />'+QL_GTS.GAME_TYPES[i][QL_GTS.NAME]+'</label></span>&nbsp;&nbsp;&nbsp;';
                }
                promptContent += "<br /><br /><a id='ql_gts_selectAll' href='javascript:;'>Select All</a> | <a id='ql_gts_selectNone' href='javascript:;'>Select None</a><br />";
                
                qlPrompt({
                    customWidth: 850,
                    title: "Customize Quick Game Type Filter",
                    body: promptContent,
                    input: false,
                    inputReadOnly: false,
                    alert: false,
                    ok: function () {
                            // Assume empty bitmap like nothing is selected
                            var filtersBitmap = 0;
                            $('#prompt input:checkbox:checked').each(function(i) {
                                var gameTypeNum = parseInt(this.value);
                                if (gameTypeNum >= 0 && gameTypeNum <= QL_GTS.MAX_GAMETYPE_NUM) {
                                    // Set 1 on the bit number equal to game type number
                                    filtersBitmap |= 1 << gameTypeNum;
                                }
                            });
                            $("#prompt").jqmHide();
                            
                            // Save bitmap in local storage for future
                            QL_GTS.setProperty("ql_gts_filters_bitmap", filtersBitmap);
                            
                            // Refresh game modes list on the quick filter bar
                            QL_GTS.fillModesBar();
                            QL_GTS.adjustServerBrowserHeight();
                        }
                });
                
                // Attach actions to Select All and Select None links on the customization pop-up
                $('#ql_gts_selectAll').click(function () {
                    $('#prompt input:checkbox').attr('checked', true);
                });
                $('#ql_gts_selectNone').click(function () {
                    $('#prompt input:checkbox').attr('checked', false);
                });

                return false;
            },
            
            adjustServerBrowserHeight: function () {
                if (QL_GTS.browserInitialHeight == 0) {
                    QL_GTS.browserInitialHeight = $('#qlv_postlogin_matches').height();
                }
                var divHeight = $('#quickFilter').height() + 7;
                $('#qlv_postlogin_matches').css('margin-top', divHeight);
                $('#qlv_postlogin_matches').css('height', QL_GTS.browserInitialHeight - divHeight + 'px');
            },
            
            // Function that is called to initialize QL_GTS
            initialize: function() {
                // Attach action to customize button that opens settings pop-up
                $('#qfCustomize').click(QL_GTS.configureFilters);
                
                // Fill game modes list on the quick filter bar
                QL_GTS.fillModesBar();
            }
        }
        
        // Add private and public matches quick switch (both are not displayed by default)
        $('#matchlist_header').prepend('<a id="qfSvShowPrivate" class="qfSvTypeLink" href="javascript:;" >Private Matches</a>'+
                                       '<a id="qfSvShowPublic" class="qfSvTypeLink" href="javascript:;" >Public Matches</a>');
        // Add space with quick filter above the server list
        $('#matchlist_header').append('<div id="quickFilter"> \
            <b>Mode:</b> <span id="quickFilterGTList"></span>'+
            '<span style="float: right; margin: 0 2px;"><a href="javascript:;" id="qfCustomize"><img title="Customize Quick Filter" src='+quakelive.resource('/images/modules/clans/ranks/rank_1.png')+' /></a></span>'+
            '</div>');
        
        // Attach action to link that changes server type to private
        $('#qfSvShowPrivate').click(function() {
            $("input:radio[name=private][value=1]").trigger('click');
            $("input:radio[name=private][value=1]").trigger('click'); // need two clicks to trigger action, dunno why
            quakelive.mod_home.SaveBrowserFilter();
        });
        // Attach action to link that changes server type to public
        $('#qfSvShowPublic').click(function() {
            $("input:radio[name=private][value=0]").trigger('click');
            $("input:radio[name=private][value=0]").trigger('click'); // need two clicks to trigger action, dunno why
            quakelive.mod_home.SaveBrowserFilter();
        });
    
        QL_GTS.initialize();
        QL_GTS.adjustServerBrowserHeight();
        
    };
    
    // Wrap around save browser settings success function to disable toggling of customize bar
    var oldSaveSuccess = quakelive.mod_home.SaveBrowserFilter_Success;
    quakelive.mod_home.SaveBrowserFilter_Success = function() {
        // Save handle to old toggle function and replace with empty one
        var tmpToggleFunc = quakelive.mod_home.ToggleFilterBar;
        quakelive.mod_home.ToggleFilterBar = function () {};
        oldSaveSuccess();
        // Restore normal toggle function
        quakelive.mod_home.ToggleFilterBar = tmpToggleFunc;
    };

    // Wrap around refresh filter UI function to show proper action of switching between server types
    var oldRefreshFilter = quakelive.mod_home.UI_RefreshFilter;
    quakelive.mod_home.UI_RefreshFilter = function() {
        // This function is called internally by QL so we can listen to match type changes
        oldRefreshFilter();
        var mlHeaderClassName = $("#matchlist_header").attr("class");
        if ("matchlist_header_public" == mlHeaderClassName) {
            $('#qfSvShowPublic').css('display', 'none');
            $('#qfSvShowPrivate').css('display', 'inline');
        } else {
            $('#qfSvShowPublic').css('display', 'inline');
            $('#qfSvShowPrivate').css('display', 'none');
        }
    };
}

QL_GTS_Init();


