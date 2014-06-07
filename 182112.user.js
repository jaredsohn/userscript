// ==UserScript==
// @id             googwslistcompact@eucaly61
// @name           Google Site List Compact
// @version        0.10
// @namespace      googwslistcompact@eucaly61
// @author         eucaly61
// @description    
// @include        https://sites.google.com/a/*
// @include        http://sites.google.com/a/*
// @run-at         document-idle
// ==/UserScript==
/*

v0.10 - 131107
* first functional version

v0.01 - 131106
* start coding

ToDo
* show hint/tooltip for the same raw ?
* to copy content ? 

*/

	function myCompact()
	{
		var qTable_ID="#goog-ws-list-table";
		var qCtrl_ID = "#sites-canvas-main-content"; 	// "#sites-list-controls";
		var TableDOM = document.querySelector(qTable_ID);
		var CtrlDOM = document.querySelector(qCtrl_ID);
//		log("fatch table");
		if(TableDOM == null){
//			log("pending 1");
			setTimeout(initializeComponent, 1000);
			return;
		}
		
		var	input0 = document.getElementById("myWidth");
		text0 = input0.value + '';
		value0 = text0 * 1;
		var myWidth = 50;
		if (value0 > 0)
			myWidth = value0;
			
		var tdCells = TableDOM.getElementsByTagName("td"); 
//		log("td = " + tdCells.length,3);
//		for (var tdCell in tdCells) {
		for (var i=0; i<tdCells.length; i++){
			tdCell = tdCells[i];
			var oldHTML = tdCell.innerHTML;
//			log("td = " + text,3);
			var oldTitle = tdCell.title;
			if (oldTitle.length > 0) {
				oldHTML = oldTitle;
				tdCell.innerHTML = oldHTML;
			} else {
				oldTitle = tdCell.textContent;
			}
			if ((oldHTML.length >= myWidth) && (oldHTML.search("<")<0)) {
				tdCell.title = oldTitle;
				var newHTML = oldHTML.substr(0,myWidth) + ' ... <span style="display:none">' 
				+ oldHTML.substr(myWidth) + '</span>';
				if (tdCell.title.search(/https?:/i) >=0 ) {
					newHTML = '<a href="' + tdCell.title + '">' + newHTML + '</a>';
				}
				tdCell.innerHTML = newHTML;
			}
		}
	}

(function(){
	function log(s,level){
		//unsafeWindow.console.log(s);
		if ((level==null)||(level<4)) {
			GM_log(s);
		}
	}


	function addElementAfter(node,tag,id,htm)
	{
		var ne = document.createElement(tag);
		if(id) ne.id = id;
		if(htm) ne.innerHTML = htm;
		node.parentNode.insertBefore(ne,node.nextSibling);
	}	

	function addElementInFirst(node,tag,id,htm)
	{
		var ne = document.createElement(tag);
		if(id) ne.id = id;
		if(htm) ne.innerHTML = htm;
		node.parentNode.insertBefore(ne,node.firstChild);
	}	
	
	window.addEventListener("load", function(){
		log("window loading, initilize");
		initializeComponent();
	}, false);

	function initializeComponent(){
		var qTable_ID = "#goog-ws-list-table";
		var qCtrl_ID = "#sites-list-controls";	// "#sites-canvas-main-content"; 
		var TableDOM = document.querySelector(qTable_ID);
		var CtrlDOM = document.querySelector(qCtrl_ID);
		log("fatch table");
		if(TableDOM == null){
			log("pending 1");
			setTimeout(initializeComponent, 1000);
			return;
		}
		
		if(CtrlDOM == null){
			log("pending 2");
			setTimeout(initializeComponent, 1000);
			return;
		}
//		log(, 3);
		log(CtrlDOM.innerHTML);
//		log(CtrlDOM.getElementsByTagName("td")[0].innerHTML);

	    var myscript = document.createElement("script");
		myscript.textContent = myCompact.toString();
		document.body.appendChild(myscript);
		log("Script Added");
		
		myHTML = 
		'&nbsp;&nbsp; -- &nbsp;&nbsp;<input type="button" id="Compact" name="Compact" value="Compact" onClick="myCompact();" />' 
		+ '&nbsp;&nbsp;<input type="text" id="myWidth" name="myWidth" value="50" size=10 maxlength=4">'
		addElementAfter(CtrlDOM, 'div', 'my-list-controls', myHTML);
		
	}
})();


