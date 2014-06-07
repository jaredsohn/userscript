// ==UserScript==
// @name           Mafia Wars Sort Loot
// @namespace      http://userscripts.org/users/andone
// @include        http://facebook.mafiawars.com/mwfb/*
// @version 0.0.4
// ==/UserScript==



//find if the page is Loot
//xpath is /html/body/div[4]/div/div/table/tbody/tr[8]/td[2]/div/ul/li[7]/div/a
try{


function xpathFirst(p, c) {
  return document.evaluate(p, c || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}

function $x(p, c) {
  var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
  while ((i = x.iterateNext())) r.push(i);
  return r;
}

function xpath(query, element) {
  var elt = (element == null) ? document : element;
  return document.evaluate(query, elt, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function getText(x_path,c) {
	var el = xpathFirst(x_path,c);
	if ( el )
		return el.textContent;//innerHTML;
	return "";
}

function makeElement(type, appendto, attributes, checked, chkdefault) {
  var element = document.createElement(type);
  if (attributes != null) {
    for (var i in attributes) {
      element.setAttribute(i, attributes[i]);
    }
  }
  if (checked != null) {
    if (GM_getValue(checked, chkdefault) == 'checked') {
      element.setAttribute('checked', 'checked');
    }
  }
  if (appendto) {
    appendto.appendChild(element);
  }
  return element;
}
function clickElement(elt) {
  if (!elt) {
  	alert("click not available")
    return;
  }

  // Simulate a mouse click on the element.
  var evt = document.createEvent('MouseEvents');
  evt.initMouseEvent("click", true, true, window,
                     0, 0, 0, 0, 0, false, false, false, false, 0, null);
  elt.dispatchEvent(evt);
}

function domInsertAfter(refNode,newNode) {
	var parent = refNode.parentNode;
	var next = refNode.nextSibling;
	parent.insertBefore(newNode, next);
}
function domRemove(node){
	node.parentNode.removeChild(node);
}


function enhanceCategory(cat) {
  //remove the trWeapons with domRemove(prev_tr);
  //and then add it to a newly created table
  //first create a new tr > table with domInsertAfter(tr,new_tr);
  var current_tr;
  var new_tr;
  var new_table;
  var new_td;
  var new_div;
  if ( fightCategories[cat] == null || fightCategories[cat].isEnhanced == true ) {
    return;
  }
  current_tr = fightCategories[cat].tr;
  new_tr = makeElement('tr');
  new_td = makeElement('td',new_tr,{
    'colspan':'5'
  });
  new_div = makeElement('div',new_td, {
    'style':'height:500px;overflow:scroll;'
  });
  domInsertAfter(current_tr,new_tr);
  new_table = makeElement('table',new_div, {
    'style':'width: 100%;'
  });
  new_tr = makeElement('tr',new_table);
  domRemove(current_tr);
  domInsertAfter(new_tr,current_tr);
  fightCategories[cat].isEnhanced = true;
}

//sort list of items
function sortCategory(category,what) {
  var trCategory = fightCategories[category].tr;
  if ( !trCategory )
    return;
  if ( what!='attack' && what!='defense' )
    return;//nothing to do
  var items = [];
  var tr;
  var prev_tr;
  prev_tr = null;
  tr = trCategory.nextElementSibling;
  var xpathNextCat = './/td/h3/span[@class="text"]';
  while (prev_tr != tr && tr && getText(xpathNextCat, tr).length == 0) {
    var itemName = getText('.//td[2]/strong', tr);
    var attack = parseInt(getText('.//td[2]/table//td[1]', tr));
    var defense = parseInt(getText('.//td[2]/table//td[2]', tr));
    //check if isNaN before adding to dictionary
    if (itemName.length > 0 && !isNaN(attack) && !isNaN(defense)) {
      //add to dictionary
      //get attack and defense values
//						alert("item "+itemName+" with attack "+attack+" and defense "+defense);		
      items[items.length] = {
        attack: attack,
        defense: defense,
        tr: tr
      };
    }
    prev_tr = tr;
    tr = tr.nextElementSibling;
    //remove even if not added to items as only the items will be inserted again
    domRemove(prev_tr);
    
  }
  //alert("found "+items.length+" "+trCategory.textContent)
  //sort by attack descending
  function compareAttack(w1, w2){
    if (w2.attack==w1.attack)
      return w2.defense-w1.defense;
    return w2.attack - w1.attack;
  }
  //sort by defense descending
  function compareDefense(w1, w2){
    if (w2.defense==w1.defense)
      return w2.attack-w1.attack;
    return w2.defense - w1.defense;
  }
  var compareFunc;
  if (what == 'attack')
    compareFunc = compareAttack;
  else if (what == 'defense')
    compareFunc = compareDefense;
  if ( fightCategories[category].doNotSort ) {
    ;//do not sort
  } else
    items.sort(compareFunc);
  //build the right table if neccessary
  enhanceCategory(category);
  //reinsert items in table
  tr = trCategory;
  var i;
  for(i=0;i<items.length;i++) {
    var new_tr = items[i].tr;
    domInsertAfter(tr,new_tr);
    tr = new_tr;
  }
  //alert("done sorting "+trCategory.textContent);
}

function sort(what) {
  if ( what!='attack' && what!='defense' )
    return;//nothing to do
  try {
    //alert("sorting, please wait")
    for( cat in fightCategories )
      sortCategory(cat,what);
    //sortCategory(trWeapons,what);
    //sortCategory(trArmor,what);
    //sortCategory(trVehicles,what);
  } catch(ex) {
    alert("[sort("+what+")] exception occured, please report: "+ex.message);
  }
}

//add jump to links
function jumps() {
	var titles = $x(".//div[@class='title']");
	var maintitle = titles[0];
	//add debug info
	/*
	var ad = makeElement('a',maintitle, {
		'style':'font-size:10px;padding-left:40px;'
	});
	ad.innerHTML = "debug info";
	ad.addEventListener('click', function(){
		alert("debug!")
		return false;
	}, false);
	*/
	var a = makeElement('a',maintitle, {
		'name': 'maintitle'
	});
	var div = makeElement('div', maintitle, {
		'style': 'font-size:12px'
	});
	div.innerHTML="Jump to: ";
	var subtitles = $x(".//span[@class='text']");
	for (i=0; i< subtitles.length; i++ ) {
		var s = subtitles[i];
		var t = s.textContent;
		var id = 'subtitle'+i
		var a3 = makeElement('a',s,{
			'name': id
		})
		a3.innerHTML="&nbsp;";
		var a1 = makeElement('a', s, {
			'href':'#maintitle',
			'style':'font-size: 10px'
		});
		a1.innerHTML = "back to TOP";

		var a2 = makeElement('a', div, {
			'href': '#'+id
		});
		a2.innerHTML = t;
		var space = makeElement('span',div);
		space.innerHTML="&nbsp;&nbsp;";
		//alert(s.textContent)
	}
};

var fightCategories = {}


function prepareSort() {
	try {
		var xpath1 = './/ul[contains(@class,"tabs")]/li[contains(@class,"tab_on")]/div[contains(@class,"tab_content")]';
		if( getText(xpath1+'/a') == "Loot" && xpathFirst(xpath1+'/span')==null) {
	
	    var trWeapons;
	    var trArmor;
	    var trVehicles;
	    var trSpecialLoot;
		var trAnimals;
	    //on loot page, find weapons, armor and vehicles
	    var xpathAll = './/div[@id="inner_page"]/div/table[@class="main_table"]'
	    var table = xpathFirst(xpathAll);
	    var xpathCategory = './/tr/td/h3/span[@class="text"]';
	    var categories = $x(xpathCategory,table);
	    for(i=0;i<categories.length;i++) {
	      var trCat = categories[i].parentNode.parentNode.parentNode;
	      if ( categories[i].textContent.indexOf("Weapons")>=0 )
	        trWeapons = trCat;
	      else if ( categories[i].textContent.indexOf("Armor")>=0 )
	        trArmor = trCat;
	      else if ( categories[i].textContent.indexOf("Vehicles")>=0 )
	        trVehicles = trCat;
	      else if ( categories[i].textContent.indexOf("Special Loot")>=0 )
	        trSpecialLoot = trCat;
	      else if ( categories[i].textContent.indexOf("Animals")>=0 )
	        trAnimals = trCat;
	    }
	    fightCategories['weapons'] = { tr:trWeapons, isEnhanced: false};
	    fightCategories['armor'] = { tr:trArmor, isEnhanced: false};
	    fightCategories['vehicles'] = { tr:trVehicles, isEnhanced: false};
	    fightCategories['specialloot'] = { tr:trSpecialLoot, isEnhanced: false, doNotSort:true};
	    fightCategories['animals'] = { tr:trAnimals, isEnhanced: false};
	    
			
			var el = xpathFirst(xpath1);
			makeElement('br',el);
			var span = makeElement('span',el,{
				'class': 'levels'
			});
			span.innerHTML = "Sort: ";
			var a1 = makeElement('a',span);
			a1.addEventListener('click', function(){
				sort('attack');
				return false;
			}, false);
			a1.innerHTML = 'Att';
			var span2 = makeElement('span',span);
			span2.innerHTML+=" | ";
			var a2 = makeElement('a',span);
			a2.addEventListener('click', function(){
				sort('defense');
				return false;
			}, false);
			a2.innerHTML = 'Def';
	
			jumps();
		}
		window.setTimeout(prepareSort,5000);
	} catch(ex) {
		alert("[prepareSort] exception occured, please report: "+ex.message);
	}
}
prepareSort();


}catch(ex){
	alert("[global] exception occured, please report: "+ex.message);
}