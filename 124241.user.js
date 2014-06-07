// ==UserScript==
// @name NB-Testing Original
// @namespace http://userscripts.org/users/395477
// @description This script alters the layout of www.soul-boards.com
// @include http://naruto-boards.com*
// @include http://www.naruto-boards.com*
// ==/UserScript==
GM_addStyle(" \
body { \
	width: auto; \
	color: #ffffff; \
	background-color: #353435; \
	margin: 0px 0px; \
	background-image: url(\"http://i41.tinypic.com/2hx0uvt.jpg\"); \
	background-repeat: repeat-xy; \
	background-position: center; \ !important \
} \
#layout { \
	width: 775px; \
	color: #000000; \
	background-color: #353435; \
	margin: 10px auto; !important \
} \
#top { \
	height: 140px; \
	background-image: url(\"http://i40.tinypic.com/dmplhv.jpg\"); !important \
} \
#controlpanel_top { \
	background-image: url(\"http://i43.tinypic.com/f0nhpy.jpg\"); !important \
} \
#forumactivity_top { \
	background-image: url(\"http://i44.tinypic.com/dx1eg1.jpg\"); !important \
} \
#newtopics_top { \
	background-image: url(\"http://i42.tinypic.com/21bojnl.jpg\"); !important \
} \
div.boxleft { \
	width: 247px; \
	height: 136px; \
	margin-bottom: 10px; \
	background-image: url(\"http://i41.tinypic.com/vfuv4z.jpg\"); !important \
} \
td.post_userinfo { \
        color: #474747;\
} \
a.rank1 { \
    color: #adadad; \
} \
a.rank3 { \
    color: #63b6ff; \
} \
a.rank4 { \
    color: #5fa60d; \
} \
a.rank5 { \
    color: #c083f2; \
    border-style: solid; \
    border-color: #000000; \
} \
font.rank2 { \
    color: #FFA333; \
} \
font.rank3 { \
    color: #63B6FF; \
} \
font.rank4 { \
    color: #5fa60d; \
} \
font.rank1 { \
    color: #ADADAD; \
} \
font.onlineinfo { \
    color: #ffffff; \
} \
font.offline { \
    color: #a31717; \
} \
font.online { \
    color: #33b22d; \
} \
div.breadcrumb h2 { \
    color: #000000; \
} \
div.breadcrumb a { \
    color: #000000; \
} \
input.border { \
    background-color: #424242; \
    color: #dbdbdb; \
} \
a.rank2 { \
    color: #ffa333; \
} \
div.boxright { \
	width: 0px; \
	background-image: none; \
	display: none; !important \
} \
div.contenttop { \
	height: auto; \
	padding-top: 4px;\
	background-image: url(\"http://i42.tinypic.com/117h26b.jpg\"); !important \
} \
table.controlpanel td span { \
	background-repeat: repeat-x; !important \
} \
div.contentmiddle { \
	background-image: url(\"http://i40.tinypic.com/uwsog.jpg\"); \
	padding: 5px 10px 10px 10px; !important \
} \
div.contentbottom { \
	background-image: none; !important \
} \
div.inlineheader, table.controlpanel td span, div.header { \
	background-image: url(\"http://i39.tinypic.com/3500a44.jpg\"); !important \
} \
div.header { \
	border: none; !important \
} \
div#help { \
	color: #c4c4c4; \
	background-image: none; \
	background-color: #353435; !important \
}\
div#footer { \
	background-image: url(\"http://i39.tinypic.com/10qjxbb.jpg\"); !important \
} \
a.bbcode_url { \
	font: bold 11px Arial,Verdana,Helvetica,sans-serif; !important \
} \
div.contentmiddle div center div.nothing { \
	color: #000000; !important \
} \
table.navigation td a, table.navigation td.curr b { \
	width: 20px; !important \
} \
#replyf input[value=\"Post Reply\"], input[value=\"Post Topic\"], input[value=\"Edit Reply\"], input[value=\"Send Pm\"], input[value=\"Edit Topic\"] { \
	font: 12px Verdana,Arial,Helvetica,sans-serif; \
	height: 22px; \
	width: 10%; \
	left: 50px; !important \
} \
#replyf input[value=\"Empty Reply\"], input[value=\"Reset Fields\"],  input[value=\"Reset Form\"] { \
	display: none; !important \
} \
");

