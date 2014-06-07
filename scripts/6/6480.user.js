// ==UserScript==
// @name          Show Form Actions 
// @namespace     ysn
// @description   Highlight possible Reverse Cross Site Request RCSR attack.
//                As firefox password manager may send the user site login password to remote
//                site, this will help to highlight which site it will send to.
// @include       *
// ==/UserScript==


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// Shorthand
function newNode(type) {return document.createElement(type);}
function getNode(id) {return document.getElementById(id);}


unsafeWindow.obj2str = function obj2str ( obj ) { 
   if (obj == null){ GM_log('obj2str: obj is null'); return; }
   for ( a in obj ) {
      GM_log(a);
   }
}


//TODO try to get if password manager can give up the password to javascript
var active = false;

var str = '';

var all = document.getElementsByTagName('input');
for (var i=0; i< all.length;i++){
  var input = all[i];
  if(input.type != "password") continue;
  if(input.value == "") continue;  
  str += input.name +'='+ input.value+'<br>';
  active = true;
}

if (! active) return;


var allForms = document.getElementsByTagName('form');

 var baseurl = document.location;
 // baseurl[7:].split('/')[0]
 baseurl='http://'+baseurl.href.substring(7).split('/')[0];
 baselen = baseurl.length;
 GM_log(baseurl);


for (var i=0; i< allForms.length;i++){
  var ac = allForms[i].action;
  if (ac == '') continue; 
  ac_baseurl = ac.substring(7).split('/')[0];
  if (ac.substring(0,baselen) == baseurl || ac.substring(0,1) == '/') {
     str += ac.substring(baselen); 
  } else { // TODO, if not in the same domain
     active = true;
     str += ac;
  }  
  str += '<br>';
}

//-------------- UI part ------------------
h= newNode('span');
h.id = 'sidebar_control';
h.innerHTML = 'S';
h.addEventListener("click", function(event){
   var c = getNode('sidebar_control');
   var b = getNode('sidebar_content');
   if(b.style.display == 'none') {
      b.style.display = 'block';
      c.innerHTML = 'hide';
      c.parentNode.style.width = '400';
      //b.innerHTML = document.location;
   } else {
      c.innerHTML = 'S';
      b.style.display = 'none';
      var p = c.parentNode;
      p.style.width = '15';     
     // b.innerHTML = document.location;
   }
 }, true);

c= newNode('span');
c.id = 'sidebar_content';
c.innerHTML = str;
c.style.display = 'none';

var div = newNode('div');
div.id = 'debug_bar';
div.appendChild(h);
div.appendChild(c);
document.body.appendChild(div);


addGlobalStyle(
'#debug_bar {'+
'  position: fixed;' +
'  left: 0;' +
'  top: 0;' +
'  border-top: 1px solid silver;' +
'  width: 400;' +
'  z-index: 999;' +
'  opacity: .8;' +
'  background: #ee1111;' +
'  display: block;' +
'}');



//
// ChangeLog
// 0.1 only display when there is input, type == password, passwod is not none 

