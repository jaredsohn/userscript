var $ = unsafeWindow.jQuery;
var jQuery = unsafeWindow.jQuery;
// ==UserScript==
// @name            Reddit modmailoverlay
// @namespace       reddit.com/r/creesch
// @author          agentlame, creesch
// @description     Overlay modmail on the current page
// @match           http://*.reddit.com*
// @match           http://reddit.com*
// @version         2.5
// @downloadURL http://userscripts.org/scripts/source/166394.user.js
// ==/UserScript==


function modmailoverlay() {

 $("head").prepend('<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js"></script><link rel="stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/themes/ui-lightness/jquery-ui.min.css">');
   
$('#modmail').attr('href', 'javascript:;');

$('#modmail').click(mailoverlay);
    $('<ul class="tabmenu" ><li><a href="javascript:;"  class="modmail-on">Modmail</a></li></ul>').appendTo('#header-bottom-left').click(mailoverlay);
 //$('.user a').attr('href', 'javascript:;');
 // $('.user a').click(useroverlay);

 $('#mail').attr('href', 'javascript:;');
 $('#mail').click(pmoverlay);
 
function mailoverlay() {
    $.get("http://www.reddit.com/message/moderator/?limit=10")
	.done(function(data) {
        $("#modmailoverlay").remove();
        var data = data.substring(data.indexOf('<div class="footer-parent">'), data.indexOf('<div class="content" role="main">')+33);
		data = '<div id="modmailoverlay"><div id="modmailoverlaydrag">Modmail</div><div id="overlaycontent"><br>'+ data + '</div>';
		var $data = $(data);
	
   

        $('body').append($data);
     $(function () {
          $("#modmailoverlay").resizable();
           $("#modmailoverlay").draggable({
            handle: "#modmailoverlaydrag",
            cursor: "move"
         });
          $('<div style="display: inline-block; float: right; position:relative; width: 15px; font-weight:bold;"><a href="javascript:;">X</a></div>').appendTo('#modmailoverlaydrag').click(function () {
                $("#modmailoverlay").hide("slow");
            });
                     $('<div style="display: inline-block; float: right; position:relative; width: 15px; font-weight:bold;"><a href="javascript:;">-</a></div>').appendTo('#modmailoverlaydrag').click(function () {
                var windowsettings = localStorage.getItem('windowsettings') || '{}';
				windowsettings = JSON.parse(windowsettings);
				if($("#overlaycontent").is(':hidden')) { 
				console.log(windowsettings[modmail]);
				console.log(windowsettings[modmail].height);
				var positionleft = windowsettings[modmail].positionleft;
				var positiontop = windowsettings[modmail].positiontop;

				$("#modmailoverlay").height(windowsettings[modmail].height);
				$("#modmailoverlay").width(windowsettings[modmail].width);
				 $( "#modmailoverlay" ).position({
				 my: "left+"+positionleft+" top+"+positiontop,
				 at: "left top",
				 of: "body",				 
				 });
				 
				$("#modmailoverlay").resizable( "enable" );
				$("#overlaycontent").show("fast");
				} else {
				$("#overlaycontent").hide("fast");
				$("#modmailoverlay").resizable( "disable" );
				               
				
				 windowsettings[modmail] = {
                        "height": $("#modmailoverlay").height(),
                        "width": $("#modmailoverlay").width(),
                        "positiontop": $('#modmailoverlay').offset().top,
                        "positionleft":  $('#modmailoverlay').offset().left
                };
				
				localStorage.setItem('windowsettings', JSON.stringify(windowsettings));
				
				  $("#modmailoverlay").height("15");
				  $("#modmailoverlay").width("100");
				 $("#modmailoverlay").position({
				 my: "left top",
				 at: "left bottom",
				 of: "#sr-header-area",
				 });

				 
				}
            });
        });
    });

}
    
	
function pmoverlay(){
     $.get("http://www.reddit.com/message/inbox/?limit=10")
.done(function(data) {
   $("#pmmailoverlay").remove();
                     var overlaydata = data.substring(data.indexOf('<div class="footer-parent">'), data.indexOf('<div class="content" role="main">')+33);
                        
  overlaydata ='<div id="pmmailoverlay">\
  <div id="pmmailoverlaydrag">Inbox</div><div id="pmoverlaycontent"><br>\
  ' + overlaydata + '</div>';
  
  $('#header').append(overlaydata);
    $(function() {
    $( "#pmmailoverlay" ).resizable();
	$( "#pmmailoverlay" ).draggable({ handle: "#pmmailoverlaydrag", cursor: "move" });
	$('<div style="display: inline-block; float: right; position:relative; width: 15px; font-weight:bold;"><a href="javascript:;">X</a></span>').appendTo('#pmmailoverlaydrag').click(function () {
      $("#pmmailoverlay").hide("slow");
	  });
                     $('<div style="display: inline-block; float: right; position:relative; width: 15px; font-weight:bold;"><a href="javascript:;">-</a></div>').appendTo('#pmmailoverlaydrag').click(function () {
                if($("#pmoverlaycontent").is(':hidden')) { 
				$("#pmmailoverlay").height(localStorage.getItem('pmmailheight') || "500");
				$("#pmmailoverlay").resizable( "enable" );
				$("#pmoverlaycontent").show("fast");
				} else {
				$("#pmoverlaycontent").hide("fast");
				$("#pmmailoverlay").resizable( "disable" );
				localStorage.setItem('pmmailheight', $("#pmmailoverlay").height());
				 $("#pmmailoverlay").height("15");
				 $("#pmmailoverlay").width("50");
				 $("#pmmailoverlay").position({
				 my: "left top",
				 at: "left bottom",
				 of: "#sr-header-area",
				 collision: "fit"
				 });

				 
				}
            });
  });
  
  
});
 
    }	
	
function useroverlay(){
     var username = $('.user a').html();
     $.get("http://www.reddit.com/user/"+username+"/")
.done(function(data) {
   $("#usermailoverlay").remove();
                     var overlaydata = data.substring(data.indexOf('<div class="footer-parent">'), data.indexOf('<div class="content" role="main">')+33);
                        
  overlaydata ='<div id="usermailoverlay">\
  <div id="usermailoverlaydrag">Inbox</div><div id="useroverlaycontent"><br>\
  ' + overlaydata + '</div>';
  
  $('#header').append(overlaydata);
    $(function() {
    $( "#usermailoverlay" ).resizable();
	$( "#usermailoverlay" ).draggable({ handle: "#usermailoverlaydrag", cursor: "move" });
	$('<div style="display: inline-block; float: right; position:relative; width: 15px; font-weight:bold;"><a href="javascript:;">X</a></span>').appendTo('#usermailoverlaydrag').click(function () {
      $("#usermailoverlay").hide("slow");
	  });
                     $('<div style="display: inline-block; float: right; position:relative; width: 15px; font-weight:bold;"><a href="javascript:;">-</a></div>').appendTo('#usermailoverlaydrag').click(function () {
                if($("#useroverlaycontent").is(':hidden')) { 
				$("#usermailoverlay").height(localStorage.getItem('usermailheight') || "500");
				$("#usermailoverlay").resizable( "enable" );
				$("#useroverlaycontent").show("fast");
				} else {
				$("#useroverlaycontent").hide("fast");
				$("#usermailoverlay").resizable( "disable" );
				localStorage.setItem('usermailheight', $("#usermailoverlay").height());
				 $("#usermailoverlay").height("15");
				 

				 
				}
            });
  });
  
  
});
 
    }

}


