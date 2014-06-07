// ==UserScript==
// @name       biliCover
// @match      http://www.bilibili.tv/video/av*
// ==/UserScript==

document.addEventListener('DOMContentLoaded', function () {
    var cover = document.getElementsByClassName('cover_image')[0];
    var title = document.getElementsByClassName('info')[0].getElementsByTagName('h2')[0];
    title.style.color = '#39C';
    cover.style.position = 'absolute';
    cover.style.zIndex = '9999';
    function getOffset(e) {
        var offset;
        if (e.offsetParent) {
            offset = getOffset(e.offsetParent);
        } else {
            offset = {
                left: 0,
                top: 0
            };
        }
        return {
            left: e.offsetLeft + offset.left,
            top: e.offsetTop + offset.top
        };
    }
    title.addEventListener('mouseover', function (e) {
        var offset = getOffset(title);
        cover.style.left = offset.left - getOffset(document.getElementsByClassName('z')[0]).left + title.offsetWidth - cover.width + 'px';
        cover.style.top = (offset.top > cover.height?offset.top-cover.height:0) + 'px';
        cover.style.display = 'block';
    }, false);
    title.addEventListener('mouseout', function (e) {
        cover.style.display = 'none';
    }, false);
}, false);
