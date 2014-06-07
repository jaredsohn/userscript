// ==UserScript==
// @name        SGVideoLinks
// @namespace   Neme.
// @description Hozzászólásba beszúrt youtube videók elrejtése
// @include     http://www.sg.hu/listazas.php*
// @version     1.2
// ==/UserScript==

function doit($)
{
	if (!$) return;

	$("<style type='text/css'>.yt-icon { width:48px; height:21px; float:left; margin-right:6px; background-repeat:no-repeat; "+
		"background-image: url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAgACAAD/2wBDAAYEBQYFBAY"+
		"GBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwo"+
		"IChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAA"+
		"VADADASIAAhEBAxEB/8QAGwAAAQUBAQAAAAAAAAAAAAAAAAQFBgcIAQP/xAAuEAACAQMCBQMCBgMAAAAAAAABAgM"+
		"EBREAEgYTITFRFEFhByIIFRYjcYEzgpH/xAAaAQACAgMAAAAAAAAAAAAAAAAABAIGAQMF/8QAJhEAAQQBAgQHAAA"+
		"AAAAAAAAAAQACAxEhBDEFEkGBIlFSYXGx0f/aAAwDAQACEQMRAD8AzhWcOT0tGKp5ozTtTRVCuoOGLgHYPkfcD8q"+
		"dMxikGco/QZPTsPOp9w1M1ba+EoJQHUXf0YU9mjEkcgB/2mf/ALpVL+/aqpdoarWzypIAuGyK1AoPzt2f1jQhNf0"+
		"vsNtu16mW/SenpYgAztGXCE56lRgntjHzq2+LfpzaLBc2oKGCC5zxMqz8ugKiJnAKDJzktnp/GoBb6hDxbxQ0ZBV"+
		"6rcp8gltaWPNqeOOKEgjMjLc7NKwHsqkEn+BpGUF7yPj6Vm0T2QQRyUDYN4HqA3q9j59FTty4Co6axW+5/lUEkdS"+
		"srSqtJj0+yQp9xx7ke+PGonxdwjS01hmqDa2o35LTQScsoHAGensRrQVVNVfpWucc30At91Vzk8vmGr+3Ptu74/v"+
		"Uf/EDWyNwvcF9M0dE1W7080tRu5i+nA/aTaMR429ieo1ARlviBPRMHVRygxvjbnmzjFbd1koVlUtItKKmYUyyc5Y"+
		"Q52CTAG8L23YAGe/TSiS93WSqkqZLnXPUSRmJ5Wncu6HupOckfGjRroqor2ob/XU9wmrJpXqpp/8AK07lmc+Sx65"+
		"0+Djuq3s7QOXbGWE5ycdvbRo1rdE1xshNRa2eFvKx2Oy63HVQyFDTuVPcGckHrnx566QXbiyruFGabYEjK7erliF"+
		"8Dxo0awIWA3Sm/iGoeC0uwfYfi//Z); }"+
		"span.yt-title { display:inline-block; background:black; color:yellow; padding:5px; "+
		"font-size:14px; font-weight:bold; cursor:pointer; }</style>")
		.appendTo(document.head);

	var req = '<feed xmlns="http://www.w3.org/2005/Atom" '+
		'xmlns:media="http://search.yahoo.com/mrss/" '+
		'xmlns:batch="http://schemas.google.com/gdata/batch" '+
		'xmlns:yt="http://gdata.youtube.com/schemas/2007"> '+
		'<batch:operation type="query" /> '+
		'<entry><id>'+_yt_entries.join('</id></entry><entry><id>')+'</id></entry>'+
		'</feed>';

	$.ajax({type: 'POST', url: 'http://gdata.youtube.com/feeds/api/videos/batch?fields=entry(id,title)', data: req, dataType: 'xml', success: function(data) {
		var titles = {};
		$(data).children().children().each(function() {
			var vals = $(this).children();
			var id = vals.eq(0).text().split('/');
			id = id[id.length - 1];
			titles[id] = vals.eq(1).text();
		});
		$(_yt_objects).each(function() {
			var me = this;
			if (!titles[me.id]) return true;
			$(me.container).hide();
			$("<div><span class='yt-title'><div class='yt-icon'></div>"+titles[me.id]+"</span></div>")
				.insertBefore(me.container).click(function() {
					if (!me.is_attached) { $(me.container).html(me.obj); me.is_attached = true; }
					$(me.container).toggle();
					return false;
				});
		});
	}});
}

var entries = [], objects = [], embeds = document.getElementsByTagName('embed'), i, id;
for (i in embeds) {
	if (embeds[i].parentNode && embeds[i].src.indexOf('youtube') > 0) {
		var id = embeds[i].src;
		id = id.split('/');
		id = id[id.length - 1].split('&')[0];
		entries.push('http://gdata.youtube.com/feeds/api/videos/'+id);
		objects.push({"id": id, "obj": (embeds[i].parentNode.wrappedJSObject ? embeds[i].parentNode.wrappedJSObject : embeds[i].parentNode) });
	}
}

if (entries.length > 0) {
	for (i in objects) {
		objects[i].container = document.createElement('div');
		objects[i].obj.parentNode.insertBefore(objects[i].container, objects[i].obj);
		objects[i].obj.parentNode.removeChild(objects[i].obj);
	}

	var uw = unsafeWindow;
	if (window.navigator.vendor.indexOf('Google') >= 0) {
		var e = document.createElement('div');
		e.setAttribute('onclick', 'return window;');
		uw = e.onclick();
	}

	uw._yt_objects = objects;
	uw._yt_entries = entries;

	var s = document.createElement('script');
	s.setAttribute('type', 'text/javascript');
	s.textContent = '(' + doit + ')(jQuery);'
	document.head.appendChild(s);
}

