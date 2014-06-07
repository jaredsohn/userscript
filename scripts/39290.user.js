// ==UserScript==
// @name           4gamerViewer
// @namespace      Traumachicken
// @description    4gamerViewer
// @include        http://www.4gamer.net/
// ==/UserScript==
(function(){

	var btn = "<ul><li><input id='4gv_btn' type='checkbox'><span>Thumbnail</span></li>";
	var view = "</ul><div id='4gv_view' style='clear:both'> </div>";
	var fc = $c("div","finding_common");
	fc[0].innerHTML = fc[0].innerHTML.replace("<ul>", btn);
	fc[0].innerHTML = fc[0].innerHTML.replace("</ul>", view);
	
	$('4gv_btn').addEventListener("click", function(){
		test();
	}, false);
	
	function test(){
		if($('4gv_btn').checked){
			var tmp = getImg();
			//for(i=0;i<tmp.length;i++){
				$("4gv_view").innerHTML += tmp;
			//}
		}else{
			$("4gv_view").innerHTML = " ";
		}
	}
	
	function getImg(){
		var reg = new RegExp(/<img.+class.+?>/igm);
		var img = $c("div","main_contents");
		var tmp = img[0].innerHTML.match(reg);
		return tmp;
	}
	
	function $(id){
		return document.getElementById(id);
	}

	
	function $t(tag){
		return document.getElementsByTagName(tag);
	}
	
	function $c (className) {
	  var children = document.getElementsByTagName('*') || document.all;
	  var elements = new Array();
	  for (var i = 0; i < children.length; i++) {
	    var child = children[i];
	    var classNames = child.className.split(' ');
	    for (var j = 0; j < classNames.length; j++) {
	      if (classNames[j] == className) {
	        elements.push(child);
	        break;
	      }
	    }
	  }
	  return elements;
	}
	
	function $c (tagName, className) {
	  var children = document.getElementsByTagName(tagName);
	  var elements = new Array();
	  for (var i = 0; i < children.length; i++) {
	    var child = children[i];
	    var classNames = child.className.split(' ');
	    for (var j = 0; j < classNames.length; j++) {
	      if (classNames[j] == className) {
	        elements.push(child);
	        break;
	      }
	    }
	  }
	  return elements;
	}

})();