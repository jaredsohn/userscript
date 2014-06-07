// ==UserScript==
// @name         hack daigia test
// @description	  daigia.sgame hack
// @author        manhhung1109
// @include       http://s3.daigia.sgame.vn/gamebto/*
// @exclude       http://s3.daigia.sgame.vn/gamebto/*
// ==/UserScript==

/*var SetCharacter = {'0':{"mean":lang._js_js._common._label1,"mean2":lang._js_js._common._label2,"mature":lang._js_js._common._label3,"mature2":lang._js_js._common._label4,"spree":lang._js_js._common._label5,"spree2":lang._js_js._common._label6,"gentle":lang._js_js._common._label7,"gentle2":lang._js_js._common._label8,"handsomely":lang._js_js._common._label9,"handsomely2":lang._js_js._common._label10,"finish":lang._js_js._common._label11,"finish2":lang._js_js._common._label12,"gnosis":lang._js_js._common._label13,"gnosis2":lang._js_js._common._label14,"consider":lang._js_js._common._label15,"consider2":lang._js_js._common._label16,"feel":lang._js_js._common._label17	,"feel2":lang._js_js._common._label18,"diffidence":lang._js_js._common._label19,"diffidence2":lang._js_js._common._label20}
,'1':{"mean":lang._js_js._common._label1,"mean2":lang._js_js._common._label2,"mature":lang._js_js._common._label3,"mature2":lang._js_js._common._label4,"spree":lang._js_js._common._label5,"spree2":lang._js_js._common._label6,"oomph":lang._js_js._common._label21,"oomph2":lang._js_js._common._label22,"likability":lang._js_js._common._label23,"likability2":lang._js_js._common._label24,"fact":lang._js_js._common._label25,"fact2":lang._js_js._common._label26,"peace":lang._js_js._common._label27,"peace2":lang._js_js._common._label28,"diffidence":lang._js_js._common._label19,"diffidence2":lang._js_js._common._label20,"finish":lang._js_js._common._label11,"finish2":lang._js_js._common._label12,"breeziness":lang._js_js._common._label29,"breeziness2":lang._js_js._common._label30}
};*/

var SetCharacter = {'0':{"mean":lang._js_js._common._label1,"mean2":lang._js_js._common._label2,"mature":lang._js_js._common._label3,"mature2":lang._js_js._common._label4,"spree":lang._js_js._common._label5,"spree2":lang._js_js._common._label6,"gentle":lang._js_js._common._label7,"gentle2":lang._js_js._common._label8,"handsomely":lang._js_js._common._label9,"handsomely2":lang._js_js._common._label10,"finish":lang._js_js._common._label11,"finish2":lang._js_js._common._label12,"gnosis":lang._js_js._common._label13,"gnosis2":lang._js_js._common._label14,"consider":lang._js_js._common._label15,"consider2":lang._js_js._common._label16,"feel":lang._js_js._common._label17	,"feel2":lang._js_js._common._label18,"diffidence":lang._js_js._common._label19,"diffidence2":lang._js_js._common._label20}
,'1':{"mean":lang._js_js._common._label1,"mean2":lang._js_js._common._label2,"mature":lang._js_js._common._label3,"mature2":lang._js_js._common._label4,"spree":lang._js_js._common._label5,"spree2":lang._js_js._common._label6,"oomph":lang._js_js._common._label21,"oomph2":lang._js_js._common._label22,"likability":lang._js_js._common._label23,"likability2":lang._js_js._common._label24,"fact":lang._js_js._common._label25,"fact2":lang._js_js._common._label26,"peace":lang._js_js._common._label27,"peace2":lang._js_js._common._label28,"diffidence":lang._js_js._common._label19,"diffidence2":lang._js_js._common._label20,"finish":lang._js_js._common._label11,"finish2":lang._js_js._common._label12,"breeziness":lang._js_js._common._label29,"breeziness2":lang._js_js._common._label30}
};

var SetSecretary = {'0':{"sunshine0":lang._js_js._common._label31,"handsomely0":lang._js_js._common._label32,"mean0":lang._js_js._common._label33,"sexy0":lang._js_js._common._label34,"gentle0":lang._js_js._common._label35}
,'1':{"mature":lang._js_js._common._label36,"lady":lang._js_js._common._label37,"fashion":lang._js_js._common._label38,"neutral":lang._js_js._common._label39,"smart":lang._js_js._common._label40,"pretty":lang._js_js._common._label41,"sexy":lang._js_js._common._label42,"spree":lang._js_js._common._label43,"nice":lang._js_js._common._label44,"oomph":lang._js_js._common._label46}
};
/**
浏览器事件 Browser sự kiện
*/
var CanSendAjax=true;
function bytes2BSTR(vIn){
	return vIn;
}
var WEM_OnNewMessage=0x8;//当有新的消息时 Khi một tin nhắn mới
var WEM_OnStartTask=0x20;//当一个任务正在进行时 Khi công việc được tiến hành
var WEM_OnTaskError=0x800;//错误 Lôi
var WEM_OnRefresh=0x1000;//刷新 Làm mới
var WEM_OnTaskAccept=0x2000;//刷新 Làm mới
var WEM_OnTaskAgent=0x80;//道具中使用 Việc sử dụng đạo cụ
var WEM_OnMyGoodDroped=0x10000;//删除物品时刷新 Làm mới các mục bị xoá
var WEM_OnMyGoodUsed=0x20000;//使用物品时刷新 Sử dụng bài báo để làm mới
var WEM_OnMyGoodBought=0x40000;//购买物品时刷新 Mua hàng Làm mới
var WEM_OnMyGoodPresent=0x1000000;////赠送物品时刷新 Làm mới các món quà
var WEM_OnCharity=0x2000000;////慈善捐助时刷新 Làm mới quyên góp từ thiện
var WEM_OnBackOut=0x4000000;////拆除店铺时刷新 Loại bỏ các cửa hàng làm mới
var WEM_OnVote=0x8000000;////投票时刷新 Làm mới bỏ phiếu
var WEM_OnStartPolicy=0x80000;//成功实施一次策略开始 Bắt đầu thực hiện thành công chiến lược
var WEM_OnPolicing=0x100000;//正在进行策略 Đang thực hiện chiến lược
var WEM_OnCoolPolicy=0x200000;//策略正在冷却中 Chiến lược là làm mát
var WEM_OnEndPolicy=0x400000;//策略结束 Cuối chiến lược
var WEM_OnRefreshCommon=0x800000;//为完成操作后需要返回指定页面而设的公用函数 Sau khi hoàn thành hoạt động cho trang quy định và cần phải quay trở lại chức năng thông thường thiết lập
var WEM_OnCheckcodeOk=0x20000000;//验证码验证成功 Mã xác minh thành công
var WEM_OnCheckcodeFailed=0x40000000;//验证码验证失败 Mã xác nhận thất bại
var WEM_AbortEvent=0x80000000;//终止事件 Chấm dứt sự kiện
var isEngV=true;
var isIEBrowser=false;
var isIEBrowser8=false;
var timeSetIntel=0;
var timeSetIntelWonto=0;
var wonto_begin=0;
var dailReport=null;
var dailReportStartTime=0;
var browser=navigator.userAgent;
if(browser.toLowerCase().indexOf('msie')!=-1){
	isIEBrowser=true;
}
if(browser.toLowerCase().indexOf('msie 8')!=-1){
	isIEBrowser8=true;
}

function handlerKeyboard(event){
	var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
	return keyCode;
}
/**初始化事件对象,作用  Sự kiện khởi tạo đối tượng, vai trò của */
WebEvent=function(){

	var EventQueue=new Array();
	var EventQueueIp=-1;

	var pushEvent=function(WEventArr){
		EventQueueIp++;
		EventQueue[EventQueueIp]=new Array();
		EventQueue[EventQueueIp]=WEventArr;
	}

	this.popEvent=function(){
		if(EventQueueIp<0)return false;
		var tmp=EventQueue[EventQueueIp];
		EventQueue[EventQueueIp]=null;
		EventQueueIp--;
		return tmp;
	}

	this.getEvent=function(Ip){
		if(Ip>EventQueueIp||EventQueueIp==0||Ip<0)return false;
		return EventQueue[Ip];
	}

	this.getEventListByType=function(Type){
		var j=0;
		var ret=new Array();
		for(i=0;i<=EventQueueIp;i++){
			if(EventQueue[i]['WEMessage']==Type){
				ret[j]=EventQueue[i];j++;
			}
		}
		return ret;
	}

	this.getLastEventByType=function(Type){

		for(i=EventQueueIp;i>=0;i--){
			if(EventQueue[i]['WEMessage']==Type){
				return EventQueue[i];
			}
		}
		return null;
	}

	this.getFirstEventByType=function(Type){
		for(i=0;i<=EventQueueIp;i++){
			if(EventQueue[i]['WEMessage']==Type){
				return EventQueue[i];
			}
		}
		return null;
	}



	var getajax=function(){
		try{
			ajax = new ActiveXObject("Microsoft.XMLHTTP");
		}catch(e){
			try{
				ajax = new ActiveXObject("Msxml2.XMLHTTP");
			}catch(e){
				try{
					ajax = new XMLHttpRequest();
				}catch(e){
					ajax = null;
				}
			}
		}
		return ajax;
	}

	var parseServerResult=function (s){
		arrRet=s.split("@@@|||");
		arr2=Array(6);
		if(arrRet.length!==6)return false;
		arr2["WEMessage"]=parseInt(arrRet[1]);
		arr2["Id"]=arrRet[2];
		arr2["Errno"]=arrRet[3];
		arr2["js"]=arrRet[4];
		return arr2;
	}

	var __raiseEvent=function (WEventArr,DoFunc){
		if(!WEventArr['WEMessage'])return false;
		if(typeof(DoFunc)=='function'){DoFunc(WEventArr['Id'],WEventArr['Errno'],WEventArr['Msg']);return ;};

		if(WEventArr['WEMessage']&WEM_OnNewMessage)
		IOnNewMessage(WEventArr['Id'],WEventArr['Errno'],WEventArr['Msg']);


		if(WEventArr['WEMessage']&WEM_OnStartTask)
		IOnStartTask(WEventArr['Id'],WEventArr['Errno'],WEventArr['Msg']);

		if(WEventArr['WEMessage']&WEM_OnTaskAgent)
		IOnTaskAgent(WEventArr['Id'],WEventArr['Errno'],WEventArr['Msg']);


		if(WEventArr['WEMessage']&WEM_OnRefreshCommon)
		IOnRefreshCommon(WEventArr['Id'],WEventArr['Errno'],WEventArr['Msg']);

		if(WEventArr['WEMessage']&WEM_OnTaskError)
		IOnTaskError(WEventArr['Id'],WEventArr['Errno'],WEventArr['Msg']);

		if(WEventArr['WEMessage']&WEM_OnRefresh)
		IOnRefresh(WEventArr['Id'],WEventArr['Errno'],WEventArr['Msg']);

		if(WEventArr['WEMessage']&WEM_OnTaskAccept)
		IOnTaskAccept(WEventArr['Id'],WEventArr['Errno'],WEventArr['Msg']);


		if(WEventArr['WEMessage']&WEM_OnMyGoodBought)
		IOnMyGoodBought(WEventArr['Id'],WEventArr['Errno'],WEventArr['Msg']);

		if(WEventArr['WEMessage']&WEM_OnMyGoodPresent)
		IOnMyGoodPresent(WEventArr['Id'],WEventArr['Errno'],WEventArr['Msg']);

		if(WEventArr['WEMessage']&WEM_OnMyGoodDroped)
		IOnMyGoodDroped(WEventArr['Id'],WEventArr['Errno'],WEventArr['Msg']);

		if(WEventArr['WEMessage']&WEM_OnMyGoodUsed)
		IOnMyGoodUsed(WEventArr['Id'],WEventArr['Errno'],WEventArr['Msg']);

		if(WEventArr['WEMessage']&WEM_OnCharity)
		IOnCharity(WEventArr['Id'],WEventArr['Errno'],WEventArr['Msg']);

		if(WEventArr['WEMessage']&WEM_OnBackOut)
		IOnBackOut(WEventArr['Id'],WEventArr['Errno'],WEventArr['Msg']);

		if(WEventArr['WEMessage']&WEM_OnVote)
		IOnVote(WEventArr['Id'],WEventArr['Errno'],WEventArr['Msg']);

		if(WEventArr['WEMessage']&WEM_OnStartPolicy)
		IOnStartPolicy(WEventArr['Id'],WEventArr['Errno'],WEventArr['Msg']);

		if(WEventArr['WEMessage']&WEM_OnPolicing)
		IOnPolicing(WEventArr['Id'],WEventArr['Errno'],WEventArr['Msg']);

		if(WEventArr['WEMessage']&WEM_OnCoolPolicy)
		IOnCoolPolicy(WEventArr['Id'],WEventArr['Errno'],WEventArr['Msg']);

		if(WEventArr['WEMessage']&WEM_OnEndPolicy)
		IOnEndPolicy(WEventArr['Id'],WEventArr['Errno'],WEventArr['Msg']);

		if((WEventArr['WEMessage']&WEM_AbortEvent)&&IntervalId)
		window.clearInterval(IntervalId);

	}

	this.raiseEvent=function (WEventArr,DoFunc){
		__raiseEvent(WEventArr,DoFunc);
	}

	this.execute=function(querystring,url) {
		var ajax=getajax();
		if(!ajax)return false;

		try{
			ajax.onreadystatechange = function(){

				if(ajax.readyState == 4&&ajax.status==200){
					WEventArr=parseServerResult(ajax.responseText);
					//WEventArr=parseServerResult(bytes2BSTR(ajax.responseBody));
					if(WEventArr.length==6){
						GlobalVal= '';
						var Msg=new Object();
						if(WEventArr["js"]!=''){
							try{
								eval(WEventArr["js"]);
							}catch(e){
							}
						}
						//处理当前任务 Chế biến công việc hiện tại
						if(typeof GlobalVal == 'object'){
							if(typeof GlobalVal.TaskList == 'object'){
								c.__setGlobal(GlobalVal);
							}
						}

						//处理WEM_OnNewEvent事件 Sự kiện xử lý
						WEventArr['Msg']=Msg;
						if(Msg.ExecJs){
							try{
								eval(Msg.ExecJs);
							}catch(e){

							}
						}
						pushEvent(WEventArr);
						__raiseEvent(WEventArr);
					}else{
						IOnEventError();
					}
				}
			};
		}catch(e){
			return false;
		}



		ajax.open("GET", url+"?"+querystring, true);
		ajax.setRequestHeader("Content-Type", "text/xml;charset="+pagecharset);
		ajax.send(null);
	}

}
/**
以下函数为事件响应接口函数,具体函数可以通过定义去掉第一个字符"I"的函数来实现
如自定义处理WEM_OnNewEvent事件,自定义函数  function OnNewEvent(EventId,Errno,Msg)来响应

Các chức năng sau đây cho các chức năng giao diện ứng phó sự cố, các chức năng cụ thể có thể được gỡ bỏ bằng cách định nghĩa các ký tự đầu tiên của "Tôi" chức năng để đạt được
Nếu chế biến tuỳ chỉnh WEM_OnNewEvent sự kiện, các chức năng tùy chỉnh chức năng OnNewEvent (EventID, Errno, Msg) để đáp ứng
*/



function IOnNewMessage(EventId,Errno,Msg){
	if(typeof(OnNewMessage)=="function"){
		if(OnNewMessage(EventId,Errno,Msg)) return true;
	}
}//end IOnNewMessage


function IOnStartTask(EventId,Errno,Msg){
	if(typeof(OnStartTask)=="function"){
		if(OnStartTask(EventId,Errno,Msg)) return true;
	}
}//end IOnStartTask



/*......错误处理...............*/ Lỗi xử lý /*...... ...............*/
function IOnEventError(EventId,Errno,Msg){
	if(typeof(OnEventError)=="function"){
		if(OnEventError()) return true;
	}
}//end IOnEventError
/*......ENd 错误处理...............*/ Lỗi xử lý /*...... ...............*/




//IOnTaskError
function IOnTaskError(EventId,Errno,Msg){
	if(typeof(OnTaskError)=="function"){
		if(OnTaskError(EventId,Errno,Msg)) return true;
	}
}//end IOnTaskError

//IOnRefresh
function IOnRefresh(EventId,Errno,Msg){
	if(typeof(OnRefresh)=="function"){
		if(OnRefresh(EventId,Errno,Msg)) return true;
	}
	window.setTimeout("self.location='"+ServerHost+"'",Msg.Refresh_Delay*1000);
}//end IOnRefresh

//IOnTaskAccept
function IOnTaskAccept(EventId,Errno,Msg){
	if(typeof(OnTaskAccept)=="function"){
		if(OnTaskAccept(EventId,Errno,Msg)) return true;
	}
}//end IOnTaskAccept


//IOnStartPolicy
function IOnStartPolicy(EventId,Errno,Msg){
	if(typeof(OnStartPolicy)=="function"){
		if(OnStartPolicy(EventId,Errno,Msg)) return true;
	}
}//end IOnStartPolicy

//IOnPolicing
function IOnPolicing(EventId,Errno,Msg){
	if(typeof(OnPolicing)=="function"){
		if(OnPolicing(EventId,Errno,Msg)) return true;
	}
}//end IOnPolicing

//IOnCoolPolicy
function IOnCoolPolicy(EventId,Errno,Msg){
	if(typeof(OnCoolPolicy)=="function"){
		if(OnCoolPolicy(EventId,Errno,Msg)) return true;
	}
}//end IOnCoolPolicy

//IOnEndPolicy
function IOnEndPolicy(EventId,Errno,Msg){
	if(typeof(OnEndPolicy)=="function"){
		if(OnEndPolicy(EventId,Errno,Msg)) return true;
	}
}//end IOnEndPolicy

//Charity
function IOnCharity(EventId,Errno,Msg){
	c._refUrl="c.__OnSend('ajax_action.php?action=taxis6&type=nowMonth','',c.__func_comm_list,'taxis6',1)";
	SetGlobal(Msg);
	c.__MainMsg(Msg.Description,4,Errno,Msg.Title)
}
//Charity

//BackOut
function IOnBackOut(EventId,Errno,Msg){//Load the previous shop map
	if(MovingShopId>0)MovingShopId=0;
	CanBuildShop=true;
	Load_Map(Msg.ParentId);
}
//BackOut

//Vote
function IOnVote(EventId,Errno,Msg){//Load the previous shop map
	if(Msg.Title.indexOf(lang._js_js._common._label48)!=-1)
	c.__OnSend('ajax_action.php?action=voteuserlist&sid='+Msg.Sid,'',c.__func_comm_list,'voteuserlist');
	else
	c.__OnSend('ajax_action.php?action=votekilluserlist&sid='+Msg.Sid,'',c.__func_comm_list,'votekilluserlist');
}
//Vote


function IOnMyGoodBought(EventId,Errno,Msg){
	var o = c.Confin['contents']||'', index = o['currentID'];
	if(o['buyinfo']['id'])
	(o[index]['moneytype']==0)?(o['uesrmoney'] -= o['goodList'][index]['usergold']*o['buyinfo']['count']):(o['usergolds'] -= o['goodList'][index]['usergold']*o['buyinfo']['count']);
	//c.__OnCloseWid();

	var contents =  Msg.Description;
	c._refUrl = "c.__OnSend('ajax_action.php?action=shop4','',c.__func_comm_list,'shop4');";
	c.__MainMsg(contents,4);

}//end GoodBought


//GoodPresent
function IOnMyGoodPresent(EventId,Errno,Msg){
	var o = c.Confin['contents']||'', i = o['currentID'], s="", k=0;

	if(o['mgList'][i]['buycount']>=1)
	o['mgList'][i]['buycount'] = o['mgList'][i]['buycount'] - o['sells'];

	c.Confin={name:'MenuChild',contents:o,error:0,width:480,menuaction:'MenuChild',action:'charagoods',action_prowse:null};
	c.__OpenHostRight(c.Confin);return false;
}//GoodPresent

//GoodDroped
function IOnMyGoodDroped(EventId,Errno,Msg){//new ways ok 08-07-11 p.m. lzh
	var o = c.Confin['contents']||'', i = o['currentID']['type'], j = o['currentID']['id'], s="", k=0;

	if(j == -1){
		for(k1 in o['mgList']){//ok
			k = parseInt(k1)
			if(k>=0){
				if(k>=i){
					o['mgList'][k] = o['mgList'][k+1];
				}
			}
		}
		o['mgList'][o['types']-1] = null; o['types']--;
	}else{//ok
		for(k1 in o['mgList'][i]){
			k = parseInt(k1);
			if(k>=0){
				if(k>=j){
					o['mgList'][i][k] = o['mgList'][i][k+1];
				}
			}
		}
		o['mgList'][i][o['total']-1] = null; o['mgList'][i]['total']--;
	}

	c.Confin={name:'MenuChild',contents:o,error:0,width:480,menuaction:'MenuChild',action:'charagoods',action_prowse:null};
	c.__OpenHostRight(c.Confin);return false;
}//end GoodDroped

//GoodUsed
function IOnMyGoodUsed(EventId,Errno,Msg){
	var o = c.Confin['contents']||'', i = o['currentID'], flag=i;
	if(o['mgList'][i]['buycount']>=1){
		o['mgList'][i]['buycount'] -= 1;
	}

	//drop it when useout begin
	if(o['mgList'][i]['buycount']==0){
		for(k1 in o['mgList']){
			k = parseInt(k1);
			if(k>=0){
				if(k>=i){
					o['mgList'][k] = o['mgList'][k+1];
				}
			}
		}
		o['mgList'][i] = null; o['mgList']['total']--;
		flag = -1;
	}
	//drop it when useout end


	c.Confin={name:'MenuChild',title:lang._js_js._common._label49,contents:o,error:0,width:480,menuaction:'UseTools',action:'UseTools',action_prowse:null};
	c.__OpenHostRight(c.Confin,flag);

	//function defined in useTools_ajax.js speical for the 'Tools'
	if(o['targetName'])
	setTimeout(function(){ajax_after_tooluse(o['targetName'],o['mgList'][i]['name']);},300);
}//end GoodUsed


//IOnRefreshCommon
function IOnRefreshCommon(EventId,Errno,Msg) {//为操作完成后直接返回指定页面而设 Sau khi hoàn thành các hoạt động thiết kế để trực tiếp trở lại trang quy định
	var contents;
	//c.__OnCloseWid();
	if(Msg.CanBuildShop!=null)
	CanBuildShop=Msg.CanBuildShop;
	contents = Msg.Description;
	SetGlobal(Msg);//改变全局变量 Thay đổi biến toàn cầu
	var Errno=Msg.Error!=null?Msg.Error:4;
	if(Msg.EErrorNo!=null){
		Errno=Msg.EErrorNo;
	}else{
		Errno=4;
	}
	if(Msg.refUrl!=null){
		c._refUrl = Msg.refUrl;
	}else{

		switch(Msg.Title) {
			case lang._js_js._common._label52:
			contents = Msg.Description;
			c._refUrl = "c.__OnSend('ajax_action.php?action=thing2','',c.__func_comm_list,'thing2');";
			c.__MainMsg(contents,4);
			break;
			case lang._js_js._common._label53:
			case lang._js_js._common._label54:
			if(MovingShopId>0)MovingShopId=0;
			CanBuildShop=true;
			c._refUrl = "Load_Map("+Msg.ParentId+");";
			break;
			case lang._js_js._common._label51:
			c._refUrl = "c.__OnSend('ajax_union.php?action=ApplyUserList','',c.__func_comm_list,'ApplyUserList');";
			break;
			case lang._js_js._common._label55:
			if(Msg.toolename=='vipcard' && Msg.IsUsingVip==true){
				om.$('user_isvip').innerHTML = "<span class=brightgreen>(VIP)</span>";
				om.$('user_isvip').setAttribute('hint',''+lang._js_js._common._label56+':<span class=brightgreen >'+Msg.VipStart+'</span><br/>'+lang._js_js._common._label57+':<span class=brightgreen >'+Msg.VipEnd+'</span>');
				setTimeout("new elem_alt('userinfo4', 'span','hint','10px');",200);
			}
			var contents =  Msg.Description;
			//if(Msg.speakerNums!=null)c._$('worldinfonum').innerHTML=lang._js_js._common._label60+Msg.speakerNums+lang._js_js._common._label58;
			c._refUrl = "c.__back(-1,'shop4');";//"c.__OnSend('ajax_action.php?action=shop4','',c.__func_comm_list,'shop4');";
			break;
			case lang._js_js._common._label59:
			if(Msg.ToolName==lang._js_js._common._label50){
				Config_thing1.CompanyName= Msg.Company_Name;
				$('user_companys').innerHTML = "<a href=\"javascript:void(0)\" onclick=\"om.clickchild('thing1');\" ><font color=\"#4B1A03\">"+Msg.Company_Name+Msg.IndustryLevel+" ("+Msg.Industry+")</font></a>";//+Config_thing1.Level+"("+Config_thing1.IndustryName+")
			}
			if(Msg.ToolName=='VIP'+lang._js_js._common._label61+''){

				om.$('user_isvip').innerHTML = "<span class=brightgreen>(VIP)</span>";
				om.$('user_isvip').setAttribute('hint',''+lang._js_js._common._label56+':<span class=brightgreen >'+Msg.VipStart+'</span><br/>'+lang._js_js._common._label57+':<span class=brightgreen >'+Msg.VipEnd+'</span>');
				setTimeout("new elem_alt('userinfo4', 'span','hint','10px');",200);
			}
			var contents =  Msg.Description;
			if (c._page){
				c._refUrl = "c.__OnSend('ajax_action.php?action=charagoods&page='+c._page,'',c.__func_comm_list,'charagoods');";
			}else{
				c._refUrl = "c.__OnSend('ajax_action.php?action=charagoods','',c.__func_comm_list,'charagoods');";
			}


			break;
			default:
			break;
		}
	}
	if(contents){
		if(Errno==3){
			c.__MainMsg(contents,3,3);
		}else{
			if(contents)c.__MainMsg(contents,Errno);
		}
	}else if(c._refUrl){
		eval(c._refUrl);
	}

}
//IOnRefreshCommon
/*WebEvent*/
/*useTools_ajax*/
var toolsreq, toolsreq1, toolsreq2, toolsreq3, toolsreq4, toolsreq5, toolsreqx, toolsreqy, toolsreqz,  _list_, pobj, oldconame;

function _num_format(s){
	s+='';
	if(/[^0-9.-]/.test(s)) return "invalid value";
	s=s.replace(/^(d*)$/,"$1.");
	s=(s+"00").replace(/(d*.dd)d*/,"$1");
	s=s.replace(".",",");
	var re=/(d)(d...{3},)/;
	while(re.test(s))
	s=s.replace(re,"$1,$2");
	s=s.replace(/,(dd)$/,".$1");
	return s.replace(/^./,"0.")
}
function create_tooluse_toolsreq(){
	var request;

	try{
		request = new XMLHttptoolsreq();
	}catch(trymicrosoft){
		try{
			request = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(othermicrosoft){
			try{
				request = new ActiveXObject("Microsoft.XMLHTTP");
			}catch(failed){
				requset = false;
			}
		}
	}

	if(!request){alert("Error initializing XMLHttptoolsreq!");return false;}
	else{return request;}
}

function getList(type,CurrentPage,tt,pagesize,height){
	//var tmptoolsreq = create_tooluse_toolsreq();
	var tmptoolsreq = c.__int();
	height = height || 90;
	url  = "ajax_toolsuse.php?action="+type+"&pagesize="+pagesize+"&page="+CurrentPage+"&height="+height+"&Type="+tt+"&tthetime="+thetime;
	tmptoolsreq.open("POST",url,true);

	tmptoolsreq.onreadystatechange = function (){
		if(tmptoolsreq.readyState==1){
			making();return ;
		}
		if(tmptoolsreq.readyState == 4){
			if(tmptoolsreq.status == 200){
				var msg = tmptoolsreq.responseText;
				//var msg= bytes2BSTR(tmptoolsreq.responseBody);
				//alert(msg);
				switch(type){
					case "list_e":
					setTimeout(function(){getVirtualUserList(msg)},300);
					break;
					case "list_s":
					setTimeout(function(){getShopList(msg)},300);
					break;
					case "list_f":
					setTimeout(function(){getAllFriendList(msg)},300);
					break;
					case "list_all_s":
					setTimeout(function(){getAllShopList(msg)},300);
					break;
					case "list_horn":
					eval(msg);
					break;
					default:
					getDefualtList(msg);
					break;
				}
				maked();
			}else{
				alert(lang._js_js._common._label62 + tmptoolsreq.status);
			}
		}
	}
	tmptoolsreq.send("");
}

function ajax_check_co_name(name,flag){

	toolsreq2 = c.__int();
    if(pagecharset=='utf-8'){
		url  = encodeURI("ajax_toolsuse.php?action="+flag+"&newname="+name+"&tthetime="+thetime);
	}else{
		url  = "ajax_toolsuse.php?action="+flag+"&newname="+name+"&tthetime="+thetime;
	}
	toolsreq2.open("POST",url,true);

	toolsreq2.onreadystatechange = function (){
		if(toolsreq2.readyState==1){
			making();return ;
		}
		if(toolsreq2.readyState == 4){
			if(toolsreq2.status == 200){
				var msg = toolsreq2.responseText;
				eval(msg);
				maked();
			}else{
				alert(lang._js_js._common._label63 + toolsreq2.status);
			}
		}
	}

	toolsreq2.send("");
}

//检查设置按键 Kiểm tra các thiết lập nút
function ajax_check_name(name,flag,inname){

	toolsreq2 = c.__int();
	 if(pagecharset=='utf-8'){
		 url  = encodeURI("ajax_toolsuse.php?action="+flag+"&newname="+name+"&inname="+inname+"&tthetime="+thetime);
	 }else{
		 url  = "ajax_toolsuse.php?action="+flag+"&newname="+name+"&inname="+inname+"&tthetime="+thetime;
	 }
	toolsreq2.open("POST",url,true);
	toolsreq2.onreadystatechange = function (){
		if(toolsreq2.readyState==1){
			making();return ;
		}
		if(toolsreq2.readyState == 4){
			if(toolsreq2.status == 200){
				var msg = toolsreq2.responseText;
				//var msg= bytes2BSTR(toolsreq2.responseBody);
				//alert(msg);
				eval(msg);
				//maked();
			}else{
				alert(lang._js_js._common._label63 + toolsreq2.status);
			}
		}
	}
	toolsreq2.send("");
}


//检查设置按键 Kiểm tra các thiết lập nút
function ajax_check_name_search(name,stype,flag,inname){

	//toolsreq2 = create_tooluse_toolsreq();
	toolsreq2 = c.__int();

	 if(pagecharset=='utf-8'){
		url  = encodeURI("ajax_toolsuse.php?action="+flag+"&SearchType="+stype+"&newname="+name+"&inname="+inname+"&tthetime="+thetime);
	 }else{
		url  = "ajax_toolsuse.php?action="+flag+"&SearchType="+stype+"&newname="+name+"&inname="+inname+"&tthetime="+thetime;
	 }

	toolsreq2.open("POST",url,true);
	toolsreq2.onreadystatechange = function (){
		if(toolsreq2.readyState==1){
			making();
			return;
		}
		if(toolsreq2.readyState == 4){
			if(toolsreq2.status == 200){
				var msg = toolsreq2.responseText;
				//var msg= bytes2BSTR(toolsreq2.responseBody);
				eval(msg);
				//maked();
			}else{
				alert(lang._js_js._common._label63+ toolsreq2.status);
			}
		}
	}
	toolsreq2.send("");
}

function check_v_name(objname,schtype,v_name){
	var name = document.getElementById(objname).value;
	var stype = document.getElementById(schtype)&&document.getElementById(schtype).value?document.getElementById(schtype).value:schtype;
	var v_name=v_name?v_name:'v_name';
	if(name==""){
		document.getElementById("msgspan").innerHTML = '';
		document.getElementById("u_bt").disabled= true;
		document.getElementById("u_bt").style.color = "#ACACAC";
	}
	else{
		document.getElementById("msgspan").innerHTML = "";
		ajax_check_name_search(name,stype,v_name,objname);
	}
}

function check_shop_name(objname){
	var name = $(objname).value;
	if(name==""){
		$("msgspan").innerHTML = '';
		$("u_bt1").disabled= true;
		$("u_bt1").style.color = "#ACACAC";
	}
	else{
		$("msgspan").innerHTML = "";
		ajax_check_name(name,'checkshop',objname);
	}
}


function ajax_init_all(msg){

	//toolsreq3 = create_tooluse_toolsreq();
	toolsreq3 = c.__int();
	url  = "ajax_toolsuse.php?action="+msg+"&tthetime="+thetime;
	toolsreq3.open("POST",url,true);

	toolsreq3.onreadystatechange = function (){
		if(toolsreq3.readyState==1){
			making();return ;
		}
		if(toolsreq3.readyState == 4){
			if(toolsreq3.status == 200){
				var msg = toolsreq3.responseText;
				//var msg= bytes2BSTR(toolsreq3.responseBody);
				//alert(msg);
				eval(msg);
				maked();
			}else{
				alert(lang._js_js._common._label64 + toolsreq3.status);
			}
		}
	}

	toolsreq3.send("");
}

function ajax_show_menu(sid){
	//toolsreq5 = create_tooluse_toolsreq();
	toolsreq5 = c.__int();
	url  = "ajax_toolsuse.php?action=show_menu&sid="+sid+"&tthetime="+thetime;
	toolsreq5.open("POST",url,true);

	toolsreq5.onreadystatechange = function (){
		if(toolsreq5.readyState==1){
			making();return ;
		}
		if(toolsreq5.readyState == 4){
			if(toolsreq5.status == 200){
				var msg = toolsreq5.responseText;
				//var msg= bytes2BSTR(toolsreq5.responseBody);
				//alert(msg);
				eval(msg);
				maked();
			}else{
				alert(lang._js_js._common._label65 + toolsreqx.status);
			}
		}
	}

	toolsreq5.send("");
}

function ajax_after_tooluse(targetname,toolname){
	//toolsreqx = create_tooluse_toolsreq();
	toolsreqx = c.__int();
	url  = "ajax_toolsuse.php?action=after_tool_use&targetname="+targetname+"&toolname="+toolname+"&tthetime="+thetime;
	toolsreqx.open("POST",url,true);

	toolsreqx.onreadystatechange = function (){
		if(toolsreqx.readyState==1){
			making();return ;
		}
		if(toolsreqx.readyState == 4){
			if(toolsreqx.status == 200){
				var msg = toolsreqx.responseText;
				//var msg= bytes2BSTR(toolsreqx.responseBody);
				eval(msg);
				maked();
			}else{
				alert(lang._js_js._common._label65 + toolsreqx.status);
			}
		}
	}

	toolsreqx.send("");
}

function  horn_msg(msg){
	//toolsreqy = create_tooluse_toolsreq();
	toolsreqy = c.__int();
	url  = "ajax_toolsuse.php?action="+msg+"&tthetime="+thetime;
	toolsreqy.open("POST",url,true);
	toolsreqy.onreadystatechange = function (){
		if(toolsreqy.readyState == 4){
			if(toolsreqy.status == 200){
				var msg = toolsreqy.responseText;
				//var msg= bytes2BSTR(toolsreqy.responseBody);
				//alert(msg);
				eval(msg);
			}else{
				alert(lang._js_js._common._label65 + toolsreqy.status);
			}
		}
	}

	toolsreqy.send("");
}


function chk_badword_general(msg, inputname, btname, msgname) {//chk_badword_general
	/*
	var states = $(btname).disabled;
	$(btname).disabled = true;
	toolsreqz = create_tooluse_toolsreq();
	url  = "ajax_toolsuse.php?action=chkgeralbadwords&input="+inputname+"&btname="+btname+"&msgname="+msgname+"&contents="+msg;
	toolsreqz.open("POST",url,true);

	toolsreqz.onreadystatechange = function (){
	if(toolsreqz.readyState == 4){
	if(toolsreqz.status == 200){
	var msg = toolsreqz.responseText;
	//alert(msg);
	eval(msg);
	setTimeout(function(){$(btname).disabled=states;},1000);
	}else{
	alert("AJAX toolsreqx 的状态是 " + toolsreqy.status);
	}
	}
	}
	toolsreqz.send("");
	*/
}
/****************************************************************************************/

function getVirtualUserList(msg){
	eval(msg);
}

function getShopList(msg){
	var ia = 0, s = "";
	eval(msg); if(_list_) pobj = _list_;
	if(pobj){
		for(ia in pobj){
			s += "<option value="+pobj[ia]['Id']+">"+pobj[ia]['ShopName']+"</option>";
		}
		$("myemps").innerHTML = "<span class='selectOut'><span class='selectIn'><select id=myemp class=inputT onchange=\"setShop(this)\">"+s+"</select></span></span>";
		$("empinfo").innerHTML = getShopInfo($("myemp").options[0].value);
		$("xurl").value = "&Shop_Id="+pobj[$("myemp").options[0].value]['Id'];
	}else{
		$("myemps").innerHTML = "<span class='selectOut'><span class='selectIn'><select id=myemp class=inputT><option>"+lang._js_js._common._label66+"</option></select></span></span>";
		$("use_tool_bt").disabled = true;
		$("use_tool_bt").style.color = "#ACACAC";
	}
}

function getAllShopList(msg){
	eval(msg);
}

function getAllFriendList(msg){
	eval(msg);
}


function check_co_name(){
	var name = $("new_co_name").value;
	if(name==""){
		$("msgspan").innerHTML = "<font color=red weight=bold size=3px>X</font>&nbsp;&nbsp;<font color=red>"+lang._js_js._common._label68+"</font>";
	}
	else{
		$("msgspan").innerHTML = "";
		ajax_check_co_name(name,'v_co_name');
	}
}
function check_cofc_name(){
	var name = $("new_cofc_name").value;
	if(name==""){
		$("msgspan").innerHTML = "<font color=red weight=bold size=3px>X</font>&nbsp;&nbsp;<font color=red>"+lang._js_js._common._label69+"</font>";
	}
	else{
		$("msgspan").innerHTML = "";
		ajax_check_co_name(name,'v_cofc_name');
	}
}

function check_user_name(){
	var name = $("gettername").value;
	if(name==""){
		return false;
	}
	else{
		$("msgspan").innerHTML = "";
		ajax_check_co_name(name,'v_user_name');
	}
}

function check_spy_name(){
	var name = $("spyname").value;
	if(name==""){
		$("msgspan").innerHTML = "<font color=red weight=bold size=3px>X</font><font color=red>"+lang._js_js._common._label70+"</font>";
	}
	else{
		$("msgspan").innerHTML = "";
		ajax_check_co_name(name,'v_spy_name');
	}
}
function check_blackhand_co_name(){
	var name = $("attack_co_name").value;
	if(name==""){
		$("msgspan").innerHTML = "<font color=red weight=bold size=3px>X</font>&nbsp;&nbsp;<font color=red>"+lang._js_js._common._label68+"</font>";
	}
	else{
		$("msgspan").innerHTML = "";
		ajax_check_co_name(name,'v_blackhand_co_name');
	}
}

function making(){
	if(obj = $("myemps")){
		obj.innerHTML = "<span class='selectOut'><span class='selectIn'><select id=myemp class=inputT><option>"+lang._js_js._common._label71+"</option></select></span></span>";
		obj.disabled = true;
		obj.style.color = "#ACACAC";
	}
	if(obj = $('waitspan')){
		obj.innerHTML = "<font color=#00ff00 weight=bold>"+lang._js_js._common._label67+"</font>"
	}
}


function maked(){
	if($("myemps"))
	$("myemps").disabled = false;
	if(obj = $('waitspan')){
		obj.innerHTML = "";
	}
}

function setVuser(ox){
	var obj = $("empinfo"); obj.innerHTML = "<font color=red>士气:</font>&nbsp;<font color=#00ff00>"+pobj[ox.value]['Spirit']+"</font>";
	$("xurl").value = "&Virtual_Id="+$("myemp").value;
}

function setShop(ox){
	$("empinfo").innerHTML = getShopInfo(ox.value);
	$("xurl").value = "&Shop_Id="+$("myemp").value;
}

function getShopInfo(shopid){
	return ""+lang._js_js._common._label82+":"+pobj[shopid]['ShopName']+","+lang._js_js._common._label76+":"+pobj[shopid]['ShopTypeName']+","+lang._js_js._common._label77+":"+pobj[shopid]['DateSTR']+","+lang._js_js._common._label78+":"+pobj[shopid]['Address']+","+lang._js_js._common._label79+":"+pobj[shopid]['CompanyName']+","+lang._js_js._common._label80+":"+pobj[shopid]['BusinessType']+","+lang._js_js._common._label81+":"+pobj[shopid]['TodayIncome']+lang._js_js._common._label86;
	$("xurl").value = "&Shop_Id="+pobj[shopid]['Id'];
}

function setProtGolds(val){
	if(val!=-1){
		$('protgolds').innerHTML=val;
		$("xurl").value = "&gragon=" + val;
	}
}

function goback(){
	setTimeout(
	function(){eval("c.Confin['contents']['CompanyName']='"+oldconame+"';");
	location.href="javascript:c.__OpenHostRight(c.Confin);return false;";}
	,300
	);
}

function disable_it(name){
	$(name).disabled = true;
	$(name).style.color = "#ACACAC";
}

function update_user_msg(){//use eval to finished

}

function show_hide_items(chk){
	if(chk.flag==0){
		$("rose"+chk.id).style.display="";
		chk.flag = 1;
	}
	else{
		$("rose"+chk.id).style.display="none";
		chk.flag = 0;
	}
}

function checkpdl(obj1,num,start,vn){
	for(i=start; i<=num; i++){
		if($("as_"+i)){
			if(obj1.checked){
				if($("as_"+i)!= obj1){
					$("as_"+i).checked=false;
					$("as_"+i).disabled=true;
					$("as_"+i).style.color = "#ACACAC";
				}else{
					$("xurl").value = "&"+vn+"="+obj1.value;
				}
			}else{
				$("as_"+i).checked=false; $("as_"+i).disabled=false;
				$("xurl").value="";
			}
		}
	}
}

function checkhornmsg(){
	if($('myhorn').value==""){
		$('hornmsg').innerHTML = "<b><font color=red>"+lang._js_js._common._label74+"</font>";
		$("use_tool_bt").disabled=true;
		$("use_tool_bt").style.color = "#ACACAC";
	}else{
		ajax_init_all("chkBads&contents="+$('myhorn').value);//bardWord= ChkBadWords($username,$_SYSCFG['UserRegLeach']);){
	}
}

/*=========Temp For Invest=============*/
function ajax_chk_taskstate(taskId){
	//toolsreq4 = create_tooluse_toolsreq();
	toolsreq4 = c.__int();

	url  = "ajax_toolsuse.php?action=chkTask&tkId="+taskId+"&tthetime="+thetime;
	toolsreq4.open("POST",url,true);

	toolsreq4.onreadystatechange = function (){
		if(toolsreq4.readyState==1){
			making();return ;
		}
		if(toolsreq4.readyState == 4){
			if(toolsreq4.status == 200){
				var msg = toolsreq4.responseText;
				//var msg= bytes2BSTR(toolsreq4.responseBody);
				//alert(msg);
				eval(msg);
				maked();
			}else{
				alert("AJAX toolsreq4"+lang._js_js._common._label75+"" + toolsreq4.status);
			}
		}
	}
	toolsreq4.send("");
}

/*==========Temp for systools===========*/
function setBuyCost(single,payItem,cash){

	var total, obj=null, days=0;
	if(isNaN(parseInt($('nums').value)))
	return false;

	if(parseInt($('nums').value)>99999){
		$('nums').value = "";
		$("buyerr").innerHTML = "<font color=red><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+lang._js_js._common._label72+"9999"+lang._js_js._common._label83+"1"+lang._js_js._common._label87+"</font>";
		return false;
	}
	if(obj=document.getElementsByName('radio_ml')){
		for(i=0; i<obj.length; i++){
			if(obj[i].checked==true)
			days = obj[i].value;
		}
	}
	$('days').value = ((days>=1)?days:0);
	total =(parseInt(single)>0)?parseInt(single)*parseInt($('nums').value)*((days>=1)?days:1):0;

	var errmsg = "<font color=red><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+lang._js_js._common._label73+"</font>";
	$('toolCost').innerHTML = total;

	if(total > cash){
		var cashmsg = "<b>"+lang._js_js._common._label84+"<font color=yellow>"+(cash)+"</font>"+payItem+","+lang._js_js._common._label85+"<font color=yellow>"+(total-cash)+"</font>"+payItem+lang._js_js._common._label86;
		$("buyerr").innerHTML=errmsg+ cashmsg;
	}
	else{
		$("buyerr").innerHTML = "";
	}
}
function setBuyCost1(payItem, cash) {//only for vipcard
	var errmsg, total, days=0, cost=0;

	if(isNaN(parseInt($('nums').value)))
	return false;

	if(obj=document.getElementsByName('radio_vip')){
		for(i=0; i<obj.length; i++){
			if(obj[i].checked==true)
			cost = obj[i].value;
		}
	}

	if(parseInt($('nums').value)>999){
		$('nums').value = "";
		return false;
	}

	days = (parseInt(cost)==120)?14:28;
	total = parseInt(cost)*$('nums').value;
	$('toolCost').innerHTML = total;
	$('days').value = days;

	/*if(cash < total){
	$("div_buy_OK").innerHTML = "<span class=\'btn_normal\'><button onclick=\"c.__OnSend('ajax_action.php?action=shop2','',c.__func_comm_list,'shop2')\">充值</button></span><span class=\'btn_normal\'><button width=5% onclick=\"c.__OpenHostRight(c.Confin)\">取消</button></span>&nbsp;";
	}
	else{
	$("div_buy_OK").innerHTML = "<span class=\'btn_normal\'><button type=button name=bt_buy_OK onclick=\"c.BuyToolsConf(this.form.nums.value)\"   >Xác định</button></span><span class=\'btn_normal\'><button width=5% onclick=\"c.__OpenHostRight(c.Confin)\">Huỷ</button></span>&nbsp;";
	}*/
}
/*==========Temp for shop2===========*/
function getRadioValue(name){
	var obj = document.getElementsByName(name);
	for(i=0; i<obj.length; i++){
		if(obj[i].checked)
		return obj[i].value;
	}
}

/*==========Temp for setup3===========*/
function SetRadiosValue(obj){
	var tar=$(obj.name+"_value");
	tar.value = obj.value;
}

/*==========Temp for policy===========*/
function IsInPolicyUse(pid, parr){
	for(i in parr){
		if(parseInt(parr[i].Id)==parseInt(pid))
		return true;
	}
	return false;
}

/*==========Temp for email===========*/
function setEmailer_obj(obj){
	if(obj.value!=-1){
		if($('incept').value.indexOf(obj.value)>=0){
			return false;
		}else{
			if($('incept').value!="")
			$('incept').value += "," + obj.value;
			else
			$('incept').value += obj.value;
		}
	}
}

function setEmailer(val){
	if(val!=-1){
		if($('incept').value.indexOf(val)>=0){
			return false;
		}else{
			if($('incept').value!="")
			$('incept').value += "," + val;
			else
			$('incept').value += val;
		}
	}
}

/*==========Temp for exchangeActive===========*/


/*==========Temp for dailyTask===========*/

function checkcando(index,state){
	var daily_array = new Array(lang._js_js._common._label92,lang._js_js._common._label91,lang._js_js._common._label90);
	if(state==1){
		c.__OpenHostRight(c.Confin,index);
	}
	else if(state==2){
		alert(lang._js_js._common._label89);
	}else if(state==0){
		alert(""+lang._js_js._common._label88+"->"+lang._js_js._common._label93+"["+daily_array[index]+"]"+lang._js_js._common._label94+"");
	}
}

/*==========Temp for horn's lenght===========*/
function checklength(obj, maxlength){
	if(obj.value.length >= maxlength)
	obj.value = obj.value.substr(0,maxlength);
}

/*==========Temp for c._CityAddress===========*/
function SetAddrString(RegionType,RegionName,AreaMapId,AreaName){
	var cityid = (parseInt(RegionType)+1);
	var getId = (cityid == 1 ? 11 :(cityid == 2? 12 : 13));
	if(parseInt(RegionType)==29) {
		getId=parseInt(RegionType);
	}
	c._CityAddress = "<a href=\"javascript:void(0)\"  onclick=\"Load_Map("+getId+");map_map_url();\">"+RegionName+"</a> → <a href=\"javascript:void(0)\"    onclick=\"map_map_url();c.__OnSend('ajax_action.php?action=street&TypeId="+(parseInt(RegionType))+"&MapId="+AreaMapId+"','',c.__func_comm_list,'street')\">"+AreaName+"</a> →";
}
function map_map_url(){
	if (c._$('map_map'))c._$('map_map').innerHTML = '<span onclick="Load_Map(1)" style="width:100%;height:50px;cursor:pointer;position:relative;"></span>';
	//if (c._$('map_map'))c._$('map_map').innerHTML = '<span onclick="c.__OnSend(\'ajax_action.php?action=logonreward\',\'\',c.__func_comm_list,\'logonreward\');" style="width:100%;height:50px;cursor:pointer;position:relative;"></span>';

	om.RightMap();//换右边菜单背景 Đối với quyền của hình nền menu
}
/*==========Temp for ComercialLeagueTree===========*/
function hide_show_Tree(obj){
	event.cancelBubble = true;
	if(obj.value==1){
		closeTree(obj,0);
		obj.value=2;
	}else{
		expandTree(obj,0);
		obj.value=1;
	}
}


function closeTree(obj,val){
	var O = obj.getElementsByTagName('li');
	event.cancelBubble = true;
	for(i in O){
		if(O[i]['id']&&(O[i]['id']!=obj.id)&&(O[i]['id']!='t_0')){
			O[i].style.display = 'none';
			O[i].value = 2;
		}
	}
}

function expandTree(obj,val){
	var O = obj.getElementsByTagName('li');
	event.cancelBubble = true;
	for(i in O){
		if(O[i]['id']&&(O[i]['id']!=obj.id)&&(O[i]['id']!='t_0')){
			O[i].style.display = 'block';
			O[i].value = 1;
		}
	}
}

function show_msg(obj){
	event.cancelBubble = true;
	var O = $("msg_SH");
	var x=document.body.scrollLeft+event.clientX;
	var y=document.body.scrollTop+event.clientY;
	O.style.left = x;  O.style.top = y;
	ajax_show_menu(parseInt(obj.id.replace("t_","")));
}

function close_menu(){
	$("msg_SH").innerHTML = "";
	$("msg_SH").style.display = 'none';
}

function checkvote(obj1,start,nums,toval){
	//var toval = "'"+toval+"'";
	for(i=start; i<=nums; i++){
		if($("as_"+i)){
			if(obj1.checked){
				if($("as_"+i)!= obj1){
					$("as_"+i).checked=false;
					$("as_"+i).disabled=true;
					$("as_"+i).style.color = "#ACACAC";
				}else{
					//val = obj1.id.split("_"); val = parseInt(val[1]);
					$(toval).value = obj1.value;
					$('agreebt').disabled=false;$('againstbt').disabled=false;
				}
			}else{
				$("as_"+i).checked=false; $("as_"+i).disabled=false;
				$('agreebt').disabled=false;
				$('againstbt').disabled=true;
				$('againstbt').style.color = "#ACACAC";
				$(toval).value=0;
			}
		}
	}
	//alert($(toval).value);
}


/*==========Temp for ShopSell===========*/
function showSellVal(showspan, vname, obj, sellval){
	var tmpval = ((parseInt(obj.value)+100)/100)*parseInt(sellval);
	$(vname).value = tmpval;
	$(showspan).innerHTML = cc(String(tmpval))+lang._comm._gMoney;
}

/*==========Temp for ShopMove===========*/
function ShopStartMove(shopId){
	MovingShopId = parseInt(shopId);
	Load_Map(1);
}

function MoveShop(MovingShopId,ToMapId){
	c.__OnSend('ajax_action.php?action=MoveShop&MoveShopId='+MovingShopId+"&AreaId="+currentAreaId+"&StreetIndex="+currentMapIndex+"&ToMapId="+ToMapId,'',c.__func_comm_list,'MoveShop','','MoveShop');//
	om.RightMap()
}
/*useTools*/
/*hint*/
var MouseHint;
function elem_alt(blockName, tagName, alt, pos, width){
	(typeof blockName == 'string') ? this.block = document.getElementById(blockName) : this.block = blockName;
	if (!this.block) return;
	this.block.name = blockName;
	this.elems = this.block.getElementsByTagName(tagName);
	this.alt = alt;
	this.pos = parseInt(pos);

	if (typeof width == 'undefined') {
		this.width = '250px';
	} else {
		this.width = width;
	}
	this.load();
}
elem_alt.prototype = {
	load: function() {
		if (!this.div) {
			var div = document.createElement('div');
			div.setAttribute('style', 'border:1px solid #060; background-color:red;width: ' + this.width + '; padding:50px; font-family:verdana; font-size:12px; position:absolute; filter:alpha(opacity=90);-moz-opacity: 0.9;opacity:0.9; visibility:hidden;');
			div.style.cssText = 'line-height:20px;border:1px solid #ccc; background:#666; z-index:99999; width:' + this.width + ';  padding:5px; font-family:verdana; font-size:12px; position:absolute; filter:alpha(opacity=90);-moz-opacity:0.9;opacity:0.9; visibility:hidden;';
			this.div = div;
			div = null;
			if (!document.getElementById('MouseHint')) {
				MouseHint = document.createElement('div');
				MouseHint.id = "MouseHint";
				document.body.appendChild(MouseHint);
			}
			MouseHint = document.getElementById('MouseHint');
			MouseHint.appendChild(this.div);
			MouseHintFree();
		}
		var elems = this.elems;
		var obj = this;

		for (var i = 0; i < elems.length; i++) {
			if (!elems[i].getAttribute(this.alt)) continue;
			elems[i].onmousemove = function() {
				obj.div.innerHTML = this.getAttribute(obj.alt);
				obj.div_v();
			}
			elems[i].onmouseout = function() {
				obj.div_h(this);
			}
			elems[i].onclick = function() {
				obj.div_c(this);
			}
			elems[i].onmousedown = function() {
				obj.div_c(this);
			}
		}
	},
	div_v: function() {
		var obj = this;
		document.onmousemove = function(e){
			var e = obj.getEvent(e);
			(e.x + obj.div.offsetWidth + obj.pos) > document.body.clientWidth ? obj.div.style.left = (e.x - obj.div.offsetWidth) + 'px': obj.div.style.left = e.x + obj.pos + 'px';
			obj.div.style.top = e.y + obj.pos + 'px';
			obj.div.style.visibility = 'visible';
			MouseHint.style.visibility = 'visible';
		}
	},
	div_h: function(elem) {
		this.div.style.visibility = 'hidden';
		MouseHint.style.visibility = 'hidden';
		//elem.setAttribute(this.alt,this.div.innerHTML);
		document.onmousemove = null;
	},
	div_c: function(elem) {
		MouseHint.divs = document.getElementById('MouseHint').childNodes;
		for (i = 0; i < MouseHint.divs.length ; i++){
			MouseHint.divs[i].style.visibility = 'hidden';
		}
		this.div.style.visibility = 'hidden';
		MouseHint.style.visibility = 'hidden';
		//elem.setAttribute(this.alt,this.div.innerHTML);
		document.onmousemove = null;
	},
	getEvent: function(e) {
		return window.event ? {
			x: event.clientX,
			y: event.clientY + document.documentElement.scrollTop
		}: {
			x: e.pageX,
			y: e.pageY
		};
	}
}
function MouseHintFree(){
	if(MouseHint!=undefined){
		MouseHint.style.visibility = 'hidden';
	}
}
window.onload=function(){
	new elem_alt('cominfo', 'span','hint','10px');
	new elem_alt('cominfo2', 'span','hint','10px');//今日收入 Hôm nay, doanh thu
	new elem_alt('cominfo4', 'span','hint','10px');//昨日日收入 Ngày hôm qua thu nhập hàng ngày
	new elem_alt('cominfo3', 'span','hint','10px');//总资产 Tổng tài sản
	// new elem_alt('cominfo3', 'span','hint','10px');
	new elem_alt('userinfo', 'span','hint','10px');
	new elem_alt('userinfo2', 'span','hint','10px');
	new elem_alt('userinfo3', 'span','hint','10px');

	new elem_alt('navrbg', 'p','hint','10px');//股票 Cổ
}

function hide_elem_alt (e){
	if (!e) e = window.event;
	eventTarget = (e.srcElement) ? e.srcElement : e.target;

	if (eventTarget.cancelBubble){
		eventTarget.cancelBubble = false;
	}

	if (eventTarget.offsetParent){
	hide_elem_alt.z = 0;
		//查父对像中有无 Kiểm tra xem cha mẹ của hình ảnh trong hint
		eventParent = eventTarget.parentNode;
		while(eventParent.parentNode && hide_elem_alt.z < 10){
			//alert (eventParent.tagName + " , " + eventParent.getAttribute('hint'));
			if (eventParent.getAttribute('hint')){
				return false;
			}
			hide_elem_alt.z++;
			eventParent = eventParent.parentNode;
		}
	}
	if (!document.getElementById('MouseHint')) return false;
	if (eventTarget.getAttribute('hint') == null && document.getElementById('MouseHint').getElementsByTagName('div')){
		divs = document.getElementById('MouseHint').getElementsByTagName('div');
		for (i=0; i< divs.length; i++){
			divs[i].style.visibility = 'hidden';
		}
	}
}
/*mouse over event // add by jiangbo*/
function buttonHover(e){
	if (!e) e = window.event;
	eventTarget = (e.srcElement) ? e.srcElement: e.target;
	if (eventTarget.cancelBubble) eventTarget.cancelBubble = false;
	if (!eventTarget.getAttribute('type') && eventTarget.tagName.toUpperCase() != 'BUTTON') return false;
	if (eventTarget.disabled == true) return false;
	if ((eventTarget.tagName.toUpperCase() == 'BUTTON' || eventTarget.getAttribute('type').toUpperCase() == 'BUTTON' || eventTarget.getAttribute('type').toUpperCase() == 'RESET' || eventTarget.getAttribute('type').toUpperCase() == 'SUBMIT') && eventTarget.parentNode.tagName == 'SPAN' && eventTarget.parentNode.className.indexOf('btn_normal') != -1){
		eventTarget.parentNode.className = 'btn_normal btn_hover';
		if (document.addEventListener) {
			eventTarget.addEventListener('mouseout', buttonOut, true);
		} else if (document.attachEvent) {
			eventTarget.attachEvent('onmouseout', buttonOut);
		}
	}
	if ((eventTarget.getAttribute('type').toUpperCase() == 'TEXT' || eventTarget.getAttribute('type').toUpperCase() == 'PASSWORD') && eventTarget.parentNode.tagName == 'SPAN' && eventTarget.parentNode.className.indexOf('text_normal') != -1){
		eventTarget.parentNode.parentNode.className = 'text_normal_out text_hover';
		if (document.addEventListener) {
			eventTarget.addEventListener('mouseout', buttonOut, true);
		} else if (document.attachEvent) {
			eventTarget.attachEvent('onmouseout', buttonOut);
		}
	}

	function buttonOut(e){
		if (!e) e = window.event;
		eventTarget = (e.srcElement) ? e.srcElement: e.target;
		if (eventTarget.tagName.toUpperCase() == 'BUTTON' || eventTarget.getAttribute('type').toUpperCase() == 'BUTTON' || eventTarget.getAttribute('type').toUpperCase() == 'RESET' || eventTarget.getAttribute('type').toUpperCase() == 'SUBMIT'){
			eventTarget.parentNode.className = 'btn_normal';
		}
		if (eventTarget.getAttribute('type').toUpperCase() == 'TEXT' || eventTarget.getAttribute('type').toUpperCase() == 'PASSWORD'){
			eventTarget.parentNode.parentNode.className = 'text_normal_out';
		}
	}
}

if (document.addEventListener){
	window.setTimeout("document.addEventListener('mousemove', hide_elem_alt, true)",3000);
	window.setTimeout("document.addEventListener('mouseover', buttonHover, true)", 1000);
}else if (document.attachEvent){
	window.setTimeout("document.attachEvent('onmousemove', hide_elem_alt)",3000);
	window.setTimeout("document.attachEvent('onmouseover', buttonHover)", 1000);
}
/*hint*/


/*main*/
var robj= document.getElementById('OpenRight');
if (robj)robj.style.display = "none";		//隐藏右边头像 Ẩn vào hình bên phải
var ie = (navigator.appVersion.indexOf("MSIE")!=-1);//IE
var ff = (navigator.userAgent.indexOf("Firefox")!=-1);//Firefox
var firefoxoffset = parseInt(2);
var offset = (ie)?parseInt(0):firefoxoffset;
var d=null;
var imgdir = ImgRoot;
var currentAreaId=0;
var currentMapIndex=0;
var currentMapId=0;
var CurrentMapName="";
var CurrentMapLevel=0;
var CurrentShopImg="";
var CurrentShopName="";
var MovingShopId = 0;
var Ecomony=0;
var maxIndex = 0;
var index = 0;
var spaceMapImg = "";
var x,y;
var MapWidth,MapHeight;
var m_cx,m_cy,m_h,m_w,mm_t,mm_l;
var SAMIBC_Id="";

var c__MapId = 0;//for shopdetails

function $(name){
	if (document.getElementById(name)){
		return document.getElementById(name);
	}else{
		return document.getElementsByName(name)[0];
	}
}
function SA_MIBC(SAMIBC,NowArea){
	if(NowArea=="") NowArea=0;
	if(SAMIBC !=0){
		SAMIBC_Id = SAMIBC;
		var SAMIBC_Id_Arr = SAMIBC.split("_");
		var onclk = "c.__OnSend('ajax_action.php?action=SAMIBC','',c.__func_comm_list,'SAMIBC','2');"
		$('mainhost').innerHTML +='<div><div onclick="'+onclk+'" class="SA_MIBC'+NowArea+'" style="cursor:pointer;z-index:1000"><img src="'+ImgUrl+'sa/MIBC/black'+SAMIBC_Id_Arr[0]+'.png"/></div></div>';
	}
}
function SET_SA_MIBC(str) { //add by jacky
	SAMIBC_Id=str;
}
function disableBtn(objId){
	document.getElementById(objId).disabled = true;
	_beforClass = document.getElementById(objId).className;
	document.getElementById(objId).className = _beforClass + ' btn_dis_color';
}
function MainHostDiv(DivStr){
	if($('mainhost')){
		$('mainhost').innerHTML +=DivStr;
	}
}
var MapsNewFlow=0;
function Load_One(LparamStr){
	var hDl;
	var tmparr = LparamStr.split(","), o, ot;
	if(tmparr[2] == ""){
		alert(lang._js_js._common._label95);
		return false;
	}
	if($(tmparr[2])){
	}else{
		if((!$("mapmain"))&&(tmparr[2]!='mapmain')){
			alert(lang._js_js._common._label96+'mapmain'+lang._js_js._common._label97);

			return false;
		}
		if(tmparr[2]=="mapmain") {
			index = 0;
			o = document.createElement("DIV");
			o.setAttribute("value",index);
			o.innerHTML = "<div id=mapmain  style=\"position:absolute;z-index:1;top:0px;left:0px; height:"+(tmparr[9] -offset)+"px;width:"+(tmparr[8]-offset)+"px;padding:"+tmparr[28]+"\" value="+index+"></div>";

			c._height=20;
			if((tmparr[3]<10&&tmparr[3]>2&&tmparr[3]!=9)||(tmparr[3]>15&&tmparr[3]!=28&&tmparr[3]!=29)){
				var Lt = '<div style="position:absolute;top:5px;left:14px;width:200px;color:#F6CE0A; font-weight:bold;z-index:3">'+c.__boxHtml(''+(((c._CityAddress!='')&&(typeof c._CityAddress !='undefined'))?c._CityAddress:'')+tmparr[20]+'')+'</div>';//+(c._CityAddress ? c._CityAddress : '')
				oLt = document.createElement("DIV");
				oLt.innerHTML =Lt
				$('mainhost').appendChild(oLt);
			}
			$('mainhostMap').innerHTML='';
			if(parseInt(tmparr[3])===29){//加原油地图 Thêm bản đồ dầu
				$('mainhostMap').innerHTML = "<div style='margin-top:30px;margin-left:40px;position:absolute;width:144px;height:26px;'><a href=\"javascript:c.__OnSend('ajax_action.php?action=oilFieldMapSort','',c.__func_comm_list,'oilFieldMapSort');\"><img src='" +ImgRoot + "images/viewOilState.gif' alt='"+lang._js_js._common._label98+"'/></a></div>";
			}
			if(parseInt(tmparr[3])===10){//工业区地图 Khu công nghiệp Bản đồ
				if(oilFactoryId>0) {
					$('mainhostMap').innerHTML = "<div style='margin-top:30px;margin-left:490px;position:absolute;width:144px;height:26px;'><a href=\"javascript:c.__OnSend('ajax_action.php?action=oilFieldRefineryShow&comefrom=1','',c.__func_comm_list,'oilFieldRefineryShow');\"><img src='" +ImgRoot + "images/myOilFactory.gif' alt='"+lang._js_js._common._label99+"'/></a></div>";
				}
			}
			$('mainhost').appendChild(o);
			imgdir = (imgdir == 'images/')? ImgRoot+imgdir : imgdir;
			$(tmparr[2]).style.backgroundImage = "url("+imgdir+tmparr[11]+")";
			MapWidth=parseInt(tmparr[8]);
			MapHeight=parseInt(tmparr[9]);
			m_w=$("mainhost").clientWidth;
			m_h=$("mainhost").clientHeight;
			m_cx=m_w/2;
			m_cy=m_h/2;
			mm_t=m_h-MapHeight;
			mm_l=m_w-MapWidth;
			currentAreaId = parseInt(tmparr[22]);
			currentMapIndex = parseInt(tmparr[29]);
			currentMapId=tmparr[3];
			CurrentMapLevel=tmparr[21];
			CurrentMapName=tmparr[20];
			Ecomony=parseInt(tmparr[26]);


			//alert(currentMapIndex+"="+CurrentMapLevel+"="+currentMapId+"="+CurrentMapName+"="+Ecomony)

			spaceMapImg = "space_"+tmparr[27]+".png";


			//add compass
			if(
			parseInt(tmparr[3])!=2
			&&currentMapId>=100
			&&parseInt(tmparr[27])<3
			&&currentAreaId!=14//不是旅游区 Không phải là một khu du lịch
			){//
				var abc;
				if((currentMapIndex>10&&currentMapId>=30)){
					var Up ="";
				}
				if(currentMapIndex>1&&currentMapId>=30){
					var Left = "<div class='ALeft' style=\"position:absolute;top:230px;left:5px;width:30px;height:30px;z-index=999\" onmouseover=\"this.className='rALeft'\" onmouseout=\"this.className='ALeft'\" onclick=Load_Map_Index("+currentAreaId+","+(parseInt(currentMapIndex)-1)+")><img src="+ImgUrl+"arrow/left.gif><div>";
					abc = document.createElement("DIV");
					abc.innerHTML = Left;
					$('mainhost').appendChild(abc);
				}

				if(currentMapIndex<991&&currentMapId>=30){
					var Down = "";
				}

				if(currentMapIndex<1000&&currentMapId>=30){//&&currentMapIndex<100
					if((tmparr[27]==0 && currentMapIndex<300)||(tmparr[27]!=0 && currentMapIndex<100)){
						var Right = "<div class='ARight' style=\"position:absolute;top:230px;left:653px;width:30px;height:30px;z-index=999\" onmouseover=\"this.className='rARight'\" onmouseout=\"this.className='ARight'\" onclick=Load_Map_Index("+currentAreaId+","+(parseInt(currentMapIndex)+1)+")><img src="+ImgUrl+"arrow/right.gif><div>";
						abc = document.createElement("DIV");
						abc.innerHTML = Right;
						$('mainhost').appendChild(abc);
					}
				}
				//
			}

			//
			if(
			currentAreaId//子地图 Tiểu bản đồ
			&&currentAreaId!=14//非旅游区 Non-khu du lịch
			&&currentMapId>=30
			&&currentMapId!=90160){
				get_Map_Map(currentAreaId,currentMapIndex);
				setTimeout(function(){
					get_Map_Map(currentAreaId,currentMapIndex);
					om.RightMap(1);
					LockMap=false;
				}
				,100);
			}

		}else{
			if(MovingShopId>0&&parseInt(tmparr[3])==10)return;//店铺搬迁时不能点工业区 Shop không thể di chuyển điểm khu vực công nghiệp

			o = document.createElement("DIV");
			o.id=tmparr[3];
			o.setAttribute('OwnerId',tmparr[34]);
			o.setAttribute('AreaType',tmparr[27]);
			o.style.position="absolute";
			o.style.height=(tmparr[17] -offset)+"px";
			o.style.zIndex=0;
			//处理文字过长时在右边界溢出问题 Khi giao dịch với vấn đề dài tràn văn bản trong vòng tròn bên phải
			if ( (parseInt(tmparr[12]) + (tmparr[16] -offset)) > 678 ) {
				o.style.width = 678 - parseInt(tmparr[12]) + 'px';
			} else {
				o.style.width=(tmparr[16] -offset)+"px";
			}
			o.style.top =  parseInt(tmparr[13]) + "px";
			o.style.left = parseInt(tmparr[12]) + "px";
			o.style.backgroundRepeat = 'no-repeat';
			o.style.textAlign="center";



			if (parseInt(tmparr[21])==2) {
				//o.bgtmp = "url("+imgdir+tmparr[19]+")";
				//o.objectids = tmparr[27];
				o.setAttribute('objectids',tmparr[27]);
				o.setAttribute('bgtmp',"url("+imgdir+tmparr[19]+")");
				o.style.cursor = 'pointer';
				if((currentMapId>9&&currentMapId<14)||currentMapId==15||currentMapId==29){//工业区+三个大区+开发区+能源区 Ba khu vực chính của khu công nghiệp + + + Phát triển năng lượng khu vực
					o.style.cursor = 'pointer';
					o.style.textAlign ="left";
					o.innerHTML='<span style="padding-top:7px;font-size:12px;color:#3A1300;font-family: \''+lang._js_js._common._label100+'\';font-weight: bold; display:block;"><font style="font-size:14px;">'+tmparr[20]+'</font>&nbsp;'+lang._js_js._common._label101+':<font color=#EE9C22>'+tmparr[28]+'</font></span>';
					o.onclick = function(){
						c.__OnSend('ajax_action.php?action=street&MapId='+this.id+'&TypeId='+this.getAttribute('objectids'),'',c.__func_comm_list,'street');
						$('mainhostMap').innerHTML='';
					};
				}else if(currentMapId==14){//旅游区 Du lịch
					if (c._isFF){
						o.setAttribute('bgtmp',"url("+(tmparr[19]==""?""+ImgRoot+"images/shopfaces/"+spaceMapImg:ImgRoot+"images/"+tmparr[19])+")");
						o.onmouseover = function (){this.style.backgroundImage = this.getAttribute('bgtmp');};
						o.onmouseout = function (){this.style.backgroundImage = '';};
					}else{
						o.setAttribute('bgtmp',"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+(tmparr[19]==""?""+ImgRoot+"images/shopfaces/"+spaceMapImg:ImgRoot+"images/"+tmparr[19])+"', sizingMethod='image');");
						o.onmouseover = function (){this.style.filter = this.getAttribute('bgtmp');};
						o.onmouseout = function (){this.style.filter = ''};
					}
					o.setAttribute('TuristName',tmparr[20]);
					o.style.cursor = 'pointer';
					o.style.textAlign ="left";

					var getShopName=lang._js_js._common._label102+'<font class=yellow>'+tmparr[20]+'</font>';
					hDl = document.createElement("dl");
					hDl.setAttribute('hint',getShopName);
					hDl.appendChild(o);
					o.onclick = function(){//旅游区 Du lịch
						c.__OnSend('ajax_action.php?action=Turist_Info&MapId='+this.getAttribute('id')+'&Name='+this.getAttribute('TuristName'),'',c.__func_comm_list,'Turist');
						c.__OnCloseMouseHint();
					};
				}else{
					if (currentMapId==1){
						o.onmouseover=function(){this.style.backgroundImage=this.getAttribute('bgtmp');};
						o.onmouseout=function(){this.style.backgroundImage='';};
					}else{
						o.style.backgroundImage="url("+imgdir+tmparr[19]+")";
					}
					o.onclick = function() {
						if (tmparr[32]==0)//住宅区0 Khu dân cư Quận
						{
							Load_Map(11);
						}else if (tmparr[32]==1)//闹市区1 Downtown
						{
							if(ConfigUser.user_OwnerShops<=1){
								c.__Confirm("",lang._js_js._common._label103,"UrlLoad_Map(12)");
							}else{
								Load_Map(12);
							}
						}else if (tmparr[32]==2)////商业区2 Quận thương mại
						{
							if(ConfigUser.user_OwnerShops<=1){
								c.__Confirm("",lang._js_js._common._label103,"UrlLoad_Map(13)");
							}else{
								Load_Map(13);
							}
						}else if (tmparr[32]==3)//旅游区 Du lịch
						{
							Load_Map(14);
						}else if (tmparr[32]==6)////工业区 Khu công nghiệp
						{
							Load_Map(10);
						}else if (tmparr[32]==7)////中心区 Trung tâm
						{
							Load_Map(9);
						}else if (tmparr[32]==15)////开发区 Khu Phát triển
						{
							Load_Map(15);
						}else if (tmparr[32]==29)//能源区 Khu vực năng lượng
						{
							Load_Map(29);
						}
					};
				}
			}else{
				var MyShopStat=true;
				var thint = '';
				var tname = lang._js_js._common._label106;
				if(tmparr[32]!=5&&tmparr[32]!=15&&tmparr[32]!=15&&tmparr[32]!=29){
					var thint =lang._js_js._common._label104;
				}else if(tmparr[32]==5){
					var thint ='<font color=black>'+lang._js_js._common._label105+':</font><font class=yellow>'+tmparr[20]+'</font>';
				}else if(tmparr[32]==29){
					var tname = lang._js_js._common._label107;
				}else{
					var thint = '';
				}
				try{
					for(i in hMapId){
						if(tmparr[34]==UserId){

							ohint = document.createElement("DIV");
							ohint.innerHTML=hMapId[tmparr[3]].ShopName;
							ohint.id=tmparr[3];
							ohint.className="MapHint";
							o.appendChild(ohint);
							MyShopStat=false;break;
						}
					}
				}catch(e){
				}

				if(ConfigUser.user_OwnerShops <=0&&MapsNewFlow==0&&currentMapIndex>0){
					spaceMapImg = "space_d_"+tmparr[27]+".png";
					MapsNewFlow=1;
				}else{
					spaceMapImg = "space_"+tmparr[27]+".png";
				}


				if(c._isFF){

					o.setAttribute('bgtmp',"url("+ImgRoot+"images/"+tmparr[19]+")");
					if (currentMapId==9||currentMapId==28){
						o.onmouseover=function(){this.style.backgroundImage=this.getAttribute('bgtmp');};
						o.onmouseout=function(){this.style.backgroundImage='';};
					}else{
						o.style.backgroundImage = "url("+(tmparr[19]==""?""+ImgRoot+"images/shopfaces/"+spaceMapImg:ImgRoot+"images/"+tmparr[19])+")";
					}

				}else{

					//o.setAttribute('bgtmp',"background:url("+(tmparr[19]==""?""+ImgRoot+"images/shopfaces/"+spaceMapImg:ImgRoot+"images/"+tmparr[19])+") !important; *background:none !important;progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+(tmparr[19]==""?""+ImgRoot+"images/shopfaces/"+spaceMapImg:ImgRoot+"images/"+tmparr[19])+"', sizingMethod='image');");
					o.setAttribute('bgtmp',"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+(tmparr[19]==""?""+ImgRoot+"images/shopfaces/"+spaceMapImg:ImgRoot+"images/"+tmparr[19])+"', sizingMethod='image');");
					if (currentMapId==9||currentMapId==28){
						o.onmouseover=function(){this.style.filter=this.getAttribute('bgtmp');};
						o.onmouseout=function(){this.style.filter='';};
					}else{
						o.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+(tmparr[19]==""?""+ImgRoot+"images/shopfaces/"+spaceMapImg:ImgRoot+"images/"+tmparr[19])+"', sizingMethod='image');";
					}

				}
				//o.style.border="1px solid red";


				if(parseInt(tmparr[32])==5){ //地标 Các điểm mốc
					o.onclick=function(){
						if(this.getAttribute('id') < 50){
							c.__OnSend('ajax_action.php?action=landStorm_TheLandInfo&Id='+(this.getAttribute('id')-15),'',c.__func_comm_list,'landStorm',1);
						}else if( this.getAttribute('id') ==55 ||  this.getAttribute('id') ==56){
								c.__OnSend('ajax_action.php?action=landStorm_TheLandInfo&Id='+(this.getAttribute('id')-42),'',c.__func_comm_list,'landStorm',1);
						}
						else{
							c.__OnSend('ajax_action.php?action=NPClandStorm_TheLandInfo&Id='+(this.getAttribute('id')-15),'',c.__func_comm_list,'NPClandStorm',1);

						}
					}
					o.style.cursor='pointer';
					var tname =  lang._js_js._common._label109;
				}else if(tmparr[31]==0&&(MovingShopId>0)&&tmparr[32]&&tmparr[32].indexOf('4')!=-1){//搬家优先 Di chuyển ưu tiên
					o.onclick=function(){
						MoveShop(MovingShopId,this.id);
					}
					o.style.cursor='move';
					o.title = lang._js_js._common._label108;
				}
				else if(tmparr[31]==0&&CanBuildShop&&tmparr[32]&&tmparr[32].indexOf('4')!=-1){
					o.onclick=function(){
						CreateShop(this.id,this.getAttribute('AreaType'));
					}
					o.style.cursor='pointer';
				}if(parseInt(tmparr[32])==29){ //油井

					o.style.cursor='pointer';
					if((oilFieldId>0 && tmparr[31]==0)) {
						o.style.cursor='default';
					}
					o.onclick=function(){
						if(tmparr[31] ==1) {
							c.__OnSend('ajax_action.php?action=oilFieldShow&do=ing&toUserId='+tmparr[34],'',c.__func_comm_list,'oilFieldShow','2');
						} else if(tmparr[31]==2) {
							c.__OnSend('ajax_action.php?action=oilFieldSurveying&MapId='+this.id+"&toUserId="+tmparr[34],'',c.__func_comm_list,'oilFieldSurveying');
						} else {
							if(oilFieldId==0) {
								c.__OnSend('ajax_action.php?action=oilFieldSurvey&MapId='+this.id,'',c.__func_comm_list,'oilFieldSurvey');
							} else {
								o.style.cursor='default';
							}
						}
					}
					var tname = lang._js_js._common._label107;
					MyShopStat = true;
				}else if(parseInt(tmparr[32])==15){//企业大厦 Xí nghiệp Xây dựng
					if(!BuildingId)var BuildingId=0;
					if(tmparr[31]==0&&BuildingId==0){//地图尚未被占用且未创建大厦 Bản đồ đã không được chiếm giữ và không tạo ra việc xây dựng
						o.onclick=function(){
							c.__OnSend('ajax_action.php?action=buildingCreate&MapId='+this.id,'',c.__func_comm_list,'buildingCreate');
						}
					}else if(tmparr[31]==1&&tmparr[34]==UserId){//显示自已大厦 Hiển thị xây dựng riêng của họ
						o.onclick=function(){

							c.__OnSend('ajax_action.php?action=buildingShow&MapId='+this.id,'',c.__func_comm_list,'buildingShow');
						}
					}else if(tmparr[31]==1){//显示别人大厦
						o.onclick=function(){

							c.__OnSend('ajax_action.php?action=buildingShowOther&MapId='+this.id+'&toUserId='+tmparr[34],'',c.__func_comm_list,'buildingShowOther');
						}
					}

					tname = lang._js_js._common._label110;
					o.style.cursor='pointer';
					MyShopStat = true;
				}else if(tmparr[31]==0&&(FactoryId==0 || oilFactoryId==0)&&tmparr[32].indexOf('6')!=-1){//'6',工厂 Nhà máy
					if(FactoryId==0) {

						o.onclick=function(){
							c.__OnSend('ajax_action.php?action=factoryCreate&MapId='+this.id,'',c.__func_comm_list,'factoryCreate');
						}

						tname = lang._js_js._common._label111;

						o.style.cursor='pointer';
						MyShopStat = false;
					} else if (oilFactoryId==0) {
						o.onclick=function(){
							//c.__OnSend('ajax_action.php?action=oilFieldRefinery&MapId='+this.id,'',c.__func_comm_list,'oilFieldRefinery');
						}
						tname = lang._js_js._common._label112;

						o.style.cursor='pointer';
						MyShopStat = false;
					}
				}else if(parseInt(tmparr[34])!=0&&tmparr[32].indexOf('6')!=-1){//工厂 Nhà máy
					tname = lang._js_js._common._label111;
					o.style.cursor='pointer';
					CurrentFacName = tmparr[20];
					if(parseInt(tmparr[15])>9000) { //显示炼油厂 Hiện nhà máy lọc dầu
						tname = lang._js_js._common._label112;
					}
					if(tmparr[34]==UserId){
						ohint = document.createElement("DIV");
						ohint.innerHTML=CurrentFacName;
						ohint.id=tmparr[3];
						ohint.className="MapHint";
						o.appendChild(ohint);
						MyShopStat=false;
						o.onclick=function(){
							if(parseInt(tmparr[15])>9000) {
								tname = lang._js_js._common._label112;
								c.__OnSend('ajax_action.php?action=oilFieldRefineryShow&comefrom=1','',c.__func_comm_list,'oilFieldRefineryShow');
							} else {
								c.__OnSend('ajax_action.php?action=factoryShow&comefrom=1','',c.__func_comm_list,'factoryShow');
							}
						}
					}else{
						o.onclick=function(){
							CurrentFacImg = imgdir+tmparr[19];
							if(parseInt(tmparr[15])>9000) { //显示别人的炼油厂 Hiển thị những người khác nhà máy lọc dầu
								tname = lang._js_js._common._label112;
								var uidid=0;
								if(this.getAttribute('OwnerId') != UserId){
									uidid=this.getAttribute('OwnerId');
								}
								c.__OnSend('ajax_action.php?action=oilFieldRefineryShow&uid='+uidid,'',c.__func_comm_list,'oilFieldRefineryShow');

							} else {
								if(this.getAttribute('OwnerId') == UserId){
									c.__OnSend('ajax_action.php?action=factoryShow&comefrom=1','',c.__func_comm_list,'factoryShow');
								}else{
									c.__OnSend('ajax_action.php?action=factoryRead&uid='+this.getAttribute('OwnerId'),'',c.__func_comm_list,'factoryRead');
								}
							}
						}
					}

				}else if(parseInt(tmparr[34])!=0){//operate the shop here 08-07-27
					var stype = (parseInt(tmparr[34])==parseInt(UserId))?0:1;
					o.onclick=function(){
						CurrentShopImg = imgdir+tmparr[19];
						CurrentShopName = tmparr[20];
						ShowMapInfo(this.id,stype);
					}
					o.style.cursor='pointer';
				}else if(tmparr[32].indexOf('6')!=-1){
					MyShopStat = false;
				}

				if(MyShopStat){

					var getShopName=(tmparr[31]==0&&!CanBuildShop)?(thint?'<font class=yellow>'+thint+'</font>':''):tname+': <font class=yellow>'+tmparr[20]+'</font>';
					if(tmparr[32]==29 && oilFieldId>0 && tmparr[34]==0) {
						getShopName=lang._js_js._common._label113;
					}/* else if(tmparr[32].indexOf('6')!=-1 && oilFactoryId>0  && tmparr[32]==0) {
					getShopName='Nhà máy lọc dầu chỉ có thể tạo ra một';
					}*/
					if(getShopName!=''){
						hDl = document.createElement("dl");
						hDl.setAttribute('hint',getShopName);
						hDl.appendChild(o);
					}
				}
			}

			var oo = (hDl!=undefined)?hDl:o;
			$('mainhostMap').appendChild(oo);
			if(hDl!=undefined)new elem_alt('mainhostMap', 'dl','hint','10px');
		}
	}
}
function UrlLoad_Map(s){
	Load_Map(s);
}
function clearMap(){
	c.__OnCloseWid();
	$("mainhost").innerHTML='';
}

function onCity(n){
	c.__MainMsg(lang._js_js._common._label114);
	c.__OnSend('ajax_action.php?action='+n,'',c.__func_comm_list,n);
}


var request;
function createRequest(){
	try{
		request = new XMLHttpRequest();
	}catch(e){
		try{
			request = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			try{
				request = new ActiveXObject("Microsoft.XMLHTTP");
			}catch(failed){
				request = false;
			}
		}
	}
	if(!request)alert("Error initializing XMLHttpRequest!");


}
createRequest();
var __UserAssetsPin="0G";//资产判断,防止刷G币 Tài sản để phán xét, để ngăn chặn các brush G tiền xu
function Load_Map(tp,parent){
	if(tp != 0){
		url  = "map_ajax.php?flag=query&ID="+tp;
		if(parent)url+='&level=parent';
		url= url +"&d="+Date()+"&UserAssetsPin="+__UserAssetsPin;
		request.open("POST",url,true);
		request.onreadystatechange = updatePage_query_pp;
		request.send("");
	}
}//Load_Map(mapId,true);
var LockMap=false;
function Load_Map_Index(ParentId,index){

	if(LockMap)return true;
	LockMap = true;
	if(ParentId != 0){
		url  = "map_ajax.php?flag=query&ID="+ParentId;
		url  +='&level=index&index='+index+"&d="+Date()+"&UserAssetsPin="+__UserAssetsPin;;
		request.open("POST",url,true);
		request.onreadystatechange = updatePage_query_pp;
		request.send("");
	}
}
function Load_Map_Parent(tp){
	Load_Map(tp,true);
}


function get_Map_Map(tp,mapindex){
	map_On_All(mapindex,c.__mapMaxIndex);
}

function map_On_All(curIndex,MaxIndex){
	var tmpbody = '';
	var mapIndex=0;
	var paddingNum=Math.pow(10,Math.ceil(Math.log(MaxIndex)/Math.log(10))+1);
	for(var i=-4;i<5;i++){
		mapIndex=curIndex+i;
		if(mapIndex<=0||mapIndex>MaxIndex){
			tmpbody += "<span><a href=\"javascript:void(0)\" onclick=\"return false;\">-</a></span>";
		}else{
			tmpbody += "<span><a href=\"javascript:void(0)\" onclick=Load_Map_Index(currentAreaId,"+mapIndex+")>"+(mapIndex+paddingNum).toString().substr((mapIndex==MaxIndex&&(mapIndex==10||mapIndex==100||mapIndex==1000||mapIndex==10000)?1:2),999)+"</a></span>";
		}
	}
	$('map_map').innerHTML=tmpbody;
}

function updatePage_query_pp(){
	if(request.readyState==1){
		loading();return ;
	}
	if(request.readyState == 4){
		if(request.status == 200){
			var msg = request.responseText;
			//var msg= bytes2BSTR(request.responseBody);
			try{
				eval(msg);
			}catch(e){

			}
			loaded();
		}else{
			//alert(lang._js_js._common._label115 + request.status);
		}
	}
}

function loading(){
	//panfeng close FAQ window automatically
	if (document.getElementById('newPlayerHelp').style.display != 'none')
	document.getElementById('newPlayerHelp').style.display = 'none';

	var xx, yy ,obj = $("mainhost");
	xx = (obj.offsetWidth);
	yy = (obj.offsetHeight);
	alpha = (ie)?"filter:alpha(opacity=40);":"-moz-opacity:0.4;"
	o = document.createElement("DIV");
	o.innerHTML = "<div id='loadmapdiv' style=\"top:0px;left:0px;height:"+yy+"px;width:"+xx+"px;position:absolute;background-color:#00ff00;"+alpha+";font:normal normal 900 29pt "+lang._js_js._common._label116+";text-align:center; vertical-align:middle; line-height:"+yy+"px;z-index:999\"></div>";
	obj.appendChild(o);
}

function loaded(){
	var o = $("loadmapdiv");
	if(o)o.parentNode.parentNode.removeChild(o.parentNode);
}

function   getAbsLeft(e){var  l=e.offsetLeft;	while(e=e.offsetParent)	l+=e.offsetLeft; return   l;}
function   getAbsTop(e){var   t=e.offsetTop;	while(e=e.offsetParent)	t+=e.offsetTop;	 return   t;}

function mmppctrl(){
	var obj = $('map_map');
	if(obj.style.display=='none'){
		obj.style.display='block';
		$('mmpp_ctrl').innerHTML = "-";
	}else{
		obj.style.display='none';
		$('mmpp_ctrl').innerHTML = "+";
	}

}
var DisabledMap=loading;
var EnabledMap=loaded;
/*map*/
/*main*/
var agt = navigator.userAgent.toLowerCase();
var is_ie = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));

var isIE6 = ((agt.indexOf("msie 6.0") != -1) && (agt.indexOf("opera") == -1));
var isIE7 = ((agt.indexOf("msie 7.0") != -1) && (agt.indexOf("opera") == -1));
var isIEF = ((agt.indexOf("firefox") != -1) && (agt.indexOf("opera") == -1));

function getObj(id){
	//return (document.getElementById(id))?document.getElementById(id):document.all[id];
	if (!id) {
		return false;
	}
	if (document.all) {
		return document.all[id];
	}else{
		return document.getElementById(id);
	}
}
function ietruebody(){
	return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body;
}
function IsElement(id){
	return document.getElementById(id)!=null ? true : false;
}
function ietruebody(){
	return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body;
}
function IsTrue(v){
	return (v==true
	|| ("number"==typeof(v) && 0!=v && ""!=v)
	|| ("string"==typeof(v) && ""!=v  && "0"!=v && "off"!=v && "no"!=v && ""!=v)
	|| ("object"==typeof(v) && null!=v && {}!=v && []!=v && 0!=v.length)
	);
}

/*-------------------登录和注册 效果控制-- Đăng nhập và kiểm soát có hiệu lực Đăng ký --------------------*/
var getarrName =[];
var getarrInfo =[];

function initShowInfo(s){
	var __BV=null;
	if ( s===1 ){
		__BV=arrNameVsop;
		__BVI=arrInfoVsop;
	}else {
		__BV=arrName;
		__BVI=arrInfo;
	}
	for (var i = 0; i < __BV.length; i++) {
		var sName = __BV[i]+"_info";
		if (!getObj(sName)) return
		getObj(sName).className = "regcheckinit";
		getObj(sName).innerHTML=__BVI[i]
		if (getObj(__BV[i]).type=='radio'){
			getObj(sName).innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;';
			getObj(sName).className = "regcheckok";
		}else{
			eval("getObj(__BV[i]).onfocus = function (){FocusShowInfo(this.name)}");
			eval("getObj(__BV[i]).onblur = function (){BlurShowInfo(this.name)}");
		}
		getarrName.push(__BV[i]);
		getarrInfo.push(__BVI[i]);
	}
}
var __OldObjDiv=null;
var __OldObjIup=null;
function FocusShowInfo(divname,sName,sNameText){
	if(!sName)sName = divname+"_info";
	if (!getObj(sName)) return
	if (getObj(sName).className!='regcheckok'){
		getObj(divname).className = "regchecktext";
		getObj(sName).className = "regcheckOver";
		getObj(sName).innerHTML=(sNameText?sNameText:GetarrInfoText(divname));
	}

	__OldObjDiv = sName;
	__OldObjIup = divname;
}
function BlurShowInfo(divname){
	sName = divname+"_info";
	if (!getObj(sName)) return
	if (getObj(__OldObjDiv)) getObj(__OldObjDiv).className = "regcheckinit";
	if (getObj(__OldObjIup)) getObj(__OldObjIup).className = "";
	BlurCheck(divname);
}
function GetarrInfoText(divname){
	var s = null;
	for (var i = 0; i < getarrInfo.length; i++) {
		if (divname == getarrName[i]){
			s = getarrInfo[i];break;
		}
	}
	return s
}

function findPosX(obj){ //返回左边指针 Quay lại trên con trỏ trái
	var curleft = 0;
	if(obj.offsetParent){
		while(obj.offsetParent){
			curleft += obj.offsetLeft
			obj = obj.offsetParent;
		}
	} else if(obj.x){
		curleft += obj.x;
	}

	return curleft - ietruebody().scrollLeft;
}
function findPosY(obj){ //返回头部指针 Trở lại con trỏ đầu
	var curtop = 0;
	if(obj.offsetParent){
		while(obj.offsetParent){
			curtop += obj.offsetTop
			obj = obj.offsetParent;
		}
	} else if(obj.y){
		curtop += obj.y;
	}
	return curtop - ietruebody().scrollTop;
}
function div_location(obj,type,setDivPlace){ //定位显示父 Địa điểm cho thấy, phụ huynh obj
	var o = getObj(setDivPlace);
	//o.style.display = '';
	//o.style.cssText = 'opacity:0.95;left:-500px;z-index:900';

	if(typeof obj == 'string'){
		obj = getObj(obj);
	}

	if(obj == null){
		o.style.top= (ietruebody().clientHeight - o.offsetHeight)/2 + ietruebody().scrollTop;
		o.style.left = (ietruebody().clientWidth - o.offsetWidth)/2 ;
	} else{
		var top  = findPosY(obj);
		var left = findPosX(obj);

		if(top < ietruebody().clientHeight/2 && type<3){
			top += ietruebody().scrollTop + obj.offsetHeight;
		} else if(type==4){

			o.style.top=event.clientX;
			o.style.left=event.clientY;
			return

		} else{
			top += ietruebody().scrollTop - o.offsetHeight;
		}

		if(left > (ietruebody().clientWidth)*3/5){
			//Kelvin 20090427
			//left -= o.offsetWidth - obj.offsetWidth;
		}


		o.style.top  = top  + 'px';
		o.style.left = left + 'px';
	}
}

var myimages=new Array()
function preloadimages(){
	for (i=0;i<preloadimages.arguments.length;i++){
		if(arguments[i]){
			myimages[i]=new Image();
			myimages[i].src=preloadimages.arguments[i];
		}
	}
}

function preloadsounds(){
	for (i=0;i<preloadsounds.arguments.length;i++){
		if(arguments[i]){
			shtml='<bgsound volume="-5000" loop="1" src="'+arguments[i]+'">';
			var sobj=document.createElement("bgsound");
			sobj.volumn=-5000;
			sobj.loop=1;
			sobj.src=arguments[i];
			document.body.appendChild(sobj);
		}
	}
}
var SexArr = new Array(lang._js_js._common._label124,lang._js_js._common._label125);
var CharacterArr = new Array();
CharacterArr[0]   =   new   Array(lang._js_js._common._label117,lang._js_js._common._label118,lang._js_js._common._label119,lang._js_js._common._label120,lang._js_js._common._label121);
CharacterArr[1]   =   new   Array(lang._js_js._common._label117,lang._js_js._common._label118,lang._js_js._common._label119,lang._js_js._common._label122,lang._js_js._common._label123);

function initSelectSet(){
	while   (getObj('sex').options.length   >   0) {
		getObj('sex').options.remove(0);
	}
	for   (var i = 0; i < SexArr.length; i++){
		var   opt   =   document.createElement("OPTION");
		opt.value   =   SexArr[i];
		opt.text   =   SexArr[i];
		getObj('sex').options.add(opt);
		opt   =   null;
	}
	initSelectChar();
	getObj('sex').onchange   =   initSelectChar;
}

function   initSelectChar(){
	while   (getObj('character').options.length   >   0) {
		getObj('character').options.remove(0);
	}
	var   myArr   =   CharacterArr[sex.selectedIndex];
	for   (var   i   =   0;   i   <   myArr.length;   i++){
		var   opt   =   document.createElement("OPTION");
		opt.text   =   myArr[i];
		opt.value   =   myArr[i];
		getObj('character').options.add(opt);
		opt   =   null;
	}
}

function setValue(name,value){//alert(document.getElementById(name).innerHTML);
	document.getElementById(name).innerHTML= value;
	//alert(document.getElementById(name).innerHTML);
	//alert(name);alert(value);
}

String.prototype.URIencode=function(){
	return this.replace(/[\x09\x0A\x0D\x21-\x29\x2B\x2C\x2F\x3A-\x3F\x5B-\x5E\x60\x7B-\x7E]/g,function(a){return "%"+((a.charCodeAt(0)<16)?("0"+a.charCodeAt(0).toString(16)):(a.charCodeAt(0).toString(16)))}).replace(/[\x00-\x20 ]/g,"+");
}
String.prototype.trim=function(){
	return this.replace(/^\s+|\s+$/g,"");
}
String.prototype.getRealLength=function(){
	return this.replace(/[^\x00-\xff]/g,"aa").length;
}


function CheckCount(o){
	var str=o.value;
	var length =  str.trim().getRealLength();
	var setlength = 100;
	if(length == 0 || length >setlength){
		if(!length){
			getObj('worldlength').innerHTML = lang._js_js._common._label126;
			getObj('worldlength').style.display='none';
			return true;
		}else{
			getObj('worldlength').innerHTML = lang._js_js._common._label127+(length-setlength)+lang._js_js._common._label128;
			getObj('worldlength').style.display='';
			getObj('worldpost').disabled=true;
			getObj('worldpost').style.color = "#ACACAC";
			getObj('worldpost').style.cursor='';
			if(getObj('worldposthorn')){
				getObj('worldposthorn').disabled=true;
				getObj('worldposthorn').style.color = "#ACACAC";
				getObj('worldposthorn').style.cursor='';
			}
			return flase;
		}
	}else{
		getObj('worldlength').innerHTML = lang._js_js._common._label129+(setlength-length)+lang._js_js._common._label128;
		getObj('worldpost').disabled=false;
		getObj('worldlength').style.display='none';
		getObj('worldpost').style.cursor='pointer';
		if(getObj('worldposthorn')){
			getObj('worldposthorn').disabled=false;
			getObj('worldposthorn').style.cursor='pointer';
		}
		return true;
	}
	//getObj('worldlength').style.background='red';

}

function WorldKeyDown(e){
	if (!e){
		e = window.event;
	}
	if (e.keyCode){
		code = e.keyCode;
	}else if (e.which){
		code = e.which;
	}

	if (code == 13 && window.event){
		if (((e.ctrlKey && code == 13) || code == 13) && getObj('worldpost').disabled === false){
			getObj('worldpost').click();
			getObj('world').value.trim();
			getObj('world').focus();
			e.returnValue = false;
		}
	}else{
		if (code == 13 && getObj('worldpost').disabled === false){
			getObj('worldpost').click();
			getObj('world').value.trim();
			getObj('world').focus();
			e.preventDefault();
		}
	}
}

function correctPNG()
{
	for(var i=0; i<document.images.length; i++)
	{
		var img = document.images[i]
		var imgName = img.src.toUpperCase()
		if (imgName.substring(imgName.length-3, imgName.length) == "PNG")
		{
			var imgID = (img.id) ? "id='" + img.id + "' " : ""
			var click = (img.onclick) ? img.onclick : ""
			var imgClass = (img.className) ? "class='" + img.className + "' " : ""
			var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
			var imgStyle = "display:inline-block;" + img.style.cssText
			if (img.align == "left") imgStyle = "float:left;" + imgStyle
			if (img.align == "right") imgStyle = "float:right;" + imgStyle
			if (img.parentElement.href) imgStyle = "cursor:pointer;" + imgStyle

			var strNewHTML = "<a "+click +"><span  "+imgID + imgClass + imgTitle
			+ " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
			+ "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
			+ "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>"
			img.outerHTML = strNewHTML
			i = i-1
		};
	};
};

function showDisplay(n){
	if(!getObj(n))return;
	if(getObj(n).style.display=='none'){
		getObj(n).style.display='block';
	}else{
		getObj(n).style.display='none';
	}
}

//onkeyup

function getLength1(content)
{
	var text=content.replace(/[^\x00-\xff]/g,"**");
	return text.length;
}

function OnStrLimit (content,len,alt)
{
	var tempStr=content;
	if(getLength1(content)>len)
	{
		//alert(tempStr)

		var i=0;
		for(var z=0;z<len;z++)
		{
			if(tempStr.charCodeAt(z)>255)
			{
				i=i+2;
			}else
			{
				i=i+1;
			}
			if(i>=len)
			{
				tempStr=tempStr.slice(0,(z + 1))+alt;
				break;
			}
		}
		return tempStr;
	}
	else
	{
		return this+"";
	}
}


function cc(s){
	if(/[^0-9\.]/.test(s)) return "invalid value";
	s=s.replace(/^(\d*)$/,"$1.");
	s=(s+"00").replace(/(\d*\.\d\d)\d*/,"$1");
	s=s.replace(".",",");
	var re=/(\d)(\d{3},)/;
	while(re.test(s))
	s=s.replace(re,"$1,$2");
	s=s.replace(/,(\d\d)$/,".$1");
	return s;
}


function byteLength(s){
	var l = s.length;
	for(var i=0;i<s.length;i++){
		if(s.charCodeAt(i)>127)l++;
	}
	return l;
}
function getByteLength(s,l){
	var i = 0;

	while(l>0&&i<s.length){
		l--;
		if(s.charCodeAt(i)>127)l--;
		i++;
	}
	return s.substring(0,i);

}
function cutByteLength(s,l){
	var newstr= getByteLength(s,l);
	if(s != newstr)
	s= newstr+'...';
	return s;
}

function textgetByteLength(s,l){
	var l = s.length;
	for(var i=0;i<s.length;i++){
		if(s.charCodeAt(i)>127)l++;
	}
	return l;
}

/*2008-9-14*/
function __CodeLimitLen(s){
	var l = s.length;
	for(var i=0;i<s.length;i++){
		if(s.charCodeAt(i)>127)l++;
		if(pagecharset=='utf-8'&&s.charCodeAt(i)>2048)l++;
	}
	return l;
}


function __CodeLimit(sThis,sMaxLen){
	var i = 0;
	if(__CodeLimitLen(sThis.value) > sMaxLen){
		while(sMaxLen>0&&i<sThis.value.length){
			sMaxLen--;
			if(sThis.value.charCodeAt(i)>127)sMaxLen--;
			if(pagecharset=='utf-8'&&sThis.value.charCodeAt(i)>2048)sMaxLen--;
			i++;
		}
		sThis.value = sThis.value.substring(0,i);
	}
}

function keyDown(e){
	e = e ? e : window.event;
	var o = e.srcElement || e.target;
	if (e.keyCode == 8 && !(o.type == 'text' || o.type == 'textarea' || o.type == 'file')){
		if(document.all) {
			e.keyCode = 0;
			e.returnValue=false;
		}else{
			e.cancelBubble = true;
			e.preventDefault();
		}
	}
}
function __attachEvent(obj, evt, func) {
	if(obj.addEventListener) {
		obj.addEventListener(evt, func, false);
	} else if(obj.attachEvent) {
		obj.attachEvent("on" + evt, func);
	}
}

String.prototype.substrbyte=function(s,l){
	var i = s;
	while(l>0&&i<l){
		if(this.charCodeAt(i)>127)l--;
		if(pagecharset=='utf-8'&&this.charCodeAt(i)>2048)l--;
		i++;
	}
	return this.substring(s,l);
}

function unserialize(ss){
	var p = 0, ht = [], hv = 1; r = null;
	function unser_null() {
		p++;
		return null;
	}
	function unser_boolean() {
		p++;
		var b = (ss.charAt(p++) == '1');
		p++;
		return b;
	}
	function unser_integer() {
		p++;
		var i = parseInt(ss.substring(p, p = ss.indexOf(';', p)));
		p++;
		return i;
	}
	function unser_double() {
		p++;
		var d = ss.substring(p, p = ss.indexOf(';', p));
		switch (d) {
			case 'INF': d = Number.POSITIVE_INFINITY; break;
			case '-INF': d = Number.NEGATIVE_INFINITY; break;
			default: d = parseFloat(d);
		}
		p++;
		return d;
	}
	function unser_string() {
		p++;
		var lstr = ss.substring(p, p = ss.indexOf(':', p));
		var l = parseInt(lstr);
		p += 2;
		var s = ss.substrbyte(p, p += l);
		p=p+2-l+s.length;
		return s;
	}
	function unser_array() {
		p++;
		var n = parseInt(ss.substring(p, p = ss.indexOf(':', p)));
		p += 2;

		var a = [];
		ht[hv++] = a;
		for (var i = 0; i < n; i++) {
			switch (ss.charAt(p++)) {
				case 'i': k = unser_integer(); break;
				case 's': k = unser_string(); break;
				case 'U': k = unser_unicode_string(); break;
				default: return false;
			}
			a[k] = __unserialize();
		}
		p++;
		return a;
	}
	function unser_object() {
		p++;
		var l = parseInt(ss.substring(p, p = ss.indexOf(':', p)));
		p += 2;
		var cn = ss.substrbyte(p, p += l);
		p += 2;
		var n = parseInt(ss.substring(p, p = ss.indexOf(':', p)));
		p += 2;
		if (eval(['typeof(', cn, ') == "undefined"'].join(''))) {
			eval(['function ', cn, '(){}'].join(''));
		}
		var o = eval(['new ', cn, '()'].join(''));
		ht[hv++] = o;
		for (var i = 0; i < n; i++) {
			var k;
			switch (ss.charAt(p++)) {
				case 's': k = unser_string(); break;
				case 'U': k = unser_unicode_string(); break;
				default: return false;
			}
			if (k.charAt(0) == '\0') {
				k = k.substrbyte(k.indexOf('\0', 1) + 1, k.length);
			}
			o[k] = __unserialize();
		}
		p++;
		if (typeof(o.__wakeup) == 'function') o.__wakeup();
		return o;
	}
	function unser_custom_object() {
		p++;
		var l = parseInt(ss.substring(p, p = ss.indexOf(':', p)));
		p += 2;
		var cn = ss.substrbyte(p, p += l);
		p += 2;
		var n = parseInt(ss.substring(p, p = ss.indexOf(':', p)));
		p=p+2-l+s.length;
		if (eval(['typeof(', cn, ') == "undefined"'].join(''))) {
			eval(['function ', cn, '(){}'].join(''));
		}
		var o = eval(['new ', cn, '()'].join(''));
		ht[hv++] = o;
		if (typeof(o.unserialize) != 'function') p += n;
		else o.unserialize(ss.substrbyte(p, p += n));
		p++;
		return o;
	}
	function unser_unicode_string() {
		p++;
		var l = parseInt(ss.substring(p, p = ss.indexOf(':', p)));
		p += 2;
		var sb = [];
		for (i = 0; i < l; i++) {
			if ((sb[i] = ss.charAt(p++)) == '\\') {
				sb[i] = String.fromCharCode(parseInt(ss.substring(p, p += 4), 16));
			}
		}
		p += 2;
		return sb.join('');
	}
	function unser_ref() {
		p++;
		var r = parseInt(ss.substring(p, p = ss.indexOf(';', p)));
		p++;
		return ht[r];
	}
	function __unserialize() {
		switch (ss.charAt(p++)) {
			case 'N': return ht[hv++] = unser_null();
			case 'b': return ht[hv++] = unser_boolean();
			case 'i': return ht[hv++] = unser_integer();
			case 'd': return ht[hv++] = unser_double();
			case 's': return ht[hv++] = unser_string();
			case 'U': return ht[hv++] = unser_unicode_string();
			case 'r': return ht[hv++] = unser_ref();
			case 'a': return unser_array();
			case 'O': return unser_object();
			case 'C': return unser_custom_object();
			case 'R': return unser_ref();
			default: return false;
		}
	}
	return __unserialize();
}
/*main*/
/*createWid*/
stack=function(size){
	this._max=30;//size;
	this._s=new Array(size);
	this._Ip=-1;
	this._l=0;
	this._R=false;
	this.push = function(d){
		var i= 0;
		if(d[0] == 1){
			for(i=0;i<this._l;i++){
				if(this._s[i] != null){
					if(this._s[i][0] != 1){
						delete this._s[i];
					}
				}
			}
			if(this._Ip > -1){
				if(this._s[this._Ip] != null){
					if(this._s[this._Ip][1][0] == d[1][0])
					return;
				}
			}
		}
		this._Ip=(this._Ip+1);
		this._s[this._Ip]=d;
		this._l++;
	}
	this.pop = function (n){
		var ret= null;
		this._Ip=this._Ip+n;
		if(this._Ip<0)this._Ip+=this._max;
		this._l=this._l+n;
		this._max=this._max+n;

		if(this._Ip>-1 || this._Ip<this._l){
			ret= this._s[this._Ip];
			while(this._Ip>-1 && ret==null){
				this._Ip--;
				this._l--;
				ret= this._s[this._Ip];
			}
		}
		return ret;
	}

	this.clear = function (){
		this._l=0;
		this._Ip=-1;
		this._R=true;
	}
	this.isEmpty=function(){
		return (this._l==0);
	}
}

/*创建标签*/
function createWinMain(){
	this._$=function(o,d){return (d||document).getElementById(o)};
	this._debug=false;
	this._sId;
	this._TimingStart=true;//刷新状态 Tình trạng làm mới
	this._sellStart=0; // 公司 Công ty 1 店铺 Shop 2 常务工作 Công tác quản lý 3 进度条状态 Thanh tiến nhà nước
	this._sellBegTime=0;
	this._sellEndTime=0;
	this._systemTime=0;
	this._UseCoins=0;
	this._sellTitle=null;
	this._preAction='';
	this._actMenu='';
	this._actChildUrl='';
	this._selladdTime=0;
	this._getEmployeeId =0;
	this._setEmployeeId ={};
	this._setUserId ={};
	this._setShopId ={};
	this._getShopId =0;
	this._setToUserId ={};
	this._getToUserId =0;
	this._allToUserIdChecked=0;
	this._st=new stack(30);
	this.__disabledst=false;
	this._Label=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
	this._zIndex=100;
	this._$t=function(t,d){return (d||document).getElementsByTagName(t)};
	var a=navigator.userAgent;
	this._isIE=a.search('MSIE')>0;
	this._isFF=a.indexOf('Gecko')!=-1&&!(a.indexOf('KHTML')>-1||a.indexOf('Konqueror')>-1||a.indexOf('AppleWebKit')>-1);
	this.__loadJs=function(p){
		var a=this._$t('script');
		if(a){for (var i=a.length-1;i>=0;--i){
			if (-1!=a[i].src.indexOf(p))
			return;
		}
		};
		var o=document.createElement('script');
		o.language='javascript';
		o.type = "text/javascript";
		o.id = p;
		o.defer = true;
		o.src=p;
		o.charset=(typeof(pagecharset) !='undefined')?pagecharset:"gb2312";

		//if (this._isIE||this._isFF){
			a=this._$t('head')[0];
			if(a){a.appendChild(o);}
		//}else{
		//	o.onload=o.onreadystatechange=function(){if(o.readyState&&o.readyState=="loading")return;a=this._$t('head')[0];if(a){a.appendChild(o);}}
		//}
	};

	//this.__loadJs('js/templates.js');
	templates.call(this);
	mainAjax.call(this);
	this.__error=function(x)
	{
		if(this._debug){
			alert(lang._js_js._common._label130+x+"!");
		}return;
	};
	/*获取标签名*/
	this.__GetLabelName=function () {
		var s="";
		for(var i=0;i<this.__GetRandom(1,this._Label.length);i++){
			s+=this._Label[this.__GetRandom(1,this._Label.length)];
		}
		return s;
	};
	/*获取随机数*/
	this.__GetRandom=function (l,s){
		var z = l-s+1;
		return Math.floor(Math.random()*z+s);
	};
	/*函数 __createWin (创建名,定位父DIV对象)*/
	this.__createWin = function (n,appointObj,w,h,l,t,z) {
		// n = 要创建的对像	appointObj = 父对像
		var o=this._$(n);
		if(o==null){
			o = document.createElement('div');
			n = ( n == null) ? this.__GetLabelName() : n;
			o.id = n;
			with(o.style){
				position="absolute";
				width=((w==null)?"200px":w);
				height="auto";
				overflow="hidden";
				display="none";
				padding=0;
			}
			document.body.appendChild(o);
		}

		this.__zindex(o,z);
		if (appointObj == null || appointObj == '')
		{
			var ll=l+"px";
			var tt=t+"px";
			o.style.left=((l==null)?"150px":ll);
			o.style.top=((t==null)?"140px":tt);
		}else{
			div_location(appointObj,1,n);
		}

		return o;
	};
	this.__zindex = function(o,z)
	{
		if(o.style.zIndex < this._zIndex)
		{
			var sz = this._zIndex + 1;
			if (z == 0)
			{
				o.style.zIndex = sz;
			}else{
				o.style.zIndex = z;
			}
		}
	};
	this.__OnWid=function (o)
	{
		o.style.display = "";
	};
	this.__OffWin=function(o)
	{
		var oo = this._$(o);
		oo.style.display = "none";
		EnabledMap();
	};
	this.__ToolsWin=function (o){
		this.__hideParentMenu();
		this.__showParentMenu(o);
	};
	this.__getToolsBar=function()
	{

		var o=this._$(this._parentname);
		if(o==null){
			var o=document.createElement(this._parentname);
			o.id=this._parentname;
			with(o.style){
				position="absolute";
				width='400px';
				height='300px';
				padding='4px';
				zIndex=4;
				//left=1;
				//top=1;
				display="none";
			}
			document.body.appendChild(o);
		}
		return o;
	};
	this.__showParentMenu=function(childobj){//显示菜单
		try{
			var o=this.__getToolsBar();
			o.appendChild(childobj);
			o.style.display="";
		}catch(x){this.__error(x)}
	};
	this.__hideParentMenu=function(){//隐藏菜单
		try{
			//alert(this.__getToolsBar().id)
			document.body.removeChild(this._$(this._parentname));
		}catch(x){this.__error(x)}
	}
	/*移动窗体*/
	var dm_o,dm_x,dm_y,dm_t1,dm_t2;
	this.__move = function (n){//
		dm_dragapproved=true;
		dm_o = this._$(n);
		dm_t1=dm_o.style.pixelLeft;
		dm_t2=dm_o.style.pixelTop;
		dm_x=event.clientX;
		dm_y=event.clientY;
		document.onmousemove=this.__moving;
		document.onmouseup   = this.__moved;
	};
	this.__moving = function (){
		if ( event.button ==1 ){
			var winLeft= dm_t1 + event.clientX - dm_x;
			dm_o.style.pixelLeft = ( winLeft < 0 )?0:winLeft
			var winTop=dm_t2 + event.clientY - dm_y;
			dm_o.style.pixelTop=( winTop < 0 )?0:winTop;
			return false;
		}
	};
	this.__moved = function(){
		if(is_ie){
			document.body.onselectstart = function(){return true;}
		}
		document.onmousemove = '';
		document.onmouseup   = '';
	};

	this.__innerHtml=function (n,b)
	{
		var s='';h="";
		var o = this._$(n);

		var html='';

		if (n=='Hint')
		{
			//html='<iframe style="position:absolute;width:100%;height:auto;z-index:-1;" scrolling="no" frameborder="0"></iframe>'
			//class=systembg
			html="<table width='100%' border=1  align=center cellpadding='0' cellspacing='0'><tr height=30><td></td></tr><tr><td><div style='padding=10px'>"+b+"</td></tr></table>";
			//this._Htmlbg='background-color: #F8ECCD;';
		}else{
			html+=this.__boxHtml(b);
		}
		o.innerHTML=html;
	};
	this.__boxHtml = function(s, wind) {
		var t1, t2 = "";
		if (!s) return;
		if (wind == 1) {
			//弹出窗口
			//<div style="height:26px;line-height:26px;text-align:right;vertical-align:text-bottom;"><a href="javascript:void(0)" onclick="c.__BigWindowClose()" class=allcoin><strong>关闭</strong></a></div>
			t1 = '<div style="position:absolute; width:160px;height:60px;left:400px;background:url(\'' + ImgUrl + 'default/' + c._action + '.png\') no-repeat !important; *background:none !important; filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + ImgUrl + 'default/' + c._action + '.png\');"><img src=' + ImgUrl + 'blank.gif  width="3" height="3"></div>';
			t1 += '<table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin: 0; padding: 0">';
			t1 += '	<td width="3" height="3" valign="top" class="wintop1" style="padding:0px;display:block;"><img src=' + ImgUrl + 'blank.gif  width="3" height="3"></td>';
			t1 += '	<td class="wintop2" height="3"><img src=' + ImgUrl + 'blank.gif  height="3"></td>';
			t1 += '	<td width="3" height="3" valign="top" class="wintop3"><img src=' + ImgUrl + 'blank.gif  width="3" height="3"></td>';
			t1 += '  </tr>';
			t1 += '  <tr>';
			t1 += '	<td valign="top" width="3" class="wincen1">';
			t1 += '  </td>';
			t1 += '	<td  class="wincen2" width="955" height=690 valign=top>';

			t2 = '	</td><td valign="top" class="wincen3" ></td>';
			t2 += '  </tr>';
			t2 += '  <tr>';
			t2 += '	<td width="3" height="3" valign="top" class="winfoot1" style="padding:0px;border:0;display:block;"></td>';
			t2 += '	<td class="winfoot2"></td>';
			t2 += '	<td width="3" height="3" valign="top" class="winfoot3"></td>';
			t2 += '  </tr>';
			t2 += '</table>';
			t2 += '<div style="position:absolute; width:139px;height:32px;left:450px;background:url(\'' + ImgUrl + 'default/shop2.png\') no-repeat !important; *background:none !important; filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + ImgUrl + 'default/shop2.png\');"><img src=' + ImgUrl + 'blank.gif  width="139" height="32"></div>';
		} else {
			if (isIE6) {
				t1 = '<table width="100%" height="'+(c._height)+'" border="0" cellpadding="0" cellspacing="0" style="margin: 0; padding: 0">';
				t1 += '  <tr>';
				t1 += '		<td width="3" height="3" valign="top" class="L-win_top1"><img src="'+ImgRoot+'images/blank.gif" width="3" height="3" /></td>';
				t1 += '		<td class="L-win_top2" height="3"><img src="'+ImgRoot+'images/blank.gif" width="3" height="3" /></td>';
				t1 += '		<td width="3" height="3" valign="top" class="L-win_top3"><img src="'+ImgRoot+'images/blank.gif" width="3" height="3" /></td>';
				t1 += '  </tr>';
				t1 += '  <tr>';
				t1 += '		<td valign="top" class="L-win_cen1" width="3"><img src="'+ImgRoot+'images/blank.gif" width="3" height="3" /></td>';
				t1 += '		<td height="' + (c._height - 6) +'" width="*" style="_width:expression(this.getElementsByTagName(\'div\')[0].clientWidth+\'px\');_height:expression(this.getElementsByTagName(\'div\')[0].clientHeight+\'px\');vertical-align:top;" class="L-win_cen2"><div style="padding:4px;position:absolute;z-index:1;height:'+(c._height - 14)+'px">';

				t2 += '		</div></td><td valign="top" class="L-win_cen3" width="3"><img src="'+ImgRoot+'images/blank.gif" width="3" height="3" /></td>';
				//t1 += '		<td height="' + (c._height - 6) +'" width="*" style="vertical-align:top;" class="L-win_cen2"><div class="autoScrollBar" style="position:absolute;z-index:1;width:100%;height:'+(c._height - 6)+'px"><div style="padding:4px;">';

				//t2 += '		</div></div></td><td valign="top" class="L-win_cen3" width="3"><img src="'+ImgRoot+'images/blank.gif" width="3" height="3" /></td>';
				t2 += '  </tr>';
				t2 += '  <tr>';
				t2 += '		<td width="3" height="3" valign="top" class="L-win_foot1"><img src="'+ImgRoot+'images/blank.gif" width="3" height="3" /></td>';
				t2 += '		<td class="L-win_foot2" height="3"><img src="'+ImgRoot+'images/blank.gif" width="3" height="3" /></td>';
				t2 += '		<td width="3" height="3" valign="top" class="L-win_foot3"><img src="'+ImgRoot+'images/blank.gif" width="3" height="3" /></td>';
				t2 += '  </tr>';
				t2 += '</table>';

			} else {
				t1 = '<table height="' + c._height + '" width="100%" border="0" cellpadding="0" cellspacing="0" style="margin: 0; padding: 0;' + this._Htmlbg + '"><tr>';
				t1 += '	<td style="display:block;width:3px;height:3px;line-height:3px;background:url(' + ImgUrl + 'elem/win_top1.png) 0 0 no-repeat;"></td>';
				t1 += '	<td style="height:3px;line-height:3px;background:url(' + ImgUrl + 'elem/win_top2.png) 0 0 repeat-x;"></td>';
				t1 += '	<td style="display:block;width:3px;height:3px;line-height:3px;background:url(' + ImgUrl + 'elem/win_top3.png) right 0 no-repeat;"></td>';
				t1 += '  </tr><tr>';
				t1 += '	<td style="width:3px;background:url(' + ImgUrl + 'elem/win_cen1.png) 0 0 repeat-y;"></td>';
				t1 += '	<td height="' + (isIEBrowser ? c._height - 14 : c._height - 6) +'" style="vertical-align:top;background:url(' + ImgUrl + 'elem/win_cen2.png) 0 0 repeat;padding:4px;">';

				t2 = '</td><td style="width:3px;background:url(' + ImgUrl + 'elem/win_cen3.png) right top repeat-y;"></td>';
				//t1 += '	<td class="autoScrollBar" height="' + (isIEBrowser ? c._height - 14 : c._height - 6) +'" style="vertical-align:top;background:url(' + ImgUrl + 'elem/win_cen2.png) 0 0 repeat;"><div class="autoScrollBar" style="height:100%;width:100%;"><div style="padding:4px;">';

				//t2 = '</div></div></td><td style="width:3px;background:url(' + ImgUrl + 'elem/win_cen3.png) right top repeat-y;"></td>';
				t2 += '  </tr><tr>';
				t2 += '	<td style="width:3px;height:3px;line-height:3px;background:url(' + ImgUrl + 'elem/win_foot1.png) 0 bottom no-repeat;"></td>';
				t2 += '	<td style="height:3px;line-height:3px;background:url(' + ImgUrl + 'elem/win_foot2.png) 0 bottom repeat-x;"></td>';
				t2 += '	<td style="width:3px;height:3px;line-height:3px;background:url(' + ImgUrl + 'elem/win_foot3.png) right bottom no-repeat;"></td></tr></table>';

			}
		}
		return t1 + s + t2;
	};
	this.__secFirstComfirm = function (secEdit){
		if (ConfigUser.secFirst == 1){
			c.__Confirm("",lang._js_js._common._label131+"</font>","c.__OnSend('ajax_action.php?action=secChange&secretary="+secEdit+"&sex=','',c.__func_comm_list,'sec3');");
		}else{
			if(secEdit=='default1')
			c.__Confirm("",lang._js_js._common._label132,"c.__OnSend('ajax_action.php?action=secChange&secretary="+ secEdit +"&sex=','',c.__func_comm_list,'jobxms');");
			else c.__Confirm('',lang._js_js._common._label133,'c.__OnSend(\'ajax_action.php?action=secChange&secretary='+ secEdit +'&sex=\',\'\',c.__func_comm_list,\'sec3\');');
		}
	};

	this.__boxImgHtml=function (winImgUrl,winImgName,B)
	{
		var t="";
		if (winImgUrl=='')return t;
		if(c._action=='charabasic') {

			c.__loadJs(ImgRoot+'js/formcheck.js');
			c.__loadJs(ImgRoot+'js/select.js');
			c._charabasicEdit="";
			winImgName+='<form name=frmcharabasicEdit id=frmcharabasicEdit method=post style="margin:0;padding:0;"><table width=100%  cellspacing=0 ><tr ><td style="padding-left:10px">'



			winImgName+='<span class="selectOut"><span class="selectIn"><select tabindex=1 id="charabasicEdit" style="width:100px" name="charabasicEdit" tabindex="3" class=selectHid >'
			winImgName+='<option value=-1>'+lang._js_js._common._label134+'</option>'
			if(typeof(ConfigUser.MyShow)!='undefined'&&ConfigUser.MyShow!=''){
				winImgName+='<option value="MyShow">'+lang._js_js._common._label135+'</option>';
			}

			for(chara_i in SetCharacter[ConfigUser.user_VSex] ){
				winImgName+='<option value="'+chara_i+'">'+SetCharacter[ConfigUser.user_VSex][chara_i]+'</option>';
			}

			winImgName+="</select></span></span></td>";

			/*winImgName+="籍 贯:</td>"
			+"<td class=tdbg2>"

			+'<div class=selbox2><SELECT id=province onchange=onChangeProv(); name=province class=selectHid></SELECT></div>'
			+'</td></tr><tr><td colspan=2 width=*><div class=selbox3><SELECT id=city name=city class=selectHid><option value=0>请选择</option></SELECT></div>'
			+'<SELECT id=_town style="WIDTH: 50px" onfocus=showRegionNotice(); name=town style="display:none" class=selectHid></SELECT></td></tr><tr><td>';

			*/
			// ---------------------------------------------------------------------------------------------------

			winImgName+="</tr><tr><td colspan='2' style='text-align:center;padding:10px 0;'><span class=\'btn_normal\'><button class='res_button'   onclick=\"c.__OnSend('ajax_action.php?action=charabasicEdit&k='+c._charabasicEdit,'',c.__func_comm_list,'charabasic');return false;\">"+lang._js_js._common._label136+"</button></span></td></tr>";


			winImgName+="<table style='float:left;margin-right:10px;' cellspacing=0 id=MyUCofcHint><tr ><td ><dl style='padding:0;margin:0;' hint=\""+MyUCofcHint+"\"><div class="+strMyUCofcLevel+"></div></dl></td></tr></table>";
			if(isGoldVipsMember) {
				winImgName+="<table style='float:left; margin-right:10px;' cellspacing=0 id=isGoldVip ><tr ><td ><dl style='padding:0;margin:0;' hint=\""+lang._js_js._common._label137+"\"><div ><img src='"+ImgRoot+"images/goldvip/goldvipxz.gif' /></div></dl></td></tr></table>";
			}

			winImgName+="</td></tr></table></form>";
			setTimeout("loadSelect(c._$('charabasicEdit'),setcharabasicEdit);",500);
			//			setTimeout("setProv(0);",200);
			//			setTimeout("loadSelect(c._$('province'),onChangeProv,'province');",300);
			//			setTimeout("loadSelect(c._$('characity'),'','city');",1000);
		}else if(c._action=='userinforead'){
			winImgName+="<table style='float:left;margin-right:10px;'  cellspacing=0  id=MyUCofcHint><tr ><td ><dl style='padding:0;margin:0;' hint=\""+ToUCofcHint+"\"><div class="+strUCofcLevel+"></div></dl></td></tr></table>";
			if(isGoldVipsMember) {
				winImgName+="<table style='float:left; margin-right:10px;' cellspacing=0 id=isGoldVip ><tr ><td ><dl style='padding:0;margin:0;' hint=\""+lang._js_js._common._label137+"\"><div ><img src='"+ImgRoot+"images/goldvip/goldvipxz.gif' /></div></dl></td></tr></table>";
			}
		}else if (c._action == 'sec3'){
			//panfeng 20090519 ------------------------------------------------------------------
			c.__loadJs(ImgRoot+'js/select.js');
			var maleChecked = '';
			var femaleChecked = '';
			om.mainmenuchild('sec')
			if (ConfigUser.secImg.indexOf("sec1")==0||ConfigUser.secImg.indexOf("sec2")==0||ConfigUser.secImg.indexOf("SEC3")==0||ConfigUser.secImg == ''){
				femaleChecked = 'checked';
			}else if (ConfigUser.secImg.indexOf("sec0") == 0){
				maleChecked = 'checked';

			}
			c._secEdit="";

			winImgName+='<form name=frmsecEdit id=frmsecEdit method=post style="margin:0;padding:0;"><table width=100%  cellspacing=0 ><tr><td colspan="2"><label><input type=radio name=secsex '+ maleChecked +' id=male value=0 onclick="checkSecSex(0, \'secEdit0\')" />'+lang._js_js._common._label140+'</label>&nbsp;&nbsp;<label><input type=radio name=secsex '+ femaleChecked +' id=female value=1 onclick="checkSecSex(1, \'secEdit1\')" />'+lang._js_js._common._label141+'</label></td></tr><tr ><td colspan="2">';


			winImgName+='<span class="selectOut"><span class="selectIn"><select tabindex=1 id="secEdit" name="secEdit" tabindex="3" class=selectHid >';
			winImgName+='<option value=-1>'+lang._js_js._common._label138+'</option>';

			if (femaleChecked == 'checked')	{
				for(chara_i in SetSecretary[1] ){
					winImgName+='<option value="'+chara_i+'">'+SetSecretary[1][chara_i]+'</option>';
				}
			}else{
				for(chara_i in SetSecretary[0] ){
					winImgName+='<option value="'+chara_i+'">'+SetSecretary[0][chara_i]+'</option>';
				}
			}
			winImgName+='</select></span></span>' ;

			winImgName+="</td></tr><tr><td colspan='2' style='text-align:center;padding-top:6px'><a href=\"javascript:void(0)\" onclick=\"javascript:c.__secFirstComfirm(c._secEdit);\" class=deepred><b>"+lang._js_js._common._label139+"</b></a></td></tr><tr ><td >";

			winImgName+="</td></tr></table></form>";

			setTimeout("loadSelect(c._$('secEdit'),setSecEdit);",500);//handle by js lang lib
			// ------------------------------------------------------------------------------------
		}else if(c._action == 'jobxms') {
			//panfeng 20090519 ------------------------------------------------------------------
			c.__loadJs(ImgRoot+'js/select.js');
			//var secsex = ConfigUser.user_secsex;
			var maleChecked = '';
			var femaleChecked = '';
			om.mainmenuchild('sec')
			if (ConfigUser.secImg.indexOf("sec1")==0||ConfigUser.secImg.indexOf("sec2")==0||ConfigUser.secImg.indexOf("SEC3")==0||ConfigUser.secImg == ''){
				femaleChecked = 'checked';
			}else if (ConfigUser.secImg.indexOf("sec0") == 0){
				maleChecked = 'checked';

			}

			c._secEdit="";
			winImgName+='<form name=frmsecEdit id=frmsecEdit method=post style="margin:0;padding:0;"><table width=100%  cellspacing=0 ><tr><td colspan="2"><label><input type="radio" name="secsex" style="cursor:pointer;" '+ maleChecked +' id="male" value="0" onclick="checkSecSex(0, \'secEdit\')" />'+lang._js_js._common._label140+'</label>&nbsp;&nbsp;<label><input type=radio name=secsex '+ femaleChecked +' id=female value=1 onclick="checkSecSex(1, \'secEdit\')" />'+lang._js_js._common._label141+'</label></td></tr><tr ><td colspan="2">';


			winImgName+='<span class="selectOut"><span class="selectIn"><select tabindex=1  id="secEdit" name="secEdit" tabindex="3" class=selectHid >';
			winImgName+='<option value=-1>'+lang._js_js._common._label138+'</option>';



			if (femaleChecked == 'checked')	{
				for(chara_i in SetSecretary[1] ){
					winImgName+='<option value="'+chara_i+'">'+SetSecretary[1][chara_i]+'</option>';
				}
			}else{
				for(chara_i in SetSecretary[0] ){
					winImgName+='<option value="'+chara_i+'">'+SetSecretary[0][chara_i]+'</option>';
				}
			}


			winImgName+="</select></span></span></td></tr><tr><td colspan='2' style='text-align:center;padding-top:6px'><a href=\"javascript:void(0)\" onclick=\"javascript:c.__secFirstComfirm(c._secEdit);\" class=deepred><b>"+lang._js_js._common._label139+"</b></a></td></tr><tr ><td >";


			winImgName+="</td></tr></table></form>";

			setTimeout("loadSelect(c._$('secEdit'),setSecEdit);",500);
			// ------------------------------------------------------------------------------------
		}

		if(B=='big')
		{
			if (isIE6)
			{
				t='<div class="L-winImgBig"><div class="winImgShowBig"><img src="'+winImgUrl+'"  width="213" height="352" id="winImgShowBig"></div></div><center><b ><span style="padding:6px;">'+winImgName+'</span></b></center>';
			}else
			{
				t='<div class="L-winImgBig"><div class="winImgShowBig"><img src="'+winImgUrl+'"  width="213" height="353" id="winImgShowBig"></div></div><center><b>'+winImgName+'</b></center>';
			}
		}
		else if(B=='T')
		{
			if (isIE6)
			{
				t='<div class="L-winImg"><div class="winImgShow"><img src="'+winImgUrl+'"  width="100" height="131" ></div></div><center><b ><span style="padding:6px;">'+winImgName+'</span></b></center>';
			}else
			{
				t='<div class="L-winImg"><div class="winImgShow" style="padding-top:8px;#padding-top:1px;_padding-top:1px;"><img src="'+winImgUrl+'"  width="100" height="131"></div></div><center><b>'+winImgName+'</b></center>';
			}
		}
		else{
			if (isIE6)
			{
				t='<div class="L-winImg"><div class="winImgShow"><img src="'+winImgUrl+'" width="100" height="131" id="winImgUrl" class='+c._user_onlieimgCss+'></div></div><center><div style="width:120px;">'+winImgName+'</div></center>';
			}else
			{
				t='<div class="L-winImg"><div class="winImgShow"><img src="'+winImgUrl+'"  width="100" height="131" id="winImgUrl" class='+c._user_onlieimgCss+'></div></div><center><div style="width:120px;">'+winImgName+'</div></center>';
			}
		}
		//panfeng 20090602
		if(c._action == 'characreatequick'){
			t= '<center><div style=\"width:300px;height:50px;\"></div><div class="tdbg1" style="width:360px;height:50px;vertical-align:bottom;text-align:left;"><img src="'+ImgUrl+'createComTitle.gif" width="255" height="27" /></div></center>';
		}

		if(c._action == 'secCreate'){
			t= '<center><div style=\"width:300px;height:10px;\"></div><div class="tdbg1" style="width:580px;height:27;vertical-align:bottom;text-align:center;"><img src="'+ImgUrl+'secCreateTitle.gif" width="255" height="27" /></div></center>';
		}

		if (c._action.indexOf('building') !=-1) {
			winImgUrl=ImgUrl+'building/'+tmpbuildingL+'.jpg';

			if(c._action =='buildingShowOther') {
				winImgUrl=ImgUrl+'building/'+otherUserBuildingId+'.jpg';
			}
			t='<div class="L-winImgBig"><div class="winImgShowBig"><img src="'+winImgUrl+'"  width="213" height="352" id="winImgShowBig"></div></div>';
		}

		/*//panfeng 20090604
		if(c._action == 'charaInfoEdit'){
		t= '<center><div style=\"width:300px;height:50px;\"></div><div class="tdbg1" style="width:330px;height:50px;vertical-align:bottom;text-align:left;">请注意:此信息只能修改一次,请慎重选择！</div></center>';
		}*/

		return t;
	};
	this.__boxUpHtml=function (s)
	{
		var t1,t2="";
		if (!s)return

		t1="<table width=138  cellspacing=0  style='border:none;margin:0;padding:0'>";
		t1+="<tr><td width=\"19\" style='border:none;margin:0;padding:0'><img src=\""+ImgUrl+"companyUp1.png\" width=\"19\" height=\"53\" \/></td><td background=\""+ImgUrl+"companyUp2.png\"    style='border:none;margin:0;padding:0px;'><b>";
		t2="</b></td><td width=\"19\"  style='border:none;margin:0;padding:0'><img src=\""+ImgUrl+"companyUp3.png\" width=\"19\" height=\"53\" \/></td></tr>";
		t2+="</table><br>";

		return t1+s+t2;
	};
	this.__boxTaskHtml=function (s)
	{
		var t1,t2="";
		if (!s)return

		t1="<table class='taskwindow' style='width:297px; '   cellspacing=0  >"
		t1+="<tr><td style='padding:10px;text-align:left;' valign=top><div class='jobtaskbar' style='clear:both;position:relative;'>";

		t2="<span style='clear:both;'></span></div></td></tr><tr><td height=20 valign=top align=center><span class=\'btn_normal\'><button   onclick=\"c.__CloseTaskWindow();c.__OnSend('ajax_action.php?action=assistTake&actGet=applyProcess','',c.__func_comm_list,'assistTake','applyProcess');\" style='position:relative;'>"+lang._js_js._common._label142+"</button></span><span class=\'btn_normal\'><button   onclick=\"c.__CloseTaskWindow()\" style='position:relative;'>"+lang._js_js._common._label143+"</button></span></td></tr></table>";

		return t1+s+t2;

	};
	this.__boxTaskWaitHtml=function (s)        //等待队列的模板 - 窗口 by Manson [09-07-12]
	{
		var t1,t2="";
		if (!s)return

		t1="<table class='taskwindowwait' style='width:297px; '   cellspacing=0  >"
		t1+="<tr><td style='padding:10px;text-align:left;' valign=top><div class='jobtaskbar' style='clear:both;position:relative;'>";
		t2="<span style='clear:both;'></span></div></td></tr><tr><td height=20 valign=top align=center><span class=\'btn_normal\'><button   onclick=\"c.__CloseTaskWindow();c.__OnSend('ajax_action.php?action=assistTake&actGet=applyProcess','',c.__func_comm_list,'assistTake','applyProcess');\" style='position:relative;'>"+lang._js_js._common._label142+"</button></span><span class=\'btn_normal\'><button   onclick=\"c.__CloseTaskWindow()\" style='position:relative;'>"+lang._js_js._common._label143+"</button></span></td></tr></table>";
		return t1+s+t2;

	};
	this.__boxGsTaskWaitHtml=function (s)        //金牌秘书安排队列 - 窗口 by Manson [09-07-12]
	{
		var t1,t2="";
		if (!s)return

		var canUse = '';      //判断如果没有ptid的值,传过来,就不能使用清除队列按钮
		if (typeof(o.ptid) == 'undefined' || o.waitProNum==0)
		{
			canUse = 'disabled';
		}

		t1="<table class='gstaskwindow' style='width:490px;'  cellspacing=0  >"
		t1+="<tr><td style='padding:35px 15px 0 25px;text-align:left;' valign=top>";
		t2="</td></tr>";
		s+="<div style='text-align:center; height:25px; position: absolute; margin-top: 215px; width: 450px;'><span class=\'btn_normal\'><button " + canUse + " class='button_0712' onMousemove='button_move_0712(this)' onMouseout='button_out_0712(this)' onclick=\"confirmDelProcess();\" style='position:relative;'>Xóa hết</button></span>";
		s+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		s+="<span class=\'btn_normal\'><button onclick=\"c.__CloseTaskWindow()\" style='position:relative;'>Đóng</button></span></div></td></tr></table>";
		return t1+s+t2;

	};
	this.__boxSmallHtml=function (s,Tclass)
	{
		var t1,t2="";
		if (!s)return

		t1="<table class='"+Tclass+"' style='width:343px;'   cellspacing=0  >"
		t1+="<tr><td style='padding:10px;padding-top:50px;text-align:left;clear:both;position:relative;' valign=top>";
		t2="<span style='clear:both;'></span></td></tr></table>";
		return t1+s+t2;

	};
	/**函数  __OnCloseWid
	*打开对象
	*/
	this.__OnCloseWid=function (){//alert(this._action);
		try{
			if (this._$(this._g_name))this._$(this._g_name).style.display = "none";
			$('mainhostMap').innerHTML='';
			if (this._$(this._objname))this._$(this._objname).style.display = "none";
			if (this._$('centermenu'))this._$('centermenu').style.display = "none";
			if (this._$('startBusiness'))this._$('startBusiness').style.display = "none";
			if (this._$('OpenLeft'))this._$('OpenLeft').style.display = "none";
			if (this._$('OpenRight'))this._$('OpenRight').style.display = "none";
			if (this._$('OpenLeftBig'))this._$('OpenLeftBig').style.display = "none";
			if (this._$('OpenLeftT'))this._$('OpenLeftT').style.display = "none";
			if (this._$('msg_SH'))this._$('msg_SH').style.display = "none";
			if (this._$('CreateShopHint'))this._$('CreateShopHint').style.display = "none";
			if (this._$('CreateLandHint'))this._$('CreateLandHint').style.display = "none";
			//if (this._$('map_map'))this._$('map_map').innerHTML = '<span onclick="Load_Map(1)" style="width:100%;height:50px;cursor:pointer;position:relative;"></span>';
			if (this._$('map_map'))this._$('map_map').innerHTML = '<span onclick="c.__OnSend(\'ajax_action.php?action=logonreward\',\'\',c.__func_comm_list,\'logonreward\');" style="width:100%;height:50px;cursor:pointer;position:relative;"></span>';
			this.__OnCloseMouseHint();//关闭鼠标提示
		}
		catch(e){}
	};
	this.__OnCloseMouseHint=function (){//关闭鼠标提示
		//var objs= new Array('callingpat','callingalt','charabasichint','FinanceListAlt');,'mapmain'
		var objs= new Array('callingpat','callingalt','thingalt','thing3onealt','callingpat','thing3onealt','mapmain','FinanceListAlt','characard','HintUPolicy','CampaignVotePage','ShopRead','thingstructure','employeeAlt','UnionU','userinfo4','charabasichint','mediaCenter','mainhostMap','altbuild');
		//var objs2= new Array('dl','dd','dl','dd');
		var objs2= new Array('dl','dd','dl','dl','dl','dl','dl','dl','dl','dl','dl','dl','dl','dl','dl','span','dl','dl','dl');
		var obj;
		for(j in objs){
			obj= this._$(objs[j]);
			if(obj){
				var elems = obj.getElementsByTagName(objs2[j]);
				for(var i=0; i<elems.length; i++){
					elems[i].onmouseover = function(){return;}
					elems[i].onmouseout();
				}
			}
		}
	};
	/**函数  __OnOpenWid
	*打开对象
	*/
	//name,title,contents,error,parobj,width,height
	this._parentname='';
	this.__OnOpenWid=function (){

		this._Htmlbg='';//背景
		this._height=0;//背景
		a=arguments[0];if(!a){return;}
		b=arguments[1];
		if(typeof b != 'undefined'){this._sId=b||0;}

		this._g_name = a['name'] || this.__GetLabelName(); //创建对象名
		var g_title = a['title'] || ''; //标题
		var g_contents = a['contents'] || ''; //内容
		var g_error = a['error'] || ''; //错误
		var g_appointObj = a['appointObj'] || null; //定位对象名
		var g_zindex = a['zindex'] || 0; //层排序位置
		var g_width = a['width'] || '500'; //宽度
		var g_height = a['height'] || '400'; //高度
		var g_left = a['left'] || '10'; //左位置
		var g_top = a['top'] || '17'; //顶位置

		this._parentname=a['parentname']||'main1';//父类div名称(同个父类名可以互换标签显示)
		var g_menuAction=a['menuaction']||'';//栏目区分
		if (g_menuAction!='EmplyeeRead'&&g_menuAction!='FactoryRead'&&g_menuAction!='MyCarRead'&&g_menuAction!='MyGood'&&g_menuAction!='MyFashion'){
			this._action=a['action']||'0';//栏目区域区分
			this._action_prowse=a['action_prowse']||null;//浏览内容
		}
		this._EnabledNext=a['EnabledNext']||false;//任务安装状态
		this._MapId=a['MapId']||0;//地图ID
		this._TaskId=a['TaskId']||0;//工作ID
		if(!this._g_name)return;

		if (g_menuAction=='worldMsg'){g_width=200;g_height = 250;}

		if (g_menuAction=='FactoryRead'||g_menuAction=='MyCarRead'||g_menuAction=='MyFashion'||g_menuAction=='MyGood'||g_menuAction=='Instructor'){g_width=216;g_height = 'auto';}

		if (g_menuAction=='EmplyeeRead'){
			g_width = 256;
			g_height = 'auto';
		}

		this._height=g_height;
		this.__OnWid(this.__createWin(this._g_name,g_appointObj,g_width,g_height,g_left,g_top,g_zindex));//创建对象

		var s;
		s="<table height=4 cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";

		if (g_title!=''&&g_menuAction!='Hint')
		{
			s+="<span style=\"color:'#1E0900';font-size:14px;filter:glow(color=#6A4201,strength=1);\"><strong>"+g_title+"</strong></span>";
			s+="<hr size=1 width='98%' class='hr1_wid' align=left>";
		}

		s+="<div style='height:auto;margin-right:5px;padding:4px 4px;'>";//hrbackground-color:#E1E1E1;

		if (g_menuAction=='NewTask')
		{
			s+=this.__NewTask_Tpl(g_contents,this._g_name);
		}
		else if (g_menuAction=='MenuChild')
		{

			s+=this.__MenuChild_Tpl(g_contents,this._g_name);
		}
		else if (g_menuAction=='Hint')
		{

			s+=this.__Hint_Tpl(g_contents,this._g_name);
		}
		else if (g_menuAction=='FactoryRead')
		{
			s+=this.__FactoryRead_Tpl(g_contents,this._g_name);
		}
		else if (g_menuAction=='EmplyeeRead')
		{
			s+=this.__EmplyeeRead_Tpl(g_contents,this._g_name);
		}
		else if (g_menuAction=='MyCarRead')
		{
			s+=this.__MyCarRead_Tpl(g_contents,this._g_name);

		}else if (g_menuAction=='MyFashion')
		{
			s+=this.__MyFashion_Tpl(g_contents,this._g_name);

		}else if (g_menuAction=='MyGood')
		{
			s+=this.__MyGood_Tpl(g_contents,this._g_name);

		}else if (g_menuAction=='Instructor')
		{
			s+=this.__Instructor_Tpl(g_contents,this._g_name);

		}
		else if (g_menuAction=='worldMsg')
		{
			s+=this.__worldMsg_Tpl(g_contents,this._g_name);
		}
		else{
			s+=g_contents;
		}
		s+="</div>";
		if(g_menuAction=='EmplyeeRead'||g_menuAction=='FactoryRead'||g_menuAction=='MyCarRead'||g_menuAction=='MyFashion'||g_menuAction=='MyGood'||g_menuAction=='Instructor'||c._g_name=='CreateLandHint'){
			this._$(this._g_name).innerHTML=s;
		}else{
			this.__innerHtml(this._g_name,s);//给对象写入内容；
		}
	}

	this.__OpenHostRight= function (){
		//c.__OnCloseWid();
		//om.OnNewFlow();
		this.__setCancelGuaye=null;
		var s="";
		this._height=0;//背景
		a=arguments[0];if(!a){return;}
		b=arguments[1];if(typeof b != 'undefined'){this._sId=b||0;}
		//this._objname = "host_right";
		this._parentname = a['parentname'] || 'host_right'; //父类div名称(同个父类名可以互换标签显示)
		this._objname = this._parentname;
		this._loadSelect = this._objname; //下拉父窗口
		var g_title = a['title'] || ''; //标题
		var g_contents = null;
		g_contents = a['contents'] || ''; //内容
		var g_menuAction = a['menuaction'] || ''; //栏目区分
		var g_error = a['error'] || ''; //错误
		var g_appointObj = a['appointObj'] || null; //定位对象名
		var g_width = a['width'] || 520; //宽度
		var g_height = a['height'] || 410; //高度
		var g_left = a['left'] || 140; //左位置
		var g_top = a['top'] || 10; //顶位置
		var g_zindex = a['zindex'] || 4; //顶位置
		this._action = a['action'] || '0'; //栏目区域区分
		this._action_prowse = a['action_prowse'] || null; //浏览内容
		this._action_window = a['action_window'] || null; //浏览窗口
		if(parseInt(g_error)===1)alert(lang._js_js._common._label145)

		if(this._action=='employeefull'||this._action=='shopfull'||this._action=='wonbtotest'||this._action=='wonbtoVsCrossList'){//2008-10-10
			s+=this.__MenuChild_Tpl(g_contents,this._objname);
			this.__OpenBigWindow(s);return ;

		}else if (this._action=='jobtask'){
			s+=this.__MenuChild_Tpl(g_contents,this._objname);
			this.__OpenTaskWindow(s);return;
		}else if (this._action=='charaBatchPercent'){
			s+=this.__MenuChild_Tpl(g_contents,this._objname);
			this.__OpenSmallWindow(s,"Smallwindow");return;
		}else if (this._action=='employeeDivideNew'){
			s+=this.__MenuChild_Tpl(g_contents,this._objname);
			this.__OpenSmallWindow(s,"Smallwindow");return;
		}else if (this._action=='wonbtosendword'){
			s+=this.__MenuChild_Tpl(g_contents,this._objname);
			this.__OpenSmallWindow(s,"");return;//Smallwindow=样式
		}else if (this._action=='charabatchemp'){
			s+=this.__MenuChild_Tpl(g_contents,this._objname);
			this.__OpenSmallWindow(s,"employeewindow");return;
		}else if (this._action=='cofcBatchvote'){
			s+=this.__MenuChild_Tpl(g_contents,this._objname);
			this.__OpenSmallWindow(s,"cofcBatchvote");return;
		}else if (this._action=='assistTake' && this._action_prowse=='processWaitList'){  //队列等待 - 窗口 by Manson [09-07-12]
			s+=this.__MenuChild_Tpl(g_contents,this._objname);
			this.__OpenTaskWaitWindow(s);return;
		}else if (this._action=='assistTake' && this._action_prowse=='gsWaitProcessList'){    //金牌小秘书任务安排队列 - 窗口 by Manson [09-07-12]

			s+=this.__MenuChild_Tpl(g_contents,this._objname);
			this.__OpenGsTaskWaitWindow(s);return;
		}

		/*改变 总资产和 Xu*/
		this._user_onlieimgCss='';
		//this._action!='s_horn' && this._action!='worldMsgShow' &&wonbtosendword
		if( this._action!='employeefull'&&  this._action!='shopfull'&&  this._action!='wonbtotest'&& this._action!='wonbtoVsCrossList'&& this._action!='wonbtosendword'){//非小喇叭的按正常操作(本if的下列操作),小喇叭不按下面的进行操作
			this.__OnCloseWid();
			this._Htmlbg='';//背景
			if ($('mainhost').innerHTML)$('mainhost').innerHTML='';

			if (this.__disabledst==false&&g_menuAction!='Hint'&&this._preAction!=(this._action+"_"+this._action_prowse+"_"+b))
			{
				this._st.push(arguments);
				this._preAction=this._action+"_"+this._action_prowse+"_"+b;
			}
			this.__disabledst=false;
		}//this._action!='sendMessage' &&this._action!='comMsg' &&
		if( this._action!='DoActive' && this._action!='thingcompanyleague'){
			if (this._$('OpenRight'))this._$('OpenRight').style.display = "none";		//隐藏右边头像
		}

		var ofilter = "1";
		var ImgStat=1;
		var ImgStatShow='L';

		if (this._action=='NewUserFlow')
		{

			ImgStat=4;
			o=g_contents.o;
			if(IsTrue(o.InvestorsName))this._InvestorsName=o.InvestorsName;

		}

		if (g_menuAction=='stock'){
			ImgStat=0;
			g_left = 16;
			g_width=660;
			s+=this.__Stock(g_contents,this._objname);
		}
		else if (g_menuAction=='daynews'){
			ImgStat=0;
			g_left = 16;
			g_width=660;
			s+=this.__DayNews(g_contents,this._objname);
		}
		else if (g_menuAction=='calling'){
			ImgStat=0;
			g_left = 30;
			g_width=630;
			s+=Calling_Tpl(g_contents,this._objname);


		}else if (g_menuAction=='MenuChild') {


			s+=this.__MenuChild_Tpl(g_contents,this._objname);
			if(this._action=='employeefull'||this._action=='shopfull'||this._action=='wonbtotest'||this._action=='wonbtoVsCrossList'){//2008-10-10

				this.__OpenBigWindow(s);return false;

			}else if (this._action=='sec1' || this._action=='invest1'){

				if(this._action=='sec1')ImgStat=2; else ImgStat=3;
				ImgStatShow="B";
				g_width=390;
				g_left=260;
			}
			else if (this._action=='charagoods'||this._action=='treasurekursaal'||this._action=='shopcar'||this._action=='shophirecar'||this._action=='shopmycar'||this._action=='factorystoreroom')
			{
				//this._height=370;
			}else if (this._action=='mayor'){
				ImgStat=33; ImgStatShow="B";g_width=390;g_left=260;
			}else if (this._action=='cityboon'){
				ImgStat=45; ImgStatShow="B";g_width=390;g_left=260;g_height = 395;
			}else if (this._action=='citykursaal' || this._action=='cityktaskIntro'){
				ImgStat=46; ImgStatShow="B";g_width=390;g_left=260;
			}else if (this._action=='cityFate' || this._action=='buildingCreate' ){

				ImgStat=47; ImgStatShow="B";g_width=390;g_left=260;
			}else if (this._action=='cityBooklet' || this._action=='cityBottle'){

				ImgStat=50; ImgStatShow="B";g_width=390;g_left=260;
				this.__OpenLeftOrRight(50,'B');
			}else if (this._action.indexOf('building') !=-1) {
				ImgStat=47; ImgStatShow="B";g_width=390;g_left=260;
			}
			else if(this._action=='NewUserFlow'){
				o=g_contents.o
				if(typeof o.ImgStat != 'undefined')ImgStat = o.ImgStat;
			}else if(this._action=='invest3'){
				//alert('xeeo');
				ImgStat = 4;
				if(!IsTrue(this._InvestorsName)){
					o=g_contents.o
					if(IsTrue(o.InvestorsName))this._InvestorsName=o.InvestorsName;
				}

			}else if((this._action=='thing4')&&this._action_prowse!=null&&this._action_prowse>=1&&this._action_prowse<=5){
				ImgStat = 23;
				o=g_contents;
				this._Price = 0;
				if (typeof o =="object"){this._GradeCss=o[this._sId].GradeCss;this._pic=o[this._sId].BigImg;this._name=o[this._sId].Name;this._i=this._sId;}
			}else if(this._action=='applycofc'){
				ImgStat = 25;

			}else if(this._action=='cofcpolicy' ||this._action=='unionpolicy' ||this._action=='secCreate'){//cofcpolicy
				ImgStat = 0;
				g_left = 10;
				g_width = 640;
				g_height = 410;
			}else if(this._action=='cityf500w'){
				ImgStat = 0;
				g_left = 10;
				g_width = 640;
				g_height = 410;
			}else if (this._action=='stockMarket'&&this._action_prowse==9){  // add by Manson [09-06-24]
				ImgStat = 0;
				g_top = 8;
				g_left = 10;
				g_width = 640;
				g_height = 410;
			}else if (this._action=='showFashionListLot'){  // add by Manson [09-08-21]
				ImgStat = 0;
				//g_top = 8;
				g_left = 10;
				g_width = 640;
				g_height = 410;
			}else if (this._action=='wonbtoempshow' || this._action=='wonbtofreedom'||this._action=='wonbtopromotion' || this._action=='wonbto' && c._action_prowse==4 || this._action=='cityDonateBook' || this._action=='cityDonateBottle' || this._action == 'wonbtovs' || this._action =='wonbtoVsCrossVsShow' || this._action == 'thingfireemployee' ){
				ImgStat = 0;
				g_left = 10;
				g_width = 640;
				g_height = 410;
			}else if (this._action == 'wonbtoVsCross'){
				ImgStat = 0;
				g_left = 10;
				g_width = 640;
				//g_height = 375;
			}else if (this._action=='logonreward'){  // add by Manson [09-07-10]
				ImgStat = 0;
				g_top = 8;
				g_left = 10;
				g_width = 640;
				//g_height = 396;
			}else if(this._action=='buck'){
				ImgState = 0;
			}
			else if(this._action=='s_horn' )//for horn
			{
				//ImgStat = 0;
				g_left = 797;
				g_top = 63;
				g_width = 195;
				g_height = 440;
			}
			else if (this._action=='invest2')
			{
				if(!IsTrue(this._InvestorsName)){
					o=g_contents.o
					if(IsTrue(o.InvestorsName))this._InvestorsName=o.InvestorsName;
				}
				this.__OpenLeftOrRight(4,'R');
				g_width=370;

			}else if (this._action=='thingcompanysreadone' && this._action_prowse==1){//与好友互动时
				if (typeof o =="object"){
					this._mycomp_pic=o.MyImg;
					this._mycomp_name=o.MyCompanyName;
					this._my_Industry=o.MyIndustryName;

					this._mycomp_picTO=o.Img;
					this._mycomp_idTO=o.Id
					this._mycomp_nameTO=o.CompanyName;
					this._my_IndustryTO=o.IndustryName;
				}

				g_width=370;
				this.__OpenLeftOrRight(39,'R');
				ImgStat=38;
			}else if (this._action=='characardexchange'){//与好友互动时
				o=g_contents.o;
				if (typeof theU =="object"){
					this._myuser_pic=theU._myuser_pic;
					this._myuser_id=theU._myuser_id;
					this._myuser_name=theU._myuser_name;
					this._myuser_vcity=theU._myuser_vcity;

					this._user_pic=theU._user_pic;
					this._user_id=theU._user_id;
					this._user_name=theU._user_name;
					this._user_vcity=theU._user_vcity;
				}

				g_width=370;
				this.__OpenLeftOrRight(6,'R');
				ImgStat=35;
			}else if (this._action=='characreate')
			{
				ImgStat=0;
				g_width=520;
				ofilter = 0;
			}else if ((this._action=='NPClandStorm'&&this._action_prowse==4)||(this._action=='wonbtoempshow'&&this._action_prowse==2)||(this._action=='Turist'&&this._action_prowse==5))
			{
				ImgStat=0;
				g_width=630;
				g_left=20;
				ofilter = 0;
			}else if(this._action=='multiselect')
			{
				ImgStat=0;
				g_width=630;
				g_left=20;
				ofilter = 0;
			}else if(this._action=='wonbtotestTable')
			{
				ImgStat=0;
				g_width=630;
				g_left=10;
				g_top = 10;
				ofilter = 0;
			}else if (this._action=='characreatequick')
			{
				ImgStat=0;
				g_width=520;
				ofilter = 0;
			}else if (this._action=='secCreate')
			{
				ImgStat=0;
				g_width=520;
				ofilter = 0;
			}else if (this._action=='charaInfoEdit')
			{
				ImgStat=0;
				g_width=520;
				ofilter = 0;
			}else if (this._action=='city1' || this._action=='city2' || this._action=='city3' ||this._action=='city15' || this._action== 'street')
			{

				if(this._action=='city1'){
					ImgStat=15;
				}else if(this._action=='city2'){
					ImgStat=16;
				}else if(this._action=='city3'){
					ImgStat=17;
				}else if(this._action=='city15'){
					ImgStat=48;
				}else if(this._action_city=='city30'){
					ImgStat=49;
				}else if(this._action_city=='city5'){ //工厂
					ImgStat=21;
				}else{
					ImgStat=this._pImgStat;
					if(this._action_city!=""){
						ImgStat = (this._action_city=='city1')?15:((this._action_city=='city2')?16:(this._action_city=='city0'?17:48));
					}
				}
				this._pImgStat = ImgStat;
				ImgStatShow="B";
				g_left=260;
				g_width=390;
			}
			else if (this._action=='LoginInfo')
			{
				ImgStat=22;
			}
			else if (this._action=='factoryShow')//20081023 Ason
			{
				if (typeof o =="object"){
					this._factory_pic=o.Img;
					this._factory_name=o.Name;
					this._factory_id=o.Id;}
				ImgStat=0;
				//g_height=396;
				g_width = 630;
				g_top = 8;
				g_left = 15;
			}
			else if (this._action=='thingcompanysread'&&this._action_prowse=='1')
			{
				o=g_contents;
				if (typeof o =="object"){this._com_pic=o[this._sId].Img;this._com_id=o[this._sId].CompanyName;}
				ImgStat=8;
			}
			else if (this._action=='thingcompanysreadone')
			{

				o=g_contents.o;
				if (typeof o =="object"){this._com_pic=o.Img;this._com_id=o.CompanyName;this._com_cid=o.Id;}
				ImgStat=34;
			}
			else if (this._action=='thing3' && ( this._action_prowse == 8))//this._action_prowse == 6 ||
			{

				o=g_contents.o;
				this._Price = 0;
				if (typeof o =="object"){
					if(o.ucount == 1){
						this._pic=o.Img.replace('.gif','.jpg');
						this._name=o.Name;
						this._id=o.Id;
						ImgStat=23;
					}
				}
			}
			else if ((this._action=='thing3' || this._action=='thing4') && this._action_prowse>0 && this._action_prowse != 5 && this._action_prowse != 6&& this._action_prowse != 1)
			{
				o=g_contents;
				this._Price = 0;
				if (typeof o =="object"){this._pic=o[this._sId].Img.replace('.gif','.jpg');this._name=o[this._sId].Name;this._i=this._sId}
				ImgStat=23;
			}
			else if ( this._action=='thing3one'||(this._action=='employeedig'&&(this._action_prowse==1||this._action_prowse==2))||this._action=='employeebuild'||this._action=='employeecommunicate'||this._action=='employeejob'||this._action=='thingEmployeeAdvanced' ||this._action=='thingEmployeeIQ'||  (this._action=='SAMIBC'&&this._action_prowse!=2))
			{
				this._sId= 0;
				this._Price = 0;

				o=g_contents.o;
				if (typeof o =="object"){this._pic=o[this._sId].Img.replace('.gif','.jpg');this._name=o[this._sId].Name;
				this._GradeCss=o[this._sId].GradeCss;this._i=this._sId;this._Price=o[this._sId].Price;}
				ImgStat=23;
				//this._height=360;
			}
			else if(this._action=='SAMIBC'&&this._action_prowse==2){
				ImgStat=40;
			}else if(this._action=='empshowfulljob' || this._action=='employeecommuLot'){
				this._height=176;
			}else if (this._action=='empshowfullgoutong'){
				this._height = 140;
			}else if ( this._action=='thingcompete')
			{

				ImgStat=32;
			}
			else if (this._action=='thing1'||(this._action=='thing5' && this._action_prowse==null)||this._action=='thingjob'||this._action=='thingcompanycourse'||this._action=='thing8')
			{
				this._com_id=Config_thing1.CompanyName;
				this._com_pic=Config_thing1.Img;
				ImgStat=8;
			}
			else if (this._action=='thing5' && this._action_prowse==2)
			{

				ImgStat=32;
			}
			else if (this._action=='thing6')
			{
				this._com_id=Config_thing1.CompanyName;
				this._com_pic=Config_thing1.Img;
				ImgStat=8;
			}
			else if (this._action=='thingcompanyshops')
			{
				o=g_contents;
				//alert(o.CompanyImg+'+'+o.CompanyName);

				if (typeof o =="object"){
					try{
						if(typeof(this._sId) == 'undefined'){
							this._com_pic=o.CompanyImg;
							this._com_id=o.CompanyName;
							this._comid=o.CompanyId
						}else{
							this._com_id=o[this._sId].CompanyName;
							this._com_pic=o[this._sId].Img;
						}
					}catch(e){}
				}
				ImgStat=8;
			}
			else if(this._action == 'thingshopsevent'){
				ImgStat=32;
			}
			else if (this._action=='thingshopsupgrade')
			{
				o=g_contents.o;
				if (typeof o =="object"){
					if(o.CurrentShopImg != 'undefined' && o.CurrentShopImg != null){
						this._shop_name= o.ShopName;
						this._shop_pic= o.CurrentShopImg;
					}
				}
				ImgStat=32;
			}
			else if (this._action=='userinforead')
			{
				o=g_contents.o;
				if (typeof o =="object"){this._user_pic=o.OtherVFace;this._user_id=o.OtherUserId;this._user_name=o.OtherUserName;this._user_onlieCss=o.onlieCss;this._user_onlieimgCss=o.onlieimgCss;}
				ImgStat=9;
				//this._height=370;
			}
			else if(this._action=='MyUCofc'  || this._action=='UnionOrgan'  || this._action=='UnionSetup' || this._action=='UnionOrganUpgrade' || this._action=='UnionUpgrade' || this._action=='UnlayUnion' ||this._action=='UnionCancelGrade' || this._action=='UnionOffertory')
			{
				//商会
				o=g_contents.o;
				if (typeof o =="object"){
					if(o.Img != 'undefined' && o.Img != null){
						this._cofc_pic=o.Img;
						this._cofc_id=o.Id;
						this._cofc_name=o.Name;
					}

					this.joinGoldVip=false;
					this.isOwerJoinGoldVip=false;
					this.joinGoldVipInfo={};
					this.joinGoldVipDescription="";
					if(typeof(o.joinGoldVip) !='undefined') {
						this.joinGoldVip=o.joinGoldVip;
						if(this.joinGoldVip) {
							this.joinGoldVipInfo=o.joinGoldVipInfo;
						}
						this.isOwerJoinGoldVip=o.isOwerUnion;
						this.joinGoldVipWhatNow=o.joinGoldVipWhatNow;
					}
				}
				ImgStat=37;
				//this._height=370;
			}
			else if(this._action=='email' || this._action=='sec3' || this._action=='jobxms' || this._action=='assistTake')
			{
				//小秘书
				ImgStat=22;
				//this._height=370;
			}
			else if (this._action=='shop2' || this._action=='shop4' || this._action=='shopFashion'||this._action=='shopbuypage'){

				o=g_contents.o;

				if (typeof o =="object"){this._user_pic=o['userpic'];this._user_id=o['username'];this._user_money=o['usermoneys'];this._user_gold=o['usergolds'];this._user_liquan=o['liquan'];}
				ImgStat=10;
				//this._height=370;
			}else if (this._action=='citymayor'){
				ImgStat=11;
				ImgStatShow="B";
				g_left=260;
				g_width=390;
			}else if (this._action=='citybafeite'){
				ImgStat=41;
				ImgStatShow="B";
				g_left=260;
				g_width=390;
			}
			else if (this._action=='landStorm'&&this._action_prowse!=5&&this._action_prowse!=6){

				ImgStat=42;
				ImgStatShow="B";
				g_left=260;
				g_width=390;
				if(c._landStormName=='undefined' ||c._landStormName==''){
					//c._landStormName="和平公园";
					c._landStormId=1;
				}
			}else if (this._action=='composeClub'||this._action=='composeMedal'||this._action=='composeVehicle'||this._action=='composeTempVehicle'||this._action=='composeComVehicle'||this._action=='composeSetName'||this._action=='compComSetName'||this._action=='composeFashion'){

				ImgStat=47;
				ImgStatShow="B";
				g_left=260;
				g_width=390;
				this.__OpenLeftOrRight(47,'B');
			}else if (this._action=='NPClandStorm'&&this._action_prowse!=4&&this._action_prowse!=8&&this._action_prowse!=9&&this._action_prowse!=10&&this._action_prowse!=11&&this._action_prowse!=12){

				ImgStat=42;
				ImgStatShow="B";
				g_left=260;
				g_width=390;
				if(c._landStormName=='undefined' ||c._landStormName==''){
					//c._landStormName="和平公园";
					c._landStormId=1;
				}
			}else if (this._action=='mediaCenter'||this._action=='mediajCenterFinance'){//媒体中心 , 金融版
				ImgStat=43;
				ImgStatShow="B";
				g_left=260;
				g_width=390;
				if(c._action_prowse==1){
					//ImgStat=1;
					//ImgStatShow="L";
					g_left=15;
					g_width=660;
				}

			}else if (this._action=='recruit'||this._action=='recruitEmp'){//招聘会
				ImgStat=60;
				ImgStatShow="B";
				g_left=260;
				g_width=390;
				if(c._action_prowse==1){
					//ImgStat=1;
					//ImgStatShow="L";
					g_left=15;
					g_width=660;
				}
				this.__OpenLeftOrRight(60,'B');
			}else if (this._action=='cityB24'){
				ImgStat=12;
				ImgStatShow="B";
				g_left=260;
				g_width=390;
			}
			else if (this._action=='cityvenice'){
				ImgStat=13;
				ImgStatShow="B";
				g_left=260;
				g_width=390;
			}
			else if (this._action=='citypiazza'){
				ImgStat=14;
				ImgStatShow="B";
				g_left=260;
				g_width=390;
			}
			else if (this._action=='cityDGS'){
				ImgStat=18;
				ImgStatShow="B";
				g_left=260;
				g_width=390;
			}
			else if (this._action=='citysummarize'){
				ImgStat=19;
				ImgStatShow="B";
				g_left=260;
				g_width=390;
			}
			else if (this._action=='taxis1'){
				ImgStat=26;
				ImgStatShow="T";

			}
			else if (this._action=='taxis9'){
				ImgStat=95;
				ImgStatShow="T";

			}
			else if (this._action=='taxis2'){
				ImgStat=27;
				ImgStatShow="T";
			}
			else if (this._action=='taxis3'){
				ImgStat=28;
				ImgStatShow="T";
			}
			else if (this._action=='taxis4'){
				ImgStat=29;
				ImgStatShow="T";
			}
			else if (this._action=='taxis5'){
				ImgStat=30;
				ImgStatShow="T";
			}
			else if (this._action=='taxis6'||this._action=='taxis7'||this._action=='taxis7'){
				ImgStatShow="T";
			}else if (this._action=='Turist'){
				ImgStat=44;
				ImgStatShow="B";
				g_left=260;
				g_width=390;
				if(this._action_prowse==2){
					g_height=400;
				}
			}
			else if (this._action=='newactivity' && c._action_prowse!=1){
				ImgStat=55;
				ImgStatShow="B";
				g_left=260;
				g_width=390;
			}
			else if (this._action=='newhome' && c._action_prowse!=1){
				ImgStat=56;
				ImgStatShow="B";
				g_left=260;
				g_width=390;
			}
			else if (this._action=='shopMystery' ){
				ImgStat=57;
				ImgStatShow="B";
				g_left=260;
				g_width=390;
			}
			else if (this._action=='wonbto' && c._action_prowse==null){
				ImgStat=58;
				ImgStatShow="B";
				g_left=260;
				g_width=390;
			}else if (this._action=='wonbtoaward'){
				ImgStat=59;
				ImgStatShow="B";
				g_left=260;
				g_width=390;
			}

		}else if (g_menuAction=='Companys'){
			s+=this.__Companys_Tpl(g_contents);
			ofilter = "0";

		}else if(g_menuAction=='shopsell'){
			s+=ShopSell_Tpl(g_contents);
			ofilter = '0';
			ImgStat=32;
		}else if (g_menuAction=='shopbuy') {
			s+=ShopBuy_Tpl(g_contents);
			ofilter = "0";
			ImgStat = 32;
		}
		else if (g_menuAction=='shopadv')
		{
			s+=ShopAdv_Tpl(g_contents);
			ofilter = '0';
			ImgStat=32;
		}
		else if (g_menuAction=='ShopRead')
		{
			o=g_contents.o;
			if (typeof o =="object"){
				this._shop_name= o.ShopName;
				this._shop_pic= o.CurrentShopImg;
			}
			//ImgStat=32;
			ImgStat=0;
			g_width = 630;
			g_height = 410;
			g_left = 15;
			g_top = 10;
			s+=ShopRead_Tpl(g_contents);
			ofilter = "0";
			////this._height=370;
		}
		else if (g_menuAction=='MoveShop')
		{
			s+=MoveShop_Tpl(g_contents);
			ofilter = "0";
		}
		else if (g_menuAction=='JoinVote')//空位,参与竞选和投票
		{	s+=this.__JoinVote_Tpl(g_contents);
		ofilter = "0";
		}
		else if (g_menuAction=='NockVote'||g_menuAction=='NockVote2')//有人任职
		{
			o=g_contents.o;
			if (typeof o =="object"){this._user_pic=o.VFace;this._user_id=o.UserId;this._user_name=o.UserName;}
			ImgStat=9;
			if(g_menuAction=='NockVote')
			s+=NockVotePage_Tpl(g_contents);
			else
			s+=NockVotePage_Tpl2(g_contents);
			ofilter = "0";
		}
		else if (g_menuAction=='ShowPost'||g_menuAction=='ShowPost2')
		{
			if(g_menuAction=='ShowPost')
			s+=ShowPost_Tpl(g_contents);
			else
			s+=ShowPost2_Tpl(g_contents);
			ofilter = "0";
		}
		else if (g_menuAction=='ShowMan'||g_menuAction=='ShowMan2')
		{
			o=g_contents.o;
			if (typeof o =="object"){this._user_pic=o.VFace;this._user_id=o.UserId;this._user_name=o.UserName;}
			ImgStat=9;
			if(g_menuAction=='ShowMan')
			s+=ShowMan_Tpl(g_contents);
			else
			s+=ShowMan_Tpl2(g_contents);
			ofilter = "0";

		}
		else if (g_menuAction=='CampaignVotePage'||g_menuAction=='CampaignVotePage2')
		{
			if(g_menuAction=='CampaignVotePage')
				s+=CampaignVotePage_Tpl(g_contents);
			else
				s+=CampaignVotePage2_Tpl(g_contents);
			ofilter = "0";
			ImgStat=0;
			g_left = 16;
			g_width=630;
		}
		else if(g_menuAction=='SpyMachine'){
			s+=this.__SpyMachine_Tpl(g_contents);
			ofliter = "0";
		}
		else if (g_menuAction=='Shops')
		{
			o=g_contents;
			if (typeof o =="object"){
				this._shop_name= o.ShopName;
				this._shop_pic= o.CurrentShopImg;
			}
			ImgStat=32;

			s+=Shops_Tpl(g_contents);
		}
		else if (g_menuAction=='Edifice')
		{
			ImgStat=24;
			s+=Edifice_Tpl(g_contents);
		}
		else if (g_menuAction=='JsGuage')
		{
			if(this._action_prowse==128||this._action_prowse==1290||this._action_prowse==1291){
				s+=this.__Accelorate_Tpl_Policy(g_contents,this._action_prowse);
			}else{
				s+=this.__JsGuage_Tpl(g_contents,this._action_prowse);
			}

		}
		else if (g_menuAction=='accelorate')
		{
			s+=this.__Accelorate_Tpl(g_contents);

		}
		else{
			s+=g_contents;
		}
		var scrt1 = '<div class="scrollBar">';
		var scrt2 = '</div>';


		if (!this._$(this._objname))
		{
			this._debug=true
			//this.__error('无法加载 '+this._objname+' 对象,请重新刷新页面或打开IE再重试 ！')
			return;
		}

		var ww=g_width+"px"
		var hh=g_height+"px"
		var ll=g_left+"px"
		var tt=g_top+"px"
		with(this._$(this._objname).style){
			position="absolute";
			width=ww;
			height=hh;
			left=ll;
			top=tt;
			filter="";
			//if (ofilter==1 && isIE6)filter="alpha(opacity=80);-moz-opacity:0.8";

			padding="4px";
		}
		this._height=(IsTrue(this._height))?this._height:g_height;
		this._$(this._objname).style.display="";
		if(!isIEBrowser) {
			s=s.replace('event.keyCode','handlerKeyboard(event)');
		}
		if (this._action=='characreate' )
		{
			this._$(this._objname).innerHTML=s
			this.__OpenLeftOrRight(ImgStat,ImgStatShow);
		}/*else if (this._action=='NPClandStorm'&&this._action_prowse==4)
		{
		//this._$(this._objname).innerHTML=s
		this.__OpenLeftOrRight(ImgStat,ImgStatShow);
		}*/else if (this._action=='characreatequick')
		{
			this._$(this._objname).innerHTML=s
			this.__OpenLeftOrRight(ImgStat,ImgStatShow);
		}else if (this._action=='secCreate')
		{
			this._$(this._objname).innerHTML=s
			this.__OpenLeftOrRight(ImgStat,ImgStatShow);
		}else if (this._action=='cityf500w')
		{
			this._$(this._objname).innerHTML=s
			this.__OpenLeftOrRight(ImgStat,'F');
		}else if (this._action=='charaInfoEdit')
		{
			this._$(this._objname).innerHTML=s
			this.__OpenLeftOrRight(ImgStat,ImgStatShow);
		}else if (g_menuAction=='stock' || g_menuAction=='daynews'){
			c._$('host_right').style.display="none";
			this._sHtml=s;
			setTimeout("c._$(c._objname).innerHTML=c._sHtml;c._$('host_right').style.display='';",200);
		}else if (this._action=='s_horn'){
			var s=scrt1+s+scrt2;
			//this.__innerHtml(this._objname,s);//给对象写入内容；
			this._$(this._objname).innerHTML=this.__boxHtml(s);


		}else if(this._action=='cofcpolicy'||this._action=='unionpolicy'){
			var s=scrt1+s+scrt2;
			this._$(this._objname).innerHTML=this.__boxHtml(s);
			this.__LastExec(g_menuAction);
		}else if((this._action=='mediaCenter'||this._action=='mediajCenterFinance')&&c._action_prowse==1){
			this._$(this._objname).innerHTML=s
			this.__LastExec(g_menuAction);
		}else{
			this._$(this._objname).innerHTML=this.__boxHtml(s)
			this.__OpenLeftOrRight(ImgStat,ImgStatShow);
			this.__LastExec(g_menuAction);
		}

		handleHtmlForFirefox(this._$(this._objname)); //非IE浏览器处理
	};

	this.__OpenSmallWindow=function (s,Tclass){ //
		this._objnameSmall = 'OpenSmallWindow';
		this._$(this._objnameSmall).style.display="";
		this._$(this._objnameSmall).innerHTML=this.__boxSmallHtml(s,Tclass);
	};
	this.__CloseSmallWindow=function (){ //
		this._$(this._objnameSmall).style.display="none";
	}
	this.__OpenTaskWindow=function (s){ //
		this._objnametest = 'TaskWindow';
		this._$(this._objnametest).style.display="";
		this._$(this._objnametest).innerHTML=this.__boxTaskHtml(s);
	};
	this.__OpenTaskWaitWindow=function (s){ //     金牌小秘书 - 队列等待 by Manson [09-07-12]
		this._objnametest = 'TaskWindow';
		this._$(this._objnametest).style.display="";
		this._$(this._objnametest).innerHTML=this.__boxTaskWaitHtml(s);
	};
	this.__OpenGsTaskWaitWindow=function (s){ //   (金牌小秘书队列安排列表)  金牌小秘书 - 队列等待 by Manson [09-07-12]
		this._objnametest = 'GsTaskWindow';
		this._$(this._objnametest).style.display="";
		this._$(this._objnametest).innerHTML=this.__boxGsTaskWaitHtml(s);
		handleHtmlForFirefox(this._$(this._objnametest));

//		if(typeof(this._wontoObj) !='undefined' && typeof(this._wontoObj)=='object') {
//			wonto_begin=this._wontoObj.CurrentTime;
////			clearInterval(timeSetIntelWonto);
//alert(this._wontoObj.Report);
//			timeSetIntelWonto=setInterval(function() {showReportDetail(this._wontoObj['Report'],this._wontoObj.GameTime);},1000);
//
//		}
	};
	this.__CloseTaskWindow=function (){ //
		this._$(this._objnametest).style.display="none";
	}


	this.__OpenBigWindow=function (s){ //打开总览图窗口
		this._objnamebig = 'BigWindow';
		this._loadSelect = this._objnamebig;//下拉父窗口
		var tempobj=this._$(this._objnamebig);
		with(tempobj.style){
			display = '';
			height= "690";
			width= "975px";
			/*border="1px solid red"*/
			if(this._isFF){
				right = "155px";
			}else{
				right = (document.body.clientWidth-parseInt(width))/2+15;
			}
			top=0;zIndex= 50;
		}

		this._$(this._objnamebig).innerHTML=this.__boxHtml(s,1);
		handleHtmlForFirefox(this._$(this._objnamebig)); //非IE浏览器处理
	};

	this.__LastExec=function (n){
		if (n=='calling')
		{
			new elem_alt('callingalt', 'div','hint','10px');
		}else if(this._action=='charabasic'||(this._action=='taxis8'&&this._action_prowse==1)){

			new elem_alt('charabasichint', 'dl','hint','10px');

			if(this._action=='charabasic') { setTimeout(function() {new elem_alt('MyUCofcHint', 'dl','hint','10px');new elem_alt('isGoldVip', 'dl','hint','10px','90px');},200);}
		}else if(n=='ShopRead'&&this._action_prowse==null){// 预览店铺
			new elem_alt('ShopRead', 'dl','hint','10px','210px');
		}else if(this._action=='cofcpolicy' ||this._action=='unionpolicy' || (this._action=='UOLog'&&this._action_prowse==null)){
			new elem_alt('callingpat', 'dl','hint','10px');
		}else if(this._action=='cityboon'||this._action=='citykursaal'||this._action=='thing2'||(this._action=='thing1'&&this._action_prowse==null)){

			new elem_alt('thingalt', 'dl','hint','10px');
		}else if(
		(this._action=='thing4'&&this._action_prowse==1)
		|| (this._action=='employeecommunicate'&&this._action_prowse==null)){
			new elem_alt('employeeAlt', 'dl','hint','10px');
		}else if(this._action=='userinforead' ||
		this._action=='shopmycar' || this._action=='showFashionList'
		|| (this._action=='thing3'&&(this._action_prowse==null||this._action_prowse==5))
		|| (this._action=='thing3one'&&this._action_prowse==null)
		||(this._action=='jobconst'&&this._action_prowse==null)
		||(this._action=='employeejob'&&this._action_prowse==null)
		||(this._action=='jobxms'&&this._action_prowse==null)
		||(this._action=='employeedig'&&(this._action_prowse==null||this._action_prowse==1))
		||((this._action=='market_fill'||this._action=='market_seek'
		||this._action=='market_mySale'||this._action=='market_myBuy'||this._action=='market_doubt')

		&&this._action_prowse==null)){
			new elem_alt('thing3onealt', 'dl','hint','10px');
			if(this._action=='userinforead'){ setTimeout(function() {new elem_alt('MyUCofcHint', 'dl','hint','10px');new elem_alt('isGoldVip', 'dl','hint','10px','90px');},200);}
		}else if (this._action=='FinanceList'||(this._action=='factorystoreroom'&&this._action_prowse<=3)){
			new elem_alt('FinanceListAlt', 'dl','hint','10px');
		}
		else if(this._action=='factorystoreroom'&&this._action_prowse==5){
			new elem_alt('Graphic', 'span','hint','10px');
		}
		else if (this._action=='characard'||this._action=='Purchase'||this._action=='thing6'||this._action=='thingleagueread'||(this._action=='charanickname'&&this._action_prowse==null) ){
			new elem_alt('characard', 'dl','hint','10px');
		}
		else if(this._action=='thingstructure'&&this._action_prowse==null){
			new elem_alt('thingstructure', 'dl','hint','10px','220px');
		}
		else if (this._action=='CampaignVotePage' ||(this._action=='charagoods' &&this._action_prowse==null))
		{
			new elem_alt('CampaignVotePage', 'dl','hint','10px');
		}else if (this._action=='UnionUpgrade' || (this._action=='MyUCofc'&&this._action_prowse==null))
		{
			new elem_alt('UnionU', 'dl','hint','10px');


		}else if(this._action=='factoryShow'){
			if(this._action_prowse==null)
			new elem_alt('factory', 'tr','hint','10px');
			else if(this._action_prowse==2)
			new elem_alt('ProductGraphic', 'dl','hint','10px');
		}
		else if((this._action=='mediaCenter'||this._action=='mediajCenterFinance')&&(this._action_prowse==null || this._action_prowse==2||this._action_prowse==3||this._action_prowse==7)){
			new elem_alt('mediaCenter', 'dl','hint','10px');
		}
	};
	this.__back= function (n,action){
		if(n==null||n=='undefined')
		n=-1;
		var barr=this._st.pop(n);

		try{
			if(barr!=null&&barr[0]!=null){
				if (typeof(action) =="string"){
					var i= 30;
					var tmpbarr= barr;
					while(typeof(barr)=="object" && i>0){
						if(barr[1][3] == action){
							break;
						}
						barr=this._st.pop(n);
						i--;
					}
				}

				if(barr[0]==0){
					if(barr[1][0]!=null)this.__OpenHostRight(barr[1][0],barr[1][1],barr[1][2]);
					return;
				}
				else if(barr[0]==1){
					if(barr[1]!=null)c.__OnSend(barr[1][0],barr[1][1],barr[1][2],barr[1][3],barr[1][4],barr[1][5],barr[1][6],barr[1][7]);
					return;
				}
			}
		}
		catch(e){
			if (typeof(action) =="string"){
				c.__OnSend('ajax_action.php?action='+action,'',c.__func_comm_list,action);
			}
			else if(this._st.l > 0){
				this.__back(1);
			}
			return;
		}
		if (typeof(action) =="string"){
			c.__OnSend('ajax_action.php?action='+action,'',c.__func_comm_list,action);
		}
		else if(this._st.l > 0){
			this.__back(1);
		}

	}
	/***************************************
	函数 : __OpenLeftOrRight
	para : s=0是没有 1用户名 2小秘书 3投资人
	para : LR=L是左边图片 R=右边图片 B=大图片比如显示投资人或小秘书
	********************************/
	this.__OpenLeftOrRight= function (s,LR){
		var big='';
		var ObjOpenLR=null;
		if(LR=='L'){
			var OpenLRObjName='OpenLeft';
			ObjOpenLR = this.__createWin(OpenLRObjName,'',118,151,20,17,19);
		}else if(LR=='R'){
			var OpenLRObjName='OpenRight';
			ObjOpenLR = this.__createWin(OpenLRObjName,'',118,151,540,17,20);
		}else if(LR=='T'){
			var OpenLRObjName='OpenLeftT';
			ObjOpenLR = this.__createWin(OpenLRObjName,'',118,151,20,17,19);
			big='T';
		}else if(LR=='B'){
			var OpenLRObjName='OpenLeftBig';
			ObjOpenLR = this.__createWin(OpenLRObjName,'',230,371,20,17,19);
			big='big';
		}else if(LR=='F'){
			var OpenLRObjName='OpenLeftBig';
			ObjOpenLR = this.__createWin(OpenLRObjName,'',230,371,0,0,19);
			big='big';
		}
		this.__OnWid(ObjOpenLR);
		var winImgUrl = null;
		var winImgName = null;


		if(s===1){
			if(ConfigUser.user_pic&&ConfigUser.user_pic.substr(0,7).toLowerCase()=='http://'){
				winImgUrl =ConfigUser.user_pic;
			}else{
				winImgUrl = ImgUfaceUrl100+(!ConfigUser.user_pic ? 'uface1.jpg': ConfigUser.user_pic);
			}

			//winImgUrl = ImgUrl+'234.png';
			winImgName = lang._js_js._common._label146+"<a href=\"javascript:void(0)\" onclick=\"c.__OnSend('ajax_action.php?action=charabasic','',c.__func_comm_list,'charabasic',12);\" class=rightname><b>"+ConfigUser.user_id+"</b></a>";
		}
		else if (s===2){//大图小秘书
			if (ConfigUser.secImg == '')
			winImgUrl = ImgUfaceUrl + 'SEC.jpg';
			else
			winImgUrl = ImgUfaceUrl + ConfigUser.secImg +'b.jpg';
			winImgName = '';
		}
		else if (s===22){//小图小秘书
			if (ConfigUser.secImg == '')
			winImgUrl = ImgUfaceUrl + 'SECl.jpg';
			else
			winImgUrl = ImgUfaceUrl + ConfigUser.secImg + 'm.jpg';
			winImgName = "<a href=\"javascript:void(0)\" onclick=\"om.clickchild('sec1');\" class=rightname><span id=\"user_secN\" style=\"font-weight:bold;\">"+Secretary.Name+"</span></a>";
		}
		else if (s===3){
			winImgUrl = ImgUfaceUrl+'investor.jpg';
			winImgName = '';
		}else if (s===45){//福利园
			winImgUrl = ImgUrl+'boon.jpg';
			winImgName = '';
		}else if (s===46){//游乐场
			winImgUrl = ImgUrl+'kursaal.jpg';
			winImgName = '';
		}else if (s===47){//合成俱乐部
			winImgUrl = ImgUrl+'composeClub.jpg';
			winImgName = '';
		}else if (s===50){//援助贝尔
			winImgUrl = ImgUrl+'donation.jpg';
			winImgName = '';
		}else if (s===33){//市长
			winImgUrl = ImgUfaceUrl+'mayor.jpg';
			winImgName = '';
		}else if (s===4){//投资人
			winImgUrl = ImgUfaceUrl+'investorl.jpg';
			winImgName = "Nhà đầu tư:<a href=\"javascript:void(0)\" onclick=\"c.__OnSend('ajax_action.php?action=invest1','',c.__func_comm_list,'invest1',null);\" class=rightname><b>Gia Bảo</b></a>";
		}else if (s===5){//investor's image & name!
			winImgUrl = ImgUrl+'ctiy.jpg';
			winImgName = "";
		}else if(s===6){

			if(this._user_pic&&this._user_pic.substr(0,7).toLowerCase()=='http://'){
				winImgUrl =this._user_pic;
			}else{
				winImgUrl = ImgUfaceUrl100+(!this._user_pic ? '1.gif': this._user_pic);
			}

			winImgName = lang._js_js._common._label147+"<a href=\"javascript:void(0)\" onclick=\"c.__OnSend('ajax_action.php?action=userinforead&OUserId="+this._user_id+"','',c.__func_comm_list,'userinforead');\" class=rightname><b>"+this._user_name+"</b></a><br><br><font class='tdbg2font'>"+this._user_vcity+'</font>';
		}else if(s===35){

			if(this._myuser_pic&&this._myuser_pic.substr(0,7).toLowerCase()=='http://'){
				winImgUrl =this._myuser_pic;
			}else{
				winImgUrl = ImgUfaceUrl100+(!this._myuser_pic ? '1.gif': this._myuser_pic);
			}


			winImgName = lang._js_js._common._label146+"<a href=\"javascript:void(0)\" onclick=\"c.__OnSend('ajax_action.php?action=userinforead&OUserId="+this._myuser_id+"','',c.__func_comm_list,'userinforead');\" class=rightname><b>"+this._myuser_name+"</b></a><br><br><font class='tdbg2font'>"+this._myuser_vcity+'</font>';
		}else if(s===38){

			winImgUrl = ImgLogoUrl+(!this._mycomp_pic ? '1.gif': this._mycomp_pic);
			winImgName = "<a href=\"javascript:void(0)\" onclick=\"c.__OnSend('ajax_action.php?action=thing1','',c.__func_comm_list,'thing1');\" class=rightname><b>"+this._mycomp_name+"</b></a><br><br><font class='tdbg2font'>"+this._my_Industry+'</font>';
		}else if(s===39){
			winImgUrl = ImgLogoUrl+(!this._mycomp_picTO ? '1.gif': this._mycomp_picTO);
			winImgName = "<a href=\"javascript:void(0)\" onclick=\"c.__OnSend('ajax_action.php?action=thingcompanysreadone&companyid="+this._mycomp_idTO+"','',c.__func_comm_list,'thingcompanysreadone');\" class=rightname><b>"+this._mycomp_nameTO+"</b></a><br><br><font class='tdbg2font'>"+this._my_IndustryTO+'</font>';
		}
		else if(s===8){//公司
			winImgUrl = (!this._com_pic ? ImgLogoUrl+'logo1.gif': ImgLogoUrl+this._com_pic);
			if(typeof(this._comid) == 'undefined')
			winImgName ="<a href=\"javascript:void(0)\" onclick=\"om.clickchild('thing1','',this);\" class=rightname><b>"+this._com_id+"</b></a>";
			else
			winImgName ="<a href=\"javascript:void(0)\" onclick=\"c.__OnSend('ajax_action.php?action=thingcompanysreadone&companyid="+this._comid+"','',c.__func_comm_list,'thingcompanysreadone');\" class=rightname><b>"+this._com_id+"</b></a>";
		}
		else if(s===9){//查看用户


			if(this._user_pic&&this._user_pic.substr(0,7).toLowerCase()=='http://'){
				winImgUrl =this._user_pic;
			}else{
				winImgUrl = ImgUfaceUrl100+(!this._user_pic ? 'uface1.jpg': this._user_pic);
			}
			onlieCss = (this._user_onlieCss == '') ? 'rightname':  this._user_onlieCss;

			winImgName = lang._js_js._common._label146+"<a href=\"javascript:void(0)\" onclick=\"c.__OnSend('ajax_action.php?action=userinforead&OUserId="+this._user_id+"','',c.__func_comm_list,'userinforead');\" class="+onlieCss+"><b>"+this._user_name+"</b></a>";

		}else if(s===10){
			if(this._user_pic&&this._user_pic.substr(0,7).toLowerCase()=='http://'){
				winImgUrl =this._user_pic;
			}else{
				winImgUrl = ImgUfaceUrl+(!this._user_pic ? '1.gif': '100/'+this._user_pic);
			}

			if(this._user_money == '' || this._user_money == null || this._user_money == 'undefined'){
				this._user_money = 0;
			}
			if(this._user_gold == '' || this._user_gold == null || this._user_gold == 'undefined'){
				this._user_gold = 0;
			}
			winImgName = "<table width=90% align=center  cellspacing=0  ><tr><td width=100% align=left>"+lang._js_js._common._label148+"<b class=yellow2>" + this._user_money +" </b> G</td></tr><tr><td width=100% align=left>"+lang._js_js._common._label150+"<b class=yellow2>" + this._user_gold + " </b></td></tr><tr><td width=100% align=left>"+lang._js_js._common._label149+"<b class=yellow2>" + this._user_liquan + " </b></td></tr><table>"
		}
		else if (s===11){//investor's image & name!
			winImgUrl = ImgUrl+'adsdraw.jpg'; //市长大厦
			winImgName = "";
		}
		else if (s===41){//investor's image & name!
			winImgUrl = ImgUrl+'bafeite.jpg'; //市长大厦
			winImgName = "";
		}
		else if (s===12){//investor's image & name!
			winImgUrl = ImgUrl+'boardcastdraw.jpg'; //B24广播台宣传画
			winImgName = "";
		}
		else if (s===13){//investor's image & name!
			winImgUrl = ImgUrl+'dnqdraw.jpg'; //迪尼斯娱乐集团宣传画
			winImgName = "";
		}
		else if (s===14){//investor's image & name!
			winImgUrl = ImgUrl+'timesdraw.jpg'; //时代广场宣传画
			winImgName = "";
		}else if(s===15){//住宅区
			winImgUrl = ImgUrl+'a0.jpg';
			winImgName = "";
		}else if(s===16){//闹市区
			winImgUrl = ImgUrl+'a1.jpg';
			winImgName = "";
		}else if(s===17){//商业区
			winImgUrl = ImgUrl+'a2.jpg';
			winImgName = "";
		}else if(s===48){//商业区
			winImgUrl = ImgUrl+'a4.jpg';
			winImgName = "";
		}else if(s===49){//商业区
			winImgUrl = ImgUrl+'a5.jpg';
			winImgName = "";
		}else if(s===21){//工厂
			winImgUrl = ImgUrl+'a3.jpg';
			winImgName = "";
		}else if(s===18){//DGS
			winImgUrl = ImgUrl+'dgsdraw.jpg';
			winImgName = "";
		}else if(s===19){//城市概述
			winImgUrl = ImgUrl+'ctiy.jpg';
			winImgName = "";
		}else if(s===20){
			//alert(CurrentShopImg);
			winImgUrl  = CurrentShopImg;
			winImgName = CurrentShopName;
		}
		else if(s===37){
			//查看商会_cofc_pic
			winImgUrl = ''+ImgUrl+'cofc/'+(!this._cofc_pic ? 'logo1.jpg': this._cofc_pic+'.jpg');
			winImgName =lang._js_js._common._label151+"<a href=\"javascript:void(0)\" onclick=\"c.__OnSend('ajax_union.php?action=MyUCofc&UCofcId="+this._cofc_id+"','',c.__func_comm_list,'MyUCofc');\" class=rightname><b>"+this._cofc_name+"</b></a>";
			if(this.joinGoldVip) {
				var userLinkStr="<a href='javascript:void(0)' class='allname' onclick=c.__OnSend('ajax_action.php?action=userinforead&OUserId="+this.joinGoldVipInfo.UserId+"','',c.__func_comm_list,'userinforead');  >"+this.joinGoldVipInfo.VUserName+"</a>";


				var _sellBegTime=this.joinGoldVipInfo.StartTime;
				var _sellEndTime=this.joinGoldVipInfo.EndTime;
				var _systemTime=this.joinGoldVipInfo.SystemTime;
				var joinGoldVipWhatNow=this.joinGoldVipWhatNow;
				var upSec=0;
				var remainTimes=_sellEndTime-_systemTime;
				clearInterval(timeSetIntel);

				function goldVipAtiveTime() {
					_sellBegTime = (Math.floor(_sellBegTime) > 0 ) ? _sellBegTime : 0
					_sellEndTime = (Math.floor(_sellEndTime) > 0 ) ? _sellEndTime : 0
					_systemTime = (Math.floor(_systemTime) > 0 ) ? _systemTime : 0

					var now = new Date();

					var allSec = Math.floor(_sellEndTime-_sellBegTime);
					//					document.title=allSec+Math.random();
					var upSec = Math.floor(now.getTime()/1000) - _sellBegTime + 0;//+86400*_UseCoins;
					if(upSec < 0){
						upSec= 0;
						_sellBegTime= _sellBegTime + upSec;
					}
					var restTime1 =remainTimes; //allSec - ((upSec<0)?0:upSec);
					if($('goldVipRemainTime')){
						if(_systemTime !=0 && restTime1>0){
							var restTime = restTime1/3600;
							var restHour = restTime % 24;
							var restDay = restTime / 24;
							var restMin = (restTime1%3600)/60;
							var restSec = (restTime1%3600)%60;
							//document.title=allSec+"============"+Math.random();

							$('goldVipRemainTime').innerHTML=(Math.floor(restDay)>0 ? Math.floor(restDay)+lang._comm._day:'')+(Math.floor(restHour)>0?Math.floor(restHour)+lang._comm._hour:'')+(Math.floor(restMin)>0?Math.floor(restMin)+lang._comm._minute:'')+Math.floor(restSec)+lang._comm._second;
						} else  {
							var finishstrstr='';
//							alert(c.joinGoldVipWhatNow);
							switch(joinGoldVipWhatNow) {
								case 'taipingyang':
									finishstrstr=lang._js_js._common._label152;
									break;
									default:
									finishstrstr=lang._js_js._common._label153;
									break;
							}
							$('goldVipRemainTime').innerHTML=finishstrstr;
						}
					}
					remainTimes--;
				}
				var whostr=lang._js_js._common._label160;
				if(this.isOwerJoinGoldVip) {
					whostr=lang._js_js._common._label158
				}
				winImgName += "<p style='line-height:180%;text-align:left;'>"+whostr+""+lang._js_js._common._label156+"<span style='color:red;padding:0 4px;'>"+userLinkStr+"</span>";
				var strstr='';
				try {
					if(this.joinGoldVipInfo['two']) {
						strstr=lang._js_js._common._label159+this.joinGoldVipInfo['unionTitle'];
					} else {
						strstr=lang._js_js._common._label159+this.joinGoldVipInfo['unionTitle']+','+lang._js_js._common._label155+'';
					}
				} catch(e) {
					strstr=''+lang._js_js._common._label157+'Virginian'+lang._js_js._common._label154+'';
				}

				winImgName+=strstr;
				winImgName+="</p><p style='text-align:center' id='goldVipRemainTimess'><span id='goldVipRemainTime'></span></p>";//XX小时XX分XX秒。

				setTimeout(function(){goldVipAtiveTime();},100);
				timeSetIntel=setInterval(function() {goldVipAtiveTime();},1000);

			}
		}else if(s===23){//员工
			winImgUrl = (!this._pic ? ImgUrl+'vface/sys1.jpg': this._pic);
			if( this._Price){
				//winImgName = "<table width=90% align=center  cellspacing=0  ><tr><td width=100% align=center colspan=2><b class="+this._GradeCss+"><a>"+this._name+"</a></b></td></tr><tr><td align=left>身价:<b class=allcoin>" + this._Price + " G</b></td></tr></table>";
				winImgName ='';
			}else{
				winImgName ="<b class="+this._GradeCss+"><a>"+this._name+"</a></b>";
			}
		}else if(s===24){//创建公司
			winImgUrl = ImgUrl+'logo/logo1.jpg';
			winImgName ="";
		}else if(s===25){//创建商会
			winImgUrl = ImgUrl+'cofc/logo1.jpg';
			winImgName ="";
		}
		else if(s===26){//超级富豪排排行榜
			winImgUrl = ImgUrl+'Gold.jpg';
			winImgName =lang._js_js._common._label161;
		}

		else if(s===27){//商业领袖排行榜
			winImgUrl = ImgUrl+'Lead.jpg';
			winImgName =lang._js_js._common._label162;
		}
		else if(s===28){//最佳业务排行榜
			winImgUrl = ImgUrl+'Business.jpg';
			winImgName =lang._js_js._common._label163;
		}
		else if(s===29){//最佳公司排行榜
			winImgUrl = ImgUrl+'Companys.jpg';
			winImgName =lang._js_js._common._label164;
		}
		else if(s===30){//最佳雇主排行榜
			winImgUrl = ImgUrl+'Employer.jpg';
			winImgName =lang._js_js._common._label165;
		}
		else if(s===31){//慈善排行榜
			winImgUrl = ImgUrl+'EmployerGoldCup.gif';
			winImgName =lang._js_js._common._label166;
		}
		else if(s===32){//店铺
			winImgUrl = (!this._shop_pic ? ImgLogoUrl+'logo1.gif': ImgUrl+this._shop_pic);
			winImgName ="<a href=\"javascript:void(0)\" class=rightname><b>"+this._shop_name+"</b></a>";
		}else if(s===34){//查看别人公司
			winImgUrl = (!this._com_pic ? ImgLogoUrl+'logo1.gif': ImgLogoUrl+this._com_pic);
			winImgName ="<a href=\"javascript:void(0)\" onclick=\"c.__OnSend('ajax_action.php?action=thingcompanysreadone&companyid="+this._com_cid+"','',c.__func_comm_list,'thingcompanysreadone');\" class=rightname><b>"+this._com_id+"</b></a>";
		}else if(s===36){//我的工厂 20081023 Ason

			winImgUrl = (!this._factory_pic ? ImgLogoUrl+'logo1.gif': ImgUrl+this._factory_pic);
			winImgName ="<a href=\"javascript:void(0)\" onclick=\"c.__OnSend('ajax_action.php?action=factoryShow&amp;Id="+this._factory_id+"','',c.__func_comm_list,'factoryShow');\" class=rightname><b>"+this._factory_name+"</b></a>";
		}else if(s===40){//黑衣人头像
			winImgUrl = ImgUrl+'sa/MIBC/black.jpg';
			winImgName =""+lang._js_js._common._label167+"<BR>MIBC";
		}else if(s===42){//地标图
			winImgUrl = ImgUrl+'landstorm/'+c._landStormId+'.jpg';
			winImgName ="";//<b class=rightname>"+c._landStormName+"</b>
		}else if(s===43){//媒体中心图
			winImgUrl = ImgUrl+'mediaCenter/'+c.MediaId+'.jpg';
			winImgName ="";//<b class=rightname>"+c._landStormName+"</b>
		}else if(s===44){//旅游
			winImgUrl = ImgUrl+c.__TuristImg;
			winImgName ="";
		}else if(s===55){//中心广场
			winImgUrl = ImgUrl+'Square.jpg';
			winImgName ="";

		}else if(s===56){//建设家园
			winImgUrl = ImgUrl+'Square.jpg';
			winImgName =lang._js_js._common._label168;
		}else if(s===57){//神秘商人
			winImgUrl = ImgUrl+'secretMerchant.jpg';
			winImgName ="";
		}
		else if(s===58){//神秘商人
			winImgUrl = ImgUrl+'wonbto1.jpg';
			winImgName ="";
		}
		else if(s===95){//超级富豪排排行榜
			winImgUrl = ImgUrl+'GoldBrand.jpg';
			winImgName =lang._js_js._common._label169;
		}
		else if(s===59){//赢在大亨领奖台
			//winImgUrl = ImgUrl+'GoldBrand.jpg';
			winImgUrl = ImgUrl+'wonbto1.jpg';
			winImgName ="";
		}
		else if (s===60){//招聘会
			winImgUrl = ImgUrl+'recruit.jpg'; //B24广播台宣传画
			winImgName = "";
		}
		if(s == 81){
			//查看公司的下级信息,不需要刷新数据
		}
		else if (s>0)
		{
			this._strimg = null;
			this._strimg = this.__boxImgHtml(winImgUrl,winImgName,big);
			if(this._ObjOpenLR != null){
				//alert(this._ObjOpenLR.name+'\r\r'+this._ObjOpenLR.id+'\r\r\r'+this._strimg);
			}
			this._ObjOpenLR = null;
			this._ObjOpenLR = ObjOpenLR;
			if (isIE6)
			{
				c._ObjOpenLR.innerHTML=c._strimg;
				setTimeout("c._ObjOpenLR.innerHTML=c._strimg;",1);
			}else{
				c._ObjOpenLR.innerHTML=c._strimg;
			}

		}
		else{
			ObjOpenLR.innerHTML="";
		}

	}
	this.__MainMsg= function (s,act,err,t){
		try{
			if (act > 0)
			{
				err = (err=='undefined' || err==null)?0:err;
				t = (t=='undefined' || t==null)?lang._js_js._common._label171:t;
				this._action=act;
				this._action_prowse=err;
				this.__show(t,s);
			}else{
				this._$('MainMsg').style.display=""
				this._$('MainMsg').innerHTML="<IMG SRC='"+ImgUrl+"loading.gif'  BORDER='0' ><br><strong>"+lang._js_js._common._label170+"</strong>"+s+"..."
			}
		}catch(e){this._debug=true;this.__error(e.description);}

	};
	this.__MainMsgClose= function (){
		try{
			this._$('MainMsg').style.display="none"
		}catch(e){this._debug=true;this.__error(e.description);}
	};
	this.__BigWindowClose= function (){
		try{
			this._$(this._objnamebig).style.display="none"
		}catch(e){this._debug=true;this.__error(e.description);}
	};


	this.__ShowLabel=function (n,main_n) {
		var b_n = 'button_'+n;
		var b_o=this._$(b_n);
		var main_o = this._$(main_n);
		if (!main_o) return

		var div_arr = main_o.getElementsByTagName('div');
		var but_arr = main_o.getElementsByTagName('button');

		if (div_arr.length != 0)
		{
			for (var i = 0; i < div_arr.length; i ++) {
				if ( div_arr[i].id == '')continue
				if (div_arr[i].id==n)
				{
					this._$(n).style.display='';
				}else{
					this._$(div_arr[i].id).style.display='none';
				}
			}
		}
		for (var i = 0; i < but_arr.length; i ++) {
			if ( but_arr[i].id == '')
			continue;
			else if(but_arr[i].id == 'u_bt')
			continue;
			if (but_arr[i].id==b_n)
			{
				this._$(b_n).disabled=true;
				this._$(b_n).style.color = "#ACACAC";
			}else{
				this._$(but_arr[i].id).disabled=false;
			}
		}
	};
	/*提示部分*/
	this.__Hint= function (s,n,parobj){
		var o = this._$(n);
		var od=this._$("divShowAllTask");
		if(o==null){
			o = document.createElement(this.__GetLabelName());
			n = (n==null) ?this.__GetLabelName():n;
			o.id = n;
			with(o.style){
				position="absolute";
				filter="progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=90,finishOpacity=100);";
				opacity = "0.9";
				width="319px";
				height="134px";
				backgroundImage="url("+ImgUrl+"hint.gif)";
				display="";
				zindex="2";
			}
		}

		o.innerHTML="<div style='height:auto;padding:12px 6px'>"+s+"</div>";
		document.body.appendChild(o);
		div_location(parobj,1,n);
		this.__zindex(o,0);

	};
	this.__HintReMove= function (n){
		var o = this._$(n);
		if(o)document.body.removeChild(o);
	};
	this.__CreateShopHint= function (){
		c.Confin={name:'CreateShopHint',contents:'<strong>'+lang._js_js._common._label173+'</strong><font class=brightgreen>'+lang._js_js._common._label172+'</font>',error:0,left: 410,height:50,top:22,menuaction:'',action:''}
		setTimeout("c.__OnOpenWid(c.Confin);",300);
	}
	this.__CreateLandHint= function (Name,NowUnionName,NowUnionLeader,Id,NowUnionId,NowUnionLeaderId){
		var s='';
		if(NowUnionId!=0){
			NowUnionName="<a onclick=c.__OnSend('ajax_union.php?action=MyUCofc&UCofcId="+NowUnionId+"&Page=1','',c.__func_comm_list,'MyUCofc'); href='javascript:void(0)'>"+NowUnionName+"</a>";
		}
		if(NowUnionLeaderId!=0){
			NowUnionLeader="<a onclick=c.__OnSend('ajax_action.php?action=userinforead&OUserId="+NowUnionLeaderId+"','',c.__func_comm_list,'userinforead'); href='javascript:void(0)'>"+NowUnionLeader+"</a>";
		}
		s+="<div style='position:relative;'><DIV style='Z-INDEX: 11; BACKGROUND: #072f4a; FILTER: alpha(opacity=80);WIDTH: 186px;HEIGHT:113px; POSITION: absolute; -moz-opacity: 0.8; opacity: 0.8'></DIV><table style=' border:1px solid black;POSITION: absolute;Z-INDEX: 12;' width=100% class=tborder cellpadding=6 cellspacing=0  >";
		s+="<tr class=tabletop ><td style='border:none' colspan=2>&nbsp;&nbsp;&nbsp;&nbsp;<b class=allname style='font-size:14px'>"+Name+"</b></td></tr>";
		s+= "<tr><td width=70>&nbsp;&nbsp;<font style='color:#a48a4a'>"+lang._js_js._common._label174+"</font></td><td align=left class=red2 width=*>"+NowUnionName+"</td></tr>";
		s+= "<tr><td  >&nbsp;&nbsp;<font style='color:#a48a4a'>"+lang._js_js._common._label175+"</font></td><td align=left class=red2>"+NowUnionLeader+"</td></tr>";
		s+= "<tr><td  colspan=2 align=center><span class=\'btn_normal\'><button   onclick=\"c.__OnSend('ajax_action.php?action=landStorm_TheLandInfo&Id="+Id+"','',c.__func_comm_list,'landStorm',1)\" style='Z-INDEX: 1002;'>"+lang._js_js._common._label176+"</button></span><span class=\'btn_normal\'><button   onclick=\"Load_Map(9);\">"+lang._js_js._common._label177+"</button></span></td></tr>";
		s+="</table></div>";
		c.Confin={name:'CreateLandHint',contents:s,error:0,left: 470,height:50,top:310,menuaction:'',action:''}
		setTimeout("c.__OnOpenWid(c.Confin);",300);
	}

	this.msgobjname="";
	this.__show=function(msgtitle,msgcontent){
		var tempobj1=this._$("msgdiv");
		var tempobj3=this._$("overdivbg");
		var tempobj2=this._$("overdiv");

		//空的提示,跳过提示 by Manson [09-09-15]
		if (!msgcontent){
		    return false;
		}

		with(tempobj2.style){
			filter="alpha(opacity=40)";
			opacity = 4/10;
			backgroundColor = "#000000";
			display = '';
			zIndex= 100;
			height= document.documentElement.clientHeight+"px";
			width= document.documentElement.clientWidth+"px";
			left=0;
			top=0;
		}
		with(tempobj1.style){
			display="none";
			left=(document.documentElement.clientWidth)/4+"px";
			top='200px';
			display= '';
			width=359+"px";
			zIndex= 201;
		}
		with(tempobj3.style){
			display="none";
			filter="alpha(opacity=80)";
			opacity  = 80/100;
			backgroundColor = "#333333";
			left=0;
			top=0;
			display= '';
			width="678px";
			height="430px";
			zIndex= 6;
		}
		var cssname;
		cssname=this._action_prowse==4 || this._action_prowse==5 || this._action==4 ?'systembg1':((this._action==6||this._action==1||this._action==7)?'systembg2':'systembg0');

		//html="<table width='359'  class="+cssname+" align=center cellpadding='0' cellspacing='0'><tr height=35><td></td></tr><tr><td style='padding-left:60px;'>"+this.__Hint_Tpl(msgcontent,this._g_name)+"</td></tr></table>"
		html=this.__Hint_Tpl(msgcontent,this._g_name);
		tempobj1.innerHTML=html;
	}
	this.__showExternal=function(msgtitle,msgcontent){
		var tempobj1=this._$("msgdiv");
		var tempobj3=this._$("overdivbg");
		var tempobj2=this._$("overdiv");

		with(tempobj2.style) {
			filter = "alpha(opacity=40)";
			opacity = 4 / 10;
			backgroundColor = "#000000";
			display = '';
			zIndex = 100;
			height = document.documentElement.scrollHeight + "px";
			width = document.documentElement.clientWidth  + "px";
			left = 0;
			top = 0;
		}
		with(tempobj1.style) {
			display = "none";
			left = document.documentElement.clientWidth / 2 - 270 + "px";
			top = document.documentElement.scrollTop + (document.documentElement.clientHeight/2-150) + 'px';
			display = '';
			width = 359 + "px";
			zIndex = 201;
		}
		var cssname;
		cssname=this._action_prowse==4 || this._action_prowse==5 || this._action==4 ?'systembg1':((this._action==6||this._action==1||this._action==7||this._action==8)?'systembg2':'systembg0');
		//html="<table width='359'  class="+cssname+" align=center cellpadding='0' cellspacing='0'><tr height=35><td></td></tr><tr><td style='padding-left:60px;'>"+this.__Hint_Tpl(msgcontent,this._g_name)+"</td></tr></table>"
		html=this.__Hint_Tpl(msgcontent,this._g_name);
		tempobj1.innerHTML=html;
	}
	this.ok = function()
	{
		this._$('msgdiv').style.display='none';
		this._$('overdiv').style.display='none';
		this._$('overdivbg').style.display='none';
	}
	this.cancel=function(){
		this._$('msgdiv').style.display='none';
		this._$('overdiv').style.display='none';
		this._$('overdivbg').style.display='none';
	}



}
/*createWid*/

/*mainMenu*/
function main(){
	this.$=function(o,d){return (d||document).getElementById(o)};
	this.$f=function(f){return this.$(f)?((this.$(f)).contentWindow||window.frames[f]):null};
	this.$t=function(t,d){return (d||document).getElementsByTagName(t)};
	this.setC=function(n, v){var c=n+"="+encodeURI(v);document.cookie=c;};
	this.readC=function(n){var re=eval("/(?:;)?"+n+"=([^;]*);?/g");return re.test(document.cookie)?decodeURIComponent(RegExp.$1):null;};
	a=arguments[0];if(!a){return;}
	this.g=a['maingb']||'main001.jpg';
	this.initgb=function (o){this.$(o).style.scr=this.g;};
	this.mainmemuicon={
		chara:{t:lang._js_js._common._label210,i:'chara',u:'charabasic',h:""+lang._js_js._common._label184+"<a href=\"javascript:void(0);\" onclick=\"c.__OnSend('ajax_action.php?action=charagoods','',c.__func_comm_list,'charagoods');\" class=mainhintcss>"+lang._js_js._common._label211+"</a>"+lang._js_js._common._label221+"<a href=\"javascript:void(0);\" onclick=\"c.__OnSend('ajax_action.php?action=shop4','',c.__func_comm_list,'shop4');\" class=mainhintcss>"+lang._js_js._common._label212+"</a>"+lang._js_js._common._label192+""}
		,sec:{t:lang._js_js._common._label204,i:'sec',u:'jobxms',h:""+lang._js_js._common._label187+"<a href=\"javascript:void(0);\" onclick=\"c.__OnSend('ajax_action.php?action=email_inceptread&mailtype=2','',c.__func_comm_list,'email',12);\" class=mainhintcss>"+lang._js_js._common._label205+"</a>"+lang._js_js._common._label221+"<a href=\"javascript:void(0);\" onclick=\"c.__OnSend('ajax_action.php?action=sec3','',c.__func_comm_list,'sec3');\" class=mainhintcss>"+lang._js_js._common._label206+"</a>"+lang._js_js._common._label188+""}
		,invest:{t:lang._js_js._common._label207,i:'invest',u:'invest3',h:""+lang._js_js._common._label186+"<a href=\"javascript:void(0);\" onclick=\"c.__OnSend('ajax_action.php?action=invest3','',c.__func_comm_list,'invest3');\" class=mainhintcss>"+lang._js_js._common._label213+"</a>"+lang._js_js._common._label195+"<a href=\"javascript:void(0);\" onclick=\"c.__OnSend('ajax_action.php?action=thing6','',c.__func_comm_list,'thing6');\" class=mainhintcss>"+lang._js_js._common._label208+"</a>"+lang._js_js._common._label189+""}
		,thing:{t:lang._js_js._common._label214,i:'thing',u:'jobconst',h:""+lang._js_js._common._label190+"<a href=\"javascript:void(0);\" onclick=\"c.__OnSend('ajax_action.php?action=jobconst','',c.__func_comm_list,'jobconst');\" class=mainhintcss>"+lang._js_js._common._label199+"</a>"+lang._js_js._common._label196+"<a href=\"javascript:void(0);\" onclick=\"c.__OnSend('ajax_action.php?action=thing3','',c.__func_comm_list,'thing3');\" class=mainhintcss>"+lang._js_js._common._label215+"</a>"+lang._js_js._common._label198+"<a href=\"javascript:void(0);\" onclick=\"c.__OnSend('ajax_action.php?action=thing4','',c.__func_comm_list,'thing4');\" class=mainhintcss>"+lang._js_js._common._label200+"</a>"+lang._js_js._common._label194+""}
		,media:{t:lang._js_js._common._label216,i:'media',u:'mediaCenter',h:lang._js_js._common._label181}
		,cofc:{t:lang._js_js._common._label217,i:'cofc',u:'cofclistMy',h:""+lang._js_js._common._label185+"VIP"+lang._js_js._common._label193+"<a href=\"javascript:void(0);\" onclick=\"c.__OnSend('ajax_union.php?action=cofclist','',c.__func_comm_list,'cofclist');\" class=mainhintcss>"+lang._js_js._common._label201+"</a>"+lang._js_js._common._label182+""}
		,union:{t:lang._js_js._common._label209,i:'union',u:'cofcpolicy',h:lang._js_js._common._label179}
		,wonbto:{t:lang._js_js._common._label202,i:'wonbto',u:'wonbto',h:lang._js_js._common._label178}
		,city:{t:lang._js_js._common._label218,i:'city',u:'',h:""+lang._js_js._common._label191+"<a href=\"javascript:void(0);\" onclick=\"c.__OnSend('ajax_action.php?action=shopcar','',c.__func_comm_list,'shopcar');\" class=mainhintcss>"+lang._js_js._common._label203+"</a>"+lang._js_js._common._label197+""}
		,taxis:{t:lang._js_js._common._label219,i:'taxis',u:'taxis7',h:lang._js_js._common._label180}
		,shop:{t:lang._js_js._common._label220,i:'shop',u:'shop4',h:lang._js_js._common._label183}
		//在商城栏目里,您可以对游戏进行 Xu<a href=\""+eval(ConfigUser.Pay_Url)+"\"   target=_blank class=mainhintcss>充值</a>,在<a href=\"javascript:void(0);\" onclick=\"c.__OnSend('ajax_action.php?action=shop4','',c.__func_comm_list,'shop4');\" class=mainhintcss>道具列表</a>里可使用 Xu购买您所需的道具。
		,deal:{t:lang._js_js._common._label228,i:'deal',u:'market0',h:""+lang._js_js._common._label223+"<a href=\"javascript:void(0);\" onclick=\"c.__OnSend('ajax_action.php?action=market_seek&ThingsTypeId=0','',c.__func_comm_list,'market_seek');\" class=mainhintcss>"+lang._js_js._common._label229+"</a>"+lang._js_js._common._label226+"<a href=\"javascript:void(0);\" onclick=\"c.__OnSend('ajax_action.php?action=market_fill&ThingsTypeId=0','',c.__func_comm_list,'market_fill');\" class=mainhintcss>"+lang._js_js._common._label230+"</a>"+lang._js_js._common._label224+"<a href=\""+ConfigUser.TradeLink+"\"  target=_blank class=mainhintcss>"+lang._js_js._common._label227+"</a>"+lang._js_js._common._label225+""}
		,setup:{t:lang._js_js._common._label231,i:'setup',u:'companysetup'}
		,exits:{t:lang._js_js._common._label232,i:'exits',u:''}
		,create:{t:lang._js_js._common._label233,i:'create',u:'characreate'}
		,createquick:{t:lang._js_js._common._label233,i:'createquick',u:'characreatequick'}
		,secCreate:{t:lang._js_js._common._label233,i:'secCreate',u:'secCreate'}
		,createcompany:{t:lang._js_js._common._label233,i:'createcompany',u:'Edifice'}
		,cash:{t:lang._js_js._common._label234,i:'cash',u:'cash',h:lang._js_js._common._label234}
		,stockMarket:{t:lang._js_js._common._label235,i:'stockMarket',u:'stockMarket',h:lang._js_js._common._label222}
	};
	/*新手流程提示语*/
	this.NewFlowTips={

		10:{
			info:lang._js_js._common._label362,
			title:lang._js_js._common._label296,
			content:''+lang._js_js._common._label241+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label350+'</font>'+lang._js_js._common._label351+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label321+'</font>'+lang._js_js._common._label278+''
		},
		11:{
			info:lang._js_js._common._label362,
			title:lang._js_js._common._label296,
			content:''+lang._js_js._common._label238+'<br>'+lang._js_js._common._label262+''
		},
		12:{
			info:lang._js_js._common._label322,
			title:lang._js_js._common._label287,
			content:''+lang._js_js._common._label236+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label352+'</font>'+lang._js_js._common._label353+'<font style=\'color:red\'>['+lang._js_js._common._label363+']</font>'+lang._js_js._common._label383+''
		},
		13:{
			info:lang._js_js._common._label354,
			title:lang._js_js._common._label302,
			content:lang._js_js._common._label237
		},
		21:{
			info:lang._js_js._common._label364,
			title:lang._js_js._common._label303,
			content:lang._js_js._common._label239
		},
		31:{
			info:lang._js_js._common._label304,
			title:lang._js_js._common._label305,
			content:''+lang._js_js._common._label245+'<br>'+lang._js_js._common._label288+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label352+'</font>'+lang._js_js._common._label353+'<font style=\'color:red\'>['+lang._js_js._common._label363+']</font>'+lang._js_js._common._label383+''
		},
		41:{
			info:lang._js_js._common._label323,
			title:lang._js_js._common._label289,
			content:''+lang._js_js._common._label324+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label325+'</font>'+lang._js_js._common._label270+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label365+'</font>'+lang._js_js._common._label263+''
		},
		42:{
			info:lang._js_js._common._label326,
			title:lang._js_js._common._label327,
			content:''+lang._js_js._common._label244+'<br>'+lang._js_js._common._label376+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label355+'</font>'+lang._js_js._common._label366+''
		},
		43:{
			info:lang._js_js._common._label306,
			title:lang._js_js._common._label307,
			content:''+lang._js_js._common._label293+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label365+'</font>'+lang._js_js._common._label377+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label355+'</font>'+lang._js_js._common._label252+'<br>'+lang._js_js._common._label264+''
		},
		44:{
			info:lang._js_js._common._label328,
			title:lang._js_js._common._label308,
			content:''+lang._js_js._common._label293+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label365+'</font>'+lang._js_js._common._label381+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label355+'</font>'+lang._js_js._common._label268+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label367+'</font>'+lang._js_js._common._label297+'<br>'+lang._js_js._common._label294+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label367+'</font>'+lang._js_js._common._label356+''
		},
		45:{
			info:lang._js_js._common._label329,
			title:lang._js_js._common._label309,
			content:''+lang._js_js._common._label249+'<br>'+lang._js_js._common._label279+''
		},
		46:{
			info:lang._js_js._common._label298,
			title:lang._js_js._common._label280,
			content:''+lang._js_js._common._label258+'<br>'+lang._js_js._common._label281+''
		},
		47:{
			info:lang._js_js._common._label368,
			title:lang._js_js._common._label330,
			content:''+lang._js_js._common._label265+'<br>'+lang._js_js._common._label282+''
		},
		51:{
			info:lang._js_js._common._label369,
			title:lang._js_js._common._label310,
			content:''+lang._js_js._common._label240+'<font style="color:red">['+lang._js_js._common._label370+']</font>'+lang._js_js._common._label383+''
		},
		61:{
			info:lang._js_js._common._label323,
			title:lang._js_js._common._label295,
			content:''+lang._js_js._common._label324+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label331+'</font>'+lang._js_js._common._label283+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label371+'</font>'+lang._js_js._common._label378+'<br>'+lang._js_js._common._label376+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label371+'</font>'+lang._js_js._common._label332+''
		},
		62:{
			info:lang._js_js._common._label333,
			title:lang._js_js._common._label284,
			content:''+lang._js_js._common._label299+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label334+'</font>'+lang._js_js._common._label266+'<br>'+lang._js_js._common._label376+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label334+'</font>'+lang._js_js._common._label366+''
		},
		63:{
			info:lang._js_js._common._label300,
			title:lang._js_js._common._label311,
			content:''+lang._js_js._common._label269+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label372+'</font>'+lang._js_js._common._label256+''
		},
		64:{
			info:lang._js_js._common._label335,
			title:lang._js_js._common._label357,
			content:''+lang._js_js._common._label376+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label336+'</font>'+lang._js_js._common._label257+''
		},
		71:{
			info:lang._js_js._common._label373,
			title:lang._js_js._common._label337,
			content:''+lang._js_js._common._label250+'<br>'+lang._js_js._common._label358+'<font style="color:red">['+lang._js_js._common._label359+']</font>'+lang._js_js._common._label383+''
		},
		81:{
			info:lang._js_js._common._label323,
			title:lang._js_js._common._label290,
			content:''+lang._js_js._common._label324+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label312+'</font>'+lang._js_js._common._label271+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label371+'</font>'+lang._js_js._common._label378+'<br>'+lang._js_js._common._label376+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label371+'</font>'+lang._js_js._common._label332+''
		},
		82:{
			info:lang._js_js._common._label374,
			title:lang._js_js._common._label285,
			content:''+lang._js_js._common._label299+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label338+'</font>'+lang._js_js._common._label259+'<br>'+lang._js_js._common._label376+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label338+'</font>'+lang._js_js._common._label332+''
		},
		83:{
			info:lang._js_js._common._label339,
			title:lang._js_js._common._label273,
			content:''+lang._js_js._common._label274+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label340+'</font>'+lang._js_js._common._label383+'<br>'+lang._js_js._common._label376+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label340+'</font>'+lang._js_js._common._label366+''
		},
		84:{
			info:lang._js_js._common._label341,
			title:lang._js_js._common._label313,
			content:''+lang._js_js._common._label314+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label342+'</font>'+lang._js_js._common._label260+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label342+'</font>'+lang._js_js._common._label332+''
		},
		85:{
			info:lang._js_js._common._label343,
			title:lang._js_js._common._label315,
			content:''+lang._js_js._common._label253+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label344+'</font>'+lang._js_js._common._label275+''
		},
		86:{
			info:lang._js_js._common._label301,
			title:lang._js_js._common._label316,
			content:''+lang._js_js._common._label247+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label345+'</font>'+lang._js_js._common._label383+'<br>'+lang._js_js._common._label379+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label345+'</font>'+lang._js_js._common._label366+''
		},
		91:{
			info:lang._js_js._common._label341,
			title:lang._js_js._common._label291,
			content:''+lang._js_js._common._label251+'<br>'+lang._js_js._common._label358+'<font style="color:red">['+lang._js_js._common._label360+']</font>'+lang._js_js._common._label383+''
		},
		101:{
			info:lang._js_js._common._label323,
			title:lang._js_js._common._label292,
			content:''+lang._js_js._common._label324+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label317+'</font>'+lang._js_js._common._label283+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label371+'</font>'+lang._js_js._common._label378+'<br>'+lang._js_js._common._label376+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label371+'</font>'+lang._js_js._common._label332+''
		},
		102:{
			info:lang._js_js._common._label333,
			title:lang._js_js._common._label285,
			content:''+lang._js_js._common._label299+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label338+'</font>'+lang._js_js._common._label272+'<br>'+lang._js_js._common._label376+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label338+'</font>'+lang._js_js._common._label366+''
		},
		103:{
			info:lang._js_js._common._label339,
			title:lang._js_js._common._label276,
			content:''+lang._js_js._common._label277+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label340+'</font>'+lang._js_js._common._label383+'<br>'+lang._js_js._common._label376+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label340+'</font>'+lang._js_js._common._label380+''
		},
		104:{
			info:lang._js_js._common._label341,
			title:lang._js_js._common._label318,
			content:''+lang._js_js._common._label319+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label346+'</font>'+lang._js_js._common._label261+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label346+'</font>'+lang._js_js._common._label332+''
		},
		105:{
			info:lang._js_js._common._label347,
			title:lang._js_js._common._label286,
			content:''+lang._js_js._common._label248+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label375+'</font>'+lang._js_js._common._label332+''
		},
		111:{
			info:lang._js_js._common._label348,
			title:lang._js_js._common._label349,
			content:''+lang._js_js._common._label246+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label352+'</font>'+lang._js_js._common._label267+'<br>'+lang._js_js._common._label242+''
		},
		121:{
			info:lang._js_js._common._label320,
			title:lang._js_js._common._label320,
			content:''+lang._js_js._common._label243+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label365+'</font>'+lang._js_js._common._label382+'<font style=\'color:#ff6600\'>'+lang._js_js._common._label361+'</font>'+lang._js_js._common._label254+'FAQ'+lang._js_js._common._label255+''
		}
	};


	this.mainmemuchildicon={
		chara:[
		//{t:lang._js_js._common._label410,i:'characreate'}
		{t:lang._js_js._common._label411,i:'charabasic'}
		,{t:lang._js_js._common._label412,i:'charanickname'}
		,{t:lang._js_js._common._label413,i:'charagoods'}
		,{t:lang._js_js._common._label414,i:'factorystoreroom'}
		,{t:lang._js_js._common._label415,i:'thinghunt'}
		//,{t:lang._js_js._common._label416,i:'charafortune'}
		,{t:lang._js_js._common._label417,i:'characard'}
		,{t:lang._js_js._common._label418,i:'charastory'}
		,{t:lang._js_js._common._label419,i:'charity'}
		,{t:lang._js_js._common._label385,i:'logonreward'}
		//		,(oilFieldId>0)?{t:lang._js_js._common._label420,i:'oilFieldShow'}:{t:lang._js_js._common._label421,i:'oilFieldCreate'}
		//		,{t:lang._js_js._common._label422,i:'oilFieldCreate'}
		//,{t:lang._js_js._common._label423,i:'landStorm'}
		//,{t:lang._js_js._common._label424,i:'wonbto'}

//		,(typeof(IsGoldVipNow) !='undefined' && IsGoldVipNow)?{t:lang._js_js._common._label425,i:'goldvipMessage'}:{t:'',i:''}

		//,{t:lang._js_js._common._label426,i:'shopmyhouse'}
		]
		,sec:[
		{t:lang._js_js._common._label386,i:'sec1'}
		,{t:lang._js_js._common._label427,i:'jobxms'}
		,{t:lang._js_js._common._label428,i:'email'}
		,{t:lang._js_js._common._label429,i:'sec3'}
		,{t:lang._js_js._common._label430,i:'secnote'}
		//,{t:lang._js_js._common._label387,i:'assistTake'}
		//,{t:lang._js_js._common._label431,i:'questionnaire'}
		]
		,invest:[
		{t:lang._js_js._common._label388,i:'invest1'}
		//,{t:lang._js_js._common._label389,i:'invest2'}
		,{t:lang._js_js._common._label432,i:'invest3'}
		,{t:lang._js_js._common._label433,i:'thing6'}
		,{t:lang._js_js._common._label434,i:'markreport'}
		]

		,thing:[
		//{t:sCompanyText,i:sCompanyi}
		{t:'<b>'+lang._js_js._common._label435+'</b>',i:'thingcompanyadmin'}
		//,{t:lang._js_js._common._label436,i:'thing1'}
		//,{t:lang._js_js._common._label437,i:'thingjob'}
		,{t:lang._js_js._common._label438,i:'thing1'}
		,{t:lang._js_js._common._label439,i:'thingstructure',h:lang._js_js._common._label439}
		,{t:lang._js_js._common._label437,i:'jobconst'}
		//,(BuildingId>0)?{t:lang._js_js._common._label440,i:'buildingShow'}:{t:lang._js_js._common._label441,i:'buildingCreate'}
		//,{t:lang._js_js._common._label442,i:'thing5'}
		//,{t:lang._js_js._common._label440,i:'buildingCreate'}
		,(FactoryId>0)?{t:lang._js_js._common._label443,i:'factoryShow'}:{t:lang._js_js._common._label444,i:'factorycreate'}
		//,{t:lang._js_js._common._label445,i:'thingcompanycourse'}
		//,{t:lang._js_js._common._label446,i:'thing8'}
		//		,{t:'<b>'+lang._js_js._common._label447+'</b>',i:'factoryadmin'}
		//,(oilFactoryId>0)?{t:lang._js_js._common._label390,i:'oilFieldRefineryShow'}:{t:lang._js_js._common._label391,i:'oilFieldFactoryCreate'}
		//,(oilFieldId>0)?{t:lang._js_js._common._label420,i:'oilFieldShow'}:{t:lang._js_js._common._label421,i:'oilFieldCreate'}
		//,{t:'<b>'+lang._js_js._common._label448+'</b>',i:'thingshopadmin'}
		,{t:lang._js_js._common._label449,i:'thing2'}
		//		,{t:lang._js_js._common._label384,i:'oilFieldMapSort'}
		//,{t:lang._js_js._common._label450,i:'thingupgrade'}
		//		,{t:'<b>'+lang._js_js._common._label451+'</b>',i:'thingemployeeadmin'}
		,{t:lang._js_js._common._label452,i:'thing3'}
		,{t:lang._js_js._common._label453,i:'thing4'}
		,{t:lang._js_js._common._label454,i:'thingcultivate'}
		]
		,cofc:[
		{t:'<b>'+lang._js_js._common._label455+'</b>',i:'cofcadmin'}
		,{t:lang._js_js._common._label456,i:'cofclist'}
		,(UCofcId>0)?{t:lang._js_js._common._label457,i:'MyUCofc'}:{t:lang._js_js._common._label458,i:'applycofc'}
		,{t:lang._js_js._common._label459,i:'cofcSearch'}
		,{t:lang._js_js._common._label460,i:'landStorm'}
		,{t:''+lang._js_js._common._label557+'',i:'NPClandStorm'}
		//,{t:lang._js_js._common._label392,i:'NPCMyTable'}
		//,{t:lang._js_js._common._label461,i:'cofcevent'}
		]

		,union:[
		{t:'<b>'+lang._js_js._common._label393+'</b>',i:'unionadmin'}
		,{t:lang._js_js._common._label542,i:'cofcpolicy'}
		,{t:lang._js_js._common._label543,i:'unionpolicy'}
		,{t:lang._js_js._common._label544,i:'placard'}
		,{t:lang._js_js._common._label545,i:'buck'}
		,(MyUnionId!=-1)?{t:lang._js_js._common._label546,i:'usepower'}:{t:'',i:''}
		,{t:lang._js_js._common._label547,i:'taxis8'}
		,{t:lang._js_js._common._label462,i:'cofcreport'}
		,{t:lang._js_js._common._label463,i:'gamebtogz'}
		]
		,city:[
		{t:'<b>'+lang._js_js._common._label464+'</b>',i:'thingemployeeadmin'}
		,{t:lang._js_js._common._label465,i:'citymap'}
		,{t:lang._js_js._common._label466,i:'citymayor'}

		,{t:lang._js_js._common._label467,i:'shopcar'}
		//,{t:lang._js_js._common._label468,i:'shophirecar'}
		,{t:lang._js_js._common._label469,i:'market0'}


		//,(ConfigUser.ServerId=='S3'||ConfigUser.ServerId=='S4') ? {t:lang._js_js._common._label394,i:'citybafeite'} :{t:'',i:''}
		,(ConfigUser.SystemMenuBafeite==1) ? {t:lang._js_js._common._label394,i:'citybafeite'} :{t:'',i:''}
		,{t:''+lang._js_js._common._label548+'',i:'cityB24'}
		,{t:''+lang._js_js._common._label470+'',i:'active16'}
		,{t:''+lang._js_js._common._label557+'',i:'NPClandStorm'}
		,(ConfigUser.SystemMenuCofcboon==1) ? {t:lang._js_js._common._label471,i:'cityboon'} :{t:'',i:''}
		,(ConfigUser.SystemMenukursaal==1) ? {t:lang._js_js._common._label472,i:'citykursaal'} :{t:'',i:''}
		//,{t:lang._js_js._common._label395,i:'composeClub'}
		,{t:lang._js_js._common._label473,i:'newactivity'}
		//,{t:lang._js_js._common._label474,i:'newhome'}
		//,(ConfigUser.SystemMenuFate==1) ? {t:lang._js_js._common._label475,i:'cityFate'} :{t:'',i:''}
		//,{t:lang._js_js._common._label476,i:'kursaal'}
		//,{t:lang._js_js._common._label558,i:'stockMarket'}
		//,{t:lang._js_js._common._label559,i:'mediaCenter'}
		//,{t:lang._js_js._common._label396,i:'ribao'}
		//,{t:lang._js_js._common._label477,i:'citysummarize'}
		//,{t:lang._js_js._common._label478,i:'chararead'}
		//,{t:lang._js_js._common._label479,i:'thingcompanysread'}
		//,{t:lang._js_js._common._label456,i:'cofclist'}
		//,{t:lang._js_js._common._label480,i:'cofcpolicy'}
		//,{t:'<b>'+lang._js_js._common._label481+'</b>',i:'cityesta'}
		//,{t:lang._js_js._common._label482,i:'shophouse'}
		//,{t:'DGS'+lang._js_js._common._label560+'',i:'cityDGS'}
		//,{t:lang._js_js._common._label397,i:'cityvenice'}
		//,{t:lang._js_js._common._label483,i:'citypiazza'}
		//,{t:lang._js_js._common._label398,i:'citystock'}
		]
		,taxis:[
		{t:lang._js_js._common._label484,i:'taxis7'}//handle by js lang lib ason
		,{t:lang._js_js._common._label485,i:'taxis1'}//handle by js lang lib
,(ConfigUser.OpenMedia==1) ? {t:lang._js_js._common._label486,i:'taxis9'} :{t:'',i:''}//handle by js lang lib .
		,{t:lang._js_js._common._label487,i:'taxis2'}//handle by js lang lib
,{t:lang._js_js._common._label488,i:'taxis3'}//handle by js lang lib
,{t:lang._js_js._common._label489,i:'taxis4'}//handle by js lang lib
,{t:lang._js_js._common._label490,i:'taxis5'}//handle by js lang lib .

		//,{t:lang._js_js._common._label399,i:'shopthrone'}
		,{t:lang._js_js._common._label491,i:'taxis10'}
		,{t:lang._js_js._common._label492,i:'taxis12'}
		,{t:lang._js_js._common._label400,i:'taxis11'}
		,{t:lang._js_js._common._label401,i:'taxis13'}
		,{t:lang._js_js._common._label549+'',i:'taxis14'}

		,(ConfigUser.SystemMenuxinghua==1) ? {t:lang._js_js._common._label493,i:'shopmeigui'} :{t:'',i:''}
		,(ConfigUser.SystemMenuFad==1) ? {t:lang._js_js._common._label402,i:'shopFadRefine'} :{t:'',i:''}
		,(ConfigUser.SystemMenuBike==1) ? {t:lang._js_js._common._label403,i:'shopBike'} :{t:'',i:''}
		]
		,shop:[
		//{t:lang._js_js._common._label494,i:'shop1'}//handle by js lang lib
{t:'<b>'+lang._js_js._common._label495+'</b>',i:'shop0'}
		//,{t:lang._js_js._common._label556,i:'shopFashion'}
		//,{t:lang._js_js._common._label496,i:'shopMystery'}
		,{t:lang._js_js._common._label497,i:'shop6'}
		,{t:lang._js_js._common._label498,i:'shop4'}
		,{t:lang._js_js._common._label499,i:'shop5'}
		,{t:''+lang._js_js._common._label561,i:'shopgoldchange'}
		//		,{t:lang._js_js._common._label404,i:'shoppointchange'}
		//,(IsVip)?{t:'VIP'+lang._js_js._common._label562+'',i:'VipGetDefine'}:"";
		,{t:''+lang._js_js._common._label562+'',i:'VipGetDefine'}
		,{t:ConfigUser.cofcblock,i:'cofcblock'}//handle by js lang lib
/*	,{t:ConfigUser.cofcnewusercard,i:'cofcnewusercard'}//handle by js lang lib
,{t:ConfigUser.cofcdiamondcard,i:'cofcdiamondcard'}//handle by js lang lib
,{t:ConfigUser.cofcgoldcard,i:'cofcgoldcard'}//handle by js lang lib */

		//,(ConfigUser.ServerId=='S5') ? {t:lang._js_js._common._label500,i:'cofcblock'} :{t:'',i:''}
		/*,{t:'<b>交易市场</b>',i:'market0'}
		//,{t:lang._js_js._common._label501,i:'market_fill'}
		//,{t:lang._js_js._common._label502,i:'market_seek'}
		,{t:lang._js_js._common._label503,i:'factorystoreroom'}
		,{t:lang._js_js._common._label504,i:'market_mySeek'}
		//,{t:lang._js_js._common._label505,i:'market_mySale'}
		//,{t:lang._js_js._common._label506,i:'market_myBuy'}
		,{t:lang._js_js._common._label507,i:'market_account'}*/

		//,{t:lang._js_js._common._label508,i:'shop2'}
		//,{t:'',i:'shop0'}
		//,{t:'<b>'+lang._js_js._common._label495+'</b>',i:'shop0'}
		//,{t:lang._js_js._common._label509,i:'shop4'}
		//,{t:lang._js_js._common._label510,i:'shop5'}
		//,{t:lang._js_js._common._label511,i:'shop6'}
		//,{t:lang._js_js._common._label512,i:'shop7'}
		]

		,setup:[
		//{t:lang._js_js._common._label513,i:'setup1'}
		//,{t:lang._js_js._common._label514,i:'setup2'}
		//,{t:lang._js_js._common._label515,i:'setup3'}
		{t:lang._js_js._common._label516,i:'companysetup'}
		//,{t:lang._js_js._common._label517,i:'thingbankruptcy'}
		,{t:lang._js_js._common._label518,i:'exit'}
		]
		,deal:[
		{t:'<b>'+lang._js_js._common._label469+'</b>',i:'marketMenu'}
		,{t:lang._js_js._common._label519,i:'market_fill'}
		,{t:lang._js_js._common._label503,i:'factorystoreroom'}
		,{t:lang._js_js._common._label504,i:'market_mySeek'}
		,{t:lang._js_js._common._label520,i:'market_mySale'}
		,{t:lang._js_js._common._label507,i:'market_account'}
		,{t:lang._js_js._common._label521,i:'market_help'}
		,{t:lang._js_js._common._label522,i:'market_doubt'}
		]
		,wonbto:[
		{t:'<b>'+lang._js_js._common._label424+'</b>',i:'wonbto'}
		//,{t:lang._js_js._common._label424,i:'wonbto'}
		,{t:lang._js_js._common._label405,i:'wonbtoempshow'}
		,{t:lang._js_js._common._label406,i:'wonbtofreedom'}
		,{t:lang._js_js._common._label407,i:'wonbtopromotion'}

		,ConfigUser.wonBtoVsPkOpen?{t:lang._js_js._common._label408,i:'wonbtoVsCross'}:{t:'',i:''}
		,{t:lang._js_js._common._label523,i:'wonbtovs'}
		,{t:lang._js_js._common._label524,i:'wonbtoaward'}
		,ConfigUser.wonBtoGameRule==null?{t:'',i:''}:{t:lang._js_js._common._label463,i:'wonBtoGameRule'}
		]

		,citykursaal:[
		{t:'<b>'+lang._js_js._common._label472+'</b>',i:'citykursaal'}
		,{t:lang._js_js._common._label472,i:'citykursaal'}
		,{t:lang._js_js._common._label525,i:'cityktaskIntro'}
		,{t:lang._js_js._common._label526,i:'citylucknumber'}
		]

		,media:[
		{t:'<b>'+lang._js_js._common._label527+'</b>',i:'mediaCenter'}
		,{t:lang._js_js._common._label550,i:'mediaCenter4'}

		,{t:lang._js_js._common._label551,i:'mediaCenter3'}
		,{t:lang._js_js._common._label563,i:'mediaCenter1'}
		,{t:lang._js_js._common._label564,i:'mediaCenter2'}

		,{t:lang._js_js._common._label565,i:'mediaCenter5'}
		,ConfigUser.mediaCenterGameRule==null?{t:'',i:''}:{t:lang._js_js._common._label463,i:'mediaCenterGameRule'}

		//,{t:lang._js_js._common._label528,i:'mediajCenterFinance'}
		]
		,meJmo:[
		{t:'<b>'+lang._js_js._common._label565+'</b>',i:'mediajCenterFinance'}
		,{t:lang._js_js._common._label550,i:'mediajCenterFinance4'}

		,{t:lang._js_js._common._label551,i:'mediajCenterFinance3'}
		,{t:lang._js_js._common._label563,i:'mediajCenterFinance1'}
		,{t:lang._js_js._common._label564,i:'mediajCenterFinance2'}

		,{t:lang._js_js._common._label565,i:'mediajCenterFinance5'}
		,ConfigUser.mediaCenterGameRule==null?{t:'',i:''}:{t:lang._js_js._common._label463,i:'mediaCenterGameRule'}

		,{t:lang._js_js._common._label527,i:'mediaCenter'}
		]
		,stockMarket:[
		{t:'<b>'+lang._js_js._common._label529+'</b>',i:'stockMarket'}
		,(StockAccountOpen==0)?{t:lang._js_js._common._label530,i:'stockMarket'}	:{t:'',i:''}
		,(GoOnStockMarket==0)?{t:lang._js_js._common._label531,i:'stockMarket1'}:{t:'',i:''}

		,(StockAccountOpen==1)?{t:lang._js_js._common._label532,i:'stockMarket2'}:{t:'',i:''}
		,(StockAccountOpen==1)?{t:lang._js_js._common._label533,i:'stockMarket12'}:{t:'',i:''}
		,{t:lang._js_js._common._label534,i:'stockMarket4'}
		,(StockAccountOpen==1)?{t:lang._js_js._common._label535,i:'stockMarket3'}:{t:'',i:''}
		,{t:lang._js_js._common._label552,i:'stockMarket5'}
		,(StockAccountOpen==1)?{t:lang._js_js._common._label520,i:'stockMarket6'}:{t:'',i:''}
		,(StockAccountOpen==1)?{t:lang._js_js._common._label536,i:'stockMarket7'}:{t:'',i:''}
		,(StockAccountOpen==1)?{t:lang._js_js._common._label537,i:'stockMarket8'}:{t:'',i:''}
		,(Rule_stockMarket!='')?{t:lang._js_js._common._label463,i:'stockMarket114'}:{t:'',i:''}
		]
	};
	this.mapmemuchildicon={
		1:[
		{t:lang._js_js._common._label553,i:'map1'}
		,{t:lang._js_js._common._label554,i:'map2'}
		,{t:lang._js_js._common._label555,i:'map3'}
		]
		,2:[
		{t:lang._js_js._common._label388,i:'invest1'}
		,{t:lang._js_js._common._label538,i:'invest2'}
		,{t:lang._js_js._common._label409,i:'invest3'}
		]
	}
	this.commchild={
		company:[
		{t:lang._js_js._common._label436,i:'companyBasic'}
		//,{t:lang._js_js._common._label437,i:'companyJob'}
		,{t:lang._js_js._common._label438,i:'companySee'}
		,{t:lang._js_js._common._label539,i:'companyFinance'}
		,{t:lang._js_js._common._label433,i:'companyDire'}
		,{t:lang._js_js._common._label445,i:'companyStele'}
		,{t:lang._js_js._common._label540,i:'companyUpgrade'}

		]
		,shops:[
		{t:lang._js_js._common._label386,i:'sec1'}
		,{t:lang._js_js._common._label428,i:'sec2'}
		,{t:lang._js_js._common._label461,i:'sec3'}
		]
	}
	this._debug=false;
	this.__error=function(x)
	{
		if(this._debug){
			alert(""+lang._js_js._common._label541+":"+x+"!");
		}
		return
	};

	this.CreateCompanyMenu=function (o){
		c.__OnWid(c.__createWin('centermenu','',400,500,50,100,999));
		var m='';
		m+='<div class="m-c-child"><ul>'
		var d=this.commchild[o];
		for (var i in d){
			m+='<li onmouseover="this.className=\'m-c-child-over\'" onmouseout="this.className=\'m-c-child-out\'" '
			m+=' onclick="om.clickchild(\''+d[i].i+'\',\''+d[i].t+'\',this)">'+d[i].t+'</li>'
		}
		m+='</ul></div>';
		this.$('centermenu').innerHTML=m
		if (o == 'company')
		{
			c.__OnWid(c.__createWin('startBusiness','',400,500,100,430,999));
			this.$('startBusiness').innerHTML="<div class='startBusiness' onclick=\"QueryEvent('action=Agent&doaction=startBusiness&TaskId="+this._TaskId+"&MapId="+this._MapId+"',ServerHost+'task.php');\"></div>";
		}

	};


	this._SetMenu1=['chara',(ConfigUser.SystemMenuWonbto==1)?'':'sec','invest','thing',(ConfigUser.OpenMedia==1)?'media':'',(ConfigUser.SystemOpenStock==1)?'stockMarket':'deal','cofc','union',(ConfigUser.SystemMenuWonbto==1)?'wonbto':'','city','taxis','shop',(ConfigUser.SystemOpenCash==1)?'cash':''];//,'media'

	this._SetMenu2=['','','','','','create','setup'];//人物
	this._SetMenu3=['','','','','createcompany','','setup'];//接受任务
	this._SetMenu4=['','','','','','thing','setup','exits'];//已经创建公司

	this._GetMenu=function (){
		var str;
		if (ConfigUser.VUserName==''){
			str= this._SetMenu2;
		}else if( NewFlow.CompanyName == '' ){
			str= this._SetMenu3;
		}else if( NewFlow.CompanyName != '' && NewFlow.ShopsCount==0){
			str= this._SetMenu4;
		}else {
			str= this._SetMenu1;
		}
		return str
	};
	this.setIcon=function(o,e,s,actMain){
		if(actMain==s)return;
		var c=this._GetMenu();
		if (3==e)
		{
			for (var i in c){
				if(c[i]==actMain)return
				if (c[i]==s)
				{
					this.$(c[i]).className='over';
					eval("icon_"+c[i]+" = 1;")
				}else if(c[i]){
					this.$(c[i]).className='out';
					eval("icon_"+c[i]+" = 0;")
				}
			}
			this.icon_i = 1
		}else
		{

			var icon_v = (this.icon_i==1)?eval("icon_"+s):0
			if (0==e && icon_v==0){
				o.className='out';
			}else{
				o.className='over';
			}
		}
	};
	this.__LoadMenu=function(o,actMain,actChild,actMainUrl){//加载主菜单

		var s='';
		if (o=='Menu')
		{
			var c=this._GetMenu();
			for (var i in c){

				var url='',url_n='';
				if (c[i])
				{
					var d=this.mainmemuicon[c[i]];
					var i_n = d['i'];
					var t_n = d['t'];
					var u_n = d['u'];
					if(u_n)url_n = 'om.clickchild(\''+u_n+'\',\''+t_n+'\',this);';
					//=================新手流程部分 stat===============================
					var actClass='';
					if (c[i]==actMain)
					{
						actClass = 'act';
						if (actMainUrl=='invest')//任务
						{
							url_n = "c.__OnSend('ajax_action.php?action=invest3&doaction=NewFlow&getTasks=Angell&sId=\'+c._actMenu+\'','',c.__func_comm_list,'invest3','3');";
						}else if(actMainUrl =='Daily'){ //任务
							url_n = "c.__OnSend('ajax_action.php?action=invest3&doaction=NewFlow&getTasks=Daily&sId=\'+c._actMenu+\'','',c.__func_comm_list,'invest3','3');";
						}else if(actMainUrl =='thing4'){//招聘员工
							url_n = "c.__OnSend('ajax_action.php?action=thing4','',c.__func_comm_list,'thing4');";}else if(actMainUrl =='thing4'){//招聘员工
								url_n = "c.__OnSend('ajax_action.php?action=thing4','',c.__func_comm_list,'thing4');";
							}else if(actMainUrl =='thing2'){//
								url_n = "c.__OnSend('ajax_action.php?action=thing2','',c.__func_comm_list,'thing2');";
							}else if(actMainUrl =='BusinessRead'){ //开始营业
								url_n = "c.__OnSend('ajax_action.php?action=thingjob&newflow=1','',c.__func_comm_list,'thingjob','3');";
							}else if(actMainUrl =='city'){ //城市
								//url_n = "c.__OnSend('ajax_action.php?action=thingjob&newflow=1','',c.__func_comm_list,'thingjob','3');";
							}else if(actMainUrl !== undefined){
								url_n = actMainUrl;
							}
					}
					//=================新手流程部分 end===============================
					if (i_n=='exits')
					{
						url=' onClick="javascript:location.href=\'login.php?action=out\'" ';
					}else if (i_n=='characreate'){

						url=' onClick="javascript:c.__OnSend(\'ajax_action.php?action=characreate\',\'\',c.__func_comm_list,\'characreate\');om.setIcon(this,3,\''+i_n+'\')"" ';
					}else if(i_n=='cash'){
						url=' onClick="javascript:window.open(\''+eval(ConfigUser.Pay_Url)+'\');om.setIcon(this,3,\''+i_n+'\')"" ';

					}else if (u_n=='Edifice'){
						url=" onClick=\"c.__OnSend('ajax_action.php?action=NewUserFlow','',c.__func_comm_list,'NewUserFlow');\" ";
					}else{
						//
						url='onClick="javascript:om.clickmain(\''+i_n+'\',this,\''+actMain+'\',\''+actChild+'\');om.mainhintname=\''+i_n+'\';om.main_hint_open(\''+i_n+'\',\'\');'+url_n+'om.setIcon(this,3,\''+i_n+'\',\''+actMain+'\')"" ';
						//url='onClick="alert(om)"'
					}
					url+=' onmousedown="om.setIcon(this,1,\''+i_n+'\',\''+actMain+'\')" ';
					url+=' onmouseover="om.setIcon(this,2,\''+i_n+'\',\''+actMain+'\')" ';
					url+=' onmouseout="om.setIcon(this,0,\''+i_n+'\',\''+actMain+'\')" ';

					if(i_n=='create')url='';
					s+='<a href="javascript:void(0)" '+url+' id='+c[i]+' class='+actClass+'><img src="'+ImgRoot+'images/default/'+c[i]+'.gif" alt="'+t_n+'" /></a>';
				}else{
					s+='<div style-"width:30px;"></div>';
				}

			}
			var mo=this.$('nMain'+o); if (!mo)return;
			mo.innerHTML=s;
		}

	};
	this.main_NewUserFlowUrl=function (ac){};
	/*新手引导提示20090427dave*/
	this.main_hint_newFlow_open=function (n){
		/*if(typeof(GlobalVal.PublicTest) != 'undefined') {
		if(GlobalVal.PublicTest==1) return;
		}*/
		if(NewFlowTips>=122) return;
		NewFlowTips=n+1;
		if(NewFlowTips_is!=1) return;
		this.main_hint_close();
		if(!om.NewFlowTips[n]) return;
		title = om.NewFlowTips[n].title;
		content = om.NewFlowTips[n].content;
		var mo=this.$('NewFlowWindow'); if (!mo)return;mo.style.display='';
		var s="";
		mo.innerHTML=s;
		s+='<table cellspacing="0" cellpadding="0" border="0" style="width: 243px;" class="NewFlowWindow">';
		s+='<tr style="height: 243px;"><td valign="top" style="padding: 10px; text-align: left;">';
		/*s+='<div style="clear: both; height: 30px; padding-top:10px; width: 100%;text-align:right; margin-right:-10px;">';
		s += "<img src=\'" + ImgRoot  +"images/blank.gif\' height='22' width='22' style='cursor:pointer;' onclick='om.main_hint_newFlow_close()' />";
		s+='</div>';*/
		s += "<div style='height:30px;padding-top:10px;position:relative;width:105%;text-align:right;'><div style='float:right;height:22px;width:22px;cursor:pointer;' onclick='om.main_hint_newFlow_close()' ></div></div>";
		s += '<div class="NewFlowWindowbar" style="margin-left:50px;width:175px;position:absolute">';
		s += '<table cellspacing="0" cellpadding="0" border="0" align="center" class="tborder">';
		s += '<tr><td width="*" colspan="2" style="color: rgb(239, 162, 37); text-align: center; font-weight: bold; line-height: 120%;padding-left:20px;">'+title+'</td></tr>';
		s += '<tr><td width="*" colspan="2" style="color: rgb(255, 250, 110); text-indent: 2em;"><div class="scrollBar" style="height:140px">'+content+'</div></td></tr>';
		s += '</table></div></td></tr></table>';
		mo.innerHTML=s;
	}
	this.main_hint_newFlow_close=function (){
		var mo=this.$('NewFlowWindow'); if (!mo)return;mo.style.display='none';
	}
	/*新手引导提示end*/

	this.main_hint_open=function (i,n){

		if(ConfigUser.NewFlowStart==1)return;
		if(ConfigUser.user_mainhint==1)return;
		var mo=this.$('CommWindow'); if (!mo)return;mo.style.display='';
		var iName = i==""?this.mainhintname:i;
		var s="",str="";
		if(n!=''){
			str=n;
		}else{
			str = this.mainmemuicon[iName]['h'];
		}
		s+="<table class='CommWindow' style='width:200px; '   cellspacing=0  >"
		s+="<tr style='height:80px;'><td style='padding:10px;text-align:left;' valign=top><div class='CommWindowbar' style='clear:both;position:relative;'>";
		s+="<table align=center class=tborder style='width:90%;'  cellspacing=0  >";
		s+= "<tr ><td  width=* style='color:#FFFA6E' colspan=2>"+str+"</td></tr>";
		s+="</table></div><div style='height:8px'></div><div style='padding-left:2px'><a href=\"javascript:void(0)\" onclick=\"c.__send('ajax_action.php?action=mainhint&mainhint=1');ConfigUser.user_mainhint=1;om.main_hint_close()\" class=zhidao >"+lang._js_js._common._label567+"</a></div></td></tr></table>";
		mo.innerHTML=s;
		this.main_hint_time = 35;
		this.main_hint_set_close();
	}
	this.main_hint_close=function (){
		var mo=this.$('CommWindow'); if (!mo)return;mo.style.display='none';
	}
	this.main_hint_startit=function (){
		if (this.main_hint_time>0){
			this.main_hint_time--;
		}else{
			clearInterval(om.main_hint_timerInterval);
			this.main_hint_close();
		}
	}
	this.main_hint_set_close=function (){
		this.main_hint_timerInterval=setInterval("om.main_hint_startit()",1000);
	}

	this.mainmenuchild=function(o,actChild){ //加载子菜单
		//		if(o=="deal" && ConfigUser.user_SocietyGrade<2)return;

		var s='';var oo=this.mainmemuchildicon[o];
		if(o=="stockMarket") {
			oo = [
			{t:'<b>'+lang._js_js._common._label568+'</b>',i:'stockMarket'}
			,(StockAccountOpen==0)?{t:lang._js_js._common._label569,i:'stockMarket'}	:{t:'',i:''}
			,(GoOnStockMarket==0)?{t:lang._js_js._common._label570,i:'stockMarket1'}:{t:'',i:''}
			,(GoOnStockMarket==1)?{t:lang._js_js._common._label571,i:'stockMarketMore'}:{t:'',i:''}

			,(StockAccountOpen==1)?{t:lang._js_js._common._label588,i:'stockMarket999'}:{t:'',i:''}   //add by Manson//handle by js lang lib ,(GoOnStockMarket==1)?{t:lang._js_js._common._label590,i:'stockMarket994'}:{t:'',i:''}//handle by js lang lib add by Manson

			,(StockAccountOpen==1)?{t:lang._js_js._common._label572,i:'stockMarket2'}:{t:'',i:''}
			,{t:lang._js_js._common._label573,i:'stockMarket4'}
			,(StockAccountOpen==1)?{t:lang._js_js._common._label574,i:'stockMarket12'}:{t:'',i:''}
			,(StockAccountOpen==1)?{t:lang._js_js._common._label575,i:'stockMarket3'}:{t:'',i:''}
			//			,{t:lang._js_js._common._label589,i:'stockMarket5'}
			,(StockAccountOpen==1)?{t:lang._js_js._common._label576,i:'stockMarket6'}:{t:'',i:''}
			,(StockAccountOpen==1)?{t:lang._js_js._common._label577,i:'stockMarket7'}:{t:'',i:''}
			,(StockAccountOpen==1)?{t:lang._js_js._common._label578,i:'stockMarket8'}:{t:'',i:''}
			,(Rule_stockMarket!='')?{t:lang._js_js._common._label579,i:'stockMarket114'}:{t:'',i:''}
			];
		}
		if (!IsTrue(oo))return ;

		for (var i in oo){
			//if (  oo[i]['i']=='characreate')if (ConfigUser.VUserName!='')continue;
			var strT = oo[i]['t'];
			if(strT=='')continue;
			if (strT.indexOf('<b>')!=-1)
			{
				s+='<li >'+oo[i]['t']+'</li>';
			}else{
				//alert(oo[i]['t'])
				if(oo[i]['i']=='MyUCofc'||oo[i]['i']=='applycofc'){
					if(Math.floor(UCofcId)>0){
						oo[i]['t']=lang._js_js._common._label580
						oo[i]['i']='MyUCofc'
					}else{
						oo[i]['t']=lang._js_js._common._label581
						oo[i]['i']='applycofc'
					}
				}
				if(oo[i]['i']=='factoryShow'||oo[i]['i']=='factorycreate'){
					if(FactoryId>0){
						oo[i]['t']=lang._js_js._common._label582
						oo[i]['i']='factoryShow'
					}else{
						oo[i]['t']=lang._js_js._common._label583
						oo[i]['i']='factorycreate'
					}
				}
				/*if(oo[i]['i']=='buildingShow'||oo[i]['i']=='buildingCreate'){
					if(BuildingId>0){
						oo[i]['t']=lang._js_js._common._label584
						oo[i]['i']='buildingShow'
					}else{
						oo[i]['t']=lang._js_js._common._label585
						oo[i]['i']='buildingCreate'
					}
				}
				if(oo[i]['i']=='oilFieldShow'||oo[i]['i']=='oilFieldCreate'){
					if(oilFieldId>0){
						oo[i]['t']=lang._js_js._common._label586
						oo[i]['i']='oilFieldShow'
					}else{
						oo[i]['t']=lang._js_js._common._label587
						oo[i]['i']='oilFieldCreate'
					}
				}*/

				if (oo[i]['i']=='exit')
				{
					s+='<li onmouseover="this.className=\'m-s-child-over\'" onmouseout="this.className=\'m-s-child-out\'" onClick="javascript:location.href=\'login.php?action=out\'"><a href="javascript:void(0)">'+oo[i]['t']+'</a></li>';
				}else if(oo[i]['i']=='shop6'){
					s+='<li onmouseover="this.className=\'m-s-child-over\'" onmouseout="this.className=\'m-s-child-out\'" ><a href="'+eval(ConfigUser.Pay_Url)+'" target="_blank">'+oo[i]['t']+'</a></li>';

					/*}else if(oo[i]['i']=='kursaal'){
					s+='<li onmouseover="this.className=\'m-s-child-over\'" onmouseout="this.className=\'m-s-child-out\'" ><a href="kursaal.php" target="_blank">'+oo[i]['t']+'</a></li>';	*/
				}else if(oo[i]['i']=='gamebtogz'){
					s+='<li onmouseover="this.className=\'m-s-child-over\'" onmouseout="this.className=\'m-s-child-out\'" ><a href="'+ConfigUser.gamebtoRule+'" target="_blank">'+oo[i]['t']+'</a></li>';

				}else{
					var actClass='';
					var onclickstr = 'onclick="om.clickchild(\''+oo[i]['i']+'\',\''+oo[i]['t']+'\',this)"';
					if (oo[i]['i']==actChild)
					{
						actClass = ' class="mchildover" ';
						if(c._actChildUrl!='')onclickstr = 'onclick="'+c._actChildUrl+'"';
					}
					s+='<li '+actClass+' '+onclickstr+' onmouseover="this.className=\'m-s-child-over\'" onmouseout="this.className=\'m-s-child-out\'" ><a href="javascript:void(0)">'+oo[i]['t']+'</a></li>';
				}
			}
		}
		var co=this.$('a-menuchild');if (!co)return; s+='<br style="clear:both;"/>';co.innerHTML=s;
		//$('mainhost').innerHTML='';
	}


	/*事件开始*/
	this.clickmap=function (s,o) {  //地图点击事件

	}
	this.mainimg=function(s,o){ //加载没有事件的图片

		var oo=this.$('main'+o);
		var s
		s='m-'+o;
		if (oo==null)return;
		oo.className=s;
	};
	this.OnNewFlow=function(){
		if(ConfigUser.NewFlowStart==1){
			c.__MainMsg(''+lang._js_js._common._label594+','+lang._js_js._common._label592+','+lang._js_js._common._label591+'.',3,5,lang._js_js._common._label593);
			return true;
		}
	};
	this.RightMap=function (s){
		getObj('clockmenu').className=(s==1)?'clockmenu2':'clockmenu';
		getObj('indexbox').className=(s==1)?'indexbox2':'indexbox';
		getObj('header').className=(s==1)?'header2':'header';
	};
	this.clickmain=function (s,o,actMain,actChild) {  //主栏目点击事件
		c.__OnCloseWid();
		this.RightMap();//换右边菜单背景
		if (isIE6)
		{
			this.imgs=s;
			setTimeout("om.mainimg(om.imgs,'host');",100);
		}else{
			this.mainimg(s,'host');//改变主背景
		}

		this.mainmenuchild(s,actChild)
		if(s=='city'){
			//Load_Map((s=='city')?((NewFlow.OwnerShops==0)?2:1):0);
			if(NewFlow.OwnerShops==0){
				Load_Map(2)
				c.__CreateShopHint();
			}else{
				if(this.OnNewFlow())return ;//新手流程限制
				Load_Map(1)
			}

		}
		var objname = "host_right"
		if (!this.$(objname))
		{
			this._debug=true
			//this.__error('无法加载 '+objname+' 对象,请重新刷新页面或打开IE再重试 ！')

		}else{
			c.__OnCloseWid();
			/*if (this.$(objname).style.display=="")this.$(objname).style.display="none"
			if (this.$('OpenLeft'))this.$('OpenLeft').style.display = "none";
			if (this.$('OpenRight'))this.$('OpenRight').style.display = "none";
			if (this.$('OpenLeftBig'))this.$('OpenLeftBig').style.display = "none";
			if (this.$('Hint'))this.$('Hint').style.display = "none";*/

		}
	}

	this.clickchild=function (n,t,o) { //子菜单事件

		if (n != "stockMarketMore" &&n != "wonbtotest" &&n != "wonbtoVsCrossList")     //如果是退市的连接就不关闭 edit by Manson [09-07-05]
		{
			c.__OnCloseWid();
		}
		this.RightMap();//换右边菜单背景
		c._st.clear();
		$('mainhost').innerHTML='';
		if(n!='characreate'){
			if(this.OnNewFlow())return ;//新手流程限制
		}

		if (isIE6)
		{
			setTimeout("om.mainimg('','host');",100);
		}
		var Config_con="";
		try{
			Config_con = (eval("Config_"+n))
		}catch(e){
			//this._debug=true;this.__error(e.description);
		}
		//=============共享对象===================

		//=============发送处理===================
		var Confin={name:'MenuChild',title:t,contents:Config_con,error:0,menuaction:'MenuChild',action:n}

		if(n=='thingstructure'){
			om.main_hint_open('',lang._js_js._common._label599);
		}else if(n=='thing4'){
			om.main_hint_open('',""+lang._js_js._common._label600+"<a href=\"javascript:void(0);\" onclick=\"c.__OnSend('ajax_action.php?action=shop4','',c.__func_comm_list,'shop4');\" class=mainhintcss>"+lang._js_js._common._label605+"</a>"+lang._js_js._common._label604+"");
		}else if(n=='characard'){
			om.main_hint_open('',lang._js_js._common._label598);
		}else if(n=='factorycreate'){
			om.main_hint_open('',lang._js_js._common._label595);
		}else if(n=='thing2'){
			om.main_hint_open('',lang._js_js._common._label597);
		}else if(n=='thing3'){
			om.main_hint_open('',lang._js_js._common._label602);
		}else if(n=='landStorm'){
			om.main_hint_open('',lang._js_js._common._label596);
		}else if(n=='jobconst'){
			om.main_hint_open('',""+lang._js_js._common._label601+"G"+lang._js_js._common._label603+"");
		}
		if(n=='characreate'  ||n=='characreatequick'||n=='secCreate'||n=='charaInfoEdit'  ||n=='charagoods'  ||n=='treasurekursaal'  || n=='charabasic' || n=='characard' || n=='chararead'  || n=='charaattribute' || n=='charafortune' || n=='charastory' || n=='charity'|| n=='thing2' || n=='thing3' || n=='thing4' || n=='thing5'|| n=='thingcompanycourse' || n=='thingjob'|| n=='thingcompanysread' || n=='thing6' || n=='thing8'|| n=='thingshopsupgrade'|| n=='thingmycompanysread' || n=='thingupgrade'|| n=='thingEmployeeAdvanced' || n=='thingEmployeeIQ'|| n=='citysummarize'|| n=='city1' || n=='city2' || n=='city3' || n=='city15' || n=='cityB24'|| n=='active16' || n=='active16change' || n=='cityDGS'|| n=='shop1' || n=='shop2' || n=='shop3' || n=='shop4' || n=='shopbuypage' || n=='shop5'|| n=='sec3' ||n=='jobxms' ||n=='charanickname'|| n=='taxis1' || n=='taxis2' || n=='taxis3' || n=='taxis4' || n=='taxis5' || n=='taxis6'|| n=='taxis7'|| n=='taxis8'|| n=='taxis9' ||n=='taxis10' ||n=='taxis11' ||n=='taxis12' ||n=='taxis13' ||n=='taxis14' || n=='major'|| n=='invest1' || n=='invest2' || n=='invest3'|| n=='setup2'|| n=='setup3'|| n=='citymayor'|| n=='cityboon'|| n=='cityf500w'||n=='cityktaskIntro' || n=='cityDonateBook' || n=='cityDonateBottle'|| n=='cityBooklet'||n=='cityBottle'||n=='cityFate'|| n=='citybafeite'  || n=='cityvenice' || n=='citypiazza'|| n=='cofcblock'|| n=='cofcnewusercard'|| n=='cofcdiamondcard'|| n=='cofcgoldcard'|| n=='cofcattorn'|| n=='cofcsetpower'|| n=='buck' || n== 'placard' || n== 'thing1'  || n== 'thingstructure'|| n== 'cofcreport'|| n=='shopcar' ||n=='shophirecar' || n=='shophouse' || n=='shopmycar' || n=='shopmyhouse' || n=='shopgoldchange'|| n=='shoppointchange'|| n=='shopthrone'|| n=='shopmeigui'|| n=='shopFadRefine' || n=='shopBike'|| n=='jobconst' || n=='jobnewflow'|| n=='sec1'|| n=='thingbankruptcy'|| n=='factorystoreroom'|| n=='thinghunt' || n=='market_fill' ||n=='market_doubt' || n=='market_seek' || n=='pointchange' || n=='market_mySeek' || n=='market_mySale' || n=='market_myBuy'|| n=='market_account' || n=='factoryRead'|| n=='thingpower'|| n=='usepower'||n=='NPCMyTable' ||n=='composeClub' ||n=='composeMedal' ||n=='composeVehicle' ||n=='composeTempVehicle' ||n=='composeComVehicle' ||n=='composeSetName' ||n=='compComSetName' || n=='shopCleanliness'|| n=='shopPointAccer' || n=='assistTake' || n=='logonreward' || n=='oilFieldSurvey'|| n=='oilFieldTotal'|| n=='wonbtoempshow'||n=='wonbtotest'|| n=='wonbtofreedom' || n=='wonbtocampaign'|| n=='wonbtovs'|| n=='wonbtopromotion'|| n=='wonbtoaward' || n=='wonbtoscrore' || n=='multiselect' || n=='secnote' || n=='shopVipInviteLetter' || n=='shopFashion' || n=='showFashionList' || n=='composeFashion' || n=='newactivity' || n=='resetcarname' || n=='newhome' || n=='shopMystery' || n=='wonbtotestTable'|| n=='recruit'|| n=='recruitEmp' || n=='fashionLotBuyList' || n=='wonbtoVsCross'  || n=='wonbtoVsCrossTop'  || n=='wonbtoVsCrossVs'  || n=='wonbtoVsCrossList'  || n=='wonbtoVsCrossVsShow' || n == 'questionnaire' || n == 'employeecommuLot'
		){
			c.__OnSend('ajax_action.php?action='+n,'',c.__func_comm_list,n);

		}else if(n.indexOf('stockMarket')!=-1) {
			this.mainmenuchild('stockMarket');
			var stockNum = n.replace('stockMarket','');
			switch(stockNum){
				case ""://申请开户
				if(StockAccountOpen==0){
					c.__OnSend('ajax_action.php?action=stockMarket_OpenStockMarket','',c.__func_comm_list,'stockMarket');
				}else{
					c.__OnSend('ajax_action.php?action=stockMarket_StockMarketList','',c.__func_comm_list,'stockMarket',2);
				}
				break;
				case '1'://申请上市
				c.__OnSend('ajax_action.php?action=stockMarket_ApplyGoOnStock','',c.__func_comm_list,'stockMarket',stockNum);
				break;
				case '2'://交易大厅
				c.__OnSend('ajax_action.php?action=stockMarket_StockMarketList','',c.__func_comm_list,'stockMarket',stockNum);
				break;
				case '3'://个股查询
				c.__OnSend('ajax_action.php?action=stockMarket_StockSearch','',c.__func_comm_list,'stockMarket',stockNum);
				break;
				case '4'://股市新闻
				c.__OnSend('ajax_action.php?action=stockMarket_StockNews','',c.__func_comm_list,'stockMarket',stockNum);
				break;
				case '5'://涨跌榜
				c.__OnSend('ajax_action.php?action=stockMarket_StockBoard','',c.__func_comm_list,'stockMarket',stockNum);
				break;
				case '6'://我的订单
				c.__OnSend('ajax_action.php?action=stockMarket_StockMarketList&MyList=1','',c.__func_comm_list,'stockMarket',2);
				break;
				case '7'://我的账户
				c.__OnSend('ajax_action.php?action=stockMarket_MyAccount','',c.__func_comm_list,'stockMarket',stockNum);
				break;
				case '8'://操作记录
				c.__OnSend('ajax_action.php?action=stockMarket_StockRecod','',c.__func_comm_list,'stockMarket',stockNum);
				break;
				case '12'://股市新闻
				c.__OnSend('ajax_action.php?action=stockMarket_ShowStockList','',c.__func_comm_list,'stockMarket',stockNum);
				break;
				case '114'://游戏规则
				window.open(Rule_stockMarket);
				c.__OnSend('ajax_action.php?action=stockMarket_StockMarketList','',c.__func_comm_list,'stockMarket',2);
				break;
				case '999'://承销商
				c.__OnSend('ajax_action.php?action=stockMarket_underwriter','',c.__func_comm_list,'stockMarket',stockNum);
				break;
				case '994'://退市
				c.__Confirm('',lang._js_js._common._label606,"c.__OnSend('ajax_action.php?action=stockMarket_OutStockmarket','',c.__func_comm_list,'stockMarket', 2);");
				break;
				case 'More'://申请增发
				c.__Confirm('',lang._js_js._common._label607,"c.__OnSend('ajax_action.php?action=stockMarket_More','',c.__func_comm_list,'stockMarket', 999);");
				break;
			}
		}else if(n == 'landStorm'){
			Load_Map(9);
		}else if(n == 'NPClandStorm'){
			Load_Map(28);
		}
		else if(n == 'market_help'){
			window.open(TradeLink);
			c.__OnSend('ajax_action.php?action=market_fill','',c.__func_comm_list,'market_fill');
		}else if(n == 'shop6'){
			c.__OnSend('ajax_action.php?action=shop4&pay=1','',c.__func_comm_list,'shop4');
		} else if(n.indexOf('goldvip') !=-1 ) {
			c.__OnSend('ajax_action.php?action='+n,'',c.__func_comm_list,n);
		} else if(n.indexOf('oilField') !=-1 && n!='oilFieldCreate' && n!='oilFieldShow' && n!='oilFieldFactoryCreate') {
			c.__OnSend('ajax_action.php?action='+n,'',c.__func_comm_list,n);
		} else if (n=='VipGetDefine'){
			c.__OnSend('ajax_action.php?action=VipGetDefine&Id=1','',c.__func_comm_list,'VipGetDefine');
		}else if (n=='factoryShow'){
			c.__OnSend('ajax_action.php?action=factoryShow&Id='+FactoryId,'',c.__func_comm_list,'factoryShow');
		}else if (n=='buildingCreate'){
			Load_Map(15);
			//c.__OnSend('ajax_action.php?action=buildingCreate&','',c.__func_comm_list,'buildingCreate');
		}else if (n=='buildingShow'){
			c.__OnSend('ajax_action.php?action=buildingShow&','',c.__func_comm_list,'buildingShow');
		}else if (n=='oilFieldCreate'){
			Load_Map(29);
			//c.__OnSend('ajax_action.php?action=buildingCreate&','',c.__func_comm_list,'buildingCreate');
		}else if (n=='oilFieldShow'){
			c.__OnSend('ajax_action.php?action=oilFieldShow&','',c.__func_comm_list,'oilFieldShow');
		}else if (n=='factorycreate' || n=='oilFieldFactoryCreate' ){
			Load_Map(10);
		}else if (n=='market0'){
			this.mainmenuchild('deal');
			c.__OnSend('ajax_action.php?action=market_fill','',c.__func_comm_list,'market_fill');
		}else if (n=='wonbto'){
			this.mainmenuchild('wonbto');
	        c.__OnSend('ajax_action.php?action=wonbtofreedom','',c.__func_comm_list,'wonbtofreedom');
		}else if (n=='citykursaal'){
			//this.mainmenuchild('citykursaal');
			c.__OnSend('ajax_action.php?action=citykursaal','',c.__func_comm_list,'citykursaal');
		}else if (n=='citylucknumber'){
			var plus_host = location.host;
			if (plus_host.indexOf('duowan.com')==-1){
				window.open('kursaal.php');
				c.__OnSend('ajax_action.php?action=citykursaal','',c.__func_comm_list,'citykursaal');
			}else{
				c.__OnSend('urlRefresh.php?act=go','',c.__func_comm_list,'citykursaal');
			}

		}else if (n=='mediaCenter'||n=='mediaCenter1'||n=='mediaCenter2'||n=='mediaCenter3'||n=='mediaCenter4'||n=='mediaCenter5'){
			this.mainmenuchild('media');
			var mediaNum = n.replace('mediaCenter','');
			switch(mediaNum){
				case '':
				c.__OnSend('ajax_action.php?action=mediaCenter_ShowInfo','',c.__func_comm_list,'mediaCenter');
				break;
				default:
				c.__OnSend('ajax_action.php?action=mediaCenter_ShowInfo&MediaId='+mediaNum+'','',c.__func_comm_list,'mediaCenter',1);
				break;
			}
		}else if (n=='mediajCenterFinance'||n=='mediajCenterFinance1'||n=='mediajCenterFinance2'||n=='mediajCenterFinance3'||n=='mediajCenterFinance4'||n=='mediajCenterFinance5'){
			this.mainmenuchild('meJmo');
			var mediaNum = n.replace('mediajCenterFinance','');
			switch(mediaNum){
				case '':
				c.__OnSend('ajax_action.php?action=mediajCenterFinance_ShowInfo','',c.__func_comm_list,'mediajCenterFinance');
				break;
				default:
				c.__OnSend('ajax_action.php?action=mediajCenterFinance_ShowInfo&MediaId='+mediaNum+'','',c.__func_comm_list,'mediajCenterFinance',1);
				break;
			}
		}else if(n == 'mediaCenterGameRule'){
			window.open(ConfigUser.mediaCenterGameRule);
			c.__OnSend('ajax_action.php?action=mediaCenter_ShowInfo','',c.__func_comm_list,'mediaCenter');
		}else if(n == 'wonBtoGameRule'){
			window.open(ConfigUser.wonBtoGameRule);
			c.__OnSend('ajax_action.php?action=wonbtofreedom','',c.__func_comm_list,'wonbtofreedom');
		}else if (n=='email'){
			//c.__MainMsg('请等待,数据加载中...');
			c.__OnSend('ajax_action.php?action=email_inceptread','',c.__func_comm_list,'email',12);
		}else if (n=='thingcultivate'){
			//c.__MainMsg('请等待,数据加载中...');
			c.__OnSend('ajax_action.php?action=thing3&doaction=1&MyShopId=0','',c.__func_comm_list,'thing3',5);
		}else if (n=='thingfireemployee'){
			//c.__MainMsg('请等待,数据加载中...');
			c.__OnSend('ajax_action.php?action=thingfireemployee','',c.__func_comm_list,'thingfireemployee');
		}else if (n=='citymap'){
			Load_Map(1);
		}else if (n=='Edifice'){
			//c.__MainMsg('请等待,数据加载中...');
			c.__OnSend('ajax_action.php?action=Edifice','',c.__func_comm_list,'Edifice','','Edifice');
		}else if (n=='citystock'){
			c.__OnStock();
		}else if (n=='companysetup'){
			//c.__MainMsg('请等待,数据加载中...');
			c.__OnSend('ajax_action.php?action=thing1&doaction=edit','',c.__func_comm_list,'thing1',1);
		}else if (n=='thingcompany'){
			if(CanBuildCompany){
				Load_Map(RootMapId);
			}else{
				LoadCompany();
				this.CreateCompanyMenu('company');
			}

			/*}else if (n=='invest3'){c.__OnOpenWid(Confin)*/
		}else if (n=='cofclist' || n=='cofcSearch'){
			c.__OnSend('ajax_union.php?action='+n,'',c.__func_comm_list,n);
		}else if(n=='applycofc'){
			//c.__MainMsg('请等待,数据加载中...');
			c.__OnSend('ajax_union.php?action=applycofc','',c.__func_comm_list,'applycofc',1);
		}else if(n=='MyUCofc'||n=='cofclistMy'){
			if(Math.floor(UCofcId)>0){
				c.__OnSend('ajax_union.php?action=MyUCofc','',c.__func_comm_list,'MyUCofc');
			}else{c.__OnSend('ajax_union.php?action=cofclist','',c.__func_comm_list,'cofclist');}
		}else if (n=='cofcpolicy'||n=='unionpolicy'){
			//c.__MainMsg('请等待,数据加载中...');
			//c.__OnSend('ajax_action.php?action='+n,'',c.__func_comm_list,n);
			if (document.getElementById('newPlayerHelp').style.display != 'none')document.getElementById('newPlayerHelp').style.display = 'none';
			c.Confin = Confin;
			this.Load_Tpl(n);
		}
		else if (n=='ribao'){
			//c.__MainMsg('请等待,数据加载中...');
			c.__OnDayNews();
		}
		else if (n=='markreport'){
			//			QueryEvent('action=Agent&doaction=BoardReport',ServerHost+'task.php');
			QueryEvent('action=assistTake&murl=wmoJobAction&tid=1&jaction=Agent&doaction=BoardReport',ServerHost+'task.php');
			//c.__OnSend('task.php?action=Agent&doaction=BoardReport','',c.__func_comm_list,'Agent');
		}else{
			c.__OpenHostRight(Confin)
		}
	};
	this.Load_Tpl=function (n) {  //加入静态模板
		var MTplVal="";
		c._MTploK= false;

		if(n=='cofcpolicy'){
			c._action=n;
			c.__loadJs(ServerHost+'cache/LeagueTree.js?d='+Date());
			if(typeof cofc_Tpl == 'undefined'||typeof c._cofcpolicy == 'undefined'||IsTrue(c._cofcpolicy)==false||c._cofcpolicy==''){
				c.__loadJs(ImgRoot+'js/templates/cofc_Tpl.js');
			}else{
				c._MTploK= true;
			}
			if(typeof cofc_Tpl != 'undefined' &&IsTrue(c._cofcpolicy)){
				MTplVal = cofc_Tpl(n);
				if(typeof MTplVal != 'undefined' && IsTrue(c._cofcpolicy))c._MTploK= true;
			}
		}else if(n=='unionpolicy'){
			c._action=n;
			c.__loadJs(ServerHost+'cache/UnionTree.js?d='+Date());
			if(typeof unionpolicy_Tpl == 'undefined'||typeof c._unionpolicy == 'undefined'||IsTrue(c._unionpolicy)==false||c._unionpolicy==''){
				c.__loadJs(ImgRoot+'js/templates/union_Tpl.js');
			}else{
				c._MTploK= true;
			}
			if(typeof unionpolicy_Tpl != 'undefined' &&IsTrue(c._unionpolicy)){
					MTplVal = unionpolicy_Tpl(n);
					if(typeof MTplVal != 'undefined' && IsTrue(c._unionpolicy))c._MTploK= true;
			}
		}
		if(c._MTploK==false){
			setTimeout('om.Load_Tpl("'+n+'")',200);
		}else{
			c.__OpenHostRight(c.Confin);return false;
		}

	};
	this.clickemail=function () {  //邮件事件
		c.__OnCloseWid();
		if(Message&1){
			//c.__MainMsg('请等待,数据加载中...');
			Message&=2;
			c.__OnSend('ajax_action.php?action=email_inceptread','',c.__func_comm_list,'email',12);
		}else if(Message&2){
			//c.__MainMsg('请等待,数据加载中...');
			Message&=1;
			c.__OnSend('ajax_action.php?action=sec3','',c.__func_comm_list,'sec3');
		}else{
			c.__OnSend('ajax_action.php?action=sec3','',c.__func_comm_list,'sec3');
		}

		EnabledFlashEmail=false;

		//OnNewMessage('1',0,'11')
	}

	this.secinfo=function (){ //跳转到小秘书信息页
		c.__OnCloseWid();
		c.__OnSend('ajax_action.php?action=sec1','',c.__func_comm_list,'sec1');
	}

	this.setIcon_email=function(o,e,s){var oo=om.$('main'+s);if (0==e){var c='m-'+s;oo.className=c;}else{var c='m-'+s+'-ov';oo.className=c;}};

	/*初始化用户信息*/
	this.user_comlevel=a['user_comlevel']||lang._js_js._common._label610;
	this.user_goldnumber=a['user_goldnumber']||'0';
	this.user_liquannumber=a['user_liquannumber']||'0';
	this.user_allasset=a['user_allasset']||(CompanyId>0?'0':'500000');
	this.user_allassetHint=a['user_allassetHint']||'0';
	this.user_id=a['user_id']||'';
	this.user_vip=a['user_vip']||'';
	this.user_vip_start = a['user_vip_start']||'';
	this.user_vip_start_str = a['user_vip_start_str']||'';
	this.user_CanChangePoint = a['user_CanChangePoint']||'';
	this.user_TiredDegrees = a['user_TiredDegrees']||'0';
	this.oilFieldId = a['oilFieldId']||'0';
	this.countProcessNum = a['countProcessNum']||'0';
	this.user_vip_end_str = a['user_vip_end_str']||'';
	this.user_com=a['user_com']||lang._js_js._common._label608;
	this.user_job=a['user_job']||' ';
	this.user_yesterdayearning=a['user_yesterdayearning']||'0';
	this.user_user_yesterHint=a['user_yesterHint']||'0';

	this.user_today=a['user_today']||'0';
	this.user_todayhint=a['user_todayHint']||'0';
	this.news=a['news']||'0';
	this.sB24=a['B24']||'0';
	this.user_OwnerShops=a['user_OwnerShops']||'0';
	this.user_Employees=a['user_Employees']||'0';
	this.user_Nickname=a['user_Nickname']||lang._js_js._common._label609;
	this.user_Point=a['user_Point']||'0';
	this.user_ShopPoint=a['user_ShopPoint']||'0';
	this.user_IQ=a['user_IQ']||'0';
	this.user_Lead=a['user_Lead']||'0';
	this.user_Charm=a['user_Charm']||'0';
	this.user_SocietyName=a['user_SocietyName']||'';
	this.user_secname=a['user_secname']||'';
	this.user_secimg=a['user_secimg']||'';
	this.secImg=a['secImg']||'';
	this.user_secNameTxt = a['user_secNameTxt']||'';
	this.user_CompanyPoint=a['user_CompanyPoint']||'6';
	this.user_CompanyDate=a['user_CompanyDate']||'6';

	this.intuser=function (){ //初始化用户信息

		var s;
		var Hour;

		this.$('user_id').innerHTML=this.user_id;
		this.$('user_companys').innerHTML=this.user_com;
		this.$('user_goldnumber').innerHTML=this.user_goldnumber;
		this.$('user_liquannumber').innerHTML=this.user_liquannumber;
		this.$('user_allasset').innerHTML=this.user_allasset;
		this.$('allassethint').setAttribute("hint",""+lang._js_js._common._label622+"<font style=\"color:#ff8a00;font-weight:bold;\">"+this.user_allassetHint+"</font>G"+lang._js_js._common._label629+"");
		this.$('todayIncome').setAttribute("hint",""+lang._js_js._common._label615+"<font style=\"color:#ff8a00;font-weight:bold;\">" + this.user_todayhint + "</font>G"+lang._js_js._common._label621+"1"+lang._js_js._common._label614+"");
		this.$('user_yesterdayearning').innerHTML=this.user_yesterdayearning;
		this.$('yesterHint').setAttribute("hint",""+lang._js_js._common._label616+"<font style=\"color:#ff8a00;font-weight:bold;\">"+this.user_user_yesterHint+ "</font>G"+lang._js_js._common._label629+"");
		this.$('user_today').innerHTML=this.user_today;
		this.$('user_job').innerHTML=this.user_job;
		this.$('user_OwnerShops').innerHTML=this.user_OwnerShops;
		this.$('user_Employees').innerHTML=this.user_Employees;
		this.$('user_Nickname').innerHTML=this.user_Nickname;
		this.$('user_Point').innerHTML=this.user_Point;
		this.$('user_CanChangePoint').innerHTML=this.user_CanChangePoint;
		if(this.$('user_TiredDegrees')) {
			this.$('user_TiredDegrees').innerHTML=this.user_TiredDegrees;
		}
		if(this.$('rollnews3')) {
			this.$('rollnews3').innerHTML=this.countProcessNum;
		}
		this.$('user_ShopPoint').innerHTML=this.ShopPointLimit;

		this.$('user_IQ').style.width=this.user_IQ/10+'%';
		this.$('user_IQ').value=this.user_IQ;

		this.$('user_leadssss').style.width=(this.user_Lead/10+'%');
		this.$('user_leadssss').value=this.user_Lead;

		this.$('user_Charm').style.width=this.user_Charm/10+'%';
		this.$('user_Charm').value=this.user_Charm;

		this.$('user_CharmH').setAttribute('hint',''+lang._js_js._common._label623+':<b class=yellow >'+this.user_Charm+'/1000</b>');
		this.$('user_IQH').setAttribute('hint',''+lang._js_js._common._label624+':<b class=yellow >'+this.user_IQ+'/1000</b>');
		this.$('user_LeadH').setAttribute('hint',''+lang._js_js._common._label625+':<b class=yellow >'+this.user_Lead+'/1000</b>');
		if(ConfigUser.user_FirstTime>0){
			this.$('user_CompanyPoint').setAttribute('hint',lang._js_js._common._label630+'2'+lang._js_js._common._label617+'1'+lang._js_js._common._label613+''+this.user_CompanyPoint+''+lang._js_js._common._label631+'<br>'+lang._js_js._common._label612+'<span id="user_CompanyDateId" class=green>'+lang._js_js._common._label618+'...</span><br>'+lang._js_js._common._label611+'');
		}else{
			if(typeof(ConfigUser.SPAccPoint) !="undefined" && ConfigUser.SPAccPoint>0) {
				Hour=parseInt((ConfigUser.SPAccPoint/3600))+lang._js_js._common._label626;
				Min=parseInt(((ConfigUser.SPAccPoint%3600)/60));
				Mins=Min>0?Min+lang._js_js._common._label627:'';
				this.$('user_CompanyPoint').setAttribute('hint',lang._js_js._common._label630+Hour+Mins+''+lang._js_js._common._label628+'1'+lang._js_js._common._label613+''+this.user_CompanyPoint+''+lang._js_js._common._label631+'<br>'+lang._js_js._common._label612+'<span id="user_CompanyDateId" class=green>'+lang._js_js._common._label618+'...</span>');
			} else {
				this.$('user_CompanyPoint').setAttribute('hint',lang._js_js._common._label630+ShopPointCountLong+''+lang._js_js._common._label617+'1'+lang._js_js._common._label613+''+this.user_CompanyPoint+''+lang._js_js._common._label631+'<br>'+lang._js_js._common._label612+'<span id="user_CompanyDateId" class=green>'+lang._js_js._common._label618+'...</span>');
			}
		}
		this.$('user_secname').innerHTML=this.user_secname;
		this.$('user_secimg').innerHTML=this.user_secimg;
		//alert(this.$('user_secname').innerHTML);
		this.$('user_SocietyName').innerHTML=this.user_SocietyName;
		this.$('user_isvip').innerHTML=this.user_vip;
		if(this.$('user_isvip').innerHTML.indexOf('VIP')!=-1){
			this.$('user_isvip').setAttribute('hint',''+lang._js_js._common._label619+':<span class=brightgreen >'+this.user_vip_start_str+'</span><br/>'+lang._js_js._common._label620+':<span class=brightgreen >'+this.user_vip_end_str+'</span>');
			setTimeout("new elem_alt('userinfo4', 'span','hint','10px');",200);
		}
	}

	this.innerUserInfo=function (){
		a=arguments[0];if(!a){return;}
		this.user_goldnumber=a['user_goldnumber']||'0';
		this.user_liquannumber=a['user_liquannumber']||'0';
		this.user_allasset=a['user_allasset']||'500000';
		this.user_pic=a['user_pic']||'1.gif';
		this.user_id=a['user_id']||lang._js_js._common._label634;
		this.user_com=a['user_com']||lang._js_js._common._label632;
		this.user_job=a['user_job']||' ';
		this.user_yesterdayearning=a['user_yesterdayearning']||'0';
		this.news=a['news']||'0';
		this.sB24=a['B24']||'0';

		this.$('user_comlevel').innerHTML=this.user_comlevel;
		this.$('user_goldnumber').innerHTML=this.user_goldnumber;
		this.$('user_liquannumber').innerHTML=this.user_liquannumber;
		this.$('user_allasset').innerHTML=this.user_allasset;
		this.$('user_yesterdayearning').innerHTML=this.user_yesterdayearning;
	}


	this.B24=function (s){
		if(typeof s == 'object' && s != '0'){
			var getHtml="";
			this.Confin_B24={name:'MenuChild',contents:s,menuaction:'MenuChild',action:'cityB24',action_prowse:2}
			for (var i in s.o )
			{
				getHtml += "<span class=yellow2 >"+s.o[i].type+"</span> <span style='cursor:pointer;' href='javascript:void(0)' onclick=\"c.__OpenHostRight(om.Confin_B24,"+i+")\"  >"+s.o[i].e_title+"</span> <span class=yellow5 >"+s.o[i].e_date+"</span><br />";

			}
			var o=this.$('B24');
			if (getHtml){
				o.innerHTML=getHtml;
			}else{
				o.innerHTML="<font class=oncon>"+lang._js_js._common._label633+"</font>";
			}
		}
	}
	this.marqueeInterval=new Array(); //定义一些常用而且要经常用到的变量
	this.marqueeDelay=4000;			//原数据
	var marqueeId=0;
	var marqueeMax=0;
	var marqueeHeight=48;

	this.rollnews=function (s){ //小秘书
		if (!s) return;
		var o=this.$('rollnews'),ss;

		if(this.marqueeInterval[0]>0)
		clearInterval(this.marqueeInterval[0]);

		if (!o)return;
		this.newsContent=new Array();
		this.Confin_news={name:'MenuChild',contents:s,menuaction:'MenuChild',action:'sec3',action_prowse:2}
		var j=0,getHtml="",p=0,marqueeId=0;

		for (var i in s )
		{
			if(!IsTrue(s[i]))continue;
			if(!IsTrue(s[i].e_title))continue;
			if(s[i].e_title == 'undefined')continue;

			j=j+1;
			if(s[i].Type==1){
				getHtml += "<span class=yellow2 >["+lang._js_js._common._label636+"]</span> <a  href='javascript:void(0)' onclick=\"c.__OnSend('ajax_action.php?action=email_inceptread&mailtype=0','',c.__func_comm_list,'email',12);\"  >"+s[i].e_title+"</a><br />";
			}else if(s[i].Type==2){
				getHtml += "<span class=yellow2 >["+lang._js_js._common._label637+"]</span> <a  href='javascript:void(0)' onclick=\"om.mainmenuchild('sec');c.__OnSend('ajax_action.php?action=secnote','',c.__func_comm_list,'secnote','');\"  >"+s[i].e_title+"</a><br />";

			}
			else{
				getHtml += "<span class=yellow2 >["+lang._js_js._common._label636+"]</span> <a  href='javascript:void(0)' onclick=\"c.__OnSend('ajax_action.php?action=SecRead&e_Id="+s[i].e_Id+"','',c.__func_comm_list,'sec3','1');c._sId="+s[i].e_Id+";return false;\"  >"+s[i].e_title.substr(0,40)+"</a><br />";
			}
			this.newsContent[i]=getHtml;
			if(j==3){
				this.newsContent[p]=getHtml;//alert(this.newsContent[p]);
				getHtml="";
				p++;
				j=0;
			}
		}
		if(j > 0){
			this.newsContent[p]=getHtml;
			p=p+1;
		}
		this.marqueeMax= p;

		var str=this.newsContent[0];
		var getstr='';
		if (IsTrue(str))
		{
			if(p > 1){
				getstr=('<div id=marqueeBox style="z-index:4px;width:210px;float:left;overflow:hidden;position:relative;height:'+marqueeHeight+'px" onmouseover="clearInterval(om.marqueeInterval[0])" onmouseout="om.marqueeInterval[0]=setInterval(\'om.startrollnews()\',om.marqueeDelay)"><div>'+str+'</div></div>');
				o.innerHTML=getstr;
				marqueeId++;

				this.marqueeInterval[0]=setInterval("om.startrollnews()",this.marqueeDelay);
			}
			else{
				getstr=('<div id=marqueeBox style="z-index:4px;width:210px;float:left;overflow:hidden;position:relative;height:'+marqueeHeight+'px"><div>'+str+'</div></div>');
				o.innerHTML=getstr;
			}
		}else{
			o.innerHTML="<div style='padding-top:2px;margin-left:-2px;'><span class=yellow2>"+lang._js_js._common._label635+"</span></div>";
		}
	}

	this.startrollnews=function (){ //滚动新闻
		var str=this.newsContent[marqueeId];
		if(str != null && str != 'undefined'){
			marqueeId++;
			//if(marqueeId>=this.newsContent.length) marqueeId=0;
			if(marqueeId>=this.marqueeMax) marqueeId=0;
			if(marqueeBox.childNodes.length==1) {
				var nextLine=document.createElement('DIV');
				nextLine.innerHTML=str;
				marqueeBox.appendChild(nextLine);
			}else {
				marqueeBox.childNodes[0].innerHTML=str;
				marqueeBox.appendChild(marqueeBox.childNodes[0]);
				marqueeBox.scrollTop=0;
			}
		}
		clearInterval(om.marqueeInterval[1]);
		om.marqueeInterval[1]=setInterval("om.scrollrollnews()",20);
	}
	this.scrollrollnews=function (){ //滚动新闻
		if(typeof(marqueeBox)=="undefined")return;
		marqueeBox.scrollTop++;
		if(marqueeBox.scrollTop%marqueeHeight==(marqueeHeight-1)){
			clearInterval(om.marqueeInterval[1]);
		}
	}

	this.marqueeInterval2=new Array(); //定义一些常用而且要经常用到的变量
	this.marqueeDelay2=3000;
	var marqueeId2=0;
	var marqueeMax2=0;
	var marqueeHeight2=20;
	this.directions = 'Up';

	this.rollnews2=function (s){ //当前任务
		if (!s) return;
		var o=this.$('rollnews2'),ss;
		if (!o)return;

		if(this.marqueeInterval2[0]>0)
		clearInterval(this.marqueeInterval2[0]);

		this.newsContent2=new Array();
		this.Confin_news2={name:'MenuChild',contents:o,error:0,width:480,menuaction:'MenuChild',action:'invest3',action_prowse:null};
		this._showpage=0;
		var j=0,getHtml="",p=0;

		for (var i in s )
		{
			j=j+1;
			getHtml += "<a href='javascript:void(0)' onclick=\"c.__OnSend('ajax_action.php?action=invest3&doaction=NewFlow&getTasks="+s[i].TaskType+"&sId="+s[i].TaskId+"','',c.__func_comm_list,'invest3','3');\" class='green' >"+s[i].TaskTitle+"</a><br />";
			if(j>0){
				p = (p==0)?0:p;
				this.newsContent2[p]=getHtml;
				getHtml="";
				p=p+1;
				j=0;
			}
		}
		//alert(this.newsContent2.length);
		if(this.directions=='Up'){
			var str=this.newsContent2[0];
			var getstr='';
			this.marqueeId2 = 0;
			if (str)
			{
				//getstr=('<div id=marqueeBox2 style="z-index:4px;width:90px;float:left;margin-top:0px;overflow:hidden;position:relative;height:'+marqueeHeight2+'px;line-height:20px;padding-top:5px;font-size:10px;font-family:\"Arial\";" onmouseover="clearInterval(om.marqueeInterval2[0])" onmouseout="om.marqueeInterval2[0]=setInterval(\'om.startrollnews2Up()\',om.marqueeDelay2)"><div>'+str+'</div></div>');
				getstr = '';
				o.innerHTML=getstr;
				if(this.newsContent2.length<=1)return;
				marqueeId2++;
				this.marqueeInterval2[0]=setInterval("om.startrollnews2Up()",this.marqueeDelay2);
			}else{
				o.innerHTML="<a href=\"javascript:void(0);\" onclick=\"c.__OnSend('ajax_action.php?action=invest3','',c.__func_comm_list,'invest3');\"><font class=yellow>"+lang._js_js._common._label638+"</font></a>";
			}
		}else{
			var str=this.newsContent2[this.newsContent2.length-1];
			var getstr='';
			marqueeId2 = this.newsContent2.length-1;
			if (str)
			{
				getstr=('<div id=marqueeBox2 style="z-index:4;width:90px;float:left;margin-top:0px;overflow:hidden;position:relative;height:'+marqueeHeight2+'px;line-height:20px;padding-top:6px;" onmouseover="clearInterval(om.marqueeInterval2[2])" onmouseout="om.marqueeInterval2[2]=setInterval(\'om.startrollnews2Down()\',om.marqueeDelay2)"><div>'+str+'</div></div>');
				o.innerHTML=getstr;
				if(this.newsContent2.length<=1)return;
				marqueeId2--;
				this.marqueeInterval2[2]=setInterval("om.startrollnews2Down()",this.marqueeDelay2);
			}
		}
	}

	this.startrollnews2Up=function (){ //滚动新闻
		if(marqueeId2>=this.newsContent2.length) marqueeId2=0;
		var str=this.newsContent2[marqueeId2];
		marqueeId2++;
		//if(marqueeId2>=this.newsContent2.length) marqueeId2=0;
		if(marqueeBox2.childNodes.length==1) {
			var nextLine=document.createElement('DIV');
			nextLine.innerHTML=str;
			marqueeBox2.appendChild(nextLine);
		}else {
			marqueeBox2.childNodes[0].innerHTML=str;
			marqueeBox2.appendChild(marqueeBox2.childNodes[0]);
			marqueeBox2.scrollTop=0;
		}
		clearInterval(om.marqueeInterval2[1]);
		om.marqueeInterval2[1]=setInterval("om.scrollrollnews2Up()",20);
	}
	this.startrollnews2Down=function (){ //滚动新闻
		if(marqueeId2<0) marqueeId2=this.newsContent2.length-1;
		var str=this.newsContent2[marqueeId2];
		marqueeId2--;
		if(marqueeBox2.childNodes.length==1) {
			var nextLine=document.createElement('DIV');
			nextLine.innerHTML=str;
			marqueeBox2.appendChild(nextLine);
		}else {
			marqueeBox2.childNodes[1].innerHTML=marqueeBox2.childNodes[0].innerHTML;
			marqueeBox2.childNodes[0].innerHTML = str;
			//marqueeBox2.appendChild(marqueeBox2.childNodes[0]);
			marqueeBox2.scrollTop=20;
		}

		clearInterval(om.marqueeInterval2[3]);
		om.marqueeInterval2[3]=setInterval("om.scrollrollnews2Down()",20);
	}
	this.scrollrollnews2Up=function (){ //滚动新闻
		marqueeBox2.scrollTop++;
		if(marqueeBox2.scrollTop%marqueeHeight2==(marqueeHeight2-1)){
			clearInterval(om.marqueeInterval2[1]);
		}
	}
	this.scrollrollnews2Down=function (){ //滚动新闻
		marqueeBox2.scrollTop--;
		if(marqueeBox2.scrollTop<0){//Math.abs(marqueeBox2.scrollTop)%marqueeHeight2==(marqueeHeight2-1)
			marqueeBox2.scrollTop=20;
			clearInterval(om.marqueeInterval2[3]);
		}
	}

	this.TaskList=function (){
		if(typeof TaskList == 'object' && TaskList != '0'){
			var o= [];
			o['con']= TaskList;
			this.Confin_news={name:'MenuChild',contents:o,error:0,width:480,menuaction:'MenuChild',action:'invest3',action_prowse:null};
			this._showpage=0;
			var getHtml="";
			for (var i in TaskList )
			{
				getHtml += "<span onclick=\"c.__OnSend('ajax_action.php?action=invest3&getTask="+TaskList[i].TaskType+"&tkId="+TaskList[i].TaskId+"','',c.__func_comm_list,'invest3',2);\" class='green' style='cursor:pointer;'>"+TaskList[i].TaskTitle+"</span><br />";

			}
			for(var i=0;i<10;i++)
			getHtml+= getHtml;
			var o=this.$('mqtasklist');if (!o)return
			o.innerHTML=getHtml;
		}
	}

	this.init=function () {
		//this.initgb('maingb');
		this.__LoadMenu('Menu')
		this.intuser();
		if(ConfigUser.user_mainhint==0){
			this.main_hint_open('chara','');
		}else{
			this.main_hint_close();
		}
		if((typeof GlobalVal != 'undefined')){
			if(typeof GlobalVal.MakeNewSecList != 'undefined'){
				this.rollnews(GlobalVal.MakeNewSecList);
			}
		}

		this.rollnews2(TaskList);
		this.B24(this.sB24);
		document.writeln("<div id=\"msgdiv\" style=\"position:absolute;display:none;\"><\/div>");
		//document.writeln("<div id=\"overdivbg\" style=\"position:absolute;display:none;\"><\/div>");
		document.writeln("<div id=\"overdiv\" style=\"position:absolute;display:none;\"><\/div>");
		document.writeln("<div id=\"BigWindow\" style=\"position:absolute;display:none;\"><\/div>");//总浏览窗口标签

		//this.TaskList();
		if (ConfigUser.VUserName==''){
			//this.clickmain('characreate',this);
			//this.setIcon(this,3,'characreate');
		}
	}

	this.init();
}


function dumpMap(t){
	var objstr = "";
	var obj = document.getElementById("mainhost");
	var dobj = obj.getElementsByTagName("DIV");
	for(i=0; i<dobj.length; i++){
		if((dobj[i].id=="main")||(dobj[i].id > 0)){
			objstr = objstr+","+dobj[i].id;
		}
	}
	var tmparr = objstr.split(",");
	for(i=1; i<tmparr.length; i++){
		obj = document.getElementById(tmparr[i]);
		obj.style.display = (t==0)?"block":"none";

	}
	//alert(document.getElementById("mainhost").innerHTML);
}
function webclock(){
	var isSeet=false;
	if(typeof(Server_Now_Time) !='undefined') {
		var thistime = Server_Now_Time+3600*7;//new Date((new Date()).getTime()-ServerTimeDiff); //日期对象
		isSeet=true;
	} else {
		var thistime = new Date((new Date()).getTime()-ServerTimeDiff); //日期对象
	}
	var now = "";
	if(isSeet) {
		var dayTime=24*3600;
		var shenxia=thistime%dayTime;
	    thistime=shenxia;
	    Server_Now_Time++;
	    var hours = Math.floor(thistime / 3600);
	    var minutes = Math.floor((thistime % 3600) / 60);
	    var seconds = Math.floor((thistime % 3600) % 60);
//		document.title=seconds;
	} else {
		hours = thistime.getHours();
		minutes = thistime.getMinutes();
		seconds = thistime.getSeconds();
	}
	if (eval(hours) <10) {hours = "0" + hours}
	if (eval(minutes) < 10) {minutes = "0" + minutes}
	if (seconds < 10) {seconds = "0" + seconds}
	now = "&nbsp;&nbsp;"+hours+":"+minutes+":"+seconds;

	om.$('showdate').innerHTML=now; //div的html是now这个字符串
	setTimeout("webclock()",1000); //设置过1000毫秒就是1秒, 调用webclock方法

	//now="<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0' width='73' height='40'><param name='movie' value='../../images/5.swf' /><param name='quality' value='high' /><param name='wmode' value='transparent'><param name='SCALE' value='exactfit' /><embed src='../../images/5.swf' width='73' height='40' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' scale='exactfit'></embed></object>";
	//om.$('showdate').innerHTML=now; //div的html是now这个字符串
}

function getPageList(page,total,pageSize){
	var pages = Math.ceil(total/pageSize), nextp, prevp, firstp, lastp, pc, nc, n, color, plist="", alist;
	if(page < 1){page =1;}
	if(page > pages){page = pages};
	nextp = page + 1; if(nextp > pages){nextp = pages;}
	prevp = page - 1; if(prevp < 1){prevp = 1;}

	pc = page - 3; if(pc < 1){ pc = 1;};
	nc = pc + 6; if(nc > pages){nc = pages;};

	for(n=pc; n<=nc; n++){
		color = (n==page)?"red":"#00ff00";
		plist += "<span><font color="+color+">&nbsp;&nbsp;<b><a href=\"javascript:c.__OpenHostRight(c.Confin1,"+n+")\">"+n+"</a></font></span>";
	}
	alist = "<span><b><a href=\"javascript:c.__OpenHostRight(c.Confin1,1)\">&nbsp;&nbsp;first</a><a href=\"javascript:c.__OpenHostRight(c.Confin1,"+prevp+")\"> &nbsp;&nbsp;&lt;&lt;prev </a>"+plist+"<a href=\"javascript:c.__OpenHostRight(c.Confin1,"+nextp+")\"> &nbsp;&nbsp;next&gt;&gt </a><a href=\"javascript:c.__OpenHostRight(c.Confin1,"+pages+")\"> &nbsp;&nbsp;last </a><span>";
	return alist;
}
/*mainMenu*/

/*mainAjax*/
function mainAjax(){
	this._xml = null;
	this._time = null;
	this._lasttime = 0;
	this._outtime = 0;
	this._preAction = "";
	this.__int=function(){
		var xmlHttp = null;


		if(window.XMLHttpRequest){
			xmlHttp = new XMLHttpRequest();
			if(xmlHttp.overrideMimeType){
				xmlHttp.overrideMimeType("text/xml");
			}
		} else if(window.ActiveXObject){

			/*			var MSXML = ['MSXML2.XMLHTTP.6.0','MSXML2.XMLHTTP.5.0','MSXML2.XMLHTTP.4.0','MSXML2.XMLHTTP.3.0','MsXML2.XMLHTTP.2.6','MSXML2.XMLHTTP','Microsoft.XMLHTTP.1.0','Microsoft.XMLHTTP.1','Microsoft.XMLHTTP','Msxml2.XMLHTTP','Microsoft.XMLHTTP'];
			for(var i=0;i<MSXML.length;i++){
			try {
			xmlHttp = new ActiveXObject(MSXML[i]); break;
			} catch(e){}
			}*/
			try {
				xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {}
			}
			return xmlHttp;

		}
		if(!xmlHttp)
		{
			alert(lang._js_js._common._label639);
		}
		return xmlHttp;
	};

	this.__send=function(url,data,callback){
		/*		if((url.indexOf('sendMessage') == -1) &&(url.indexOf('comMsg') == -1) && (url.indexOf('DoActive') == -1) && url.indexOf('thingcompanyleague')==-1){
		if (this._$('OpenRight'))this._$('OpenRight').style.display = "none";		//隐藏右边头像
		}*/
		//panfeng 20090430 close faq window automatically

		if ((url.indexOf('sendMessage') < 0)&&(url.indexOf('comMsg') < 0)){
			//alert(url);
			if (document.getElementById('newPlayerHelp')&&document.getElementById('newPlayerHelp').style.display != 'none')
			document.getElementById('newPlayerHelp').style.display = 'none';
		}
		var nowtime	= new Date().getTime();

		//if(this._lasttime+3000>nowtime)return;

		if(this._xml == null){
			this._xml = this.__int();
			if(this._xml == null){
				window.alert("Can't creat XMLHttpRequest Object.");
				return false;
			}
		}

		if ((data != null) && (data != 'null') && (typeof(data) != 'undefined') && (data != 'undefined') )
		{
			data=this.__query(data);
		}

		url	+= (url.indexOf("?") >= 0) ? "&tthetime=" + thetime : "?tthetime=" + thetime;
		try{
			if(isIEF){
				objevent = FF_SearchEvent();
				if(objevent)url+='&__ex='+objevent.x+'&__ey='+objevent.y;
			}else{
				objevent=window&&window.event?{x:event.clientX, y:event.clientY}:false;
				if(objevent)url+='&__ex='+objevent.x+'&__ey='+objevent.y;
			}
		}catch(e){}
		if(pagecharset=='utf-8'&&decodeURI(url).indexOf('[')<=0)url=encodeURI(url);

		if(nowtime-this._lasttime<1500){
			clearTimeout(this._time);
			this._time = setTimeout("c.__send('"+url+"','"+data+"',"+callback+");",1500+this._lasttime-nowtime);
			return;
		}

		this._lasttime = nowtime;
		url	+= (url.indexOf("?") >= 0) ? "&nowtime=" + nowtime : "?nowtime=" + nowtime;

		try
		{

			if(typeof(data) == 'string'){

				this._xml.open('POST' , url, true);
				this._xml.setRequestHeader("Content-Length",data.length);
				this._xml.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				this._xml.setRequestHeader("Connection","Keep-Alive");
				this._xml.send(data);
			} else{
				this._xml.open("GET",url,true);
				this._xml.setRequestHeader("Content-Type","text/html;charset="+pagecharset);
				this._xml.send(null);
			}
		}
		catch (e)
		{

			var er = ""+lang._js_js._common._label643+"ajax"+lang._js_js._common._label641+"\r\n\r\n"+lang._js_js._common._label644+"";
			er += e.message;
			er += "\r\n\r\n("+lang._js_js._common._label640+"\r\n" ;
			er += url;
			er += "\r\n"+lang._js_js._common._label642+")";
			//alert(er);
			return ;
		}
		if(typeof(callback) == "function"){
			this._xml.onreadystatechange = function(){

				if(c._xml.readyState == 4){
					CanSendAjax=true;
					//恢复禁用的按钮
					if(c._$('butUnionOffer'))c._$('butUnionOffer').disabled=false;

					//END 恢复禁用的按钮

					if(c._xml.status == 200 || c._xml.status == 304){
						c.bytes2BSTR= c._xml.responseText;
						callback();
					} else{
						//alert("Error loading page\n" + c._xml.status + ":" + c._xml.statusText);
					}

				}
			}
		}

	};

	this.__func=function (){
		if(c.bytes2BSTR.indexOf('@@@') != -1){
			setTimeout("c.__MainMsgClose()",0);
			var s = c.bytes2BSTR.split('@@@');
			var error = parseInt(s[0]);//1 是错误的 0是成功的
			c.__MainMsg(s[1]);

		}
	};
	this.__func_msg=function (){
		if(c.bytes2BSTR.indexOf('@@@') != -1){
			var s = c.bytes2BSTR.split('@@@');

			var error = parseInt(s[0]);//1 是错误的 0是成功的
			setTimeout("c.__MainMsgClose()",0);

			if (error==1||error==3||error==4||error==5||error==8)
			{
				if(s[2]!='undefined' && s[2]!=null){
					eval(s[2]);
				}
				c.__MainMsg(s[1],3,error);
			}else{
				//1=短消息,2=好友上线,4=新任务,8=交换卡片,16=使用策略,32=会议或活动提示,64=库存剩余提示
				//eval(s[1]);

				sarr=s[1].split('/*###*/');
				for(i in sarr){
					if(sarr[i].substring(0,3)=='var'){
						eval(sarr[i]);
					}else{
						var strObj = new unserialize(sarr[i]);
					}
				}
				for (var key in strObj)
				{
					window[key] = strObj[key];
				}
				if(typeof(GlobalVal)!='undefined')
				c.__setGlobal(GlobalVal);
				var imgurl='',url='',Message;
				Message = o.Message;

				/*if(Message&1){
				Message &=~1;
				imgurl='新短消息提示';
				url="c.__OnSend('ajax_action.php?action=','email',c.__func_comm_list,'email');";
				}else */
				if(Message&2 && typeof o.Friend !='undefined'){
					Message &=~2;
					imgurl=lang._js_js._common._label647;
					url="c.__OnSend('ajax_action.php?action=userinforead&OUserId="+o.Friend.UserId+"','',c.__func_comm_list,'userinforead');";
				}else if(Message&4 && typeof o.NewTask !='undefined'){
					Message &=~4;
					imgurl=lang._js_js._common._label650;
					url="c.__OnSend('ajax_action.php?action=invest3&doaction=NewFlow&getTasks="+o.NewTask.TaskType+"&sId="+o.NewTask.Id+"','',c.__func_comm_list,'invest3','3');";
				}else if(Message&8 ){
					Message &=~8;
					imgurl=lang._js_js._common._label648;
					url="c.__OnSend('ajax_action.php?action=characard_admin',this.form,c.__func_maile,confin={action:'characard',child:'card_2',main:'card_main'});";
				}else if(Message&16  && typeof o.Attack !='undefined' ){
					Message &=~16;
					imgurl=lang._js_js._common._label649;
					url="c.__OnSend('ajax_action.php?action=thing2','',c.__func_comm_list,'thing2','1');c._sId="+o.Attack.ShopId+";";
					/*}else if(Message&32  && typeof o.Activity !='undefined' ){
					Message &=~32;
					imgurl=lang._js_js._common._label646;
					url="c.__OnSend('ajax_action.php?action=citypiazza&type=read&Id="+o.Activity+"','',c.__func_comm_list,'citypiazza','5');c._sId="+o.Activity+";";
					*/
				}else if(Message&64  ){
					Message &=~64;
					imgurl=lang._js_js._common._label645;
					url="";
				}
				//c._$('map_map').style.border='1px solid red';
				if(imgurl){
					c._$('map_map').innerHTML="<div class=map_msg><a href=\"javascript:void(0)\" onclick=\""+url+"\">"+imgurl+"</a></div>";
				}


			}
		}
	};


	this.__func_pic_list=function (){
		if(c.bytes2BSTR.indexOf('@@@') != -1){
			var s = c.bytes2BSTR.split('@@@');
			var error = parseInt(s[0]);//1 是错误的 0是成功的
			setTimeout("c.__MainMsgClose()",0);
			if (error==1)
			{
				c.__MainMsg(s[1],3);
			}else if (error==2)
			{

				c._refUrl = s[2];
				c.__MainMsg(s[1],4);
			}else{
				c.Confin={name:'MenuChild',contents:s[1],error:0,menuaction:'MenuChild',action:c._ajax_action,action_prowse:c._ajax_action_prowse}
				//c.__OpenHostRight(Confin)
				c.__Tpl_Check();

			}
		}
	};
	this.__func_sendMessage=function (){


		if(c.bytes2BSTR.indexOf('@@@') != -1){
			var s = c.bytes2BSTR.split('@@@');
			var error = parseInt(s[0]);//1 是系统提示 3是错误 4是成功提示
			setTimeout("c.__MainMsgClose()",0);
			if (error==3)
			{
				if(s[2]!='undefined' || s[2]!=null)eval(s[2]);
				c.__MainMsg(s[1],3,error);
			}
			if(error>0){ //成功
				frmworld.world.value='';
			}
			if(s[1]!=null){ //数量
				//getObj('worldinfonum').innerHTML='还剩下'+g_contents.speakerNums+'条短消息';
				getObj('worldpost').disabled=false;
				//alert(g_contents.speakerNums);;
			}
			return;
		}
	};

	this.__func_UserPercentValue=function (){
		if(c.bytes2BSTR.indexOf('@@@') != -1){
			var s = c.bytes2BSTR.split('@@@');
			var error = parseInt(s[0]);//1 是系统提示 3是错误 4是成功提示
			setTimeout("c.__MainMsgClose()",0);

			if (error==3)
			{
				if(s[2]!='undefined' || s[2]!=null)eval(s[2]);
				c.__MainMsg(s[1],3,error);return;
			}
			if(s[1]==1){ //
				getObj('UserPercentValue1').innerHTML=s[0];
				getObj('ExecPercent').innerHTML = s[3];
			}else{
				getObj('UserPercentValue2').innerHTML=s[0];
				getObj('AdminPercent').innerHTML = s[3];
			}
			if(s[5]==3){//indexChange 4=>5 5=>6 6=>7
				getObj('UserPercentValue3').innerHTML=s[4];
				getObj('UserPercentBase3').innerHTML=s[6];
				getObj('HopePercent').innerHTML = s[7];
			}
			getObj('prizegiving').innerHTML=s[2];
			if(s[2]==0)	{
				var urlExec=urlAdmin="&nbsp;<img src=\""+ImgRoot+"images/up.gif\"  style='margin-top:-1px;filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);'>";
				getObj('urlExecId').innerHTML=urlExec;
				getObj('urlAdminId').innerHTML=urlAdmin;

			}

			return;
		}
	};


	this.__func_comm_list=function (){

		if(c.bytes2BSTR.indexOf('@@@') != -1){
			var s = c.bytes2BSTR.split('@@@');
			//var s = c.bytes2BSTR.split('@@@');
			var GlobalVal;
			sarr=s[1].split('/*###*/');
			for(i in sarr){
				if(sarr[i].substring(0,3)=='var'){
					eval(sarr[i]);
				}else{
					var strObj = new unserialize(sarr[i]);
				}
			}
			if(this.setPolicyTimeId!=null&&this.setPolicyTimeId>0){
				clearTimeout(this.setPolicyTimeId);
				this.setPolicyTimeId=0;
			}


			var error = parseInt(s[0]);//1 是系统提示 3是错误 4是成功提示

			setTimeout("c.__MainMsgClose()",0);
			if (error==1||error==3||error==4||error==5||error==8)
			{
				if(s[2]!='undefined' || s[2]!=null)eval(s[2]);
				c.__MainMsg(s[1],3,error);
				GlobalVal = s[3];
			}else if (error==2)
			{
				c._refUrl = s[2];
				GlobalVal=s[3];
				c.__MainMsg(s[1],4);
			}else if (error==6)//确认和取消@@@
			{
				c._refUrl = s[2];
				c.__MainMsg(s[1],6);
			}else if (error==9){

				eval(s[1]);
			}else if (error==10){
				window.self.location='./'
			}else if(c._ajax_action=='worldMsgShow'){
				c._action_prowse=c._ajax_action_prowse;
				c.__worldMsg_Tpl(s[1]);
			}else {
				//if(typeof(GlobalVal)=='undefined')GlobalVal=s[1];
				c.Confin={parentname:c._ajax_name,contents:strObj,error:0,menuaction:c._ajax_menuaction,action:c._ajax_action,action_prowse:c._ajax_action_prowse}



				if(c._ajax_menuaction=='MenuChild' ||c._ajax_menuaction=='calling' || c._ajax_menuaction=='Edifice' || c._ajax_menuaction=='ShopRead' || c._ajax_menuaction=='CampaignVotePage' || c._ajax_menuaction=='NockVote' || c._ajax_menuaction=='ShowPost' || c._ajax_menuaction=='ShowMan' || c._ajax_menuaction=='CampaignVotePage2' || c._ajax_menuaction=='NockVote2' || c._ajax_menuaction=='ShowPost2' || c._ajax_menuaction=='ShowMan2' || c._ajax_menuaction=='MoveShop' || c._ajax_menuaction=='shopsell' ||c._ajax_menuaction=='shopbuy' || c._ajax_menuaction=='shopadv'){

					c.__Tpl_Check();
				}else{

					c.__OpenHostRight(c.Confin);return false;

				}
			}

			if(IsTrue(GlobalVal)||typeof(GlobalVal)!= 'undefined'){
				c.__setGlobal(GlobalVal);
			}

			//新手流程
			if(typeof(NewFlowTips)!= 'undefined'){
				if(NewFlowTips==0){
					if (c._ajax_action == 'characreate')
					om.main_hint_newFlow_open(11);
					else if (c._ajax_action == 'characreatequick')
					om.main_hint_newFlow_open(10);
				}else if(NewFlowTips<122){
					om.main_hint_newFlow_open(NewFlowTips);
				}else{
					om.main_hint_newFlow_close();
				}
			}
		}
	};

	this.__setGlobal=function(GlobalVal){
		if(typeof(GlobalVal) == 'string')eval(GlobalVal);



		if (typeof(GlobalVal)!= 'undefined'&&GlobalVal != null && GlobalVal != "" ){ //document.write(GlobalVal);
			//if(typeof(GlobalVal) == 'string')eval(GlobalVal);
			if(GlobalVal.GlobalGold!=null)c._$('user_goldnumber').innerHTML=GlobalVal.GlobalGold;
			if(GlobalVal.GlobalLiQuan!=null)c._$('user_liquannumber').innerHTML=GlobalVal.GlobalLiQuan;

			if(GlobalVal.GlobalAssets!=null){
				c._$('user_allasset').innerHTML=GlobalVal.GlobalAssets;
				c.__MinAssets=parseInt(GlobalVal.MinAssets);
				c.__Assets=parseInt(GlobalVal.Assets);
				c.__TodayIncomeInt=parseInt(GlobalVal.TodayIncomeInt);
				setAssets(false);
			}

			if(GlobalVal.YesterdayIncome!=null)c._$('user_yesterdayearning').innerHTML=GlobalVal.YesterdayIncome;

			if(GlobalVal.TodayIncome!=null)c._$('user_today').innerHTML=GlobalVal.TodayIncome;
			/*if(GlobalVal.ShopPoint!=null){
				if(GlobalVal.ShopPoint == GlobalVal.ShopPointLimit)
				c._$('user_ShopPoint').innerHTML= '<font color="red">'+GlobalVal.ShopPointLimit + '</font>';
				else
				c._$('user_ShopPoint').innerHTML= GlobalVal.ShopPointLimit ;
			}*/
			c._$('user_ShopPoint').innerHTML= GlobalVal.ShopPointLimit;
			if(GlobalVal.Point!=null)c._$('user_Point').innerHTML=GlobalVal.Point;
			if(GlobalVal.ShopNums!=null){c._$('user_OwnerShops').innerHTML=GlobalVal.ShopNums;ConfigUser.user_OwnerShops=GlobalVal.ShopNums;}
			if(GlobalVal.EmployeeNums!=null)c._$('user_Employees').innerHTML=GlobalVal.EmployeeNums;
			if(GlobalVal.SocietyName!=null && GlobalVal.VUserName!=null)c._$('user_SocietyName').innerHTML=GlobalVal.SocietyName;
			if(GlobalVal.user_id!=null)c._$('user_id').innerHTML=GlobalVal.user_id+'----';
			if(GlobalVal.VUserName!=null && GlobalVal.VUserName!='' && GlobalVal.VUserName!='undefined')c._$('user_id').innerHTML=GlobalVal.VUserName;

			if(GlobalVal.user_secname!=null)c._$('user_secname').innerHTML=GlobalVal.user_secname;
			//panfeng 20090522 --------------------------------------
			//alert(GlobalVal.user_secNameTxt);
			var secName = '';
			var secPos = GlobalVal.user_secname.indexOf(':');
			if (secPos)
			secName = GlobalVal.user_secname.slice(secPos + 1);

			if(secPos&&c._$('user_secN')) c._$('user_secN').innerHTML = secName ;

			//-------------------------------------------------------
			if(GlobalVal.user_TiredDegrees!=null && c._$('user_TiredDegrees'))c._$('user_TiredDegrees').innerHTML=GlobalVal.user_TiredDegrees;
			if(GlobalVal.oilFieldId!=null) oilFieldId=GlobalVal.oilFieldId;
			if(GlobalVal.countProcessNum!=null && c._$('rollnews3'))c._$('rollnews3').innerHTML=GlobalVal.countProcessNum;
			if(GlobalVal.user_CanChangePoint!=null)c._$('user_CanChangePoint').innerHTML=GlobalVal.user_CanChangePoint;
			if(GlobalVal.user_secname!=null)c._$('user_secimg').innerHTML=GlobalVal.user_secimg;
			if(GlobalVal.user_vip!=null)c._$('user_isvip').innerHTML=GlobalVal.user_vip;
			if(c._$('user_isvip').innerHTML.indexOf('VIP')!=-1&&GlobalVal.user_vip!=null){
				c._$('user_isvip').setAttribute('hint',lang._js_js._common._label651+':<span class=brightgreen >'+GlobalVal.user_vip_start_str+'</span><br/>'+lang._js_js._common._label652+':<span class=brightgreen >'+GlobalVal.user_vip_end_str+'</span>');
				setTimeout("new elem_alt('userinfo4', 'span','hint','10px');",200);
			}

			if(GlobalVal.Nickname!=null && GlobalVal.Nickname!='undefined' && GlobalVal.Nickname!='')c._$('user_Nickname').innerHTML=GlobalVal.Nickname;
			if(GlobalVal.CanHaveShop!=null)CanBuildShop=GlobalVal.CanHaveShop;
			if(GlobalVal.ProcessingTask!=null)setProcessing(GlobalVal.ProcessingTask);


			if( GlobalVal.MakeNewSecCount>0){
				//typeof GlobalVal.MakeNewSecList != 'undefined' && GlobalVal.MakeNewSecList != null ||
				om.rollnews(GlobalVal.MakeNewSecList);
			}else{
				om.rollnews(new Array());
			}

			/*if(GlobalVal.TaskListCount>0){
			om.rollnews2(GlobalVal.TaskList);
			}else{
			om.rollnews2(new Array());
			}*/
			/*if( GlobalVal.ProcessingCount>0){
			c._$('rollnews2').innerHTML=GlobalVal.ProcessingCount;
			}else{
			c._$('rollnews2').innerHTML=0;
			}*/
			if(GlobalVal.NewMessageListCount>0){c._$('SecNew').innerHTML=GlobalVal.NewMessageListCount;}else{c._$('SecNew').innerHTML=0;}
			if(GlobalVal.user_Charm!=c._$('user_Charm').value)c._$('user_CharmH').setAttribute('hint',''+lang._js_js._common._label653+':<b class=yellow >'+GlobalVal.user_Charm+'/1000</b>');
			if(GlobalVal.user_IQ!=c._$('user_IQ').value)c._$('user_IQH').setAttribute('hint',''+lang._js_js._common._label654+':<b class=yellow >'+GlobalVal.user_IQ+'/1000</b>');
			if(GlobalVal.user_Lead!=c._$('user_leadssss').value)c._$('user_LeadH').setAttribute('hint',''+lang._js_js._common._label655+':<b class=yellow >'+GlobalVal.user_Lead+'/1000</b>');

			if(GlobalVal.user_com!=null)c._$('user_companys').innerHTML = "<a href=\"javascript:void(0)\" onclick=\"om.clickchild('thing1');\" ><font color=\"#4B1A03\">"+GlobalVal.user_com+"</font></a>";
			if(GlobalVal.user_comname!=null)Config_thing1.CompanyName = GlobalVal.user_comname;
			if(GlobalVal.STHint1&&GlobalVal.STHint2){
				ShowTaskHint(GlobalVal.STHint1,GlobalVal.STHint2);
			}
			if(GlobalVal.SWHint1&&GlobalVal.SWHint2){
				ShowWinHint(GlobalVal.SWHint1,GlobalVal.SWHint2,GlobalVal.SWHint3?parseInt(GlobalVal.SWHint3):300);
			}

		}

	}

	this.__Tpl_Check=function(){  //验证是否导入模板
		var action = c._ajax_action;
		var menuaction = c._ajax_menuaction;
		var TplVal="";
		c._TploK= false;
		if (menuaction=='Edifice' ){ //公司创建
			c.__loadJs(ImgRoot+'js/templates/once_Tpl.js');
			if(typeof Edifice_Tpl != 'undefined' )c._TploK= true;
		}else if (menuaction=='calling' ){ //店铺行业模板
			c.__loadJs(ImgRoot+'js/calling.tpl.js');
			if(typeof Calling_Tpl != 'undefined' )c._TploK= true;
		}else if (menuaction=='ShopRead' ){ //店铺详细模板
			c.__loadJs(ImgRoot+'js/templates/one_Tpl.js');
			if(typeof ShopRead_Tpl != 'undefined' )c._TploK= true;
		}else if (menuaction=='CampaignVotePage'||menuaction=='CampaignVotePage2' ){ //议政厅  参选人员信息 模板
			c.__loadJs(ImgRoot+'js/templates/one_Tpl.js');
			if(typeof CampaignVotePage_Tpl != 'undefined' )c._TploK= true;
		}else if (menuaction=='NockVote'||menuaction=='NockVote2' ){ //议政厅模板
			c.__loadJs(ImgRoot+'js/templates/one_Tpl.js');
			if(typeof NockVotePage_Tpl != 'undefined' )c._TploK= true;
		}else if (menuaction=='ShowPost' ||menuaction=='ShowPost2' ){ //议政厅模板
			c.__loadJs(ImgRoot+'js/templates/one_Tpl.js');
			if(typeof ShowPost_Tpl != 'undefined' )c._TploK= true;
		}else if (menuaction=='ShowMan'||menuaction=='ShowMan2' ){ //议政厅模板
			c.__loadJs(ImgRoot+'js/templates/one_Tpl.js');
			if(typeof ShowMan_Tpl != 'undefined' )c._TploK= true;
		}else if (menuaction=='MoveShop' ){ //店铺迁移模板
			c.__loadJs(ImgRoot+'js/templates/one_Tpl.js');
			if(typeof MoveShop_Tpl != 'undefined' )c._TploK= true;
		}else if (menuaction=='shopsell' ){ //店铺出售模板
			c.__loadJs(ImgRoot+'js/templates/one_Tpl.js');
			if(typeof ShopSell_Tpl != 'undefined' )c._TploK= true;
		}else if (menuaction=='shopbuy' ){ //店铺收购模板
			c.__loadJs(ImgRoot+'js/templates/one_Tpl.js');
			if(typeof ShopBuy_Tpl != 'undefined' )c._TploK= true;
		}else if (menuaction=='shopadv' ){ //店铺宣传模板
			c.__loadJs(ImgRoot+'js/templates/one_Tpl.js');
			if(typeof ShopAdv_Tpl != 'undefined' )c._TploK= true;
		}else if (menuaction=='Shops' ){ //创建店铺模板
			c.__loadJs(ImgRoot+'js/templates/one_Tpl.js');
			if(typeof Shops_Tpl != 'undefined' )c._TploK= true;
		}else if (action=='characreate'||action=='NewUserFlow' ||action=='characreatequick'||action=='secCreate'||action=='charaInfoEdit'){ //创建人物模板 新手流程
			c.__loadJs(ImgRoot+'js/templates/once_Tpl.js');//人物模板
			if (action=='characreate')c.__loadJs(ImgRoot+'js/city.js');
			if( typeof once_Tpl != 'undefined'  )c._TploK= true;


		}else if(action !='sec1' && (action.indexOf('char')!=-1  ||action.indexOf('sec')!=-1  || action.indexOf('email')!=-1 || action.indexOf('invest')!=-1
		|| action=='thingcompanycourse' || action=='thingshopsevent' || action=='shopPointAccer'|| action=='thingshopClearPlan' || action=='logonreward'|| action=='multiselect' || action=='newactivity' || action=='resetcarname' || action =='questionnaire')){

			if(typeof chara_Tpl == 'undefined'){
				c.__loadJs(ImgRoot+'js/templates/chara_Tpl.js');//人物模板

				if(typeof chara_Tpl != 'undefined' ){
					TplVal = chara_Tpl(c._ajax_action);
					if(typeof TplVal != 'undefined')c._TploK= true;
				}
			}else{
				c._TploK= true;
			}

		}else if(action.indexOf('wonbto')!=-1){

			if(typeof wonbto_Tpl == 'undefined'){
				c.__loadJs(ImgRoot+'js/templates/wonbto_Tpl.js');//人物模板

				if(typeof wonbto_Tpl != 'undefined' ){
					TplVal = wonbto_Tpl(c._ajax_action);
					if(typeof TplVal != 'undefined')c._TploK= true;
				}
			}else{
				c._TploK= true;
			}

		}else if (action.indexOf('employee')!=-1 ||action=='thinghunt'||action=='empshowfulljob'||action=='empshowfullgoutong'){ //员工模板
			if(typeof employee_Tpl == 'undefined'){
				c.__loadJs(ImgRoot+'js/viewGuageShow.js');
				c.__loadJs(ImgRoot+'js/templates/employee_Tpl.js');
				if(typeof employee_Tpl != 'undefined' ){
					TplVal = employee_Tpl(c._ajax_action);
					if(typeof TplVal != 'undefined')c._TploK= true;
				}
			}else{
				c._TploK= true;
			}
		}else if (action!='thingpower' && (action.indexOf('thing')!=-1 || action.indexOf('Purchase')!=-1 || action.indexOf('purchaseType')!=-1  || action.indexOf('purchaseFactory')!=-1 || action.indexOf('purchaseOilField')!=-1 ||action.indexOf('SAMIBC')!=-1 ||action.indexOf('empfashion')!=-1|| action.indexOf('recruit')!=-1 || action.indexOf('recruitEmp')!=-1 )){ //事业模板
			if(typeof thing_Tpl == 'undefined'){
				c.__loadJs(ImgRoot+'js/templates/thing_Tpl.js');
				if(typeof thing_Tpl != 'undefined' ){
					TplVal = thing_Tpl(c._ajax_action);
					if(typeof TplVal != 'undefined')c._TploK= true;
				}
			}else{
				c._TploK= true;
			}
		}else if (action.indexOf('cityB24')!=-1 || action.indexOf('LoginInfo')!=-1 || action=="sec1"|| action=="sendMessage"){
			if(typeof city_now_Tpl == 'undefined'){
				c.__loadJs(ImgRoot+'js/templates/city_now_Tpl.js');
				if(typeof city_now_Tpl != 'undefined' ){
					TplVal = city_now_Tpl(c._ajax_action);
					if(typeof TplVal != 'undefined')c._TploK= true;
				}
			}else{
				c._TploK= true;
			}
		}else if (action.indexOf('active16')!=-1){
			if(typeof city_active16_Tpl == 'undefined'){
				c.__loadJs(ImgRoot+'js/templates/city_active16_Tpl.js');
				if(typeof city_active16_Tpl != 'undefined' ){
					TplVal = city_active16_Tpl(c._ajax_action);
					if(typeof TplVal != 'undefined')c._TploK= true;
				}
			}else{
				c._TploK= true;
			}
		}else if (action.indexOf('city')!=-1 || action.indexOf('street')!=-1 || action.indexOf('taxis')!=-1 || action.indexOf('userinforead')!=-1 || action.indexOf('FinanceList')!=-1 || action.indexOf('mayor')!=-1 || action.indexOf('landStorm')!=-1|| action.indexOf('Turist')!=-1|| action=='NPCMyTable'|| action=='newhome'){//城市模板
			if(typeof city_Tpl == 'undefined'){
				c.__loadJs(ImgRoot+'js/templates/city_Tpl.js');
				if(typeof city_Tpl != 'undefined' ){
					TplVal = city_Tpl(c._ajax_action);
					if(typeof TplVal != 'undefined')c._TploK= true;
				}
			}else{
				c._TploK= true;
			}

		}else if (action.indexOf('cofc')!=-1 || action.indexOf('Union')!=-1 || action.indexOf('MyUCofc')!=-1
		|| action=='Diplomatism' || action=='ApplyUserList' || action=='buck' || action=='placard' || action=='voteuserlist' || action=='votekilluserlist' || action=='thingpower'|| action=='usepower' ||action=='cofcreport' || action=='CitySign' || action=='UOLog' ){//商会
			if(typeof cofc_Tpl == 'undefined'){
				c.__loadJs(ImgRoot+'js/templates/cofc_Tpl.js');
				if(typeof cofc_Tpl != 'undefined' ){
					TplVal = cofc_Tpl(c._ajax_action);
					if(typeof TplVal != 'undefined')c._TploK= true;
				}
			}else{
				c._TploK= true;
			}
		}else if (action.indexOf('shop')!=-1||action.indexOf('search')!=-1||action.indexOf('VipGetDefine')!=-1||action.indexOf('pointchange')!=-1||action.indexOf('showFashionList')!=-1||action.indexOf('fashionLotBuyList')!=-1){//商城
			if(typeof shop_Tpl == 'undefined'){
				c.__loadJs(ImgRoot+'js/templates/shop_Tpl.js');
				if(typeof shop_Tpl != 'undefined' ){
					TplVal = shop_Tpl(c._ajax_action);
					if(typeof TplVal != 'undefined')c._TploK= true;
				}
			}else{
				c._TploK= true;
			}
		}else if (action.indexOf('factory')!=-1){//工厂

			if(typeof factory_Tpl == 'undefined'){
				c.__loadJs(ImgRoot+'js/templates/factory_Tpl.js');
				if(typeof factory_Tpl != 'undefined' ){
					TplVal = factory_Tpl(c._ajax_action);
					//alert(TplVal)
					if(typeof TplVal != 'undefined')c._TploK= true;
				}
			}else{
				c._TploK= true;
			}
		}else if (action.indexOf('market')!=-1){//市场

			if(typeof market_Tpl == 'undefined'){
				c.__loadJs(ImgRoot+'js/templates/market_Tpl.js');
				if(typeof market_Tpl != 'undefined' ){
					TplVal = market_Tpl(c._ajax_action);
					if(typeof TplVal != 'undefined')c._TploK= true;
				}
			}else{
				c._TploK= true;
			}
		}else if (action.indexOf('mediaCenter')!=-1){//媒体中心
			if(typeof mediaCenter_Tpl == 'undefined'){
				c.__loadJs(ImgRoot+'js/templates/mediaCenter_Tpl.js');
				if(typeof mediaCenter_Tpl != 'undefined' ){
					TplVal = mediaCenter_Tpl(c._ajax_action);
					if(typeof TplVal != 'undefined')c._TploK= true;
				}
			}else{
				c._TploK= true;
			}
		}else if (action.indexOf('mediajCenterFinance')!=-1){//媒体中心 - 金融
			if(typeof mediaCenterFin_Tpl == 'undefined'){
				c.__loadJs(ImgRoot+'js/templates/mediaCenterFin_Tpl.js');
				if(typeof mediaCenterFin_Tpl != 'undefined' ){
					TplVal = mediaCenterFin_Tpl(c._ajax_action);
					if(typeof TplVal != 'undefined')c._TploK= true;
				}
			}else{
				c._TploK= true;
			}
		}else if (action.indexOf('stockMarket')!=-1){//股市

			if(typeof stockMarket_Tpl == 'undefined'){
				c.__loadJs(ImgRoot+'js/templates/stockMarket_Tpl.js');
				if(typeof stockMarket_Tpl != 'undefined' ){
					TplVal = stockMarket_Tpl(c._ajax_action);
					if(typeof TplVal != 'undefined')c._TploK= true;
				}
			}else{
				c._TploK= true;
			}
		}else if (action.indexOf('job')!=-1){//常务工作
			if(typeof job_Tpl == 'undefined'){
				c.__loadJs(ImgRoot+'js/viewGuageShow.js');
				c.__loadJs(ImgRoot+'js/templates/job_Tpl.js');
				if(typeof job_Tpl != 'undefined' ){
					TplVal = job_Tpl(c._ajax_action);
					if(typeof TplVal != 'undefined')c._TploK= true;
				}
			}else{
				c._TploK= true;
			}
		} else if (action.indexOf('building')!=-1) {//企业大厦
			if(typeof building_Tpl == 'undefined') {
				c.__loadJs(ImgRoot+'js/viewGuageShow.js');
				c.__loadJs(ImgRoot+'js/templates/building_Tpl.js');
				if(typeof building_Tpl != 'undefined' ){
					TplVal = building_Tpl(c._ajax_action);
					if(typeof TplVal != 'undefined')c._TploK= true;
				}
			} else {
				c._TploK= true;
			}
		} else if (action.indexOf('oilField')!=-1) {//油田系统
			if(typeof oilField_Tpl == 'undefined') {
				c.__loadJs(ImgRoot+'js/viewGuageShow.js');
				c.__loadJs(ImgRoot+'js/templates/oilField_Tpl.js');
				if(typeof oilField_Tpl != 'undefined' ){
					TplVal = oilField_Tpl(c._ajax_action);
					if(typeof TplVal != 'undefined')c._TploK= true;
				}
			} else {
				c._TploK= true;
			}
		} else if (action.indexOf('goldvip')!=-1) {//金牌VIP
			if(typeof goldvip_Tpl == 'undefined') {
				c.__loadJs(ImgRoot+'js/viewGuageShow.js');
				c.__loadJs(ImgRoot+'js/templates/goldvip_Tpl.js');
				if(typeof goldvip_Tpl != 'undefined' ){
					TplVal = goldvip_Tpl(c._ajax_action);
					if(typeof TplVal != 'undefined')c._TploK= true;
				}
			} else {
				c._TploK= true;
			}
		} else if (action.indexOf('compose')!=-1||action=='compComSetName') {//合成俱乐部

			if(typeof compose_Tpl == 'undefined') {
				c.__loadJs(ImgRoot+'js/viewGuageShow.js');
				c.__loadJs(ImgRoot+'js/templates/compose_Tpl.js');
				if(typeof compose_Tpl != 'undefined' ){
					TplVal = compose_Tpl(c._ajax_action);
					if(typeof TplVal != 'undefined')c._TploK= true;
				}
			} else {
				c._TploK= true;
			}
		} else if (action.indexOf('assistTake')!=-1) {//金牌小秘书
			if(typeof GoodSecretary_Tpl == 'undefined') {
				c.__loadJs(ImgRoot+'js/viewGuageShow.js');
				c.__loadJs(ImgRoot+'js/templates/GoodSecretary_Tpl.js');
				if(typeof GoodSecretary_Tpl != 'undefined' ){
					TplVal = GoodSecretary_Tpl(c._ajax_action);
					if(typeof TplVal != 'undefined')c._TploK= true;
				}
			} else {
				c._TploK= true;
			}
			    try {

				clearInterval(timeSetIntelWonto);
				timeSetIntelWonto=setInterval(function() {showReportDetail(dailReport,dailReportStartTime);},1000);
			    } catch(e) {

			    }
		}

		if(c._TploK===false){
			setTimeout('c.__Tpl_Check()',200);
		}else{
			c.__OpenHostRight(c.Confin);return false;
		}


	};
	this.__func_speaker = function() {
	};

	this.__func_maile=function (){
		if(c.bytes2BSTR.indexOf('@@@') != -1){
			var s = c.bytes2BSTR.split('@@@');
			var error = parseInt(s[0]);//1 是错误的 0是成功的

			setTimeout("c.__MainMsgClose()",0);
			if (error==1||error==3||error==4||error==5)
			{
				c.__MainMsg(s[1],3,error);
			}else if (error==2)
			{

				c._refUrl = s[2];
				c.__MainMsg(s[1],4);
			}else{
				var Confin={name:'MenuChild',contents:s[1],error:0,width:480,menuaction:'MenuChild',action:c._ajax_action['action']
				}
				c.__OpenHostRight(Confin);
				//setTimeout("c.__ShowLabel('"+c._ajax_action['child']+"','"+c._ajax_action['main']+"')",0);

			}
		}
	};
	this.__func_OpenWid=function (){
		if(c.bytes2BSTR.indexOf('@@@') != -1){
			var s = c.bytes2BSTR.split('@@@');
			var error = parseInt(s[0]);//1 是错误的 0是成功的
			setTimeout("c.__MainMsgClose()",0);
			if (error==1)
			{
				c.__MainMsg(s[1],3);
			}else{
				c.Confin={name:'MenuChild',title:lang._js_js._common._label656,contents:s[1],error:0,width:480,menuaction:'Shops',MapId:c._MapId,TaskId:CurrentTaskId,action:c._ajax_action,action_prowse:c._ajax_action_prowse}
				c._ajax_menuaction='Shops';
				c.__Tpl_Check();
			}

		}
	};
	this.__func_img=function (){
		if(c.bytes2BSTR.indexOf('@@@') != -1){
			var s = c.bytes2BSTR.split('@@@');
			var error = parseInt(s[0]);//1 是错误的 0是成功的
			setTimeout("c.__MainMsgClose()",0);
			if (error==1||error==3||error==4||error==5)
			{
				c.__MainMsg(s[1],3,error);
			}else{
				sarr=s[1].split('/*###*/');
				for(i in sarr){
					if(sarr[i].substring(0,3)=='var'){
						eval(sarr[i]);
					}else{
						var strObj = new unserialize(sarr[i]);
					}
				}

				var Confin={name:c._ajax_name,appointObj:c._ajax_name,contents:strObj,error:0,menuaction:c._ajax_menuaction,action:c._ajax_action,action_prowse:c.action_prowse,zindex:9999}
				c.__OnOpenWid(Confin);
			}

		}
	};


	this.__OnSend=function (){
		//c.__loadJs(ImgRoot+'js/templates/chara.js');
		//var nowtime	= new Date().getTime();
		//if(this._lasttime+1000>nowtime){return ;}
		//if(!CanSendAjax)return;
		//CanSendAjax=false;
		c._ajax_action=null;
		var url = arguments[0]?(pagecharset=='utf-8'?encodeURI(arguments[0]):arguments[0]):null;//GET地址
		var data = arguments[1]?arguments[1]:null;//POST
		var func = arguments[2]?arguments[2]:c.__func;//POST
		c._ajax_action = arguments[3]?arguments[3]:null;//
		this._ajax_action_prowse = arguments[4]?arguments[4]:null;//浏览页面标签


		//objevent=window.event? {x:event.clientX, y:event.clientY} : {x:e.pageX, y:e.pageY};
		//url+='&__ex='+objevent.x+'&__ey='+objevent.y;
		if(c._ajax_action == 'thing3' && this._ajax_action_prowse == 5){
			url= url + '&newfids='+getfosterid(c._fids,0);
		}

		if(c._ajax_action=='sendMessage'){//发送信息提示
		}else{
			c.__MainMsg(lang._js_js._common._label657);
		}

		this._ajax_menuaction = arguments[5]?arguments[5]:'MenuChild';//栏目判断
		this._ajax_name = (arguments[6]!='undefined')?arguments[6]:null;//父div
		this._ajax_zindex = arguments[7]?arguments[7]:null;//

		if(c._ajax_action!='sendMessage'&&c._ajax_action!='wonbtosendword'){
			if(func!==this.__func_msg){
				var barg=[1,arguments];
				c._st.push(barg);
			}

			if(func!==this.__func_msg&&this._preAction!=(this._ajax_action+"_"+this._ajax_action_prowse)){
				var barg=[1,arguments];
				c._preAction = "";
				this._preAction=this._ajax_action+"_"+this._ajax_action_prowse;
			}
			c.__disabledst=true;
		}

		c.__send(url,data,func);
		//setTimeout("c.__send('"+url+"',eval("+data+"),eval("+func+"));",1000);
	};

	this.__OnStock=function (){
		setTimeout("c.__MainMsgClose()",0);
		var Confin={contents:'',error:0,width:480,menuaction:'stock',action:''}
		c.__OpenHostRight(Confin);
	};
	this.__OnDayNews=function (){
		setTimeout("c.__MainMsgClose()",0);
		var Confin={contents:'',error:0,width:480,menuaction:'daynews',action:''}
		c.__OpenHostRight(Confin);
	};

	this.__func_div=function (){
		if(c.bytes2BSTR.indexOf('@@@') != -1){
			var s = c.bytes2BSTR.split('@@@');
			var error = parseInt(s[0]);//1 是错误的 0是成功的
			setTimeout("c.__MainMsgClose()",0);
			if (error==1)
			{
				if(c._ajax_div1!=null)if(s[1].indexOf('var') == -1)c._$(c._ajax_div1).innerHTML=s[1];
				if(c._ajax_div2!=null)if(s[2].indexOf('var') == -1)c._$(c._ajax_div2).innerHTML=s[2];
				if(s[3] != ''){
					if(c._ajax_div3!=null)
					if(s[3].indexOf('var') == -1)
					c._$(c._ajax_div3).innerHTML=s[3];
				}
				if(c._ajax_div4!=null)c._$(c._ajax_div4).style.visibility= 'visible';
			}
		}
	};

	this.__OnSendDiv=function (){
		var url = arguments[0]?arguments[0]:null;//GET地址
		var data = arguments[1]?arguments[1]:null;//POST
		var func = arguments[2]?arguments[2]:c.__func_div;//POST
		this._ajax_div1 = arguments[3]?arguments[3]:null;
		this._ajax_div2 = arguments[4]?arguments[4]:null;
		this._ajax_div3 = arguments[5]?arguments[5]:null;
		this._ajax_div4 = arguments[6]?arguments[6]:null;

		c.__send(url,data,func);

	};
	/*this.__OnSendMaile=function (){
	var url = arguments[0]?arguments[0]:null;//GET地址
	var data = arguments[1]?arguments[1]:null;//POST
	this._ajax_action = arguments[2]?arguments[2]:null;//action
	c.__send(url,data,c.__func_maile);

	};*/
	/*this.__OnSendCommList=function (){
	var url = arguments[0]?arguments[0]:null;//GET地址
	this._ajax_action = arguments[1]?arguments[1]:null;//action
	var data = arguments[2]?arguments[2]:null;//POST
	c.__send(url,data,c.__func_comm_list);

	};*/
	this.__query = function (form){//将表单元数拼成Query条件
		var queryString="";

		var o = form.elements;
		if(typeof o !='object')return;
		for(var i=0;i<o.length;i++){

			if((o[i].name || o[i].id) && (o[i].type != 'radio' && o[i].type != 'checkbox' || o[i].checked === true)) {
				if (!o[i].name && !o[i].id){
					continue;
				}
				queryString += "&" + (o[i].name?o[i].name:o[i].id) + "=" +(o[i].value);
			}
			//alert(queryString)
		}
		queryString=queryString.substring(1);
		return queryString;
	};
	this.__convert = function(str){
		f = new Array(/\r\n/g,/\+/g,/\&/g,/\s/g);
		r = new Array('%0A', '%2B', '%26','%20');
		for(var i = 0;i<f.length;i++){
			str = str.replace(f[i], r[i]);
		}
		return str;
	};
}

var __setAssetsTimeId=0;
function setAssets(Init){
	return ;
	if(__setAssetsTimeId>0)clearTimeout(__setAssetsTimeId);
	if(Init==true){
		if(c.__MinAssets>0&&c.__Assets>=0){
			c.__Assets+=c.__MinAssets;
			c.__TodayIncomeInt+=c.__MinAssets;
			c._$('user_allasset').innerHTML=_num_format(c.__Assets);
			c._$('user_today').innerHTML=_num_format(c.__TodayIncomeInt);
		}
	}
	__setAssetsTimeId = setTimeout('setAssets(true);',60000);
}

function  getByteLen(str)  {
	var l= str.length;
	var n=l;
	for(var   i=0; i<l;i++)
	if(str.charCodeAt(i)<0||str.charCodeAt(i)>255)
	n++;
	return n;
}


var getCheckboxIdArr={};
function getCheckboxId(allV,name,sel,who){
	var CheckboxId=document.getElementsByName(name);
	var tStr='';
	var sArr = allV.split(',');
	var getArr =  sArr;
	if(sel=='all'){
		for(j=0;j<getArr.length-1;j++){
			getCheckboxIdArr[getArr[j]]= getArr[j];
		}
	}else{
		for(i=0;i<CheckboxId.length;i++){
			if(CheckboxId[i].checked&&(CheckboxId[i].value!=''||CheckboxId[i].value>0)){
				getCheckboxIdArr[CheckboxId[i].value]= CheckboxId[i].value;
			}else if(!CheckboxId[i].checked){
				getCheckboxIdArr[CheckboxId[i].value]= 0;
			}
		}
	}
	var jj=0;
	if(who=='CofoApply'){
		c._setUserId={};
		c._getUserId='';
	}else if(who=='Employee'){
		c._getEmployeeId='';c._setEmployeeId={};
	}else if(who=='ToUserId'){
		c._getToUserId='';c._setToUserId={};
	}else{
		c._setShopId={};
		c._getShopId='';
	}

	for(j=0;j<getArr.length-1;j++){
		if(getCheckboxIdArr[getArr[j]]==getArr[j]){
			if(who=='CofoApply'){
				c._getUserId+=getArr[j]+',';
				c._setUserId[getArr[j]]=getArr[j];
			}else if(who=='Employee'){
				c._getEmployeeId+=getArr[j]+',';
				c._setEmployeeId[getArr[j]]=getArr[j];
			}else if(who=='ToUserId'){

				c._getToUserId+=getArr[j]+',';
				c._setToUserId[getArr[j]]=getArr[j];

			}else{
				c._getShopId+=getArr[j]+',';
				c._setShopId[getArr[j]]=getArr[j];
			}
			jj=1;
		}

	}

	///return tStr;
}

function getCheckBoxValue(name){
	var getCheckBoxValueArr='';
	if (!document.getElementsByName(name)){
		return '';
	}
	checkBoxArray = document.getElementsByName(name);

	for (i = 0; i < checkBoxArray.length; i++){
		if(checkBoxArray[i].checked&&(checkBoxArray[i].value!=''||checkBoxArray[i].value>0)){
				if (getCheckBoxValueArr!=''){getCheckBoxValueArr += ','}

				getCheckBoxValueArr = getCheckBoxValueArr+checkBoxArray[i].value;
		}

	}
	return getCheckBoxValueArr;
}

function getfosterid(fids,mode){

	var ti= '';
	var s;
	var FosterIds=document.getElementsByName('FosterId');
	if(mode == 1){
		for(i=0;i<FosterIds.length;i++){
			if(FosterIds[i].checked){
				ti=ti+FosterIds[i].value+'|';
			}
		}
		return ti+fids;
	}
	else{
		for(i=0;i<FosterIds.length;i++){
			if(FosterIds[i].checked){
				s= FosterIds[i].value.split(',');
				ti+= s[0]+',';
			}
		}
		return ti+fids;
	}
}

function checkFosterId(fids){
	var selectedTotal = 0;
	var FosterIds=document.getElementsByName('FosterId');
	for(i=0;i<FosterIds.length;i++){
		if(FosterIds[i].checked){
			selectedTotal = selectedTotal + 1;
		}
	}

	return selectedTotal;
}

/*mainAjax*/

/*templatel*/
function templates (){
	/*各项显示内容*/
	this._stro="";
	this._EmployeeType={1:lang._js_js._common._label658,2:lang._js_js._common._label659,3:lang._js_js._common._label660,4:lang._js_js._common._label661}
	this._EmployeeType_E={'1':lang._js_js._common._label658,'2':lang._js_js._common._label659,'3':lang._js_js._common._label660,'4':lang._js_js._common._label661}
	this.__Hint_Tpl= function (o,g_name){
		if(c.__disabledst==true){
			c._st.pop(-1);
		}

		switch(this._action){
			case 1://接受任务成功后。提示
			s = '<div id="pop_win_confirm" class="pop_win">';
			s += '	<div class="pop_win_top"></div>';
			s += '	<div class="pop_win_middle">';
			s += '		<div class="pop_icon">&nbsp;</div>';
			s += '		<div class="pop_win_content">'+o+'</div>';
			s += '	</div>';
			s += '	<div class="pop_win_bottom">';
			if(this._action_prowse==111||this._action_prowse==112)//拆除店铺,策略专用
			{
				if(this._action_prowse==111)s+="<span class=\'btn_normal\'><button id='button1'   onclick=\"c.ok();\"  >"+lang._js_js._common._label662+"</button></span>&nbsp;";
				s+="<span class=\'btn_normal\'><button id='buttoncancel'   onclick=\""+c._refUrl+";c.ok();\"  >"+lang._js_js._common._label663+"</button></span>";
			}else{
				s+="<span class=\'btn_normal\'><button id='button1'   onclick=\"if(!TaskAgentFunc())c.__OnCloseWid();\"  >"+lang._js_js._common._label663+"</button></span>";
			}
			s += '	</div>';
			s += '</div>';
			break;
			case 2://物品删除。提示
			s = '<div id="pop_win_confirm" class="pop_win">';
			s += '	<div class="pop_win_top"></div>';
			s += '	<div class="pop_win_middle">';
			s += '		<div class="pop_icon">&nbsp;</div>';
			s += '		<div class="pop_win_content">'+o+'</div>';
			s += '	</div>';
			s += '</div>';
			break;
			case 3://公用提示,失败
			if(o.indexOf('###') != -1){
				var s= o.split('###');
				o= s[0];
				var btn= document.getElementById(s[1]);
				if(btn)
				btn.disabled= false;
			}
			state = 'confirm';
			if (this._action_prowse==8)
			{
				var onclicks = "if(!TaskAgentFunc());c.__OnCloseWid();";
			}else if(this._action_prowse==5){
				var onclicks = "self.location='"+ServerHost+"';";
				state = 'success';
			}else{
				var onclicks = "if(typeof(TaskAgentFunc)!='function'||!TaskAgentFunc());c.ok();";
				state = 'failed';
				if (this._action_prowse==4){
					state = 'success';
				}
			}


			s = '<div id="pop_win_'+state+'" class="pop_win">';
			s += '	<div class="pop_win_top"></div>';
			s += '	<div class="pop_win_middle">';
			s += '		<div class="pop_icon">&nbsp;</div>';
			s += '		<div class="pop_win_content">'+o+'</div>';
			s += '	</div>';
			s += '	<div class="pop_win_bottom">';
			s += "		<span class=\'btn_normal\'><button id='button1'  onclick=\""+onclicks+"\" >"+lang._js_js._common._label663+"</button></span>";
			s += '	</div>';
			s += '</div>';
			break;
			case 4://成功
			s = '<div id="pop_win_success" class="pop_win">';
			s += '	<div class="pop_win_top"></div>';
			s += '	<div class="pop_win_middle">';
			s += '		<div class="pop_icon">&nbsp;</div>';
			s += '		<div class="pop_win_content">'+o+'</div>';
			s += '	</div>';
			s += '	<div class="pop_win_bottom">';
			s += "		<span class=\'btn_normal\'><button id='button1'   onclick=\""+c._refUrl+";c.ok();\" >"+lang._js_js._common._label663+"</button></span>";
			s += '	</div>';
			s += '</div>';
			break;
			case 6://取消 确定
			case 8://取消 确定
			s = '<div id="pop_win_confirm" class="pop_win">';
			s += '	<div class="pop_win_top"></div>';
			s += '	<div class="pop_win_middle">';
			s += '		<div class="pop_icon">&nbsp;</div>';
			s += '		<div class="pop_win_content">'+o+'</div>';
			s += '	</div>';
			s += '	<div class="pop_win_bottom">';
			s+="<span class=\'btn_normal\'><button id='button1'   onclick=\"c.ok();\"  > "+lang._js_js._common._label662+" </button></span> &nbsp;&nbsp;"
			if(this._action==8){
				s+="<span class=\'btn_normal\'><button id='buttoncancel'   onclick=\"this.disabled=true;"+c._refUrl+";c.ok();\"  > "+lang._js_js._common._label663+" </button></span>";
			}else{
				s+="<span class=\'btn_normal\'><button id='buttoncancel'   onclick=\"this.disabled=true;"+c._refUrl+";c.__OnCloseWid();c.ok();\"  >"+lang._js_js._common._label663+"</button></span>";
			}
			s += '	</div>';
			s += '</div>';
			break;
			case 7://取消 确定
			s = '<div id="pop_win_confirm" class="pop_win">';
			s += '	<div class="pop_win_top"></div>';
			s += '	<div class="pop_win_middle">';
			s += '		<div class="pop_icon">&nbsp;</div>';
			s += '		<div class="pop_win_content">'+o+'</div>';
			s += '	</div>';
			s += '	<div class="pop_win_bottom">';
			s+="		<span class=\'btn_normal\'><button id='buttoncancel'   onclick=\"this.disabled=true;"+c._refUrl+";c.__OnCloseWid();c.ok();\"  >"+lang._js_js._common._label663+"</button></span>";
			s += '	</div>';
			s += '</div>';
			break;
			default://
			s = '<div id="pop_win_success" class="pop_win">';
			s += '	<div class="pop_win_top"></div>';
			s += '	<div class="pop_win_middle">';
			s += '		<div class="pop_icon">&nbsp;</div>';
			s += '		<div class="pop_win_content">'+o+'</div>';
			s += '	</div>';
			s += '	<div class="pop_win_bottom">';
			s += "		<span class=\'btn_normal\'><button type=button name=button1 onclick=\"c.ok();\"   >"+lang._js_js._common._label663+"</button></span>";
			s += '	</div>';
			s += '</div>';
		}
		return s;
	};
	this.__Confirm = function (title,str,Url){
		c._refUrl=Url;
		c.__MainMsg(str,1,111,title);
	};
	this.__worldMsg_Tpl= function (o,g_name){
		var s='';
		if (o != null && o != ""){ if (typeof o === 'string'){ eval(o); }}
		if (this._action_prowse==null)
		{
			this.__loadJs(ImgRoot+'js/formcheck.js');
			s+='<div style="position:absolute;left:176px;top:10px;width:12px;height:12px;display:block;"><img src='+ImgRoot+'images/bottom002.gif height=10 style="cursor:pointer;margin-top:-2px;" onclick="c.__OffWin(\''+g_name+'\');\"></div>';
			s+="<table width=100% height=100  cellspacing=0  >";
			s+='<tr><td class=faceshow>';
			var j=0;
			for (i in o.pic )
			{
				if(j==6){s+="<br>";j=0;}
				j=j+1;
				s+="<img src='"+ImgRoot+"images/worldface/"+o.pic[i]+"' width='19' height='19' onclick=\"getFace('[:"+i+"]');c.__OffWin('"+g_name+"');\" onmouseover=\"this.className='face_over'\" onmouseout=\"this.className='face_out'\">"
			}
			s+="</td></tr>";
			s+="</table>";
			return s;
		}
	}
	this.__MyCarRead_Tpl = function(oo,name){
		for (var key in oo)
		{
			window[key] = oo[key];
		}
		var s;
		var BuyType = chat.BuyType==3 ? lang._js_js._common._label672 :"G";
		var PriceText;
		var TitleText;
		if(chat.IsHired){
			TitleText = lang._js_js._common._label673;
			BuyType = lang._js_js._common._label672+"/"+lang._js_js._common._label676+"";
			PriceText = chat.hiregold;
		}else{
			TitleText = lang._js_js._common._label674;
			PriceText = chat.salemoney;
		}
		var isUse = chat.IsAuto == 0 ? lang._js_js._common._label668 : lang._js_js._common._label669;
		s='<table width=100% cellpadding=2 cellspacing=0  style="border:1px solid #ccc; background:#666;">'
		+'<tr >'
		+'<td rowspan="2" width=50 valign=top align=center ><div style="margin-top:4px;"></div><img width=44  src="'+ImgToolsUrl+chat.toolsimg+'" class=absmiddle alt="'+chat.toolsname+'" /></td>'
		+'<td width=166 ><div style="margin-top:4px;"></div><span style="float:right"><img src='+ImgRoot+'images/bottom002.gif height=10 style="cursor:pointer;margin-top:-2px;" onclick="c.__OffWin(\''+name+'\');\"></span><b class=red2>'+chat.toolsname+'</b></td>'
		+'</tr>'
		+'<tr>'
		+"<td ><table width=100%  cellspacing=0  ><tr><td class='deepred' colspan='2'>"+lang._js_js._common._label664+""+isUse+"</td></tr><tr><td valign=top width=45  class='deepred'>"+TitleText+":</td><td width=* class=yellow2 >"+PriceText+BuyType+"</td></tr></table></td>";
		+'</tr>'
		if(chat.CarNum!=0){
			s+='<tr><td colspan="2" style="padding-left:6px;height:20px"><table width=100%  cellspacing=0  ><tr><td valign=top width=60><font class=CCCCCC>'+lang._js_js._common._label670+'</font></td><td width=*>'+chat.CarNum+'</td></table></td></tr>';
		}
		/*s+= '<tr><td colspan="2" style="padding-left:6px;height:20px"></td></tr>';*/
		s+= '<tr><td colspan="2" style="padding-left:6px;height:20px"><table width=100%  cellspacing=0  ><tr><td valign=top width=60 class="deepred">'+lang._js_js._common._label666+':</td><td width=* class=yellow2 >'+chat.TrafficLevel+''+lang._js_js._common._label677+'</td></table></td></tr>';
		s+= '<tr><td colspan="2" style="padding-left:6px;height:20px"><table width=100%  cellspacing=0  ><tr><td valign=top width=60 class="deepred">'+lang._js_js._common._label667+':</td><td width=* class=yellow2 >'+chat.BuyCount+'</td></table></td></tr>';
		s+= '<tr><td colspan="2" style="padding-left:6px;height:20px"><table width=100%  cellspacing=0  ><tr><td valign=top width=60 class="deepred">'+lang._js_js._common._label665+'</td><td width=* class=yellow2 >'+chat.LoadedNum+''+lang._js_js._common._label678+'</td></table></td></tr>';
		s+= "<tr><td colspan='2' style='padding-left:6px;height:20px'><table width='100%' cellspacing=0><tr><td width='45'  class='deepred' valign='top'>"+lang._js_js._common._label671+"</td><td valign='top' width='*'  class='deepred'>"+chat.Effect+"<br /><font class='brightgreen'>"+chat.ExtraAttr+"</font></td></tr></table></td></tr>";
		/*s+= "<tr><td colspan='2' style='padding-left:6px;height:20px'><table width='100%' cellspacing=0><tr><td width='45' style='color:ccc;' valign='top'></td><td valign='top' width='*' style='color:#00ff00;'>"+lang._js_js._common._label675+"<span style='font-weight:bold;color:yellow;'>10%</span><br/>"+lang._js_js._common._label675+"<span style='font-weight:bold;color:yellow;'>10%</span></td></tr></table></td></tr>";*/
		s+= '<tr><td colspan="2" style="padding-left:6px;height:20px"><table width=100%  cellspacing=0  ><tr><td width=* >'+chat.toolsinfo+'</td></table></td></tr>';
		s+= '</table>';
		return s;
	}

	this.__MyFashion_Tpl = function (oo,name)
	{
		for (var key in oo)
		{
			window[key] = oo[key];
		}
	    var s = '';
		s += "<div style='border:1px solid #ccc; background:#666;text-align:left;padding:4px 10px 10px 10px;width:190px;'>";
		s += "	<div style='text-align:right;'><span style='cursor:pointer;color:#fc0;font-weight:bold' onclick=\"c.__OffWin('"+name+"');\">X</span></div>";
	    s +=		chat.hint;
		s += "</div></div>";
	    return s;
	}

	this.__MyGood_Tpl = function(o,name){
		var s;
		s='<table width=100% cellpadding=2 cellspacing=0  style="border:1px solid #ccc; background:#666;">'
		+'<tr >'
		+'<td rowspan="2" width=50 valign=top align=center ><div style="margin-top:4px;"></div><img width=44  src="'+ImgToolsUrl+"big/"+o.Img+'" class=absmiddle alt="'+o.eName+'" /></td>'
		+'<td width=166 ><div style="margin-top:4px;"></div><font class=CCCCCC><span style="float:right"><img src='+ImgRoot+'images/bottom002.gif height=10 style="cursor:pointer;margin-top:-2px;" onclick="c.__OffWin(\''+name+'\');\"></span>'+lang._js_js._common._label683+'</font><b class=red2>'+o.eName+'</b></td>'
		+'</tr>'

		+'<tr>'
		+"<td ><font class=CCCCCC>"+lang._js_js._common._label680+"</font><a href=\"javascript:void(0)\" onclick=\"c.__OnSend('ajax_action.php?action=userinforead&OUserId="+o.UserId+"','',c.__func_comm_list,'userinforead');\"  class=chatcom>"+o.VUserName+"</a></td>"
		+'</tr>';

		if(o.AVUserName!=''){
			s+='<tr>'
			+"<td colspan=2 style='padding-left:6px;height:20px'><font class=CCCCCC>"+lang._js_js._common._label681+"</font><a href=\"javascript:void(0)\" onclick=\"c.__OnSend('ajax_action.php?action=userinforead&OUserId="+o.AUserId+"','',c.__func_comm_list,'userinforead');\"  class=chatcom>"+o.AVUserName+"</a></td>"
			+'</tr>'
		}

		s+='<tr>'
		+'<td colspan="2" style="padding-left:6px;height:20px"><table width=100%  cellspacing=0  ><tr><td valign=top width=50><font class=CCCCCC>'+lang._js_js._common._label682+'</font></td><td width=* >'+o.Effect+'</td></table>'
		+'</tr>'
		+'</table>'
		return s;
	}
	this.__Instructor_Tpl = function(o,name){
		var s;
		s='<table width=100% cellpadding=2 cellspacing=0  style="border:1px solid #ccc; background:#666;">'

		+'<tr >'
		+'<td width=50% align=left style="padding-left:6px;height:20px"><font class=CCCCCC>'+lang._js_js._common._label679+'</font></td>'
		+'<td width=50% ><span style="float:right"><img src='+ImgRoot+'images/bottom002.gif height=10 style="cursor:pointer;margin-top:-2px;" onclick="c.__OffWin(\''+name+'\');\"></span><b class=red2>'+o.OrderNum+'</b></td>'

		+'</tr>'
		if(ConfigUser.myOrderNum !=1){
			s+='<tr>'
			+'<td style="padding-left:6px;height:20px" ><span class=\'btn_normal\'><button type=button name=button1 onclick="c.__OnSend(\'ajax_action.php?action=report&support=1&userid='+o.OrderNum+'\',\'\',c.__func_comm_list,\'\');"  >'+lang._js_js._common._label684+'</button></span></td><td style="padding-left:6px;height:20px"><span class=\'btn_normal\'><button type=button name=button1 onclick="c.__OnSend(\'ajax_action.php?action=report&criticize=1&userid='+ o.OrderNum +'\',\'\',c.__func_comm_list,\'\');"  >'+lang._js_js._common._label685+'</button></span></td>'
			+'</tr>'
		}

		+'</table>'
		return s;
	}

	this.__EmplyeeRead_Tpl = function(oo,name){
		for (var key in oo)
		{
			window[key] = oo[key];
		}

        //初始化 - 现有的时装信息
        var necklaceImg = (chat.nowFashion.necklace.img) ? chat.nowFashion.necklace.img : ImgRoot+"images/blank.gif";
        var watchImg    = (chat.nowFashion.watch.img) ? chat.nowFashion.watch.img : ImgRoot+"images/blank.gif";
        var ringImg     = (chat.nowFashion.ring.img) ? chat.nowFashion.ring.img : ImgRoot+"images/blank.gif";
        var clothesImg  = (chat.nowFashion.clothes.img) ? chat.nowFashion.clothes.img : ImgRoot+"images/blank.gif";
        var shoeImg     = (chat.nowFashion.shoe.img) ? chat.nowFashion.shoe.img : ImgRoot+"images/blank.gif";
        var strapImg    = (chat.nowFashion.strap.img) ? chat.nowFashion.strap.img : ImgRoot+"images/blank.gif";

        var necklaceHint = (chat.nowFashion.necklace.hint) ? chat.nowFashion.necklace.hint : '';
        var watchHint    = (chat.nowFashion.watch.hint) ? chat.nowFashion.watch.hint : '';
        var ringHint     = (chat.nowFashion.ring.hint) ? chat.nowFashion.ring.hint : '';
        var clothesHint  = (chat.nowFashion.clothes.hint) ? chat.nowFashion.clothes.hint : '';
        var shoeHint     = (chat.nowFashion.shoe.hint) ? chat.nowFashion.shoe.hint : '';
        var strapHint    = (chat.nowFashion.strap.hint) ? chat.nowFashion.strap.hint : '';

        var _ExecTd_l = (chat.add.Exec) ? "+"+chat.add.Exec : "";
        var _AdminTd_l = (chat.add.Admin) ? "+"+chat.add.Admin : "";
        var _HopeTd_l = (chat.add.Hope) ? "+"+chat.add.Hope : "";

		var s = '';
		s += "<div style='border:1px solid #ccc; background:#666;text-align:center;padding:10px;width:200px;'>";
		s += "<table width='200' cellspacing='0' name='fashionImgByChat_' id='fashionImgByChat_'>";

		s += "		<tr><td colspan='3' style='text-align:center;'><img src='"+chat.BigImg+"' height='131' width='100' alt='"+chat.Name+"' /><br/><br/>";
		s += "		<span class='Grade"+chat.SkillMax+"'>" + chat.Name + "</span></td></tr>";

		/*s += "	<tr><td width='25%' >";
		s += "		<div style='background:url("+ImgRoot+"images/fashion_box.gif) 0 0 no-repeat;float:left;width:54px;height:72px;margin:0 auto;color:#fc0;' hint=\""+necklaceHint+"\">";
		s += "			<img width='50' height='50' style='margin-top:2px; margin-bottom: 3px;' src='"+necklaceImg+"' /><span style='clear:both;display:block;'>"+lang._js_js._common._label703+"</span>";
		s += "		</div>";
		s += "	</td><td width='50%' rowspan='3'>";
		s += "		<img src='"+chat.BigImg+"' height='131' width='100' alt='"+chat.Name+"' /><br/><br/>";
		s += "		<span class='Grade"+chat.SkillMax+"'>" + chat.Name + "</span><br/><br/>";
		s += "		<br/><br/><br/>";
		s += "	</td><td width='25%'>";
		s += "		<div style='background:url("+ImgRoot+"images/fashion_box.gif) 0 0 no-repeat;float:left;width:54px;height:72px;margin:0 auto;color:#fc0;' hint=\""+watchHint+"\">";
		s += "			<img width='50' height='50' style='margin-top:2px; margin-bottom: 3px;' src='"+watchImg+"' hint='"+lang._js_js._common._label692+"'/><span style='clear:both;display:block;'>"+lang._js_js._common._label704+"</span>";
		s += "		</div>";
		s += "	</td></tr><tr><td>";
		s += "		<div style='background:url("+ImgRoot+"images/fashion_box.gif) 0 0 no-repeat;float:left;width:54px;height:72px;margin:0 auto;color:#fc0;' hint=\""+ringHint+"\">";
		s += "			<img width='50' height='50' style='margin-top:2px; margin-bottom: 3px;' src='"+ringImg+"' hint='"+lang._js_js._common._label692+"'/><span style='clear:both;display:block;'>"+lang._js_js._common._label705+"</span>";
		s += "		</div>";
		s += "	</td><td>";
		s += "		<div style='background:url("+ImgRoot+"images/fashion_box.gif) 0 0 no-repeat;float:left;width:54px;height:72px;margin:0 auto;color:#fc0;' hint=\""+clothesHint+"\">";
		s += "			<img width='50' height='50' style='margin-top:2px; margin-bottom: 3px;' src='"+clothesImg+"'/><span style='clear:both;display:block;'>"+lang._js_js._common._label706+"</span>";
		s += "		</div>";
		s += "	</td></tr><tr><td>";
		s += "		<div style='background:url("+ImgRoot+"images/fashion_box.gif) 0 0 no-repeat;float:left;width:54px;height:72px;margin:0 auto;color:#fc0;' hint=\""+shoeHint+"\">";
		s += "			<img width='50' height='50' style='margin-top:2px; margin-bottom: 3px;' src='"+shoeImg+"' hint='"+lang._js_js._common._label692+"'/><span style='clear:both;display:block;'>"+lang._js_js._common._label707+"</span>";
		s += "		</div>";
		s += "	</td><td>";
		s += "		<div style='background:url("+ImgRoot+"images/fashion_box.gif) 0 0 no-repeat;float:left;width:54px;height:72px;margin:0 auto;color:#fc0;' hint=\""+strapHint+"\">";
		s += "			<img width='50' height='50' style='margin-top:2px; margin-bottom: 3px;' src='"+strapImg+"' hint='"+lang._js_js._common._label692+"'/><span style='clear:both;display:block;'>"+lang._js_js._common._label708+"</span>";
		s += "		</div>";
		s += "	</td></tr>";*/
		s += "<tr><td colspan='3' style='text-align:left'>";
		s += lang._js_js._common._label691 + chat.CompanyName + "<font class=CCCCCC>("+chat.IndustryName+")";
		s += "	</td></tr><tr><td colspan='3'>";
		s += "		<table cellspacing='0' width='100%'><tr><td width='40%;'style='text-align:left'>"+lang._js_js._common._label698+"</td><td width='45%'>" + chat.ExecPercent + "</td><td style='color:#27B4F8;text-align:left' "+( chat.add.Exec ? "hint='"+lang._js_js._common._label688+"'" : "")+">"+_ExecTd_l+"</td></tr></table>";
		s += "	</td></tr><tr><td colspan='3'>";
		s += "		<table cellspacing='0' width='100%'><tr><td width='40%;'style='text-align:left'>"+lang._js_js._common._label699+"</td><td width='45%'>" + chat.AdminPercent + "</td><td style='color:#27B4F8;text-align:left' "+( chat.add.Admin ? "hint='"+lang._js_js._common._label689+"'" : "")+">"+_AdminTd_l+"</td></tr></table>";
		s += "	</td></tr><tr><td colspan='3'>";
		s += "		<table cellspacing='0' width='100%'><tr><td width='40%;'style='text-align:left'>"+lang._js_js._common._label700+"</td><td width='45%'>" + chat.HopePercent + "</td><td style='color:#27B4F8;text-align:left' "+( chat.add.Hope ? "hint='"+lang._js_js._common._label690+"'" : "")+">"+_HopeTd_l+"</td></tr></table>";
		//s += "	</td></tr><tr id='at_inValHint_js'><td colspan='3' style='text-align:left;'>";
		//s += "		<span hint='"+lang._js_js._common._label687+"'>"+lang._js_js._common._label693+"</span><span class='yellow2' style='font-weight:bold'>" + chat.Attack + "%</span>&nbsp;&nbsp;&nbsp;&nbsp;";
		//s += "		<span hint='"+lang._js_js._common._label686+"'>"+lang._js_js._common._label694+"</span><span class='yellow2' style='font-weight:bold'>" + chat.Inmmunity + "%</span>";
		s += "	</td></tr><tr><td colspan='3' style='text-align:left;line-height:180%;'>";
		s += "		<table width='100%' cellspacing='0'><tr><td width='40' style='vertical-align:top'>";
		s += ""+lang._js_js._common._label695+"</td><td style='color:#ff0;clear:right'>" + (chat.Skills ? chat.Skills : lang._js_js._common._label709)+"</td></tr></table>";
		s += "		<table width='100%' cellspacing='0'><tr><td width='40' style='vertical-align:top'>";
		s += ""+lang._js_js._common._label696+"</td><td style='color:#ff0;clear:right'>"+chat.DowerName+"</td></tr></table>";
		s += ""+lang._js_js._common._label697+"<span class='yellow2' style='clear:right'>" + chat.Price + " G</span>";
		s += "	</td></tr>";
		s+="<tr><td colspan='3' style='text-align:center'>";

		if(chat.ToUserId>0&&chat.loyalty == 0)
		{
			s += "<span class=\'btn_normal\'><button type=button name=button1 onclick=\"c.__OnSend('ajax_action.php?action=AdFavEmployee&ToUserId="+chat.ToUserId+"&EmployeeId="+chat.Id+"','',c.__func_comm_list,'AdFavEmployee');\"  >"+lang._js_js._common._label701+"</button></span>"
		}
		s += "<span class=\'btn_normal\'><button   onclick=\"c.__OffWin('"+name+"');\">"+lang._js_js._common._label702+"</button></span></td></tr>";
		s += "</table></div>";
		window.setTimeout("new elem_alt('fashionImgByChat_', 'div','hint','10px')",1000);
		window.setTimeout("new elem_alt('fashionImgByChat_', 'td','hint','10px')",1000);
		setTimeout("new elem_alt('at_inValHint_js', 'span','hint','10px');",500);
		return s;

	};
	this.__FactoryRead_Tpl = function(oo,name){
		for (var key in oo)
		{
			window[key] = oo[key];
		}
		var s;
		s='<table width=100% cellpadding=2 cellspacing=0  style="border:1px solid #ccc; background:#666;">'
		+'<tr >'
		+'<td rowspan="2" width=50 valign=top align=center ><div style="margin-top:4px;"></div><img width=44  src="'+ImgUrl+'factory/'+chat.Img+'" class=absmiddle alt="'+chat.Name+'" /></td>'
		+'<td width=166 ><div style="margin-top:4px;"></div><font class=CCCCCC><span style="float:right"><img src='+ImgRoot+'images/bottom002.gif height=10 style="cursor:pointer;margin-top:-2px;" onclick="c.__OffWin(\''+name+'\');\"></span>'+lang._js_js._common._label711+'</font><b class=red2>'+chat.Name.replace(''+lang._js_js._common._label712+'',''+lang._js_js._common._label710+'')+'</b></td>'
		+'</tr>'
		+'<tr>'
		+"<td ><a href=\"javascript:void(0)\" onclick=\"c.__OnSend('ajax_action.php?action=thingcompanysreadone&companyid="+chat.CompanyId+"','',c.__func_comm_list,'thingcompanysreadone');\"  class=chatcom>"+chat.CompanyName+"<br><font class=CCCCCC>("+chat.IndustryName+")</a></td>"
		+'</tr>'
		+'<tr>'
		+'<td colspan="2" style="padding-left:6px;height:30px"><table width=100%  cellspacing=0  ><tr><td width=45><font class=CCCCCC>'+lang._js_js._common._label713+'</font></td><td width=* class=yellow2 align=left >'+(chat.Effect?chat.Effect:lang._js_js._common._label715)+'</td></table>'
		+'</tr>'
		+'<tr>'
		+'<td colspan="2" style="padding-left:6px;height:30px"><table width=100%  cellspacing=0  ><tr><td valign=top width=45><font class=CCCCCC>'+lang._js_js._common._label714+'</font></td><td width=* class=yellow2 align=left>'+(chat.Description?chat.Description:lang._js_js._common._label715)+'</td></table>'
		+'</tr>'
		+'</table>'
		return s;

	};
	this.__SpyMachine_Tpl = function(o){
		if (o != null && o != ""){ if (typeof o == 'string'){ eval(o);}}
		s="<table width=100% class=tborder  cellspacing=0  >";
		s+="<tr class=tabletop><td><span>"+lang._js_js._common._label716+"</span>"+lang._js_js._common._label717+"</td></tr>";
		s+="<tr><td><span class=tdbg1>"+lang._js_js._common._label718+":</span>"+o+"</td></tr>";
		s+="<tr><td align=right><br><br><br><br><br><span class=\'btn_normal\'><button onclick=\"c.__back();return false;;\"  >"+lang._js_js._common._label720+"</button></span></td></tr>";
		s+="</table>";
		return s;
	};


	this.__SelectYmd_Tpl = function (o,url) {
		var s="";
		this.__loadJs(ImgRoot+'js/select.js');
		s+="<form name=theform id=theform style='margin:0;padding:0;'>";
		s+="<table width=100% class=tborder  cellspacing=0>";
		s+='<tr><td class=tdbg1 width=25%><select id="yearSo" name="yearSo" tabindex="1" class=selectHid>';
		s+='<option value="0" >'+lang._js_js._common._label721+'</option>';
		for( i in o.year){
			sel = (o.yearSo==o.year[i])?'selected':'';
			s+='<option value="'+o.year[i]+'" '+sel+'>'+lang._js_js._common._label724+''+o.year[i]+'</option>';
			sel ='';
		}
		s+='</select></td><td class=tdbg1 width=25%><select id="monthSo" name="monthSo" tabindex="2" class=selectHid>';
		s+='<option value="0" >'+lang._js_js._common._label722+'</option>';
		for( i in o.month){
			sel = (o.monthSo==o.month[i])?'selected':''
			s+='<option value="'+o.month[i]+'" '+sel+'>'+lang._js_js._common._label725+''+o.month[i]+'</option>';
			sel ='';
		}
		s+='</select></td><td class=tdbg1 width=25%><select id="daySo" name="daySo" tabindex="3" class=selectHid>';
		s+='<option>'+lang._js_js._common._label719+'</option>';
		for( i in o.day){
			sel = (o.daySo==o.day[i])?'selected':'';
			s+='<option value="'+o.day[i]+'" '+sel+'>'+lang._js_js._common._label726+o.day[i]+'</option>';
			sel ='';
		}
		s+='</select></td>';
		s+="<td style='text-align:right;' width=25%><span class=\'btn_normal\'><button type=button name=button1 onclick=\""+url+"\"  >"+lang._js_js._common._label723+"</button></span></td>"
		s+="</tr></table></form>";
		setTimeout("loadSelect(c._$('yearSo'))",500);
		setTimeout("loadSelect(c._$('monthSo'))",500);
		setTimeout("loadSelect(c._$('daySo'))",500);
		return s;

	};

	this.__Upgrade_Tpl = function (o,u1,u2,u3) {
		var getIntro='',s='';
		s+="<table width=100%  cellspacing=0 ><tr><td class=tableheight valign=top>"
		s+="<table width=100% class=tborder  cellspacing=0  >"
		s+="<tr class=tabletop><td colspan=2>"+this._sellTitle+"</td></tr>"
		s+="<tr><td width=100% colspan=2>"+this._getIntro+"</td></tr>"
		s+="<tr ><td colspan=2><br>"
		s+='<table width=100% class=tborder  cellspacing=0  ><tr class=tdbg1>'
		s+='</td><td width=100% align=center>'
		s+=this.__CreateGuage_Tpl()
		s+="</td></tr>"
		s+="<tr height=35><td align=center><span class=\'btn_normal\'><button type=button name=button1 onclick=\"c.__OnSend('"+u1+"','',c.__func_comm_list,'"+u2+"','"+u3+"');\" >"+lang._js_js._common._label727+"</button></span><br><br>"
		s+="<tr><td width=100% >";
		s+=this._sellcontent+"<br>";
		s+="</td></tr>"
		s+='<tr><td class=tdbg1><br>'+lang._thing._thingshopsupgrade._label11+':</td></tr>';
		s+=this._nextLevel;
		s+='</table>'
		s+="</td></tr></table>"
		s+="</td></tr><tr><td align=right height=35>"
		s+=" <span class=\'btn_normal\'><button  onclick=\"javascript:c.__back();return false;\">"+lang._comm._return+"</button></span>&nbsp;"
		s+="</td><tr></table>"
		return s;
	};

	this.__Accelorate_Tpl_Policy = function(obj,act){
		var s="";
		var o = obj.Title;
		var content = (obj.content!=null?obj.content:"");
		c._sellStart=6;

		s+="<table width=100%  cellspacing=0 ><tr><td class=tableheight valign=top>"

		s+="<table width=100% class=tborder  cellspacing=0  >"
		s+="<tr class=tabletop><td >"+o+"</td></tr>";
		s+="<tr><td></td></tr>"
		s+="<tr><td>"
		s+="<table width=100% class=tborder  cellspacing=0  >"
		s+="<tr><td class=tdbg1 width=100% align=center>"+this.__CreateGuage_Tpl()+"</td></tr>"
		var gold = (Math.ceil((this._sellEndTime-this._sellBegTime)/1800));
		var getgold = (gold > 0 && gold!='NaN')?(gold * 2):2;
		this._refUrl ="QueryEvent('action=Agent&doaction=UserPolicy&UseGoldForTime="+getgold+"&PolicyId="+this._UserPolicyId+"&ToShopId="+this._ToShopId+"&ToUserId="+this._ToUserId+"',ServerHost+'task.php');";
		s+="</td></tr>";
		s+="<tr><td class=tdbg1 width=100% align=center style='border-bottom: 1px solid #6A4201;'></td></tr>";
		s+="<tr ><td  width=100% ><div class=thingjob >";
		s+=content+"<br>";
		s+="</div></td></tr>"
		s+="</table>";
		s+="</td></tr>";
		s+="</table>";

		s+="</td></tr><tr><td align=right height=35>";
		s+=" <span class=\'btn_normal\'><button id='accms1' name=button1 onclick=\"QueryEvent('action=Agent&doaction=UserPolicy&UseGoldForTime='+c._$('accPolicy_UseCoins').value+'&PolicyId="+this._UserPolicyId+"&ToShopId="+this._ToShopId+"&ToUserId="+this._ToUserId+"&getgold="+getgold+"',ServerHost+'task.php');\"   style='display:none'>"+lang._comm._ok+"</button></span>&nbsp;"
		if(act==1290)
		s+="<span class=\'btn_normal\'><button   onclick=\"c.__OnSend('ajax_action.php?action=employeedig&ToUserId="+obj.ShopId+"','',c.__func_comm_list,'employeedig');\">"+lang._comm._return+"</button></span>&nbsp;";
		else if(act==1291)
		s+="<span class=\'btn_normal\'><button   onclick=\"c.__OnSend('ajax_action.php?action=ShopRead&MapId="+obj.ShopId+"','',c.__func_comm_list,'ShopRead','','ShopRead');\">"+lang._comm._return+"</button></span>&nbsp;";
		else
		s+="<span class=\'btn_normal\'><button   onclick=\"c.__OnSend('ajax_action.php?action=thingshopspolicy','',c.__func_comm_list,'thingshopspolicy');\">"+lang._comm._return+"</button></span>&nbsp;";
		s+="</td><tr></table>";
		return s;

	};

	this.__Accelorate_Tpl = function(o){


		this._sellBegTime = 0;
		this._sellEndTime = 86400;
		this._systemTime =  86400;

		s= "<table width=100% class=tborder  cellspacing=0  >"
		s+="<tr class=tabletop><td colspan=2>"+lang._js_js._common._label729+"</td></tr>"
		s+="<tr ><td  colspan=2><br>"
		s+="<table width=100% class=tborder  cellspacing=0 ><tr><td width=100% align=center>"
		s+=this.__CreateGuage_Tpl();
		s+="</td></tr>"
		s+="<tr height=35><td align=center><span class=\'btn_normal\'><button type=button name=button1 onclick=\"showDisplay('ShowMainbar')\" ;  >"+lang._js_js._common._label727+"</button></span><br>"
		s+="</td></tr>";
		s+="<tr height=50><td align=center id=\"ShowMainbar\" style=\"display:none;\">"
		s+= this.__CreateBar_Tpl("mainbar");
		s+="</td></tr></table>"
		var gold = (Math.ceil((c._sellEndTime-c._sellBegTime)/3600));
		var getgold = (gold > 0 && gold!='NaN')?gold:1;
		setTimeout("bar_init('mainbar',180,140,6,10,11,5,1,0,"+getgold+");",100);
		s+="</td></tr></table>";
		return s;
	};
	this._setIntervalName;
	this.__CreateGuage_Tpl = function () {
		this.__loadJs(ImgRoot+'js/viewGuage.js');
		var s="";
		s='<div style="width:237px">'
		+'<div class="proleft"></div>'
		+'	<div id="ProgressBar">'
		+'		<div id="Lable">0%</div>'
		+'		<div id="timeTag"></div>'
		+'		<div id="Pointer" style="width:0%"></div>'
		+'	</div>'
		+'<div id="proright" class="proright"></div>'
		+'</div><br>';

		setTimeout("activeTime_new('"+this._action+"','"+this.action_prowse+"');",100);
		return s;
	};
	this.__CancelCofoGuaye = function(s){
		/*c.__Confirm('',"您确定取消当前商会升级吗?<br>注:取消升级后所有费用将不返还！</font>","c.__OnSend('ajax_union.php?action=UnionCancelGrade','',c.__func_comm_list,'UnionCancelGrade');");*/
		c.__Confirm('',lang._js_js._common._label730,"c.__OnSend(1);");

	};

	this.__timeFormat=function (time){
			var Hour = Math.floor(time/3600);
			var Minute = Math.floor((time - Hour*3600)/60);
			var Second = time - Hour*3600 - Minute*60;
			var HourStr = '';
			var MinuteStr = '';
			var SecondStr = '';
			if(Hour>0) HourStr = Hour+lang._comm._hour;
			if(Minute>0) MinuteStr = Minute+lang._comm._minute;
			if(Second>0) SecondStr = Second+lang._comm._second;
			var Time = HourStr + MinuteStr + SecondStr;

			return Time;
	}

	this.__getBrickNum = function (){
		var brickNum = document.getElementById('brick').value;
		c.__brickNum = brickNum;
		c.__speedingTime = c.__timeFormat(c.__speedTimeSecond * brickNum);


		if(c.__brickNum > 0){
			if(c.__setSpeeding == 1){
				document.getElementById('speeding').disabled = false;
				document.getElementById('totalSpeedingTime').innerHTML = c.__speedingTime;
			}
		}else if(c.__brickNum == 0){
			document.getElementById('speeding').disabled = true;
			document.getElementById('speeding').style.cursor = 'pointer';
			document.getElementById('totalSpeedingTime').innerHTML = c.__speedingTime;
		}
		//alert(c.__brickNum+'++'+c.__speedingTime);
	}

	this.__CommGuage_Tpl = function(type) {
	var s = "";

	s += "<table width=100%  cellspacing=0><tr><td class=tableheight valign=top>";
	s += "<table width=100% class=tborder  cellspacing=0  >"
	if (c._sellBegTime != 'undefined' && c._sellBegTime != null) {
		s += "<tr class=tabletop><td><span>" + lang._js_js._common._label735 + "</span>" + c._sellTitle + "</td></tr>";
		s += "<tr><td ></td></tr>";
		s += "<tr><td class=tdbg1 width=100% align=center>" + this.__CreateGuage_Tpl() + "</td></tr>"

		if (typeof c.__setSpeeding != 'undefined' && !c._Accerurl && type == 'cofcSpeeding') {
			s += "<tr><td width=100% align=center>" + lang._js_js._common._label730 + "<span class='yellow2'> 1 </span>" + lang._js_js._common._label739 + "<span class='yellow2'> " + c.__speedTimeSecondStr + " </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + lang._js_js._common._label740 + "<span class='yellow2'>" + c._leftBrick + "</span>" + lang._js_js._common._label759 + "</td></tr>"
		}

		var operbutstr = "<table width='100%' cellspacing='0'><tr>";

		if (typeof c.__setSpeeding != 'undefined' && !c._Accerurl && type == 'cofcSpeeding') {
			operbutstr += "<td width='40' align='right'>" + lang._js_js._common._label756 + "</td><td width='60'><INPUT TYPE=text name='brick' id='brick' value='1' onkeyup=\"this.value=this.value.replace(/[^0-9]/g,'');\"  onchange='__CodeLimit(this,32);' maxlength='6'/></td><td width='250' align='left'>" + lang._js_js._common._label754 + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + lang._js_js._common._label742 + "<span id='totalSpeedingTime' class='yellow2' style='width:240px;font-weight:bold'></span></td></tr><tr><td colspan='3' align='center'>";

			operbutstr += "<span class=\'btn_normal\'><button type=button name=button1 style='cursor:pointer;' id=speeding onclick=\"javascript:c.__Confirm('','"+lang._js_js._common._label743+"'+c.__brickNum+'"+lang._js_js._common._label731+"'+c.__speedingTime +'"+'?</font>'+"','c.__OnSend(\\\'ajax_union.php?action=UnionGrade&speeding=1&GradeType='+c.__GradeType+'&UCofcId='+c.__UCofcId+'&brickNum='+c.__brickNum+'\\\',\\\'\\\',c.__func_comm_list,\\\'UnionUpgrade\\\',1);');\"   disabled>" + lang._js_js._common._label744 + "</button></span>";
			setInterval("c.__getBrickNum()", 300);
		} else {
			operbutstr += "<td align='center'>";
		}

		if (c._Accerurl) {
			operbutstr += "<span class=\'btn_normal\'><button     onclick=\"" + c._Accerurl + "\" >" + lang._js_js._common._label746 + "</button></span>";
		}

		if (typeof c.__setCancelGuaye == 'function') {
			operbutstr += "<span class=\'btn_normal\'><button type=button name=button1 onclick=\"javascript:c.__Confirm('','" + lang._js_js._common._label733 + "<br>" + lang._js_js._common._label732 + "</font>','c.__OnSend(\\\'ajax_union.php?action=UnionCancelGrade&UCofcId=" + this._cofc_id + "\\\',\\\'\\\',c.__func_comm_list,\\\'UnionCancelGrade\\\');');\"   >" + lang._js_js._common._label745 + "</button></span></td>";
		}

		operbutstr += "</tr></table>";

		if (operbutstr != '') {
			s += '<tr height=35><td align=center>' + operbutstr + '</td></tr>';
		}
		c._Accerurl = '';
		if (typeof(c._sellContents) != "undefined" && c._sellContents != null) {

			s += "<tr class=tabletop><td ></td></tr>";
			s += "<tr><td  width=100% ><div class=thingjob >";
			s += c._sellContents;
			s += "</div></td></tr>";

		}
	} else {
		s += "<tr><td align=center><b class=oncon>" + lang._js_js._common._label747 + "</b></td></tr>"
	}
	s += "</table>";
	if (typeof(c._sellBrakUrl) == "undefined" || c._sellBrakUrl == null) {
		c._sellBrakUrl = "c.__back();return false;";
	}
	s += "</td></tr><tr><td align=right height=35>";
	s += " <span class=\'btn_normal\'><button     onclick=\"" + c._sellBrakUrl + "\" >" + lang._comm._return + "</button></span>&nbsp;";
	s += "</td><tr></table>";
	return s;
}

this.__TravelGuage_Tpl = function() {
	var s = "";

	s += "<table width=100%  cellspacing=0 >"
	if (c._sellBegTime != 'undefined' && c._sellBegTime != null) {
		s += "<tr><td ></td></tr>";
		s += "<tr><td class=tdbg1 width=100% align=center>" + this.__CreateGuage_Tpl() + "</td></tr>"

		if (typeof(c._sellContents) != "undefined" && c._sellContents != null) {

			s += "<tr class=tabletop><td ></td></tr>";
			s += "<tr><td  width=100% ><div class=thingjob >";
			s += c._sellContents;
			s += "</div></td></tr>";

		}
	} else {
		s += "<tr><td align=center><b class=oncon>" + lang._js_js._common._label747 + "</b></td></tr>"
	}
	s += "</table>";
	return s;
}

this.__LandStorm_Tpl = function(funStr) {
	var s = "";

	s += "<table width=100%  cellspacing=0><tr><td class=tableheight valign=top>";
	s += "<table width=100% class=tborder  cellspacing=0  >"
	if (c._sellBegTime != 'undefined' && c._sellBegTime != null) {
		s += "<tr class=tabletop><td><span>" + lang._js_js._common._label735 + "</span>" + c._sellTitle + "</td></tr>";
		s += "<tr><td ></td></tr>";
		s += "<tr><td class=tdbg1 width=100% align=center>" + this.__CreateGuage_Tpl() + "</td></tr>"
		if (typeof(c._sellContents) != "undefined" && c._sellContents != null) {

			s += "<tr class=tabletop><td ></td></tr>";
			s += "<tr><td  width=100% ><div class=thingjob style='height:200px;'>";
			s += c._sellContents;
			s += "</div></td></tr>";

		}
	} else {
		s += "<tr><td align=center><b class=oncon>" + lang._js_js._common._label747 + "</b></td></tr>"
	}
	s += "</table>";
	if (typeof(c._sellBrakUrl) == "undefined" || c._sellBrakUrl == null) {
		c._sellBrakUrl = "c.__back();return false;";
	}
	s += "</td></tr><tr><td align=right height=35>";
	s += " <span class=\'btn_normal\'><button     onclick=\"c.__OnSend('ajax_action.php?action=landStorm_" + funStr + "&Id=" + c._landStormId + "','',c.__func_comm_list,'landStorm',2)\" >" + lang._js_js._common._label748 + "</button></span>&nbsp;";
	s += " <span class=\'btn_normal\'><button     onclick=\"" + c._sellBrakUrl + "\" >" + lang._comm._return + "</button></span>&nbsp;";
	s += "</td><tr></table>";
	return s;
}
this.__CreateBar_Tpl = function(slider) {
	this.__loadJs(ImgRoot + 'js/bar.js');
	var s = ""; //66cd00,#99FF00
	s = "<input id=" + slider + "_UseCoins type=hidden><input id=" + slider + "_coins type=hidden><input id=" + slider + "_param type=hidden><div id=" + slider + "_bar style='width=191;height=21;background-image:url(" + ImgRoot + "images/barbg.gif); background-repeat:none;position:absolute;cursor:pointer;'  onMouseUp=bar_OnMouseUp(this) onClick=bar_OnClick('" + slider + "',event)>&nbsp;</div><div id=" + slider + "_fil style='width=0;height=4px; background-Color:#99FF00;overflow:hidden;position:absolute;cursor:pointer;margin-top:2px;'  onMouseUp=bar_OnMouseUp(this) onClick=bar_OnClick('" + slider + "',event)>&nbsp;</div><div id=" + slider + " style='width=13;height=21;margin-top:-8px;position:absolute;cursor:pointer;' onMouseDown=bar_OnMouseDown('" + slider + "',event) onMouseUp=bar_OnMouseUp(this)><img id=" + slider + "_imgb src='" + ImgRoot + "images/barbutton.gif' style=\"width:100%;height:100%;cursor:pointer;z-Index:99999999;\" /></div><div class='sliderbarvalue' id='" + slider + "_Value_box'><div id='" + slider + "_Value'  ></div></div>"; //
	return s;
};
this.__JsGuage_Tpl = function(o, act) {
	if (this._pToShopId == null) this._pToShopId = 0;
	if (this._pToUserId == null) this._pToUserId = 0;
	if (this._pToShopName == null) this._pToShopName = '';
	var s = "";
	if (typeof(o) == "object") {
		var Title = o.Title;
		var acceBar = true;
		var PurchaseShopId = o.ShopId;
	} else {
		var Title = o;
		var acceBar = false;
		var PurchaseShopId = 0;
	}

	if (act != null && act == 126) {
		url = "c.__OnSend('ajax_action.php?action=thing6','',c.__func_comm_list,'thing6')";
	} else if (act != null && act == 127) { //handle by js lang lib
		url = "c.__OnSend('ajax_action.php?action=thing2','',c.__func_comm_list,'thing2')";
	} else if (act != null && act == 129) {
		url = "c.__OnSend('ajax_action.php?action=thingshopspolicy&ToShopId=" + this._pToShopId + "&ToUserId=" + this._pToUserId + "&ToShopName=" + this._pToShopName + "','',c.__func_comm_list,'thingshopspolicy');";
	} else if (act != null && act == 130) {
		c._sellStart = 21;
		url = "c.__OnSend('ajax_action.php?action=factoryShow','',c.__func_comm_list,'factoryShow');";
	} else if (act != null && act == 131) {
		c._sellStart = 20;
		url = "c.__OnSend('ajax_action.php?action=thing6','',c.__func_comm_list,'thing6');";
	} else if (act != null && act == 132) {
		c._UseCoins = 1;
		url = "c.__OnSend('ajax_action.php?action=thing6','',c.__func_comm_list,'thing6');";
	} else {
		url = "c.__back(-2)";
	}
	s += "<table width=100%  cellspacing=0><tr><td class=tableheight valign=top>";
	s += "<table width=100% class=tborder  cellspacing=0  >";
	s += "<tr class=tabletop><td><span>*" + lang._js_js._common._label734 + "</span>" + Title + "</td></tr>";
	s += "<tr><td ></td></tr>";
	s += "<tr><td class=tdbg1 width=100% align=center>" + c.__CreateGuage_Tpl() + "</td></tr>";
	s += "<tr><td class=tdbg1 width=100% align=center>"

	if (act == 127) {
		s += " <span class=\'btn_normal\'><button   onclick=\"c._refUrl=\'QueryEvent(\\\'action=Agent&doaction=AccerPurchase&ShopId=" + PurchaseShopId + "\\\',ServerHost+\\\'task.php\\\');\';c.__MainMsg('" + lang._js_js._common._label741 + "<b class=allcoin>3</b>" + lang._js_js._common._label755 + "?',1,111,'"+lang._js_js._common._label749+"');\">" + lang._js_js._common._label758 + "</button></span>&nbsp;";
		s += " <span class=\'btn_normal\'><button   onclick=\"c._refUrl=\'QueryEvent(\\\'action=Agent&doaction=CancelPurchase&ShopId=" + PurchaseShopId + "\\\',ServerHost+\\\'task.php\\\');\';c.__MainMsg('" + lang._js_js._common._label737 + "," + lang._js_js._common._label738 + "," + lang._js_js._common._label736 + "',1,111,'"+lang._js_js._common._label750+"');\">" + lang._js_js._common._label751 + "</button></span>&nbsp;";
	} else if (act == 130) {
		if (PurchaseShopId == 1) {
			s += "<span class=\'btn_normal\'><button type=button name='button1' id='button1'   onclick=\"c._refUrl=\'QueryEvent(\\\'action=Factory&doaction=StopGen&Type=Good\\\',ServerHost+\\\'task.php\\\');\';c.__MainMsg('"+lang._js_js._common._label728+"',1,111,'"+lang._js_js._common._label752+"');\">"+lang._js_js._common._label824+"</button></span>";
		} else {
			s += "<span class=\'btn_normal\'><button type=button name='button1' id='button1'   onclick=\"c._refUrl=\'QueryEvent(\\\'action=Factory&doaction=StopGen&Type=Graphic\\\',ServerHost+\\\'task.php\\\');\';c.__MainMsg('"+lang._js_js._common._label729+"',1,111,'"+lang._js_js._common._label752+"');\">"+lang._js_js._common._label824+"</button></span>";
		}
		c._sellStart = 21;
	} else if (act == 129) {
		s += " <span class=\'btn_normal\'><button   onclick=\"c._refUrl=\'QueryEvent(\\\'action=Agent&doaction=MakePolicy&CallBack=1&UseGold=" + PurchaseShopId + "\\\',ServerHost+\\\'task.php\\\');\';c.__MainMsg('" + lang._js_js._common._label741 + "<b class=allcoin>" + PurchaseShopId + "</b>" + lang._js_js._common._label755 + "?',1,111,'"+lang._js_js._common._label753+"');\">" + lang._js_js._common._label753 + "</button></span>";
	}
	s += "</td></tr>"

	s += "<tr class=tabletop><td ></td></tr>";
	s += "<tr><td  width=100% ><div class=thingjob >";

	if (acceBar == true) s += o.content + "<br>";
	s += "</div></td></tr>";
	s += "</table>";
	s += "<tr><td align=right height=35>";

	s += " <span class=\'btn_normal\'><button   onclick=\"" + url + "\">" + lang._comm._return + "</button></span>&nbsp;";
	s += "</td><tr></table>";
	return s;
}

	this.__Stock= function (o,g_name){
		var s="";
		s+='<iframe id="ifrStock" align="left" width="637" height="400" marginwidth="0" marginheight="0" src="./stock.php" frameborder="0" scrolling="no"  allowTransparency="true"></iframe>'
		return s;
	};
	this.__DayNews= function (o,g_name){
		var s="";
		s+='<iframe align="left" width="637" height="400" marginwidth="0" marginheight="0" src="./ribao.php" frameborder="0" scrolling="no"  allowTransparency="true"></iframe>'
		return s;
	};
	this.__MenuChild_Tpl= function (o,g_name){
		var s="";
		switch(this._action){
			//alert(this._action);
			case 'charabasic'://基本信息
			case 'charanickname'://称号
			case 'charagoods'://物品
			case 'treasurekursaal'://实验瓶开大奖
			case 'charafortune'://财富
			case 'characard'://名片夹
			case 'characardexchange'://互动
			case 'chararead'://查看人物
			case 'email'://短信箱
			case 'invest1'://投资人信息
			case 'invest2'://信赖度
			case 'invest3'://任务
			case 'charity': //慈善捐款
			case 'charastory'://传奇经历
			case 'sec3'://事件簿
			case 'secnote'://公告版
			case 'secnews'://事件薄
			case 'thingcompanycourse'://查看公司里程碑
			case 'thingshopsevent'://店铺事件
			case 'charaBatchPercent':	//批量修改属性
			case 'charauserask':	//玩家提问
			case 'shopPointAccer':	//店铺升级点加速
			case 'logonreward':  //每日登录奖励
			case 'multiselect':	 //批量使用道具
			case 'newactivity'://中心广场
			case 'resetcarname'://座架命名
			case 'questionnaire':    //调研问卷
			return chara_Tpl(o);
			break;
			case 'wonbto':  //赢在大亨
			case 'wonbtoempshow':
			case 'wonbtocampaign':
			case 'wonbtofreedom':
			case 'wonbtovs':
			case 'wonbtopromotion':
			case 'wonbtoscrore':
			case 'wonbtoaward':
			case 'wonbtotest':
			case 'wonbtotestTable':
			case 'wonbtosendword':
			case 'wonbtoVsCross':
			case 'wonbtoVsCrossTop':
			case 'wonbtoVsCrossList':
			case 'wonbtoVsCrossVs':
			case 'wonbtoVsCrossVsShow':

			return wonbto_Tpl(o);
			break;
			case 'factorystoreroom'://我的仓库
			case 'factoryCreate':
			case 'factoryShow':
			case 'factoryGoodRoom':
			case 'factoryUpgrade':
			case 'factoryRead':
			return factory_Tpl(o);
			break;
			case 'buildingCreate':
			case 'buildingShow':
			case 'buildingUpgrade':
			case 'buildingChangePoint':
			case 'buildingDepUpgrade':
			case 'buildingCreateDep':
			case 'buildingShowOther':
			return building_Tpl(o);
			break;
			case 'composeClub':
			case 'composeVehicle':
			case 'composeTempVehicle':
			case 'composeComVehicle':
			case 'composeSetName':
			case 'compComSetName':
			case 'composeMedal':
			case 'composeFashion':
			return compose_Tpl(o);
			break;
			case 'oilFieldCreate':
			case 'oilFieldSurvey':
			case 'oilFieldTotal':
			case 'oilFieldRefineryShow':
			case 'oilFieldRefineryRead':
			case 'oilFieldAttack':
			case 'oilFieldShow':
			case 'oilFieldMapSort':
			case 'oilFieldCommonMaint':
			case 'oilFieldRefinery':
			case 'oilFieldCreateRefinery':
			case 'oilFieldRefineryProduct':
			case 'oilFieldRefineryUpgrade':
			case 'oilFieldProductShow':
			case 'oilFieldSurveying':
			return oilField_Tpl(o);
			break;

			case 'goldvipMsg':
			case 'goldvipinviteletter':
			case 'goldvipMessage':
			return goldvip_Tpl(o);
			break;
			case 'assistTake':       //金牌小秘书
			return GoodSecretary_Tpl(o);
			break;
			case 'market_account'://市场统计
			case 'market_fill'://市场出售
			case 'market_seek'://市场收购
			case 'market_mySeek'://我要收购
			case 'market_mySale'://我的出售
			case 'market_myBuy'://我的收购
			case 'market_doubt'://可疑交易
			return market_Tpl(o);
			break;
			case 'market2'://交易市场
			case 'market3'://交易市场
			case 'thing1'://公司基本信息
			case 'thingstructure'://公司架构
			case 'thingcompanysreadone'://查看单个公司信息
			case 'thingcompanysread'://公司列表
			case 'thingleagueread'://合作公司列表
			case 'thingcompanyshops'://旗下店铺
			case 'thing2'://店铺列表
			case 'thingupgrade':
			case 'thingshopsupgrade'://店铺升级
			case 'thingcompete'://竞争对手
			case 'thingshopspolicy'://使用策略
			case 'thingshopsemployee'://员工
			case 'thing3'://员工列表
			case 'thing4'://招聘员工
			case 'recruit'://招聘会
			case 'recruitEmp'://
			case 'thingjob'://常务工作
			case 'thing3one'://查看单个员工
			case 'empfashion'://时装
			case 'thing5'://财务状况
			case 'thing6'://董事会
			case 'thing8'://公司升级
			case 'Purchase':  //采购
			case 'purchaseType':  //批量采购方式,系统或者工厂
			case 'purchaseFactory':  //采购工厂货物
			case 'purchaseOilField':  //采购工厂货物
			case 'thingbankruptcy':
			case 'EmplyeeRead':  //聊天预览玩家员工
			case 'thingEmployeeAdvanced':  //
			case 'thingEmployeeIQ':  //
			case 'charabatchemp':  //批理增加员工属性点
			case 'SAMIBC'://黑衣人
			case 'thingshoppublicize'://店铺宣传
			case 'thingshopClearPlan'://店铺宣传
			return thing_Tpl(o);
			break;


			case 'showcompany':
			if (o != null && o != "" && o != "undefined"){ if (typeof o == 'string'){ eval(o);this._showpage=showpage; this._CurrentPage=CurrentPage;this._leagueinfo=leagueinfo;}}
			if (this._action_prowse==null)
			{
				c._CQId = null;
				this.Confin={name:'MenuChild',contents:o,error:0,width:480,menuaction:'MenuChild',action:'thingcompanysread',action_prowse:1}
				s+= "<a href=\"javascript:void(0)\" onclick=\"c.__OpenHostRight(c.Confin,270)\">"+o[270].CompanyName+"</a>";
			}
			break;

			case 'cofclist'://商会列表
			case 'cofcSearch'://商会查询
			case 'cofcattorn'://会长转让
			case 'cofcsetpower'://商会权限设定
			case 'cofcblock'://工会卡
			case 'cofcnewusercard'://
			case 'cofcdiamondcard'://
			case 'cofcgoldcard'://
			case 'cofcevent'://商会事件薄
			case 'MyUCofc'://查看商会
			case 'UnionOrgan': //附属机构
			case 'UnionSetup'://设定商会
			case 'UnionOffertory'://商会捐款
			case 'UnionOffertoryList'://商会捐款排行
			case 'UOLog'://捐款日志
			case 'GetDefine'://领取补贴
			case 'UnionUpgradeType'://商会升级分类
			case 'UnlayUnion'://解散商会
			case 'UnionCancelGrade':
			case 'cofcpolicy'://议政厅
			case 'applycofc'://创建商会
			case 'UnionUpgrade'://商会升级

			case 'Diplomatism'://外交列表
			case 'ApplyUserList'://商会审核
			case 'buck'://投票处
			case 'placard'://议政厅公告板
			case 'thingpower'://行使权力
			case 'usepower'://
			case 'cofcreport'://
			case 'voteuserlist'://竞选参选和投票
			case 'votekilluserlist'://投票弹劾
			case 'CitySign'://地标s
			case 'cofcGuardUpgrade'://升级警卫队
			case 'cofcUpgradeTrust'://提升公信度
			case 'cofcBatchvote'://提升公信度
			case 'UnionLandStormDrop'://放弃地标
			return cofc_Tpl(o);
			break;
			case 'unionpolicy'://委员会
			return unionpolicy_Tpl(o);
			break;
			case 'userinforead': //预览玩家列表
			case 'citysummarize'://城市概述
			case 'cityvenice'://威尼斯娱乐
			case 'citypiazza'://时代广场
			case 'city1'://住宅区
			case 'city2'://闹市区
			case 'city3'://商业区
			case 'city15'://商业区
			case 'street'://街道
			case 'citymayor'://市长大厦
			case 'citybafeite'://巴菲特
			case 'cityDGS'://DGS传媒集团
			case 'taxis1'://富豪排行
			case 'taxis2'://商业领袖排行榜
			case 'taxis3'://最佳业务排行榜
			case 'taxis4'://公司排行
			case 'taxis5'://最佳雇主排行榜
			case 'taxis6'://最佳雇主排行榜
			case 'taxis7'://我的排行ason
			case 'taxis8'://荣誉榜
			case 'taxis9'://品牌排行
			case 'taxis10'://时尚ceo排行
			case 'taxis11'://公司升级排行
			case 'taxis12'://挖人排行
			case 'taxis13'://商会捐款排行
			case 'taxis14'://NPC积分排行
			case 'FinanceList'://财务明细账
			case 'mayor'://市长信息
			case 'cityboon'://福利社
			case 'citykursaal'://援助贝尔
			case 'cityDonateBook'://捐赠手册信息页
			case 'cityDonateBottle'://捐赠实验瓶信息页
			case 'cityktaskIntro'://援助贝尔--任务介绍
			case 'cityBooklet': //实验手册
			case 'cityBottle': //实验瓶
			case 'cityf500w'://游乐场
			case 'cityFate'://游乐场
			case 'landStorm'://地标
			case 'NPClandStorm'://地标
			case 'NPCMyTable':
			case 'Turist'://旅游
			case 'newhome'://建设中心
			return city_Tpl(o);
			break;
			case 'mediaCenter':
			return mediaCenter_Tpl(o);
			break;
			case 'mediajCenterFinance':       //媒体 - 金融
			return mediaCenterFin_Tpl(o);
			break;
			case 'stockMarket':
			return stockMarket_Tpl(o);
			break;
			case 'sec1'://小秘书信息
			case 'cityB24'://B24广播台
			case 'sendMessage'://世界消息
			return city_now_Tpl(o);
			break;

			case 'active16':
			case 'active16change':
			return city_active16_Tpl(o);
			break;
			case 'searchcompanys'://查看公司
			case 'searchcompanys0': //使用策略
			case 'shop4'://商城--道具中心
			case 'shopbuypage': //捐赠材料购买页面
			case 'shopVipInviteLetter'://商城--道具中心
			case 'shop2'://商城-- Xu充值
			case 'shop5'://商城--消费历史纪录查询[30天]
			case 'shopcar'://极速车行
			case 'shophirecar'://座驾租用
			case 'shopmycar'://我的座驾
			case 'shophouse'://巨力房产
			case 'shopmyhouse'://我的住宅
			case 'shopgoldchange': // Xu兑换
			case 'shoppointchange': // Xu兑换
			case 'shopfull': //店铺总览图
			case 'shopthrone': //实验瓶排行
			case 'shopmeigui': //鲜花排行
			case 'shopFadRefine': //时尚精英榜
			case 'shopBike': //车神排行榜
			case 'VipGetDefine': //VIP奖励
			case 'pointchange': //属性点转换
			case 'shopCleanliness': //清洁店铺
			case 'shopFashion':  //购买页面 by Manson [09-08-17]
			case 'showFashionList':  //时装列表 by Manson [09-08-17]
			case 'showFashionList_display':  //时装物品详细 by Manson [09-08-21]
			case 'showFashionListLot':  //时装物品批量 by Manson [09-08-21]
			case 'showFashionListGift':  //时装物品赠送
			case 'fashionLotBuyList':        //批量购买列表
			case 'shopMystery':

			return shop_Tpl(o);
			break;

			case 'jobnewflow'://新手说明
			case 'jobxms'://小秘书安排工作
			case 'jobconst'://常务工作
			case 'jobtask'://常务工作

			return job_Tpl(o);
			break;

			case 'employeebuild'://进修
			case 'employeecommunicate'://沟通
			case 'employeejob'://员工常务工作
			case 'empshowfulljob'://所有员工常务工作
			case 'employeefull'://员工总览图
			case 'employeeelevate'://提拔员工
			case 'employeedig'://挖人
			case 'thinghunt'://猎头库
			case 'empshowfullgoutong'://批量沟通
			case 'thingfireemployee'://批量解雇员工
			case 'employeecommuLot'://批量奖励
			case 'employeeDivide'://员工分组
			case 'employeeDivideNew'://员工新建分组
			return employee_Tpl(o);
			break;
			case 'NewUserFlow'://新手流程
			case 'characreate'://创建人物
			case 'characreatequick'://简易创建人物
			case 'secCreate'://选择创建小秘书
			case 'charaInfoEdit'://人物信息更改
			return once_Tpl(o);
			break;

			case 'shop1'://商城--我的财富
			s+="<table width=100% class=tborder  cellspacing=0  >";
			s+="<tr><td><img src="+ImgRoot+"images/stock.jpg ></td></tr>";
			s+="</table>";
			window.open("stock/stock.php");

			break;

			case 'LoginInfo':
				//登录提示页面
				s += "<table width=100% class=tborder  cellspacing=0  >";
				s += "<tr class=tabletop><td colspan=4>" + lang._js_js._common._label767 + "</td></tr>";
				s += "<tr><td  width='12%' align=center valign=top class=tdbg1>" + lang._js_js._common._label798 + ":</td><td width='*' colspan=3 class=tdbg2>" + lang._js_js._common._label780 + "<a href=\"javascript:void(0)\" onclick=\"c.__OnSend('ajax_action.php?action=email_inceptread&mailtype=0','',c.__func_comm_list,'email',12);\"><span class=maize  style='position:relative;z-index:999999999;'>" + o.MagNew + "</span></a>" + lang._js_js._common._label781 + "<a href=\"javascript:void(0)\" onclick=\"c.__OnSend('ajax_action.php?action=sec3&doaction=UnRead','',c.__func_comm_list,'sec3');\" ><span class=maize>" + o.SecNew + "</span></a>" + lang._js_js._common._label775 + "</b></td></tr>";
				s += "<tr ><td colspan=4 height=2> </td></tr>";
				s += "<tr><td align=center valign=top class=tdbg1 width=15%>" + lang._js_js._common._label799 + ":</td><td class=tdbg2 width=35% rowspan=3 valign=top style='padding-top:2px'>";
				if (o.TaskList != '' && o.TaskList != null) {
					for (i in o.TaskList) {
						s += "<b class=allname>" + o.TaskList[i].Title + "</b> <span class=coffee>" + o.TaskList[i].State + "</span><br>";
					}
				} else {
					s += "" + lang._js_js._common._label800 + "<br>";
				}

				s += "</td><td class=tdbg1 width=18%>" + lang._js_js._common._label801 + ":</td><td width=35% class=allcoin>" + o.YesterdayIncome + " G</td></tr>";
				s += "<tr><td align=center class=tdbg1></td><td class=tdbg1>" + lang._js_js._common._label802 + ":</td><td width='*' class=allcoin>" + o.TodayIncome + " G</td></tr>";
				s += "<tr><td></td><td></td><td></td></tr>";
				s += "<tr><td align=center class=tdbg1>" + lang._js_js._common._label803 + ":</td><td class=tdbg2 >" + lang._js_js._common._label795 + "<span class=allcoin>" + o.ShopNums + "</span>" + lang._js_js._common._label817 + "</td>";
				s += "<td  class=tdbg1>" + lang._js_js._common._label804 + ":</td><td class=tdbg2><a href=\"javascript:void(0)\" onclick=\"om.mainmenuchild('market');c.__OnSend('ajax_action.php?action=market_fill','',c.__func_comm_list,'market_fill');\">" + lang._js_js._common._label805 + "</a></td>";
				s += "</tr>";
				s += "<tr><td></td><td class=tdbg2 colspan=3>" + lang._js_js._common._label796 + "<span class=allcoin>" + o.Employees + "</span>" + lang._js_js._common._label818 + "</td></tr>";
				s += "<tr><td></td><td class=tdbg2 colspan=3>" + lang._js_js._common._label797 + "<span class=allcoin>" + o.Assets + "</span> G</td></tr>";
				s += "<tr><td colspan=4><table cellspacing=0   width=100%><tr><td colspan='3' align=right style=\"\"><br><br><button onclick=\"c.__OnSend('ajax_action.php?action=shopfull',this.form,c.__func_comm_list,'shopfull');\"   >" + lang._js_js._common._label787 + "</button><button onclick=\"c.__OnSend('ajax_action.php?action=employeefull',this.form,c.__func_comm_list,'employeefull');\"  >" + lang._js_js._common._label788 + "</button></td></tr></table></td></tr>";
				s += "<tr><td  colspan=3 class=coffee>*" + lang._js_js._common._label768 + "" + o.LoginStartTime + "</td><td align=right></td></tr>";
				s += "</table>";
				break;

			case 'setup1':
				//设置-密码设置
				s += "<table width=100% class=tborder  cellspacing=0  >";
				s += "<form name=theform id=theform><tr class=tabletop><td colspan=3><span>*&nbsp;&nbsp;" + lang._js_js._common._label763 + "</span>" + lang._js_js._common._label806 + "</td></tr>";
				s += "<tr><td colspan=2><br>" + lang._js_js._common._label761 + "<br><br></td></tr>";
				s += "<tr><td align=right class=tdbg1 width='20%' >" + lang._js_js._common._label807 + "</td><td  width='45%' class=tdbg2><div class=inputbox><INPUT type=password name=oldpsw id=oldpsw ></div></td><td  width='35%' class=tdbg2>*&nbsp;" + lang._js_js._common._label765 + "</td></tr>";
				s += "<tr><td align=right class=tdbg1>" + lang._js_js._common._label808 + "</td><td width='*' class=tdbg2><div class=inputbox><INPUT type=password name=psw id=psw ></div></td><td class=tdbg2>*&nbsp;" + lang._js_js._common._label784 + "</td></tr>";
				s += "<tr><td align=right class=tdbg1>" + lang._js_js._common._label789 + "</td><td width='*' class=tdbg2><div class=inputbox><INPUT type=password name=psws id=psws ></div></td><td class=tdbg2>*&nbsp;" + lang._js_js._common._label776 + "</td></tr>";
				s += "<tr class=tdbg1><td colspan=3 align=right><br><br><br><br><br><br><span class=\'btn_normal\'><button type=button name=button1 onclick=\"c.__OnSend('ajax_action.php?action=setup1&oldpsw='+this.form.oldpsw.value+'&psw='+this.form.psw.value+'&psws='+this.form.psws.value+'','',c.__func_comm_list,'setup1')\"  >" + lang._js_js._common._label811 + "</button></span><span class=\'btn_normal\'><button type=reset name=reset  >" + lang._js_js._common._label812 + "</button></span></td></tr>";
				s += "</form></table><br>";
				break;
			case 'setup2':
				//设置-安全问题设置
				this.__loadJs(ImgRoot + 'js/select.js');
				if (o != null && o != "") {
					if (typeof o === 'string') {
						eval(o);
					}
				}
				s += "<table width=100% class=tborder  cellspacing=0  >";
				s += "<form name=setupform2 id=setupform2><tr class=tabletop><td colspan=3><span>*&nbsp;&nbsp;" + lang._js_js._common._label763 + "</span>" + lang._js_js._common._label785 + "</td></tr>";
				s += "<tr><td colspan=2><br>" + lang._js_js._common._label762 + "<br><br></td></tr>";
				s += "<tr><td align=right class=tdbg1 width='30%' >" + lang._js_js._common._label778 + "</td><td width='40%' class=tdbg2><span class='selectOut'><span class='selectIn'><select class=selectHid name=Question  id=Question><option value=0 " + ((parseInt(o.Question) == 0) ? 'selected': '') + ">" + lang._js_js._common._label790 + "</option><option value=1 " + ((parseInt(o.Question) == 1) ? 'selected': '') + ">" + lang._js_js._common._label791 + "</option><option value=2 " + ((parseInt(o.Question) == 2) ? 'selected': '') + ">" + lang._js_js._common._label792 + "</option><option value=3 " + ((parseInt(o.Question) == 3) ? 'selected': '') + ">" + lang._js_js._common._label782 + "</option><option value=4 " + ((parseInt(o.Question) == 4) ? 'selected': '') + ">" + lang._js_js._common._label769 + "</option><option value=5 " + ((parseInt(o.Question) == 5) ? 'selected': '') + ">" + lang._js_js._common._label771 + "</option><option value=6 " + ((parseInt(o.Question) == 6) ? 'selected': '') + ">" + lang._js_js._common._label772 + "</option><option value=7 " + ((parseInt(o.Question) == 7) ? 'selected': '') + ">" + lang._js_js._common._label766 + "</option></select></span></span></td><td width='30%' class=tdbg2>*&nbsp;" + lang._js_js._common._label773 + "</td></tr>";
				s += "<tr><td align=right class=tdbg1><br>" + lang._js_js._common._label813 + "</td><td width='*' class=tdbg2><div class=inputbox><INPUT type=text name=Solution id=Solution  value='" + o.Solution + "' onkeyup=\"this.value=getByteLength(this.value,30);\" onchange=\"this.value=getByteLength(this.value,30);\"></div></td><td width='30%' class=tdbg2>*&nbsp;" + lang._js_js._common._label774 + "</td></tr>";
				s += "<tr class=tdbg1 ><td colspan=3 align=right><br><br><br><br><br><br><span class=\'btn_normal\'><button type=button name=button1 onclick=\"c.__OnSend('ajax_action.php?action=setup2_exec',this.form,c.__func_comm_list,'setup2')\"  >" + lang._js_js._common._label811 + "</button></span><span class=\'btn_normal\'><button type=reset name=reset  >" + lang._js_js._common._label812 + "</button></span></td></tr>";
				s += "</form></table><br>";
				setTimeout("loadSelect(c._$('Question'));", 500);
				break;
			case 'setup3':
				//设置-游戏参数设置
				if (o != null && o != "") {
					if (typeof o === 'string') {
						eval(o);
					}
				}

				s += "<table width=100% class=tborder  cellspacing=0  >";
				s += "<form name=setupform3 id=setupform3><input type=hidden id=isnote_value name=isnote_value  value=" + ((parseInt(o.IsSendMsg) == 1) ? 1 : 0) + "><input type=hidden id=islang_value name=islang_value  value=" + ((o.Lang == 'big5') ? 'big5': 'gbk') + "><tr class=tabletop><td colspan=2><span>*&nbsp;&nbsp;" + lang._js_js._common._label764 + "</span>" + lang._js_js._common._label786 + "</td></tr>";
				s += "<tr><td colspan=2><br>" + lang._js_js._common._label760 + "<br><br></td></tr>";
				s += "<tr><td align=left class=tdbg1 width='30%'>" + lang._js_js._common._label770 + "</td><td width='70%' class=tdbg2>";
				s += "<label><input onclick=SetRadiosValue(this) type=radio class=inputT name=isnote value=1 " + ((parseInt(o.IsSendMsg) == 1) ? 'checked': '') + ">" + lang._js_js._common._label819 + "</label>&nbsp;&nbsp;&nbsp;&nbsp;";
				s += "<label><input onclick=SetRadiosValue(this) type=radio class=inputT name=isnote value=0 " + ((parseInt(o.IsSendMsg) == 0) ? 'checked': '') + ">" + lang._js_js._common._label820 + "</label>";
				s += "</td></tr>";
				/*s+="<tr><td align=left class=tdbg1><br>"+lang._js_js._common._label793+"</td><td width='*' class=tdbg2><br>"
						s+="<input onclick=SetRadiosValue(this) type=radio class=inputT name=islang value='gbk' "+((o.Lang=='gbk')?'checked':'')+">"+lang._js_js._common._label815+"&nbsp;&nbsp;&nbsp;&nbsp;"
						s+="<input onclick=SetRadiosValue(this) type=radio class=inputT name=islang value='big5' "+((o.Lang=='big5')?'checked':'')+">"+lang._js_js._common._label816+""
						s+="</td></tr>"*/
				s += "<tr class=tdbg1 ><td colspan=2 align=right><br><br><br><br><br><br><span class=\'btn_normal\'><button type=button name=button1 onclick=\"c.__OnSend('ajax_action.php?action=setup3_edit&isnote='+this.form.isnote_value.value+'&islang='+this.form.islang_value.value+'','',c.__func_comm_list,'setup3')\"  >" + lang._js_js._common._label811 + "</button></span></td></tr>";
				s += "</form></table><br>";
				break;
			case 's_horn':
				if (o != null && o != "") {
					if (typeof o === 'string') {
						eval(o);
					}
				}
				s = "";
				if (o) {
					s += "<table widt=h100% class=tborder  cellspacing=0  >";
					s += "<tr><td width=60%><b>" + lang._js_js._common._label814 + "</td><td width=40%><a href='javascript:void(0)' onclick=\"c.__HintReMove('horn');\" title='" + lang._js_js._common._label823 + "'>" + lang._js_js._common._label810 + "</a></td ></tr>";
					for (i in o) {
						if (parseInt(i) >= 0) {
							s += "<tr align=left><td colspan=2>[" + o[i]['username'] + "]" + lang._js_js._common._label821 + ":" + o[i]['contents'] + "" + lang._js_js._common._label822 + "<font size=1.5 color=#00ff00>" + o[i]['timestr'] + "</font></td><tr>"
						}
					}
					s += "</table>";
				}
				break;
			case 'timingload':
				if (o != null && o != "") {
					if (typeof o === 'string') {
						eval(o);
					}
				}
				var s = "";
				if (o.CurrentTime > o.EndTime) {
					this._TimingStart = false;
					return;
				}
				s += "<table width=100% class=tborder  cellspacing=0  >";
				s += "<tr><td width=60%><b>" + o.title + "</td><td width=40%><a href='javascript:void(0)' onclick=\"c.__HintReMove('timingloadname');\" title='点我关闭'>" + lang._js_js._common._label810 + "</a></td ></tr>";
				for (i in o.list) {
					if (parseInt(i) >= 0) {
						s += "<tr align=left><td colspan=2>" + o.list[i]['contents'] + "" + lang._js_js._common._label822 + "<font size=1.5 color=#00ff00>" + o.list[i]['timestr'] + "</font></td><tr>";
					}
				}
				s += "</table>";
				break;

			default:
				s += lang._js_js._common._label794 + "....<br><br>";
				break;
			}
			return s;

	};

	this.UnLeagueConf = function() {
	var msgcontent = lang._js_js._common._label830 + "?&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"javascript:void(0)\" onclick=\"c.__OffWin(c._g_name);\"><font color=#00ff00>" + lang._js_js._common._label837 + "</font></a>&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"javascript:void(0)\" onclick=\"c.__OffWin(c._g_name);c.__OnCloseWid();c.__OnSend('ajax_action.php?action=undoleague','',c.__func_comm_list);\"><font color=#00ff00>" + lang._js_js._common._label838 + "</font></a>"; //
	var Confin_b = {
		name: 'Hint',
		title: lang._js_js._common._label839 + '-' + lang._js_js._common._label831,
		contents: msgcontent,
		error: 0,
		width: 500,
		height: 340,
		top: 96,
		left: 294,
		menuaction: 'Hint',
		action: 3,
		action_prowse: 0,
		zindex: 9999
	};
	c.__OnOpenWid(Confin_b);
}

this.BuyToolsConf = function(vnums) {
	var o = c._o;
	var xtargeturl;

	var mode = 0;
	if (obj = document.getElementsByName('radio_pay')) {
		for (i = 0; i < obj.length; i++) {
			if (obj[i].checked == true) mode = obj[i].value;
		}
	}
	var radiodx = "";
	if (objdx = document.getElementsByName('radio_dx')) {
		for (i = 0; i < objdx.length; i++) {
			if (objdx[i].checked == true) radiodx = "&radiodx=" + objdx[i].value;
		}
	}

	xtargeturl = "action=Agent&doaction=BuyTools&Quantity=" + vnums + "&toolid=" + o['Id'] + "&days=" + $('days').value + "&mode=" + mode + radiodx;
	if (o['page']) {
		xtargeturl += "&page=" + o['page'];
	}
	if (o['ToolsType']) {
		xtargeturl += "&ToolsType=" + o['ToolsType'];
	}
	QueryEvent(xtargeturl, ServerHost + 'task.php');
};

this.PresentTools = function(obj, doaction) { //ok in newstyle. 08-07-11 lzh
	var o = obj['contents'] || '',
	xtargeturl;
	oL = o['mgList'][c._sId];
	o['sells'] = $("gettercount").value;
	if (!doaction) doaction = 'PresentTools';
	xtargeturl = "action=Agent&doaction=" + doaction + "&getterID=" + $('getterID').value + "&gettername=" + $('gettername').value + "&count=" + $("gettercount").value + "&buyid=" + oL['buyid'] + "&days=" + oL['lastdays'] + "&toolsid=" + oL['toolsid'];
	QueryEvent(xtargeturl, ServerHost + "task.php");
}

this.DropToolsConf = function(oid, buyid) {
	c.__Confirm('', lang._js_js._common._label827, "QueryEvent('action=Agent&doaction=DropTools&ToolsId=" + oid + "&BuysId=" + buyid + "',ServerHost+'task.php');");
};

this.CancelDrop = function() {
	this.__OffWin(this._g_name);
};

this.DropTools = function(obj, i, j) {
	var o = obj['contents'] || '',
	oid = o['mgList'][i]['Id'];
	bid = (j == -1) ? -1 : o['mgList'][i][j]['buyid'],
	oname = (j == -1) ? o['mgList'][i]['name'] : o['mgList'][i][j]['toolsname'];
	o['currentID']['type'] = i;
	o['currentID']['id'] = j;
	c.__OffWin(c._g_name);
	var xtargeturl = 'action=Agent&doaction=DropTools&ToolsId=' + oid + '&BuysId=' + bid + '&ToolsName=' + oname;
	QueryEvent(xtargeturl, ServerHost + 'task.php');
};

this.UseToolsConf = function(obj, i, j, index) {
	var o = obj['contents'] || '',
	index = 3;
	o['currentID']['type'] = i;
	o['currentID']['id'] = j;

	switch (index) {
	case 0:
		this.Confin = {
			name: '',
			title: lang._js_js._common._label832,
			contents: o,
			width: 480,
			left: 200,
			menuaction: 'UseTools',
			action: this._action,
			action_prowse: 1
		};
		setTimeout(function() {
			c.__OpenHostRight(c.Confin);
			return false;
		},
		360);
		break;
	case 1:
		this.Confin = {
			name: '',
			title: lang._js_js._common._label833,
			contents: o,
			width: 480,
			left: 200,
			menuaction: 'PresentTools',
			action: this._action,
			action_prowse: 1
		};
		setTimeout(function() {
			c.__OpenHostRight(c.Confin);
			return false;
		},
		360);
		break;
	case 2:
		this.DropToolsConf(c.Confin, i, j, chk);
		break;
	default:
		break;
	}
};

this.UseTools = function(o) {
	//var o = obj['contents']||'', i = o['currentID'], oid = o['mgList'][i]['toolsid'], ooid=o['mgList'][i]['buyid'] ,xbasicurl, xtargeturl;
	var oid = o['toolsid'],
	ooid = o['buyid'],
	xbasicurl,
	xtargeturl,
	Assign = "";
	xbasicurl = "action=Agent&doaction=UseTools&toolsid=" + oid + "&buyid=" + ooid;
	Assign = "";
	var canGift = 0;
	if (o['paytype'] == 1) canGift = 0;
	else canGift = 1;

	if (employeeListId.length >= 0)
	{
	    Assign += "&AssignEmployeeId_safe=" + employeeListId.slice(0)
	}

	if (c._$('AssignEmployeeId')) Assign += "&AssignEmployeeId=" + c._$("AssignEmployeeId").value;

	if (c._$('AssignShopId')) Assign += "&AssignShopId=" + c._$("AssignShopId").value;
	if (c._$('FromPro')) Assign += "&FromPro=" + c._$("FromPro").value;
	if (c._$('ToPro')) Assign += "&ToPro=" + c._$("ToPro").value;
	if (c._$('ChangeCount')) Assign += "&ChangeCount=" + c._$("ChangeCount").value;
	if (c._$('explorerChange')) Assign += "&typetoolsid=" + c._$("explorerChange").value + "&canGift=" + canGift + '&paytype=' + o['paytype'];
	if (c._$('wonbtoChange')) Assign += "&typeid=" + c._$("wonbtoChange").value;
	if (c._$('wonbtoToolCard')) Assign += "&typeid=" + c._$("wonbtoToolCard").value;
	if (c._$('useNumber')) Assign += "&useNumber=" + c._$("useNumber").value;
	if (c._$('new_cofc_name')) Assign += "&newname=" + c._$("new_cofc_name").value;
	if (c._$('cofc_pswd')) Assign += "&pswd=" + c._$("cofc_pswd").value;

	xtargeturl = xbasicurl + $("xurl").value + Assign;
	//alert(xtargeturl)
	//alert(ServerHost+"task.php?"+xtargeturl);
	QueryEvent(xtargeturl, ServerHost + "task.php");
};

this.backoutConf = function(bMapId) {
	this._refUrl = "QueryEvent('action=Agent&doaction=BackOut&MapId=" + bMapId + "&type=map',ServerHost+'task.php');";
	this.__MainMsg(lang._js_js._common._label828 + "?&nbsp;&nbsp;", 1, 111, lang._js_js._common._label839 + '-' + lang._js_js._common._label834);
}

this.showTip = function(o, m, c, r) {
	sid = "show_div" + o.tagName + "_" + o.name + o._id + "_0702";
	var so = this._$(sid);
	if (so == null || typeof(so) != 'object') {
		var so = document.createElement("DIV");
		document.body.appendChild(so);
		so.style.display = 'block';
		so.id = sid;
		so.style.position = 'absolute';
		so.style.zIndex = 999999;
	}

	if (so == null || typeof(so) != 'object') return true;

	if (!m) {
		document.body.removeChild(so);
		return true;
	}
	if (typeof(c) == 'string' && c != '') {
		so.className = c;
	} else {
		so.className = 'classhit';
	}
	if (!r) r = 30;

	so.style.left = this.getLeft(o) + o.offsetWidth + r;
	so.style.top = this.getTop(o) + 6;
	so.height = o.offsetHeight;
	so.innerHTML = m;
	window.setTimeout("try{$('" + sid + "').style.display='none';}catch(e){}", 3000);
}
this.getTop = function(e) {
	var offset = e.offsetTop;
	if (e.offsetParent != null) offset += this.getTop(e.offsetParent);
	return offset;
}

this.getLeft = function(e) {
	var offset = e.offsetLeft;
	if (e.offsetParent != null) offset += this.getLeft(e.offsetParent);
	return offset;
}

this._setPolicyLeftTime = function() {
	for (i in this._PolicyLeftTime) {
		if (isNaN(this._PolicyLeftTime[i])) continue;
		if (this._PolicyLeftTime[i] <= 0 && c._$("upolicy_" + i)) {
			if (this.setPolicyTimeId) {
				clearTimeout(this.setPolicyTimeId);
			}
			//c.__OnSend("ajax_action.php?action=thingshopspolicy&CallBack=1&ToShopId="+this._pToShopId+"&ToUserId="+this._pToUserId+'&ToShopName='+this._pToShopName,'',c.__func_pic_list,'thingshopspolicy');
			c.__OnSend("ajax_action.php?action=thingshopspolicy&comefrom=0", '', c.__func_comm_list, 'thingshopspolicy');
			return;
		}
		if (c._$("upolicy_" + i)) c._$("upolicy_" + i).innerHTML = getTimeLeftStr(this._PolicyLeftTime[i]);
		this._PolicyLeftTime[i] -= 1;
	}

	if (this.setPolicyTimeId == null && this.setPolicyTimeId > 0) {
		clearTimeout(this.setPolicyTimeId);
	}
	this.setPolicyTimeId = setTimeout("c._setPolicyLeftTime();", 1000);
} //handle by js lang lib by Manson 09-06-15
this.__UnderwriterCompetitiveBidding_Tpl = function(funStr) {
	var s = "";

	s += "<table width=100%  cellspacing=0><tr><td class=tableheight valign=top>";
	s += "<table width=100% class=tborder  cellspacing=0  >"
	if (c._sellBegTime != 'undefined' && c._sellBegTime != null) {
		s += "<tr class=tabletop><td><span>" + lang._js_js._common._label826 + "</span>" + c._sellTitle + "</td></tr>";
		s += "<tr><td ></td></tr>";
		s += "<tr><td class=tdbg1 width=100% align=center>" + this.__CreateGuage_Tpl() + "</td></tr>"
		if (typeof(c._sellContents) != "undefined" && c._sellContents != null) {

			s += "<tr class=tabletop><td ></td></tr>";
			s += "<tr><td  width=100% ><div class=thingjob style='height:200px;'>";
			s += c._sellContents;
			s += "</div></td></tr>";

		}
	} else {
		s += "<tr><td align=center><b class=oncon>" + lang._js_js._common._label835 + "</b></td></tr>"
	}
	s += "</table>";
	if (typeof(c._sellBrakUrl) == "undefined" || c._sellBrakUrl == null) {
		c._sellBrakUrl = "c.__back();return false;";
	}
	s += "</td></tr><tr><td align=right height=35>";
	s += " <span class=\'btn_normal\'><button     onclick=\"c.__OnSend('ajax_action.php?action=stockMarket_UnderwriterCompetitiveBidding" + ((c._sellisApply) ? "&apply=ok": '') + "&smid=" + c._sellSecID + "','',c.__func_comm_list,'stockMarket',998)\" >" + lang._js_js._common._label836 + "</button></span>&nbsp;";
	s += " <span class=\'btn_normal\'><button     onclick=\"" + c._sellBrakUrl + "\" >" + lang._js_js._common._label840 + "</button></span>&nbsp;";
	s += "</td><tr></table>";
	return s;
}
//承销商竞标页面(显示进度条) by Manson 09-06-15
this.__UcdFailedGotoSocketMarket_Tpl = function(funStr) {
	var s = "";

	s += "<table width=100%  cellspacing=0><tr><td class=tableheight valign=top>";
	s += "<table width=100% class=tborder  cellspacing=0  >"
	if (c._sellBegTime != 'undefined' && c._sellBegTime != null) {
		s += "<tr class=tabletop><td><span>" + lang._js_js._common._label826 + "</span>" + c._sellTitle + "</td></tr>";
		s += "<tr><td ></td></tr>";
		s += "<tr><td class=tdbg1 width=100% align=center>" + this.__CreateGuage_Tpl() + "</td></tr>"
		if (typeof(c._sellContents) != "undefined" && c._sellContents != null) {

			//s+="<tr class=tabletop><td ></td></tr>";
			s += "<tr><td  width=100% ><div class=thingjob style='height:200px;'>";
			s += c._sellContents;
			s += "</div></td></tr>";

		}
	}
	s += "</table>";
	if (typeof(c._sellBrakUrl) == "undefined" || c._sellBrakUrl == null) {
		c._sellBrakUrl = "c.__back();return false;";
	}
	s += "</td></tr><tr><td align=right height=35>";
	s += " <span class=\'btn_normal\'><button onclick=\"" + c._sellBrakUrl + "\" >" + lang._js_js._common._label840 + "</button></span>&nbsp;";
	s += "</td><tr></table>";
	return s;
}

}
/*templatel*/
// add by jacky 只对非IE浏览器进行处理
function handleHtmlForFirefox(obj) {
	if(!obj) return false;
	try {
		//处理input type='button||submit||reset'队列, 外层套入一个span display='inline-block', 宽度自适应
		if (obj.getElementsByTagName('input')){
			var inputArray = obj.getElementsByTagName('input');
			for (var x = 0; x < inputArray.length; x++){
				switch (inputArray[x].getAttribute('type').toUpperCase()){
					//处理button类型
					case 'BUTTON' :
					case 'SUBMIT' :
					case 'RESET' :
						/*if (inputArray[x].parentNode.tagName == 'SPAN'){
							inputArray[x].parentNode.className += ' btn_normal';
							continue;
						}*/
						if (inputArray[x].parentNode.tagName == 'SPAN' && inputArray[x].parentNode.className.indexOf('btn_normal') != -1){
							continue;
						}
						if (inputArray[x].onmouseout) inputArray[x].removeAttribute('onmouseout');
						if (inputArray[x].onmousemove) inputArray[x].removeAttribute('onmousemove');
						if (inputArray[x].className) inputArray[x].removeAttribute('class');
						inputArray[x].className = '';
						var testSPAN = document.createElement('span');
						testSPAN.className = 'btn_normal';
						inputArray[x].parentNode.insertBefore(testSPAN,inputArray[x]);
						testSPAN.appendChild(inputArray[x]);
						//处理disabled状态 firefox
						if (!isIEBrowser){
							inputArray[x].setAttribute('onclick',inputArray[x].getAttribute('onclick')+'; return false;');
						}
					break;
					//处理text类型
					case 'TEXT':
					case 'PASSWORD':
						if (inputArray[x].className) inputArray[x].removeAttribute('class');
						if (inputArray[x].parentNode.className && inputArray[x].parentNode.className.indexOf('inputbox') != -1){
							inputArray[x].parentNode.removeAttribute('class');
						}
						if (inputArray[x].parentNode.className == 'text_normal_in' && inputArray[x].parentNode.tagName == 'SPAN'){
							continue;
						}
						var inputSpanOut = document.createElement('span');
						var inputSpanIn = document.createElement('span');
						inputSpanOut.className = 'text_normal_out';
						inputSpanIn.className = 'text_normal_in';
						inputSpanOut.appendChild(inputSpanIn);
						inputArray[x].parentNode.insertBefore(inputSpanOut,inputArray[x]);
						inputSpanIn.appendChild(inputArray[x]);
					break;
					default:break;
				}
			}
		}
		//处理button队列, 外层套入一个span display='inline-block', 宽度自适应
		var ssss = obj.getElementsByTagName('button');
		for(var i=0;i<ssss.length;i++ ) {
			if(isEngV) {
				/*if (ssss[i].parentNode.tagName == 'SPAN'){
					ssss[i].parentNode.className += ' btn_normal';
					continue;
				}*/
				if (ssss[i].parentNode.tagName == 'SPAN' && ssss[i].parentNode.className.indexOf('btn_normal') != -1){
					continue;
				}
				if (ssss[i].onmouseout) ssss[i].removeAttribute('onmouseout');
				if (ssss[i].onmousemove) ssss[i].removeAttribute('onmousemove');
				if (ssss[i].className) ssss[i].removeAttribute('class');
				ssss[i].className = '';
				testSPAN = document.createElement('span');
				testSPAN.className = 'btn_normal';
				ssss[i].parentNode.insertBefore(testSPAN,ssss[i]);
				testSPAN.appendChild(ssss[i]);
			}
			//处理disabled状态 firefox
			if (!isIEBrowser && ssss[i].getAttribute('onclick') != null){
				ssss[i].setAttribute('onclick',ssss[i].getAttribute('onclick')+'; return false;');
			}
			/*
			if(ssss[i].disabled && !isIEBrowser) {
				ssss[i].parentNode.className = 'btn_normal disabled';
				ssss[i].setAttribute('onclick','return false;'+ssss[i].getAttribute('onclick'));
				ssss[i].removeAttribute('disabled');
			}*/
		}
	} catch(e) {

	}
}

function format_number(decimalPoints,thousandsSep,s){

	var val=s+'',re=/^(-?)(\d+)/,x,y;
	if (decimalPoints!=null) val = s.toFixed(decimalPoints);
	if (thousandsSep && (x=re.exec(val))){
		for (var a=x[2].split(''),i=a.length-3;i>0;i-=3) {
			a.splice(i,0,thousandsSep);
		}
		val=val.replace(re,x[1]+a.join(''));
	}
	return val;
}
function   fontcolorflash(){
	var   obj   =   getObj("dhText");
	obj.style.color   =   obj.style.color==""?"red":"";
	setTimeout("fontcolorflash()",500);
}

//获取FF的事件 add by Manson [09-07-02]
function FF_SearchEvent()
{
	if(document.all) return window.event;
	func = FF_SearchEvent.caller;
	while(func != null)
	{
		var arg0=func.arguments[0];
		if(arg0)
		{
			if(arg0.constructor==Event||arg0.constructor==MouseEvent)
			{
				break;
			}
		}

		func = func.caller;
	}

	return {'x':arg0.pageX, 'y':arg0.pageY};
}

//删除未运行的队列 add by Manson [09-07-12]
function confirmDelProcess()
{
	var url = "c.__OnSend('ajax_action.php?action=assistTake&actGet=clearProcessList&ptid="+o.ptid+"','',c.__func_comm_list,'assistTake','gsWaitProcessList')";
	c.__Confirm('', lang._js_js._common._label841, url);
}

function ChooseAll(dname,bchoo){
	var eles=document.getElementsByName(dname);
	for(var i=0;i<eles.length;i++){
		eles[i].checked=bchoo;
	}
}

//生成水晶条 - 初始化 add by Manson
function initPer (perArray){
	for (i = 0; i < perArray.length; i++){

		if (!(document.getElementById(perArray[i].id))){break;}
		//写入div部分
		bgWidth = parseInt(perArray[i].value / perArray[i].topValue * 88);
		document.getElementById(perArray[i].id).innerHTML = "<div class='percent' id='"+perArray[i].id+"_per'><div class='bg"+perArray[i].color+"' style='width:"+bgWidth+"px'></div><div class='textValue'><span>"+perArray[i].value+"</span>/<span>"+perArray[i].topValue+"</span></div></div>";
	}
}
//生成水晶条HTML add by jacky

function UserFullPercent(value,Bg,Base){
	value = ((!value) || value < 0)? 0 : value;
	var Percent = Math.abs(parseInt(value/Base*100));
	var PerLeft = (Percent>=1)?'UserPer_L'+Bg:"";
	Percent = (Percent>=1)?Percent:0;
	var PerRight = (Percent==100)?'UserPer_R'+Bg:"";

	if(value>=Base){
		value = Base;
	}
	var PercentStr = '<div class="UserPerMain"><div class="UserPerRight '+PerRight+'"></div><div class="UserPerLeft '+PerLeft+'"></div><div class="UserPerBg"><div class="UserPercentValue"><b>'+value+'/'+Base+'</b></div><div class=UserPerCenter id="UserPer'+Bg+'" style="width:'+Percent+'%"></div></div></div>';

		return PercentStr;
}