// ==UserScript==
// @name        xhamster Multi Cam
// @namespace   xhamsterMultiCam
// @description This overwrites the links to the Live Cams on xhamster.com to create an interface with five cameras in two rows (2 on top and 3 on the bottom).  The cam view in each is maximized to the size of it's respective frame and buttons are provided for moving cams around the screen and selecting different cams as well as popping out the chat room dialog box.  Note: this is the very first release and at this time the chat room is view only.  The next release should have a working entry mode for the chat room and some other refinements.  I want to upload it now to get some feedback.
// @include     http://xhamster.com/*
// @version     0.2
// @grant       GM_addStyle
// @grant 		GM_getResourceURL
// @grant 		GM_getResourceText
// @resource	jquerysrc	http://code.jquery.com/jquery-latest.js
// ==/UserScript==


/**
 * TODO
 * - add chat field (moving both "model_dialog" and form field into new div)
 * - fix auto-scrolling in model_dialog - seems to have been broken when pulling the model_dialog out of the contents div
 * - fix occational bug where listbox ends up loading the new video URL - hard nut to crack, but it doesn't happen often
 * - fix max-height of model_dialog (done, but needs refinement (6px less for inner div))
 * - make the number of rows and the number of cams per row (at least the first row) a setting and dynamically set
 */

/**
 * ICON URLs
 * book closed: 		http://i.imgur.com/E372r8F.png
 * book open: 			http://i.imgur.com/79Jdcrg.png
 * message bubble: 		http://i.imgur.com/S21kDAe.png
 * red up left arrow: 	http://i.imgur.com/bm58XvN.png
 * red up right arrow: 	http://i.imgur.com/8kMz3o5.png
 * couple facing: 		http://i.imgur.com/3jGzIut.png
 * couple her behind: 	http://i.imgur.com/OkZXP6V.png
 * couple w plus: 		http://i.imgur.com/zQv15Ay.png
 * couple w X: 			http://i.imgur.com/Wo1FxW3.png
 *
 * Imgur apparently blocks referrer requests from xhamster - go figure
 * so we'll just have to put the base64 image data here ;-)
 */

// SOME SETTINGS
var iconsize = 30; // set in pixels, but leave off the px so we can do math with it
var iconspacing = 10; // set in pixels, but leave off the px so we can do math with it

// SOME ICONS, EMBEDED HERE IN BASE64
var closelisticonsrc = "data:image/png;base64,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"
var listiconsrc = "data:image/png;base64,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";
var lefticonsrc = "data:image/png;base64,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";
var righticonsrc = "data:image/png;base64,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";
var chaticonsrc = "data:image/png;base64,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";

var listurl = 'http://xhamster.com/cams?c=1'; // start with a default, this gets overwritten in a sec (bottom of script) when we look for selected category
var holdlisturl = listurl + '&multi';  // this TOO gets overwritten to reflect the new listurl

// first make sure we have what we need to make the rest of this work - this is mainly only for the camstack url, because xhamster doesn't include jquery in their 404 error page.
if (typeof jQuery == 'undefined') {  
    // Yes, we are loading jquery both into xhamster AND into the head of the document.  This makes everything happy and work the way it's intended.  It is mostly needed because a little further down we are adding a few javascript routines to the document so they survive beyond the life of this script.

    var dynamic_script = document.createElement('script');
    dynamic_script.setAttribute("type","text/javascript");
    dynamic_script.setAttribute("src",GM_getResourceURL("jquerysrc"));
    document.getElementsByTagName("head")[0].appendChild(dynamic_script);

    eval(GM_getResourceText('jquerysrc'));
}


setmyvidsize = function() {
  rat = $('#chat_video').height() / $('#chat_video').width();
  if($(window).width() * rat > $(window).height() ) {
    dh = $(window).height();
    dw = $(window).height() / rat;
  } else {
    dh = $(window).width() * rat;
    dw = $(window).width();
  }
  dh = Math.round(dh);
  dw = Math.round(dw);
  $('#chat_video').css({'height': dh + 'px','width': dw + 'px'});
  setchatplacements();
}

setchatplacements = function() {
  $('#chatToggleButton').css({ 'top': '0px', 'left': ($(window).width() - ((iconsize * 3) + (iconspacing * 2))) + "px"});
  $('#model_dialog').attr('data-visible','false').css({'left':$(window).width() + 'px','top':'20px','min-height': '150px','max-height': ($(window).height() - 20) + 'px'}).find('div[id^="model_"]').css('max-height', ($(window).height() - 20) + 'px');
}

