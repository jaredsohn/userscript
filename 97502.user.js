// ==UserScript==
// @name           Plurk Top Mass Vote 
// @namespace      http://www.plurk.com
// @description    You can up vote or down vote all on Plurk Top page.
// @include        http://www.plurk.com/t/*
// ==/UserScript==
// Code From "Reddit Mass Vote" http://userscripts.org/scripts/show/52213
// 2011-03-18 Plurk change the class_name 
// From http://snipplr.com/view/1696/get-elements-by-class-name/
function getElementsByClassName(classname, node)  {
  if(!node) node = document.getElementsByTagName("body")[0];
  var a = [];
  var re = new RegExp('\\b' + classname + '\\b');
  var els = node.getElementsByTagName("*");
  for(var i=0,j=els.length; i<j; i++)
    if(re.test(els[i].className))a.push(els[i]);
  return a;
}

// From http://jehiah.cz/archive/firing-javascript-events-properly
function fireEvent(element,event){
  if (document.createEventObject){
    // dispatch for IE
    var evt = document.createEventObject();
    return element.fireEvent('on'+event,evt);
  }
  else {
    // dispatch for firefox + others
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent(event, true, true );
    return !element.dispatchEvent(evt);
  }
}

function down_vote_all() {
  vote_all('arrow arrow_down');
}

function up_vote_all() {
  vote_all('arrow arrow_up');
}


function vote_all(class_name) {
  arrows = getElementsByClassName(class_name);
  for (var i = 0; i < arrows.length; i++) {
      fireEvent(arrows[i], 'click');
  }
}

var add_css = document.createElement("style");
var add_vote_all = document.createElement("div");
add_css.innerHTML = '#vote_all {z-index: 999; padding: 5px 10px; position: fixed; right: 0px; bottom: 0px; } #vote_all a{color: white; padding: 3px 20px 3px 10px;} #up_vote_all{background-color:red;} #down_vote_all{background-color:gray} ';
add_vote_all.innerHTML = '<div id="vote_all"><a id="up_vote_all" href="#" >Up All</a><a id="down_vote_all" href="#" >Down All</a></div>';
document.body.insertBefore(add_css, document.body.lastChild);
document.body.insertBefore(add_vote_all, document.body.lastChild);

document.getElementById("up_vote_all").addEventListener('click', up_vote_all,true);
document.getElementById("down_vote_all").addEventListener('click', down_vote_all,true);
