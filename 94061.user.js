// ==UserScript==
// @name           GLB AI Package Transfer S13 Colors On Fix
// @namespace      GLB
// @include        http://test.goallineblitz.com/game/team_package.pl*
// ==/UserScript==

window.setTimeout( function() 
{
	main();
}, 100);

function main() {
	var addr = "http://test.goallineblitz.com/game/home.pl";
	getInetPage(addr, getTeams,null);
};

function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};

function getTeams(address, page) {
	var s = document.getElementById("storage:"+address);

	if (s != null) {
		s.parentNode.removeChild(s);
	}
	var footer = document.getElementById("footer");
	var div = document.createElement("div");
	div.setAttribute("id","storage:"+address);
	div.setAttribute("style","visibility: hidden; display:none;");
	div.innerHTML = page.responseText;
	footer.appendChild(div);
		
	var s = document.getElementById("storage:"+address);
	var l = getElementsByClassName("team_name_container", s);
	
	var elSelect = document.createElement("select");
	elSelect.setAttribute("id","teamName");

	for(var i=0; i<l.length; i++) {
		var elA = l[i].getElementsByTagName("a")[0];
		var elAhref = elA.getAttribute("href");
		var idNum = elAhref.split('team_id=')[1]
		
		var elOption = document.createElement("option");
		elOption.value = idNum;
		elOption.text = elA.innerHTML;

		elSelect.appendChild(elOption);

	}
	
	var newDiv = document.createElement("div");

	var headDiv = document.createElement("div");
	headDiv.setAttribute("class","small_head");
	headDiv.innerHTML = "<br>Transfer Package From:<br>";
	
	var elSelectPkg = document.createElement("select");
	elSelectPkg.setAttribute("id","package_tran");
	elSelectPkg.setAttribute("style","width: 200px");
	
	var elButton = document.createElement("input");
	elButton.setAttribute("id","edit_button");
	elButton.setAttribute("type","button");
	elButton.value = "Transfer Package";
	
	var elBlank = document.createElement("span");
	elBlank.innerHTML = "&nbsp;&nbsp&nbsp;";
	
	newDiv.appendChild(headDiv);
	newDiv.appendChild(elSelect);
	newDiv.appendChild(elSelectPkg);
	newDiv.appendChild(elBlank);
	newDiv.appendChild(elButton);
	
	var pkgName = document.getElementById("package_name");
	pkgName.parentNode.insertBefore(newDiv, pkgName.nextSibling);
	
	var currLoc = location.href;
	var OD = currLoc.search(/type=o/i);
	
	document.getElementById("teamName").addEventListener("change",
														 function() {
															 getPlays("http://test.goallineblitz.com/game/team_package.pl?team_id=" + this.value, OD);
														 }, false);
	
	document.getElementById("edit_button").addEventListener("click",
															function() {
																editPlays(OD);
																saveAs(null, OD);
															}, false);
	
	getPlays("http://test.goallineblitz.com/game/team_package.pl?team_id=" + elSelect.value, OD);

}

function getPlays(address, offDef) {
	GM_xmlhttpRequest({
	   method: 'GET',
	   url: address,
	   headers: {
		   'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		   'Accept': 'application/atom+xml,application/xml,text/xml',
	   },
	   onload: function(teams) {

			if(teams.responseText.indexOf("window.location.replace")!=-1) {
				var response1 = "";
			}
			else {
				var response1 = teams.responseText;
			}
			
			var s = document.getElementById("storage:"+address);
			
			if (s != null) {
				s.parentNode.removeChild(s);
			}
			var footer = document.getElementById("footer");
			var div = document.createElement("div");
			div.setAttribute("id","storage:"+address);
			div.setAttribute("style","visibility: hidden; display:none;");
			div.innerHTML = response1;
			footer.appendChild(div);
				
			var s = document.getElementById("storage:"+address);
			
			if(offDef==-1) { 
				var OD = "d"; 
				var c = s.getElementsByTagName("table")[1];
			}
			else {
				var OD = "o"; 
				var c = s.getElementsByTagName("table")[0];
			}
			
			var l = c.getElementsByTagName("tr");
			var elSelectPkg = document.getElementById("package_tran");
			var elOptions = getElementsByClassName("package_options",document);

			if(elOptions.length>0) {
				for(var i=elOptions.length-1; i>=0; i--) {
					elOptions[i].parentNode.removeChild(elOptions[i]);
				}
			}
			
			for(var i=1; i<l.length-1; i++) {
				var elA = l[i].getElementsByTagName("a")[0];
				var playID = elA.getAttribute("href").split('edit=')[1]
				
				var elOption = document.createElement("option");
				elOption.value = playID;
				elOption.text = elA.innerHTML;
				elOption.setAttribute("class","package_options");
				elSelectPkg.appendChild(elOption);
			}
		} 
	});
	
};

