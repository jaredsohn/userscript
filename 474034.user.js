// ==UserScript==
// @name           	OsZone AM2 LineHelpeur 2
// @namespace      	http://www.os-zone.com/monkey*
// @description    	Script Utilitaire Line 
// @version    	 	P0.006.03
// @updateURL 		http://www.os-zone.com/monkey/OsZoneAM2linerTool2.tamper.js
// @include        	http://www.airlines-manager.com/*
// @run-at 			document-end
// ==/UserScript==


var myVersion = GM_info.script.version;
function quechif(str){
	var reg1=/[^\d-]/g;
	var chifre=parseInt(str.replace(reg1,''));
	return chifre;
}
function simplifitext(string){
//	var strip_LineFeed =/[\r\n|\r|\n]{2,}/g;
//	destValue = destValue.replace(strip_LineFeed,"\n");
	string = string.replace(/[\r\n|\r|\n]/g, ' ');
	string = string.replace(/\s{2,}/g, ' ');
//	$texte = preg_replace('/[\r\n|\r|\n]{2,}/', ' ', $texte);
//	$texte = preg_replace('/\s{2,}/', ' ', $texte);
	return string;
}

var obj={};
obj.conf={};
obj.staf={};
obj.ligne={};
obj.note={};
obj.colo={};
obj.flote={};


obj.defaultConfig={};
obj.defaultConfig.stafHelp="Yes";
obj.defaultConfig.ouvreanonce="Yes";
obj.defaultConfig.carnetNote="Yes";
obj.defaultConfig.achatLigne="Yes";
obj.defaultConfig.activecolo="Yes";
obj.defaultConfig.newscolo="No";

/* Conf */
obj.conf.saveConfig=function(){
	var info=obj.conf.datas;
	GM_setValue("conf_data", info);
}
obj.conf.showConfig=function(){
	var di=$("#confColo").clone();
	$("#confColo").remove();
	di.find('.d-conf').each(function(){
		var idiv=$(this).attr('id');
		var valmemo=obj.conf.datas[idiv];
		$(this).find('span').each(function(){
			var tval=$(this).text();
			if(tval==valmemo){
				$(this).addClass('choix');
			}
		});
	})
	di.css({
		'position':'absolute',
		'top':0,'left':0,
		'width':'160px',
		'height':'auto'
	}).hover(function(){
		$(".d-conf").stop().fadeTo(0,0,function(){
			$(this).show(300,function(){
				$(this).fadeTo(300,0.99);
			});
		});
	},function(){
		$(".d-conf").stop().fadeTo(300,0,function(){
			$(this).hide(300);
		});	
	}).find(".d-conf span").click(function(){
		var par=$(this).parent()
		var tid=par.attr('id');
		par.find('span').removeClass('choix')
		var val=$(this).text();
		$(this).addClass('choix');
		obj.conf.datas[tid]=val;
		obj.conf.saveConfig();
	})
	
	$('body').prepend(di);
}
/* Fin Conf */

