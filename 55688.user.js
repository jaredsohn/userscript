// ==UserScript==
// @name           账族快速入账
// @namespace      zonezu
// @description    给账族增加一个快速入账的命令行
// @include        http://zonezu.com/daybook.jsp
// ==/UserScript==

/*

【参考示例】
	以下的“今天”以2009年8月15日为基准
	情景一：
		今天我拿到工资5000啦。
	命令：
		工资 +5000
	效果：
		切换到收入面板
		日期：2009-08-15	名称：工资	金额：5000
		帐户：工资卡(中行)	类别：工资

	情景二：
		昨天买了13元的水果
	命令：
		zt 水果 13 钱
	效果：
		日期：2009-08-14	名称：水果	金额：13
		帐户：我的钱包		类别：水果零食

	情景三：
		上个月7号出去黄山旅游了，玩的很开心，花了1000元，信用卡付的账
	命令：
		7-7 旅游 1000 信用卡 @黄山好漂亮，玩的好开心！！！！
	效果：
		日期：2009-07-07	名称：旅游	金额：1000
		帐户：信用卡(工行)	类别：旅游娱乐
		备注：黄山好漂亮，玩的好开心！！！！

【参数说明】
	[日期] 名称 金额 [帐户] [类别] [@备注]
	输入时候会动态修改下面的内容，确认无误后按回车即可提交。

	日期：可选参数
	3		三天前
	zt		昨天
	昨天		昨天
	qt		前天
	前天		前天
	jt		今天(不输入日期默认就是今天，这是为了某些强迫症患者而准备的。)
	今天		今天
	3-18		表示3月18日。如果今年的3月18日还没到，则自动设置为去年3月18日。

	名称：
	无特殊格式，唯一限制是不能有空格。
	当“帐户”和“类别”没有输入的时候，这两项的值就等于“名称”，会用于查找对应的选项。（见例一）

	金额：
	300		支出300元
	+300		收入300元
	可以进行简单运算例如：
	3*4-40

	帐户：可选参数
	无特殊格式，唯一限制是不能有空格。
	用于匹配帐户下拉列表框，无需完整输入，部分输入亦可找到。
	暂不支持首字母输入。可以手工修改帐户名称，加入首字母。

	类别：可选参数
	无特殊格式，唯一限制是不能有空格。
	用于匹配类别下拉列表框，无需完整输入，部分输入亦可找到。
	暂不支持首字母输入。可以手工修改类别名称，加入首字母。

	备注：可选参数
	备注前面需要加上一个@符号。
	之后的内容可以随意输入任意个空格。（见例三）

*/
var $=unsafeWindow.jQuery;
$("#idTabDiv").before(
	"<div class='action_tab' style='background:#eee;display:block;'>"+
		"<table style='width:100%;' cellspacing='0' cellpadding='0'><tr>"+
			"<td width='8%'>命 令</td>"+
			"<td colspan='4'  align='left'><input id='quickcmd' type='input' style='width:95%;'/></td>"+
			"<td width='26%'>&nbsp;</td>"+
		"</tr></table>"+
	"</div>"
);
function date2str(d) {
	try {
		d.getFullYear();
	}
	catch (e) {
		d=new Date();
	}finally{
		return (d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()).replace(/\b(\w)\b/g, '0$1');
	}
}
$("#quickcmd").keyup(function(e) {
	var q=this.value.split("@"),qdate=0,note=q[1];
	q=q[0].split(" ");
	if (q[0].match(/\d+/)) {
		qdate=q.shift();
		qdate=qdate.split("-");
		if (qdate[1]) {
			var tmp=new Date();
			tmp.setMonth(qdate[0]-1,qdate[1]);
			qdate=tmp;
			if (+qdate>+new Date) {
				qdate.setFullYear(new Date().getFullYear()-1);
			}
		}else {
			qdate=new Date(+new Date-parseInt(qdate)*86400000);
		}
		document.title=qdate;
	}
	if (q[0]&&q[0].length>1&&"ztqtjt昨天前天今天".indexOf(q[0])>-1) {
		qdate=q.shift();
		qdate={jt:0,zt:1,qt:2,"今天":0,"昨天":1,"前天":2}[qdate];
		qdate=new Date(+new Date-qdate*86400000);
	}
	$("#idDateExpense,#idDateIncome").val(date2str(qdate));
	$("#idDaybookNameExpense,#idDaybookNameIncome").val(q[0]);
	$("#idAccountSelectExpense,#idAccountSelectIncome").find("option:contains("+(q[2]||q[0])+")").attr("selected",true);
	$("#idCategoryExpense,#idCategoryIncome").find("option:contains("+(q[3]||q[0])+")").attr("selected",true);
	$("#idRemarkExpense,#idRemarkIncome").val(note);

	if (!q[1])return ;
	if (q[1].substr(0,1)!="+") {
		$("#idDaybookTab>td").eq(1).click();
		q[1]&&q[1].match(/\d+/)&&$("#idExpenseAmount").val(Math.abs(eval(q[1])));
	}else {
		$("#idDaybookTab>td").eq(2).click();
		q[1]&&q[1].match(/\d+/)&&$("#idAmountIncome").val(Math.abs(eval(q[1])));
	}
	if (e.which==13) {
		$("#idTabDiv>div:visible input:submit").attr("onclick")();
		$(this).val("");
	}
}).focus();