// Google Reader Enhances Experinces
// version 0.2.3
// 2010-1-11
// Copyright (c) 2010, WijN
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// WHAT IT DOES:
// 0.2.3 30 June 2011
// fixed 100% width
// 0.2.2 5 May 2011
// Fixed Add subscription box invisible issue.
// 0.2.1 17 Mar 2011
// Support google new toolbar.

// 0.2 10 Oct 2010
//  Add support of Chorme, and clean code.
//
// 0.1
// Maximize view area, add a F button to toggle full screen mode.
// --------------------------------------------------------------------
// ==UserScript==
// @name            Google Reader Enhances Experinces
// @description     Maximize view area, add a F button to toggle full screen mode.
// @include         https://reader.google.com/reader/*
// @include         https://www.google.com/reader/*
// @include         http://www.google.com/reader/*
// ==/UserScript==
	GM_addStyle('#containerFrame{width:1050px;height:600px}#add-box{display:none}#selectors-box{display:none}#stream-prefs-menu-contents{z-index:100000000000000000} #main{height:100%;} .goog-menu{z-index:2000;}')



function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener("load", function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
// the guts of this userscript
function maind() {
	// Param setting
	var debug= false;
	var maxi = false;

	//Div at expand mode
	thisDiv = document.getElementById("entries");				
	//thisDiv.addEventListener('DOMAttrModified', getDiv, false);
	// table displaying list view
	tableCondition=document.getElementById("view-list");
	regexp1=/selected/;

	function max(){
	main = $("#main");

	if(maxi==false){

	maxi = true
	$("#search").css({zIndex:"0"})
	main.css({position:"absolute",top:"0",background:"#FFFFFF",zIndex:"1000",width:"100%"});
	}else{
	maxi = false
	$("#search").css({zIndex:"10000"})
	main.css({position:"",top:"",background:"",zIndex:""});

	}

	}
	function nav(){
	$("#lhn-add-subscription").after("<a id='full'>F</a>");
	full =document.getElementById("full");
	full.addEventListener('mousedown', max, false);
	$("#full").css({fontSize:"20px",padding:"5px",cursor:"pointer",position:"relative",left:"80px",top:"1px"});
$("#quick-add-bubble-holder").css({zIndex:"2001"})

}

  //alert("There are " + $('a').length + " links on this page.");
  max();
nav();
}


// load jQuery and execute the main function
addJQuery(maind);