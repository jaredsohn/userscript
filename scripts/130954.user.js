// ==UserScript==
// @name           Youtube Hovercard
// @version        1.0
// @description    Add video title and description under youtube links.
// @namespace      djnemec
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include        http://*
// @include        https://*
// ==/UserScript==


/* Loads the hoverIntent jQuery plugin.
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 */
(function($) {
	$.fn.hoverIntent = function(f,g) {
		// default configuration options
		var cfg = {
			sensitivity: 7,
			interval: 100,
			timeout: 0
		};
		// override configuration options with user supplied object
		cfg = $.extend(cfg, g ? { over: f, out: g } : f );

		// instantiate variables
		// cX, cY = current X and Y position of mouse, updated by mousemove event
		// pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
		var cX, cY, pX, pY;

		// A private function for getting mouse position
		var track = function(ev) {
			cX = ev.pageX;
			cY = ev.pageY;
		};

		// A private function for comparing current and previous mouse position
		var compare = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			// compare mouse positions to see if they've crossed the threshold
			if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
				$(ob).unbind("mousemove",track);
				// set hoverIntent state to true (so mouseOut can be called)
				ob.hoverIntent_s = 1;
				return cfg.over.apply(ob,[ev]);
			} else {
				// set previous coordinates for next time
				pX = cX; pY = cY;
				// use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
				ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
			}
		};

		// A private function for delaying the mouseOut function
		var delay = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			ob.hoverIntent_s = 0;
			return cfg.out.apply(ob,[ev]);
		};

		// A private function for handling mouse 'hovering'
		var handleHover = function(e) {
			// copy objects to be passed into t (required for event object to be passed in IE)
			var ev = jQuery.extend({},e);
			var ob = this;

			// cancel hoverIntent timer if it exists
			if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

			// if e.type == "mouseenter"
			if (e.type == "mouseenter") {
				// set "previous" X and Y position based on initial entry point
				pX = ev.pageX; pY = ev.pageY;
				// update "current" X and Y position based on mousemove
				$(ob).bind("mousemove",track);
				// start polling interval (self-calling timeout) to compare mouse coordinates over time
				if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

			// else e.type == "mouseleave"
			} else {
				// unbind expensive mousemove event
				$(ob).unbind("mousemove",track);
				// if hoverIntent state is true, then call the mouseOut function after the specified delay
				if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
			}
		};

		// bind the function to the two event listeners
		return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover);
	};
})(jQuery);

function main(){
  var hovering = false;
  var hovercard_html = '<div id="yt-hover" style="'+
    'position: absolute;' +
    'padding: 3px;' +
    'background: white;' +
    'border: 1px solid black;' +
    'width: 300px;' +
    '"></div>';
    
  function yt_hide(){
    if(!hovering){
      $("#yt-hover").fadeOut(function(){
        $(this).remove();
      });
    }
  }
    
  $('a[href*="youtube.com"]').hoverIntent(
    function(){
      var card = $(hovercard_html);
      card.mouseover(function(){ hovering = true; });
      card.mouseout(function(){ hovering = false; setTimeout(yt_hide, 100); });

      var link = $(this).first();
      var vid = link.attr('href').match(/[?&]v=([_A-Za-z\d]+)/);      
      if(vid && vid[1]){
        vid = vid[1];

        hovering = true;
        $.ajax({
          url: 'https://gdata.youtube.com/feeds/api/videos/' + vid + '?v=2&alt=json',
          type: 'GET',
          dataType: 'json',
          beforeSend: function () {
            card.append('<p class="loading-text">Loading video data...</p>');
          },
          success: function (data) {
            data = data.entry;
            var content = '<div>';
            if(data.media$group){
              if(data.media$group.media$thumbnail.length > 0){
                var thumb = data.media$group.media$thumbnail[0];
                content += '<img src="' + thumb.url + '" ';
                content += 'style="top:0;max-height: 64px; max-width: 64px; float: right;"';
                content += ' />';
              }
            }
            content += '<h2>';
            if(data.title){
              content += data.title.$t;
            }
            if(data.title && data.author){
              content += ' - ';
            }
            if(data.author.length > 0){
              content += data.author[0].name.$t;
            }
            content +='</h2>';
            if(data.media$group){
              if(data.media$group.media$description){
                content += '<p>' + data.media$group.media$description.$t + '</p>';
              }
            }
            content += '</div>';
            card.append(content);
          },
          error: function(jqXHR, textStatus, errorThrown) {
            card.append('<p>Error retrieving info: ' + errorThrown + '</p>');
          },
          complete: function () {
            $('.loading-text').remove();
          }
        });
      }
      else{
        card.append('<p>Could not parse valid video ID</p>');
      }

      $("body").append(card);
      
      var pos = link.offset();
      pos.top += link.height();
      card.offset(pos);
      card.fadeIn();
    },
    function(){
      hovering = false;
      setTimeout(yt_hide, 100);
    }
  );
}

main();
//window.addEventListener("load", main, false);
