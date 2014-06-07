// ==UserScript==
// @name           BDWM IP Lookup
// @author         FelixH
// @namespace      http://userscripts.org/scripts/show/134688
// @include        http://www.bdwm.net/*
// @include        http://bbs.pku6.edu.cn/*
// @include        http://bbs.pku.edu.cn/*
// @include        http://162.105.205.23/*
// @description    Append all IP addresses with domain name if available.
// @grant          none
// @version 1.2.7
// ==/UserScript==
//在此感谢在networking版发布ip信息的网友！
//1.2.7 - 2013.1.2

//add 对http://bbs.pku.edu.cn/登录方式的支持
//add 对http://162.105.205.23/登录方式的支持
//add 工学院一号楼
//fix 理教四楼
//add 英杰交流中心 二层 第八会议室
//add 哲学楼
//fix 理教一楼


function ip2num(ip){
	var arr = ip.split(".");
	return parseInt(arr[0]-128)*16777216 + parseInt(arr[1])*65535 + parseInt(arr[2])*256 + parseInt(arr[3]);
	
}
function judge_ip(target_ip,startip,endip){
	start_ip = ip2num(startip);
	end_ip = ip2num(endip);
	if(end_ip>start_ip+65535){
		return false;
	}
	if (target_ip>=start_ip && target_ip<=end_ip){
		return true;
	}
	return false;
}
function getLoc(ip){
//PKU IP 库 Ver 3.8
//在那之后有过一定的改动
//change log: http://www.bdwm.net/bbs/bbstcon.php?board=Networking&threadid=13765952
target_ip = ip2num(ip);
//sqrt(285)==17
	if (target_ip<=ip2num('115.27.37.255')){
		if (judge_ip(target_ip,'61.50.221.43','61.50.221.43')) return '软件与微电子学院';
		if (judge_ip(target_ip,'61.50.221.84','61.50.221.231')) return '软件与微电子学院';
		if (judge_ip(target_ip,'61.50.221.247','61.50.221.255')) return '软件与微电子学院';
		if (judge_ip(target_ip,'115.27.0.0','115.27.15.255')) return '未知|请至Networking版报告位置#1';
		if (judge_ip(target_ip,'115.27.16.0','115.27.18.255')) return '一教无线';
		if (judge_ip(target_ip,'115.27.19.0','115.27.19.255')) return '理教无线';
		if (judge_ip(target_ip,'115.27.20.0','115.27.20.255')) return '国关楼无线';
		if (judge_ip(target_ip,'115.27.21.0','115.27.21.255')) return '万柳自习室';
		if (judge_ip(target_ip,'115.27.22.0','115.27.22.255')) return '一教二楼无线/文史楼';
		if (judge_ip(target_ip,'115.27.23.0','115.27.23.255')) return '文史楼无线';
		if (judge_ip(target_ip,'115.27.24.0','115.27.26.255')) return '理教无线';
		if (judge_ip(target_ip,'115.27.27.0','115.27.27.255')) return '理教三层无线';
		if (judge_ip(target_ip,'115.27.28.0','115.27.33.255')) return '三教无线';
		if (judge_ip(target_ip,'115.27.34.0','115.27.34.255')) return '三教四教无线';
		if (judge_ip(target_ip,'115.27.35.0','115.27.35.255')) return '三教四层无线';//13945
		if (judge_ip(target_ip,'115.27.36.0','115.27.36.255')) return '图书馆4楼期刊阅览室';//14055
		if (judge_ip(target_ip,'115.27.37.0','115.27.37.255')) return '图书馆工具书阅览室';
		return '校外IP';
	}
	if (target_ip<=ip2num('115.27.70.255')){
		if (judge_ip(target_ip,'115.27.38.0','115.27.41.255')) return '图书馆无线';
		if (judge_ip(target_ip,'115.27.42.0','115.27.42.255')) return '图书馆四楼期刊无线';
		if (judge_ip(target_ip,'115.27.43.0','115.27.47.255')) return '图书馆无线';
		if (judge_ip(target_ip,'115.27.48.0','115.27.51.255')) return '未知|请至Networking版报告位置#2';
		if (judge_ip(target_ip,'115.27.52.0','115.27.52.255')) return '百年纪念讲堂无线';
		if (judge_ip(target_ip,'115.27.53.0','115.27.53.255')) return '红二楼无线';
		if (judge_ip(target_ip,'115.27.54.0','115.27.55.255')) return '未名湖/朗润园无线';
		if (judge_ip(target_ip,'115.27.56.0','115.27.56.255')) return '教育学院无线';
		if (judge_ip(target_ip,'115.27.57.0','115.27.57.255')) return '未知|请至Networking版报告位置#3';
		if (judge_ip(target_ip,'115.27.58.0','115.27.58.255')) return '化院（东门外）';
		if (judge_ip(target_ip,'115.27.59.0','115.27.59.255')) return '未知|请至Networking版报告位置#4';
		if (judge_ip(target_ip,'115.27.60.0','115.27.60.255')) return '计算中心无线';
		if (judge_ip(target_ip,'115.27.61.0','115.27.63.255')) return '理科一号楼无线';
		if (judge_ip(target_ip,'115.27.64.0','115.27.64.255')) return '新光华楼无线';
		if (judge_ip(target_ip,'115.27.65.0','115.27.66.255')) return '老光华楼/电教无线';
		if (judge_ip(target_ip,'115.27.67.0','115.27.67.255')) return '老光华楼无线';
		if (judge_ip(target_ip,'115.27.68.0','115.27.70.255')) return '二教一楼无线';
		return '校外IP';
	}
	if (target_ip<=ip2num('115.27.139.255')){
		if (judge_ip(target_ip,'115.27.71.0','115.27.71.255')) return '二教二楼无线';
		if (judge_ip(target_ip,'115.27.72.0','115.27.75.255')) return '二教一/二楼无线';
		if (judge_ip(target_ip,'115.27.76.0','115.27.76.255')) return '二教四楼无线';
		if (judge_ip(target_ip,'115.27.77.0','115.27.78.255')) return '二教四楼无线';
		if (judge_ip(target_ip,'115.27.79.0','115.27.79.255')) return '二教四/五楼无线';
		if (judge_ip(target_ip,'115.27.80.0','115.27.80.255')) return '二教无线';
		if (judge_ip(target_ip,'115.27.81.0','115.27.81.255')) return '二教五楼无线';
		if (judge_ip(target_ip,'115.27.82.0','115.27.83.255')) return '未知|请至Networking版报告位置#5';
		if (judge_ip(target_ip,'115.27.84.0','115.27.84.255')) return '法学院图书馆无线/理教三楼';//14576
		if (judge_ip(target_ip,'115.27.85.0','115.27.85.255')) return '理教三楼';//14041
		if (judge_ip(target_ip,'115.27.86.0','115.27.86.255')) return '未知|请至Networking版报告位置#6';
		if (judge_ip(target_ip,'115.27.87.0','115.27.87.255')) return '理教';//14199
		if (judge_ip(target_ip,'115.27.88.0','115.27.88.255')) return '理教四楼';//14211,14264,14410
		if (judge_ip(target_ip,'115.27.89.0','115.27.89.255')) return '理教四楼';//14164
		if (judge_ip(target_ip,'115.27.90.0','115.27.90.255')) return '理教四楼';//13937
		if (judge_ip(target_ip,'115.27.91.0','115.27.91.255')) return '理教';//14159
		if (judge_ip(target_ip,'115.27.92.0','115.27.92.255')) return '理教三楼无线/微纳电子大厦 四层/理教一楼';//14448
		if (judge_ip(target_ip,'115.27.93.0','115.27.93.255')) return '理教三楼四楼/理教一层';//14541
		if (judge_ip(target_ip,'115.27.94.0','115.27.94.255')) return '理教三楼四楼';
		if (judge_ip(target_ip,'115.27.95.0','115.27.95.255')) return '理教一楼';
		if (judge_ip(target_ip,'115.27.96.0','115.27.97.255')) return '理教二楼/理教三楼';//14051
		if (judge_ip(target_ip,'115.27.98.0','115.27.99.255')) return '理教三楼';
		if (judge_ip(target_ip,'115.27.100.0','115.27.100.255')) return '理教四楼无线';
		if (judge_ip(target_ip,'115.27.101.0','115.27.108.255')) return '未知|请至Networking版报告位置#8_1_2';
		if (judge_ip(target_ip,'115.27.109.0','115.27.109.255')) return '朗润园万众楼无线 中国经济研究中心';
		if (judge_ip(target_ip,'115.27.110.0','115.27.116.255')) return '未知|请至Networking版报告位置#8_2_1';
		if (judge_ip(target_ip,'115.27.117.0','115.27.117.255')) return '工学院一号楼';//14354
		if (judge_ip(target_ip,'115.27.118.0','115.27.118.255')) return '化学与分子工程学院';
		if (judge_ip(target_ip,'115.27.119.0','115.27.125.255')) return '未知|请至Networking版报告位置#8_2_2';
		if (judge_ip(target_ip,'115.27.126.0','115.27.126.255')) return '英杰交流中心 二层 第八会议室';//14433
		if (judge_ip(target_ip,'115.27.127.0','115.27.127.255')) return '英杰交流大厅月光厅';//14088
		if (judge_ip(target_ip,'115.27.128.0','115.27.129.255')) return '28楼无线';
		if (judge_ip(target_ip,'115.27.130.0','115.27.130.255')) return '28/29楼无线';
		if (judge_ip(target_ip,'115.27.131.0','115.27.139.255')) return '28楼无线';
		return '校外IP';
	}
	if (target_ip<=ip2num('162.105.16.255')){
		if (judge_ip(target_ip,'115.27.140.0','115.27.255.255')) return '未知|请至Networking版报告位置#8';
		if (judge_ip(target_ip,'124.17.17.0','124.17.18.255')) return '计算中心';
		if (judge_ip(target_ip,'162.105.0.0','162.105.2.255')) return '未知|请至Networking版报告位置#9';
		if (judge_ip(target_ip,'162.105.3.0','162.105.3.255')) return '无线网络1/覆盖图书馆/一教/电教';
		if (judge_ip(target_ip,'162.105.4.0','162.105.4.255')) return '未知|请至Networking版报告位置#10';
		if (judge_ip(target_ip,'162.105.5.0','162.105.5.255')) return '师生缘无线/各食堂';
		if (judge_ip(target_ip,'162.105.6.0','162.105.6.255')) return '核磁共振中心/老生物楼';
		if (judge_ip(target_ip,'162.105.7.0','162.105.7.255')) return '理科二号楼/法学楼';
		if (judge_ip(target_ip,'162.105.8.0','162.105.8.255')) return '红一楼/红二楼/研究生院';
		if (judge_ip(target_ip,'162.105.9.0','162.105.9.255')) return '红四楼';
		if (judge_ip(target_ip,'162.105.10.0','162.105.10.255')) return '考古楼/红楼';
		if (judge_ip(target_ip,'162.105.11.0','162.105.11.255')) return '校医院/静园两侧各院/哲学楼';//14483
		if (judge_ip(target_ip,'162.105.12.0','162.105.12.255')) return '中国经济研究中心机房';
		if (judge_ip(target_ip,'162.105.13.0','162.105.13.255')) return '信息管理系';
		if (judge_ip(target_ip,'162.105.14.0','162.105.14.255')) return '电教';
		if (judge_ip(target_ip,'162.105.15.0','162.105.15.255')) return '老光华楼';
		if (judge_ip(target_ip,'162.105.16.0','162.105.16.255')) return '生物技术楼/老生物楼';
		return '校外IP';
	}
	if (target_ip<=ip2num('162.105.39.255')){
		if (judge_ip(target_ip,'162.105.17.0','162.105.17.255')) return '遥感所';
		if (judge_ip(target_ip,'162.105.18.0','162.105.18.255')) return '哲学楼';
		if (judge_ip(target_ip,'162.105.19.0','162.105.19.255')) return '逸夫二楼';
		if (judge_ip(target_ip,'162.105.20.0','162.105.20.255')) return '逸夫二楼';
		if (judge_ip(target_ip,'162.105.21.0','162.105.21.255')) return '物理楼';
		if (judge_ip(target_ip,'162.105.22.0','162.105.22.255')) return '化学与分子工程学院';
		if (judge_ip(target_ip,'162.105.23.0','162.105.23.255')) return '地球物理系';
		if (judge_ip(target_ip,'162.105.24.0','162.105.24.255')) return '电教';
		if (judge_ip(target_ip,'162.105.25.0','162.105.25.255')) return '力学楼';
		if (judge_ip(target_ip,'162.105.26.0','162.105.26.255')) return '电子系';
		if (judge_ip(target_ip,'162.105.27.0','162.105.27.255')) return '化学与分子工程学院';
		if (judge_ip(target_ip,'162.105.28.0','162.105.28.255')) return '图书馆';
		if (judge_ip(target_ip,'162.105.29.0','162.105.29.255')) return '老光华楼机房';
		if (judge_ip(target_ip,'162.105.30.0','162.105.30.255')) return '理科一号楼/计算机系';
		if (judge_ip(target_ip,'162.105.31.0','162.105.31.255')) return '计算中心机房';
		if (judge_ip(target_ip,'162.105.32.0','162.105.35.255')) return '45楼';
		if (judge_ip(target_ip,'162.105.36.0','162.105.39.255')) return '46楼';
		return '校外IP';
	}
	if (target_ip<=ip2num('162.105.75.255')){
		if (judge_ip(target_ip,'162.105.40.0','162.105.43.255')) return '47楼';
		if (judge_ip(target_ip,'162.105.44.0','162.105.44.255')) return '44/48楼';
		if (judge_ip(target_ip,'162.105.45.0','162.105.47.255')) return '48楼';
		if (judge_ip(target_ip,'162.105.48.0','162.105.48.255')) return '25楼';
		if (judge_ip(target_ip,'162.105.49.0','162.105.49.255')) return '30楼';
		if (judge_ip(target_ip,'162.105.50.0','162.105.51.255')) return '45乙楼';
		if (judge_ip(target_ip,'162.105.52.0','162.105.55.255')) return '45甲';
		if (judge_ip(target_ip,'162.105.56.0','162.105.56.255')) return '畅春新园4#3/4楼';
		if (judge_ip(target_ip,'162.105.57.0','162.105.57.255')) return '45甲';
		if (judge_ip(target_ip,'162.105.58.0','162.105.63.255')) return '燕北园';
		if (judge_ip(target_ip,'162.105.64.0','162.105.67.255')) return '理教机房/计算中心';
		if (judge_ip(target_ip,'162.105.68.0','162.105.68.255')) return '理科一号楼/数学系';
		if (judge_ip(target_ip,'162.105.69.0','162.105.70.255')) return '理科二号楼/数学系';
		if (judge_ip(target_ip,'162.105.71.0','162.105.71.255')) return '理科二号楼/信科';
		if (judge_ip(target_ip,'162.105.72.0','162.105.72.255')) return '理科二号楼';
		if (judge_ip(target_ip,'162.105.73.0','162.105.73.255')) return '理科二号楼/地球物理系';
		if (judge_ip(target_ip,'162.105.74.0','162.105.75.255')) return '理科二号楼/电子系';
		return '校外IP';
	}
	if (target_ip<=ip2num('162.105.94.255')){
		if (judge_ip(target_ip,'162.105.76.0','162.105.76.255')) return '理科二号楼-电子系/地球物理系';
		if (judge_ip(target_ip,'162.105.77.0','162.105.77.255')) return '理科二号楼/交流中心';
		if (judge_ip(target_ip,'162.105.78.0','162.105.78.255')) return '理科二号楼/交流中心';
		if (judge_ip(target_ip,'162.105.79.0','162.105.79.255')) return '理科一号楼';
		if (judge_ip(target_ip,'162.105.80.0','162.105.80.255')) return '理科一号楼/信科';
		if (judge_ip(target_ip,'162.105.81.0','162.105.81.255')) return '交流中心';
		if (judge_ip(target_ip,'162.105.82.0','162.105.82.255')) return '畅春新园1#1/2/3楼';
		if (judge_ip(target_ip,'162.105.83.0','162.105.83.255')) return '畅春新园1#4/5/6楼';
		if (judge_ip(target_ip,'162.105.84.0','162.105.84.255')) return '畅春新园2#2楼';
		if (judge_ip(target_ip,'162.105.85.0','162.105.85.255')) return '畅春新园2#1/4/5楼';
		if (judge_ip(target_ip,'162.105.86.0','162.105.86.255')) return '畅春新园2#6楼|3#1/2楼';
		if (judge_ip(target_ip,'162.105.87.0','162.105.87.255')) return '畅春新园2#3楼|3#5/6楼';
		if (judge_ip(target_ip,'162.105.88.0','162.105.88.255')) return '畅春新园4#1/2楼';
		if (judge_ip(target_ip,'162.105.89.0','162.105.89.255')) return '26楼';
		if (judge_ip(target_ip,'162.105.90.0','162.105.92.255')) return '28楼';
		if (judge_ip(target_ip,'162.105.93.0','162.105.93.255')) return '28/29楼';
		if (judge_ip(target_ip,'162.105.94.0','162.105.94.255')) return '29楼';
		return '校外IP';
	}
	if (target_ip<=ip2num('162.105.114.255')){
		if (judge_ip(target_ip,'162.105.95.0','162.105.95.255')) return '29/31楼';
		if (judge_ip(target_ip,'162.105.96.0','162.105.98.255')) return '31楼';
		if (judge_ip(target_ip,'162.105.99.0','162.105.99.255')) return '45甲';
		if (judge_ip(target_ip,'162.105.100.0','162.105.100.255')) return '45甲';//14187
		if (judge_ip(target_ip,'162.105.101.0','162.105.101.255')) return '34A楼4/5/6楼';
		if (judge_ip(target_ip,'162.105.102.0','162.105.103.255')) return '35楼';
		if (judge_ip(target_ip,'162.105.104.0','162.105.104.255')) return '32楼';
		if (judge_ip(target_ip,'162.105.105.0','162.105.105.255')) return '36楼1/2楼';
		if (judge_ip(target_ip,'162.105.106.0','162.105.106.255')) return '36楼2/3/4楼';
		if (judge_ip(target_ip,'162.105.107.0','162.105.107.255')) return '勺园';
		if (judge_ip(target_ip,'162.105.108.0','162.105.108.255')) return '畅春新园4#5/6楼';
		if (judge_ip(target_ip,'162.105.109.0','162.105.109.255')) return '畅春新园3#3/4楼';
		if (judge_ip(target_ip,'162.105.110.0','162.105.110.255')) return '36楼';
		if (judge_ip(target_ip,'162.105.111.0','162.105.111.255')) return '34A楼1/2/3楼';
		if (judge_ip(target_ip,'162.105.112.0','162.105.113.255')) return '勺园';
		if (judge_ip(target_ip,'162.105.114.0','162.105.114.255')) return '21/22/24楼';
		return '校外IP';
	}
	if (target_ip<=ip2num('162.105.136.255')){
		if (judge_ip(target_ip,'162.105.115.0','162.105.115.255')) return '20楼';
		if (judge_ip(target_ip,'162.105.116.0','162.105.116.255')) return '36楼4/5楼';
		if (judge_ip(target_ip,'162.105.117.0','162.105.117.255')) return '36楼5/6楼';
		if (judge_ip(target_ip,'162.105.118.0','162.105.118.255')) return '37楼1/2楼';
		if (judge_ip(target_ip,'162.105.119.0','162.105.119.255')) return '37楼2/3楼';
		if (judge_ip(target_ip,'162.105.120.0','162.105.120.255')) return '37楼3/4/5/6楼';
		if (judge_ip(target_ip,'162.105.121.0','162.105.121.255')) return '37楼3/4/5/6楼';
		if (judge_ip(target_ip,'162.105.122.0','162.105.122.255')) return '中国古代史研究中心';
		if (judge_ip(target_ip,'162.105.123.0','162.105.123.255')) return '方正集团';
		if (judge_ip(target_ip,'162.105.124.0','162.105.124.255')) return '外文楼';
		if (judge_ip(target_ip,'162.105.125.0','162.105.125.255')) return '勺园';
		if (judge_ip(target_ip,'162.105.126.0','162.105.128.255')) return '科技发展中心';
		if (judge_ip(target_ip,'162.105.129.0','162.105.130.255')) return '计算中心';
		if (judge_ip(target_ip,'162.105.131.0','162.105.131.255')) return '未知|请至Networking版报告位置#11';
		if (judge_ip(target_ip,'162.105.132.0','162.105.132.255')) return '理科一号楼';
		if (judge_ip(target_ip,'162.105.133.0','162.105.135.255')) return '未知|请至Networking版报告位置#12';
		if (judge_ip(target_ip,'162.105.136.0','162.105.136.255')) return '图书馆';
		return '校外IP';
	}
	if (target_ip<=ip2num('162.105.155.255')){
		if (judge_ip(target_ip,'162.105.137.0','162.105.137.255')) return '电教中心';
		if (judge_ip(target_ip,'162.105.138.0','162.105.138.255')) return '图书馆';
		if (judge_ip(target_ip,'162.105.139.0','162.105.139.255')) return '图书馆/《科学》杂志社';
		if (judge_ip(target_ip,'162.105.140.0','162.105.141.255')) return '图书馆';
		if (judge_ip(target_ip,'162.105.142.0','162.105.142.255')) return '教育学院';
		if (judge_ip(target_ip,'162.105.143.0','162.105.143.255')) return '技物楼';
		if (judge_ip(target_ip,'162.105.144.0','162.105.145.255')) return '未知|请至Networking版报告位置#13';
		if (judge_ip(target_ip,'162.105.146.0','162.105.146.255')) return '理科一号楼计算机系';
		if (judge_ip(target_ip,'162.105.147.0','162.105.147.255')) return '加速器楼';
		if (judge_ip(target_ip,'162.105.148.0','162.105.148.255')) return '逸夫一楼/法律系';
		if (judge_ip(target_ip,'162.105.149.0','162.105.149.255')) return '逸夫二楼';
		if (judge_ip(target_ip,'162.105.150.0','162.105.150.255')) return '经济中心';
		if (judge_ip(target_ip,'162.105.151.0','162.105.151.255')) return '未名湖无线';
		if (judge_ip(target_ip,'162.105.152.0','162.105.152.255')) return '未知|请至Networking版报告位置#14';
		if (judge_ip(target_ip,'162.105.153.0','162.105.153.255')) return '新化学楼';
		if (judge_ip(target_ip,'162.105.154.0','162.105.154.255')) return '未知|请至Networking版报告位置#15';
		if (judge_ip(target_ip,'162.105.155.0','162.105.155.255')) return '资源大厦';
		return '校外IP';
	}
	if (target_ip<=ip2num('162.105.175.255')){
		if (judge_ip(target_ip,'162.105.156.0','162.105.156.255')) return '郎润园';
		if (judge_ip(target_ip,'162.105.157.0','162.105.157.255')) return '老地学楼';
		if (judge_ip(target_ip,'162.105.158.0','162.105.158.255')) return '数学学院';
		if (judge_ip(target_ip,'162.105.159.0','162.105.159.255')) return '物理系';
		if (judge_ip(target_ip,'162.105.160.0','162.105.160.255')) return '现代物理中心';
		if (judge_ip(target_ip,'162.105.161.0','162.105.161.255')) return '老化学楼';
		if (judge_ip(target_ip,'162.105.162.0','162.105.163.255')) return '方正大厦';
		if (judge_ip(target_ip,'162.105.164.0','162.105.164.255')) return '廖凯原楼';
		if (judge_ip(target_ip,'162.105.165.0','162.105.165.255')) return '廖凯原楼';
		if (judge_ip(target_ip,'162.105.166.0','162.105.166.255')) return '老地学楼(环境学院)';
		if (judge_ip(target_ip,'162.105.167.0','162.105.167.255')) return '未知|请至Networking版报告位置#16';
		if (judge_ip(target_ip,'162.105.168.0','162.105.168.255')) return '昌平校区';
		if (judge_ip(target_ip,'162.105.169.0','162.105.169.255')) return '经济中心';
		if (judge_ip(target_ip,'162.105.170.0','162.105.170.255')) return '计算所';
		if (judge_ip(target_ip,'162.105.171.0','162.105.171.255')) return '45乙楼4层';
		if (judge_ip(target_ip,'162.105.172.0','162.105.174.255')) return '45乙楼';
		if (judge_ip(target_ip,'162.105.175.0','162.105.175.255')) return '万柳学区3区';
		return '校外IP';
	}
	if (target_ip<=ip2num('162.105.194.255')){
		if (judge_ip(target_ip,'162.105.176.0','162.105.176.255')) return '心理系';
		if (judge_ip(target_ip,'162.105.177.0','162.105.177.255')) return '物化所';
		if (judge_ip(target_ip,'162.105.178.0','162.105.178.255')) return '信息中心';
		if (judge_ip(target_ip,'162.105.179.0','162.105.179.255')) return '计算机系';
		if (judge_ip(target_ip,'162.105.180.0','162.105.180.255')) return '地质系';
		if (judge_ip(target_ip,'162.105.181.0','162.105.181.255')) return '红五楼';
		if (judge_ip(target_ip,'162.105.182.0','162.105.182.255')) return '光华管理学院';
		if (judge_ip(target_ip,'162.105.183.0','162.105.184.255')) return '计算所';
		if (judge_ip(target_ip,'162.105.185.0','162.105.185.255')) return '朗润园';
		if (judge_ip(target_ip,'162.105.186.0','162.105.187.255')) return '西二旗';
		if (judge_ip(target_ip,'162.105.188.0','162.105.188.255')) return '出版社';
		if (judge_ip(target_ip,'162.105.189.0','162.105.189.255')) return '勺园';
		if (judge_ip(target_ip,'162.105.190.0','162.105.190.255')) return '行政管理系';
		if (judge_ip(target_ip,'162.105.191.0','162.105.191.255')) return '人口所';
		if (judge_ip(target_ip,'162.105.192.0','162.105.192.255')) return '全斋';
		if (judge_ip(target_ip,'162.105.193.0','162.105.193.255')) return '社会学系';
		if (judge_ip(target_ip,'162.105.194.0','162.105.194.255')) return '马列学院';
		return '校外IP';
	}
	if (target_ip<=ip2num('162.105.216.255')){
		if (judge_ip(target_ip,'162.105.195.0','162.105.195.255')) return '力学大院';
		if (judge_ip(target_ip,'162.105.196.0','162.105.196.255')) return '畅春园52楼';
		if (judge_ip(target_ip,'162.105.197.0','162.105.198.255')) return '承泽园';
		if (judge_ip(target_ip,'162.105.199.0','162.105.199.255')) return '畅春园61楼';
		if (judge_ip(target_ip,'162.105.200.0','162.105.200.255')) return '畅春园62楼';
		if (judge_ip(target_ip,'162.105.201.0','162.105.201.255')) return '微纳电子大厦 四层';
		if (judge_ip(target_ip,'162.105.202.0','162.105.202.255')) return '青鸟公寓';
		if (judge_ip(target_ip,'162.105.203.0','162.105.203.255')) return '理科一号楼/信科';
		if (judge_ip(target_ip,'162.105.204.0','162.105.204.255')) return '理科二号楼/计算中心';
		if (judge_ip(target_ip,'162.105.205.0','162.105.205.255')) return '中文系';
		if (judge_ip(target_ip,'162.105.206.0','162.105.206.255')) return '方正大厦';
		if (judge_ip(target_ip,'162.105.207.0','162.105.207.255')) return '北佳/资源公司';
		if (judge_ip(target_ip,'162.105.208.0','162.105.208.255')) return 'VPN';
		if (judge_ip(target_ip,'162.105.209.0','162.105.209.255')) return '畅春园61甲';
		if (judge_ip(target_ip,'162.105.210.0','162.105.212.255')) return '万柳1区';
		if (judge_ip(target_ip,'162.105.213.0','162.105.215.255')) return '万柳2区';
		if (judge_ip(target_ip,'162.105.216.0','162.105.216.255')) return '万柳3区';
		return '校外IP';
	}
	if (target_ip<=ip2num('162.105.233.255')){
		if (judge_ip(target_ip,'162.105.217.0','162.105.217.255')) return '畅春园60甲楼';
		if (judge_ip(target_ip,'162.105.218.0','162.105.218.255')) return '畅春园63楼';
		if (judge_ip(target_ip,'162.105.219.0','162.105.219.255')) return '畅春园64楼';
		if (judge_ip(target_ip,'162.105.220.0','162.105.220.255')) return '畅春园64楼';
		if (judge_ip(target_ip,'162.105.221.0','162.105.221.255')) return '畅春园65楼';
		if (judge_ip(target_ip,'162.105.222.0','162.105.222.255')) return '畅春园65楼';
		if (judge_ip(target_ip,'162.105.223.0','162.105.223.255')) return '万柳3区';
		if (judge_ip(target_ip,'162.105.224.0','162.105.224.255')) return '未知|请至Networking版报告位置#17';
		if (judge_ip(target_ip,'162.105.225.0','162.105.225.255')) return '38楼5/6楼';
		if (judge_ip(target_ip,'162.105.226.0','162.105.226.255')) return '南阁';
		if (judge_ip(target_ip,'162.105.227.0','162.105.227.255')) return '海外教育学院';
		if (judge_ip(target_ip,'162.105.228.0','162.105.228.255')) return '财务处';
		if (judge_ip(target_ip,'162.105.229.0','162.105.229.255')) return '38/39楼地下';
		if (judge_ip(target_ip,'162.105.230.0','162.105.230.255')) return '电教楼';
		if (judge_ip(target_ip,'162.105.231.0','162.105.231.255')) return '办公楼';
		if (judge_ip(target_ip,'162.105.232.0','162.105.232.255')) return '党办/校办/财务处';
		if (judge_ip(target_ip,'162.105.233.0','162.105.233.255')) return '39楼1/2楼';
		return '校外IP';
	}
	if (target_ip<=ip2num('202.112.177.255')){
		if (judge_ip(target_ip,'162.105.234.0','162.105.234.255')) return '39楼2/3楼';
		if (judge_ip(target_ip,'162.105.235.0','162.105.235.255')) return '39楼3/4/5楼';
		if (judge_ip(target_ip,'162.105.236.0','162.105.236.255')) return '39楼5/6楼';
		if (judge_ip(target_ip,'162.105.237.0','162.105.237.255')) return '38楼1/2楼';
		if (judge_ip(target_ip,'162.105.238.0','162.105.238.255')) return '38楼3/4楼';
		if (judge_ip(target_ip,'162.105.239.0','162.105.239.255')) return '软件与微电子学院(大兴)';
		if (judge_ip(target_ip,'162.105.240.0','162.105.242.255')) return '蓝旗营';
		if (judge_ip(target_ip,'162.105.243.0','162.105.243.255')) return '物理学院';
		if (judge_ip(target_ip,'162.105.244.0','162.105.244.255')) return '技物楼';
		if (judge_ip(target_ip,'162.105.245.0','162.105.246.255')) return '物理学院';
		if (judge_ip(target_ip,'162.105.247.0','162.105.247.255')) return '物理学院/电子系/燕东园/出版社';
		if (judge_ip(target_ip,'162.105.248.0','162.105.250.255')) return '新生物楼';
		if (judge_ip(target_ip,'162.105.251.0','162.105.252.255')) return '未知|请至Networking版报告位置#18';
		if (judge_ip(target_ip,'162.105.253.0','162.105.254.255')) return '交换机';
		if (judge_ip(target_ip,'162.105.255.0','162.105.255.255')) return '未知|请至Networking版报告位置#19';
		if (judge_ip(target_ip,'202.112.176.0','202.112.176.255')) return '医学部 中心楼';
		if (judge_ip(target_ip,'202.112.177.0','202.112.177.255')) return '医学部 逸夫楼';
		return '校外IP';
	}
	if (target_ip<=ip2num('202.112.188.0')){
		if (judge_ip(target_ip,'202.112.178.0','202.112.178.255')) return '医学部 公卫学院';
		if (judge_ip(target_ip,'202.112.179.0','202.112.179.255')) return '医学部 药学院';
		if (judge_ip(target_ip,'202.112.180.0','202.112.180.255')) return '医学部 基础医学院';
		if (judge_ip(target_ip,'202.112.181.0','202.112.181.19')) return '医学部 医学图书馆';
		if (judge_ip(target_ip,'202.112.181.21','202.112.181.39')) return '医学部 医学图书馆';
		if (judge_ip(target_ip,'202.112.181.41','202.112.181.255')) return '医学部 医学图书馆';
		if (judge_ip(target_ip,'202.112.182.0','202.112.182.255')) return '医学部 行政楼/后勤楼';
		if (judge_ip(target_ip,'202.112.183.0','202.112.183.255')) return '医学部 公共卫生学院';
		if (judge_ip(target_ip,'202.112.184.0','202.112.184.87')) return '医学部 北大第一医院';
		if (judge_ip(target_ip,'202.112.184.88','202.112.184.88')) return '医学部 肾脏病研究所';
		if (judge_ip(target_ip,'202.112.184.89','202.112.184.255')) return '医学部 北大第一医院';
		if (judge_ip(target_ip,'202.112.185.0','202.112.185.255')) return '医学部 卫生部';
		if (judge_ip(target_ip,'202.112.186.0','202.112.186.255')) return '医学部 北医三院';
		if (judge_ip(target_ip,'202.112.187.0','202.112.187.81')) return '医学部 口腔医院';
		if (judge_ip(target_ip,'202.112.187.82','202.112.187.82')) return '医学部 生理楼';
		if (judge_ip(target_ip,'202.112.187.83','202.112.187.255')) return '医学部 口腔医院';
		if (judge_ip(target_ip,'202.112.188.0','202.112.188.0')) return '医学部 肿瘤医院';
		return '校外IP';
	}
	if (target_ip<=ip2num('211.71.58.43')){
		if (judge_ip(target_ip,'202.112.188.1','202.112.188.1')) return '医学部 无线网络';
		if (judge_ip(target_ip,'202.112.188.2','202.112.188.70')) return '医学部 肿瘤医院';
		if (judge_ip(target_ip,'202.112.188.71','202.112.188.71')) return '医学部 中心实验楼';
		if (judge_ip(target_ip,'202.112.188.72','202.112.188.112')) return '医学部 肿瘤医院';
		if (judge_ip(target_ip,'202.112.188.113','202.112.188.113')) return '医学部 中心实验楼';
		if (judge_ip(target_ip,'202.112.188.114','202.112.188.255')) return '医学部 肿瘤医院';
		if (judge_ip(target_ip,'202.112.189.0','202.112.190.255')) return '医学部 CZ88.NET';
		if (judge_ip(target_ip,'202.112.191.0','202.112.191.255')) return '医学部 信息中心';
		if (judge_ip(target_ip,'211.68.72.0','211.68.79.255')) return '附属中学';
		if (judge_ip(target_ip,'211.71.48.0','211.71.48.255')) return '博士生楼';
		if (judge_ip(target_ip,'211.71.49.0','211.71.49.255')) return '医学部';
		if (judge_ip(target_ip,'211.71.50.0','211.71.52.255')) return '医学部3号楼';
		if (judge_ip(target_ip,'211.71.53.0','211.71.53.255')) return '医学部5号楼';
		if (judge_ip(target_ip,'211.71.54.0','211.71.54.255')) return '医学部2号楼';
		if (judge_ip(target_ip,'211.71.55.0','211.71.56.255')) return '医学部';
		if (judge_ip(target_ip,'211.71.57.0','211.71.58.42')) return '医学部5#楼';
		if (judge_ip(target_ip,'211.71.58.43','211.71.58.43')) return '医学部5#楼529';
		return '校外IP';
	}
	if (target_ip<=ip2num('222.29.17.255')){
		if (judge_ip(target_ip,'211.71.58.44','211.71.58.59')) return '医学部5#楼';
		if (judge_ip(target_ip,'211.71.58.60','211.71.58.60')) return '5号楼529';
		if (judge_ip(target_ip,'211.71.58.61','211.71.58.120')) return '5号楼';
		if (judge_ip(target_ip,'211.71.58.121','211.71.58.121')) return '医学部5#楼5层';
		if (judge_ip(target_ip,'211.71.58.122','211.71.59.18')) return '5号楼';
		if (judge_ip(target_ip,'211.71.59.19','211.71.59.19')) return '医学院5号楼1239';
		if (judge_ip(target_ip,'211.71.59.20','211.71.59.255')) return '医学部5号楼';
		if (judge_ip(target_ip,'211.71.60.0','211.71.61.255')) return 'CZ88.NET';
		if (judge_ip(target_ip,'211.71.62.0','211.71.62.255')) return '医学图书馆403';
		if (judge_ip(target_ip,'211.71.63.0','211.71.63.255')) return 'CZ88.NET';
		if (judge_ip(target_ip,'211.82.64.0','211.82.75.255')) return '医学部';
		if (judge_ip(target_ip,'211.82.76.0','211.82.76.255')) return '医学部3#楼';
		if (judge_ip(target_ip,'211.82.77.0','211.82.79.255')) return '医学部';
		if (judge_ip(target_ip,'211.147.107.0','211.147.107.255')) return '第一医院';
		if (judge_ip(target_ip,'211.157.252.2','211.157.252.2')) return '计算机研究所';
		if (judge_ip(target_ip,'222.28.96.0','222.28.111.255')) return '医学部';
		if (judge_ip(target_ip,'222.29.0.0','222.29.17.255')) return '未知|请至Networking版报告位置#20';
		return '校外IP';
	}
	if (target_ip<=ip2num('222.29.46.255')){
		if (judge_ip(target_ip,'222.29.18.0','222.29.18.255')) return '燕北园';
		if (judge_ip(target_ip,'222.29.19.0','222.29.19.255')) return '未知|请至Networking版报告位置#21';
		if (judge_ip(target_ip,'222.29.20.0','222.29.20.255')) return '燕北园';
		if (judge_ip(target_ip,'222.29.21.0','222.29.21.255')) return '未知|请至Networking版报告位置#22';
		if (judge_ip(target_ip,'222.29.22.0','222.29.24.255')) return '燕东园';
		if (judge_ip(target_ip,'222.29.25.0','222.29.27.255')) return '蔚秀园';
		if (judge_ip(target_ip,'222.29.28.0','222.29.31.255')) return '中关园';
		if (judge_ip(target_ip,'222.29.32.0','222.29.34.255')) return '40楼';
		if (judge_ip(target_ip,'222.29.35.0','222.29.35.255')) return '41楼12楼/42楼';
		if (judge_ip(target_ip,'222.29.36.0','222.29.36.255')) return '41楼34楼';
		if (judge_ip(target_ip,'222.29.37.0','222.29.37.255')) return '41楼56楼';
		if (judge_ip(target_ip,'222.29.38.0','222.29.40.255')) return '42楼';
		if (judge_ip(target_ip,'222.29.41.0','222.29.41.255')) return '勺园留学生宿舍';
		if (judge_ip(target_ip,'222.29.42.0','222.29.42.255')) return '未知|请至Networking版报告位置#23';
		if (judge_ip(target_ip,'222.29.43.0','222.29.43.255')) return '四教';
		if (judge_ip(target_ip,'222.29.44.0','222.29.44.255')) return '未知|请至Networking版报告位置#24';
		if (judge_ip(target_ip,'222.29.45.0','222.29.46.255')) return '化学新南楼';
		return '校外IP';
	}
	if (target_ip<=ip2num('222.29.79.255')){
		if (judge_ip(target_ip,'222.29.47.0','222.29.47.255')) return '未知|请至Networking版报告位置#25';
		if (judge_ip(target_ip,'222.29.48.0','222.29.51.255')) return '中关新园';
		if (judge_ip(target_ip,'222.29.52.0','222.29.52.255')) return '中关新园4号楼';
		if (judge_ip(target_ip,'222.29.53.0','222.29.55.255')) return '中关新园';
		if (judge_ip(target_ip,'222.29.56.0','222.29.56.255')) return '中关新园2号楼';
		if (judge_ip(target_ip,'222.29.57.0','222.29.60.255')) return '未知|请至Networking版报告位置#26';
		if (judge_ip(target_ip,'222.29.61.0','222.29.61.255')) return '中关新园';
		if (judge_ip(target_ip,'222.29.62.0','222.29.62.255')) return '中关新园1号楼';
		if (judge_ip(target_ip,'222.29.63.0','222.29.63.255')) return '未知|请至Networking版报告位置#27';
		if (judge_ip(target_ip,'222.29.64.0','222.29.65.255')) return '万柳';
		if (judge_ip(target_ip,'222.29.66.0','222.29.69.255')) return '33楼/34B';
		if (judge_ip(target_ip,'222.29.70.0','222.29.71.255')) return '未知|请至Networking版报告位置#28';
		if (judge_ip(target_ip,'222.29.72.0','222.29.72.255')) return '校医院';
		if (judge_ip(target_ip,'222.29.73.0','222.29.73.255')) return '未知|请至Networking版报告位置#29';
		if (judge_ip(target_ip,'222.29.74.0','222.29.74.255')) return '勺园';
		if (judge_ip(target_ip,'222.29.75.0','222.29.78.255')) return '勺园4号楼';
		if (judge_ip(target_ip,'222.29.79.0','222.29.79.255')) return '万柳';
		return '校外IP';
	}
	if (target_ip<=ip2num('222.29.107.255')){
		if (judge_ip(target_ip,'222.29.80.0','222.29.80.255')) return '未知|请至Networking版报告位置#30';
		if (judge_ip(target_ip,'222.29.81.0','222.29.81.255')) return '47楼1单元';
		if (judge_ip(target_ip,'222.29.82.0','222.29.82.255')) return '百年纪念讲堂';
		if (judge_ip(target_ip,'222.29.83.0','222.29.84.255')) return '未知|请至Networking版报告位置#31';
		if (judge_ip(target_ip,'222.29.85.0','222.29.85.255')) return '电教';
		if (judge_ip(target_ip,'222.29.86.0','222.29.86.255')) return '英杰交流中心/理科二号楼';
		if (judge_ip(target_ip,'222.29.87.0','222.29.95.255')) return '未知|请至Networking版报告位置#32';
		if (judge_ip(target_ip,'222.29.96.0','222.29.96.255')) return '教育学院无线/化学南楼无线';
		if (judge_ip(target_ip,'222.29.97.0','222.29.97.255')) return '未知|请至Networking版报告位置#33';
		if (judge_ip(target_ip,'222.29.98.0','222.29.98.255')) return '理科五号楼';
		if (judge_ip(target_ip,'222.29.99.0','222.29.99.255')) return '(廖)凯原楼';
		if (judge_ip(target_ip,'222.29.100.0','222.29.101.255')) return '未知|请至Networking版报告位置#34';
		if (judge_ip(target_ip,'222.29.102.0','222.29.102.255')) return '万柳';
		if (judge_ip(target_ip,'222.29.103.0','222.29.103.255')) return '未知|请至Networking版报告位置#35';
		if (judge_ip(target_ip,'222.29.104.0','222.29.104.255')) return '讲堂地下室咖啡厅无线';
		if (judge_ip(target_ip,'222.29.105.0','222.29.105.255')) return '理教/未名湖无线';
		if (judge_ip(target_ip,'222.29.106.0','222.29.107.255')) return '未知|请至Networking版报告位置#36';
		return '校外IP';
	}
	if (target_ip<=ip2num('222.29.138.136')){
		if (judge_ip(target_ip,'222.29.108.0','222.29.108.255')) return '哲学楼/国关无线/理教有线';
		if (judge_ip(target_ip,'222.29.109.0','222.29.116.255')) return '未知|请至Networking版报告位置#37';
		if (judge_ip(target_ip,'222.29.117.0','222.29.117.255')) return '光华楼/未名湖无线';
		if (judge_ip(target_ip,'222.29.118.0','222.29.120.255')) return '未知|请至Networking版报告位置#38';
		if (judge_ip(target_ip,'222.29.121.0','222.29.121.255')) return '理科二号楼地下室无线';
		if (judge_ip(target_ip,'222.29.122.0','222.29.122.255')) return '33/34B无线';
		if (judge_ip(target_ip,'222.29.123.0','222.29.125.255')) return '未知|请至Networking版报告位置#39';
		if (judge_ip(target_ip,'222.29.126.0','222.29.126.255')) return '38/39楼无线';
		if (judge_ip(target_ip,'222.29.127.0','222.29.128.255')) return '未知|请至Networking版报告位置#40';
		if (judge_ip(target_ip,'222.29.129.0','222.29.129.255')) return '未名湖无线';
		if (judge_ip(target_ip,'222.29.130.0','222.29.130.255')) return '未知|请至Networking版报告位置#41';
		if (judge_ip(target_ip,'222.29.131.0','222.29.131.255')) return '昌平校区1号楼';
		if (judge_ip(target_ip,'222.29.132.0','222.29.133.255')) return '未知|请至Networking版报告位置#42';
		if (judge_ip(target_ip,'222.29.134.0','222.29.134.255')) return '昌平校区2号楼';
		if (judge_ip(target_ip,'222.29.135.0','222.29.138.130')) return '昌平校区';
		if (judge_ip(target_ip,'222.29.138.131','222.29.138.133')) return '昌平校区1号楼';
		if (judge_ip(target_ip,'222.29.138.134','222.29.138.136')) return '昌平校区2号楼';
		return '校外IP';
	}
	if (target_ip<=ip2num('222.29.159.255')){
		if (judge_ip(target_ip,'222.29.138.137','222.29.138.139')) return '昌平校区3号楼';
		if (judge_ip(target_ip,'222.29.138.140','222.29.138.142')) return '昌平校区4号楼';
		if (judge_ip(target_ip,'222.29.138.143','222.29.138.150')) return '圆明园校区';
		if (judge_ip(target_ip,'222.29.138.151','222.29.142.255')) return '昌平校区';
		if (judge_ip(target_ip,'222.29.143.0','222.29.145.255')) return '圆明园校区';
		if (judge_ip(target_ip,'222.29.146.0','222.29.146.255')) return '圆明园校区6号楼';
		if (judge_ip(target_ip,'222.29.147.0','222.29.147.255')) return '圆明园校区9号楼';
		if (judge_ip(target_ip,'222.29.148.0','222.29.149.255')) return '圆明园校区6号楼';
		if (judge_ip(target_ip,'222.29.150.0','222.29.150.255')) return '圆明园校区';
		if (judge_ip(target_ip,'222.29.151.0','222.29.156.255')) return '未知|请至Networking版报告位置#43';
		if (judge_ip(target_ip,'222.29.157.0','222.29.157.255')) return '方正大厦';
		if (judge_ip(target_ip,'222.29.158.0','222.29.159.255')) return '百年讲堂/三角地无线';
		return '校外IP';
	}
	return '校外IP';
}

// retrieve all IP addresses in current HTML document
var IPs = document.body.innerHTML.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g);

//This script is called multiple times for an unknown reason. In those cases no IP adresses could be extraced so that the following check prevents several runs.
if(typeof IPs != "object" || IPs == null){return false;}; //trivial validation

//call ipLookup() only once for each IP address, so remove redundant IP addresses before
var taken=[];
for(var i=0; i<IPs.length; i++){
	if(taken[IPs[i]]){continue;};
	taken[IPs[i]]=true;
	var pattern = new RegExp(IPs[i] + "]","g");
	var loc = getLoc(IPs[i]);
	document.body.innerHTML = document.body.innerHTML.replace(pattern,IPs[i] + "(" + loc + ")]");
}