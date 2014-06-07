// ==UserScript==
// @name        League of Legends Guides
// @namespace   Miow
// @include     *championselect.net*
// @include     *mobafire.com*
// @include     *lolpro.com*
// @include     *lolking.net*
// @include     *leagueoflegends.com*
// @include     *leagueoflegends.wikia.com*
// @include    	*surrenderat20.net*
// @version     1
// ==/UserScript==
var href = document.location.href;
var SITE =  "CS";
if(href.search("championselect.net") != -1){
	SITE = "CS";
}else if(href.search("mobafire.com") != -1) {
	SITE = "MF";
}else if(href.search("lolpro.com") != -1) {
	SITE = "LP";
}else if(href.search("solomid.net") != -1) {
	SITE = "SM";
}else if(href.search("lolking.net") != -1) {
	SITE = "LK";
}else if(href.search("leagueoflegends.wikia.com") != -1) {
	SITE = "WIKIA";
}

var LISTE = [
"ahri","akali","alistar","amumu","anivia","annie","ashe",
"blitzcrank","brand",
"caitlyn","cassiopeia","chogath","corki",
"darius","diana","dr-mundo","draven","evelynn",
"elise","ezreal",
"fiddlesticks","fiora","fizz","galio",
"gangplank","garen","gragas","graves",
"hecarim","heimerdinger",
"irelia",
"janna","jarvan-iv","jax","jayce",
"karma","karthus","kassadin","katarina","kayle","khazix","kennen","kogmaw",
"leblanc","lee-sin","leona","lulu","lux",
"malphite","malzahar","maokai","master-yi","miss-fortune","mordekaiser","morgana",
"nami","nasus","nautilus","nidalee","nocturne","nunu",
"olaf","orianna",
"pantheon","poppy",
"quinn",
"rammus","renekton","rengar","riven","rumble","ryze",
"sejuani","shaco","shen","shyvana","singed","sion","sivir","skarner","sona","soraka","swain","syndra",
"talon","taric","teemo","thresh","tristana","trundle","tryndamere","twisted-fate","twitch",
"udyr","urgot",
"varus","vayne","veigar","vi","viktor","vladimir","volibear",
"warwick","wukong",
"xerath","xin-zhao",
"yorick",
"zac","zed","ziggs","zilean","zyra"
];

function lien(site,Champion){
	var champion = Champion;
	if(site == "CS"){
		return 'http://www.championselect.net/champ/'+Champion;
	}else if (site == "LK"){
		return 'http://www.lolking.net/champions/'+Champion.replace("-","");
	}else if (site == "LP"){
		return 'http://www.lolpro.com/guides/'+Champion;
	}else if (site == "MF"){
		return 'http://www.mobafire.com/league-of-legends/toplist/top-10-'+Champion+'-guides';
	}else if (site == "SM"){
		return 'http://www.solomid.net/guides.php?champ='+Champion;
	}else if (site == "WIKIA"){
		champion = Champion;
		if(Champion.split("-") != Champion){
			champion = champion.split("-");
			champion = champion[0].charAt(0).toUpperCase() + champion[0].substring(1).toLowerCase() + "_" + champion[1].charAt(0).toUpperCase() + champion[1].substring(1).toLowerCase();
		}
		return 'http://leagueoflegends.wikia.com/wiki/'+ champion;
	}

}
var onclick = 'var hiddenlist = document.getElementById(\'miow_hiddenlist\'); \
			if(hiddenlist.style.display==\'none\')\
				{hiddenlist.style.display=\'block\';this.style.left=\'284px\'; document.getElementById(\'miow_togglelist\').style.left=\'284px\'; setTimeout(\'document.getElementById(\\\'miow_input\\\').focus()\',50);}\
				else{hiddenlist.style.display=\'none\'; this.style.left=0; document.getElementById(\'miow_togglelist\').style.left=0;}\
			'
