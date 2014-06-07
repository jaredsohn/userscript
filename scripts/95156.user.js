// ==UserScript==
// @name           dAUltra
// @namespace      //
// @include        http://*.deviantart.com/*
// @description    Adds extra features to dA
// @author         Trezoid
// @version         1.5
// ==/UserScript==

/* Change log for 1.5
 * Bug fixes and stuff.
 */

var thumbSize = 280;
var preFill = "I would like to suggest %deviation% by %artist% for a DD because";
var currentPage = ""; 


/***********************
 * Update alert guff
 **********************/

function getVer()
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: "http://userscripts.org/scripts/show/95156",
		onload: function(response) {

		/*******************************/
		/* IMPORTANT: THIS DOESN'T WORK*/
		/* IN FF17 DUE TO POLICY GUFF  */
		/* Should work by FF17 stable  */
		/*******************************/
		
			var content = response.responseText;
			var latestVer = content != null  ?  content.split("Version:</b>")[1].split("</p>")[0].replace(/\n/g, "") : "1.5";
			if(parseFloat(latestVer) > parseFloat(GM_info.script.version))
			{
				updateAlert(latestVer);
			}
		}
	});
}


function updateAlert(latestVer)
{
	var alertBox = document.createElement("div");
	alertBox.className ="alertBox";
	alertBox.setAttribute("id", "alertBar");
	alertBox.innerHTML ='Your current version of dAUltra ('+ GM_info.script.version+') is out of date. The latest version ('+latestVer + ') is available <a href ="http://userscripts.org/scripts/show/95156"> here</a>, or click <a id="changeButton"> here instead</a> to find out what\'s new! (click <a id="lolPop">here</a> to close)';


	GM_addStyle(".alertBox{position:fixed; width:100%; top:0px; height: 20px; background:linear-gradient(#405147, #607465) #607465;background:-moz-linear-gradient(#405147, #607465) #607465; text-align:center; color:#fff;z-index:999;border-top:1px solid #304036; padding-top:3px;}"+
			".alertBox a{color: #D0DD20}")

		document.body.appendChild(alertBox);
	var popButton = document.getElementById("lolPop");
	popButton.addEventListener("click", function(){document.body.removeChild(alertBox)}, false);
	var changeButton = document.getElementById("changeButton");
	changeButton.addEventListener("click",
			function() {
			GM_xmlhttpRequest(
				{
method: 'GET',
url: " http://www.freewebs.com/trezoid/dAfiles/dAUltra/ultraChanges.txt",
onload: function(responseDetails) {
if(responseDetails.responseText != null)
{
var changeLog = responseDetails.responseText;
alert(changeLog);
} else {alert("Couldn't find changelog");}
}
});
			}, false);
} 


