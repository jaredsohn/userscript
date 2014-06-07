// ===UserScript===
// @name            IkkoUrbanDeadItemSorter
// @description	    Sorts the items in Urban Dead. I'm working on making it do the actions in a nice compact space as well.
// @namespace       Ikko
// @include         http://*urbandead.com/map.cgi*
// ===/UserScript===
	var dropform;
	var tblItems = document.createElement("TABLE");
	var tblMain = document.createElement("TABLE");
	var tblActions = document.createElement("TABLE");
	var actInOut;
	var actBar;
	var actSpeak;
	var actAttack;
	var actSearch;
	var actGraf;
	var actDrop;
	var itemCount = 0;
	function appendText(n,s) {
		n.appendChild(document.createTextNode(s));
	}
	function stripClass(form) {
		form.className = "";
		for (var i=0;i<form.elements.length;i++)form.elements[i].className = "";
		return form;
	}
	function item(name, id, ammoID, type) {
		this.ammoID = ammoID;
		this.name = name;
		this.id = id;
		this.itemType = type;
		var ammo = new Array();
		var count = 0;
		var baseForm;
		this.addItem = function (useform) {
			var s = new String()
			s = useform.action.split("-");
			s = s[s.length-1]
			if (s == id) {
				if (!baseForm) {
					baseForm = useform;
					stripClass(baseForm);
				}
				else useform.style.display = "none";
				
				count++;
				if (useform.childNodes.length == 2 && /\([0-9]\)/.test(useform.childNodes[1].nodeValue)) {
					ammo[ammo.length] = '(' + /[0-9]/.exec(useform.childNodes[1].nodeValue) + ')';
				}
				return true;
			}
			return false;
		}
		this.addRow = function() {
			if (count>0) {
				var row = tblItems.insertRow(tblItems.rows.length);
				var cell = row.insertCell(0);
				appendText(cell,count);
				cell = row.insertCell(1);
				cell.appendChild(baseForm);
				if (ammo.length>0) for (var i = 0;i<ammo.length;i++) appendText(baseForm,ammo[i]);
			}
		}
	}
	//Item type
	//0 = firearm
	//1 = melee weapon
	//2 = science tool
	//3 = ammo
	//4 = misc
	var items = new Array();
	items.getItemsByType = function(type) {
		var ret = new Array(0)
		var i = 0;
		for (var j = 0;j<items.length;j++) {
			if (items[j].itemType == type)ret[i++] = items[j];
		}
		return ret;
	}
	items.getItemByID = function(id) {
		for (var j = 0;j<items.length;j++) {
			if (items[j].id == id)return items[j];
		}
		return false;
	}
	items.getItemByName = function(name) {
		for (var j = 0;j<items.length;j++) {
			if (items[j].name == name)return items[j];
		}
		return false;
	}

	items[items.length] = new item("pistol","b","k",0,0);
	items[items.length] = new item("shotgun","s","r",0,0);
	items[items.length] = new item("first-aid kit","h",null,2,0);
	items[items.length] = new item("DNA extractor","w",null,2,0);
	items[items.length] = new item("GPS unit","a",null,2,0);
	items[items.length] = new item("pair of wirecutters","q",null,4,0);
	items[items.length] = new item("flack jacket","f",null,4,0);
	items[items.length] = new item("newspaper","n",null,4,0);
	items[items.length] = new item("fire axe","o",null,1,0);
	items[items.length] = new item("shotgun shell","r",null,3,0);
	items[items.length] = new item("pistol clip","k",null,3,0);
	items[items.length] = new item("flare gun","c",null,0,0);
	items[items.length] = new item("fuel can","i",null,4,0);
	items[items.length] = new item("spray can","x",null,4,0);
	items[items.length] = new item("DNA extractor","w",null,2,0);
	items[items.length] = new item("revivification syringe","v",null,2,0);
	
	function initSorter() {
		//return;
		initAppear();
		populateActions();
		buildActionTable();
		populateItems();
		buildItemTable();
	}
	function initAppear() {
		document.forms[9].parentNode.childNodes[3].style.display = "none";
		document.forms[9].parentNode.insertBefore(tblMain,document.forms[9].parentNode.childNodes[3]);
		tblMain.cellPadding = 0;
		tblMain.border = 1;
		tblMain.className = "ikkotable";
		tblMain.width = "100%";
		var row = tblMain.insertRow(0);
		row.insertCell(0).appendChild(tblActions);
		tblActions.cellPadding = 0;
		tblActions.className = "ikkotable";
		tblMain.width = "100%";
		row.insertCell(1).appendChild(tblItems);
		tblItems.cellPadding = 0;
		tblItems.className = "ikkotable";
		tblItems.width = "100%";
		document.styleSheets.item(0).insertRule(".ikkotable INPUT {height:100%;color: white; background-color:black;border-style:none;}",0);
		document.styleSheets.item(0).insertRule(".ikkotable FORM {border-style:none;}",0);
		document.styleSheets.item(0).insertRule(".ikkosay INPUT[type=text] {width = 80%}",0);
		document.styleSheets.item(0).insertRule(".ikkotable * {white-space: nowrap;margin: 0; padding: 0; }",0);
		document.styleSheets.item(0).insertRule(".ikkotable CAPTION {text-align: left; }",0);
		document.styleSheets.item(0).insertRule(".ikkotable TD {text-align: left;vertical-align: top;}",0);
		document.styleSheets.item(0).insertRule(".ikkotitlerow {font-weight:bolder;background-color:grey; color: black}",0);
	}
	function populateActions() {
		/*Identify Actions
		var actInOut;
		var actBar;
		var actSpeak;
		var actAttack;
		var actSearch;
		var actGraf;
		var actDrop;
		*/
		var i;
		for (i=0;i<document.forms.length;i++) {
			switch (document.forms[i].action) {
				case "map.cgi?out" :
					actInOut = document.forms[i];
					break;	
				case "map.cgi?in" :
					actInOut = document.forms[i];
					break;
				case "map.cgi?search" :
					actSearch = document.forms[i];
					break;
				case "map.cgi?barricade" :
					actBar = document.forms[i];
					break;
				case "map.cgi" :
					if (document.forms[i].elements[0].name == "speech")actSpeak = document.forms[i];
					if (document.forms[i].elements[0].name == "graffiti")actGraf = document.forms[i];
					if (document.forms[i].elements[0].value == "Attack")actAttack = document.forms[i];
					if (document.forms[i].elements[0].value == "Drop")actDrop = document.forms[i];
					break;
			}
		}
	}
	function buildActionTable() {
		appendText(tblActions.createCaption(),"Possible actions:");
		/*Format Actions
		var actInOut;
		var actBar;
		var actSpeak;
		var actAttack;
		var actSearch;
		var actGraf;
		var actDrop;
		*/
		var i = 0;
		if (actSearch) {
			tblActions.insertRow(i++).insertCell(0).appendChild(stripClass(actSearch));
		}
		if (actInOut) {
			tblActions.insertRow(i++).insertCell(0).appendChild(stripClass(actInOut));
		}
		if (actBar) {
			tblActions.insertRow(i++).insertCell(0).appendChild(stripClass(actBar));
		}
		if (actSpeak) {
			tblActions.insertRow(i++).insertCell(0).appendChild(stripClass(actSpeak));
			actSpeak.className = "ikkosay";
		}
		if (actGraf) {
			tblActions.insertRow(i++).insertCell(0).appendChild(stripClass(actGraf));
			actGraf.className = "ikkosay";
		}
		if (actAttack) {
			tblActions.insertRow(i++).insertCell(0).appendChild(stripClass(actAttack));
		}
		if (actDrop) {
			tblActions.insertRow(i++).insertCell(0).appendChild(stripClass(actDrop));
		}
	}
	function populateItems() {
		var frmuse = new Array();
		for (var i=0;i<document.forms.length;i++)if (/use-[a-z]/.test(document.forms[i].action)) frmuse.push(document.forms[i]);
		if (frmuse.length == 0) return;
		frmuse[0].previousSibling.previousSibling.style.display = "none";
		//frmuse[0].parentNode.insertBefore(tblItems,frmuse[0]);
		itemCount = frmuse.length;
		while (frmuse.length>0) {
			var i = 0;
			var cur = frmuse.pop();
			while (i<items.length && !items[i].addItem(cur)) i++;
		}
	}
	function buildItemTable() {
		var i = 0
		appendText(tblItems.createCaption(),"Inventory (click to use):");
		//Add the rows to the table.	
		addTableSection("Fire Arms",0);
		addTableSection("Melee Weapons",1);
		addTableSection("Science Tools",2);
		addTableSection("Ammo",3);
		addTableSection("Misc Tools",4);
		appendText(tblItems.createTFoot(),itemCount + " Items");
	}	
	function addTableSection(title,ind) {
		var row = tblItems.insertRow(tblItems.rows.length);
		var cell = row.insertCell(0)
		cell.width = 20;
		var it = items.getItemsByType(ind);
		cell = row.insertCell(1)
		row.className = "ikkotitlerow";
		appendText(cell,title);
		for (i=0;i<it.length;i++)it[i].addRow();	
	}

//window.addEventListener("load", initSorter(), false);//.user.js