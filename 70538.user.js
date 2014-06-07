// ==UserScript==
// @name           Travian Super Map + Multi Language
// @namespace      Big Map
// @description    Enlarge map like travian plus
// @include        http://*.travian.*/karte.php
// @version 	   1.5
// @license        GNU General Public License
// @source 	   http://userscripts.org/scripts/show/70538
// history:        originally imported from buya's bigmap.
//                 modified by near 2010/03/16
//                 modified for multi-language by Dank 2010/03/20
//                 Language: English, 繁體中文, 简体中文, Deutsch  03/20
//                 Language: Arabic by Dream1 03/21
//                 fixed the coordinate problem by Dream1 03/23
//                 Language: Greek by Stardust_gr 03/25
//                 Language: Spanish by DiegoAlexis2079 03/27
//                 modified by near for more languages 04/01


// ==/UserScript==
/**
*Thanks to Buya's and Dank for this scripts
*****************************************************************************/

var Host = "http://"+window.location.hostname;
var Style = "#BuyaaMap div.b00 { float: left;width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d00.gif)}\
	#BuyaaMap div.b01 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d01.gif)}\
	#BuyaaMap div.b02 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d02.gif)}\
	#BuyaaMap div.b03 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d03.gif)}\
	#BuyaaMap div.b04 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d04.gif)}\
	#BuyaaMap div.b05 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d05.gif)}\
	#BuyaaMap div.b06 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d06.gif)}\
	#BuyaaMap div.b07 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d07.gif)}\
	#BuyaaMap div.b08 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d08.gif)}\
	#BuyaaMap div.b09 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d09.gif)}\
	#BuyaaMap div.b10 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d10.gif)}\
	#BuyaaMap div.b11 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d11.gif)}\
	#BuyaaMap div.b12 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d12.gif)}\
	#BuyaaMap div.b13 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d13.gif)}\
	#BuyaaMap div.b14 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d14.gif)}\
	#BuyaaMap div.b15 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d15.gif)}\
	#BuyaaMap div.b16 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d16.gif)}\
	#BuyaaMap div.b17 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d17.gif)}\
	#BuyaaMap div.b18 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d18.gif)}\
	#BuyaaMap div.b19 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d19.gif)}\
	#BuyaaMap div.b20 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d20.gif)}\
	#BuyaaMap div.b21 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d21.gif)}\
	#BuyaaMap div.b22 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d22.gif)}\
	#BuyaaMap div.b23 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d23.gif)}\
	#BuyaaMap div.b24 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d24.gif)}\
	#BuyaaMap div.b25 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d25.gif)}\
	#BuyaaMap div.b26 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d26.gif)}\
	#BuyaaMap div.b27 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d27.gif)}\
	#BuyaaMap div.b28 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d28.gif)}\
	#BuyaaMap div.b29 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d29.gif)}\
	#BuyaaMap div.b30 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d30.gif)}\
	#BuyaaMap div.b31 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d31.gif)}\
	#BuyaaMap div.b32 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d32.gif)}\
	#BuyaaMap div.b33 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d33.gif)}\
	#BuyaaMap div.b34 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d34.gif)}\
	#BuyaaMap div.b35 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/d35.gif)}\
	#BuyaaMap div.o0 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/o0.gif)}\
	#BuyaaMap div.o1 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/o1.gif)}\
	#BuyaaMap div.o2 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/o2.gif)}\
	#BuyaaMap div.o3 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/o3.gif)}\
	#BuyaaMap div.o4 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/o4.gif)}\
	#BuyaaMap div.o5 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/o5.gif)}\
	#BuyaaMap div.o6 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/o6.gif)}\
	#BuyaaMap div.o7 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/o7.gif)}\
	#BuyaaMap div.o8 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/o8.gif)}\
	#BuyaaMap div.o9 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/o9.gif)}\
	#BuyaaMap div.o10 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/o10.gif)}\
	#BuyaaMap div.o11 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/o11.gif)}\
	#BuyaaMap div.o12 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/o12.gif)}\
	#BuyaaMap div.o99 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/o99.gif)}\
	#BuyaaMap div.t0 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/t0.gif)}\
	#BuyaaMap div.t1 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/t1.gif)}\
	#BuyaaMap div.t2 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/t2.gif)}\
	#BuyaaMap div.t3 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/t3.gif)}\
	#BuyaaMap div.t4 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/t4.gif)}\
	#BuyaaMap div.t5 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/t5.gif)}\
	#BuyaaMap div.t6 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/t6.gif)}\
	#BuyaaMap div.t7 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/t7.gif)}\
	#BuyaaMap div.t8 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/t8.gif)}\
	#BuyaaMap div.t9 { width:74px;height:74px;display:block;background-image:url("+Host+"/gpack/travian36/img/m/t9.gif)}\
	table.detbox tr td{text-align: left; padding: 2px; }\
	.matt {width:18px; height:16px; display:block; background-image:url("+Host+"/gpack/travian36/img/m/matt.gif); }\
	.mret {width:18px; height:16px; display:block; background-image:url("+Host+"/gpack/travian36/img/m/mret.gif); }\
	";

