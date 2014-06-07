// ==UserScript==
// @name           LQFBEmbedProposals
// @namespace      janschejballqfb
// @description    Bettet die Texte der Anregungen ein. Akkordeon-Ansicht verwenden!
// @include        https://lqfb.piratenpartei.de/*
// @include        https://lqfb.piratenpartei-hessen.de/*
// ==/UserScript==

var divs = document.getElementsByTagName("div");

function driver() {
  for ( var i = 0; i < divs.length; i++ ) {
    if (divs[i].id.match(/.*_content_suggestions/) ) {
      fixLinks(divs[i]);
    }
  }
}
  
function addText (link)
{
    req = new XMLHttpRequest();
    req.open('GET', link.href);
    req.onreadystatechange = function () {
        if (this.readyState == 4) {
            this.responseText.match(/<div class="suggestion_content wiki"><p>([^<]*)</);
            link.title = RegExp.$1;
            link.title = link.title.replace(/&quot;/g,'"');
            link.title = link.title.replace(/&lt;/g,'<');
            link.title = link.title.replace(/&gt;/g,'>');
            link.title = link.title.replace(/&amp;/g,'&');
        }
    };
    req.send(null);
}

function fixLinks(source) {
  if (source.innerHTML.length < 20) {return;}
  if (source.innerHTML.match(/<!--working-->$/)) {return;}
  source.innerHTML += "<!--working-->";
   
  var links = source.getElementsByTagName("a");
  var base = window.location.protocol + "//" + window.location.host + "/";
  base = base.replace(/\./g, "\\.");
  var re = new RegExp("^("+base+".*suggestion/show/[0-9]+\.html)$");
  for ( var i = 0; i < links.length; i++ ) {
    if ( re.test(links[i].href) ) {
      addText(links[i]);
    }
  }
  
}

setInterval(driver, 250);
