// ==UserScript==
// @name           Forrst Duplicate Cleaner
// @namespace      http://endflow.net/
// @description    Sweeps out duplicate posts on Forrst's activity page.
// @version        0.1.0
// @include        http://forrst.com/activity/from/friends*
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Skype: netkuy)
// @history        [2011-06-29] 0.1.0 first version

(function() {

var code = (function() {

var from = null,
    known = [],
    clean = function(divs) {
        divs.each(function() {
            var ctx = $($(this).attr('class').split(' '))
                        .filter(function(i, n) {return n.indexOf('ctx-') === 0;})
                        .get().pop();
            if ($.inArray(ctx, known) !== -1) {
                $(this).hide();
            } else {
                known.push(ctx);
            }
        }).last().each(function() {
            from = $(this).attr('id');
        });
    };

setInterval(function() {
    var divs = from ? $('#' + from).nextAll('.activity')
                    : $('#stream > div.activity');
    if (divs.length) {
        clean(divs);
    }
}, 200);

}).toString();

var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + code + ')();'));
(document.body || document.head || document.documentElement).appendChild(script);

})();
