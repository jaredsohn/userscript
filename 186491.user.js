// ==UserScript==
// @name        InsertJenkinsCSS
// @namespace   jmnetwork.ch
// @include     http://jenkins.antichthon.net/jenkins/*
// @version     1
// @grant       none
// ==/UserScript==
var css = document.createElement('link');
css.href = 'http://www.jmnetwork.ch/public/jenkins/master.css';
css.type = 'text/css';
css.rel = 'stylesheet';
document.getElementsByTagName('head') [0].appendChild(css);
