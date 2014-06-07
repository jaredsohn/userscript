// ==UserScript==
// @name           Fr grepolis CR Editor
// @namespace      http://nation-hoplite.xooit.fr/index.php
// @description    Convertisseur de rapport de combat pour Grepolis
// @author         Alvino & Randalph
// @include        http://*.grepolis.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://buzzy.260mb.com/AutoUpdater.js
// @version 1.12
// ==/UserScript==

if(location.href.match(/action=view/)) {

   //jquery
   var uW;
   if(typeof unsafeWindow==='object'){uW=unsafeWindow;}else{uW=window;}
   var $=uW.jQuery;

   var auhOutput='';
   var aulOutput='';
   var duhOutput='';
   var dulOutput='';
   var resourcesOutput="";
   var compactresourcesOutput="";
   var text1="";
   var text2="";
   var compact01="";
   var compact02="";
   var hidden_text1="";
   var hidden_text2="";
   var imageURL = 'http://' + location.href.split('/')[2] + '/images/game/units/';
   var img_url='http://' + location.href.split('/')[2] + '/images/game';
   var img_moral=img_url+'/place/simulator/morale.png';
   var img_chance=img_url+'/place/simulator/luck.png';
   var img_bois=img_url+'/res/wood.png';
   var img_marbre=img_url+'/res/stone.png';
   var img_piece=img_url+'/res/iron.png';
   var img_wall=img_url+'/place/simulator/wall_level.png';
   var fight_bonus_chance="";
   var fight_bonus_morale="";
   var fight_bonus_rempart="";
   var townName = new Array();
   var townOwner = new Array();
   var townOwnerAlly = new Array();
   var hide_village=false;
   var hide_troop=false;
   var vainqueur="";
   var titre = create_rc_title();
   var power;
   var compact_attack="";
	var compact_def="";
	var tab_pop=new Array();
	//creation du tableau des cout
	tab_pop["militia"]=0;
	tab_pop["sword"]=1;
	tab_pop["slinger"]=1;
	tab_pop["archer"]=1;
	tab_pop["hoplite"]=1;
	tab_pop["rider"]=3;
	tab_pop["chariot"]=4;
	tab_pop["catapult"]=15;
	tab_pop["big_transporter"]=7;
	tab_pop["bireme"]=8;
	tab_pop["attack_ship"]=10;
	tab_pop["demolition_ship"]=8;
	tab_pop["small_transporter"]=5;
	tab_pop["trireme"]=16;
	tab_pop["colonize_ship"]=170;
	tab_pop["minotaur"]=30;
	tab_pop[" manticore"]=45;
	tab_pop["zyklop"]=40;
	tab_pop["sea_monster"]=50;
	tab_pop["harpy"]=14;
	tab_pop["medusa"]=18;
	tab_pop["centaur"]=12;
	tab_pop["pegasus"]=20;

   for(var c = 0; c < document.getElementsByTagName('div').length; c++) {
     if (document.getElementsByTagName('div')[c].getAttribute('class')=='report_units_overview') {
       var ReportFormat=document.getElementsByTagName('div')[c];
       break;
     }
   }

   if (ReportFormat) {
      var ReportArea =document.createElement("textarea");
      var mini_report_area=document.createElement("textarea");
      var zone_div=document.createElement("div");
      var zone_button=document.createElement("div");
      var elem1 = document.createElement("input");
      var elem2 = document.createElement("input");
      var elem3= document.createElement("input");
      var elem4= document.createElement("input");
      var petite_div1=document.createElement("div");
      var petite_div2=document.createElement("div");
      var petite_div3=document.createElement("div");
      var petite_div4=document.createElement("div");
      var texte1 = document.createTextNode("Forum Interne");
      var texte2 = document.createTextNode("Forum Externe");
      var texte3 = document.createTextNode("Masquer les troupes");
      var texte4 = document.createTextNode("Masquer le village");
      elem1.type = "radio";
      elem2.type = "radio";
      elem3.type="checkbox";
      elem4.type="checkbox";
      elem1.setAttribute('class', 'type_forum');
      elem1.setAttribute('id', 'interne');
      elem2.setAttribute('class', 'type_forum');
      elem2.setAttribute('id', 'externe');
      elem3.setAttribute('id', 'masquer');
      elem1.setAttribute('name', 'type_forum');
      elem2.setAttribute('name', 'type_forum');
      elem2.setAttribute('checked', 'checked');
      elem4.setAttribute('id', 'masquer_village');
      petite_div1.setAttribute('style', 'width:150px; height:25px;float:left;');
      petite_div2.setAttribute('style', 'width:150px; height:25px;float:left;');
      petite_div3.setAttribute('style', 'width:200px; height:25px;float:left;');
      petite_div4.setAttribute('style', 'width:200px; height:25px;float:left;');
      elem1.addEventListener("click",function(){ document.getElementById('ReportTextArea').innerHTML=text1; document.getElementById('mini_report_area').innerHTML=compact01;}, false);
      elem2.addEventListener("click",function(){document.getElementById('ReportTextArea').innerHTML =text2;document.getElementById('mini_report_area').innerHTML=compact02;}, false);
      elem3.addEventListener("click",function(){ if(document.getElementById('masquer').checked){hide_troop=true;}else{hide_troop=false;}create_rc(); if(document.getElementById('interne').checked){document.getElementById('ReportTextArea').innerHTML=text1;}else if(document.getElementById('externe').checked){document.getElementById('ReportTextArea').innerHTML=text2;} }, false);
      elem4.addEventListener("click",function(){ if( document.getElementById('masquer_village').checked){hide_village=true;}else{hide_village=false;}create_rc();if(document.getElementById('interne').checked){document.getElementById('ReportTextArea').innerHTML=text1;}else if(document.getElementById('externe').checked){document.getElementById('ReportTextArea').innerHTML=text2;}},false);
      ReportArea.setAttribute('onclick', 'this.select()');
      mini_report_area.setAttribute('onclick', 'this.select()');
      zone_div.setAttribute('style', 'z-index: 1; position: absolute; top: 100px; left: 1px; display:none; border:0px; width:745px; height:250px;background:#ffeec7');
      ReportArea.setAttribute('style', 'border:solid black 2px; width:741px; height:100px;display:block;');
      mini_report_area.setAttribute('style', 'border:solid black 2px; width:741px; height:100px;display:block; margin-top:5px;');
      zone_button.setAttribute('style', 'border:0px; width:745px; height:30px;border-top:solid black 2px;margin-top:2px; border-bottom:solid black 2px;');
      zone_div.setAttribute('id', 'zone_div');
      zone_button.setAttribute('id', 'zone_button');
      ReportArea.setAttribute('id', 'ReportTextArea');
      mini_report_area.setAttribute('id', 'mini_report_area');
      petite_div1.appendChild(elem1);
      petite_div1.appendChild(texte1);
      petite_div2.appendChild(elem2);
      petite_div2.appendChild(texte2);
      petite_div3.appendChild(elem3);
      petite_div3.appendChild(texte3);
      petite_div4.appendChild(elem4);
      petite_div4.appendChild(texte4);
      zone_button.appendChild(petite_div2);
      zone_button.appendChild(petite_div1);
      zone_button.appendChild(petite_div3);
      zone_button.appendChild(petite_div4);
      zone_div.appendChild(zone_button);
      zone_div.appendChild(ReportArea);
      zone_div.appendChild(mini_report_area);
      ReportFormat.appendChild(zone_div);
   }
   create_menu();

   if (document.getElementById('report_booty_bonus_fight')) {
       var reportBBF = document.getElementById('report_booty_bonus_fight');
       for(var c = 0; c < reportBBF.getElementsByTagName('span').length; c++)
       {   if (reportBBF.getElementsByTagName('span')[c].getAttribute('class')=='fight_bonus morale') {
              var morale = trim(reportBBF.getElementsByTagName('span')[c].innerHTML.split("</span>")[1]);
              if (typeof morale != 'undefined') {fight_bonus_morale='[img]'+img_moral+'[/img] '+morale;}
            }
            else if (reportBBF.getElementsByTagName('span')[c].getAttribute('class')=='fight_bonus luck') {
              var luck = trim(reportBBF.getElementsByTagName('span')[c].innerHTML.split("</span>")[1]);
              if (typeof luck != 'undefined') {fight_bonus_chance='[img]'+img_chance+'[/img] '+luck;}
            }
           else if ((reportBBF.getElementsByTagName('span')[c].getAttribute('class')=='fight_bonus oldwall')) {
              var oldwall = trim(reportBBF.getElementsByTagName('span')[c].innerHTML.split("</span>")[1]);
              if (typeof oldwall != 'undefined'){
                 var wall_def=oldwall.split(':')[1];
               fight_bonus_rempart='[img]'+img_wall+'[/img]'+wall_def;
              }
            }
    }
   var fight_bonus = "[b]Ce jour-ci les dieux leur octroyèrent :[/b]\n\n"+fight_bonus+" ";
   if(fight_bonus_rempart==""){fight_bonus_rempart='[img]'+img_wall+'[/img][color=#ff0000](-0)[/color]';}
  }

  if (document.getElementById('resources')) {
   var resources = document.getElementById('resources');
    for(var c = 0; c < resources.getElementsByTagName('div').length; c++) {
      if (resources.getElementsByTagName('div')[c].getAttribute('class')=='wood_img') {
        var wood = resources.getElementsByTagName('div')[c].parentNode.getElementsByTagName('span')[0].innerHTML;
      }
      if (resources.getElementsByTagName('div')[c].getAttribute('class')=='stone_img') {
        var stone = resources.getElementsByTagName('div')[c].parentNode.getElementsByTagName('span')[0].innerHTML;
      }
      if (resources.getElementsByTagName('div')[c].getAttribute('class')=='iron_img') {
        var iron = resources.getElementsByTagName('div')[c].parentNode.getElementsByTagName('span')[0].innerHTML;
      }
    }
    if (document.getElementById('load')) {
      var load = document.getElementById('load').innerHTML;
      resourcesOutput+="\n[b] [color=#990000] "+load+"[/color][/b]\n\n";
     // compactresourcesOutput+="[b] [color=#990000] "+load+"[/color][/b]";
    }
    if (wood)
    {	resourcesOutput+="[img]"+img_bois+"[/img] "+"Bois: "+wood+"\n";
    	compactresourcesOutput+="[img]"+img_bois+"[/img] "+"Bois: "+wood;
    }
    if (stone)
    {	resourcesOutput+="[img]"+img_marbre+"[/img] "+"Marbre: "+stone+"\n";
    	compactresourcesOutput+="[img]"+img_marbre+"[/img] "+"Marbre: "+stone;
    }
    if (iron)
    {	resourcesOutput+="[img]"+img_piece+"[/img] "+"Pièces d'argent: "+iron+" ";
    	compactresourcesOutput+="[img]"+img_piece+"[/img] "+"Pièces d'argent: "+iron;
    }
  }

for(var c = 0; c < document.getElementsByTagName('script').length; c++)
{	if (document.getElementsByTagName('script')[c].innerHTML.match(/ReportViewer.initialize/))
	{	var ReportObj = document.getElementsByTagName('script')[c].innerHTML.split('ReportViewer.initialize(')[1].split(')')[0];

		if (typeof object2String(JSON.parse(ReportObj).result.att_units)  != 'undefined')
		{	var attUnits = object2String(JSON.parse(ReportObj).result.att_units);

        	if (attUnits.match("had:{"))
        	{	var attUnitsHad = attUnits.split("had:{")[1].split('},')[0].split(',');
         		var nameUnitAttck=new Array();
         		var init_att=new Array();
         		var troop_name_att=new Array();
				var tab_attack=new Array();
				var tab_attack_lost=new Array();

         		if (attUnitsHad)
         		{	for(var auh = 0; auh < attUnitsHad.length; auh++)
         			{	auhImage = '[img]'+imageURL+attUnitsHad[auh].split(':')[0]+'_40x40.png[/img]';
		               nameUnitAttck[attUnitsHad[auh].split(':')[0]]=0;
		               troop_name_att.push(attUnitsHad[auh].split(':')[0]);
		               auhUnits = attUnitsHad[auh].split(':')[1];
		               init_att[attUnitsHad[auh].split(':')[0]]=auhUnits;
		               tab_attack[auhImage]=auhUnits;
		               auhOutput = auhOutput+auhImage+' '+auhUnits+' ';
            		}
         		}
        	}

			if (attUnits.match("lost:{"))
			{	var attUnitsLost =new Array();
           		var tmp_att=attUnits.split("lost:{");
         		for(var k=1;k<tmp_att.length;k++)
           		{	var tmp_var=tmp_att[k].split('}')[0].split(',');
            		for( var l=0;l<tmp_var.length;l++)
            		{   var unitLost=tmp_var[l].split(':');
               			attUnitsLost.push(unitLost[0]);
               			nameUnitAttck[unitLost[0]]=parseInt(nameUnitAttck[unitLost[0]])+parseInt(unitLost[1]);

            		}
           		}

         		if (attUnitsLost)
         		{	for(var aul = 0; aul < attUnitsLost.length; aul++)
            		{	aulImage = '[img]'+imageURL+attUnitsLost[aul].split(':')[0]+'_40x40.png[/img]';
               			tab_attack_lost[aulImage]=nameUnitAttck[attUnitsLost[aul].split(':')[0]];
               			aulOutput = aulOutput+aulImage+' '+nameUnitAttck[attUnitsLost[aul].split(':')[0]]+' ';
            		}
         		} else {aulOutput = 'Aucune perte ';}
        	}else aulOutput = 'Aucune perte ';
      	} else {auhOutput = 'Aucune Troupe ';}

      if (typeof object2String(JSON.parse(ReportObj).result.def_units)  != 'undefined') {
        var def_units = object2String(JSON.parse(ReportObj).result.def_units);
        var tab_def=new Array();
        var tab_def_lost=new Array();
        if (def_units.match("had:{")) {
             var defUnitsHad = def_units.split("had:{")[1].split('},')[0].split(',');
             var nameUnitdef=new Array();
         	if (defUnitsHad) {
	            for(var duh = 0; duh < defUnitsHad.length; duh++) {
	               duhImage = '[img]'+imageURL+defUnitsHad[duh].split(':')[0]+'_40x40.png[/img]';
	               nameUnitdef[defUnitsHad[duh].split(':')[0]]=0;
	               duhUnits = defUnitsHad[duh].split(':')[1];
	               tab_def[duhImage]=duhUnits;
	               duhOutput = duhOutput+duhImage+' '+duhUnits+' ';
	            }
        	 }
        }else duhOutput = 'Aucune Troupe ';

        if (def_units.match("lost:{")) {
          var defUnitsLost = new Array();
         var tmp_def=def_units.split("lost:{");
         for(var m=1;m<tmp_def.length;m++)
           {   var tmp_var2=tmp_def[m].split('}')[0].split(',');
            for( var n=0;n<tmp_var2.length;n++)
            {   var unitLost2=tmp_var2[n].split(':');
               defUnitsLost.push(unitLost2[0]);
               nameUnitdef[unitLost2[0]]=parseInt(nameUnitdef[unitLost2[0]])+parseInt(unitLost2[1]);
            }
           }
         if (defUnitsLost) {
           for(var dul = 0; dul < defUnitsLost.length; dul++) {
             dulImage = '[img]'+imageURL+defUnitsLost[dul].split(':')[0]+'_40x40.png[/img]';
             tab_def_lost[dulImage]=nameUnitdef[defUnitsLost[dul].split(':')[0]];
			 dulOutput = dulOutput+dulImage+' '+nameUnitdef[defUnitsLost[dul].split(':')[0]]+' ';
			}
         } else dulOutput = 'Aucune perte ';
        }else dulOutput = 'Aucune perte ';
      } else duhOutput = 'Aucune Troupe ';

      if (document.getElementById('ReportTextArea'))
      {	create_rc();
      	create_compact_rc();

      }
      break;
    }
  }
}

