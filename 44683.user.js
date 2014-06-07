// ==UserScript==
// @name           Fuller
// @namespace      quanganhdo.tumblr.fuller
// @version        0.1
// @description    View full version of any posts
// @include        http://www.tumblr.com/dashboard
// @include        http://www.tumblr.com/dashboard*
// @include        http://www.tumblr.com/tumblelog/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$.noConflict();

// workaround
jQuery('.regular, .conversation').each(function(i, e){
	jQuery(e).html(jQuery(e).html().replace('<!-- Share post -->', '<!-- Share post --><div class="post_content">').replace('<div id="notes_outer_container_', '</div><div id="notes_outer_container_'));
});

// full ver trigger
jQuery('.post').each(function(i, e) {
	jQuery('.post_controls', jQuery(e)).prepend('<a id="f_' + i + '" href="#" onclick="javascript:return false">full version</a>');
	
	jQuery('#f_' + i).click(function() {
		jQuery(this).text('loading...');
		
		var e = jQuery('.post')[i];
		var username = jQuery('.post_info a:first', jQuery(e)).text();
		if (!username) {
			// fall back to current logged in user
			username = jQuery('#search_box form input[type="hidden"]').attr('value');
		}
		var post_id = jQuery(e).attr('id').match(/post([0-9]*)/)[1];
		
		start = 0;
		num = 50;
		full = '';
		found = false;
		searchTumblelog(username, post_id, i);
	});
});

function searchTumblelog(username, post_id, id) {
	//console.log(username, post_id, start, num);
	
	var e = jQuery('.post')[id];
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://' + username + '.tumblr.com/api/read/json?start=' + start + '&num=' + num,
		onload: function(details) {
			eval(details.responseText);
			
			jQuery.each(tumblr_api_read.posts, function(i, item) {
				if (item.id == post_id) {
					switch(item.type) {
						case 'regular':
							key = 'regular-body';
							break;
						case 'link':
							key = 'link-description';
							break;
						case 'quote':
							key = 'quote-source';
							break;
						case 'photo':
							key = 'photo-caption';
							break;
						case 'conversation':
							key = 'conversation-text';
							break;
						case 'video':
							key = 'video-caption';
							break;
						case 'audio':
							key = 'audio-caption';
							break;
					}
					full = item[key];
					found = true;
				}
			});
			
			if (!found && tumblr_api_read['posts-total'] > (tumblr_api_read['posts-start'] + num)) {
				// fetch more if needed
				start = tumblr_api_read['posts-start'] + num;
				num = Math.min(num, tumblr_api_read['posts-total'] - start);
				searchTumblelog(username, post_id, id);
			} else if (found) {
				// found
				jQuery('.post_content, .post_title + div, .quote_source, .caption, .post_body', jQuery(e)).html(full).highlightFade('yellow');
				jQuery('#f_' + id).text('');
			} else {
				// failed
				// should never ever happen!
				jQuery('#f_' + id).text('error code ' + jQuery(jQuery('.post')[id]).attr('id').match(/post([0-9]*)/)[1]);
			}
		}
	});
}

/**
 *  jQuery Plugin highlightFade (jquery.offput.ca/highlightFade)
 *  (c) 2006 Blair Mitchelmore (offput.ca) blair@offput.ca
 */

jQuery.fn.highlightFade = function(settings) {
	var o = (settings && settings.constructor == String) ? {start: settings} : settings || {};
	var d = jQuery.highlightFade.defaults;
	var i = o['interval'] || d['interval'];
	var a = o['attr'] || d['attr'];
	var ts = {
		'linear': function(s,e,t,c) { return parseInt(s+(c/t)*(e-s)); },
		'sinusoidal': function(s,e,t,c) { return parseInt(s+Math.sin(((c/t)*90)*(Math.PI/180))*(e-s)); },
		'exponential': function(s,e,t,c) { return parseInt(s+(Math.pow(c/t,2))*(e-s)); }
	};
	var t = (o['iterator'] && o['iterator'].constructor == Function) ? o['iterator'] : ts[o['iterator']] || ts[d['iterator']] || ts['linear'];
	if (d['iterator'] && d['iterator'].constructor == Function) t = d['iterator'];
	return this.each(function() {
		if (!this.highlighting) this.highlighting = {};
		var e = (this.highlighting[a]) ? this.highlighting[a].end : jQuery.highlightFade.getBaseValue(this,a) || [255,255,255];
		var c = jQuery.highlightFade.getRGB(o['start'] || o['colour'] || o['color'] || d['start'] || [255,255,128]);
		var s = jQuery.speed(o['speed'] || d['speed']);
		var r = o['final'] || (this.highlighting[a] && this.highlighting[a].orig) ? this.highlighting[a].orig : jQuery.curCSS(this,a);
		if (o['end'] || d['end']) r = jQuery.highlightFade.asRGBString(e = jQuery.highlightFade.getRGB(o['end'] || d['end']));
		if (typeof o['final'] != 'undefined') r = o['final'];
		if (this.highlighting[a] && this.highlighting[a].timer) window.clearInterval(this.highlighting[a].timer);
		this.highlighting[a] = { steps: ((s.duration) / i), interval: i, currentStep: 0, start: c, end: e, orig: r, attr: a };
		jQuery.highlightFade(this,a,o['complete'],t);
	});
};

