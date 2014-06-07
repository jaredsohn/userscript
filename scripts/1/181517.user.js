// ==UserScript==
// @name Links Suggestor
// @description This script can suggest you links about some tags that you put on.
// ==/UserScript==
window.onload = load();
function load() {
    var nodes = document.evaluate("//div[@class='wrapper_all']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null); 
    for (var i = 0; i < nodes.snapshotLength; i++) {
		var node = nodes.snapshotItem(i);
		node.parentNode.removeChild(node);
	}
	var nodes = document.evaluate("//a[@class='color_a']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null); 
    for (var i = 0; i < nodes.snapshotLength; i++) {
		var node = nodes.snapshotItem(i);
		node.className = node.className.replace("color_a","");
	}
    deletePubli();
    var preferencias = getValue("preferencias");
	var a_sugeridos = [];
	var new_node = createDiv();
	var new_ul = document.createElement("ul");
	new_ul.className = "list_a";
	var nodes = document.evaluate("//a[@href]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null); 
	var num = 0;
	for (var i = 0; i < nodes.snapshotLength; i++) {
		var node = nodes.snapshotItem(i);
		var text = node.text.toLowerCase();
		var ok_pref = false;
		for (preferencia in preferencias){
			if(text.indexOf(preferencias[preferencia])!= -1){
				ok_pref = true;
			}
		}
		if(ok_pref && a_sugeridos.indexOf(text) == -1){
			a_sugeridos.push(text);
			var li_aux = document.createElement("li");
			li_aux.className = "li_GM";
			var clon =node.cloneNode(true);
			clon.className = "a_GM";
			node.className = node.className + " color_a";
			if( num < 16 ){
			     li_aux.appendChild(clon);
			     new_ul.appendChild(li_aux);
			}
			num ++;
		}
	}
	new_node.appendChild(new_ul);
	var button_show = createButtonShow();
	new_node.appendChild(button_show);
	var body = document.getElementsByTagName("body")[0].appendChild(new_node);
	var nodes = document.evaluate("//p[@class='sugeriendo']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null); 
    for (var i = 0; i < nodes.snapshotLength; i++) {
		var node = nodes.snapshotItem(i);
		node.innerHTML = "para: [" + preferencias.toString() + "]";
	}
	var buttons = document.evaluate("//button[@id='save']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null); 
    for (var i = 0; i < buttons.snapshotLength; i++) {
		var node = buttons.snapshotItem(i);
		node.addEventListener ("click", savePreferences, false );
	}
	var buttons = document.evaluate("//button[@id='show']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null); 
    for (var i = 0; i < buttons.snapshotLength; i++) {
		var node = buttons.snapshotItem(i);
		node.addEventListener ("click", function(){
		     var divs = document.evaluate("//div[@class='wrapper_all']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null); 
             for (var i = 0; i < divs.snapshotLength; i++) {
		          var node = divs.snapshotItem(i);
		          if(node.style.right == "0px"){
                       node.style.right = "-185px";
                       node.style.opacity = "0.3";
                       setValue("visible",0);
		          }else{
		              node.style.right = "0px";
                      node.style.opacity = "1";
                      setValue("visible",1);
		          }
	           } 
		}, false );
	}
}
function createButtonShow(){
    var aux = document.createElement("button");
    aux.className="btn";
    aux.id="show";
    aux.innerHTML = "Ocultar / Mostrar";
    return aux;    
}
function appendInput (new_node){
    var div = document.createElement("div");
    div.className = "wrapper_inputs";
    div.innerHTML = "<p class='text'>Preferencias: </p>"+
                    "<input id='preferencias' type='text' placeholder='Tags (separados por comas)'/>"+
                    "<button id='save'>Guardar</button>";
    new_node.appendChild(div);
    
}
function savePreferences(){
    var nodes = document.evaluate("//input[@id='preferencias']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null); 
    var preferencias = "";
    for (var i = 0; i < nodes.snapshotLength; i++) {
		var node = nodes.snapshotItem(i);
		preferencias = node.value.toLowerCase();
		node.value = "";
	}
	setValue("preferencias",preferencias.split(","));
	load();
}
function createDiv(){
	var new_node = document.createElement("div");
	new_node.className = "wrapper_all";
	if(getValue("visible") == 1){
	   new_node.style.right="0px";
	   new_node.style.opacity="1";
	}else if(getValue("visible") == 0){
	   new_node.style.right="-185px";
	   new_node.style.opacity="0.3";
	}
	var title = document.createElement("h4");
	title.className = "title_a";
	var text = document.createTextNode("Enlaces Sugeridos ");
	var p = document.createElement("p");
	p.className= "sugeriendo";
	title.appendChild(text);
	var btn = createButtonShow();
	new_node.appendChild(btn);
	appendInput(new_node);
	new_node.appendChild(title);
	new_node.appendChild(p);
	return new_node;
}
function deletePubli(){
    var nodes = document.evaluate("//iframe[@src]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null); 
	
	for (var i = 0; i < nodes.snapshotLength; i++) {
		var node = nodes.snapshotItem(i);
		node.parentNode.removeChild(node);
	}
	
	var nodes = document.evaluate("//*[contains(@class,'publi') or contains(@id, 'publi')]", document, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null); 
    for (var i = 0; i < nodes.snapshotLength; i++) {
		var node = nodes.snapshotItem(i);
		node.parentNode.removeChild(node);
	}
}
function setValue(name, new_value){
    GM_setValue(name,JSON.stringify(new_value));
}
function getValue(name){
	return JSON.parse(GM_getValue(name,"{}"));
}
GM_addStyle("#save {"+
	               "padding:5px;"+
	               "color:#fff;"+
	               "margin-top:10px;"+
	               " border:1px solid #0000FF;"+
	               " background-color:#0000FF;"+
	               " border-radius:5px;"+
	               "cursor:pointer;"+
	            "}"+
	            ".btn {"+
	               "padding:5px;"+
	               "color:#fff;"+
	               " border:1px solid #0000FF;"+
	               " background-color:#0000FF;"+
	               " border-radius:5px;"+
	               "cursor:pointer;"+
	            "}"+
	            "#preferencias{"+
	               "width:95%;"+
	               "height:30px;"+
	               "border:1px solid #000;"+
	               "border-radius:5px;"+
	               "padding:0px 5px"+
	            "}"+
	            ".text{"+
	               "margin-top: 10px;"+
	               "color:#000;"+
	               "font-size:14px;"+
	               "margin-bottom:10px;"+
	            "}"+
	            ".li_GM{"+
	               "list-style:none !important;"+
	               "padding-left:10px !important;"+
	            "}"+
	            ".color_a{"+
	               "background-color:rgb(255, 255, 0) !important;"+
	            "}"+
	            ".color_a *{"+
	               "background-color:rgb(255, 255, 0) !important;"+
	            "}"+
	            ".a_GM{"+
	               "padding:2px !important;"+
	               "font-size:13px !important;"+
	            "}"+
	            ".wrapper_all{"+
	               "position:absolute;"+
	               "width:250px;"+
	               "top:0px;"+
	               "right:0px;"+
	               "background-color: #fff !important;"+
	               "font-family: Tahoma,Geneva,sans-serif !important;"+
                   "font-weight: normal !important;"+
	               "border-bottom:1px solid #eee;"+
	               "border-left:1px solid #eee;"+
	               "z-index:3000;"+
	               "padding:10px;"+
	               "text-align:left;"+
	               "box-shadow:-2px 2px 1px rgba(0,0,0,0.3);"+
	            "}"+
	            ".title_a{"+
	               "font-size:17px;"+
	               "margin-bottom:5px;"+
	            "}"+
	            ".wrapper_inputs{"+
	               "padding-bottom:15px;"+
	               "margin-bottom:10px;"+
	               "border-bottom:1px solid #eee;"+
	            "}"+
	            ".list_a{"+
	               "padding-top:0px !important;"+
	               "margin-bottom:10px !important;"+
	               "padding-bottom:10px !important;"+
	               "padding-left:10px !important;"+
	               "border-bottom:1px solid #eee;"+
	            "}"+
	            ".a_GM img{"+
	            "}"+
	            ".sugeriendo{"+
	               "color:#000;"+
	               "font-size:14px;"+
	               "margin-bottom:5px;"+
	            "}");
