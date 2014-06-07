// ==UserScript==
// @author 			Pawel Raszewski
// @email			raszewski@gmail.com
// @name			Eliminator Slajdow
// @namespace       Eliminator Slajdow
// @description 	Eliminuje slajdy na stronach Agory
// @version			1.4.3
// @icon        	https://code.google.com/p/lepsza-gazeta-pl/logo?cct=1364168924
// @updateURL		https://lepsza-gazeta-pl.googlecode.com/git/eliminator-slajdow.user.js

// @include			http://*.gazeta.pl/*
// @include			http://*.avanti24.pl/*       
// @include			http://*.groszki.pl/*       
// @include			http://*.ugotuj.to/*       
// @include			http://*.gazeta.pl/*       
// @include			http://*.tokfm.pl/*       
// @include			http://*.gazetapraca.pl/*      
// @include			http://*.moto.pl/*       
// @include			http://*.plotek.pl/*       
// @include			http://*.deser.pl/*       
// @include			http://*.www.sport.pl/*       
// @include			http://*.wyborcza.pl/*       
// @include			http://*.gazetadom.pl/*       
// @include			http://*.www.logo24.pl/*       
// @include			http://*.wyborcza.biz/*       
// @include			http://*.lula.pl/*       
// @include			http://*.tuba.pl/*       
// @include			http://*.www.edziecko.pl/*       
// @include			http://*.czterykaty.pl/*       
// @include			http://*.www.alert24.pl/*       
// @include			http://*.www.kotek.pl/*       
// @include			http://*.polygamia.pl/*       
// @include			http://*.www.popcorner.pl/*       
// @include			http://*.www.wysokieobcasy.pl/*       
// @include			http://*.www.e-ogrody.pl/*       
// @include			http://*.ladnydom.pl/*       
// @include			http://*.bryla.gazetadom.pl/*       
// @include			http://*.gazetapraca.pl/*       
// @include			http://*.www.metropraca.pl/*       
// @include			http://*.pracawbiurze.pl/*       
// @include			http://*.www.zczuba.pl/*       
// @include			http://*.www.ciacha.net/*       
// @include			http://*.wyborcza.pl/*       
// @include			http://*.namonciaku.pl/*       
// @include			http://*.sport.pl/*       
// @include			http://*.magazyn-kuchnia.pl/*       
// @include			http://*.swiatmotocykli.pl/*       
// @include			http://*.domosfera.pl"

// @include			http://gazeta.pl/*
// @include			http://avanti24.pl/*       
// @include			http://groszki.pl/*       
// @include			http://ugotuj.to/*       
// @include			http://gazeta.pl/*       
// @include			http://tokfm.pl/*       
// @include			http://gazetapraca.pl/*      
// @include			http://moto.pl/*       
// @include			http://plotek.pl/*       
// @include			http://deser.pl/*       
// @include			http://www.sport.pl/*       
// @include			http://wyborcza.pl/*       
// @include			http://gazetadom.pl/*       
// @include			http://www.logo24.pl/*       
// @include			http://wyborcza.biz/*       
// @include			http://lula.pl/*       
// @include			http://tuba.pl/*       
// @include			http://www.edziecko.pl/*       
// @include			http://czterykaty.pl/*       
// @include			http://www.alert24.pl/*       
// @include			http://www.kotek.pl/*       
// @include			http://polygamia.pl/*       
// @include			http://www.popcorner.pl/*       
// @include			http://www.wysokieobcasy.pl/*       
// @include			http://www.e-ogrody.pl/*       
// @include			http://ladnydom.pl/*       
// @include			http://bryla.gazetadom.pl/*       
// @include			http://gazetapraca.pl/*       
// @include			http://www.metropraca.pl/*       
// @include			http://pracawbiurze.pl/*       
// @include			http://www.zczuba.pl/*       
// @include			http://www.ciacha.net/*       
// @include			http://wyborcza.pl/*       
// @include			http://namonciaku.pl/*       
// @include			http://sport.pl/*       
// @include			http://magazyn-kuchnia.pl/*       
// @include			http://swiatmotocykli.pl/*       
// @include			http://domosfera.pl"

// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.js
// ==/UserScript==

