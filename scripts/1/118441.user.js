// ==UserScript==
// @name           GradeEntry
// @namespace      GradeEntry
// @include        http://apps.binusmaya.binus.ac.id/Services/lecturerMenu/EntryGrade.aspx*
// ==/UserScript==

String.prototype.trim=function(){return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');};

function createUI(){
	var panel = document.createElement("div");
	panel.setAttribute("style", "background:#fff; color:#000; font-size:12px; font-family:Verdana; border:2px solid #000; padding:5px; position:fixed; top:0px; left:0px; text-align:left;");
	document.body.appendChild(panel);
	
	panel.innerHTML = "<input type=\"button\" id=\"openPanel\" value=\"Open GradeEntry\" style=\"height:27px\" />"
		+ "<input type=\"button\" id=\"hidePanel\" value=\"Hide GradeEntry\" style=\"height:27px\"/>"
		+ "<div id=\"panelContent\">"
		+ "<hr>"
		+ "Score Type: <br>"
		+ "<select id=\"scoreType\">"
		+ "<option value=\"3\">TM</option>"
		+ "<option value=\"5\">Mid</option>"
		+ "<option value=\"7\">Final</option>"
		+ "<option value=\"9\">Praktikum</option>"
		+ "</select>"
		+ "<br><br>"
		+ "Score to be entried:<br>&lt;NIM&gt; &lt;Score&gt; (1 student per line)<br>"
		+ "<textarea cols=\"32\" rows=\"20\" id=\"scoreList\"></textarea><br>"
		+ "<input type=\"button\" id=\"entryScore\" value=\"Entry\" style=\"height:27px\"/>"
		+ "</div>";
		
	var btnOpen = document.getElementById("openPanel");
	var btnHide = document.getElementById("hidePanel");
	var btnEntry = document.getElementById("entryScore");
	var panelContent = document.getElementById("panelContent");
	
	btnHide.style.display = "none";
	panelContent.style.display = "none";
		
	btnOpen.addEventListener("click", function(){
		panelContent.style.display = "block";
		btnHide.style.display = "block";
		btnOpen.style.display = "none";
	}, true);
	
	btnHide.addEventListener("click", function(){
		panelContent.style.display = "none";
		btnOpen.style.display = "block";
		btnHide.style.display = "none";
	}, true);
	btnEntry.addEventListener("click", scoreEntry, true);
}

function scoreEntry(){
	var scoreList = document.getElementById("scoreList").value.split("\n");
	var scoreType = document.getElementById("scoreType");
	
	for(var i in scoreList){
		var line = scoreList[i];
		if(line.trim().length != 0)
			fillScore(line.substr(0,10).trim(), line.substring(10).trim(), scoreType.value)
	}
}

function fillScore(NIM, score, idx){
	var student = document.evaluate("//td[contains(text(),'"+NIM+"')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
	if(student!=null){
		var tdList = student.parentNode.getElementsByTagName("td");
		var scoreTD = tdList[idx];
		var scoreField = scoreTD.getElementsByTagName("input")[0];
		if(scoreField!=null && scoreField.disabled==false){
			scoreField.value = score;
		}
	}
}

createUI();