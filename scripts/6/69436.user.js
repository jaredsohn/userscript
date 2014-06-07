// ==UserScript==
// @name           Cacher Liens Verts
// @namespace      HideGreenLink
// @description    Cacher Liens Verts
// @include        http://s*.ikariam.*/index.php*
// ==/UserScript==


	Option("masquage des villes alliées", "le masquage des villes alliées avec des troupes ?", 'autohide');
	
	if(GM_getValue('autohide')){

		/*
		var VilleN = this._Parent.DOM.Get_First_Node("//ul[@class='cityinfo']/li[contains(@class,'name')]");
		var village = CitiesColor.getElementsByTagName('span');
		village[0].innerHTML = '<span class="taBash taGreen">' + village[0].innerHTML + '</span>';
		
		*/
		
		
		
		var allOptions, thisOption;
		allOptions = document.evaluate(
		    "//option[@class='deployedCities coords']",
		    document,
		    null,
		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		    null);
			for (var i = 0; i < allOptions.snapshotLength; i++) {
			    thisOption = allOptions.snapshotItem(i);
				//newElement = document.createElement('TOTOTOTO');
				//thisOption.parentNode.insertBefore(newElement,thisOption);
				thisOption.parentNode.removeChild(thisOption);
			}
			
			
			//<li class="deployedCities coords"
		var allLi, thisLi;
		allLi = document.evaluate(
		    "//li[@class='deployedCities coords']",
		    document,
		    null,
		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		    null);
			for (var i = 0; i < allLi.snapshotLength; i++) {
			    thisLi = allLi.snapshotItem(i);
				thisLi.parentNode.removeChild(thisLi);

		}
				var allLi, thisLi;
		allLi = document.evaluate(
		    "//li[@class='deployedCities coords last']",
		    document,
		    null,
		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		    null);
			for (var i = 0; i < allLi.snapshotLength; i++) {
			    thisLi = allLi.snapshotItem(i);
				thisLi.parentNode.removeChild(thisLi);
		}

			
		/*
		 GM_log("coucou");
		var server = document.domain;
		var currentCityId   = parseInt($X('//select[@id="citySelect"]/option[@selected]').value,10);
		var selfCache       = generateSelfCache();
  */


	}
	


function $(id) {
	return document.getElementById(id); 
}

function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while (next = got.iterateNext())
        result.push( next );
      return result;
  }
}

function $X( xpath, root ) {
	var got = $x( xpath, root ); return got instanceof Array ? got[0] : got; 
}

function Option(titre, message, nom){
	actuel = "Activer";
	if(GM_getValue(nom)){actuel="Désactiver";}
	GM_registerMenuCommand(actuel+" "+titre,fonction);
	function fonction()
	{
		if(confirm("Voulez vous vraiment "+actuel+" "+message))
		{
			if(GM_getValue(nom)){GM_setValue(nom, false);}else{GM_setValue(nom, true);}
		}
	location.reload();
	}
}


function generateSelfCache(){
  var cache = {};
  for each (var town in $x('./option',$('citySelect'))){
    if (town.innerHTML.charAt(0) == '[') {  //todo: move this if statement outside the loop
      // COORDS in town navigation
      cache[town.value] = {
        'name'     : town.innerHTML.replace('&nbsp;',' ').replace(/\[[0-9:\s]+\]\s+/,''),
        'position' : town.innerHTML.match(/\[([0-9:\s]+)\]/,'')[1].replace(/00/g,'100'),
        'tradegood': town.title.substring(12)
      };
	  GM_log(town.innerHTML);
    } else {
      // TRADE GOOD in town navigation
      var coords = town.title;
      coords     = coords.substr(1,coords.length-2);
      cache[town.value] = {
        'name':town.innerHTML,
        'position':coords,
        'tradegood':unsafeWindow.LocalizationStrings['resources'][town.className.charAt(town.className.indexOf('tradegood')+9)]
      };
	  GM_log(town.innerHTML);
    }
  }
  return cache;
}
