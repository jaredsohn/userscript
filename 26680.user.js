// ==UserScript==
// @name           MythWeb Status Tweaks
// @namespace      http://userscripts.org/scripts/show/26680
// @include        http://*/mythweb/status
// ==/UserScript==

avrate = 3.20; // replace this with your average rate in Kb/s / 1000
maxrate = 5.47; // replace this with your maximum rate in Kb/s / 1000

var regex = new RegExp("(Total Space|Space Used|Space Free): ([0-9]*),([0-9]*) MB");

textnodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
    s = node.data;

   var match = regex.exec(s);

   if (match) {
      gb = parseFloat(RegExp.$2 + RegExp.$3);

      switch (RegExp.$1) {
      case "Total Space":
         pc = "";
         tot = gb;
      break;
      case "Space Free":
         pc = " (" +  Math.round((100.0*gb/tot)*10.0)/10.0 + "% / "
              + parseInt(8*gb/(maxrate*3600)) + "-"
              + parseInt(8*gb/(avrate*3600)) + "+ hr)";
      break;
      case "Space Used":
         pc = " (" +  Math.round((100.0*gb/tot)*10.0)/10.0 + "%)";
      break;
      }

      s = RegExp.$1 + ": " + parseInt(Math.round(gb/1024.0)) + " GB" + pc;
      node.data = s;
   }
}
