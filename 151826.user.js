// ==UserScript==
// @name       Get IMG Data
// @namespace  http://use.i.E.your.homepage/
// @version    1.0
// @description  get the data URL of an image
// @match      http://*
// @match      https://*
// ==/UserScript==
(function() {
    var imgs = [];
    var img;
    var overlay;
    var looking = false;
    function mouseOver(evt) {
        if (!looking) return;
        evt.preventDefault();
        evt.stopPropagation();
        
        img = evt.target;
        var rect = img.getBoundingClientRect();
        overlay.style.top = rect.top + 'px';
        overlay.style.left = rect.left + 'px';
        overlay.style.height = rect.height - 4 + 'px';
        overlay.style.width = rect.width - 4 + 'px';
        overlay.style.display = 'block';
    }
    function mouseOut(evt) {
        overlay.style.display = 'none';
    }
    function click(evt) {
        if (!looking) return;
        evt.preventDefault();
        evt.stopPropagation();
        looking = false;
        
        try {
            prompt('imgData', getImgData());
        } catch (ex) {
            alert('Error: ' + ex.message);
        }
        overlay.parentNode.removeChild(overlay);
    }
    function selectImageElement() {
        if (!overlay) {
            overlay = document.createElement('overlay');
            overlay.style.position = 'fixed';
            overlay.style.border = '2px solid rgba(255,0,0,0.5)';
            overlay.style.background = 'rgba(255,255,0,0.25)';
            overlay.style.display = 'none';
            overlay.addEventListener('click', click, false);
            overlay.addEventListener('mouseout', mouseOut, false);
            imgs = document.querySelectorAll('img');
            for (var i=0;i<imgs.length;i++) {
                imgs[i].addEventListener('mouseover', mouseOver, false);
            }
        }
        looking = true;
        document.body.appendChild(overlay);
    }
    function getImgData() {
        var c = document.createElement('canvas');
        var cx = c.getContext('2d');
        c.width = img.width;
        c.height = img.height;
        cx.drawImage(img, 0, 0);
        return c.toDataURL('image/png');
    }
    function showImageData() {
        var img = document.getElementsByTagName('img')[0];
        var c = document.createElement('canvas');
        c.width = img.width;
        c.height = img.height;
        var cx = c.getContext('2d');
        cx.drawImage(img, 0, 0);
        console.info(c.toDataURL('image/png'));
    }
    GM_registerMenuCommand('Show Image Data', selectImageElement);
})();