// ==UserScript==
// @name           MAL Nav Mods
// @namespace      
// @description    MyAnimeList navigation modfications for usability and user experience v0.6 by Dalon
// @run-at         document-start
// @version        0.6
// @include        http://myanimelist.net/*
// @include        http://www.myanimelist.net/*
// @exclude        http://myanimelist.net/animelist/*
// @exclude        http://myanimelist.net/mangalist/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

window.addEventListener('DOMNodeInserted', onDOMInsert);
function onDOMInsert(e) {
	if(document.body){
		window.removeEventListener('DOMNodeInserted', onDOMInsert);
		init();
	}
}


// All your GM code must be inside this function
function init() {
	
	//localVarReset();

	// prepare some vars
	var clubs = [];
	var clubnames = [];
	
	// collect some stuff
	if(window.localStorage.getItem("navmod_clubs")){
		var navmod_clubs = window.localStorage.getItem("navmod_clubs");
		var navmod_clubnames = window.localStorage.getItem("navmod_clubnames");
		clubs = navmod_clubs.split(',');
		clubnames = navmod_clubnames.split(',');
	}
	var clubname = $("#contentWrapper>h1").html();
	
	// Main buttons
	var myClubs 	= $("#nav>li>ul>li>a:contains(Clubs):first").html("Clubs").parent().css("width", "80px");	   
	var myProfile 	= $("#nav>li>a:contains(Profile):first").html(""+$("#nav>li>a:contains(Profile):first").html()).parent().css("width", "105px");
	var myAnimes 	= $("#nav>li>a:contains(Anime):first").html("Animelist").attr("href", $("#nav a:contains(View List)").attr("href")).parent().css("width", "105px");
	var myMangas	= $("#nav>li>a:contains(Manga):first").html("Mangalist").attr("href", $("#nav a:contains(View List):last").attr("href")).parent().css("width", "105px").after(myClubs);
	var forums 		= $("#nav>li>a:contains(Community)").html("Forums").attr("href", "/forum").parent().css("width", "75px");
	var database	= $("#nav>li>a:contains(Industry)").html("Database").attr("href", "/anime.php").parent().css("width", "80px");
	
	// Submenu "My profile"
	var myPanel = $("li>a:contains(Panel):first",myProfile).html("My Panel").parent();
	var mySettings = $("li>a:contains(Profile)",myProfile).html("My Settings").parent();
	$("a:contains(My Settings)", mySettings).attr("href", $(".edit a", mySettings).attr("href"));
	
	$("li>a:contains(Messages)",myProfile).html("My Messages");
	$("li>a:contains(Friends)",myProfile).html("My Friends");
	$("li>a:contains(Blog)",myProfile).html("My Blog");
	$("li>a:contains(Reviews)",myProfile).html("My Reviews");
	var myRecs = $("li>a:contains(Recommendations)",myProfile).html("My Recs").parent();
	$(myRecs).after($(mySettings));
	
	$(".edit a", mySettings).remove();
	$(".edit",myPanel).remove();
	
	// Submenu "My Animes"
	var editAnime = $("li>a:contains(View List)",myAnimes).html("Edit Anime").parent();
	$("a:contains(Edit Anime)", editAnime).attr("href", $(".edit a", editAnime).attr("href"));
	$(".edit a", editAnime).remove();
	
	$("li>a:contains(Reviews)",myAnimes).html("Anime Reviews").parent().before(editAnime);
	
	// Submenu "My Mangas"
	var editManga = $("li>a:contains(View List)",myMangas).html("Edit Manga").parent();
	$("a:contains(Edit Manga)", editManga).attr("href", $(".edit a", editManga).attr("href"));
	$(".edit a", editManga).remove();
	
	$("li>a:contains(Reviews)",myMangas).html("Manga Reviews").parent().before(editManga);
	
	// Submenu "My Clubs"
	$('<ul style="display:none"><li class=" "><a href="/clubs.php">All Clubs</a></li></ul>').appendTo(myClubs);
	for(var i = 0; clubs.length>i; i++){
		$('<li class="club'+clubs[i]+'" style="overflow:hidden;"><a href="/clubs.php?cid='+clubs[i]+'">'+clubnames[i]+'</a></li>').prependTo($("ul", myClubs));
	}
	$(".new", myClubs).parent().css("width", "105px");
	
	// Submenu "Forums"
	$("li>a:contains(Forum)", forums).parent().remove();
	$("li>a:contains(Clubs)", forums).parent().remove();
	
	// Submenu "Database"
	$('<li class=" "><a href="/manga.php">Manga</a></li>').prependTo($("ul", database));
	$('<li class=" "><a href="/anime.php">Anime</a></li>').prependTo($("ul", database));
	
	var urlHalves = String(document.location).split('?');
	if((urlHalves[0] == "http://myanimelist.net/clubs.php") && urlHalves[1]) {
		var urlVars = urlHalves[1].split('&');
		var getVars = [];
		for(var i=0; i<=(urlVars.length); i++){
			if(urlVars[i]){
				var urlVarPair = urlVars[i].split('=');
				getVars[urlVarPair[0]] = urlVarPair[1];
			}
		}
		
		if(getVars['cid']){// do something to the club
			addClubButton(getVars['cid']);
		}
		if(getVars['action'])
			addBtnToClubPage();
		
		//alert(getVars['action']);
	}
	
	function addClubButton(id){
		var btn= $("<input type='button' style='float:right' />").appendTo("#contentWrapper>h1").click(function(){
			
			if(clubs.indexOf(id) >= 0){
				clubs.splice(clubs.indexOf(id), 1);
				clubnames.splice(clubs.indexOf(id), 1);
				$(this).attr('value', 'add club to nav');
				$(".club"+id).remove();
			}
			else{
				clubs.push(id);
				clubnames.push(clubname);
				$(this).attr('value', 'remove club from nav');
				$('<li class="club'+id+'" style="overflow:hidden;"><a href="/clubs.php?cid='+id+'">'+clubname+'</a></li>').prependTo($("ul", myClubs));
			}
			
			window.localStorage.setItem("navmod_clubs", clubs);
			window.localStorage.setItem("navmod_clubnames", clubnames);
		});
		
		if(clubs.indexOf(id) >= 0)
			$(btn).attr('value', 'remove club from nav');
			
		else
			$(btn).attr('value', 'add club to nav');
	}
	
	function addBtnToClubPage(){
		$("table .lightLink").each(function(){
			var item = $(this).parent();
			var id = $("a",item).attr("href");
			id = id.substring(id.indexOf('cid')+4);
			var clubname = $("a>strong",item).html();
			var newbtn = $('<div style="margin: 3px 0pt;"><a class="navbtn" href="#">Add Club to Nav</a></div>');
			$("div:first",item).append(newbtn);
			
			if(clubs.indexOf(id) >= 0)
				$(".navbtn", item).html('remove club from nav');
			
			else
				$(".navbtn", item).attr('add club to nav');
			
			
			$(".navbtn", item).click(function(){
				
				if(clubs.indexOf(id) >= 0){
				clubs.splice(clubs.indexOf(id), 1);
				clubnames.splice(clubs.indexOf(id), 1);
				$(".navbtn", item).attr('add club to nav');
				$(".club"+id).remove();
			}
			else{
				clubs.push(id);
				clubnames.push(clubname);
				$(".navbtn", item).html('remove club from nav');
				$('<li class="club'+id+'" style="overflow:hidden;"><a href="/clubs.php?cid='+id+'">'+clubname+'</a></li>').prependTo($("ul", myClubs));
			}
			
			window.localStorage.setItem("navmod_clubs", clubs);
			window.localStorage.setItem("navmod_clubnames", clubnames);
			});
		});
	}

}

function localVarReset(){
	window.localStorage.setItem("navmod_clubs", null);
	window.localStorage.setItem("navmod_clubnames", null);
}