// ==UserScript==
// @name	CSS3 property support
// @description	Adds -vnd- prefixes to document stylesheets for CSS standard property names.
// @note        That's actually more a per-site Javascript shim, but testing it as global userscript.
// @version     0.1
// @author	milki
// @include	http://*
// ==/UserScript==
/**
 * Joke's on you, browser vendors! 
 * Your excessive anti-compatibilization delayment efforts have been foiled.
 *
 * This snippet aliases CSS3 style declaration names onto the frigging vendor
 * name prefixed ones. It reloads all current stylesheets and appends a new
 * version of each to the document. The rewrite rules are super mundane, but
 * likely to cover a broader range where the syntax is de-facto normalized.
 * Little investigation went into which properties that are. The ruleset was
 * lifted from the CssCrush Aliases.ini. http://the-echoplex.net/csscrush/
 */
(function() {
   if (!window.css_destandardize) {   // doubles as state indicator

     // determine vendor prefix from browser name
     var t = document.createElement("div").style;
     var prefix = "OTransform" in t		? "-o-"
                : "MozTransform" in t		? "-moz-"
                : "KhtmlBoxShadow" in t		? "-khtml-"
                : "WebkitBoxShadow" in t	? '-webkit-'
                : navigator.appName.match(/MSIE|Microsoft/) ? "-ms-"
                : "";
     
     // which declarations to rewrite
     var rewrite = {
        '-xv-': 'linear-gradient|transform|box-shadow',
        '-o-': 'linear-gradient|repeating-linear-gradient|calc|transform|transition(|-delay|-duration|-property|-timing-function)|animation(|-delay|-direction|-duration|-fill-mode|-iteration-count|-name|-play-state|-timing-function)|background-(size|clip|origin|sizing)|column-(count|gap)|border-image|box-(align|direction|flex|orient|pack)|hyphens|text-decoration-(color|line|style)',
        '-ms-': 'linear-gradient|transform|box-shadow',
        '-moz-': 'linear-gradient|repeating-linear-gradient|calc|border-(|top-|bottom-)(|right-|left-)radius|box-shadow|transform|transition(|-delay|-duration|-property|-timing-function)|animation(|-delay|-direction|-duration|-fill-mode|-iteration-count|-name|-play-state|-timing-function)|background-(size|clip|origin|sizing)|column-(count|gap)|border-image|box-(align|direction|flex|orient|pack)|hyphens|text-decoration-(color|line|style)',
        '-khtml-': 'linear-gradient|repeating-linear-gradient|calc|border-(|top-|bottom-)(|right-|left-)radius|box-shadow|transform|transition(|-delay|-duration|-property|-timing-function)|animation(|-delay|-direction|-duration|-fill-mode|-iteration-count|-name|-play-state|-timing-function)|background-(size|clip|origin|sizing)|column-(count|gap)|border-image|box-(align|direction|flex|orient|pack)|hyphens|text-decoration-(color|line|style)',
        '-webkit-': 'linear-gradient|repeating-linear-gradient|calc|border-(|top-|bottom-)(|right-|left-)radius|box-shadow|transform|transition(|-delay|-duration|-property|-timing-function)|animation(|-delay|-direction|-duration|-fill-mode|-iteration-count|-name|-play-state|-timing-function)|background-(size|clip|origin|sizing)|column-(count|gap)|border-image|box-(align|direction|flex|orient|pack)|hyphens|text-decoration-(color|line|style)',
        '': 'none-none-none'
     }[prefix];

     // ajax callback
     window.css_destandardize = function (css){

        // remove comments
        css = css.replace(new RegExp('/\\*.+?\\*/','g'), '');
        css = css.replace(new RegExp('//[^\\n]+','mg'), '');

        // find blocks with possible CSS3 statements or expressions
        var blocks = css.match(new RegExp('[^{}]+\\{[^{}]*('+rewrite+')[^{}]+\\}','mig'));
        
        // rewrite'em
        var newcss = "";
        if (blocks) for (var i in blocks) {
        
            // add -xyz- prefix
            newcss += blocks[i].replace(new RegExp('(:|:[^:]*[\\s;])(?:-\\w+-)?('+rewrite+')',"g"), '$1'+prefix+'$2');
            /* This also captures other prefixes. Many websites only list -moz- and -webkit- despite
               broader property support. The vendor prefix workaround dates quickly, and developers
               don't bother to update, especially for fringe browsers (Opera).
               Can incur some breakage if the CSS3 standard name isn't listed last and the property
               syntax really diverges.
            */
        }
        
        // inject rewritten stylesheet
        if (newcss.length) {
            var style = document.createElement("style");
            if (style.styleSheet) { style.styleSheet.cssText = newcss; } else { style.appendChild(document.createTextNode(newcss)); }
            document.getElementsByTagName("head")[0].appendChild(style);
        }
     };
     
     // jQuery ajax shim
     var $get = $.get ||
           function(url, callback) {
               try { var xhr = new XMLHttpRequest(); }
               catch(no) { var xhr = new ActiveXObject("Microsoft.XMLHTTP"); }
               xhr.onreadystatechange = function() {
                   if (xhr.readyState==4 && xhr.status==200) {
                       callback(xhr.responseText, xhr);
                   }
               }
               xhr.open("GET", url);
               xhr.send(null);
           };

     // apply for all stylesheets
     if (prefix) for (var i=0; i<document.styleSheets.length; i++) {
        $get(document.styleSheets[i].href, window.css_destandardize);
     }

   }
})();
