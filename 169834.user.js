// ==UserScript==
// @name        超能世界辅助脚本
// @namespace   超能世界辅助脚本
// @include     http://sqq*.3g.qq.com/s?aid=bizp&pt=page&pc=SPW*
// @include     http://sqq*.3g.qq.com/error.jsp*
// @version     2.8
// ==/UserScript==
url=document.URL;
if(url.indexOf("error.jsp")>0){
	setTimeout(backweb,5000);
}else{
	GM_setValue("backurl", url);
}
mylevel=25;//自己实际等级
getallexp=1;//商城兑换所有经验标记-1为兑换,0为不兑换,下同
getexp=1;//商城兑换6折经验标记
getjinbi=1;//商城兑换金币标记
getshuya=1;//商城兑换鼠牙标记
getshuzai=1;//商城兑换鼠崽标记
getfengshi=1;//商城兑换经风石标记
getyuansushi=1;//商城兑换元素石标记
getheishikuang=1;//商城兑换黑石矿标记
getheishijing=1;//商城兑换黑石精标记
getlangpi=1;//商城兑换狼皮标记
getlangzai=1;//商城兑换狼崽标记
getchengzhang=0;//商城兑换6折成长标记-数字为兑换数量
chengzhangzhi="获得：超Q成长值 "+getchengzhang;
x1=url.indexOf("SPW");
x2=url.indexOf("&",x1);
num=Number(url.substr(x1+3,x2-x1-3));
delay=10800;//商城监控延时-1800秒
s=document.documentElement.outerHTML;
Array.prototype.S=String.fromCharCode(2);//遍历数组方法
Array.prototype.in_array=function(e){
    var r=new RegExp(this.S+e+this.S);
    return (r.test(this.S+this.join(this.S)+this.S));
}
var noblank = new Array(0,14,31,100,202,206,210,710,700,205,209,1001,301,302,304,1002,1005,500,507,508,509,600,601,620,621,622,1010,512,513,737,703,707,704,101,723,706,726,729,722,8,515,300,728,701,702,212,213,725,723);//不需要新窗口打开链接的SPW的ID
if(!noblank.in_array(num)){//如果不在对应的页面则给每个链接添加blank
	tags = document.getElementsByTagName("a");
	for(var i=0;i<tags.length;i++){//初始化提示表情
		var onclickvalue=tags[i].outerHTML;
		tags[i].target="_blank";//添加新窗口打开
		if(onclickvalue.indexOf("触屏版")>0){
			msgobj=tags[i];
			tags[i].href="#";
		}
		if(onclickvalue.indexOf("3G版")>0){
			tags[i].style.display="none";
		}
	}
}
tags = document.getElementsByTagName("a");
for(var i=0;i<tags.length;i++){//初始化到普通版
	if(tags[i].outerHTML.indexOf("普通版")>0 || tags[i].outerHTML.indexOf("简版")>0 ){
		tags[i].click();
		break;
	}
}
switch(num){
	case 202:
		//好友页面挑战;
		if(GM_getValue("pkfriend",0)==0){
			if(confirm("挑战好友吗?")){
				pkfriend(mylevel);
				GM_setValue("pkfriend", 1);
			}
		}else{
			pkfriend(mylevel);
		}
        break;
	case 205:
		//加好友
		addfriend(mylevel);
        break;
	case 209:
		//加好友页面结果关闭
		if(s.indexOf("好友请求已发出")>-1){
			closeweb();
		}else{
			window.location.reload();
		}
        break;
	case 211:
		//点击删除好友后的删除页面关闭
		closeweb();
        break;
	case 213:
		//点击删除好友
		if(s.indexOf("确认删除好友")>-1){
			tags = document.getElementsByTagName("a");
			for(var i=0;i<tags.length;i++){
				if(tags[i].outerHTML.indexOf("删除")>0){
					tags[i].click();
					break;
				}
			}
		}
        break;
	case 700:
		//挑战页面判定
		findnum=s.indexOf("查询或设置失败");
		if(findnum>-1){
			window.location.reload();
		}else{
			closeweb();
		}
        break;
	case 710:
		//pk好友
		findnum=s.indexOf("预估胜率：");
		Endnum=s.indexOf("%",findnum);
		percentage=s.substr(findnum+5,Endnum-findnum-5);
		if(percentage>69 && s.indexOf("今日剩余次数：0次")==-1){//胜率大于69%才挑战
			tags = document.getElementsByTagName("a");
			for(var i=0;i<tags.length;i++){
				if(tags[i].outerHTML.indexOf("确认")>0){
					tags[i].click();
					break;
				}
			}
		}/*else{//否则关闭页面
			closeweb();
		}*/
        break;
	case 706:
		//挑战师傅
		/*tags = document.getElementsByTagName("a");
		for(var i=0;i<tags.length;i++){
			if(tags[i].outerHTML.indexOf("叛出")>0){//刷新
				tags[i].click();
				break;
			}
		}*/
		setTimeout(refreshweb,30000);//每30秒刷新
        break;
	case 723:
		//挑战师傅失败返回
		pkshifu();
        break;
	case 726:
		//确认挑战师傅
		tags = document.getElementsByTagName("a");
		for(var i=0;i<tags.length;i++){
			if(tags[i].outerHTML.indexOf("确认")>0){//刷新
				tags[i].click();
				break;
			}
		}
        break;
	case 1000:
		//商城监控
		shopping();
        break;
	case 1002:
		//购物页面;
		if(s.indexOf("交易结果")>-1){
			closeweb();
		}else{
			window.location.reload();
		}
        break;
}
function addfriend(mylevel){
	s=document.documentElement.outerHTML;
	//搜索循环
	Endnum=0;
	findnum=0;
	a=0;
	while (findnum>-1){
		findnum=s.indexOf("(lv",Endnum);
		Endnum=s.indexOf(")|",findnum);
		level=s.substr(findnum+3,Endnum-findnum-3);
		if(level.length<3){
			if(level<=mylevel+5 && level>mylevel-1){//加小于等于自己等级且在三级以内的好友
				tags = document.getElementsByTagName("a");
				tags[a*2+1].target="_blank";//添加新窗口打开
				tags[a*2+1].click();
			}
		}
		a++;
	}
	tags = document.getElementsByTagName("a");
	for(var i=0;i<tags.length;i++){
		if(tags[i].outerHTML.indexOf("换一批")>0){//换一批身边的人
			tags[i].click();
			break;
		}
	}
	
}
function pkshifu(){
	s=document.documentElement.outerHTML;
	if(s.indexOf("挑战失败")>0){
		tags = document.getElementsByTagName("a");
		for(var i=0;i<tags.length;i++){
			if(tags[i].outerHTML.indexOf("师徒页面")>0){//刷新
				tags[i].click();
				break;
			}
		}
	}
}
function pkfriend(mylevel){
	s=document.documentElement.outerHTML;
	//搜索循环
	Endnum=0;
	findnum=0;
	a=0;
	while (findnum>-1){
		findnum=s.indexOf("(lv",Endnum);
		Endnum=s.indexOf(")<",findnum);
		level=s.substr(findnum+3,Endnum-findnum-3);
		x1=s.indexOf('type=1">',x2);
		x2=s.indexOf("</a>",x1);
		name=s.substr(x1+8,x2-x1-8);
		if(level.length<3){
			//if(level<=mylevel && level>mylevel-3){//加小于等于自己等级且在三级以内的好友
			if(level<=mylevel){
				tags = document.getElementsByTagName("a");
				tags[(a+1)*6].target="_blank";//添加新窗口打开
				tags[(a+1)*6].click();
			}/*else if(level<mylevel-5 && name.indexOf("不诉离殇")==-1 && name.indexOf("无瑕")==-1){//排除好友和徒弟
				tags[5+a*6].target="_blank";//添加新窗口打开
				tags[5+a*6].click();//删除等级太低的好友
			}*/
		}
		a++;
	}
	tags = document.getElementsByTagName("a");
	for(var i=0;i<tags.length;i++){
		if(tags[i].outerHTML.indexOf("下页")>0){//换一批身边的人
			tags[i].click();
			GM_setValue("pkfriend", 1);
			break;
		}else{
			GM_setValue("pkfriend", 0);
		}
	}
}

