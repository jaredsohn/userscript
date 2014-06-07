// ==UserScript==
// @name           unylchan
// @namespace      http://wakachan.org/unyl/
// @description    unylchan 2.1 (beta)
// @include        http://wakachan.org/*
// @include        http://*.wakachan.org/*
// @include        http://iichan.ru/*
// @include        http://*.iichan.ru/*
// @include        http://iichan.net/*
// @include        http://*.iichan.net/*
// @include        http://iiichan.net/*
// @include        http://*.iiichan.net/*
// @include        http://410chan.ru/*
// @include        http://*.410chan.ru/*
// @include        http://4chan.org/*
// @include        http://*.4chan.org/*
// @include        http://2ch.so/*
// @include        http://*.2ch.so/*
// @include        http://dobrochan.ru/*
// @include        http://*.dobrochan.ru/*
// @include        http://2--ch.ru/*
// @include        http://*.2--ch.ru/*
// @include        http://1chan.ru/*
// @include        http://*.1chan.ru/*
// @include        http://1chan.net/*
// @include        http://*.1chan.net/*
// @include        http://sovietrussia.org/*
// @include        http://*.sovietrussia.org/*
// @include        http://pooshlmer.com/*
// @include        http://*.pooshlmer.com/*
// @author         unylnonymous
// ==/UserScript==

var categories = {
	'Общее' : {
		'http://www.wakachan.org/unyl/' : '/unyl/ - Унылчан',
		'http://1chan.ru/news/all/' : '/news/ - Новости канала',
		'http://iichan.ru/d/' : '/d/ - Работа сайта',
		'http://boards.4chan.org/g/' : '/g/ - Технологии',
		/*
		'http://dobrochan.ru/b/' : '/b/ - Доброта',
		'http://410chan.ru/b/' : '/b/ - Автобусота',
		'http://2ch.so/b/' : '/b/ - Хуита',
		'http://2--ch.ru/b/' : '/b/ - Скукота',
		*/
	},
	'Досуг' : {
		'http://boards.4chan.org/a/' : '/a/ - Аниму и манго',
		'http://boards.4chan.org/v/' : '/v/ - Видияигры',
	},
	'Двигающиеся картинки' : {
		'http://boards.4chan.org/f/' : '/f/ - Флэшшшш',
		'http://boards.4chan.org/gif/' : '/gif/ - Анимированные изображения',
	},
}

var menu_width = 200; // pixels

var logo_height = 149;
var logo_data_C_Anonymous = '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';

var css_hacks = {
	'boards.4chan.org' : '#header { position: static !important; }',
}

var aliases = {
	'http://1chan.ru/news/' : 'http://1chan.ru/news/all/',
}

function install_menu() {
	var menu = document.createElement('div');
	menu.setAttribute('id', 'unylchong_20');
	
	var title = document.createElement('div');
	title.setAttribute('class', 'unylchong_title');
	title.textContent = 'Unyl;Chan'
	menu.appendChild(title);
	
	var logo = document.createElement('div');
	logo.setAttribute('class', 'unylchong_logo');
	menu.appendChild(logo);
	
	var ul = document.createElement('ul');	
	
	var i = 0;
	for (var cat in categories) {
		var cat_li = document.createElement('li');
		cat_li.setAttribute('class', 'unylchong_cat unylchong_cat_' + i);
		cat_li.textContent = cat;
		ul.appendChild(cat_li);
	
		for (var board in categories[cat]) {
			var li = document.createElement('li');
			li.setAttribute('class', 'unylchong_ref unylchong_ref_' + i);
			
			var a = document.createElement('a');
			a.setAttribute('href', board);
			a.textContent = categories[cat][board];
		
			li.appendChild(a);
			ul.appendChild(li);
		}
		
		++i;
	}
	
	menu.appendChild(ul);
	
	document.body.appendChild(menu);
}

function install_css() {
	var haxx = css_hacks[location.host];

	var unyl_css = document.createElement('style');
	unyl_css.type = 'text/css';
	unyl_css.textContent = 'div#unylchong_20 { font-family: Tahoma, Verdana; background-color: #FFE; position: fixed; overflow: auto; left: 0px; top: 0px; bottom: 0px; width: ' + (menu_width) + 'px; height: auto; border-right: 1px solid black; z-index: 999; }'
		+ 'div#unylchong_20 ul { list-style-type: none; padding: 10px; margin: 0; }'
		+ 'body { margin-left: ' + menu_width + 'px !important; padding-left: 5px !important; }'
		+ '.unylchong_title { text-align: center; font-weight: bold; font-size: 20pt; font-family: Times, Serif; color: #000; }'
		+ '.unylchong_logo { text-align: center; width: 100%; height: ' + logo_height + 'px; background: url(data:image/gif;base64,' + (logo_data_C_Anonymous) + ') no-repeat center; }'
		+ '.unylchong_cat { margin-top: 2px; padding: 0px 3px; font-size: 9pt; font-weight: bold; background: #FEB; color: #000; text-align: center; border: 1px solid #000; }'
		+ '.unylchong_ref { font-size: 7.5pt; background: #FCFCCC; }'
		+ '.unylchong_ref a { font-weight: bold; color: #D13131 !important; }'
		+ (haxx || '');

	document.head.appendChild(unyl_css);
}

function do_the_thing() {
	var place = location.href;

	for (var i in aliases) {
		if (place.match(i)) {
			place = aliases[i];
			break;
		}
	} 

	for (var cat in categories) {
		for (var board in categories[cat]) {
			if (place.match(board)) {
				return categories[cat][board];
			}
		}
	}

	return false;
}

function unylize() {
	var thing = do_the_thing();

//	console.log(location.href + ': doing the thing: ' + thing);

	if (thing) {
		document.title = thing;

		install_css();
		install_menu();
	}
}

(function() { 
	
	unylize();
	
})();