function settingsModal()
{
	var settingsBox = document.createElement("div");
	settingsBox.setAttribute("id", "settingsBox");
	var settingBlob = GM_getValue("dAUltra");
	var resize, thumbSize, groups, forms, tabs, Show, preflight, preFill;
	settingBlob = JSON.parse(settingBlob);
	if(settingBlob["resize"])
		resize = "checked";
	thumbSize = settingBlob["thumbSize"];
	if(settingBlob["group"])
		groups = "checked";
	if(settingBlob["format"])
		forms = "checked";
	if(settingBlob["tabs"])
		tabs = "checked";
	if(settingBlob["suggDD"])
		Show = "checked";
	if(settingBlob["preflight"])
		preflight = "checked";
	preFill = settingBlob["prefill"];

	settingsBox.innerHTML ='<div id="settingsHead">dAUltra Settings</div><div id="settingsBody">'
		+'<div id ="leftPane" class="sidePane"><div class="thumbSets"><h3>thumbs</h3><label class="properLabel">resize thumbs</label><input type="checkbox" name="showthumbs" id="showthumbs" '+resize+'="'+resize+'"/><br/> <label Class="properLabel">thumb size</label><br/><label class="miniLabel">the standard size is 150px</label><br/><input type="textarea" name="thumbSize" id="thumbsize" value ="'+thumbSize+'" maxlength="4" size="4"/>px</div><div class="groupLinks"><h3>Group links</h3><label class="properLabel">Show group links</label><input type="checkbox" name="showGroup" id="showGroup" '+groups+'="'+groups+'"/></div><div class ="formattingButtons"><h3>Formatting buttons</h3><label class="properLabel">show formatting buttons</label><input type="checkbox" name="showFormatting" id="showFormatting" '+forms+'="'+forms+'"/></div></div><div id="rightPane" class="sidePane"><div id="suggDD"><h3>Suggest DD\'s</h3><label class="properLabel">Show DD tab</label><input type="checkbox" name ="tabs" id ="tabs" '+tabs+'="'+tabs+'"/><br/><label class="properLabel">Show suggest DD\'s</label><input type="checkbox" name="showDD" id="showDD" '+Show+'="'+Show+'"/><br/><label class="properLabel">Prefill suggestion</label><input type="checkbox" name="preFill" id="preFill" '+preflight+'="'+preflight+'"/><br/><label class="properLabel">Prefill content</label><br/><label class="miniLabel">%deviation% by %artist% becomes <a>deviation</a> by ~artist</label><br/><div id="preFlight"><textarea id="preFillContent">'+preFill+'</textarea></div></div></div><div class="settingsFeet"><a class="smbutton smbutton-blue" href="#" id="saveSettings"><span>save</span><a><a class="smbutton smbutton-pale" href="#" id="close"><span>cancel</span><a><a id="promoLink" href="#"class="smbutton smbutton-pale"><span>about</span></a></div></div></div>';

	GM_addStyle("#settingsBox{position:fixed!important; top:100px; left:0; right:0; margin-left:auto; margin-right:auto;width:600px; height:400px; background: #d2dfd1; -moz-box-shadow:10px 10px 10px #000;z-index:1000; -moz-border-radius:10px!important;font-family:'helvetica neue', helvetica, verdana, san-serif;}"+
			".sidePane{height:500px; bottom:0; position:relative; float:left;width:250px;padding-left:50px;padding-top:15px;}" +
			"#preFillContent{height:100px;}" +
			"#preFlight{width:200px!important;height:101px;}"+
			"#preFlight .ultraButtonBox{display:none!important;}"+
			"#settingsHead{width:100%; height:85px;padding-top:6px; text-align:center; background:-moz-linear-gradient(#405147, #607465); background: -webkit-linear-gradient(#405147, #607465); border-bottom:1px solid #82a180; -moz-box-shadow:0px 1px 4px #3C4F41;font-size:60px; color:#fff; text-shadow:0px -1px 0px #3C4F41;-moz-border-radius-topleft:10px;-moz-border-radius-topright:10px;}"+
			".properLabel, #settingsHead input{margin-top:15px;}"+
			"#suggDD textarea{padding:4px!important;}"+
			"#settingsBox h3{color:#fff; text-shadow:0px -1px 0px #83a181; font-size:20px; padding-top:10px;}"+
			".settingsFeet{position:absolute; bottom:10px; width:100%; text-align:center; z-index:1001;}"+
			".settingsFeet a{margin-left:20px;}"+
			"#promoLink{position:absolute; right:10px; bottom:0px;}"+
			".miniLabel{color:#999; font-size:75%;}"+
			".miniLabel a{color:#444; text-decoration:underline;}");

	document.body.appendChild(settingsBox);

	document.getElementById("saveSettings").addEventListener('click', function(){saveSettings()}, false);
	
	document.getElementById("close").addEventListener('click', function(){document.body.removeChild(settingsBox)}, false);
	
	document.getElementById("promoLink").addEventListener('click', function(){aboutBox()}, false);
}       

function saveSettings()
{
	var resize = document.getElementById("showthumbs");
	var thumbly = document.getElementById("thumbsize");
	var group = document.getElementById("showGroup");
	var format = document.getElementById("showFormatting");
	var tabby = document.getElementById("tabs");
	var suggDD = document.getElementById("showDD");
	var doPrefill = document.getElementById("preFill");
	var preFill = document.getElementById("preFillContent");
	var settings = { 
		"resize" : resize.checked,
		"thumbSize" : thumbly.value,
		"group" : group.checked,
		"format" : format.checked,
		"tabs" : tabby.checked,
		"suggDD" : suggDD.checked,
		"preflight" : doPrefill.checked,
		"prefill" : preFill.value
	}

	GM_setValue("dAUltra", JSON.stringify(settings));
	document.body.removeChild(document.getElementById("settingsBox"));
	window.location.reload(true);
}

