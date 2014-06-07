// ==UserScript==
// @name Twilog Template
// @namespace http://sakuratan.biz/
// @description Applies templates on getting HTML source of Twilog
// @include http://twilog.org/*
// @include http://twilog.org/tweets.cgi
// @exclude http://twilog.org/
// @exclude http://twilog.org/*.cgi
// @exclude http://twilog.org/*.cgi#*
// @exclude http://twilog.org/rss-feed/*
// ==/UserScript==

(function() {

    if (!unsafeWindow.func || !unsafeWindow.$) {
	return;
    }

    var $ = unsafeWindow.$;

    var template_defaults = {
	template_header:  '<ul>',
	template_content: '<li>%text% %image%<a href="%url%">#</a></li>',
	template_footer:  '</ul>'
    };

    function get_template(name) {
	return GM_getValue(name, template_defaults[name]);
    }

    function radius(jq, px) {
	if (!px) {
	    px = '6px';
	}
	jq.css('-moz-border-radius-bottomleft', px);
	jq.css('-moz-border-radius-bottomright', px);
	jq.css('-moz-border-radius-topleft', px);
	jq.css('-moz-border-radius-topright', px);
    }

    function init_menu() {
	var order = $('#order');

	var p = $('<p><span style="font-weight:bold;color:#888888">\u30c6\u30f3\u30d7\u30ec\u30fc\u30c8</span> : </p>');
	var a = $('<a href="javascript:void(0)">\u7de8\u96c6</a>');
	a.css({
	    cursor: 'pointer'
	});
	$(p).append(a);
	$(order).append(p);

	var form = $('<form></form>');
	form.css({
	    position: 'absolute',
	    top: 0,
	    left: 0,
	    display: 'none',
	    fontSize: '10px',
	    backgroundColor: 'white',
	    padding: '1em',
	    border: 'solid 1px gray',
	    zIndex: 1
	});
	radius(form);

	form.append('<p><b><q>HTML\u30bd\u30fc\u30b9\u53d6\u5f97</q>\u30c6\u30f3\u30d7\u30ec\u30fc\u30c8\u3092\u7de8\u96c6\u3067\u304d\u307e\u3059\u3002</b></p>');

	var para = $('<p>\u30d8\u30c3\u30c0:<br /></p>');
	para.css('margin-top', '1em');
	form.append(para);
	var header = $('<textarea name="header" rows="2" cols="45"></textarea>');
	header.css('overflow', 'auto');
	para.append(header);

	para = $('<p>\u30ea\u30b9\u30c8:<br /></p>');
	para.css('margin-top', '1em');
	form.append(para);
	var content = $('<textarea name="content" rows="2" cols="45"></textarea>');
	content.css('overflow', 'auto');
	para.append(content);
	para.append('<br />\u7f6e\u63db\u5909\u6570: %text%=\u30c6\u30ad\u30b9\u30c8, %image%=\u753b\u50cf, %url%=URL, %time%=\u6642\u523b, %%=%');

	para = $('<p>\u30d5\u30c3\u30bf:<br /></p>');
	para.css('margin-top', '1em');
	form.append(para);
	var footer = $('<textarea name="footer" rows="2" cols="45"></textarea>');
	footer.css('overflow', 'auto');
	para.append(footer);

	para = $('<p align="center"></p>');
	para.css('margin-top', '1em');
	form.append(para);

	var updateButton = $('<input type="button" value="\u66f4\u65b0" />');
	updateButton.css({
	    border: 'solid 1px gray',
	    height: '2em',
	    width: '5em',
	    cursor: 'pointer'
	});
	radius(updateButton);
	para.append(updateButton);

	para.append('&nbsp;&nbsp;&nbsp;');

	var closeButton = $('<input type="button" value="\u9589\u3058\u308b" />');
	closeButton.css({
	    border: 'solid 1px gray',
	    height: '2em',
	    width: '5em',
	    cursor: 'pointer'
	});
	radius(closeButton);
	para.append(closeButton);

	var wrapper = $('<div></div>');
	wrapper.css('position', 'relative');
	wrapper.append(form);
	wrapper.insertBefore(order);

	a.click(function() {
	    if (form.css('display') == 'none') {
		window.setTimeout(function() {
		    header.get(0).value = get_template('template_header');
		    content.get(0).value = get_template('template_content');
		    footer.get(0).value = get_template('template_footer');
		    form.css('display', 'block');
		}, 0);
	    } else {
		form.css('display', 'none');
	    }
	});

	updateButton.click(function() {
	    template_header = header.get(0).value;
	    template_content = content.get(0).value;
	    template_footer = footer.get(0).value;
	    window.setTimeout(function() {
		GM_setValue('template_header', template_header);
		GM_setValue('template_content', template_content);
		GM_setValue('template_footer', template_footer);
	    }, 0);
	    form.css('display', 'none');
	});

	closeButton.click(function() {
	    form.css('display', 'none');
	});
    }

    function html_entities(s) {
	return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function replace_src(s) {
	var matches = s.match(/^([\s\S]*?<textarea\b[^>]*>\s*)([\s\S]*?)(\s*<\/textarea>[\s\S]*)$/m);
	if (!matches || !matches.length || matches.length != 4) {
	    return s;
	}

	var template_header = get_template('template_header');
	var template_content = get_template('template_content');
	var template_footer = get_template('template_footer');

	// pre header
	var ret = matches[1];

	// header
	ret += (template_header ? html_entities(template_header) : '');

	// list
	if (template_content) {
	    var expr = html_entities(template_content).replace(/\$/g, '$$$$').replace(/%text%/g, '\$1').replace(/%image%/g, '\$2').replace(/%url%/g, '\$3').replace(/%time%/g, '\$4').replace(/%%/g, '%');
	    ret += matches[2].replace(/&lt;div class=&quot;tl-tweet&quot;&gt;&lt;p class=&quot;tl-text&quot;&gt;([\s\S]*?)&lt;\/p&gt;([\s\S]*?)&lt;p class=&quot;tl-posted&quot;&gt;posted at &lt;a href=&quot;([\s\S]*?)&quot; target=&quot;_blank&quot;&gt;([\s\S]*?)&lt;\/a&gt;&lt;\/p&gt;&lt;\/div&gt;[\s]*/g, expr);
	} else {
	    ret += matches[2];
	}

	// footer
	ret += (template_footer ? html_entities(template_footer) : '');

	// post footer
	ret += matches[3];

	return ret;
    }

    function init_ajax_func() {
	var orig_func = unsafeWindow.func;
	var orig_get_source_success = unsafeWindow.get_source_success;
	var new_get_source_success = function(src) {
	    unsafeWindow.get_source_success = window.setTimeout(function() {
		orig_get_source_success(replace_src(src));
	    }, 0);
	};

	unsafeWindow.func = function(date, type) {
	    if (type == '__template__') {
		unsafeWindow.get_source_success = new_get_source_success;
	    } else {
		unsafeWindow.get_source_success = orig_get_source_success;
	    }
	    orig_func(date, type);
	}
    }

    function init_bar_main() {
	var tds = $('.bar-main tr:first-child td:nth-child(2)');
	for (var i = 0; i < tds.length; ++i) {
	    var href = $('a', tds[i]).get(0).href.replace(/''/g, "'__template__'");
	    var a = $('<a href="' + href + '">\u30c6\u30f3\u30d7\u30ec</a>');
	    a.css({
		fontSize: '8px',
		textDecoration: 'none',
		backgroundColor: '#eeeeee',
		border: 'solid 1px #aaaaaa',
		padding: '3px 2px 3px 1px',
		color: '#777777',
		verticalAlign: 'middle',
		fontWeight: 'bold'
	    });
	    radius(a, '3px');
	    $(tds[i]).append(a);
	}
    }

    init_menu();
    init_ajax_func();
    init_bar_main();
})();
