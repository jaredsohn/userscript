// ==UserScript==
// @name           Nebs efficienizer
// @namespace      mercs.kicks-ass.org
// @description    This restyles parts of nebs and adds a quick glance menu.
// @include        http://apps.facebook.com/nebulous//*
// ==/UserScript==

var version = 0.1.1
var nebs = document.getElementById("app_content_12266764033");
var notification = document.createElement("div");
var time = new Date();
var refresh_rate = 10;
time = time.getTime();
if(document.getElementById("content")==null)
	document.location = document.URL;
document.getElementById("content").style.width="100%";
document.getElementById("content").innerHTML = "<div style=\"margin:15px; width:648px; display:inline-block;\">" + document.getElementById("content").firstChild.firstChild.innerHTML + "</div>";
//document.getElementById("content").firstChild.tagName = "SPAN";
notification.style.backgroundColor = "#FFFFAA";
notification.style.border = "2px solid #AAAA88";
notification.style.padding = "5px";
notification.style.display = "inline-block";
notification.style.height = "100%";
notification.style.width = (screen.width - 30 - 648 - 4 - 10 - 30) + "px";
notification.style.verticalAlign = "top";
notification.style.marginTop = "15px";
notification.style.marginBottom="15px";
notification.id = "nebs-helper";
numPlanets = 0;
for(var i = 0; i < document.links.length; i++)
	if(document.links[i].href.match("systems.php") && document.links[i].text.match("planets"))
	{
		numPlanets = document.links[i].text.split(": ")[1];
		//alert(document.links[i].text.split(": ")[1]);
		break;
	}
notification.innerHTML="<div style='margin:5px; background:#FFF; color:#000; padding:5px;' id='nebs-links'>\n<a href='systems.php?first=1&amt=" + numPlanets + "'>System</a>\n&nbsp|&nbsp\n<input style='float:right;' onclick=\"setTimeout('if(document.getElementById(\\'nebs-refresh\\').checked) document.location = document.URL;'," + refresh_rate *1000 + " );\" type='checkbox' id='nebs-refresh'/>\n<script type=\"text/JavaScript\">\nsetTimeout(\"if(document.getElementById('nebs-refresh').checked) document.location = document.URL;\"," + refresh_rate*1000 + ");\n</script>\n</div>";
//notification.innerHTML += "<table id='nebs-table></table>";

document.getElementById("content").appendChild(notification);

