// ==UserScript==
// @name 清水河畔——修复Chrome中所见即所得编辑中换行消失的问题
// @description 修复Chrome浏览器采用所见即所得方式编辑后换行符消失导致帖子内容格式混乱的问题。
// @match http://bbs.stuhome.net/post.php*
// @match http://bbs.auxten.com/post.php*
// @match http://bbs.uestc6.edu.cn/post.php*
// @match http://bbs.tangdg.info/post.php*
// @match http://bbs.qshpan.com/post.php*
// @match http://bbs.germanyt.com/post.php*
// ==/UserScript==

var patch = 'WYSIWYD.getHTML = function(root, outputRoot, editor) {\n\
	var html = "";\n\
	switch(root.nodeType) {\n\
	    case 1:\n\
	    case 11:\n\
		var closed;\n\
		var i;\n\
		var root_tag = (root.nodeType == 1) ? root.tagName.toLowerCase() : "";\n\
		if (is_ie && root_tag == "head") {\n\
			if (outputRoot)\n\
				html += "<head>";\n\
			var save_multiline = RegExp.multiline;\n\
			RegExp.multiline = true;\n\
			var txt = root.innerHTML.replace(/(<\\/|<)\\s*([^ \\t\\n>]+)/ig, function(str, p1, p2) {\n\
				return p1 + p2.toLowerCase();\n\
			});\n\
			RegExp.multiline = save_multiline;\n\
			html += txt;\n\
			if (outputRoot)\n\
				html += "</head>";\n\
			break;\n\
		} else if (outputRoot) {\n\
			closed = (!(root.hasChildNodes() || WYSIWYD.needsClosingTag(root)));\n\
			html = "<" + root.tagName.toLowerCase();\n\
			var attrs = root.attributes;\n\
			for (i = 0; i < attrs.length; ++i) {\n\
				var a = attrs.item(i);\n\
				if (!a.specified) {\n\
					continue;\n\
				}\n\
				var name = a.nodeName.toLowerCase();\n\
				if (/_moz|contenteditable|_msh/.test(name)) {\n\
					continue;\n\
				}\n\
				var value;\n\
				if (name != "style") {\n\
					if (typeof root[a.nodeName] != "undefined" && typeof root[a.nodeName] != "function" && name != "href" && name != "src") {\n\
						value = root[a.nodeName];\n\
					} else {\n\
						value = a.nodeValue;\n\
					}\n\
				} else {\n\
					value = root.style.cssText;\n\
				}\n\
				if (/(_moz|^$)/.test(value)) {\n\
					continue;\n\
				}\n\
				html += " " + name + \'="\' + value + \'"\';\n\
			}\n\
			html += closed ? " />" : ">";\n\
		}\n\
		for (i = root.firstChild; i; i = i.nextSibling) {\n\
			var br = "";\n\
			if( (i.tagName || "").toLowerCase() == "div" && \n\
				/*a DIV tag*/ \n\
				\n\
				! (i.childNodes && i.childNodes.length == 1 && \n\
				(i.childNodes[0].tagName || "").toLowerCase() == "br") \n\
				/*not <div><br></div>*/ \n\
			) \n\
			{ \n\
				var prev = i.previousSibling; \n\
				/*Prev sibling is a text node with only whitespaces*/ \n\
				if(prev && prev.nodeType == document.TEXT_NODE && \n\
					!prev.nodeValue.match(/\\S/)) \n\
					prev = prev.previousSibling; \n\
				if( ((prev || {}).tagName || "").toLowerCase() != "br" )\n\
					br = "<br/>";\n\
			} \n\
			html += br + WYSIWYD.getHTML(i, true, editor);\n\
		}\n\
		if (outputRoot && !closed) {\n\
			html += "</" + root.tagName.toLowerCase() + ">";\n\
		}\n\
		break;\n\
	    case 3:\n\
		if (!root.previousSibling && !root.nextSibling && root.data.match(/^\\s*$/i) ) html = "&nbsp;";\n\
		else html = WYSIWYD.htmlEncode(root.data);\n\
		break;\n\
	    case 8:\n\
		html = "<!--" + root.data + "-->";\n\
		break;\n\
	}\n\
	return html;\n\
}';

if(document.documentElement.tagName.toLowerCase() == "html")
{
	var script = document.createElement("script");
	script.appendChild(document.createTextNode(patch));
	document.body.appendChild(script);
}
