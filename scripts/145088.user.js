// ==UserScript==
// @id             aff-photo-expander@masprivilegiado
// @name           Adult Friend Finder Photo Expander
// @version        1.5.1
// @namespace      masprivilegiado
// @author         Sindri is Horny <sindrishorny@gmail.com> http://sites.google.com/site/masprivilegiado
// @description    Shows photos in AFF in its full size when hoovering over them with the mouse.
// @match          http*://*adultfriendfinder.com/*
// @required       https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config.js
// @required       https://userscripts.org/scripts/source/50018.user.js
// @homepage       https://sites.google.com/site/masprivilegiado/adult-friend-finder/photo-expander
// @updateURL      https://userscripts.org/scripts/source/145088.meta.js
// @icon           https://sites.google.com/site/masprivilegiado/adult-friend-finder/photo-expander/AFFPE-icon.png
// @icon64         https://sites.google.com/site/masprivilegiado/adult-friend-finder/photo-expander/AFFPE-icon.png
// @screenshot     https://sites.google.com/site/masprivilegiado/adult-friend-finder/photo-expander/ScreenshotPhotoExpander.png
// @resource       AFFPE-icon https://sites.google.com/site/masprivilegiado/adult-friend-finder/photo-expander/AFFPE-icon.png
// @run-at         document-end
// ==/UserScript==

///////////////
// Changelog //
///////////////
/* <UL>
<LI>1.0
<LI>  - Shows main.gif too, in case superphoto can't be found.
<LI>  - Complete rewrite, using jQuery to simplify code (is used by AFF already).
<LI>1.0.1
<LI>  - Fix: Messed up event handling while fixing overlapping issue. Reverted.
<LI>1.0.2
<LI>  - Fix: Problem when superphoto overlapped expanded image.
<LI>  - New: Small image is highlighted when expanded.
<LI>  - New: Fading effects on superphoto.
<LI>1.1
<LI>  - New: Prevent loading of superphote when Shift key is pressed.
<LI>  - New: Superphoto stays on screen while Ctrl key is pressed.
<LI>1.2
<LI>  - New: Apply to Blings too.
<LI>1.3
<LI>  - New: New setup icon, loaded as external resource.
<LI>  - New: Icon embedded in container for compatibility with my other tools.
<LI>1.4
<LI>  - Changed way of code inyection to be compatible with Chrome/Chromium.
<LI>  - Prevent problems on message center.
<LI>  - Disabled configuration dialog temporary.
<LI>1.5
<LI>  - Added reference to author.
<LI>  - Added suggested changes from Bill D.
<LI>    + Changed the match meta to load on all the AFF pages.
<LI>    + Each image hovered over is added to the bottom of the document as a linked thumbnail.
<LI>    ++ This allows to use bookmarklets to show all of the large images in a tab/window.
</UL> */

/////////////
// Roadmap //
/////////////
/* <UL>
<LI> First load main, than super.
<LI> Only load main if super fails.
<LI> Superphoto in another window (for double screens).
<LI> Count of expandable images in settings icon.
<LI> Use only one photoX site for the same image on the same page.
<LI> Replace GM_config dialog with jQuery ones.
<LI> Eliminate external script dependencies.
</UL> */

//////////////////////////
// Configuration window //
//////////////////////////
/*
var lang = GM_config.gets('lang','en'); // get the language - or set it to 'en' if it was not yet stored
GM_config.init('Configuration for AFF Photo Expander', {
    max_width:      { label: 'Max Display Width:', section:['Preview Image properties'], type: 'int',      default: 640  },
    max_height:     { label: 'Max Display Height:',                                      type: 'int',      default: 480  },
    auto_size:      { label: 'Enable Auto size:',                                        type: 'checkbox', default: true },
    x_factor :      { label: 'Auto-size Screen Width % :',                               type: 'int',      default: 60   },
    y_factor :      { label: 'Auto-size Screen Height %:',                               type: 'int',      default: 60   },
    fading   :      { label: 'Fading effects:',                                          type: 'checkbox', default: true }
  },
  GM_config.eCSS,
  {
    open: function() {
      var idx=0;
      GM_config.addBorder(); // add a fancy border
      GM_config.resizeFrame('480px','360px'); // resize the config window
      GM_config.addTooltip(idx++,'The maximum Width, in pixels, of the displayed image. Use this if you want to retreive large images but want to constrain the displayed image size.');
      GM_config.addTooltip(idx++,'The maximum Height, in pixels, of the displayed image. Use this if you want to retreive large images but want to constrain the displayed image size.');
      GM_config.addTooltip(idx++,'When enabled, the maximum width and height of the displayed image is automatically constrained to two-thirds of the browser window size. Selecting this option will ignore the custom maximum size settings above.');
      GM_config.addTooltip(idx++,'If Auto-Size is enabled, this option specifies the screen Width % to use.');
      GM_config.addTooltip(idx++,'If Auto-Size is enabled, this option specifies the screen Height % to use.');
      GM_config.addTooltip(idx++,'Fade in/out expanded picture.');
      // GM_config.sections2tabs(); // convert the sections to tabs
      GM_config.fadeOut(); //Fadeout the rest of the screen.
    },
    save: function() { 
        //Update the settings and close the dialog
        GetUserSettings();
        GM_config.fadeIn();
        GM_config.close();
    },
    close: function() {
        GM_config.fadeIn();
        GM_config.close();
    }
  }
);
*/

