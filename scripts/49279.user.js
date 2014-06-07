// ==UserScript==
// @name            Atithasos Ikariam Overview Table
// @namespace       Ikariam Script
// @description     Overview Table helps you to see detailed information about your cities, resources, buildings and army.
// @author          Atithasos
// @version         v3.1.103
// @include         http://*.ikariam.*/index.php*
// @require         http://atithasos.biz/Scripts/Atithasos Update/Atithasos_Update.js
// @require         http://atithasos.biz/Scripts/Atithasos Overview/config.js
// @require         http://atithasos.biz/Scripts/Atithasos Overview/lang.js
// @require         http://atithasos.biz/Scripts/Atithasos Overview/tools.js
// @require         http://atithasos.biz/Scripts/Atithasos Overview/lib.js
// @require         http://atithasos.biz/Scripts/Atithasos Overview/images.js
// @require         http://atithasos.biz/Scripts/Atithasos Overview/data.js
// @require         http://atithasos.biz/Scripts/Atithasos Overview/view.js
// @require         http://atithasos.biz/Scripts/Atithasos Overview/table.js
// @require         http://atithasos.biz/Scripts/Atithasos Overview/predict.js
// @require         http://atithasos.biz/Scripts/Atithasos Overview/scoreinfo.js
// @require         http://atithasos.biz/Scripts/Atithasos Overview/load.js
// @require         http://atithasos.biz/Scripts/Atithasos Overview/style.js
// @history v3.1.103 I Change the update script to local Script
// @history v3.1.102 UTF-8 Supporting
// @history v3.1.101 Reconstruction Of data.js
// @history v3.1.100 Script Auto Update
// @history v3.1.001 Initial release English Only									
// ==/UserScript==
// 
///////////////////////////////////////////////////////////////////////////////////////
// Summary:                                                                          //
///////////////////////////////////////////////////////////////////////////////////////
// Language: English                                                                 //
//                                                                                   //
// Script Summary:                                                                   //
//    - Fiendly Interface                                                            //
//    - Auto Refresh                                                                 //
//    - Alarm Sounds                                                                 //
//    - InLine Score                                                                 //
//    - Resources, Cityes, Buildings, Army & Research overview                       //
//    - Town Hall fullness predict                                                   //
//                                                                                   //
// Buildings Quick Upgrade max level support:                                        //
//    - Town Hall:              Level 28                                             //
//    - Academy:                Level 23                                             //
//    - Trading Port:           Level 26                                             //
//    - Shipyard:               Level 22                                             //
//    - Warehouse:              Level 40                                             //
//    - Town Wall:              Level 32                                             //
//    - Tavern:                 Level 28                                             //
//    - Museum:                 Level 16                                             //
//    - Palace:                 Level 10                                             //
//    - Governor's Residence:   Level 10                                             //
//    - Embassy:                Level 32                                             //
//    - Trading Post:           Level 21                                             //
//    - Hideout:                Level 32                                             //
//    - Barracks:               Level 28                                             //
//    - Workshop:               Level 26                                             //
//    - Forester's house:       Level 22                                             //
//    - Stonemason:             Level 24                                             //
//    - Glassblower:            Level 24                                             //
//    - Winegrower:             Level 24                                             //
//    - Alchemist's Tower:      Level 24                                             //
//    - Carpenter:              Level 32                                             //
//    - Architect's Office:     Level 32                                             //
//    - Optician:               Level 32                                             //
//    - Wine Cellars:           Level 32                                             //
//    - Firework Test Area:     Level 28                                             //
//                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////
// Changes v3.1.100:                                                                 //
///////////////////////////////////////////////////////////////////////////////////////
// Just Started                                                                      //
///////////////////////////////////////////////////////////////////////////////////////
//
// Update using Scripts Updater
ScriptUpdater.check(49279, "v3.1.103")
//
//Script Started
overview_table();