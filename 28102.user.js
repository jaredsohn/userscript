// ==UserScript==
// @name           homeless.co.il - The Road to Rothschild Boulevard
// @namespace      homeless.co.il
// @include        http://www.homeless.co.il/*
// ==/UserScript==

(function() {

	var server = null;
	var store = null;
	var db = null;

	initGears();
	initStyles();
	fixTables();
	addColumn("הערת משתמש");
	var rows = document.evaluate("//tr[contains(@class, 'TROut')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i = 0; i < rows.snapshotLength; i++)
	{
		var curr = rows.snapshotItem(i);
		if (curr.id.indexOf("TR") != 0)
		{
			continue;
		}
	
		var id = curr.id.slice(2);
		var cells = curr.getElementsByTagName("TD");
		
		rewriteMap(cells);
		curr.appendChild(collapsableComment(id));
		cells[0].removeChild(cells[0].firstChild);
		cells[0].appendChild(userMark(id, curr));
	}	




	// ==========================================================================================


	function initGears() {
		if (!unsafeWindow.google) unsafeWindow.google= {};
		if (!unsafeWindow.google.gears){
			unsafeWindow.google.gears= {factory: new GearsFactory()};
		}
		try {
			server = unsafeWindow.google.gears.factory.create('beta.localserver', '1.0');
			store = server.createStore("homeless_extras");
			db = unsafeWindow.google.gears.factory.create('beta.database', '1.0');
			if (db) {
				db.open('homeless_extras');
				//db.execute('drop table homelessExtras');
				db.execute("create table if not exists homelessExtras (id int NOT NULL PRIMARY KEY, comment varchar (512) default '', user_mark varchar(15) default 'null')");
		}

		} catch(e) { alert(e);}
		if (!server)
		{
			window.addEventListener("load", function(){
					new GearsFactory().create('beta.localserver', '1.0');
					location.href = location.href;
					return false;
				}, 
				true);
		}
	}
	
	

	function collapsableComment(id)
	{
		function expandComment()
		{
			if (_expandMode)
				return;
				
				
			_expandMode = true;
			setCommentText(null);
			var textArea = document.createElement('textArea');
			textArea.value = getText();
			textArea.rows = '4';
			textArea.cols = '25';
			textArea.style.fontFamily = "arial, helvetica, sans-serif";
			textArea.style.fontSize = "12";
			textArea.addEventListener('blur', collapseComment, true);
			_root.appendChild(textArea);
			textArea.focus();
			
		}
		function collapseComment(event)
		{
			_expandMode = false;
			
			var textArea = event.target;
			textArea.removeEventListener('blur', collapseComment, true);
			
			var text = textArea.value;
			setText(text);
			setCommentText(text);

			_root.removeChild(textArea);
			_root.textContent = setCommentText(text);
			
		}
		function setText(text)
		{
			db.execute('update homelessExtras set comment=? where id=?', [text, _id]);
			if (db.rowsAffected == 0)
			{
				db.execute('insert into homelessExtras(id,comment) values (?, ?)', [_id, text]);
			}
		}
		
		function getText()
		{
			var rs = db.execute('select comment from homelessExtras where id=?', [_id]);
			var text = "";
			if (rs.isValidRow())
			{
				text = rs.field(0);
			}
			rs.close();
			
			return text;
		}
		
		function setCommentText(text)
		{
			if (text != null)
			{
				if (text.length > 25)
				{
					text = text.slice(0,22) + "...";
				}
				
				if (text.length == 0)
				{
					text = "[ערוך]";
				}
			}
			
			_root.textContent = text;
			
		}
		
		var _id = id;
		var _root = document.createElement("TD");
		var _expandMode = false;

		_root.noWrap = true;
		_root.width="80";
		_root.vAlign = 'TOP';
		
		setCommentText(getText());
		_root.addEventListener('click', expandComment, false);
		
		return _root;
	}
	
	
	function userMark(id, rootParent)
	{
	
		function addOption(text, value)
		{
			var opt = document.createElement('Option');
			opt.value = value;
			opt.textContent = text;
			_select.add(opt, null);
		}
		function dbGetUserMark()
		{
			var userMark = 'null';
			var rs = db.execute('select user_mark from homelessExtras where id=?', [_id]);
			if (rs.isValidRow())
			{
				userMark = rs.field(0);
			}
			rs.close();
			
			return userMark;
		}
		function dbSetUserMark(userMark)
		{
			db.execute('update homelessExtras set user_mark=? where id=?', [userMark, _id]);
			if (db.rowsAffected == 0)
			{
				db.execute('insert into homelessExtras(id,user_mark) values (?, ?)', [_id, userMark]);
			}
		}
		
		// TODO: come up with some fancy styles for each mode
		function updateUI(userMark)
		{
			switch (userMark)
			{
				case 'null':
				default:
					break;
				case 'relevant':
					break;
				case 'noteWorthy':
					break;
				case 'notRelevant':
					break;
				
			}
			
		}
		
		function onSelectionChanged()
		{
			dbSetUserMark(_select.value);
			updateUI(_select.value);
		}

		var _id = id;
		var _root = document.createElement("TD");
		var _rootParent = rootParent;
		_root.noWrap = true;
		_root.width="10px";
		_root.vAlign = 'MIDDLE';
		_root.align = 'CENTER';
		
		var _select = document.createElement('select');
		addOption("--", "null");
		addOption("יאפ!", 'relevant');
		addOption("אולי", 'noteWorthy');
		addOption("לא", 'notRelevant');
		_select.value = dbGetUserMark();
		updateUI(_select.value);
		_root.appendChild(_select);
		_select.addEventListener('change', onSelectionChanged, false);

		
		return _root;
		
	}
	function rewriteMap(cells)
	{
		var address = cells[4].textContent + " תל אביב יפו";
		var city = cells[5].textContent;
		
		var mapCell = cells[7];
		var mapLink = mapCell.childNodes[0];
		
		// add missing button
		if (mapCell.childNodes.length < 2)
		{
			mapCell.align = 'center';
			mapLink = document.createElement('A');
			mapLink.target="_blank";
			var img = document.createElement('img');
			img.src = '../images/ico_map.gif';
			img.height = 15;
			img.border = 0;
			mapLink.appendChild(img);
			mapCell.appendChild(mapLink);
			mapCell.appendChild(document.createElement('BR'));
			
		}
		
		mapLink.href = "http://www.mapa.co.il/general/searchresult_locked.asp?CurrMapTab=4&CurrHeaderTab=2&DestinationPoint=שדרות רוטשילד תל אביב יפו&SourcePoint=" + address;
	}
	
	
	
	

	function adjustColumnWidth(index, width)
	{
		var headings = document.evaluate("//tr[./td[@class='TableTitle1']]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < headings.snapshotLength; i++)
		{
			var curr = headings.snapshotItem(i);
			curr.getElementsByTagName("TD")[index].width=width;
		}
		
	}
	function addColumn(title)
	{
		var headings = document.evaluate("//tr[td[@class='TableTitle1']]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < headings.snapshotLength; i++)
		{
			var curr = headings.snapshotItem(i);

			var col = document.createElement('TD');
			col.className = 'TableTitle';
			col.textContent = title;
			curr.appendChild(col);
		}

	}
	function fixTables()
	{
		var table = document.evaluate("//table[@width='780']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < table.snapshotLength; i++)
		{
			
			var curr = table.snapshotItem(i);
			curr.width=850;
		}
	}
	
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
	function initStyles()
	{
		addGlobalStyle('notRelevant { font-size: small;  font-decorations: line-through}');
	}
	
})();