//autoUpdate (75073, "1.12");

function trim (zeichenkette) {  return zeichenkette.replace (/^\s+/, '').replace (/\s+$/, '');}
function object2String(obj) {
    var val, output = "";
    if (obj) {
        output += "{";
        for (var i in obj) {
            val = obj[i];
            switch (typeof val) {
                case ("object"):
                    if (val[0]) {
                        output += i + ":" + array2String(val) + ",";
                    } else {
                        output += i + ":" + object2String(val) + ",";
                    }
                    break;
                case ("string"):
                    output += i + ":'" + escape(val) + "',";
                    break;
                default:
                    output += i + ":" + val + ",";
            }
        }
        output = output.substring(0, output.length-1) + "}";
    }
    return output;
}
/*
function readData(Obj,method) {
    myData = JSON.parse(ReportObj, function (key, value) {
        var type;
        if (value && typeof value === 'object') {
            type = value.type;
            if (typeof type === 'string' && typeof window[type] === 'function') {
                return new (window[type])(value);
            }
        }
        if (key==method) rdOutput = value;
    });
    return rdOutput;
}*/
/**********************************************************************************************************************************/
(function () {

   var uW;
   if (typeof unsafeWindow === 'object'){
      uW = unsafeWindow;
   } else {
      uW = window;
   }

   //get jQuery
   var $ = uW.jQuery;

   //add a console function
   var l = function (msg)
   {
      try {
         if ( typeof GM_log !== 'undefined' )
            GM_log( msg );
         else
         {
            if (  typeof opera.postError !== 'undefined' )
               opera.postError( msg );
            else
               uW.console.log(msg);
         }
      }
      catch (e) {};
   }

   var rv = uW.ReportViewer;

   function skipIt()
   {
      try
      {
         // Because of some hard coded delays a real "fast forward" is not possible. So skip it all.

         // Needed??
         rv.conf.delay_after_intro= 0;
         rv.conf.delay_animate = 0;
         rv.conf.delay_next_round= 0;
         rv.conf.duration_fade_frame= 0;
         rv.conf.duration_fade_units= 0;

         // Needed??
         rv.animateUnit   = function() {};
         rv.animateDef   = function() {};
         rv.animateAtt   = function() {};


         rv.reset();
         rv.elm.report_modern.hide();
         rv.elm.report_classic.show();
         l("Skipped.");
      }
      catch ( err )
      {
         l( "Skip failed "+err );
      }
   }


   if (rv)
   {
      if ( rv.data && rv.elm.report_classic )
      {
         // Initialisation already executed.
         l("Direct Skip");
         skipIt();
      }
      else
      {
         var oldInit = uW.ReportViewer.initialize;
         uW.ReportViewer.initialize = function()
         {
            var r;
            try
            {
               r = oldInit.apply(this,arguments);
            }
            catch ( err )
            {
               l("Init Failed "+err );
               throw err;
            }
            finally
            {
               skipIt();
            }
            return r;
         }
      }
   }
   else
      l("No animated Report");

   // TODO: Add Button to re-play animation.


}());

