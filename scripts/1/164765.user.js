// ==UserScript==
// @name           Simple Allegro
// @namespace      tag://allegro
// @description    later
// @author         Mutik
// @version        0.1
// @grant          none
// @include        *://allegro.pl*
// ==/UserScript==

window.cHTML = function(ele) {
    function Cele(ele) {
        this._ele = ele;
        this.ele = function() { return this._ele };
        this.set = function(param) { for (var attr in param) if (param.hasOwnProperty(attr)) this._ele.setAttribute(attr, param[attr]); return this };
        this.text = function(text) { this._ele.appendChild(document.createTextNode(text)); return this };
        this.html = function(text,overwrite) { this._ele.innerHTML = overwrite ? text : this._ele.innerHTML + text; return this };
        this.on = function(event,func,bubble) { this._ele.addEventListener(event,func,bubble); return this };
        this.attach = function(method,ele) {
            if (typeof ele == 'string') ele = document.getElementById(String(ele));
            if (!(ele instanceof Node)) throw 'Invalid attachment element specified';
            else if (!/^(?:to|before|after)$/i.test(method)) throw 'Invalid append method specified';
            else if (method == 'to') ele.appendChild(this._ele);
            else if (method == 'before') ele.parentNode.insertBefore(this._ele, ele);
            else if (typeof ele.nextSibling == 'undefined') ele.parentNode.appendChild(this._ele);
            else ele.parentNode.insertBefore(this._ele, ele.nextSibling);
            return this
        };
    }
    if (typeof ele == 'string') ele = /^#/i.test(String(ele)) ? document.getElementById(ele.substring(1)) : document.createElement(String(ele));
    if (ele instanceof Node) return new Cele(ele);
    throw 'Invalid element type specified';
};

cHTML('style').set({type: "text/css"}).text(" \
    div.main-page, div#side-ad-box, section.partners, section.promoted, section.main-box, section.recommended, section.category-map h2, .main-breadcrumb small  {display:none !important; height:0; width: 0; } \
    .main-footer { margin-top: -1px; } \
    .main-breadcrumb { padding: 10px 0 8px; min-height: 0; } \
    .category-map > ul { font-size: 11px; } \
    .main-nav > ul .nav-tab .layer-wrapper .products { display: none } \
    .main-nav > ul .nav-tab .layer-wrapper .image { display: none } \
    .main-nav > ul .nav-tab .layer-wrapper .categories ul li { display: inline; font-size: 11px; padding: 0 15px 0 0; line-height: 22px; white-space: nowrap; } \
    .main-nav > ul .nav-tab .layer-wrapper .categories > div+div { border: 0; } \
    .main-nav > ul .nav-tab .layer-wrapper .layer .col { height: 150px; } \
    .main-nav > ul .nav-tab .layer-wrapper .categories { border: 0; width: 100% } \
    .main-nav > ul .nav-tab .layer-wrapper .categories h2 { font-size: 16px; margin: 0 0 5px; text-transform: uppercase; padding: 0; } \
    .main-nav > ul .nav-tab.current .layer { height: 150px !important; } \
").attach("to", document.head);