// ==UserScript==
// @name       Rep Change
// @namespace  http://asdsad
// @version    0.1
// @description  enter something useful
// @include      http://*leakforums*/reputation.php*
// @require https://googledrive.com/host/0B3djEhxHeikDNkR6MGM4Q3BLenc/settings.js
// @copyright  2012+, You
// ==/UserScript==
// && (location.href.indexOf(document.getElementsByClassName("welcome")[0].getElementsByTagName("strong")[0].getElementsByTagName("a")[0].href.replace("http://www.leakforums.org/member.php?action=profile&uid=", "")) !== -1)
if((location.href.indexOf("&findlist") !== -1))
{
    var current_page = parseInt(document.getElementsByClassName("pagination_current")[0].innerText);
    try
    {
        document.getElementsByClassName("pagination_next")[0].href += "&findlist";
    }
    catch(err)
    {
        
    }
    if (current_page == 1)
    {
        var replist = "";
        var tag = document.getElementById("container").getElementsByTagName("table")[0];
        for (var i = 10; i < (tag.getElementsByTagName("tr").length - 1); i++)
        {
            var user = tag.getElementsByTagName("tr")[i].getElementsByTagName("a")[0].innerText;
            var rep = tag.getElementsByTagName("tr")[i].getElementsByTagName("a")[0].nextElementSibling.nextElementSibling.innerText.replace("Positive (", "").replace("Negative (", "").replace("Neutral (", "").replace("):", "");
            replist += user + "	" + rep + "\n";
        }
        setCookie("replist", replist,9999);
        location.href = document.getElementsByClassName("pagination_next")[0].href;
        return;
    }
    else
    {
        var replist = getCookie("replist");
        var tag = document.getElementById("container").getElementsByTagName("table")[0];
        for (var i = 10; i < (tag.getElementsByTagName("tr").length - 1); i++)
        {
            var user = tag.getElementsByTagName("tr")[i].getElementsByTagName("a")[0].innerText;
            var rep = tag.getElementsByTagName("tr")[i].getElementsByTagName("a")[0].nextElementSibling.nextElementSibling.innerText.replace("Positive (", "").replace("Negative (", "").replace("Neutral (", "").replace("):", "");
            replist += user + "	" + rep + "\n";
        }
        setCookie("replist", replist,9999);
        try
        {
            location.href = document.getElementsByClassName("pagination_next")[0].href;
        }
        catch(err)
        {
            location.href = "/reputation.php?getreplist";

        }
    }
}
else if (location.href.indexOf("/reputation.php?getreplist") !== -1)
{
    //document.write(getCookie("replist"));
    document.getElementById("container").getElementsByClassName("trow1")[0].innerText = getCookie("replist");
}