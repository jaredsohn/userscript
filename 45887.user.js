// ==UserScript==
// @name           Jira Issue Links & Files Tablification
// @namespace      http://home.comcast.net/~mailerdaemon
// @description    Makes Links and Files sections of Issues into tables that can be sorted
// @include        *jira*/browse/*-*
// @version        1.9
// ==/UserScript==

//Test URLS
//http://jira.atlassian.com/browse/JRA-16868
//http://jira.activemath.org/browse/IG-370
//http://jira.atlassian.com/browse/JRA-5959
//http://jira.secondlife.com/browse/WEB-856
//http://jira.atlassian.com/browse/JRA-2509

init();

GM_addStyle([
		"table.jilft {}",
		"table.jilft tr.row > td:nth-child(n+2) { border-left:1px dotted rgba(0, 0, 0, 0.133);}",
		"table.jilft tr.header td { font-size:9px; border-bottom:1px solid rgba(0,0,0,0.25);  cursor:pointer; -moz-user-select: none;}",

		"table.links_table { width:100%; }",
		"table.links_table td { padding-left: 1px; padding-right: 1px; }",
		
		"table.files_table { empty-cells:show; width:auto; }",
		"table.files_table td { padding: 1px 3px; }",// text-shadow: 0 0 2px white;
		"#attachment_thumbnails li.latest, table.files_table tr.latest { "+CSSmulti("box-shadow", "0 0 8px rgba(0, 255, 0, 0.20)") +"}", //0.025
		"#attachment_thumbnails li.latest, table.files_table tr.latest td { background-color:rgba(0, 255, 0, 0.08); text-shadow: 0 0 2px white, 0 0 2px white, 0 0 2px white, 0 0 1px white;}",
		"table.files_table tr.stale td { color: rgb(153, 153, 153); }",
		"table.files_table tr.stale td:hover { color: rgb(138, 138, 138); }",
		
		"table.links_table tr.header, table.links_table td.key { white-space: nowrap; }",
		
		"#attachment_thumbnails span.blender {display:none;}",
		
		".t_links tbody td { width: auto; }",

		"#attachment_thumbnails .attachment-content { height: 256px;}",
		"#attachment_thumbnails .attachment-content > td { display:none; }",
		"#attachment_thumbnails .attachment-size { top:auto; float:none;}",
		"#attachment_thumbnails .attachment-title, #attachment_thumbnails dl { height:auto; }",
		"#attachment_thumbnails dt, #attachment_thumbnails dd { line-height:1.1em; font-size:90%; text-align:center; float:none;}",
		//copied from atlassian css
		"a.user-no-hover.user-avatar, span.user-no-hover.user-avatar { background-position: left center; background-repeat: no-repeat; padding: 2px 0 2px 19px; }",
	].join("\n\n"));

//update these!!!
var priorities = ["Showstopper","Critical","Major","Normal","Low","Trivial","Nice to have"];

var statuses = {
	"Open":1,
	"In Progress":50,
	"Reopened":100,
	"Fix Pending":150,
	"Resolved":200,
	"Closed":250,
	"Ready for Translation":-1,
	"Translation In Progress":-1,
	"Translated":-1,
	"In QA":-1,
	"Passed QA":-1,
	"Translation Final":-1,
	"Published":-1,
	"On Hold":-1,
	"Editing In Progress":-1,
	"Edited":-1,
	"Testing":-1,
	"Verified":-1,
	"Verified: Fixed":-1,
	"Verified: Fix Needed":-1,
	"Republished":-1,
	large:10000,
}

