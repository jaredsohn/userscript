// ==UserScript==
// @name           Favorite shows
// @version        2.1.2
// @date           2013-01-14
// @author         Kaerol
// @namespace      KR
// @description    Adds plus next to TV shows name, allows to add to favorite list. Adds also a checkboxes to hide/show TV shows by status.
// @include        http://eztv.it/*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// ==/UserScript==

(function(){
	var IMDBIMG = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAPABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABQP/xAAkEAABBAEEAgIDAAAAAAAAAAABAgMEEQUGEhMhAAcUIkJRYv/EABUBAQEAAAAAAAAAAAAAAAAAAAUH/8QAIBEBAAADCQAAAAAAAAAAAAAAAQADEQIEBSEiMUGRof/aAAwDAQACEQMRAD8ANy/v/EYiO407odhbjcNbkfdLBL60S1xygnh6Oxtbu7+dtd34iPcGIGTELNadj4mK666lMxt/lCGUGWguKSGwQrfEI2i+lg31RKk6B9dToIEjJ5dDrjagr7glsrMhSgDxUe5S+6/FH6Nxy2h9GyWpS0ZzNrdc5SilNjYhz5BW0m2qCSZLvZBIsURXkpLvhKUJdseXV2Z0hsZ+9TyP/9k=";
	var addIMG = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD//gATQ3JlYXRlZCB3aXRoIEdJTVD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAKAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABwAD/8QAIRAAAQQABwEBAAAAAAAAAAAAAgEDBBEABQYSEyExBxT/xAAVAQEBAAAAAAAAAAAAAAAAAAAEBf/EAB8RAAIABgMBAAAAAAAAAAAAAAECAAMRIVFhBEFx8P/aAAwDAQACEQMRAD8AUNYak1rH+jZDGjaZfFoXZox44ZsAhmYIHRkngbUo0Q79pO8J2XuyH4Ed6XF/JJcaEnmORD4jVEUg3J0VLaWntYnocN+XHlvRWHJMbdwPG2im1uSi2kvY2nS17jfCOPLZHmEsTU90wMD728R5KMruSxN9YGo//9k=";
	var minusIMG = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD//gATQ3JlYXRlZCB3aXRoIEdJTVD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAKAAoDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAQGB//EACIQAAEEAgEEAwAAAAAAAAAAAAECAwQRAAUTBhIUMQcVIf/EABUBAQEAAAAAAAAAAAAAAAAAAAIE/8QAHhEAAgEEAwEAAAAAAAAAAAAAAQIDAAQRcRJBkcH/2gAMAwEAAhEDEQA/ANv2XUnX7GxksQ/jXzIzby0MyPvGG+ZAJCV9pFpsUaPq8rta7Jf10Z+ZE8OS4yhb0fkDnCsgFSO4fiqNix7rGMMujjZCSXJ3j4BRuruKZFVIFQjtS+Tvk7DwCv/Z";
	var expandIMG = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAKAAoDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAUHCP/EACEQAAICAgMAAgMAAAAAAAAAAAECAwQFBgAHEhEhMVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAABQj/xAAeEQACAQMFAAAAAAAAAAAAAAABAgMAITEVIiNxsf/aAAwDAQACEQMRAD8ASa8lGe/rlO7oy5Z8rjGv3cpairzy2JmNdnmLyS+yoad/foeiSvgEA8nGxb1vOC2DI4TD7ttFLG4+3LVqVocxYVIYY3Koij39AKAAP5w7NzWYwXZm14fCZa/jMbUzl6KtUp2HhhhQWJPhURSFUD9Ac2x1J1119e6p1C7d0XV7Nqxg6Us002Jgd5HaBCzMxX5JJJJJ/PKEgbT3kln5QxspwvWfKJO8AC1f/9k=";
	var collapseIMG = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAKAAoDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAQHCP/EACMQAAEEAgICAgMAAAAAAAAAAAECAwQFBgcAERMhEiIxUWH/xAAVAQEBAAAAAAAAAAAAAAAAAAAFCP/EAB4RAAEEAQUAAAAAAAAAAAAAAAEAAgMhMQQREyJx/9oADAMBAAIRAxEAPwBXFq+tl1VS7PwJ63fnR2ZEu3kIiPeZ15KXHHVqdd8yvstRPaSfR6BHXJPkWdZzRZBY0lPm2UQq2vluxYkZm4kJQyy2spQhI+foBIAA/nDZt1cUWzMrp6S2n1lbEvJzUaJDkLZZZQJDnSUISQlIH6A5tjUmutfTtU4hNm4Li8mVIo4Trzz1Swtbi1MIKlKUU9kkkkk/nlCwuGge+WccocaBwMmqPiJPfYCl/9k=";
	var magnifiyIMG = 	'data:image/gif;base64,R0lGODlhGAAYAOfYAAEBAQICAgMDAwUFBQYGBg0NDQ4ODg8PDxAQEBERERISEhkZGRoaGh4eHiEhISUlJSYmJSYmJiYnJycnKCcoKCwsLC0sLC0uLi8vMC8vMS8wMTAwMRIzbzAxMjExMhE4ehQ6dxM/gRQ/gSw8WTo7PRVAgT09PRhHhxxHhSFGgkNERS1GekVGRxxOjxxPjzxNbSZSjlBOSR9WlidYlVJSUh5anCJdnSNdnSNdnldXVypem1lZWU5acDxdizZek1xaViVjpFtbWyVkpCZkpFtdXF1dXV9dWUZfk2BeWSRoqklgji9moydpq2JiYilsrGNjY2RkZGRkZTNsqGZmZlJpi2Vna0FspD9tojNyr2drallti0xvoD91rW1ubnBuaW9vb0N2rFB0n29xcHFxcXNxbXN0dUR8tXd2cnR3fWF5o3h4eHd4e3h5eXt5dXh6e3p6e1eAsX17d1mCsn19fX19fn9+en9/f39/gXuAg4GAfX+Bg2OGsoCDiIKDhIKDhYODhoOEhmqKtoWHiIaHh4aHiFiPxIiIiGyMtnSLr4iJi26NtouLjI6LiHuOsI6NiY2NjY2Njo6Pj3yTq5GQjY+Qk3iUtJCRkZGSlJGTlnuWunyXu5WUk5SUl4CYu3+ZvGyezJeXmp6bl5ydoHWkz4ugwZ+emoygv5yfoo2iwZ+goo6jwqGhoqGio6OjoaSjn6KkpqOkpqakoaWmpqiopaqopKqopaqopp6uyZ6vybGuqqCwyrCytZa31py30LW0sba0sKe2zrK2uK25z7C70by7uru9vrO+07XA1MPBvcLBwMPL09DOzdDQz9PS0dbU0dvb2Nvb2d/f3uPj4uvr6/Pz8/b19fz8/P7+/v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEKAP8ALAAAAAAYABgAQAj+AP8JHEhslqyBCBMOvOZqhTBTKE60kHFjiJNRbeoo3MjxnwlBhN5AiYCAgAAAAqtVaQRMlaZAcJYAwVLsR0eE0FZp6eEjjKRYZywwQDDgplGBGxKJgmXJkJogDAROW8aHyhYrVyoFiyPGKLZNSo7hIqVoBkWLnxgRuWmtD4cPJSTKwCHETC4kR296gNKkwoIDRfMmJEEJ1CM7X4o4MCBAsMALbgD5ubMGA8JozH61OkUrVB48eak944EIladDcsBIUUYmi1FkL4bpQpVpjw4bQ5jwMnITm54jxm51gjGxopNCtmLcdDYiTQoRJ1ycTdLLplFpaECEiC6jBpddXiBNCG6WzFetUo4mLchBw0ECk44HSigzpsuOBwoGBIh/4Q+nRXNMUQEDBZzkGAuXsBLJIGw84cAB8amAySupQEJHFA3E9w8FGnSQwQQCBQQAOw==';

	var styles = ''+
	'img.image, a.downloads, a.moveTop {\n'+
	'cursor: pointer;\n'+
	'}'+
	'.floatRight {'+
	'float: right;\n'+
	'}'+
	'div.storediv {'+
	'border-bottom: 1px solid #d2d2d2;\n'+
	'}'+
	'tr.marked {'+
	'background-color: #17ba60;\n'+
	'}'+
	'tr.showForce {'+
	'display: table-row !important;\n'+
	'}'+
	'div.floatDiv {'+
    'border: 3px solid #FF0000;'+
    'padding: 20px;'+
    'position: fixed;'+
    'right: 0;'+
    'top: 50%;'+
    'width: 100px;'+
    'text-align: center;'+
    'background-color: #AAFF00;'+
	'}';
	
	var groups = ["Airing", "On break", "Ended", "Pending"];
	var turnOff = ["On break", "Ended", "Pending"];

	var serialData = new Array();
	var filterData = new Array();
	var filterDataKeys = new Array();
	var req = null;

	function dummy(){}
	
	function addFacebookScript()
	{
		var scr = document.createElement("script");
		scr.setAttribute("src", "http://static.ak.connect.facebook.com/js/api_lib/v0.4/FeatureLoader.js.php/pl_PL");
		scr.setAttribute("type", "text/javascript");
		var body = document.getElementsByTagName('body')[0];
		body.appendChild(scr);
	}
	
	function showScriptInfo()
	{
		var script_info = readCookie("eztv_filter_script_info");
		if (script_info != "1") window.alert("Script only works fine on 'Show List' tab. \n\nThis message will display only once.");
		createCookie("eztv_filter_script_info", "1");
	}

	function addFilters()
	{
		addFacebookScript();
	
		showScriptInfo();

		var url = top.window.location.href;
		if (url.indexOf('/showlist/') == -1) return;

		addGlobalStyle(styles);

		var table = findTable();

		if (table)
		{
			addIconsToRows(table);
			prepareCheckboxFilter(table);
			createTableFilter(table);
			addFilterToTable(table);

			var storedList = readCookie("eztv_filter");
			var link = "";
			var divId = "";

			if (storedList != ""){
				linksArr = storedList.split("$$");

				for (var i=0; i <linksArr.length; i++)
				{
					var link = linksArr[i].split("!");
					
					if (link.length > 0 && link[0] == "undefined") 
						continue;
					
					divId = "cell_img_"+i;
					
					createDetailedDiv(divId);
					//alert(i);
					addObjToStoreList(i, link[0], link[1], findActualSerialStatus(link[1]), "", "");
				}
				//loadXMLDoc(linksArr, 0);
			}
		}
		var td = findElement("//td[@class='section_post_header']")
		if (td != null){
			var label  = document.createElement("span");
			label.innerHTML = "Search:&nbsp;&nbsp;";
			
			var inputSearch = document.createElement("input");
			inputSearch.setAttribute("id", "inputSearch");
			inputSearch.setAttribute("type", "text");
			inputSearch.addEventListener("KeyDown", function(){ moveToSearchTitleKey(event, this);}, true);
			
			var image = document.createElement("img");
			image.setAttribute("src", magnifiyIMG);
			image.setAttribute("class", "image");
			image.addEventListener("click", function(){ moveToSearchTitle(this);}, true);
						
			var info  = document.createElement("span");
			info.innerHTML = " (enter phrase and click on search icon)";
			
			td.appendChild(label);
			td.appendChild(inputSearch);
			td.appendChild(image);
			td.appendChild(info);
		}
		
		floatDiv = createDiv("floatDiv", "", "");
		floatDiv.setAttribute("class", "floatDiv");
		floatDiv.addEventListener("click", function(){ moveWindowTop(this);}, true);
		
		moveTop = document.createElement("a");
		moveTop.innerHTML = "(Move Top)";
		moveTop.setAttribute("class", "moveTop");
		moveTop.addEventListener("click", function(){ moveWindowTop(this);}, true);
		
		floatDiv.appendChild(moveTop);
		
		var body = document.getElementsByTagName('body')[0];
		body.appendChild(floatDiv);
	}

	function moveToSearchTitleKey(e, obj) {
			//alert(obj.value);
		var ev = (window.event)?event:e;
		var key = (window.event)?event.keyCode:e.keyCode;
		if (obj.keyCode = "13")
		{
			alert(obj.value);
		}
	}
		
	function moveToSearchTitle(img) {
		var table = findTable();

		var rows = table.rows;
		var rowsL = rows.length;
		var row = null;
		var cell = null;
		var inner = "";
		var cellID = 1;

		var input = get("inputSearch");
		
		if (table && input && clearHTMLTags(input.value) != ""){
			for (var i=3; i < rowsL; i++)
			{
				row = rows[i];
				cell = row.cells[0];
				inner = clearHTMLTags(cell.innerHTML);

				if (inner.toUpperCase().indexOf(input.value.toUpperCase()) > -1){
					row.className += " marked showForce";
					window.scrollTo(0, findPosY(row,0));
				}else{
					row.className = row.className.replace(" marked showForce", "");
				}
			}
		}
	}
	
	function findPosY(obj, currOffTop)
	{
		if (obj.offsetParent) {
			return currOffTop + findPosY(obj.offsetParent, obj.offsetTop);
		}
		return currOffTop;
	}

	function createDetailedDiv(divId) {
		var div = get("filter");		
		var divRow = get(divId+"_storediv");
		
		if (divRow == null && div != null){
			divRow = createDiv(divId+"_storediv", "", "");
			divRow.setAttribute("style","height: 40px;");//"cell_img_2		
			
			div.appendChild(divRow);
		} 
	}
	
	function pausecomp(ms) {
		ms += new Date().getTime();
		while (new Date() < ms){}
	} 
	
	function loadXMLDoc(linksArr, index) {
		var link = linksArr[index].split("!");
		
		if (link.length > 0 && link[0] == "undefined") {
			loadXMLDoc(linksArr, ++index);
			return;
		};
		
		GM_xmlhttpRequest({
			method: 'POST',
			url: link[0],
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function(resp){
				processReqChange(resp, linksArr, index);
			}
		});
	}

	function processReqChange(req, hyperlinkId) {		
		if (req.readyState == 4) {						
			if (req.status == 200) {
				try
				{	
					var reqTxt = req.responseText;
					var matches = reqTxt.match(/(<div id="tooltip" class="ajaxtooltip"><\/div>[\s\S]*)(<table.*class="forum_header_noborder")([\s\S]*?<\/table>)/g);
					var a8 = "";
					var a9 = "";

					if (matches.length > 0)
					{
						for (i =0; i<matches.length;i++){
							//alert(matches[i]);
							matchesTR = matches[i].match(/(<tr[\s\S]*?tr>)/g);
							for (j =0; j<matchesTR.length;j++){
								matchesTD = matches[i].match(/(<td[\s\S]*?td>)/g);
								//(?<=>)([\s\S]*?</a>)
								for (k =0; k<matchesTD.length;k++){
									if (k==8){
										a8 = matchesTD[k].match(/(<a[\s\S]*?<\/a>)/g);
									}
									if (k==9)
									{
										a9 = matchesTD[k].replace(/(<[\s\S]*>)([\s\S]*)(<\/[\s\S]*>)/g, "$2");									
									}
								}
								
								obj = get(hyperlinkId+"Span");
								
								if (obj != null){
									obj.innerHTML = a8.join("");
								}
								
								//alert(a8+":"+a9);
								/*
								if (a8 != "" || a9 != ""){
									addObjToStoreList(index, link[0], link[1], findActualSerialStatus(link[1]), a8.join(""), a9);
									loadXMLDoc(linksArr, ++index);
								}
								*/
							}
						}
					}
				}catch(err)
				{
				//Handle errors here
				}
				/*
			}else{
				addObjToStoreList(index, link[0], link[1], findActualSerialStatus(link[1]), "", "");
				loadXMLDoc(linksArr, ++index);				
				*/
			}
		}
	}
	
	function findActualSerialStatus(serialName)
	{
		return serialData[serialName][1];
	}

	function findElement(ex)
	{
		var tag = document.evaluate
		(
		ex,
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
		);
		if (tag.snapshotLength)
		{
			var item = null;
			for(var i=1; i<=tag.snapshotLength; i++)
			{
				item = tag.snapshotItem(i-1);
			}
		}

		return item;
	}
	
	function findTable()
	{
		var ex = "//table[@width='950'][@cellspacing='0'][@cellpadding='0'][@align='center']";
		return findElement(ex);
	}
	
	function get(id){
		return document.getElementById(id);
	}
	function saveToCookie(cookie, values){
		var a = readCookie(cookie);
		if (a != null && a != "") a += "$$" + values;
		else a = values;
		createCookie(cookie, a);
	}
	function createCookie(name, value, callback){
		if  (callback==undefined){
			callback = dummy;
		}
		GM_setValue(name, encodeURIComponent(value));
	}
	function readCookie(name){
		return decodeURIComponent(GM_getValue(name, ""));
	}
	function removeFromCookie(cookie, imgObj){
		if (confirm("Are you sure?"))
		{
			var a = readCookie(cookie);

			if (a != null){
				var hyperlink = get(imgObj.id+"A");
				a = a.split("$$");
				var i = 0;
				while (a[i].indexOf(hyperlink.href)<0) i++;
				a.splice(i, 1);
				a = a.join("$$");
				createCookie(cookie, a);
				removeElement(imgObj.id);
			};
		};
	}
	function removeElement(id)
	{
		var main = get("filter");
		
		//alert(id.substring(0, id.length-6));
		
		var child = get(id.substring(0, id.length-6));//cell_img_10_storediv
		//cell_img_246225343_storediv_store

		if (main && child) main.removeChild(child);
	}
	function getMousePosition(e)
	{
		return e.pageX ? {'x':e.pageX, 'y':e.pageY} : {'x':e.clientX + document.documentElement.scrollLeft + document.body.scrollLeft, 'y':e.clientY + document.documentElement.scrollTop + document.body.scrollTop};
	}
	function openIMDBWebSite(imgObj)
	{
		var cell = get(imgObj.id.replace("imdb_", ""));
		var aLink = cell.childNodes[0];

		window.open("http://www.imdb.com/find?q="+(aLink.innerHTML.replace(/ /g, "+"))+"&s=all");
	}
	function addToStoreList(mousePos, imgObj)
	{
		var cell = get(imgObj.id.replace("img_", ""));
		var aLink = cell.childNodes[0];
		
		var cell2 = get(imgObj.id.replace("img_", ""));

		var today = new Date();
		var dd = today.getDate();
		var d = today.getDay()
		var h = today.getHours();
		var m = today.getMinutes();
		var s = today.getSeconds();

		createDetailedDiv("cell_img_"+dd+d+h+m+s);
		
		addObjToStoreList(""+dd+d+h+m+s+"", aLink.href, aLink.innerHTML, cell2.childNodes[0].innerHTML);
		
		saveToCookie("eztv_filter", aLink.href+"!"+aLink.innerHTML+"!"+cell2.childNodes[0].innerHTML);

		var div = get("hint");
		if (div == null){
			div = document.createElement("div");
			div.setAttribute("id", "hint");
			div.style.position = "absolute";
			div.style.backgroundColor = "#d2d2d2";
			div.style.border = "2px #121212 solid";
			//div.style.-moz-border-radius = "15px";
			div.style.padding = "10px";
			
			moveTop = document.createElement("a");
			moveTop.innerHTML = "(Move Top)";
			moveTop.setAttribute("class", "moveTop");
			moveTop.addEventListener("click", function(){ moveWindowTop(this);}, true);
		}
		div.style.top = mousePos.y+"px";
		div.style.left = (mousePos.x+50)+"px";
		div.style.display = "";
		div.innerHTML = "Added to the list: " + aLink.innerHTML;
		
		div.appendChild(moveTop);

		var timer = setTimeout("document.getElementById('hint').style.display = 'none';", 2000);

		var body = document.getElementsByTagName('body')[0];
		body.appendChild(div);
	}
	
	function moveWindowTop(obj){
		var body = document.getElementsByTagName('body')[0];
		if (body != null)
		{
			window.scrollTo(0, 0);
		}
	}

	function addObjToStoreList(index, href, innerHTML, desc, torrent, releaseOld)
	{	
		var divId = "cell_img_"+index+"_storediv";	
		
		var dataDiv = get(divId);
		dataDiv.setAttribute("class", "storediv");
		
		if (dataDiv != null){	
			dataDiv.innerHTML = "";
			divRowTop = createDiv(divId+"_storedivTop", "", "");
			
			var hyperlink = document.createElement("a");
			hyperlink.setAttribute("id", divId+"_storeA");//"cell_img_2
			hyperlink.href = href;
			hyperlink.innerHTML = innerHTML;

			var image = document.createElement("img");
			image.setAttribute("id", divId+"_store");//"cell_img_2
			image.setAttribute("src", minusIMG);
			image.setAttribute("class", "image");
			image.addEventListener("click", function(){removeFromCookie("eztv_filter", this);}, true);
			divRowTop.appendChild(image);
			divRowTop.appendChild(hyperlink);

			if (typeof(desc) != 'undefined'){
				var span = document.createElement("span");
				span.innerHTML = " ("+desc+")";
				divRowTop.appendChild(span);
			}
			
			divRowBottom = createDiv(divId+"_storedivBottom", "", "");
			divLikeIt = document.createElement("span");
			divLikeIt.setAttribute("class", "floatRight");
			likeIt = document.createElement("span");
			likeIt.setAttribute("id", divId+"_likeIt");
			likeIt.setAttribute("style","height: 20px;");//"cell_img_2	
			likeIt.innerHTML = "<div class=\"fb-like\" data-href=\""+href+"\" data-send=\"false\" data-layout=\"button_count\" data-width=\"150\" data-show-faces=\"false\" data-font=\"verdana\"></div>";				
			divLikeIt.appendChild(likeIt);
			divRowBottom.appendChild(divLikeIt);
			
			divDownloads = document.createElement("span");
			divDownloads.setAttribute("id", divId+"_storeTorrentSpan");//"cell_img_2
		//	divDownloads.setAttribute("class", "floatRight");
			
			var downloads = document.createElement("a");
			downloads.setAttribute("id", divId+"_storeTorrent");//"cell_img_2
			downloads.setAttribute("name", href);//"cell_img_2
			downloads.innerHTML = "(click to load downloads)";
			downloads.setAttribute("class", "downloads");
			downloads.addEventListener("click", function(){ getDownloads(this);}, true);
			divDownloads.appendChild(downloads);
			divRowBottom.appendChild(divDownloads);
			
			dataDiv.appendChild(divRowTop);
			dataDiv.appendChild(divRowBottom);			
			
			if (dataDiv != null && (typeof(desc) != 'undefined' || typeof(torrent) != 'undefined' || typeof(releaseOld) != 'undefined'))
			{
				var div = get("filter");		
				
				divRowBottom.appendChild(document.createElement("br"));
				div.appendChild(dataDiv);		
			}
		}
	};
	
	function getDownloads(hyperlink){	
		GM_xmlhttpRequest({
			method: 'POST',
			url: hyperlink.name,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function(resp){
				processReqChange(resp, hyperlink.id);
			}
		});
	}

	function arrayContains(array, value)
	{
		for (var i=0; i < array.length; i++)
		{
			if (value.indexOf(array[i]) > -1)
			{
				return true;
			};
		};
		return false;
	}

	function getGroupFromLabel(label, arr)
	{
		for (var i=0; i < arr.length; i++)
		{
			if (label.indexOf(arr[i]) > -1) return arr[i];
		}
		return null;
	}

	function isNewGroup(oldGr, newGr)
	{
		if (oldGr == "") return true;
		else if (oldGr != newGr) return true;
		else return false;
	}

	function createTableFilter(table)
	{
		var row = table.insertRow(0);
		var cell = row.insertCell(0);

		var chb = null;
		var span = null;
		var div = null;
		var input = null;

		filterDataKeys = filterDataKeys.sort();
		var group = "";
		var tempGroup = "";
		var display = "";
		var divimg = expandIMG;

		//	for (var k in filterData)
		for (var i=0; i < filterDataKeys.length; i++)
		{
			tempGroup = getGroupFromLabel(filterDataKeys[i], groups);

			if (isNewGroup(group, tempGroup)){
				group = tempGroup;
				display = "";
				divimg = collapseIMG;
				if (div != null) {
					cell.appendChild(div);
					cell.appendChild(document.createElement("br"));
				}

				if (arrayContains(turnOff, group)) {
					display = "none";
					divimg = expandIMG;
				}

				var image = document.createElement("img");
				image.setAttribute("id", "gr_"+group);
				image.setAttribute("src", divimg);
				image.setAttribute("class", "image");
				image.addEventListener("click", function(){
					expandCollapseList(this);
				}, 0);
				cell.appendChild(image);

				span = document.createElement("span");
				span.innerHTML = group;
				cell.appendChild(span);

				div = document.createElement("div");
				div.setAttribute("id", "gr_"+group+"_div");
				div.style.display = display;

				input = document.createElement("input");
				input.setAttribute("id", "gr_"+group+"_input");
				if (!filterData[filterDataKeys[i]][2]) {
					input.setAttribute("checked", "");
				}
				input.setAttribute("type", "checkbox");
				input.addEventListener("click", function(){
					markUnmarkAll(this);
				}, 0);
				div.appendChild(input);

				span = document.createElement("span");
				span.innerHTML = "Mark/Unmark All";
				div.appendChild(span);

				div.appendChild(document.createElement("br"));
			}

			chb = document.createElement("input");
			chb.setAttribute("id", "chb_"+filterData[filterDataKeys[i]][0]);
			chb.setAttribute("type", "checkbox");
			chb.addEventListener("click", function(){runFilterCheckbox(this);}, true);
			if (!filterData[filterDataKeys[i]][2]) {
				chb.setAttribute("checked", "");
			}
			
			div.appendChild(chb);
			span = document.createElement("span");
			span.setAttribute("id", "chb_"+filterData[filterDataKeys[i]][0]+"_label");
			span.innerHTML = filterDataKeys[i]+" ("+filterData[filterDataKeys[i]][1]+")";
			div.appendChild(span);
			div.appendChild(document.createElement("br"));

			if (filterData[filterDataKeys[i]][2]) {
				runFilter(filterDataKeys[i], false);
			}
		}
		if (div != null) cell.appendChild(div);
	}

	function markUnmarkAll(obj)
	{
		var div = get(obj.id.replace("_input", "_div"));
		if (div) {
			var ch = div.getElementsByTagName("input");
			if (ch.length > 0){
				for (var i=1; i<ch.length; i++){
					if (obj.checked){
						ch[i].setAttribute("checked", "");
					}else{
						ch[i].removeAttribute("checked");
					}
					runFilterCheckbox(ch[i]);
				}
			}
		}
	}

	function expandCollapseList(obj)
	{
		var div = get(obj.id+"_div");
		if (div) {
			if (div.style.display == "none") {
				div.style.display = "";
				obj.src = collapseIMG;
			}
			else {
				div.style.display = "none";
				obj.src = expandIMG;
			}
		}
	}

	function runFilterCheckbox(checkbox)
	{
		var span = get(checkbox.id+"_label");
		if (span){
			var spanInnerHTML = span.innerHTML;

			var spanInner = spanInnerHTML.match(/([-:a-zA-Z0-9, ]+)(?= \()/);

			console.log(spanInnerHTML+":"+spanInner[0]);

			runFilter(spanInner[0], checkbox.checked);
		}
	}

	function runFilter(spanInnerHTML, showRows)
	{
		var table = findTable();

		var rows = table.rows;
		var rowsL = rows.length;
		var row = null;
		var cell = null;
		var inner = "";
		var cellID = 1;

		if (table){
			for (var i=3; i < rowsL; i++)
			{
				row = rows[i];
				cell = row.cells[1];
				inner = clearHTMLTags(cell.innerHTML);

				if (spanInnerHTML == inner){
					if (showRows) {
						row.style.display = "";
					}else{
						row.style.display = "none";
					}
				}
			}
		}
	}

	function addFilterToTable(table)
	{
		var row = table.rows[0];
		var cell = row.insertCell(1);
		cell.colSpan = 2;
		cell.style.verticalAlign ="top";

		var div = createDiv("filter", "filter", "");
		cell.appendChild(div);
	}
	
	function createDiv(id, cssClass, inner)
	{
		var div = document.createElement("div");
		div.setAttribute("id", id);
		div.setAttribute("class", cssClass);
		div.innerHTML = inner;

		return div;
	}
	function addIMDBToRows(cell, cellID)
	{
		var image = document.createElement("img");
		image.setAttribute("id", "cell_imdb_"+cellID);
		image.setAttribute("src", IMDBIMG);
		image.setAttribute("class", "image");
		image.addEventListener("click", function(event){
			openIMDBWebSite(this);
		}, 0);

		cell.appendChild(image);
	}

	function addPlusToRows(cell, cellID)
	{
		var image = document.createElement("img");
		image.setAttribute("id", "cell_img_"+cellID);
		image.setAttribute("src", addIMG);
		image.setAttribute("class", "image");
		image.addEventListener("click", function(event){
			var mp = getMousePosition(event);
			addToStoreList(mp, this);
		}, 0);

		cell.appendChild(image);
	}

	function addIconsToRows(table)
	{
		var rowsL = table.rows.length;
		var cell = null;
		//var cell2 = null;
		var inner = "";
		var cellID = 1;

		for (var i=2; i < rowsL; i++)
		{
			cell = table.rows[i].cells[0];
			cell.id = "cell_"+cellID;

			addPlusToRows(cell, cellID);
			addIMDBToRows(cell, cellID);

			cellID++;
		}
	}

	function prepareCheckboxFilter(table)
	{
		var rowsL = table.rows.length;
		var cell = null;
		var serialDesc = "";
		var serialName = "";
		var cellID = 1;

		for (var i=2; i < rowsL; i++)
		{
			cell = table.rows[i].cells[1];
			serialDesc = clearHTMLTags(cell.innerHTML);
			if (!filterData[serialDesc]) {
				filterDataKeys.push(serialDesc);
				filterData[serialDesc] = new Array();
				filterData[serialDesc][0] = 0;
				filterData[serialDesc][1] = 0;
				filterData[serialDesc][2] = true;

			}
			filterData[serialDesc][0] = cellID++;
			filterData[serialDesc][1]++;
			filterData[serialDesc][2] = arrayContains(turnOff, serialDesc);

			cell = table.rows[i].cells[0];
			serialName = clearHTMLTags(cell.innerHTML);
			serialData.push(serialName);
			serialData[serialName] = new Array();
			serialData[serialName][0] = serialName;
			serialData[serialName][1] = serialDesc;
		}

	}
	function clearHTMLTags(inHTML) {
		var regEx = '';
		var outText = '';
		regEx = /<[^>]*>/g;
		outText = inHTML.replace(regEx, "");
		regEx = /&nbsp;/g;
		outText = outText.replace(regEx, "");
		return outText;
	};
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}

	addFilters();
})();