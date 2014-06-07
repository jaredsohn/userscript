// ==UserScript==
// @name			Produs (Proddable Pardus)
// @namespace		Produs
// @description		Makes Pardus a little more touch-friendly.
// @grant			none
// @include			http*://*.pardus.at/main.php*
// @include			http*://*.pardus.at/starbase.php*
// @include			http*://*.pardus.at/planet.php*
// @version			1.0
// @author			Richard Broker (Beigeman)
// ==/UserScript==

var my_document = document;
var nav_size = unsafeWindow.navAreaSize;
var img_dir = unsafeWindow.imgDir;
var current_url = my_document.URL;
var sector, coords, aps_left, field_res, fuel;
var ap_img, res_img, fuel_img;
var starbase, planet, building, my_building, new_building, ambush, retreat, dock, harvest, refuel, warp, xwarp, xwarp_menu, wreck;
var protection = null;
var partial_refresh = false;
var in_callback = false;
const TEXT_NODE = 3;
var mod = { STARBASE : 0, PLANET : 1, BUILDING : 2,  MY_BUILDING : 3, NEW_BUILDING : 4, WARP : 5, AMBUSH : 6, RETREAT : 7, REFUEL : 8, DOCK : 9, HARVEST : 10, XWARP : 11, WRECK : 12};

universe();

/* Add a callback to support partial page refreshes. */
if (unsafeWindow.addUserFunction !== undefined) {		
	unsafeWindow.addUserFunction(doNav);		
}

/*
 * Nav Screen Modifications
 */
function universe ()
{
    doNav();
	doStarbase();
	doPlanet();
}

function doNav ()
{	
	if (current_url.indexOf("main.php") != -1)
    {
		if(my_document.getElementById("nav"))
		{
			partial_refresh = true;
		}	
		
	   /* Get rid of the left column as soon as possible, so the popping is less noticable. */        
		var left_column = my_document.getElementById("tdTabsLeft");	
		var middle_column = my_document.getElementById("tdSpaceChart");	
        var right_column = my_document.getElementById("tdTabsRight");
		
        middle_column.setAttribute('width', ((unsafeWindow.tileRes * nav_size) + 50) + "px");
		left_column.setAttribute('style', 'display:none;');
        middle_column.childNodes[2].setAttribute('align', 'center');
        right_column.setAttribute('align', 'left');

        
        /* Add ship status */
        if(partial_refresh)
        {	
            var previous_clone = my_document.getElementById('yourship_clone');
            if(previous_clone)
            {
                previous_clone.parentNode.removeChild(previous_clone);
            }
        }
        
        var otherships = my_document.getElementById('otherships');
        var your_ship = getClone("yourship");
        your_ship.id = "yourship_clone";
 
        var produs_br = my_document.getElementById('produs_br');
        if(produs_br)
        {
            right_column.insertBefore(your_ship, produs_br);
        }
        else
        {
            right_column.insertBefore(your_ship, otherships);
            var br_container = my_document.createElement('div');
            br_container.id = "produs_br";
            br_container.appendChild(my_document.createElement('br'));
            br_container.appendChild(my_document.createElement('br'));
            right_column.insertBefore(br_container, otherships);
        }
	
        if (current_url.indexOf("main.php?ccp=1") != -1)
        {
            /* We've requested the protection status also */
            protection = getProtectionStatus();
        }	

        /* Grab the page elements we're interested in moving. */
        sector = getClone("sector");
        coords = getClone("coords");
        aps_left = getClone("apsleft");
        field_res = getClone("fieldres");
        fuel = getClone("fuel");

        ap_img = getClone("tdStatusApsImg");
        res_img = getClone("tdStatusResImg");
        fuel_img = getClone("tdStatusFuelImg");

        var status_box = getClone("status");

		var links = my_document.getElementsByTagName('a');		
			
		starbase = modNode(my_document.getElementById("aCmdStarbase"), mod.STARBASE);                
        planet = modNode(my_document.getElementById("aCmdPlanet"), mod.PLANET);
		building = modNode(my_document.getElementById("aCmdBuilding"), mod.BUILDING);
        my_building = modNode(my_document.getElementById("aCmdOwnBuilding"), mod.MY_BUILDING);
        new_building = modNode(my_document.getElementById("aCmdBuild"), mod.NEW_BUILDING);
        warp = modNode(my_document.getElementById("aCmdWarp"), mod.WARP);
		xwarp = modNode(my_document.getElementById("aCmdWarpX"), mod.XWARP);
		ambush = modNode(my_document.getElementById("aCmdAmbush"), mod.AMBUSH);
        retreat = modNode(my_document.getElementById("aCmdRetreatInfo"), mod.RETREAT);					
        refuel = modNode(my_document.getElementById("aCmdTank"), mod.REFUEL);
        dock = modNode(my_document.getElementById("aCmdDock"), mod.DOCK);
        harvest = modNode(my_document.getElementById("aCmdCollect"), mod.HARVEST);
		wreck = modNode(my_document.getElementById("aCmdWreck"), mod.WRECK);		
		
		var nav_table = getNavTable();

        /* Reflow the elements we've manipulated. */
        prepend_status(nav_table);
        append_commands(nav_table);
    }
}

