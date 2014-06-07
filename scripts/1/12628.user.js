// ==UserScript==
// @name		Gallery Toolbox
// @namespace		http://boffinbrain.deviantart.com/
// @description		Instantly edit your deviations and journals, and get links to deviations from any gallery or prints page.
// @include		http://*.deviantart.com/*
// ==/UserScript==


// Change this value to false if you want to speed up your browser.
// Use the Greasemonkey menu to invoke the thumbnail tools.
var autoload = true;

var version = "1.7";


if(!document.getElementById("deviantART-v5")) return;

var deviantname = window.location.hostname.substring(0, window.location.hostname.indexOf("."));
var username = "";
try {username = unsafeWindow.deviantART.deviant.username.toLowerCase();} catch(e) {return;}


journalTools();
thumbnailTools(false);
GM_registerMenuCommand("Add Thumbnail Tools", function(){thumbnailTools(true);});
if(window.location.href.indexOf("/submit/deviation?deviationId=")>0) editDevTitle();
if(window.location.href.indexOf("/art/")>0) bigThumb();


function xpath(query)
{
	// Standard XPATH shorthand function
	try
	{
		return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	catch(e)
	{
		return content.document.evaluate(query, content.document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
}

function journalTools()
{
	// Add an Edit link in the top-right corner of each journal
	if(!(document.getElementById("deviant") && deviantname==username)) return;

	var journals = xpath("//div[contains(@class,'journalcontrol')]");
	if(!journals.snapshotItem(0)) return;

	GM_addStyle
	([
		"a.journal-toolbox 		{position:absolute; top:2px; right:2px; z-index:1000; opacity:0.6}",
		"a.journal-toolbox:hover	{opacity:1;}"
	].join("\n"));

	var journal;
	for(var i=0; journal = journals.snapshotItem(i); i++)
	{
		var jid = journal.id.split("-")[1];

		var journal_editor_icon = document.createElement("img");
		    journal_editor_icon.alt = "Edit";
		    journal_editor_icon.title = "Edit this journal";
		    journal_editor_icon.src = "http://i.deviantart.com/icons/activity/journal.gif";

		var journal_editor_link = document.createElement("a");
		    journal_editor_link.href = "http://my.deviantart.com/journal/edit/"+jid;
		    journal_editor_link.className = "journal-toolbox";
		    journal_editor_link.appendChild(journal_editor_icon);

		journal.appendChild(journal_editor_link);
	}
}

function thumbnailTools(manual_load)
{
	// Add useful links and gadgets underneath gallery thumbnails
	var divs = xpath("//div[@class='stream']/div");
	if(!divs.snapshotItem(0))
	{
		if(manual_load) alert("There are no thumbnails on this page.");
		return;
	}

	var toolboxnode = document.getElementById("gallery-toolbox-0");
	if(toolboxnode)
	{
		alert("It would appear that thumbnail tools have already been added to this stream.");
		return;
	}

	// These are template gadgets that will be cloned for each thumbnail.

	var gallery_toolbox_box = document.createElement('div');
	    gallery_toolbox_box.className = "gallery-toolbox";
	    gallery_toolbox_box.id = "gallery-toolbox-";

	var edit_icon = document.createElement('img');
	    edit_icon.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAACB0RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgTVi7kSokAAAAFnRFWHRDcmVhdGlvbiBUaW1lADA5LzI4LzA3qlVMnwAAA0JJREFUeJydlUtoXFUYx3/nnvuamUxzp4mTdNRaoV1F6CLWUklAkNSFqKWdGtDGUEG6cNEiuOlC3SklKWIRH6G1WhciIr73UolJTOmLSh/KpLbpzNxOTUMiZCb33ONiZuJ07qSK/9XhnI/f+R7nO5/QWtNKQoj6QSewoLWutDRsIWM14Nhnx3jpwD6AEpARQtj/GyqE0Ff+uMLUxCSnp0/Xt3NAWQihY7GYjsVi2kt52kt5umtdl/ZSnhZCdNQvFo3h14G5qzPkiwWGs0OMHBnBSSaIxxO4joMhBKZpRbx7+cV9+AX/QeCGeTfg08/uYHxyAtd1saSF6VgIITBkNUAdhgDcv349fsEH2AAsmKsBj356nGQizhrPI5lMcvbihWq+DMHzOwYRQiCFwf6DryAMWfetDbDNOvDQ4RH6+voYzg6xc0+WZFsbW3sf4XpxltG3RyPhDu98DmlIpJToUEULlbs6w+5dWYazQxw5/h6u6+KlUnjt7Xz9/Tds3LSJT8Y+5vBbowSVgB+++pZiyaccVFBKEagW0O39A2zvHyDdnWaNm8C2HBKJOLcX5zn0+pvV/GlN3i/y2BOPowLFOx+8iw41KrgTWId2Ao8CTwHYiRh2zMaybNZ6a9navw3TlHz+3ZesS3dxfeYa+WuzEVAzdAG4DJwCsEwLKSWmWX0YSiveePU1ADo7OhnctRvDMfnt0uXVoVrritb6ltY633w4Nz9HJpPh2BcniLsuFy79ytSZ6ZagdHf6zpw2SmtdTX4QUF6qsGHjA/wyMUmx5DN1Zprc7zl6enpQgWLWz6OWW+c0olCFLC9XKM3dwpQO7e0etu2yd/AFeh/upSN9Dz2bH0IKsdIAjTKbN4QhEAJMKRsf9cplYVht66BWdWFE/YpAGw3HT/1MoMps2bKNZwaeBODmnzdX7Ap+pAyrQ6WUHD3xEaEKEQJOnvyR8fGfUEqhAkUYhBimwftjH2Jbzr9Dz50/R+be+zBMgzAI0eE/HWNKyeLCYnXtWCz9tYTrRr/Z5q+vI92dLrWMqabyUhmA+dvzuK6L4zo4roNf8PcCM8D5ZqgNZKh+YW13g7fQYg16QzTPqBo4Cfzn8VFThdos+xuZOlMwyuRuZwAAAABJRU5ErkJggg==";
	var edit_link = document.createElement('a');
	    edit_link.href = "http://www.deviantart.com/submit/deviation?deviationId=";
	    edit_link.title = "Edit this deviation";
	    edit_link.appendChild(edit_icon);

	var delete_icon = document.createElement('img');
	    delete_icon.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAACB0RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgTVi7kSokAAAAFnRFWHRDcmVhdGlvbiBUaW1lADA5LzI4LzA3qlVMnwAAAjtJREFUeJytlT1vE0EQhp8xKxcxiYWMLJCAOIQLhAoQDfSU/AE6/xEKWiQaCqpI/AwUKSIJJBIBRBEUiCjshNhIxhThfMTYtzsU9+EPkmBHjLR6d+/2nt2ZndkTVQVARBSYBDqq2hkeM47FUNWoo0AJ0CAI+sfZuD/cCkBWVelvFM8VNbEEFARB+iwBNJoN/bi9meqThacDi/ZDBTgN+KpKEASpB7lcDhEZy2vgLOAboAPMiEil1Wqlb0WExZUlDvwW5y9eoHimgDGGMAwxxgAQOovDggXFMjvtNYEZEx9KRVXxgx5UVRER7ty724PEwDAMAegehOn8d683km7JiIgmGaDOkZ/Ks/9zfwC8+mYNtT1AtMsu1grOWT592U6gZYAMMJnELj+VByjHiojw8PEjAJZeLeNwPV1ZBmB1fbV/LR+oZ/piCvAAqAO3RYS19TW+NxrMe3PUajW8ktfT3RpXL3tUK1UOfqUH/Bvwk5jWgRmivPsBNAG8Kx7WWswpg9MQa12qXdvFupB2u/1XCpg4dgm4Sa+imJiYGJis6IAeZSb9ICrF8crxCMv8D8hY0FwuB4Bz9lC17vAwjLRTF+dxGMNSVXty6NbnLQC+7u0O6M5O9WTQ0qVpALzZuQG9dn0eVcuNWzdp9ZU3gCQlOmwioi9eLrLx4S2hjd10ChkBp5Hr1gFQ3/vG82cLAPeB98dBC8RFMKKVgSqwaY6Z5BNVWYnozv2XtWKof+ROAUQkS/Sfyo4A7RBd9p0/ou1zXOiRUIYAAAAASUVORK5CYII=";
	var delete_link = document.createElement('a');
	    delete_link.href = "http://www.deviantart.com/delete/";
	    delete_link.title = "Delete this deviation";
	    delete_link.appendChild(delete_icon);

	var thumb_code = document.createElement('input');
	    thumb_code.value = ":thumb";
	    thumb_code.style.textAlign = "center";
	    thumb_code.style.width = "90px";
	    thumb_code.setAttribute("onclick", "this.select()");
	var thumb_icon = document.createElement('img');
	    thumb_icon.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOS8yOC8wN6pVTJ8AAAAgdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIE1Yu5EqJAAAAghJREFUeJyllU1PE1EUhp8z7UxnUdJICMG4EWKCinHDmDQB2mhM17qQuHZjovwXMZFf4QIV5A84o8a0G/xiYdDExGBrW+sUCq3MdSEznXbaQui7ufeee+4z7znJvSNKKXyJSHvRQ6ZpApAwE8F4sH9A7XdtDHCVUk0A8aEiop5urNJqtqi77iA2umGQHEkG64f37lPcKU4CP5RSzXj3gbrr8vLF2kDofDYTQD9vfaK4UwQ4D7hAOQL1tfRgCd00WNtYx92tc/fOItfTWW4t3u7IEy3mT5OAAaD1g05NTrH6/Bk3szeYu5bmycoKxXIpkqe8w0isLxRNePf6LXFT58L0NKViiVdvnEja38MB0PGJ8Y6NWCxGLpcjYZqcmziLJkKtWu3rIay+PW22WvxpuGx+fM/2t230hMHu3t6JoH3Lb+w30PUElUqVmYtXuDRzmdRoajhoufILTzwW0nOMnRlFAcrrfTe6W9e3/MePlgFY/rAVxL5/+XoipxGobhjMZzMDD6VSg9sQgSZHkh1X8DQSQInIUBAA/w1RSomIiPI8r/0VEUKPDOFX7FiH/81ltHDAcZzwJgCWZeE4ThDz80QEEcGyrGA80tWgp2FH4Xk+n8eyLGZnZ3uW7FejaYG/zQDqb9q2HSm7UChg23bYzXFt6OzpMPJ7Gu+yfmp1/JaO+rIwNLWtn/8A/37CDZkhzGQAAAAASUVORK5CYII=";
	var thumb_box = document.createElement('b');
	    thumb_box.title = "Thumbnail code";
	    thumb_box.appendChild(thumb_icon);
	    thumb_box.appendChild(thumb_code);

	var link_code = document.createElement('input');
	    link_code.style.textAlign = "center";
	    link_code.style.width = "90px";
	    link_code.setAttribute("onclick", "this.select()");
	var link_icon = document.createElement('img');
	    link_icon.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOS8yOC8wN6pVTJ8AAAAgdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIE1Yu5EqJAAAAVpJREFUeJy1lb9KA0EQh7+JoldoJ4l2WksQfA9f4poLXLo8x3UXuDRpFEEs7HyKszqigr2Gqww2JhjHxr1ccv+iR37N7uzOfsz8GFhRVYxEZBHkyLIsAHat3WSdfk6ZvE8OgA9VnQGIgYqI3t7flTEL5doO8Tg+AV5Vddb4FyWlp+dH4nEMcAzsA1RCXdspvZfGltnuATtrQauk3/PMWQZ6fXmFaztEoyg5S8fRKMK1naSDr3kJtHnYBKB9fkZ/OCDw/CSp0+smceD5dHpd+sNBYfW57a/62D5tl8aV0MDzM1WkrciLK6GdXjdTqWnZ3Aeev5RjrDNKhr911NIyn4oUjSICzycexxfAg6q+1R6pPG0EKoCKSG2QsVFVBRHRtMIw1HWUlwco4C5BwzBUoBJclPcLvVmCrgNcBf+5UvNoda2o1N2Ip9uqSqNRf7I0/S2pKiLi1qYu9PID4DjMvRfY7yYAAAAASUVORK5CYII=";
	var link_box = document.createElement('b');
	    link_box.title = "Link to deviation";
	    link_box.appendChild(link_icon);
	    link_box.appendChild(link_code);

	// Styles for the toolbox gadgets

	GM_addStyle
	([
		"div.stream>div 				{position:relative;}",
		"div.stream>div div.gallery-toolbox		{visibility:hidden; display:block; position:absolute; width:60%; margin:0 20%; padding-top:5px; white-space:nowrap;}",
		"div.stream>div:hover div.gallery-toolbox	{visibility:visible; z-index:10;}",
		"div.stream div.gallery-toolbox img		{opacity:0.4; vertical-align:top; margin:0 3px;}",
		"div.stream div.gallery-toolbox img:hover	{opacity:1;}",
		"div.stream div.gallery-toolbox b		{position:relative;}",
		"div.stream div.gallery-toolbox b input		{display:none;}",
		"div.stream div.gallery-toolbox b:hover input	{display:block; position:absolute; top:20px; left:-35px;}"
	].join("\n"));
	
	/*GM_addStyle
	([
		"div.stream>div 				{position:relative;}",
		"div.stream>div div.gallery-toolbox		{visibility:hidden; display:block; position:absolute; width:60%; margin:0 20%; padding-top:5px; white-space:nowrap;}",
		"div.stream>div:hover div.gallery-toolbox	{visibility:visible; z-index:10;}",
		"div.stream div.gallery-toolbox img		{opacity:0.4; vertical-align:top; margin:0 3px;}",
		"div.stream div.gallery-toolbox img:hover	{opacity:1;}",
		"div.stream div.gallery-toolbox b		{position:relative;}",
		"div.stream div.gallery-toolbox b input		{display:none;}",
		"div.stream div.gallery-toolbox b:hover input	{display:block; position:absolute; top:20px; left:-35px;}"
	].join("\n"));*/

	// Iterate over all thumbnails

	var div;
	for(var i=0; div=divs.snapshotItem(i); i++)
	{
		var link = div.getElementsByTagName('a')[1];
		if(!link || link.href.indexOf("browse.")>0) link = div.getElementsByTagName('a')[0];
		var href = link.href;
		var creator = href.substring(7, href.indexOf("."));
		if(href.indexOf("/art/")>0) // Is it a deviation?
		{
			var split = href.split("-");
			var id = split[split.length-1];
			var name = link.innerHTML;

			var container = gallery_toolbox_box.cloneNode(true);
			    container.id += i;

			var thumb_node = thumb_box.cloneNode(true);
			    thumb_node.childNodes[1].value += id+":";
			container.appendChild(thumb_node);

			var link_node = link_box.cloneNode(true);
			    link_node.childNodes[1].value += '<a href="'+href+'">'+name+'</a> by :dev'+creator+':';
			container.appendChild(link_node);

			if(creator==username) // Is it your own art?
			{
				var edit_node = edit_link.cloneNode(true);
				    edit_node.href += id;
				container.appendChild(edit_node);

				var delete_node = delete_link.cloneNode(true);
				    delete_node.href += id+"/";
				container.appendChild(delete_node);
			}

			link.parentNode.appendChild(container);
		}
		else // Otherwise, it must be a print
		{
			link = div.getElementsByTagName('a')[0]
			href = link.href;
			if(href.indexOf("/print/")>0)
			{
				var split = href.split("/");
				var id = split[split.length-2];
				var name = link.innerHTML;

				var container = gallery_toolbox_box.cloneNode(true);
				    container.id += i;

				var thumb_node = thumb_box.cloneNode(true);
				    thumb_node.childNodes[1].value = ":shop"+id+":";
				container.appendChild(thumb_node);

				link.parentNode.parentNode.appendChild(container);
			}
		}
	}
}

function editDevTitle()
{
	// When editing a deviation, make the window title more useful so that you can recognise it in a tab.
	var devTitle = document.getElementById("devtitle");
	if(devTitle) document.title = "Edit: "+devTitle.value;
}

function bigThumb()
{
	var details = xpath("//div[@class='details']").snapshotItem(0);
	if(!details) return;

	var smallview = '';
	try
	{
		smallview = unsafeWindow.deviantART.pageData.smallview;
	}
	catch(e)
	{
		return;
	}
	
	details.appendChild(document.createElement("br"));
	
	var b = document.createElement("strong");
	    b.appendChild(document.createTextNode("Big Thumb"));
	details.appendChild(b);

	details.appendChild(document.createElement("br"));
	
	var thumbbox = document.createElement("input");
	    thumbbox.type = "text";
	    thumbbox.value = '<a href="'+window.location+'"><img src="'+smallview.src+'" alt="'+document.title+'" width="'+smallview.width+'" height="'+smallview.height+'" /></a>';
	    thumbbox.setAttribute("onclick", "this.select()");
	details.appendChild(thumbbox);
}