function create_menu(){
   for(var c = 0; c < document.getElementsByTagName('div').length; c++) {
       if (document.getElementsByTagName('div')[c].getAttribute('class')=='menu_inner') {
         var MenuInner=document.getElementsByTagName('div')[c];
         break;
       }
     }
  if (document.getElementById('ReportTextArea')) {
    var MenuLI = MenuInner.getElementsByTagName('ul').length-1;
    var BerichtMenue = document.createElement("div");
    BerichtMenue.setAttribute('style', 'float:left;');
    BerichtMenue.addEventListener("click",function(){if(document.getElementById("zone_div").style.display=="block"){document.getElementById("zone_div").style.display="none";}else{document.getElementById("zone_div").style.display="block";} }, false);
    BerichtMenue.innerHTML='<a href="#" class="submenu_link"><span class="left"><span class="right"><span class="middle">Convertir</span></span></span></a>';
    MenuInner.getElementsByTagName('ul')[MenuLI].insertBefore(BerichtMenue, MenuLI.nextSibling);
  }
 }

//.getAttribute(\'display\',false)==\'block\'){alert(\'ffffffff\');document.getElementById(\'zone_div\').style.display=\'none\'}else{alert(\'rrrr\');document.getElementById(\'zone_div\').style.display=\'block\';}
function create_rc_title(){
   for(var c = 0; c < document.getElementsByTagName('li').length; c++) {
       if (document.getElementsByTagName('li')[c].getAttribute('class')=='town_name') {
      if (document.getElementsByTagName('li')[c].innerHTML.match("<a")) townName.push(document.getElementsByTagName('li')[c].innerHTML.split(">")[1].split("<")[0]);
       }
       if (document.getElementsByTagName('li')[c].getAttribute('class')=='town_owner') {
         if (document.getElementsByTagName('li')[c].innerHTML.match(">")) townOwner.push(document.getElementsByTagName('li')[c].innerHTML.split(">")[1].split("<")[0]);
       }
       if (document.getElementsByTagName('li')[c].getAttribute('class')=='town_owner_ally') {
         if (document.getElementsByTagName('li')[c].innerHTML.match(">")) townOwnerAlly.push(document.getElementsByTagName('li')[c].innerHTML.split(">")[1].split("<")[0]);
       }
     }

   if(typeof townOwner[0]=='undefined'){townOwner[0]='Ville Fantôme';}
   else if(typeof townOwner[1]=='undefined'){townOwner[1]='Ville Fantôme';}

   return "Rapport de combat entre les seigneurs: [color=#990000]"+townOwner[0]+"[/color] et [color=#0033ff]"+townOwner[1]+"[/color]";
}