/* Ligne */
obj.ligne.initi=function(){
	var regex = /network\/newLine\/(.*)/gi;
	match = regex.exec(obj.url);
	if(match){
		obj.ligne.HlperChoixAvion(match);
	}else{
	}
}
obj.ligne.HlperChoixAvion=function(match){
	$(".hubListBox").each(function(e){
		var dema=$(this).find('.demand');
		if(dema.find('h4').length > 0){
			var coef1=AircraftConfiguration.coefBus;
			var passTotal=0;
			dema.find('p').each(function(i ){
				var txtBold=$(this).find('.bold').text();
				txtBold = quechif(txtBold);
				if(i==0){
				 passTotal = passTotal + (txtBold * 1);
				}
				if(i==1){
				 passTotal = passTotal + (txtBold * AircraftConfiguration.coefBus);
				}
				if(i==2){
				 passTotal = passTotal + (txtBold * AircraftConfiguration.coefFirst);
				}
			});
			if(passTotal > 0){
				passTotal=Math.round(passTotal);
				var tailAvion=Math.round(passTotal/2);
				//dema.find('h4').append('<b style="color:orange;"> '+ passTotal +'</b>Avion de: <span style="color:orange;">'+ tailAvion +' sieges</span>');
				
				dema.find('h4').html('Demande <span class="notTotalPAX" style="color:orange;"> '+ passTotal +'</span>/j. Avion <span class="notTailleAvion" style="color:orange;">'+ tailAvion +'</span> sieges ')
				dema.prepend('<img class="btAutoNote" src="/images/icons/message_write.png?v1.6.5">');
			}
			
		}
		else{
		}
	});
	$(".btAutoNote").click(function(){
		// clic sur bouton autocreation de note dans ouverture de ligne
		var paren=$(this).closest('.hubListBox');
		var dureeVol=paren.find('.lineTime').html();
		var hub=$('.specialHubBox:first');
		var textHub=hub.find('.hubNameBox').text();
		textHub = simplifitext(textHub);
		var res = textHub.split(" Hub ");
		var nhub= res[1];
		var res2= nhub.split(" ",2);
		nhub= res2[0];
		var TextAeroport=paren.find('.hubNameBox').text();
		TextAeroport = simplifitext(TextAeroport);
		res= TextAeroport.split(" -");
		var codeAero= res[0];
		var avion=$('#aircraftListSelect option:selected').html();
		var aravion=avion.split(" (");
		avion = aravion[0];
		var totPax=paren.find('.notTotalPAX').html();
		var tailAvion=paren.find('.notTailleAvion').html();
		var pricebox=paren.find('.priceBox p').last();
		var cout=pricebox.text();
		var paxx=[];
		paren.find('.demand .bold').each(function(ee){
			var nb= quechif($(this).text())/2;
			paxx[ee]=Math.round(nb);
		})
		var tabPax='<table class="tblPax"><tr><td><img src="/images/icons20/passenger_1-3.png?v1.7" alt="passenger1-3"></td><td>'+paxx[0]+'</td><td><img src="/images/icons20/passenger_2-3.png?v1.7" alt="passenger2-3"></td><td>'+paxx[1]+'</td></tr><tr><td><img src="/images/icons20/passenger_full.png?v1.7" alt="passengerFull"></td><td>'+paxx[2]+'</td><td><img src="/images/icons20/cargo_full.png?v1.7" alt="passengerFull"></td><td>'+paxx[3]+'</td></tr></table>';
		var ob={};
		ob.titre=nhub+ '-' + codeAero + ' PAX:'+totPax;
		ob.texte='<div>Avion : '+ avion + '<br/>Duree Vol '+ dureeVol +'<br/>Avion de '+ tailAvion + ' Sieges '+ tabPax +'Destination :<br/>'+ TextAeroport+'<br/>'+cout +'</div>';
		obj.note.datas.push(ob);
		GM_setValue("note_data",obj.note.datas);
		obj.note.initi();
		
	})
}
obj.flote.initi=function(){
	if(!obj.flote.datas){
		obj.flote.datas={};
		obj.flote.datas.datUD=0;
		obj.flote.datas.avions=[];
	}
	var regex = /aircraft$/gi;
	match = regex.exec(obj.url);
	var regex2 = /aircraft\?page/gi;
	match2 = regex2.exec(obj.url);
	if(match || match2){
		obj.flote.globLect();
	}else{
	}
	
	var regPrincing=/marketing\/pricing\/(.*)/gi;
	match3=regPrincing.exec(obj.url);
	if(match3){
		if(match3[1]==""){
		}else{
			obj.flote.showChoixAv();
		}
	}
};
obj.flote.changSel=function(t){
	var v=t.val();
	if(v !="---"){
		var avion= obj.flote.datas.avions[v];
		
		var txt='<div class="oneAvion" style="background-image:url(../..' + avion.imagesrc + ');"><b>'+avion.type+' / '+ avion.nom+'</b> ('+avion.sieges.econo+'/'+avion.sieges.affaire+'/'+avion.sieges.premiere+')</div>';
		$("#myAvion .txt").append(txt);
		if(obj.conf.datas.ouvreanonce=="Yes"){
			$('#son_1avionAjout')[0].play();
		}	
	}else{
		$("#myAvion .txt").html('');
	}
}
obj.flote.showChoixAv=function(){
	var d = '<div id="myAvion" class="supSelAv"><b>Avion sur la ligne ?</b>&nbsp;&nbsp;<div class="txt"></div></div>';
	$('#marketing_linePricing .box2:eq(0)').prepend(d);
	var selecte='<select id="avSelect" name="avSelect">';
	var option = '<option value="---">Choix Avions</i></option>';
	for ( var i=0, avion=null; avion=obj.flote.datas.avions[i]; i++){
		option += '<option value="'+i+'">(' + avion.type +')-' + avion.nom +'</option>';
	}
	selecte += option + '</select>';
	
	$("#myAvion").append(selecte);
	$("#avSelect").change(function(){
		obj.flote.changSel($(this));
	})
}
obj.flote.idlook=function(num){
	for ( var i=0, avion=null; avion=obj.flote.datas.avions[i]; i++){
		if(num==avion.id){
			return avion.id;
		}
	}
	return false;
}
obj.flote.saveData=function(){
	GM_setValue("flote_data", obj.flote.datas);
}

