// ==UserScript==
    // @name           RedditColorCode
    // @namespace      RedditColorCode
    // @description    Color Codes Reddits 
    // @include        <http://www.reddit.com/*>
    // ==/UserScript==

    // Color Configuration
    var subReddits = 
    [
        {sr: 'programming', color: 'red'},
        {sr: 'politics', color: 'blue'},
        {sr: 'pics', color: 'green'},
        {sr: 'science', color: 'purple'},
        {sr: 'worldnews', color: 'cyan'},
        {sr: 'funny', color: 'brown'}
    ];
    // End Color Configuration

    // Set this to 1 if you use the Compressed Reddit, 2 if you use normal
    var RedditStyle = 1;

    var hyperlinks = document.getElementsByTagName('A');

    if (hyperlinks.length > 0)
    {
        for (var i = 0; i < hyperlinks.length; i++)
        {
            if (hyperlinks[i].id.indexOf('subreddit') != -1)
            {           
                for (var k = 0; k < subReddits.length; k++)
                {
                    if (subReddits[k].sr == hyperlinks[i].innerHTML)
                    {
                        hyperlinks[i - RedditStyle].innerHTML = "<span style='color: " + subReddits[k].color + "'>" + hyperlinks[i - RedditStyle].innerHTML + "</span>";
                        hyperlinks[i].innerHTML = "<span style='color: " + subReddits[k].color + "'>" + hyperlinks[i].innerHTML + "</span>";
                    }
                }           
            }
        }
    }
