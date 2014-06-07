// ==UserScript==
// @name        Menu
// @namespace   Demiurgos
// @description Develop Menu
// @include     http://*
// @version     1.01
// ==/UserScript==

var iDelayJQ = 0;
var srvDateTime = new DateTime();
var InfoItemsArray = [];

function DateTime(strServer){
	var dtNow = new Date();
	var that = this;
	if (strServer==undefined){
		alert(String(Math.floor(dtNow.valueOf()/1000)));
		this.strServer = String(Math.floor(dtNow.valueOf()/1000));
	}else{
		this.strServer = strServer;
	}
	
	this.Init = function(strSrv){
		this.dtServer = new Date(parseInt(strSrv)*1000);
		this.iDiffs = this.dtServer.valueOf() - dtNow.valueOf() - iDelayJQ;
	}
	this.GetCurrentTime = function(){
		var dt = new Date();
		return new Date(that.iDiffs + dt.valueOf());
	}
	
	this.IncSec = function (iSeconds){
		var dtCurrent = this.GetCurrentTime();
		return dtCurrent.setSeconds(dtCurrent.getSeconds()+iSeconds);
	}
	
	this.GetSecTimeout = function(dtTimeout){
		return Math.floor((dtTimeout.valueOf() - that.GetCurrentTime().valueOf())/1000);
	}
	this.GetMilliSecTimeout = function(dtTimeout){
		return dtTimeout.valueOf() - that.GetCurrentTime().valueOf();
	}
	this.Init(this.strServer);
}

function GetFormatValue(iValue){
	iValue = '0'+iValue;
	return iValue.substr(-2);
}

function GetFormatTimer(iDay, iHour, iMin, iSec){
	if (iDay==0 && iHour==0 && iMin==0) return iSec;
	if (iDay==0 && iHour==0) return iMin+':'+GetFormatValue(iSec);
	if (iDay==0) return iHour+':'+GetFormatValue(iMin)+':'+GetFormatValue(iSec);
	return iDay+'Д '+GetFormatValue(iHour)+':'+GetFormatValue(iMin)+':'+GetFormatValue(iSec);
}

function GetTimerString(iValue){
	if (iValue<0) return "<span style='color:#999;'>"+GetTimerString(-iValue)+"</span>";
	var iSec = iValue % 60;
	iValue = (iValue - iSec) / 60; 
	var iMin = iValue % 60;
	iValue = (iValue - iMin) / 60; 
	var iHour = iValue % 24;
	iValue = (iValue - iHour) / 24; 
	
	return GetFormatTimer(iValue, iHour, iMin, iSec);
}

function GetTimerValue(dtEnd){
	var dtNow = srvDateTime.GetCurrentTime();
	return Math.floor((dtEnd.valueOf() - dtNow.valueOf())/1000);
}

function GetTimerValueSrt(strEnd){
	var dtNow = srvDateTime.GetCurrentTime();
	var dtEnd = new Date(parseInt(strEnd));
	return Math.floor((dtEnd.valueOf() - dtNow.valueOf())/1000);
}

function IntegerValue(strName,intValue){
	if (intValue!=undefined){
		GM_setValue(strName,String(intValue));
	}
	return parseInt(GM_getValue(strName,0));
}

function StringValue(strName,strValue){
	if (strValue!=undefined){
		GM_setValue(strName,String(strValue));
	}
	return GM_getValue(strName,"");
}

function GetDivHTML(strId,strInnerHtml){
	return '<div id="'+strId+'">'+strInnerHtml+'</div>';
}

function GetTableHTML(strIdPrefix,aValues){
	var strInnerHtml = '';
	var strMouseEnter = 'onmouseenter="this.style.background=\'#AFF\';"'
	var strMouseLeave = 'onmouseleave="this.style.background=\'#FFF\';"'
	for (var i=0;i<aValues.length;i++)
		strInnerHtml += '<tr><td id="items'+strIdPrefix+i+'" style="cursor:pointer;" '+strMouseEnter+' '+strMouseLeave+'>'+aValues[i]+'</td></tr>';
	return '<table width="100%">'+strInnerHtml+'</table>';
}

function MenuInfoItem(strCaption,strType,strStoreId){
	var that = this;
	this.strStoreId = strStoreId;
	this.strHtmlId = 'div'+strStoreId;
	this.strCaption = strCaption;
	this.iLeft = 0;
	this.iTop = 0;
	this.Parent;
	
	InfoItemsArray[InfoItemsArray.length] = that;
	
	this.GetValue = function(){
		if (strType == 'timer') return GetTimerString(GetTimerValueSrt(StringValue(that.strStoreId)));
		return StringValue(that.strStoreId);
	}
	
	this.GetItemHtml = function(){
		return GetDivHTML(that.strHtmlId,that.strCaption+': '+that.GetValue());
	}
	
	this.Update = function(){
		$("#"+that.strHtmlId).html(that.strCaption+': '+that.GetValue());
	}
	
	this.OnClick = function(){	}
	
	this.ClickEvent = function(strItemId){
		return (strItemId==that.strHtmlId);
	}
}

function UpdateInfoItems(){
	for (var i=0;i<InfoItemsArray.length;i++){
		InfoItemsArray[i].Update();
	}
	
	setTimeout(UpdateInfoItems,500);
}