function optionsPage() {
  removeCommon();
   $('body').prepend('<div id="optionsholder" style="overflow-y:scroll"></div>');
   $("div.bigThumb.modelThumb").each(function() {
     $('#optionsholder').append(this);
   })
   $("#main").remove();
   $("#loginPop").remove();
   $("#hint").remove();
   $("#searchList").remove();
   $("div.panel").each(function() {
     $("#main").after(this);
   });
   setOptionsPageSize();
   $(window).resize( function() { setOptionsPageSize(); });
   if(window.location.href.match(/multi/)) {
    setInterval(function() { 
      if($('#optionsholder').scrollTop() < 10) {
        window.location.href = window.location.href; 
      }
    },10000);
   }
}
function setOptionsPageSize() {
   $('#optionsholder').ready(function() {
     $('#optionsholder').css({'width':$(window).width() + 'px','height':$(window).height() + 'px'});
   });
}


function videoPage() {
  removeCommon();
  $('#content').hide();
  $('body').prepend($('#chat_video'));
  $('#chat_video').show();

  $('#header').remove();
  $('#footer').remove();
  $('body').prepend('<div id="camtitlebar" style="display: block; position: absolute; top: 0px; left: 40px; z-index: 1500; width: 150px; height: 15px; line-height: 15px; font: 12px Arial; text-align: center; color: #fff; background-color: rgba(0,0,0,0.5);">' + $(document).attr('title') + '</div>');
  $('body').prepend($('#model_dialog').show().css({'position':'absolute','z-index':2000}).attr('data-visible','false'));
  $('body').prepend($('div.bigCenterMessage').css({'margin-left': '0px','margin-right': '0px', 'margin-top': '50px', 'width':$(window).width() + 'px'}).append('<div><a href="' + listurl + '">Return to Browse</a></div>'));
  $('body').prepend("<img src='" + chaticonsrc + "' width='" + iconsize + "px' id='chatToggleButton' style='position: absolute; z-index: 2500' />");

  $('#chatToggleButton').click(
  	function(){
  		if($('#model_dialog').attr('data-visible') == 'true') {
  			$('#model_dialog').animate({'left': $(window).width() + 'px'},100);
  			$('#model_dialog').attr('data-visible','false');
  		} else {
	  		$('#model_dialog').animate({'left': ($(window).width() - $('#model_dialog').width()) + 'px'},100);
  			$('#model_dialog').attr('data-visible','true');
  		}
  	}
  );

  setmyvidsize();
  $(window).resize( function() { setmyvidsize(); } );
}

