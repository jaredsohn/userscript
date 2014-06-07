// ==UserScript==
// @name          The Despinator
// @namespace     http://thedespinator.com/despinator
// @description   Gets rid of "Hey there", "Despin out", and puts quote tags in if possible. Also corrects misspelt swearwords.
// @include       http://www.rllmukforum.com/*
// @include       http://www.rpsoft.co.uk/*
// @include       http://www.extranoise.co.uk/*
// ==/UserScript==

var allLinks = document.getElementsByTagName("A");

for (var i = 0; i < allLinks.length; i++)
{
    var thisLink = allLinks.item(i);
    var linkRef = thisLink.href;
    if(linkRef.indexOf('?showuser=220') != -1)
    {
        var postHeaderRow = thisLink;
        while(postHeaderRow.nodeName != "TR") 
        {
            postHeaderRow = postHeaderRow.parentNode;
        }

        var mainPostRow = postHeaderRow;
        do
        {
           mainPostRow = mainPostRow.nextSibling;
        } while (mainPostRow.nodeName != 'TR');

        var postTextCell;
        var j = 0;
        var count = 0;
        do
        {
            postTextCell = mainPostRow.childNodes.item(j);
            if(postTextCell.nodeName == 'TD') count++;
            j++;
        } while (count < 2);

        var postTextDiv;
        j = 0;
        do
        {
            postTextDiv = postTextCell.childNodes.item(j);
            j++;
        } while (postTextDiv.nodeName != 'DIV');

        var postTextHTML = postTextDiv.innerHTML;
        // replace stupid intro/outro
        postTextHTML = postTextHTML.replace("Hey there.<br><br>", "");
        postTextHTML = postTextHTML.replace("<br><br>Despin out.", "");

        // put quote tags in
        var regex = new RegExp('"((.*?)")<br><br>','g');
        var quoteExpr = "<!--quoteo--><div class='quotetop'>QUOTE</div><div class='quotemain'><!--quotec-->$2<!--QuoteEnd--></div><!--QuoteEEnd-->"
        postTextHTML = postTextHTML.replace(regex,quoteExpr);

        // spell words properly
        regex = new RegExp('fuckin([^g])','g');
        postTextHTML = postTextHTML.replace(regex,"fucking$1");

        postTextDiv.innerHTML = postTextHTML;
    }
}