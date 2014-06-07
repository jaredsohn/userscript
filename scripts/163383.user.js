// ==UserScript== 
// @name CleanYouTube
// @author the.dw.coder
// @version 0.4
// @description Eliminate the clutter on YouTube
// @include http*://www.youtube.com/watch?*
// @include http*://www.youtube.com/
// @include http*://www.youtube.com/results*
// @include http*://www.youtube.com/user/*
// ==/UserScript==

function main() {
/**
 * DIV elements to remove from the YouTube page
 */
 var watchDivRemove = ['guide-container', 'watch-discussion',
                    'ticker', 'footer', 'watch-description-extra-info',
                    'masthead-upload-button-group', 'watch7-action-buttons',
                    'watch7-subscription-container', 'yt-masthead-signin',
                    'initial-feed-promo', 'upper-left-section','guide-subscriptions-section',
                    'watch-description-collapse','watch-more-related-button']
/**
 * Class names to remove from the YouTube page
 */
 var watchClassRemove = ['yt-uix-button-subscription-container yt-uix-button-context-light',
                         'video-extras-likes-dislikes','video-extras-sparkbar-likes']
    
    function removeElement(elemString) {
        var elem = document.getElementById(elemString)
        if (elem != undefined) {
            elem.parentNode.removeChild(elem)
        }
    }
    
    function removeElementByClass(classString) {
        var elem = document.getElementsByClassName(classString)[0]
        if (elem != undefined) {
            elem.parentNode.removeChild(elem)
        }
    }
    
    /*
     * Modifies related videos div layer found on the YouTube watch page
     */
    function modifyRelated() {
        var sideBarElm = document.getElementById('watch7-sidebar').getElementsByClassName("video-list-item")
        len = sideBarElm.length
        
        //expand the video description div layer to full size
        document.getElementById('watch-description').className = 'yt-uix-expander yt-uix-button-panel'
        for (i=0; i < len; i++) {
            //if this list item is a YT generated playlist, remove it
            test = sideBarElm[i].getElementsByTagName('a')[0]
            if (test.className.indexOf('related-video') == -1) {
                sideBarElm[i].parentNode.removeChild(sideBarElm[i])
                i--
            }
            else {
                //add video time to the views tag so the information is visible
                time = sideBarElm[i].getElementsByClassName('video-time')[0].innerHTML
                insert = sideBarElm[i].getElementsByClassName('stat view-count')[0]
                insert.innerHTML = '<b>'+time + '</b> / ' +insert.innerHTML
                
                //remove preview thumbnail images
                pic = sideBarElm[i].getElementsByClassName('ux-thumb-wrap contains-addto')[0]
                if (pic != undefined) {
                    pic.parentNode.removeChild(pic)
                }
                //removed featured tag
                pic = sideBarElm[i].getElementsByClassName('yt-badge-std')[0]
                if (pic != undefined) {
                    pic.parentNode.removeChild(pic)
                }
            }
            pic = undefined    
        }
    }
    
    //remove the div elements
    len = watchDivRemove.length
    for (i=0; i < len; i++) {
        removeElement(watchDivRemove[i])
    }
    //remove the class elements
    len = watchClassRemove.length
    for (i=0; i < len; i++) {
        removeElementByClass(watchClassRemove[i])
    }
    //check if the current page is a YT video page
    if (document.location.href.indexOf("watch?") != -1) {
        modifyRelated()
    }
}

main()