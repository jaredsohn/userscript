// ==UserScript==
// @name           CommentsFX standalone
// @namespace      commentsfx
// @description    Comments extensions for Firefox
// @include        http://habrahabr.ru/blogs/*
// @include        http://habrahabr.ru/company/*
// @include        http://*.habrahabr.ru/blog/*
// ==/UserScript==


/* CommentsFx scripts: HabraFx comments extensions
 *
 * This component is part of the HabraFx.
 * Visit http://labs.web-zine.org/habrafx/ for more information.
 *
 * Author: DinamytE <dinamyte@web-zine.org>.
 */

/* Utility methods */

var Store =
{
	get_value : function(name)
	{
		var full_name = "commentsfx_" + name + "=";

		var ca = document.cookie.split(';');

		for (var i=0; i < ca.length; i++)
		{
			var c = ca[i];

			while (c.charAt(0)==' ')
			{
				c = c.substring(1, c.length);
			}

			if (c.indexOf(full_name) == 0)
			{
				return c.substring(full_name.length,c.length);
			}
		}

		return null;

	},

	test_value : function(name, value)
	{
		if (Store.get_value(name) == value)
		{
			return true;
		}
		else
		{
			return false;
		}
	},

	set_value : function(name, value)
	{
		var date = new Date();
		date.setTime(date.getTime() + (355*24*60*60*1000));
		var expires = "; expires=" + date.toGMTString();

		document.cookie = "commentsfx_" + name + "=" + value + expires + "; path=/";
	}
}

var Options =
{
	//Listener method
	listen : function(element, callback)
	{
		var first_value = Store.get_value("commentsfx_" + element + "_opt");

		if (first_value != null)
		{
			if (first_value == "true")
				first_value = true;
			else
				first_value = false;

			document.getElementById(element).checked = !first_value;

			document.getElementById(element).setAttribute("_checked", !first_value);
			callback(first_value, document.getElementById(element));
		}
		else
		{
			document.getElementById(element).setAttribute("_checked", "false");
		}

		document.getElementById(element).addEventListener("click", function()
		{

			var value = this.getAttribute("_checked");

			if (value == null)
			{
				value = "false";
			}

			if (value == "checked" || value == "true")
			{
				value = true;
				this.setAttribute("_checked", "false");
				Store.set_value("commentsfx_" + element + "_opt", "true");
			}
			else
			{
				value = false;
				this.setAttribute("_checked", "true");
				Store.set_value("commentsfx_" + element + "_opt", "false");
			}

			callback(value, this);
		}, false);
	}
}

/*
 * Read this code top-to-bottom, please!
 */

function CommentEntry()
{
	/* Variables */

	//Author metainformation
	this.author =
	{
		"nickname"    : "",
		"profile_uri" : "",
		"avatar_uri"  : ""
	};

	//Comment self information
	this.comment =
	{
		"date"        : "",

		"rating"      : 0,

		//Deprecated now:
		//"post"	  : "",

		"id"	      : 0,
		"pointer"	  : null
	};

	/* Children information and operations */

	//Children array
	this.children = [];

	//Children count
	this.children_count = 0;

	//Adding new children
	this.add_child = function(child)
	{
		//Setting parent of new child node
		child.parent = this;

		//There is new children!
		this.children_count++;

		//Adding to the array of children
		this.children.push(child);

		//Back to the user
		return child;
	}

	//Checking children existence
	this.children_exists = function()
	{
		return ( this.children_count != 0 );
	}

	/* Parent information and operations  */

	//Parent node
	this.parent   = null;

}

