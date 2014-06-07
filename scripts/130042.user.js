// ==UserScript==
// @name           KickThreader
// @namespace      KickThreader
// @description    Threads the comments tab of Kickstarter.
// @include        http*//www.kickstarter.com/projects/*/comments
// @include        http*//kickstarter.com/projects/*/comments
// @include        http*//www.kickstarter.com/projects/*/comments?*
// @include        http*//kickstarter.com/projects/*/comments?*
// ==/UserScript==

(function()
{
	var buildAuthorList;
	var addIndent;

	var commentIndex;
	var commentList;
	var commentListLength;
	var referencePattern;
	var paragraphList;
	var paragraphListLength;
	var paragraphIndex;
	var text;
	var authorIndex;
	var authorList;
	var reference;
	var authorIndex;
	var authorItem;
	var space;
	var indent;
	var commentNextStyle;
	var commentNextMargin;
	var commentItem;
	var commentIndent;
	var nextReferenceItem;
	var cutIndex;
	var nextCommentStyle;
	var container;
	var textList;
	var referenceGroup;
	var lostReferencePattern;
	var replacement;
	var spacePattern;
	var cut;
	var votePattern;
	var paragraphListList;
	var paragraphListIndex;
	var newParagraph;
	var boldPattern;
	var italicPattern;
	var underlinePattern;
	var emdashPattern;
	var emoticonPattern;
	var heartPattern;
	var immediateReferencePattern;
	var accent;

	buildAuthorList = function(commentList, commentIndex, commentListLength)
	{
		var authorList;
		var authorIndex;

		authorList = new Array(commentListLength);
		for(authorIndex = commentIndex + 1; authorIndex < commentListLength; authorIndex++)
			authorList[authorIndex] = ((commentList[authorIndex].getElementsByClassName("author")[0] || {}).textContent || "").toLowerCase().replace(new RegExp("\\s\\s+"), " ");

		return(authorList);
	};

	addIndent = function(style, oldIndent, indentSize, remainder)
	{
		var newIndent;

		newIndent = oldIndent + indentSize;
		if(newIndent > indentSize * 3)
			newIndent = indentSize * 3;
		style.marginLeft = newIndent + "px";
		remainder.getElementsByClassName("main")[0].style.width = 530 - newIndent + "px";

		return;
	};

	accent = [];
	for(commentIndex = 192; commentIndex < 256; commentIndex++)
		accent.push(String.fromCharCode(commentIndex));
	accent = accent.join("");

	commentListLength = (commentList = Array.prototype.slice.call(document.getElementsByClassName("comment"))).length;
	referencePattern = new RegExp("@(((?:[-']? ?|\\.)[\\w" + accent + "]+){1,3})([:\\-,\\.]?)(?=[^\\w" + accent + "]|$)", "g");
	weakReferencePattern = new RegExp("^((?:Thanks|Hi|Hello|Hey),? |#?)([\\w" + accent + "]+(?:[\\-\\.'][\\w" + accent + "]+)?(?: [A-Z][\\w" + accent + "]+)?(?:[\\-\\.'][\\w" + accent + "]+)?)([:,\\.\\n<;]| -)", "g");
	lostReferencePattern = new RegExp("([^>0-9a-zA-Z]|<br>|^)(@ ?[\\w" + accent + "]+[:\\-,]?)", "g");
	immediateReferencePattern = new RegExp("([^>0-9a-zA-Z]|<br>|^)(\\^\\^+|vv+)", "g");
	spacePattern = new RegExp(" ", "g");
	votePattern = new RegExp("(^|<br>|[^>0-9a-zA-Z])(\\+1(?: +(?:to|for)(?: +[\\w" + accent + "]+)+)|\\+1)(?=[^0-9kK][^0-9kK]|[^0-9kK]$|$)", "g");
	separatorPattern = new RegExp("<br>\\s*-{0,3}\\s*(?:<br>)+", "g");
	boldPattern = new RegExp("(^|[>(\\s\\.,;:'\"\\-])\\*([^\\*\\n]*?)\\*($|[!\\s\\.,;:'\"\\-)])", "g");
	italicPattern = new RegExp("(^|[>(\\s\\.,;:'\"\\-])/([^/\\n ](?:[^/\\n]*?[^/\\n ]|))/($|[!\\s\\.,;:'\"\\-)])", "g");
	underlinePattern = new RegExp("(^|[>(\\s\\.,;:'\"\\-])_([^_\\n]*?)_($|[!\\s\\.,;:'\"\\-)])", "g");
	emdashPattern = new RegExp("([^-]|^)--([^-]|$)", "g");
	emoticonPattern = new RegExp("( |^|<br>|</b>|</span>)((?:&gt;)?[:;8=]'?[-~^o]?[()DOpP|\\]\\\\]|[xX]D)([D)(]*)(?=[^m]|$)", "g");
	heartPattern = new RegExp("( |^|<br>|</b>|</span>)(&lt;3)", "g");
	indent = 84;
	for(commentIndex = 0; commentIndex < commentListLength; commentIndex++)
	{
		textList = new Array(paragraphListLength = (paragraphList = Array.prototype.slice.call(commentList[commentIndex].getElementsByTagName("p"))).length);
		for(paragraphIndex = 0; paragraphIndex < paragraphListLength; paragraphIndex++)
			textList[paragraphIndex] = paragraphList[paragraphIndex].textContent || "";
		text = textList.join("\n");
		referencePattern.lastIndex = 0;
		reference = null;
		while(referenceGroup = referencePattern.exec(text))
		{
			reference = referenceGroup[1].toLowerCase();
			if(space = reference.charAt(0) == " ")
				reference = reference.substr(1);
			authorList || (authorList = buildAuthorList(commentList, commentIndex, commentListLength));
			for(authorIndex = commentIndex + 1; authorIndex < commentListLength; authorIndex++)
				if(reference.indexOf(authorList[authorIndex]) == 0)
				{
					reference = authorList[authorIndex];
					break;
				}
			if(authorIndex == commentListLength)
			{
				if((cutIndex = reference.indexOf(" ")) > -1 || (cutIndex = reference.indexOf("-")) > -1)
					reference = reference.substr(0, cutIndex);
				if(reference.length + referenceGroup[3].length > 1)
				{
					for(authorIndex = commentIndex + 1; authorIndex < commentListLength; authorIndex++)
						if((cutIndex = authorList[authorIndex].indexOf(reference)) == 0 || (cutIndex > -1 && " -'".indexOf(authorList[authorIndex].charAt(cutIndex - 1)) > -1))
							break;
					if(authorIndex == commentListLength)
					{
						if((cutIndex = reference.indexOf("-")) > -1)
							reference = reference.substr(0, cutIndex);
						if(reference.length + referenceGroup[3].length > 1)
							for(authorIndex = commentIndex + 1; authorIndex < commentListLength; authorIndex++)
								if((cutIndex = authorList[authorIndex].indexOf(reference)) == 0 || (cutIndex > -1 && " -'".indexOf(authorList[authorIndex].charAt(cutIndex - 1)) > -1))
									break;
					}
				}
			}
			else
				cutIndex = null;
			if(authorIndex == commentListLength)
			{
				cutIndex = -1;
				for(authorIndex = commentIndex + 1; authorIndex < commentListLength; authorIndex++)
					if(reference.indexOf(authorList[authorIndex].replace(spacePattern, "")) == 0)
					{
						reference = authorList[authorIndex];
						break;
					}
			}
			if(authorIndex < commentListLength && (cutIndex == null || reference != "all"))
			{
				commentItem = commentList[commentIndex];
				container = commentItem.parentNode;
				commentIndent = parseInt(commentItem.style.marginLeft) || 0;
				referenceNext = commentList[authorIndex].nextElementSibling;
				while(commentItem.nextElementSibling && (commentNextMargin = parseInt((commentNextStyle = commentItem.nextElementSibling.style).marginLeft)) > commentIndent)
				{
					addIndent(commentNextStyle, commentNextMargin, indent, commentItem.nextElementSibling);
					container.insertBefore(commentItem.nextElementSibling, referenceNext);
				}
				container.insertBefore(commentItem, commentList[authorIndex].nextElementSibling);
				addIndent(commentItem.style, commentIndent, indent, commentItem);
				if(cutIndex == null)
				{
					reference = "@" + (space ? " " : "") + reference + referenceGroup[3];
					cut = false;
					for(paragraphIndex = 0; paragraphIndex < paragraphListLength; paragraphIndex++)
						if((cutIndex = paragraphList[paragraphIndex].innerHTML.toLowerCase().indexOf(reference)) > -1)
						{
							paragraphList[paragraphIndex].innerHTML = paragraphList[paragraphIndex].innerHTML.substr(0, cutIndex) + "<b style=\"color:#8fbf8f\">" + paragraphList[paragraphIndex].innerHTML.substr(cutIndex, reference.length) + "</b>" + paragraphList[paragraphIndex].innerHTML.substr(cutIndex + reference.length);
							cut = true;
						}
					if(authorList[authorIndex] != referenceGroup[1].toLowerCase() && !cut)
					{
						reference = "@" + (space ? " " : "") + authorList[authorIndex];
						for(paragraphIndex = 0; paragraphIndex < paragraphListLength; paragraphIndex++)
							if((cutIndex = paragraphList[paragraphIndex].innerHTML.toLowerCase().indexOf(reference)) > -1)
							{
								paragraphList[paragraphIndex].innerHTML = paragraphList[paragraphIndex].innerHTML.substr(0, cutIndex) + "<b style=\"color:#8fbf8f\">" + paragraphList[paragraphIndex].innerHTML.substr(cutIndex, reference.length) + "</b>" + paragraphList[paragraphIndex].innerHTML.substr(cutIndex + reference.length);
							}
					}
				}
				break;
			}
		}
		if(!reference)
		{
			weakReferencePattern.lastIndex = 0;
			if((referenceGroup = weakReferencePattern.exec(text)) && (reference = referenceGroup[2].toLowerCase()) && reference.length > 2)
			{
				authorList || (authorList = buildAuthorList(commentList, commentIndex, commentListLength));
				for(authorIndex = commentIndex + 1; authorIndex < commentListLength; authorIndex++)
					if(authorList[authorIndex].indexOf(reference) == 0 && (authorList[authorIndex].length == reference.length || authorList[authorIndex].charAt(reference.length) == " "))
						break;
				if(authorIndex < commentListLength)
				{
					commentItem = commentList[commentIndex];
					container = commentItem.parentNode;
					commentIndent = parseInt(commentItem.style.marginLeft) || 0;
					referenceNext = commentList[authorIndex].nextElementSibling;
					while(commentItem.nextElementSibling && (commentNextMargin = parseInt((commentNextStyle = commentItem.nextElementSibling.style).marginLeft)) > commentIndent)
					{
						addIndent(commentNextStyle, commentNextMargin, indent, commentItem.nextElementSibling);
						container.insertBefore(commentItem.nextElementSibling, referenceNext);
					}
					container.insertBefore(commentItem, commentList[authorIndex].nextElementSibling);
					addIndent(commentItem.style, commentIndent, indent, commentItem);
					paragraphList[0].innerHTML = paragraphList[0].innerHTML.substr(0, referenceGroup[1].length) + "<b style=\"color:#bf9f9f\">" + paragraphList[0].innerHTML.substr(referenceGroup[1].length, referenceGroup[2].length) + "</b>" + paragraphList[0].innerHTML.substr(referenceGroup[1].length + referenceGroup[2].length);
				}
			}
			else
			{
				immediateReferencePattern.lastIndex = 0;
				if(referenceGroup = immediateReferencePattern.exec(text))
				{
					authorIndex = commentIndex + 1;
					commentItem = commentList[commentIndex];
					container = commentItem.parentNode;
					commentIndent = parseInt(commentItem.style.marginLeft) || 0;
					referenceNext = commentList[authorIndex].nextElementSibling;
					while(commentItem.nextElementSibling && (commentNextMargin = parseInt((commentNextStyle = commentItem.nextElementSibling.style).marginLeft)) > commentIndent)
					{
						addIndent(commentNextStyle, commentNextMargin, indent, commentItem.nextElementSibling);
						container.insertBefore(commentItem.nextElementSibling, referenceNext);
					}
					container.insertBefore(commentItem, commentList[authorIndex].nextElementSibling);
					addIndent(commentItem.style, commentIndent, indent, commentItem);
					for(paragraphIndex = 0; paragraphIndex < paragraphListLength; paragraphIndex++)
						paragraphList[paragraphIndex].innerHTML = paragraphList[paragraphIndex].innerHTML.replace(immediateReferencePattern, "$1<b style=\"color:#bf9f9f\">$2</b>");
				}
			}
		}
		for(paragraphIndex = 0; paragraphIndex < paragraphListLength; paragraphIndex++)
		{
			paragraphList[paragraphIndex].innerHTML = paragraphList[paragraphIndex].innerHTML.replace(lostReferencePattern, "$1<b style=\"color:#bf9f9f\">$2</b>").replace(votePattern, "$1<b style=\"color:#fff;background:#1b0;display:inline-block;padding:0 5px;border-radius:5px\">$2</b>").replace(boldPattern, "$1<span style=\"color:#ccc\">*</span><b>$2</b><span style=\"color:#ccc\">*</span>$3").replace(italicPattern, "$1<span style=\"color:#aaa\">/</span><i>$2</i><span style=\"color:#aaa\">/</span>$3").replace(underlinePattern, "$1<span style=\"color:#aaa\">_</span><u>$2</u><span style=\"color:#aaa\">_</span>$3").replace(emoticonPattern, "$1<span style=\"background:#fd2;font-weight:bold;border:1px solid #000;display:inline-block;padding:0 2px 3px;border-radius:20px;-moz-transform:rotate(90deg);letter-spacing:0.1em;margin:0 0.3em;vertical-align:middle;cursor:default\" title=\"$2$3\">$2</span>").replace(heartPattern, "$1<span style=\"background:#f9b;font-weight:bold;border:1px solid #000;display:inline-block;padding:0 4px;border-radius:20px;-moz-transform:rotate(-90deg);letter-spacing:-0.15em;margin:0 0.3em;vertical-align:middle;cursor:default\" title=\"$2\">$2</span>");
			paragraphListList = paragraphList[paragraphIndex].innerHTML.split(separatorPattern);
			if((paragraphListIndex = paragraphListList.length) > 1)
			{
				paragraphList[paragraphIndex].innerHTML = paragraphListList[0].replace(emdashPattern, "$1&mdash;$2");
				while(paragraphListIndex-- > 1)
				{
					paragraphList[paragraphIndex].parentNode.insertBefore(newParagraph = document.createElement("p"), paragraphList[paragraphIndex].nextSibling);
					newParagraph.innerHTML = paragraphListList[paragraphListIndex].replace(emdashPattern, "$1&mdash;$2");
				}
			}
			else
				paragraphList[paragraphIndex].innerHTML = paragraphList[paragraphIndex].innerHTML.replace(emdashPattern, "$1&mdash;$2");
		}
	}
	paragraphListLength = (paragraphList = document.getElementById("content").getElementsByTagName("p")).length;
	for(paragraphIndex = 0; paragraphIndex < paragraphListLength; paragraphIndex++)
		if((newParagraph = paragraphList[paragraphIndex].previousElementSibling) && newParagraph.tagName == "P")
			paragraphList[paragraphIndex].style.marginTop = "10px";
	paragraphListLength = (paragraphList = document.getElementsByClassName("author")).length;
	if(document.getElementById("comment_body"))
		for(paragraphIndex = 0; paragraphIndex < paragraphListLength; paragraphIndex++)
		{
			authorItem = document.createElement("a");
			cut = document.createElement("span");
			cut.appendChild(document.createTextNode("\u21B5"));
			cut.style.cssText = "font-size:24px;vertical-align:middle;position:relative;top:-2px";
			authorItem.appendChild(cut);
			authorItem.appendChild(document.createTextNode("\u00a0Reply"));
			authorItem.href = "#";
			authorItem.onclick = function()
			{
				var text;

				(text = document.getElementById("comment_body")).value += (text.value.substr(-1) != " " && text.value.length ? " " : "") + "@" + this.parentNode.getElementsByClassName("author")[0].innerHTML + (text.value.length ? "" : ": ");
				text.selectionStart = text.value.length;
				text.focus();

				return(false);
			}
			authorItem.style.cssText = "display:inline-block;font-size:11px";
			paragraphList[paragraphIndex].parentNode.appendChild(authorItem);
		}

	return;
})();
