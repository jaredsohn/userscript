// ==UserScript==
// @name          pixiv plus
// @namespace     http://d.hatena.ne.jp/showchick/
// @description	  assist in browsing pixiv
// @include       http://www.pixiv.net/*
// ==/UserScript==
//Version: 201007300137
( function(){

var illust_bookmark_panel_height = 350;

var illustid = location.href.match(/\d+/);
var bm_list_html; //ブックマークしているユーザー一覧のページのresponseTextを保持
var bm_user_n; //登録数の部分の文字列を保持

//ブックマークページはiframe表示用に整える。
if(location.href.indexOf("bookmark_add.php?")>=0 && location.href.indexOf("type=illust")>=0 ){
	var b = xpath('//div[@class="box_main"]/div');
	var token_s = xpath('//input[@name="tt"]');
	var token = token_s.snapshotItem(0).value;
	var styles = '<style type="text/css">body{background-color:#F5F5F5}ul{background-color:#E9F0F8;}li{display:inline;padding:3px;}a{text-decoration:none;color:#000000 !important;}a:hover{text-decoration:none;background-color:#5596E6;color:#ffffff !important;}dl{padding:10px 20px;line-height : 30px;}</style>'
	//styles += '<link rel="stylesheet" href="http://source.pixiv.net/source/css/basic.css?20100727" type="text/css" /><link rel="stylesheet" href="http://source.pixiv.net/source/css/main.css?20100727e" type="text/css" /><link rel="stylesheet" href="http://source.pixiv.net/source/css/sprite.css?20100729a" type="text/css" /><link rel="stylesheet" href="http://source.pixiv.net/source/css/index.css?20100727d" type="text/css" />';
	var box_main_main = b.snapshotItem(1).innerHTML
	for(var i=2; i<b.snapshotLength; i++){
		box_main_main += b.snapshotItem(i).innerHTML
	}
	document.body.innerHTML = styles+'<form action="bookmark_add.php" method="post"><input type="hidden" name="mode" value="add"><input type="hidden" name="tt" value="'+ token +'"><input type="hidden" name="id" value="'+ illustid +'"><input type="hidden" name="type" value="illust"><br>'+ box_main_main +'</form>';
}

//ブックマーク完了ページもiframe表示用に整える
if(location.href=="http://www.pixiv.net/bookmark_add.php"){
	document.body.innerHTML = '<div style="margin-top:80px;margin-left:200px;">追加しました。</div>';
	document.body.style.backgroundColor = "#F5F5F5";
}

//mode=mediumページ
if(location.href.indexOf("mode=medium") >= 0){
	var spans = xpath('//div[@class="works_data"]/p');
	var span_t = spans.snapshotItem(0);
	//元画像のサイズを取得
	var bimg_size = String(span_t.innerHTML.match(/\d+×\d+/)).match(/(\d)+/g);

	//ブックマークユーザー数を取得し表示
	GM_xmlhttpRequest({
		method : "HTTP",
		url    : "http://www.pixiv.net/bookmark_detail.php?illust_id=" + illustid,
		onload : function(response){
			if (response.responseText.match(/pixiv/i)) {
				bm_list_html=response.responseText; //キャッシュを取っておく
				var result=response.responseText.match(/\d+? users/);
				//ブックマークユーザー数を挿入
				bm_user_n = result[0];
				var gm_bt = document.createElement("li");
				//gm_bt.style.cssFloat = "right";
				gm_bt.innerHTML = '<a id="bm_list" href="http://www.pixiv.net/bookmark_detail.php?illust_id='+illustid+'" class="bookmark_link">'+ bm_user_n +'</a>';
				
				var insert_position_s = xpath('//div[@class="works_iconsBlock"]/ul/li');
				var insert_position_t = insert_position_s.snapshotItem(0);
				insert_position_t.parentNode.insertBefore(gm_bt, insert_position_t);
			}
			else{
				bm_list_html = "error.";
			}
		}
	});


	document.addEventListener("click", function(event){
		if(event.button==0){
			//alert(String(event.target));

		//「このイラストをブックマークする」ボタンでiframeを開く
		if(String(event.target).indexOf("bookmark_add.php?")>=0 && String(event.target).indexOf("type=illust")>=0){
			event.stopPropagation();
			event.preventDefault();
			if( !document.getElementById("bm_panel") ){
				var bm_panel = document.createElement('div');
				bm_panel.id="bm_panel";
				bm_panel.width="700px";
				bm_panel.height= (illust_bookmark_panel_height+30)+"px";
				with(bm_panel.style) {
					position = "fixed";
					top = parseInt(document.documentElement.clientHeight/2 - (illust_bookmark_panel_height+30)/2) + "px";
					left = parseInt(document.documentElement.clientWidth/2 - 350) + "px";
					border = "1px solid #B7B7B7";
					backgroundColor = "#F5F5F5";
					opacity = "0.9";
					zIndex = "100";
					overflow = "visible";
					display = "";
				}
				bm_panel.innerHTML = '<span class="f14b" style="float:left;">ブックマークに追加</span><a href="javascript:void(close_bm)" style="position:absolute;top:0px;right:0px;">×閉じる</a><br clear><iframe src="http://www.pixiv.net/bookmark_add.php?illust_id='+ illustid +'&type=illust" style="width:700px;height:'+illust_bookmark_panel_height+'px;border:none;background-color:#F5F5F5">';
				document.body.appendChild(bm_panel);
			}
			else{
				switch_panel("bm_panel");
			}
		}

		else if(String(event.target).indexOf("close_bm") >= 0){
			hide_panel("bm_panel");
		}
		else if(String(event.target).indexOf("close_list") >= 0){
			hide_panel("list_panel");
		}
		else if(String(event.target).indexOf("max_list") >= 0){
			var list_panel_=document.getElementById("list_panel").style;
			var bm_list_main_ = document.getElementById("bm_list_main").style;
			switch( list_panel_.top ){
				case "20px":
					list_panel_.top = parseInt(document.documentElement.clientHeight/2 - 180) + "px";
					list_panel_.height = "360px";
					bm_list_main_.height = "320px";
					break;
				default:
					list_panel_.top = "20px";
					list_panel_.height = parseInt(document.documentElement.clientHeight - 40) + "px";
					bm_list_main_.height = parseInt(document.documentElement.clientHeight - 80) + "px";
			}
		}
		
		//「拡大する」ボタン
		else if( String(event.target.getAttribute("src")).indexOf(illustid)>=0 && event.button==0 && bimg_size.length>0 ){
			event.stopPropagation();
			event.preventDefault();

			//bimgは既に存在し、非表示になっているとき：表示に切り替える
			if( document.getElementById("bimg") ){
				bimg = document.getElementById("bimg");
				if(bimg.style.display=="none")
					bimg.style.display="";
				else
					bimg.style.display="none";
			}
			//bimgがまだないとき、つまり初めて拡大するとき
			else{
				var imgs = document.getElementsByTagName("img");
				for(var i=0; i<imgs.length; i++){
					if(imgs[i].src.indexOf(illustid + "_m")>0){
						var mimg = imgs[i];
						//mimgの絶対座標を取得する
						var mimg_x = mimg.offsetLeft;
						var mimg_y = mimg.offsetTop;
						//中心軸を中心に拡大する
						mimg_x = parseInt(mimg_x + mimg.width/2 -  bimg_size[0]/2);
						if(mimg_x<0) mimg_x=0;

						var bimg_url = mimg.src.replace(/_m(\.((jpg)|(jpeg)|(gif)|(png)))/,"$1");
						var b_img = document.createElement('img');
						b_img.id = "bimg";
						b_img.src = bimg_url;
						with(b_img.style){
							position="absolute";
							top = mimg_y + "px";
							left = mimg_x + "px";
							//border = "5px ridge #B7B7B7";
							display="";
							//width = "100%";
						}
						document.body.appendChild(b_img);
						var bimg = document.getElementById("bimg");
						break;
					}
				}
			
			}
		}
			
			
			
			
			
			

		} //if(event.button==0)を閉じる
	},true);
}


//XPath
function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

//idの表示・非表示を切り替える
function switch_panel(id){
	switch(document.getElementById(id).style.display){
		case "": document.getElementById(id).style.display="none";break;
		case "none": document.getElementById(id).style.display="";break;
		default:;
	}
}

//idが存在すれば非表示にする
function hide_panel(id){
	if( document.getElementById(id) ){
		document.getElementById(id).style.display="none";
	}
}


})();
