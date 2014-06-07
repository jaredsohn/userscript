// ==UserScript==
// @name        amazon_mp3_multiple_download
// @namespace   amazon
// @description Download all songs in current playlist
// @include     https://www.amazon.*/gp/dmusic/mp3/player*
// @version     1
// @grant       none
// ==/UserScript==

setTimeout(function() {

var downloadButton = document.getElementsByClassName("downloadButton")[0];
downloadButton.setAttribute("href", "#multipleDownload");
downloadButton.onclick = function() {

var target = document.getElementsByClassName("bodyHeightContainer")[0];
var list = document.getElementsByClassName("bodyContainer")[0];
var listMax = 50; // Amazon Cloud Player displays max 50 MP3 by dataGroup
var scroll = document.getElementsByClassName("selectable")[0].scrollHeight * listMax / 8;
// scroll by 1/8 of max dataGroup for good speed and scroll detection by Amazon script
var scrollMax = list.scrollTopMax;
var idxMax = document.getElementsByClassName("countNumber")[0].firstChild.nodeValue;
var dataGroup = 0;
var idxOffset = 0;
var timer, scrollTimer;

function scrollUid()
{
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length > 0)
            {
                clearInterval(scrollTimer);
                timer = setInterval(function() {
                    mutation.addedNodes[0].getElementsByClassName("optionSprite")[idxOffset].click();
                    document.getElementsByClassName("optionPanelLink")[2].click();
                    ++idxOffset;
                    if (dataGroup + idxOffset == idxMax)
                    {
                        clearInterval(timer);
                        observer.disconnect();
                    }
                    else if (idxOffset == listMax)
                    {
                        dataGroup += listMax;
                        idxOffset = 0;
                        clearInterval(timer);
                        scrollTimer = setInterval(function() {
                            list.scrollTop += scroll;
                        }, 500); // scroll every 1/2 second to let enough time for scroll detection by Amazon script
                    }
                }, 5000); // let enough time (5 seconds) for server response
            }
        });
    });
    var config = {attributes: true, childList: true, characterData: true};
    observer.observe(target, config);

    scrollTimer = setInterval(function() {
        list.scrollTop += scroll;
        if (list.scrollTop == scrollMax)
        {
            clearInterval(scrollTimer);
            observer.disconnect();
        }
    }, 500); // scroll every 1/2 second to let enough time for scroll detection by Amazon script
}

timer = setInterval(function() {
    document.getElementsByClassName("dataGroup" + dataGroup)[0].getElementsByClassName("optionSprite")[idxOffset].click();
    document.getElementsByClassName("optionPanelLink")[2].click();
    ++idxOffset;
    if (dataGroup + idxOffset == idxMax)
        clearInterval(timer);
    else if (idxOffset == listMax)
    {
        dataGroup += listMax;
        idxOffset = 0;
        if (dataGroup == listMax * 2)
        {
            clearInterval(timer);
            scrollUid();
        }
    }
}, 5000); // let enough time (5 seconds) for server response

};

}, 5000); // wait some time (5 seconds) until download button is available
