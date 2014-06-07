// ==UserScript==
// @name                        Lord1982 Overview Table kappa
// @namespace                   Lord Script
// @description                 Ikariam Overview Table, based on kChen Overview and old Alarm And Overview Table.
// @author                      Lord1982
// @version                     v1
// @include                     http://s10.ikariam.es/index.php*
// @require                     http://userscripts.org/scripts/source/42606.user.js
// @require                     http://userscripts.org/scripts/source/42608.user.js
// @require                     http://userscripts.org/scripts/source/42609.user.js
// @require                     http://userscripts.org/scripts/source/42610.user.js
// @require                     http://userscripts.org/scripts/source/42611.user.js
// @require                     http://userscripts.org/scripts/source/42612.user.js
// @require                     http://userscripts.org/scripts/source/42613.user.js
// @require                     http://userscripts.org/scripts/source/42614.user.js
// @require                     http://userscripts.org/scripts/source/42615.user.js
// @require                     http://userscripts.org/scripts/source/42616.user.js
// @require                     http://userscripts.org/scripts/source/42617.user.js
// @resource icon_speed         http://gigel.mavyk.ro/001/pic/icon_speed.gif
// @resource icon_academy       http://gigel.mavyk.ro/001/pic/icon_academy.gif
// @resource icon_warehouse     http://gigel.mavyk.ro/001/pic/icon_warehouse.gif
// @resource icon_wall          http://gigel.mavyk.ro/001/pic/icon_wall.gif
// @resource icon_palacecolony  http://gigel.mavyk.ro/001/pic/icon_palacecolony.gif
// @resource icon_forester      http://gigel.mavyk.ro/001/pic/icon_forester.gif
// @resource icon_stonemason    http://gigel.mavyk.ro/001/pic/icon_stonemason.gif
// @resource icon_glassblowing  http://gigel.mavyk.ro/001/pic/icon_glassblowing.gif
// @resource icon_winegrower    http://gigel.mavyk.ro/001/pic/icon_winegrower.gif
// @resource icon_alchemist     http://gigel.mavyk.ro/001/pic/icon_alchemist.gif
// @resource icon_carpentering  http://gigel.mavyk.ro/001/pic/icon_carpentering.gif
// @resource icon_architect     http://gigel.mavyk.ro/001/pic/icon_architect.gif
// @resource icon_optician      http://gigel.mavyk.ro/001/pic/icon_optician.gif
// @resource icon_vineyard      http://gigel.mavyk.ro/001/pic/icon_vineyard.gif
// @resource icon_fireworker    http://gigel.mavyk.ro/001/pic/icon_fireworker.gif
// @resource sound_alarm        http://gigel.mavyk.ro/001/sound/alarm.wav
// @resource sound_warning      http://gigel.mavyk.ro/001/sound/warning.wav
// ==/UserScript==
// 
////////////////////////////////////////////////////////////////////////////////////////
// Summary:                                                                           //
////////////////////////////////////////////////////////////////////////////////////////
// Language Support:        Romanian & English                                        //
//                                                                                    //
// Script Summary:                                                                    //
//    - Fiendly Interface                                                             //
//    - Auto Refresh                                                                  //
//    - Alarm Sounds                                                                  //
//    - InLine Score                                                                  //
//    - Resources, Cityes, Buildings, Army, Research, Transport & Players overview    //
//    - Town Hall fullness predict                                                    //
//                                                                                    //
// Buildings Quick Upgrade max level support:                                         //
//    - Town Hall:              Level 27                                              //
//    - Academy:                Level 23                                              //
//    - Trading Port:           Level 24                                              //
//    - Shipyard:               Level 19                                              //
//    - Warehouse:              Level 32                                              //
//    - Town Wall:              Level 29                                              //
//    - Tavern:                 Level 26                                              //
//    - Museum:                 Level 13                                              //
//    - Palace:                 Level 9                                               //
//    - Governor's Residence:   Level 9                                               //
//    - Embassy:                Level 26                                              //
//    - Trading Post:           Level 18                                              //
//    - Hideout:                Level 26                                              //
//    - Barracks:               Level 28                                              //
//    - Workshop:               Level 26                                              //
//    - Forester's house:       Level 19                                              //
//    - Stonemason:             Level 21                                              //
//    - Glassblower:            Level 21                                              //
//    - Winegrower:             Level 21                                              //
//    - Alchemist's Tower:      Level 21                                              //
//    - Carpenter:              Level 32                                              //
//    - Architect's Office:     Level 32                                              //
//    - Optician:               Level 16                                              //
//    - Wine Cellars:           Level 27                                              //
//    - Firework Test Area:     Level 16                                              //
////////////////////////////////////////////////////////////////////////////////////////

var server        = /\/\/([a-z._0-9]+)\//.exec(document.URL)[1];
var config        = getConfig();
var players       = getPlayers();
var _startTime    = new Date().getTime();
var scriptversion = "v0.3.0.001";

overview_table();
predictPopulationOverfull();