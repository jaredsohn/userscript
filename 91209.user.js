// ==UserScript==
// @name          Google Reader Not Interested
// @namespace     http://reader.google.com
// @description   Add a key shortcut to google reader
// @include       http://*/reader/view/*
// @include       https://*/reader/view/*
// ==/UserScript==

// Based upon "Google Reader - Open in background tab" chrome extension ~ https://chrome.google.com/extensions/detail/lcimnckjiicikfpppcgnjhiflibbnbel

(function () {
var is_google = function (host) {
  return host.match('.*\.google\..*');
}

if (! is_google(document.location.host)) { return; }

var is_press_key = function (e, key, with_shift) {
	return (! at_input_area(e)
          && ! (e.altKey || e.ctrlKey || e.metaKey)
          && e.which == key
          && (with_shift == false || (with_shift == true && e.shiftKey)));
}

var at_input_area = function (e) {
  area_name = e.target.nodeName.toLowerCase();
  return area_name == 'input' || area_name == 'textarea';
}

var note_dislike = function (node) {
    var ni = node.getElementsByClassName('entry-author');
    if (ni.length > 0) {
        if (ni[0].getElementsByClassName('entry-dislike').length > 0) {
            return;
        }
        var newdiv = document.createElement('div');
        newdiv.setAttribute('class', 'entry-dislike');
        newdiv.innerHTML = 'You are not interested in this entry.';
        ni[0].appendChild(newdiv);
    }
}

var remove_note_dislike = function (node) {
    var d = node.getElementsByClassName('entry-author');
    if (d.length > 0) {
        var olddiv = d[0].getElementsByClassName('entry-dislike');
        if (olddiv.length > 0) {
            d[0].removeChild(olddiv[0]);
        }
    }
}

var show_dislike = function (node) {
    if (!is_dislike_active(node)) {
        remove_note_dislike(node);
    } else {
        note_dislike(node);
    }
}

var mark_dislike = function (node) {
	var mouse_event = document.createEvent('MouseEvents');
	mouse_event.initMouseEvent('click', true, true);
	node.dispatchEvent(mouse_event);
}

var is_dislike_active = function(node) {
  var dislike_span = 'dislike-inactive dislike link unselectable';
  var dislike = node.getElementsByClassName(dislike_span);
  return (dislike.length > 0);
}

var get_dislike = function (node) {
  var dislike_span = 'dislike-inactive dislike link unselectable';
  var dislike_span_2 = 'dislike-active dislike link unselectable';
  var dislike = node.getElementsByClassName(dislike_span);
  if (dislike.length == 0) {
    dislike = node.getElementsByClassName(dislike_span_2);
  }
  return dislike[0]
}


if (! gr_in_bg_event) {
	var gr_in_bg_event = function(e) {
		var background_key = 76; // l
		if (! is_press_key(e, background_key, true)) return true;
		var current_entry = document.getElementById('current-entry');
		var dislike = get_dislike(current_entry);
		if (! dislike) return true; // Entry without "dislike" button
        show_dislike(current_entry);
		mark_dislike(dislike);
		// event propagation
		e.stopPropagation();
		e.preventDefault();
	}
}
document.addEventListener("keypress", gr_in_bg_event, true);
})()
