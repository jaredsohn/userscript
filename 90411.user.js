// ==UserScript==
// @name 	Ikariam: friendsList
// @author 	Phate
// @version	0.4
// @description	A script modify list of friends
// @include		http://s*.*.ikariam.*/*
// @exclude		http://board.ikariam.*/*
// @require 	http://www.betawarriors.com/bin/gm/57756user.js
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
//
// @history	0.4 To order online slots there is an icon in the top.
// @history	0.4 Double click on immage open window's Avatar.
// @history	0.4 Friend slot scrolls to the right. Code TorfDrottel, thanks for your help.
// @history	0.4 Removed option scripts and translations.
// @history	0.3 Hack script 57756.
// @history	0.3 Add traslate Spanish, Hungary.
// @history	0.2 remove hide friends list.
// @history	0.2 Add default avatar in option page.
// @history	0.2 Add Polish traslation.
// @history	0.1 first release
// ==/UserScript==

ScriptUpdater.check(90411, '0.4');
var FL_opt

$(window).ready(function() 
{ 
	getOpt();
	modifyFriends();
	$('#friends a.pageup , #friends a.pagedown').click(function(){modifyFriends()})
	$('#friends div.image').dblclick(function(){
		$('#FL_dflIcons').remove()
		windowDefaultIcon($(this));
	});
	$('#friends li .name , #friends li .clan').css({'left':'74px'});
    $('#friends .sendmsg').css({'left':'54px','top':'2px'});
    $('#friends .delmsg').css({'left':'54px','top':'20px'});
    $('#friends li').css({'max-width':'180px','left':'-11px'});
	$('#friends').append('<img src="/skin/layout/bulb-on.gif" title="sort Slot"/>')
	$('#friends > img')
		.css({'position':'absolute','left':'14px','top':'-15px'})
		.click(function()
		{
			if(FL_opt.sort)
			{
				FL_opt.sort=false
				var xtop = 0;
				$('#friends ul.friends li.friend').each(function()	//sort friends with online/offline
				{
					$(this).css('top',xtop +'px');
					xtop += 40;
				});
			}
			else
				{FL_opt.sort=true}
			setOpt();
			sortSlotIcon();
			modifyFriends();
		});
	sortSlotIcon()
})

function getOpt()	// get option parameter
{	
	FL_opt = eval(localStorage.getItem('FL_opt'));//options
	if (FL_opt == null || FL_opt == undefined) 	// Init parameter
	{
		FL_opt = {};
		FL_opt.sort = true;
		setOpt();
	}
}

function setOpt() 		// save option parameter
{
	localStorage.setItem("FL_opt",uneval(FL_opt));
}

