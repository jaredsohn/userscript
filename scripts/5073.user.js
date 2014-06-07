/* -*-mode:JavaScript;coding:latin-1;-*- Time-stamp: "2006-08-09 16:18:45 ADT"
##### This is a Greasemonkey user script.
##### To use it, you need Greasemonkey first: http://greasemonkey.mozdev.org/
*/
// ==UserScript==
// @name	  Textarea_drag_resize
// @namespace	  http://interglacial.com/
// @description	  Gives every textarea an icon that you can drag to resize the textarea
// @version	  0.0.2
// @include	  *
// @author	  sburke@cpan.org
// ==/UserScript==
/*
			"Textarea Drag-Resize"

This GreaseMonkey script puts a little "+"-shaped resizer icon next to
every textarea; clicking and dragging that icon will resize its textarea.

*/

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

  var s	 = getComputedStyle(t, "" );
  var
    oh = num(s.height),
    ow = num(s.width ),
    td2 = make_table(d,t),
    button = d.createElement('img');

  button.setAttribute('src','resource://gre/res/grabber.gif');
  button.setAttribute('height',12);
  button.setAttribute('width' ,12);
  button.setAttribute('alt','grabby');

  td2.appendChild(button);
  td2.style.verticalAlign = "bottom";

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

function make_table (doc,textarea) {
  var
   table = doc.createElement( 'table' ),
   tbody = doc.createElement( 'tbody' ),
   tr	 = doc.createElement( 'tr'    ),
   td1	 = doc.createElement( 'td'    ),
   td2	 = doc.createElement( 'td'    );

  tr.appendChild(td1);
  tr.appendChild(td2);
  tbody.appendChild(tr);
  table.appendChild(tbody);

  textarea.parentNode.replaceChild( table, textarea );
  td1.appendChild(textarea);
  td1.style.verticalAlign = "bottom";

  table.style.borderSpacing = "0px";

  return td2;
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

// End
