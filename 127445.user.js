// ==UserScript==
// @name v5_tester
// @version 5.01
// @namespace http://www.justmyimagination.com
// @description *shrugs* .. dunno yet ..
// @include http://*.stumbleupon.com/*
// @copyright © JustMyImagination 2011
// ==/UserScript==

var headID = document.getElementsByTagName("head")[0];
var cssNode = document.createElement('style');
cssNode.type = 'text/css';
cssNode.innerHTML ='body.wrapper-content.wrapper-content {
    width: 100%;
    min-height: 600px;
    background: #000000; /* Old browsers */
    background: -moz-linear-gradient(top, #f1f1ee 0%, #000000 300px, #ffffff 480px, #ffffff 100%); /* FF3.6+ */
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f1f1ee), color-stop(37%,#f1f1ee), color-stop(60%,#ffffff), color-stop(100%,#ffffff)); /* Chrome,Safari4+ */
    background: -webkit-linear-gradient(top, #f1f1ee 0%,#f1f1ee 300px,#ffffff 480px,#ffffff 100%); /* Chrome10+,Safari5.1+ */
    background: -o-linear-gradient(top, #f1f1ee 0%,#f1f1ee 300px,#ffffff 480px,#ffffff 100%); /* Opera 11.10+ */
    background: -ms-linear-gradient(top, #f1f1ee 0%,#f1f1ee 300px,#ffffff 480px,#ffffff 100%); /* IE10+ */
    background: linear-gradient(top, #f1f1ee 0%,#f1f1ee 300px,#ffffff 480px,#ffffff 100%); /* W3C */
}';
headID.appendChild(cssNode);