function initSettings()
{
	var settingsLink = document.createElement("a");
	settingsLink.className = "mi";
	settingsLink.setAttribute("href", "#");
	settingsLink.setAttribute("id", "settingsLink");
	settingsLink.innerHTML='<i class="i8"></i> dAUltra settings';

	var barLink = null;
	var menu = null;
	var tooManyDivs = document.querySelectorAll(".oh-menu");
	menu = tooManyDivs[1];

	menu.appendChild(settingsLink);

	settingsLink.addEventListener("click", function(){settingsModal()}, false);
}
function aboutBox()
{
	var about = document.createElement("div");
	about.setAttribute("id", "aboutBox");
	about.innerHTML = '<a class="x x-mac" id ="aboutClose" href="#">x</a><a href="http://trezoid.deviantart.com/art/dAUltra-197384035">dAUltra</a> is a userscript created by <a href="http://trezoid.deviantart.com">Trezoid</a>.<br/> If you find that something is broken, or want to suggest something, just let him know.<br/><br/>many thanks go to <a href="http://electricnet.deviantart.com">Electricnet</a> for general awesomeness and implimentation advice, and <a href="http://namenotrequired.deviantart.com">namenotrequired</a> for the huge list of bug reports and feature suggestions.'

		GM_addStyle("#aboutBox{width:300px; height:200px;background: #d2dfd1; -moz-box-shadow:10px 10px 10px #000;z-index:1000; -moz-border-radius:10px!important;font-family:'helvetica neue', helvetica, verdana, san-serif;padding:20px; position:fixed; left:0; right:0; margin-left:auto; margin-right:auto; top:150px;font-size:16px;z-index:1001;}"+
				"#aboutClose{position:absolute; top:10px; right:10px;}");

	document.body.appendChild(about);
	var closeButton = document.getElementById("aboutClose");
	closeButton.addEventListener('click', function(){ document.body.removeChild(about);}, false);
}  

function getImages()
{	
	if(!document.getElementById("overrider"))
	{

		var marginWidth = (parseInt(thumbSize)-150)/2;
		var aspectRatio = 2;
		for(var i = 0;i<document.images.length;i++)
		{
			var src = document.images[i].src;
			if(src.indexOf("fc0") == -1)
			{
				if(document.images[i].height ==150 || document.images[i].width ==150 )
				{
					if(document.images[i].parentNode.className != "thumb antisocial" && document.images[i].src.indexOf ("poetry.jpg") == -1 && document.images[i].parentNode.parentNode.parentNode.parentNode.parentNode.className != "stream a-stream" && document.images[i].parentNode.className != "thumb lit")
					{
						if ((document.images[i].width *2)>thumbSize)
						{
							aspectRatio = (thumbSize/document.images[i].width);
						} 
						else{aspectRatio = thumbSize/150;}
						document.images[i].height = document.images[i].height * aspectRatio
							document.images[i].width = document.images[i].width * aspectRatio;
						var src = document.images[i].src;
						var splitImage = src.split("/150/");

						var replaceImage =  splitImage[0] +"/" + splitImage[1];
						document.images[i].src = replaceImage;	
						if(document.images[i].parentNode.parentNode.parentNode.className == "tt-w")
						{
							document.images[i].parentNode.parentNode.parentNode.parentNode.setAttribute("style", 'width:'+document.images[i].width+'px!important');
							document.images[i].parentNode.parentNode.parentNode.setAttribute("style", 'width:'+document.images[i].width+'px!important');
						}
						if(document.images[i].parentNode.parentNode.parentNode.childNodes[0].className =="gm-chaos gmbuttons")
						{
							document.images[i].parentNode.parentNode.parentNode.childNodes[0].setAttribute("style", "margin: 8px auto 0pt "+document.images[i].width+"px; position: absolute;");
						}
					}
				}
		}

		}
	}
	GM_addStyle( ".tt-a{width:150px;left:0!important;margin-right:10px!important;}"+
			".journal-wrapper{width:auto!important;}"+
			".huge{margin-left:0!important;}"+
			".tt-w{margin:0!important left:0!important;width:150px!important;}"+
			"a.lit{margin-left:0px!important; margin-right:0px!important;}"+
			".a-stream * a.lit{margin:0!important;margin-left:0px!important;}"+
			".c .tt-a, .mild{margin-left:auto!important; margin-right:auto!important;}"+
			".antisocial{margin-left:auto!important; margin-right:auto!important;}"+
			"#gmi-ResourceTV * a.thumb{margin-left:5px!important;}"+
			"#gmi-ResourceTV, #gmi-EditableResourceTV{margin-left:-"+(marginWidth+5)+"px!important;}"+
			"#browse2-stream .tt-a{width:"+thumbSize+"px!important;}"+
			".col-thumbs{margin-left:-20px!important;}"

		   );
}

