// ==UserScript==
// @name           replace word
// @namespace      http://efcl.info/
// @include        http://*
// @description    Webサイトの文章を置換する。正規表現対応
// @require        http://userscripts.org/scripts/source/49700.user.js
// ==/UserScript==

new function(_doc){
var configStyle = <><![CDATA[
/* Remove the 40% wasted space to the left */
.field_label{
    vertical-align:top;
}
.config_var{
    display:inline-block;
}
]]></>.toString();

GM_config.init('Configurable Options Script' /* Script title */,
/* Settings object */
{
    'before': // This would be accessed using GM_config.get('Name')
    {
        'label': 'before', // Appears next to field
        'type': 'textarea', // Makes this setting a text field
         rows:15,
         cols:30,
        'default': '置換前\n/(http:\\/\\/[\\w\\d/%#$&?()~_.=+-]+)/' // Default value if user doesn't change it

    },
    'after': // This would be accessed using GM_config.get('Name')
    {
        'label': 'after', // Appears next to field
        'type': 'textarea', // Makes this setting a text field
        rows:15,
        cols:30,
        'default': '置換後\nURLは$1だね' // Default value if user doesn't change it
    }
},
configStyle,
{
    save: function() { location.reload(); }
}
);
GM_registerMenuCommand('ReplaceWord: Configuration',GM_config.open);
// 初期化
var befores = qw(GM_config.get("before")).map(RegParse);
var afters  = qw(GM_config.get("after"));
console.log(befores , afters)
if(befores.length == afters.length){
    var init = function(doc) {
        var txt = xpath(doc, 'descendant::text()[string-length(normalize-space(self::text())) > 0 and not(ancestor::textarea) and not(ancestor::script) and not(ancestor::style)]');
        for (var i = 0, tl = txt.snapshotLength; i < tl; ++i) {
            var df, item = txt.snapshotItem(i),
                text = item.nodeValue.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
                parent = item.parentNode,
                range = document.createRange();
            var newText = text;
            for(var k=0,len=befores.length;k<len;k++){
                newText = newText.replace(befores[k] ,afters[k]);
            }
            range.selectNode(item);
            df = range.createContextualFragment(newText);
            parent.replaceChild(df, item);
            range.detach();
        }
    }
    init(_doc);
}else{
    alert("setting is wrong");
}

function xpath(context, query) {
    return _doc.evaluate(
    query, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
}
// 空改行をなくす
function qw(words) {
    var a = String(words).split("\n");
    if (a.length > 0 && a[0] == "")
        a.unshift();
    if (a[a.length - 1] == "")
        a.pop();
    return a;
}
// /から/でかこまれる文字列は正規表現とする。
function RegParse(str){
    if(str.length > 0 && str[0]==="/" && /\/(?=[igmy]*$)/.test(str)){
        var [,pattern,flags]=str.split(/^\/|\/(?=[igmy]*$)/);
        return new RegExp(pattern,flags);
    }else{
        return str;
    }
}

}(document);