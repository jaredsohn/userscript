// ==UserScript==
// @name        Freemail Scam Remover
// @namespace   adblock_hater_hater
// @description Removes the hard-to-remove scam "info" bar on GMX/Web.de which pretends that AdBlock(Plus/Edge) are security risks by stripping all not-whitelisted HTML
// @include     http://www.gmx.net/*
// @include     http://gmx.net/*
// @include     http://web.de/*
// @include     http://www.web.de/*
// @version     1
// @grant       none
// ==/UserScript==


// whitelist for valid html node names
var valid =[
            '#document',
            '#text',
            '#comment',
            'a',
            'abbr',
            'acronym',
            'address',
            'applet',
            'area',
            'article',
            'aside',
            'audio',
            'b',
            'base',
            'basefont',
            'bdi',
            'bdo',
            'big',
            'blockquote',
            'body',
            'br',
            'button',
            'canvas',
            'caption',
            'center',
            'cite',
            'code',
            'col',
            'colgroup',
            'data',
            'datagrid',
            'datalist',
            'dd',
            'del',
            'details',
            'dfn',
            'dialog',
            'dir',
            'div',
            'dl',
            'dt',
            'em',
            'embed',
            'eventsource',
            'fieldset',
            'figcaption',
            'figure',
            'font',
            'footer',
            'form',
            'frame',
            'frameset',
            'h',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'head',
            'header',
            'hr',
            'html',
            'i',
            'iframe',
            'img',
            'input',
            'ins',
            'isindex',
            'kbd',
            'keygen',
            'label',
            'legend',
            'li',
            'link',
            'main',
            'map',
            'mark',
            'menu',
            'menuitem',
            'meta',
            'meter',
            'nav',
            'noframes',
            'noscript',
            'object',
            'ol',
            'optgroup',
            'option',
            'output',
            'p',
            'param',
            'pre',
            'progress',
            'q',
            'rp',
            'rt',
            'ruby',
            's',
            'samp',
            'script',
            'section',
            'select',
            'small',
            'source',
            'span',
            'strike',
            'strong',
            'style',
            'sub',
            'summary',
            'sup',
            'table',
            'tbody',
            'td',
            'textarea',
            'tfoot',
            'th',
            'thead',
            'time',
            'title',
            'tr',
            'track',
            'tt',
            'u',
            'ul',
            'var',
            'video',
            'wbr'];

function isValid(name) {
    var c = name.indexOf(':');
    if(c !=-1) {
        name = name.substring(0,c);
    }
    return valid.indexOf(name.toLowerCase()) !== -1;
}
function removeScam(el){
    if(!isValid(el.nodeName.toLowerCase())) {
        el.parentNode.removeChild(el);
        return;
    }
    if(el.childNodes.length > 0) {
        for(var i=0;i<el.childNodes.length;i++) {
            removeScam(el.childNodes[i]);
        }
    }
}
removeScam(document);
