// ==UserScript==
// @name       ErogameScape Rich Review
// @namespace  http://blueblueblue.fool.jp/
// @description  エロスケのレビューをちょっとリッチにする
// @copyright  2013-2014, ebi
// @version    1.7
// updateURL       http://userscripts.org/scripts/source/161873.meta.js
// @updateURL      http://userscripts.org/scripts/source/161873.meta.js
// @downloadURL    http://userscripts.org/scripts/source/161873.user.js
// @include    http://erogamescape.dyndns.org/~ap2/ero/toukei_kaiseki/memo.php*
// @include    http://erogamescape*/~ap2/ero/toukei_kaiseki/memo.php*
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

function loadedListener () {
    function getTitle(obj){
        var id = obj.id;
        var xhr=new XMLHttpRequest()
        xhr.onload = function() {
            doc.getElementById(id).title = doc.getElementById(id).innerHTML;
            doc.getElementById(id).innerHTML = this.responseXML.title||"no title";
        }
        xhr.open("GET", obj.href ,true);
        xhr.responseType="document";
        xhr.send();
    }

    /*config*/
    var doc = document;
    var memo = doc.getElementById("memo");
    var st = "/*CSS*/";
    var ed = "/*CSS EOF*/";
    
    /*default_css*/
    var default_css = ""
            + "/*CSS*/\n"
            + "* {\n"
            + "font-family:'メイリオ',Meiryo,'ヒラギノ角ゴ Pro W3','Hiragino Kaku Gothic Pro','ＭＳ Ｐゴシック','MS PGothic',sans-serif;\n"
            + "}\n"
            + "#memo, #responce {\n"
            + "width:800px;\n"
            + "}\n"
            + "#memo, #responce > * {\n"
            + "font-size:1.1em; letter-spacing:0;line-height:1.4; padding:10px;\n"
            + "}\n"
            + "/*CSS EOF*/";

	var localstrage_css = localStorage.getItem("us-review-default-css");
    
    /*reviewer_css*/
    memo.innerHTML = memo.innerHTML.replace(/\/\*CSS\*\/(\n|\r|\n\r|.)*?\/\*CSS\sEOF\*\//gi,
        function(s1){
            return "<div id=\"wrapper_mycss\">"
                 + "<hr>"
                 + "[http://blueblueblue.fool.jp/wp/archives/5052:title=ErogameScapeのレビューを少しリッチにする]"
                 + "<textarea id=\"config_mycss\" style=\"width:90%;height:100px;\">"
                 + s1.replace(/<br>/gi, "\n")
                 + "</textarea>"
                 + "<br><input type=\"button\" id=\"change_mycss\" value=\"change\" />"
                 + "<input type=\"button\" id=\"save_mycss\" value=\"save css\" />"
                 + "<input type=\"button\" id=\"load_mycss\" value=\"load css\" />"
                 + "<input type=\"button\" id=\"none_mycss\" value=\"none css\" />"
                 + "</div>";
        }
    );

    if ( localstrage_css ) {
        default_css = localstrage_css;
    }

    /*mycss create*/
    var css = doc.createElement("style");
    css.id = "mycss";
    css.type = "text/css";

    /*blockquote hatena*/
    memo.innerHTML = memo.innerHTML.replace(/\&gt;\&gt;(\n|\r|\n\r|.)*?\&lt;\&lt;/gi
      , function(s1){
            return "<blockquote>"
                 + s1.replace(/\&lt;|\&gt;|/gi,"").replace("<br>", "")
                 + "</blockquote>";
        }
    );

    /*url*/
    memo.innerHTML = memo.innerHTML.replace(/\[?h?ttps?(:\/\/[-_\.!~*\'a-zA-Z0-9;\/\?\@&=+\$,%#]+(:title=[^\]]*)?\]?)/gi
      , function(s1){
            //return "<a href=\"" + s1.replace(/<br>|\n|\s|　/gi, "") + "\" target=\"new\">" + s1.replace(/<br>|\n|\s|　/gi, "") + "</a>";
            hatena = "";
            if ( s1.indexOf("[", 0) !== -1 ) {
                hatena =" class=\"hatena-url\"";
            }
            s1 = s1.replace(/<br>|\n|\s|　|\[|\]/gi, "");
            if ( s1.indexOf("http", 0) == -1 ) {
                s1 = "h" + s1;
            }
            if ( s1.indexOf(":title=", 0) !== -1 ) {
                return "<a href=\"" + s1.split(":title=")[0] + "\" " + hatena + "target=\"new\">" + s1.split(":title=")[1] + "</a>";
            } else {
                return "<a href=\"" + s1 + "\" " + hatena + "target=\"new\">" + s1 + "</a>";
            }
        }
    );

    /*es link*/
    tmp = "";
    memo.innerHTML = memo.innerHTML.replace(/\(game:[0-9]*?\)/gi
      , function(s1){
            return "<a href=\"game.php?game=" + s1.replace(/game:|\(|\)/gi, "")
                 + "\" target=\"new\">" + s1 + "</a>";
        }
    );
    memo.innerHTML = memo.innerHTML.replace(/\(brand:[0-9]*?\)/gi
      , function(s1){
          return "<a href=\"brand.php?brand="
               + s1.replace(/brand:|\(|\)/gi,"")
               + "\" target=\"new\">" + s1 + "</a>";
        }
    );
    memo.innerHTML = memo.innerHTML.replace(/\(memo:[0-9]*?,.*?\)/gi
      , function(s1){
            return "<a href=\"memo.php?game="
                 + s1.replace(/memo:|\(|\)|\s/gi,"").split(",")[0]
                 + "&uid=" + encodeURIComponent(s1.replace(/memo:|\(|\)|\s/gi, "").split(",")[1] )
                 + "\"target=\"new\">" + s1 + "</a>";
        }
    );

    /*kakko*/
    memo.innerHTML = memo.innerHTML.replace(/「.+?」/gi
      , function(s1){
            return "<span class=\"kakko1\">" + s1 + "</span>";
        }
    );
    memo.innerHTML = memo.innerHTML.replace(/『.+?』/gi
      , function(s1){
            return "<span class=\"kakko2\">" + s1 + "</span>";
        }
    );
    memo.innerHTML = memo.innerHTML.replace(/（.+?）/gi
      , function(s1){
            return "<span class=\"kakko3\">" + s1 + "</span>";
        }
    );
    memo.innerHTML = memo.innerHTML.replace(/“.+?”/gi
      , function(s1){
            return "<span class=\"kakko4\">" + s1 + "</span>";
        }
    );

    /*check rows*/
    memo.innerHTML = memo.innerHTML.replace(/\n|\r|\n\r/gi, "");
    var rows = memo.innerHTML.split("<br>");
    var new_memo = "";
    for (var i = 0; i < rows.length; i++) {
        rows[i] = rows[i].replace(/\n/gi, "");
    
        /*h3,h4,h5,li hatena*/
        if (rows[i].indexOf("***", 0) == 0) {
            new_memo += "<h5>" + rows[i].replace(/\*/gi, "") + "</h5>";
        } else if (rows[i].indexOf("**", 0) == 0) {
            new_memo += "<h4>" + rows[i].replace(/\*/gi, "") + "</h4>";
        } else if (rows[i].indexOf("*", 0) == 0) {
            new_memo += "<h3>" + rows[i].replace(/\*/gi, "") + "</h3>";
        } else if (rows[i].indexOf("-", 0) == 0) {
            new_memo += "<li>" + rows[i].replace(/-/gi, "") + "</li>";
        } else {
            new_memo += rows[i] + "<br>";
        }
    }
    memo.innerHTML = new_memo;
    
    /*url to title*/
    var elm = memo.getElementsByTagName("a");
    for (var i = 0; i < elm.length; i++) {
        if ( elm[i].className.indexOf("hatena-url", 0) == -1 ) {
            elm[i].id = "auto_link_" + i;
            getTitle(elm[i]);
        }
    }
    
    if ( doc.getElementById("config_mycss") == null ) {
        memo.innerHTML += ""
            + "<div id=\"wrapper_mycss\">"
            + "<hr>"
            + "<a href=\"http://blueblueblue.fool.jp/wp/archives/5052\">ErogameScapeのレビューを少しリッチにする</a>"
            + "<textarea id=\"config_mycss\" style=\"width:90%;height:100px;\">"
            + default_css
            + "</textarea>"
            + "<br><input type=\"button\" id=\"change_mycss\" value=\"change\" />"
            + "<input type=\"button\" id=\"save_mycss\" value=\"save css\" />"
            + "<input type=\"button\" id=\"load_mycss\" value=\"load css\" />"
            + "<input type=\"button\" id=\"none_mycss\" value=\"none css\" />"
            + "</div>";
    }
    css.innerHTML = doc.getElementById("config_mycss").value.replace(/\&gt;/gi, ">").replace(/\&lt;/gi, "<");
    doc.getElementsByTagName("body")[0].appendChild(css);

    var before = doc.getElementById("wrapper_mycss");
    var after = doc.createElement("div");
    after.id = "wrapper_mycss_after";
    doc.getElementsByTagName("body")[0].appendChild(after);
    after.innerHTML = before.innerHTML;
    before.parentNode.removeChild(before);

    /*userreview_log*/
	var uid = doc.getElementById("main").getElementsByTagName("h2")[0].getElementsByTagName("a")[0].innerText;
	var game = doc.getElementById("main").getElementsByTagName("h2")[0].getElementsByTagName("a")[1].href.split("game=")[1].split("#")[0];

    var form = doc.createElement("form");
	form.style.display = "inline";
	form.action = "user_userreview_log_nama.php?user_id=" + uid + "&game_id=" + game;
	form.name = "userreview_log";
	form.method = "post";
	form.target = "new";

    var btn = doc.createElement("input");
	btn.type = "submit";
	btn.value = "userreview log";
	form.appendChild(btn);

	doc.getElementById("main").insertBefore(form, doc.getElementById("main").firstChild);

    /*referer check*/
    var form = doc.createElement("form");
	form.style.display = "inline";
	form.action = "select.php";
	form.name = "SQL_FROM";
	form.method = "post";
	form.target = "new";

    var btn = doc.createElement("input");
	btn.type = "submit";
	btn.value = "referer check";
	form.appendChild(btn);

	var uid = doc.getElementById("main").getElementsByTagName("h2")[0].getElementsByTagName("a")[0].innerText;
	var game = doc.getElementById("main").getElementsByTagName("h2")[0].getElementsByTagName("a")[1].href.split("game=")[1].split("#")[0];

    var sql = doc.createElement("input");
	sql.type = "hidden";
	sql.name = "SQL";
	sql.value = "referer, count(*) from (select regexp_matches(referer,'^[https]+://([0-9a-z.-:]+?):?[0-9]*?/') as referer from userreview_display_log where game = " + game + " and uid = '" + uid + "') as foo group by referer";
	form.appendChild(sql);
	
	doc.getElementById("main").insertBefore(form, doc.getElementById("main").firstChild);

    /*function mycss change*/
    doc.getElementById("change_mycss").onclick = function() {
        doc.getElementById("mycss").innerHTML = doc.getElementById("config_mycss").value;
    }

    /*function mycss save*/
    doc.getElementById("save_mycss").onclick = function() {
    	localStorage.setItem("us-review-default-css", doc.getElementById("config_mycss").value);
    }

    /*function mycss load*/
    doc.getElementById("load_mycss").onclick = function() {
    	doc.getElementById("config_mycss").value = localStorage.getItem("us-review-default-css");
        doc.getElementById("mycss").innerHTML = doc.getElementById("config_mycss").value;
    }

    /*function mycss none*/
    doc.getElementById("none_mycss").onclick = function() {
    	doc.getElementById("config_mycss").value = "";
        doc.getElementById("mycss").innerHTML = doc.getElementById("config_mycss").value;
    }
}})();
