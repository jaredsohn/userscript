// ==UserScript==
// @id				alipay_COD
// @name			支付宝COD账户明细
// @version			1.5
// @namespace		Blueria
// @author			Blueria
// @description		
// @require			http://code.jquery.com/jquery.min.js
// @include			https://cod.alipay.com/cod/settleOrderQuery.htm
// @icon			http://s3.amazonaws.com/uso_ss/icon/186335/large.png?1387346778
// @updateURL		http://userscripts.org/scripts/source/186335.meta.js
// @downloadURL		http://userscripts.org/scripts/source/186335.user.js
// @run-at			document-end
// @grant			none
// ==/UserScript==


//====================默认查询日期====================//
$("#J-start").val('2013-07-08');
$("#J-end").val('2013-07-08');

$(".page-next").each(function(){
	$(this).removeAttr('data-value').removeAttr('seed').removeAttr('smartracker');
});

//====================欢迎的显示与修改====================//
var welcome = $("#header .header-link");
var head_html = welcome.html();
if ( GM_getValue('name') ) resetUsername();
function resetUsername() {
	welcome.html( head_html.replace(/欢迎，.*\n/, "欢迎，"+GM_getValue('name')) );
}

//====================总交易信息====================//
var dealinfo = $("#dateBar.dateChoose-morerows .dateChoose span");
if ( GM_getValue('TotalDealInfo') ) resetDealInfo();
function resetDealInfo() {
	if (dealinfo.length != 6) return;
	var info = GM_getValue('TotalDealInfo');
	info = info.split('|');
	dealinfo.each(function(i){
		$(this).html(info[i]);
	});
}



var pagenum = 1;	//当前页码
//点击搜索按钮
$("#searchFormPost").click(function(){
	if ($("#J-noResult").length > 0) return true;	//如果下面无结果 原搜索生效
	GM_log('搜索按钮生效');
	var start = $("#J-start").val();
	var end = $("#J-end").val();
	var perday = GM_getValue('perday');
	perday = perday ? perday : 20;
	pagenum = 1;	//重置页码
	dateGenerator(start, end, perday) && tableGenerator();
	return false;
});

//数据表格生成器
function tableGenerator() {
	var data = GM_getValue('dataList');
	if ( !data ) {
		GM_notification("\n数据有误 请重新搜索", '错误提示');
		return;
	}
	data = data.split('|');
	var html = '';
	var price = GM_getValue('price');
	var fee = GM_getValue('fee');
	var profit = GM_getValue('profit');
	price = price ? price : '699.00';
	fee = fee ? fee : '-10.00';
	profit = profit ? profit : '699.00';
	GM_log('当前页码:'+pagenum);
	var start_i = (pagenum - 1) * 20;
	var max = pagenum * 20;
	for (i = 0; i < max; i ++) {
		if (i < start_i) continue;
		if ( !data[i] ) break;	//说明不到20个值
		var the_date = dateFormat(data[i]);	//当前日期
		html += '<tr><td><div class="date">'+the_date+'</div></td>';
		html += '<td><div class="orderNo">990815211</div></td>';
		html += '<td><div>'+price+'</div></td>';
		html += '<td><div>0.00</div></td>';
		html += '<td><div>'+fee+'</div></td>';
		html += '<td><div>0.00</div></td>';
		html += '<td><div>'+profit+'</div></td>';
		html += '<td><div class="operation-info"><a href="#" class="J-order-query">详情</a></div></td></tr>';
	}
	pagenum ++;
	var tbody = $(".tb-simple table tbody");
	tbody.empty();
	tbody.html(html);
	GM_notification("\n截图前别忘了修改页码\n\n点击页码 即可修改", '友情提醒');
}
function dateFormat(timestamp) {
	var ts = parseInt(timestamp);
	var D = new Date( ts );
	var Y = D.getFullYear();
	var m = D.getMonth() + 1;
	var d = D.getDate();
	var H = D.getHours() + 1;
	var i = D.getMinutes();
	var s = D.getSeconds();
	return Y+"-"+leading_zero(m)+"-"+leading_zero(d)+" "+leading_zero(H)+":"+leading_zero(i)+":"+leading_zero(s);
}
function leading_zero(num) {
	var str = String(num);
	if (str.length == 1) str = "0"+str;
	return str;
}

//分页按钮显示
$("#J-page").click(function(){
	var _this = $(this);
	_this.empty();
	var paging = '';
	$('<input type="text" size="3" />').appendTo(_this).focus().blur(function(){
		paging = $.trim( $(this).val() );
		if (paging == '') paging = '1/1';
		if (paging.indexOf('/') == -1) {
			GM_notification("\n必须用/分隔", '错误提示');
			$(this).val('').focus();
			return;
		}
		_this.html(paging);
		paging = paging.split('/');
		paginate(paging[0], paging[1]);
	});
});
function paginate(cur, total) {
	var cur = parseInt(cur);
	var total = parseInt(total);
	var prev = $(".page-previous");
	var next = $(".page-next");
	var home = $(".page-home");
	var end = $(".page-end");
	if (cur == total == 1) {
		prev.hide();home.hide(); next.hide();end.hide();
	}
	if (cur == 1 && total > 1) {
		next.show();end.show(); prev.hide();home.hide();
	}
	if (cur > 1 && cur < total) {
		prev.show();home.show(); next.show();end.show();
	}
	if (cur > 1 && cur == total) {
		prev.show();home.show(); next.hide();end.hide();
	}
}