function addDDtab()
{ 
	if(document.getElementById("group") == null)
	{
		var tab = document.createElement('td')
			tab.id = "ddTab";
		tab.className = "f";
		tab.style.paddingTop = "20px";


		if(document.location.pathname.indexOf('dds') != -1)
		{
			tab.innerHTML = '<a class="gtab gtabi-mc" href="/dds/" ><i class="icon i29"></i><i class="gtab-i gtabi-mc"></i>DD\'s</a>';
		} else{
			tab.innerHTML = '<a class="gtab" href="/dds/" ><i class="icon i29"></i>DD\'s</a>';
		}
		tab.class="f";
		var tables = document.querySelectorAll(".iconset-gruser.f");
		var  tabBox = tables[0]
			if(tabBox.firstChild.firstChild != null)
			{
				tabBox.firstChild.firstChild.appendChild(tab);
			}
	}
}


function groupLog()
{
	var deviant = document.querySelectorAll("#oh-menu-deviant .oh-menu")[0];
	var groups = deviant.querySelectorAll(".mi.iconset-messages");
	for(var i = 0; i < groups.length; i++)
	{
		if(groups[i].className == "mi iconset-messages")
		{
			var groupURL = groups[i].innerHTML.split("</i>")[1].split("#")[1];
			var groupBack = "http://"+groupURL+".deviantart.com/messages/?log_type=1";
			var groupRoom = document.createElement("a");
			groupRoom.className = 'mi iconset-messages a';
			groupRoom.setAttribute('href', groupBack);
			var innerLink = '<i class="i2"></i> #'+groupURL+' message log';
			groupRoom.innerHTML = innerLink;
			groups[i].parentNode.insertBefore(groupRoom, groups[i].nextSibling);
		}
	}

}


/********************

Not working in FF17 until it hits stable. Greasemonkey bug, not my code.

  *******************/


function suggestDD()
{
	var devLoc = window.location.href.split("-");
	var suggDDButt = document.createElement("div") 
		suggDDButt.innerHTML = '<a id ="suggDDButt" class = "smbutton smbutton-green suggDDButt" onclick="return DWait.readyLink([\'jms/pages/blogobox.js\', \'cssms/pages/deviation/note-modal.css\'], this, \'Blogobox.noteModal('+devLoc[devLoc.length - 1].split("#")[0]+')\')" href="#"><img width="24" height="24" border="0" alt="Suggest For DD" src="http://www.freewebs.com/trezoid/dAfiles/dAUltra/plusHeart.png"> <b> Suggest For DD</b></a>'

	var box = document.querySelectorAll(".iconset-art.icons.vicons.devlinkzone");
	console.log(box[0].innerHTML);
	if(box != null)
	{
		box[0].appendChild(suggDDButt);
		suggDDButt.addEventListener('click',timedCall, false);
		notDD();
	} 
}

function notDD()
{
	var but = document.getElementById("suggDDButt");
	var name = document.location.hostname;
	name = name.split(".deviantart")
		name = name[0];
	console.log(name);
	var DDTab = 'http://'+name+'.deviantart.com/dds/';
/*
	GM_xmlhttpRequest({
		method: 'GET',
		url: DDTab,
		onload: function(responseDetails) {
			var grabDate = responseDetails.responseText.split("ppp")[1].split("stream")[1];
			lastDD(grabDate);
		}
	});*/

	lastDD("000000000");
}

