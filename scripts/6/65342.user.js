// ==UserScript==
// @name           Pirate Ikariam
// @namespace      http://s*.ikariam.*/*
// @description    Vaše mesto izgleda kot piratska ladja.
// @include        http://s*.ikariam.*/*
// @exclude        http://s*.ikariam.*/skin/*
// @exclude        http://s*.ikariam.*/js/*
// @exclude        http://s*.ikariam.*/index.php?action=newPlayer
// ==/UserScript==

   var URL= "http://s188.photobucket.com/albums/z250/Hagnuf/cutthroat_ikariam/";

GM_addStyle("#city #container #mainview #locations .barracks .buildingimg       {background-image:url("+URL+"building_barracks2.gif)}");
GM_addStyle("#city #container #mainview #locations .alchemist .buildingimg      {background-image:url("+URL+"building_alchemist.gif)}");
GM_addStyle("#city #container #mainview #locations .academy .buildingimg        {background-image:url("+URL+"building_academy.gif)}");
GM_addStyle("#city #container #mainview #locations .branchOffice .buildingimg   {background-image:url("+URL+"building_branchOffice.gif)}");
GM_addStyle("#city #container #mainview #locations .architect .buildingimg      {background-image:url("+URL+"building_architect.gif)}");
GM_addStyle("#city #container #mainview #locations .carpentering .buildingimg   {background-image:url("+URL+"building_carpentering.gif)}");
GM_addStyle("#city #container #mainview #locations .embassy .buildingimg        {background-image:url("+URL+"building_embassy.gif)}");
GM_addStyle("#city #container #mainview #locations .fireworker .buildingimg     {background-image:url("+URL+"building_fireworker.gif)}");
GM_addStyle("#city #container #mainview #locations .glassblowing .buildingimg   {background-image:url("+URL+"building_glassblowing.gif)}");
GM_addStyle("#city #container #mainview #locations .museum .buildingimg         {background-image:url("+URL+"building_museum.gif)}");
GM_addStyle("#city #container #mainview #locations .optician .buildingimg       {background-image:url("+URL+"building_optician.gif)}");
GM_addStyle("#city #container #mainview #locations .palace .buildingimg         {background-image:url("+URL+"building_palace.gif)}");
GM_addStyle("#city #container #mainview #locations .palaceColony .buildingimg   {background-image:url("+URL+"building_palaceColony.gif)}");
GM_addStyle("#city #container #mainview #locations .tavern .buildingimg         {background-image:url("+URL+"building_tavern.gif)}");
GM_addStyle("#city #container #mainview #locations .wall .buildingimg           {background-image:url("+URL+"building_wall-1.gif)}");
GM_addStyle("#city #container #mainview #locations .stonemason .buildingimg     {background-image:url("+URL+"building_stonemason.gif)}");
GM_addStyle("#city #container #mainview #locations .vineyard .buildingimg       {background-image:url("+URL+"building_vineyard.gif)}");
GM_addStyle("#city #container #mainview #locations .townHall .buildingimg       {background-image:url("+URL+"building_townhall.gif)}");
GM_addStyle("#city #container #mainview #locations .port .buildingimg           {background-image:url("+URL+"building_port.gif)}");
GM_addStyle("#city #container #mainview #locations .safehouse .buildingimg      {background-image:url("+URL+"building_safehouse.gif)}");
GM_addStyle("#city #container #mainview #locations .shipyard .buildingimg       {background-image:url("+URL+"building_shipyard.gif)}");
GM_addStyle("#city #container #mainview #locations .warehouse .buildingimg      {background-image:url("+URL+"building_warehouse.gif)}");
GM_addStyle("#city #container #mainview #locations .workshop .buildingimg       {background-image:url("+URL+"building_workshop.gif)}");
GM_addStyle("#city #container #mainview #locations .winegrower .buildingimg     {background-image:url("+URL+"building_winegrower.gif)}");

GM_addStyle("#city #container #mainview #locations .transporter                 {background-image:url("+URL+"transporter.png)}");
GM_addStyle("#city #container #mainview #locations .beachboys                   {background-image:url("+URL+"invisible-1.gif)}");
GM_addStyle("#city #container #mainview.phase24 #locations .beachboys           {background-image:url("+URL+"invisible-1.gif)}");
GM_addStyle("#breadcrumbs                                                       {background:url("+URL+"bg_breadcrumbs.gif) no-repeat}");

