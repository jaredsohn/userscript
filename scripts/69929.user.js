// ==UserScript==
// @name streetfights auto form
// @namespace http://mesak.wablog.info
// @description by Mesak
// @include        http://apps.facebook.com/street-fights/
// @include        http://apps.facebook.com/street-fights/index.php
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// Version 1.1
// ==/UserScript==
//==============================================================
// Start Defind
//==============================================================
var STF_class = 'body	{background-color: #eee;coler:#000;}'+
'#newform td	{padding:6px;padding-left:30px;}'+
'#newform .info	{text-align:right;}'+
'#newform span	{color:blue}'+
'#newform label	{display:block;width:180px;float:left}'+
'#msgLayer		{display:block;width:100%;height:130px;overflow-y:scroll;}'+
'#msgLayer li	{display:block;}'+
'#stf_content 	{width:100%;text-align:center;}'+
'#loading 		{width:100%;text-align:center;}'+
'.title 		{border-bottom: 3px double #0000FF;}'+
'.title span	{color:#FFF;display:block;padding:3px;width:120px;}'+
'.menu li		{display:inline;list-style:none outside none;}'+
'.menu a		{padding:5px;}'+
'.tip			{position:absolute;color: #FF0000;border: 2px solid #000;font-size:9pt;background-color: #FFFF00}';
GM_addStyle(STF_class);
var buyProperty = {"1":{n:"足球場",earn:"50"},"2":{n:"大排檔",earn:"100"},"3":{n:"網吧",earn:"500"},"4":{n:"拳館",earn:"1000"},"5":{n:"酒吧",earn:"3000"},"6":{n:"卡拉ＯＫ",earn:"8000"},"7":{n:"Ｄｉｓｃｏ",earn:"20000"},"8":{n:"桑拿室",earn:"60000"},"9":{n:"夜總會",earn:"150000"},"10":{n:"酒店",earn:"200000"},"11":{n:"賭場",earn:"300000"}}
var jobCase = {'1':{n:"代客泊車",req:'1'},'2':{n:"賣翻版ＤＶＤ",req:'3'},'3':{n:"幫財務公司收數",req:'5'},'4':{n:"麻將館睇埸",req:'7'},'5':{n:"走水貨返大陸",req:'10'},'6':{n:"偷車",req:'12'},'7':{n:"放貴利",req:'14'},'8':{n:"打劫銀行",req:'16'},'9':{n:"連環洗劫金鋪",req:'20'},'10':{n:"綁架重要人物",req:'25'},'11':{n:"走私毒品",req:'30'},'12':{n:"經營外圍投注",req:'35'}}
var jobIDSIG  = new Array();
var buyIDSIG  = new Array();
var buyMoney;
var info = new Array();
var UserID = GetID(document.body.innerHTML);
var NowSelect = GM_getValue("NowSelect");
var noREpost = new Array;
var bform = "#bank";
var sform = "#send";
var pform = "#property";
var LOADING_IMG = 'R0lGODlhGQAZAPf/ACoqKjY2NmhoaICAgF5eXszMzEpKSp6eni4uLjw8PEZGRkRERJqamuHh4UhISHJyckxMTGZmZnx8fEBAQBoaGhAQEG1tbWJiYoiIiJycnE9PTw0NDXh4eHR0dM7Ozq+vrywsLHBwcCQkJDMzM3Z2dj4/P4aGhjAwMG5ubkJCQmpqaiYmJpaXlwQE'+
'BP39/fLy8vDw8FNTU/Pz8zk5Oe3t7evr64qKilFRUZmZmdzc3FVVVVdXV97e3vj4+DU1NVpaWqSkpFxcXObm5lZWVufn562trY2NjVBQUJOTkzs7O6ampvr6+llZWfb29o+Pj/z8/H5+fujo6Orq6t/f37m5uWFhYTQ0NH9/f5WVlVhYWKCgoFtbWzo6Ory8vJCQkJGR'+
'kTg4OJSUlO/v75KSku7u7re3t76+vmVlZfv7+7GxsePj48jIyLOzs/X19aKiovT09Nvb2/Hx8aOjo93d3aurq6ysrLi4uOLi4rq6usbGxuzs7MXFxbu7u9jY2JiYmIyMjNXV1dbW1sTExIKCgv7+/qGhoSMjI2BgYICAf1JSUuTk5F1dXX9/gLW1tcrKyoODg4B/fwcI'+
'B1RUVO7v73+AgPn5+e7u74+QjwcHCKWlpX+Af+/v7sLCwvj3+I+QkAgHB46OjnBvcIB/gOnp6eXl5dDQ0KioqF9fX9LS0vf3+GdnZ3Bwb+/u7/j49xcXF4KDg35/f4uLi5GRkm9wcJ+fn/f4+Jqamb29vcnJyQgICNjY10FCQj09PaCgn5WWlfLx8n9/fomKipCPkO7v'+
'7iQkI5CPj1pZWrm6uXZ2de3t7PHy8omJiT8/P5SVlWhoZ29vb3t7e93c3EVFRVhYV2NjY2NkY/X09ZmZmH5/fn9+f0RDRFpbW6GgoXFxcXJxcp+gn2doaAcICIyNjXd3dwgHCB4eHoyNjDc3N/Pz8nV1dW9wb6CgoZKRksXExaSlpFpbWmVmZZeXl6Wlpvj390FBQVJT'+
'U6alpaWmpjExMeTl5ScnJ2FgYZmZmgAAAP///////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBQD/ACwAAAAAGQAZAAAI/wD/CRxIUAwHZ9CIEFzIkOASCALMOVFApqHFgVRunEFkaxmDiwRx3MhC5Z+SIGdEMThgw4WTHUEENTQCQgQABF30zEiHSIuBOYOWvSFyZM1C'+
'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';
var NewForm =	'<center><h1></h1><table border="1" width="720" id="newform" cellspacing="0" cellpadding="0">'+
				'	<tr>'+
				'		<td colspan="3"><div class="menu"><ul><li><a href="index.php">主頁</a></li><li><a href="job.php">任務</a></li><li><a href="property.php">地盤</a></li><li><a href="fight.php">開戰</a></li><li><a href="item.php">裝備</a></li><li><a href="gang.php">我的同伴</a></li><li><a href="bank.php">黑市銀行</a></li><li><a href="rannk.php">英雄榜</a></li><li><a href="invite.php">尋找同伴</a></li></ul></div></td>'+
				'	</tr>'+
				'	<tr>'+
				'		<td width="100" style="background:url(http://img.6waves.com/street-fights/ico_level.gif) no-repeat scroll 4px 10px transparent">等級</td>'+
				'		<td width="150" class="info"><span id="i_lv"></span></td>'+
				'		<td rowspan="7" valign="top">'+
				'			<table style="height:250px;width:390px;">'+
				'				<tr><td height="24" align="right"><div class="title"><span>黑市銀行</span></div><div id="bankLayer"></div></td></tr>'+
				'				<tr><td height="24" align="right"><div class="title" id="tcase"><span>任務</span></div><select id="case"></select></td></tr>'+
				'				<tr><td height="24" align="right"><div class="title" id="tprop"><span>地盤</span></div><select id="prop"></select></td></tr>'+
				'				<tr><td valign="bottom"><div id="stf_content"></div><div id="loading"></div></td></tr>'+
				'				<tr><td height="24"><div id="button"></div></td></tr>'+
				'			</table>'+
				'		</td>'+
				'	</tr>'+
				'		<td style="background:url(http://img.6waves.com/street-fights/ico_exp.gif) no-repeat scroll 4px 10px transparent">EXP</td>'+
				'		<td class="info"><span id="i_exp"></span>/<span class="max" id="i_exp_max"></span></td>'+
				'	</tr>'+
				'	<tr>'+
				'		<td style="background:url(http://img.6waves.com/street-fights/ico_hp.gif) no-repeat scroll 4px 10px transparent">生命</td>'+
				'		<td class="info"><span id="i_hp"></span>/<span class="max" id="i_hp_max"></span></td>'+
				'	</tr>'+
				'	<tr>'+
				'		<td style="background:url(http://img.6waves.com/street-fights/ico_sta.gif) no-repeat scroll 4px 10px transparent">精神</td>'+
				'		<td class="info"><span id="i_sta"></span>/<span class="max" id="i_sta_max"></span></td>'+
				'	</tr>'+
				'	<tr>'+
				'		<td style="background:url(http://img.6waves.com/street-fights/ico_en.gif) no-repeat scroll 4px 10px transparent">體力</td>'+
				'		<td class="info"><span id="i_en"></span>/<span class="max" id="i_en_max"></span></td>'+
				'	</tr>'+
				'	<tr>'+
				'		<td style="background:url(http://img.6waves.com/street-fights/ico_cash.gif) no-repeat scroll 4px 10px transparent">現金</td>'+
				'		<td class="info"><span id="i_money"></span></td>'+
				'	</tr>'+
				'	<tr>'+
				'		<td style="background:url(http://img.6waves.com/street-fights/ico_bank.gif) no-repeat scroll 4px 10px transparent">存款</td>'+
				'		<td class="info"><span id="i_save"></span></td>'+
				'	</tr>'+
				'	<tr>'+
				'		<td colspan="3"><div id="msgLayer"><ul id="msg"></ul></div><div id="log"><!--<textarea id="logt" cols="100%" rows="12"></textarea>--></div><div id="sendframe"><form id="send"></form><hr/><form id="bank"></form><hr/><form id="property"></form></div></td>'+
				'	</tr>'+
				'</table><span class="tip"></span></center>';
