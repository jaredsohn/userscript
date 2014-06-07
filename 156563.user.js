// ==UserScript==
// @name        Expand zdoox links to real links
// @namespace   http://dummy
// @include     http://www.myrls.me/*/*/*/*
// @version     1
// ==/UserScript==

function xpath(query, element)
{
    return document.evaluate(query, element, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var links = xpath("//a[contains(@href, 'zdoox.com/firm/')]", document);

for (var i = 0; i < links.snapshotLength; i++)
{
    var element = links.snapshotItem(i);
    if (element == null)
        continue;
    
    var link = element.href;
    /*
    var search = link.lastIndexOf('/');
    if (search == -1 || search == link.length)
        break;
    var id = link.substring(search + 1, link.length);
    */
    
    var re = new RegExp("^http://.*zdoox\.com/firm/(\\d+)$", "gi");
    var result = re.exec(link);
    if (result == null)
    {
        GM_log("didn't link?? " + link);
        break;
    }
    
    var id = result[1];
    var pageUrl = "http://zdoox.com/firm/m1.php?id=" + id;
    
    function getResponseFunction(linkElement)
    {
        return function (response)
        {   
            if (response.readyState == 4)
            {
                var data = response.responseText;
                
                var search = data.indexOf('NewWindow');
                if (search == -1)
                {
                    GM_log('couldnt find NewWindow');
                    return;
                }
                
                var search = data.indexOf("'", search);
                if (search == -1)
                {
                    GM_log("couldnt find \"'\"");
                    return;
                }
                
                search++;
                var search2 = data.indexOf("'", search);
                
                var targetLink = data.substring(search, search2);
                
                linkElement.innerHTML = targetLink;
                linkElement.href = targetLink;
            }
        }
    }
    
    var request = {
        method: "GET",
        url: pageUrl,
        data: "",
        headers: { },
        onload: getResponseFunction(element)
    }

    GM_xmlhttpRequest(request);
}
