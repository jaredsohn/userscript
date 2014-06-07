// ==UserScript==
// @name           Stepstone Plus
// @namespace      http://www.sebastian-lang.net/
// @description    Switch to https and close the annoying email notification window/tab automatically

// @include        http://www.stepstone.com/*
//
// @include        http://www.stepstone.at/*
// @include        http://www.stepstone.be/*
// @include        http://www.stepstone.de/*
// @include        http://www.stepstone.dk/*
// @include        http://www.stepstone.fr/*
// @include        http://www.stepstone.lu/*
// @include        http://www.stepstone.nl/*
// @include        http://www.stepstone.se/*

// @include        https://www.stepstone.at/*
// @include        https://www.stepstone.be/*
// @include        https://www.stepstone.de/*
// @include        https://www.stepstone.dk/*
// @include        https://www.stepstone.fr/*
// @include        https://www.stepstone.lu/*
// @include        https://www.stepstone.nl/*
// @include        https://www.stepstone.se/*

// @author         Sebastian-Lang.net
// @copyright      Creative Commons Attribution-ShareAlike 3.0 Unported (CC-BY-SA 3.0)
// @license        http://creativecommons.org/licenses/by-sa/3.0/
// @version        0.1.1
// @lastupdated    2012-06-19
// 
// @history        0.1.1 New locations, Switch to https
// @history        0.1.0 Initial release   
//
// ==/UserScript==
//-------------------------------------------------------------------------------------------------------------------

// Switch from http to https
 if (window.location.protocol == "http:") { 
	window.location.href = window.location.href.replace(/http:\/\//, "https://");					
 };

// Close notification window/tab
 var Titles = new Array(
	'Aktuelle Jobs zu Ihrer Suche'																, // at & de
	"Offres d'emploi intéressantes avec le Job Agent de StepStone"								, // be(fr)
	"Jobs per e−mail naar je inbox met de Job Agent van StepStone"								, // be(nl)
	'Jobtilbud pr. mail hver dag med en Jobagent fra StepStone'									, // dk
	"Des annonces par e−mail chaque jour avec l'Alerte Emploi StepStone"						, // fr
	'Vacatures per e−mail naar je inbox met de Job Agent van StepStone'							, // nl
	'Få relevanta jobberbjudanden direkt till din e−post varje dag med StepStones Jobbagent'	  // sk
 );
 var Headlines = new Array(
	'Kostenlos passende Jobs per E-Mail'			, // at & de
	'Recevez des jobs sur mesure par mail'			, // be(fr)
	'Krijg jobs die bij je passen in je mailbox'	, // be(nl)
	'Jobtilbud pr. mail hver dag med'				, // dk
	"Des annonces par e−mail"						, // fr
	'Vacatures per e−mail'							, // nl
	'Få relevanta jobberbjudanden'			 		  // sk
 );
 for (var i = 0; i < Titles.length; i++){
	if (document.title == Titles[i] && document.getElementsByTagName("body")[0].innerHTML.search(Headlines[i]) != -1){
		 this.close();
	};
 };
 
//-------------------------------------------------------------------------------------------------------------------
