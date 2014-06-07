// ==UserScript==
// @name			Pagesofpain folding offtop
// @date           		2010-08-20
// @author         		develmax
// @description			Add folding offtop
// @namespace			Pagesofpain
// @include			http://pagesofpain.com/forum/*
// @match			http://pagesofpain.com/forum/*
// @version			1.0
// ==/UserScript==
(function() 
{
	function getElementsByClassName(classname, node)
	{
		if(!node) node = document.getElementsByTagName("body")[0];
		var	a = [],
			re = new RegExp("\\b" + classname + "\\b"),
			els = node.getElementsByTagName("*");
		for(var i in els)
		if(re.test(els[i].className))a.push(els[i]);
			return a;
	}


	function isOff(obj)
	{	
		var res = false;
		
		if(obj)
		{
			var pattern = /((оф(ф|)топ)|(of(f|)top)|(офф:|off:))/i;
			
			res = pattern.test(obj.innerHTML);

			if(!res) 
			{
				var children = obj.childNodes
			 
			    	for(var i=0;i<children.length; i++)
				{
			        	var child = children[i];
	
			        	/*if(isOff(child))
					{
						res = true;
						break;
					}*/
			    	}
			}		
		}
		return res;
	}

	function in_click() 
	{
		var obj = this;
		in_edit(obj);
	}

	function in_edit(obj) 
	{
		var row_title = obj.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
		var row_message = row_title.nextElementSibling;
		var row_tail = row_message.nextElementSibling;

		var cel_avatar = row_message.firstElementChild;
		var cel_message = row_message.firstChild.nextElementSibling;

		if(obj.getAttribute("in_st") == "-")
		{
			obj.innerHTML = addon.getAttribute("in_plus");
			obj.setAttribute("in_st", "+");
			
			row_title.firstElementChild.width = "154px";
			row_title.firstElementChild.nextElementSibling.width = "";

			row_message.style.display = "none";
			//row_tail.style.display = "none";

			/*var el = row_tail;
			while(el.nextElementSibling)
			{
				el = el.nextElementSibling;
				//if(el.className == "row2")
				el.style.display = "none";
			}*/
			
		}
		else
		{
			obj.innerHTML = addon.getAttribute("in_minus");
			obj.setAttribute("in_st", "-");

			row_title.firstElementChild.width = "";
			row_title.firstElementChild.nextElementSibling.width = "100%";

			row_message.style.display = "table-row";
			//row_tail.style.display = "table-row";

			/*var el = row_tail;
			while(el.nextElementSibling)
			{
				el = el.nextElementSibling;
				//if(el.className == "row2")
				el.style.display = "table";
			}*/
		}
	}

	function addHandler(object, event, handler)
	{
		if (typeof object.addEventListener != 'undefined')
		object.addEventListener(event, handler, false);
		else if (typeof object.attachEvent != 'undefined')
		object.attachEvent('on' + event, handler);
		else
		throw "Incompatible browser";
	}

	function helpline_off_over()
	{
		var helpline = getElementsByClassName("helpline")[0];
		helpline.value = "Оффтоп: [offtop]text[/offtop]";	
	} 

	function helpline_off_click()
	{
		bbfontstyle("[offtop]", "[/offtop]");
	} 

	var titles = getElementsByClassName("gensmall");

	for (var cur in titles)
	{	
		if(titles[cur].width == "100%")
		if(titles[cur].firstChild.tagName == "DIV")
		{
			//alert(titles[cur].firstChild.tagName);
			
			var el = titles[cur].firstChild;
	
			var cont = document.createElement("div");

                        var lh = cont.style.lineHeight;

                        if(lh && (lh == "1em"))
  			  cont.setAttribute("style", "float:left;margin-top: 3px;");
  			else
  			  cont.setAttribute("style", "float:left;");

		   	var addon=document.createElement("a");
		   	addon.setAttribute("href","javascript:void(0);");
			addon.setAttribute("in_st", "-");
			addon.setAttribute("in_minus", '<img src="http://www.auto-tools.ru/images/new_cat_minus.gif">');
			addon.setAttribute("in_plus", '<img src="http://www.auto-tools.ru/images/new_cat_plus.gif">');
			addon.innerHTML = addon.getAttribute("in_minus");

			addHandler(addon, 'click', in_click);			

		   	cont.appendChild(addon);
		    	el.insertBefore(cont, el.firstChild);

			var row_title = addon.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
			var row_message = row_title.nextElementSibling;
			var row_tail = row_message.nextElementSibling;

			var cel_message = row_message.firstElementChild.nextElementSibling;

			if(isOff(cel_message))
			{
				in_edit(addon);
				
				var off_text = document.createElement("div");
				off_text.setAttribute("style", "float:right");
				off_text.innerHTML = '&nbsp;<b><font color="#BF3030">(вероятно содержит оффтоп)</font></b>';
				
				el.insertBefore(off_text, el.firstChild.nextElementSibling);
			}
		}
	}

	
	var bbuttons = getElementsByClassName("btnbbcode");

	for (var cur in bbuttons)
	{
		if(bbuttons[cur].value == "strike")
		{
			el = bbuttons[cur];
			
			var bt = document.createElement("input");
			bt.setAttribute("type", "button");
			bt.setAttribute("value", "offtop");
			bt.setAttribute("name", "addbbcode25");
			bt.setAttribute("class", "btnbbcode");
			bt.setAttribute("onmouseout", "helpline('tip')");
			bt.setAttribute("onclick", 'bbfontstyle("оффтоп: ", "")');
			//document.forms[form_name].helpbox.value
			bt.setAttribute("onmouseover", 'document.forms[form_name].helpbox.value = "Высказывание вне темы: \'оффтоп: text\'";');
			//addHandler(bt, 'mouseover', helpline_off_over);
			//addHandler(bt, 'mouseover', helpline_off_click);

			el.parentNode.appendChild(bt);
		}
	}
})();