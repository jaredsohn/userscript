// imageBuddy 1.0
// by psyched 07
// ==UserScript==
// @name           imageBuddy
// @namespace      http://userscripts.org/users/33515;scripts
// @description    Bilder können wie bei YouTube-Buddy direkt eingebunden werden
// @include        http://forum.mods.de/bb/thread.php*
// @exclude        http://forum.mods.de/bb/(index|suche|board).php*
// ==/UserScript==

var link=document.getElementsByTagName("a");
for (var i=0;i<link.length;i++) {
  if (link[i].href.match(/^(http:\/\/|www\.)[^?]+\.(jpeg|jpg|gif|png|bmp)$/gi)) {
    var url = link[i].href;
    var img=document.createElement("img");
        img.src="data:image/x-icon,%00%00%01%00%01%00%0C%0C%00%00%01%00%18%00%08%02%00%00%16%00%00%00(%00%00%00%0C%00%00%00%18%00%00%00%01%00%18%00%00%00%00%00%00%00%00%00H%00%00%00H%00%00%00%00%00%00%00%00%00%00%00%E9%E9%E7%D5%D5%D1%E3%E3%E1%D3%D3%CF%F6%F6%F5%EF%EF%EE%D7%D7%D4%D5%D5%D2%E1%E1%DF%EF%EF%EE%DB%DB%D9%CE%CE%CA%E9%E9%E7%D5%D5%D1%E3%E3%E1%D3%D3%CF%F6%F6%F5%EF%EF%EE%D7%D7%D4%D5%D5%D2%E7%E7%E5%D9%D9%D6%8A%8A%82%9B%9B%93%E9%E9%E7%D5%D5%D1%E6%E6%E4%D6%D6%D2%FB%FB%FA%F2%F2%F1%DA%DA%D7%DB%DB%D8%D2%D2%CE%89%89%80%9E%9E%97%F0%F0%EE%E9%E9%E7%D9%D9%D5%D6%D6%D3%B1%B1%AB%B2%B2%AD%B5%B5%AF%C8%C8%C3%C7%C7%C3%89%89%7F%A4%A4%9D%F6%F6%F6%F9%F9%F8%ED%ED%EB%C6%C6%C1%A2%A2%9A%CD%CD%C9%C4%C4%C0%D7%D7%D4%B2%B2%AC%89%89%80%9D%9D%95%F3%F3%F2%FE%FE%FF%F5%F5%F4%DA%DA%D7%A8%A8%A1%DB%DB%D8%E8%E8%E6%E2%E2%DF%F3%F3%F2%FC%FC%FC%B5%B5%B0%C5%C5%C0%FA%FA%FA%F7%F7%F7%F5%F5%F4%B0%B0%AB%C4%C4%C0%F7%F7%F5%F6%F6%F5%AE%AE%A7%E4%E4%E2%FF%FF%FF%DF%DF%DD%B9%B9%B3%FE%FE%FD%F8%F8%F8%F9%F9%F8%9D%9D%97%E4%E4%E2%FA%FA%FA%B8%B8%B2%99%99%92%A9%A9%A3%D1%D1%CD%CA%CA%C7%B2%B2%AC%ED%ED%EB%EA%EA%E8%EA%EA%E8%B1%B1%AB%C5%C5%C0%FB%FB%FB%F3%F3%F2%AF%AF%A9%E3%E3%E1%FF%FF%FF%E3%E3%E1%B6%B6%B0%FD%FD%FD%F8%F8%F8%F8%F8%F8%E5%E5%E2%A6%A6%9F%EA%EA%E8%ED%ED%EB%DD%DD%DA%F6%F6%F5%F4%F4%F3%AF%AF%A9%D1%D1%CE%F1%F1%F0%ED%ED%EC%ED%ED%EC%FF%FF%FF%D2%D2%CE%A3%A3%9D%C0%C0%BC%C3%C3%BE%D3%D3%CF%AE%AE%A8%C0%C0%BB%F9%F9%F9%F4%F4%F4%F4%F4%F4%F4%F4%F4%FF%FF%FF%EA%EA%E8%C8%C8%C5%BB%BB%B6%B5%B5%B0%B2%B2%AD%BC%BC%B6%F0%F0%EF%F7%F7%F7%F5%F5%F5%F5%F5%F5%F5%F5%F5%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00";
        img.setAttribute("onclick", "show('i"+i+"');");
        img.setAttribute("style", "padding-left:5px;cursor:pointer");
      link[i].parentNode.insertBefore(img, link[i].nextSibling);
    var div=document.createElement("div");
        div.innerHTML="<img src=\""+url+"\" alt=\""+url+"\" />";
        div.setAttribute("style", "display:none;");
        div.id="i"+i;
      link[i].parentNode.insertBefore(div, img.nextSibling);
  }
}
    var text="function show(thisurl) {"+
             "  view = document.getElementById(thisurl).style.display;"+
             "  if(view == 'block'){document.getElementById(thisurl).style.display='none';}"+
             "  else {document.getElementById(thisurl).style.display='block';}"+
             "}";
    var script=document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.appendChild(document.createTextNode(text));
      document.getElementsByTagName("head")[0].appendChild(script);