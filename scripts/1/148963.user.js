// ==UserScript==
// @id             githubcommitfilecollapser@phob.net
// @name           Github Commit File Collapser
// @version        0.15
// @namespace      phob.net
// @author         wn
// @description    Click on the header of a commit file section to toggle its contents
// @include        https://github.com/*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/148963.meta.js
// ==/UserScript==

// Source: http://wiki.greasespot.net/Content_Script_Injection
function contentEval(aSource) {
  if ("function" == typeof(aSource)) aSource = "(" + aSource + ")();";

  var script = document.createElement("script");
  script.setAttribute("type", "application/javascript");
  script.textContent = aSource;

  document.body.appendChild(script);
  document.body.removeChild(script);
}

contentEval(function() {
  function ghcfc_toggleData(ev) {
    if ("a" === ev.target.tagName.toLowerCase()) return;
    this.style.display = this.style.display == "none" ? "block" : "none";
  }

  function ghcfc_init() {
    var files = document.getElementById("files")
      , metas;

    if (!files) return;

    metas = files.getElementsByClassName("meta");

    for (var i = 0, e = metas.length, next; i < e; ++i) {
      next = metas[i].nextElementSibling;
      if (!(next && next.classList.contains("data"))) continue;
      if (e > 1) next.style.display = "none";
      metas[i].style.cursor = "pointer";
      metas[i].addEventListener("click", ghcfc_toggleData.bind(next), false);
    }
  }

  // Monitor pjax partial page loading so we know when to do stuff
  $(document).on("pjax:complete", ghcfc_init);

  ghcfc_init();
});
