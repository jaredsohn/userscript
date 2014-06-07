// ==UserScript==
// @name          Checkvist Focus Trail Display
// @namespace     CFTD
// @description   Displays a dynamic breadcrumb location trail that shows where you are while in both standard and (hoist) focus mode.
// @include       https://checkvist.com/checklists/*
// @include       http://checkvist.com/checklists/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require       https://raw.github.com/jeresig/jquery.hotkeys/18ec5611f628057b94e1c1d48a7bbbe7ad6272cd/jquery.hotkeys.js
// @author        drhouse
// @version       04.31.13.1500
// ==/UserScript==
    
$(document).ready(function () {
    $('<center><div id="above"></div></center>').insertAfter("#toolbar")
    $('#above').css("color","#0980f4");
    $('#above').css("height","12px");
    $('<div id="place"><p>place</p></div>').appendTo("body")
    $('#place').css("position","relative");
    $('#place').css("left","-9999px");

    var theparenturl = document.URL;
    var theurl = document.URL;
    var simple = (theurl + "?simple=true");
    var txt = (theurl + ".txt");
    
    ifrm = document.createElement("iframe");
	ifrm.setAttribute("src", simple);
	ifrm.style.width = 0+"px";
	ifrm.style.height = 0+"px";
    
    var isInIFrame = (window.location != window.parent.location);
	
    if(isInIFrame==true){
    	$('<div id="trails"></div>').insertBefore("body")
    	$('<center><div id="places">&nbsp;</div></center>').insertBefore("#trails")
      	
        var htmlStr = $('body').html();
        htmlStr = htmlStr.replace(/<ul>/g, "</li><ul>");
    	htmlStr = htmlStr.replace(/<\/ul><\/li>/g,"</ul>");
        htmlStr = htmlStr.replace(/<\/h1><\/li>/g,"</h1>");
    
    	$("#trails").html(htmlStr)
    	$("body").html(htmlStr)
    	$("body").html("")
 
        setInterval(function() { 
           var input = $(window.parent.document).find("#place").text();
           var path = $("span:contains('"+ input +"')").filter (function() {return $(this).text() === input; } ).parents("ul")
            .prev("li").find("span").add(this)
            .map(function() {
                return $(this).text();
            }).get().join(" > ");
        if (!input){
           path = '[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]'
            	}
        else {
             var lastpath = path 
            path = '[ '+path + input+' ]'
            }
		$("#places").html(path)            
        }, 10);
	}
else {
    document.body.appendChild(ifrm)
}	

jQuery(document).bind('keydown', 'Shift+Return', function (evt){
    return false;
});

jQuery(document).bind('keyup', 'Return', function (evt){
    update();
    return false;
});

jQuery(document).bind('keydown', 'Del', function (evt){
    update();
    return false;
});
    
jQuery(document).bind('keydown', 'Ctrl+Shift+u', function (evt){
    update();
    return false;
});

$('input').click(function(){
	update()
	}    
);
    
function update() {
    $( 'iframe' ).attr( 'src', function ( i, val ) { return val; });
  }
    
    setInterval(function() {     
        $("#place").html($(".selectedTask").find(".selectedTask .userContent").text());
        $("#above").text($('iframe').contents().find('#places').text());
        }, 10);
});