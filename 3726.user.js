// ==UserScript==
// @name	  IMDB Dai
// @author	  Jonathan Sadowski <jonathan@sadowski.us>
// @author	  Jacob Myers <jacob.myers.gfs@gmail.com>
// @namespace	  http://jonathan.st/scripts
// @description	  Integrates DAINEWS into IMDB
// @include       http://imdb.com/name/*
// @include	  http://*.imdb.com/name/*
// ==/UserScript==
// Version 1.5.42

var version = "1.5.42";
var firstName;
var lastName;

var IMDB_DAI = {

GetConfig: function(name, defaultvalue){
	return GM_getValue(name, defaultvalue);
},

SetConfig: function(name, value){
	GM_setValue(name, value);
},

VersionCheck: function() {
	var Today = new Date();
	if(GM_getValue("lastupdateask",Today+"") == "")
		GM_setValue("lastupdateask",Today+"");
	var Then = new Date(GM_getValue("lastupdateask", Today+""));
	if(Then <= Today) {
		GM_xmlhttpRequest({
		    method: 'GET',
		    url: 'http://jonathan.st/scripts/imdbdai.update?'+Today,
		    headers: {
		        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		    },
		    onload: function(responseDetails) {
		       //Checked today, won't check again for 24 hours
		       var expireDate = new Date();
		       expireDate.setDate(expireDate.getDate()+1);
		       GM_setValue("lastupdateask", expireDate+"");
		       
		       var rVersion = responseDetails.responseText.replace(/[\s\n\r]/g,"");
		       var rVersion2 = rVersion.split(".");
		       rVersion2 = rVersion2[0] * 1000000 + rVersion2[1] * 1000 + rVersion2[2] * 1;
		       var version2 = version.split(".");
		       version2 = version2[0] * 1000000 + version2[1] * 1000 + version2[2] * 1;
		       if(rVersion2 > version2 && responseDetails.status == 200) {
		         if(confirm("You are using an old version of this script.  It is important to upgrade in order to fix any possible bugs and to gain any new functionality.\nPress \"OK\" to upgrade.\nPress \"Cancel\" to be reminded again tomorrow.\n\nYour Version: " + version + "\nCurrent Version: " + rVersion)){
		            document.location="http://jonathan.st/scripts/imdbdai.update.html";
			 }
		       }
		    }
		});
	}
},

RemoveAds: function() {
	var tds = document.getElementsByTagName("td");
	for(var i = 0; i < tds.length; i++) {
		if(tds[i].width == "171" && tds[i].align == "right") {
			tds[i].style.display = "none";
		}
	}
	var iframes = document.getElementsByTagName("iframe");
	for(var i = 0; i < iframes.length; i++) {
		if(iframes[i].width == "468") {
			iframes[i].style.display = "none";
		}
		if(iframes[i].width == "410") {
			iframes[i].style.display = "none";
		}
	}
	var as = document.getElementsByTagName("a");
	for(var i = 0; i < as.length; i++) {
		if(as[i].href.indexOf("a9-banner") > -1) {
			as[i].parentNode.parentNode.parentNode.style.display = "none";
		}
	}
	var imgs = document.getElementsByTagName("img");
	for(var i = 0; i < imgs.length; i++) {
		if(imgs[i].src == "http://ia.imdb.com/media/imdb/01/I/47/22/48.jpg") {
			imgs[i].src = "http://jonathan.st/scripts/imdbdailogo.jpg";
		}
	}
	var page = document.createElement("div");
	page.innerHTML = "<p class=\"footer\" align=\"center\">IMDBDAI Userscript written by <a href='http://jonathan.st/scripts'>Jonathan Sadowski</a> and Jacob Myers</p>";
	document.getElementById("footer").appendChild(page);
},

GetMrSkinTab: function() {
	   //Tab disabled?
	   if(!GM_getValue("enablemrskin",true) && GM_getValue("defaulttab","all") != "mrskin")
		return unlink("dai_skin");
		
	   GM_xmlhttpRequest({
	       method: 'GET',
	       url: 'http://join.mrskin.com/track/MTQ4Njg6Mzox/Starfinder/?searchterm=' + firstName + '+' + lastName,
	       headers: {
	           'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	       },
	       onload: function(responseDetails) {
	       	   var show = "none";
	           //Is this the frame they normally want selected?
	           if(GM_getValue("defaulttab","all") == "mrskin"){
	   	        //Make it so
	   	        if(document.getElementById("dai_all_content")){
		        	var alllink = document.getElementById("dai_all");
		        	alllink.style.color = '#0000FF';
		        	alllink.style.backgroundColor = '#FFFFCC';
		   		document.getElementById("dai_all_content").style.display = 'none';
		        }
		        
			var googlelink = document.getElementById("dai_skin");
		        googlelink.style.color = '#000000';
		        googlelink.style.backgroundColor = '#FFFFFF';
	
		   	show = "block";
	           }	

		   var skintext = responseDetails.responseText;
		   var start = skintext.indexOf("<img id=biopic1 src=\"");
		   var skinimages = "";
		   if(start < 0 | responseDetails.status != 200){
		   	if(show == "none")
				return unlink("dai_skin");
			skinimages = "No data found!";
		   }else{
			   var end = skintext.indexOf(">", start);		   
			   if(start >= 0 && end >= 0) skinimages = "<a href='http://join.mrskin.com/track/MTQ4Njg6Mzox/Starfinder/?searchterm=" + firstName + "+" + lastName + "'>" + skintext.substring(start,end+1).replace("border=\"1","border=\"0") + "</a>";
			   start = skintext.indexOf("<img id=biopic2 src=\"");
			   end = skintext.indexOf(">", start);
			   if(start >= 0 && end >= 0) skinimages += "&nbsp;&nbsp;&nbsp;<a href='http://join.mrskin.com/track/MTQ4Njg6Mzox/Starfinder/?searchterm=" + firstName + "+" + lastName + "'>" + skintext.substring(start,end+1).replace("border=\"1","border=\"0") + "</a>";
			   start = skintext.indexOf("<div id=\"starBioContainer\">");
			   end = skintext.lastIndexOf("<br>");
			   if(start >= 0 && end >= 0) skinimages += "<br/>" + skintext.substring(start,end).replace(/http:\/\/www\.mrskin\.com\/join\/ccjoin\.html/g,'http://join.mrskin.com/track/MTQ4Njg6Mzox/Starfinder/?searchterm=' + firstName + '+' + lastName);		   
		  }
		  var page = document.createElement("div");
		  page.innerHTML = "<div id='dai_skin_content' style='display: "+show+"; height:200px; overflow: auto;'>" + skinimages + "</div>";
		  document.getElementById("daicontent").appendChild(page);
	       }
	   });
},

GetGoogleTab: function() {
	   //Tab disabled? (disabled AND not default)
	   if(!GM_getValue("enablegoogle",true) && GM_getValue("defaulttab","all") != "google")
		return unlink("dai_google");
		
	   GM_xmlhttpRequest({
	       method: 'GET',
	       url: 'http://images.google.com/pda?hl=en&lr=&safe=off&btnG=Search&site=images&num=20&nojs=1&q='+firstName+'%20'+lastName,
	       headers: {
	           'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	       },
	       onload: function(responseDetails) {
		   var show="none";	
	           //Is this the frame they normally want selected?
	           if(GM_getValue("defaulttab","all") == "google"){
	   	        //Make it so
	   	        if(document.getElementById("dai_all_content")){
		        	var alllink = document.getElementById("dai_all");
		        	alllink.style.color = '#0000FF';
		        	alllink.style.backgroundColor = '#FFFFCC';
		   		document.getElementById("dai_all_content").style.display = 'none';
		        }
		        
			var googlelink = document.getElementById("dai_google");
		        googlelink.style.color = '#000000';
		        googlelink.style.backgroundColor = '#FFFFFF';
	
		   	show = "block";
	           }	

		   var googleimages = "";
		   var googletext = responseDetails.responseText.replace(/<img src="\/images\?/g,"<img src=\"http:\/\/www.google.com/images?");
		   var results = googletext.match(/<a href="[^>]*?"><img src="[^>]*?".*?><\/a>/g);
		   
	           if(responseDetails.status != 200 || results == null || results.length < 1) {
	              if(show == "none")
	              	return unlink("dai_google");
	              googleimages = "No images found!";
	           }else{
		   	for(var i = 0; i < results.length; i ++){
				googleimages += '<div style="float: left; display: table; text-align: center; height: 175px; width: 175px;"><div style="display: table-cell; text-align: center; vertical-align: middle;">' + results[i] + '</div></div>';
			}
		   }
		   
		   var page = document.createElement("div");
		   page.innerHTML = "<div id='dai_google_content' style='display: "+show+"; height:200px; overflow: auto; text-align: center;'>" + googleimages + "</div>";
		   document.getElementById("daicontent").appendChild(page);
		}
	   });
}, 

GetAllTab: function(force) {
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://www.dainews.nu/DAINEWS/index.html?o_b=date_added&s_o=reverse&n_l=gt-4&r_l=gt-3&p_c=0&m_i=20&m_r=2&state=View_Alpha&f_n='+firstName+'&l_n='+lastName,
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	    },
	    onload: function(responseDetails) {
		var DAIstart, DAIend, DAItext;
		var show = "none";
		//Is this the frame they normally want selected?
		if(GM_getValue("defaulttab","all") == "all"){
		   	//Make it so
			var alllink = document.getElementById("dai_all");
			alllink.style.color = '#000000';
			alllink.style.backgroundColor = '#FFFFFF';
			
			show = "block";
		}	

	        if(responseDetails.responseText.indexOf("Whoops! Nothing to show") > -1 || responseDetails.status != 200) {
	           // Name Not Found or some sort of error occured... let's do nothing, shall we?
	           DAItext = "No images found!";

	        } else {
		   // Name Found
		   DAItext = responseDetails.responseText.replace(/up\.html/g,"http://www.dainews.nu/DAINEWS/up.html").replace(/good\//g, "http://www.dainews.nu/DAINEWS/good/");
		   DAIstart = DAItext.indexOf("<TABLE BORDER=0 CELLPADDING=2 WIDTH=100%>");
		   DAIend = DAItext.lastIndexOf("</TABLE>");
		   DAItext = DAItext.substring(DAIstart, DAIend+8);
		   DAItext = DAItext.replace(/#ffff00/gi,'#ff0000');
		   DAItext = DAItext;

		}
				
		//Nothing found and google is the default then we erase ourselves
		if(DAItext == "No images found!" && GM_getValue("defaulttab","all") == "google"){
			unlink("dai_all")
		}else{
			var page = document.createElement("div");
			page.innerHTML = "<div id='dai_all_content' style='display: "+show+";height:200px; overflow: auto'>" + DAItext + "</div>";
			document.getElementById("daicontent").appendChild(page);		
		}

		//Loading all tabs?
		if(!force)
			IMDB_DAI.GetNudeTab(false);	    
	    }
	});
},

GetNudeTab: function(force) {
	//Tab disabled? (disabled AND not default)
	if(!GM_getValue("enablenude",true) && GM_getValue("defaulttab","all") != "nude"){
		if(!force)
			IMDB_DAI.GetNonNudeTab(false);
			
		return unlink("dai_nude");
	}
		
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://www.dainews.nu/DAINEWS/index.html?n_lv=3&o_b=date_added&s_o=reverse&n_l=gt-4&r_l=gt-3&p_c=0&m_i=20&m_r=2&state=View_Alpha&f_n='+firstName+'&l_n='+lastName,
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	    },
	    onload: function(responseDetails) {
		var DAIstart, DAIend, DAItext;
	    	var show = "none";
		//Is this the frame they normally want selected?
		if(GM_getValue("defaulttab","all") == "nude"){
		   	//Make it so
		   	if(document.getElementById("dai_all_content")){
				var alllink = document.getElementById("dai_all");
				alllink.style.color = '#0000FF';
				alllink.style.backgroundColor = '#FFFFCC';
				document.getElementById("dai_all_content").style.display = 'none';
			}
		   	
			var nudelink = document.getElementById("dai_nude");
			nudelink.style.color = '#000000';
			nudelink.style.backgroundColor = '#FFFFFF';
			
			show = "block";
		    	DAItext = "No images found!";
		}	

	        if(responseDetails.responseText.indexOf("Whoops! Nothing to show") > -1 || responseDetails.status != 200) {
			//Bail unless we are supose to show something and have nothing
	           	if(!force){
				//bummer no nudes, disable links
				unlink("dai_nude");
				unlink("dai_nonnude");
				
				//unless google is default, go to all tab
				if(GM_getValue("defaulttab") != "google"){
					var alllink = document.getElementById("dai_all");
					alllink.style.color = '#000000';
					alllink.style.backgroundColor = '#FFFFFF';
					document.getElementById("dai_all_content").style.display='block';
				}
				
				return;
			}			
		}else{
		  	// Name Found
			DAItext = responseDetails.responseText.replace(/up\.html/g,"http://www.dainews.nu/DAINEWS/up.html").replace(/good\//g, "http://www.dainews.nu/DAINEWS/good/");
			DAIstart = DAItext.indexOf("<TABLE BORDER=0 CELLPADDING=2 WIDTH=100%>");
		   	DAIend = DAItext.lastIndexOf("</TABLE>");
		   	DAItext = DAItext.substring(DAIstart, DAIend+8);
		  	DAItext = DAItext.replace(/#ffff00/gi,'#ff0000');
			
			//Loading all tabs?
			if(!force)
				IMDB_DAI.GetNonNudeTab(false);
		}
		var page = document.createElement("div");
		page.innerHTML = "<div id='dai_nude_content' style='display: "+show+"; height:200px; overflow: auto'>" + DAItext + "</div>";
		document.getElementById("daicontent").appendChild(page);
	    }
	});
},

GetNonNudeTab: function(force) {
	//Tab disabled? (disabled AND not default)
	if(!GM_getValue("enablenonnude",true) && GM_getValue("defaulttab","all") != "nonnude")
		return unlink("dai_nonnude");
		
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.dainews.nu/DAINEWS/index.html?n_lv=2&o_b=date_added&s_o=reverse&n_l=gt-4&r_l=gt-3&p_c=0&m_i=20&m_r=2&state=View_Alpha&f_n='+firstName+'&l_n='+lastName,
		headers: {
		   'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		},
		onload: function(responseDetails) {
		   var DAIstart, DAIend, DAItext;
		   var show = "none";
		   
	      	   //Is this the frame they normally want selected?
		   if(GM_getValue("defaulttab","all") == "nonnude"){
	   	   	//Make it so
		   	if(document.getElementById("dai_all_content")){
			   	var alllink = document.getElementById("dai_all");
			   	alllink.style.color = '#0000FF';
			   	alllink.style.backgroundColor = '#FFFFCC';
			   	document.getElementById("dai_all_content").style.display = 'none';
		   	}
	   	
			var nonnudelink = document.getElementById("dai_nonnude");
			nonnudelink.style.color = '#000000';
			nonnudelink.style.backgroundColor = '#FFFFFF';
		   	
			show = "block";
	           }	
	           
		   if(responseDetails.responseText.indexOf("Whoops! Nothing to show") > -1 || responseDetails.status != 200) {
		   	//Bail unless we are supose to show something and have nothing
	           	if(!force){
				//oh well, no non-nudes... disable link
				unlink("dai_nonnude");
				unlink("dai_nude");
					
				//unless google is default, go to all tab
				if(GM_getValue("defaulttab") != "google"){
					var alllink = document.getElementById("dai_all");
					alllink.style.color = '#000000';
					alllink.style.backgroundColor = '#FFFFFF';
					document.getElementById("dai_all_content").style.display='block';
					document.getElementById("dai_nude_content").style.display='none';
				}
				
				return;
			}
			DAItext = "No images found!";
		   }else{
		      // Name Found
		      DAItext = responseDetails.responseText.replace(/up\.html/g,"http://www.dainews.nu/DAINEWS/up.html").replace(/good\//g, "http://www.dainews.nu/DAINEWS/good/");
		      DAIstart = DAItext.indexOf("<TABLE BORDER=0 CELLPADDING=2 WIDTH=100%>");
		      DAIend = DAItext.lastIndexOf("</TABLE>");
		      DAItext = DAItext.substring(DAIstart, DAIend+8);
		      DAItext = DAItext.replace(/#ffff00/gi,'#ff0000');	
		   }
		
		    var page = document.createElement("div");
		    page.innerHTML = "<div id='dai_nonnude_content' style='display: "+show+"; height:200px; overflow: auto'>" + DAItext + "</div>";
		    document.getElementById("daicontent").appendChild(page);
		}
	});
},

Show: function() {
	//Get relavent data
	var allElements, fullName, commaLoc;
	allElements = document.getElementsByTagName('input');
	for (var i = 0; i < allElements.length; i++) {
	    if(allElements[i].name=="primary") { fullName = allElements[i].value; }
	}
	
	commaLoc = fullName.indexOf(",%20");
	lastName = fullName.substring(0, commaLoc).replace(/%20/g, " ");
	firstName = fullName.substring(commaLoc + 4).replace(/%20/g, " ").replace(/ \(.*\)/,"");

	var mainDIV = document.createElement("div");
	mainDIV.innerHTML = "<div id='daicontainer' style='font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 10px; background-color: #FFFFCC; margin-right: 8px;'>" +
		"<h2 style='padding-left: 5px; color: #FFFFFF; font-size: 12px; margin-bottom: 0; background-color: #626FCD; -moz-border-radius: 0 10px 0 0;'>DAINEWS</h2>" +
		"<div style='padding: 5px; padding-right: 0;'>"+
		"<span id='dai_all_holder'><a style='font-weight: bold; color: #0000ff; text-decoration: none;' href='javascript: void(ChangeTab(0));' id='dai_all'>&nbsp;<u>All Images</u> </a>|</span>" +
		"<span id='dai_nude_holder'><a style='font-weight: bold; color: #0000ff; text-decoration: none;' href='javascript: void(ChangeTab(1));' id='dai_nude'> <u>Nude Images</u> </a>|</span>" +
		"<span id='dai_nonnude_holder'><a style='font-weight: bold; color: #0000ff; text-decoration: none;' href='javascript: void(ChangeTab(2));' id='dai_nonnude'> <u>Non-Nude Images</u> </a>|</span>" +
		"<span id='dai_google_holder'><a style='font-weight: bold; color: #0000ff; text-decoration: none;' href='javascript: void(ChangeTab(3));' id='dai_google'> <u>Google Images</u> </a>|</span>" +
		"<span id='dai_skin_holder'><a style='font-weight: bold; color: #0000ff; text-decoration: none;' href='javascript: void(ChangeTab(5));' id='dai_skin'> <u>Mr. Skin Images</u> </a>|</span>" +
		"<span id='dai_pref_holder'><a style='font-weight: bold; color: #0000ff; text-decoration: none;' href='javascript: void(ChangeTab(4));' id='dai_pref'> <u>Preferences</u> </a></span>"+
		"<br><div id='daicontent' style='height: 200px;'></div>" +
		'<b><a href="http://www.dainews.nu/DAINEWS/index.html?state=View_Alpha&f_n='+firstName+'&l_n='+lastName+'">More Images of '+firstName+' '+lastName+' on DAINEWS</a></b>' +
		"</div></div>";
	document.getElementsByTagName("h1")[0].nextSibling.appendChild(mainDIV);		
	
	var versionTest = IMDB_DAI.CreatePreference("versioncheck","Enable New Version Update Check","Disable New Version Update Check",true);
	var limitTabs = IMDB_DAI.CreatePreference("limittabs","Only Load Default Tab","Load All Tabs",false);
	var limitActresses = IMDB_DAI.CreatePreference("onlyactresses","Only Display For Actresses","Display For Actresses/Actors",true);
	var enablenudeTab = IMDB_DAI.CreatePreference("enablenude","Enabled","Disabled",true);
	var enablenonnudeTab = IMDB_DAI.CreatePreference("enablenonnude","Enabled","Disabled",true);
	var enablegoogleTab = IMDB_DAI.CreatePreference("enablegoogle","Enabled","Disabled",true);
	var enablemrskinTab = IMDB_DAI.CreatePreference("enablemrskin","Enabled","Disabled",true);

	var selected = GM_getValue("defaulttab","all");
	var all_selected = "";
	var nude_selected = "";
	var nonnude_selected = "";
	var google_selected = "";
	var mrskin_selected = "";
	if(selected == "all")
		all_selected = " selected";
	else if(selected == "nude")
	   	nude_selected = " selected";
	else if(selected == "nonnude")
	   	nonnude_selected = " selected";
	else if(selected == "google")
	   	google_selected = " selected";
	else if(selected == "mrskin")
		mrskin_selected = " selected";
	   
	DAItext = "<div id='dai_pref_content' style='display: none; height:200px; overflow: auto'>" +
	   	"Default starting tab: (Note that if no nude/non-nude exists then All Images will be selected instead)<br>" +
	   	"<form><select onchange='SetGMOption(\"defaulttab\",this.options[this.selectedIndex].value)'>" +
	   	"<option value='all'"+all_selected+">All Images</option>" +
	   	"<option value='nude'"+nude_selected+">Nude Images</option>" +
	   	"<option value='nonnude'"+nonnude_selected+">Non-Nude Images</option>" +
	   	"<option value='google'"+google_selected+">Google Images</option>" +
	   	"<option value='mrskin'"+mrskin_selected+">Mr. Skin Images</option>" +
		"</select></form>" +
		"Change mode to: " + versionTest + "<br><br>" +
		"Change mode to: " + limitTabs + " (While in 'Only Load Default Tab' mode nothing will display if that tab does not contain images.)<br><br>" +
		"Change mode to: " + limitActresses + " (While in 'Only Display For Actresses' mode the entire plugin will not show up on actor pages.)<br><br>" +
		"Change DAI Nude tab to: " + enablenudeTab + "<br><br>" +
		"Change DAI NonNude tag to: " + enablenonnudeTab + "<br><br>" +
		"Change Google tab to: " + enablegoogleTab + "<br><br>" +
		"Change Mr Skin tab to: " + enablemrskinTab + "<br><br>" +
		"</div>";
		
	var page = document.createElement("div");
	page.innerHTML = DAItext;
	document.getElementById("daicontent").appendChild(page);
},

CreatePreference: function(settingName,settingEnabledString,settingDisabledString,settingDefault){
	if(GM_getValue(settingName,settingDefault))
		return "<a id='"+settingName+"toggle' href='javascript: var moo = function(){" +
		   'ToggleGMOption("'+settingName+'",true);' +
		   'if(document.getElementById("'+settingName+'toggle").innerHTML == "'+settingEnabledString+'"){' +
		   'document.getElementById("'+settingName+'toggle").innerHTML = "'+settingDisabledString+'"' +
		   '}else{' +
		   'document.getElementById("'+settingName+'toggle").innerHTML = "'+settingEnabledString+'"}' +
		   "}; moo();'>"+settingDisabledString+"</a>";
	else
		return "<a id='"+settingName+"toggle' href='javascript: var moo = function(){" +
		   'ToggleGMOption("'+settingName+'",false);' +
		   'if(document.getElementById("'+settingName+'toggle").innerHTML == "'+settingEnabledString+'"){' +
		   'document.getElementById("'+settingName+'toggle").innerHTML = "'+settingDisabledString+'"' +
		   '}else{' +
		   'document.getElementById("'+settingName+'toggle").innerHTML = "'+settingEnabledString+'"}' +
		   "}; moo();'>"+settingEnabledString+"</a>";

}

};

if (typeof(unsafeWindow) == "undefined") { unsafeWindow = window; }

//Get a preference
unsafeWindow.GetGMOption = function(name, defaultvalue) {
	return IMDB_DAI.GetConfig(name, defaultvalue);
}
//Set a preference
unsafeWindow.SetGMOption = function(name, value) {
	IMDB_DAI.SetConfig(name, value);
}
//Toggle a preference
unsafeWindow.ToggleGMOption = function(name, defaultvalue) {
	IMDB_DAI.SetConfig(name,!IMDB_DAI.GetConfig(name,defaultvalue));
}
//Switch tabs
unsafeWindow.ChangeTab = function(index) {
	var link_settings = new Array(
		new Array("none","#FFFFCC","#0000FF"),
		new Array("none","#FFFFCC","#0000FF"),
		new Array("none","#FFFFCC","#0000FF"),
		new Array("none","#FFFFCC","#0000FF"),
		new Array("none","#FFFFCC","#0000FF"),
		new Array("none","#FFFFCC","#0000FF")
	);
	
	link_settings[index][0] = "block";
	link_settings[index][1] = "#FFFFFF";
	link_settings[index][2] = "#000000";
	
	if(document.getElementById("dai_all").style.color.toLowerCase() != "rgb(204, 204, 204)"){
		if(document.getElementById("dai_all_content"))
			document.getElementById("dai_all_content").style.display = link_settings[0][0];
		document.getElementById("dai_all").style.backgroundColor = link_settings[0][1];
		document.getElementById("dai_all").style.color = link_settings[0][2];
	}
	if(document.getElementById("dai_nude").style.color.toLowerCase() != "rgb(204, 204, 204)"){
		if(document.getElementById("dai_nude_content"))
			document.getElementById("dai_nude_content").style.display = link_settings[1][0];
		document.getElementById("dai_nude").style.backgroundColor = link_settings[1][1];
		document.getElementById("dai_nude").style.color = link_settings[1][2];
	}
	if(document.getElementById("dai_nonnude").style.color.toLowerCase() != "rgb(204, 204, 204)"){
		if(document.getElementById("dai_nonnude_content"))
			document.getElementById("dai_nonnude_content").style.display = link_settings[2][0];
		document.getElementById("dai_nonnude").style.backgroundColor = link_settings[2][1];
		document.getElementById("dai_nonnude").style.color = link_settings[2][2];
	}
	if(document.getElementById("dai_google").style.color.toLowerCase() != "rgb(204, 204, 204)"){
		if(document.getElementById("dai_google_content"))
			document.getElementById("dai_google_content").style.display = link_settings[3][0];
		document.getElementById("dai_google").style.backgroundColor = link_settings[3][1];
		document.getElementById("dai_google").style.color = link_settings[3][2];
	}
	if(document.getElementById("dai_skin").style.color.toLowerCase() != "rgb(204, 204, 204)"){
		if(document.getElementById("dai_skin_content"))
			document.getElementById("dai_skin_content").style.display = link_settings[5][0];
		document.getElementById("dai_skin").style.backgroundColor = link_settings[5][1];
		document.getElementById("dai_skin").style.color = link_settings[5][2];
	}
	if(document.getElementById("dai_pref").style.color.toLowerCase() != "rgb(204, 204, 204)"){
		if(document.getElementById("dai_pref_content"))
			document.getElementById("dai_pref_content").style.display = link_settings[4][0];
		document.getElementById("dai_pref").style.backgroundColor = link_settings[4][1];
		document.getElementById("dai_pref").style.color = link_settings[4][2];
	}
}

function unlink(target){
	var targetlink = document.getElementById(target);
	targetlink.removeAttribute("href");
	targetlink.style.color = '#CCCCCC';
	targetlink.style.fontWeight = 'normal';
	
	targetlink = document.getElementById(target+"_holder");
	targetlink.style.display = 'none';
}

//Make it all happen
function run(){
	//Show the main interface (includes preferences tab)
	IMDB_DAI.Show();
	
	//Do we only load the tab we want?
	if(GM_getValue("limittabs",false)){
		//show all?
		if(GM_getValue("defaulttab","all") == "all"){
			unlink("dai_nude");		
			unlink("dai_nonnude");		
			unlink("dai_google");
			unlink("dai_skin");		
			IMDB_DAI.GetAllTab(true);
		//show nude?
		}else if(GM_getValue("defaulttab","all") == "nude"){
			unlink("dai_all");
			unlink("dai_nonnude");		
			unlink("dai_google");
			unlink("dai_skin");		
			IMDB_DAI.GetNudeTab(true);
		//show nonnude?
		}else if(GM_getValue("defaulttab","all") == "nonnude"){
			unlink("dai_all");
			unlink("dai_nude");		
			unlink("dai_google");
			unlink("dai_skin");		
			IMDB_DAI.GetNonNudeTab(true);
		//show google?
		}else if(GM_getValue("defaulttab","all") == "google"){
			unlink("dai_all");
			unlink("dai_nude");		
			unlink("dai_nonnude");
			unlink("dai_skin");		
			IMDB_DAI.GetGoogleTab();
		}else if(GM_getValue("defaulttab","all")== "mrskin"){
			unlink("dai_all");
			unlink("dai_nude");		
			unlink("dai_nonnude");
			unlink("dai_google");		
			IMDB_DAI.GetMrSkinTab();
		}
	}else{
		//fetch all
		IMDB_DAI.GetAllTab(false);
		//if it loads it will call nude as well which will also call nonnude
		//if appropriate, otherwise it will stop
			
		//fetch google
		IMDB_DAI.GetGoogleTab();
		IMDB_DAI.GetMrSkinTab();
	}
}

//Removal of ads
IMDB_DAI.RemoveAds();

//Should we check version?
if(GM_getValue("versioncheck",true))
	IMDB_DAI.VersionCheck();

//Should we even be showing?
if(GM_getValue("onlyactresses",true)){
	var allAnchorElements = document.getElementsByTagName('a');
	for (var i = 0; i < allAnchorElements.length; i++) {
		if(allAnchorElements[i].href.toLowerCase().indexOf("#actress") > -1){
			run();
			break;
		}
	}
}else
	run();
