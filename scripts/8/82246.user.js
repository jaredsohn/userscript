// ==UserScript==
// @name          pixiv medium page modify
// @namespace     http://d.hatena.ne.jp/AOI-CAT
// @description	  add title to next/prev link, click illust to enlarge.
// @version       0.4
// @include       http://www.pixiv.net/member_illust.php?mode=medium*
// ==/UserScript==
(function(){
	//「拡大する」ボタン
	// http://d.hatena.ne.jp/showchick/ による pixiv plus の機能の新レイアウト対応版です。
	// のはずでしたが、出来るだけスクロールバーが出ない位置に拡大画像を表示する機能、
	// ローディングアイコンの表示機能が追加されています。
	
	// ローディングアイコン
	var loading_icon_data = 'data:image/gif;base64,'+
	    'R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH+GkNyZWF0ZWQgd2l0aCBhamF4'+
	    'bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAADMwi63P4wyklr'+
	    'E2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQACgABACwAAAAA'+
	    'EAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUk'+
	    'KhIAIfkEAAoAAgAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9'+
	    'HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkEAAoAAwAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYum'+
	    'CYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkEAAoABAAsAAAAABAAEAAAAzII'+
	    'unInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQACgAF'+
	    'ACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJ'+
	    'ibufbSlKAAAh+QQACgAGACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFG'+
	    'xTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAAKAAcALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdce'+
	    'CAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==';
	var illustid = location.href.match(/\d+/);
	var is_manga = xpath('//div[@class="works_display"]/a').snapshotItem(0).getAttribute('href').match(/manga/);
	document.addEventListener("click", function (event) {
			if (String(event.target.getAttribute("src")).indexOf(illustid) >= 0 && event.button == 0 && !is_manga) {
				event.stopPropagation();
				event.preventDefault();
				// 一回表示したらdisplayプロパティの切り替えで対応する
				var bimg;
				if ( bimg = document.getElementById("bimg")) {
					bimg.style.display = (bimg.style.display == "none") ? "" : "none";
				} else {
					var mimg = xpath('//div[@class="works_display"]/a/img').snapshotItem(0);
					var mimg_x = mimg.offsetLeft - 5;
					var mimg_y = mimg.offsetTop - 5;
					var mimg_w = mimg.offsetWidth;
					var mimg_h = mimg.offsetHeight;
					var bimg_url = mimg.src.replace(/_m(\.((jpg)|(jpeg)|(gif)|(png)))/, "$1");
					var b_img = document.createElement('img');
					b_img.id = "bimg";
					b_img.src = bimg_url;
					with (b_img.style) {
						position = "absolute";
						top = mimg_y + "px";
						left = mimg_x + "px";
						border = "5px ridge #B7B7B7";
						display = "none"; 
					}
					var loading_icon = document.createElement('img');
					loading_icon.src = loading_icon_data;
					loading_icon.id = 'licon';
					with(loading_icon.style) {
						position = "absolute";
						top = mimg_y + 5 + (mimg_h/2) + "px";
						left = mimg_x + 5 + (mimg_w/2) + "px";
					}
					document.body.appendChild(loading_icon);
					bimg = document.body.appendChild(b_img);
					bimg.addEventListener(
						"load",
						function () {
							var licon = document.getElementById("licon");
							licon.style.display = "none";
							var bimg = document.getElementById("bimg");
							var div_img = 
							  xpath('//div[@class="works_display"]').snapshotItem(0);
							var windowSize = document.documentElement.clientWidth - 5;
							var bimg_x = 0;
							// 表示されていないとwidthが取得できないので変更
							bimg.style.display = "";
							// medium画像の中心に合わせる
							bimg_x = div_img.offsetLeft +
								((div_img.offsetWidth - bimg.offsetWidth) / 2);
							// 画像がウィンドウより大きい場合は画面左から配置
							// ウィンドウに収まるときで、medium画像の中心に配置すると
							// 画像ウィンドウの右へはみ出る場合は画面の中央に配置する
							if (bimg.offsetWidth > windowSize) {
								bimg_x = 0;
							} else if ((bimg_x + bimg.offsetWidth) > windowSize) {
								bimg_x = 
									(windowSize - bimg.offsetWidth)/ 2;
							}
							bimg.style.left = bimg_x + "px";
						},
						false
					);
				}
			}
	}, true);

    document.addEventListener("load", function(){
        btn = document.createElement("div");
        with (btn.style) {
            marginTop = "3px";
            position = "absolute";
            top = "0px";
            right = "13em";
        }
        btn.id = "view_bmark";
        btn.innerHTML = '<a href="' +
            'http://www.pixiv.net/bookmark_detail.php?illust_id=' + illustid +
            '">ブックマークページを確認</a>';
        var chk = document.getElementById("view_bmark");
        if(chk == null) {
            var node =
              xpath('//div[@class="two_column_body"]/section[@class="action"]/div[@class="bookmark"]').snapshotItem(0);
            node.parentNode.insertBefore(btn, node);
        }
    }, true);

	//XPath
	function xpath(query) {
		return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}

})();
