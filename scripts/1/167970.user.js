// ==UserScript==
// @name       thu-pingjiao
// @namespace  http://github.com/smilekzs
// @include    http*://zhjw.cic.tsinghua.edu.cn/pj.xspj_cpryb.do*
// @version    0.2
// ==/UserScript==
 
injectScript=function(src){
    var scriptEl;
    scriptEl = document.createElement('script');
    scriptEl.innerHTML = "(" + (src.toString()) + ")();";
    return document.head.appendChild(scriptEl);
};
 
injectScript(function(){
    var d=document;//centerFrame.cpzbframe.document;
    var x=d.getElementsByTagName('input');
    var exp=/优秀/;
    for(i in x) if(x[i].type==='radio') if(exp.exec(x[i].nextSibling.data)) x[i].checked=true;
    
    var el=document.createElement('input');
    el.type='button';
    el.value='提了个交';
    el.onclick=function(){window.sjqd();};
    
    var frm=document.getElementsByName('frm')[0];
    frm.insertBefore(el, frm.firstElementChild);
});