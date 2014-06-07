// ==UserScript==
// @name           Flickr Tag Autocomplete
// @namespace      http://endflow.net/
// @description    provides tag autocomplete feature on Flickr
// @include        http://www.flickr.com/photos/*/*/
// @include        http://flickr.com/photos/*/*/
// @resource       YUI_AC_JS http://yui.yahooapis.com/2.6.0/build/autocomplete/autocomplete-min.js
// @resource       YUI_DS_JS http://yui.yahooapis.com/2.6.0/build/datasource/datasource-min.js
// @resource       YUI_AC_CSS http://yui.yahooapis.com/2.6.0/build/autocomplete/assets/skins/sam/autocomplete.css
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Flickr: netkuy)
// @version        0.1.2
// @history        [2008-07-02] 0.1.0 first version
//                 [2008-07-16] 0.1.1 add configurable items
//                 [2008-10-03] 0.1.2 some improvements

(function(){
// =========== config =============
var cfg = {
    anim: 0,    // speed of animation, in seconds (0: disable anim)
    max: 10,    // max num of results to display
    comp: false // auto-selecting matched items (true: auto-select)
};
// ================================
var w = this.unsafeWindow || window;
$X('id("tagadderlink")/a').addEventListener('click', function(){
    $X('//body').className = 'yui-skin-sam';
    // load YUI css & js
    GM_addStyle(GM_getResourceText('YUI_AC_CSS'));
    $X('//head').appendChild($n('script',
        {innerHTML:GM_getResourceText('YUI_DS_JS') + GM_getResourceText('YUI_AC_JS')}));
    // create container for autocomplete
    $('tagadder').appendChild($n('div', {id:'tagscontainer'}), $('tagpopular'));
    // acquire tags
    w.tagrs_showPopular(80, '');
    $('tagpopular').style.display = 'none';
    setTimeout(function(){
        var tags = $x('id("tagpopular")/a[@class="tagrsUnUsed"]')
            .map(function(a){return a.innerHTML}).join(',');
        if(tags === ''){
            setTimeout(arguments.callee, 400);
            return;
        }
        // initialize YUI autocomplete
        $X('//head').appendChild($n('script', {innerHTML:$e(<><![CDATA[
            var ds = new YAHOO.widget.DS_JSArray('#{tags}'.split(','));
            var ac = new YAHOO.widget.AutoComplete('addtagbox', 'tagscontainer', ds);
            ac.prehighlightClassName = "yui-ac-prehighlight";
            ac.animSpeed = #{anim};
            ac.queryDelay = 0;
            ac.maxResultsDisplayed = #{max};
            ac.typeAhead = #{comp};
            ac.delimChar = ' ';
        ]]></>, {tags:tags, anim:cfg.anim, max:cfg.max, comp:cfg.comp})}));
        $('addtagbox').focus();
    }, 200);
}, false);
function $x(x,c){c=c||document;var res=document.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=res.iterateNext();nodes.push(i));return nodes}
function $X(x){return $x(x)[0]}
function $(id){return document.getElementById(id)}
function $n(t,o,c){var e = document.createElement(t);if(o){for(var k in o)
{e[k]=o[k]}}if(c){c.forEach(function(ch){e.appendChild(ch)})}return e}
function $e(t,o){t=t.toString();for(var k in o){t=t.replace(new RegExp('#{'+k+'}','g'),o[k])}return t}
})();