function lastDD(grabDate)
{

	var currentTime = new Date()

		var lastDD = grabDate.split('<a class="u" href="');
	if(lastDD[1] != null)
	{
		var date = lastDD[1].split(" on ")[1].split("</small>")[0];
		var when = date[0].split('/');              
		var day = parseInt(when[1]);
		var month = parseInt(when[0]);
		var year = parseInt(when[2]);
		year = year+2000;
		var currentDay = currentTime.getDate();
		var currentMonth = (currentTime.getMonth() + 1);
		var currentYear = currentTime.getFullYear();
		if(currentMonth >= month)
		{
			var monthGap = currentMonth - month;
		}
		else{
			var monthGap = (12 - month) + parseInt(currentMonth);
		}      
		var totalLeft = (monthGap * 30) + (day - currentDay);
		if (totalLeft > 180)
		{
			totalLeft = 0;
		}
		var timePassed = 180 - totalLeft;
		if((currentYear - year) <2)
		{
			if(totalLeft  >0)
			{ 

				var suggButt = document.getElementById("suggDDButt");
				suggButt.className = "smbutton smbutton-red suggDDButt";
				suggButt.addEventListener('click',function(){ohNoesAlert(timePassed)}, false);
			}
		}
	}

}

function ohNoesAlert(timePassed)
{
	alert("This person has already got a DD in the last 6 months. They will not be able to get one for another " + timePassed +" day(s)")
}

function timedCall()
{
	setTimeout(replaceButtons, 500)
}

function replaceButtons()
{
	var currentText = document.createElement("input");
	var allIns = document.getElementsByTagName("input");
	for(var i = 0; i<allIns.length;i++)
	{
		if (allIns[i].className == "itext")
		{
			currentText = allIns[i]
		}
	}
	currentText.value = "loading CV list";
	currentText.setAttribute("readonly", "readonly");
	currentText.setAttribute("id", "manualEnter");
	manualSwap();
	var manualEnter = document.createElement("a")
		manualEnter.setAttribute("id", "toggleEdit");

	manualEnter.className="smbutton smbutton-pale";
	manualEnter.setAttribute("href", "#");
	manualEnter.innerHTML ='<span>enter CV</span>'

		var currentBox = document.getElementById("manualEnter").parentNode;
	var drops = document.getElementById("manualEnter");
	currentBox.insertBefore(manualEnter, drops.nextSibling);

	manualEnter.addEventListener('click', manualSwap, false);
	//getStaff();
	var suggSend = document.createElement("div");
	suggSend.style.display="inline-block";
	suggSend.innerHTML = '<input type="button" style="width: 10ex; font-size: 10pt; " onclick="" value="Send" class="isend" tabindex="303">';
	suggSend.addEventListener('click', filldetails, false);

	var stayAnon = document.createElement("div");
	stayAnon.innerHTML = '<form name="test"><input type="checkbox" name="anonCheck"  id="anonCheck"/><i class="checkLabel">Stay Anonymous</i></form>';
	stayAnon.className = 'stayAnon';

	var noteName = document.getElementsByTagName("h1");

	var isLit = document.getElementById("lit-view");

	if(isLit == null)
	{
		var devSplit = noteName[1].innerHTML.split("<a");
	}
	else{var devSplit = noteName[2].innerHTML.split("<a");
	}

	var devArtistSplit = devSplit[2].split('/">');
	var devNameSplit = devArtistSplit[1].split('</a>');
	var devName = devNameSplit[0];

	var devImgSplit = devSplit[1].split(">");
	var devFinalSplit = devImgSplit[1].split('</');
	var devImgName = devFinalSplit[0];

	var DDHead = document.createElement("div")
		DDHead.className = "ddHead";
	DDHead.innerHTML = "Suggest DD";

	var allDivs = document.querySelectorAll(".pimp-note");
			var modelBox = allDivs[1];
			var allSubModels = modelBox.childNodes;
			allSubModels[9].removeChild(allSubModels[9].childNodes[0]);
			allSubModels[9].insertBefore(suggSend, allSubModels[9].childNodes[0]);
			modelBox.insertBefore(stayAnon, modelBox.lastChild);
			modelBox.insertBefore(DDHead, modelBox.firstChild);  
					var textSpace = document.querySelectorAll('.textarea')[1];

					var settingBlob = JSON.parse(GM_getValue("dAUltra"));

					if(settingBlob["preflight"])
					{
						var customText = settingBlob["prefill"].replace("%deviation%", '<a href="' + document.URL + '">' + devImgName +"</a>");
						customText = customText.replace("%artist%",":dev"+devName+":"); 
						var innerText = textSpace.getElementsByTagName("textarea")[0];
						var preText = customText + innerText.value;
						//textSpace.childNodes[0].setAttribute('name', 'suggestText');
						innerText.value = preText;
					}
	GM_addStyle(".modal{background:transparent!important;}"+
			".stayAnon{margin-left:90px!important;padding-top:10px!important;}"+
			".ddHead{font-size:40px; color:#161816; font-family:verdana, helvetica, san-serif;text-shadow:-1px -1px 0px #f3f6f2;margin-top:-30px;padding-bottom:20px!important;}"+
			".pimp{min-height:600px!important;padding-top:50px;padding-left:50px!important;}"+
			".pimp-note{left:0!important; padding:0!important; bottom:30px!important;min-height:600px!important;}"+
			".fade{background: rgba(35,43,41,0.9)!important;}"+
			".modal{width:500px!important;}"+
			".textarea textarea{padding:10px!important; -moz-border-radius:10px!important; border:1px solid #000!important;}"+
			".textarea{background:transparent none!important; border-width:0!important;}");
}         

