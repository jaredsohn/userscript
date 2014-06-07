// ==UserScript==

// @name          KoC-WideMap

// @namespace     Lone Hood & JenniP

// @description   Wider map in KoC

// @include       *kingdomsofcamelot*
// @exclude       http://www.facebook.com/kingdomsofcamelot
// @exclude       http://www.facebook.com/kingdomsofcamelot*
// @exclude       http://apps.facebook.com/kingdomsofcamelot/?page=newgame
// @exclude       http://apps.facebook.com/kingdomsofcamelot/?page=newgame*
// @exclude       http://apps.facebook.com/kingdomsofcamelot/?page=invite*

// @require       http://sizzlemctwizzle.com/updater.php?id=78937

// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js

//
// &lang=en  is English
// &lang=es  is Spanish
// &lang=de  is German
// &lang=fr  is French
// &lang=it  is Italian
// &lang=ja  is Japanese
// &lang=tr  is Turkish
// &lang=zh-Hans  is simplified Chinese
// &lang=zh-Hant  is traditional Chinese
//

// ==/UserScript==


//Make iFrame wider
$('#content div').width($(window).width());
$('#content div div').width($(window).width());
$('#app_content_130402594779 div div iframe').width($(window).width());



//Remove left and right edge

$('#mod_maparea div.maparea_rrail').remove();
$('#mod_maparea div.maparea_lrail').remove();

//Dark background makes it hard to read 'reload' text, so change text white
$('#kocinitloading div a').css('color','white');
$('#kocinitloading div a').css('fontSize','16px');
$('#kocinitloading div a').css('fontWeight','bold');


//Maximize usable area
$('#kochead').css('height','40px');
$('#kochead').css('right','-250px');
$('#kochead img.chrome_logo').css('height','46px');
$('#kochead img.chrome_logo').css('width','224px');
$('#maparea_rec').css('height','18px');
$('#kocmain div.friendlist_holder').css('top','1325px');


//Remove 'get gems' because you can find it with another button
$('#kochead div.get_gem_info div.gemgetmore').remove();





//Move building and training queue down a bit
//$('#mod_queue').css('bottom','-30px');
//$('#mod_queue').css('right','0px');
//$('#mod_queue').css('border','thin solid #A56631');
//$('#maparea_city').css('height','465px');
//$('#maparea_fields').css('height','465px');
//$('#maparea_map').css('height','465px');
//$('#mapwindow').css('height','465px');
//$('#mod_maparea').css('backgroundColor','#322222');
//$('#maparea_city').css('backgroundColor','#322222');
//$('#maparea_fields').css('backgroundColor','#322222');
//$('#maparea_map').css('backgroundColor','#322222');
//$('#mapwindow').css('border-top','thin solid #A56631');
//$('#mapwindow').css('border-bottom','thin solid #A56631');


//Maximize chat box
$('#kocmain_bottom').css('height','70px');
//$('#kocmain div.mod_comm div.comm_body').css('margin-top','34px');
//$('#kocmain').css('background-color', '#FAF6DC');
$('#kocmain_bottom div.mod_comm div.comm_global div.chatlist').css('height','587px');


//Clear some room for coordinate box
$('#kocmain_bottom div.mod_comm a.mod_comm_mmb').css('left', '608px');
$('#kocmain_bottom div.mod_comm a.mod_comm_mmb').css('top', '694px');
$('#kocmain_bottom div.mod_directory div.directory_head a.button25').remove();
$('#directory_tabs a.tab1').css('float','right');
$('#directory_tabs a.tab2').css('float','right');


//Move foreign Merlin box down
//$('#kocmain_bottom div.mod_comm a.mod_comm_mmb2').css('left', '580px');
//$('#kocmain_bottom div.mod_comm a.mod_comm_mmb2').css('top', '690px');


//Make coordinate input boxes a bit bigger
$('#mapXCoor').css('width','30px');
$('#mapYCoor').css('width','30px');


//Move coordinate box
$('#maparea_map div.mod_coord').css('left', '-150px');
$('#maparea_map div.mod_coord').css('top', '469px');

//Bring overview over
$('#mod_cityinfo div.cityinfo_head div.hd a.button14').css('left','-404px');
$('#mod_cityinfo div.cityinfo_head div.hd a.button14').css('top','-548px');
$('#mod_cityinfo div.cityinfo_head div.hd a.button14').css('font-size','14px');

