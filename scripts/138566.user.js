// ==UserScript==
// @name        lou-extensions
// @namespace   https://github.com/ConanLoxley/lou-extensions
// @description Collection of extensions for Lord of Ultima (http://www.lordofultima.com/)
// @include     http://prodgame*.lordofultima.com/*
// @downloadURL https://userscripts.org/scripts/source/138566.user.js
// @updateURL   https://userscripts.org/scripts/source/138566.meta.js
// @version     0.7.2
// @run-at      document-end
// @grant       GM_info
// @grant       GM_getResourceText
// @grant       GM_getResourceURL
// @icon        http://conanloxley.github.com/lou-extensions/release/icons/icon48.png
// @require     http://conanloxley.github.com/lou-extensions/release/extensions/options.js
// @require     http://conanloxley.github.com/lou-extensions/release/extensions/inject.js
// @resource    extensions/ui_ListScriptView                    http://conanloxley.github.com/lou-extensions/release/extensions/ui/ListScriptView.js
// @resource    extensions/ui_main                              http://conanloxley.github.com/lou-extensions/release/extensions/ui/main.js
// @resource    extensions/sprintf                              http://conanloxley.github.com/lou-extensions/release/extensions/sprintf.min.js
// @resource    compat/qooxdoo                                  http://conanloxley.github.com/lou-extensions/release/compat/compat_qooxdoo.js
// @resource    compat/lou                                      http://conanloxley.github.com/lou-extensions/release/compat/compat_lou.js
// @resource    louBos/const                                    http://conanloxley.github.com/lou-extensions/release/louBos/bos_const.js
// @resource    louBos/LocalizedStrings                         http://conanloxley.github.com/lou-extensions/release/louBos/bos_LocalizedStrings.js
// @resource    louBos/gui_SummaryPage                          http://conanloxley.github.com/lou-extensions/release/louBos/bos_gui_SummaryPage.js
// @resource    louBos/gui_ResourcesFillerWidget                http://conanloxley.github.com/lou-extensions/release/louBos/bos_gui_ResourcesFillerWidget.js
// @resource    louBos/BatchResourcesFiller                     http://conanloxley.github.com/lou-extensions/release/louBos/bos_BatchResourcesFiller.js
// @resource    louBos/ResourcesFiller                          http://conanloxley.github.com/lou-extensions/release/louBos/bos_ResourcesFiller.js
// @resource    louBos/Server                                   http://conanloxley.github.com/lou-extensions/release/louBos/bos_Server.js
// @resource    louBos/Storage                                  http://conanloxley.github.com/lou-extensions/release/louBos/bos_Storage.js
// @resource    louBos/net_CommandManager                       http://conanloxley.github.com/lou-extensions/release/louBos/bos_net_CommandManager.js
// @resource    louBos/Tweaks                                   http://conanloxley.github.com/lou-extensions/release/louBos/bos_Tweaks.js
// @resource    louBos/Main                                     http://conanloxley.github.com/lou-extensions/release/louBos/bos_Main.js
// @resource    louBos/SharestringConverter                     http://conanloxley.github.com/lou-extensions/release/louBos/bos_SharestringConverter.js
// @resource    louBos/Utils                                    http://conanloxley.github.com/lou-extensions/release/louBos/bos_Utils.js
// @resource    louBos/CityTypes                                http://conanloxley.github.com/lou-extensions/release/louBos/bos_CityTypes.js
// @resource    louBos/City                                     http://conanloxley.github.com/lou-extensions/release/louBos/bos_City.js
// @resource    louBos/gui_TradeOrdersPage                      http://conanloxley.github.com/lou-extensions/release/louBos/bos_gui_TradeOrdersPage.js
// @resource    louBos/gui_TradeRouteWidget                     http://conanloxley.github.com/lou-extensions/release/louBos/bos_gui_TradeRouteWidget.js
// @resource    louBos/gui_PurifyOptionsWidget                  http://conanloxley.github.com/lou-extensions/release/louBos/bos_gui_PurifyOptionsWidget.js
// @resource    louBos/gui_PurifyResourcesPage                  http://conanloxley.github.com/lou-extensions/release/louBos/bos_gui_PurifyResourcesPage.js
// @resource    louBos/gui_TradeRoutesPage                      http://conanloxley.github.com/lou-extensions/release/louBos/bos_gui_TradeRoutesPage.js
// @resource    louBos/gui_MyAlliancePage                       http://conanloxley.github.com/lou-extensions/release/louBos/bos_gui_MyAlliancePage.js
// @resource    louBos/gui_IntelligenceOptionsWidget            http://conanloxley.github.com/lou-extensions/release/louBos/bos_gui_IntelligenceOptionsWidget.js
// @resource    louBos/gui_IntelligencePage                     http://conanloxley.github.com/lou-extensions/release/louBos/bos_gui_IntelligencePage.js
// @resource    louBos/gui_PlayerInfoPage                       http://conanloxley.github.com/lou-extensions/release/louBos/bos_gui_PlayerInfoPage.js
// @resource    louBos/gui_AllianceInfoPage                     http://conanloxley.github.com/lou-extensions/release/louBos/bos_gui_AllianceInfoPage.js
// @resource    louBos/gui_IncomingAttacksPage                  http://conanloxley.github.com/lou-extensions/release/louBos/bos_gui_IncomingAttacksPage.js
// @resource    louBos/gui_MassRecruitmentOptionsWidget         http://conanloxley.github.com/lou-extensions/release/louBos/bos_gui_MassRecruitmentOptionsWidget.js
// @resource    louBos/gui_MassRecruitmentPage                  http://conanloxley.github.com/lou-extensions/release/louBos/bos_gui_MassRecruitmentPage.js
// @resource    louBos/gui_UnitOrdersPage                       http://conanloxley.github.com/lou-extensions/release/louBos/bos_gui_UnitOrdersPage.js
// @resource    louBos/gui_RegionPage                           http://conanloxley.github.com/lou-extensions/release/louBos/bos_gui_RegionPage.js
// @resource    louBos/gui_DungeonsPage                         http://conanloxley.github.com/lou-extensions/release/louBos/bos_gui_DungeonsPage.js
// @resource    louBos/gui_CastlesPage                          http://conanloxley.github.com/lou-extensions/release/louBos/bos_gui_CastlesPage.js
// @resource    louBos/gui_CitiesPage                           http://conanloxley.github.com/lou-extensions/release/louBos/bos_gui_CitiesPage.js
// @resource    louBos/gui_OptionsPage                          http://conanloxley.github.com/lou-extensions/release/louBos/bos_gui_OptionsPage.js
// @resource    louBos/gui_MilitaryPage                         http://conanloxley.github.com/lou-extensions/release/louBos/bos_gui_MilitaryPage.js
// @resource    louBos/gui_DefendersPage                        http://conanloxley.github.com/lou-extensions/release/louBos/bos_gui_DefendersPage.js
// @resource    louBos/gui_ExtraSummaryWidget                   http://conanloxley.github.com/lou-extensions/release/louBos/bos_gui_ExtraSummaryWidget.js
// @resource    louBos/gui_SummaryWidget                        http://conanloxley.github.com/lou-extensions/release/louBos/bos_gui_SummaryWidget.js
// @resource    louBos/gui_FoodCalculatorWidget                 http://conanloxley.github.com/lou-extensions/release/louBos/bos_gui_FoodCalculatorWidget.js
// @resource    louBos/gui_RecruitmentSpeedCalculatorWidget     http://conanloxley.github.com/lou-extensions/release/louBos/bos_gui_RecruitmentSpeedCalculatorWidget.js
// @resource    louBos/gui_CombatCalculatorWidget               http://conanloxley.github.com/lou-extensions/release/louBos/bos_gui_CombatCalculatorWidget.js
// @resource    louBos/ui_table_cellrenderer_Default            http://conanloxley.github.com/lou-extensions/release/louBos/bos_ui_table_cellrenderer_Default.js
// @resource    louBos/ui_table_cellrenderer_HumanTime          http://conanloxley.github.com/lou-extensions/release/louBos/bos_ui_table_cellrenderer_HumanTime.js
// @resource    louBos/ui_table_cellrenderer_ClickableLook      http://conanloxley.github.com/lou-extensions/release/louBos/bos_ui_table_cellrenderer_ClickableLook.js
// @resource    louBos/ui_table_cellrenderer_Resource           http://conanloxley.github.com/lou-extensions/release/louBos/bos_ui_table_cellrenderer_Resource.js
// @resource    louBos/ui_table_cellrenderer_FullAt             http://conanloxley.github.com/lou-extensions/release/louBos/bos_ui_table_cellrenderer_FullAt.js
// @resource    louBos/ui_table_Table                           http://conanloxley.github.com/lou-extensions/release/louBos/bos_ui_table_Table.js
// @resource    louTweak/globals                                http://conanloxley.github.com/lou-extensions/release/louTweak/louTweak_globals.js
// @resource    louTweak/localizedStrings                       http://conanloxley.github.com/lou-extensions/release/louTweak/louTweak_localizedStrings.js
// @resource    louTweak/main                                   http://conanloxley.github.com/lou-extensions/release/louTweak/louTweak_main.js
// @resource    louTweak/queueTimesLabel                        http://conanloxley.github.com/lou-extensions/release/louTweak/louTweak_queueTimesLabel.js
// @resource    louTweak/incomingResourcesLabel                 http://conanloxley.github.com/lou-extensions/release/louTweak/louTweak_incomingResourcesLabel.js
// @resource    louTweak/optionsPage                            http://conanloxley.github.com/lou-extensions/release/louTweak/louTweak_optionsPage.js
// @resource    louTweak/overlayObject                          http://conanloxley.github.com/lou-extensions/release/louTweak/louTweak_overlayObject.js
// @resource    louTweak/layoutWindow                           http://conanloxley.github.com/lou-extensions/release/louTweak/louTweak_layoutWindow.js
// @resource    louTweak/miniMap                                http://conanloxley.github.com/lou-extensions/release/louTweak/louTweak_miniMap.js
// @resource    louTweak/checkIfLoaded                          http://conanloxley.github.com/lou-extensions/release/louTweak/louTweak_checkIfLoaded.js
// @resource    louMerc3/paTweak3_pakMap                        http://conanloxley.github.com/lou-extensions/release/louMerc3/paTweak3_pakMap.js
// @resource    louMerc3/paTweak3_Version                       http://conanloxley.github.com/lou-extensions/release/louMerc3/paTweak3_Version.js
// @resource    louMerc3/paTweak3_Main                          http://conanloxley.github.com/lou-extensions/release/louMerc3/paTweak3_Main.js
// @resource    louMerc3/paTweak3_utils                         http://conanloxley.github.com/lou-extensions/release/louMerc3/paTweak3_utils.js
// @resource    louMerc3/paTweak3_ui_IncomingAttacksWindow      http://conanloxley.github.com/lou-extensions/release/louMerc3/paTweak3_ui_IncomingAttacksWindow.js
// @resource    louMerc3/paTweak3_ui_RaidReporter               http://conanloxley.github.com/lou-extensions/release/louMerc3/paTweak3_ui_RaidReporter.js
// @resource    louMerc3/paTweak3_ui_RaidingWindow              http://conanloxley.github.com/lou-extensions/release/louMerc3/paTweak3_ui_RaidingWindow.js
// @resource    louMerc3/paTweak3_ui_PalaceItemsWindow          http://conanloxley.github.com/lou-extensions/release/louMerc3/paTweak3_ui_PalaceItemsWindow.js
// @resource    louMerc3/paTweak3_ui_AllianceMailingListWindows http://conanloxley.github.com/lou-extensions/release/louMerc3/paTweak3_ui_AllianceMailingListWindow.js
// @resource    louMerc3/paTweak3_ui_ReturnByWindow             http://conanloxley.github.com/lou-extensions/release/louMerc3/paTweak3_ui_ReturnByWindow.js
// @resource    louMerc3/paTweak3_ui_PlayerReportsWindow        http://conanloxley.github.com/lou-extensions/release/louMerc3/paTweak3_ui_PlayerReportsWindow.js
// @resource    louMerc3/paTweak3_CombatTools                   http://conanloxley.github.com/lou-extensions/release/louMerc3/paTweak3_CombatTools.js
// @resource    louMerc3/paTweak3_CoordUtils                    http://conanloxley.github.com/lou-extensions/release/louMerc3/paTweak3_CoordUtils.js
// @resource    louMerc3/paTweak3_BossUtils                     http://conanloxley.github.com/lou-extensions/release/louMerc3/paTweak3_BossUtils.js
// @resource    louMerc3/paTweak3_ui_components_AttackOrder     http://conanloxley.github.com/lou-extensions/release/louMerc3/paTweak3_ui_components_AttackOrder.js
// @resource    louMerc3/paTweak3_ui_components_LeftPanel       http://conanloxley.github.com/lou-extensions/release/louMerc3/paTweak3_ui_components_LeftPanel.js
// @resource    louMerc3/paTweak3_ui_components_TimePicker      http://conanloxley.github.com/lou-extensions/release/louMerc3/paTweak3_ui_components_TimePicker.js
// @resource    louMerc3/paTweak3_ui_AboutWindow                http://conanloxley.github.com/lou-extensions/release/louMerc3/paTweak3_ui_AboutWindow.js
// @resource    louMerc3/paTweak3_ui_CancelOrderPanel           http://conanloxley.github.com/lou-extensions/release/louMerc3/paTweak3_ui_CancelOrderPanel.js
// @resource    louMerc3/paTweak3_ui_CombatWindow               http://conanloxley.github.com/lou-extensions/release/louMerc3/paTweak3_ui_CombatWindow.js
// @resource    louMerc3/paTweak3_ui_CombatWindowExport         http://conanloxley.github.com/lou-extensions/release/louMerc3/paTweak3_ui_CombatWindowExport.js
// @resource    louMerc3/paTweak3_ui_IdleRaidUnitsTable         http://conanloxley.github.com/lou-extensions/release/louMerc3/paTweak3_ui_IdleRaidUnitsTable.js
// @resource    louMerc3/paTweak3_ui_ExtraTools                 http://conanloxley.github.com/lou-extensions/release/louMerc3/paTweak3_ui_ExtraTools.js
// @resource    louMerc3/paTweak3_checkIfLoaded                 http://conanloxley.github.com/lou-extensions/release/louMerc3/paTweak3_checkIfLoaded.js
// ==/UserScript==