if($X("//div[contains(concat(' ', @class, ' '), ' content ') and div[contains(concat(' ', @class, ' '), ' module ')]]"))
{//V4.1.1
	$Z("//div[contains(concat(' ', @class, ' '), ' content ')]/div[@id='attachmentmodule']", function(module){
			$Z(".//ol[@id='file_attachments']", function(r, i){
						var table = document.createElement("table");
						table.cellPadding = 1; 
						table.cellSpacing = 0;
						table.className = "files_table jilft";
						table.setAttribute("order", [-1]);
						tbody = document.createElement("tbody");
						table.appendChild(tbody);
							
						var tr = document.createElement("tr");
						tr.align="center"
						tr.style.whiteSpace="nowrap";
						tr.style.boarderBottom="1px;"
						tr.className="header row";
							
						tr.appendChild(NewHeader(1, "#", "Initial Ordering"));
						tr.appendChild(NewHeader(2, "T", "Type"));
						tr.appendChild(NewHeader(3, "Filename"));
						tr.appendChild(NewHeader(4, "Size"));
						tr.appendChild(NewHeader(5, "Date"));
						tr.appendChild(NewHeader(6, "Uploader"));
						tr.appendChild(NewHeader(7, "Latest"));
						
						tbody.appendChild(tr);
						
						$Z("li[contains(concat(' ', @class, ' '), ' attachment-content ')]", function(li, i){
								tbody.appendChild(File(i + 1, 
										$X(".//div[contains(concat(' ', @class, ' '), ' attachment-thumb ')]/a", li), 
										$X(".//*[contains(concat(' ', @class, ' '), ' attachment-title ')]/descendant-or-self::a", li), 
										$X(".//dd[contains(concat(' ', @class, ' '), ' attachment-size ')]", li)
									))
							}, r);
						
						var click = generic_click(1, FileSort);//FileShifter
						click.apply(tr.cells[0]);//we cheat!
					
						replace(r, table);
						//r.parentNode.appendChild(table);
						
						for(j = 0; j < tr.cells.length; j++)
							tr.cells[j].addEventListener('click', click, false);
					}, module);
			$Z(".//ol[@id='attachment_thumbnails']", function(ol, i){
				$Z("li[contains(concat(' ', @class, ' '), ' attachment-content ')]", function(li, i){
						//just provide the missing info
						var dl = $X("dl", li);
						var thumb = $X(".//div[contains(concat(' ', @class, ' '), ' attachment-thumb ')]/a", li);
						var link = $X(".//*[contains(concat(' ', @class, ' '), ' attachment-title ')]/descendant-or-self::a", li);
						var size = $X(".//dd[contains(concat(' ', @class, ' '), ' attachment-size ')]", li)
						obj = FileObj(i + 1, null, link, size)
						
						FileSetAttributes(li, obj)
						
						if(!(date = $X("dd[contains(concat(' ', @class, ' '), ' attachment-date ')]", dl)))
							dl.insertBefore(date = document.createElement("dd"), size).appendChild(obj.date[0]);
						dl.insertBefore(creator = document.createElement("dd"), size).appendChild(obj.creator[0]);
	//					dl.appendChild(latest = document.createElement("dd")).appendChild($X("td[7]/text()", tr));
						
						//GM_log(tr.className);
						
						li.title = link.title;
					}, ol);
				
				var table = document.createElement("table");
				table.cellPadding =1; 
				table.cellSpacing = 0;
				table.className = "files_table jilft";
				ol.setAttribute("order", [-1]);
				tbody = document.createElement("tbody");
				table.appendChild(tbody);
					
				var tr = document.createElement("tr");
				tr.align="center"
				tr.style.whiteSpace="nowrap";
				tr.style.boarderBottom="1px;"
				tr.className="header row";
					
				tr.appendChild(NewHeader(1, "Initial Ordering"));
				tr.appendChild(NewHeader(2, "Filename"));
				tr.appendChild(NewHeader(3, "Size"));
				tr.appendChild(NewHeader(4, "Date"));
				tr.appendChild(NewHeader(5, "Uploader"));
				tr.appendChild(NewHeader(6, "Latest"));
				
				tbody.appendChild(tr);
				
				var click = generic_list_click(ol, ImageSort);
				click.apply(tr.cells[0]);//we cheat!
			
				ol.insertBefore(table, ol.firstChild);
				
				for(j = 0; j < tr.cells.length; j++)
					tr.cells[j].addEventListener('click', click, false);
				}, module);
		});
	{//Link Tables
		var click = generic_click(2, LinkSort)//, LinkShifter);
		
		$Z("//table[@id = 'outwardLinks_table' or @id = 'inwardLinks_table']", function L1(table){
			table.className = (table.className + " links_table jilft").trim();
			var top = $X("thead/tr/th", table);
			top.colSpan=5;
			table.setAttribute("order", [1]);
			
			$Z("tbody/tr", function(tr, i){
					var summary = $X("td/div[contains(concat(' ', @class, ' '), ' flooded ')]", tr);
					var wrapper = $X(".//div[contains(concat(' ', @class, ' '), ' attribute-wrap ')]", summary);
					var priority = $X(".//span[contains(concat(' ', @class, ' '), ' priority ')]", wrapper);
					var status = $X(".//span[contains(concat(' ', @class, ' '), ' status ')]", wrapper);
					var link = $X(".//a", summary);
					
					tr.className = tr.className.split(" ").concat("row").join(" ");
					tr.setAttribute("number", i + 1);
					replace(summary,  document.createTextNode(i + 1));
					
					tr.appendChild(key = document.createElement("td")).appendChild(link);
					tr.appendChild(sum = document.createElement("td")).appendChild(summary);
					
					if(priority)
					{
						var s = $X(".//img", priority).alt;
						var e = priorities.indexOf(s);
						if(e == null || e == -1) e = priorities.length;
						tr.setAttribute("priority", e + 1);
						tr.appendChild(document.createElement("td")).appendChild(priority);
					}
					else
					{
						tr.appendChild(document.createElement("td"));
						tr.setAttribute("priority", priorities.length + 1);
					}
					tr.appendChild(document.createElement("td")).appendChild(status);
					
					key.className = "key";
					sum.title = link.title && link.title.trim();
					
					var s = link.textContent.trim();
					var e = s.lastIndexOf("-") + 1;
					tr.setAttribute("key", s.slice(0, e).concat(Array(9 + e - s.length).join("0"), s.slice(e)));
					
					var s = $X(".//img", status).alt;
					var e = statuses[s];
					if(e == null || e == -1) e = statuses.large;
					tr.setAttribute("status", e);
					
					if(!$X("*", wrapper))
						remove(wrapper);
					else
						GM_log("unhandled attribute!")
				}, table);
			
			var tr = document.createElement("tr");
			tr.align="center"
			tr.className="header row";
			
			tr.appendChild(number = NewHeader(1, "#", "Initial Ordering", {status:true}));
			tr.appendChild(key = NewHeader(2, "Key", null, {status:true}));
			tr.appendChild(summary = NewHeader(3, "Summary", null, {status:true}));
			tr.appendChild(priority = NewHeader(4, "P", "Priority", {status:true}));
			tr.appendChild(status = NewHeader(5, "S", "Status", {status:true}));

			summary.width="100%";
			
			insertAfter(tr, top.parentNode);
			
			for(j = 0; j < tr.cells.length; j++)
				tr.cells[j].addEventListener('click', click, false);
		});
	}
}
else
{//Old V3 to V4.1.0
	if((files = $X("//td[@id='file_attachments']")) && (files.textContent.trim() != "None")) {
		table = document.createElement("table");
		table.cellPadding =1; 
		table.cellSpacing = 0;
		table.className = "files_table jilft";
		table.setAttribute("order", [-1]);
		tbody = document.createElement("tbody");
		table.appendChild(tbody);
			
		var tr = document.createElement("tr");
		tr.align="center"
		tr.style.whiteSpace="nowrap";
		tr.style.boarderBottom="1px;"
		tr.className="header row";
			
		tr.appendChild(NewHeader(1, "#", "Initial Ordering"));
		tr.appendChild(NewHeader(2, "T", "Type"));
		tr.appendChild(NewHeader(3, "Filename"));
		tr.appendChild(NewHeader(4, "Size"));
		tr.appendChild(NewHeader(5, "Date"));
		tr.appendChild(NewHeader(6, "Uploader"));
		tr.appendChild(NewHeader(7, "Latest"));
		
		tbody.appendChild(tr);

		var items = [];
		var nodes = [files];
		while(nodes.length > 0)
		{
			var node = nodes.shift();
			var offset = 0;
			do
			{
				if(offset + 7 < node.childNodes.length)
				{
					while(e = /^[\d]+\.$/.exec(node.childNodes[offset].nodeValue.trim()))
					{
						tbody.appendChild(File(e[0], node.childNodes[offset + 1], node.childNodes[offset + 3], node.childNodes[offset + 5]));
						offset += 7;
					}
				}
				if((node.childNodes.length > ++offset) && node.childNodes[offset].nodeName == "SPAN")
					nodes.push(node.childNodes[offset++]);
				else
					break;
			}while(true);
		}
		
		var click = generic_click(1, FileSort);//FileShifter
		click.apply(tr.cells[0]);//we cheat!
		
		files.innerHTML="";
		files.appendChild(table);
		
		for(j = 0; j < tr.cells.length; j++)
			tr.cells[j].addEventListener('click', click, false);
	}

	{//Link Tables
		var click = generic_click(2, LinkSort, LinkShifter);
		
		$Z("//table[@id = 'outwardLinks_table' or @id = 'inwardLinks_table']", function L1(r, i, p){
			r.className = (r.className + " links_table jilft").trim();
			top = $X(".//tr[1]/td[@colspan]", r);
			top.colspan=5;
			r.setAttribute("order", [1]);
			
			$Z(".//tr[position()>1 and td[@width]]", L2, r);
			
			var tr = document.createElement("tr");
			tr.align="center"
			tr.className="header row";
			
			tr.appendChild(number = NewHeader(1, "#", "Initial Ordering", {status:true}));
			tr.appendChild(key = NewHeader(2, "Key", null, {status:true}));
			tr.appendChild(summary = NewHeader(3, "Summary", null, {status:true}));
			tr.appendChild(priority = NewHeader(4, "P", "Priority", {status:true}));
			tr.appendChild(status = NewHeader(5, "S", "Status", {status:true}));

			insertAfter(tr, top.parentNode);
			
			for(j = 0; j < tr.cells.length; j++)
				tr.cells[j].addEventListener('click', click, false);
		});
	}
}

