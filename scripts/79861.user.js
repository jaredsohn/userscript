// ==UserScript==
// @name           Pied Paper
// @namespace      http://userscripts.org/users/164132
// @description    Reformats journal papers for easy reading.
// @include        http://www.nature.com/*/journal/*/full/*
// @include        http://www3.interscience.wiley.com/cgi-bin/fulltext/*
// @include        http://www.springerlink.com/content/*/fulltext.html
// ==/UserScript==
var content;
var c;
var p;
var figs;

//For relative height to work, everything, up to <body> and <html> need specifying.
document.documentElement.style.height = "100%";
document.body.style.height = "100%";

if (location.href.substr(0,22) == "http://www.nature.com/") {
  // New (HTML5) Nature pages.
  if (document.getElementById("leaderboard")) {
    document.getElementById("extranav").style.display = "none";
    document.getElementById("footer").style.display = "none";
    document.getElementsByClassName("article-tools")[0].style.display = "none";
    p = document.getElementsByClassName("pull-quote");
    for (var i = 0; i < p.length; i++) {
      p[i].style.display = "none";
    }
    p = document.getElementsByClassName("illustration-right");
    for (var i = 0; i < p.length; i++) {
      p[i].style.cssFloat = "none";
    }
    document.getElementById("leaderboard").style.display = "none";
    document.getElementById("header").style.display = "none";
    document.getElementsByClassName("global-nav")[0].style.display = "none";
    document.body.style.backgroundImage = "none";
    p = document.getElementById("constrain-header").style;
    p.position = "fixed";
    p.top = 0; p.left = 0;
    p.width = "100%";
    p = document.getElementById("constrain-content").style;
    p.padding = 0;
    p.height = "90%";
    p.margin = 0;
    p.paddingTop = "2em";
    document.getElementById("constrain-footer").style.marginTop = "5px";
    c = document.getElementById("constrain").style;
    c.margin = 0;
    c.maxWidth = "none";
    c.height="100%";
    
    document.getElementsByClassName("comments")[0].style.display = "inline"

    content = document.getElementById("content");
    figs = document.getElementsByClassName("fig");
  } else if (document.getElementById("head-er")) {
    document.getElementById("head-er").style.display = "none";
    document.getElementById("foot-er").style.display = "none";
    document.getElementById("journalnav").style.display = "none";
    document.getElementById("extranav").style.display = "none";
    c = document.getElementById("constrain").style;
    c.maxWidth = "none";
    c.height = "92%";
    c = document.getElementsByClassName("constrain")[0];
    c.setAttribute("style","width: auto !important; max-width: none; height: 100%;");
    c = document.getElementById("content-journalnav").style;
    c.width = "auto";
    c.display = "block";
    c.float = "none";
    c.height = "100%";

    p = document.getElementsByClassName("section-bullet-point");
    for (var i = 0; i < p.length; i++) {
      p[i].style.background = "none";
      p[i].style.marginLeft = 0;
      p[i].style.marginRight = 0;
    }
    if (c.WebkitColumnWidth !== undefined) { //Chrome being silly.
      for (var i=0; i<p.length; i++) {p[i].style.position = "static";}
      p = document.getElementsByClassName("section-heading");
      for (var i=0; i<p.length; i++) {p[i].style.position = "static";}
      p = document.getElementsByClassName("backtotop");
      for (var i=0; i<p.length; i++) {p[i].style.position = "static";}
    }

    p = document.getElementsByClassName("figure-table");
    for (var i = 0; i < p.length; i++) {
      c = p[i].getElementsByClassName("text")[0];
      c.setAttribute("style","margin-left: 0 !important;"); 
    }

    content = document.getElementById("content");
    content.style.background = "none";
    content.style.width = "auto";
    content.style.paddingBottom = 0;
    content.style.paddingLeft = "10px";
    document.body.style.padding = 0;
    figs = document.getElementsByClassName("fig-img");
  } else if (document.getElementById("hdr")) {
    document.getElementById("hdr").style.display = "none";
    document.getElementById("ftr").style.display = "none";
    document.getElementById("breadcrumb").style.display = "none";
    document.getElementById("journalnav").style.display = "none";
    document.getElementById("extranav").style.display = "none";
    c = document.getElementById("constrain").style;
    c.maxWidth = "none";
    c.height = "92%";
    c.background = "none";
    document.body.setAttribute("style","background: none !important; height: 100%;");
    c = document.getElementsByClassName("constrain")[0];
    c.setAttribute("style","width: auto !important; max-width: none; height: 100%;");
    c = document.getElementById("content-journalnav").style;
    c.width = "auto";
    c.display = "block";
    c.float = "none";
    c.height = "100%";

    content = document.getElementById("content");
    content.style.width = "auto";
    figs = [];
    p = document.getElementsByClassName("figure-table");
    for (var i = 0; i < p.length; i++) {
      c = p[i].getElementsByTagName("a")[1];
      figs.push(c);
      p[i].getElementsByTagName("h5")[0].style.display = "block";
      c = p[i].getElementsByTagName("p")
      if (c.length > 0) { c[0].style.marginLeft = 0; }
    }
  }
  p = document.getElementsByClassName("ad");
  for (var i = 0; i < p.length; i++) {
    p[i].style.display = "none";
  }

} else if (location.href.substr(0,52) == "http://www3.interscience.wiley.com/cgi-bin/fulltext/") {
  // Wiley Interscience
  if (location.pathname.substr(-9) == "HTMLSTART") { //Break out of frames
    var paper_id = location.href.substr(52).split("/")[0];
    location.href = "http://www3.interscience.wiley.com/cgi-bin/fulltext/" + paper_id + "/main.html,ftx_abs";
  } else if (location.pathname.substr(-18) == "/main.html,ftx_abs") {
    document.getElementById("intro").style.display = "none";
    document.getElementById("contentFrame").style.height = "100%";
    document.getElementsByClassName("mainCol")[0].style.height = "100%";
    document.getElementsByClassName("mainCol")[0].style.paddingBottom = 0;
    //Tidy up header:
    c = document.getElementById("content");
    c.getElementsByClassName("txt")[0].style.display = "none";
    p = c.getElementsByClassName("line");
    p[0].style.display = "none"; p[1].style.margin = 0;
    p = c.getElementsByClassName("subContent")[0];
    p.style.position = "fixed"; p.style.top = 0; p.style.left = 0; p.style.width = "100%";
    
    c.setAttribute("style","padding: "+ p.offsetHeight+"px 0 0 !important;");
    c.style.height = "90%";
    
    var containers = [];
    containers.push(c.getElementsByTagName("table")[1]);
    containers.push(c.getElementsByTagName("tbody")[1]);
    containers.push(c.getElementsByTagName("tr")[1]);
    containers.push(c.getElementsByTagName("td")[2]);
    containers.push(c.getElementsByClassName("prerendered")[0]);
    for (var i=0; i<containers.length; i++) {containers[i].style.height = "100%";}
    if (c.style.WebkitColumnWidth !== undefined) { //Chrome
      for (var i=0; i<containers.length; i++) {containers[i].style.display = "block";}
    }

    //We need to faff with reference list, otherwise it breaks the height.
    c = document.getElementsByClassName("references-list")[0].style;
    c.paddingBottom = 0; c.marginBottom = 0;
    p = document.getElementsByClassName("reference-list-para");
    for (var i = 0; i < p.length; i++) {
      p[i].style.cssFloat = "none";
    }

    //Chrome makes block formulae disappear, which this corrects.
    p = document.getElementsByClassName("block_formula");
    for (var i = 0; i< p.length; i++) {p[i].style.position = "static";}

    content = document.getElementsByClassName("article")[0];
  } 
} else if(location.href.substr(0,36) == "http://www.springerlink.com/content/") {
  // Springerlink
  c = document.getElementsByTagName("table")[0].style;
  c.border = 0;
  c.fontSize = "10pt";
  c = document.getElementsByClassName("rubric")[0].style;
  c.fontSize = "12pt";
  c.marginTop = 0;

  //Bibliography is in a table, which makes life trickier.
  c = document.getElementsByClassName("Citation")[0]
  c.style.display = "block";
  c.parentNode.style.display = "block";
  p = c.getElementsByTagName("tr");
  for (var i = 0; i < p.length; i++) {
      p[i].style.display = "block";
    }

  content = document.body;
  p = document.getElementsByClassName("figure");
  figs = [];
  for (var i = 0; i < p.length; i++) {
    figs.push(p[i].getElementsByTagName("img")[0]);
  }

  content.style.margin = 0;
  document.documentElement.style.paddingLeft = "0.5em";
} /*else if(location.href.substr(0,20) == "http://www.pnas.org/") {
    // PNAS--Currently not working, due to some Javascript on the site.
    document.getElementById("header").style.display = "none";
    document.getElementById("authstring").style.display = "none";
    document.getElementById("col-2").style.display = "none";
    document.getElementById("col-3").style.display = "none";
    document.getElementById("footer").style.display = "none";
    alert(document.getElementById("footer").style.display);
    document.getElementById("content-option-box").style.display = "none";
    alert(document.getElementById("content-option-box").style);
    document.getElementsByClassName("social-bookmarking")[0].style.display = "none";

    document.getElementById("pageid-content").style.height = "100%";
    content = document.getElementById("content-block");
}*/

