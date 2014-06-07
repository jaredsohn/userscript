// ==UserScript==

// @name           all_cz_emo

// @namespace      http://userscripts.org/users/93551

// @include        *:88/forums.php?*

// @include        *:88/markets.php?*

// @include        *:88/comment.php?*

// @include        *:69/forums.php?*

// @include        *:69/markets.php?*

// @include        *:69/comment.php?*

// ==/UserScript==

function checkPage(){
	var type = "";
	if(window.location.href.substring(25,37)=="comment.php?"){
	 type = "text";
	}else if(window.location.href.substring(25,36)=="forums.php?"){
	 type = "body";
	}
	toolb = document.getElementsByName(type)[0]
	
	//object not found, not right page
	if(toolb==null)return false;
	else return type;
}

function insertDiv(type){
	
	var button = document.createElement("div");
	button.setAttribute('align','center');
	button.setAttribute('style','background-color:black');
	button.innerHTML = "<b>TOGGLE EMOTION</b>";
	button.addEventListener("click", function(){
		var logo = document.getElementById('emodiv');
		if(logo.style.display == 'block')
			logo.style.display = 'none';
		else
			logo.style.display = 'block';

	}, true);
	
	var emodiv = document.createElement("div");
	emodiv.setAttribute('id','emodiv');	
	emodiv.setAttribute('align','center');		
	emodiv.setAttribute('style','height:250px;overflow:auto;');
	getAllEmo(emodiv, type);
	
	var textdiv = document.createElement("div");
	textdiv.setAttribute('id','textdiv');	
	textdiv.setAttribute('align','center');
	getText(textdiv, type);
		
	var toolb = document.getElementsByName(type)[0];
	var parent = toolb.parentNode;
	parent.insertBefore(button,toolb);
	parent.insertBefore(emodiv,toolb);
	parent.insertBefore(textdiv,toolb);
}

