// ==UserScript==
// @name          AA Customised Open Parser
// @description   Autoupload every galaxy screen you see in any version of Starfleet Commander or Stardrift Empires!
// @include       *stardriftempires.com/galaxy*
// @include		  *stardriftempires.syfygames.com/galaxy*
// @include       *playstarfleet.com/galaxy*
// @include       *playstarfleetextreme.com/galaxy*
// @version       1.0.3.1
// ==/UserScript==
// Thanks to Lytjohan and Eljer for letting me base this off their userscripts and Rob for help in writing more compressed code!
// This Version made by Mad Max of Uni3 AA with Planet Tagging and ESP reports

var vPrefix='AA';

function InsertLegend() {
    var HTMLToAdd = '<div class="clear"></div><table id="ScriptCommands" class="compact"><tbody><tr class="title"><th colspan="3">Commands for the Galaxy Tool</th></tr>'
    + '<tr><td class="symbol">\u21E6</td><td>Left Arrow</td><td>Pressing the left arrow key will go down a system.</td>'
    + '<tr><td class="symbol">\u21E7</td><td>Up Arrow</td><td>Pressing the up arrow key will go up a galaxy.</td>'
    + '<tr><td class="symbol">\u21E8</td><td>Right Arrow</td><td>Pressing the right arrow key will go up a system.</td>'
    + '<tr><td class="symbol">\u21E9</td><td>Down Arrow</td><td>Pressing the down arrow key will go down a galaxy.</td>'
    + '<tr><td class="symbol">\u21B2</td><td>ENTER</td><td>pressing the ENTER key will refresh the page.</td>' 
    + '<tr><td class="symbol">#</td><td>Planet Number</td><td>Clicking the Planet Number will tag/untag the planet.</td> </tbody></table>';
    var Legend = document.getElementById('legend');
    if (Legend != null) {
        Legend.innerHTML = Legend.innerHTML + HTMLToAdd;

    }

	

  //<div class="system_time">
    //<table>
    //  <tbody><tr class="time">
    //    <td class="resource">Time</td>
    //    <td class="amount">03:14:49</td>
    //  </tr>
    //</tbody></table>
    //</div>
}

function createTagTable()
{
	console.log('starting create tag table');
	var count = 0;
	var name = new Array();
	for(var i in window.localStorage){
		val = localStorage.getItem(i); 
		
		//value = val.split(","); //splitting string inside array to get name
		//name[i] = = match(/(g\d*s\d*p\d*)/); // getting name from split string
		if (nullZero(i.match(/(g\d*s\d*p\d*)/)) != 0 )  
		{
			console.log('item found: ' + i);
			name[count] = i;
			count++;
		}
	}
	console.log('done creating tag table, now display' + name.length);
	var tagTable = "<div><strong>Tagged Planets</strong><br/>";
	for (i=1;i<name.length-1;i++) {
		
		tagTable += CreateTagLink(name[i],name[i]) + "<br/>";
	}
	tagTable += "</div>";
	console.log('tagTable: ' + tagTable);
	//<div class="galaxy"> <div class="controls">
	var theContent = document.getElementById('set_coordinates');
	
	tagTableDiv = document.createElement("div");
	tagTableDiv.setAttribute("id", "tagpop");
	tagTableDiv.setAttribute("style", "padding:10px;font-size:90%;font-family:tahoma;position:absolute;left:" + theContent.offsetLeft + "px;top:" + theContent.offsetTop + "px;background-color:black;border:1px solid #a5a5a5;");
	tagTableDiv.innerHTML = tagTable;
	
	document.body.appendChild(tagTableDiv);
	//document.body.addEventListener('click', removeResult, true);
	// move it to the left of the ?
	document.getElementById('tagpop').style.left = (theContent.offsetLeft) + "px";
	//return tagTable;
}

function InjectScript(Script) {
    var headID = document.getElementsByTagName("head")[0];
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.innerHTML = Script;
    headID.appendChild(newScript);
}

