// ==UserScript==
// @name DP
// @author Wasacz
// @version 7.5
// @include http://www.dobreprogramy.pl/
// @include http://www.dobreprogramy.pl/*
// @exclude http://www.dobreprogramy.pl/*.ashx
// @exclude http://www.dobreprogramy.pl/*.ashx?*
// ==/UserScript==

(function(window, document, opera, undefined) {

	var DP = {

		settings:
		{
			/**
			 * Wyświetlanie komunikatów o ewentualnych błędach wykonywania się
			 * skryptu. Komunikaty zawierają informacje o wyjątku, a ich treść
			 * zależna jest od przeglądarki użytkownika.
			 */
			alertExceptions: 1,

			/**
			 * Opcje dotyczące alternatywnych arkuszy stylów przeznaczonych
			 * do wyświetlania na ekranach o różnych rozmiarach.
			 *
			 * Ustawienie opcji „1” włącza skalowanie obszaru strony podczas
			 * zmiany rozmiaru okna przeglądarki użytkownika.
			 *
			 * Ustawienie opcji „2” wymusza wyświetlanie strony z arkuszem
			 * stylów przeznaczonym do wyświetlania na standardowym ekranie.
			 */
			widescreenBehavior: 1,

			/**
			 * Zapobieganie generowaniu błędów JavaScript w przypadku,
			 * gdy skrypty odpowiedzialne za wyświetlanie treści reklamowych
			 * zostały zablokowane.
			 */
			fixBlockedScripts: 1,

			/**
			 * Umożliwienie logowania do serwisu za pomocą menedżerów haseł.
			 *
			 * Oryginalny formularz logowania jest zbudowany w sposób,
			 * który uniemożliwia automatyczne logowanie wspomnianą metodą.
			 */
			fixLoginForm: 1,

			/**
			 * Stwierdzono występowanie krytycznego błędu, który objawia się
			 * brakiem przecinka w zwrocie powitalnym na górnym panelu
			 * użytkownika. Włączenie tej opcji rozwiązuje opisywany
			 * problem i jest wysoce zalecane.
			 */
			fixPanelText: 1,

			/**
			 * Uzupełnienie odnośników w sekci „Ostatnio na forum” o odpowiednie
			 * etykiety tekstowe.
			 *
			 * Włączenie tej opcji ma sens tylko wtedy, gdy jednocześnie
			 * zaaplikowano odpowiedni arkusz stylów z regułami skracającymi
			 * zbyt długie tytuły wątków do jednej linii.
			 */
			setTopicList: 1,

			/**
			 * Włączenie funkcjonalności permalinków dla komentarzy
			 * użytkowników.
			 *
			 * Numer komentarza, znajdujący się w prawym górnym rogu ramki,
			 * zastąpiony zostanie odpowiednim permalinkiem.
			 */
			enablePermalinks: 1,

			/**
			 * Optymalizacja metody włączającej funkcjonalnośc permalinków.
			 *
			 * Wymuszane jest dwusekundowe opóźnienie w generowaniu odnośników.
			 * Pozwala to zmniejszyć obciążenie przeglądarki podczas wczytywania
			 * strony.
			 */
			optimizePermalinks: 1,

			/**
			 * Włączenie dostępu do zrzutów ekranowych w oryginalnych
			 * rozmiarach.
			 *
			 * Na serwerze znajdują się obrazki będące zrzutami ekranowymi.
			 * Jeśli nie zostały one zgrupowane w galerię, dostęp do nich
			 * nie jest możliwy z poziomu serwisu.
			 */
			accessScreenshots: 1,

			/**
			 * Dołączenie w stopce strony odnośnika, którego kliknięcie powoduje
			 * przewinięcie strony do góry.
			 */
			enableBackToTop: 1,

			/**
			 * Wyświetlanie informacji o wersji skryptu i czasie jego
			 * wykonywania się.
			 *
			 * Ze pewnych powodów wyłączenie tej opcji nie powoduje wyłączenia
			 * licznika czasu wykonywania się skryptu.
			 */
			appendSignature: 1
		},

		lang:
		{
			screenshotFullSize: 'Rozmiar oryginalny',
			backToTop: 'Powrót do góry',
			scriptInfo: 'dp.js v{version} [Wasacz] @ {diff}'
		},

		environment:
		{
			version: 7.5,
			baseURI: 'http://www.dobreprogramy.pl/',
			isUserLoggedIn: false
		},

		bootstrap: function()
		{
			try {
				this.checkIfErrorPage();
			}
			catch (e) {
				return;
			}

			try {
				this.Benchmark.start();
				this.fixWindowWidth();
				this.fixBlockedScripts();
				this.Benchmark.stop();
			}
			catch (e) {
				if (this.settings.alertExceptions) {
					alert(e);
				}
			}

			var self = this;
			document.addEventListener('DOMContentLoaded', function() {
				self.processDocument();
			}, false);
		},

		processDocument: function()
		{
			try {
				this.Benchmark.start();
				this.checkUserLoggedIn();
				this.fixStyleSheetMedia();
				this.fixLoginForm();
				this.fixPanelText();
				this.setTopicList();
				this.handleCommentPermalinks();
				this.accessScreenshots();
				this.enableBackToTop();
				this.Benchmark.stop();
				this.appendSignature();
			}
			catch (e) {
				if (this.settings.alertExceptions) {
					alert(e);
				}
			}
		},

		checkIfErrorPage: function()
		{
			if (document.title && document.title == 'Błąd serwera') {
				throw new Error();
			}
		},

		Benchmark:
		{
			timer: { time: 0, diff: 0 },

			start: function() {
				this.timer.time = new Date().getTime();
			},
			stop: function() {
				this.timer.diff += new Date().getTime() - this.timer.time;
			}
		},

		fixWindowWidth: function()
		{
			if (!this.settings.widescreenBehavior) return;
			var isWide = (this.settings.widescreenBehavior === 1) ? true : false;

			opera.defineMagicVariable(
				'loadExtendedPage',
				function() { return isWide; },
				function() {}
			);
		},

		fixBlockedScripts: function()
		{
			if (!this.settings.fixBlockedScripts) return;

			window.OA_show = window.OA_show || function() {};
			window._gat =  window._gat || {
				_getTracker: function() {
					return {
						_setDomainName: function() {},
						_trackPageview: function() {}
					}
				}
			};
		},

		checkUserLoggedIn: function()
		{
			if (document.querySelector('#header .user_panel[id$="_IsLogin"]')) {
				this.environment.isUserLoggedIn = true;
			}
		},

		fixStyleSheetMedia: function()
		{
			if (this.settings.widescreenBehavior !== 1) return;

			var stylesheet = document.querySelector('head > link[rel="stylesheet"][href*="/style-wide.css?"]');
			if (!stylesheet) return;

			stylesheet.setAttribute('media', 'screen and (min-width: 1280px)');
		},

		fixLoginForm: function()
		{
			if (!this.settings.fixLoginForm || this.environment.isUserLoggedIn) return;

			var fieldset = document.querySelector('#header .user_panel > div[id$="_LoginPanel"]');
			if (!fieldset || !fieldset.parentNode) return;

			var container = fieldset.querySelector('div[id$="_panLogin"]');
			if (!container) return;

			container.onkeypress = undefined;

			var button = fieldset.querySelector('a[id$="_LoginBtn"][href]');
			if (!button) return;

			var form = document.createElement('form');
			form.setAttribute('method', 'post');
			form.setAttribute('action', button.getAttribute('href'));

			fieldset.parentNode.insertBefore(form, fieldset);
			form.appendChild(fieldset);

			var fs = fieldset.style;
			fs.display = 'block';
			fs.top = '-200px';

			// …i poprawki skopanych żądań XHR
			(function(){
				try {
					var links = document.querySelectorAll('#content .komentarze h3#komentarze > a[id$="_lnkChangeOrder"][href^="javascript:"], '
						+'#content .komentarze > div[id$="_panUpdateOldVersion"] > h3 > a[id][href^="javascript:"]');

					var l = links.length;
					if (!l) return;

					var prm = window.Sys.WebForms.PageRequestManager.getInstance();
					var replay = arguments.callee;

					for (var i = 0, link; i < l; i++) {
						link = links[i];
						if (link._hasAjaxRequestFix !== undefined) {
							continue;
						}

						link._hasAjaxRequestFix = true;
						link.addEventListener('click', function(e) {
							prm.add_endRequest(function() {
								fs.top = '-200px'; replay();
								prm.remove_endRequest(arguments.callee);
							});
							window.__doPostBack(this.getAttribute('id').replace(/_/g, '$'), '');
							e.preventDefault();
						}, false);
					}
				}
				catch (e) {}
			})();
		},

		fixPanelText: function()
		{
			if (!this.settings.fixPanelText || !this.environment.isUserLoggedIn) return;

			var panel = document.querySelector('#header .user_panel > span.userPanelText');
			if (!panel) return;

			var greeting = panel.firstChild;
			if (greeting && greeting.nodeType == 3) {
				greeting.nodeValue = greeting.nodeValue.replace(' ', ', ');
			}
		},

		setTopicList: function()
		{
			if (!this.settings.setTopicList) return;

			var topics = document.querySelectorAll('#content #a2 ul > li > a');

			var l = topics.length;
			if (!l) return;

			for (var i = 0, topic, title; i < l; i++) {
				topic = topics[i];
				title = topic.textContent;
				if (title) {
					topic.setAttribute('title', title);
				}
			}
		},

		handleCommentPermalinks: function()
		{
			if (!this.settings.enablePermalinks) return;

			setTimeout(function() {
				var comments = document.querySelectorAll('#content .komentarze .item[id]');

				var l = comments.length;
				if (!l) return;

				for (var i = 0, comment, id, number, nth, permalink; i < l; i++) {
					comment = comments[i];
					id = comment.getAttribute('id');

					number = comment.querySelector('.commentContent > span.numer');
					if (!number || !number.parentNode || !number.textContent) continue;

					nth = parseInt(number.textContent.substring(1)) || 0;

					permalink = document.createElement('a');
					permalink.className = 'numer';
					permalink.setAttribute('href', '#'+ id);
					permalink.setAttribute('title', 'Permalink do komentarza #'+ nth);
					permalink.appendChild(document.createTextNode('#'+ nth));

					number.parentNode.replaceChild(permalink, number);
				}
			}, (this.settings.optimizePermalinks ? 2000 : 0));
		},

		accessScreenshots: function()
		{
			if (!this.settings.accessScreenshots) return;

			var thumbnail = document.querySelector('#content .toolItem .screenshot > img[src]');
			if (!thumbnail) return;

			var screenshot = thumbnail.getAttribute('src').split('&')[0];

			var a = document.createElement('a');
			var clear = document.createElement('span');
			var icon = document.createElement('span');
			var text = document.createElement('span');

			a.setAttribute('href', screenshot);

			clear.className = 'clear';
			icon.className = 'icon';
			icon.appendChild(document.createTextNode('\u00A0'));
			text.className = 'galleryText';
			text.appendChild(document.createTextNode(this.lang.screenshotFullSize));

			clear.appendChild(icon);
			clear.appendChild(text)

			thumbnail.parentNode.insertBefore(a, thumbnail);
			a.appendChild(thumbnail);
			a.appendChild(clear);
		},

		enableBackToTop: function()
		{
			if (!this.settings.enableBackToTop) return;

			var footer = document.querySelector('#footer > .level_3 > .links');
			if (!footer) return;

			var a = document.createElement('a');
			a.setAttribute('href', '#');
			a.appendChild(document.createTextNode(this.lang.backToTop));

			var s = a.style;
			s.cssFloat = 'right';
			s.marginRight = '5px';
			s.fontSize = '10px';
			s.textTransform = 'lowercase';
			s.color = 'currentColor';

			a.addEventListener('click', function(e) {
				scrollTo(0, 0);
				e.preventDefault();
			}, false);

			footer.appendChild(a);
		},

		appendSignature: function()
		{
			if (!this.settings.appendSignature) return;

			var block = document.querySelector('#header > .top_4');
			if (!block) return;

			var span = document.createElement('span');
			span.appendChild(document.createTextNode('v'+ this.environment.version));

			block.style.position = 'relative';
			block.appendChild(span);

			var s = span.style;
			s.position = 'absolute';
			s.top = '0';
			s.right = '16px';
			s.lineHeight = '35px';
			s.opacity = '0.4';
			s.cursor = 'help';

			var info = this.lang.scriptInfo
				.replace('{version}', this.environment.version)
				.replace('{diff}', this.Benchmark.timer.diff +' ms');

			span._info = info;
			span.addEventListener('click', function() {
				alert(this._info);
			}, false);
		}

	};

	DP.bootstrap();

})(window, document, window.opera);
