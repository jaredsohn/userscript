// ==UserScript==
// @name           mail.qq.com_zone_plus
// @author        asin888@qq.com
// @include        http://*ail.qq.com/*
// @include        https://*ail.qq.com/*
// ==/UserScript==
//alert(document.URL)
if (document.URL.indexOf("/cgi-bin/reader_article_list?") > 0 )
{
    var allUids=document.getElementsByTagName("a");
    for (i=0;i<allUids.length;i++)
    {
        thisUid=allUids[i];
        if (thisUid.id.indexOf("rtTitle_")>0)
        {
            //thisUid.innerHTML = thisUid.innerHTML+thisUid.innerHTML.search(/转/)  //debug
            if (thisUid.innerHTML.search(/转/)>=0) 
            {
                thisUid.innerHTML= "<font color='#FFFFE0' onmouseover=this.style.backgroundColor='#000000' onmouseout=this.style.backgroundColor=''>" + thisUid.innerHTML  + "</font>"
            }
        }

    }
}
return
