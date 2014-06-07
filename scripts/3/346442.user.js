// ==UserScript==
// @name        Fix Trade.tf Appearance
// @description Removes the slate color scheme and makes multiple other changes to trade.tf's appearance and layout
// @namespace   https://github.com/rjn945
// @include     http://www.trade.tf/*
// @version     0.2
// @grant       none
// ==/UserScript==

var CHANGE_COLOR = true;
var MOVE_PROFIT_LEFT = true;

c = "";
c+= "div.trade-header-title .btn-mini { margin-top: -5px; } ";
c+= "span.label a.close { vertical-align: text-top; line-height: 14px; } ";

if (CHANGE_COLOR) {
    //Change Live loader
    $('img[src="/static/img/ajax-loader-black.gif"]').attr("src", "/static/img/ajax-loader.gif");

    // General changes
    c = "body { background-color: #fffff0; color: #000000; } ";
    c+= "a { color: #000000; } ";
    c+= "a:hover { color: #000000; } ";
    c+= "h1,h2,h3,h4,h5,h6 { text-shadow: -1px -1px 0px rgba(255, 255, 255, 0.3); } ";
    c+= ".btn{;color:#333333;text-shadow:0 1px 1px rgba(255, 255, 255, 0.75);background-color:#f5f5f5;background-image:-moz-linear-gradient(top, #ffffff, #e6e6e6);background-image:-webkit-gradient(linear, 0 0, 0 100%, from(#ffffff), to(#e6e6e6));background-image:-webkit-linear-gradient(top, #ffffff, #e6e6e6);background-image:-o-linear-gradient(top, #ffffff, #e6e6e6);background-image:linear-gradient(to bottom, #ffffff, #e6e6e6);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff', endColorstr='#ffe6e6e6', GradientType=0);border-color:#e6e6e6 #e6e6e6 #bfbfbf;border-color:rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);*background-color:#e6e6e6;filter:progid:DXImageTransform.Microsoft.gradient(enabled = false);border:1px solid #cccccc;*border:0;border-bottom-color:#b3b3b3;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;*margin-left:.3em;-webkit-box-shadow:inset 0 1px 0 rgba(255,255,255,.2), 0 1px 2px rgba(0,0,0,.05);-moz-box-shadow:inset 0 1px 0 rgba(255,255,255,.2), 0 1px 2px rgba(0,0,0,.05);box-shadow:inset 0 1px 0 rgba(255,255,255,.2), 0 1px 2px rgba(0,0,0,.05);}.btn:hover,.btn:focus,.btn:active,.btn.active,.btn.disabled,.btn[disabled]{color:#333333;background-color:#e6e6e6;*background-color:#d9d9d9;}";

    // Homepage
    c+= "div.home-slider div div { background-color: #333333;} ";

    // Tables
    c+= "table { background-color: #ffffff; } ";
    c+= "thead th { background-color: #999999; } ";

    // Live Deals Header
    c+= "h2 a { color: #000000; } ";
    c+= "h2 a:hover { color: #000000; } ";
    c+= "div.help-div { background-color: #FAEBD7 } ";
    c+= "legend { color: #000000; text-shadow: none; } ";
    c+= "label.checkbox { color: #000000; text-shadow: none; } ";
    c+= "div.input-append span.add-on { background-color: #c0b8a0; } ";
    c+= "span.help-inline { color: #000000; } ";

    // Item Updates
    c+= "div.items-updates-item-title { background-color: #E3DBC3; } ";
    c+= "div.items-updates-item { background-color: #fffdd0; } ";
    c+= "span.items-updates-item-prop-good { color: #007700; } ";
    c+= "span.items-updates-item-prop-bad { color: #333333; } ";

    // Trade Listing Header
    c+= "div.trade-header-title a { color: #f0f0f0; } ";
    c+= "div.trade-header-title a:hover { color: #f0f0f0; } ";
    c+= "div.trade-header-notes { background-color: #fffdd0; color: #222222; } ";

    // Trade Listing Items
    c+= "div.trade-item { background-color: #fffdd0; color: #000000; } ";
    c+= "div.trade-item-title { background-color: #E3DBC3; color: #000000; } ";
    c+= "div.trade-item-details a { color: #000022; } ";
    c+= "div.trade-arrow img { opacity: 0.8; } ";

    // Labels
    c+= "span.label-important a { color: #f0f0f0; } ";
    c+= "span.label-important a:hover { color: #f0f0f0; } ";

    // Popover
    c+= ".popover-title { background-color: #99998b; } ";
    c+= "div.popover-content { background-color: #ddddd0; } ";
    c+= "table.hover-table .hover-field-name { background-color: #99998b; } ";
    c+= "table.hover-table  { background-color: #ddddd0; } ";

    // Price Summary
    c+= "table.price-summary td.price-footer { background-color: #cccccc; } ";
    c+= "table.price-summary td.price-price { border-right-width: 2px; } ";

}

if (MOVE_PROFIT_LEFT) {
    c+= "div.trade-profit { float: left; } ";
    c+= "div.trade-header-right { float: right; } ";
}

// Add style to page
var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = c;
document.body.appendChild(css);