function create_compact_rc()
{	power="";
	search_victorious();
	create_compact_troup();
	search_god_power();

	var compact_txt="";
	compact_txt+="[b]Le seigneur [color=#990000]"+townOwner[0]+"[/color] mena ses troupes: [/b]\n"+compact_attack+"\n\n";
    if(townOwner[1]=='Ville Fantôme'){   compact_txt+="[b]Contre la [color=#0033ff]"+townOwner[1]+"[/color] [/b]\n"+compact_def+"\n\n";}
    else{compact_txt+="[b]Contre le seigneur [color=#0033ff]"+townOwner[1]+"[/color] [/b]\n"+compact_def+"\n\n";}
	if(power==""){compact_txt+=fight_bonus_morale+" "+fight_bonus_chance+ " rempart:" +fight_bonus_rempart+"\n\n";}
	else{compact_txt+=power+"\n"+fight_bonus_morale+" "+fight_bonus_chance+ " rempart:" +fight_bonus_rempart+"\n\n";}

	if(resourcesOutput!=""){ compact_txt+="[b]Les attaquants pillèrent :[/b]\n"+compactresourcesOutput+"\n"; }
   	else{compact_txt+="Aucune ressources pillées\n";}
   	if(vainqueur==townOwner[0]){  compact_txt+="[b]Vainqueur du combat: [color=#990000]"+vainqueur+"[/color][/b]\n\n";	}
   	else{  compact_txt+="[b]Vainqueur du combat: [color=#0033ff]"+vainqueur+"[/color][/b]\n\n"; 	}

	compact01+="[quote]"+compact_txt+"[/quote]";
	compact02+="[center]"+compact_txt+"[/center]";
	document.getElementById('mini_report_area').innerHTML=compact02;
}