function nullZero(vItem) {
 var vReturn=(vItem==null) ? '0' : vItem;
 return vReturn; }

function CreateTagLink(PlanetInBracket,Planet) {
    //switch this to getting the ESP data
	//var c_data = getCookie(PlanetInBracket);
	//var vPlanetString=vPrefix+'.planet.'+PlanetInBracket;
	var c_data = nullZero(localStorage[PlanetInBracket]);
	//showResult
	//
	var defaultESP = "<div>no ESP Data</div>"
	
    var HTMLreturn = "";

    if (c_data == "" | c_data == "0") {
        //Display Tag link, no ESP data localStorage.setItem(vPrefix+'.planet.'+vCurrentPlanet+'.oprod',vOreProd);
        //HTMLreturn = '<a href="#" onClick="setCookie(&quot;'+PlanetInBracket+'&quot;,true,21)">'+Planet+'</a>';
		HTMLreturn = '<a href="javascript:void(0);" onClick=localStorage.' + PlanetInBracket+'="'+encodeURIComponent(defaultESP)+'";window.location.reload();>'+Planet+'</a>';
    } else {
        //display the Untag link and the ESP data
        //HTMLreturn = '<a href="#" onClick="setCookie(&quot;' + PlanetInBracket + '&quot;,false,21)">'+Planet+'</a>';
		HTMLreturn = '<a href="javascript:void(0);" onclick="showESP(&quot;'+PlanetInBracket+'&quot;,this,&quot;' + c_data + '&quot;)"><strong>'+Planet+'</strong></a>';
    }
    return HTMLreturn;

}

function emitStatusMessage(message, bGold) {
    var messageBox = document.createElement("div");
    messageBox.setAttribute('class', 'myStatusBox');
    messageBox.innerHTML = message;
    var nav = document.getElementById("sticky_notices");
    nav.parentNode.insertBefore(messageBox, nav.nextSibling);
}

function setHeaderVisablity() {
    var theHeader = document.getElementById('header');
    var vis = theHeader.style;
    var hideHeader = getCookie('hideHeader');
    if (hideHeader == "") {
        hideHeader = "block";
    }

    if (hideHeader == '' || hideHeader == 'block') {
        vis.display = "block";
    }
    else {
        vis.display = "none"
    }
}

function toggleHeader() {
    var theHeader = document.getElementById('header');
    var vis = theHeader.style;
    var hideHeader = getCookie('hideHeader'); 
    if (hideHeader == '' || hideHeader == 'block') {
        setCookie("hideHeader", "none", 1);
        vis.display = "none";
    }
    else {
        setCookie("hideHeader", "block", 1);
        vis.display = "block"
    }
}

