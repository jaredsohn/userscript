// ==UserScript==
// @name        GitJasmine
// @namespace   http://jason.karns.name
// @version     0.4.0
// @grant       none
// @description Easily open a GitHub gist with TryJasmine.
// @match       https://gist.github.com/*
// ==/UserScript==

(function() {
  function gist_is_a_jasmine_spec(){
    var js_sources     = document.querySelectorAll(".files > [id^='file-'][id$='-js']").length;
    var coffee_sources = document.querySelectorAll(".files > [id^='file-'][id$='-coffee']").length;
    // var js_specs       = document.querySelectorAll(".files > [id^='file-'][id$='spec-js']").length;
    // var coffee_specs   = document.querySelectorAll(".files > [id^='file-'][id$='spec-coffee']").length;

    return (js_sources + coffee_sources);
  }

  function insert_tryjasmine_link(){
    document.querySelector('.export-references').appendChild(document.createElement('li').appendChild(tryjasmine_link()).parentNode);
  }

  function tryjasmine_link(){
    var a = document.createElement('a');
    a.appendChild(document.createElement('strong').appendChild(document.createTextNode("Open")).parentNode);
    a.appendChild(document.createTextNode(" this gist in TryJasmine"));
    a.href= tryjasmine_url();
    return a;
  }

  function tryjasmine_url(){
    return "http://tryjasmine.com/?gist=" + location.pathname.match(/\/(\d+)/)[1];
  }

  if(gist_is_a_jasmine_spec()) insert_tryjasmine_link();
})();
