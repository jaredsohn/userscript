// ==UserScript==
// @name           GiantBomb List Sorter
// @namespace      http://userscripts.org/users/gardenninja
// @description    Sort your GiantBomb lists from the edit screen
// @include        http://www.giantbomb.com/list/edit/?id=*
// ==/UserScript==

function GiantBombListSorter()
{
    function foreach(items, fn)
    {
	for (var i = 0; i < items.length; i++)
	{
	    var item = items[i];
	    fn(item, i);
	}    	
    }

    // Input Normalization
    function trans(f, t)
    {
	return {from:f, to:t};
    }
    function translator()
    {
	var tab = arguments;

	return function(input)
	{
	    var output = input;

	    foreach(tab, function(e)
	    {
		var r = new RegExp(e.from, "ig");
		output = output.replace(r, e.to);
	    });
	    
	    return output;
	}
    }
    var fixPunctuation = translator(
				    trans("'"  ,      "")
				    ,trans("\\.",     "")
				    ,trans(":\\s+",   " ")
				    ,trans("-"  ,     " ")
				    ,trans("\\b&\\b", "and")
				    ,trans("!",       "")
				    );

    var removeSimpleWords = translator(
				       trans("\\band\\b", "")
				       ,trans("\\ba\\b",  "")
				       ,trans("\\ban\\b", "")
				       ,trans("\\bof\\b", "")
				       ,trans("\\bon\\b", "")
				       ,trans("\\bthe\\b", "")
				       );
    
    var romanToArabicNumerals = translator(trans("\\s+XV\\b",    " 15")
					   ,trans("\\s+XIV\\b",  " 14")
					   ,trans("\\s+XIII\\b", " 13")
					   ,trans("\\s+XII\\b",  " 12")
					   ,trans("\\s+XI\\b",   " 11")
					   ,trans("\\s+X\\b",    " 10")
					   ,trans("\\s+IX\\b",   " 09")
					   ,trans("\\s+VIII\\b", " 08")
					   ,trans("\\s+VII\\b",  " 07")
					   ,trans("\\s+VI\\b",   " 06")
					   ,trans("\\s+V\\b",    " 05")
					   ,trans("\\s+IV\\b",   " 04")
					   ,trans("\\s+III\\b",  " 03")
					   ,trans("\\s+II\\b",   " 02")
					   // ,trans("\\bI\\b", "1")
					   );

    var collapseWhitespace = translator( trans("\\s+" ," ")
					,trans("^\\s*","")
					,trans("\\s*$","")
					);

    function normalizeText(input)
    {
	var output = input.toLowerCase();
	var operations = [
			  romanToArabicNumerals
			  ,fixPunctuation
			  ,removeSimpleWords
			  ,collapseWhitespace
			  ];

	foreach(operations, function(fn)
	{
	    output = fn(output);
	});

	return output;
    }

    // Extract Info from a List Item
    function ItemInfo(item)
    {
	var divActions = item.getElementsByClassName("actions")[0];
	var divInfo = item.getElementsByClassName("info")[0];
	var anchor = divInfo.getElementsByTagName("a")[0];

	var comments = divInfo.getElementsByTagName("textarea")[0];

	this.txtOrder = divActions.getElementsByClassName("js-order")[0];

	this.item = function()
	{
	    return item;
	}

	this.normalizedItemName = function()
	{
	    var baseValue = anchor.firstChild.nodeValue;
	    return normalizeText(baseValue);
	}

	anchor.title = this.normalizedItemName();

	this.kvAttribute = function(a, d)
	{
	    if (!d) d = "";

	    var r = new RegExp("^#\\s*" + a + "\\s*:\\s*(.*)$","im");

	    var matches = comments.value.match(r);
	    
	    if (!matches) return d;

	    return matches[1];
	}

	this.flagAttribute = function(a)
	{
	    var r = new RegExp("^#\\s*" + a + "\\s*$","im");

	    return r.test(comments.value);
	}
    }

    function SortingOption(li)
    {
	var attr_name = li.getElementsByClassName("attr_name")[0];
	var attr_type = li.getElementsByClassName("attr_type")[0];
	var attr_order = li.getElementsByClassName("attr_order")[0];
	var attr_order_list = li.getElementsByClassName("attr_order_list")[0];
	var attr_handle_empties = li.getElementsByClassName("attr_handle_empties")[0];

	this.name = function()
	{
	    return attr_name.value;
	}
	this.type = function()
	{
	    return radioListValue(attr_type);
	}
	
	this.order = function()
	{
	    return radioListValue(attr_order);
	}
	this.orderList = function()
	{
	    return radioListValue(attr_order_list);
	}
	this.handleEmpties = function()
	{
	    return radioListValue(attr_handle_empties);
	}

	this.comparator = function()
	{
	    if (this.type() == "keyvalue")
	    {
		var compr = kvComparator(this.name());

		return compr;
	    }
	    else if (this.type() == "flag")
	    {
		var compr = flagComparator(this.name());
		return compr;
	    }
	    else
	    {
		alert("Invalid Attribute Type");
		return null;
	    }
	}
    }
    
    function prepItems(items)
    {
	var array = [];
	foreach(items, function(item)
	{
	    var info = new ItemInfo(item);
	    array.push(info);
	});
	return array;
    }

    function prepOptions(ls)
    {
	var array = [];
	foreach(ls, function(l)
	{
	    var option = new SortingOption(l);
	    array.push(option);
	});
	return array;
    }

    function updateOrders(list, infos)
    {
	var parent = list.parentNode;
	parent.removeChild(list);
	foreach(infos, function(info, index)
	{
	    info.txtOrder.value = index + 1;
	    
	    var item = info.item();
	    item.setAttribute("order", index + 1);

	    list.appendChild(item);
	});

	parent.appendChild(list);
    }

    // Sorting
    function basicComparator(f)
    {
	return function(a,b) 
	{ 
	    var avalue = f(a);
	    var bvalue = f(b);
	    
	    if (avalue < bvalue) return -1;
	    else if (avalue == bvalue) return 0;
	    else return 1;
	}
    }

    function reverseComparator(f)
    {
	return function(a, b)
	{
	    return f(b, a);
	}
    }
    var compareNames = basicComparator(function(x)
    {
    	return x.normalizedItemName();
    });

    function kvComparator(key)
    {
	return basicComparator(function(x)
	{
	    return x.kvAttribute(key);
	});			
    }
    function flagComparator(flag)
    {
	return basicComparator(function(x)
	{
	    return x.flagAttribute(flag);
	});
    }

    function sortItems(list, ulOptions)
    {
	var items = list.getElementsByTagName("li");
	var infos = prepItems(items);
	var lis = ulOptions.getElementsByTagName("li");
	var options = prepOptions(lis);

	var cs = [];
	foreach(options, function(o)
	{
	    cs.unshift(o.comparator());
	});
	cs.unshift(compareNames);

	foreach(cs, function(c)
	{	    
	    infos.sort(c);
	});

	updateOrders(list, infos);
    }

    // GUI
    var genIdCount = 0;
    function genId(prefix)
    {
	genIdCount++;

	return prefix + "_" + genIdCount;
    }
    // Basic
    function element(nodeName, attributes)
    {
	if (!attributes) attributes = {};
	var el = document.createElement(nodeName);

	for (key in attributes)
	{
	    el[key] = attributes[key];
	}   

	return el;
    }
    function text(value)
    {
	return document.createTextNode(value);
    }
    function container()
    {
	var c = element("div");
	c.className = "container";
	return c;
    }
    // Specific Elements
    function fieldset(legendText)
    {
	var fs = element("fieldset");
	var legend = element("legend");
	legend.appendChild(text(legendText));
       	fs.appendChild(legend);
	return fs;
    }    

    function button(buttonText, onclickfn)
    {
	var btn = element("button");
	btn.type = "button";
	btn.appendChild(text(buttonText));

	btn.addEventListener("click", function()
	{
	    onclickfn(btn);
	}, false);

	return btn;
    }

    function label(labelText)
    {
	var lbl = element("label");
	lbl.appendChild(text(labelText));
	return lbl;
    }
    function input(type)
    {	
	return element("input", {type:type});
    }
    function addTextbox(parent, labelText, idPrefix)
    {
	var c = container();
	parent.appendChild(c);

	var lbl = label(labelText);
     
	var txt = input("text");
	txt.id = genId(idPrefix);
	txt.className = idPrefix;
	lbl.htmlFor = txt.id;

	c.appendChild(lbl);
	c.appendChild(txt);

	return txt;
    }

    function addRadioButton(parent, value, labelText, name)
    {
	var radio = input("radio");
	radio.value = value;
	radio.name = name;
	radio.id = genId(name);

	var lbl = label(labelText);
	lbl.htmlFor = radio.id;

	parent.appendChild(radio);
	parent.appendChild(lbl);

	return radio;
    }

    function radioListValue(rl)
    {
	var rs = document.getElementsByName(rl.id);

	var sel = null;
	foreach(rs, function(r)
	{
	    if (r.checked) sel = r.value;
	});
	return sel;
    }
    function addRadioList(parent, labelText, namePrefix, options)
    {
	var name = genId(namePrefix);
	var c = container();
	c.id = name;
	c.className = namePrefix;

	parent.appendChild(c);

	var lbl = label(labelText);
	c.appendChild(lbl);
	
	var rs = [];
	for (k in options)
	{
	    var r = addRadioButton(c, k, options[k], name);
	    rs.push(r);
	}
	lbl.htmlFor = rs[0].id;
	rs[0].checked = true;

	return c;
    }

    // Hide and Show Controls
    function hide(c)
    {
	c.style.display = "none";
    }
    function show(c)
    {
	c.style.display = "";
    }


    // Sorting Option
    function liSortingOption()
    {
	var li = element("li");
	li.className = "sorting-option";

	li.appendChild(element("hr"));

	// Buttons
	var c = container();
	li.appendChild(c);

	var btnDel = button("X", function(self)
	{
	    li.parentNode.removeChild(li);
	});

	var btnUp = button("/\\", function(self)
	{
	    if (li.previousSibling)
	    {
		li.parentNode.insertBefore(li, li.previousSibling);
	    }
	});

	var btnDown = button("\\/", function(self)
	{
	    var ns = li.nextSibling;
	    if (ns)
	    {
		li.parentNode.insertBefore(li, ns.nextSibling);
	    }
	});

	c.appendChild(btnDel);
	c.appendChild(btnUp);
	c.appendChild(btnDown);

	// Options
	var attr_name = addTextbox(li, "Attribute:","attr_name");
	
	var attr_type = addRadioList(li, "Type:", "attr_type", {
		keyvalue:"Key / Value",
		flag:"Flag"
	    });

	var attr_order = addRadioList(li, "Order:", "attr_order", {
		asc:"Ascending",
		desc:"Descending",
		list:"List"
	    });

	var attr_order_list = addTextbox(li, "Order List:", "attr_order_list");

	var attr_handle_empties = addRadioList(li, "Empties:", "attr_handle_empties", {
		normal:"Default",
		top:"Push to Top",
		bottom:"Push to Bottom"
	    });

	// hide until supported
	hide(attr_order);
	hide(attr_order_list.parentNode);
	hide(attr_handle_empties);

	return li;
    }

    function buildGui(list)
    {
	var fs = fieldset("Sorting Options");
	list.parentNode.insertBefore(fs, list);

	var sortOptions = element("ul");

	var btnAddOption = button("Add Sort Option", function()
	{
	    sortOptions.appendChild(liSortingOption());
	});
	fs.appendChild(btnAddOption);

	fs.appendChild(sortOptions);

	var saveButtons = document.getElementsByClassName("js-save-list");

	foreach(saveButtons, function(btnSave)
	{
	    var btnSort = button("Sort this list", function()
	    {
		sortItems(list, sortOptions);
	    });

	    btnSave.parentNode.insertBefore(btnSort, btnSave.nextSibling);
	});

	fs.appendChild(btnSort);	
    }

    this.run = function()
    {
	var list = document.getElementById("js-newitems");

	buildGui(list);
    }
}

new GiantBombListSorter().run()
