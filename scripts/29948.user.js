// ==UserScript==
// @name           Iteration Planner Fix
// @namespace      http://asolutions.com/nate.young
// @description    Fixes frustrating parts of iteration planning tool in ace
// @include        https://ace-deuce2.asolutions.com/iteration_planner/story_new
// ==/UserScript==

function ownership_collapse(val) {
    var new_height;
    var divs = new Array("main_div", "backlog_div");
    if(val) {
	new_height = 505;
	for(var i = 0; i < divs.length; i++) {
	    document.getElementById(divs[i]).style.height = new_height + "px";
	}
        document.getElementById('story_ownership_div').style.height = "0px";
        document.getElementById('collapse_div').style.display = 'none';
        document.getElementById('expand_div').style.display = 'block';
    } else {
	new_height = 394;
	for(var i = 0; i < divs.length; i++) {
	    document.getElementById(divs[i]).style.height = new_height + "px";
	}
	document.getElementById('story_ownership_div').style.height = "109px";
        document.getElementById('expand_div').style.display = 'none';
        document.getElementById('collapse_div').style.display = 'block';
    }
}

function replace_anchor(id, fn) {
    var div = document.getElementById(id);
    var div_a = div.firstChild;
    var anchor = document.createElement('a');
    anchor.addEventListener('click', function(event) {
	    fn();
	    event.stopPropagation();
	}, true);
    div.replaceChild(anchor, div_a);
}

window.addEventListener('load', function(event) {
	var desc = document.getElementById('story_description');
	desc.style.height = '400px';

	// replace collapse anchor
	replace_anchor('collapse_div', function() {
		ownership_collapse(true);
	    });

	// replace expand anchor
	replace_anchor('expand_div', function() {
		ownership_collapse(false);
	    });
    }, false);