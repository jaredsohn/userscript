// ==UserScript==
// @name           Google: Click radio button and search
// @namespace      http://hail2u.net/
// @description    Googleの検索フォームの言語選択radioボタンをクリックしたらすぐに検索する。
// @include        http://www.google.com/search*
// ==/UserScript==

(function () {
  var inputs = document.getElementById("tsf").getElementsByTagName("input");

  for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i];

    if (input.type === "radio") {
      input.addEventListener("click", function () {
        this.form.submit();
      }, false);
    }
  }
})();
