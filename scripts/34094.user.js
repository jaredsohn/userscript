// ==UserScript==
// @name           Userscripts Comment Helper [Revived]
// @namespace      #aVg
// @description    For those of us who constantly use userscripts; this script improves the textbox interfaces.
// @version        0.1.1
// @include        http://userscripts.org/*
// ==/UserScript==
function $(A) {return document.getElementById(A);}
function single(A, B) {return document.evaluate(A, B || document, null, 9, null).singleNodeValue;}
var Element=function(A, B, C) {
	A = document.createElement(A);
	if(B) for(var b in B) {
		var cur=B[b];
		if(b.indexOf("on")==0)
			A.addEventListener(b.substring(2), cur, false);
		else if(b=="style")
			for(var s in cur)
				A.style[s] = cur[s];
		else
			A[b]=B[b];
	}
	if(C) for(var i=0; i<C.length; ++i) A.appendChild(C[i]);
	return A;
};
var tags=[
["cdata", "<><![CDATA[", "]]></>", "D"],
["a","<a href=\"\">","</a>","L"],
["img","<img src=\"","\"/>","M"],
["br","<br />","", null],
"p",
"code",
["pre","P"],
["blockquote","Q"],
["ins", "U"],
["strong","B"],
["em","I"],
"ul",
"ol",
"li",
"h1",
["h2","H"],
"div",
"span",
"big"
];
var tagKeys = [];
for (var i = 0; i < tags.length; i++)
{
	var tag = tags[i];
	if (typeof tag == "string")
		tagKeys.push(null);
	else switch(tag.length) {
		case 4:
			tagKeys.push(tag[3] == null ? null : tag[3].charCodeAt(0));
			break;
		case 2:
			tagKeys.push(tag[1].charCodeAt(0));
			break;
	}
}
var cust=[
	["Greasespot","<a href=\"http://wiki.greasespot.net/Main_Page\">Greasespot</a>"],
	["MDC", "<a href=\"http://developer.mozilla.org/\">MDC</a>"],
	["GM_xmlhttpRequest", "<a href=\"http://wiki.greasespot.net/GM_xmlhttpRequest\">GM_xmlhttpRequest</a>"],
	["lmgtfy", "http://lmgtfy.com/?q="],
	["Google First Result", "http://google.com/search?btnI&q="],
	["w3schools", "<a href=\"http://www.w3schools.com/JS\">w3schools</a>"],
	["ABP", "<a href=\"http://addons.mozilla.org/firefox/addon/1865\">AdBlock Plus</a>"],
	["Greasemonkey", "<a href=\"http://addons.mozilla.org/firefox/addon/748\">Greasemonkey</a>"],
	["Stylish", "<a href=\"http://addons.mozilla.org/firefox/addon/2108\">Stylish</a>"]
];
GM_addStyle(<><![CDATA[
#agTags h2, #agLinks h2 {
	color : white;
}
#agTags a, #agLinks a {
	padding-right : 3px;
	cursor : pointer;
}
]]></>+"");
function getArea() {
	var edit = $("edit_post_body"), reply, desc;
	if (edit && edit.offsetHeight > 0)
		return edit;
	else if(reply=$("post_body"))
		return reply;
	else if(desc=$("script_description_extended"))
		return desc;
	else if(src=$("script_src"))
		return src;
}
if(unsafeWindow.EditForm)
unsafeWindow.EditForm.loadHelper = function() {
	prepare($("edit"));
}
function tagHandler(tag) {
	var isString = typeof tag == "string";
	var twoParts = !isString && tag.length==4;
	var html = "<" + (isString ? tag : tag[0]) + ">";
	var area = getArea();
	var s =area.scrollTop, b=area.selectionStart, f=area.selectionEnd;
	if(twoParts) {
		area.value = area.value.substring(0, b) + tag[1] + area.value.substring(b, f) +  tag[2] + area.value.substring(f);
		area.setSelectionRange(b, f + tag[1].length + tag[2].length);
	} else {
		area.value = area.value.substring(0, b) + html + area.value.substring(b, f) + html.replace(/^</,"</") + area.value.substring(f);
		area.setSelectionRange(b, f + (html.length * 2) + 1);
	}
	area.scrollTop = s;
	area.focus();
}
function handleArea(e) {
	if(e.ctrlKey)
	for (var i = tagKeys.length - 1; i>=0; --i) {
		if (e.keyCode==tagKeys[i])
		{
			tagHandler(tags[i]);
			e.preventDefault();
			return;
		}
	}
	if(e.keyCode != 9 || e.ctrlKey) return;
	e.preventDefault();
	var s=this.scrollTop, b=this.selectionStart, f=this.selectionEnd, len = this.value.length;
	if(b==f) {
		this.value=(e.shiftKey ? this.value.substring(0, b).replace(/\t$/, "") : (this.value.substring(0, b) + "\t")) + this.value.substring(b);
		this.setSelectionRange(e.shiftKey ? --b : ++b, b);
	} else {
		this.value = this.value.substring(0, b) + this.value.substring(b, f).replace(e.shiftKey ? /^\t/gm : /^/gm, e.shiftKey ? "" : "\t") + this.value.substring(f);
		this.setSelectionRange(b, f + (this.value.length - len));
	}
	this.scrollTop = s;
	this.focus();
}
function prepare(box) {
	//box = /\/article/.test(location.href) ? box.firstElementChild.firstElementChild.children[1].rows[0] : box.firstElementChild.firstElementChild;
	box = box.firstElementChild.firstElementChild;
	getArea().addEventListener("keydown", handleArea, false);
	var main = single(".//h5[contains(text(), 'Present')]/..", box);
	var del = single(".//a[contains(@onclick, 'Delete t')]", main);
	main.innerHTML = "";
	if (del) main.appendChild(del);
	var custom = new Element("div", { id : "agLinks"}, [
		new Element("h2", {
			textContent : "Custom Links"
		})
	]);
	main.appendChild(custom);
	for(var i = cust.length - 1; i >= 0; --i) {
		var link = new Element("a", {
			textContent : cust[i][0],
			title : cust[i][1],
			onclick : function() {
				var area = getArea();
				var s =area.scrollTop, b=area.selectionStart, f=area.selectionEnd, len = this.title.length;
				area.value = area.value.substring(0, b) + this.title + area.value.substring(f);
				area.setSelectionRange(b+=len, b);
				area.scrollTop = s;
				area.focus();
			}
		});
		custom.appendChild(link);
	}
	
	var tagMain = new Element("div", { id : "agTags"}, [
		new Element("h2", {
			textContent : "Tags"
		})
	]);
	main.appendChild(tagMain);
	for (var i = tags.length - 1; i >= 0; --i) {
		var tag = new Element("a"), cur = tags[i];
		tag.textContent = "<" + (typeof cur=="string" ? cur : cur[0]) + ">";
		tag.name = i;
		tag.addEventListener("click", function() {
			tagHandler(tags[Number(this.name)]);
		}, false);
		tagMain.appendChild(tag);
	}
}
var reply = $("reply");
if (reply) prepare(reply);
var desc = $("script_description_extended");
if (desc) desc.addEventListener("keydown", handleArea, false);
var src = $("script_src");
if (src) src.addEventListener("keydown", handleArea, false);
var edits=document.evaluate("//a[contains(@onclick,'EditForm')]", document, null, 6, null), edit, i = edits.snapshotLength;
while(edit=edits.snapshotItem(--i)) {
	edit.setAttribute("onclick", edit.getAttribute("onclick").replace("})",", success: EditForm.loadHelper })"));
	edit.addEventListener("click", function(){ },false);
}
document.addEventListener("keypress", function(e) {
	var s;
	if(e.ctrlKey && e.charCode==83 && (s=single("//input[@name='commit']")))
	{
		e.preventDefault();
		s.click();
	}
}, false);