// ==UserScript==
// @name          OGameCN - ADO
// @namespace     http://userscripts.org/scripts/show/27619
// @description   银河数亿万星辰 有颗闪闪是我家
// @source        OGame Advanced Option: http://userscripts.org/scripts/show/8938 http://userscripts.org/scripts/show/12627
// @identifier    http://pto2k.blogspot.com
// @version       2.0.3.5
// @date          2008-10-30
// @include http://uni*.ogame.tld/*

// ==/UserScript==

//changelog
/*
2008-10-30
1.星图中直接寻找主球功能，2.其他

2008-10-26
1.搬家计算使用： http://userscripts.org/scripts/show/23214

2008-10-25
1.帝国视图改进：shift+v键(V)功能和原来一样;v键只显示保存最近刷新的一次帝国视图;不管是shift+v还是v显示的帝国视图，双击窗口都会刷新显示帝国视图
2.帝国视图中启动刷新可以选择是否刷新概况页面（看星球空间）

2008-10-22
1.对应新服务器地址
2.信息前5条突出显示

2008-10-18
1.舰队2/3同时显示本地和服务器时间
2.其他小修改

2008-10-09
1.修正报警时间

2008-10-08
1.修正舰队2/3输入坐标影响速度的问题
2.舰队3/3, 按键q,在任务中循环选择

2008-10-07
1.舰队1，修正时间选项保存失败bug
2.舰队1，改进资源选择，点击资源名称可以将此类资源归零或加满...
3.舰队1，按a,选择所有舰队
4.舰队2，速度使用数字键1-9控制速度10%-90%，0=100%
5.舰队3，按a,选择所有资源，按数字键1-3对应将三种资源最大化
6.消息，距离当前时间用gettime()重写
7.启动帝国界面刷新改为链接控制开关，并显示剩余待刷新页面数
8.修正在一些input内输入会响应快捷键的问题
9.修复建筑等页面资源可用时间
10.资源，存储罐状态用饼图表示已用和空余的比例，三种资源等级的相对比例用维恩图表示，总体大小根据根据三个等级和决定[ref:http://code.google.com/intl/zh-CN/apis/chart/]
11.按住Alt键选择含坐标文字，添加私人坐标的按钮
12.坐标列表中，添加和清空坐标的链接
13.消息,按a键，在几种删除方式中循环选择[配合g键更方便，例如按aagg，就可以删除所有显示的消息]
14.修正敌人撤兵后刷新概况仍旧提示攻击时间的问题
15.帝國視圖大小根據窗口大小決定
16.帝國視圖中顯示各星球的大小和空間使用情況

2008-09-23
1.修正Firefox3.1以前版本无trim()函数的问题
2.修改艦隊總數undefine的問題

2008-09-23
1.快捷键，按C进入坐标输入框
2.内置CSS皮肤

2008-09-22
1.修复ORG服部分问题（U40... 2:318:10 有奶粉的送一点...）
2.坐标粘贴框里面可以只写星系和太阳系（例如可以输入："2 222"）

2008-09-18
1.传送门全选舰队按钮修复（thanks to Jdx0616）

2008-09-16
1.修正消息页面直接发大运小运需要先点星系页面的问题，原来是脚本的bug
2.消息页面直接发送大小运，可以直接发送第二波
3.消息页面，直接发送第二波的数字显示与否，由选项中可设置的参数控制，默认至少2大运，10小运

2008-09-04
1.修正幾百小時的建造時間的換算錯誤（謝謝jdx0616發現）

2008-09-03
1.修正探测报告中有资源数为负值时信息无法显示的问题

2008-09-02
1.修正帝国视图赤字造成总计统计失败的问题

2008-08-31
1.在帝国视图中，保留显示资源和能量的红色警告
2.台服概況中顯示總艦隊數undefine問題（目前探測級別看不到艦隊成分的數量...也許還有問題)
3.台服概況中空閒星球區分顯示
4.艦隊頁面任務自動選擇，目前優先順序為回收、殖民、遠征、月球破壞、探測、攻擊、ACS防御、派遣、運輸

2008-08-27
1.消息页面的运输船数量点击直接发送战斗（注意使用方法：1.進入消息頁面2在新窗口/標簽打開一個星系頁面3點飛船數量發送...）
2.在舰队页面1区别显示自己和其他人的坐标
3.消息頁面展開/關閉間諜報告不再附加勾選效果

2008-08-24
1.[新功能]在星系界面，打开私人坐标列表，可以直接发探测...
2.[新功能]在舰队页面整理分开显示星球和月球，可关闭（月球变废墟、保存无效问题修正）

2008-08-23
1.[改进]私人坐标添加修改等等不再冲掉当前页面

2008-08-22
1.修正被联合攻击时报警系统瘫痪的故障（thanks to jdx0616）

2008-08-15
1.台服艦隊名稱顯示

2008-08-11
1.修正折叠菜单状态不记录问题
2.在概况、建筑和研究页面显示完成的本地时间
3.消息分类选项默认为打开
4.添加任务抵达后刷新概况页功能开关选项
5.添加坐标粘贴器开关选项
6.消息页面进入时保持在最上
7.月门链接（未测试 不知道有没有用）

2008-08-10
1.修正没有私有坐标时舰队页出错不显示抵达时间\n'+
2.在星系页面显示指挥中星球    

2008-08-4
1）修正消息checkbox无效的bug
2）修正被攻击时间显示为0的bug

2008-08-2
（帝国）自动刷新所有星球的资源页和舰队页，按Shift+n(N)启动/停止
（消息）殖民、回收、远征等信息分类列出

2008-07-29
（改进）坐标粘贴，在舰队页面取得坐标后更新时间信息
（舰队）舰队页1直接显示舰队组成和运输的资源统计

2008-07-28
（防狼）入侵倒计时显示为文档标题
（改进）坐标粘贴自动填写功能在所有页面可用，如果不是舰队页面则会显示星系

2008-07-27
（快捷）修正在文本输入框中按键V等的冲突
（防狼）看过概况页之后，在所有页面都会显示一个攻击到达时间的警告
（舰队）坐标粘贴自动填写功能（将包含坐标的文本粘贴或输入到右下角输入框中，点击或Tab将焦点移出，Done）

2008-07-26
（搜索）搜索玩家结果页面中的消息和好友按钮(stylish)
（概况）在选项中添加设置，可以关闭概况页面任务抵达的本地时间显示
（舰队）在召回按钮下方显示若召回的抵达时间（注意：页面如果长时间放置会慢慢有误差）
（帝国）帝国窗口如果显示不下将显示滚动条(stylish)
（脚本）自动更新的样式放入Stylish
（概况）直接显示舰队构成及其资源

2008-07-24
（星系）探测月球的探测器数量可以在选项中设置
（脚本）自动更新提示文字中文化

2008-07-23
（舰队）第二第三步页面显示任务抵达时间和返回抵达时间，依据本地时间，逐秒刷新
（概况）时间显示Bug修正
（帝国）太卫统计

2008-07-20
（帝国）在途飞机统计（访问任意星球舰队页面后更新）

2008-07-17
（帝国）各星球飞机总览（访问各星球舰队页面后更新）
（快捷）在发舰队，或防御，造船厂等有提交按钮的页面，按1次G聚焦到提交按钮，连按第两次G，提交发送表单

2008-07-11
（脚本）自动更新机能（ref: http://userscripts.org/scripts/show/12193）

2008-07-10
（消息）间谍报告直接发送到Websim！(http://forum.speedsim.net/viewtopic.php?t=564&postdays=0&postorder=asc&start=0)
（链接）左边菜单链接加入O-Cal计算器

2008-07-06
（快捷）按住Alt选择消息中的文本，检测其中是否包含坐标，如果有的话弹出提示，攻击\星图\...(ref:http://userscripts.org/scripts/show/1808)
（帝国）视图颜色改进，日产的铁、钻、油 点击分别对应该星球的 防御、造船厂、消息

2008=07-02
（盟友）修复发消息链接不显示（stylish）
（火狐）页面标题加入内容说明，如果在FF里开了很多Tab，监视概况、建筑、星系... 就会很容易分清该点哪个

2008-07-1
（舰队）修正 跨月的本地时间（大概还有问题，没全改好就过12点了...）
（消息）修正 跨月的本地时间

2008-06-29
（帝国）帝国视图改进 资源日产统计
（舰队）舰队第一页,船名可以点击,数量+1

2008-06-28
（快捷）进入页面时聚焦并滚动到“确认”、“继续”、“发送”按钮（难道就不能叫一个名字么...）
（快捷）按键G聚焦并滚动到上述按钮,比如选择好讯息，按G再回车即可删除...
（消息）间谍报告，标题中的搬家所需运输舰数，可以点击进入舰队攻击页面功能，确定无防的星就不用再展开报告去看了

2008-06-25
（帝国）帝国视图改进 统计时间颜色变化
（快捷）按键B调出私人坐标列表

2008-06-24
（帝国）帝国视图改进 显示在途资源 总计资源

2008-06-23
（帝国）显示简易帝国视图（在任意页面双击或按键V）

2008-06-20
（图标）有外来舰队时更换明显的警告Favicon

2008-06-18
（脚本）include使用神奇的TLD(http://wiki.greasespot.net/Magic_TLD)
（概况）在途资源统计，补充远征
（图标）Favicon替换（ref:http://userscripts.org/scripts/review/27548）

2008-06-17
（概况）有在途资源时显示统计，某类任务资源全为0则不显示
（星系）修正导弹按钮不显示(stylish)

2008-06-15
（舰队）人性化的显示出发和抵达的本地时间（选项）
（舰队）显示抵达剩余时间
（舰队）任务显示明确化
（选项）设置本地和服务器时差（还未考虑时差为负的情况...）

2008-06-14
（莫名）对应.cn.com域名
（消息）在探测报告中显示去搬家需要的船只数

2008-06-11
（消息）点一行切换选取状态的修正
（消息）前往星系按钮的位置

2008-06-10
（消息）消息时间人性化显示（鼠标悬停显示原服务器时间）

2008-06-09
（星系）直接显示玩家排名，联盟排名和人数，样式由Stylish控制
（统计）通过星系中的玩家，联盟排名进入，高亮想查询的对象（设Class+Stylish），同时自动滚动页面以显示之（玩家和联盟的排名居然是不一样的...）
（统计）直接显示排名变化数字（隐藏原来的+/-/*链接） 使用颜色区别（设Class+Stylish）
（概况）有建设和空闲的星球显示不同颜色（设Class+Stylish）
（概况）任务完成的本地时间显示（设Class+Stylish）
（概况）自己的排名链接添加高亮参数

2008-06-08
（概况）新消息在窗口标题中提示，Firefox如果开了几个标签页窗口，并且设置了自动刷新，很方便在标签上看到

2008-06-07
（概况）新消息文字语法修正，数字变红："你有7条新消息s"===》"报告指挥官，您有 7 条新消息"，
（星系）两种方式直接切换到自己其他星球：1.切换到该星球页面;2.保留当前星系位置，切换后台使用的星球
（星系）点16号位置的数字，直接发送1轻战1探测进行远征，可在选项中开启和关闭，默认关闭
（星系）点空星球的数字，直接发送1艘殖民船进行殖民，可在选项中开启和关闭，默认关闭
（星系）废墟高亮限制在选项中设置
（星系）左侧菜单位置提高（stylish）
（战报）删除转换器
（笔记）表格位置修正（stylish）
（舰队）装载量计算器按钮控制加减（有bug）
（消息）打开消息分类后隐藏原始信息
（消息）战斗报告标题后添加一个链接打开星球
（资源）资源全开和全关链接
（资源）显示每分钟产量

2008-06-06
修正废墟回收数字显示不全问题
废墟中金属或晶体为0则不显示
其他

2008-06-6
星系按钮图片文字化
通过星球地址查看银河系页面高亮显示
左侧菜单折叠状态保存
左侧菜单内外部链接分开添加
加入Cweb等链接

2008-05-25
废墟数量直接显示-ok
废墟直接回收链接-ok
废墟高亮-ok
配合stylish整合字体样色-ok
广告交由stylish-ok*/
//TBD
/*
建筑能量显示
建造进度条
资源百分比影响能量变化显示
消息签名
autologin?
黑白版本控制，自由设置时间控制页面显示白底黑字还是黑底白字
等级，已有舰船数量的图形化表示？
战报转换
*/
//reference
/*
function doit(order, galaxy, system, planet, planettype, shipcount){}
function showFleetMenu(galaxy, system, planet, planettype, missiontype) {}
order
1:攻击
3：运输
4：派遣
5：ACS防御
6:探测
7：殖民
8:回收
9：月球破坏
15：远征

planettype
1：星球
2：废墟
3：月球

小型运输舰	202
大型运输舰	203
轻型战斗机	204
重型战斗机	205
巡洋舰	206
战列舰	207
殖民船	208
回收船	209
探测器	210
轰炸机	211
太阳能卫星	212
毁灭者	213
死星	214
战斗巡洋舰	215


<form action="http://uni4.ogame.com.cn/game/index.php?page=flotten2&session=d3dc9d1ef04e" method="post">
<input type="hidden" value="1" name="speedfactor"/>
<input type="hidden" value="" name="thisgalaxy"/>
<input type="hidden" value="" name="thissystem"/>
<input type="hidden" value="" name="thisplanet"/>


<form method="post" action="index.php?page=flotten3&session=d3dc9d1ef04e"/>
<input type="hidden" value="1" name="thisgalaxy"/>
<input type="hidden" value="" name="thissystem"/>
<input type="hidden" value="" name="thisplanet"/>
<input type="hidden" value="" name="thisplanettype"/>
<input type="hidden" value="1" name="speedfactor"/>
<input type="hidden" value="" name="thisresource1"/>
<input type="hidden" value="" name="thisresource2"/>
<input type="hidden" value="" name="thisresource3"/>
<input type="hidden" value="1" name="ship204"/>
<input type="hidden" value="20" name="consumption204"/>
<input type="hidden" value="25000" name="speed204"/>
<input type="hidden" value="50" name="capacity204"/>
<input type="hidden" value="1" name="ship210"/>
<input type="hidden" value="1" name="consumption210"/>
<input type="hidden" value="200000000" name="speed210"/>
<input type="hidden" value="5" name="capacity210"/>

<form method="post" action="index.php?page=flottenversand&session=d3dc9d1ef04e"/>
<input type="hidden" value="1" name="thisgalaxy"/>
<input type="hidden" value="" name="thissystem"/>
<input type="hidden" value="" name="thisplanet"/>
<input type="hidden" value="" name="thisplanettype"/>
<input type="hidden" value="1" name="speedfactor"/>
<input type="hidden" value="" name="thisresource1"/>
<input type="hidden" value="" name="thisresource2"/>
<input type="hidden" value="" name="thisresource3"/>
<input type="hidden" value="1" name="galaxy"/>
<input type="hidden" value="" name="system"/>
<input type="hidden" value="" name="planet"/>
<input type="hidden" value="" name="planettype"/>
<input type="hidden" value="1" name="ship204"/>
<input type="hidden" value="20" name="consumption204"/>
<input type="hidden" value="25000" name="speed204"/>
<input type="hidden" value="50" name="capacity204"/>
<input type="hidden" value="1" name="ship210"/>
<input type="hidden" value="1" name="consumption210"/>
<input type="hidden" value="200000000" name="speed210"/>
<input type="hidden" value="5" name="capacity210"/>
<input type="hidden" value="10" name="speed"/>
order
resource1
resource2
resource3
expeditiontime
*/
init();

/* 通用函数*/
/* 用id查对象 */
function getObj (objId) {
 return document.all ? document.all[objId] : document.getElementById(objId);
}

/* 用xpath查对象 返回一个*/
function xpathOne (query) {
	queryResult = document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return queryResult.snapshotItem(0);
}

/* 用xpath查对象 返回全部*/
function xpathAll (query) {
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function xpath(query) {
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function del(query){
	var elem = xpath(query);
	if(elem.snapshotLength > 0){
		try{
		  elem.snapshotItem(0).setAttribute('style', 'display: none;');
		}catch(err){
		  elem.snapshotItem(0).parentNode.removeChild(elem.snapshotItem(0));
		}
	}
}

function delall(query){
	var allelem = xpath(query);
	if(allelem.snapshotLength > 0){
		for (var i = 0; i < allelem.snapshotLength; i++ ) {
			var elem = allelem.snapshotItem(i);
			try{
			  elem.setAttribute('style', 'display: none;');
			}catch(err){
			  elem.parentNode.removeChild(elem);
			}
		}
	}
}

/*添加CSS*/
function addCSS(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
/*控制log显示*/
function logToConsole(log){
    if(unsafeWindow.console){
       unsafeWindow.console.log(log);
    }else{
    GM_log(log);
    }
}
/*trim*/
function trimStr(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

function getWH(){
   if (parseInt(navigator.appVersion)>3) {
        if (navigator.appName=="Netscape") {
            wW = window.innerWidth;
            wH = window.innerHeight;
        }
        if (navigator.appName.indexOf("Microsoft")!=-1) {
            wW = document.body.offsetWidth;
            wH = document.body.offsetHeight;
        }
        if(DEBUG){logToConsole("width "+wW)}
        if(DEBUG){logToConsole("height "+wH)}
    }
    /*var e = window
    , a = 'inner';
    
    if ( !( 'innerWidth' in window ) )
    {
    a = 'client';
    e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }*/
}

function togglecheck(str){
	if(str == "1"){
		return "checked=\"checked\"";
	} else if(str == "0"){
		return "";
	} 
}

/* 游戏功能函数*/
/* 添加坐标 */
function addCoords(event) {
	if (thisgal&&(this.innerHTML!="")) {
		planeta = this.innerHTML;		
		coords = thisgal + ':' + thissis + ':' + planeta;
	}else{
	coords = prompt('加入坐标: X:XXX:XX' );	
	}
	if(coords){
        var desc = prompt('坐标'+coords+'的名称',coords);
        var typ = prompt('坐标类型:, 1 - 星球, 2 -廢墟, 3 - 月球','1');
        GM_setValue('coordList_'+server, GM_getValue('coordList_'+server )+'^'+coords+'|'+desc+'|'+typ);	
        if (typeof(ramka)!='indefinido') tgCordList();
        return false;
	}
}
function addCoordsVar(event) {
    c = this.value.match(/\d+/g)
    coords = c[0]+':'+c[1]+':'+c[2]
    logToConsole(coords)
	if(coords){
        var desc = prompt('坐标'+coords+'的名称',coords);
        var typ = prompt('坐标类型:, 1 - 星球, 2 -廢墟, 3 - 月球','1');
        GM_setValue('coordList_'+server, GM_getValue('coordList_'+server )+'^'+coords+'|'+desc+'|'+typ);	
        if (typeof(ramka)!='indefinido') tgCordList();
        return false;
	}
}
/* 删除所有个人坐标 */
function delAll(){
	if (confirm ('删除所有坐标记录？')) {
		GM_setValue('coordList_'+server,'');
		alert('已删除所有坐标记录');
		if (typeof(ramka)!='indefinido'){
			tgCordList();
		}
	}
}
/* 删除坐标 */
function delcoord(event) {
	adresyNowe = '';
	nr = event.target.getAttribute('nr');
	str = GM_getValue('coordList_'+server);
	adresy = str.split( '^' );
	for (i in adresy)
		if (adresy[i]!='' && i!=nr)
			adresyNowe = adresyNowe + '^' + adresy[i];
	GM_setValue('coordList_'+server, adresyNowe);
	refCordList();
	return false;
}
/* 移动坐标 */
function moveCoord(event) {
	nr = event.target.firstChild.nodeValue;
	CoordsTab = loadCoords();
	if ((poz = prompt ('移動到:')) && (poz>0) && (poz<CoordsTab.length)) {
		CoordsTabNew = new Array;
		ii = 1;
		for (i in CoordsTab) if (i > 0) {
			if (ii==poz) CoordsTabNew[ii++] = CoordsTab[nr];
			if (i!=nr) CoordsTabNew[ii++] = CoordsTab[i];
			if (ii==poz) CoordsTabNew[ii++] = CoordsTab[nr];
		}
		saveCoords(CoordsTabNew);
		refCordList();
	}
}
/* 读取坐标 */
function loadCoords() {
	var CoordsTab = new Array;
	str = GM_getValue('coordList_' + server);
	adresy = str.split( '^' );
	for (i in adresy)
		if (adresy[i]!='')
			CoordsTab[i] = adresy[i].split('|');
	return CoordsTab;
}
/* 保存坐标 */
function saveCoords(CoordsTab) {
	str = '';
	for (i in CoordsTab) if (i > 0)
		if (typeof(CoordsTab[i]) != 'indefinido')
			str = str + '^' + CoordsTab[i][0] + '|' + CoordsTab[i][1];
	GM_setValue ('coordList_' + server, str);
}
/* 编辑坐标 */
function editCoord(event) {
	CoordsTab = loadCoords();
	nr = event.target.parentNode.parentNode.firstChild.firstChild.firstChild.nodeValue;
	if (coords = prompt('修改坐標. X:XXX:XX', CoordsTab[nr][0]))
		if (desc = prompt('修改代號/名字', CoordsTab[nr][1])) {
			CoordsTab[nr][0] = coords;
			CoordsTab[nr][1] = desc;
			saveCoords(CoordsTab);
			refCordList();
		}
	return false;
}

/* 显示坐标列表 按键响应*/
//function newCordList() {
function zarzadzaj() {
	qsWindowDim = document.createElement("div");
	tabDiv = document.createElement('div');
	tabDiv.className='qsWindow';
	qsWindowDim.className='qsWindowDim';

	tab = tabDiv.appendChild(document.createElement('TABLE'));
	tr = tab.appendChild(document.createElement('TR'));
	td = tr.appendChild(document.createElement('TD'));
	td.className='c';
	td.colSpan=5;
	td.appendChild(document.createTextNode('私人坐标列表'));
	
	tr = tab.appendChild(document.createElement('TR'));
	td = tr.appendChild(document.createElement('TD'));
	td.className='c';
	td.appendChild(document.createTextNode('序号'));
	td = tr.appendChild(document.createElement('TD'));
	td.className='c';
	td.appendChild(document.createTextNode('坐标'));
	td = tr.appendChild(document.createElement('TD'));
	td.className='c';
	td.appendChild(document.createTextNode('名称'));
	td = tr.appendChild(document.createElement('TD'));
	td.className='c';
	td.appendChild(document.createTextNode('删除'));
	td = tr.appendChild(document.createElement('TD'));
	td.className='c';
	td.appendChild(document.createTextNode('探测'));
	
	str = GM_getValue('coordList_'+server);
	array1 = str.split( '^' );
	len = array1.length;
	for( i = 0; i < len; i++ ){
		x = array1[i];
		if( x != '' ){
			arr = x.split( '|' );
			if( arr[0] != null && typeof(arr[1])!='undefined'){
				tr = tab.appendChild(document.createElement('TR'));
				th = tr.appendChild(document.createElement('TH'));
				a = document.createElement('A');
				a.href = '#';
				a.addEventListener('click', moveCoord, false);
				a.appendChild(document.createTextNode(i));
				th.appendChild(a);
				th = tr.appendChild(document.createElement('TH'));
				a = document.createElement('A');
				a.href = '#';
				a.addEventListener('click', jumpmap, false);
				a.appendChild(document.createTextNode(arr[0]));
				th.appendChild(a);
				th = tr.appendChild(document.createElement('TH'));
				a = document.createElement('A');
				a.href = '#';
				a.addEventListener('click', editCoord, false);
				a.appendChild(document.createTextNode(arr[1]));
				th.appendChild(a);
				th = tr.appendChild(document.createElement('TH'));
				a = document.createElement('A');
				a.href = '#';
				a.setAttribute('nr',i);
				a.addEventListener('click', delcoord, false);
				a.appendChild(document.createTextNode('X'));
				th.appendChild(a);
				th = tr.appendChild(document.createElement('TH'));
				a = document.createElement('A');
				a.href = '#';
				a.addEventListener('click', spycoord, false);
				a.appendChild(document.createTextNode(arr[0]));
				th.appendChild(a);
			}
		}
	}
    tr = tab.appendChild(document.createElement('TR'));
    //th = tr.appendChild(document.createElement('TH'));
    a = document.createElement('A');
    a.href = '#';
    a.addEventListener('click', addCoords, false);
    a.appendChild(document.createTextNode("添加坐标"));
    tr.appendChild(a);
    tr = tab.appendChild(document.createElement('TR'));
    //th = tr.appendChild(document.createElement('TH'));
    a = document.createElement('A');
    a.href = '#';
    a.addEventListener('click', delAll, false);
    a.appendChild(document.createTextNode("清空坐标"));
    tr.appendChild(a);
	tabDiv.id='tabDiv'
	qsWindowDim.id='qsWindowDim'
}
function cordFormatChange(f1){
    c = f1.match(/(\d+):(\d+):(\d+)/)
    if(c){
        return c[1]+","+c[2]+","+c[3];
    }
}

/*直接间谍坐标*/
function spycoord(e){
	adres = e.target.firstChild.nodeValue.split(':');
	unsafeWindow.doit(6,adres[0],adres[1],adres[2],1,2)
	return false;
}

/* 点坐标跳转星图 */
function jumpmap(e) {
	adres = e.target.firstChild.nodeValue.split(':');
	newloc= 'index.php?page=galaxy&galaxy='+adres[0]+'&system='+adres[1]+'&planet='+adres[2]+'&session='+sid;
	//alert(newloc)
	window.location.href=newloc
	return false;
}

/*特殊字符转换到UNICODE*/
function convertToEntities(strSP) {
  var strUNI = '';
  for(i=0; i<strSP.length; i++){
    if(strSP.charCodeAt(i)>127){
      strUNI += '&#' + strSP.charCodeAt(i) + ';';
    }else{
      strUNI += strSP.charAt(i);
    }
  }
  return (strUNI);
}

/*含“.”的数值数字化*/
function mystr2num(str){
	var temp = str+"";
	var allnums = temp.split(".");
	var mystr = "";
	for(var i=0; i<allnums.length; i++){
		mystr = mystr +allnums[i];
	}
	return parseInt(mystr);
}

/*给数值加“.”*/
function addDots(nStr){
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + '.' + '$2');
  }
  return x1 + x2;
}

function reder(str){
	if(/font/.test(str) == true){
		var clean = />([0-9\.]+)</.exec(str);
		if(clean != null){ clean = RegExp.$1; return clean;} else {return "0";}	
	} else {
	return str;
	}
}

function resizer(w,h,c){
	if(Math.max(w,h) == c){ 
		return 52;
	} else {
		return (Math.round((Math.min(w,h)/Math.max(w,h))*52));
	}
}

function calcmaxnum(m,c,d,nm,nc,nd){ 
	var valor = Math.min(Math.floor(m/nm),Math.floor(c/nc),Math.floor(d/nd));
	return valor;
} 

function calctime(m,c,d,nm,nc,nd,mf,cf,df){
	var mmax = Math.floor(((nm - m)*3600)/mf);
	if(mmax>0){mmax=mmax;} else {mmax=0;}
	var cmax = Math.floor(((nc - c)*3600)/cf);
	if(cmax>0){cmax=cmax;} else {cmax=0;}
	var dmax = Math.floor(((nd - d)*3600)/df);
	if(dmax>0){dmax=dmax;} else {dmax=0;}
	return Math.max(mmax,cmax,dmax);
}

/*切换菜单显示*/
function hidemenu(){
    var exi = true;
	for(var i=0; i<menuItems.snapshotLength;i++){
		thismenuItem = menuItems.snapshotItem(i);
		if (this.innerHTML == thismenuItem.innerHTML){
			thisNum = i
			//alert("thisNum="+thisNum);
		}
	}
	for(var i=0; i<(menuTitle.length-1);i++){
		if (thisNum == menuTitle[i]){
			var titleNum = i;
			//alert("titleNum="+titleNum);
		}
	}
	switch(titleNum){
        case 0:
            var alltopleftmenu = xpath("//div[@id='menu']/table/tbody/tr[position()<"+menuTitle[1]+"+1][position()>1]");
        break;
        case 1:
            var alltopleftmenu = xpath("//div[@id='menu']/table/tbody/tr[position()<"+menuTitle[2]+"+1][position()>"+menuTitle[1]+"+1]");
        break;
        case 2:
            var alltopleftmenu = xpath("//div[@id='menu']/table/tbody/tr[position()>"+menuTitle[2]+"+1][position()<"+totalmenuItemsNumber+"+1]");
        break;
        default:
            var exi = false;
    }
    //alert(exi);
    if(exi){
    	stat_now = GM_getValue(server+'_menu_'+titleNum+'_display');
    	//alert("stat_now="+stat_now);
    	if(stat_now==true){
    		GM_setValue(server+'_menu_'+titleNum+'_display',false)
    	}else{
			GM_setValue(server+'_menu_'+titleNum+'_display',true)
    	}
        for (var i = 0; i < alltopleftmenu.snapshotLength; i++ ) {
            if(alltopleftmenu.snapshotItem(i).style.display != "none"){
				alltopleftmenu.snapshotItem(i).style.display = "none";
            }else{
				alltopleftmenu.snapshotItem(i).style.display = "";
			}
        }
    }
}

/*保存选项参数*/
function saver(){
	var server = document.getElementById('hiddenserver').value;
	GM_setValue((server+"colorm"), (document.getElementById('metalcolor').value));
	GM_setValue((server+"colorc"), (document.getElementById('crystalcolor').value));
	GM_setValue((server+"colord"), (document.getElementById('deuteriumcolor').value));
	GM_setValue((server+"colore"), (document.getElementById('energycolor').value));
	
  	GM_setValue((server+"missioncolors"), (document.getElementById('missioncolors').value));
	GM_setValue((server+"colorat"), (document.getElementById('attackcolor').value));
	GM_setValue((server+"colores"), (document.getElementById('spycolor').value));
	GM_setValue((server+"colorha"), (document.getElementById('harvestcolor').value));
	GM_setValue((server+"colorotr"), (document.getElementById('owntransportcolor').value));
	GM_setValue((server+"colortr"), (document.getElementById('transportcolor').value));
	
	GM_setValue((server+"standardads"), (document.getElementById('standard').value));
	GM_setValue((server+"darkmatter"), (document.getElementById('darkmatter').value));
	GM_setValue((server+"oclink"), (document.getElementById('OClink').value));
	GM_setValue((server+"topicons"), (document.getElementById('TOPicons').value));
	
	GM_setValue((server+"harvest"), (document.getElementById('recycler').value));
	GM_setValue((server+"moonspy"), (document.getElementById('moonspy').value));
	GM_setValue((server+"relvl"), (document.getElementById('relvl').value));
	GM_setValue((server+"maxships"), (document.getElementById('maxships').value));
	GM_setValue((server+"readytime"), (document.getElementById('readytime').value));
	GM_setValue((server+"calcships"), (document.getElementById('calcships').value));
	GM_setValue((server+"collapsedesc"), (document.getElementById('collapsedesc').value));
	GM_setValue((server+"localtime"), (document.getElementById('localtime').value));
	GM_setValue((server+"localMissionTimeInOverView"), (document.getElementById('localMissionTimeInOverView').value));
	
	GM_setValue((server+"advstor"), (document.getElementById('advstor').value));
	GM_setValue((server+"advmess"), (document.getElementById('advmess').value));
	GM_setValue((server+"dRaidLC"), (document.getElementById('dRaidLC').value));
	GM_setValue((server+"dRaidSC"), (document.getElementById('dRaidSC').value));
	
	GM_setValue((server+"lemenu"), (document.getElementById('lemenu').value));
	GM_setValue((server+"colLink"), (document.getElementById('colLink').value));
	GM_setValue((server+"expLink"), (document.getElementById('expLink').value));
	GM_setValue((server+"bigLaji"), (document.getElementById('bigLaji').value));
	GM_setValue((server+"localtimeF1"), (document.getElementById('localtimeF1').value));
	GM_setValue((server+"timeZoneDiffSec"), (document.getElementById('timeZoneDiffSec').value));
	GM_setValue((server+"timeZoneDiffSecMan"), (document.getElementById('timeZoneDiffSecMan').value));
	
    GM_setValue((server+"moonSpyCount"), (document.getElementById('moonSpyCount').value));
	
    GM_setValue((server+"refreshOverViewOnAvr"), (document.getElementById('refreshOverViewOnAvr').value));
    GM_setValue((server+"cordBoxInCorner"), (document.getElementById('cordBoxInCorner').value));
    GM_setValue((server+"moonCordExt"), (document.getElementById('moonCordExt').value));

    GM_setValue((server+"useCSS"), (document.getElementById('useCSS').value));
    GM_setValue((server+"useCSS2"), (document.getElementById('useCSS2').value));
    
	if(notdetected){GM_setValue((server+"langloca"), (document.getElementById('selectlocation').selectedIndex)); GM_setValue((server+"langstr"), (document.getElementById('selectlocation').options[document.getElementById('selectlocation').selectedIndex].value));}
	window.location.href = 	window.location.href
}

function checker(vartitle, vardefault){
	var temp = GM_getValue(vartitle);
	if (temp == undefined){
	    if(DEBUG){logToConsole(vartitle+" not defined");}
		return vardefault;
	} else {
		return temp;
	}
}

function barcolor(col){
	if(col == 100){
		return "rgb(255, 0, 0);";
	} else {
		return "rgb("+Math.floor(2.55*col)+", "+Math.floor((1.27*(100-col))+128)+", 0);";
	}
}

function HSBtoRGB(hu, sa, br) {
  var r = 0;
  var g = 0;
  var b = 0;

  if (sa == 0) {
    r = parseInt(br * 255.0 + 0.5);
	  g = r;
    b = r;
	}
	else {
      var h = (hu - Math.floor(hu)) * 6.0;
      var f = h - Math.floor(h);
      var p = br * (1.0 - sa);
      var q = br * (1.0 - sa * f);
      var t = br * (1.0 - (sa * (1.0 - f)));

      switch (parseInt(h)) {
         case 0:
            r   = (br * 255.0 + 0.5);
            g = (t * 255.0 + 0.5);
            b  = (p * 255.0 + 0.5);
            break;
         case 1:
            r   = (q * 255.0 + 0.5);
            g = (br * 255.0 + 0.5);
            b  = (p * 255.0 + 0.5);
            break;
         case 2:
            r   = (p * 255.0 + 0.5);
            g = (br * 255.0 + 0.5);
            b  = (t * 255.0 + 0.5);
            break;
         case 3:
            r   = (p * 255.0 + 0.5);
            g = (q * 255.0 + 0.5);
            b  = (br * 255.0 + 0.5);
            break;
         case 4:
            r   = (t * 255.0 + 0.5);
            g = (p * 255.0 + 0.5);
            b  = (br * 255.0 + 0.5);
            break;
          case 5:
            r   = (br * 255.0 + 0.5);
            g = (p * 255.0 + 0.5);
            b  = (q * 255.0 + 0.5);
            break;
	    }
	}
  var arrRGB = new Array(parseInt(r), parseInt(g), parseInt(b));
  return arrRGB;
}

function RGBtoHSB(r, g, b) {
  var hu;
  var sa;
  var br;

   var cmax = (r > g) ? r : g;
   if (b > cmax) cmax = b;

   var cmin = (r < g) ? r : g;
   if (b < cmin) cmin = b;

   br = cmax / 255.0;
   if (cmax != 0) sa = (cmax - cmin)/cmax;
   else sa = 0;

   if (sa == 0) hu = 0;
   else {
      var redc   = (cmax - r)/(cmax - cmin);
    	var greenc = (cmax - g)/(cmax - cmin);
    	var bluec  = (cmax - b)/(cmax - cmin);

    	if (r == cmax) hu = bluec - greenc;
    	else if (g == cmax) hu = 2.0 + redc - bluec;
      else hu = 4.0 + greenc - redc;

    	hu = hu / 6.0;
    	if (hu < 0) hu = hu + 1.0;
   }
   
   var arrHSB = new Array(hu, sa, br);
   return arrHSB;   
}

function darken(hexCode) {
  if (hexCode.indexOf('#') == 0) hexCode = hexCode.substring(1);
 
  var RGBHSB = new Array(); //4. 
  RGBHSB[0] = parseInt(hexCode.substring(0,2), 16);
  RGBHSB[1] = parseInt(hexCode.substring(2,4), 16);
  RGBHSB[2] = parseInt(hexCode.substring(4,6), 16);
  RGBHSB[3] = 0;
  RGBHSB[4] = 0;
  RGBHSB[5] = 0;
  
  var red   = parseInt(hexCode.substring(0,2), 16);
  var green = parseInt(hexCode.substring(2,4), 16);
  var blue  = parseInt(hexCode.substring(4,6), 16);
  
  var arrCol = RGBtoHSB(red, green, blue);
  arrCol = HSBtoRGB(arrCol[0], arrCol[1], Math.max(arrCol[2] - 0.19, 0));  
  return "rgb(" + arrCol[0] + "," + arrCol[1] + "," + arrCol[2] + ")";
}

//功能搜索一个数组的价值和恢复它的立场。
function findPos(array, id) {
	for(var i = 0; i < array.length; i++){
		if(array[i] == id) return i;
	}
	return -1;
}

//功能，以核实是否今年是闰年或没有。
function anoBisiesto(ano) {
   return (((ano % 4 == 0) && (ano % 100 != 0)) || (ano % 400 == 0)) ? 1 : 0;
}

//函数来计算的天数已一个月。
function DiasMes(mes, ano) {
   if(mes == 0 || mes == 2 || mes == 4 || mes == 6 || mes == 7|| mes == 9 || mes == 11)
      return 31;
   if(mes == 3 || mes == 5 || mes == 8 || mes == 10)
      return 30;
   if(mes == 1 && anoBisiesto(ano) == 0)
      return 28;
   else
      return 29;
}

//刷新服务器和本地时间
function clock() {
   nodeLocal = document.getElementById("ClockLocal");
   nodeServer = document.getElementById("ClockServer");
   var date = new Date();//
   var ano = date.getFullYear();//2008
   var mes = date.getMonth();//5 6月
   var dia = date.getDay();//1 周一
   var diaNum = date.getDate();//9 9号
   var hora = date.getHours();//22
   var mins = date.getMinutes();//19
   var segs = date.getSeconds();//28
   var fecha = nodeServer.innerHTML.match(/(\S+) (\d+) - (\S+) - (\d{2}):(\d{2}):(\d{2})/);
   nodeLocal.innerHTML = convertToEntities(O_days[langloca][dia]) + ' ' + diaNum + ' - ' + convertToEntities(O_months[langloca][mes]) + ' - ' + ((hora < 10) ? '0' : '') + hora + ((mins < 10) ? ':0' : ':') + mins + ((segs < 10) ? ':0' : ':') + segs;
   dia = findPos(O_days[langloca], fecha[1]);//convertToEntities(fecha[#]) removed 2008-06-1 pto2k
   diaNum = fecha[2] * 1;
   mes = findPos(O_months[langloca], fecha[3]);//convertToEntities(fecha[#]) removed 2008-06-1 pto2k
   hora = fecha[4] * 1;
   mins = fecha[5] * 1;
   segs = fecha[6] * 1;
   if(++segs > 59) {
      segs = 0;
      if(++mins > 59) {
         mins = 0;
         if(++hora == 23) {
            hora = 0;
            if(++dia > 6) dia = 0;
            diaNum++;
            if(diaNum > DiasMes(mes, ano)) {
               diaNum = 1;
               if(++mes > 11) mes = 0;
            }
         }
      }
   }
   nodeServer.innerHTML = convertToEntities(O_days[langloca][dia]) + ' ' + diaNum + ' - ' + convertToEntities(O_months[langloca][mes]) + ' - ' + ((hora < 10) ? '0' : '') + hora + ((mins < 10) ? ':0' : ':') + mins + ((segs < 10) ? ':0' : ':') + segs;
   //var fechaServer = O_days[langloca][findPos(days,fecha[1])] + " " + fecha[3] + " - " + O_months[langloca][findPos(months, fecha[2])] + " - " + ((fecha[4] < 10) ? "0" : "") + fecha[4] + fecha[5];
		
   
   //一刷新一个第二，如果没有改变的网页。
   if(/page=overview/.test(ogtitle) == true){
	   setTimeout(clock, 1000);
	}		
}

/*刷新进攻时间显示*/
function updateAtkTime(){
	atkObj = document.getElementById("atkdiv")
	if(atkObj){
        remainAtkTime = atkObj.title*1
        nT = remainAtkTime-1
        if(nT>0){
            atkObj.title=nT
            atkObj.innerHTML="&nbsp;ETA "+s2c(nT)
            if(nT%2==1){document.title ="  - "+s2c(nT)}else{document.title ="! - "+s2c(nT);}
            setTimeout(updateAtkTime,1000)
        }else{
            atkObj.parentNode.removeChild(atkObj);
            GM_setValue(server+'_aAtk',"");
            document.title = "攻击消失！"
        }
	}else{
        atkObj.parentNode.removeChild(atkObj);
        GM_setValue(server+'_aAtk',"");
        document.title = "攻击消失！"
	}
}

/*刷新舰队页1的抵达剩余时间*/
function refreshClock(){
	var updateRecallTime = new Date();
	allServerTimeComm = xpath('//div[@id="content"]/center/center/table/tbody/tr[position()>2]/th[position()=8]');
	for(var i=0;i<allServerTimeComm.snapshotLength;i++){
		thisComm = allServerTimeComm.snapshotItem(i);
		remainTime = thisComm.innerHTML.match(/\b(\d+):(\d+):(\d+)/)
		recallTime = thisComm.innerHTML.match(/\S{2}\s\d+:\d+:\d+/)
		if (!recallTime){
			recallTime = thisComm.innerHTML.match(/\d+\S\d+\S\s\d+:\d+:\d+/)
		}
		if(recallTime){
			updateRecallTime.setTime(humanTime2Date(recallTime[0]).getTime()+2000);
			thisComm.innerHTML=thisComm.innerHTML.replace(recallTime[0],humanTime(updateRecallTime));
		}
		if(remainTime){
			thisSec = remainTime[3]*1;
			thisMin = remainTime[2]*1;
			thisHour = remainTime[1]*1;
			///alert(fecha[0]);
			if(thisSec==0){
				if(thisMin==0){
					if(thisHour==0){
						thisComm.innerHTML=thisComm.innerHTML.replace(remainTime[0],"已抵达");
					}else{
						thisHour=thisHour-1;
						if(thisHour<10){thisHour="0"+thisHour}
						thisMin=59;
						thisSec=59;
						thisComm.innerHTML=thisComm.innerHTML.replace(remainTime[0],thisHour+":"+thisMin+":"+thisSec);
					}
				}else{
					thisMin=thisMin-1;
					if(thisMin<10){thisMin="0"+thisMin}
					if(thisHour<10){thisHour="0"+thisHour}
					thisSec=59;
					thisComm.innerHTML=thisComm.innerHTML.replace(remainTime[0],thisHour+":"+thisMin+":"+thisSec);
				}
			}else{
			//alert(thisSec);
				thisSec=thisSec-1
				if(thisSec<10){thisSec="0"+thisSec}
				if(thisMin<10){thisMin="0"+thisMin}
				if(thisHour<10){thisHour="0"+thisHour}
				thisComm.innerHTML=thisComm.innerHTML.replace(remainTime[0],thisHour+":"+thisMin+":"+thisSec);
			}
		}

	}
	setTimeout(refreshClock,1000)
}

/*刷新舰队页2的本地时间*/
function refreshF2Clock(){
	dur=xpathOne("//div[@id='duration']").innerHTML
	GM_setValue (server+'_dur',dur)
	document.getElementById('arrivalOneTh2').innerHTML=timeForecast(dur)
	document.getElementById('arrivalTwoTh2').innerHTML=timeForecast2(dur)
	setTimeout(refreshF2Clock,1000)
}

function refreshF3Clock(){
	document.getElementById('arrivalOneTh2').innerHTML=timeForecast(GM_getValue (server+'_dur'))
	document.getElementById('arrivalTwoTh2').innerHTML=timeForecast2(GM_getValue (server+'_dur'))
	setTimeout(refreshF3Clock,1000)
}

/*选择消息*/
function checkMsg(item){
	if(item.checked == true){
		item.checked = false;
	} else if(item.checked == false){
		item.checked = true;
	}
}

function tgoptRef1(){
    var optRefF1 = GM_getValue(server+"_optRefF1","0")
    if (optRefF1=="0"){
        optRefF1="1"
        GM_setValue(server+"_optRefF1","1")
    }else{
        optRefF1="0"
        GM_setValue(server+"_optRefF1","0")
    }
}

/*切换简易帝国视图*/
function tgqsWindow(event){
	qdW = document.getElementById('qsWindowDim')
	if (!qdW){
		newQsWindow();
		document.body.appendChild(qsWindowDim)
		qsWindowDim.appendChild(qsWindow)
        qsWindow.appendChild(iniRefreshBtn)
        iniRefreshBtn.appendChild(iniRefreshBtnA)
        iniRefreshBtn.appendChild(iniRefreshOpt1)
        iniRefreshBtn.appendChild(iniRefreshOpt1Lab)
        iniRefreshBtnA.addEventListener('click', iniRefresh,true);
        iniRefreshOpt1.addEventListener('click', tgoptRef1,true);
        getWH();
        with(qsWindow.style){
            position = 'relative';
            width = (wW-90)+'px';
            height = (wH-60)+'px';
            top = '30px';
            left = '30px';
        }
	}else{
		document.body.removeChild(qsWindowDim)
	}
}

function tgqsWindowShowOnly(event){
	qdW = document.getElementById('qsWindowDim')
	if (!qdW){
		readQsWindow();
		document.body.appendChild(qsWindowDim)
		qsWindowDim.appendChild(qsWindow)
        qsWindow.appendChild(iniRefreshBtn)
        iniRefreshBtn.appendChild(iniRefreshBtnA)
        iniRefreshBtn.appendChild(iniRefreshOpt1)
        iniRefreshBtn.appendChild(iniRefreshOpt1Lab)
        iniRefreshBtnA.addEventListener('click', iniRefresh,true);
        iniRefreshOpt1.addEventListener('click', tgoptRef1,true);
        getWH();
        with(qsWindow.style){
            position = 'relative';
            width = (wW-90)+'px';
            height = (wH-60)+'px';
            top = '30px';
            left = '30px';
        }
	}else{
		document.body.removeChild(qsWindowDim)
	}
}
/*切换坐标列表*/
function tgCordList(){
	qdW = document.getElementById('qsWindowDim')
	if (!qdW){
		//newCordList();
		zarzadzaj();
		document.body.appendChild(qsWindowDim)
		qsWindowDim.appendChild(tabDiv)
		getWH();
		with(tabDiv.style){
            position = 'relative';
            width = (wW-90)+'px';
            height = (wH-60)+'px';
            top = '30px';
            left = '30px';
		}
	}else{
		document.body.removeChild(qsWindowDim)
	}
}
/*更新坐标列表*/
function refCordList(){
    document.body.removeChild(qsWindowDim);
    zarzadzaj();
    document.body.appendChild(qsWindowDim)
    qsWindowDim.appendChild(tabDiv)
    getWH();
    with(tabDiv.style){
        position = 'relative';
        width = (wW-90)+'px';
        height = (wH-60)+'px';
        top = '30px';
        left = '30px';
    }
}
/*聚焦到提交按钮 连按G则提交*/
function focusSubmitBtn(){
 goText = new Array("确定","继续","发送","continue","Confirm","send","Display")
 for(i=0;i<goText.length;i++){
  submitBtn = xpathOne("//input[@value='"+goText[i]+"']")
  if(submitBtn){
   submitBtn.focus()
   submitBtn.scrollIntoView();
   if (gPressed == 1){
    thisForm = xpathOne("//input[@value='"+goText[i]+"']/ancestor::form")
    if (thisForm){
     thisForm.submit();
    }else{
     thisForm = xpathOne("//input[@value='"+goText[i]+"']/ancestor::table/form")
     if (thisForm){
      thisForm.submit();
     } 
    }
    gPressed = 0;
   }
   break;
  }
  //alert(goText[i])
 }
}

function iniRefresh(){
    //alert(checker(server+"_inRefAct"));
    if(checker(server+"_inRefAct")!="YES"){
        GM_setValue(server+"_inRefAct","YES")
        genLinks();
        refreshLinks();
    }else{
        GM_setValue(server+"_inRefAct","No")
    }
}

/*按键捕获*/
function getKey(event){
	//var k = String.fromCharCode(event.which);	//代码转字符//n110 m109 b98 v118 p112 y121
	var k = event.which;
	if(DEBUG){logToConsole("key is "+k);}
	if(disableKey==0){
		if (k == "86"){//V
			tgqsWindow();
		}
		if (k == "118"){//v
			tgqsWindowShowOnly();
		}
		if (k == "98"){//b
			tgCordList();
		}
		if (k == "103"){//g
			focusSubmitBtn();
			gPressed = 1;
		}
		if (k == "78"){//shift+n
		    if(checker(server+"_inRefAct")!="YES"){
                GM_setValue(server+"_inRefAct","YES")
                genLinks();
                refreshLinks();
            }else{
                GM_setValue(server+"_inRefAct","No")
            }
		}
        if (k == "99"){//c
			focusCordTA();
		}
        if (k == "97"){//a
            //try{
                if(/page=flotten1/.test(ogtitle) == true){
                    unsafeWindow.maxShips();
                    unsafeWindow.calccap();
                }
                if(/page=flotten3/.test(ogtitle) == true){
                    unsafeWindow.maxResources();
                }
                if(/page=messages/.test(ogtitle) == true){
                    currentIndex = xpath("//select").snapshotItem(1).selectedIndex
                    logToConsole("selected "+currentIndex)
                    currentIndex = currentIndex+1
                    if (currentIndex==4){currentIndex=0}
                    xpath("//select").snapshotItem(1).selectedIndex=currentIndex
                }
		    //}catch(e){logToConsole(e)}
		}
		if(/page=flotten2/.test(ogtitle) == true){//数字键控制速度
		    speedSel = xpathOne("//select[@name='speed']")
		    switch (k) {
		    	case 49:
                    speedSel.selectedIndex=9;
                    unsafeWindow.shortInfo();
		    		break;
		    	case 50:
                    speedSel.selectedIndex=8;
                    unsafeWindow.shortInfo();
		    		break;
		    	case 51:
                    speedSel.selectedIndex=7;
                    unsafeWindow.shortInfo();
		    		break;
		    	case 52:
                    speedSel.selectedIndex=6;
                    unsafeWindow.shortInfo();
		    		break;
		    	case 53:
                    speedSel.selectedIndex=5;
                    unsafeWindow.shortInfo();
		    		break;
		    	case 54:
                    speedSel.selectedIndex=4;
                    unsafeWindow.shortInfo();
		    		break;
		    	case 55:
                    speedSel.selectedIndex=3;
                    unsafeWindow.shortInfo();
		    		break;
		    	case 56:
                    speedSel.selectedIndex=2;
                    unsafeWindow.shortInfo();
		    		break;
		    	case 57:
                    speedSel.selectedIndex=1;
                    unsafeWindow.shortInfo();
		    		break;
		    	case 48:
                    speedSel.selectedIndex=0;
                    unsafeWindow.shortInfo();
		    		break;
		    	default:
		    		break;
		    }
		}
		if(/page=flotten3/.test(ogtitle) == true){//数字键控制资源
		    switch (k) {
		    	case 49:
		    	    unsafeWindow.maxResource('1');
		    	    break;
		    	case 50:
		    	    unsafeWindow.maxResource('2');
		    	    break;
		    	case 51:
		    	    unsafeWindow.maxResource('3');
		    	    break;
		    	case 113://q
							var aM = xpath("//input[@type='radio']")
							var mNow = -1
							for(m=0;m<aM.snapshotLength;m++){
								if (aM.snapshotItem(m).checked==true){
									mNow = m
								}
							}
							mNow+=1
							if(mNow==(aM.snapshotLength)){
								mNow=0
							}
							aM.snapshotItem(mNow).checked=true
		    	    break;
		    	default:
		    	    break;
		    }
     }
	}
}
function focusCordTA(){
    try{
        document.getElementById("cordTA").focus();
    }catch(e){logToConsole(e);}
}

function textFocus(){
	disableKey = 1
	logToConsole("key is disabled")
}
function textBlur(){
	disableKey = 0
	logToConsole("key is not disabled")
}
/*新建帝国视图*/
function newQsWindow(){
	/*创建窗口*/
	qsWindow = document.createElement("div")
	qsWindowDim = document.createElement("div")
	qsWindow.className='qsWindow';
	qsWindowDim.className='qsWindowDim';
    qsWindowDim.addEventListener("dblclick", function(){tgqsWindow();tgqsWindow()}, false)
	qsStr = "<div><table><tbody><tr class='qsWindowHead'><td class='c'>我的帝国</td>";
	allM=0;
	allC=0;
	allH=0;
	for(var i=0; i<GM_getValue (server+'_Planet_Count'); i++){//name
		pName = GM_getValue (server+'_Planet_' + i +'_Name');
		pId = GM_getValue (server+'_Planet_' + i +'_ID');
		sNTemp = GM_getValue(server+pName+'_sizeNow',0)
		sATemp = GM_getValue(server+pName+'_sizeAll',1)
		sN = (sNTemp/(sNTemp+sATemp))
		sA = (sATemp-sNTemp)/(sNTemp+sATemp)
		sS = parseInt(GM_getValue(server+pName+'_sizeAll',1)/9)+28
		qsStr+="<td class='c'><a href=\'/game/index.php?page=overview&session="+sid+"&cp="+pId+"\'>"+pName+"</a><br/>"+
        "<span class='empireSpace'>"+sNTemp+"/"+sATemp+
		"</span><br /><img title='"+sNTemp+"/"+sATemp+"' src='http://chart.apis.google.com/chart?cht=p&chd=t:"+sN+","+sA+"&chs="+sS+"x"+sS+"&chco=32ff32,efefef&chf=bg,s,efefef00'/>"+
		"</td>"
	}
	qsStr+="<td class='c' rowspan='2'>在&nbsp;途</td><td class='c' rowspan='2'>总&nbsp;计</td></tr><tr class='qswL'><td class='c'>坐&nbsp;&nbsp;&nbsp;标</td>"
	for(var i=0; i<GM_getValue (server+'_Planet_Count'); i++){//cord
		pLoc = GM_getValue (server+'_Planet_' + i +'_Loc');
		pId = GM_getValue (server+'_Planet_' + i +'_ID');
		qsStr+="<td class='c'><a href=\'/game/index.php?page=galaxy&session="+sid+"&cp="+pId+"\'title='星图'>"+pLoc+"</a></td>"
	}
	qsStr+="</tr><tr class='qswM'><td class='c'>铁&nbsp;[建筑]</td>"
	for(var i=0; i<GM_getValue (server+'_Planet_Count'); i++){//Metal
		pId = GM_getValue (server+'_Planet_' + i +'_ID');
		pM = addDots(GM_getValue (server+'_'+GM_getValue (server+'_Planet_' + i +'_Name')+'_resM'));
		allM += mystr2num(pM)
		if(GM_getValue (server+'_'+GM_getValue (server+'_Planet_' + i +'_Name')+'M!')=='YES'){pM='<font color="#ff0000">'+pM+'</font>'}
		qsStr+="<td class='c'><a href=\'/game/index.php?page=b_building&session="+sid+"&cp="+pId+"\' title='建筑'>"+pM+"</a></td>"
	}
	transM = addDots(GM_getValue (server+'_mMTotal',0))
	allM += mystr2num(transM)
	qsStr+="<td class='c'>"+transM+"</td><td class='c'>"+addDots(allM)+"</td></tr><tr class='qswC'><td class='c'>钻&nbsp;[研究]</td>"
	for(var i=0; i<GM_getValue (server+'_Planet_Count'); i++){//Crystal
		pId = GM_getValue (server+'_Planet_' + i +'_ID');
		pC = addDots(GM_getValue (server+'_'+GM_getValue (server+'_Planet_' + i +'_Name')+'_resC'));
		allC += mystr2num(pC)
		if(GM_getValue (server+'_'+GM_getValue (server+'_Planet_' + i +'_Name')+'C!')=='YES'){pC='<font color="#ff0000">'+pC+'</font>'}
		qsStr+="<td class='c'><a href=\'/game/index.php?page=buildings&mode=Forschung&session="+sid+"&cp="+pId+"\' title='研究'>"+pC+"</a></td>"
	}
	transC = addDots(GM_getValue (server+'_mCTotal',0))
	allC += mystr2num(transC)
	qsStr+="<td class='c'>"+transC+"</td><td class='c'>"+addDots(allC)+"</td></tr><tr class='qswH'><td class='c'>油&nbsp;[舰队]</td>"
	for(var i=0; i<GM_getValue (server+'_Planet_Count'); i++){//HH
		pId = GM_getValue (server+'_Planet_' + i +'_ID');
		pH = addDots(GM_getValue (server+'_'+GM_getValue (server+'_Planet_' + i +'_Name')+'_resH'));
		allH += mystr2num(pH)
		if(GM_getValue (server+'_'+GM_getValue (server+'_Planet_' + i +'_Name')+'H!')=='YES'){pH='<font color="#ff0000">'+pH+'</font>'}
		qsStr+="<td class='c'><a href=\'/game/index.php?page=flotten1&session="+sid+"&cp="+pId+"\' title='舰队'>"+pH+"</a></td>"
	}
	transH = addDots(GM_getValue (server+'_mHTotal',0))
	allH += mystr2num(transH)
	qsStr+="<td class='c'>"+transH+"</td><td class='c'>"+addDots(allH)+"</td></tr><tr class='qswE'><td class='c'>电&nbsp;[资源]</td>"
	for(var i=0; i<GM_getValue (server+'_Planet_Count'); i++){//energy
		pId = GM_getValue (server+'_Planet_' + i +'_ID');
		pName = GM_getValue (server+'_Planet_' + i +'_Name');
		thisE1 = GM_getValue (server+'_'+pName+'_resE1');
		if(GM_getValue (server+'_'+GM_getValue (server+'_Planet_' + i +'_Name')+'E!')=='YES'){thisE1='<font color="#ff0000">'+thisE1+'</font>'}
		thisE2 = GM_getValue (server+'_'+pName+'_resE2');
		qsStr+="<td class='c'><a href=\'/game/index.php?page=resources&session="+sid+"&cp="+pId+"\' title='资源'>"+thisE1+"/"+thisE2+"</a></td>"
	}
	qsStr+="<td colspan='2' rowspan='2' class='qswtt5 c'>(o .o )</td></tr><tr class='qswT'><td class='c'></td>"
	for(var i=0; i<GM_getValue (server+'_Planet_Count'); i++){//Update Time
		pName = GM_getValue (server+'_Planet_' + i +'_Name');
		lastUTC = parseInt(GM_getValue (server+'_'+pName+'_resTimeUTC'));
		diffUTC = nowUTC - lastUTC;
		toNowHour = Math.floor(diffUTC/1000/3600)
		toNowMin = Math.floor((diffUTC/1000)%3600/60)
		toNowSec = ((diffUTC/1000)%3600)%60
		if(toNowHour<1){
			qswtt = "qswtt1"
		}else if(toNowHour<6){
			qswtt = "qswtt2"
		}else if(toNowHour<12){
			qswtt = "qswtt3"
		}else if(toNowHour<24){
			qswtt = "qswtt4"
		}else{
			qswtt = "qswtt5"
		}
		if(toNowHour<10){toNowHour="0"+toNowHour}
		if(toNowMin<10){toNowMin="0"+toNowMin}
		if(toNowSec<10){toNowSec="0"+toNowSec}
		lastCheck = toNowHour+":"+toNowMin+":"+toNowSec		
		qsStr+="<td class='c "+ qswtt +"'>"+lastCheck+"</td>"
	}
	lastUTC = parseInt(GM_getValue (server+'_resTimeUTC'));
	var setTime = new Date();
	var setTimeyearNow = setTime.getFullYear();//2008
	var setTimemonthNow = setTime.getMonth();//5 6月
	var setTimedayNow = setTime.getDay();//1 周一
	var setTimedateNow = setTime.getDate();//9 9号
	var setTimehourNow = setTime.getHours();//22
	var setTimeminuteNow = setTime.getMinutes();//19
	var setTimesecondNow = setTime.getSeconds();//28
	nowUTC = parseInt(Date.UTC(setTimeyearNow,(setTimemonthNow+1),setTimedateNow,setTimehourNow,setTimeminuteNow,setTimesecondNow))
	diffUTC = nowUTC - lastUTC;
	toNowHour = Math.floor(diffUTC/1000/3600)
	toNowMin = Math.floor((diffUTC/1000)%3600/60)
	toNowSec = ((diffUTC/1000)%3600)%60
	if(toNowHour<1){
		qswtt = "qswtt1"
	}else if(toNowHour<6){
		qswtt = "qswtt2"
	}else if(toNowHour<12){
		qswtt = "qswtt3"
	}else if(toNowHour<24){
		qswtt = "qswtt4"
	}else{
		qswtt = "qswtt5"
	}
	if(toNowHour<10){toNowHour="0"+toNowHour}
	if(toNowMin<10){toNowMin="0"+toNowMin}
	if(toNowSec<10){toNowSec="0"+toNowSec}
	lastCheck = toNowHour+":"+toNowMin+":"+toNowSec

	qsStr+="</tr>"
	qsStr+="<tr class='qsWindowHead'><td class='c'>日&nbsp;&nbsp;&nbsp;产</td>"
	dayMTot = 0;
	dayCTot = 0;
	dayHTot = 0;
	for(var i=0; i<GM_getValue (server+'_Planet_Count'); i++){//name
		pName = GM_getValue (server+'_Planet_' + i +'_Name');
		pId = GM_getValue (server+'_Planet_' + i +'_ID');
		qsStr+="<td class='c'><a href=\'/game/index.php?page=resources&session="+sid+"&cp="+pId+"\'>"+pName+"</a></td>"
	}
	qsStr+="<td colspan='2'>日&nbsp;产&nbsp;总&nbsp;计</td></tr><tr class='qswM'><td class='c'>铁&nbsp;[防御]</td>"
	for(var i=0; i<GM_getValue (server+'_Planet_Count'); i++){//name
		pName = GM_getValue (server+'_Planet_' + i +'_Name');
		pId = GM_getValue (server+'_Planet_' + i +'_ID');
		dayMTot+=checker( (server+'_'+pName+'_dayM'),0);
		qsStr+="<td class='c'><a href=\'/game/index.php?page=buildings&mode=Verteidigung&session="+sid+"&cp="+pId+"\' title='防御'>"+addDots(checker ((server+'_'+pName+'_dayM'),"0"))+"</a></td>"
	}
	qsStr+="<td class='c' colspan='2'>"+addDots(dayMTot)+"</td></tr><tr class='qswC'><td class='c'>钻&nbsp;[船坞]</td>"
	for(var i=0; i<GM_getValue (server+'_Planet_Count'); i++){//name
		pName = GM_getValue (server+'_Planet_' + i +'_Name');
		pId = GM_getValue (server+'_Planet_' + i +'_ID');
		dayCTot+=checker( (server+'_'+pName+'_dayC'),0);
		qsStr+="<td class='c'><a href=\'/game/index.php?page=buildings&mode=Flotte&session="+sid+"&cp="+pId+"\'  title='船坞'>"+addDots(checker ((server+'_'+pName+'_dayC'),"0"))+"</a></td>"
	}
	qsStr+="<td class='c' colspan='2'>"+addDots(dayCTot)+"</td></tr><tr class='qswH'><td class='c'>油&nbsp;[消息]</td>"
	for(var i=0; i<GM_getValue (server+'_Planet_Count'); i++){//name
		pName = GM_getValue (server+'_Planet_' + i +'_Name');
		pId = GM_getValue (server+'_Planet_' + i +'_ID');
		dayHTot+=checker( (server+'_'+pName+'_dayH'),0);
		qsStr+="<td class='c'><a href=\'/game/index.php?page=messages&dsp=1&session="+sid+"&cp="+pId+"\'  title='消息'>"+addDots(checker ((server+'_'+pName+'_dayH'),"0"))+"</a></td>"
	}
	qsStr+="<td class='c' colspan='2'>"+addDots(dayHTot)+"</td></tr>";
	/*飞机*/
	shipCtArr =new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0)	
	qsStr+="<tr class='qsWindowHead'><td class='c'>飞&nbsp;&nbsp;&nbsp;机</td><td class='c' colspan='"+(GM_getValue (server+'_Planet_Count'))+"'>统&nbsp;&nbsp;&nbsp;计</td><td>在&nbsp;&nbsp;途</td><td>总&nbsp;&nbsp;计</td></tr>";
	for(var k=0; k<shipIdArr.length; k++){//name
		if(k%2 == 0){stripStyle='qswM'}else{stripStyle='qswC'}
		qsStr+="<tr class='"+stripStyle+"'><td class='c'>"+shipShortNameArr[k]+"&nbsp;&nbsp;</td>";
		for(var i=0; i<GM_getValue (server+'_Planet_Count'); i++){//name
			pName = GM_getValue (server+'_Planet_' + i +'_Name');
			pId = GM_getValue (server+'_Planet_' + i +'_ID');
			qsStr+="<td class='c'><a href=\'/game/index.php?page=flotten1&session="+sid+"&cp="+pId+"\' title='舰队'>"+(checker ((server+'_'+pName+'_ship'+shipIdArr[k]),0)==0?"<span class='qswtt2'>-</span>":addDots(checker ((server+'_'+pName+'_ship'+shipIdArr[k]),0)))+"</a></td>"
			shipCtArr[k]+=parseInt(checker ((server+'_'+pName+'_ship'+shipIdArr[k]),0));
		}
		qsStr+="<td>"+(checker((server+'_inAir_ship'+shipIdArr[k]),0)==0?"<span class='qswtt2'>-</span>":checker((server+'_inAir_ship'+shipIdArr[k]),0)) +"</td>"
		shipCtArr[k]+=parseInt(checker ((server+'_inAir_ship'+shipIdArr[k]),0))
		qsStr+="<td class='c'>"+shipCtArr[k]+"</td>";
	}
	qsStr+="</tbody></table></div>"
	qsWindow.innerHTML = qsStr
	GM_setValue(server+"_qsStr",qsStr)
	qsWindow.id='qsWindow'
	qsWindowDim.id='qsWindowDim'
	iniRefreshBtn = document.createElement("span")
	iniRefreshBtnA = document.createElement("a")
	iniRefreshOpt1 = document.createElement("input")
	iniRefreshOpt1.type = "checkbox"
	iniRefreshOpt1.id = "refOverview"
	if(checker(server+"_optRefF1","0")=="0"){
	    iniRefreshOpt1.checked = false
	}else{
        iniRefreshOpt1.checked = true
	}
	iniRefreshOpt1Lab = document.createElement("label")
	iniRefreshOpt1Lab.htmlFor = "refOverview"
	iniRefreshOpt1Lab.innerHTML = "刷新概况页面"
	switch ( GM_getValue(server+"_inRefAct","No") ) {
		case "YES":
			iniRefreshBtnA.innerHTML='<a style="cursor:pointer">中断刷新</a>';
			iniRefreshBtnA.innerHTML+=" | 待刷新页面数:"+GM_getValue(server+"_linkStrArrLength",0);
			break;		
		case "No":
			iniRefreshBtnA.innerHTML='<a style="cursor:pointer">启动刷新</a> | ';
		default:
			break;
	}
}
function readQsWindow(){
	/*创建窗口*/
	qsWindow = document.createElement("div")
	qsWindowDim = document.createElement("div")
	qsWindow.className='qsWindow';
	qsWindowDim.className='qsWindowDim';
	qsStr = GM_getValue(server+"_qsStr","")
	if (qsStr==""){tgqsWindow()}else{
        qsWindow.innerHTML = qsStr
        qsWindow.id='qsWindow'
        qsWindowDim.id='qsWindowDim'
        qsWindowDim.addEventListener("dblclick", function(){tgqsWindow();tgqsWindow()}, false)
        iniRefreshBtn = document.createElement("span")
        iniRefreshBtnA = document.createElement("a")
        iniRefreshOpt1 = document.createElement("input")
        iniRefreshOpt1.type = "checkbox"
        iniRefreshOpt1.id = "refOverview"
        if(checker(server+"_optRefF1","0")=="0"){
            iniRefreshOpt1.checked = false
        }else{
            iniRefreshOpt1.checked = true
        }
        iniRefreshOpt1Lab = document.createElement("label")
        iniRefreshOpt1Lab.htmlFor = "refOverview"
        iniRefreshOpt1Lab.innerHTML = "刷新概况页面"
        switch ( GM_getValue(server+"_inRefAct","No") ) {
            case "YES":
                iniRefreshBtnA.innerHTML='<a style="cursor:pointer">中断刷新</a>';
                iniRefreshBtnA.innerHTML+=" | 待刷新页面数:"+GM_getValue(server+"_linkStrArrLength",0);
                break;		
            case "No":
                iniRefreshBtnA.innerHTML='<a style="cursor:pointer">启动刷新</a>';
            default:
                break;
        }
	}
}


/*websim*/
function str_erase(str, pos0, npos){
	// take out old string
	var newstr = str.substr(0, pos0);
	// put together again
	newstr += str.substr(pos0 + npos);
	return newstr;
}

// remove all tags
function cleanup_report(r){
	var p = 0, p2 = 0;
	while(p != -1)
	{
		if((p = r.indexOf("<")) != -1)
		{
			p2 = r.indexOf(">", p);
			if(p2 != -1)
				r = str_erase(r, p, p2 - p + 1);
			else
				r = str_erase(r, p, 1);
		}
		else if((p = r.indexOf("\n")) != -1)
		{
			r = str_erase(r, p, 1);
		}
	}
	return r;
}

/*时间计算函数 根据所需时间 计算本地时间*/
function timeForecast(timeString){
	var cTimeLoc = new Date();
	var cTimeSrv = new Date();
	addTime = timeString.match(/\d+/g)
	if (addTime){
		cTimeLoc.setTime(cTimeLoc.getTime() + (parseInt(addTime[0])*3600+parseInt(addTime[1])*60+parseInt(addTime[2]))*1000);
		cTimeSrv.setTime(cTimeSrv.getTime() + (parseInt(addTime[0])*3600+parseInt(addTime[1])*60+parseInt(addTime[2]))*1000 - timeZoneDiffSec*1000);
		return humanTime(cTimeLoc)+"<br/><span class='originalTime'>"+cTimeSrv.toDateString().match(/\S+\s.\S+\s\d+/)[0]+" "+cTimeSrv.toTimeString().match(/\d+:\d+:\d+/)[0]+"</span>";
	}
}
function timeForecast2(timeString){//返程
	var cTimeLoc = new Date();
	var cTimeSrv = new Date();
	addTime = timeString.match(/\d+/g)
	if (addTime){
		cTimeLoc.setTime(cTimeLoc.getTime() + (parseInt(addTime[0])*3600+parseInt(addTime[1])*60+parseInt(addTime[2]))*2000);
		cTimeSrv.setTime(cTimeSrv.getTime() + (parseInt(addTime[0])*3600+parseInt(addTime[1])*60+parseInt(addTime[2]))*2000 - timeZoneDiffSec*1000);
		return humanTime(cTimeLoc)+"<br/><span class='originalTime'>"+cTimeSrv.toDateString().match(/\S+\s.\S+\s\d+/)[0]+" "+cTimeSrv.toTimeString().match(/\d+:\d+:\d+/)[0]+"</span>";
	}
}

/*将时间对象转换成人性化提示*/
function humanTime(fDate){
	   var timeFuture = fDate;
	   var yearFuture = timeFuture.getFullYear();//2008
	   var monthFuture = timeFuture.getMonth();//5 6月
	   var dayFuture = timeFuture.getDay();//1 周一
	   var dateFuture = timeFuture.getDate();//9 9号
	   var hourFuture = timeFuture.getHours();//22
	   var minuteFuture = timeFuture.getMinutes();//19
	   var secondFuture = timeFuture.getSeconds();//28

	   var timeNow = new Date();//
	   var yearNow = timeNow.getFullYear();//2008
	   var monthNow = timeNow.getMonth();//5 6月
	   var dayNow = timeNow.getDay();//1 周一
	   var dateNow = timeNow.getDate();//9 9号
	   var hourNow = timeNow.getHours();//22
	   var minuteNow = timeNow.getMinutes();//19
	   var secondNow = timeNow.getSeconds();//28
			if(monthNow==monthFuture){
					if(dateNow==dateFuture){
						dayAri="今天";
					}else if(dateNow==dateFuture-1){
						dayAri="明天"
					}else if(dateNow==dateFuture-2){
						dayAri="后天"
					}else if(dateNow==dateFuture+1){
						dayAri="昨天"
					}else if(dateNow==dateFuture+2){
						dayAri="前天"
					}else{
						dayAri=(monthFuture+1)+"月"+dateFuture +"号 "
					}
			}else{
						dayAri=(monthFuture+1)+"月"+dateFuture +"号 "
			}
		return dayAri+" "+((hourFuture < 10) ? "0" : "")+hourFuture+ ":"+((minuteFuture < 10) ? "0" : "")+minuteFuture+":"+((secondFuture < 10) ? "0" : "")+secondFuture
}

function buildTime(year,mon,date,hour,min,sec){
    tempTime = new Date();
    tempTime.setUTCFullYear(year,mon-1,date);
    tempTime.setUTCHours();
    tempTime.setUTCMinutes();
    tempTime.setUTCSeconds();
}

/*将人性化时间字符串转为时间对象 如果不是今年会有问题*/
function humanTime2Date(timeStr){
	var h2D = new Date();//
	var yearNow = h2D.getFullYear();//2008
	var monthNow = h2D.getMonth();//5 6月
	var dayNow = h2D.getDay();//1 周一
	var dateNow = h2D.getDate();//9 9号
	var hourNow = h2D.getHours();//22
	var minuteNow = h2D.getMinutes();//19
	var secondNow = h2D.getSeconds();//28
	var c = timeStr.match(/\S{2}\s(\d+):(\d+):(\d+)/)
	if (c){
		hToCov=c[1]
		mToCov=c[2]
		sToCov=c[3]
		monthToCov=monthNow
		if(/今天/.test(timeStr) == true){
			dateToCov = dateNow
		}else if(/明天/.test(timeStr) == true){
			dateToCov = dateNow+1
		}else if(/后天/.test(timeStr) == true){
			dateToCov = dateNow+2
		}else if(/昨天/.test(timeStr) == true){
			dateToCov = dateNow-1
		}else if(/前天/.test(timeStr) == true){
			dateToCov = dateNow-2
		}
	}else{
		var c = timeStr.match(/(\d+)\S(\d+)\S\s(\d+):(\d+):(\d+)/)
		monthToCov = c[1]-1
		dateToCov = c[2]
		hToCov=c[3]
		mToCov=c[4]
		sToCov=c[5]
	}
	h2D.setFullYear(yearNow);
	h2D.setMonth(monthToCov);
	h2D.setDate(dateToCov);
	h2D.setHours(hToCov);
	h2D.setMinutes(mToCov);
	h2D.setSeconds(sToCov);
	return h2D
}
function msgTime2Date(timeStr){//format: 09-30 05:06:30
	var h2D = new Date();//
	var yearNow = h2D.getFullYear();//2008
	var monthNow = h2D.getMonth();//5 6月
	var dayNow = h2D.getDay();//1 周一
	var dateNow = h2D.getDate();//9 9号
	var hourNow = h2D.getHours();//22
	var minuteNow = h2D.getMinutes();//19
	var secondNow = h2D.getSeconds();//28
	var c = timeStr.match(/(\d+)-(\d+)\s(\d+):(\d+):(\d+)/)
	if (c){
		hToCov=c[3]*1
		mToCov=c[4]*1
		sToCov=c[5]*1
		monthToCov=c[1]*1-1
		dayToCov=c[2]*1
        h2D.setFullYear(yearNow);
        h2D.setMonth(monthToCov);
        h2D.setDate(dayToCov);
        h2D.setHours(hToCov);
        h2D.setMinutes(mToCov);
        h2D.setSeconds(sToCov);
	}
	if(DEBUG){logToConsole("date is "+h2D);}
	return h2D
}

/*服务器转为本地时间*/
function serverTimeToLocal(serverDate){
    var sD = serverDate
    sD.setTime(sD.getTime()+timeZoneDiffSec*1000)
	if(DEBUG){logToConsole("local date is "+sD);}
    return sD
}

function humanTimeElapse(serverTime){//返回format: 09-30 05:06:30到现在的时间
    var timeNow = new Date();//现在时间
    if(DEBUG){logToConsole("serverTime is "+serverTime);}
    var oldTime = serverTimeToLocal(msgTime2Date(serverTime))
    toNow = timeNow.getTime()- oldTime.getTime();
    if(toNow<0){toNow=0}
    if(DEBUG){logToConsole("timediff is "+toNow);}
    toNowSec = Math.ceil(toNow%(3600*24*1000)%(3600*1000)%(60*1000)/1000);
    toNowMin = Math.floor(toNow%(3600*24*1000)%(3600*1000)/(60*1000));
    toNowHour = Math.floor(toNow%(3600*24*1000)/(3600*1000))
    toNowDay = Math.floor(toNow/(3600*24*1000))
    logToConsole(toNowSec)
    logToConsole(toNowMin)
    logToConsole(toNowHour)
    logToConsole(toNowDay)
    t = ((toNowDay==0)?"":toNowDay+"<span class=messTime>天</span>")+
    ((toNowHour==0)?"":toNowHour+"<span class=messTime>时</span>")+
    ((toNowMin==0)?"":toNowMin+"<span class=messTime>分</span>")+
    ((toNowSec==0)?"":toNowSec+"<span class=messTime>秒</span>");
    if(t==""){t="刚才"}
    return t
}

/*由秒数换算成为小时分钟*/
function s2c(s){
    var h = Math.floor(s/3600);
    var m = Math.floor((s%3600)/60);
    var s = (s%3600)%60;
    return ((h<10)?"0":"")+h+":"+((m<10)?"0":"")+m+":"+((s<10)?"0":"")+s
}

/*概况页面替换舰队资源名称*/
function replaceFleetRes(str){
	switch (str){
        /*概况页*/
		case "飞船的數量:":
		case "飞船的数量:：":
		case "飛船的數量:":
		case "ships:":
		case "Number of ships":
		str = "总"
		return str
		break;
		case "运输: 金属：":
		case "金属：":
		case "金属:":
		case "運輸: 金屬:":
		case "金屬:":
		case "Transport: Metal:":
		case "Metal:":
		str = "铁"
		return str
		break;
		case "晶体：":
		case "晶体:":
		case "晶體:":
		case "Crystal:":
		str = "钻"
		return str
		break;
		case "重氢：":
		case "重氢:":
		case "重氫:":
		case "Deuterium:":
		str = "油"
		return str
		break;
		/*概况页*/
		case "小型运输舰":
		case "小型运输舰:":
		case "小型運輸艦":
		case "小型運輸艦:":
		case "Small Cargo":
		case "Small Cargo:":
		str = "小"
		return str
		break;
		case "大型运输舰":
		case "大型运输舰:":
		case "大型運輸艦":
		case "大型運輸艦:":
		case "Large Cargo":
		case "Large Cargo:":
		str = "大"
		return str
		break;
		case "轻型战斗机":
		case "轻型战斗机:":
		case "輕型戰鬥機":
		case "輕型戰鬥機:":
		case "Light Fighter":
		case "Light Fighter:":
		str = "轻"
		return str
		break;
		case "重型战斗机":
		case "重型战斗机:":
		case "重型戰鬥機":
		case "重型戰鬥機:":
		case "Heavy Fighter":
		case "Heavy Fighter:":
		str = "重"
		return str
		break;
		case "巡洋舰":
		case "巡洋舰:":
		case "巡洋艦":
		case "巡洋艦:":
		case "Cruiser":
		case "Cruiser:":
		str = "巡"
		return str
		break;
		case "战列舰":
		case "战列舰:":
		case "戰列艦":
		case "戰列艦:":
		case "Battleship":
		case "Battleship:":
		str = "战"
		return str
		break;
		case "殖民船":
		case "殖民船:":
		case "殖民船":
		case "殖民船:":
		case "Colony Ship":
		case "Colony Ship:":
		str = "殖"
		return str
		break;
		case "回收船":
		case "回收船:":
		case "回收船":
		case "回收船:":
		case "Recycler":
		case "Recycler:":
		str = "回"
		return str
		break;
		case "探测器":
		case "探测器:":
		case "間諜衛星":
		case "間諜衛星:":
		case "Espionage Probe":
		case "Espionage Probe:":
		str = "探"
		return str
		break;
		case "轰炸机":
		case "轰炸机:":
		case "導彈艦":
		case "導彈艦:":
		case "Bomber":
		case "Bomber:":
		str = "轰"
		return str
		break;
		case "毁灭者":
		case "毁灭者:":
		case "毀滅者":
		case "毀滅者:":
		case "Destroyer":
		case "Destroyer:":
		str = "毁"
		return str
		break;
		case "死星":
		case "死星:":
		case "死星":
		case "死星:":
		case "Deathstar":
		case "Deathstar:":
		str = "死"
		return str
		break;
		case "战斗巡洋舰":
		case "战斗巡洋舰:":
		case "戰鬥巡洋艦":
		case "戰鬥巡洋艦:":
		case "Battlecruiser":
		case "Battlecruiser:":
		str = "战巡"
		return str
		break;
	}
}

/*坐标框*/
function focusTA(){
	this.value=""
}
function checkTA(){
	//alert(this.value);
	var str = this.value
	this.value="Where Do You Want To Go Today?"
	if (str != '') {
		selectCord = str.match(/\d+[:\.\s-\/\\,]\d+[:\.\s-\/\\,]\d+/);
		if(!selectCord){shortSelCord = str.match(/\d+[:\.\s-\/\\,]\d+/);}
		if (selectCord&&(/page=flotten2/.test(ogtitle) == true)){
			selectCordArr = selectCord[0].match(/\d+/g)
			if (selectCordArr[0]<10&&selectCordArr[1]<500&&selectCordArr[2]<17){
				unsafeWindow.setTarget(selectCordArr[0],selectCordArr[1],selectCordArr[2],1)
				unsafeWindow.shortInfo();
			}
		}else if(selectCord&&(/page=flotten2/.test(ogtitle) == false)){
			selectCordArr = selectCord[0].match(/\d+/g)
			if (selectCordArr[0]<10&&selectCordArr[1]<500&&selectCordArr[2]<17){
				unsafeWindow.showGalaxy(selectCordArr[0],selectCordArr[1],selectCordArr[2])
			}
		}
		if (shortSelCord&&(/page=flotten2/.test(ogtitle) == false)){
			selectCordArr = shortSelCord[0].match(/\d+/g)
			if (selectCordArr[0]<10&&selectCordArr[1]<500){
				unsafeWindow.showGalaxy(selectCordArr[0],selectCordArr[1],1)
			}
		}
	}
}

/*生成自动刷新的链接*/
function genLinks() {
    inRefAct=GM_getValue(server+"_inRefAct","No")
    if(DEBUG){logToConsole("inRefAct = "+inRefAct)}
//	if (inRefAct=="No"){
        linkArr=new Array();
        if(DEBUG){logToConsole("palanet count = "+GM_getValue (server+'_Planet_Count'))}
        for(var i=0; i<GM_getValue (server+'_Planet_Count'); i++){//name
            pId = GM_getValue (server+'_Planet_' + i +'_ID');
            linkArr.push("/game/index.php?page=flotten1&session="+sid+"&mode=Flotte"+"&cp="+pId);    linkArr.push("/game/index.php?page=resources&session="+sid+"&pc=1");
            var optRefF1 = GM_getValue(server+"_optRefF1","0")
            if(optRefF1=="1"){
                linkArr.push("/game/index.php?page=overview&session="+sid);
            }
        }
        linkArr.push("/game/index.php?page=overview&session="+sid);
        linkStr=linkArr.join("^");
        if(DEBUG){logToConsole("links = "+linkStr)}
        GM_setValue(server+"_linkStr",linkStr)
//	}
}
/*自动刷新*/
function refreshLinks() {
//alert("dd");
    if(GM_getValue(server+"_inRefAct")=="YES"){
	    linkStr = GM_getValue(server+"_linkStr")
	    if(linkStr){
            linkStrArr = new Array();
            templinkStrArr = linkStr.split("^")
            for(var i=0; i<templinkStrArr.length; i++){//name
                if(templinkStrArr[i]!=''){
                    linkStrArr.push(templinkStrArr[i])
                }
            }
            //unsafeWindow.gotoLink = linkStrArr.pop()
            gotoLink = linkStrArr.shift()
            if(linkStrArr.length==0){GM_setValue(server+"_inRefAct","No")}
            linkStr=""
            linkStr = linkStrArr.join("^");
            GM_setValue(server+"_linkStr",linkStr)
            if(DEBUG){logToConsole("gotoLink:")}
            if(DEBUG){logToConsole(gotoLink)}
            if(DEBUG){logToConsole("links count:")}
            if(DEBUG){logToConsole(linkStrArr.length)}
            GM_setValue(server+"_linkStrArrLength",linkStrArr.length)
            tgqsWindow();
            t = setTimeout(function(){location.href="http://"+location.host+gotoLink;},1234);
        }
	}
}

/*获得地址中的参数值*/
function getHVal(ValName){
    tempStr=location.href
    varArr=tempStr.split("&")
    for(i=0;i<varArr.length;i++){
        varThis=varArr[i].split('=');
        if (varThis[0]==ValName){
            return varThis[1];
        }
    }
}

function getUrlVal(u,v){
	var c = u.split('&');
	for(var s=0;s<c.length;s++){
		var cc = c[s].split('=');
		if(cc[0]==v){
			return cc[1]
		}
	}
}

function getMainBall(event){
    var link = this.previousSibling.childNodes[1].href;
    var rank = this.previousSibling.childNodes[1].innerHTML;
    var vT = this
    vT.innerHTML=""
    GM_xmlhttpRequest({
        method: 'GET',
        url: link,
        onload: function(responseDetails) {
            //alert('Request for Atom feed returned ' + responseDetails.status + ' ' + responseDetails.statusText);
            //vT.innerHTML=dealRankPage(responseDetails.responseText);
            tempIframe = document.createElement("div")
            tempIframe.innerHTML = responseDetails.responseText
            var tTrs = tempIframe.getElementsByTagName("tr")
            //alert(tTrs.length)
            //alert(tTrs[0].innerHTML)
            for(i=0;i<tTrs.length;i++){
                var thS = tTrs[i].getElementsByTagName('th') 
                if(thS.length==5){
                    if(thS[0].innerHTML.match(/\d+/)==rank){
                    		var hR = thS[1].getElementsByTagName("a")[0].href
                        vT.href = hR
                        vT.innerHTML = "[Go: "+getUrlVal(hR,'p1')+":"+getUrlVal(hR,'p2')+":"+getUrlVal(hR,'p3')+"]"
                        vT.removeEventListener('click',getMainBall,false)
                    }
                }
            }
        },
        onreadystatechange: function(responseDetails){
            vT.innerHTML+="."
        }
    });
}

/*计算运输船可以运多少资源*/
function calRaid(metal, crystal, deuterium, capacity) {// from http://userscripts.org/scripts/show/23214
    var temp;
    var pl_metal = 0;
    var pl_crystal = 0;
    var pl_deuterium = 0;
    var pl_resources;

    // 1
    var rem_metal = Math.floor(metal/2);
    var rem_crystal = Math.floor(crystal/2);
    var rem_deuterium = Math.floor(deuterium/2);

    // 2
    temp = Math.min(Math.ceil(capacity/3), rem_metal);
    pl_metal += temp;
    rem_metal -= temp;
    capacity -= temp;

    // 3
    temp = Math.min(Math.ceil(capacity/2), rem_crystal);
    pl_crystal += temp;
    rem_crystal -= temp;
    capacity -= temp;

    // 4
    temp = Math.min(capacity, rem_deuterium);
    pl_deuterium += temp;
    rem_deuterium -= temp;
    capacity -= temp;

    // 5
    temp = Math.min(Math.ceil(capacity/2), rem_metal);
    pl_metal += temp;
    rem_metal -= temp;
    capacity -= temp;

    // 6
    temp = Math.min(capacity, rem_crystal);
    pl_crystal += temp;
    rem_crystal -= temp;
    capacity -= temp;

    pl_resources = new Array(pl_metal, pl_crystal, pl_deuterium);
    return pl_resources;
}

Array.prototype.sum = function() {
    var sum = 0;
    for (var i=0; i<this.length; i++){
        sum += this[i];
    }
    return sum;
}

function init(){
	DEBUG = false;
//	DEBUG = true;
	logToConsole("Ogame Advanced Options Mod, for cn,tw and org servers. Please post suggestions, bug reports, money and love to shisonghua@gmail.com, Thanks.")
	notdetected = false;
	ogtitle = window.location.href;
	ogserver = /http\:\/\/([\-\.0-9a-zA-Z]+)\//.exec(ogtitle);
	
	//适应语言
	days = new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
	months = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
	O_months=new Array();
        O_months[0] =new Array('January','February','March','April','May','June','July','August','September','October','November','December');//ogame.org
        O_months[15]=new Array('January','February','March','April','May','June','July','August','September','October','November','December');//ogame.tw
        O_months[17]=new Array('一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月');//ogame.com.cn
	
	O_days=new Array();
        O_days[0] =new Array('Sunday,','Monday,','Tuesday,','Wednesday,','Thursday,','Friday,','Saturday,');//ogame.org
        O_days[15]=new Array('Sunday,','Monday,','Tuesday,','Wednesday,','Thursday,','Friday,','Saturday,');//ogame.tw
        O_days[17]=new Array('周日,','周一,','周二,','周三,','周四,','周五,','周六,');//ogame.com.cn

    shipIdArr = new Array('202','203','204','205','206','207','208','209','210','211','212','213','214','215');
    shipNameArr = new Array;
    shipNameArr[0] = new Array('Small Cargo','Large Cargo','Light Fighter','Heavy Fighter','Cruiser','Battleship','Colony Ship','Recycler','Espionage Probe','Bomber','Solar Satellite','Destroyer','Deathstar','Battlecruiser')
    shipNameArr[15] = new Array('小型運輸艦','大型運輸艦','輕型戰鬥機','重型戰鬥機','巡洋艦','戰列艦','殖民船','回收船','間諜衛星','導彈艦','太陽能衛星','毀滅者','死星','戰鬥巡洋艦')
    shipNameArr[17] = new Array('小型运输舰','大型运输舰','轻型战斗机','重型战斗机','巡洋舰','战列舰','殖民船','回收船','探测器','轰炸机','太阳能卫星','毁灭者','死星','战斗巡洋舰')
    shipShortNameArr = new Array('小运','大运','轻战','重战','巡洋','战列','殖民','回收','探测','轰炸','太卫','毁灭','死星','战巡')

	if(ogserver != null){ ogserver = RegExp.$1; } else { ogserver = "0"; }
	logToConsole("ogserver is "+ogserver)	
	langstr = /http\:\/\/[\-\.0-9a-zA-Z]+\.([a-z]+)\//.exec(ogtitle);

	if(langstr != null){ langstr = RegExp.$1; } else { langstr = checker((ogserver+"langstr"),"not"); notdetected = true; }
	logToConsole("language is "+langstr)

	switch(langstr){
		case "org":
			langloca = "0"; X_mlg = /(Metal: )<b>([\.0-9]+)/; X_clg = /(Crystal: )<b>([\.0-9]+)/; X_dlg = /(Deuterium: )<b>([\.0-9]+)/; X_elg = /(Energy: )<b>([\.0-9]+)/; X_lvl = /\(level (\d+)/;X_m=/Metal/;X_c=/Crystal/;X_h=/Deuterium/;
		break;
		case "tw":
			langloca = "15"; X_mlg = /(\u91D1\u5C6C: )<b>([\.0-9]+)/; X_clg = /(\u6676\u9AD4: )<b>([\.0-9]+)/; X_dlg = /(\u91CD\u6C2B: )<b>([\.0-9]+)/; X_elg = /(\u80FD\u91CF: )<b>([\.0-9]+)/; X_lvl = /\(\u7B49\u7D1A (\d+)/;X_m=/金屬/;X_c=/晶體/;X_h=/重氫/;
		break;
		case "cn":
		case "com":
			langloca = "17"; X_mlg = /(金属: )<b>([\.0-9]+)/; X_clg = /(晶体: )<b>([\.0-9]+)/; X_dlg = /(重氢: )<b>([\.0-9]+)/; X_elg = /(能量: )<b>([\.0-9]+)/; X_lvl = /\(等级 (\d+)/;X_m=/金属/;X_c=/晶体/;X_h=/重氢/;
		break;
		default:
			langloca = checker((ogserver+"langloca"),"0");
			notdetected = true;
			X_mlg = /(Metal: )<b>([\.0-9]+)/; X_clg = /(Crystal: )<b>([\.0-9]+)/; X_dlg = /(Deuterium: )<b>([\.0-9]+)/; X_elg = /(Energy: )<b>([\.0-9]+)/; X_lvl = /\(level (\d+)/;
	}
	if(/\.cn\./.test(ogtitle)){langloca = "17"; X_mlg = /(金属: )<b>([\.0-9]+)/; X_clg = /(晶体: )<b>([\.0-9]+)/; X_dlg = /(重氢: )<b>([\.0-9]+)/; X_elg = /(能量: )<b>([\.0-9]+)/; X_lvl = /\(等级 (\d+)/;X_m=/金属/;X_c=/晶体/;X_h=/重氢/;}//2008-10-22 国服的地址变得好迅速，看来时脉冲12级的速度
						
	if(DEBUG){logToConsole(ogtitle+" "+ogserver+" "+langloca);}
	
	localtime = checker((ogserver+"localtime"),"1");
	/**/
	if ((/page=overview/.test(window.location.href) == true) && (localtime == "1")) {
		var LT_loc = new Array(); 
			LT_loc[0] = "Local time"; //ogame.org
			LT_loc[15] = "本地時間"; //ogame.tw
			LT_loc[17] = "当地时间"; //ogame.com.cn
		var nodo = xpath('//div[@id="content"]/center/table[1]/tbody').snapshotItem(0);
		//alert(nodo.innerHTML);
		if (nodo.childNodes[2].innerHTML.search('colspan="3"') != -1){
			nodo = nodo.childNodes[2];
		}else{
		nodo = nodo.childNodes[4];
		}
		var date = new Date();
		var mes = date.getMonth();
		var dia = date.getDay();
		var diaNum = date.getDate();
		var hora = date.getHours();
		var mins = date.getMinutes();
		var segs = date.getSeconds();
		var years = date.getFullYear();
		
		var fecha = nodo.innerHTML.match(/(\S\S\S) (\S\S\S) (\d+) (\d+)(:\d\d:\d\d)/);
		logToConsole("fecha="+fecha)
		var fechaLocal = O_days[langloca][dia] + " " + diaNum + " - " + O_months[langloca][mes] + " - " + ((hora < 10) ? "0" : "") + hora + ((mins < 10) ? ":0" : ":") + mins + ((segs < 10) ? ":0" : ":") + segs;
		var fechaServer = O_days[langloca][findPos(days,fecha[1])] + " " + fecha[3] + " - " + O_months[langloca][findPos(months, fecha[2])] + " - " + ((fecha[4] < 10) ? "0" : "") + fecha[4] + fecha[5];
		
		var sT = new Date(years,findPos(months, fecha[2]),fecha[3],fecha[4],fecha[5].match(/\d+/g)[0],fecha[5].match(/\d+/g)[1]);
		logToConsole("sT="+sT)
		dSec = Math.round((date.getTime()-sT.getTime())/1000)
		GM_setValue(ogserver+"timeZoneDiffSec",(dSec-GM_getValue("timeZoneDiffSecMan",0)))//服务器计算的有问题吧...
		logToConsole("dSec="+dSec)
		
		var nodoLocal = document.createElement("tr");
		nodo.parentNode.insertBefore(nodoLocal, nodo.nextSibling);
		nodoLocal.innerHTML = "<th>"+LT_loc[langloca]+"</th><th colspan='3' id='ClockLocal'>" + fechaLocal + "</th>";
		nodo.childNodes[3].setAttribute('id', 'ClockServer');
		nodo.childNodes[3].innerHTML = fechaServer;
		setTimeout(clock, 1000);
	}

	/* 准确获得Session ID!!! */
	if(DEBUG){logToConsole("location is "+location);}
	sid=""
	sida = location.search.split('&')
	//GM_log(sida)
	for(var i=0; i<sida.length; i++){
		sidb=sida[i].split('=');
		if (sidb[0]=='session'){
		//GM_log(sidb[0])
			sid=sidb[1];
		}
	}
	gPressed = 0
	disableKey = 0
	txtArCheck = 0
    
    /*窗口大小*/
    if (parseInt(navigator.appVersion)>3) {
        if (navigator.appName=="Netscape") {
            wW = window.innerWidth;
            wH = window.innerHeight;
        }
        if (navigator.appName.indexOf("Microsoft")!=-1) {
            wW = document.body.offsetWidth;
            wH = document.body.offsetHeight;
        }
    }

	/* 通用参数*/
	//格式:{name:'xxxx', url:'xxxxx', color:'xxx'}
	internal_links = new Array(
		{name:'月门', url:'index.php?page=infos&session='+sid+'&gid=43' },
		//{name:'群組管理', url:'index.php?page=allianzen&session='+sid+'&a=7&sort1=5&sort2=1'},
		{name:'群发', url:'index.php?page=allianzen&session='+sid+'&a=17'}
	)
	external_links = new Array(
	  {name:'惩处表', url:'pranger.php?'},
	//	{name:'星图查询', url:'http://www.ssogame.cn/searchindex.aspx'},
		{name:'CWEB', url:'http://cwebgame.com/forum-18-1.html'}
	)

	advanced_jump_gate = true;
	
	loc = document.location;
	reg = /http:\/\/(.*?)\/game\/index.php\?page=(.*?)&session=(.*?)/i;
	result = reg.exec(loc);
	try{server = result[1];}catch(e){logToConsole(e);}

	/*建筑界面使用*/
	C_nn= new Array();
	  C_nn[0] = new Array(); C_nn[0][0] ='Small cargo';C_nn[0][1] ="Large cargo"; //ogame.org
	  C_nn[15] = new Array();C_nn[15][0]='小型運輸艦';C_nn[15][1]="大型運輸艦"; //ogame.tw
	  C_nn[17] = new Array();C_nn[17][0]='小型运输舰';C_nn[17][1]="大型运输舰"; //ogame.com.cn
	



	
	if(/page=bericht/.test(ogtitle) != true){
		x = document.createElement('DIV');
		x.setAttribute('id','addcord');
		x.style.textAlign='center';
		y = document.createElement('INPUT');
		y.setAttribute('id','addcor');
		y.setAttribute('type','submit');
		y.value='添加坐标';
		y.addEventListener('click',addCoords,true);
		x.appendChild(y);
	//		x.appendChild(document.createElement('TH'));
		y = document.createElement('INPUT');
		y.setAttribute('type','submit');
		y.setAttribute('id','addcor3');
		y.value='编辑坐标';
		y.addEventListener('click',tgCordList,true);
		x.appendChild(y);
	//		x.appendChild(document.createElement('TH'));
		y = document.createElement( 'INPUT' );
		y.setAttribute('type','submit');
		y.setAttribute('id','addcor2');
		y.value='重置坐标';
		y.addEventListener('click',delAll,true);
		x.appendChild(y);
		y = document.createElement( 'INPUT' );
		y.setAttribute('type','submit');
		y.setAttribute('id','empireView');
		y.value='帝国';
		y.addEventListener('click',tgqsWindow,true);
		x.appendChild(y);
		try{ document.getElementById('menu').appendChild(x);}catch(e){logToConsole(e)}	
		/* 去除左边链接中的帮助、法律等链接 */
		var elems = new Array();
		var elems = ['board.', 'tutorial.','regeln.','portal','logout','suche','impressum'];
		var td = xpath("//div[@id='leftmenu']/center/div[@id='menu']/table/tbody/tr/td");//由DOM改为Xpath
		for (var i = 0; i < td.snapshotLength; i++){
			for (var elem in elems){
				if (td.snapshotItem(i).innerHTML.indexOf(elems[elem]) >= 0){
					//alert(elems[elem])
					if ((external_links && elems[elem] == 'portal')||(external_links && elems[elem] == 'impressum')){
						last_item = td.snapshotItem(i).parentNode;
					}else if(internal_links && elems[elem] == 'suche'){
						mid_item = td.snapshotItem(i).parentNode;
					}else{
						//td.snapshotItem(i).parentNode.removeChild(td.snapshotItem(i));
						td.snapshotItem(i).parentNode.parentNode.removeChild(td.snapshotItem(i).parentNode);
					}
				}
			}
		}
	}
					
	color_m = checker((ogserver+"colorm"),"#F1531E");
	color_c = checker((ogserver+"colorc"),"#54B0DC");
	color_d = checker((ogserver+"colord"),"#9AACCB");
	color_e = checker((ogserver+"colore"),"#F2D99D");
	
	mission_colors = checker((ogserver+"missioncolors"),"1");
	color_attack = checker((ogserver+"colorat"),"#00ff00");
	color_spy = checker((ogserver+"colores"),"#ffa500");
	color_otransport = checker((ogserver+"colorotr"),"#52a2dc");
	color_transport = checker((ogserver+"colortr"),"#a401ff");
	color_harvest = checker((ogserver+"colorha"),"#20d0bc");
	
	standardads = checker((ogserver+"standardads"),"1");
	darkmatter = checker((ogserver+"darkmatter"),"0");
	oclink = checker((ogserver+"oclink"),"0");
	topicons = checker((ogserver+"topicons"),"0");
	
	relvl = checker((ogserver+"relvl"),"1");
	harvest = checker((ogserver+"harvest"),"1");
	moonspy = checker((ogserver+"moonspy"),"1");
	readytime = checker((ogserver+"readytime"),"1");
	maxships = checker((ogserver+"maxships"),"1");
	calcships = checker((ogserver+"calcships"),"1");
	collapsedesc = checker((ogserver+"collapsedesc"),"0");

	advstor = checker((ogserver+"advstor"),"1");
	advmess = checker((ogserver+"advmess"),"1");
	dRaidLC = checker((ogserver+"dRaidLC"),"2");
	dRaidSC = checker((ogserver+"dRaidSC"),"10");
	lemenu = checker((ogserver+"lemenu"),"1");
	
	colLink = checker((ogserver+"colLink"),"0");
	expLink = checker((ogserver+"expLink"),"0");
	bigLaji = checker((ogserver+"bigLaji"),"20000");
	localtimeF1 = checker((ogserver+"localtimeF1"),"1");

	timeZoneDiffSec = checker((ogserver+"timeZoneDiffSec"),"0");
	timeZoneDiffSecMan = checker((ogserver+"timeZoneDiffSecMan"),"2");
	moonSpyCount = checker((ogserver+"moonSpyCount"),"2");
	timeZoneDiffSec = timeZoneDiffSec*1;
	timeZoneDiffSecMan = timeZoneDiffSecMan*1
	localMissionTimeInOverView = checker((ogserver+"localMissionTimeInOverView"),"1");
	
	refreshOverViewOnAvr =  checker((ogserver+"refreshOverViewOnAvr"),"1");//任务抵达后自动刷新概况 
	cordBoxInCorner = checker((ogserver+"cordBoxInCorner"),"1");
	moonCordExt = checker((ogserver+"moonCordExt"),"1");
	
	useCSS = checker((ogserver+"useCSS"),"0");
	useCSS2 = checker((ogserver+"useCSS2"),"1");

    if(useCSS=="1"){
        var css='*,a{background:transparent !important;color:#121 !important;text-decoration:none !important;font:normal 11px/13px "hiragino kaku gothic pro",Monaco,"bank gothic","Lucida Grande","Lucida Sans Unicode","Andale Mono","synchro LET","OCR A Std",hei !important}body{background:#E8E8E8 !important;overflow:auto !important}* select,input{color:slategrey !important;border:1px dotted !important}input:focus{border-width:0 !important;color:#C43E43 !important;text-decoration:blink !important}#bxx{font-size:12px !important;color:#333133 !important}#bxx a{font-size:12px !important;color:#993133 !important}#header_top tr td>td>td,#combox_container,#darkmatter2{display:none !important}.l,table,tr,th,td{border-collapse:collapse !important}div#header_top center table.header tbody tr.header td.header{position:fixed !important;left:2px !important;top:20px !important}div#header_top center table.header tbody tr.header img{display:none !important}#menu div[align="center"]{text-align:left !important}#overdiv{background:-moz-rgba(230,230,250,0.85) !important;width:auto !important;border:1px dotted black !important}a:hover{background:DodgerBlue !important;color:Bisque !important;-moz-border-radius:2px !important}#menu p,imggg{display:none !important}#menu img{background:snow !important;display:block !important;border:3px solid Thistle !important;-moz-border-radius:0 15px !important;padding:5px !important;margin-top:6px !important;width:0 !important;height:0 !important;cursor:pointer !important}#menu{text-align:right !important;top:140px !important;left:10px !important}table[width="519"] tr:hover{background:aliceblue !important}table[width="468"] tr:hover{background:aliceblue !important}table[width="550"] tr:hover{background:aliceblue !important}table[width="470"] tr:hover{background:aliceblue !important}table[width="569"] tr:hover{background:aliceblue !important}table[width="468"]{width:520px !important}table[width="468"] td{width:auto !important;vertical-align:middle !important}table[width="468"] tbody tr td table tr td a{font-size:12px !important}table[width="468"] tbody tr td+td font{font-size:12px !important}table[width="468"] td a{font-size:14px !important}i b font{text-decoration:none !important;font-style:normal !important;font-weight:normal !important}table[width="530"]{width:580px !important}#content{height:auto !important;top:50px !important;left:150px !important}table[width="519"]{width:auto !important}div#header_top table.header[id="resources"] tr.header + tr.header td.header{font-size:12px !important;text-align:left !important;width:150px !important;position:fixed !important;left:10px !important;top:46px !important}div#header_top table.header[id="resources"] tr.header + tr.header td.header + td.header{top:64px !important}div#header_top table.header[id="resources"] tr.header + tr.header td.header + td.header + td.header{top:81px !important}div#header_top table.header[id="resources"] tr.header + tr.header td.header + td.header + td.header + td.header + td.header{top:99px !important}div#header_top table.header[id="resources"] tr.header + tr.header td.header + td.header + td.header + td.header{top:116px !important}div#header_top table.header[id="resources"] tr.header + tr.header + tr.header td.header{text-align:right !important;width:90px !important;position:fixed !important;right:14px !important;top:46px !important;left:30px !important}div#header_top table.header[id="resources"] tr.header + tr.header + tr.header td.header + td.header{top:64px !important;left:30px !important}div#header_top table.header[id="resources"] tr.header + tr.header + tr.header td.header + td.header + td.header{top:81px !important;left:30px !important}div#header_top table.header[id="resources"] tr.header + tr.header + tr.header td.header + td.header + td.header + td.header + td.header{top:99px !important;left:30px !important}div#header_top table.header[id="resources"] tr.header + tr.header + tr.header td.header + td.header + td.header + td.header{top:116px !important;left:30px !important}img[width="50"]{display:inline !important;border:5px solid !important;-moz-border-radius:100% !important;padding:5px !important;margin-top:0 !important;width:0 !important;height:0 !important}img[width="200"]{display:inline !important;border:15px solid !important;-moz-border-radius:88px !important;padding:5px !important;margin-top:20px !important;width:0 !important;height:0 !important}th[class="s"] tr th{font-size:14px !important}th[class="s"] tr th br{line-height:0 !important}th[class="s"] tr th center,table[width="519"]>tbody>tr>th[colspan="2"] center{font-size:10px !important}img[width="30"]{background:RoyalBlue !important;display:block !important;border:5px solid Navy !important;-moz-border-radius:18px !important;padding:5px !important;margin-left:4px !important;width:0 !important;height:0 !important}img[width="22"]{background:SandyBrown !important;display:block !important;border:5px solid Salmon !important;-moz-border-radius:18px !important;padding:5px !important;margin-left:4px !important;width:0 !important;height:0 !important}table[width="519"] tr[class="return"] th+th,table[width="519"] tr[class="flight"] th+th,table[width="519"] tr[class=""] th+th,table[width="519"] tr[class="holding"] th+th{text-align:left !important}span[class="flight ownharvest"]:before{content:url("data:image/gif;base64,R0lGODlhGgANAIABAABmzP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD2ME4FBbzdU51O114Nhx2GmmaLiSXivG8Ky6tXzTbM7vPlAAACH5BAkKAAEALAAAAAAaAA0AAAInjI+py+0PowTgUFvN1Rl7/gVbOJbddaZkaq4uCItq3NKz/OJ2XgcFACH5BAkKAAEALAAAAAAaAA0AAAIpjI+py+0PowwAnHqtwVvn34GU5XGjaFZpyaJnCL/yirYxfduzju81WAAAIfkECQoAAQAsAAAAABoADQAAAimMj6nL7Q+jNACcei3VAXO8ZeIGdt85dmZatlwIr7HLorMt5/Rd9zxfAAAh+QQFCgABACwAAAAAGgANAAACKYyPqcvtD2MEB1Bj6w0Z291x4FiJ2umhasiSSLu6ZkrPNlzjt6z3/FgAADs=");padding:5px !important}span[class="return ownharvest"]:before{content:url("data:image/gif;base64,R0lGODlhGgANAIABAMTExP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD2MEB1Bj6w0Z7859okZ6ZXiC6mi2qLtW7xy7MEtvdzridV4AACH5BAkKAAEALAAAAAAaAA0AAAIpjI+py+0PozQAnHot1QHvDH5ix3lkeI7mWrYo+1auOnfpDY90jO7+WQAAIfkECQoAAQAsAAAAABoADQAAAimMj6nL7Q+jDACceq3BW1PPfdnYkWKJnmrIgq7Zjm8ad/U6Uzic03ldAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD6ME4FBbzdU5bN99YkhiJneC6biW6KsiLMy68T3OuF3pflcAACH5BAUKAAEALAAAAAAaAA0AAAIojI+py+0PYwTgUFvN1Tls331iSGImd4LpuJboqyIsPLc26sb6WPdhAQA7");padding:5px}span[class="flight ownattack"]:before,span[class="attack"]:before{content:url("data:image/gif;base64,R0lGODlhGgANAIABAP8AAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD2ME4FBbzdU51O114Nhx2GmmaLiSXivG8Ky6tXzTbM7vPlAAACH5BAkKAAEALAAAAAAaAA0AAAInjI+py+0PowTgUFvN1Rl7/gVbOJbddaZkaq4uCItq3NKz/OJ2XgcFACH5BAkKAAEALAAAAAAaAA0AAAIpjI+py+0PowwAnHqtwVvn34GU5XGjaFZpyaJnCL/yirYxfduzju81WAAAIfkECQoAAQAsAAAAABoADQAAAimMj6nL7Q+jNACcei3VAXO8ZeIGdt85dmZatlwIr7HLorMt5/Rd9zxfAAAh+QQFCgABACwAAAAAGgANAAACKYyPqcvtD2MEB1Bj6w0Z291x4FiJ2umhasiSSLu6ZkrPNlzjt6z3/FgAADs=");padding:5px}span[class="return ownattack"]:before{content:url("data:image/gif;base64,R0lGODlhGgANAIABAMTExP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD2MEB1Bj6w0Z7859okZ6ZXiC6mi2qLtW7xy7MEtvdzridV4AACH5BAkKAAEALAAAAAAaAA0AAAIpjI+py+0PozQAnHot1QHvDH5ix3lkeI7mWrYo+1auOnfpDY90jO7+WQAAIfkECQoAAQAsAAAAABoADQAAAimMj6nL7Q+jDACceq3BW1PPfdnYkWKJnmrIgq7Zjm8ad/U6Uzic03ldAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD6ME4FBbzdU5bN99YkhiJneC6biW6KsiLMy68T3OuF3pflcAACH5BAUKAAEALAAAAAAaAA0AAAIojI+py+0PYwTgUFvN1Tls331iSGImd4LpuJboqyIsPLc26sb6WPdhAQA7");padding:5px}span[class="federation"]:before{content:url("data:image/gif;base64,R0lGODlhGgANAIABAP8AAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD2ME4FBbzdU51O114Nhx2GmmaLiSXivG8Ky6tXzTbM7vPlAAACH5BAkKAAEALAAAAAAaAA0AAAInjI+py+0PowTgUFvN1Rl7/gVbOJbddaZkaq4uCItq3NKz/OJ2XgcFACH5BAkKAAEALAAAAAAaAA0AAAIpjI+py+0PowwAnHqtwVvn34GU5XGjaFZpyaJnCL/yirYxfduzju81WAAAIfkECQoAAQAsAAAAABoADQAAAimMj6nL7Q+jNACcei3VAXO8ZeIGdt85dmZatlwIr7HLorMt5/Rd9zxfAAAh+QQFCgABACwAAAAAGgANAAACKYyPqcvtD2MEB1Bj6w0Z291x4FiJ2umhasiSSLu6ZkrPNlzjt6z3/FgAADs=");padding:5px}span[class="flight owndestroy"]:before{content:url("data:image/gif;base64,R0lGODlhGgANAIABAP8AAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD2ME4FBbzdU51O114Nhx2GmmaLiSXivG8Ky6tXzTbM7vPlAAACH5BAkKAAEALAAAAAAaAA0AAAInjI+py+0PowTgUFvN1Rl7/gVbOJbddaZkaq4uCItq3NKz/OJ2XgcFACH5BAkKAAEALAAAAAAaAA0AAAIpjI+py+0PowwAnHqtwVvn34GU5XGjaFZpyaJnCL/yirYxfduzju81WAAAIfkECQoAAQAsAAAAABoADQAAAimMj6nL7Q+jNACcei3VAXO8ZeIGdt85dmZatlwIr7HLorMt5/Rd9zxfAAAh+QQFCgABACwAAAAAGgANAAACKYyPqcvtD2MEB1Bj6w0Z291x4FiJ2umhasiSSLu6ZkrPNlzjt6z3/FgAADs=");padding:5px}span[class="return owndestroy"]:before{content:url("data:image/gif;base64,R0lGODlhGgANAIABAMTExP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD2MEB1Bj6w0Z7859okZ6ZXiC6mi2qLtW7xy7MEtvdzridV4AACH5BAkKAAEALAAAAAAaAA0AAAIpjI+py+0PozQAnHot1QHvDH5ix3lkeI7mWrYo+1auOnfpDY90jO7+WQAAIfkECQoAAQAsAAAAABoADQAAAimMj6nL7Q+jDACceq3BW1PPfdnYkWKJnmrIgq7Zjm8ad/U6Uzic03ldAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD6ME4FBbzdU5bN99YkhiJneC6biW6KsiLMy68T3OuF3pflcAACH5BAUKAAEALAAAAAAaAA0AAAIojI+py+0PYwTgUFvN1Tls331iSGImd4LpuJboqyIsPLc26sb6WPdhAQA7");padding:5px}span[class="flight ownespionage"]:before{content:url("data:image/gif;base64,R0lGODlhGgANAIABAP+lAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD2ME4FBbzdU51O114Nhx2GmmaLiSXivG8Ky6tXzTbM7vPlAAACH5BAkKAAEALAAAAAAaAA0AAAInjI+py+0PowTgUFvN1Rl7/gVbOJbddaZkaq4uCItq3NKz/OJ2XgcFACH5BAkKAAEALAAAAAAaAA0AAAIpjI+py+0PowwAnHqtwVvn34GU5XGjaFZpyaJnCL/yirYxfduzju81WAAAIfkECQoAAQAsAAAAABoADQAAAimMj6nL7Q+jNACcei3VAXO8ZeIGdt85dmZatlwIr7HLorMt5/Rd9zxfAAAh+QQFCgABACwAAAAAGgANAAACKYyPqcvtD2MEB1Bj6w0Z291x4FiJ2umhasiSSLu6ZkrPNlzjt6z3/FgAADs=");padding:5px}span[class="return ownespionage"]:before{content:url("data:image/gif;base64,R0lGODlhGgANAIABAMTExP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD2MEB1Bj6w0Z7859okZ6ZXiC6mi2qLtW7xy7MEtvdzridV4AACH5BAkKAAEALAAAAAAaAA0AAAIpjI+py+0PozQAnHot1QHvDH5ix3lkeI7mWrYo+1auOnfpDY90jO7+WQAAIfkECQoAAQAsAAAAABoADQAAAimMj6nL7Q+jDACceq3BW1PPfdnYkWKJnmrIgq7Zjm8ad/U6Uzic03ldAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD6ME4FBbzdU5bN99YkhiJneC6biW6KsiLMy68T3OuF3pflcAACH5BAUKAAEALAAAAAAaAA0AAAIojI+py+0PYwTgUFvN1Tls331iSGImd4LpuJboqyIsPLc26sb6WPdhAQA7");padding:5px}span[class="flight espionage"]:before{content:url("data:image/gif;base64,R0lGODlhGgANAIABAP8AAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD2MEB1Bj6w0Z7859okZ6ZXiC6mi2qLtW7xy7MEtvdzridV4AACH5BAkKAAEALAAAAAAaAA0AAAIpjI+py+0PozQAnHot1QHvDH5ix3lkeI7mWrYo+1auOnfpDY90jO7+WQAAIfkECQoAAQAsAAAAABoADQAAAimMj6nL7Q+jDACceq3BW1PPfdnYkWKJnmrIgq7Zjm8ad/U6Uzic03ldAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD6ME4FBbzdU5bN99YkhiJneC6biW6KsiLMy68T3OuF3pflcAACH5BAUKAAEALAAAAAAaAA0AAAIojI+py+0PYwTgUFvN1Tls331iSGImd4LpuJboqyIsPLc26sb6WPdhAQA7");padding:5px}span[class="flight owntransport"]:before{content:url("data:image/gif;base64,R0lGODlhGgANAIgAAAD/AAAAACH5BAkKAAEAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAGgANAAACKYyPqcvtD2ME4FBbzdU51O114Nhx2GmmaLiSXivG8Ky6tXzTbM7vPlAAACH5BAkKAAEALAAABAAaAAkAAAIgDBB5aaje2GNr2igr3nrB/oXUIV7giJolt55qysJufBUAIfkECQoAAQAsAAAEABoACQAAAiBMAHZpqN7Yk3DNS/ONs3rNNVY4lt9mgil6ku3qqi9UAAAh+QQJCgABACwAAAQAGgAJAAACIIwBFqh8+VaDi7o6r7a84Qh+YrhNJtmhp1iqLpvCa1kAACH5BAkKAAEALAAABAAaAAkAAAIgRA6GGnnNkltvwhov3bpzC0bMJ2ImeXZhuqKuWr4tVAAAOw==");padding:5px}span[class="holding owntransport"]:before{content:url("data:image/gif;base64,R0lGODlhGgANAIgAAAD/AAAAACH5BAUyAAEAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAGgANAAACHYyPqcvtD6N8AExW6005b9N1WxiOpPWR3yGuLOoUACH5BAkyAAEALAAAAAAaAA0AAAIhjI+py+0Po0QAwNpw1IlvS4FTwHljKU6m+bBk6riGHCYFADs=");padding:5px}span[class="return owntransport"]:before{content:url("data:image/gif;base64,R0lGODlhGgANAIABAMTExP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD2MEB1Bj6w0Z7859okZ6ZXiC6mi2qLtW7xy7MEtvdzridV4AACH5BAkKAAEALAAAAAAaAA0AAAIpjI+py+0PozQAnHot1QHvDH5ix3lkeI7mWrYo+1auOnfpDY90jO7+WQAAIfkECQoAAQAsAAAAABoADQAAAimMj6nL7Q+jDACceq3BW1PPfdnYkWKJnmrIgq7Zjm8ad/U6Uzic03ldAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD6ME4FBbzdU5bN99YkhiJneC6biW6KsiLMy68T3OuF3pflcAACH5BAUKAAEALAAAAAAaAA0AAAIojI+py+0PYwTgUFvN1Tls331iSGImd4LpuJboqyIsPLc26sb6WPdhAQA7");padding:5px}span[class="flight transport"]:before{content:url("data:image/gif;base64,R0lGODlhGgANAIgAAOQA5AAAACH5BAkKAAEAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAGgANAAACKYyPqcvtD2MEB1Bj6w0Z7859okZ6ZXiC6mi2qLtW7xy7MEtvdzridV4AACH5BAkKAAEALAAABAAaAAkAAAIgjAEWqHz5GlzTUYmjvtv6Cmbc+EllFx5kuiqoeMJsWQAAIfkECQoAAQAsAAAEABoACQAAAiBMAHZpqN7YehLOSDPet9tfhZonYiU5ImB6Jiv3svJWAAAh+QQJCgABACwAAAQAGgAJAAACIAwQeWmo3th6Es5IM96321+FmiduI3gaJXmyHKq6MlQAACH5BAkKAAEALAAABAAaAAkAAAIgBIKGoXm+GnszUomvthz6+mUdSErhdi7pWqGla4gsVgAAOw==");padding:5px}span[class="flight owndeploy"]:before{content:url("data:image/gif;base64,R0lGODlhGgANAIgAAAD/AAAAACH5BAkKAAEAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAGgANAAACKYyPqcvtD2ME4FBbzdU51O114Nhx2GmmaLiSXivG8Ky6tXzTbM7vPlAAACH5BAkKAAEALAAABAAaAAkAAAIgDBB5aaje2GNr2igr3nrB/oXUIV7giJolt55qysJufBUAIfkECQoAAQAsAAAEABoACQAAAiBMAHZpqN7Yk3DNS/ONs3rNNVY4lt9mgil6ku3qqi9UAAAh+QQJCgABACwAAAQAGgAJAAACIIwBFqh8+VaDi7o6r7a84Qh+YrhNJtmhp1iqLpvCa1kAACH5BAkKAAEALAAABAAaAAkAAAIgRA6GGnnNkltvwhov3bpzC0bMJ2ImeXZhuqKuWr4tVAAAOw==");padding:5px}span[class="return owndeploy"]:before{content:url("data:image/gif;base64,R0lGODlhGgANAIABAMTExP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD2MEB1Bj6w0Z7859okZ6ZXiC6mi2qLtW7xy7MEtvdzridV4AACH5BAkKAAEALAAAAAAaAA0AAAIpjI+py+0PozQAnHot1QHvDH5ix3lkeI7mWrYo+1auOnfpDY90jO7+WQAAIfkECQoAAQAsAAAAABoADQAAAimMj6nL7Q+jDACceq3BW1PPfdnYkWKJnmrIgq7Zjm8ad/U6Uzic03ldAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD6ME4FBbzdU5bN99YkhiJneC6biW6KsiLMy68T3OuF3pflcAACH5BAUKAAEALAAAAAAaAA0AAAIojI+py+0PYwTgUFvN1Tls331iSGImd4LpuJboqyIsPLc26sb6WPdhAQA7");padding:5px}span[class="flight attack"]:before{content:url("data:image/gif;base64,R0lGODlhGgANAIABAP8AAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD2MEB1Bj6w0Z7859okZ6ZXiC6mi2qLtW7xy7MEtvdzridV4AACH5BAkKAAEALAAAAAAaAA0AAAIpjI+py+0PozQAnHot1QHvDH5ix3lkeI7mWrYo+1auOnfpDY90jO7+WQAAIfkECQoAAQAsAAAAABoADQAAAimMj6nL7Q+jDACceq3BW1PPfdnYkWKJnmrIgq7Zjm8ad/U6Uzic03ldAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD6ME4FBbzdU5bN99YkhiJneC6biW6KsiLMy68T3OuF3pflcAACH5BAUKAAEALAAAAAAaAA0AAAIojI+py+0PYwTgUFvN1Tls331iSGImd4LpuJboqyIsPLc26sb6WPdhAQA7");padding:5px}span[class="flight owncolony"]:before{content:url("data:image/gif;base64,R0lGODlhGgANAIABAABmzP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD2ME4FBbzdU51O114Nhx2GmmaLiSXivG8Ky6tXzTbM7vPlAAACH5BAkKAAEALAAAAAAaAA0AAAInjI+py+0PowTgUFvN1Rl7/gVbOJbddaZkaq4uCItq3NKz/OJ2XgcFACH5BAkKAAEALAAAAAAaAA0AAAIpjI+py+0PowwAnHqtwVvn34GU5XGjaFZpyaJnCL/yirYxfduzju81WAAAIfkECQoAAQAsAAAAABoADQAAAimMj6nL7Q+jNACcei3VAXO8ZeIGdt85dmZatlwIr7HLorMt5/Rd9zxfAAAh+QQFCgABACwAAAAAGgANAAACKYyPqcvtD2MEB1Bj6w0Z291x4FiJ2umhasiSSLu6ZkrPNlzjt6z3/FgAADs=");padding:5px}span[class="return owncolony"]:before{content:url("data:image/gif;base64,R0lGODlhGgANAIABAGaZ/////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD2MEB1Bj6w0Z7859okZ6ZXiC6mi2qLtW7xy7MEtvdzridV4AACH5BAkKAAEALAAAAAAaAA0AAAIpjI+py+0PozQAnHot1QHvDH5ix3lkeI7mWrYo+1auOnfpDY90jO7+WQAAIfkECQoAAQAsAAAAABoADQAAAimMj6nL7Q+jDACceq3BW1PPfdnYkWKJnmrIgq7Zjm8ad/U6Uzic03ldAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD6ME4FBbzdU5bN99YkhiJneC6biW6KsiLMy68T3OuF3pflcAACH5BAUKAAEALAAAAAAaAA0AAAIojI+py+0PYwTgUFvN1Tls331iSGImd4LpuJboqyIsPLc26sb6WPdhAQA7 ");padding:5px}span[class="ownmissile"]:before{content:url("data:image/gif;base64,R0lGODlhGgANAIABAP+lAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD2ME4FBbzdU51O114Nhx2GmmaLiSXivG8Ky6tXzTbM7vPlAAACH5BAkKAAEALAAAAAAaAA0AAAInjI+py+0PowTgUFvN1Rl7/gVbOJbddaZkaq4uCItq3NKz/OJ2XgcFACH5BAkKAAEALAAAAAAaAA0AAAIpjI+py+0PowwAnHqtwVvn34GU5XGjaFZpyaJnCL/yirYxfduzju81WAAAIfkECQoAAQAsAAAAABoADQAAAimMj6nL7Q+jNACcei3VAXO8ZeIGdt85dmZatlwIr7HLorMt5/Rd9zxfAAAh+QQFCgABACwAAAAAGgANAAACKYyPqcvtD2MEB1Bj6w0Z291x4FiJ2umhasiSSLu6ZkrPNlzjt6z3/FgAADs=");padding:5px}span[class="missile"]:before{content:url("data:image/gif;base64,R0lGODlhGgANAIABAP8AAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD2MEB1Bj6w0Z7859okZ6ZXiC6mi2qLtW7xy7MEtvdzridV4AACH5BAkKAAEALAAAAAAaAA0AAAIpjI+py+0PozQAnHot1QHvDH5ix3lkeI7mWrYo+1auOnfpDY90jO7+WQAAIfkECQoAAQAsAAAAABoADQAAAimMj6nL7Q+jDACceq3BW1PPfdnYkWKJnmrIgq7Zjm8ad/U6Uzic03ldAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD6ME4FBbzdU5bN99YkhiJneC6biW6KsiLMy68T3OuF3pflcAACH5BAUKAAEALAAAAAAaAA0AAAIojI+py+0PYwTgUFvN1Tls331iSGImd4LpuJboqyIsPLc26sb6WPdhAQA7");padding:5px}span[class="flight ownfederation"]:before{content:url("data:image/gif;base64,R0lGODlhGgANAIABAGaZ/////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD2ME4FBbzdU51O114Nhx2GmmaLiSXivG8Ky6tXzTbM7vPlAAACH5BAkKAAEALAAAAAAaAA0AAAInjI+py+0PowTgUFvN1Rl7/gVbOJbddaZkaq4uCItq3NKz/OJ2XgcFACH5BAkKAAEALAAAAAAaAA0AAAIpjI+py+0PowwAnHqtwVvn34GU5XGjaFZpyaJnCL/yirYxfduzju81WAAAIfkECQoAAQAsAAAAABoADQAAAimMj6nL7Q+jNACcei3VAXO8ZeIGdt85dmZatlwIr7HLorMt5/Rd9zxfAAAh+QQFCgABACwAAAAAGgANAAACKYyPqcvtD2MEB1Bj6w0Z291x4FiJ2umhasiSSLu6ZkrPNlzjt6z3/FgAADs=");padding:5px}span[class="return ownfederation"]:before{content:url("data:image/gif;base64,R0lGODlhGgANAIABAMTExP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD2MEB1Bj6w0Z7859okZ6ZXiC6mi2qLtW7xy7MEtvdzridV4AACH5BAkKAAEALAAAAAAaAA0AAAIpjI+py+0PozQAnHot1QHvDH5ix3lkeI7mWrYo+1auOnfpDY90jO7+WQAAIfkECQoAAQAsAAAAABoADQAAAimMj6nL7Q+jDACceq3BW1PPfdnYkWKJnmrIgq7Zjm8ad/U6Uzic03ldAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD6ME4FBbzdU5bN99YkhiJneC6biW6KsiLMy68T3OuF3pflcAACH5BAUKAAEALAAAAAAaAA0AAAIojI+py+0PYwTgUFvN1Tls331iSGImd4LpuJboqyIsPLc26sb6WPdhAQA7");padding:5px}span[class="flight federation"]:before{content:url("data:image/gif;base64,R0lGODlhGgANAIABAP8AAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD2MEB1Bj6w0Z7859okZ6ZXiC6mi2qLtW7xy7MEtvdzridV4AACH5BAkKAAEALAAAAAAaAA0AAAIpjI+py+0PozQAnHot1QHvDH5ix3lkeI7mWrYo+1auOnfpDY90jO7+WQAAIfkECQoAAQAsAAAAABoADQAAAimMj6nL7Q+jDACceq3BW1PPfdnYkWKJnmrIgq7Zjm8ad/U6Uzic03ldAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD6ME4FBbzdU5bN99YkhiJneC6biW6KsiLMy68T3OuF3pflcAACH5BAUKAAEALAAAAAAaAA0AAAIojI+py+0PYwTgUFvN1Tls331iSGImd4LpuJboqyIsPLc26sb6WPdhAQA7");padding:5px}span[class="flight hold"]:before{content:url("data:image/gif;base64,R0lGODlhGgANAIABAGaZ/////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD2MEB1Bj6w0Z7859okZ6ZXiC6mi2qLtW7xy7MEtvdzridV4AACH5BAkKAAEALAAAAAAaAA0AAAIpjI+py+0PozQAnHot1QHvDH5ix3lkeI7mWrYo+1auOnfpDY90jO7+WQAAIfkECQoAAQAsAAAAABoADQAAAimMj6nL7Q+jDACceq3BW1PPfdnYkWKJnmrIgq7Zjm8ad/U6Uzic03ldAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD6ME4FBbzdU5bN99YkhiJneC6biW6KsiLMy68T3OuF3pflcAACH5BAUKAAEALAAAAAAaAA0AAAIojI+py+0PYwTgUFvN1Tls331iSGImd4LpuJboqyIsPLc26sb6WPdhAQA7");padding:5px}span[class="flight ownhold"]:before{content:url("data:image/gif;base64,R0lGODlhGgANAIABAGaZ/////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD2ME4FBbzdU51O114Nhx2GmmaLiSXivG8Ky6tXzTbM7vPlAAACH5BAkKAAEALAAAAAAaAA0AAAInjI+py+0PowTgUFvN1Rl7/gVbOJbddaZkaq4uCItq3NKz/OJ2XgcFACH5BAkKAAEALAAAAAAaAA0AAAIpjI+py+0PowwAnHqtwVvn34GU5XGjaFZpyaJnCL/yirYxfduzju81WAAAIfkECQoAAQAsAAAAABoADQAAAimMj6nL7Q+jNACcei3VAXO8ZeIGdt85dmZatlwIr7HLorMt5/Rd9zxfAAAh+QQFCgABACwAAAAAGgANAAACKYyPqcvtD2MEB1Bj6w0Z291x4FiJ2umhasiSSLu6ZkrPNlzjt6z3/FgAADs=");padding:5px}span[class="return ownhold"]:before{content:url("data:image/gif;base64,R0lGODlhGgANAIABAMTExP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD2MEB1Bj6w0Z7859okZ6ZXiC6mi2qLtW7xy7MEtvdzridV4AACH5BAkKAAEALAAAAAAaAA0AAAIpjI+py+0PozQAnHot1QHvDH5ix3lkeI7mWrYo+1auOnfpDY90jO7+WQAAIfkECQoAAQAsAAAAABoADQAAAimMj6nL7Q+jDACceq3BW1PPfdnYkWKJnmrIgq7Zjm8ad/U6Uzic03ldAAAh+QQJCgABACwAAAAAGgANAAACKYyPqcvtD6ME4FBbzdU5bN99YkhiJneC6biW6KsiLMy68T3OuF3pflcAACH5BAUKAAEALAAAAAAaAA0AAAIojI+py+0PYwTgUFvN1Tls331iSGImd4LpuJboqyIsPLc26sb6WPdhAQA7");padding:5px}font[color="#ff0000"]{color:#f00 !important}td[class="l"] font[color="#ff0000"],td[class="k"] font[color="#ff0000"]{color:#decdde !important}font[color="red"]{color:red !important}font[color="#f1531e"],td[class="l"] b[style="color:rgb(241,83,30);"]{color:#f1531e !important}font[color="#54b0dc"],td[class="l"] b[style="color:rgb(84,176,220);"]{color:DarkTurquoise !important}font[color="#9aaccb"],td[class="l"] b[style="color:rgb(154,172,203);"]{color:LightSlateGrey !important}font[color="#f2d99d"]{color:#ff7b00 !important}td[class="l"] b[style="color:rgb(241,83,30);"],td[class="l"] b[style="color:rgb(84,176,220);"],td[class="l"] b[style="color:rgb(154,172,203);"]{margin:2px !important;border:2px dotted -moz-rgba(22,66,34,0.2) !important;-moz-border-radius:4px !important}.allymember{color:LimeGreen !important}.noob{color:SeaGreen !important}.strong{color:darkorange !important}.vacation{color:MediumBlue !important}.inactive{color:Fuchsia !important}.longinactive{color:DarkViolet !important}.banned{text-decoration:line-through !important;.flight .ownattack{color:-moz-rgba(153,50,204,1) !important}.flight .ownattack a{color:-moz-rgba(153,50,204,1) !important;border-bottom:1px dotted !important}.return .ownattack{color:-moz-rgba(153,50,204,0.3) !important}.return .ownattack a{color:-moz-rgba(153,50,204,0.3) !important;border-bottom:1px -moz-rgba(153,50,204,1) dotted !important}.flight .owntransport{color:-moz-rgba(3,34,233,1) !important}.flight .owntransport a{color:-moz-rgba(3,34,233,1) !important;border-bottom:1px dotted !important}.return .owntransport{color:-moz-rgba(3,34,233,0.3) !important}.return .owntransport a{color:-moz-rgba(3,34,233,0.3) !important;border-bottom:1px -moz-rgba(3,34,233,1) dotted !important}.flight .ownespionage{color:-moz-rgba(255,155,35,1) !important}.flight .ownespionage a{color:-moz-rgba(255,155,35,1) !important;border-bottom:1px dotted !important}.return .ownespionage{color:-moz-rgba(255,155,35,0.3) !important}.return .ownespionage a{color:-moz-rgba(255,155,35,0.3) !important;border-bottom:1px -moz-rgba(255,155,35,1) dotted !important}.flight .owncolony{color:-moz-rgba(45,95,235,1) !important}.flight .owncolony a{color:-moz-rgba(45,95,235,1) !important;border-bottom:1px dotted !important}.return .owncolony{color:-moz-rgba(45,95,235,0.3) !important}.return .owncolony a{color:-moz-rgba(45,95,235,0.3) !important;border-bottom:1px -moz-rgba(45,95,235,1) dotted !important}.flight .ownharvest{color:-moz-rgba(90,145,35,1) !important}.flight .ownharvest a{color:-moz-rgba(90,145,35,1) !important;border-bottom:1px dotted !important}.return .ownharvest{color:-moz-rgba(90,145,35,0.3) !important}.return .ownharvest a{color:-moz-rgba(90,145,35,0.3) !important;border-bottom:1px -moz-rgba(90,145,35,1) dotted !important}.flight .owndeploy{color:-moz-rgba(9,95,135,1) !important}.flight .owndeploy a{color:-moz-rgba(9,95,135,1) !important;border-bottom:1px dotted !important}.return .owndeploy{color:-moz-rgba(9,95,135,0.3) !important}.return .owndeploy a{color:-moz-rgba(9,95,135,0.3) !important;border-bottom:1px -moz-rgba(9,95,135,1) dotted !important}.flight .ownhold{color:#ffd700 !important}.flight .ownhold a{color:white !important;border-bottom:1px dotted !important}.return .ownhold{color:#ff9 !important}.return .ownhold a{color:#C4C4C4 !important;border-bottom:1px #ffd700 dotted !important}.flight .owndestroy{color:#f87 !important}.flight .owndestroy a{color:Red !important;border-bottom:1px dotted !important}.return .owndestroy{color:#fdc !important}.return .owndestroy a{color:#C4C4C4 !important;border-bottom:1px #f87 dotted !important}.flight .ownfederation{color:-moz-rgba(153,50,204,1) !important}.flight .ownfederation a{color:-moz-rgba(153,50,204,1) !important;border-bottom:1px dotted !important}.return .ownfederation{color:-moz-rgba(153,50,204,0.3) !important}.return .ownfederation a{color:-moz-rgba(153,50,204,0.3) !important;border-bottom:1px -moz-rgba(153,50,204,1) dotted!important}th br{line-height:0 !important}.federation{color:-moz-rgba(153,50,204,1) !important}.federation a{color:-moz-rgba(153,50,204,1) !important;border-bottom:1px dotted!important}.ownmissile{float:left!important;color:-moz-rgba(129,95,116,1) !important}.ownmissile a{color:-moz-rgba(129,95,116,1) !important;border-bottom:1px dotted!important}.return .ownmissile{color:#ff9 !important}.return .ownmissile a{color:-moz-rgba(129,95,116,1) !important;border-bottom:1px -moz-rgba(129,95,116,1) dotted!important}.holding .owntransport{color:-moz-rgba(18,153,244,1)!important}.holding .owntransport a{color:-moz-rgba(18,153,244,1) !important;border-bottom:1px dotted!important}.class{color:darkgrey !important;border:1px dotted darkgrey !important}tr[class] span[class="attack"]{color:-moz-rgba(153,50,204,1) !important}tr[class] span[class="attack"] a{color:-moz-rgba(153,50,204,1) !important;border-bottom:1px dotted!important}.attack{color:#f00 !important}.flight .attack a{color:#f00 !important;border-bottom:1px dotted!important}.espionage{color:#f00 !important}.flight .espionage a{color:#f00;border-bottom:1px dotted!important}.transport{color:#c6c !important}.flight .transport a{color:#c6c !important;border-bottom:1px dotted!important}.flight a:hover,.holding a:hover,.return a:hover,.ownmissile a:hover{background:gold !important;color:DeepPink !important;text-decoration:blink !important}.success{color:lime !important}.errormessage a{text-decoration:underline !important}.error{color:red !important}.warning{color:orange !important}.notice{color:yellow !important}span[class="holding ownhold"]:before{content:"=== " !important;color:#06C !important;font-size:14px !important;font-weight:normal !important}span[class="holding hold"]:before{content:"=== " !important;color:#06C !important;font-size:15px !important;font-weight:normal !important}.combatreport{color:red !important}.combatreport_ididattack_iwon{color:#00B000 !important}.combatreport_ididattack_ilost{color:#C00000 !important}.combatreport_ididattack_draw{color:#C0C000 !important}.combatreport_igotattacked_iwon{color:teal !important}.combatreport_igotattacked_ilost{color:red !important}.combatreport_igotattacked_draw{color:yellow !important}.espionagereport{color:SaddleBrown !important}a:hover .combatreport,a:hover .combatreport_ididattack_iwon,a:hover .combatreport_ididattack_ilost,a:hover .combatreport_ididattack_draw,a:hover .combatreport_igotattacked_iwon,a:hover .combatreport_igotattacked_ilost,a:hover .combatreport_igotattacked_draw,a:hover .espionagereport{color:Bisque !important}img[title="探测"],img[title="写入讯息"],img[title="好友邀请"],img[title="間諜"],img[title="寫入訊息"],img[title="要求加入好友"],img[title="導彈攻擊"],img[title="导弹攻击"],img[title="Missile attack"],img[title="Espionage"],img[title="write message"],img[alt="write message"],img[alt="Write message"],img[title="Buddy request"]{display:none !important}table[width="569"] tbody tr th+th+th+th+th+th+th+th>a:first-child:after{content:" 探 " !important}table[width="569"] tbody tr th+th+th+th+th+th+th+th>a:first-child+a:after,table[width="525"] tbody tr th:first-child+th+th>a:first-child:after,script[src="js/cntchar.js"]+script[src="js/win.js"]+table[width="519"] tbody tr>th:first-child+th+th>a:first-child:after,img[alt="回复"]:after,img[alt="写讯息"]:after,a[alt="书写讯息"]:after,img[alt="写入讯息"]:after,img[alt="write message"]:after{content:" 信 " !important;display:inline !important}table[width="569"] tbody tr th+th+th+th+th+th+th+th>a:first-child+a+a:after,a[alt="好友邀请"]:after{content:" 友 " !important}table[width="569"] tbody tr th+th+th+th+th+th+th+th>a:first-child+a+a+a:after{content:" 炸 " !important}table[id="t1"]{border:-moz-rgba(1,1,1,0) !important}#content[style|="left:0;width:100%;top:10px;"]{height:100% !important}img[src="chrome://foxgame/content/resources/images/speedsim.ico"],img[src="chrome://foxgame/content/resources/images/speedsim.gif"],img[src="chrome://foxgame/content/resources/images/drago.gif"],img[alt="撰写信息"],img[alt="書寫訊息"],img[alt="回复"]{display:inline !important}'
        addCSS(css);	
	}
    if(useCSS2=="1"){
        var css='#addcord{text-align:left !important;width:59px !important}#addcor,#addcor2,#addcor3{font-size:10px !important;width:58px !important}#atkdiv{position:fixed !important;top:0 !important;right:0 !important;width:auto !important;height:auto !important;-moz-border-radius:0 0 0 8px !important;background:yellow !important;border-left:red 1px solid !important;border-bottom:red 1px solid !important}#atkdiv *{margin-left:6px !important;margin-right:6px !important;color:red !important}.messMod tr:hover{background:aliceblue !important}#qsWindow tr:hover{background:#7ccaff !important}#qsWindow tr:hover *{color:white !important}#qsWindow tr:hover a:hover{color:red !important;background:none !important}.busyStar img{background:#00b500 !important;border-color:#004f00 !important}.idleStar img{background:#9c9797 !important;border-color:#333131 !important}.overviewTimeAri{white-space:nowrap !important;text-align:right !important;margin:-3px !important;padding-right:2px !important;font-size:9px !important;color:-moz-rgba(12,23,15,1) !important;position:relative !important;top:-1px!important;background:-moz-rgba(212,238,155,0) !important;border-top-width:1px;border-top-style:dotted;-moz-border-radius:20px !important}.overviewTimeCtd{text-align:left !important;margin:-3px !important;padding-bottom:2px !important;font-size:11px !important;color:navy !important;position:relative !important}.overViewHead *{background:-moz-rgba(32,32,32,0.81) !important;color:seashell !important;text-shadow:#000 2px 2px 1px !important}.overViewTotal *{background:-moz-rgba(32,38,55,.6) !important;color:seashell !important;text-shadow:#000 2px 2px 3px !important;font-size:14px !important}.overviewCount{color:fuchsia !important}.bar_full{color:white !important;text-decoration:blink !important;background-color:salmon !important}.bar_notfull{color:darkgreen !important;background-color:Chartreuse !important}th>form{margin:0 !important}#cordTA{background:#d3ded4 !important;position:fixed !important;font-size:8px !important;line-height:12px !important;overflow:hidden !important;-Moz-Border-Radius:15px 15px 0 0 !important;text-align:center;padding-bottom:4px}.fltOtherPla,.fltOtherPla *{color:-moz-rgba(200,20,20,1) !important}.fltOwnPla,.fltOwnPla *{color:-moz-rgba(20,200,20,1) !important}.laji{color:grey !important;font-size:10px !important}.bigLaji{color:red !important;font-size:10px !important}.highlightGal,.highlightGal th,.highlightGal td{background:-moz-rgba(255,250,12,0.4) !important}.rankNumber,.rankNumber a{font-size:8px !important;line-height:6px !important}.highlightRank,.highlightRank th,.highlightRank td{background:-moz-rgba(255,250,12,0.4) !important}.rankSpanPlus,.rankSpanMinus,.rankSpanHold{font-size:10px !important}.rankSpanPlus{color:#00b80f !important}.rankSpanMinus{color:#d1001d !important}.rankSpanHold{color:#ac929d !important}.messMod{vertical-align:top !important}.messadv{height:550px !important;overflow-x:hidden !important;overflow-y:scroll !important}div[class="messadv"]>table>tbody>tr>th{border:0 !important}div[class="messadv"] select[name="deletemessages"]{position:fixed !important;top:20px !important;left:305px !important}div[class="messadv"] select[name="deletemessages"]+input{position:fixed !important;top:20px !important;left:553px !important;background:-moz-rgba(240,240,240,0.7) !important}.messTimeBody{font-size:12px !important;color:#111 !important}.messTime{font-size:8px !important;color:#444 !important}.msgGroupHead *{background:dimgrey !important;color:whitesmoke !important}.msgHead{background:lightgrey !important;cursor:pointer !important}.qsWindowDim{background:-moz-rgba(0,0,0,0.7) !important;position:fixed;top:0;left:0;height:100%;width:100%;vertical-align:middle !important}.qsWindow{-Moz-Border-Radius:0 15px 0 15px;border:5px solid white;background:-moz-rgba(210,210,210,1) !important;clear:both !important;opacity:0.85;text-align:center !important;vertical-align:middle !important;overflow-x:auto !important;overflow-y:scroll !important;padding:0 !important;margin:0 !important}.qsWindow *{white-space:nowrap !important}.qsWindow table{width:100% !important;height:100% !important}.qsWindow td{text-align:center !important;border:1px white solid !important}.qsWindowHead *{background:-moz-rgba(97,197,217,1) !important;color:snow !important;font:14px !important bank gothic,宋体,times,courier new,arial unicode ms !important;vertical-align:top !important}.qsWindowHead .empireSpace{font:10px !important "courier new" !important}.qswL{background:-moz-rgba(248,248,248,1) !important}.qswM{background:-moz-rgba(221,245,250,1) !important}.qswC{background:-moz-rgba(248,248,248,1) !important}.qswH{background:-moz-rgba(221,245,250,1) !important}.qswE{background:-moz-rgba(248,248,248,1) !important}.qswT{background:-moz-rgba(221,245,250,1) !important}.qswM td,.qswC td,.qswH td,.qswE td{text-align:right !important}.qswtt1,.qswtt2,.qswtt3,.qswtt4,.qswtt5{font-size:10px !important;background:transparent !important;border:1px !important}.qswtt1{color:-moz-rgba(12,162,2,0.2) !important}.qswtt2{color:-moz-rgba(12,162,2,1) !important}.qswtt3{color:-moz-rgba(212,162,2,1) !important}.qswtt4{color:-moz-rgba(212,22,2,0.6) !important}.qswtt5{color:-moz-rgba(212,22,2,1) !important}.cordBox{-Moz-Border-Radius:0 15px;border:5px solid white;background:-moz-rgba(210,210,210,1) !important;clear:both !important;opacity:0.88;padding:10px;text-align:center !important}#gm_update_alert{position:fixed !important;z-index:100000 !important;width:550px !important;background-color:yellow !important;text-align:center !important;font:11px !important Tahoma !important}#gm_update_alert_buttons{position:relative !important;top:-5px !important;margin:7px !important}#gm_update_alert_button_close{position:absolute !important;right:0 !important;top:0 !important;padding:3px 5px 3px 5px !important;border-style:outset !important;border-width:thin !important;z-index:inherit !important;background-color:#F00 !important;color:#FFF !important;cursor:pointer !important}#gm_update_alert_buttons span,#gm_update_alert_buttons span a{text-decoration:underline !important;color:#039 !important;font-weight:bold !important;cursor:pointer !important}#gm_update_alert_buttons span a:hover{text-decoration:underline !important;color:#903 !important;font-weight:bold !important;cursor:pointer !important}'
        addCSS(css);
    }

	/* 资源名称的颜色 */
	res = xpath("//font[@color='#ffffff']/parent::b/parent::i/b/font");
	if(res.snapshotLength > 0){
		res.snapshotItem(0).color = (color_m);
		res.snapshotItem(1).color = (color_c);
		res.snapshotItem(2).color = (color_d);
		res.snapshotItem(4).color = (color_e);
	}
	
	/*替换Favicon图标*/
	var vodka = document.createElement('link');
	vodka.setAttribute('type', 'image/x-icon');
	vodka.setAttribute('rel', 'shortcut icon');
	vodka.setAttribute('href', 'data:image/gif;base64,R0lGODlhEAAQAJECAIGBgQAAAP///wAAACH5BAEAAAIALAAAAAAQABAAAAIzlI+pFu17ApgNQCFZhrsi51jG9E1ABSZddm6M6GEuBoPxq9kiLptmqdkpbDOV7iLwkRQFADs=');
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(vodka);

	/*获得玩家星球列表*/
	myPlanets = xpath("//select[@onchange='haha(this)']/option");//所有星球
	curPlanet = xpathOne("//div[@id='header_top']//select/option[@selected]");//当前的星球
	if(myPlanets.snapshotLength!=0){
		GM_setValue (server+'_Planet_Count',myPlanets.snapshotLength);//星球数量
		for(var i=0;i<myPlanets.snapshotLength;i++){
			thisPlanetValue = myPlanets.snapshotItem(i).value;
			arr = thisPlanetValue.split("&");
			for(var j=0;j<arr.length;j++){
				if(arr[j].split('=')[0]=='cp'){
					planetID = arr[j].split('=')[1];//星球ID
					GM_setValue (server+'_Planet_' + i +'_ID', planetID);
				}
			}
			planetLoc = (myPlanets.snapshotItem(i).innerHTML).match(/\[\d+:\d+:\d+\]/)[0];
			planetName = trimStr((myPlanets.snapshotItem(i).innerHTML).match(/.*(?=\s+\[\d+:\d+:\d+\])/)[0]);
			GM_setValue (server+'_Planet_' + i +'_Name', planetName);
			GM_setValue (server+'_Planet_' + i +'_Loc', planetLoc);
		}
		curPlanetLoc = (curPlanet.innerHTML).match(/\[\d+:\d+:\d+\]/)[0];
		curPlanetName = trimStr((curPlanet.innerHTML).match(/.*(?=\s+\[\d+:\d+:\d+\])/)[0]);
		GM_setValue (server+'Cur_Planet_Name', curPlanetName);
		GM_setValue (server+'Cur_Planet_Loc', curPlanetLoc);
		if(DEBUG){logToConsole("current planet is:")}
		if(DEBUG){logToConsole(curPlanetName)}
	}
	
	/*月球识别*/
	for(i=1;i<(GM_getValue (server+'_Planet_Count'));i++){
	    var thisLoc = GM_getValue (server+'_Planet_' + i +'_Loc')
        var compLoc = GM_getValue (server+'_Planet_' + (i-1) +'_Loc')    
        if(thisLoc==compLoc){
            GM_setValue (server+'_Planet_' + i +'_isMoon','Yes')
        }else{
            GM_setValue (server+'_Planet_' + i +'_isMoon','No')
        }
	}
	GM_setValue (server+'_Planet_0_isMoon','No')
	var moonCount=0
	var plantCount=0
	for(i=0;i<(GM_getValue (server+'_Planet_Count'));i++){
	    var isMoon=GM_getValue (server+'_Planet_' + i +'_isMoon')
        if(isMoon=='Yes'){
            moonCount++;
        }
        if(isMoon=='No'){
            plantCount++;
        }
    }
    GM_setValue (server+'_PlanetPlan_Count',plantCount)
    GM_setValue (server+'_PlanetMoon_Count',moonCount)
    
	/*记录各星球的资源状况*/
	resCount = xpath("//table[@id='resources']/tbody/tr[position()=3]/td");//各资源 金属 晶体 重氢 暗物质 能量
	var setTime = new Date();
	var setTimeyearNow = setTime.getFullYear();//2008
	var setTimemonthNow = setTime.getMonth();//5 6月
	var setTimedayNow = setTime.getDay();//1 周一
	var setTimedateNow = setTime.getDate();//9 9号
	var setTimehourNow = setTime.getHours();//22
	var setTimeminuteNow = setTime.getMinutes();//19
	var setTimesecondNow = setTime.getSeconds();//28
	nowUTC = parseInt(Date.UTC(setTimeyearNow,(setTimemonthNow+1),setTimedateNow,setTimehourNow,setTimeminuteNow,setTimesecondNow))
	if(resCount.snapshotLength!=0){
        thisM = mystr2num(resCount.snapshotItem(0).textContent)
		thisC = mystr2num(resCount.snapshotItem(1).textContent);
		thisH = mystr2num(resCount.snapshotItem(2).textContent);
		thisD = mystr2num(resCount.snapshotItem(3).textContent);//暗物质
		thisE1 = mystr2num(resCount.snapshotItem(4).textContent.split("/")[0]);//剩余、缺少电量
		thisE2 = mystr2num(resCount.snapshotItem(4).textContent.split("/")[1]);//总电量
		//alert(thisE1);
		GM_setValue (server+'_'+curPlanetName+'_resM', thisM);
		GM_setValue (server+'_'+curPlanetName+'_resC', thisC);
		GM_setValue (server+'_'+curPlanetName+'_resH', thisH);
		GM_setValue (server+'_'+'_resD', thisD);
		GM_setValue (server+'_'+curPlanetName+'_resE1', thisE1);
		GM_setValue (server+'_'+curPlanetName+'_resE2', thisE2);
		GM_setValue (server+'_'+curPlanetName+'_resTimeUTC', nowUTC+"");
		/*红字的研究*/
	    if(/#ff0000/.test(resCount.snapshotItem(0).innerHTML)){
	        GM_setValue (server+'_'+curPlanetName+'M!', "YES");
        }else{
	        GM_setValue (server+'_'+curPlanetName+'M!', "NO");
        }
	    if(/#ff0000/.test(resCount.snapshotItem(1).innerHTML)){
	        GM_setValue (server+'_'+curPlanetName+'C!', "YES");
        }else{
	        GM_setValue (server+'_'+curPlanetName+'C!', "NO");
        }
	    if(/#ff0000/.test(resCount.snapshotItem(2).innerHTML)){
	        GM_setValue (server+'_'+curPlanetName+'H!', "YES");
        }else{
	        GM_setValue (server+'_'+curPlanetName+'H!', "NO");
        }
	    if(/#ff0000/.test(resCount.snapshotItem(4).innerHTML)){
	        GM_setValue (server+'_'+curPlanetName+'E!', "YES");
        }else{
	        GM_setValue (server+'_'+curPlanetName+'E!', "NO");
        }
	}
	/*统计*/
	if(/page=overview/.test(ogtitle) == true){
		missionsWC = xpath("//th[@colspan='3']/span/a[position()='6']")
		if(missionsWC){
			atkCg = Array(0,0,0);
			trsCg = Array(0,0,0);
			reyCg = Array(0,0,0);
			migCg = Array(0,0,0);
			serCg = Array(0,0,0);
			for(var i=0; i<missionsWC.snapshotLength; i++){
				missionType = missionsWC.snapshotItem(i).previousSibling.innerHTML;
				thisMWC = missionsWC.snapshotItem(i)
				thisMWCArr = thisMWC.title.match(/\D+(\d+\.)*\d+/g)
				if(thisMWCArr){
                    var T_adoMtpAtk= new Array();
                        T_adoMtpAtk[0] = "Attack"; //ogame.org
                        T_adoMtpAtk[15] = "攻擊"; //ogame.tw
                        T_adoMtpAtk[17] = "攻击"; //ogame.com.cn
                    var T_adoMtpTpt= new Array();
                        T_adoMtpTpt[0] = "Transport"; //ogame.org
                        T_adoMtpTpt[15] = "運輸"; //ogame.tw
                        T_adoMtpTpt[17] = "运输"; //ogame.com.cn
                    var T_adoMtpDpl= new Array();
                        T_adoMtpDpl[0] = "Deployment"; //ogame.org
                        T_adoMtpDpl[15] = "派遣"; //ogame.tw
                        T_adoMtpDpl[17] = "派遣"; //ogame.com.cn
                    var T_adoMtpRcy= new Array();
                        T_adoMtpRcy[0] = "Harvest"; //ogame.org
                        T_adoMtpRcy[15] = "回收"; //ogame.tw
                        T_adoMtpRcy[17] = "回收"; //ogame.com.cn
                    var T_adoMtpExp= new Array();
                        T_adoMtpExp[0] = "Expedition"; //ogame.org
                        T_adoMtpExp[15] = "遠征"; //ogame.tw
                        T_adoMtpExp[17] = "远征"; //ogame.com.cn
					for(var j=0; j<thisMWCArr.length; j++){
						mM=0;
						mC=0;
						mH=0;
						if(thisMWCArr[j].match(X_m)){
							mM = mystr2num(thisMWCArr[j].match(/(\d+\.)*\d+/)[0])
						}
						if(thisMWCArr[j].match(X_c)){
							mC = mystr2num(thisMWCArr[j].match(/(\d+\.)*\d+/)[0])
						}
						if(thisMWCArr[j].match(X_h)){
							//alert(thisMWCArr[j].match(/(\d+\.)*\d+/)[0]);
							mH = mystr2num(thisMWCArr[j].match(/(\d+\.)*\d+/)[0])
						}
						if(missionType==T_adoMtpAtk[langloca]){
							atkCg[0] = atkCg[0] + mM;
							atkCg[1] = atkCg[1] + mC;
							atkCg[2] = atkCg[2] + mH;
						}else if(missionType==T_adoMtpTpt[langloca]){
							trsCg[0] = trsCg[0] + mM;
							trsCg[1] = trsCg[1] + mC;
							trsCg[2] = trsCg[2] + mH;
						}else if(missionType==T_adoMtpDpl[langloca]){
							migCg[0] = migCg[0] + mM;
							migCg[1] = migCg[1] + mC;
							migCg[2] = migCg[2] + mH;
						}else if(missionType==T_adoMtpRcy[langloca]){
							reyCg[0] = reyCg[0] + mM;
							reyCg[1] = reyCg[1] + mC;
							reyCg[2] = reyCg[2] + mH;
						}else if(missionType==T_adoMtpExp[langloca]){
							serCg[0] = serCg[0] + mM;
							serCg[1] = serCg[1] + mC;
							serCg[2] = serCg[2] + mH;
						}
					}
				}
			}
			mMTotal = atkCg[0]+trsCg[0]+migCg[0]+reyCg[0]+serCg[0];
			mCTotal = atkCg[1]+trsCg[1]+migCg[1]+reyCg[1]+serCg[1];
			mHTotal = atkCg[2]+trsCg[2]+migCg[2]+reyCg[2]+serCg[2];
			GM_setValue (server+'_mMTotal',mMTotal);
			GM_setValue (server+'_mCTotal',mCTotal);
			GM_setValue (server+'_mHTotal',mHTotal);
			GM_setValue (server+'_resTimeUTC',GM_getValue (server+'_'+curPlanetName+'_resTimeUTC'))
			contentTable = xpathOne("//table[@width='519']");
			//alert(contentTable);
			toAdd1 = (mMTotal+mCTotal+mHTotal)==0 ? "":"<tr colspan=4 class=overViewHead><th width=13%>在途资源</th><th width=30%>铁</th><th width=30%>钻</th><th width=30%>油</th></tr>";
			toAdd2 = (atkCg[0]+atkCg[1]+atkCg[2])==0 ? "" : "<tr colspan=4><th>攻击</th><th width=30%>"+addDots(atkCg[0])+"</th><th width=30%>"+addDots(atkCg[1])+"</th><th width=30%>"+addDots(atkCg[2])+"</th></tr>";
			toAdd3 = (trsCg[0]+trsCg[1]+trsCg[2])==0 ? "" : "<tr colspan=4><th>运输</th><th width=30%>"+addDots(trsCg[0])+"</th><th width=30%>"+addDots(trsCg[1])+"</th><th width=30%>"+addDots(trsCg[2])+"</th></tr>";
			toAdd4 = (migCg[0]+migCg[1]+migCg[2])==0 ? "" : "<tr colspan=4><th>派遣</th><th width=30%>"+addDots(migCg[0])+"</th><th width=30%>"+addDots(migCg[1])+"</th><th width=30%>"+addDots(migCg[2])+"</th></tr>";
			toAdd5 = (reyCg[0]+reyCg[1]+reyCg[2])==0 ? "" : "<tr colspan=4><th>回收</th><th width=30%>"+addDots(reyCg[0])+"</th><th width=30%>"+addDots(reyCg[1])+"</th><th width=30%>"+addDots(reyCg[2])+"</th></tr>";
			toAdd6 = (serCg[0]+serCg[1]+serCg[2])==0 ? "" : "<tr colspan=4><th>远征</th><th width=30%>"+addDots(serCg[0])+"</th><th width=30%>"+addDots(serCg[1])+"</th><th width=30%>"+addDots(serCg[2])+"</th></tr>";
			toAdd7 = (mMTotal+mCTotal+mHTotal)==0 ? "" : "<tr colspan=4 class=overViewTotal><th>总计</th><th width=30%>"+addDots(mMTotal)+"</th><th width=30%>"+addDots(mCTotal)+"</th><th width=30%>"+addDots(mHTotal)+"</th></tr>";
			contentTable.innerHTML = contentTable.innerHTML + toAdd1 +toAdd2+toAdd3+toAdd4+toAdd5+toAdd6+toAdd7;
		}
	}
	
	/*坐标选择弹出窗口*/
	cordBox = document.createElement("div")
	cordBox.style.display = "none";
	cordBox.style.position = "absolute"
	cordBox.className = "cordBox"
	try{document.body.appendChild(cordBox);}catch(e){GM_log(e)}
	cordBox.id = "cordBox"

	//	window.addEventListener("dblclick", tgqsWindow, false);
	//	坐标文字弹出时间，响应Alt+鼠标点击
	window.addEventListener('mouseup', function(mouseEvent) {
		cordBox = document.getElementById("cordBox")
		if (window.getSelection() != '' && mouseEvent.altKey) {
			selText = window.getSelection().toString();
			selectCord = selText.match(/\d+[:\.\s-\/\\,]\d+[:\.\s-\/\\,]\d+/);
			if (selectCord){
				selectCordArr = selectCord[0].match(/\d+/g)
				cordBox.style.display = "inline";
				x=selectCordArr[0];
				y=selectCordArr[1];
				z=selectCordArr[2];
				cordBox.innerHTML = "["+x+":"+y+":"+z+"]<br/><a href='#' onclick='showFleetMenu("+x+","+y+","+z+",1,1)';>摸一把</a><br/><a style=\'cursor:pointer; -moz-user-select:none;\' onclick=showGalaxy("+ selectCordArr[0] +","+ selectCordArr[1] +","+ selectCordArr[2] +")>看一眼</a><br />";
				aC = document.createElement("INPUT")
                aC.setAttribute('id','addcor');
                aC.setAttribute('type','button');
                aC.value="添加坐标["+x+":"+y+":"+z+"]";
				aC.addEventListener('click',addCoordsVar,true)
				cordBox.appendChild(aC)
				cordBox.style.left = mouseEvent.pageX-30;
				cordBox.style.top = mouseEvent.pageY-30;
			}
		}else{cordBox.style.display = "none";}
	}, true);
	
	/*按键响应*/
	window.addEventListener('keypress', getKey, false);	

	/*激活提交按钮*/
	focusSubmitBtn();
	
	/*修改各页面标题*/
	if(/mode=Flotte/.test(ogtitle) == true){
		document.title="船坞-"+GM_getValue (server+'Cur_Planet_Name')+document.title;
	}
	if(/mode=Verteidigung/.test(ogtitle) == true){
		document.title="防御-"+GM_getValue (server+'Cur_Planet_Name')+document.title;
	}
	if(/mode=Forschung/.test(ogtitle) == true){
		document.title="研究-"+GM_getValue (server+'Cur_Planet_Name')+document.title;
	}
	if(/page=b_building/.test(ogtitle) == true){
		document.title="建筑-"+GM_getValue (server+'Cur_Planet_Name')+document.title;
	}
	if(/page=trader/.test(ogtitle) == true){
		document.title="奸商-"+GM_getValue (server+'Cur_Planet_Name')+document.title;
	}
	if(/page=techtree/.test(ogtitle) == true){
		document.title="科技-"+GM_getValue (server+'Cur_Planet_Name')+document.title;
	}
	if(/page=allianzen/.test(ogtitle) == true){
		document.title="联盟-"+GM_getValue (server+'Cur_Planet_Name')+document.title;
	}
	if(/page=notizen/.test(ogtitle) == true){
		document.title="笔记-"+GM_getValue (server+'Cur_Planet_Name')+document.title;
	}
	if(/page=buddy/.test(ogtitle) == true){
		document.title="好友-"+GM_getValue (server+'Cur_Planet_Name')+document.title;
	}

	/*记录攻击抵达时间*/
	if(/page=overview/.test(ogtitle) == true){
        aAtk = xpathOne("//span[@class='flight attack' or @class='missile']/ancestor::tr//th[position()=1]/div[contains(@id,'bxx')]")
        var tTime =new Date();
        if(aAtk){
            atime = aAtk.title+"^"+tTime.getTime()
            GM_setValue(server+'_aAtk',atime)
        }else{
            GM_setValue(server+'_aAtk',"")
            aAtkFed = xpathOne("//a[@class='attack']/ancestor::tr//th[position()=1]/div[contains(@id,'bxx')]")
            if(aAtkFed){
                atime = aAtkFed.title+"^"+tTime.getTime()            
                GM_setValue(server+'_aAtk',atime)
            }
        }
	}
	/*显示攻击时间*/
	if(checker(server+'_aAtk',"")!=""){
	    if(DEBUG){logToConsole("under attack!")}
		atkDiv=document.createElement('Div')
		atkDiv.id='atkdiv'
		atkStr = GM_getValue(server+'_aAtk')
		tTime = new Date();
		rS = atkStr.split("^")[0]*1-Math.floor((tTime.getTime()-atkStr.split("^")[1]*1)/1000);
		if(rS>0){
            atkDiv.innerHTML=s2c(" ETA: "+rS)
            atkDiv.title=rS
            document.body.appendChild(atkDiv)
            updateAtkTime();
        }else{
            GM_setValue(server+'_aAtk',"")
        }
	}
	
	/*坐标粘贴框*/
	if(cordBoxInCorner=="1"){
        cordTA = document.createElement('textarea')
        cordTA.id="cordTA"
        cordTA.value="Where Do You Want To Go Today?"
        if(document.body){
            document.body.appendChild(cordTA)
            cordTA.addEventListener('blur',checkTA,true);
            cordTA.addEventListener('focus',focusTA,true);
            getWH();
            with(cordTA.style){
                position="fixed";
                bottom="-2px";
                left=wW/2-100+"px";
                width="200px";
                height="18px";
            }
        }
	}
    
    /*添加建筑、研究完成的本地时间 2008-08-12*/
    buildLocalTime = setTimeout(function(){
        finishTimeDiv = xpathOne("//div[@id='bxx']")
        if(finishTimeDiv){
            newDiv=document.createElement('DIV')
            newDiv.innerHTML=timeForecast(finishTimeDiv.parentNode.innerHTML.match(/\d+:\d+:\d+/)[0]);
            finishTimeDiv.parentNode.insertBefore(newDiv,finishTimeDiv)
            }
        },99 
    )

	/*自动刷新*/
	//genLinks();
	refreshLinks();
	//alert("rr");
}

/*选项 研究 资源 造船厂 防御 建筑 舰队 概况*/
if((/page=overview/.test(ogtitle) == true) || (/page=options/.test(ogtitle) == true) || (/mode=Forschung/.test(ogtitle) == true) || (/page=resources/.test(ogtitle) == true) || (/page=buildings.*mode=Flotte/.test(ogtitle) == true) || (/page=buildings.*mode=Verteidigung/.test(ogtitle) == true) || (/page=b_building/.test(ogtitle) == true) || (/page=flotten./.test(ogtitle) == true)){
	var planetname = xpath("//select[@size='1']/option[@selected]");
	if(planetname.snapshotLength > 0){
		var planetcoords = planetname.snapshotItem(0).innerHTML;
			planetcoords = /\[\d+:\d+:\d+\]/.exec(planetcoords);
	}
	var L_res= new Array(); //1.
		L_res[0] = "Total number of researches"; //ogame.org
		L_res[15] = "&#x7814;&#x7A76;&#x7E3D;&#x6578;"; //ogame.tw
		L_res[17] = "总研究数"; //ogame.com.cn
		
	var L_ret= new Array(); //16.
		L_ret[0] = "Time to be available"; //ogame.org
		L_ret[15] = "預計到達時間"; //ogame.tw
		L_ret[17] = "至可用还需时间"; //ogame.com.cn
		
	var T_cs = new Array(); //26.
		T_cs[0] = "Cargo ships calculator"; //ogame.org
		T_cs[15] = "計算運輸船艦數量"; //ogame.tw
		T_cs[17] = "运输舰队计算器"; //ogame.com.cn
		
	var T_pc = new Array(); //28.
		T_pc[0] = "Production calculator"; //ogame.org
		T_pc[15] = "計算資源數量"; //ogame.tw
		T_pc[17] = "产量计算"; //ogame.com.cn
}

/*造船厂 防御 研究 建筑*/
if((/mode=Flotte/.test(ogtitle) == true) || (/mode=Verteidigung/.test(ogtitle) == true) || (/mode=Forschung/.test(ogtitle) == true) || (/page=b_building/.test(ogtitle) == true)){
	if((readytime == "1") || (maxships == "1") || (relvl == "1") || (color_m.length > 0) || (color_c.length > 0) || (color_d.length > 0) || (color_e.length > 0)){
		//var allcurres = xpath("//font[contains(@color,'#')]/ancestor::table[contains(@width,'100%')]/tbody/tr[3]/td[position()<5 and position()>1]");
		var allcurres = xpath("//font[contains(@color,'#')]/ancestor::table[contains(@id,'resources')]/tbody/tr[3]/td[position()<4 and position()>0]");
		if(allcurres.snapshotLength > 0){
			var curmet = mystr2num(reder(allcurres.snapshotItem(0).innerHTML));
			var curcry = mystr2num(reder(allcurres.snapshotItem(1).innerHTML));
			var curdeu = mystr2num(reder(allcurres.snapshotItem(2).innerHTML));
		}
		var shipstd = xpath("//td[@class='k']");
		var F_scriptinjection = document.createElement('script');
			F_scriptinjection.type = 'text/javascript';
			
		var J_mon= new Array(); //20.
    	J_mon[0] = 'var mymonth = new Array(); mymonth[0]="Jan"; mymonth[1]="Feb"; mymonth[2]="Mar"; mymonth[3]="Apr"; mymonth[4]="May"; mymonth[5]="Jun"; mymonth[6]="Jul"; mymonth[7]="Aug"; mymonth[8]="Sep"; mymonth[9]="Oct"; mymonth[10]="Nov"; mymonth[11]="Dec";'; //ogame.org
    	J_mon[15] = 'var mymonth = new Array(); mymonth[0]="&#x4E00;&#x6708;"; mymonth[1]="&#x4E8C;&#x6708;"; mymonth[2]="&#x4E09;&#x6708;"; mymonth[3]="&#x56DB;&#x6708;"; mymonth[4]="&#x4E94;&#x6708;"; mymonth[5]="&#x516D;&#x6708;"; mymonth[6]="&#x4E03;&#x6708;"; mymonth[7]="&#x516B;&#x6708;"; mymonth[8]="&#x4E5D;&#x6708;"; mymonth[9]="&#x5341;&#x6708;"; mymonth[10]="&#x5341;&#x4E00;&#x6708;"; mymonth[11]="&#x5341;&#x4E8C;&#x6708;";'; //ogame.tw
    	J_mon[17] = 'var mymonth = new Array(); mymonth[0]="&#x4E00;&#x6708;"; mymonth[1]="&#x4E8C;&#x6708;"; mymonth[2]="&#x4E09;&#x6708;"; mymonth[3]="&#x56DB;&#x6708;"; mymonth[4]="&#x4E94;&#x6708;"; mymonth[5]="&#x516D;&#x6708;"; mymonth[6]="&#x4E03;&#x6708;"; mymonth[7]="&#x516B;&#x6708;"; mymonth[8]="&#x4E5D;&#x6708;"; mymonth[9]="&#x5341;&#x6708;"; mymonth[10]="&#x5341;&#x4E00;&#x6708;"; mymonth[11]="&#x5341;&#x4E8C;&#x6708;";'; //ogame.com.cn
		
		var J_rel= new Array(); //21.
			J_rel[0] = "Ready, reloading page..."; //ogame.org
			J_rel[15] = "&#x6E96;&#x5099;&#x5B8C;&#x6210;&#xFF0C;&#x91CD;&#x65B0;&#x5728;&#x5165;&#x9801;&#x9762;..."; //ogame.tw
			J_rel[17] = "准备完成，重新载入..."; //ogame.com.cn
			
		var F_head = document.getElementsByTagName('head')[0];
		var F_script = document.createElement('script');
			F_script.type = 'text/javascript';
			F_script.innerHTML = 'function changeval(name,valor){'+
							'document.getElementsByName(name)[0].value=valor} '+
							'function moreships(name){'+
							'var valor=parseInt(document.getElementsByName(name)[0].value); '+
							'document.getElementsByName(name)[0].value=(valor+1); } '+
							'function lessships(name){'+
							'var valor=parseInt(document.getElementsByName(name)[0].value); '+
							'if(valor > 0){document.getElementsByName(name)[0].value=(valor-1); }} '+
							'function hourexec(hid,hdata){'+
							'hdata = hdata - 1; '+
							'var hhor = Math.floor(hdata/3600); '+
							'var hmin = Math.floor((hdata-(hhor*3600))/60); '+
							'var hsec = hdata-(hhor*3600)-(hmin*60); '+
							'var whentime = new Date(); '+
							J_mon[langloca]+
							'whentime.setSeconds(whentime.getSeconds()+hdata); '+
							'document.getElementById(hid).innerHTML = "'+L_ret[langloca]+': "+hhor+"小时"+hmin+"分"+hsec+"秒&nbsp;|&nbsp; "+whentime.getDate()+"&nbsp;"+mymonth[whentime.getMonth()]+"&nbsp;-&nbsp;"+whentime.getHours()+":"+whentime.getMinutes()+":"+whentime.getSeconds(); '+
							'if(hdata == 0){document.getElementById(hid).innerHTML = "'+J_rel[langloca]+'"; window.setTimeout("window.location.reload();",2000);} '+
							'if(hdata > 0){ window.setTimeout(("hourexec(\'"+hid+"\',"+hdata+");"), 999); } '+
							'}';
			F_head.appendChild(F_script);

		var alltds = xpath("//td[@class='l']/br/parent::td");
		var rsval = 0;
		//alert(alltds.snapshotLength);
		for (var i = 0; i < alltds.snapshotLength; i++ ) {
			var thistd = alltds.snapshotItem(i).innerHTML;	
			
			if((relvl == "1") && (/page=buildings.*mode=Forschung/.test(ogtitle))){
				if  (X_lvl.test(thistd) == true){
					var thislvl = X_lvl.exec(thistd);
						thislvl = RegExp.$1;
						rsval += parseInt(thislvl);
				}
			}
			
			var thismet = X_mlg.exec(thistd);
			if(thismet!= null){ thismet = mystr2num(RegExp.$2); } else {thismet = 0;}
			var thiscry = X_clg.exec(thistd);
			if(thiscry!= null){ thiscry = mystr2num(RegExp.$2); } else {thiscry = 0;}
			var thisdeu = X_dlg.exec(thistd);
			if(thisdeu!= null){ thisdeu = mystr2num(RegExp.$2); } else {thisdeu = 0;}
			
			if((maxships == "1") && ((/page=buildings.*mode=Flotte/.test(ogtitle) == true) || (/page=buildings.*mode=Verteidigung/.test(ogtitle) == true))){
				var cando = true;
				var maxval = calcmaxnum(curmet,curcry,curdeu,thismet,thiscry,thisdeu);
				if((maxval > 0) && (/font\>/.test(shipstd.snapshotItem(i).innerHTML) == false) && cando){
					var thisshipstd = shipstd.snapshotItem(i);
					
					var thisimgid = /fmenge.(\d+)/.exec(thisshipstd.innerHTML);
						thisimgid = RegExp.$1;
						
					if((thisimgid == "407") || (thisimgid == "408")){ maxval = 1;}
				
					var maxtable = document.createElement('table');
						maxtable.width = "100%";
						maxtable.innerHTML = "<tr><td style='text-align:center;'><a href='javascript:changeval(\"fmenge["+thisimgid+"]\","+maxval+");'>最大:&nbsp;"+maxval+"</a><br><a href='javascript:lessships(\"fmenge["+thisimgid+"]\");'>&laquo;</a>&nbsp;&nbsp;<a href='javascript:changeval(\"fmenge["+thisimgid+"]\",0);'>&reg;</a>&nbsp;&nbsp;<a href='javascript:moreships(\"fmenge["+thisimgid+"]\");'>&raquo;</a></td></tr>";
					thisshipstd.appendChild(maxtable);
				}
			}
			
			if(readytime == "1"){
				var R_np= new Array(); //22.
					R_np[0] = "Not all necessary resources are being produced!"; //ogame.org
					R_np[15] = "並非所有必須資源都已準備完畢!"; //ogame.tw
					R_np[17] = "<center><span class='rankNumber'>--------------------资源不足的分界线--------------------</span><center>"; //ogame.com.cn
					
				var metfact = parseInt(checker((ogserver+planetcoords+"met"),"0"));
				var cryfact = parseInt(checker((ogserver+planetcoords+"cry"),"0"));
				var deufact = parseInt(checker((ogserver+planetcoords+"deu"),"0"));
				if(DEBUG){logToConsole(metfact+" "+cryfact+" "+deufact);}
				var timeval = calctime(curmet,curcry,curdeu,thismet,thiscry,thisdeu,metfact,cryfact,deufact);
				if((timeval > 0) && (timeval != Infinity)){
					thistd = thistd + "<div id='hor"+i+"'></div>";
					F_scriptinjection.innerHTML += "hourexec('hor"+i+"',"+timeval+"); ";
				}
				if(timeval == Infinity){
					thistd = thistd + "<div>"+R_np[langloca]+"</div>";
				}
			}	
			
			thistd = thistd.replace(X_mlg, ("$1<b style='color:"+color_m+";'>$2"));
			if (thismet > curmet) thistd += RegExp.$1 + "<b style='color:"+color_m+";'>" + addDots(thismet - curmet) + "</b>&nbsp;";
			thistd = thistd.replace(X_clg, ("$1<b style='color:"+color_c+";'>$2"));
			if (thiscry > curcry) thistd += RegExp.$1 + "<b style='color:"+color_c+";'>" + addDots(thiscry - curcry) + "</b>&nbsp;";
			thistd = thistd.replace(X_dlg, ("$1<b style='color:"+color_d+";'>$2"));
			if (thisdeu > curdeu) thistd += RegExp.$1 + "<b style='color:"+color_d+";'>" + addDots(thisdeu - curdeu) + "</b>&nbsp;";
			thistd = thistd.replace(X_elg, ("$1<b style='color:"+color_e+";'>$2"));  
			
			var allres = Math.max(thismet - curmet, 0) + Math.max(thiscry - curcry, 0) + Math.max(thisdeu - curdeu, 0);
			if (allres != 0) {
			  thistd += "<br>" + 
			    C_nn[langloca][1] + ": <b>" + Math.ceil(allres / 25000) + "</b>&nbsp;&nbsp;" + C_nn[langloca][0] + ": <b>" + Math.ceil(allres / 5000) + "</b>";
      }
			
			alltds.snapshotItem(i).innerHTML = thistd;
		}
		if((relvl == "1") && (/page=buildings.*mode=Forschung/.test(ogtitle))){//总研究数
			var rstable = xpath("//table[contains(@align,'top')]//table").snapshotItem(0);
			var rsoutput = document.createElement('table');
				rsoutput.width = '468px';
				rsoutput.innerHTML = "<tr><td class='c'>"+L_res[langloca]+": "+rsval+"</td></tr>";
				rstable.parentNode.insertBefore(rsoutput, rstable);
		}
		if(collapsedesc == "1"){
			delall("//td[@class='l']/br[1]/following-sibling::text()[1]");
			delall("//td[@class='l']/br[2]");
			var allimgs = xpath("//td[@class='l']/a/img");
			for (var j = 0; j < allimgs.snapshotLength; j++ ) {
				var imgw = allimgs.snapshotItem(j).width;
				var imgh = allimgs.snapshotItem(j).height;
				var imgsw = allimgs.snapshotItem(j).style.width;
				var imgsh = allimgs.snapshotItem(j).style.height;
				allimgs.snapshotItem(j).width = resizer(imgw,imgh,imgw);
				allimgs.snapshotItem(j).height = resizer(imgw,imgh,imgh);
				allimgs.snapshotItem(j).style.width = resizer(imgsw,imgsh,imgsw);
				allimgs.snapshotItem(j).style.height = resizer(imgsw,imgsh,imgsh);
			}
		}
		if(readytime == "1"){
			var F_body = document.getElementsByTagName('body')[0];
				F_body.appendChild(F_scriptinjection);
		}
	}
}

/*建筑*/
if(/page=b_building/.test(ogtitle) == true){


}

/* 概况页面 */
if(/page=overview/.test(ogtitle) == true){
	if (mission_colors == "1") {
		const	lng_ownattack     = 'flight ownattack';
		const	lng_rownattack    = 'return ownattack';
		const	lng_ownespionage  = 'flight ownespionage';
		const	lng_rownespionage = 'return ownespionage';
		const	lng_owntransport  = 'flight owntransport';
		const	lng_rowntransport = 'return owntransport';
		const	lng_ftransport    = 'flight transport';
		const	lng_rtransport    = 'return transport';
		const	lng_fownharvest   = 'flight ownharvest';
		const	lng_rownharvest   = 'return ownharvest';
	
		//alert(color_harvest + '-' + darken(color_harvest));
		
		//有色概况
		var publi = document.getElementsByTagName ('span');
		for (var i = publi.length - 1; i >= 0; i--) {
			if(publi[i].className == lng_ownattack){
				publi[i].style.color=color_attack;
			}else if(publi[i].className == lng_rownattack){
				publi[i].style.color=darken(color_attack);
			}else if(publi[i].className == lng_ownespionage){
				publi[i].style.color=color_spy;
			}else if(publi[i].className == lng_rownespionage){
				publi[i].style.color=darken(color_spy);
			}else if(publi[i].className == lng_owntransport){
				publi[i].style.color=color_otransport;
			}else if(publi[i].className == lng_rowntransport){
				publi[i].style.color=darken(color_otransport);
			}else if(publi[i].className == lng_ftransport){
				publi[i].style.color=color_transport;
			}else if(publi[i].className == lng_rtransport){
				publi[i].style.color=darken(color_transport);
			}else if(publi[i].className == lng_fownharvest){
				publi[i].style.color=color_harvest;
			}else if(publi[i].className == lng_rownharvest){
				publi[i].style.color=darken(color_harvest);
			}
		}
	}

	/*添加任务完成的本地时间*/
	if (localMissionTimeInOverView == "1"){
		missionTime=xpath("//table[@width='519']/tbody/tr[position()>4]/th/div")
		for(var i=0; i<missionTime.snapshotLength; i++){
			timeRemain = missionTime.snapshotItem(i).textContent;
			timeAri = document.createElement('div')
			timeAri.innerHTML=timeForecast(timeRemain)	
			timeAri.className = "overviewTimeAri";
			missionTime.snapshotItem(i).parentNode.appendChild(timeAri)
			missionTime.snapshotItem(i).className = "overviewTimeCtd";
		}
	}
	/*“你有 3 条新消息s” 语法修改 做本地化的人不专业..*/
	newMessage = xpathOne("//th[@colspan=4]/a");
	if(newMessage){
		newMessageCount = parseInt(newMessage.innerHTML.match(/\d+/)[0]);
		newMessage.innerHTML  = newMessage.innerHTML.replace(/\d+/,"<font color=red>"+newMessageCount+"</font>");
		if(newMessageCount>1){
			if(langloca =='17'||langloca=='15'){
				newMessage.innerHTML  = newMessage.innerHTML.replace(/s/,"");
			}
		}
		if(langloca =='17'){//CN
			newMessage.innerHTML  = newMessage.innerHTML.replace(/你/,"报告指挥官，您");
		}else if(langloca=='15'){//TW
			newMessage.innerHTML  = newMessage.innerHTML.replace(/您/,"報告指揮官，您");
		}
		document.title="["+newMessageCount+"]"+newMessage.textContent.match(/\S+.*/)[0]+curPlanetName+document.title
	}else{
		document.title="概况-"+GM_getValue (server+'Cur_Planet_Name')+document.title
	}
	
	/*修改空闲和有建设的星球Class*/
	planetsStatus = xpath("//table[@class='s']/tbody/tr/th/center");//殖民星球
	for(var i=0; i<planetsStatus.snapshotLength; i++){
		if((planetsStatus.snapshotItem(i).textContent.match(/空闲/))||(planetsStatus.snapshotItem(i).textContent.match(/閒置/))||(planetsStatus.snapshotItem(i).textContent.match(/free/))){
			planetsStatus.snapshotItem(i).parentNode.className="idleStar";
		}else{
			planetsStatus.snapshotItem(i).parentNode.className="busyStar";
		}
	}
	mainPlanetsStatus = xpathOne("//table[@width='519']/tbody/tr/th[@colspan='2']/center");//主星
	if(mainPlanetsStatus){
		if((mainPlanetsStatus.textContent.match(/空闲/))||(mainPlanetsStatus.textContent.match(/閒置/))||(mainPlanetsStatus.textContent.match(/free/))){
			mainPlanetsStatus.parentNode.className="idleStar";
		}else{
			mainPlanetsStatus.parentNode.className="busyStar";
		}
	}
	
	/*给自己排名的链接添加高亮参数*/
	overviewlink = xpath("//th/a")
	linknumber = overviewlink.snapshotLength
	myRankLink = overviewlink.snapshotItem(linknumber-1)
	myRankLink.href=myRankLink.href+"&rankToCheckUser="+mystr2num(myRankLink.textContent)

	/*有外来舰队时更换明显的警告Favicon*/
	//allCommingSpan = xpath("//span[@class='flight attack' or @class='flight espionage']");//敵人/* 运输就不报了... or @class='flight transport' */
	//allCommingSpan = xpath("//span[@class='flight ownattack' or @class='flight owntransport' or @class='flight ownespionage']");//自己
	allCommingA = xpath("//a[@class='attack' or @class='espionage']");
	//if (allCommingSpan.snapshotLength!=0){
	if (allCommingA.snapshotLength!=0){
		var vodka = document.createElement('link');
		vodka.setAttribute('type', 'image/x-icon');
		vodka.setAttribute('rel', 'shortcut icon');
		vodka.setAttribute('href', 'data:image/gif;base64,R0lGODlhEAAQAMQQAP+qqv/d3f+7u/9VVf8iIv8REf9ERP/u7v+IiP93d//MzP+Zmf8zM/9mZv////8AAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJAAAQACwAAAAAEAAQAAAFeiDkBACQPMPwIADyFIqoPnRt06IjFMXKGIvGw5BgOBwKHmPJ6NVODkSPwBQwhrOHA2C4MggPISFhoBWOB1vB+2UZoomGvJGYJe53x/XGp6ERc4GBBxAiXUyITA4iAX02RiIKgpMAiw4njjQIlkIIC5+gC1eVInuZBw4hACH5BAkAABAALAAAAAAQABAAAAV5YAAAyTMMDwIgT6EcB/rMdF07QlGkjLE0D0OCYVLoGEjGjlYiOHaEpIBokD0EDgORQXgACQnDrCA81ApbrkoMbrgbCVliPm+IbXga44B4+/0wDllJhISCEAF5NQwOEBAKf5EAjRAlijMIlEAIC52eC0STjkSXDweUIQAh+QQJAAAQACwAAAAAEAAQAAAFdmDyDMODAMhTKEfrQE8sz/PhFCZjLM1jJIxRwuFgGBk4mYhAJB4FQUMpJiBCioRHj5AwxAo/gEPxDRoJJy/BFmg0EtOEXN4wNGn4B4OIcPv/DS5EUEeFRlZ3eXovVyKAf2IQVzyKJoxXDguamwtBkZKSlTagkiEAIfkECQoAEAAsAAAAABAAEAAABX3gMDwIgDyFcqwO5D5wLMOHYyOMsTSPkTCPQcJ2eDAYBVniQbARGwwB0DCCCWwQ54NHSBhgBR/AoQADj4TSl1ALNAqJamI+bxicjtNMxrjBGoCBgCw2AoBHiIhYeA57Ri1ZS3+CgGMuDjuAjgiQWU4LoKBAli6XZXs1pZcIIQAh+QQJAAAQACwAAAAAEAAQAAAFfyACIE+hHKgDrZBjPHAcH05dE0vzGAnzDInaQSZLPAg2x6HRGMAMTpig1rKRCIlXiQdwKIgMBkH0ItACjcJOl2i3G4YkqUmEMWokGXOfqgmYTmGCdypJDiR5diotRkR7DV0rDjlMBA86MQiLVTUFBZMLPpEsLV93MjSkLSQDDiEAIfkECQAAEAAsAAAAABAAEAAABX0g8hTKYTpQCjnGIz5wfDg0TTzHYyTMMyS0XGyYeBBqjkOjMTAyYwLaqiYCtkY7gEMxjBEQgBZhFmgUdA1YYp1oGJCi5yvGoM2Hy8aJJlg2GUsMglJIDiIINDB1KQ5FXTBLWowLeTd5MIgqSAUFNT2SKitcdUkwM6ErIgN8IQAh+QQJAAAQACwAAAAAEAAQAAAFgKByjA5kQo7xII6DPPBztDQhtwPzDEl7xMCGjUBzHBqNwYOABMAELRTt1XMoHgVDAmAFeh8qwizQKIAbsIYu0TAUX8lVKsZovb5Y2awlQCoZSAlLUUUucg5OPSYOgngwCyUoC0hCD5Q6CpFSLQUFNDoBmotXdUZYRCeLLwN8MAwhACH5BAkAABAALAAAAAAQABAAAAWC4HE4UAk5xoM4DvK8z8iyRMwOTzMk7AH/DUJh1mvoHgQj4MFYsE4zF8+hyCUSAOpvqxIQRoFG4WFovBqMR9ZAdB1XqReD5eI+xsyZwIhjGBNIOVBRKixLgAwngHYvC2knC0ZBOUZpCoAlRAVDLGkBjyZacw4+BTUIJicuAywCcgoOIQAh+QQJAAAQACwAAAAAEAAQAAAFgiAkQo7xII6DPCybvsRzpMPT3IxztHxDFK+B7lYj3AAPxiIQAL5WiZTClmhNeViE4NYINAoPQ4PVYDwAr6ethjJlsS1wsmHaNmqMWzXWcNTUKA5IVQxTbnAsC2ZmClx8OA8KVSdpBU4OZgFmDwQKJFM5Og8FMQibJCtCDgIshSkGDCEAIfkECQAAEAAsAAAAABAAEAAABYggBDnGgzgO8qysgTrEc6DD09zMk7B8QxSvGuBWI9wAD8YiECgUZikdSmHbrRoOnhYhuDVmhYehcc0BXi9Vo3YqaQlZ7SOcbJSw63pjF8PWBCgqJw5IOwxULhByKws5OQoOED42OA8KViciDk4vOQE5DwSQEFQMKAdzMQigC1EDKAIrhygGphAhACH5BAkAABAALAAAAAAQABAAAAWIoGM8iOMgT6oaDuQQz2EOT2MzT9KqaUMUJgcN0KIRbIAHYxEIFAoyCErnUNQSqkbLwVMhBLZGVNTo4YhBEwTSoJVGXcK2W0gxGiOtS2nDwrQ0AnMlDklYDFYsaxBdDws4OAotazU3DwpYJJNrQCY4ATgPBJKLDCYHDwUwCKELkwMmAnaSIqaLIQAh+QQJAAAQACwAAAAAEAAQAAAFiSDiOMhjnoYDOQdwjMPTzMyTqOTZEMXoxACcIzADPBiLQKBQeK0OjJFCltDhFISTCSGYNZxDg0FWC/pGkJWDIRprHwQcIFF9FEyMxriBqzeqWXwxAkIHCw5GVQxTKWlpDnUPCzU1CiqOaw2VdSKOj3w1ATVwlphGB3ZZCKOHjwsPAniWDgZRmFUhACH5BAkAABAALAAAAAAQABAAAAWKoIM8ZGk4kHMAwOIMTyMzT4KKZUMUTg8DN0eAUQA8GItAoFA43A40hiKWyN0UhEeB9kAIZA1nKmAwHGnAnhqScnDNJRLhBkgkZAUSo2Fu3KpxWX4wAkEHCzI1R1MnbGwOCQw0C1EPCiiObiUKgAiYmWAPQ3KXmUYkBVkIXC6PCw8Dr1I9BgyfkCUhACH5BAkAABAALAAAAAAQABAAAAWA4COKhgM5BwAsD5M0MPMkpoOMo6MPD1A7AUbh0RgsAoFC4VA7yBhQ16hRUxAehShCAGswTwGDoSWj6s6Qk0M2YosINUDi1U0wGmPqKYGbOngCPwcLXTEKDyVpaQ52UU8PCiaKa30iCJKThTBvkZMAlQhsC5IOLEYLqDoGDJiMlSEAIfkECQAAEAAsAAAAABAAEAAABX/gIxoO5BwAsDxM8gwN8ySlg4g47gwPUDsBRuHRGDAQgULhUDvIGFAGAdeoKaaFKKJBbDBNAYOBJWsMHeiSySHDyYYPQg2QSDTuDddjXDXpczg8Aj8HC3iHe2oQflGNDwqKJm2ACJEmh4cEkIsmAICAC2oOKwMLpqcGDIoOf4AhACH5BAUAABAALAAAAAAQABAAAAVxoOFAzgEAy8Mkz3AWyeggT23fDyA7AVM8jQEDQWMcZAeGisEk3GQKZ4E5bKissoDBsAT+EoPHiORQ2pSFAUwGSCQa8Aar5ZbNcbjdYRHvxyGAJAlUhFSBJGZ4NYcOfo6BDgCKT4AOKQMLmZoLYZB3kyEAOw==');
		var head = document.getElementsByTagName('head')[0];
		head.appendChild(vodka);
	}
	
	/*直接显示舰队构成和资源*/
	allFleetResA = xpath("//a[@title][@href='#']")
	for (i=0;i<allFleetResA.snapshotLength;i++){
		thisA = allFleetResA.snapshotItem(i)
		thisAItemArr = thisA.title.match(/\D+\s(?:\d+.)*\d+/g)
		tempStr = "["
		for(j=0;j<thisAItemArr.length;j++){
			thisAItemCount = thisAItemArr[j].match(/(?:\d+.)*\d+/)
			str = trimStr(thisAItemArr[j].match(/\D*\s(?=\d+)/)[0]);
			if (thisAItemCount.length>0&&str!='飞船的数量:： '&&thisAItemCount!="0"){
				if(DEBUG){logToConsole(str);}
				tempStr+=replaceFleetRes(str)+"<span class='overviewCount'>"+thisAItemCount+"</span>"
			}
		}
		tempStr += "]"
		thisA.innerHTML=tempStr
	}
	/*有舰队抵达后5秒刷新页面 http://userscripts.org/scripts/show/30048*/
	if(refreshOverViewOnAvr=='1'){
        var rel;
        if(rel=document.getElementById("bxx1")){
            setTimeout("location.reload();",rel.title*1000+5000);
        }
	}

	/*记录星球大小*/
    var T_sizeNow = new Array();
        T_sizeNow[0] = "Developed fields"; //ogame.org
        T_sizeNow[15] = "所用方圓"; //ogame.tw
        T_sizeNow[17] = "建筑空间"; //ogame.com.cn
    T_sizeNowReg = new RegExp (T_sizeNow[langloca])
    var T_sizeAll = new Array();
        T_sizeAll[0] = "max. developed fields"; //ogame.org
        T_sizeAll[15] = "最大可用方圓"; //ogame.tw
        T_sizeAll[17] = "最大建筑空间"; //ogame.com.cn
    T_sizeAllReg = new RegExp (T_sizeAll[langloca])
	allA = xpath("//a[@title]")
    for(i=0;i<allA.snapshotLength;i++){
        if(trimStr(allA.snapshotItem(i).title)==T_sizeNow[langloca]){
            GM_setValue(server+curPlanetName+"_sizeNow",trimStr(allA.snapshotItem(i).innerHTML)*1)
        }
        if(trimStr(allA.snapshotItem(i).title)==T_sizeAll[langloca]){
            GM_setValue(server+curPlanetName+"_sizeAll",trimStr(allA.snapshotItem(i).innerHTML)*1)
        }
    }
}

/* 舰队页面1 船只计算,时间显示等功能*/
if(/page=flotten1/.test(ogtitle) == true){
	document.title="舰队1/3-"+GM_getValue (server+'Cur_Planet_Name')+document.title;
	if(calcships == "1"){
		var cargname = new Array();
			cargname[0] = "Cargo Capacity"; //ogame.org
			cargname[15] = "航行艦隊總裝載量"; //ogame.tw
			cargname[17] = "舰队总装载量"; //ogame.com.cn			
		var fuelname = new Array(); //32.
			fuelname[0] = "Deuterium consumption"; //ogame.org
			fuelname[15] = "航行艦隊消耗重氫量"; //ogame.tw
			fuelname[17] = "舰队燃料消耗"; //ogame.com.cn
		var speedname = new Array(); //33.
			speedname[0] = "Speed"; //ogame.org
			speedname[15] = "航行速度"; //ogame.tw
			speedname[17] = "航速"; //ogame.com.cn
		var F_head = document.getElementsByTagName('head')[0];
		var F_script = document.createElement('script');
			F_script.type = 'text/javascript';
			F_script.innerHTML = 'function addship(id,val){'+
								'if((parseInt(document.getElementsByName(id)[0].value)>0) || (val>=0)){document.getElementsByName(id)[0].value = parseInt(document.getElementsByName(id)[0].value)+parseInt(val); } calccap();} '+
								'function changeship(id,val){'+
								'document.getElementsByName(id)[0].value = val; calccap();} '+
								'function getStorageFaktor(){ return 1}'+
								'function checkmval(ress,carg){ '+
								'var tempval = (Math.ceil(ress/carg));'+
								'if(tempval < 0){return 0;} else {return tempval;}'+
								'}'+
								'function doter(str){'+
								'var tempval = (""+str).split(""); '+
								'var tempval2 = ""; '+
								'for(var i=0;i<tempval.length;i++){ '+
								'if(((tempval.length-(i+1))%3 == 0) && ((i+1)!=tempval.length)){tempval2 = tempval2+tempval[i]+"."; '+
								'} else { tempval2 = tempval2+tempval[i]; } } return tempval2; } '+
								'function calccap(){'+
								'var capa = storage();'+
								'var fuel = consumption();'+
								'var curmet = parseInt(document.getElementById("curmet").value); if(!curmet){curmet=0;}'+
								'var curcry = parseInt(document.getElementById("curcry").value); if(!curcry){curcry=0;}'+
								'var curdeu = parseInt(document.getElementById("curdeu").value); if(!curdeu){curdeu=0;}'+							
								'if((capa)>0){var fontcarg = "<font color=\'lime\'>"+doter(capa)+"</font>";} else {var fontcarg = "<font color=\'red\'>"+doter(capa)+"</font>";}'+
								'if((fuel)>0){var fontfuel = "<font color=\'red\'>"+doter(fuel)+"</font>";} else {var fontfuel = "<font color=\'lime\'>"+doter(fuel)+"</font>";}'+
								'document.getElementById("calczone").innerHTML = "'+cargname[langloca]+': "+fontcarg+"<input type=\'hidden\' id=\'hicar\' value=\'"+capa+"\'><br>'+fuelname[langloca]+': "+fontfuel+"<br><br>'+C_nn[langloca][1]+': <font color=\'lime\'>"+checkmval((curmet+curcry+curdeu-capa), 25000)+"</font><br>'+C_nn[langloca][0]+': <font color=\'lime\'>"+checkmval((curmet+curcry+curdeu-capa), 5000)+"</font>";'+
								'for(i = 200; i < 220; i++){ '+
								'if(document.getElementById("moreship" + i)){'+
								'var valor = checkmval((curmet+curcry+curdeu-capa),document.getElementById("moreship" + i).getAttribute("capa"));'+
								'document.getElementById("moreship" + i).innerHTML = "<a style=\'cursor:pointer; -moz-user-select:none;\' onclick=\'addship(\\\"ship"+i+"\\\","+Math.min(valor,(document.getElementById("moreship" + i).getAttribute("maxip")-parseInt(document.getElementsByName("ship" + i)[0].value)))+");\'>+"+Math.min(valor,(document.getElementById("moreship" + i).getAttribute("maxip")-parseInt(document.getElementsByName("ship" + i)[0].value)))+"</a>";'+
								//'document.getElementById("totalship" + i).innerHTML = checkmval((curmet+curcry+curdeu),document.getElementById("moreship" + i).getAttribute("capa"));;}'+
								';;}'+
								'}}';
			F_head.appendChild(F_script);
		
		var warnmax = xpath("//th[@colspan='4']/font[@color='red']");
		if(warnmax.snapshotLength > 0){warnmax = '<tr height="20"><th colspan="6"><font color="red">'+warnmax.snapshotItem(0).innerHTML+'</font></th></tr>';} else {warnmax = "";}
		var cl_tbtitle = xpath("//table[@width='519']/parent::form[contains(@action,'flotten2') and @method]/table/tbody/tr/td[@class='c']").snapshotItem(0).innerHTML;
		var cl_sptitle = xpath("//table[@width='519']/parent::form[contains(@action,'flotten2') and @method]/table/tbody/tr/th[not(@colspan)]").snapshotItem(0).innerHTML;
		var cl_maxtitle = xpath("//table[@width='519']/parent::form[contains(@action,'flotten2') and @method]/table/tbody/tr/th[not(@colspan)]").snapshotItem(1).innerHTML;
		var cl_sbvalue = xpath("//table[@width='519']/parent::form[contains(@action,'flotten2') and @method]//input[@type='submit']");
		if(cl_sbvalue.snapshotLength > 0){cl_sbvalue = '<tr height="20"><th colspan="6"><input type="submit" value="'+cl_sbvalue.snapshotItem(0).value+'" /></th></tr>';} else {cl_sbvalue = ""}
		var noxipbut = xpath("//a[contains(@href,'noShips(')]").snapshotItem(0).innerHTML;
		var allxipbut = xpath("//a[contains(@href,'maxShips(')]").snapshotItem(0).innerHTML; 
		
		var allhidden = xpath("//table[@width='519']/parent::form[contains(@action,'flotten2') and @method]/descendant::input[@type='hidden']");
		var hiddenholder = "";
		for(var i=0;i<allhidden.snapshotLength;i++){
			hiddenholder += '<input type="hidden" name="'+allhidden.snapshotItem(i).name+'" value="'+allhidden.snapshotItem(i).value+'">';
		}
		var allhdmaxs = xpath("//input[@type='hidden' and contains(@name,'maxship')]");
		var allhdspee = xpath("//input[@type='hidden' and contains(@name,'speed')]");
		var allhdcapa = xpath("//input[@type='hidden' and contains(@name,'capacity')]");
		var allhdcons = xpath("//input[@type='hidden' and contains(@name,'consumption')]");
		var allxipsname = xpath("//input[contains(@name,'ship') and @size and @alt]/parent::th/parent::tr/parent::tbody//a[@title]");
		var allxipinp = xpath("//input[contains(@name,'ship') and @size and @alt]");
		var xiphold = "";
		var solfix = 0;
        for(var l=0;l<shipIdArr.length;l++){
            GM_setValue (server+'_'+curPlanetName+'_ship'+shipIdArr[l], 0);
        }
		for(var i=0;i<allxipsname.snapshotLength;i++){
			if(parseInt(allhdspee.snapshotItem(i).value) == 0){
				xiphold += '<tr><th>'+allxipsname.snapshotItem(i).innerHTML+'</th><th>-</th><th>'+allhdmaxs.snapshotItem(i).value+'</th><th>-</th><th>-</th></tr>'; //<th>-</th>
			solfix--; continue;
			}
			xiphold += '<tr><th><a style="cursor:pointer; -moz-user-select:none;" onclick="addship(\''+allxipinp.snapshotItem(i+solfix).name+'\',+1)">'+allxipsname.snapshotItem(i).innerHTML+'</a></th>'
			xiphold += '<td class="k">'+allhdspee.snapshotItem(i).value+'</td><th><a style="cursor:pointer; -moz-user-select:none;" onclick="addship(\''+allxipinp.snapshotItem(i+solfix).name+'\',-5);">&laquo;</a> <a style="cursor:pointer; -moz-user-select:none;" onclick="addship(\''+allxipinp.snapshotItem(i+solfix).name+'\',-1);">-</a> <a style="cursor:pointer; -moz-user-select:none;" onclick="changeship(\''+allxipinp.snapshotItem(i+solfix).name+'\',0);">&reg;</a> <a style="cursor:pointer; -moz-user-select:none;" onclick="changeship(\''+allxipinp.snapshotItem(i+solfix).name+'\','+allhdmaxs.snapshotItem(i).value+');">[max: '+allhdmaxs.snapshotItem(i).value+']</a> <a style="cursor:pointer; -moz-user-select:none;" onclick="addship(\''+allxipinp.snapshotItem(i+solfix).name+'\',1);">+</a> <a style="cursor:pointer; -moz-user-select:none;" onclick="addship(\''+allxipinp.snapshotItem(i+solfix).name+'\',5);">&raquo;</a></th>'
			xiphold += '<th><input onchange="calccap();" onkeyup="calccap();" name="'+allxipinp.snapshotItem(i+solfix).name+'" size="'+allxipinp.snapshotItem(i+solfix).size+'" value="'+allxipinp.snapshotItem(i+solfix).value+'" alt="'+allxipinp.snapshotItem(i+solfix).alt+'"/></th>'
			xiphold += '<th id="more'+allxipinp.snapshotItem(i+solfix).name+'" maxip="'+allhdmaxs.snapshotItem(i).value+'" capa="'+allhdcapa.snapshotItem(i).value+'">-</th></tr>'; //<td class="k" id="total'+allxipinp.snapshotItem(i+solfix).name+'">-</td>
			/*记录星球所有的舰队数量*/
			if(DEBUG){logToConsole("planet "+curPlanetName)}
			if(DEBUG){logToConsole("name "+allxipinp.snapshotItem(i+solfix).name)}
			if(DEBUG){logToConsole("count "+allhdmaxs.snapshotItem(i).value)}
			GM_setValue (server+'_'+curPlanetName+'_'+allxipinp.snapshotItem(i+solfix).name, allhdmaxs.snapshotItem(i).value);
		}

		/*统计太卫*/
		solarSat = xpathOne('//input[@name="maxship212"]')
		if (solarSat){
			GM_setValue (server+'_'+curPlanetName+'_ship212',solarSat.value)
		}
		
		var allcurres = xpath("//font[contains(@color,'#')]/ancestor::table[contains(@id,'resources')]/tbody/tr[3]/td[position()<4 and position()>0]");
		if(allcurres.snapshotLength > 0){
			var curmet = mystr2num(reder(allcurres.snapshotItem(0).innerHTML));
			var curcry = mystr2num(reder(allcurres.snapshotItem(1).innerHTML));
			var curdeu = mystr2num(reder(allcurres.snapshotItem(2).innerHTML));
		}
		
		var planetname = xpath("//select[@size='1']/option[@selected]");
		if(planetname.snapshotLength > 0){
			var planetcoords = planetname.snapshotItem(0).innerHTML;
				planetcoords = /\[(\d+):(\d+):(\d+)\]/.exec(planetcoords);
			var curgal = RegExp.$1;
			var cursys = RegExp.$2;
			var curpla = RegExp.$3;
		}
		
		var resname = xpath("//font/parent::b/parent::i/b/font");
		var metname = resname.snapshotItem(0).innerHTML;
		var cryname = resname.snapshotItem(1).innerHTML;
		var deuname = resname.snapshotItem(2).innerHTML;
		var targetname = xpath("//table[@width='519' and position()=1]/tbody/tr[2]/th[6]").snapshotItem(0).innerHTML;
		var transpcalc = new Array(); 
			transpcalc[0] = "Transport calculator"; //ogame.org
			transpcalc[15] = "艦隊航行計算資訊"; //ogame.tw
			transpcalc[17] = "舰队航行计算"; //ogame.com.cn
		
		var calcinjection = '<br>'+hiddenholder+'<table width="519" border="0" cellpadding="0" cellspacing="1">'+
							'<tr height="20"><td class="c" colspan="3">'+transpcalc[langloca]+':</td></tr>'+
							'<tr height="20"><th><a style="cursor:pointer; -moz-user-select:none;" onclick="javascript:if(document.getElementById(\'curmet\').value=='+curmet+'){document.getElementById(\'curmet\').value=0;calccap();}else{document.getElementById(\'curmet\').value='+curmet+';calccap();}">'+metname+'</a></th><th><a style="cursor:pointer; -moz-user-select:none;" onclick="document.getElementById(\'curmet\').value=parseInt(document.getElementById(\'curmet\').value)-10000;calccap();">&nbsp;&#060;&#151; </a><a style="cursor:pointer; -moz-user-select:none;" onclick="document.getElementById(\'curmet\').value=parseInt(\'0\');calccap();">&nbsp;&reg;&nbsp;</a><input id="curmet" value="'+curmet+'" onchange="calccap();" onkeyup="calccap();"><a style="cursor:pointer; -moz-user-select:none;" onclick="document.getElementById(\'curmet\').value=parseInt(document.getElementById(\'curmet\').value)+10000;calccap();" > &#151;&#062;&nbsp;</a></th><th rowspan="5" id="calczone"><script>calccap();</script></th></tr>'+
							'<tr height="20"><th><a style="cursor:pointer; -moz-user-select:none;" onclick="javascript:if(document.getElementById(\'curcry\').value=='+curcry+'){document.getElementById(\'curcry\').value=0;calccap();}else{document.getElementById(\'curcry\').value='+curcry+';calccap();}">'+cryname+'</a></th><th><a style="cursor:pointer; -moz-user-select:none;" onclick="document.getElementById(\'curcry\').value=parseInt(document.getElementById(\'curcry\').value)-10000;calccap();">&nbsp;&#060;&#151; </a><a style="cursor:pointer; -moz-user-select:none;" onclick="document.getElementById(\'curcry\').value=parseInt(\'0\');calccap();">&nbsp;&reg;&nbsp;</a><input id="curcry" value="'+curcry+'" onchange="calccap();" onkeyup="calccap();"><a style="cursor:pointer; -moz-user-select:none;" onclick="document.getElementById(\'curcry\').value=parseInt(document.getElementById(\'curcry\').value)+10000;calccap();" > &#151;&#062;&nbsp;</a></th></tr>'+
							'<tr height="20"><th><a style="cursor:pointer; -moz-user-select:none;" onclick="javascript:if(document.getElementById(\'curdeu\').value=='+curdeu+'){document.getElementById(\'curdeu\').value=0;calccap();}else{document.getElementById(\'curdeu\').value='+curdeu+';calccap();}">'+deuname+'</a></th><th><a style="cursor:pointer; -moz-user-select:none;" onclick="document.getElementById(\'curdeu\').value=parseInt(document.getElementById(\'curdeu\').value)-10000;calccap();">&nbsp;&#060;&#151; </a><a style="cursor:pointer; -moz-user-select:none;" onclick="document.getElementById(\'curdeu\').value=parseInt(\'0\');calccap();">&nbsp;&reg;&nbsp;</a><input id="curdeu" value="'+curdeu+'" onchange="calccap();" onkeyup="calccap();"><a style="cursor:pointer; -moz-user-select:none;" onclick="document.getElementById(\'curdeu\').value=parseInt(document.getElementById(\'curdeu\').value)+10000;calccap();" > &#151;&#062;&nbsp;</a></th></tr>'+
							'<tr height="20"><th>'+targetname+'</th><th><input size="2" name="galaxy" value="'+curgal+'" onchange="calccap();" onkeyup="calccap();"> : <input size="2" name="system" value="'+cursys+'" onchange="calccap();" onkeyup="calccap();"> : <input size="2" name="planet" value="'+curpla+'" onchange="calccap();" onkeyup="calccap();"></th></tr>'+
							'<tr height="20"><th>'+speedname[langloca]+'</th><th><select name="speed" onchange="calccap();"><option value="10">100</option><option value="9">90</option><option value="8">80</option><option value="7">70</option><option value="6">60</option><option value="5">50</option><option value="4">40</option><option value="3">30</option><option value="2">20</option><option value="1">10</option></select> %</th>'+
							'</table>';
		
		var formzone = xpath("//table[@width='519']/parent::form[contains(@action,'flotten2') and @method]");
		var calcsholder = document.createElement('form');
			calcsholder.action = formzone.snapshotItem(0).action;
			calcsholder.method = formzone.snapshotItem(0).method;
			calcsholder.innerHTML = '<input name="speedfactor" type="hidden" value="1"><input name="thisgalaxy" type="hidden" value="'+curgal+'"><input name="thissystem" type="hidden" value="'+cursys+'"><input name="thisplanet" type="hidden" value="'+curpla+'">'+
									'<table width="519" border="0" cellpadding="0" cellspacing="1">'+warnmax+
									'<tr height="20"><td colspan="6" class="c">'+cl_tbtitle+'</td></tr>'+
									'<tr height="20"><th>'+cl_sptitle+'</th><th>'+speedname[langloca]+'</th><th>'+cl_maxtitle+'</th><th>-</th><th>-</th></tr>'+xiphold+ //<th>-</th>
									'<tr height="20"><th colspan="3"><a href="javascript:noShips(); calccap();" >'+noxipbut+'</a></th>'+
									'<th colspan="3"><a href="javascript:maxShips(); calccap();" >'+allxipbut+'</a></th></tr>'+cl_sbvalue+
									'</table>'+calcinjection;
		formzone.snapshotItem(0).parentNode.insertBefore(calcsholder, formzone.snapshotItem(0));
		formzone.snapshotItem(0).parentNode.removeChild(formzone.snapshotItem(0));
	
	}
    if(localtimeF1 == "1") {
        allServerTimeSTA = xpath('//div[@id="content"]/center/center/table/tbody/tr[position()>2]/th[position()=5]');
        allServerTimeETA = xpath('//div[@id="content"]/center/center/table/tbody/tr[position()>2]/th[position()=7]');
        allServerTimeComm = xpath('//div[@id="content"]/center/center/table/tbody/tr[position()>2]/th[position()=8]');
        if(allServerTimeComm.snapshotItem(0).innerHTML!="-"){//使没有舰队活动不出错 2008-08-12
            var timeNow = new Date();//
            var yearNow = timeNow.getFullYear();//2008
            var monthNow = timeNow.getMonth();
            staTime = new Date()
            etaTime = new Date()
            recallTime = new Date()
            for(var i=0;i<allServerTimeSTA.snapshotLength;i++){
                thisTimeSTA = allServerTimeSTA.snapshotItem(i);
                thisTimeETA = allServerTimeETA.snapshotItem(i);
                thisComm = allServerTimeComm.snapshotItem(i);
                fechaSTA = thisTimeSTA.innerHTML.match(/(\S\S\S) (\S\S\S) (\d+) (\d+)(:\d\d:\d\d)/);//Sun Jun 15 6:24:19
                fechaETA = thisTimeETA.innerHTML.match(/(\S\S\S) (\S\S\S) (\d+) (\d+)(:\d\d:\d\d)/);//Sun Jun 15 6:24:19
                monSta = fechaSTA[2];
                monEta = fechaETA[2];
                monStaPos = findPos(months, monSta);
                monEtaPos = findPos(months, monEta);
                if (monStaPos == monthNow){
                    yearSta = yearNow
                }else if (monStaPos < monthNow){
                    yearSta = yearNow
                }
                if (monStaPos > monEtaPos){//跨年的情况
                    if (monStaPos == monthNow){//出发是今年
                        yearSta = yearNow
                        yearEta = yearNow + 1
                    }
                    if (monEtaPos == monthNow){//抵达是今年
                        yearSta = yearNow - 1
                        yearEta = yearNow
                    }
                }else{
                    yearSta = yearNow
                    yearEta = yearNow
                }
                staTime.setTime(Date.parse(thisTimeSTA.innerHTML+" "+yearSta)+timeZoneDiffSec*1000);
                etaTime.setTime(Date.parse(thisTimeETA.innerHTML+" "+yearEta)+timeZoneDiffSec*1000);
                thisTimeSTA.innerHTML=humanTime(staTime)+"<br/><span class='originalTime'>"+fechaSTA[0] +"</span>";
                thisTimeETA.innerHTML=humanTime(etaTime)+"<br/><span class='originalTime'>"+fechaETA[0] +"</span>";
                toNow = Date.parse(etaTime.toUTCString())- Date.parse(timeNow.toUTCString());
                if(toNow<=0){
                    thisComm.innerHTML = "已抵达"
                }else{
                    toNowHour = Math.floor(toNow/1000/3600)
                    toNowMin = Math.floor((toNow/1000)%3600/60)
                    toNowSec = ((toNow/1000)%3600)%60
                    if(toNowHour<10&&toNowHour>0){toNowHour="0"+toNowHour}
                    if(toNowMin<10&&toNowMin>0){toNowMin="0"+toNowMin}
                    if(toNowSec<10&&toNowSec>0){toNowSec="0"+toNowSec}
                    thisComm.innerHTML = toNowHour+":"+toNowMin+":"+toNowSec+thisComm.innerHTML
               } recallTime.setTime(Date.parse(timeNow.toUTCString())+(Date.parse(timeNow.toUTCString())-Date.parse(staTime.toUTCString())))
                if(/order_return/.test(thisComm.innerHTML) == true){
                    thisComm.innerHTML += "<br>"+humanTime(recallTime)
                }
            }
            setTimeout(refreshClock,1000)
        }
    }
	/*任务显示*/
	allMission1 = xpath('//div[@id="content"]/center/center/table/tbody/tr[position()>2]/th[position()=2]/a[position()=1]');
	allMission2 = xpath('//div[@id="content"]/center/center/table/tbody/tr[position()>2]/th[position()=2]/a[position()=2]');
	for(var i=0;i<allMission1.snapshotLength;i++){//有货物的显示
		thisMission1 = allMission1.snapshotItem(i);
		missionCar = thisMission1.title.match(/\D+\s(?:\d+.)*\d+/g)
		if(missionCar){
            tempStr = "["
			for(var j=0;j<missionCar.length;j++){
				mcCountStr=missionCar[j].match(/(?:\d+.)*\d+/)
                str = trimStr(missionCar[j].match(/\S*:\s(?=\d+)/)[0]);
                if(DEBUG){logToConsole(str)}
                if (mcCountStr.length>0){
                    tempStr+=replaceFleetRes(str)+"<span class='overviewCount'>"+mcCountStr+"</span>"
                }
			}
            tempStr += "]"
			thisMission1.innerHTML = thisMission1.innerHTML +tempStr
		}
	}
    var T_adoFltAcs= new Array();
        T_adoFltAcs[0] = "ACS Defend"; //ogame.org
        T_adoFltAcs[15] = "協防"; //ogame.tw
        T_adoFltAcs[17] = "协防"; //ogame.com.cn
    var T_adoFltArv= new Array();
        T_adoFltArv[0] = "Fleet Arrives to Target"; //ogame.org
        T_adoFltArv[15] = "艦隊在星球上"; //ogame.tw
        T_adoFltArv[17] = "舰队在星球上"; //ogame.com.cn
    var T_adoFltRtn= new Array();
        T_adoFltRtn[0] = "Fleet Returns home"; //ogame.org
        T_adoFltRtn[15] = "返回星球"; //ogame.tw
        T_adoFltRtn[17] = "返回星球"; //ogame.com.cn
	for(var i=0;i<allMission2.snapshotLength;i++){
		thisMission2 = allMission2.snapshotItem(i);
		if(thisMission2.title==T_adoFltAcs[langloca]){
			thisMission2.innerHTML = "[&loz;]"
		}else if (thisMission2.title==T_adoFltArv[langloca]){
			thisMission2.innerHTML = "[&rarr;]"
		}else if (thisMission2.title==T_adoFltRtn[langloca]){
			thisMission2.innerHTML = "[&crarr;]"
		}else{
			thisMission2.innerHTML = thisMission2.title
		}
		thisMission2.title=""
	}	
    /*直接显示舰队组成*/
    allFleets=xpath("//div[@id='content']/center/center/table[@width='519'][position()='1']/tbody/tr[position()>'2']/th[position()=3]/a")
    for(i=0;i<allFleets.snapshotLength;i++){
        fleetTitle = allFleets.snapshotItem(i).title
        fleetTitleArr = fleetTitle.match(/\D+\s(?:\d+.)*\d+/g)
		tempStr = "["
		for(j=0;j<fleetTitleArr.length;j++){
			thisFleetCount = fleetTitleArr[j].match(/(?:\d+.)*\d+/)[0]
			str = trimStr(fleetTitleArr[j].match(/\D*:\s(?=\d+)/)[0]);
			if (thisFleetCount.length>0){
				if(DEBUG){logToConsole(str);}
				tempStr+=replaceFleetRes(str)+"<span class='overviewCount'>"+thisFleetCount+"</span>"
			}
		}
		tempStr += "]"
		allFleets.snapshotItem(i).innerHTML=tempStr
    }
    /*统计在飞的飞机*/
    shipAirArr =new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0)
    for(var i=0;i<shipIdArr.length;i++){
        GM_setValue (server+'_inAir_ship'+shipIdArr[i], 0);
    }
    planeNumbers = xpath("//center/table//tr/th[position()=3]/a")
    if(DEBUG){logToConsole("planeNumbers"+planeNumbers.snapshotLength);}
    if(planeNumbers){
        for(var j=0;j<planeNumbers.snapshotLength;j++){
            thisPlaneNumber = planeNumbers.snapshotItem(j)
            pNums = thisPlaneNumber.title.match(/\D+\d+/g)
            if(DEBUG){logToConsole("fleet "+pNums);}
            for (k=0;k<pNums.length;k++){
                for(i=0;i<shipNameArr[langloca].length;i++){
                    var tempReg = new RegExp("^"+shipNameArr[langloca][i])
                    if(tempReg.test(trimStr(pNums[k]))==true){
                        if(DEBUG){logToConsole(shipIdArr[i]+" was "+ GM_getValue (server+'_inAir_ship'+shipIdArr[i],0));}
                        if(DEBUG){logToConsole(shipIdArr[i]+" add "+ pNums[k].match(/\d+(.\d+)*/)[0]);}
                        GM_setValue (server+'_inAir_ship'+shipIdArr[i], GM_getValue (server+'_inAir_ship'+shipIdArr[i],0)*1 + pNums[k].match(/\d+(.\d+)*/)[0]*1);
                    }
                }
            }
        }        
    }
    /*区别显示其他星球*/
     allAth = xpath("//div[@id='content']/center/center/table//a/parent::th");
     for (i=0;i<allAth.snapshotLength;i++){
        tC=allAth.snapshotItem(i).innerHTML
        if(/\d+:\d+:\d+/.test(tC) == true){
            var tempSwitch = false
            for (k=0;k<(GM_getValue (server+'_Planet_Count'));k++){
                if (tC.match(/\[\d+:\d+:\d+\]/)[0]==(GM_getValue (server+'_Planet_' + k +'_Loc'))){
                    tempSwitch = true
                }
            }
            if(tempSwitch == true){
                allAth.snapshotItem(i).className='fltOwnPla';
            }else{
                allAth.snapshotItem(i).className='fltOtherPla';
            }
        }
     }
}

/* 舰队页面2 提供坐标选择 */
if(/page=flotten2/.test(ogtitle) == true){
	document.title="舰队2/3-"+GM_getValue (server+'Cur_Planet_Name')+document.title;
	function start2(){
		x = document.getElementById('content').getElementsByTagName( 'table' );
		y = x[0];
		z = y.getElementsByTagName( 'tr' );
		a = document.createElement( 'TR' );
		b = document.createElement( 'TD' );
		b.innerHTML = '私人坐标';
		b.colSpan = 2;
		b.className = 'c';
		a.appendChild( b );
		y.appendChild( a );
		str = GM_getValue('coordList_'+server);
		if(str!=null){//防止没有坐标出错2008-08-10
            array1 = str.split('^');
            len = array1.length;
            v = document.createElement( 'TR' );
            for( i = 0; i < len; i++ ){
                x = array1[i];
                if( x != '' ){
                    if( ( i - 1 ) % 2 == 0 ){
                        v = document.createElement( 'TR' );
                    }
                    arr = x.split( '|' );
                    o = document.createElement( 'TH' );
                    arrC = arr[0].split( ':' );
                    link = document.createElement( 'A' );
                    link.href = 'javascript:setTarget('+arrC[0]+','+arrC[1]+','+arrC[2]+','+arr[2]+'); shortInfo()';				
                    link.appendChild(document.createTextNode(arr[1]+' ['+arr[0]+']'));
                    o.appendChild( link );
                    v.appendChild( o );
                }
                if( ( i - 1 ) % 2 == 0 ){
                    y.appendChild( v );
                }
            }
		}
	}
	start2();

	/*添加本地时间*/
	arrivalOneTr = document.createElement( 'TR' );
	arrivalOneTh1 = document.createElement( 'TH' );
	arrivalOneTh2 = document.createElement( 'TH' );
	arrivalOneTh1.innerHTML="任务抵达时间"
	arrivalOneTh2.innerHTML="-<br/><span class='originalTime'>--</span>"
	arrivalOneTh2.id="arrivalOneTh2"
	
	arrivalTwoTr = document.createElement( 'TR' );
	arrivalTwoTh1 = document.createElement( 'TH' );
	arrivalTwoTh2 = document.createElement( 'TH' );
	arrivalTwoTh1.innerHTML="返航抵达时间"
	arrivalTwoTh2.innerHTML="-<br/><span class='originalTime'>--</span>"
	arrivalTwoTh2.id="arrivalTwoTh2"

	missionTbody=xpathOne("//div[@id='content']//tbody")
	missionTbody.insertBefore(arrivalTwoTr,missionTbody.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling)
	missionTbody.insertBefore(arrivalOneTr,missionTbody.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling)
	arrivalOneTr.appendChild(arrivalOneTh1)
	arrivalOneTr.appendChild(arrivalOneTh2)
	arrivalTwoTr.appendChild(arrivalTwoTh1)
	arrivalTwoTr.appendChild(arrivalTwoTh2)
	
	setTimeout(refreshF2Clock,1000)
	
	
    /*月球分离和排序*/
    if(moonCordExt=='1'){
        moonCordList = document.createElement( 'TR' );
        moonCordList.className='moonCordList'
        x=document.createElement( 'TD' )
        x.colSpan='2'
        x.className='c'
        var str="<table style='width:100%'>";
        for(i=0;i<(GM_getValue (server+'_Planet_Count'));i++){
            var thisIsMoon=GM_getValue (server+'_Planet_' + i +'_isMoon')
            var nextIsMoon=GM_getValue (server+'_Planet_' + (i+1) +'_isMoon')
            if(thisIsMoon=='Yes'){//月球
                str+="<td class='c'><center><a href='javascript:setTarget("+cordFormatChange(GM_getValue (server+'_Planet_' + i +'_Loc'))+",3); shortInfo()'>"+ GM_getValue (server+'_Planet_' + i +'_Name') +GM_getValue (server+'_Planet_' + i +'_Loc')+"</a></center></td></tr>"
            }else if(nextIsMoon=='Yes'){//有月星球
                str+="<tr><td class='c' style='width:50%'><center><a href='javascript:setTarget("+cordFormatChange(GM_getValue (server+'_Planet_' + i +'_Loc'))+",1); shortInfo()'>"+ GM_getValue (server+'_Planet_' + i +'_Name') +GM_getValue (server+'_Planet_' + i +'_Loc')+"</a></center></td>"
            }else{//无月星球
                str+="<tr><td class='c' style='width:50%'><center><a href='javascript:setTarget("+cordFormatChange(GM_getValue (server+'_Planet_' + i +'_Loc'))+",1); shortInfo()'>"+ GM_getValue (server+'_Planet_' + i +'_Name') +GM_getValue (server+'_Planet_' + i +'_Loc')+"</a></center></td><td class='c'><center>-</center></td></tr>"
            }
        }
        str+='</table>';
        x.innerHTML=str;
        moonCordList.appendChild(x)
        missionTbody.insertBefore(moonCordList,missionTbody.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling)
        /*删除原有坐标*/
        x = xpath("//div[@id='content']/center/center/table/tbody/tr")
        for(i=0;i<x.snapshotLength;i++){
            if(x.snapshotItem(i).className=='moonCordList'){
                var startRow = i;
            }        
        }
        var delCount = Math.round(((GM_getValue (server+'_Planet_Count'))-1)/2)
        for(i=0;i<delCount;i++){
            x.snapshotItem(startRow+i+1).parentNode.removeChild(x.snapshotItem(startRow+i+1))
        }
	}
}

/* 舰队页面3  */
if(/page=flotten3/.test(ogtitle) == true){
	document.title="舰队3/3-"+GM_getValue (server+'Cur_Planet_Name')+document.title;

	/*抵达和返航时间*/
	arrivalOneTr = document.createElement( 'TR' );
	arrivalOneTh1 = document.createElement( 'TH' );
	arrivalOneTh2 = document.createElement( 'TH' );
	arrivalOneTh1.innerHTML="任务抵达时间"
	arrivalOneTh2.innerHTML="-<br/><span class='originalTime'>--</span>"
	arrivalOneTh2.id="arrivalOneTh2"
	
	arrivalTwoTr = document.createElement( 'TR' );
	arrivalTwoTh1 = document.createElement( 'TH' );
	arrivalTwoTh2 = document.createElement( 'TH' );
	arrivalTwoTh1.innerHTML="返航抵达时间"
	arrivalTwoTh2.innerHTML="-<br/><span class='originalTime'>--</span>"
	arrivalTwoTh2.id="arrivalTwoTh2"
	
	arrivalArvTr = document.createElement( 'TR' );
	arrivalArvTh1 = document.createElement( 'TH' );
	arrivalArvTh2 = document.createElement( 'TH' );
	arrivalArvTh1.innerHTML="单程航行时间"
	arrivalArvTh2.innerHTML = GM_getValue (server+'_dur')

	missionTbody=xpathOne("//div[@id='content']//tbody")
	missionTbody.insertBefore(arrivalTwoTr,missionTbody.firstChild.nextSibling.nextSibling.nextSibling.nextSibling)
	missionTbody.insertBefore(arrivalOneTr,missionTbody.firstChild.nextSibling.nextSibling.nextSibling.nextSibling)
	missionTbody.insertBefore(arrivalArvTr,missionTbody.firstChild.nextSibling.nextSibling.nextSibling.nextSibling)
	arrivalOneTr.appendChild(arrivalOneTh1)
	arrivalOneTr.appendChild(arrivalOneTh2)

	arrivalTwoTr.appendChild(arrivalTwoTh1)
	arrivalTwoTr.appendChild(arrivalTwoTh2)

	arrivalArvTr.appendChild(arrivalArvTh1)
	arrivalArvTr.appendChild(arrivalArvTh2)
	
	setTimeout(refreshF3Clock,1000)
	
	/*自動選擇任務 2008-08-31*/
	allOrderInputs = xpath("//input[@name='order']")
	hasSelectedOrder = false
    for(var i=0; i<allOrderInputs.snapshotLength; i++){
        if(allOrderInputs.snapshotItem(i).checked==true){
            hasSelectedOrder = true
        }
    }
    if(hasSelectedOrder == false){
        for(var i=0; i<allOrderInputs.snapshotLength; i++){
            if(allOrderInputs.snapshotItem(i).value=="8"){//回收
                allOrderInputs.snapshotItem(i).checked=true
                hasSelectedOrder = true
            }
        }
    }
    if(hasSelectedOrder == false){
        for(var i=0; i<allOrderInputs.snapshotLength; i++){
            if(allOrderInputs.snapshotItem(i).value=="7"){//殖民
                allOrderInputs.snapshotItem(i).checked=true
                hasSelectedOrder = true
            }
        }
    }
    if(hasSelectedOrder == false){
        for(var i=0; i<allOrderInputs.snapshotLength; i++){
            if(allOrderInputs.snapshotItem(i).value=="15"){//远征
                allOrderInputs.snapshotItem(i).checked=true
                hasSelectedOrder = true
            }
        }
    }
    if(hasSelectedOrder == false){
        for(var i=0; i<allOrderInputs.snapshotLength; i++){
            if(allOrderInputs.snapshotItem(i).value=="9"){//月球破坏
                allOrderInputs.snapshotItem(i).checked=true
                hasSelectedOrder = true
            }
        }
    }
    if(hasSelectedOrder == false){
        for(var i=0; i<allOrderInputs.snapshotLength; i++){
            if(allOrderInputs.snapshotItem(i).value=="6"){//探测
                allOrderInputs.snapshotItem(i).checked=true
                hasSelectedOrder = true
            }
        }
    }
    if(hasSelectedOrder == false){
        for(var i=0; i<allOrderInputs.snapshotLength; i++){
            if(allOrderInputs.snapshotItem(i).value=="1"){//攻击
                allOrderInputs.snapshotItem(i).checked=true
                hasSelectedOrder = true
            }
        }
    }
    if(hasSelectedOrder == false){
        for(var i=0; i<allOrderInputs.snapshotLength; i++){
            if(allOrderInputs.snapshotItem(i).value=="5"){//ACS防御
                allOrderInputs.snapshotItem(i).checked=true
                hasSelectedOrder = true
            }
        }
    }
    if(hasSelectedOrder == false){
        for(var i=0; i<allOrderInputs.snapshotLength; i++){
            if(allOrderInputs.snapshotItem(i).value=="4"){//派遣
                allOrderInputs.snapshotItem(i).checked=true
                hasSelectedOrder = true
            }
        }
    }
    if(hasSelectedOrder == false){
        for(var i=0; i<allOrderInputs.snapshotLength; i++){
            if(allOrderInputs.snapshotItem(i).value=="3"){//运输
                allOrderInputs.snapshotItem(i).checked=true
                hasSelectedOrder = true
            }
        }
    }
}

/* 星系页面*/
if(/page=galaxy/.test(ogtitle) == true){
	document.title="银河-"+GM_getValue (server+'Cur_Planet_Name')+document.title;
	/*创建星球选择列表*/
	galSelectTr = document.createElement('td')
	galSelect = document.createElement('tr');
	galSelectHold = document.createElement('tr');
	Planet_Count = GM_getValue (server+'_Planet_Count');
	str = "<select onchange='haha(this)' size='1'><option>前往星球视察指导工作</option>";//第一列如果要反映当前选择的星球比较麻烦...
	for(var i=0;i<Planet_Count;i++){//切换到其他星球
		Planet_Pos = (GM_getValue(server+'_Planet_' + i +'_Loc')).match(/\d+(?=])/)[0];//高亮参数
		str = str + "<option value=/game/index.php?page=galaxy&session="+sid+"&cp="+GM_getValue(server+'_Planet_' + i +'_ID')+'&p3='+ Planet_Pos +'>'+GM_getValue(server+'_Planet_' + i +'_Name')+' '+ GM_getValue(server+'_Planet_' + i +'_Loc')+'</option>';
	}
	str = str + "</select>"
	galSelect.innerHTML = str;
	var galNow=xpathOne("//input[@name='galaxy']").value
	var sysNow=xpathOne("//input[@name='system']").value
	str1 = "<select onchange=haha(this) size='1'><option>指挥来自该星球的舰队</option>";
	for(var i=0;i<Planet_Count;i++){//切换到其他星球但仍然看当前星系
		str1 = str1 + "<option value=/game/index.php?page=galaxy&session="+sid+"&p1="+galNow+"&p2="+sysNow+"&cp="+GM_getValue(server+'_Planet_' + i +'_ID')+">"+GM_getValue(server+'_Planet_' + i +'_Name')+' '+ GM_getValue(server+'_Planet_' + i +'_Loc')+'</option>';
	}
	str1 = str1 + "</select>"
	galSelectHold.innerHTML = str1;
	galSelectTr.appendChild(galSelect);
	galSelectTr.appendChild(galSelectHold);
	showGalButton = xpathOne("//input[@type='submit']");
	cordInput =xpathOne("//table[@id='t1']/tbody/tr[position()=1]")
	cordInput.appendChild(galSelectTr)
	//showGalButton.parentNode.parentNode.parentNode.firstChild.insertBefore(galSelectTr,showGalButton.parentNode.parentNode.parentNode.firstChild.lastChild.nextSibling);
		
	var rows = document.getElementById("content").getElementsByTagName("table")[3].getElementsByTagName("tr");
	curPlanetName = GM_getValue (server+'Cur_Planet_Name');
	curPlanetLoc = GM_getValue (server+'Cur_Planet_Loc');
	curPlanetLocArr = curPlanetLoc.match(/\d+/g);

	/* 点序号加坐标 */
	var thisgal = document.getElementsByName('galaxy')[0].value;
	var thissis = document.getElementsByName('system')[0].value;
	tagi = document.getElementById('content').getElementsByTagName('a');
	for (i in tagi){
		if (tagi[i].getAttribute && tagi[i].getAttribute('tabindex')){
			tagi[i].addEventListener('click',addCoords,true);
		}
	}

	/* 点空星球序号直接殖民 */
	if(colLink == "1"){
		for (var i = 0; i < rows.length; i++) {
			if (rows[i].getElementsByTagName("th").length > 0) {
				var link = rows[i].getElementsByTagName("th")[0].getElementsByTagName("a")[0];
				if (link) {
					if (link.getAttribute("tabIndex")==null || link.getAttribute("tabIndex")==0) {
						empLink = rows[i].getElementsByTagName("th")[0];
						empLink.innerHTML = "<a href=index.php?page=flottenversand&session=" + sid + "&thisgalaxy="+curPlanetLocArr[0]+"&thissystem="+curPlanetLocArr[1]+"&thisplanet="+curPlanetLocArr[2]+"&speedfactor=1&ship208=1&speed=10" + "&galaxy=" + thisgal + "&system=" + thissis + "&planet=" + (i-1) + "&planettype=1&order=7"+">殖</a>"//+(i-1)+"</a>"
					}
				}
			}
		}
	}
	
	/* 点序号16直接远征 */
	if(expLink == "1"){
		var link = rows[17].getElementsByTagName("th")[0];
			link.innerHTML="<a href=index.php?page=flottenversand&session=" + sid + "&thisgalaxy="+curPlanetLocArr[0]+"&thissystem="+curPlanetLocArr[1]+"&thisplanet="+curPlanetLocArr[2]+"&speedfactor=1&ship202=1&ship210=1&speed=10" + "&galaxy=" + thisgal + "&system=" + thissis + "&planet=16" + "&planettype=1&order=15&expeditiontime=1"+">征</a>"
		/*远征提交参数
		<input type="hidden" value="1" name="thisgalaxy"/>
		<input type="hidden" value="1" name="thissystem"/>
		<input type="hidden" value="1" name="thisplanet"/>
		<input type="hidden" value="1" name="thisplanettype"/>
		<input type="hidden" value="1" name="speedfactor"/>
		<input type="hidden" value="490922" name="thisresource1"/>
		<input type="hidden" value="246231" name="thisresource2"/>
		<input type="hidden" value="318254" name="thisresource3"/>
		<input type="hidden" value="1" name="galaxy"/>
		<input type="hidden" value="1" name="system"/>
		<input type="hidden" value="16" name="planet"/>
		<input type="hidden" value="1" name="planettype"/>
		<input type="hidden" value="1" name="ship204"/>
		<input type="hidden" value="20" name="consumption204"/>
		<input type="hidden" value="25000" name="speed204"/>
		<input type="hidden" value="50" name="capacity204"/>
		<input type="hidden" value="1" name="ship210"/>
		<input type="hidden" value="1" name="consumption210"/>
		<input type="hidden" value="200000000" name="speed210"/>
		<input type="hidden" value="5" name="capacity210"/>
		<input type="hidden" value="10" name="speed"/>
		order
		resource1
		resource2
		resource3
		expeditiontime
		*/
	}
	
	/* 月球探测 */
	if(moonspy == "1"){
		var moonItems = xpathAll("//tr/th[4][child::a]");
		if(moonItems.snapshotLength>0){
			var L_spy= new Array(); //24.
				L_spy[0] = "Espionage"; //ogame.org
				L_spy[15] = "間諜"; //ogame.tw
				L_spy[17] = "探测"; //ogame.com.cn
			for(var i=0; i < moonItems.snapshotLength; i++){
				var thispla = moonItems.snapshotItem(i).parentNode.childNodes[1].childNodes[1].innerHTML;
				moonItems.snapshotItem(i).innerHTML = 
				  moonItems.snapshotItem(i).innerHTML.replace(
					L_spy[langloca], 
					"<a style=\\'cursor:pointer\\' onclick=\\'doit(6, "+thisgal+", "+thissis+", "+thispla+", 3, "+moonSpyCount+")\\'>" + L_spy[langloca] + "</a>");
			}
		}
	}
	
	/* 垃圾回收 */
	if(harvest == "1"){
		var lajiItems = xpathAll("//tr/th[5][child::a]");
		if(lajiItems.snapshotLength>0){
			for(var i=0; i < lajiItems.snapshotLength; i++){
				thisLaji = lajiItems.snapshotItem(i);
				thisLajiContent = thisLaji.innerHTML;
				//alert(thisLajiContent)
				lajiM = /(\d+\.)*\d+(?=<\/th><\/tr><tr><th>)/.exec(thisLajiContent);
				if(!lajiM){
					lajiM=0;
				}
				//alert(lajiM)
				lajiC = /(\d+\.)*\d+(?=<\/th><\/tr><tr><td class=c colspan=2>)/.exec(thisLajiContent);
				if(!lajiC){
					lajiC=0;
				}
				//alert(lajiC)
				lajiM = mystr2num(lajiM);
				lajiC = mystr2num(lajiC);
				if(lajiM==0){
					lajiMStr=""
				}else{
					lajiMStr="铁:"+addDots(lajiM)+"<br>";
				}
				if(lajiC==0){
					lajiCStr=""
				}else{
					lajiCStr="钻:"+addDots(lajiC);
				}
				thispla = thisLaji.parentNode.childNodes[1].childNodes[1].innerHTML;
				if(lajiM+lajiC>=bigLaji){
					lajiStyle = "bigLaji";
				}else{
					lajiStyle = "laji"
				}
				thisLaji.innerHTML = "<a style=\'cursor:pointer\' class=\'"+lajiStyle+"\' onmouseover=\'return overlib(\"<table width=auto class=mypop>需回收舰: <b>"+ Math.ceil((lajiM+lajiC)/20000)+"</b> 艘</table>\",MOUSEOFF, DELAY, 50, CENTER, OFFSETX, -40, OFFSETY, -40 );\' onmouseout=\'return nd();\' onclick=\'doit(8, "+thisgal+", "+thissis+", "+thispla+", 2, "+Math.ceil((lajiM+lajiC)/20000)+")\'>" + lajiMStr + lajiCStr + "</a>";
			}
		}
	}
	
	/*高亮想查看星球*/
	checkGalUrl = location.search.split('&')
	for(var i=0; i<checkGalUrl.length; i++){
		checkGal=checkGalUrl[i].split('=');
		if (checkGal[0]=='galaxy'){
			checkGalGal = checkGal[1]
		}else if(checkGal[0]=='system'){
			checkGalSys = checkGal[1]
		}else if((checkGal[0]=='planet')||(checkGal[0]=='position')||(checkGal[0]=='p3')){
			checkGalPla = checkGal[1]
			checkGalPla=parseInt(checkGalPla)+2;
			highlightTr = xpath("//table[@width='569']/tbody/tr[position()="+checkGalPla+"]").snapshotItem(0);
			highlightTr.className = 'highlightGal';
		}
	}
	/*直接显示玩家排名，联盟排名和人数*/
	for (var i = 0; i < rows.length; i++) {
		if (rows[i].getElementsByTagName("th").length > 0) {
			var userTh = rows[i].getElementsByTagName("th")[5];
			if (userTh && userTh.getElementsByTagName("a").length > 0) {
			userRank = userTh.innerHTML.match(/\d+(?=<\/td>)/)[0]
			userRankLinkOrg = userTh.innerHTML.match(/index\.php\?page=statistics.*start=\d+/)[0]
			userTh.innerHTML = userTh.innerHTML + "<span class=rankNumber>[<a href="+userRankLinkOrg +"&amp;rankToCheckUser=" + userRank + ">" + userRank + "</a>]</span>"
			mainBall = userTh.appendChild(document.createElement("a"))
			mainBall.innerHTML = "[?]"
			mainBall.className = "rankNumber"
			mainBall.style['cursor'] = 'pointer'
			mainBall.addEventListener('click',getMainBall,false)
			}
		}
		if (rows[i].getElementsByTagName("th").length > 0) {
			var allyTh = rows[i].getElementsByTagName("th")[6];
			if (allyTh && allyTh.getElementsByTagName("a").length > 0) {
			allyRankCount = allyTh.innerHTML.match(/\d+(?=\s有)/)
			if(!allyRankCount){
				allyRankCount	 = allyTh.innerHTML.match(/\d+(?=\sconsisting)/)
			}
			allyMemberCount = allyTh.innerHTML.match(/\d+(?=\s名)/)
			if(!allyMemberCount){
				allyMemberCount	 = allyTh.innerHTML.match(/\d+(?=\smember)/)
			}
			if((allyRankCount)&&(allyMemberCount)){
				allyRank = allyRankCount[0]
				allyMember = allyMemberCount[0]
				allyRankLinkOrg = allyTh.innerHTML.match(/index\.php\?page=statistics.*?who=ally/)[0]
				allyTh.innerHTML = allyTh.innerHTML + "<span class=rankNumber>[<a href="+allyRankLinkOrg +"&amp;rankToCheckAlly=" + allyRank + ">#" + allyRank + "/"+allyMember+"</a>]</span>"
				}
			}
		}
	}

    /*显示当前星球*/
    if(getHVal("cp")){
        thisID=getHVal("cp")
        pC=GM_getValue (server+'_Planet_Count')*1
        for (i=0;i<pC;i++){
            storedID=GM_getValue (server+'_Planet_' + i +'_ID')
            if (thisID==storedID){
                GM_setValue (server+'Cur_Planet_Name', GM_getValue (server+'_Planet_' + i +'_Name'));
                GM_setValue (server+'Cur_Planet_Loc', GM_getValue (server+'_Planet_' + i +'_Loc'));
            }
        }
    }
    rowOne = rows[0]
    tempStr=rowOne.innerHTML
    curPlanetName= GM_getValue (server+'Cur_Planet_Name')
    curPlanetLoc= GM_getValue (server+'Cur_Planet_Loc')
    tempStr=tempStr.replace("</td>"," <br/>"+curPlanetName+" "+curPlanetLoc+"舰队集结中</td>");
	rowOne.innerHTML=tempStr
}

/*统计页面*/
if(/page=statistics/.test(ogtitle) == true){
	document.title="排行榜-"+GM_getValue (server+'Cur_Planet_Name')+document.title;
	var rows = document.getElementById("content").getElementsByTagName("table")[1].getElementsByTagName("tr");
	for (var i = 0; i < rows.length; i++) {//直接显示排名变化
		if (rows[i].getElementsByTagName("th").length > 0) {
			var rankTh = rows[i].getElementsByTagName("th")[0];
			if (rankTh.getElementsByTagName("a").length > 0) {
			rankChange = rankTh.innerHTML.match(/[+]?[-]?[\d]*?[*]?(?=<\/font>)/)[0]
			rankTh.removeChild(rankTh.getElementsByTagName("a")[0])
			if(parseInt(rankChange)>0){
				rankSpan = "rankSpanPlus";
			}else if(parseInt(rankChange)<0){
				rankSpan = "rankSpanMinus";
			}else{
				rankSpan = "rankSpanHold";
			}
			if(rankChange=="*"){
				rankChange=""
			}else{
				rankChange="["+rankChange+"]"
			}
			rankTh.innerHTML = "<span class=" + rankSpan + ">" + rankTh.innerHTML.match(/\d+/)[0] + rankChange +"</span>"}
		}
	}	
	var loc = "" + window.location
	var checkRankUser = loc.match(/rankToCheckUser=\d+/)
	var checkRankAlly= loc.match(/rankToCheckAlly=\d+/)
	if(xpathOne("//select[@name='start']").selectedIndex == 0){//选择自身位置
		showingRank = rows[1].getElementsByTagName("th")[0].innerHTML.match(/\d+/)[0]
	}else{
		showingRank=xpathOne("//select[@name='start']/option[@selected]").innerHTML.match(/\d+/)[0]
	}
	if (checkRankUser){
		checkRankUser=checkRankUser[0].match(/\d+/)[0];
		rows[checkRankUser-showingRank+1].className = 'highlightRank';//高亮指定玩家
		//window.scrollTo(0,rows[checkRankUser-showingRank+1].offsetTop)//滚动页面
		rows[checkRankUser-showingRank+1].scrollIntoView()//滚动页面
	}
	if (checkRankAlly){
		checkRankAlly=checkRankAlly[0].match(/\d+/)[0];
		rows[checkRankAlly-showingRank+1].className = 'highlightRank';
		//window.scrollTo(0,rows[checkRankAlly-showingRank+1].offsetTop)
		rows[checkRankAlly-showingRank+1].scrollIntoView();
	}
}

/* 资源页面 */
if (/page=resources/.test(ogtitle) == true) {
	document.title="资源-"+GM_getValue (server+'Cur_Planet_Name')+document.title;
	//Misc functions Begin!
	function locate(xpath, xpres, where){
		if (where == null) 
			return document.evaluate(xpath, document, null, xpres, null);
		return document.evaluate(xpath, where, null, xpres, null);
	}
	
	function locateFirst(xpath, where){
		return locate(xpath, XPathResult.FIRST_ORDERED_NODE_TYPE, where).singleNodeValue;
	}
	
	function locateSnapshot(xpath, where){
		return locate(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, where);
	}
/*	
	function fill(string){
		while (string.length < 6) 
			string += '0';
		return parseInt(string, 10);
	}
*/	
	/*破表时间计算*/
	function tiempo2str(max, cur, prod){
		if (prod == 0){
			return "无生产";
		}
		if (prod < 0){
			var result = "<font color=red title='" + c_emptyingStore + "'>-";
			var negative = true;
			var totalSecs = Math.floor(-(max - cur) / prod * 3600);
		}else{
			if (cur > max){
				return "已经爆了^^";
			}
		}
		var result = "";
		var totalSecs = Math.floor((max - cur) / prod * 3600);		
		var secs = Math.floor(totalSecs % 60);
		var mins = Math.floor((totalSecs / 60) % 60);
		var hours = Math.floor((totalSecs / 3600) % 24);
		var days = Math.floor(totalSecs / (3600 * 24));
		if (days > 0){
			result += days + '天 ';
		}
		if (hours > 0 || days > 0){
			result += hours + '小时 ';
		}
		if (mins > 0 || hours > 0 || days > 0){ 
			result += mins + '分 ';
		}
		if (secs > 0 || mins > 0 || hours > 0 || days > 0){
			result += secs + '秒';
		}
		if (negative){
			result += "</font>";
		}
		return result;
	}
	function puntuar(numero, separador){
		if (!separador) 
			var separador = '.';
		var strNum = String(parseInt(numero, 10));
		var strNum2 = '';
		var i = 0;
		for (i = strNum.length - 4; i >= 0; i -= 3) {
			strNum2 = (strNum[i] == '-' ? '' : separador) + strNum.substring(i + 1, i + 4) + strNum2;
		}
		strNum2 = strNum.substr(0, i + 4) + strNum2;
		return strNum2;
	}
	// save planet resources
	var resources = locateSnapshot("//table[@id='resources']//tr/td/font");
	var metal = parseInt(resources.snapshotItem(0).innerHTML.replace(/\./g, ''), 10);
	var cristal = parseInt(resources.snapshotItem(1).innerHTML.replace(/\./g, ''), 10);
	var deuterio = parseInt(resources.snapshotItem(2).innerHTML.replace(/\./g, ''), 10);
	var energia = parseInt(resources.snapshotItem(4).innerHTML.replace(/\./g, ''), 10);
	var energiaTotal = parseInt(resources.snapshotItem(4).nextSibling.nodeValue.replace(/[\.\/]/g, ''), 10);
	
	var T_Recursos = locateSnapshot("//div[@id='content']//font[@color]");
	
	var PMetal = T_Recursos.snapshotItem(T_Recursos.snapshotLength - 12).innerHTML.replace(/\./g, '');
	var PCristal = T_Recursos.snapshotItem(T_Recursos.snapshotLength - 11).innerHTML.replace(/\./g, '');
	var PDeut = T_Recursos.snapshotItem(T_Recursos.snapshotLength - 10).innerHTML.replace(/\./g, '');
	
	var AlmM = T_Recursos.snapshotItem(T_Recursos.snapshotLength - 16).innerHTML.replace(/k/, '000').replace(/\./g, '');
	var AlmC = T_Recursos.snapshotItem(T_Recursos.snapshotLength - 15).innerHTML.replace(/k/, '000').replace(/\./g, '');
	var AlmD = T_Recursos.snapshotItem(T_Recursos.snapshotLength - 14).innerHTML.replace(/k/, '000').replace(/\./g, '');
	
	//look for satellites to indicate the energy provided by each
	try {
		var satEnergy = document.getElementsByName("last212")[0].parentNode.parentNode.getElementsByTagName('th');
		var satCount = satEnergy[0].innerHTML.match(/\d+/);
		var satProdEnergy = satEnergy[satEnergy.length - 2].lastChild.lastChild.innerHTML.replace(/[\s\.]/g, '');
		var satFactor = 10 - satEnergy[satEnergy.length - 1].childNodes[1].selectedIndex;
		var individualEnergy = satEnergy[satEnergy.length - 2].lastChild.appendChild(document.createElement('font'));
		individualEnergy.color = '#00ffaa';
		individualEnergy.innerHTML = ' (' + Math.round((satProdEnergy * 10 / satFactor) / satCount) + ')';
		individualEnergy.title = 'Energía producida por cada satélite';
		individualEnergy.style['cursor'] = 'pointer';
	} 
	catch (e) {
	}
	
	var XMetal = new Array(4);
	var XCristal = new Array(4);
	var XDeut = new Array(4);
	
	//日产量
	XMetal[0] = PMetal * 24;
	XCristal[0] = PCristal * 24;
	XDeut[0] = PDeut * 24;
	/*保存日产参数 2008-06-29*/
	GM_setValue (server+'_'+curPlanetName+'_dayM', XMetal[0]);
	GM_setValue (server+'_'+curPlanetName+'_dayC', XCristal[0]);
	GM_setValue (server+'_'+curPlanetName+'_dayH', XDeut[0]);

	//周产量
	XMetal[1] = PMetal * 168;
	XCristal[1] = PCristal * 168;
	XDeut[1] = PDeut * 168;
	//月产量
	XMetal[2] = PMetal * 720;
	XCristal[2] = PCristal * 720;
	XDeut[2] = PDeut * 720;
	//年产量
	XMetal[3] = PMetal * 24 * 365;
	XCristal[3] = PCristal * 24 * 365;
	XDeut[3] = PDeut * 24 * 365;
	
	// Search Form Resources
	var ResForm = locateFirst('//table[@width=550]');
	
	// 	Search for factors of production
	var Factor = 0;
	try {
	    switch ( langloca ) {
	    	case "17":
	    		Factor = parseFloat(document.body.innerHTML.match(/生产基数(.)*\：(.)*[0-9.]/gi)[0].split('：')[1]) * 100;
	    		break;
	    	case "15":
                Factor = parseFloat(document.body.innerHTML.match(/生產要素(.)*\:(.)*[0-9.]/gi)[0].split(':')[1]) * 100;
            break;
	    	case "0":
                Factor = parseFloat(document.body.innerHTML.match(/Production Factor(.)*\:(.)*[0-9.]/gi)[0].split(':')[1]) * 100;
            break;
            default:
	    }
    } catch (e) {
	    logToConsole(e)
	}
	var FactorPorc = parseInt(parseFloat(Factor) * 2.5, 10);
	
	// 添加表的生产要素
	if (ResForm) {
		/*资源等级图形化*/
		//获得建造等级
		try{mLv = xpathOne("//form/table/tbody/tr[position()=4]/th[position()=1]").innerHTML.match(/\d+/)[0]*1}catch(e){mLv=1}
		try{cLv = xpathOne("//form/table/tbody/tr[position()=5]/th[position()=1]").innerHTML.match(/\d+/)[0]*1}catch(e){cLv=1}
		try{hLv = xpathOne("//form/table/tbody/tr[position()=6]/th[position()=1]").innerHTML.match(/\d+/)[0]*1}catch(e){hLv=1}

		// 进程表
		var ProdFact = document.createElement('div');
		ProdFact.innerHTML = '<table width="550"><tr>' +
		'<td class="c">资源建筑生产效率</td>' +
		'<th width="100"><div style="border: 1px solid #9999FF; width: 400px;"><div id="prodBar" class="' +
		(Factor < 100 ? 'bar_full' : 'bar_notfull') +
		'"; style="width: 0px;">'+Factor+'%</div></div></th>' +
		'</tr></table><br />';
		
		var EAlmM = (metal / AlmM) * 100;
		var EAlmMPorc = parseInt((metal / AlmM) * 250, 10);
		var EAlmC = (cristal / AlmC) * 100;
		var EAlmCPorc = parseInt((cristal / AlmC) * 250, 10);
		var EAlmD = (deuterio / AlmD) * 100;
		var EAlmDPorc = parseInt((deuterio / AlmD) * 250, 10);
		
		EAlmM = Math.round(EAlmM);
		EAlmC = Math.round(EAlmC);
		EAlmD = Math.round(EAlmD);
		
		unsafeWindow.puntuar = puntuar;
		
		var CuentaRec = document.createElement('div');
		var vChartFactor=2
		CuentaRec.innerHTML = '<br /><table width="550">' +
		'<tr><td class="c" colspan="4">资源产量统计</td></tr>' +
		'<tr><td width=22% class="c" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>' +
		'<td width=26% class="c" align=center>铁</td>' +
		'<td width=26% class="c" align=center>钻</td>' +
		'<td width=26% class="c" align=center>油</td>' +
		'</tr><tr>' +
		'<td class="c" align=center>每分</td><th><font color="#00ff00">' + puntuar(Math.round(XMetal[0]/60/24)) + '</font></th><th><font color="#00ff00">' + puntuar(Math.round(XCristal[0]/60/24)) + '</font></th>' + '<th><font color="#00ff00">' + puntuar(Math.round(XDeut[0]/60/24)) + '</font></th></tr><tr>' +
		'<td class="c" align=center>每天</td><th><font color="#00ff00">' + puntuar(XMetal[0]) + '</font></th><th><font color="#00ff00">' + puntuar(XCristal[0]) + '</font></th>' + '<th><font color="#00ff00">' + puntuar(XDeut[0]) + '</font></th></tr><tr>' +
		'<td class="c" align=center>每周</td><th><font color="#00ff00">' + puntuar(XMetal[1]) + '</font></th><th><font color="#00ff00">' + puntuar(XCristal[1]) + '</font></th>' + '<th><font color="#00ff00">' + puntuar(XDeut[1]) + '</font></th></tr><tr>' +
		'<td class="c" align=center>每月</td><th><font color="#00ff00">' + puntuar(XMetal[2]) + '</font></th><th><font color="#00ff00">' + puntuar(XCristal[2]) + '</font></th>' + '<th><font color="#00ff00">' + puntuar(XDeut[2]) + '</font></th></tr><tr>' + 
		'<td class="c" align=center>每年</td><th><font color="#00ff00">' + puntuar(XMetal[3]) + '</font></th><th><font color="#00ff00">' + puntuar(XCristal[3]) + '</font></th>' + '<th><font color="#00ff00">' + puntuar(XDeut[3]) + '</font></th></tr><tr>' +
		'<td class="c" colspan="4">手动计算</td>' +
		'</tr><tr>' +
		'<td class="c" title="請輸入時間╮(－_－)╭" align=center onkeyup="' +
		'var dias = 0;' +
		'if (this.childNodes[0].value != \'\') ' +
		'dias = parseInt(this.childNodes[0].value,10);' +
		'var horas = 0;' +
		'if (this.childNodes[2].value != \'\') ' +
		'horas = parseInt(this.childNodes[2].value,10);' +
		'if (horas>=24) {' +
		'this.childNodes[2].value=horas%24;' +
		'this.childNodes[0].value=Math.floor(dias+horas/24); } ' +
		
		'this.parentNode.childNodes[1].firstChild.innerHTML=puntuar((dias*24+horas)*' +
		PMetal +
		');this.parentNode.childNodes[2].firstChild.innerHTML=puntuar((dias*24+horas)*' +
		PCristal +
		');this.parentNode.childNodes[3].firstChild.innerHTML=puntuar((dias*24+horas)*' +
		PDeut +
		');"><input value="0" size="1%" type=text />日<input value="0" size="1%" type=text />时</td>' +
		'<th><font color="#00ff00">0</font></th>' +
		'<th><font color="#00ff00">0</font></th>' +
		'<th><font color="#00ff00">0</font></th>' +
		'</tr><tr>' +
		'<td class="c" colspan="4">储藏罐信息</td>' +
		'</tr><tr>' +
		'<td class="c" align=center title="储藏罐已使用容量">概况'+
		'</td><th>'+
		'<img src="http://chart.apis.google.com/chart?cht=p3&chd=t:'+EAlmM+','+(100-EAlmM)+'&chs=185x80&chl=Used|Free&chco=ff0000&chf=bg,s,efefef00">'+
		'<div title="' + EAlmM + '%" style="cursor: pointer; border: 1px solid #9999FF;"><div id="AlmMBar" class="' + (EAlmM > 100 ? 'bar_full' : 'bar_notfull') + '"; style="width: 0%;">' + EAlmM + '%</div></div></th>' +
		'<th>'+
		'<img src="http://chart.apis.google.com/chart?cht=p3&chd=t:'+EAlmC+','+(100-EAlmC)+'&chs=200x80&chl=Used|Free&chco=00ff00&chf=bg,s,efefef00">'+
		'<div title="' + EAlmC + '%" style="cursor: pointer; border: 1px solid #9999FF;"><div id="AlmCBar" class="' + (EAlmC > 100 ? 'bar_full' : 'bar_notfull') + '"; style="width: 0%;">' + EAlmC + '%</div></div></th>' +
		'<th>'+
		'<img src="http://chart.apis.google.com/chart?cht=p3&chd=t:'+EAlmD+','+(100-EAlmD)+'&chs=200x80&chl=Used|Free&chco=0000ff&chf=bg,s,efefef00">'+
		'<div title="' + EAlmD + '%" style="cursor: pointer; border: 1px solid #9999FF;"><div id="AlmDBar" class="' + (EAlmD > 100 ? 'bar_full' : 'bar_notfull') + '"; style="width: 0%;">' + EAlmD + '%</div></div></th>' +
		'</tr><tr>' +
		'<td class="c" align=center>支撑</td>' +
		'<th>' +
		tiempo2str(AlmM, metal, PMetal) +
		'</th>' +
		'<th>' +
		tiempo2str(AlmC, cristal, PCristal) +
		'</th>' +
		'<th>' +
		tiempo2str(AlmD, deuterio, PDeut) +
		'</th>' +
		'</tr><tr><td class="c" colspan = 4>矿业发展水平<center><img src="http://chart.apis.google.com/chart?cht=v&chd=t:'+mLv*vChartFactor+','+cLv*vChartFactor+','+hLv*vChartFactor+','+'2,2,2,1&chs=550x'+(40+(mLv+hLv+cLv)*4)+'&chdl=Met|Cry|Deu&chco=ff0000,00ff00,0000ff&chf=bg,s,efefef00"></center></td></tr></table>';
		
		ResForm.parentNode.insertBefore(CuentaRec, ResForm.nextSibling);
		ResForm.parentNode.insertBefore(ProdFact, ResForm);
		document.getElementById('ressourcen').previousSibling.nodeValue = '';
		
		function colorBar(porcentaje){
			if(porcentaje >= 100){
				return "rgb(255, 0, 0) !important;";
				alert("ok");
			} else {
				var fstColor = Math.floor(2.55*porcentaje);
				var sndColor = Math.floor(2.55*(100-porcentaje));
				return "rgb("+fstColor+", "+sndColor+", 0) !important;";
			}
		}
		function fillBar(ids, percents){
			idList = ids.split(':');
			perList = percents.split(':');
			var continuar = false;
			for (var i=0; i<idList.length; i++) {
				var bar = document.getElementById(idList[i]);
				var width = parseInt(bar.style['width'].split('%')[0], 10);
				if (width<perList[i]){
					bar.style['width'] = String(width+Math.max(perList[i]/50,1)) + '%';
					width=100-width;
						bar.style['background'] = colorBar(width);
						continuar = true;
				}
			}
			if (continuar) setTimeout('fillBar("'+ids+'", "'+percents+'")', 40);
		}
		unsafeWindow.fillBar = fillBar;
		setTimeout('fillBar("'+["prodBar","AlmMBar","AlmCBar", "AlmDBar"].join(":")+'", "'+[Math.min(Factor, 100),Math.min(EAlmM, 100),Math.min(EAlmC, 100),Math.min(EAlmD, 100)].join(":")+'")', 100);
	}

	/*所有资源同时设为100%或0%, QS来之前关门可以快一点...*/
	blackScr=document.createElement('script');
	blackScr.type = 'text/javascript';
	blackScr.innerHTML = 'res1 = document.getElementsByName("last1")[0];'+
	'res2 = document.getElementsByName("last2")[0];'+
	'try{res3 = document.getElementsByName("last3")[0];}catch(e){}'+
	'try{res4 = document.getElementsByName("last4")[0];}catch(e){}'+
	'try{res12 = document.getElementsByName("last12")[0];}catch(e){}'+
	'try{res212 = document.getElementsByName("last212")[0];}catch(e){}'+
	'function all0(){'+
	'res1.selectedIndex = 10;'+
	'res2.selectedIndex = 10;'+
	'if(res3){res3.selectedIndex = 10;}'+
	'if(res4){res4.selectedIndex = 10;}'+
	'if(res12){res12.selectedIndex = 10;}'+
	'if(res212){res212.selectedIndex = 10;}'+
	'}'+
	'function all100(){'+
	'res1.selectedIndex = 0;'+
	'res2.selectedIndex = 0;'+
	'if(res3){res3.selectedIndex = 0;}'+
	'if(res4){res4.selectedIndex = 0;}'+
	'if(res12){res12.selectedIndex = 0;}'+
	'if(res212){res212.selectedIndex = 0;}'+
	'}'
	insertTr = xpathOne("//th[@height='4']/parent::tr");
	insertTr.parentNode.insertBefore(blackScr,insertTr)
	insertTr.innerHTML = "<th height=4 colspan=6><th rowspan=4><input type=button onclick=all0(); value=\'偃旗息鼓\'></a><br><input type=button onclick=all100(); value=\'开足马力\'></th>"
	
	/*计算可用时间需要的*/
	var resfact = xpath("//th[@height='4']//parent::tr/following-sibling::tr/td");
	if(resfact.snapshotLength > 0){
		var metfact = />([0-9\.]+)</.exec(resfact.snapshotItem(0).innerHTML);
		if(metfact != null){var metfact = RegExp.$1; metfact = mystr2num(metfact);} else {metfact = 0;}
		var cryfact = />([0-9\.]+)</.exec(resfact.snapshotItem(1).innerHTML);
		if(cryfact != null){var cryfact = RegExp.$1; cryfact = mystr2num(cryfact);} else {cryfact = 0;}
		var deufact = />([0-9\.]+)</.exec(resfact.snapshotItem(2).innerHTML);
		if(deufact != null){var deufact = RegExp.$1; deufact = mystr2num(deufact);} else {deufact = 0;}
	
		GM_setValue((ogserver+planetcoords+"met"), metfact);
		GM_setValue((ogserver+planetcoords+"cry"), cryfact);
		GM_setValue((ogserver+planetcoords+"deu"), deufact);
	}
	
}


/* 消息页面 */
if(/page=messages/.test(ogtitle) == true){
	document.title="消息-"+GM_getValue (server+'Cur_Planet_Name')+document.title;
	reports=new Array();
	spyCount = 0;
	if(advmess == "1"){
		del("//table[@width=519]");//删除原来的消息
	
		var F_head = document.getElementsByTagName('head')[0];
		var F_script = document.createElement('script');
			F_script.type = 'text/javascript';
			F_script.innerHTML = 'function collexp(id){ '+
								'var dispopt = document.getElementById(id); '+
								'if(dispopt.style.display == "none"){dispopt.style.display = "inline";} else {dispopt.style.display = "none";}'+
								'}';
			F_head.appendChild(F_script);		
		/*删除一条导致出错的莫名的空行*/
		strangeLineToRemove = xpath("//table[@width='519']/tbody/tr/th[@style='padding: 0px 105px;']/parent::tr").snapshotItem(0);
		strangeLineToRemove.parentNode.removeChild(strangeLineToRemove);
		/*标题*/
		var mestitle = xpath("//td[@class='c']").snapshotItem(0).innerHTML;
		var mescaptions = xpath("//th/parent::tr/preceding-sibling::tr/td[@class='c']/parent::tr/following-sibling::tr[position()=1]/th");
		var mesact = mescaptions.snapshotItem(0).innerHTML;
		var mesdat = mescaptions.snapshotItem(1).innerHTML;
		var mesfro = mescaptions.snapshotItem(2).innerHTML;
		var messub = mescaptions.snapshotItem(3).innerHTML;
		/*消息各部分，选择框，时间，来自，主题，正文*/
		var allchk = xpath("//input[@type='checkbox' and contains(@name,'delmes')]/parent::th");
		var alldat = xpath("//input[@type='checkbox' and contains(@name,'delmes')]/parent::th/following-sibling::th[position()=1]");
		var allfro = xpath("//input[@type='checkbox' and contains(@name,'delmes')]/parent::th/following-sibling::th[position()=2]");
		var allsub = xpath("//input[@type='checkbox' and contains(@name,'delmes')]/parent::th/following-sibling::th[position()=3]");
		var alltxt = xpath("//input[@type='checkbox' and contains(@name,'delmes')]/parent::th/parent::tr/following-sibling::tr[position()=1]/*[2]");
		/*按分类整合消息*/
		var batholder = "";
		var spyholder = "";
		var userholder = "";
		var allyholder = "";
		var othersholder = "";
		
		var incomingSpyholder = "";
		var fleetBackholder = "";
		var cylholder = ""
		var depholder = ""
		var colholder = ""
		var expholder = ""

		for(var i=0;i<allchk.snapshotLength;i++){
           datIH = alldat.snapshotItem(i).innerHTML//消息时间
           
		   alldat.snapshotItem(i).innerHTML="<span class=messTimeBody title=\'"+datIH+"\'>"+humanTimeElapse(datIH)+"</span>"
 
			
            //定义消息识别文字
            var T_adoMsgEsp= new Array();
                T_adoMsgEsp[0] = "Espionage action"; //ogame.org
                T_adoMsgEsp[15] = "空间探测"; //ogame.tw
                T_adoMsgEsp[17] = "空间探测"; //ogame.com.cn
            var T_adoMsgEspReg = new RegExp(T_adoMsgEsp[langloca]);
            
            var T_adoMsgFbk= new Array();
                T_adoMsgFbk[0] = "Return of a fleet"; //ogame.org
                T_adoMsgFbk[15] = "艦隊返回"; //ogame.tw
                T_adoMsgFbk[17] = "舰队返回"; //ogame.com.cn
            var T_adoMsgFbkReg = new RegExp(T_adoMsgFbk[langloca]);

            var T_adoMsgFdp= new Array();
                T_adoMsgFdp[0] = "Fleet deployment"; //ogame.org
                T_adoMsgFdp[15] = "艦隊派遣"; //ogame.tw
                T_adoMsgFdp[17] = "舰队派遣"; //ogame.com.cn
            var T_adoMsgFdpReg = new RegExp(T_adoMsgFdp[langloca]);
            
            var T_adoMsgCol= new Array();
                T_adoMsgCol[0] = "Settlement Report"; //ogame.org
                T_adoMsgCol[15] = "殖民报告"; //ogame.tw
                T_adoMsgCol[17] = "殖民报告"; //ogame.com.cn
            var T_adoMsgColReg = new RegExp(T_adoMsgCol[langloca]);
            
            var T_adoMsgExp= new Array();
                T_adoMsgExp[0] = "Expedition Result"; //ogame.org
                T_adoMsgExp[15] = "远征结果"; //ogame.tw
                T_adoMsgExp[17] = "远征结果"; //ogame.com.cn
            var T_adoMsgExpReg = new RegExp(T_adoMsgExp[langloca]);

            var T_adoMsgRcy= new Array();
                T_adoMsgRcy[0] = "Harvesting report"; //ogame.org
                T_adoMsgRcy[15] = "来自废墟的回收报告"; //ogame.tw
                T_adoMsgRcy[17] = "来自废墟的回收报告"; //ogame.com.cn
            var T_adoMsgRcyReg = new RegExp(T_adoMsgRcy[langloca]);
            
			var q=i+1;//index number
			//alert(alltxt.snapshotItem(i).innerHTML);
			if(/span class..combatreport/.test(allsub.snapshotItem(i).innerHTML) == true){
				batholder += "<tr class='msgHead'><th class='msgCount_"+q+"'>"+q+"</th><th>"+allchk.snapshotItem(i).innerHTML+"</th><th>"+alldat.snapshotItem(i).innerHTML+"</th><th>"+allfro.snapshotItem(i).innerHTML+"</th><th>"+allsub.snapshotItem(i).innerHTML+"</th></tr>";
			} else if(/span class..espionagereport/.test(allsub.snapshotItem(i).innerHTML) == true){
				spyAdr = allsub.snapshotItem(i).innerHTML.match(/\d+,\d+,\d+(?=\);">\[)/)[0]//目标星球坐标
				spyM = alltxt.snapshotItem(i).innerHTML.match(/<\/td><td>(\d+\.)*\d+/g)[0];//获取各项资源的数值
				spyC = alltxt.snapshotItem(i).innerHTML.match(/<\/td><td>(\d+\.)*\d+/g)[1];
				spyH = alltxt.snapshotItem(i).innerHTML.match(/<\/td><td>(\d+\.)*\d+/g)[2];
				spyE = alltxt.snapshotItem(i).innerHTML.match(/<\/td><td>(\d+\.)*\d+/g)[3];
				try{spyM = mystr2num(spyM.match(/(\d+\.)*\d+/)[0])}catch(e){spyM=0}
				try{spyC = mystr2num(spyC.match(/(\d+\.)*\d+/)[0])}catch(e){spyC=0}
				try{spyH = mystr2num(spyH.match(/(\d+\.)*\d+/)[0])}catch(e){spyH=0}
				try{spyE = mystr2num(spyE.match(/(\d+\.)*\d+/)[0])}catch(e){spyE=0}
				spyTotal = spyM+spyC+spyH
				tgtTotal = Math.floor(spyM/2)+Math.floor(spyC/2)+Math.floor(spyH/2)
				var scargo = Math.ceil((Math.floor(spyTotal/2))/5000)
				if(DEBUG){logToConsole("need sc="+scargo)}
				while (calRaid(spyM,spyC,spyH,scargo*5000).sum()<tgtTotal){
				   scargo++;
				}
				if(DEBUG){logToConsole("really need sc="+scargo)}
				var lcargo = Math.ceil((Math.floor(spyTotal/2))/25000)
				if(DEBUG){logToConsole("need lc="+lcargo)}
				while (calRaid(spyM,spyC,spyH,scargo*25000).sum()<tgtTotal){
				   lcargo++;
				}
				if(DEBUG){logToConsole("really need lc="+lcargo)}
                curPlanetLoc = GM_getValue (server+'Cur_Planet_Loc');
                curPlanetLocArr = curPlanetLoc.match(/\d+/g);
                spyTgtLoc = allsub.snapshotItem(i).innerHTML.match(/(\d+):(\d+):(\d+)/)
				spyholder += "<tr class='msgHead'><th class='msgCount_"+q+"'><a class='spyReportIndex' href='javascript:collexp(\"spyo"+i+"\");'>[&nbsp;"+q+"&nbsp;]</a></th>"
				+"<th>"+allchk.snapshotItem(i).innerHTML+"</th><th>"+alldat.snapshotItem(i).innerHTML+"</th>"
				+"<th><span class=messTime>"//+allfro.snapshotItem(i).innerHTML
				+addDots(Math.round(spyTotal/2))+"</span><span class='divider'>|</span>"
				+"<span class='lcc'>"
				+"<span title='"+spyTotal/2+"'>"
				+"<a class='spyReportIndex' href='index.php?page=flottenversand&session=" + sid + "&thisgalaxy="+curPlanetLocArr[0]+"&thissystem="+curPlanetLocArr[1]+"&thisplanet="+curPlanetLocArr[2]+"&speedfactor=1&ship203="+lcargo+"&speed=10" + "&galaxy=" + spyTgtLoc[1] + "&system=" + spyTgtLoc[2] + "&planet=" + spyTgtLoc[3] + "&planettype=1&order=1&resource3=0&resource2=0&resource1=0' target='_blank'>"+lcargo+"</a>"
				+((Math.ceil(lcargo/2)>=dRaidLC)?"<span title='"+spyTotal/4+"'>-<a class='spyReportIndex' href='index.php?page=flottenversand&session=" + sid + "&thisgalaxy="+curPlanetLocArr[0]+"&thissystem="+curPlanetLocArr[1]+"&thisplanet="+curPlanetLocArr[2]+"&speedfactor=1&ship203="+Math.ceil(lcargo/2)+"&speed=10" + "&galaxy=" + spyTgtLoc[1] + "&system=" + spyTgtLoc[2] + "&planet=" + spyTgtLoc[3] + "&planettype=1&order=1&resource3=0&resource2=0&resource1=0' target='_blank'>"+Math.ceil(lcargo/2)+"</a>":"")
				//+"<a href='#' onclick='showFleetMenu("+spyAdr+",1,1);'>[自]</a>"
				+"</span>"
				+"</span><span class='divider'>|</span>"
				+"<span class='scc'>"
				+"<span title='"+spyTotal/2+"'>"
				+"<a class='spyReportIndex' href='index.php?page=flottenversand&session=" + sid + "&thisgalaxy="+curPlanetLocArr[0]+"&thissystem="+curPlanetLocArr[1]+"&thisplanet="+curPlanetLocArr[2]+"&thisplanettype=1&speedfactor=1&ship202="+scargo+"&speed=10" + "&galaxy=" + spyTgtLoc[1] + "&system=" + spyTgtLoc[2] + "&planet=" + spyTgtLoc[3] + "&planettype=1&order=1&resource3=0&resource2=0&resource1=0' target='_blank'>"+scargo+"</a></span>"
				+((Math.ceil(scargo/2)>=dRaidSC)?"<span title='"+spyTotal/4+"'>-<a class='spyReportIndex' href='index.php?page=flottenversand&session=" + sid + "&thisgalaxy="+curPlanetLocArr[0]+"&thissystem="+curPlanetLocArr[1]+"&thisplanet="+curPlanetLocArr[2]+"&thisplanettype=1&speedfactor=1&ship202="+Math.ceil(scargo/2)+"&speed=10" + "&galaxy=" + spyTgtLoc[1] + "&system=" + spyTgtLoc[2] + "&planet=" + spyTgtLoc[3] + "&planettype=1&order=1&resource3=0&resource2=0&resource1=0' target='_blank'>"+Math.ceil(scargo/2)+"</a></span>":"")
				+"</span>"
				+"</th>"
				+"<th>"+allsub.snapshotItem(i).innerHTML+"</th></tr>"
				+"<tr><td colspan='6' class='b' height='0'><div id='spyo"+i+"' style='display: none;'>"
				+alltxt.snapshotItem(i).innerHTML
				+"<input type='button' id=rep_btn_"+ spyCount +" value='军事演习'/>"
				+"</div>"
				var report = (cleanup_report(alltxt.snapshotItem(i).innerHTML))
				reports.push(report)
				spyCount++;
				//alert(reports.length);
				//GM_log(spyholder);
				//GM_log(alltxt.snapshotItem(i).innerHTML);
			} else if((/\[.+\]/.test(allfro.snapshotItem(i).innerHTML) == true) && (/\<a href/.test(allfro.snapshotItem(i).innerHTML) != true)){
				allyholder += "<tr class='msgHead'><th class='msgCount_"+q+"'>"+q+"</th><th>"+allchk.snapshotItem(i).innerHTML+"</th><th>"+alldat.snapshotItem(i).innerHTML+"</th><th>"+allfro.snapshotItem(i).innerHTML+"</th><th>"+allsub.snapshotItem(i).innerHTML+"</th></tr><tr><td colspan='5' class='b'>"+alltxt.snapshotItem(i).innerHTML+"</td></tr>";
			} else if(/writemessages.php.session/.test(allsub.snapshotItem(i).innerHTML) == true){
				userholder += "<tr class='msgHead'><th class='msgCount_"+q+"'>"+q+"</th><th>"+allchk.snapshotItem(i).innerHTML+"</th><th>"+alldat.snapshotItem(i).innerHTML+"</th><th>"+allfro.snapshotItem(i).innerHTML+"</th><th>"+allsub.snapshotItem(i).innerHTML+"</th></tr><tr><th colspan='3'></th><td colspan='3' class='b'>"+alltxt.snapshotItem(i).innerHTML+"</td></tr>";
			} else if(T_adoMsgEspReg.test(allsub.snapshotItem(i).innerHTML) == true){
				incomingSpyholder += "<tr class='msgHead'><th class='msgCount_"+q+"'>"+q+"</th><th>"+allchk.snapshotItem(i).innerHTML+"</th><th>"+alldat.snapshotItem(i).innerHTML+"</th><th>"+allfro.snapshotItem(i).innerHTML+"</th><th>"+allsub.snapshotItem(i).innerHTML+"</th></tr><tr><td colspan='6' class='b'>"+alltxt.snapshotItem(i).innerHTML+"</td></tr>";
			} else if(T_adoMsgFbkReg.test(allsub.snapshotItem(i).innerHTML) == true){
				fleetBackholder += "<tr class='msgHead'><th class='msgCount_"+q+"'>"+q+"</th><th>"+allchk.snapshotItem(i).innerHTML+"</th><th>"+alldat.snapshotItem(i).innerHTML+"</th><th>"+allfro.snapshotItem(i).innerHTML+"</th><th>"+allsub.snapshotItem(i).innerHTML+"</th></tr><tr><td colspan='6' class='b'>"+alltxt.snapshotItem(i).innerHTML+"</td></tr>";
			}else if(T_adoMsgRcyReg.test(allsub.snapshotItem(i).innerHTML) == true){
				cylholder += "<tr class='msgHead'><th class='msgCount_"+q+"'>"+q+"</th><th>"+allchk.snapshotItem(i).innerHTML+"</th><th>"+alldat.snapshotItem(i).innerHTML+"</th><th>"+allfro.snapshotItem(i).innerHTML+"</th><th>"+allsub.snapshotItem(i).innerHTML+"</th></tr><tr><td colspan='6' class='b'>"+alltxt.snapshotItem(i).innerHTML+"</td></tr>";
			}else if(T_adoMsgFdpReg.test(allsub.snapshotItem(i).innerHTML) == true){
				depholder += "<tr class='msgHead'><th class='msgCount_"+q+"'>"+q+"</th><th>"+allchk.snapshotItem(i).innerHTML+"</th><th>"+alldat.snapshotItem(i).innerHTML+"</th><th>"+allfro.snapshotItem(i).innerHTML+"</th><th>"+allsub.snapshotItem(i).innerHTML+"</th></tr><tr><td colspan='6' class='b'>"+alltxt.snapshotItem(i).innerHTML+"</td></tr>";
			}else if(T_adoMsgColReg.test(allsub.snapshotItem(i).innerHTML) == true){
				colholder += "<tr class='msgHead'><th class='msgCount_"+q+"'>"+q+"</th><th>"+allchk.snapshotItem(i).innerHTML+"</th><th>"+alldat.snapshotItem(i).innerHTML+"</th><th>"+allfro.snapshotItem(i).innerHTML+"</th><th>"+allsub.snapshotItem(i).innerHTML+"</th></tr><tr><td colspan='6' class='b'>"+alltxt.snapshotItem(i).innerHTML+"</td></tr>";
			}else if(T_adoMsgExpReg.test(allsub.snapshotItem(i).innerHTML) == true){
				expholder += "<tr class='msgHead'><th class='msgCount_"+q+"'>"+q+"</th><th>"+allchk.snapshotItem(i).innerHTML+"</th><th>"+alldat.snapshotItem(i).innerHTML+"</th><th>"+allfro.snapshotItem(i).innerHTML+"</th><th>"+allsub.snapshotItem(i).innerHTML+"</th></tr><tr><td colspan='6' class='b'>"+alltxt.snapshotItem(i).innerHTML+"</td></tr>";
			}else {
			//alert(allsub.snapshotItem(i).innerHTML);
				othersholder += "<tr class='msgHead'><th class='msgCount_"+q+"'>"+q+"</th><th>"+allchk.snapshotItem(i).innerHTML+"</th><th>"+alldat.snapshotItem(i).innerHTML+"</th><th>"+allfro.snapshotItem(i).innerHTML+"</th><th>"+allsub.snapshotItem(i).innerHTML+"</th></tr><tr><td colspan='5' class='b'>"+alltxt.snapshotItem(i).innerHTML+"</td></tr>";
			}
		}
       } 
		/*为整合好消息添加标题等等*/
		if(batholder.length>0){
			batholder = "<table width='100%'><tr class='msgGroupHead'><td class='c' colspan='6'>作战报告</td></tr>"+batholder+"</table><br>";
		}	
		if(spyholder.length>0){
			spyholder = "<table width='100%'><tr class='msgGroupHead'><td class='c' colspan='5'>侦察报告</td></tr>"+spyholder+"</table><br>";
		}
		if(allyholder.length>0){
			allyholder = "<table width='100%'><tr class='msgGroupHead'><td class='c' colspan='6'>联盟信息</td></tr><tr><th colspan='2'>"+mesact+"</th><th>"+mesdat+"</th><th>"+mesfro+"</th><th>"+messub+"</th></tr>"+allyholder+"</table><br>";
		}	
		if(userholder.length>0){
			userholder = "<table width='100%'><tr class='msgGroupHead'><td class='c' colspan='6'>玩家信息</td></tr><tr><th colspan='3'>"+mesact+"</th><th>"+mesdat+"</th><th>"+mesfro+"</th><th>"+messub+"</th></tr>"+userholder+"</table><br>";
		}
		if(othersholder.length>0){
			//othersholder = "<table width='100%'><tr class='msgGroupHead'><td class='c' colspan='6'>其他消息</td></tr><tr><th colspan='2'>"+mesact+"</th><th>"+mesdat+"</th><th>"+mesfro+"</th><th>"+messub+"</th></tr>"+othersholder+"</table>";
			othersholder = "<table width='100%'><tr class='msgGroupHead'><td class='c' colspan='6'>其他消息</td></tr>"+othersholder+"</table><br>";
		}

		if(incomingSpyholder.length>0){
			incomingSpyholder = "<table width='100%'><tr class='msgGroupHead'><td class='c' colspan='6'>探测监控</td></tr>"+incomingSpyholder+"</table><br>";
		}
		if(fleetBackholder.length>0){
			fleetBackholder = "<table width='100%'><tr class='msgGroupHead'><td class='c' colspan='6'>舰队返回</td></tr>"+fleetBackholder+"</table><br>";
		}
		if(cylholder.length>0){
			cylholder = "<table width='100%'><tr class='msgGroupHead'><td class='c' colspan='6'>回收报告</td></tr>"+cylholder+"</table><br>";
		}
		if(depholder.length>0){
			depholder = "<table width='100%'><tr class='msgGroupHead'><td class='c' colspan='6'>派遣抵达</td></tr>"+depholder+"</table><br>";
		}
		if(colholder.length>0){
			colholder = "<table width='100%'><tr class='msgGroupHead'><td class='c' colspan='6'>殖民报告</td></tr>"+colholder+"</table><br>";
		}
		if(expholder.length>0){
			expholder = "<table width='100%'><tr class='msgGroupHead'><td class='c' colspan='6'>远征结果</td></tr>"+expholder+"</table><br>";
		}

		var formact = xpath("//form[starts-with(@action,'index')]").snapshotItem(0);
		var formsel = xpath("//select[@name='deletemessages']").snapshotItem(0).innerHTML;
		var formsub = xpath("//select[@name='deletemessages']/following-sibling::input[position()=1]").snapshotItem(0);
		/*组合成左右两栏*/
//		alert(spyholder);
		if((batholder.length+incomingSpyholder.length+spyholder.length+expholder.length)>0){var leftcol = batholder+incomingSpyholder+expholder+spyholder;} else {var leftcol = "<table width='100%'><tr><td class='c'>当前无作战或探测报告</td></tr></table>";}
		if((allyholder.length+userholder.length+othersholder.length+fleetBackholder.length+depholder.length+colholder.length+cylholder.length)>0){var rightcol = allyholder+userholder+fleetBackholder+cylholder+depholder+colholder+othersholder;} else {var rightcol = "<table width='100%'><tr><td class='c'>当前无其他报告</td></tr></table>";}
		
		var meszone = xpath("//center/script").snapshotItem(0);
		var mestable = document.createElement('form');
			mestable.action = formact.action;
			mestable.method = formact.method;
			mestable.innerHTML = "<div  class='messadv'><table><tr><th colspan='2'><select name='deletemessages'>"+formsel+"</select><input type='submit' value='"+formsub.value+"'><input type='hidden' name='messages' value='1' /></th></tr>"
			+"<tr><td valign='top' width='50%' class='messMod'>"+leftcol+"</td><td valign='top' width='50%' class='messMod'>"+rightcol+"</td></tr></table></div>";
			//formact.parentNode.removeChild(formact);
			meszone.parentNode.insertBefore(mestable, meszone.nextSibling);
			
	var el = document.createElement("form");
	el.innerHTML = '<input type="hidden" id="input_sso" name="report" />';
	el.method = "post";
	el.target = "_speedsim";
	el.action = "http://websim.speedsim.net/";
	el.id = el.name = "speedsim_form";
	document.getElementsByTagName("body")[0].appendChild(el);

	// watch click events and get the button that was clicked
	document.addEventListener('click', function(event) {
		var i = 0;
		for(i = 0; i < 20; i++)
		{
			if(event.target == document.getElementById("rep_btn_" + i))
			{
				document.getElementById("input_sso").value = encodeURI(reports[i]);
				//alert(reports[i]);
				document.getElementById("speedsim_form").submit();
			}
		}
	}, true);
	

	/*单击消息标题选择消息*/
	msgLine = xpath('//input[@type="checkbox"]/../..');
	for(i=0;i<msgLine.snapshotLength;i++){
		thisMsgLine = msgLine.snapshotItem(i);
		thisMsgLine.addEventListener('click',function(){checkMsg(this.getElementsByTagName("input")[0]);},true);
	}
	checkBoxes = xpath('//input[@type="checkbox"]');//解决按中checkbox无反应问题2008-08-4
	for(i=0;i<checkBoxes.snapshotLength;i++){
		thischeckBox = checkBoxes.snapshotItem(i);
		thischeckBox.addEventListener('click',function(){checkMsg(this);},true);
	}
	spyRptExps = xpath('//a[@class="spyReportIndex"]');//解决按中谍报展开无反应问题2008-08-27
	for(i=0;i<spyRptExps.snapshotLength;i++){
		thischeckBox = spyRptExps.snapshotItem(i);
		thischeckBox.addEventListener('click',function(){checkMsg(this.parentNode.parentNode.getElementsByTagName("input")[0]);},true);
	}
	
	/*战斗报告链接加入星系链接*/
	brLinks = xpath("//span[contains(@class,'combatreport')]/parent::a");
	if(brLinks){
		for(i=0;i<brLinks.snapshotLength;i++){
			str = brLinks.snapshotItem(i).innerHTML;
			brLocStr = str.match(/\d+:\d+:\d+/)[0];
			brLocStrArr = brLocStr.match(/\d+/g);
			brItem = document.createElement('span')
			brItem.innerHTML = " <a style=\'cursor:pointer; -moz-user-select:none;\' onclick=showGalaxy("+ brLocStrArr[0] +","+ brLocStrArr[1] +","+ brLocStrArr[2] +");>[&rarr;]</a>";
			brLinks.snapshotItem(i).parentNode.insertBefore(brItem,brLinks.snapshotItem(i).nextSibling)
		}
	}

    window.scrollTo(0,0)//滚动页面
}

/* 战斗报告 */
if(/page=bericht/.test(ogtitle) == true){}

/* 选项页面 */
if(/page=options/.test(ogtitle) == true){
    /*allTh = xpath("//th")
    for (i=0;i<allTh.snapshotLength;i++){
        thisTh = allTh.snapshotItem(i);
        //vacTime = thisTh.innerHTML.match(/(\d\d)\.(\d\d)\.(\d\d\d\d)\..*(\d\d):(\d\d):(\d\d)/)[0]
        //if(vacTime){
               
        //}
    }*/

		document.title="选项-"+document.title;
	var T_rc= new Array(); //2.
		T_rc[0] = "Resources Colors"; //ogame.org
		T_rc[15] = "資源字的顏色"; //ogame.tw
		T_rc[17] = "资源字的颜色"; //ogame.com.cn
	var L_mc = new Array(); //3.
		L_mc[0] = "Metal color"; //ogame.org
		L_mc[15] = "金屬顏色"; //ogame.tw
		L_mc[17] = "金属"; //ogame.com.cn
	var L_cc = new Array(); //4.
		L_cc[0] = "Crystal color"; //ogame.org
		L_cc[15] = "晶體顏色"; //ogame.tw
		L_cc[17] = "晶体"; //ogame.com.cn
	var L_dc = new Array(); //5.
		L_dc[0] = "Deuterium color"; //ogame.org
		L_dc[15] = "重氫顏色"; //ogame.tw
		L_dc[17] = "重氢"; //ogame.com.cn
	var L_ec = new Array(); //6.
		L_ec[0] = "Energy color"; //ogame.org
		L_ec[15] = "能量顏色"; //ogame.tw
		L_ec[17] = "能量"; //ogame.com.cn
	var R_rt = new Array(); //7.
		R_rt[0] = "One click to reset the color, double-click to erase the color"; //ogame.org
		R_rt[15] = "單擊滑鼠左鍵重置!雙擊滑鼠左鍵消除!"; //ogame.tw
		R_rt[17] = "双击清空，单击恢复"; //ogame.com.cn
	var T_ar = new Array(); //8.
		T_ar[0] = "Advertisement Remover"; //ogame.org
		T_ar[15] = "廣告移除設置"; //ogame.tw
		T_ar[17] = "广告屏蔽设置"; //ogame.com.cn
	var L_sa = new Array(); //9.
		L_sa[0] = "Normal ads"; //ogame.org
		L_sa[15] = "一般正常廣告"; //ogame.tw
		L_sa[17] = "普通广告"; //ogame.com.cn
	var L_dm = new Array(); //10.
	    L_dm[0] = "Dark Matter Icon"; //ogame.org
		L_dm[15] = "黑暗物質圖示(建議保留)"; //ogame.tw
		L_dm[17] = "暗物质图片"; //ogame.com.cn
	var L_ica = new Array(); //11.
		L_ica[0] = "Officer's Casino ad link"; //ogame.org
		L_ica[15] = "事務官廣告鏈結"; //ogame.tw
		L_ica[17] = "指挥官广告链接"; //ogame.com.cn
	var L_topa = new Array(); //12.
		L_topa[0] = "Top upgrade icons ads"; //ogame.org
		L_topa[15] = "事務官圖示(建議保留)"; //ogame.tw
		L_topa[17] = "指挥官图片"; //ogame.com.cn
	var T_ut = new Array(); //13.
		T_ut[0] = "Utilities"; //ogame.org
		T_ut[15] = "&#x5BE6;&#x7528;&#x7A0B;&#x5F0F;"; //ogame.tw
		T_ut[17] = "实用功能"; //ogame.com.cn
	var L_rs = new Array(); //14.
		L_rs[0] = "Debris harvest link"; //ogame.org
		L_rs[15] = "殘骸回收"; //ogame.tw
		L_rs[17] = "残骸回收"; //ogame.com.cn
	var L_sp = new Array(); //15.
		L_sp[0] = "Moon spy link"; //ogame.org
		L_sp[15] = "間諜探測月球"; //ogame.tw
		L_sp[17] = "阿波罗计划"; //ogame.com.cn
	var L_mxs = new Array(); //16.
		L_mxs[0] = "Maximum ships and defenses"; //ogame.org
		L_mxs[15] = "船艦與防禦數量最大化"; //ogame.tw
		L_mxs[17] = "舰队和防御数量最大化"; //ogame.com.cn
	var L_cdesc = new Array(); //17.
		L_cdesc[0] = "Minimize descriptions"; //ogame.org
		L_cdesc[15] = "註解最小化"; //ogame.tw
		L_cdesc[17] = "注解最小化"; //ogame.com.cn
	var L_loct = new Array(); //17.
		L_loct[0] = "Show local time in overview"; //ogame.org
		L_loct[15] = "概況中顯示本地時間"; //ogame.tw
		L_loct[17] = "概况中显示本地时间"; //ogame.com.cn
	var T_misc= new Array(); //18.
		T_misc[0] = "Mision Colors"; //ogame.org
		T_misc[15] = "艦隊任務顏色置換"; //ogame.tw
		T_misc[17] = "任务颜色设置"; //ogame.com.cn
	var L_miscchk= new Array(); //19.
		L_miscchk[0] = "Activate Mission Colors"; //ogame.org
		L_miscchk[15] = "使用置換後的艦隊任務顏色"; //ogame.tw
		L_miscchk[17] = "使用任务颜色替换"; //ogame.com.cn
	var L_atc= new Array(); //19.
		L_atc[0] = "Attack"; //ogame.org
		L_atc[15] = "艦隊攻擊"; //ogame.tw
		L_atc[17] = "攻击"; //ogame.com.cn
	var L_esc= new Array(); //20.
		L_esc[0] = "Espionage"; //ogame.org
		L_esc[15] = "間諜探測"; //ogame.tw
		L_esc[17] = "探测"; //ogame.com.cn
	var L_trc= new Array(); //21.
		L_trc[0] = "Transport"; //ogame.org
		L_trc[15] = "艦隊運輸"; //ogame.tw
		L_trc[17] = "运输"; //ogame.com.cn
	var L_hac= new Array(); //22.
		L_hac[0] = "Harvest"; //ogame.org
		L_hac[15] = "戰場廢墟回收"; //ogame.tw
		L_hac[17] = "回收"; //ogame.com.cn
	var L_otrc= new Array(); //23.
		L_otrc[0] = "Own Transport"; //ogame.org
		L_otrc[15] = "艦隊派遣"; //ogame.tw
		L_otrc[17] = "派遣"; //ogame.com.cn
		/*新选项文字*/
	var L_colLink= new Array(); //23.
		L_colLink[0] = "Activate direct sending colonial ship"; //ogame.org
		L_colLink[15] = "星系頁面空星球位置直接殖民"; //ogame.tw
		L_colLink[17] = "星系页面空星球位置直接殖民"; //ogame.com.cn
	var L_expLink= new Array(); //23.
		L_expLink[0] = "Activate direct sending expedition"; //ogame.org
		L_expLink[15] = "星系頁面外太空直接遠征"; //ogame.tw
		L_expLink[17] = "星系页面外太空直接远征"; //ogame.com.cn
	var L_bigLaji= new Array(); //23.
		L_bigLaji[0] = "Highligh DF larger than"; //ogame.org
		L_bigLaji[15] = "提醒我超過這個數量的殘骸"; //ogame.tw
		L_bigLaji[17] = "提醒我超过这个数量的殘骸"; //ogame.com.cn
	var L_loctf1= new Array(); //23.
		L_loctf1[0] = "Show Local Time In Fleet Page"; //ogame.org
		L_loctf1[15] = "艦隊頁面顯示本地時間"; //ogame.tw
		L_loctf1[17] = "舰队页面显示本地时间"; //ogame.com.cn	
	var L_loctDifsec= new Array(); //23.
		L_loctDifsec[0] = "Auto  Local/Server time adjustment"; //ogame.org
		L_loctDifsec[15] = "自動本地與服務器秒數差修正"; //ogame.tw
		L_loctDifsec[17] = "自动本地与服务器秒数差修正"; //ogame.com.cn	
	var L_loctDifsecMan= new Array(); //23.
		L_loctDifsecMan[0] = "time adjustment by hand"; //ogame.org
		L_loctDifsecMan[15] = "時間手動微調"; //ogame.tw
		L_loctDifsecMan[17] = "时间手动微调"; //ogame.com.cn	
		
		

B_sv = "SAVE!";
	if(notdetected){
		var T_lang= new Array(); //18.
			T_lang[0] = "<a href='http://userscripts.org/scripts/show/8938'>[Language not detected: you MUST choose the right one to work properly]</a>"; //ogame.org
			T_lang[15] = "<a href='http://userscripts.org/scripts/show/8938'>[&#x672A;&#x6B63;&#x78BA;&#x5075;&#x6E2C;&#x5230;&#x60A8;&#x7684;&#x8A9E;&#x8A00;&#xFF1A;&#x60A8;&#x5FC5;&#x9808;&#x9078;&#x64C7;&#x4E00;&#x500B;&#x6B63;&#x78BA;&#x7684;&#x8A9E;&#x8A00;&#x624D;&#x80FD;&#x6B63;&#x5E38;&#x5DE5;&#x4F5C;]</a>"; //ogame.tw
			T_lang[17] = "<a href='http://userscripts.org/scripts/show/8938'>[&#x672A;&#x6B63;&#x78BA;&#x5075;&#x6E2C;&#x5230;&#x60A8;&#x7684;&#x8A9E;&#x8A00;&#xFF1A;&#x60A8;&#x5FC5;&#x9808;&#x9078;&#x64C7;&#x4E00;&#x500B;&#x6B63;&#x78BA;&#x7684;&#x8A9E;&#x8A00;&#x624D;&#x80FD;&#x6B63;&#x5E38;&#x5DE5;&#x4F5C;]</a>"; //ogame.tw
		var L_cl = new Array(); //19.
			L_cl[0] = "Choose location"; //ogame.org
			L_cl[15] = "&#x9078;&#x64C7;&#x4F4D;&#x7F6E;"; //ogame.tw
			L_cl[17] = "选择位置"; //ogame.com.cn
		var languages = new Array;
			languages[0] = "org";
			languages[15] = "tw";
			languages[17] = "cn";
		
		var languageoptions = "";
		for(var i=0;i<languages.length;i++){
			if(i==parseInt(langloca)){
				languageoptions = languageoptions + "<option value='"+languages[i]+"' selected>OGame "+languages[i]+"</option>";
			} else {
				languageoptions = languageoptions + "<option value='"+languages[i]+"'>OGame "+languages[i]+"</option>";
			}
		}
	
		var langtable = "<tr><td class=\"c\" colspan=\"2\">"+T_lang[langloca]+"</td></tr>"+
						"<tr><th>"+L_cl[langloca]+"</th><th><select id=\"selectlocation\">"+languageoptions+"</select></th><tr>";
	} else {
		var langtable = "";
	}
	
	var F_head = document.getElementsByTagName('head')[0];
	var F_script = document.createElement('script');
		F_script.type = 'text/javascript';
		F_script.innerHTML = 'function resetbut(id,color){ '+
							'var theinp = document.getElementById(id); '+
							'theinp.value = color; '+
							'theinp.style.color = color; '+
							'} '+
							'function changer(id){ '+
							'var theinp = document.getElementById(id); '+
							'theinp.style.color = theinp.value; '+
							'} ';
		F_head.appendChild(F_script);
	
	var butjava = "\"javascript: if(this.value == '0'){this.value = '1';} else {this.value = '0';}\"";
	
	//var optionszone = xpath("/html/body/center[2]").snapshotItem(0);
	var optionszone = xpath("//div[@id='content']/center").snapshotItem(0);
	var optionstable = document.createElement('table');
		optionstable.width = "519px";
		optionstable.innerHTML = 
		"<tr><td class=\"c\" colspan=\"2\">"+T_rc[langloca]+"</td></tr>"+
		"<tr><th>"+L_mc[langloca]+"</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('metalcolor','#F1531E')\" ondblclick=\"resetbut('metalcolor','')\"><input type=\"text\" onkeyup=\"changer('metalcolor')\" style=\"color:"+color_m+";\" id=\"metalcolor\" maxlength=\"18\" size =\"20\" value=\""+color_m+"\"></th></tr>"+
		"<tr><th>"+L_cc[langloca]+"</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('crystalcolor','#54B0DC')\" ondblclick=\"resetbut('crystalcolor','')\"><input type=\"text\" onkeyup=\"changer('crystalcolor')\" style=\"color:"+color_c+";\" id=\"crystalcolor\" maxlength=\"18\" size =\"20\" value=\""+color_c+"\"></th></tr>"+
		"<tr><th>"+L_dc[langloca]+"</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('deuteriumcolor','#9AACCB')\" ondblclick=\"resetbut('deuteriumcolor','')\"><input type=\"text\" onkeyup=\"changer('deuteriumcolor')\" style=\"color:"+color_d+";\" id=\"deuteriumcolor\" maxlength=\"18\" size =\"20\" value=\""+color_d+"\"></th></tr>"+
		"<tr><th>"+L_ec[langloca]+"</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('energycolor','#F2D99D')\" ondblclick=\"resetbut('energycolor','')\"><input type=\"text\" onkeyup=\"changer('energycolor')\" style=\"color:"+color_e+";\" id=\"energycolor\" maxlength=\"18\" size =\"20\" value=\""+color_e+"\"></th></tr>"+
		"<tr><td class=\"c\" colspan=\"2\">"+T_misc[langloca]+"</td></tr>"+
		"<tr><th>"+L_miscchk[langloca]+"</th><th><input type=\"checkbox\" id=\"missioncolors\" value=\""+mission_colors+"\" "+togglecheck(mission_colors)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>"+L_atc[langloca]+"</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('attackcolor','"+color_attack+"')\" ondblclick=\"resetbut('attackcolor','')\"><input type=\"text\" onkeyup=\"changer('attackcolor')\" style=\"color:"+color_attack+";\" id=\"attackcolor\" maxlength=\"18\" size =\"20\" value=\""+color_attack+"\"></th></tr>"+
		"<tr><th>"+L_esc[langloca]+"</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('spycolor','"+color_spy+"')\" ondblclick=\"resetbut('spycolor','')\"><input type=\"text\" onkeyup=\"changer('spycolor')\" style=\"color:"+color_spy+";\" id=\"spycolor\" maxlength=\"18\" size =\"20\" value=\""+color_spy+"\"></th></tr>"+
		"<tr><th>"+L_otrc[langloca]+"</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('harvestcolor','"+color_otransport+"')\" ondblclick=\"resetbut('harvestcolor','')\"><input type=\"text\" onkeyup=\"changer('harvestcolor')\" style=\"color:"+color_otransport+";\" id=\"harvestcolor\" maxlength=\"18\" size =\"20\" value=\""+color_otransport+"\"></th></tr>"+
		"<tr><th>"+L_hac[langloca]+"</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('owntransportcolor','"+color_harvest+"')\" ondblclick=\"resetbut('owntransportcolor','')\"><input type=\"text\" onkeyup=\"changer('owntransportcolor')\" style=\"color:"+color_harvest+";\" id=\"owntransportcolor\" maxlength=\"18\" size =\"20\" value=\""+color_harvest+"\"></th></tr>"+
		"<tr><th>"+L_trc[langloca]+"</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('transportcolor','"+color_transport+"')\" ondblclick=\"resetbut('transportcolor','')\"><input type=\"text\" onkeyup=\"changer('transportcolor')\" style=\"color:"+color_transport+";\" id=\"transportcolor\" maxlength=\"18\" size =\"20\" value=\""+color_transport+"\"></th></tr>"+
		"<tr><td class=\"c\" colspan=\"2\">"+T_ar[langloca]+"</td></tr>"+
		"<tr><th>"+L_sa[langloca]+"</th><th><input type=\"checkbox\" id=\"standard\" value=\""+standardads+"\" "+togglecheck(standardads)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>"+L_dm[langloca]+"</th><th><input type=\"checkbox\" id=\"darkmatter\" value=\""+darkmatter+"\" "+togglecheck(darkmatter)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>"+L_ica[langloca]+"</th><th><input type=\"checkbox\" id=\"OClink\" value=\""+oclink+"\" "+togglecheck(oclink)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>"+L_topa[langloca]+"</th><th><input type=\"checkbox\" id=\"TOPicons\" value=\""+topicons+"\" "+togglecheck(topicons)+" onclick="+butjava+"></th></tr>"+
		"<tr><td class=\"c\" colspan=\"2\">"+T_ut[langloca]+"</td></tr>"+
		"<tr><th>"+L_rs[langloca]+"</th><th><input type=\"checkbox\" id=\"recycler\" value=\""+harvest+"\" "+togglecheck(harvest)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>"+L_bigLaji[langloca]+"</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('bigLaji','20000')\" ondblclick=\"resetbut('bigLaji','')\"><input type=\"text\" onkeyup=\"changer('bigLaji')\" id=\"bigLaji\"size =\"20\" value=\""+bigLaji+"\"></th></tr>"+
		"<tr><th>"+L_sp[langloca]+"</th><th><input type=\"checkbox\" id=\"moonspy\" value=\""+moonspy+"\" "+togglecheck(moonspy)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>月球探测器数量</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('moonSpyCount','2')\" ondblclick=\"resetbut('moonSpyCount','')\"><input type=\"text\" onkeyup=\"changer('moonSpyCount')\" id=\"moonSpyCount\"size =\"20\" value=\""+moonSpyCount+"\"></th></tr>"+		
		"<tr><th>"+L_res[langloca]+"</th><th><input type=\"checkbox\" id=\"relvl\" value=\""+relvl+"\" "+togglecheck(relvl)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>"+L_mxs[langloca]+"</th><th><input type=\"checkbox\" id=\"maxships\" value=\""+maxships+"\" "+togglecheck(maxships)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>"+L_ret[langloca]+"</th><th><input type=\"checkbox\" id=\"readytime\" value=\""+readytime+"\" "+togglecheck(readytime)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>"+T_cs[langloca]+"</th><th><input type=\"checkbox\" id=\"calcships\" value=\""+calcships+"\" "+togglecheck(calcships)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>"+L_cdesc[langloca]+"</th><th><input type=\"checkbox\" id=\"collapsedesc\" value=\""+collapsedesc+"\" "+togglecheck(collapsedesc)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>"+L_loct[langloca]+"</th><th><input type=\"checkbox\" id=\"localtime\" value=\""+localtime+"\" "+togglecheck(localtime)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>概况页任务本地时间</th><th><input type=\"checkbox\" id=\"localMissionTimeInOverView\" value=\""+localMissionTimeInOverView+"\" "+togglecheck(localMissionTimeInOverView)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>"+L_loctf1[langloca]+"</th><th><input type=\"checkbox\" id=\"localtimeF1\" value=\""+localtimeF1+"\" "+togglecheck(localtimeF1)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>"+L_loctDifsec[langloca]+"</th><th><input type=\"text\" disabled=\"true\" id=\"timeZoneDiffSec\"size =\"20\" value=\""+timeZoneDiffSec+"\"></th></tr>"+
		"<tr><th>"+L_loctDifsecMan[langloca]+"</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('timeZoneDiffSecMan','0')\" ondblclick=\"resetbut('timeZoneDiffSecMan','')\"><input type=\"text\" onkeyup=\"changer('timeZoneDiffSecMan')\" id=\"timeZoneDiffSecMan\"size =\"20\" value=\""+timeZoneDiffSecMan+"\"></th></tr>"+
		"<tr><th>"+T_pc[langloca]+"</th><th><input type=\"checkbox\" id=\"advstor\" value=\""+advstor+"\" "+togglecheck(advstor)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>左侧可折叠菜单</th><th><input type=\"checkbox\" id=\"lemenu\" value=\""+lemenu+"\" "+togglecheck(lemenu)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>"+L_colLink[langloca]+"</th><th><input type=\"checkbox\" id=\"colLink\" value=\""+colLink+"\" "+togglecheck(colLink)+" onclick="+butjava+"></th></tr>"+
        "<tr><th>"+L_expLink[langloca]+"</th><th><input type=\"checkbox\" id=\"expLink\" value=\""+expLink+"\" "+togglecheck(expLink)+" onclick="+butjava+"></th></tr>"+
        "<tr><th>消息分类显示</th><th><input type=\"checkbox\" id=\"advmess\" value=\""+advmess+"\" "+togglecheck(advmess)+" onclick="+butjava+"></th></tr>"+
		"<tr><th>显示第二波大运如果第二波需要大运至少？</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('dRaidLC','2')\" ondblclick=\"resetbut('dRaidLC','')\"><input type=\"text\" onkeyup=\"changer('dRaidLC')\" id=\"dRaidLC\"size =\"20\" value=\""+dRaidLC+"\"></th></tr>"+
		"<tr><th>显示第二波小运如果第二波需要小运至少？</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('dRaidSC','10')\" ondblclick=\"resetbut('dRaidSC','')\"><input type=\"text\" onkeyup=\"changer('dRaidSC')\" id=\"dRaidSC\"size =\"20\" value=\""+dRaidSC+"\"></th></tr>"+	
        "<tr><th>舰队抵达后刷新概况页</th><th><input type=\"checkbox\" id=\"refreshOverViewOnAvr\" value=\""+refreshOverViewOnAvr+"\" "+togglecheck(refreshOverViewOnAvr)+" onclick="+butjava+"></th></tr>"+
        "<tr><th>坐标粘贴器</th><th><input type=\"checkbox\" id=\"cordBoxInCorner\" value=\""+cordBoxInCorner+"\" "+togglecheck(cordBoxInCorner)+" onclick="+butjava+"></th></tr>"+
        "<tr><th>舰队页2中地月坐标分离</th><th><input type=\"checkbox\" id=\"moonCordExt\" value=\""+moonCordExt+"\" "+togglecheck(moonCordExt)+" onclick="+butjava+"></th></tr>"+
        "<tr><th>使用脚本相关CSS</th><th><input type=\"checkbox\" id=\"useCSS2\" value=\""+useCSS2+"\" "+togglecheck(useCSS2)+" onclick="+butjava+"></th></tr>"+
        "<tr><th>使用脚本内置皮肤</th><th><input type=\"checkbox\" id=\"useCSS\" value=\""+useCSS+"\" "+togglecheck(useCSS)+" onclick="+butjava+"></th></tr>"+
		//"<tr><th>自定义坐标</th><th><input type=\"text\" onkeyup=\"changer('pLocStr')\" id=\"pLocStr\"size =\"20\" value=\""+pLocStr+"\"></th></tr>"+	
        langtable+
		"<tr><th colspan=\"2\"><input type=\"button\" id=\"saveall\" value=\""+B_sv+"\"><input id=\"hiddenserver\" type=\"hidden\" value=\""+ogserver+"\"></th></tr>";
		optionszone.appendChild(optionstable);
		document.getElementById("saveall").addEventListener("click", saver, false);
}

/* 跳跃门页面 fixed@20080918*/
if(advanced_jump_gate && location.search.indexOf('gid=43', 0) >= 0){
	var tables = document.getElementById('content').getElementsByTagName('table');
	if (tables.length > 4){
		var regexp = /(\([0-9]+)/;
		var trs = tables[3].getElementsByTagName('tr');
		for (var i = 1; i < (trs.length - 1); i++){
			var ths = trs[i].getElementsByTagName('th');
			ths[1].innerHTML = '<input id="buttonMax'+i+'" type="button" value="max" onclick="this.nextSibling.value='+ths[0].innerHTML.match(regexp)[0].substr(1)+'">'+ths[1].innerHTML;
		}
		trs[i].getElementsByTagName('th')[0].innerHTML += '&nbsp;<input type="button" value="全部" onclick="for (var i = 1; i < '+(trs.length - 1)+'; i++)document.getElementById(\'buttonMax\'+i).click();">&nbsp;<input type="reset" value="清空">';
	}
}

/*添加左侧链接*/
if (external_links || internal_links){
	if(/page=bericht/.test(ogtitle) != true){
	    try{
		if (internal_links){
			for (var key in internal_links){
				var tr = document.createElement('tr');
				var td = document.createElement('td');
				td.innerHTML = '<div align="center"><a href="'+internal_links[key].url+'" style="color:'+internal_links[key].color+';">'+internal_links[key].name+'</a></div>';
				tr.appendChild(td);
				mid_item.parentNode.insertBefore(tr, mid_item);
			}
		}
		if (external_links){
			for (var key in external_links){
				var tr = document.createElement('tr');
				var td = document.createElement('td');
				td.innerHTML = '<div align="center"><a target="_blank" href="'+external_links[key].url+'" style="color:'+external_links[key].color+';">'+external_links[key].name+'</a></div>';
				tr.appendChild(td);
				last_item.parentNode.insertBefore(tr, last_item);
			}
		}
		last_item.parentNode.removeChild(last_item);
		}catch(e){GM_log(e)}
	}
}

/* 左侧菜单折叠 */
if(lemenu == "1"){
	var menuItems = xpath("//div[@id='menu']/table/tbody/tr");
	var totalmenuItemsNumber = menuItems.snapshotLength;
	var menuTitleNumber = ""
	for(var i=0; i<menuItems.snapshotLength;i++){
		thismenuItem = menuItems.snapshotItem(i);
		if (/<img/.test(thismenuItem.innerHTML)){
			menuTitleNumber = menuTitleNumber+i+",";
			thismenuItem.addEventListener("click", hidemenu, false);
		}
	}
	//alert(menuTitleNumber);
	var menuTitle = menuTitleNumber.split(",");
	/*页面进入后直接根据参数设置菜单的显示*/
	for(var k=0; k<3;k++){
		var titleNum = k;
		if(titleNum==0){
			var alltopleftmenu = xpath("//div[@id='menu']/table/tbody/tr[position()<"+menuTitle[1]+"+1][position()>1]");
		}else if(titleNum==1){
			var alltopleftmenu = xpath("//div[@id='menu']/table/tbody/tr[position()<"+menuTitle[2]+"+1][position()>"+menuTitle[1]+"+1]");
		}else if(titleNum==2){
			var alltopleftmenu = xpath("//div[@id='menu']/table/tbody/tr[position()>"+menuTitle[2]+"+1][position()<"+totalmenuItemsNumber+"+1]");
		}
		this_stat = GM_getValue(server+'_menu_'+titleNum+'_display');
		//alert(this_stat);
		//if(this_stat){
			for (var i = 0; i < alltopleftmenu.snapshotLength; i++ ) {
				if(this_stat == 0){
					alltopleftmenu.snapshotItem(i).style.display = "none";
				}else if(this_stat == 1){
					alltopleftmenu.snapshotItem(i).style.display = "";
				}
			}
		//}
	}
}

/*移除广告*/
if(standardads == "1"){
	del("//script[contains(@src,'googlesyndication')]/parent::center/parent::td/parent::tr");
	delall("//iframe[@name=@id]");
	del("//div[@id='combox_container']");
	del("//img[contains(@src,'ads')]/parent::a[contains(@href,'referer')]/parent::center");
	del("//a[contains(@href,'www.darkpirates')]/parent::center/parent::td/parent::tr");
}
if(darkmatter == "1"){
  del("//table[@id='resources']/tbody/tr[1]/td[4]");
  del("//table[@id='resources']/tbody/tr[2]/td[4]");
  del("//table[@id='resources']/tbody/tr[3]/td[4]");
}
if(oclink == "1"){del("//a[contains(@id, 'darkmatter2')]");}
if(topicons == "1"){del("//td[@align='center' and @width='35']/parent::tr/parent::tbody/parent::table/parent::td");}

// ========= ADD FROM HERE ONWARDS TO YOUR SCRIPT =========
// This auto update-notification script was made by Seifer
// You can find it at http://userscripts.org/scripts/show/12193
// ========================================================
// === Edit the next four lines to suit your script. ===
scriptName='OGameCN - ADO';
scriptId='27619';
scriptVersion=0.34;
scriptUpdateText='1.星图中直接寻找主球功能，2.其他';

// === Stop editing here. ===

var lastCheck = GM_getValue('lastCheck', 0);
var lastVersion = GM_getValue('lastVersion', 0);
var d = new Date();
var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
if (parseInt(navigator.appVersion)>3) {
	if (navigator.appName=="Netscape") {
		winW = window.innerWidth;
		winH = window.innerHeight;
	}
	if (navigator.appName.indexOf("Microsoft")!=-1) {
		winW = document.body.offsetWidth;
		winH = document.body.offsetHeight;
	}
}
if (currentTime > (lastCheck + 86400)) { //24 hours after last check
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/review/'+scriptId+'?format=txt',
		headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain',},
		onload: function(responseDetails) {
			var text = responseDetails.responseText;
			var onSiteVersion = text.substring(text.indexOf("scriptVersion=")+14,text.indexOf("\n",text.indexOf("scriptVersion="))-2);
				var onSiteUpdateText = text.substring(text.indexOf("scriptUpdateText=")+18,text.indexOf("\n",text.indexOf("scriptUpdateText="))-3);
				if(onSiteVersion > scriptVersion && onSiteVersion > lastVersion) {
					GM_addStyle('#gm_update_alert {'
				+'	top: '+((winH/2)-60)+'px;'
				+'	left: '+((winW/2)-275)+'px;'
				+'}');
					newversion = document.createElement("div");
					newversion.setAttribute('id', 'gm_update_alert');
					newversion.innerHTML = ''
				+'	<b>脚本更新提示</b><br>'
				+'	&quot;'+scriptName+'&quot; 版本更新<br>'
				+'	您目前使用的版本是 '+scriptVersion+'. 最新版本是 '+onSiteVersion+'.<br>'
				+'	<br>'
				+'	<div id="gm_update_alert_button_close">'
				+'		Close</div>'
				+'	<b>请选择</b><br>'
				+'	<div id="gm_update_alert_buttons">'
				+'		<span id="gm_update_alert_button_showinfo"><a href="#">更新说明</a></span>&nbsp;&nbsp;'
				+'		<span id="gm_update_alert_button_scripthome"><a target="_blank" href="http://userscripts.org/scripts/show/'+scriptId+'">脚本主页</a></span>&nbsp;&nbsp;'
				+'		<span id="gm_update_alert_button_upgrade"><a href="http://userscripts.org/scripts/source/'+scriptId+'.user.js">升级到最新版本'+onSiteVersion+'</a></span>&nbsp;&nbsp;'
				+'		<span id="gm_update_alert_button_wait"><a href="#">明天再说</a></span>&nbsp;&nbsp;'
				+'		<span id="gm_update_alert_button_waitnextversion"><a href="#">跳过版本</a></span> </div>';
				document.body.insertBefore(newversion, document.body.firstChild);
				document.getElementById('gm_update_alert_button_showinfo').addEventListener('click', function(event) {alert(onSiteUpdateText);}, true);
				document.getElementById('gm_update_alert_button_wait').addEventListener('click', function(event) {GM_setValue('lastCheck', currentTime);alert("明天之前您将不再收到提醒。");document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
				document.getElementById('gm_update_alert_button_waitnextversion').addEventListener('click', function(event) {GM_setValue('lastVersion', onSiteVersion);alert("下一个新版本之前您将不再收到提醒。");document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
				document.getElementById('gm_update_alert_button_close').addEventListener('click', function(event) {document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
				}
			}
	});
}

/*为文本窗口添加事件*/
if(txtArCheck == 0){
	txtArCheck = 1;
	allTA = xpath("//textarea")
	//allInput = xpath("//input")
	//allInput = xpath("//input[@type='text']")
    allInput = xpath("//input[@type!='submit' or @onkeyup]")
	for(i=0;i<allTA.snapshotLength;i++){
		allTA.snapshotItem(i).addEventListener('focus',textFocus,true);
		allTA.snapshotItem(i).addEventListener('blur',textBlur,true);
	}
	for(i=0;i<allInput.snapshotLength;i++){
		allInput.snapshotItem(i).addEventListener('focus',textFocus,true);
		allInput.snapshotItem(i).addEventListener('blur',textBlur,true);
	}
	
}
//EOF