function editPlays(offDef) { 
	if(offDef==-1) { 
		var OD = "d"; 
	}
	else {
		var OD = "o"; 
	}
	var elSelect = document.getElementById("teamName");
	var elSelectPkg = document.getElementById("package_tran");
	var address = 'http://test.goallineblitz.com/game/team_package.pl?team_id=' + elSelect.value + '&type=' + OD + '&edit=' + elSelectPkg.value;

	GM_xmlhttpRequest({
	   method: 'GET',
	   url: address,
	   headers: {
		   'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		   'Accept': 'application/atom+xml,application/xml,text/xml',
	   },
	   onload: function(teams) {

			var s = document.getElementById("storage");
			
			if (s != null) {
				s.parentNode.removeChild(s);
			}
			var footer = document.getElementById("footer");
			var div = document.createElement("div");
			div.setAttribute("id","storage");
			div.setAttribute("style","visibility: hidden; display:none;");
			var response1 = teams.responseText.replace(/all_plays/gi,"all_plays2");
			var response1 = response1.replace(/package_name/i,"package_name2");
			div.innerHTML = response1;
			footer.appendChild(div);
			
			
			var s = document.getElementById("storage");
			var l = document.getElementById("all_plays2");

			var tempContain = document.getElementById("all_plays");
			var strPlays = l.innerHTML;
			var arrPlays = strPlays.split("<div class=\"package_play\" id=\"play_",10000);
			
			for(var i=1; i<arrPlays.length; i++) {
				var tempString = new RegExp(arrPlays[i].split("\"",1)[0],"gi");
				strPlays = strPlays.replace(tempString,"n" + (i-1));
			}
			
			tempContain.innerHTML = strPlays;
			document.getElementById("package_name").innerHTML=document.getElementById("package_name2").innerHTML;
			
			getPlayID(offDef);
	   }
	 });
	
	
}

function getInetPage(address, func, target) {
	
	var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
	req.onreadystatechange = function() {
		if (target != null) {
			var d = ["..","...","."];
			var str = target.innerHTML.split(" ");
			target.innerHTML = str[0]+" "+d[str[1].length-1];
    	}
	};
	req.onload = function() {
		if (this.status != 200) {
			alert("Error "+this.status+" loading "+address);
		}
		else {
			console.log("loaded: "+address)
			func(address,this);
		}
	};
	
	req.send(null); 
	return req;
};

function saveAs(target, offDef) {
	var temp = location.href.split("team_id=")[1];
	var teamID = temp.split("&")[0];
	
	if(offDef==-1) { var OD="d";}
	else { var OD="o"; }
	
	var address = "http://test.goallineblitz.com/game/team_package.pl?team_id=" + teamID + "&type=" + OD + "&create=1";
	
	var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
	req.onreadystatechange = function() {
		if (target != null) {
			var d = ["..","...","."];
			var str = target.innerHTML.split(" ");
			target.innerHTML = str[0]+" "+d[str[1].length-1];
    	}
	};
	req.onload = function() {
		if (this.status != 200) {
			alert("Error "+this.status+" loading "+address);
		}
		else {
			console.log("loaded: "+address)
		}
	};
	
	req.send(null); 
	return req;
};

function getPlayID(offDef) {
	var temp = location.href.split("team_id=")[1];
	var teamID = temp.split("&")[0];
	
	GM_xmlhttpRequest({
	   method: 'GET',
	   url: "http://test.goallineblitz.com/game/team_package.pl?team_id=" + teamID,
	   headers: {
		   'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		   'Accept': 'application/atom+xml,application/xml,text/xml',
	   },
	   onload: function(teams) {
		   var strTemp = teams.responseText;
		   
		   if(offDef==-1) {  
			   strTemp = strTemp.slice(strTemp.lastIndexOf("&edit=")+6,strTemp.lastIndexOf("&edit=")+16);
			   var playID = strTemp.split("\"")[0];
		   }
		   
		   else {
			   strTemp = strTemp.slice(1,strTemp.lastIndexOf("Defense Packages"));
		   	   strTemp = strTemp.slice(strTemp.lastIndexOf("&edit=")+6,strTemp.lastIndexOf("&edit=")+16);
			   var playID = strTemp.split("\"")[0];
		   }
		   
		   var elEdit = document.getElementsByName("edit")[0];
		   elEdit.value = playID;
	   }
					  });
}
