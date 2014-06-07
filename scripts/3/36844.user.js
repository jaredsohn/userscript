// ==UserScript==
// @name           Item script
// @namespace      wowhead
// @include        http://www.wowhead.com/?*
// ==/UserScript==

function aS(_1){GM_addStyle(_1.replace(/;/g, ' !important;'))}
aS("#itemscript-bar a { position:absolute; top:0; right:-12px; z-index:1; width:22px; height:22px; background:url(http://static.wowhead.com/images/search.gif) left top no-repeat; display:block; } #itemscript-bar a:hover {background-position:left bottom; }");

var toptab = document.getElementById("topbar");
var types = [
	{name:"Item",value:"item"},
	{name:"NPC",value:"npc"},
	{name:"Object",value:"object"},
	{name:"Quest",value:"quest"},
	{name:"Spell",value:"spell"}];

var div = document.createElement("div");
var div2 = document.createElement("div");
var select = document.createElement("select");
var a = document.createElement("a");
var input = document.createElement("input");
select.id = 'itemscript-type';
a.id = 'itemscript-button';
input.id = 'itemscript-ids';
input.style.marginLeft = '2px';
input.style.paddingRight = '10px';
input.size = '14';
div.id = 'itemscript-bar';
div.style.cssFloat = 'right';
div.style.position = 'relative';
div.style.right = '30px';
div.style.top = '5px';
div.appendChild(div2);
div2.appendChild(select);
for(var i=0;i<types.length;i++) {
	var option = document.createElement("option");
	option.appendChild(document.createTextNode(types[i].name));
	option.value = types[i].value;
	select.appendChild(option);
}
div2.appendChild(a);
div2.appendChild(input);

a.addEventListener('click', function() { OpenTabs(); }, false);

function OpenTabs() {
	var type = document.getElementById("itemscript-type").options[document.getElementById("itemscript-type").selectedIndex].value;
	var ids = document.getElementById("itemscript-ids").value;
	if(ids[0] == "[" && ids[ids.length-1] == "]") {
		ids = eval(ids);
		if(typeof(ids) == 'object') {
			for(var i=0;i<ids.length;i++) {
				if(!isNaN(ids[i])) {
					GM_openInTab("http://www.wowhead.com/?"+type+"="+ids[i]);
				}
			}
		}
	} else if(!isNaN(ids)) {
		GM_openInTab("http://www.wowhead.com/?"+type+"="+ids);
	}
}
toptab.parentNode.insertBefore(div,toptab);