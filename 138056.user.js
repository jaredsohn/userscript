// ==UserScript==
// @author	Stroheim
// @name	EVE Datetime JST
// @description    EVE関連サイトの時間表示をUTCからJSTに変換
// @include 	   https://gate.eveonline.com/*
// @include 	   *eve-kill.net/*
// @include 	   *killmail.org/*
// @version 	   0.3
// ==/UserScript==
(function(){
	var timezoneOffset = new Date().getTimezoneOffset() /60;
	var regKB1 = new RegExp('(\\d{4})-(\\d{2})-(\\d{2}) (\\d{2}):(\\d{2})', 'g');
	var regKB2 = new RegExp('(\\d{2})-(\\d{2})-(\\d{2}) (\\d{2}):(\\d{2})', 'g');
	var regEvegate = new RegExp('(\\d{4})\\.(\\d{2})\\.(\\d{2}) (\\d{2}):(\\d{2})', 'g');
	var regKB3 = new RegExp('(\\d{2}):(\\d{2})', 'g');
	
	
	/**日付変換のメイン処理*/
	function replacement(str){
		if(regEvegate.test(str)){
			return str.replace(regEvegate,convDateFull);
		}else if(regKB1.test(str)){
			return str.replace(regKB1,convDateFull);
		}else if(regKB2.test(str)){
			return str.replace(regKB2,convDate);
		}else if(regKB3.test(str)){
			return str.replace(regKB3,convKB2);
		}else{
			return str;
		}
	}
	
	/** yy-mm-dd hh/mm日付変換*/
	function convDate(str,yy,mm,dd,h,m){
		var tmpDate = new Date();
		tmpDate.setTime(Date.UTC('20'+yy,mm-1,dd,h,m,0));
		return "JST "+ formatDate(tmpDate) ;
	}
	
	/** yyyy-mm-dd hh/mm日付変換*/
	function convDateFull(str,yy,mm,dd,h,m){
		var tmpDate = new Date();
		tmpDate.setTime(Date.UTC(yy,mm-1,dd,h,m,0));
		return "JST "+ formatDate(tmpDate) ;
	}
	
	/** hh/mm日付変換*/
	function convKB2(str,h,m){
		h = h-timezoneOffset;
		if(h > 23){
			h = "翌"+ (h-24);
		}
		return str + "(JST "+ zeropadding(h) + ":" + m + ")";
	}
	/** 日付フォーマット*/
	function formatDate(date){
		return date.getFullYear() + "-" + zeropadding(date.getMonth()-0+1) + "-" + zeropadding(date.getDate()) + " " + zeropadding(date.getHours())+ ":"+ zeropadding(date.getMinutes());
	}
	
	/**ゼロ埋め*/
	function zeropadding(val){
		return (parseInt(val, 10) < 10) ? "0" + val: val;
	}
	textnodes=document.evaluate("//text()",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	for(var i=0;i<textnodes.snapshotLength;i++){
		node=textnodes.snapshotItem(i);
		s=node.data;
		node.data=replacement(s);
	}

	//document.body.innerHTML=replacement(document.body.innerHTML);

	//document.body.innerHTML=document.body.innerHTML.replace(reg ,'$&($1:$2)'+conv(RegExp.$1,RegExp.$2));

	//document.body.innerHTML=document.body.innerHTML.replace(/\d{2}:\d{2}/g,'$1:$2');

})();
