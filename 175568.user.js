// ==UserScript==
// @name       THE PARTY AIN'T EVER funnyjunk.com
// @namespace  http://mongla.net
// @version    0.1
// @match      http://www.funnyjunk.com/bronies/
// @copyright  2012+, Posttwo
// @require   http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// ==/UserScript==

(function() {
    var css = "@-webkit-keyframes blink { from { opacity: 1.0; } to { opacity: 0.0; } } body { text-decoration:blink;   -webkit-animation-name: blink; -webkit-animation-iteration-count: infinite; -webkit-animation-timing-function: cubic-bezier(1.0,0,0,1.0) -webkit-animation-duration: 1s;  text-transform:uppercase; } #commentsList { background: url('http://static.fjcdn.com/thumbnails/comments/87/31/8731ff23717566e1617b492d13749f1c.gif') !important; }";
    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    } else if (typeof PRO_addStyle != "undefined") {
        PRO_addStyle(css);
    } else if (typeof addStyle != "undefined") {
        addStyle(css);
    } else {
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            var node = document.createElement("style");
            node.type = "text/css";
            node.appendChild(document.createTextNode(css));
            heads[0].appendChild(node); 
        }
    }
})();

function blink(selector){
$(selector).fadeOut('fast', function(){
$(this).fadeIn('fast', function(){
blink(this);
});
});
}

blink('body');