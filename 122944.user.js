// ==UserScript==
// @name       ErogameScape CharacterDB
// @namespace  http://blueblueblue.fool.jp/wp/
// @version    1.3
// @description  エロスケのゲームの情報画面にRagna Archives Network 2のキャラクターデータベースを表示
// @include    http://erogamescape*/~ap2/ero/toukei_kaiseki/game.php?game=*
// @include    http://erogamescape*/~ap2/ero/toukei_kaiseki/brand.php?brand=*
// @include    http://www5.big.or.jp/~seraph/ragna/edit.cgi?mode=add_character*
// @copyright  2012+, ebi
// ==/UserScript==

(function (loadedListener) {
    var doc, readyState;
  
    doc = document;
    readyState = doc.readyState;
  
    if (readyState === 'complete' || readyState === 'interactive') {
      loadedListener();
    } else {
      doc.addEventListener("DOMContentLoaded", loadedListener, false);
    }
})

(function () {
    var doc = document;
    
    if ( location.href.indexOf("ragna", 0) !== -1 ) {
      var get = getRequest();
      doc.getElementsByName("game")[0].value = "<span rel=\"eid:" + get['es_game'] + "\">" + decodeURIComponent( get['es_gamename'] ) + "</span>";
      return;
    }
    
    //get
    function getRequest(){
      if(location.search.length > 1) {
        var get = new Object();
        var ret = location.search.substr(1).split("&");
        for(var i = 0; i < ret.length; i++) {
          var r = ret[i].split("=");
          get[r[0]] = r[1];
        }
        return get;
      } else {
        return false;
      }
    }

    //undefinedチェック
    function chkUndefined(num) {
        num = String(num);
        if (num == "undefined" || num == "") {
            return "-";
        } else {
            return num;
        }
    }
    
    //配列の重複削除
    function unique(array) {
        var storage = {};
        var uniqueArray = [];
    
        var i, value;
        for (i = 0; i < array.length; i++) {
            value = array[i];
            if (!(value in storage)) {
                storage[value] = true;
                uniqueArray.push(value);
            }
        }
    
        return uniqueArray;
    }

    //jsonソート用
    var sort_by = function(field, reverse, primer){
       reverse = (reverse) ? -1 : 1;
       return function(a,b){
           a = a[field];
           b = b[field];
           if (typeof(primer) != 'undefined'){
               a = primer(a);
               b = primer(b);
           }
           if (a<b) return reverse * -1;
           if (a>b) return reverse * 1;
           return 0;
       }
    }

    var style = doc.createElement('style');
    style.type = "text/css";
    var txtsize = '100%';
    style.innerHTML =
        ".us-ragna-table {\n" +
        "font-size:" + txtsize + ";\n" +
        "margin-left:0px;\n" +
        "}\n" +
        ".us-ragna-table th ,.us-ragna-table td {\n" +
        "border-right: #0c7eb2 solid 1px;\n" +
        "border-bottom: #0c7eb2 solid 1px;\n" +
        "border: #99f solid 1px;\n" +
        "}\n" +
        ".us-ragna-table tr.head th, .us-ragna-table tr.head td {\n" +
        "color:#ffffff;\n" +
        "background:#0c7eb2;\n" +
        "text-align:center;\n" +
        "}\n" +
        ".us-ragna-table tr.odd th, .us-ragna-table tr.odd td {\n" +
        "background:#ffffff;\n" +
        "}\n" +
        ".us-ragna-table tr.even th, .us-ragna-table tr.even td {\n" +
        "background:#dbffff;\n" +
        "}\n" +
        ".us-ragna-table tr, .us-ragna-table th, .us-ragna-table td  {\n" +
        "padding: 1px 10px;\n" +
        "}\n" +
        ".us-ragna-table td ul {\n" +
        "margin: 1px;\n" +
        "padding: 0;\n" +
        "}\n" +
        "#us-ragna-toggle {\n" +
        "cursor: pointer;\n" +
        "}\n" +
        ".us-ragna-table td li, .us-ragna *.caption, #us-ragna-toggle {\n" +
        "font-size:90%;\n" +
        "color:#ffffff;\n" +
        "background: #0c7eb2;\n" +
        "box-shadow: 2px 1px 1px rgba(0,0,0,0.4);\n" +
        "border: #99f solid 1px;\n" +
        "padding:1px 4px 0px 4px;\n" +
        "margin: 1px 4px;\n" +
        "display:inline-block;\n" +
        "border-radius: 6px;\n" +
        "-webkit-border-radius: 6px;\n" +
        "-moz-border-radius: 6px;\n" +            
        "list-style: none;\n" +            
        "}\n" +
        ".us-ragna *.caption {\n" +
        "margin: 0px 0px 5px 0px;\n" +
        "}\n" +
        ".us-ragna-table td ul li a:link, .us-ragna-table td ul li a:visited {\n" +
        "color:#ffffff !important;\n" +
        "}\n";

    doc.getElementsByTagName('head')[0].appendChild(style);
    
    if (location.href.indexOf("game.php", 0) !== -1 || location.href.indexOf("game_.php", 0) !== -1) {
        /*game.php*/
        var elem = doc.getElementById('creater_infomation');
        var ragna = doc.createElement('div');
        ragna.className = "us-ragna-h3";
        ragna.innerHTML = "<h3><a href=\"http://www5.big.or.jp/~seraph/ragna/ragna.cgi\">Ragna Archives Network 2 キャラクターデータベース</a> / <span id=\"us-ragna-toggle\">表示切替</span></h3>";
        elem.appendChild(ragna);

        var game_id, game_id_sub, game_title_sub;
        var header_msg, caption, error_msg;
        var regexpStr, related;
        
        var regexpStr = "/(」のリメイク)|(」のファンディスク)|(」の移植)|(」の続編)/";
        var game_id = location.href.split("game=")[1].split(/#|&/)[0];
        var gamename = encodeURIComponent( doc.getElementById('game_title').innerText );
        var error_msg = "<tr class=\"odd\"><td><ul><li>該当するキャラクタが見つかりません。 <a href=\"http://www5.big.or.jp/~seraph/ragna/edit.cgi?mode=add_character&es_game=" + game_id + "&es_gamename=" + gamename + "\">登録する。</a></li></ul></td></tr></table><br />" +
                        "<iframe src=\"http://blueblueblue.fool.jp/php/userjs_php/ragna_check.php?id=" + game_id + "&data=f\" style=\"display:none;\"></iframe>";
        var related = doc.getElementById("relation");

        header_msg = "";
        caption = "";
        game_php_request(game_id,     header_msg, caption, error_msg);
        if ( related.innerText.match( eval( regexpStr ) ) ) {
            for (var i=0; i < related.getElementsByTagName("li").length; i++) {
                if ( related.getElementsByTagName("li")[i].innerText.match( eval( regexpStr ) ) ) {
                game_id_sub = related.getElementsByTagName("li")[i].getElementsByTagName("a")[0].href.split("game=")[1].split(/#|&/)[0];
                game_title_sub = related.getElementsByTagName("li")[i].getElementsByTagName("a")[0].innerText;
                header_msg = "";
                caption = "▼「" + game_title_sub + "」より誘導";
                game_php_request(game_id_sub, header_msg, caption, error_msg);
                }
            }
        }
        /*game.php*/
    } else if (location.href.indexOf("brand.php", 0) !== -1) {
        /*brand.php*/
        var elem = doc.getElementsByTagName('h3')[2];
        var ragna = doc.createElement('div');
        ragna.className = "us-ragna-h3";
        ragna.innerHTML = "<h3><a href=\"http://www5.big.or.jp/~seraph/ragna/ragna.cgi\">Ragna Archives Network 2 キャラクターデータベース</a> / <span id=\"us-ragna-toggle\">表示切替</span></h3>";
        elem.parentNode.insertBefore(ragna, elem);

        var elem = doc.getElementsByTagName('h3')[3];
        var ragna = doc.createElement('div');
        ragna.className = "us-ragna";
        elem.parentNode.insertBefore(ragna, elem);
        
        var insertHtml = "<table class=\"us-ragna-table\">";
        
        var brand_name = encodeURIComponent(doc.getElementsByTagName('h2')[1].getElementsByTagName('a')[0].innerHTML);
        var pageurl = "http://www5.big.or.jp/~seraph/ragna/ragna.cgi?q=brand%3A" + brand_name + "&mode=search&format=json";
        
        GM_xmlhttpRequest({
            method: 'GET',
            url: pageurl,
            onload: function (x) {
                if (x.responseText.indexOf("該当するキャラクタが見つかりません", -1) == -1) {
                    var myData = JSON.parse(x.responseText);
                    insertHtml += 
                    "<tr class=\"head\">" + 
                    "<th>キャラクターデータが登録されているゲーム</th>" + 
                    "</tr>";
                    var gamelist = new Array();
                    for (var i=0; i < myData.length; i++){
                        gamelist.push(myData[i].game); 
                    }
                    gamelist = unique(gamelist);
                    insertHtml += "<tr class=\"even\"><td><ul>";
                    for (var i=0; i < gamelist.length; i++){
                        if ( gamelist[i].indexOf("eid:" , 0) !== -1 ) {
                            insertHtml += "<li><a href=\"http://www5.big.or.jp/~seraph/ragna/ragna.cgi?q=game%3A" + encodeURIComponent(gamelist[i]) + "&mode=search&support=game%3A\" >" + gamelist[i] + "</a></li>";
                        } else {
                            insertHtml += "<li><a href=\"http://www5.big.or.jp/~seraph/ragna/ragna.cgi?q=brand%3A" + brand_name + "+game%3A" + encodeURIComponent(gamelist[i]) + "&mode=search&support=game%3A\" >" + gamelist[i] + "</a></li>";
                        }
                    }
                    insertHtml += "<tr class=\"even\"></ul></td>";
                    "</tr>";
                    ragna.innerHTML = insertHtml + "</table><br />";
                } else {
                    ragna.innerHTML = insertHtml + "<tr class=\"odd\"><td><ul><li>該当するゲームが見つかりません。 <a href=\"http://www5.big.or.jp/~seraph/ragna/edit.cgi?mode=add_character\">登録する。</a></li></ul></td></tr></table><br />";
                }
            }
        });
        /*brand.php*/
    }
    
/*game_php_request*/
    function game_php_request(game_id, header_msg, caption, error_msg) {
            var doc = document;
            var elem = doc.getElementById('creater_infomation');
            var ragna = doc.createElement('div');
            ragna.className = "us-ragna";
            ragna.innerHTML = "<h3><a href=\"http://www5.big.or.jp/~seraph/ragna/ragna.cgi\">Ragna Archives Network 2 キャラクターデータベース</a> / <span id=\"us-ragna-toggle\">表示切替</span></h3>";
            elem.appendChild(ragna);
            
            var insertHtml = header_msg + "<div class=\"caption\">" + caption + "</div><table class=\"us-ragna-table\"><thead>";
            
            var pageurl = "http://www5.big.or.jp/~seraph/ragna/ragna.cgi?q=gameeid%3A" + game_id + "&mode=search&format=json";
            
            GM_xmlhttpRequest({
                method: 'GET',
                url: pageurl,
                onload: function (x) {
                    if (x.responseText.indexOf("該当するキャラクタが見つかりません", -1) == -1) {
                        var myData = JSON.parse(x.responseText);
                        myData = myData.sort(sort_by('kana', false, function(a){return a.toUpperCase()}));
                        insertHtml += 
                        "<iframe src=\"http://blueblueblue.fool.jp/php/userjs_php/ragna_check.php?id=" + game_id + "&data=t\" style=\"display:none;\"></iframe>" +
                        "<tr class=\"head\">" + 
                        "<th>名前</th>" + 
                        "<td>カナ</td>" + 
                        "<td>誕生日</td>" + 
                        "<td>年齢</td>" + 
                        "<td>血液型</td>" + 
                        "<td>身長</td>" + 
                        "<td>Ｂ</td>" + 
                        "<td>Ｗ</td>" + 
                        "<td>Ｈ</td>" + 
                        "</tr></thead><tbody>";
                        for (var i=0; i < myData.length; i++){
                            if(i % 2 == 0) {
                                var tr = "<tr class=\"even\">";
                            } else {
                                var tr = "<tr class=\"odd\">";
                            }
                            insertHtml += 
                            tr +
                            "<th>" +
                            "<a href=\"http://www5.big.or.jp/~seraph/ragna/ragna.cgi?mode=character&id=" + myData[i].id + "\">" +
                            chkUndefined(myData[i].name) +
                            "</a>" + 
                            "</th>" + 
                            "<td>" + chkUndefined(myData[i].kana        ) + "</td>" + 
                            "<td>" + chkUndefined(myData[i].bitrthday   ) + "</td>" + 
                            "<td>" + chkUndefined(myData[i].age         ) + "</td>" + 
                            "<td>" + chkUndefined(myData[i].blood       ) + "</td>" + 
                            "<td>" + chkUndefined(myData[i].stature     ) + "</td>" + 
                            "<td>" + chkUndefined(myData[i].bust        ) + "</td>" + 
                            "<td>" + chkUndefined(myData[i].waist       ) + "</td>" + 
                            "<td>" + chkUndefined(myData[i].hip         ) + "</td>" + 
                            "</tr>" +
                            tr +
                            "<td colspan=9><ul><li>"  + chkUndefined(myData[i].attributes).split("/").join("</li><li>") + "</li></ul></td>" + 
                            "</tr>" +
                            tr +
                            "<td colspan=9>" + chkUndefined(myData[i].description) + "</td>" + 
                            "</tr>";
                        }
                        insertHtml += "</tbody></table><br />";
                    } else {
                        insertHtml += error_msg;
                    }
                    ragna.innerHTML = insertHtml;
                }
            });
    }
/*game_php_request*/

    doc.getElementById("us-ragna-toggle").onclick = function () {
        var elem = doc.getElementsByTagName("div");
        for (var i=0; i < elem.length; i++) {
            if ( (" " + elem[i].className + " ").indexOf(" us-ragna ", 0) !== -1 ) {
                if ( elem[i].style.display !== "none" ) {
                    elem[i].style.display = "none";
                } else {
                    elem[i].style.display = "block";
                }
            }
        }
    }

})();
