// ==UserScript==
// @name           teczka NP
// @namespace      http://www.fotka.pl/profil/Bozar/
// @include        http://www.fotka.pl/profil/*
// @include        http://www.fotka.pl/albumy/*
// @version        1.1.5
// ==/UserScript==


const version = "1.1.5";
const SERWER = "http://teczka.szatana.eu/";

const u = unsafeWindow;
const $ = u.$;

if(!$) return; // bez jQuery nie damy rady

var pagerCheck1 = u.pager;
setTimeout(function(){
	if(u.pager && !pagerCheck1){
		alert("Wykryto konflikt modyfikacji \"Teczka\" i \"Pager\". Pager musi uruchamiać się przed Teczką.\n\nAby to naprawić:\n1. Kliknij \"Firefox\" lub menu \"Narzędzia\"\n2. Wybierz \"Dodatki\"\n3. Kliknij zakładkę \"Skrypty\"\n4. Kliknij prawym na \"pager2 ...\"\n5. Wybierz \"Wykonaj jako pierwszy\"");
		return;
	}
}, 1000);

// mały hack przy ładowaniu obrazków z komentów
if(u.entries){
	if(u.pager){
		$(document).bind("commentsChanged", dodajLinki_prof);
	}else{
		const LoadImgs_original = u.LoadImgs;
		u.LoadImgs = function(selector,force){
			LoadImgs_original(selector,force);
			dodajLinki_prof();
		}
	}
	dodajLinki_prof();
}

var miniURL = document.location.href.match(new RegExp(/http:\/\/www.fotka.pl\/profil\/\w+\/albumy\/\d+,.*\/\d+/));		
if(miniURL){
	if(u.comments){
		// doklejamy do końca orginalnego callbacka procedurę dodawania linków
		var strona = 1;
		$("#comments-more").click(function(){strona++;});
		const m_comm_original = u.comments.modules_comments_actions_get_complete;
		u.comments.modules_comments_actions_get_complete = function(response){
			m_comm_original(response);
			dodajLinki_zdj();
		}
		dodajLinki_zdj();
	}
	
	var menuItem = document.createElement("li");
	var menuCommand = document.createElement("a");
	menuCommand.href = "http://teczka.szatana.eu/szukaj.php?mode=zdj&s=" + miniURL;
	menuCommand.innerHTML = "<img src='http://teczka.szatana.eu/favicon.ico'/> Teczka tego zdjęcia";
	menuCommand.target = "_blank";
	menuItem.appendChild(menuCommand);
	$("#photo-options").append(menuItem);
	
	$(".link_archiwizuj_z").live('click', send2);
}

dodajLink_stat();

$(".link_archiwizuj_p").live('click', send1);

var link = document.createElement("a");
link.innerHTML = "<img src='http://teczka.szatana.eu/favicon.ico'/>";
link.href = "http://teczka.szatana.eu/szukaj.php?mode=autor&s=" + u.profile_login;
link.target = "_blank";
$("#profile-info h1").append(link);


function dodajLink_stat(){
	var link = document.createElement("a");
	link.href = "javascript:void(0)";
	link.innerHTML = "◄archiwizuj►";
	link.style.display = "block";
	link.style.fontSize = "85%";
	$(link).click(function(e){
		var info = $(document.createElement("span"));
		$(this).replaceWith(info);
		info.html("łączenie z bazą...");
		info.css({"display":"block", "fontSize":"85%"});
		setTimeout(function() {	// mały hack
			GM_xmlhttpRequest({
				method: "GET",
				url: SERWER+"dodaj_s.php?login=" + u.profile_login + "&v="+version,
				headers: {"Content-Type" : "text/html; charset=UTF-8"} ,
				onload: function(resp){
							info.html(resp.responseText);
						}
				});
			});
		},0);
	$(".container div").eq(0).append(link);
}

function dodajLinki_prof(e){
	
	//alert("event recvd: " e.target.id);

	const komcie = $('#entries-list .comments-item');
	var ileZłych = $("#entry_.{id}").length + $("#r_komentarz_nprofil").length;

	komcie.each(function(){
		const kom = $(this);
		if(kom.attr("id") == "entry_.{id}" || kom.attr("id") == "r_komentarz_nprofil") return;
		if(kom.attr("teczka") != "tak"){
			const link = $(document.createElement("a"));
			kom.find("div.comments-item-box  div.Box  div.textColorLight").append(link);
			kom.attr("teczka", "tak");
			link.html("◄archiwizuj►");
			link.css("margin-left: 0.5em; text-decoration: none");
			link.attr("href", "#");
			link.attr("class", "link_archiwizuj_p");
			link.attr("comment_id", kom.attr("id").split("_")[1]);

			if(!u.pager){
				link.attr("comment_page", Math.ceil(($('#entries-list .comments-item').length - ileZłych)/10)  );
			}else{
				link.attr("comment_page", u.currentCommentsPage);
			}
		}
	});
}

