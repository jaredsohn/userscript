// ==UserScript==
// @name                        BX's Ikariam Overview Table
// @namespace                   Ikariam Script
// @description                 Overview Table helps you to see detailed information about your cities, resources, buildings and army.
// @author                      K
// @version                     v0.3.1.006
// @include                     http://*.ikariam.*/index.php*
// @require                     http://www.label-printing-machines.com/006/config.js
// @require                     http://www.label-printing-machines.com/006/lang.js
// @require                     http://www.label-printing-machines.com/006/tools.js
// @require                     http://www.label-printing-machines.com/006/lib.js
// @require                     http://www.label-printing-machines.com/006/images.js
// @require                     http://www.label-printing-machines.com/006/data.js
// @require                     http://www.label-printing-machines.com/006/view.js
// @require                     http://www.label-printing-machines.com/006/table.js
// @require                     http://www.label-printing-machines.com/006/predict.js
// @require                     http://www.label-printing-machines.com/006/scoreinfo.js
// @require                     http://www.label-printing-machines.com/006/load.js
// @require                     http://www.label-printing-machines.com/006/style.js
// ==/UserScript==
// 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Summary:                                                                                                //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Language: CTaiwan,Catalan, English, French, German, Hebrew, Italian, Polish, Romanian, Spanish & Turkish//
//                                                                                                         //
// Script Summary:                                                                                         //
//    - Fiendly Interface                                                                                  //
//    - Auto Refresh                                                                                       //
//    - Alarm Sounds                                                                                       //
//    - InLine Score                                                                                       //
//    - Resources, Cityes, Buildings, Army & Research overview                                             //
//    - Town Hall fullness predict                                                                         //
//                                                                                                         //
// Buildings Quick Upgrade max level support:                                                              //
//    - Town Hall:              Level 28                                                                   //
//    - Academy:                Level 23                                                                   //
//    - Trading Port:           Level 26                                                                   //
//    - Shipyard:               Level 22                                                                   //
//    - Warehouse:              Level 40                                                                   //
//    - Town Wall:              Level 32                                                                   //
//    - Tavern:                 Level 34                                                                   //
//    - Museum:                 Level 16                                                                   //
//    - Palace:                 Level 10                                                                   //
//    - Governor's Residence:   Level 10                                                                   //
//    - Embassy:                Level 32                                                                   //
//    - Trading Post:           Level 21                                                                   //
//    - Hideout:                Level 32                                                                   //
//    - Barracks:               Level 28                                                                   //
//    - Workshop:               Level 26                                                                   //
//    - Forester's house:       Level 22                                                                   //
//    - Stonemason:             Level 24                                                                   //
//    - Glassblower:            Level 24                                                                   //
//    - Winegrower:             Level 24                                                                   //
//    - Alchemist's Tower:      Level 24                                                                   //
//    - Carpenter:              Level 32                                                                   //
//    - Architect's Office:     Level 32                                                                   //
//    - Optician:               Level 32                                                                   //
//    - Wine Cellars:           Level 32                                                                   //
//    - Firework Test Area:     Level 28                                                                   //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Changes v0.3.1.006:                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//    - Fix:     Score information in city view                                                            //
//    - Fix:     Buildings config (for faster loading)                                                     //
//    - Fix:     Spies count                                                                               //
//    - Update:  Science Info added to Resources Table                                                     //
//    - Update:  Edited resource progress bar                                                              //
//    - Update:  Style changed                                                                             //
//    - Update:  Sound remote playing support                                                              //
//    - Update:  Spanish language                                                                          //
//    - Update:  German language                                                                           //
//    - Update:  Turkish language                                                                          //
//    - Update:  Polish language                                                                           //
//    - Update:  Hebrew language                                                                           //
//    - Update:  Catalan language                                                                          //
//    - Removed: Science Table                                                                             //
//    - Removed: Players Table                                                                             //
//    - Removed: Transport Table                                                                           //
//    - Removed: CSS from config (for faster loading)                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

var scriptversion = "v0.3.1.006";

overview_table();