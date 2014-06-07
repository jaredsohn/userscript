// ==UserScript==
// @name	YahooMp3ShowDownloadUrl
// @namespace	http://qxo.blogspot.com
// @description	 Show Yahoo Mp3 Download Url,so you can download it directly:-)
// @include	http://music.yahoo.com.cn/search.html?*
// @include http://music.yahoo.com.cn/search?*
// ==/UserScript==
//get url
function getSelectionLink(str)
    {
    if (!str)
        {
        return null;
        }

    const selection = str;
    var links = new Array();
    const httpFixer = /^h.{2}p/i;
    const noprotFixer = /^([a-z]+[a-z\d]+\.[a-z\d\.]+\/)/i;
    const m = selection.toString().match(/\b(h.{2}p:\/\/|ftp:\/\/|mms:\/\/|rtsp:\/\/|[a-z]+[a-z\d]+\.[a-z\d\-\.]+\/)[^\s]*/gi);

    if (m)
        {
        for (var j = 0, len = m.length; j < len; j++)
            {
            var href = m[j].replace(httpFixer, "http").replace(noprotFixer, "http://$1");

            if (href)
                {
                //links[links.length]=({href: href, description: m[j]});
                return href;
                }
            }
        }

    return null;
    }

//get elment A List
var vd = document.evaluate("//*[@id='mrobj']", document, null, XPathResult.ANY_TYPE, null);

//
var arr = new Array();
{ //copy to arr
var iter = vd.iterateNext();
if (iter)
    {
    arr.push(iter);
    }

while (iter)
    {
    iter = vd.iterateNext();
    arr.push(iter);
    }

}

//
for (var i = 0; i < arr.length; i++)
    {
    iter = arr[i];

    if (!iter)
        {
        continue;
        }

    var tUrl = getSelectionLink(iter.title);

    if (tUrl)
        {
        /*
            iter.href=tUrl;
            iter.onclick="return true";
            iter.target="_self";
            */
        var aParent = iter.parentNode;

        if (aParent)
            {
            var dObj = document.createElement("A");
            dObj.href = tUrl;
            dObj.innerHTML = "D";
            dObj.title = "Download It Directly";
            aParent.appendChild(dObj);

            //aParent.insertBefore(dObj,iter.nextSibling.nextSibling);
            }
        }
    }
