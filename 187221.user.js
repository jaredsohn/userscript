// ==UserScript==
// @name       Tieba活动
// @namespace  http://use.i.E.your.homepage/
// @version    0.2
// @description  enter something useful
// @match      http://tieba.baidu.com/*
// @copyright  2012+, You
// ==/UserScript==
//显示帖子全部回复次数
var nowUrl=location.href;
if(nowUrl.indexOf("http://tieba.baidu.com/p/")>-1){
    nowUrl=nowUrl.indexOf("?")>-1?nowUrl.substring(0,nowUrl.indexOf("?")):nowUrl;
    var Num_All=$(".l_reply_num").find(".red")[0].innerText;
    var Num_now=1;
    $("#container").before("<div id='div_showList' style='float:left;width:220px'><input type='button' id='btn_show' value='显示'/>&nbsp;总楼层数：<input type='text' id='txt_AllFloor' value='0'><br/><div id='div_showmsg'></div></div>");
    var list_li=[];
    $("#btn_show").click(function(){
        debugger;
        var showFloow='';
        var a_floor=$("#txt_AllFloor").val();
        if(a_floor>0){
            showFloow+="20.14%("+a_floor*0.2014+"="+Math.round(a_floor*0.2014)+")，50.50%("+a_floor*0.505+"="+Math.round(a_floor*0.505)+")，88.88%("+a_floor*0.8888+"="+Math.round(a_floor*0.8888)+")<br/>";
            showFloow+="14.44%("+a_floor*0.1444+"="+Math.round(a_floor*0.1444)+") 获得拉杆箱1个<br/>";
            showFloow+="55.55%("+a_floor*0.5555+"="+Math.round(a_floor*0.5555)+") T恤1个<br/>";
            showFloow+="10.29%("+a_floor*0.1029+"="+Math.round(a_floor*0.1029)+")，38.47%("+a_floor*0.3847+"="+Math.round(a_floor*0.3847)+")，56.65%("+a_floor*0.5665+"="+Math.round(a_floor*0.5665)+")，74.83%("+a_floor*0.7483+"="+Math.round(a_floor*0.7483)+")，92.01%("+a_floor*0.9201+"="+Math.round(a_floor*0.9201)+")";
        }
		//$("#div_showmsg").html("<br/>"+showFloow+"<br/>");
        //return;
        var Interval=setInterval(function(){
        	$.ajax({
        	type: "POST",
        	url: nowUrl+"?pn="+Num_now,
        	data: "",
        	success: function(tohtml){
                debugger;
        		var l_post=$(tohtml).find(".l_post");
                $.each(l_post,function(){
                	var str=$(this).data('field').author.name+" "+$(this).data('field').content.date+" "+$(this).data('field').content.floor;
                    list_li.push(str);
                })
                Num_now++;
                if(Num_now>Num_All){
                    clearInterval(Interval);
                    debugger;
                    /*list_li=list_li.sort(function(a,b){
                        var a_index=a.split(" ")[0];
                        var b_index=b.split(" ")[0];
                        return a_index-b_index;
                    });*/
                    list_li=list_li.sort();
                    $("#div_showmsg").html("<br/>"+showFloow+"<br/>"+list_li.join('<br/>')+"<br/>一共获取到"+list_li.length+"回复");
                }
    		}
    	});
            
        },2000)
    })
}