/*
{//Sub-Tasks
	//https://jira.secondlife.com/browse/SVC-5165
	$Z("//form[@id='stqcform']/table[@id='issuetable']", function(r, i){
			r.className = (r.className + " links_table jilft").trim();
			r.setAttribute("order", [1]);
			
			$Z("./tbody/tr", function(tr, i){
					tr.setAttribute("sequence", Number(tr.cells[0]).textContent))
					var sum = $X(".//a", tr.cells[1]);
					tr.cells[1].colSpan="2"
					var key = /\/browse\/([A-Z]{3,})-([\d]+)/.match(sum.getAttribute("href"))
					tr.setAttribute("key", key[1] + key[2].leftPad(7))
					tr.setAttribute("summary", sum.textContent)
					tr.setAttribute("issuetype", $X(".//img", tr.cells[2])).alt)
					tr.setAttribute("status", statuses[$X(".//img", tr.cells[3])).alt])
					
					var assignee = $X("./td[contains(concat(concat(' ', @class), ' '), ' assignee ')]//img", tr);
					
					tr.setAttribute("assignee", )
				}, r);
			
			var tr = document.createElement("tr");
			tr.align="center"
			tr.className="header row";
			
			tr.appendChild(number = NewHeader(1, "#", "Initial Ordering", {status:true}));
			tr.appendChild(key = NewHeader(2, "Key", null, {status:true}));
			tr.appendChild(summary = NewHeader(3, "Summary", null, {status:true}));
			tr.appendChild(priority = NewHeader(4, "P", "Priority", {status:true}));
			tr.appendChild(status = NewHeader(5, "S", "Status", {status:true}));

			insertAfter(tr, top.parentNode);
			
			for(j = 0; j < tr.cells.length; j++)
				tr.cells[j].addEventListener('click', click, false);
		});
	var click = generic_click(2, TaskSort);
}
//*/
function TaskSort(by, a, b){
	by = Math.abs(by) - 1;
	var name = ["sequence", "key", "summary", "issuetype", "status", "assignee"][by];
	var left, right, ret = 0;
	if(name)
	{
		left = a.getAttribute(name);
		right = b.getAttribute(name);
	}
	switch(by)
	{
		case 2:
			left = a.cells[2].title;
			right = b.cells[2].title;
		case 1:
			ret = (left==right)?0:(left<right)?-1:1;
			break;
		default:
			ret = left - right;
			break;
	}
	return ret;
	
}