$('#app_content_'+UserID).html(NewForm);
$('#case').after('<input type="button" id="j_run" value="執行" />');
$('#prop').after('<input type="button" id="p_sell" value="賣出" />');
$('#prop').after('<input type="button" id="p_buy" value="購買" />');
//$('#i_money').after('<input type="button" id="save" value="存錢" />');
$('<input type="button" id="j_update" value="任務" />').appendTo($('#button'));
$('<input type="button" id="b_bank" value="銀行" />').appendTo($('#button'));
$('<input type="button" id="p_pro" value="地盤" />').appendTo($('#button'));
$('<input type="button" id="test" value="測試" />').appendTo($('#button'));
$('<input type="text" id="i_amount" value="" />').appendTo($('#bankLayer'));
$('<input type="button" id="b_save" value="存錢" />').appendTo($('#bankLayer'));
$('<input type="button" id="b_load" value="領錢" />').appendTo($('#bankLayer'));
//==============================================================
// Object event
//==============================================================
$(document).ready(function(){
	$('#test').click(function(){
		$('#sendframe').toggle();
	})
	$('#p_pro').click(function(){
		noREpost['bank_prop'] = true;
		ajaxForm("property.php","GET",pform,1);
		$(this).bind("ajaxComplete", function(){
			//GetData($('#log').find('div[id="app'+UserID+'_main"]').html(),true);
			GetbuySig();
		});
	})
	$('#p_buy').click(function(){
		//noREpost['bank_prop'] = true;
		$(pform).find('input[name="action"]').val("buy");
		ajaxForm("property.php","POST",pform,1);
		$(this).bind("ajaxComplete", function(){
			GetbuySig();
		});
	})
	$('#p_sell').click(function(){
		alert('還沒做 !');
	})
	$('#b_bank').click(function(){
		updateBank();
	})

	$('#b_save').click(function(){
		noREpost['bank_save'] = true;
		ajaxForm("bank.php","GET",bform,2);
		$(this).bind("ajaxComplete", function(){
			GetData($('#log').find('div[id="app'+UserID+'_main"]').html(),true);
			if(noREpost['bank_save']){
				$(bform).append('<label>deposit</label><input type="text" alt="post" name="deposit" value="存款" size="40" readonly="readonly" /><br />');
				$(bform).append('<label>amount</label><input type="text" alt="post" name="amount" value="'+ $('#i_amount').val() +'" size="40" readonly="readonly" /><br />');
				ajaxForm("bank.php","POST",bform,2);
			}
		});
	})
	$('#b_load').click(function(){
		noREpost['bank_load'] = true;
		ajaxForm("bank.php","GET",bform,1);
		$(this).bind("ajaxComplete", function(){
			GetData($('#log').find('div[id="app'+UserID+'_main"]').html(),true);
			if(noREpost['bank_load']){
				$(bform).append('<label>deposit</label><input type="text" alt="post" name="widthdraw" value="提款" size="40" readonly="readonly" /><br />');
				$(bform).append('<label>amount</label><input type="text" alt="post" name="amount" value="'+ $('#i_amount').val() +'" size="40" readonly="readonly" /><br />');
				ajaxForm("bank.php","POST",bform,1);
			}
		});
	})
	$('#j_update').click(function(){
		ajaxForm("job.php","GET",sform,1);
		$(sform).bind("ajaxComplete", function(){
			GetJobSig();
		});
	})
	$('#j_run').click(function(){
		noREpost['job'] = true;
		ajaxForm("job.php","GET",sform,1);
		$(sform).bind("ajaxComplete", function(){
			GetJobSig();
			if(noREpost['job']){ajaxForm("job.php","POST",sform,1);}
		});
		/*
		$("#send").attr("action","job.php");
		$("#send").attr("method","post");
		$("#send").attr("traget","_blank");
		$("#send").submit();
		*/
	})
	$('#case').change(function(){
		NowSelect = this.value;
		GM_setValue("NowSelect",NowSelect);
		$(sform).find('input[name="id"]').val(this.value);
		$(sform).find('input[name="sig"]').val(jobIDSIG[this.value]);
	})
	$('#prop').change(function(){
		$('#tprop').css({"position":"relative"});
		$('.tip').css({"top":"0","right":"0"});
		$('.tip').appendTo($('#tprop'));
		$('.tip').html(buyMoney[this.value-1]);
		$(pform).find('input[name="id"]').val(this.value);
		$(pform).find('input[name="sig"]').val(buyIDSIG[this.value]);
	})
		
		
	updateBank();
	$("#case").html(SelectMake(NowSelect,jobCase,jobIDSIG));
	$("#prop").html(SelectMake(1,buyProperty,buyIDSIG));
	$('#sendframe').hide();
	$("#j_update").trigger("click");
	$("#p_pro").triggerHandler("click");
})

