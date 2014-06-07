// ==UserScript==
// @name           Ghost Trappers DIRECT links
// @namespace      GT
// @description    Extra Direct Link For GT
// @include        http://www.ghost-trappers.com/fb/*
// @exclude 	   http://www.ghost-trappers.com/fb/hunt.php*
// @exclude 	   http://www.ghost-trappers.com/fb/live_feed.php*
// @version        5.3
// ==/UserScript==





// Extra Menu For HQ
if ( document.getElementsByClassName("menuHQ subMenuPage hidden")[0]) 
{

	div1 = document.getElementsByClassName("menuHQ subMenuPage hidden")[0];
    div1.style.backgroundColor = "#E6CAA3";
    div1.innerHTML = 
		"<a id=\"hq_first\" class=\"menulinkImgMapPos0\" href=\"gearstore.php?\" target=\"_self\"></a>" +
		"<a href=\"scotch_intern.php?\" target=\"_self\"><img height=\"22\" width=\"148\" src=\"res/hq_bar_text.jpg\" title=\"Bar\"></img></a>" + 
		"<a href=\"scotch_intern.php?type=q\" target=\"_self\"><img height=\"22\" width=\"148\" src=\"res/hq_qsection_text.jpg\" title=\"Q-section\"></img></a>"+
		"<a href=\"scotch_intern.php?type=lab\" target=\"_self\"><img height=\"22\" width=\"148\" src=\"res/hq_lab_text.jpg\" title=\"Lab\"></img></a>"+
		"<a href=\"scotch_intern.php?type=office\" target=\"_self\"><img height=\"22\" width=\"148\" src=\"res/hq_office_text.jpg\" title=\"Office\"></img></a>"+	

		"<a id=\"hq_nineth\" class=\"menulinkImgMapPos1\" href=\"scotch_ninth_floor.php?\" target=\"_self\"></a>"+
		"<a href=\"scotch_ninth_floor.php?page=shop&subPage=misc\" target=\"_self\"><img height=\"22\" width=\"148\" src=\"res/ninth_floor/entry/shop_text.jpg\" title=\"shop_Misc\" ></img></a>"+
        "<a href=\"scotch_ninth_floor.php?page=shop&subPage=badges\" target=\"_self\"><img height=\"22\" width=\"148\" src=\"res/ninth_floor/entry/shop_text.jpg\" title=\"shop_Badge\" ></img></a>"+
        "<a href=\"scotch_ninth_floor.php?page=shop&subPage=diviadPoints\" target=\"_self\"><img height=\"22\" width=\"148\" src=\"res/ninth_floor/entry/shop_text.jpg\" title=\"shop_Diviad Points\" ></img></a>"+
        "<a href=\"scotch_ninth_floor.php?page=tradePost\" target=\"_self\"><img height=\"22\" width=\"148\" src=\"res/ninth_floor/entry/tradepost_text.jpg\" title=\"Tradepost\"></img></a>"+
        "<a href=\"scotch_ninth_floor.php?page=talents\" target=\"_self\"><img height=\"22\" width=\"148\" src=\"res/ninth_floor/entry/training_room_text.jpg\" title=\"Talent Tree\"></img></a>"+
        "<a href=\"scotch_ninth_floor.php?page=talents&subPage=earnedSkillPoints\" target=\"_self\"><img height=\"22\" width=\"148\" src=\"res/ninth_floor/entry/training_room_text.jpg\" title=\"Earned Skill Points\"></img></a>"+
        "<a href=\"scotch_ninth_floor.php?page=exhibition\" target=\"_self\"><img height=\"22\" width=\"148\" src=\"res/ninth_floor/entry/exhibition_text.jpg\" title=\"Exhibition\"></img></a>"+	

        "<a id=\"hq_eleventh\" class=\"menulinkImgMapPos2\" href=\"ghost_words.php\" target=\"_self\"></a>"+
        
        "<div class=\"subMenuFooter\"></div>"

;}


//Extra Menu for travel

