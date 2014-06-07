// ==UserScript==
// @name           imgur.com rawl
// @description    imgur.com rawl adds a dropdown menu with fast access to a large selection of reaction gifs,
// @description    for lazer-fast witty comebacks (Quote: KyleRhodes@imgur)
// @description    Got the idea for this script from: http://imgur.com/gallery/21OLc0H
// @description    Written by Lanjelin
// @include        http://imgur.com/gallery/*
// @author         Lanjelin
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js

// @require http://sizzlemctwizzle.com/updater/164580.js
// usoCheckup grant permissions for Greasemonkey 1.x+
// @grant          GM_getValue
// @grant          GM_updatingEnabled
// @grant          GM_registerMenuCommand
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @version        0.5.0
// ==/UserScript==

/*
	// @require        http://usocheckup.redirectme.net/164580.js
	// usoCheckup grant permissions for Greasemonkey 1.x+
	// @grant          GM_getValue
	// @grant          GM_log
	// @grant          GM_openInTab
	// @grant          GM_registerMenuCommand
	// @grant          GM_setValue
	// @grant          GM_xmlhttpRequest
*/
var $rawl = {

	content: [
		['Upvotes', 'Downvotes','Deal with It','No Fucks Given','Feels','Nigel','Racist'],
		//Upvotes
		['Donald','http://i.imgur.com/EXJYvhn.gif','Dr. Dance','http://i.imgur.com/Xcr8lFK.gif','Elephant','http://i.imgur.com/iMldqaL.gif',
			'Zoidberg','http://i.imgur.com/zhH1HXY.gif','Burp','http://i.imgur.com/6t8AtnR.gif',
			'Money','http://i.imgur.com/GHQbqfe.gif','The Dude','http://i.imgur.com/Gxdqqzp.gif',
			'Tree','http://i.imgur.com/1HlYw7C.gif','Lighter','http://i.imgur.com/AzI7urn.gif',
			'Spiderman','http://i.imgur.com/DsKpI38.gif','Skirt','http://i.imgur.com/SSsHtMo.gif',
			'The One','http://i.imgur.com/diIqBXU.gif','Fry','http://i.imgur.com/hEIHcJE.gif',
			'Ackles','http://i.imgur.com/keQt25I.gif','Wall-E','http://i.imgur.com/O1nhhB3.gif'
		],
		//Downvotes
		['Polecat','http://i.imgur.com/dC4cG.gif','Helmet','http://i.imgur.com/HKZFxu8.gif','Puppy','http://i.imgur.com/pC2RzM0.gif',
			'Equilibrium','http://i.imgur.com/BbzIh3V.gif','Coyote','http://i.imgur.com/lzt3TFm.gif',
			'Homer','http://i.imgur.com/hxe1B14.gif','Bullet','http://i.imgur.com/ChMxHjH.gif',
			'Rocket','http://i.imgur.com/ayphbhV.gif','Departed','http://i.imgur.com/DY7YK41.gif'
		],
		//Deal with it
		['Cat','http://i.imgur.com/mZv2f.gif','Jackson','http://i.imgur.com/2Rt52.gif','Frogman','http://i.imgur.com/RVVtI.gif',
			'Dog','http://i.imgur.com/usPqv.gif','Paul Rudd','http://i.imgur.com/yr226.gif',
			'Seinfeld','http://i.imgur.com/ZunmH.gif','Lohan','http://i.imgur.com/DlltQ.gif',
			'Buscemi','http://i.imgur.com/eWKdk.gif','Squirrel','http://i.imgur.com/y1Icl.gif',
			'Dale','http://i.imgur.com/paQsm.gif','Rogue','http://i.imgur.com/NTf00.gif',
			'Oprah','http://i.imgur.com/9CCnN.gif','Brokeback','http://i.imgur.com/yJ0Fp.gif',
			'Kittenpants','http://i.imgur.com/RLijq.gif','Eel','http://i.imgur.com/KfiuI.gif',
			'Gibson','http://i.imgur.com/fOYmw.gif','Norris','http://i.imgur.com/FT6qJ.gif',
			'Jobs','http://i.imgur.com/FLdNC.gif','Terminator','http://i.imgur.com/Llnpa.gif',
			'I want you','http://i.imgur.com/7uo3S.gif','Obama','http://i.imgur.com/SRx2n.gif',
			'Radcliffe','http://i.imgur.com/Ovwhb.gif','Goat','http://i.imgur.com/WiNQ5.gif',
			'TF2','http://i.imgur.com/BhcYw.gif','GTA','http://i.imgur.com/jWFWlKU.gif',
			'Flip','http://i.imgur.com/XumZOt2.gif','Icy','http://i.imgur.com/9E2JcHc.gif',
			'Basketball','http://i.imgur.com/ckcd6tU.gif','Downey Jr.','http://i.imgur.com/IUSe71e.gif',
			'Slide','http://i.imgur.com/TAd5e.gif','Guinness','http://i.imgur.com/cHbW9.gif',
			'Blade','http://i.imgur.com/3evlc.gif','S Wonder','http://i.imgur.com/9jIpx.gif',
			'Oprah','http://i.imgur.com/O01XE.gif','SpaceCat','http://i.imgur.com/Gyf6p.gif',
			'Carrey','http://i.imgur.com/em4yL.gif','W Smith','http://i.imgur.com/X8I8V.gif',
			'Neil','http://i.imgur.com/yL6H0.gif','Lego','http://i.imgur.com/7ygKp.gif',
			'Train','http://i.imgur.com/Scnyl.gif','Nicholson','http://i.imgur.com/ShpEo.gif',
			'Can\'t','http://i.imgur.com/H5z9g.gif'
		],
		//No Fucks Given
		['Pigeon','http://i.imgur.com/ds16H.gif','Spacehorse','http://i.imgur.com/5LGE1.gif','Dr.Who','http://i.imgur.com/GUjSD.gif',
			'Crab','http://i.imgur.com/v352T.gif','Fett','http://i.imgur.com/SfRkl.gif',
			'Bushes','http://i.imgur.com/RdGTA.gif','Anakin','http://i.imgur.com/LPMjw.gif',
			'Dr.Who','http://i.imgur.com/4m35Y.gif','Processing','http://i.imgur.com/rnwF0.gif',
			'Jeremy','http://i.imgur.com/xn4rF.gif','PianoCat','http://i.imgur.com/f6i8d.gif',
			'Pocahontas','http://i.imgur.com/UTo7S.gif','The Last','http://i.imgur.com/niYhK.gif',
			'Pooh','http://i.imgur.com/dc78P.gif','TrainedCat','http://i.imgur.com/TIFHP.gif',
			'Gangnam','http://i.imgur.com/9dYLx.gif','RickAstley','http://i.imgur.com/RgIgW.gif'
			
		],
		//Feels
		['Face','http://i.imgur.com/VFVTS.gif','Wave','http://i.imgur.com/SCelG.gif','Blob','http://i.imgur.com/BtScf.gif',
			'Can\'t Even','http://i.imgur.com/5tRFgj1.gif','Cpt.America','http://i.imgur.com/eIqaU.gif',
			'Kill Bro','http://i.imgur.com/D3lIh.gif','Jimmies','http://i.imgur.com/l1ffb.gif',
			'Ackles','http://i.imgur.com/qJu3t.gif','Gurren','http://i.imgur.com/QbKdj.gif',
			'Pigeon','http://i.imgur.com/jGUbM.gif','Llama','http://i.imgur.com/ew4QgWW.gif'
		],
		//Nigel
		['Ursula','http://i.imgur.com/0YRBr.gif','Stitch','http://i.imgur.com/HaJxp.gif','Magic','http://i.imgur.com/hqoJ2.gif',
			'Haystack','http://i.imgur.com/c6VZu.gif','Hades','http://i.imgur.com/pDeBO.gif',
			'Raining','http://i.imgur.com/kaq3D.gif','Aladdin','http://i.imgur.com/4zQ7p.gif',
			'Ariel','http://i.imgur.com/bBVQJ.gif','Pocahontas','http://i.imgur.com/O3CbX.gif',
			'Eeyore','http://i.imgur.com/WNCKt.gif','Tarzan','http://i.imgur.com/yqzQp.gif',
			'Bookshelf','http://i.imgur.com/XrFjY.gif','Laundry','http://i.imgur.com/mZv2f.gif',
			'Hulk','http://i.imgur.com/WPrzV.gif'
		],
		//Racist
		['KFC','http://i.imgur.com/hN2lK.gif','KFC2','http://i.imgur.com/XYbiB.gif','Chicken','http://i.imgur.com/8nraX.gif',
			'That\'s Racist','http://i.imgur.com/UitdY.gif','Eso Es Racista','http://i.imgur.com/8cFjn.gif',
			'That\'s Racist2','http://i.imgur.com/Cd8Uo.gif','Possibru','http://i.imgur.com/ySO8V.gif',
			'Supplies','http://i.imgur.com/REwAM.gif','Waisis','http://i.imgur.com/7C3z0.gif',
			'Doctor Yet?','http://i.imgur.com/G40Jv.gif'
		]
	],
	//mørk #2B2B2B
	//lys #444442
	_draw_css : function(){
		var css = '#rawl_menu{position:absolute;display:inline;z-index:2;width:auto;}'+
			'#rawl_menu ul{margin:0;padding:0;list-style:none;width:100px;}'+
			'#rawl_menu ul .rawl_cat{position:relative;width:120px;display:none;}'+
			'#rawl_menu ul:hover .rawl_cat{position:relative;width:120px;display:block;}'+
			'#rawl_menu ul li a{display:block;text-decoration:none;background:#2B2B2B;}'+
			'#rawl_menu ul li ul{display:none;}'+
			'#rawl_menu ul li #rawl1{position:absolute;left:119px;top:0px;}'+
			'#rawl_menu ul li #rawl2{position:absolute;left:218px;top:0px;}'+
			'#rawl_menu ul li #rawl3{position:absolute;left:317px;top:0px;}'+
			'#rawl_menu ul li #rawl4{position:absolute;left:416px;top:0px;}'+
			'#rawl_menu ul li #rawl5{position:absolute;left:515px;top:0px;}'+
			'#rawl_menu ul li ul li{width:99px;}'+
			'#rawl_menu li:hover ul{display:block;}'+
			'#rawl_floating{display:none;position:absolute;z-index:2;left:400;top:100;}'+
			'#rawl_floating{border:6px solid #444442;border-radius:10px;width:auto;height:auto;}'+
			'#rawl_img{margin-bottom:-4px;}'+
			'#rawl_img{max-width:300px;max-height:300px;}'+
			'#rawl_arrow{top:9px;left:103px;z-index:2;position:absolute;display:inline-block;height:6px;width:0px;margin:0;padding:0;background:url("http://s.imgur.com/images/site-sprite.png?1360350531") no-repeat scroll -11px -158px transparent;}'+
			'#rawl_down{top:9px;left:52px;z-index:2;position:absolute;display:inline-block;height:10px;width:0px;margin:0;padding:0;background:url("http://s.imgur.com/images/site-sprite.png?1360350531") no-repeat scroll -165px -85px transparent;}'+
			'#rawl_top{width:75px;border-bottom:4px solid #444442;}'+
			'#rawl_line{border-bottom:4px solid #444442;}'+
			'';
		return css ;		
	},
	init : function(){
		var rawl_link = '<style>'+this._draw_css()+'</style>'+ 
			'<div id="rawl_menu"><ul>'+
			'<li id="rawl_top"><a>rawl</a><span id="rawl_down"></span></li>'; 
				
				for (var i=0, k=this.content[0].length; i<k; i++){
				if ((i+1)==k){
					rawl_link += '<li class="rawl_cat" id="rawl_line"><a href="#">'+this.content[0][i]+'</a><span id="rawl_arrow"></span><ul id="rawl1">';
				} else {
					rawl_link += '<li class="rawl_cat"><a href="#">'+this.content[0][i]+'</a><span id="rawl_arrow"></span><ul id="rawl1">';
				}
					var rawl_list=1;
					for (var j=0, l=this.content[(i+1)].length; j<l; j++){
						if ((j==30)||(j==60)||(j==90)||(j==120)){
							rawl_list+=1;
							rawl_link += '</ul><ul id="rawl'+rawl_list+'">';
						}
						rawl_link += '<li class="rawl_menu" image="'+this.content[(i+1)][(j+1)]+'"><a href="#">'+this.content[(i+1)][j]+'</a></li>';
						j++;
					}
				rawl_link += '</ul></li>';
				}
			rawl_link +='</ul></div>';
			$('#main-nav').append(rawl_link);
	}	
}
function $xpath(q,doc) { if (!doc || doc == '') {doc = document ; } return doc.evaluate(q, doc,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); }
(function() {
	try {
		$rawl.init() ;
	}
	catch(e){ /* console.log(e) */ }
})();

$(document).ready(function() {
	$('body').append('<div id="rawl_floating"><img id="rawl_img" src=""></div>');
	$(document).mousemove(function(e){
		$('#rawl_floating').css("left", e.pageX+35);
		$('#rawl_floating').css("top", e.pageY-25);
	}); 
});

$('.rawl_menu').click(function(){
		if ($('#caption_textarea').val()== "Submit a comment"){
			$('#caption_textarea').val($(this).attr("image"));
		} else {
			$('#caption_textarea').val($('#caption_textarea').val() + $(this).attr("image"));
		}
});
$('.rawl_menu').mouseover(function(){
		$('#rawl_floating').css("display", "block");
		$('#rawl_img').attr("src", $(this).attr("image"));
		$('#rawl_top').css("border-bottom", "4px solid #85BF25");
});
$('.rawl_menu').mouseout(function(){
		$('#rawl_floating').css("display", "none");
		$('#rawl_img').attr("src", "");
		$('#rawl_top').css("border-bottom", "4px solid #444442");
});
$('.rawl_cat').mouseover(function(){
		$('#rawl_top').css("border-bottom", "4px solid #85BF25");
});
$('.rawl_cat').mouseout(function(){
		$('#rawl_top').css("border-bottom", "4px solid #444442");
});