/*
 * Reflows the starbase screen.
 */
function doStarbase()
{	
	if(current_url.indexOf("starbase.php") != -1)
	{
		var popularity_value = my_document.getElementById("popularity_value");
		
		if(popularity_value)
		{
			var popularity_greeting = my_document.getElementById("popularity_greeting");
			popularity_value.parentNode.removeChild(popularity_value);
			popularity_greeting.parentNode.removeChild(popularity_greeting);
		}
		
		var table = firstEChild(my_document.body);
		var tbody = firstEChild(table);
		var content = tbody.childNodes[1];
		var content_td = content.childNodes[1];		
	
	    /* Remove gossiper portraits. */
	    var tables = document.getElementsByTagName('table');
	    var content_div = document.getElementsByTagName('div')[0];
	    content_div.removeChild(content_div.childNodes[1]); /* Gossipers 1&2. */
	    content_div.removeChild(content_div.childNodes[4]); /* Gossipers 3&4 (empty innerHTML if missing, just remove anyway).*/

        /* Remove starbase population display. */
        var popSpan = document.getElementsByTagName('span')[1];
        popSpan.parentNode.removeChild(popSpan);
        
		/* Only NPC starbases have popularity, so we use that to determine conditional actions. */
		if(!popularity_value)		
		{	
		    /* Remove commander name, alliance links. */	   		   
			var commander = tables[4];			
			commander.parentNode.removeChild(commander);
			
			/* Remove the custom welcome message. */
			if(tables.length  > 5)
			{
    			var welcome_message = tables[5];
	    		welcome_message.parentNode.removeChild(welcome_message);
	    	}
		}
		
	    /* Align things properly. */
	    content_div.setAttribute('style', 'clear:both');
        tables[3].setAttribute('align', 'left');        
		
		/* Make the service links touch-friendly */
		padLinks();
	}
}

/*
 * Reflows planet screens.
 */
function doPlanet()
{
	if(current_url.indexOf("planet.php") != -1)
	{
		var popularity_value = my_document.getElementById("popularity_value");
		
		if(popularity_value)
		{
			var popularity_greeting = my_document.getElementById("popularity_greeting");
			popularity_value.parentNode.removeChild(popularity_value);
			popularity_greeting.parentNode.removeChild(popularity_greeting);
		}
			
		var table = firstEChild(my_document.body);
		var tbody = firstEChild(table);
		var content = tbody.childNodes[1];	
		var content_tbl = content.childNodes[1];		
		content_tbl.setAttribute('align', 'left');
		var links = firstEChild(firstEChild(firstEChild((content_tbl.childNodes[3]))));
		
		/* Remove gossiper portraits. */
	    var tables = document.getElementsByTagName('table');
	    var content_div = document.getElementsByTagName('div')[0];
	    content_div.removeChild(content_div.childNodes[1]); /* Gossipers 1&2. */
	    content_div.removeChild(content_div.childNodes[4]); /* Gossipers 3&4 (empty innerHTML if missing, just remove anyway).*/
	    
        /* Remove starbase population display. */
        var popSpan = document.getElementsByTagName('span')[1];
        popSpan.parentNode.removeChild(popSpan);
		
		links.setAttribute('align', 'left');		
		links.removeChild(links.childNodes[2]);
		links.childNodes[1].setAttribute('align', 'left');
		
		padLinks();		
	}
}

/* Clones node "node_str" from original document. */
function getClone(node_str)
{
	var node = my_document.getElementById(node_str);
	
	if(node != null)
	{
		return node.cloneNode(true);
	}
	else
	{
		return null;
	}
}

/*
 * Generic link padding for better clickability on planets/starbases.
 */
function padLinks()
{	
	var images = my_document.getElementsByTagName('img');	
	for(var i = 0; i < images.length; i++)
	{		
		if(images[i].src.indexOf("/factions/sign_") != -1)
		{
			if(images[i].parentNode.childNodes.length < 2)
			{							
				images[i].parentNode.parentNode.removeChild(images[i].parentNode);
			}
			else
			{				
				images[i].parentNode.removeChild(images[i]);
			}
			/* We just removed an element, so adjust our index accordingly. */
			i--;
		}
	}
	
	var separators = my_document.getElementsByTagName('hr');
	
	for(var i = 0; i < separators.length; i++)
	{		
		separators[i].setAttribute('style', 'display:none');		
	}
	
	var links = my_document.getElementsByTagName('a');	
	
	for(var i = 0; i < links.length; i++)
	{
		if(links[i].href != "javascript:showStory();")
		{		
			links[i].setAttribute('style', 'display:block;padding:15px 0;border-top-style:solid;border-bottom-style:solid;border-width:1px;');				
		}
		else
		{
			links[i].setAttribute('style', 'display:none');
		}
	}
	
	var br = my_document.getElementsByTagName('br');		
	while(br.length > 0)
	{					
		br[0].parentNode.removeChild(br[0]);	
	}
}

