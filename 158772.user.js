// ==UserScript==
// @name        Ajax
// @namespace   http://sbwtw.cn/
// @require     http://code.jquery.com/jquery-1.9.0.min.js
// @include     http://ent.ifeng.com/special/cctv-broadcast-menu.shtml
// @version     1.0
// ==/UserScript==




window.addEventListener('load',function(){
setInterval(function(){
    $.ajax({
        url:"http://survey.ifeng.com/survey/request.php?callback=voteResult&act=postsurvey&surid=2677&sur[5601][]=22116&ref=http://ent.ifeng.com/special/cctv-broadcast-menu.shtml",
        dataType:"json",
        success:function(data){
			
        },
        type:"get",
        processData:"false"
    });
//alert(/x/);
},300);
},false);
