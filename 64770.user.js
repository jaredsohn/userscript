// ==UserScript==
// @name           Travian Village Reorder
// @author	   GeneralFault
// @namespace      TVReOrder
// @version	   1.0.1
// @description    Allows you to reorder the village list in travian.
// @include 	http://*.travian*.*/*.php*
// @exclude 	http://*.travian*.*/hilfe.php*
// @exclude		http://*.travian*.*/log*.php*
// @exclude 	http://*.travian*.*/index.php*
// @exclude 	http://*.travian*.*/anleitung.php*
// @exclude 	http://*.travian*.*/impressum.php*
// @exclude 	http://*.travian*.*/anmelden.php*
// @exclude 	http://*.travian*.*/gutscheine.php*
// @exclude 	http://*.travian*.*/spielregeln.php*
// @exclude 	http://*.travian*.*/links.php*
// @exclude 	http://*.travian*.*/geschichte.php*
// @exclude 	http://*.travian*.*/tutorial.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/ajax.php*
// @exclude 	http://*.travian*.*/ad/*
// @exclude 	http://*.travian*.*/chat/*
// @exclude 	http://forum.travian*.*
// @exclude 	http://board.travian*.*
// @exclude 	http://shop.travian*.*
// @exclude 	http://*.travian*.*/activate.php*
// @exclude 	http://*.travian*.*/support.php*
// @exclude  	http://help.travian*.*
// @exclude 	*.css
// @exclude 	*.js
// ==/UserScript==
function XPathQ(query,resultType,context){
	if(typeof(context) == 'undefined'){
		context = document; }
	var rt;
	switch(resultType){
		case 'int': case 'num' : case 'number' :
			rt = XPathResult.NUMBER_TYPE;
			break;
		case 'str': case 'string' :
			rt = XPathResult.STRING_TYPE;
			break;
		case 'bool': case 'boolean':
			rt = XPathResult.BOOLEAN_TYPE;
			break;
		case 'unordered_node_iterator': case 'uo_iter':
			rt = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
			break;
		case 'ordered_node_iterator': case 'o_iter': case 'iter':
			rt = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
			break;
		case 'unordered_node_snapshot': case 'uo_snap':
			rt = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
			break;
		case 'ordered_node_snapshot': case 'o_snap': case 'snap':
			rt = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
			break;
		case 'any_unordered_node': case 'any_node':
			rt = XPathResult.ANY_UNORDERED_NODE_TYPE;
			break;
		case 'first_ordered_node': case 'first_node': case 'node':
			rt = XPathResult.FIRST_ORDERED_NODE_TYPE;
			break;
		default :
			rt = XPathResult.ANY_TYPE;
		}
	return document.evaluate(query,context,null,rt,null);
	}

var TVReorder_moveIconsDisplayed = 0;
function main(){
	TVReorder_reorderVillages();
	TVReorder_addVillageControl();
	}

function TVReorder_reorderVillages(){
	var order = GM_getValue('TVReorder_order','').split(',');

	var villsa = [];
	var villsn = {};
	
	// Parse Village List
	var vill = XPathQ("//table[@id='vlist']/tbody/tr",'iter');
	var np = vill.iterateNext();
	while (np) {
		var coords = XPathQ("td[@class='aligned_coords']/div[@class='cox']",'str',np).stringValue + 
			'|' + 
			XPathQ("td[@class='aligned_coords']/div[@class='coy']",'str',np).stringValue;
		villsa.push(coords);
		villsn[coords] = np;
    		
		np = vill.iterateNext();
		}
	
	var neworder = [];
	vill = XPathQ("//table[@id='vlist']/tbody",'node').singleNodeValue;
	
	// Remove the villages
	while(vill.childNodes[0]){
		vill.removeChild(vill.childNodes[0]); }
	
	//Re-Add the villages we have in order.
	for(var i=0;i<order.length;i++){
		var coords = order[i];
		if(typeof(villsn[coords]) == 'undefined') continue; // Village has been remove (destroyed... 0poped)
		
		vill.appendChild(villsn[coords]);
		villsa.splice(villsa.indexOf(coords),1);
		neworder.push(coords);
		}

	//Add the villages that we don't have in our list
	for(var i=0;i<villsa.length;i++){
		vill.appendChild(villsn[villsa[i]]);
		neworder.push(villsa[i]); // Add the village to the order list.
		}
	
	GM_setValue('TVReorder_order',neworder.join(','));
	}

function TVReorder_addVillageControl(){
	// Add the Reorder Villages Icon
	var vill = XPathQ("//table[@id='vlist']/thead/tr/td",'node').singleNodeValue;
	var a = document.createElement('a');
	a.href = "javaScript:void(0)";
	var img = document.createElement('img');
	img.alt = 'Reorder Villages';
	img.title = 'Reorder Villages';
	img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABwUlEQVQ4y6WTvWuTURTGn6Q10OpkSSKhqINfFVo7FFtJBYsKQsXRUXEQjYMOmv4ZihWXlOI/oBQKRUXBwVLjVBQcIsaP4CIpHZt7z9d1qG9M3zeZesffvec5z304JxVCwG5Ofxw8+HD7o4rxo7OV6YiVq6UQQoCKQUUxP7OYiu7SncX31259yvbnT2czuWLp9bX1iJsZpvYXcSZbBBMnHZSrpYypfclmckcO7TsMM4Nzbvz6i6s1Jh7NFYYgJjAzMElSQEVXVHRY0rr9MBgG+gZBjg4y8TKztDk52iGQBoCH05WLj88tDjQ2GxATsAp+/PkJcjTz/MbKJfbS5uS4d4jkGawKC4rmZhNLN19W49zHHMQECKwMC7rDai+eFHAEMYHGOvXiCQHfYrAyNNapF+/qgE1gpvD/wrr89MLUYGZvgncdJO8IrAI2ATnC7JPzr8jRu/xQvs0LBwoYvXuiNVI6+iYhEP1VTMCe4R1d8S1uNDc2/nNmsJffTDLbPURlGLYn7m35PQE4PjE3tr611RpXVXyr1T/XKvVTUU2qcxvH7o0EYYWwQEVRf/arvTQn7xxbFZY9Xxe+T3Y2Te12nf8C9P9sjyyUWUYAAAAASUVORK5CYII=";
	a.appendChild(img);
	vill.appendChild(a);
	a.addEventListener('click', TVReorder_toggleUpDown, false);
	}