function windowDefaultIcon(img)
{
	// default avatar for Friends list
	const FL_Oplite = '/skin/characters/military/120x100/phalanx_r_120x100.gif';
	const FL_SteamGiant = '/skin/characters/military/120x100/steamgiant_r_120x100.gif';
	const FL_Spearman = '/skin/characters/military/120x100/spearman_r_120x100.gif';
	const FL_Swardsman = '/skin/characters/military/120x100/swordsman_r_120x100.gif';
	const FL_Slinger = '/skin/characters/military/120x100/slinger_r_120x100.gif';
	const FL_Archer = '/skin/characters/military/120x100/archer_r_120x100.gif';
	const FL_Marksman = '/skin/characters/military/120x100/marksman_r_120x100.gif';
	const FL_Ram = '/skin/characters/military/120x100/ram_r_120x100.gif';
	const FL_Catapult = '/skin/characters/military/120x100/catapult_r_120x100.gif';
	const FL_Mortar = '/skin/characters/military/120x100/mortar_r_120x100.gif';
	const FL_Gyrocopter = '/skin/characters/military/120x100/gyrocopter_r_120x100.gif';
	const FL_Bombardier = '/skin/characters/military/120x100/bombardier_r_120x100.gif';
	const FL_Cook = '/skin/characters/military/120x100/cook_r_120x100.gif';
	const FL_Medic = '/skin/characters/military/120x100/medic_r_120x100.gif';
	const FL_Citizen = '/skin/characters/y100_citizen_faceright.gif';
	const FL_Scientist = '/skin/characters/y100_scientist_faceleft.gif';
	const FL_Woodworker = '/skin/characters/y100_worker_wood_faceleft.gif';
	const FL_Luxuryworker = '/skin/characters/y100_worker_tradegood_faceleft.gif';
	const FL_Templer = '/skin/characters/40h/templer_r.gif';
	const FL_Spy = '/skin/characters/military/120x100/spy_120x100.gif';
	
	var slotnum = img.next('div.slotnum').text()

	$('#friends').append(
		"<div id='FL_dflIcons'>"+
			"<h4>"+ "Avatar slot " + slotnum +"<img src='/skin/layout/notes_close.gif'></h4>"+
			"<div value='"+ FL_Oplite +"'><img class='resizeImg' src='"+ FL_Oplite +"'></div>"+
			"<div value='"+ FL_SteamGiant +"'><img class='resizeImg' src='"+ FL_SteamGiant +"'></div>"+
			"<div value='"+ FL_Spearman +"'><img class='resizeImg' src='"+ FL_Spearman +"'></div>"+
			"<div value='"+ FL_Swardsman +"'><img class='resizeImg' src='"+ FL_Swardsman +"'></div>"+
			"<div value='"+ FL_Slinger +"'><img class='resizeImg' src='"+ FL_Slinger +"'></div>"+
			"<div value='"+ FL_Archer +"'><img class='resizeImg' src='"+ FL_Archer +"'></div>"+
			"<div value='"+ FL_Marksman +"'><img class='resizeImg' src='"+ FL_Marksman +"'></div>"+
			"<div value='"+ FL_Ram +"'><img class='resizeImg' src='"+ FL_Ram +"'></div>"+
			"<div value='"+ FL_Catapult +"'><img class='resizeImg' src='"+ FL_Catapult +"'></div>"+
			"<div value='"+ FL_Mortar +"'><img class='resizeImg' src='"+ FL_Mortar +"'></div>"+
			"<div value='"+ FL_Gyrocopter +"'><img class='resizeImg' src='"+ FL_Gyrocopter +"'></div>"+
			"<div value='"+ FL_Bombardier +"'><img class='resizeImg' src='"+ FL_Bombardier +"'></div>"+
			"<div value='"+ FL_Cook +"'><img class='resizeImg' src='"+ FL_Cook +"'></div>"+
			"<div value='"+ FL_Medic +"'><img class='resizeImg' src='"+ FL_Medic +"'></div>"+
			"<div value='"+ FL_Spy +"'><img class='resizeImg' src='"+ FL_Spy +"'></div>"+
			"<div value='"+ FL_Citizen +"'><img class='resizeImg' src='"+ FL_Citizen +"'></div>"+
			"<div value='"+ FL_Woodworker +"'><img class='resizeImg' src='"+ FL_Woodworker +"'></div>"+
			"<div value='"+ FL_Luxuryworker +"'><img class='resizeImg' src='"+ FL_Luxuryworker +"'></div>"+
			"<div value='"+ FL_Templer +"'><img class='resizeImg' src='"+ FL_Templer +"'></div>"+
			"<div value='"+ FL_Scientist +"'><img class='resizeImg' src='"+ FL_Scientist +"'></div>"+
			"<input class='textfield' type='text'/>"+
			"<input class='button' type='button' value='save'>"+
		"</div>");

	$("#FL_dflIcons img.resizeImg").each(function(){centerImg($(this),34)});
	$('#FL_dflIcons input.textfield').css({'width':'300px','margin':'15px'});
	$('#FL_dflIcons').css({'position':'absolute','left':'-420px','top': img.parent().offset().top - 200 +'px' ,'background-color':'#faeac6','border':'3px double #f1d198','width':'400px'})
	$('#FL_dflIcons h4').css({'background-color':'#7e0d0b','font-size':'14px','color':'#fef6e1','font-weight':'bold','height':'22px','line-height':'22px','text-align':'center','margin':'1px','border':'1px solid #de964c','margin-bottom':'5px'});
	$('#FL_dflIcons div')	// icon
		.css({'display':'inline-block','margin':'2px','border':'1px solid #612d04','background-color':'#CEB385','height':'34px','width':'34px'})
		.hover(
			function(){$(this).css({'background-color' : '#f1d198'})},
			function(){$(this).css({'background-color' : '#CEB385'})}
		)
		.click(function()
		{
			FL_opt[slotnum] = $(this).attr('value');
			setOpt();
			$('#FL_dflIcons').remove();
			modifyFriends();
		});
	$('#FL_dflIcons h4 img')	// icon close window avatar
		.css({'position':'absolute','right':'4px','top':'4px'})
		.click(function(){$('#FL_dflIcons').remove();});
	$('#FL_dflIcons input:button').click(function()		// http link icon
	{
		var lnkImg = $('#FL_dflIcons input.textfield').val();
		if(lnkImg != "")
		{
			FL_opt[slotnum] = lnkImg;
			setOpt();
			$('#FL_dflIcons').remove();
			modifyFriends();
		}
	});
}

function modifyFriends()
{
		$('#friends ul.friends li.friend').each(function()	//change icons friends
		{
			var slot = $(this).find('div.slotnum').text();
			if(FL_opt[slot] != null && FL_opt[slot].length > 0)
			{
				$(this).find('div.image').html("<img class='resizeImg' src='"+ FL_opt[slot] +"'>").css('background-image','none');
			}
		});
		if(FL_opt.sort)
		{
			var onFriends =[];
			var xtop = 0;
			$('#friends ul.friends li.friend:has(div.online)').each(function()	//sort friends with online/offline
			{
				onFriends.push($(this).find('div.slotnum').text())
				$(this).css('top',xtop +'px');
				xtop += 40;
			});
			$('#friends ul.friends li.friend').each(function(){
				if ($.inArray($(this).find('div.slotnum').text(),onFriends)<0)
				{
					$(this).css('top',xtop +'px');
					xtop += 40;
				}
			});
			
		}
		$("#friends img.resizeImg").each(function(){centerImg($(this),34)});
}

function centerImg(img,max_size)
{
	if (img.height() >= img.width()) 
	{
		var h = max_size;
		var w = Math.floor(img.width() / img.height() * max_size);
		var mLeft = Math.floor((max_size - w)/2);
		var mTop = 0;
	 } 
	else 
	{
		var w = max_size;
		var h = Math.floor(img.height() / img.width() * max_size);
		var mLeft = 0;
		var mTop = Math.floor((max_size - h)/2);
	}
	img.css({'display':'block','height': h +'px','width': w +'px','margin-left': mLeft +'px','margin-top': mTop +'px'});  
}

function sortSlotIcon()
{
	if(FL_opt.sort)	{$('#friends > img').attr('src','/skin/layout/bulb-on.gif')}
	else			{$('#friends > img').attr('src','/skin/layout/bulb-off.gif')} 
}