function create_rc()
{	power="";
   	search_victorious();
	search_god_power();
  	text1="";
    text2="";
	var basic_txt="";
	var basic_hidden="";
   	basic_txt+="[b]"+titre+"[/b]\n\n";
   if(hide_troop)
   {   if(hide_village)
         {  basic_txt+="[b]Le seigneur [color=#990000]"+townOwner[0]+"[/color] mena ses troupes: [/b]\n\n~Masqué*~\n\n";
            if(townOwner[1]=='Ville Fantôme'){ basic_txt+="[b]Contre la [color=#0033ff]"+townOwner[1]+"[/color] [/b]\n\n~*Masqué*~\n\n";}
            else{ basic_txt+="[b]Contre le seigneur [color=#0033ff]"+townOwner[1]+"[/color][/b]\n\n~*Masqué*~\n\n";}
         }
      else
       {   	basic_txt+="[b]Le seigneur [color=#990000]"+townOwner[0]+"[/color], souverain de [color=#00cc33]"+townName[0]+"[/color] mena ses troupes: [/b]\n\n~*Masqué*~\n\n";
			if(townOwner[1]=='Ville Fantôme'){basic_txt+="[b]Contre la [color=#0033ff]"+townOwner[1]+"[/color] [/b]\n\n~*Masqué*~\n\n";}
         	else{basic_txt+="[b]Contre le seigneur [color=#0033ff]"+townOwner[1]+"[/color], souverain de [color=#00cc33]"+townName[1]+"[/color][/b]\n\n~*Masqué*~\n\n";}
       }
   }
   else
   {  if(hide_village)
      {	basic_txt+="[b]Le seigneur [color=#990000]"+townOwner[0]+"[/color] mena ses troupes: [/b]\n\n"+auhOutput+"\n\n";
        if(townOwner[1]=='Ville Fantôme'){basic_txt+="[b]Contre la [color=#0033ff]"+townOwner[1]+"[/color] [/b]\n\n"+duhOutput+"\n\n";}
        else{basic_txt+="[b]Contre le seigneur [color=#0033ff]"+townOwner[1]+"[/color] [/b]\n\n"+duhOutput+"\n\n";}
      }
      else
      {	basic_txt+="[b]Le seigneur [color=#990000]"+townOwner[0]+"[/color], souverain de [color=#00cc33]"+townName[0]+"[/color] mena ses troupes: [/b]\n\n"+auhOutput+"\n\n";
        if(townOwner[1]=='Ville Fantôme'){   basic_txt+="[b]Contre la [color=#0033ff]"+townOwner[1]+"[/color] [/b]\n\n"+duhOutput+"\n\n";}
        else{basic_txt+="[b]Contre le seigneur [color=#0033ff]"+townOwner[1]+"[/color], souverain de [color=#00cc33]"+townName[1]+"[/color][/b]\n\n"+duhOutput+"\n\n";}
      }
   }
   basic_txt+="[b]Face à  un rempart de:[/b]\n\n" +fight_bonus_rempart+"\n\n";
   basic_txt+="[b]Après l'attaque, les pertes furent: \n\n Pour l'attaquant: [color=#990000]"+townOwner[0]+"[/color][/b]\n\n"+aulOutput+"\n\n";
   basic_txt+="[b]Pour le défenseur: [color=#0033ff]"+townOwner[1]+"[/color][/b]\n\n"+dulOutput+"\n\n";
   basic_txt+=power+"\n\n";
   basic_txt+="[b]Ce jour-ci les dieux leur octroyèrent :[/b]\n\n"+fight_bonus_morale+"\n"+fight_bonus_chance+"\n\n";

   basic_hidden+="[b]"+titre+"[/b]\n\n";
   if(hide_village)
   {   basic_hidden+="[b]Le seigneur [color=#990000]"+townOwner[0]+"[/color] mena ses troupes: [/b]\n\n~*àdit*~\n\n";
        if(townOwner[1]=='Ville Fantôme')
        { basic_hidden+="[b]Contre la [color=#0033ff]"+townOwner[1]+"[/color] [/b]\n\n~*Masqué*~\n\n";}
        else
        { basic_hidden+="[b]Contre le seigneur [color=#0033ff]"+townOwner[1]+"[/color][/b]\n\n~*Masqué*~\n\n";}
   }
   else
   {  basic_hidden+="[b]Le seigneur [color=#990000]"+townOwner[0]+"[/color], souverain de [color=#00cc33]"+townName[0]+"[/color] mena ses troupes: [/b]\n\n~àdit*~\n\n";
      if(townOwner[1]=='Ville Fantôme'){basic_hidden+="[b]Contre la [color=#0033ff]"+townOwner[1]+"[/color] [/b]\n\n~*Masqué*~\n\n";}
      else{basic_hidden+="[b]Contre le seigneur [color=#0033ff]"+townOwner[1]+"[/color], souverain de [color=#00cc33]"+townName[1]+"[/color][/b]\n\n~*Masqué*~\n\n";}
   }
   basic_hidden+="[b]Face à un rempart de:[/b]\n\n" +fight_bonus_rempart+"\n\n";
   basic_hidden+="[b]Après l'attaque, les pertes furent: \n\n Pour l'attaquant: [color=#990000]"+townOwner[0]+"[/color][/b]\n\n"+aulOutput+"\n\n";
   basic_hidden+="[b]Pour le défenseur: [color=#0033ff]"+townOwner[1]+"[/color][/b]\n\n"+dulOutput+"\n\n";
 	basic_hidden+=power+"\n\n";
   basic_hidden+="[b]Ce jour-ci les dieux leur octroyèrent :[/b]\n\n"+fight_bonus_morale+"\n"+fight_bonus_chance+"\n\n";


   if(resourcesOutput!="")
   {  basic_txt+="[b]Les attaquants pillèrent :[/b]\n"+resourcesOutput+"\n\n";
      basic_hidden+="[b]Les attaquants pillèrent :[/b]\n"+resourcesOutput+"\n\n";
   }
   if(vainqueur==townOwner[0])
   {    basic_txt+="[b]Vainqueur du combat: [color=#990000]"+vainqueur+"[/color][/b]\n\n";
      basic_hidden+="[b]Vainqueur du combat: [color=#990000]"+vainqueur+"[/color][/b]\n\n";
   }
   else
   {   basic_txt+="[b]Vainqueur du combat: [color=#0033ff]"+vainqueur+"[/color][/b]\n\n";
       basic_hidden+="[b]Vainqueur du combat: [color=#0033ff]"+vainqueur+"[/color][/b]\n\n";
   }
   basic_txt+="[b]Converti avec :[/b] [url=http://userscripts.org/scripts/show/75073]~~FR Grepolis CR editor~~[/url]";
   basic_txt+="\n";
   basic_hidden+="[b]Converti avec :[/b] [url=http://userscripts.org/scripts/show/75073]~~FR Grepolis CR editor~~[/url]";
   basic_hidden+="\n";
   text1+="[quote]"+basic_txt+"[/quote]";
   hidden_text1="[quote]"+basic_hidden+"[/quote]";
   text2+="[center]"+basic_txt+"[/center]";
   hidden_text2="[center]"+basic_hidden+"[/center]";
   document.getElementById('ReportTextArea').innerHTML=text2;
}

