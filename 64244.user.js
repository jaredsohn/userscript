// ==UserScript==
// @name           IIchong Image Preview
// @namespace      http://iichan.ru#image-preview
// @description    Shows a preview of an image when hovering over a link that image.
// @include        http://iichan.ru/b/*
// @author         iichan.ru anonymous
// ==/UserScript==

(function() {


    function createPreviewDiv(link, imgSrc) {
        
        //Create the elements
        var div = document.createElement('div');
        var img = document.createElement('img');
        img.setAttribute('src', imgSrc);
        img.setAttribute('alt', 'Mod-tan, marry me! Also loading...');
        img.setAttribute('style', 'max-width: 300px; max-height: 300px;');
        div.appendChild(img);

        //Calculate position
        for (var x = 0, y = 0;  link.offsetParent; link = link.offsetParent) {
            x += link.offsetLeft;
            y += link.offsetTop;
        }

        //Set style information
        div.style.position = 'absolute';
        div.style.backgroundColor = 'white';
        div.style.border = 'solid 1px black';
        div.style.cursor = 'pointer';
        div.style.top = (y + 20) + 'px';
        div.style.left = x + 'px';
        div.style.padding = '3px';
        
        div.zIndex = '999';
        return div;
    }

    function showPreview(event) {
	var link = event.currentTarget;
        var href = link.toString();

        var div = createPreviewDiv(link, href);

        div.addEventListener('click', function(event) {
            div.parentNode.removeChild(div);
            link.addEventListener("mouseover", showPreview, true);
            }, true);
                
        link.removeEventListener("mouseover", showPreview, true);
        link.addEventListener("mouseout", function(event) {
            div.parentNode.removeChild(div);
            link.addEventListener("mouseover", showPreview, true);
            }, true);
        document.getElementsByTagName('body')[0].appendChild(div);
    }
    

    for each(var candidateLink in document.getElementsByTagName("a")) {
        if (candidateLink.href 
            && candidateLink.href == candidateLink.text
            && candidateLink.href.match(/^(http|ftp):\/\/.*\.(jpe?g|jpeg|png|gif|bmp|tiff)$/i)) {
            candidateLink.addEventListener("mouseover", showPreview, true);
        }
    }

})();
