// ==UserScript==
// @id             wallbase-hoarder
// @name           wallbase-hoarder
// @version        1.0
// @namespace      tripflag
// @author         tripflag
// @description    
// @include        http://wallbase.cc/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @run-at         document-end
// ==/UserScript==

var linklist_plain = {
	'background' : 'none',
	'display'    : 'inline',
	'overflow'   : 'hidden',
	'margin'     : '0 .7em',
	'height'     : '1em',
	'width'      : '2em',
	'position'   : 'static',
	
	'padding'       : '0',
	'border-radius' : '0',
	'box-shadow'    : 'none'
};

var linklist_hover = {
	'background' : '#111',
	'display'    : 'block',
	'height'     : 'auto',
	'width'      : 'auto',
	'position'   : 'absolute',
	'top'        : '0',
	'right'      : '0',
	'z-index'    : '9001',
	
	'padding'       : '.4em .8em',
	'border-radius' : '16px',
	'box-shadow'    : '0 0 8px #333'
};

$('.sort_submit').first().after(
	'<a id="repoint">re:</a>');

$('.sort_submit').first().after(
	'<div id="linklist">li:' +
	'<span id="linklista"><br /></span>' +
	'</div>');

$('#linklist')
	.addClass('right')
	.css(linklist_plain)
	.hover(
		function() { $(this).css(linklist_hover); },
		function() { $(this).css(linklist_plain); }
	);

$('#repoint')
	.addClass('right')
	.css('margin','0 .7em')
	.click(function()
	{
		$('.thumb a').each(
		function (index, para)
		{
			var obj = $(para);
			var ref = obj.attr('href');
			if (ref != null && ref.length > 1)
			{
				//obj.css('border-bottom','1px solid #f09');
				obj.removeAttr('href');
				obj.click(function()
				{
					var box = obj.closest('div');
					box.css('background', '#f70');
					//var id = box.attr('id').substr(5);
					$.ajax(ref).done(function(data)
					{
						obj.closest('div').css('background', '#7f0');
						var bad1 = '<div id="bigwall" class="right">\n\n\t<img src="';
						var bad2 = '" alt="';
						var ofs1 = data.indexOf(bad1) + bad1.length;
						var ofs2 = data.indexOf(bad2, ofs1);
						var src = data.substring(ofs1, ofs2);
						//var ext = src.lastIndexOf('.');
						//ext = src.substr(ext);
						//src = 'wget -nv ' + src + ' -O ' + id + ext;
						$('#linklista').append(src + '<br />');
						obj.css('opacity', '0.6');
						box.css('opacity', '0.6');
					});
				});
			}
		});
	});
