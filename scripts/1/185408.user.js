// ==UserScript==
// @name         Facebook Video Downloader
// @namespace    
// @version      0.1
// @description  Download video from Facebook
// @include      *://facebook.com/photo.php?v=*
// @include      *://*.facebook.com/photo.php?v=*
// @include      *://facebook.com/video/video.php?v=*
// @include      *://*.facebook.com/video/video.php?v=*
// @run-at       document-start
// @copyright    
// ==/UserScript==

var inCheck = setInterval (function () {
    unsafeWindow.dd = document;
    var a = document.querySelector ('#userNavigation li'),
        z = document.querySelector ('#fbPhotoPageActions');
    
    if (!a || !z)
        return;
    
    clearInterval (inCheck);
    
    // String
    var sDownload = 'Download $1 Quality',
        sSQ = 'Standard',
        sHQ = 'High';
    
    var vidDL = function () {
        // Codes
        var inChk = setInterval (function () {
            var oVideo = document.querySelector('#photoborder .videoStage embed');
            
            if (!oVideo)
                return;
            
            clearInterval (inChk);
            
            var jPrintf=function(){var b=arguments,d=b.length-1,c=b[0];if(!(1>d)){for(a=d;a>0;a--)c=c.replace(RegExp("(\\$|%)"+a,"g"),b[a]);return c}},
                clsName = 'fbPhotosPhotoActionsItem',
                dAct = document.querySelector ('#fbPhotoPageActions'),
                cLink = function (sLink, sTitle) {
                    var d = document.createElement('a');
                    d.target = '_blank';
                    d.href = sLink;
                    d.className = clsName;
                    d.textContent = jPrintf (sDownload, sTitle);
                    dAct.appendChild (d);
                };
            
            var params = decodeURIComponent (oVideo.getAttribute ('flashvars'));
            params = params.substr (params.indexOf ('{'));
            params = params.substr (0, 1 + params.indexOf ('}&'));
            var aLinks = JSON.parse (params)['video_data'][0];
            // console.log (aLinks);
            
            if (aLinks.hd_src)
                cLink (aLinks.hd_src, sHQ);
            
            if (aLinks.sd_src)
                cLink (aLinks.sd_src, sSQ);
        }, 200);
        // console.log ('Interval [inChk] :: ', inChk);
    };
    vidDL ();
    
    var b = a.cloneNode(true),
        c = b.querySelector ('a');
    c.removeAttribute('href');
    c.title = c.textContent = 'Re-Check dl link Manually';
    b.addEventListener ('click', vidDL, false);
    a.parentNode.appendChild(b);
}, 200);

// console.log ('Interval [inCheck] :: ', inCheck);