function dodajLinki_zdj(){
	const komcie = $("#comments-list .comments-item");
	const maxnum = komcie.attr("id").split("_")[1];

	komcie.each(function(){
		const kom = $(this);
		if(kom.attr("id") == "comment_.{numer}" || kom.attr("id") == "comments-add") return;
		if(kom.attr("teczka") != "tak"){
			const nr = kom.attr("id").split("_")[1];
			const link = $(document.createElement("a"));
			kom.find("div.comments-item-box div.textColorLight").append(link);
			kom.attr("teczka", "tak");
			link.html("◄archiwizuj►");
			link.css("margin-left: 0.5em; text-decoration: none");
			link.attr("href", "#");
			link.attr("class", "link_archiwizuj_z");
			link.attr("nr", $(this).attr("id").split("_")[1]);
			link.attr("strona", strona);
		}
	});
}

function send1(e){
	e.preventDefault();
	//if(e.which != 1) return;
	setTimeout(function() {
		const link = $(e.target).html("łączenie...");		
		GM_xmlhttpRequest({
			method: "GET",
			url: SERWER+"dodaj_p.php?uid=" + u.profile_id +
				 "&cid=" + link.attr("comment_id") +
				 "&gdzie=" + u.profile_login +
				 "&strona=" + link.attr("comment_page") +
				 "&v=" + version ,
			headers: {"Content-Type" : "text/html; charset=UTF-8"} ,
			onload: function(resp){
				const info = document.createElement("a");
				info.innerHTML = resp.responseText;
				info.href = "javascript:void(0)";
				info.target = "_blank";
				switch(resp.responseText.toUpperCase()){
					case "ERROR1":
						info.innerHTML = "błąd: nie znaleziono komentarza. odśwież stronę i spróbuj ponownie"; break;
					case "ERROR2":
						info.innerHTML = "błąd: nie można połączyć się z bazą. spróbuj za jakiś czas"; break;
					case "ERROR3":
						info.innerHTML = "mamy już ten komentarz";
						info.href = SERWER + "szukaj.php?mode=id&s=" + link.attr("comment_id"); break;
					case "ERROR4":
						info.innerHTML = "niepoprawne zapytanie do teczki. sprawdź, czy posiadasz najnowszą wersję wtyczki"; break;
					case "ERROR5":
						info.innerHTML = "nie przyjmujemy komentarzy od nieistniejących kont"; break;
					case "ERROR6":
						info.innerHTML = "używasz nieaktualnej wersji archiwizatora. sprawdź w grupie, czy jest dostępna aktualizacja"; break;
					case "OK":
						info.innerHTML = "▲dodano komentarz▲";
						info.href = SERWER + "szukaj.php?mode=id&s=" + link.attr("comment_id"); break;
				}
				link.replaceWith(info);
			}
		})
	}, 0);
}

function send2(e){
	if(e.which != 1) return;
	e.preventDefault();
	setTimeout(function() {
		const link = $(e.target).html("łączenie...");
		var miniURL = document.location.href.match(new RegExp(/http:\/\/www.fotka.pl\/profil\/\w+\/albumy\/\d+,.*\/\d+/));

		GM_xmlhttpRequest({
			method: "GET",
			url: SERWER+"dodaj_z.php?" +
			  "uid=" + u.profile_id +
			  "&url=" +  encodeURIComponent(miniURL) +
			  "&aid=" + document.location.href.split(",")[0].split("/")[document.location.href.split("/").length-2] +
			  "&pid=" + document.location.href.split(",")[1].split("/")[1] +
			  "&cid=" + $(e.target).attr("nr") +
			  "&page=" + $(e.target).attr("strona") +
			  "&v=" + version ,
			headers: {"Content-Type" : "text/html; charset=UTF-8"} ,
			onload: function(resp){
				const info = document.createElement("a");
				info.innerHTML = resp.responseText;
				info.href = "javascript:void(0)";
				info.target = "_blank";
				switch(resp.responseText.toUpperCase()){
					case "ERROR1":
						info.innerHTML = "błąd: nie znaleziono komentarza. odśwież stronę i spróbuj ponownie"; break;
					case "ERROR2":
						info.innerHTML = "błąd: nie można połączyć się z bazą. spróbuj za jakiś czas"; break;
					case "ERROR3":
						info.innerHTML = "mamy już ten komentarz";
						info.href = SERWER + "szukaj.php?mode=zdj&s=" + miniURL; break;
					case "ERROR4":
						info.innerHTML = "niepoprawne zapytanie do teczki. sprawdź, czy posiadasz najnowszą wersję wtyczki"; break;
					case "ERROR5":
						info.innerHTML = "nie przyjmujemy komentarzy od nieistniejących kont"; break;
					case "ERROR6":
						info.innerHTML = "używasz nieaktualnej wersji archiwizatora. sprawdź w grupie, czy jest dostępna aktualizacja"; break;
					case "OK":
						info.innerHTML = "▲dodano komentarz▲";
						info.href = SERWER + "szukaj.php?mode=zdj&s=" + miniURL; break;
				}
				link.replaceWith(info);
			}
		})
	}, 0);
}


