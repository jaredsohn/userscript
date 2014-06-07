// ==UserScript==
// @name           Nico Add Mylist Link
// @namespace      http://efcl.info/
// @description    マイリストへのリンクを追加する
// @include        http://www.nicovideo.jp/*
// ==/UserScript==
// ++ Script for oneself ++: ニコニコ動画のメニューバーに、mylistへのリンクを追加するGreasemonkeyスクリプト
// http://script41self.seesaa.net/article/106627828.html
(function(_doc){
    
var mylistVal = GM_getValue("mylists") || null;
// I/F 
var Mylists = {
    getList : getMylists,
    insert : insertTag,
    makeTag : makeHTMLList
}

if(mylistVal){
   var listTag = Mylists.makeTag(mylistVal);
   Mylists.insert(listTag);
}else{
   Mylists.getList(); 
}

// 取得-保存-挿入
function getMylists(update){
    var req = new XMLHttpRequest();
    req.open('GET', 'http://www.nicovideo.jp/api/mylistgroup/list', false); 
    req.onload = function(){
        var res = req.responseText;
        GM_setValue("mylists", res);
        var listTag = makeHTMLList(res);
        if(update){
            var inpos = _doc.getElementById("AML_list");
            inpos.parentNode.removeChild(inpos);
        }
        Mylists.insert(listTag);
    }
    req.send(null);
}

function insertTag(listTag){
    // 挿入位置探し
    var inpos = _doc.getElementById("menu-ranking");
    inpos.parentNode.appendChild(listTag)
}
function makeHTMLList(res){
  var obj = JSON.parse(res);
  var inp = _doc.createElement("span");
      inp.id = "AML_list"
  var slct = _doc.createElement("select");
      slct.setAttribute("class", "TXT12");
      slct.style.width = "80px";
      slct.setAttribute("onChange", "var idx = this.selectedIndex;if(idx != 0) {location.href = '/mylist/' + this.options[idx].value;}");
      slct.id = "AML_slct";
  var opt = _doc.createElement("option");
      opt.value = "";
      opt.innerHTML = "--myslit--";
      slct.appendChild(opt);
  for (var i=0,l= obj.mylistgroup.length;i < l; i++) {
      opt = _doc.createElement("option");
      opt.value = obj.mylistgroup[i].id;
      opt.innerHTML = obj.mylistgroup[i].name;
      slct.appendChild(opt);
  };
  var refresh = _doc.createElement("a");
      refresh.innerHTML = "更新";
      refresh.setAttribute("style","cursor:default");
      refresh.addEventListener("click", function(){
          // update
          Mylists.getList(true);
      }, false);
  inp.appendChild(slct)
  inp.appendChild(refresh);
  
  return inp;
}
})(document);