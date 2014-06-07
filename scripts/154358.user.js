// ==UserScript==
// @name        Viadeo - Extend account
// @namespace   Viadeo
// @description Give more rights like see visitors profil, more results search…
// @include     http://www.viadeo.fr/*
// @include     https://www.viadeo.fr/*
// @include     http://www.viadeo.com/*
// @include     https://www.viadeo.com/*
// @grant		none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js

// @version     0.2
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);

//My ID number
var myHeader = $('body').find('#hd-member'); 
var myProfilLink = $(myHeader[0]).find('a.lb').attr('href');
var profilPattern=new RegExp("\/profile\/(.*)\/","g");
var myID = profilPattern.exec(myProfilLink)[1];
var myFirstName = $('.name').find('.lb').text();
console.log(myFirstName);

//My visits
var visits = $('body').find('.bd.rc.viadeostandardprofile');
var visits_length = visits.length;
var btnProfilDD = $('body').find('#ProfileVisitors-menu');
var visitsMenu = $('body').find('#ProfileVisitors-dropdown');

btnProfilDD.mouseenter(function(){
	
	var ReadyAjax= setInterval(updateViews,500);
	function updateViews(){
		console.log(visitsMenu);
		var visitsDD = $(visitsMenu).find('.viadeostandardprofile.list-item.known-visitor');
		var visitsDD_length = visitsDD.length;
		if(visitsDD_length > 0){
			clearInterval(ReadyAjax);
			for(var i=0; i< visitsDD_length; i++){
				var itemDD = visitsDD[i];
				
				var imgDD = $(itemDD).find('img')[0];
				var imgHref = $(imgDD).attr('src');
				var idPattern=new RegExp("memberId=([a-z0-9]*)&","g");
				var memberID = idPattern.exec(imgHref)[1];
				var img_linkDD = $(imgDD).parent('a');
				var name_linkDD = $(itemDD).find('.vcard').find('a');
				$(img_linkDD).attr('href','http://www.viadeo.com/profile/'+memberID);
				$(name_linkDD).attr('href','http://www.viadeo.com/profile/'+memberID);
			}
		}
	}
}
);


console.log(visitsDD);
for(var i=0; i< visits_length; i++){
	var item = visits[i];
	var img = $(item).find('img')[0]
	var id = $(img).data('memberid');
	var img_link = $(img).parent('a');
	var name_link = $(item).find('.bd').find('a');
	$(img_link).attr('href','http://www.viadeo.com/profile/'+id);
	$(name_link).attr('href','http://www.viadeo.com/profile/'+id);
}

//Search results
var results = $('body').find('#searchResult').find('.no-prevent.hcard.bram');
var results_length = results.length;
for(var i =0; i<results_length;i++){
	var item = results[i]
	var id = $(item).find('.dd-menu.no-prevent').find('.sendMessage').data('id');
	var img_link = $(item).find('a.avatar');
	var name_link = $(item).find('a.profile-link');
	$(img_link).attr('href','http://www.viadeo.com/profile/'+id);
	$(name_link).attr('href','http://www.viadeo.com/profile/'+id);
}

//Search pages
if($('body').find('#searchResult').length>0){
	
	var pagination = $('body').find('p.numerotation');
	var pages = $(pagination).find('a');
	var pages_length = pages.length;
	var pathname = document.URL;
	for(var i=0; i<pages_length;i++){
		var item = pages[i];
		var href = $(item).attr('href');
		var number = parseInt(/pageNumber=(\d+)/.exec(href)[1], 10);
				

		var pattern=/pageNumber/g;
		var result=pattern.test(pathname);
		var new_path = '';
		if(result == true){
			var patNumber = /pageNumber=(\d+)/;
			new_path = pathname.replace(patNumber,'pageNumber='+number);
		}
		else{
			new_path = pathname+'&pageNumber='+number;
		}
		$(item).attr('href',new_path);
	}
}

