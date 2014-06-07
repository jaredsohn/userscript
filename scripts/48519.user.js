// ==UserScript==
// @name	Ally s tools Based on ika core script
// @version 	23
// @namespace   h2o	
// @author	h2o
// @description	Based on Ika-core.org utilities for Ikariam
// @include	http://s*.ikariam.*/*
// @require	http://www.ika-core.org/scripts/ika-core.js  
// ==/UserScript==
// ==========================================================================
// I did not create this script! I just edited some of the coding!
// All credits to the creators of Ika-core!

var version=23;
var scriptlocation="http://userscripts.org/scripts/show/48519.user.js";

Alliance	=	['Cyan','Green'];
Allies		=	['Blue','Blue'	];
Brothers	=	['Green','Green'];
NoAlliance	=	['Purple','Brown'];
Enemies		=	['Red','Red'];
Enemies1	=	['black','black'];

switch (location.host) {
	default:
		alliancefullnm='Tribu de Dana';
		alliancenm='TDD';		
		alliance=[['No alliance', NoAlliance],
			[alliancenm, Alliance],
                	['-TC-'		,Allies],					
                	['-vVv-'	,Allies],
			['SDT'		,Allies],
                	['GTD'		,Allies],
                	['۞RSX۞'	,Allies],
			['SEMFI'	,Enemies1],
			['AMZ'		,Enemies],
			['MDNM'	        ,Enemies],
			['Ahoum'	,Enemies],	
			['Tempo'	,Enemies],		
			['BWR'		,Enemies],					
			['-OTH-'	,Enemies],	
			['UNIK'		,Enemies],];



		//chaturl='';
		forumurl='http://leforumdelatribudedana.xooit.fr/index.php';
		//forumurlnew='';
		break;
}
main();
ToolsMenu();
sortAllies();
fixmessages();
fixtreaties();
showchat();
showgames();