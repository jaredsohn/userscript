// ==UserScript==
// @name	Itamaram's Collectible Sorter
// @namespace	http://itamaram.selfip.com:8621/CollectibleSorter.user.js
// @description	Creates a separate inventory category for stuffies and tiny plastics
// @include	http://*.kingdomofloathing.com/inventory.php*
// @include	http://127.0.0.1:60080/inventory.php*
// ==/UserScript==

var snode = document.createElement('script');
snode.setAttribute('language','javascript');
snode.innerHTML = "function toggle2(section){var div = document.getElementById(section);if (!div){return;} if (div.style.display == 'none'){div.style.display = 'inline';} else{div.style.display = 'none';}}";

document.body.appendChild(snode);

textnodes = document.evaluate(
    '//table[@class="stuffbox"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < textnodes.snapshotLength; i++) {
    if (textnodes.snapshotItem(i).innerHTML.indexOf('Off-Hand Items:') != -1){
		innertextnodes = document.evaluate(
		'*/*/*/*/*/*/*/*/*/*/*/tr',
		textnodes.snapshotItem(i),
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	    var pointer1 = 0;
	    var pointer2 = 0;
	    var oldArr = [];
	    var newArr = [];
	    var tempParent;
	    for (var j = 0; j < innertextnodes.snapshotLength; j++) {
		    var items = innertextnodes.snapshotItem(j).getElementsByTagName('td');
			for ( var k = 1 ; k < items.length ; k+=2){
		    	if (items[k].innerHTML.indexOf("stuffed") != -1){
					newArr[pointer2] = items[k-1];
					pointer2 += 1;
					newArr[pointer2] = items[k];
					pointer2 += 1;
				}
				else{
					oldArr[pointer1] = items[k-1];
					pointer1 += 1;
					oldArr[pointer1] = items[k];
					pointer1 += 1;
				}
		    }
		    tempParent = innertextnodes.snapshotItem(j).parentNode;
		    tempParent.removeChild(innertextnodes.snapshotItem(j));
	    }
	    for (var j = 0 ; j < oldArr.length ; j+=2){
			var tempr = document.createElement('tr');
			if ((j+2) == oldArr.length){
				tempr.appendChild(oldArr[j]);
				tempr.appendChild(oldArr[j+1]);
			}
			else{
				tempr.appendChild(oldArr[j]);
				tempr.appendChild(oldArr[j+1]);
				tempr.appendChild(oldArr[j+2]);
				tempr.appendChild(oldArr[j+3]);
				j+=2;
			}
			tempParent.appendChild(tempr);
		}
		  
		var newContent = "";
	    for (var j =0 ; j < newArr.length ; j+=2){
		    var tempr = document.createElement('tr');
			if ((j+2) == newArr.length){
				newContent += '<tr><td>' + newArr[j].innerHTML +'</td><td>' + newArr[j+1].innerHTML + '</td></tr>';
			}
			else{
				newContent += '<tr><td>' + newArr[j].innerHTML +'</td><td>' + newArr[j+1].innerHTML + '</td><td>' + newArr[j+2].innerHTML +'</td><td>' + newArr[j+3].innerHTML + '</td></tr>';
				j+=2;
			}
	    }
	    textnodes.snapshotItem(i).parentNode.insertBefore(box('Stuffies', newContent, 'id1'),textnodes.snapshotItem(i).nextSibling); 
    }
    
    if (textnodes.snapshotItem(i).innerHTML.indexOf('Accessories:') != -1){
		innertextnodes = document.evaluate(
		'*/*/*/*/*/*/*/*/*/*/*/tr',
		textnodes.snapshotItem(i),
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	    var pointer1 = 0;
	    var pointer2 = 0;
	    var oldArr = [];
	    var newArr = [];
	    var tempParent;
	    for (var j = 0; j < innertextnodes.snapshotLength; j++) {
		    var items = innertextnodes.snapshotItem(j).getElementsByTagName('td');
			for ( var k = 1 ; k < items.length ; k+=2){
		    	if (items[k].innerHTML.indexOf("tiny plastic") != -1){
					newArr[pointer2] = items[k-1];
					pointer2 += 1;
					newArr[pointer2] = items[k];
					pointer2 += 1;
				}
				else{
					oldArr[pointer1] = items[k-1];
					pointer1 += 1;
					oldArr[pointer1] = items[k];
					pointer1 += 1;
				}
		    }
		    tempParent = innertextnodes.snapshotItem(j).parentNode;
		    tempParent.removeChild(innertextnodes.snapshotItem(j));
	    }
	    for (var j = 0 ; j < oldArr.length ; j+=2){
			var tempr = document.createElement('tr');
			if ((j+2) == oldArr.length){
				tempr.appendChild(oldArr[j]);
				tempr.appendChild(oldArr[j+1]);
			}
			else{
				tempr.appendChild(oldArr[j]);
				tempr.appendChild(oldArr[j+1]);
				tempr.appendChild(oldArr[j+2]);
				tempr.appendChild(oldArr[j+3]);
				j+=2;
			}
			tempParent.appendChild(tempr);
		}
		  
		var newContent = "";
	    for (var j =0 ; j < newArr.length ; j+=2){
		    var tempr = document.createElement('tr');
			if ((j+2) == newArr.length){
				newContent += '<tr><td>' + newArr[j].innerHTML +'</td><td>' + newArr[j+1].innerHTML + '</td></tr>';
			}
			else{
				newContent += '<tr><td>' + newArr[j].innerHTML +'</td><td>' + newArr[j+1].innerHTML + '</td><td>' + newArr[j+2].innerHTML +'</td><td>' + newArr[j+3].innerHTML + '</td></tr>';
				j+=2;
			}
	    }
	    textnodes.snapshotItem(i).parentNode.insertBefore(box('Tiny Plastics', newContent, 'id2'),textnodes.snapshotItem(i).nextSibling); 
    }
}

function box(title, innerHTML, id){
	var t = document.createElement('table');
	t.setAttribute('class','stuffbox');
	t.setAttribute('width','95%');
	t.setAttribute('cellspacing','0');
	t.setAttribute('cellpadding','0');
	t.innerHTML = "<tr><td bgcolor=blue width=50>&nbsp;</td><td style='color: white;' align=center bgcolor=blue><b class='tit'><a class=nounder href=\"javascript:toggle2("+"'" + id + "'" +");\"><font color=white>"+title+":</font></b></td><td bgcolor=blue align=right width=50><font size=+1><b><a href='#top' style='color: white'>&uarr;</a></b></font> &nbsp;</tr><tr><td colspan=3 style='padding: 5px; border: 1px solid blue;'><center><table><tr><td><div id='"+id+"' style='display: none;'><Table width=100% class='guts'>" + innerHTML+ "</table></div></td></tr></table></center></td></tr><tr><td colspan=3 height=4></td></tr>";
	return t;
}