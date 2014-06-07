// ==UserScript==
// @name           leumit-appoint
// @description    leumit's bad javascript
// @include        https://online.leumit.co.il/leumit/AppointsManagment.process?actionType=preDrAppointSearch
// ==/UserScript==

/* also include https://online.leumit.co.il/leumit/drApointSearch.jsp */


function do_change(cspn)
{
	ndiv = document.createElement("div");
	ndiv.name = cspn.name;
	ndiv.id = cspn.id;
	ndiv.style.overflow = "auto";
	ndiv.style.height = cspn.style.height; ndiv.style.width = cspn.style.width;
	ndiv.innerHTML = cspn.innerHTML;
	cspn.parentNode.replaceChild(ndiv, cspn);

	return ndiv;
}

function change_span_to_div()
{
	cspn = document.getElementById("tblSelect").parentNode;
	ndiv = do_change(cspn);

	cspn = document.getElementById("spnExists");
	ndiv = do_change(cspn);
//	ndiv.addEventListener("click", function(){if(document.all.s3.style.display=='none'){document.all.s3.style.display='inline';}}, false);
	ndiv.addEventListener("click", function(){el=document.getElementById("s3");if (el.style.display=='none') el.style.display='inline';}, false);

	cspn = document.getElementById("spnBranchesSelector");
	ndiv = do_change(cspn);

	cspn = document.getElementById("spnSpecializationSelector");
	ndiv = do_change(cspn);
}


function find_array_init(scripts)
{
	/* we merge the initialization script into the main (modified) script */
	for (var i in scripts)
		if (scripts[i].text && scripts[i].text.indexOf("branchesArray =")>=0)
			return scripts[i].text;
}

function change_funcs()
{
	scripts = document.getElementsByTagName("script");
	str = "";
	arri = find_array_init(scripts);
	for (var i in scripts)
	{
		if (scripts[i].text)
		{
			str = scripts[i].text.replace(/cells\[([a-zA-Z]*)\]/g, "rows[$1].cells[0]");
			str = str.replace(/srcElement/g, "target");
			str = str.replace(/innerText/g, "textContent");
			str = str.replace(/\.add\((.*)\)/g, ".add($1, null)");
			str = str.replace("this.F1", "document.F1");

//			str = str.replace("var selectedOption", "alert(\"here we are at \" + idSelect + \" that has \" + mapperArray.length); var selectedOption");

			if (str != scripts[i].text)
			{
				if (str.indexOf("mapperArray")>=0)
					str += arri;

				scpt = document.createElement("script");
				scpt.setAttribute("type", "text/javascript");
				scpt.text = str;
				document.body.appendChild(scpt);
			}
		}
	}
}

change_span_to_div();
change_funcs();

/* and you still cannot use the right menu as a human being...
 * and the dates fields are very bad (number is cut, and cannot launch the
 * calendar to modify the readonly textbox) */

