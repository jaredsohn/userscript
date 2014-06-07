// ==UserScript==
// @name       WorkFlowy 2 PPT
// @namespace  http://www.iceshock.net/
// @version    0.1
// @description  Trans the workflowy.com into a ppt.
// @match      https://workflowy.com/*
// @copyright  2012+, Alexorz Lee
// ==/UserScript==
var $ = unsafeWindow.$;
$('<style>').text([
    '#header, #move, #controlsLeft, #getMoreSpaceButtonTopLeft, .addButton { display:none !important; }',
    'body { font-family:  Consolas, "微软雅黑"; padding:0; overflow: hidden; }',
    'body, .edge, .corner, .highlight { background: #fff !important; }',
    '.page, #pageContainer { margin:0 !important; }',
    'textarea, .parentArrow, .mainTreeRoot { cursor:default !important; }',
    '.parent > .name { font-size: 10px; }',
    '.selected.project { padding-top: 35px; }',
    '.content { text-decoration:none !important; }'
].join('')).appendTo('head');
$('textarea').attr('disabled','disabled');
$('a').live( 'mouseover', function(){
    $(this).removeAttr('title');
} );
$('.content:first').html('俺是面包屑﹁_﹁');