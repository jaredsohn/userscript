// ==UserScript==
// @name	KingsAge : DC-E
// @namespace	KingsAge Distance Calculator Enhanced
// @description	This tool will show distances to villages.
// @date	2012-12-14
// @version	0.4
// @creator	Original: mkey, Rebuilt by: bjrey
// @include     http://s*.kingsage.*
// ==/UserScript==

function godoit(){
	// Change this value if you want to change the time it takes for some unit to travel one field. The number is in minutes
	var var_movement_speed = 18;

	var table;
	var division;
	var links;
	var i;
	var user_coords;
	var temp_x;
	var temp_y;
	
	table = document.getElementsByClassName('ressilist');
	if (!table) return;
	
	links = table[0].getElementsByTagName('b');
	if (!links) return;
	
	// get the user settlement coords and extract numbers
	text = links[0].textContent;
	text = text.substring(text.indexOf('(') + 1);
	text = text.substring(0, text.indexOf(')'));
	user_coords = text.split('|');

	// Set the coords for the players current settlement
	GM_setValue("orig", "("+user_coords[0]+"|"+user_coords[1]+")");
	GM_setValue("orig2", ""+user_coords[0]+"|"+user_coords[1]+"");
	// Set the pattern to find using RegExp
	var RegExp_Patt_Done=/[\\(]?([0-9][0-9][0-9])[|]([0-9][0-9][0-9])[\\)]?( ?\[[\d+]?[\d+]?[\d+]?[\d+]?[\d+]? ?min\])?/gi;

	var notInTags=[ 'head', 'noscript', 'option', 'script', 'style', 'title', 'textarea' ];
	var xpath = ".//text()[not(ancestor::"+notInTags.join(') and not(ancestor::')+")]";

	if ( (document.location.href.indexOf('&s=map') !== -1) ){ // Run if on the map
		var occupied_td = document.getElementsByClassName('occupied');
		for (var i=0; i<occupied_td.length; i++){ //Loop through page
			var str = occupied_td[i].getElementsByTagName('a')[0].getAttribute('onmouseover');
			if(str.indexOf(' min] K') == -1){ // filter, check page to prevent multiple runs on the same results
				var target_coords_x = str.substring(str.indexOf(' (')+2,str.indexOf("|"));
				var target_coords_y = str.substring(str.indexOf('|')+1,str.indexOf(") K"));
				var strSplit = str.split(') K');
				var compare=target_coords_x+"|"+target_coords_y;

				if(compare==GM_getValue("orig2")){// check to see if it's orig coord
					 }else{ 

					// calculate the distance
					temp_x = Number(target_coords_x) - Number(user_coords[0]);
					temp_y = Number(target_coords_y) - Number(user_coords[1]);
					// insert
					occupied_td[i].getElementsByTagName('a')[0].setAttribute('onmouseover', strSplit[0]+') '+ '['+String(Math.round(var_movement_speed*Math.sqrt(temp_x*temp_x+temp_y*temp_y)))+' min]'+' K'+strSplit[1]);
				};
			}; // End of filter
		}; // End of looping
		setTimeout(godoit,1000); // Recheck page, to see if it needs updating

	} else if( (document.location.href.indexOf('s=forum_main') == -1) && (document.location.href.indexOf('s=ally&m=forum') == -1) && (document.location.href.indexOf('&s=map') == -1) ){ // Run on anypage but the forums & maps

	textnodes = document.evaluate(
		xpath,
 		document,
 		null,
 		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
 		null);
	for (var i=0; i < textnodes.snapshotLength; i++){
 		node = textnodes.snapshotItem(i);
		s = node.data;
		s = s.replace(
			RegExp_Patt_Done, function($0,$1,$2,$3){
				if(($0==GM_getValue("orig")) || ($0==GM_getValue("orig2"))){
					return($0);
				}else{
					// calculate the distance
					temp_x = Number($1*1) - Number(user_coords[0]);
					temp_y = Number($2*1) - Number(user_coords[1]);
					calculate_temp=String(Math.round(var_movement_speed*Math.sqrt(temp_x*temp_x+temp_y*temp_y)));
					if($3=='['+calculate_temp+'min]'){ return($0);
						}else{
							return($0+'['+calculate_temp+'min]');
						};
				}
			}
		);
	node.data = s;
};
	setTimeout(godoit,5000);

	} else if ( (document.location.href.indexOf('s=forum_main') !== -1) || (document.location.href.indexOf('s=ally&m=forum') !== -1) ) { // Run only on forums pages

	textnodes = window.frames[1].document.evaluate(
		xpath,
 		window.frames[1].document,
 		null,
 		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
 		null);
	for (var i=0; i < textnodes.snapshotLength; i++){
 		node = textnodes.snapshotItem(i);
		s = node.data;
		s = s.replace(
			RegExp_Patt_Done, function($0,$1,$2,$3){
				if(($0==GM_getValue("orig")) || ($0==GM_getValue("orig2"))){
					return($0);
				}else{
					// calculate the distance
					temp_x = Number($1*1) - Number(user_coords[0]);
					temp_y = Number($2*1) - Number(user_coords[1]);
					calculate_temp=String(Math.round(var_movement_speed*Math.sqrt(temp_x*temp_x+temp_y*temp_y)));
					if($3=='['+calculate_temp+'min]'){return($0);
						}else{
							return($0+'['+calculate_temp+'min]');
						};
				}
			}
		);
	node.data = s;
};
	setTimeout(godoit,1000);

	};
};
godoit();