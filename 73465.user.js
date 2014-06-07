// ==UserScript==
// @name				Plugs for IMDB [L3v3L]
// @author				L3v3L
// @version			20100414
// @namespace		http://www.google.com/profiles/myl3v3l
// @description		Adds automatic search buttons on imdb
// @include			http://www.imdb.com/title/*
// @include			www.imdb.com/title/*
// ==/UserScript==
(function() {
var med_type = document.evaluate("//meta[16]", document, null, 9, null).singleNodeValue.content;		//Store meta data of graph type

//---------------------------------------------------------------Movie unique commands---------------------------------------------------------------
if (med_type == "movie"){
	var title_qry = document.title;		//Get Text from document title
}

//---------------------------------------------------------------TV show unique commands---------------------------------------------------------------
if (med_type == "tv_show"){
	var title_qry = document.evaluate(".//h5[contains(.,'TV Series')]/following-sibling::div", document.body, null, 9, null).singleNodeValue.textContent;		//Get Tv show name
	var se_num = document.evaluate(".//h5[contains(.,'Original Air Date')]/following-sibling::div", document.body, null, 9, null).singleNodeValue.textContent;		//Get Air Date
	
	//---------------------------------------------------------------Parse Season number and Episode number---------------------------------------------------------------
	se_num = se_num.replace(/\s{2,}/g, " ").replace(/^ | $/g, "").replace(/, /g, " ").replace(/\)/g, "");		//Erase the return and commas and last barket
	se_num = se_num.replace(/[^].*?.\(/,"");		//Gets rid of text unwanted in beginning
	
	var splitse_num =se_num.split(" ");		//Splits string into sub strings
	var se_numf;		//Variable to contruct desired format
	
	//if statment to parse season text (having in mind that any number under 10 has to have a 0 added to beginning)
	if(splitse_num[1] < 10){ 
		se_numf = "S0"+splitse_num[1];
	}else{	
		se_numf ="S"+splitse_num[1];
	}

	//if statment to parse episode text (having in mind that any number under 10 has to have a 0 added to beginning)
	if(splitse_num[3] < 10){
		se_numf = se_numf + "E0"+splitse_num[3];
	}else{	
		se_numf = se_numf + "E"+splitse_num[3];
	}
	
	title_qry = title_qry + se_numf + "+";
}

//---------------------------------------------------------------Parse string for a suitable Query---------------------------------------------------------------
title_qry = title_qry.replace(/\(.*?\)/,'');		//Strip Film Year from title
title_qry = title_qry.replace(/\ \ /g," ");		//Some Titles have " that have to striped 
title_qry = title_qry.replace(/ /g,"+");			//Add Joints 			BUG:Adds an extra + sign to the end
title_qry = title_qry.replace(/"/g,"");		//Some Titles have " that have to striped 
title_qry = title_qry.replace(/'/g,"");		//Some Titles have ' that have to striped 

//---------------------------------------------------------------Build Desired Queries---------------------------------------------------------------
var stgvu_qry = "http://www.stagevu.com/search?for=" + title_qry + "&in=Videos";		//Build stagevu search query
var torz_qry =  "http://www.torrentz.com/search?q=" + title_qry;		//Build torrentz search query
var yt_qry  = "http://www.youtube.com/results?search_query=" + title_qry + "trailer&aq=f";		//Build youtube (trailer) search query

//---------------------------------------------------------------Create Buttons---------------------------------------------------------------
var navbar, newElement;
navbar = document.getElementById('action-box');

if (navbar) {
    newElement = document.createElement('div');
	var inhtml = '<a href="'+ stgvu_qry +'" target="_blank"><img src = "http://stagevu.com/favicon.ico" position = "absolute"/></a><a href="'+ torz_qry +'" target="_blank"><img src = "http://www.torrentz.com/img/92.gif" position = "absolute"/></a><a href="'+ yt_qry +'" target="_blank"><img src = "http://s.ytimg.com/yt/favicon-vfl147246.ico" position = "absolute"/></a>';
	newElement.innerHTML = inhtml;
    navbar.parentNode.insertBefore(newElement, navbar.nextSibling);
}
})();