// ==UserScript==
// @name             TwitterURLExpander
// @version          2.0
// @namespace        designpeo.pl
// @description      TwitterURLExpander expands all shortened URLS on twitter.com as they appear in your timeline
// @homepageURL      http://twitterurlexpander.built.by.designpeo.pl/e
// @updateURL        
// @contributionURL  http://flattr.com/thing/389931/Twitter-URL-Expander
// @icon             http://twitterurlexpander.built.by.designpeo.pl/e/twitterurlexpander-32.png
// @icon64           http://twitterurlexpander.built.by.designpeo.pl/e/twitterurlexpander-64.png
// @domain           twitter.com 
// @include          http://twitter.com/
// @include          https://twitter.com/
// @include          http://twitter.com/#*
// @include          https://twitter.com/#*
// @match            http://twitter.com/
// @match            https://twitter.com/
// @match            http://twitter.com/#*
// @match            https://twitter.com/#*
// @noframes         1
// ==/UserScript==

// Copyright (c) 2011 designpeo.pl/e <info@designpeo.pl>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.
(function(){window.tuef=true;var a=document.getElementsByTagName('a').length;var interval=setInterval(function(){var u=document.getElementsByTagName('a');if(u.length!=a||window.tuef){for(var i=0;i<u.length;i++){var x=(u[i].getAttribute('data-ultimate-url'))?u[i].getAttribute('data-ultimate-url'):u[i].getAttribute('data-expanded-url');if(x){if(x.lastIndexOf('/')!=-1&&x.lastIndexOf('/')==x.length-1){x=x.substring(0,x.length-1);};u[i].setAttribute('href',x);u[i].innerHTML=x;}};a=u.length;window.tuef=false;}},1000);})();