/**
 * Main function
 */
"use strict";

var theWindow = (typeof(unsafeWindow) == "undefined") ? window : unsafeWindow;
theWindow.lou_extensions = theWindow.lou_extensions || {};

(function (lou_extensions) {
    try {
        console.log("[lou-extensions] Loading LoU extensions.");

        var info = getScriptMetaData();

        lou_extensions.version = info.script.version;

        if (info.script && info.script.resources2) {
            loadExtensions(info.script.resources2);
        } else {
            console.log("[lou-extensions] ERROR: No resources found in MetaData block. No scripts injected");
        }
    } catch (e) {
        console.log("[lou-extensions] ERROR: " + e.toSource());
    }

    /**
     * Analyse the GM_info to find the resource js and injects them.
     * @param resources Array of resource files that are included in lou-extensions
     */
    function loadExtensions(resources) {

        var options = lou_extensions.getOptions(lou_extensions.version);
        var prefixes = lou_extensions.getEnabledPerScriptPrefix(options);

        for (var i in resources) {

            if (resources.hasOwnProperty(i)) {

                var resource = resources[i];
                var checkForPrefix = resource.name.split("/")[0];

                if (prefixes[checkForPrefix]) {

                    console.log('[lou-extensions] Injecting ' + resource.name);

                    // grab contents of resource-file.
                    var resourceContent = GM_getResourceText(resource.name);
                    var mimetype = resource.mimetype;

                    if (mimetype.indexOf('script') != -1) {
                        lou_extensions.injectScript(resourceContent, mimetype, resource.name);

                    } else if (mimetype.indexOf('css') != -1) {
                        lou_extensions.injectStyle(resourceContent, mimetype, resource.name);

                    } else {
                        console.log("[lou-extensions] Cannot inject a resource with this mime-type."
                            + "\n\tResource name: " + resource.name
                            + "\n\tResource mime-type: " + mimetype
                        );
                    }
                }
            }
        }
    }

    /**
     * Gets the GM_info and adds an array of resource names defined in the meta data
     * @returns {Object} GM_info with possibly empty array of resource names
     */
    function getScriptMetaData() {

        //built-in meta data
        var info = GM_info;

        //add resources from meta data
        if (!"script" in info) {
            info.script = {};
        }

        if (!("resources2" in info.script)) {
            info.script.resources2 = {};
            var resources = info.scriptMetaStr.match(/\/\/ @resource.*/g);

            if (resources != null) {
                for (var i = 0; i < resources.length; i++) {
                    var resourceLine = resources[i].split(/\b\s+/);
                    var resourceName = resourceLine[1];
                    var resourceFile = resourceLine[2];
                    var resourceFileExt = /\w+$/g.exec(resourceFile)[0];
                    var resourceMimeType = "";

                    switch (resourceFileExt.toLowerCase()) {
                        case "js":
                            resourceMimeType = "application/javascript";
                            break;
                        case "css":
                            resourceMimeType = "text/css";
                            break;
                        default:
                    }

                    info.script.resources2[resourceName] = {
                        name: resourceName,
                        mimetype: resourceMimeType,
                        src: resourceFile
                    };
                }
            }
        }

        return info;
    }

})(theWindow.lou_extensions);
