// ==UserScript==
// @name           INaruto Full Chapter Loader
// @namespace      sillymokona
// @include        http://www.inaruto.net/*/*/
// ==/UserScript==

var cakeWrapper = document.getElementsByClassName("cake-wrapper");
if(cakeWrapper)
{
    cakeWrapper = cakeWrapper[0];
    cakeWrapper.parentNode.removeChild(cakeWrapper);
}

function makeXMLHttpRequest(url, callback, data)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(e) {
        if(e.target.readyState == 4 && e.target.status == 200)
        {
            callback(e.target.responseText, data);
        }
    }
    xhr.open("GET", url, true);
    xhr.send(null);
}


function getPage(responseText, data)
{
    entryContentDiv = responseText.replace(/(\n|\r)/mgi,"").match(/<div[^>]+class="entry-content".+facebooklikebutton/mig);
    imgMatches = entryContentDiv[0].match(/<img[^>]+>/g);
    for(i = 0; i < imgMatches.length; i++)
    {
        src = imgMatches[i].match(/src=["'][^"']+["']/)[0].split(/['"]/)[1];
        data[i].src = src;
    }
}

selects = document.getElementsByClassName("contentjumpddl");
if(selects && selects.length > 0)
{
    pageSelect = selects[0];

    var entryContent = document.getElementsByClassName("entry-content");
    if(entryContent && entryContent.length > 0)
    {
        entryContent = entryContent[0];
        var p = entryContent.getElementsByTagName("p");
        if(p && p.length > 0)
        {
            var container = p[0];

            while(container.hasChildNodes())
            {
                container.removeChild(container.firstChild);
            }

            for(i = 0; i < pageSelect.options.length; i++)
            {
                var pageUrl = pageSelect.options[i].value;
                var imgs = [];
                for(j = 0; j < 5; j++)
                {
                    var img = document.createElement("img");
                    container.appendChild(img);
                    imgs[j] = img;
                }
                makeXMLHttpRequest(pageUrl, getPage, imgs);
            }
        }
    }
}