//Send message
var send_links = $('body').find('.sendMessage');
var send_links_length = send_links.length;
/*for( var i=0; i<send_links_length;i++){
	var item = send_links[i];
	var memberID=$(item).data('id');
	//$(item).off('click');
	//$(item).unbind();
	$(item).click(function(event) {
		event.preventDefault();
		var newItem = $('<a class="sendMessage" data-name="Typhaine CHAPLAIS" data-id="002kv6mz2dzlte0" href="#"" >Test</a>');
		$(item).parent('li').append(newItem);
	});
	}
function load_message_form(url,memberID,myID){
	$.ajax({
		url: url,
		success: function(data){
			$('.result').html(data);
			alert('Load was performed.');
		}
	});
}*/

//Add contact
var contactLinks = $('body').find('.contactPremiumRedirect');
var contactLinks_length = contactLinks.length;
for( var i=0; i<contactLinks_length;i++){
	
	var item = contactLinks[i];
	console.log('test');
	var memberID = $(send_links[i]).data('id');
	
	$(item).removeClass('contactPremiumRedirect').addClass('js_addThisContact mlxs mtxs').attr("data-id",memberID);
}

VNS.misc.profile = {
isIdentified: true,
defaultLanguage: 'fr',
profileLanguage: 'fr',
profileIdEncrypted: myID,
memberIdEncrypted: myID,
itemType: '',
isEditMode: 1,
fromjoin: 0,
profileFirstName:myFirstName,
dcrReferer:'',
acceptSkill:'',
goTo:''
};
VNS.misc.profileTimelineTrad = {};
VNS.misc.profileTimelineTrad["title.s.fr"] = "Diplôme";
VNS.misc.profileTimelineTrad["title.p.fr"] = "Fonction";
VNS.misc.profileTimelineTrad["desc.s.fr"] = "Annotations";
VNS.misc.profileTimelineTrad["desc.p.fr"] = "Missions et réalisations";
VNS.misc.profileTimelineTrad["title.s.en"] = "Degrees";
VNS.misc.profileTimelineTrad["title.p.en"] = "Job title";
VNS.misc.profileTimelineTrad["desc.s.en"] = "Notes";
VNS.misc.profileTimelineTrad["desc.p.en"] = "Responsibilities and achievements";
VNS.misc.profileTimelineTrad["title.s.es"] = "Diplomas";
VNS.misc.profileTimelineTrad["title.p.es"] = "Puesto";
VNS.misc.profileTimelineTrad["desc.s.es"] = "Notas";
VNS.misc.profileTimelineTrad["desc.p.es"] = "Función y logros";
VNS.misc.profileTimelineTrad["title.s.mx"] = "Diplomas";
VNS.misc.profileTimelineTrad["title.p.mx"] = "Puesto";
VNS.misc.profileTimelineTrad["desc.s.mx"] = "Notas";
VNS.misc.profileTimelineTrad["desc.p.mx"] = "Función y logros";
VNS.misc.profileTimelineTrad["title.s.de"] = "Abschlüsse";
VNS.misc.profileTimelineTrad["title.p.de"] = "Tätigkeit";
VNS.misc.profileTimelineTrad["desc.s.de"] = "Anmerkungen";
VNS.misc.profileTimelineTrad["desc.p.de"] = "Aufgaben und Ergebnisse";
VNS.misc.profileTimelineTrad["title.s.it"] = "Diplomi";
VNS.misc.profileTimelineTrad["title.p.it"] = "Posizione";
VNS.misc.profileTimelineTrad["desc.s.it"] = "Note";
VNS.misc.profileTimelineTrad["desc.p.it"] = "Responsabilità e risultati conseguiti";
VNS.misc.profileTimelineTrad["title.s.pt"] = "Diplomas";
VNS.misc.profileTimelineTrad["title.p.pt"] = "Cargo ocupado";
VNS.misc.profileTimelineTrad["desc.s.pt"] = "Notas";
VNS.misc.profileTimelineTrad["desc.p.pt"] = "Responsabilidades e realizações";
VNS.misc.profileTimelineTrad["title.s.ru"] = "Дипломы";
VNS.misc.profileTimelineTrad["title.p.ru"] = "Название должности";
VNS.misc.profileTimelineTrad["desc.s.ru"] = "Отметки";

$.getScript("http://static2.viadeo-static.com/resource/20121221122821/app-profilev2-visu.js");