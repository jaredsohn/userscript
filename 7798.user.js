// ==UserScript==
// @name          Frying Pan Remover
// @namespace     http://thedespinator.com/fryingpan
// @description   Gets rid of giant_frying_pan sig
// @include       http://www.rllmukforum.com/*
// @include       http://www.rpsoft.co.uk/*
// @include       http://www.extranoise.co.uk/*
// ==/UserScript==

var allLinks = document.getElementsByTagName("A");
for (var i = 0; i < allLinks.length; i++)
{
    var thisLink = allLinks.item(i);
    var linkRef = thisLink.href;
    if(linkRef.indexOf('?showuser=2084') != -1)
    {
        var postHeaderRow = thisLink.parentNode.parentNode.parentNode.parentNode;
        var mainPostRow = postHeaderRow;
        do{
           mainPostRow = mainPostRow.nextSibling;
        } while (mainPostRow.nodeName != 'TR');

        var postTextCell;
        var j = 0;
        var count = 0;
        do{
            postTextCell = mainPostRow.childNodes.item(j);
            if(postTextCell.nodeName == 'TD') count++;
            j++;
        } while (count < 2);

        var postTextDiv;
        j = 0;
        do{
            postTextDiv = postTextCell.childNodes.item(j);
            j++;
        } while (postTextDiv.nodeName != 'DIV');

        var postTextHTML = postTextDiv.innerHTML;
        if(postTextHTML.indexOf("giant_frying_pan")!=-1){
        postTextHTML = postTextHTML.replace('<br><br><br><b><i><!--coloro:teal--><span style="color: teal;"><!--/coloro-->giant_frying_pan<!--colorc--></span><!--/colorc--></i></b>', '');
        postTextDiv.innerHTML = postTextHTML;}
    }
}