var z = document.getElementsByTagName('td');
for (var i=0; i<z.length; i++) {
	if ((z[i].className == 'post_userinfo') && (z[i].getElementsByTagName('img').length == 1)) {
		// removing rank text
		var textnodes = z[i].childNodes;
		var count=0;
		var textnode;
		for (var q=0; q<z[i].childNodes.length; q++) {
			textnode=textnodes[q].nodeName;
			if(textnode == 'BR') { count++; }
			if(textnode == 'IMG') {	
			k = z[i].getElementsByTagName('br')[1];
				k.parentNode.removeChild(k);
				break;
			}
			k = textnodes[q];
			k.parentNode.removeChild(k);
		}
		//end of removing
				

		var ranktag = new Image(); // width, height 
		var userrank = z[i].getElementsByTagName('a')[0].className;
                var username = z[i].getElementsByTagName('a')[0].text;    
		
                if(username == 'Shadow_Hokage'){
			ranktag.src = 'http://i42.tinypic.com/v7f9dk.jpg';
                }
                else if(username == 'Akatsunara'){
			ranktag.src = 'http://i42.tinypic.com/v7f9dk.jpg';
                }
                else if(username == 'NelielChan'){
			ranktag.src = 'http://i42.tinypic.com/v7f9dk.jpg';
                }
                else if(username == '-newhope-'){
			ranktag.src = 'http://i42.tinypic.com/v7f9dk.jpg';
                }
                else if(username == 'leychance'){
			ranktag.src = 'http://i43.tinypic.com/15gtp9v.jpg';
                }
		else if(userrank == 'topicuser_global moderator'){ 
			ranktag.src = 'http://i42.tinypic.com/4fval4.jpg';
		}
		else if(userrank == 'topicuser_moderator') {
			ranktag.src = 'http://i43.tinypic.com/35d1bo7.jpg';
		}
		else if(userrank == 'topicuser_admin') {
			ranktag.src = 'http://i43.tinypic.com/2vuaj5f.jpg';
		}
		else if(userrank == 'topicuser_webmaster') {
			ranktag.src = 'http://i41.tinypic.com/xctblu.jpg';
		}           
                else if(username == 'Betrayer'){
			ranktag.src = 'http://i42.tinypic.com/1fbf9k.jpg';
                }
                else if(username == 'Knightmayre'){
			ranktag.src = 'http://i42.tinypic.com/1fbf9k.jpg';
                }
                else if(username == 'Raizen-1'){
			ranktag.src = 'http://i42.tinypic.com/1fbf9k.jpg';
                }
                else if(username == 'Slavik-sensei'){
			ranktag.src = 'http://i42.tinypic.com/1fbf9k.jpg';
                }
                else if(username == 'Yondaime'){
			ranktag.src = 'http://i42.tinypic.com/1fbf9k.jpg';
                }
                else if(username == 'ZelostheHero'){
			ranktag.src = 'http://i42.tinypic.com/1fbf9k.jpg';
                }
                else if(username == 'A2N'){
			ranktag.src = 'http://i42.tinypic.com/308vay0.jpg';
                }
                else if(username == 'Ayrton'){
			ranktag.src = 'http://i42.tinypic.com/308vay0.jpg';
                }
                else if(username == 'Blaze007'){
			ranktag.src = 'http://i42.tinypic.com/308vay0.jpg';
                }
                else if(username == 'Burnturrek'){
			ranktag.src = 'http://i42.tinypic.com/308vay0.jpg';
                }
                else if(username == 'FatDog'){
			ranktag.src = 'http://i42.tinypic.com/308vay0.jpg';
                }            
                else if(username == 'grymflame'){
			ranktag.src = 'http://i42.tinypic.com/308vay0.jpg';
                }            
                else if(username == 'Kostas'){
			ranktag.src = 'http://i42.tinypic.com/308vay0.jpg';
                }            
                else if(username == 'Lord_Akatsuki'){
			ranktag.src = 'http://i42.tinypic.com/308vay0.jpg';
                }            
                else if(username == 'MegamanX'){
			ranktag.src = 'http://i42.tinypic.com/308vay0.jpg';
                }            
                else if(username == 'Neljubuites'){
			ranktag.src = 'http://i42.tinypic.com/308vay0.jpg';
                }            
                else if(username == 'Petley'){
			ranktag.src = 'http://i42.tinypic.com/308vay0.jpg';
                }            
                else if(username == 'Silver_Razar'){
			ranktag.src = 'http://i42.tinypic.com/308vay0.jpg';
                }            
                else if(username == 'Wesley'){
			ranktag.src = 'http://i42.tinypic.com/308vay0.jpg';
                }            
                else if(username == 'Xelian'){
			ranktag.src = 'http://i42.tinypic.com/308vay0.jpg';
                }            
                else if(username == 'ZelosWilder'){
			ranktag.src = 'http://i42.tinypic.com/308vay0.jpg';
                }
                else if(username == '-Grimmjow'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'naruto_link'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }  
                else if(username == '-KageBoy-'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Aeon'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Andras'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'artivous13'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'asmattack'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'bluegender_2k'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                } 
                else if(username == 'Bballer3042'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                } 
                else if(username == 'ChrisNemo'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'ciumkajacy'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Cross777'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'dagooddieyoung'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Donovan-X'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Sasuke_002'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }           
                else if(username == 'djnarrow'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'elearu'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'emorocker80'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Gaara-Zabuza'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'H4rry'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Hax'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Hyuga-Clan'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'I_Am_Hokage'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Itachi3334'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }           
                else if(username == 'jacek185'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'jay-dog'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Jeremy658'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'jnugget'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'junebuggy'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Hakouro'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Kamatari'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }           
                else if(username == 'kiba510'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'kikinka650'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Kolsake'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'HyuugaRenji'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'krises_blade'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Kross'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Kurkaka'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Kyminara'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Kyuubi0sama'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Zero0Blade'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'kyuubinaruto1155'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Lawrence17tm'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'lder'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }  
                else if(username == 'Lazy_Genius_13'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Lord_Jure'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Lostword'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Magirawashii'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'memories_of_rem'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Mira'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Mirrorforce'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }    
                else if(username == 'mwalke32'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Narikku'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Ninetailsboy'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Nes'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Nh13'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Nowherefast'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Nooblsice'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'ohthatpal'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'OMGWTFitzBEN'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                } 
                else if(username == 'omninight14'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                } 
                else if(username == 'oreacharound'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Orihime-'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'pacman9269'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'poiuy'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Rampaging_Demon'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'redxmaverick'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'row'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Ryukotsusei'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'sasori453'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'sasuke_newyork'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'SasukeSS'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Senovit'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'ShAmPi'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'SharinganShadow'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Soryuju'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Spirit_in_Nim'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Strider'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Sunago'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'sweetreon'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }           
                else if(username == 'Takachi'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Torn'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Yoshitake-Sama'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Uchiha_Silvos'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'vg14'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Vilyana'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'waves6'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Westifer'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Xander'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'ZeonBR'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(username == 'Zure'){
			ranktag.src = 'http://i44.tinypic.com/sy45qo.jpg';
                }            
                else if(userrank == 'topicuser_member'){
		        ranktag.src = 'http://i44.tinypic.com/351yhqo.jpg';
		}

		var avatar=z[i].getElementsByTagName('br')[1]; //use 2 if text rank is not removed
		avatar.parentNode.insertBefore(ranktag,avatar);
				
		if(userrank != 'topicuser_member') {
			z[i].getElementsByTagName("img")[0].style.padding = '5px 0px 0px';
			z[i].getElementsByTagName("img")[1].style.padding = '5px 0px 0px 0px';
		}
	} else
	if (z[i].className=="title_icon") {
		var iconimage = z[i].getElementsByTagName("img")[0].src;
		if((iconimage=="http://www.naruto-boards.com/images/forum/board_fresh.gif")
		||(iconimage=="http://www.naruto-boards.com/images/forum/board_fresh.gif"))
			z[i].getElementsByTagName("img")[0].src='http://i42.tinypic.com/20zw8yw.jpg';
		if((iconimage=="http://www.naruto-boards.com/images/forum/board_old.gif")
		||(iconimage=="http://www.naruto-boards.com/images/forum/board_old.gif"))
			z[i].getElementsByTagName("img")[0].src='http://i40.tinypic.com/20uofmb.jpg';
		if((iconimage=="http://www.naruto-boards.com/images/forum/board_link.gif")
		||(iconimage=="http://www.naruto-boards.com/images/forum/board_link.gif"))
			z[i].getElementsByTagName("img")[0].src='http://i42.tinypic.com/lcegn.jpg';
	} else
	if (z[i].className=="icon") {
		var iconimage = z[i].getElementsByTagName("img")[0].src;
		if((iconimage=="http://www.naruto-boards.com/images/forum/legend_new.gif")
		||(iconimage=="http://www.naruto-boards.com/images/forum/legend_new.gif"))
			z[i].getElementsByTagName("img")[0].src='http://i42.tinypic.com/20zw8yw.jpg';
		if((iconimage=="http://www.naruto-boards.com/images/forum/legend_old.gif")
		||(iconimage=="http://www.naruto-boards.com/images/forum/legend_old.gif"))
			z[i].getElementsByTagName("img")[0].src='http://i40.tinypic.com/20uofmb.jpg';
	}
}

// Replace the navigation buttons
var topnav = document.getElementById('topnav'); 
var navlinks = topnav.getElementsByTagName('a'); 
for (var i = navlinks.length - 1; i >= 0; i--) {
	var navbuttons = navlinks[i].getElementsByTagName('img'); 
	if(navbuttons.length > 0) {
		var linktitle = navlinks[i].getAttribute('title'); 
		if(linktitle == 'Homepage') {
			navbuttons[0].src = 'http://i43.tinypic.com/fnb89e.jpg'; 
		}
		else if(linktitle == 'Register') {
			navbuttons[0].src = 'http://i39.tinypic.com/ic1vfc.jpg'; 
		}
		else if(linktitle == 'Forum rules') {
			navbuttons[0].src = 'http://i43.tinypic.com/2q3skjq.jpg'; 
		}
		else if(linktitle == 'Lost Password') {
			navbuttons[0].src = 'http://i43.tinypic.com/242exzt.jpg'; 
		}
		else if(linktitle == 'Forum FAQ') {
			navbuttons[0].src = 'http://i39.tinypic.com/16iilc3.jpg'; 
		}
		else if(linktitle == 'Sitemap') {
			navbuttons[0].src = 'http://i39.tinypic.com/sxlzsy.jpg'; 
		}
	}
}

// Replace the 'View Todays Replies/Topics' icons
var boxrightArray = document.getElementsByClassName('bottomlink');
for (var i = boxrightArray.length - 1; i >= 0; i--) {
	var topinfoicons = boxrightArray[i].getElementsByTagName('img'); 
	if(topinfoicons.length > 0) {
		topinfoicons[0].src = 'http://i52.tinypic.com/11945l1.gif'; 
	}
}

// Replace the breadcrumb icons
var breadcrumbs = document.getElementsByClassName('breadcrumb');
for (var i = breadcrumbs.length - 1; i >= 0; i--) {
	var breadcrumbicons = breadcrumbs[i].getElementsByTagName('img'); 
	for (var j = breadcrumbicons.length - 1; j >= 0; j--) {
		breadcrumbicons[j].src = 'http://i56.tinypic.com/vctrgh.gif'; 
	}
}

// Replace the 'New Topic' button
var maxTable = document.getElementsByClassName('max'); 
for (var i = maxTable.length - 1; i >= 0; i--) {
	var maxImages = maxTable[i].getElementsByTagName('img'); 
	for (var j = maxImages.length - 1; j >= 0; j--) {
		var imageSrc = maxImages[i].src; 
		imageSrc = imageSrc.substring(imageSrc.length-19); 
		if(imageSrc == 'button_newtopic.gif') {
			maxImages[i].src = 'http://i52.tinypic.com/xnydu0.gif'; 
		}
	}
}

// Replace the 'Quote, 'PM', 'Edit', 'Delete' and 'Move' buttons
var replyHeader = document.getElementsByClassName('replyheader'); 
for (var i = replyHeader.length - 1; i >= 0; i--) {
	var replyImages = replyHeader[i].getElementsByTagName('img'); 
	for (var j = replyImages.length - 1; j >= 0; j--) {
		var imageSrc = replyImages[j].src; 
		if(imageSrc.substring(imageSrc.length-14) == 'post_quote.gif') {
			replyImages[j].src = 'http://i55.tinypic.com/28229s9.gif'; 
		}
		else if(imageSrc.substring(imageSrc.length-11) == 'post_pm.gif') {
			replyImages[j].src = 'http://i51.tinypic.com/235yew.gif'; 
		}
		else if(imageSrc.substring(imageSrc.length-13) == 'post_edit.gif') {
			replyImages[j].src = 'http://i56.tinypic.com/2ekjjex.gif'; 
		}
		else if(imageSrc.substring(imageSrc.length-15) == 'post_delete.gif') {
			replyImages[j].src = 'http://i55.tinypic.com/2a77u4k.gif'; 
		}
		else if(imageSrc.substring(imageSrc.length-14) == 'topic_move.gif') {
			replyImages[j].src = 'http://i55.tinypic.com/2ntzg3o.gif'; 
		}
	}
}

// Replace the buddy delete icon with the one having a transparent background
var bdtd = document.getElementsByTagName("img");
for (var i=0; i<bdtd.length; i++) {
	if ((bdtd[i].src=="http://www.soul-boards.com/images/buddylist/buddy_delete.gif")||(bdtd[i].src=="http://soul-boards.com/images/buddylist/buddy_delete.gif")) {
		bdtd[i].src='http://i54.tinypic.com/2008wec.gif';
	}
}