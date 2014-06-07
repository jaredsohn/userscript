// ==UserScript==
// @name           Newgrounds Embed
// @namespace      ngVideoEmbed@snakehole.net
// @description    Converts links to embeds
// @include        http://www.newgrounds.com/bbs/topic/*
// @include        http://www.newgrounds.com/pm/read/*
// @include        *.newgrounds.com/*
// @include        http://www.newgrounds.com/bbs/search/author/*
// @exclude        http://ads.newgrounds.com/*
// ==/UserScript==

function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
};

with_jquery(function($) {
	$(document).ready(function(){
		// start function
		var icons = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAALuCAYAAABxUUxEAAAAAXNSR0IArs4c6QAAAAZiS0dEAH0AdQB1ilSwCQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDDgkZBnPlTLUAAAHvSURBVHja7doxa1NBAAfwS4mUQgOti20nG7vVJoi7WAJxcXMRrA4F/QBCN510K/gBHDrYCi5uLhZCxF0k0Wy2cWrsYocGilR4Ti8k7T3bOFTQ32+59+7yv7xH4A+BCwEAAAAAAAAAAAAAAAAAAAAAAACAf0bu6MTNajW5Ui5nBj42GuHN5mYuhBBGji7Ggm9rtd7Yv56P7b7Vbg/czxWLYavdDnPF4sB8NPxlezvzsS/NzvauR2IfuFGphNPM57K+4fHKSpK+Zxp6srqaG+rnSDcBAAAAAAAAAOC/cOxwydWlmeTitfOZga/vv4cPGzvx0zuxYONVpzf2r0cP4Oy2ugP3UwuFsNvqhqmFwsB8NPzt037mY1+YH+9dR0/vlG9Ph9PMZ57GufX8cpK+Zxp6/eDzcKd30k0Azqj0l2dmkuuTk5mBd3t7YW0no/RjwY1Opzf2r0d7u9kdLP1SoRCa3W4oFU5R+s397NIvjZ9Q+kvT8dI/Op9Z4i/m55P0PdPQvVZruNJPNwE4o9J/tjyW3FkczQy8rP8ID9cO4qUfCz5aP+iN/evR3q43DwfuK+V8qDcPQ6WcP7n0a42fmY+9WDr3+9J/encsDDN//E/K+kSyuz6R3K+OJun10D/HH4UAAAAAAAAAAAAAAADgr/sFSnGGeBFRCPUAAAAASUVORK5CYII=)';
		var bbsStyles = $('<style type="text/css">div.podcontent > p > a[href*="http://"].slideLink, a.outside.slideLink, div.wikitext > div.podcontent > a[href*="http://"].slideLink, .bbstext p a[rel*="exlink"].slideLink {background-image: ' + icons + ';}</style>');
		var pmStyles = $('<style type="text/css">#pmmessage .textblock * a[href*="http://"].slideLink {background: ' + icons + ' no-repeat scroll right -325px transparent; margin-right: 3px; padding-right: 15px; background-position: right -525px;}</style>');
		$('body').append(bbsStyles);
		$('body').append(pmStyles);

		$('.bbstext > .textblock * a, #pmmessage .textblock * a, .fatcol div .podcontent * a, #sortable_sections.fatcol #pod_type_1 .podcontent * a, #main .three3 .podcontent * a').each(function(index) {
		    var videoEmbedCode, videoEmbed, w=700, h=394, href=this.href.toString();
		    if(!location.href.match(/(\.newgrounds.com\/bbs)|(\.newgrounds.com\/pm)/))
		    {
		    	w=590, h=332;
		    }

		    //begin checking and parsing links
			if(href.match(/(youtube\.com)(.*)?(v=)/)) // is youtube
		    {
		    	videoEmbedCode = '<object type="application/x-shockwave-flash" data="http://www.youtube.com/v/' + href.match(/(?:v=)([^&]{11})/)[1] + '?version=3&fs=1&enablejsapi=1" width="' + w + '" height="' + h + '"><param name="allowFullScreen" value="true"></param><param name="allowScriptAccess" value="always"></object>';
		    }
			else if(href.match(/(youtu\.be)/)) // is youtube shortcode
		    {
		    	videoEmbedCode = '<object type="application/x-shockwave-flash" data="http://www.youtube.com/v/' + href.match(/(?:youtu\.be\/)([^&]{11})/)[1] + '?version=3&fs=1&enablejsapi=1" width="' + w + '" height="' + h + '"><param name="allowFullScreen" value="true"></param><param name="allowScriptAccess" value="always"></object>';
		    }
			else if(href.match(/(youtube\.com\/playlist)(.*)?(list=)/)) // is youtube playlist
		    {
		    	videoEmbedCode = '<object type="application/x-shockwave-flash" data="http://www.youtube.com/v/videoseries?version=3&fs=1&enablejsapi=1&list=' + href.match(/(?:list=)([^&]+)/)[1] + '" width="' + w + '" height="' + h + '"><param name="allowFullScreen" value="true"></param><param name="allowScriptAccess" value="always"></object>';
		    }
		    else if(href.match(/(vimeo\.com\/)([d]*)/)) // is vimeo video 
		    {
		    	videoEmbedCode = '<object type="application/x-shockwave-flash" data="http://vimeo.com/moogaloop.swf?clip_id=' + href.match(/(?:vimeo.com\/)([^&]+)/)[1] + '&server=vimeo.com&byline=1&portrait=0;color=00adef&fullscreen=1&api=1" width="' + w + '" height="' + h + '"><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="http://vimeo.com/moogaloop.swf?clip_id=' + href.match(/(?:vimeo.com\/)([^&]+)/)[1] + '&server=vimeo.com&byline=1&portrait=0;color=00adef&fullscreen=1&api=1" /></object>';
		    }
		    else if(href.match(/(blip\.tv)/)) // is blip.tv
		    {
		    	$.ajax({
		    	  url: 'http://blip.tv/rss/view/' + href.match(/(?:-)([0-9]+$)/)[1],
		    	  context: $(this),
		    	  dataType: 'text',
		    	  success: function(data){
		    	    videoEmbedCode = '<embed width="' + w + '" height="' + h + '" wmode="transparent" allowfullscreen="true" allowscriptaccess="always" type="application/x-shockwave-flash" src="http://blip.tv/play/' + data.match(/(?:<blip:embedLookup>)(.+)(?:<\/blip:embedLookup>)/)[1]+ '">';
		    	    $(this).addClass("slideLink");
		    	    videoEmbed = $('<div class="embeddedVideo" style="width:' + w + 'px; height:' + h + 'px; margin:auto; clear:both; padding:6px 0;">'+ videoEmbedCode + '</div>');
		    	    videoEmbed.insertAfter($(this));
		    	    videoEmbed.hide();
		    		$(this).click(function(event) {
		    			switch (event.which) {
		    			    case 1:
		    					event.preventDefault();
		    					videoEmbed.slideToggle("fast", function() {
    								// Animation complete.
    								if($(this).next().is(":hidden"))
    								{
    									if($('object', $(this).next()))
    									{
    										$('object', $(this).next()).sendEvent("pause");
    									}
    								}
  								});
		    					break;
		    			}
					});
		    	  },
		    	  error:function (xhr, ajaxOptions, thrownError){
		    	  	return true;
		    	  }
		    	});
			return true;
		    }
		    // start SOUNDCLOUD oEmbed audio
		    else if(href.match(/(soundcloud\.com\/.)/)) // is soundcloud link
		    {
		    	$.ajax({
		    	  url: 'http://soundcloud.com/oembed?format=json&show_artwork=true&maxheight=205&iframe=false&url=' + href, // iframe=false forces a more compact player
		    	  context: $(this),
		    	  dataType: 'json',
		    	  success: function(data){
		    		videoEmbedCode = data.html.toString();
		    		$(this).addClass("slideLink");
		    	    videoEmbed = $('<div class="embeddedVideo" style="width:' + w + 'px; min-height:' + data.height + 'px; margin:auto; clear:both; padding:6px 0;">'+ videoEmbedCode + '</div>');
		    	    videoEmbed.insertAfter($(this));
		    	    videoEmbed.hide();
		    	    $(this).click(function(event) {
		    			switch (event.which) {
		    			    case 1:
		    					event.preventDefault();
		    					videoEmbed.slideToggle("fast");
		    					break;
		    			}
					});
		    	  },
		    	  error:function (xhr, ajaxOptions, thrownError){
		    	  	return true;
		    	  }
		    	});
		    }
		    // unsupported link
		    else
		    {
		    	return true;
		    }
		    // end link checking
		    if(!videoEmbedCode)
		    {
		    	return true;
		    }
		    $(this).addClass("slideLink");
		    videoEmbed = $('<div class="embeddedVideo" style="width:' + w + 'px; margin:auto; clear:both; padding:6px 0;">'+ videoEmbedCode + '</div>');
		    videoEmbed.insertAfter($(this));
		    videoEmbed.hide();

		    $(this).click(function(event) {
		    	switch (event.which) {
		    	    case 1:
		    			event.preventDefault();
		    			videoEmbed.slideToggle("fast", function() {
    						// Animation complete.
    						if($(this).next().is(":hidden"))
    						{
    							if($('object', $(this).next()))
    							{
    								try{$('object', $(this).next()).pauseVideo();}catch(e){};
    								try{$('object', $(this).next()).api_pause();}catch(e){};
    							}
    						}
  						});
		    			break;
		    	}
			});
		});
	});
});