// ==UserScript==
// @name	SIC (Super Invite Comment)
// @namespace	http://iago-soft.com/flickr
// @description Auto fill text to invite a photo to Groups and insert comments
// @description insert invitations and comments in flickr
// @version        0.7.6
// @identifier	http://iago-soft.com/flickr/sic.user.js
// @date           2007-11-01
// @creator        Santiago Caama�o basado en el c�digo desarrolaldo por Isidro Vila Verde (jvv@fe.up.pt)
// @include http://*flickr.com/photos/*/*
// ==/UserScript==
// --------------------------------------------------------------------
// Copyright (C) 2007 Santiago Caama�o
// Modificado y ampliado por Paco Calvino
// 
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// The GNU General Public License is available by visiting
//   http://www.gnu.org/copyleft/gpl.html
// or by writing to
//   Free Software Foundation, Inc.
//   51 Franklin Street, Fifth Floor
//   Boston, MA  02110-1301
//   USA
//
// Paco CT: Start *****************************************************************************
// Paco CT - 2007 10 23
// Updated:   existing invite codes
// Changed:   Do no write anything when "Separators" are selected
// Changed:   Invite 		Alphabetical order, but ArtLibre, BRAVO and Magic Donkey
// Changed:   Vote/Comment 	Alphabetical order, but BRAVO and Magic Donkey
// Activated: invite "ArtLibre" (# 21), but the result is not very convincing
// Added:
//	      invite "BetterThanGood" (# 73) Comment (# 74)
//            invite "Breathtaking eye-catcher" (# 75) Comment (# 76)
//            invite "CITRIT,Best of yours!" (# 77) Comment (# 78)
//            invite "Flowerotica" (# 79) Comment (# 80)
//            invite "Platinum Photography" (# 81) Comment (# 82)
//            invite "Search and Reward" (# 83) Comment (# 84)
//            invite "SILUETAS-SILHOUETTES" (# 85) Comment (# 86)
//            invite "Splendiferous!" (# 87) Comment (# 88)
//            invite "Superlativas" (# 89) Comment (# 90)
//            invite "The Perfect Photographer" (# 91) Comment (# 92)
//            invite "UltimateShot" (# 93) Comment (# 94)
//            invite "Ysplix" (# 95) Comment (# 96)
// Paco CT - 2007 10 24
// Corrected:  Better than good comment and invite were swaped
// Added:      Spaces above and below separators (Comments)
// Updated:    SuperShot Comment code
// Paco CT - 2007 10 27
// Added:
//	      invite "AmazingShots" (# 97) Comment (# 98)
// Paco CT - 2007 11 01
// Added:
//	      invite "Passion Photography" (# 99) Comment (# 100)
//	      invite "Mega Shot" (# 101) Comment (# 102)
//	      invite "The Moulin Rouge" (# 103) Comment (# 104)
// 	      
// Paco CT - 2007 11 04
// Added:     comment "Shield of Excellence" (105)
// Paco CT - 2007 11 06
// Modified:  "The Moulin Rouge" moved to the end Invite and Vote
// Added:     Separator for Moulin, ArtLibre, Bravo, ....
//            Invite "A+++" (106)
//
// Paco CT: End   *****************************************************************************