if ( document.getElementsByClassName("menuTravelling subMenuPage hidden")[0]) 
{

	div2 = document.getElementsByClassName("menuTravelling subMenuPage hidden")[0];
	div2.align="right";
	div2.innerHTML = "";

	locsub = document.createElement("div");

	loc1_0 = document.createElement("div");loc1_00 = document.createElement("div");
	loc1_1 = document.createElement("div");loc1_2 = document.createElement("div");
	loc1_3 = document.createElement("div");loc1_4 = document.createElement("div");
    loc1_5 = document.createElement("div"); 

	loc2_0 = document.createElement("div");loc2_00 = document.createElement("div");
	loc2_1 = document.createElement("div");loc2_2 = document.createElement("div");
	loc2_3 = document.createElement("div");loc2_4 = document.createElement("div");

	loc3_0 = document.createElement("div");loc3_00 = document.createElement("div");
	loc3_1 = document.createElement("div");loc3_2 = document.createElement("div");
	loc3_3 = document.createElement("div");loc3_4 = document.createElement("div");

	loc4_0 = document.createElement("div");loc4_00 = document.createElement("div");
	loc4_1_1 = document.createElement("div");loc4_1_2 = document.createElement("div");
	loc4_1_3 = document.createElement("div");loc4_2_1 = document.createElement("div");
	loc4_2_2 = document.createElement("div");loc4_2_3 = document.createElement("div");
	loc4_3_1 = document.createElement("div");loc4_3_2 = document.createElement("div");
	loc4_3_3 = document.createElement("div");

	loc5_0 = document.createElement("div");
    loc5_1_1 = document.createElement("div"); loc5_1_2 = document.createElement("div"); 
    loc5_2_1 = document.createElement("div"); loc5_2_2 = document.createElement("div"); 
    loc5_3_1 = document.createElement("div"); loc5_3_2 = document.createElement("div"); 

    loc6_0 = document.createElement("div");
    loc6_1 = document.createElement("div");
    
		loc1_0.innerHTML =  "<a id=\"travel_region1\" class=\"menulinkImgMapPos0\" href=\"travel.php?to_r=1\" target=\"_self\"></a>";
		loc1_1.innerHTML =  "<a id=\"travel_region1\" class=\"menulinkImgMapPos0\" href=\"travel.php?&to=6&page=0\" target=\"_self\">Castle McCloud</a>";
		loc1_2.innerHTML =  "<a id=\"travel_region1\" class=\"menulinkImgMapPos0\" href=\"travel.php?&to=11&page=0\" target=\"_self\">Loch Trool</a>";
		loc1_3.innerHTML =  "<a id=\"travel_region1\" class=\"menulinkImgMapPos0\" href=\"travel.php?&to=13&page=0\" target=\"_self\">Glenluck Abbey</a>";
		loc1_4.innerHTML =  "<a id=\"travel_region1\" class=\"menulinkImgMapPos0\" href=\"travel.php?&to=14&page=3&page=1\" target=\"_self\">Castle McDougan</a>";
        loc1_5.innerHTML = "<strong><a id=\"travel_region1\" class=\"menulinkImgMapPos0\" href=\"travel.php?&to=55&page=1\" target=\"_self\">NIGHTMARE MODE</a></strong>"; 


		loc2_0.innerHTML =  "<a id=\"travel_region2\" class=\"menulinkImgMapPos1\" href=\"travel.php?to_r=2\" target=\"_self\"></a>";
		loc2_1.innerHTML =  "<a id=\"travel_region2\" class=\"menulinkImgMapPos1\" href=\"travel.php?&to=16&page=0\" target=\"_self\">Castle McWallace</a>";
		loc2_2.innerHTML =  "<a id=\"travel_region2\" class=\"menulinkImgMapPos1\" href=\"travel.php?&to=18&page=0\" target=\"_self\">Kilwittig House</a>";
		loc2_3.innerHTML =  "<a id=\"travel_region2\" class=\"menulinkImgMapPos1\" href=\"travel.php?&to=19&page=0\" target=\"_self\">Loch Muir</a>";
		loc2_4.innerHTML =  "<a id=\"travel_region2\" class=\"menulinkImgMapPos1\" href=\"travel.php?&to=20&page=3\" target=\"_self\">Castle McKenny</a>";

		loc3_0.innerHTML =  "<a id=\"travel_region3\" class=\"menulinkImgMapPos2\" href=\"travel.php?to_r=3\" target=\"_self\"></a>";
		loc3_1.innerHTML =  "<a id=\"travel_region3\" class=\"menulinkImgMapPos2\" href=\"travel.php?&to=23&page=0\" target=\"_self\">Wellsington tower</a>";
		loc3_2.innerHTML =  "<a id=\"travel_region3\" class=\"menulinkImgMapPos2\" href=\"travel.php?&to=24&page=0\" target=\"_self\">Dormont cemetery</a>";
		loc3_3.innerHTML =  "<a id=\"travel_region3\" class=\"menulinkImgMapPos2\" href=\"travel.php?&to=25&page=0\" target=\"_self\">Castle McDonohan</a>";
		loc3_4.innerHTML =  "<a id=\"travel_region3\" class=\"menulinkImgMapPos2\" href=\"travel.php?&to=26&page=3\" target=\"_self\">Count church</a>";

		loc4_0.innerHTML =  "<a id=\"travel_region4\" class=\"menulinkImgMapPos3\" href=\"travel.php?to_r=4\" target=\"_self\"></a>";
		loc4_1_1.innerHTML =  "<a id=\"travel_region4\" class=\"menulinkImgMapPos3\" href=\"travel.php?&to=35\" target=\"_self\">Kirkyard cemetery</a>";
		loc4_1_2.innerHTML =  "<a id=\"travel_region4\" class=\"menulinkImgMapPos3\" href=\"travel.php?&to=36\" target=\"_self\">Kirkyard Morgue</a>";
		loc4_1_3.innerHTML =  "<a id=\"travel_region4\" class=\"menulinkImgMapPos3\" href=\"travel.php?&to=37\" target=\"_self\">Kirkyard Crypt</a>";

		loc4_2_1.innerHTML =  "<a id=\"travel_region4\" class=\"menulinkImgMapPos3\" href=\"travel.php?&to=39\" target=\"_self\">Castle</a>";
		loc4_2_2.innerHTML =  "<a id=\"travel_region4\" class=\"menulinkImgMapPos3\" href=\"travel.php?&to=40\" target=\"_self\">Library</a>";
		loc4_2_3.innerHTML =  "<a id=\"travel_region4\" class=\"menulinkImgMapPos3\" href=\"travel.php?&to=41\" target=\"_self\">Pinnacle</a>";

		loc4_3_1.innerHTML =  "<a id=\"travel_region4\" class=\"menulinkImgMapPos3\" href=\"travel.php?&to=43\" target=\"_self\">Sanatorium</a>";
		loc4_3_2.innerHTML =  "<a id=\"travel_region4\" class=\"menulinkImgMapPos3\" href=\"travel.php?&to=44\" target=\"_self\">Medical station</a>";
		loc4_3_3.innerHTML =  "<a id=\"travel_region4\" class=\"menulinkImgMapPos3\" href=\"travel.php?&to=45\" target=\"_self\">High security section</a>";

		loc5_0.innerHTML =  "<a id=\"travel_region5\" class=\"menulinkImgMapPos4\" href=\"travel.php?to_r=5\" target=\"_self\"></a>";
        loc5_1_1.innerHTML = "<a id=\"travel_region5\" class=\"menulinkImgMapPos4\" href=\"travel.php?&to=47\" target=\"_self\">Sternham castle</a>"; 
        loc5_1_2.innerHTML = "<a id=\"travel_region5\" class=\"menulinkImgMapPos4\" href=\"travel.php?&to=48\" target=\"_self\">Show room</a>"; 
		loc5_2_1.innerHTML = "<a id=\"travel_region5\" class=\"menulinkImgMapPos4\" href=\"travel.php?&to=49\" target=\"_self\">Scarwood forest</a>"; 
		loc5_2_2.innerHTML = "<a id=\"travel_region5\" class=\"menulinkImgMapPos4\" href=\"travel.php?&to=54\" target=\"_self\">Dreadmoor</a>"; 
		loc5_3_1.innerHTML = "<a id=\"travel_region5\" class=\"menulinkImgMapPos4\" href=\"travel.php?&to=58\" target=\"_self\">Glenclose village</a>"; 
		loc5_3_2.innerHTML = "<a id=\"travel_region5\" class=\"menulinkImgMapPos4\" href=\"travel.php?&to=59\" target=\"_self\">Glenclose mine</a>"; 

        loc6_0.innerHTML =  "<a id=\"travel_region6\" class=\"menulinkImgMapPos5\" href=\"travel.php?to_r=6\" target=\"_self\"></a>";
        loc6_1.innerHTML =  "<a id=\"travel_region6\" class=\"menulinkImgMapPos5\" href=\"travel.php?&to=62\" target=\"_self\">Graymalkin castle</a>"; 
    
		locsub.innerHTML = "<div class=\"subMenuFooter\"></div>" ;

		loc1_00.innerHTML =  "<a id=\"travel_region1\" class=\"menulinkImgMapPos0\" href=\"travel.php?&to=21&page=0\" target=\"_self\">Castle McIngverson</a>";
		loc2_00.innerHTML =  "<a id=\"travel_region2\" class=\"menulinkImgMapPos1\" href=\"travel.php?&to=22&page=0\" target=\"_self\">Castle McDoyle</a>";
		loc3_00.innerHTML =  "<a id=\"travel_region3\" class=\"menulinkImgMapPos2\" href=\"travel.php?&to=30&page=0\" target=\"_self\">Castle McMahon</a>";
		loc4_00.innerHTML =  "<a id=\"travel_region4\" class=\"menulinkImgMapPos3\" href=\"travel.php?&to=38&page=3\" target=\"_self\">McWallace winter residence</a>";


		exptext = document.getElementById('profile_experience').textContent;
		expnum = exptext.replace(/\,/g,'');

		if( expnum>=0 )
		{	div2.appendChild(loc1_0);div2.appendChild(loc1_1);}
		if(expnum>2000)
		{	div2.appendChild(loc1_2);}
		if(expnum>8000)
		{	div2.appendChild(loc1_3);}
		if(expnum>150000)
		{	div2.appendChild(loc1_4);}
        if(expnum>1200000) 
        {   div2.appendChild(loc1_5);  }
		if(expnum>80000)
		{	div2.appendChild(loc2_0);div2.appendChild(loc2_1);}
		if(expnum>200000)
		{	div2.appendChild(loc2_2);}
		if(expnum>400000)
		{	div2.appendChild(loc2_3);}
		if(expnum>700000)
		{	div2.appendChild(loc2_4);}
		if(expnum>1200000)
		{	div2.appendChild(loc3_0);div2.appendChild(loc3_1);}
		if(expnum>1800000)
		{	div2.appendChild(loc3_2);}
		if(expnum>2600000)
		{	div2.appendChild(loc3_3);}
		if(expnum>4000000)
		{	div2.appendChild(loc3_4);}
		if(expnum>6500000)
		{	div2.appendChild(loc4_0);div2.appendChild(loc4_1_1);div2.appendChild(loc4_1_2);div2.appendChild(loc4_1_3);}
		if(expnum>10000000)
		{	div2.appendChild(loc4_2_1);div2.appendChild(loc4_2_2);div2.appendChild(loc4_2_3);}
		if(expnum>15000000)
		{	div2.appendChild(loc4_3_1);}
		if(expnum>17500000)
		{	div2.appendChild(loc4_3_2);}
		if(expnum>20000000)
		{	div2.appendChild(loc4_3_3);}		
		if(expnum>25000000) 
        {   div2.appendChild(loc5_0);div2.appendChild(loc5_1_1); div2.appendChild(loc5_1_2); div2.appendChild(loc5_2_1); } 
		if(expnum>50000000) 
        {   div2.appendChild(loc5_2_2);}
    	if(expnum>75000000) 
        {   div2.appendChild(loc5_3_1); div2.appendChild(loc5_3_2); } 
        if(expnum>50000000 ) 
        {   div2.appendChild(loc6_0);div2.appendChild(loc6_1);}

//div2.appendChild(loc1_00);
//div2.appendChild(loc2_00);
//div2.appendChild(loc3_00);
//div2.appendChild(loc4_00);

	div2.appendChild(locsub);
}

//*******************INFOBOX********************//


