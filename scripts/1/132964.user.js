// ==UserScript==
// @name       XenForo Enhancer
// @namespace  http://mercenarydesign.com.au/
// @version    0.5
// @description  This will enhance a default XenForo website in a few ways. Allow categories to be collapsed. Poll the server more often to get current alerts and inboxes quicker. And to show alerts and inboxes in the title bar over the favicon.
// @match      http://*/*
// @copyright  2012+, MercenaryDesign.com.au
// ==/UserScript==

var main = function () {

    var Merc = Merc || {};

	/** @param {jQuery} $ jQuery Object */
	!function($, window, document, _undefined)
	{
	    Merc.CategoryCollapse = function($nodeList) { this.__construct($nodeList); };
	    Merc.CategoryCollapse.prototype = {
	    	__construct: function($nodeList)
			{
				var that = this;

				this.cookieName = 'merc-categories-collpased';

				this.$cats = $nodeList.find('.category');
				this.$handleTemplate = $('<a style="float: right; cursor: pointer; margin-top: 2px;" class="Popup PopupOpen"><span class="arrowWidget"></span></a>');
				this.closedCats = this.getClosedCats();

				this.$cats.each(function()
				{
					var $catStrip = $(this).find('.nodeInfo.categoryStrip'),
						$handle = that.$handleTemplate.clone();

					if ($.inArray($(this).attr('id'), that.closedCats) !== -1)
					{
						$handle.removeClass('PopupOpen');
						$(this).find('.nodeList').hide();
					}

					$handle.click($.context(that, 'toggleNodes'));
					$catStrip.prepend($handle);
				});
			},

			getClosedCats: function()
			{
				var cookie = $.getCookie(this.cookieName);

				if (cookie)
					return cookie.split(',');

				return [];
			},

			toggleNodes: function(e)
			{
				var $handle = $(e.currentTarget),
					open = $handle.hasClass('PopupOpen'),
					$cat = $handle.closest('.category'),
					$nodeList = $cat.find('.nodeList'),
					i;

				if (open)
				{
					$nodeList.xfSlideUp();
					$handle.removeClass('PopupOpen');
					this.closedCats.push($cat.attr('id'));
				}			
				else
				{
					$nodeList.xfSlideDown();
					$handle.addClass('PopupOpen');
					for (i in this.closedCats)
					{
						if (this.closedCats[i] == $cat.attr('id'))
						{
							this.closedCats.splice(i, 1);
							break;
						}
					}
				}

				this.saveChanges();
			},

			saveChanges: function()
			{
				$.setCookie(this.cookieName, this.closedCats.join(','), 2592000000);
			}
	    };

	    Merc.SetupAutoPolling = function()
	    {
	    	if (!Merc.loggedIn)
	    		return;

	    	$(document).bind('XFAjaxSuccess', Merc.AjaxSuccess);

	    	Merc.AjaxSuccess();
	    	setInterval(Merc.PollServer, 5000);
	    }

	    Merc.PollServer = function()
	    {
	    	if (!Merc.xhr && new Date().getTime() - Merc.lastAjaxCompleted > 10000)
	    	{
	    		var ajaxStart = $(document).data('events').ajaxStart[0].handler;
	    		$(document).unbind('ajaxStart', ajaxStart);
	    		Merc.xhr = XenForo.ajax('index.php?misc/lightbox', {}, function(){}, { // chose lightbox here because it is the least intensive controller I could find
	    			error: function(xhr, responseText, errorThrown)
	    			{
	    				delete(Merc.xhr);
	    				switch (responseText)
						{
							case 'timeout':
							{
								console.warn(XenForo.phrases.server_did_not_respond_in_time_try_again);
								break;
							}
							case 'parsererror':
							{
								console.error('PHP ' + xhr.responseText);
								break;
							}
						}
						return false;
	    			},
	    			timeout: 10000
	    		});
	    		$(document).bind('ajaxStart', ajaxStart);
	    	}
	    }

	    Merc.AjaxSuccess = function(ajaxData)
	    {
	    	var count = parseInt($('#ConversationsMenu_Counter span.Total').text()) + parseInt($('#AlertsMenu_Counter span.Total').text());

			Tinycon.setBubble(count);

	  		Merc.lastAjaxCompleted = new Date().getTime();

	  		delete(Merc.xhr);
	    }

	    // *********************************************************************
	    // Detect XenForo and init
	    var $html = $('html');
		if (XenForo !== undefined && $html.attr('id') === 'XenForo' && $html.hasClass('Public'))
		{
			Merc.loggedIn = $html.hasClass('LoggedIn');

			//XenForo.register('.nodeList.sectionMain', 'Merc.CategoryCollapse');
			new Merc.CategoryCollapse($('.nodeList.sectionMain'));

			if (!$html.data('pollinterval'))
			{
				/*
				 * Tinycon - A small library for manipulating the Favicon
				 * Tom Moor, http://tommoor.com
				 * Copyright (c) 2012 Tom Moor
				 * MIT Licensed
				 * @version 0.2.6
				*/

				(function(){var Tinycon={};var currentFavicon=null;var originalFavicon=null;var originalTitle=document.title;var faviconImage=null;var canvas=null;var options={};var defaults={width:7,height:9,font:'10px arial',colour:'#ffffff',background:'#F03D25',fallback:true};var ua=(function(){var agent=navigator.userAgent.toLowerCase();return function(browser){return agent.indexOf(browser)!==-1}}());var browser={chrome:ua('chrome'),webkit:ua('chrome')||ua('safari'),safari:ua('safari')&&!ua('chrome'),mozilla:ua('mozilla')&&!ua('chrome')&&!ua('safari')};var getFaviconTag=function(){var links=document.getElementsByTagName('link');for(var i=0,len=links.length;i<len;i++){if((links[i].getAttribute('rel')||'').match(/\bicon\b/)){return links[i]}}return false};var removeFaviconTag=function(){var links=document.getElementsByTagName('link');var head=document.getElementsByTagName('head')[0];for(var i=0,len=links.length;i<len;i++){var exists=(typeof(links[i])!=='undefined');if(exists&&links[i].getAttribute('rel')==='icon'){head.removeChild(links[i])}}};var getCurrentFavicon=function(){if(!originalFavicon||!currentFavicon){var tag=getFaviconTag();originalFavicon=currentFavicon=tag?tag.getAttribute('href'):'/favicon.ico'}return currentFavicon};var getCanvas=function(){if(!canvas){canvas=document.createElement("canvas");canvas.width=16;canvas.height=16}return canvas};var setFaviconTag=function(url){removeFaviconTag();var link=document.createElement('link');link.type='image/x-icon';link.rel='icon';link.href=url;document.getElementsByTagName('head')[0].appendChild(link)};var log=function(message){if(window.console)window.console.log(message)};var drawFavicon=function(num,colour){if(!getCanvas().getContext||browser.safari||options.fallback==='force'){return updateTitle(num)}var context=getCanvas().getContext("2d");var colour=colour||'#000000';var num=num||0;var src=getCurrentFavicon();faviconImage=new Image();faviconImage.onload=function(){context.clearRect(0,0,16,16);context.drawImage(faviconImage,0,0,faviconImage.width,faviconImage.height,0,0,16,16);if(num>0)drawBubble(context,num,colour);refreshFavicon()};if(!src.match(/^data/)){faviconImage.crossOrigin='anonymous'}faviconImage.src=src};var updateTitle=function(num){if(options.fallback){if(num>0){document.title='('+num+') '+originalTitle}else{document.title=originalTitle}}};var drawBubble=function(context,num,colour){var len=(num+"").length-1;var width=options.width+(6*len);var w=16-width;var h=16-options.height;context.font=(browser.webkit?'bold ':'')+options.font;context.fillStyle=options.background;context.strokeStyle=options.background;context.lineWidth=1;context.fillRect(w,h,width-1,options.height);context.beginPath();context.moveTo(w-0.5,h+1);context.lineTo(w-0.5,15);context.stroke();context.beginPath();context.moveTo(15.5,h+1);context.lineTo(15.5,15);context.stroke();context.beginPath();context.strokeStyle="rgba(0,0,0,0.3)";context.moveTo(w,16);context.lineTo(15,16);context.stroke();context.fillStyle=options.colour;context.textAlign="right";context.textBaseline="top";context.fillText(num,15,browser.mozilla?7:6)};var refreshFavicon=function(){if(!getCanvas().getContext)return;setFaviconTag(getCanvas().toDataURL())};Tinycon.setOptions=function(custom){options={};for(var key in defaults){options[key]=custom.hasOwnProperty(key)?custom[key]:defaults[key]}return this};Tinycon.setImage=function(url){currentFavicon=url;refreshFavicon();return this};Tinycon.setBubble=function(num,colour){if(isNaN(parseFloat(num))||!isFinite(num))return log('Bubble must be a number');drawFavicon(num,colour);return this};Tinycon.reset=function(){Tinycon.setImage(originalFavicon)};Tinycon.setOptions(defaults);window.Tinycon=Tinycon})();

				Merc.SetupAutoPolling();
			}
		}
	}
	(jQuery, this, document);
};

// *********************************************************************
// Inject our main script
var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);