if(document.URL.match("http://apps.facebook.com/nebulous//systems.php"))
{
	var scrl = false;
	var table = nebs.getElementsByTagName("table")[1];
	var string = "";
	var supplement = "";
	var j = 0;
	for(var i = 0; i < table.rows.length; i++)
	{
		cell = table.rows[i].cells[0].getElementsByTagName("a");
		enemy = table.rows[i].cells[table.rows[i].cells.length-1];
		for(var j = 0; j < cell.length; j++)
			if(cell[j].innerHTML.match("http://nebulous.bajanet.co.uk/greyshield.gif") && !cell[j].innerHTML.match("http://nebulous.bajanet.co.uk/gear.gif"))
			{
				string += "<a style='border:#000088 solid 1px; display:inline-block; background-color:#DDFFDD; margin:2px; padding:2px' href='" + cell[j].href + "' >" + cell[0].text.split(" (")[0] + " " + cell[j].text + "</a>";
				if(!scrl)
				{
					var fileref=document.createElement('script') //these lines set up the scrolling display to attract user's attention!
					fileref.setAttribute("type","text/javascript")
					fileref.innerHTML="var nebs_scrl = ' Nebulous planets need spinning! ';\nnebs_scrlsts()\nfunction nebs_scrlsts()\n{\n\tnebs_scrl = nebs_scrl.substring(1, nebs_scrl.length) + nebs_scrl.substring(0, 1);\n\tdocument.title = nebs_scrl;\n\tsetTimeout('nebs_scrlsts()', 100);\n}";
					document.getElementsByTagName("head")[0].appendChild(fileref);
					scrl = true;	
				}
			}
		if(enemy.innerHTML.match("Enemy ships:"))
		{
			enemies = enemy.getElementsByTagName("a");
			var text = "<span style='vertical-align:middle; border:#000088 solid 1px; display:inline-block; background-color:#DDFFDD; margin:2px; padding:2px'><span style='color:#FF0044; text-decoration:underline'><a style='color:red' href='" + table.rows[i].cells[0].firstChild.href +"'>" + cell[0].text.split(" (")[0] + "</a></span>"
			var enemy_bool = false;
			for(j = 0; j < enemies.length; j++)
			{
				if(enemies[j].style.color=="rgb(255, 0, 0)")
				{
					text += "<br><a style='color=#008800' href='" + enemies[j].href + "'>" + enemies[j].text + "</a>";
					enemy_bool = true;
				}
			}
			if(enemy_bool)
				supplement += text + "</span>";
		}
	}
	if(supplement != "")
		notification.innerHTML += "<em>Enemies:</em>" + supplement;
	if(supplement != "" && string != "")
		notification.innerHTML += "<br><br>";
	if(string != "")
		notification.innerHTML += "<em>Ready to Build:</em>" + string;
	document.getElementById('nebs-refresh').checked = true;
}
else if(document.URL.match("http://apps.facebook.com/nebulous//planet.php"))
{
	cell1 = nebs.getElementsByTagName("table")[1].rows[0].cells[1];
	cell2 = nebs.getElementsByTagName("table")[1].rows[0].cells[2];
	lines = (cell1.innerHTML + cell2.innerHTML).split("<br>");
	size = (lines[3].split(" ")[1].replace(/,/gi, ""))*1;
	hab = (lines[9].split(" ")[1].replace(/,/gi, ""))*1;
	ind = (lines[10].split(" ")[1].replace(/,/gi, ""))*1;
	if(hab+ind != size)
	{
		habBuild = (size/2)-hab;
		indBuild = (size/2)-ind;
		tempHab = 0;
		tempInd = 0;
		options = document.getElementById("app12266764033_type").options
		for(var i = 0; i < options.length; i++)
		{
			if(options[i].text.match("Habitats"))
				tempHab = options[i].text.split("max: ")[1];
			if(options[i].text.match("Industry"))
				tempInd = options[i].text.split("max: ")[1];
			
		}
		if(tempHab < habBuild)
			habBuild = tempHab;
		if(tempInd < indBuild)
			indBuild = tempInd;
		notification.innerHTML += "<span style='color:#88FF88; background:#008800'>Build: <a style='color:#FFFF00' onclick='document.getElementById(\"nebs-input\").value=" + habBuild + ";document.getElementById(\"nebs-select\").value=\"hab\"'>" + habBuild + " habitats</a> and <a style='color:#FFFF00' onclick='document.getElementById(\"nebs-input\").value=" + indBuild + "; document.getElementById(\"nebs-select\").value=\"ind\"'>" + indBuild + " industry.</a></font><br>";
	}
	var inputs = nebs.getElementsByTagName("input")
	for(var i = 0; i < inputs.length; i++)
	{
		if(inputs[i].type == 'submit')
		{
			if(inputs[i].value=="Proceed")
			{
				var tempNode = inputs[i].parentNode;
				for(var j = 0; j < tempNode.childNodes.length; j++)
					if(tempNode.childNodes[j].tagName == "INPUT" && tempNode.childNodes[j].type == "text")
						tempNode.childNodes[j].id = "nebs-input";
					else if(tempNode.childNodes[j].tagName == "SELECT")
						tempNode.childNodes[j].id = "nebs-select";
				tempNode.innerHTML = tempNode.innerHTML.replace("Select new production order:&nbsp;&nbsp;","").replace("Enter the quantity to build: &nbsp;&nbsp;&nbsp;&nbsp;","").replace("(for spaceships please enter 1)","");
				notification.appendChild(tempNode);
			}
			else if(inputs[i].value=="Spin credits")
			{
				var tempNode = inputs[i].parentNode;
				tempNode.innerHTML = tempNode.innerHTML.replace(" (spinning a planet will produce the maximum possible number of credits without having to enter a value)","");
				notification.appendChild(tempNode);
			}
		}
	}
	if(nebs.innerHTML.match("You are currently building "))  //This is the timer function.
	{
		mins = nebs.innerHTML.match(/estimated for completion in about .* minutes/);
		mins += "";
		mins = mins.replace("estimated for completion in about ","").replace(" minutes","");
		if(mins.match("hours"))
			mins = mins.split(" hours ")[0]*60 + 1*mins.split(" hours ")[1];
		else
			mins = mins*1;
		seconds = mins*60;
		document.getElementById("nebs-links").innerHTML += "<span style='float:right' id='nebs_timeleft'>" + seconds + "</span>\n";
		var fileref=document.createElement('script')
		fileref.setAttribute("type","text/javascript")  //FUTURE UPDATE.  Better display to handle mutli-hour builds...
		fileref.innerHTML="function nebs_display_time(i)\n{\n\nhours = Math.floor(i/(60*60));\n\tmins = Math.floor((i-hours*60*60)/60);\n\tsecs = Math.floor((i-hours*60*60-mins*60));\n\tstring = \"\"\n\tif(hours > 0)\n\t\tstring = hours + \":\"\n\tif(mins < 10)\n\t\tstring += \"0\" + mins;\n\telse\n\t\tstring += mins;\n\tif(secs < 10)\n\t\tstring += \":0\" + secs;\n\telse\n\t\tstring += \":\" + secs;\n\treturn string;\n}\n\nfunction nebs_update_time()\n{\n\tvar nebs_d = new Date();\n\tdocument.getElementById(\"nebs_timeleft\").innerHTML = nebs_display_time((" + (time+(seconds*1000)) + "-nebs_d.getTime())/1000);\n\tif(" + (time+(seconds*1000)) + " - nebs_d.getTime() > 0)\n\t\tsetTimeout(\"nebs_update_time();\",1000);\n}\nsetTimeout(\"nebs_update_time();\",1000);\n";
		document.getElementsByTagName("head")[0].appendChild(fileref);
	}
	document.getElementById('nebs-refresh').checked = false;
}
else if(document.URL.match("http://apps.facebook.com/nebulous//shipdetail.php"))
{
	var mins = "";
	if(nebs.innerHTML.match(/Estimated to arrive in about .* minutes/))
	{
		mins = nebs.innerHTML.match(/Estimated to arrive in about .* minutes/);
		mins += "";
		mins = mins.replace("Estimated to arrive in about ","").replace(" minutes","");
		if(mins.match("hours"))
			mins = mins.split(" hours ")[0]*60 + 1*mins.split(" hours ")[1];
		else
			mins = mins*1;
		seconds = mins*60;
		document.getElementById("nebs-links").innerHTML += "<span style='float:right' id='nebs_timeleft'>" + seconds + "</span>\n";
		var fileref=document.createElement('script')
		fileref.setAttribute("type","text/javascript")  //FUTURE UPDATE.  Better display to handle mutli-hour builds...
		fileref.innerHTML="function nebs_display_time(i)\n{\n\nhours = Math.floor(i/(60*60));\n\tmins = Math.floor((i-hours*60*60)/60);\n\tsecs = Math.floor((i-hours*60*60-mins*60));\n\tstring = \"\"\n\tif(hours > 0)\n\t\tstring = hours + \":\"\n\tif(mins < 10)\n\t\tstring += \"0\" + mins;\n\telse\n\t\tstring += mins;\n\tif(secs < 10)\n\t\tstring += \":0\" + secs;\n\telse\n\t\tstring += \":\" + secs;\n\treturn string;\n}\n\nfunction nebs_update_time()\n{\n\tvar nebs_d = new Date();\n\tdocument.getElementById(\"nebs_timeleft\").innerHTML = nebs_display_time((" + (time+(seconds*1000)) + "-nebs_d.getTime())/1000);\n\tif(" + (time+(seconds*1000)) + " - nebs_d.getTime() > 0)\n\t\tsetTimeout(\"nebs_update_time();\",1000);\n}\nsetTimeout(\"nebs_update_time();\",1000);\n";
		document.getElementsByTagName("head")[0].appendChild(fileref);
	}
	//alert(mins);
}
else if(document.URL.match(/ships.php/) || document.URL.match(/shipdetail.php/) || document.URL.match("http://apps.facebook.com/nebulous//leaderboard.php") || document.URL.match("http://apps.facebook.com/nebulous//bank.php") || document.URL.match("http://apps.facebook.com/nebulous//messages.php") || document.URL.match("http://apps.facebook.com/nebulous//sector.php") || document.URL.match("http://apps.facebook.com/nebulous//systemdetail.php") || document.URL.match("http://apps.facebook.com/nebulous//galaxy.php") || document.URL.match("http://apps.facebook.com/nebulous//governor.php"))
{
	document.getElementById('nebs-refresh').checked = false;
}
