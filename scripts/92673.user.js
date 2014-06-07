// ==UserScript==
// @name           BigpictureClicker
// @namespace      ru.whitered
// @description    Click a photo in Boston.com' Bigpicture post to center it on the page
// @include        http://www.boston.com/bigpicture/*/*/*
// ==/UserScript==

var utils = {
    scrollPosition: function(y,x)
    {
        var x = x || null;
        var y = y || null;

        if(x === null && y === null)
        {
            y = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;
            x = document.body.scrollTop ? document.body.scrollLeft : document.documentElement.scrollLeft;
            return {x:x, y:y}
        }
        else
        {
            if(y === null)
            {
                y = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;
            }
            if(x === null)
            {
                x = document.body.scrollTop ? document.body.scrollLeft : document.documentElement.scrollLeft;
            }
            window.scrollTo(x,y);
        }
    },

    elementPosition: function(el)
    {
        var x = 0;
        var y = 0;

        if(el.offsetParent)
        {
            x = el.offsetLeft;
            y = el.offsetTop;
            while(el = el.offsetParent)
            {
                x += el.offsetLeft;
                y += el.offsetTop;
            }
        }
        return {x:x, y:y};
    },


    getElementsByClass: function(searchClass,node,tag)
    {
        if ( node == null ) node = document;
        if ( tag == null ) tag = '*';

        var classElements = [];
        var els = node.getElementsByTagName(tag);
        var elsLen = els.length;
        var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");

        for (var i = 0; i < elsLen; i++)
        {
	        if ( pattern.test(els[i].className) )
	        {
		        classElements.push(els[i]);
	        }
        }

        return classElements;
    }
}


function linkImages()
{
    var content = document.getElementById("content");
    var item = utils.getElementsByClass("bpImageTop", content, "div")[0];
    var items = [item].concat(utils.getElementsByClass("bpBoth", content, "div"));

    var topImage = item.getElementsByTagName("img")[0];
    var topLink = topImage.parentNode;
    topLink.parentNode.replaceChild(topImage, topLink);

    var link;
    var img;

    var handler = function()
    {
        var offset = (window.innerHeight - this.offsetHeight) / 2;
        utils.scrollPosition(utils.elementPosition(this).y - offset);
    }

    for(var i = 0; i < items.length; i++)
    {
        item = items[i];
        link = item.getElementsByTagName("a")[0];
        img = item.getElementsByTagName("img")[0];
        img.addEventListener("click", handler, false);

    }
}

linkImages();

