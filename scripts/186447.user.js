// ==UserScript==
// @name       TiebaRemoveAD
// @namespace  http://use.i.E.your.homepage/
// @version    0.4
// @description  enter something useful
// @match      http://tieba.baidu.com/*
// @copyright  2012+, You
// ==/UserScript==
//移除贴吧广告
var byId=["game_frs_head","aside_ad","game_rank","cproshow","pb_adbanner","search_button_wrapper","game_couplet_pb_left","game_couplet_pb_right","j_ten_years"];
var byClass=["frs_game_spread","game_spread_thread","tenYearsWrap","game_list_and_rank.clearfix"];

$.each(byId,function(){
	$("#"+this).remove();
})
$.each(byClass,function(){
	$.each($("."+this),function(){
		this.remove();
	});
})
//添加功能区菜单
$(".sign_mod_bright").append("<div class='sign_mod_btn_down_link' style='text-align:center;'><div class='sign_mod_btn_down_line'></div><table style='margin:auto;text-align:left;width:90%'><tr><td width='50%'><a href='javascript:void(0);' id='aSort' target='_blank'>发帖时间排序</a></td><td><a href='javascript:void(0);' id='adefault' target='_blank'>默认排序</a></td></tr><tr><td><a href='javascript:void(0);' id='aShowAllTime' target='_blank'>显示全部发帖时间</a></td></tr></table></div>");
//帖子排序
var tieList=[];
$("#adefault").click(function(){
	$(".card_head_img").click();
})
$("#aSort").click(function(){
    //debugger;
    $.each($(".j_thread_list.clearfix:not(.thread_top)"),function(){
    	toList($(this).remove());
    });
    $.each(tieList,function(){
    	$("#thread_list").append(this[0]);
    })
    $(".app_showTime").click(function(){
        showTime(this);
    })
})
function toList(obj_li){
    addTimeBtn(obj_li);//添加显示时间按钮
	var tid=obj_li.data("field").id;
    var num=tieList.length;
    if(num<1){tieList.push(obj_li);return;}
    for(var i=0;i<num;i++){
        if(tid>$(tieList[i]).data("field").id){
            tieList.splice(i,0,obj_li);
            return;
        }
    }
    tieList.push(obj_li);
}
//显示全部帖子时间
$("#aShowAllTime").click(function(){
$.each($(".j_thread_list.clearfix:not(.thread_top)"),function(){
    	addTime($(this));
    });
})
//添加时间-同步
function addTime(obj_li){
    var tid=obj_li.data("field").id;
    var tohtml=$.ajax({async:false,type: "POST",url: "http://tieba.baidu.com/mo/q---0CC1341DA2CD2C9FD01D2D281B261175%3AFG%3D1--1-1-0----wapp_1383353374020_433/m?kz="+tid+"&is_bakan=0&lp=5010&pinf=0_2_0"});
    var vTime=$(tohtml.responseText).find(".i").find(".b")[0].innerText;
	obj_li.find(".threadlist_li_left.j_threadlist_li_left").append("<div title='发帖时间'><span style='color:red'>"+vTime+"</span></div>");
}
//添加显示时间按钮
function addTimeBtn(obj_li){
    var tid=obj_li.data("field").id;
    obj_li.find(".threadlist_li_left.j_threadlist_li_left").append("<div class='app_showTime' style='width:100%;height:100%' title='发帖时间'><span style='color:red'>点击显示</span></div>");
}
//添加时间-异步
function showTime(obj_div){
    var obj_li=$(obj_div.parentElement.parentElement.parentElement);
    var tid=obj_li.data("field").id;
	$.ajax({
        type: "POST",
        url: "http://tieba.baidu.com/mo/q---0CC1341DA2CD2C9FD01D2D281B261175%3AFG%3D1--1-1-0----wapp_1383353374020_433/m?kz="+tid+"&is_bakan=0&lp=5010&pinf=0_2_0",
        data: "",
        success: function(tohtml){
        	var vTime=$(tohtml).find(".i").find(".b")[0].innerText;
        	$(obj_div).find("span").text(vTime);
    	}
    });
}
/*//加载全部会员信息
var yeshu=0;
var nowYe=1;
var list_li=[];
var huiyuan=0;
var iID;
$(".d_main").css("width","90%");
$(".d_panel_rank").before("<did id='div_ShowAll' style='float:left;OVERFLOW-Y: auto; OVERFLOW-X:hidden;width:575px;height:776px'><input type='button' id='btn_getAll' value='获取全部会员经验值'><br/><ul id='ul_show'><ul/></div>");
$("#btn_getAll").click(function(){
	huiyuan=$($(".drl_info_txt_gray")[0]).text();
    yeshu=huiyuan/20+1;
    iID=setInterval(getAll, 1000);
});
function getAll(){
		$.ajax({
        	type: "POST",
            //async:false,
        	url: "http://tieba.baidu.com/f/like/furank?kw=%C9%E4%B5%F1zero&pn="+nowYe,
        	data: "",
        	success: function(tohtml){
                debugger;
        		var vTime=$(tohtml).find(".drl_list").find(".drl_list_item")
                for(var k=0;k<vTime.length;k++){
                    var drl_item_index=$(vTime[k]).find(".drl_item_index")[0].innerText;
                    var drl_item_name=$(vTime[k]).find(".drl_item_name")[0].innerText;
                    var drl_item_exp=$(vTime[k]).find(".drl_item_exp")[0].innerText;
                	list_li.push("<li>"+drl_item_index+"   "+drl_item_name+"   "+drl_item_exp+"</li>");
                }
                nowYe++;
                if(nowYe>=yeshu){
                    clearInterval(iID);
                    debugger;
                    list_li=list_li.sort(function(a,b){
                        var a_index=a.substring(a.indexOf(">")+1,a.indexOf(" "));
                        var b_index=b.substring(b.indexOf(">")+1,b.indexOf(" "));
                        return a_index-b_index;
                    });
                    $("#ul_show").html(list_li.join('')+"<li>一共获取到"+list_li.length+"位会员</li>");
                }
    		}
    	});
}*/
//显示所有回帖次数
