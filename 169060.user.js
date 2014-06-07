// Copyright (c) 2013, smilekzs. (MIT Licensed)
// ==UserScript==
// @name          trello-beautify
// @namespace     http://github.com/smilekzs
// @version       0.1.1
// @description   custom markdown style for trello.com
// @include       *trello.com/*
// ==/UserScript==
// vim: set nowrap ft= : 

;var MARKDOWN_CSS='div.mymd pre{font-size:1em;line-height:1.2em;overflow:auto}div.mymd code{white-space:nowrap;border:1px solid #EAEAEA;background-color:#F8F8F8;border-radius:3px;display:inline;margin:1em .15em;padding:0 .3em}div.mymd pre,div.mymd code{font-size:1em;font-family:Consolas,Inconsolata,Courier,monospace}div.mymd pre code,div.mymd div.highlight{border-radius:3px;border:1px solid #CCC;background-color:#F8F8F8;padding:.5em .7em;display:block!important}div.mymd p,div.mymd blockquote,div.mymd dl,div.mymd table,div.mymd pre{margin:.6em 0 .3em}div.mymd p,div.mymd blockquote{line-height:1.5em}div.mymd ul,div.mymd ol{list-style-type:disc;margin:.1em 0 0 1.5em}div.mymd li{margin:.2em 0}div.mymd dl{padding:0}div.mymd dl dt{font-size:1em;font-weight:700;font-style:italic;margin:1em 0 .4em;padding:0}div.mymd dl div.mymd dd{margin:0 0 1em;padding:0 1em}div.mymd blockquote{border-left:4px solid #DDD;color:#777;padding:0 1em}div.mymd blockquote,div.mymd q{quotes:none}div.mymd blockquote::before,div.mymd blockquote::after,div.mymd q::before,div.mymd q::after{content:none}div.mymd a:link,div.mymd a:visited{color:#33e;text-decoration:none}div.mymd a:hover{color:#00f;text-shadow:1px 1px 2px #ccf;text-decoration:underline}div.mymd h1,div.mymd h2,div.mymd h3,div.mymd h4,div.mymd h5,div.mymd h6{font-weight:700;color:#000;cursor:text;position:relative;margin:1.3em 0 1em}div.mymd h1{font-size:2em}div.mymd h2{font-size:1.5em;border-bottom:1px solid #CCC}div.mymd h3{font-size:1.3em}div.mymd h4{font-size:1.1em}div.mymd h5{font-size:1em}div.mymd h6{font-size:1em;color:#777}div.mymd .shadow{box-shadow:0 5px 15px #000}div.mymd table{border-collapse:collapse;border-spacing:0;font-size:100%;font:inherit;border:0;padding:0}div.mymd tbody{border:0;margin:0;padding:0}div.mymd table thead{border:0;border-bottom:1px solid #CCC}div.mymd table tr{border:0;border-top:1px solid #CCC;background-color:#FFF;margin:0;padding:0}div.mymd table tr:nth-child(2n){background-color:#F8F8F8}div.mymd table tr th,div.mymd table tr td{border:1px solid #CCC;text-align:left;margin:0;padding:.5em 1em}div.mymd table tr th{font-weight:700}div.mymd s,div.mymd del{text-decoration:line-through;color:#ccc}div.mymd hr{background:transparent url(https://gist.github.com/assets/primer/markdown/dirty-shade-b257e362bd496ca183d2a6743c25bc72.png) repeat-x 0 0;border:0 none;color:#ccc;height:4px;padding:0;margin:1em 0 .8em}';

(function() {
  var dup, st;



  dup = function(arr) {
    return [].slice.call(arr);
  };

  st = document.createElement('style');

  st.innerHTML = MARKDOWN_CSS;

  document.head.appendChild(st);

  setInterval((function() {
    var el, _i, _len, _ref, _results;
    _ref = dup(document.querySelectorAll('.markeddown'));
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      el = _ref[_i];
      _results.push((function(c) {
        return c.add('mymd');
      })(el.classList));
    }
    return _results;
  }), 500);

}).call(this);
