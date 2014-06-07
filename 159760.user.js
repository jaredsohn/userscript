// ==UserScript==
// @name rakuten_order
// @namespace http://bicyclegeek.seesaa.net/
// @description 楽天市場で注文を確定する前に配送日時指定を自動で行い、宣伝メールなどのチェックを外す
// @include https://basket.step.rakuten.co.jp/rms/mall/bs/confirmorderquicknormalize/
// @version 1.00
// ==/UserScript==

alert('配送日時の指定がスクリプトで正常に行われているか確認！' +
		'ポイントを利用するなら変更ボタンから利用するポイントを指定');
		
// 設定画面を開く（必須ではない）
unsafeWindow.accordion('deliverydetail');

// 配送希望時間のラジオボタンをクリックし関数を実行（右の変更ボタンはアコーディオンを閉じるだけ）
document.getElementById('time_2').checked = true;
unsafeWindow.deliverydetail_msg_update();

// この楽天のショップをお気に入りに登録する のチェックを外す
document.getElementById('bookmark_check').checked = false;

// ページ最下部でメールマガジンの選択を全解除
unsafeWindow.BoxChecked(false);