function search_god_power()
{   var tab_god=new Array();
	var tab_trad=new Array();
	var attack_divine="";
	var def_divine="";

	tab_god["fair_wind"]="[b]Zeus[/b]";tab_god["desire"]="[b]Héra[/b]";tab_god["strength_of_heroes"]="[b]Athéna[/b]";
	tab_trad["fair_wind"]="[b]Un vent favorable[/b]";tab_trad["desire"]="[b]Nostalgie[/b]";tab_trad["strength_of_heroes"]="[b]Force Héroïque[/b]";

	$(".report_side_attacker .report_power").each(function(){
      var god_power_attk=$(this).attr("id");
      var divine_attck_img='[img]http://' + location.href.split('/')[2] + '/images/game/place/simulator/power_'+god_power_attk+'.png[/img]';
	  if(god_power_attk=="desire")
	  {attack_divine+="[color=#0033ff][b]"+townOwner[1]+"[/b][/color] invoqua "+tab_god[god_power_attk]+" et lança: "+divine_attck_img+" "+tab_trad[god_power_attk];}
	  else
	  {attack_divine+="[color=#990000][b]"+townOwner[0]+"[/b][/color] invoqua "+tab_god[god_power_attk]+" et lança: "+divine_attck_img+" "+tab_trad[god_power_attk];}
      });

   $(".report_side_defender .report_power").each(function(){
      var god_power_def=$(this).attr("id");
      var divine_def_img='[img]http://' + location.href.split('/')[2] + '/images/game/place/simulator/power_'+god_power_def+'.png[/img]';
	  if(god_power_def=="desire")
	  {def_divine+="[color=#990000][b]"+townOwner[0]+"[/b][/color] invoqua "+tab_god[god_power_def]+" et lança: "+divine_def_img+" "+tab_trad[god_power_def];}
	  else
	  {def_divine+="[color=#0033ff][b]"+townOwner[1]+"[/b][/color] invoqua "+tab_god[god_power_def]+" et lança: "+divine_def_img+" "+tab_trad[god_power_def];}

      });
	if((attack_divine!="") ||(def_divine!="")){power+=attack_divine+"\n"+def_divine;}
}

