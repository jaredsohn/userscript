// ==UserScript==
// @name       huasing auto show
// @namespace  huasing auto show
// @version    0.1
// @description  Huaxin auto show
// @match      http://bbs.huasing.org/sForum/bbs.php*
// @copyright  2014, loms126
// ==/UserScript==

unsafeWindow.timeCount = function(  ) 
{
 
    if (document.readyState != "complete")
    {
        window.setTimeout("timeCount()",500)
        return
    }
    
    
    iframe = document.getElementsByName('ifr')[0]
    subd = iframe.contentWindow.document

    while (subd.readyState != "complete")
    {
        window.setTimeout("timeCount()",500)
        return
    }
    //alert(subd.readyState)
    timeCount2()
}

unsafeWindow.timeCount2 = function(  ) 
{
    
    iframe = document.getElementsByName('ifr')[0]
    subd = iframe.contentWindow.document
    
  
    
    list = subd.querySelectorAll('a[_title]>font')
    for (i=0; i<list.length;i++)
    {
        if (list[i].childElementCount<1)
        {
            list[i].innerText = list[i].innerText + " || " + list[i].parentElement.getAttribute('_title')
        }
    }
    list = subd.querySelectorAll('a[title]>font')
    for (i=0; i<list.length;i++)
    {
        if (list[i].childElementCount<1)
        {
            list[i].innerText = list[i].innerText + " || " + list[i].parentElement.getAttribute('title')
        }
    }
}


document.querySelector('a.pl20>b').click()

window.setTimeout(function() {timeCount (); },500)
