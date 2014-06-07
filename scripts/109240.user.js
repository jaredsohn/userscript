// ==UserScript==
// @name           nachrichten
// @include        http://*.ogame.de/game/index.php?page=*
// ==/UserScript==


var a = document.createElement("a");
a.href ='#';
a.id = 'nachrichtenlink';
a.appendChild(document.createTextNode("Nachrichtenmenü"));
var div = document.createElement("div");
div.id = 'nachdiv';
div.name=div.id
div.style.display ='block';
document.body.appendChild(div);

function nach(){
function getElementsByClass (cName, domNode) {
	if (cName == undefined || cName.length == 0) return;
	if (domNode == undefined) domNode = document;
	if (domNode.getElementsByClassName)
		return domNode.getElementsByClassName(cName);
	cName = " " + cName + " "; 
	var elements = domNode.getElementsByTagName('*');
	var res = new Array();
	for (var i = 0; i < elements.length; i++) {
		var className = " " + elements[i].className + " ";
		if (className.indexOf(cName) > -1) {
			res.push(elements[i]);
		}
	}
	return res;
}
  var session = document.URL.match(/session=([0-9a-zA-Z]+)/)[1];
  var server = document.URL.match(/http:\/\/([0-9a-zA-Z\-\._]+)\//)[1];
  var xml = new XMLHttpRequest();
  xml.open('GET','http://'+server+'/game/index.php?page=messages&session='+session+'&ajax=1', true);
  xml.onreadystatechange = function () {
    if (xml.readyState == 4) {
      document.getElementById("nachdiv").innerHTML='<script type="text/javascript" src="http://uni58.ogame.de/game/js/thickbox.js?v=2.2.7"></script>'+xml.responseText;
      var nachlinks = getElementsByClass('ajax_thickbox',document.getElementById("nachdiv"));
      for (var i=0; i<nachlinks.length;i++){
        var on = document.createAttribute("onclick");
        on.nodeValue = "javascript:tb_show(null,\'"+nachlinks[i].href+"\',null);";
        nachlinks[i].href='#nachdiv';
        nachlinks[i].setAttributeNode(on);
      }
    }
  }  
  xml.send(null);
}

document.getElementById("links").appendChild(a);
document.getElementById("nachrichtenlink").addEventListener('click',nach,true);