// ==UserScript==
// @name           Google domain hilite
// @namespace      hzhbest
// @description    s
// @include        http://www.google.tld/search?*
// @version        1.01
// ==/UserScript==

(function (){

//var cites = document.getElementsByTagName('cite');
var urlreg = /^(https\:\/\/)?(([a-z0-9]+(-[a-z0-9]+)*)(\.[a-z0-9]+(-[a-z0-9]+)*)+)(\/)?(?!##)/ig;

var time_delay = 300;
var clsname = '_hilidomain';

// Insert CSS
var headID = document.getElementsByTagName("head")[0];         
var cssNode = document.createElement('style');
cssNode.type = 'text/css';
cssNode.innerHTML = '.'+clsname+' {font:inherit!important;font-weight:bold!important;display:inline!important;float:none!important;margin:0!important;padding:0 2px 0 0!important;text-align:inherit!important;color:black!important;}';
headID.appendChild(cssNode);
// Watch for AutoPagerize
window.addEventListener('AutoPagerize_DOMNodeInserted', function(e){hilid(e.target)}, false);
window.addEventListener('load', function(){setTimeout(hilid,time_delay,document);}, false);

function hilid(node){
    var doc = node || document;
    $X('descendant::text()[string-length(normalize-space(self::text())) > 0 and ancestor::cite]', doc).forEach(function(text_node) {
        var df, text = text_node.nodeValue, id_index = 0,
        parent = text_node.parentNode, range = document.createRange(), replace_strings = [],
        new_text = text.replace(urlreg,function($0,$1,$2,$3,$4,$5,$6,$7) {
                    replace_strings[id_index] = ($1 + '<span class="'+clsname+'">' + $2 + '</span>' + $7);
                    return '##'+(id_index++)+'##';
                }).
            replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').
            replace(/##(\d+)##/g, function($0,$1) {
            return replace_strings[$1] || '';
        });
        if (replace_strings.length) {
            try {
                    range.selectNode(text_node);
                df = range.createContextualFragment(new_text);
                if (df.firstChild) parent.replaceChild(df, text_node);
                range.detach();
            } catch (e) {
                console.log(e);
            }
        }
    });
}

function $X(exp, context, resolver, result_type) {
	context || (context = document);
	var Doc = context.ownerDocument || context;
	var result = Doc.evaluate(exp, context, resolver, result_type || XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (result_type) return result;
	for (var i = 0, len = result.snapshotLength, res = new Array(len); i < len; i++) {
		res[i] = result.snapshotItem(i);
	}
	return res;
}


})();