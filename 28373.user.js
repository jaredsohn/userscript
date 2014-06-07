// ==UserScript==
// @name           SSW Recipe Helper
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Makes all ingredients for a recipe
// @include        http://www.secretsocietywars.com/index.php?p=inventory&a=recipes*
// @include        http://www.secretsocietywars.com/index.php?p=inventory&a=combine*
// ==/UserScript==

var frms;
var recipe_form;
var got_missing = 0;

frms = document.evaluate('//form[contains(@action,"a=recipes")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if(frms.snapshotLength > 0) {
	recipe_form = frms.snapshotItem(0);
	recipe_form.addEventListener("submit", make_stuff_submit, false);
}

function make_stuff_submit(ev) {
	var results = new Object();
	var item  = new Object();
	var frms;
	var recipe_form;
	var txts;
	var quantity;
	var selects;
	var recipe_input;
	var er;
	var fieldsets;

	ev.preventDefault();
	
	results.stack    = new Array();
	results.graphics = new Array();
	results.made     = new Array();
	results.idnum    = new Array();
	results.used     = new Array();
	results.remain   = new Array();
	results.itemname = new Array();
	results.dummyid  = get_known_recipes("dummy1", false);
	results.recipes  = get_known_recipes("recipe", true);

	fieldsets = document.evaluate("//fieldset[@class='results']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(fieldsets.snapshotLength > 0) {
		results.fieldset = fieldsets.snapshotItem(0);
	} else {
		results.fieldset = insert_fieldset();
	}

	frms = document.evaluate('//form[contains(@action,"a=recipes")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(frms.snapshotLength > 0) {
		recipe_form = frms.snapshotItem(0);
	} else {
		er = "Unable to find recipe form (which is strange since an event listener was added to it)";
	}
	txts = document.evaluate('//input[@name="qty"]', recipe_form, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(txts.snapshotLength > 0) {
		quantity = parseInt(txts.snapshotItem(0).value);
	} else {
		er = "Unable to find 'qty' input";
	}
	selects = document.evaluate('//select[@name="recipe"]', recipe_form, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(selects.snapshotLength > 0) {
		recipe_input = selects.snapshotItem(0);
	} else {
		er = "Unable to find 'recipe' select";
	}

	if(er) {
		alert("SSW Recipe Helper Error:\n" + er + "\n\nYou may want to disable the Recipe Helper since changes to secretsocietywars.com may have made it stop working.  This script is aborting and is not going to attempt to make anything.  Sorry.");
	} else {
		item.name   = find_sel_text(recipe_input, recipe_input.value);
		item.num    = recipe_input.value;
		item.tomake = quantity;
		results.stack.push(item);
		results.made[item.name] = 0;
		make_stuff_bynum(results);
	}
}

function insert_fieldset() {
	var m;
	var main;
	var newtable;
	var fsets;
	var fieldset;
	
	m = document.evaluate('//td[@class="main"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(m.snapshotLength > 0) {
		main = m.snapshotItem(0);

		newtable = document.createElement('table');
		newtable.border      = "0";
		newtable.cellpadding = "0";
		newtable.cellspacing = "0";
		newtable.width       = "100%";
		newtable.innerHTML = '<tbody><tr><td style="padding: 10px; background-color: rgb(255, 255, 255);"><fieldset class="results"><legend class="results">&nbsp;&nbsp;<b>WHAT\'S HAPPENING???</b>&nbsp;&nbsp;</legend></fieldset></td></tr></tbody>';
		main.insertBefore(newtable, main.firstChild);
		fsets = newtable.getElementsByTagName("fieldset");
		fieldset = fsets[0];
	}
	return fieldset;
}

function find_graphics(fset_text, results, itemname) {
	var lastpos = -1;
	var newpos;
	var img;
	var desc;
	var re;
	
	while((newpos = fset_text.indexOf("<img", lastpos+1)) > -1) {
		lastpos = newpos;
		if(re = /^<img[^>]*src="([^"]*)".*?<td[^>]*>(?:Giving\s+\d+|Taking\s+\d+)?\s*([^\.<]+)(?:[^<]*<br>[^<]+)?/.exec(fset_text.substr(newpos))) {
			var img_src;
			var item_name;
			var item_num;
			var re2;

			img_src   = re[1];
			item_name = re[2];


/*
			if(re2 = /&id=(\d+)/.exec(re[0])) {
				item_num = re2[1];
			} else {
				item_num = img_src;
			}
*/
			/* Sometimes a single item returned on two seperate pages will have
			   its id found on one page and not the other, so we'll just assign
			   the image to the id number all the time.  This shouldn't be too
			   much of a problem since the item_num just needs to be unique for
			   each item which the graphic should be */
			item_num = img_src;

			if(re[0].indexOf("Giving") > -1) {
				results.graphics[itemname] = img_src;
			}

			if(re2 = /Taking (\d+)[^<]*<br>[^<]*Now you have (\w+)\./i.exec(re[0])) {
				var numleft;
				var numtaken;
				
				numtaken = parseInt(re2[1]);
				if(re2[2] == "none") {
					numleft = 0;
				} else {
					numleft = parseInt(re2[2]);
				}
				if(!results.used[item_num]) {
					results.used[item_num] = 0;
				}
				results.used[item_num] += numtaken;
				results.remain[item_num] = numleft;
		  }
			results.graphics[item_num]  = img_src;
			results.graphics[item_name] = img_src;
			results.idnum[item_name]    = item_num;
			results.idnum[img_src]      = item_num;
			results.itemname[img_src]   = item_name;
			results.itemname[item_num]  = item_name;

			/* item numbers are inconsistent between recipes and inventory, so do both: */
			results.graphics[results.dummyid[item_num]] = img_src;
			results.graphics[results.recipes[results.dummyid[item_num]]] = img_src;

		}
	}
}
		
