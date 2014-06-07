// ==UserScript==
// @name          solidot show review
// @description   显示www.solidot.org的评论
// @include       http://www.solidot.org/
// @version       0.1
// ==/UserScript==

"use strict";
//当鼠标移动的位置下面有 n 条评论时
try{(function () {
    var core={
        //TODO:
        get_review:function(){
            alert("ok");
        }
    };

    var my_div,
        my_doc,
        rs,
        my_req,
        my_url,
        i;

    my_div = document.createElement("div"),
    my_div.style.cssText = "border-style:solid; border-width:1px; background-color:#FF8; position:fixed; display:none; z-index:65535;";
    document.body.appendChild(my_div);

    rs=document.querySelectorAll(".r");
    for(i=0; i<rs.length; i++){
        rs[i].addEventListener("mouseleave",function(event) {
            my_div.style.display="none";
        });

        rs[i].addEventListener("mouseenter",function(event) {
            
            my_req = new XMLHttpRequest();

            my_url = this.querySelector('a').href;

            my_req.open("GET", my_url, true);
            my_req.onreadystatechange=function(){
                if(my_req.readyState === 4 && my_req.status === 200){
                    //取评论列表
                    my_doc = document.implementation.createHTMLDocument();
                    my_doc.documentElement.innerHTML = my_req.responseText;
                    var ru=my_doc.querySelector('.reply_ul'); 
                    
                    //准备节点
                    var child_num=my_div.children.length;
                    if(child_num>1){
                        alert("子节点数目异常");
                    }
                    if(child_num===1){
                        my_div.removeChild(my_div.children[0]);
                    }
                    
                    //追加节点并调整位置
                    my_div.appendChild(ru);
                    my_div.style.display="block";
                    var my_style=document.defaultView.getComputedStyle(my_div);
                    
                    // parseInt('xxx PX')->xxx 
                    my_div.style.left = event.clientX - 20 - parseInt(my_style.width) + "px";
                    //
                    var real_y=event.clientY - parseInt(my_style.height);
                    if(real_y<10){
                        real_y=10;
                    }
                    my_div.style.top = real_y + "px";
                    
                }
            };

            //不能使用 overrideMimeType("text/xml"),因为多数html文件都不符合xml的严格标准
            my_req.send(null);
        });
    }
})();}catch(e){
    alert("Oops:"+e);
}
