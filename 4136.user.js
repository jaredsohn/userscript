// ==UserScript==
// @name           FixLeoLinks
// @description    Fix forum.dict.leo.org's Links
// @include        http://dict.leo.org/cgi-bin/dict/urlexp/*
// ==/UserScript==

var id = window.location.href.match(/\/[^\/]*$/) + ""
id = id.substring(1)

function url(forum) {
  var result =  
    "http://dict.leo.org/cgi-bin/dict/forum.cgi?action=show&group=forum" +
    forum + "&file=" + id
  return result
}

var forums=["001_unsolved_e","001_unsolved_g","003_correct","004_general",
    "002_new","003_correct_l","004_general_l","004_general_c"]


function testURL(u) {
  GM_xmlhttpRequest({
    method: "GET",
    url: u,
    onload: function(resp) {
      var doc = document.createElement('div');
      doc.innerHTML = resp.responseText;
      var tables = doc.getElementsByTagName('table')
      var good = false
      if (tables.length > 14) {
        good = true;
      } else {
        //TODO Analyze tables[11]
      }
      if (good) {
        window.location.replace(u)
      } 
    }
  });
}


for (i in forums) {
  testURL(url(forums[i]))
}

