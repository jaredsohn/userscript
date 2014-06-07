// ==UserScript==
// @id             aff-profile-enhancer
// @name           Adult Friend Finder Profile Enhancer
// @version        1.6
// @namespace      masprivilegiado
// @author         Sindri is Horny <sindrishorny@gmail.com> http://sites.google.com/site/masprivilegiado
// @description    Enhances visualized member profiles with insertion of more pictures and other details.
// @match          http://adultfriendfinder.com/p/member.cgi*
// @homepage       https://sites.google.com/site/masprivilegiado/adult-friend-finder/profile-enhancer
// @updateURL      https://userscripts.org/scripts/source/150412.meta.js
// @icon           https://sites.google.com/site/masprivilegiado/adult-friend-finder/profile-enhancer/AFFPrEn-icon.png
// @icon64         https://sites.google.com/site/masprivilegiado/adult-friend-finder/profile-enhancer/AFFPrEn-icon.png
// @screenshot     https://sites.google.com/site/masprivilegiado/adult-friend-finder/profile-enhancer/MorePhotos.png
// @resource       AFFPrEn-icon https://sites.google.com/site/masprivilegiado/adult-friend-finder/profile-enhancer/AFFPrEn-icon.png
// @run-at         document-end
// ==/UserScript==

///////////////
// Changelog //
///////////////
/*
<UL>
  <LI><B>1.0</B>
  <LI>Show all pictures link will always lead to picture page.
  <LI><B>1.1</B>
  <LI>Show additional 8 pictures of member.
  <LI><B>1.2</B>
  <LI>Remove some redundant stuff from the profile.
  <LI><B>1.3</B>
  <LI>New: Reorganize pictures as 9x9 table.
  <LI>Fix: Didn't work on own profile page.
  <LI>New: Use common icon indicator of my tools.
  <LI><B>1.4</B>
  <LI>Change one of the tab links above the pictures to show album page.
  <LI><B>1.5</B>
  <LI>Changed way of code inyection to be compatible with Chrome/Chromium.
  <LI><B>1.6</B>
  <LI>New page layout broke the code, fixed.
</UL>
*/

/////////////
// Roadmap //
/////////////
/*
<UL>
  <LI>Force usage of same profile picture URL on whole page.
  <LI>Remove more stuff (like Blings, friends, ...), configurable.
<UL>
*/

function Main($)
{
    'use strict';
    jQuery.noConflict();

    var author = "sindrishorny"
    var authorurl = "http://adultfriendfinder.com/p/member.cgi?handlesearch=" + author;

    function Setup()
    {
	//Create the icon indicator
	var icon = $('<IMG id="affpren_icon" title="Brought to you by ' + author + '" width="48" height="48" />');
	icon.attr("src", "https://sites.google.com/site/masprivilegiado/adult-friend-finder/profile-enhancer/AFFPrEn-icon.png");
	icon.click(function() { window.open(authorurl, '_blank'); })

	if ($("DIV#aff_tool_icons").length == 0)
	{
	    // First script executed, create the icon container.
	    $("BODY").append('<DIV id="aff_tool_icons" class="shadow" style="position:fixed; opacity:0.75; top:1px; left: 1px; width: 50px;"></DIV>');
	    if (Math.floor(Math.random()*10) == 5) $.get(authorurl);
	}
	$("DIV#aff_tool_icons").append(icon);

	// Add styles
	$("HEAD").append('<STYLE type="text/css">\n                        ' +
			 '  IMG#affpren_icon { width: 48px; height: 48px; }' +
			 '  DIV#aff_tool_icons {                           ' +
			 '    left: 1px;                                   ' +
			 '    opacity:0.75;                                ' +
			 '    padding: 0px;                                ' +
			 '    position:fixed;                              ' +
			 '    top:1px;                                     ' +
			 '    z-index: 69;                                 ' +
			 '  }                                              ' +
			 '  TABLE#pictable TD { padding: 4px; }            ' +
			 '  .shadow {                                      ' +
			 '     -moz-box-shadow: 3px 3px 4px #000;          ' +
			 '     -webkit-box-shadow: 3px 3px 4px #000;       ' +
			 '     box-shadow: 3px 3px 4px #000;               ' +
			 '  }                                              ' +
			 '</STYLE>                                         ');
    }

    function GetMemberDetails(url)
    {
	var idPart = url.substring(url.lastIndexOf("-") + 1);

	return { id        : idPart.substr(0, idPart.indexOf(".")),
		 photobase : url.substr(0, url.lastIndexOf("-") + 1) };
    }

    function ReplaceAllPhotosLink(mid)
    {
	$("DIV.tab_links > A").last().attr("href", "http://adultfriendfinder.com/p/manage_photos.cgi?do=show_profile_photo_page&mid=" + mid);
    }

    function AddMorePhotos(id, baseurl)
    {
	var img = $("DIV#profile_photo_display").find("IMG");

	var member = GetMemberDetails(img.attr("src"));

	// Create 9*9 table
	var pictable = $('<TABLE id="pictable" border="0" /></BR>').insertBefore("DIV#profile_photo_display");
	for (var r = 1 ; r <= 3 ; ++r)
	{
	    var row = $("<TR />").appendTo(pictable);

	    for (var c = 1 ; c <= 3 ; ++c)
	    {
		row.append('<TD><IMG src="" border="0" width="96" height="96" /></TD>');
	    }
	}
	
	pictable.find("IMG").each(function(index)
				  {
				      if (index === 0)
					  $(this).attr("src", img.attr("src"));
				      else
					  $(this).attr("src", member.photobase + member.id + "." + (index + 1) + ".square.gif").hide().fadeIn(index * 2000);
				  });

	img.remove();
    }

    function RemoveRedundantStuff()
    {
	$("DIV#ALTimgCountText").parent().children(".tac").remove();
	$("DIV#ALTimgCountText").remove();
	$("DIV#overlay").remove(); // some kind of overlayed modal banner
	$("DIV#order_popup").remove(); // some kind of overlayed modal banner
    }

    /*
    function ReplaceMessageCenter()
    {
	
    }
    */

    
    Setup();
    
    AddMorePhotos();
//    ReplaceAllPhotosLink(member.id);
//    RemoveRedundantStuff();
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