var val = [
	''
	//0
	,
	"<a"
	+" href=\"http://www.flickr.com/groups/beauty_is_in_the_eye_of_the_beholder/\"><img src=\"http://farm2.static.flickr.com/1313/1483450193_860bc927de_t.jpg\" width=\"40\" height=\"30\" alt=\"Beauty is in the *EYE* of the Beholder\" /> </a>"
	+"<b>Please add your Beautiful Photo to:</b>"
	+"\n<a href=\"http://www.flickr.com/groups/beauty_is_in_the_eye_of_the_beholder/\">Beauty is in the *Eye* of the Beholder! </a>"
	+"\n"
	 //1
	 ,
	"<a href=\"http://www.flickr.com/groups/colorphotoaward/\" title=\"Color"
	+"Award\"><img src=\"http://farm1.static.flickr.com/167/464408587_80628f697f_o.jpg\""
	+" alt=\"WINNER\" /></a>"
	+"\nYour fantastic color picture is my winner!"
	+"\nPlease add this photo to"
	+"<a href=\"http://www.flickr.com/groups/colorphotoaward/\">flickr.com/groups/colorphotoaward/</a>"
	+"\n"
	//2
	,
	"This photograph became an"
	+"<img src=\"http://static.flickr.com/113/315424718_c9a4ceac19_o.jpg\" width=\"136\" height=\"20\" alt=\"InstantFave Logo\" />"
	+"\nPlease post it to the <strong><a href=\"http://www.flickr.com/groups/28965835@N00/\">InstantFave</a></strong> group!"
	+"\n"
	//3
	,
	"<a href=\"http://www.flickr.com/groups/62286269@N00/\"><img src=\"http://farm1.static.flickr.com/55/397924305_70f3a7089b_o.jpg\">"
	+"\nYou are invited to join"
	+"\nThe Other Village </a>\n"
	//4
	,
	"<b>~I SNIFFED out this wonderful image!"
	+"\nYou deserve this nose worthy award!"
	+"\nPlease ADD your"
	+"Impressively beautiful"
	+"photo to~</b>"
	+"\n<a"
	+"href=\"http://www.flickr.com/groups/impressed_by_your_beauty/\"><img src=\"http://static.flickr.com/100/308925635_bc3c61924c_o.jpg\" width=\"67\" height=\"60\" alt=\"Impressed by your Beauty!\" > </a>"
	+"<a href=\"http://www.flickr.com/groups/impressed_by_your_beauty/\">Impressed by your Beauty! (Invite only images) </a>"
	+"<b>Please tag</b> your photos <b>ImpressedBeauty</b> </a>\n"
	//5
	,
	"I have faved and tagged your picture with <b>BRAVO</b>"
	+ 'and this serves as an invitation to '	
	+ '<a href="http://www.flickr.com/groups/thebestbravo/">The Best: BRAVO</a>.\n'
	//6
	,
		


	"\n<a href=\"http://www.flickr.com/groups/searchthebest/\"><img src=\"http://farm1.static.flickr.com/159/368364370_905edf19e7_o.png\">"
	+"\n<b>SearchTheBest</b></a>"
	+"\nPlease tag \"SearchTheBest\".\n"
	//7
	,
	"<a href=\"http://www.flickr.com/groups/cerofex\"><img src=\"http://static.flickr.com/80/253461867_ff19e70b6a_t.jpg\" alt=\"Nominee\" /></a>"
	+"\nCongratulations!"
	+"\nYour pic becomes nominee of \"Shield Of Excellence\""
	+"\nPlease add this photo to"
	+"<a href=\"http://www.flickr.com/groups/cerofex\" >Shield Of Excellence Group</a>\n"
	//8
	,
	"<img src=\"http://static.flickr.com/61/228129282_c14d7c812a_o.jpg\""
	+"/> \n (<a href=\"http://www.flickr.com/groups/flickrgold/\">gallery & instructions</a>)\n"
	//9
	,
	'<a href="http://www.flickr.com/photos/34072207@N00/205703677/" title="Photo Sharing">'
	+ '<img src="http://static.flickr.com/59/205703677_42bc2e7649_t.jpg" width="71" height="100" alt="WINNER" /></a>'+"\n"
	+ "You are MY WINNER!\n"
	+ "Please add this photo to\n"
	+ "www.flickr.com/groups/mywinners/\n"
	//10
	,
	'<a href="http://www.flickr.com/photos/34072207@N00/205703677/" title="Photo Sharing">'
	+ '<img src="http://static.flickr.com/185/364790486_1c797a68e1_t.jpg" width="98" height="100" alt="WINNER" /></a>'+"\n"
	+ "Definitely a winner!!!\n"
	+ "You deserve another one.\nFound in www.flickr.com/groups/mywinners/\n"
	//11
	,
	'<a href="http://www.flickr.com/groups/bigfave" title="A Big Fave">'
	+'<img src="http://static.flickr.com/60/206034722_7c1e091cb5_t.jpg" width="48" height="48" alt="A Big Fave" />'
	+ "\nA Big Fave</a>\nPlease add this to www.flickr.com/groups/bigfave\n"
	//12
	,
	""
	//13
	,
	"<a href=\"http://www.flickr.com/groups/flickr_smileys\"> Thumbs Up! from Flickr Smileys </a>"
	+"\n<a href=\"http://www.flickr.com/photos/flickrsmileys/201007926/\"><img src=\"http://static.flickr.com/60/201007926_a74c2c11b1_o.jpg\" width=\"103\" height=\"103\" alt=\"Thumbs Up\" /></a>\n"
	//14
	,
	"<img src=\"http://static.flickr.com/100/buddyicons/24333070@N00.jpg\""
	+"width=\"48\" height=\"48\" /> <br />"
	+"\n<a href=\"http://www.flickr.com/groups/a-grade/\">A+++ Grade Photo</a>\n"
	//15
	,
	"<a href=\"http://www.flickr.com/groups/60419004@N00/\"><img src=\"http://farm1.static.flickr.com/173/463726593_a3d7589374_o.jpg"
	+"\" ></a><a href=\"http://flickr.com/groups/60419004@N00/\">Flickr Hearts - Post 1 - Give 5 Flickr Hearts </a>\n"
	//16
	,
	"<a href=\"http://www.flickr.com/groups/62286269@N00/\" title=\"The Other Village\"><img src=\"http://farm1.static.flickr.com/55/397924305_70f3a7089b_o.jpg\" alt=\"The Other Village\">"
	+"\nSeen in the Other Village</a>\n"
	
	//17
	,
	


	"<a href=\"http://www.flickr.com/groups/tepasaste/\"><img src=\"http://farm1.static.flickr.com/139/328681895_e12eac693b_o.jpg\" width=\"240\" height=\"39\" ></a>"
	+"\nTe invito a postear tu foto al grupo <a href=\"http://www.flickr.com/groups/tepasaste/\">"
	+"\nte pasaste</a>\n"
	//18
	,

	"<a href=\"http://www.flickr.com/groups/tepasaste/\">"
	+"\n<img src=\"http://farm1.static.flickr.com/183/389748793_2238a0c9dc_o.jpg\" width=\"150\" height=\"33\" ></a>\n"
	//19
	,
	"<a href=\"http://www.flickr.com/groups/faithfulflickrfriends/\"><img src=\"http://farm1.static.flickr.com/148/345309016_a3c1ba8b0e_o.gif\" width=\"49\" height=\"49\" alt=\"friend invite\" />From Faithful Flickr Friends</a>\n"
	//20
	,
	"+---------��---------+ \n"
	+"This Masterpiece deserved to appear in : \n"
	+" \n"
	+"<a href=http://www.flickr.com/groups/freeart/\">\" �Art Libre-Free Art-Arte Libre-Freie Kunst-invited pix only� </a>. \n"
	+" \n"
	+"tag with : \"ArtLibre\" and consider joining us :o) \n"
	+" \n"
	+"\" There's no retirement for an artist, \n"
	+"it's your way of living so there's no end to it.\" \n"
	+" \n"
	+"\[Bono \] Singer \n"
	+"+---------��---------+  \n"	
	//21
	,
	"<a href=\"http://www.flickr.com/groups/flickr_poker\">flickr poker<a>"
	+"\n<a href=\"http://www.flickr.com/photos/77606151@N00/194491432/\"><img src=\"http://static.flickr.com/64/194491432_30ef6a8fa4_o.jpg\" width=\"40\" height=\"40\" alt=\"flickrpoker1\" /></a>\n"
	
	//22
	,
	"<a href=\"http://www.flickr.com/groups/blueribbon/\"><img src=http://farm1.static.flickr.com/192/505040398_842abfd9c2_o.jpg></a>You Are A Blue Ribbon Winner! If you haven't done so, please add your photo to:</b><a href=\"http://www.flickr.com/groups/blueribbon/\">< alt=\"Blue Ribbon Photography\"></a>"
	+"<a href=\"http://www.flickr.com/groups/blueribbon/\">Blue Ribbon Photography (Invited Images ONLY)</a>"
	+"\n <b>Please tag your photo: BlueRibbonWinner</b> \n"
	
	//23
	,
	"I have faved and tagged your picture with <b>MagicDonkey</b>, and this serves as an invitation to "
	+"\n<a href=\"http://flickr.com/groups/MagicDonkey\">MagicDonkey</a>. Please read the rules. (You must be invited to four other invite only groups, and one must be either Quality or The Best: Bravo before posting here.)"
	+"\nPlease tag with <b>MagicDonkey</b>\n"
	
	//24
	,
	"<a href=\"http://www.flickr.com/groups/magicdonkey/\"><img src=\"http://farm1.static.flickr.com/131/359551990_3ee96c9e2b_o.png\"><b>MagicDonkey</b></a>\n"
	
	//25
	,
	"<img src=\"http://static.flickr.com/79/231017750_dfcb7e50eb_o.jpg\" alt=\"Outstanding Shots\" /> Outstanding Shot! Please add this to our pool!"
	+"\n(Join <a href=\"http://www.flickr.com/groups/outstanding_shots/\"><strong>Outstanding Shot group</strong></a> and give awards!)"
	+"\n<strong>Please add \"Outstanding Shots\" tag to your photo</strong>\n"
	
	//26
	,
	"<img src=\"http://static.flickr.com/79/231017750_dfcb7e50eb_o.jpg\" alt=\"Outstanding Shots\" /> Outstanding Shot! This is my favourite of the pool!"
	+"\n(Join <a href=\"http://www.flickr.com/groups/outstanding_shots/\"><strong>Outstanding Shot group</strong></a> and give awards!)"
	+"\n<strong>Please add \"Outstanding Shots\" tag to your photo</strong>\n"
	//27
	
	,"I saw this in <a href=\"http://www.flickr.com/groups/bigfave\" title=\"A Big Fave\"><img src=\"http://static.flickr.com/60/206034722_7c1e091cb5_t.jpg\" width=\"24\" height=\"24\" alt=\"A Big Fave\" />A Big Fave</a>\n"
	//28
	
	,
	"<b>---This photo has been found at---</b>"
	+"\n<a href=\"http://flickr.com/groups/realone/\"><img src=\"http://img138.imageshack.us/img138/9824/realonecz7.jpg\" alt=\"RealOne\" /></a>"
	+"\n<b>everybody be free to join and post</b>\n"
	//29
	
	,
	"This photo has been selected for\n"
	+"<b>Golden Photographer Award</b>\n"
	+"<a href=\"http://www.flickr.com/groups/goldenphotographer/\"><img src=\"http://farm1.static.flickr.com/163/379943453_e14305caed_o.jpg\" title=\"Golden Photographer\"></a>\n"
	+"Add this one to <a href=\"http://www.flickr.com/groups/goldenphotographer/\">http://www.flickr.com/groups/goldenphotographer/</a>\n"
	+"(Please tag as <b>GoldenPhotographer</b> and read the rules before post).\n"
	//30
	,
	"You are my <b>Golden Photographer</b> as well!\n"
	+"<a href=\"http://www.flickr.com/groups/goldenphotographer/\"><img src=\"http://farm1.static.flickr.com/163/379943453_e14305caed_o.jpg\" title=\"Golden Photographer\"></a>\n"
	//31
	,
	"\n"
	+"\n"
	//32
	,	
	"<a href=\"http://www.flickr.com/groups/travelerphotos/\"><img src=\"http://farm1.static.flickr.com/100/372772572_6bbc3a2e45_m.jpg\" width=\"48\" height=\"48\" alt=\"Traveler photos point of view\" />Traveler point of view</a>"
	+"\nPlease add this great photo to Traveler Photos Point of View"
	+"\nTag your photo with \"Travelerphotos\" and the country where it has been taken.\n"
	
	//33
	,
	
	

	"<a href=\"http://www.flickr.com/groups/travelerphotos/\"><img src=\"http://farm1.static.flickr.com/138/372772570_7db3756141_t.jpg\" width=\"48\" height=\"48\" alt=\"Traveler point of view\" />"
	+"\nTraveler photos point of view</a>"
	+"\nThis is a really great Traveler Photo Point of View\n"
	
	//34
	,
	

	"<a href=\"http://www.flickr.com/groups/searchthebest/\"><img src=\"http://farm1.static.flickr.com/159/368364370_905edf19e7_o.png\">"
	+"\nSearchTheBest</a>\n"
	//35
	,
	


	"<a href=\"http://www.flickr.com/groups/AnAwesomeShot\"><img src=\"http://static.flickr.com/101/298971495_f151cfcad2_t.jpg\" width=\"48\" height=\"48\" alt=\"An Awesome Shot\" />An Awesome Shot Award</a>"
	+"\nYou are invited to add this image to <a href=\"http://www.flickr.com/groups/AnAwesomeShot\">An Awesome Shot!</a>"
	+"\n<b>Please tag the photo with \"AnAwesomeShot\"</b>\n"
	//36
	,
	"I saw this in <a href=\"http://www.flickr.com/groups/AnAwesomeShot\">An Awesome Shot!</a>"
	+"\n<a href=\"http://www.flickr.com/groups/AnAwesomeShot\"><img src=\"http://static.flickr.com/101/298971495_f151cfcad2_t.jpg\" width=\"48\" height=\"48\" alt=\"An Awesome Shot\" />\n"
	//37
	,
	"I think this photo is a"
	+"\n<a href=\"http://www.flickr.com/groups/supershot/\"><img src=\"http://farm1.static.flickr.com/26/50628782_36c6c0783c_o.jpg\" width=\"100\" height=\"100\" /></a>"
	+"\nPlease add your photo to <a href=\"http://www.flickr.com/groups/supershot/\">www.flickr.com/groups/supershot/</a>"
	+"\nAfter you add it to the group pool, please tag this photo as a <strong>SuperShot</strong>\n"
	//38
	,
	"I agree, this is definitely a\n"
	+"<a href=\"http://www.flickr.com/groups/supershot/\"><img src=\"http://farm1.static.flickr.com/24/50628967_e01befed2b_o.jpg\" width=\"110\" height=\"28\" alt=\"Super Shot\" /></a>\n"
	+"If you have not already done so, please add your photo to <a href=\"http://www.flickr.com/groups/supershot/\">www.flickr.com/groups/supershot/</a>\n"
	+"After you add it to the group pool, please tag this photo as a <strong>SuperShot</strong>\n"
	//39
	,
	
	"<a href=\"http://www.flickr.com/groups/superbmasterpiece\"/><img src=\"http://farm1.static.flickr.com/159/413529700_44434eed1b_m.jpg\">"
	+"\n</a><b>Congratulations!</b>"
	+"\nYour photo has been nominated as <b>\"Superb Masterpiece\"</b>"
	+"\n<b>You are invited</b> to add your wonderful picture to <a href=\"http://www.flickr.com/groups/superbmasterpiece/\"><b>Superb Masterpiece Group</a>"
	+"\nPlease</b> read the Group Rules and tag your photo <b>SuperbMasterpiece</b>\n"
	//40
	,
	"<a href=\"http://www.flickr.com/groups/superbmasterpiece/\"><img src=\"http://farm1.static.flickr.com/159/413529700_44434eed1b_m.jpg\"></a>"
	+"\n<b>I have seen your \"Superb Masterpiece Picture\" in:"
	+"\n<a href=\"http://www.flickr.com/groups/superbmasterpiece/\">Superb Masterpiece Group - Invited photos only</a></b>\n"
	//41
	,
	
	"<img src=\"http://static.flickr.com/94/236580421_ca66e1ef3d_o.jpg\">"
	+"\n<a href=\"http://www.flickr.com/groups/trophy/\">This gets a trophy!</a>\n"
	//42
	,
	
	"<a href=\"http://www.flickr.com/groups/blueribbon/\"><img src=http://farm1.static.flickr.com/192/505040398_842abfd9c2_o.jpg></a>I saw this photo in Blue Ribbon Photography. You deserve another Blue Ribbon!</b><a href=\"http://www.flickr.com/groups/blueribbon/\">< alt=\"Blue Ribbon Photography\"></a>"
	+"<a href=\"http://www.flickr.com/groups/blueribbon/\">Blue Ribbon Photography (Invited Photos ONLY)</a>"
	+"\n <b>Please tag your photo: BlueRibbonWinner</b> \n"
	//43
	,
	
	
	"<img src=\"http://static.flickr.com/85/238945297_98b6855dd7_o.jpg\">"
	+"\n<a href=\"http://www.flickr.com/groups/trophy/\">You win a trophy!</a>\n"
	//44
	,
	
	"<a href=\"http://www.flickr.com/groups/thebestbravo/\">Seen in The Best: BRAVO</a>\n"
	//45
	,
	
	"I saw this in <a href=\"http://flickr.com/groups/beauty_is_in_the_eye_of_the_beholder/\">Beauty is in the *Eye* of the Beholder! </a>"
	+"\n"
	//46
	,
	"<b>\~Just stopping by for\n"
	+"another SNIFF of this\n"
	+"Impressively beautiful image!\n"
	+"You deserve ANOTHER\n"
	+"nose worthy award!\~</b>\n"
	+"<a href=\"http://www.flickr.com/groups/impressed_by_your_beauty/\"><img src=\"http://farm1.static.flickr.com/157/353433054_b6b3ab9bb8_t.jpg\" height=\"100\" width=\"92\" alt=\"Impressed by your Beauty!\"> </a>\n"
	+"<a href=\"http://www.flickr.com/groups/impressed_by_your_beauty/\">Impressed by your Beauty!</a>\n"
	+"<b>Find </b><a href=\"http://flickr.com/groups/impressed_by_your_beauty/discuss/72157594513133128/#comment72157594513140092\">2nd Sniffer HERE.</a>\n"
	//47
	,
	
	"<a href=\"http://flickr.com/groups/bwphotoaward/\" title=\"Black and White Award\"><img src=\"http://farm1.static.flickr.com/199/464447143_82fae3f3ba_o.jpg\" alt=\"WINNER\" /></a> \n"
	+"Your fantastic black and white picture is my winner!\n"
	+"Please add this photo to \n"
	+"<a href=\"http://flickr.com/groups/bwphotoaward/\">flickr.com/groups/bwphotoaward/</a>\n" 
	//48
	,
	"<b> I SAW YOU FIRST</b>"
	+"\n Please add this inspiring photo to"
	+"\n <a href=\"http://www.flickr.com/groups/isawyoufirst/\"><img src=\"http://farm2.static.flickr.com/2155/1619270985_14e8175f61_o.jpg\" width=\"73\" height=\"100\" alt=\"I saw you first\" >"
	+"\n <b> I SAW YOU FIRST !!! </b> </a>(invited images only)"
	+"\n Please tag your image \"isawyoufirst\" "
	+"\n"
	//49
	,
	
	"Great Shot! Please join us at:"
	+"\n<a href=\"http://www.flickr.com/groups/thisisart/\"><img src=\"http://farm1.static.flickr.com/137/382417495_5dac1ee276_m.jpg\" width=\"101\" height=\"120\"> <br>I Think this is Art ! </a>\n"
	//50
	,
	"<a href=\"http://www.flickr.com/groups/thisisart/\"><img src=\"http://farm1.static.flickr.com/139/382397085_eeb3b66b97_m.jpg\"width=\"70\" height=\"82\"> <br> I Think this is Art ! AWARD</a>\n"
	//51
	,
	"<a href=\"http://www.flickr.com/groups/naturesfinest><img src=\"http://farm1.static.flickr.com/129/362577029_a8c6200d29_s.jpg\" width=\"48\" height=\"48\" alt=\"NaturesFinest\" />NaturesFinest"
	+"\nPlease add this great photo to Natures Finest"
	+"\nTag your photo with \"NaturesFinest\"</a>\n"
	//52
	,
	"<a href=\"http://www.flickr.com/groups/naturesfinest/\"><img src=\"http://farm1.static.flickr.com/129/362577029_a8c6200d29_s.jpg\" width=\"48\" height=\"48\" alt=\"NaturesFinest\" />NaturesFinest"
	+"\nThis is really one of Natures Finest!!></a>\n"
	//53
	,
	
	"	<b>THIS SHOT IS WONDERFUL! </b>\n"
	+"Your are invited to post at:\n"
	+"<a href=\"http://flickr.com/groups/67834258@N00/\"><img src=\"http://farm1.static.flickr.com/127/378362728_a9db63be7f_o.jpg\" /> </a>\n"
	+"<a href=\"http://flickr.com/groups/67834258@N00/\">Tree Subject - Invited Photo Only </a>\n"
	//54
	,

	"Seen in\n"
	+"<a href=\"http://flickr.com/groups/67834258@N00/\"><img src=\"http://farm1.static.flickr.com/175/406950584_282c5affb4_o.jpg\" width=\"60\" height=\"45\"/></a>\n"
	+"<a href=\"http://www.flickr.com/groups/67834258@N00/\">TREE Subject - Invited Photo Only </a>\n"
	//55
	,
	"Congratulations your photo has been WOWed and awarded with a WowieKazowie!\n"
	+"\n"
	+"You are invited to join the WowieKazowie Group!\n"
	+"<a href=\"http://www.flickr.com/groups/wowiekazowie/\"><img src=\"http://farm1.static.flickr.com/133/395867904_15687a85a2_t.jpg\"/></a>\n"
	+"Please tag your photo with \"WowieKazowie\"\n"
	//56
	,

	"Congratulations your photo was WOWed and seen in the WowieKazowie Group!\n"
	+"<a href=\"http://www.flickr.com/groups/wowiekazowie/\"><img src=\"http://farm1.static.flickr.com/133/395867904_15687a85a2_t.jpg\"/></a>\n"
	+"Please tag your photo with \"WowieKazowie\"\n"
	//57
	,
	"<a href=\"http://www.flickr.com/groups/pritzkerprize\"><img src=\"http://static.flickr.com/113/292421334_5f1021f1b8_s.jpg\" width=\"75\" height=\"75\" alt=The Pritzker Prize on flickr\" /></a>\n"
	+"<a href=\"http://www.flickr.com/groups/pritzkerprize\"> The Pritzker Architecture Prize on flickr</a>\n"
	//58
	,
	"\n<a target=\"_blank\" href=\"http://www.flickr.com/groups/karma/\"> Your KARMA Group</a>"
	//59
	,
	"<a href=http://www.flickr.com/groups/peopleschoice><img src=http://farm1.static.flickr.com/154/382476374_773e97ac18_s.jpg>\n"
	+"People's Choice</a>\n"
	//60
	,
	
	"Your excellent photo deserves a Tornado Award.\n"
	+"<a href=http://www.flickr.com/groups/tornadoaward/><img src=http://farm1.static.flickr.com/165/399667192_d0adc18dc5_t.jpg></a>\n"
	//61
	,
	
	"<a href=\"http://www.flickr.com/groups/XploreMyPix/\"><img src=\"http://static.flickr.com/88/229982850_d64169218e_o.jpg\" /></a>\n"
	//62
	,
	
	"<a href=\"http://www.flickr.com/groups/Greatpix123/\"><img src=\"http://static.flickr.com/94/270088408_44155dc2bd_o.jpg\" /></a>\n"
	//63
	,
	
	"<a href=\"http://www.flickr.com/groups/globalvillage/\"><img src=\"http://static.flickr.com/174/404179786_d090d3104f_o.jpg\" width=\"32\" height=\"32\"></a> This world-class image was found in <a href=\"http://flickr.com/groups/globalvillage\">Global Village 2</a>\n"
	//64
	,
	
	"I give you a <a href=\"http://www.flickr.com/groups/flower-power/\"> <img src=\"http://img216.imageshack.us/img216/8342/flowerpowerhg3.gif/\"></a> From the <a href=\"http://flickr.com/groups/flower-power/\">FLOWER-POWER Group</a>\n"
	//65
	,
	"<img src=http://farm1.static.flickr.com/154/396808312_7037000029_o.jpg>\n"
	+"<a href=http://www.flickr.com/groups/6fave100>Seen in the 6+Faves, 100+Views, Leave 2 Comments Group</a>\n"
	//66
	,
	
	"<a href=\"http://www.flickr.com/groups/flickrdiamondclassphotographer/\"><img src=\"http://farm1.static.flickr.com/136/393692022_30d434e472_o.gif\"></a>\n"
	+"This <b>Great Photographic Art</b> was made by a <b>Diamond Class Photographer!</b>\n"
	+"Please add your photo to <a href=\"http://www.flickr.com/groups/flickrdiamondclassphotographer/\"><b> Flicker Diamond The Diamond Class Photographer</a></b>\n"
	+"Read the group rules please and tag your photo <b>DiamondClassPhotographer</b>\n"
	//67
	,
	
	"<a href=\"http://www.flickr.com/groups/flickrdiamondclassphotographer/><img src=\"http://farm1.static.flickr.com/138/393683364_02b7b36f30_o.gif\"></a>"
	+"\n <b>You deserve \"Another Diamond\" on your Great Photo!</b>"
	+"\n I have seen your <b>Great Photographic Art</b> in:"
	+"\n <a href=\"http://www.flickr.com/groups/flickrdiamondclassphotographer/\"><b>Flickr Diamond: The Diamond Class Photographer</b></a> \n"
	//68
	
	,

	"<b>I think this is a great image!"
	+"\n I have tagged the image \"FlickrsBest\" and"
	+"\n you are invited to join and add it to:"
	+"\n </b><a href=\"http://www.flickr.com/groups/flickrs-best/\">"
	+"<img src=http://farm1.static.flickr.com/193/512467248_f7f5dcaba2_s.jpg></a>"
	+"\n <b>Well done. </b>"
	+"\n <a> Please ensure that your image is 'Tagged' - FlickrsBest - Thanks </a> \n"
	//69
	,
	
	"<b>This is definitely one of Flickrs Best </b>\n"
	+"<a href=\"http://www.flickr.com/groups/flickrs-best/\"><img src=http://farm1.static.flickr.com/193/512467248_f7f5dcaba2_s.jpg></a>\n"
	+"<b>Well done.</b>\n"
	+"<b> Please ensure image is 'Tagged' - FlickrsBest - Thanks </b>\n"
	//70
	,
	"<a target=\"_blank\" href=\"http://www.flickr.com/groups/the_world_through_my_eyes/\" >The World Through My Eyes</a>\n"
	//71
	,
	"This photo is considered to be an outstanding architecture shot and invited to <a href=\"http://www.flickr.com/groups/pritzkerprize\"> The Pritzker Architecture Prize on flickr</a> rating group, where you can rate other shots and your shot will be rated too. Please read the group description and rules for more details.\n"
	+"<a href=\"http://www.flickr.com/groups/pritzkerprize\"><img src=\"http://static.flickr.com/111/292420708_c08ba01ac4_o.jpg\" width=\"97\" height=\"128\" alt=\"The Pritzker Prize on flickr\" /></a>\n" 
	//72
	,
	"<b>You are invited to display your image.</b> \n"
	+"<a href=\"http://www.flickr.com/groups/betterthangood/\"><img src=\"http://farm1.static.flickr.com/199/471922433_8219da499b_t.jpg\" width=\"90\" height=\"100\" alt=\"Who You Lookin\' At\?\" /></a> \n"
	+"<a href=\"http://www.flickr.com/groups/betterthangood/\"> Better Than Good</a> \n"
	+"<b>Invitation Only\n if you accept this Invitation,\n please give awards to other images.</b> \n" 
	//73
	,
	"<b>Your Image Truly Is:</b> \n"
	+"<a href=\"http://www.flickr.com/groups/betterthangood/\"><img src=\"http://farm1.static.flickr.com/205/451634975_a02c5c57c8_t.jpg\" width=\"76\" height=\"100\" /></a> \n"
	+"<a href=\"http://www.flickr.com/groups/betterthangood/\"> Better Than Good</a> \n"
	+"<b>Invitation Only </b> \n" 
	//74
	,	
	"<img src=\"http://farm2.static.flickr.com/1349/buddyicons/511260@N23.jpg?1190172859\" title=\"Breathtaking eye-catcher\" alt=\"Breathtaking eye-catcher\" width=\"50\" height=\"50\"\" /> \n"
	+"Please add your amazing photo to: \n"
	+"<a href=\"http://www.flickr.com/groups/breathtaking_eye-catcher/\">Breathtaking eye-catcher</a> But please read the group rules carefully !!! \n"
	+"Please tag this photo with B-E-C when you add it to the pool !! \n"
	//75
	,	
	"<img src=\"http://farm2.static.flickr.com/1349/buddyicons/511260@N23.jpg?1190172859\" title=\"Breathtaking eye-catcher\" alt=\"Breathtaking eye-catcher\" width=\"50\" height=\"50\"\" /> \n"
	+"Seen in the <a href=\"http://www.flickr.com/groups/breathtaking_eye-catcher/\">Breathtaking eye-catcher</a> group. \n"
	//76
	,	
	"Please add this beautiful photo to CITRIT,Best of yours! \n"
	+"<a href=\"http://www.flickr.com/groups/322290n20/\">Citrit group </a> \n"
	+"<a href=\"http://www.flickr.com/groups/322290n20/\"><img src=\"http://farm1.static.flickr.com/170/431269360_314aa2b329_o.gif\"></a>\n"
	//77
	,	
	"I give you a <img src=\"http://farm1.static.flickr.com/166/429674617_16dc4cd013_o.gif?v=0></>FROM CITRIT,BEST OF YOURS \n"
	+"<a href=\"http://www.flickr.com/groups/322290n20/\">Citrit, best of yours!</a> \n"
	//78
	,	
	"<b>This excellent picture is a <a href=\"http://www.flickr.com/groups/flowerotica/\">Flowerotica</a>.\n"
	+"We would be honoured to have it in our pool.</b> \n"
	+"\n"
	+"<a href=\"http://www.flickr.com/groups/flowerotica/\"><img src=\"http://farm1.static.flickr.com/253/456223351_a234a49e60_t.jpg\" width=\"100\" height=\"82\" alt=\"Flowerotica II (Orality)\" alt=\"/></a>\n"
	+"\n"
	+"Only invited photos. Please tag with \"Flowerotica\".\n"
	+"<b>Remember: you MUST comment & fave 3 photos from the group.</b>\n"
	+"You can also participate in the weekly contest.\n"
	//79
	,	
	"<b>Seen in <a href=\"http://www.flickr.com/groups/flowerotica/\">Flowerotica</a></b>\n"
	+"\n"
	+"<a href=\"http://www.flickr.com/groups/flowerotica/\"><img src=\"http://farm1.static.flickr.com/253/456223351_a234a49e60_t.jpg\" width=\"100\" height=\"82\" alt=\"Flowerotica II (Orality)\" alt=\"/></a>\n"
	//80
	,	
	"<a href=http://www.flickr.com/groups/platinumphoto><img src=http://i105.photobucket.com/albums/m232/sdunc21/medal.gif></a> \n"
	+"Your photo has been appraised as a <a href=\"http://www.flickr.com/groups/platinumphoto/\">Platinum Photograph</a> \n"
	+"We would be honored to have your photo in our group!\n"
	+"Please tag your photo with <b>platinumphoto</b>\n"
	//81
	,	
	"<a href=\"http://www.flickr.com/groups/platinumphoto><img src=\"http://i105.photobucket.com/albums/m232/sdunc21/star.gif\" alt=\"Platinum Photography Stars\" /></a> \n"
	+"Your Platinum Photo has earned a Platinum Star!\n"
	+"Collect 5 stars to enter <a href=\"http://www.flickr.com/groups/platinumphoto/discuss/\">Photo of the Week </a>contests!\n"
	//82
	,	
	"<a href=\"http://www.flickr.com/groups/searchexploreviewselectreward_/\"><img src=\"http://farm1.static.flickr.com/188/432183980_086086ce25_t.jpg\" width=\"60\" height=\"85\" /></a>\n"
	+"This photo was the <b>Most Rewarding</b>\n"
	+"Please add your Masterpiece to\n"
	+"<a href=\"http://www.flickr.com/groups/searchexploreviewselectreward_/\">Search and Reward </a> and tag with\n"
	+"\"SearchandReward\".Thank you \n"
	//83
	,	
	"<a href=\"http://www.flickr.com/groups/searchexploreviewselectreward_/\"><img src=\"http://farm1.static.flickr.com/188/432183980_086086ce25_t.jpg\" width=\"27\" height=\"33\" /></a> <a href=\"http://www.flickr.com/groups/searchexploreviewselectreward_/\">Search and Reward</a> \n"
	//84
	,	
	"<a href=\"http://www.flickr.com/groups/siluetas/\"><img alt=\"siluetazo\" src=\"http://static.flickr.com/193/492923611_72d7811438_m.jpg\" title=\"siluetazo 2 (by siluetas_silhouettes)\" alt=\" siluetazo 2 (by siluetas_silhouettes)\" width=\"180\" height=\"138\"></a>\n"
	+"\n"
	+"--<b>Esta foto ha sido invitada al pool de <a href=\"http://www.flickr.com/groups/siluetas/\">Siluetas</a></b>\n"
	+"--<b>This picture has been invited to the group <a href=\"http://www.flickr.com/groups/siluetas/\">Silhouettes</a></b>\n"
	//85
	,	
	"<a href=\"http://www.flickr.com/groups/siluetas/\"><img src=\"http://static.flickr.com/229/520079322_e4e1e22a70_t.jpg\" title=\"S\" alt=\"S\" width=\"74\" height=\"75\" /></a>\n"
	+"<a href=\"http://www.flickr.com/groups/siluetas/\">Vista en//Seen in SILUETAS-SILHOUETTES</a><em>(<a href=\"http://www.flickr.com/groups/groupannouncements/discuss/72157594158926496/\">?</a>)</em>\n"
	//86
	,	
	"<a href=\"http://www.flickr.com/groups/51231580@N00/\"><img src=\"http://farm1.static.flickr.com/173/369818351_29a2a9c0ae_o.jpg\" width=\"58\" height=\"58\" /></a> This <b>award</b> serves as an invitation.\n"
	+"Please add your photo <b>marvel</b> to <b><a href=\"http://www.flickr.com/groups/51231580@N00/\">Splendiferous!</a></b>. (Read Rules)\n"
	+"Please be sure all images are tagged Splendiferous.\n"
	//87
	,	
	"<Seen in <b><a href=\"http://www.flickr.com/groups/51231580@N00/\">Splendiferous!</a></b>\n"
	//88
	,	
	"<a href=\"http://www.flickr.com/groups/superlativas\"><img src=\"http://farm1.static.flickr.com/179/473979571_6d2b663aef_s.jpg\" width=\"48\" height=\"48\" alt=\"SUPERLATIVAS\" />SUPERLATIVAS</a> \n"
	+"You are invited to add this image to www.flickr.com/groups/superlativas \n"
	+"Please tag this photo with <b>SUPERLATIVAS</b> when you add it to the pool.\n"
	+"Tras a�adir tu foto al Grupo, por favor etiqu�tala con superlativas \n"
	//89
	,	
	"\�SUPERLATIVA FOTO!, BUENA, BON\�SIMA, \�PTIMA \�COJONUDA*!\n"
	+" (* Cojonudo/a, seg�n el D.R.A.E. es = adj. vulg. Estupendo, magn�fico, excelente)\n"
	+"<a href=\"http://www.flickr.com/groups/superlativas/\"><img src=\"http://farm1.static.flickr.com/179/473979571_f676b3aa46_o.jpg\" width=\"70\" height=\"64\" >Superlativas (invite only images)</a>\n"
	//90
	,	
	"<b>This is Perfect! </b>\n"
	+"\n"
	+"<img src=\"http://farm2.static.flickr.com/1431/1134589255_afbbce6a60_o.jpg \"width=\"100\" height=\"97\"alt=\"Perfect Photographer Invitation\" /> </a>\n"
	+"\n"
	+"<b>This photo has been selected for <a href=\"http://www.flickr.com/groups/theperfectphotographers/\" > The Perfect Photographer Award</b> </a>\n"
	+"<b>Please add this image to</b> <a href=\"http://www.flickr.com/groups/theperfectphotographers/\" > The Perfect Photographer, Award 2 Fave 2 </a>\n"
	+"And tag the photo with \" <b>The Perfect Photographer</b>\" \n"
	//91
	,	
	"<b>Absolutely The Perfect Photographer</b>\n"
	+"<b>You Deserve Another Perfect Photographer Award!!! </b>\n"
	+"<img src=\"http://farm2.static.flickr.com/1378/1134589705_289da6dcf0_o.jpg\" width=\"120 \"height=\"116 \"alt=\"The Perfect Photographer Award\" />\n"
	+"<a href=\"http://www.flickr.com/groups/theperfectphotographers/\" >The Perfect Photographer(Invited Only) Awards 2 Fave 2 </a>\n"
	//92
	,	
	"You have been invited to add this image to Ultimate Shots!\n"
	+"<a href=\"http://flickr.com/groups/ultimateshot/\">Ultimate Shot \~ Post Invited Images Only!</a>\n"
	+"<a href=\"http://flickr.com/groups/ultimateshot/\"><img src=\"http://static.flickr.com/136/320244003_f0f32246c3_t.jpg\" width=\"75\" height=\"46\" alt=\"ultimate\" \"></a>\n"
	+"Please add the tag \"UltimateShot\"\n"
	//93
	,	
	"I saw this in <a href=\"http://www.flickr.com/groups/ultimateshot/\">Ultimate Shot \~ Post Invited Images Only!</a>\n"
	+"<a href=\"http://flickr.com/groups/ultimateshot/\"><img src=\"http://farm1.static.flickr.com/149/437363216_3da263cf42_t.jpg\" width=\"75\" height=\"46\" alt=\"ultimate\" \"></a>\n"
	//94
	,	
	"<a href=\"http://www.flickr.com/groups/ysplix/\"> <img src=\"http://farm2.static.flickr.com/1229/1424869079_b7efe90bc8_o.gif\" width=\"75\" height=\"75\" alt=\"Ysplix\" /></a>\n"
	+"This is an excellent photo!!!\n"
	+"Accept this symbolic ancient prize and admit your photo to a noble contest among the finest in:\n"
	+"<a href=\"http://www.flickr.com/groups/ysplix/\">www.flickr.com/groups/ysplix/</a>\n"
	+"and please remember to tag this photo <b>Ysplix</b>\n"
	//95
	,	
	"<a href=\"http://www.flickr.com/groups/ysplix/\"><img src=\"http://farm2.static.flickr.com/1226/1427193109_a01bebc51f_o.gif\" width=\"75\" height=\"75\" alt=\"Ysplix\" /></a>\n"
	+"Seen this excellent photo in <b>Ysplix </b><a href=\"http://www.flickr.com/groups/ysplix/\">www.flickr.com/groups/ysplix/</a>\n"
	//96
	,	
	"<a href=\"http://www.flickr.com/groups/amazing_shots/\"><img src=\"http://farm3.static.flickr.com/2313/1604158904_f758932254_m.jpg\">\n"
	+"This is an Amazing Shot!</a> Please consider adding your photograph to the group <b>Amazing Shots!</b>!\n"
	//97
	,	
	"<a href=\"http://www.flickr.com/groups/amazing_shots/\"><img src=\"http://farm3.static.flickr.com/2313/1604158904_f758932254_m.jpg\">\n"
	+"This is an Amazing Shot!</a></b>!\n"
	//98
	,	
	"<a href=\"http://www.flickr.com/groups/rosacelo/\" title=\"Photo Sharing\"><img src=\"http://farm3.static.flickr.com/2284/1542588119_afe5b59d1a_o.gif\" width=\"75\" height=\"75\" alt=\"Passion Photography\"/></a>\n"
	+"\n"
	+"This is an excellent photo! I invite you to insert it in the group\n"
	+"Passion Photography ( INVITE ONLY)\n"
	+"Sei invitato ad inserire la tua foto nel gruppo Passion Photography (INVITE ONLY)\n"
	+"<a href=\"http://www.flickr.com/groups/rosacelo/ \">Passion Photography</a>\n"
	+"\n"
	+"Please remember to tag the photo <b>Passion Photography</b>\n"
	//99
	,	
	"<a href=\"http://www.flickr.com/groups/rosacelo/\" title=\"Photo Sharing\"><img src=\"http://farm3.static.flickr.com/2073/1550470728_5b46a4c380_o.gif\" width=\"75\" height=\"75\" alt=\"Passion Photography\"/></a>\n"
	+"\n"
	+"Foto confermata su Passion Photography - Photo seen on Passion Photography (INVITE ONLY)\n"
	+"<a href=\"http://www.flickr.com/groups/rosacelo/ \">Passion Photography</a>\n"
	+"\n"
	+"Please remember to tag the photo <b>Passion Photography</b>\n"
	//100
	,	
	"<a href=\"http://www.flickr.com/groups/mega_shots/\"> <img src=\"http://farm2.static.flickr.com/1095/1452874383_1cac1691cd.jpg\"> </a>\n"
	+"Please add this fine image to Mega Shot; Post 1 - Nominate 4 Mega Shots \n"
	//101
	,	
	"<a href=\"http://www.flickr.com/groups/mega_shots/\"> <img src=\"http://farm2.static.flickr.com/1351/1452028857_7e383e3121.jpg\"> </a>\n"
	+"Post 1, Nominate 4 Mega Shots\n"
	//102
	,	
	"This photo has been selected for\n"
	+"<b>The Moulin Rouge (Invite Only +15 Faves/Comment On 2)</b>\n"
	+"<a href=\"http://www.flickr.com/groups/themoulinrouge/\"><img src=\"http://farm2.static.flickr.com/1440/918915092_2d7a186785_t.jpg\" title=\"The Moulin Rouge\"></a>\n"
	+"Add this photo to <a href=\"http://www.flickr.com/groups/themoulinrouge/\">http://www.flickr.com/groups/themoulinrouge/</a>\n"
	+"( <b>Invite Only</b> and <b>+15Faves-Comment On 2</b>).\n"
	//103
	,	
	"<b>Seen in: The Moulin Rouge (Invite Only +15 Faves/Comment On 2)</b>\n"
	+"<a href=\"http://www.flickr.com/groups/themoulinrouge/\"><img src=\"http://farm2.static.flickr.com/1440/918915092_2d7a186785_s.jpg\" title=\"The Moulin Rouge (Invite Only +15 Faves/Comment On 2)\"></a>\n"
	//104
	,	
	"<b>This is definitely a great shot, you deserve another SOE</b>\n"
	+"<a href=\"http://www.flickr.com/groups/cerofex/\"><img src=\"http://static.flickr.com/80/253461867_ff19e70b6a_t.jpg\"></a>\n"
	+"<i>Please be sure this is tagged \"SOE\"</i>\n"
	//105
	,	
	"<a href=\"http://www.flickr.com/groups/a-grade/\"><img src=\"http://static.flickr.com/100/buddyicons/24333070@N00.jpg\" width=\"48\" height=\"48\" />\n"
	+"A+++ Grade Photo! please join us</a>\n"
	//106
/*	,
	"\n"
	+"\n"
	+"\n"
	+"\n"
	+"\n"
	//71
	*/
];
var node;
Invite = {
    init: function ()
    {
    	this.textarea = document.getElementById ('DiscussPhoto').getElementsByTagName ('TEXTAREA') [0];
      var n = document.createElement ('SELECT');
      n.addEventListener ('change', function (e) {
				Invite.insertInvite ();}, 
				false);
			n.innerHTML = '<option value="0"></option>'
			+ '<option value="4">The Other Village</option>'
			+ '<option value="106">A+++</option>'
			+ '<option value="12">A Big Fave</option>'
			+ '<option value="97">AmazingShots</option>'
			+ '<option value="36">AwesomeShot</option>'
			
			+ '<option value="73">BetterThanGood</option>'
			+ '<option value="23">Blue Ribon</option>'
			+ '<option value="48">B&WPhotoAward</option>'
			+ '<option value="75">BreathTaking EyeCatching</option>'

			+ '<option value="77">CITRIT</option>'
			+ '<option value="2">ColorPhotoAward</option>'
						
			+ '<option value="1">Eye of Beholder</option>'
			
			+ '<option value="69">FlickerBest</option>'
			+ '<option value="67">FlickerDiamond</option>'
			+ '<option value="9">Flickr Gold</option>'
			+ '<option value="79">Flowererotica</option>'
			
			+ '<option value="30">Golden Photographer</option>'
			
			+ '<option value="5">Impresed Beauty</option>'
			+ '<option value="3">Instant Fav</option>'
			+ '<option value="49">ISawYouFirst</option>'
			+ '<option value="50">IThinkTArt</option>'
			
			+ '<option value="101">Mega Shot</option>'
			+ '<option value="10">My Winners</option>'
			
			+ '<option value="52">NaturesFinest</option>'
			
			+ '<option value="26">Outstanding Shots</option>'
			
			+ '<option value="99">PassionPhotgrphy</option>'
			+ '<option value="81">PlatinumPhotography</option>'
			+ '<option value="72">PritzkerPrice</option>'
			
			+ '<option value="7">SearchTheBest</option>'
			+ '<option value="83">SearchAndReward</option>'
			+ '<option value="8">Shield of Excel.</option>'
			+ '<option value="85">Siluetas-Silhouettes</option>'
			+ '<option value="87">Splendiferous!</option>'
			+ '<option value="40">SuperbMP</option>'
			+ '<option value="89">Superlativas</option>'
			+ '<option value="38">SuperShot</option>'

			+ '<option value="18">Te Pasaste</option>'
			
			+ '<option value="91">ThePerfectPhotogphr</option>'
			+ '<option value="54">TreeSubject</option>'
			+ '<option value="42">Trophy</option>'
			+ '<option value="33">Traveler P.V.</option>'
			
			+ '<option value="93">UltimateShot</option>'
			
			+ '<option value="56">WowieKazowie</option>'
			
			+ '<option value="95">Ysplix</option>'
			
			+ '<option value="13"></option>'
			+ '<option value="13">-----------</option>'
			+ '<option value="13"></option>'

			//+ '<option value="21">ArtLibre</option>'
			+ '<option value="6">The Best: BRAVO</option>'
			+ '<option value="24">Magic Donkey</option>'
			+ '<option value="103">TheMoulinRouge</option>'
			
			
			//spectacular skyscapes, spectacular nature, superbmasterpiece, throphy
			;
        this.textarea.parentNode.insertBefore (document.createTextNode ('Invite:'), this.textarea);
        this.textarea.parentNode.insertBefore (n, this.textarea);
				node = n;
				
			this.textarea = document.getElementById ('DiscussPhoto').getElementsByTagName ('TEXTAREA') [0];
      var m = document.createElement ('SELECT');
      m.addEventListener ('change', function (e) {
				Invite.insertInvite2 ();}, 
				false);
			m.innerHTML = '<option value="0"></option>'
			
			+ '<option value="13">--Comment w/o Invite-</option>'
			+ '<option value="13"></option>'
			+ '<option value="17">TheOtherVillage</option>'
			+ '<option value="66">6Fave+100</option>'
			
			+ '<option value="15">APlusPhoto</option>'
			
			+ '<option value="64">GlobalVillage2</option>'
			+ '<option value="63">GreatPix123</option>'
			
			+ '<option value="20">Faithfull Friends</option>'
			+ '<option value="16">FlicrHearts</option>'
			+ '<option value="22">FlickrPoker</option>'
			+ '<option value="14">FlickrSmilie</option>'
			+ '<option value="80">Flowererotica</option>'
			+ '<option value="65">FlowerPower</option>'
			
			+ '<option value="59">Karma</option>'
			
			+ '<option value="60">People\'sChoice</option>'
			+ '<option value="82">PlatinumPhotography</option>'
			+ '<option value="58">PritzkerPrice</option>'
			
			+ '<option value="29">RealOne</option-->'

			+ '<option value="84">SearchAndReward</option>'
				
			
			+ '<option value="71">TheWorldThroughMyEyes</option>'					
			+ '<option value="61">TornadoAward</option>'
			
			+ '<option value="62">XploreMyPix</option>'
			
			+ '<option value="13"></option>'
			+ '<option value="13">--Comment with Invite-</option>'
			+ '<option value="13"></option>'
			
			+ '<option value="28">A Big Fave</option>'
			+ '<option value="98">AmazingShots</option>'
			+ '<option value="37">AwesomeShot</option>'
			
			+ '<option value="74">BetterThanGood</option>'		
			+ '<option value="43">Blue Ribon</option>'
			+ '<option value="76">BreathTaking EyeCatching</option>'
						
			+ '<option value="78">CITRIT</option>'

			+ '<option value="46">EyeOfBeholder</option>'
			
			+ '<option value="70">FlickerBest</option>'
			+ '<option value="68">FlickerDiamond</option>'
			
			+ '<option value="31">Golden Photo.</option>'
			
			+ '<option value="47">ImpresedBeauty</option>'
			+ '<option value="51">IThinkTArt</option>'
			
			+ '<option value="102">Mega Shot</option>'
			+ '<option value="11">My Winners </option>'
			
			+ '<option value="53">NaturesFinest</option>'

			+ '<option value="100">PassionPhotgrphy</option>'
			
			+ '<option value="27">Outstand.Shots</option>'
			
			+ '<option value="35">SearchTheBest</option>'
			+ '<option value="105">Shield of Excel.</option>'
			+ '<option value="86">Siluetas-Silhouettes</option>'
			+ '<option value="41">SuperbMP</option>'
			+ '<option value="90">Superlativas</option>'
			+ '<option value="39">SuperShot</option>'

			
			+ '<option value="19">TePasaste</option>'
			+ '<option value="92">ThePerfectPhotogphr</option>'
			+ '<option value="44">Trophy</option>'
			+ '<option value="34">Traveler P.V.</option>'
			+ '<option value="55">TreeSubject</option>'
			
			+ '<option value="94">UltimateShot</option>'
			
			+ '<option value="57">WowieKazowie</option>'
						
			+ '<option value="96">Ysplix</option>'
			
			+ '<option value="13"></option>'
			+ '<option value="13">-----------</option>'
			+ '<option value="13"></option>'

			+ '<option value="45">TheBestBravo</option>'
			+ '<option value="25">Magic Donkey</option>'
			+ '<option value="104">TheMoulinRouge</option>'
			;
      this.textarea.parentNode.insertBefore (document.createTextNode (' Vote:'), this.textarea);
      this.textarea.parentNode.insertBefore (m, this.textarea);
			node2 = m;
		
		
			
    },
    insertInvite:   function ()
    {   if (val[node.value]) {
        this.textarea.value += "\n---\n"+val[node.value];
        this.textarea.value += '<i>Invited with <a href="http://iago-soft.com/flickr">SIC 0.8</a></i>';
        }
    },
		insertInvite2:   function ()
    {   if (val[node2.value]) {
        this.textarea.value += "\n---\n"+val[node2.value];
        this.textarea.value += '<i>Commented with <a href="http://iago-soft.com/flickr">SIC 0.8</a></i>';
        }
    }
		
}

window.addEventListener (
	'load', 
	function (e) {
		Invite.init ();
	}, 
	false
);

