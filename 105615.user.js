// ==UserScript==
// @name           bro3_change_move_size
// @namespace      http://homepage3.nifty.com/Craford
// @include        http://*.nexon.com/map.php*
// @include        http://*.3gokushi.jp/map.php*
// @description    ブラウザ三国志マップ移動距離変更
// @version        1.10
// ==/UserScript==
// version date       author
// ver1.00 2011.01.03 ドワクエ Craford（旧クラフト＋）短距離マップ移動アイコンの移動幅を２マスにする
// ver1.01 2011.01.04 ドワクエ Craford（旧クラフト＋）移動サイズを自由設定できるようにしてみた
// ver1.02 2011.01.05 ドワクエ Craford（旧クラフト＋）上下左右ボタン（斜め移動）を足してみた
// ver1.03 2001.01.06 ドワクエ Craford（旧クラフト＋）起点に戻るボタンを追加、移動距離に全角入れたときにおかしくなる不具合の対応
// ver1.04 2001.01.06 ドワクエ Craford（旧クラフト＋）起点に設定でマップ中央座標を記憶、起点に戻るで登録座標に戻るように仕様変更
// ver1.05 2001.01.06 ドワクエ Craford（旧クラフト＋）起点に設定時に起点に戻るボタンを更新していなかったので対応を追加
// ver1.06 2001.01.06 ドワクエ Craford（旧クラフト＋）起点からマップ中央までの距離を出せるようにしてみた
// ver1.07 2001.03.05 ドワクエ Craford（旧クラフト＋）要望対応。距離1/2、1/3指定等に対応。
// ver1.08 2001.03.07 ドワクエ Craford（旧クラフト＋）不具合修正。1/2の移動距離を変更。
// ver1.09 2001.03.24 ドワクエ Craford（旧クラフト＋）本鯖仕様変更対応
// ver1.10 2001.03.24 ドワクエ Craford（旧クラフト＋）mixi鯖仕様変更対応

var DELIMIT1 = "#$%";
var DELIMIT2 = "&?@";
var VERSION_KEY = "vtA101";
var VERSION = "1.10";

var BASE = "   0   0";

