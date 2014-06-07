// ==UserScript==
// @name       722ea5aa939e731e6587fd3d713a7a8f
// @version    0.42
// @match      http://lol.qq.com/act/anniversary/music/
// @match      http://lol.qq.com/act/anniversary/painting/
// @match      http://lol.qq.com/act/anniversary/model/
// @copyright  2012+, You
// ==/UserScript==

var $$ = unsafeWindow.jQuery;
var location = unsafeWindow.location.href;
var _url = "";
var _completed = false;

var errorInfo = {
          '11' : '对不起，尚未获得抽奖资格，赶紧去投票并且分享吧',
          '12' : '对不起，您的抽奖资格不足，无法抽奖',
          '13' : '对不起，您的抽奖资格已经耗尽',
          '14' : '对不起，您的抽奖资格不足，无法抽奖',
    	  '15' : '对不起，尚未获得抽奖资格，赶紧去投票并且分享吧',
        '-107' : '活动不在开放日期',
        '-108' : '活动不在开放小时段',
        '-110' : '活动暂时关闭',
        '-113' : '扣除用户资格数量时候，发现资格为0',
        '-141' : '活动条件返回的结果没有任何值',
        '-142' : '发MP道具，MP道具已经为空，给用户回滚了资格',
        '-143' : '发MP道具，用户受到了领取次数限制',
        '-155' : '发MP的CDKEY道具，用户重复领取',
        '-156' : '发MP的CDKEY道具，CDKEY发光了',
        '-162' : '与好友互动活动，不符合七天好友标准'
};

var result = function(callbackObj){
    var G_STR = "";
    if(errorInfo[callbackObj.retCode]){
        // G_STR = errorInfo[callbackObj.retCode];
    }else{
        switch(callbackObj.iPackageId)
        {
                case '13892':
                case '13893':
                case '13894':
                case '13895':
                case '13897':
                    G_STR = "恭喜你获得" + decodeURIComponent(callbackObj.sPackageName) + "奖励，所有Q币奖励将在活动结束后30个工作日内发放到账。";
                case '13899':
                      G_STR = "恭喜你获得了9月22日上海《英雄联盟》" + decodeURIComponent(callbackObj.sPackageName) + "，请详细填写你的资料，奖品将会在活动结束后30个工作日内寄出。";
                case '13900':
                case '13901':
                    G_STR = "恭喜你获得了《英雄联盟》精美周边-" + decodeURIComponent(callbackObj.sPackageName) + "，请详细填写你的资料，奖品将会在活动结束后30个工作日内寄出。";
    
                case '13902':
                case '13903':
                    G_STR = "恭喜你获得了《英雄联盟》" + decodeURIComponent(callbackObj.sPackageName) + "，请详细填写你的资料，奖品将会在活动结束后30个工作日内寄出。";
                case '13904':
                case '13905':
                    G_STR = "恭喜你获得了" + decodeURIComponent(callbackObj.sPackageName) + "大奖！请详细填写你的资料，官方会联系您进行专稿采访，奖品将会在活动结束后30个工作日内寄出。";
                case '13906':
                case '13907':
                case '13908':
                case '13909':
                case '13910':
                    G_STR = "恭喜您获得了 " + decodeURIComponent(callbackObj.sPackageName) + "，道具将会在24小时内发放到账。请关闭客户端重新登录查看到账情况。";
                default:
                    G_STR = decodeURIComponent(callbackObj.sPackageName);
                    break;
        };
    }
    _completed = callbackObj.retCode == 13;
    return G_STR;
};

unsafeWindow.LotteryManager.GetGiftMain._getGiftFunction = function(opt, callbackFunction){
    
		var option = {
			'gameId' : '',
			'iActivityId' : '',
			'sArea' : '',
			'iSex' : '',
			'sRoleId' : '',
			'iGender' : ''
		};
		option = $$.extend(option, opt);

		{//数据检查
			if(!option.iActivityId){
				alert('抽奖方法未传入活动id');
				return;
			}
		}
		
		if(option.gameId){
			if(typeof(unsafeWindow.LotteryManager.GetGiftMain['_' + option.gameId.toUpperCase() + 'CheckParamResult']) == 'function'){
				var temp_option = unsafeWindow.LotteryManager.GetGiftMain['_' + option.gameId.toUpperCase() + 'CheckParamResult'](option);
				if(!temp_option){
					return;
				}
				temp_option.iActivityId = option.iActivityId;
				option = temp_option;
			}
		}
		option.gameId = undefined;
        _url = 'http://apps.game.qq.com/cgi-bin/lottery_MS/'+option.iActivityId+'/mileStoneMain.cgi?' + (unsafeWindow.JsonObject.serialize(option));
        $$("#coverdiv_2,#coverbg").remove();
        $$("#safevote").removeAttr("disabled");
};
var i = 0;   
(function(){
    
    var vote = function(){
        
        if(!_url){
            alert("请选择角色!");
            return;
        }
        
        $$(this).attr("disabled","disabled");
       var o = $$(this);
       window.setInterval(function(){
           var curr = new Date();
           if((curr.getHours() == 0 && curr.getMinutes() < 3)||(curr.getHours() == 23 && curr.getMinutes() == 59&&curr.getSeconds()>55)){
              //if(!_completed){
		  if(i++<300){$$(".works_vote")[(i++)%6].click();}
                  $$(".pop_cls").each(function(){this.click()});
                  check(_url);
              //}
           }else{
               o.val(curr.toLocaleTimeString());
           }
       },100);
    };
    
    
    function check(url){
        $$.ajax({
                   url:url,
                   dataType:"html",
                   success:function(html){
                       eval("var v = "+html.match(/{[^{]+({[^}]+})/)[1]+";");
					   var str = result(v);
					   if(str){
						$$("#ctnt").append("<p>"+result(v)+"</p>");
					   }
                   }
               });
    };
    
    
   $$("body").prepend("<div><div style='color:white' id=ctnt></div> <input type=button id=ll value=帐号信息 /> <input type=button id=select-role value=选角色 />&nbsp;&nbsp;<input disabled=disabled id=safevote type=button value=预约 /> </div>");
   
   $$("#safevote").click(vote);
   $$("#select-role").click(function(){
       unsafeWindow.callJsToStart();
   });
    
   $$(function(){
      setTimeout(function(){
          $$(".header").remove();
          $$("#ll").val("当前用户:"+$$("#qqnum").html());
      },2000);
   });
    
})();