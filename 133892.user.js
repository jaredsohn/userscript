// ==UserScript==
// @name           nicosearch
// @version        0.2
// @namespace      http://nicotools.com/nicosearch/
// @description    ニコニコ動画でサジェストを使うnicosearchのGreasemonkey拡張
// @include        http://www.nicovideo.jp/*
// @include        http://seiga.nicovideo.jp/*
// @include        http://live.nicovideo.jp/*
// @include        http://dic.nicovideo.jp/*
// ==/UserScript==

(function() {
var searchInputElement    = null; // 検索のinput Element
var prevSearchKeyword     = null; // 前回のinput.value値
var suggestSelectPosition = null; // 現在選択されている候補の位置
var suggestlength         = null; // 現在表示されている候補の数
var pageType              = null; // ページの種類
var favicon = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAK'+
    'TWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQ'+
    'WaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec'+
    '5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28A'+
    'AgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0'+
    'ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaO'+
    'WJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHi'+
    'wmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryM'+
    'AgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0l'+
    'YqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHi'+
    'NLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYA'+
    'QH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6c'+
    'wR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBie'+
    'whi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1c'+
    'QPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqO'+
    'Y4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hM'+
    'WEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgoh'+
    'JZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSU'+
    'Eko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/p'+
    'dLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Y'+
    'b1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7O'+
    'UndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsb'+
    'di97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W'+
    '7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83'+
    'MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxr'+
    'PGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW'+
    '2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1'+
    'U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd'+
    '8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H0'+
    '8PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+H'+
    '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'+
    'TkSuQmCC';
	
// 検索フィールドの文字入力が発生した時に実行
function loadJSON(text, cb) {
    var func = function( obj ){
        cb(JSON.parse(obj.responseText));
    }
    
    GM_xmlhttpRequest ({
        method: "GET",
        url: "http://nicotools.com/nicosearch/mysqli.php?inp=" + encodeURI(text),
        onload: func
    });
}
// content script
// サジェスト欄を2px下げる done
// 変換中に全てがひらがなの時に出ない問題を修正 ?????
// マウスクリックで入力ではなく検索できるようにする done?
// 場当たり的な対処が多いのでニコニコの仕様変更に対応できない可能性が高い
var values = []; // 入力欄ごとのグローバル変数の代わり
// input,inputvalueなどを使っている部分を全部valuesの中身を使うようにする
/*
var input = null;
var inputvalue = null;
var selected = null; // 現在選択されている候補
var suggestlength = null; //現在表示されている候補の数
*/
var page = null; // ページの種類
var tag_event_added = false; // タグ編集のイベントが追加されていればtrue
var inputcount = 0; // 入力欄の番号
//var tag_suggest_id = null;
var tag_suggest_ids = [];
var new_tab_open  = false;
/*function loadJSON(str, cb) {
  cb(["あああ", "いいい", "ううう"]);
}*/

// parentNodeをたどってformになるのを探す submit用
function formElem(elem) {
  if (elem.tagName == "FORM") {
    return elem;
  } else {
    return formElem(elem.parentNode);
  }
}
// 位置を取得
function pos(elem) {
  var rect = elem.getBoundingClientRect();
  var scrolltop = document.body.scrollTop;
  var scrollleft = document.body.scrollLeft;
  return {left: rect.left + scrollleft, top: rect.top + scrolltop};
}
// strが全て空白ならtrue
function all_space(str) {
  for (var i = 0, c = str.length; i < c; i++) {
    if (str.charAt(i) != " ") {
      return false;
    }
  }
  return true;
}
// 候補表示
function show_suggest(res, id, suggest, buffArray, input) {
  vals = values[id]
  // 候補が無い場合は前の結果を残す
  if (res == [] || res == false) {
    return;
  }
  vals.selected = null;
  var oldElem = document.getElementById("suggestelem_" + id);
  if (oldElem != null) {
    document.body.removeChild(oldElem);
  }
  if (vals.input.value == "" || all_space(vals.input.value)) {
    return;
  }
  var suggestElem = document.createElement("div");
  suggestElem.id = "suggestelem_" + id;
  suggestElem.className = "suggestbox";
  suggestElem.style.zIndex = 100000;
  suggestElem.style.border = "solid #778899 1px";
  
  var inputpos = pos(vals.input);
  suggestElem.style.position = "absolute";
  //suggestElem.style.paddingLeft = "3px";
  suggestElem.style.left = "" + (inputpos.left - 3) + "px";
  //suggestElem.style.left = "" + (inputpos.left) + "px";
  suggestElem.style.top = "" + (inputpos.top + vals.input.offsetHeight + 2) + "px";
  suggestElem.style.backgroundColor = "#ffffff";
  suggestElem.style.minWidth = "" + vals.input.offsetWidth + "px";
  suggestElem.style.textAlign = "left";
  document.body.appendChild(suggestElem);
  
  for (var i = 0, c = res.length; i < c; i++) {
    var d = document.createElement("div");
    var h = document.createElement("a");
    h.href = "http://dic.nicovideo.jp/a/" + res[i];
    if (new_tab_open)
	  h.target = "_blank";
	  
	var img = document.createElement("img");
    img.src = favicon;
    img.align = "left";
    img.style.paddingTop = "1px";
    img.style.paddingBottom = "1px";  
	h.appendChild(img);
    d.appendChild(h);
  
    var p = document.createElement("p");
    p.style.paddingLeft = "17px";//3pxだった
    //p.style.paddingTop = "0px"; //特定環境下でサジェストが斜めになる問題
	if(location.host == "live.nicovideo.jp" || location.host == "seiga.nicovideo.jp") {	// ホストがlive.nicovideo.jpか否かで振り分け
		p.style.paddingTop = "2px";
		p.style.height = "16px";
	} else { 
		p.style.height = "18px";
		p.style.fontSize = "14px";
	}
    //p.style.display = "block";
    // クリックした時
    p.addEventListener("click", function(e) {
      vals.input.value = e.target.firstChild.nodeValue;
      document.body.removeChild(document.getElementById("suggestelem_" + id));
      var form = formElem(input);
      // タグ編集用
      if (vals.input.name == "tag") {
        return;
      }
      // トップページ用
      //if (form.action != "") {
      if (page == "top") {
        var str = "";
        if (form.action.charAt(form.action.length - 1) == "/") {
          str = "";
        } else {
          str = "/";
        }
        url = form.action + str + encodeURI(input.value);
        document.location = url;
        return;
      }
      // 静画用
      if (document.location.host == "seiga.nicovideo.jp") {
        document.getElementById("search_button").click();
        return;
      }
      // マイページ用
      if (page == "my") {
        document.getElementsByClassName("miniSearchSubmit")[0].click();
        return;
      }
      // 動画関係のページやその他用
      form.submit();
	  //return false;
      /*var evt = document.createEvent("UIEvents");
      evt.initUIEvent("keypress", true, true, window, 0);
      evt.keyCode = 13;
      evt.charCode = 13;
      input.dispatchEvent(evt);*/
      // できない?
      // あきらめることも考えておく
    });
    // マウスが上に来た時
    p.addEventListener("mouseover", function(e) {
      e.target.style.backgroundColor = "#afeeee";
    });
    // マウスが要素から出た時
    p.addEventListener("mouseout", function(e) {
      e.target.style.backgroundColor = "#ffffff";
    });
    if (suggest) {
	if (buffArray == null)
	    p.appendChild(document.createTextNode(res[i]));
        else {
	    var buff = "";

	    for (var j = 0, c2 = buffArray.length; j < c2; j++) {
		buff += buffArray[j] + " ";
	    }
	    buff += res[i];
	    p.appendChild(document.createTextNode(buff));
        }
    } else {
      p.appendChild(document.createTextNode(res[i]));//関連タグ用の拡張がここにくる
    }
    d.appendChild(p);
    suggestElem.appendChild(d);
  }
  // nicotools.comへのリンク
  var link = document.createElement("a");
  link.href = "http://nicotools.com/";
  link.style.color = "#666666";//"#d3d3d3";
  link.style.fontSize = "50%";
  link.style.float = "right";
  link.appendChild(document.createTextNode("Powered by nicotools.com"));
  suggestElem.appendChild(link);
  //suggestElem.style.zIndex = 100000;
  //suggestElem.style.border = "solid #778899 1px";
  vals.suggestlength = res.length;
}
// 上下が押された時 upがtrueなら上
function updown(up, id) {
  up = !up;
  vals = values[id];
  if (vals.selected == null) {
    vals.selected = -1;
  }
  var suggestElem = document.getElementById("suggestelem_" + id);
  var nextElem = suggestElem.childNodes[vals.selected + 1];
  if (vals.selected == null) {
    vals.selected = 0;
  } else if (up) {
    vals.selected += 1;
  } else {
    vals.selected -= 1;
  }
  if (vals.selected < 0) {
    vals.selected = vals.suggestlength - 1;
    suggestElem.childNodes[0].style.backgroundColor = "#ffffff";
  } else if (vals.selected >= vals.suggestlength) {
    vals.selected = 0;
  }
  if (up && suggestElem.childNodes[vals.selected - 1]) {
    suggestElem.childNodes[vals.selected - 1].style.backgroundColor = "#ffffff";
  } else if (suggestElem.childNodes[vals.selected + 1] && nextElem.tagName != "A") {
    suggestElem.childNodes[vals.selected + 1].style.backgroundColor = "#ffffff";
  }
  if (vals.selected != vals.suggestlength - 1) {
    suggestElem.childNodes[vals.suggestlength - 1].style.backgroundColor = "#ffffff";
  }
  suggestElem.childNodes[vals.selected].style.backgroundColor = "#afeeee";
  vals.input.value = suggestElem.childNodes[vals.selected].childNodes[1].innerHTML;
}
// DOM要素inputでサジェストを有効化
function makesuggest(input) {
  var id = inputcount.toString();

  values[id] = {};
  values[id]["input"] = null;
  values[id]["inputvalue"] = null;
  values[id]["selected"] = null; // 現在選択されている候補
  values[id]["suggestlength"] = null; //現在表示されている候補の数
  values[id]["input"] = input;

  //input.addEventListener("click", function(e) {
    //loadRelateJSON(input.value, function (arr) { show_suggest(arr, id, false); });//表示のためにcallbackを変える必要がある
    //loadJSON(input.value, function (arr) { show_suggest(arr, id, true); });
  //});

  input.addEventListener("keyup", function(e) {
    //if (input.value == "sm9")
    //{
    //    window.open("http://www.nicovideo.jp/watch/sm9", "_self");
    //    return;
    //}
  
    if (e.keyCode == 38) {
      updown(true, id);
      return;
    } else if (e.keyCode == 40) {
      updown(false, id);
      return;
    } else if (e.keyCode == 8 && input.value == "") {//入力された文字が無くなった時にサジェストを消す
        for (var i = 0, c = values.length; i < c; i++) {
            var suggestElem = document.getElementById("suggestelem_" + i.toString());
            if (suggestElem == null) {
                return;
            }
            document.body.removeChild(suggestElem);
        }
    }// else if (e.keyCode == 32) {//サジェストを分ける
    //}

    inputvalue = input.value;
    var buff = "";
    var buffArray = null;
    for (var i = 0, j = 0, c = inputvalue.length; i < c; i++) {
	if (inputvalue[i] == " " || inputvalue[i] == "　") {
	    if (buffArray == null)
		buffArray = new Array();
	    buffArray[j] = buff;
	    j++;
	    buff = "";
	}
	else
	    buff += inputvalue[i];
    }

    //if (e.keyCode == 32) {
      //input.valueをサーバに投げて関連タグを呼び出す
      //loadRelateJSON(input.value, function (arr) { show_suggest(arr, id, false); });//表示のためにcallbackを変える必要がある
    //} else {
      loadJSON(buff, function (arr) { show_suggest(arr, id, true, buffArray, input); });
    //}
  });
  input.setAttribute("autocomplete", "off");
  inputcount++;
  return id;
}

function main() {
  // video_top, その他動画関係, 静画など
  input = document.getElementById("bar_search");
  page = "video";
  var inputz = null;
  
  if (input != undefined) {
    var flvplayer = document.getElementById("flvplayer");
    if (flvplayer != undefined)
        flvplayer.setAttribute("wmode", "transparent"); 
  }
  // 全体のトップページ
  if (input == undefined) {
    page = "top"
    input = document.getElementById("searchWord");
  }
  // キーワード検索結果
  if (input == undefined) {
    page = "keyword";
    input = document.getElementById("search_united");
  }
  // 生放送
  if (input == undefined) {
    page = "live";
    input = document.getElementById("search_target");
  }
  // 大百科
  if (input == undefined) {
    page = "dic";
    input = document.getElementById("search-box");
  }
  // マイページ
  if (input == undefined) {
    page = "my";
    input = document.getElementsByClassName("miniSearchWord")[0];
  }
  if (input == undefined) {
	page = "video2";
	inputz = new Array();
	
	//try {
		var inp = document.getElementsByClassName("searchText")[0];
		if (inp != undefined)
			inputz[0] = inp.children[1];
		inp = document.getElementsByClassName("searchText")[1];
		if (inp != undefined)
			inputz[1] = inp.children[1];
	//} catch (e)
	//{}
  }
  // タグ編集 tag_editを監視
  // 複数の入力欄に対処できない!!!!! 完了
  if (page == "video") {
    //var tagedit = document.getElementsByClassName("tag_edit")[0];
    var tagedit = document.getElementById("WATCHHEADER");
    //console.log(tagedit);
    if (tagedit != [] && tagedit != undefined) {
      tagedit.addEventListener("DOMSubtreeModified", function() {
        if (!tag_event_added) {
          //tag_suggest_id = makesuggest(document.getElementsByName("tag")[0]);
          tag_suggest_ids.push(makesuggest(document.getElementById("tagedit_input")));
	  tag_event_added = true;
        }
        else {
          // タグ編集欄が消えた時
          //document.body.removeChild(document.getElementById("suggestelem_" + tag_suggest_id.toString()));
          for (var i in tag_suggest_ids) {
		if (document.getElementById("suggestelem_" + tag_suggest_ids[i].toString()) != null) {
			document.body.removeChild(document.getElementById("suggestelem_" + tag_suggest_ids[i].toString()));
			tag_suggest_ids.splice(i, 1);
		}
	  }
	  tag_event_added = false;
        }
      });
    }
  }
  else if (page == "video2") {
	var target = document.getElementById("tagEditContainer").children[0].children[0].children[0];
	makesuggest(target);
  }
  // Zero対応
  if (input == null && inputz != null) {
	for (var i = 0, c = inputz.length; i < c; i++) {
		makesuggest(inputz[i]);
	}
  }
  // 入力欄が無い場合は何もしない
  else if (input == null) {
    return;
  }
  else
	makesuggest(input);
  /*
  input.addEventListener("keydown", function(e) {
    if (e.keyCode == 38) {
      updown(true);
      return;
    } else if (e.keyCode == 40) {
      updown(false);
      return;
    }
    inputvalue = input.value;
    loadJSON(input.value, show_suggest);
  });
  input.setAttribute("autocomplete", "off");
  */
}
// 生放送でloadが動かない!!!!!!!!!!!!!!!!!!
// ↑ 解決 manifest.jsonでrun_atを指定した 動かなかった原因は不明
//document.body.addEventListener("load", main, true);
//document.body.addEventListener("load", function() {console.log("aljal3j");}, true);
main();
// 違う場所をクリックしたらサジェストを消す
document.body.addEventListener("click", function(e) {
  x = e.x;
  y = e.y;
  // 修正必要 done
  for (var i = 0, c = values.length; i < c; i++) {
    var suggestElem = document.getElementById("suggestelem_" + i.toString());
    if (suggestElem == null) {
      return;
    }
    var rect = suggestElem.getBoundingClientRect();
    if (!(x > rect.left && y > rect.top && x < rect.right && y < rect.bottom)) {
      document.body.removeChild(suggestElem);
    }
  }
});

})();