function getText(div, type){
	var temp = "";
	temp += "<img id='[img][/img]' onclick='document.getElementsByName(\""+type+"\")[0].value = document.getElementsByName(\""+type+"\")[0].value+\" \"+this.id;document.getElementsByName(\""+type+"\")[0].focus();' src='data:image/gif;base64,R0lGODlhEgARALMAAJAwL8%2FI%2F2BnAC8wL8%2F%2F%2F5BnAJCXz5DIz5DIL5DIAABnAACXAGCXAAAAAP%2F%2F%2F5DI%2FyH5BAAAAAAALAAAAAASABEAAAR20MlJq2zu6c37w164gc9RPszBGKapkQH6JAljxy6p0rySciATg5dQLDSxV0Y2o9mMrs%2BSwBAkHgtBlqEgKCU2ASOwCADIjAlmkgZkAdXKugIYWC4OhH6PGBT4exg2gwxwcIQ2GEaLC4yOCxiNko%2BODZaXmJmYEQA7'/>";
	temp += "<img id='[b][/b]' onclick='document.getElementsByName(\""+type+"\")[0].value = document.getElementsByName(\""+type+"\")[0].value+\" \"+this.id;document.getElementsByName(\""+type+"\")[0].focus();' src='data:image/gif;base64,R0lGODlhEgARAJEAAP%2F%2F%2FwAAAL%2B%2FvwAAACH5BAAAAAAALAAAAAASABEAAAI3hI9pAeIPo2CyPmornqH7EG0cOEKi56BXc3Wpu5ofHLekmrLvTU96CczZZqFfpnY0GZOzpjNQAAA7'/>";
	temp += "<img id='[i][/i]' onclick='document.getElementsByName(\""+type+"\")[0].value = document.getElementsByName(\""+type+"\")[0].value+\" \"+this.id;document.getElementsByName(\""+type+"\")[0].focus();' src='data:image/gif;base64,R0lGODlhEgARAJEAAH9%2Ff%2F%2F%2F%2FwAAAL%2B%2FvyH5BAAAAAAALAAAAAASABEAAAI0jI9pEuMP42CyPmorjqJ3uHECwDUS8JXaKIUOKmgmyLbzm9oiKV9eDrplLsLhpDj8KZe%2FAgA7'/>";
	temp += "<img id='[u][/u]' onclick='document.getElementsByName(\""+type+"\")[0].value = document.getElementsByName(\""+type+"\")[0].value+\" \"+this.id;document.getElementsByName(\""+type+"\")[0].focus();' src='data:image/gif;base64,R0lGODlhEgARAJEAAH9%2Ff%2F%2F%2F%2FwAAAL%2B%2FvyH5BAAAAAAALAAAAAASABEAAAI5jI9pEuMP42CyPmornqJzfzWXMEYbV0IniKqiw7Lw29azSsJ5iAMDIJvQPkFhRvPqKJeuo2QJjS4LADs%3D'/>";
	temp += "<img id='[color=blue][/color]' onclick='document.getElementsByName(\""+type+"\")[0].value = document.getElementsByName(\""+type+"\")[0].value+\" \"+this.id;document.getElementsByName(\""+type+"\")[0].focus();' src='data:image/gif;base64,R0lGODlhEgARAJEAAP%2F%2F%2FwAAAL%2B%2FvwAA%2FyH5BAAAAAAALAAAAAASABEAAAI9hI9pAeIPo2Az2Itto2H4D3rbFpbDOJkh2qkf674TGZ9zWsOrcrdgI%2BGUNpje0HFBNhSGR8AJlEgrmWq1AAA7'/>";
	temp += "<img id='[color=green][/color]' onclick='document.getElementsByName(\""+type+"\")[0].value = document.getElementsByName(\""+type+"\")[0].value+\" \"+this.id;document.getElementsByName(\""+type+"\")[0].focus();' src='data:image/gif;base64,R0lGODlhEgARAJEAAP%2F%2F%2FwAAAL%2B%2FvwDIACH5BAAAAAAALAAAAAASABEAAAI9hI9pAeIPo2Az2Itto2H4D3rbFpbDOJkh2qkf674TGZ9zWsOrcrdgI%2BGUNpje0HFBNhSGR8AJlEgrmWq1AAA7'/>";
	temp += "<img id='[color=red][/color]' onclick='document.getElementsByName(\""+type+"\")[0].value = document.getElementsByName(\""+type+"\")[0].value+\" \"+this.id;document.getElementsByName(\""+type+"\")[0].focus();' src='data:image/gif;base64,R0lGODlhEgARAJEAAP%2F%2F%2FwAAAL%2B%2Fv%2F8AACH5BAAAAAAALAAAAAASABEAAAI9hI9pAeIPo2Az2Itto2H4D3rbFpbDOJkh2qkf674TGZ9zWsOrcrdgI%2BGUNpje0HFBNhSGR8AJlEgrmWq1AAA7'/>";
	temp += "<img id='[color=magenta][/color]' onclick='document.getElementsByName(\""+type+"\")[0].value = document.getElementsByName(\""+type+"\")[0].value+\" \"+this.id;document.getElementsByName(\""+type+"\")[0].focus();' src='data:image/gif;base64,R0lGODlhEgARAJEAAP%2F%2F%2FwAAAL%2B%2Fv%2F8A%2FyH5BAAAAAAALAAAAAASABEAAAI9hI9pAeIPo2Az2Itto2H4D3rbFpbDOJkh2qkf674TGZ9zWsOrcrdgI%2BGUNpje0HFBNhSGR8AJlEgrmWq1AAA7'/>";
	
	div.innerHTML = temp;		
}

function getAllEmo(div, type){
	GM_xmlhttpRequest({
		method:"GET",
		url:"http://cz.podzone.org:88/smilies.php",
		headers:{
			"User-Agent":"monkeyagent",
			"Accept":"text/monkey,text/xml",
		},
		onload:function(result) {
			if (result.status != 200) {
				return;
			}
									
			var response = result.responseText			
			var doc = document.createElement("div");
			doc.innerHTML = response;
			var emoTable = doc.getElementsByClassName('main')[2];
			var trs = emoTable.getElementsByTagName('tr');
			var temp = ""
			for (var i in trs){
				if(i==0)continue;				
				var text = trs[i].getElementsByTagName('td')[0].innerHTML;
				var img = trs[i].getElementsByTagName('img')[0].src.substring(25);	
				
				temp+= "<img src='"+img+"' id='"+text+"' onclick='document.getElementsByName(\""+type+"\")[0].value = document.getElementsByName(\""+type+"\")[0].value+\" \"+this.id;document.getElementsByName(\""+type+"\")[0].focus();' /> ";
				if(i%20==0)
					temp+= "<br/>";
			}
			div.innerHTML = temp;
		}
	});	
}

var type = checkPage();
if(type){
	insertDiv(type);
}
