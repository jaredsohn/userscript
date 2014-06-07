// ==UserScript==
// @name           Drop & Spoil filter
// @version        1.0.1
// @date           2012-04-21
// @author         Kaerol
// @namespace      http://userscripts.org/
// @description    Adds a panel which helps find mobs with specyfic level.
// @include        http://lineage.pmfun.com/*
// ==/UserScript==


(function(){

	var eventSource= (navigator.appName.indexOf== 'Opera') ? document : window;
	eventSource.addEventListener( 'load', function( e ) {  onLoad();  } ,false);

	var loc=window.location.href;

	var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
	var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;	
	
	var dragElem = null;
	var elementBeginX = 0;
	var elementBeginY = 0;
	var mouseBeginX = 0;
	var mouseBeginY = 0;		

	function dummy(){}	
	
	function onLoad(){
		
		var panel = addDiv('panel', 'Monster filter');
		if (panel != null){			
			addHR(panel);
			addBR(panel);
			
			addSelect('more', [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95], 0, panel, 'Strength then (lvl):&nbsp;&nbsp;');
			addBR(panel);
			addBR(panel);
			addSelect('less', [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95], 95, panel, 'Weakness then (lvl):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
			addBR(panel);
			addHR(panel);
			addBR(panel);
			addCheckbox('drop', panel, 'Drop');
			addBR(panel);
			addBR(panel);
			addCheckbox('spoil', panel, 'Spoil');
			addBR(panel);
			addHR(panel);
			addBR(panel);
			addButton('find', 'Run filter', panel);
		}
	}

	function addCheckbox(id, where, caption){
		var span = document.createElement('span');
		span.setAttribute('width', '100px');
		span.innerHTML = caption;
		addElement(span, where);		
		
		var input = document.createElement('input');
		input.setAttribute('id', id);
		input.setAttribute('type', 'checkbox');
		input.setAttribute('checked', 'true');
		addElement(input, where);		
	}
	
	function addSelect(id, opt, selectedValue, where, caption){
		var span = document.createElement('div');
		span.style.width = '300px';
		span.style.cssFloat  = 'left';
		span.innerHTML = caption;
		addElement(span, where);		
		
		var select = document.createElement('select');
		select.setAttribute('id', id);
		select.style.width = '50px';
		select.style.position = 'inherit';
		select.style.right = '30px';
		
		var o = null;
		for (var i=0; i < opt.length; i++){
			o = document.createElement('option');
			o.setAttribute('value', opt[i]);
			if (opt[i] == selectedValue) o.setAttribute('selected', "true");
			o.innerHTML = opt[i];
			addElement(o, select);
		};
		addElement(select, where);		
	}
	
	function addButton(id, name, where){
		var div = document.createElement('div');
		div.style.width = '100%';
		div.style.textAlign = 'center';
		
		var btn = document.createElement('input');
		btn.setAttribute('id', id);
		btn.setAttribute('type', 'button');
		btn.setAttribute('value', name);
		btn.style.width = '100px';
		btn.addEventListener("click",  function(){
								findMobs();
							}, 0);
		
		addElement(btn, div);		
		addElement(div, where);		
	};
	
	function addBR(where){
		var br = document.createElement('br');
		addElement(br, where);	
	}
	
	function addHR(where){
		var hr = document.createElement('hr');
		addElement(hr, where);	
	}
	
	function addDiv(id, inner){
		var cookie = getFromCookie(id);
		if (cookie != ""){
			var posXY = cookie.toString().split(':');
			leftPos = posXY[0];
			topPos = posXY[1];
		}else{
			leftPos = 20;
			topPos = 20;			
		}
		
		var div = document.createElement('div');
		div.setAttribute('id', id);
		div.style.left = leftPos+'px';
		div.style.top = topPos+'px';
		div.style.width = '96%';
		//div.style.width = '200px';
		//div.style.height = '100px';
		div.style.padding = '15px';
		//div.style.position = 'absolute';
		div.style.border = '2px solid #d2d2d2';
		div.style.backgroundColor = '#000000';		
		div.addEventListener("mousedown",  function(e){
								mousedown(e, this);
							}, 0);
		div.addEventListener("mouseup",  function(){
								mouseup(this);
							}, 0);
		div.addEventListener( 'mousemove', function( e ){ 
								getMouseXY(e);  
							} ,false);
		
		var title = document.createElement('div');
		title.style.fontSize = '14px';
		title.style.fontWeight = 'bold';
		title.style.width = '100%';
		title.style.textAlign = 'center';
		title.innerHTML = inner;
		
		addElement(title, div);
		
		var parents = find("/html/body/table/tbody/tr/td[2]/table[2]/tbody/tr[3]/td[2]", XPList);
		if (parents != null){
			var parent = parents.snapshotItem(0);
			var childs = find("/html/body/table/tbody/tr/td[2]/table[2]/tbody/tr[3]/td[2]/div", XPList);
			
			if (childs != null){
				var child = childs.snapshotItem(0);
				return parent.insertBefore(div, child);
			}
		}
		return null;
		//addElement(div, parent);
	}
	
	function getMouseXY(e)
	{
		if (dragElem){
			var shiftX = e.clientX - mouseBeginX;
			var shiftY = e.clientY - mouseBeginY;
			
			dragElem.style.top = (elementBeginY+shiftY)+'px';
			dragElem.style.left = (elementBeginX+shiftX)+'px';
		}
	}
	
	function mouseup(obj)
	{
		dragElem=null;
		saveToCookie(obj.id, obj.offsetLeft+":"+obj.offsetTop);
		elementBeginX = 0;
		elementBeginY = 0;
		mouseBeginX = 0;
		mouseBeginY = 0;			
	}
	
	function mousedown(e, obj)
	{
		dragElem=obj;
		mouseBeginX = e.clientX;
		mouseBeginY = e.clientY;
		elementBeginX = obj.offsetLeft;
		elementBeginY = obj.offsetTop;		
	}
	
	function addColgroup(table)
	{
		var cg = document.createElement('colgroup');
		var cl1 = document.createElement('col');
		cl1.setAttribute('width', '612px');
		addElement(cl1, cg);
		var cl2 = document.createElement('col');
		cl2.setAttribute('width', '154px');
		addElement(cl2, cg);
		var cl3 = document.createElement('col');
		cl3.setAttribute('width', '112px');
		addElement(cl3, cg);
		table.insertBefore(cg, table.tbody);
	}
	
	function findMobs(){
		var more = parseInt(returnObjById('more').value);
		var less = parseInt(returnObjById('less').value);		
		
		var drop = returnObjById('drop').checked;		
		var spoil = returnObjById('spoil').checked;		
		
		if (more > less) {
			alert("zly zakres: "+more+">"+less);
		}else{			
			var tables = find("//table[@class='show_list' and @cellpadding='5']", XPList);
			var table = tables.snapshotItem(0);
			//addColgroup(table);
			var col = null;
			var row = null;
			var lvl = "";
			var conf = false;
			var isDropList = false;
			var isSpoilList = false;
			
			for (var i=0; i < table.rows.length; i++)
			{
				row = table.rows[i];
				if (row.cells[0].innerHTML.indexOf('Drop') > -1){
					isDropList = true;
					isSpoilList = false;
					continue;
				};				
				if (row.cells[0].innerHTML.indexOf('Spoil') > -1){
					isDropList = false;
					isSpoilList = true;
					continue;
				};
				if (!drop && isDropList){	
					row.style.display = 'none';
					continue;
				};
				if (!spoil && isSpoilList){	
					row.style.display = 'none';
					continue;
				};
				
				col = row.cells[0];
				lvl = col.textContent.match(/[0-9]+/);
				lvl = parseInt(lvl);
				if (!conf){
					//conf = confirm(row.cells[0].innerHTML);
				};
				
				if (!isNaN(lvl)){
					if (lvl >= more && lvl <= less){
						row.style.display = '';
					}else{
						row.style.display = 'none';
					};
				};
			};
		};
	};
	
	function find(xpath, xpres, startnode){
		if (!startnode) {startnode=document;}
		var ret = document.evaluate(xpath, startnode, null, xpres, null);
		return  xpres == XPFirst ? ret.singleNodeValue : ret;
	}	
	
	function returnObjById( id ){
		if (document.getElementById)
			return document.getElementById(id);
		else if (document.all)
			return document.all[id];
		else if (document.layers)
			return document.layers[id];
	}

	function addElement(theElement, where) {
		if(!where) {
			where=document.getElementsByTagName('body')[0];
		};
		where.appendChild(theElement);
	}
	
	function getFromCookie(cookieName){
		var res = new Array();
		var a = readCookie(cookieName);
		if (a != null && a != ''){
			a = a.split("$$");
			for (var i = 0; i < a.length; i++) res[i] = a[i].split("$");
		}
		return res;
	};	
	
	function saveToCookie(cookie, values){
		createCookie(cookie, values);
	};

	function readCookie(name){		
		return decodeURIComponent(GM_getValue(name, ""));
	};	

	function createCookie(name, value, callback){
		if  (callback==undefined)  {
		   callback=dummy;
		}
		GM_setValue(name, encodeURIComponent(value));
	};

})();