jQuery.highlightFade = function(e,a,o,t) {
	e.highlighting[a].timer = window.setInterval(function() { 
		var newR = t(e.highlighting[a].start[0],e.highlighting[a].end[0],e.highlighting[a].steps,e.highlighting[a].currentStep);
		var newG = t(e.highlighting[a].start[1],e.highlighting[a].end[1],e.highlighting[a].steps,e.highlighting[a].currentStep);
		var newB = t(e.highlighting[a].start[2],e.highlighting[a].end[2],e.highlighting[a].steps,e.highlighting[a].currentStep);
		jQuery(e).css(a,jQuery.highlightFade.asRGBString([newR,newG,newB]));
		if (e.highlighting[a].currentStep++ >= e.highlighting[a].steps) {
			jQuery(e).css(a,e.highlighting[a].orig || '');
			window.clearInterval(e.highlighting[a].timer);
			e.highlighting[a] = null;
			if (o && o.constructor == Function) o.call(e);
		}
	},e.highlighting[a].interval);
};

jQuery.highlightFade.defaults = {
	start: [255,255,128],
	interval: 50,
	speed: 400,
	attr: 'backgroundColor'
};

jQuery.highlightFade.getRGB = function(c,d) {
	var result;
	if (c && c.constructor == Array && c.length == 3) return c;
	if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(c))
		return [parseInt(result[1]),parseInt(result[2]),parseInt(result[3])];
	else if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(c))
		return [parseFloat(result[1])*2.55,parseFloat(result[2])*2.55,parseFloat(result[3])*2.55];
	else if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(c))
		return [parseInt("0x" + result[1]),parseInt("0x" + result[2]),parseInt("0x" + result[3])];
	else if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(c))
		return [parseInt("0x"+ result[1] + result[1]),parseInt("0x" + result[2] + result[2]),parseInt("0x" + result[3] + result[3])];
	else
		return jQuery.highlightFade.checkColorName(c) || d || null;
};

jQuery.highlightFade.asRGBString = function(a) {
	return "rgb(" + a.join(",") + ")";
};

jQuery.highlightFade.getBaseValue = function(e,a,b) {
	var s, t;
	b = b || false;
	t = a = a || jQuery.highlightFade.defaults['attr'];
	do {
		s = jQuery(e).css(t || 'backgroundColor');
		if ((s  != '' && s != 'transparent') || (e.tagName.toLowerCase() == "body") || (!b && e.highlighting && e.highlighting[a] && e.highlighting[a].end)) break; 
		t = false;
	} while (e = e.parentNode);
	if (!b && e.highlighting && e.highlighting[a] && e.highlighting[a].end) s = e.highlighting[a].end;
	if (s == undefined || s == '' || s == 'transparent') s = [255,255,255];
	return jQuery.highlightFade.getRGB(s);
};

jQuery.highlightFade.checkColorName = function(c) {
	if (!c) return null;
	switch(c.replace(/^\s*|\s*$/g,'').toLowerCase()) {
		case 'aqua': return [0,255,255];
		case 'black': return [0,0,0];
		case 'blue': return [0,0,255];
		case 'fuchsia': return [255,0,255];
		case 'gray': return [128,128,128];
		case 'green': return [0,128,0];
		case 'lime': return [0,255,0];
		case 'maroon': return [128,0,0];
		case 'navy': return [0,0,128];
		case 'olive': return [128,128,0];
		case 'purple': return [128,0,128];
		case 'red': return [255,0,0];
		case 'silver': return [192,192,192];
		case 'teal': return [0,128,128];
		case 'white': return [255,255,255];
		case 'yellow': return [255,255,0];
	}
};
