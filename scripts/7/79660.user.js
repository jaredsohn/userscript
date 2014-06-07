// Youtube.Featured.Remover user script
// version 0.4.4 Beta-Gamma Prototype Proof-of-concept, etc.
// 2010-12-20
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Youtube.Featured.Remover", and click Uninstall.
//
// Also works on Google Chrome, no greasemonkey required.
// Manage as you do any other extension.
//
// note: This script could have been condensed to a single line of code
// but I'm wary of nuking content that shouldn't be hidden, esp. when
// youtube.com gets updated and I'm not on top of it. Better be safe
// than sorry!
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Youtube.Featured.Remover
// @namespace     http://yyankov.org/projects/greasemonkey/
// @description   Removes the Spotlight, Trending and Featured Videos
// sections from Youtube's homepage.
//
// @include       http://*.youtube.com/
// @include       http://*.youtube.com/index*
// ==/UserScript==

var languages = {
      "en": ["Spotlight", "Trends", "Featured"]
    , "ja": ["スポットライト動画", "トレンド", "おすすめ動画"]
    , "da": ["Fremhævede videoer", "Populære videoer", "Udvalgte videoer"]
    , "bg": ["Подбрани видеоклипове", "Тенденции", "Представени видеоклипове"]
    , "nb": ["Aktuelle videoer", "Visning av trender", "Anbefalte videoer"]
    , "sv": ["Videoklipp i fokus", "Trender", "Idag på YouTube"]
    , "de": ["Angesagte Videos", "Trends", "Vorgestellte Videos"]
    , "es": ["Vídeos del momento", "Tendencias", "Vídeos destacados"]
    , "es_MX": ["Videos resaltados", "Tendencias", "Videos destacados"]
    , "fr": ["Vidéos du moment", "Tendances", "Sélection vidéo"]
    , "ru": ["Видео в центре внимания", "Тенденции", "Видео от партнеров"]
  };

var fake_mutex = false;
var default_lang = "en";
var lang = default_lang;

function detectLanguage() {
    var root = document.getElementsByTagName("html");
    var detected = root[0].getAttribute("lang");

    // The info in body's class is more informative, if present
    var body_class = document.getElementsByTagName("body")[0].getAttribute("class");
    var lang_regex = /[a-z]{2}_[A-Z]{2}/;
    var lang_iso = lang_regex.exec(body_class)[0];
    if (lang_iso.length == 5) {
        detected = lang_iso;
    }

    if (languages[detected] == undefined) // check if we support this specific culture
        if (detected.length != 5) // not a culture, but an unsupported lang code 
            return default_lang;
        else {
            detected = detected.substring(0, 2);
            if (languages[detected] == undefined) {
                // even the general language is unsupported
                return default_lang;
            } else
                return detected;
        }
    else
        return detected;
}

lang = detectLanguage();
var block_names = languages[lang];
var leftToRemoveCount = block_names.length;

var ppvRemoverInterval = window.setInterval(function () {
    if (fake_mutex) { // prevent repeated entry on error
        clearInterval(ppvRemoverInterval);
        return;
    }

    var blocks = document.getElementsByClassName("homepage-side-block");
    var div_patt = /div/i;
    var child_tag_patt = /h[23]|div/i;
    var child_class_patt = /module-title/i;
    var removalQueue = [];

    fake_mutex = true;

    for (var i in blocks) {

        var block = blocks[i];

        if (!div_patt.test(block.tagName))
            continue;

        if (block.children.length == 0)
            continue;

        var first_child = block.children[0];
        if (!child_tag_patt.test(first_child.tagName))
            continue;

        if (!child_class_patt.test(first_child.className))
            continue;

        var block_name = first_child.innerHTML.toLowerCase();
        if (first_child.children.length > 0) {
            block_name = first_child.children[0].innerHTML.toLowerCase();
        }

        for (var j in block_names)
            if (block_name == block_names[j].toLowerCase()) {
                removalQueue.push(block);
                break;
            }

        if (removalQueue.length >= leftToRemoveCount)
            break;
    }

    var promoted = document.getElementById("feedmodule-PRO");
    if (promoted)
        removalQueue.push(promoted);

    var ppv = document.getElementById("ppv-placeholder");
    if (ppv)
        removalQueue.push(ppv);

    for (var i in removalQueue) {
        var b = removalQueue[i];
        b.parentNode.removeChild(b);
        leftToRemoveCount--;
    }

    if ((leftToRemoveCount < 1) // all done?
	|| ((block_names.length > 0)
	&& (leftToRemoveCount == block_names.length))) // can't be done
        clearInterval(ppvRemoverInterval);

    fake_mutex = false;

}, 100);