function MenuSimpleItem(strCaption,aValues,strStoreId){
	var that = this;
	this.strStoreId = strStoreId;
	this.strHtmlId = 'div'+strStoreId;
	this.aValues = aValues;
	this.strCaption = strCaption;
	this.iLeft = 0;
	this.iTop = 0;
	this.Parent;
	
	this.GetValueIndex = function(){
		return IntegerValue(that.strStoreId);
	}
	
	this.GetValueCaption = function(){
		return that.aValues[that.GetValueIndex()];
	}
	
	this.GetItemHtml = function(){
		return GetDivHTML(that.strHtmlId,that.strCaption+' ('+that.GetValueCaption()+')');
	}
	
	this.GetValuesHtml = function(){
		return GetDivHTML('items'+that.strHtmlId,GetTableHTML(that.strHtmlId,that.aValues));
	}
	
	this.ShowValuesSelect = function(iLeft, iTop){
		if ($("#items"+that.strHtmlId).length==0){
			$('body').append(that.GetValuesHtml());
		}else{
			$("#items"+that.strHtmlId).html(that.GetValuesHtml());
		}
		
		$("#items"+that.strHtmlId).css({
			position: "absolute", top: that.iTop+"px", left: that.iLeft+"px",
			width: 200 + "px", background: "#ffffff", border: "1px solid black"
		});
		$("#items"+that.strHtmlId).show();
	}
	this.HideValuesSelect = function(){
		$("#items"+that.strHtmlId).hide();
	}
	
	this.OnClick = function(){
		that.ShowValuesSelect();
	}
	
	this.OnClickValue = function(iIndex){
		IntegerValue(that.strStoreId,iIndex);
		that.HideValuesSelect();
	}
	
	this.ClickEvent = function(strItemId){
		if (strItemId==that.strHtmlId){
			that.OnClick();
			return true;
		}
		for (var i=0;i<that.aValues.length;i++){	
			if (strItemId=="items"+that.strHtmlId+i){
				that.OnClickValue(i);
				return true;
			}
		}
		
		that.HideValuesSelect();
		
		return false;
	}
}

function Menu(strCaption,aItems,strMenuId,isMain){
	var that = this;
	this.strCaption = strCaption;
	this.Children = aItems;
	this.strMenuId = strMenuId;
	this.iLeft = 0;
	this.iTop = 0;
	this.Parent;
	
	this.NewPosition = function(){
		for (var i=0;i<aItems.length;i++){
			aItems[i].Parent = that;
			aItems[i].iLeft = that.iLeft+100;
			aItems[i].iTop = that.iTop+8+16*i;
			if (aItems[i].NewPosition!=undefined)
				aItems[i].NewPosition();
		}
	}
	
	this.NewPosition();
	
	if (isMain==undefined){
		that.isMain = false;
	}else{
		that.isMain = isMain;
	}
	
	this.GetCaptionHtml = function(){
		if (that.strCaption=='') return '';
		
		return GetDivHTML('mCaption'+that.strMenuId,that.strCaption);
	}
	
	this.GetInnerItemsHtml = function(){
		var aItemsHtml = [];
		for(var i=0;i<that.Children.length;i++)
			aItemsHtml[aItemsHtml.length] = that.Children[i].GetItemHtml();
		
		return GetDivHTML('mTable'+that.strMenuId,GetTableHTML('mTable'+that.strMenuId,aItemsHtml));
	}
	
	this.GetItemHtml = function(){
		if (that.isMain==false) return that.GetCaptionHtml();
		
		return GetDivHTML('m'+that.strMenuId,'<center><b>'+that.GetCaptionHtml()+'</b></center>'+that.GetInnerItemsHtml());
	}	
	
	this.ClickEvent = function(strItemId){
		var result = false;
		
		if (that.isMain==false){
			if ('mCaption'+that.strMenuId==strItemId){
				var iPosition = $('#mCaption'+that.strMenuId).position();
				that.Show();
				result = true;
			}
		}
		for (var i=0;i<that.Children.length;i++){
			if (that.Children[i].ClickEvent(strItemId)) {
				result = true;
			}
		}
		if (result==false){
			if (that.isMain==false) that.Hide();	
		}else{
			that.Show();
		}
		return result;
	}
	
	this.Show = function(iLeft, iTop){
		var strMainId = "#mTable"+that.strMenuId;
		var strInnerHtml = that.GetInnerItemsHtml();
		if (that.isMain==true){
			strMainId = "#m"+that.strMenuId;
			strInnerHtml = that.GetItemHtml();
		}
		if ($("#mTable"+that.strMenuId).length==0){
			$('body').append(strInnerHtml);
		}else{
			$("#mTable"+that.strMenuId).html(that.GetInnerItemsHtml());
		}
		$(strMainId).css({
			position: "absolute", top: that.iTop+"px", left: that.iLeft+"px",
			width: 200 + "px", background: "#ffffff", border: "1px solid black"
		});
		$(strMainId).show();
	}
	this.Hide = function(){
		$("#mTable"+that.strMenuId).hide();
	}
}

function InitMenu(pMenu){
	pMenu.Show();
	
	UpdateInfoItems();
	
	document.addEventListener('click', function(event) {
		pMenu.ClickEvent(event.target.id);
	}, true);
}