mlang="com";
checkLang();

switch (mlang) {
	case "de":
		titlestring = ["große Karte", "Dorf", "Spieler", "Einwohner", "Allianz"];
		break;
	case "hk":
	case "tw":
		titlestring = ["擴增地圖", "村莊名", "玩家", "人口數", "公會"];
		break;
        case "id":titlestring = ["Peta Besar", "Desa", "Pemain", "Populasi", "Alliansi"];
		break;
        case "it":titlestring = ["Mappa estesa", "Villaggio", "Proprietario", "Popolazione", "Alleanza"];
		break;
        case "ir":titlestring = ["نقشه بزرگ", "روستا", "بازیکن", "جمعیت", "اتحاد"];
                break;
        case "my":titlestring = ["Peta Besar", "Kampung", "Pemain", "Populasi", "Persekutuan"];	
                break;
        case "ro":titlestring = ["Harta mare", "Sat", "Jucător", "Populaţie", "Alianţă"];
		break;
        case "fr":titlestring = ["Carte étendue", "Village", "Joueur", "Population", "Alliance"];
		break;
        case "pt":titlestring = ["Mapa Grande", "Aldeia", "Jogador", "População", "Aliança"];
		break;
        case "br":titlestring = ["Mapa maior", "Aldeia", "Jogador", "População", "Aliança"];
		break;
        case "cz":titlestring = ["Velká mapa", "Vesnice", "Hráč", "Populace", "Aliance"];
		break;	
        case "nl":titlestring = ["Grote map", "Dorp", "Speler", "Populatie", "Alliantie"];
		break;
        case "ru":titlestring = ["Большая карта", "Деревня", "Игрок", "Население", "Альянс"];
		break;
        case "ua":titlestring = ["Велика карта", "Поселення", "Гравець", "Населення", "Альянс"];
		break;
        case "hu":titlestring = ["Nagy térkép", "Falu", "Játékos", "Népesség", "Klán"];
		break;
        case "no":titlestring = ["Stort kart", "By", "Spiller", "Befolknong", "Allianse"];
		break;
        case "si":titlestring = ["Velik zemljevid", "Naselbine", "Igralec", "Populacija", "Aliansa"];
		break;
        case "lt":titlestring = ["Didelis žemėlapis", "Gyvenvietės pavadinimas", "Žaidėjas", "Populiacija", "Aljansas"];
		break;
        case "rs":titlestring = ["Велика мапа", "Село", "Играч", "Популација", "Савез"];
		break;
        case "kr":titlestring = ["큰 지도", "마을", "플레이어", "인구", "동맹"];
		break;
        case "lv":titlestring = ["Lielā karte", "Ciems", "Spēlētājs", "Populācija", "Alianse"];
		break;
	case "jp":titlestring = ["拡張マップ", "村名", "プレイヤー", "人口", "同盟"];
		break;
	case "il":titlestring = ["מפה גדולה", "כפר", "שחקן", "אוכלוסייה", "ברית"];
		break;
	case "cn":titlestring = ["扩增地图", "村庄名", "玩家", "人口数", "公会"];
		break;
        case "ae":
        case "sa":
        case "sy":
        case "eg":
                titlestring = ["(خريطة) مقاس ", "القرية", "اللاعب", "السكان", "التحالف"];
                break;
case "ba":
titlestring = ["Velika Karta", "Naziv Sela", "Igrač", "Stanovnici", "Alijansa"];
break;
case "hr":
titlestring = ["Velika Mapa", "Selo", "Igrač", "Stanovnici", "Savez"];
break;
case "pl":
titlestring = ["Duża Mapa", "Osada", "Gracz", "Ludność", "Sojusz"];
break;
case "vn":
titlestring = ["Bản đồ lớn", "Làng", "Người Chơi", "Dân Số", "Liên Minh"];
break;
        case "gr":
                titlestring =["Μεγάλος Χάρτης", "Χωριό", "Παίκτης", "Πληθυσμός", "Συμμαχία"];
                break;
	case "com":default:
		titlestring = ["Big map", "Village", "Player", "Population", "Alliance"];
		break;
        case "ar":
        case "cl":
        case "mx":
        case "es":
        titlestring = ["Mapa Grande", "Aldea", "Jugador", "Habitantes", "Alianza"];
        break;
}
	
