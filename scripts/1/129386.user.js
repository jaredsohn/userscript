// ==UserScript==
// @name           Prodota.ru - ignore list + hide
// @namespace      www.prodota.ru
// @include        http://prodota.ru/forum2/*
// @version        0.2
// @author         PCJakeD,afanasij
// ==/UserScript==

//to make this script working you have to edit "Include Pages" in Greasemonkey settings according to your forum
//ie.: "http://www.simplemachines.org/community/index.php?..." transform to "http://www.simplemachines.org/community/*"

//edit 'smf_url' line according to your forum
//it has to start with "http://" and end with "index.php"
var smf_url = 'http://prodota.ru/forum2/index.php';

var banned = new Array();
//to ignore user with id 1, 2 a 3 uncomment the following lines, evtl. add more lines in format "banned.push(uid);"
banned.push(59732);
banned.push(2);



for (var i = 0; i < banned.length; i++){
   var uid = banned[i];
   var url = 'http://prodota.ru/forum2/index.php?action=profile;u=' + uid;
   var expression1 = '//body/table/tbody/tr/td/div/div[2]/div[2]/form/div[div[1]/div[1]/h4/a[@href = "'+ url +'"]]';
   var expression2 = '//body/table/tbody/tr/td/div/div[2]/div[3]/form/div[div[1]/div[1]/h4/a[@href = "'+ url +'"]]';
   
   var nodes1 = document.evaluate(expression1, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
   var nodes2 = document.evaluate(expression2, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

   for (var j = 0; j < nodes1.snapshotLength; j++) {
    var c = nodes1.snapshotItem(j);
    var s = document.createElement("div");
    s.className = "titlebg";
    s.innerHTML = "post yebka";
    s.addEventListener("click", function(orig) {
      this.innerHTML = orig;
    }.bind(c, c.innerHTML), false);
    c.innerHTML = "";
    c.appendChild(s);
  }

   for (var j = 0; j < nodes2.snapshotLength; j++) {
    var c = nodes2.snapshotItem(j);
    var s = document.createElement("div");
    s.className = "auto_suggest_item";
    s.innerHTML = "post yebka";
    s.addEventListener("click", function(orig) {
      this.innerHTML = orig;
    }.bind(c, c.innerHTML), false);
    c.innerHTML = "";
    c.appendChild(s);
   }
}