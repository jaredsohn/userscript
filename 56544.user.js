// ==UserScript==
// @name           wonderfl_window
// @namespace      http://yoropan.no.coocan.jp/wp/
// @description    wonderflのブログパーツをtwitterのweb画面で展開します。
// @include        http://twitter.com/*
// @include        http://friendfeed.com/*
// ==/UserScript==
(function() {

    $ = unsafeWindow.jQuery;
    jQuery = $;

//----------------------------------------
// displayスタイルの変更(トグル)
//----------------------------------------        
	function clickfn(id){
		var chview="$('#ww_"+id+"').toggle()"
		return chview
	}
		

//----------------------------------------
// 表示範囲の計測
//----------------------------------------

	 var winHeight;
	 function chkarea(pos){
	 
	 //console.log("pos"+pos+"num"+num+"nowArr"+nowArr)

		 if(pos<0){
		 return false//"表示エリア内"
		 }else if(pos<=winHeight){
		 return true//"表示エリア外"
		 }else{
		 return false//"表示エリア外"
		 }
	 }
 
		
		var idArr=[]
		var nowArr=0
		var num=0
		var wnd//http://wonderfl.net/code/を含むリンクタグ
		var wlink//アドレス
		var wid//ID
		
		/*
		くり返し処理
		*/
		function insPart(flg){

		wnd= $("a[href^='http://wonderfl.net/code/']").not("#currently a")
		wnd.slice(num).each(
			function(){
					wlink=$(this).attr("href")
					wid=wlink.replace('http://wonderfl.net/code/','')
					if(wid.lastIndexOf("/")!=-1){
					wid=wid.slice(0,wid.lastIndexOf("/"))
					}
					/*
					ロード条件
					*/	
					switch (flg) {		
					
	//----------------------------------------
	//最初のロード
	//----------------------------------------
					case "ini":
						//トグルスイッチ挿入
						$(this).parent().parent().parent().append('<div id="ww_'+ num +'_trg" onclick="'+clickfn(num)+'" style=" text-decoration: underline;cursor:pointer;">-toggle window-</div><div id="ww_'+ num +'" style=" text-align: center; width: 465px;"></div>');
						
						//ウインドウ高さ取得
						winHeight=$(window).height();
						
						//iframe挿入
						if(chkarea($('#ww_'+ num +'_trg').offset().top-$(window).scrollTop())){
						$('#ww_'+ num).append('<iframe width="465" scrolling="no" height="490" style="border: 1px solid black;" src="http://wonderfl.net/blogparts/'+ wid +'" title=""/>')
						}

						//	console.log(num+"/"+($('#ww_'+ num +'_trg').offset().top-$(window).scrollTop()) + "/"+chkarea($('#ww_'+ num +'_trg').offset().top-$(window).scrollTop()));
						idArr[num]=wid;
						num++;
						nowArr=idArr.length;//処理後の配列の数
						//	console.log(idArr+"/"+nowArr)
						
			 		break;
			  
				   
	//----------------------------------------
	//AutoPagerizeのロード時
	//----------------------------------------
					case "sc":
				
						if(idArr.length==num){
							//トグルスイッチ挿入
							$(this).parent().parent().parent().append('<div id="ww_'+ num +'_trg" onclick="'+clickfn(num)+'" style=" text-decoration: underline;cursor:pointer;">-toggle window-</div><div id="ww_'+ num +'" style=" text-align: center; width: 465px;"></div>');
										
							//	console.log(num+"/"+($('#ww_'+ num +'_trg').offset().top-$(window).scrollTop()) + "/"+chkarea($('#ww_'+ num +'_trg').offset().top-$(window).scrollTop()));
										
							//ウインドウ高さ取得
							winHeight=$(window).height();

							//iframe挿入はスクロール時の処理に任せる
							if(chkarea($('#ww_'+ num +'_trg').offset().top)-$(window).scrollTop()){
							//	$('#ww_'+ num ).html(idArr[num]);
							}
						}
						idArr[num]=wid;//id追加
						num++;
						nowArr=idArr.length;//処理後の配列の数	
				  break;
				  default:
				   break;
					  }
			 	})
        
        }
//----------------------------------------
//スクロール時
//----------------------------------------

		$(window).scroll(function(){
		//ウインドウ高さ取得
		winHeight=$(window).height();
			 for(var i=0;i<nowArr;i++){
			//	console.log("chk"+i+":"+chkarea($('#ww_'+ i +'_trg').offset().top-$(window).scrollTop()))
			
				//該当IDがなければiframe挿入
				if(chkarea($('#ww_'+i +'_trg').offset().top-$(window).scrollTop())){
					if($('#ww_'+i) && i in idArr){
					$('#ww_'+ i ).html('<iframe width="465" scrolling="no" height="490" style="border: 1px solid black;" src="http://wonderfl.net/blogparts/'+ idArr[i] +'" title=""/>');
					//	$('#ww_'+ i ).html(idArr[i]);
					}
					//表示したIDは削除
					delete idArr[i];
				}
			 }	
		 })
//----------------------------------------
//ウィンドウリサイズ時
//----------------------------------------
		$(window).resize(function(){
		winHeight=$(window).height()
		 })
//----------------------------------------
//初期ロード
//----------------------------------------

		insPart("ini");

		//コンテンツの高さ保存
		var dHeight
		$(document).ready(function(){
		dHeight=$(document).height()
	//	console.log(dHeight)
		});
	
//----------------------------------------
//moreボタンクリック
//----------------------------------------
		$("#pagination a").bind("click", function(){
		 	$(window).scroll(function(){
			insPart("sc");
		//	console.log(dHeight)
			});
		});
	


//----------------------------------------
//AutoPagerize発火
//----------------------------------------
	
	  if (window.AutoPagerize) {
	   boot();
	  } else {
	   window.addEventListener('GM_AutoPagerizeLoaded',boot,false);
	  }
	  function boot() {
	    window.AutoPagerize.addFilter(function(docs){
	      insPart("sc");
	    });
	  }


 
})();
	