//==============================================================
// Function
//==============================================================
function ajaxForm(page,tp,formName,formEq){
	$("#loading").html('<img src="data:image/png;base64,'+LOADING_IMG+'" border="0" />');
	if(tp == "POST"){var POST_data = $(formName).serialize();}
	$(formName).html("");
	$.ajax({type:tp,url:page,data:POST_data,success:function(data){
			replaceTAG = Array(/html/gi,/meta/gi,/iframe/gi,/script/gi,/img/gi,/style/gi);
			data = data.toLowerCase();
			for(x in replaceTAG){data = data.replace(replaceTAG[x],"span");}
			$('#log').html(data);
			$('#log').css("display","none");
			$('#log form').eq(formEq).find('input[type="hidden"]').each(function(){
				if(this.name != "post_form_id" && this.name != "init"){
					$(formName).append('<label>'+this.name+'</label><input type="text" alt="post" name="'+ this.name +'" value="'+ this.value +'" size="40" readonly="readonly" /><br />');
				}
			});
			if(tp == "POST"){
				var msgbox = $('#log').find('div[class="msgbox"]').eq(0).text();
				$("#msgLayer #msg").append("<li>"+msgbox+"</li>");
				GetData($('#log').find('div[id="app'+UserID+'_main"]').html());
				for(x in noREpost){noREpost[x] = false;}
				$("#msgLayer").scrollTop($("#msgLayer")[0].scrollHeight);
			}
			$("#loading").html("");
	    }
    });
}
function GetJobSig(){
	$('#log').html($('#app'+UserID+'_do_job').html());
	date = $('#log').html().match(/\{a\d+_do_job(.+)\}/gi);
//	alert(date);
	for(x in date){splitST(date[x],jobIDSIG)}
	$(sform).find('input[name="id"]').val(NowSelect);
	$(sform).find('input[name="sig"]').val(jobIDSIG[NowSelect]);
	$("#case").html(SelectMake(NowSelect,jobCase,jobIDSIG));
}
function GetbuySig(){
	buyMoney = $('#log').text().replace(/,/gi,"").match(/售價:[^0-9].+/gi);
	date = $('#log').html().match(/\{a\d+_do_buy_property(.+)\}/gi);
	for(x in date){splitST(date[x],buyIDSIG)}
	$(pform).find('input[name="id"]').val(1);
	$(pform).find('input[name="sig"]').val(buyIDSIG[1]);
	$("#prop").html(SelectMake("",buyProperty,buyIDSIG));
}
function splitST(str,name){
	str = str.match(/\(.+\)/).toString().replace(/\'/gi,"").replace("(","").replace(")","").split(",");
	return name[str[0]] = (str.length == 3)? str[2] : str[1] ;
	
}
function padChSpace(str,n){return (str.length>=n)? str:padChSpace(str+"　",n);}
function SelectMake(id,varName,sig){
	var sel = "";
	for(x in varName){
		if(id == x){selected=' selected="selected"';}else{selected="";}
		if(!sig[x]){disabled=' disabled="disabled"';}else{disabled="";}
		if(varName[x].req){
			ref = padChSpace(varName[x].n,9) + " 體力需求:" + varName[x].req;
		}else{
			ref = padChSpace(varName[x].n,5) + " 每小時收入: $" +varName[x].earn;
		}
		sel += '<option value="'+x+'" '+ selected + disabled +'>'+ ref +'</option>';
	}
	return sel;
}
function updateBank(){
	 $.get("bank.php",function(data){
		GetData(data,true);
    });
}
function GetID(r){
	return r.match(/app_content_[0-9]+/).toString().match(/\d+/g);
}
function GetData(r,bank){
	r=r.toLowerCase().replace(/,/gi,'');
	info['money'] = parseInt(r.match("現金:[^0-9].+").toString().match(/\d+/g).toString());
	if(bank){info['save'] = parseInt(r.match("我的戶口:[^0-9].+").toString().match(/\d+/g).toString());}
	info['lv'] = parseInt(r.match("等級:[^0-9].+").toString().match(/\d+/g).toString());
	InfoGetAndSet('hp',"生命:[^0-9].+",r);
	InfoGetAndSet('sta',"精神:[^0-9].+",r);
	InfoGetAndSet('en',"體力:[^0-9].+",r);
	InfoGetAndSet('exp',"exp:[^0-9].+",r);
	for(x in info){
		if(x != "money" || x != "save" || x != "lv"){
			$("#i_"+x).html(info[x]);
		}
	}
	$("#i_lv").html(info['lv']);
	$("#i_money").html(info['money']);
	$("#i_save").html(info['save']);
}
function InfoGetAndSet(InfoVal,RegExpStr,r){
	var tmp = r.match(RegExpStr);
	if (tmp === null) {
		info[InfoVal] = null;
		info[InfoVal+"_max"] = null;
	}else{
		info[InfoVal] = tmp.toString().match(/\d+/g)[0];
		info[InfoVal+"_max"] = tmp.toString().match(/\d+/g)[1];
	}return;
}