function manualSwap()
{
	var manual = document.getElementById("manualEnter");
	var auto = document.getElementById("GMSelect");

	if(auto != null)
	{
		if(auto.style.display == "inline")
		{
			auto.style.display = "none";
			manual.style.display = "inline";
			manual.removeAttribute("readonly");
			manual.value = "";
			manual.placeholder = "type in a CV name";
		}
		else{
			auto.style.display = "inline";
			manual.style.display = "none";
		}
	} else {
		manual.removeAttribute("readonly");
			manual.value = "";
			manual.placeholder = "type in a CV name";
	}

}
/*
 * Cue 155 line kludge to get the staff list in a usable form
 */
function getStaff()
{
	/* 
	 This isn't working properly and the list needs a complete overhaul. Defaulting to manual input for now.
	 */

manualSwap();
}

function staffSearch(splitStaffSource)
{
	return null;
}


function filldetails()
{
	var allDivs = document.getElementsByTagName("div");
	for (var i = 0; i < allDivs.length; i++)
	{
		if(allDivs[i].className == "pimp-note")
		{
			var noteBox = allDivs[i];
			for (var y = 0; y < noteBox.childNodes.length; y++)
			{
				if(noteBox.childNodes[y].className=="pt")
				{
					var   littleBox = noteBox.childNodes[y];
					var textBox = littleBox.childNodes[3];
					var textSpace = textBox.getElementsByTagName("textarea")[0];
					var checkBox = document.getElementById("anonCheck");
					if (checkBox.checked==true)
					{
						var currentText = textSpace.value;
						currentText += "\n\nThe suggesting deviant wishes to remain annonymous.";  
						textSpace.value = currentText;
					}
				}
			}
		}
	}
	unsafeWindow.Blogobox.note(this); 
}

function ajaxFoiler(obj)
{
	simpleHref = obj.parentNode.getAttribute("href").split('?q=')[0];
	console.log(simpleHref);
	window.location = simpleHref;
	return false; 
}

function deAjaxify()
{
	if(document.URL.indexOf("?q=") != -1)
	{
		var cleanURL = document.URL.split("?q=")[0];
		document.URL = cleanURL;
	}
		for(var i = 0; i < document.images.length; i++)
		{      
			document.images[i].addEventListener('click', function(){ajaxFoiler(this);return false;}, false);
		}
}

function initFormat()
{
	var allButts = document.querySelectorAll(".mcb-controls");
	console.log(allButts);
	if(allButts.length > 1)
	{
		allButts[1].childNodes[1].addEventListener('click', slowFormat, false);
	}
}

function slowFormat()
{
	setTimeout(formatButtons, 100);
}

