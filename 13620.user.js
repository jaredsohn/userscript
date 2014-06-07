// ==UserScript==
// @name           Wowhead Material Breakdown
// @namespace      wowhead
// @description    Breaks down item materials.
// @include        http://www.wowhead.com/?item=*
// @include        http://www.wowhead.com/?spell=*
// ==/UserScript==

var checklist = [
//[Item, SubItem, Count, Icon, Name, Quality]
[22451,22572,10, "INV_Elemental_Mote_Air01", "Mote of Air", 1],
[22452,22573,10, "INV_Elemental_Mote_Earth01", "Mote of Earth", 1],
[21884,22574,10, "INV_Elemental_Mote_Fire01", "Mote of Fire", 1],
[21886,22575,10, "INV_Elemental_Mote_Life01", "Mote of Life", 1],
[22457,22576,10, "INV_Elemental_Mote_Mana", "Mote of Mana", 1],
[22456,22577,10, "INV_Elemental_Mote_Shadow01", "Mote of Shadow", 1],
[21885,22578,10, "INV_Elemental_Mote_Water01", "Mote of Water", 1],
[22449,22448,3, "INV_Enchant_ShardPrismaticSmall", "Small Prismatic Shard", 3],
[11082,10998,3, "INV_Enchant_EssenceAstralSmall", "Lesser Astral Essence", 2],
[22446,22447,3, "INV_Enchant_EssenceArcaneSmall", "Lesser Planar Essence", 2],
[16203,16202,3, "INV_Enchant_EssenceEternalSmall", "Lesser Eternal Essence", 2],
[10939,10938,3, "INV_Enchant_EssenceMagicSmall", "Lesser Magic Essence", 2],
[11135,11134,3, "INV_Enchant_EssenceMysticalSmall", "Lesser Mystic Essence", 2],
[11175,11174,3, "INV_Enchant_EssenceNetherSmall", "Lesser Nether Essence", 2],
[,18582],
[,18583],
[,18584],
[,9372],
[,22445],
[,6948],
[,7082],
[,7076],
[,7078],
[,12808],
[,7080],
];

var item = new Array();
var ranthrough = false;

var CheckDelay = { 
	_timeoutId: 0,
	_process: function (params) { CreateList(params) },
	process: function (params) { 
		clearTimeout(this._timeoutId); 
		var me = this; 
		this._timeoutId = setTimeout(function(){ me._process(params); }, 750);
	} 
};

if (document.getElementById('tab-created-by') || document.getElementById('icontab-icon1')) {
	if (document.getElementById('icontab-icon1')) { var initid = document.getElementById('icontab-icon1').getElementsByTagName('a')[0].href.match(/\?item=([0-9]*)/)[1]; }
	if (document.getElementById('tab-created-by')) { var initid = window.location.href.split("#")[0].match(/\?item=([0-9]*)/)[1]; }

	if(CheckSubMatsItemThing(initid)) {
		var matsdiv = document.createElement("div");
		var matsdivnote = document.createElement("div");
		var matsdivtop = document.createElement("div");
		var matsdivnav = document.createElement("div");
		var matsdivitem = document.createElement("div");
		matsdivitem.id = 'mats-items';
		matsdivitem.innerHTML = '<center>Loading Data...<img src=http://www.wowhead.com/images/loading2.gif></center>';
		matsdiv.id = 'tab-mats';
		matsdiv.style.display = 'none';
		matsdivnote.className = 'listview-note';
		matsdivtop.className = 'listview-band-top';
		matsdivnav.className = 'listview-nav';
		var sm = unsafeWindow.ce('small');
		unsafeWindow.ae(sm, unsafeWindow.ct('This is a breakdown shakedown! Everybody Get Down!'));
		unsafeWindow.ae(matsdivnote, sm)
		unsafeWindow.ae(matsdivtop, matsdivnote)
		unsafeWindow.ae(matsdivnav, matsdivtop)
		unsafeWindow.ae(matsdiv, matsdivtop)
		unsafeWindow.ae(matsdiv, matsdivitem)
		unsafeWindow.ge('jkbfksdbl4').innerHTML = '';
		unsafeWindow.ge('lkljbjkb574').appendChild(matsdiv);
		unsafeWindow.tabsRelated.add('Materials', {id: 'mats'});
		Init(initid)
		unsafeWindow.tabsRelated.flush();
	}
}

function CheckSubMatsItemThing(itemid) {
	for (var j in checklist) {
		if (itemid == checklist[j][1]) {
			return false;
		}
	}
	return true;
}