function buildWindow() {
  	removeCommon();
  	$(document).attr('title','MultiCamView');
  	GM_addStyle('body { overflow-x: hidden; overflow-y: hidden; visibility: visible; }');
  	$('div').remove();
    $("body").append("<iframe name='tbox1' class='dispbox box1' scrolling=no src='" + listurl + "'>&nbsp1</iframe>");
    $("body").append("<iframe name='tbox2' class='dispbox box2' scrolling=no src='" + listurl + "'>&nbsp1</iframe>");
    $("body").append("<iframe name='tbox3' class='dispbox box3' scrolling=no src='" + listurl + "'>&nbsp1</iframe>");
    $("body").append("<iframe name='tbox4' class='dispbox box4' scrolling=no src='" + listurl + "'>&nbsp1</iframe>");
    $("body").append("<iframe name='tbox5' class='dispbox box5' scrolling=no src='" + listurl + "'>&nbsp1</iframe>");
  	$("body").append("<iframe id='holdlistbox' style='display:none;z-index: 2000;' scrolling=no src='" + holdlisturl + "'>&nbsp1</iframe>");
  	setFrameSizes();
  	$(window).resize(setFrameSizes);
}
function setFrameSizes() {
    var row1width = $(window).width() / 2;
    var row1height = row1width * 0.75;
    if( ( ($(window).height() - row1height) * 4) > $('window').width()) {
      var row2height = $(window).height() - row1height;
      var row2width = row2height / 0.75;
    } else {
      var row2width = $(window).width() / 3;
      var row2height = row2width * 0.75;
    }
    
    //TODO this isn't working, doesn't seem to be critical but it's a bit annoying to me that it doesn't stick
    row1width = Math.floor(row1width);
    row1height = Math.floor(row1height);
    row2width = Math.floor(row2width);
    row2height = Math.floor(row2height);
    
        $('.bumpButton').remove();

        GM_addStyle(".box1 {position: absolute; width: " + row1width + "px;height: " + row1height + "px;top: 0px; left: 0px;}");
        GM_addStyle(".box2 {position: absolute; width: " + row1width + "px;height: " + row1height + "px;top: 0px; left: " + row1width + "px;}");
        GM_addStyle(".box3 {position: absolute; width: " + row2width + "px;height: " + row2height + "px;top: " + row1height + "px; left: 0px;}");
        GM_addStyle(".box4 {position: absolute; width: " + row2width + "px;height: " + row2height + "px;top: " + row1height + "px; left: " + (row2width) + "px;}");
        GM_addStyle(".box5 {position: absolute; width: " + row2width + "px;height: " + row2height + "px;top: " + row1height + "px; left: " + (row2width * 2) + "px;}");
    
        setTimeout(function() {
            $.each([5,4,3,2,1],function() {
                var tp = $('.box' + this).position();
                var tpr = tp.left + $('.box' + this).width() - iconsize;
                var tpc = tp.left + $('.box' + this).width() - ((iconsize * 2) + (iconspacing));
                $('.box'+this).after("<img src='" + lefticonsrc + "' width='" + iconsize + "px' class='bumpButton' style='position: absolute; top: " + tp.top + "px; left: " + tp.left + "px; z-index: 3000' onclick='bumpMe(\"box" + this + "\",\"left\")' />");
                $('.box'+this).after("<img src='" + listiconsrc + "' width='" + iconsize + "px' class='bumpButton listicon-box" + this + "' style='position: absolute; top: " + tp.top + "px; left: " + tpc + "px; z-index: 3000' onclick='showListbox(\"box" + this + "\")' />");
                $('.box'+this).after("<img src='" + righticonsrc + "' width='" + iconsize + "px' class='bumpButton' style='position: absolute; top: " + tp.top + "px; left: " + tpr + "px; z-index: 3000' onclick='bumpMe(\"box" + this + "\",\"right\")' />");
            });
        }, 2000);

        // BUG, TODO: setting the anchor targets in showListbox needs to be done differently. Sometimes the 'holdlistbox' loads the new video leaving the interface without any method of selecting video streams
        var scriptsrc = "\
        var showListbox = function(obj) {\
          if($('#holdlistbox').hasClass(obj)) {\
          	if($('#holdlistbox').is(':visible')) {\
				$('#holdlistbox').hide();\
				$('.listicon-' + obj).attr('src', '" + listiconsrc + "');\
          	} else {\
            	$('#holdlistbox').show();\
            	$('.listicon-' + obj).attr('src', '" + closelisticonsrc + "');\
          	}\
          } else {\
            newtarget = $('iframe[name^=tb].'+obj).attr('name');\
            $('.listicon-' + obj).attr('src', '" + closelisticonsrc + "');\
            $('#holdlistbox').removeClass('box1 box2 box3 box4 box5');\
            $('#holdlistbox').show().addClass(obj);\
            $('#holdlistbox').contents().find('a').attr('target', newtarget).attr('onclick','parent.showListbox(\"' + obj + '\")');\
            $('#holdlistbox').load(function() { $(this).contents().find('a').attr('target', newtarget).attr('onclick','parent.showListbox(\"' + obj + '\")'); });\
            $('#holdlistbox').contents().find('#optionsholder').scrollTop('0');\
          }\
        };\
        var bumpMe = function(obj,side) {\
          switch (side) {\
            case 'left':\
              $('.box1').addClass('bumped').removeClass('box1');\
              $('.'+obj).addClass('box1').removeClass(obj);\
              $('.bumped').addClass(obj).removeClass('bumped');\
              break;\
            case 'right':\
              $('.box2').addClass('bumped').removeClass('box2');\
              $('.'+obj).addClass('box2').removeClass(obj);\
              $('.bumped').addClass(obj).removeClass('bumped');\
              break;\
            default:\
              alert(obj);\
              alert(side);\
          }\
        }\
        ";
        var dynamic_script = document.createElement('script');
        dynamic_script.setAttribute("type","text/javascript");
        dynamic_script.innerHTML = scriptsrc;
        document.getElementsByTagName("head")[0].appendChild(dynamic_script);
}


function removeCommon() {
   $("#header").remove();
   $("#footer").remove();
   $('#microBug').remove();
}

/**
 * Now that we've established all the routines lets figure out what we're doing here
 */

$(document).ready(function() {
  	if(res = window.location.href.match(/camstack(.*)/)) {
  	listurl = "/cams" + res[1];
	holdlisturl = (listurl.match('c=')) ? listurl + '&multi' : listurl + '?multi' ;
    buildWindow();
  	} else if(window.location.href.match(/cams/)) {
		optionsPage();
  	} else if(window.location.href.match(/view_cam.php/)) { 
    	videoPage();
  	} else if(window.top == window) {
  		$('a[href*="com/cams"]').each(function() { $(this).attr('href',$(this).attr('href').replace("com\/cams",'com/camstack')) });
    // $('body').prepend('<a href="/camstack" style="position: static; display: inline-block; top: 2px; left: 2px; padding: 10px; font: 12px Arial; font-weight: bold; background-color: #700; color: #fff; border: raised orange 3px; " >View Multiple Live Cams</a>');
  }
});