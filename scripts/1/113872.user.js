// ==UserScript==
// @name thund3rb0lt for wykop.pl (ta wersja jest dla opery)
// @include http://www.wykop.pl/*
// ==/UserScript==

if (location.hostname.indexOf('www.wykop.pl') != -1)
{
    if (location.href.match(/^http:\/\/www\.wykop\.pl/))
    {
        window.opera.addEventListener('AfterEvent.load', function (e)
        {
            if (e.event.target instanceof Document)
            {
                highlightSponsoredArticles();
            }
        }, false);
    }
}

function highlightSponsoredArticles()
{
    var articles = document.getElementsByTagName('article');

    for (var i = 0; i < articles.length; ++i)
    {
        var article = articles[i]
        var links = article.getElementsByTagName('a');
        for (var j = 0; j < links.length; ++j)
        {
            var href = links[j].href;
            var isPartnerredirect = href.match(/^http:\/\/www\.wykop\.pl\/link\/partnerredirect/);
            var isAd = href.match(/^http:\/\/www\.wykop\.pl\/reklama/);
            if (isPartnerredirect || isAd)
            {
                article.style.fontStyle = "italic";
                break;
            }
        }
    }
}