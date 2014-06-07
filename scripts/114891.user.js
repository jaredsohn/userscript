// ==UserScript==
// @name           WykopowyUkrywacz
// @namespace      http://userscripts.org/users/364624
// @copyright      Dawid Nowak (MacDada), http://dnowak.pl
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include        http://www.wykop.pl/
// @include        http://www.wykop.pl/strona/*
// @include        http://www.wykop.pl/wykopalisko/*
// ==/UserScript==


/**
 * Taa, dużo kodu, jasne. 
 * Po prostu eksperymentowałem i nie chce mi się teraz tego czyścić :P
 *
 * Ale wszystko bangla jak należy :D
 * Polecam, Żanet Kaleta ;-)
 */


/**
 * Useful function!
 *
 * Check if an element exists in given array
 * using a comparer function.
 *
 * comparer : function(currentElement)
 */
Array.prototype.inArray = function(comparer) {
    for (var i = 0; i < this.length; i++) {
        if (comparer(this[i])) {
            return true;
        }
    }
    return false;
};


/**
 * Useful function!
 *
 * Adds an element to the array,
 * if it does not already exist,
 * using a comparer function.
 */
Array.prototype.pushIfNotExists = function(element, comparer) {
    if (!this.inArray(comparer)) {
        this.push(element);
    }
};



/**
 * DNUserscriptsHelper
 *
 * Works with GreaseMonkey extension for FireFox browser.
 */
var DNUH = (function() {

    var DNUH = {
        // set this TRUE if you want logger.debug("message") to work:
        debug: false,
        // enviroment variables provied to plugins by DNUH:
        env: {
            unsafeWindow: null,
            logger: null,
            $: null,
            storage: null,
            loadingEnvDelayer: null
        },
        // plugins registered by DNUH:
        plugins: [],
        registerPlugin: null,
        style: null
    };


    DNUH.env.unsafeWindow = ('undefined' == typeof unsafeWindow)
                            ? window
                            : unsafeWindow;


    DNUH.env.logger = {
        log: DNUH.env.unsafeWindow.console.log,
        debug: (DNUH.debug)
                    ? DNUH.env.unsafeWindow.console.log
                    : function(){}
    };


    DNUH.env.logger.debug('DNUH: loading the enviroment…');


    DNUH.env.$ = DNUH.env.unsafeWindow.$;


    DNUH.env.storage = {
        get: function(key) {
            return JSON.parse(localStorage.getItem(key));
        },
        set: function(key, val) {
            return localStorage.setItem(key, JSON.stringify(val));
        }
    };


    DNUH.env.loadingEnvDelayer = (function() {
        if (DNUH.debug) {
            setTimeout(function() {
                DNUH.env.loadingEnvDelayer = false;
            }, 1000);
            return null;
        } else {
            return false;
        }
    })();


    /**
     * Informs DNUH that a plugin wants to get called when the enviroment is ready.
     */
    DNUH.registerPlugin = function(name, callback) {
        if (!DNUH.plugins.inArray(function(currentElement) {
            return (name == currentElement.name);
        })) {

            DNUH.plugins.push({
                name: name,
                callback: callback
            });

            DNUH.env.logger.debug('The plugin "' + name + '" has been registered.');

            waitForEnvReady(function() {

                callback(
                    DNUH.env.unsafeWindow,
                    DNUH.env.logger,
                    DNUH.env.$,
                    DNUH.env.storage
                );

                DNUH.env.logger.debug('The plugin "' + name + '" has been activated.');

            });

        } else {
            alert('The plugin "' + name + '" is already registered in DNUH!');
        }
    };


    /**
     * Lets you style DOM elements.
     */
    DNUH.style = function(cssCode) {
        waitForEnvReady(function() {
            DNUH.env.$("head").append('<style type="text/css">' + cssCode + '</style>');
            DNUH.env.logger.debug("DNUH added new style.");
        });
    };


    function isEnvReady() {
        for (var i in DNUH.env) {
            if (null === DNUH.env[i]) {
                return false;
            }
        }
        return true;
    };


    function waitForEnvReady(callback) {
        if (isEnvReady()) {
            callback();
        } else {
            setTimeout(function() {
                waitForEnvReady(callback);
            }, 10);
        }
    };


    return DNUH;

})(); // eo DNUH



