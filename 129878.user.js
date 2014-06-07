// ==UserScript==
// @name       ErogameScape Game input
// @namespace  http://blueblueblue.fool.jp/
// @version    1.2
// @description  エロスケのゲーム情報入力サポート
// @include    http://erogamescape*/~ap2/ero/toukei_kaiseki/mod.php?game=*
// @include    http://erogamescape*/~ap2/ero/toukei_kaiseki/contents_insert_game.php
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
    if (location.href.indexOf("mod.php", 0) !== -1 || location.href.indexOf("contents_insert_game.php", 0) !== -1) {

        /* create */
        var doc = document;
        var button_style = "display:inline-block;cursor:pointer;border:solid 1px #000;height:20px;margin:0;padding:1px 8px;text-align:center;";

        var elem = doc.createElement("div");
        elem.id = "us-gameinput";
        elem.setAttribute("style", "font-size:0.85em;border:solid 1px #000;background:#ddd;position:fixed;top:0;right:0;width:400px;margin:3px;padding:3px;");
    
        var elem_c = doc.createElement("div");
        elem_c.setAttribute("style", "color:#fff;font-weight:bold;background:#000;width:auto;height:20px;margin:0;padding:1px 8px;text-align:center;");
        elem_c.innerHTML = "Game Input (Url)";
        elem.appendChild(elem_c);

        var elem_c = doc.createElement("textarea");
        elem_c.setAttribute("style", "width:394px;height:140px;margin:2px;padding:3px;overflow:scroll;");
        elem_c.id = "us-gameinput-text";
        elem.appendChild(elem_c);
    
        var elem_c = doc.createElement("div");
        elem_c.setAttribute("style", "display:inline-block;cursor:pointer;border:solid 2px #000;height:20px;margin:0;padding:1px 8px;text-align:center;background:#faa;font-weight:bold;");
        elem_c.id = "us-gameinput-clear";
        elem_c.innerHTML = "clear";
        elem.appendChild(elem_c);

        var elem_c = doc.createElement("div");
        elem_c.setAttribute("style", "display:inline-block;cursor:pointer;border:solid 2px #000;height:20px;margin:0;padding:1px 8px;text-align:center;background:#faa;font-weight:bold;");
        elem_c.id = "us-gameinput-set";
        elem_c.innerHTML = "set";
        elem.appendChild(elem_c);

        var elem_c = doc.createElement("span");
        elem_c.innerHTML = " | ";
        elem.appendChild(elem_c);

        var elem_c = doc.createElement("div");
        elem_c.setAttribute("style", button_style);
        elem_c.innerHTML = "Getchu";
        elem_c.onclick = function () {
            search_game("get","http://www.getchu.com/php/search.phtml","formsearch","EUC-JP","search_keyword");
        }
        elem.appendChild(elem_c);

        var elem_c = doc.createElement("div");
        elem_c.setAttribute("style", button_style);
        elem_c.innerHTML = "EG特典";
        elem_c.onclick = function () {
            search_game("get","http://www.erogame-tokuten.com/redate.php","myform","UTF-8","word");
        }
        elem.appendChild(elem_c);

        var elem_c = doc.createElement("div");
        elem_c.setAttribute("style", button_style);
        elem_c.innerHTML = "ｴﾛﾄﾚ";
        elem_c.onclick = function () {
            search_game("get","http://erogetrailers.com/search/","myform","UTF-8","sw");
        }
        elem.appendChild(elem_c);

        var elem_c = doc.createElement("div");
        elem_c.setAttribute("style", button_style);
        elem_c.innerHTML = "Gyutto";
        elem_c.onclick = function () {
            search_game("get","http://gyutto.com/search/search_list.php","myform","Shift_JIS","search_keyword");
        }
        elem.appendChild(elem_c);

        var elem_c = doc.createElement("div");
        elem_c.setAttribute("style", button_style);
        elem_c.innerHTML = "DLsite(M)";
        elem_c.onclick = function () {
            search_game("post","http://www.dlsite.com/maniax/fsr","myform","UTF-8","keyword");
        }
        elem.appendChild(elem_c);

        var elem_c = doc.createElement("div");
        elem_c.setAttribute("style", button_style);
        elem_c.innerHTML = "DLsite(G)";
        elem_c.onclick = function () {
            search_game("post","http://www.dlsite.com/irls/fsr","myform","UTF-8","keyword");
        }
        elem.appendChild(elem_c);

        var elem_c = doc.createElement("div");
        elem_c.setAttribute("style", button_style);
        elem_c.innerHTML = "DMM";
        elem_c.onclick = function () {
            search_game("get","http://www.dmm.co.jp/search/=/searchstr=[key]/","search_form","EUC-JP","");
        }
        elem.appendChild(elem_c);

        var elem_c = doc.createElement("div");
        elem_c.setAttribute("style", button_style);
        elem_c.innerHTML = "DiGiket(一般)";
        elem_c.onclick = function () {
            search_game("get","http://www.digiket.com/link.php","form_top","Shift_JIS","A");
        }
        elem.appendChild(elem_c);

        var elem_c = doc.createElement("div");
        elem_c.setAttribute("style", button_style);
        elem_c.innerHTML = "DiGiket(男性)";
        elem_c.onclick = function () {
            search_game("get","http://www.digiket.com/a/link.php","form_top","Shift_JIS","A");
        }
        elem.appendChild(elem_c);

        var elem_c = doc.createElement("div");
        elem_c.setAttribute("style", button_style);
        elem_c.innerHTML = "DiGiket(女性)";
        elem_c.onclick = function () {
            search_game("get","http://www.digiket.com/b/link.php","form_top","Shift_JIS","A");
        }
        elem.appendChild(elem_c);

        var elem_c = doc.createElement("div");
        elem_c.setAttribute("style", button_style);
        elem_c.innerHTML = "DiGiket(BL)";
        elem_c.onclick = function () {
            search_game("get","http://www.digiket.com/blgame/link.php","form_top","Shift_JIS","A");
        }
        elem.appendChild(elem_c);

        var elem_c = doc.createElement("div");
        elem_c.setAttribute("style", button_style);
        elem_c.innerHTML = "Holyseal";
        elem_c.onclick = function () {
            search_game("get","http://holyseal.net/cgi-bin/mlistview.cgi","myform","Shift_JIS","word");
        }
        elem.appendChild(elem_c);

        var elem_c = doc.createElement("div");
        elem_c.setAttribute("style", button_style);
        elem_c.innerHTML = "Amazon";
        elem_c.onclick = function () {
            search_game("get","http://www.amazon.co.jp/s/ref=nb_sb_noss","site-search","UTF-8","field-keywords");
        }
        elem.appendChild(elem_c);

        var elem_c = doc.createElement("div");
        elem_c.setAttribute("style", button_style);
        elem_c.innerHTML = "TG FRONTIER";
        elem_c.onclick = function () {
            search_game("get","http://tg-frontier.jp/softs.aspx","mainForm","UTF-8","sw");
        }
        elem.appendChild(elem_c);

        doc.getElementsByTagName("body")[0].appendChild(elem);

        /* event */
        doc.getElementById("us-gameinput-clear").onclick = function () {
            doc.getElementById("us-gameinput-text").value = "";
        }

        doc.getElementById("us-gameinput-set").onclick = function () {
          var get_url = doc.getElementById("us-gameinput-text").value.split(/\n/);
          for (var i=0; i<get_url.length; i++){
            var url = get_url[i].split(/\/|\?/);
            /*http://www.getchu.com/soft.phtml?id=727028*/
            if (get_url[i].match( eval("/getchu\.com/i") )) {
                elem = doc.getElementsByName("comike")[0];
                if ( !elem ) {
                  elem = doc.getElementsByName("game[comike]")[0];
                }
                elem.value = getParameter(url[4], "id");
                elem.style.border = "red solid 2px";
            }
        
            /*http://www.erogame-tokuten.com/title.php?title_id=1064*/
            if (get_url[i].match( eval("/erogame-tokuten\.com/i") )) {
                elem = doc.getElementsByName("erogametokuten")[0];
                if ( !elem ) {
                  elem = doc.getElementsByName("game[erogametokuten]")[0];
                }
                elem.value = getParameter(url[4], "title_id");
                elem.style.border = "red solid 2px";
            }
        
            /*http://erogetrailers.com/soft/8322*/
            if (get_url[i].match( eval("/erogetrailers\.com/i") )) {
                elem = doc.getElementsByName("erogetrailers")[0];
                if ( !elem ) {
                  elem = doc.getElementsByName("game[erogetrailers]")[0];
                }
                elem.value = url[4];
                elem.style.border = "red solid 2px";
            }
        
            /*http://gyutto.com/i/item79250*/
            if (get_url[i].match( eval("/gyutto\.com/i") )) {
                elem = doc.getElementsByName("gyutto")[0];
                if ( !elem ) {
                  elem = doc.getElementsByName("game[gyutto_id]")[0];
                }
                elem.value = url[4].replace(/item/gi, "");
                elem.style.border = "red solid 2px";
            }
        
            /*http://www.dlsite.com/maniax/work/=/product_id/RJ091254.html*/
            if (get_url[i].match( eval("/dlsite\.com/i") )) {
                elem = doc.getElementsByName("dlsite_domain")[0];
                if ( !elem ) {
                  elem = doc.getElementsByName("game[dlsite_domain]")[0];
                }
                elem.value = url[3];
                elem.style.border = "red solid 2px";
                elem = doc.getElementsByName("dlsite_id")[0];
                if ( !elem ) {
                  elem = doc.getElementsByName("game[dlsite_id]")[0];
                }
                elem.value = url[7].replace(/\.html.*/gi, "");
                elem.style.border = "red solid 2px";
            }
        
            /*http://www.dmm.co.jp/digital/doujin/-/detail/=/cid=d_046585/*/
            /*http://www.dmm.com/digital/pcgame/-/detail/=/cid=iaquap_0001/*/
            if (get_url[i].match( eval("/dmm\.com|dmm\.co\.jp/i") )) {
                elem = doc.getElementsByName("dmm_genre")[0];
                if ( !elem ) {
                  elem = doc.getElementsByName("game[dmm_genre]")[0];
                }
                elem.value = url[3];
                elem.style.border = "red solid 2px";
            
                elem = doc.getElementsByName("dmm_genre_2")[0];
                if ( !elem ) {
                  elem = doc.getElementsByName("game[dmm_genre_2]")[0];
                }
                elem.value = url[4];
                elem.style.border = "red solid 2px";
            
                elem = doc.getElementsByName("dmm")[0];
                if ( !elem ) {
                  elem = doc.getElementsByName("game[dmm]")[0];
                }
                elem.value = url[8].replace(/cid=/gi, "");
                elem.style.border = "red solid 2px";
            }
        
            /*http://www.digiket.com/work/show/_data/iD=ITM0065111/*/
            if (get_url[i].match( eval("/digiket\.com/i") )) {
                elem = doc.getElementsByName("digiket")[0];
                if ( !elem ) {
                  elem = doc.getElementsByName("game[digiket]")[0];
                }
                elem.value = url[6].replace(/iD=/gi, "");
                elem.style.border = "red solid 2px";
            }
        
            /*http://holyseal.net/cgi-bin/mlistview.cgi?prdcode=10813*/
            if (get_url[i].match( eval("/holyseal\.net/i") )) {
                var elem = false;
                var elem_arr = doc.getElementsByName("holyseal[]");
                for (var j=0; j<elem_arr.length; j++ ) {
                    if ( elem_arr[j].value == "" ) {
                        elem = elem_arr[j];
                        break;
                    }
                }
                if ( !elem ) {
                  elem = doc.getElementsByName("game[holyseal]")[0];
                }
                elem.value = getParameter(url[5], "prdcode");
                elem.style.border = "red solid 2px";
            }

            /*http://www.amazon.co.jp/gp/product/B006O4VM76?ie=UTF8&redirect=true*/
            if (get_url[i].match( eval("/amazon\.co\.jp/i") )) {
                var elem = false;
                var elem_arr = doc.getElementsByName("asin[]");
                for (var j=0; j<elem_arr.length; j++ ) {
                    if ( elem_arr[j].value == "" ) {
                        elem = elem_arr[j];
                        break;
                    }
                }
                if ( !elem && doc.getElementsByName("game[amazon_1]")[0].value == "" ) {
                  elem = doc.getElementsByName("game[amazon_1]")[0];
                }
                if ( !elem && doc.getElementsByName("game[amazon_2]")[0].value == "" ) {
                  elem = doc.getElementsByName("game[amazon_2]")[0];
                }
                if ( !elem && doc.getElementsByName("game[amazon_3]")[0].value == "" ) {
                  elem = doc.getElementsByName("game[amazon_3]")[0];
                }
                for (var j=0; j<url.length -1 ; j++ ) {
                  if (url[j].match( eval("/product|dp/i") ))
                  elem.value = url[j + 1];
                }
                elem.style.border = "red solid 2px";
            }
            
            /*http://tg-frontier.jp/soft.aspx?b=1&s=6571*/
            if (get_url[i].match( eval("/tg-frontier\.jp/i") )) {
                elem = doc.getElementsByName("tgfrontier")[0];
                if ( !elem ) {
                  elem = doc.getElementsByName("game[tgfrontier]")[0];
                }
                elem.value = getParameter(url[4], "s");
                elem.style.border = "red solid 2px";
            }
        
          }
        }

        function getParameter(url, key) {
        	var params = url.split(/&|=/gi);
        	for (var i = 0; i < params.length - 1; i++) {
        		if (params[i] == key) {
        			return decodeURIComponent(params[i + 1]);
        		}
        	}
        	return "";
        }

        function search_game(type, ac, fn, ch, kn) {
            var val = "ゲーム名が入っていません";
            doc = document;
            if ( doc.getElementsByName("gamename").length !== 1 ) {
                val = doc.getElementsByName("game[gamename]")[0].value;
            } else {
                val = doc.getElementsByName("gamename")[0].value;
            }
            val = val.replace(/～.+～|”.+”|－.+－/i , "");
            val = val.replace(/^\s|\s$/i , "");
            val = val.replace(/\!|\?/i , "");

            var elem = doc.getElementById("us-gameinput");

            var elem_c = doc.createElement("form");
            //elem_c.setAttribute("style", "display:none;");
            elem_c.method = type;
            elem_c.action = ac.replace("[key]", val);
            elem_c.target = "_brank";
            elem_c.name = fn;
            elem_c.setAttribute("Accept-charset", ch);
            elem_c.id = "us-my-form";

            var elem_c_c = doc.createElement("input");
            elem_c_c.name = kn;
            elem_c_c.value = val;
            elem_c.appendChild(elem_c_c);

            elem.appendChild(elem_c);

            doc.getElementsByTagName("body")[0].appendChild(elem);

            doc.getElementById("us-my-form").submit();
        
            elem.removeChild(elem.lastChild); 
        }
    }
})();