function TVReorder_toggleUpDown(){
	// If we are showing our icons, hide them
	if(TVReorder_moveIconsDisplayed){
		var vill = XPathQ("//table[@id='vlist']/tbody/tr/td/div[@id='TVReorder_button']",'snap');
		for(var i=0;i<vill.snapshotLength;i++){
			var np = vill.snapshotItem(i);
			np.parentNode.removeChild(np);
			}
		TVReorder_moveIconsDisplayed = 0;
		return;
		}

	// Add the Icons.
	var vill = XPathQ("//table[@id='vlist']/tbody/tr/td[@class='dot'] | //table[@id='vlist']/tbody/tr/td[@class='dot hl']",'snap');
	for(var i=0;i<vill.snapshotLength;i++){
		var np = vill.snapshotItem(i);
		// Create the div we'll use
		var d = document.createElement('div');
		d.id = 'TVReorder_button';
		d.style.display = 'inline';
		
		// Create the Up Arrow
		var a = document.createElement('a');
		a.href = "javaScript:void(0)";
		var img = document.createElement('img');
		img.alt = 'Move Up';
		img.title = 'Move Up';
		img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAOCAYAAAD5YeaVAAAA/ElEQVQoz5WPPUoDYRBA38YYjKTd2IjGC4iVjTYWglfwCB7AK1kJQcE7xEosxUKJjbIQEEL89pufz0bXXWUhTvvePGaylBIA55Mz3BwyyLLs1tQlLMLhYh6QKFycjunwd+7z7sZ+3hseAHd1UJd7wGO+OtzdHowYDXbI14Z7wMMX+5FN7UZFN1UNdUWT0l9ZJ4a4FUO8/l0+BvrT2RR1RUx5ensmhngEnAB06ze9z+YAiBmejGJW0Olkk29eya8vRbUkJngyYoiNzyu5DtQVS0bZJpcf0ijbsmVxxd0og7SU67Lp/272ZEgpS8gmOI5EbZFrlfHlFSqKqTXkT2OhqogPcsoXAAAAAElFTkSuQmCC";
		a.appendChild(img);
		d.appendChild(a);
		a.addEventListener('click', TVReorder_moveUp, false);
		
		// Create the Down Arrow
		var a = document.createElement('a');
		a.href = "javaScript:void(0)";
		var img = document.createElement('img');
		img.alt = 'Move Down';
		img.title = 'Move Down';
		img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAOCAYAAAD5YeaVAAABBklEQVQoz33QvUoDQRSG4XdCUqROEckNWKqVCjbWgvfhBXgj9t6HIJLGwk6wUzaFIjYJNsruzpyfsVl1N2b9moE5Dx9nJuScOb87o0nOOWPqmBpAALg4vgRgCODu35jDyRGenfnzDesZApjYz4W64u5I0s1YRLs4O6lOPTh2sbmTatmMU/wdiBmejdjXnGJqYcGz9a/RHqgr9l9z9VkTBoEQBogJ1mpevr13cZOD8WiMuOJuxFooP8pO86A5r1Kd5tPJFDFFXJltzQAq4LqDY51OYyUvy9UKdUVdEREk6qskPVlfIwHbRVHcl2W1a2YUj4uHEMLOnwe2slc8LW5VdBRC2F//jS/5ZrV32/aATgAAAABJRU5ErkJggg==";
		a.appendChild(img);
		d.appendChild(a);
		a.addEventListener('click', TVReorder_moveDown, false);

		// Add the div before the little dot.
		np.insertBefore(d,np.firstChild);
	
		}
	TVReorder_moveIconsDisplayed = 1;
	}

function TVReorder_moveUp(e){
	TVReorder_move(0,e); }
function TVReorder_moveDown(e){
	TVReorder_move(1,e); }

function TVReorder_move(dir,e){
	var a = e.currentTarget;
	var tr = a.parentNode.parentNode.parentNode;
	var coords = XPathQ("td[@class='aligned_coords']/div[@class='cox']",'str',tr).stringValue + 
		'|' + 
		XPathQ("td[@class='aligned_coords']/div[@class='coy']",'str',tr).stringValue;
	
	var order = GM_getValue('TVReorder_order','').split(',');
	var pos = order.indexOf(coords);
	
	// Check for boundary conditions
	if( (dir == 0 && pos == 0) ||
		(dir == 1 && pos == order.length-1))
		return;

	order.splice(pos,1);
	
	if(dir == 0)
		order.splice((pos-1),0,coords);
	else
		order.splice((pos+1),0,coords);
	
	GM_setValue('TVReorder_order',order.join(','));

	TVReorder_reorderVillages();
	}

main();
