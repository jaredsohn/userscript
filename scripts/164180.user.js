// ==UserScript==
// @name       Próximo Post
// @version    0.6
// @description  Prevê o número do seu post
// @include		http://*.brchan.org/*
// @copyright  2012+, You
// ==/UserScript==
(function(){
    function getMessage(){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.responseType="document";
        xmlhttp.open("GET", "http://brchan.org/"+location.pathname.split('/')[1]+"/");
        xmlhttp.onreadystatechange=function(){if ((xmlhttp.readyState==4)&&(xmlhttp.status==200)){
            var index=0;
            var Threads=xmlhttp.response.getElementsByClassName('thread');
            while (Threads[index].getElementsByClassName('extrabtns')[0].firstElementChild.tagName=="IMG") index++;
            var Thread=Threads[index].getElementsByClassName('reply');
            if (Thread.length==0)
            	var postAtual=parseInt(xmlhttp.response.getElementsByClassName('thread')[0].getElementsByClassName('post')[0].id.replace('post',''));
            else
            	var postAtual=parseInt(Thread[Thread.length-1].id.replace("reply", ""));
            document.getElementsByName("subject")[0].value=">>"+(postAtual+1);
        }};      
        xmlhttp.send();
    }
    setInterval(getMessage, 200);
}).call(this);