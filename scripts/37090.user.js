// ==UserScript==
// @name           LandGrab Favorite Maps
// @namespace      landgrab_favorite_maps
// @description    Easily set and select your favorite maps
// @include        http://www.landgrab.net/landgrab/NewGame*
// @include        http://landgrab.net/landgrab/NewGame*
// @include        http://www.landgrab.net/landgrab/ViewBoard*
// @include        http://landgrab.net/landgrab/ViewBoard*
// ==/UserScript==

/**
 * A script to easily select your favorite maps
 * @author Matthew Poplawski <poplawski@gmail.com>
 * based on script by Jakub Caban <kuba.iluvatar@gmail.com>
 * @license Use it if you like it
 */

favMapsArray = eval(GM_getValue('LG_FAV_MAPS', '[]')); //retrieve from about:config



var oRatingSpan = document.getElementById("rating_span");   //Better position available?

if (oRatingSpan){  //*Setup "Favoriting" Button on Game Screen
	var oFavButton = CreateButton("Add to Fav's");
	oRatingSpan.parentNode.insertBefore(oFavButton,oRatingSpan);
	oFavButton.addEventListener("click", function(){AddGameplayMap()},true);
}


var oMapFilterOptions = document.getElementById("map_filter_options");   //Better position available?

if (oMapFilterOptions){  //*Setup Map Management Buttons on New Game Screen

	var oFilterFavs = CreateButton("Filter for Favorites");
	oMapFilterOptions.parentNode.appendChild(oFilterFavs);
	oFilterFavs.addEventListener("click", function(){UpdateFilterMapsFav()},true);

	var oBAdd = CreateButton("Add Map to Favorites");
	oMapFilterOptions.parentNode.appendChild(oBAdd);
	oBAdd.addEventListener("click", function(){AddFavMap()},true);

	var oRemoveFav = CreateButton("Remove Favorite");
	oMapFilterOptions.parentNode.appendChild(oRemoveFav);
	oRemoveFav.addEventListener("click", function(){RemoveFav()},true);

	var oClear = CreateButton("Clear All Favorites");
	oMapFilterOptions.parentNode.appendChild(oClear);
	oClear.addEventListener("click", function(){ClearAllFavs()},true);
}


function AddGameplayMap(){
	var mapPath = unescape(document.getElementById("visible_map_image").src)
	var iLen = mapPath.length;
	var mapName = Right(Left(mapPath,iLen-14),iLen-48);
	if(IsExistingFav(mapName)) {
		alert("Map is already a favorite.");
		return false;
	}
	else
	{
		favMapsArray[favMapsArray.length] = mapName;
		GM_setValue('LG_FAV_MAPS', uneval(favMapsArray));  //saves it in about:config
		alert(mapName+" added as favorite."); 
	}	
	return true;
}


function AddFavMap(){
	var oMapSelected = document.getElementById("gameMapSelect");
	var mapName = oMapSelected.options[oMapSelected.selectedIndex].value;
	if(IsExistingFav(mapName)) {
		alert("Map is already a favorite.");
		return false;
	}
	else
	{
		favMapsArray[favMapsArray.length] = mapName;
		GM_setValue('LG_FAV_MAPS', uneval(favMapsArray));  //saves it in about:config 
	}	
	return true;
}


function CreateButton(inside){
	var oAdd = document.createElement("input");
	oAdd.class = "lg_button";
	oAdd.type = "button";
	oAdd.value = inside;
	oAdd.style.fontSize = '10pt';
	oAdd.style.backgroundImage = 'url(http://landgrab.net/landgrab/images/button_back.png)';
	oAdd.style.backgroundRepeat = 'repeat';
	oAdd.style.border = '1px groove rgb(135,135,135)';
	oAdd.style.paddingTop = '1px';
	oAdd.style.paddingBottom = '1px';
	oAdd.style.marginRight = '10px';
	return(oAdd);
}	


function UpdateFilterMapsFav(){
	var oMapSelect=document.getElementById("gameMapSelect");
	if (favMapsArray.length==0){
		alert("You have no favorite maps.")
		return true;
	}
	oMapSelect.options.length=0;
	for(var ndx=0;ndx<favMapsArray.length;ndx++){
		oMapSelect.options[oMapSelect.options.length]=new Option(favMapsArray[ndx],favMapsArray[ndx]);
	}

	return true;
}


function IsExistingFav(newFavMapName){
	var favExists = false;
	for(var ndx=0;ndx<favMapsArray.length;ndx++){
		if (favMapsArray[ndx]==newFavMapName){
			favExists = true;
		}
	}
	return favExists;
}


function RemoveFav(){
	var oMapSelected = document.getElementById("gameMapSelect");
	var mapName = oMapSelected.options[oMapSelected.selectedIndex].value;
	if(IsExistingFav(mapName)) {
		favMapsArray = scanReduce(favMapsArray,mapName);
		alert("Removed "+mapName+".")
		GM_setValue('LG_FAV_MAPS', uneval(favMapsArray));  //saves it in about:config
		UpdateFilterMapsFav();
	}
	return true;
}


function ClearAllFavs(){
	if(confirm("Click OK to clear ALL favorite maps.")){
		favMapsArray.length=0;	
		GM_setValue('LG_FAV_MAPS', uneval(favMapsArray));  //saves it in about:config 
	}
	return true;
}


function scanReduce(A,removeThis) { // After Dom Leonard, c.l.j, 2003-07-15
var u, i=-1, j=-1, k=A.length
while (++j < k) if (!(A[j]==removeThis)) A[++i]=A[j]
A.length = ++i
return A }

function Left(str, n){
	if (n <= 0)
	    return "";
	else if (n > String(str).length)
	    return str;
	else
	    return String(str).substring(0,n);
}

function Right(str, n){
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}