obj.flote.globLect=function(){
	var chng=0;
	$(".aircraftListBox").each(function(){
		var oAvion={};
		var urlav=$(this).find('.BtnDetailAvion').attr('href');
		var aid=quechif(urlav);
		oAvion.id=aid;
		if(!obj.flote.idlook(aid)){
			chng++;
			var t=$(this);
			var image=t.find('.mini-aircraft').attr('src');
			oAvion.imagesrc=image;
			var siege=t.find('.listBox4 b').text();
			var regex = /\((.*)\/(.*)\/(.*)\)/gi;
			match = regex.exec(siege);
			if(match){
				oAvion.sieges={};
				oAvion.sieges.econo=match[1];
				oAvion.sieges.affaire=match[2];
				oAvion.sieges.premiere=match[3];
			}
			
			var avion=t.find('.title span:first').text();
			avion = simplifitext(avion);
			var regex2 = /(.*)\/(.*)/gi;
			match2 = regex2.exec(avion);
			if(match2){
				oAvion.type=match2[1];
				oAvion.nom=match2[2];
			}else{
				avion=t.find('.title span:eq(1)').text();
				avion = simplifitext(avion);
				match2 = regex2.exec(avion);
				oAvion.type=match2[1];
				oAvion.nom=match2[2];
			}
			obj.flote.datas.avions.push(oAvion);
		}
	});
	if(chng > 0){
		obj.flote.saveData();
	}
}

/* Fin Flote */

/* Note */
obj.note.initi=function(){
	obj.note.showAdd=false;
	if(!obj.note.datas){
		obj.note.datas=[];
	}
	obj.note.divOneNote=$('.oneNote_tmpl').clone();
	obj.note.divOneNote.removeClass('oneNote_tmpl').addClass('oneNote');
	var carnet=$('#carnetNoteSup').clone();
	$('#carnetNoteSup').remove();
	carnet.css({
		'position':'fixed',
		'top':0,'right':0,
		'height':'auto'
	})
	var div=carnet.find('#noteContain');
	div.html('');
	if(obj.note.datas.length > 0){
		for ( var ii=0, ke=null; ke=obj.note.datas[ii]; ii++){
			var di=obj.note.divOneNote.clone();
			di.find('.notTitre').html(ke.titre);
			di.find('.notText').html(ke.texte);
			di.find('.notKey').html(ii);
			div.prepend(di);
		}
		
	}else{
		div.append('<div class="oneNote"><i style="font-size:1.3em;padding:5px">Pas de note</i></div>');
	}

	carnet.hover(function(){
		$(this).find('#noteContain').stop().animate({'height':'450px'},600,function(){
			$(this).css({'overflow':'auto'});
		});
		$(this).stop().animate({'opacity':'0.98'},100);
	},function(){
		$(this).find('#noteContain').stop().animate({'height':'100px'},100,function(){
			$(this).css({'overflow':'hidden'});
		});
		$(this).stop().animate({'opacity':'0.35'},300);
	});

	carnet.find("#creaNote").hover(function(){
		$(this).css({'border-color':'rgba(25,25,25,0.95','background-color':'rgba(150,50,150,0.6)'});
	},function(){
		$(this).css({'border-color':'rgba(25,25,25,0.95','background-color':'rgba(50,50,50,0.3)'});
	}).click(function(){
		obj.note.showNewNote();
	});
	carnet.find('.notTitre').click(function(){
		var elem=$(this).parent().find('.notText');
		if(elem.is(':visible')){
			elem.fadeTo(350,0,function(){
				$(this).hide(200);
			})
		}else{
			elem.fadeTo(0,0,function(){
				$(this).show(350,function(){
					$(this).fadeTo(200,0.99);
				});
			})
		}
	});
	carnet.find('.closeNote').click(function(){
		var id=parseInt($(this).parent().parent().find('.notKey').html());
		obj.note.datas.splice(id, 1);
		GM_setValue("note_data",obj.note.datas);
		obj.note.initi();
	});	
	carnet.find('.notText').css({'display':'none'});
	$('body').prepend(carnet);
}
obj.note.showNewNote=function(){
	if(obj.note.showAdd==true){
		obj.note.showAdd=false;
		
		$('.divTempo').removeClass('shad1').fadeTo(300,0,function(){
			$(this).hide().remove();
		});
	}else{
		obj.note.showAdd=true;
		var diAff=$('#formNoteAdd').clone();
		diAff.fadeTo(0,0).addClass('divTempo');
		$('body').append(diAff);
		$(".divTempo").css({'width':'0','height':'150px','top':'100px','right':'100px'})
		.show(1).fadeTo(100,0.99,function(){
			$(this).addClass('shad1').animate({'width':'320px','right':'220px'},600);
		});
		$('.divTempo').find('form').submit(function(){
			var ob={};
			ob.titre=$(this).find('input[type=text]').val();
			ob.texte=$(this).find('textarea').val();
			$(this).find('input[type=text]').val('');
			$(this).find('textarea').val('');
			obj.note.showNewNote();
			obj.note.datas.push(ob);
			GM_setValue("note_data",obj.note.datas);
			obj.note.initi();
			return false;
		})
	}
}
/* Note */

