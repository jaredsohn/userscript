// ==UserScript==
// @name           HoboMenuScript
// @namespace      http://localhost
// @description    This script upgrades the limited Hobowars menu with a more advanced and customizable one. Mix and match game links to suit your needs.
// @author         Xyan Flux
// @version        1.0.3
// @include        http://www.hobowars.com/fb/game.php* 
// @exclude
// ==/UserScript==

var menu = document.getElementById('menu');

if(menu){
	
	var livingArea = menu.firstChild.nextSibling;
	var mail = livingArea.nextSibling.nextSibling;
	var link = livingArea.href;

	// add, remove, or change the links here.
	// remember to separate each link with a +
var html='<a href='+link+(livingArea.id?' id=new':'')+'>Home</a> '+
	'<a href='+link+'mail'+(mail.id?' id=new':'')+'>Mail</a> '+
	'<a href='+link+'city>City</a> '+
	'<a href='+link+'city2>2ndCity</a> '+
	'<a href='+link+'bank>Bank</a> '+
	'<a href='+link+'hospital>Hospital</a> '+
	'<a href='+link+'gathering>Boards</a> '+
	'<a href='+link+'explore&do=move&x=53&y=47>Explore</a> '+
	'<a href='+link+'hill&do=greg>Race</a>'+

	'<br><br>'+ // add breaks to add another row

	'<a href='+link+'hospital&do=heal&gang=yes>Heal</a> '+
	'<a href='+link+'battle&do=phlist>Hitlist</a> '+
	'<a href='+link+'uni>University</a> '+
	'<a href='+link+'uni&do=int>Int</a> '+
	'<a href='+link+'711&do=beg>Beg</a> '+
	'<a href='+link+'arena&do=combat&ID=9>Rob</a> '+
	'<a href='+link+'711>7/11</a> '+
	'<a href='+link+'parking_garage>FightClub</a> '+
	'<a href='+link+'city_hall>RPSLS</a>';
	// don't forget the semi-colon at the end

	menu.innerHTML=html;
}


