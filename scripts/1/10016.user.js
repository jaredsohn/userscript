/* -*-mode:JavaScript;coding:latin-1;-*- Time-stamp: "2006-08-09 16:18:45 ADT"
##### This is a Greasemonkey user script.
##### To use it, you need Greasemonkey first: http://greasemonkey.mozdev.org/
*/
// ==UserScript==
// @name	  Textarea Drag Resize
// @namespace	  http://userscripts.org/scripts/show/10140
// @description	  Gives every textarea an icon that you can drag to resize the textarea
// @version	  0.0.6
// @include	  *
// @author	  mjk4984@yahoo.com
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
  var hidden = 0;	
  var them = document.getElementsByTagName("textarea");
  if(!(them && them.length)) { trace(11, "No textareas."); return; }
  inits();
  for(var i = them.length - 1; i >= 0; i--) {
	// only add resizer for visible text areas
	if ((them[i].style.display == "none") || (them[i].style.visibility == "hidden") || (them[i].style.visibility == "collapse")) {
	  hidden++;
	  continue;
    }
    tweak_textarea(them[i]);
  }
  trace(5, them.length.toString() + " textareas. " + hidden + " hidden.");
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

  var s	 = getComputedStyle(t, "" );
  var
    oh = num(s.height),
    ow = num(s.width ),
    br = d.createElement('br');
    button = d.createElement('img');

  button.setAttribute('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAANbY1E9YMgAAAAZiS0dEAP4A/gD+6xjUggAAAAlwSFlzAAAASAAAAEgARslrPgAAAAl2cEFnAAAAEAAAABAAXMatwwAAAnRJREFUOMtdkb2LnWUQxX8zz/O8d2+ycXezcZMsu5pNjKCkEEQtg7FzwVoLK8XCP8DS0kqsRBDsQsDGwj9AsYgEYpQ0il0gSMjmSoL5uB/v+85zLO69unpgZpqZw5lz7O3XngZYB96VdMfMfkV6B7d9w/aAkHQb+BH4GrjGIdiC4HXg+5RyjdqPShmc9JQwDKkSfUdEIOkx8CFweUngi3kg+MNT8pybk2YwWDlCaRpyacjNgJQLZrYKfAKcOkywDVwpTbMjBIgyWCHlTMplPtO83B2pbkt6c0mQgQ/M/aWUMqUMyKWQcgFz5IK+RS7cAwxybtzdPm3b9hczu+nAW26G/WvLvLtjZpgZ7k6V6NqOZ8+c5bnnX9wQ+lLShgMviKX4Za8oAqmCQde1zCZjdp/ZY3PrNGvrG5ze3n211ngvA6Eqag1qBOE9QphVkJiMH9PNZpzZO8fmiS2ia1FKbJ3a5s/RwfsZuCHpYt/3/zygWqk1mE0nNKWwd/Y8x55ao+s6zOYvllwopTmXgc+Bi4qgl+bHUXE31tfWOX5ii5QLs9kUcyd5wswWe/FXurBz9DdgBLxssOrmDIdDNo5vMjyyiiSqAhMIMAMzYzoZMxrdvZoX1n8B/A58uzJcWW3KgL7rkSbkXEiRIUNSpZcwjEePHhJ9fz1d2Dm6zO8WMOr7fl+SS/M8JEDznGqti6SMewd32rZrP878F1/VWgfT6eSziGia2lBrpeYgK0ieMTOeTB8yHj/52d1vHFawxE/A1Yg4HxG7NaqhihYeSJUH9+/TdbOPzOzm/xUs8QPwRkRcioj9tp2+YubHzFxCViO+M/NvAP4G5mU5HGMdSjgAAAAielRYdFNvZnR3YXJlAAB42nNMyU9KVfDMTUxPDUpNTKkEAC+cBdSuDKlNAAAAAElFTkSuQmCC');
  button.setAttribute('height',16);
  button.setAttribute('width' ,16);
  button.setAttribute('alt','squirrel');

  // insert after textarea
  if (n) p.insertBefore(button, n);
  else p.appendChild(button);
  
  // Don't wrap button
  p.style.whiteSpace = "nowrap";
  for (var elem in p.childNodes) {
	  if (p.childNodes[elem].style) p.childNodes[elem].style.whiteSpace = "normal";
  }

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
  Orig_Button_Top = num ( getComputedStyle(button,"").top );

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