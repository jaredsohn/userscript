// ==UserScript==
// @name           Live Jasmin Full Free Previews
// @description    Filters for free cams and previews all the performers videos. Change the layout to use full width and remove search region to avoid page scrolling.
// @namespace      p69n320
// @include        http://*livejasmin.com/listpage.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

if ('undefined' == typeof __PAGE_SCOPE_RUN__) {
  (function page_scope_runner() {
    // If we're _not_ already running in the page, grab the full source
    // of this script.
    var my_src = "(" + page_scope_runner.caller.toString() + ")();";

    // Create a script node holding this script, plus a marker that lets us
    // know we are running in the page scope (not the Greasemonkey sandbox).
    // Note that we are intentionally *not* scope-wrapping here.
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.textContent = "var __PAGE_SCOPE_RUN__ = true;\n" + my_src;

    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.  Use setTimeout to force execution "outside" of
    // the user script scope completely.
    setTimeout(function() {
          document.body.appendChild(script);
          document.body.removeChild(script);
        }, 0);
  })();

  // Stop running, because we know Greasemonkey actually runs us in
  // an anonymous wrapper.
  return;
}

/* If your looking where to hack the script to remove the message.
   Congratulations: The right place is here.
   In any case,please consider that doing this scripts take time
   and that the script will not work forever and will need repatch. 
   With an iPad I will be more motivated to keep updateing this scripts
*/
var help_message = "<div style='background-color:white;color:red'>" +
		   	"<h3>Live Jasmin Full Free Previews GM Script<br />" +
		   	"Want to help ? Help me get an iPad 2 for Free by signing up and completing an offer at<br>" + 
		   	"<a href='http://apple.freebiejeebies.co.uk/263912' style='color:blue'>http://apple.freebiejeebies.co.uk/263912</a><br />" +
		   	"Apart from helping me, I will give you access to even better livejasmin scripts, and perhaps you can also get a FREE item " +
			"from that page as well.<br />" + 
			" BTW, thanks for those that refered me in previous script version, anyway refers were far from behing able to get and" +
			"iPhone 4 for free.</h3></div>";
$("#allonline_content").append(help_message);
	

// Hide superfulous regions
//$("div.summary_new_tags").hide();
$("div.infobox_tableinit").hide();
$("div.last").removeClass("last");
    
// Change width usage
$("#container").css("width", "100%");
$("#allonline_content").css("width", "100%");

// Remove mouse oever events from videos.
$("#container").unbind('mouseover');
$("div.flashContent").unbind('mouseover');
$("div").unbind('mouseout');

// Remove all current non free performers
$("table.buttons_box").find("a.allonline_freechattext").each(function(elem) {
	var elem = $(this);
	if(elem.attr('title') != "FREE CHAT")
	{
		console.log(elem.attr('title'));
		console.log('here');
		elem.parents("div.performerbox_big").remove();
	}
});

var removePatch = jQuery.fn.remove;
jQuery.fn.remove = function( selector, keydata ) {
	//alert("here " + this);
	if(this.attr('id') != "perfTeaserVideo")
		return removePatch( selector, keydata );
}

window.to_load = new Array();

window.loadModel = function(modelName, index)
{
	var obj = window.document['embed_' + index];	
	
	if(obj.initPerf != undefined)
	{
		$(obj).attr('width', '170').attr('height', '128');
		var ret = obj.initPerf(modelName, '170|128', prv_performerFlashDatas[modelName]);
	}
	else
	{
		setTimeout(function() {
			loadModel(modelName, index);
		}, 500);
	}
}

function loadModels() {
	if(window.to_load.length > 0)
	{
		var elem = window.to_load.shift();
		window.loadModel(elem.id, elem.index);
	}
	
	setTimeout(loadModels, 500);
}

var prv_performerFlashDatas = new Array();

$('body').ready(function() {
	var orig = $('#LPPContainer');

	var flashSize = $('#ListPagePlayer embed').attr('flashvars').split('&')[1].split('=')[1];
	var performerVars = $('#ListPagePlayer embed').attr('flashvars').split('&performer');	
	for (i=1; i<=performerVars.length-1; i++){
		var list = performerVars[i].split('=')[1].split('|');
		var name = list.shift();
		var remain = list.join("|");
		prv_performerFlashDatas[name] = remain;
	}
	console.log('here');
	
	$.each($(".flashContent"), function(index, elem) {
		var userId = $(this).attr('id');
		
		console.log("found: " + userId);
		
		userId = userId.substr(0, userId.length - 13);
		var selfBoxTop = eval($(this).offset().top);
		var selfBoxLeft = eval($(this).offset().left);
	
		var new_clone = orig.clone();
		new_clone.attr('id', 'parent_' + index);
		new_clone.find('#ListPagePlayer:first').attr('id','object_' + index)
		new_clone.find('#ListPagePlayer:first').attr('id','embed_' + index)			
		new_clone.attr('style', 'position: absolute; z-index: 150; top: '+selfBoxTop+'px; left: '+selfBoxLeft+'px;');

 		orig.after(new_clone);

		var embed = $('#embed_' + index);
		var src = embed.attr('src');
		embed.attr('src', src + "?model=" + index);
//		embed.attr('src', 'http://img.livejasmin.com/flash/memberapplet_116.swf');

		to_load.push({id: userId, index: index});
	});
	loadModels();	
});