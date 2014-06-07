// ==UserScript==
// @name		HKGolden Remove Ads + AutoBookmark
// @namespace	dontreplyme@dummy.com
// @description	Remove Ads
// @include		http://forum*.hkgolden.com/view.aspx?*
// @include		http://forum*.hkgolden.com/post.aspx?*
// @run-at 		document-end
// ==/UserScript==

if(window.location.toString().indexOf("view.aspx") >= 0){
    var parent = document.getElementById('ctl00_ContentPlaceHolder1_view_form');
    
    for(var i = 0; i < parent.getElementsByTagName('div').length; i++)
    {
        var middle = parent.getElementsByTagName('div')[i];
        if(middle.getElementsByTagName('table').length != 0)
        {
            var index = 0;
            var deleteArray = new Array();
            var replaceHTML = "";
            for(var j = 0; j < middle.getElementsByTagName('*').length ; j++)
            {            
                var children = middle.getElementsByTagName('*')[j];
                if(children.parentNode != middle)
                    continue;
                if(children.innerHTML.indexOf("Google 提供的廣告") >= 0)                                   
                    continue;            
                else            			
                    replaceHTML += children.outerHTML;            
            }
            middle.innerHTML = replaceHTML; 
            break;
        }
        else
            continue;
    }
    
    var targetHREF;
    var targetA =  document.getElementsByTagName('a');
    for(var i = 0; i < targetA.length; i++)
    {
       if(targetA[i].href.indexOf("bookmarkPost") >= 0){
          targetHREF = targetA[i].href;
          break;
       }
    }
}

document.getElementById('ctl00_ContentPlaceHolder1_btn_Submit').onclick = function onclick(event)
{
    javascript:BeforePost();
    eval(targetHREF);
    alert(1);
};