function TaskShifter(row){
	return $X("./td[1]/div", row);
}

function LinkSort(by, a, b){
	by = Math.abs(by) - 1;
	var name = ["number", "key", null, "priority", "status"][by];
	var left, right, ret = 0;
	if(name)
	{
		left = a.getAttribute(name);
		right = b.getAttribute(name);
	}
	switch(by)
	{
		case 2:
			left = a.cells[2].title;
			right = b.cells[2].title;
		case 1:
			ret = (left==right)?0:(left<right)?-1:1;
			break;
		default:
			ret = left - right;
			break;
	}
	//log({by:by, name:name, left:left, right:right, ret:ret});
	return ret;
}

function LinkShifter(row){
	return $X("./td[1]/img", row);
}

function FileShifter(row){
	return row.cells[0];
}

function ImageSort(by, a, b){
	by = Math.abs(by) - 1;
	var name = ["number", "name", "size", "date", "creator", "latest"][by];
	var left = a.getAttribute(name), right = b.getAttribute(name);
	var ret = 0;
	switch(by)
	{
		case 5:
			left = (left=="false");
			right = (right=="false");
		case 0:
		case 2:
		case 3:
			ret = left - right;
			break;
//		case 1:
//			left = left.toLowerCase();
//			right = right.toLowerCase();
		default:
			ret = (left==right)?0:(left<right)?-1:1;
			break;
	}
//	log({by:by, name:name, left:left, right:right});
	return ret;
}

