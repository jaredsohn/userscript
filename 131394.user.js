// ==UserScript==
// @name		Reddit smiley completer
// @description	Suggests smileys when you type the ~ character.
// @version		2.1
// @include     http://*.reddit.com/r/*/comments/*
// @include     https://*.reddit.com/r/*/comments/*
// ==/UserScript==

function smiler() {
	var eventChar = '~';
	cssExtractor(function (smileys) {
		if (!smileys) return; // some subreddits don't have them? what are they thinking?
		var container = containerLoader(smileys);
		function set(target) {
			var $container = $(container);
			var srcpos = target.offset();
			srcpos.left += target.outerWidth() + 4;
			$container.css({
				left: srcpos.left,
				top: srcpos.top,
				display: 'block',
				maxHeight: target.height()
			});
			$container.data("target", target);
			$container.data("prepare")();
		}
		function done(target, smiley, selected) {
			var type = smileys[smiley];
			var insert = [];
			for (var i = 0; i < type.length; i++) {
				insert.push(type[i] + (i == 0 ? '' : ' ') + type[i]);
			}
			smiley =  "[" + insert.join(" ") + "](/" + smiley + ")";
			var si = target.prop("selectionStart");
			var se = target.prop("selectionEnd");
			var text = target.val();
			target.val(text.substring(0, si - selected.length) + smiley + text.substring(se, text.length));
			var newstart = si - selected.length + (type.length ? 1 + type[0].length : smiley.length);
			target.prop("selectionStart", newstart);
			target.prop("selectionEnd", newstart);
			return !!type.length;
		}
		function close() {
			$(container).hide();
			filter('');
			select($("tr:first", container));
		}
		function filter(selected) {
			var previous = $(container).data("filter") || '';
			if (previous != selected) {
				var within = previous.indexOf(selected) != -1 && false;
				$(container).data("filter", selected);
				$("tr" + (within ? ":visible" : ""), container).each(function () {
					var self = $(this);
					if (self.data("smiley").indexOf(selected) == -1)
						self.hide();
					else if (!within)
						self.show();
				});
				var selected = $("tr.selected", container);
				if (!selected.is(":visible")) {
					select($("tr:visible:first", container));
				}
			}
		}
		function getselected() {
			var selected = $("tr.selected:first", container);
			if (!selected.length) {
				selected = $("tr:visible:first", container);
			}
			return selected;
		}
		function select(i) {
			var selected = i;
			var current = getselected();
			var go = function (dir, rs) {
				var s = current;
				do {
					s = s[dir]();
					if (!s.length) s = current.siblings(":visible" + rs);
				} while (s.length && !s.is(":visible"));
				return s;
			};
			if (i == -1) {
				selected = go('prev', ':last');
			} else if (i == 1) {
				selected = go('next', ':first');
			}
			if (!selected.length) {
				selected = $("tr:visible:first", container);
			}
			current.removeClass("selected").css("background", "transparent");
			selected.addClass("selected").css("background", "blue");
			var h = $(container).height();
			var st = $(container).scrollTop();
			var pos = 0;
			selected.prevAll(":visible").each(function () { 
				pos += $(this).outerHeight();
			});
			var pose = pos + selected.outerHeight();
			if (pos < st)
				$(container).scrollTop(pos);
			else if (pose > st + h)
				$(container).scrollTop(pose - $(container).innerHeight());
		}
		
		$(container).delegate("tr", "click", function (e) {
			var tr = $(e.target);
			if (!tr.is("tr")) {
				tr = tr.parents("tr:first");
			}
			var smiley = tr.data("smiley");
			
			var target = $(container).data("target");
			var val = target.val();
			var selectionStart = target.prop("selectionStart");
			var li = val.lastIndexOf(eventChar, selectionStart);
			var selection = '';
			if (li != -1) {
				selection = val.substring(li, selectionStart);
				if (!/^[a-z0-9]*$/i.test(selection.substring(1))) {
					selection = '';
				}
			}
			
			if (selection) {
				done(target, smiley, selection);
			}
			close();
		});
	
		$(document).delegate("textarea", "focus", function (e) {
			var target = $(e.target);
			if (!target.data("srs-complete-bound")) {
				target.data("srs-complete-bound", true);
				target.bind("keyup keydown click", function (e) {
					var target = $(this);
					var val = target.val();
					var li = val.lastIndexOf(eventChar, this.selectionStart);
					var selected = '';
					if (li != -1) {
						selected = val.substring(li, this.selectionStart);
						if (li == -1 || !selected.length || !/^[a-z0-9]*$/i.test(selected.substring(1)))
							selected = '';
					}
	
					if (selected) {
						set(target);
						filter(selected.substring(1));
						
						var c = String.fromCharCode(e.which);
						if (e.which == 38) {
							e.type == 'keydown' && select(-1);
							e.preventDefault();
						} else if (e.which == 40) {
							e.type == 'keydown' && select(1);
							e.preventDefault();
						} else if ('\r\n '.indexOf(c) != -1) {
							var vis = getselected();
							if (vis.length) {
								var cancel = done(target, vis.data("smiley"), selected);
								if (cancel || c == '\n' || c == '\r') e.preventDefault();
							}
							close();
						}
					} else {
						close();
					}
				});
			}
		});
		
		$(document).delegate("button", "click", function () {
			setTimeout(function () {
				var ta = $(container).data("target");
				if (ta && (!ta.slength || !ta.is(":visible"))) {
					close();
				}
			}, 1);
		});
	});
	
	function containerLoader(smileys) {
		if (!smileys) return;
		var ce = function (n) { return document.createElement(n); };
		var tn = function (t) { return document.createTextNode(t); };
		var ac = function (p, c) { p.appendChild(c); };
		var container = ce("table");
		var tbody = ce("tbody"); ac(container, tbody);
		var list = [];
		for (var smiley in smileys) {
			list.push(smiley);
		}
		list.sort();
		var previewHeight = 30;
		var previews = [];
		for (var i = 0; i < list.length; i++) {
			var smiley = list[i];
			var tr = ce("tr"); ac(tbody, tr);
			$(tr).data("smiley", smiley);
			var name = ce("td"); ac(tr, name);
			ac(name, tn(smiley));
			
			var preview = ce("td"); ac(tr, preview);
			var previewdiv = ce("div"); ac(preview, previewdiv);
			var middlediv = ce("div"); ac(previewdiv, middlediv);
			var link = ce("a"); ac(middlediv, link);
			link.href = "/" + smiley;
			$(previewdiv).css({
				height: previewHeight,
				maxWidth: 200,
				position: 'relative',
				display: 'block',
				overflow: 'hidden',
				paddingRight: 6,
				marginBottom: 1
			});
			
			previews.push(middlediv);
		}
		var prepared = false;
		$(container).data("prepare", function () {
			if (!prepared) {
				for (var i = 0; i < previews.length; i++) {
					var preview = $(previews[i]);
					var h = preview.height();
					if (h > previewHeight) {
						preview.css("zoom", previewHeight / h);
						// firefox? why no zoom >:|
						preview.css("-moz-transform", "scale(" + previewHeight / h + ")");
						preview.css("-moz-transform-origin", "0 0");
					} else {
						preview.css("marginTop", -Math.floor((h - previewHeight) / 2));
					}
				}
				prepared = true;
			}
		});
		$(container).css({
			display: 'none',
			position: 'absolute',
			zIndex: 3000,
			background: 'white',
			border: '1px red dotted',
			maxHeight: 200,
			width: 300,
			overflowY: 'scroll',
			overflowX: 'hidden',
			cursor: 'pointer'
		});
		ac(document.body, container);
		return container;
	}
	function cssExtractor(cb) {
		var subreddit = $("#header .redditname a").text();
		$.get("/r/" + subreddit + "/about/stylesheet", function (data) {
			var doc = document.implementation.createHTMLDocument("");
			doc.documentElement.innerHTML = data;
			data = $("pre.subreddit-stylesheet-source", doc).text();
			
			data = data
				.replace(/\n/g, ' ') // normalise whitespace
				.replace(/\/\*.*?\*\//g, ' ') // remove comments
				.replace(/\{.*?\}/g, ',') // remove attributes
				.replace(/\s{2,}/g, ' '); // normalise whitespace
			var decl = data.split(/,+/);
			
			var types = {};
			var remap = {
				em: '*',
				strong: '**'
			};
			var re = /^a\[href=(['"])?\/([a-z0-9_\-]+)\1\](?:\:[a-z\-]+)?(?:\s([a-z]+))?$/i;
			for (var i = 0; i < decl.length; i++) {
				var matches = re.exec(decl[i].trim());
				if (matches) {
					var type = matches[2];
					if (!types[type]) {
						types[type] = [];
					}
					
					var extra = matches[3];
					if (extra) {
						types[type].push(remap[extra]);
					}
				}
			}
			for (var type in types) {
				types[type].sort(function (a, b) {
					return a.length - b.length;
				});
			}
			cb(types);
		});
	}
};

function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}

exec(smiler);