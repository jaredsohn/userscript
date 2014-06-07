// ==UserScript==
// @name       TSR Favourite Boards
// @version    0.1
// @description  Adds a favourite board system.
// @match      http://www.thestudentroom.co.uk/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @copyright  2013+, Ice_Occultism
// ==/UserScript==

var optDivs = {};

function prepareDict(){  
    for(var i in localStorage){
        optDivs[i] = localStorage[i];
    }
}

prepareDict();

var OPTNAMEID = "OPT";

function overLayDivs(dictionary){
 
    var allDivs = '<li><div id="MasterDIV">Favourite Boards</div><ul id="MasterUL" style="display:none; margin-top:5px">';
    var ctr = 0;
    
    for(var x in dictionary){
       ctr++;
       allDivs = allDivs + '<li><div id='+OPTNAMEID+ctr+'"><a href="forumdisplay.php?f='+x+'" >' + dictionary[x] + '</a></div></li>';
    }
    

    $(allDivs).insertAfter(".user.expandable");    
}

function applyCSS(dictionary){
    
    var DIVStyles = {
    	"padding" : "1px 0",
        "color" : "White",
        "margin-top" : "6px",
        "font-weight" : "bold",
        "cursor" : "pointer",
        "font-size" : "12px",
		"border-color": "#599f26",
        "white-space" : "no-wrap"

  	};
    
    var optStyles = {
        
      "position" : "absolute",
        "display" : "block"
        
    };
    
    $("#MasterDIV").css(DIVStyles);
    
    
    for(var i=1; i < Object.keys(dictionary).length + 1; i++){
    	$("#"+OPTNAMEID+i).css(DIVStyles);
        $("#"+OPTNAMEID+i).css(optStyles);
        $("#"+OPTNAMEID+i).hide();
    }
    
   
}

function toggleMenu(toggle){
    if(toggle == 1){
	  $("#MasterUL").fadeIn(300);
    }else{
      $("#MasterUL").fadeOut(300);  
    }
}

function isNearTo(elementID, mouseX, mouseY){
    // Implementation of Pythag.
    return Math.floor(Math.sqrt(Math.pow(mouseX - ($(elementID).offset().left+($(elementID).width()/2)), 2) + Math.pow(mouseY - ($(elementID).offset().top+($(elementID).height()/2)), 2)));
}

function addFavoButton(){
    var buttonHTML = '<div id="favo" class="interact rollmenu arrow-down" style="margin-top : 10px; float : right; margin-right:16px">Favourite this Board</div>';
    $(".ctl-bar.top:has(div):first").append(buttonHTML);
}

function favouriteTheBoard(boardID, descr){
    if(localStorage.getItem(boardID) != descr){
        localStorage.setItem(boardID, descr);
        alert("Success, refresh this page to access the board from your menu!");
    }
    
}

$(document).ready(function () {
    // This sets our injected HTML/CSS
    overLayDivs(optDivs);
    applyCSS(optDivs);
    if(document.URL.indexOf("forumdisplay") != -1){
    	addFavoButton();
    }
    
    // Checks if a Hover event is performed over the MasterDIV.
    $("#MasterDIV").mouseenter(function () { 
        toggleMenu(1);     
    });
    
    // Checks if the mouse is a sufficient amount away from the Menu to be faded.
    $(document).mousemove(function (e) {
        // ToDo Remove Magic No.
        if((isNearTo("#MasterUL", e.pageX, e.pageY)) > 180){
          toggleMenu(0);
        }

    });
    
    // When clicked, passes the board ID to the function that stores the board ids.
    $("#favo").click(function (){
        var URL = document.URL.split("=");
        var boardID = URL[URL.length-1];
        favouriteTheBoard(boardID, document.title.split(" - ")[0]);
    });
        
});


                    