if ( document.getElementById("cg_information_popup")) 
{

	div5 = document.getElementById("cg_information_popup");
	div5.style.background="none";	
    //div5.style.background="url(res/talenttree/talent_tree_hintergrund_v2.png)";	
    //div5.style.background.size = "200px 200px";
	div5.style.backgroundColor = "#E6CAA3";
	div5.style.border = "2px solid #936843";
	div5.style.height= "700px";
	
	div5.innerHTML = 
	"<div id=\"originalCG\" >"+
	"All agents can contribute to a common goal and in most cases, the efforts of all of you are needed to complete it! The status bar which tells you how many ghosts have already been caught is updated every 15 minutes (<a onclick=\"closeCGPopup();originalCG.style.display='none'\"><i>close</i></a>).</div>"+

//********************BAIT*********************//

	"<div id=\"bait_table\" style=\"display:none\" >"+
	"<a href=\"setup.php?type=whisky&arm=9\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_01_nessys.jpg\" title=\"Nessy's Golden Reserve\"/></a> "+   
	"<a href=\"setup.php?type=whisky&arm=39\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_01_nessys_distiller_edition.jpg\" title=\"Nessy's platinum edition\"/></a>"+
	"<a href=\"setup.php?type=whisky&arm=76\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_nessy_supreme.jpg\" title=\"Nessy's supreme edition\"/></a>"+
	"<a href=\"setup.php?type=whisky&arm=53\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_shadetouch_green.jpg\" title=\"Shadetouch green\"/></a> "+ 
    "<a href=\"setup.php?type=whisky&arm=54\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_shadetouch_blue.jpg\" title=\"Shadetouch blue\"/></a> "+
    "<a href=\"setup.php?type=whisky&arm=55\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_shadetouch_purple.jpg\" title=\"Shadetouch purple\"/></a></br> "+ 
        
        "<img height=\"5\" width=\"330\" src=\"res/journal_line.png\"></img><br>"+  
        
    "<a href=\"setup.php?type=whisky&arm=4\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_silverstar_green.jpg\" title=\"Silver star green\"/></a> "+   
	"<a href=\"setup.php?type=whisky&arm=5\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_moonshadow_green.jpg\" title=\"Moonshadow green\"/></a> "+   
	"<a href=\"setup.php?type=whisky&arm=7\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_moormist_green.jpg\" title=\"Moormist green\"/></a> "+   
	"<a href=\"setup.php?type=whisky&arm=8\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_glengreens_green.jpg\" title=\"Glengreens green\"/></a> "+   
	"<a href=\"setup.php?type=whisky&arm=14\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_whisperwind_green.jpg\" title=\"Whisperwind green\"/></a><br>"+
    
    "<a href=\"setup.php?type=whisky&arm=49\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_beltofvenus.jpg\" title=\"Belt of Venus\"/></a> "+   
	"<a href=\"setup.php?type=whisky&arm=49\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_condensed_halo.jpg\" title=\"Condensed halo\"/></a> "+   
	"<a href=\"setup.php?type=whisky&arm=20\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_01_highlandpride.jpg\" title=\"Highland Pride\"/></a> "+   
	"<a href=\"setup.php?type=whisky&arm=26\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_massbier.jpg\" title=\"Ma? malt juice\"/></a> "+   
	"<a href=\"setup.php?type=whisky&arm=45\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_pumkin_punch.jpg\" title=\"Pumpkin punch\"/></a> "+ 
    "<a href=\"setup.php?type=whisky&arm=57\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/avalanche_inventory.jpg\" title=\"Avalanche\"/></a><br> "+
        
    "<a href=\"setup.php?type=whisky&arm=51\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/liquid_ember_inventory.jpg\" title=\"Liquid ember\"/></a> "+ 
    "<a href=\"setup.php?type=whisky&arm=73\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_holy_water.jpg\" title=\"Holy water\"/></a> "+ 
    "<a href=\"setup.php?type=whisky&arm=63\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_secret_eye_green_inventory.jpg\" title=\"SE Green\"/></a> "+ 
    "<a href=\"setup.php?type=whisky&arm=64\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_secret_eye_yellow_inventory.jpg\" title=\"SE Yellow\"/></a> "+ 
    "<a href=\"setup.php?type=whisky&arm=65\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_secret_eye_purple_inventory.jpg\" title=\"SE Purple\"/></a> <br>"+
    
    	"<img height=\"5\" width=\"330\" src=\"res/journal_line.png\"></img><br>"+      
    
    "<a href=\"setup.php?type=whisky&arm=28\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_green_goddess.jpg\" title=\"Green goddess\"/></a> "+   
	"<a href=\"setup.php?type=whisky&arm=25\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_devildriver.jpg\" title=\"Devil driver\"/></a> "+  
    "<a href=\"setup.php?type=whisky&arm=38\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_nightcap.jpg\" title=\"Nightcap\"/></a> "+   
    "<a href=\"setup.php?type=whisky&arm=42\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_witch_hunt.jpg\" title=\"Witch hunt\"/></a> "+
    "<a href=\"setup.php?type=whisky&arm=47\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_red_nightmare.jpg\" title=\"Red nightmare\"/></a> "+ 
    "<a href=\"setup.php?type=whisky&arm=50\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_doublefeature.jpg\" title=\"Double feature\"/></a></br> "+  
        
        "<img height=\"5\" width=\"330\" src=\"res/journal_line.png\"></img><br>"+
        
    "<a href=\"setup.php?type=whisky&arm=52\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/crimson_mary_inventory.jpg\" title=\"Crimson mary\"/></a> "+  
	"<a href=\"setup.php?type=whisky&arm=56\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_choco_shock.jpg\" title=\"Choco shock\"/></a> "+   
    "<a href=\"setup.php?type=whisky&arm=58\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/north_star_inventory.jpg\" title=\"North star\"/></a> "+   
    "<a href=\"setup.php?type=whisky&arm=60\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_lovepotion.jpg\" title=\"Love potion\"/></a> "+   
    "<a href=\"setup.php?type=whisky&arm=61\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_brainbuster_inventory.jpg\" title=\"Brainbuster\"/></a> "+   
    "<a href=\"setup.php?type=whisky&arm=62\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_dark_side_of_the_moon_inventory.jpg\" title=\"DSotM\"/></a> "+   
    "<a href=\"setup.php?type=whisky&arm=66\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_light_of_day.jpg\" title=\"Light of day\"/></a> "+   
    "<a href=\"setup.php?type=whisky&arm=67\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_scottish_coffee.jpg\" title=\"Scottish coffee\"/></a> "+   
    "<a href=\"setup.php?type=whisky&arm=68\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_meteor_storm.jpg\" title=\"Meteor storm\"/></a> "+   
    "<a href=\"setup.php?type=whisky&arm=69\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_amber_dreams.jpg\" title=\"Amber dreams\"/></a> "+   
    "<a href=\"setup.php?type=whisky&arm=70\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_arthurs_ale.jpg\" title=\"Arthurs ale\"/></a> "+   
    "<a href=\"setup.php?type=whisky&arm=71\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_red_dawn.jpg\" title=\"Red dawn\"/></a> "+   
    "<a href=\"setup.php?type=whisky&arm=74\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_gargoyle_mead.jpg\" title=\"Gargoyle mead\"/></a> "+   
    "<a href=\"setup.php?type=whisky&arm=75\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_conundrum.jpg\" title=\"Conundrum\"/></a> "+   
    "<a href=\"setup.php?type=whisky&arm=77\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_volcano.jpg\" title=\"Volcano\"/></a> "+       
        
        
        "<img height=\"5\" width=\"330\" src=\"res/journal_line.png\"></img><br>"+

	"<a href=\"setup.php?type=whisky&arm=15\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_apple_zapper.jpg\" title=\"Apple zapper\"/></a> "+   
	"<a href=\"setup.php?type=whisky&arm=22\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_blacktartan.jpg\" title=\"Black tartan\"/></a>"+
	"<a href=\"setup.php?type=whisky&arm=41\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_blackwidow.jpg\" title=\"Black widow\"/></a> "+   
	"<a href=\"setup.php?type=whisky&arm=21\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_braveheart.jpg\" title=\"Braveheart\"/></a> "+   
	"<a href=\"setup.php?type=whisky&arm=30\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_cherry_bomb.jpg\" title=\"Cherry bomb\"/></a> "+   
	"<a href=\"setup.php?type=whisky&arm=34\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_corpse_reviver.jpg\" title=\"Corpse reviver\"/></a> "+   
	"<a href=\"setup.php?type=whisky&arm=44\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_frozen_mist.jpg\" title=\"Frozen mist\"/></a>"+   
  	"<a href=\"setup.php?type=whisky&arm=17\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_oldfashioned.jpg\" title=\"Gentleman\"/></a> <br>"+   
	"<a href=\"setup.php?type=whisky&arm=16\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_jackfrost.jpg\" title=\"Jack jones\"/></a> "+   
	"<a href=\"setup.php?type=whisky&arm=29\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_jesperian_way.jpg\" title=\"Jesperian way\"/></a> "+   
	"<a href=\"setup.php?type=whisky&arm=48\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_lucky_punch.jpg\" title=\"Lucky punch\"/></a> "+   
	"<a href=\"setup.php?type=whisky&arm=36\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_midnight_rider.jpg\" title=\"Midnight rider\"/></a> "+   
	"<a href=\"setup.php?type=whisky&arm=35\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_midnight_smash.jpg\" title=\"Midnight smash\"/></a>"+
	"<a href=\"setup.php?type=whisky&arm=33\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_mistletoe.jpg\" title=\"Mistletoe\"/></a> "+   
	"<a href=\"setup.php?type=whisky&arm=31\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_painkiller.jpg\" title=\"Old admiral\"/></a> "+    
	"<a href=\"setup.php?type=whisky&arm=24\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/misc_ruby_tuesday.jpg\" title=\"Ruby tuesday\"/></a></br> "+   
	
        
    "<a href=\"setup.php?type=whisky&arm=6\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_silverstar_blue.jpg\" title=\"Silver star blue\"/></a> "+   
	"<a href=\"setup.php?type=whisky&arm=10\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_moonshadow_blue.jpg\" title=\"Moonshadow blue\"/></a> "+   
	"<a href=\"setup.php?type=whisky&arm=11\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_moormist_blue.jpg\" title=\"Moormist blue\"/></a> "+   
	"<a href=\"setup.php?type=whisky&arm=12\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_glengreens_blue.jpg\" title=\"Glengreen blue\"/></a> "+   
	"<a href=\"setup.php?type=whisky&arm=18\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_whisperwind_blue.jpg\" title=\"Whisperwind blue\"/></a><br>"+
        
	"<a href=\"setup.php?type=whisky&arm=23\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_silverstar_purple.jpg\" title=\"Silver star purple\"/></a> "+   
	"<a href=\"setup.php?type=whisky&arm=32\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_moonshadow_purple.jpg\" title=\"Moonshadow purple\"/></a> "+   
	"<a href=\"setup.php?type=whisky&arm=37\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_moormist_purple.jpg\" title=\"Moormist purple\"/></a> "+   
	"<a href=\"setup.php?type=whisky&arm=43\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/glengreens_purple_inventory.jpg\" title=\"Glengreen purple\"/></a> "+   
	"<a href=\"setup.php?type=whisky&arm=46\" target=\"_self\" ><img height=\"40\" width=\"33\" src=\"res/store/whisky_whisperwind_purple.jpg\" title=\"Whisperwind purple\"/></a><br>"+
        
	"<img height=\"40\" width=\"33\" src=\"res/blank.gif\"/> <br>"+

	"(<a onclick=\"closeCGPopup();bait_table.style.display='none';originalCG.style.display='block'\"><i>close</i></a>)</div>"+
//********************CONTRACT*********************//

	"<div id=\"contract_table\" style=\"display:none\" >"+
	"Traditional<br>"+
	"<a href=\"setup.php?type=contract&arm=1\" target=\"_self\"><img src=\"res/contracts/james_sinclair_01.jpg\" width=\"33\" height=\"40\" title=\"IJS\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=5\" target=\"_self\"><img src=\"res/contracts/brown_veteran_ghost_hunter_01.jpg\" width=\"33\" height=\"40\" title=\"IGB\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=15\" target=\"_self\"><img src=\"res/contracts/the_waitress_01.jpg\" width=\"33\" height=\"40\" title=\"BTW\"  ></img></a> "+
	"<a href=\"setup.php?type=contract&arm=21\" target=\"_self\"><img src=\"res/contracts/darkblade_01.jpg\" width=\"33\" height=\"40\" title=\"Selena Darkblade\"  ></img></a> "+
	"<a href=\"setup.php?type=contract&arm=27\" target=\"_self\"><img src=\"res/contracts/the_butler_01.jpg\" width=\"33\" height=\"40\" title=\"JTB\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=31\" target=\"_self\"><img src=\"res/contracts/the_frisian_01.jpg\" width=\"33\" height=\"40\" title=\"STF\"  ></img></a> "+
	"<a href=\"setup.php?type=contract&arm=39\" target=\"_self\"><img src=\"res/contracts/arlington_steele_01.jpg\" width=\"33\" height=\"40\" title=\"MAS\"  ></img></a> <br>"+
	
    "<a href=\"setup.php?type=contract&arm=  \" target=\"_self\"><img src=\"res/contracts/rainbow_unicorn_01.jpg\" width=\"33\" height=\"40\" title=\"Rainbow unicorn\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=37\" target=\"_self\"><img src=\"res/contracts/hyronimus_quatermain_01.jpg\" width=\"33\" height=\"40\" title=\"SHQ\"  ></img></a> "+
	"<a href=\"setup.php?type=contract&arm=53\" target=\"_self\"><img src=\"res/contracts/michelle_gunther_01.jpg\" width=\"33\" height=\"40\" title=\"SMG\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=69\" target=\"_self\"><img src=\"res/contracts/benedict_01.jpg\" width=\"33\" height=\"40\" title=\"FB\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=74\" target=\"_self\"><img src=\"res/contracts/cho_sung_01.jpg\" width=\"33\" height=\"40\" title=\"CSM\"  ></img></a> "+
	"<a href=\"setup.php?type=contract&arm=80\" target=\"_self\"><img src=\"res/contracts/dougal_01.jpg\" width=\"33\" height=\"40\" title=\"DTG\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=90\" target=\"_self\"><img src=\"res/contracts/olinda_primrose_01.jpg\" width=\"33\" height=\"40\" title=\"Olinda Primrose the quiet\"  ></img></a> <br>"+
   
	"High Tech<br>"+
	"<a href=\"setup.php?type=contract&arm=2\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/daniel_roy_01.jpg\" title=\"MDR\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=8\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/sir_overdrive_01.jpg\" title=\"SOD\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=12\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"http://wiki.ghost-trappers.com/images/thumb/Contracts-Tracy_Queen.jpg/70px-Contracts-Tracy_Queen.jpg\" title=\"Tracy Queen\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=16\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/fuerchtegott_nussbaum_01.jpg\" title=\"DFN\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=19\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/clyde_throckmorton_01.jpg\" title=\"Clyde Throckmorton\"  ></img></a> "+
	"<a href=\"setup.php?type=contract&arm=20\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/chapham_01.jpg\" title=\"Nurse Chapham\"  ></img></a> "+
	"<a href=\"setup.php?type=contract&arm=30\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/albert_zweistein_01.jpg\" title=\"PAZ\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=33\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/phil_fox_01.jpg\" title=\"CPF\"  ></img></a> <br>"+
    
    "<a href=\"setup.php?type=contract&arm=41\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/dana_hunter_01.jpg\" title=\"Dana Hunter\"  ></img></a> "+
	"<a href=\"setup.php?type=contract&arm=50\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/eli_mcgrommit_01.jpg\" title=\"Prodigy Eli McGrommit\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=57\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/droid_01.jpg\" title=\"Coffincracker drone\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=62\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/ybercorn_01.jpg\" title=\"Cybercorn\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=75\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/narcisco_ramires_01.jpg\" title=\"NR\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=84\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/galahad_the_glorious_01.jpg\" title=\"GTG\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=86\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/gareth_the_highly_intelligent_01.jpg\" title=\"Gareth the highly intelligent\"  ></img></a> <br>"+    
    
	"Arcane<br>"+
	"<a href=\"setup.php?type=contract&arm=6\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/bryan_bigglesworth_01.jpg\" title=\"NBB\"  ></img></a> "+ 
    "<a href=\"setup.php?type=contract&arm=11\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/bastian_shaw_01.jpg\" title=\"MBS\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=17\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/nakamura_01.jpg\" title=\"SN\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=23\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/wilhelmina_01.jpg\" title=\"Countess Wilhelmina\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=34\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/peter_powers_01.jpg\" title=\"PPP\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=38\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/the_sorcerer_01.jpg\" title=\"Balthasar\"  ></img></a> <br>"+
	
	"<a href=\"setup.php?type=contract&arm=55\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/ampire_hunter_01.jpg\" title=\"VVH\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=65\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/starsworn_unicorn_01.jpg\" title=\"Starsworn unicorn\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=68\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/chloe_queen_01.jpg\" title=\"CQ\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=76\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/marabelle_the_sorceress_01.jpg\" title=\"MTS\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=81\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/tamara_01.jpg\" title=\"TTD\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=87\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/dreamer_elder_fairy_01.jpg\" title=\"Dreamer, elder fairy\"  ></img></a> <br>"+
	
	"Bio<br>"+
	"<a href=\"setup.php?type=contract&arm=4\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/emma_parker_01.jpg\" title=\"ZEP\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=14\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/the_shaman_01.jpg\" title=\"GST\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=22\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/orelle_01.jpg\" title=\"Lorelle\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=26\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/the_druid_01.jpg\" title=\"RTD\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=32\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/the_viking_01.jpg\" title=\"JTV\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=51\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/rodrick_greenthump_01.jpg\" title=\"Gardener Rodrick Greenthump\"  ></img></a> <br>"+
    
    "<a href=\"setup.php?type=contract&arm=13\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/white_lady_01.jpg\" title=\"White lady\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=36\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/ict_huntress_01.jpg\" title=\"EPH\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=56\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/lder_treeman_01.jpg\" title=\"OET\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=64\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/verdant_unicorn_01.jpg\" title=\"Verdant unicorn\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=77\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/kruella_the_voodo_witch_01.jpg\" title=\"KVW\"  ></img></a> "+
	"<a href=\"setup.php?type=contract&arm=88\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/steve_tamer_of_unicorns_01.jpg\" title=\"Steve, tamer of unicorns\"  ></img></a> <br>"+
	
	"Infernal<br>"+
	"<a href=\"setup.php?type=contract&arm=\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"http://wiki.ghost-trappers.com/images/Contracts-Alysha_she-devil.jpg\" title=\"Alysha, she-devil\"  ></img></a> "+
	"<a href=\"setup.php?type=contract&arm=45\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/pippin_the_exorcist_01.jpg\" title=\"Father Pippin\"  ></img></a> "+
	"<a href=\"setup.php?type=contract&arm=44\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/yendri_01.jpg\" title=\"Maya Yendri\"  ></img></a> "+
	"<a href=\"setup.php?type=contract&arm=28\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/alistair_crow_01.jpg\" title=\"MAC\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=49\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/esca_01.jpg\" title=\"Beastmaster Esca\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=52\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/nero_jones_01.jpg\" title=\"Firefighter Nero Jones\"  ></img></a> <br>"+
    "<a href=\"setup.php?type=contract&arm=54\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/orcerer_apprentice_01.jpg\" title=\"HSA\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=61\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/infernicorn_01.jpg\" title=\"Infernicorn\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=78\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/brannon_the_barbarian_01.jpg\" title=\"BTB\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=79\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/christy_01.jpg\" title=\"CTC\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=85\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/the_white_knight_01.jpg\" title=\"TWK\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=  \" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/maggie_may_the_medium_01.jpg\" title=\"Maggie May the medium\"  ></img></a> <br>"+
    
	

	"Magic Circle<br>"+
    "<a href=\"setup.php?type=contract&arm=73 \" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/prismatic_unicorn_01.jpg\" title=\"Prismatic Unicorn\"  ></img></a> "+
	"<a href=\"setup.php?type=contract&arm=3\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/alithia_winterborn_01.jpg\" title=\"SAW\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/rubikski_01.jpg\" title=\"Ekaterina Rubikski\"  ></img></a> "+
	"<a href=\"setup.php?type=contract&arm=10\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/ilevere_01.jpg\" title=\"Vilevere\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=18\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/guardian_01.jpg\" title=\"EG\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=24\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/chip_dale_01.jpg\" title=\"ACD\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=29\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/the_dragonslayer_01.jpg\" title=\"STD\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=35\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/chairman_01.jpg\" title=\"TCM\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=42\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/dancing_skeleton_01.jpg\" title=\"DS\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=43\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/the_red_01.jpg\" title=\"Cora the red\"  ></img></a> "+
	"<a href=\"setup.php?type=contract&arm=48\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/elizabeth_millford_01.jpg\" title=\"PEM\"  ></img></a> "+
	"<a href=\"setup.php?type=contract&arm=59\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/the_lumberjack_01.jpg\" title=\"JTL\"  ></img></a> "+
	"<a href=\"setup.php?type=contract&arm=66\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/celestial_unicorn_01.jpg\" title=\"CEU\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=67\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/snow_unicorn_01.jpg\" title=\"SNU\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=70\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/clarkson_01.jpg\" title=\"KC-Green\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=71\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/peterson_01.jpg\" title=\"PP-Yellow\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=72\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/louis_01.jpg\" title=\"LL-Purple\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=82\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/menu_no_6_01.jpg\" title=\"Menu no. 6\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=83\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/the_wizard_01.jpg\" title=\"MTW\"  ></img></a> "+
    "<a href=\"setup.php?type=contract&arm=  \" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/contracts/herbert_von_spookenstein_01.jpg\" title=\"HVS\"  ></img></a> "+
   
	"(<a onclick=\"closeCGPopup();contract_table.style.display='none';originalCG.style.display='block'\"><i>close</i></a>)</div>"+

//********************COMPANION*********************//

	"<div id=\"companion_table\" style=\"display:none\">"+


	"(<a onclick=\"closeCGPopup();companion_table.style.display='none';originalCG.style.display='block'\"><i>close</i></a>)</div>"+

//********************MAGIC CIRCLE*********************//

	"<div id=\"magiccircle_table\" style=\"display:none\" >"+
	"<center><br>"+
    "<a href=\"setup.php?type=magic_circle&arm=2\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_white.jpg\" title=\"White candle\"  ></img></a> "+
	"<a href=\"setup.php?type=magic_circle&arm=3\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_ornated.jpg\" title=\"Ornate candle\"  ></img></a> "+
	"<a href=\"setup.php?type=magic_circle&arm=4\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_silver.jpg\" title=\"Silver candle\"  ></img></a> "+
	"<a href=\"setup.php?type=magic_circle&arm=6\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_violet.jpg\" title=\"Violet candle\"  ></img></a> "+
	"<a href=\"setup.php?type=magic_circle&arm=7\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_red.jpg\" title=\"White candle\" ></img></a> "+
	"<a href=\"setup.php?type=magic_circle&arm=23\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_quartz.jpg\" title=\"Quartz crystal array\" ></img> </a> "+
	"<a href=\"setup.php?type=magic_circle&arm=9\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_twilight.jpg\" title=\"Twilight candle\"  ></img></a> "+
	"<a href=\"setup.php?type=magic_circle&arm=10\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_wisp.jpg\" title=\"Dance-of-the-wisps\"  ></img></a> "+
	"<a href=\"setup.php?type=magic_circle&arm=11\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_ghostink.jpg\" title=\"Ghost ink\"  ></img></a> "+
	"<a href=\"setup.php?type=magic_circle&arm=24\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_lavalamps.jpg\" title=\"Lava lamps\"  ></img></a> "+
	"<a href=\"setup.php?type=magic_circle&arm=12\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_dragon.jpg\" title=\"Dragon breath\" ></img></a> "+
	"<a href=\"setup.php?type=magic_circle&arm=14\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_phosphor.jpg\" title=\"White phosphor\"></img></a> "+
	"<a href=\"setup.php?type=magic_circle&arm=16\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_starlight.jpg\" title=\"Starlight\"  ></img></a> "+    
	"<a href=\"setup.php?type=magic_circle&arm=20\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_magictorches.jpg\" title=\"Magic torches\"  ></img></a> "+
	"<a href=\"setup.php?type=magic_circle&arm=25\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_littlestonehenge.jpg\" title=\"Little stonehenge\"></img></a> "+
	"<a href=\"setup.php?type=magic_circle&arm=22\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_burningbottles.jpg\" title=\"Burning bottles\"  ></img></a> "+       
	"<a href=\"setup.php?type=magic_circle&arm=27\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_fireflies.jpg\" title=\"Bottled fireflies\" /img></a> "+
	"<a href=\"setup.php?type=magic_circle&arm=29\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_laughingskull.jpg\" title=\"Laughing skulls\"  ></img></a> "+
	"<a href=\"setup.php?type=magic_circle&arm=\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_lightningcoil.jpg\" title=\"Lightning coils\"></img></a> "+
	"<a href=\"setup.php?type=magic_circle&arm=32\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_phoenix.jpg\" title=\"Flight of the Phoenix\"  ></img></a> "+
	"<a href=\"setup.php?type=magic_circle&arm=33\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_volcano.jpg\" title=\"Volcano candle\"  ></img></a> "+
	"<a href=\"setup.php?type=magic_circle&arm=35\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_roseglazed.jpg\" title=\"Roseglazed candles\"  ></img></a> "+
  	"<a href=\"setup.php?type=magic_circle&arm=37\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_forestcandles.jpg\" title=\"Roseglazed candles\"  ></img></a> "+
    "<a href=\"setup.php?type=magic_circle&arm=41\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_monolith.jpg\" title=\"Roseglazed candles\"  ></img></a> "+
    "<a href=\"setup.php?type=magic_circle&arm=\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_amber.jpg\" title=\"Roseglazed candles\"  ></img></a> "+
    "<a href=\"setup.php?type=magic_circle&arm=44\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_mininglights.jpg\" title=\"Roseglazed candles\"  ></img></a> "+
    "<a href=\"setup.php?type=magic_circle&arm=\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_arthurscandelabra.jpg\" title=\"Roseglazed candles\"  ></img></a> "+
    "<a href=\"setup.php?type=magic_circle&arm=52\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_tartancandles.jpg\" title=\"Tartan candles\"  ></img></a> "+
    "<a href=\"setup.php?type=magic_circle&arm=\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_saltire.jpg\" title=\"Saltire flags\"  ></img></a> "+
        
        "<img height=\"5\" width=\"330\" src=\"res/journal_line.png\"></img><br>"+
        
    "<a href=\"setup.php?type=magic_circle&arm=13\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_uvlight.jpg\" title=\"UV light\"  ></img></a> "+
    "<a href=\"setup.php?type=magic_circle&arm=18\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_golden.jpg\" title=\"Golden candles\" ></img></a> "+
    "<a href=\"setup.php?type=magic_circle&arm=15\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_ectoplasmaticgoo.jpg\" title=\"Ectoplasmatic goo\"  ></img></a> "+
    "<a href=\"setup.php?type=magic_circle&arm=21\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_neon.jpg\" title=\"Neon lights\"  ></img></a> "+
    "<a href=\"setup.php?type=magic_circle&arm=49\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_gargoylecandles.jpg\" title=\"Gargoyle candles\"  ></img></a> "+
        
        "<img height=\"5\" width=\"330\" src=\"res/journal_line.png\"></img><br>"+
        
	"<a href=\"setup.php?type=magic_circle&arm=8\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_black.jpg\" title=\"Black candle\"  ></img></a> "+
	"<a href=\"setup.php?type=magic_circle&arm=17\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_ivory.jpg\" title=\" Ivory candles\" </img></a> "+
	"<a href=\"setup.php?type=magic_circle&arm=19\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_runic.jpg\" title=\"Runic candles\"  ></img></a> "+
	"<a href=\"setup.php?type=magic_circle&arm=26\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_waxpyramids.jpg\" title=\"Wax pyramids\"></img></a> "+
	"<a href=\"setup.php?type=magic_circle&arm=28\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_blackdragonsbreath.jpg\" title=\"Black dragon's breath\"  ></img></a> "+
	"<a href=\"setup.php?type=magic_circle&arm=31\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_pumpkin.jpg\" title=\"Pumpkin candles\"  ></img></a> <br>"+

    "<a href=\"setup.php?type=magic_circle&arm=34\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_planar.jpg\" title=\"Planar candles\"  ></img></a> "+
    "<a href=\"setup.php?type=magic_circle&arm=38\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_chocolatecandles.jpg\" title=\"Chocolate candles\"  ></img></a> "+
    "<a href=\"setup.php?type=magic_circle&arm=40\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_lunar.jpg\" title=\"Lunar candles\"  ></img></a> "+
    "<a href=\"setup.php?type=magic_circle&arm=42\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_diaboliccandle.jpg\" title=\"Diabolic candles\"  ></img></a> "+
    "<a href=\"setup.php?type=magic_circle&arm=47\" target=\"_self\"><img height=\"40\" width=\"33\" src=\"res/store/magiccircle_holycandles.jpg\" title=\"Holy candles\"  ></img></a> "+
    

	"<br><br>(<a onclick=\"closeCGPopup();magiccircle_table.style.display='none';originalCG.style.display='block'\"><i>close</i></a>)</center></div>"+

//********************MECHANISM*********************//
	
	"<div id=\"mech_table\" style=\"display:none\" >"+
	"Traditional<br>"+
	"<a href=\"setup.php?type=mechanism&arm=72\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Goo cannon\" src=\"res/store/mechanism_goocannon.jpg\"></img></a>-------"+    
    "<a href=\"setup.php?type=mechanism&arm=2\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Suck-o-matic 3000\" src=\"res/store/mechanism_suckomatric.jpg\"></img> </a> "+
	"<a href=\"setup.php?type=mechanism&arm=3\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Punch-in-a-box\" src=\"res/store/mechanism_punchinabox.jpg\"></img> </a> "+
	"<a href=\"setup.php?type=mechanism&arm=4\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Piper jukebox\" src=\"res/store/mechanism_piperjukebox.jpg\"></img> </a> "+
	"<a href=\"setup.php?type=mechanism&arm=9\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Skeleton coach\" src=\"res/store/mechanism_skeletoncoach.jpg\"></img> </a> "+
    "<a href=\"setup.php?type=mechanism&arm=14\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Eternal happy hour bar\" src=\"res/store/mechanism_eternalhappyhour.jpg\"></img> </a> "+
	"<a href=\"setup.php?type=mechanism&arm=16\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"German volksmusic band\" src=\"res/store/mechanism_volksmusik.jpg\"></img> </a> "+
	"<a href=\"setup.php?type=mechanism&arm=19\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Time warper\" src=\"res/store/mechanism_timewarper.jpg\"></img> </a> "+
	"<a href=\"setup.php?type=mechanism&arm=24\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Explosive sheep dummy\" src=\"res/store/mechanism_explosivesheepdummy.jpg\"></img> </a> "+
	"<a href=\"setup.php?type=mechanism&arm=27\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Piano-on-a-rope\" src=\"res/store/mechanism_piano.jpg\"></img> </a> "+
	"<a href=\"setup.php?type=mechanism&arm=30\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Ghost bus\" src=\"res/store/mechanism_ghostbus.jpg\"></img> </a> "+
    "<a href=\"setup.php?type=mechanism&arm=64\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Winter wonderland ghost bus\" src=\"res/store/mechanism_winterwonderlandghostbus.jpg\"></img> </a> "+
	"<a href=\"setup.php?type=mechanism&arm=37\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Time warper platinum edition\" src=\"res/store/mechanism_timewarperplatinum.jpg\"></img> </a> "+
	"<a href=\"setup.php?type=mechanism&arm=38\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Damocles array\" src=\"res/store/mechanism_damocles.jpg\"></img> </a> "+
	"<a href=\"setup.php?type=mechanism&arm=43\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Danse macabre\" src=\"res/store/mechanism_dansemacabre.jpg\"></img> </a> "+
	"<a href=\"setup.php?type=mechanism&arm=\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Scarecrow\" src=\"res/store/mechanism_scarecrow.jpg\"></img> </a> "+
	"<a href=\"setup.php?type=mechanism&arm=58\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Retro time warper\" src=\"res/store/mechanism_retrotimewarper.jpg\"></img> </a>"+
    "<a href=\"setup.php?type=mechanism&arm=\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Trojan raptor\" src=\"res/store/mechanism_trojan_raptor.jpg\"></img> </a> "+
    "<a href=\"setup.php?type=mechanism&arm=68\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Wooden man\" src=\"res/store/mechanism_woodenman.jpg\"></img> </a> "+
    "<a href=\"setup.php?type=mechanism&arm=75\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Confession box\" src=\"res/store/mechnism_confessionbox.jpg\"></img> </a> "+
    "<a href=\"setup.php?type=mechanism&arm=80\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Ghost Puzzlers board\" src=\"res/store/mechanism_ghost_puzzlers_board.jpg\"></img> </a> "+


	"<br>High Tech<br>"+
	"<a href=\"setup.php?type=mechanism&arm=11\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Ghost magnet\" src=\"res/store/mechanism_ghostmagnet.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=26\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Suck-o-matic 9000\" src=\"res/store/mechanism_suckomatic9000.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=79\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Flux capacitor\" src=\"res/store/mechanism_flux_capacitor.jpg\" /></img></a>-------"+
    "<a href=\"setup.php?type=mechanism&arm=\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Purplebeams\" src=\"res/store/mechanism_purplebeams.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=7\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Freezer\" src=\"res/store/mechanism_freezer.jpg\" /></img></a> "+
    "<a href=\"setup.php?type=mechanism&arm=\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Deep freezer\" src=\"res/store/mechanism_deepfreezer.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=10\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Black hole\" src=\"res/store/mechanism_blackhole.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=15\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Addictive PC game\" src=\"res/store/mechanism_addictivepcgame.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=17\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Bottle barrage tank\" src=\"res/store/mechanism_bottletank.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=35\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Slapping machine\" src=\"res/store/mechanism_slappingmachine.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=29\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Anti-gravity zone\" src=\"res/store/mechanism_antigravity.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Wormhole platinum edition\" src=\"res/store/mechanism_wormholeplatinum.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=39\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Max E. Million\" src=\"res/store/mechanism_maxemillion.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Laser shark basin\" src=\"res/store/mechanism_sharklaser.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=56\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Cyberraptor\" src=\"res/store/mechanism_cyberraptor.jpg\" /></img></a> "+
    "<a href=\"setup.php?type=mechanism&arm=56\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Arctic cyberraptor\" src=\"res/store/mechanism_arcticcyberraptor.jpg\" /></img></a><br>"+

	"Arcane<br>"+
	"<a href=\"setup.php?type=mechanism&arm=13\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Magic mirror\" src=\"res/store/mechanism_magicmaze.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=6\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Magic maze\" src=\"res/store/mechanism_magicmirror.jpg\" /></img></a> "+
    "<a href=\"setup.php?type=mechanism&arm=6\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Celestial knight\" src=\"res/store/mechanism_celestialknight.jpg\" /></img></a>-------<br>"+
	"<a href=\"setup.php?type=mechanism&arm=13\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Basilisk pit\" src=\"res/store/mechanism_basilisk.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=18\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Emerald pearl\" src=\"res/store/mechanism_emeraldpearl.jpg\" /></img></a> "+
    "<a href=\"setup.php?type=mechanism&arm=\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Emerald pearl snowglobe\" src=\"http://wiki.ghost-trappers.com/images/Mechanisms-Emerald_snow_pearl.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=28\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"X-Kaliboo\" src=\"res/store/mechanism_xkaliboo.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=32\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Abyssal phone booth\" src=\"res/store/mechanism_abyssalphonebooth.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=44\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Ether portal\" src=\"res/store/mechanism_etherportal.jpg\" /></img></a> "+
    "<a href=\"setup.php?type=mechanism&arm=44\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Winter wonderland portal\" src=\"res/store/mechanism_winterwonderlandportal.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=59\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Dimensional time warper\" src=\"res/store/mechanism_dimensionaltimewarper.jpg\" /></img></a>  "+
	"<a href=\"setup.php?type=mechanism&arm=69\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Arcane tome\" src=\"res/store/mechanism_arcane_tome.jpg\" /></img></a><br>"+
        
	"Bio<br>"+
	"<a href=\"setup.php?type=mechanism&arm=41\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Lucky rabbit\" src=\"res/store/mechanism_luckyrabbit.jpg\" /></img></a> "+
    "<a href=\"setup.php?type=mechanism&arm=70\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Lucky rabbit\" src=\"res/store/mechanism_vinecage.jpg\" /></img></a>-------"+
	"<a href=\"setup.php?type=mechanism&arm=33\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Crystal spider\" src=\"res/store/mechanism_highlandcattlestampede.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=12\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Highland cattle stampede\" src=\"res/store/mechanism_crystalspider.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=34\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Poisonous scorpions\" src=\"res/store/mechanism_poisonousscorpions.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=25\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Venus fly trap\" src=\"res/store/mechanism_venusflytrap.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=31\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Sleeping dragon\" src=\"res/store/mechanism_sleepingdragon.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=42\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Doomshroom\" src=\"res/store/mechanism_doomshroom.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=45\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Shark basin\" src=\"res/store/mechanism_shark.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=55\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Lost island raptor\" src=\"res/store/mechanism_lost_island_raptor.jpg\" /></img></a>  "+
    "<a href=\"setup.php?type=mechanism&arm=60\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Captured werewolf\" src=\"res/store/mechanism_captured_werewolf.jpg\" /></img></a> "+
    "<a href=\"setup.php?type=mechanism&arm=\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Dreamcatcher\" src=\"res/store/mechanism_dreamcatcher.jpg\" /></img></a> "+
    "<a href=\"setup.php?type=mechanism&arm=81\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Larry the kangaroo\" src=\"res/store/mechanism_larry_the_boxing_kangaroo.jpg\" /></img></a> <br>"+

	"Infernal<br>"+
	"<a href=\"setup.php?type=mechanism&arm=54\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Iron maiden\" src=\"res/store/mechanism_ironmaiden.jpg\" /></img></a> "+
    "<a href=\"setup.php?type=mechanism&arm=71\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Stake thrower\" src=\"res/store/mechanism_stakethrower.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=40\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"The black knight\" src=\"res/store/mechanism_blackknight.jpg\" /></img></a>-------<br>"+
	"<a href=\"setup.php?type=mechanism&arm=53\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Closed happy hour bar\" src=\"res/store/mechanism_closedhappyhour.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=51\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Volksmusik-from-Hell\" src=\"res/store/mechanism_volksmusikfromhell.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=52\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Infernal phone booth\" src=\"res/store/mechanism_infernalphonebooth.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=49\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Evil incarnate\" src=\"res/store/mechanism_evilincarnate.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Suck-o-matic 666\" src=\"res/store/mechanism_suckomatic666.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Hells bells\" src=\"res/store/mechanism_hellsbells.jpg\" /></img></a> "+
	"<a href=\"setup.php?type=mechanism&arm=57\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"Devilraptor\" src=\"res/store/mechanism_devilraptor.jpg\" /></img></a> "+
    "<a href=\"setup.php?type=mechanism&arm=76\" target=\"_self\"><img height=\"40\" width=\"33\" title=\"The furnace\" src=\"res/store/mechanism_thefurnace.jpg\" /></img></a><br><br>"+
	"(<a onclick=\"closeCGPopup();mech_table.style.display='none';originalCG.style.display='block'\"><i>close</i></a>)</center></div>"+

//********************ID PASS*********************//

	"<div id=\"pass_table\" style=\"display:none\" >"+
    "<center>"+
	//"<a href=\"setup.php?type=misc&arm=2\" target=\"_self\"><img height=\"66\" width=\"55\" src=\"res/pass_inventory.jpg\" title=\"ID Card\"  ></img></a>"+
	//"<a href=\"setup.php?type=misc&arm=4\" target=\"_self\"><img height=\"66\" width=\"55\" src=\"res/pass_donator_inventory.jpg\" title=\"Donator\"  ></img></a>"+
	//"<a href=\"setup.php?type=misc&arm=5\" target=\"_self\"><img height=\"66\" width=\"55\" src=\"res/pass_supporter_inventory.jpg\" title=\"Supporter\"  ></img></a>"+
	//"<a href=\"setup.php?type=misc&arm=6\" target=\"_self\"><img height=\"66\" width=\"55\" src=\"res/pass_secret_agent_inventory.jpg\" title=\"Secret agent\"  ></img></a>"+
	//"<a href=\"setup.php?type=misc&arm=12\" target=\"_self\"><img height=\"66\" width=\"55\" src=\"res/pass_mystic_agent_inventory.jpg\" title=\"Mystic Agent\"  ></img></a>"+
	//"<a href=\"setup.php?type=misc&arm=23\" target=\"_self\"><img height=\"66\" width=\"55\" src=\"res/pass_lucky_inventory.jpg\" title=\"Lucky Agent\"  ></img></a>"+
	//"<a href=\"setup.php?type=misc&arm=20\" target=\"_self\"><img height=\"66\" width=\"55\" src=\"res/pass_monster_trapper_inventory.jpg\" title=\"Monster Trapper\"  ></img></a>"+
	
	"<a href=\"setup.php?type=id&arm=11\"  target=\"_self\"  title=\"Antiburner\"><img height=\"66\" width=\"55\" src=\"res/pass_ghost_puzzler_inventory.jpg\"></a>  "+
	"<a href=\"setup.php?type=id&arm=15\"  target=\"_self\"  title=\"3% MA\"><img height=\"66\" width=\"55\" src=\"res/pass_nocturnal_agent_inventory.jpg\"></a>  "+
	"<a href=\"setup.php?type=id&arm=17\"  target=\"_self\"  title=\"-1 min\"><img height=\"66\" width=\"55\" src=\"res/pass_cosmic_agent_inventory.jpg\"></a>  "+
	"<a href=\"setup.php?type=id&arm=18\"  target=\"_self\"  title=\"x1.5 loot\"><img height=\"66\" width=\"55\" src=\"res/pass_twilight_agent_inventory.jpg\"></a>  "+
	"<a href=\"setup.php?type=id&arm=19\"  target=\"_self\"  title=\"3 Mystic\"><img height=\"66\" width=\"55\" src=\"res/pass_love_agent_inventory.jpg\"></a>  "+

	"<a href=\"setup.php?type=id&arm=21\"  target=\"_self\"  title=\"x1.5 loot, -1 min\"><img height=\"66\" width=\"55\" src=\"res/pass_devoted_agent_inventrory.jpg\"></a>  "+
	"<a href=\"setup.php?type=id&arm=25\"  target=\"_self\"  title=\"1 Attraction\"><img height=\"66\" width=\"55\" src=\"res/pass_premium_inventory.jpg\"></a>  "+
	"<a href=\"setup.php?type=id&arm=26\"  target=\"_self\"  title=\"x1.25 loot, 3% Doppel\"><img height=\"66\" width=\"55\" src=\"res/pass_rainbow_inventory.jpg\"></a>  "+
	"<a href=\"setup.php?type=id&arm=28\"  target=\"_self\"  title=\"x1.5 loot, 5 FoW\"><img height=\"66\" width=\"55\" src=\"res/pass_aurora_inventory.jpg\"></a>  "+
	"<a href=\"setup.php?type=id&arm=29\"  target=\"_self\"  title=\"3 Crystal\"><img height=\"66\" width=\"55\" src=\"res/crystal_agent_inventory.jpg\"></a>  "+ 
	
    "<a href=\"setup.php?type=id&arm=30\"  target=\"_self\"  title=\"5% Pet Trainer, 1 Love\"><img height=\"66\" width=\"55\" src=\"res/pet_lover_inventory.jpg\"></a>  "+
	"<a href=\"setup.php?type=id&arm=32\"  target=\"_self\"  title=\"3% Doppel, -1.5 min\"><img height=\"66\" width=\"55\" src=\"res/pass_dutiful_inventory.jpg\"></a>  "+
	"<a href=\"setup.php?type=id&arm=34\"  target=\"_self\"  title=\"x1.75 loot, 2% Lep, Antiburner, +2 mins\"><img height=\"66\" width=\"55\" src=\"res/pass_hardcore_inventory.jpg\"></a>  "+
	"<a href=\"setup.php?type=id&arm=35\"  target=\"_self\"  title=\"5% Juicy\"><img height=\"66\" width=\"55\" src=\"res/pass_juicy_inventory.jpg\"></a>  "+
	"<a href=\"setup.php?type=id&arm=31\"  target=\"_self\"  title=\"3 NoS\"><img height=\"66\" width=\"55\" src=\"res/nightmare_agent_inventory.jpg\"></a>  "+
        
	"<a href=\"setup.php?type=id&arm=33\"  target=\"_self\"  title=\"3% MA, x1.25 loot\"><img height=\"66\" width=\"55\" src=\"res/pass_adventurous_inventory.jpg\"></a>  "+
	"<a href=\"setup.php?type=id&arm=36\"  target=\"_self\"  title=\"2 VV\"><img height=\"66\" width=\"55\" src=\"res/pass_crusading_agent_inventory.jpg\"></a>  "+
	"<a href=\"setup.php?type=id&arm=37\"  target=\"_self\"  title=\"2% Gargoyles Touch\"><img height=\"66\" width=\"55\" src=\"res/pass_stonecold_inventory.jpg\"></a>  "+
	"<a href=\"setup.php?type=id&arm=38\"  target=\"_self\"  title=\"2% Scribe\"><img height=\"66\" width=\"55\" src=\"res/pass_cipher_inventory.jpg\"></a>  "+
    "<a href=\"setup.php?type=id&arm=\"  target=\"_self\"  title=\"2 ALL Colour\"><img height=\"66\" width=\"55\" src=\"res/pass_spectral_inventory.jpg\"></a>  "+
        
        
	"<br><br>(<a onclick=\"closeCGPopup();pass_table.style.display='none';originalCG.style.display='block'\"><i>close</i></a>)</center></div>"+
    
    
//********************CAULDRON*********************//

	"<div id=\"cauldron_table\" style=\"display:none\" >"+
	"<center>"+
	"<a href=\"setup.php?type=cauldron&arm=2\" target=\"_self\"><img height=\"75\" width=\"62\" src=\"res/store/cauldron_cauldron.jpg\"></img></a> "+
	"<a href=\"setup.php?type=cauldron&arm=3\" target=\"_self\"><img height=\"75\" width=\"62\" src=\"res/store/cauldron_witch_cauldron.jpg\"></img></a> "+
	"<a href=\"setup.php?type=cauldron&arm=11\" target=\"_self\"><img height=\"75\" width=\"62\" src=\"res/store/mystic_cauldron_inventory.jpg\"></img></a> "+
	"<br><img height=\"5\" width=\"330\" src=\"res/journal_line.png\"></img><br>"+				
				
	"<a href=\"setup.php?type=cauldron&arm=4\" target=\"_self\"><img height=\"75\" width=\"62\" src=\"res/jura_atomizer_inventory.jpg\"></img></a> "+
	"<a href=\"setup.php?type=cauldron&arm=5\" target=\"_self\"><img height=\"75\" width=\"62\" src=\"res/super_jura_atomizer_inventory.jpg\"></img></a> "+
	"<a href=\"setup.php?type=cauldron&arm=18\" target=\"_self\"><img height=\"75\" width=\"62\" src=\"res/triassic_cauldron_inventory.jpg\"></img></a> "+
	"<br><img height=\"5\" width=\"330\" src=\"res/journal_line.png\"></img><br>"+				
				
	"<a href=\"setup.php?type=cauldron&arm=7\" target=\"_self\"><img height=\"75\" width=\"62\" src=\"res/planar_disruptor_inventory.jpg\"></img></a> "+
	"<a href=\"setup.php?type=cauldron&arm=6\" target=\"_self\"><img height=\"75\" width=\"62\" src=\"res/planar_disintegrator_inventory.jpg\"></img></a> "+
	"<a href=\"setup.php?type=cauldron&arm=14\" target=\"_self\"><img height=\"75\" width=\"62\" src=\"res/rift_cauldron_inventory.jpg\"></img></a> "+
 	"<br><img height=\"5\" width=\"330\" src=\"res/journal_line.png\"></img><br>"+				
				
	"<a href=\"setup.php?type=cauldron&arm=9\" target=\"_self\"><img height=\"75\" width=\"62\" src=\"res/store/cauldron_blood_cauldron.jpg\"></img></a> "+
	"<a href=\"setup.php?type=cauldron&arm=10\" target=\"_self\"><img height=\"75\" width=\"62\" src=\"res/store/cauldron_ancient_blood_cauldron.jpg\"></img></a> "+
	"<a href=\"setup.php?type=cauldron&arm=15\" target=\"_self\"><img height=\"75\" width=\"62\" src=\"res/shadow_cauldron_inventory.jpg\"></img></a> "+
 	"<br><img height=\"5\" width=\"330\" src=\"res/journal_line.png\"></img><br>"+				
				
	"<a href=\"setup.php?type=cauldron&arm=16\" target=\"_self\"><img height=\"75\" width=\"62\" src=\"res/glorious_cauldron_inventory.jpg\"></img></a> "+
	"<a href=\"setup.php?type=cauldron&arm=17\" target=\"_self\"><img height=\"75\" width=\"62\" src=\"res/galliant_radiant_cauldron_inventory.jpg\"></img></a> "+
	"<a href=\"setup.php?type=cauldron&arm=13\" target=\"_self\"><img height=\"75\" width=\"62\" src=\"res/radiant_glorious_cauldron_inventory.jpg\"></img></a> "+
	"<br><img height=\"5\" width=\"330\" src=\"res/journal_line.png\"></img><br>"+				
        
    "<a href=\"setup.php?type=cauldron&activate=1\" target=\"_self\"><img src=\"res/button_cauldron_activate.png\"></img> </a> <br><br><br><br>"+    
        
	"(<a onclick=\"closeCGPopup();cauldron_table.style.display='none';originalCG.style.display='block'\"><i>close</i></a>)</center></div>"+


    
    
//********************CAMERA*********************//

	"<div id=\"camera_table\" style=\"display:none\" >"+
	"<center>"+

	"Basic Camera<br>"+						
	"<a href=\"setup.php?type=camera&action=equip&camera_id=1\" target=\"_self\"><img height=\"66\" width=\"55\" src=\"res/store/stevens_wooden_cam.jpg\" title=\"3UV\"></img></a>  "+
	"<a href=\"setup.php?type=camera&action=equip&camera_id=2\" target=\"_self\"><img height=\"66\" width=\"55\" src=\"res/store/metal_pirkmeier_cam.jpg\" title=\"3IY\" ></img></a>  "+
	"<a href=\"setup.php?type=camera&action=equip&camera_id=3\" target=\"_self\"><img height=\"66\" width=\"55\" src=\"res/store/eclipse_leather_cam.jpg\" title=\"3GG\" ></img></a>  "+
	"<a href=\"setup.php?type=camera&action=equip&camera_id=13\" target=\"_self\"><img height=\"66\" width=\"55\" src=\"res/store/antique_flash_camera_inventory.jpg\" title=\"multiloot\" ></img></a>  "+
	"<br><img height=\"5\" width=\"330\" src=\"res/journal_line.png\"></img><br>"+	
        
	"Assembly Camera<br>"+						
	"<a href=\"setup.php?type=camera&action=equip&camera_id=4\" target=\"_self\"><img height=\"66\" width=\"55\" src=\"res/store/polarlord_bc.jpg\" title=\"3UV 1IY-GG\" ></img></a> "+
	"<a href=\"setup.php?type=camera&action=equip&camera_id=5\" target=\"_self\"><img height=\"66\" width=\"55\" src=\"res/store/polarlight_s18.jpg	\" title=\"	3IY 1UV-GG\" ></img></a> "+
	"<a href=\"setup.php?type=camera&action=equip&camera_id=6\" target=\"_self\"><img height=\"66\" width=\"55\" src=\"res/store/polarold_sx.jpg\" title=\"3GG 1UV-IY\" ></img></a> "+
	"<a href=\"setup.php?type=camera&action=equip&camera_id=18\" target=\"_self\"><img height=\"66\" width=\"55\" src=\"res/store/pinhole_camera_inventory.jpg\" title=\"2-ALL , raw & midnight	\" ></img></a> "+
 	"<br><img height=\"5\" width=\"330\" src=\"res/journal_line.png\"></img><br>"+						
						
	"Bayoushi's Camera<br>"+						
	"<a href=\"setup.php?type=camera&action=equip&camera_id=\" target=\"_self\"><img height=\"66\" width=\"55\" src=\"res/store/phone_camera_inventory.jpg\" title=\"3UV-IY , Scribe\" ></img></a>  "+
	"<a href=\"setup.php?type=camera&action=equip&camera_id=\" target=\"_self\"><img height=\"66\" width=\"55\" src=\"res/store/underwater_camera_inventory.jpg	\" title=\"3UV-GG , Scribe\"  ></img></a>  "+
	"<a href=\"setup.php?type=camera&action=equip&camera_id=\" target=\"_self\"><img height=\"66\" width=\"55\" src=\"res/store/spy_camera_inventory.jpg\" title=\"3-IY-GG , Scribe\"  ></img></a>  "+
	"<a href=\"setup.php?type=camera&action=equip&camera_id=17\" target=\"_self\"><img height=\"66\" width=\"55\" src=\"res/store/kaleidoscope_camera_inventory.jpg	\" title=\"3-All , Scribe\"  ></img></a>  "+
 	"<br><img height=\"5\" width=\"330\" src=\"res/journal_line.png\"></img><br>"+						
						
	"Donation Camera<br>"+						
	"<a href=\"setup.php?type=camera&action=equip&camera_id=11\" target=\"_self\"><img height=\"66\" width=\"55\" src=\"res/store/metrox_1313_inventory.jpg	\" title=\"2-ALL , FoW\"  ></img></a>  "+
	"<a href=\"setup.php?type=camera&action=equip&camera_id=10\" target=\"_self\"><img height=\"66\" width=\"55\" src=\"res/store/nova_galaxy_1000.jpg\" title=\"6-ALL\"  ></img></a>  "+
 	"<br><img height=\"5\" width=\"330\" src=\"res/journal_line.png\"></img><br>"+						

        
    "<a href=\"setup.php?type=camera&action=equip&camera_id=0\" target=\"_self\"><img src=\"res/deactivate_camera_button.png\"></img> </a> <br><br><br><br>"+    
        
	"(<a onclick=\"closeCGPopup();camera_table.style.display='none';originalCG.style.display='block'\"><i>close</i></a>)</center></div>"


;}



