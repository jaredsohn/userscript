// ==UserScript==
// @name        /b/ hideFags
// @description hides faggots via 4chan-ID on /b/ -- click 'n hide
// @namespace   wat
// @include     /https?://boards\.4chan\.org/b/res/[0-9]+/
// @version     11
// @require 	http://code.jquery.com/jquery-latest.min.js
// @require     https://raw.github.com/odyniec/MonkeyConfig/master/monkeyconfig.js
// ==/UserScript==

//hideFags();
var hidden = new Array();
var processed = new Array();

$(document).ready(init);


(function($){
     $.fn.extend({
          center: function () {
                return this.each(function() 
				{
					var wnd = $(window);
					var _this = $(this);
					var top = (wnd.height()- _this.height()) / 2 +wnd.scrollTop();
					var left = (wnd.width() - _this.width()) / 2 +wnd.scrollLeft();
					_this.css({position:'absolute', margin:0, top: (top > 0 ? top : 0)+'px', left: (left > 0 ? left : 0)+'px'});
					return _this;
                });
        }
     });
})(jQuery);


function q(next)
{
	var span = $(this).text();
	var id = getID(span);
	
	if(jQuery.inArray(id, processed) == -1)
	{
		console.log("processing " + id + " ...");
		if(jQuery.inArray(id, hidden) != -1)
		{
			console.log("memorized faggot " + id + " spotted, trying to hide him ...");
			_FAG(id);
		}
		else
		{
			var samefags = $('div.post').has("span.posteruid:contains('" + id + "')");		
			arrows = samefags.prev('div.sideArrows');
			arrows.css('cursor', 'pointer');
			arrows.hover(function(){_in(this)}, function(){_out(this)});
			arrows.click(function(){FAG(id)});
		}
		processed.push(id);
	}
	next();		
}

function init()
{
	//GM_deleteValue("niggers");
	$('div.post').css('border', '1px solid transparent');
	console.log("INIT");
	
	//console.log("len : " + uids.length + (uids.length > 0 ? (", content : " + uids.toString()) : ""))
		
	var nigs = GM_getValue("niggers");
	if(nigs)
		hidden = nigs.split("%%");
	
	console.log("found " + hidden.length + " nigs ...");
	
	var everyone = $("span.posteruid");
	everyone.queue("fx", q);
	
	
	var cfg = new MonkeyConfig({
		title: 'awesome hideFags Configuration',
		menuCommand: true,
		params: {
			Fag_timeout: {
				type: 'select',
				choices: [ '10 minutes', '30 minutes', '1 hour', '3 hours', '6 hours', '12 hours', '24 hours' ],
				default: '6 hours'
			},
			// auto_adjust: {
				// type: 'checkbox',
				// default: true
			// }
		}
	});
	
}
function getID(span)
{
	var arr = span.split(":");
	//console.log("splitted array-len : " + arr.length);
	var id = arr[1];
	return jQuery.trim(id.slice(0, id.indexOf(')')));
}

function initSettings()
{
	var _hidden = GM_getValue("niggers");	
	
	if(_hidden)
	{
		console.log("cfg-string : " + _hidden);
		hidden = _hidden.split("%%");
	}
		
}

function _FAG(id)
{
	//var fagSpan = $(e).next('div.post').find('span.posteruid').text();
	//var id = getID(fagSpan);
	console.log("hiding faggot " + id);
	var arrows = $("span.posteruid:contains('" + id + "')");
	var posts = $('div.post').has(arrows);
	var container = arrows.parents("div.postContainer");
	
	container.toggle();
	
	var txtSel = 	"<a class='hideFags_replacement' href='javascript:void 0'><font color='" +
					"green" + 
					"'>" + "(hidden faggot)" + 
					"</font><BR></a>";
	var txt = $(txtSel);	
	container.after(txt);
	var allTXTs = $("a.hideFags_replacement");
	allTXTs.css("cursor", "pointer");
	allTXTs.click(function(){onwardsToRainbow(this)});	
	
	if(jQuery.inArray(id, hidden) == -1)
	{
		hidden.push(id);
		var cfg = hidden.join("%%");
		console.log("new cfg-string : " + cfg);
		GM_setValue("niggers", cfg);		
	}
}

function FAG(id)
{
	//var fagSpan = $(e).next('div.post').find('span.posteruid').text();
	//var id = getID(fagSpan);
	console.log("hiding faggot " + id);
	var arrows = $("span.posteruid:contains('" + id + "')");
	var posts = $('div.post').has(arrows);
	var container = arrows.parents("div.postContainer");	
	
	container.toggle('slow', 'swing');
	
	
	var txtSel = 	"<a class='hideFags_replacement' href='javascript:void 0'><font color='" +
					"green" + 
					"'>" + "(hidden faggot)" + 
					"</font><BR></a>";
	var txt = $(txtSel);	
	container.after(txt);
	var allTXTs = $("a.hideFags_replacement");
	allTXTs.css("cursor", "pointer");
	allTXTs.click(function(){onwardsToRainbow(this)});	
	
	if(jQuery.inArray(id, hidden) == -1)
	{
		hidden.push(id);
		var cfg = hidden.join("%%");
		console.log("new cfg-string : " + cfg);
		GM_setValue("niggers", cfg);		
	}
}

function onwardsToRainbow(e)
{
	var fagSpan = $(e).prev('div.postContainer').find('span.posteruid').text();
	var id = getID(fagSpan);
	var arrows = $("span.posteruid:contains('" + id + "')");
	var posts = $('div.post').has(arrows);
	var container = arrows.parents("div.postContainer");
	container.toggle('slow', 'swing');
	container.next("a.hideFags_replacement").remove();
	
	var index = jQuery.inArray(id, hidden);
	if(index != -1)
	{
		console.log("removing fag " + id + " from list!");
		hidden.splice(index, 1);
		var newcfg = hidden.join("%%");
		console.log("new cfg-string : " + newcfg);
		GM_setValue("niggers", newcfg);			
	}	
}

function _in(e)
{
	var id = getID($(e).next('div.post').find('span.posteruid').text());
	//console.log("trying to highlight post "+id);
	var posts = $('div.post').has("span.posteruid:contains('" + id + "')");
	posts.css('border', '1px solid red');
}

function _out(e)
{
	var id = getID($(e).next('div.post').find('span.posteruid').text());
	//console.log("trying to un-highlight post "+id);
	var posts = $('div.post').has("span.posteruid:contains('" + id + "')");
	posts.css('border', '1px solid transparent');
}


