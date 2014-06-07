// ==UserScript==
// @name                MyNewAddon
// @version             3.0 b
// @description         none
// @include             http://*.de.kapihospital.com/main.php*
// @exclude             http://forum.de.kapihospital.com/*
// ==/UserScript==





var tinyMappe = (function () {
    "use strict";
    // private properties
	
    var isMSIE = /*@cc_on!@*/0,
    mappe_timer_id = null,
    daten = null,
    listeEingang = null,
    listeAusgang = null,
    sort = {
        column : "Kosten",
        dir : -1
    },
    aktuelleListe = null,

	// private functions
    
    getInnerContent = (function(){
        if( isMSIE ){
            return function(ele){return ele.innerText.replace(/^\s*/, '').replace(/\s*$/, '');};
        }
        return function(ele){return ele.textContent.replace(/^\s*/, '').replace(/\s*$/, '');};
    }()),
    
    setListen = function(){
            listeEingang = document.getElementById("referral_reci");
            tinyFilter.setListeEingang(listeEingang);
            listeAusgang = document.getElementById("referral_send");
            tinyFilter.setListeAusgang(listeAusgang);
    },
    moveNavigationsEnd = function(liste,type){
		var len = liste.children.length, first, toMove, br;
		// var lenOut = listeAusgang.children.length;
		if(len > 2){
			first = document.getElementById(type+"Pat0");
			toMove = liste.children[len - 1];
			br = document.createElement("br");
			liste.insertBefore(toMove, first);
			liste.insertBefore(br,first);
		}
    },
    
    makeSortable = function(liste){
		var patienten = liste.children,
			len = patienten.length,
			count = 0, i,
			column,
			headerClass;
			
		for( i = 0 ; i < len ; i += 1 ){
			if(count === 4) {
				break;
			}
			column = getInnerContent(patienten[i]);
			headerClass = patienten[i].className;
			if(headerClass === "ref_spatline ref_spatlineheader" && column !== "Aktion"){
				patienten[i].id = "sort_"+column;
				patienten[i].addEventListener("click", initSort);
				count += 1;
			}
		}
    },
    extractSortValueName = function(element){
		return getInnerContent(element.children[0]);
    },
    extractSortValueKrankheiten = function(element){
		var content = element.innerHTML.toString().split("d_a_15");
		return content.length - 1;
    },
    extractSortValueSendReci = function(element){
		return getInnerContent(element.children[2]);
    },
    extractSortValuePreis = function(element){
		var p = getInnerContent(element.children[3]).replace(/[^0-9,]/g, '').split(",");
		return parseFloat(p[0],10)+Math.round(parseFloat(p[1],10)/Math.pow(10,p[1].length-2))/100;
    },
    extractSortValue = function(element,column){
		var value;

		switch(column){
			case "Patientenname" :
				value = extractSortValueName(element);
				break;
			case "Krankheiten" :
				value = extractSortValueKrankheiten(element);
				break;
			case "Empfänger" :
			case "Absender" :
				value = extractSortValueSendReci(element);
				break;
			case "Kosten" :
					value = extractSortValuePreis(element);
					break;
				default : return;
			}
			return value;
    },
    appendListe = function(liste, data, column){
		var len = data.length, 
			i;
		
		for (i = 0; i < len ; i += 1) {
			liste.appendChild(data[i][0]);
		}
    },
    doSort = function(liste){
		if(liste.children.length === 2) {
			return; // nothing to sort
		}
		
		var patienten = liste.children,
			len = patienten.length,
			tempArr = [],
			i;

		
		for( i = 0 ; i < len ; i += 1 ){
			if( patienten[i].id.match(/sPat/) ){
				tempArr[tempArr.length] = [patienten[i],extractSortValue(patienten[i], sort.column)];
			}
		}
		
		tempArr.sort(function(a, b) { return (a[1] > b[1] ? sort.dir : a[1] < b[1] ? -sort.dir : 0); });
		
		appendListe(liste, tempArr, sort.column);
    },
    
    initSort = function(){
		var column = getInnerContent(this);
		
		if(column !== sort.column){
			sort.column = column;
			sort.dir = 1;
		} else {
			sort.dir *= -1;
		}
		
		doSort(listeEingang, column);
		doSort(listeAusgang, column);
    },
    moveListe = function(){
		document.getElementById("newswindow").style.top = "40px";
    },
    hideAusgang = function(){
		listeAusgang.style.display = "none";
    },
    hideEingang = function(){
		listeEingang.style.display = "none";
    },
    hideUnused = function(){
		if(aktuelleListe === listeAusgang){
			hideEingang();
			return;
		}
		hideAusgang();
    },
    initMappe = function(){
        console.log("init");
        moveListe();
        tinyFilter.showFilter();
        setListen();
        // hideUnused();
        moveNavigationsEnd(listeEingang,"r");
        moveNavigationsEnd(listeAusgang,"s");
        makeSortable(listeEingang);
        makeSortable(listeAusgang);
        doSort(listeEingang);
        doSort(listeAusgang);
        tinyFilter.recallFilter();
    };
    
    
    
    // public members

    return {
        sucheMappe : function()
        {
            var check = document.getElementById("referrals");
            if(!check)	{
				tinyFilter.hideFilter();
				return;
            }
            if(check.init === true){
				return;
            }
			check.init = true;
			initMappe();
        }
    };
}());