function formatButtons()
{
	var allLabs = document.querySelectorAll(".dpToolbar")[1];
	var hasZikes = false;
		if(!!allLabs)
		{
			hasZikes = true;
		}

	if(hasZikes == false)
	{
		var textBoxes = document.querySelectorAll(".cctextarea-ctrl");
		for(var i = 0; i < textBoxes.length; i++)
		{
			var buttonBox = document.createElement("div");
			buttonBox.className="ultraButtonBox";
			var buttonID = "dAUB"+i;
			buttonBox.setAttribute("id", buttonID);

			textBoxes[i].appendChild(buttonBox);

			GM_addStyle(".dAUltraButton{position:relative; top:0; float:left!important;width:10px; heigth:22px;border:1px solid #000;text-align:center!important;background:-moz-linear-gradient(#415248, #607465)!important;color:#fff!important;margin-right:3px!important;}"+
					".ultraButtonBox{position:absolute; top:-3px!important;left:-3px!important;height:22px!important;width:100%!important;z-index:100!important;background:#B6CAB2!important;padding-left:5px!important; padding-right:2px!important;padding-top:3px!important;-moz-border-radius-topleft:5px;-moz-border-radius-topright:5px!important}"+
					"textarea{padding-top:25px!important;}"+
					".talk-post-reply .text{padding-top:25px!important;}"+
					".pt .textarea .ultraButtonBox{display:none!important;}");

			var buttonList = ["b","i", "u", "s", "tt","sup","sub","blockquote"];
			for(var b = 0; b < buttonList.length; b++)
			{
				var formButton = document.createElement("div");
				if(buttonList[b] != "blockquote")
				{
					formButton.innerHTML = '<div id="'+buttonList[b]+'" class="dAUltraButton"><'+buttonList[b]+'>'+buttonList[b][0]+'</'+buttonList[b]+'></div>';
				}
				else{
					formButton.innerHTML = '<div id="'+buttonList[b]+'" class="dAUltraButton">'+buttonList[b][0]+'</div>';
				}
				var buttonBox = document.getElementById(buttonID);
				buttonBox.appendChild(formButton);
				formButton.addEventListener('click', format, false);
			}

			var linkButton = document.createElement("div");
			linkButton.innerHTML = '<div id="link" class="dAUltraButton"><a>L</a></div>';
			var buttonBox = document.getElementById(buttonID);
			buttonBox.appendChild(linkButton);
			linkButton.addEventListener('click', link, false);

			var acroButton = document.createElement("div");
			acroButton.innerHTML = '<div id="acronym" class="dAUltraButton"><acronym title="acronym">A</acronym></div>';
			var buttonBox = document.getElementById(buttonID);
			buttonBox.appendChild(acroButton);
			acroButton.addEventListener('click', acro, false);
		}
	}
}

function format()
{
	var button = this.childNodes[0].id;
	if(document.URL.indexOf("messages") == -1)
	{ 
		var currentText = this.parentNode.parentNode.childNodes[3];
	}
	else{
		var currentText = this.parentNode.parentNode.childNodes[0];
	}   
	var selectStart = currentText.selectionStart;
	var selectEnd = currentText.selectionEnd;   
	var preText = "";
	var formText = "";
	var postText = "";
	var allText = currentText.value.split("");
	for(var i = 0; i < selectStart; i++)
	{
		preText = preText + allText[i];
	}
	for(var i = selectStart; i < selectEnd; i++)
	{
		formText = formText + allText[i];
	}
	for(var i = selectEnd; i < allText.length; i++)
	{
		postText = postText + allText[i];
	}

	var formatted = preText + "<"+button+">" + formText + "</"+button+">" + postText;
	currentText.value = formatted;
}

function link()
{
	var linkRef = prompt("Address of the page you want to link to");
	if(document.URL.indexOf("messages") == -1)
	{ 
		var currentText = this.parentNode.parentNode.childNodes[3];
	}
	else{
		var currentText = this.parentNode.parentNode.childNodes[0];
	}   
	var selectStart = currentText.selectionStart;
	var selectEnd = currentText.selectionEnd;   
	var preText = "";
	var formText = "";
	var postText = "";
	var allText = currentText.value.split("");
	for(var i = 0; i < selectStart; i++)
	{
		preText = preText + allText[i];
	}
	for(var i = selectStart; i < selectEnd; i++)
	{
		formText = formText + allText[i];
	}
	for(var i = selectEnd; i < allText.length; i++)
	{
		postText = postText + allText[i];
	} 
	var formatted = preText + '<a href="' +linkRef+'">' + formText + "</a>" + postText;
	currentText.value = formatted;
}

