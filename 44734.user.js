// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2, or (at your option)
// any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// ==UserScript==
// @name           OGAME Sidebar
// @description    German Script for OGame (www.ogame.*)
// @version        0.8.8.5
// @include        http://uni*.ogame.*/game/index.php*
// @include        http://s*.ogame.*.*/game/index.php*
// ==/UserScript==

(function () {
  //______Id_Variables______
  var documente = new Object();
  documente["overDiv"] = document.getElementById('overDiv');
  documente["header_top"] = document.getElementById('header_top');
  documente["leftmenu"] = document.getElementById('leftmenu');
  documente["menu"] = document.getElementById('menu');
  documente["content"] = document.getElementById('content');
  documente['combox_container'] = document.getElementById('combox_container');
  documente["combox"] = document.getElementById('combox');
  documente["combox_anfang"] = document.getElementById('anfang');
  documente["combox_ende"] = document.getElementById('ende');
  documente["messagebox"] = document.getElementById('messagebox');
  documente["errorbox"] = document.getElementById('errorbox');
  //______General_Variables______
  /*###*/var general = new Object();/*###*/
  /*###*/general["loc"] = document.location;/*###*/
  /*###*/var reg = /http:\/\/(.*?)\/game/i;/*###*/
  /*###*/general["server"] = reg.exec(general["loc"])[1];/*###*/
  /*###*/reg = /session=(\w+)/i;/*###*/
  /*###*/general["session"] = reg.exec(general["loc"])[1];/*###*/
  /*###*/reg = /page=(\w+)/i;/*###*/
  /*###*/general["page"] = reg.exec(general["loc"])[1];/*###*/
  /*###*/reg = /http:\/\/uni(\w+).ogame/i;/*###*/
  /*###*/general["uni"] = reg.exec(general["loc"])[1];/*###*/
  /*###*/general["planet"];/*###*/
  /*###*/reg = /ogame.(\w+)\/game/i;/*###*/
  /*###*/general["language"] = reg.exec(general["loc"])[1];/*###*/

  if(general["page"] == 'buildings'){
    reg = /mode=(\w+)/i;
    general["mode"] = reg.exec(general["loc"])[1];
  }
  /*###*/general["index"] = "http://"+general["server"]+"/game/index.php?";/*###*/
  /*###*/general["pl1"] = "http://"+general["server"]+"/game/index.php?page=b_building&session="+general["session"]+"&modus=add&techid=";
  /*###*/general["de1"] = "http://"+general["server"]+"/game/index.php?page=b_building&session="+general["session"]+"&modus=remove&listid=";
  /*###*/general["pl2"] = "http://"+general["server"]+"/game/index.php?page=buildings&session="+general["session"]+"&mode=Forschung&bau=";
  /*###*/general["de2"] = "http://"+general["server"]+"/game/index.php?page=buildings&session="+general["session"]+"&mode=Forschung&unbau=";
  /*###*/general["gebaeude__"] = GM_getValue('gebaeude__');
  /*###*/general["forschung__"] = GM_getValue('forschung__');
  /*###*/general["schiffwerft__"] = GM_getValue('schiffwerft__');
  /*###*/general["verteidigung__"] = GM_getValue('verteidigung__');
  /*###*/general["links__"] = GM_getValue('links__');
  
  var showvariable_ = new Object();
  var showvariabletable = GM_getValue('showvariable_table');
  showvariable_["combox"] = GM_getValue('showvariable_combox');
  showvariable_["leftmenu"] = GM_getValue('showvariabl_leftmenu');
  
  var settingsent = general["index"]+"page=overview&session="+general["session"];
  
  //______Gebaeude______
  var metall = new Object();
  var kristall = new Object();
  var deuterium = new Object();
  var solar = new Object();
  var fusion = new Object();
  var roboter = new Object();
  var naniten = new Object();
  var raumschiff = new Object();
  var metalls = new Object();
  var kristalls = new Object();
  var deuteriumt = new Object();
  var forschungsl = new Object();
  var terraformer = new Object();
  var allianzdepot = new Object();
  var raketensilo = new Object();
  var spionage  = new Object();
  var computer = new Object();
  var waffen = new Object();
  var schild = new Object();
  var raumschiffpanzerung = new Object();
  var energie = new Object();
  var hyperraum = new Object();
  var verbrennungstriebwerk = new Object();
  var impulstriebwerk = new Object();
  var hyperraumantrieb = new Object();
  var laser = new Object();
  var ionen = new Object();
  var plasma = new Object();
  var expedition = new Object();
  var netzwerk = new Object();
  var graviton = new Object();
  
  //---------OGAME.DE-----------------COMPLETE
  metall["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'>Metallmine</a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  kristall["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=2'>Kristallmine</a><a href='"+general["pl1"]+"2'>+</a><a href='"+general["de1"]+"2'>X</a>";
  deuterium["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=3'>Deuteriumsynthenisierer</a><a href='"+general["pl1"]+"3'>+</a><a href='"+general["de1"]+"3'>X</a>";
  solar["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=4'>Solarkraftwerk</a><a href='"+general["pl1"]+"4'>+</a><a href='"+general["de1"]+"4'>X</a>";
  fusion["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=12'>Fusionskraftwerk</a><a href='"+general["pl1"]+"12'>+</a><a href='"+general["de1"]+"5'>X</a>";
  roboter["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=14'>Roboterfabrik</a><a href='"+general["pl1"]+"14'>+</a><a href='"+general["de1"]+"14'>X</a>";
  naniten["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=15'>Nanitenfabrik</a><a href='"+general["pl1"]+"15'>+</a><a href='"+general["de1"]+"15'>X</a>";
  raumschiff["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=21'>Raumschiffwerft</a><a href='"+general["pl1"]+"21'>+</a><a href='"+general["de1"]+"21'>X</a>";
  metalls["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=22'>Metallspeicher</a><a href='"+general["pl1"]+"22'>+</a><a href='"+general["de1"]+"22'>X</a>";
  kristalls["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=23'>Kristallspeicher</a><a href='"+general["pl1"]+"23'>+</a><a href='"+general["de1"]+"23'>X</a>";
  deuteriumt["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=24'>Deuteriumtank</a><a href='"+general["pl1"]+"24'>+</a><a href='"+general["de1"]+"24'>X</a>";
  forschungsl["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=31'>Forschungslabor</a><a href='"+general["pl1"]+"31'>+</a><a href='"+general["de1"]+"31'>X</a>";
  terraformer["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=33'>Terraformer</a><a href='"+general["pl1"]+"33'>+</a><a href='"+general["de1"]+"33'>X</a>";
  allianzdepot["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=34'>Allianzdepot</a><a href='"+general["pl1"]+"34'>+</a><a href='"+general["de1"]+"34'>X</a>";
  raketensilo["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=44'>Raketensilo</a><a href='"+general["pl1"]+"44'>+</a><a href='"+general["de1"]+"44'>X</a>";
  spionage["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=106'>Spionagetechnik</a><a href='"+general["pl2"]+"106'>+</a><a href='"+general["de2"]+"106'>X</a>";
  computer["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=108'>Computertechnik</a><a href='"+general["pl2"]+"108'>+</a><a href='"+general["de2"]+"108'>X</a>";
  waffen["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=109'>Waffentechnik</a><a href='"+general["pl2"]+"109'>+</a><a href='"+general["de2"]+"109'>X</a>";
  schild["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=110'>Schildtechnik</a><a href='"+general["pl2"]+"110'>+</a><a href='"+general["de2"]+"110'>X</a>";
  raumschiffpanzerung["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=111'>Raumschiffpanzerung</a><a href='"+general["pl2"]+"111'>+</a><a href='"+general["de2"]+"111'>X</a>";
  energie["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=113'>Energietechnik</a><a href='"+general["pl2"]+"113'>+</a><a href='"+general["de2"]+"113'>X</a>";
  hyperraum["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=114'>Hyperraumtechnik</a><a href='"+general["pl2"]+"114'>+</a><a href='"+general["de2"]+"114'>X</a>";
  verbrennungstriebwerk["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=115'>Verbrennungstriebwerk</a><a href='"+general["pl2"]+"115'>+</a><a href='"+general["de2"]+"115'>X</a>";
  impulstriebwerk["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=17'>Impulstriebwerk</a><a href='"+general["pl2"]+"117'>+</a><a href='"+general["de2"]+"117'>X</a>";
  hyperraumantrieb["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=118'>Hyperraumantrieb</a><a href='"+general["pl2"]+"118'>+</a><a href='"+general["de2"]+"118'>X</a>";
  laser["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=120'>Lasertechnik</a><a href='"+general["pl2"]+"120'>+</a><a href='"+general["de2"]+"120'>X</a>";
  ionen["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=121'>Ionentechnik</a><a href='"+general["pl2"]+"121'>+</a><a href='"+general["de2"]+"121'>X</a>";
  plasma["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=122'>Plasmatechnik</a><a href='"+general["pl2"]+"122'>+</a><a href='"+general["de2"]+"122'>X</a>";
  expedition["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=123'>Intergalaktisches Forschungsnetzwerk</a><a href='"+general["pl2"]+"123'>+</a><a href='"+general["de2"]+"123'>X</a>";
  netzwerk["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=124'>Expeditionstechnik</a><a href='"+general["pl2"]+"124'>+</a><a href='"+general["de2"]+"124'>X</a>";
  graviton["de"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=199'>Gravitontechnik</a><a href='"+general["pl2"]+"199'>+</a><a href='"+general["de2"]+"199'>X</a>";
  
  
  
  //---------OGAME.CZ----------------COMPLETE
  metall["cz"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'>Dul na Kov</a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  kristall["cz"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=2'>Dul na Krystaly</a><a href='"+general["pl1"]+"2'>+</a><a href='"+general["de1"]+"2'>X</a>";
  deuterium["cz"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=3'>Syntetizér deuteria</a><a href='"+general["pl1"]+"3'>+</a><a href='"+general["de1"]+"3'>X</a>";
  solar["cz"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=4'>Solární elektrárna</a><a href='"+general["pl1"]+"4'>+</a><a href='"+general["de1"]+"4'>X</a>";
  fusion["cz"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=12'>Fuzní reaktor</a><a href='"+general["pl1"]+"12'>+</a><a href='"+general["de1"]+"5'>X</a>";
  roboter["cz"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=14'>Továrna na roboty</a><a href='"+general["pl1"]+"14'>+</a><a href='"+general["de1"]+"14'>X</a>";
  naniten["cz"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=15'>Továrna s nanoboty</a><a href='"+general["pl1"]+"15'>+</a><a href='"+general["de1"]+"15'>X</a>";
  raumschiff["cz"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=21'>Hangár</a><a href='"+general["pl1"]+"21'>+</a><a href='"+general["de1"]+"21'>X</a>";
  metalls["cz"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=22'>Sklad kovu</a><a href='"+general["pl1"]+"22'>+</a><a href='"+general["de1"]+"22'>X</a>";
  kristalls["cz"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=23'>Sklad krystalu</a><a href='"+general["pl1"]+"23'>+</a><a href='"+general["de1"]+"23'>X</a>";
  deuteriumt["cz"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=24'>Nádrž na deuterium</a><a href='"+general["pl1"]+"24'>+</a><a href='"+general["de1"]+"24'>X</a>";
  forschungsl["cz"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=31'>Výzkumná laborator</a><a href='"+general["pl1"]+"31'>+</a><a href='"+general["de1"]+"31'>X</a>";
  terraformer["cz"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=33'>Terraformer</a><a href='"+general["pl1"]+"33'>+</a><a href='"+general["de1"]+"33'>X</a>";
  allianzdepot["cz"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=34'>Aliancní sklad</a><a href='"+general["pl1"]+"34'>+</a><a href='"+general["de1"]+"34'>X</a>";
  raketensilo["cz"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=44'>Raketové Silo</a><a href='"+general["pl1"]+"44'>+</a><a href='"+general["de1"]+"44'>X</a>";
  spionage["cz"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'></a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  
  
  //---------OGAME.DK------------------------------COMPLETE
  metall["dk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'>Metalmine</a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  kristall["dk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=2'>Krystalmine</a><a href='"+general["pl1"]+"2'>+</a><a href='"+general["de1"]+"2'>X</a>";
  deuterium["dk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=3'>Deuteriumsyntetiserer</a><a href='"+general["pl1"]+"3'>+</a><a href='"+general["de1"]+"3'>X</a>";
  solar["dk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=4'>Solkraftværk</a><a href='"+general["pl1"]+"4'>+</a><a href='"+general["de1"]+"4'>X</a>";
  fusion["dk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=12'>Fusionskraftværk</a><a href='"+general["pl1"]+"12'>+</a><a href='"+general["de1"]+"5'>X</a>";
  roboter["dk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=14'>Robotfabrik</a><a href='"+general["pl1"]+"14'>+</a><a href='"+general["de1"]+"14'>X</a>";
  naniten["dk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=15'>Nanitfabrik</a><a href='"+general["pl1"]+"15'>+</a><a href='"+general["de1"]+"15'>X</a>";
  raumschiff["dk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=21'>Rumskibsværft</a><a href='"+general["pl1"]+"21'>+</a><a href='"+general["de1"]+"21'>X</a>";
  metalls["dk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=22'>Metallager</a><a href='"+general["pl1"]+"22'>+</a><a href='"+general["de1"]+"22'>X</a>";
  kristalls["dk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=23'>Krystallager</a><a href='"+general["pl1"]+"23'>+</a><a href='"+general["de1"]+"23'>X</a>";
  deuteriumt["dk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=24'>Deuteriumlager</a><a href='"+general["pl1"]+"24'>+</a><a href='"+general["de1"]+"24'>X</a>";
  forschungsl["dk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=31'>Forskningslaboratorium</a><a href='"+general["pl1"]+"31'>+</a><a href='"+general["de1"]+"31'>X</a>";
  terraformer["dk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=33'>Terraformer</a><a href='"+general["pl1"]+"33'>+</a><a href='"+general["de1"]+"33'>X</a>";
  allianzdepot["dk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=34'>-</a><a href='"+general["pl1"]+"34'>+</a><a href='"+general["de1"]+"34'>X</a>";
  raketensilo["dk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=44'>Raketsilo</a><a href='"+general["pl1"]+"44'>+</a><a href='"+general["de1"]+"44'>X</a>";
  spionage["dk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'></a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  
  
  //---------OGAME.ORG----------------------COMPLETE
  metall["org"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'>Metal Mine</a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  kristall["org"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=2'>Crystal Mine</a><a href='"+general["pl1"]+"2'>+</a><a href='"+general["de1"]+"2'>X</a>";
  deuterium["org"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=3'>Deuterium Synthesizer</a><a href='"+general["pl1"]+"3'>+</a><a href='"+general["de1"]+"3'>X</a>";
  solar["org"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=4'>Solar Plant</a><a href='"+general["pl1"]+"4'>+</a><a href='"+general["de1"]+"4'>X</a>";
  fusion["org"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=12'>Fusion Reactor</a><a href='"+general["pl1"]+"12'>+</a><a href='"+general["de1"]+"5'>X</a>";
  roboter["org"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=14'>Robotics Factory</a><a href='"+general["pl1"]+"14'>+</a><a href='"+general["de1"]+"14'>X</a>";
  naniten["org"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=15'>Nanite Factory</a><a href='"+general["pl1"]+"15'>+</a><a href='"+general["de1"]+"15'>X</a>";
  raumschiff["org"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=21'>Shipyard</a><a href='"+general["pl1"]+"21'>+</a><a href='"+general["de1"]+"21'>X</a>";
  metalls["org"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=22'>Metal Storage</a><a href='"+general["pl1"]+"22'>+</a><a href='"+general["de1"]+"22'>X</a>";
  kristalls["org"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=23'>Crystal Storage</a><a href='"+general["pl1"]+"23'>+</a><a href='"+general["de1"]+"23'>X</a>";
  deuteriumt["org"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=24'>Deuterium Tank</a><a href='"+general["pl1"]+"24'>+</a><a href='"+general["de1"]+"24'>X</a>";
  forschungsl["org"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=31'>Research Lab</a><a href='"+general["pl1"]+"31'>+</a><a href='"+general["de1"]+"31'>X</a>";
  terraformer["org"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=33'>Terraformer</a><a href='"+general["pl1"]+"33'>+</a><a href='"+general["de1"]+"33'>X</a>";
  allianzdepot["org"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=34'>Alliance Depot</a><a href='"+general["pl1"]+"34'>+</a><a href='"+general["de1"]+"34'>X</a>";
  raketensilo["org"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=44'>Missile Silo</a><a href='"+general["pl1"]+"44'>+</a><a href='"+general["de1"]+"44'>X</a>";
  
  
  //---------OGAME.FI-----------------FAILURE
  metall["fi"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'></a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  kristall["fi"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=2'></a><a href='"+general["pl1"]+"2'>+</a><a href='"+general["de1"]+"2'>X</a>";
  deuterium["fi"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=3'></a><a href='"+general["pl1"]+"3'>+</a><a href='"+general["de1"]+"3'>X</a>";
  solar["fi"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=4'></a><a href='"+general["pl1"]+"4'>+</a><a href='"+general["de1"]+"4'>X</a>";
  fusion["fi"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=12'></a><a href='"+general["pl1"]+"12'>+</a><a href='"+general["de1"]+"5'>X</a>";
  roboter["fi"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=14'></a><a href='"+general["pl1"]+"14'>+</a><a href='"+general["de1"]+"14'>X</a>";
  naniten["fi"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=15'></a><a href='"+general["pl1"]+"15'>+</a><a href='"+general["de1"]+"15'>X</a>";
  raumschiff["fi"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=21'></a><a href='"+general["pl1"]+"21'>+</a><a href='"+general["de1"]+"21'>X</a>";
  metalls["fi"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=22'></a><a href='"+general["pl1"]+"22'>+</a><a href='"+general["de1"]+"22'>X</a>";
  kristalls["fi"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=23'></a><a href='"+general["pl1"]+"23'>+</a><a href='"+general["de1"]+"23'>X</a>";
  deuteriumt["fi"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=24'></a><a href='"+general["pl1"]+"24'>+</a><a href='"+general["de1"]+"24'>X</a>";
  forschungsl["fi"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=31'></a><a href='"+general["pl1"]+"31'>+</a><a href='"+general["de1"]+"31'>X</a>";
  terraformer["fi"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=33'></a><a href='"+general["pl1"]+"33'>+</a><a href='"+general["de1"]+"33'>X</a>";
  allianzdepot["fi"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=34'>-</a><a href='"+general["pl1"]+"34'>+</a><a href='"+general["de1"]+"34'>X</a>";
  raketensilo["fi"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=44'></a><a href='"+general["pl1"]+"44'>+</a><a href='"+general["de1"]+"44'>X</a>";
  
  
  //---------OGAME.FR-----------------------------COMPLETE
  metall["fr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'>Mine de métal</a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  kristall["fr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=2'>Mine de cristal</a><a href='"+general["pl1"]+"2'>+</a><a href='"+general["de1"]+"2'>X</a>";
  deuterium["fr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=3'>Synthétiseur de deutérium</a><a href='"+general["pl1"]+"3'>+</a><a href='"+general["de1"]+"3'>X</a>";
  solar["fr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=4'>Centrale électrique solaire</a><a href='"+general["pl1"]+"4'>+</a><a href='"+general["de1"]+"4'>X</a>";
  fusion["fr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=12'>Centrale électrique de fusion</a><a href='"+general["pl1"]+"12'>+</a><a href='"+general["de1"]+"5'>X</a>";
  roboter["fr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=14'>Usine de robots</a><a href='"+general["pl1"]+"14'>+</a><a href='"+general["de1"]+"14'>X</a>";
  naniten["fr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=15'>Usine de nanites</a><a href='"+general["pl1"]+"15'>+</a><a href='"+general["de1"]+"15'>X</a>";
  raumschiff["fr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=21'>Chantier spatial</a><a href='"+general["pl1"]+"21'>+</a><a href='"+general["de1"]+"21'>X</a>";
  metalls["fr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=22'>Hangar de métal</a><a href='"+general["pl1"]+"22'>+</a><a href='"+general["de1"]+"22'>X</a>";
  kristalls["fr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=23'>Hangar de cristal</a><a href='"+general["pl1"]+"23'>+</a><a href='"+general["de1"]+"23'>X</a>";
  deuteriumt["fr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=24'>Réservoir de deutérium</a><a href='"+general["pl1"]+"24'>+</a><a href='"+general["de1"]+"24'>X</a>";
  forschungsl["fr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=31'>Laboratoire de recherche</a><a href='"+general["pl1"]+"31'>+</a><a href='"+general["de1"]+"31'>X</a>";
  terraformer["fr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=33'>Terraformeur</a><a href='"+general["pl1"]+"33'>+</a><a href='"+general["de1"]+"33'>X</a>";
  allianzdepot["fr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=34'>-</a><a href='"+general["pl1"]+"34'>+</a><a href='"+general["de1"]+"34'>X</a>";
  raketensilo["fr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=44'>Silo de missiles</a><a href='"+general["pl1"]+"44'>+</a><a href='"+general["de1"]+"44'>X</a>";
  
  
  //---------OGAME.GR  --------------------------------COMPLETE WITH FAILURES
  metall["gr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'>????e?? ?et?????</a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  kristall["gr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=2'>????e?? ???st?????</a><a href='"+general["pl1"]+"2'>+</a><a href='"+general["de1"]+"2'>X</a>";
  deuterium["gr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=3'>S????t?? ?e?t?????</a><a href='"+general["pl1"]+"3'>+</a><a href='"+general["de1"]+"3'>X</a>";
  solar["gr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=4'>????st?s?? ???a??? ?????e?a?</a><a href='"+general["pl1"]+"4'>+</a><a href='"+general["de1"]+"4'>X</a>";
  fusion["gr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=12'>??t?d?ast??a? S??t????</a><a href='"+general["pl1"]+"12'>+</a><a href='"+general["de1"]+"5'>X</a>";
  roboter["gr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=14'>????st?s?? ??µp?t????</a><a href='"+general["pl1"]+"14'>+</a><a href='"+general["de1"]+"14'>X</a>";
  naniten["gr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=15'>????st?s?? ?a??t??</a><a href='"+general["pl1"]+"15'>+</a><a href='"+general["de1"]+"15'>X</a>";
  raumschiff["gr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=21'>?a?p??e??</a><a href='"+general["pl1"]+"21'>+</a><a href='"+general["de1"]+"21'>X</a>";
  metalls["gr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=22'>?p????? ?et?????</a><a href='"+general["pl1"]+"22'>+</a><a href='"+general["de1"]+"22'>X</a>";
  kristalls["gr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=23'>?p????? ???st?????</a><a href='"+general["pl1"]+"23'>+</a><a href='"+general["de1"]+"23'>X</a>";
  deuteriumt["gr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=24'>?e?aµe?? ?e?t?????</a><a href='"+general["pl1"]+"24'>+</a><a href='"+general["de1"]+"24'>X</a>";
  forschungsl["gr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=31'>???ast???? ??e????</a><a href='"+general["pl1"]+"31'>+</a><a href='"+general["de1"]+"31'>X</a>";
  terraformer["gr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=33'>Terraformer</a><a href='"+general["pl1"]+"33'>+</a><a href='"+general["de1"]+"33'>X</a>";
  allianzdepot["gr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=34'>Sta?µ?? S?µµa??a?</a><a href='"+general["pl1"]+"34'>+</a><a href='"+general["de1"]+"34'>X</a>";
  raketensilo["gr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=44'>S??? ???a????</a><a href='"+general["pl1"]+"44'>+</a><a href='"+general["de1"]+"44'>X</a>";
  
  
  //---------OGAME.HU---------------------------COMPLETE
  metall["hu"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'>Fém bánya</a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  kristall["hu"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=2'>Kristály bánya</a><a href='"+general["pl1"]+"2'>+</a><a href='"+general["de1"]+"2'>X</a>";
  deuterium["hu"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=3'>Deutérium Szuroállomás</a><a href='"+general["pl1"]+"3'>+</a><a href='"+general["de1"]+"3'>X</a>";
  solar["hu"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=4'>Nap eromu</a><a href='"+general["pl1"]+"4'>+</a><a href='"+general["de1"]+"4'>X</a>";
  fusion["hu"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=12'>Fúziós eromu</a><a href='"+general["pl1"]+"12'>+</a><a href='"+general["de1"]+"5'>X</a>";
  roboter["hu"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=14'>Robot Gyár</a><a href='"+general["pl1"]+"14'>+</a><a href='"+general["de1"]+"14'>X</a>";
  naniten["hu"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=15'>Nanite Gyár</a><a href='"+general["pl1"]+"15'>+</a><a href='"+general["de1"]+"15'>X</a>";
  raumschiff["hu"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=21'>Hajógyár</a><a href='"+general["pl1"]+"21'>+</a><a href='"+general["de1"]+"21'>X</a>";
  metalls["hu"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=22'>Fém raktár</a><a href='"+general["pl1"]+"22'>+</a><a href='"+general["de1"]+"22'>X</a>";
  kristalls["hu"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=23'>Kristály Raktár</a><a href='"+general["pl1"]+"23'>+</a><a href='"+general["de1"]+"23'>X</a>";
  deuteriumt["hu"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=24'>Deutérium Tartály</a><a href='"+general["pl1"]+"24'>+</a><a href='"+general["de1"]+"24'>X</a>";
  forschungsl["hu"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=31'>Kutató laboratórium</a><a href='"+general["pl1"]+"31'>+</a><a href='"+general["de1"]+"31'>X</a>";
  terraformer["hu"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=33'>Terraformer</a><a href='"+general["pl1"]+"33'>+</a><a href='"+general["de1"]+"33'>X</a>";
  allianzdepot["hu"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=34'>Szövetségi Állomás</a><a href='"+general["pl1"]+"34'>+</a><a href='"+general["de1"]+"34'>X</a>";
  raketensilo["hu"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=44'>Rakéta Siló</a><a href='"+general["pl1"]+"44'>+</a><a href='"+general["de1"]+"44'>X</a>";
  
  
  //---------OGAME.IT--------------------------------COMPLETE
  metall["it"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'>Miniera di metallo</a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  kristall["it"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=2'>Miniera di cristalli</a><a href='"+general["pl1"]+"2'>+</a><a href='"+general["de1"]+"2'>X</a>";
  deuterium["it"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=3'>Sintetizzatore di deuterio</a><a href='"+general["pl1"]+"3'>+</a><a href='"+general["de1"]+"3'>X</a>";
  solar["it"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=4'>Centrale solare</a><a href='"+general["pl1"]+"4'>+</a><a href='"+general["de1"]+"4'>X</a>";
  fusion["it"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=12'>Centrale a fusione</a><a href='"+general["pl1"]+"12'>+</a><a href='"+general["de1"]+"5'>X</a>";
  roboter["it"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=14'>Fabbrica dei robot</a><a href='"+general["pl1"]+"14'>+</a><a href='"+general["de1"]+"14'>X</a>";
  naniten["it"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=15'>Fabbrica dei naniti</a><a href='"+general["pl1"]+"15'>+</a><a href='"+general["de1"]+"15'>X</a>";
  raumschiff["it"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=21'>Cantiere spaziale</a><a href='"+general["pl1"]+"21'>+</a><a href='"+general["de1"]+"21'>X</a>";
  metalls["it"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=22'>Deposito di metallo</a><a href='"+general["pl1"]+"22'>+</a><a href='"+general["de1"]+"22'>X</a>";
  kristalls["it"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=23'>Deposito di cristalli</a><a href='"+general["pl1"]+"23'>+</a><a href='"+general["de1"]+"23'>X</a>";
  deuteriumt["it"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=24'>Cisterna di deuterio</a><a href='"+general["pl1"]+"24'>+</a><a href='"+general["de1"]+"24'>X</a>";
  forschungsl["it"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=31'>Laboratorio di ricerca</a><a href='"+general["pl1"]+"31'>+</a><a href='"+general["de1"]+"31'>X</a>";
  terraformer["it"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=33'>Terraformer</a><a href='"+general["pl1"]+"33'>+</a><a href='"+general["de1"]+"33'>X</a>";
  allianzdepot["it"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=34'>-</a><a href='"+general["pl1"]+"34'>+</a><a href='"+general["de1"]+"34'>X</a>";
  raketensilo["it"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=44'>Error[]</a><a href='"+general["pl1"]+"44'>+</a><a href='"+general["de1"]+"44'>X</a>";
  
  
  //---------OGAME.JP-----------------------------------COMPLETE WITH FAILURES
  metall["jp"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'>&#12513;&#12479;&#12523;&#25505;&#25496;&#25152;</a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  kristall["jp"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=2'>&#12463;&#12522;&#12473;&#12479;&#12523;&#25505;&#25496;&#25152;</a><a href='"+general["pl1"]+"2'>+</a><a href='"+general["de1"]+"2'>X</a>";
  deuterium["jp"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=3'>&#12487;&#12517;&#12540;&#12486;&#12522;&#12454;&#12512; &#12471;&#12531;&#12475;&#12469;&#12452;&#12470;&#12540;</a><a href='"+general["pl1"]+"3'>+</a><a href='"+general["de1"]+"3'>X</a>";
  solar["jp"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=4'>&#12477;&#12540;&#12521;&#12540; &#12503;&#12521;&#12531;&#12488;</a><a href='"+general["pl1"]+"4'>+</a><a href='"+general["de1"]+"4'>X</a>";
  fusion["jp"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=12'>&#12525;&#12508;&#12486;&#12451;&#12463;&#12473; &#24037;&#22580;</a><a href='"+general["pl1"]+"12'>+</a><a href='"+general["de1"]+"5'>X</a>";
  roboter["jp"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=14'>&#12501;&#12517;&#12540;&#12472;&#12519;&#12531; &#21453;&#24540;&#28809;</a><a href='"+general["pl1"]+"14'>+</a><a href='"+general["de1"]+"14'>X</a>";
  naniten["jp"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=15'>&#12525;&#12508;&#12486;&#12451;&#12463;&#12473; &#24037;&#22580;</a><a href='"+general["pl1"]+"15'>+</a><a href='"+general["de1"]+"15'>X</a>";
  raumschiff["jp"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=21'>&#12490;&#12494;&#12510;&#12471;&#12531;&#24037;&#22580;</a><a href='"+general["pl1"]+"21'>+</a><a href='"+general["de1"]+"21'>X</a>";
  metalls["jp"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=22'>&#36896;&#33337;&#25152;</a><a href='"+general["pl1"]+"22'>+</a><a href='"+general["de1"]+"22'>X</a>";
  kristalls["jp"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=23'>&#12513;&#12479;&#12523;&#36015;&#34101;&#24235;</a><a href='"+general["pl1"]+"23'>+</a><a href='"+general["de1"]+"23'>X</a>";
  deuteriumt["jp"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=24'>&#12463;&#12522;&#12473;&#12479;&#12523;&#36015;&#34101;&#24235;</a><a href='"+general["pl1"]+"24'>+</a><a href='"+general["de1"]+"24'>X</a>";
  forschungsl["jp"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=31'>&#12487;&#12517;&#12540;&#12486;&#12522;&#12454;&#12512; &#12479;&#12531;&#12463;</a><a href='"+general["pl1"]+"31'>+</a><a href='"+general["de1"]+"31'>X</a>";
  terraformer["jp"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=33'>&#12486;&#12521;&#12501;&#12457;&#12540;&#12510;&#12540;</a><a href='"+general["pl1"]+"33'>+</a><a href='"+general["de1"]+"33'>X</a>";
  allianzdepot["jp"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=34'>-</a><a href='"+general["pl1"]+"34'>+</a><a href='"+general["de1"]+"34'>X</a>";
  raketensilo["jp"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=44'>&#12511;&#12469;&#12452;&#12523;&#22612;</a><a href='"+general["pl1"]+"44'>+</a><a href='"+general["de1"]+"44'>X</a>";
  
  
  //---------OGAME.LT-----------------------------------------COMPLETE
  metall["lt"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'>Metalo Kasykla</a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  kristall["lt"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=2'>Kristalu Kasykla</a><a href='"+general["pl1"]+"2'>+</a><a href='"+general["de1"]+"2'>X</a>";
  deuterium["lt"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=3'>Deuterio Sintetintuvas</a><a href='"+general["pl1"]+"3'>+</a><a href='"+general["de1"]+"3'>X</a>";
  solar["lt"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=4'>Saules Jegaine</a><a href='"+general["pl1"]+"4'>+</a><a href='"+general["de1"]+"4'>X</a>";
  fusion["lt"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=12'>Jungimosi Reaktorius</a><a href='"+general["pl1"]+"12'>+</a><a href='"+general["de1"]+"5'>X</a>";
  roboter["lt"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=14'>Robotu Gamykla</a><a href='"+general["pl1"]+"14'>+</a><a href='"+general["de1"]+"14'>X</a>";
  naniten["lt"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=15'>Nanitu Gamykla</a><a href='"+general["pl1"]+"15'>+</a><a href='"+general["de1"]+"15'>X</a>";
  raumschiff["lt"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=21'>Laivu Statykla</a><a href='"+general["pl1"]+"21'>+</a><a href='"+general["de1"]+"21'>X</a>";
  metalls["lt"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=22'>Metalo Saugykla</a><a href='"+general["pl1"]+"22'>+</a><a href='"+general["de1"]+"22'>X</a>";
  kristalls["lt"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=23'>Kristalu Saugykla</a><a href='"+general["pl1"]+"23'>+</a><a href='"+general["de1"]+"23'>X</a>";
  deuteriumt["lt"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=24'>Deuterio Saugykla</a><a href='"+general["pl1"]+"24'>+</a><a href='"+general["de1"]+"24'>X</a>";
  forschungsl["lt"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=31'>Išradimu Laboratorija</a><a href='"+general["pl1"]+"31'>+</a><a href='"+general["de1"]+"31'>X</a>";
  terraformer["lt"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=33'>Teraformeris</a><a href='"+general["pl1"]+"33'>+</a><a href='"+general["de1"]+"33'>X</a>";
  allianzdepot["lt"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=34'>Sajungos Saugykla</a><a href='"+general["pl1"]+"34'>+</a><a href='"+general["de1"]+"34'>X</a>";
  raketensilo["lt"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=44'>Raketu Šachta</a><a href='"+general["pl1"]+"44'>+</a><a href='"+general["de1"]+"44'>X</a>";
  
  
  //---------OGAME.LV--------------------------COMPLETE
  metall["lv"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'>Metala raktuve</a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  kristall["lv"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=2'>Kristala raktuve</a><a href='"+general["pl1"]+"2'>+</a><a href='"+general["de1"]+"2'>X</a>";
  deuterium["lv"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=3'>Deiterija sintezators</a><a href='"+general["pl1"]+"3'>+</a><a href='"+general["de1"]+"3'>X</a>";
  solar["lv"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=4'>Solara stacija</a><a href='"+general["pl1"]+"4'>+</a><a href='"+general["de1"]+"4'>X</a>";
  fusion["lv"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=12'>Atomelektrostacija</a><a href='"+general["pl1"]+"12'>+</a><a href='"+general["de1"]+"5'>X</a>";
  roboter["lv"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=14'>Robottehnikas Rupnica</a><a href='"+general["pl1"]+"14'>+</a><a href='"+general["de1"]+"14'>X</a>";
  naniten["lv"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=15'>Nanita rupnica</a><a href='"+general["pl1"]+"15'>+</a><a href='"+general["de1"]+"15'>X</a>";
  raumschiff["lv"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=21'>Kugu buvetava</a><a href='"+general["pl1"]+"21'>+</a><a href='"+general["de1"]+"21'>X</a>";
  metalls["lv"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=22'>Metala glabatuve</a><a href='"+general["pl1"]+"22'>+</a><a href='"+general["de1"]+"22'>X</a>";
  kristalls["lv"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=23'>Kristala glabatuve</a><a href='"+general["pl1"]+"23'>+</a><a href='"+general["de1"]+"23'>X</a>";
  deuteriumt["lv"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=24'>Deiterija tanks</a><a href='"+general["pl1"]+"24'>+</a><a href='"+general["de1"]+"24'>X</a>";
  forschungsl["lv"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=31'>Petniecibas laboratorija</a><a href='"+general["pl1"]+"31'>+</a><a href='"+general["de1"]+"31'>X</a>";
  terraformer["lv"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=33'>Zemes parveidotajs</a><a href='"+general["pl1"]+"33'>+</a><a href='"+general["de1"]+"33'>X</a>";
  allianzdepot["lv"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=34'>Alianses Noliktava</a><a href='"+general["pl1"]+"34'>+</a><a href='"+general["de1"]+"34'>X</a>";
  raketensilo["lv"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=44'>Rakešu novietnes</a><a href='"+general["pl1"]+"44'>+</a><a href='"+general["de1"]+"44'>X</a>";
  
  
  //---------OGAME.NL------------------COMPLETE
  metall["nl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'>Metaalmijn</a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  kristall["nl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=2'>Kristalmijn</a><a href='"+general["pl1"]+"2'>+</a><a href='"+general["de1"]+"2'>X</a>";
  deuterium["nl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=3'>Deuteriumfabriek</a><a href='"+general["pl1"]+"3'>+</a><a href='"+general["de1"]+"3'>X</a>";
  solar["nl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=4'>Zonne-energiecentrale</a><a href='"+general["pl1"]+"4'>+</a><a href='"+general["de1"]+"4'>X</a>";
  fusion["nl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=12'>Fusiecentrale</a><a href='"+general["pl1"]+"12'>+</a><a href='"+general["de1"]+"5'>X</a>";
  roboter["nl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=14'>Robotfabriek</a><a href='"+general["pl1"]+"14'>+</a><a href='"+general["de1"]+"14'>X</a>";
  naniten["nl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=15'>Nanorobotfabriek</a><a href='"+general["pl1"]+"15'>+</a><a href='"+general["de1"]+"15'>X</a>";
  raumschiff["nl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=21'>Werf</a><a href='"+general["pl1"]+"21'>+</a><a href='"+general["de1"]+"21'>X</a>";
  metalls["nl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=22'>Metaalopslag</a><a href='"+general["pl1"]+"22'>+</a><a href='"+general["de1"]+"22'>X</a>";
  kristalls["nl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=23'>Kristalopslag</a><a href='"+general["pl1"]+"23'>+</a><a href='"+general["de1"]+"23'>X</a>";
  deuteriumt["nl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=24'>Deuteriumtank</a><a href='"+general["pl1"]+"24'>+</a><a href='"+general["de1"]+"24'>X</a>";
  forschungsl["nl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=31'>Onderzoekslab</a><a href='"+general["pl1"]+"31'>+</a><a href='"+general["de1"]+"31'>X</a>";
  terraformer["nl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=33'>Terravormer</a><a href='"+general["pl1"]+"33'>+</a><a href='"+general["de1"]+"33'>X</a>";
  allianzdepot["nl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=34'>-</a><a href='"+general["pl1"]+"34'>+</a><a href='"+general["de1"]+"34'>X</a>";
  raketensilo["nl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=44'>Raketsilo</a><a href='"+general["pl1"]+"44'>+</a><a href='"+general["de1"]+"44'>X</a>";
  
  
  //---------OGAME.NO-----------------COMPLETE
  metall["no"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'>Metallgruve</a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  kristall["no"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=2'>Krystallgruve</a><a href='"+general["pl1"]+"2'>+</a><a href='"+general["de1"]+"2'>X</a>";
  deuterium["no"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=3'>Deuteriumsfremstiller</a><a href='"+general["pl1"]+"3'>+</a><a href='"+general["de1"]+"3'>X</a>";
  solar["no"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=4'>Solpanel</a><a href='"+general["pl1"]+"4'>+</a><a href='"+general["de1"]+"4'>X</a>";
  fusion["no"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=12'>Fusjons Reaktor</a><a href='"+general["pl1"]+"12'>+</a><a href='"+general["de1"]+"5'>X</a>";
  roboter["no"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=14'>Robot Fabrikk</a><a href='"+general["pl1"]+"14'>+</a><a href='"+general["de1"]+"14'>X</a>";
  naniten["no"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=15'>Nanitt Fabrikk</a><a href='"+general["pl1"]+"15'>+</a><a href='"+general["de1"]+"15'>X</a>";
  raumschiff["no"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=21'>Skipsverft</a><a href='"+general["pl1"]+"21'>+</a><a href='"+general["de1"]+"21'>X</a>";
  metalls["no"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=22'>Metall Lagring</a><a href='"+general["pl1"]+"22'>+</a><a href='"+general["de1"]+"22'>X</a>";
  kristalls["no"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=23'>Krystall Lagring</a><a href='"+general["pl1"]+"23'>+</a><a href='"+general["de1"]+"23'>X</a>";
  deuteriumt["no"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=24'>Deuterium Tank</a><a href='"+general["pl1"]+"24'>+</a><a href='"+general["de1"]+"24'>X</a>";
  forschungsl["no"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=31'>Forsknings Lab</a><a href='"+general["pl1"]+"31'>+</a><a href='"+general["de1"]+"31'>X</a>";
  terraformer["no"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=33'>Terraformer</a><a href='"+general["pl1"]+"33'>+</a><a href='"+general["de1"]+"33'>X</a>";
  allianzdepot["no"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=34'>Allianse havn</a><a href='"+general["pl1"]+"34'>+</a><a href='"+general["de1"]+"34'>X</a>";
  raketensilo["no"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=44'>Missil Silo</a><a href='"+general["pl1"]+"44'>+</a><a href='"+general["de1"]+"44'>X</a>";
  
  
  //---------OGAME.PL--------------COMPLETE
  metall["pl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'>Kopalnia metalu</a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  kristall["pl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=2'>Kopalnia krysztalu</a><a href='"+general["pl1"]+"2'>+</a><a href='"+general["de1"]+"2'>X</a>";
  deuterium["pl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=3'>Ekstraktor deuteru</a><a href='"+general["pl1"]+"3'>+</a><a href='"+general["de1"]+"3'>X</a>";
  solar["pl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=4'>Elektrownia sloneczna</a><a href='"+general["pl1"]+"4'>+</a><a href='"+general["de1"]+"4'>X</a>";
  fusion["pl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=12'>Elektrownia fuzyjna</a><a href='"+general["pl1"]+"12'>+</a><a href='"+general["de1"]+"5'>X</a>";
  roboter["pl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=14'>Fabryka robotów</a><a href='"+general["pl1"]+"14'>+</a><a href='"+general["de1"]+"14'>X</a>";
  naniten["pl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=15'>Fabryka nanitów</a><a href='"+general["pl1"]+"15'>+</a><a href='"+general["de1"]+"15'>X</a>";
  raumschiff["pl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=21'>Stocznia</a><a href='"+general["pl1"]+"21'>+</a><a href='"+general["de1"]+"21'>X</a>";
  metalls["pl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=22'>Magazyn metalu</a><a href='"+general["pl1"]+"22'>+</a><a href='"+general["de1"]+"22'>X</a>";
  kristalls["pl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=23'>Magazyn krysztalu</a><a href='"+general["pl1"]+"23'>+</a><a href='"+general["de1"]+"23'>X</a>";
  deuteriumt["pl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=24'>Zbiornik deuteru</a><a href='"+general["pl1"]+"24'>+</a><a href='"+general["de1"]+"24'>X</a>";
  forschungsl["pl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=31'>Laboratorium badawcze</a><a href='"+general["pl1"]+"31'>+</a><a href='"+general["de1"]+"31'>X</a>";
  terraformer["pl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=33'>Terraformer</a><a href='"+general["pl1"]+"33'>+</a><a href='"+general["de1"]+"33'>X</a>";
  allianzdepot["pl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=34'>Depozyt sojuszniczy</a><a href='"+general["pl1"]+"34'>+</a><a href='"+general["de1"]+"34'>X</a>";
  raketensilo["pl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=44'>Silos rakietowy</a><a href='"+general["pl1"]+"44'>+</a><a href='"+general["de1"]+"44'>X</a>";
  
  
  //---------OGAME.RO-----------COMPLETE
  metall["ro"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'>Mina de Metal</a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  kristall["ro"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=2'>Mina de Cristal</a><a href='"+general["pl1"]+"2'>+</a><a href='"+general["de1"]+"2'>X</a>";
  deuterium["ro"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=3'>Sintetizator de Deuteriu</a><a href='"+general["pl1"]+"3'>+</a><a href='"+general["de1"]+"3'>X</a>";
  solar["ro"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=4'>Uzina Solara</a><a href='"+general["pl1"]+"4'>+</a><a href='"+general["de1"]+"4'>X</a>";
  fusion["ro"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=12'>Reactor de Fuziune</a><a href='"+general["pl1"]+"12'>+</a><a href='"+general["de1"]+"5'>X</a>";
  roboter["ro"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=14'>Uzina de Roboti</a><a href='"+general["pl1"]+"14'>+</a><a href='"+general["de1"]+"14'>X</a>";
  naniten["ro"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=15'>Uzina de Naniti</a><a href='"+general["pl1"]+"15'>+</a><a href='"+general["de1"]+"15'>X</a>";
  raumschiff["ro"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=21'>Santier Naval</a><a href='"+general["pl1"]+"21'>+</a><a href='"+general["de1"]+"21'>X</a>";
  metalls["ro"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=22'>Depozit de Metal</a><a href='"+general["pl1"]+"22'>+</a><a href='"+general["de1"]+"22'>X</a>";
  kristalls["ro"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=23'>Depozit de Cristal</a><a href='"+general["pl1"]+"23'>+</a><a href='"+general["de1"]+"23'>X</a>";
  deuteriumt["ro"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=24'>Bazin de Deuteriu</a><a href='"+general["pl1"]+"24'>+</a><a href='"+general["de1"]+"24'>X</a>";
  forschungsl["ro"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=31'>Laborator de Cercetari</a><a href='"+general["pl1"]+"31'>+</a><a href='"+general["de1"]+"31'>X</a>";
  terraformer["ro"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=33'>Formator de Sol</a><a href='"+general["pl1"]+"33'>+</a><a href='"+general["de1"]+"33'>X</a>";
  allianzdepot["ro"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=34'>Hangarul Aliantei</a><a href='"+general["pl1"]+"34'>+</a><a href='"+general["de1"]+"34'>X</a>";
  raketensilo["ro"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=44'>Siloz de Rachete</a><a href='"+general["pl1"]+"44'>+</a><a href='"+general["de1"]+"44'>X</a>";
  
  
  //---------OGAME.RU
  metall["ru"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'>Rudnik po dobytschje mjetalla</a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  kristall["ru"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=2'>Rudnik po dobytschje kristalla</a><a href='"+general["pl1"]+"2'>+</a><a href='"+general["de1"]+"2'>X</a>";
  deuterium["ru"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=3'>Sintjesator djejtjerija</a><a href='"+general["pl1"]+"3'>+</a><a href='"+general["de1"]+"3'>X</a>";
  solar["ru"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=4'>Solnjetschnaja eljektrostanzija</a><a href='"+general["pl1"]+"4'>+</a><a href='"+general["de1"]+"4'>X</a>";
  fusion["ru"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=12'>Tjermojadjernaja eljektrostanzija</a><a href='"+general["pl1"]+"12'>+</a><a href='"+general["de1"]+"5'>X</a>";
  roboter["ru"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=14'>Fabrika robotow</a><a href='"+general["pl1"]+"14'>+</a><a href='"+general["de1"]+"14'>X</a>";
  naniten["ru"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=15'>Fabrika nanitow</a><a href='"+general["pl1"]+"15'>+</a><a href='"+general["de1"]+"15'>X</a>";
  raumschiff["ru"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=21'>Wjerf'</a><a href='"+general["pl1"]+"21'>+</a><a href='"+general["de1"]+"21'>X</a>";
  metalls["ru"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=22'>Hranilischtschje mjetalla</a><a href='"+general["pl1"]+"22'>+</a><a href='"+general["de1"]+"22'>X</a>";
  kristalls["ru"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=23'>Hranilischtschje kristalla</a><a href='"+general["pl1"]+"23'>+</a><a href='"+general["de1"]+"23'>X</a>";
  deuteriumt["ru"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=24'>Jomkost' dlja djejtjerija</a><a href='"+general["pl1"]+"24'>+</a><a href='"+general["de1"]+"24'>X</a>";
  forschungsl["ru"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=31'>Issljedowatjel'skaja laboratorija</a><a href='"+general["pl1"]+"31'>+</a><a href='"+general["de1"]+"31'>X</a>";
  terraformer["ru"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=33'>Tjerraformjer</a><a href='"+general["pl1"]+"33'>+</a><a href='"+general["de1"]+"33'>X</a>";
  allianzdepot["ru"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=34'>Sklad al'jansa</a><a href='"+general["pl1"]+"34'>+</a><a href='"+general["de1"]+"34'>X</a>";
  raketensilo["ru"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=44'>Rakjetnaja schahta</a><a href='"+general["pl1"]+"44'>+</a><a href='"+general["de1"]+"44'>X</a>";
  
  
  //---------OGAME.SK
  metall["sk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'>Tažobný komplex - kovy</a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  kristall["sk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=2'>Tažobný komplex - kryštály</a><a href='"+general["pl1"]+"2'>+</a><a href='"+general["de1"]+"2'>X</a>";
  deuterium["sk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=3'>Syntetizéry deutéria</a><a href='"+general["pl1"]+"3'>+</a><a href='"+general["de1"]+"3'>X</a>";
  solar["sk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=4'></a><a href='"+general["pl1"]+"4'>+</a><a href='"+general["de1"]+"4'>X</a>";
  fusion["sk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=12'></a><a href='"+general["pl1"]+"12'>+</a><a href='"+general["de1"]+"5'>X</a>";
  roboter["sk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=14'></a><a href='"+general["pl1"]+"14'>+</a><a href='"+general["de1"]+"14'>X</a>";
  naniten["sk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=15'></a><a href='"+general["pl1"]+"15'>+</a><a href='"+general["de1"]+"15'>X</a>";
  raumschiff["sk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=21'></a><a href='"+general["pl1"]+"21'>+</a><a href='"+general["de1"]+"21'>X</a>";
  metalls["sk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=22'></a><a href='"+general["pl1"]+"22'>+</a><a href='"+general["de1"]+"22'>X</a>";
  kristalls["sk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=23'></a><a href='"+general["pl1"]+"23'>+</a><a href='"+general["de1"]+"23'>X</a>";
  deuteriumt["sk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=24'></a><a href='"+general["pl1"]+"24'>+</a><a href='"+general["de1"]+"24'>X</a>";
  forschungsl["sk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=31'></a><a href='"+general["pl1"]+"31'>+</a><a href='"+general["de1"]+"31'>X</a>";
  terraformer["sk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=33'></a><a href='"+general["pl1"]+"33'>+</a><a href='"+general["de1"]+"33'>X</a>";
  allianzdepot["sk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=34'></a><a href='"+general["pl1"]+"34'>+</a><a href='"+general["de1"]+"34'>X</a>";
  raketensilo["sk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=44'></a><a href='"+general["pl1"]+"44'>+</a><a href='"+general["de1"]+"44'>X</a>";
  
  
  //---------OGAME.SE
  metall["se"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'>Metallgruva</a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  kristall["se"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=2'>Kristallgruva</a><a href='"+general["pl1"]+"2'>+</a><a href='"+general["de1"]+"2'>X</a>";
  deuterium["se"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=3'>Deuteriumplattform</a><a href='"+general["pl1"]+"3'>+</a><a href='"+general["de1"]+"3'>X</a>";
  solar["se"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=4'></a><a href='"+general["pl1"]+"4'>+</a><a href='"+general["de1"]+"4'>X</a>";
  fusion["se"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=12'></a><a href='"+general["pl1"]+"12'>+</a><a href='"+general["de1"]+"5'>X</a>";
  roboter["se"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=14'></a><a href='"+general["pl1"]+"14'>+</a><a href='"+general["de1"]+"14'>X</a>";
  naniten["se"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=15'></a><a href='"+general["pl1"]+"15'>+</a><a href='"+general["de1"]+"15'>X</a>";
  raumschiff["se"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=21'></a><a href='"+general["pl1"]+"21'>+</a><a href='"+general["de1"]+"21'>X</a>";
  metalls["se"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=22'></a><a href='"+general["pl1"]+"22'>+</a><a href='"+general["de1"]+"22'>X</a>";
  kristalls["se"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=23'></a><a href='"+general["pl1"]+"23'>+</a><a href='"+general["de1"]+"23'>X</a>";
  deuteriumt["se"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=24'></a><a href='"+general["pl1"]+"24'>+</a><a href='"+general["de1"]+"24'>X</a>";
  forschungsl["se"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=31'></a><a href='"+general["pl1"]+"31'>+</a><a href='"+general["de1"]+"31'>X</a>";
  terraformer["se"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=33'></a><a href='"+general["pl1"]+"33'>+</a><a href='"+general["de1"]+"33'>X</a>";
  allianzdepot["se"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=34'></a><a href='"+general["pl1"]+"34'>+</a><a href='"+general["de1"]+"34'>X</a>";
  raketensilo["se"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=44'></a><a href='"+general["pl1"]+"44'>+</a><a href='"+general["de1"]+"44'>X</a>";
  
  
  //---------OGAME.TW
  metall["tw"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'>???</a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  kristall["tw"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=2'>???</a><a href='"+general["pl1"]+"2'>+</a><a href='"+general["de1"]+"2'>X</a>";
  deuterium["tw"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=3'>???????</a><a href='"+general["pl1"]+"3'>+</a><a href='"+general["de1"]+"3'>X</a>";
  solar["tw"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=4'></a><a href='"+general["pl1"]+"4'>+</a><a href='"+general["de1"]+"4'>X</a>";
  fusion["tw"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=12'></a><a href='"+general["pl1"]+"12'>+</a><a href='"+general["de1"]+"5'>X</a>";
  roboter["tw"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=14'></a><a href='"+general["pl1"]+"14'>+</a><a href='"+general["de1"]+"14'>X</a>";
  naniten["tw"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=15'></a><a href='"+general["pl1"]+"15'>+</a><a href='"+general["de1"]+"15'>X</a>";
  raumschiff["tw"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=21'></a><a href='"+general["pl1"]+"21'>+</a><a href='"+general["de1"]+"21'>X</a>";
  metalls["tw"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=22'></a><a href='"+general["pl1"]+"22'>+</a><a href='"+general["de1"]+"22'>X</a>";
  kristalls["tw"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=23'></a><a href='"+general["pl1"]+"23'>+</a><a href='"+general["de1"]+"23'>X</a>";
  deuteriumt["tw"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=24'></a><a href='"+general["pl1"]+"24'>+</a><a href='"+general["de1"]+"24'>X</a>";
  forschungsl["tw"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=31'></a><a href='"+general["pl1"]+"31'>+</a><a href='"+general["de1"]+"31'>X</a>";
  terraformer["tw"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=33'></a><a href='"+general["pl1"]+"33'>+</a><a href='"+general["de1"]+"33'>X</a>";
  allianzdepot["tw"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=34'></a><a href='"+general["pl1"]+"34'>+</a><a href='"+general["de1"]+"34'>X</a>";
  raketensilo["tw"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=44'></a><a href='"+general["pl1"]+"44'>+</a><a href='"+general["de1"]+"44'>X</a>";
  
  
  //---------OGAME.US
  metall["us"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'>Metal Mine</a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  kristall["us"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=2'>Crystal Mine</a><a href='"+general["pl1"]+"2'>+</a><a href='"+general["de1"]+"2'>X</a>";
  deuterium["us"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=3'>Deuterium Synthesizer</a><a href='"+general["pl1"]+"3'>+</a><a href='"+general["de1"]+"3'>X</a>";
  solar["us"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=4'></a><a href='"+general["pl1"]+"4'>+</a><a href='"+general["de1"]+"4'>X</a>";
  fusion["us"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=12'></a><a href='"+general["pl1"]+"12'>+</a><a href='"+general["de1"]+"5'>X</a>";
  roboter["us"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=14'></a><a href='"+general["pl1"]+"14'>+</a><a href='"+general["de1"]+"14'>X</a>";
  naniten["us"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=15'></a><a href='"+general["pl1"]+"15'>+</a><a href='"+general["de1"]+"15'>X</a>";
  raumschiff["us"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=21'></a><a href='"+general["pl1"]+"21'>+</a><a href='"+general["de1"]+"21'>X</a>";
  metalls["us"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=22'></a><a href='"+general["pl1"]+"22'>+</a><a href='"+general["de1"]+"22'>X</a>";
  kristalls["us"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=23'></a><a href='"+general["pl1"]+"23'>+</a><a href='"+general["de1"]+"23'>X</a>";
  deuteriumt["us"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=24'></a><a href='"+general["pl1"]+"24'>+</a><a href='"+general["de1"]+"24'>X</a>";
  forschungsl["us"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=31'></a><a href='"+general["pl1"]+"31'>+</a><a href='"+general["de1"]+"31'>X</a>";
  terraformer["us"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=33'></a><a href='"+general["pl1"]+"33'>+</a><a href='"+general["de1"]+"33'>X</a>";
  allianzdepot["us"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=34'></a><a href='"+general["pl1"]+"34'>+</a><a href='"+general["de1"]+"34'>X</a>";
  raketensilo["us"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=44'></a><a href='"+general["pl1"]+"44'>+</a><a href='"+general["de1"]+"44'>X</a>";


  
  
  
  
  
  
  
  spionage["org"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'></a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  spionage["fi"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'></a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  spionage["fr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'></a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  spionage["gr"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'></a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  spionage["hu"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'></a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  spionage["it"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'></a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  spionage["jp"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'></a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  spionage["lt"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'></a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  spionage["lv"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'></a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  spionage["nl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'></a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  spionage["no"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'></a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  spionage["pl"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'></a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  spionage["ro"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'></a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  spionage["ru"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'></a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  spionage["sk"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'></a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  spionage["se"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'></a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  spionage["tw"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'></a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  spionage["us"] = "<a href='"+general["index"]+"page=infos&session="+general["session"]+"&gid=1'></a><a href='"+general["pl1"]+"1'>+</a><a href='"+general["de1"]+"1'>X</a>";
  //______Language_Texts______
  var text_MainShow = new Object();
  text_MainShow["de"] = "<u>Sidebar Menü anzeigen</u>";
  text_MainShow["cz"] = "<u>Zobrazit postranní panel Menu</u>";
  text_MainShow["dk"] = "<u>Show sidebar menu</u>";
  text_MainShow["org"] = "<u>Show sidebar menu</u>";
  text_MainShow["fi"] = "<u>Show sidebar menu</u>";
  text_MainShow["fr"] = "<u>Show sidebar menu</u>";
  text_MainShow["gr"] = "<u>Show sidebar menu</u>";
  text_MainShow["hu"] = "<u>Show sidebar menu</u>";
  text_MainShow["it"] = "<u>Show sidebar menu</u>";
  text_MainShow["jp"] = "<u>Show sidebar menu</u>";
  text_MainShow["lt"] = "<u>Show sidebar menu</u>";
  text_MainShow["lv"] = "<u>Show sidebar menu</u>";
  text_MainShow["nl"] = "<u>Show sidebar menu</u>";
  text_MainShow["no"] = "<u>Show sidebar menu</u>";
  text_MainShow["pl"] = "<u>Show sidebar menu</u>";
  text_MainShow["ro"] = "<u>Show sidebar menu</u>";
  text_MainShow["ru"] = "<u>Show sidebar menu</u>";
  text_MainShow["sk"] = "<u>Show sidebar menu</u>";
  text_MainShow["se"] = "<u>Show sidebar menu</u>";
  text_MainShow["tw"] = "<u>Show sidebar menu</u>";
  text_MainShow["us"] = "<u>Show sidebar menu</u>";
  
  var text_MainHide = new Object();
  text_MainHide["de"] = "<u>Sidebar Menü verstecken</u>";
  text_MainHide["cz"] = "<u>Skrýt postranní panel Menu</u>";
  text_MainHide["dk"] = "<u>Hide sidebar menu</u>";
  text_MainHide["org"] = "<u>Hide sidebar menu</u>";
  text_MainHide["fi"] = "<u>Hide sidebar menu</u>";
  text_MainHide["fr"] = "<u>Hide sidebar menu</u>";
  text_MainHide["gr"] = "<u>Hide sidebar menu</u>";
  text_MainHide["hu"] = "<u>Hide sidebar menu</u>";
  text_MainHide["it"] = "<u>Hide sidebar menu</u>";
  text_MainHide["jp"] = "<u>Hide sidebar menu</u>";
  text_MainHide["lt"] = "<u>Hide sidebar menu</u>";
  text_MainHide["lv"] = "<u>Hide sidebar menu</u>";
  text_MainHide["nl"] = "<u>Hide sidebar menu</u>";
  text_MainHide["no"] = "<u>Hide sidebar menu</u>";
  text_MainHide["pl"] = "<u>Hide sidebar menu</u>";
  text_MainHide["ro"] = "<u>Hide sidebar menu</u>";
  text_MainHide["ru"] = "<u>Hide sidebar menu</u>";
  text_MainHide["sk"] = "<u>Hide sidebar menu</u>";
  text_MainHide["se"] = "<u>Hide sidebar menu</u>";
  text_MainHide["tw"] = "<u>Hide sidebar menu</u>";
  text_MainHide["us"] = "<u>Hide sidebar menu</u>";
  
  var text_GebaeudeShow = new Object();
  text_GebaeudeShow["de"] = "Gebäude anzeigen";
  text_GebaeudeShow["cz"] = "Zobrazit Budovy";
  text_GebaeudeShow["dk"] = "Show Buildings";
  text_GebaeudeShow["org"] = "Show Buildings";
  text_GebaeudeShow["fi"] = "Show Buildings";
  text_GebaeudeShow["fr"] = "Show Buildings";
  text_GebaeudeShow["gr"] = "Show Buildings";
  text_GebaeudeShow["hu"] = "Show Buildings";
  text_GebaeudeShow["it"] = "Show Buildings";
  text_GebaeudeShow["jp"] = "Show Buildings";
  text_GebaeudeShow["lt"] = "Show Buildings";
  text_GebaeudeShow["lv"] = "Show Buildings";
  text_GebaeudeShow["nl"] = "Show Buildings";
  text_GebaeudeShow["no"] = "Show Buildings";
  text_GebaeudeShow["pl"] = "Show Buildings";
  text_GebaeudeShow["ro"] = "Show Buildings";
  text_GebaeudeShow["ru"] = "Show Buildings";
  text_GebaeudeShow["sk"] = "Show Buildings";
  text_GebaeudeShow["se"] = "Show Buildings";
  text_GebaeudeShow["tw"] = "Show Buildings";
  text_GebaeudeShow["us"] = "Show Buildings";
  
  var text_GebaeudeHide = new Object();
  text_GebaeudeHide["de"] = "Gebäude verstecken";
  text_GebaeudeHide["cz"] = "Skrýt Budovy";
  text_GebaeudeHide["dk"] = "Hide Buildings";
  text_GebaeudeHide["org"] = "Hide Buildings";
  text_GebaeudeHide["fi"] = "Hide Buildings";
  text_GebaeudeHide["fr"] = "Hide Buildings";
  text_GebaeudeHide["gr"] = "Hide Buildings";
  text_GebaeudeHide["hu"] = "Hide Buildings";
  text_GebaeudeHide["it"] = "Hide Buildings";
  text_GebaeudeHide["jp"] = "Hide Buildings";
  text_GebaeudeHide["lt"] = "Hide Buildings";
  text_GebaeudeHide["lv"] = "Hide Buildings";
  text_GebaeudeHide["nl"] = "Hide Buildings";
  text_GebaeudeHide["no"] = "Hide Buildings";
  text_GebaeudeHide["pl"] = "Hide Buildings";
  text_GebaeudeHide["ro"] = "Hide Buildings";
  text_GebaeudeHide["ru"] = "Hide Buildings";
  text_GebaeudeHide["sk"] = "Hide Buildings";
  text_GebaeudeHide["se"] = "Hide Buildings";
  text_GebaeudeHide["tw"] = "Hide Buildings";
  text_GebaeudeHide["us"] = "Hide Buildings";
  
  var text_GebaeudeContent = new Object();
  text_GebaeudeContent["de"] = "<div id='GebaeudeContent' align='center'>"+metall["de"]+"<br>"+kristall["de"]+"<br>"+deuterium["de"]+"<br>"+solar["de"]+"<br>"+fusion["de"]+"<br>"+roboter["de"]+"<br>"+naniten["de"]+"<br>"+raumschiff["de"]+"<br>"+metalls["de"]+"<br>"+kristalls["de"]+"<br>"+deuteriumt["de"]+"<br>"+forschungsl["de"]+"<br>"+terraformer["de"]+"<br>"+allianzdepot["de"]+"<br>"+raketensilo["de"]+"</div>";
  text_GebaeudeContent["cz"] = "<div id='GebaeudeContent' align='center'>"+metall["cz"]+"<br>"+kristall["cz"]+"<br>"+deuterium["cz"]+"<br>"+solar["cz"]+"<br>"+fusion["cz"]+"<br>"+roboter["cz"]+"<br>"+naniten["cz"]+"<br>"+raumschiff["cz"]+"<br>"+metalls["cz"]+"<br>"+kristalls["cz"]+"<br>"+deuteriumt["cz"]+"<br>"+forschungsl["cz"]+"<br>"+terraformer["cz"]+"<br>"+allianzdepot["cz"]+"<br>"+raketensilo["cz"]+"</div>";
  text_GebaeudeContent["dk"] = "<div id='GebaeudeContent' align='center'>"+metall["cz"]+"<br>"+kristall["cz"]+"<br>"+deuterium["cz"]+"<br>"+solar["cz"]+"<br>"+fusion["cz"]+"<br>"+roboter["cz"]+"<br>"+naniten["cz"]+"<br>"+raumschiff["cz"]+"<br>"+metalls["cz"]+"<br>"+kristalls["cz"]+"<br>"+deuteriumt["cz"]+"<br>"+forschungsl["cz"]+"<br>"+terraformer["cz"]+"<br>"+allianzdepot["cz"]+"<br>"+raketensilo["cz"]+"</div>";
  text_GebaeudeContent["org"] = "<div id='GebaeudeContent' align='center'>"+metall["org"]+"<br>"+kristall["org"]+"<br>"+deuterium["org"]+"<br>"+solar["org"]+"<br>"+fusion["org"]+"<br>"+roboter["org"]+"<br>"+naniten["org"]+"<br>"+raumschiff["org"]+"<br>"+metalls["org"]+"<br>"+kristalls["org"]+"<br>"+deuteriumt["org"]+"<br>"+forschungsl["org"]+"<br>"+terraformer["org"]+"<br>"+allianzdepot["org"]+"<br>"+raketensilo["org"]+"</div>";
  text_GebaeudeContent["fi"] = "<div id='GebaeudeContent' align='center'>"+metall["cz"]+"<br>"+kristall["cz"]+"<br>"+deuterium["cz"]+"<br>"+solar["cz"]+"<br>"+fusion["cz"]+"<br>"+roboter["cz"]+"<br>"+naniten["cz"]+"<br>"+raumschiff["cz"]+"<br>"+metalls["cz"]+"<br>"+kristalls["cz"]+"<br>"+deuteriumt["cz"]+"<br>"+forschungsl["cz"]+"<br>"+terraformer["cz"]+"<br>"+allianzdepot["cz"]+"<br>"+raketensilo["cz"]+"</div>";
  text_GebaeudeContent["fr"] = "<div id='GebaeudeContent' align='center'>"+metall["fr"]+"<br>"+kristall["fr"]+"<br>"+deuterium["fr"]+"<br>"+solar["fr"]+"<br>"+fusion["fr"]+"<br>"+roboter["fr"]+"<br>"+naniten["fr"]+"<br>"+raumschiff["fr"]+"<br>"+metalls["fr"]+"<br>"+kristalls["fr"]+"<br>"+deuteriumt["fr"]+"<br>"+forschungsl["fr"]+"<br>"+terraformer["fr"]+"<br>"+allianzdepot["fr"]+"<br>"+raketensilo["fr"]+"</div>";
  text_GebaeudeContent["gr"] = "<div id='GebaeudeContent' align='center'>"+metall["gr"]+"<br>"+kristall["gr"]+"<br>"+deuterium["gr"]+"<br>"+solar["gr"]+"<br>"+fusion["gr"]+"<br>"+roboter["gr"]+"<br>"+naniten["gr"]+"<br>"+raumschiff["gr"]+"<br>"+metalls["gr"]+"<br>"+kristalls["gr"]+"<br>"+deuteriumt["gr"]+"<br>"+forschungsl["gr"]+"<br>"+terraformer["gr"]+"<br>"+allianzdepot["gr"]+"<br>"+raketensilo["gr"]+"</div>";
  text_GebaeudeContent["hu"] = "<div id='GebaeudeContent' align='center'>"+metall["hu"]+"<br>"+kristall["hu"]+"<br>"+deuterium["hu"]+"<br>"+solar["hu"]+"<br>"+fusion["hu"]+"<br>"+roboter["hu"]+"<br>"+naniten["hu"]+"<br>"+raumschiff["hu"]+"<br>"+metalls["hu"]+"<br>"+kristalls["hu"]+"<br>"+deuteriumt["hu"]+"<br>"+forschungsl["hu"]+"<br>"+terraformer["hu"]+"<br>"+allianzdepot["hu"]+"<br>"+raketensilo["hu"]+"</div>";
  text_GebaeudeContent["it"] = "<div id='GebaeudeContent' align='center'>"+metall["it"]+"<br>"+kristall["it"]+"<br>"+deuterium["it"]+"<br>"+solar["it"]+"<br>"+fusion["it"]+"<br>"+roboter["it"]+"<br>"+naniten["it"]+"<br>"+raumschiff["it"]+"<br>"+metalls["it"]+"<br>"+kristalls["it"]+"<br>"+deuteriumt["it"]+"<br>"+forschungsl["it"]+"<br>"+terraformer["it"]+"<br>"+allianzdepot["it"]+"<br>"+raketensilo["it"]+"</div>";
  text_GebaeudeContent["jp"] = "<div id='GebaeudeContent' align='center'>"+metall["jp"]+"<br>"+kristall["jp"]+"<br>"+deuterium["jp"]+"<br>"+solar["jp"]+"<br>"+fusion["jp"]+"<br>"+roboter["jp"]+"<br>"+naniten["jp"]+"<br>"+raumschiff["jp"]+"<br>"+metalls["jp"]+"<br>"+kristalls["jp"]+"<br>"+deuteriumt["jp"]+"<br>"+forschungsl["jp"]+"<br>"+terraformer["jp"]+"<br>"+allianzdepot["jp"]+"<br>"+raketensilo["jp"]+"</div>";
  text_GebaeudeContent["lt"] = "<div id='GebaeudeContent' align='center'>"+metall["lt"]+"<br>"+kristall["lt"]+"<br>"+deuterium["lt"]+"<br>"+solar["lt"]+"<br>"+fusion["lt"]+"<br>"+roboter["lt"]+"<br>"+naniten["lt"]+"<br>"+raumschiff["lt"]+"<br>"+metalls["lt"]+"<br>"+kristalls["lt"]+"<br>"+deuteriumt["lt"]+"<br>"+forschungsl["lt"]+"<br>"+terraformer["lt"]+"<br>"+allianzdepot["lt"]+"<br>"+raketensilo["lt"]+"</div>";
  text_GebaeudeContent["lv"] = "<div id='GebaeudeContent' align='center'>"+metall["lv"]+"<br>"+kristall["lv"]+"<br>"+deuterium["lv"]+"<br>"+solar["lv"]+"<br>"+fusion["lv"]+"<br>"+roboter["lv"]+"<br>"+naniten["lv"]+"<br>"+raumschiff["lv"]+"<br>"+metalls["lv"]+"<br>"+kristalls["lv"]+"<br>"+deuteriumt["lv"]+"<br>"+forschungsl["lv"]+"<br>"+terraformer["lv"]+"<br>"+allianzdepot["lv"]+"<br>"+raketensilo["lv"]+"</div>";
  text_GebaeudeContent["nl"] = "<div id='GebaeudeContent' align='center'>"+metall["nl"]+"<br>"+kristall["nl"]+"<br>"+deuterium["nl"]+"<br>"+solar["nl"]+"<br>"+fusion["nl"]+"<br>"+roboter["nl"]+"<br>"+naniten["nl"]+"<br>"+raumschiff["nl"]+"<br>"+metalls["nl"]+"<br>"+kristalls["nl"]+"<br>"+deuteriumt["nl"]+"<br>"+forschungsl["nl"]+"<br>"+terraformer["nl"]+"<br>"+allianzdepot["nl"]+"<br>"+raketensilo["nl"]+"</div>";
  text_GebaeudeContent["no"] = "<div id='GebaeudeContent' align='center'>"+metall["no"]+"<br>"+kristall["no"]+"<br>"+deuterium["no"]+"<br>"+solar["no"]+"<br>"+fusion["no"]+"<br>"+roboter["no"]+"<br>"+naniten["no"]+"<br>"+raumschiff["no"]+"<br>"+metalls["no"]+"<br>"+kristalls["no"]+"<br>"+deuteriumt["no"]+"<br>"+forschungsl["no"]+"<br>"+terraformer["no"]+"<br>"+allianzdepot["no"]+"<br>"+raketensilo["no"]+"</div>";
  text_GebaeudeContent["pl"] = "<div id='GebaeudeContent' align='center'>"+metall["pl"]+"<br>"+kristall["pl"]+"<br>"+deuterium["pl"]+"<br>"+solar["pl"]+"<br>"+fusion["pl"]+"<br>"+roboter["pl"]+"<br>"+naniten["pl"]+"<br>"+raumschiff["pl"]+"<br>"+metalls["pl"]+"<br>"+kristalls["pl"]+"<br>"+deuteriumt["pl"]+"<br>"+forschungsl["pl"]+"<br>"+terraformer["pl"]+"<br>"+allianzdepot["pl"]+"<br>"+raketensilo["pl"]+"</div>";
  text_GebaeudeContent["ro"] = "<div id='GebaeudeContent' align='center'>"+metall["ro"]+"<br>"+kristall["ro"]+"<br>"+deuterium["ro"]+"<br>"+solar["ro"]+"<br>"+fusion["ro"]+"<br>"+roboter["ro"]+"<br>"+naniten["ro"]+"<br>"+raumschiff["ro"]+"<br>"+metalls["ro"]+"<br>"+kristalls["ro"]+"<br>"+deuteriumt["ro"]+"<br>"+forschungsl["ro"]+"<br>"+terraformer["ro"]+"<br>"+allianzdepot["ro"]+"<br>"+raketensilo["ro"]+"</div>";
  text_GebaeudeContent["ru"] = "<div id='GebaeudeContent' align='center'>"+metall["ru"]+"<br>"+kristall["ru"]+"<br>"+deuterium["ru"]+"<br>"+solar["ru"]+"<br>"+fusion["ru"]+"<br>"+roboter["ru"]+"<br>"+naniten["ru"]+"<br>"+raumschiff["ru"]+"<br>"+metalls["ru"]+"<br>"+kristalls["ru"]+"<br>"+deuteriumt["ru"]+"<br>"+forschungsl["ru"]+"<br>"+terraformer["ru"]+"<br>"+allianzdepot["ru"]+"<br>"+raketensilo["ru"]+"</div>";
  text_GebaeudeContent["sk"] = "<div id='GebaeudeContent' align='center'>"+metall["sk"]+"<br>"+kristall["sk"]+"<br>"+deuterium["sk"]+"<br>"+solar["sk"]+"<br>"+fusion["sk"]+"<br>"+roboter["sk"]+"<br>"+naniten["sk"]+"<br>"+raumschiff["sk"]+"<br>"+metalls["sk"]+"<br>"+kristalls["sk"]+"<br>"+deuteriumt["sk"]+"<br>"+forschungsl["sk"]+"<br>"+terraformer["sk"]+"<br>"+allianzdepot["sk"]+"<br>"+raketensilo["sk"]+"</div>";
  text_GebaeudeContent["se"] = "<div id='GebaeudeContent' align='center'>"+metall["se"]+"<br>"+kristall["se"]+"<br>"+deuterium["se"]+"<br>"+solar["se"]+"<br>"+fusion["se"]+"<br>"+roboter["se"]+"<br>"+naniten["se"]+"<br>"+raumschiff["se"]+"<br>"+metalls["se"]+"<br>"+kristalls["se"]+"<br>"+deuteriumt["se"]+"<br>"+forschungsl["se"]+"<br>"+terraformer["se"]+"<br>"+allianzdepot["se"]+"<br>"+raketensilo["se"]+"</div>";
  text_GebaeudeContent["tw"] = "<div id='GebaeudeContent' align='center'>"+metall["tw"]+"<br>"+kristall["tw"]+"<br>"+deuterium["tw"]+"<br>"+solar["tw"]+"<br>"+fusion["tw"]+"<br>"+roboter["tw"]+"<br>"+naniten["tw"]+"<br>"+raumschiff["tw"]+"<br>"+metalls["tw"]+"<br>"+kristalls["tw"]+"<br>"+deuteriumt["tw"]+"<br>"+forschungsl["tw"]+"<br>"+terraformer["tw"]+"<br>"+allianzdepot["tw"]+"<br>"+raketensilo["tw"]+"</div>";
  text_GebaeudeContent["us"] = "<div id='GebaeudeContent' align='center'>"+metall["us"]+"<br>"+kristall["us"]+"<br>"+deuterium["us"]+"<br>"+solar["us"]+"<br>"+fusion["us"]+"<br>"+roboter["us"]+"<br>"+naniten["us"]+"<br>"+raumschiff["us"]+"<br>"+metalls["us"]+"<br>"+kristalls["us"]+"<br>"+deuteriumt["us"]+"<br>"+forschungsl["us"]+"<br>"+terraformer["us"]+"<br>"+allianzdepot["us"]+"<br>"+raketensilo["us"]+"</div>";
  
  var text_ForschungShow = new Object();
  text_ForschungShow["de"] = "Forschung zeigen";
  text_ForschungShow["cz"] = "Zobrazit Výzkum";
  text_ForschungShow["dk"] = "Show Research";
  text_ForschungShow["org"] = "Show Research";
  text_ForschungShow["fi"] = "Show Research";
  text_ForschungShow["fr"] = "Show Research";
  text_ForschungShow["gr"] = "Show Research";
  text_ForschungShow["hu"] = "Show Research";
  text_ForschungShow["it"] = "Show Research";
  text_ForschungShow["jp"] = "Show Research";
  text_ForschungShow["lt"] = "Show Research";
  text_ForschungShow["lv"] = "Show Research";
  text_ForschungShow["nl"] = "Show Research";
  text_ForschungShow["no"] = "Show Research";
  text_ForschungShow["pl"] = "Show Research";
  text_ForschungShow["ro"] = "Show Research";
  text_ForschungShow["ru"] = "Show Research";
  text_ForschungShow["sk"] = "Show Research";
  text_ForschungShow["se"] = "Show Research";
  text_ForschungShow["tw"] = "Show Research";
  text_ForschungShow["us"] = "Show Research";
  
  var text_ForschungHide = new Object();
  text_ForschungHide["de"] = "Forschung verstecken";
  text_ForschungHide["cz"] = "Skrýt Výzkum";
  text_ForschungHide["dk"] = "Hide Research";
  text_ForschungHide["org"] = "Hide Research";
  text_ForschungHide["fi"] = "Hide Research";
  text_ForschungHide["fr"] = "Hide Research";
  text_ForschungHide["gr"] = "Hide Research";
  text_ForschungHide["hu"] = "Hide Research";
  text_ForschungHide["it"] = "Hide Research";
  text_ForschungHide["jp"] = "Hide Research";
  text_ForschungHide["lt"] = "Hide Research";
  text_ForschungHide["lv"] = "Hide Research";
  text_ForschungHide["nl"] = "Hide Research";
  text_ForschungHide["no"] = "Hide Research";
  text_ForschungHide["pl"] = "Hide Research";
  text_ForschungHide["ro"] = "Hide Research";
  text_ForschungHide["ru"] = "Hide Research";
  text_ForschungHide["sk"] = "Hide Research";
  text_ForschungHide["se"] = "Hide Research";
  text_ForschungHide["tw"] = "Hide Research";
  text_ForschungHide["us"] = "Hide Research";
  
  var text_ForschungContent = new Object();
  text_ForschungContent["de"] = "<div id='ForschungContent' align='center'>"+spionage["de"]+"<br>"+computer["de"]+"<br>"+waffen["de"]+"<br>"+schild["de"]+"<br>"+raumschiffpanzerung["de"]+"<br>"+energie["de"]+"<br>"+hyperraum["de"]+"<br>"+verbrennungstriebwerk["de"]+"<br>"+impulstriebwerk["de"]+"<br>"+hyperraumantrieb["de"]+"<br>"+laser["de"]+"<br>"+ionen["de"]+"<br>"+plasma["de"]+"<br>"+netzwerk["de"]+"<br>"+expedition["de"]+"<br>"+graviton["de"]+"</div>";
  text_ForschungContent["cz"] = "<div id='ForschungContent' align='center'>Špionážní technologie<br>Gravitonová technologie<br>etc.</div>";
  text_ForschungContent["dk"] = "<div id='ForschungContent' align='center'></div>";
  text_ForschungContent["org"] = "<div id='ForschungContent' align='center'>Computer Technology<br>Graviton Technologie<br>etc.</div>";
  text_ForschungContent["fi"] = "<div id='ForschungContent' align='center'></div>";
  text_ForschungContent["fr"] = "<div id='ForschungContent' align='center'></div>";
  text_ForschungContent["gr"] = "<div id='ForschungContent' align='center'></div>";
  text_ForschungContent["hu"] = "<div id='ForschungContent' align='center'></div>";
  text_ForschungContent["it"] = "<div id='ForschungContent' align='center'></div>";
  text_ForschungContent["jp"] = "<div id='ForschungContent' align='center'></div>";
  text_ForschungContent["lt"] = "<div id='ForschungContent' align='center'></div>";
  text_ForschungContent["lv"] = "<div id='ForschungContent' align='center'></div>";
  text_ForschungContent["nl"] = "<div id='ForschungContent' align='center'></div>";
  text_ForschungContent["no"] = "<div id='ForschungContent' align='center'></div>";
  text_ForschungContent["pl"] = "<div id='ForschungContent' align='center'></div>";
  text_ForschungContent["ro"] = "<div id='ForschungContent' align='center'></div>";
  text_ForschungContent["ru"] = "<div id='ForschungContent' align='center'></div>";
  text_ForschungContent["sk"] = "<div id='ForschungContent' align='center'></div>";
  text_ForschungContent["se"] = "<div id='ForschungContent' align='center'></div>";
  text_ForschungContent["tw"] = "<div id='ForschungContent' align='center'></div>";
  text_ForschungContent["us"] = "<div id='ForschungContent' align='center'></div>";
  
  var text_SchiffwerftShow = new Object();
  text_SchiffwerftShow["de"] = "Schiffwerft zeigen";
  text_SchiffwerftShow["cz"] = "Zobrazit Lodenice";
  text_SchiffwerftShow["dk"] = "Show Shipyard";
  text_SchiffwerftShow["org"] = "Show Shipyard";
  text_SchiffwerftShow["fi"] = "Show Shipyard";
  text_SchiffwerftShow["fr"] = "Show Shipyard";
  text_SchiffwerftShow["gr"] = "Show Shipyard";
  text_SchiffwerftShow["hu"] = "Show Shipyard";
  text_SchiffwerftShow["it"] = "Show Shipyard";
  text_SchiffwerftShow["jp"] = "Show Shipyard";
  text_SchiffwerftShow["lt"] = "Show Shipyard";
  text_SchiffwerftShow["lv"] = "Show Shipyard";
  text_SchiffwerftShow["nl"] = "Show Shipyard";
  text_SchiffwerftShow["no"] = "Show Shipyard";
  text_SchiffwerftShow["pl"] = "Show Shipyard";
  text_SchiffwerftShow["ro"] = "Show Shipyard";
  text_SchiffwerftShow["ru"] = "Show Shipyard";
  text_SchiffwerftShow["sk"] = "Show Shipyard";
  text_SchiffwerftShow["se"] = "Show Shipyard";
  text_SchiffwerftShow["tw"] = "Show Shipyard";
  text_SchiffwerftShow["us"] = "Show Shipyard";
  
  var text_SchiffwerftHide = new Object();
  text_SchiffwerftHide["de"] = "Schiffwerft verstecken";
  text_SchiffwerftHide["cz"] = "Skrýt Lodenice";
  text_SchiffwerftHide["dk"] = "Hide Shipyard";
  text_SchiffwerftHide["org"] = "Hide Shipyard";
  text_SchiffwerftHide["fi"] = "Hide Shipyard";
  text_SchiffwerftHide["fr"] = "Hide Shipyard";
  text_SchiffwerftHide["gr"] = "Hide Shipyard";
  text_SchiffwerftHide["hu"] = "Hide Shipyard";
  text_SchiffwerftHide["it"] = "Hide Shipyard";
  text_SchiffwerftHide["jp"] = "Hide Shipyard";
  text_SchiffwerftHide["lt"] = "Hide Shipyard";
  text_SchiffwerftHide["lv"] = "Hide Shipyard";
  text_SchiffwerftHide["nl"] = "Hide Shipyard";
  text_SchiffwerftHide["no"] = "Hide Shipyard";
  text_SchiffwerftHide["pl"] = "Hide Shipyard";
  text_SchiffwerftHide["ro"] = "Hide Shipyard";
  text_SchiffwerftHide["ru"] = "Hide Shipyard";
  text_SchiffwerftHide["sk"] = "Hide Shipyard";
  text_SchiffwerftHide["se"] = "Hide Shipyard";
  text_SchiffwerftHide["tw"] = "Hide Shipyard";
  text_SchiffwerftHide["us"] = "Hide Shipyard";
  
  var text_SchiffwerftContent = new Object();
  text_SchiffwerftContent["de"] = "<div id='SchiffwerftContent' align='center'>Kleiner Transporter<br>Schlachter<br>etc.</div>";
  text_SchiffwerftContent["cz"] = "<div id='SchiffwerftContent' align='center'>Malý transportér<br>Križník<br>etc.</div>";
  text_SchiffwerftContent["dk"] = "<div id='SchiffwerftContent' align='center'></div>";
  text_SchiffwerftContent["org"] = "<div id='SchiffwerftContent' align='center'>Small Cargo<br>Cruiser<br>etc.</div>";
  text_SchiffwerftContent["fi"] = "<div id='SchiffwerftContent' align='center'></div>";
  text_SchiffwerftContent["fr"] = "<div id='SchiffwerftContent' align='center'></div>";
  text_SchiffwerftContent["gr"] = "<div id='SchiffwerftContent' align='center'></div>";
  text_SchiffwerftContent["hu"] = "<div id='SchiffwerftContent' align='center'></div>";
  text_SchiffwerftContent["it"] = "<div id='SchiffwerftContent' align='center'></div>";
  text_SchiffwerftContent["jp"] = "<div id='SchiffwerftContent' align='center'></div>";
  text_SchiffwerftContent["lt"] = "<div id='SchiffwerftContent' align='center'></div>";
  text_SchiffwerftContent["lv"] = "<div id='SchiffwerftContent' align='center'></div>";
  text_SchiffwerftContent["nl"] = "<div id='SchiffwerftContent' align='center'></div>";
  text_SchiffwerftContent["no"] = "<div id='SchiffwerftContent' align='center'></div>";
  text_SchiffwerftContent["pl"] = "<div id='SchiffwerftContent' align='center'></div>";
  text_SchiffwerftContent["ro"] = "<div id='SchiffwerftContent' align='center'></div>";
  text_SchiffwerftContent["ru"] = "<div id='SchiffwerftContent' align='center'></div>";
  text_SchiffwerftContent["sk"] = "<div id='SchiffwerftContent' align='center'></div>";
  text_SchiffwerftContent["se"] = "<div id='SchiffwerftContent' align='center'></div>";
  text_SchiffwerftContent["tw"] = "<div id='SchiffwerftContent' align='center'></div>";
  text_SchiffwerftContent["us"] = "<div id='SchiffwerftContent' align='center'></div>";
  
  var text_VerteidigungShow = new Object();
  text_VerteidigungShow["de"] = "Verteidigung zeigen";
  text_VerteidigungShow["cz"] = "Zobrazit obrany";
  text_VerteidigungShow["dk"] = "Show Defense";
  text_VerteidigungShow["org"] = "Show Defense";
  text_VerteidigungShow["fi"] = "Show Defense";
  text_VerteidigungShow["fr"] = "Show Defense";
  text_VerteidigungShow["gr"] = "Show Defense";
  text_VerteidigungShow["hu"] = "Show Defense";
  text_VerteidigungShow["it"] = "Show Defense";
  text_VerteidigungShow["jp"] = "Show Defense";
  text_VerteidigungShow["lt"] = "Show Defense";
  text_VerteidigungShow["lv"] = "Show Defense";
  text_VerteidigungShow["nl"] = "Show Defense";
  text_VerteidigungShow["no"] = "Show Defense";
  text_VerteidigungShow["pl"] = "Show Defense";
  text_VerteidigungShow["ro"] = "Show Defense";
  text_VerteidigungShow["ru"] = "Show Defense";
  text_VerteidigungShow["sk"] = "Show Defense";
  text_VerteidigungShow["se"] = "Show Defense";
  text_VerteidigungShow["tw"] = "Show Defense";
  text_VerteidigungShow["us"] = "Show Defense";
  
  var text_VerteidigungHide = new Object();
  text_VerteidigungHide["de"] = "Verteidigung verstecken";
  text_VerteidigungHide["cz"] = "Skrýt obrany";
  text_VerteidigungHide["dk"] = "Hide Defense";
  text_VerteidigungHide["org"] = "Hide Defense";
  text_VerteidigungHide["fi"] = "Hide Defense";
  text_VerteidigungHide["fr"] = "Hide Defense";
  text_VerteidigungHide["gr"] = "Hide Defense";
  text_VerteidigungHide["hu"] = "Hide Defense";
  text_VerteidigungHide["it"] = "Hide Defense";
  text_VerteidigungHide["jp"] = "Hide Defense";
  text_VerteidigungHide["lt"] = "Hide Defense";
  text_VerteidigungHide["lv"] = "Hide Defense";
  text_VerteidigungHide["nl"] = "Hide Defense";
  text_VerteidigungHide["no"] = "Hide Defense";
  text_VerteidigungHide["pl"] = "Hide Defense";
  text_VerteidigungHide["ro"] = "Hide Defense";
  text_VerteidigungHide["ru"] = "Hide Defense";
  text_VerteidigungHide["sk"] = "Hide Defense";
  text_VerteidigungHide["se"] = "Hide Defense";
  text_VerteidigungHide["tw"] = "Hide Defense";
  text_VerteidigungHide["us"] = "Hide Defense";
  
  var text_VerteidigungContent = new Object();
  text_VerteidigungContent["de"] = "<div id='VerteidigungContent' align='center'>Gaußkanone<br>Schweres Lasergeschütz<br>etc.</div>";
  text_VerteidigungContent["cz"] = "<div id='VerteidigungContent' align='center'>Gauss kanón<br>Težký laser<br>etc.</div>";
  text_VerteidigungContent["dk"] = "<div id='VerteidigungContent' align='center'></div>";
  text_VerteidigungContent["org"] = "<div id='VerteidigungContent' align='center'>Gauss Canon<br>Heavy Laser</div>";
  text_VerteidigungContent["fi"] = "<div id='VerteidigungContent' align='center'></div>";
  text_VerteidigungContent["fr"] = "<div id='VerteidigungContent' align='center'></div>";
  text_VerteidigungContent["gr"] = "<div id='VerteidigungContent' align='center'></div>";
  text_VerteidigungContent["hu"] = "<div id='VerteidigungContent' align='center'></div>";
  text_VerteidigungContent["it"] = "<div id='VerteidigungContent' align='center'></div>";
  text_VerteidigungContent["jp"] = "<div id='VerteidigungContent' align='center'></div>";
  text_VerteidigungContent["lt"] = "<div id='VerteidigungContent' align='center'></div>";
  text_VerteidigungContent["lv"] = "<div id='VerteidigungContent' align='center'></div>";
  text_VerteidigungContent["nl"] = "<div id='VerteidigungContent' align='center'></div>";
  text_VerteidigungContent["no"] = "<div id='VerteidigungContent' align='center'></div>";
  text_VerteidigungContent["pl"] = "<div id='VerteidigungContent' align='center'></div>";
  text_VerteidigungContent["ro"] = "<div id='VerteidigungContent' align='center'></div>";
  text_VerteidigungContent["ru"] = "<div id='VerteidigungContent' align='center'></div>";
  text_VerteidigungContent["sk"] = "<div id='VerteidigungContent' align='center'></div>";
  text_VerteidigungContent["se"] = "<div id='VerteidigungContent' align='center'></div>";
  text_VerteidigungContent["tw"] = "<div id='VerteidigungContent' align='center'></div>";
  text_VerteidigungContent["us"] = "<div id='VerteidigungContent' align='center'></div>";
  
  var text_LinksShow = new Object();
  text_LinksShow["de"] = "Links zeigen";
  text_LinksShow["cz"] = "Show Links";
  text_LinksShow["dk"] = "Show Links";
  text_LinksShow["org"] = "Show Links";
  text_LinksShow["fi"] = "Show Links";
  text_LinksShow["fr"] = "Show Links";
  text_LinksShow["gr"] = "Show Links";
  text_LinksShow["hu"] = "Show Links";
  text_LinksShow["it"] = "Show Links";
  text_LinksShow["jp"] = "Show Links";
  text_LinksShow["lt"] = "Show Links";
  text_LinksShow["lv"] = "Show Links";
  text_LinksShow["nl"] = "Show Links";
  text_LinksShow["no"] = "Show Links";
  text_LinksShow["pl"] = "Show Links";
  text_LinksShow["ro"] = "Show Links";
  text_LinksShow["ru"] = "Show Links";
  text_LinksShow["sk"] = "Show Links";
  text_LinksShow["se"] = "Show Links";
  text_LinksShow["tw"] = "Show Links";
  text_LinksShow["us"] = "Show Links";
  
  var text_LinksHide = new Object();
  text_LinksHide["de"] = "Links verstecken";
  text_LinksHide["cz"] = "Hide Links";
  text_LinksHide["dk"] = "Hide Links";
  text_LinksHide["org"] = "Hide Links";
  text_LinksHide["fi"] = "Hide Links";
  text_LinksHide["fr"] = "Hide Links";
  text_LinksHide["gr"] = "Hide Links";
  text_LinksHide["hu"] = "Hide Links";
  text_LinksHide["it"] = "Hide Links";
  text_LinksHide["jp"] = "Hide Links";
  text_LinksHide["lt"] = "Hide Links";
  text_LinksHide["lv"] = "Hide Links";
  text_LinksHide["nl"] = "Hide Links";
  text_LinksHide["no"] = "Hide Links";
  text_LinksHide["pl"] = "Hide Links";
  text_LinksHide["ro"] = "Hide Links";
  text_LinksHide["ru"] = "Hide Links";
  text_LinksHide["sk"] = "Hide Links";
  text_LinksHide["se"] = "Hide Links";
  text_LinksHide["tw"] = "Hide Links";
  text_LinksHide["us"] = "Hide Links";
  
  var text_LinksContent = new Object();
  text_LinksContent["de"] = "<div id='LinksContent' align='center'><a href='"+general["index"]+"page=overview&session="+general["session"]+"'>Hauptseite</a><br><a href='"+general["index"]+"page=b_building&session="+general["session"]+"'>Gebäude</a><br><a href='"+general["index"]+"page=resources&session="+general["session"]+"'>Rohstoffe</a><br><a href='"+general["index"]+"page=buildings&session="+general["session"]+"&mode=Forschung'>Forschung</a><br><a href='"+general["index"]+"page=buildings&session="+general["session"]+"&mode=Flotte'>Schiffwerft</a><br><a href='"+general["index"]+"page=buildings&session="+general["session"]+"&mode=Verteidigung'>Verteidigung</a><br><a href='"+general["index"]+"page=flotten1&session="+general["session"]+"&mode=Flotte'>Flotte</a><br><a href='"+general["index"]+"page=techtree&session="+general["session"]+"'>Technik</a><br><a href='"+general["index"]+"page=galaxy&session="+general["session"]+"'>Galaxy</a><br><a href='"+general["index"]+"page=statistics&session="+general["session"]+"'>Statistik</a><br><a href='"+general["index"]+"page=suche&session="+general["session"]+"'>Suche</a><br><a href='"+general["index"]+"page=messages&session="+general["session"]+"'>Nachrichten</a><br><a href='"+general["index"]+"page=buddy&session="+general["session"]+"'>Buddyliste</a><br><a href='"+general["index"]+"page=options&session="+general["session"]+"'>Einstellungen</a></div>";
  text_LinksContent["cz"] = "<div id='LinksContent' align='center'></div>";
  text_LinksContent["dk"] = "<div id='LinksContent' align='center'></div>";
  text_LinksContent["org"] = "<div id='LinksContent' align='center'></div>";
  text_LinksContent["fi"] = "<div id='LinksContent' align='center'></div>";
  text_LinksContent["fr"] = "<div id='LinksContent' align='center'></div>";
  text_LinksContent["gr"] = "<div id='LinksContent' align='center'></div>";
  text_LinksContent["hu"] = "<div id='LinksContent' align='center'></div>";
  text_LinksContent["it"] = "<div id='LinksContent' align='center'></div>";
  text_LinksContent["jp"] = "<div id='LinksContent' align='center'></div>";
  text_LinksContent["lt"] = "<div id='LinksContent' align='center'></div>";
  text_LinksContent["lv"] = "<div id='LinksContent' align='center'></div>";
  text_LinksContent["nl"] = "<div id='LinksContent' align='center'></div>";
  text_LinksContent["no"] = "<div id='LinksContent' align='center'></div>";
  text_LinksContent["pl"] = "<div id='LinksContent' align='center'></div>";
  text_LinksContent["ro"] = "<div id='LinksContent' align='center'></div>";
  text_LinksContent["ru"] = "<div id='LinksContent' align='center'></div>";
  text_LinksContent["sk"] = "<div id='LinksContent' align='center'></div>";
  text_LinksContent["se"] = "<div id='LinksContent' align='center'></div>";
  text_LinksContent["tw"] = "<div id='LinksContent' align='center'></div>";
  
  var text_Settings = new Object();
  text_Settings["de"] = "Einstellungen";
  text_Settings["cz"] = "Settings";
  text_Settings["dk"] = "Settings";
  text_Settings["org"] = "Settings";
  text_Settings["fi"] = "Settings";
  text_Settings["fr"] = "Settings";
  text_Settings["gr"] = "Settings";
  text_Settings["hu"] = "Settings";
  text_Settings["it"] = "Settings";
  text_Settings["jp"] = "Settings";
  text_Settings["lt"] = "Settings";
  text_Settings["lv"] = "Settings";
  text_Settings["nl"] = "Settings";
  text_Settings["no"] = "Settings";
  text_Settings["pl"] = "Settings";
  text_Settings["ro"] = "Settings";
  text_Settings["ru"] = "Settings";
  text_Settings["sk"] = "Settings";
  text_Settings["se"] = "Settings";
  text_Settings["tw"] = "Settings";
  text_Settings["us"] = "Settings";
  
  var text_showVariableTable = new Object();
  text_showVariableTable["de"] = "Bitte einstellen, wo die Sidebar angezeigt werdenn soll! (3 = header_top | 5 = LeftMenu | 6 = Content)";
  text_showVariableTable["cz"] = "Please set up, where you wish to have the Sidebar! (3 = header_top | 5 = LeftMenu | 6 = Content)";
  text_showVariableTable["dk"] = "Please set up, where you wish to have the Sidebar! (3 = header_top | 5 = LeftMenu | 6 = Content)";
  text_showVariableTable["org"] = "Please set up, where you wish to have the Sidebar! (3 = header_top | 5 = LeftMenu | 6 = Content)";
  text_showVariableTable["fi"] = "Please set up, where you wish to have the Sidebar! (3 = header_top | 5 = LeftMenu | 6 = Content)";
  text_showVariableTable["fr"] = "Please set up, where you wish to have the Sidebar! (3 = header_top | 5 = LeftMenu | 6 = Content)";
  text_showVariableTable["gr"] = "Please set up, where you wish to have the Sidebar! (3 = header_top | 5 = LeftMenu | 6 = Content)";
  text_showVariableTable["hu"] = "Please set up, where you wish to have the Sidebar! (3 = header_top | 5 = LeftMenu | 6 = Content)";
  text_showVariableTable["it"] = "Please set up, where you wish to have the Sidebar! (3 = header_top | 5 = LeftMenu | 6 = Content)";
  text_showVariableTable["jp"] = "Please set up, where you wish to have the Sidebar! (3 = header_top | 5 = LeftMenu | 6 = Content)";
  text_showVariableTable["lt"] = "Please set up, where you wish to have the Sidebar! (3 = header_top | 5 = LeftMenu | 6 = Content)";
  text_showVariableTable["lv"] = "Please set up, where you wish to have the Sidebar! (3 = header_top | 5 = LeftMenu | 6 = Content)";
  text_showVariableTable["nl"] = "Please set up, where you wish to have the Sidebar! (3 = header_top | 5 = LeftMenu | 6 = Content)";
  text_showVariableTable["no"] = "Please set up, where you wish to have the Sidebar! (3 = header_top | 5 = LeftMenu | 6 = Content)";
  text_showVariableTable["pl"] = "Please set up, where you wish to have the Sidebar! (3 = header_top | 5 = LeftMenu | 6 = Content)";
  text_showVariableTable["ro"] = "Please set up, where you wish to have the Sidebar! (3 = header_top | 5 = LeftMenu | 6 = Content)";
  text_showVariableTable["ru"] = "Please set up, where you wish to have the Sidebar! (3 = header_top | 5 = LeftMenu | 6 = Content)";
  text_showVariableTable["sk"] = "Please set up, where you wish to have the Sidebar! (3 = header_top | 5 = LeftMenu | 6 = Content)";
  text_showVariableTable["se"] = "Please set up, where you wish to have the Sidebar! (3 = header_top | 5 = LeftMenu | 6 = Content)";
  text_showVariableTable["tw"] = "Please set up, where you wish to have the Sidebar! (3 = header_top | 5 = LeftMenu | 6 = Content)";
  text_showVariableTable["us"] = "Please set up, where you wish to have the Sidebar! (3 = header_top | 5 = LeftMenu | 6 = Content)";
  
  var text_SettingsShow = new Object();
  text_SettingsShow["de"] = "Einstellungen anzeigen";
  text_SettingsShow["cz"] = "Show Settings";
  text_SettingsShow["dk"] = "Show Settings";
  text_SettingsShow["org"] = "Show Settings";
  text_SettingsShow["fi"] = "Show Settings";
  text_SettingsShow["fr"] = "Show Settings";
  text_SettingsShow["gr"] = "Show Settings";
  text_SettingsShow["hu"] = "Show Settings";
  text_SettingsShow["it"] = "Show Settings";
  text_SettingsShow["jp"] = "Show Settings";
  text_SettingsShow["lt"] = "Show Settings";
  text_SettingsShow["lv"] = "Show Settings";
  text_SettingsShow["nl"] = "Show Settings";
  text_SettingsShow["no"] = "Show Settings";
  text_SettingsShow["pl"] = "Show Settings";
  text_SettingsShow["ro"] = "Show Settings";
  text_SettingsShow["ru"] = "Show Settings";
  text_SettingsShow["sk"] = "Show Settings";
  text_SettingsShow["se"] = "Show Settings";
  text_SettingsShow["tw"] = "Show Settings";
  text_SettingsShow["us"] = "Show Settings";
  
  var text_einstellungen = new Object();
  text_einstellungen["de"] = "<center><b><u><font size='5'>Sidebar Einstellungen</font></u></b></center><br><br><b><u>Positionseinstellungen:</u></b><br><br><div id='Position3'><a href='#'>Header</a></div><br><div id='Position5'><a href='#'>Linkes Menü</a></div><br><div id='Position7'><a href='#'>Hauptteil</a></div><br><div id='PositionDel'><a href='#'>Positionseinstellung löschen</a></div><br><br><b><u>Versioncheck:</u></b><br><iframe src='http://userscripts.org/scripts/source/44734.meta.js' width='500' height='300' ></iframe><br>Wenn die angezeigte Version größer ist als die installierte ("+general["version"]+"), dann sollten sie <a href='http://userscripts.org/scripts/show/44734'>hier</a> updaten.<br><br><br><center><a href='javascript:location.reload();'>zurück</a></center>";
  text_einstellungen["cz"] = "<center><b><u><font size='5'>Sidebar Settings</font></u></b></center><br><br><b><u>Position Settings:</u></b><br><br><div id='Position3'><a href='#'>Header</a></div><br><div id='Position5'><a href='#'>Left Menu</a></div><br><div id='Position7'><a href='#'>Main</a></div><br><div id='PositionDel'><a href='#'>Delete Position Settings</a></div><br><br><b><u>Versioncheck:</u></b><br><iframe src='http://userscripts.org/scripts/source/44734.meta.js' width='500' height='300' ></iframe><br>Wenn die angezeigte Version größer ist als die installierte ("+general["version"]+"), dann sollten sie <a href='http://userscripts.org/scripts/show/44734'>hier</a> updaten.<br><br><br><center><a href='javascript:location.reload();'>back</a></center>";
  text_einstellungen["dk"] = "<center><b><u><font size='5'>Sidebar Settings</font></u></b></center><br><br><b><u>Position Settings:</u></b><br><br><div id='Position3'><a href='#'>Header</a></div><br><div id='Position5'><a href='#'>Left Menu</a></div><br><div id='Position7'><a href='#'>Main</a></div><br><div id='PositionDel'><a href='#'>Delete Position Settings</a></div><br><br><b><u>Versioncheck:</u></b><br><iframe src='http://userscripts.org/scripts/source/44734.meta.js' width='500' height='300' ></iframe><br>Wenn die angezeigte Version größer ist als die installierte ("+general["version"]+"), dann sollten sie <a href='http://userscripts.org/scripts/show/44734'>hier</a> updaten.<br><br><br><center><a href='javascript:location.reload();'>back</a></center>";
  text_einstellungen["org"] = "<center><b><u><font size='5'>Sidebar Settings</font></u></b></center><br><br><b><u>Position Settings:</u></b><br><br><div id='Position3'><a href='#'>Header</a></div><br><div id='Position5'><a href='#'>Left Menu</a></div><br><div id='Position7'><a href='#'>Main</a></div><br><div id='PositionDel'><a href='#'>Delete Position Settings</a></div><br><br><b><u>Versioncheck:</u></b><br><iframe src='http://userscripts.org/scripts/source/44734.meta.js' width='500' height='300' ></iframe><br>Wenn die angezeigte Version größer ist als die installierte ("+general["version"]+"), dann sollten sie <a href='http://userscripts.org/scripts/show/44734'>hier</a> updaten.<br><br><br><center><a href='javascript:location.reload();'>back</a></center>";
  text_einstellungen["fi"] = "<center><b><u><font size='5'>Sidebar Settings</font></u></b></center><br><br><b><u>Position Settings:</u></b><br><br><div id='Position3'><a href='#'>Header</a></div><br><div id='Position5'><a href='#'>Left Menu</a></div><br><div id='Position7'><a href='#'>Main</a></div><br><div id='PositionDel'><a href='#'>Delete Position Settings</a></div><br><br><b><u>Versioncheck:</u></b><br><iframe src='http://userscripts.org/scripts/source/44734.meta.js' width='500' height='300' ></iframe><br>Wenn die angezeigte Version größer ist als die installierte ("+general["version"]+"), dann sollten sie <a href='http://userscripts.org/scripts/show/44734'>hier</a> updaten.<br><br><br><center><a href='javascript:location.reload();'>back</a></center>";
  text_einstellungen["fr"] = "<center><b><u><font size='5'>Sidebar Settings</font></u></b></center><br><br><b><u>Position Settings:</u></b><br><br><div id='Position3'><a href='#'>Header</a></div><br><div id='Position5'><a href='#'>Left Menu</a></div><br><div id='Position7'><a href='#'>Main</a></div><br><div id='PositionDel'><a href='#'>Delete Position Settings</a></div><br><br><b><u>Versioncheck:</u></b><br><iframe src='http://userscripts.org/scripts/source/44734.meta.js' width='500' height='300' ></iframe><br>Wenn die angezeigte Version größer ist als die installierte ("+general["version"]+"), dann sollten sie <a href='http://userscripts.org/scripts/show/44734'>hier</a> updaten.<br><br><br><center><a href='javascript:location.reload();'>back</a></center>";
  text_einstellungen["gr"] = "<center><b><u><font size='5'>Sidebar Settings</font></u></b></center><br><br><b><u>Position Settings:</u></b><br><br><div id='Position3'><a href='#'>Header</a></div><br><div id='Position5'><a href='#'>Left Menu</a></div><br><div id='Position7'><a href='#'>Main</a></div><br><div id='PositionDel'><a href='#'>Delete Position Settings</a></div><br><br><b><u>Versioncheck:</u></b><br><iframe src='http://userscripts.org/scripts/source/44734.meta.js' width='500' height='300' ></iframe><br>Wenn die angezeigte Version größer ist als die installierte ("+general["version"]+"), dann sollten sie <a href='http://userscripts.org/scripts/show/44734'>hier</a> updaten.<br><br><br><center><a href='javascript:location.reload();'>back</a></center>";
  text_einstellungen["hu"] = "<center><b><u><font size='5'>Sidebar Settings</font></u></b></center><br><br><b><u>Position Settings:</u></b><br><br><div id='Position3'><a href='#'>Header</a></div><br><div id='Position5'><a href='#'>Left Menu</a></div><br><div id='Position7'><a href='#'>Main</a></div><br><div id='PositionDel'><a href='#'>Delete Position Settings</a></div><br><br><b><u>Versioncheck:</u></b><br><iframe src='http://userscripts.org/scripts/source/44734.meta.js' width='500' height='300' ></iframe><br>Wenn die angezeigte Version größer ist als die installierte ("+general["version"]+"), dann sollten sie <a href='http://userscripts.org/scripts/show/44734'>hier</a> updaten.<br><br><br><center><a href='javascript:location.reload();'>back</a></center>";
  text_einstellungen["it"] = "<center><b><u><font size='5'>Sidebar Settings</font></u></b></center><br><br><b><u>Position Settings:</u></b><br><br><div id='Position3'><a href='#'>Header</a></div><br><div id='Position5'><a href='#'>Left Menu</a></div><br><div id='Position7'><a href='#'>Main</a></div><br><div id='PositionDel'><a href='#'>Delete Position Settings</a></div><br><br><b><u>Versioncheck:</u></b><br><iframe src='http://userscripts.org/scripts/source/44734.meta.js' width='500' height='300' ></iframe><br>Wenn die angezeigte Version größer ist als die installierte ("+general["version"]+"), dann sollten sie <a href='http://userscripts.org/scripts/show/44734'>hier</a> updaten.<br><br><br><center><a href='javascript:location.reload();'>back</a></center>";
  text_einstellungen["jp"] = "<center><b><u><font size='5'>Sidebar Settings</font></u></b></center><br><br><b><u>Position Settings:</u></b><br><br><div id='Position3'><a href='#'>Header</a></div><br><div id='Position5'><a href='#'>Left Menu</a></div><br><div id='Position7'><a href='#'>Main</a></div><br><div id='PositionDel'><a href='#'>Delete Position Settings</a></div><br><br><b><u>Versioncheck:</u></b><br><iframe src='http://userscripts.org/scripts/source/44734.meta.js' width='500' height='300' ></iframe><br>Wenn die angezeigte Version größer ist als die installierte ("+general["version"]+"), dann sollten sie <a href='http://userscripts.org/scripts/show/44734'>hier</a> updaten.<br><br><br><center><a href='javascript:location.reload();'>back</a></center>";
  text_einstellungen["lt"] = "<center><b><u><font size='5'>Sidebar Settings</font></u></b></center><br><br><b><u>Position Settings:</u></b><br><br><div id='Position3'><a href='#'>Header</a></div><br><div id='Position5'><a href='#'>Left Menu</a></div><br><div id='Position7'><a href='#'>Main</a></div><br><div id='PositionDel'><a href='#'>Delete Position Settings</a></div><br><br><b><u>Versioncheck:</u></b><br><iframe src='http://userscripts.org/scripts/source/44734.meta.js' width='500' height='300' ></iframe><br>Wenn die angezeigte Version größer ist als die installierte ("+general["version"]+"), dann sollten sie <a href='http://userscripts.org/scripts/show/44734'>hier</a> updaten.<br><br><br><center><a href='javascript:location.reload();'>back</a></center>";
  text_einstellungen["lv"] = "<center><b><u><font size='5'>Sidebar Settings</font></u></b></center><br><br><b><u>Position Settings:</u></b><br><br><div id='Position3'><a href='#'>Header</a></div><br><div id='Position5'><a href='#'>Left Menu</a></div><br><div id='Position7'><a href='#'>Main</a></div><br><div id='PositionDel'><a href='#'>Delete Position Settings</a></div><br><br><b><u>Versioncheck:</u></b><br><iframe src='http://userscripts.org/scripts/source/44734.meta.js' width='500' height='300' ></iframe><br>Wenn die angezeigte Version größer ist als die installierte ("+general["version"]+"), dann sollten sie <a href='http://userscripts.org/scripts/show/44734'>hier</a> updaten.<br><br><br><center><a href='javascript:location.reload();'>back</a></center>";
  text_einstellungen["nl"] = "<center><b><u><font size='5'>Sidebar Settings</font></u></b></center><br><br><b><u>Position Settings:</u></b><br><br><div id='Position3'><a href='#'>Header</a></div><br><div id='Position5'><a href='#'>Left Menu</a></div><br><div id='Position7'><a href='#'>Main</a></div><br><div id='PositionDel'><a href='#'>Delete Position Settings</a></div><br><br><b><u>Versioncheck:</u></b><br><iframe src='http://userscripts.org/scripts/source/44734.meta.js' width='500' height='300' ></iframe><br>Wenn die angezeigte Version größer ist als die installierte ("+general["version"]+"), dann sollten sie <a href='http://userscripts.org/scripts/show/44734'>hier</a> updaten.<br><br><br><center><a href='javascript:location.reload();'>back</a></center>";
  text_einstellungen["no"] = "<center><b><u><font size='5'>Sidebar Settings</font></u></b></center><br><br><b><u>Position Settings:</u></b><br><br><div id='Position3'><a href='#'>Header</a></div><br><div id='Position5'><a href='#'>Left Menu</a></div><br><div id='Position7'><a href='#'>Main</a></div><br><div id='PositionDel'><a href='#'>Delete Position Settings</a></div><br><br><b><u>Versioncheck:</u></b><br><iframe src='http://userscripts.org/scripts/source/44734.meta.js' width='500' height='300' ></iframe><br>Wenn die angezeigte Version größer ist als die installierte ("+general["version"]+"), dann sollten sie <a href='http://userscripts.org/scripts/show/44734'>hier</a> updaten.<br><br><br><center><a href='javascript:location.reload();'>back</a></center>";
  text_einstellungen["pl"] = "<center><b><u><font size='5'>Sidebar Settings</font></u></b></center><br><br><b><u>Position Settings:</u></b><br><br><div id='Position3'><a href='#'>Header</a></div><br><div id='Position5'><a href='#'>Left Menu</a></div><br><div id='Position7'><a href='#'>Main</a></div><br><div id='PositionDel'><a href='#'>Delete Position Settings</a></div><br><br><b><u>Versioncheck:</u></b><br><iframe src='http://userscripts.org/scripts/source/44734.meta.js' width='500' height='300' ></iframe><br>Wenn die angezeigte Version größer ist als die installierte ("+general["version"]+"), dann sollten sie <a href='http://userscripts.org/scripts/show/44734'>hier</a> updaten.<br><br><br><center><a href='javascript:location.reload();'>back</a></center>";
  text_einstellungen["ro"] = "<center><b><u><font size='5'>Sidebar Settings</font></u></b></center><br><br><b><u>Position Settings:</u></b><br><br><div id='Position3'><a href='#'>Header</a></div><br><div id='Position5'><a href='#'>Left Menu</a></div><br><div id='Position7'><a href='#'>Main</a></div><br><div id='PositionDel'><a href='#'>Delete Position Settings</a></div><br><br><b><u>Versioncheck:</u></b><br><iframe src='http://userscripts.org/scripts/source/44734.meta.js' width='500' height='300' ></iframe><br>Wenn die angezeigte Version größer ist als die installierte ("+general["version"]+"), dann sollten sie <a href='http://userscripts.org/scripts/show/44734'>hier</a> updaten.<br><br><br><center><a href='javascript:location.reload();'>back</a></center>";
  text_einstellungen["ru"] = "<center><b><u><font size='5'>Sidebar Settings</font></u></b></center><br><br><b><u>Position Settings:</u></b><br><br><div id='Position3'><a href='#'>Header</a></div><br><div id='Position5'><a href='#'>Left Menu</a></div><br><div id='Position7'><a href='#'>Main</a></div><br><div id='PositionDel'><a href='#'>Delete Position Settings</a></div><br><br><b><u>Versioncheck:</u></b><br><iframe src='http://userscripts.org/scripts/source/44734.meta.js' width='500' height='300' ></iframe><br>Wenn die angezeigte Version größer ist als die installierte ("+general["version"]+"), dann sollten sie <a href='http://userscripts.org/scripts/show/44734'>hier</a> updaten.<br><br><br><center><a href='javascript:location.reload();'>back</a></center>";
  text_einstellungen["sk"] = "<center><b><u><font size='5'>Sidebar Settings</font></u></b></center><br><br><b><u>Position Settings:</u></b><br><br><div id='Position3'><a href='#'>Header</a></div><br><div id='Position5'><a href='#'>Left Menu</a></div><br><div id='Position7'><a href='#'>Main</a></div><br><div id='PositionDel'><a href='#'>Delete Position Settings</a></div><br><br><b><u>Versioncheck:</u></b><br><iframe src='http://userscripts.org/scripts/source/44734.meta.js' width='500' height='300' ></iframe><br>Wenn die angezeigte Version größer ist als die installierte ("+general["version"]+"), dann sollten sie <a href='http://userscripts.org/scripts/show/44734'>hier</a> updaten.<br><br><br><center><a href='javascript:location.reload();'>back</a></center>";
  text_einstellungen["se"] = "<center><b><u><font size='5'>Sidebar Settings</font></u></b></center><br><br><b><u>Position Settings:</u></b><br><br><div id='Position3'><a href='#'>Header</a></div><br><div id='Position5'><a href='#'>Left Menu</a></div><br><div id='Position7'><a href='#'>Main</a></div><br><div id='PositionDel'><a href='#'>Delete Position Settings</a></div><br><br><b><u>Versioncheck:</u></b><br><iframe src='http://userscripts.org/scripts/source/44734.meta.js' width='500' height='300' ></iframe><br>Wenn die angezeigte Version größer ist als die installierte ("+general["version"]+"), dann sollten sie <a href='http://userscripts.org/scripts/show/44734'>hier</a> updaten.<br><br><br><center><a href='javascript:location.reload();'>back</a></center>";
  text_einstellungen["tw"] = "<center><b><u><font size='5'>Sidebar Settings</font></u></b></center><br><br><b><u>Position Settings:</u></b><br><br><div id='Position3'><a href='#'>Header</a></div><br><div id='Position5'><a href='#'>Left Menu</a></div><br><div id='Position7'><a href='#'>Main</a></div><br><div id='PositionDel'><a href='#'>Delete Position Settings</a></div><br><br><b><u>Versioncheck:</u></b><br><iframe src='http://userscripts.org/scripts/source/44734.meta.js' width='500' height='300' ></iframe><br>Wenn die angezeigte Version größer ist als die installierte ("+general["version"]+"), dann sollten sie <a href='http://userscripts.org/scripts/show/44734'>hier</a> updaten.<br><br><br><center><a href='javascript:location.reload();'>back</a></center>";
  text_einstellungen["us"] = "<center><b><u><font size='5'>Sidebar Settings</font></u></b></center><br><br><b><u>Position Settings:</u></b><br><br><div id='Position3'><a href='#'>Header</a></div><br><div id='Position5'><a href='#'>Left Menu</a></div><br><div id='Position7'><a href='#'>Main</a></div><br><div id='PositionDel'><a href='#'>Delete Position Settings</a></div><br><br><b><u>Versioncheck:</u></b><br><iframe src='http://userscripts.org/scripts/source/44734.meta.js' width='500' height='300' ></iframe><br>Wenn die angezeigte Version größer ist als die installierte ("+general["version"]+"), dann sollten sie <a href='http://userscripts.org/scripts/show/44734'>hier</a> updaten.<br><br><br><center><a href='javascript:location.reload();'>back</a></center>";
  
  var text_SettingsTablePosition = new Object();
  text_SettingsTablePosition["de"] = "Bitte Positionswunsch der Sidebar eingeben (3 = Header | 5 = Menü | 7 = Hauptteil): ";
  text_SettingsTablePosition["cz"] = "Please type in the positioning of the Sidebar that you wish (3 = Header | 5 = Left Menu | 7 = Main)";
  text_SettingsTablePosition["dk"] = "Please type in the positioning of the Sidebar that you wish (3 = Header | 5 = Left Menu | 7 = Main)";
  text_SettingsTablePosition["org"] = "Please type in the positioning of the Sidebar that you wish (3 = Header | 5 = Left Menu | 7 = Main)";
  text_SettingsTablePosition["fi"] = "Please type in the positioning of the Sidebar that you wish (3 = Header | 5 = Left Menu | 7 = Main)";
  text_SettingsTablePosition["fr"] = "Please type in the positioning of the Sidebar that you wish (3 = Header | 5 = Left Menu | 7 = Main)";
  text_SettingsTablePosition["gr"] = "Please type in the positioning of the Sidebar that you wish (3 = Header | 5 = Left Menu | 7 = Main)";
  text_SettingsTablePosition["hu"] = "Please type in the positioning of the Sidebar that you wish (3 = Header | 5 = Left Menu | 7 = Main)";
  text_SettingsTablePosition["it"] = "Please type in the positioning of the Sidebar that you wish (3 = Header | 5 = Left Menu | 7 = Main)";
  text_SettingsTablePosition["jp"] = "Please type in the positioning of the Sidebar that you wish (3 = Header | 5 = Left Menu | 7 = Main)";
  text_SettingsTablePosition["lt"] = "Please type in the positioning of the Sidebar that you wish (3 = Header | 5 = Left Menu | 7 = Main)";
  text_SettingsTablePosition["lv"] = "Please type in the positioning of the Sidebar that you wish (3 = Header | 5 = Left Menu | 7 = Main)";
  text_SettingsTablePosition["nl"] = "Please type in the positioning of the Sidebar that you wish (3 = Header | 5 = Left Menu | 7 = Main)";
  text_SettingsTablePosition["no"] = "Please type in the positioning of the Sidebar that you wish (3 = Header | 5 = Left Menu | 7 = Main)";
  text_SettingsTablePosition["pl"] = "Please type in the positioning of the Sidebar that you wish (3 = Header | 5 = Left Menu | 7 = Main)";
  text_SettingsTablePosition["ro"] = "Please type in the positioning of the Sidebar that you wish (3 = Header | 5 = Left Menu | 7 = Main)";
  text_SettingsTablePosition["ru"] = "Please type in the positioning of the Sidebar that you wish (3 = Header | 5 = Left Menu | 7 = Main)";
  text_SettingsTablePosition["sk"] = "Please type in the positioning of the Sidebar that you wish (3 = Header | 5 = Left Menu | 7 = Main)";
  text_SettingsTablePosition["se"] = "Please type in the positioning of the Sidebar that you wish (3 = Header | 5 = Left Menu | 7 = Main)";
  text_SettingsTablePosition["tw"] = "Please type in the positioning of the Sidebar that you wish (3 = Header | 5 = Left Menu | 7 = Main)";
  text_SettingsTablePosition["us"] = "Please type in the positioning of the Sidebar that you wish (3 = Header | 5 = Left Menu | 7 = Main)";
  
  //______Language_Names______
  var rec_met = new Object();
  rec_met["de"] = "Metall";
  rec_met["cz"] = "Metal";
  rec_met["dk"] = "Metal";
  rec_met["org"] = "Metal"
  rec_met["fi"] = "Metal";
  rec_met["fr"] = "Metal";
  rec_met["gr"] = "Metal";
  rec_met["hu"] = "Metal";
  rec_met["it"] = "Metal";
  rec_met["jp"] = "Metal";
  rec_met["lt"] = "Metal";
  rec_met["lv"] = "Metal";
  rec_met["nl"] = "Metal";
  rec_met["no"] = "Metal";
  rec_met["pl"] = "Metal";
  rec_met["ro"] = "Metal";
  rec_met["ru"] = "Metal";
  rec_met["sk"] = "Metal";
  rec_met["se"] = "Metal";
  rec_met["tw"] = "Metal";
  rec_met["us"] = "Metal";
  
  var rec_kris = new Object();
  rec_kris["de"] = "Kristall";
  rec_kris["cz"] = "Crystyal";
  rec_kris["dk"] = "Crystyal";
  rec_kris["org"] = "Crystal";
  rec_kris["fi"] = "Crystyal";
  rec_kris["fr"] = "Crystyal";
  rec_kris["gr"] = "Crystyal";
  rec_kris["hu"] = "Crystyal";
  rec_kris["it"] = "Crystyal";
  rec_kris["jp"] = "Crystyal";
  rec_kris["lt"] = "Crystyal";
  rec_kris["lv"] = "Crystyal";
  rec_kris["nl"] = "Crystyal";
  rec_kris["no"] = "Crystyal";
  rec_kris["pl"] = "Crystyal";
  rec_kris["ro"] = "Crystyal";
  rec_kris["ru"] = "Crystyal";
  rec_kris["sk"] = "Crystyal";
  rec_kris["se"] = "Crystyal";
  rec_kris["tw"] = "Crystyal";
  rec_kris["us"] = "Crystyal";
  
  var rec_deut = new Object();
  rec_deut["de"] = "Deuterium";
  rec_deut["cz"] = "Deuterium";
  rec_deut["dk"] = "Deuterium";
  rec_deut["org"] = "Deuterium";
  rec_deut["fi"] = "Deuterium";
  rec_deut["fr"] = "Deuterium";
  rec_deut["gr"] = "Deuterium";
  rec_deut["hu"] = "Deuterium";
  rec_deut["it"] = "Deuterium";
  rec_deut["jp"] = "Deuterium";
  rec_deut["lt"] = "Deuterium";
  rec_deut["lv"] = "Deuterium";
  rec_deut["nl"] = "Deuterium";
  rec_deut["no"] = "Deuterium";
  rec_deut["pl"] = "Deuterium";
  rec_deut["ro"] = "Deuterium";
  rec_deut["ru"] = "Deuterium";
  rec_deut["sk"] = "Deuterium";
  rec_deut["se"] = "Deuterium";
  rec_deut["tw"] = "Deuterium";
  rec_deut["us"] = "Deuterium";
  
  var forschung = new Object();
  forschung["de"] = "Forschung";
  forschung["cz"] = "Forschung";
  forschung["dk"] = "Forschung";
  forschung["org"] = "Forschung";
  forschung["fi"] = "Forschung";
  forschung["fr"] = "Forschung";
  forschung["gr"] = "Forschung";
  forschung["hu"] = "Forschung";
  forschung["it"] = "Forschung";
  forschung["jp"] = "Forschung";
  forschung["lt"] = "Forschung";
  forschung["lv"] = "Forschung";
  forschung["nl"] = "Forschung";
  forschung["no"] = "Forschung";
  forschung["pl"] = "Forschung";
  forschung["ro"] = "Forschung";
  forschung["ru"] = "Forschung";
  forschung["sk"] = "Forschung";
  forschung["se"] = "Forschung";
  forschung["tw"] = "Forschung";
  forschung["us"] = "Forschung";
  
  var flotte = new Object();
  flotte["de"] = "Flotte";
  flotte["cz"] = "Flotte";
  flotte["dk"] = "Flotte";
  flotte["org"] = "Flotte";
  flotte["fi"] = "Flotte";
  flotte["fr"] = "Flotte";
  flotte["gr"] = "Flotte";
  flotte["hu"] = "Flotte";
  flotte["it"] = "Flotte";
  flotte["jp"] = "Flotte";
  flotte["lt"] = "Flotte";
  flotte["lv"] = "Flotte";
  flotte["nl"] = "Flotte";
  flotte["no"] = "Flotte";
  flotte["pl"] = "Flotte";
  flotte["ro"] = "Flotte";
  flotte["ru"] = "Flotte";
  flotte["sk"] = "Flotte";
  flotte["se"] = "Flotte";
  flotte["tw"] = "Flotte";
  flotte["us"] = "Flotte";
  
  var verteidigung = new Object();
  verteidigung["de"] = "Verteidigung";
  verteidigung["cz"] = "Verteidigung";
  verteidigung["dk"] = "Verteidigung";
  verteidigung["org"] = "Verteidigung";
  verteidigung["fi"] = "Verteidigung";
  verteidigung["fr"] = "Verteidigung";
  verteidigung["gr"] = "Verteidigung";
  verteidigung["hu"] = "Verteidigung";
  verteidigung["it"] = "Verteidigung";
  verteidigung["jp"] = "Verteidigung";
  verteidigung["lt"] = "Verteidigung";
  verteidigung["lv"] = "Verteidigung";
  verteidigung["nl"] = "Verteidigung";
  verteidigung["no"] = "Verteidigung";
  verteidigung["pl"] = "Verteidigung";
  verteidigung["ro"] = "Verteidigung";
  verteidigung["ru"] = "Verteidigung";
  verteidigung["sk"] = "Verteidigung";
  verteidigung["se"] = "Verteidigung";
  verteidigung["tw"] = "Verteidigung";
  verteidigung["us"] = "Verteidigung";
  

  //______Menu_Initializing______
  function MenuInitialing(){
    var table = document.getElementsByTagName('table')[5];
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    var row = table.insertRow(-1);
    var cell = row.insertCell(-1);
    cell.innerHTML = "<div id='MainShow' align='center'><a href='#'>"+text_MainShow[general["language"]]+"</a></div>";
    var h = document.getElementById('MainShow').addEventListener('click',function(){MainShow_();},false);
  }
  function ShowHide(S1s,S2s,S3s){
    document.getElementById(S1).style.display=S1s;
    document.getElementById(S2).style.display=S2s;
    document.getElementByID(H1).style.display=S3s;
  }
  function MainShow_(){
    GM_setValue('main__',true);
    var div = document.getElementById('MainShow').style.display="none";
    var table = document.getElementsByTagName('table')[tableposition];
    if(showvariable_["lcombox"]){
      documente["combox"].style.display="none";
    }
    if(showvariable_["leftmenu"]){
      documente["leftmenu"].style.display="none";
    }
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    table.deleteRow(-1);
    var row = table.insertRow(-1);
    var cell = row.insertCell(-1);
    cell.innerHTML = "<div id='MainHideHead' align='center'><b><u>Sidebar</u></b><br>by Blake_MaX</div><br><div id='MainHide' align='center'><a href='#'>"+text_MainHide[general["language"]]+"</a></div><br><div id='SettingsShow' align='center'><a href='#'>"+text_SettingsShow[general["language"]]+"</a></div><br><div id='LinksShow' align='center'><a href='#'>"+text_LinksShow[general["language"]]+"</a></div><div id='LinksHide' align='center'><a href='#'>"+text_LinksHide[general["language"]]+"</a></div>"+text_LinksContent[general["language"]]+"<br><div id='NotizenShow' align='center'><a href='#'>Notizen</a></div><br><div id='GebaeudeShow' align='center'><a href='#'>"+text_GebaeudeShow[general["language"]]+"</a></div><div id='GebaeudeHide' align='center'><a href='#'>"+text_GebaeudeHide[general["language"]]+"</a></div>"+text_GebaeudeContent[general["language"]]+"<br><div id='ForschungShow' align='center'><a href='#'>"+text_ForschungShow[general["language"]]+"</a></div><div id='ForschungHide' align='center'><a href='#'>"+text_ForschungHide[general["language"]]+"</a></div>"+text_ForschungContent[general["language"]]+"<br><div id='SchiffwerftShow' align='center'><a href='#'>"+text_SchiffwerftShow[general["language"]]+"</a></div><div id='SchiffwerftHide' align='center'><a href='#'>"+text_SchiffwerftHide[general["language"]]+"</a></div>"+text_SchiffwerftContent[general["language"]]+"<br><div id='VerteidigungShow' align='center'><a href='#'>"+text_VerteidigungShow[general["language"]]+"</a></div><div id='VerteidigungHide' align='center'><a href='#'>"+text_VerteidigungHide[general["language"]]+"</a></div>"+text_VerteidigungContent[general["language"]]+"<br><div id='AutoWorker' align='center'><b><a href='#'>AutoWorker</a></b><div id='AutoWorkerAktivShow' align='center'><b><font color='green'>On</font></div>&nbsp;<div id='AutoWorkerNonAktivShow' align='center'><font color='red'>Off</font></b></div></div>";
    if(!GM_getValue('gebaeude__')){
      document.getElementById('GebaeudeHide').style.display="none";
      document.getElementById('GebaeudeContent').style.display="none";
    }
    if(!GM_getValue('forschung__')){
      document.getElementById('ForschungHide').style.display="none";
      document.getElementById('ForschungContent').style.display="none";
    }
    if(!GM_getValue('schiffwerft__')){
      document.getElementById('SchiffwerftHide').style.display="none";
      document.getElementById('SchiffwerftContent').style.display="none";
    }
    if(!GM_getValue('verteidigung__')){
      document.getElementById('VerteidigungHide').style.display="none";
      document.getElementById('VerteidigungContent').style.display="none";
    }
    if(!GM_getValue('links__')){
      document.getElementById('LinksHide').style.display="none";
      document.getElementById('LinksContent').style.display="none";
    }
    if(!GM_getValue('autoausbau')){
      document.getElementById('AutoWorkerAktivShow').style.display="none";
    }
    if(GM_getValue('autoausbau')){
      document.getElementById('AutoWorkerNonAktivShow').style.display="none";
    }
    var h;
    h = document.getElementById('MainHide').addEventListener('click',function(){MainHide_();},false);
    h = document.getElementById('GebaeudeShow').addEventListener('click',function(){GebaeudeShow_();},false);
    h = document.getElementById('GebaeudeHide').addEventListener('click',function(){GebaeudeHide_();},false);
    h = document.getElementById('ForschungShow').addEventListener('click',function(){ForschungShow_();},false);
    h = document.getElementById('ForschungHide').addEventListener('click',function(){ForschungHide_();},false);
    h = document.getElementById('SchiffwerftShow').addEventListener('click',function(){SchiffwerftShow_();},false);
    h = document.getElementById('SchiffwerftHide').addEventListener('click',function(){SchiffwerftHide_();},false);
    h = document.getElementById('VerteidigungShow').addEventListener('click',function(){VerteidigungShow_();},false);
    h = document.getElementById('VerteidigungHide').addEventListener('click',function(){VerteidigungHide_();},false);
    h = document.getElementById('LinksShow').addEventListener('click',function(){LinksShow_();},false);
    h = document.getElementById('LinksHide').addEventListener('click',function(){LinksHide_();},false);
    h = document.getElementById('SettingsShow').addEventListener('click',function(){SettingsShow_(true,'0');},false);
    h = document.getElementById('AutoWorker').addEventListener('click',function(){AutoWorker('Keine Aufräge!');var buildingwindow = window.open(general["index"]+'page=b_building&session='+general["session"],'BUILDINGS','width=700,height=900');},false);
    h = document.getElementById('NotizenShow').addEventListener('click',function(){Notes();},false);
  }
  function MainHide_(){
    GM_setValue('main__',false);
    if(general["page"] == 'b_building'){
      window.location = general["index"]+"page=b_building&session="+general["session"];
    }
    if(general["page"] == 'resources'){
      window.location = general["index"]+"page=resources&session="+general["session"];
    }
    if(general["page"] == 'buildings'){
      if(general["mode"] == forschung[general["language"]]){
        window.location = general["index"]+"page=buildings&session="+general["session"]+"&mode="+forschung[general["language"]];
      } else if(general["mode"] == flotte[general["language"]]){
        window.location = general["index"]+"page=buildings&session="+general["session"]+"&mode="+flotte[general["language"]];
      } else if(general["mode"] == verteidigung[general["language"]]){
        window.location = general["index"]+"page=buildings&session="+general["session"]+"&mode="+verteidigung[general["language"]];
      }
    }
    if(general["page"] == 'overview'){
      location.reload();
    }
    else location.reload();
  }
  function GebaeudeShow_(){
    document.getElementById('GebaeudeShow').style.display="none";
    document.getElementById('GebaeudeHide').style.display="block";
    document.getElementById('GebaeudeContent').style.display="block";
    var gebaeude__ = true;
    GM_setValue('gebaeude__',gebaeude__);
    general["gebaeude__"] = GM_getValue('gebaeude__');
    general["forschung__"] = GM_getValue('forschung__');
    general["schiffwerft__"] = GM_getValue('schiffwerft__');
    general["verteidigung__"] = GM_getValue('verteidigung__');
    general["links__"] = GM_getValue('links__');
    if(general["forschung__"]){
      ForschungHide_();
    } else if(general["schiffwerft__"]){
      SchiffwerftHide_();
    } else if(general["verteidigung__"]){
      VerteidigungHide_();
    } else if(general["links__"]){
      LinksHide_();
    }
  }
  function GebaeudeHide_(){
    document.getElementById('GebaeudeShow').style.display="block";
    document.getElementById('GebaeudeHide').style.display="none";
    document.getElementById('GebaeudeContent').style.display="none";
    var gebaeude__ = false;
    GM_setValue('gebaeude__',gebaeude__);
  }
  function ForschungShow_(){
    document.getElementById('ForschungShow').style.display="none";
    document.getElementById('ForschungHide').style.display="block";
    document.getElementById('ForschungContent').style.display="block";
    var forschung__ = true;
    GM_setValue('forschung__',forschung__);
    general["gebaeude__"] = GM_getValue('gebaeude__');
    general["forschung__"] = GM_getValue('forschung__');
    general["schiffwerft__"] = GM_getValue('schiffwerft__');
    general["verteidigung__"] = GM_getValue('verteidigung__');
    general["links__"] = GM_getValue('links__');
    if(general["gebaeude__"]){
      GebaeudeHide_();
    } else if(general["schiffwerft__"]){
      SchiffwerftHide_();
    } else if(general["verteidigung__"]){
      VerteidigungHide_();
    } else if(general["links__"]){
      LinksHide_();
    }
  }
  function ForschungHide_(){
    document.getElementById('ForschungShow').style.display="block";
    document.getElementById('ForschungHide').style.display="none";
    document.getElementById('ForschungContent').style.display="none";
    var forschung__ = false;
    GM_setValue('forschung__',forschung__);
  }
  function SchiffwerftShow_(){
    document.getElementById('SchiffwerftShow').style.display="none";
    document.getElementById('SchiffwerftHide').style.display="block";
    document.getElementById('SchiffwerftContent').style.display="block";
    var schiffwerft__ = true;
    GM_setValue('schiffwerft__',schiffwerft__);
    general["gebaeude__"] = GM_getValue('gebaeude__');
    general["forschung__"] = GM_getValue('forschung__');
    general["schiffwerft__"] = GM_getValue('schiffwerft__');
    general["verteidigung__"] = GM_getValue('verteidigung__');
    general["links__"] = GM_getValue('links__');
    if(general["forschung__"]){
      ForschungHide_();
    } else if(general["gebaeude__"]){
      GebaeudeHide_();
    } else if(general["verteidigung__"]){
      VerteidigungHide_();
    } else if(general["links__"]){
      LinksHide_();
    }
  }
  function SchiffwerftHide_(){
    document.getElementById('SchiffwerftShow').style.display="block";
    document.getElementById('SchiffwerftHide').style.display="none";
    document.getElementById('SchiffwerftContent').style.display="none";
    var schiffwerft__ = false;
    GM_setValue('schiffwerft__',schiffwerft__);
  }
  function VerteidigungShow_(){
    document.getElementById('VerteidigungShow').style.display="none";
    document.getElementById('VerteidigungHide').style.display="block";
    document.getElementById('VerteidigungContent').style.display="block";
    var verteidigung__ = true;
    GM_setValue('verteidigung__',verteidigung__);
    general["gebaeude__"] = GM_getValue('gebaeude__');
    general["forschung__"] = GM_getValue('forschung__');
    general["schiffwerft__"] = GM_getValue('schiffwerft__');
    general["verteidigung__"] = GM_getValue('verteidigung__');
    general["links__"] = GM_getValue('links__');
    if(general["forschung__"]){
      ForschungHide_();
    } else if(general["schiffwerft__"]){
      SchiffwerftHide_();
    } else if(general["gebaeude__"]){
      GebaeudeHide_();
    } else if(general["links__"]){
      LinksHide_();
    }
  }
  function VerteidigungHide_(){
    document.getElementById('VerteidigungShow').style.display="block";
    document.getElementById('VerteidigungHide').style.display="none";
    document.getElementById('VerteidigungContent').style.display="none";
    var verteidigung__ = false;
    GM_setValue('verteidigung__',verteidigung__);
  }
  function LinksShow_(){
    document.getElementById('LinksShow').style.display="none";
    document.getElementById('LinksHide').style.display="block";
    document.getElementById('LinksContent').style.display="block";
    var links__ = true;
    GM_setValue('links__',links__);
    general["gebaeude__"] = GM_getValue('gebaeude__');
    general["forschung__"] = GM_getValue('forschung__');
    general["schiffwerft__"] = GM_getValue('schiffwerft__');
    general["verteidigung__"] = GM_getValue('verteidigung__');
    general["links__"] = GM_getValue('links__');
    if(general["forschung__"]){
      ForschungHide_();
    } else if(general["schiffwerft__"]){
      SchiffwerftHide_();
    } else if(general["verteidigung__"]){
      VerteidigungHide_();
    } else if(general["gebaeude__"]){
      GebaeudeHide_();
    }
  }
  function LinksHide_(){
    document.getElementById('LinksShow').style.display="block";
    document.getElementById('LinksHide').style.display="none";
    document.getElementById('LinksContent').style.display="none";
    var links__ = false;
    GM_setValue('links__',links__);
  }
  function Settings(a){
    if(a == 'tableposition'){
      var b =prompt(text_SettingsTablePosition[general["language"]]);
      return b;
    }
    if(a == 'tablepositiondel'){
      GM_setValue('tableposition','');
    }
    if(a == 'tableposition3'){
      GM_setValue('tableposition','3');
      location.reload();
    }
    if(a == 'tableposition5'){
      GM_setValue('tableposition','5');
      location.reload();
    }
    if(a == 'tableposition7'){
      GM_setValue('tableposition','7')
      location.reload();
    }
    if(a == 'autoausbau'){
      GM_setValue('autoausbau',false);
    }
    if(a == 'AutoWorkerAnzahl'){
      GM_setValue('AutoWorkerAnzahl',0);
    }
    if(a == 'AutoWorkerName'){
      GM_setValue('AutoWorkerName',0);
    }
    if(a == 'AutoWorkerTime'){
      GM_setValue('AutoWorkerTime',0);
    }
    if(a == 'AutoWorkerCounter1'){
      GM_setValue('AutoWorkerCounter1',0);
    }
    if(a == 'AutoWorkerCounter2'){
      GM_setValue('AutoWorkerCounter2',0);
    }
    if(a == 'AutoWorkerFinish'){
      GM_setValue('AutoWorkerFinish',0);
    }
  }
  function SettingsShow_(a,b){
    if(a){
      var set = GM_getValue('set');
      if(b == '0'){ var SettingsContent = 'Bitte auf der linken Seite auswählen!'; }
        var posi = GM_getValue('tableposition');
        if(posi == 3){ posi = 'Header'; }
        else if(posi == 5){ posi = 'Linkes Menu'; }
        else if(posi == 7){ posi = 'Hauptteil'; }
        var SettingsContent1 = "<div id='positionsetting'>Die aktuelle Position des Sidebar ist "+posi+"!<br>Um diese zu ändern, bitte auf die gewünschte Position klicken.<br><div id='3'><a href='#'>Header (nicht gut!)</a></div><div id='5'><a href='#'>Linkes Menü</a></div><div id='7'><a href='#'>Hauptteil</a></div></div>";
        var ausb = GM_getValue('autoausbau');
        if(!ausb){ ausb = 'nicht '; d = ''; }
        else if(ausb) { ausb = ''; d = 'de'; }
        var SettingsContent2 = "<div id='ausbausetting'>Der Autoausbau ist zur Zeit "+ausb+"aktiviert.<br>Um es zu "+d+"aktivieren klicke bitte auf <div id='aktautoausb'><a href='#'>"+d+"aktivieren</a></div></div>";
        var SettingsContent3 = 'Die IDs sind die Gebäude-Nummern bzw. Forschungs-Nummern.<br>Metallmine: 1<br>Kristallmine: 2<br>Deuteriumsyntheneriesierer: 3<br>Solarkraftwerk: 4<br>Fusionskraftwerk: 12<br>Roboterfabrik: 14<br>Nanitenfabrik: 15<br>Raumschiffwerft: 21<br>Metallspeicher: 23<br>Kristallspeicher: 24<br>Deuteriumtank:25<br>Forschungslabor: 31<br>Terraformer: 33<br>Allianzdepot: 34<br>Raketensilo: 44';
        var SettingsContent4 = 'Update-Funktion folgt bald!';
      var z = "<div id='Settings' style='position:relative; top:90px; left:200px; width:400px; height:400px; border:1 solid #804000; padding:10px;'><table width='700' height='500' border='2'><tr><td colspan='2' height='20'><center>Einstellungen</center></td></tr><tr><td width='100' height='20'><b><center>Menü</center></b></td><td><b><center>Content</center></b></td></tr><tr><td height='20'><div id='Setting1'><a href='#'>Positionseinstellungen</a></div></td><td rowspan='12'><div id='SettingsContent' valign='top'>"+SettingsContent+"</div></td></tr><tr><td height='20'><div id='Setting2'><a href='#'>Autoausbau Einstellungen</a></div></td></tr><tr><td height='20'><div id='Setting3'><a href='#'>ID Informationen</a></div></td></tr><tr><td height='20'><div id='Setting4'><a href='#'>Update Informationen</a></div></td></tr><tr><td></td></tr></table><center><div id='back'><a href='#'>zurück</a></div></center>";
      if(b == 0){
        /*document.getElementById('header_top').style.display="none";
        document.getElementById('leftmenu').style.display="none";
        document.getElementById('content').style.display="none";*/
      }
      var y = document.getElementsByTagName('body')[0].innerHTML += z;
      
      h = document.getElementById('Setting1').addEventListener('click',function(){document.getElementById('SettingsContent').innerHTML = SettingsContent1; set = 1; GM_setValue('set',set);SettingsHandlers();},false);
      h = document.getElementById('Setting2').addEventListener('click',function(){document.getElementById('SettingsContent').innerHTML = SettingsContent2; set = 2; GM_setValue('set',set);SettingsHandlers();},false);
      h = document.getElementById('Setting3').addEventListener('click',function(){document.getElementById('SettingsContent').innerHTML = SettingsContent3; set = 3; GM_setValue('set',set);SettingsHandlers();},false);
      h = document.getElementById('Setting4').addEventListener('click',function(){document.getElementById('SettingsContent').innerHTML = SettingsContent4; set = 4; GM_setValue('set',set);SettingsHandlers();},false);
      h = document.getElementById('back').addEventListener('click',function(){location.reload();},false);
      function SettingsHandlers(){
      try {
        if(set == 0){
          
        } else if(set == 1){
          h = document.getElementById('3').addEventListener('click',function(){GM_setValue('tableposition',3);},false);
          h = document.getElementById('5').addEventListener('click',function(){GM_setValue('tableposition',5);},false);
          h = document.getElementById('7').addEventListener('click',function(){GM_setValue('tableposition',7);},false);
        } else if(set == 2){
          if(GM_getValue('autoausbau') == true){
            h = document.getElementById('aktautoausb').addEventListener('click',function(){GM_setValue('autoausbau',false);},false);
          } else if(GM_getValue('autoausbau') == false){
            h = document.getElementById('aktautoausb').addEventListener('click',function(){GM_setValue('autoausbau',true);},false);
          }
        }
      }
      catch(err) {
        document.getElementById('errorbox').innerHTML += 'Error! '+err.discription;
      }
      }
    } else if(!a){
      
    }
  }
      Settings('AutoWorkerAnzahl');
      Settings('AutoWorkerTime');
      Settings('AutoWorkerFinish');
  function AutoWorker(content){
    window.setInterval(function(){var intervall = window.open(general["index"]+"page=overview&session="+general["session"],'INTERVALL','width=100,height=100');window.setTimeout(function(){intervall.close();},3000);},300000);
    document.getElementById('leftmenu').style.display="none";
    var autoausbau = GM_getValue('autoausbau');
    if(autoausbau){
      var AutoWorkerContent = content;
      h = document.getElementById('content');
      h.innerHTML = "<div id='AutoWorker' align='center'><table width='500'><tr><td colspan='2'><h3><center>AutoWorker (BETA)</center></h3></td></tr><tr><td>"+AutoWorkerContent+"</td><td rowspan='5'><div id='AutoWorkerAdd'><b>hinzufügen</b></div></td></table></div><br><div id='back' align='center'>Mit einem Klick auf 'zurück' werden alle Aufträge abgebrochen!<br><div id='back'><a href='#'>zurück</a></div></div><br><br>";
      h = document.getElementById('back').addEventListener('click',function(){GM_setValue('AutoWorkerTime',0);GM_setValue('AutoWorkerAnzahl',0);location.reload();},false);
      h = document.getElementById('AutoWorkerAdd').addEventListener('click',function(){AutoWorkerAdd(AutoWorkerContent);buildingwindow.close();},false);
    } else {
      h = document.getElementById('content');
      h.innerHTML = "<div id='AutoWorker' align='center'><h3>Deaktiviert</h3></div>"
    }
      function AutoWorkerAdd(){
        var na = prompt('Bitte Name eingeben:');
        var ze = prompt('Bitte Zeit eingeben:');
        ze = ze.split(':');
        var zh = parseInt(ze[0]); //eg 01
        var zm = parseInt(ze[1]); //eg 18
        var zs = parseInt(ze[2]); //eg 24
        var zhn = zh * 60 * 60;    //eg 360
        var zmn = zm * 60;         //eg 1080 //zs = 24
        GM_setValue('TMP_Time',zh+':'+zm+':'+zs);
        var zg = ( zhn + zmn + zs ) * 1000; //eg 1464000
        var zo = GM_getValue('AutoWorkerTime'); //eg 17000
        var zn = zg + zo; //eg 17000 + 1464000 = 1481000
        GM_setValue('AutoWorkerTime',zg);
        var gf = prompt('Bitte G|F eingeben:');
        var id = prompt('Bitte ID eingeben:');
        var nu = GM_getValue('AutoWorkerAnzahl');
        nu = nu + 1;
        GM_setValue('AutoWorkerAnzahl',nu);
        var date = new Date();
        AutoWorker(content+"<div id='Auftrag"+nu+"'>"+na+", "+date+" ("+GM_getValue('TMP_Time')+")</div>")
        window.setTimeout(function(){AutoWorkerOpen(zg,gf,id);},zn); //eg work in 1481000 mil.sec.
      }
      function AutoWorkerOpen(zg,gf,id){
        if(gf == 'G' || gf == 'g'){
          var ma = '&mode=add&techid';
          var pa = 'b_building';
        } else if(gf == 'F' || gf == 'f'){
          var ma = '&modus=Forschung&bau=';
          var pa = 'buildings';
        }
        var tm = window.open(general["index"]+"page="+pa+"&session="+general["session"]+ma+id,'TMP','width=10,height=10');
        window.setTimeout(function(){tm.close();},3000);
        var zo = GM_getValue('AutoWorkerTime');
        var zn = zo - zg;
        GM_setValue('AutoWorkerTime',zn);
        var fi = GM_getValue('AutoWorkerFinish');
        fi = fi + 1;
        GM_setValue('AutoWorkerFinish',fi);
        AutoWorkerFinish(fi);
      }
      function AutoWorkerFinish(fi){
        document.getElementById('Auftrag'+fi).innerHTML="FERTIG!";
      }
  }

  function Notes(){
    window.open(general["index"]+'page=notizen&session='+general["session"]+'&no_header=1','Notes',"width=600,height=400,status=no,scrollbars=no,resizable=no");
  }
  if(general["page"] == 'overview'){
    //documente["combox"].style.display="none";
  }
  var tableposition = GM_getValue('tableposition');
  if(!tableposition){
    var tablepositiongetter = Settings('tableposition');
    GM_setValue('tableposition',tablepositiongetter);
    location.reload();
  }
  MenuInitialing();
  document.getElementsByTagName('tbody')[3].style.display="none";
  var get;
  get = GM_getValue('main__');
  if(get){
    MainShow_();
  }
  get = GM_getValue('gebaeude__');
  if(get){
    GebaeudeShow_();
  } else {
    GebaeudeHide_();
  }
  get = GM_getValue('forschung__');
  if(get){
    ForschungShow_();
  } else {
    ForschungHide_();
  }
  get = GM_getValue('schiffwerft__');
  if(get){
    SchiffwerftShow_();
  } else {
    SchiffwerftHide_();
  }
  get = GM_getValue('verteidigung__');
  if(get){
    VerteidigungShow_();
  } else {
    VerteidigungHide_();
  }
  get = GM_getValue('links__');
  if(get){
    LinksShow_();
  } else {
    LinksHide_();
  }
  if(showvariabletable == false){
    FirstTimeSettings();
  }
  if(showvariable_["combox"] == false){
    FirstTimeSettings();
  }
  if(showvariable_["leftmenu"] == false){
    FirstTimeSettings();
  }
  if(!GM_getValue('autoausbau')){
    Settings('autoausbau');
  }
  if(!GM_getValue('AutoWorkerAnzahl')){
    Settings('AutoWorkerAnzahl');
  }
  if(!GM_getValue('AutoWorkerName')){
    Settings('AutoWorkerName');
  }
  if(!GM_getValue('AutoWorkerTime')){
    Settings('AutoWorkerTime');
  }
  if(!GM_getValue('AutoWorkerCounter1')){
    Settings('AutoWorkerCounter1');
  }
  if(!GM_getValue('AutoWorkerCounter2')){
    Settings('AutoWorkerCounter2');
  }
  if(!GM_getValue('AutoWorkerFinish')){
    Settings('AutoWorkerFinish');
  }
  if(general["page"] == 'overview'){
    document.getElementById('combox').style.display="none";
  }
  //alert(general["index"]);
  //alert(general["loc"]+"\n"+general["server"]+"\n"+general["session"]+"\n"+general["uni"]+"\n"+general["language"]);
})();