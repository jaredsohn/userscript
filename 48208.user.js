// ==UserScript==
// @name           tnea
// @namespace      com.blogspot
// @description    TNEA Councelling
// @include        http://tnea2.annauniv.edu:9080/tnea08/cutoff/colldist.jsp
// ==/UserScript==






tnColleges = [ 1, 2, 105, 309, 509,  5, 6, 7, 704, 706, 708, 710, 712, 714, 716, 718, 719, 721, 722, 724, 725, 726, 727, 729, 730, 731, 732, 733, 734,  410, 425, 822,  606, 616,  703, 720, 906, 910, 913,  702, 707, 709, 711, 713, 715, 717, 723,  4, 201, 202, 204, 205, 206, 207, 208, 209, 211, 212, 214, 216, 218, 219, 222, 225, 226, 227, 230, 301, 303, 305, 306, 307, 310, 311, 313, 315, 316, 317, 318, 319, 320, 322, 401, 404, 405, 407, 409, 411, 414, 417, 418, 419, 420, 422, 423, 424, 426, 427, 517,  952, 956, 963, 971, 972, 977, 978, 981, 982, 983, 984, 985, 987,  608, 622, 630,  601, 603, 621,  8, 903, 904, 911, 914, 915, 922, 986,  801, 806,  602, 607, 609, 610, 611, 612, 613, 614, 617, 620, 624, 626, 627, 628, 629, 631, 632, 633, 634, 635,  805, 817, 823,  812, 905, 908, 918, 920, 923,  907, 921,  615, 618, 623, 625,  901, 912, 916, 919,  804, 814, 824, 825,  705,  902, 909, 988,  101, 102, 106, 107, 108, 109, 110, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 210, 213, 217, 221, 228, 229, 304, 416,  503, 504, 508, 512, 513, 518,  803, 821,  954, 957, 962, 975, 976,  11, 802, 807, 808, 809, 810, 811, 813, 815, 819, 820, 826,  953, 955, 958, 961, 964, 966, 967, 968, 969, 973, 974, 980, 989,  501, 505, 506, 507, 510, 511, 514, 515, 516, 519,  402, 406, 408, 412, 421, 428, 605, 917, 959, 960, 965, 970, 979]

var deptList = [
	["Aeronautical Engineering"],
	["Automobile Engineering"],
	["Automobile Engineering (SS)"],
	["Agriculture and Irrigation Engg.(SS)"],
	["Bio-Technology (SS)"],
	["Bio-Technology"],
	["Bio Medical Engg(SS)"],
	["Civil Engineering"],
	["Chemical Engineering"],
	["Computer Science and Engg."],
	["Computer Science and Engg.(SS)"],
	["Electronics and Comm Engg.","Electronics & Comm"],
	["Electrical and Elec. Engg."],
	["Electronics &amp; Comm Engg(SS)"],
	["Elec & Electronics(Sandwich)(SS)"],
	["Fashion Technology(SS)"],
	["Geo-Informatics"],
	["Information Technology"],
	["Information Technology(SS)"],
	["Instrumentation and Control(SS)"],
	["Industrial Engineering", "Electronics and Instru Engg."],	
	["Mining Engineering"],
	["Mechanical Engineering"],
	["Mechanical Engg (Sandwich)(SS)"],
	["Metallurgical Engineering"],
	["Materials Science and Engg.(SS)"],
	["Production Engineering"],
	["Production Engg.(Sandwich)(SS)"],
	["Instrumentation<wbr> and Control"],
	["Textile Technology"],
	["Mechatronics"],
	["Manufacturing Engineering"],
	["Printing Technology"],
	["Fashion Technology"],
	["Bio Medical Engineering"],
]

function generateSheet()
{
	console.log("Generating Sheet");
	result  = "<table border = 1>"
	result += "<tr><th>College Name</th>";
	for (var j = 0; j  < deptList.length; j++)
	{
		result += "<th>" + deptList[j] + "</th>";
	}
	result += "</tr>"
	for (var i = 0; i < tnColleges.length; i++)
	{
		result += "<tr>";
		
		var college = GM_getValue('col_' + tnColleges[i]);
		college = eval("college=" + college);
		result += "<td>" + college.name+ "</td>";
		
		for (j = 0; j < deptList.length; j++)
		{
			var space = "&nbsp;";
			result += "<td>";
			for (dept in college)
			{
				for (var k =0 ;k < deptList[j].length; k++)
				{
					if (dept.toUpperCase() == deptList[j][k].toUpperCase())
					{
						result += college[dept].oc;
						college[dept] = "";
						space = "";
					}
				}
			}
			result += space + "</td>"
		}
		
		for (dept in college)
		{
			if (college[dept] != "" && dept != "name")
			{
				console.log(college.name + ":> " + dept);
			}
		}
		
		result += "</tr>";
	}
	result += "</table>";
	document.body.innerHTML = result;
	unsafeWindow.axe = college;
}