GM_addStyle(Style);

var Utf8 = {
 
	// public method for url encoding
	encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	},
 
	// public method for url decoding
	decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
 
		while ( i < utftext.length ) {
 
			c = utftext.charCodeAt(i);
 
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
 
		}
 
		return string;
	}
 
}

var Board = {
	X : 0,
	Y : 0,
	Link : function(given_size){
		//Added given_size parameter. Enkh.
		link = Doc.New("a",[['href','javascript:void(0)']]);
// Modify by Dream1 ======= start
link.innerHTML = '  <img src="img/un/m/max.gif" title="'+titlestring[0]+'( '+ given_size +'X' + given_size +')">';
// Modify by Dream1 ======= end 
		//(given_size)/7 is to determine row and column number of map
		link.addEventListener('click',function(){Board.Init((given_size/7));},false)
		Doc.Element("content").appendChild(link);
	},
	
	Init : function(size){
		//In this function I have only added size parameter. Enkh.
		this.X = parseInt(Doc.Element("mcx").value);
		this.Y = parseInt(Doc.Element("mcy").value);
		Area = Doc.New("div",[['id','BuyaaMap'],['style','z-index: 1000']]);
		document.body.innerHTML = '';
		document.body.appendChild(Area);
		
		Detail_Area = Doc.New("div",[['id','BuyaaDetails'],['style','z-index: 1001']]);	
		document.body.appendChild(Detail_Area);
		document.body.appendChild(Doc.New("div",[['id','DetailBox']]));
		document.body.appendChild(Doc.New("div",[['id','TMove'],['style','z-index: 1002']]));
		document.body.style.display='none';
		lim_x = this.X - 14;
		lim_y = this.Y - 14;
		lim_px = -4;
		lim_py = 1000;
		
        //If map size is 21 then beginning coordinate will be changed to this values. Enkh.
                if(size == 3) {
                lim_px = -4;
                lim_py = 400;
        // Modify by Dream1 ======= Start
                lim_x = this.X - 7;
                lim_y = this.Y - 7;
        // Modify by Dream1 ======= End
                }
		
		for (row = 0 ; row < size ; row++){
			for(col = 0 ; col < size ; col++){
				given_x = lim_x + (row * 7);
				given_y = lim_y + (col * 7);
				given_px = (lim_px) + (row * 36 * 7) + (col * 36 * 7);
				given_py = (lim_py) + (row * 20 * 7) - (col * 20 * 7);
				flag = false;
				if (row == (size-1) && col == (size-1)) flag = true;
				Map.Get(given_x,given_y,given_px,given_py,flag);	
			}
		}		

		/*Map.Get(this.X,this.Y,500,500,false);
		Map.Get(this.X-7,this.Y,248,360,false);
		Map.Get(this.X+7,this.Y,752,640,false);
		Map.Get(this.X,this.Y-7,248,640,false);
		Map.Get(this.X,this.Y+7,752,360,false);

		Map.Get(this.X-7,this.Y-7,-4,500,true);
		Map.Get(this.X+7,this.Y-7,500,780,false);
		Map.Get(this.X-7,this.Y+7,500,220,false);
		Map.Get(this.X+7,this.Y+7,1004,500,true); */


		
	}
};

var Doc = {
	New : function(tt,attrs){
		newElement = document.createElement(tt);
		if (attrs !== undefined) {
			for(var xi = 0; xi < attrs.length; xi++) {
				newElement.setAttribute(attrs[xi][0], attrs[xi][1]);
			};
		};
	//	this.Element().appendChild(createElement("DIV"));
	return newElement;
	}, 
	Element : function(eid){
		return document.getElementById(eid);	
	},
};