/**
 * Dorzuca DNUH do głównego okna przeglądarki,
 * żeby był dostępny np z FireBuga.
 */
DNUH.registerPlugin('dnuhExposerPlugin', function(unsafeWindow) {
    unsafeWindow.DNUH = DNUH;
});



/**
 * „Ukrywanie artykułów”
 *
 * Wtyczka DnUserScripts dla Wykop.pl.
 */
DNUH.registerPlugin('WykopUkrywanieArtykulowPlugin', function(unsafeWindow, logger, $, storage) {

    // zmienne globalne wtyczki:
    var isNightThemeOn = ("rgb(28, 28, 28)" == $("body").css("background-color"));
    var hide_article_buttons = null;

    if (isNightThemeOn) {
        $("body").addClass("night_theme");
    }


    DNUH.style("\
        .filters label[for='wp_hidden_articles'] {float: right; font-size: 10px; margin-right: 10px;} \
        .filters input[name='wp_show_hidden_articles'] {float: right; margin: 3px 3px 0px 0px;} \
        .wp_hide_all_button {font-size: 9px;} \
        .wp_hide_all_button.up {float: right; margin-right: 10px;} \
        .wp_hide_article_button {margin-left: 10px; font-size: 10px; color: darkBlue;} \
        .night_theme .wp_hide_article_button {color: grey;} \
    ");


    /**
	 * Ukrywam linki z listy na starcie.
	 */
    $("article.entry .content header h2 a.link").each(function() {
        var o = $(this);
        var urls = getHiddenArticlesUrls();

        if (urls.inArray(function(e) {
            return (o.attr("href") == e)
        })) {
            o.parents("article.entry").hide().addClass("wp_hidden_article");
        }
    });


    /**
	 * Wyświetlam lub ukrywam linki w zależności od checkboxa.
	 */
    $('<label for="wp_hidden_articles">pokaż ukryte</label> \
       <input type="checkbox" name="wp_show_hidden_articles" />')
        .insertAfter(".filters .slidemenu.categories")
        .change(function() {
            if ("checked" == $(this).attr("checked")) {
                $("article.entry.wp_hidden_article").fadeIn();
            } else {
                $("article.entry.wp_hidden_article").fadeOut();
            }
        });


    /**
	 * Ukrywam link po wskazaniu przez użytkownika.
	 */
    hide_article_buttons
        = $('<a href="#ukryjArtykuł" class="wp_hide_article_button">nie pokazuj więcej</a>')
            .insertAfter("article.entry .content header h2 a.link")
            .click(function(e) {
                e.preventDefault();
                addHiddenArticleUrl($(this).prev("a.link").attr("href"));
                $(this).parents("article.entry").fadeOut().addClass("wp_hidden_article");
            });


    /**
	 * Przyciski ukrywania wszystkich artykułów na stronie.
	 */
    $('<a href="#" class="wp_hide_all_button up">ukryj wszystkie</a>')
        .insertAfter("input[name='wp_show_hidden_articles']")
        .click(function(e) {
            e.preventDefault();
            hide_article_buttons.trigger("click");
        });

    $('<a href="#" class="wp_hide_all_button down">ukryj wszystkie</a>')
        .insertBefore(".pager")
        .click(function(e) {
            e.preventDefault();
            hide_article_buttons.trigger("click");
            unsafeWindow.scrollTo(0, 0);
        });


    /**
	 * Pobiera z pamięci przeglądarki linki do artykułów,
	 * które mają nie być wyświetlane.
	 */
    function getHiddenArticlesUrls() {
        var urls = [];
        try {
            urls = storage.get("wp_hidden_articles");
            if (!(('object' == typeof(urls)) && (urls instanceof Array))) {
                urls = [];
            }
        } catch(e) {
            urls = [];
        }
        return urls;
    }; // eo getHiddenArticlesUrls()


    /**
	 * Zapisuje w lokalnej pamięci przeglądarki URL do artykułu,
	 * który nie ma być wyświetlany.
	 */
    function addHiddenArticleUrl(url) {
        var urls = getHiddenArticlesUrls();

        urls.pushIfNotExists(url, function(e) {
            return (url == e);
        });

        storage.set("wp_hidden_articles", urls);
    }; // eo addHiddenArticleUrl()


}); // eo WykopUkrywanieArtykulowPlugin