window.onload = function()
{
	"use strict";
	tinyFilter.initFilter();
    window.setInterval(tinyMappe.sucheMappe,100);
};

var tinyFilter = (function(){
	"use strict";
	var isMSIE = /*@cc_on!@*/0, filter = null, visible = false, last_tab = "tf_r_00", listeEingang, listeAusgang, lastKhFilter="", lastRoomFilter="",
	rooms = {
		"r_00" : ["r_00","Behandlungsraum","e2bd9b",[3,4,5,6,10,11,12]],				"r_01" : ["r_01","Röntgenraum","a3a6de",[1,2,18,58,73]],
		"r_02" : ["r_02","Ultraschallraum","b48dc4",[26,30,44,52,75,94,99,113]],		"r_03" : ["r_03","Orthopädie","e0e19a",[48,66,49,80,103,110,55,60]],
		"r_04" : ["r_04","Psychotherapie","74b077",[8,9,34,88,96,27,33,108,50]],		"r_05" : ["r_05","EKG / EEG","bce3b3",[71,67,79,37,83,100,41,46]],
		"r_06" : ["r_06","Operationssaal","d9d9d9",[19,39,77,107,40,101,53,65]],		"r_07" : ["r_07","Laboratorium","ffffff",[61,21,86,22,98,38,105,43,74]],
		"r_08" : ["r_08","Dunkelkammer","66646A",[36,45,78,84,56,90,111,20,32,76]],		"r_09" : ["r_09","Gummizelle","556c7c",[35,31,82,93,95,57,24,64]],
		"r_10" : ["r_10","Tomographie","dcc6a1",[29,16,91,13,97,106,63,72]],			"r_11" : ["r_11","Tropenmedizin","707b58",[51,15,87,7,104,14,114,47,17]],
		"r_12" : ["r_12","Nuklearmedizin","a296a3",[69,54,23,81,112,92,42,109,59]],		"r_13" : ["r_13","Zahnmedizin","a5dbdf",[68,28,85,102,89,62,70]],
		"r_14" : ["r_14","Area51-Labor","c8f590",[115,116,117,118,119]]}, 

	krankheiten = [
		["k_00","nv","nv",0,0],										["k_01","Gebrochener Arm","r_01",2,4800],									["k_02","Gebrochenes Bein","r_01",4,9600],					["k_03","Brecheritis","r_00",1,600],
		["k_04","Nasenflügelakne","r_00",1,600],					["k_05","Schädelbrummen","r_00",4,9600],									["k_06","Schürfwunde","r_00",3,1800],						["k_07","Dauerschnupfen","r_11",31,14400],
		["k_08","Rummelplatzkrankheit","r_04",10,9600],				["k_09","Faulenzia","r_04",10,8400],										["k_10","Grippeimpfung","r_00",33,5400],					["k_11","Segelohrentzündung","r_00",6,7200],
		["k_12","Zwergfellentzündung","r_00",5,9600],				["k_13","Venenverwesung","r_10",33,18000],									["k_14","Ohrschneckenauswanderung","r_11",35,21600],		["k_15","Sonnenbankbrand","r_11",21,57600],
		["k_16","Haarbruch","r_10",19,18600],						["k_17","Lippenblütlerwarze","r_11",50,15600],								["k_18","Fränkisches Wurzelfieber","r_01",6,5400],			["k_19","Furunkelfunkeln","r_06",12,14400],
		["k_20","(Ohr-)Schmalzlocke","r_08",37,25200],				["k_21","Stinkekäsefuß","r_07",14,12000],									["k_22","Kussmundatem","r_07",25,18000],					["k_23","Fleuchhusten","r_12",31,5400],
		["k_24","Seekrankheit","r_09",56,36000],					["k_25","nv","nv",0,0],														["k_26","Wechselbalgjahre","r_02",6,7200],					["k_27","Würfelhusten","r_04",39,28800],
		["k_28","Spülwurm","r_13",29,13200],						["k_29","Rot-Grün-Fieber","r_10",19,18000],									["k_30","Luftpocken","r_02",7,8400],						["k_31","Marserianerimpfung","r_09",18,7500],
		["k_32","Hitzewallung","r_08",39,43200],					["k_33","Mumpitzimpfung","r_04",41,5400],									["k_34","Wasserallergie","r_04",13,10800],					["k_35","Arbeitsallergie","r_09",18,1800],
		["k_36","Schlaflosigkeit","r_08",16,6000],					["k_37","Dauermüdigkeit","r_05",23,3600],									["k_38","Kopflausbuben","r_07",41,50400],					["k_39","Zungenverknotung","r_06",12,10800],
		["k_40","Fingernagelbruch","r_06",43,16200],				["k_41","Kampfadern","r_05",43,57600],										["k_42","Pobackenflattern","r_12",45,12600],				["k_43","Schleimbeutelüberproduktion","r_07",45,25200],
		["k_44","Galliensteine","r_02",7,6300],						["k_45","Koffeinhypersensibilität","r_08",16,6000],							["k_46","Koffeinmangel","r_05",47,5400],					["k_47","Fußfliegenpilz","r_11",47,14400],
		["k_48","Aufgerollte Fußnägel","r_03",8,9000],				["k_49","Nagelbettwackeln","r_03",15,9000],									["k_50","Rotes Kniekehlchen","r_04",49,21600],				["k_51","Frosch im Hals","r_11",21,13200],
		["k_52","Gurgelhupf","r_02",54,64800],						["k_53","Flatterndes Nabelpiercing","r_06",51,14400],						["k_54","Rosengürtel","r_12",27,43200],						["k_55","Salzfässchen","r_03",58,28800],
		["k_56","Bad-Hair-Day-Syndrom","r_08",25,18600],			["k_57","Peitschenfloh","r_09",53,14400],									["k_58","Schieldrüsensyndrom","r_01",60,43200],				["k_59","Leberkäserkältung","r_12",55,18000],
		["k_60","Muskelkätzchen","r_03",62,43200],					["k_61","Nierenkiesel","r_07",13,12600],									["k_62","Kiefernzapfenverrenkung","r_13",57,21600],			["k_63","Lungenseifenblasen","r_10",64,14400],
		["k_64","Milzbierüberdruss","r_09",59,21600],				["k_65","Tomatenmarkgefüllte Knochen","r_06",66,28800],						["k_66","Knorpelverknautschung","r_03",8,9000],				["k_67","Herzschmerzgeschnulze","r_05",11,10800],
		["k_68","Dickdarmdiätsyndrom","r_13",29,21600],				["k_69","Innenohr voller Hammer, Amboss und Steigbügel","r_12",27,86400],	["k_70","Katzenjammern","r_13",61,12600],					["k_71","Herzklappenklappern","r_05",11,9000],
		["k_72","Einhornhautentzündung","r_10",67,23400],			["k_73","Akkuschrauberpunkturlöcher","r_01",63,27000],						["k_74","Zwirbeldrüsenverzwirbelung","r_07",68,18000],		["k_75","gestörtes Wurzelchakra","r_02",69,28800],
		["k_76","Solarplexusdämmerung","r_08",65,14400],			["k_77","Darmvergilbung","r_06",23,17100],									["k_78","Flederhöhlenkopf","r_08",19,10800],				["k_79","Silberblick","r_05",20,8400],
		["k_80","Brett vorm Kopf","r_03",17,14400],					["k_81","Tomaten auf den Augen","r_12",36,17100],							["k_82","viereckige Augen","r_09",24,14400],				["k_83","Sauklaue","r_05",25,13500],
		["k_84","Schnarcheritis","r_08",23,7200],					["k_85","Zahnschmerzen","r_13",31,10800],									["k_86","Dicker Kopf","r_07",19,12600],						["k_87","Drehwurm","r_11",22,7200],
		["k_88","Heimweh","r_04",24,14400],							["k_89","Zahnstein","r_13",48,13500],										["k_90","Sturmfrisur","r_08",27,28800],						["k_91","Zweckenbefall","r_10",22,21600],
		["k_92","Bierbauch","r_12",40,26400],						["k_93","Brüllfroschrülpsen","r_09",33,18000],								["k_94","Milchbart","r_02",16,17100],						["k_95","Rundrücken","r_09",52,43200],
		["k_96","Rapunzelsyndrom","r_04",26,7200],					["k_97","Feuermal","r_10",34,14400],										["k_98","Frostbeulen","r_07",26,12900],						["k_99","Barthaarverzwirbelung","r_02",24,12000],
		["k_100","Gehirndurchzug","r_05",29,12000],					["k_101","Zwei linke Hände","r_06",46,43200],								["k_102","Stumpfe Zähne","r_13",32,14400],					["k_103","Pferdefuß","r_03",28,14400],
		["k_104","Hummeln im Hintern","r_11",32,14400],				["k_105","Stinkebefall","r_07",44,28800],									["k_106","Tränensäcke","r_10",42,18000],					["k_107","Schlitzohr","r_06",26,10200],
		["k_108","Holzkopf","r_04",44,7200],						["k_109","Feuchte Aussprache","r_12",46,28800],								["k_110","Lampenfieber","r_03",38,18000],					["k_111","Knoblauchfahne","r_08",30,15720],
		["k_112","Currywurstjieper","r_12",38,7200],				["k_113","Eierkopf","r_02",9,10800],										["k_114","Glatzitis","r_11",42,28800],						["k_115","Grünschimmersyndrom","r_14",32,21600],
		["k_116","Stielaugen","r_14",33,9600],						["k_117","Gesichtskuschler","r_14",36,18000],								["k_118","Spitzohren","r_14",38,10800],						["k_119","Jogaismus","r_14",40,28800]],
	injectCSS = function(){
		var css, script, content, head;
		
		css = "div#tf_wrapper ul{list-style-type:none;margin:0px;padding:0px;}";
		css += "div#tf_wrapper ul li{float:left;height:13px;background-color: white;margin: 1px;}";
		css += "div#tf_wrapper ul li a{background: #5a6070;color: #fff;text-decoration:none;font:bold 10px Arial;display: block;width:118px;height: 13px;text-align: center;}";
		css += "div#tf_wrapper a.tf_button{background: #fff;display: block;font:bold 10px Arial;width: 298px;height: 13px;text-align: center;color: #000;}";
		css += "div#tf_wrapper ul li a:hover{height:13px;background-color: #9299ac;}";
		css += "div#tf_wrapper{background-color: #000;width: 600px;height: 250px;margin: 1px;padding: 1px;z-index: 62;left:410px;top:500px;position:absolute;}";
		css += "div#tf_wrapper div.tf_content{float:left;background-color:#bdc8e7;margin: 1px;height:188px;width:598px;display: none;}";
		css += "div#tf_wrapper div.tf_show{display: inline;}";
		css += "div#tf_wrapper .r_00_color {background: #e2bd9b; color: #000;}";
		css += "div#tf_wrapper .r_01_color {background: #a3a6de; color: #000;}";
		css += "div#tf_wrapper .r_02_color {background: #b48dc4; color: #000;}";
		css += "div#tf_wrapper .r_03_color {background: #e0e19a; color: #000;}";
		css += "div#tf_wrapper .r_04_color {background: #74b077; color: #000;}";
		css += "div#tf_wrapper .r_05_color {background: #bce3b3; color: #000;}";
		css += "div#tf_wrapper .r_06_color {background: #d9d9d9; color: #000;}";
		css += "div#tf_wrapper .r_07_color {background: #ffffff; color: #000;}";
		css += "div#tf_wrapper .r_08_color {background: #66646A; color: #fff;}";
		css += "div#tf_wrapper .r_09_color {background: #556c7c; color: #fff;}";
		css += "div#tf_wrapper .r_10_color {background: #dcc6a1; color: #000;}";
		css += "div#tf_wrapper .r_11_color {background: #707b58; color: #fff;}";
		css += "div#tf_wrapper .r_12_color {background: #a296a3; color: #000;}";
		css += "div#tf_wrapper .r_13_color {background: #a5dbdf; color: #000;}";
		css += "div#tf_wrapper .r_14_color {background: #c8f590; color: #000;}";
		css += "div#tf_wrapper .tf_active{background: #9299ac;color: #9f0;font-weight: bolder;}";
		css += "div#tf_wrapper .tf_table{margin: 4px;border-collapse: collapse;}";
		css += ".tf_table tr:hover{background: #fff;cursor: hand;cursor: pointer;}";
		css += "div#tf_wrapper td.tf_cell_00{width: 13px;height: 13px;}";
		css += "div#tf_wrapper td.tf_cell_01{padding-left: 10px;width: 300px;height: 13px;}";

		script = document.createElement("style");
		script.type = "text/css";

		content = document.createTextNode(css);
		script.appendChild(content);

		head = document.getElementsByTagName("head")[0];
		head.appendChild(script);
	},
	getInnerContent = (function(){
        if( isMSIE ){
            return function(ele){return ele.innerText.replace(/^\s*/, '').replace(/\s*$/, '');};
        }
        return function(ele){return ele.textContent.replace(/^\s*/, '').replace(/\s*$/, '');};
    }()),
	changeTab = function(){
		var ele, listeE, listeA;
		console.log(this.id);
		ele = document.getElementById(last_tab);
		removeClass(ele,"tf_active");
		ele = document.getElementById("tf_c"+last_tab.split("_")[2]);
		removeClass(ele,"tf_show");
		addClass(this,"tf_active");
		ele = document.getElementById("tf_c"+this.id.split("_")[2]);
		addClass(ele,"tf_show");
		last_tab = this.id;
		
		initFilterRoom(this);
	},
	initFilterRoom = function(ele){
		if(listeEingang.children.length > 2){
			filterRoom(listeEingang, ele.id);
			lastKhFilter = "";
			lastRoomFilter = ele.id;
		}
		if(listeAusgang.children.length > 2){
			filterRoom(listeAusgang, ele.id);
			lastKhFilter = "";
			lastRoomFilter = ele.id;
		}
	},
	recallRoomFilter = function(id){
		if(listeEingang.children.length > 2){
			filterRoom(listeEingang, id);
			lastKhFilter = "";
			lastRoomFilter = id;
		}
		if(listeAusgang.children.length > 2){
			filterRoom(listeAusgang, id);
			lastKhFilter = "";
			lastRoomFilter = id;
		}
	},
	filterRoom = function(liste, id){
		var patienten = liste.children,
			len = patienten.length,
			arrKH = rooms["r_"+id.split("_")[2]][3],
			arrLen = arrKH.length,
			i,
			t;
		
		for( i = 0 ; i < len ; i += 1){
			if(patienten[i].id.match(/sPat/)){
				patienten[i].style.display = "none";
				for( t = 0 ; t < arrLen ; t += 1 ){
					if(hasKH(patienten[i],arrKH[t])){
						patienten[i].style.display = "";
						break;
					}
				}
			}
		}
	},
	hasKH = function(pat,kh){
		var text = pat.innerHTML.toString();
		kh=parseInt(kh,10);
		var num = text.split("d_"+kh+"_15");
		// console.log(kh);
		if(num.length > 1){
			return true;
		}
		return false;
	},
	drawFilter = function(){
		var wrapper, ele, ul_ele, li_ele, a_ele, text, i, prop, table, tr, td, kh, khlen;
		
		// den wrapper erstellen
		wrapper = document.createElement("div");
		wrapper.id = "tf_wrapper";
		
		
		// ul erstellen
		ul_ele = document.createElement("ul");
		
		// schalter
		li_ele = document.createElement("li");
		a_ele = document.createElement("a");
		text = document.createTextNode("Liste umschalten");
		a_ele.id = "tf_schalter";
		a_ele.className = "tf_button";
		a_ele.appendChild(text);
		li_ele.appendChild(a_ele);
		ul_ele.appendChild(li_ele);
		
		// reset
		li_ele = document.createElement("li");
		a_ele = document.createElement("a");
		a_ele.addEventListener("click",initRemoveFilter);
		text = document.createTextNode("Filter entfernen");
		a_ele.id = "tf_reset";
		a_ele.className = "tf_button";
		a_ele.appendChild(text);
		li_ele.appendChild(a_ele);
		ul_ele.appendChild(li_ele);
		
		for(prop in rooms){
			if(rooms.hasOwnProperty(prop)){
				li_ele = document.createElement("li");
				a_ele = document.createElement("a");
				a_ele.addEventListener("click",changeTab);
				text = document.createTextNode(rooms[prop][1]);
				a_ele.appendChild(text);
				a_ele.href = "#";
				a_ele.id = "tf_"+prop;
				a_ele.className = prop + "_color";
				li_ele.appendChild(a_ele);
				ul_ele.appendChild(li_ele);
			}
		}
		
		// ul anhängen
		wrapper.appendChild(ul_ele);
		
		// content anhängen
		for(prop in rooms){
			if(rooms.hasOwnProperty(prop)){
				ele = document.createElement("div");
				ele.id = "tf_c" + prop.split("_")[1];
				ele.className = "tf_content";
				
				// tabelle mit krankheiten
				table = document.createElement("table");
				table.className = "tf_table";
				kh = rooms[prop][3];
				
				khlen = kh.length;
				for( i = 0 ; i < khlen ; i += 1 ){
					tr = document.createElement("tr");
					tr.addEventListener("click",initFilterKH);
					td = document.createElement("td");
					console.log(kh[i] + " " + typeof kh[i]);
					td.id = "tf_" + krankheiten[kh[i]][0];
					td.className = "tf_cell_00 " + "d_" + kh[i] + "_15 d_a_15";
					tr.appendChild(td);
					td = document.createElement("td");
					td.className = "tf_cell_01";
					text = document.createTextNode(krankheiten[kh[i]][1]);
					td.appendChild(text);
					tr.appendChild(td);
					table.appendChild(tr);
				}
				ele.appendChild(table);
				wrapper.appendChild(ele);
			}
		}
		
		document.body.appendChild(wrapper);
		filter = document.getElementById("tf_wrapper");
		filter.style.display = "none";
		visible = false;
	},
	initRemoveFilter = function(){
		if(listeEingang.children.length > 2){
			removeFilter(listeEingang);
			lastKhFilter = "";
			lastRoomFilter = "";
		}
		if(listeAusgang.children.length > 2){
			removeFilter(listeAusgang);
			lastKhFilter = "";
			lastRoomFilter = "";
		}
	},
	removeFilter = function(liste){
		var patienten = liste.children,
			len = patienten.length,
			i;
			
		for(i = 0 ; i < len ; i += 1){
			if(patienten[i].id.match(/sPat/)){
				patienten[i].style.display = "";
			}
		}
	},
	filterKH = function(liste, id){
		console.log(id);
		var kh = id.split("_")[2],
			patienten = liste.children,
			len = patienten.length,
			i;
			
		console.log(kh);
		kh = parseInt(id.split("_")[2],10);
		console.log(kh);
		for(i = 0 ; i < len ; i += 1){
			if(patienten[i].id.match(/sPat/)){
				if(hasKH(patienten[i],kh)){
					patienten[i].style.display = "";
				} else {
					patienten[i].style.display = "none";
				}
			}
		}
		
	},
	initFilterKH = function(){
		if(listeEingang.children.length > 2){
			filterKH(listeEingang, this.children[0].id);
			lastKhFilter = this.children[0].id;
			lastRoomFilter = "";
		}
		if(listeAusgang.children.length > 2){
			filterKH(listeAusgang, this.children[0].id);
			lastKhFilter = this.children[0].id;
			lastRoomFilter = "";
		}
	},
	recallKHFilter = function(id){
		if(listeEingang.children.length > 2){
			filterKH(listeEingang, id);
			lastKhFilter = id;
			lastRoomFilter = "";
		}
		if(listeAusgang.children.length > 2){
			filterKH(listeAusgang, id);
			lastKhFilter = id;
			lastRoomFilter = "";
		}
	},
	addClass = function (e,c){
	    var t;
	    if(!hasClass(e,c)){
	        t = e.className.replace(/ {2,}/g, ' ').replace(/^\s+|\s+$/g,'');
	        t = t.split(" ");
	        t.push(c);
	        t = t.join(" ");
	        e.className = t;
	    }
	},
	removeClass =function removeClass(e,c){
		var t,p;
	    if(hasClass(e,c)){
	        t = e.className.replace(/ {2,}/g, ' ').replace(/^\s+|\s+$/g,'');
	        t = t.split(" ");
	        p = t.indexOf(c);
	        t.splice(p,1);
	        t = t.join(" ");
	        e.className = t;
	    }
	},
	hasClass = function hasClass(e,c) {
		return e.className.match(new RegExp('(\\s|^)'+c+'(\\s|$)'));
	};
	return {
		recallFilter : function(){
			if(lastRoomFilter !== ""){
				recallRoomFilter(lastRoomFilter);
			}
			if(lastKhFilter !== ""){
				recallKHFilter(lastKhFilter);
			}
		},
		setListeEingang : function(liste){
			listeEingang = liste;
		},
		setListeAusgang : function(liste){
			listeAusgang = liste;
		},
		initFilter : function(){
			injectCSS();
			drawFilter();
			
		},
		removePat : function(id){
			console.log("removing "+id);
		},
		hideFilter : function(){
			if(visible){
				document.getElementById("tf_wrapper").style.display = "none";
				visible = false;
			}
		},
		showFilter : function(){
			if(!visible){
				document.getElementById("tf_wrapper").style.display = "";
				visible = true;
			}
		}
	};
}());


