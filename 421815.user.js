// ==UserScript==
// @name 「Pixiv」のイラストで自動的にチェッカーつける。
// @description ほぼ公式と同じ仕様にした。
// @namespace http://shioneko.sakura.ne.jp/
// @version 1.20
// @include http://www.pixiv.net/bookmark_add.php?type=illust&illust_id=*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @require http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/jquery-ui.min.js
// ==/UserScript==

$(window).load(function () {
	// 編集時に2重にタグが被さらないようにする。	
	$("#input_tag").val('');
	
	// R-18 を発見した。
	$(".recommend-tag").find("span").each(function(){
		var R = $(this).text();
		var Rs = R.replace(/\*/g,"");
		if ( Rs == "R-18"){
			$(this).css({'color':'red'});
			$(this).attr('class','tag c6 on selected');
				
				// 文字列に入れる
				//$('#input_tag').val("R-18");
				// Check を 非表示に設定
				var Rc = $('.privacy').find("input").filter(':checked').val();
				if (Rc == "0"){
					$('.privacy').find("input").val(['1']);
				}
			}

	// R-18 タグここまで

	// -- ふつーのタグ付け -- //

		// 下の欄から取得 
		$("ul:not('.work')").find("span").each(function(){
			var M = $(this).text();
			if (M == Rs){
				// 上の欄に要素を追加
				var Ms = $('#input_tag').val();
				var Ms = Ms + " " + M;
				$('#input_tag').val(Ms);
				
				// あなたのブックマークタグに色を付ける。
				$(this).attr('class','tag c6 on selected');
				
				// この作品タグにタグ付け (最初の奴と同じならばタグつけて良し)
				$(".recommend-tag").find("span").each(function(){
					var New = $(this).text();
					var News = New.replace(/\*/g,"");
					if (News == Rs){
						$(this).attr('class','tag c6 on selected');
					}
				});
			}
		});
	});
});