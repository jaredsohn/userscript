// ==UserScript==
// @name           Kaixin ADO
// @namespace      http://pto2k.blogspot.com
// @description    增强您的开心指数
// @date           2008-10-11
// @include        http://*.kaixin001.tld/*
// ==/UserScript==

/*change log
2008-10-11
[朋友买卖]记录每个人被我买过的次数，显示在购买列表中
[争车位]有停在免费车位的先选
2008-09-12
[争车位]朋友列表排序（空/半空/满）（感谢天泉的建议）;有自己车的朋友名字前用红色@标记
2008-09-11
[争车位]只显示有空车位的人
2008-09-10
[朋友买卖]整男奴隶自动选到挖煤，听说这个赚钱多？
2008-09-05
[争车位]以旧换新的时候直接显示车的价值，现金总值
2008-09-05
[争车位]直接显示车的价值，资产总值
2008-09-04
[朋友买卖]整男奴隶自动选到扫厕所
[朋友买卖]整女奴隶自动选到扫陪酒
[朋友买卖]安抚奴隶自动选到第一个
2008-08-30
[争车位]点车位弹出选车界面中，自动选择并显示正在找车位的车，如果车都有车位，选中已经盈利最大的车
*/
/*
to do
？
*/
function xpath(query) {
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
function xpathOne (query) {
	queryResult = document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return queryResult.snapshotItem(0);
}
/*控制log显示*/
function logToConsole(log){
    if(unsafeWindow.console){
       unsafeWindow.console.log(log);
    }else{
    GM_log(log);
    }
}
/*抢车位*/
/*点空车位选择汽车*/
if(/parking\/selcar\.php/.test(location)){
    carStatusDivs = xpath("//div[@class='c9']")
    moneyGet = 0
    hasCarToPark = "No"
    yesBtn=xpathOne("//input[@id='btn_sc']")
    for (i=0;i<carStatusDivs.snapshotLength;i++){//有在找车位的，先选中找车位的
        thisCarStatusDiv = carStatusDivs.snapshotItem(i);
        if (/正在找车位.../.test(thisCarStatusDiv.innerHTML)){
            thisCarStatusDiv.parentNode.parentNode.firstChild.firstChild.checked='true';
            thisCarStatusDiv.parentNode.parentNode.scrollIntoView(false);
            carStatusDivs.snapshotItem(bigMoneyCarId).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.scrollIntoView(false);
            hasCarToPark = "YES"
        }
    }
    if (hasCarToPark = "NO"){//都有车位的，选中目前收益最高的
	    for (i=0;i<carStatusDivs.snapshotLength;i++){
	        thisCarStatusDiv = carStatusDivs.snapshotItem(i);
	        GM_log(thisCarStatusDiv.innerHTML);
	        if (/免费车位/.test(thisCarStatusDiv.innerHTML)){
            thisCarStatusDiv.parentNode.parentNode.firstChild.firstChild.checked='true';
            thisCarStatusDiv.parentNode.parentNode.scrollIntoView(false);
            carStatusDivs.snapshotItem(bigMoneyCarId).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.scrollIntoView(false);
            hasCarToPark = "YES"
	        }
	    }
    }
    if (hasCarToPark = "NO"){//都有车位的，选中目前收益最高的
	    for (i=0;i<carStatusDivs.snapshotLength;i++){
	        thisCarStatusDiv = carStatusDivs.snapshotItem(i);
	        GM_log(thisCarStatusDiv.innerHTML);
	        if (/\d+(?=元)/.test(thisCarStatusDiv.innerHTML)){
                thisMoneyGet = thisCarStatusDiv.innerHTML.match(/\d+(?=元)/)[0]*1
                GM_log(thisMoneyGet)
                if (thisMoneyGet>moneyGet){
                    moneyGet=thisMoneyGet
                    bigMoneyCarId = i
                }
	        }
	    }
        carStatusDivs.snapshotItem(bigMoneyCarId).parentNode.parentNode.firstChild.firstChild.checked='true';
      carStatusDivs.snapshotItem(bigMoneyCarId).parentNode.parentNode.scrollIntoView(false);
      hasCarToPark = "YES"
    }
   yesBtn.scrollIntoView(false);
}
/*显示车价 总资产*/
if((location=="http://www.kaixin001.com/app/app.php?aid=1040")||(location=="http://www.kaixin001.com/app/app.php?aid=1040&url=index.php")){
   // alert("ss");
    allMyCarsImg=xpath("//div[@class='mycar']/div[@style='margin-top: -10px;']//img[@alt]")
    myAsset = 0
    for (i=0;i<allMyCarsImg.snapshotLength;i++){
     //   alert("ok");
        price=allMyCarsImg.snapshotItem(i).alt.match(/\d+(?=元)/)[0]*1;
        myAsset+=price;
        ttt=allMyCarsImg.snapshotItem(i).parentNode.parentNode.innerHTML
        allMyCarsImg.snapshotItem(i).parentNode.parentNode.innerHTML=allMyCarsImg.snapshotItem(i).parentNode.parentNode.innerHTML+"<br/>价格 "+price+"元"
    }
    myCash=xpath("//div[@id='mycash']").snapshotItem(0);
    cash = myCash.innerHTML.match(/\d+/)[0];
    GM_setValue("carGameCash",cash)
    myCash.innerHTML = myCash.innerHTML+"<br/><br/><span style='font-size:12px;line-height:9px;'>车队价值 "+myAsset+"元"+"<br/><br/>资产总值 "+(cash*1+myAsset*1)+"元</span>"

    /*获得有自己车的朋友的列表*/
    myCarWhere=xpath("//div[@class='mc_inf']//a")
    try{
        owners=new Array;
        for(i=0;i<myCarWhere.snapshotLength;i++){    
            parkingLotOwner = myCarWhere.snapshotItem(i).innerHTML.match(/.*(?=的私家车位)/)[0]
            var marked='no'
            for ( j = 0; j < owners.length; j++ ) {
//                GM_log(owners[j]+"-"+parkingLotOwner)
           		if(parkingLotOwner==owners[j]){
                    marked='yes'
//                    alert("!");
                }
            }
            if(marked=='no'){
                owners.push(parkingLotOwner)
            }
        }
//        alert(owners);
    }catch(e){alert(e)}
    /*朋友列表重新排序*/
    friendList = xpathOne("//div[@class='hytc_area']")
    v_frienddata=unsafeWindow.v_frienddata
    var len = v_frienddata.length;
    v_fhtml = "";
    emp="";
    halfEmp="";
    full="";
    for (var i=0; i<len; i++){
        temp="";
        temp += '<ul class="hytc">';
        hasMyCar="no";
        for ( j = 0; j <owners.length; j++ ) {
            if(owners[j]==v_frienddata[i]["real_name"]){
                hasMyCar="yes";
            }
        }
        if(hasMyCar=="yes"){
            hasMyCar="@"
        }else{
            hasMyCar=""; 
        }
        if (parseInt(v_frienddata[i]["neighbor"])){
            temp += '<li class="w60"><a href="javascript:gotoneighbor(' + v_frienddata[i]["uid"] + ');" class="sl" title="' + v_frienddata[i]["real_name"] + '">' + v_frienddata[i]["real_name"] + '</a></li>';
            temp += '<li class="w75">(' + v_frienddata[i]["ta"] + '是邻居)</li>';
        }
        else{
            temp += '<li style="width:75px;"><span style="color:red">'+hasMyCar+'</span><a href="javascript:gotouser(' + v_frienddata[i]["uid"] + ');" class="sl" title="' + v_frienddata[i]["real_name"] + '">'+ v_frienddata[i]["real_name"] + '</a></li>';
            temp += '<li style="width:40px;">'+'<A HREF="javascript:showUserCar(' + v_frienddata[i]["uid"] + ', \'' + v_frienddata[i]["ta"] + '\');"><img src="http://img.kaixin001.com.cn/i2/park/car.gif" title="' + v_frienddata[i]["ta"] + '的汽车" align="absmiddle" /></A> <A HREF="/home/?uid=' + v_frienddata[i]["uid"] + '"><img src="http://img.kaixin001.com.cn/i2/park/home.gif" title="' + v_frienddata[i]["ta"] + '的开心网首页" align="absmiddle" /></A></li>';
        }
        temp += '<li style="width:20px;"> '+(v_frienddata[i]["online"]=='1'?'<img src="http://img.kaixin001.com.cn/i/u_zx1.gif" alt="在线" align="absmiddle"/>' :'&nbsp;')+ '</li>';
        try{if (parseInt(v_frienddata[i]["full"]) == 1){
            full+=temp
            full += '<li style="float:right;"><img src="http://img.kaixin001.com.cn/i2/park/man.gif" alt="满" align="absmiddle" /> </li>';
            full += '</ul>';
        }
        else if (parseInt(v_frienddata[i]["full"]) == 2){
            halfEmp+=temp
            halfEmp += '<li style="float:right;"><img src="http://img.kaixin001.com.cn/i2/park/half_full.gif" alt="私家车位已满" align="absmiddle" /> </li>';
            halfEmp += '</ul>';
        }else{
            emp+=temp;
            emp += '<li> </li>';
            emp += '</ul>';
        }}catch(e){alert(e);}
    }
    v_fhtml=emp+halfEmp+full;
//    friendList.setAttribute('style','height:550px;');
    friendList.innerHTML=v_fhtml

    /*隐藏满车位的人
    fullLots = xpath("//img[@src='http://img.kaixin001.com.cn/i2/park/half_full.gif' or @src='http://img.kaixin001.com.cn/i2/park/man.gif']//ancestor::ul")
    for(i=0;i<fullLots.snapshotLength;i++){
        fullLots.snapshotItem(i).setAttribute('style', 'display: none;');
    }*/
}
/*以旧换新显示车价*/
if(/parking\/updatecar\.php/.test(location)){
//alert(GM_getValue("carGameCash",0));
    allMyCarsImg=xpath("//div[@class='l']//img[@alt]")
    for (i=0;i<allMyCarsImg.snapshotLength;i++){
        try{price=allMyCarsImg.snapshotItem(i).alt.match(/\d+(?=元)/)[0]*1;
        ttt=allMyCarsImg.snapshotItem(i).parentNode.parentNode.innerHTML
        allMyCarsImg.snapshotItem(i).parentNode.parentNode.innerHTML=allMyCarsImg.snapshotItem(i).parentNode.parentNode.innerHTML+"<br/>价格 "+price+"元";}catch(e){}
    }
    exchangeTitle=xpathOne("//div[@class='f13 mt30 mb10']")
    exchangeTitle.innerHTML=exchangeTitle.innerHTML+"(现金 "+GM_getValue("carGameCash",0)+")"
}

/*朋友买卖*/
/*记录被买过的次数*/
if((/1028/).test(location)){
    mySlaves = xpath("//div[@id='hasslavelist']//strong/a[contains(@href,'/~slave/index.php?uid')]")
    buyTime = xpath("//div[@style='margin-top: 0px; text-align: center;']")
    if(mySlaves){
        GM_setValue("slaveCount",mySlaves.snapshotLength);
        for(i=0;i<mySlaves.snapshotLength;i++){
            sN=mySlaves.snapshotItem(i).href.match(/\d+/g)[1]
            sC=buyTime.snapshotItem(i).innerHTML.match(/\d+/g)[0]
            logToConsole(sN)
            logToConsole(sC)
            GM_setValue("slave_"+sN,sC)
        }
    }
}
/*购买时显示被买过的次数*/
if((/selslave_dialog/).test(location)){
    buyables=xpath("//a[contains(@href,'gotouser')]")
    if(buyables){
        for(i=0;i<buyables.snapshotLength;i++){
            uid = buyables.snapshotItem(i).href.match(/\d+/)
            uC = GM_getValue("slave_"+uid,0)
            if (uC!=0){
                buyables.snapshotItem(i).innerHTML+="<span style='color:red'> +"+uC+"</span>"
            }
        }
    }        
}

/*整奴隶*/
if(/slave\/pain_dialog.php/.test(location)){
    painTypes=xpath("//input[@name='paintype']")
    for (i=0;i<painTypes.snapshotLength;i++){
        if((/去黑煤窑挖煤/.test(painTypes.snapshotItem(i).parentNode.innerHTML))||(/陪酒/.test(painTypes.snapshotItem(i).parentNode.innerHTML))){
            painTypes.snapshotItem(i).checked='true'
            painTypes.snapshotItem(i).scrollIntoView(false);
            painTypes.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.parentNode.scrollIntoView(true);
        }
    }
}
/*安抚奴隶*/
if(/slave\/comfort_dialog.php/.test(location)){
    comfortTypes=xpath("//input[@name='comforttype']")
    comfortTypes.snapshotItem(0).checked='true'
}

//div[@id='hasslavelist']//strong/a[contains(@href,'/~slave/index.php?uid')]




// ========= ADD FROM HERE ONWARDS TO YOUR SCRIPT =========
// This auto update-notification script was made by Seifer
// You can find it at http://userscripts.org/scripts/show/12193
// ========================================================
// === Edit the next four lines to suit your script. ===
scriptName='Kaixin ADO';
scriptId='32779';
scriptVersion=0.03;
scriptUpdateText='1[朋友买卖]记录每个人被我买过的次数，显示在购买列表中.2.[争车位]有停在免费车位的先选';
// === Stop editing here. ===

var lastCheck = GM_getValue('Kaixin_ado_lastCheck', 0);
var lastVersion = GM_getValue('Kaixin_ado_lastVersion', 0);
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
				+'	&quot;'+scriptName+'&quot; 已经有新版本可供下载<br>'
				+'	您目前使用的版本是 '+scriptVersion+'. 最新版本是 '+onSiteVersion+'.<br>'
				+'	<br>'
				+'	<div id="gm_update_alert_button_close">'
				+'		Close</div>'
				+'	<b>请定夺</b><br>'
				+'	<div id="gm_update_alert_buttons">'
				+'		<span id="gm_update_alert_button_showinfo"><a href="#">显示更新说明</a></span>&nbsp;&nbsp;'
				+'		<span id="gm_update_alert_button_scripthome"><a target="_blank" href="http://userscripts.org/scripts/show/'+scriptId+'">打开脚本主页</a></span>&nbsp;&nbsp;'
				+'		<span id="gm_update_alert_button_upgrade"><a href="http://userscripts.org/scripts/source/'+scriptId+'.user.js">升级到最新版本'+onSiteVersion+'</a></span>&nbsp;&nbsp;'
				+'		<span id="gm_update_alert_button_wait"><a href="#">明天之前别再提醒</a></span>&nbsp;&nbsp;'
				+'		<span id="gm_update_alert_button_waitnextversion"><a href="#">下个版本再提醒</a></span> </div>';
				document.body.insertBefore(newversion, document.body.firstChild);
				document.getElementById('gm_update_alert_button_showinfo').addEventListener('click', function(event) {alert(onSiteUpdateText);}, true);
				document.getElementById('gm_update_alert_button_wait').addEventListener('click', function(event) {GM_setValue('Kaixin_ado_lastCheck', currentTime);alert("明天之前您将不再收到提醒。");document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
				document.getElementById('gm_update_alert_button_waitnextversion').addEventListener('click', function(event) {GM_setValue('Kaixin_ado_lastVersion', onSiteVersion);alert("下一个新版本之前您将不再收到提醒。");document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
				document.getElementById('gm_update_alert_button_close').addEventListener('click', function(event) {document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
				}
			}
	});
}
//EOF