function create_compact_troup()
{	for (var cle in tab_attack)
	{	if(tab_attack_lost[cle]){compact_attack+=' '+cle+' '+tab_attack[cle]+'[color=#ff0000](-'+tab_attack_lost[cle]+')[/color]';}
		else{compact_attack+=' '+cle+' '+tab_attack[cle]+'[color=#ff0000](-0)[/color]';}
	}

	for (var cle2 in tab_def)
	{
		if(tab_def_lost[cle2]){compact_def+=cle2+' '+tab_def[cle2]+'[color=#ff0000](-'+tab_def_lost[cle2]+')[/color]';}
		else{compact_def+=cle2+' '+tab_def[cle2]+'[color=#ff0000](-0)[/color]';}
	}

	if(compact_attack==""){compact_attack+="Aucune Troupe";}
	if(compact_def==""){compact_def+="Aucune Troupe";}

}

function search_victorious()
{   var victorious_att=new Array();
   for(var a=0;a<troop_name_att.length;a++){   victorious_att[a]=parseInt(init_att[troop_name_att[a]])-parseInt(nameUnitAttck[troop_name_att[a]]);   }
   var h=0;
   while((victorious_att[h]==0)&&(h<=victorious_att.length-1)){h++;}
   if(h==(victorious_att.length)){vainqueur=townOwner[1];}
   else{vainqueur=townOwner[0];}
}

