// ==UserScript==
// @name           MythWeb Status Tweaks for v0.24
// @include        http://*/mythweb/status
// ==/UserScript==

// 2013-11-20 Updated this script:
//   http://userscripts.org/scripts/show/26680
// to make its original intent work for MythWeb in version 0.24

var avrate = 3.20; // replace this with your average rate in Kb/s / 1000
var maxrate = 5.47; // replace this with your maximum rate in Kb/s / 1000

var regex = new RegExp("^(Total Space|Space Used|Space Free): ([0-9,]*) MB");

var lis, match, key, i, s, gb, pc, tot;
lis = document.body.getElementsByTagName("li");

for (i = 0; i < lis.length; i++) {
    
    s = lis[i].innerHTML;
    match = regex.exec(s);
    
    if (match) {
        key = RegExp.$1;
        gb = parseFloat(RegExp.$2.replace(/,/g,""));
        
        switch (key) {
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
                pc = ' <b><span style="color: orange">(' +  Math.round((100.0*gb/tot)*10.0)/10.0 + '%)</span></b>';
                break;
        }
        
        s = key + ": " + parseInt(Math.round(gb/1024.0)) + " GB" + pc;
        lis[i].innerHTML = s;
        
    }
}
