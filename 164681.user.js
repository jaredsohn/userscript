// ==UserScript==
// @name options
// @description a clasic wikia options made by sactage 
// @include http://*.wikia.com/wiki/Special:Chat*
// @version 1
// @icon http://www.aerial-telephones.co.uk/aerial/wp-content/uploads/2012/04/spanner2.jpg
// ==/UserScript==

var options=document.createElement('script');
options.setAttribute('src','https://raw.github.com/sactage/wikia-js-snippets/master/ChatOptions.js');
options.type='text/javascript';

document.getElementsByTagName('head')[0].appendChild(options);