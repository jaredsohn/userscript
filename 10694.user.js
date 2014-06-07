// ==UserScript==
// @name           My Own Emoticons
// @author         Carlos Souza
// @namespace      http://www.infocass.com.br
// @description    Change words to emoticons
// @include        *
// ==/UserScript==

/********** INIT **********/
var emoticons = [];

/********** LOAD/SAVE **********/
function loadEmoticons() {
  var savedEmoticons = GM_getValue("emoticons");
  if (typeof savedEmoticons != "undefined")
      eval('emoticons = ' + savedEmoticons);
}

function saveEmoticons() {
  GM_setValue("emoticons", emoticons.toSource());
}   

/********** EMOTICON FUNCTIONS **********/
function changeEmoticons() {
  if (emoticons.length<1)
    return;

  var headFind = "//text()[not(ancestor::script) and not(ancestor::style) and not(ancestor::textarea) and (";
  var midFind = "";
  var totalFind = "";
  var k,l;
  
  for (k=0;k<emoticons.length;k++) {
    if (k>0) 
      midFind += " or ";
    midFind += "contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'" + emoticons[k][0] + "')";
  }  

  totalFind = headFind + midFind + ")]";

  var findEmoticons = document.evaluate(totalFind, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for(var i = findEmoticons.snapshotLength - 1;i >= 0; i--) {
    var listFind = [];
    var emot = findEmoticons.snapshotItem(i);
    listFind.push([0,emot.nodeValue]);
    for (k=0;k<emoticons.length;k++) {
      for (l=0;l<listFind.length;l++) {
        if (listFind[l][0]==0) {
          var emval = listFind[l][1];
          var re = new RegExp(emoticons[k][0], "i");
          var pos = emval.search(re);
          if (pos>-1) {
            if (pos>0)
              if (pos+emoticons[k][0].length<emval.length)
                listFind.splice(l,1,[0,emval.substr(0,pos)],[1,emoticons[k][0],emoticons[k][1]],[0,emval.substr(pos+emoticons[k][0].length,emval.length-pos-emoticons[k][0].length)]);
              else
                listFind.splice(l,1,[0,emval.substr(0,pos)],[1,emoticons[k][0],emoticons[k][1]]);
            else 
              if (emoticons[k][0].length<emval.length)
                listFind.splice(l,1,[1,emoticons[k][0],emoticons[k][1]],[0,emval.substr(emoticons[k][0].length,emval.length-emoticons[k][0].length)]);
              else
                listFind.splice(l,1,[1,emoticons[k][0],emoticons[k][1]]);
    } } } }
    var emotSpan = document.createElement("span");
    for (l=0;l<listFind.length;l++) 
      if (listFind[l][0]==0)
	    emotSpan.appendChild(document.createTextNode(listFind[l][1]));
      else {
        var emimg = document.createElement("img");
        emimg.setAttribute("src", listFind[l][2]);
        emimg.setAttribute("title", listFind[l][1]);
        emotSpan.appendChild(emimg);
      }      
    emot.parentNode.replaceChild(emotSpan, emot);      
} } 

/********** BOX FUNCTIONS **********/
function storeEmoticons() {
  for (var i=0;i<emoticons.length;i++)
    for (var j=0;j<2;j++) {
      var info = document.getElementById('MOE_'+i+'_'+j);
      if (info) 
		if (j==0) emoticons[i][j] = info.value.toLowerCase();
		else emoticons[i][j] = info.value;
    }
  saveEmoticons();
  hideBox();  
}

function hideBox() {
  var box = document.getElementById('MOE_config');
  if (box) box.parentNode.removeChild(box);
}

function showBox() {
  var box = document.getElementById('MOE_config');
  if (box != null) hideBox();
  box = document.createElement("box");
  box.setAttribute("id", "MOE_config");
  box.setAttribute("style", "display:block;z-index:1000;position:fixed;overflow:auto;left:100px;top:10%;width:530px;height:80%;background-color:silver;padding:10px;border:1px solid black");
  document.body.appendChild(box);
  if (!document.getElementById('MOE_config')) {
    alert("Error!");
    return;
  }
  var s='';
  s+="<font style='font-weight:bold;'>Emoticons</font><br/><br/>";
  s+="<button id='MOE_add'>Add</button><br/><br/>";
  s+="<button id='MOE_save'>Save</button><br/><br/>";
  s+="<button id='MOE_cancel'>Cancel</button>";
  box.innerHTML = s;
 
  var div = document.getElementById('MOE_table');
  if (div != null) hideBox();
  div = document.createElement("div");
  div.setAttribute("id", "MOE_table");
  div.setAttribute("style", "display:block;z-index:1100;position:fixed;overflow:auto;left:200px;top:13%;width:420px;height:80%;background-color:white;padding:0px;border:1px solid black");
  box.appendChild(div);
  if (!document.getElementById('MOE_table')) {
    alert("Second error!");
    return
  }
  
  s='';
  s+="<table cellspacing='0' cellpadding='0'>";
  for (var i=0;i<emoticons.length;i++) {
    var emot=emoticons[i];
    s+="<tr>";
    s+="<td><input id='MOE_" + i + "_0' type='text' size='10' value='" + emot[0] + "'/></td>";
    s+="<td><input id='MOE_" + i + "_1' type='text' size='40' value='" + emot[1] + "'/></td>";
    s+="<td><button id='MOE_" + i + "_del'>Del</button></td>";
    s+="</tr>";
    s+="";
  }
  s+="</table>";
  div.innerHTML = s;  
  
  for (var i=0;i<emoticons.length;i++) 
    document.getElementById('MOE_'+ i + '_del').addEventListener('click', function(e) {storeEmoticons(); var id=e.target.getAttribute('id'); var i=id.substr(4,id.lastIndexOf('_')-4); var a=[]; for(var j=0;j<emoticons.length;j++) if (j!=i) a.push(emoticons[j]); emoticons=a; showBox()}, false);
  document.getElementById('MOE_add').addEventListener('click', function(e) {storeEmoticons(); emoticons.push(['','']); showBox();}, false);  
  document.getElementById('MOE_save').addEventListener('click', function(e) {storeEmoticons()}, false);
  document.getElementById('MOE_cancel').addEventListener('click', function(e) {hideBox()}, false);
}

/********** EVENTS **********/
window.myPressEvent  = function (e) {
  if (e.keyCode==27)               // press ESC
    hideBox();
  if (e.charCode==42 && e.ctrlKey) // press ctrl + '*'
    showBox();
}

/********** START CODE **********/
loadEmoticons();
document.addEventListener('keypress', window.myPressEvent, false);
changeEmoticons();
