// ==UserScript==
// @name           nicovideo_ranking_with_addmylist
// @include         http://www.nicovideo.jp/mylist_add/video/*
// @include         http://www.nicovideo.jp/ranking*
// ==/UserScript==
/*
■参考スクリプト
pixiv plus　→　showchick様　　http://userscripts.org/scripts/show/94024
*/

var oStyle = document.createElement('style');
oStyle.setAttribute('type','text/css');
oStyle.innerHTML='#ranking_sub .mylist,.content_312 .mylist{display:none!important;}.video .itemThumb img{width:130px!important;height:100px!important;margin-left:0!important;margin-top:0!important;}.videoList01 .videoList01Wrap{width:140px!important;}.videoList01 li.item.videoRanking{border-bottom:1px solid #444444 !important;padding-top:5px!important;}.videoList01 .itemContent .itemTitle{margin-top:0!important;}.video .uadlevel6 .itemThumbWrap:before, .video .uadlevel7 .itemThumbWrap:before, .video .uadlevel8 .itemThumbWrap:before, .video .uadlevel9 .itemThumbWrap:before, .video .uadlevel10 .itemThumbWrap:before , .video .uadlevel1 .itemThumbWrap:before, .video .uadlevel2 .itemThumbWrap:before, .video .uadlevel3 .itemThumbWrap:before, .video .uadlevel4 .itemThumbWrap:before, .video .uadlevel5 .itemThumbWrap:before{background-size:130px 100px!important;height:100px!important;}.video .itemThumb{width:130px!important;height:100px!important;}';
document.getElementsByTagName('head')[0].appendChild(oStyle);

if(document.location.href.search(/http:\/\/www\.nicovideo\.jp\/mylist_add\/video\/.+/)!=-1){
	document.getElementById("select_group").value="default";
	setTimeout(function(){
		var submit=document.getElementsByClassName("submit")[0];
		submit.focus();
		submit.click();
	},1000);
}else if(window.parent.location.href.slice(0,38)=="http://www.nicovideo.jp/ranking/matrix"){
	var watches = document.getElementsByClassName("itemThumbWrap");
	for(var i = 0; i < watches.length; i++) {
		var titleElm = watches[i];
		var videoid = titleElm.href.replace(/http:\/\/www\.nicovideo\.jp\/watch\/(sm|nm|so)([0-9]+)\?*.*/,"$1$2");

		var mplus = document.createElement('a');
		mplus.innerHTML='+Mylist';
		mplus.href="javascript:void(0);";
		mplus.title = "http://www.nicovideo.jp/mylist_add/video/"+videoid;
		mplus.setAttribute("class","mylist");
		titleElm.parentNode.parentNode.appendChild(mplus);
			
		mplus.addEventListener("click",function(e){
			var obj = document.createElement('div');
			obj.setAttribute("style","position:fixed;top:50px;left:0px;width:480px;height:350px;border:2px solid #000000;background-color:#FFFFFF;opacity:0.9;")
			obj.innerHTML = '<iframe src="'+this.title+'" style="width:480px;height:350px;overflow:hidden;border:none;"></iframe>';
			document.body.appendChild(obj);
			setTimeout(function(){
			document.body.removeChild(obj);
			},2000);
		},false);
	}
}else{
	var watches = document.getElementsByClassName("itemThumbWrap");
	for(var i = 0; i < watches.length; i++) {
		var titleElm = watches[i];
		var videoid = titleElm.href.replace(/http:\/\/www\.nicovideo\.jp\/watch\/(sm|nm|so)([0-9]+)\?*.*/,"$1$2");

		var mplus = document.createElement('a');
		mplus.innerHTML='+Mylist';
		mplus.href="javascript:void(0);";
		mplus.title = "http://www.nicovideo.jp/mylist_add/video/"+videoid;
		mplus.setAttribute("class","mylist");
		titleElm.parentNode.parentNode.parentNode.getElementsByClassName("rankingNumWrap")[0].appendChild(mplus);
			
		mplus.addEventListener("click",function(e){
			var obj = document.createElement('div');
			obj.setAttribute("style","position:fixed;top:50px;left:0px;width:480px;height:350px;border:2px solid #000000;background-color:#FFFFFF;opacity:0.9;")
			obj.innerHTML = '<iframe src="'+this.title+'" style="width:480px;height:350px;overflow:hidden;border:none;"></iframe>';
			document.body.appendChild(obj);
			setTimeout(function(){
			document.body.removeChild(obj);
			},2000);
		},false);
	}
}