/*
 * Gets the first child node which is not a text node.
 */
function firstEChild(node)
{
	for(var i = 0; i < node.childNodes.length; i++)
	{
		if(node.childNodes[i].nodeType != TEXT_NODE)
		{
			return node.childNodes[i]; 
		}
	}
	return null;
}

/*
 * Replaces the given node with a modified version.
 */
function modNode(node, mod_desired)
{
	if(node)
	{
		if( node.childNodes.length > 0 )
		{			
			var mod = getModElement(mod_desired);
			removeChildNodes(node);
			node.appendChild(mod);			
			improveClickability(node);
			return node;
		}
	}
	return null;
}

/*
 * Makes the entire containing TD clickable.
 */
function improveClickability(node)
{
	node.setAttribute('style', 'display:block');
	node.setAttribute('width', '100%');
	node.setAttribute('height', '100%');
}

/*
 * Returns true, if the script has detected that there is protection on this tile.
 */
function getProtectionStatus()
{
	var protection_text = my_document.getElementById("tdStatusTerritory").childNodes[2];
	
	if(protection_text.textContent == "You cannot be attacked here.")
	{		
		return true;
	}
	else
	{		
		return false;
	}
}

/*
 * Destroys all child nodes of the given node.
 * - Assumes "hasChildNodes" has already been called.
 */
function removeChildNodes(node)
{
	while ( node.childNodes.length >= 1 )
	{
		node.removeChild(node.firstChild );
	} 
}

/*
 * Returns an element representing the desired modification.
 */
