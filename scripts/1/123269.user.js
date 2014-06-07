// ==UserScript==
// @name           Google Search fast language code switcher
// @namespace      buzz.googleimagesslideshow
// @version        0.5
// @description    Gives you control over language/country settings at your fingertips. Works for Google as of 2012!
// @include        http://www.google.*/
// @include        https://www.google.*/
// @include        http://www.google.*/webhp*
// @include        https://www.google.*/webhp*
// @include        http://www.google.*/imghp*
// @include        https://www.google.*/imghp*
// @include        http://www.google.*/search*
// @include        https://www.google.*/search*
// @license        GPLv2
// @copyright  2012+, buzz
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", window.location.protocol + "//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// css
var css = document.createElement("style");
css.setAttribute("type", "text/css");
css.innerHTML = "\
#mylangselector {\
position: absolute;\
left: -57px;\
top: -1px;\
}\
";
document.body.appendChild(css);

function main() {
  $(function() {

    /// DEFINE LANGUAGES HERE!
    // format :  LANGUAGE_CODE: 'TOP_LEVEL_DOMAIN',
    var LANGS_TLD = {
      en: 'com',
      de: 'de',
      es: 'es'
    };
    
    var LANGS = Object.keys(LANGS_TLD);
    var TLD_LANGS = {};
    var TLDS = [];
    $.each(LANGS_TLD, function(k, v) {
      TLDS.push(v);
      TLD_LANGS[v] = k;
    });
    
    /// Helper functions

    // Read a page's GET URL variables and return them as an associative array.
    function getUrlVars() {
      var vars = [], hash;
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for(var i = 0; i < hashes.length; i++)
      {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
      }
      return vars;
    }

    function switchLang(lang_old, lang) {
      var new_args = window.location.search;
      var pathname = window.location.pathname;
      // for instant search google uses # arguments (we force full page update or we will loose dropbox)
      var m = window.location.hash.match(/&q=([^&]+)/);
      if (m !== null && m.length > 1) {
        new_args = "?hl=" + lang_old + "&lang=" + lang_old + "&q=" + m[1];
        if (pathname === "/")
          pathname = "/search";
      }
      new_args = new_args
        .replace('hl='+lang_old, 'hl='+lang)
        .replace('lang='+lang_old, 'lang='+lang)
        .replace('lr='+lang_old, 'lr=lang_'+lang);
      var new_host = window.location.host.replace(/google\.[a-z.]{2,6}$/, 'google.' + LANGS_TLD[lang]);;
      window.location = window.location.protocol + '//' + new_host + pathname + new_args;
    }

    /// action goes here

    // find language code by 1. hl argument or 2. TLD
    var vars = getUrlVars();
    var lang = "en";
    if (vars.hl !== undefined)
      lang = vars.hl;
    else {
      var tld;
      m = window.location.host.match(/\.([a-z.]{2,6})$/);
      if (m.length > 1) {
        var tld = m[1];
        if ($.inArray(tld, TLDS) >= 0)
          lang = TLD_LANGS[tld];
        else {
          // we have a tld that is not part of configured languages
          // -> redirect to default lang ('ncr' is a google feature preventing it from redirecting us again and again)
          window.location = window.location.protocol + '//' + 'www.google.' + TLDS[0]
            + '/ncr' + window.location.search + window.location.hash;
        }
      }
    }
    
    // create gui elements
    var selector_html = '<div id="mylangselector"><select name="lang">';
    $.each(LANGS, function() {
      selector_html += '<option value="' + this + '">' + this + '</option>';
    });
    selector_html += '</select></div>';
    $("#lst-ib").parent().prepend(selector_html);
    $("#mylangselector select").val(lang).attr("selected", true);
    $("#mylangselector select").change(function() {
      new_lang = $(this).children("option:selected").val();
      switchLang(lang, new_lang);
    });

  });
}

// load jQuery and execute the main function
addJQuery(main);