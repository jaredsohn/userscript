// ==UserScript==
// @name           SyoboCal Program Page Mod
// @namespace      http://endflow.net/
// @description    Some enhancements for the program page of SyoboCal.
// @include        http://cal.syoboi.jp/tid/*
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Skype: netkuy)
// @history        [2009-07-08] 0.1.0 initial version
//                 [2009-07-16] 0.1.1 fix URL matching

(function(){
with(unsafeWindow){
$(document).ready(function() {
    var m = location.href.toString().match(/^http:\/\/cal\.syoboi\.jp\/tid\/(\d+)(\/time(#\d+)?)?$/);
    if(m){
        location.href = 'http://cal.syoboi.jp/tid/' + m[1] + '/time?Filter2=Future';
        return;
    }
    $('table.progs').trigger('sorton', [[[1,0]]]);
});
}
function $x(x,c){c=c||document;var res=c.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=res.iterateNext();nodes.push(i));return nodes}
})();

// vim: set fdm=marker sw=4 ts=4 et:
