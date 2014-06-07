
// ==UserScript==
// @name           eRepublik Czech Translation
// @author         Nicneumel
// @description    Czech Translation of eRepublik webGame
// @version        2.0.2
// @match          http://*.erepublik.com/*
// @include        http://*.erepublik.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require        http://sizzlemctwizzle.com/updater.php?id=53457&days=1&show
// ==/UserScript==

var imgServer = "http://nicneumel.zaridi.to/";

	var lang = location.pathname.substr(1,2);
	var ername = $(".user_section > .user_info >a").text();
	//http://blog.darkthread.net/post-2009-01-24-jquery-custom-selector.aspx
	$.extend($.expr[":"], { exact: function(a, i, m) { return (a.textContent || a.innerText || jQuery(a).text() || '').toLowerCase() == m[3].toLowerCase(); } });
	
	
	
	var countries = {
  "Argentina" : "Argentína",
  "Australia" : "Austrálie",
  "Austria" : "Rakousko",
  "Belgium" : "Belgie",
  "Bolivia" : "Bolívie",
  "Bosnia and Herzegovina" : "Bosna a Hercegovina",
  "Brazil" : "Brazílie",
  "Bulgaria" : "Bulharsko",
  "China" : "Čína",
  "Colombia" : "Kolumbie",
  "Croatia" : "Chorvatsko",
  "Canada" : "Kanada",
  "Czech Republic" : "Česká republika",
  "Chile" : "Chile",
  "Denmark" : "Dánsko",
  "Estonia" : "Estonsko",
  "Finland" : "Finsko",
  "France" : "Francie",
  "Germany" : "Německo",
  "Greece" : "Řecko",
  "Hungary" : "Maďarsko",
  "India" : "Indie",
  "Indonesia" : "Indonésie",
  "Ireland" : "Irsko",
  "Israel" : "Izrael",
  "Italy" : "Itálie",
  "Iran" : "Irán",
  "Japan" : "Japonsko",
  "Latvia" : "Lotyšsko",
  "Lithuania" : "Litva",
  "Malaysia" : "Malajsie",
  "Mexico" : "Mexiko",
  "Moldavia" : "Moldavsko",
  "Netherlands" : "Nizozemsko",
  "Norway" : "Norsko",
  "Pakistan" : "Pákistán",
  "Philippines" : "Filipíny",
  "Poland" : "Polsko",
  "Portugal" : "Portugalsko",
  "Romania" : "Rumunsko",
  "Serbia" : "Srbsko",
  "Singapore" : "Singapur",
  "South Africa" : "JAR",
  "South Korea" : "Jižní Korea",
  "Slovakia" : "Slovensko",
  "Slovenia" : "Slovinsko",
  "Switzerland" : "Švýcarsko",
  "Spain" : "Španělsko",
  "Sweden" : "Švédsko",
  "Russia" : "Rusko",
  "Thailand" : "Thajsko",
  "United Kingdom" : "Velká Británie",
  "Ukraine" : "Ukrajina",
  "USA" : "USA",
  "Turkey" : "Turecko",
  "Venezuela" : "Venezuela",
  "North Korea" : "KLDR",
  "World" : "Svět",
  "Resistance Force" : "Odboj",
  "the Resistance Force" : "Odboj"
  }

function getTranslatedCountry(key) {
	if (countries[key]!=undefined) {
	    return countries[key];
	} else {
		return key;
	}
}

var regexps = {};  
regexps["Jan(\\d+)"] = "$1. ledna";
regexps["Feb(\\d+)"] = "$1. února";
regexps["Mar(\\d+)"] = "$1. března";
regexps["Apr(\\d+)"] = "$1. dubna";
regexps["May(\\d+)"] = "$1. května";
regexps["Jun(\\d+)"] = "$1. června";
regexps["Jul(\\d+)"] = "$1. července";
regexps["Aug(\\d+)"] = "$1. srpna";
regexps["Sep(\\d+)"] = "$1. září";
regexps["Oct(\\d+)"] = "$1. října";
regexps["Nov(\\d+)"] = "$1. listopadu";
regexps["Dec(\\d+)"] = "$1. prosince";
regexps["(.+) days ago, (.*)"] = "Před $1 dny $2";
regexps["(.+) hours ago, (.*)"] = "Před $1 hodinami $2";

function getTranslatedDate(key) {
	if (key===null) {
		return key;
	}
	key = key.trim();

	for (var reg in regexps) {
		var rrrr = new RegExp(reg);
		var result = key.match(rrrr);
		if (result!==null) {
		
			return key.replace(rrrr,regexps[reg]);
		}
	}
	return key;
};

	
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/	
// www.erepublik.com/en
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString()=="http://www.erepublik.com/"+lang) {


	var NE_ours = getTranslatedCountry($(".top_display h2 > strong:eq(0)").text());
	var NE_country = getTranslatedCountry($(".top_display h2 > strong:eq(1)").text());
	if (NE_country) {
	   $(".top_display h2").html("V současnosti je <strong>"+ NE_ours+"</strong> ve válce s <strong>"+NE_country+"</strong>. Tak bojujte lemry líný!");
	} 
	// TODO: jak je tohle
	
	$("#country_status").find("h2:contains('under foreign occupation')").html("V současnosti je <strong>"+ NE_ours+"</strong> pod cizí okupací.");	
	$("#country_status").find("h2:contains('is a peaceful place right now')").html("V současnosti je <strong>"+ NE_ours+"</strong> mírumilovné místo.");

		// reports
	$(".zone_news").find("span:contains('Yesterday')").each( function() {
		$(this).text(($(this).text()).replace("Yesterday, ","Včera "));});
	$(".zone_news").find("span:contains('days ago')").each( function() {
		$(this).text(($(this).text()).replace($(this).text(),getTranslatedDate($(this).text())));});
		$(".zone_news").find("span:contains('hours ago')").each( function() {
		$(this).text(($(this).text()).replace($(this).text(),getTranslatedDate($(this).text())));});
		
	$(".zone_news").find("span:contains('our resistance forces liberated')").each( function() {
		$(this).text(($(this).text()).replace("our resistance forces liberated","náš odboj hrdině osvobodil "));
		$(this).text((($(this).text()).replace(" from"," ze spárů ")));});	
		
	$(".zone_news").find("span:contains('our army successfully defended')").each( function() {
		$(this).text(($(this).text()).replace("our army successfully defended","naše armáda úspěšně ubránila "));
		$(this).text((($(this).text()).replace(" against the resistance forces of"," proti odboji z ")));});	
    
	$(".zone_news").find("span:contains('we conquered')").each( function() {
		$(this).text(($(this).text()).replace("we conquered","jsme dobyli "));
		$(this).text((($(this).text()).replace(" from"," ze spárů ")));});    		
	
		//Military campaigns
	$("#homepage_feed").find(".column:eq(0) > h1").text("Vojenské kampaně");
	$("#battle_listing").find("small:contains('Organize a resistance war in')").text("Zorganizuj odboj v");
	$("#battle_listing").find("span:contains('Support')").text("Přidat se");
	$("#battle_listing").find("a:contains('Vote')").text("Dej hlas");
	$("#battle_listing").find("em:contains('supporters')").each( function() {
     $(this).text(($(this).text()).replace(" supporters", " odbojářů"));
  });
	//($("#battle_listing").find("em:contains('supporters')").text()).replace(" supporters", " odbojářů"));
	
	$("#battle_listing").find("h4:contains('Campaign of the day')").text("Kampaň dne");
	$("#battle_listing").find("h4:contains('Allies' Campaigns')").text("Kampaně spojenců");
	var ourCampaign = 0;
	if (!$("#battle_listing").find("h4:eq(0)").text().match("Campaign of the day")) {
     ourCampaign = 1;
  }	   
	$("#battle_listing").find("h4:eq(" + ourCampaign +")").text(NE_ours+" kampaně");
	$("#battle_listing").find("span:exact('Fight')").text("Bojuj!");
	$("#battle_listing").find(".rest > a:eq(0)").text("Vojenské kampaně");
	$("#battle_listing").find(".rest > a:eq(1)").text("Poslední události");	

		//Citizen feeds
	$("#homepage_feed").find(".column:eq(1) > h1").text("Vzkazovník");
	$("#citizen_feed").find("#shout").text("Řekni něco svým kamarádům ;)");
	$("#citizen_feed").find("a[trigger='reply']").text("Okomentuj");
	$("#citizen_feed").find("a[trigger='post_like']").text("Dej hlas");
	$("#citizen_feed").find("a[trigger='post_unlike']").text("Seber hlas");
	$("#citizen_feed").find("a.report").text("Nahlásit");
	$("#citizen_feed").find(".fake_input").text("Napiš svůj komentář...");
	$("#citizen_feed").find(".comment_reply_post").text("Okomentuj");
	$("#citizen_feed").find(".vote_bar").find("em:contains('voted this.')").each( function() {
		$(this).html((((($(this).html()).replace("You","Ty")).replace("and","a")).replace("others","další")).replace("voted this.","dali hlas."));
	});
	$("#citizen_feed").find(".previous_posts > a > span").text("Starší příspěvky");


		//News papers
	$("#news").find("h1:first").text("Noviny");
	$("#articles").find(".mbutton:eq(0) > span").text("První kroky v eRepublik");
	$("#articles").find(".mbutton:eq(1) > span").text("Vojenské rozkazy");
	$("#articles").find(".mbutton:eq(2) > span").text("Analýza boje");
	$("#articles").find(".mbutton:eq(3) > span").text("Politické debaty");
	$("#articles").find(".mbutton:eq(4) > span").text("Finance a byznys");
	$("#articles").find(".mbutton:eq(5) > span").text("Výměna názorů a zábava");
	$("#articles").find(".mbutton:eq(6) > span").text("Novinové předplatné");
	


		//Daily tasks
	$("#daily_tasks_title.title > h1").text("Každodenní rutina");
	$("#daily_tasks > ul > li.work > a").text("Pracuj");
	$("#daily_tasks > ul > li.train > a").text("Trénuj");
	$("#daily_tasks > ul > li.reward > a").text("Odměna");

	$(".post_content").find("h6 > em").each(function check_time() {    
                    
            var str = $(this).text();
            var check = str.split(" ");            
            if(check[2] == 'minutes'){
                $(this).text( check[1]+' minut');
            }else if(check[2] == 'minute' && check[1] == 'one'){
                $(this).text('1 minuta');
            }else if(check[2] == 'hours'){
                $(this).text(check[1]+' hodin');
            }else if(check[2] == 'hour' && check[1] == 'one'){
                $(this).text('1 hodina');
	    }else if(check[2] == 'days'){
                $(this).text(check[1]+' dní');
            }else if(check[1] == 'yesterday'){
                $(this).text('včera');
            }else if(check[2] == 'months'){
                $(this).text(check[1]+' měsíců');
            }else if(check[2] == 'hour' && check[1] == 'one'){
                $(this).text('1 hodina');
            }else if(check[2] == 'years'){
                $(this).text(check[1]+' let');
            }else if(check[2] == 'year' && check[1] == 'one'){
                $(this).text('1 rok');
            }else{
                if(check[1] == 'minutes'){
                $(this).text( check[0]+' minut');
                }else if(check[1] == 'minute' && check[0] == 'one'){
                $(this).text('1 minuta');
                }else if(check[1] == 'hours'){
                $(this).text(check[0]+' hodin');
                }else if(check[1] == 'hour' && check[0] == 'one'){
                $(this).text('1 hodina');
		}else if(check[1] == 'days'){
                $(this).text(check[0]+' dní');
	        }else if(check[1] == 'yesterday'){
                $(this).text('včera');
                }else if(check[1] == 'months'){
                $(this).text(check[0]+' měíců');
                }else if(check[1] == 'hour' && check[0] == 'one'){
                $(this).text('1 hodina');
                }else if(check[1] == 'years'){
                $(this).text(check[0]+' let');
                }else if(check[1] == 'year' && check[0] == 'one'){
                $(this).text('1 rok');
                }
            }
            });	


}
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
// www.erepublik.com/en/main/citizen
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/citizen")!=-1) {
	$("ul.citizen_menu > li:eq(0) > a").text("Přehled");
	$("ul.citizen_menu > li:eq(1) > a").text("Účty");
	$("ul.citizen_menu > li:eq(2) > a").text("Sklad");
	$(".citizen_edit > a > span").html('<img src="http://www.erepublik.com/images/modules/citizenprofile/edit.png">upravit profil');
	$(".citizen_sidebar > div > small:eq(0)").html('Bydliště <a href="http://www.erepublik.com/en/citizen/change-residence" title="">(změnit)</a>');
	$(".citizen_sidebar > div > small:eq(1)").html('Státní příslušnost');
	$(".citizen_second > small:eq(0)").text("Narozeniny v eRepublik");
	var na_rank = $(".citizen_second > small:eq(1) > strong").text();
	$(".citizen_second > small:eq(1)  > a").html("Pořadí");
	$(".citizen_activity > div.place:eq(0) > h3.noactivity").html('<img src="http://www.erepublik.com/images/modules/_icons/no_political_activity.png">Bez strany');
	$(".citizen_activity > div.place:eq(1) > h3.noactivity").html('<img src="http://www.erepublik.com/images/modules/_icons/no_mu.png">Bez jednotky');
	$(".citizen_activity > div.place:eq(2) > h3:contains('No media activity')").html('<img src="http://www.erepublik.com/images/modules/_icons/no_media_activity.png">Bez novin');
	$(".citizen_activity > div.place:eq(0) > h3:contains('Party Member')").html('<img src="http://www.erepublik.com/images/modules/_icons/party_member.png">Člen strany');
	$(".citizen_activity > div.place:eq(0) > h3:contains('Party President')").html('<img src="http://www.erepublik.com/images/modules/_icons/party_president.png">Předseda strany');
	$(".citizen_activity > div.place:eq(0) > h3:contains('Congress Member')").html('<img src="http://www.erepublik.com/images/modules/_icons/congress_member.png">Poslanec');
	$(".citizen_activity > div.place:eq(0) > h3:contains('Country President')").html('<img src="http://www.erepublik.com/images/modules/_icons/country_president.png">Prezident');
	$(".citizen_activity > div.place:eq(1) > h3:contains('Military Unit Member')").html('<img src="http://www.erepublik.com/images/modules/_icons/mu.png">Člen vojenské jednotky');
	$(".citizen_activity > div.place:eq(1) > h3:contains('Military Unit Leader')").html('<img src="http://www.erepublik.com/images/modules/_icons/mu.png">Velitel vojenské jednotky');
	$(".citizen_activity > div.place:eq(2) > h3:contains('Press director')").html('<img src="http://www.erepublik.com/images/modules/_icons/press_director.png">Ředitel novin');
	$(".citizen_activity > div.place:eq(2) > h3:contains('Create newspaper')").html('<img src="http://www.erepublik.com/images/modules/_icons/press_director.png"><a href="/en/create-newspaper">Vytvořit noviny</a>');
	$(".citizen_activity > a.view_friends").text('kouknout na všechny');

	$(".citizen_experience > small").text("Celková úroveň");
	var profile_name = $(".citizen_profile_header > h2").text();
	$(".my_land_profile > p > strong").text(profile_name.trim() + "ova země:");
	$(".my_land_profile > p").each( function() {
	$(this).html(($(this).html()).replace("buildings","budov"));
	});
	$("a.fluid_blue_dark > span").text("Vstoupit");
	
	$(".citizen_content > h3:contains('About me')").html("<br><br><br><br><br>O mě");
	$(".citizen_content > h3:contains('Achievements')").html("<br><br><br><br><br>Úspěchy");
	$(".citizen_content > h3:contains('Military Skills')").html("<br><br><br><br><br>Vojenské schopnosti");

	$(".achiev > li:eq(0) > .hinter > span > p:eq(0) > strong").text("Makáč");
	$(".achiev > li:eq(0) > .hinter > span > p:eq(1)").text("Dřít 30 dní v kuse");
	$(".achiev > li:eq(1) > .hinter > span > p:eq(0) > strong").text("Poslanec");
	$(".achiev > li:eq(1) > .hinter > span > p:eq(1)").text("Vyhrát volby do poslanecké sněmovny");
	$(".achiev > li:eq(2) > .hinter > span > p:eq(0) > strong").text("Prezident");
	$(".achiev > li:eq(2) > .hinter > span > p:eq(1)").text("Vyhrát prezidentské volby");
	$(".achiev > li:eq(3) > .hinter > span > p:eq(0) > strong").text("Novinový magnát");
	$(".achiev > li:eq(3) > .hinter > span > p:eq(1)").text("Dosáhnout 1000 předplatitelů");
	$(".achiev > li:eq(4) > .hinter > span > p:eq(0) > strong").text("Hrdina bitvy");
	$(".achiev > li:eq(4) > .hinter > span > p:eq(1)").text("Dosáhnout největšího vlivu v jedné bitvě");
	$(".achiev > li:eq(5) > .hinter > span > p:eq(0) > strong").text("Hrdina kampaně");
	$(".achiev > li:eq(5) > .hinter > span > p:eq(1)").text("Dosáhnout největšího vlivu v celé kampani");
	$(".achiev > li:eq(6) > .hinter > span > p:eq(0) > strong").text("Hrdina odboje");
	$(".achiev > li:eq(6) > .hinter > span > p:eq(1)").text("Začít odboj a osvobodit region");
	$(".achiev > li:eq(7) > .hinter > span > p:eq(0) > strong").text("Super voják");
	$(".achiev > li:eq(7) > .hinter > span > p:eq(1)").text("Získat 250 síly");
	$(".achiev > li:eq(8) > .hinter > span > p:eq(0) > strong").text("Budovatel společnosti");
	$(".achiev > li:eq(8) > .hinter > span > p:eq(1)").text("Pozvat 10 lidí, kteří to dotáhnou na 10. úroveň");
	$(".achiev > li:eq(9) > .hinter > span > p:eq(0) > strong").text("Žoldák");
	$(".achiev > li:eq(9) > .hinter > span > p:eq(1)").text("Zabít 25 nepřátel pro 50 států");
	$(".citizen_military:eq(0) > strong:first").text("Síla");
	$(".citizen_military:eq(1) > strong:first").text("Hodnost");
	$(".citizen_activity > div.place:eq(0) > div.noborder > span > small:contains('Far-left Wing')").text("Krajní levice");
	$(".citizen_activity > div.place:eq(0) > div.noborder > span > small:contains('Center-left Wing')").text("Střední levice");
	$(".citizen_activity > div.place:eq(0) > div.noborder > span > small:contains('Center Wing')").text("Středová");
	$(".citizen_activity > div.place:eq(0) > div.noborder > span > small:contains('Center-right Wing')").text("Střední pravice");
	$(".citizen_activity > div.place:eq(0) > div.noborder > span > small:contains('Far-right Wing')").text("Krajní pravice");

	$(".warning_message > tbody > tr > td:exact('Only your first 2000 friends will see your wall posts.')").text("只會顯示前200位好友");
	$(".dead").text("mrtvý");

	$(".info_message > tbody > tr > td:exact('Local currency accounts with a value less than 1 are not displayed.')").text("Účty s méně než jednou valutou nejsou zobrazeny.");
	$("h2.special.borderedsep:contains('Edit Profile')").text("Upravit profil");
	$("span.fieldname.goleft:contains('Your description')").text("Tvůj popis");
	$("span.fieldname.goleft:contains('Citizen Avatar')").text("Tvá ikona");
	$("span.fieldname.goleft:contains('Your birthday')").text("Tvé narozeniny");
	$("span.fieldname.goleft:contains('Your email here')").text("Tvůj e-mail");
	$("span.fieldname.goleft:contains('Your password')").text("Heslo");
	$("span#error_for_citizen_file_twin.twin-small").html("Jsou povoleny pouze " + "<strong>.jpeg</strong>" + " soubory. Ikona se nemusí změnit hned,<br> vyzkoušej CTRL+R pro vyčištění paměti prohlížeče.");
	$("span#error_for_citizen_email_twin.twin-small").text("E-mail musí být platný, aby prošla registrace, tak nepodváděj");
	$("span#error_for_password_twin.twin-small").text("Vlož svoje heslo, aby bylo možné provést změny");
	$(".largepadded > input.arrowbutton").attr("value","Provést změny");
	$("a.dotted.change_password").text("Změnit heslo");
}
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/	
// www.erepublik.com/news & article
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if ((document.location.toString().indexOf("/news")!=-1) || (document.location.toString().indexOf("/article/")!=-1) || (document.location.toString().indexOf("/write-article")!=-1)) {
	
	$("h1:exact(' news')").text("Noviny");
	$("h2:exact('Country')").text("Země");
	$("h2:exact('news')").text("noviny");
	$("a:contains('First steps in eRepublik')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_1.png">První kroky v eRepublik');
	$("a:contains('Battle orders')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_2.png">Vojenské rozkazy');
	$("a:contains('Warfare analysis')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_3.png">Analýza boje');
	$("a:contains('Political debates and analysis')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_4.png">Politické debaty');
	$("a:contains('Financial business')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_5.png">Finance a byznys');
	$("a:contains('Social interactions and entertainment')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_5.png">Výměna názorů a zábava');
	$("a:contains('Report article')").text("Nahlásit článek");
	$("a:contains('Report comments')").text("Nahlásit komentář");
	var comment_count = $("a#comments_button_on > span > font").text();
	$("a#comments_button_on > span").html('(<font style="font-weight:bold; color:#fff;">'+comment_count+'</font>) zpráv');
	$("p.padded").text("Tvůj komentář");
	$(".submitpost-core > input[name='commit']").attr('value','Přidat komentář');
	$(".profilemenu > li > a:exact('Write article')").text("Napsat článek");
	$(".profilemenu > li > a:exact('Edit newspaper details')").text("Upravit detaily novin");
	$(".profilemenu > li > a:exact('Subscribe')").text("Přihlásit odběr");
	$(".profilemenu > li > a:exact('Unsubscribe')").text("Odhlásit odběr");
	var sub_count = $(".your_subs > strong").text();
	$(".your_subs").html('Odebíráš <strong>'+sub_count+'</strong> novin<a href="javascript:;" class="fluid_blue_dark" onclick="$j(\'.asubs\').toggle();" title=""><span>Změnit</span></a>');
	
	$(".bordersep > h2:exact('Write article')").text("Napsat článek");
	$(".bordersep > a:exact('Back')").text("Nazpět");
	$(".smallpadded:contains('Title')").text("Nadpis");
	$(".smallpadded:contains('Article')").text("Článek");
	$(".smallpadded:contains('Category')").text("Kategorie");
	$("#error_for_article_name_twin").text("Maximálně 80 znaků");
	$("td:contains('By choosing a category which is relevant to your article')").text("Vybráním odpovídající kategorie umožníš budoucím čtenářům, aby snadněji nalezli tento článek.");
	
	$("#article_category > option:eq(0)").text("Vyber kategorii");
	$("#article_category > option:eq(1)").text("První kroky v eRepublik");
	$("#article_category > option:eq(2)").text("Vojenské rozkazy");
	$("#article_category > option:eq(3)").text("Analýza boje");
	$("#article_category > option:eq(4)").text("Politické debaty");
	$("#article_category > option:eq(5)").text("Finance a byznys");
	$("#article_category > option:eq(6)").text("Výměna názorů a zábava");
	
	$("a:exact('Delete')").text("Smazat");
}

//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
// www.erepublik.com/en/market/
// www.erepublik.com/en/market/job/
// www.erepublik.com/en/market/company
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/market/")!=-1) {


	$("#marketplace").find("h1:exact('Marketplace')").text("Tržiště");
	$("#filters_expanded").find("h4:exact('Select product')").text("Vyber produkt");
	$("#filters_expanded").find("h4:exact('Select quality')").text("Vyber kvalitu");
	$("#productlistings").find("small:exact('Food')").text("Jídlo");
	$("#productlistings").find("small:exact('Weapons')").text("Zbraně");
	$("#productlistings").find("small:exact('House')").text("Domy");
	$("#productlistings").find("small:exact('Moving Tickets')").text("Letenky");
	$("#productlistings").find("small:exact('Food Raw Material')").text("Polotovary k výrobě jídla");
	$("#productlistings").find("small:exact('Weapon Raw Material')").text("Části zbraní");
	$("#productlistings").find("small:exact('Hospital')").text("Nemocnice");
	$("#productlistings").find("small:exact('Defense System')").text("Obranný systém");

	$("#filters_summary").find("small:exact('Health restore')").text("Obnoví životů");
	$("#filters_summary").find("small:exact('Fire Power')").text("Palebná síla");
	$("#filters_summary").find("small:exact('Durability')").text("Použití");
	$("#filters_summary").find("small:exact('Health')").text("Zdraví");
	$("#filters_summary").find("small:exact('Moving Distance')").text("Vzdálenost");
	$("#filters_summary").find("small:exact('Uses/Player')").text("Použití");
	$("#filters_summary").find("small:exact('Defense Budget')").text("Rozpočet na obranu");
	$("#filters_summary").find("span:exact('Change')").text("Změnit");

	$("#marketplace").find("th.m_product").text("Zboží");
	$("#marketplace").find("th.m_provider").text("Prodejce");
	$("#marketplace").find("th.m_stock").text("Zásoby");
	$("#marketplace").find("th.m_price > a").text("Cena");
	$("#marketplace").find("th.m_quantity").text("Kusů");
	$("#marketplace").find("td.m_buy > a > span").text("Kup");
	$("#marketplace").find("td:exact('There are no market offers matching you search.')").text("Neexistuje nabídka vyhovující tomu, co hledáš.");

	$(".attributes > div > b:contains('Health restore')").text("Obnoví životů");
	$(".attributes > div > b:contains('Fire Power')").text("Palebná síla");
	$(".attributes > div > b:contains('Durability')").text("Použití");
	$(".attributes > div > b:contains('Health')").text("Zdraví");
	$(".attributes > div > b:contains('Moving Distance')").text("Vzdálenost");


	if (document.location.toString().indexOf("/market/job/")!=-1) {
		$("#job_market").find("h1:exact('Job Market')").text("Nabídka práce");
		$("#job_market").find("td:contains('You already have a job at')").text("Momentálně pracuješ v ");
		$("#job_market").find("tr.jm_mainh > th:eq(0)").text("Zaměstnavatel");
		$("#job_market").find("tr.jm_mainh > th:eq(1)").text("Společnost");
		$("#job_market").find("tr.jm_mainh > th:eq(3) > a").text("Denní plat");
	}

	if (document.location.toString().indexOf("/market/company/")!=-1) {
		$("#marketplace").find("h1:exact('Companies for sale')").text("Společnosti na prodej");
		$("#marketplace").find("td:exact('There are no companies for sale matching you search.')").text("V nabídce není společnost vyhovující tomu, co hledáš.");
	}
}
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
// www.erepublik.com/en/exchange
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/exchange")!=-1) {
	$("h1:exact('Monetary Market')").text("Směnárna");





}

//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
//www.erepublik.com/en/party/
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/party/")!=-1) {
	$("h2:exact('Info')").text("Informace");
	$("span:exact('Members')").text("Členové");
	$("span:exact('Orientation')").text("Orientace");
	$("a:exact('Show all members')").text("Ukázat všechny členy");
	$(".indent > div > form > span > span > a").text("Odstoupit");
	$("h2:exact('Elections')").text("Volby");
	$(".bordersep:eq(0) > h2").html('<img title="Zvolený členy strany každý měsíc vždy 15tého" class="icon padded tooltip" src="/images/parts/icon_position_politics_partypresident.gif" alt="Icon_position_politics_partypresident">Předseda strany');
	$(".bordersep:eq(2) > h2").html('<img title="Zvolený občany země každý měsíc vždy 25tého" class="icon padded tooltip" src="/images/parts/icon_position_politics_congressman.gif" alt="Icon_position_politics_congressman">Poslanecká sněmovna');
	$(".indent > h2").html('<img title="Zvolený občany země každý měsíc vždy 5tého" class="icon padded tooltip" src="/images/parts/icon_position_politics_president.gif" alt="Icon_position_politics_president">Prezident');
	$("p.smallholder:exact('Party President')").text("Předseda strany");
	var pp_1 = $(".infoholder:eq(2) > p > .special:eq(0)").text();
	var pp_2 = $(".infoholder:eq(2) > p > .special:eq(1)").text();
	$(".indent > .bordersep > .subindent > .infoholder:eq(0) > p").html('Další volby za <span class="special">'+pp_1+'</span> | <span class="special">'+pp_2+'</span> kandidáti');
	var cm_1 = $(".bordersep > .subindent > div > div > p > span.special ").text();
	var cm_2 = $(".bordersep > .subindent > div > p > span.special:eq(2) ").text();
	var cm_3 = $(".bordersep > .subindent > .infoholder > p > span:eq(3)").text();
	$(".bordersep > .subindent > div > div > p:eq(1)").html('<span class="special">'+cm_1+'</span> poslanců ，');
	$(".bordersep > .subindent > div > p:eq(1)").html('tvoří <span class="special">'+cm_2+'</span> poslanecké sněmovny ');
	$(".bordersep > .subindent > .infoholder > p:eq(2)").html('Další volby za <span class="special">'+cm_3+'</span>');
	//$("#candidate_for_congress_template > h2").text('參加議員選舉');
	//$("#candidate_for_congress_template > form > p.padded").text('請在下方填入政見的連結，來向選民說明為何要投你一票');
	var cp_1 = $(".indent > .subindent > div > p:eq(0) > .special").text();
	$("p.smallholder:exact('Winner')").text("Vítěz");
	$(".indent > .subindent > div > p:eq(0)").html('Další volby za <span class="special">'+cp_1+'</span>');
	$("p.smallholder:exact('No candidate proposed')").text("Není navržen žádný kandidát");
	$("a:exact('Show results')").text("Ukaž výsledky");
	$("a::contains('Show candidate list')").text("Ukaž seznam kandidátů");
	$("a::contains('Show candidates list')").text("Ukaž seznam kandidátů");
	$("a:exact('Candidate')").text("Kandidát");
	$("a:contains('Show proposed members')").text("Ukaž navržené členy");
	$("a:exact('Run for congress')").text("Kandidovat na poslance");

}

//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
// www.erepublik.com/en/elections/
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/elections/")!=-1) {
	$("h1:exact('Elections')").text("Volby");
	$("h2:exact('Official Results')").text("Oficiální výsledky");
	

}
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
//www.erepublik.com/en/main/group-
//  www.erepublik.com/en/main/group-show
//   www.erepublik.com/en/main/group-list
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/group-")!=-1) {
	//group-home
	$("body#military_units").find("h1:exact('Military Unit')").text("Vojenská jednotka");
	//$("#military_units_home").find(".info_message").find("strong:exact('You are not a soldier of any Military Unit')").parent().html(
	//	'<strong>您目前不是任何軍團的成員</strong>你可以加入目前現有的軍團，或是自行創立一個自己想要的軍團。<br>加入軍團可以使你跟隨其他團員的腳步並更加團結，並得到更多的戰場影響力加成。<br><a class="wicked" href="http://wiki.erepublik.com/index.php/Military_unit" target="_blank">更多軍團資訊</a>');
	$("#military_units_home").find("span:exact('Create a Military Unit')").text("Vytvořit vojenskou jednotku");
	$("#military_units_home").find("h3:exact('Apply for membership in a Military Unit')").text("Zažádat o členství ve vojenské jednotce");
	
	// group-show,group-list
	if ((document.location.toString().indexOf("/group-show/")!=-1) || (document.location.toString().indexOf("/group-list/")!=-1)) {
		$("#military_group_header").find("strong:exact('Join')").text("Přidat se");
		$("#military_group_header").find("strong:exact('Cancel')").text("Zrušit");
		$("#military_group_header").find("strong:exact('Resign')").text("Rezignovat");
		$("#military_group_header").find("strong:exact('Location:')").text("Země:");
		$("#military_group_header").find("strong:exact('Pending applications:')").text("Nezpracované přihlášky:");
		$("#military_group_header").find("a:contains('View rank')").text("Podívat se na pořadí");
		$("#military_group_header").find("em:exact('Your application is pending')").text("Tvá přihláška se zpracovává");
		$("#military_group_header").find(".details").find("a:exact('Military Unit Profile')").text("Profil vojenské jednotky");
		$("#military_group_header").find(".details").find("a:exact('see all')").text("Podívat se na ně");
		
		$("#group_feeds").find("h3:contains('Feeds of')").text("Zpravodajství");
		$("#group_feeds").find("span:exact('Comment')").text("Okomentovat");
		$("#group_feeds").find("a:exact('Comment')").text("Okomentovat");
		//$("#group_feeds").find(".fake_input").text("留言吧");
		
		$("#group_feeds").find(".info_message").find("td:contains('You must be a member of')").text("Musíš být členem");
		//$("#group_feeds").find(".error_message").find("td:contains('last application has just been sent')").text("對不起，已送出軍團申請，試著加入其它軍團吧");
		$("#group_right_column").find("h3:exact('Leader')").text("Vůdce");
		$("#group_right_column").find("h3:contains('Members')").html(($("#group_right_column").find("h3:contains('Members')").text()).replace("Members","Členové"));
		$("#group_right_column").find(".members").find("a:exact('See all')").text("Podívat se na vše");
		
			//group-list
		$("h3:exact('Members')").text("Členové");
		$("h3:exact('Applications')").text("Přihlášky");
		$("table.listing").find("th:exact('Strength')").text("Síla");
		$("table.listing").find("th:exact('Military Rank')").text("Vojenská hodnost");
		//$("table.listing").find("th.current_location").text("現在位置");
		//$("table.listing").find("th.last_fight").text("最近一場戰鬥");
		$("table.info_message").find("td:contains('There are no pending applications')").text("Nejsou žádné nezpracované přihlášky")
	}
 }
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
// www.erepublik.com/en/main/country/
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/country")!=-1) {
	$("a:exact('Select')").text("Výběr");
	$(".bordersep > h2.goleft.big").text("b");
	$(".vroundbtnh25-end > .vroundbtnh25-core_large:eq(0)").text("Darovat");
	$(".vroundbtnh25-end > .vroundbtnh25-core_large:eq(1)").text("Najít na mapě");
	$(".holder > .ftabs > li:eq(0) > a > span").text("Národní cíle");
	$(".holder > .ftabs > li:eq(1) > a > span").text("Společnost");
	$(".holder > .ftabs > li:eq(2) > a > span").text("Ekonomika");
	$(".holder > .ftabs > li:eq(3) > a > span").text("Politika");
	$(".holder > .ftabs > li:eq(4) > a > span").text("Armáda");
	$(".holder > .ftabs > li:eq(5) > a > span").text("Státní správa");
	$("h2:exact('Current national goals')").text("Aktuální národní cíle");
	$("a:exact('check current status')").text("zkontrolovat aktuální stav");
	$("p.general-text:contains('The elected president has not set any national goals for this month.')").text("Zvolený prezident nestanovil pro tento měsíc žádné národní cíle.");
	$("h2:exact('Monuments achieved')").text("Dosažené monumenty");
	

	if (document.location.toString().indexOf("/country/society/")!=-1) {
		$("h2:exact('Citizens')").text("Občané");
		$("span.fakeheight:eq(0)").text("Aktivních občanů");
		$("span.fakeheight:eq(1)").text("Nových občanů, dnes");
		$("span.fakeheight:eq(2)").text("Žádosti o oobčanství");
		$("span.fakeheight:eq(3)").text("Průměrná úroveň občanů");
		$("span.fakeheight:eq(4)").text("Momentálně online");
		$("span.fakeheight:eq(5)").text("Poplatek občanům");
		$("a.blue_arrow_small > span ").text("Prohlédnut žádosti");
		$("a.details-small").text("detaily");
	}


	if (document.location.toString().indexOf("/country/economy/")!=-1) {
		
		$("h2:exact('Country resources')").text("Národní zdroje");
		$("h2:exact('Treasury')").text("Pokladnice");
		$("h2:exact('Country trading embargoes')").text("Obchodní embarga");
		$("td:contains('This country can trade with any other country in eRepublik.')").text("Tato země může obchodovat s jakoukoliv jinou zemí v eRepublik.");
		$("h2:exact('Taxes')").text("Daně");
		$(".resource_list > thead > tr > th:eq(0)").text("Typ zdroje");
		$(".resource_list > thead > tr > th:eq(1)").text("Regiony");
		$("td > small:exact('Not available')").text("Bez přístupu");
		$("ul.profilemenu > li > a").text("Všechny účty");		
	
		$(".resource_list > tbody > tr > td > span:exact('Fish')").text("Ryba");
		$(".resource_list > tbody > tr > td > span:exact('Grain')").text("Obilí");
		$(".resource_list > tbody > tr > td > span:exact('Fruits')").text("Ovoce");
		$(".resource_list > tbody > tr > td > span:exact('Cattle')").text("Dobytek");
		$(".resource_list > tbody > tr > td > span:exact('Deer')").text("Vysoká");
		$(".resource_list > tbody > tr > td > span:exact('Iron')").text("Železo");
		$(".resource_list > tbody > tr > td > span:exact('Saltpeter')").text("Ledek");
		$(".resource_list > tbody > tr > td > span:exact('Aluminum')").text("Hliník");
		$(".resource_list > tbody > tr > td > span:exact('Oil')").text("Ropa");
		$(".resource_list > tbody > tr > td > span:exact('Rubber')").text("Guma");
		
		$("th:exact('Income Tax')").text("Daň z příjmu");
		$("th:exact('Import Tax')").text("Dovozní daň");
		$("th:exact('VAT')").text("DPH");
		$("span.fakeheight:exact('Food')").text("Jídlo");
		$("span.fakeheight:exact('Weapons')").text("Zbraně");
		$("span.fakeheight:exact('House')").text("Dům");
		$("span.fakeheight:exact('Moving Tickets')").text("Letenky");
		$("span.fakeheight:exact('Food Raw Material')").text("Polotovary k výrobě jídla");
		$("span.fakeheight:exact('Weapon Raw Material')").text("Části zbraní");
		$("span.fakeheight:exact('Hospital')").text("Nemocnice");
		$("span.fakeheight:exact('Defense system')").text("Obranný systém");
		$("h2:exact('Salary')").text("Plat");
		$("span.fakeheight:exact('Minimum')").text("Minimální");
		$("span.fakeheight:exact('Average')").text("Průměrný");
		$("h2:exact('Info')").text("Informace");
		$("h2:exact('Revenues')").text("Příjmy");
	}

	if (document.location.toString().indexOf("/country/politics/")!=-1) {
		$("h2:exact('President')").text("Prezident");
		$("h2:exact('Congress')").text("Poslanecká sněmovna");
		$("span.vroundbtnh25-core:contains('Election results')").text("Výsledky voleb");
		$("span.vroundbtnh25-core:contains('Next elections')").text("Příští volby");
	}
	

	if (document.location.toString().indexOf("/country/military/")!=-1) {
		$("table.info_message > tbody > tr > td").text("Občané této země dostanou 10% bonus k vlivu v boji proti svým úhlavním nepřátelům.");
		$(".nameholder:contains('No current Natural Enemy')").text("Bez Úhlavního nepřítele")
		$("td:contains('There are no resistance wars in this country.')").text("V této zemi nebují žádný odboj.")
		var Our = $("div#profileholder > h1").text();
		$("h2.section:eq(0)").text("Úhlavní nepřítel");
		$("h2.section:eq(1)").html("Aktivní války ve "+Our);
		$("h2.section:eq(2)").html("Aktivní odboje ve "+Our);
		$("h2.section:eq(3)").text("Spojenectví");
		
		$("a.vroundbtnh25-core:contains('details')").text("podrobnosti");
		$("a.vroundbtnh25-core:contains('All wars')").text("Všechny války");
		$("a.vroundbtnh25-core:contains('All resistance wars')").text("Všechny odboje");
		$("a.vroundbtnh25-core:contains('All Alliances')").text("Všechny spojenectví");
	}

	if (document.location.toString().indexOf("country-administration")!=-1) {
	$(".vroundbtnh25-end > .vroundbtnh25-core_large:eq(0)").text("Najít na mapě");
		$("span:exact('You are not a president or a congress member in this country.')").text("Nejsi prezident ani poslanec v této zemi.");
		$("h2:exact('Law proposals')").text("Navržené zákony");
		$("a.vroundbtnh25-core:contains('details')").text("podrobnosti");
		
		$("a:exact('Natural Enemy')").text("Úhlavní nepřítel");
		$("a:exact('Alliance')").text("Spojenectví");
		$("a:exact('Donate')").text("Darovat");
		$("a:exact('Issue Money')").text("Vytisknout peníze");
		$("a:contains('Tax change')").each( function() {$(this).text(($(this).text()).replace("Tax change","Změna daní"));});
		$("a:exact('Minimum Wage')").text("Minimální mzda");
		$("a:exact('Peace Proposal')").text("Navržení míru");
		$("a:exact('Trading Embargo')").text("Obchodní embargo");
		$("a:exact('Buy Constructions')").text("Zakoupit budovu");
		$("a:exact('New Citizen Fee')").text("Poplatek novým hráčům");
		$("a:exact('New Citizen Message')").text("Zpráva pro nové hráče");
		$("a:exact('President Impeachment')").text("Sesazení presidenta");
		
		$("tr > td:exact('Pending')").each( function() {$(this).html(($(this).html()).replace("Pending","Čekající"));});
		$("tr > td:exact('Accepted')").each( function() {$(this).html(($(this).html()).replace("Accepted","Přijaté"));});
		$("tr > td:exact('Rejected')").each( function() {$(this).html(($(this).html()).replace("Rejected","Zamítnuté"));});
	
	}	
	
}
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
//www.erepublik.com/en/economy/inventory
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/economy/inventory")!=-1) {
	$("#inventory_overview").find("h2 > span").text("Sklad");
	$(".items_holder").find("h4:eq(0)").text("Hotové výrobky");
	$(".items_holder").find("h4:eq(1)").text("Zdroje k výrobě");
	$(".items_holder").find("h4:eq(2)").html("Sbírky"+
		"<img src=\"http://www.erepublik.com/images/modules/storage/info.png\" alt=\"\" id=\"storage_tip\" original-title=\"Předměty, které lze sbírat, lze najít na bojišti. Bojuj a můžeš náhodně najít některé z nich.\">");
	$(".collection_list").find("ul > li:eq(0)").attr("title","Základ");
	$(".collection_list").find("ul > li:eq(1)").attr("title","Hlaveň");
	$(".collection_list").find("ul > li:eq(2)").attr("title","Zaměřovač");
	$(".collection_list").find("ul > li:eq(3)").attr("title","Raketa M6A3");
	$(".collection_list").find("ul > li:eq(4)").attr("title","Spoušť");
	$(".collection_list").find("a.assemble").text("Složit");
	$(".bazooka").find(".details > strong").text("Bazuka");
	$(".bazooka").find(".details > small").text("Na jeden úder zničí nepřítele");
	$(".bazooka").find(".details > p:eq(0)").attr("title","Počet použití");
	$(".bazooka").find(".details > p:eq(1)").attr("title","Zranění");
	$(".bazooka").find(".details > p:eq(1) > span").text("5000 / úder");

	$("a.inventory_sell").find("strong").text("Prodej");
	$("a.inventory_sell").find("small").text("zadat novou nabídku");
	$("a.inventory_buy").find("strong").text("Nákup");
	$("a.inventory_buy").find("small").text("přes tržiště");
	$("#sell_offers").find("th.offers_product > strong").text("Výrobek");
	$("#sell_offers").find("th.offers_quantity > strong").text("Počet");
	$("#sell_offers").find("th.offers_price > .relative > strong").text("Cena za kus");
	$("#sell_offers").find("th.offers_market > .relative > strong").text("Tržiště");
	$("#sell_offers").find("th.offers_market > .relative > small > a:exact('Buy license')").text("Koupit licenci");
	$("#sell_offers").find("th.offers_action > a > span").text("Přidat na tržiště");
	$("a.delete_offer").attr("title","Zrušit nabídku");
	$(".buy_market_shell").find("a#buy_market_license > span").text("Koupit obchodní licenci");
	$(".buy_market_shell").find("span#buy_license_country_name").text("Výběr země");	
}
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
// www.erepublik.com/en/wars
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/wars")!=-1) {
	$("h1:exact('Wars')").text("Války");
	$(".bordersep > h2:exact('War types')").text("Typ války");
	$("div#war_type_filter > .extended-menus > .core > ul > li:eq(0) > a").html("<img src=\"/images/parts/icon_warlist_war.gif\" class=\"flag\" alt=\"\">"+"Dobyvačná válka");
	$("div#war_type_filter > .extended-menus > .core > ul > li:eq(1) > a").html("<img src=\"/images/parts/icon_warlist_resistancewar.gif\" class=\"flag\" alt=\"\">"+"Odboj");
	$("div#war_type_filter > .extended-menus > .core > ul > li:eq(2) > a").html("<img src=\"/images/parts/icon_warlist_allwars.gif\" class=\"flag\" alt=\"\">"+"Všechny typy");
	$(".bordersep > h2:exact('War status')").text("Stav války");
	$("div#war_status_filter > .extended-menus > .core > ul > li:eq(0) > a").html("<img src=\"/images/parts/icon_warlist_active.gif\" class=\"flag\" alt=\"\">"+"Aktivní války");
	$("div#war_status_filter > .extended-menus > .core > ul > li:eq(1) > a").html("<img src=\"/images/parts/icon_warlist_inactive.gif\" class=\"flag\" alt=\"\">"+"Ukončené války");
	$("div#war_status_filter > .extended-menus > .core > ul > li:eq(2) > a").html("<img src=\"/images/parts/icon_warlist_allstates.gif\" class=\"flag\" alt=\"\">"+"Všechny války");
	$(".bordersep > h2:exact('Countries involved')").text("Zainteresované státy");
	$(".warholder > .middle > a:exact('details')").text("podrobnosti");

	if (document.location.toString().indexOf("/wars/show/")!=-1) {
		$("h1:exact('War')").text("Válka");
		$("div.listing > a.join > span:exact('Join')").text("Přidat se");
		$("div.listing > a.join > span:exact('Join Resistance')").text("Přidat se k odboji");
		$("div.listing > a.reversed > span").html("Přidat se k " + ($("div.country.right_side > div > h3").text()));
		
		$("table.info_message > tbody > tr > td:exact('This war is no longer active.')").text("Tato válka již není aktivní.");
		$("table.warning_message > tbody > tr > td").text((($("table.warning_message > tbody > tr > td").text()).replace("is about to attack.","útok brzy začne")));

		jQuery.each(($("div.listing.done > small:contains('started')")), function() {$(this).text((($(this).text()).replace("started on","odstartováno ")).replace(", ended on"," ukončeno "))});
		jQuery.each(($("div.listing.done > small:contains('Conquered')")), function() {$(this).html(($(this).html()).replace("Conquered by","Dobyto : "))});
		jQuery.each(($("div.listing.done > small:contains('Secured')")), function() {$(this).html(($(this).html()).replace("Secured by","Zabezpečeno : "))});
	}
}

//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
//www.erepublik.com/en/military/battlefield/
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/military/")!=-1) {
	//戰場頁面
	if (document.location.toString().indexOf("/military/battlefield/")!=-1) {
		$("div#pvp > a.help_button").attr("title","Otevřít pomoc");		
		$("div#pvp > a#go_stats.battle_stats_button").attr("title","Prohlédnout bojové statistiky");
		$("div#pvp > div#pvp_actions > div.action_holder > a#fight_btn.fight_btn").text("Bojuj!");
		$("div#pvp > div#pvp_header > div#attackerHero").attr("title","Nepřátelský hrdina");
		$("div#pvp > div#pvp_header > div#defenderHero").attr("title","Náš hrdina");
		$("div#pvp > div#pvp_header > div.domination > div.domibar > div#left_points").attr("title","Naše body");
		$("div#pvp > div#pvp_header > div.domination > div.domibar > div#right_points").attr("title","Nepřátelské body");
		
		$("div#total_damage > small:exact('My influence')").text("Můj vliv");
		$(".battle_stats > .top > h3:exact('Battle statistics')").text("Statistika boje");
		$(".battle_stats > .repeat > .content > .lister > .head > .one:exact('Citizen')").text("Občan");
		$(".battle_stats > .repeat > .content > .lister > .head > .two:exact('Kills')").text("Zabití");
		$(".battle_stats > .repeat > .content > .lister > .head > .three:exact('War influence')").text("Bojový vliv");
		$("div#battle_end.wide_pop.counter > a.green_go:contains('See other campaigns')").text("Podívat se na další kampaně");
		$("div#timer > div > strong:exact('Are you still there?')").text("Jsi tu stále?");
		$("div#timer > div > a > span:contains('still here')").text("stále tady");
		//$("div#options_box > p.info").text("你需要移動至其中一個國家，才能參與這場戰鬥。是否現在就出發呢?");
		//$("div#options_box > a#change_location.fluid_blue_dark > span").text("移動所在地");
		//$("div#options_box > a#nope.plain").text("不用了, 謝謝");
	}
	//查看其它戰役
	if (document.location.toString().indexOf("/military/campaigns")!=-1) {
		$("h1:exact('Military campaigns')").text("Válečné kampaně");
		$("#battle_listing").find("h4:eq(0)").text("Kampaň dne");
		$("#battle_listing").find("h4:eq(1)").text("Další kampaně");
		$("#battle_listing").find("a.victory_flag").text("Vítězství");
		$("span:contains('Fight')").text("Bojuj!");
		$("span:contains('Victory')").text("Vítězství");
	}
}
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
//我的領域 www.erepublik.com/land/
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/land/")!=-1) {

	var LandRes = $("h1:contains('My Land') > div.land_resources").html();
	$("h1:contains('My Land')").html("Má země" + "<div class=\"land_resources\">" + LandRes + "</div>");
		
	$("h1:contains('Land of')").html(($("h1:contains('Land of')").text()).replace("Land of","") +"Země ");
	
	$("a.plain_blue_small > span:contains('+50 Health Building')").text("+50 Zdravotní centrum");
	$("a.plain_blue_small > span:contains('+100 Health Building')").text("+100 Zdravodní centrum");
	$("a.plain_blue_small > span:contains('Town Center')").text("Radnice");
	$("a.plain_blue_small > span:contains('Marketplace')").text("Tržiště");
	$("a.plain_blue_small > span:contains('Training grounds')").text("Cvičiště");
	$("a.plain_blue_small > span:contains('Climbing Center')").text("Lezecké centrum");
	$("a.plain_blue_small > span:contains('Shooting Range')").text("Střelnice");
	$("a.plain_blue_small > span:contains('Special Forces Center')").text("Centrum speciálních jednotek");
	$("a.plain_blue_small > span:contains('Storage (capacity: 1000)')").text("Skladiště (kapacita: 1000)");
	$("a.plain_blue_small > span:contains('Storage (capacity: 9000)')").text("Skladiště (kapacita: 9000)");
	$("a.plain_blue_small > span:contains('Storage (capacity: 20000)')").text("Skladiště (kapacita: 20000)");

	//$("a.plain.upgrade.tipser.health").attr("title","升級城鎮中心");
	$("a.plain.upgrade.tipser").attr("title","Vylepšit firmu");
	$("a.plain.manage.tipser").attr("title","Spravovat firmu");
	$("a.plain.options.tipser").attr("title","Nastavení firmy");
	$("a.plain.resign.tipser").attr("title","Odejít");
	//$("a.main.build > span").attr("title","Postavit firmu");
	$("a.buyLand.main.empty > span").attr("title","Abys mohl postavit novou firmu, musíš koupit tento pozemek.");
}
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
// economy.erepublik.com/en/company/create
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/company/create")!=-1) {

	$("body#create").find("h1:first").text("Založení nové firmy");
	$(".create_building").find("h3:first").text("Vyber typ firmy");
	$(".create_building").find("h3#second_title").html("Vyber firmu");
	$(".create_links").find("span:exact('Food Raw Materials')").text("Polotovary k výrobě jídla");
	$(".create_links").find("span:exact('Weapon Raw Materials')").text("Části zbraní");
	$(".create_links").find("span:exact('Factories')").text("Továrny");
	$(".create_links").find("span:exact('Storage')").text("Sklady");
	$(".create_links").find("span:exact('Training Facilities')").text("Tréninková centra");

	$(".create_building").find("li.food").find("strong:exact('Grain Farm')").text("Obilná farma");
	$(".create_building").find("li.food").find("strong:exact('Fruit Orchard')").text("Ovocný sad");
	$(".create_building").find("li.food").find("strong:exact('Fishery')").text("Rybářství");
	$(".create_building").find("li.food").find("strong:exact('Cattle Farm')").text("Prasečák");
	$(".create_building").find("li.food").find("strong:exact('Hunting Lodge')").text("Lovecká chata");

	$(".create_building").find("li.weapon").find("strong:exact('Iron Mine')").text("Důl na železo");
	$(".create_building").find("li.weapon").find("strong:exact('Oil Rig')").text("Ropný vrt");
	$(".create_building").find("li.weapon").find("strong:exact('Aluminium Mine')").text("Důl na hliník");
	$(".create_building").find("li.weapon").find("strong:exact('Saltpeter Mine')").text("Důl na ledek");
	$(".create_building").find("li.weapon").find("strong:exact('Rubber Plantation')").text("Plantáž na sběr gumy");

	$(".create_building").find("li.factories").find("strong:exact('Food Factory')").text("Továrna na jídlo");
	$(".create_building").find("li.factories").find("strong:exact('Weapons Factory')").text("Továrna na zbraně");
	$(".create_building").find("li.storage").find("strong:exact('Normal Storage')").text("Malý sklad");
	$(".create_building").find("li.storage").find("strong:exact('Large Storage')").text("Velký sklad");	
	$(".create_building").find("li.train").find("strong:exact('Climbing Center')").text("Lezecké centrum");
	$(".create_building").find("li.train").find("strong:exact('Shooting Range')").text("Střelnice");
	$(".create_building").find("li.train").find("strong:exact('Special Forces …')").text("Speciální jednotky ...");
	
	$("form#companyCreateForm").find("a#construct > span").text("Postavit");
}



//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
//Common strings
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/

	//menu images
	$("#menu ul li#menu2 a").css("background-image","url(\""+imgServer+"/map-erepublik-logged.png\")");
	$("#menu ul li#menu3 a").css("background-image","url(\""+imgServer+"/map-erepublik-logged.png\")");
	$("#menu ul li#menu4 a").css("background-image","url(\""+imgServer+"/map-erepublik-logged.png\")");
	$("#menu ul li#menu5 a").css("background-image","url(\""+imgServer+"/map-erepublik-logged.png\")");
	$("#menu ul li#menu6 a").css("background-image","url(\""+imgServer+"/map-erepublik-logged.png\")");
	
	//the rest of menu
	$("#menu > ul > li#menu4 > ul > li > a:contains('Marketplace')").text("Tržiště");
	$("#menu > ul > li#menu4 > ul > li > a:contains('Monetary')").text("Směnárna");
	$("#menu > ul > li#menu4 > ul > li > a:contains('Job')").text("Nabídka práce");
	$("#menu > ul > li#menu4 > ul > li > a:contains('Companies for sale')").text("Společnosti na prodej");
	$("#menu > ul > li#menu5 > ul > li:exact('World Map') > a").text("Mapa světa");
	$("#menu > ul > li#menu5 > ul > li:exact('News') > a").text("Noviny");
	$("#menu > ul > li#menu5 > ul > li:exact('My Party') > a").text("Moje strana");
	$("#menu > ul > li#menu5 > ul > li:exact('Elections') > a").text("Volby");
	$("#menu > ul > li#menu5 > ul > li:exact('Military Unit') > a").text("Vojenská jednotka");
	$("#menu > ul > li#menu5 > ul > li:exact('Country Administration') > a").text("Správa země");
	$("#menu > ul > li#menu5 > ul > li:exact('Invite Friends') > a").text("Pozvat přátele");
	$("#menu > ul > li#menu5 > ul > li > a:exact('My Organizations')").text("Mé organizace");
	$("#menu > ul > li#menu5 > ul > li > a:exact('Badges')").text("Reklama");
	$("#menu > ul > li#menu5 > ul").append("<li><a id=\"donateNicneumel\" href=\"http://www.erepublik.com/en/economy/donate-money/1270318\">Potěšit překladatele</a></li>");
	
	//TODO: zprovoznit
	$(".search_field").attr("value","Hledej osobu");

	//Info panel
	var Experiencelevel = $("div#experienceTooltip > strong").eq(0).text();
	var Experiencepoints = $("div#experienceTooltip > strong").eq(1).text();
	var Nextlevelat = $("div#experienceTooltip > strong").eq(2).text();
	$("div#experienceTooltip").html(
					"<img src=\"http://www.erepublik.com/images/modules/sidebar/yellow_arrow_tip.png\" class=\"tip\" alt=\"\" />"+
					"Úroveň: <strong>"+ Experiencelevel +"</strong><br />"+
					"Zkušeností: <strong>"+ Experiencepoints +"</strong><br />"+
					"Další úroveň: <strong>"+ Nextlevelat +"</strong><br />"
					);
	$("div#eatFoodTooltip > p:eq(0)").text("Sežereš tolik jídla, kolik se do tebe vejde, podmínkou ale je, abys ho měl na skladě.");
	var healthe_limit = $(".tooltip_health_limit").text();
	$("div#eatFoodTooltip > p:eq(1)").html("Můžeš si obnovit <big>"+healthe_limit+"</big> zdraví.");
	$("div#eatFoodTooltip > p:eq(1) > big").attr("class","tooltip_health_limit");
	var next_100 = $("div#eatFoodTooltip > small#foodResetHoursContainer > em").text();
  $("div#eatFoodTooltip > small#foodResetHoursContainer").html("Dalších 100 jednotek zdraví za: <em>"+ next_100 +"</em>");
  $("div#eatFoodTooltip > small#foodResetHoursContainer > em").attr("id","pop_timer");
  
  $(".gold_amount").find("span:exact('Gold')").text("Zlato");
  
  var current_date = $("div#clock > span.date").text();
  $("div#clock > span.date").text(getTranslatedDate(current_date));
  var current_day = $("div#clock > span.eday > strong").text();
  $("div#clock > span.eday").html("Den <strong>"+current_day+"</strong>");

	$("#foodText").text("Najíst se");
	$("#sidebar_missions > .content > b:first").text("Mise");
	$(".logout").text("Odhlásit se");
	
	//footer
	$("#footer > p > a:eq(0)").text("Fórum");
	$("#footer > p > a:eq(1)").text("Wiki");
	$("#footer > p > a:eq(2)").text("Blog");
	$("#footer > p > a:eq(3)").text("Tisk");
	$("#footer > p > a:eq(4)").text("Kontakt");
	$("#footer > p > a:eq(5)").text("Práce");
	$("#footer > p > a:eq(6)").text("Podmínky služby");
	$("#footer > p > a:eq(7)").text("Soukromí");
	$("#footer > p > a:eq(8)").text("Partnerský program");
	$("#footer > p > a:eq(9)").text("Zákony eRepublik");
	
	
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
//PIN www.erepublik.com/en/pin
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
if (document.location.toString().indexOf("/pin")!=-1) {
	$("h2:exact('Please insert your Personal Security PIN')").text("Prosím vložte váš osobní bezpečnostní PIN kód");
	$("input[value ='Unlock']").attr("value","Odblokovat");
	$("span#error_for_pin").text("Něco se posralo");
}
