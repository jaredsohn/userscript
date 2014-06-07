// ==UserScript==

// @name bggGameSearch
// @namespace http://www.carpetemporem.com

// @description enhance geek search results, geek & luding shortcuts

// @include boardgamegeek.com/*
// @include http://boardgamegeek.com/*
// @include http://*.boardgamegeek.com/*
// @include *luding.org*
// @include *sunsite.informatik.rwth-aachen.de/*

// ==/UserScript==


(function ()
	{
	//GM_log("bggGameSearch");

	function fo_snap(O_node, S_path)
		{
		//GM_log(S_path);

		return document.evaluate(
		 "." + S_path, O_node, null,
		 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		}

	var o_keys =
		[
		{Key: "A", Alt: 1, Ctrl: 1, Type: "author"}
		,
		{Key: "D", Alt: 1, Ctrl: 1, Type: "author"}
		,
		{Key: "F", Alt: 1, Ctrl: 1, Type: "forum"}
		,
		{Key: "G", Alt: 1, Ctrl: 1, Type: "game"}
		,
		{Key: "L", Alt: 1, Ctrl: 1, Type: "geeklist"}
		,
		{Key: "P", Alt: 1, Ctrl: 1, Type: "publisher"}
		,
		{Key: "T", Alt: 1, Ctrl: 1, Type: "tag"}
		,
		{Key: "U", Alt: 1, Ctrl: 1, Type: "user"}
		,
		{Key: "W", Alt: 1, Ctrl: 1, Type: "wiki"}
		]
		;

	function fo_GetEventKey(AO_keys, O_event)
		{
		var s_key = String.fromCharCode(O_event.keyCode);

		for (var n_offset = 0; n_offset < AO_keys.length; ++n_offset)
			{
			var o_key = AO_keys[n_offset];

			if (s_key == o_key.Key
			 && O_event.altKey == (o_key.Alt ? 1 : 0)
			 && O_event.ctrlKey == (o_key.Ctrl ? 1 : 0)
			 && O_event.shiftKey == (o_key.Shift ? 1 : 0))
				{
				return o_key;
				}
			}

		return null;
		}

	document.addEventListener('keydown',
	 function (O_event)
		{
		var o_key = fo_GetEventKey(o_keys, O_event);

		if (!o_key)
			{
			return;
			}

		//GM_log(window.location.href);

		if (/(\.|\/)boardgamegeek\.com\//.test(window.location.href))
			{
			o_edit = document.evaluate("//input[@id='sitesearch']",
			 document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

			if (!o_edit.snapshotLength)
				{
				//GM_log("no input");
				return;
				}

			o_edit = o_edit.snapshotItem(0);

			o_type = document.evaluate(
			 "//input[@id='sitesearch']/parent::*/parent::*"
			 + "//select[@name='objecttype']",
			 document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

			if (!o_type.snapshotLength)
				{
				//GM_log("no type");
				return;
				}

			o_type = o_type.snapshotItem(0);

			if (o_key.Type == "game")
				{
				o_type.value = "boardgame";
				}
			else if (o_key.Type == "author" || o_key.Type == "designer")
				{
				o_type.value = "boardgamedesigner";
				}
			else if (o_key.Type == "forum")
				{
				o_type.value = "article";
				}
			else if (o_key.Type == "geeklist")
				{
				o_type.value = "geeklist";
				}
			else if (o_key.Type == "publisher")
				{
				o_type.value = "boardgamepublisher";
				}
			else if (o_key.Type == "tag")
				{
				o_type.value = "tag";
				}
			else if (o_key.Type == "user")
				{
				o_type.value = "user";
				}
			else if (o_key.Type == "wiki")
				{
				o_type.value = "wiki";
				}
			else
				{
				return;
				}

			o_edit.select()
			o_edit.focus()

			return;
			}

		if (/\/luding\//.test(window.location.href))
			{
			if (o_key.Type == "game")
				{
				o_edit = document.evaluate("//input[@name='gamename']",
				 document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				 null);
				}
			else if (o_key.Type == "author" || o_key.Type == "designer")
				{
				o_edit = document.evaluate("//input[@name='authorname']",
				 document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				 null);
				}
			else if (o_key.Type == "publisher")
				{
				o_edit = document.evaluate("//input[@name='publishername']",
				 document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				 null);
				}
			else
				{
				return
				}

			if (!o_edit.snapshotLength)
				{
				return;
				}

			o_edit = o_edit.snapshotItem(0);

			o_edit.select()
			o_edit.focus()

			return;
			}
		}
	 , false);

	var s_location = String(window.location);
	//GM_log(s_location);

	var as_split1 = s_location.split("/");
	//GM_log(as_split1);

	if (as_split1.length < 4 || as_split1[3] == "")
		{
		return;
		}

	if (as_split1[3] == "game" || as_split1[3] == "boardgame")
		{
		return;
		}

	var as_split2 = as_split1[3].split(/[?&]/);
	//GM_log(as_split2);

	if (as_split2.length < 3
	 || as_split2[0] != "geeksearch.php"
	 || as_split2[1] != "action=search"
	 || as_split2[2] != "objecttype=boardgame")
		{
		return;
		}

	//GM_log("in game search");

	var o_table = document.getElementById("collectionitems")
	//GM_log(o_table)

	if (!o_table)
		{
		//GM_log("no table");
		return;
		}

	o_table.setAttribute("cellpadding", "0");
	o_table.setAttribute("cellspacing", "0");

	//GM_log("in table");

	function f_setStyle(O_node, S_style)
		{
		var s_style;
		s_style = O_node.getAttribute("style");

		if (s_style == null)
			{
			s_style = "";
			}
		else
			{
			if (s_style != "" && s_style[s_style.length - 1] != ";")
				{
				s_style = s_style + ";";
				}
			}

		s_style = s_style
		 + "padding-left:0.5em;padding-right:0.5em;";
		s_style = s_style
		 + "vertical-align:middle;";

		s_style = s_style + S_style;

		//GM_log(s_style);

		O_node.setAttribute("style", s_style);
		}

	//GM_log(o_table.innerHTML);

	var o_rows;
	o_rows = document.evaluate("./TR", o_table,
	 null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	var n_rows;
	n_rows = o_rows.snapshotLength;

	if (!n_rows)
		{
		// possibly with thead or tbody

		o_rows = document.evaluate("./*/TR", o_table,
		 null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		n_rows = o_rows.snapshotLength;

		if (!n_rows)
			{
			//GM_log("no rows");

			return;
			}
		}

	for (var n_row = 0; n_row < n_rows; ++n_row)
		{
		//GM_log("row: " + n_row);

		var o_row;
		o_row = o_rows.snapshotItem(n_row);

		//GM_log(o_row.innerHTML);

		var s_columns;
		s_columns = n_row == 0 ? "TH" : "TD";
		//GM_log(s_columns);

		var o_columns;
		o_columns = document.evaluate("./" + s_columns,
		 o_row, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		var n_columns;
		n_columns = o_columns.snapshotLength;

		//GM_log("columns: " + n_columns);

		if (n_columns < 9)
			{
			//GM_log("no headings");

			return;
			}

		var o_column;

		// remove the ranking column and redo the snapshot

		o_column = o_columns.snapshotItem(0);
		o_column.parentNode.removeChild(o_column);

		o_columns = document.evaluate("./" + s_columns,
		 o_row, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		n_columns = o_columns.snapshotLength;

		for (var n_column = 0; n_column < 8; ++n_column)
			{
			o_column = o_columns.snapshotItem(n_column);

			o_column.removeAttribute("class");
			o_column.removeAttribute("id");
			o_column.removeAttribute("width");
			o_column.removeAttribute("style");

			//GM_log("column " + n_column + ": " + o_column.innerHTML);
			}

		var o_titleColumn;
		var o_yearColumn;
		var o_ratingsColumn;
		var o_averageColumn;
		var o_publishersColumn;
		var o_authorsColumn;

		if (n_row == 0)
			{
			o_column = o_columns.snapshotItem(0);
			f_setStyle(o_column, "text-align:center;");
			o_column.innerHTML = "";

			o_column = o_columns.snapshotItem(1);
			o_column.setAttribute("width", "40%");
			f_setStyle(o_column, "text-align:left;");
			o_column.innerHTML = "Title";

			o_column = o_columns.snapshotItem(2);
			f_setStyle(o_column, "text-align:center;");
			o_column.innerHTML = "Year";

			o_column = o_columns.snapshotItem(3);
			f_setStyle(o_column, "text-align:center;");
			o_column.innerHTML = "Ratings";

			o_column = o_columns.snapshotItem(4);
			f_setStyle(o_column, "text-align:center;");
			o_column.innerHTML = "Average";

			o_column = o_columns.snapshotItem(5);
			o_column.setAttribute("width", "20%");
			f_setStyle(o_column, "text-align:left;");
			o_column.innerHTML = "Publishers";

			o_column = o_columns.snapshotItem(6);
			o_column.setAttribute("width", "20%");
			f_setStyle(o_column, "text-align:left;");
			o_column.innerHTML = "Authors";

			o_column = o_columns.snapshotItem(7);
			f_setStyle(o_column, "text-align:left;");
			o_column.innerHTML = "Shop";
			}
		else
			{
			var o_source;
			var o_target;

			o_target = o_columns.snapshotItem(0);
			o_target.setAttribute("cellpadding", "0");
			o_target.setAttribute("cellspacing", "0");
			f_setStyle(o_target, "text-align:center;");
			//GM_log(o_target.innerHTML);

			o_source = o_columns.snapshotItem(1);
			//GM_log("1:" + o_source.innerHTML);
			o_source = o_columns.snapshotItem(2);
			//GM_log("2:" + o_source.innerHTML);
			o_source = o_columns.snapshotItem(3);
			//GM_log("3:" + o_source.innerHTML);

			o_source = o_columns.snapshotItem(1);

			var s_title;
			s_title = o_source.innerHTML.replace(/[\r\n]/g, " ");
			//GM_log("title:" + s_title);
			var s_year;
			s_year = "";

			var o_match;
			var o_found;

			o_match = new RegExp ("^.*(<a.*</a>).*\\((\\d{4})\\).*$", "");
			o_found = o_match.exec(s_title);

			if (o_found && o_found.length == 3)
				{
				s_title = o_found[1];
				s_year = o_found[2];

				//GM_log("title/year:" + s_title + "/" + s_year);
				}
			else
				{
				o_match = new RegExp ("^.*(<a.*</a>).*$", "");
				o_found = o_match.exec(s_title);

				if (o_found && o_found.length == 2)
					{
					s_title = o_found[1];
					}
				}

			//GM_log(s_title + ": " + s_year);

			o_target = o_titleColumn = o_columns.snapshotItem(1);
			f_setStyle(o_target, "text-align:left;");
			o_target.innerHTML = s_title;

			o_target = o_yearColumn = o_columns.snapshotItem(2);
			f_setStyle(o_target, "text-align:center;");
			o_target.innerHTML = s_year;

			o_source = o_columns.snapshotItem(5);
			o_target = o_ratingsColumn = o_columns.snapshotItem(3);
			f_setStyle(o_target, "text-align:center;");
			o_target.innerHTML = o_source.innerHTML;

			o_source = o_columns.snapshotItem(4);
			o_target = o_averageColumn = o_columns.snapshotItem(4);
			f_setStyle(o_target, "text-align:center;");
			o_target.innerHTML = o_source.innerHTML;

			o_target = o_publishersColumn = o_columns.snapshotItem(5);
			f_setStyle(o_target, "text-align:left;");
			o_target.innerHTML = "publishers";

			o_target = o_authorsColumn = o_columns.snapshotItem(6);
			f_setStyle(o_target, "text-align:left;");
			o_target.innerHTML = "authors";

			o_source = o_columns.snapshotItem(8);
			o_target = o_columns.snapshotItem(7);
			f_setStyle(o_target, "text-align:left;");
			o_target.innerHTML = o_target.innerHTML + o_source.innerHTML;
			}

		for (var n_column = 8; n_column < n_columns; ++n_column)
			{
			o_column = o_columns.snapshotItem(n_column);
			o_column.parentNode.removeChild(o_column);
			}

		if (n_row == 0)
			{
			continue;
			}

		function f_getGameData(S_url,
		 O_yearColumn, O_ratingsColumn, O_averageColumn,
		 O_publishersColumn, O_authorsColumn)
			{
			function fs_stripTags(S_string)
				{
				var s_string;
				s_string = S_string;

				s_string = s_string.replace(/<[^>]*>/g, "");

				return s_string;
				}

			function fs_stripSpace(S_string)
				{
				var s_string;
				s_string = S_string;

				s_string = s_string.replace(/&nbsp;/g, " ");
				s_string = s_string.replace(/\s\s*/g, " ");
				s_string = s_string.replace(/^\s/g, "");
				s_string = s_string.replace(/\s$/g, "");

				return s_string;
				}

			function f_createHandler(S_gameID)
				{
				function f_handler(O_response)
					{
					function fo_SnapAnchor(O_document, S_anchor)
						{
						var o_snap = fo_snap(O_document,
						 "//a[@name='" + S_anchor + "']");

						if (o_snap.snapshotLength != 1)
							{
							//GM_log("no anchor '" + S_anchor + "'");
							return null;
							}

						//GM_log("got anchor '" + S_anchor + "'");
						return o_snap;
						}

					function fo_SnapInfoTableRows(O_anchor)
						{
						if (O_anchor == null)
							{
							return null;
							}

						var o_snap = fo_snap(O_anchor,
						 "/following-sibling::node()" +
						 "//table[@class='geekitem_infotable']//tr");

						if (o_snap.snapshotLength < 1)
							{
							//GM_log("no rows");
							return null;
							}

						//GM_log("got " + o_snap.snapshotLength + " rows");
						return o_snap;
						}

					function fs_buildAttributes(O_element)
						{
						var s_built = "";
						var s_space = "";

						var n_attributes = O_element.attributes.length;
						//GM_log(n_attributes + " attributes");

						var n_attribute = 0;

						while (1)
							{
							if (n_attribute >= n_attributes)
								{
								return s_built;
								}

							var o_attribute =
							 O_element.attributes[n_attribute++];

							var s_name = o_attribute.name;
							var s_value = o_attribute.value;

							//GM_log(s_name + "=" + s_value);

							var s_delimiter;

							if (s_value.match(/"/))
								{
								if (s_value.match(/'/))
									{
									continue;
									}

								s_delimiter = "'";
								}
							else
								{
								s_delimiter = "\"";
								}

							s_built = s_built + s_space + s_name
							 + "=" + s_delimiter + s_value + s_delimiter;

							s_space = " ";
							}
						}

					function fs_buildElement(O_element)
						{
						var s_built =
						 "<" + O_element.nodeName + " "
						 + fs_buildAttributes(O_element) + ">"
						 + O_element.innerHTML
						 + "</" + O_element.nodeName + ">";

						return s_built;
						}

					function fo_getLabelRow(O_rowsSnap, S_label)
						{
						if (O_rowsSnap == null)
							{
							return null;
							}

						var n_rows = O_rowsSnap.snapshotLength;
						var n_row = 0;

						while (1)
							{
							if (n_row >= n_rows)
								{
								return null;
								}

							var o_row = O_rowsSnap.snapshotItem(n_row++);

							//GM_log("row " + n_row + ": " + o_row.innerHTML);

							var o_labelSnap = fo_snap(o_row, "/td[1]/b");

							if (o_labelSnap.snapshotLength != 1)
								{
								continue;
								}

							var s_label =
							 o_labelSnap.snapshotItem(0).innerHTML;

							//GM_log(s_label);

							if (s_label == S_label)
								{
								return o_row;
								}
							}
						}

					function f_copyWildLinks(O_row, O_wildRef, O_column)
						{
						if (O_row == null)
							{
							return;
							}

						var o_linksSnap = fo_snap(O_row, "/td[2]//a");

						var n_links = o_linksSnap.snapshotLength;
						var n_link = 0

						var n_found = 0;

						while (1)
							{
							if (n_link >= n_links)
								{
								return;
								}

							var o_link = o_linksSnap.snapshotItem(n_link++);
							var s_inner = o_link.innerHTML;

							//GM_log(s_inner);

							var s_href = o_link.getAttribute("href");

							if (s_href.match(O_wildRef) == null)
								{
								if (s_inner != "(Uncredited)"
								 && s_inner != "(Unknown)")
									{
									continue;
									}
								}

							if (n_found++ > 0)
								{
								O_column.appendChild(
								 document.createElement("BR"));
								}

							O_column.appendChild(o_link.cloneNode(true));
							}
						}

					//GM_log(O_response.status);

					if (O_response.status != 200)
						{
						return;
						}

					var o_document = document.createElement("DIV");
					o_document.innerHTML = O_response.responseText;

					//GM_log(o_document.innerHTML);

					var o_anchorSnap;
					o_anchorSnap = fo_SnapAnchor(o_document, "information");

					var o_rowsSnap;
					o_rowsSnap = fo_SnapInfoTableRows(
					 o_anchorSnap.snapshotItem(0));

					f_copyWildLinks(fo_getLabelRow(o_rowsSnap, "Designer"),
					 "^/boardgamedesigner/", O_authorsColumn);

					f_copyWildLinks(fo_getLabelRow(o_rowsSnap, "Publisher"),
					 "^/boardgamepublisher/", O_publishersColumn);
					}

				return f_handler
				}

			var s_gameID;
			s_gameID = S_url.replace(/^.*\/(\d+)$/, "$1");

			//GM_log("request game id " + s_gameID);

			GM_xmlhttpRequest(
			 {method: 'GET', url: S_url, onload: f_createHandler(s_gameID)});
			}

		var o_games  = document.evaluate(".//A[@href]", o_titleColumn,
		 null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		if (o_games.snapshotLength < 1)
			{
			continue;
			}

		var o_game = o_games.snapshotItem(0);
		var s_href = o_game.attributes.getNamedItem("href").value;

		var s_url = "" + window.location;
		s_url = s_url.replace(/^(https?:\/\/[^\/]+)(.*)/i, "$1" + s_href);

		//GM_log("url: " + s_url);

		//o_yearColumn.innerHTML = "";
		//o_ratingsColumn.innerHTML = "";
		//o_averageColumn.innerHTML = "";

		o_publishersColumn.innerHTML = "";
		o_authorsColumn.innerHTML = "";

		f_getGameData(s_url, o_yearColumn, o_ratingsColumn, o_averageColumn,
		 o_publishersColumn, o_authorsColumn);
		}
	}
 )();
