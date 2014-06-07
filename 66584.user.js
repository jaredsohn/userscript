// ==UserScript==
// @name           bbc tracklist flattener
// @description    flatten bbc linked tracklists to plain text files
// @version        2012-04-08
// @namespace      http://userscripts.org/users/127372
// @author         tmb_oti
// @include        http://www.bbc.co.uk/programmes/*
// ==/UserScript==

var BBCTracklistFlattener = function() {
	
	var gettext = function gettext(node) {
		if (!node) { return null; }
		return node.textContent.replace(/(^\s+)|(\s+$)/gm, '');
	};
	
	var is = function is(node, selector) {
		return Array.prototype.indexOf.call(document.querySelectorAll(selector), node) != -1;
	};
	
	var selectors = {
		artist          : '[property="foaf:name"]',
		track           : '[property="dc:title"]',
		label           : '.record-label',
		segments        : '.segment',
		segments_groups : '#segments .segment, #segments .group',
		group_title     : '.segment-event-title, .group-title'
	};
	
	var Parser = function Parser() {
	
		var self = { output : document.createElement('pre') };

		self.line = function line() {
			for (var i = 0, l = arguments.length; i < l; i++) {
				self.output.appendChild(document.createTextNode(arguments[i]));
				self.output.appendChild(document.createElement('br'));
			}
		};
	
		self.process_seg = function process_seg(seg) {
			
			var artist = gettext(seg.querySelector(selectors.artist));
			var track  = gettext(seg.querySelector(selectors.track));
			var label  = gettext(seg.querySelector(selectors.label));
			
			return {
				artist : artist || '',
				track  : track  || '',
				label  : label ? ('[' + label + ']') : '',
				sep1   : artist && track ? ' - ' : '',
				sep2   : ((artist || track) && label) ? ' ' : ''
			};
		};
		
		self.append_seg = function append_seg(seg) {
			
			var a = document.createElement('a');
			a.target = '_blank';
			a.href = 'http://www.youtube.com/results?search_query=' + encodeURIComponent(seg.artist + seg.sep1 + seg.track);
			a.textContent = [seg.artist, seg.sep1, seg.track, seg.sep2, seg.label].join('');
			
			seg.indent && self.output.appendChild(document.createTextNode('   '));
			self.output.appendChild(a);
			self.line('');
		};
		
		self.run = function run() {
			
			self.line(document.title, '', '- TRACKLIST -', '');
			
			var items = document.querySelectorAll(selectors.segments_groups);
			
			Array.prototype.forEach.call(items, function(item) {
				
				if (item.classList.contains('segment')) {
					!is(item, '.group .segment') &&	self.append_seg(self.process_seg(item));
					
				} else { // group
					
					self.line('');
					var group_title = gettext(item.querySelector(selectors.group_title));
					group_title && self.line(group_title, '');
					var segments = item.querySelectorAll(selectors.segments);
					
					Array.prototype.forEach.call(segments, function(seg_ev) {
						var seg = self.process_seg(seg_ev);
						seg.indent = true;
						self.append_seg(seg);
					});
					self.line('');
				}
			});
			
			document.head.innerHTML = '<style type="text/css">a { text-decoration : none; color : black; } a:hover { text-decoration: underline; }</style>';
			document.body.innerHTML = '';
			document.body.appendChild(self.output);
		};
		
		self.init = function() {
			
			document.head.innerHTML += [
				'<style type="text/css">',
					'#tracklist-button { position: fixed; top: 5px; right: 5px; padding: 5px; background-color: white; border: 1px solid silver; color : black; z-index: 4242; }',
					'#tracklist-button:hover { background-color: beige; cursor : pointer; }',
				'</style>'
			].join('');
	
			var button = document.createElement('div');
			button.textContent = 'Convert tracklist';
			button.id = 'tracklist-button';
			button.onclick = function() {
				delete button.onclick;
				button.textContent = 'Please wait...';
				setTimeout(function() {
					self.run();
				}, 0);
			};
			
			document.body.appendChild(button);
		};
		
		return self;
	};
	
	new Parser().init();
};

document.body.appendChild(document.createElement('script')).innerHTML = '(' + BBCTracklistFlattener + ')();';

