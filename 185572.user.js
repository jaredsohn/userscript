// ==UserScript==
// @name       tieba rich html
// @namespace  http://www.google.com
// @version    0.2
// @description  tieba rich view
// @match      *://tieba.baidu.com/*
// @copyright  2012+, Tommy
// ==/UserScript==

function translate(h){
    var sp="&lt;!--[TRH://render/html]--&gt;";
    var rep1=/&lt;/g;
    var rep2=/&gt;/g;
    var x=h.split(sp);
    var res="";
    for(var i in x){
        if(i%2==1){
            res+=x[i].replace(rep1,"<").replace(rep2,">");
        }else{
            res+=x[i];
        }
    }
    return res;
}

function translateJS(h){
    var sp="<!--[TRH://render/js]-->";
    var res="";
    var x=h.split(sp);
    for(var i in x){
        if(i%2==1){
            res+=x[i]+"\n";
        }
    }
    return res;
}
var m=document.getElementsByClassName("d_post_content");
for(var i in m){
    var f=translateJS(m[i].textContent);
    var s="<meta charset=\"utf-8\">"+translate(m[i].innerHTML)+'<script>'+f+'</script>';
    var b=new Blob([s.replace(/top/g,"window")],{ "type" : "text\/html" });
    var url = URL.createObjectURL(b);
    m[i].innerHTML="<iframe style=\"border:none;max-height:600px;min-height:200px;width:100%\" src=\""+url+"\"></iframe>";
}