// ==UserScript==
// @name           Add Set From iKnow
// @namespace      studyjapanese.org
// @include        http://www.studyjapanese.org/index.php?option=com_fc_trainer
// ==/UserScript==



(function(){
	var pnlCardList = document.getElementById("pnlCardList");
	var cardTable = null;
	for(var i=0; i<pnlCardList.childNodes.length; i++){
		if(pnlCardList.childNodes[i] && pnlCardList.childNodes[i].getAttribute("class")=="cardTable"){
			cardTable = pnlCardList.childNodes[i]; 
		}
	}
	var number_of_cards = 0;
	if(cardTable && cardTable.rows){
		number_of_cards = cardTable.rows.length - 1;
	}
	
	for(i=0; i<pnlCardList.childNodes.length; i++){
		if(pnlCardList.childNodes[i] && pnlCardList.childNodes[i].nodeName.toLowerCase() == "div"){
			for(var x=0; x<pnlCardList.childNodes[i].childNodes.length; x++){
				if(pnlCardList.childNodes[i].childNodes[x] && pnlCardList.childNodes[i].childNodes[x].nodeName.toLowerCase() == "div"){
					pnlCardList.childNodes[i].childNodes[x].firstChild.nodeValue += " (" + number_of_cards + " cards)";
				}
				break;
			}
			break;
		}
	}
	

	var divElms = document.getElementsByTagName("div");	
	if(divElms.length == 0){ return; }
		
	// going to add a button to the element classed "iconbar" on this page
	// XPath would be a better and faster way to do this
	var wanted_element = null;
	for(i=0; i < divElms.length; i++){
		if(divElms[i].getAttribute("class") == "iconbar"){
			wanted_element = divElms[i];
		}
	}
	if(!wanted_element){return;} // cough gag die
	
	// buttons are all anchor tags with the class "button"
	var button_to_add = document.createElement("a");
	button_to_add.className = "button";
	button_to_add.innerHTML = "Add Set from Smart.FM";
	
	wanted_element.insertBefore(button_to_add, wanted_element.childNodes[0]);

	button_to_add.addEventListener("click", add_items_from_iknow, false);

	// this sniplet makes it work ...
	// from http://wiki.greasespot.net/UnsafeWindow
	var sGetter = document.createElement("script");
	sGetter.type = "text/javascript";
	sGetter.innerHTML = 
	  "function uXHR(url) {" +
	  "  netscape.security.PrivilegeManager.enablePrivilege('UniversalBrowserRead');" +
	  "  var xhr = new XMLHttpRequest();" +
	  "  xhr.onreadystatechange = function() { " +
	  "    if (xhr.readyState == 4) {" +
	  "      add_items_from_iknow_xhr_callback(xhr.responseXML);" + 
	  "    }" +
	  "  };" +
	  "  xhr.open('GET', url, true);" +
	  "  xhr.send(null);" +
	  "}";
	
	document.body.appendChild(sGetter);
	
})();

var folder_id = "";
var which_page = 1;
var which_list = "";

function add_items_from_iknow() {
	var wloc = window.location.toString();
	var wloc_parts = wloc.split("?");
	if(wloc_parts.length == 2){
		var parms = wloc_parts[1];
		var p_parts = parms.split("&");
		for(var i=0; i<p_parts.length; i++){
			var pv = p_parts[i].split("=");
			if(pv.length==2){
				if(pv[0]=="folder_id"){
					folder_id = pv[1];
				}
			}
		}
	}

	if(folder_id == ""){return;}
	which_list = prompt("Please enter the list ID:", "");
	if(!which_list || which_list.length <= 0){alert("need list id.");return;}
	
	unsafeWindow.uXHR("http://api.iknow.co.jp/lists/" + which_list + "/items.xml?page=" + which_page + "&per_page=10");
}

// source http://www.daniweb.com/forums/thread103808-3.html
function getFirstChildTag(Node) {
var len = Node.childNodes.length;
for (var i = 0; i < len; i++)
   if (Node.childNodes[i].nodeName != '#text') return Node.childNodes[i];
}

unsafeWindow.add_items_from_iknow_xhr_callback = (function(dat) {
	if(folder_id==""){alert("need folder id");return;}
	
	var get_cue = (function(x){return x.getElementsByTagName("cue")[0].getElementsByTagName("text")[0].firstChild.nodeValue;});
	var get_answer = (function(x){return x.getElementsByTagName("responses")[0].getElementsByTagName("response")[0].getElementsByTagName("text")[0].firstChild.nodeValue;});
	
	var items_elm = dat.documentElement.getElementsByTagName("items")[0];
	var list_of_items = items_elm.getElementsByTagName("item");
	if(!list_of_items || list_of_items.length <= 0){
		alert("Completely done.");
		return;
	}

	var items_to_add = [];
	for(var i=0; i < list_of_items.length; i++){
		items_to_add.push([get_cue(list_of_items[i]), get_answer(list_of_items[i])]);
	}
	items_to_add = items_to_add.reverse();

	while(items_to_add.length > 0){
		var post_str = "";
		for(i=0; i<10; i++){
			if(items_to_add.length <= 0){break;}
			
			var this_item = items_to_add.pop();
			if(this_item){
				post_str += "&r" + i + "_ID=";
				post_str += "&r" + i + "_0i=" + this_item[0];
				post_str += "&r" + i + "_1i=" + this_item[1];
				
				for(var x=2; x<6; x++){
					post_str += "&r" + + i + "_" + x + "i=";
				}
			}else{
				for(var x=0; x<6; x++){
					post_str += "&r" + + i + "_" + x + "i=";
				}			
			}
		}
		
		post_str += "&task=addcAddManyCards&folder_id=" + folder_id;
			
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "/index.php?option=com_fc_trainer&Itemid=37&task=addcAddManyCards&folder_id="+folder_id, false);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded') ;
		xhr.send(post_str);
	}
	
	if(!which_list || which_list.length <= 0){alert("need list id.");return;}
	
	unsafeWindow.uXHR("http://api.iknow.co.jp/lists/" + which_list + "/items.xml?page=" + (++which_page) + "&per_page=10");
});

unsafeWindow.items_posted_to_studyjapanese_callback = (function(dat) {
	alert("done");
});