//下一页按钮被点击
$(".page-next").click(function(e){
	tableGenerator();
	return false;
});

//时间生成器 时间格式[2013-10-12]
function dateGenerator(start, end, perday = 20) {
	var s_timestamp = Date.parse(start.replace(/-/g, '/'));
	var e_timestamp = Date.parse(end.replace(/-/g, '/'));
	var daycount = 0;
	var xiangcha = e_timestamp - s_timestamp;
	var oneday = 24*60*60*1000;	//一天的毫秒数
	if (xiangcha < 0) {
		GM_notification("\n结束时间不能小于开始时间", '错误提示');
		return false;
	} else if (xiangcha == 0) {
		daycount = 1;
	} else {
		daycount = parseInt( xiangcha/oneday ) + 1;
	}
	if (daycount > 3) {
		alert("只能生成3天内的数据 请重新选择\n如果防止让人看出你总是选择3天内的数据\n你可以在生成数据后再重新选择前后时间(不要点搜索)\n然后再截图");
		return false;
	}
	var dateArr = Array();
	for (I = daycount - 1; I >= 0; I --) {
		var curday = s_timestamp + oneday * I;	//这里的时间戳精确到天 单位是毫秒
		var the_time = blueria_rand(420, 1260, perday, 'desc');	//这里返回8点到22点之间的时间 单位是分
		for (J = 0; J < perday; J++) {
			if (J > 0) {
				if ((the_time[J-1] - the_time[J]) <= 5) continue;					//如果分钟间隔小于5分钟
			}
			dateArr.push(curday + the_time[J] * 60000 + rand(1, 59) * 1000);		//60x1000毫秒
		}
	}
	GM_setValue('dataList', dateArr.join('|'));	//保存时间列表 以|分隔
	GM_log('新数据已生成');
	return true;
}
//随机返回一个范围的数(两位数) 并排序
function blueria_rand(start_num, end_num, count, order = 'rand') {
	var arr = Array();
	for (i = 0; i < count; i++) {
		var r = rand(start_num, end_num);
		r += rand(1, 50);	//随机增点值
		r -= rand(5, 20);	//随机减点值
		r = String(r);
		if (r.length == 1) r = "0"+r;
		arr.push( r );
	}
	if (order == 'rand') return arr;

	var order_arr = arr.sort(function compare(a, b){
		return a-b;
	});
	if (order == 'asc') {
		return order_arr;
	} else if (order == 'desc') {
		return order_arr.reverse();
	}
}
function rand(start_num, end_num) {
	return Math.floor( Math.random() * (end_num - start_num + 1) ) + start_num;
}






//====================脚本菜单====================//
GM_registerMenuCommand("修改 用户名", modifyUsername);
function modifyUsername() {
	var saved = GM_getValue('name');
	saved = saved ? saved : '用户名';
	var val = prompt("输入新的用户名", saved);
	if (val == '') val = "空空空";
	GM_setValue('name', val);
	resetUsername();
}

GM_registerMenuCommand("修改 每天交易数", modifyPerday);
function modifyPerday() {
	var saved = GM_getValue('perday');
	saved = saved ? saved : 20;
	var val = prompt("输入每天交易数", saved);
	if (val == '') val = 20;
	GM_setValue('perday', val);
}

GM_registerMenuCommand("修改 商品价格", modifyPrice);
function modifyPrice() {
	var saved = GM_getValue('price');
	saved = saved ? saved : '699.00';
	var val = prompt("输入商品价格", saved);
	if (val == '') val = '100.00';
	GM_setValue('price', val);
}
GM_registerMenuCommand("修改 服务费", modifyFee);
function modifyFee() {
	var saved = GM_getValue('fee');
	saved = saved ? saved : '-10.00';
	var val = prompt("输入服务费", saved);
	if (val == '') val = '-10.00';
	GM_setValue('fee', val);
}
GM_registerMenuCommand("修改 实收金额", modifyProfit);
function modifyProfit() {
	var saved = GM_getValue('profit');
	saved = saved ? saved : "699.00";
	var val = prompt("输入实收金额", saved);
	if (val == '') val = '699.00';
	GM_setValue('profit', val);
}

GM_registerMenuCommand("修改 总交易信息", modifyTotalDealInfo);
function modifyTotalDealInfo() {
	var saved = GM_getValue('TotalDealInfo');
	saved = saved ? saved : "1000|2.00|3.00|-4.00|5.00|6.00";
	var val = prompt("按顺序输入[总笔数,商品价格总额,总运费,总服务费,总交易佣金,实收总金额] (用竖线隔开)", saved);
	var info = val.split('|');
	if (info.length != 6) {
		alert("共6项 你只输入了"+info.length+"项");
		return;
	}
	GM_setValue('TotalDealInfo', val);
	resetDealInfo();
}