function CommentTree()
{
	//Root comment element in DOM-tree
	this.comments_element = document.getElementById("comments");

	//Root comment node
	this.comment_root = new CommentEntry();

	//Current comment node when traversing
	this.current_comment_node = null;

	//Traversing comments with callback method
	//Callback receives two arguments:
	// 1. Current comment entry
	// 2. Current comment level
	this.traverse_comments = function(callback, level, current_node)
	{

		//Starting from root
		if (current_node == null)
		{
			current_node = this.comment_root;
		}

		//Start level is zero
		if (level == null)
		{
			level = 0;
		}

		//Checking children existence
		if (!current_node.children_exists())
		{
			return;
		}

		//Traversing over children
		for (var i = 0; i < current_node.children.length; i++)
		{
			//Calling callback
			var callback_result = callback(current_node.children[i], level);

			if (callback_result == true)
				return;

			//Deeper and deeper...
			this.traverse_comments(callback, level + 1, current_node.children[i]);
		}
	}

	//Initialization block
	//If initial_callback is supplied, it will be called every new comment
	//Attention: entire hierarchy maybe doesn't exists when initial callback called
	//Pink panter is watching you!
	this.retreive_comments = function(current_element, initial_callback)
	{
		//Root element?
		if (current_element == null)
		{
			current_element = this.comments_element.getElementsByTagName("ul").item(0);

			this.current_comment_node = this.comment_root;
		}

		//Iterating over the child
		for (var i = 0; i < current_element.childNodes.length; i++)
		{
			//Getting name of the current element
			var current_element_name = current_element.childNodes[i].nodeName.toLowerCase();

			//We have a comment
			if  (current_element_name == "li")
			{
				this.current_comment_node = this.current_comment_node.add_child(this.parse_comment(current_element.childNodes[i]));

				//Starting callback (if exists, huh)
				if (initial_callback != null)
				{
					initial_callback(this.current_comment_node);
				}

				this.retreive_comments(current_element.childNodes[i], initial_callback);

				this.current_comment_node = this.current_comment_node.parent;
			}
			else if (current_element_name == "ul")
			{
				//Deeper and deeper... yeah, baby
				this.retreive_comments(current_element.childNodes[i], initial_callback);
			}
		}
	}

	//Getting and parsing comment
	this.parse_comment = function(comment_element)
	{
		var comment_node = new CommentEntry();

		//Critical section
		try
		{
			//Retreiving information element
			var information_element = comment_element.firstChild.nextSibling
										.getElementsByTagName("li");

			comment_node.comment.pointer = comment_element;

			//Switching type of information
			for (var i = 0; i < information_element.length; i++)
			{
				switch (information_element[i].className)
				{
					//We have avatar and the nickname!
					case "avatar":

						//Getting author nickname inside
						comment_node.author.nickname = information_element[i]
										.getElementsByTagName("a").item(0).title;

						//Getting avatar link
						comment_node.author.avatar_uri = information_element[i]
										.getElementsByTagName("img").item(0).src;

						//Constructing profile link
						comment_node.author.profile_uri = comment_node.author
										.nickname.toLowerCase() + ".habrahabr.ru";

					break;

					//Comment date
					case "date":

						//Filling up date information in ISO-date [the hAtom uF]
						comment_node.comment.date = information_element[i]
										.getElementsByTagName("abbr").item(0).title;

					break;

					//Comment rating
					case "mark":

						//Sit down, you've just received an EPIC FAIL!
						comment_node.comment.rating = parseFloat(information_element[i]
										.getElementsByTagName("span").item(0).innerHTML);

					break;
				}
			}

		}
		catch (excp)
		{
			//UFO comment detected! Panic!
			comment_node.author.nickname = "UFO";

			comment_node.comment.pointer = comment_element;
		}

		return comment_node;
	}

	//Comment sorting
	this.sort_comments_branches = function(value)
	{
		//Checking children existence
		if (!this.comment_root.children_exists())
		{
			return;
		}

		//This option doesn't exists
		if (this.comment_root.comment[value.type] == null &&
			this.comment_root.author[value.type]  == null)
		{
			return;
		}

		//Getting root block
		var root_block = this.comment_root.children[0].comment.pointer.parentNode;

		if (value.order == "asc")
		{
			//Ascending sort
			for (var i = this.comment_root.children.length - 1; i >= 0; i--)
			{
				//alert(this.comment_root.children[i].comment.pointer);
				root_block.appendChild(this.comment_root.children[i].comment.pointer);

				//this.comment_root.children.push(this.comment_root.children.shift());
			}
		}
		else
		{
			//Descending sort
			for (var i = 0; i < this.comment_root.children.length; i++)
			{
				//alert(this.comment_root.children[i].comment.pointer);
				root_block.appendChild(this.comment_root.children[i].comment.pointer);

				//this.comment_root.children.push(this.comment_root.children.shift());
			}
		}

	}

	this.filter_new = function(append_filter)
	{
		//Checking children existence
		if (!this.comment_root.children_exists())
		{
			return;
		}

		//Traversing through nodes
		for (var i = this.comment_root.children.length - 1; i >= 0; i--)
		{
			if (append_filter)
			{
				var hide_branch = true;

				var find_branch = function(element)
				{
					if (element.comment.pointer.getElementsByTagName("div").item(0).className.match("new-reply"))
					{
						hide_branch = false;
						return true;
					}
				}

				find_branch(this.comment_root.children[i]);

				this.traverse_comments(find_branch, 0, this.comment_root.children[i]);

				if (hide_branch)
					this.comment_root.children[i].comment.pointer.className += " invisible";

			}
			else
			{
				this.comment_root.children[i].comment.pointer.className =
							this.comment_root.children[i].comment.pointer.className.replace(/invisible/, "");
			}
		}
	}

	this.filter_text = function(filter_words)
	{
		//Checking children existence
		if (!this.comment_root.children_exists())
		{
			return;
		}

		var find_elements = function(element)
		{
			if (filter_words == false)
			{
				try
				{
					element.comment.pointer.className =
							element.comment.pointer.className.replace(/filtered-word/, "");

					var block_message = element.comment.pointer.getElementsByTagName("h4");

					if (block_message.length != 0)
						element.comment.pointer.removeChild(block_message.item(0));
				}
				catch (e)
				{
					return true;
				}
			}
			else
			{
				if (element.comment.pointer.getElementsByTagName("div").item(1)
							.innerHTML.indexOf("+1") != -1)
				{
					var v_content = document.createElement("h4");
					v_content.style.marginTop = "0.4em";
					v_content.style.marginBottom = "1em";
					v_content.innerHTML = "Вырезано злобным фильтром цензуры";

					element.comment.pointer.insertBefore(v_content, element.comment.pointer.firstChild);

					element.comment.pointer.className += " filtered-word";
				}
			}
		}

		this.traverse_comments(find_elements);
	}
}