document.getElementsByTagName('body')[0].innerHTML = '\
<div>\
	<div id="miow_hiddenlist"\
	style="z-index:1500; position:fixed; left:0px; top:20%; display:none; border-style:solid; border-width:2px; border-color:#088; border-spacing:0;\
	 padding:0px; margin:0px; color:#000; text-decoration:none; font-size:1.1em; font-weight:none;\
	 " >\
		<input id="miow_input" autocomplete="off" style=" width: 280px; h-shadow: -5px #fff; background-color:#bfd;\
		padding:0px; margin:0px; position:relative; border-top-style:none; border-right-style:none; border-bottom-style:solid; border-left-style:none; border-width:2px; border-color:#088; height:25px;\
		" placeholder="Search by Champion name...">\
		<div id="miow_divListe" \
			style="background-color:#fff; height: 300px; width: 280px; position:relative; overflow-x:hidden; overflow-y:scroll;">\
		</div>\
	</div>\
	<div id="miow_togglelist" \
		style="z-index:1500; padding:0px; height:200px; width:20px; left:0px; position:fixed; background-color:#088; border-radius:0px 10px 10px 0px; top:30%; font-family:sans-serif !important;">\
		<div id="miow_togglelistcontent" style="z-index:1502; font-family:sans-serif !important; border-spacing:0;">\
			<div id="miow_toggleclick"\
				style="z-index:1500; padding:0px; height:200px; width:20px; left:0px; position:fixed; background:none; border-radius:0px 10px 10px 0px; top:30%;"\
				onmousedown="'+onclick+'">\
				<div style="padding-top:90px; color:#0aa; cursor:default;">\
					&nbsp;|||\
				</div>\
			</div>\
		</div>\
	</div>\
</div>' + document.getElementsByTagName('body')[0].innerHTML;
	
	


function miow_update(input) {
	var text = input.value;
	var color = "#bfd";
	var counter = 0;
	var last = "";
	for (var i = 0, c = LISTE.length ; i < c ; i++) {
		if(LISTE[i].search(text.toLowerCase()) != -1){
			if(color == "#bfd"){
				color = "#fff";
			}else{
				color = "#bfd";
			}
			document.getElementById("miow_"+LISTE[i]).style.display = "table";
			document.getElementById("miow_"+LISTE[i]).style.backgroundColor = color;
			counter = counter + 1;
			last = LISTE[i];
		}
		else {
			document.getElementById("miow_"+LISTE[i]).style.display = "none";
		}
	}
	
	if(counter == 1){
		
		
		
		//document.getElementById("miow_iframe").innerHTML = '<iframe name="miowFrame0" height="233" width="290" scrolling="no" style="border:none;" src="'+lien("LK",last)+'#miow"/>'
		document.getElementById("miow_iframe").style.display = "block";
		
	} else {
		document.getElementById("miow_iframe").style.display = "none";
	}
}

function miow_listeGen(liste) {
//'+ liste[i].charAt(0).toUpperCase() + liste[i].substring(1).toLowerCase() +'\
	var StringListe = '\
		<div id="miow_liste" style="position:relative;">\
		';
	var color = "#bfd";
	for (var i = 0, c = liste.length ; i < c ; i++) {
		if(color == "#bfd"){
			color = "#fff";
		}else{
			color = "#bfd";
		}
		StringListe = StringListe + '\
		<div id="miow_'+liste[i]+'" style="background-color:'+color+'; font-family: arial; display:table; height:60px; font-size:1.30em; padding:3px 0px 0px 3px;">\
			<div style="width:280px; height:60px; overflow:hidden;">\
				<table style="font-size:10px; text-align:left;">\
					<tbody>\
						<tr height="20px">\
							<td rowspan="3" style="width:50px;">\
								<a href="'+lien("CS",liste[i])+'" style="color:#000;">\
									<img style="vertical-align:top; width:50px; height:50px;" src="http://edge1.mobafire.com/images/champion/icon/'+liste[i]+'.png" />\
								</a>\
							</td>\
							<td colspan="2" style="font-size:16px; font-weight:bold; font-family:sans-serif !important;">\
								<a href="'+lien("CS",liste[i])+'" style="color:#000; font-family:sans-serif !important;">\
									'+ liste[i].charAt(0).toUpperCase() + liste[i].replace("-"," ").substring(1).toLowerCase() +'\
								</a>\
							</td>\
						</tr>\
						<tr height="20px">\
							<td width="70px">\
								<a href="'+lien("LK",liste[i])+'" style="color:#000; font-family:sans-serif !important;">\
									<img src="http://www.lolking.net/favicon.ico" style="vertical-align:top; height:16px;"/>\
									LolKing\
								</a>\
							</td>\
							<td width="70px">\
								<a href="'+lien("LP",liste[i])+'" style="color:#000; font-family:sans-serif !important;">\
									<img src="http://media-copper.cursecdn.com/avatars/thumbnails/8/903/16/16/634629340216448324.ico" style="vertical-align:top; height:16px;"/>\
									LolPro\
								</a>\
							</td>\
							<td width="70px">\
								<a href="'+lien("WIKIA",liste[i])+'" style="color:#000; font-family:sans-serif !important;">\
									<img src="http://images1.wikia.nocookie.net/__cb61860/leagueoflegends/images/6/64/Favicon.ico" style="vertical-align:top; height:16px;"/>\
									Wikia\
								</a>\
							</td>\
						</tr>\
						<tr height="20px">\
							<td width="70px">\
								<a href="'+lien("MF",liste[i])+'" style="color:#000; font-family:sans-serif !important;">\
									<img src="http://www.mobafire.com/favicon.ico" style="vertical-align:top; height:16px;"/>\
									MobaFire\
								</a>\
							</td>\
							<td width="70px">\
								<a href="'+lien("SM",liste[i])+'" style="color:#000; font-family:sans-serif !important;">\
									<img src="http://www.solomid.net/favicon.ico" style="vertical-align:top; height:16px;"/>\
									SoloMid\
								</a>\
							</td>\
						</tr>\
					</tbody>\
				</table>\
			</div>\
		</div>';
	}
	StringListe = StringListe + '<div id="miow_iframe"></div></div>';
	return StringListe;
}



