// ==UserScript==
// @name           zBar Blocker
// @description    Hides zBar graphics
// @include        http://*zynga.com*
// @include        http://*warstorm.com*
// @include        http://*mafiawars.com*
// @include        http://*farmville.com*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        0.0.4
// @copyright      Charlie Ewing
// @require        http://sizzlemctwizzle.com/updater.php?id=99638&days=1
// ==/UserScript== 

(function() { 

	var version = "0.0.4";

	function $(ID,root) {return (root||document).getElementById(ID);}

	//short form for evaluate
	function selectNodes(xPath,params){
		params=(params||{});
		return (params['doc']||document).evaluate(xPath,(params['node']||document),null,(params['type']||6),null);
	}

	//short form for evaluate with single node return
	function selectSingleNode(xPath,params){
		params=params||{}; params['type']=9;
		return selectNodes(xPath,params).singleNodeValue;
	}

	function run(){
		try{
			//hide div versions, like for frontierville
			var div=$('zbarContainer') || $('cafe_snapi_zbar') || $('zbar_snapi') || $('snapi_zbar') || selectSingleNode(".//iframe[contains(@src,'http://zbar.zynga.com/')]");
			if(div){
				if (!div.previousSibling && !div.nextSibling) div=div.parentNode;
				var style="display:none;"+div.getAttribute('style');
				div.setAttribute('style',style);
			} else window.setTimeout(function(e){run();},500);

		} catch(e){window.setTimeout(function(e){run();},500);}
	}

	run();

})(); // anonymous function wrapper end