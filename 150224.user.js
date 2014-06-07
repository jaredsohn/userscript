// ==UserScript==
// @name           mapscanner
// @namespace      http://blogpagliaccio.wordpress.com
// @description    find planet, comets and debris in imperion
// @include        http://*.imperion.*/map*
// @grant GM_registerMenuCommand
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_listValues
// @grant GM_openInTab
// @grant GM_deleteValue
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @require        http://userscripts.org/scripts/source/85398.user.js
// @version 1.6.1
// ==/UserScript==

// +++++++++++++++++++++++++++++++++++++++++++estract data info***********************************************
console.log('start...');
try {
	var user=null;
	var sysid=0;
	lang=GM_getValue('lang');
	if (!lang) {lang='en';GM_setValue('lang','en');}
	var langMess={
		en:[
			'english',
			["","very low","low","medium","higth","very higth"],
			"insert the system id(planet id without last 2 digit)",
			"wait",
			'scan continue but it will incomplete',
			'save data',//5
			'production',
			'name',
			"save name?",
			'this is a code for export data on other pc',
			'data aviable',//10
			'system',
			'comet',
			'resources',
			'comets find',
			'debris find',//15
			'on planet',
			'scan comet from system id',
			'load data comet',
			'find planet',
			'load data planet',//20
			"close"
		],
		it:['italiano',["","molto bassa","bassa","media","alta","molto alta"],"inserire l'id del sistema (l'id dei pianeti senza le ultime 2 cifre)","attendi",'la scansione continua ma sarà incompleta','salva dati','produzione','nome',"nome del salvataggio?",'copia questo codice per esportare i dati in un altro pc','dati disponibili','sistema','cometa','risorse','comete trovate','detriti rilevati','sul pianeta','cerca comete per system id','carica i dati sulle comete','trova pianeti','carica i dati sui pianeti','chiudi']
	};
	var msg=langMess[lang];
	function got(name, value) {
		console.log('got global named', name, 'with value', value);
		user=value.options.id;
		sysid=parseInt(user/100);
		console.log('user value "',user,'" sid value "',sysid,'"');
	}
	read_content_global('planet', got);
	console.log('crate finder');
	function htmlEntities(str) {
    		return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	}

	var finder={
		// init
		k:0,
		b:0,
		production:msg[1],
		preload : new Array(),
		sid:sysid,
		planet:new Array(),
		bonus:new Object(),
		typesort:new Array(),
		flagbar:false,
	// ******************************************estract map info***********
		mapinfo : function () {
			$.ajax({
				url : "/map/index/preload/",
				data : "systemId=" + finder.sid + "&planetId="	+ user,
				type : "post",
				dataType : "json",
				success : function(data) {
					//************data of sistem is on object with tipe==1
					n=0;
					do {
						pr = data[n];
						n++;
					}
					while(pr.type!=1);
					pr = pr.data;
					i=0;
					//************ insert a key of evry planet nearby selected sistem
					for ( var key in pr) {
						finder.preload[i]= key;
						i++;
					}
					finder.findC();
				},
				error : function(e,s,c) {
					alert('error call: '+this.data+' status :'+s);
				}
			});
		},
		menufind : function () {
			//***********@todo translate
			finder.sid=prompt(msg[2],sysid);
			if (finder.sid) finder.mapinfo();
		},
		findC:function () {
			j = 0;
			finder.k=0;
			finder.b=0;
			$('#area2').show();
			$('#close').show();
			$('#close').text(msg[3]);
			for (i = 0; i < finder.preload.length; i++) {
				// search on system
				$.ajax({
					url : "/map/index/system/",
					data : "systemId=" + finder.preload[i] + "&planetId="+ user,
					type : "post",
					dataType : "json",
					success : function(data) {
						//************data of sistem is on object with tipe==1
						n=0;
						do {
							d = data[n];
							n++;
						}
						while(d.type!=1);
						vect=d.data.planets;
						for (var key in vect ) {
							finder.planet[finder.k]=new Array();
							finder.planet[finder.k].id=vect[key].id_planet;
							finder.planet[finder.k].name=vect[key].name;
							finder.planet[finder.k].owner=vect[key].account_name;
							//***insert a production***************
							if (typeof(vect[key].map_info.production) == "undefined") finder.planet[finder.k].prod=0;
							else {
								finder.planet[finder.k].prod=vect[key].map_info.production.box_count;
								finder.planet[finder.k].proddet=vect[key].map_info.production.resources;
							}
							finder.planet[finder.k].bonus=new Array();
							for (a=0;a<5;a++) {
								// find a bonus
								type=vect[key].map_info.bonuses[a].bonusType;
								value=vect[key].map_info.bonuses[a].value;
								caption=vect[key].map_info.bonuses[a].caption;
								finder.planet[finder.k].bonus[type]=value;
								//add bonus to the list if not present
								finder.bonus[type]=caption;
							}
							finder.k++;
						}
						j++;
						if (j >= finder.preload.length) finder.end();
						else {
							// 100:x=preload.length:j
							p=100*j/finder.preload.length;
							$('#area2').html("loading..."+parseInt(p)+"%");
						}
					},
					error : function(e,s,c) {
						alert('error call: '+this.data+' status :'+s+ msg[4]);
						j++;
						if (j >= finder.preload.length) finder.end();
				       		else {
							// 100:x=preload.length:j
							p=100*j/finder.preload.length;
							$('#area2').html("loading..."+parseInt(p)+"%");
						}
					}
				});
			}
		},
		end : function () {
			finder.planet.sort(sortplanet);
			text='';check='';
			text='<button id="save" >'+msg[5]+'</button>'+
			'<div id="bs">order by <button id="all">all</button><button id="production">'+msg[6]+'</button>';
			console.log('typesort',finder.typesort,' bonus ',finder.bonus);
			for (var key in finder.bonus) {
				if (jQuery.inArray(key,finder.typesort)>=0) check='checked="true"';
				else check="";
				text+=' <input '+check+' type="checkbox" id="l'+key+'" value="'+key+'" /><label for="l'+key+'">'+finder.bonus[key]+'</label> ';
			}
			text+='</div>';//<div id="table">';
			text+='<table><tr><th>'+msg[7]+'</th></tr>';
			for (var key in finder.planet) {
				detail='';
				if (finder.planet[key].proddet) {
					totprod=finder.planet[key].proddet.metal*1+finder.planet[key].proddet.crystal*1+finder.planet[key].proddet.tritium*1;
					detail='<span title="M'+finder.planet[key].proddet.metal+' C'+finder.planet[key].proddet.crystal+' T'+finder.planet[key].proddet.tritium+'">('+totprod+')<span>';
				}
				text+='<tr><td><a href="/map/index/index/stage/ORB/targetPlanetId/'+finder.planet[key].id+'" style="color:black;">'+finder.planet[key].name+'('+finder.planet[key].owner+')</a></td><td> '+finder.production[finder.planet[key].prod]+detail+' </td>';
				for (var ke in finder.planet[key].bonus) {
					bon=finder.planet[key].bonus[ke];
					text+='<td>'+finder.bonus[ke]+':<span style="color:'+(bon<0 ? "red" : "green" )+';">'+bon+'%</span></td>';
				}
				text+='</tr>';
			}
			text+='</table>';
			$('#close').html(msg[21]);
			$('#area2').html(text);
			$("#all").click(function() {
				$('#bs input').attr('checked',"");
				finder.typesort=new Array();
				finder.typesort[0]="all";
				finder.end();
			});
			$("#production").click(function() {
				$('#bs input').attr('checked',"");
				finder.typesort=new Array();
				finder.typesort[0]="prod";
				finder.end();
			});
			$("#save").click(function() {
				save='{"bonus":{';
				for (var key in finder.bonus)
					save+='"'+key+'":"'+finder.bonus[key]+'",';
					save=save.substr(0,save.length-1);
					save+='},"planet":[';
					for (var key in finder.planet) {
						save+='{"id":"'+finder.planet[key].id+'","name":"'+htmlEntities(finder.planet[key].name)+'","owner":"'+finder.planet[key].owner+'"'+(finder.planet[key].proddet?',"proddet":{"metal":'+finder.planet[key].proddet.metal+',"crystal":'+finder.planet[key].proddet.crystal+',"tritium":'+finder.planet[key].proddet.tritium+'}':'')+',"prod":"'+finder.planet[key].prod+'","bonus":{';
					for (var ke in finder.planet[key].bonus) {
						bon=finder.planet[key].bonus[ke];
						save+='"'+ke+'":"'+bon+'",';
					}
					save=save.substr(0,save.length-1);
					save+='}},';
				}
				save=save.substr(0,save.length-1);
				save+=']}';
				auto=GM_getValue("autosave",1);
				name=prompt(msg[8],"auto_"+auto);
				if (name=="auto_"+auto) {
					auto++;
					GM_setValue("autosave",auto);
				}
				GM_setValue("planet_save_"+name,save);
				save=msg[9]+'<br/>'+save;
				$('#area2').html(save);
				$('#close').html(msg[21]);
				$('#area2').show();
				$('#close').show();
			});
			$('#bs input[type="checkbox"]').click(function() {
				finder.typesort=new Array();
				check=$('#bs input:checked');
				for(k=0;check.eq(k).val();k++ ) {
					finder.typesort.push(check.eq(k).val());
				}
				finder.end();
			});
		},
		loaddata : function () {
			$('#area2').show();
			$('#close').show();
			saves=GM_listValues();
			h="<div>"+msg[10]+"</div>";
			for(var val in saves)
				if (saves[val].substr(0,12)=="planet_save_")
					h+='<div><a href="#" style="color:black;" id="'+saves[val]+'">'+saves[val]+'</a><a  href="#" style="color:black;" id="del'+saves[val]+'">[x]</a></div>';
			h+='<h3>or parse data</h3><textarea id="pdata"></textarea><button id="parsep">parse</button>';
			$('#area2').html(h);
			$('#parsep').click(function (){
				try {
					data=jQuery.parseJSON($("#pdata").val());
				}
				catch(e) {
					alert(e);
				}
				finder.planet=data.planet;
				finder.bonus=data.bonus;
				finder.end();
			});
			for(var val in saves)
				if (saves[val].substr(0,12)=="planet_save_") {
					$('#'+saves[val]).click(function() {
						$('#area2').html(msg[3]);
						finder.doload(this.id);
					});
					$('#del'+saves[val]).click(function() {
						GM_deleteValue(this.id.substr(3));
						finder.loaddata();
					});
				}
		},
		doload : function (id) {
			data=jQuery.parseJSON(GM_getValue(id));
			finder.planet=data.planet;
			finder.bonus=data.bonus;
			console.log('data ',data);
			finder.end();
		}
	};
	finder.typesort[0]="all";
	console.log('creo scan');
	var scan={
		sid : sysid,
		max : {id:0,val:0},
		preload:new Array(),
		j:0,
		comet:new Array(),
		debris:new Array(),
		menuscan : function () {
			scan.sid=prompt(msg[2],sysid);
			scan.max.id=0;
			scan.max.val=0;
			if (scan.sid) scan.mapinfo();
		},
		mapinfo : function () {
			$.ajax({
				url : "/map/index/preload/",
				data : "systemId=" + scan.sid + "&planetId="	+ user,
				type : "post",
				dataType : "json",
				success : function(data) {
					//************data of sistem is on object with tipe==1
					n=0;
					do {
						pr = data[n];
						n++;
					}
					while(pr.type!=1);
					pr = pr.data;
					i=0;
					//************ insert a key of evry planet nearby selected sistem
					for ( var key in pr) {
						scan.preload[i]= key;
						i++;
					}
					scan.scan();
				},
				error : function(e,s,c) {
					alert('call: '+this.data+' status :'+s);
				}
			});
		},
		scan : function() {
			scan.j = 0;
			$('#area_comet').show();
			$('#area_comet').html("loading...");
			$('#close_comet').show();
			$('#close_comet').text(msg[3]);
			for (i = 0; i < scan.preload.length; i++) {
				$.ajax({
					url : "/map/index/system/",
		  			data : "systemId=" + scan.preload[i] + "&planetId="+ user,
		  			type : "post",
		  			dataType : "json",
					success : function(data) {
						if ((typeof (data[0].data.comets) != 'undefined') && (data[0].data.comets != '')) {
							text = '['+msg[11]+':' + data[0].data.id_system + " ";
							for ( var key in data[0].data.comets) {
								text += '<a href="/map/index/index/stage/ORB/targetCometId/'+key+'01" target="_blanc" style="color:black;text-decoration: underline;">'+msg[12]+':' + key+"</a>";
								value = data[0].data.comets[key];
								tot = value.crystal * 1 + value.metal * 1+ value.tritium * 1;
								temp= new Object;
								temp.sysid=data[0].data.id_system;
								temp.id=key;
								temp.totres=tot;
								temp.res=new Array();
								temp.res=[value.metal,value.crystal,value.tritium];
								scan.comet.push(temp);
								if (scan.max.val<tot) {
									scan.max.id=key;
									scan.max.val=tot;
								}
								text += ' '+msg[13]+':<span style="color:blue;" title="m '+value.metal+' - c '+value.crystal+' - t '+value.tritium+'">' + tot + "</span> ";
							}
							// preload.length : j = 100 : perc
							perc=parseInt(scan.j*100/scan.preload.length);
							$('#area_comet').html('loading...'+perc+'%');
						}
						for(var key in data[0].data.planets)
						{
							if (typeof(data[0].data.planets[key].debris) != 'undefined') {
								value=data[0].data.planets[key].debris;
								temp= new Object;
								temp.planetId=key;
								temp.res=new Array();
								temp.res=[value.metal,value.crystal,value.tritium];
								temp.tot=value.crystal * 1 + value.metal * 1+ value.tritium * 1;
								scan.debris.push(temp);
							}
						}
						scan.j++;
						if (scan.j >= scan.preload.length) scan.end();
					},
					error : function(e,s,c) {
						alert('call: '+this.data+' status :'+s+' '+msg[4]);
						scan.j++;
						if (scan.j >= scan.preload.length) scan.end();
					}
				});
			}
	 	},
		end : function() {
			text='<button id="savelink">save data</button>'+msg[14]+': ['+msg[11]+':' + scan.comet[0].sysid + " ";
			prev=scan.comet[0].sysid;
			for(var key in scan.comet) {
				id=scan.comet[key].id;
				m=scan.comet[key].res[0];
				c=scan.comet[key].res[1];
				t=scan.comet[key].res[2];
				if (prev!=scan.comet[key].sysid) text += '] ['+msg[11]+':' + scan.comet[key].sysid + " ";
				if (scan.max.id==id) color='style="color:green;"'; else color="";
				text += msg[12]+':<a '+color+' href="/map/index/index/stage/ORB/targetCometId/'+id+'" target="_blanc" style="color:black;text-decoration: underline;">' + id+'</a> risorse:<span style="color:blue;" title="m '+m+' - c '+c+' - t '+t+'">' + scan.comet[key].totres + "</span>";
			}
			text+='<div>'+msg[15]+'</div>';
			for(var key in scan.debris) {
				value=scan.debris[key];
				text+=' '+msg[16]+':<a  target="_blanc" style="color:black;text-decoration: underline;" href="/map/index/index/stage/ORB/targetPlanetId/'+value.planetId+'">'+value.planetId+'</a> '+msg[13]+':<span style="color:blue;" title="m '+value.res[0]+' c '+value.res[1]+' t '+value.res[2]+'">'+value.tot+'</span> ';
			}
			$('#area_comet').html(text);
			$('#close_comet').html(msg[21]);
			$("#savelink").click(function() {
				save='{"comet":[';
				for (var key in scan.comet) {
					save+='{"id":'+scan.comet[key].id+',"totres":'+scan.comet[key].totres+',"res":['+scan.comet[key].res[0]+','+scan.comet[key].res[1]+','+scan.comet[key].res[2]+'],"sysid":'+scan.comet[key].sysid+'},';
				}
				save=save.substr(0,save.length-1);
				save+='],"debris":[';
				for (var key in scan.debris) {
					save+='{"planetId":'+scan.debris[key].planetId+',"tot":'+scan.debris[key].tot+',"res":['+scan.debris[key].res[0]+','+scan.debris[key].res[1]+','+scan.debris[key].res[2]+']},';
				}
				save=save.substr(0,save.length-1);
				save+=']}';
				auto=GM_getValue("autosave",1);
				name=prompt(msg[8],"auto_"+auto);
				if (name=="auto_"+auto) {
					auto++;
					GM_setValue("autosave",auto);
				}
				GM_setValue("comet_save_"+name,save);
				save=msg[9]+'<br/>'+save;
				$('#area_comet').html(save);
				$('#close_comet').html(msg[21]);
				$('#area_comet').show();
				$('#close_comet').show();
			});
		},
		loaddata_comet : function () {
			$('#area_comet').show();
			$('#close_comet').show();
			saves=GM_listValues();
			h="<div>"+msg[10]+"</div>";
			for(var val in saves)
				if (saves[val].substr(0,11)=="comet_save_")
					h+='<div><a href="#" style="color:black;" id="'+saves[val]+'">'+saves[val]+'</a><a  href="#" style="color:black;" id="del'+saves[val]+'">[x]</a></div>';
			h+='<h3>or parse data</h3><textarea id="cdata"></textarea><button id="parsec">parse</button>';
			$('#area_comet').html(h);
			$('#parsec').click(function (){
				try {
					data=jQuery.parseJSON($("#cdata").val());
				}
				catch(e) {
					alert(e);
				}
				scan.comet=data;
				scan.max.id=scan.comet[0].maxid;
				scan.end();
			});
			for(var val in saves){
				if (saves[val].substr(0,11)=="comet_save_") {
					$('#'+saves[val]).click(function() {
					console.log(scan);
						scan.doload(this.id);
					});
					$('#del'+saves[val]).click(function() {
						GM_deleteValue(this.id.substr(3));
						scan.loaddata_comet();
					});
				}
			}
		},
		doload : function (id) {
			data=jQuery.parseJSON(GM_getValue(id));
			scan.comet=data.comet;
			scan.debris=data.debris;
			scan.end();
		}
	};
//interface
//comet
	console.log('creo i bottoni');
//buttons
	$('body').append('<div style="top: 5px; left: 5px; position: absolute; z-index: 1001;"><button id="scan">'+msg[17]+'</button> <button id="load_comet">'+msg[18]+'</button> <button id="find" >'+msg[19]+'</button> <button id="load" >'+msg[20]+'</button></div>');
	$('#scan').click(scan.menuscan);
	$('#load_comet').click(scan.loaddata_comet);
	$("#Imperion-Template-InterfaceMapShowLegend").click(function (){scan.sid=sysid;scan.mapinfo();});
//text area
	$('body').append('<div id="area_comet" style="display:none;top: 800px; left: 250px; width: 800px; border: 1px solid black; height: 150px; position: absolute; z-index: 1000; overflow: auto; background: none repeat scroll 0% 0% white;"></div>');
	$('#close_comet').click(function() {
		$('#area_comet').hide();
		$('#close_comet').hide();
	});
//planet
// create windows on display planet
	$('body').append('<div id="area2" style="display:none;top: 100px; left: 250; width: 800px; border: 1px solid black; height: 500px; position: absolute; z-index: 1000; overflow: auto; background: none repeat scroll 0% 0% white;">'+msg[3]+'</div>');
	$('body').append('<button id="close" style="display:none;top: 80px; left: 750px; position: absolute; z-index: 1001;">'+msg[3]+'</button>');
	$('#close').click(function() {
		$('#area2').hide();
		$('#close').hide();
	});
	$('#find').click(finder.menufind);
	$('#load').click(finder.loaddata);
	console.log('bottoni creati');
	function sortplanet(a,b) {
		if (finder.typesort.length==1) {
			switch (finder.typesort[0]) {
				case "all": maxa=0;
					for (var key in a.bonus) {
						maxa=maxa*1+parseInt(a.bonus[key]);
					}
					maxb=0;
					for (var key in b.bonus) {
						maxb=maxb*1+parseInt(b.bonus[key]);
					}
					r=maxb-maxa;
				break;
				case "prod" :
					r=b.prod-a.prod;
				break;
				default : if (typeof(b.bonus[finder.typesort[0]]) == "undefined") b2=-100; else b2=Math.abs(b.bonus[finder.typesort[0]]);
					if (typeof(a.bonus[finder.typesort[0]]) == "undefined") a2=-100; else a2=Math.abs(a.bonus[finder.typesort[0]]);
					r=b2-a2;
				break;
			}
		}
		else {
			a2=0;
			b2=0;
			for (var k in finder.typesort) {
				if (typeof(b.bonus[finder.typesort[k]]) == "undefined") b2-=100;
				else {
					if ((finder.typesort[k]=="buildingEnergyConsumption")||(finder.typesort[k]==9)||(finder.typesort[k]==12))
						b2-=b.bonus[finder.typesort[k]];
					else
						b2+=b.bonus[finder.typesort[k]];
				}
				if (typeof(a.bonus[finder.typesort[k]]) == "undefined") a2-=100;
				else {
					if ((finder.typesort[k]=="buildingEnergyConsumption")||(finder.typesort[k]==9)||(finder.typesort[k]==12))
						a2-=a.bonus[finder.typesort[k]];
					else a2+=a.bonus[finder.typesort[k]];
				}
			}
			r=b2-a2;
		}
		return r;
	}
	for (k in langMess)
		GM_registerMenuCommand(langMess[k][0],function(){GM_setValue('lang',k);});
}
catch(e) {
	alert(e);
}
