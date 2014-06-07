// ==UserScript==
// @name        begunify
// @namespace   begunify
// @author      fanerkin
// @description ad insertion
// @include     /.*gazeta\.ru.*/
// @grant       none
// @version     0.0.0.11
// ==/UserScript==


(function (w) {
	var
		samples,
		d = w.document;

	function getSpread(n) {
		return (
				Math.random() * (
					(n|0) + 1
				)
			)|0;
	}

	function putBlock(o) {
		var
			el,
			blockOptions,
			newBlock;

		o || (o = {});

		el = typeof o.parent == 'string' ?
			d.querySelector(o.parent) :
			o.parent;
		el = typeof o.index == 'undefined' ?
			el :
			el.querySelectorAll(o.children)[
				(o.index - 1)
			];

		blockOptions = o.blockOptions || {};

		newBlock = document.createElement('div');
		newBlock.innerHTML =
			(
				typeof o.template == 'string' ?
					getBlockRe(blockOptions, o.template) :
					''
			);
	
		newBlock = el.parentNode.insertBefore(
			newBlock.firstChild,
			el
		);

		blinkBlock(newBlock);
	}

	function blinkBlock(el) {
		var
			blockStyles = '-webkit-transition: background 0.1s;-moz-transition: background 0.1s;-o-transition: background 0.1s;transition: background 0.1s;',
			blinkClass = 'begun_block_blink',
			blockBlinkStyles = 'background: #ffffe0';

		if (!d.getElementById(blinkClass)) {
			d.querySelector('body')
				.insertAdjacentHTML(
					'afterBegin',
					'<style id="' + blinkClass + '">.' + blinkClass + '{' + blockBlinkStyles + '}</style>'
				);
		}

		el.style += blockStyles;

		if (el.classList) {
			el.classList.add(blinkClass);
			w.setTimeout(
				function () {
					el.classList.remove(blinkClass);
				},
				400
			);
		}
	}

	function getBlockRe(o, template) {
		var
			key,
			subkey;

		for (key in o) {
			for (subkey in o[key]) {
				template =
					template
						.replace(
							new RegExp('{{ ?' + key + '.' + subkey + ' ?}}', 'g'),
							(o[key][subkey] || '')
						);
			}
		}

		return template;
	}

	sample = {
		gazetaMain: function () {
			function getBlock(o) {
				return '<article class="uho">' +
							(o.subject ?
								'<h3 class="dh">' +
									'<a href="' + o.subject.link + '">' + o.subject.text + '</a>' +
								'</h3>' :
								''
							) +
							(o.time ?
								'<time pubdate="' + o.time.pubdate + '" class="date dark_text">' +
									o.time.text + '</time>' :
									''
							) +
							(o.title ?
								'<h2 class="h3 mb10">' +
									'<a href="' + o.title.link + '">' + o.title.text + '</a>' +
								'</h2>' :
								''
							) +
							(o.picture ?
								'<a class="pic_href" href="' + o.picture.link + '">' +
									'<img class="pic120" src="' + o.picture.src + '">' +
								'</a>':
								''
							) +
							'<div class="no_float">' +
								(o.intro ?
									'<p class="intro">' +
										'<a href="' + o.intro.link + '">' + o.intro.text + '</a>' +
									'</p>' :
									''
								) +
								// (o.comments ?
								// 	'<ul class="mm_addition">' +
								// 		'<li class="i_recall">' +
								// 			'<a href="' + o.comments.link + '">' + o.comments.text + '</a>' +
								// 		'</li>' +
								// 	'</ul>' :
								// 	''
								// ) +
							'</div>' +
						'<hr></article>';
			}

			return getBlock({
				subject: {
					link: '{{subject.link}}',
					text: '{{subject.text}}'
				},
				title: {
					link: '{{title.link}}',
					text: '{{title.text}}'
				},
				picture: {
					link: '{{picture.link}}',
					src: '{{picture.src}}'
				},
				intro: {
					link: '{{intro.link}}',
					text: '{{intro.text}}'
				},
				comments: {
					link: '{{comments.link}}',
					text: '{{comments.text}}'
				},
				time: {
					pubdate: '{{time.pubdate}}',
					text: '{{time.text}}'
				}
			});
		},
		gazetaPolitics: function () {
			return '' +
				'<article class="uho">' +
					'<a class="pic_href" href="{{ picture.link }}">' +
						'<img class="pic150" src="{{ picture.src }}">' +
					'</a>' +
					'<h3 class="dh2">' +
						'<a href="{{ subject.link }}">{{ subject.text }}</a>' +
					'</h3>' +
					'<time pubdate="{{ time.pubdate }}" class="date dark_text">{{ time.text }}</time>' +
					'<h2 class="h5 mb10">' +
						'<a href="{{ title.link }}">{{ title.text }}</a>' +
					'</h2>' +
					'<p class="intro">' +
						'<a href="{{ intro.link }}">{{ intro.text }}</a>' +
					'</p>' +
					'<ul class="mm_addition">' +
						'<li class="i_recall">' +
							'{{ comments.text }}' +
						'</li>' +
					'</ul>' +
				'</article>';
		},
		gazetaTech: function () {
			return '' +
				'<article class="uho">' +
					'<a class="pic_href" href="{{ picture.link }}">' +
						'<img class="pic150" src="{{ picture.src }}">' +
					'</a>' +
					'<h3 class="dh2">' +
						'<a href="{{ subject.link }}">{{ subject.text }}</a>' +
					'</h3>' +
					'<time pubdate="{{ time.pubdate }}" class="date dark_text">{{ time.text }}</time>' +
					'<h2 class="h5 mb10">' +
						'<a href="{{ title.link }}">{{ title.text }}</a>' +
					'</h2>' +
					'<p class="intro">' +
						'<a href="{{ intro.link }}">{{ intro.text }}</a>' +
					'</p>' +
				'</article>';
		},
		gazetaComments: function () {
			return '' +
				'<article class="uho">' +
					'<h3 class="dh">' +
						'<a href="{{ addr.here }}">{{ text.here }}</a>' +
					'</h3>' +
					'<time pubdate="{{ time.here }}" class="date dark_text">{{ time.here }}</time>' +
					'<h2 class="h3 mb10">' +
						'<a href="{{ addr.here }}">{{ text.here }}</a>' +
					'</h2>' +
					'<a class="pic_href" href="{{ addr.here }}"><img class="pic120" src="{{ addr.here }}"></a>' +
					'<div class="no_float">' +
						'<p class="intro">' +
							'<a href="{{ addr.here }}">{{ text.here }}</a>' +
						'</p>' +
						'<ul class="mm_addition">' +
							'<li class="i_recall">' +
								'<a href="{{ addr.here }}"><span class="number">{{ number.here }}</span> {{ text.here }}</a>' +
							'</li>' +
						'</ul>' +
					'</div>' +
				'</article>';
		},
		gazetaOpposition: function (ml) {
			return '' +
				'<div class="c350 eq_h ml' + ml + '">' +
					'<div class="p10_flank">' +
						'<article class="uho big_picture">' +
							'<time pubdate="{{ subject.link }}" class="date dark_text">{{ subject.text }}</time>' +
							'<h2 class="h1 mb10">' +
								'<a href="{{ title.link }}">{{ title.text }}</a>' +
							'</h2>' +
							'<a class="pic_href" href="{{ picture.link }}">' +
								'<img class="pic330" src="{{ picture.src }}">' +
							'</a>' +
							'<p class="intro">' +
								'<a href="{{ intro.link }}">{{ intro.text }}</a>' +
							'</p>' +
						'</article>' +
					'</div>' +
				'</div>';
		},
		gazetaInner: function () {
			return '' +
				'<article>' +
					'<p class="h5 mb10">' +
						'<a target="_blank" href="{{ subject.link }}">{{ subject.text }}</a>' +
					'</p>' +
					'<a target="_blank" href="{{ picture.link }}">' +
						'<img class="pic" src="{{ picture.src }}">' +
					'</a>' +
					'<p class="intro">' +
						'<a target="_blank" href="{{ intro.link }}">{{ intro.text }}</a>' +
					'</p>' +
				'</article>';
		}
	};

	function putGazetaMain() {
		if (!d.querySelectorAll('.c330').length) {
			return false;
		}

		putBlock({
			parent: '.c330',
			children: '.uho',
			index: 4 + getSpread(1),
			template: sample.gazetaMain(),
			blockOptions: {
				subject: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					text: 'Новости партнера'
				},
				title: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					text: 'Билайн запускает LTE в Санкт-Петербурге'
				},
				picture: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					src: 'http://www.ferra.ru/images/373/373046.jpg'
				},
				intro: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					text: 'Билайн объявляет о запуске в коммерческую эксплуатацию сети LTE (4G) в Санкт-Петербурге. В настоящее время завершён первый этап строительства практически во всех районах Санкт-Петербурга, а также в городах… →'
				},
				comments: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					text: '+++'
				},
				time: {
					pubdate: '2014-03-03T14:17:19+04:00',
					text: '03.03.2014, 16:02'
				}
			}
		});
	}

	function putGazetaPolitics() {
		if (!d.querySelector('.c510') ||
				d.querySelector('.c330') ||  // main
				~w.location.href.indexOf('gazeta.ru/comments') // comments
			) {
			return false;
		}

		putBlock({
			parent: '.c510',
			children: '.uho',
			index: 4 + getSpread(2),
			template: sample.gazetaPolitics(),
			blockOptions: {
				subject: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					text: 'Новости партнера'
				},
				title: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					text: 'Билайн запускает LTE в Санкт-Петербурге'
				},
				picture: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					src: 'http://www.ferra.ru/images/373/373046.jpg'
				},
				intro: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					text: 'Билайн объявляет о запуске в коммерческую эксплуатацию сети LTE (4G) в Санкт-Петербурге. В настоящее время завершён первый этап строительства практически во всех районах Санкт-Петербурга, а также в городах… →'
				},
				comments: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					text: '+++'
				},
				time: {
					pubdate: '2014-03-03T14:17:19+04:00',
					text: '03.03.2014, 16:02'
				}
			}
		});
	}

	function putGazetaTech() {
		if (d.querySelectorAll('.c170').length != 2) {
			return false;
		}

		putBlock({
			parent: '.c170',
			children: '.uho',
			index: 1 + getSpread(1),
			template: sample.gazetaTech(),
			blockOptions: {
				subject: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					text: 'Новости партнера'
				},
				title: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					text: 'Билайн запускает LTE в Санкт-Петербурге'
				},
				picture: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					src: 'http://www.ferra.ru/images/373/373046.jpg'
				},
				intro: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					text: 'Билайн объявляет о запуске в коммерческую эксплуатацию сети LTE (4G) в Санкт-Петербурге. В настоящее время завершён первый этап строительства практически во всех районах Санкт-Петербурга, а также в городах… →'
				},
				comments: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					text: '+++'
				},
				time: {
					pubdate: '2014-03-03T14:17:19+04:00',
					text: '03.03.2014, 16:02'
				}
			}
		});
	}

	function putGazetaComments() {
		if (!~w.location.href.indexOf('gazeta.ru/comments')) {
			return false;
		}

		putBlock({
			parent: '.c510',
			children: '.uho',
			index: 4 + getSpread(3),
			template: sample.gazetaMain(),
			blockOptions: {
				subject: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					text: 'Новости партнера'
				},
				title: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					text: 'Билайн запускает LTE в Санкт-Петербурге'
				},
				picture: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					src: 'http://www.ferra.ru/images/373/373046.jpg'
				},
				intro: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					text: 'Билайн объявляет о запуске в коммерческую эксплуатацию сети LTE (4G) в Санкт-Петербурге. В настоящее время завершён первый этап строительства практически во всех районах Санкт-Петербурга, а также в городах… →'
				},
				comments: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					text: '+++'
				},
				time: {
					pubdate: '2014-03-03T14:17:19+04:00',
					text: '03.03.2014, 16:02'
				}
			}
		});
	}

	function putGazetaOpposition() {
		var
			spread = getSpread(1);

		if (!d.querySelectorAll('.c710 .c350').length ||
				d.querySelectorAll('.c710 .c530 .c350').length) { // tech
			return false;
		}

		putBlock({
			parent: '.c710',
			children: '.c350',
			index: 3 + spread,
			template: sample.gazetaOpposition(spread ? '4' : '0'),
			blockOptions: {
				subject: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					text: 'Новости партнера'
				},
				title: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					text: 'Билайн запускает LTE в Санкт-Петербурге'
				},
				picture: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					src: 'http://www.ferra.ru/images/373/373046.jpg'
				},
				intro: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					text: 'Билайн объявляет о запуске в коммерческую эксплуатацию сети LTE (4G) в Санкт-Петербурге. В настоящее время завершён первый этап строительства практически во всех районах Санкт-Петербурга, а также в городах… →'
				},
				comments: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					text: '+++'
				},
				time: {
					pubdate: '2014-03-03T14:17:19+04:00',
					text: '03.03.2014, 16:02'
				}
			}
		});
	}

	function putGazetaInner() {
		if (!d.querySelector('.c240') ||
				!d.querySelector('.b-main_today') ||
				d.querySelectorAll('.c710 .c350').length) { // opposition
			return false;
		}

		putBlock({
			parent: '.b-main_today',
			children: 'article',
			index: 2 + getSpread(2),
			template: sample.gazetaInner(),
			blockOptions: {
				subject: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					text: 'Новости партнера'
				},
				title: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					text: 'Билайн запускает LTE в Санкт-Петербурге'
				},
				picture: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					src: 'http://www.ferra.ru/images/373/373046.jpg'
				},
				intro: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					text: 'Билайн объявляет о запуске в коммерческую эксплуатацию сети LTE (4G) в Санкт-Петербурге. →'
				},
				comments: {
					link: 'http://www.gazeta.ru/tech/news/2014/03/11/n_6004213.shtml',
					text: '+++'
				},
				time: {
					pubdate: '2014-03-03T14:17:19+04:00',
					text: '03.03.2014, 16:02'
				}
			}
		});
	}

	function putAll() {
		if (~w.location.href.indexOf('gazeta.ru')) {
			putGazetaMain();
			putGazetaPolitics();
			putGazetaTech();
			putGazetaComments();
			putGazetaOpposition();
			putGazetaInner();
		}
	}

	function waitForFooter() {
		var
			loop;

		loop = w.setInterval(function () {
			if (	d.querySelector('.main_frame > footer')
				) {
				w.clearInterval(loop);
				putAll();
			}
		}, 100);
	}

	waitForFooter();
})(window.parent);