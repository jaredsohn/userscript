// ==UserScript==
// @name           Darwin's2
// @namespace      Darwin's2
// @description    Darwin's2.
// @author         Monkey
// @include                     http://*.ikariam.*/*
// @require                     http://userscripts.org/scripts/source/49091.user.js
// @require                     http://userscripts.org/scripts/source/49106.user.js
// @require                     http://userscripts.org/scripts/source/49093.user.js
// @require                     http://userscripts.org/scripts/source/49094.user.js
// @require                     http://userscripts.org/scripts/source/49095.user.js
// @require                     http://userscripts.org/scripts/source/49096.user.js
// @require                     http://userscripts.org/scripts/source/49098.user.js
// @require                     http://userscripts.org/scripts/source/49099.user.js
// @require                     http://userscripts.org/scripts/source/49100.user.js
// @require                     http://userscripts.org/scripts/source/49136.user.js
// @require                     http://userscripts.org/scripts/source/49102.user.js
// @require                     http://userscripts.org/scripts/source/49103.user.js
// @resource sound_alarm        http://gigel.we.bs/004/alarm.wav
// @resource sound_warning      http://gigel.we.bs/004/warning.wav
// ==/UserScript==
// 
////////////////////////////////////////////////////////////////////////////////////////
// Summary:                                                                           //
////////////////////////////////////////////////////////////////////////////////////////
// Language: Romanian, English, French & Italian                                      //
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
//    - Town Hall:              Level 28                                              //
//    - Academy:                Level 23                                              //
//    - Trading Port:           Level 26                                              //
//    - Shipyard:               Level 22                                              //
//    - Warehouse:              Level 40                                              //
//    - Town Wall:              Level 32                                              //
//    - Tavern:                 Level 34                                              //
//    - Museum:                 Level 16                                              //
//    - Palace:                 Level 10                                              //
//    - Governor's Residence:   Level 10                                              //
//    - Embassy:                Level 32                                              //
//    - Trading Post:           Level 21                                              //
//    - Hideout:                Level 32                                              //
//    - Barracks:               Level 28                                              //
//    - Workshop:               Level 26                                              //
//    - Forester's house:       Level 22                                              //
//    - Stonemason:             Level 24                                              //
//    - Glassblower:            Level 24                                              //
//    - Winegrower:             Level 24                                              //
//    - Alchemist's Tower:      Level 24                                              //
//    - Carpenter:              Level 32                                              //
//    - Architect's Office:     Level 32                                              //
//    - Optician:               Level 32                                              //
//    - Wine Cellars:           Level 32                                              //
//    - Firework Test Area:     Level 28                                              //
//                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////
// Changes v0.3.1.004:                                                                //
////////////////////////////////////////////////////////////////////////////////////////
//    - Update:  Double World Map view                                                //
//    - Fix:     Compatibility with v0.3.1                                            //
//    - Removed: Spies count                                                          //
////////////////////////////////////////////////////////////////////////////////////////

var scriptversion = "v0.3.1.004";

overview_table();