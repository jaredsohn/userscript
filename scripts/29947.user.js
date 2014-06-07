//
// ==UserScript==
// @name          Conquer Club User Tagging
// @namespace     http://userscripts.org/
// @description   Script to Tag Users with Posts
// @include       http://www.conquerclub.com/forum/*
// ==/UserScript==


var myTags;
var codes = new Array("#FFFF00","#FFFF00","#FFDD00","#FFBB00","#FF9900","#FF7700","#FF5500","#FF3300","#FF1100");

function Tag(url,name,post) {
this._url = url;
this._name = name;
this._post = post;
}

function getElementsByClassName(oElm, strTagName, strClassName, exact)
{
  var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
  var arrReturnElements = new Array();
  strClassName = strClassName.replace(/\-/g, "\\-");
  var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s)");
  var oElement;
  for(var i=0; i<arrElements.length; i++){
   oElement = arrElements[i];
   if (exact)
   {
    if(oElement.className==strClassName){
    arrReturnElements.push(oElement);
    }
   }
   else
   {
    if(oElement.className.has(strClassName)){
     arrReturnElements.push(oElement);
    }
   }
  }
  return (arrReturnElements)
}

function displayTags(user,block) {
if(myTags[user]) {
if(document.getElementById("wrap" + user + "|" + block))
document.getElementById("wrap" + user + "|" + block).innerHTML = '';
else{
var wrapper = authors[block].appendChild(document.createElement('div'));
wrapper.style.border = "1px solid black";
wrapper.id = "wrap" + user + "|" + block;
}
for(var t in myTags[user]) {
var tag = document.getElementById("wrap" + user + "|" + block).appendChild(document.createElement('a'));
tag.innerHTML = t + "(" + myTags[user][t].length + ")";
tag.style.color = "#FF0000";
tag.style.backgroundColor = "black";
if(codes[myTags[user][t].length]) tag.style.color = codes[myTags[user][t].length];
var dv = tag.appendChild(document.createElement('div'));
dv.style.display = "none";
dv.style.zIndex = 100;
dv.id = "div" + user + "|" + t + "|" + block;
tag.id = "tag" + user + "|" + t + "|" + block;
tag.href="javascript:void(0);";
tag.addEventListener("click", function() {
var aid = this.id.split('tag')[1];
var number = aid.split("|");
var text = "";
for(c=0; c< myTags[number[0]][number[1]].length;c++){
text += "<a href=\"" + myTags[number[0]][number[1]][c]._post + "\">" + myTags[number[0]][number[1]][c]._name + "</a>";
text += " <a id='del" + number[0] + "|" + number[1] + "|" + c + "|" + number[2] + "' style=\"color:red\" href=\"javascript:void(0);\">Delete</a><br />";
}
text += "<a id='all" + number[0] + "|" + number[1] + "|" + number[2] + "' style=\"color:red\" href=\"javascript:void(0);>Delete All</a>";
document.getElementById('div' + number[0] + "|" + number[1] + "|" + number[2]).innerHTML = text;
document.getElementById('div' + number[0] + "|" + number[1] + "|" + number[2]).style.display = "";
for(c=0; c< myTags[number[0]][number[1]].length;c++){
document.getElementById('del' + number[0] + "|" + number[1] + "|" + c + "|" + number[2]).addEventListener("click", function() {
var did = this.id.split('del')[1];
var nums = did.split("|");
myTags[nums[0]][nums[1]].splice(nums[2],1);
if(myTags[nums[0]][nums[1]].length == 0) delete(myTags[nums[0]][nums[1]]);
if(myTags[nums[0]].length == 0) delete myTags[nums[0]];
if(myTags.length == 0) myTags = new Object();
GM_setValue("tags", uneval(myTags));
displayTags(nums[0],nums[3]);
},true);
document.getElementById('all' + number[0] + "|" + number[1] + "|" + number[2]).addEventListener("click", function() {
var nid = this.id.split('all')[1];
var numall = nid.split("|");
delete(myTags[numall[0]][numall[1]]);
if(myTags[numall[0]].length == 0) delete myTags[numall[0]];
if(myTags.length == 0) myTags = new Object();
GM_setValue("tags", uneval(myTags));
displayTags(numall[0],numall[2]);
},true);
}
}
, true);
var p = document.getElementById("wrap" + user + "|" + block).appendChild(document.createElement('span'));
p.innerHTML = ' ';
}
if(!t)
document.getElementById("wrap" + user + "|" + block).style.border = '';
else
document.getElementById("wrap" + user + "|" + block).style.border = '1px solid black';
}
}

function addTag(person,name,tagobj) {
var exists = 0;
if(myTags[person]) {
if(myTags[person][name]) {
for(var i=0;i<myTags[person][name].length;i++) {
 if(myTags[person][name][i]._url == tagobj._url && myTags[person][name][i]._post == tagobj._post) {
   exists = 1;
   break;
 }
}
}
else{
myTags[person][name] = new Array();
}
}
else{
myTags[person] = new Object();
myTags[person][name] = new Array();
}
if(!exists) {
myTags[person][name].push(tagobj);
GM_setValue("tags", uneval(myTags));
return 0;
}
return 1;
}

if(/www.conquerclub.com\/forum/.test(window.location.href)){
var leftBar = document.getElementById("leftColumn");
if(leftBar) {
var ul = leftBar.getElementsByTagName("ul");
if (ul[0]) {
myTags = eval(GM_getValue('tags'));
if(typeof(myTags) == "undefined") {
  myTags = new Object();
}
if(window.location.href.match(/t=(\d+)/)) {
var authors = getElementsByClassName(document,'p','author',true);
var tagline = getElementsByClassName(document,'dl',"postprofile",true);
var headers = document.getElementsByTagName('h2');
var firsts = document.getElementsByTagName('h3');
var title = headers[0].firstChild.innerHTML;
var topic = RegExp.$1;
for(a=0; a< tagline.length; a++) {
var post = firsts[a].firstChild.href;
var input = document.createElement('input');
var button = document.createElement('a');
button.style.border = "1px solid black";
if(authors[a].innerHTML.match(/u=(\d+)/)) {
var uid = RegExp.$1;
input.type = "text";
input.id = "ava" + uid + "|" + a;
button.innerHTML = "Tag User";
button.id = "but" + uid + "|" + a + "|" + post;
button.href="javascript:void(0);";
tagline[a].appendChild(document.createElement('br'));
tagline[a].appendChild(input);
tagline[a].appendChild(button);
var div = document.createElement('div');
div.id = "div" + uid + "|" + a;
tagline[a].appendChild(div);
button.addEventListener("click", function() {
var id = this.id.split('but')[1];
var num = id.split("|");
var newtag = new Tag(topic,title,num[2]);
var val = document.getElementById('ava' + num[0] + "|" + num[1]);
var list = val.value.split(',');
var repeats = new Array();
for(var n=0; n<list.length;n++) {
if(addTag(num[0],list[n], newtag)) {
 repeats.push(list[n]);
}
}
displayTags(num[0],num[1]);
val.value = '';
if(repeats.length) {
alert(repeats + " already tagged for this user on this post");
}
}
, false);

if(myTags[uid]) {
displayTags(uid,a);
}
}
}
}


}
}
}

