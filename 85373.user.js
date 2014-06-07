// ==UserScript==
// @name           Tuner-Upper
// @namespace      checkerknights
// ==/UserScript==


if (location.href.match(/voice.paly.net/gi)) {
	try {
		location.assign("javascript: $.fn.spotlightbox = function(args) { \
		  var autorotate = args.autorotate; \
		  var context = this; \
		  var shown = $('.show', context); \
		  var number_elements = $('.element', context).length; \
		   \
		  function init() { \
			shown.empty(); \
			$(context).find('.element:first a:first').clone().appendTo(shown); \
			$(context).find('.element:first .sub').clone().appendTo(shown); \
		 \
			selectors = $(context).find('.selectors'); \
			i = 1; \
			$(context).find('.element').each(function () { \
			  $('<a />').addClass('selector').text(i).appendTo(selectors); \
			  i++; \
			}); \
			$('a.selector:not(.prev):not(.next):first', selectors).addClass('selected'); \
		 \
			if(number_elements > 1) { \
			  $('<a />').addClass('selector prev').html('&laquo;').prependTo(selectors).attr('disabled', 'disabled'); \
			  $('<a />').addClass('selector next').html('&raquo;').appendTo(selectors).attr('disabled', 'disabled'); \
			  \
			  $('a.selector:not(.prev):not(.next)', context).click(function() { \
				index = $('a.selector:not(.prev):not(.next)', context).index($(this)); \
		 \
				switchSpotlight(index); \
			  }); \
			  $('a.selector.next', context).click(function() { changeSpotlight(1); }); \
			  $('a.selector.prev', context).click(function() { changeSpotlight(-1); }); \
			   \
			} \
		 \
			selectors.show(); \
		  } \
		 \
		  function switchSpotlight(index) { \
			$('a.selected', context).removeClass('selected'); \
			$('a.selector:not(.prev):not(.next)', context).eq(index).addClass('selected'); \
			shown.fadeOut(400, function() { \
			  $(this).empty(); \
			  $(context).find('.element:not(.prev):not(.next)').eq(index).find('a:first').clone().appendTo(shown); \
			  $(context).find('.element:not(.prev):not(.next)').eq(index).find('.sub').clone().appendTo(shown); \
			  $(this).fadeIn(400); \
			}); \
		  } \
		 \
		  function changeSpotlight(amount) { \
			current = $('a.selector:not(.prev):not(.next)', context).index($('a.selector.selected', context)); \
			current += amount; \
			if(current > (number_elements - 1)) current = 0; \
			else if(current < 0) current = (number_elements - 1); \
			switchSpotlight(current); \
		  } \
		  init(); \
		};  void(0);");
	}
	catch (err) { }
	var headerImage = document.evaluate('//img[@src]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<headerImage.snapshotLength; i++) {
		headerItem = headerImage.snapshotItem(i);
		if (headerItem.src.search(/themes\/voicefront\/images\/spirit-.+\/*/gi) == -1) continue;
		
		switch ((new Date()).getDay()) {
		case 1: headerItem.src = "/themes/voicefront/images/spirit-2010/monday.jpg"; break;
		case 2: headerItem.src = "/themes/voicefront/images/spirit-2010/tuesday.jpg"; break;
		case 3: headerItem.src = "/themes/voicefront/images/spirit-2010/wednesday.jpg"; break;
		case 4: headerItem.src = "/themes/voicefront/images/spirit-2010/friday.jpg"; break;
		case 5: headerItem.src = "/themes/voicefront/images/spirit-2010/saturday.jpg"; break;
		}
	}
}

