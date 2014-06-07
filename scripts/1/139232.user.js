// ==UserScript==
// @name        HUJI Moodle Forum Post Format Fixer
// @namespace   HUJI
// @version     2.1
// @description	Adds "change direction" link to the forum posts in the moodle of the Hebrew University of Jerusalem, so it is easier to read posts combined Hebrew and English in the same paragraph
// @include     http://moodle.cs.huji.ac.il/cs*/mod/forum/discuss.php?*
// @include     http://moodle.cs.huji.ac.il/cs*/mod/forumng/discuss.php?*
// @include     http://moodle.cs.huji.ac.il/cs*/mod/forumng/view.php?*
// @include     http://moodle.huji.ac.il/hu*/mod/forum/discuss.php?*
// ==/UserScript==

if (document.location.href.indexOf("forumng/view.php") >= 0)
{
	// HUJI CS appeal forum page
	// Preparation: need to set the "&expand=1" in order to show all the posts in the post page (otherwise, only the
	// first post will be shown, the rest will need to be loaded using the "[Expand]" command in the post content
	
	var links = document.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++)
	{
		if (links[i].href.indexOf("discuss.php") >= 0)
		{
			links[i].href += "&expand=1";
		}
	}
}
else
{
	// Some forum post page (HUJI or HUJI CS)
	
	// The basic change direction command
	var linkClick = "parentStyle.textAlign = (parentStyle.direction == 'rtl' ? 'left' : 'right');";
	linkClick += "parentStyle.direction = (parentStyle.direction == 'rtl' ? 'ltr' : 'rtl');";
	linkClick += "this.blur();";
	
	// The parent variable will contain the parent (the post content) style attribute

	if (document.location.href.indexOf("forumng") >= 0)
	{
		// HUJI CS appeal forums
		var commands = document.getElementsByClassName("forumng-commands");
		var parent = "var parentStyle = this.parentNode.parentNode.parentNode.parentNode.style;";
		linkClick = parent + linkClick;
	
		for (var i = 0; i < commands.length; i++)
		{
			commands[i].innerHTML += "<li class=\"forumng-replylink\"><a href=\"javascript: void(0);\" onclick=\"" + linkClick + "\"> Change direction </a></li>";
			commands[i].style.direction = "ltr";
			// Since the change influences the command bar too, we need to set a direction to avoid it
		}
	}
	else
	{
		// Regular HUJI CS or HUJI forums
		var commands = document.getElementsByClassName("commands");
		var parent = "var parentStyle = this.parentNode.parentNode.getElementsByClassName('posting')[0].style;";
		linkClick = parent + linkClick;
	
		for (var i = 0; i < commands.length; i++)
		{
			commands[i].innerHTML += " | <a href=\"javascript: void(0);\" onclick=\"" + linkClick + "\"> Change direction </a>";
		}
	}
}