function FileSort(by, a, b){
	by = Math.abs(by) - 1;
	var name = ["number", "type", "name", "size", "date", "creator", "latest"][by];
	var left = a.getAttribute(name), right = b.getAttribute(name);
	var ret = 0;
	switch(by)
	{
		case 0:
		case 3:
		case 4:
			ret = left - right;
			break;
		case 6:
			left = (left=="false");
			right = (right=="false");
		default:
			ret = (left==right)?0:(left<right)?-1:1;
			break;
	}
//	log({by:by, name:name, left:left, right:right});
	return ret;
}

function NewHeader(num, text, name, obj){
	td = document.createElement("td")
	td.appendChild(document.createTextNode(text));
	td.title = "Sort by " + (name?name:text);
	td.setAttribute("type", num);
	if(obj)
		for(var a in obj)
			td.setAttribute(a, obj[a]);
	return td;
}

function FileObj(num, icon, link, size)
{
	var m = /^(?:(.+?) - |)(?:(Latest) |)(([^-]+)|([\d]{4})-([\d]{2})-([\d]{2}) ([\d]{2}):([\d]{2})) - ([^-]+)$/.exec(link.title);
	var latest = m[2] != null;
	var date = m[3];
	var creator = m[10];
	var nice_date = (m[4] && JiraTimeStringToDate(m[4])) || (m[5] && new Date(m[5],m[6],m[7],m[8],m[9]))
	var name = m[1] || link.textContent.trim()
	
	m = /([\d]+(?:\.[\d]+)?) ([kTGM]B)/.exec(size.textContent);
	var bytes = parseFloat(m[1]);
	switch(m[2])
	{
		case "TB":
			bytes *= 1024;
		case "GB":
			bytes *= 1024;
		case "MB":
			bytes *= 1024;
		case "kB":
			bytes *= 1024;
			break;
	}
	
	//GM_log([num,icon,link,size,m[3],m[2]].join(", "));
	var crl = $X("//a[text()=\""+creator+"\" and @style]") || $X("//a[text()=\""+creator+"\"]");
	var cre = document.createElement("a")
	cre.appendChild(document.createTextNode(creator));
	//*
	if(crl)
	{
		cre.href = crl.getAttribute("href");
		//cre.className = crl.className;
		cre.className = (" "+crl.className+" ").replace(" user-hover "," user-no-hover ").trim();//hover doesn't work!
		if(crl.style.cssText)
			cre.style.cssText = crl.style.cssText;
	}
	//*/
	//unsafeWindow.console.log(crl)
	//unsafeWindow.console.log(cre)
	var simple_size = size.cloneNode(false);
		simple_size.appendChild(document.createTextNode(m[0]));
	
	obj = {
			number: [document.createTextNode(num), parseInt(num)],
			name:[link.cloneNode(true), name.toLowerCase()],
			size:[simple_size, bytes],
			date:[document.createTextNode(date), (new Date()) - nice_date],
			creator:[cre, creator.toLowerCase()],
			latest:[document.createTextNode(latest?"Latest":" "), latest],
		}
	if(icon)
		obj.type = [icon.cloneNode(true), $X("./img",icon).alt];
	
	return obj;
}

function FileSetAttributes(file, obj)
{
	for(var a in obj)
		file.setAttribute(a, obj[a][1]);
	
	if(typeof(obj.latest) !== "undefined")
		file.className = (file.className + (obj.latest[1]?" latest":" stale")).trim();
}

