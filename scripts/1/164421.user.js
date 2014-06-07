// ==UserScript==
// @name         Windows Media Player Replacement
// @namespace    http://jixun.org/
// @version      1.0
// @description  Use html5 tag <Video> and <Audio> replace the embed method.
// @include      *
// @copyright    2012+, Jixun
// ==/UserScript==

/* Not used */
function getComputedStyleString ( elem, pseudoElt ) {
    var cssStyle = getComputedStyle (elem, pseudoElt),
        ret = '';
    for (var i=0; i<cssStyle.length; i++) {
        console.log (cssStyle[i], ': ', cssStyle[cssStyle[i]]);
        
        ret += cssStyle[i];
        ret += ': ';
        ret += cssStyle[cssStyle[i]];
        ret += '; ';
    }
    return ret;
}

/* jQuery Style */
function $ ( query ) {
    return document.querySelectorAll (query)
}

/* Shorthand of document.createElement*/
function cE ( tagName, arrAttr ) {
    var ret = document.createElement (tagName);
    if (!arrAttr)
        return ret;
    
    if (typeof (arrAttr) == 'object') {
        // { attrName: 'attr', ... }
        for (attrName in arrAttr)
            ret.setAttribute (attrName, arrAttr[attrName] || '');
    }
    
    return ret;
}

/* get Mime string and media Type  */
function getMimeType ( sUrl ) {
    var mime = ret = '', fExt = sUrl.substr(-3).toLowerCase();
    switch ( fExt ) {
        case 'mp3':
            type = 'mpeg';
        case 'ogg': case 'wav':
            mime = 'audio';
            type = (type||fExt);
            break;
            
        case 'mp4': case 'webm':
            mime = 'video';
            type = fExt;
            break;
            
        default: 
            type = false;
            mime = 'Not supported format: ' + fExt;
    }
    
    return {
        'type': type,
        'tagName': mime,
        'mime': mime + '/' + type
    };
}

/* Get all the match elements */
var arrList = $('embed[type="application/x-mplayer2"]');
for (var i=0; i<arrList.length; i++) {
    (function(e){
        var sAddr = e.src, srcType = getMimeType(sAddr);
        if (srcType.type === false) {
            var player = cE ( 'div' , {
                'style': 'padding: 10px; border: skyblue 1px dashed;'
            });
            player.innerHTML = srcType.tagName;
        } else {
            var player = cE (srcType.tagName, {
                'type': srcType.mime,
                'src': sAddr,
                'controls': '',
                'style': 'width:100%;' + (e.getAttribute ('style') || '')
            });
            if (e.getAttribute ('loop') != '0')
                player.setAttribute ('loop', 1);
            
            if (e.getAttribute ('autoplay') != '0')
                player.setAttribute ('autoplay', 1);
            
            e.style.display = 'none';
            // e.parentNode.removeChild (e);
        }
        e.parentNode.insertBefore (player, e);
    }) (arrList[i]);
}