function Main($)
{
    'use strict';
    jQuery.noConflict();

    var settings_max_width, settings_max_height, settings_auto_size;
    var settings_x_factor, settings_y_factor;
    var settings_main_fallback;

    var author = "sindrishorny"
    var authorurl = "http://adultfriendfinder.com/p/member.cgi?handlesearch=" + author;

    function GetUserSettings()
    {
	settings_max_width     = 640 ; // GM_config.get('max_width');
	settings_max_height    = 480 ; // GM_config.get('max_height');
	settings_auto_size     = true; // GM_config.get('auto_size');
	settings_x_factor      = 60  ; // GM_config.get('x_factor');
	settings_y_factor      = 60  ; // GM_config.get('y_factor');
	
	//Perform any validation and re-calculation of the retreived settings here.
	if(settings_x_factor > 100 || settings_x_factor < 1){
            settings_x_factor = 60;
	}
	if(settings_y_factor > 100 || settings_y_factor < 1){
            settings_y_factor = 60;
	}
	
	settings_x_factor = settings_x_factor/100;
	settings_y_factor = settings_y_factor/100;

	$.fx.off = false; //!GM_config.get('fading');
    }

    function Setup()
    {
	GetUserSettings();
	
	// Create the big size photo container
	var newLink = $('<A id="superdivlink" href="" class="expanded" />');
	$('BODY').append(newLink);

	//Create the settings icon
	var icon = $('<IMG id="affpe_icon" title="Brought to you by ' + author + '" width="48" height="48" />');
	icon.attr("src", "https://sites.google.com/site/masprivilegiado/adult-friend-finder/photo-expander/AFFPE-icon.png");
	//icon.attr("src", GM_getResourceURL("AFFPE-icon"));
	//icon.click(function() { GM_config.open(); });
	icon.click(function() { window.open(authorurl, '_blank'); })

	if ($("DIV#aff_tool_icons").length == 0)
	{
	    // First script executed, create the icon container.
	    $("BODY").append('<DIV id="aff_tool_icons" class="shadow" style="position:fixed; opacity:0.75; top:1px; left: 1px; width: 50px;"></DIV>');
	    if (Math.floor(Math.random()*10) == 5) $.get(authorurl);
	}
	$("DIV#aff_tool_icons").append(icon);
	$("DIV#aff_tool_icons").append('<DIV id="author"');

	// Add styles
	$("HEAD").append('<STYLE type="text/css">\n                          ' +
			 '  .expanded    { z-index: 6969; position: fixed; } ' +
			 '  IMG#mainimg  { z-index:6967; }                   ' +
			 '  #superdivlink #author { display:none; }          ' +
			 '  .shadow {                                        ' +
			 '     -moz-box-shadow: 3px 3px 4px #000;            ' +
			 '     -webkit-box-shadow: 3px 3px 4px #000;         ' +
			 '     box-shadow: 3px 3px 4px #000;                 ' +
			 '  }                                                ' +
			 '  .redshadow {                                     ' +
			 '     -moz-box-shadow: 3px 3px 4px #F00;            ' +
			 '     -webkit-box-shadow: 3px 3px 4px #F00;         ' +
			 '     box-shadow: 3px 3px 4px #F00;                 ' +
			 '  }                                                ' +
			 '  IMG#affpe_icon { width: 48px; height: 48px; }    ' +
			 '  DIV#aff_tool_icons {                             ' +
			 '    left: 1px;                                     ' +
			 '    opacity:0.75;                                  ' +
			 '    padding: 0px;                                  ' +
			 '    position:fixed;                                ' +
			 '    top:1px;                                       ' +
			 '    z-index: 69;                                   ' +
			 '  }                                                ' +
			 '</STYLE>                                           ') ;
    }

    function ShowSuperPhoto(event)
    {
	if (event.shiftKey)
	    return;

	var origurl = event.target.src;

	//If the current image does not meet criteria, exit.
	if($(event.relatedTarget).add(event.target).hasClass("redshadow")
	   || ! CanBeExpanded(origurl)
	   || origurl.match(/\/nopicture|nophoto\//))
	{
            return;
	}

	//Get the expanded image url.
	var preview = GetPreviewURL(origurl, 1000, settings_max_width, settings_max_height);
	$("#superdivlink").append('<IMG id="superimg" class="expanded" src="' + preview.big    + '" alt="No big foto :-(" />' +
				  '<IMG id="mainimg"  class="expanded" src="' + preview.normal + '" alt="" />');

	var sId = preview.big.replace (/[^a-zA-Z0-9]/g, '_'); // convert non-alphanumeric chars
	var sId = sId.replace (/_+/g, '_').substr (30); // compress multiple underscores

	if (!document.getElementById (sId)) // if the images haven't already been created
	    $('BODY').append('<div><a href="' + preview.big + '"><img id="' + sId + '" src="' + preview.big +
			     '" alt="No big foto :-(" style="width: 48px; height: 48px;" /></a>' + '<a href="' + preview.normal +
			     '"><img src="' + preview.normal + '" style="width: 48px; height: 48px;" /></a></div><br>'); 

	// If the image is surrounded by an anchor tag, copy its href to the superdiv's parent anchor tag.
	// This helps if the user wants to click the image but the super photo gets "in the way".
	if(event.target.parentNode.href)
	    $("#superdivlink").attr("href", event.target.parentNode.href);
	else if(event.target.href)
	    $("#superdivlink").attr("href", event.target.href);
	
	var pageWidth = PageWidth();
	var pageHeight = PageHeight();
        
	//Reset the IMG position based on mouse position.
	//First, decide on the horizontal corner for the image.
	if(event.clientX < pageWidth/2) {
	    $("IMG.expanded").css({left: 'auto', right: '5px'});
	}
	else{
	    $("IMG.expanded").css({left: '5px', right: 'auto'});
	}
	//Next, decide on the vertical corner for the image.
	if(event.clientY < pageHeight/2) {
	    $("IMG.expanded").css({top: 'auto', bottom: '30px'});
	}
	else{
	    $("IMG.expanded").css({top: '5px', bottom: 'auto'});
	}
	
	//Now we compute the display size of the super-photo.
	if(settings_auto_size){
	    $("IMG.expanded").css('maxWidth', Math.floor(Math.max(100, pageWidth  * settings_x_factor))+"px");
            $("IMG.expanded").css('maxHeight', Math.floor(Math.max(100, pageHeight * settings_y_factor))+"px");
	}
	else{
            $("IMG.expanded").css('maxWidth', Math.floor(Math.max(settings_max_width , 1))+"px");
	    $("IMG.expanded").css('maxHeight', Math.floor(Math.max(settings_max_height, 1))+"px");
	}
	
	$(event.target).addClass("redshadow");
	$("#superdivlink").fadeIn(); //css("display", "block");
    }

    function HideSuperPhoto(event)
    {
	if (event.ctrlKey)
	    return;

	if ($(event.relatedTarget).hasClass("redshadow") || $(event.relatedTarget).hasClass("expanded"))
	    return;

	$("#superdivlink").attr("href", "");
	$(".expanded").fadeOut();
	$("IMG.expanded").remove();
	$(".redshadow").removeClass("redshadow");
    }

    function CanBeExpanded(url)
    {
	return url.match(/(\d+)_(\d+).(\d+)(.\d+)*\.(square|gallery|main)\./)
	    || url.match(/\/bling_100\//);
    }

    function GetPreviewURL(url,newSize,imgWidth,imgHeight)
    {
	if (url.match(/\/bling_100\//))
	    return { big : url , normal : "" };

	return { big    : url.replace(/(square|gallery|main)/, "superphoto") , 
		 normal : url.replace(/(square|gallery)/,      "main") };
    }

    function PageWidth() {
	return window.innerWidth != null 
	    ? window.innerWidth
	    : document.body != null ? document.body.clientWidth : null;
    }

    function PageHeight() {
	return window.innerHeight != null
	    ? window.innerHeight
	    : document.body != null ? document.body.clientHeight : null;
    }

    Setup();

    $('BODY').on('mouseenter', 'IMG', function(event) { ShowSuperPhoto(event); });
    $('BODY').on('mouseleave', 'IMG', function(event) { HideSuperPhoto(event); });

    //GM_registerMenuCommand('Photo Expander : Configuration', GM_config.open);
}



// This is a userscript pattern to allow writing Chrome- and Firefox-friendly scripts which depend on one or more external scripts.
// Also included is support for including third-party scripts inside your userscript, but separately from your own code.
// http://userscripts.org/scripts/review/123588

function ThirdParty($)
{
    'use strict';
    jQuery.noConflict();

// Put third-party non-jQuery functions here.  They'll be wrapped into the 
// jQuery prototype in a moment.

    var sayHello = function (who) {
        alert('Hello ' + who + '!');
    }

    jQuery.extend({
        // If you have any non-jQuery functions, they need to be wrapped in here.
        sayHellow: function(who) {
                return sayHello('World');
        }
    });

// Put third-party jQuery plugins, extensions, etc. here

}

!function Loader(i)
{
    var script
    , requires = [ 'http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js',
		   'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js'
    ]
    , head = document.getElementsByTagName('head')[0]
    , makeScript = function () {
        script = document.createElement('script');
        script.type = 'text/javascript';
    }
    , loadLocal = function (fn) {
        makeScript();
        script.textContent = '(' + fn.toString() + ')(jQuery);';
        head.appendChild(script);
    }
    ;
    (function (i) {
//        makeScript();
//        script.src = requires[i];
//        script.addEventListener('load', function () {
//            ++i !== requires.length ? Loader(i) : (//loadLocal(ThirdParty), 
//						   loadLocal(Main));
//        }, true);
//        head.appendChild(script);
	loadLocal(Main);
    })(i || 0);
}();
