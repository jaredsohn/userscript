// ==UserScript==
// @name        userscripthighlighting
// @namespace   userscripthighlighting
// @include     http://userscripts.org/*
// @exclude     http://userscripts.org/scripts/review/*
// @version     1
// @description SyntaxHighLighting http://mihai.bazon.net/projects/javascript-syntax-highlighting-engine

// ==/UserScript==
alert('works');
debugger;
GM_xmlhttpRequest({
  method: "POST",
  url: "http://closure-compiler.appspot.com/compile",
  data: "output_format=json&output_info=compiled_code&output_info=warnings&output_info=errors&output_info=statistics&compilation_level=SIMPLE_OPTIMIZATIONS&warning_level=default&output_file_name=default.js&js_code=%2F%2F%20ADD%20YOUR%20CODE%20HERE%0Afunction%20hello(name)%20%7B%0Aalert('Hello%2C%20'%20%2B%20name)%3B%0A%7D%0Ahello('New%20user')%3B",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  onload: function(response) {
alert('onload');
    alert(response.responseText);
  }
});