// ==UserScript==
// @name           Highlight term from GoogleSearchEngine.
// @namespace      perlnamehoge@gmail.com
// @include        http://*
// @exclude        http://*google.co.jp/*
// ==/UserScript==

(function () {
    var $x = function (xpath) {
        var r = document.evaluate(xpath, document, null, 7, null);
        for ( var i = 0, l = r.snapshotLength, res = []; i < l; i++ )
            res[i] = r.snapshotItem(i);
        return res;
    }

    var $s = (function(sheet){
            return function(selector, declaration){
                sheet.insertRule(selector + '{' + declaration + '}', sheet.cssRules.length);
            };
         })((function(e){
            e.appendChild(document.createTextNode(''));
            (document.getElementsByTagName('head')[0] || (function(h){
                document.documentElement.insertBefore(h, this.firstChild);
                return h;
            })(document.createElement('head'))).appendChild(e);
            return e.sheet;
          })(document.createElement('style')));

    var IGNORE_TAGS     = ['html', 'head', 'style', 'meta', 'script', 'noscript', 'img', 'textarea', 'option', 'input'],
        IGNORE_TAGS_REG = new RegExp( '^(' + IGNORE_TAGS.join('|') + ')$' , 'i');
        COLOR_PALLET    = ['#FFFF66', '#A0FFFF', '#99FF99', '#FF9999'],
        referrer        = document.referrer;
        
    if ( !referrer || !/google\.co\.jp\/.+/.test( referrer ) ) return false;
    var terms   = decodeURIComponent( ( referrer.match(/q=[^&]+/) || ["q="] )[0].substr(2) ).replace(/　/g, " ").replace(/([\[\}.*?\\^${}()])/g, "\\$1").split(/\s+|\+/),
        r_terms = new RegExp('(' + terms.join('|') + ')', 'g'),
        x_terms = '//body//*[' + terms.map(function (t,i) {
                      // -add style
                      $s('span.' + t, 'background:' + ( COLOR_PALLET[i] || 'yellow' ));
                      // -return xpath expression
                      return 'contains(., "' + t + '")'
                  }).join(" or ") + ']';
    $x( x_terms ).forEach(function (t) {
        var c = t.firstChild, v = c.nodeValue || '';
        if ( !IGNORE_TAGS_REG.test( t.tagName ) && c.nodeType == 3 && r_terms.test( v ) ) {
            t.innerHTML = t.innerHTML.replace( r_terms, '<span class="$1">$1</span>');
        }
    });
})();