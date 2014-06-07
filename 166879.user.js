// ==UserScript==
// @name       Ikariam overview table 2
// @namespace  http://github.com/sullerandras
// @version    0.1
// @description  Collects information about the Ikariam game, and displays it in a nice table format.
// @match      http://*.ikariam.com/*
// @match      http://*/*.ikariam.com
// @require    http://cdnjs.cloudflare.com/ajax/libs/coffee-script/1.6.2/coffee-script.min.js
// @require    http://ajax.googleapis.com/ajax/libs/angularjs/1.0.6/angular.min.js
// @require    http://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.2.0/ui-bootstrap-tpls.js
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @resource   cf https://raw.github.com/sullerandras/ikariam-overview-script/master/gather.coffee
// @resource   view https://raw.github.com/sullerandras/ikariam-overview-script/master/render.html
// @copyright  2013+, Andras Suller
// ==/UserScript==

var that = this;

function runScript(){
    if (unsafeWindow.skip != true) {
        var remote_src = GM_getResourceText('cf');

        var c = that.CoffeeScript.compile(remote_src);
        // c = 'debugger;'+c;
        eval(c);
    }
}
//window.setInterval(runScript, 1000);
runScript();