// Apply column formatting
if (content.style.MozColumnWidth !== undefined) { //Firefox
  content.style.MozColumnWidth = "28.5em";
  content.style.MozColumnGap = "1.5em";
} else if (content.style.WebkitColumnWidth !== undefined) { //Chrome
  content.style.WebkitColumnWidth = "28.5em";
  content.style.WebkitColumnGap = "1.5em";

} else { //Native style
  content.style.columnWidth = "28.5em";
  content.style.columnGap = "1.5em";
}
content.style.height = "100%";

// Tidy figures up so they don't overlap columns
if (figs) {
for (var i=0; i<figs.length; i++) {
  figs[i].style.height = "auto";
  figs[i].style.width = "auto";
  figs[i].style.maxHeight = content.offsetHeight + "px";
  figs[i].style.maxWidth = "100%";
  figs[i].style.cssFloat = "none";
  figs[i].style.display = "inline";
} }


/*  The code below from:
Horizontal Tiny Scrolling - a smooth scrolling script for horizontal websites
(the brother of the vertical "Tiny Scrolling")
by Marco Rosella - http://lab.centralscrutinizer.it/the-tiny-scrollings

v0.8 - July 7, 2009

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA				
*/
var scrollTips = {
  dx : null,
  init : function() {	
    if (window.addEventListener) {
    window.addEventListener("DOMMouseScroll", this.mouseScroll, false); //Firefox
    window.addEventListener("mousewheel",this.mouseScroll,false); //Chrome
    } else document.attachEvent("onmousewheel", this.mouseScroll); 
  },
  mouseScroll : function(e) {
    if (!e) var e = window.event;
      var scroll = e.detail ? e.detail * 20 : e.wheelDelta / -20;
    if (scroll>=0 ){  
    window.scrollBy(80,0);
    } else  window.scrollBy(-80,0) ; 
  },
  arrowScroll: function(val) {
    if(val==1) {
      window.scrollBy(70,0);
    } else {
      window.scrollBy(-70,0)
    }
}
}

scrollTips.init()