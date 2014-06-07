// ==UserScript==
// @name           StarChanger
// @namespace      my.com.douban.starchanger
// @description    change your stars Easily
// @include        http://www.douban.com/movie/mine?*collect*
// @include        http://www.douban.com/book/mine?*collect*
// @include        http://www.douban.com/music/mine?*collect*
// ==/UserScript==
if(typeof unsafeWindow.jQuery != "undefined") {
	var jQuery = unsafeWindow.jQuery;
    var $ = jQuery
}

function createUrl(id,rate){
	var url="http://www.douban.com/subject/"+id+"/?rating="+rate;
	return url;
}

$("ul[@class*=collect tlst]").each(function(i){
	var thisid=$(this).find("h3").find("a").attr("href").split("/")[2];
	$(this).find("a[@href*=decollect]").parent().parent().append("&nbsp;&nbsp;<span class=\"gact\"><a href=\"javascript:void(0)\" rel=\"nofollow\" id=\"edit_"+thisid+"\" edit=\"false\">批量修改</a></span>")
});


$("[@id*=edit_]").click(function(){
	if($(this).attr("edit")=="false"){
		$(this).css("background","#222222");
		$(this).attr("edit","true");
	}
	else{
		$(this).css("background","#ffffff");
		$(this).attr("edit","false");
	}
});

$("a[@href*=http://www.douban.com/]").parent().append("<br/><br/><br/><div align=center><table align=center width=\"60%\" bgcolor=\"#ffffff\"><tr><td align=center><form><input  type=radio name=\"editoption\" value=1 id=\"button_1\">所有评价设为1星<br/><input type=radio name=editoption value=2 id=\"button_2\">所有评价设为2星<br/><input type=radio name=editoption value=3 id=\"button_3\" checked>所有评价设为3星<br/><input type=radio name=editoption value=4 id=\"button_4\" >所有评价设为4星<br/><input type=radio name=editoption value=5 id=\"button_5\">所有评价设为5星<br/><br/><input type=radio name=editoption value=6 id=\"button_6\">所有评价增加1星<br/><input type=radio name=editoption value=7 id=\"button_7\">所有评价减少1星<br/><p><input id=\"beditall\" type=button  name=\"editoption\" value=\"全选\"><input id=\"beditsubmit\" type=button  name=\"editoption\" value=\"确定\"></form></td></tr></table></div>");

$("#beditsubmit").click(function(){
	if($("#button_"+6).attr("checked")==true||$("#button_"+7).attr("checked")==true){
		var oldStar=0;
		$("[@edit=true]").each(function(){
			var oldStarpo=$(this).parent().parent().parent().find("span[@title]");
			if(oldStarpo.attr("title")=="很差"){
				oldStar=1;
			}
			else if (oldStarpo.attr("title")=="较差"){
				oldStar=2;
			}
			else if (oldStarpo.attr("title")=="还行"){
				oldStar=3;
			}
			else if (oldStarpo.attr("title")=="推荐"){
				oldStar=4;
			}
			else if (oldStarpo.attr("title")=="力荐"){
				oldStar=5;
			}
			if($("#button_"+6).attr("checked")==true){
				if(oldStar<5){
					$.get(createUrl($(this).attr("id").split("_")[1],(oldStar+1)));
				}
			}
			else if($("#button_"+7).attr("checked")==true){
				if(oldStar>1){
					$.get(createUrl($(this).attr("id").split("_")[1],(oldStar-1)));
				}
			}
		});
	}
	else{
		for(var i=1;i<=5;i++){
			if($("#button_"+i).attr("checked")==true){
				var editRate=$("#button_"+i).attr("value");
				$("[@edit=true]").each(function(){
					$.get(createUrl($(this).attr("id").split("_")[1],editRate));
				});
				break;
			}
		}
	}
})
var count=1;
$("#beditall").click(function(){
	if(count%2==1){
		$("[@id*=edit_]").each(function(i){
			$(this).css("background","#222222");
			$(this).attr("edit","true");
			count++;
		});
	}
	else{
		$("[@id*=edit_]").each(function(i){
			$(this).css("background","#ffffff");
			$(this).attr("edit","false");
			count++;
		});
	}
});