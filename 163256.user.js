// ==UserScript==
// @name		HKGolden Remove Username Display
// @namespace	dontreplyme@dummy.com
// @description	Hide Username
// @include		http://forum*.hkgolden.com/view.aspx?*
// @include		http://forum*.hkgolden.com/topics.aspx?*
// @include		http://forum*.hkgolden.com/search.aspx?*
// @include		http://forum*.hkgolden.com/post.aspx?*
// @run-at document-start
// ==/UserScript==

function hideName()
{
   	var targetLink = document.getElementById('ctl00_ContentPlaceHolder1_lb_UserName');
    if (typeof(targetLink) != 'undefined' && targetLink != null){
        for(var j = 0; j < targetLink.getElementsByTagName('a').length; j++){
            if(targetLink.getElementsByTagName('a')[j].getAttribute('href').indexOf('ProfilePage') != -1){
                targetLink.getElementsByTagName('a')[j].innerHTML = '匿名';
            	break;
            }
        }
    }
        
    var targetParent = document.getElementById('ctl00_ContentPlaceHolder1_QuickReplyTable');
    if (typeof(targetParent) != 'undefined' && targetParent != null){
        for(var i = 0;i < targetParent.getElementsByTagName('td').length; i++)
        {
            var targetTD = targetParent.getElementsByTagName('td')[i].innerHTML;
            
            if(targetTD == '您的名字:'){
                targetParent.getElementsByTagName('td')[i+1].innerHTML = '匿名';
                break;
            }
        }
    }
    var new_s = document.getElementById('tempStyle');    
    (document.head||document.documentElement).removeChild(new_s);
}

// inject style before body created
var s = document.createElement('style');
s.setAttribute('type', 'text/css');
s.setAttribute('id', 'tempStyle');
s.innerText = '#ctl00_ContentPlaceHolder1_lb_UserName, #ctl00_ContentPlaceHolder1_QuickReplyTable { visibility : hidden; }';
(document.head||document.documentElement).appendChild(s);
document.addEventListener("DOMContentLoaded", hideName, false);