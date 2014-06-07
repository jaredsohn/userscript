// ==UserScript==
// @name       Remove bracket tags in r/outside
// @version    0.2
// @description  For those who don't care for having [attributes] enclosed [in] these [annoying] [brackets]
// @include      *.reddit.com/r/outside*
// ==/UserScript==
var test = 0;

var comments, posts, tagPattern, commentPagePattern;
tagPattern = /(\[|\])/g; //lazy as hell, just tests for '[' and ']' and replaces individually. Probably won't cause any problems but it's not great /\[.*\]/i might be better but makes replacement harder.
commentPagePattern = /http:\/\/www.reddit.com\/r\/outside\/comments\/.*/i;

function removeTags(elementList)
{
    for (i = 0; i < elementList.length; i++)
    {
        if (tagPattern.test(elementList[i].innerText)){
        	elementList[i].innerHTML = elementList[i].innerHTML.replace(tagPattern, "");
        }
    }
}

posts = document.getElementsByClassName("entry");
removeTags(posts);
if (commentPagePattern.test(document.URL))
{
	comments = document.getElementsByClassName("usertext-body");
    removeTags(comments);
}