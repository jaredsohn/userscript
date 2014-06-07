// ==UserScript==
// @name           Daily Show / Colbert Report comment line break fixer.
// @namespace      lbf
// @description    Puts the line breaks back in the comments, so they dont become walls of text.
// @include        http://www.thedailyshow.com/full-episodes/*
// @include        http://www.colbertnation.com/full-episodes/*
// ==/UserScript==

var lbf = {
  commentBodies: null,
  lastSl: null,
  loadNodes: function () {
    this.commentBodies = document.evaluate('/html/body/div[2]/div[2]/div[2]/div/div[2]/div[4]/div/div/div/div[2]/div[2]/div/ol/li/div/div/div[2]/div/p', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
    var sl = this.commentBodies.snapshotLength
    if (sl > 0 && sl == this.lastSl) {
      this.fixLineBreaks()
    } else {
      this.lastSl = sl
      setTimeout(function () { lbf.loadNodes() },500)
    }
  },
  fixLineBreaks: function () {
    for (var pi=0,pC=this.lastSl; pi < pC; pi++ )
      with (this.commentBodies.snapshotItem(pi))
	innerHTML = textContent.replace("\n",'<br/>','gm')
  }
}
lbf.loadNodes()