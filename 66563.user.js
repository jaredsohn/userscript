// ==UserScript==
// @name           Cutthroat Ikariam
// @namespace      http://s*.ikariam.*/*
// @description    Make your city look like a pirate cove!
// @include        http://s*.ikariam.*/*
// @exclude        http://s*.ikariam.*/skin/*
// @exclude        http://s*.ikariam.*/js/*
// @exclude        http://s*.ikariam.*/index.php?action=newPlayer
// ==/UserScript==

   var URL= "http://s918.photobucket.com/albums/ad25/The_XeroxNo1/cutthroat_ikariam/";

GM_addStyle("#header                                                           {background:url("+URL+"header.png) no-repeat; position: relative}");
GM_addStyle("#extraDiv1                                                        {background:url("+URL+"sky.jpg) repeat top left; position: absolute}");
GM_addStyle("#extraDiv2                                                        {background:url("+URL+"ocean.jpg) repeat top left; position: absolute}");
GM_addStyle("#cityNav .viewCity a                                              {background-image:url("+URL+"btn_city.jpg)}");
GM_addStyle("#cityNav .viewCity a.hover                                        {background-image:url("+URL+"btn_city.jpg) background-position: 0px -0px}");
GM_addStyle("#cityNav .viewCity a.down                                         {background-image:url("+URL+"btn_city.jpg) background-position: 0px -116px}");
GM_addStyle("#globalResources .gold a                                          {background-image:url("+URL+"btn_treasure.jpg)}");
GM_addStyle("#globalResources .gold a.hover                                    {background-image:url("+URL+"btn_treasure.jpg) background-position: 0px -34px}"); 
GM_addStyle("#globalResources .gold a.down                                     {background-image:url("+URL+"btn_treasure.jpg) background-position: 0px -68px}"); 
GM_addStyle("#globalResources .transporters a                                  {background-image:url("+URL+"btn_transports.jpg)}");
GM_addStyle("#globalResources .transporters a.hover                            {background-image:url("+URL+"btn_transports.jpg) background-position: 0px -53px}");
GM_addStyle("#globalResources .transporters a.down                             {background-image:url("+URL+"btn_transports.jpg) background-position: 0px -106px}");
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
GM_addStyle("#city #container #mainview #locations .forester .buildingimg     {background-image:url("+URL+"building_forester.gif)}");

GM_addStyle("#city #container #mainview #locations .transporter                 {background-image:url("+URL+"transporter.png)}");
GM_addStyle("#city #container #mainview #locations .beachboys                   {background-image:url("+URL+"invisible-1.gif)}");
GM_addStyle("#city #container #mainview.phase24 #locations .beachboys           {background-image:url("+URL+"invisible-1.gif)}");
GM_addStyle("#breadcrumbs                                                       {background:url("+URL+"bg_breadcrumbs.gif) no-repeat}");

GM_addStyle("#city #container .phase1                                           {background-image:url("+URL+"city.jpg)}");
GM_addStyle("#city #container .phase2                                           {background-image:url("+URL+"city.jpg)}");
GM_addStyle("#city #container .phase3                                           {background-image:url("+URL+"city.jpg)}");
GM_addStyle("#city #container .phase4                                           {background-image:url("+URL+"city.jpg)}");
GM_addStyle("#city #container .phase5                                           {background-image:url("+URL+"city.jpg)}");
GM_addStyle("#city #container .phase6                                           {background-image:url("+URL+"city.jpg)}");
GM_addStyle("#city #container .phase7                                           {background-image:url("+URL+"city.jpg)}");
GM_addStyle("#city #container .phase8                                           {background-image:url("+URL+"city.jpg)}");
GM_addStyle("#city #container .phase9                                           {background-image:url("+URL+"city.jpg)}");
GM_addStyle("#city #container .phase10                                          {background-image:url("+URL+"city.jpg)}");
GM_addStyle("#city #container .phase11                                          {background-image:url("+URL+"city.jpg)}");
GM_addStyle("#city #container .phase12                                          {background-image:url("+URL+"city.jpg)}");
GM_addStyle("#city #container .phase13                                          {background-image:url("+URL+"city.jpg)}");
GM_addStyle("#city #container .phase14                                          {background-image:url("+URL+"city.jpg)}");
GM_addStyle("#city #container .phase15                                          {background-image:url("+URL+"city.jpg)}");
GM_addStyle("#city #container .phase16                                          {background-image:url("+URL+"city.jpg)}");
GM_addStyle("#city #container .phase17                                          {background-image:url("+URL+"city.jpg)}");
GM_addStyle("#city #container .phase18                                          {background-image:url("+URL+"city.jpg)}");
GM_addStyle("#city #container .phase19                                          {background-image:url("+URL+"city.jpg)}");
GM_addStyle("#city #container .phase20                                          {background-image:url("+URL+"city.jpg)}");
GM_addStyle("#city #container .phase21                                          {background-image:url("+URL+"city.jpg)}");
GM_addStyle("#city #container .phase22                                          {background-image:url("+URL+"city.jpg)}");
GM_addStyle("#city #container .phase23                                          {background-image:url("+URL+"city.jpg)}");
GM_addStyle("#city #container .phase24                                          {background-image:url("+URL+"city.jpg)}");
GM_addStyle("#city #container .phase25                                          {background-image:url("+URL+"city.jpg)}");
GM_addStyle("#city #container .phase26                                          {background-image:url("+URL+"city.jpg)}");
GM_addStyle("#city #container .phase27                                          {background-image:url("+URL+"city.jpg)}");
GM_addStyle("#city #container .phase28                                          {background-image:url("+URL+"city.jpg)}");
GM_addStyle("#city #container .phase29                                          {background-image:url("+URL+"city.jpg)}");
GM_addStyle("#city #container .phase30                                          {background-image:url("+URL+"city.jpg)}");