function PullDataFromPage(item, tcount, parentcount, depthlevel, id, first) {
	for (var j = 0; j < checklist.length; j++) {
		if (item == checklist[j][1]) {
			NoSubMats(id)
			return;
		}
		if (item == checklist[j][0]) {
			var matches = true;
			var matchesid = j;
		}
	}
	if (matches == true) {
		AddToArray(checklist[matchesid][1], checklist[matchesid][2], checklist[matchesid][0], checklist[matchesid][3], checklist[matchesid][4], checklist[matchesid][5], tcount*checklist[matchesid][2], 1, depthlevel);
	} else {
		GM_xmlhttpRequest({
			id: id,
			first: first,
			tcount: tcount,
			parentcount: parentcount,
			parentid: item,
			depthlevel: depthlevel,
			method: 'GET',
			url: "http://www.wowhead.com/?item="+item+"&xml",
			onload: function(responseDetails) {
				var parser = new DOMParser();
				var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
				var createdBy = dom.getElementsByTagName('createdBy')
				if(createdBy.length) { var spell = createdBy[0].getElementsByTagName('spell'); 
					if(spell.length) { var items = spell[0].getElementsByTagName('reagent');
						if(items.length) {
							for (var k = 0; k < items.length; k++) {
								var itemid = items[k].getAttribute('id');
								var name = items[k].getAttribute('name');
								var icon = items[k].getAttribute('icon');
								var quality = items[k].getAttribute('quality');
								var count = parseFloat(items[k].getAttribute('count'));
								if(this.first) { var pcount = 1 } else { var pcount = parseFloat(spell[0].getAttribute('minCount')); }
								if(pcount==0) {pcount=1}
								var tcount = (this.tcount*parseFloat(count))/pcount;
								if (tcount < count) { tcount = count }
								AddToArray(itemid, count, this.parentid, icon, name, quality, tcount, pcount, this.depthlevel);
							}
						} 
					}
				} else {
					NoSubMats(this.id)
				}
			}
		});
	}
}


function Init(itemid) {
	if(ranthrough) { return; } else { PullDataFromPage(itemid, 1, 1, 1, 0, true); ranthrough = true; }
}

function NoSubMats(id) {
	item[id].nosubmats = true;
}

function AddToArray(itemid, itemcount, parentid, icon, name, quality, tcount, pcount, depthlevel) {
	unsafeWindow.g_items[itemid]={'icon':icon};
	item.push({id:itemid, count:itemcount, tcount:tcount, pcount:pcount, parent:parentid, icon:icon, name:name, quality:quality, depth:depthlevel});
	PullDataFromPage(itemid, tcount, pcount, depthlevel+1, item.length-1)
	CheckDelay.process()
}

function CreateTier(depth, title) {
	var a = new Array();
	var b = new Array();
	for (i in item) {
		if(item[i].depth == depth) {
			if(!Exists(item[i].id, a)) {
				a.push(item[i].id);
				b.push(item[i].tcount);
			} else {
				b[Index(item[i].id, a)] = b[Index(item[i].id, a)]+item[i].tcount
			}
			if (item[i].nosubmats == true && item[i].depth+1 <= GetMaxDepth())
				item[i].depth++;
		}
	}
	return {title: title, items: a, count: b};
}

function Exists(thing, array) {
	for (var i in array) {
		if (array[i] == thing) {
			return true;
		}
	}
	return false;
}

function Index(thing, array) {
	for (var i in array) {
		if (array[i] == thing) {
			return i;
		}
	}
	return false;
}

function GetMaxDepth() {
	var finaldepth = 0;
	for (var i in item)
		if (finaldepth < item[i].depth)
			finaldepth++;
	return finaldepth;
}

function CreateList() {
	unsafeWindow.ge('mats-items').innerHTML = '';
	var max = GetMaxDepth();
	for (var i = 1; i <= max; i++) {
		var title = 'Materials Breakdown (Tier '+i+')';
		AddMats(CreateTier(i, title), unsafeWindow.ge('mats-items'), i, max)		
	}
}

function AddMats (data, div, tier, max) {
	var divHeader = unsafeWindow.ce('div');
	var divBody = unsafeWindow.ce('div');
	var items = data.items;
	var count = data.count;
	var title = data.title;
	data.divHeader = divHeader;
	data.divBody = divBody;
	divHeader.className = 'comment-header';
	var spanToggle = unsafeWindow.ce('span');
	spanToggle.className = 'comment-rating';
	var aToggler = unsafeWindow.ce('a');
	aToggler.href = 'javascript:;'
	aToggler.onclick = function(){ this.firstChild.nodeValue = (unsafeWindow.g_toggleDisplay(data.divBody) ? 'Hide' : 'Show'); };
	aToggler.onmousedown = unsafeWindow.rf;
	unsafeWindow.ae(aToggler, unsafeWindow.ct('Hide'));
	unsafeWindow.ae(spanToggle, aToggler);
	unsafeWindow.ae(spanToggle, unsafeWindow.ct(' ' + String.fromCharCode(160) + ' '));
	unsafeWindow.ae(divHeader, spanToggle);
	unsafeWindow.ae(divHeader, unsafeWindow.ct(title));
	var spanWrapper = unsafeWindow.ce('span');
	var divClear = unsafeWindow.ce('div');
	divClear.className = 'clear'
	if (tier != max && tier != 1) { aToggler.firstChild.nodeValue = 'Show'; unsafeWindow.g_toggleDisplay(data.divBody); }
	for(var i = 0; i < items.length; i++) {
		var id = items[i];
		var num = count[i];
		var icon = unsafeWindow.g_items.createIcon(id, 1, num);
		icon.style.cssFloat = icon.style.styleFloat = 'left';
		unsafeWindow.ae(spanWrapper, icon);
		unsafeWindow.ae(spanWrapper, divClear);
	}
	unsafeWindow.ae(div, divHeader);
	unsafeWindow.ae(divBody, spanWrapper);
	unsafeWindow.ae(div, divBody);
}