function process_response(response_text, results) {
	var fieldsets;
	var what_happen;
	var missing_ingredients;
	var stack;
	var item;
	var num_made = 0;
	var re;
	var fset_text;
	
	stack = results.stack;
	item = stack.pop();

	results.idnum[item.name] = item.num; /* might not be necessary */

	if(re = /(<fieldset[^>]*class="results"[\s\S]*<\/fieldset>)/im.exec(response_text)) {
		fset_text = re[1];
		find_graphics(fset_text, results, item.name);
	} else {
		alert("SSW Recipe Helper Error:\nI'm unable to find the results fieldset.  If this error continues you may need to disable the script");
	}
	missing_ingredients = find_missing_ingredients(fset_text, results);

	if(missing_ingredients.length > 0) {
		stack.push(item);
		for(var i = 0; i < missing_ingredients.length; i++) {
			if(results.recipes[missing_ingredients[i]]) {
				var new_item = new Object();

				new_item.name   = missing_ingredients[i]; /* missing ingredients are always singular */
				new_item.num    = results.recipes[missing_ingredients[i]];
				new_item.tomake = item.tomake;
				if(!results.er) {
					stack.push(new_item);
				}
			} else {
				while(stack.pop()) {
				}
				if(results.er) {
					results.er += ', or "' + missing_ingredients[i] + '"';
				} else {
					results.er = 'You don\'t have enough "' + missing_ingredients[i] + '"';
				}
				if(results.graphics[missing_ingredients[i]]) {
					results.er += ' <img src="'+results.graphics[missing_ingredients[i]]+'"> ';
				}
			}
		}
	} else if(re = /[\s\S]*inadequate amount of ingredients: (\d+)/.exec(fset_text)) {
		var new_item = new Object();
		var num_made = parseInt(re[1]);

		item.tomake -= num_made;
		if(item.tomake <= 0) {
//			alert("This is odd: item.tomake <= 0 but there were inadequate ingredients.\nSomething has not worked correctly and the results may be a bit screwy.");
			item.tomake = 0;
		} else {
			stack.push(item);
		}
		/* item.name is always singular because it either comes from the recipe select
		   or from the missing ingredients list which is also singular */
		if(!results.made[item.name]) {
			results.made[item.name] = 0;
		}
		results.made[item.name] += num_made;
		if(results.remain[results.idnum[item.name]] != undefined) {
			results.remain[results.idnum[item.name]] += num_made;
		}
	} else { /* made the item successfully */
		if(!results.made[item.name]) {
			results.made[item.name] = 0;
		}
		results.made[item.name] += item.tomake;
		if(results.remain[results.idnum[item.name]] != undefined) {
			results.remain[results.idnum[item.name]] += item.tomake;
		}
	}
	
		

	for(var i = 0; i < missing_ingredients.length; i++) {
	}

	if(stack.length > 0) {
		make_stuff_bynum(results);
	} else {
		update_status(results);
	}
}

function find_sel_text(sel, val) {
	var opts = sel.options;
	
	for(var i = 0; i < opts.length; i++) {
		if(opts[i].value == val) {
			return opts[i].text;
		}
	}
}

