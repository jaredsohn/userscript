// ==UserScript==
// @name		bahamut commend enhanced
// @namespace	http://userscripts/user
// @include		http://forum.gamer.com.tw/C.php?*
// @include		http://forum.gamer.com.tw/Co.php?*
// @description	可調整巴哈姆特哈啦討論區留言的顯示順序(新留言在上或舊留言在上)、加入留言樓層數字、單獨開啟關閉某篇文章圖片影像
// @version		1.04.3
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_addStyle
// ==/UserScript==
//滑鼠移上留言時背景底色變化
GM_addStyle(".FM-cbox10 p:hover { background-color : #eaeaea !important;}");
//記錄最後使用的留言排列順序
BHCO = GM_getValue("BHCO",false);
var rk = GM_getValue("BHCO",false);
var oldallCommend = unsafeWindow.allCommend;
var oldcloseallCommend = unsafeWindow.closeallCommend;
var oldforumShowAllMedia = unsafeWindow.forumShowAllMedia;
var oldmoreCommend = unsafeWindow.moreCommend;
//在原函式 moreCommend 中加入新功能
unsafeWindow.moreCommend = function (bsn,snB,where){
	var cptext = "Commendlist_"+snB;
	var cptmp = unsafeWindow.document.getElementById(cptext).getElementsByTagName("p");
	var ntmp = parseInt(unsafeWindow.document.getElementById("showoldCommend_"+snB).innerHTML.substring(6)) + parseInt(unsafeWindow.document.getElementById("Commendlist5_"+snB).childNodes.length)-1;
	oldmoreCommend(bsn,snB,where);
	BHC1000Wait(cptmp,ntmp,snB);
	BHCOA = BHCO;
}
//在原函式 allCommend 中加入新功能
unsafeWindow.allCommend = function (bsn,snB,where){
	var cptext = "Commendlist_"+snB;
	var cptmp = unsafeWindow.document.getElementById(cptext).getElementsByTagName("p");
	var ntmp = parseInt(unsafeWindow.document.getElementById(where).innerHTML.substring(6))+cptmp.length;
	oldallCommend(bsn,snB,where);
	BHCWait(cptmp,ntmp);
	BHCOA = BHCO;
}
//在原函式 closeallCommend 中加入新功能
unsafeWindow.closeallCommend = function (bsn,snB,where){
	oldcloseallCommend(bsn,snB,where);
	var cptext = "Commendlist_"+snB;
	var cptmp = unsafeWindow.document.getElementById(cptext).getElementsByTagName("p");
	if(BHCO == BHCOA)
		CommendOrder(cptmp,false);
	else
		CommendOrder(cptmp,true);
}
//在原函式 forumShowAllMedia 中加入新功能
forumShowAllMedia = function (a){
	GamerChangeAllBtnToClose();
	return oldforumShowAllMedia(a);
}
//開啟所有舊留言，在讀取完留言後進行新功能
function BHCWait(cps,num){
	if(cps.length<num && cps.length<6)
		unsafeWindow.setTimeout(function(){BHCWait(cps,num)}, 50);
	else
		CommendOrder(cps,BHCO,num);
}//開啟超過1000則的舊留言，在讀取完留言後進行新功能
function BHC1000Wait(cps,num,snB){
	if(unsafeWindow.document.getElementById("CommendMore_"+snB).style.display != "none")
		unsafeWindow.setTimeout(function(){BHC1000Wait(cps,num,snB)}, 50);
	else
	{
		var cptext = "Commendlist_"+snB;
		var cptmp = unsafeWindow.document.getElementById(cptext).getElementsByTagName("p");
		var newnode;
		for(i=num-1000;i>0;i--){
			newnode = unsafeWindow.document.createElement("span");
			newnode.innerHTML = i + "&nbsp:";
			newnode.setAttribute("style","color:#585858;margin:0 5px 0 -2px;");
			cptmp[i-1].insertBefore(newnode,cptmp[i-1].firstChild);
			if(BHCO)
				cptmp[i-1].parentNode.appendChild(cptmp[i-1]);
		}
	}
}

