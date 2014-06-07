// ==UserScript==
// @name 4chan webm controls
// @namespace 4chan-webm
// @version 1.1.2
// @description Add controls to 4chan webms
// @include http*://i.4cdn.org/*.webm
// ==/UserScript==

(function () {
  'use strict';

  /* options */
  var debug = false;
  var background_color = '#181818';

  /* make sure the current document is a video, otherwise don't run at all */
  // document.contentType is only available in firefox
  if (document.contentType !== undefined) {
    // if document is not an image, return immediately
    if (!(/^video\//.test(document.contentType))) { return; }
  }
  else {
    /* for non-firefox, check that the document consists of a single video */
    if (document.body.childNodes.length !== 1) { return; }
    if (document.body.childNodes[0].tagName !== 'VIDEO') { return; }
  }

  function setup_speed_controls() {
    var video = document.getElementById('video');
    var speed_bar = document.getElementById('speed_bar');
    var speed_value = document.getElementById('speed_value');

    var playback_speed = 1;
    function adjust_playback_speed() {
      video.playbackRate = playback_speed;

      if (speed_bar) {
        if (speed_bar.value != playback_speed*100) {
          speed_bar.value = playback_speed*100;
        }
      }

      if (speed_value) {
        speed_value.innerHTML = Math.round(playback_speed*100)+'%';
      }
    }
    // adjust to the initial speed
    adjust_playback_speed();

    /* there's a bug in firefox where if you pause the video and play again, it
     * will go back to 100% speed, so we have to reset the speed every time */
    if (navigator.userAgent.match(/\bfirefox\b/i)) {
      video.addEventListener('play', adjust_playback_speed);
    }

    function speed_bar_input_handler() {
      playback_speed = speed_bar.value/100;
      adjust_playback_speed();
    }

    if (speed_bar) {
      // adjust speed as the user moves the speed bar
      speed_bar.addEventListener('input', speed_bar_input_handler);
      // just to make sure, adjust on change as well
      speed_bar.addEventListener('change', speed_bar_input_handler);
    }

    var speed_normal = document.getElementById('speed_normal');
    if (speed_normal) {
      speed_normal.addEventListener('click', function() {
        // back to 100%
        playback_speed = 1;
        adjust_playback_speed();
      });
    }
  }

  function setup_zoom_controls() {
    var video = document.getElementById('video');
    var video_container = document.getElementById('video_container');
    var controls = document.getElementById('controls_div');
    var zoom_value = document.getElementById('zoom_value');
    var reload_button = document.getElementById('reload_button');

    function update_debug_div() {
      if (debug) {
        var debug_div = document.getElementById('debug_div');
        if (!debug_div) { return; }
        if (debug_div.style.display === 'none') { return; }

        var video_left = parseInt(video_container.style.left, 10);
        var video_top = parseInt(video_container.style.top, 10);

        debug_div.innerHTML = '';
        // original dimensions
        debug_div.innerHTML += video.videoWidth+','+video.videoHeight;
        // scale
        debug_div.innerHTML += '*'+new_scale.toFixed(2);
        // scaled dimensions
        debug_div.innerHTML += ' = '+Math.round(video.videoWidth*new_scale)+','+Math.round(video.videoHeight*new_scale);
        // translation and centering
        debug_div.innerHTML += ':'+translate_x+'(';
        if (video_left >= 0) debug_div.innerHTML += '+';
        debug_div.innerHTML += video_left+')';
        debug_div.innerHTML += ','+translate_y+'(';
        if (video_top >= 0) debug_div.innerHTML += '+';
        debug_div.innerHTML += video_top+')';
        // window dimensions and (scrolling) position
        debug_div.innerHTML += ' @ '+window.innerWidth;
        debug_div.innerHTML += '(+'+document.body.scrollLeft+')';
        debug_div.innerHTML += ','+window.innerHeight;
        debug_div.innerHTML += '(+'+document.body.scrollTop+')';
      }
    }
    if (debug) {
      window.addEventListener('scroll', update_debug_div);
    }


    function reload_video() { 
      /* The video element here is not like a regular video in a page (it
       * lacks a source, for example), so we can't just reload it.
       * Instead we must replace it with a brand new video element.*/
      var video = document.getElementById('video');

      // create new video using the current url as source
      var source_src = document.location.href;
      var new_video = document.createElement('video');
      var new_source = document.createElement('source');
      new_source.src = source_src;
      new_video.appendChild(new_source);
      video.parentNode.replaceChild(new_video, video);

      // setup video attributes
      new_video.id = 'video';
      new_video.controls = 'controls';
      new_video.autoplay = 'autoplay';
      new_video.loop = 'loop';
      new_video.style.position = 'static';
      new_video.style.margin = '0px';
      new_video.style.maxWidth = video.videoWidth+'px';
      new_video.style.maxHeight = video.videoHeight+'px';

      // setup controls for new video
      wait_for_video();

      // load video
      new_video.load();
    }
    reload_button.addEventListener('click', reload_video);

    var transforms = ['transform', 'WebkitTransform', 'MozTransform', 'msTransform', 'OTransform'];
    var i, transform;
    for (i=0; i < transforms.length; i++) {
      if(video.style[transforms[i]] !== undefined){
        transform = transforms[i];
        break;
      }
    }

    /* initial scale */
    var start_scale = 1;
    var new_scale = 1;

    var translate_x = 0;
    var translate_y = 0;

    // to be set during mouse down
    var initial_scroll_left = 0;
    var initial_scroll_top = 0;

    // higher mouse_video_delta_multiplier means faster scaling.
    // (roughly, mouse_distance_moved*mouse_video_delta_multiplier = change_in_video_dimensions)
    var mouse_video_delta_multiplier = 3;

    function get_page_height(scale) {
      /* return page height at a certain scale:
       * scaled video height + controls height + margins + scrollbar */
      var margin = 10;
      var scrollbar = 0;
      if (video.videoWidth*scale > window.innerWidth) {
        scrollbar = 20;
      }
      if (controls) {
        return Math.round(video.videoHeight*scale + controls.clientHeight + 3*margin + scrollbar);
      }
      return Math.round(video.videoHeight*scale + 2*margin + scrollbar);
    }

    function scale_and_position(is_jump) {
      /* To keep the video centered at all times, we compensate its movement
       * during scaling with an appropriate translation to keep its top-left
       * corner in place, and we set the container's left in order to center it
       * while the video is still smaller than the window (its top remanining
       * always in place). After a dimension grows bigger than the window's, we
       * center the window instead, via scrolling.
       *
       * Notice that we need the video container in order to have the
       * document's body only see an element the size of the scaled video.
       * Without the container and with a large downscaled video, the body will
       * grow enough to contain the original video's dimensions, leaving blank
       * space to its right and/or bottom. Since the container's dimensions
       * follow the scaled video's and its overflow is hidden, we get the exact
       * same behavior from it as we would get from a small video the size of
       * the downscaled video, which is precisely what we want. */

      if (zoom_value) {
        zoom_value.innerHTML = Math.round(new_scale*100)+'%';
      }
      var new_width = video.videoWidth*new_scale;
      var new_height = video.videoHeight*new_scale;

      /* keep video's top-left corner in place (at container's top-left)
       * during scaling */
      translate_x = Math.round(video.videoWidth*(1-1/new_scale)/2);
      translate_y = Math.round(video.videoHeight*(1-1/new_scale)/2);

      video.style[transform] = 'scale('+new_scale+','+new_scale+') translate('+translate_x+'px,'+translate_y+'px)';

      // fit container to scaled video
      video_container.style.width = Math.round(new_width)+'px';
      video_container.style.height = Math.round(new_height)+'px';

      /* center container, but only until it hits the window's boundaries;
       * after that, center window instead */
      var scroll_left = initial_scroll_left;
      var scroll_top = initial_scroll_top;
      if (new_width <= window.innerWidth) {
        // center container by offsetting its dimension by half of how
        // bigger the window's is
        video_container.style.left = Math.round((window.innerWidth - new_width)/2)+'px';

        scroll_left = 0;
      }
      else {
        video_container.style.left = '0px';

        /* when scaling to 100% or coming from a scaled dimension
         * smaller than the window, center window instead of maintaing
         * the current scroll, otherwise, scroll window from current
         * position */
        if (is_jump || video.videoWidth*start_scale <= window.innerWidth) {
          scroll_left = Math.round((new_width - window.innerWidth)/2);
        }
        else {
          // scroll window by half of how much the video grew
          var width_delta = new_width - video.videoWidth*start_scale;
          scroll_left = initial_scroll_left + Math.round(width_delta/2);
        }
      }

      var new_page_height = get_page_height(new_scale);
      if (new_page_height <= window.innerHeight) {
        // center container by offsetting its dimension by half of how
        // bigger the window's is
        video_container.style.top = Math.round((window.innerHeight - new_page_height)/2)+'px';

        scroll_top = 0;
      }
      else {
        video_container.style.top = '0px';

        /* when scaling to 100% or coming from a scaled dimension
         * smaller than the window, center window instead of maintaing
         * the current scroll, otherwise, scroll window from current
         * position */
        if (is_jump || video.videoHeight*start_scale <= window.innerHeight) {
          scroll_top = Math.round((new_page_height - window.innerHeight)/2);
        }
        else {
          // scroll window by half of how much the video grew
          var height_delta = new_page_height - video.videoHeight*start_scale;
          scroll_top = initial_scroll_top + Math.round(height_delta/2);
        }
      }

      /* if document has grown past the window size, horizontally equal the
       * controls div to the video container so it will also remain centered */
      if (new_width <= window.innerWidth) {
        controls.style.width = window.innerWidth+'px';
        controls.style.left = 0;
      }
      else {
        controls.style.width = video_container.style.width;
        controls.style.left = video_container.style.left;
      }
      controls.style.top = video_container.style.top;

      // don't try to scroll to a negative position
      if (scroll_left < 0) { scroll_left = 0; }
      if (scroll_top < 0) { scroll_top = 0; }

      window.scrollTo(scroll_left, scroll_top);

      if (debug) { update_debug_div(); }
    }

    /* keep track of whether the user is performing some other action that
     * involves clicking and dragging, so we can avoid zooming or scolling then */
    var doing_something_else = false;
    video.addEventListener('seeking', function() {
      // ignore the automatic seek event at every loop
      if (this.currentTime > 0) {
        doing_something_else = true;
      }
    });
    video.addEventListener('volumechange', function() {
      doing_something_else = true;
    });

    function scale_on_mouse_drag(event) {
      //starting coordinates
      var start_point = [event.clientX, event.clientY];

      // starting window position
      initial_scroll_left = window.pageXOffset;
      initial_scroll_top = window.pageYOffset;

      var might_be_click = true; // mouse hasn't moved enough, might be a click
      doing_something_else = false;

      function scale_mouse_move_handler(event) {
        /* Scale video according to how farther away on the Y axis from the
         * mousedown position is the mouse now. Down grows the video and up
         * shrinks it. */

        // don't zoom if seeking or changing volume
        if (doing_something_else) { return; }

        var current_point = [event.clientX, event.clientY];
        // don't zoom further if mouse went above the window's top
        if (current_point[1] < 0) {
          current_point[1] = 0;
        }

        var mouse_delta = current_point[1] - start_point[1];

        // arbitrarily chosen amount of pixels the user might accidentally move
        // when actually trying to only click
        var mouse_delta_tolerance = 3;
        if (Math.abs(current_point[0]-start_point[0]) > mouse_delta_tolerance ||
            Math.abs(current_point[1]-start_point[1]) > mouse_delta_tolerance) {
              might_be_click = false;
            }

        // perform zoom
        if (!might_be_click) {

          // scale multiplies the video's dimensions, so we calculate the
          // new scale based on how many pixels we want to add (or
          // subtract) to the video's diagonal
          var video_diagonal = Math.sqrt(Math.pow(video.videoWidth, 2) + Math.pow(video.videoHeight, 2));
          var new_scale_candidate = start_scale + (mouse_delta*mouse_video_delta_multiplier)/video_diagonal;

          // enforce minimum scale (chosen arbitrarily)
          var minimum_dimension = 20;
          if (video.videoWidth*new_scale_candidate >= minimum_dimension &&
              video.videoHeight*new_scale_candidate >= minimum_dimension) {
            new_scale = new_scale_candidate;
          }

          scale_and_position(false);

          event.preventDefault();
          return false;
        }
      }

      function scale_mouse_up_handler(event) {
        start_scale = new_scale;
        document.removeEventListener('mousemove', scale_mouse_move_handler);
        document.removeEventListener('mouseup', scale_mouse_up_handler);
      }

      function scale_mouse_click_handler(event) {
        // stop click's default action unless the mouse was not moved
        video.removeEventListener('click', scale_mouse_click_handler);
        if ((!might_be_click) && (!doing_something_else)) {
          event.preventDefault();
          return false;
        }
      }

      document.addEventListener('mousemove', scale_mouse_move_handler);
      document.addEventListener('mouseup', scale_mouse_up_handler);
      video.addEventListener('click', scale_mouse_click_handler);
    }

    function scroll_on_mouse_drag(event) {
      //starting coordinates
      var start_point = [event.clientX, event.clientY];

      // starting window position
      initial_scroll_left = window.pageXOffset;
      initial_scroll_top = window.pageYOffset;

      doing_something_else = false;
      var scroll_mouse_delta_multiplier = 2;

      function scroll_mouse_move_handler(event) {
        /* scroll page in the opposite direction of mouse movement (so the user
         * is dragging the video in the direction of mouse movement) */

        // don't scroll if seeking or changing volume
        if (doing_something_else) { return; }

        var current_point = [event.clientX, event.clientY];
        var mouse_delta_x = current_point[0] - start_point[0];
        var mouse_delta_y = current_point[1] - start_point[1];

        // a little tolerance to allow seeking and changing volume before we
        // start moving the page around
        var mouse_delta_tolerance = 3;
        if (Math.abs(current_point[0]-start_point[0]) <= mouse_delta_tolerance &&
            Math.abs(current_point[1]-start_point[1]) <= mouse_delta_tolerance) {
              return;
            }

        var scroll_left = initial_scroll_left - mouse_delta_x*scroll_mouse_delta_multiplier;
        if (scroll_left < 0) {
          scroll_left = 0;
        }
        var scroll_top = initial_scroll_top - mouse_delta_y*scroll_mouse_delta_multiplier;
        if (scroll_top < 0) {
          scroll_top = 0;
        }

        window.scrollTo(scroll_left, scroll_top);

        if (debug) { update_debug_div(); }
      }

      function scroll_mouse_up_handler(event) {
        document.removeEventListener('mousemove', scroll_mouse_move_handler);
        document.removeEventListener('mouseup', scroll_mouse_up_handler);
      }

      document.addEventListener('mousemove', scroll_mouse_move_handler);
      document.addEventListener('mouseup', scroll_mouse_up_handler);
    }

    video.addEventListener('mousedown', function(event) {
      // left button: scale
      if (event.button === 0) {
        scale_on_mouse_drag(event);
      }
      // middle button: scroll
      else if (event.button === 1) {
        scroll_on_mouse_drag(event);
      }
    });

    var zoom_normal = document.getElementById('zoom_normal');
    if (zoom_normal) {
      zoom_normal.addEventListener('click', function() {
        // back to 100%
        new_scale = start_scale = 1;
        scale_and_position(true);
      });
    }

    function scale_to_fit() {
      //scale to fit horizontally
      new_scale = window.innerWidth/(video.videoWidth);

      //scale to fit vertically
      if (get_page_height(new_scale) > window.innerHeight) {
        /* calculate scale based on whatever height is left after we discount
         * the overhead */
        var available_height = window.innerHeight - get_page_height(0);
        // chosen arbitrarily
        var minimum_video_height = 20;
        if (available_height < minimum_video_height) {
          available_height = minimum_video_height;
        }
        new_scale = available_height/video.videoHeight;
      }

      start_scale = new_scale;
      scale_and_position(true);
    }

    var zoom_to_fit = document.getElementById('zoom_to_fit');
    if (zoom_to_fit) {
      zoom_to_fit.addEventListener('click', function() {
        // fit to window size
        scale_to_fit();
      });
    }

    /* when going full screen, we must reset the scale to 1, otherwise the user
     * will get a video that is either too small or too big for his screen */
    video.addEventListener('dblclick', function() {
        new_scale = start_scale = 1;
        scale_and_position(true);
    });

    /* apply starting values immediately if the video is already loaded (for
     * example, if it is already in cache) or sets event listener to do so
     * once it gets loaded */
    function apply_starting_values() {
      scale_and_position();
      window.addEventListener('resize', function() {
        scale_and_position(true);
      });

      /* video container centers initially because we haven't set width yet
       * (since we don't have the video's width available), but after the
       * initial scale_and_position, we must change its text-align to left */
      video_container.style.textAlign = 'left';

      // fit window on load (only if video is big enough)
      if (video.clientWidth > window.innerWidth || get_page_height(1) > window.innerHeight) {
        scale_to_fit();
      }
    }

    apply_starting_values();
  }

  var controls_created = false;
  function create_controls() {
    if (!controls_created) {
      var body = document.body;
      body.id = 'body';
      body.style.display = 'inline';
      body.style.margin = '0';
      body.style.background = background_color;

      var videos = document.getElementsByTagName('video');
      if (videos.length === 0) { return; }

      var video = videos[0];
      video.id = 'video';
      video.loop = 'loop';
      video.autoplay = 'autoplay';
      video.style.position = 'static';
      video.style.margin = '0px';
      video.style.maxWidth = video.videoWidth+'px';
      video.style.maxHeight = video.videoHeight+'px';

      var video_container = document.createElement('div');
      video_container.id = 'video_container';
      video_container.appendChild(video);
      video_container.style.overflow = 'hidden';
      video_container.style.position = 'relative';
      video_container.style.marginTop = '10px';
      body.appendChild(video_container);
      video.play();

      // create controls div
      var controls_div = document.createElement('div');
      controls_div.id = 'controls_div';
      controls_div.style.position = 'relative';
      controls_div.style.color = '#fff';
      controls_div.style.textAlign = 'center';
      controls_div.style.marginTop = '10px';
      controls_div.innerHTML = '<div><input type="range" id="speed_bar" value="100" min="10" max="200" step="1" /></div><div>playback speed: <span id="speed_value">100%</span> <button id="speed_normal">reset</button></div><div>click and drag the video up or down to zoom</div><div>zoom: <span id="zoom_value">100%</span> <button id="zoom_normal">reset</button><button id="zoom_to_fit">fit</button></div><div><button id="reload_button">reload video</button></div>';

      body.appendChild(controls_div);

      var debug_div;
      if (debug) {
        debug_div = document.createElement('div');
        debug_div.style.position = 'fixed';
        debug_div.style.top = '10px';
        debug_div.style.left = '10px';
        debug_div.style.background = '#000';
        debug_div.style.color = '#fff';
        debug_div.style.zIndex = '1000';
        debug_div.style.display = 'inline';
        debug_div.id = 'debug_div';
        body.appendChild(debug_div);
        debug_div = document.getElementById('debug_div');
      }

      controls_created = true;
    }

    setup_speed_controls();
    setup_zoom_controls();
  }

  function wait_for_video() {
    var videos = document.getElementsByTagName('video');
    if (videos.length === 0) { return; }
    var video = videos[0];
    if (video.readyState >= 2) {
      create_controls();
    }
    else {
      video.addEventListener('loadeddata', create_controls);
    }
  }

  if (document.getElementsByTagName('video').length > 0) {
    wait_for_video();
  }
  else {
    window.addEventListener('load', wait_for_video);
  }
}());
