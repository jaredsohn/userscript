// ==UserScript==
// @name       select_text
// @namespace  https://userscripts.org/users/ttony
// @version    1.0
// @description  选取链接文本(alt或者任意字母、数字键)
// @include      http*://*/*
// @copyright  2012+, http://g.mozest.com/thread-42376-1-1
// ==/UserScript==

(function(){
var h,checked = true,down = false;
document.addEventListener('mouseover', function(e){
        var link,c='',target = e.target;
        if(target.nodeName=='A'){
                if(target.hasChildNodes){
                        for(var i=0;i<target.childNodes.length;i++){
                                if(target.childNodes[i].nodeName=='INPUT')return;
                        }
                }
                link = target;
        }
        if(target.parentNode.nodeName=='A'&&target.nodeName!='IMG'&&target.nodeName!='INPUT'){
                link = target.parentNode;
        }
        if(!link)return;
        if(checked){
                h = link.href;
                if(link.style.cssText)c = link.style.cssText;
        }
        function _click(e){
                link.removeEventListener(e.type,arguments.callee,false);
                e.preventDefault();
        }
        function _keydown(e){
                var k = parseInt(e.keyCode);
                if(k<48 && k!=18)return;
                document.removeEventListener(e.type,arguments.callee,false);
                down = true;
                link.removeAttribute('href');
                link.setAttribute('style',c + 'cursor:text!important;');
                link.addEventListener('click',_click,false);
        }
        document.addEventListener('keydown',_keydown,false);
        link.addEventListener('mouseout',function(e){
                var k = link.compareDocumentPosition(e.relatedTarget);
                if(k==20||k==0){
                        checked = false;
                }else{
                        link.removeEventListener(e.type,arguments.callee,false);
                        link.removeEventListener('click',_click,false);
                        document.removeEventListener('keydown',_keydown,false);
                        checked = true;
                        if(down){
                                down = false;
                                link.setAttribute('href',h);
                                if(c==''){
                                        link.removeAttribute('style');
                                }else{
                                        link.setAttribute('style',c);
                                }
                        }
                }
        },false);
},false);
})();