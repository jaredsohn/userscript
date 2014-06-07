// ==UserScript==
// @name           Research Homepage
// @namespace      www.inf.usi.ch
// @description    Add research topics to the USI INF Faculty homepage
// @include        http://www.inf.usi.ch/index.htm
// ==/UserScript==

var topics = [
{name:"Intelligent Systems",sub:["Artificial Intelligence","Machine Learning","Robotics"]},
{name:"Theory and Algorithms",sub:["Algorithms","Complexity","Logic","SAT"]},
{name:"Computational Science",sub:["Applied Mathematics","Numerical Algorithms"]},
{name:"Systems and Networks",sub:["Computer Architecture","Distributed Systems", "Mobile Computing", "Cloud Computing", "Service-oriented Computing", "Security"]},
{name:"Software Engineering",sub:["Software Architecture", "Software Evolution", "Software Visualization", "Testing", "Performance"]},
{name:"Geometric and Visual Computing",sub:["Computer Graphics", "Geometry Processing", "Computer Vision", "Computational Geometry"]},
{name:"Programming Languages",sub:["Compilers", "Runtime Systems", "Semantics", "Program Analysis", "Program Verification"]},
{name:"Information Systems",sub:["Databases", "Information Retrieval", "HCI", "Web Engineering", "Business Process Management", "Privacy"]},
].sort(function(a,b){if (a.name < b.name) { return -1; } else if (a.name == b.name) { return 0 } else {return 1 }});

var s = "<div class=\"box_pad\"><h1>Research</h1>";

s = s + "<div style=\"-moz-column-count: 2;\">";

for (t in topics) {

var i = 1 + parseInt(t);

s = s + "<div style=\"float:left;\"><img src=\"http://www.inf.usi.ch/faculty/pautasso/images/research/"+i+".jpg\" style=\"height:32px; margin:8px\"></div><div style=\"float:left; width:80%\"><p>"+topics[t].name+"</p>";

s = s + "" + topics[t].sub.sort().join(", ") + "</div>";

s = s + "<br><div style=\"clear:both\"></div>";

}

s = s + "</div>";


s = s + "</div";

var d = document.getElementById("box_presentation");

var script = document.createElement('div');
script.setAttribute("class", "box");
script.innerHTML = s;
  
d.appendChild(script);