/* CommentsFx panel */
var CommentsFx =
{

	//User interface links
	ui :
	{
		"root"		: document.createElement("div"),
		"panel"     : null,// document.getElementById("commentsfx-panel"),

		"indicator" : null,// document.getElementById("commentsfx-indicator"),
		"minimize"  : null,// document.getElementById("commentsfx-minimize"),

		"useradd"	: null,// document.getElementById("comments-user-add"),
		"userlist"  : null,// document.getElementById("comments-user-list")
	},

	//Comments tree
	comments: false,

	//Collected data
	information :
	{
		"users"   : {},
		"ratings" : [],
	},

	//Initialization routine
	initialize : function()
	{
		//Appending CSS information
		var head, style;
    	head = document.getElementsByTagName('head')[0];
    	style = document.createElement('style');
    	style.type = 'text/css';
    	style.innerHTML = '#commentsfx{padding: 0.3em 0.7em 0.3em 1.3em;margin: 0 0 1.4em 0;background: #eee;color: #555;-moz-border-radius: 0.7em;}'+
						  '#commentsfx select{width: 15em;}#commentsfx fieldset{margin: 1em 0 0 0;padding: 0;border: none;}' +
						  '#commentsfx fieldset legend{padding-left: 0;font-weight: bolder;color: #888;}' +
						  '#commentsfx input, #commentsfx textarea{margin: 0;padding: 0;}' +
						  '#commentsfx a{color: #555;text-decoration: none;border-bottom: dotted 1px #444;}' +
						  '#commentsfx a:hover{color: #888;border-bottom: dotted 1px #888;}' +
						  '#commentsfx label:hover{color: #444;}' +
						  '#commentsfx.minimized #commentsfx-panel{display: none;}' +
						  '#commentsfx.minimized {height: 2em;}'+
						  '#commentsfx .title{float: right;margin: 0.4em;color: #aaa;border-bottom: dotted 1px #aaa;font-variant: small-caps;}' +
						  '#commentsfx span.title{border-bottom: none;}' +
						  '#commentsfx .sort{margin: 0 0.7em 0 0.2em;font-style: italic;}' +
						  '#commentsfx .down{color: #2E923F;}' +
						  '#commentsfx .up{color: #888D1B;}' +
						  '.linear .hentry .hentry{margin-left: 0;}' +
						  '.invisible, .filtered-word > div, .author-hide > div{display: none;}' +
						  '#comments-user-list{list-style: decimal;margin-left: 2em;color: #666;}' +
						  '#comments-user-list li{margin-bottom: 0.7em;}' +
						  '#comments-user-list strong{margin-right: 0.7em;float: left;width: 10em;}' +
						  '#comments-user-list .selected{font-weight: bolder;}' +
						  '.author-highlight > div.msg-meta{background: #7DEC75;color: #111;font-weight: bolder;}' +
						  '.author-highlight > div.msg-meta a{color: #333;}';

		head.appendChild(style);


		//Firstly, we should create HTML for our purposes
		CommentsFx.ui.root.innerHTML = '<a title="Поменять видимость панели CommentsFx" class="title" id="commentsfx-minimize" href="javascript: void(0);">×</a>' +
			'<span title="HabraFx: CommentsFx" class="title" id="commentsfx-indicator" >CommentsFx</span>' +

			'<div id="commentsfx-panel">' +

			'<fieldset>' +

				'<legend>Сортировка</legend>' +

				'<p>' +
				'	Сортировать комментарии по ' +
				/*	<!--<a id="comments-sort-rating" class="sort down" href="javascript: void(0);">рейтингу &darr;</a>--> */
				'	<a id="comments-sort-date" class="sort down" href="javascript: void(0);" >дате &darr;</a>' +
				'</p>' +

				/*<!--<p>
					<input type="checkbox" id="comments-sort-bubble" />
					<label for="comments-sort-bubble" >Поднимать ветки комментариев по дате</label>
				</p>-->*/

				'<p>' +
				'	<input type="checkbox" id="comments-sort-new" />' +
				'	<label for="comments-sort-new">Показывать только ветки с новыми комментариями</label>' +
				'</p>' +

				'<p>' +
				'	<input type="checkbox" id="comments-sort-linear" />' +
				'	<label for="comments-sort-linear">Показывать комментарии в линейном режиме (без иерархии)</label>' +
				'</p>' +

			'</fieldset>' +

			'<fieldset>' +

				'<legend>Пользователи</legend>' +

				'<p>' +
					'Выберите пользователя для истязаний:' +
					'<select id="comments-user-add" disabled="true">' +
					'	<option value="!empty" selected="selected" style="color: #aaa;">Я жду вашего выбора</option>' +
					'</select>' +
				'</p>' +

				'<ol id="comments-user-list">' +
				'</ol>' +

			'</fieldset>' +

			'<fieldset>' +

				'<legend>Фильтрация</legend>' +

				'<p>' +
					'<input type="checkbox" id="comments-filter-auto" /> ' +
					'<label for="comments-filter-auto"> Скрывать бессмысленные комментарии («+1», «хабракат», и т.п.)</label>' +
				'</p>' +

			'</fieldset>' +

			'</div>';

		//Appending HTML block
		CommentsFx.ui.root.id = "commentsfx";
		document.getElementById("comments").insertBefore(CommentsFx.ui.root,
								document.getElementById("comments").firstChild.nextSibling.nextSibling);

		//Getting elements
		CommentsFx.ui.panel     = document.getElementById("commentsfx-panel");
		CommentsFx.ui.indicator = document.getElementById("commentsfx-indicator");
		CommentsFx.ui.minimize  = document.getElementById("commentsfx-minimize");
		CommentsFx.ui.useradd   = document.getElementById("comments-user-add");
		CommentsFx.ui.userlist  = document.getElementById("comments-user-list");



		//Inline method for comments initialization
		var fill_information = function(comment)
		{

			if (CommentsFx.information.users[comment.author.nickname] == null ||
				CommentsFx.information.users[comment.author.nickname] == undefined)
			{
				CommentsFx.information.users[comment.author.nickname] = [];
			}

			CommentsFx.information.users[comment.author.nickname].push(comment);

			CommentsFx.information.ratings.push(comment.comment.rating);
		}

		//Creating and retreiving comments collection
		CommentsFx.comments = new CommentTree();
		CommentsFx.comments.retreive_comments(null, fill_information);

		//Setting up UI
		CommentsFx.setup_ui();

		//Setting up options
		CommentsFx.setup_options();
	},

	//Setting indicator text
	set_indicator_text : function(text)
	{
		if (text == null)
		{
			//Default value
			text = "";
		}
		else
		{
			text += " &bull; ";
		}

		CommentsFx.ui.indicator.innerHTML = text + " CommentsFx";
	},

	//Setting up UI components
	setup_ui : function()
	{
		/* Minimization */

		//Minimizing method
		var minimize_on_startup = function()
		{
			//Hiding CommentsFx panel
			if (CommentsFx.ui.root.className == "minimized")
			{
				CommentsFx.ui.root.className = "";
				this.innerHTML = "×";

				CommentsFx.set_indicator_text();

				//Saving property
				Store.set_value("minimize_on_startup", "0");
			}
			else
			{
				CommentsFx.ui.root.className = "minimized";
				this.innerHTML = "&#959;";

				CommentsFx.set_indicator_text("Настройки комментариев");


				//Saving property
				Store.set_value("minimize_on_startup", "1");
			}

		}

		//Hiding action
		CommentsFx.ui.minimize.addEventListener("click", minimize_on_startup, false);

		//On load setupment
		if (Store.test_value("minimize_on_startup", "0"))
		{
			//Showing panel

			CommentsFx.ui.root.className = "";
			CommentsFx.ui.minimize.innerHTML = "×";

			CommentsFx.set_indicator_text();
		}
		else
		{
			CommentsFx.ui.root.className = "minimized";
			CommentsFx.ui.minimize.innerHTML = "&#959;";

			CommentsFx.set_indicator_text("Настройки комментариев");
		}

		/* Initialization of the user list */

		var users = CommentsFx.information.users;

		for (user in users)
		{
			var element = document.createElement("option");
			element.value = user;
			element.innerHTML = user;

			CommentsFx.ui.useradd.appendChild(element);
		}

		CommentsFx.ui.useradd.disabled = false;

		/* User list actions */

		CommentsFx.ui.useradd.addEventListener("change", function()
		{
			if (CommentsFx.ui.useradd.value == "!empty")
			{
				return;
			}

			//Unoptimized shit
			var xhtml = '<strong>' + CommentsFx.ui.useradd.value + '</strong>' +
						'<a class="sort" id="commentsfx-userlist-' + CommentsFx.ui.useradd.value + '-highlight"  href="javascript: void(0);">подсветить</a>' +
						'<a class="sort" id="commentsfx-userlist-' + CommentsFx.ui.useradd.value + '-hide" href="javascript: void(0);">спрятать</a>' +
						'<a class="sort" id="commentsfx-userlist-' + CommentsFx.ui.useradd.value + '-destroy" href="javascript: void(0);" style="font-weight: bolder;">×</a>';

			//Creating list element
			var newelement = document.createElement("li");
			newelement.innerHTML  = xhtml;

			CommentsFx.ui.userlist.appendChild(newelement);

			document.getElementById("commentsfx-userlist-" + CommentsFx.ui.useradd.value + "-highlight")
					.setAttribute("_username", CommentsFx.ui.useradd.value);
			document.getElementById("commentsfx-userlist-" + CommentsFx.ui.useradd.value + "-highlight")
					.addEventListener("click", function(e)
			{

				CommentsFx.userlist_filter(this, "highlight", this.getAttribute("_username"));
			}, false);

			document.getElementById("commentsfx-userlist-" + CommentsFx.ui.useradd.value + "-hide")
					.setAttribute("_username", CommentsFx.ui.useradd.value);
			document.getElementById("commentsfx-userlist-" + CommentsFx.ui.useradd.value + "-hide")
					.addEventListener("click", function(e)
			{

				CommentsFx.userlist_filter(this, "hide", this.getAttribute("_username"));
			}, false);

			document.getElementById("commentsfx-userlist-" + CommentsFx.ui.useradd.value + "-destroy")
					.setAttribute("_username", CommentsFx.ui.useradd.value);
			document.getElementById("commentsfx-userlist-" + CommentsFx.ui.useradd.value + "-destroy")
					.addEventListener("click", function(e)
			{

				CommentsFx.userlist_filter(this, "destroy", this.getAttribute("_username"));
			}, false);

		}, false);
	},

	//User list actions
	userlist_filter : function(element, action, username)
	{
		switch (action)
		{
			case "highlight":

				if (element.getAttribute("_checked") == null)
					element.setAttribute("_checked", "true");

				if (element.getAttribute("_checked") == "false")
				{
					element.className = "sort";

					//Unhighlight all author comments
					element.setAttribute("_checked", "true");

					for (var i = 0; i < CommentsFx.information.users[username].length; i++)
					{
						if (username == CommentsFx.information.users[username][i].author.nickname)
							CommentsFx.information.users[username][i].comment.pointer.className =
							 CommentsFx.information.users[username][i].comment.pointer.className.replace(/author\-highlight/, "");
					}
				}
				else
				{
					element.className = "sort selected";

					//Highlight all author comments
					element.setAttribute("_checked", "false");

					//Highlighting
					for (var i = 0; i < CommentsFx.information.users[username].length; i++)
					{
						if (username == CommentsFx.information.users[username][i].author.nickname)
							CommentsFx.information.users[username][i].comment.pointer.className += " author-highlight";
					}
				}

			break;

			case "hide":

				if (element.getAttribute("_checked") == null)
					element.setAttribute("_checked", "true");

				if (element.getAttribute("_checked") == "false")
				{
					element.className = "sort";

					//Unhighlight all author comments
					element.setAttribute("_checked", "true");

					for (var i = 0; i < CommentsFx.information.users[username].length; i++)
					{
						if (username == CommentsFx.information.users[username][i].author.nickname)
						{
							CommentsFx.information.users[username][i].comment.pointer.className =
							CommentsFx.information.users[username][i].comment.pointer.className.replace(/author-hide/, "");

							var block_message = CommentsFx.information.users[username][i].comment.pointer.getElementsByTagName("h3");

							if (block_message.length != 0)
								CommentsFx.information.users[username][i].comment.pointer.removeChild(block_message.item(0));
						}
					}
				}
				else
				{
					element.className = "sort selected";

					//Highlight all author comments
					element.setAttribute("_checked", "false");

					//Highlighting
					for (var i = 0; i < CommentsFx.information.users[username].length; i++)
					{
						if (username == CommentsFx.information.users[username][i].author.nickname)
						{
							var v_content = document.createElement("h3");
							v_content.style.marginTop = "0.4em";
							v_content.style.marginBottom = "1em";
							v_content.innerHTML = "Вырезано злобным фильтром цензуры";

							CommentsFx.information.users[username][i].comment.pointer.insertBefore(v_content, CommentsFx.information.users[username][i].comment.pointer.firstChild);

							CommentsFx.information.users[username][i].comment.pointer.className += " author-hide";
						}
					}
				}

			break;

			case "destroy":

				for (var i = 0; i < CommentsFx.information.users[username].length; i++)
				{
					if (username == CommentsFx.information.users[username][i].author.nickname)
						CommentsFx.information.users[username][i].comment.pointer.className =
						 CommentsFx.information.users[username][i].comment.pointer.className.replace(/author\-highlight/, "");
				}

				for (var i = 0; i < CommentsFx.information.users[username].length; i++)
				{
					if (username == CommentsFx.information.users[username][i].author.nickname)
					{
						CommentsFx.information.users[username][i].comment.pointer.className =
						CommentsFx.information.users[username][i].comment.pointer.className.replace(/author-hide/, "");

						var block_message = CommentsFx.information.users[username][i].comment.pointer.getElementsByTagName("h3");

						if (block_message.length != 0)
							CommentsFx.information.users[username][i].comment.pointer.removeChild(block_message.item(0));
					}
				}

				//Hiding current user from list and restoring its settings
				element.parentNode.parentNode.removeChild(element.parentNode);

			break;
		}
	},

	//Listening for options changement
	setup_options: function()
	{
		//Sorting by date
		Options.listen("comments-sort-date", function(new_value, sender)
		{

			if (!new_value)
			{
				sender.className = "sort up";
				sender.innerHTML = "дате &uarr;";

				CommentsFx.comments.sort_comments_branches({"type" : "date", "order" : "asc"});
			}
			else
			{
				sender.className = "sort down";
				sender.innerHTML = "дате &darr;";

				CommentsFx.comments.sort_comments_branches({"type" : "date", "order" : "desc"});
			}

		});

		//Linear mode
		Options.listen("comments-sort-linear", function(new_value, sender)
		{
			if (!new_value)
			{
				document.getElementById("comments").className += " linear";
			}
			else
			{
				document.getElementById("comments").className = "";
			}
		});

		//Only new comments
		Options.listen("comments-sort-new", function(new_value, sender)
		{
			if (!new_value)
			{
				CommentsFx.comments.filter_new(true);
			}
			else
			{
				CommentsFx.comments.filter_new(false);
			}
		});


		//Filter comments
		Options.listen("comments-filter-auto", function(new_value, sender)
		{
			if (new_value)
			{
				CommentsFx.comments.filter_text(false);
			}
			else
			{
				CommentsFx.comments.filter_text(["+1", "спасибо за статью", "!111111", "хабракат"]);
			}
		});
	},

};

//Calling initializer
CommentsFx.initialize();

