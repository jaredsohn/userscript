// ==UserScript==
// @name           TMD forum header in spoiler
// @description    Put autmatically TMD forum header in spoiler/Pune headerul de pe forumul TMD in spoiler
// @include        *torrentsmd.*
// ==/UserScript==

if (cc = document.getElementById('forumPosts_first').getElementsByClassName('comment')[0])
    { cc.innerHTML= 
      '<div id="my_click"  style="font-weight: bold;">[+++]</div>'
    + '<div id="my_spoiler" style="display: none;">' +cc.innerHTML +'</div>'       
   
    document.getElementById('my_click').onclick = function (e)
    {    el=document.getElementById('my_spoiler');           
      if ( el.style.display=='none') {el.style.display= ''    }
      else                          {el.style.display= 'none'}
    }
    $j('div.sp-head').toggleClass('jsClickEvAttached',false); $j('div.sp-head').unbind()
    $j('div.sp-foot').toggleClass('jsClickEvAttached',false); $j('div.sp-foot').unbind()
    initSpoilers()
    }