/* staf */
obj.staf.saveData=function(){
	GM_setValue("staf_data", obj.staf.datas);
}
obj.staf.initi=function(){
	if(obj.conf.datas.stafHelp=="Yes"){
		var nbBonus=$('.staffBonusContainer').length;
		var regex = /staff\/(.*)/gi;
		match = regex.exec(obj.url);
		if(match){
			if(nbBonus > 0){
				obj.staf.datas=[];
				$('.staffBonusContainer').each(function(){
					var t=simplifitext($(this).html());
					obj.staf.datas.push(t);
				});
				obj.staf.saveData();
			}else{
				if(!obj.staf.datas){
					obj.staf.datas='Pas de Donnée memorisé pour le staff, passez par la partie personnel.';
					$(".secretaryHelpBox").append('<div>'+ obj.staf.datas +'</div>');
				}else{
					for (var i=0, div=null; div=obj.staf.datas[i]; i++){
						$(".secretaryHelpBox").append('<div class="divAdd">'+ div +'</div>');
					}
				}
				
			}
		}else{
		}
	}
}
/* staf */

/* Colorisation */
obj.colo.initi=function(){
	// limite du script a la page precise.
	var regex = /finances\/accounting\/statements/gi;
	match = regex.exec(obj.url);
	if(!match){
	 	return;
	}
	// si acces autorisé 
	if(obj.conf.datas.activecolo=="Yes"){
		// si on ne trouve pas de datas dans colo, on recupere couleur defini par serveur.
		if(!obj.colo.couleur || obj.conf.datas.newscolo=="Yes"){
			obj.colo.couleur=couleur;
			obj.colo.saveData();
		}		
		if(!obj.colo.datas){
			obj.colo.datas=[];
		}
		obj.colo.colorise();
	}
	
}
obj.colo.colorise=function(){
	if($('#finance_statements').length > 0){
		$('#finance_statements').prepend('<div id="coloMenu"></div>');
		var tabl=$('#finance_statements').find('table');
		tabl.find('tr').each(function(){
			var txt=$(this).find('td:nth-child(2)').text();
			if(txt!=''){
				var stic=false;
				var memo=0;
				for ( var i=0, t=null; t=obj.colo.datas[i]; i++){
					if(txt==t){
						stic=true;
						memo=i;
					}
				}
				if(!stic){
					obj.colo.datas.push(txt);
					memo=obj.colo.foundIndex(txt);
//					GM_setValue("colo_data",colo.datas);
					obj.colo.saveData();
					
				}
				var indx=memo;
				
			}
		$(this).find('td:nth-child(2)').addClass('colo-'+indx);	
		});
		for(var i=0, textCouleur=null; textCouleur=obj.colo.datas[i]; i++){
			var div='<div class="supColoBt"><div class="ColominiBt colo-'+i+'"></div><div class="coloTxtBt">'+ textCouleur +'</div></div>'
			$('#coloMenu').append(div);
		}
		for (var i=0, colore=null; colore=obj.colo.couleur[i]; i++) {
			var css="linear-gradient(top, rgba(255,255,255,1) 0%, rgba("+ colore +") 74%, rgba(237,237,237,1) 100%)";
			var css2="-webkit-gradient(linear, left top, left bottom, color-stop(rgba(255,255,255,1), 0), color-stop(rgba("+ colore +"), 0.74), color-stop(rgba(237,237,237,1), 1))";
			var css3="-webkit-linear-gradient(top, rgba(255,255,255,1) 0%, rgba("+ colore +") 74%, rgba(237,237,237,1) 100%)";
			var css4="-moz-linear-gradient(top, rgba(255,255,255,1) 0%, rgba("+ colore +") 74%, rgba(237,237,237,1) 100%)";
			var css5="-o-linear-gradient(top, rgba(255,255,255,1) 0%, rgba("+ colore +") 74%, rgba(237,237,237,1) 100%)";
			var $td= $('.colo-'+i);
			$('.colo-'+i).css({'background': ""+css+"" });
			$('.colo-'+i).css({'background': css2 });
			$('.colo-'+i).css({'background': css3 });
			$('.colo-'+i).css({'background': css4 });
			$('.colo-'+i).css({'background': css5 });
//			$td.css({'color':'rgb(255,200,100)'});
			var a=colore.split(',');
			$('.colo-'+i).css({'border-color': 'rgb('+a[0]+','+a[1]+','+a[2]+')' });
		}
	}
	
}
obj.colo.foundIndex=function(txt){
	var stic=false;
	var memo=0;
	for ( var i=0, t=null; t=obj.colo.datas[i]; i++){
		if(txt==t){
			stic=true;
			memo=i;
		}
	}
	if(!stic){
	}
	return memo;
}
obj.colo.saveData=function(){
	if(obj.colo.datas){
		GM_setValue("colo_data", obj.colo.datas);
	}
	if(obj.colo.couleur){
		GM_setValue("colo_couleur", obj.colo.couleur);
	}
}
/* Colorisation */

