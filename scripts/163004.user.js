// ==UserScript==
// @name       Catálogo Expandido
// @version    0.5
// @description  Coloca o texto do OP no catálogo
// @include		http://*.brchan.org/*/catalog.html
// @copyright  2012+, You
// ==/UserScript==
(function(){
    function getMessage(ref, num, replies){
        var board=ref.split('/')[3];
        var thread=ref.split('/')[5].split('.')[0];
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.responseType="document";
        xmlhttp.open("GET", ref);
        xmlhttp.onreadystatechange=function(){if ((xmlhttp.readyState==4)&&(xmlhttp.status==200)){
            var posts=document.createElement('div');
            var postHolder=document.createElement('div');
            postHolder.style.display="none";
            posts.innerHTML="<input type='button' value='Expandir posts' onclick=this.parentNode.lastChild.style.display=''><input type='button' value='Esconder posts' onclick=this.parentNode.lastChild.style.display='none'>";
            posts.appendChild(postHolder);
            for (var i=1;i<xmlhttp.response.getElementsByClassName("thread")[0].getElementsByTagName('table').length;i++)
                postHolder.appendChild(xmlhttp.response.getElementsByClassName("thread")[0].getElementsByTagName('table')[i]);
            list.innerHTML+="<tr><td><input type='button' value='Observar Thread' onclick=addtowatchedthreads('"+thread+"','"+board+"');return false;></td><td><div>"+xmlhttp.response.getElementsByClassName("post")[0].innerHTML+posts.innerHTML+"</div></td><td><a href='"+ref+"'>"+replies+"</a></td></tr>";
        }};
        
        xmlhttp.send();
    }
    var list=document.createElement('table');
    list.border=1;
    list.innerHTML="<tr><th>#</th><th>Post</th><th>Replies</th></tr>";
    for (var n=0;n<document.getElementsByTagName('table').length;n++)
        if (document.getElementsByTagName('table')[n].border==1)
            break;
    for( var i=0;i<document.getElementsByTagName('table')[n].getElementsByTagName('a').length;i++)
        getMessage(document.getElementsByTagName('table')[n].getElementsByTagName('a')[i].href, i, document.getElementsByTagName('table')[n].getElementsByTagName('td')[i].innerText);
    document.getElementsByTagName('table')[n].parentNode.replaceChild(list,document.getElementsByTagName('table')[n]) ;
}).call(this);