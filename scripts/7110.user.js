// ==UserScript==
// @name           Digg Button Animation Enabler
// @namespace      http://pile0nades.wordpress.com/
// @description    Enables the animation when pressing the digg button on an article that includes one, so you can digg and keep reading.
// @include        http://digg.com/tools/diggthis.php*
// @include        http://digg.com/api/diggthis.php*
// @include        http://www.digg.com/tools/diggthis.php*
// @include        http://www.digg.com/api/diggthis.php*
// ==/UserScript==


// the scripts needed for this were removed, this adds them back
var head = document.getElementsByTagName("head")[0];
var script = [
  "http://digg.com/js/4/prototype.js",
  "http://digg.com/js/4/digg.js",
  "http://digg.com/js/4/effects.js",
  "http://digg.com/js/4/jquery.js",
];

for(var i = 0; i < script.length; i++){
  var sT = document.createElement("script");
  sT.setAttribute("src", script[i]);
  head.appendChild(sT);
}

// are we in compact mode?
var compactmode = /s=compact/.test(location.search) == true ? true : false;
var form = document.getElementById("f1");

if(form) {
  var row = 1;
  var itemd = form.elements.namedItem("id").value;
  var digcheck = form.elements.namedItem("digcheck").value;
  var db;
  
  if(!compactmode) {
    db = document.getElementById("diglink1").firstChild;
    injectCode("var pagetype = 'embedded'");
  }
  else {
    var d = form.getElementsByTagName("a");
    d[1].id = "diglink1";
    d[0].id = "diggs-strong-1";
    db = d[1];
    
    injectCode("var pagetype = 'embedded-compact'");
    setTimeout(injectCode, 0, '(' + function() {
      // prevent losing the digg it image
      eval("postdigg = " + postdigg.toString()
        .replace('$j("#diglink" + row + ",lightbox-digg-it").html("<a href=\\"javascript:void(0)\\">digg it</a>");', '')
        .replace('var h3 = $j("#enclosure" + row + " h3");h3.html(h3.html() + " <a id=\\"myn" + row + "\\" class=\\"news-label\\" href=\\"javascript:addn1(" + b[3] + "," + row + ",\'" + b[4] + "\')" + "\\"><img src=\\"/img/myone-add.gif\\" alt=\\"Add as My Number One\\" width=\\"50\\" height=\\"20\\" /></a>");', '')
        .replace(',#lightbox-digg-it', '')
        .replace('dg.text(b[1])', 'dg.text(b[1] + " diggs")')
        .replace('.attr("class", "dugg-it").html("<span>dugg!</span>");', '.attr("class", "dugg-it")[0].firstChild.src = "/img/digg-it-dugg-tiny.gif";')
      );
    } + ')();');
  }
  
  if(db.nodeName.toLowerCase() == "a") {
    db.setAttribute("href", "javascript:dig("+row+", "+itemd+", '"+digcheck+"')");
    db.removeAttribute("onclick");
    db.removeAttribute("target");
  }
}

// helper functions
function injectCode(code) {
  location.href = "javascript:" + code;
}