// Extra Direct Links at Right bar 
if ( document.getElementsByClassName("rightBanners")[0]) 
         {
	
	    
	div4 = document.getElementsByClassName("rightBanners")[0];
	div6 = document.createElement("div");
	div7 = document.createElement("div");
	div7.innerHTML="<br>";
	div6.innerHTML= div4.innerHTML
	div4.innerHTML="";
	div5 = document.createElement("div");
	div5.style.backgroundColor = "#E6CAA3";
	div5.style.border = "2px solid #936843";
	div5.innerHTML = 

		
		"<p align=\"center\"><strong><a onclick=\"showCGPopup();originalCG.style.display='none';companion_table.style.display='none';cauldron_table.style.display='none';contract_table.style.display='none';magiccircle_table.style.display='none';pass_table.style.display='none';mech_table.style.display='none';camera_table.style.display='none';bait_table.style.display='block';\">Bait</a></strong></p>"+
		"<p align=\"center\"><strong><a onclick=\"showCGPopup();originalCG.style.display='none';companion_table.style.display='none';cauldron_table.style.display='none';contract_table.style.display='none';pass_table.style.display='none';bait_table.style.display='none';mech_table.style.display='none';camera_table.style.display='none';magiccircle_table.style.display='block';\">Magic Circle</a></strong></p>"+ 
		"<p align=\"center\"><strong><a onclick=\"showCGPopup();originalCG.style.display='none';companion_table.style.display='none';cauldron_table.style.display='none';contract_table.style.display='none';pass_table.style.display='none';bait_table.style.display='none';magiccircle_table.style.display='none';camera_table.style.display='none';mech_table.style.display='block';\">Mechanism</a></strong></p>"+ 
		"<p align=\"center\"><strong><a onclick=\"showCGPopup();originalCG.style.display='none';companion_table.style.display='none';cauldron_table.style.display='none';contract_table.style.display='none';magiccircle_table.style.display='none';bait_table.style.display='none';mech_table.style.display='none';camera_table.style.display='none';pass_table.style.display='block';\">ID Badges</a></strong></p>"+
        
        "<img height=\"5\" width=\"100\" src=\"res/journal_line.png\"></img>"+  
        
        //"<p align=\"center\"><strong><a onclick=\"showCGPopup();originalCG.style.display='none';cauldron_table.style.display='none';contract_table.style.display='none';magiccircle_table.style.display='none';pass_table.style.display='none';bait_table.style.display='none';mech_table.style.display='none';camera_table.style.display='none';companion_table.style.display='block';\">Companions</a></strong></p>"+
        "<p align=\"center\"><strong><a onclick=\"showCGPopup();originalCG.style.display='none';companion_table.style.display='none';cauldron_table.style.display='none';magiccircle_table.style.display='none';pass_table.style.display='none';bait_table.style.display='none';mech_table.style.display='none';camera_table.style.display='none';contract_table.style.display='block';\">Contracts</a></strong></p>"+  
		"<p align=\"center\"><strong><a onclick=\"showCGPopup();originalCG.style.display='none';companion_table.style.display='none';contract_table.style.display='none';magiccircle_table.style.display='none';pass_table.style.display='none';mech_table.style.display='none';bait_table.style.display='none';camera_table.style.display='none';cauldron_table.style.display='block';\">Cauldron</a></strong></p>"+
        "<p align=\"center\"><strong><a onclick=\"showCGPopup();originalCG.style.display='none';companion_table.style.display='none';contract_table.style.display='none';magiccircle_table.style.display='none';pass_table.style.display='none';mech_table.style.display='none';bait_table.style.display='none';cauldron_table.style.display='none';camera_table.style.display='block';\">Camera</a></strong></p>"+

        
		"<img height=\"5\" width=\"100\" src=\"res/journal_line.png\"></img>"+  

                //Saved setup
                "<p align=\"center\"><strong><a href=\"camp.php?action=armSetup&slot=0\" target=\"_self\">Setup1 </a></strong></p>"+  
                "<p align=\"center\"><strong><a href=\"camp.php?action=armSetup&slot=1\" target=\"_self\">Setup2 </a></strong></p>"+  
                "<p align=\"center\"><strong><a href=\"camp.php?action=armSetup&slot=2\" target=\"_self\">Setup3 </a></strong></p>"+ 
        		"<p align=\"center\"><strong><a href=\"camp.php?action=armSetup&slot=3\" target=\"_self\">Setup4 </a></strong></p>"+ 
        		"<p align=\"center\"><strong><a href=\"camp.php?action=armSetup&slot=4\" target=\"_self\">Setup5 </a></strong></p>"+ 
       		 	"<p align=\"center\"><strong><a href=\"camp.php?action=armSetup&slot=5\" target=\"_self\">Setup6 </a></strong></p>"+ 
        		"<p align=\"center\"><strong><a href=\"camp.php?action=armSetup&slot=6\" target=\"_self\">Setup7 </a></strong></p>"+ 
        		"<p align=\"center\"><strong><a href=\"camp.php?action=armSetup&slot=7\" target=\"_self\">Setup8 </a></strong></p>";

		//"<img height=\"5\" width=\"100\" src=\"res/journal_line.png\"></img>"+  

		//"<p align=\"center\"><strong><a href=\"http://www.facebook.com/note.php?note_id=133557203379260\" target=\"_blank\">Scare Factor List</a></strong></p>";



div4.appendChild(div5);
div4.appendChild(div7);
div4.appendChild(div6);


}