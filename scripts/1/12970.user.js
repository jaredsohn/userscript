// ==UserScript==
// @name	  Textarea resize
// @namespace	  http://userscripts.org/scripts/show/12970
// @description	  Gives every textarea an icon that you can drag to resize the textarea
// @version	  0.0.1
// @include	  *
// @author	  eschava@gmail.com
// ==/UserScript==

var DEBUG = 0;
function trace (level,msg) { if(DEBUG >= level) GM_log(msg); return; }

if (
 document.documentElement.tagName == "HTML"
 && document.contentType == "text/html"
 && document.body    // Basic sanity
) {
  trace(11, "Starting");
  run();
}

function run () {
  var them = document.getElementsByTagName("textarea");
  if(!(them && them.length)) { trace(11, "No textareas."); return; }
  inits();
  for(var i = them.length - 1; i >= 0; i--) {
    tweak_textarea(them[i]);
  }
  trace(5, them.length.toString() + " textareas");
  return;
}

//	-	-	-	-	-	-	-	-	-

function get_pref (prefname, defaulty) {
  var gotten = GM_getValue(prefname, null);
  if(gotten == null) {
    GM_setValue(prefname, defaulty);
    return defaulty;
  } else {
    return gotten;
  }
}

var Drag_increments, Min_Height, Min_Width, Max_Height, Max_Width;

function inits () {
  // Number of pixels that we grow by at a time:
  Drag_increments = get_pref('drag_increment_size', 15);

  // Constraints (in pixels) on draggable dimensions of textareas:
  Min_Height = get_pref('min_height',	30);
  Min_Width  = get_pref('min_width' ,	30);
  Max_Height = get_pref('max_height', 1400);
  Max_Width  = get_pref('max_width' , 1400);

  return;
}

function tweak_textarea (t) {
  var d	  = t.ownerDocument;
  var p   = t.parentNode;
  var n   = t.nextSibling;

  loadTextareaSize(t);

  var s	 = getComputedStyle(t, "" );
  var
    oh = num(s.height),
    ow = num(s.width ),
    button = d.createElement('img');

    //
  //button.setAttribute('src','resource://gre/res/grabber.gif');
  button.setAttribute('src',"data:image/gif;base64,"+
	"iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAA7DAAAOww"+
	"HHb6hkAAAAVElEQVQokZ3PywkAIAxEwfRfiIKdidhCFFHwFzXrIZDLwD5iIoKPOX0h"+
	"axwIG8LggIKPSrggXaOA3lMP6A4v6Nz4QHKjAu1TlWiGAOqNIKqNH6j8GRf5wjIdNsbvAAAAAElFTkSuQmCC");
  button.setAttribute('alt','grabby');
  button.setAttribute('style','position:relative; left:-15px; top:1px; cursor:nwse-resize;');

  // don't wrap button
  p.style.whiteSpace="nowrap";


  // insert after textarea
  if (n) p.insertBefore(button, n);
  else p.appendChild(button);

  button.title = "Click and drag me to change the textarea's size";

  button.addEventListener('mousedown', function(event) {
      // Yes, I think we really do need this as a closure here-- otherwise
      // there's no (easy) way to work back from the event target to the textarea.
      start_dragging( event, t, button );
      event.preventDefault();
      return;
    },
    true
  );

  if(ow && oh) {
    t.style.height = oh.toString() + "px";
    t.style.width  = ow.toString() + "px";
  }

  return;
}

var Orig_width, Orig_height, Cursor_start_x, Cursor_start_y;

function start_dragging (event, textarea, button) {
  Textarea = textarea;
  Cursor_start_x = event.clientX;
  Cursor_start_y = event.clientY;
  var s = getComputedStyle(textarea, "" );
  Orig_width   = num( s.width  );
  Orig_height  = num( s.height );

  trace(4, "Starting dimensions of textarea: h=" + s.height.toString() +
    " by w=" + s.width.toString());
  textarea.ownerDocument.addEventListener("mousemove", ev_drag_move, true);
  textarea.ownerDocument.addEventListener("mouseup",   ev_drag_stop, true);
  document.body.style.cursor = 'nwse-resize';

  trace(5,"Starting dragging");
  return;
}

function num (i) {
  var m;
  if(typeof(i) == "string") {
    m = i.match( /(\d+)(\.\d+)*px/ );
    // nota bene: yes, the computed style can be fractional, like "123.56px"!!
    if(m) {
      i = parseInt(m[1], 10);
    } else {
      trace(1, "Weird pseudonumerical value: \"" + i + "\"!");
    }
  } else if(typeof(i) == "number") {
    // just fall thru
  } else {
    trace(1, "Weird nonnumerical value: \"" + i + "\"!");
  }
  //trace( typeof(i) + ": " + i.toString() );
  return i;
}


function ev_drag_move (event) {
  var
   new_width  = event.clientX - Cursor_start_x + Orig_width ,
   new_height = event.clientY - Cursor_start_y + Orig_height;

  new_width  = px_between(Min_Width ,new_width , Max_Width,  Drag_increments);;
  new_height = px_between(Min_Height,new_height, Max_Height, Drag_increments);;

  trace(10, "Setting dimensions to h=" + new_height.toString() +
	" w=" + new_width.toString() );

  Textarea.style.width	= new_width;
  Textarea.style.height = new_height;

  event.preventDefault();
  return;
}

function ev_drag_stop (event) {
  // Stop capturing the mousemove and mouseup events.
  document.removeEventListener("mousemove", ev_drag_move, true);
  document.removeEventListener("mouseup",   ev_drag_stop, true);
  event.preventDefault();
  saveTextareaSize(Textarea);
  document.body.style.cursor = 'default';
  return;
}

function px_between (min, i, max, incr) {
  if(incr)  i = Math.floor(i/incr) * incr;
  return(
    (
	 (i > max) ? max
	:(i < min) ? min
	: i
    ).toString() + "px"
  );
}

function saveTextareaSize(textarea) {
    var domain = window.location.host;
    var textareaNameOrId = textarea.name ? textarea.name : (textarea.id ? textarea.id : "default");
    GM_setValue(domain + "/" + textareaNameOrId, textarea.style.width + "," + textarea.style.height);
}

function loadTextareaSize(textarea) {
    var domain = window.location.host;
    var textareaNameOrId = textarea.name ? textarea.name : (textarea.id ? textarea.id : "default");
    var strValue = GM_getValue(domain + "/" + textareaNameOrId, null);
    if (strValue) {
        var size = strValue.split(/\,/);
        textarea.style.width = size[0];
        textarea.style.height= size[1];
    }
}

// End