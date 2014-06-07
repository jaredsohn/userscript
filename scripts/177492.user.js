// ==UserScript==
// @name       Redmine Syntax Hilighter
// @namespace  http://twitter.com/foldrr
// @version    0.1
// @match      http://*/redmine/issues*
// @resource   sunlight_css https://rawgithub.com/tmont/sunlight/master/src/themes/sunlight.default.css
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @require    https://rawgithub.com/tmont/sunlight/master/src/sunlight.js
// @require    https://rawgithub.com/tmont/sunlight/master/src/lang/sunlight.batch.js
// @require    https://rawgithub.com/tmont/sunlight/master/src/lang/sunlight.csharp.js
// @require    https://rawgithub.com/tmont/sunlight/master/src/lang/sunlight.css.js
// @require    https://rawgithub.com/tmont/sunlight/master/src/lang/sunlight.diff.js
// @require    https://rawgithub.com/tmont/sunlight/master/src/lang/sunlight.java.js
// @require    https://rawgithub.com/tmont/sunlight/master/src/lang/sunlight.javascript.js
// @require    https://rawgithub.com/tmont/sunlight/master/src/lang/sunlight.sln.js
// @require    https://rawgithub.com/tmont/sunlight/master/src/lang/sunlight.tsql.js
// @require    https://rawgithub.com/tmont/sunlight/master/src/lang/sunlight.vb.js
// @copyright  2013+, foldrr
// ==/UserScript==

(function(){
    GM_addStyle(GM_getResourceText("sunlight_css"));
    Sunlight.highlightAll();
})();