/*	Extra Links

	'<a href='+link+(livingArea.id?' id=new':'')+'>Home</a> '+
	'<a href='+link+'mail'+(mail.id?' id=new':'')+'>Mail</a> '+
	'<a href='+link+'>Home</a> '+ 		//livingArea without blue highlight 
	'<a href='+link+'mail>Mail</a> '+	//mail without blue highlight 

	// Main City Links
	'<a href='+link+'city>City</a> '+
	'<a href='+link+'bank>Bank</a> '+
	'<a href='+link+'gathering>Boards</a> '+
	'<a href='+link+'donate>Donator</a> '+
	'<a href='+link+'explore&do=move&x=53&y=47>Explore</a> '+
	'<a href='+link+'rats>Rats</a> '+

	'<a href='+link+'battle>Battle</a> '+
	'<a href='+link+'battle&do=list&l_level=##&l_life=1>FightLvl</a> '+	//replace ## with level
	'<a href='+link+'ladder>Ladder</a> '+
	'<a href='+link+'battle&do=phlist>Hitlist</a> '+

	'<a href='+link+'hospital>Hospital</a> '+
	'<a href='+link+'hospital&do=heal&gang=yes>Heal</a> '+
	'<a href='+link+'hospital&do=heal>Heal</a> '+

	'<a href='+link+'war>Duncans</a> '+
	'<a href='+link+'war&do=list&side=1>West</a> '+
	'<a href='+link+'war&do=list&side=2>East</a> '+
	'<a href='+link+'war&do=list&side=3>South</a> '+

	'<a href='+link+'711>7/11</a> '+
	'<a href='+link+'711&do=beg>Beg</a> '+
	'<a href='+link+'711&do=food>Rummage</a> '+

	'<a href='+link+'hill>TheHill</a> '+
	'<a href='+link+'hill&do=greg>Race</a> '+
	'<a href='+link+'hill&do=view_cart&cid=####>ViewCart</a> '+// replace ### with cart id
	'<a href='+link+'hill&do=modify>ModCart</a> '+

	'<a href='+link+'gang&do=enter>Gang</a> '+
	'<a href='+link+'gang>GangAlley</a> '+
	'<a href='+link+'gang&do=donate>Donate</a> '+
	'<a href='+link+'gang2&do=battle>WC</a> '+
	'<a href='+link+'gang&do=list_mem>Members</a> '+

	'<a href='+link+'cas>Casino</a> '+
	'<a href='+link+'casino>Jackpot</a> '+
	'<a href='+link+'slots>Slots</a> '+
	'<a href='+link+'slots&pay=4>Slots</a> '+// bet 100
	'<a href='+link+'bj>BlackJack</a> '+

	'<a href='+link+'mart>SGHM</a> '+
	'<a href='+link+'mart&do=list&type=1>Points</a> '+
	'<a href='+link+'mart&do=list&type=2>Tokens</a> '+
	'<a href='+link+'mart&do=list&type=3>DPs</a> '+
	'<a href='+link+'mart&do=list&type=4>Weapons</a> '+
	'<a href='+link+'mart&do=list&type=5>Armor</a> '+
	'<a href='+link+'mart&do=list&type=6>Parts</a> '+

	// Training Links  //will updates soon. (I can't go to primary or high school to check these)
	'<a href='+link+'p_school>Primary</a> '+
	'<a href='+link+'p_school&do=english>Int</a> '+
	'<a href='+link+'p_school&do=gym>Str</a> '+
	'<a href='+link+'p_school&do=gridiron>Pow</a> '+
	'<a href='+link+'p_school&do=running>Spd</a> '+

	'<a href='+link+'h_school>HighSchool</a> '+
	'<a href='+link+'h_school&do=int>Int</a> '+
	'<a href='+link+'h_school&do=str>Str</a> '+
	'<a href='+link+'h_school&do=pow>Pow</a> '+
	'<a href='+link+'h_school&do=spd>Spd</a> '+

	'<a href='+link+'uni>University</a> '+
	'<a href='+link+'uni&do=int>Int</a> '+
	'<a href='+link+'uni&do=str>Str</a> '+
	'<a href='+link+'uni&do=pow>Pow</a> '+
	'<a href='+link+'uni&do=spd>Spd</a> '+


	// Fighting Links
	'<a href='+link+'fight&ID=######>PlayerName</a> '+// replace ###### with hoboID

	'<a href='+link+'arena>Arena</a> '+
	'<a href='+link+'arena&do=combat&ID=1>Bill</a> '+
	'<a href='+link+'arena&do=combat&ID=2>Jack</a> '+
	'<a href='+link+'arena&do=combat&ID=3>John</a> '+
	'<a href='+link+'arena&do=combat&ID=4>Silver</a> '+
	'<a href='+link+'arena&do=combat&ID=5>Jimmy</a> '+
	'<a href='+link+'arena&do=combat&ID=6>Olaff</a> '+
	'<a href='+link+'arena&do=combat&ID=7>Cleats</a> '+
	'<a href='+link+'arena&do=combat&ID=8>Rob</a> '+
	'<a href='+link+'arena&do=combat&ID=9>Rob</a> '+
	'<a href='+link+'arena&do=combat&ID=10>Stiff</a> '+
	'<a href='+link+'arena&do=combat&ID=11>Nelson</a> '+
	'<a href='+link+'arena&do=combat&ID=12>Farter</a> '+
	'<a href='+link+'arena&do=combat&ID=13>???</a> '+
	'<a href='+link+'arena&do=combat&ID=14>Abe</a> '+
	'<a href='+link+'arena&do=combat&ID=15>OldMan</a> '+

	'<a href='+link+'parking_garage>FightClub</a> '+
	'<a href='+link+'parking_garage&action=combat&ID=16>Tyler</a> '+
	'<a href='+link+'parking_garage&action=combat&ID=17>Roy</a> '+
	'<a href='+link+'parking_garage&action=combat&ID=18>Todd</a> '+
	'<a href='+link+'parking_garage&action=combat&ID=19>Jangle</a> '+
	'<a href='+link+'parking_garage&action=combat&ID=20>Tiny</a> '+
	'<a href='+link+'parking_garage&action=combat&ID=21>Ahab</a> '+

	//2ndCity links
	'<a href='+link+'city2>2ndCity</a> '+
	'<a href='+link+'red_light_dis&do=explore>RLD</a> '+
	'<a href='+link+'sewer&where=4>Sewer</a> '+
	'<a href='+link+'bowling_alley>Bowling</a> '+

	'<a href='+link+'city_hall>CityHall</a> '+
	'<a href='+link+'city_hall&action=beg>Beg</a> '+
	'<a href='+link+'city_hall&action=rpsls>RPSLS</a> '+;
*/