function update_status(results) {
	var itemname;
	var itemnum;
	var quantity;
	var stack;
	var txt = '<legend class="results">&nbsp;&nbsp;<b>WHAT\'S HAPPENING???</b>&nbsp;&nbsp;</legend>';
	var added = 0;
	var color1;
	var color2;
	var finish = 0;

	stack = results.stack;
	
	if(results.stack.length > 0) {
		color1 = "rgb(244, 204, 204);";
		color2 = "rgb(255, 238, 238);";
		itemname = stack[stack.length-1].name;
		itemnum  = stack[stack.length-1].num;
		quantity = stack[stack.length-1].tomake;
	} else { /* stack is empty, display final results */
		color1 = "rgb(204, 204, 204);";
		color2 = "rgb(238, 238, 238);";
		txt = '<legend class="results">&nbsp;&nbsp;<b>WHAT HAPPENED???</b>&nbsp;&nbsp;</legend>';
		finish = 1;
	}
	
	txt += '<table border="0" cellpadding="10" cellspacing="0" width="100%"><tbody><tr><td><table border="0" cellpadding="10" cellspacing="0" width="100%"><tbody><tr><td style="background-color: '+color1+'">';
	if(!finish) {
		if(results.graphics[itemname]) {
			txt += '<img src="' + results.graphics[itemname] + '">';
		} else if(results.graphics[itemnum]) {
			txt += '<img src="' + results.graphics[itemnum] + '">';
		}
	}
	if(finish) {
		if(results.er) {
			txt += "<b>Unable to complete:</b> " + results.er + "<br>";
		} else {
			txt += "<b>Done making items</b><br>";
		}
	} else {
		txt += "<b>Trying to make " + quantity + " " + itemname + "</b><br>";
	}
	txt += '</td></tr><tr><td style="background-color: '+color2+'"><table align="left" border="0" cellpadding="0" cellspacing="5" width="100%"><tbody><tr>';

	
	for(var n in results.made) {
		if(results.made[n] > 0) {

			if(added && (added % 3 == 0)) {
				txt += '</tr><tr>';
			}

			added++;
			txt += '<td align="left" width="33%"><table border="0"><tbody><tr><td width="50">';
			if(results.graphics[n]) {
				txt += '<img src="' + results.graphics[n] + '"><br>';
			}
			txt += '</td><td>Made ' + results.made[n] + ' ' + n + '</td></tr></tbody></table></td>';
		}
	}

	if(finish && !added) {
		txt += '<td>Nothing was made</td>';
	}

	if(added) {
		txt += '</tr></tbody></table></td></tr><tr><td style="background-color: '+color1+'"><table align="left" border="0" cellpadding="0" cellspacing="5" width="100%"><tbody><tr>';
		added = 0;
	}

	for(var n in results.used) {
		if(added && (added % 3 == 0)) {
			txt += '</tr><tr>';
		}
		added++;
		txt += '<td align="left" width="33%"><table border="0"><tbody><tr><td width="50">';
		if(results.graphics[n]) {
			txt += '<img src="' + results.graphics[n] + '"><br>';
		}
		txt += '</td><td>Used ' + results.used[n] + ' ' + results.itemname[n] + '<br>You have ' + results.remain[n] + ' left</td></tr></tbody></table></td>';
	}
		
	txt += "</tr></tbody></table>";
	results.fieldset.innerHTML = txt;
}

function make_stuff_bynum(results) {
	var stack;
	var results;
	var itemnum;
	var num_to_make;
	var req;
	var varstring;

	stack = results.stack;
	
	itemnum     = stack[stack.length-1].num;
	num_to_make = stack[stack.length-1].tomake;
	varstring = "recipe="+itemnum+"&qty="+num_to_make+"&action=Make";

	update_status(results);

	GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://www.secretsocietywars.com/index.php?p=inventory&a=recipes',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: varstring,
		onload: function(responseDetails) {
							process_response(responseDetails.responseText, results);
						}
	});
}

function get_known_recipes(selectname, namekey) {
	var recipes = new Array();
	var opts;
	var selects;

	selects = document.evaluate("//select[@name='"+selectname+"']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(selects.snapshotLength > 0) {
		opts = selects.snapshotItem(0).options;
		for(var i = 0; i < opts.length; i++) {
			var recipe_name;
			var recipe_num;
			
			recipe_name = opts[i].text;
			recipe_num = opts[i].value;
			if(namekey) {
				recipes[recipe_name] = recipe_num;
			} else {
				recipes[recipe_num] = recipe_name;
			}
		}
	}
	return recipes;
}

function find_missing_ingredients(fset_text, results) {
	var ingredients = new Array();
	var num_missing = 0;
	var re;
	var newpos;
	var lastpos = -1;
	var ingredients = new Array();
	
	if(re = /You are missing (\d+) ingredient/.exec(fset_text)) {
		num_missing = re[1];

		while((newpos = fset_text.indexOf("<img", lastpos+1)) > -1) {
			lastpos = newpos;
			if(re = /^<img.*?<td[^>]*>([^\.<]+)/.exec(fset_text.substr(newpos))) {
				ingredients.push(re[1]);
			}
		}
	}
	/* we won't check for a "lowering the quantity" because the items that
	   we have zero of could be pluralized and we need the singular to match
	   the recipe list */
	return ingredients;
}
