// ==UserScript==
// @name        InkBunny: Link below thumbnail to full image.
// @description Creates a new link around submission thumbnail to full image (in gallery view).
// @author      Magi
// @include     https://inkbunny.net/submissionsviewall.php?*
// @icon        https://inkbunny.net/imagesbeta67/INKBunnyLogo.ico
// @grant       none
// ==/UserScript==

(function() {
    'use strict';
    
    function gencode(fullimgurl) {
        // remove file extension from full image url
        var data = fullimgurl.replace(/\.[^.]+$/,'');
        
        /* return the string that's added to the created html page.
         * note: it cannot reference outside variables,
         * only the one that's passed to it (data) */
        return 'var data="'+btoa(data)+'";('+(function() {
            var img = document.createElement('img')
                , imgurl = atob(data)
                ;
            
            /* execute the following code when dom has been "executed" (loaded)
             * ugly onerror hack detects if the url is wrong and tries the next one
             * (correct url detection should be done with xmlhttprequest
             *  & progress listeners, without this datauri page */
            window.addEventListener('load', function() {
                document.body.appendChild(img);
                img.src = imgurl+'.jpg';
                img.onerror = function() {
                    img.src = imgurl+'.png'
                    img.onerror = function() {
                        img.src = imgurl+'.gif'
                        img.onerror = function() {
                            img.src = imgurl+'.jpeg'
                            delete img.onerror;
                        }
                    }
                }
                img.onload = function() {
                    document.location.replace(img.src);
                }
            });
            
        })+')();';
    }

    // loop all image elements
    for (var img of document.querySelectorAll('.widget_imageFromSubmission img')) {
        var fullimgurl = img.src.replace('thumbnails/medium', 'files/full');
        
        var submissionviewurl = img.parentElement.href;

        // helper for adding the new a element
        var dummy = document.createElement('span');
        dummy.style.display = 'none';
        
        var div = img.parentElement.parentElement.parentElement.parentElement;
        var divparent = div.parentElement;
        divparent.insertBefore(dummy, div);
        divparent.removeChild(div);
        
        var a = document.createElement('a');
        img.parentElement.href = submissionviewurl;
        /* a.href = fullimgurl;
         * cannot point directly to the full image, because the file extension is not known.
         * resort to a hack which tries to guess the file ending
        
         * use datauri to create in-place html page */
        a.href = 'data:text/html;base64,'+ btoa('<script>'+gencode(fullimgurl)+'</script>');
        
        a.appendChild(div);
        
        divparent.insertBefore(a, dummy);
    }
    
})();