//留言加入樓數、排列順序
function CommendOrder(BHpA,rkey,num){
	var l;
	if(num && num>1000)
		l=num-1000;
	else
		l=0;
	var k = BHpA.length;
	if(k>0){
		var nodetmp,nodeIdtmp,nodeNametmp,j,m,nodeid,nodeName;
		var BHpp = BHpA[0].parentNode.parentNode.getElementsByTagName("p");
		if(BHpp[0].className == "FM-cbox10D" && k < 6 && (BHpp[0].firstChild.tagName == "A" || BHpp[0].firstChild.tagName == "a"))
			m = parseInt(BHpp[0].firstChild.innerHTML.substring(6));
		else
			m = l;
		for(j = 0;j<parseInt(k/2);j++){
			if(BHpA[j].firstChild.tagName == "BUTTON" || BHpA[j].firstChild.tagName == "button"){
				var newnode1 = unsafeWindow.document.createElement("span");
				var newnode2 = unsafeWindow.document.createElement("span");
				newnode1.innerHTML = (j+1+m) + "&nbsp:";
				newnode2.innerHTML = (k-j+m) + "&nbsp:";
				newnode1.setAttribute("style","color:#585858;margin:0 5px 0 -2px;");
				newnode2.setAttribute("style","color:#585858;margin:0 5px 0 -2px;");
				BHpA[j].insertBefore(newnode1,BHpA[j].firstChild);
				BHpA[k-j-1].insertBefore(newnode2,BHpA[k-j-1].firstChild);
			}
			if(rkey){
				nodetmp = BHpA[j].innerHTML;
				nodeIdtmp = BHpA[j].getAttribute("id");
				nodeNametmp = BHpA[j].getAttribute("name");
				BHpA[j].innerHTML = BHpA[k-j-1].innerHTML;
				BHpA[j].setAttribute("id",BHpA[k-j-1].getAttribute("id"));
				BHpA[j].setAttribute("name",BHpA[k-j-1].getAttribute("name"));
				BHpA[k-j-1].innerHTML = nodetmp;
				BHpA[k-j-1].setAttribute("id",nodeIdtmp);
				BHpA[k-j-1].setAttribute("name",nodeNametmp);
			}
		}
		if(j == (k-j-1) && (BHpA[j].firstChild.tagName == "BUTTON" || BHpA[j].firstChild.tagName == "button")){
			var newnode1 = unsafeWindow.document.createElement("span");
			newnode1.innerHTML = (j+1+m) + "&nbsp:";
			newnode1.setAttribute("style","color:#585858;margin:0 5px 0 -2px;");
			BHpA[j].insertBefore(newnode1,BHpA[j].firstChild);
		}
	}
}
//調整留言排列順序
function GamerCommendReverse(event){
	var BHDivs =(event) ? event.currentTarget.parentNode.parentNode.getElementsByTagName("div") : unsafeWindow.document.getElementsByTagName("div");
	var ek = (event) ? true : false;
	if(event){
		rk = (rk) ? false : true;
		BHCO = rk;
		GM_setValue("BHCO",rk);
	}
	for(i = 0;i < BHDivs.length;i++){
		if(BHDivs[i].className == "FM-msgbg"){
			var BHps = BHDivs[i].getElementsByTagName("p");
			CommendOrder(BHps,ek||rk);
		}
	}
}
GamerCommendReverse();
//更改開啟圖像為關閉圖像
function GamerChangeBtnToClose(BE){
	if(BE.innerHTML != "關閉圖像"){
		BE.innerHTML = "關閉圖像";
		BE.removeEventListener('click',GamerOpenImage,true);
		BE.addEventListener('click',GamerCloseImage,true);
	}
}
//更改關閉圖像為開啟圖像
function GamerChangeBtnToOpen (BE){
	BE.innerHTML = "開啟圖像";
	BE.removeEventListener('click',GamerCloseImage,true);
	BE.addEventListener('click',GamerOpenImage,true);
}
//點擊開啟全部圖像時，更改單篇開啟圖像為關閉圖像
function GamerChangeAllBtnToClose(){
	var BHPA = unsafeWindow.document.getElementsByTagName("p");
	var i;
	for(i = 0;i < BHPA.length;i++){
		if(BHPA[i].className == "FM-cbox4" && BHPA[i].childNodes.length > 2){
			GamerChangeBtnToClose(BHPA[i].lastChild);
		}
	}
}
//開啟單篇文章的圖片、影像
function GamerOpenImage(event){
	var EDivA = event.currentTarget.parentNode.parentNode.parentNode.getElementsByTagName("div");
	GamerChangeBtnToClose(event.currentTarget);
	var i,j,Mid;
	for(i = 0;i < EDivA.length;i++){
		if(BHPDivA[i].className.substring(0,8) == "FM-cbox7"){
			var EAA = EDivA[i].getElementsByTagName("a");
			if(EAA){
				for (j = 0; j < EAA.length; j++) {
					if(EAA[j].name == "attachImgName")
						unsafeWindow.attachIMG(EAA[j], 'show');
					if(EAA[j].name == "attachMovieName")
						unsafeWindow.attachMOVIE(EAA[j]);
				}
			}
		}
	}
}
//關閉單篇文章的圖片、影像
function GamerCloseImage(event){
	var EDivA = event.currentTarget.parentNode.parentNode.parentNode.getElementsByTagName("div");
	GamerChangeBtnToOpen(event.currentTarget);
	var i,j;
	for(i = 0;i < EDivA.length;i++){
		if(BHPDivA[i].className.substring(0,8) == "FM-cbox7"){
			var EAA = EDivA[i].getElementsByTagName("a");
			if(EAA){
				for (j = 0; j < EAA.length; j++) {
					if(EAA[j].name == "attachImgName")
						EAA[j].innerHTML = '<script language="javascript">showMediaClick("img")</script>請點選觀看圖片';
					if(EAA[j].name == "attachMovieName"){
						EAA[j].href = EAA[j].firstChild.getAttribute("src");
						EAA[j].innerHTML = '<script language="javascript">showMediaClick("movie")</script>請點選觀看影片';
					}
				}
			}
		}
	}
}
//單篇文章的影像、圖片若已全部開啟，將開啟圖像改為關閉圖像
function GamerImgOpenCheck(event){
	var i,ImgOpenF = true;
	var CTAA = event.currentTarget.parentNode.parentNode.getElementsByTagName("a");
	for(i = 0; i < CTAA.length; i++){
		if((CTAA[i].name == "attachImgName" || CTAA[i].name == "attachMovieName") && CTAA[i].firstChild.tagName == "SCRIPT"){
			ImgOpenF = false;
			break;
		}
	}
	if(ImgOpenF){
		var CTPA,CTPNA = event.currentTarget.parentNode.parentNode.parentNode.parentNode;
		if(CTPNA.className != "FM-cbox1")
			CTPNA = event.currentTarget.parentNode.parentNode.parentNode;
		CTPA = CTPNA.getElementsByTagName("p");
		for (i = 0; i < CTPA.length; i++){
			if(CTPA[i].className == "FM-cbox4" && CTPA[i].childNodes.length > 2)
				GamerChangeBtnToClose(CTPA[i].lastChild);
		}
	}
}
//加入改變留言順序的連結點
var BHDivA = unsafeWindow.document.getElementsByTagName("div");
for(i = 0;i < BHDivA.length;i++){
	if(BHDivA[i].className == "FM-cbox10"){
		var pchecked1 = false;
		var pchecked2 = false;
		for(j = 0;j < BHDivA[i].childNodes.length;j++){
			if(BHDivA[i].childNodes[j].className == "FM-cbox10D")
				pchecked1 = true;
			if(BHDivA[i].childNodes[j].className == "FM-msgbg" && BHDivA[i].childNodes[j].childNodes.length > 2)
				pchecked2 = true;
		}
		if(!pchecked1 && pchecked2){
			BHDivA[i].innerHTML = '<p class="FM-cbox10D"><span style="text-align:left;float:left;"><a href ="javascript:;">留言順序</a></span></p>' + BHDivA[i].innerHTML;
			BHDivA[i].firstChild.firstChild.addEventListener('click',GamerCommendReverse,true);
		}
		else if(pchecked1 && pchecked2){
			PA = BHDivA[i].getElementsByTagName("p");
			PA[0].innerHTML = '<span style="text-align:left;float:left;"><a href ="javascript:;">留言順序</a></span>' + PA[0].innerHTML;
			PA[0].firstChild.addEventListener('click',GamerCommendReverse,true);
		}
	}
}
//修改開啟圖片按鈕的連結點
var BHPA = unsafeWindow.document.getElementsByTagName("p");
for(i = 0;i < BHPA.length;i++){
	if(BHPA[i].className == "FM-cbox4"){
		BHPA[i].removeChild(BHPA[i].childNodes[2]);
		var BHPDivA = BHPA[i].parentNode.parentNode.getElementsByTagName("div");
		var k,j,Iflag = false,Oflag = true;
		for(k = 0;k < BHPDivA.length;k++){
			if(BHPDivA[k].className.substring(0,8) == "FM-cbox7"){
				var EAA = BHPDivA[k].getElementsByTagName("a");
				if(EAA){
					for(j = 0; j < EAA.length; j++){
						if(EAA[j].name == "attachImgName" || EAA[j].name == "attachMovieName"){
							Iflag = true;
							EAA[j].addEventListener('click',GamerImgOpenCheck,true);
							if(EAA[j].firstChild.tagName == "SCRIPT")
								Oflag = false;
						}
					}
				}
			}
		}
		if(Iflag){
			if(Oflag){
				BHPA[i].innerHTML = BHPA[i].innerHTML + '<a href ="javascript:;">關閉圖像</a>';
				BHPA[i].childNodes[BHPA[i].childNodes.length - 1].addEventListener('click',GamerCloseImage,true);
			}
			else{
				BHPA[i].innerHTML = BHPA[i].innerHTML + '<a href ="javascript:;">開啟圖像</a>';
				BHPA[i].childNodes[BHPA[i].childNodes.length - 1].addEventListener('click',GamerOpenImage,true);
			}
		}
	}
}
//將原有的開啟所有圖片按鈕移到右邊的浮動功能列
var BHSpanBtn = unsafeWindow.document.getElementById("groupbtn");
BHSpanBtn.innerHTML = BHSpanBtn.innerHTML + '<a class="BH-slave_btnB" href="javascript:;">開啟全部圖像</a>';
BHSpanBtn.lastChild.addEventListener('click',forumShowAllMedia,true);

