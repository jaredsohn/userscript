// ==UserScript==
// @name         hasso.user.js
// @namespace    hasso
// @version      1.0
// @include      https://www.amazon.co.jp/gp/css/*history*
// @author       itochan
// @description  その発送はなかった
// ==/UserScript==

function load_jquery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
  $(".status > h2").each(function () {
    switch ($(this).text()) {
      case "未発送":
        $(this).text("その発送はなかった");
        break;
      case "出荷準備中":
        $(this).text("その発送は今からする");
        break;
      case "発送済み":
        $(this).text("その発送はもう済んだ");
        break;
    }
  });
}

load_jquery(main);