//Maximize Alliance view
$('#directory_tabs_2_members').css('height','600px');

//Remove faulty alliance info
$('#directory_tabs_2_allianceInfo').remove();

//Fix the sliver between chat and alliance tabs
$('#kocmain_bottom div.mod_directory').css('left','360px');

//Increase city name font-size
$('#mod_cityinfo_cityname').css('font-size','16px');
$('#mod_cityinfo_cityname').css('padding-top','20px');
//$('#mod_cityinfo_cityname').css('text-align','left');

//Decrease cityinfo tab font size
$('#cityinfo_tabs a').css('font-size','9px');
$('#queue_head_building').css('font-size','9px');


//Maximize Knight view
$('#cityinfo_2').css('height','620px');


//More info at a glance
$('#cityinfo_1 div.upsell a.button20').remove();
$('#fbFanBox').remove();
$('#cityinfo1').css('backgroundColor','tan');
$('#cityinfo1').css('height','270px');



//Move Leaderboard button and make it a bit bigger
$('#kocmain_bottom div.mod_directory div.directory_head').append($('#kocmain div.panel_friendlist div.leader_board table tbody tr td a'));
$('#kocmain_bottom div.mod_directory div.directory_head a').addClass('button14');
$('#kocmain_bottom div.mod_directory div.directory_head a').css('left','-190px');
$('#kocmain_bottom div.mod_directory div.directory_head a').css('top','14px');
$('#kocmain_bottom div.mod_directory div.directory_head a').css('font-size','14px');





//Remove lower panel junk

$('#kocmain div.panel_friendlist').remove();
$('#kocmain').css('height','1265px');
$('#kocmain').css('right','-250px');



//Fix barracks training max button
$('#barracks_train div.unitinfo div.unit_numtrain clearfix a.button14').css('top', '22px');



//Make the map wider
$('#mapwindow').css('height','485px');

$('#mapwindow').width($(window).width());
$('#mapwindow').css('zIndex','10');
$('#kocmain_bottom').css('zIndex','20');
$('#mapwindow').css('right','250px');



//Remove 'progress bar'
//$('#progressBar').remove();


//Move 'fantasy football' ad down and delete other ad elements
$('#app_content_130402594779 div div div').css('top', '1380px');
$('#content div.UIStandardFrame_Container').css('padding-top', '0px');
$('#sidebar_ads').remove();
$('#canvas_nav_content').remove();


//Keep Facebook chat on top
$('#pagelet_presence').css('opacity', '1');



// Move top tabs down
//
// If you don't need the tabs at the top of the screen,
//  just remove the // in front of the next 4 lines of code:

//$('#main_engagement_tabs').css('top','1280px');
$('#main_engagement_tabs').css('right','-250px');
//$('#main_engagement_tabs').css('position','absolute');
//$('#main_engagement_tabs').css('zIndex','10000');

//Additions by ------- Jenny Peder ------

//Change Color of Alliance and Global Chat Background
$('#mod_comm_list2').css('backgroundColor','#F6F3EC');
$('#mod_comm_list1').css('backgroundColor','#F6F3EC');

//change color of panel below city buttons
$('#kocmain').css('backgroundColor','#000000');

//Move reports box
//$('#modalCurtain1').css('width','760px');
//$('#modalbox1').css('left','150px');

//Change height of kocmain_bottom
$('#kocmain_bottom').css('height', '1px');

//Tint Tournament tab 
$('#tournament_tab').css('backgroundColor','#F6F3EC');
//$('#tournament_tab ').css('border','thin solid #00376A');

//Tint coordinate box
$('#maparea_map div.mod_coord').css('backgroundColor','tan');
$('#bookmarksBox').css('backgroundColor','white');
$('#mod_cityinfo_cityname').css('backgroundColor','#00376A');

//Slide Troop movement timer down a bit and move to left
//$('#mod_untqueue').css('bottom','-35px');
$('#mod_untqueue').css('left','-150px');
//$('#mod_untqueue').css('border','thin solid #A56631');

//--------------------------------------------


//  Remove the 'change server' notice.
//
//  If you just play on one server and don't need to see it,
//  just remove the // in front of the next line of code:

//$('#kochead div.info div.server a').remove();