var load, execute, loadAndExecute;
load = function(a, b, c) {
	var d;
	d = document.createElement("script"), d.setAttribute("src", a), b != null && d.addEventListener("load", b), c != null && d.addEventListener("error", c), document.body.appendChild(d);
	return d
}, execute = function(a) {
	var b, c;
	typeof a == "function" ? b = "(" + a + ")();" : b = a, c = document.createElement("script"), c.textContent = b, document.body.appendChild(c);
	return c
}, loadAndExecute = function(a, b) {
	return load(a, function() {
		return execute(b)
	})
};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js", function() {

	this.scrollableImageContainer = false;
	this.spinningIconUrl = "ajax-loader.gif";
	this.cssPath = "http://dl.dropbox.com/u/24730581/eliminator_slajdow_assets/eliminatorSlajdow.css";



	var self = this;
	this.imageContainer = null;
	this.sectionToBeRemovedSelector = ".navigation div, .navigation span.page, #gal_navi_wrp, #gazeta_article_image_overlay";
	this.navigationNextULRSelector = ".navigation .next:first";
	this.navigationPageNumberSelector = ".navigation .page:first";
	this.articleBodySelector = "#gazeta_article_body";
	this.sectionToBeAttached = "#gazeta_article_image img,#gazeta_article_body"; // sekcja komentarza i obrazek
	this.headerSectionSelector = ".navigation:first h1 span";
	this.hasSlideNumbers = true;
	this.spinner = $("<div>", {
		"class": "eliminatorSlajdowSpinner"
	}).append($("<img>", {
		src: self.spinningIconUrl
	}));

	eliminateSlides();

	function eliminateSlides() {

		if ($("body#pagetype_photo").length > 0) {
			console.log("jestesmy na stronie z galeria #pagetype_photo (1)");
			$("#gazeta_article_miniatures").empty();
			start();
		} else if ($("body#pagetype_art_blog").length > 0) {
			/*
				http://www.plotek.pl/plotek/56,78649,13096942,Kaja_Paschalska,,1.html
				http://www.plotek.pl/plotek/56,79592,12829011,Jako_dzieci_byli_gwiazdami_seriali__Co_dzis_robia.html
			*/
			self.sectionToBeAttached = "#gazeta_article_image img,#gazeta_article_body, div[id*='gazeta_article_image_']:not('#gazeta_article_image_overlay')";
			console.log("jestesmy na stronie z galeria #pagetype_art_blog (2)");
			start();
		} else if ($("body#pagetype_art").length > 0) {
			/*
			Regresja
			http://lublin.gazeta.pl/lublin/56,35640,13282657,I_plug_nie_dawal_rady,,2.html
			*/
			console.log("jestesmy na stronie z galeria #pagetype_art (3)");
			self.sectionToBeAttached = "#gazeta_article_image,#gazeta_article_body, div[id*='gazeta_article_image_']:not('#gazeta_article_image_overlay')"; // sekcja komentarza i obrazek
			start();

		} else if ($("div#art div#container_gal").length > 0) {
			/*
			Regresja
			http://gazetapraca.pl/gazetapraca/56,90443,12057502,10_najdziwniejszych_powodow__dla_ktorych_rzucamy_prace.html
			*/

			console.log("jestesmy na stronie z gazetapraca.pl (4)");
			self.articleBodySelector = "#art";
			self.navigationPageNumberSelector = ".paging:first";
			self.sectionToBeRemovedSelector = "div#gal_navi_wrp, #gal_navi_wrp";
			self.navigationNextULRSelector = "#gal_btn_next a:first";
			self.sectionToBeAttached = "div#container_gal";
			start();

		} else if ($("div#article div#article_body").length > 0) {
			/*
			Regresja
			http://wyborcza.pl/duzy_kadr/56,97904,12530404,Najlepsze_zdjecia_tygodnia.html
			*/
			console.log("jestesmy na stronie z galeria div#article div#article_body (5)");
			self.articleBodySelector = "#article_body";
			self.navigationNextULRSelector = "#gal_btn_next a:first";
			self.sectionToBeRemovedSelector = "#gal_navi_wrp"; // div#article ul,
			self.sectionToBeAttached = "div#container_gal";
			self.navigationPageNumberSelector = "#gal_navi .paging";
			start();
		} else if ($("div#k1 div#k1p div#gal_outer").length > 0) {
			/*
			Regresja
			http://wyborcza.pl/51,75248,12537285.html?i=0
			*/
			console.log("jestesmy na stronie z galeria bez typu ('div#k1 div#k1p div#gal_outer') (6)");
			self.articleBodySelector = "div#gal_outer .description";
			self.navigationNextULRSelector = "li.btn_next a:first";
			self.sectionToBeRemovedSelector = "div#article ul, #gal_navi_wrp";
			self.sectionToBeAttached = "div#gal_picture, div.description, p.description";
			self.navigationPageNumberSelector = "#gal_navi .paging";
			$("div#gal_miniatures").empty();
			self.hasSlideNumbers = false;
			start();
		} else {
			console.log("Eliminator Slajdow: Tutaj nic nie mam do roboty ;(", document.location.hostname);
		}

		function start() {
			$("head").append($("<link>", {
				href: self.cssPath,
				type: "text/css",
				rel: "stylesheet"
			}));
			if ($(self.sectionToBeAttached).width() > 620) {
				$("#content_wrap #columns_wrap #col_right").css("float", "none");
			}
			var nextPageURL = $(self.navigationNextULRSelector).attr("href");
			console.log("link do nastepnej storny", nextPageURL);
			if (nextPageURL) {
				var imageContainerClass = 'noScroll';
				if (self.scrollableImageContainer) {
					imageContainerClass = 'scroll';
				}

				$(self.articleBodySelector).after($("<div>", {
					"class": imageContainerClass + ' imageContainer'
				}));
				self.imageContainer = $(self.articleBodySelector).parent().find(".imageContainer");
				bind();
				showSpinnier();
				$.get(nextPageURL, function(nextPage) {
					findNextSlideURL(nextPage, nextPageURL);
				});
			}
		}

		function showSpinnier() {
			$("div.imageContainer").append(self.spinner);
		}

		function hideSpinner() {
			$("div.imageContainer div.eliminatorSlajdowSpinner").remove();
		}

		function bind() {
			var imageContainer = $("div.imageContainer");
			imageContainer.on("click", "span.scrollSwitch", function() {
				imageContainer.toggleClass("noScroll").toggleClass("scroll");
				if (self.scrollableImageContainer) {
					console.log("slider switch OFF");
					imageContainer.find("span.scrollSwitch").text("Pokaż pasek przewijania");
					$('html, body').animate({
						scrollTop: $(this).offset().top - 30
					}, 500);
					self.scrollableImageContainer = false;
				} else {
					console.log("slider switch ON");
					imageContainer.find("span.scrollSwitch").text("Ukryj pasek przewijania");
					$('html, body').animate({
						scrollTop: $(".imageContainer").offset().top - 25
					}, 500);
					imageContainer.animate({
						scrollTop: 0
					}, 0);
					imageContainer.animate({
						scrollTop: $(this).offset().top - imageContainer.offset().top - 5
					}, 500);
					self.scrollableImageContainer = true;
				}
			});

			imageContainer.on("click", "span.bugreport", function() {
				window.open("https://code.google.com/p/lepsza-gazeta-pl/issues/list?hl=pl");
			});
		}

		function disableES(url) {
			if (url.indexOf("?") > -1) {
				return url.replace("?", "?es=off&");
			} else {
				return url + "?es=off";
			}
		}

		function findNextSlideURL(galleryPage, url) {
			hideSpinner();
			var articleSection = $(galleryPage).find(self.sectionToBeAttached);
			if ($(articleSection).length > 0) {
				var pageNumber = $(galleryPage).find(self.navigationPageNumberSelector).text().split("/");
				console.log("numer strony", pageNumber);
				var nextPageURL = $(galleryPage).find(self.navigationNextULRSelector).attr("href");
				if (url === nextPageURL) {
					console.log("Chyba cos jest zle. URL do nastepnego slajdu jest taki sam jak do obecnego :/");
					return;
				}
				var pageNumberLabel = "Ostatni slajd";
				if (pageNumber.length === 2) {
					pageNumberLabel = "Slajd " + pageNumber[0] + " z " + pageNumber[1];
				} else if (!self.hasSlideNumbers) {
					pageNumberLabel = "Slajd";
				}

				var slideHeader = $("<div>", {
					"class": "slideHeader slideHeader_" + pageNumber
				}).append($("<p>", {
					"class": "headerBar",
					text: pageNumberLabel
				}).append($("<span>", {
					"class": "scrollSwitch",
					text: ((self.scrollableImageContainer ? "Ukryj pasek przewijania" : "Pokaż pasek przewijania"))
				})).append($("<span>", {
					"class": "headerSeparator",
					text: "|"
				})).append(
					$("<span>", {
					"class": "bugreport",
					text: "Zgłoś problem"
				})).append(
					$("<span>", {
					"class": "headerSeparator",
					text: "|"
				})).append(
					$("<span>", {
					"class": "directLink"
				}).append($("<a>", {
					target: "_blank",
					href: disableES(url),
					text: "Bezpośredni link"
				})))).append($("<p>", {
					"class": "headerLogo",
					text: 'Eliminator Slajdów'
				}));

				$(self.imageContainer).append(slideHeader);

				$(articleSection).find(self.sectionToBeRemovedSelector).empty();
				var slideWrapper = $(self.imageContainer).append($("<div>", {
					"class": "slide_" + pageNumber
				})).children().last();

				if ($(galleryPage).find(self.headerSectionSelector).length === 1) {
					var desc = $(galleryPage).find(self.headerSectionSelector).html();
					$(slideWrapper).append($("<p>", {
						"class": "slideTitle",
						text: desc
					}));
				}

				$(slideWrapper).append($(articleSection));

				if ((pageNumber.length === 2 && pageNumber[0] !== pageNumber[1]) || (!self.hasSlideNumbers && document.location.href.indexOf(nextPageURL) === -1)) {
					console.log("link do nastepnej storny", nextPageURL);
					showSpinnier();
					$.get(nextPageURL, function(nextPage) {
						findNextSlideURL(nextPage, nextPageURL);
					});
				} else {
					// ostatnia strona
					console.log("Ostatnia Strona");
					hideSpinner();
				}
				$(self.sectionToBeRemovedSelector).empty();
			}

			$(".imageContainer > div").css("float", "left").css("width", "100%");
			var imageContainer = $(".imageContainer");
			if (imageContainer.width() > 950) {
				imageContainer.width(950);
			}
		}
	}

});