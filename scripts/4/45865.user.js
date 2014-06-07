// ==UserScript==
// @name           AppShopper Screenshots
// @namespace      1
// @include        http://appshopper.com/*
//
// Show all the screenshots from ImageArray.
//
// 2011/07/07
// It should be compatible with Google Chrome now.
//
// ==/UserScript==
 
var MAXWIDTH = 480;
var MAXHEIGHT = 480;
function ListImgs(arr)
{
    //List All Images
    if (typeof arr != 'undefined')
    {
        var ImageNode = document.getElementById("screenshots");
        var _a = ImageNode.parentNode; //anchor node
        var td = _a.parentNode;
        var div1 = td.appendChild(document.createElement('div'));
        var div2 = div1.appendChild(document.createElement('div'));
        var _img_width;
        div1.id = 'as_wrapper';
        div2.id = 'as_container';
        _a.style.display = 'none';
        div1.style.overflow = 'scroll';
        div1.style.overflowY = 'hidden';
        div1.style.backgroundColor = 'gray';
        div1.style.border = '1px solid gray';
        div1.style.width = '800px';
        div2.style.position = 'relative';
        div2.style.whiteSpace = 'nowrap';
        div2.style.height = (MAXHEIGHT+5) + 'px';
        
        for (i=0;i<arr.length;i++) 
        { 
            n = document.createElement('img');
            n.src=arr[i];
            n.style.maxWidth = MAXWIDTH + 'px';
            n.style.maxHeight = MAXHEIGHT + 'px';
            n.style.margin = '2px';
            n.style.display = 'inline-block';
            div2.appendChild(n);
        }
        
    }
    
}

//alert('appShopper! \n' + 'unsafeWindow : ' + !!unsafeWindow);
if (/firefox/i.test(navigator.userAgent) && unsafeWindow)
    ListImgs(unsafeWindow.imgArray);
else
{
    //console.log('unsafeWindow is not allowed!');
    var imgArray;
    var scriptNode = document.querySelectorAll('script[language]');
    var scriptText = '';
    if (scriptNode[1]) scriptText = scriptNode[1].innerHTML;
        eval(scriptText);
    if (imgArray)
    {
        ListImgs(imgArray);
    }
}


