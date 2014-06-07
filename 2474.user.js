// ==UserScript==
// @name          Delicious Inplace edit
// @namespace     http://myjavaserver.com/~ksenji
// @description	  Delicious Inplace edit
// @include       http://del.icio.us/*
// ==/UserScript==

const LOADING_IMAGE = "data:image/gif,GIF89a%10%00%10%00%C4%00%00%FF%FF%FF%EE%EE%EE%DD%DD%DD%BB%BB%BB%AA%AA%AA%99%" + 
                      "99%99%88%88%88wwwfffUUUDDD333%22%22%22%11%11%11%00%11%00%00%00%00%FF%FF%FF%00%00%00%00%00%0" +
                      "0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00" +
                      "%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%05%07%00%10%00%2C%00%00" +
                      "%00%00%10%00%10%00%00%05w%20%24B%01%89%24%E5%A8B%02%23%04%CF%23%90%AB(%3CL%E0%C8%C1%AC%0A3%" + 
                      "C3%C3%B0%03%A6D%01%C5%10%E6H%24%5E%B6%94%40%E9%18%F8%90Pd%80%B0%B8%22U%06%85%B3P%23%05%CEa%" +
                      "85%82%5C%3B%9F%CD%83%C31%AA%0A%18%1A%0Ao%CF%3A%3A0%0Av%06%40%02%04%24%7C%2C3%02%0B%03%04%05" +
                      "%02%82_%23%01%09%07%10%05d%02%805%02%073%97%22%03s5%03%03e!%00!%F9%04%05%07%00%10%00%2C%00%" +
                      "00%00%00%0F%00%10%00%00%05c%20%24%8E%D0%81%88%019*%22%23%0A%0D%A1%8A%0B%C48%F63%CCb%C14%85%" +
                      "07k%94%00B%1A%0B%D3%E3%91J%89%12%90%85%604%98%F2%86%3C%08%01q8%EC%B2%90B%02%81%F8%82_%85%99" +
                      "sDP%40U%01%81%D3%A0%90%15d%AF%D7Z%84%10%0C%08%01f*%07i%7F%22%82(%05)%86%10VY%02%8E%23!%00!%" +
                      "F9%04%05%07%00%10%00%2C%00%00%00%00%10%00%0F%00%00%05%60%20%24%8EPa%90%A8%88%88%0A%13%04K*%" +
                      "3A%09%D4%06u%1A%94%10%D1%12%23%C1%40tX%00%17%0A%83!%260%3C%1E%02U%23'%12%14%9E%8F%E1h%80%D8" +
                      "m%1F'%D1%40Y%88%A2%5Eh%C2a-k%F7%DC(%84%C1%EB.%1C%86%83%01%9AN%F2%1A%04%80%10%02%7C%24%05C%8" +
                      "1%01f)%40%82f%7C!%00!%F9%04%05%07%00%10%00%2C%00%00%00%00%10%00%10%00%00%05b%20%24%8EbA%9E%" +
                      "E2%11%40%89%22%26%03%0A-%07%EB%22%E8*6C%1B%E3%01%81%C8%80%10*%0E%85%82%2B%60j%E8%0E4%88%0E2" +
                      "%60%C8%205%92%B0%18X%15%08%04%19%A2%D1p%C0%92%05%E1%09%F1h%2FH%B1%93%60.%D0%09%0C%A6%EBh%90" +
                      "%86%CC%F5R%22%01%03%5DSW%03B%5D%80~%82%86%80%8A(!%00!%F9%04%05%07%00%10%00%2C%00%00%00%00%1" +
                      "0%00%0E%00%00%05I%20%24%8E%D0q%90%A8%98%88%CF%C3%A6%EC%DAB%0D%2C%1En%5B%D0h%D2%0C%90%C7%C2%" +
                      "E4*%05G%89%C7%0AU%DC%91%96%A8%C5H%00)8%A3%ADG%CDtJ%D5%5ES%D4%40%98%BA%8E%C6-*Dm%CB%A6%D8%A4" +
                      "%01T%04%87%85%00%00!%F9%04%05%07%00%10%00%2C%00%00%00%00%10%00%10%00%00%05q%20%24%8E%D00%90" +
                      "(%14%10%A2q%88%87%90%06%07k%18%90%C1%C8%A9%80%087A%03G%1A%10d%86%82%E9%B0(1%14%A2%C0%C00%08" +
                      "%8C%02%82%04d%C1%13%09X%A4%80%A2%60U%09%CEeR!%91P%18%CE%E8T%81%C1h%20%C2(%C1%A2%80%C2v!_%22" +
                      "PQ%02V%01e%0D%0FY%10%0Di)%04%0FZ%10%60x%23%0C%0F'3y%0F%7C)%9E%8E!%00!%F9%04%05%07%00%10%00%" +
                      "2C%00%00%00%00%10%00%10%00%00%05%60%20%24%8E%90%20%90%A88%88E%C1%A6%ECI%B8%85%02%8BF0C%0A%8" +
                      "1%9A%01%DD%C0T%40%88%14F%91%60%98B4%12%A8%C0%09%85%F0%89%82A%18%01%81%80b%03Z%C5bq%B8%8D%12" +
                      "%04%AC%19%B2%82%20%C0%B0%03%82%01%09%18%17%B7%C6%C3%00)%2Fa%01zSS%80%0E%0F%26%0EV%80%09%0Bp" +
                      "%24!%00!%F9%04%05%07%00%10%00%2C%00%00%01%00%10%00%0F%00%00%05%5E%20%24B%828%0C%221%AE%10%D" +
                      "A%A2%03%C2%AE0%8A%B8%81%98%8BB%09%11%07R%C20%0A%08v%AB%C3%22%C8B%8E%0C%AE%D9lp%A8%AA%A4%A3X" +
                      "b%88%D5%DD%A4F%9F%91%01a%B2%1E%0F%83AA%26*X%86%C7%81%C1(%40%883%01%BA%D4%08%2C%B0%04%0F(%0D" +
                      "%7D%10%0CQ%2B%3E%10%09R!%00!%F9%04%05%07%00%10%00%2C%00%00%00%00%10%00%10%00%00%05c%20%24%8" +
                      "EP%10%90%A8xB%82%20%0E%2B*%9C-%5B%C4d%E0%B6%81%E1%A2%2B%93i%40%10%19%0A)%60%01%81L%A2%0A%3F" +
                      "'I%60%A8JG%82%83%B6%F8b%0CP%BE%A9%E2%F1h%8E%14%0D%83%CA%F1X%B8%18%05%02B%01)0%10%A2%C2%D7%B" +
                      "8X%14%9BQ%23%0C%01%7D%10%09%0EN%0Eo%0B%22tI%2BZI!%00!%F9%04%05%07%00%10%00%2C%00%00%01%00%1" +
                      "0%00%0F%00%00%05%5C%20%24%8EP%60%06%02%A9%8A%A68%AC%EA%F9%AE%A9*%D4%C5%0C%8F%841%04%B6%95%0" +
                      "E%82h%18%110%82r%B0x8%15%B0B%C1%87%12%14%1A%B5Qa%07%F9%8D%02%88%C5V%C4%20%06%18%0A%A5!%D1M%" +
                      "1CD%84l!%A1%184%08%25%D8%02B%87%1C%F6Be%10%0APDY0%06%060!%00!%F9%04%05%07%00%10%00%2C%00%00" +
                      "%01%00%10%00%0F%00%00%05%5D%20%24%8E%24%14%94%E8%18%08%A5%C0%A2%C2I%3E%8FQ%CA%C1%F0%0E%F4%F" +
                      "3%8E%02%5D%E9%F0%20%B4d%22%862%05%198%05%09G%A3qH9%09%AF%00A%812%96%12%A2%9F%C8%80%F0B%16%9" +
                      "0%AA%22%E1%2C%20D%87%82H('%1C%10%024%B3%C1%BDC%0A%5C0%81%08%60%01UL%22%05r(!%00!%F9%04%09%0" +
                      "7%00%10%00%2C%00%00%00%00%10%00%10%00%00%05d%20%24%8EdI%0E%8D%60%AE%C3%C3%ACk%F2%10%B0%F8B%" +
                      "C2%F3%98B%20%0A%B7%02m%14%E8%95%0A%8EA%C972%2C%14%0A%83%A9(P%1D%18X%E9%B2%AA%82%F8%06%09%93" +
                      "%92%148%40R%25%82a%0C%09K%11%87*%A1%80%13%FED%A8%81%C1%8C%E82E%01%0B%08%10%7B%10%04%07%7F%2" +
                      "4%83%84f%10t5%86C%25!%00%3B";