function acro()
{
	var acroTool = prompt("tooltip content");
	if(document.URL.indexOf("messages") == -1)
	{ 
		var currentText = this.parentNode.parentNode.childNodes[3];
	}
	else{
		var currentText = this.parentNode.parentNode.childNodes[0];
	}   
	var selectStart = currentText.selectionStart;
	var selectEnd = currentText.selectionEnd;   
	var preText = "";
	var formText = "";
	var postText = "";
	var allText = currentText.value.split("");
	for(var i = 0; i < selectStart; i++)
	{
		preText = preText + allText[i];
	}
	for(var i = selectStart; i < selectEnd; i++)
	{
		formText = formText + allText[i];
	}
	for(var i = selectEnd; i < allText.length; i++)
	{
		postText = postText + allText[i];
	}
	var formatted = preText + '<acronym title="' +acroTool+'">' + formText + "</acronym>" + postText;
	currentText.value = formatted;
}


function getGalls()
{
	var allDD = document.querySelectorAll(".tt-a.huge");
	for(var i = 0; i < (allDD.length); i++)
	{
			var soloDD = allDD[i];
			if(!!soloDD.getAttribute("category"))
			{
				var gallery = soloDD.getAttribute("category");
			}
			else
			{
				var gallery = soloDD.childNodes[0].getAttribute("category");
			}
			var galSpan = document.createElement("span");
			galSpan.innerHTML = " <br/><br/><span><em>"+gallery+"</em></span>";
			var feet = soloDD.parentNode.getElementsByTagName("div");
			for(var f = 0; f < feet.length; f++)
			{
				if(feet[f].className == "foot")
				{
					var foot = feet[f]
						foot.appendChild(galSpan);
					f = feet.length;
				}
			} 
	}
}

function toBool(boolString)
{
	if(boolString != null && boolString.indexOf('true') > -1)
		return true;
	return false;
}

function scriptInit()
{
	var pageURL = document.URL;
	initSettings();
	getVer();

/*	if(pageURL.indexOf("/art/") >= 0)
	{
		tumblButton();
	}*/
	if(pageURL.indexOf("/dds/") >= 0)
	{
		getGalls();
	}
	var settingBlob = GM_getValue("dAUltra");

	var settings = {}
	if(settingBlob.indexOf("|") > -1)
	{

		settingBlob = settingBlob.split("|");
		thumbSize = settingBlob[1];
		preFill = settingBlob[7];

		settings = {
			"resize" : toBool(settingBlob[0]),
			"thumbSize" : settingBlob[1],
			"group" : toBool(settingBlob[2]),
			"format" : toBool(settingBlob[3]),
			"tabs" : toBool(settingBlob[4]),
			"suggDD" : toBool(settingBlob[5]),
			"doPrefill" : toBool(settingBlob[6]),
			"prefill" : toBool(settingBlob[7]),
			"deAjax" : toBool(settingBlob[8])
		}	    
		GM_setValue("dAUltra", JSON.stringify(settings));

	} else {
		settings = JSON.parse(settingBlob);
	}
	deAjaxify();
	if(settings["resize"])
	{
		getImages();
	}
	if(settings["group"])
	{
		groupLog();
	}
	if(settings["tabs"])
	{
		addDDtab();
	}
	if(settings["format"])
	{
		formatButtons();
		setTimeout(initFormat, 500);
	}
	console.log(settings.tabs);
	console.log(settings["suggDD"]);
	if(settings["suggDD"])
	{
		suggestDD();
	}
}

(function()
{
	var value = GM_getValue("dAUltra");
	if(value == null || value =="")
	{
		settingsModal();
		alert("It appears that you haven't set up dAUltra. Please choose your settings now, then press save");
	}
	else{scriptInit();}
})();


GM_addStyle(
		"#ddTab{padding-top:20px;}"+
		".suggDDButt img{float:left;}"+
		".suggDDButt{padding:50px!important;}"+
		".smbutton-red{background:-moz-linear-gradient(-90deg, #e85877, #bc2142) repeat scroll 0 0 transparent!important;border-color:#bc2142!important;}"+
		".smbutton-red:hover{background:-moz-linear-gradient(-90deg, #f889a1, #e85877) repeat scroll 0 0 transparent!important;}"+
		".smbutton-red:active{background:-moz-linear-gradient(-90deg, #bc2142, #e85877) repeat scroll 0 0 transparent!important;}"+
		".stayAnon{margin-left:50px!important;}"
	   ); 
