// ==UserScript==
// @name      djangobook-cn-fix
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://djangobook.py3k.cn/2.0/chapter*/
// @copyright  2013, huangtc
// ==/UserScript==

var weburl="http://www.djangobook.com/en/2.0/_images/";
var imglist = document.images;

var i = imglist.length -1;
for (i;i>=0;i--)
{
    var oldurl = imglist[i].getAttribute("src");
    var filename = oldurl.match("[\\w_-\\d]+\\.png")[0];
    var url = weburl+filename;
    if (oldurl.search("sitemedia") == -1)
    {
        imglist[i].setAttribute("src",url);
    }
}