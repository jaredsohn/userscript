// ==UserScript==
// @name           Unusual Price Check
// @namespace      Bloop
// @include        *tf2outpost.com/*
// @include        *tf2tp.com*
// @include        *tf2b.com*
// @include        *tf2items.com/*
// @require	       http://code.jquery.com/jquery-1.7.2.min.js
// @version        1 bud
// ==/UserScript==
jQuery.noConflict();

(function($){



var site = window.location.hostname;
switch(site)
{
	case "www.tf2outpost.com":
		tf2outpost();
		break;
	case "tf2tp.com":
		tf2tp();
		break;
	case "tf2b.com":
		tf2b();
		break;
	case "www.tf2items.com":
		tf2items();
		break;
}

function tf2items()
{
	$('.fiq5').each(function()
	{
		var name = $(this).children('img').attr('alt').substring(8);
		var itemNumber = $(this).children('img').attr('id');
		var tooltip = $('#tooltip_'+itemNumber);
		var effect = tooltip.children('span').children('font').text().substring(8).trim();
		var url = makeURL(name,effect);
		var link = $("<a style='display:block' href=\"" + url + "\" target='_blank'>$</a>")
                    .css({
                    position: "absolute",
                    bottom: "4px",
                    right: "4px",
                    "z-index": 5,
                    "font-size": "200%"
                });
		$(this).append(link);
		var c = $(this).attr("onclick");
		$(this).removeAttr("onclick");
		var info = $("<div style='display:block' onclick=\""+c+"\">?</div>")
                    .css({
                    position: "absolute",
                    top: "4px",
                    right: "4px",
                    "z-index": 1000,
                    "font-size": "200%",
					cursor: "pointer"
                });
		$(this).append(info);
	});
}

function tf2b()
{
	$('.q5').each(function()
	{
		var name = $(this).attr('data-top').substring(8);
		var data = $(this).attr('data-txt');
		data = data.substring(data.indexOf('Effect')+8);
		var effect = data.substring(0,data.indexOf('\n'));
		var url = makeURL(name,effect);
		var link = $("<a href=\""+url+"\" target=\"_blank\">$</a>").css({
                    position: "absolute",
					display: "block",
                    bottom: "4px",
                    right: "4px",
                    "font-size": "200%"
                });
		$(this).append(link);
	});
}

function tf2outpost()
{
	$('.unusual').each(function()
	{
		//Get name
		var details = $(this).children('.details');
		var name = details.children('h1').text().substring(8);
		//Get Effect
		var effect = details.contents().filter(function () { return this.nodeType == 3; }).eq(3).text().trim();
		//Create our link
		var url = makeURL(name,effect);
		
		var link = $("<a href=\""+url+"\" target=\"_blank\">$</a>").css({
						position: "absolute",
						bottom: "4px",
						right: "4px",
						"z-index": 5,
						"font-family": "TF2 Build",
						"font-size": "200%"
					});
		$(this).append(link);
		
	});
}

function tf2tp()
{
	$('[data-quality=5]').not('[data-level=-1]').each(function()
	{
		if (!(typeof $(this).attr('data-particleeffectname') === "undefined"))
		{
			var name = $(this).attr('data-name').trim();
			var effect = $(this).attr('data-particleeffectname').trim();
			switch (effect) {
                    case "Storm":
                        effect = "Stormy-Storm";
                        break;
                    case "Blissard":
                        effect = "Blizzardy-Storm";
                        break;
                    case "Bubbles":
                        effect = "Bubbling";
                        break;
                    case "Orbit-Fire":
                        effect = "Orbiting-Fire";
                        break;
                    case "Orbit-Planets":
                        effect = "Orbiting-Planets";
                        break;
                    case "Green-Bubbles":
                        effect = "Cauldron-Bubbles";
                        break;
            }
			var url = makeURL(name,effect);
			var link = $("<a href=\""+url+"\" target=\"_blank\">$</a>").css({
                        position: "absolute",
                        bottom: "4px",
                        right: "4px",
                        "z-index": 5,
                        "font-size": "200%"
                    });;
			$(this).append(link);
		}
	});
}

function makeURL(name,effect)
{
	name.replace(/ /g,"-");
	effect.replace(/ /g,"-");
	return "http://www.tf2pricecheck.net/Thread-PC-" + effect + "-" + name;
}


})(jQuery);