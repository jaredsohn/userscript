// ==UserScript==
// @name           Fresh schedule supporter
// @namespace      http://www.fresh-club.net/
// @include        http://www.fresh-club.net/modelphoto/index.html
// ==/UserScript==

(function(){

	function countTarget(mode) {
		counter = 0;
		checkIndex = 0;
		targetPages = new Array();
		currentSource = document.body.innerHTML;

		// リストページに列挙された対象ページのURLを配列targetPagesに格納
		do {
			// リストページのソース内にて、各詳細ページへのリンクに
			// 使われている画像の位置を検索
			if (mode == 0) {
				checkIndex = currentSource.indexOf('<img src="../images/index/photosession_s.jpg', checkIndex);
				if (checkIndex != -1) {
					checkIndex = checkIndex + 16;
					targetPages[counter] = "http://www.fresh-club.net/akb/event/" + currentSource.substring(checkIndex-31, checkIndex-18);
					counter++;
				} else {
					break;
				}
			} else {
				checkIndex = currentSource.indexOf('<img src="../images/index/okugai_s.jpg', checkIndex);
				if (checkIndex != -1) {
					checkIndex = checkIndex + 22;
					targetPages[counter] = "http://www.fresh-club.net/" + currentSource.substring(checkIndex-45, checkIndex-24);
					counter++;
				} else {
					break;
				}
			}
		} while (1);    // 無限ループ（リンク画像が見つからなくなるelseまで無限ループ）
	}

	function xhrFunction(mode) {
		if ( i >= counter ) {    // この関数は無限ループするため、ここで抜け出す
			if (mode == 0) {
				mode = 1;            // ここで屋外処理に移行
				init();
				countTarget(mode);
				xhr = new Array(counter);
				targetSource = new Array(counter);
				i = 0;
				xhrFunction(mode);
			} else {
				return false;
			}
		}

		xhr[i] = new XMLHttpRequest();
		xhr[i].open("GET",targetPages[i],true);
		xhr[i].onreadystatechange = function() {
			if ( xhr[i].readyState == 4 && xhr[i].status == 200 ) {
				// 詳細ページを取得
				targetSource[i] = xhr[i].responseText;
				// responseTextはHTMLDocumentオブジェクトでは無い為に、
				// その後のevaluate処理が出来ない
				// 以下2行にて強制的にオブジェクト化している
				divObj = document.createElement("div");
				divObj.innerHTML = targetSource[i];
				// 詳細ページのソースより画像位置を検索
				var oElement = document.evaluate('//img[contains(@src, "cafe/model/")]', divObj, null, 7, null);
				// targetSource[i]の中に画像リスト部分のソースを格納
				targetSource[i] = "";        // 空にして再利用
				for ( j = 0; j < oElement.snapshotLength; j++ ) {
					if ( oElement.snapshotItem(j).parentNode.nodeName == "A" ) {
						targetSource[i] = targetSource[i] + oElement.snapshotItem(j).parentNode.parentNode.innerHTML;
					} else {    // ブログへのアンカーが無い場合
						targetSource[i] = targetSource[i] + oElement.snapshotItem(j).parentNode.innerHTML;
					}
				}

				// リストページに抜き出したソースを挿入
				targetPages[i] = targetPages[i].substring(26);
				if ( mode == 0 ) {
					insertIndex = document.body.innerHTML.indexOf(targetPages[i] + '"><img src="../images/index/photosession_s.jpg');
					document.body.innerHTML = document.body.innerHTML.replace(document.body.innerHTML.substring(insertIndex-12, insertIndex+138), targetSource[i]);
				} else {
					insertIndex = document.body.innerHTML.indexOf(targetPages[i] + '"><img src="../images/index/okugai_s.jpg');
					document.body.innerHTML = document.body.innerHTML.replace(document.body.innerHTML.substring(insertIndex-10, insertIndex+130), targetSource[i]);
				}

				i++;
				xhrFunction(mode);            // XHR処理をループするとうまく動作しないため、関数化してループ
			}
		}
		xhr[i].send();
	}

	function init() {
		delete counter;
		delete checkIndex;
		delete targetPages;
		delete currentSource;
		delete xhr;
		delete targetSource;
		delete i;
	}

	mode = 0;
	countTarget(mode);        // Mode: PhotoSession

	xhr = new Array(counter);
	targetSource = new Array(counter);
	i = 0;
	xhrFunction(mode);        // Mode: PhotoSession


})();

