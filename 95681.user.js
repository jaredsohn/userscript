// ==UserScript==
// @name           Line number for Code Review
// @namespace      yijiang
// @include        http://codereview.stackexchange.com/*
// ==/UserScript==

function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
};

with_jquery(function ($) {
	if(prettyPrint) {
		var pre = $('pre').filter(function(){
			return ($(this).height() > 60);
		}).addClass('linenums');
		
		$('code').addClass('prettyprint');
		
		pre.each(function(){
			var t = $(this),
				dummy = $('<div>'),
				cloneHTML = dummy.append(t.clone().removeClass('prettyprint linenums')).html();
				
			t.dblclick(function(evt){
				var w = window.open('data:text/html;charset=utf-8,' + encodeURIComponent(cloneHTML), 'code', 'resizable=yes,scrollbars=yes,status=yes');
			});
		});
		
		prettyPrint();
		
		setTimeout(function(){
			pre.each(function(){
				var t = $(this),
					originalWidth = 650,
					maxWidth = Math.max.apply(Math, t.find('li').map(function(){
						var width = 0;
						$(this).children().each(function(){
							width += $(this).width();
						});
						return width;
					}).get()) + 50;
				
				if(maxWidth > originalWidth) {
					t.find('ol').width(maxWidth).end()
						.hover(function(){
							t.stop(true).animate({
								width: Math.min(maxWidth + 10, 900)
							}, 300);
						}, function(){
							t.stop(true).animate({
								width: originalWidth
							}, 300);
						});
				}
			});
		}, 100);
	}
});

// Style injection, a la GM_addStyle, but using JSON syntax
(function (style_obj) {
	var styleText = '',
		style = document.createElement('style');

	for (var i in style_obj) {
		styleText = styleText + i + '{';
		for (var p in style_obj[i]) {
			styleText += p + ':' + style_obj[i][p] + ';';
		}
		styleText += '}';
	}

	style.innerHTML = styleText;
	document.getElementsByTagName('head')[0].appendChild(style);
})({
	'pre': {
		'font-size': '12px',
		'line-height': '1.2em',
		'z-index': '100000',
		'position': 'relative'
	},
	'pre ol': {
		'margin': '0',
		'list-style': 'none'
	},
	'pre ol li': {
		'line-height': '1em',
		'counter-increment': 'line-number',
		'padding-top': '2px'
	},
	'pre ol li:hover': {
		'background': '#DEEDFF'
	},
	'pre ol li:before': {
		'display': 'inline-block',
		'width': '20px',
		'text-align': 'right',
		'padding-right': '8px',
		'margin-right': '8px',
		'border-right': '1px solid',
		'color': '#ccc',
		'content': 'counter(line-number)',
		'padding-top': '2px',
		'margin-top': '-2px'
	},
	'pre li:nth-child(even)': {
		'background': '#f3f3f3'
	},
	'pre ol li code': {
		'background': 'transparent'
	}
});