var Map = {
	Get : function(xs,ys,pos_x,pos_y,is_last){
		x = xs+3;
		y = ys-3;
		xx = xs-3;
		yy = ys +3;
		url = Host + "/ajax.php?f=k7&x="+x+"&y="+y+"&xx="+xx+"&yy="+yy;
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			headers:{'Content-type':'application/x-www-form;'},
			data: '',
			onload: function(responseDetails) {
				Map.Sync(responseDetails.responseText,pos_x,pos_y);
				if (is_last == true){
					Troops.Move();
					document.body.style.display='block';
				}
			}
		});
	},
	Sync : function(jsn,pos_x,pos_y){

		POS_x = pos_x;
		POS_y = pos_y;


		jsn = jsn.substr(1).split("]]]")[0] + "]]";
		rows = jsn.split("]],[[");
		for(i = 0 ; i < rows.length ; i++){
			cells = rows[i].split("],[");
			for (j = 0 ; j < cells.length ; j++){
				if(j == 0 && i == 0){
					cells[j] = cells[j].substr(2);
				}else if(i == rows.length-1 && j == cells.length-1){
					cells[j] = cells[j].split("]]")[0];
				}
				box = cells[j].split(",");
				posx = POS_x + j * 36;
				posy = POS_y - j * 20;
				div = Doc.New("div",[ 
								['class',box[5].split('"')[1] ],
								['id','d_x'+box[0]+'_y'+box[1] ],
								['style','position:absolute;left:'+posx+'px;top:'+posy+'px;'],
							]);
					

				Doc.Element("BuyaaMap").appendChild(div);
					
				posx = posx + 20;
				posy = posy + 40;
				overlay = Doc.New("a", [
								['id','a_x'+box[0]+'_y'+box[1]],
								['style','float: left;display:block; width:36px; height:20px; position: absolute; left:'+posx+'px;top:'+posy+'px;'],
								['href','karte.php?'+box[4].split('"')[1]],
								['onmouseover',"document.getElementById('DetailBox_"+posx+"_"+posy+"').style.display='block';"],
								['onmouseout',"document.getElementById('DetailBox_"+posx+"_"+posy+"').style.display='none';"],
						 	]);
				Doc.Element("BuyaaDetails").appendChild(overlay);
				
				// MAP Details
				
				this.ShowDetails(cells[j],posx,posy);
				
					
			}
			POS_x = POS_x + 36;
			POS_y = POS_y + 20;
		}
	},
	ShowDetails : function(cell,tempX,tempY){
		box = cell.split(",");
		if (box[2] == 0){
			maptype = Map.getOasis(parseInt(box[5].split('"')[1].substr(1)));
			maptype[0] += '%';
			maptype[1] += '%';
			maptype[2] += '%';
			maptype[3] += '%';

		}else{
			maptype = Map.getType(parseInt(box[2]));
		}
		
		Dhtml = "";
		Dhtml += "<table class='detbox' cellpadding='1' cellspacing='1'>";
		Dhtml += "<tr>";
			Dhtml += "<td>("+box[0]+"|"+box[1]+")</td>";
			Dhtml += "<td style='width: 200px;'>";
				Dhtml += "<img class='r1' title='Lumber' alt='Lumber' src='img/x.gif'/>" + maptype[0];
				Dhtml += "<img class='r2' title='Clay' alt='Clay' src='img/x.gif'/>" + maptype[1];
				Dhtml += "<img class='r3' title='Iron' alt='Iron' src='img/x.gif'/>" + maptype[2];
				Dhtml += "<img class='r4' title='Crop' alt='Crop' src='img/x.gif'/>" + maptype[3];
			Dhtml += "</td>";
		Dhtml += "</tr>";

		// Modify by Dank ===============================================================
		if (box.length > 6){
			str=box[6].split('"')[1];
			str=str.replace(/\\u/g,"%u");
			Dhtml += "<tr>";
				Dhtml += "<td>"+titlestring[1]+"</td>";
				Dhtml += "<td style='width: 200px;'>"+unescape(str)+"</td>";
			Dhtml += "</tr>";
			str=box[7].split('"')[1];
			str=str.replace(/\\u/g,"%u");
			Dhtml += "<tr>";
				Dhtml += "<td>"+titlestring[2]+"</td>";
				Dhtml += "<td style='width: 200px;'  >"+unescape(str)+"</td>";
			Dhtml += "</tr>";
			str=box[8].split('"')[1];
			str=str.replace(/\\u/g,"%u");
			Dhtml += "<tr>";
				Dhtml += "<td>"+titlestring[3]+"</td>";
				Dhtml += "<td style='width: 200px;' >"+unescape(str)+"</td>";
			Dhtml += "</tr>";
			str=box[9].split('"')[1];
			str=str.replace(/\\u/g,"%u");
			Dhtml += "<tr>";
				Dhtml += "<td>"+titlestring[4]+"</td>";
				Dhtml += "<td style='width: 200px;' >"+unescape(str)+"</td>";
			Dhtml += "</tr>";
		}
		// ===============================================================================
		Dhtml += "</table>";
		
		DBox = Doc.New("div",[["id","DetailBox_"+tempX+"_"+tempY],]);
		DBox.innerHTML = Dhtml;
		DBox.style.position = "absolute";
		DBox.style.left = (tempX+15)+"px";
		DBox.style.top = (tempY+15)+"px";
		DBox.style.display = "none";
		Doc.Element("DetailBox").appendChild(DBox); 


		Tdiv = Doc.New("div",[['id',box[4].split('"')[1].split('&')[0] ]]);
		Tdiv.style.position = 'absolute';
		Tdiv.style.left = (posx+8)+"px";
		Tdiv.style.top  = (posy+11)+"px";
		Doc.Element("TMove").appendChild(Tdiv);

		
	},
	
	getType : function(ttt){
		switch(ttt){
			case 1:
				return [3, 3, 3, 9];
			case 2:
				return [3, 4, 5, 6];
			case 3:
				return [4, 4, 4, 6];
			case 4:
				return [4, 5, 3, 6];
			case 5:
				return [5, 3, 4, 6];
			case 6:
				return [1, 1, 1, 15];
			case 7:
				return [4, 4, 3, 7];
			case 8:
				return [3, 4, 4, 7];
			case 9:
				return [4, 3, 4, 7];
			case 10:
				return [3, 5, 4, 6];
			case 11:
				return [4, 3, 5, 6];
			case 12:
				return [5, 4, 3, 6];
			default:
				return false;
		}
	},
	getOasis : function(ttt){
		switch(ttt){
			case 1:
				return [25, 0, 0, 0];
			case 2:
				return [25, 0, 0, 0];
			case 3:
				return [25, 0, 0, 25];
			case 4:
				return [0, 25, 0, 0];
			case 5:
				return [0, 25, 0, 0];
			case 6:
				return [0, 25, 0, 25];
			case 7:
				return [0, 0, 25, 0];
			case 8:
				return [0, 0, 25, 0];
			case 9:
				return [0, 0, 25, 25];
			case 10:
				return [0, 0, 0, 25];
			case 11:
				return [0, 0, 0, 25];
			case 12:
				return [0, 0, 0, 50];
			default:
				return false;
		}
	},

};

