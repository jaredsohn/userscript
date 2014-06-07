// ==UserScript==
// @name           GithubHighlighter
// @namespace      rkabir
// @description    debugging. do not install.
// @version        0.0.1
// @include        http://github.com/*
// @include        https://github.com/*
// @match          http://github.com/*
// @match          https://github.com/*
// // ==/UserScript==


var github_main = function() {
console.log("this is running maybe");
  };


function github_load(func) {
  if (document.readyState == "complete") { //chrome
    func();
  } else {
    if (typeof window.onload != 'function') {
      window.onload = func;
    } else {
      var oldonload = window.onload;
      window.onload = function() {
        if (oldonload) {
          oldonload();
        }
        func();
      }
    }
  }
}

var github_script = document.createElement("script"); //create new <script> element
var github_scriptcontent = "(function() {\n"+ //closure function
github_load.toString()+"\n"+ //attach our load function
'github_load('+github_main.toString()+");\n"+ //execute our load function
'})()'; //execute closure function
github_script.text = github_scriptcontent; //.text is supported by all major browsers
document.body.appendChild(github_script); //inject the script