function shopping(){//商城购物
	s=document.documentElement.outerHTML;
	findnum=s.indexOf("兑换记录</a><br />");
	Endnum=s.indexOf("<br /><br /><br />",findnum);
	shopitems=s.substr(findnum+14,Endnum-findnum-14)+"<br />◆";//商城物品代码
	Endnum=0;
	findnum=0;
	s=shopitems;
	linknum=1;
	linktags = document.getElementsByTagName("a");
	while (findnum>-1){
		linknum++;
		findnum=s.indexOf("◆",Endnum);
		Endnum=s.indexOf("<br />◆",findnum);
		shopitem=s.substr(findnum,Endnum-findnum);//商城单个物品代码
		if(shopitem==""){break;}
		if(shopitem.indexOf("超Q")<0 && shopitem.indexOf("href")>-1){
		//如果是非超Q的部分且未购买则继续执行
			if(shopitem.indexOf("限时6折")>-1){//如果是6折则继续执行
				if(shopitem.indexOf("获得：经验")>-1 && getexp==1){
					linktags[linknum].click();//点击链接
				}else if(shopitem.indexOf("获得：变异鼠崽")>-1 && getshuzai==1){
					linktags[linknum].click();//点击链接
				}else if(shopitem.indexOf("获得：元素石")>-1 && getyuansushi==1){
					linktags[linknum].click();//点击链接
				}else if(shopitem.indexOf("获得：黑石精")>-1 && getheishijing==1){
					linktags[linknum].click();//点击链接
				}else if(shopitem.indexOf("获得：黑石矿")>-1 && getheishikuang==1){
					linktags[linknum].click();//点击链接
				}else if(shopitem.indexOf("获得：鼠牙")>-1 && getshuya==1){
					linktags[linknum].click();//点击链接
				}else if(shopitem.indexOf("获得：狼皮")>-1 && getlangpi==1){
					linktags[linknum].click();//点击链接
				}else if(shopitem.indexOf("获得：魔化狼崽")>-1 && getlangzai==1){
					linktags[linknum].click();//点击链接
				}else if(shopitem.indexOf("获得：风石")>-1 && getfengshi==1){
					linktags[linknum].click();//点击链接
				}else if(shopitem.indexOf("获得：金币")>-1 && getjinbi==1){
					linktags[linknum].click();//点击链接
				}
			}else if(getallexp==1){//非6折如果选中领取所有经验,则领取
				if(shopitem.indexOf("获得：经验")>-1){
					linktags[linknum].click();//点击链接
				}
			}
		}else if(shopitem.indexOf(chengzhangzhi)>-1 && getchengzhang>0 && shopitem.indexOf("限时6折")>-1){//兑换成长值
			linktags[linknum].click();//点击链接
		}
	}
	msgobj.innerHTML="开始延时";
	setTimeout(delaytime,1000);//启动监控
}
function delaytime(){//延时
	delay=delay-1;
	msgobj.innerHTML="剩余时间"+String(delay);
	setTimeout(delaytime,1000);//每秒更新一次,如果到时间则刷新
	if(delay<1){refreshweb();}
}

function refreshweb(){//刷新页面
	window.location.reload();
}
function closeweb(){//关闭页面
	window.open('','_parent','');//关闭当前窗口
	window.close(); 
}
function backweb(){//重新回退页面
window.location=GM_getValue("pkfriend","http://sqq.3g.qq.com/s?aid=bizp&pt=page&pc=SPW1000&sid=AZDldenAY4iX8wwVbNtAaSNG");
}