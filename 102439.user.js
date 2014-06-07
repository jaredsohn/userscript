// ==UserScript==
// @name           Better Interpol
// @namespace      http://PaulusSchoutsen.nl
// @include        http://www.interpol.int/Public/Wanted/*
// @include        http://www.interpol.int/public/Data/Wanted/*
// @include        http://www.interpol.int/public/data/wanted/*
// @description    Making the Interpol most-wanted list a bettter place
// @require		   http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @resource 	   fbCSS http://paulusschoutsen.nl/interpol/style.css
// ==/UserScript==


GM_addStyle (GM_getResourceText("fbCSS"));  


function buildMemberEntry(targetElement, foto, name, info) {
	targetElement.append("<li class='objectListItem pbs uiListItem uiListLight uiListVerticalItemBorder'><div class='UIImageBlock clearfix UIImageBlock_Entity'><span class='UIImageBlock_Image UIImageBlock_ENT_Image'><img class='img' src='"+foto+"'></span><div class='auxiliary UIImageBlock_Ext'>"+info+"</div><div class='UIImageBlock_Content UIImageBlock_ENT_Content'><div class='fsl fwb fcb'>"+name+"</div></div></div></li>");
	
}

function fixMemberList() {
	$("body").append("<div id='fbPage'><div style='width: 543px; margin: 0 auto;'><ul class='uiList friendsDashboard' id='fbMembers'></ul></div></div>");

	memberList = $("#fbMembers");

	members = $("p>table");
	
	members.each(function() {
	
		info = $(this);
		
		name = $("b",info).html();
		pic = $("img",info).attr("src");
		about = $($("font",$("td[align=left]",info).get(1)).get(1)).html();
		
		buildMemberEntry(memberList, pic, name, about);
	});
	
	$($("hr+table").get(0)).html($("#fbPage"));

}

var info = new Object();

function containsNoInfo(inf) {
	return 	!inf ||
			inf.indexOf("undefined") != -1 ||
			inf.indexOf("(unknown)") != -1;
}

function addFragment(targetElement, icon, prefix, attr) {
	if(attr == "Place of birth" && info[attr]) {
		info[attr] = "<a href='http://maps.google.com/?q="+info[attr]+"' target='_blank'>"+info[attr]+"</a>";
	}
	
	if(info[attr] && !containsNoInfo(info[attr])) {
		targetElement.append("<span class='fbProfileBylineFragment'><img class='mrs fbProfileBylineIcon img' src='"+icon+"'>"+prefix+" "+info[attr]+"</span>");
	}
	
	delete(info[attr]);
}

function buildTable(targetElement, title, attr) {

	table = "";

	for(a in attr) {
		key = attr[a];

		if(info[key]) {
		
				if(key == "Place of birth") {
					extra = "<br />Hier GMaps kaartje geboorteplaats.";
				} else {
					extra = "";
				}
		
				if(!containsNoInfo(info[key])) {
					table += "<tr><th class='label'>"+key+"</th><td class='data'>"+info[key]+extra+"</td></tr>"
				}
				delete(info[key]);
		}
	}
	
	if(table != "") {
		buildTableHTML(targetElement, title, table);
	}
}

function buildTableHTML(targetElement, title, content) {
		table = "<div class='mbs profileInfoSection'><div class='uiHeader uiHeaderTopAndBottomBorder uiHeaderSection infoSectionHeader'><div class='uiHeaderTop'><div><h4 class='uiHeaderTitle'>"+title+"</h4></div></div></div><div class='phs'><table class='uiInfoTable mtm profileInfoTable'><tbody>";

		table += content;
		
		table += "</tbody></table></div></div>";
		
		targetElement.append(table);
}


function fixProfilePage() {
	$("body").append("<div id='fbPage'>	<div id='fbphoto' style='float:left'></div><div id='fb' style='padding: 0px 20px; border-left: 1px solid #B3B3B3; width: 493px;'><div id='headerArea'><h1><span class='profileName fn ginormousProfileName fwb' id='fbname'></span></h1><div id='pagelet_byline'><div class='fbProfileByline' id='fbfragments'></div></div>		</div></div></div>");

	photos = $("#photographs .boxed img");

	photoEl = $("#fbphoto");
	fragments = $("#fbfragments");
	fb = $("#fb");
	
	// photo
	if(photos.size() > 0) {
		profilePic = $(photos.get(0));
	} else {
		profilePic = $("<img src='http://PaulusSchoutsen.nl/interpol/clowntje.jpg'>");
	}
	
	profilePic.load(function() {
		fb.css('margin-left',profilePic.width()+"px");
		$($("table table").get(1)).html( $("#fbPage") );
	});
	
	photoEl.append(profilePic);
	
	photoEl.append("<div style='text-align:center; margin-top:20px;'>"+$("#form1").html()+"</div>");
	
	// info
	infoTables = $("td[width='25%']");
	
	infoTables.each(function() {
		td = $(this);
		
		name = td.text().trim();
		
		name = name.substr(0, name.length-1);
		
		value = td.next().text().trim();
	
		info[name] = value;
	});	

	$("#fbname").html(info["Forename"]+" "+info["Present family name"]+" <iframe src='http://www.facebook.com/plugins/like.php?href="+escape(document.location.href)+"&amp;send=false&amp;layout=button_count&amp;width=100&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font=lucida+grande&amp;height=21' scrolling='no' frameborder='0' style='border:none; overflow:hidden; width:100px; height:21px; position: relative; top: 3px; left: 10px;' allowTransparency='true'></iframe>");
	delete(info["Forename"]);
	delete(info["Present family name"]);
	
	addFragment(fragments,'http://PaulusSchoutsen.nl/interpol/spoken.png','Knows','Language spoken');
	addFragment(fragments,'http://PaulusSchoutsen.nl/interpol/borndate.png','Born on','Date of birth');
	addFragment(fragments,'http://PaulusSchoutsen.nl/interpol/bornplace.png','From','Place of birth');
	
	buildTable(fb, "Basic Information", new Array("Name","Present family name","Forename","Sex","Nationality","Date of birth","Place of birth","Language spoken"));
	buildTable(fb, "Appearance", new Array("Height","Colour of eyes","Colour of hair","Weight","Distinguishing marks and characteristics"));
	buildTable(fb, "Offences", new Array("Categories of Offences","Arrest Warrant Issued by"));
	
	info['Email'] = contactLink = $("table table table table table table font a").parent().html();
	
	buildTable(fb, "Contact Information", new Array("Email"));
	
	otherAttrs = new Array();
	
	for(i in info) {
		otherAttrs[otherAttrs.length] = i;
	}
	
	if(otherAttrs.length > 0) {
		buildTable(fb, "Other Information", otherAttrs);
	}
	
}

(function() {
	loc = document.location.href.toLowerCase();

	if(	loc.indexOf("wanted/search/recent") != -1 || 
		loc.indexOf("wanted/search/searchwanted") != -1 || 
		loc.indexOf("wanted/search/resultlist") != -1) {
		fixMemberList();
	} else if (loc.indexOf("wanted/notices") != -1) {
		fixProfilePage();
	}
})();
