// ==UserScript==
// @name        STB-Bundle - Vermilion edition
// @namespace   STB-Bundle
// @include     http://strategus.c-rpg.net/*
// @version     0.1.99
// @grant       none
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery-2.0.2.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jq=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

addJQuery(main);

function main() {

	checkPage();

	function checkPage() {
		if (window.location.search == "?info" || window.location.search == "?inv" || window.location.search == "") {
			startSTBArmoury();
		}
	}

	function startSTBArmoury() {

		var GREEN_QUALITY = 'rgba(0, 100, 0, 0.2)';
		var RED_QUALITY = 'rgba(100, 0, 0, 0.2)';
		var LIGHTEST_GREY = 'rgba(0, 0, 0, 0.2)';
		var LIGHT_GREY = 'rgba(0, 0, 0, 0.5)';
		var TROOP_ICON = 'http://i.imgur.com/lzkgfYe.png';
		var GOLD_ICON = 'http://i.imgur.com/GsvcGtg.png';
		var TRADE_ICON = 'http://i.imgur.com/o5WoZPb.png';
		var UNKNOWN_ICON = 'http://i.imgur.com/TSKPuy0.png';
		var SIEGE_ICON = 'http://i.imgur.com/k5t4Gi2.png';

		var items = [];
		var playerItems = [];
		var categoriesList = [];
		var fiefItems = [];
		var category = {};
		var simulation = false;

		// TOOLS FUNCTIONS /////////////////////////////////////////////////////////////
		/* TinySort 1.5.3
		* Copyright (c) 2008-2013 Ron Valstar http://tinysort.sjeiti.com/
		*
		* Dual licensed under the MIT and GPL licenses:
		*   http://www.opensource.org/licenses/mit-license.php
		*   http://www.gnu.org/licenses/gpl.html
		*/
		(function(e,c){var h=!1,k=null,o=parseFloat,l=Math.min,m=/(-?\d+\.?\d*)$/g,g=/(\d+\.?\d*)$/g,i=[],f=[],b=function(p){return typeof p=="string"},n=Array.prototype.indexOf||function(r){var p=this.length,q=Number(arguments[1])||0;q=q<0?Math.ceil(q):Math.floor(q);if(q<0){q+=p}for(;q<p;q++){if(q in this&&this[q]===r){return q}}return -1};e.tinysort={id:"TinySort",version:"1.5.2",copyright:"Copyright (c) 2008-2013 Ron Valstar",uri:"http://tinysort.sjeiti.com/",licensed:{MIT:"http://www.opensource.org/licenses/mit-license.php",GPL:"http://www.gnu.org/licenses/gpl.html"},plugin:(function(){var p=function(q,r){i.push(q);f.push(r)};p.indexOf=n;return p})(),defaults:{order:"asc",attr:k,data:k,useVal:h,place:"start",returns:h,cases:h,forceStrings:h,ignoreDashes:h,sortFunction:k}};e.fn.extend({tinysort:function(){var C,B,E=this,s=[],r=[],F=[],G=[],v=0,q,A=[],x=[],y=function(H){e.each(i,function(I,J){J.call(J,H)})},w=function(S,Q){var H=0;if(v!==0){v=0}while(H===0&&v<q){var O=G[v],L=O.oSettings,P=L.ignoreDashes?g:m;y(L);if(L.sortFunction){H=L.sortFunction(S,Q)}else{if(L.order=="rand"){H=Math.random()<0.5?1:-1}else{var R=h,K=!L.cases?a(S.s[v]):S.s[v],J=!L.cases?a(Q.s[v]):Q.s[v];if(!t.forceStrings){var I=b(K)?K&&K.match(P):h,T=b(J)?J&&J.match(P):h;if(I&&T){var N=K.substr(0,K.length-I[0].length),M=J.substr(0,J.length-T[0].length);if(N==M){R=!h;K=o(I[0]);J=o(T[0])}}}H=O.iAsc*(K<J?-1:(K>J?1:0))}}e.each(f,function(U,V){H=V.call(V,R,K,J,H)});if(H===0){v++}}return H};for(C=0,B=arguments.length;C<B;C++){var z=arguments[C];if(b(z)){if(A.push(z)-1>x.length){x.length=A.length-1}}else{if(x.push(z)>A.length){A.length=x.length}}}if(A.length>x.length){x.length=A.length}q=A.length;if(q===0){q=A.length=1;x.push({})}for(C=0,B=q;C<B;C++){var D=A[C],t=e.extend({},e.tinysort.defaults,x[C]),u=!(!D||D==""),p=u&&D[0]==":";G.push({sFind:D,oSettings:t,bFind:u,bAttr:!(t.attr===k||t.attr==""),bData:t.data!==k,bFilter:p,$Filter:p?E.filter(D):E,fnSort:t.sortFunction,iAsc:t.order=="asc"?1:-1})}E.each(function(O,H){var K=e(H),I=K.parent().get(0),J,N=[];for(j=0;j<q;j++){var P=G[j],L=P.bFind?(P.bFilter?P.$Filter.filter(H):K.find(P.sFind)):K;N.push(P.bData?L.data(P.oSettings.data):(P.bAttr?L.attr(P.oSettings.attr):(P.oSettings.useVal?L.val():L.text())));if(J===c){J=L}}var M=n.call(F,I);if(M<0){M=F.push(I)-1;r[M]={s:[],n:[]}}if(J.length>0){r[M].s.push({s:N,e:K,n:O})}else{r[M].n.push({e:K,n:O})}});e.each(r,function(H,I){I.s.sort(w)});e.each(r,function(K,N){var M=N.s.length,J=[],I=M,L=[0,0];switch(t.place){case"first":e.each(N.s,function(P,Q){I=l(I,Q.n)});break;case"org":e.each(N.s,function(P,Q){J.push(Q.n)});break;case"end":I=N.n.length;break;default:I=0}for(C=0;C<M;C++){var O=d(J,C)?!h:C>=I&&C<I+N.s.length,H=(O?N.s:N.n)[L[O?0:1]].e;H.parent().append(H);if(O||!t.returns){s.push(H.get(0))}L[O?0:1]++}});E.length=0;Array.prototype.push.apply(E,s);return E}});function a(p){return p&&p.toLowerCase?p.toLowerCase():p}function d(q,s){for(var r=0,p=q.length;r<p;r++){if(q[r]==s){return !h}}return h}e.fn.TinySort=e.fn.Tinysort=e.fn.tsort=e.fn.tinysort})(jQuery);

		function slugify(text) {
			text = text.replace(/[^-a-zA-Z0-9,&\s]+/ig, '');
			text = text.replace(/-/gi, "_");
			text = text.replace(/\s/gi, "-");
			return text;
		}

		function cutString(string, before, after) {
			if(string !== undefined) {
				if(before) {
					string = string.split(before);
					string = string[1];
				}
				if(after) {
					string = string.split(after);
					string = string[0];
				}
			}
			return string;
		}

		function findObjectInArray(array, id) {
			var respond = 0;
			if(array !== null) {
				for (var i=0;i<array.length;i++)
				{
					if(array[i].id == id)
						respond = array[i];
				}
			}
			return respond;
		}

		function findObjectInArrayByName(array, name) {
			var respond = 0;
			if(array !== null) {
				for (var i=0;i<array.length;i++)
				{
					if(array[i].name == name)
						respond = array[i];
				}
			}
			return respond;
		}

		function getParentItem(id) {
			return findObjectInArray(items, id);
		}

		function convertObjectToString(object) {
			return JSON.stringify(object);
		}

		function convertStringToObject(string) {
			return JSON.parse(string);
		}

		function getStorage(storageName) {
			return localStorage.getItem(storageName);
		}

		function setStorage(storageName, value) {
			localStorage.setItem(storageName, value);
		}

		function deleteStorage(storageName) {
			localStorage.removeItem(storageName);
		}

		function isInInventoryPage() {
			if(jq(location).attr('href') == 'http://strategus.c-rpg.net/news.php?inv')
				return true;
			else
				return false;
		}

		function isInInfoPage() {
			if(jq(location).attr('href') == 'http://strategus.c-rpg.net/news.php?info' || jq(location).attr('href').indexOf('http://strategus.c-rpg.net/news.php?msg=') != -1)
				return true;
			else
				return false;
		}

		function generateCategories() {
			createCategory('cat00', 'img/equip_inv.png', 'Trade', Array());
			createCategory('cat01', 'img/equip_horse.png', 'Horse', Array(6190,1,2,3,4,10,5,6,7,6049,6051,6050,8,524,525,6048,9,526,527));
			createCategory('cat02', 'img/equip_throw.png', 'Throwing', Array(23,25,26,28,29,32,34,5142,46,47,48,36,38,30,539,40,42,44));
			createCategory('cat03', SIEGE_ICON, 'Siege', Array(528, 536, 534, 529, 537, 535, 538, 6176, 539));
			createCategory('cat04', 'img/equip_body.png', 'Body Armor', Array(364,369,366,367,368,370,372,373,374,375,376,412,413,371,378,377,379,431,432,5393,5498,381,382,384,383,386,385,390,6213,389,4722,391,5169,387,388,394,392,399,393,395,396,397,398,6060,416,400,417,5500,419,472,418,403,434,420,5501,437,438,3971,404,440,6059,365,401,402,414,415,421,422,423,424,425,426,427,428,429,430,433,5394,5919,442,443,3130,444,3137,4952,445,6214,4723,5502,447,405,454,5738,5741,5507,407,408,409,410,411,459,5506,441,448,450,458,461,4947,4948,4949,4950,4951,446,6218,5916,460,451,4957,439,5505,4958,5918,449,6219,455,457,6217,5739,5740,5742,456,6058,452,435,6062,6061,406,4955,453,4720,6063,4956,5504,5509,5499,462,463,4953,4954,436,3972,5917,469,6215,5496,464,465,466,467,6216,5508,473,474,475,4721,476,477,478,480,5503,5497,468,547,541,545,471,380,470,479));
			createCategory('cat05', 'img/equip_head.png', 'Head Armor', Array(273,283,255,256,257,258,259,260,261,262,279,280,284,5915,263,295,268,264,265,266,267,294,298,299,5162,270,272,274,275,276,277,278,309,495,6057,271,286,281,285,5484,5168,287,288,289,290,291,292,312,348,282,269,300,293,296,5914,302,297,301,307,303,5159,5160,5161,304,353,5155,5156,5157,5163,5164,5165,305,317,319,321,306,308,311,3968,5733,310,326,347,349,350,5158,5730,5737,314,323,313,320,322,330,549,4938,5385,5386,6210,315,324,325,5486,5487,5913,5494,6056,318,327,329,328,5492,5736,338,5483,5488,5489,5734,5910,494,5493,5731,331,504,546,5490,332,335,4944,5491,333,363,4939,4942,5166,334,336,337,361,3969,4941,4945,5167,5482,5735,5912,316,6206,339,359,4943,5485,362,6207,6208,5384,6209,340,360,507,6055,341,4940,5495,5732,5911,6054,342,503,540,5885,343,4946,5388,5389,6204,6205,506,5390,5391,5392,344,345,346,351,352,356,6211,5154,6212,354,355,357,5387,358,509,492,5383));
			createCategory('cat06', 'img/equip_leg.png', 'Leg Armor', Array(218,219,220,5479,5480,5727,6052,5906,222,223,221,224,4936,225,226,228,5153,227,229,5907,230,3966,4937,5729,5728,234,5908,235,238,6053,233,3967,5909,236,232,4935,244,237,231,239,243,240,242,241));
			createCategory('cat07', 'img/equip_hand.png', 'Hand Armor', Array(245,246,5884,253,251,252,247,248,249,550,543,542,254,5481,533));
			createCategory('cat08', 'img/equip_polearm.png', 'Polearm', Array(552,89,90,91,491,132,101,92,111,5371,93,94,99,100,123,95,107,116,103,133,104,108,4754,96,109,4753,112,98,120,122,110,102,5856,118,5855,113,106,5857,119,105,114,5858,117,4692,124,115,97,126,128,531,532,530));
			createCategory('cat09', 'img/equip_twohand.png', 'Two Handed', Array(502,129,130,137,131,136,139,134,138,519,147,143,189,140,142,149,135,150,148,146,144,517,518,145,152,151,153,154,158,141,155,6198,156,3320,157,159,522,521,160));
			createCategory('cat10', 'img/equip_onehand.png', 'One Handed', Array(489,161,162,164,165,166,168,500,3322,167,173,172,551,171,554,169,163,5900,178,174,170,5372,177,180,175,184,179,185,187,183,181,190,186,499,191,188,200,192,197,196,201,182,176,205,206,202,194,3195,195,3194,193,207,516,203,211,209,208,204,6022,213,198,520,215,212,3192,214,3196,3298,217,3190,216,210,3193,3323,199,510,523,6021,3191,4755));
			createCategory('cat11', 'img/equip_shield.png', 'Shield', Array(490,497,488,508,52,49,53,58,51,50,54,60,59,55,74,75,79,56,57,62,80,505,496,498,61,493,72,64,66,70,73,548,501,77,85,76,6019,71,83,86,81,82,78,63,65,67,68,69,84,6018,87,6020,544,88));
			createCategory('cat12', 'img/equip_bow.png', 'Bow', Array(17,16,18,19,21,5141,22,20));
			createCategory('cat13', 'img/equip_arrow.png', 'Arrow', Array(481,482,484,483));
			createCategory('cat14', 'img/equip_crossbow.png', 'Crossbow', Array(11,12,13,14,15));
			createCategory('cat15', 'img/equip_bolt.png', 'Bolt', Array(485,486));
		}

		function getItemCategory(itemId) {
			var respond = categoriesList[0];
			for (var i=0;i<categoriesList.length;i++)
			{
				for (var j=0;j<categoriesList[i].items.length;j++)
				{
					if(categoriesList[i].items[j] == itemId) {
						respond = categoriesList[i];
						break;
					}
				}
					
			}
			return respond;
		}

		function scanInventory() {
			var count = -1;
			jq('#inv_page').prepend('<span id="stb_loader"><img src="http://i.imgur.com/2VBbgpI.gif" alt="loader" /><b style="color:#bf9000">Loading items...</b></span>');
			jq("#inv_page .item").each(function(index) {
				var tmp = jq(this).children().children().attr('rel');
				var id = cutString(tmp, 'php?i=', '&m=');
				tmp = jq(this).children('.desc').children('div').children().attr('name');
				if(null !== tmp && undefined !== tmp) {
					var playerId = cutString(tmp, '[', ']');
					var name = jq(this).children().children('.name').html();
					tmp = jq(this).children().children().attr('rel');
					var level = cutString(tmp, '&m=');
					if(!id) {
						id = count;
						count--;
					}
					createItem(id, name);
					createPlayerItem(playerId, id, level);
				}
			});
			jq('#stb_loader').html('<b style="color:green">Items loaded !</b>');
		}

		function rebuildInfo(second) {
			if(!second)
				var table = 'fieldset table[name="transfertable"]:first ';
			else
				var table = 'fieldset table[name="transfertable"]:last ';
			jq(table + "tr:first").remove();
			jq(table + "tr").each(function(index) {
				var playerId = cutString(jq(this).children().children('input').attr('name'), '[', ']');
				var total = cutString(jq(this).children().children('span').html(), null, ' (all)');
				var itemName = cutString(jq(this).children().children().html(), null, ':');
				if(playerId == 'troops' || playerId == 'gold') {
					if(playerId == 'troops')
						var img = TROOP_ICON;
					else if(playerId == 'gold')
						var img = GOLD_ICON;
					else
						var img = UNKNOWN_ICON;
					var block = generateInfoBlock(playerId, 0, itemName, img, playerId, total, '');
					jq(this).parent().append(block);
					jq(this).remove();
				} else {
					var item = findObjectInArrayByName(items, itemName);
					var playerItem = findObjectInArray(playerItems, playerId);
					if(item.id === undefined)
						var itemId = 0;
					else
						var itemId = item.id;
					if(item.id <= 0) {
						var imgUrl = TRADE_ICON;
						var cat = 'cat00';
					} else {
						if(!itemId)
							var imgUrl = UNKNOWN_ICON;
						else
							var imgUrl = 'loadimage.php?id='+itemId+'&amp;lvl='+playerItem.level;
						var cat = getItemCategory(itemId).id;
					}
					if(!second)
						getItemCategory(itemId).addCount(total);
					else
						getItemCategory(itemId).addCount(total, true);
					if(playerItem == 0)
						var block = generateInfoBlock(itemId, 0, itemName, imgUrl, playerId, total, cat);
					else
						var block = generateInfoBlock(itemId, playerItem.level, itemName, imgUrl, playerId, total, cat);
					jq(this).parent().append(block);
					jq(this).remove();
				}
			});
		}

		function generateInfoBlock(id, level, name, url, playerId, total, cat) {
			if(id > 0)
				var rel = 'rel="itemstats.php?i='+id+'&amp;m='+level+'"';
			else
				var rel = '';

			return block = '<div id="'+id+'" cat="'+cat+'" name="'+name+'" level="'+level+'" class="item"><div class="header"><img '+rel+' height="70" width="70" class="itemstats" title="'+name+'" src="'+url+'"><div class="name">'+name+'</div></div><div class="desc"><center><a class="abutton"><img style="vertical-align:middle" src="img/ic_minus.png"></a><input value="0" name="transfer['+playerId+']" id="hero_transfer_item_'+playerId+'" class="in"><a class="abutton"><img style="vertical-align:middle" src="img/ic_plus.png"></a><br><a class="setTotal" count="'+total+'" href="">'+total+' (all)</a></center></div></div>';
		}

		function createNewBlock(id, level, name, val, total, cat) {
			if(id > 0)
				var rel = 'rel="itemstats.php?i='+id+'&amp;m='+level+'"';
			else
				var rel = '';

			var img = 'loadimage.php?id='+id+'&amp;lvl='+level;

			return block = '<div id="'+id+'" cat="'+cat+'" name="'+name+'" level="'+level+'" class="item"><div class="header"><img '+rel+' height="70" width="70" class="itemstats" title="'+name+'" src="'+img+'"><div class="name">'+name+'</div></div><div class="desc"><center><a class="abutton"><img style="vertical-align:middle" src="img/ic_minus.png"></a><input value="'+val+'" class="in"><a class="abutton"><img style="vertical-align:middle" src="img/ic_plus.png"></a><br><a class="setTotal" count="'+total+'" href="">'+total+' (all)</a></center></div></div>';
		}

		function sortSelectBoxes() {
			$('fieldset select[name="transfer_target"]:first option').tinysort();
			$('fieldset select[name="transfer_target"]:last option').tinysort();
		}

		function sortItems() {
			$('fieldset table[name="transfertable"]:first .item').tinysort({attr:'cat'}, {attr:'name'}, {attr:'level', order:'desc'});
			$('fieldset table[name="transfertable"]:last .item').tinysort({attr:'cat'}, {attr:'name'});
		}

		function colorizeItems() {
			jq("fieldset table[name='transfertable']:first .item").each(function() {
				if(jq(this).attr('level') > 0) {
					jq(this).css('background-color', GREEN_QUALITY);
				} else if (jq(this).attr('level') < 0) {
					jq(this).css('background-color', RED_QUALITY);
				}
			});
		}

		function addFilterButtons() {
			var block = '<div class="block"><div id="STB_Filters" style="padding-left:20px; padding-right:20px;"><h2>STB Filters</h2></div></div>';
			jq('#sub').append(block);
			for (var i=0;i<categoriesList.length;i++)
			{
				block = '<img class="filter-buttons" width="35" src="'+categoriesList[i].img+'" alt="'+categoriesList[i].name+'" id="'+categoriesList[i].id+'" />';
				jq('#STB_Filters').append(block);
			}
			block = '<img class="filter-buttons selected" style="background-color:'+LIGHT_GREY+';" width="35" src="'+categoriesList[0].img+'" alt="All" id="cat-1" /><br>\
			SEARCH <input id="filter-search-bar" type="text" value="Search" style="width: 100%" /><br>\
			DISPLAY LOOMLEVEL\
				<select name="loomComparator">\
					<option value=">"> > </option>\
					<option selected value=">="> &#8805; </option>\
					<option value="="> = </option>\
					<option value="!="> &#8800; </option>\
					<option value="<="> &#8804; </option>\
					<option value="<"> < </option>\
				</select>\
				<select name="loomLevel">\
					<option value="3"> 3 </option>\
					<option value="2"> 2 </option>\
					<option value="1"> 1 </option>\
					<option value="0"> 0 </option>\
					<option value="-1"> -1 </option>\
					<option value="-2"> -2 </option>\
					<option value="-3"> -3 </option>\
					<option selected value="-4"> -4 </option>\
				</select>';
			jq('#STB_Filters').append(block);
		}

		function addExportButtons() {
			var block = '<div class="block"><div id="STB_Export" style="padding-left:20px; padding-right:20px;"><h2>STB Armoury</h2></div></div>';
			jq('#sub').append(block);
			block = '<select id="presetList">\
				<option value="">Select a preset</option>\
			</select>\
			<input id="presetButton" title="Use|Load the selected preset of items" type="button" value="Use">\
			<input id="deletePresetButton" title="Delete|Delete the selected preset" type="button" value="Delete">\
			<input id="exportInput" type="text"><input id="exportButton" title="Export|Generate a string code that represent your current item selection" type="button" value="Export">\
			<input id="importInput" type="text"><input id="importButton" title="Import|Import the string code which represent a certain item selection" type="button" value="Import">\
			<input id="saveInput" type="text"><input id="saveButton" title="Save To|Choose a name for your actual preset and save it" type="button" value="Save To">\
			';
			jq('#STB_Export').append(block);
		}

		function filterItems() {
			if(jq('#filter-search-bar').val() == 'Search')
				var searchString = '';
			else
				var searchString = jq('#filter-search-bar').val();
			var filterCat = jq('.filter-buttons.selected').attr('id');
			var loomLevel = jq('select[name="loomLevel"] option:selected').val();
			var loomComparator = jq('select[name="loomComparator"] option:selected').val();

			jq(".item").each(function() {
				if(jq(this).attr('name').toLowerCase().indexOf(searchString.toLowerCase()) != -1) {
					if(filterCat != 'cat-1') {
						if(jq(this).attr('cat') != filterCat)
							jq(this).hide();
						else
							if(comparaisonFilter(loomComparator, loomLevel, jq(this)))
								jq(this).show();
							else
								jq(this).hide();
					} else {
						if(comparaisonFilter(loomComparator, loomLevel, jq(this)))
							jq(this).show();
						else
							jq(this).hide();
					}
				} else {
					jq(this).hide();
				}
			});
		}

		function comparaisonFilter(type, level, item) {
			if(type == '>')
				if(item.attr('level') > level)
					return true;
				else
					return false;
			if(type == '>=')
				if(item.attr('level') >= level)
					return true;
				else
					return false;
			if(type == '=')
				if(item.attr('level') == level)
					return true;
				else
					return false;
			if(type == '!=')
				if(item.attr('level') != level)
					return true;
				else
					return false;
			if(type == '<=')
				if(item.attr('level') <= level)
					return true;
				else
					return false;
			if(type == '<')
				if(item.attr('level') < level)
					return true;
				else
					return false;
		}

		function addFilterFunctionsButtons(second) {
			if(second) {
				jq('input[name="transfer_do"]:last').after('\
					<input type="button" title="Select All|Every items in your inventory will be selected" value="Select All" name="select_all">\
					<input type="button" title="Unselect All|Every items in your inventory will be unselected" value="Unselect All" name="unselect_all">\
					<input type="button" title="Invert All|Every items you had not selected will become selected" value="Invert All" name="invert_all">\
					<input style="width:50px" type="text" name="split">%\
					<input type="button" title="Split|Every items in your inventory will be selected in the % amount you put in the box" value="Split" name="split_button">\
					');
			} else {
				jq('input[name="transfer_do"]:first').after('\
					<input type="button" title="Select All|Every items in your inventory will be selected" value="Select All" name="select_all">\
					<input type="button" title="Unselect All|Every items in your inventory will be unselected" value="Unselect All" name="unselect_all">\
					<input type="button" title="Invert All|Every items you had not selected will become selected" value="Invert All" name="invert_all">\
					<input style="width:50px" type="text" name="split">%\
					<input type="button" title="Split|Every items in your inventory will be selected in the % amount you put in the box" value="Split" name="split_button">\
					');
			}
		}

		function filterUnselect(item) {
			jq(item).each(function() {
				var desc = jq(this).children('.desc').children();
				if(jq(this).attr('cat') != '' && jq(this).css('display') != 'none') {
					desc.children('input').attr('value', 0);
				}
			});
		}

		function filterSelect(item) {
			jq(item).each(function() {
				var desc = jq(this).children('.desc').children();
				if(jq(this).attr('cat') != '' && jq(this).css('display') != 'none') {
					desc.children('input').attr('value', desc.children('.setTotal').attr('count'));
				}
			});
		}

		function filterInvert(item) {
			jq(item).each(function() {
				var desc = jq(this).children('.desc').children();
				if(jq(this).attr('cat') != '') {
					desc.children('input').val(desc.children('.setTotal').attr('count') - desc.children('input').val());
				}
			});
		}

		function detectInventory() {
			var count = jq('fieldset table[name="transfertable"]').length;
			return count;
		}

		function addCategoriesCountTable(second) {
			if(second)
				var table = jq('fieldset table[name="transfertable"]:last');
			else
				var table = jq('fieldset table[name="transfertable"]:first');
			jq(table).parent().prepend('<div class="STB_CategoriesCount"><div></div><div></div><div></div><div></div><div></div></div><div class="clear"></div>');
			for (var i=0;i<categoriesList.length;i++)
			{
				if(second)
					var count = categoriesList[i].countFief;
				else
					var count = categoriesList[i].countInv;
				var block = '<div class="line" id="'+categoriesList[i].id+'"><img width="20" src="'+categoriesList[i].img+'" alt="'+categoriesList[i].name+' Icon" /> '+categoriesList[i].name+' ('+count+')<span class="current" val="'+count+'"></span> <span style="color:green;" class="plus"></span> <span style="color:red;" class="less"></span> <span style="color:orange;" class="total"></span></div>';
				if(i < 3)
					table.parent().children('.STB_CategoriesCount').children('div:nth-child(1)').append(block);
				if(i >= 3 && i < 6)
					table.parent().children('.STB_CategoriesCount').children('div:nth-child(2)').append(block);
				if(i >= 6 && i < 9)
					table.parent().children('.STB_CategoriesCount').children('div:nth-child(3)').append(block);
				if(i >= 9 && i < 12)
					table.parent().children('.STB_CategoriesCount').children('div:nth-child(4)').append(block);
				if(i >= 12)
					table.parent().children('.STB_CategoriesCount').children('div:nth-child(5)').append(block);
			}
		}

		function splitFunction(item, percent) {
			jq(item).each(function() {
				var desc = jq(this).children('.desc').children();
				if(jq(this).attr('cat') != '') {
					desc.children('input').attr('value', Math.round(parseInt(desc.children('.setTotal').attr('count'))*percent/100));
				}
			});
		}

		function exportFunction(storage, array) {
			if(!storage)
				var storage = '';
			if(!array)
				var array = [];
			jq('fieldset table[name="transfertable"]:first .item').each(function() {
				if(jq(this).children('.desc').children().children('input').val() != 0 && jq(this).children('.desc').children().children('input').val() != '' && jq(this).attr('cat') != '' && jq(this).attr('id') >= 0) {
					if(storage)
						var subArray = [jq(this).attr('id'), jq(this).attr('level'), jq(this).children('.desc').children().children('input').val(), jq(this).children('.desc').children().children('.setTotal').attr('count'), storage];
					else
						var subArray = [jq(this).attr('id'), jq(this).attr('level'), jq(this).children('.desc').children().children('input').val(), jq(this).children('.desc').children().children('.setTotal').attr('count')];
					array.push(subArray);
				}
			});
			return convertObjectToString(array);
		}

		function importFunction(string) {
			var array = JSON.parse(string);
			jq.each(array, function(index, value) {
				var item = jq('fieldset table[name="transfertable"]:first .item#' + value['0'] + '[level="'+value[1]+'"]');
				if(item.length > 0 || simulation) {
					var diff = parseInt(value[2]) - parseInt(item.children('.desc').children().children('.setTotal').attr('count'));
					if(diff <= 0 ) {
						item.children('.desc').children().children('input').attr('value', value[2]);
					} else {
						if(simulation) {
							var object = findObjectInArray(items, value[0]);
							var cat = getItemCategory(object.id);
							var block = createNewBlock(object.id, value[1], object.name, value[2], value[2], cat.id);
							jq('fieldset table[name="transfertable"]:first tbody').append(block);
						} else {
							alert('Missing ' + diff + ' ' + item.attr('name')) ;
							item.children('.desc').children().children('input').attr('value', item.children('.desc').children().children('.setTotal').attr('count'));
						}
					}
				} else {
					if(findObjectInArray(items, value[0]).name !== undefined)
						var name = findObjectInArray(items, value[0]).name;
					else
						var name = value[0] + ' (unknown)';
					alert('Missing item : ' + name);
				}
			});
		}

		function saveFunction(name) {
			if(slugify(name) == '' || slugify(name) > 10)
				alert('Invalid preset name (null or too long)');
			else {
				if(exportFunction() == '[]')
					alert('Selection can\'t be null');
				else {
					if(getStorage('STB_Preset')) {

						setStorage('STB_Preset', exportFunction(slugify(name), convertStringToObject(getStorage('STB_Preset'))));
					}
					else
						setStorage('STB_Preset', exportFunction(slugify(name)));
					jq('#presetList').append('<option value="'+slugify(name)+'">'+slugify(name)+'</option>');
				}
			}
		}

		function updatePresets() {
			if(getStorage('STB_Preset')) {
				var array = convertStringToObject(getStorage('STB_Preset'));
				var oldValue = '';
				jq.each(array, function(index, value) {
					if(oldValue != value[4]) {
						jq('#presetList').append('<option value="'+value[4]+'">'+value[4]+'</option>');
						oldValue = value[4];

					}
				});
			}
		}

		function getPreset(name) {
			if(getStorage('STB_Preset')) {
				var array = convertStringToObject(getStorage('STB_Preset'));
				var newArray = [];
				jq.each(array, function(index, value) {
					if(value[4] == name) {
						var subArray = [value[0], value[1], value[2], value[3]];
						newArray.push(subArray);
					}
				});
				importFunction(convertObjectToString(newArray));
			}
		}

		function deletePreset(name) {
			if(getStorage('STB_Preset')) {
				var array = convertStringToObject(getStorage('STB_Preset'));
				var newArray = [];
				jq.each(array, function(index, value) {
					if(value[4] != name) {
						newArray.push(value);
					} else {
						jq('#presetList option[value="'+name+'"]').remove();
					}
				});
				setStorage('STB_Preset', convertObjectToString(newArray));
			}
		}

		function inputChanged() {
			var inventories = detectInventory();
			var array = [];
			jq("fieldset table[name='transfertable']:first .item").each(function() {
				if(undefined === array[jq(this).attr('cat')])
					array[jq(this).attr('cat')] = jq(this).children('.desc').children().children('input').val();
				else
					array[jq(this).attr('cat')] = parseInt(array[jq(this).attr('cat')]) + parseInt(jq(this).children('.desc').children().children('input').val());
			});

			jq.each(categoriesList, function(index, value) {
				if(undefined === array[value.id])
					var val = 0;
				else
					var val = array[value.id];
				jq('.STB_CategoriesCount:first #'+value.id+' span.less').text('-' + val);
				jq('.STB_CategoriesCount:first #'+value.id+' span.less').attr('val', val);
				if(inventories == 2) {
					jq('.STB_CategoriesCount:last #'+value.id+' span.plus').text('+' + val);
					jq('.STB_CategoriesCount:last #'+value.id+' span.plus').attr('val', val);
				}
			});

			if(inventories == 2) {
				array = [];
				jq("fieldset table[name='transfertable']:last .item").each(function() {
					if(undefined === array[jq(this).attr('cat')])
						array[jq(this).attr('cat')] = jq(this).children('.desc').children().children('input').val();
					else
						array[jq(this).attr('cat')] = parseInt(array[jq(this).attr('cat')]) + parseInt(jq(this).children('.desc').children().children('input').val());
				});
				jq.each(categoriesList, function(index, value) {
					if(undefined === array[value.id])
						var val = 0;
					else
						var val = array[value.id];
					jq('.STB_CategoriesCount:last #'+value.id+' span.less').text('-' + val);
					jq('.STB_CategoriesCount:last #'+value.id+' span.less').attr('val', val);
					jq('.STB_CategoriesCount:first #'+value.id+' span.plus').text('+' + val);
					jq('.STB_CategoriesCount:first #'+value.id+' span.plus').attr('val', val);
				});
			}

			jq.each(categoriesList, function(index, value) {
				if(inventories == 2) {
					var total = parseInt(jq('.STB_CategoriesCount:first #'+value.id+' span.current').attr('val')) + parseInt(jq('.STB_CategoriesCount:first #'+value.id+' span.plus').attr('val')) - parseInt(jq('.STB_CategoriesCount:first #'+value.id+' span.less').attr('val'));
					jq('.STB_CategoriesCount:first #'+value.id+' span.total').text('=' + total);
					total = parseInt(jq('.STB_CategoriesCount:last #'+value.id+' span.current').attr('val')) + parseInt(jq('.STB_CategoriesCount:last #'+value.id+' span.plus').attr('val')) - parseInt(jq('.STB_CategoriesCount:last #'+value.id+' span.less').attr('val'));
					jq('.STB_CategoriesCount:last #'+value.id+' span.total').text('=' + total);
				} else {
					var total = parseInt(jq('.STB_CategoriesCount:first #'+value.id+' span.current').attr('val')) - parseInt(jq('.STB_CategoriesCount:first #'+value.id+' span.less').attr('val'));
					jq('.STB_CategoriesCount:first #'+value.id+' span.total').text('=' + total);
				}
			});
		}

		function createInventory() {
			simulation = true;
			jq('fieldset').append('<input style="display:none;" type="submit" value="Transfer" name="transfer_do"><table name="transfertable"><tbody></tbody></table>');
		}

		function addControls() {
			// Set All
			jq(".item .setTotal").click(function(e) {
				e.preventDefault();
				jq(this).parent().children('input').attr('value', jq(this).attr('count'));
				inputChanged();
			});
			// Add - Substract buttons
			jq(".item .abutton").click(function(e) {
				e.preventDefault();
				if(jq(this).children().attr('src') == 'img/ic_minus.png')
					if(parseInt(jq(this).parent().children('input').val()) - 1 >= 0)
						jq(this).parent().children('input').val(parseInt(jq(this).parent().children('input').val()) - 1);
					else
						jq(this).parent().children('input').val(0);
				else
					jq(this).parent().children('input').val(parseInt(jq(this).parent().children('input').val()) + 1);
				inputChanged();
			});
		}

		function generateLoomList() {
			var array = [];
			jq("fieldset table[name='transfertable']:first .item").each(function() {
				if('Gold' != jq(this).attr('name') && 'Troops' != jq(this).attr('name')) {
					var subArray = [jq(this).attr('id'), jq(this).attr('level'), jq(this).children('.desc').children().children('.setTotal').attr('count')];
					array.push(subArray);
				}
			});
			setStorage('chyTempLoom', convertObjectToString(array));
		}

		function checkLoomList() {
			if(null !== getStorage('chyTempLoom')) {
				var array = convertStringToObject(getStorage('chyTempLoom'));
				jq("fieldset table[name='transfertable']:last .item").each(function() {
					var id = jq(this).attr('id');
					var count = jq(this).children('.desc').children().children('.setTotal').attr('count');
					var found = false;
					var item = jq(this);
					var val;
					jq.each(array, function(index, value) {
						if(id == value[0]) {
							if(count == value[2]) {
								found = true;
								val = value[1];
							}
						}
					});
					if(found) {
						if(0 < id) {
							var fiefId = cutString(item.children('.desc').children().children('input').attr('name'), '[', ']');
							if(0 == findObjectInArray(fiefItems, fiefId)) {
								createFiefItem(fiefId, val);
								item.attr('level', val);
								item.children().children().attr('src', 'loadimage.php?id='+id+'&lvl='+val);
								item.children().children().attr('rel', 'itemstats.php?i='+id+'&m='+val);
							} else {
								var fiefItem = findObjectInArray(fiefItems, fiefId);
								if(fiefItem.level != val) {
									fiefItem.level = val;
									item.attr('level', val);
									item.children().children().attr('src', 'loadimage.php?id='+id+'&lvl='+val);
									item.children().children().attr('rel', 'itemstats.php?i='+id+'&m='+val);
								}
							}
						}
					}
				});
			}
		}

		function getLoomByStorage() {
			jq("fieldset table[name='transfertable']:last .item").each(function() {
				var fiefId = cutString(jq(this).children('.desc').children().children('input').attr('name'), '[', ']');
				var id = jq(this).attr('id');
				var count = jq(this).children('.desc').children().children('.setTotal').attr('count');
				var found = false;
				var item = jq(this);
				var val;
				jq.each(fiefItems, function(index, value) {
					if(fiefId == value.id) {
						item.attr('level', value.level);
						item.children().children().attr('src', 'loadimage.php?id='+id+'&lvl='+value.level);
						item.children().children().attr('rel', 'itemstats.php?i='+id+'&m='+value.level);
					}
				});
			});
		}
		
		function addToolTips() {
			jq('input[name="allowTransfer"]').attr('title', 'Allow incoming Transfer for 60 minutes|Allow players not inside your faction to transfer any items to you for one hour');
			jq('input[name="changeSleepTime"]').attr('title', 'Save|Save the nighttime setting, which is the time when battles cant take place if you are attacked');
			jq('input[name="goods[do]"]').attr('title', 'Buy Goods!|Buy the selected amount of goods and transfers it in your inventory');
			jq('input[value="Change Troop Cap"]').attr('title', 'Change Troop Cap|Increase/decrease your maximum number of troops; you automatically recruit troops up to that cap');
			jq('a[href="stuck.php"]').attr('title', 'Zoom|Click to see your exact position on the strategus map, pixel per pixel');
			
			$('input[name="allowTransfer"]').cluetip({splitTitle:'|'});
			$('input[name="changeSleepTime"]').cluetip({splitTitle:'|'});
			$('input[name="goods[do]"]').cluetip({splitTitle:'|'});
			$('input[value="Change Troop Cap"]').cluetip({splitTitle:'|'});
			$('a[href="stuck.php"]').cluetip({splitTitle:'|'});
			
			$('#STB_Export input[type=button]').cluetip({splitTitle:'|'});
			$('fieldset input[type=button]').cluetip({splitTitle:'|'});
			$('fieldset table[name="transfertable"] .item .header img').cluetip();
		}

		function createItem(id, name) {
			var Item = {
				id : id,
				name : name,
			}
			items.push(Item);
		}

		function createPlayerItem(id, idItem, level) {
			if(!level)
				level = 0;
			var Item = {
				id : id,
				idItem : idItem,
				level : level,
			}
			playerItems.push(Item);
		}

		function createCategory(id, img, name, items) {
			var Item = {
				id : id,
				img : img,
				name : name,
				items : items,
				countInv : 0,
				countFief : 0,
				addCount : function(add, fief) {
					if(fief) {
						Item.countFief += parseInt(add);
					} else {
						Item.countInv += parseInt(add);
					}
				}
			}
			categoriesList.push(Item);
		}

		function createFiefItem(id, level) {
			var Item = {
				id : id,
				level : level,
			}
			fiefItems.push(Item);
		}

		jq(document).ready(function() {

			if(isInInventoryPage()) {
				if(null !== getStorage('chyItemsString'))
					items = convertStringToObject(getStorage('chyItemsString'));
				if(null !== getStorage('chyPlayerItemsString'))
					playerItems = convertStringToObject(getStorage('chyPlayerItemsString'));
				scanInventory();
				setStorage('chyItemsString', convertObjectToString(items));
				setStorage('chyPlayerItemsString', convertObjectToString(playerItems));
			}

			if(isInInfoPage()) {
				var inventories = detectInventory();
				if(inventories == 0) {
					createInventory();
				}
				sortSelectBoxes();
				generateCategories();
				addFilterButtons();
				addFilterFunctionsButtons();
				addExportButtons();
				updatePresets();
				items = convertStringToObject(getStorage('chyItemsString'));
				playerItems = convertStringToObject(getStorage('chyPlayerItemsString'));
				rebuildInfo();
				addCategoriesCountTable();
				if(inventories == 2) {
					rebuildInfo(true);
					addFilterFunctionsButtons(true);
					addCategoriesCountTable(true);
				}
				addControls();
				if(null !== getStorage('chyFiefItems')) {
					fiefItems = convertStringToObject(getStorage('chyFiefItems'));
					getLoomByStorage();
				}
				checkLoomList();
				setStorage('chyFiefItems', convertObjectToString(fiefItems));
				generateLoomList();
				sortItems();
				colorizeItems();
				addToolTips();

				jq(".filter-buttons").click(function() {
					jq(".filter-buttons").each(function() {
						jq(this).removeClass('selected');
						jq(this).css({'background-color' : 'transparent'});
					});
					jq(this).css({'background-color' : LIGHT_GREY});
					jq(this).addClass('selected');
					filterItems();
				});
				jq(".filter-buttons").hover(
					function() {
						if(jq(this).attr('class') != 'filter-buttons selected')
							jq(this).css({'background-color' : LIGHTEST_GREY});
					},
					function() {
						if(jq(this).attr('class') != 'filter-buttons selected')
							jq(this).css({'background-color' : 'transparent'});
					}
				);
				jq('#filter-search-bar').keyup(function() {
					filterItems();
				});
				jq('select[name="loomComparator"]').change(function() {
					filterItems();
				});
				jq('select[name="loomLevel"]').change(function() {
					filterItems();
				});
				// Filter Functions Buttons
				// Select
				jq('input[name="select_all"]').click(function(e) {
					e.preventDefault();
					filterSelect(jq(this).parent().children('table').children().children('.item'));
					inputChanged();
				});
				// Unselect
				jq('input[name="unselect_all"]').click(function(e) {
					e.preventDefault();
					filterUnselect(jq(this).parent().children('table').children().children('.item'));
					inputChanged();
				});
				// Invert
				jq('input[name="invert_all"]').click(function(e) {
					e.preventDefault();
					filterInvert(jq(this).parent().children('table').children().children('.item'));
					inputChanged();
				});
				// Split
				jq('input[name="split_button"]').click(function(e) {
					e.preventDefault();
					splitFunction(jq(this).parent().children('table').children().children('.item'), jq(this).parent().children('input[name="split"]').val());
					inputChanged();
				});
				// Export
				jq('#exportButton').click(function(e) {
					e.preventDefault();
					jq('#exportInput').attr('value', exportFunction());
				});
				// Import
				jq('#importButton').click(function(e) {
					e.preventDefault();
					importFunction(jq('#importInput').val());
					colorizeItems();
					$('fieldset table[name="transfertable"]:first .item .header img').cluetip();
					addControls();
					inputChanged();
				});
				// Save preset
				jq('#saveButton').click(function(e) {
					e.preventDefault();
					saveFunction(jq('#saveInput').val());
				});
				// Use preset
				jq('#presetButton').click(function(e) {
					e.preventDefault();
					getPreset(jq('#presetList').val());
					colorizeItems();
					$('fieldset table[name="transfertable"]:first .item .header img').cluetip();
					addControls();
					inputChanged();
				});
				// Delete preset
				jq('#deletePresetButton').click(function(e) {
					e.preventDefault();
					deletePreset(jq('#presetList').val());
				});
				// Input Change
				jq('.item .in').keyup(function() {
					inputChanged();
				});

				jq('.clear').css({'clear' : 'both'});
				jq('.filter-buttons').css({
					'cursor' : 'pointer',
					'padding-right' : '15px',
					'padding-left' : '15px'
				});
				jq('.STB_CategoriesCount').css({'margin-bottom' : '50px'});
				jq('.STB_CategoriesCount div').css({
					'float' : 'left'
				});
				jq('.STB_CategoriesCount .line').css({
					'width' : '300px'
				});
			}
		});

	}

}