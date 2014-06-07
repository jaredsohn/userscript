// ==UserScript==
// @name           leumit-appoint-finish
// @description    leumit's bad javascript
// @include        https://online.leumit.co.il/leumit/AppointsManagment.process
// ==/UserScript==

add_func_str = 
"	function getDrAppoint()"
+"	{"
+"	"
+"		var thisForm=document.F1;"
+"		var submitIndicatoe = false;"
+"		"
+"		for(var i=0 ; i< thisForm.chosen.length ; i++)"
+"		{"
+"			if(thisForm.chosen[i].checked )"
+"			{"
+"		"
+"				submitIndicatoe  = true ;"
+"				document.F1.action=\"AppointsManagment.process?actionType=createNewDrAppoint&\"+thisForm.chosen[i].value;"
+"		"
+"				var fullstr = thisForm.chosen[i].value ; "
+"				"
+"				var start = fullstr.indexOf(\"=\");"
+"				var LineIndex=fullstr.substring(start+1,fullstr.length );"
+"				document.F1.INDEX.value=fullstr.substring(start+1,fullstr.length );"
+"				"
+"		"
+"				if(thisForm.PreOrder[LineIndex]==null)"
+"				{"
+"					if(thisForm.PreOrder.value!=\"\")"
+"					{"
+"						showPreOrderLine(thisForm.PreOrder.value,2);"
+"					}"
+"					else"
+"					{"
+"						document.F1.submit();"
+"					}"
+"				}"
+"				"
+"				else"
+"				{"
+"				"
+"					if(thisForm.PreOrder[LineIndex].value!=\"\")"
+"					{"
+"						showPreOrderLine(thisForm.PreOrder[LineIndex].value,2);"
+"					}"
+"					else"
+"					{"
+"						document.F1.submit();"
+"					}"
+"				}"
+"			}"
+"		}"
+"		if(submitIndicatoe ==false)"
+"		{"
+"			alert(\"úçéìä éù ìáçåø àú äúåø äîáå÷ù\");"
+"		}"
+"	}";
add_func_str +=
"	function removeAppoint()"
+"	{"
+"		var thisForm=document.F1;"
+"		var submitIndicatoe = false;"
+"		for(var i=0 ; i< thisForm.chosen.length ; i++)"
+"		{"
+"			if(thisForm.chosen[i].checked )"
+"			{"
+"				submitIndicatoe  = true ;"
+"				document.F1.action=\"AppointsManagment.process\";				"
+"				document.F1.actionType.value=\"removeAppoint\";"
+"				var fullstr = thisForm.chosen[i].value ; "
+"				var start = fullstr.indexOf(\"=\");"
+"				document.F1.INDEX.value=fullstr.substring(start+1,fullstr.length );"
+"				document.F1.REQUEST_ID.value =  new Date().getTime() ; "
+"				"
+"				if(confirm(\"ôòåìä æå úáèì àú äúåø\"))"
+"				{"
+"					document.F1.submit();"
+"				}"
+""
+"			}"
+"		}"
+"		if(submitIndicatoe ==false)"
+"		{"
+"			alert(\"úçéìä éù ìáçåø àú äúåø äîáå÷ù\");"
+"		}"
+"	}";



function merge_to_right_script()
{
	scripts = document.getElementsByTagName("script");
	for (var i in scripts)
		if (scripts[i].text && scripts[i].text.indexOf("showPreOrderLine")>=0)
		{
			str = scripts[i].text + add_func_str;

			scpt = document.createElement("script");
			scpt.setAttribute("type", "text/javascript");
			scpt.text = str;
			document.body.appendChild(scpt);

			return;
		}
}

merge_to_right_script();