// Add script to the page
document.addEventListener('DOMContentLoaded', function(e) {
    var s = document.createElement('script');
    s.textContent = "(" + modmailoverlay.toString() + ')();';
    document.head.appendChild(s)
});


(function addcss() {
    if (!document.head) return setTimeout(addcss);

    // Add to all pages
    var css = '\
	#overlaycontent, #pmoverlaycontent, #useroverlaycontent  { \
	   overflow: auto; \
	   position: absolute; \
	   bottom: 15px; \
	   top: 15px; \
	   left: 0px; \
	   right: 0px; \
	   }\
	#modmailoverlay  {\
	   position: fixed; \
	   z-index:999; \
	   top: 100px; \
	   left: 100px; \
	   background-color:white; \
	   width: 620px; \
	   height: 500px; \
	   border: solid 1px gray; \
	   padding: 0; \
	   box-shadow: 0px 1px 3px 1px #D6D6D6;\
	} \
	#pmmailoverlay  {\
	   position: absolute; \
	   z-index:999; \
	   top: 120px; \
	   left: 120px; \
	   background-color:white; \
	   width: 620px; \
	   height: 500px; \
	   border: solid 1px gray; \
	   padding: 0; \
	   box-shadow: 0px 1px 3px 1px #D6D6D6;\
	} \
	#usermailoverlay  {\
	   position: absolute; \
	   z-index:999; \
	   top: 140px; \
	   left: 140px; \
	   background-color:white; \
	   width: 620px; \
	   height: 500px; \
	   border: solid 1px gray; \
	   padding: 0; \
	   box-shadow: 0px 1px 3px 1px #D6D6D6;\
	} \
	\
    #modmailoverlaydrag, #pmmailoverlaydrag, #usermailoverlaydrag {\
	   width:100%; \
	   height: 15px; \
	   display:block; \
	   background-color: #CEE3F8; \
	   text-align:center;\
	}\
    #modmailoverlay .entry.unvoted, #pmmailoverlay .entry.unvoted, , #usermailoverlay .entry.unvoted {\
	   margin-left: 10px !important;\
	 }\
	 #modmailoverlay *, #pmmailoverlay *{\
	 font-size: 100%;\
	 }\
	   ';
    s = document.createElement('style');
    s.type = "text/css";
    s.textContent = css;
    document.head.appendChild(s);
})();