function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
((expiredays == null) ? "" : ";expires=" + exdate.toUTCString());
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function KeyCheck(e) {
    
    //WHAT IS OUR CURRENT PLANET SO WE CAN GET BACK HERE
	var activate_p = document.URL.match(/activate_planet=([0-9]*)/);
	var current_p = document.URL.match(/current_planet=([0-9]*)/);
	
	if (activate_p) {
		var planet_id = activate_p[1];
	} else if (current_p) {
		var planet_id = current_p[1];
	} else {
		var planet_id = 0;
		}
    
    //var planet = window.location.search.substring(1).replace(/current_planet=/, "").replace(/&[^%]*/, "");
    
    var galaxy=document.getElementById('galaxy').getAttribute('value');
	var system=document.getElementById('solar_system').getAttribute('value');
    
    //var g = planet.getElementByClass('current_solar_system').innerHTML;
    //var regex_pattern1 = new RegExp("Solar System (\\d{1,2}):\\d{1,3}");
    //var galaxy = lookUp(g, regex_pattern1, 1);
    //var regex_pattern2 = new RegExp("Solar System \\d{1,2}:(\\d{1,3})");
    //var system = lookUp(g, regex_pattern2, 1);
    
    
    if (e.keyCode == 37) {
        var systemminus = parseInt(system, 10) - 1;
        system = systemminus;
        window.location.assign('/galaxy/show?current_planet=' + planet_id + '&galaxy=' + galaxy + '&solar_system=' + system);
        return;
    }

    if (e.keyCode == 38) {
        var galaxyplus = parseInt(galaxy, 10) + 1;
        galaxy = galaxyplus;
        window.location.assign('/galaxy/show?current_planet=' + planet_id + '&galaxy=' + galaxy + '&solar_system=' + system);
        return;
    }

    if (e.keyCode == 39) {
        var systemplus = parseInt(system, 10) + 1;
        system = systemplus;
        window.location.assign('/galaxy/show?current_planet=' + planet_id + '&galaxy=' + galaxy + '&solar_system=' + system);
        return;
    }

    if (e.keyCode == 40) {
        var galaxyminus = parseInt(galaxy, 10) - 1;
        galaxy = galaxyminus;
		window.location.assign('/galaxy/show?current_planet=' + planet_id + '&galaxy=' + galaxy + '&solar_system=' + system);
        return;
    }

    if (e.keyCode == 13) {
        window.location.assign('/galaxy/show?current_planet=' + planet_id + '&galaxy=' + galaxy + '&solar_system=' + system);
        return;
    }
}


function injectStyle(css) {
    var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}