var Troops = {
	Move : function(){
		url = Host + "/build.php?id=39";
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			headers:{'Content-type':'application/x-www-form;'},
			data: '',
			onload: function(responseDetails) {
				Troops.Sync(responseDetails.responseText);
				Doc.Element("hidden_tr").innerHTML = '';
				
			}
		});
	},
	Sync : function(resp){
		hidden = Doc.New("div",[['id','hidden_tr'],['style', 'display:none;']]);
		hidden.innerHTML = resp;
		document.body.appendChild(hidden);
		TTables = hidden.getElementsByClassName('troop_details');
//		alert("THERE");
		for (var i = 0 ; i < TTables.length ; i++){
			aTable = TTables[i];
			thead =	aTable.getElementsByTagName("thead")[0];
			tr = thead.getElementsByTagName('tr')[0];
			td = thead.getElementsByTagName('td');
			id = td[1].innerHTML.split('?')[1].split('"')[0].split('&')[0];
		//	alert(id);
			el = Doc.Element(id)
			atitle = aTable.getElementsByClassName("in")[0];
			if (atitle){
				title = atitle.getElementsByTagName('span')[0].innerHTML;
			}
			//alert(title);
			if (el && el != undefined){
				iHTML = td[1].getElementsByTagName('*')[0].innerHTML;
				if (iHTML.match(/Return from/)){
					el.innerHTML = "<span class='mret' title='"+title+"'/>";
				}else if(iHTML.match(/Attack against/) || iHTML.match(/Raid against/)){
					el.innerHTML = "<span class='matt'  title='"+title+"' />";
				}
			}
		}
	
	},
};

Board.Link(21); 
Doc.Element('content').appendChild(Doc.New('span',[['style','margin: 2px;']]));
Board.Link(35);

function checkLang()
{
  var host = window.location.hostname;
  hosts = host.split(".");
  mlang = hosts[hosts.length-1];
}
