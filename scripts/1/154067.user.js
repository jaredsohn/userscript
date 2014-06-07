// ==UserScript==
// @name           verycdfetch
// @include        http://www.verycd.com/topics/*
// ==/UserScript==
(function(){
    var root=document.getElementById('iptcomED2K')
    if(root.firstChild.textContent.substr(0,3)!='该内容')
        return
    
       root.firstChild.textContent='正在加载，请稍候。。。'


var u='www.verycd.com/topics/'
var i=location.href.indexOf(u)
i+=u.length 

var xhr = new XMLHttpRequest(); 
xhr.onreadystatechange = function() {  
  if (xhr.readyState == 4) {
    var d=document.createElement('div')
    //d.style.display='none'
    d.innerHTML=xhr.responseText
    var iptcom=d.getElementsByClassName('iptcom') 
    
    //加载主要部分
    for(var i in iptcom)
        if(iptcom[i].id=='iptcomED2K'){ 
    root.innerHTML=iptcom[i].innerHTML
    break 
    }
    
    //加载补充部分
    var em=d.getElementsByClassName('emulemain')
    
    if(em.length>1){    
        var top=document.getElementsByClassName('emuletop')[0].outerHTML
        var target=document.getElementById('theRes') 
        target=target.nextSibling 
        target=target.nextSibling      
        var l=[]
        for(var i=1;i<em.length;i++){  
            target=target.nextSibling     
            target=target.nextSibling
            target=target.nextSibling  
            target=target.nextSibling
            l.push(target)
        } 
        for(var i in l)
        l[i].outerHTML=top+em[i].outerHTML    
    }
    //alert(
  }
}
xhr.open("GET",'http://verycdfetch.duapp.com/topics/'+location.href.substr(i), true);
xhr.send();  

})()