function File(num, icon, link, size){
	obj = FileObj(num, icon, link, size);
	
	tr =document.createElement("tr");

	tr.className="row";
	[obj.number, obj.type, obj.name, obj.size, obj.date, obj.creator, obj.latest].forEach(function (i){
			tr.appendChild(td = document.createElement("td"));
			td.appendChild(i[0]);
		})
	
	FileSetAttributes(tr, obj);
	
	return tr;
}

function generic_list_click(ol, sorter){
	return function (event) {
		var type = parseInt(this.getAttribute("type"));
		var a_type = Math.abs(type);

		var order = ol.getAttribute("order");
		if(order == "" || order == null)
			order = [1];
		else
			order = order.split(",").map(function(f){return parseInt(f);});
		var k;
		
	//	GM_log("------------------------------------------------");
		
		if(Math.abs(order[0]) == a_type)
			order[0] = -order[0];
		else if(type == 1)
			order = [1];//numbers are unique a good opertunity to clear the list.
		else
			(order = order.filter( function(r){return (Math.abs(r) != a_type);})).unshift(type);
		
		ol.setAttribute("order", order.join(","));
		
		//we cheated <.<
		var rows = [];
		$Z("li", function(r,i){ rows[i]=r; }, ol);
		
		rows.sort(function(a, b){
			var i = 0, j = 0, neg = (order[0] < 0);
			//we don't bounds check this because every entry is unique.
			//if we overflow order than there is something SERIOUSLY wrong with the data.
			while(!(j = sorter(order[i], a, b)))
			{
				if(order[i] == null)
					break;
				neg ^= (order[++i] < 0);
			}
			return neg ? -j : j;
		});
		
		for(k = 0; k < rows.length; ++k)
			ol.appendChild(remove(rows[k]));
		//	if(n = $X("li["+(k+2)+"]", ol))
		//		if(rows[k].getAttribute("number") != n.getAttribute("number"))
		//			insertAfter(rows[k], n);
		
		//[2,4,1,3] -> [1,2,3,4]
		//if(a != b)
			
		/*
		log({rows:rows.map(function(f){return f.getAttribute("number");}), order:order, 
				"order-names":order.map(function(by){return tbody.rows[RS-1].cells[Math.abs(by) - 1].textContent;})});
		//*/
		delete rows;
	}
}

function generic_click(RS, sorter, deshifter){
	return function (event) {
		var type = parseInt(this.getAttribute("type"));
		var a_type = Math.abs(type);
		var table = $X(".//ancestor::table[1]", this);
		var tbody = $X("tbody", table);
		var order = table.getAttribute("order");
		if(order == "" || order == null)
			order = [1];
		else
			order = order.split(",").map(function(f){return parseInt(f);});
		var k;
		
	//	GM_log("------------------------------------------------");
		
		if(Math.abs(order[0]) == a_type)
			order[0] = -order[0];
		else if(type == 1)
			order = [1];//numbers are unique a good opertunity to clear the list.
		else
			(order = order.filter( function(r){return (Math.abs(r) != a_type);})).unshift(type);
		
		table.setAttribute("order", order.join(","));
		
		//we cheated <.<
		var rows = new Array(table.rows.length - RS);
		for(k = 0; k < rows.length; ++k)
			rows[k] = table.rows[k + RS];
		
		rows.sort(function(a, b){
			var i = 0, j = 0, neg = (order[0] < 0);
			//we don't bounds check this because every entry is unique.
			//if we overflow order than there is something SERIOUSLY wrong with the data.
			while(!(j = sorter(order[i], a, b)))
			{
				if(order[i] == null)
					break;
				neg ^= (order[++i] < 0);
			}
			return neg ? -j : j;
		});
		
		if(deshifter)
		{
			//keep the numbers in place
			if(rows[0] != table.rows[RS])
				swap(deshifter(rows[0]), deshifter(table.rows[RS]), "n[0]<->o[0]");
			if(k = (rows.length - 1))
			{
				if(rows[0] == table.rows[k+RS]) //new[0] == old[last]
				{
					if(rows[k] != table.rows[RS])
						swap(deshifter(rows[k]), deshifter(table.rows[RS]), "n[k]<->o[0]");
				}
				else
				{
					if(rows[k] != table.rows[k+RS])
						swap(deshifter(rows[k]), deshifter(table.rows[k+RS]), "n[k]<->o[k]");
				}
			}
		}
		
		for(k = 0; k < rows.length; ++k)
			if(rows[k] != table.rows[k+1])
				insertAfter(rows[k], table.rows[k+1]);
		/*
		log({rows:rows.map(function(f){return f.getAttribute("number");}), order:order, 
				"order-names":order.map(function(by){return tbody.rows[RS-1].cells[Math.abs(by) - 1].textContent;})});
		//*/
		delete rows;
	}
}