document.getElementById("miow_divListe").innerHTML = miow_listeGen(LISTE);
document.getElementById('miow_input').onkeydown=function(event){

	setTimeout(function(){miow_update(document.getElementById('miow_input'));},50);
	
	if(event.which==13){
		for (var i = 0, c = LISTE.length ; i < c ; i++){
			if(LISTE[i].search(this.value.toLowerCase()) != -1){
				this.value = LISTE[i].charAt(0).toUpperCase() + LISTE[i].substring(1).toLowerCase();
				location.href = lien(SITE,LISTE[i]);
				break
			}
		}
	}
};
for (var i = 0, c = LISTE.length ; i < c ; i++) {
	if(location.href.search(new RegExp(LISTE[i],"i")) != -1){
		var Champion = LISTE[i]
		document.getElementById("miow_togglelistcontent").innerHTML = '\
			<img src="http://edge1.mobafire.com/images/champion/icon/'+Champion+'.png" style="height:19px; width:19px; padding-top:9px; -moz-box-sizing:content-box;" />\
			<div style="height:40px; padding-top:20px; color:#0aa; cursor:default; font-family:sans-serif !important; -moz-box-sizing:content-box;" onmousedown="'+onclick+'" />\
					&nbsp;|||\
			</div>\
			\
			\
			<a href="'+lien("CS",Champion)+'" style="color:#000; font-family:sans-serif !important;">\
				<img src="http://www.championselect.net/css/img/championselect.png" style="vertical-align: bottom; height:16px;"/>\
			</a>\
			<a href="'+lien("LK",Champion)+'" style="color:#000; font-family:sans-serif !important;">\
				<img src="http://www.lolking.net/favicon.ico" style="vertical-align: bottom; height:16px;"/>\
			</a>\
			<a href="'+lien("LP",Champion)+'" style="color:#000; font-family:sans-serif !important;">\
				<img src="http://media-copper.cursecdn.com/avatars/thumbnails/8/903/16/16/634629340216448324.ico" style="vertical-align: bottom; height:16px;"/>\
			</a>\
			<a href="'+lien("MF",Champion)+'" style="color:#000; font-family:sans-serif !important;">\
				<img src="http://www.mobafire.com/favicon.ico" style="vertical-align: bottom; height:16px;"/>\
			</a>\
			<a href="'+lien("WIKIA",Champion)+'" style="color:#000; font-family:sans-serif !important;">\
				<img src="http://images1.wikia.nocookie.net/__cb61860/leagueoflegends/images/6/64/Favicon.ico" style="vertical-align: bottom; height:16px;"/>\
			</a>\
			<a href="'+lien("SM",Champion)+'" style="color:#000; font-family:sans-serif !important;">\
				<img src="http://www.solomid.net/favicon.ico" style="vertical-align: bottom; height:16px;"/>\
			</a>\
			\
			';
		break;
	}
}

if(document.location.href.search("lolking.net/champions/") != -1 && document.location.href.search("#miow") != -1){
	
	setTimeout(function(){
		document.getElementsByTagName("body")[0].innerHTML = '\
			<div id="chart_item_container" class="boxcontent" style="margin-top:-65px; padding-left:25px; background: -moz-linear-gradient(center top , #fff 0%, #fff 100%) repeat scroll 0 0 transparent;">' 
				+ document.getElementById("chart_item_container").innerHTML + 
			'</div>';
		},3000);
}



