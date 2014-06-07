// ==UserScript==
// @name       ErogameScape PointCorrect
// @namespace  http://blueblueblue.fool.jp/wp/
// @version    0.1
// @description  エロスケの得点を一括変更
// @include    http://erogamescape*/~ap2/ero/toukei_kaiseki/new_contents.php?serch%5Buser%5D%5Bplay%5D=on#serch_table
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
    /* create */
    var doc = document;

    var elem = doc.createElement("div");
    elem.id = "us-pointcorrect";
    elem.setAttribute("style", "font-size:0.85em;border:solid 1px #000;background:#ddd;position:fixed;top:0;right:0;width:400px;height:200px;margin:3px;padding:3px;");
    
    var elem_c = doc.createElement("div");
    elem_c.setAttribute("style", "color:#fff;font-weight:bold;background:#000;width:auto;height:20px;margin:0;padding:1px 8px;text-align:center;");
    elem_c.innerHTML = "PointCorrect";
    elem.appendChild(elem_c);

    var elem_c = doc.createElement("textarea");
    elem_c.setAttribute("style", "width:394px;height:160px;margin:2px;padding:3px;overflow:scroll;");
    elem_c.id = "us-pointcorrect-text";
    elem.appendChild(elem_c);
    
    var elem_c = doc.createElement("div");
    elem_c.setAttribute("style", "display:inline;cursor:pointer;border:solid 1px #000;height:20px;margin:0;padding:1px 8px;text-align:center;");
    elem_c.id = "us-pointcorrect-getcsv";
    elem_c.innerHTML = "get-CSV";
    elem.appendChild(elem_c);
    
    var elem_c = doc.createElement("div");
    elem_c.setAttribute("style", "display:inline;cursor:pointer;border:solid 1px #000;height:20px;margin:0;padding:1px 8px;text-align:center;");
    elem_c.id = "us-pointcorrect-gettsv";
    elem_c.innerHTML = "get-TSV";
    elem.appendChild(elem_c);
    
    var elem_c = doc.createElement("div");
    elem_c.setAttribute("style", "display:inline;cursor:pointer;border:solid 1px #000;height:20px;margin:0;padding:1px 8px;text-align:center;");
    elem_c.id = "us-pointcorrect-set";
    elem_c.innerHTML = "set(TSV)";
    elem.appendChild(elem_c);

    var elem_c = doc.createElement("div");
    elem_c.setAttribute("style", "display:inline;cursor:pointer;border:solid 1px #000;height:20px;margin:0;padding:1px 8px;text-align:center;");
    elem_c.id = "us-pointcorrect-clear";
    elem_c.innerHTML = "clear";
    elem.appendChild(elem_c);

    doc.getElementsByTagName("body")[0].appendChild(elem);

    /* event */
    doc.getElementById("us-pointcorrect-getcsv").onclick = function () {
      get_text( "," );
    }
    
    doc.getElementById("us-pointcorrect-gettsv").onclick = function () {
      get_text( "\t" );
    }
    
    function get_text( pipe ) {
      var tbl = doc.getElementsByTagName("table");
      for (var i = 0; i < tbl.length; i++ ) {
        if ( tbl[i].innerHTML.indexOf("<th>ブランド</th>", 0) !== 0 ) {
          var mytable = tbl[i];
        }
      }
      var tr = mytable.getElementsByTagName("tr");
      var tmp = "";
      for (var i = 1; i < tr.length; i++ ) {
        if ( tr[i].innerHTML.indexOf("<th>ブランド</th>", 0) == -1 ) {
          var td = tr[i].getElementsByTagName("td");
          tmp += "\"" + td[0].innerHTML.split(/game_id=|#shousai/g)[1] + "\"" + pipe + "";
          tmp += "\"" + td[0].innerText + "\"" + pipe + "";
          tmp += "\"" + td[1].innerText + "\"" + pipe + "";
          tmp += "\"" + td[2].getElementsByTagName("input")[0].value + "\"" + pipe + "";
          tmp += "\"" + td[3].getElementsByTagName("input")[0].value + "\"";
          tmp += "\n";
        }
      }
      
      doc.getElementById("us-pointcorrect-text").value = tmp;
    }

    doc.getElementById("us-pointcorrect-set").onclick = function () {
      var input = doc.getElementsByTagName("input");
      var tokuten = new Array();
      var hitokoto = new Array();
      for (var i = 0; i < input.length; i++ ) {
        if ( input[i].name.indexOf("[tokuten]", 0) !== -1 ) {
          tokuten.push( input[i] );
        }
        if ( input[i].name.indexOf("[hitokoto]", 0) !== -1 ) {
          hitokoto.push( input[i] );
        }
      }
      var tmp = doc.getElementById("us-pointcorrect-text").value.split(/\n/g);
      for (var i = 0; i < tmp.length; i++ ) {
        if ( tmp[i] !== "" ) {
          var tmp_array = tmp[i].split(/\t/g);
          if ( tmp_array[0].indexOf("\"",0) == 0 ) {
            var game_id = eval( tmp_array[0] );
          } else {
            var game_id = tmp_array[0];
          }
          if ( tmp_array[3].indexOf("\"",0) == 0 ) {
            var new_tokuten = eval( tmp_array[3] );
          } else {
            var new_tokuten = tmp_array[3];
          }
          if ( tmp_array[4].indexOf("\"",0) == 0 ) {
            var new_hitokoto = eval( tmp_array[4] );
          } else {
            var new_hitokoto = tmp_array[4];
          }
          for (var j = 0; j < tokuten.length; j++ ) {
            if ( tokuten[j].name == "user_game[" + game_id + "][tokuten]" ) {
              tokuten[j].value = new_tokuten;
            }
            if ( hitokoto[j].name == "user_game[" + game_id + "][hitokoto]" ) {
              hitokoto[j].value = new_hitokoto;
            }
          }
        }
      }
    }
    
    doc.getElementById("us-pointcorrect-clear").onclick = function () {
      doc.getElementById("us-pointcorrect-text").value = "";
    }

})();
