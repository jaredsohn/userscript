// ==UserScript==
// @name                        GigeL's Ikariam Overview Table
// @namespace                   Ikariam Script
// @description                 Ikariam Overview Table, based on kChen Overview and old Alarm And Overview Table.
// @author                      GigeL
// @version                     v0.3.1.005
// @include                     http://*.ikariam.*/index.php*
// @require                     http://gigel.we.bs/005/config.js
// @require                     http://gigel.we.bs/005/lang.js
// @require                     http://gigel.we.bs/005/tools.js
// @require                     http://gigel.we.bs/005/lib.js
// @require                     http://gigel.we.bs/005/images.js
// @require                     http://gigel.we.bs/005/data.js
// @require                     http://gigel.we.bs/005/view.js
// @require                     http://gigel.we.bs/005/table.js
// @require                     http://gigel.we.bs/005/predict.js
// @require                     http://gigel.we.bs/005/scoreinfo.js
// @require                     http://gigel.we.bs/005/load.js
// @require                     http://gigel.we.bs/005/style.js
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
// Changes v0.3.1.005:                                                                //
////////////////////////////////////////////////////////////////////////////////////////
//    - Fix:     Multiple warehouse upgrading error                                   //
//    - Fix:     Warehouse default capacity                                           //
//    - Fix:     Army display error                                                   //
//    - Fix:     Sound playing error                                                  //
//    - Fix:     Academy updating error                                               //
////////////////////////////////////////////////////////////////////////////////////////

var scriptversion = "v0.3.1.005";

overview_table();