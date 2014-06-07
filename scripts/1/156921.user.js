// ==UserScript==
// @run-at	document-end
// @name       AdminConsole UI Improvements
// @namespace  http://www.businesscatalyst.com/
// @version    1.4
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require    http://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.2/jquery.cookie.min.js 
// @description  Testing Prototype for Business Catalyst AdminConsole Fixed Footer

// @copyright  2012+, Adobe BC XD


// @include        */AdminConsole/*


// ==/UserScript==
$(document).ready(function(){
  console.log("document ready")
    
    $("iframe[name=hybrid]").load(function(){
console.log("iframe loaded");
        //removing changes made by h.js
       	var footerButtons = $(this).contents().find(".footerbuttons");
        //we do stuff only if we have footerbuttons visible
        if(footerButtons.size()&&footerButtons.is(":visible")){
            var newFooterButtons = footerButtons.clone()
            footerButtons.replaceWith(newFooterButtons);
            newFooterButtons.removeClass("floatingButtons");
            newFooterButtons.removeAttr("style");
            
    
            newFooterButtons.css("cssText", "padding-bottom: 7px !important;");
    
            prepareFrame($(this));
            $(window).resize(function(){
        		prepareFrame($("iframe[name=hybrid]"));
        	});
        }
        else{//revert if necesary
            $("#main").removeAttr("style");
        	$(".scrollHelper").remove();
        }
       	
    });
    
});


function prepareFrame(myFrame){
     console.log("prepare frame");
    //if($(".frameWrapper").size() == 0){
    //    myFrame.wrap('<span class="frameWrapper"/>');
   // }
    
	iframeContentHeight = $(myFrame).contents().outerHeight();
	visibleContentAllowed = windowSize()["height"]-$(myFrame).offset().top;
    if(iframeContentHeight >= visibleContentAllowed){
        iframeHeight = windowSize()["height"]-$(myFrame).offset().top-20;

		footerButtons = $(myFrame).contents().find(".footerbuttons");
        //making the buttons fixed
        footerButtons.css({
            "position":"fixed",
            "bottom":0,
            "width":"100%",
            "background-color":"#fff",
            "box-shadow": "0px -7px 10px -7px #ccc",
        });
        
  
        
        //making the iframe container fixed so that we can scroll in iframe
        $("#main").css({
            "position":"fixed",
            "width":windowSize()["width"]-280,
        });
        
        
        
         //adding the helper element
if($(".scrollHelper").size()==0){
        var helper = $('<div class="scrollHelper"/>');
        helper.css({
            "width":2,
            //"background-color":"#cc0000",
            "float":"left",
            "margin-top":85,
        });
        helper.insertAfter("#sidebar");
 }       
        //updating helper element heihgt
        $(".scrollHelper").height(iframeContentHeight);
        
        //transmit scroll from main window to iframe
        $(window).scroll(function(){
			$(myFrame).contents().find("body").scrollTop($(window).scrollTop());
        });
       
        
         $(myFrame).removeAttr("style");
        
       
            $(myFrame).css({
                "height":iframeHeight,
                //"position":"fixed",
            });
    	
    }

   
    
    
    
}


function windowSize() {
    //this is just for getting the browser visible size /  cross-browser
    //http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
    var myWidth = 0, myHeight = 0;
    if( typeof( window.innerWidth ) == 'number' ) {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }
    var windowSize = new Array();
    windowSize["width"] = myWidth;
    windowSize["height"] = myHeight;
    return windowSize;
}