var Delicious = {
  inplaceEdit: function() {
    var mainDiv = document.getElementById("main");
    var posts = mainDiv.getElementsByTagName("ol")[0].getElementsByTagName("li");
    for(var i=0; i<posts.length; i++) {
      var postDivs = posts[i].getElementsByTagName("div");
      var postDiv = postDivs[postDivs.length - 1];
      var links = postDiv.getElementsByTagName("a");
      if(links.length >= 2) {
        var editLink = null;
        if(links[links.length-1].firstChild.nodeValue == "copy") {
          editLink = links[links.length-1];
        } else {
          editLink = links[links.length-2];
        }
        editLink.addEventListener("click", Delicious.edit, false);
        editLink.setAttribute("onclick", "return false;");
      }
    }
  },
  
  edit : function (event) {
    var editURL = event.target.href;
    var postDiv = event.target.parentNode;
    var dummy = document.getElementById("dummy");
    if(dummy != null) {
      dummy.parentNode.removeChild(dummy);
    }
    var loadingImage = document.createElement("img");
    loadingImage.setAttribute("src", LOADING_IMAGE);
    loadingImage.setAttribute("align", "absmiddle");
    postDiv.insertBefore(loadingImage, editURL.nextSibling);
    try{
      GM_xmlhttpRequest ( {
        method: "GET",
        url: editURL,
        onload: function(request) {
          dummy = document.createElement("div");
          dummy.setAttribute("id", "dummy");
          dummy.style.display = "none";
          dummy.innerHTML = request.responseText;
          var allDivs = dummy.getElementsByTagName("div");
          var main = null;
          for(var i=0; i<allDivs.length; i++) {
            if(allDivs[i].id == "main") {
              main = allDivs[i];
              break;
            }
          }
          if(main != null) {
            dummy.innerHTML = main.innerHTML;
            dummy.removeChild(dummy.getElementsByTagName("ul")[0]);
            postDiv.parentNode.insertBefore(dummy, postDiv.nextSibling);
            dummy.style.display = "";
            postDiv.removeChild(loadingImage);
          }
        }
      });
    } catch(e) {
      //alert(e.message);
      GM_log(e.message);
    }
    return false;
  }
};

Delicious.inplaceEdit();
