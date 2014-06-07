// ==UserScript==
// @name        GitRainbow
// @namespace   http://jason.karns.name
// @version     1.5.0
// @grant       none
// @description Colorize your history! GitRainbow adds color to GitHub's history view by using each commit's sha-hash as a hex color.
// @match       https://github.com/*
// ==/UserScript==

(function(){

  var Color = function(hex){
    this.r = this.hex_to_dec(hex.substr(0,2));
    this.g = this.hex_to_dec(hex.substr(2,2));
    this.b = this.hex_to_dec(hex.substr(4,2));
    this.a = 0.25;
  };
  Color.prototype.hex_to_dec = function(hex){
    return parseInt(hex, 16);
  };
  Color.prototype.toString = function(){
    return "rgba(" + [this.r, this.g, this.b, this.a].join(',') + ")";
  };


  Array.prototype.forEach.call(document.querySelectorAll('.commit-group-item'), function(commit) {
    var sha = commit.querySelector('.sha');
    var color = new Color(sha.textContent.match(/.{6}/)[0]);

    sha.parentElement.style.backgroundImage = "linear-gradient(#F2F5F6, "+ color +")";
  });

})();