(function(){

	//VERSION INFO
	var version = "1.0.2";
	
	//SET UPLOAD PATH BASED ON GAME!
	var servers = {
		"stardriftempires.com":"sde.openparser.com",
		"fb.stardriftempires.com":"sde.openparser.com",
		"ssl.fb.stardriftempires.com":"sde.openparser.com",
		"stardriftempires.syfygames.com":"sde.openparser.com",
		"kong.stardriftempires.com":"sde.openparser.com",
		"playstarfleet.com":"sfo.openparser.com",
		"fb.playstarfleet.com":"sfo.openparser.com",
		"ssl.fb.playstarfleet.com":"sfo.openparser.com",
		"uni2.playstarfleet.com":"uni2.openparser.com",
		"fb.uni2.playstarfleet.com":"uni2.openparser.com",
		"ssl.fb.uni2.playstarfleet.com":"uni2.openparser.com",
		"playstarfleetextreme.com":"x1.openparser.com",
		"fb.playstarfleetextreme.com":"x1.openparser.com",
		"ssl.fb.playstarfleetextreme.com":"x1.openparser.com",
		"uni2.playstarfleetextreme.com":"x2.openparser.com",
		"fb.uni2.playstarfleetextreme.com":"x2.openparser.com",
		"ssl.fb.uni2.playstarfleetextreme.com":"x2.openparser.com",
		"nova.playstarfleet.com":"nova.openparser.com",
		"fb.nova.playstarfleet.com":"nova.openparser.com",
		"ssl.fb.nova.playstarfleet.com":"nova.openparser.com",
		"tournament.playstarfleet.com":"tournament.openparser.com",
		"fb.tournament.playstarfleet.com":"tournament.openparser.com",
		"ssl.fb.tournament.playstarfleet.com":"tournament.openparser.com",
		"nova.stardriftempires.com":"sdenova.openparser.com",
		"fb.nova.stardriftempires.com":"sdenova.openparser.com",
		"ssl.fb.nova.stardriftempires.com":"sdenova.openparser.com",
		"conquest.playstarfleet.com":"conquest.openparser.com",
		"fb.conquest.playstarfleet.com":"conquest.openparser.com",
		"ssl.fb.conquest.playstarfleet.com":"conquest.openparser.com",
		"guns.playstarfleet.com":"guns.openparser.com",
		"fb.guns.playstarfleet.com":"guns.openparser.com",
		"ssl.fb.guns.playstarfleet.com":"guns.openparser.com",	
		"uni3.playstarfleet.com":"uni3.openparser.com",
		"fb.uni3.playstarfleet.com":"uni3.openparser.com",
		"ssl.fb.uni3.playstarfleet.com":"uni3.openparser.com",			
	};
	var domain = servers[window.location.hostname];
	if(!domain)return;
	var path_to_upload = "http://"+domain+"/listener.php";
	var search_path = "http://"+domain+"/search.php";
	var galaxy_search = "http://"+domain+"/galaxyfeedback.php";

	//SET COUNTERS FOR PARAMATERS PURPOSES AND STRING TO APPEND TO
	var y = "1";
	var string1="";
	var string2="";
	
	//SET TIME IN UNIX FORMAT
	var timedate = Math.round(+new Date()/1000);
	
	//WHAT IS OUR CURRENT PLANET SO WE CAN GET BACK HERE
	var activate_p = document.URL.match(/activate_planet=([0-9]*)/);
	var current_p = document.URL.match(/current_planet=([0-9]*)/);
	
	if (activate_p) {
		planet_id = activate_p[1];
	} else if (current_p) {
		planet_id = current_p[1];
	} else {
		planet_id = 0;
		}
	
	//SET GALAXY AND SYSTEM SO WE KNOW WHERE WE ARE
	var galaxy=document.getElementById('galaxy').getAttribute('value');
	var system=document.getElementById('solar_system').getAttribute('value');
	
	//SET THE TABLE ROWS WE'RE GOING TO TRANSVERSE
	var vTRs=document.getElementById('planets').getElementsByTagName('tr');
	
	//IS THIS OUR GALAXY?
	var ownsystem = document.querySelector(".own");
	if(ownsystem) {document.querySelector(".colonized_planets").innerHTML+=" - Open Parser: <span style='color: blue;'>NOT PARSED</span>.";}
	
    //InjectScript('function setCookie(c_name, value, expiredays) { var exdate = new Date(); exdate.setDate(exdate.getDate() + expiredays); document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString()); window.alert("Planet" +c_name+ " tagging has been toggled");window.location.reload();}');
    InjectScript('function setCookie(c_name, value, expiredays) { var exdate = new Date(); exdate.setDate(exdate.getDate() + expiredays); document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString()); window.location.reload();}');
    InjectScript('function setCookie_h(c_name, value, expiredays) { var exdate = new Date(); exdate.setDate(exdate.getDate() + expiredays); document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString());}');
    InjectScript('function getCookie(c_name) { if (document.cookie.length > 0) { c_start = document.cookie.indexOf(c_name + "="); if (c_start != -1) { c_start = c_start + c_name.length + 1; c_end = document.cookie.indexOf(";", c_start); if (c_end == -1) c_end = document.cookie.length; return unescape(document.cookie.substring(c_start, c_end)); } } return ""}');
    InjectScript('function toggleHeader() { var theHeader = document.getElementById("header"); var vis = theHeader.style; var hideHeader = getCookie("hideHeader"); if (hideHeader == "" || hideHeader == "block") { setCookie_h("hideHeader", "none", 1);vis.display = "none";}else{ setCookie_h("hideHeader", "block", 1);vis.display = "block"; }}');
    InjectScript('function showESP(p,el,str) { var v = findPos(el); v1 = v[0]; v2 = v[1]; \
		view = document.createElement("div"); \
		view.setAttribute("id", "intelpop"); \
		view.setAttribute("style", "padding:10px;font-size:90%;font-family:tahoma;position:absolute;left:" + v1 + "px;top:" + v2 + "px;background-color:black;border:1px solid #a5a5a5;"); \
		var Link = "%3Cbr%2F%3E%3Ca%20href%3D%22%23%22%20onClick%3DlocalStorage.removeItem\\(%22" + p + "%22\\)%3Bwindow.location.reload\\(\\)%3B%3Eremove%3C%2Fa%3E";\
		view.innerHTML = decodeURIComponent(str + Link); \
		document.body.appendChild(view); \
		document.body.addEventListener("click", removeResult, true); \
		document.getElementById("intelpop").style.left = (v1 - 10) + "px"; \
	    }');
    InsertLegend();
	createTagTable();
    
    document.addEventListener('keydown', KeyCheck, false);
    setHeaderVisablity();
	
    //<a disabled_title="You have no available fleets" href="#" id="select_fleet_link_colonize_5" onclick="disable_ajax_links();; new Ajax.Request('/fleet/assign?current_planet=300467&amp;distance=1065&amp;opts%5Bmission_type%5D=colonize&amp;parent_id=select_fleet_link_colonize_5&amp;target_url%5Baction%5D=colonize&amp;target_url%5Bcontroller%5D=colonize&amp;target_url%5Bid%5D=1409&amp;target_url%5Bslot%5D=5', {asynchronous:true, evalScripts:true}); return false;">colonize</a>
    emitStatusMessage('<H4> AA Customized Open Parser Tool by Max Max - click Legend for instructions - <a href="#" id="ShowHeaderBtn">Toggle</a></H4>');
    var showHeaderLink = document.getElementById('ShowHeaderBtn');
    showHeaderLink.addEventListener('click', function (e) {
        toggleHeader();
    }, false);

    var Planet_Target_css = "#content.galaxy .planets .planet.target td { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNUmK/OAAAACRSURBVGhD7djBDYAwDENRmKCLsTZ7IRiAi2VRqofEMZFiO5+WfYzj3FZ47kFWeLcVhnhSZZDJIsmR2SLJEY6UICFaoiVa72dCO2JH7Igd+dfNEbVQC7VQC7U++eEHv/ALv/ALv/CbkNB3JFGvUcuRhqpJT44k6jVqOdJQNenJkUS9Ri1HGqomPTmSqNeoXcaRC8hQVaT/P1qJAAAAAElFTkSuQmCC); }";
    injectStyle(Planet_Target_css);
    
    
	//LET'S LOOP THROUGH THE TABLE
	if(!ownsystem){
	for (i=1;i<vTRs.length;i++) {
	
		//IS THIS A PLAYER OR NPC?
		if (vTRs[i].querySelector(".player .not_attackable, .player .attackable") != null) {
			var vPlayer=vTRs[i].querySelector(".player .not_attackable, .player .attackable");
		} else {
			var vPlayer=vTRs[i].querySelector(".player");
		}
		
		//WAS THERE A PLAYER OR NPC IN THE SLOT? IF NO OR SELF, SKIP IT!
		if (vPlayer!=null) {
		if (vPlayer.innerHTML.replace(/^\s+|\s+$/g, "").length>0) { 
						
			//WHAT SLOT ARE WE IN?
			var slot=vTRs[i].getAttribute('id').substr(7);
            
            var isFav = nullZero(localStorage["g" + galaxy + "s" + system + "p" + slot]);
            if (isFav != 0) { vTRs[i].setAttribute("class", "planet target"); }
            
            //console.log('Getting Slot ' + slot);
            //console.log(vTRs[i].querySelector(".slot").innerHTML);
            
            vTRs[i].querySelector(".slot").innerHTML = CreateTagLink("g" + galaxy + "s" + system + "p" + slot, slot);
			
			//IS IT A HEPH?
			if (vTRs[i].querySelector(".name").getElementsByTagName('img')[0] != null) {
				slot+='h'; 
			}
						
			//WHAT IS THE PLANET NAME?
			if (vTRs[i].querySelector(".name .attackable, .name .not_attackable") !=null) {
				var planetNameEl = vTRs[i].querySelector(".name .attackable, .name .not_attackable");
				var planetName = planetNameEl.textContent.trim();
			} else {
				var planetNameEl = vTRs[i].querySelector(".name");
				var planetName = planetNameEl.textContent.trim();
			}	
					
			//WAS THERE ACTIVITY ON THE PLANET?
			var planetActivity = "";
			if (vTRs[i].querySelector(".activity")!=null) {
				planetActivity=vTRs[i].querySelector(".activity").innerHTML;
			}
			
			//WHAT IS THE PLAYER RANK?
			var rank='';
			if(vPlayer.getElementsByTagName('span').length>0) {
				var rank=vPlayer.getElementsByTagName('span')[vPlayer.getElementsByTagName('span').length-1].innerHTML.replace(/^\s+|\s+$/g, "").substr(1).replace(/,/g,'');  
			}
			
			//WHAT IS THE PLAYER NAME?
			if(vTRs[i].querySelector(".player .not_attackable, .player .attackable") !=null){
				var playername = vTRs[i].querySelector(".player .not_attackable, .player .attackable").getElementsByTagName("a")[1].textContent.trim().replace('\u200E','');
			} else {
				var playername = vTRs[i].querySelector(".player").innerHTML.replace(/<span[^>]*?>[\s\S]*?<\/span>/gi, '').replace(/<button[^>]*?>[\s\S]*?<\/button>/gi, '').trim();
			}
								
			//WHAT IS THE PLAYER STATUS?
			var statsymbol='';
			if(vTRs[i].querySelector(".status .symbols")!=null) {
				var statsymbol=vTRs[i].querySelector(".symbols").textContent.trim();
			}
			
			//IS THE PLAYER IN AN ALLIANCE? IF SO, WHICH ONE?
			var alliance='';
			if(vTRs[i].querySelector(".alliance .attackable, .alliance .not_attackable")!=null) {
				var alliance=vTRs[i].querySelector(".alliance .attackable, .alliance .not_attackable").textContent.trim();
			}
			
			//BUILD THE URL STRING AND SPLIT IF TOO LONG
			var temp = [slot, playername, statsymbol, alliance, rank, planetName, planetActivity];
			for(var j=0; j<temp.length; ++j){
				temp[j] = "v"+y+""+j+"="+encodeURIComponent(temp[j]);
			}
			
			temp = temp.join("&");
			string1 += "&" + temp;
			}
		} 
	
	//INCREASE VARIABLES FOR NEXT PARAMETERS
	y++;
	}
	
	//PREPARE STRING TO SEND!	
	var urlstring = "info=" + version + "&g=" + galaxy + "&s=" + system + "&t=" + timedate + string1.replace(/,undefined/,"");
	
	//LET'S SUBMIT THOSE STRINGS!	
	try {
        try {
            //LET'S TRY FOR FIREFOX FIRST!
            GM_xmlhttpRequest({
                method: 'POST',
                url: path_to_upload,
                headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
                data: urlstring,
                onload: function(response) {
                 if(response.status == 200) {
					document.querySelector(".colonized_planets").innerHTML+=" - Open Parser: <span style='color: rgb(10, 255, 10);'>PARSED</span>.";
					} else if (response.status == 405) {
						showAdvisory("http://"+domain+"/open_parser.user.js", "<br />Open Parser Update Required. Click here to update now.");
						document.querySelector(".colonized_planets").innerHTML+=" - Open Parser: <span style='color: red;'>NOT PARSED</span>.";
					} else if (response.status == 412) {
						document.querySelector(".colonized_planets").innerHTML+=" - Open Parser: <span style='color: blue;'>PARSED</span>.";
					}
                }
            });
        }
        catch (e) {
	//NOT FIREFOX? GOOD. LET'S TRY THE NORMAL WAY NOW.
		try {
			var req = new XMLHttpRequest();
			req.open('POST', path_to_upload, true);
			req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			req.onreadystatechange = function() {
				if(req.readyState == 4 && req.status == 200) {
					document.querySelector(".colonized_planets").innerHTML+=" - Open Parser: <span style='color: rgb(10, 255, 10);'>PARSED</span>.";
				} else if (req.readyState == 4 && req.status == 405) {
						showAdvisory("http://"+domain+"/open_parser.user.js", "<br />Open Parser Update Required. Click here to update now.");
						document.querySelector(".colonized_planets").innerHTML+=" - Open Parser: <span style='color: red;'>NOT PARSED</span>.";
				} else if (req.readyState == 4 && req.status == 412) {
						document.querySelector(".colonized_planets").innerHTML+=" - Open Parser: <span style='color: blue;'>PARSED</span>.";
				}
			}
			req.send(urlstring);
		} catch (e) {
			document.querySelector(".colonized_planets").innerHTML+=" - Open Parser: <span style='color: red;'>NOT PARSED</span>.";
		}
		} 
	} catch (e) {
        document.querySelector(".colonized_planets").innerHTML+=" - Open Parser: <span style='color: red;'>NOT PARSED</span>.";
    }
		
	//CREATE WARNING BOX IF UPDATE NEEDED
	function showAdvisory(url, title) {
		var el = document.getElementById("sticky_notices");
		var div = document.createElement("div");
		var span = document.createElement("span");
		var a = document.createElement("a");
		div.setAttribute("class", "notice");
		span.setAttribute("class", "notice_icon");
		div.appendChild(span);
		a.setAttribute("href", url);
		a.innerHTML = title;
		div.appendChild(a);
		el.appendChild(div);
	}
	
}	

	//INJECT SOME FORMATTING IN TO THE PAGE TO MAKE THE ? WORK!
	function injectscriptJs() {
		var d = document;
		var scr = d.createElement('script');
		scr.type = "text/javascript";
		scr.src = 'http://openparser.com/open_parser_server.js';
		d.getElementsByTagName('head')[0].appendChild(scr);
	}
	
	injectscriptJs()

	//PUT O! and ? IN GALAXY
	for (i=1;i<vTRs.length;i++) {
		if (vTRs[i].querySelector(".own .player .not_attackable") !=null) {
			var playername = vTRs[i].querySelector(".player .not_attackable").textContent.replace(/#[\d,]*/g, "").trim().replace('\u200E','');
			vTRs[i].querySelector(".player .not_attackable, .player .attackable").innerHTML += "<a href='" + search_path + "?cp=" + planet_id + "&search=p&exact=true&query=" + encodeURIComponent(playername).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A') + "' target='_blank'>O!</a>";
			vTRs[i].querySelector(".actions").innerHTML += "<a href='javascript:void(0);' onclick=setPos(this);getColString('" + galaxy_search + "?req=galsearch&g=" + galaxy + "&s=" + system + "&slot=" + slot + "&player=" + encodeURIComponent(playername).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A') + "&cp=" + planet_id + "');> ? </a>";
		} else if (vTRs[i].querySelector(".player .not_attackable, .player .attackable") != null) {
			var playername = vTRs[i].querySelector(".player .not_attackable, .player .attackable").getElementsByTagName("a")[1].textContent.trim().replace('\u200E','');
			vTRs[i].querySelector(".player .not_attackable, .player .attackable").innerHTML += "<a href='" + search_path + "?cp=" + planet_id + "&search=p&exact=true&query=" + encodeURIComponent(playername).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A') + "' target='_blank'>O!</a>";
			vTRs[i].querySelector(".actions").innerHTML += "<a href='javascript:void(0);' onclick=setPos(this);getColString('" + galaxy_search + "?req=playersearch&player=" + encodeURIComponent(playername).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A') + "&cp=" + planet_id + "');> ? </a>";
		} else if(vTRs[i].querySelector(".name") != null) {
			if (vTRs[i].querySelector(".name").textContent.trim() == "Unavailable") {
				slot = vTRs[i].querySelector(".slot").textContent.trim();
			vTRs[i].querySelector(".actions").innerHTML += "<a href='javascript:void(0);' onclick=setPos(this);getColString('" + galaxy_search + "?req=hephsearch&g=" + galaxy + "&s=" + system + "&slot=" + slot + "&cp=" + planet_id + "');> ? </a>";
			}
			}
	}	
	

})();

