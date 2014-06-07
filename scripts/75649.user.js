// ==UserScript==
// @name           Vim Wiki - Remove link indirection to vimdoc
// @namespace      http://esquifit.myopenid.com/
// @description    vim.wikia.com - remove link indirection
// @include        http://vim.wikia.com/wiki/*

Array.prototype.filter.call(
                document.links,
                function(l){ return l.href.match(/Outbound/)}
).forEach(function(l){ 
        l.setAttribute('href',
                        decodeURIComponent(l.href
                                            .split('&')
                                            .pop()
                                            .substring(2)))   
 });
        
// ==/UserScript==
