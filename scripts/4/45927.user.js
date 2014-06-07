// ==UserScript==
// @name           NicoRankingKidokuDelete
// @namespace      Momiyama
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @include        http://www.nicovideo.jp/ranking/*
// @include        http://www.nicovideo.jp/ranking
// ==/UserScript==
    var style = 
      <><![CDATA[
                .menu_palet{ display:none;}
                 ]]></>;
    GM_addStyle(""+style);
    palets = $("p.menu_palet",document.body);
    for(var i=0;i<palets.length;i++){
    	palets[i].parentNode.innerHTML="";
    }
GM_setValue("midoku_on","off");
	//テンポラリ変数群
	var remds  = new Array();	// リンククローンのリスト
	var remp   = new Array();	
	var remdiv = new Array();	// 各動画divのリスト
	var remdivp = new Array();	// 各動画divの属するブロックのリスト
	var sendiv = new Array();	// 各宣伝divのリスト
	var remchilds = new Array();
	var remLock = false;	
	var rankingRows = getRankingRows();	//ランキング列数判定。TOPなら6
	var smallTypName = (rankingRows==1) ? "small_typ" : "small_typ6";
	var aaaName = (rankingRows==1) ? "[拡大表示]" : "[○]";
	var aaa2Name = (rankingRows==1) ? "[別窓で開く]" : "";
	var aaa3Name = (rankingRows==1) ? "[保護 ON/OFF]" : "[保]";
	GM_log("ニコニコランキング既読削除スクリプト実行中 rankingRows: "+rankingRows);
	
	function getRankingRows(){
		if(document.getElementsByClassName("content_672").length!=0){
			return 1;
		}
		else{
			return 6;
		}
	}
	function pickLink(d){
		return $("a.watch",d)[0];
	}
	var pppq=0;
	function isKidoku(d){
		var id = $(d).attr("id");
		return $("#"+id+" a.watch:visited").length>0;
	}
	//宣伝カット
	function senCut(){
		var t = (GM_getValue("senden")=="on");
		for each(sen in sendiv){			
			if(t){
				sen.style.visibility="collapse";
				//$(sen).hide();
			}
			else{
				sen.style.visibility="visible";
				//$(sen).show();
			}
		}
	}
	
	//ラベル再設定用テンポラリ変数
	var labtmp = new Array();
	//ラベルの再設定
	function labelSet(){
		for each(d in remdiv){	
			labelSetOne(d);
		}
	}
	function labelSetOne(d){
		var	labEnable = GM_getValue("L_"+pickLink(d));	
		if (!labEnable) {
			document.getElementById("L_" + pickLink(d)).style.color = "";
			if(rankingRows==1){					
				d.style.borderLeftColor = "";
				d.style.borderLeftWidth = "";
			}
		}
		else {
			document.getElementById("L_" + pickLink(d)).style.color = "red";
			if(rankingRows==1){										
				d.style.borderLeftColor = "red";
				d.style.borderLeftWidth = "5px";
			}
		}
	}
	function remOne(d,b){
		var p;	//フラグ。項目を残すときはtrue, 削除するときはfalseが設定される
		var pp = false;
		var dLink = pickLink(d);
		
		//フラグpの設定		
		if (GM_getValue("L_" + dLink)) {
			p = true;
			pp=true;
		}
		else if(b!=null) p = b;
		else{
			var p1 = GM_getValue(pickLink(d));	// true,false,nullの三択
			var p2 = isKidoku(d) && (GM_getValue("kidoku_off")=="on");
			if(p1==null) 	p = !p2;
			else 			p = !p1;	
			if(GM_getValue("midoku_on")=="on" && !p2) p = true;
		}

if(GM_getValue(smallTypName)=="disable") p=true;
		var dParent = $(d.parentNode);
		// 縮小hidden化実行-------------------------------------------------
		if(rankingRows==1){
			if(!p && GM_getValue(smallTypName)=="hidden"){
				dParent.hide();
			}
			else{
				dParent.show();
			}
		}
		//透明度設定
		var nextOp;
		if(!p && GM_getValue(smallTypName)=="opacity"){
			nextOp=0.5;
		}
		else{
			nextOp=1;
		}
		if(nextOp!=d.style.opacity) d.style.opacity=nextOp;

		// 開閉ボタンの再設定
		if(pp){
			document.getElementById(dLink).innerHTML = "";
		}
		else{	
			document.getElementById(dLink).innerHTML = !p ? aaaName : "[×]";
		}

		// 縮小版生成動作-------------------------------------------------
		if(remp[d.id]!=p){
			//tmp変数の再設定
			remp[d.id]=p;

			for each(r in remchilds[d.id]){
				if(!!r){
					if(p) $(r).show();
					else $(r).hide();
				}
			}

			var rate = p ? 1:2.2;
			var vk = d.getElementsByTagName("img")[0];
			vk.style.width = Math.floor(96 / rate) + "px";
			vk.style.height = Math.floor(72 / rate) + "px";
			vk.src = vk.src;
		}
	}

	//動画の開閉を行う関数
	function rem(){
		if(!remLock){ //一応ロックかけとく
			remLock = true;
			for each(d in remdiv){
				remOne(d,null);
			}
			remLock=false;
		}
	}

	function labelElement(str,che){
		var k = document.createElement("label");
		k.innerHTML = str;
		k.style.cursor = "hand";
		k.setAttribute("for",che);
		k.style.fontSize = "12px";
		return k;
	}

	//「ランキング」の部分をボタンに置換，開閉ボタンの設置
	function interface_kidoku(){
		var prefDiv = document.createElement("div");
			prefDiv.style.width = "250px";
			prefDiv.style.height = "170px";
			prefDiv.innerHTML = 
				"<font style=font-size:12px;font-weight:bold>" + 
				"NicoRankingKidokuDelete settings" + 
				"</font><br>";
			prefDiv.style.backgroundColor = "white";
			prefDiv.style.color = "black";
			prefDiv.style.border = "2px solid #888";
			prefDiv.style.position = "absolute";	// "fixed";
if(getRankingRows()==1){
			prefDiv.style.top = "40px";
			prefDiv.style.left = "680px";
}
else{
			prefDiv.style.top = "0px";
			prefDiv.style.left = "560px";
}
			prefDiv.style.zIndex = 10;
			prefDiv.style.opacity = 0.9;
			prefDiv.style.lineHeight = 1.0;
			prefDiv.style.display = 
				(GM_getValue("prefDisplay") == "none") ? "none" : "";
			prefDiv.id = "prefDiv";
			var firstChild = document.getElementById("PAGEBODY");
			document.getElementById("PAGEMAIN").style.position="relative";
			document.getElementById("PAGEMAIN").insertBefore(prefDiv,null);

		var linkRem = document.createElement("input");
			linkRem.name = "kidoku_off";
			linkRem.type = "checkbox";
			linkRem.caption = "既読の動画を縮小の対象にする";
			linkRem.defaultValue = "on";
		var linkMid = document.createElement("input");
			linkMid.name = "midoku_on";
			linkMid.type = "checkbox";
			linkMid.caption = "未読の動画を強制的に表示する";
			linkMid.defaultValue = "on";
		var linkSen = document.createElement("input");
			linkSen.name = "senden";
			linkSen.type = "checkbox";
			linkSen.caption = "宣伝コメントを消去する";
			linkSen.defaultValue = "on";
		var linkTyp1 = document.createElement("input");
			linkTyp1.name = smallTypName;
			linkTyp1.type = "radio";
			linkTyp1.caption = "普通に縮小する";
			linkTyp1.value = "normal";
			linkTyp1.defaultValue = linkTyp1.value;
		var linkTyp2 = document.createElement("input");
			linkTyp2.name = smallTypName;
			linkTyp2.type = "radio";
			linkTyp2.caption = "縮小対象を半透明にする";
			linkTyp2.value = "opacity";
		var linkTyp3 = document.createElement("input");
			linkTyp3.name = smallTypName;
			linkTyp3.type = "radio";
			linkTyp3.caption = "縮小対象を非表示にする";
			linkTyp3.value = "hidden";
		var linkTyp4 = document.createElement("input");
			linkTyp4.name = smallTypName;
			linkTyp4.type = "radio";
			linkTyp4.caption = "縮小しない";
			linkTyp4.value = "disable";
		var form = document.createElement("form");
		var links = 
			[linkRem, linkSen,  linkTyp1, linkTyp2, linkTyp3, linkTyp4];

		for each(link in links){
			//初期化
			if (!GM_getValue(link.name)) {
				GM_setValue(link.name, link.defaultValue);
			}
			//typeによって場合わけ
			if (link.type == "checkbox") {
				link.id = link.name;
				link.checked = (GM_getValue(link.name) != "on") ? false : true;
				link.addEventListener("click", function(e){
					//値の更新
					GM_setValue(this.name, 
							(GM_getValue(this.name) != "on") ? "on" : "off");
					// 押した直後の処理
					if(this==linkRem || this==linkMid) rem();
					else if(this==linkSen) senCut();
				}, true);
			}
			else if (link.type == "radio"){
				link.id = link.name+link.value;
				link.checked = (GM_getValue(link.name) == link.value) ? true:false;
				link.addEventListener("click", function(e){
					//値の更新
					GM_setValue(this.name, this.value);
					// 押した直後の処理
					rem();
				}, true);
			}
		}
		//登録
		form.appendChild(linkRem);
		form.appendChild(labelElement(linkRem.caption, linkRem.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkSen);
		form.appendChild(labelElement(linkSen.caption, linkSen.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(document.createElement("br"));
		form.appendChild(labelElement("------縮小方法------", ""));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkTyp1);
		form.appendChild(labelElement(linkTyp1.caption, linkTyp1.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkTyp2);
		form.appendChild(labelElement(linkTyp2.caption, linkTyp2.id));
		form.appendChild(document.createElement("br"));
if(rankingRows==1){
		form.appendChild(linkTyp3);
		form.appendChild(labelElement(linkTyp3.caption, linkTyp3.id));
		form.appendChild(document.createElement("br"));	
}	
		form.appendChild(linkTyp4);
		form.appendChild(labelElement(linkTyp4.caption, linkTyp4.id));
		form.appendChild(document.createElement("br"));		

		prefDiv.appendChild(form);
		prefDiv.style.zIndex = "100";

		var prefSw = document.createElement("input");
		prefSw.type = "button";
		prefSw.className = "submit";
		prefSw.addEventListener("click",function(e){
			prefDiv.style.display = 
				(prefDiv.style.display　== "") ? "none" : "";
			GM_setValue("prefDisplay",prefDiv.style.display);
		},false);
		prefSw.value = "[KidokuDelete] 縮小設定開閉";
		var prefSwContainer;
		var setPref;
if(getRankingRows()==1){
		setPref = document.getElementById("PAGEBODY").getElementsByTagName("td")[2];
}
else{
		setPref = document.getElementById("PAGEBODY").getElementsByTagName("td")[0];
}
		prefSwContainer = document.createElement("form");
		prefSwContainer.appendChild(prefSw);
		setPref.appendChild(prefSwContainer);

		//setPref.style.position = "relative";


		// 開閉ボタンの生成とか--------------------------------------------------------
		for each(d in remdiv){
			var btn = document.createElement("div");
			btn.style.textAlign="right";
			btn.style.opacity=0.8;
			btn.align="right";
			btn.style.position = "absolute";
			btn.style.width= (rankingRows==1) ? "250px" : "136px";
			btn.style.top="0px";
			btn.style.left= (rankingRows==1) ? "403px" : "0px";
			var aaa = document.createElement("a");
			aaa.id = pickLink(d);
			aaa.innerHTML = "[×]";
			aaa.href = "javascript:;";
			aaa.style.textDecoration ="none";
			aaa.style.fontWeight ="bold";
			aaa.style.fontSize="12px";
			aaa.style.backgroundColor="white";
			function outer1(){
				var dd = d;
				return function(e){
					if(this.innerHTML == "[×]"){
						GM_setValue(this.id, true);
						remOne(dd, null);
					}
					else{
						this.innerHTML = "[×]";
						remOne(dd, true);
					}
				}
			}
			aaa.addEventListener("click", outer1(), true);
			var aaa2 = document.createElement("a");
			aaa2.innerHTML = aaa2Name;
			aaa2.href = "javascript:;";
			//aaa2.target = "_blank";
			aaa2.style.textDecoration ="none";
			aaa2.style.fontWeight ="bold";
			aaa2.style.fontSize="12px";
			aaa2.style.backgroundColor="white";
			function outer2(){
				var dd = d;
				var pl = "L_"+pickLink(d);
				var href= pickLink(d).href;
				return function(e){
					window.open(href);
					if (e.button != 2 && GM_getValue("kidoku_off") == "on" && !GM_getValue(pl)) {
						remOne(dd, false);
					}
				}
			}
			aaa2.addEventListener("click", outer2(), true);
			var aaa3 = document.createElement("a");
			aaa3.id = "L_"+pickLink(d);
			aaa3.innerHTML = aaa3Name;
			aaa3.href = "javascript:;";
			aaa3.setAttribute("style",
				"text-decoration:none;font-weight:bold;font-size:12px;" +
				"background-color:white;"
			);
			function outer3(){
				var dd = d;
				return function(e){
					GM_setValue(this.id,!GM_getValue(this.id));
					labelSetOne(remdiv[dd.id]);
					remOne(remdiv[dd.id]);
				}
			}
			aaa3.addEventListener("click", outer3() , true);

			btn.appendChild(aaa3);
			btn.appendChild(aaa2);
			btn.appendChild(aaa);
			var menuAdded = (rankingRows==1) ? d : d.getElementsByTagName("div")[0];
			menuAdded.style.position="relative";
			menuAdded.appendChild(btn);

			// 非表示対象要素の設定
			setRemchilds(d);

			function outer4(){
				var dd = d;
				function ret(){
					remOne(dd);
				}
				return function(e){
					if (e.button != 2 && GM_getValue("kidoku_off") == "on") {
						setTimeout(ret,250);
					}
				}
			}
			// mouseupを拾う
			pickLink(d).addEventListener("mousedown",outer4(), true);
			// mouseupを拾う
			pickLink(d).addEventListener("mouseup",outer4(), true);
		}
	}

	function parentDiv(a){
		var k = a;
		while(true){
			k = k.parentNode;
			if (k==null || k.tagName == "DIV") {
				break;
			}
		}
		return k;
	}

	function setRemchilds(d){
		if(rankingRows==1){
			var tds = d.getElementsByTagName("td");
			remchilds[d.id]=[
				 tds[0].getElementsByTagName("p")[0],
				 tds[0].getElementsByTagName("p")[2],
				 tds[2].getElementsByTagName("p")[0],
				 tds[2].getElementsByTagName("p")[1],
				 tds[2].getElementsByTagName("p")[3],
				 tds[2].getElementsByTagName("p")[4],
			];
		}
		else{
		}
	}
	//テンポラリ変数の初期化
	function init(){
		//rankingRowsが6のとき
		if(rankingRows==6){
			var divs = document.getElementsByTagName("td");		
			for each(d in divs){
				if (d.id){
					if (d.id.indexOf("item") != -1){
						remdiv[d.id] = d;
					}
				}
			}
		}
		//rankingRowsが1のとき
		if(rankingRows==1){
			var divs = document.getElementsByTagName("div");
			for each(d in divs){
				if (d.id && d.id.indexOf("item") != -1){
					if (d.id.indexOf("current") == -1) {
						remdiv[d.id] = d;
					}
					else{
						sendiv[d.id] = d;
					}
				}
			}
		}
	}	

	//初期化
	init();
	interface_kidoku();
	rem();
	senCut();
	labelSet();
