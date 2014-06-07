// ==UserScript==
// @name           Date highlighter
// @namespace      http://userscripts.org/users/86496
// @description    Add text shadow to highlight dates in text.
// @include        *
// @version        1.10b
// ==/UserScript==


(function() {

var time_delay = 0;
var clsname = '_hilidate';

// var regdate = /((([1-9]\d{1,3}([-\/\._]|年))((10|11|12|0?[1-9])([-\/\._]|月))(([1-2][0-9]|30|31|0?[1-9])日?)?)|(([1-9]\d{1,3}([-\/\._]|年))?((10|11|12|0?[1-9])([-\/\._]|月))(([1-2][0-9]|30|31|0?[1-9])日?)))(?!##)/g;
// var regdate = /(((^|\W)((([1-9]\d)?\d{2}[_\.](10|11|12|0?[1-9])[_\.]([1-2][0-9]|30|31|0?[1-9]))|((([1-9]\d)?\d{2}[-\/])?(10|11|12|0?[1-9])([-\/]([1-2][0-9]|30|31|0?[1-9])))|((([1-9]\d)?\d{2}[-\/])?((10|11|12|0?[1-9])[-\/])(([1-2][0-9]|30|31|0?[1-9]))))($|(?=\W)))|((([1-9]\d)?\d{2}年)?((10|11|12|0?[1-9])月)(([1-2][0-9]|30|31|0?[1-9])日))|((([1-9]\d)?\d{2}年)((10|11|12|0?[1-9])月)(([1-2][0-9]|30|31|0?[1-9])日)?))(?!##)/g;
var regdate = /(((^|\W)((([1-9]\d)?\d{2}[_\.](10|11|12|0?[1-9])[_\.]([1-2][0-9]|30|31|0?[1-9]))|(([1-2][0-9]|30|31|0?[1-9])[_\/\.-](10|11|12|0?[1-9])[_\/\.-]([1-9]\d)?\d{2})|((10|11|12|0?[1-9])[_\/\.-]([1-2][0-9]|30|31|0?[1-9])[_\/\.-]([1-9]\d)?\d{2})|((([1-9]\d)?\d{2}[-\/])?(10|11|12|0?[1-9])[-\/]([1-2][0-9]|30|31|0[1-9]))|((([1-9]\d)?\d{2}[_\/\.-])(10|11|12|0?[1-9])[_\/\.-]([1-2][0-9]|30|31|0?[1-9])?)|(([1-2][0-9]|30|31|0?[1-9])(st|nd|rd|th)?\s((jan(uary)?)|(feb(ruary)?)|(mar(ch)?)|(apr(il)?)|(may|jun(e)?)|(jul(y)?)|(aug(ust)?)|(sep(tember)?)|(oct(ober)?)|(nov(ember)?)|(dec(ember)?))(,?\s([1-9]\d)?\d{2})?)|(((jan(uary)?)|(feb(ruary)?)|(mar(ch)?)|(apr(il)?)|(may|jun(e)?)|(jul(y)?)|(aug(ust)?)|(sep(tember)?)|(oct(ober)?)|(nov(ember)?)|(dec(ember)?))\s{1,2}([1-2][0-9]|30|31|0?[1-9])(st|nd|rd|th)?(,?\s([1-9]\d)?\d{2})?)|(\d{1,4}\s?(BC|AD|B\.C\.|A\.D\.|CE|BCE|C\.E\.|B\.C\.E\.)))($|(?=\W)))|((([1-9]\d)?\d{2}年)?((10|11|12|0?[1-9])月)(([1-2][0-9]|30|31|0?[1-9])日))|((([1-9]\d)?\d{2}年)((10|11|12|0?[1-9])月)?(([1-2][0-9]|30|31|0?[1-9])日)?)|(([1-9]\d)?\d{2}年)|((10|11|12|[1-9])月))(?!##)/ig;


// Insert CSS
var headID = document.getElementsByTagName("head")[0];         
var cssNode = document.createElement('style');
cssNode.type = 'text/css';
cssNode.innerHTML = '.'+clsname+' {text-shadow: 1px 1px 2px #333,-1px 0 white, 0 1px white,1px 0 white, 0 -1px white;font:inherit!important;display:inline!important;float:none!important;position:static!important;margin:0!important;padding:0!important;text-align:inherit!important;color:black!important;}';
headID.appendChild(cssNode);
// Watch for AutoPagerize
window.addEventListener('AutoPagerize_DOMNodeInserted', function(e){DateHili(e.target)}, false);
window.addEventListener('load', function(){setTimeout(DateHili,time_delay,document);}, false);

function DateHili(node){
// console.time('HighLightAll');
    var doc = node || document;
    $X('descendant::text()[string-length(normalize-space(self::text())) > 0 and not(ancestor::textarea or ancestor::script or ancestor::style or ancestor::aside or ancestor::title)]', doc).forEach(function(text_node) {
        var df, text = text_node.nodeValue, id_index = 0,
        parent = text_node.parentNode, range = document.createRange(), replace_strings = [],
        new_text = text.replace(regdate,function($0,$1,$2,$3) {
                    replace_strings[id_index] = /*(regnotdate.test($1))? $1 : */($3 + '<span class="'+clsname+'">' + $1.replace($3,'') + '</span>');
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
// console.timeEnd('HighLightAll');
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


/*	
var regdate = /(
((^|\W)(
(([1-9]\d)?\d{2}[_\.](10|11|12|0?[1-9])[_\.]([1-2][0-9]|30|31|0?[1-9]))|
(([1-2][0-9]|30|31|0?[1-9])[_\/\.-](10|11|12|0?[1-9])[_\/\.-]([1-9]\d)?\d{2})|
((10|11|12|0?[1-9])[_\/\.-]([1-2][0-9]|30|31|0?[1-9])[_\/\.-]([1-9]\d)?\d{2})|
((([1-9]\d)?\d{2}[-\/])?(10|11|12|0?[1-9])[-\/]([1-2][0-9]|30|31|0[1-9]))|
((([1-9]\d)?\d{2}[_\/\.-])(10|11|12|0?[1-9])[_\/\.-]([1-2][0-9]|30|31|0?[1-9])?)|
(([1-2][0-9]|30|31|0?[1-9])(st|nd|rd|th)?\s((jan(uary)?)|(feb(ruary)?)|(mar(ch)?)|(apr(il)?)|(may|jun(e)?)|(jul(y)?)|(aug(ust)?)|(sep(tember)?)|(oct(ober)?)|(nov(ember)?)|(dec(ember)?))(,?\s([1-9]\d)?\d{2})?)|
(((jan(uary)?)|(feb(ruary)?)|(mar(ch)?)|(apr(il)?)|(may|jun(e)?)|(jul(y)?)|(aug(ust)?)|(sep(tember)?)|(oct(ober)?)|(nov(ember)?)|(dec(ember)?))\s{1,2}([1-2][0-9]|30|31|0?[1-9])(st|nd|rd|th)?(,?\s([1-9]\d)?\d{2})?)|
(\d{1,4}\s?(BC|AD|B\.C\.|A\.D\.|CE|BCE|C\.E\.|B\.C\.E\.))
)
($|(?=\W)))|
((([1-9]\d)?\d{2}年)?((10|11|12|0?[1-9])月)(([1-2][0-9]|30|31|0?[1-9])日))|
((([1-9]\d)?\d{2}年)((10|11|12|0?[1-9])月)?(([1-2][0-9]|30|31|0?[1-9])日)?)|
(([1-9]\d)?\d{2}年)|
((10|11|12|[1-9])月)
)(?!##)/ig;
*/
})();