function getDetailsFromCollege()
{
	collegeName = document.body.innerHTML.substring(document.body.innerHTML.indexOf("Name of the College:</span>") + 27, document.body.innerHTML.indexOf("</u>"));
	
	
	var contentDiv = 
	document.body.getElementsByTagName("form")[0]
	.getElementsByTagName("table")[0]
	.getElementsByTagName("tbody")[0]
	.getElementsByTagName("tr")[0]
	.getElementsByTagName("td")[0]
	.getElementsByTagName("table")[0]
	.getElementsByTagName("tbody")[0]
	.getElementsByTagName("tr")[1]
	.getElementsByTagName("td")[1]
	.getElementsByTagName("div")[0]
	.getElementsByTagName("table")[0]
	.getElementsByTagName("tbody")[0]
	.getElementsByTagName("tr");
	
	var collegeDetails = {"name" : collegeName};
	for (var i = 2; i < contentDiv.length; i++)
	{
		collegeDetails[contentDiv[i].getElementsByTagName("td")[0].innerHTML] = 
		{
			"oc" : contentDiv[i].getElementsByTagName("td")[1].innerHTML,
			"bc" : contentDiv[i].getElementsByTagName("td")[2].innerHTML,
			"mbc": contentDiv[i].getElementsByTagName("td")[3].innerHTML,
			"sc" : contentDiv[i].getElementsByTagName("td")[4].innerHTML,
			"st" : contentDiv[i].getElementsByTagName("td")[5].innerHTML,
		}
	}
	
	return jsonToString(collegeDetails);
}

function jsonToString(data)
{
	var result = "{";
	for (field in data)
	{	
		var fieldVal = field;
		var dataVal  = "'" + data[field] + "'";
		if (typeof(data[field]) == "object")
		{
			dataVal = jsonToString(data[field]);
		}
		
		
		result += "'" + fieldVal + "':" + dataVal + ",";
	}
	result += "}"
	return result;
}


function saveCollege(colIndex, collegeData)
{
	unsafeWindow.axe = collegeData;
	console.log(colIndex);
	console.log(collegeData);
	GM_setValue('col_' + tnColleges[colIndex], collegeData);
}

if (document.location.href.indexOf("http://localhost/axe.html" != -1))
{
	generateSheet();
}
else if (document.location.href.indexOf("http://tnea2.annauniv.edu:9080/tnea08/cutoff/cutoff.jsp?" != -1))
{
	if (typeof(document.body.getElementsByTagName("form")[0]) == "undefined")
	{
		window.setTimeout("window.location=window.location",2000);
	}
	else 
	{
	
		var colIndex = 0;
		if (!GM_getValue('colIndex')) 
		{
			GM_setValue('colIndex', colIndex);
		} 
		else 
		{
			colIndex = GM_getValue('colIndex');
		}
		
		saveCollege(colIndex, getDetailsFromCollege());
		GM_setValue('colIndex', colIndex+1);
		cmd = "document.location = 'http://tnea2.annauniv.edu:9080/tnea08/cutoff/cutoff.jsp?" + tnColleges[colIndex+1] + "';";
		window.setTimeout(cmd,1000);
	}
}




unsafeWindow.addList = function()
{

	var content = document.body.innerHTML;

	var univLink = [];
	var arrayLen = 0;
	for (var i = 1; i < content.length && i > 0;i = content.indexOf("cutoff.jsp", i+1))
	{
	    univLink[arrayLen++] = content.substring(i+11,content.indexOf("\"",i+1));
	}

	cookieList = document.cookie.split(";")
	for (i = 0; i < cookieList.length; i++)
	{
		if (cookieList[i].indexOf("univList") != -1)
		{
			eval(cookieList[i]);
			break;
		}
	}
	univList = univList.concat(univLink);
	document.cookie = "univList=["+ univList + "]";
	console.log(document.cookie);
	console.log(univList.length);
}

unsafeWindow.clearList = function()
{
	document.cookie = "univList=[];"
	console.log(document.cookie);
}