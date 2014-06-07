// ==UserScript==
// @name        ScrollToTop
// @namespace   Deflect
// @description Perpetually scrolls to the top of the screen until disabled.
// @include     *
// @version     1
// ==/UserScript==

var amScrolling = false;

var perpetualScroll = function () {
    var createLink = function () {
        var scrollLink = document.createElement('a');
        scrollLink.className = (scrollLink.className || "") + ' topScroll';
        scrollLink.style.display = 'block';
        scrollLink.style.position = 'fixed';
        scrollLink.style.bottom = '1em';
        scrollLink.style.right = '1em';
        scrollLink.style.color = '#fff';
        scrollLink.style.backgroundColor = '#000';
        scrollLink.style.padding = '0.5em';
        scrollLink.href = '#';
        scrollLink.textContent = 'Start Scroll';
        scrollLink.onclick = function (e){
            amScrolling = !amScrolling;
            if (amScrolling) {
                scrollLink.style.backgroundColor = '#333';
                scrollLink.textContent = 'Stop Scroll';
            } else {
                scrollLink.style.backgroundColor = '#000';
                scrollLink.textContent = 'Start Scroll';
            }
            return false;
        };
        return scrollLink;
    };

    var scrollDiv = document.createElement("div");
    scrollDiv.id = "topScroll0x2a";
    scrollDiv.appendChild(createLink());
    document.body.appendChild(scrollDiv);

    var scroll = function () {
        if (amScrolling) {
            window.scrollTo(0, 0);
        }
    };

    var intervalId = window.setInterval(scroll, 50);
};

perpetualScroll();