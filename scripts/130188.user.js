// ==UserScript==
// @name           magnet to torrent
// @namespace      Magnet to torcache
// @description    Forwarding magnet uri's to torcache
// @include        *
// @downloadURL   https://userscripts.org/scripts/source/130188.user.js
// @updateURL     https://userscripts.org/scripts/source/130188.meta.js
// ==/UserScript==

// get all anchors (links)
LinkArray=document.getElementsByTagName('a');

// walk though them
for(LinkNumber=0;LinkNumber<=LinkArray.length;LinkNumber++){

    // get the href from the anchor
    ModURI = LinkArray[LinkNumber].href;

    // if the href contains both 'magnet:' and 'xt=urn:btih:' try to make a link
    if(ModURI.indexOf('magnet:')!=-1 && ModURI.indexOf('xt=urn:btih:')!=-1){

        // we only want the part after this so we split at this point
        ModURI=ModURI.split('xt=urn:btih:');

        // we dont want any other parts of the magnet uri
        // so we split the string at & and use only the first part
        ModURI=ModURI[1].split('\&');

        // rewrite the href of the anchor
        LinkArray[LinkNumber].href='http://torcache.net/torrent/'+ModURI[0]+'.torrent';
    }
}
