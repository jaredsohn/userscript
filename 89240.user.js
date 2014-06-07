// ==UserScript==
// @name           Flickr1024
// @namespace      vispillo
// @include        http://www.flickr.com/photos/*/*
// @require        http://userscripts.org/scripts/source/78952.user.js
// ==/UserScript==


var notes = new Array;
var people = new Array;
var xscale;
var yscale;

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
}
function getJSVariable (regex) {
  // Credit for this function goes to Alesa Dam
  // Some slight modifications for use with jQuery
  var retval;
  jQuery('script').each( function (i,script) {
    if (retval != undefined) {
      return;
    }
    var html = script.innerHTML;
    try {
      retval = html.match(regex)[1];
    } catch (e) {
    }
  });
  //console.log('retval is: '+retval);
  return retval;
}

function toggle (e) {
	elem = jQuery(e.target);
	if (size == '1024') {
		GM_setValue('status','640');
		window.location.reload();
	}
	else {
		GM_setValue('status','1024');
		window.location.reload()
	}
}
jQuery.noConflict();
if (document.getElementById('primary-column')) {
	size = GM_getValue('status','1024');
	jQuery('<li id="sizetoggle"><span><a href="javascript:;">'+size+'</a></span></li>').appendTo('#candy_nav_button_bar ul.site_nav_menu_buttons');
	jQuery('#sizetoggle').addClass('no_menu_li');
	jQuery('#sizetoggle a').click(toggle);
	if ( size == '1024') {
		addGlobalStyle('div.video-wrapper { margin-left:auto; margin-right:auto; }');
		addGlobalStyle('#main, .Footer, #head-top, #head-nav-bar {width:1350px !important}');
		addGlobalStyle('#primary-column, #meta {width:1024px !important}');
		addGlobalStyle('#photo .photo-div img {display:block;margin-left:auto;margin-right:auto }');
		var hash = getJSVariable(/\"?auth_hash\"?[ :]+[\'\"]([^\'\"]+)[\'\"]/);
		var key = getJSVariable(/\"?api_key\"?[ :]+[\'\"]([^\'\"]+)[\'\"]/);
		photoid = document.location.href.split('/')[5];
		url = 'http://www.flickr.com/services/rest/?method=flickr.photos.getSizes&photo_id='+photoid+'&format=json&nojsoncallback=1&auth_hash='+hash+'&api_key='+key;

		jQuery.getJSON(url,function ( data ) {
			largex = undefined;
			largey = undefined;
			jQuery.each(data.sizes.size,function (i,val) {
				//console.log(val);
				if (val.label == 'Large') {
					largex = val.width;
					largey = val.height;
				}
			});
			jQuery('#photo-drag-proxy').css('margin-left',Math.round((1024-parseInt(jQuery('#photo-drag-proxy').css('width')))/2));
			if (largex) {
				if ((largex == 1024) || (largey == 1024)) {
					adjustPic(largex,largey)
				}
			}
		});
	}
}

function adjustPic (newwidth,newheight) {
	style = jQuery('#photo-drag-proxy').attr('style');
	//width = jQuery('#photo-drag-proxy').css('width');
	//height = jQuery('#photo-drag-proxy').css('height');
	//console.log('style is: '+style);
	width  = parseInt(style.split(':')[1].split('px')[0]);
	height = parseInt(style.split(':')[2].split('px')[0]);
	//console.log('height is '+height+' and width is '+width);
	if (width==640) {
		nheight = Math.round(1024/(640/height));
		nwidth = 1024;
		xscale = 1024/640;
		yscale = nheight/height;
	}
	else if (height==640) {
		nwidth = Math.round(1024/(640/width));
		nheight = 1024;
		xscale = nwidth/width;
		yscale = 1024/640;
	}
	else {
		//console.log('small picture!');
	}
	jQuery('#photo-drag-proxy').attr('style','width: '+nwidth+'px; height: '+nheight+'px;');
	jQuery('#notes li').each(function (i,li) {
		li = jQuery(li);
		//console.log(li);
		data = li.attr('style');
		/*left = li.css('left');
		top = li.css('top');
		w = li.css('width');
		h = li.css('height');*/
		left = parseInt(data.split(': ')[1].split('px')[0]);
		top = parseInt(data.split(': ')[2].split('px')[0]);
		w = parseInt(data.split(': ')[3].split('px')[0]);
		h = parseInt(data.split(': ')[4].split('px')[0]);
		if (li.hasClass('person-note')) {
			people[li.attr('data-person-nsid')] = { l:left,t:top,w:w,h:h,s:'fixed' };		
		}
		else {
			notes[li.attr('data-note-id')] = { l:left,t:top,w:w,h:h,s:'fixed' };		
		}
		//z = parseInt(data.split(': ')[5].split(';')[0]);
		nleft = left * xscale;
		ntop = top * yscale;
		nw = w * xscale;
		nh = h * yscale;
		ndata = 'left: '+nleft+'px; top: '+ntop+'px; width: '+nw+'px; height: '+nh+'px; z-index: '+i+';';
		data = li.attr('style',ndata);
		li.bind('DOMAttrModified',existingNoteChanged);	
	});
	imgt = jQuery('div.photo-div > img');
	url = imgt.attr('src');
	url = url.replace('_z.jpg','_b.jpg');
	imgt.attr('src',url);
	imgt.animate({width: nwidth+'px',height: nheight+'px'},200);
	jQuery('#notes').bind('DOMNodeInserted',noteAdded);
}

function noteAdded(e) {
	if (e.target.tagName == 'LI') {
		//console.log('new li added!');
		jQuery(e.target).bind('DOMAttrModified',newNoteChanged);		
	}
}

function newNoteChanged(e) {
	elem = jQuery(e.target);
	if (elem.hasClass('person-note')) {
		if (e.target.hasAttribute('data-person-nsid')) {
			data = elem.attr('style');
			/*left = elem.css('left');
			top = elem.css('top');
			w = elem.css('width');
			h = elem.css('height');*/
			left = parseInt(data.split(': ')[1].split('px')[0]);
			top = parseInt(data.split(': ')[2].split('px')[0]);
			w = parseInt(data.split(': ')[3].split('px')[0]);
			h = parseInt(data.split(': ')[4].split('px')[0]);
			people[elem.attr('data-person-nsid')] = { l:left,t:top,w:w,h:h,s:'fixed' };
			elem.unbind('DOMAttrModified',newNoteChanged);
			elem.bind('DOMAttrModified',existingNoteChanged);
			savePerson(e.target.getAttribute('data-person-nsid'));			
		}	
	}
	else {
		if (e.target.hasAttribute('data-note-id')) {
			data = elem.attr('style');
			/*left = elem.css('left');
			top = elem.css('top');
			w = elem.css('width');
			h = elem.css('height');*/
			left = parseInt(data.split(': ')[1].split('px')[0]);
			top = parseInt(data.split(': ')[2].split('px')[0]);
			w = parseInt(data.split(': ')[3].split('px')[0]);
			h = parseInt(data.split(': ')[4].split('px')[0]);
			notes[elem.attr('data-note-id')] = { l:left,t:top,w:w,h:h,s:'fixed' };
			elem.unbind('DOMAttrModified',newNoteChanged);
			elem.bind('DOMAttrModified',existingNoteChanged);
			saveNote(e.target.getAttribute('data-note-id'));
		}
	}
}

function existingNoteChanged(e) {
	if (e.target.tagName == 'LI') {
		elem = jQuery(e.target);
		if (elem.hasClass('person-note')) {
			if (elem.hasClass('note-saving')) {
				//console.log('found note-saving, setting that!');
				//console.log(elem.attr('class'));
				people[elem.attr('data-person-nsid')].s = 'saving';
			}
			else if (people[elem.attr('data-person-nsid')].s == 'saving') {
				if (!elem.hasClass('saving')) {
					//console.log('saving not found, but in saving state - update needed!');
					// most recent class had 'saving', but now it's gone -> update!.
					data = elem.attr('style');
					//console.log(data);
					/*left = elem.css('left');
					top = elem.css('top');
					w = elem.css('width');
					h = elem.css('height');*/
					left = parseInt(data.split(': ')[1].split('px')[0]);
					top = parseInt(data.split(': ')[2].split('px')[0]);
					w = parseInt(data.split(': ')[3].split('px')[0]);
					h = parseInt(data.split(': ')[4].split('px')[0]);
					people[elem.attr('data-person-nsid')] = { l:left,t:top,w:w,h:h,s:'fixing' };
					//console.log('about to call savePerson');
					savePerson(elem.attr('data-person-nsid'));
				}
			}		
		}
		else {
			if (elem.hasClass('note-saving')) {
				notes[elem.attr('data-note-id')].s = 'saving';
			}
			else if (notes[elem.attr('data-note-id')].s == 'saving') {
				if (!elem.hasClass('saving')) {
					// most recent class had 'saving', but now it's gone -> update!.
					data = elem.attr('style');
					/*left = elem.css('left');
					top = elem.css('top');
					w = elem.css('width');
					h = elem.css('height');*/
					left = parseInt(data.split(': ')[1].split('px')[0]);
					top = parseInt(data.split(': ')[2].split('px')[0]);
					w = parseInt(data.split(': ')[3].split('px')[0]);
					h = parseInt(data.split(': ')[4].split('px')[0]);
					notes[elem.attr('data-note-id')] = { l:left,t:top,w:w,h:h,s:'fixing' };
					saveNote(elem.attr('data-note-id'));
				}
			}
		}
	}
}

function saveNote(id) {
	//console.log( jQuery("li[data-note-id='"+id+"'] span") );
	content = jQuery("li[data-note-id='"+id+"'] span.note-wrap").html();
	//console.log(notes[id]);
	l = Math.round(notes[id].l / (xscale*(640/500)));
	t = Math.round(notes[id].t / (yscale*(640/500)));
	w = Math.round(notes[id].w / (xscale*(640/500)));
	h = Math.round(notes[id].h / (yscale*(640/500)));
	//console.log('about to set url...');
	url = 'http://www.flickr.com/services/rest/';
	//console.log('url is '+url);
	var params = {	'method':			'flickr.photos.notes.edit',
							'note_id':				id,
							'note_x':					l,
							'note_y':					t,
							'note_w':					w,
							'note_h':					h,
							'note_text':			content,
							'api_key':				key,
							'format':					'json',
							'nojsoncallback': 1,
							'auth_hash':			hash
	};
	//console.log(params);
	//?method=flickr.photos.notes.edit&note_id='+id+'&note_x='+l+'&note_y='+t+'&note_w='+w+'&note_h='+h+'&note_text='+content+'&format=json&nojsoncallback=1&auth_hash='+hash+'&api_key='+key;
	//console.log(url);
	jQuery.post(url,params,function (data) { },"json");
}

function savePerson(id) {
	l = Math.round(people[id].l / (xscale*(640/500)));
	t = Math.round(people[id].t / (yscale*(640/500)));
	w = Math.round(people[id].w / (xscale*(640/500)));
	h = Math.round(people[id].h / (yscale*(640/500)));
	url = 'http://www.flickr.com/services/rest/';
	var params = {	'method':			'flickr.photos.people.editCoords',
							'user_id':				id,
							'person_x':					l,
							'person_y':					t,
							'person_w':					w,
							'person_h':					h,
							'photo_id':					photoid,
							'api_key':				key,
							'format':					'json',
							'nojsoncallback': 1,
							'auth_hash':			hash
	};
	//console.log(params);
	//console.log(url);
	jQuery.post(url,params,function (data) { },"json");
}
