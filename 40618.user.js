// ==UserScript==
// @name           QQ Mail
// @namespace      QMail
// @include        http://*.mail.qq.com/*
// ==/UserScript==

function on()
{
    this.style.backgroundColor = "#9DE0FF";
}

function off()
{
    this.style.backgroundColor = "#FFFFFF";
}

//List Page
var ListPage = /cgi-bin\/reader_list/i;
var CatalogPage = /cgi-bin\/reader_catalog_list/i
if( ListPage.test(location.href)  ||  CatalogPage.test(location.href) )
{
    var Content = document.getElementById("content");
    var ListEntry = Content.childNodes;

    for(var i = 0; i < ListEntry.length; i++)
    {
        if(ListEntry[i].className != "list_border gray" && ListEntry[i].className != "list_border") continue;
        ListEntry[i].addEventListener("mouseover", on, true);
        ListEntry[i].addEventListener("mouseout", off, true);    
    }

    Content.style.backgroundColor = '#FEDE52';
}

var MainPage = /cgi-bin\/reader_main/i;
if( MainPage.test(location.href) )
{
    var Content = document.getElementById('IndexContent1');
    var Blocks = Content.getElementsByTagName("div");
    for( var i = 0; i < Blocks.length; i++)
    {
        var b = Blocks[i];
        if( b.className == "bd" )
        {
            b.style.backgroundColor = "#FEDE52";
        }
    }   
}


