// ==UserScript==
// @name           Display HD picture of the Google Profile Picture
// @namespace      http://userscripts.org/scripts/show/56530
// @author         François Beaufort
// @include        https://profiles.google.com/*
// @date           03/11/2011
// @version        1.2
// @run_at         document_end
// ==/UserScript==

canonicalUrl = document.querySelector("link[rel='canonical']").attributes['href'].value
gid = canonicalUrl.substring(canonicalUrl.lastIndexOf('/')+1,100)
newlink = document.createElement('a');
newlink.setAttribute('href', 'https://profiles.google.com/s2/photos/profile/'+gid);
newlink.setAttribute('target', '_blank');
newlink.appendChild(document.createTextNode('original'))
newlink.style['font'] = 'normal 12px arial,sans-serif'
newlink.style['margin-left'] = '12px'
name = document.querySelector("span[class='fn']").innerHTML
pictureUrl = 'https://profiles.google.com/s2/photos/profile/'+gid
text = '<a href="'+ pictureUrl + '" target="_blank">' + name + '</a>'
document.querySelector("span[class='fn']").innerHTML = text