obj.starte=function(){
	var keys = GM_listValues();
	for (var i=0, key=null; key=keys[i]; i++) {
	  if(key =="ligne_data" || key=="note_data"|| key=="colo_data" || key=="conf_data" || key=="staf_data" || key=="colo_couleur" || key=="flote_data"){
	
	  	if(key =="colo_couleur"){
	  		obj.colo.couleur=GM_getValue(key);
	  	}
	  	if(key =="ligne_data"){
	  		obj.ligne.datas=GM_getValue(key);
	  	}
	  	if(key =="note_data"){
	  		obj.note.datas=GM_getValue(key);
	  	}
	  	if(key =="colo_data"){
	  		obj.colo.datas=GM_getValue(key);
	  	}
	  	if(key =="conf_data"){
	  		obj.conf.datas=GM_getValue(key);
	  	}
	  	if(key =="staf_data"){
	  		obj.staf.datas=GM_getValue(key);
	  	}
	  	if(key =="flote_data"){
	  		obj.flote.datas=GM_getValue(key);
	  	}
	  		
	  }else{
	  	GM_deleteValue(key);
	  }
	}
	if(!obj.conf.datas){
		obj.conf.datas=obj.defaultConfig;
		obj.conf.saveConfig();
	}else{
	}
	// integration des infos exterieurs.
	$('body').prepend('<div id="tmDivColo" style="display:none"><audio preload="auto" id="son"><source src="http://www.os-zone.com/monkey/sons/colo.mp3" type="audio/mp3"><source src="http://www.os-zone.com/monkey/sons/colo.ogg" type="audio/ogg"></audio></div>');
	var ur=atob("aHR0cDovL3d3dy5vcy16b25lLmNvbS9tb25rZXkvcmVjZXB0b3IyLnBocA==");
	GM_xmlhttpRequest({
	  method: "POST",
	  url: ur,
	  data: "css=config",
	  headers: {
	    "Content-Type": "application/x-www-form-urlencoded"
	  },
	  onload: function(response) {
	  		$("#tmDivColo").append(response.responseText);
	  		obj.conf.showConfig();
	  		obj.flote.initi();
	  		obj.staf.initi();
	  		obj.colo.initi();
	  		if(obj.conf.datas.carnetNote=="Yes"){
	  			obj.note.initi();
	  		}
	  		if(obj.conf.datas.achatLigne=="Yes"){
	  			obj.ligne.initi();
	  		}
	  		
	  }
	});
}

$(function(){
	obj.url= document.URL;
	obj.starte();
})

