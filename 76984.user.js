// ==UserScript==
// @name           AddGT
// @namespace      .A.S.
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==
function QueryString(key)
{
    var value = null;
    for (var i=0;i<QueryString.keys.length;i++)
    {
        if (QueryString.keys[i]==key)
        {
            value = QueryString.values[i];
            break;
        }
    }
    return value;
}
QueryString.keys = new Array();
QueryString.values = new Array();
function QueryString_Parse()
{
    var query = window.location.search.substring(1);
    var pairs = query.split("&");

    for (var i=0;i<pairs.length;i++)
    {
        var pos = pairs[i].indexOf('=');
        if (pos >= 0)
        {
            var argname = pairs[i].substring(0,pos);
            var value = pairs[i].substring(pos+1);
            QueryString.keys[QueryString.keys.length] = argname;
            QueryString.values[QueryString.values.length] = value;
        }
    }

}
QueryString_Parse();
var session, page, menu;
session = QueryString("session");
page = QueryString("page");
function showUser(str)
{
	if (str=="") return;
	document.getElementById("searchBtn").disabled = true;
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: GM_getValue("url","")+'/secret/gsgt.php?id='+str,
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	    onload: function(responseDetails) {
	    	document.getElementById("searchBtn").disabled = false;
	        menu= document.getElementById('gsgt');
	        menu.appendChild(document.createElement("br"));
	        coord = responseDetails.responseText.split('@');
	        var title=document.createElement('span');
	        title.style.setProperty('color','white',null);
	        title.style.setProperty('font-weight','bold',null);
	        title.appendChild(document.createTextNode(str));
	        menu.appendChild(title);
	        menu.appendChild(document.createElement('br'));
	        
	        for (i=0; i<coord.length; i++){
		        if (coord[i].length > 0){
		        	coord[i] = coord[i].replace('[','');
		        	coord[i] = coord[i].replace(']','');
		        	newcoord=coord[i].split('$');
					var position = newcoord[0].split(":");
					link = document.createElement('a');
					if (GM_getValue("check","0") == "0")
						link.setAttribute('href', '#'); 
					else
						link.setAttribute('href', 

'http://fornax.ogame.com.es/game/index.php?page=galaxy&session='+session+'&galaxy='+position[0]+'&system='+position[1]+'&position='+position[2]); //+'&position=6'
					
					link.appendChild(document.createTextNode("["+newcoord[0]+"]")); 
					link.style.setProperty('font-weight','bold',null);
					link.style.setProperty('color','white',null);
					menu.appendChild(link);
					//if ((i%3)==0)
					//	menu.appendChild(document.createElement("br"));
						
				}
	        }
	 }      
	    
	});

	
}

function showSearch()
{
	menu.innerHTML = "";
	var allStars;
allStars = document.createElement("span");

allStars.style.setProperty('font-size','15px',null);
allStars.style.setProperty('font-align','center',null);
allStars.style.setProperty('font-weight','bold',null);
allStars.style.setProperty('color','white',null);
allStars.appendChild(document.createTextNode('All Stars Galaxy Tool'));
menu.appendChild(allStars);
menu.appendChild(document.createElement('br'));


var searchUser;
searchUser = document.createElement("input");
searchUser.style.setProperty('background-color','gray',null);
searchUser.style.setProperty('color','white',null);
searchUser.style.setProperty('font-weight','bold',null);
searchUser.style.setProperty('width','135px',null);
searchUser.setAttribute("id","searchUser");

var searchBtn = document.createElement('input')
searchBtn.type = 'button';
searchBtn.style.setProperty('margin-left','5px',null);
searchBtn.setAttribute("id","searchBtn");
searchBtn.height = 20;
searchBtn.width = 50;
searchBtn.value = "reciclar!";
searchBtn.addEventListener("click", function(e) {
		

		showUser(document.getElementById('searchUser').value);
		
		}, false);

configBtn = document.createElement('input')
configBtn.type = 'button';
configBtn.style.setProperty('margin-left','5px',null);
configBtn.setAttribute("id","configBtn");
configBtn.height = 20;
configBtn.width = 50;
configBtn.value = "config";
configBtn.addEventListener("click", function(e) {
	showUrl();
		}, false);


menu.appendChild(searchUser);
menu.appendChild(searchBtn);
menu.appendChild(configBtn);
menu.appendChild(document.createElement("br"));
}

function showUrl()
{
	menu.innerHTML = "";
	var allStars;
	allStars = document.createElement("span");

	allStars.style.setProperty('font-size','15px',null);
	allStars.style.setProperty('font-align','center',null);
	allStars.style.setProperty('font-weight','bold',null);
	allStars.style.setProperty('color','white',null);
	allStars.appendChild(document.createTextNode('Escribe la URL del GT:'));
	menu.appendChild(allStars);

	var searchUser;
	searchUser = document.createElement("input");
	searchUser.style.setProperty('background-color','gray',null);
	searchUser.style.setProperty('color','white',null);
	searchUser.style.setProperty('font-weight','bold',null);
	searchUser.style.setProperty('width','135px',null);
	searchUser.setAttribute("id","searchUser");
	searchUser.setAttribute("value",GM_getValue("url",""));

	var searchBtn = document.createElement('input')
	searchBtn.type = 'button';
	searchBtn.style.setProperty('margin-left','5px',null);
	searchBtn.setAttribute("id","searchBtn");
	searchBtn.height = 20;
	searchBtn.width = 50;
	searchBtn.value = "Guardar!";
	searchBtn.addEventListener("click", function(e) {
			GM_setValue("check","0")
			GM_setValue("url",document.getElementById("searchUser").value);
			if (document.getElementById("check").checked == true)
				GM_setValue("check","1")
			showSearch();
			}, false);

	var check = document.createElement('input');
	check.type = 'checkbox';
	check.checked = (GM_getValue("check","") == "1")?true:false;
	check.id="check";
	var s
	menu.appendChild(searchUser);
	menu.appendChild(searchBtn);
	
	var title=document.createElement('span');
	title.style.setProperty('color','white',null);
	title.style.setProperty('font-weight','bold',null);
	title.appendChild(document.createTextNode("Ilegal?"));
	menu.appendChild(document.createElement("br"));	
	menu.appendChild(check);
	menu.appendChild(title);
	menu.appendChild(document.createElement("br"));	
	//alert('no hay url')	
}

if (page=='overview')
{
	var menu = document.createElement('div');
	menu.setAttribute("id","gsgt");
	menu.style.setProperty('background-color','#0D1014',null);
	menu.style.setProperty('position','absolute',null);
	menu.style.setProperty('right','10px',null);
	menu.style.setProperty('top','30px',null);

	menu.style.setProperty('margin-top','10px',null);
	menu.style.setProperty('margin-right','0px',null);
	menu.style.setProperty('width','280px',null);
	menu.style.setProperty('heigth','auto',null);
	menu.style.setProperty('padding','5px',null);

	bar= document.getElementById("inhalt");
	bar.appendChild(menu);

	if (GM_getValue("url","") == ""){
		showUrl();
		return;
	}

showSearch();






}