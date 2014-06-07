// ==UserScript==
// @name          Reddit colorizer
// @namespace     http://jeffpalm.com/redditcolor/
// @description   Colorizes the reddit scores
// @include       http://*.reddit.com*
// ==/UserScript==

function RedditColor() {
  this.page = -1;
}

RedditColor.prototype = {

  getPageFromLocation: function() {
    var hash = document.location.hash;
    if (!hash) return 0;
    var parts = hash.replace(/#/,'').split(/&/);
    for (var i=0; i<parts.length; i++) {
      var param = parts[i].split(/=/);
      if (param.length == 2 && param[0] == 'page') {
	return parseInt(param[1]);
      }
    }
    return -1;
  },

  checkForUpdates: function() {
    var page = this.getPageFromLocation();
    if (page > this.page) this.colorize();
    this.page = page;
  },

  colorize: function() {
    var divs = document.getElementsByTagName('DIV');
    var scores = [];
    var min;
    var max;
    for (var i=0; i<divs.length; i++) {
      var d = divs[i];
      if (d.className.match(/.*score.*/)) {
	var s = d.innerHTML;
	if (!s.match(/\d+/)) continue;
	var score = parseInt(s);
	scores.push(d);
	if (!min || score<min) min = score;
	if (!max || score>max) max = score;
      }
    }
    for (var i=0; i<scores.length; i++) {
      var d = scores[i];
      var v = parseInt(d.innerHTML);
      var cval = Math.floor(0xff - 0xee*(max-v)/(max-min));
      var color = cval.toString(16) + '0000';
      d.style.color = '#' + color;
    }
  },

  main: function() {
    this.checkForUpdates();
    var thiz = this;
    setInterval(function() {thiz.checkForUpdates();},3000);
  }
};

new RedditColor().main();
