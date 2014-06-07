// ==UserScript==
// @name           Faster Net Surfin' with Keyboard
// @version        v0.1 (2010/08/01)
// @namespace      http://d.hatena.ne.jp/hecomi/
// @description    キーボードによるリンクへのアクセスを高速化します．
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @include        *
// ==/UserScript==

(function(){

// 入力中か
var ifInput = false;

// 入力フォームID名
var inputDivID  = "__input_div__";
var inputFormID = "__input_num_form__";

// 番号クラス名
var numClassName = "__quick_access__";

// 入力フォーム追加
var inputNumForm = document.createElement("div");
inputNumForm.style.display = "none";
inputNumForm.setAttribute("id", inputDivID);
inputNumForm.setAttribute("style", "display: none; padding: 10px; position: fixed; left: 0px; top: 0px; background-color: #000;");
inputNumForm.innerHTML = '<input type="text" size="5" style="font-size: 10px; border: 1px #aaa dotted;" id="' + inputFormID + '" />';
$("body")[0].appendChild(inputNumForm);

document.addEventListener('keydown',
	function(event) {
		// 番号を追加
		if (event.shiftKey && event.keyCode == 13) { // 'Shift + Enter'
			// 入力中は無視
			if (ifInput) return;
			
			// aタグを全て調べる
			var a = $("a");
			for (i = 0; i < a.length; i++) {
				var num = document.createElement("span");
				num.innerHTML = i;
				num.setAttribute("style", "padding: 2px; font-size: 10px; background-color: #e00; color: #fff;");
				num.setAttribute("class", numClassName);
				a[i].appendChild(num);
			}
		}
		
		// 番号を消す
		if (event.keyCode == 27) {	// 'Esc' key
			var a = $("a");
			for (i = 0; i < a.length; i++) {
				var num = $("." + numClassName);
				a[i].removeChild(num[0]);
			}
		}
		
		// リンクへアクセス
		if (event.keyCode == 13 && ifInput) {	// 'Enter' key
			var num = $("#" + inputFormID)[0].value;
			var a = $("a");
			if (num >= 0 && num < a.length) {
				var url = a[num].href;
				location.href = url;
			} else {
				$("#" + inputFormID)[0].value = "";
			}
		}
	},
	false);
	

document.addEventListener('keyup',
	function(event) {
		// フォームを表示
		if (event.shiftKey && event.keyCode == 13) { // 'Shift + Enter'
			// 入力中は無視
			if (ifInput) return;
			
			// 検索フォームON
			$("#" + inputDivID)[0].style.display = "block";
			$("#" + inputFormID)[0].focus();
			$("#" + inputFormID)[0].value = "";
			ifInput = true;
		}
		
		// フォームを消す
		if (event.keyCode == 27) {	// 'Esc' keyF
			$("#" + inputDivID)[0].style.display = "none";
			ifInput = false;
		}
	},
	false);
})();