function getModElement(mod_desired)
{
	var new_element = my_document.createElement('img');
	
	switch(mod_desired)
	{
		case mod.STARBASE:			
			new_element.setAttribute('src', getImgSrcByPartName("/foregrounds/starbase"));
		break;
		
		case mod.PLANET:
			new_element.setAttribute('src', getImgSrcByPartName("/foregrounds/planet"));
		break;
		
		case mod.BUILDING:
		case mod.MY_BUILDING:
			new_element.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAQFJREFUaN7tl9FNw0AQRJ8jCjAdUAJIU0DoAJdABSEd4ApSQlpxAfvhDigBdwAf3IcVkcix7iAnzftb60br0e2OZTDGGGOMMcYY8z801xyOiE+gXdFnknRfwsDmyvPtyj5tqRvY1D5C1Ru4+6tGEdECH2fGaZT0VMMNnNuFx4g43LQBSdNJ3UhqgOf06C0iXqrbAUkD0KfyGBEP1S2xpHdgSCN2rDWFOmACtjeZQr+k0pe/Azbws3hdisMOGAvrshoYgT2wS/O8A14XvMxaXRYD849RDxxmqbFNdX9BNy3QTcX+B5YkSRqLIrpSO3Cpzq3LbmA/az6kuqTOGGOMMSYn37/2S95HeWnhAAAAB3RJTUUH3AUIEB0j5VFvdQAAAABJRU5ErkJggg==');
		break;
				
		case mod.WARP:
		
			var src = getImgSrcByPartName("wormhole.png");
		
			if(src == null)
			{
				src = getImgSrcByPartName("foregrounds/wormholeseal_");
			}
			
			new_element.setAttribute('src', src);		
		break;
		
		case mod.XWARP:
			var src = getImgSrcByPartName("foregrounds/xhole.png");
			
			if(src === null)
			{
				src = getImgSrcByPartName("foregrounds/yhole.png");
			}
			new_element.setAttribute('src', src);
		break;		

		case mod.WRECK:
			new_element.setAttribute('src', getImgSrcByPartName(img_dir + "/foregrounds/wreck_"));
		break;
        

		
		case mod.AMBUSH:
			new_element.setAttribute('src', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAkJJREFUaN7tmNFtGlEQRW8i/4cSoINFmv+YCoIrMFQAVGC7gtgVABVgVwD+vxKbCrIdZFNB8nNXGo2ClV37mbX0joRWsCw7982dmbcAmUwmk8lkMp35lPoGJAsAa72dmFndSwEkjwAKAAf38VCvhvKtRXxOsOiX7tUEvwFQS+CR5KyXFiIZVxxmdnBW2oXzTbYKAJWZjXtXA0HgAMASwHUUKgGjPlgoFrDPRm1mtwp0BGCiugCAh7PVAMnLaCUV9ZHk/l/XmFkle9WuwFtz8crAZ02LJAkAjwBWAL7L101RJ+PiFcFPXX9vmCrgOYBKfr8jeQvgRqs9MTO/2pWO30ILTmehMJwiA3UbyOdfFHxzbhq+/6zjTEWeVoBuslYwCEPKs5SQJ+fzSjPB18JGnw8A7NuK6JIB72/PA4ArF2zT3wuJO8haO5K/ZMGGKzfo9qkFnJqiawUwUjH7zDwB2CojhVZ74bJQumuSZ+AlbiRkDmCsgj0oqGi7bbDlzGXjrINsCuCnjgsnrKEGMJf3EVptGTrU2SbxQEEPQ4GXys6C5B835IqwN3qfQfYfFCRnZjZ203rnrBSH3O++CQCAtXappZsPcNtsn6GvSedA3Jy1oPJdR6zMbB6mcZFUgLbBXbvT1gU7NrP70EZLJySZhX50FDBUBkZmVp3YnY67/HCrDKj1zTvcpwZwdyr4d30mlohVi0vutfKPvfpbheT6hW1FJc9vUqz6mz0TBxGVNnSHttP0rJDck1wik8lkMplM5uPxFzhM0UPsZDuNAAAAB3RJTUUH3AUIEB4Sn6I8jAAAAABJRU5ErkJggg==");
		break;
		
		case mod.RETREAT:
			new_element.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAcZJREFUaN7tl81t20AQhT8KLoDugOlAAd49KSHsQKnASgURK5BSgd2B2IHl+wBmB2EJSgXJZRgQxCqOreWPgX0XcnfJ3fl584aEhISEhISEhIQ3I5v6QDNbA0egAFqglNS8db/VDEHrjMevx2s2m8OB4oXxq3AzEk2KjiKS2sFyOzC6XVQNmNkO+N6bOgMN8AQ8AHnMGsgiF+c9sP7HY2egknRYlAoFog5w8CivAzyvJZVLcuB3b9gAXztamNkj8Dnw2odAfcymQh2HK0kfe8ZvLxhPIGPLamSuRM9etJdwdRbGdCBEnRaogW0vcyfgl983r3UoG8n4LbAPLJVu6M9LKiXpdgmd+C4wV0uqPcKVS+rVuBnJgSKg/9+6gaQdsOv1j9zltllEDZjZc6Ch1S6v55hnZZEN3wCfPNr3wJdAJkpJp1hnriIav/bC3QB777TlgOs58Ghm+9kyYGbHQGQvaryZ5aFsSMrmysD/GF91ei7p7NmoB1SajUIPL6yfXGWGXbnv+I939U/snN/2pm5jqdFqAuNzL+y/GYwppVP8E28GH3RVzM2ncOBuUB/te3OgGCv6Uzlw6HH/REJCQkJCQkLCcvAHTsqXM6SL/PsAAAAHdElNRQfcBQgQHSfiPKtsAAAAAElFTkSuQmCC');
		break;
		
		case mod.NEW_BUILDING:
			new_element.setAttribute('src', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAASNJREFUaN7tl92Ng0AMhCenFEAJKWEjuQBSCdkSUhGhEwpYCUpICdtB8uJIUXTHIdYyIZpP2icW48E/sgFCCCGEEELWYmdtMKUUADQAgp4KQAYw6ulEZPw4ASmlA4AWQD3jeg8gisit9Ls/Rs6fAQwznYfeG/S9dSOgTrQFJqKIXFcRoGkzaJ4vJQM4Lk2nfWEA2innRWT3Ivb+x7VK7Zxca0C7TW3UA2q151rEjXEHbrwFBGMBwbsGwlTO//fsl5pwT6HKOAKVt4BsLCB7p9D43oXe02JmG3215xqB0TgC7gI6YwGdqwAdiXsj5/ulI3bpKBGnZqEZef8s3rjKOK0D2KXwJ1xK9oLifUBH4bigDebSUforNrLN78SEEEIIIWTDPAB4CmGaHnnDHAAAAAd0SU1FB9wFCBAeDoujYMMAAAAASUVORK5CYII=");
		break;
		
		case mod.REFUEL:			
			new_element.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlJREFUaN7tmO1twjAQhh9QB0g3YASQPACMwAhMQDcIbNCO0AnSDcgAJ7UjsEGzAf1zkYyF1MR141i6548lJxf5zX0mYBiGYRiGEc0ixkhEKqABtiPMWmDvnOtSClhG2o09PHp/k9oDT5F2/eHPzrnTAI+dgLq3E5FvvbRzzn3l8AAAQw6vvD7Yq4CLiKyzCRghNIz7HdClELHMUTk0bJKIyCIgEOGH06oYAZ4IPycaLdFlCHjAWqvVNAK0PP7a9Ibc5/EyRR/oqUWk/uMzrsAq1ngOIbSffR8YkMgbLamTDXO3BGe/G+60D3yqqEUJHrgb7mJnohwCNsA5GArLyQF90x+5vweSdeB+fIgZI+ZSRlfBWpyA8kJI6bz5x1+vpQhodT2KyBY4BvuzF/Dmxf7Fy4H3Uj5oWuAQhNRB9/9nlNC/CVWK+HfOPedI4iqRAyoMwzAMwzDy8wNLw2cHMB2R9wAAAAd0SU1FB9wFCBAdLQLpQnIAAAAASUVORK5CYII=');		
		break;
		
		case mod.DOCK:
			new_element.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAYBJREFUaN7tl8FtwkAQRT9R7qGDuARHmgKcCuIOgApCB4krQKkAu4K4A8j9S9AB7iAuIZdZaeV4FdsBY6R5FzC7K+/fnfkzAIZhGIZhGEYvSK5JfpOMW8ZiktFYe7kbuG4BYA4gbRl7A3AiuZykAD11d/KPLVO+9HNLMpniDSy873HLeNm4jckJ8MMmboaKiFQAKn1MSKZTE9BM0K0mtB8yhTe+mZqAvOW3OYAlgB3JE4AHAM8AVgDqSyb0bKCNbgCsO0w96m2UGlrTEKAiEk3Srk6z98TUVxfwDyHOqQoRKa8uwBMSAXhVl+paiWsVkw0Nsdm5Y1KF7HqIcKxEJB+rlQhtPgVwGLB5Z8e9a8b9mTY+V78P2WWlCVwBeAn0UK5mlKMK0N7oM3Dqv5JVQyxViz1q8keBInlZASTfW/qdCsAHgDxgl25+LCJP3iFEowrQly4aFboQkf0fSzMVkXn9k7sNwzCMG6NXL0TyEPgffE6Orj6M3gsZhmEYhmHcGD9PqoudeStM/gAAAAd0SU1FB9wFCBAeAGwbTcQAAAAASUVORK5CYII=');		
		break;
		
		case mod.HARVEST:			
			new_element.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAfVJREFUaN7tl9Ft20AMhj8XHUDeQNnAAfjubNBoA2UET+BkgjgTRJ3A8gRx3g+IMkE1gjZoX3gAYcixdYFkA+UPCCfckQAp/j95AofD4XA4HA6H41KYpTiFEDLgD5CdMO1EZD5mAj++4ZudYxNCuBszgZ8pTiLShRDi++xIlT6ABXAH7A/OFsAWyI/5T1GBU4hBL3vOtkAObJSOV5nAu659FMp13YlId+0V4JgORGR/SRGf1AnQfFGFy4n4QJB/zzBbXk0CKrrngW6jVWCWkEBsjwA1sANaI85fwP036TcbUwOZBlwAn8AaeNNnrXuFSWoomimuEgvg1VSiL4gH0++HYCUim7FF/GauEpFGGPos1KbQdQjqsUX8aIJ/EJHKHFchhFKrk6l46wGaqEWkHTUB0xJrEYkBr3XvSfdiJZbA7zMT6ICXKQZZbImRNmvleW4S2Rnb+EX32l1uNNg+tFMkkNJVOhP0s9KrAub6VLo3dL4kUag1/b4CniyFjJgBGr1SzHsquIoXuRDCCihTBl5KAi/6pe5DCKWKuDIiLw3n92OXN2USH/5O9rVRgFZEbnr8t2pTAStDq1IbQzHVP/HHF0OqBQoRaXp8c/XNerrQ7dA2miRi5e6tTtv2QLAbDaQ54tuqb23EXacE73A4HA6Hw/G/4x9srqgfApD3qwAAAAd0SU1FB9wFCBAeCRXH9WAAAAAASUVORK5CYII=');		
		break;
		
		default:
			alert("Undefined desired mod: " + mod_desired);
		break;
	}
	
	new_element.setAttribute('height', '48');
	new_element.setAttribute('width', '48');	
	
	return new_element;
}

/*
 * Tries to find the correct image for a link by a part filepath match.
 */
function getImgSrcByPartName(match)
{
	var imgs = my_document.getElementsByTagName('img');
	
	for(var i = 0; i < imgs.length; i++)
	{
		if(imgs[i].src.indexOf(match) != -1)
		{
			return imgs[i].src;
		}
	}
	
	return null;
}

/*
 * Retrieves a reference to the ship information area.
 */
function getShipInfoTable()
{
	var tables = my_document.getElementsByTagName("table");
	
	for(i = 0; i < tables.length; i++)
	{
		if((tables[i].border == 0) && (tables[i].align == "center"))
		{
			return tables[i];
		}
	}
}

/*
 * Retrieves a reference to the nav tiles.
 */
function getNavTable()
{
	var area = my_document.getElementById("navareatransition");
	if(area)
	{	
		return area;
	}
	else
	{	
		return  my_document.getElementById("navarea");
	}
	
}

/*
 * Adds status information retrieved earlier and hacks it into a new row above the nav tiles.
 */
function prepend_status(nav_table)
{
	var tbody = firstEChild(nav_table);
	var first_row = tbody.childNodes[0];
	var status_tr_1 = my_document.createElement('tr');	
	var status_tr_2 = my_document.createElement('tr');
	var spacer_tr = my_document.createElement('tr');
	var table;
	var sector_td = create_status_td();
	var coords_td = create_status_td();
	var aps_td = create_status_td();
	var res_td = create_status_td();
	var fuel_td = create_status_td();
	var protection_td = create_status_td();
	var protection_href = my_document.createElement('a');
	var protection_img;
	
	for(var i = 0; i < nav_size; i++)
	{
		create_spacer(spacer_tr);
	}	
	
	 // Add the link to check for current protection status, and apply relevant image.
	if (protection == null)
	{
		protection_img = my_document.createElement('img');
		protection_img.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAg9JREFUSMetleFt2zAQhT8JHkAjqBPEBu5/lAnqThB7gsQTuJqg6QR2Jqg3iP3/AKsTVCNog/bPk8HQlC2neQABiTzeI98d7zKuwN1LoALugTJaboEDsDez9pKf7AJBBaxFMgZ7oDaz/Sgidy+ADTAPpnfAbzkLUQF3CdulmXWDRO4+Bd6AQlM1sL0mi+RdSAGADngws+aMKCJpdKqGGyAfG2Aak2WBXG8yaGTQJU69DhKiVUzahPRnvnKtP0enSJEcJU+lsQCOWjtBex/kayrf5DrBk+xWMYmwlqS1mWVmlil+RRCXmGyl3yd3L3JlTAG0ZrYdkL+Ug++Bs/57mtogX618zyd6iACvF+K8CjIxxGxgnsDnGrifBMHdD2TSsT+1uw9lW2Nms4FHvAbKfETWTj/DJud21Bo3IVcajj15/366kba9zy5X9QX4OnJzeYNtb3fIVQQBKlXsa3hMtIuh6t/72+UqIf37+ZHY0yRuVF6xCX1tzawNa90fvYmtmS35D7j7RiWqA2YnIi3OgV/6fTGz1QcICt1koalvZrZ7l96aqG/MwJBkERRe1Gb6+DOJ7O+GNHf3Km7TQcAfo/axjG2zhK4AX/o+M9DaU+iAn5L97J1NErouzazV/LNayFDhbDQOwG6gxZykC0legE63mwcEH2rt76Rz979Xyk19oU+NxkS3mCuYXSRFwyfhH7CD3j/Lh+YKAAAAB3RJTUUH3AUIEBwxD/MvfAAAAABJRU5ErkJggg==');
		protection_href.setAttribute('href', current_url + '?ccp=1');
		protection_href.appendChild(protection_img);
		protection_td.appendChild(protection_href);
		improveClickability(protection_href);
	}
	else if (protection == false)
	{
		protection_img = my_document.createElement('img');
		protection_img.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAASFJREFUSMfVltFRwzAMhj9zHSAjdAQeNIA7QckGjAATpEwAmaTdgAyg3GUERmCD9EXmfAHnEtfhQE+ypNxnW7/tOCJT1T3QAB7YW/gD6IBWRAYyzUWQk0Hm7EVETtkgVX0CXhd+8ywib2tBd6paTVYyALWIOBFxQG2xYI1t8ToQ8AhUUT8OInIJBeYfLIfVPuSAjtG4FZHPaZHF2ih0zAH5aNzN1MY5nwOKZ56U7y3S/gba0nZzyXEck+fuh1z6DDmXBqlq1ff9Oacf096qau2mM3POBdB7AcgXbK5HvmCL/C6sYGv7NdXdAhrsHpzehevlveDJuJhwAM7/fuuahF8cdJ/wt9k6ezjZUgzhP4PNQUt686dU1xXkzF6qdSFYB9RXqCRS5RA5dcAAAAAHdElNRQfcBQgQHR69OSNkAAAAAElFTkSuQmCC');
		protection_td.appendChild(protection_img);
	}
	else
	{
		protection_img = my_document.createElement('img');
		protection_img.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAARRJREFUSMfVltFtgzAQhj9HHYARMkIf/gGSCVo26AjtBCQTJEySjuABDokROkI3IC+2hBAgQ0zV/E+nuzMfnH8Zu67rGJNzbjRvZnugAg7APqR/AA/UktrR5y0BmdkpQOZ0lnRaDTKzT+BCmr4kXfuJXcoqMysGX9ICpSQnyQFlyEVVYcTLQMAHUPT24yjpOxZDfAw1Qu/7GtBbL64l/Q4bQq6eWJMMOvRiP9PnJ9Ykg/pv3q6pLQat1ay9p2pZQU3TFMBtOOsV8kA5N7ockGiK2y7RaQ/D/swMTwFqwxk3POdG9fIA6BzPOzOL5nnu0VUTcXbQ60S8zejCT5EtzRDvEGwOStmbf+U6n5Hj50BlJpgHyjuee1TKj0wZywAAAAd0SU1FB9wFCBAdN/+LuwgAAAAASUVORK5CYII=');
		protection_td.appendChild(protection_img);
	}	
	
	// Complete the table data cells entry.
	sector_td.appendChild(sector);
	coords_td.appendChild(coords);
	aps_td.appendChild(ap_img);
	aps_td.appendChild(create_spacer_text());
	aps_td.appendChild(aps_left);
	res_td.appendChild(res_img);
	res_td.appendChild(create_spacer_text());
	res_td.appendChild(field_res);
	fuel_td.appendChild(fuel_img);
	fuel_td.appendChild(create_linebreak());
	fuel_td.appendChild(fuel);	
	
	// Add all the TDs to the TRs.
	status_tr_1.appendChild(sector_td);
	status_tr_1.appendChild(coords_td);
	status_tr_1.appendChild(aps_td);
	status_tr_2.appendChild(res_td);
	status_tr_2.appendChild(fuel_td);
	status_tr_2.appendChild(protection_td);	
	
	var status_table = create_status_table();
	status_tr_1.setAttribute("width", "100%");
	status_table.appendChild(status_tr_1);
	status_table.appendChild(status_tr_2);
	status_table.appendChild(spacer_tr);
	
	// Prepend desired elements. Include hack for different behaviour
	// with partial refreshes enabled.	
	if(partial_refresh)
	{			
		var previous_status_table = my_document.getElementById("produs_status_table");
		var nav = my_document.getElementById("nav");
		var navtransition = my_document.getElementById("navtransition");
		
		/* Remove any previously added information before adding more. */
		if	(previous_status_table)
		{
			previous_status_table.parentNode.removeChild(previous_status_table);
		}
		
		/* Add new status information. */
		status_table.id = "produs_status_table";		
		nav.parentNode.id = "produs_nav_id";
		nav.style.top = "92px";
		navtransition.style.top = "92px";
		nav_table.parentNode.parentNode.insertBefore(status_table, nav_table.parentNode);	
	}	
	else
	{
		nav_table.parentNode.insertBefore(status_table, nav_table);
	}
}

function create_status_td()
{
	var td = my_document.createElement('td');
	td.setAttribute('align', 'center');
	td.setAttribute('width', '33.33%');
	return td;
}

/*
 * Creates a table to fill max width
 */
function create_status_table()
{
	var span_table = my_document.createElement('table');
	
	span_table.setAttribute('width', '100%');
	span_table.setAttribute('height', '64px');
	span_table.setAttribute('cellspacing', '0');
	span_table.setAttribute('cellpadding', '0');
	span_table.setAttribute('border', '0');
	
	return span_table;
}


/*
 * Creates a table inside the tr, which spans all of the nav columns, allowing cleaner layout.
 */
function create_max_colspan_table(tr)
{
	var spanning_td = my_document.createElement('td');
	var span_table = my_document.createElement('table');
	var span_tbody = my_document.createElement('tbody');
	
	span_table.setAttribute('width', '100%');
	spanning_td.setAttribute('colspan', nav_size);
	
	span_table.appendChild(span_tbody);
	spanning_td.appendChild(span_table);
	tr.appendChild(spanning_td);
	
	return span_tbody;
}

/*
 * Fills out the row with a separator bar, to separate new areas from the nav tiles.
 */
function create_spacer(tr)
{
	var spacer_td = my_document.createElement('td');
	var spacer_text = my_document.createTextNode('\u00A0');

	spacer_td.setAttribute('style', 'background-image:url(' + img_dir + '/text7.png);background-repeat:repeat-x;');
	spacer_td.appendChild(spacer_text);

	tr.appendChild(spacer_td);
}

/*
 * Creates an "empty" data cell.
 */
function create_nbsp(td)
{
	var spacer_text = my_document.createTextNode('\u00A0');
	td.appendChild(spacer_text);
}

/*
 * Creates a line break.
 */
function create_linebreak()
{	
	return my_document.createElement('BR');	
}

/*
 * Used to separate images from text.
 */
function create_spacer_text()
{
	return my_document.createTextNode(" ");
}

/*
 * Attaches commands to the end of the the nav screen tiles.
 */
function append_commands(nav_table)
{
	var rows;
	var tbody = firstEChild(nav_table);
	var commands = new Array();
	var commands_tr = my_document.createElement('tr');
	var table;
	var commands_tr_1 = my_document.createElement('tr');		
	var commands_tr_2 = my_document.createElement('tr');
	var commands_tr_3 = my_document.createElement('tr');
	var spacer_tr = my_document.createElement('tr');
	var context_td_1, ambush_td, harvest_td, dock_td, refuel_td, retreat_td, xwarp_td;	

	for(var i = 0; i < nav_size; i++)
	{
		create_spacer(spacer_tr);
	}
		
	context_td_1 = my_document.createElement('td');
	harvest_td = my_document.createElement('td');	
	refuel_td = my_document.createElement('td');	
	
	if(starbase)
	{
		context_td_1.appendChild(starbase);
	}
	else if(planet)
	{	
		context_td_1.appendChild(planet);
	}
	else if(building)
	{
		context_td_1.appendChild(building);
	}
	else if(my_building)
	{
		context_td_1.appendChild(my_building);
	}
	else if(new_building)
	{
		context_td_1.appendChild(new_building);
	}
	else if(warp)
	{
		context_td_1.appendChild(warp);
	}
	else if(xwarp)
	{
		context_td_1.appendChild(xwarp);
		xwarp_td = my_document.createElement('td');
		var warp_box = my_document.getElementById('xholebox');
		warp_box.firstChild.setAttribute('style', 'width:48px;height:48px;text-align:center;padding:12px 0;');		
		warp_box.firstChild.firstChild.text = "?";
		xwarp_td.appendChild(warp_box);
	}
	else if(wreck)
	{
		context_td_1.appendChild(wreck);
	}
	else
	{
		var closed_wh = getImgSrcByPartName("wormholeseal_closed");		
		if(closed_wh)
		{
			var new_element = my_document.createElement('img');
			new_element.setAttribute('height', '48');
			new_element.setAttribute('width', '48');
			new_element.setAttribute('src', closed_wh);
			context_td_1.appendChild(new_element);
		}
		create_nbsp(context_td_1);
	}	
	
	/* If we're on a nex hole, then ensure that we can select a destination. */
	if(xwarp_td)
	{
		commands.push(xwarp_td);
	}
	
	/* Add to the command array, there should always be something here. */
	commands.push(context_td_1);
	
	harvest_td.appendChild(harvest);	
	refuel_td.appendChild(refuel);
	
	commands.push(harvest_td);
	commands.push(refuel_td);
	
	/* Add optional commands if they exist. */
	if(ambush)
	{
		ambush_td = my_document.createElement('td');
		ambush_td.appendChild(ambush);
		commands.push(ambush_td);
	}
	if(retreat)
	{
		retreat_td = my_document.createElement('td');
		retreat_td.appendChild(retreat);
		commands.push(retreat_td);
	}
	if(dock)
	{
		dock_td = my_document.createElement('td');
		dock_td.appendChild(dock);
		commands.push(dock_td);
	}	
	
	// Make things a little bit tidier.
	tidy_td_arr(commands);
	
	// Add the new table entries.
	var produs_commands_spacer = my_document.getElementById("produs_commands_spacer");
	if(!produs_commands_spacer)
	{	
		tbody.appendChild(spacer_tr);
	}
	table = create_max_colspan_table(commands_tr);
	
	if(commands.length <= nav_size)
	{
		rows = 1;
		add_one_row(commands, commands_tr_1);
		table.appendChild(commands_tr_1);
	}
	else if(commands.length >= (nav_size * 2))
	{
		rows = 3;
		add_three_rows(commands, commands_tr_1, commands_tr_2, commands_tr_3);
		table.appendChild(commands_tr_1);
		table.appendChild(commands_tr_2);
		table.appendChild(commands_tr_3);
	}
	else
	{
		rows = 2;
		add_two_rows(commands, commands_tr_1, commands_tr_2);
		table.appendChild(commands_tr_1);
		table.appendChild(commands_tr_2);
	}

	/* Hacks for partial refresh. */
	if (partial_refresh)
	{
		/* Remove existing tr before adding new content. */
		var produs_commands = my_document.getElementById("produs_commands");
		
		if (produs_commands)
		{
			produs_commands.parentNode.removeChild(produs_commands);
		}
	
		var produs_nav = my_document.getElementById("produs_nav_id");
		produs_nav.style.height = ((unsafeWindow.tileRes * nav_size) + (rows * 50) + 115) + "px";
		produs_nav.style.backgroundImage = "";
				
		commands_tr.id = "produs_commands";
		spacer_tr.id = "produs_commands_spacer";
	}
	
	// Add the new table entries.	
	tbody.appendChild(commands_tr);
}

/*
 * Configures the tds to have a tidy layout for each nav screen size.
 */
function tidy_td_arr(tds)
{
	for(var i = 0; i < tds.length; i++)
	{
		tds[i].setAttribute('align', 'center');
		if(tds.length < nav_size)
		{
			tds[i].setAttribute('width', (100 / tds.length) + "%");
		}
		else
		{
			tds[i].setAttribute('width', (100 / nav_size) + "%");
		}
	}
}

/*
 * Just adds one tr below the nav tiles.
 */
function add_one_row(commands, tr1)
{
	for(var i = 0; i < commands.length; i++)
	{
		tr1.appendChild(commands[i]);
	}
}

/*
 * Splits commands into two trs below the nav tiles, we have too many
 * to fit in one row.
 */
function add_two_rows(commands, tr1, tr2)
{
	for(var i = 0; i < commands.length; i++)
	{
		if(i < nav_size)
		{
			tr1.appendChild(commands[i]);
		}
		else
		{
			tr2.appendChild(commands[i]);
		}
	}
}

/*
 * Adds three rows, only needed when sitting on one's own building.
 */
function add_three_rows(commands, tr1, tr2, tr3)
{
	for( var i = 0; i < commands.length; i++)
	{
		if(i < nav_size)
		{
			tr1.appendChild(commands[i]);
		}
		else if(i >= (nav_size * 2))
		{
			tr3.appendChild(commands[i]);
		}
		else
		{
			tr2.appendChild(commands[i]);
		}
	}
}