function CSSmulti(name, value){
	var m = name+": "+value+"; ";
	return ["-moz-", "-webkit-", "-ie-", ""].map(function(f){return f + m;}).join("");
}

function L2(r, i, p){
	var summary = r.cells[1];
	var key = document.createElement("td");
	var priority = r.cells[2];
	var status = r.cells[3];
	insertBefore(key, summary);
	r.className = r.className.split(" ").concat("row").join(" ");
	
	r.setAttribute("number", i + 1);
	
	var link = $X(".//font/a", summary);
	var font = link.parentNode.cloneNode(false);
	font.appendChild(link);
	key.appendChild(font);
	key.className = "key"

	summary.title = link.title && link.title.trim();
	
	var s = link.textContent.trim();
	var e = s.lastIndexOf("-") + 1;
	r.setAttribute("key", s.slice(0, e).concat(Array(9 + e - s.length).join("0"), s.slice(e)));
	
	var s = $X(".//img", r.cells[3]).title.split(" - ", 1)[0];
	var e = priorities.indexOf(s);
	if(e == null || e == -1) e = priorities.length;
	r.setAttribute("priority", e + 1);
	
	var s = $X(".//img", r.cells[4]).title.split(" - ", 1)[0];
	var e = statuses[s];
	if(e == null || e == -1) e = statuses.large;
	r.setAttribute("status", e);
}

function log()
{
	var arg;
	switch(arguments.length)
	{
		case 1:
			arg = arguments[0];
			break;
		case 0:
			arg = null;
			break;
		default:
			arg = arguments;
			break;
	}
	
	var f = JSON.stringify(arg);
	if(typeof(unsafeWindow.console) != "undefined" && typeof(unsafeWindow.console.log) != "undefined")
		unsafeWindow.console.log(f);
	else
		GM_log(f);
	return arg;
}

//*/

function $X(_xpath, node){//to search in a frame, you must traverse it's .contentDocument attribute.
    var doc = (node)?(node.ownerDocument || node):(node = document);
    return doc.evaluate(_xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
}
function $Y(_xpath, node){
    var doc = (node)?(node.ownerDocument || node):(node = document);
    return doc.evaluate(_xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
function $Z(_xpath, func, node){
    var doc = (node)?(node.ownerDocument || node):(node = document);
    var res = doc.evaluate(_xpath, node, null,	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var args = Array.prototype.slice.call(arguments, 3);
    var i = 0;
    for (; i < res.snapshotLength; ++i)
        func.apply(func, [res.snapshotItem(i), i].concat(args));
    return i;
}

function insertAfter(insert, after){return after.parentNode.insertBefore(insert, after.nextSibling);}
function insertBefore(insert, before){return before.parentNode.insertBefore(insert, before);}
function remove(r){return r.parentNode.removeChild(r);}
function replace(old, New){return old.parentNode.replaceChild(New,old);}
function swap(a, b, comment){
	if(a != b)
	{
		var c = a.nextSibling; 
		var ap = a.parentNode;
		var bp = b.parentNode;
		bp.insertBefore(ap.removeChild(a), b);
		ap.insertBefore(bp.removeChild(b), c);
//		GM_log([comment, a.src?a.src:a, b.src?b.src:b].join("\n"));
	}
}
function findParent(node, parent){
	return $X(".//ancestor::"+parent+"[1]", node);
}

function init(){
	if(typeof(String.prototype.trim) == "undefined")
		String.prototype.trim = function() {return this.replace(/^\s+|\s+$/g, "");}
	if(typeof(String.prototype.leftPad) == "undefined")
		String.prototype.leftPad = function (len, text) { return new Array(len - this.length + 1).join(text || '0') + this; }
}

function JiraTimeStringToDate(str){
	return new Date(str.replace(/^(\d{2})\/([A-Z][a-z]{2})\/(\d{2})/, "$2 $1 20$3"));
}