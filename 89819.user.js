// ==UserScript==
// @name           Textwrap
// @description    
// @include        http://zamunda.net/*
// ==/UserScript==
function wordwrap( str, width, brk, cut ) {
 
    brk = brk || '\n';
    width = width || 96;
    cut = cut || false;
 
    if (!str) { return str; }
 
    var regex = '.{1,' +width+ '}(\\s|$)' + (cut ? '|.{' +width+ '}|.+$' : '|\\S+?(\\s|$)');
 
    return str.match( RegExp(regex, 'g') ).join( brk );
 
}