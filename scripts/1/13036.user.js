// ==UserScript==
// @name          X ZXMH
// @namespace     YuJianrong@GMail.com
// @description	  将在线漫画站zxmh在线漫画转化为批量下载链接页面
// @include       http://*.zxmh*.net/html/book*
// ==/UserScript==

// Evaluate an XPath expression aExpression against a given DOM node
// or Document object (aNode), returning the results as an array
// thanks wanderingstan at morethanwarm dot mail dot com for the
// initial work.

window=unsafeWindow;

function PostProcess()
{
    var FileLinks = new Array;
    for (var elem in window.datas)
    {
        var FileLink = window.strAnsi2Unicode(window.decode64(window.pic_path)) + window.strAnsi2Unicode(window.decode64(window.datas[elem]));
        FileLinks.push(FileLink);
    }
    for (var i=0; i<FileLinks.length; ++i)
        document.writeln('<a href="' + FileLinks[i] + '"> ' + FileLinks[i] + "</a><br>");

}

PostProcess();
