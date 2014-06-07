// ==UserScript==
// @name       		QQ空间过滤器
// @namespace  		http://itiwll.com
// @version    		0.9
// @create         	2013-08-12
// @lastmodified   	2013-08-21
// @description  	用来过滤不想看到的好友更新 比加谁谁谁玩了某某，去除非原创内容
// @include		http://user.qzone.qq.com/*/infocenter
// @copyright  		2013, itiwll
// @require		http://www.thinkphp.cn/Public/common/jquery-1.7.2.min.js
// ==/UserScript==

(function(){
	//设置关键字
	var keys=["我和好友们都在玩","推荐试玩","每日签到","发起的投票","让自己的空间与众不同","转载"];
    //设置过滤用户
    var users=["官方Qzone"];
  	//是否过滤非原创内容true or false
	var y	=true;
    
	//var t	=setTimeout(hideAdd,2000);
  	var n=0;
    
  	//右上角 脚本运行信息
  	var infoDiv="<style>#infoDiv{position: absolute;height: 34px;line-height: 34px;padding-left:10px;}</style><div id='infoDiv'><p><span>已启用QQ空间过滤器 </span><a href='javascript:;'></a></p></div>";
  	
    //加入Dom
    $("#QZ_Toolbar_Container").prepend(infoDiv);
    
    //点击显示事件
    $("#infoDiv>p>a").click(stop);
    
    //点击 与我相关
    $("#QM_Feeds_Entry_Host").click(stop);
    
    //点击 好友动态
    $("#QM_Feeds_Entry_Friend").click(function(){
        	$("#infoDiv>p>a").text("显示");
            //点击显示事件
    		$("#infoDiv>p>a").click(stop);
            hideAdd();
            $(window).scroll(hideAdd);
    });
    
    function stop(){
    	$(".f_info").closest("li").filter(":hidden").toggle();
        $(window).unbind("scroll");
        $("#infoDiv>p>span").text("QQ空间过虑器已停用 ");
        //点击启用事件
        $("#infoDiv>p>a").text("启用").click(function(){
        	$("#infoDiv>p>a").text("显示");
            //点击显示事件
    		$("#infoDiv>p>a").click(stop);
            hideAdd();
            $(window).scroll(hideAdd);
        });
    };
    
	$(window).scroll(hideAdd);
	
	function hideAdd(){
        //清除包含关键字内容
        var f_info	=	$(".f_info");
        for (var i=0;i<keys.length;i++)
        {
			f_info.filter(":contains('"+keys[i]+"')").filter(":visible").closest("li").hide()
        }
        //清除用户
        var f_nick	=	$(".f_nick>a");
        for (var i=0;i<users.length;i++)
        {
            f_nick.filter(":contains('"+users[i]+"')").closest("li").filter(":visible").hide()
        }
        
		//清除非原创内容
		if(y)
		{
			$(".f_ct_2").closest("li").filter(":visible").hide();
		}
        var n	=	f_info.closest("li").filter(":hidden").length;
        
        //$("#infoDiv>p>span").text("已清除"+n+"条状态 ");
        $("#infoDiv>p>a").text("显示");
		//var t	=setTimeout(hideAdd,5000);
	};


})();