// ==UserScript==
// @name       Clearfy Search Engine Result
// @namespace  http://jokers.sinaapp.com/
// @version    0.1
// @description  enter something useful
// @include        http*://www.google.*/
// @include        http*://www.google.*/#hl=*
// @include        http*://www.google.*/search*
// @include        http*://www.google.*/webhp?hl=*
// @include  	   http*://www.baidu.com/*wd=*
// @copyright  2014+,Jokers
// @runat document-end
// ==/UserScript==

function ClearfyBaidu(){
    console.log("Clearfy For Baidu Evil");
    var results = document.getElementsByClassName("result")
    if(results.length==0)
        return 0;
    console.log("get "+results.length+" result");
    var beauty = document.createElement("div");
    beauty.className = "result-op";
    for(var i = 0; i < results.length; i++)
        beauty.innerHTML += results[i].outerHTML;
    document.body.insertBefore(beauty, document.body.children[0]);
    var origin_result = document.getElementById("wrapper");
    origin_result.style.display='none'
    return results.length;
}

function ClearfyGoogle(){
    console.log("Clearfy For Google");
    var results = document.getElementsByClassName("g")
    if(results.length==0)
        return 0;
    console.log("get "+results.length+" result");
    var beauty = document.createElement("div");
    for(var i = 0; i < results.length; i++)
        beauty.innerHTML += results[i].outerHTML;
    document.body.insertBefore(beauty, document.body.children[0]);
    
    mngb.style.display='none';
    main.style.display='none';
    return results.length;
}

console.log("your href "+location.href);
if(location.href.indexOf("http://www.baidu.com")==0)
{
    while(0==ClearfyBaidu()){
        setTimeout(ClearfyBaidu, 500);
    }
}else if(location.href.indexOf("www.google.com")!=-1){
    console.log("got google");
    while(0==ClearfyGoogle()){
        setTimeout(ClearfyGoogle, 500);
    }
}