// 共通関数
var d = document;
var $ = function(id) { return d.getElementById(id); };
var $x = function(xp,dc) { return d.evaluate(xp, dc||d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; };
var $e = function(key) { return d.evaluate(key, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); };

//----------------//
// メインルーチン //
//----------------//
(function(){
	//全体画面なら実行中作業を取得
	if ( (location.pathname == "/map.php") || (location.pathname == "/big_map.php") ) {

		//HTML追加
		addHtml();

		//HTML更新
		updateHtml();
	}
})();

//-----------------------//
// 51x51モードの実装判定 //
//-----------------------//
function check51_51mode(){
	var result;

	var el = $e('//*[@id="change-map-scale"]');
	if( el.snapshotLength > 0 ){
		result = 1;
	}
	else{
		result = 0;
	}

	return result;
}

//------------//
// HTMLの追加 //
//------------//
function addHtml() {
	//----------------------//
	// 保存された値をロード //
	//----------------------//
	var execflag;
	var basevalue;
	var basepos;
	var basex;
	var basey;
	execflag = loadExecFlag(location.hostname, "MOVE");
	basevalue = new String("0");  // 初期値
	if( execflag == "" ){
		basevalue = 0;
	}
	else{
		basevalue = execflag;
	}

	execflag = loadExecFlag(location.hostname, "BASEPOS");
	basepos = new String(BASE);  // 初期値
	if( execflag == "" ){
		basepos = BASE;
	}
	else{
		basepos = execflag;
	}
	basex = basepos.substr(0,4);
	basey = basepos.substr(4,4);

	//--------------------------------------------//
	// 移動数切り替えラジオボタン描画エリアの定義 //
	//--------------------------------------------//
	var ckLabel;
	var textbox;
	var dv2;
	var img;
	var target;
	var bigmap;

	if( location.pathname != "/big_map.php" ){
		// 51x51画面ではない
		bigmap = 0;
		target = "datas";
	}
	else{
		// 51x51画面である
		bigmap = 1;
		target = "change-map-scale";
	}

	dv2 = d.createElement("div");
	dv2.style.position = "absolute";
	if( bigmap == 0 ){
		// 51x51画面ではない
		if( location.hostname.substr(0,1) == "m" ){
			dv2.style.top = "160px";
			dv2.style.left = "10px";
		}
		else{
			dv2.style.top = "132px";
			dv2.style.left = "10px";
		}
	}
	else{
		// 51x51画面である
		dv2.style.top = "60px";
		dv2.style.left = "20px";
	}
	dv2.style.fontSize= "10px";
	dv2.style.width = "120px";
	dv2.style.height = "20px";
	dv2.style.border = "1px black solid";
	dv2.style.backgroundColor = "#FFFFCC";
	dv2.style.zIndex = 500;
	$(target).parentNode.appendChild(dv2);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "<font color=\"blue\"><b>最小移動単位</b></font>";
	dv2.appendChild(ckLabel);

	// 1
	textbox = document.createElement("input");
	textbox.type = "input";
	textbox.id = "iMove1";
	textbox.style.fontSize= "10px";
	textbox.style.marginTop = "2px";
	textbox.style.marginLeft = "8px";
	textbox.style.width = "35px";
	textbox.style.height = "12px";
	textbox.value = basevalue;
	textbox.addEventListener("blur", function() {textChanged()}, true);
	dv2.appendChild(textbox);

	if( bigmap == 0 ){
		// 51x51画面ではない

		// 矢印アイコン（左）
		img = 'data:image/png;base64,'+
					'iVBORw0KGgoAAAANSUhEUgAAABEAAAAeCAYAAADKO/UvAAAABnRSTlMAgACAAIDTzS+jAAAAjUlEQVR42sXV3Q2AIAwEYDuMkzlI'+
					'YRAncxiUGBJTKfQQ8F769iX8pEfOuaUlzBzi9N4TtSAJSIERCcBIDoAQDTAjT2Dd73lsAJIDIEQDzEgJMCE1oIpYgCJiBVQEAbII'+
					'CryQcAUFxiBdjtPtYlM+PzEKjf/2VmjeKqhBEKJBMCIhmbmVUYL+qVEJxUI/AUUVoq80rfXnAAAAAElFTkSuQmCC';
		dv2 = d.createElement("div");
		dv2.style.position = "absolute";
		dv2.style.top = "265px";
		dv2.style.left = "20px";
		dv2.style.zIndex = 500;
		dv2.id = "icon_arrow_left";
		dv2.innerHTML = '<a href="#"><img src="' + img + '"></a>';
		$(target).parentNode.appendChild(dv2);

		// 矢印アイコン（右）
		img = 'data:image/png;base64,'+
					'iVBORw0KGgoAAAANSUhEUgAAABEAAAAeCAYAAADKO/UvAAAABnRSTlMAgACAAIDTzS+jAAAAjElEQVR42sXV0Q2AIAwEUBjGyRwE'+
					'GMTJHAZN/FGk0LszsT8kfLwEKNeYcw4ppRrOKqXEQFSsZ903GOiFMFAXQSETQaAHsmzXuq8Y1EVQyEQQaIh4oSnigVzIDHIjIwhC'+
					'LAhGehCFtNB/iHwc+WLlJ5abTW57+QPKUSCHkhSPbVFBzQAmIg8vaox+MdAP+VTKF6cnH+gAAAAASUVORK5CYII=';
		dv2 = d.createElement("div");
		dv2.style.position = "absolute";
		dv2.style.top = "265px";
		dv2.style.left = "720px";
		dv2.style.zIndex = 500;
		dv2.id = "icon_arrow_right";
		dv2.innerHTML = '<a href="#"><img src="' + img + '"></a>';
		$(target).parentNode.appendChild(dv2);

		// 矢印アイコン（下）
		img = 'data:image/png;base64,'+
					'iVBORw0KGgoAAAANSUhEUgAAAB4AAAARCAYAAADKZhx3AAAABnRSTlMAgACAAIDTzS+jAAAAhklEQVR42sXQwRGAIAxEUSjGyiwE'+
					'KMTKLAaNMzqoAbIR8N9yepO13nvjnItmYCEEa+PeSPTsP5ibelraIut8v4+pCaZSvCdM6PXxWQ+cQ19wazyHsnArvIRm4a94DS3C'+
					'WlyCVmEUl6IiWIojqBiu4SgKwTlcg8LwE09DUBXM4SiqhlNcg1IbqGBwiqHWlxEAAAAASUVORK5CYII=';
		dv2 = d.createElement("div");
		dv2.style.position = "absolute";
		dv2.style.top = "455px";
		dv2.style.left = "365px";
		dv2.style.zIndex = 500;
		dv2.id = "icon_arrow_bottom";
		dv2.innerHTML = '<a href="#"><img src="' + img + '"></a>';
		$(target).parentNode.appendChild(dv2);

		// 矢印アイコン（上）
		img = 'data:image/png;base64,'+
					'iVBORw0KGgoAAAANSUhEUgAAAB4AAAARCAYAAADKZhx3AAAABnRSTlMAgACAAIDTzS+jAAAAiElEQVR42sXUwQ2AIAyFYTuMkzkI'+
					'ZRAncxgUTY0iQvuE+F96ar6khxIzD0jOuRCn956QfUJgQSUEN8MpiuIm+IqO8zGXCcPVcA6VEFwFl1AUr8IaFMGLsAW14q8wglrw'+
					'LPwF1eIPuAWqwW9wS7SGn3APtITvcPoGe8KCU9hqy+j6D86dunfx1CtJpXCK46EJ0QAAAABJRU5ErkJggg==';
		dv2 = d.createElement("div");
		dv2.style.position = "absolute";
		dv2.style.top = "85px";
		dv2.style.left = "365px";
		dv2.style.zIndex = 500;
		dv2.id = "icon_arrow_top";
		dv2.innerHTML = '<a href="#"><img src="' + img + '"></a>';
		$(target).parentNode.appendChild(dv2);
	}

	// 起点に設定ボタン
	img = 'data:image/png;base64,'+
				'iVBORw0KGgoAAAANSUhEUgAAAEsAAAASCAYAAAATzyPVAAAABnRSTlMAAACAAP+ikfOcAAABaElEQVR42u2YTW7CMBCFHQkJrtVF'+
				'b4WUIPVWXXCtIiGZJtTJ2H7zJyOyqN8u47HxfJkZHA9hiqFUHENt/GcaLmGobBRWh1SLQlthlaCGj8ve+9xN8TpmzwnYAouCopDi'+
				'dfqzTQ0/3L4GtybV6fMcfr6/Kpuk5I/8bvdDBm0GlsFKoNBmOGkQuLXoPC/Q4+EuBo9glWPWuBKwBVb81eaQl54UhDVAi1/pI72s'+
				'2ceaWWjMmm0lrMWWYKEetRcsTSizKAxvOSLNZbjtb+RhtZahNr+c44XFZZYmaynOa5lhcUG0ZpPXzknKLA9ErcGbYHkz492wtJ4l'+
				'9SiLTxMsLrO04K2wvRms/Rt6YSHwL4OlBe+VF5bUsygAlDEvySwKjIPlCZzOpcEjEJKtFF1DKj0EwtPXEqzs6IBO8Cg4SZYy1YB5'+
				'JO0JwfHC2/YpnOATrK6nIKxloH9IrxI/pFenfkVTCV7RUHVo+PLvAaJdifjwNfADAAAAAElFTkSuQmCC';
	dv2 = d.createElement("div");
	dv2.style.position = "absolute";
	if( bigmap == 0 ){
		// 51x51画面ではない
		if( location.hostname.substr(0,1) == "m" ){
			dv2.style.top = "183px";
			dv2.style.left = "10px";
		}
		else{
			dv2.style.top = "155px";
			dv2.style.left = "10px";
		}
	}
	else{
		// 51x51画面である
		dv2.style.top = "60px";
		dv2.style.left = "160px";
	}
	dv2.style.zIndex = 500;
	dv2.id = "icon_base2";
	dv2.innerHTML = '<a href="#"><img src="' + img + '"></a>';
	dv2.addEventListener("click", function() {changeBasePos()}, true);
	$(target).parentNode.appendChild(dv2);

	dv2 = d.createElement("span");
	dv2.style.position = "absolute";
	if( bigmap == 0 ){
		// 51x51画面ではない
		if( location.hostname.substr(0,1) == "m" ){
			dv2.style.top = "184px";
			dv2.style.left = "90px";
		}
		else{
			dv2.style.top = "156px";
			dv2.style.left = "90px";
		}
	}
	else{
		// 51x51画面である
		dv2.style.top = "61px";
		dv2.style.left = "240px";
	}
	dv2.style.fontSize= "10px";
	dv2.style.border = "1px black solid";
	dv2.style.textAlign = "center";
	dv2.style.verticalAlign = "bottom";
	dv2.style.backgroundColor = "#FFFFCC";
	dv2.id = "txBasePos";
	dv2.style.width = "75px";
	dv2.style.height = "14px";
	var texta = "(" + basex + "," + basey + ")";
	texta = texta.replace(/ /g,"&nbsp;");
	dv2.innerHTML = texta;
	$(target).parentNode.appendChild(dv2);

	// 起点に戻るボタン
	img = 'data:image/png;base64,'+
				'iVBORw0KGgoAAAANSUhEUgAAAEsAAAASCAYAAAATzyPVAAAABnRSTlMAAACAAP+ikfOcAAABK0lEQVR42u2YURKDIAxE4Wg9mXoy'+
				'j0ZbWmwMCUmIjs6U/SuSsDyIRWKYU8BKU6gb/0xxCbFqg7AGpFoQ2gYLg4qP5Wqflymt0+53AZZhQVAQUlrnb9vsGNifo5VXq57x'+
				'IbQ3sB2sAspiRDLB5YJxZwH1eMLAMqz00q/zQialk+gmqOmH+7QWi4IsyTI2Byv3KbCod9RVsLSSJ+p7joGRsLxlKMXjGC+sIz02'+
				'S9Gys7y7ydquhXVUHN/u2Fl3hnVGaZpgcTtLmjwnCZZ1B2ukXYjDYfUa0RrsLXfOtxQvjV3BgsCsg3IGSiw0oC0daWEkwJZya813'+
				'd3SgTvCtRL0TkIBZRflqvQ60/4gsKHyCL7CGPiJh5QfjQ3pT80N66zSuaCqRVzRQAxp9+fcEj5tg+AMbz+MAAAAASUVORK5CYII=';
	dv2 = d.createElement("div");
	dv2.style.position = "absolute";
	if( bigmap == 0 ){
		// 51x51画面ではない
		if( location.hostname.substr(0,1) == "m" ){
			dv2.style.top = "203px";
			dv2.style.left = "10px";
		}
		else{
			dv2.style.top = "175px";
			dv2.style.left = "10px";
		}
	}
	else{
		// 51x51画面である
		dv2.style.top = "80px";
		dv2.style.left = "160px";
	}
	dv2.style.zIndex = 500;
	dv2.id = "icon_base";
	dv2.innerHTML = '<a href="#"><img src="' + img + '"></a>';
	$(target).parentNode.appendChild(dv2);

	// マップ中央までの距離
	dv2 = d.createElement("div");
	dv2.style.position = "absolute";
	if( bigmap == 0 ){
		// 51x51画面ではない
		if( location.hostname.substr(0,1) == "m" ){
			dv2.style.top = "226px";
			dv2.style.left = "10px";
		}
		else{
			dv2.style.top = "198px";
			dv2.style.left = "10px";
		}
	}
	else{
		// 51x51画面である
		dv2.style.top = "84px";
		dv2.style.left = "20px";
	}
	dv2.style.fontSize= "11px";
	$(target).parentNode.appendChild(dv2);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	if( bigmap == 0 ){
		// 51x51画面ではない
		if( location.hostname.substr(0,1) == "m" ){
			ckLabel.innerHTML = "<font color=\"blue\"><b>起点からマップ中央まで</b></font>";
		}
		else{
			ckLabel.innerHTML = "<font color=\"blue\"><b>起点からマップ中央までの距離</b></font>";
		}
	}
	else{
		// 51x51画面である
		ckLabel.innerHTML = "<font color=\"blue\"><b>起点からマップ中央まで</b></font>";
	}
	dv2.appendChild(ckLabel);

	dv2 = d.createElement("div");
	dv2.style.position = "absolute";
	if( bigmap == 0 ){
		// 51x51画面ではない
		if( location.hostname.substr(0,1) == "m" ){
			dv2.style.top = "242px";
			dv2.style.left = "10px";
		}
		else{
			dv2.style.top = "210px";
			dv2.style.left = "10px";
		}
	}
	else{
		// 51x51画面である
		dv2.style.top = "96px";
		dv2.style.left = "20px";
	}
	dv2.style.fontSize= "11px";
	$(target).parentNode.appendChild(dv2);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.id = "lDistCenter";
	ckLabel.innerHTML = "<font color=\"blue\"><b>0.00</b></font>";
	dv2.appendChild(ckLabel);
}

//----------------------//
// テキスト変更イベント //
//----------------------//
function textChanged(){
	//----------------------//
	// 保存された値をロード //
	//----------------------//
	var execflag = loadExecFlag(location.hostname, "MOVE");
	var basevalue = new String("1");  // 初期値
	if( execflag == "" ){
		basevalue = 1;
	}
	else{
		basevalue = execflag;
	}

	var text = $e('//*[@id="iMove1"]');
	var inp;
	var movesize;

	inp = text.snapshotItem(0).value;
	movesize = parseInt(inp);
	if( (inp == "0") || (inp == "1/2") || (inp == "1/3") || (inp == "1/4") || (inp == "1/5") ){
		//--------------//
		// 変更値を保存 //
		//--------------//
		saveExecFlag(location.hostname, "MOVE", inp);

		//------------//
		// 画面を更新 //
		//------------//
		updateHtml();
	}
	else if( isNaN(parseInt(text.snapshotItem(0).value)) || movesize <= 0 ){
		// 数値化できない、または0以下がいれられたら元の値にする
		movesize = basevalue;
		text.snapshotItem(0).value = movesize;
	}
	else{
		//--------------//
		// 変更値を保存 //
		//--------------//
		saveExecFlag(location.hostname, "MOVE", movesize);
		text.snapshotItem(0).value = movesize;

		//------------//
		// 画面を更新 //
		//------------//
		updateHtml();
	}
}

//------------//
// HTMLの更新 //
//------------//
function updateHtml() {
	//------------------//
	// 画面サイズの取得 //
	//------------------//
	var viewSize;
	viewSize = getViewSize();

	//----------------//
	// 移動単位の取得 //
	//----------------//
	var execflag;
	var movesize;
	var basepos;
	var basex;
	var basey;
	execflag = loadExecFlag(location.hostname, "MOVE");
	if( execflag == "" ){
		movesize = 1;
	}
	else{
		if( execflag == "0" ){
			if( viewSize == 11 ){
				movesize = 11;
			}
			else if( viewSize == 15 ){
				movesize = 15;
			}
			else if( viewSize == 51 ){
				movesize = 51;
			}
			else{
				movesize = 20;
			}
		}
		else if( execflag == "1/2" ){
			if( viewSize == 11 ){
				movesize = 5;
			}
			else if( viewSize == 15 ){
				movesize = 7;
			}
			else if( viewSize == 50 ){
				movesize = 25;
			}
			else{
				movesize = 9;
			}
		}
		else if( execflag == "1/3" ){
			if( viewSize == 11 ){
				movesize = 4;
			}
			else if( viewSize == 15 ){
				movesize = 5;
			}
			else if( viewSize == 51 ){
				movesize = 16;
			}
			else{
				movesize = 7;
			}
		}
		else if( execflag == "1/4" ){
			if( viewSize == 11 ){
				movesize = 3;
			}
			else if( viewSize == 15 ){
				movesize = 4;
			}
			else if( viewSize == 51 ){
				movesize = 12;
			}
			else{
				movesize = 5;
			}
		}
		else if( execflag == "1/5" ){
			if( viewSize == 11 ){
				movesize = 2;
			}
			else if( viewSize == 15 ){
				movesize = 3;
			}
			else if( viewSize == 51 ){
				movesize = 10;
			}
			else{
				movesize = 4;
			}
		}
		else{
			movesize = parseInt(execflag);
		}
	}

	//------------------//
	// ベース位置の取得 //
	//------------------//
	execflag = loadExecFlag(location.hostname, "BASEPOS");
	basepos = new String(BASE);  // 初期値
	if( execflag == "" ){
		basepos = BASE;
	}
	else{
		basepos = execflag;
	}
	basex = basepos.substr(0,4);
	basey = basepos.substr(4,4);

	//--------------------------------------------//
	// 全体表示画面から、画面中央座標を手に入れる //
	//--------------------------------------------//
	var codx;
	var cody;
	var x;
	var y;
	var bigmap;
	if( location.pathname != "/big_map.php" ){
		// 51x51画面ではない
		codx = $e('//div[@id="datas"]/input[@id=\"x\"]');
		cody = $e('//div[@id="datas"]/input[@id=\"y\"]');

		x = codx.snapshotItem(0).value;
		y = cody.snapshotItem(0).value;

		bigmap = 0;
	}
	else{
		// 51x51画面である
		var li = $e('//*[@id="map51-content"]//li');
		var dt = li.snapshotItem(1300).innerHTML;
		pos = dt.match(/.*x=([-]*\d+)&amp;y=([-]*\d+)#.*/);

		x = pos[1];
		y = pos[2];

		bigmap = 1;
	}

	//------------------------------------------//
	// 画面小移動アイコンを５マス移動に変更する //
	//------------------------------------------//
	// 座標を取得して、補正＆再設定する形で実装する
	{
		var arrow_img = new Array();
		// 右上
		arrow_img[0] = 'data:image/png;base64,'+
				'iVBORw0KGgoAAAANSUhEUgAAACEAAAAUCAYAAAADU1RxAAAABnRSTlMAAACAAIBiK58xAAAAqElEQVR42mNkaGhg+F9f/59hAABj'+
				'YyMjmP4PBAPhABTHDEpHRG1lYDj9gjaWmUpA6GXeaI7AlibmX2FgaDtJW9/fTibgCHo4ZikwNMwkkBwBAvhyCC0cg9URMEAvx+B1'+
				'BL0cQ5QjaO0YkhxBK8eQ5QhqO4YiR1DLMVRxBKWOoaojyHUMTRxBimNAdQhy/UF1RxDjGHRAM0eQ4hiaOwKfY+AtK3o5Ah8AAJN5'+
				'gtGmVHygAAAAAElFTkSuQmCC';
		// 右下
		arrow_img[1] = 'data:image/png;base64,'+
				'iVBORw0KGgoAAAANSUhEUgAAACEAAAAUCAYAAAADU1RxAAAABnRSTlMAAACAAIBiK58xAAAAp0lEQVR42mNkaGhgGGjASC9H/K+v'+
				'/49heWMjI10cgc1yuoUEMZbTzBH4LJ9/hYGh7SQDg6kEA8Mybxo4ghjLkcFSoCPMJKjkCFItp6ojyLWcKo6g1HKKHEEty8lyBLUt'+
				'J8kRtLKcKEfQ2nK8jqCX5TgdgcsBtLCcaEfQ0nIYuJ2MYDP+BwJkyaitDAynX9DGYlOoz5HrDayOGAgwOByBL2HS3HJoywoACHaC'+
				'0ZpxWZMAAAAASUVORK5CYII=';
		// 左下
		arrow_img[2] = 'data:image/png;base64,'+
				'iVBORw0KGgoAAAANSUhEUgAAACEAAAAUCAYAAAADU1RxAAAABnRSTlMAAACAAIBiK58xAAAArElEQVR42mNkaGhgGGjACHPE//r6'+
				'/xiSjY2MdHHEfyAgqIjGjiHKEbR2DIojorYyMJx+wcBQZc7AkKhDP8fAHXEKaHn0VlRJejkGryPo5RiiHEFrx5DkCFo5hixHUNsx'+
				'FDmCWo6hiiModQxVHUGuY2jiCFIdQ1NHEOMYkENQim3VubRxBD7HYDgCBKKgoQGqQ2gBTCUYGJZ5ozmElFqUVmBwOAJfy4ouDgCm'+
				'CQAiII8JcKepBgAAAABJRU5ErkJggg==';
		// 左上
		arrow_img[3] = 'data:image/png;base64,'+
				'iVBORw0KGgoAAAANSUhEUgAAACEAAAAUCAYAAAADU1RxAAAABnRSTlMAAACAAIBiK58xAAAAqElEQVR42mNkaGhgAIH/9fX/GQYA'+
				'MDY2MjL+B4KBsBzFIYPSEVFbIfTpF7Sx0FSCgWGZNx5HqM6lrY+rzBkYEnXQHICcJk4BfR69lX6W080R+CyHOQBM08IRxFoO51PT'+
				'EaRaTlVHkGs5VRxBqeUUOYJalpPlCGpbTpIjaGU5UY6gteUYjgABUL0BqjPoZTlWRxBUTGXLSXIErSyHm4+vZUVryzEcMZAAAHdt'+
				'jwkxygB9AAAAAElFTkSuQmCC';

		var alist = $e('//*[@class="fade"]');
		var dv;
		var cx;
		var cy;
		var varpos;
		var classname;
		var hrefText;

		// 画面上にある矢印アイコンの数によりチェック数がかわる（先頭４つは右下の画面切り替え用）
		if( bigmap == 0 ){
			for( var i = 0; i < alist.snapshotLength-4; i++ ){
				varpos = i + 4;
				classname = alist.snapshotItem(varpos).getAttribute("src");
        
				if( classname.indexOf("double_cur") == -1 ){
					if( (classname.indexOf("cur01.gif") != -1) || (classname == arrow_img[0]) ){
						// 右上（Ｙ軸＋）
                
						// 座標値の補正
						cx = x;
						cy = y;
						if( parseInt(cy) + parseInt(movesize) > 600 ){
							cy = 600;
						}
						else{
							cy = parseInt(cy) + parseInt(movesize);
						}
                
						// 値を書き換える
						hrefText = "map.php?x=" + (parseInt(cx)) + "&y=" + parseInt(cy);
						alist.snapshotItem(varpos).parentNode.setAttribute("href",hrefText);
						alist.snapshotItem(varpos).setAttribute("src",arrow_img[0]);
					}
					else if( (classname.indexOf("cur02.gif") != -1) || (classname == arrow_img[1]) ){
						// 右下（Ｘ軸＋）
                
						// 座標値の補正
						cx = x;
						cy = y;
						if( parseInt(cx) + parseInt(movesize) > 600 ){
							cx = 600;
						}
						else{
							cx = parseInt(cx) + parseInt(movesize);
						}
						// 値を書き換える
						hrefText = "map.php?x=" + (parseInt(cx)) + "&y=" + parseInt(cy);
						alist.snapshotItem(varpos).parentNode.setAttribute("href",hrefText);
						alist.snapshotItem(varpos).setAttribute("src",arrow_img[1]);
					}
					else if( (classname.indexOf("cur03.gif") != -1) || (classname == arrow_img[2]) ){
						// 左下（Ｙ軸－）
                
						// 座標値の補正
						cx = x;
						cy = y;
						if( parseInt(cy) - parseInt(movesize) < -600 ){
							cy = -600;
						}
						else{
							cy = parseInt(cy) - parseInt(movesize);
						}
						// 値を書き換える
						hrefText = "map.php?x=" + (parseInt(cx)) + "&y=" + parseInt(cy);
						alist.snapshotItem(varpos).parentNode.setAttribute("href",hrefText);
						alist.snapshotItem(varpos).setAttribute("src",arrow_img[2]);
					}
					else{
						// 左上（Ｘ軸－）
                
						// 座標値の補正
						cx = x;
						cy = y;
						if( parseInt(cx) - parseInt(movesize) < -600 ){
							cx = -600;
						}
						else{
							cx = parseInt(cx) - parseInt(movesize);
						}
						// 値を書き換える
						hrefText = "map.php?x=" + (parseInt(cx)) + "&y=" + parseInt(cy);
						alist.snapshotItem(varpos).parentNode.setAttribute("href",hrefText);
						alist.snapshotItem(varpos).setAttribute("src",arrow_img[3]);
					}
				}
			}
		}

		//------------------------//
		// 上下左右アイコンの補正 //
		//------------------------//
		if( bigmap == 0 ){
			var aicon;
			var dflag;

			//-- 左 --//
			dflag = 0;
			aicon = $e('//*[@id="icon_arrow_left"]');
			// 座標値の補正
			cx = x;
			cy = y;
			if( parseInt(cx) - parseInt(movesize) < -600 ){
				cx = -600;
				dflag = dflag + 1;
			}
			else{
				cx = parseInt(cx) - parseInt(movesize);
			}
			if( parseInt(cy) - parseInt(movesize) < -600 ){
				cy = -600;
				dflag = dflag + 1;
			}
			else{
				cy = parseInt(cy) - parseInt(movesize);
			}
			// 値を書き換える
			hrefText = "map.php?x=" + (parseInt(cx)) + "&y=" + parseInt(cy);
			aicon.snapshotItem(0).firstChild.setAttribute("href",hrefText);
			// 消去判定
			if( dflag == 2 ){
				aicon.snapshotItem(0).style.display = "none";
			}
			else{
				aicon.snapshotItem(0).style.display = "inline";
			}

			//-- 右 --//
			dflag = 0;
			aicon = $e('//*[@id="icon_arrow_right"]');
			// 座標値の補正
			cx = x;
			cy = y;
			if( parseInt(cx) + parseInt(movesize) > 600 ){
				cx = 600;
				dflag = dflag + 1;
			}
			else{
				cx = parseInt(cx) + parseInt(movesize);
			}
			if( parseInt(cy) + parseInt(movesize) > 600 ){
				cy = 600;
				dflag = dflag + 1;
			}
			else{
				cy = parseInt(cy) + parseInt(movesize);
			}
			// 値を書き換える
			hrefText = "map.php?x=" + (parseInt(cx)) + "&y=" + parseInt(cy);
			aicon.snapshotItem(0).firstChild.setAttribute("href",hrefText);
			// 消去判定
			if( dflag == 2 ){
				aicon.snapshotItem(0).style.display = "none";
			}
			else{
				aicon.snapshotItem(0).style.display = "inline";
			}

			//-- 下 --//
			dflag = 0;
			aicon = $e('//*[@id="icon_arrow_bottom"]');
			// 座標値の補正
			cx = x;
			cy = y;
			if( parseInt(cx) + parseInt(movesize) > 600 ){
				cx = 600;
				dflag = dflag + 1;
			}
			else{
				cx = parseInt(cx) + parseInt(movesize);
			}
			if( parseInt(cy) - parseInt(movesize) < -600 ){
				cy = -600;
				dflag = dflag + 1;
			}
			else{
				cy = parseInt(cy) - parseInt(movesize);
			}
			// 値を書き換える
			hrefText = "map.php?x=" + (parseInt(cx)) + "&y=" + parseInt(cy);
			aicon.snapshotItem(0).firstChild.setAttribute("href",hrefText);
			// 消去判定
			if( dflag == 2 ){
				aicon.snapshotItem(0).style.display = "none";
			}
			else{
				aicon.snapshotItem(0).style.display = "inline";
			}

			//-- 上 --//
			dflag = 0;
			aicon = $e('//*[@id="icon_arrow_top"]');
			// 座標値の補正
			cx = x;
			cy = y;
			if( parseInt(cx) - parseInt(movesize) < -600 ){
				cx = -600;
				dflag = dflag + 1;
			}
			else{
				cx = parseInt(cx) - parseInt(movesize);
			}
			if( parseInt(cy) + parseInt(movesize) > 600 ){
				cy = 600;
				dflag = dflag + 1;
			}
			else{
				cy = parseInt(cy) + parseInt(movesize);
			}
			// 値を書き換える
			hrefText = "map.php?x=" + (parseInt(cx)) + "&y=" + parseInt(cy);
			aicon.snapshotItem(0).firstChild.setAttribute("href",hrefText);
			// 消去判定
			if( dflag == 2 ){
				aicon.snapshotItem(0).style.display = "none";
			}
			else{
				aicon.snapshotItem(0).style.display = "inline";
			}
		}
		else{
			// 51x51マップ
			var aicon;
			var dflag;

			//-- 左 --//
			dflag = 0;
			aicon = $e('//*[@id="single-allow-west"]/a');
			// 座標値の補正
			cx = x;
			cy = y;
			if( parseInt(cx) - parseInt(movesize) < -600 ){
				cx = -600;
				dflag = dflag + 1;
			}
			else{
				cx = parseInt(cx) - parseInt(movesize);
			}
			if( parseInt(cy) - parseInt(movesize) < -600 ){
				cy = -600;
				dflag = dflag + 1;
			}
			else{
				cy = parseInt(cy) - parseInt(movesize);
			}
			// 値を書き換える
			hrefText = "big_map.php?x=" + (parseInt(cx)) + "&y=" + parseInt(cy);
			aicon.snapshotItem(0).setAttribute("href",hrefText);
			// 消去判定
			if( dflag == 2 ){
				aicon.snapshotItem(0).style.display = "none";
			}
			else{
				aicon.snapshotItem(0).style.display = "inline";
			}

			//-- 右 --//
			dflag = 0;
			aicon = $e('//*[@id="single-allow-east"]/a');
			// 座標値の補正
			cx = x;
			cy = y;
			if( parseInt(cx) + parseInt(movesize) > 600 ){
				cx = 600;
				dflag = dflag + 1;
			}
			else{
				cx = parseInt(cx) + parseInt(movesize);
			}
			if( parseInt(cy) + parseInt(movesize) > 600 ){
				cy = 600;
				dflag = dflag + 1;
			}
			else{
				cy = parseInt(cy) + parseInt(movesize);
			}
			// 値を書き換える
			hrefText = "big_map.php?x=" + (parseInt(cx)) + "&y=" + parseInt(cy);
			aicon.snapshotItem(0).setAttribute("href",hrefText);
			// 消去判定
			if( dflag == 2 ){
				aicon.snapshotItem(0).style.display = "none";
			}
			else{
				aicon.snapshotItem(0).style.display = "inline";
			}

			//-- 下 --//
			dflag = 0;
			aicon = $e('//*[@id="single-allow-south"]/a');
			// 座標値の補正
			cx = x;
			cy = y;
			if( parseInt(cx) + parseInt(movesize) > 600 ){
				cx = 600;
				dflag = dflag + 1;
			}
			else{
				cx = parseInt(cx) + parseInt(movesize);
			}
			if( parseInt(cy) - parseInt(movesize) < -600 ){
				cy = -600;
				dflag = dflag + 1;
			}
			else{
				cy = parseInt(cy) - parseInt(movesize);
			}
			// 値を書き換える
			hrefText = "big_map.php?x=" + (parseInt(cx)) + "&y=" + parseInt(cy);
			aicon.snapshotItem(0).setAttribute("href",hrefText);
			// 消去判定
			if( dflag == 2 ){
				aicon.snapshotItem(0).style.display = "none";
			}
			else{
				aicon.snapshotItem(0).style.display = "inline";
			}

			//-- 上 --//
			dflag = 0;
			aicon = $e('//*[@id="single-allow-north"]/a');
			// 座標値の補正
			cx = x;
			cy = y;
			if( parseInt(cx) - parseInt(movesize) < -600 ){
				cx = -600;
				dflag = dflag + 1;
			}
			else{
				cx = parseInt(cx) - parseInt(movesize);
			}
			if( parseInt(cy) + parseInt(movesize) > 600 ){
				cy = 600;
				dflag = dflag + 1;
			}
			else{
				cy = parseInt(cy) + parseInt(movesize);
			}
			// 値を書き換える
			hrefText = "big_map.php?x=" + (parseInt(cx)) + "&y=" + parseInt(cy);
			aicon.snapshotItem(0).setAttribute("href",hrefText);
			// 消去判定
			if( dflag == 2 ){
				aicon.snapshotItem(0).style.display = "none";
			}
			else{
				aicon.snapshotItem(0).style.display = "inline";
			}
		}

		//----------------------------//
		// 起点に戻るボタンの書き換え //
		//----------------------------//
		// 拠点座標取得
		aicon = $e('//*[@id="icon_base"]');
		hrefText = "map.php?x=" + parseInt(basex) + "&y=" + parseInt(basey);
		aicon.snapshotItem(0).firstChild.setAttribute("href",hrefText);

		//----------------//
		// 距離の書き換え //
		//----------------//
		var dx;
		var dy;
		dx = parseInt(basex) - parseInt(x);
		dy = parseInt(basey) - parseInt(y);
		var distance = Math.round(Math.sqrt(Math.pow(parseInt(dx),2) + Math.pow(parseInt(dy),2)) * 100) / 100;
		aicon = $e('//*[@id="lDistCenter"]');
		aicon.snapshotItem(0).innerHTML = "<font color=\"blue\"><b>" + roundx(distance,2) + "</b></font>";
	}


}

// 書式整形：他サイトのソースを引用
function roundx(num, n) {
	var str = new String();
	var z = "";
	str = new String(num);
	for (i = 0; i < n; i++) z = z + "0";
	if (str.indexOf(".") < 0) return str + "." + z;
	str = str + z;
	return str.split(".")[0] + "." + str.split(".")[1].substring(0, n);
}


//--------------//
// データロード //
//--------------//
function loadExecFlag(hostname, key) {
	var datakey = new String();
	datakey = hostname + VERSION_KEY + key;

	var ret = new String();
	var src = CookieRead(datakey);
	if (src == "") return ret;

	return src;
}

//--------------//
// データセーブ //
//--------------//
function saveExecFlag(hostname, key, data) {

	var datakey = new String();
	datakey = hostname + VERSION_KEY + key;

	CookieWrite(datakey, data, 30);
}

//----------------------//
// クッキーへの書き込み //
//----------------------//
function CookieWrite(kword, kdata, kday)
{
	if(!navigator.cookieEnabled){    // クッキーが利用可能かどうか
		alert("クッキーへの書き込みができません");
		return;
	}

	sday = new Date();
	sday.setTime(sday.getTime() + (kday * 1000 * 60 * 60 * 24));
	s2day = sday.toGMTString();
	document.cookie = kword + "=" + escape(kdata) + ";expires=" + s2day;
}

//----------------------//
// クッキーから読み込み //
//----------------------//
function CookieRead(kword)
{
	if(typeof(kword) == "undefined"){	// キーワードなし
		return "";	// 何もしないで戻る
	}

	kword = kword + "=";
	kdata = "";
	scookie = document.cookie + ";";	// クッキー情報を読み込む
	start = scookie.indexOf(kword);		// キーワードを検索
	if (start != -1){
		// キーワードと一致するものあり
		end = scookie.indexOf(";", start);	// 情報の末尾位置を検索
		kdata = unescape(scookie.substring(start + kword.length, end));	// データ取り出し
	}

	return kdata;
}

//----------------//
// 起点座標の変更 //
//----------------//
function changeBasePos()
{
	//--------------------------------------------//
	// 全体表示画面から、画面中央座標を手に入れる //
	//--------------------------------------------//
	var codx;
	var cody;
	var x;
	var y;
	if( location.pathname != "/big_map.php" ){
		// 51x51画面ではない
		codx = $e('//div[@id="datas"]/input[@id=\"x\"]');
		cody = $e('//div[@id="datas"]/input[@id=\"y\"]');

		x = codx.snapshotItem(0).value;
		y = cody.snapshotItem(0).value;
	}
	else{
		// 51x51画面である
		var li = $e('//*[@id="map51-content"]//li');
		var dt = li.snapshotItem(1300).innerHTML;
		pos = dt.match(/.*x=([-]*\d+)&amp;y=([-]*\d+)#.*/);

		x = pos[1];
		y = pos[2];
	}

	// 表示更新
	var dv2 = $e('//*[@id="txBasePos"]');
	var texta = "(" + formatRightNumber(parseInt(x),4) + "," + formatRightNumber(parseInt(y),4) + ")";
	var textb = texta;
	texta = texta.replace(/ /g,"&nbsp;");
	dv2.snapshotItem(0).innerHTML = texta;

	//----------------------------//
	// 起点に戻るボタンの書き換え //
	//----------------------------//
	// 拠点座標取得
	var aicon = $e('//*[@id="icon_base"]');
	var hrefText = "map.php?x=" + parseInt(x) + "&y=" + parseInt(y);
	aicon.snapshotItem(0).firstChild.setAttribute("href",hrefText);

	//----------------//
	// 距離の書き換え //
	//----------------//
	aicon = $e('//*[@id="lDistCenter"]');
	aicon.snapshotItem(0).innerHTML = "<font color=\"blue\"><b>0.00</b></font>";

	//--------------//
	// クッキー更新 //
	//--------------//
	var savedata;
	savedata = formatRightNumber(parseInt(x),4) + formatRightNumber(parseInt(y),4);

	saveExecFlag(location.hostname, "BASEPOS", savedata);
}

//----------//
// 桁数整形 //
//----------//
function formatRightNumber( num, length ){
	var fix = '      ';
	var str;
	var result = '';

	str = num.toString(10);
	if( str.length < length ){
		result = fix.substr(0,length - str.length) + str;
	}
	else{
		result = str;
	}

	return result;
}


//------------------//
// 画面サイズの取得 //
//------------------//
function getViewSize()
{
	var viewSize;

	if( $x("//div[@id=\"changemapscale\"]/ul/li[@class=\"sort15 now\"]") ){
		viewSize = 15;	// 15x15
	}
	else if( $x("//div[@id=\"changemapscale\"]/ul/li[@class=\"sort20 now\"]") ){
		viewSize = 20;	// 20x20
	}
	else if( $x("//div[@id=\"change-map-scale\"]/ul/li[@class=\"sort15 now\"]") ){
		viewSize = 15;	// 15x15
	}
	else if( $x("//div[@id=\"change-map-scale\"]/ul/li[@class=\"sort20 now\"]") ){
		viewSize = 20;	// 20x20
	}
	else if( $x("//div[@id=\"change-map-scale\"]/ul/li[@class=\"sort51 now\"]") ){
		viewSize = 51;	// 51x51
	}
	else{
		viewSize = 11;	// 11x11
	}

	return viewSize;
}
