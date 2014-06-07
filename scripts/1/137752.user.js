
// ==UserScript==
// @run-at			document-end
// @nocompat
// @name			XiTools II for OGame.
// @namespace		XiTools II for OGame.
// @description		XiTools II to improve the user experience of OGame 5.6.3
// @version			2.5.3
// @updateURL 		http://userscripts.org/scripts/source/137752.meta.js
// @downloadURL 	https://userscripts.org/scripts/source/137752.user.js
// @author			Minguez
// @date			11/11/2013
// @match			http://*.ogame.gameforge.com/game/index.php?page=*
// @include			http://*.ogame.gameforge.com/game/index.php?page=*
// ==/UserScript==
function gU(){XiTClass.prototype.mA=(function(){if(this.V.eblselmess.aT()){var mj=$(
'<div style="text-align:right; padding:0px 20px 10px 0px"> <a href="javascript:;" onClick="XiT.jw(6);"><span style="color:#F00">(MP)</span></a> <a href="javascript:;" onClick="XiT.jw(2);"><span style="color:#FFF">(CC)</span></a></span> <a href="javascript:;" onClick="XiT.jw(4);"><span style="color:#6f9fc8">(O. de flota)</span></a> <a href="javascript:;" onClick="XiT.jw(5);"><span style="color:#9c0">(Inf. Batalla)</span></a> <a href="javascript:;" onClick="XiT.jw(50);"><span style="color:#6e6e6e">(iI)</span></a> </div>')
;$(mj).find("a").css("text-decoration","none");$("#message #vier").prepend(mj);}});XiTClass.prototype.kX=false;XiTClass.prototype.jM=0;XiTClass.prototype.kM=0;XiTClass.prototype.iB=0;
XiTClass.prototype.nj=0;XiTClass.prototype.Message=(function(kY){if(!this.V.eblspioplunder.aT()&& !this.V.eblspiodf.aT()&& !this.V.eblspiosim.aT())return false;function getData(kL){var i;var l;var h;
var gs;var kx;var time;var e=kL.find(".fragment.spy2 td");if(!e){return null;}var gv={fE:kL.find('table:last'),data:{},bJ:e.eq(1).text().replace(/\D/g,'').bn(),kr:e.eq(3).text().replace(/\D/g,'').bn()
,ca:e.eq(5).text().replace(/\D/g,'').bn(),bK:e.eq(7).text().replace(/\D/g,'').bn(),position:[]};var key=kL.find('table .key');var val=kL.find('table .value');l=key&&val&&key.length===val.length?
key.length:0;for(i=0;i<l;i++){gv.data[XiT.jW($.trim(key.eq(i).text()))]=val.eq(i).text().replace(/\D/g,'');}var pos=kL.find('a.btn_blue').attr('href').match(lu);if(pos&&pos.length===5){for(i=1;i<5;i++
){gv.position.push(pos[i].bn());}}else{return null;}h=kL.find('.area');if(!h|| !h.length){return null;}gs=h.eq(0).text().match(/([^\s]*) ([^\s]*) ([^\[]*) \[/);if(gs&&gs.length){gv.lk=gs[3];}else{
return null;}gv.kx=h.eq(0).find("span[class*='status_abbr']").text();if(h.eq(0).find("span[class*='inactive']")[0]){gv.la=[0.5];}else{gv.la=(h.eq(0).find("span[class*='rank_bandit']")[0])?[1]:(h.eq(0)
.find("span[class*='status_abbr_honorableTarget']")[0])?[0.75]:[0.5];}gv.lp=h.length-1;return gv;};var jI=(kY)?$(".showmessage"):$("#mailz");var t=jI.find(".material.spy");var kZ=[];var i;var l=t?
t.length:0;var gv;var lu=/&galaxy=(\d+)&system=(\d+)&position=(\d+)&type=(\d+)&/;var lA=new RegExp("\\(.+\\s\'(.+)\\'\\)");var kA=new RegExp("(\\d{2}).(\\d{2}).(\\d{4})\\s(.+)");for(i=0;i<l;i++){gv=
getData(t.eq(i).parent());if(gv){kZ.push(gv);}}var lw=this.V.eblspioplunder.aT();var ly=this.V.eblspiodf.aT();var jV=this.V.eblspiosim.aT();var kw=(this.V.deftodebris=="1")?(1-this.V.defrepfactor):0;
var kI=this.V.debrisfactor;var mq=document.getElementsByName('ogame-language')[0].content;var mD=this.V.eblosim.aT();var ma=this.V.eblwebsim.aT();var mP=this.V.ebldragosim.aT();var p=this.cj.split(
":");for(var key in kZ){var gv=kZ[key];var fQ="";var percent=0;var m=0;var c=0;var jH=0;var kG=[];var kR=[];if(lw){for(i=0;i<gv.la.length;i++){kG[0]=Math.ceil(gv.bJ*gv.la[i]);kG[1]=Math.ceil(gv.kr*
gv.la[i]);kG[2]=Math.ceil(gv.ca*gv.la[i]);jH=kG[0]+kG[1]+kG[2];kR=[];kR.push(XiT.R(XiT.ah(kG[0]),null,'XiCMet'));kR.push(XiT.R(XiT.ah(kG[1]),null,'XiCCry'));kR.push(XiT.R(XiT.ah(kG[2]),null,'XiCDeu'))
;kR.push(XiT.R(XiT.ah(jH),'lime'));var h=Math.max(gv.bJ+gv.kr+gv.ca,Math.min((2*gv.bJ+gv.kr+gv.ca)*3/4,(2*gv.bJ+gv.ca)))*gv.la[i];kR.push(XiT.R(XiT.ah(Math.ceil(h/J.data[J.dJ.gS].bU)),'#fff'));
kR.push(XiT.R(XiT.ah(Math.ceil(h/J.data[J.dJ.he].bU)),'#fff'));kR.push(gv.la[i]*100);if(fQ!="")fQ+="<br>";fQ+=this.kc(fp.kQ,kR);}}if(ly){percent=kw;if(percent>0){var list=J.list.hk;for(var eB=0,jY=
list.length;eB<jY;eB++){if(gv.data[list[eB]]){m+=gv.data[list[eB]]*J.data[list[eB]].m*percent;c+=gv.data[list[eB]]*J.data[list[eB]].c*percent;}}}percent=kI;if(percent>0){var list=J.list.dh;for(var eB=
0,jY=list.length;eB<jY;eB++){if(gv.data[list[eB]]){m+=gv.data[list[eB]]*J.data[list[eB]].m*percent;c+=gv.data[list[eB]]*J.data[list[eB]].c*percent;}}}if((m+c)>0){var lf=[XiT.R(XiT.ah(m),null,'XiCMet')
,XiT.R(XiT.ah(c),null,'XiCCry'),XiT.R(XiT.ah(Math.ceil((m+c)/J.data[J.dJ.gB].bU)),'#fff')];if(fQ!="")fQ+="<br>";fQ+=this.kc(fp.lv,lf);}}if(jV){var lq="http://www.osimulate.com/?lang="+mq;var ky=
"http://websim.speedsim.net/index.php?lang="+fp.kW;var lm="http://drago-sim.com/index.php?lang="+fp.jP;var le=[gv.kx];lq+='&tech_a0_0='+this.data.k.tech[J.bj.gd]+'&tech_a0_1='+
this.data.k.tech[J.bj.ew]+'&tech_a0_2='+this.data.k.tech[J.bj.K];ky+='&tech_a0_0='+this.data.k.tech[J.bj.gd]+'&tech_a0_1='+this.data.k.tech[J.bj.ew]+'&tech_a0_2='+this.data.k.tech[J.bj.K];lm+=
'&techs[0][0][w_t]='+this.data.k.tech[J.bj.gd]+'&techs[0][0][s_t]='+this.data.k.tech[J.bj.ew]+'&techs[0][0][r_p]='+this.data.k.tech[J.bj.K];lq+='&engine0_0='+this.data.k.tech[J.bj.fO]+'&engine0_1='+
this.data.k.tech[J.bj.gq]+'&engine0_2='+this.data.k.tech[J.bj.gh];lq+='&start_pos='+p[0]+':'+p[1]+':'+p[2];ky+='&engine0_0='+this.data.k.tech[J.bj.fO]+'&engine0_1='+this.data.k.tech[J.bj.gq]+
'&engine0_2='+this.data.k.tech[J.bj.gh];ky+='&start_pos='+p[0]+':'+p[1]+':'+p[2];lq+='&fleet_debris='+kI*100+'&defense_debris='+kw*100+'&defense_repair='+this.V.defrepfactor*100+'&uni_speed='+this.bA+
'&rapidfire='+this.V.rapidfire+'&plunder_perc='+gv.la[0]*100;ky+='&perc-df='+kI*100;lm+='&debris_ratio='+kI;lq+='&enemy_name='+gv.lk+'&enemy_pos='+gv.position[0]+':'+gv.position[1]+':'+gv.position[2];
ky+='&enemy_name='+gv.lk+'&enemy_pos='+gv.position[0]+':'+gv.position[1]+':'+gv.position[2];lm+='&v_planet='+gv.lk+'&v_coords='+gv.position[0]+':'+gv.position[1]+':'+gv.position[2];lq+=
'&enemy_metal='+gv.bJ+'&enemy_crystal='+gv.kr+'&enemy_deut='+gv.ca;ky+='&enemy_metal='+gv.bJ+'&enemy_crystal='+gv.kr+'&enemy_deut='+gv.ca;lm+='&v_met='+gv.bJ+'&v_kris='+gv.kr+'&v_deut='+gv.ca;var kV=
[J.bj.gd,J.bj.ew,J.bj.K];var kl=['w_t','s_t','r_p'];for(var eB=0,jY=kV.length;eB<jY;eB++){if(gv.data[kV[eB]]){lq+='&tech_d0_'+eB+'='+gv.data[kV[eB]];ky+='&tech_d0_'+eB+'='+gv.data[kV[eB]];lm+=
'&techs[1][0]['+kl[eB]+']='+gv.data[kV[eB]];}}var lb=J.list.dh.concat(J.list.hk);var lg=['k_t','g_t','l_j','s_j','kr','sc','ko','re','sp','bo','so','z','t','sk','ra','l_l','s_l','g','i','p','k_s',
'g_s'];for(var eB=0,jY=lb.length;eB<jY;eB++){if(gv.data[lb[eB]]){lq+='&ship_d0_'+eB+'_b='+gv.data[lb[eB]];ky+='&ship_d0_'+eB+'_b='+gv.data[lb[eB]];lm+='&numunits[1][0]['+lg[eB]+']='+gv.data[lb[eB]];
le.push(lb[eB]);le.push(gv.data[lb[eB]]);}}if(gv.data[J.ew.hH]){lq+='&abm_b='+gv.data[J.ew.hH];ky+='&abm_b='+gv.data[J.ew.hH];lm+='&missiles_available_v='+gv.data[J.ew.hH];}var ld=[];if(mD){ld.push(
'<a target="_blank" href="'+lq+'" class="btn_blue">OSimulate</a>');}if(ma){ld.push('<a target="_blank" href="'+ky+'" class="btn_blue">SpeedSim</a>');}if(mP){ld.push('<a target="_blank" href="'+lm+
'" class="btn_blue">DragoSim</a>');}ld.push('<a href="javascript:void(0);" onclick="XiT.kK(\''+le.join(',')+'\');" class="btn_blue">'+fp.kU+'</a>');if(fQ!="")fQ+="<br>";fQ+=
'</td></tr><tr><td class="attack" align="center" colspan="2">'+ld.join(' &nbsp; ');}if(fQ!="")gv.fE.find("tr:first").after('<tr><td class="textCenter textBeefy" colspan="2">'+fQ+'</td></tr>');}});
XiTClass.prototype.lj=(function(){var lb=J.list.dh;var kC=0;var ka="lime";this.kM=0;this.nj=0;for(var key in lb){var ge=this.kX.find("#XiTtr1_"+lb[key]).val();this.kM+=(J.data[lb[key]].m+
J.data[lb[key]].c+J.data[lb[key]].d)*J.data[lb[key]].tr*ge;this.nj+=ge.bn();}kC=(this.jM>0)?this.kM/this.jM:0;ka=(kC>=5)?"red":(kC>=3)?"yellow":ka;this.kX.find("div").eq(0).html(this.R(number_format(
kC,2),ka));var temp="<span class='XiCMet'>"+this.ah(this.nj,5)+"</span> units <br>";temp+="<span class='XiCCry'>"+this.ah((this.kM*0.001),5,true)+"</span> points";this.kX.find("table tfoot td").eq(1)
.html(temp);});XiTClass.prototype.kK=(function(kn){if(!this.kX){var kD=$(
'<div id="XiTtactical" style="display:none"> <div></div> <table class="list" style="width:385px;"> <thead> <tr> <th style="width:180px;">'+fp.ke+'</th> <th>'+this.fG+
'</th> <th>Defender</th> </tr> </thead> <tbody> </tbody> <tfoot> <tr><td></td><td>-</td><td>-</td></tr> </tfoot> </table> </div>');var table="";var aL=(typeof(this.data.aL)=="object")?this.data.aL:
$.parseJSON(this.aS('strings'));var lb=J.list.dh;for(var key in lb){table+='<tr>';table+='<td>'+aL[lb[key]]+'</td>';table+='<td><input id="XiTtr1_'+lb[key]+'" type="text" maxlength="7"/></td>';table+=
'<td><span id="XiTtr0_'+lb[key]+'"></span></td>';table+='</tr>';}kD.find("table tbody").append(table);kD.find("table tbody tr:odd").addClass("alt");kD.find("table tbody tr").each(function(){$(this)
.find("td:first").css("text-align","left")});kD.find("input").bind('keyup change',function(){var value=$(this).val();if(value=="")return false;value=value.replace(/\D/g,'');$(this).val(value);XiT.lj()
;});this.kX=kD;}this.jM=0;this.iB=0;var ki=kn.split(',');this.kX.find("div").eq(0).html(this.R("0,00","lime"));this.kX.find("input").val("");this.kX.find("span[id*='XiTtr0_']").html("-");this.kX.find(
"table th").eq(2).text(ki[0]);for(var i=1,l=ki.length-1;i<l;i+=2){if(typeof(J.data[ki[i]].tr)!='undefined'){this.kX.find("#XiTtr0_"+ki[i]).text(this.format(ki[i+1]));this.jM+=(J.data[ki[i]].m+
J.data[ki[i]].c+J.data[ki[i]].d)*J.data[ki[i]].tr*ki[i+1].bn();this.iB+=ki[i+1].bn();}}var temp="<span class='XiCMet'>"+this.ah(this.iB,5)+"</span> units <br>";temp+="<span class='XiCCry'>"+this.ah((
this.jM*0.001),5,true)+"</span> points";this.kX.find("table tfoot td").eq(2).css("text-align","center").html(temp);this.kX.find("table tfoot td").eq(1).css("text-align","center").html("-");
this.kX.dialog({title:fp.jG,height:"auto",width:"400px",position:"center",resizable:false});this.kX.dialog("moveToTop");});XiTClass.prototype.jw=(function(type){if(type==50){$(
"#mailz tr .status_abbr_inactive, #mailz tr .status_abbr_longinactive").closest("tr").find("input.checker").prop('checked',true);}else{$('#mailz tr a[href*="cat='+type+'"]').closest("tr").find(
"input.checker").prop('checked',true);}});$(document).ajaxSuccess(function(e,xhr,settings){if(settings.url.indexOf('?page=showmessage')>0){XiT.Message(true);}if(settings.url.indexOf('?page=messages')<
0){return false;}XiT.Message(false);$("select").unbind('change');$("select.choose").change(function(){$(".buttonOK").show();mod=$("select.choose option:selected").attr("id");});$("#checkAll").unbind(
'click');$("#checkAll").change(function(){if($(this).is(':checked')){$("input.checker").prop('checked',true);}else{$("input.checker").prop('checked',false);}});});};function aK(lang){var aL={'es':{
save:"Guardar",cancel:"Cancelar",ai:"Espionaje",dR:"Reducir",gr:"No hay recicladores disponibles",cD:"Mensajes Circular Rapido",hl:"El mensaje circular ha sido enviado",send:"Enviar",dM:"Galaxia",cW:
"Flota",cA:"General",dO:"Edificios",kP:"Mensajes",fm:"Información",cZ:"Buscar actualizacion cada",cr:"Nunca",aF:"días",cn:"Ampliar detalles en construcciones",cJ:"Abreviar valores",du:
"Resaltar escombros",cQ:"Resaltar escombros (medio)",dz:"Resaltar escombros (alto)",aU:"Mostrar rank al lado del nombre",cs:"Resaltar Amigos y aliados",db:"Resaltar coordenadas de link",cC:
"Enlace Espiar en lunas",cY:"Enlace Recolectar en escombros",cP:"Activar recursos en transito",ht:"Naves en FleetII/FleetIII",hG:"Accesos directos en FleetII",hn:"Acceso directo",cb:
"Consumo de deuterio",au:"Desconocido",cV:"Disponible en",dW:"Producir n&uacute;mero m&aacute;ximo",dA:"Existe una nueva version del plugin XiTools.",da:"Actualizar",cg:"versión",cG:
"Error, Escombros medios:\nRequerido.\nNúmerico.",bx:"Error, Escombros altos:\nRequerido.\nNúmerico.\nMayor que escombros medios.",cF:"Planetas",dr:"L",cB:"PP",cE:"Mostrar información detallada",ce:
"Estadísticas",bG:{0:"General: %t (%p pts.)",1:"Economía: %t (%p pts.)",2:"Investigacíon: %t (%p pts.)",3:"Militar: %t (%p pts.)",4:"Militar Perdidos: %t (%p pts.)",5:
"Militar Construidos: %t (%p pts.)",6:"Militar Destruidos: %t (%p pts.)",7:"Honor: %t (%p pts.)",8:"unidades"},eD:"Planetas Marcados",cU:"No se encontraron planetas marcados.",mN:
"Actividad de los planeta",nv:"Actividad de",nm:"Coordenadas",mI:"Planeta",lE:"Luna",nk:"Hora",nb:"No tienes suficiente Deuterio.",mE:"Planeta destruido.",cq:{0:"Metal",1:"Cristal",2:"Deuterio"},bZ:
"Total",fk:"Recursos esperados para este planeta",jd:"Ayuda para transporte",ik:"Transporte",jo:"Todo",ja:"Faltante",iq:"Restablecer opciones",ap:"Información de producción",ev:
"Requiere <b>'Ampliar detalles en construcciones'</b> activado.",fF:"última actualización",ab:"necesita actualizar",dI:"Este planeta",cS:"Todos los planetas",cI:"por día",dg:"por semana",fN:"detalle",
mo:"Producción de naves",lQ:"Producción de defensas",bD:"Compactador de batallas",aq:"Repartidor de escombros",jX:"Velocidad del universo",kk:"Escombros generados por flota",kN:
"Escombros generados por defensa",lbleblselbytype:"Selección por tipo",jQ:"Mostrar saqueo posible",jK:"Mostrar campo de escombros posible",jZ:"Mostrar botones a Simuladores",kQ:
"Recursos capturables ($7%): $1 Metal, $2 Cristal, $3 Deuterio <br> Espacio de carga necesario: $4 unidades - Naves de cargas necesarias: $5 NPC o $6 NGC",lv:
"Campo de escombros posible: $1 Metal, $2 Cristal, $3 Reciclador/es",kU:"Ret. Táctica",jG:"Retirada Táctica",ke:"Naves",kW:"sp",jP:"spanish"},'en':{save:"Save",cancel:"Cancel",ai:"Espionage",dR:
"Recycle",gr:"No available recyclers",cD:"Easy Ally Communication",hl:"The message has been sent",send:"Send",dM:"Galaxy",cW:"Fleet",cA:"General",dO:"Buildings",kP:"Messages",fm:"Info",cZ:
"Search updated every",cr:"Never",aF:"days",cn:"Extended details on construction",cJ:"Shorten values",du:"Show highlighted debris",cQ:"Highlight debris (medium)",dz:"Highlight debris (high)",aU:
"Show rank on name player",cs:"Highlight friends and allies",db:"Highlight link coordinates",cC:"Spy moons with a click",cY:"Recycle with a click",cP:"Display the resources in transit",ht:
"Ships in FleetII/FleetIII",hG:"Shortcuts in FleetII",hn:"Shortcut",cb:"Deuterium consumption",au:"Unknown",cV:"Available in",dW:"Produce maximum number",dA:"A new version of plugin XiTools.",da:
"Update",cg:"version",cG:"Error, Medium debris:\nRequired.\nNumber.",bx:"Error, High debris:\nRequired.\nNumber.\nGreater than Low debris.",cF:"Planets",dr:"M",cB:"HW",cE:"Show detail information",ce:
"Highscore",bG:{0:"Score: %t (%p pts.)",1:"Economy: %t (%p pts.)",2:"Research: %t (%p pts.)",3:"Military: %t (%p pts.)",4:"Military lost: %t (%p pts.)",5:"Military built: %t (%p pts.)",6:
"Military destroyed: %t (%p pts.)",7:"Honour: %t (%p pts.)",8:"units"},eD:"Highlights Planets",cU:"There were no highlights planets.",mN:"Account activity",nv:"Activity on",nm:"Coords",mI:"Planet",lE:
"Moon",nk:"Time",nb:"out of deuterium",mE:"destroyed planet",cq:{0:"Metal",1:"Crystal",2:"Deuterium"},bZ:"Total",fk:"Resources expected at this planet",jd:"Easy transport",ik:"Transport",jo:"All",ja:
"Missing",iq:"Reset all data",ap:"Info Production",ev:"<b>'Extended details on construction'</b> required",fF:"last update",ab:"need update",dI:"This planet",cS:"All planets",cI:"per day",dg:
"per week",fN:"detail",mo:"Fleet production",lQ:"Defense production",bD:"Combat Report Converter",aq:"ACS Debris Distribute",jX:"Universe speed",kk:"Fleet to debris",kN:"Defense to debris",
lbleblselbytype:"Selection by type",jQ:"Show possible plunder",jK:"Show possible derbis field",jZ:"Show battle sim links",kQ:
"Catchable resources ($7%): $1 Metal, $2 Crystal, $3 Deuterium <br> Needed cargo space: $4 units - Needed cargo ships on attack: $5 SC or $6 LC",lv:
"Possible debris field: $1 Metal, $2 Crystal, $3 Recycler",kU:"Tac. Retreat",jG:"Tactical Retreat",ke:"Ships",kW:"en",jP:"english"},'ru':{save:"Сохранить",cancel:"Отмена",ai:"Шпионаж",dR:
"Переработать",gr:"Нет доступных переработчиков",cD:"Отправка сообщения альянсу",hl:"Сообщение было отправлено",send:"Отправить",dM:"Галактика",cW:"Флоты",cA:"Остальное",dO:"зданий",kP:"сообщения",fm:
"Info",cZ:"Поиск обновляется каждые",cr:"никогда",aF:"дней",cn:"Расширенные сведения о строительстве",cJ:"Сократить значения",du:"Включить подсветку обломков",cQ:"Подсветка обломков (средне)",dz:
"Подсветка обломков (много)",aU:"Показывать рейтинг игрока",cs:"Подсветка друзей и альянсов",db:"Подсветка координат",cC:"шпион Луны с помощью щелчка",cY:"Переработать одним щелчком",cP:
"Показывать ресурсы в полете",ht:"Доставка FleetII/FleetIII",hG:"Клавиши быстрого доступа в FleetII",hn:"контекстного",cb:"Дейтерий потребления",au:"неизвестный",cV:"Доступно в",dW:
"Produce maximum number",dA:"Новая версия плагина XiTools.",da:"обновление",cg:"версия",cG:"Ошибка, Средне количество обломков:\nТребуется ввести число побольше.",bx:
"Ошибка, Большое количество обломков:\nТребуется ввести число больше, .\nчем указано для средних обломков.",cF:"Планеты",dr:"M",cB:"ГП",cE:"Больше+",ce:"Статистика",bG:{0:"По очкам: %t (%p очков)",1:
"Экономика: %t (%p очков)",2:"Исследования: %t (%p очков)",3:"Боевой рейтинг: %t (%p очков)",4:"Боевых очков потеряно: %t (%p очков)",5:"Боевых очков набрано: %t (%p очков)",6:
"Боевых очков уничтожено: %t (%p очков)",7:"Очки чести: %t (%p очков)",8:"единиц"},eD:"Подсветка планет",cU:"Нет подсвечиваемых планет.",mN:"Account activity",nv:"Activity on",nm:"Coords",mI:"Planet",
lE:"Moon",nk:"Time",nb:"out of deuterium",mE:"destroyed planet",cq:{0:"Металл",1:"Кристалл",2:"Дейтерий"},bZ:"Всего",fk:"Ожидается ресурсов на планете",jd:"Простая транспортировка",ik:"Транспорт",jo:
"все",ja:"потерявшийся",iq:"Reset all data",ap:"Info Production",ev:"<b>'Extended details on construction'</b> required",fF:"last update",ab:"need update",dI:"This planet",cS:"All planets",cI:
"per day",dg:"per week",fN:"detail",mo:"Fleet production",lQ:"Defense production",bD:"Конвертер боевых докладов",aq:"ACS Debris Distribute",jX:"Universe speed",kk:"Fleet to debris",kN:
"Defense to debris",lbleblselbytype:"Selection by type",jQ:"Show possible plunder",jK:"Show possible derbis field",jZ:"Show battle sim links",kQ:
"Catchable resources ($7%): $1 Metal, $2 Crystal, $3 Deuterium <br> Needed cargo space: $4 units - Needed cargo ships on attack: $5 SC or $6 LC",lv:
"Possible debris field: $1 Metal, $2 Crystal, $3 Recycler",kU:"Tac. Retreat",jG:"Tactical Retreat",ke:"Ships",kW:"ru",jP:"russian"},'it':{save:"Salva",cancel:"Cancella",ai:"Spionaggio",dR:"Ricicla",
gr:"Riciclatrici non disponibili",cD:"Messaggio rapido all'alleanza",hl:"Il messaggio è stato inviato",send:"Invia",dM:"Galassia",cW:"Flotta",cA:"Generale",dO:"Costruzioni",kP:"Messaggi",fm:"Info",cZ:
"Ricerca aggiornamenti ogni",cr:"Mai",aF:"giorni",cn:"Dettagli delle costruzioni",cJ:"Accorciare i valori",du:"Mostra detriti evidenziati",cQ:"Evidenzia detriti (Medi)",dz:"Evidenzia detriti (Alti)",
aU:"Mostra top sul nome del giocatore",cs:"Evidenzia amici e alleati",db:"Evidenzia coordinate (link)",cC:"Spia le lune con un click",cY:"Ricicla con un clic",cP:"Mostra le risorse in transito",ht:
"Navi in FleetII/III",hG:"Scorciatoia a FlottaII",hn:"Scorciatoia",cb:"Consumo di deuterio",au:"Sconosciuto",cV:"Disponibile in",dW:"Produce maximum number",dA:
"C'è una nuova versione del plugin XiTools.",da:"Aggiorna",cg:"versione",cG:"Errore, detriti medi: \nRichiesto. \nNumero.",bx:
"Errore, detriti alti: \nRichiesto. \nNumero. \nMaggiore di detriti medi.",cF:"Planeti",dr:"Luna",cB:"Madre",cE:"Altro+",ce:"Punti",bG:{0:"Punteggio: %t (%p pts.)",1:"Economia: %t (%p pts.)",2:
"Ricerca: %t (%p pts.)",3:"Flotta: %t (%p pts.)",4:"Flotta persa: %t (%p pts.)",5:"Flotta costruita: %t (%p pts.)",6:"Flotta distrutta: %t (%p pts.)",7:"Onore: %t (%p pts.)",8:"unità"},eD:
"Punti pianeti",cU:"Non ci sono punteggi per i pianeti.",mN:"Account activity",nv:"Activity on",nm:"Coords",mI:"Planet",lE:"Moon",nk:"Time",nb:"out of deuterium",mE:"destroyed planet",cq:{0:"Metallo",
1:"Cristallo",2:"Deuterio"},bZ:"Totale",fk:"Risorse attese su questo pianeta",jd:"Facilità di trasporto",ik:"Trasporto",jo:"Tutti",ja:"Mancante",iq:"Reset all data",ap:"Info Production",ev:
"<b>'Extended details on construction'</b> required",fF:"last update",ab:"need update",dI:"This planet",cS:"All planets",cI:"per day",dg:"per week",fN:"detail",mo:"Fleet production",lQ:
"Defense production",bD:"Convertitore di CR",aq:"Distribuzione detriti per ACS",jX:"Universe speed",kk:"Fleet to debris",kN:"Defense to debris",lbleblselbytype:"Selection by type",jQ:
"Show possible plunder",jK:"Show possible derbis field",jZ:"Show battle sim links",kQ:
"Catchable resources ($7%): $1 Metal, $2 Crystal, $3 Deuterium <br> Needed cargo space: $4 units - Needed cargo ships on attack: $5 SC or $6 LC",lv:
"Possible debris field: $1 Metal, $2 Crystal, $3 Recycler",kU:"Tac. Retreat",jG:"Tactical Retreat",ke:"Ships",kW:"it",jP:"italian"},'pl':{save:"Zapisz",cancel:"Anuluj",ai:"Szpieguj",dR:"Zbieraj",gr:
"Brak dostępnych recyklerów",cD:"Łatwa komunikacja ",hl:"Wiadomość została wysłana",send:"Wyślij",dM:"Galaktyka",cW:"Flota",cA:"Ogólne",dO:"Budynki",kP:"Wiadomości",fm:"Informacja",cZ:"Aktualizuj co",
cr:"Nigdy",aF:"dni",cn:"Rozszerzone szczegóły dotyczące budow",cJ:"Skróć wartości",du:"Pokazuj, zaznaczone pola zniszczeń",cQ:"Pokazuj pole zniszczeń (Średnie)",dz:"Pokazuj pole zniszczeń (Wysokie)",
aU:"Pokazuj, pozycję graczy",cs:"Pokazuj, przyjaciela/li i sojusz",db:"Wyróżnij, zaznaczone koordynaty",cC:"Księżyc: Kliknij, aby szpiegować",cY:"Zbieraj: Kliknij, aby wysłać recyklery",cP:
"Wyświetlaj obecny zasób surowców we flotach",ht:"Statki w flota II/IIII",hG:"Skróty flota II",hn:"Skróty",cb:"Zużycie deuteru",au:"Nieznane",cV:"Dostępne za",dW:"Produce maximum number",dA:
"Nowa wersja wtyczki XiTools.",da:"Aktualizuj",cg:"wersja",cG:"Błąd, Średni debris:\nRequired.\nNumber.",bx:"Błąd, Wysoki debris:\nRequired.\nNumber.\nGreater than Low debris.",cF:"Współrzędne",dr:
"K",cB:"PM",cE:"Pokaż więcej",ce:"Miejsca w:",bG:{0:"Punkty: %t (%p pkt.)",1:"Ekonomia: %t (%p pkt.)",2:"Badania: %t (%p pkt.)",3:"Militarne: %t (%p pkt.)",4:"Stracone punkty militarne: %t (%p pkt.)",
5:"Zbudowane punkty militarne: %t (%p pkt.)",6:"Zniszczone punkty militarne : %t (%p pkt.)",7:"Punkty honoru: %t (%p pkt.)",8:"Jednostki"},eD:"Wyróżnione planety",cU:"Nie zaznaczyłeś żadnych planet.",
mN:"Account activity",nv:"Activity on",nm:"Coords",mI:"Planet",lE:"Moon",nk:"Time",nb:"out of deuterium",mE:"destroyed planet",cq:{0:"Metal",1:"Kryształ",2:"Deuter"},bZ:"Razem",fk:
"Zasoby przewidywane na tej planecie",jd:"łatwy transport",ik:"Transportu",jo:"wszystko",ja:"brakujący",iq:"Reset all data",ap:"Info Production",ev:
"<b>'Extended details on construction'</b> required",fF:"last update",ab:"need update",dI:"This planet",cS:"All planets",cI:"per day",dg:"per week",fN:"detail",mo:"Fleet production",lQ:
"Defense production",bD:"Konwerter raportów wojennych",aq:"Podział złomu po ACSie",jX:"Universe speed",kk:"Fleet to debris",kN:"Defense to debris",lbleblselbytype:"Selection by type",jQ:
"Show possible plunder",jK:"Show possible derbis field",jZ:"Show battle sim links",kQ:
"Catchable resources ($7%): $1 Metal, $2 Crystal, $3 Deuterium <br> Needed cargo space: $4 units - Needed cargo ships on attack: $5 SC or $6 LC",lv:
"Possible debris field: $1 Metal, $2 Crystal, $3 Recycler",kU:"Tac. Retreat",jG:"Tactical Retreat",ke:"Ships",kW:"pl",jP:"polish"},'fr':{save:"Sauvegarder",cancel:"Annuler",ai:"Espionner",dR:
"Recycler",gr:"Pas de recycleurs disponible",cD:"Communication facile alliance",hl:"Le message a été envoyée",send:"Envoyer",dM:"Galaxie",cW:"Flotte",cA:"Général",dO:"Bâtiments",kP:"Messages",fm:
"Information",cZ:"Rechercher mise chaque",cr:"Jamais",aF:"Jours",cn:"Détails étendus de construction",cJ:"Valeur raccourcie",du:"Montrer débris en surbrillance",cQ:"Débris en surbrillance (moyenne)",
dz:"Débris en surbrillance (haute)",aU:"Montrer le rang du joueur",cs:"amis et Alliés en surbrillance",db:"Lien de coordonnée en surbrillance",cC:"Espionnage Lune en 1 clic",cY:"Recycler en 1 clic",
cP:"Afficher les resources en transport",ht:"Vaisseaux en FlotteII/FlotteIII",hG:"Raccourci FlotteII",hn:"Raccourci",cb:"Consommation Deutérium",au:"Inconnu",cV:"disponible Dans",dW:
"Produire le nombre maximum",dA:"Une nouvelle version du plugin XiTools.",da:"Mise à jour",cg:"version",cG:"Erreur, Débris Moyen:\nRequired.\nNumber.",bx:
"Erreur, Débris Haut:\nRequired.\nNumber.\nGreater than Low debris.",cF:"Planètes",dr:"L",cB:"PM",cE:"Montrer information Détaillée",ce:"Meilleurs scores",bG:{0:"Score: %t (%p pts.)",1:
"Economie: %t (%p pts.)",2:"Recherche: %t (%p pts.)",3:"Militaire: %t (%p pts.)",4:"Militaire détruit: %t (%p pts.)",5:"Militaire construit: %t (%p pts.)",6:"Militaire détruit: %t (%p pts.)",7:
"Honneur: %t (%p pts.)",8:"Unités"},eD:"Planètes en surbrillance",cU:"Il n'y a pas de Planètes en surbrillance.",mN:"Account activity",nv:"Activity on",nm:"Coords",mI:"Planet",lE:"Moon",nk:"Time",nb:
"out of deuterium",mE:"destroyed planet",cq:{0:"Mètal",1:"Cristal",2:"Deutérium"},bZ:"Total",fk:"Ressources attendues sur cette planète",jd:"Transport Facile",ik:"Transport",jo:"Toutes",ja:
"Manquantes",iq:"Remise à zéro des données",ap:"Info Production",ev:"'Détails étendus de construction' requis",fF:"Dernière mise à jour",ab:"Mise à jour requise",dI:"Cette planète",cS:
"Toutes les planètes",cI:"Par jour",dg:"Par semaine",fN:"détail",mo:"Production de Flotte",lQ:"Production de Défense",bD:"Combat Report Converter",aq:"ACS Debris Distribute",jX:"Vitesse univers",kk:
"Flotte dans le CDR",kN:"Défense dans le CDR",lbleblselbytype:"Sélection par type",jQ:"Montrer pillage possible",jK:"Montrer champs de ruines possible",jZ:"Montrer liens de simulations combats",kQ:
"Pillage ressources possible : ($7%): $1 Metal, $2 Crystal, $3 Deuterium <br> Needed cargo space: $4 units - Needed cargo ships on attack: $5 SC or $6 LC",lv:
"champs de ruines possible : $1 Metal, $2 Crystal, $3 Recycler",kU:"Retrait tactique",jG:"Retraite tactique",ke:"Vaisseaux",kW:"fr",jP:"french"}};return aL[lang];};mJ=function(){var bu=
window.location.search;var mZ={};bu.replace(new RegExp("([^?=&]+)(=([^&]*))?","g"),function($0,$1,$2,$3){mZ[$1]=$3;});return mZ;};function XiTClass(call){this.version="2.5.3";this.fz=
"http://userscripts.org/scripts/source/137752.user.js";this.eH="http://userscripts.org/scripts/show/137752";this.dc=new Array();this.bw=(function(selector,update){if(!XiT.dc[selector]||update){
XiT.dc[selector]=$(selector);}return XiT.dc[selector];});this.ix=(function(selector,update){if(!this.dc[selector]||update){this.dc[selector]=$(selector);}return this.dc[selector];});
String.prototype.bn=(function(cL){var value=this;if(value!=""){bS=parseInt(value);bS=(isNaN(bS))?0:bS;bS=(cL)?bS:Math.abs(bS);return bS;}else{return 0;}});String.prototype.aT=(function(){var bu=this;
return(bu=="0")?false:true;});this.fg=(function(data){var ip=data.version.split(".");var iI=XiT.version.split(".");var nh=(ip[3])?true:false;var mv=(iI[3])?true:false;var hM=false;if(ip[0]=="0")
return false;if(ip[0]>iI[0]){hM=true;}else if(ip[0]==iI[0]&&ip[1]>iI[1]){hM=true;}else if(nh==true&&mv==false){hM=true;}if(hM){var gg=
'<div class="content-box-s" style="position:fixed;top:40px; right:30px;z-index:999;width:222px;padding:2px;"> <div class="header"><h3 style="font-weight:bold;">XiTools new update</h3></div> <div class="content" style="text-align:center"> '+
fp.dA+' <br><br> <a id="XiT_btnRun" class="XiT-button on" href="'+data.downloadURL+'" style="margin-left:44px;"><span>'+fp.da+'</span></a> <div class="clearfloat"></div> '+fp.cg+' <a href="'+
data.updateURL+'" target="_blank">'+data.version+'</a> </div> <div class="footer"></div> </div>';$("body").append(gg);}else{var now=new Date().getTime().toString();XiT.aD("pluginupdate",now);}});
this.gp=(function(){$(document).ajaxSuccess(function(e,xhr,settings){if(settings.url.indexOf('?page=planetGiveup')<0){return false;}var data=$.parseJSON(xhr.responseText);if(data["status"]){
delete XiT.data.eS[XiT.T];XiT.aY("planets",XiT.data.eS);}});if(this.V.updatetime=="0"){return false;}var now=new Date().getTime();var hB=60*60*24*this.eo(this.V.updatetime)*1000;var dV=(now-this.eo(
this.data.aG));if(dV>hB){$.getJSON("http://ogametools.com.ar/update.php?format=json&script=137752&u="+this.bL+"&callback=?",this.fg);}});this.hD=navigator.userAgent.toLowerCase().indexOf('chrome')> -
1||navigator.userAgent.toLowerCase().indexOf('opera')> -1;this.aS=(function(key,def){var name="XiT"+this.bL+"_"+key;return localStorage[name]||def;});this.aY=(function(key,value){var name="XiT"+
this.bL+"_"+key;return localStorage[name]=value;});this.bk=(function(key){var name="XiT"+this.bL+"_"+key;delete localStorage[name];});this.fM=(function(){try{var O=this.aS('pluginupdate');if(typeof(O)
!='undefined'&&O!=null){$.extend(this.V,$.parseJSON(this.aS('op','{'+this.bH(this.V)+'}')));this.data.aG=O;var lO=this.aS('version','0');switch(lO){case "2.5":break;case "0":this.V.strloaded="0";
case "2.0":case "2.1":case "2.2":case "2.4":default:this.aY("version","2.5");}}else{var now=new Date().getTime().toString();this.data.aG=now;this.aY("op",'{'+this.bH(this.V)+'}');this.aY("gmark",
this.data.bE);this.aY("player",this.data.k);this.aY("planets",this.data.eS);this.aY("strings",this.data.aL);this.aY("transport",this.data.eE);this.aY("pluginupdate",now);}if(this.V.rapidfire=="null")
this.jJ('serverData');if(this.V.strloaded=="0")this.jJ('techStrings');}catch(e){console.log("Unknown error "+e+".");}});this.ig=(function(){this.bk("pluginupdate");location.href=
"/game/index.php?page=overview";});this.az=(function(){var cd={};var gz=window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(m,key,value){cd[key]=value;});return cd;});this.hI=(function(){
var text=$("#XiTMailText").val();$('#XiTMailtb').dialog('close');$.post('/game/index.php?page=allianceBroadcast',{empfaenger:200,text:text,ajax:1},function(data){$("#XiTMailText").val("");this.be="";
fadeBox(fp.hl,false);})});this.hb=(function(aX){this.be=$("#XiTMailText").val();if(this.be.length>aX){$("#XiTMailText").val(this.be);}else{this.be=$("#XiTMailText").val();}});this.eo=(function(value,
cL){if(value!=""){bS=parseInt(value);bS=(isNaN(bS))?0:bS;bS=(cL)?bS:Math.abs(bS);return bS;}else{return 0;}});this.aD=(function(name,value,fK){this.aY(name,value);if(fK===true){$('#XiTOptionstb')
.dialog('close');}});this.fh=(function(){var aj='<span class="menu_icon"></span>';if(this.cT!="0"){aj='<span class="menu_icon">';aj+='<a href="javascript:;" class="overlay" data-overlay-title="'+
fp.cD+'" data-overlay-inline="#XiTMailtb">';aj+='<img class="mouseSwitch" src="'+this.eu+'" height="29" width="38" rel="'+this.dZ+'">';aj+='</a></span>';}$('#menuTable').append('<li>'+aj+
'<a class="menubutton overlay" data-overlay-title="XiTools Options" data-overlay-modal="true" data-overlay-inline="#XiTOptionstb" href="javascript:;" onclick="XiT.ll();"><span class="textlabel" style="color:rgb(255,0,0);">XiTools</span></a></li>')
;});this.lF=(function(){var nq=
'<a href="javascript:void(0);" class="tooltipHTML overlay" data-overlay-title="XiTools Options" data-overlay-modal="true" data-overlay-inline="#XiTOptionstb" onclick="XiT.ll();" title="XiTools II| Open Control Panel" style="background: url('+
this.lP+')"><img src="http://gf2.geo.gfsrv.net/cdndf/3e567d6f16d040326c7a0ea29a4f41.gif" width="30" height="30" style="border: 1px solid #09F;"></a>';$('#officers').append(nq);});this.ll=(function(){
if(this.lz)return false;this.lz=true;for(var as in this.af){if($("#XiT"+as).attr("type")=="checkbox"){if(this.V[as]=="1"){$("#XiT"+as).prop('checked',true);}}else{$("#XiT"+as).val(this.V[as]);}}
var kw=(this.V.deftodebris=="1")?(1-this.V.defrepfactor):0;$("#XiTunispeed").html("x"+this.bA);$("#XiTdebrisf").html((this.V.debrisfactor*100)+"%");$("#XiTdebrisd").html((kw*100)+"%");$("#XiTversion")
.html("v"+this.version);});this.call=(function(){if(this.ac!=""){eval("this."+this.ac+"();");}});this.gu=(function(){for(var as in this.af){var dY=this.af[as].check;if(dY===null)return false;var bu=
dY;var pattern=/\[|,|\]/;var result=bu.split(pattern);if(!this.eC("#XiT"+as,result)){alert(this.af[as].text);return false;}if($("#XiT"+as).attr("type")=="checkbox"){if($("#XiT"+as).is(":checked")){
this.V[as]="1";}else{this.V[as]="0";}}else{this.V[as]=$("#XiT"+as).val();}};this.aY("op",'{'+this.bH(this.V)+'}');$('#XiTOptionstb').dialog('close');});this.V={updatetime:"1",eblbuildingextend:"1",
eblshortenvalue:"0",ebleasytransp:"1",eblbuildingqueue:"1",eblhld:"1",debrislow:100000,debrishigh:1000000,eblrank:"1",eblhlba:"1",eblcoordlink:"1",eblspy:"0",eblrecy:"0",eblresontransit:"1",
eblfleetlist:"1",eblshorcut:"1",strloaded:"0",eblspioplunder:"1",eblspiodf:"1",eblspiosim:"1",eblosim:"1",eblwebsim:"1",ebldragosim:"0",eblselmess:"0",debrisfactor:"0",deftodebris:"0",defrepfactor:
"0",rapidfire:"null"};this.data={bE:"{}",k:'{"tech":{"queue":{"id":"0","time":""}},"commander":"0","admiral":"0","engineer":"0","geologist":"0","technocrat":"0"}',eS:'{}',aL:'{}',eE:'{}',aG:""};
this.af={updatetime:{check:"notrequired"},eblbuildingextend:{check:"notrequired"},eblshortenvalue:{check:"notrequired"},ebleasytransp:{check:"notrequired"},eblbuildingqueue:{check:"notrequired"},
eblhld:{check:"notrequired"},debrislow:{check:"required,onlyNumber",text:fp.cG,type:"numeric"},debrishigh:{check:"required,onlyNumber[notZero],condition[>,debrislow]",text:fp.bx,type:"numeric"},
eblrank:{check:"notrequired"},eblhlba:{check:"notrequired"},eblcoordlink:{check:"notrequired"},eblspy:{check:"notrequired"},eblrecy:{check:"notrequired"},eblresontransit:{check:"notrequired"},
eblfleetlist:{check:"notrequired"},eblshorcut:{check:"notrequired"},eblspioplunder:{check:"notrequired"},eblspiodf:{check:"notrequired"},eblspiosim:{check:"notrequired"},eblosim:{check:"notrequired"},
eblwebsim:{check:"notrequired"},ebldragosim:{check:"notrequired"},eblselmess:{check:"notrequired"}};this.eC=(function(caller,rules){var fX=false;if(rules[0]=="notrequired"&& !$(caller).val())
return true;for(var i=0;i<rules.length;i++){switch(rules[i]){case "required":if(this.fw(caller))return false;break;case "onlyNumber":if(this.fd(caller,rules,i))return false;break;case "length":if(
this.ff(caller,rules,i))return false;break;case "regex":if(this.eJ(caller))return false;break;case "condition":if(this.fA(caller,rules,i))return false;break;default:}}return true;});this.fw=(function(
bg){var bi=$(bg).attr("type");if(bi=="text"||bi=="password"||bi=="textarea"){if(!$(bg).val()){return true;}}if(bi=="radio"||bi=="checkbox"){et=$(bg).attr("name");if($("input[name='"+et+"']:checked")
.size()===0){return true;}}if(bi=="select-one"){if(($(bg).val()=="")||($(bg).val()=="0")){return true;}}return false;});this.fd=(function(bg,rules,position){var value=$(bg).val();if(!value.match(
/^[0-9\ ]+$/))return true;if(rules[position+1]=="notZero"&&value=="0")return true;return false;});this.ff=(function(bg,rules,position){var value=$(bg).attr('value');var ei=eval(rules[position+1]);
var eR=eval(rules[position+2]);var dF=value.length;if(dF<ei||dF>eR)return true;return false;});this.eJ=(function(bg){var value=$(bg).attr('value');var ey=eval(this.af[bg.replace("#XiT","")].regex);if(
!value.match(ey))return true;return false;});this.fA=(function(bg,rules,position){var value=this.eo($(bg).val());var ez=rules[position+1];var eG=$("#XiT"+rules[position+2]).val();var result=(eval(
value+ez+eG))?false:true;return result;});this.fa=(function(tab){var left=0-(688*tab);$("#XiTsilidertabs span").removeClass("on");$("#XiTsilidertabs span:nth-child("+(tab+1)+")").addClass("on");$(
"#XiTslidersContent").animate({marginLeft:left+"px"},500);});this.format=(function(number){number=this.eo(number,true);var cO=(number<0)?"-":"";number=Math.abs(number);if(
LocalizationStrings['thousandSeperator']==".")return cO+number.toString().split(/(?=(?:\d{3})+(?:,|$))/g).join(".");else return cO+number.toString().split(/(?=(?:\d{3})+(?:.|$))/g).join(",");});
this.R=(function(bu,aP,dN){aP=(aP)?"color:"+aP:"";dN=(dN)?"class='"+dN+"'":"";return "<span style='"+aP+"' "+dN+">"+bu+"</span>";});this.gY=(function(dn){for(var item in dn){if(typeof(dn[item])==
'object'){return true;}}return false;});this.bH=(function(bo,level){var bQ="";var dq="";if(!level){level=0;}var start;if(typeof(bo)=='object'){if(this.gY(bo)){start=0;for(var item in bo){var value=
bo[item];if(start>0){bQ+=',';}dq='"'+item+'":';if(value.substring){bQ+=dq+'"'+value+'"';}else{bQ+=dq+"{"+this.bH(value,level+1)+"}";}start++;}}else{start=0;for(var item in bo){if(start>0){bQ+=',';}
bQ+='"'+item+'":"'+bo[item]+'"';start++;}return bQ;}}else{bQ=bo;}return bQ;});this.dk=(function(a,b){/(\d*):(\d*):(\d*)/.exec(a);var ci=parseInt(RegExp.$1);var cf=parseInt(RegExp.$2);var cu=parseInt(
RegExp.$3);/(\d*):(\d*):(\d*)/.exec(b);var ck=parseInt(RegExp.$1);var dj=parseInt(RegExp.$2);var bW=parseInt(RegExp.$3);if(ci>ck)return 1;else if(ci<ck)return-1;if(cf>dj)return 1;else if(cf<dj)return-
1;if(cu>bW)return 1;else if(cu<bW)return-1;return 0;});this.am=(function(ek){var bh=$(ek);if(!this.hD){return bh.attr("title");}else{if(bh.data("tooltipLoaded"))return bh.data("tipped_restore_title");
else return bh.attr("title");}});this.fH=(function(){var icon=
'<img width="25" height="25" src="http://gf3.geo.gfsrv.net/cdn87/09980161fadf11b18189770e1d78d2.gif" style="position:absolute;left:-28px;">';if(!this.data.eS[this.T][J.j.cX])$(
'#menuTable li:nth-child(2)').prepend(icon);if(!this.data.eS[this.T][J.j.ag])$('#menuTable li:nth-child(3)').prepend(icon);if(!this.data.k.tech[J.bj.bK])$('#menuTable li:nth-child(5)').prepend(icon);}
);this.dX=(function(){try{if(!this.data.eS[this.T]){this.data.eS[this.T]={};this.data.eS[this.T].queue={id:"0",time:""};};O=this.am("#metal_box").match(/<span.*>(.*)<\/span>/gi);
this.data.eS[this.T].m=O[0].replace(/\D/g,'');this.data.eS[this.T].mp=O[2].replace(/\D/g,'');O=this.am("#crystal_box").match(/<span.*>(.*)<\/span>/gi);this.data.eS[this.T].c=O[0].replace(/\D/g,'');
this.data.eS[this.T].cp=O[2].replace(/\D/g,'');O=this.am("#deuterium_box").match(/<span.*>(.*)<\/span>/gi);this.data.eS[this.T].d=O[0].replace(/\D/g,'');this.data.eS[this.T].dp=O[2].replace(/\D/g,'');
O=this.am("#energy_box").match(/<span.*>(.*)<\/span>/gi);this.data.eS[this.T].ene=O[0].replace(/[^0-9\-]/g,'');this.data.eS[this.T]['coords']=this.cj;this.data.eS[this.T]['type']=this.jE;
this.data.eS[this.T]['upd']=serverTime.getTime().toString();if(this.jE=="moon"){this.data.eS[this.T].temp=["0","0"];}else{if(!this.data.eS[this.T].temp){if(O=this.am('#rechts a[href*="&cp='+this.T+
'"]').split(/<br>|<br\/>/i)[2]){this.data.eS[this.T].temp=O.match(/(\-?[0-9]{1,3})/gi)}}}var selector="";switch(currentPage){case "resources":selector='#buttonz li div[class*="supply"]';break;
case "station":selector='#buttonz li div[class*="station"]';break;case "research":selector='#buttonz li div[class*="research"]';break;case "overview":this.data.eS[this.T].temp=textContent[3].match(
/(\-?[0-9]{1,3})/gi);this.data.k.commander=($("a.pic1").hasClass("on"))?"1":"0";this.data.k.admiral=($("a.pic2").hasClass("on"))?"1":"0";this.data.k.engineer=($("a.pic3").hasClass("on"))?"1":"0";
this.data.k.geologist=($("a.pic4").hasClass("on"))?"1":"0";this.data.k.technocrat=($("a.pic5").hasClass("on"))?"1":"0";default:this.aD('planets','{'+this.bH(this.data.eS)+'}');this.aD('player','{'+
this.bH(this.data.k)+'}');return false;}if(currentPage=="research"){var bv=this.data.k.tech;}else{var bv=this.data.eS[this.T];}bv.queue.id="0";bv.queue.time="";$(selector).each(function(){var bh=$(
this).attr('class').split(" ")[0].match(/([0-9]{1,3})/i)[1];var eg=$(this).find("span.level").text().match(/([0-9]{1,6})/i)[1];bv[bh]=eg;if(bh!="212"&&$(this).find("span.eckeoben").text()){
bv.queue.id=bh;bv.queue.time=serverTime.getTime()+parseInt($("#box script:last").html().match(/baulisteCountdown\([^;]*;/gi)[0].split(",")[1]+"000");}});if(currentPage=="research"){this.aD('player',
'{'+this.bH(this.data.k)+'}');}this.aD('planets','{'+this.bH(this.data.eS)+'}');}catch(e){console.log("dX() error: "+e+".");$('#menuTable').after(
'<span style="color:rgb(255,0,0);"><b>ERROR</b></span>');}});this.eA=(function(){switch(currentPage){case "resources":case "station":case "research":case "shipyard":case "defense":break;default:
return false;}$(document).ajaxSuccess(function(e,xhr,settings){if(settings.url.match(/page=resources|page=station|page=research|page=shipyard|page=defense/g)){if(XiT.V.eblbuildingextend.aT()){var bh=
XiT.eo(bw("#detail",true).find("input[name='type']").val());XiT.cN(bh,1,true);}}});});this.ah=(function(value,to,nd){if(this.V.eblshortenvalue.aT()){var ep=0;var dQ='';var fc=(value<0)?true:false;
value=Math.abs(value).toString();if(value.length>to){if(value.length-3<to){}else if(value.length-6<to){value=parseFloat(value)/Math.pow(10,6);dQ=LocalizationStrings['unitMega'];}else if(value.length-
9<to){value=parseFloat(value)/Math.pow(10,9);dQ=LocalizationStrings['unitMilliard'];}ep=(nd==true)?0:((value-Math.floor(value)==0)?0:2);}if(fc)value=0-value;return number_format(value,ep)+dQ;}
return this.format(value);});this.bm=null;this.cN=(function(id,aX,eI){var by=bw("#detail");var dK=by.find("input[id='number']").attr('name');var ao=this.data.eS[this.T];if(aX<1)aX=1;if(!dK){var aQ=(
currentPage=="research")?this.data.k.tech[id].bn():ao[id].bn();var L=J.aM.fe(id,aQ);}else{var L=J.aM.fe(id,aX);}dE=(J.j.cX==id||J.j.bY==id||J.j.eZ==id||J.j.dw==id||J.j.dH==id||J.dJ.cc==id)?true:false;
if(eI){var ee=by.find(".enter").html();var bz=by.find("#resources");bz.html("");by.find("#action li").not(":first,.techtree,.demolish").remove();if(L.m>0){bz.append(
'<li class="metal tipsXiBR"><img src="http://gf3.geo.gfsrv.net/cdn59/ccdb3fc0cb8f7b4fc8633f5f5eaa86.gif"><br><span id="XdetailMetal" class="cost" style="color:white;"></span></li>');}if(L.c>0){
bz.append('<li class="metal tipsXiBR"><img src="http://gf2.geo.gfsrv.net/cdna9/452d7fd11d754e0f09ec2b2350e063.gif"><br><span id="XdetailCrystal" class="cost" style="color:white;"></span></li>');}if(
L.d>0){bz.append('<li class="metal tipsXiBR"><img src="http://gf1.geo.gfsrv.net/cdn9c/e37d45b77518ddf8bbccd5e772a395.gif"><br><span id="XdetailDeu" class="cost" style="color:white;"></span></li>');}
if(L.e>0||dE){bz.append('<li class="metal"><img src="http://gf1.geo.gfsrv.net/cdn0f/0d68fe5d39bbb4c94a2372626ec83f.gif"><br><span id="XdetailEnergy" class="cost" style="color:white;"></span></li>');}
if(dK){bz.append('<li class="enter">'+ee+'</li>');if(this.data.k.commander.aT())by.find("#maxlink").remove();by.find("input[id='number']").attr("maxlength","4").attr("autocomplete","off").keyup(
function(){XiT.cN(id,$(this).val());}).focus();by.find("#action li:first span").remove();by.find("#action li:first").append('<span id="XprodTime" class="time"></span>');var bO=J.aM.eK(L);if(bO>0){
by.find("#costs .enter p").append('<a id="maxlink" class="dark_highlight_tablet tooltipLeft js_hideTipOnMobile" title="'+fp.dW+
'" href="javascript:void(0);" onclick="document.forms[\'form\'].menge.value='+bO+';XiT.cN('+id+','+bO+');">[max. '+this.format(bO)+']</a>');}}by.find("#action ul").append('<li>'+fp.cV+
': <span class="time" id="XpossibleInTime"></span></li>');if(this.bm!==null){timerHandler.removeCallback(timerHandler._lastId-1);}this.bm=null;if(this.V.ebleasytransp.aT()){by.find("#action ul").css(
"padding-top","3px").prepend('<li>'+fp.ik+': <a href="javascript:void(0);" onclick="XiT.it(true)" class="lw">'+fp.jo+'</a> | <a href="javascript:void(0);" onclick="XiT.it(false)" class="lr">'+fp.ja+
'</li>');}}var html;var H={};H.m=this.eo(ao.m)-L.m;H.c=this.eo(ao.c)-L.c;H.d=this.eo(ao.d)-L.d;if(L.m>0){html=XiT.ah(L.m,4);if(H.m<0){html+='<br><span class="missing_resource">'+XiT.ah(H.m,4)+
'</span>';}by.find("#XdetailMetal").html(html);}if(L.c>0){html=XiT.ah(L.c,4);if(H.c<0){html+='<br><span class="missing_resource">'+XiT.ah(H.c,4)+'</span>'}by.find("#XdetailCrystal").html(html);}if(
L.d>0){html=XiT.ah(L.d,4);if(H.d<0){html+='<br><span class="missing_resource">'+XiT.ah(H.d,4)+'</span>'}by.find("#XdetailDeu").html(html);}if(L.e>0){var aa=XiT.eo(ao.temp[1],true);H.e=J.aM.fC(aa,
ao[J.dJ.cc])+J.aM.dC(J.j.dw,ao[J.j.dw])-L.e;html=XiT.format(L.e);if(H.e<0){html+='<br><span class="missing_resource">'+XiT.format(XiT.eo(H.e))+'</span>'}by.find("#XdetailEnergy").html(html);}if(dE){
J.data[J.bj.bK].v=XiT.eo(this.data.k.tech[J.bj.bK]);var aa=XiT.eo(ao.temp[1],true);var bK=(id==J.dJ.cc)?J.aM.fC(aa,aX):J.aM.dC(id,aQ+1)-J.aM.dC(id,aQ);var dv=XiT.eo(ao.ene,true)+bK;html=(bK>0?"+":"")+
XiT.format(bK);html+='<br><span class="'+(dv>0?"undermark":"missing_resource")+'">'+(dv>0?"+":"")+XiT.format(dv)+'</span>';by.find("#XdetailEnergy").html(html);}if(dK){if(ao[J.j.ag]){J.data[J.j.ag].v=
ao[J.j.ag].bn();J.data[J.j.aO].v=ao[J.j.aO].bn();by.find("#XprodTime").html(formatTimeWrapper(J.aM.fj(id,aX),2,true," ",false,""));}else{by.find("#XprodTime").html(
'<a href="/game/index.php?page=station">'+fp.au+'</a>')}}var dm=J.aM.fJ(L,H);if(dm===false){by.find("#XpossibleInTime").html(fp.au);}else{if(dm<1)dm= -11;if(this.bm===null){this.bm=
new baulisteCountdown(document.getElementById("XpossibleInTime"),dm);}else{this.bm.countdown.startLeftoverTime=dm;}}if(id==J.j.dH){by.find("#action ul").append('<li>'+fp.cb+
': <span class="time"><span class="missing_resource">-'+J.aM.fl(id,aQ+1)+'</span></span></li>');}if(this.V.eblshortenvalue.aT()){}if(this.V.ebleasytransp.aT()){XiT.jq=XiT.cj+":"+XiT.jE+":"+id+":"+((
dK)?aX:aQ+1)+"#"+L.m+":"+L.c+":"+L.d+"#"+((H.m<0)?Math.abs(H.m):0)+":"+((H.c<0)?Math.abs(H.c):0)+":"+((H.d<0)?Math.abs(H.d):0);}});this.jB=(function(){this.jr=0;if(currentPage.match(/fleet2|fleet3/i))
{var key=this.aS('transpcur');if(key)this.ic(key,this.data.eE[key]);}else{if(currentPage=="fleet1")this.aY('transpcur','');for(var js in this.data.eE){this.ic(js,this.data.eE[js]);}}});this.hL=(
function(key){bw("#transplist").find("#tranps_"+key).remove();--this.jr;if(this.jr==0)$("#transpdiv").remove();delete this.data.eE[key];delete this.iA[key];this.aD('transport','{'+this.bH(
this.data.eE)+'}');});this.it=(function(type){var O=this.jq.split("#");var key=O[0].replace(/:/g,"_");if(type)bu=O[0]+"#"+O[1];else bu=O[0]+"#"+O[2];this.data.eE[key]=bu;this.aD('transport','{'+
this.bH(this.data.eE)+'}');this.ic(key,bu);});this.ic=(function(key,hS){var data=hS.replace("#",":").split(":");var aL=(typeof(this.data.aL)=="object")?this.data.aL:$.parseJSON(this.aS('strings'));if(
this.jr==0){$("div.c-right").after('<div id="transpdiv"><table><tr><td>'+fp.ik+':</td><td><ul id="transplist"></ul></td></tr></table></div>');this.ix("#transplist",true);}var jv=data[6].bn()+
data[7].bn()+data[8].bn();var ln=Math.ceil(jv/5000);var jz=Math.ceil(jv/25000);var iP=aL[data[4]]+"("+data[5]+")"+"|";iP+="<center><span class='undermark'><b>["+data[0]+":"+data[1]+":"+data[2]+"]"+((
data[3]=="moon")?"["+fp.dr+"]":"")+"</b></span>";iP+=(data[6]>0)?"<br><span style='color:#ff6600'>"+fp.cq[0]+": "+this.format(data[6])+"</span>":"";iP+=(data[7]>0)?"<br><span style='color:#00ffff'>"+
fp.cq[1]+": "+this.format(data[7])+"</span>":"";iP+=(data[8]>0)?"<br><span style='color:#377ef8'>"+fp.cq[2]+": "+this.format(data[8])+"</span>":"";iP+="<br>"+aL[202]+": "+this.format(ln);iP+="<br>"+
aL[203]+": "+this.format(jz);iP+="</center>";Tipped.remove('#transplist .tipsXiQT');if(this.iA[key]){this.ix("#transplist").find("#tranps_"+key).attr("title",iP).find(".text").text(data[5]);}else{
var jk=0-(J.iV[data[4]]*40);this.ix("#transplist").append('<li id="tranps_'+key+'" title="'+iP+'" class="tipsXiQT tooltipHTML"><div class="Xelemt" style="background-position:'+jk+
'px 0px"><div class="text">'+data[5]+'</div></div></li>');this.jr++;this.iA[key]=true;}initTooltips("#transplist .tipsXiQT");if(currentPage.match(/fleet1|fleet2|fleet3/i)){if(currentPage=="fleet1"){
var ju='<img src="http://gf2.geo.gfsrv.net/cdn19/062aa653710e661e938117df2a24a6.jpg" width="20" height="20">';ju+=
'<img src="http://gf1.geo.gfsrv.net/cdn0c/f38c9fcab7e958698a7f8013b3cc3e.jpg" width="20" height="20">';this.ix("#transplist").find("#tranps_"+key).append(ju).find(".Xelemt").click(function(){XiT.hL(
key)});this.ix("#transplist").find("#tranps_"+key+" img").eq(0).click(function(){XiT.hT(key,'SC')});this.ix("#transplist").find("#tranps_"+key+" img").eq(1).click(function(){XiT.hT(key,'LC')});}
else if(currentPage=="fleet2"){this.ix("#transplist").find("#tranps_"+key).click(function(){XiT.iu(key)});}else{this.ix("#transplist").find("#tranps_"+key).click(function(){XiT.jb(key,true)});this.jb(
key,false);}}else{this.ix("#transplist").find("#tranps_"+key).attr("onClick","XiT.hL('"+key+"')");}});this.hT=(function(key,priority){var data=this.data.eE[key].replace("#",":").split(":");var ao=
this.data.eS[this.T];var ji=[];var jv=Math.min(ao.m.bn(),data[6].bn())+Math.min(ao.c.bn(),data[7].bn())+Math.min(ao.d.bn(),data[8].bn());if(priority=="SC"){var iy=[J.dJ.gS,J.dJ.he];}else{var iy=
[J.dJ.he,J.dJ.gS];}for(var i=0,l=iy.length;i<l;i++){var hj=iy[i];var iR=$("#button"+hj+" .level").text().replace(/\D/g,'').bn();var H=Math.ceil(jv/J.data[hj].bU);if(iR<1){continue;}if(iR>=H){jv-=
J.data[hj].bU*H;ji.push([hj,H]);break;}else{jv-=J.data[hj].bU*iR;ji.push([hj,iR]);}}if(jv<1){var distance=J.aM.jC(this.cj.split(":"),data);var iC=J.aM.iM(ji,1.0);var duration=J.aM.jy(distance,1.0,iC);
var iJ=J.aM.iX(ji,duration,distance,0);jv+=iJ.total[0];if(jv>0){H=Math.ceil(jv/J.data[ji[ji.length-1][0]].bU);ji[ji.length-1][1]+=H;}}$("input[name*='am']").val("");for(var i=0,l=ji.length;i<l;i++){$(
"input[id='ship_"+ji[i][0]+"']").val(ji[i][1]);}$("input[name='galaxy']").val(data[0]);$("input[name='system']").val(data[1]);$("input[name='position']").val(data[2]);$("input[name='type']").val((
data[3]=="planet")?1:3);$("input[name='mission']").val(3);checkShips('shipsChosen');this.aY('transpcur',key)});this.iu=(function(key){var data=this.data.eE[key].replace("#",":").split(":");$(
"#galaxy").val(data[0]);$("#system").val(data[1]);$("#position").val(data[2]);setTType((data[3]=="planet")?1:3);targetGalaxy=data[0];targetSystem=data[1];targetPosition=data[2];updateVariables();});
this.jb=(function(key,iS){var data=this.data.eE[key].replace("#",":").split(":");var ao=this.data.eS[this.T];data[6]=data[6].bn();data[7]=data[7].bn();data[8]=data[8].bn();var m=Math.min(ao.m.bn(),
data[6]);var c=Math.min(ao.c.bn(),data[7]);var d=Math.min(ao.d.bn(),data[8]);$("input[name='deuterium']").val(d).trigger('onkeyup');$("input[name='metal']").val(m).trigger('onkeyup');$(
"input[name='crystal']").val(c).trigger('onkeyup');if(iS){if((m+c+d)==(data[6]+data[7]+data[8])){delete this.data.eE[key];}else{this.data.eE[key]=data[0]+":"+data[1]+":"+data[2]+":"+data[3]+":"+
data[4]+":"+data[5]+"#"+(data[6]-m)+":"+(data[7]-c)+":"+(data[8]-d);}this.aD('transport','{'+this.bH(this.data.eE)+'}');trySubmit();}});this.kc=(function(bu,dn){if(typeof(dn)!=='object'){return bu;}
var l=dn.length;for(var i=0;i<l;i++){bu=bu.replace("$"+(i+1),dn[i]);}return bu;});this.jJ=(function(jU){function eV(xml){xml=$(xml);XiT.V.debrisfactor=xml.find('debrisFactor').text();
XiT.V.deftodebris=xml.find('defToTF').text();XiT.V.defrepfactor=xml.find('repairFactor').text();XiT.V.rapidfire=xml.find('rapidFire').text();XiT.aY("op",'{'+XiT.bH(XiT.V)+'}');};function fD(html){
var aL=(typeof(XiT.data.aL)=="object")?XiT.data.aL:$.parseJSON(XiT.aS('strings'));html=$(html);html.find("a[href*='page=techtree&tab=2&techID=']").each(function(){var bh=$(this);var kf=bh.attr("href")
.match(/tab=2&techID=(\d{1,3})/)[1];var jS=$.trim(bh.text());aL[kf]=jS;});XiT.V.strloaded="1";XiT.aY("op",'{'+XiT.bH(XiT.V)+'}');XiT.aD('strings','{'+XiT.bH(aL)+'}');};if(jU=="serverData"){var url=
'/api/serverData.xml';var lo=eV;}else if(jU=="techStrings"){var url='/game/index.php?page=techtree&tab=3&techID=1';var lo=fD;}$.ajax({type:'GET',url:url,cache:false,success:lo});});this.kj=(function()
{var kp=this.aS('strings').replace(new RegExp('"|{|}',"g"),'').replace(/,/g,':').split(':');this.jO=[];for(var i=0,l=kp.length;i<l;i+=2){this.jO[kp[i+1]]=parseInt(kp[i],10);}return false;});this.jW=(
function(bu){var bC=0;if(bu.length==0)return 0;if(this.jO===null){this.kj();}if(this.jO!==null&&typeof this.jO[bu]!=="undefined"){bC=this.jO[bu];}else{}return bC;});this.eQ=(function(){if(this.kF)
return false;this.kF=true;if(!this.V.eblbuildingextend.aT()){var fb="<tr><td colspan='3'><font style='color:#FF2525;'>"+fp.ev+"</font></td></tr>";$("#XiInfoProducction table tr").eq(0).after(fb);
return false;}var fv=[];var bd=aw="";var cK=de="";var bp="";var av=bq=bM=0;var gN=1;$("#rechts .smallplanet").each(function(){var gD=$(this);var an=gD.attr("id").replace("planet-","");var fY=gD.find(
".planet-koords").html();var gR=gD.find("a.moonlink").length?true:false;var hd=gD.find(".planet-name").html();var even=(gN%2==0)?'':' class="alt"';if(!XiT.data.eS[an]){bd+="<tr><td><b>"+XiT.R(fY,
'#9C0')+"</b></td><td><a href='index.php?page=overview&cp="+an+"'>"+fp.ab+"</a></td></tr>";aw+="<tr><td><b>"+XiT.R(fY,'#9C0')+"</b></td><td><a href='index.php?page=overview&cp="+an+"'>"+fp.ab+
"</a></td></tr>";}else{var ae=XiT.data.eS[an].mp*24;var cR=XiT.data.eS[an].cp*24;var aZ=XiT.data.eS[an].dp*24;var el=ae+cR+aZ;av+=ae;bq+=cR;bM+=aZ;bd+="<tr><td><b>"+XiT.R(fY,'#9C0')+"</b></td>";bd+=
"<td>"+XiT.R(XiT.ah(el),'lime')+" (<span class='XiCMet'>"+XiT.ah(ae)+"</span> / <span class='XiCCry'>"+XiT.ah(cR)+"</span> / <span class='XiCDeu'>"+XiT.ah(aZ)+"</span>)</td>";bd+="<td>"+
getFormatedDate(XiT.data.eS[an].upd,"[d].[m].[Y] [H]:[i]:[s]")+"</td></tr>";aw+="<tr><td><b>"+XiT.R(fY,'#9C0')+"</b></td>";aw+="<td>"+XiT.R(XiT.ah(el*7),'lime')+" (<span class='XiCMet'>"+XiT.ah(ae*7)+
"</span> / <span class='XiCCry'>"+XiT.ah(cR*7)+"</span> / <span class='XiCDeu'>"+XiT.ah(aZ*7)+"</span>)</td>";aw+="<td>"+getFormatedDate(XiT.data.eS[an].upd,"[d].[m].[Y] [H]:[i]:[s]")+"</td></tr>";}
gN++;});if(this.data.eS[this.T]){var ao=this.data.eS[this.T];var m=ao.mp.bn()*24;var c=ao.cp.bn()*24;var d=ao.dp.bn()*24;cK=XiT.R(XiT.ah(m+c+d),'lime')+" (<span class='XiCMet'>"+XiT.ah(m)+
"</span> / <span class='XiCCry'>"+XiT.ah(c)+"</span> / <span class='XiCDeu'>"+XiT.ah(d)+"</span>)";de=XiT.R(XiT.ah((m+c+d)*7),'lime')+" (<span class='XiCMet'>"+XiT.ah(m*7)+
"</span> / <span class='XiCCry'>"+XiT.ah(c*7)+"</span> / <span class='XiCDeu'>"+XiT.ah(d*7)+"</span>)";}else{cK="<a href='index.php?page=overview&cp="+this.T+"'>"+fp.ab+"</a>";de=
"<a href='index.php?page=overview&cp="+this.T+"'>"+fp.ab+"</a>";}bp+="<tr><td>"+fp.dI+" ["+ao.coords+"] "+fp.cI+":</td><td>"+cK+"</td><td></td></tr>";bp+="<tr class='alt'><td>"+fp.dI+" ["+ao.coords+
"] "+fp.dg+":</td><td>"+de+"</td><td></td></tr>";bp+="<tr><td>"+fp.cS+" "+fp.cI+":</td><td>"+XiT.R(XiT.ah(av+bq+bM),'lime')+" (<span class='XiCMet'>"+XiT.ah(av)+"</span> / <span class='XiCCry'>"+
XiT.ah(bq)+"</span> / <span class='XiCDeu'>"+XiT.ah(bM)+"</span>)</td><td><a href='javascript:void(0);' class='overlay' data-overlay-title='"+fp.ap+" "+fp.cI+
"' data-overlay-inline='#XiInfoProducDay'>"+fp.fN+"</a></td></tr>";bp+="<tr class='alt'><td>"+fp.cS+" "+fp.dg+":</td><td>"+XiT.R(XiT.ah((av+bq+bM)*7),'lime')+" (<span class='XiCMet'>"+XiT.ah(av*7)+
"</span> / <span class='XiCCry'>"+XiT.ah(bq*7)+"</span> / <span class='XiCDeu'>"+XiT.ah(bM*7)+"</span>)</td><td><a href='javascript:void(0);' class='overlay' data-overlay-title='"+fp.ap+" "+fp.dg+
"' data-overlay-inline='#XiInfoProducWeek'>"+fp.fN+"</a></td></tr>";var bX='<table class="list XiTinfotable" style="width:650px;"><tr class="alt"><td width="100">'+fp.cF+'</td><td>'+XiT.R(fp.bZ,
'lime')+'</span> (<span class="XiCMet">'+fp.cq[0]+'</span> / <span class="XiCCry">'+fp.cq[1]+'</span> / <span class="XiCDeu">'+fp.cq[2]+'</span>)</td><td width="140">'+fp.fF+'</td></tr>';$(
"#XiInfoProducction table tr").eq(0).after(bp);$("#XiInfoProducDay").html(bX+bd+"</table>").find("table tr:even").addClass("alt");$("#XiInfoProducWeek").html(bX+aw+"</table>").find("table tr:even")
.addClass("alt");this.mG([av,bq,bM]);});this.mG=(function(aN){var mR=lX="";var aL=(typeof(this.data.aL)=="object")?this.data.aL:$.parseJSON(this.aS('strings'));var lb=J.list.dh.concat(J.list.ew);for(
var lJ in lb){var mL,mX,nr,np,mH,mV;mX=(mL=aN[0]/J.data[lb[lJ]].m)*7;np=(nr=aN[1]/J.data[lb[lJ]].c)*7;mV=(mH=aN[2]/J.data[lb[lJ]].d)*7;var na=Math.floor(Math.min(mL,Math.min(nr,mH)));var mh=
Math.floor(Math.min(mX,Math.min(np,mV)));var md=aL[lb[lJ]];if(lb[lJ]<400){mR+="<tr><td>"+md+"</td>";mR+="<td>"+this.ah(na)+"</td>";mR+="<td>"+this.ah(mh)+"</td></tr>";}else{lX+="<tr><td>"+md+"</td>";
lX+="<td>"+this.ah(na)+"</td>";lX+="<td>"+this.ah(mh)+"</td></tr>";}}var bX='<table class="list XiTinfotable" style="width:400px;"><tr class="alt"><th width="200"></th><th><b>'+XiT.R(fp.cI,'#6F9FC8')+
'<b></th><th width="100"><b>'+XiT.R(fp.dg,'#6F9FC8')+'</b></th></tr>';$("#XiInfoProducShip").html(bX+mR+"</table>").find("table tr:even").addClass("alt");$("#XiInfoProducDef").html(bX+lX+"</table>")
.find("table tr:even").addClass("alt");$("#XiInfoProducDef table td:nth-child(3n+1)").css("text-align","left");$("#XiInfoProducShip table td:nth-child(3n+1)").css("text-align","left");});this.nl=
new Array();this.mT=new Array();this.mk=(function(id,name){var ct={mb:"",mB:0,lU:0,mO: -1,lV:[],mC:0,gE:{},mY:function(id){ct.gE=XiT.mT[id]=$('<div id="playerActivity'+id+
'" class="XiTWAct"> <table class="list" style="width:330px;"> <thead> <tr> <th style="width:90px;">'+fp.nm+'</th> <th style="width:65px;">'+fp.mI+'</th> <th style="width:65px;">'+fp.lE+
'</th> <th style="width:110px;">'+fp.nk+'</th> </tr> </thead> <tbody> </tbody> <tfoot> <tr><td colspan="4">-</td></tr> </tfoot> </table> </div>');ct.gE.dialog({title:fp.nv+' '+name,height:"auto",
width:"345px",position:"center",resizable:false,open:function(event,ui){$(this).parent().find('.ui-dialog-titlebar').append('<a href="javascript:void(0);" onclick="XiT.mk('+id+
',\'#reload#\');" class="fleft" style="margin-right:5px;"><span class="icon icon_reload"></span></a> ');}});ct.gE.dialog("moveToTop");ct.loading();ct.load();},load:function(){if(ct.mO+1<ct.mC){ct.mO++
;ct.mF(ct.lV[ct.mO][0],ct.lV[ct.mO][1],ct.lV[ct.mO][2]);}else{ct.mx();}},reload:function(id){ct.gE=XiT.mT[id];ct.loading();ct.load();},loading:function(){ct.gE.find("table tbody tr").remove();
ct.gE.find("table tfoot td").html("Loading...");},mx:function(){ct.gE.find("table tfoot td").html("Done...");},mF:function(g,s,p){if(ct.mB==g&&ct.lU==s){ct.dX(g,s,p);}else{ct.mB=g;ct.lU=s;$.post(
"/game/index.php?page=galaxyContent&ajax=1",{galaxy:g,system:s},function(data){ct.mb=$(data);ct.dX(g,s,p);});}},dX:function(g,s,p){var aV="<a href='javascript:void(0);' onClick='XiT.iW("+g+","+s+","+
p+");'>["+g+":"+s+":"+p+"]</a>";var tr=ct.mb.find("tbody tr:nth-child("+p+")");var mw="<tr><td>"+aV+"</td>";var mt=ct.mb.find("#galaxytable").attr("data-galaxy");var ng=ct.mb.find("#galaxytable")
.attr("data-system");if(mt!=g||ng!=s){mw+='<td colspan="3">'+fp.nb+'</td></tr>';ct.gE.find("table tbody").append(mw);ct.mx();return false;}if(tr.find('.playername  a[rel="player'+id+'"]').length){
var lW=XiT.R("60+","lime");if(tr.find(".microplanet div.activity").length){if(tr.find(".microplanet div.activity.minute15").length){lW=XiT.R("*","red");}else{lW=XiT.R(tr.find(
".microplanet div.activity.showMinutes").text(),"#ffa800");}}mw+="<td>"+lW+"</td>";if(tr.find(".moon.js_no_action").length){lW="-";}else{if(tr.find(".moon div.activity.minute15").length){lW=XiT.R("*",
"red");}else if(O=tr.find(".moon div.activity.showMinutes").text()){lW=XiT.R(O,"#ffa800");}else{lW=XiT.R("60+","lime");}}mw+="<td>"+lW+"</td>";}else{mw+='<td colspan="2">'+fp.mE+'</td>';}mw+="<td>"+
getFormatedDate(serverTime.getTime(),"[H]:[i]:[s]")+"</td></tr>";ct.gE.find("table tbody").append(mw);ct.load();}};ct.lV=this.nl[id];ct.mC=this.nl[id].length;if(name=="#reload#")ct.reload(id);
else ct.mY(id);});this.eu="data:image/gif;base64,"+"R0lGODlhJgAdAPeeABMaIBUeIhATFAMDBBIaHxYgJhIZHzQ4PBIaHgUKDRAXGy4zNjA1OAQFBwULDRAZHREYHQIDBAQGCAQFCAQF"+
"CAYLDxMaHxQcIAQFBwUKDwMEBC0yNSouMgUHCh0gIgcNERYgJQIEBBAXGgMEBQECAgEBAScsMC4zNQwTFwkMDxQcIQUFBiwxNAME"+
"BAoRFAwREx4jJiktMSoxNAEBAg8WGQQFBg8WGiYrLwMDBBUbIAIDAwIDBAQHCgQGCTA1Nx0jJyYpLCYrLQoTFiAkJwoNEQMEBQEB"+
"AQQGCi8yNQ4XGg8SFBkeHw0UGB4kKQICAhYZGwMEBCgrLwEBAR0iJDM3Ox4hIwMEBS4zNxohJRwiJhofIicqLQgLDQYLDAUGBxUb"+
"HyctMQIDBAQFBSguMhcaHQ8UFxIXGhYfIgcMDwQGCRgfIwkOEgYMEAgOEgwNDw0SFgUGCAQEBAoQExAXHSQpKwcKCyswMyouMyAk"+
"KAUGCgABARgcIBsgIgQFBhYcIAMDAwwRFAYMERofIRYbHgYLDQYJCwECAggNEQUGCQICAhohJgQGCBMbHwYHCRIZHhgbHggNEhYf"+
"JQ8YHREYHgQFBggLDCkwMxMYGxkgIwQFBQAAABMbIDY7PgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0w"+
"TXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUg"+
"WE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpy"+
"ZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91"+
"dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5h"+
"ZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4w"+
"LyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOkQwMUE5OUJGRjZBRkUxMTE5MUZDQzU3MjNDOUM1NjAxIiB4bXBN"+
"TTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ5MzFFNjg2QUZGRDExRTFCMTlERTA3RjgwRkQ2QzM4IiB4bXBNTTpJbnN0YW5jZUlEPSJ4"+
"bXAuaWlkOjQ5MzFFNjg1QUZGRDExRTFCMTlERTA3RjgwRkQ2QzM4IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBD"+
"UzUgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkQ3MUE5OUJGRjZBRkUxMTE5"+
"MUZDQzU3MjNDOUM1NjAxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkQwMUE5OUJGRjZBRkUxMTE5MUZDQzU3MjNDOUM1NjAx"+
"Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn4"+
"9/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66t"+
"rKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNi"+
"YWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgX"+
"FhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAngAsAAAAACYAHQAACP8APQkssKmgwYMIExYQyLChw0gKEUSM6LCiJxATDWS8"+
"gNBiw40aDVwwkEMjgJMdPQ6EgJLAppMwYwLI0RKABUYFVQqUBKBggJ9AgwoNqmITgQc6L04ioEbRAU5Qo0qdysmSCgsACCRVQACC"+
"jCaYnlIde8fCFQKOkOrkmkQGpx9nxI6NOubBAk4PIEDYSoCGHahZ/MgdG0PEXU4i5gDgi4JDVCxfBksFQ2NDVCY2tK4l4MJxVC2X"+
"JHMy8cZyVEAobCSFIuRQjKl7zAy+IYfF1DUucCTt1GmRialDCJWhAvUGmhcMphYy1Gl3J0pRpMJIsWDQCw54uLDgQyR5VESJmuvT"+
"5G0lSFQYdQ5X6aDkBFRBKbxzWsHcOZQtUKd0ODx3SRcfUGUyg3gq8aYDEJx44IV7c0X1SCPJQSEFgR7xZggdHmSCRINTkQEHA3/o"+
"QaFFvM3gRhymcSjVEyuEN2JFvEkhRSUC1GjjjTjaqMOELzrE249ABinkkM4NaeSRPTYURidLIukkb6tRYoUVIUBRJQ5YZhlGGFni"+"wCWWXFqRlCc85HFEGmlQoCYGbLZJCZuUqEnBInQuMqZAbUASCBsV9OlAAn8CmoGghH7wwZ2IJqrooncGBAA7";this.dZ=
"data:image/gif;base64,"+"R0lGODlhJgAdAPe8ABMaIGI5FycmIwMDBBIaHxYgJhIZHwUKDRIaHgULDQQFBxAXGxEYHdqFPAQGCAIDBO+SQeSMPwUKDxQcIAQF"+
"BwMEBAQFCAQFCAYLD+aMQA8WGgMDBNyGPAQFBgEBAgMEBc9/OdGAOQMEBBYgJQcNEQwTFwECAgEBARUbIBAZHQIEBMR5OAoRFAID"+
"BEMzJBsSCWNDJ4lVKCkbEg0KCHlMJAoFAw4QDnhLIwIDA7FtMyobDxcLBYpVJyYXChkQB0UrFYxUJCQTBqhpNEEwILBsMsV5N6ho"+
"M65qMLJuNnRFHQEBAe+SQqhqNUgqEMV6OQQHCgUGCiAXDxkaGiUUCB4UDNKAOuWLPwIDBD4rHA8WGTwpGAgNEolTJRUOCSUjIgAB"+
"AQMEBQQGCgMEBWZFK2ZAIBAXHQwNDbNxNwkGBQoTFhkeIQgNEadqNg4XGhkcHItWKAQFBhYWFmVEKMN4NxwZFQICArFuNSMjIhIZ"+
"HhoXFA8YHahoMQQDAtF/OT8sHUQxIadpNAgOErFwN7JwNo9ZKgoJBsR6ORYfJXVGHhMbHwYEBAQGCRcZGB4cGalqNiEeGwEBASEg"+
"Ha9rMdF/OAECAhweHxgNBa5pL0U0Ja1pLxMTEwQGCF8+I8V6O4ZSJqlpMxYcIDgtJREYHisfFA8NCxkTDgYMEDUjFQYMEUc1J0Em"+
"DXZHHyQhIHdKIigaDWJAJIhVKb10NQcFBBMaH69rMgQFBmJCJgQGCQAAABMbIPKTQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0w"+
"TXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUg"+
"WE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpy"+
"ZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91"+
"dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5h"+
"ZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4w"+
"LyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOkQwMUE5OUJGRjZBRkUxMTE5MUZDQzU3MjNDOUM1NjAxIiB4bXBN"+
"TTpEb2N1bWVudElEPSJ4bXAuZGlkOkNERUM0OENDQUZGRDExRTE5OEVBRTM2NjYzRDQ2RTYwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4"+
"bXAuaWlkOkNERUM0OENCQUZGRDExRTE5OEVBRTM2NjYzRDQ2RTYwIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBD"+
"UzUgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkQ5MUE5OUJGRjZBRkUxMTE5"+
"MUZDQzU3MjNDOUM1NjAxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkQwMUE5OUJGRjZBRkUxMTE5MUZDQzU3MjNDOUM1NjAx"+
"Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn4"+
"9/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66t"+
"rKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNi"+
"YWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgX"+
"FhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAvAAsAAAAACYAHQAACP8AeQkskKugwYMIExYQyLChw0MKEUSM6LAirxETDWSc"+
"gNBiw40aDUwwgEIjgJMdPQ5kgJJArpMwYwJA0RLArEQFVQrUA6DgHQFAgwodGlRNLgIpdF4URSBUqgy6okqdSlUXGy+gABBQuoAA"+
"A0FjMEGtStYRq06V8CTV2bXNmSVyXIwlK5VJJCe63DBgwJVAlkG6IMD4E4FuVCGPDEWVUgZA3xJIokKwNaQwWUCNVkhlpGErWwIs"+
"7EiF8MqP5amf6GiWGqeEBqUi0qzJMRUCJyyndRnJM4eqJhYblO7atYkIVVhmtFiJusfGqAZUSVHaJXxXLVpTY0QBQeZULEKlitDe"+
"kAFd6ow61HUOFyNJ6hsqVaJ66vIDRNQbOsrrKjS9uogjUfHwQgiG6dKKK+Wh4UF6Kg2HwyW6cOEDgQXqskoPHOgiCyQMejQcJZkA"+
"YUkfFUqFyBQcKPJFhxYN50ETO0xS4lRJBMHHcNVBAokqAfTo449A+lgDhyxWNNyRSCap5JLVLenkk0U6dMUuU0JpJY46iVCLGGKo"+
"IIKXG4Qp5hVXiLlBmWGWKYZSvDwBRRi33HLBnBTUaWctddYy5wWb9LkJmwIFsgUqpmBgaAIHIJqoBIs2SgIJgEYq6aSUAhoQADs=";this.lP="data:image/jpg;base64,"+
"/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABQAAD/4QN6aHR0cDovL25zLmFkb2JlLmNvbS94YXAv"+
"MS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5z"+
"Ong9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjUtYzAxNCA3OS4xNTE0ODEsIDIwMTMvMDMvMTMt"+
"MTI6MDk6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3lu"+
"dGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hh"+
"cC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1s"+
"bnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6Y2Zk"+
"ZTgyMmEtYzhiYy1hMDQ2LWIyMWUtNzcwM2ZhY2VkOWZmIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjAzMjE1RDg2NDhBMzEx"+
"RTNBREYzRDRFMzFBNjA5MTQ0IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjAzMjE1RDg1NDhBMzExRTNBREYzRDRFMzFBNjA5"+
"MTQ0IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RS"+
"ZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyYjk5NTA0Zi0zMWQyLWIwNDQtYjE0NS1hNThhMjdkMTM1MzAiIHN0UmVmOmRvY3VtZW50"+
"SUQ9InhtcC5kaWQ6Y2ZkZTgyMmEtYzhiYy1hMDQ2LWIyMWUtNzcwM2ZhY2VkOWZmIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3Jk"+
"ZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4AJkFkb2JlAGTAAAAAAQMAFQQDBgoNAAAFqgAABs8AAAeg"+
"AAAIoP/bAIQAAgICAgICAgICAgMCAgIDBAMCAgMEBQQEBAQEBQYFBQUFBQUGBgcHCAcHBgkJCgoJCQwMDAwMDAwMDAwMDAwMDAED"+
"AwMFBAUJBgYJDQsJCw0PDg4ODg8PDAwMDAwPDwwMDAwMDA8MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8IAEQgAIAAgAwER"+
"AAIRAQMRAf/EAKkAAAMBAQAAAAAAAAAAAAAAAAYHCAQFAQADAQAAAAAAAAAAAAAAAAABAgMAEAABBAEDBQEAAAAAAAAAAAADAQIE"+
"BQYQMBMAIBESFBURAAICAAUBBwMFAAAAAAAAAAECAwQAESESBTFBUWFxgSITMlIUgrIzUwYSAQAAAAAAAAAAAAAAAAAAAEATAQEB"+
"AAMAAgICAwAAAAAAAAERACExQRBRYXGBsfCRof/aAAwDAQACEQMRAAABg1g850P0M8WnyAScZszoB1iDKx5iwFOJSnKpgGoFWewb"+
"/9oACAEBAAEFAvDfTEmDDPz2ED9NscIn8athjKrgrJJKkZNxFljVX11PKRKil+mDQMoFuYIiMQde9BTZVwBJUU1LQ47/AP/aAAgB"+
"AgABBQJdVXsbs//aAAgBAwABBQLVNV6ds//aAAgBAgIGPwIH/9oACAEDAgY/Agf/2gAIAQEBBj8CBHrninKadbk4lljLxNt39dfq"+
"018cWWWjW4qvn7YwqiVztUD2poBppizWvj8cora7cyHA0HriOx3Thc/054S9+O1N/lKDkaxyXf12snTx0xNyMaHmpqaRzWuRmGSR"+
"qWVD8ceX1E6DPC21YuLEUkYl+815HhDHzRVxYh/reKyo71GaN+4Y/wBFxEyh/mijuVe3KSLtHmGxzHE2QK123crV3eQjJVbJwS3c"+
"Ac8OlCQyQ8VVs245nG1pEeZ9uniq7ssQyJJHvjXIxsRqMsiCPHCqZFjilzjZydAG78XIYJ61gczVrxSyxy/xj4Qk2rZe7Tb64v7u"+
"VpNcs1nEiRTo232bURQD2dMf/9oACAEBAwE/IUbNQEJF+uXSuRGEgAahSf2Ms5DxkIA9Qdqq40Eb3J8fM44Cj/TZHVFq8kD7pHsK"+
"eO6Q2bKBqyh/My7asKmT1SfzkKNiXR/vv8ONVJBPHcy5hwUlFqFA3rVSUyALvH9Y3VsORqY8gUcc6SSV6U/vBzIygDHAR9ZynGC6"+
"VE1tpQoPvf/aAAgBAgMBPyHpujXJKGX56/DnCj8pg3//2gAIAQMDAT8hMF0wLzp8K6uPgxpfg+Lv/9oADAMBAAIRAxEAABCS0Lh3"+
"pNT/2gAIAQEDAT8QfhG3Hb4UAHmGidUGBS1GcTaQNytkkDY4GBgzk1dLjayjgR5dcj1lSCdA0JRE9vOSTyxH7VoUUj0MRxJqgw6f"+
"k45JxZaTrk5lbpyl0ITKngT+Sjjr6MO32BQURwBn6fTH0dPADrIiV9ZRUaZ71A0JovXEdEqEBxGP0ePHGfWSbCCwGWj95FOa5lis"+
"C9g23FLY08GRXIq593//2gAIAQIDAT8QgBlaTXaYhE3j+NRP1rGeZnMb+dFD5nKo7j1uNe49H3JxvbLa7//aAAgBAwMBPxDCUuSE"+"c9jeC/t3A3fOooAHh/l3Ig95y3/m6Jumgc79ZRx9ZAQ3/9k=";this.ac=call;this.be="";this.jq="";this.jr=0;
this.iA={};this.lz=false;this.kF=false;this.jO=null;this.bL=document.getElementsByName('ogame-universe')[0].content;this.bA=document.getElementsByName('ogame-universe-speed')[0].content;this.hU=
document.getElementsByName('ogame-player-id')[0].content;this.fG=document.getElementsByName('ogame-player-name')[0].content;this.cT=document.getElementsByName('ogame-alliance-id')[0].content;this.gA=
document.getElementsByName('ogame-alliance-tag')[0].content;this.gK=document.getElementsByName('ogame-alliance-name')[0].content;this.T=document.getElementsByName('ogame-planet-id')[0].content;
this.gw=document.getElementsByName('ogame-planet-name')[0].content;this.cj=document.getElementsByName('ogame-planet-coordinates')[0].content;this.jE=document.getElementsByName('ogame-planet-type')
[0].content;this.eY=(currentPage.match(/techinfo|notices|showmessage|phalanx|buddies|^search/i))?false:true;this.fM();if(this.V.eblbuildingextend.aT()){this.data.eS=$.parseJSON(this.aS('planets'));
this.data.k=$.parseJSON(this.aS('player'));if(this.V.ebleasytransp.aT()){this.data.aL=$.parseJSON(this.aS('strings','{}'));this.data.eE=$.parseJSON(this.aS('transport','{}'));}}if(this.eY){this.lF();
this.call();if(this.V.eblbuildingextend.aT()){this.dX();this.fH();if(this.V.ebleasytransp.aT()&&currentPage.match(/resources|station|research|shipyard|defense|fleet1|fleet2|fleet3/i)){this.jB();}
this.eA();}}};function hx(){XiTClass.prototype.eW=false;XiTClass.prototype.ku=(function(){this.ib=this.az()['galaxy'];this.kb=this.az()['system'];this.kJ=(this.az()['position'])?this.az()['position']:
this.az()['planet'];this.data.bE=$.parseJSON(this.aS('gmark'));$("#galaxyheadbg td").append('<div style="position:absolute; right:42px;top:42px;"> '+fp.eD+
' </div> <div id="showmark" style="position:absolute; right:15px;top:38px"> <a href="javascript:;" id="listmarked"><img src="http://gf2.geo.gfsrv.net/cdnad/5133388a9b6282d6c7e7f00e2beb6e.gif"></a> </div>')
;$("#galaxyheadbg").after('<tr id="trmarked" style="display:none"><td style="background-color:#0D1014;text-align:center;"><div></div></td></tr>');$("#showmark a").click(function(){if($(this).hasClass(
"markedOpen")){$("#trmarked").slideUp();$(this).removeClass('markedOpen');$(this).children().attr("src","http://gf2.geo.gfsrv.net/cdnad/5133388a9b6282d6c7e7f00e2beb6e.gif");}else{var O=XiT.ks();$(
"#trmarked").slideDown();$(this).addClass('markedOpen');$(this).children().attr("src","/cdn/img/layout/fleetCloseAll.gif");}return false;})});XiTClass.prototype.eN=(function(){return galaxy});
XiTClass.prototype.ft=(function(){return system;});XiTClass.prototype.iW=(function(er,en,eW){this.eW=(eW)?eW:false;$("#galaxy_input").val(er);$("#system_input").val(en);submitForm();});
XiTClass.prototype.lL=(function(er,en,ec){var gs=$("div#planet"+ec+" h1 .textNormal").text();var key="["+er+":"+en+":"+ec+"]";if(!gs)gs="unknown";this.data.bE[key]=gs;$(
"#galaxytable tbody tr:nth-child("+ec+")").css("background-image","url("+ij+")");$('#planet'+ec+' a[rel="rel-mark"]').hide();$('#planet'+ec+' a[rel="rel-unmark"]').show();this.aD('gmark','{'+this.bH(
this.data.bE)+'}');});XiTClass.prototype.mW=(function(er,en,ec){var key="["+er+":"+en+":"+ec+"]";delete this.data.bE[key];$("#galaxytable tbody tr:nth-child("+ec+")").css("background-image","url("+kg+
")");$('#planet'+ec+' a[rel="rel-mark"]').show();$('#planet'+ec+' a[rel="rel-unmark"]').hide();this.aD('gmark','{'+this.bH(this.data.bE)+'}');});XiTClass.prototype.kE=(function(hZ,eL){var text=
'<a href="javascript:void(0);" onClick="XiT.lL('+this.eN()+','+this.ft()+','+eL+');" rel="rel-mark" '+((hZ)?'style="display:none"':'')+'><img src="'+jR+'" height="16" width="16" class="btnmark"></a>';
text+='<a href="javascript:void(0);" onClick="XiT.mW('+this.eN()+','+this.ft()+','+eL+');" rel="rel-unmark" '+((hZ)?'':'style="display:none"')+'><img src="'+lB+
'" height="16" width="16" class="btnmark"></a>';return text;});XiTClass.prototype.ks=(function(){var eS=[];for(var i in this.data.bE){eS.push(i);}eS.sort(this.dk);var table="<table><tr>";var iO=0;for(
var p=0;p<eS.length;p++){var aV=eS[p];if(++iO>4){iO=0;table+="</tr><tr>"}ia=aV.replace(/\[|\]/g,"").split(":");table+="<td>"+this.data.bE[aV]+" <a href='javascript:void(0);' onClick='XiT.iW("+ia[0]+
","+ia[1]+");'> "+aV+"</a></td>";}if(p==0)table+="<td>"+fp.cU+"</td>";table+="</tr></table>";bw("#trmarked td div").html(table);return false;});XiTClass.prototype.kq=(function(k){$.ajax({type:'GET',
url:'/api/playerData.xml?id='+k,cache:false,dataType:'xml',success:function(data){var xml;if(typeof data=='string'){xml=new ActiveXObject('Microsoft.XMLDOM');xml.async=false;xml.loadXML(data);}else{
xml=data;}var fR=new Array();var ej=new Array();var fB="";var O=0;$(xml).find('planet').each(function(){var id=$(this).attr('id');var name=$(this).attr('name');var coords=$(this).attr('coords').split(
":");var eF="["+$(this).attr('coords')+"]";var galaxy=coords[0];var system=coords[1];var pos=coords[2];var kd=$(this).find("moon").length?true:false;var kB=(O==0)?true:false;fR.push(eF);ej[eF]=
new Array();ej[eF][0]=id;ej[eF][1]=name;ej[eF][2]=$(this).attr('coords').split(":");ej[eF][3]=kd;ej[eF][4]=kB;O++;});fR.sort(XiT.dk);XiT.nl[k]=new Array();for(var i=0;i<fR.length;i++){jT=(i<9)?("0"+(
i+1)):(i+1);eO=fR[i];fB+="<br>"+jT+" - <a href='javascript:void(0);' onClick='XiT.iW("+ej[eO][2][0]+","+ej[eO][2][1]+","+ej[eO][2][2]+");'>";fB+="["+ej[eO][2][0]+":"+ej[eO][2][1]+":"+ej[eO][2][2]+"]";
fB+=(ej[eO][4])?(" ["+fp.cB+"]"):"";fB+=(ej[eO][3])?(" ["+fp.dr+"]"):"";fB+="</a>";XiT.nl[k].push(ej[eO][2]);}var mr=$(xml).find('playerData').attr('name');var hw="<u>"+fp.cF+":</u>";hw+=fB+
"<br><br>";hw+="<div class='splitLine'></div><a href='javascript:void(0);' onClick='XiT.mk("+k+",\""+mr+"\");'>"+fp.mN+"</a><div class='splitLine'></div>";hw+="<br><u>"+fp.ce+":</u>";$(xml).find(
'position').each(function(){var line="";var ha="<span class='%c'>"+XiT.format($(this).attr('score'))+"</span>";var ko=($(this).attr('score')>=0)?"undermark":"overmark";var dh=$(this).attr('ships');ha=
ha.replace("%c",ko);lx="<span class='"+(($(this).text()<100)?"overmark":"undermark")+"'><strong>"+XiT.format($(this).text())+"</strong></span>";line=fp.bG[$(this).attr('type')].replace("%t",lx)
.replace("%p",ha);line+=(dh)?'<br><span style="margin-left:40px;"><i>(<span style="color:#FF6">'+XiT.format(dh)+'</span> '+fp.bG[8]+')</i></span>':'';hw+="<br>"+line;});XiT.gJ[k]=hw;$("#player"+k+
" div.player-more").html(hw);$("div#player"+k).each(function(){Tipped.refresh($(this)[0]);});}});});XiTClass.prototype.gJ={};$(document).ajaxSuccess(function(e,xhr,settings){if(settings.url.indexOf(
'?page=galaxyContent')<0)return false;var eP=bw("#galaxytable",true);if(XiT.V['eblcoordlink']=="1"){if(XiT.eN()==XiT.ib&&XiT.ft()==XiT.kb){var iQ=XiT.eo(XiT.kJ);if(iQ>0){eP.find("tr.row:nth-child("+
iQ+")").css("border","1px solid red").css("margin","-1px");}}}if(XiT.V.eblspy.aT()&&XiT.data.k.commander=="0"){eP.find('div[id*="moon"]:not(.XiT-done)').each(function(){var jm=$(this);jm.addClass(
"XiT-done");var eL=jm.attr('id').replace("moon","");var kO=eL.bn();var kT=$.trim(eP.find('tr:nth-child('+kO+') .playername span[class*="status_abbr_"]:first').html());var kv=XiT.eo($.trim(eP.find(
"#probeValue").html()));if(XiT.fG!=kT&&kv>0){eP.find("#moon"+eL+" .ListLinks").append('<li><a href="/game/index.php?page=fleet1&galaxy='+XiT.eN()+'&system='+XiT.ft()+'&position='+eL+
'&type=3&mission=6&p='+spionageAmount+'">'+fp.ai+'</a></li>');}});}if(XiT.V.eblhld.aT()||XiT.V.eblrecy.aT()){eP.find('div[id*="debris"]:not(.XiT-done)').each(function(){var ed=$(this);ed.addClass(
"XiT-done");var eL=ed.attr('id').replace("debris","");var gI=ed.find(".ListLinks li:first").html();var bJ=parseInt(gI.substring(gI.lastIndexOf(" "),gI.length).replace(/\./g,""));var ga=ed.find(
".ListLinks li:nth-child(2)").html();var bI=parseInt(ga.substring(ga.lastIndexOf(" "),ga.length).replace(/\./g,""));var jl=bJ+bI;if(XiT.V.eblrecy.aT()&&XiT.data.k.commander=="0"){var jF=ed.find(
".ListLinks .debris-recyclers").html();var km=parseInt(jF.substring(jF.lastIndexOf(" "),jF.length).replace(/\./g,""));var kt=XiT.eo($.trim(eP.find("#recyclerValue").html()));if(kt>0){ed.find(
".ListLinks li:last").html('<a href="/game/index.php?page=fleet1&galaxy='+XiT.eN()+'&system='+XiT.ft()+'&position='+eL+'&type=2&mission=8&r='+km+'">'+fp.dR+'</a>');}else{ed.find(".ListLinks li:last")
.html('<a href="#" onclick="fadeBox(\''+fp.gr+'\',true,\'\');return false">'+fp.dR+'</a>');}}if(XiT.V.eblhld.aT()){if(jl>=XiT.V['debrishigh']){eP.find('a[rel="debris'+eL+'"] img').attr("src",kH);}
else if(jl>=XiT.V['debrislow']){eP.find('a[rel="debris'+eL+'"] img').attr("src",kS);}}});}eP.find('td[rel*="planet"]:not(.XiT-done)').each(function(){$(this).addClass("XiT-done");var eL=$(this).attr(
'rel').replace("planet","");var tr=eP.find("tbody tr:nth-child("+(eL.bn())+")");var hv=tr.find(".allytag span:first").attr("rel");var kh=tr.find(".planetname").hasClass('status_abbr_buddy');var ie=(
XiT.data.bE["["+XiT.eN()+":"+XiT.ft()+":"+eL+"]"])?true:false;var jL=XiT.kE(ie,eL);$("#planet"+eL+" h1").append(jL);if(hv)hv=hv.replace('alliance','');else hv="-1";if(ie){tr.css("background-image",
"url("+ij+")");}else if(kh&&XiT.V.eblhlba.aT()){tr.css("background-image","url("+jN+")");}else if(hv==XiT.cT&&XiT.V.eblhlba.aT()){tr.css("background-image","url("+kz+")");}hc=tr.find('td.playername');
var k=hc.find('a[rel*="player"]').attr('rel');if(typeof(k)!=="undefined"&&k!="player"&&k!="player99999"){gj=k.replace("player","");if(XiT.V['eblrank']=="1"){var je=hc.find("#player"+gj+" li.rank a")
.html();if(je)hc.find("span.status").append(" #"+je);}var iG="<br style='clear:both'><div class='splitLine'></div><div class='player-more'>";if(typeof(XiT.gJ[gj])!='undefined'){iG+=XiT.gJ[gj]+
"</div>";}else{iG+="<a href='javascript:void(0);' onClick='XiT.kq("+gj+");'>"+fp.cE+"</a></div>";}hc.find("ul.ListLinks:not(.XiT-listed)").after(iG);if(XiT.eW&&XiT.eW==eL){hc.find('a[rel*="player"]')
.trigger('mouseenter').trigger('mousemove');XiT.eW=false;}}});});var kS="data:image/gif;base64,"+"R0lGODlhHgAeANU1APDoLk1KBkdEBZuVC19bB+/mG0lGBu7kEfDnJfDnKkNABbewDdDID1RRBq6nDeDXEFBNBvDoLIF8CaihDLSt"+
"DXRvCYWACu/mFk9MBvDnIVpWB15aB8jADoqEClZTBnJtCNfOD8G5DpCKC+TbEGdjCGllCGNfB4N+CpSOC2xoCOrhEZKMC6WeDHp1"+
"CW5qCIeCCr21DoyGCmVhCHZxCdvSEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFj"+
"a2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpu"+
"czptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAg"+
"ICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8"+
"cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIg"+
"eG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0"+
"cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjVCOTYzNzUzRTQyMEUx"+
"MTE4MTQwQTZERkE2QzVFQjI1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU0MzVBODNGMjBFQzExRTFCMkVEODUxNDgxQjc3"+
"MjNEIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU0MzVBODNFMjBFQzExRTFCMkVEODUxNDgxQjc3MjNEIiB4bXA6Q3JlYXRv"+
"clRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4"+
"bXAuaWlkOjYwOTYzNzUzRTQyMEUxMTE4MTQwQTZERkE2QzVFQjI1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjVCOTYzNzUz"+
"RTQyMEUxMTE4MTQwQTZERkE2QzVFQjI1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hw"+
"YWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bF"+
"xMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6"+
"eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAv"+
"Li0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAANQAsAAAAAB4AHgAABv/AmnBILBqP"+
"yKRyyWwWBSSNAqmAaAgV0lRJuBwmH4jRwzkUEoWBOAkBAQAIxqAkGBIy7zzjtD4O8m8HHCgECg0XgG8XLkkVCIkACTQbAQeJDB8B"+
"SRsPkAAPDQYjeREOGEsCMJ4sCgGjABcWBk1/iQgnNQKjIDJLs0IfBYkHBLkgC6c1HhIaQwpYFg4iQh6dgAuzBs0CGxZuFJpCAxFv"+
"CQO5qm8IFB5FFSp5CB1DGgOWcCcKIgkAIxJ1RTY4EPbGQRETId4wUOCIQ7EkJRbws2AEg4gMBVIEaNFAwIAVRsI1iBGCBBIXKiYI"+
"ENBAosEAGAi0mMBgAgEDAQIAPNIghYF5D9ZY1JDA4N6bAg5KJEtiAAWeNxNqLPAEoMACCUgMmJgKyOAKclRDIGmBKBGFoU8TRWDx"+
"0AgJDmDziE1hNI+5JRAkwMvDoQYnWyvCLTExgQKKFyVqNGAAKIMIwUxyFqGQp8A8J0nGVX2BWUkHNBQ7J5nx4LLo00OCAAA7";var kH="data:image/gif;base64,"+
"R0lGODlhHgAeAPcAAP//////zP//mf//Zv//M///AP/M///MzP/Mmf/MZv/MM//MAP+Z//+ZzP+Zmf+ZZv+ZM/+ZAP9m//9mzP9m"+
"mf9mZv9mM/9mAP8z//8zzP8zmf8zZv8zM/8zAP8A//8AzP8Amf8AZv8AM/8AAMz//8z/zMz/mcz/Zsz/M8z/AMzM/8zMzMzMmczM"+
"ZszMM8zMAMyZ/8yZzMyZmcyZZsyZM8yZAMxm/8xmzMxmmcxmZsxmM8xmAMwz/8wzzMwzmcwzZswzM8wzAMwA/8wAzMwAmcwAZswA"+
"M8wAAJn//5n/zJn/mZn/Zpn/M5n/AJnM/5nMzJnMmZnMZpnMM5nMAJmZ/5mZzJmZmZmZZpmZM5mZAJlm/5lmzJlmmZlmZplmM5lm"+
"AJkz/5kzzJkzmZkzZpkzM5kzAJkA/5kAzJkAmZkAZpkAM5kAAGb//2b/zGb/mWb/Zmb/M2b/AGbM/2bMzGbMmWbMZmbMM2bMAGaZ"+
"/2aZzGaZmWaZZmaZM2aZAGZm/2ZmzGZmmWZmZmZmM2ZmAGYz/2YzzGYzmWYzZmYzM2YzAGYA/2YAzGYAmWYAZmYAM2YAADP//zP/"+
"zDP/mTP/ZjP/MzP/ADPM/zPMzDPMmTPMZjPMMzPMADOZ/zOZzDOZmTOZZjOZMzOZADNm/zNmzDNmmTNmZjNmMzNmADMz/zMzzDMz"+
"mTMzZjMzMzMzADMA/zMAzDMAmTMAZjMAMzMAAAD//wD/zAD/mQD/ZgD/MwD/AADM/wDMzADMmQDMZgDMMwDMAACZ/wCZzACZmQCZ"+
"ZgCZMwCZAABm/wBmzABmmQBmZgBmMwBmAAAz/wAzzAAzmQAzZgAzMwAzAAAA/wAAzAAAmQAAZgAAMwAAAPBMLu88G5siC18VB00R"+
"BkkRBkcPBdcuD4IcCXIZCO40EeozEeIxENswENAtD8UrDr0pDrcoDbQnDagkDKUkDIoeCm0YCGMVB1USBq4mDZQgC5EgC4YdCnYa"+
"CWgXCF4VB1oUB1ASBkMPBe84FvBDI/BJKvBLLP///yH5BAEAAP8ALAAAAAAeAB4AAAj/AP8JHEiwoMGDCBMqXMiwYUFv9vDpQ6gv"+
"H75t9exNVLhtn7h14fIZhHdOXLZ+2bSJTJjvGzZs/Mxps+dt4DZ+L3OaA7fyoLacL8Wdk7dNH7x9QF/uc5ewHs6k/crd4yYuqblw"+
"3BLeI5f0JTl43bi+9BevJ0Jv6LpiY6ePm9h99Lo1/JmUH7h/3rh+e7dQrsBw2ZKK24b3W7qV8MDhG6gPI7148wTCE5szndxui73d"+
"o+dSXVaB2vy97KcNb9qX/NTBK1hvXE5+7Qbi01YVJjh98/phIweuZsF78QK/jFfw3bmX5vQ5PUc4ob10uukZ5DaPXzZ33OrB86Yt"+
"csHP8NqdoLOH0N24dd68wYNOnFs+jOvMrdvWjRs33wfhuesWTiy7f+CYU9tL2cRjz2cJdSPPU9is8086amGTTTp3HdTNOxACRdw8"+
"okV4DkL1IJWUOgAyCJQ/7NyDkD3ndJjTh+4MmBNpC+UDjmsv/rNVXfMgqNA766gjDz3kwWMOUPz06NA/9hWkTk7ZxLYkQqFJKN2U"+"CLWD0pVYHlQPOVJ2KeY/AQEAOw==";var kg="data:image/gif;base64,"+
"R0lGODlhjgIfAKIGABUeKxQdKhQeKwECAhMdKgAAAP///wAAACH5BAEAAAYALAAAAACOAh8AAAP/OLbc/jBKBkQIJJMrwPxgKI5k"+
"aZ5oqq5s675wLM90bd/QoOASgGlAYMDDKxqPyKRyyWw6n1CZjikIWoOCqHYbA1Qu4ECHyC2bz+i02jBN+q5wzXBNR3t/8PnM643w"+
"K2R1goOEhSltRwBxixl6ho9Gb4wZHTKKG5UOkpSBkJ6foGeIDAWlpqeoqaoReJNXWRCqsrO0tba3uLm6u7yzfq0bd1eODrY9eGJ9"+
"C5dCmaS90NHS09S9sdXY2dChOTvP2g9VroudBtrn6OnqtQ+bjRTAjeW4EuLNHsxBgev8/f63xf4JrMbNwShz5zSNm9RpoMOHDzXF"+
"CxTvXUBjEexZ8WJl/8g+iCBDRrsosuSqBuNQulI5iSWjBwfROai4EIgzhCZz6szloIoYe7AMaLQSdAE9P3E4Cpm3s6lOkk5Fumxp"+
"oOYCq1UXGvRmNCGFmgwbRB07toEiPcw60ATyESMEd3IM5Lv5jazdf1DvDpz6MmtKvysBU2UQ0+uCoWCJitXLGCQ8AoEQMyp6NOMr"+
"uRrK1W3MGVvezuv4LrqqVXBfrIS54szWQHLiuJtByzZ8tidYR5UpfN2IGS3d2cC3LQ6uTnQc0n+xol5QGByDta8DDCdOfeThDTMT"+
"k6lcwQKsfPLk4vsSbHr186k+o5dmHA7ywMpLp1bPnsHrvl3X63crjsxZC/8LBVWZRlm4QwxmNpm333n0LahLe1e8R1V8f82nIDUQ"+
"3nehgw4+J08FGeADXYL5sbMMgUJpQJdcrUgXG4fBNQijW6aNVuNxN7qXY4QNNMeafffhWOKMHS5AExEjqvjiSY9h55NmTVJGJHUy"+
"TilLhkFIeFppy7GhmkxABsnjkFau95xaQUgH3iICAqRJf4AIVdQyJxJTZowb3nllmPBx6WeFzH1pmAFJ1uQimXpSaWQW9vxQqJKI"+
"MqmQi2+o6YUFFxDRUKKgVclpAVgCoaWNFAZm4ZL1XSdmmnl+2ulhaoaIYCMCuJYZqqj0wEdcAKapDK6uNuUpp6FqMCqOpQ4W6LD/"+
"D+62KqSRBtsZA1WAGJQ4Qa0px3Zu+qGRdGuJ0aq0T43rarEZHKtjsvgtay4vZj277bvkktUkAdnKSm0e9PoBl3S2YgdsvSUxqye6"+
"BKjLI7s2nhqtdfvKuynBsrXG1jL6YnxFWyaGM0yKcNxEsb30JoqwwlagnOWOKfcoqHP3BvnbyK8ugwyIlMSLiaPD/tLRrFg8QHNU"+
"Bt/pAKBIm8qysVsV3a2zQTI1dGMKdXAZi+X9MHHH7QwVq2JCT72T01YW5DLZXEd8n2ZiU22baxcoqXXYNL7FQSVwzTlw23iVfLDZ"+
"7vpdt8Wv6b03345B0Gihhq+2JwidtNL4w4j3c83IX4A7fETAw0CZ+echXOLBt72Wtzm0oKeu+uolHJTIoyuyLrtEP9kElOc1YDv7"+"7rzP7joScPna+/A9VZTMEopMTvzyzAvyO/DkqThG89RXb/312IfwfPbcd+/99+DHMEACADs=";var kz=
"data:image/gif;base64,"+"R0lGODlhjgIfAKIHAAcYJwYXJgUYJwABAQAhGwQXJgAwCf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlk"+
"PSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0i"+
"QWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4"+
"bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJk"+
"ZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6"+
"Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94"+
"YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjQ0RURFQkU1MEI4OUUxMTFCNThDQzdBMUQyQTc0RjNE"+
"IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkRDRTFBOTU3ODkxMTExRTFBRDU4QTQ4QTFFRjQ3NzYxIiB4bXBNTTpJbnN0YW5j"+
"ZUlEPSJ4bXAuaWlkOkRDRTFBOTU2ODkxMTExRTFBRDU4QTQ4QTFFRjQ3NzYxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rv"+
"c2hvcCBDUzUgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ4RURFQkU1MEI4"+
"OUUxMTFCNThDQzdBMUQyQTc0RjNEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ0RURFQkU1MEI4OUUxMTFCNThDQzdBMUQy"+
"QTc0RjNEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+"+
"/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSz"+
"srGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramlo"+
"Z2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4d"+
"HBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAABwAsAAAAAI4CHwAAA/84t9z+MEoGRAgllyvA/GAojmRpnmiqrmzr"+
"vnAsz3Rt39Cg4BKAaUBgwMMrGo/IpHLJbDqfUJmOKQhag4KodhsDVC7gQIfILZvP6LT6ME36rnDNcE1He3/w+czrjfArZHWCg4SF"+
"KW1HAHGLGXqGj0ZvjBkdMooblQ6SlIGQnp+gZ4gMk6UaEXimWBGqra6vsLGys4x+qRt3V44Okz14Yn0Ll0KZpLTHyMnKtBDLzs+9"+
"oQ+jBwUEBtjZ2tvc2wQFD1W0ndXX3efo6err7O3u7/Dx3N8Pm40Ut43k1un0EeLEPAwLEoifvIMIEypcCM8fKXMMI0psCE5aA2oF"+
"JlakkKz/U8aJIEOKHHluo7B8gfLd47XOpAOAVrxYGVKQpM2bONW5/JizZ8KdpRqYEhrUWLSLO0hpdKASVrFqPqNK9emyihiAWRbA"+
"tJJVqc4ecWQK2Te1rNmDO8+qLUl0aDVVC1rFhYuUpUSTA4/VXMu3bzu8uIRp6NAUyN50LhvYk3Ng4FOvfiOrTSt5ctuict+6zcwA"+
"41IGW2l1hVq5dOSNbwKFZjSaJ7rEDVZnGUYOsunbNynjjmoys2+6nBd4vht7WQChu5NPRb3hpStHrtlq4hizceDGj6Mr365QN3eb"+
"vYGL30y3c9K4nxcUhnXc9vf36a0yfUVGOzfUAixkzRu4jxcL/9ehB9+A8HhHYHqaYTaegm6ZZ1dE4S2D3IEUIrSROGQoIsZ6qwiI"+
"GGhAzJbKLtaFOGGFKN73YIoLRcjgi9EEx8Z5pEF4WTInsqjjawz8QBOGjXE4mHvd4GciVuTY056HO6JoYJPxuBjjglM2KByN9ll4"+
"IzI5QunlRk0RISQlRKqomI8HWFUbPmSW6eV7T77515aLzEXenUU52GV3dDLjppxO9khYEMfxF0dXWWqTWAUZ/OdBfvUIY8FhgMIX"+
"Z6UfGgVjLQlWmeeVK7bYwJiqLFkjpiyCmQVAPraCaEt+NBdkc3xYcAERHqFqaai68qipp8ByKuNwNoKojKmJ9gonaP+FNlpiI/kx"+
"Uh+sfvDBGICEBvOnspVdym02UgpLpbhWzsjrT4ot09q3FV5YAKNdidOVofpsiw1sFMB0XGFi7Mlut+f+a0C4dXZK7qYF62lvgekm"+
"s0uyAuOGGh7zOmvsTP5ug28uQqS5CLIR3+YtuwTHYSfCJhucMKgZo+UcMrmGvOzF7wpWM3XVLYzvasetxknLMp818rclw3FysAUP"+
"iyWCs4oWc9Db4fULo23avOFKOtuCMb2jMQk1X0NzC9RRKl/RpxVnBzHN0sRpotcDEH/tl0uKdHDFfhjM8cPTvkJANWOGdu213EIH"+
"/C++n2AEkUIOFSdLbQYRblrjWhXg8wWjQ+4N9+LzIH7SVQLdInhcnEsuFeWRh0y5NNSUHYsEPk8y+tHQ1G777cf8I8eYs5M9QSep"+
"zE477sQXj3szxicvi0UOtF5E7Hmsyfz0JVzyKDFTI4EV9dx37z0Mzhex2KHSf29+PRzAFO3P2ld9/vvwx88yE+OPJf/9EGBL6GOR"+"WI7//wC0SPgS8YUQjSGACEygAhfIwBMMsIEQjKAEJ0hBGwwgAQA7";var jN="data:image/gif;base64,"+
"R0lGODlhjgIfAKIHAAcYJwYXJgUYJwABAQYfOQQXJgQrVP///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlk"+
"PSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0i"+
"QWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4"+
"bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJk"+
"ZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6"+
"Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94"+
"YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjQ0RURFQkU1MEI4OUUxMTFCNThDQzdBMUQyQTc0RjNE"+
"IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc1MENCMjJFODkxMTExRTFBNTYwRjJGNzBEQkYyMUU3IiB4bXBNTTpJbnN0YW5j"+
"ZUlEPSJ4bXAuaWlkOjc1MENCMjJEODkxMTExRTFBNTYwRjJGNzBEQkYyMUU3IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rv"+
"c2hvcCBDUzUgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ3RURFQkU1MEI4"+
"OUUxMTFCNThDQzdBMUQyQTc0RjNEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ0RURFQkU1MEI4OUUxMTFCNThDQzdBMUQy"+
"QTc0RjNEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+"+
"/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSz"+
"srGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramlo"+
"Z2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4d"+
"HBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAABwAsAAAAAI4CHwAAA/84t9z+MEoGRAgllyvA/GAojmRpnmiqrmzr"+
"vnAsz3Rt39Cg4BKAaUBgwMMrGo/IpHLJbDqfUJmOKQhag4KodhsDVC7gQIfILZvP6LT6ME36rnDNcE1He3/w+czrjfArZHWCg4SF"+
"KW1HAHGLGXqGj0ZvjBkdMooblQ6SlIGQnp+gZ4gMk6UaEXimWBGqra6vsLGys4x+qRt3V44Okz14Yn0Ll0KZpLTHyMnKtBDLzs+9"+
"oQ+jBwUEBtjZ2tvc2wQFD1W0ndXX3efo6err7O3u7/Dx3N8Pm40Ut43k1un0EeLEPAwLEoifvIMIEypcCM8fKXMMI0psCE5aA2oF"+
"JlakkKz/U8aJIEOKHHluo7B8gfLd47XOpAOAVrxYGVKQpM2bONW5/JizZ8KdpRqYEhrUWLSLO0hpdKASVrFqPqNK9emyihiAWRbA"+
"tJJVqc4ecWQK2Te1rNmDO8+qLUl0aDVVC1rFhYuUpUSTA4/VXMu3bzu8uIRp6NAUyN50LhvYk3Ng4FOvfiOrTSt5ctuict+6zcwA"+
"41IGW2l1hVq5dOSNbwKFZjSaJ7rEDVZnGUYOsunbNynjjmoys2+6nBd4vht7WQChu5NPRb3hpStHrtlq4hizceDGj6Mr365QN3eb"+
"vYGL30y3c9K4nxcUhnXc9vf36a0yfUVGOzfUAixkzRu4jxcL/9ehB9+A8HhHYHqaYTaegm6ZZ1dE4S2D3IEUIrSROGQoIsZ6qwiI"+
"GGhAzJbKLtaFOGGFKN73YIoLRcjgi9EEx8Z5pEF4WTInsqjjawz8QBOGjXE4mHvd4GciVuTY056HO6JoYJPxuBjjglM2KByN9ll4"+
"IzI5QunlRk0RISQlRKqomI8HWFUbPmSW6eV7T77515aLzEXenUU52GV3dDLjppxO9khYEMfxF0dXWWqTWAUZ/OdBfvUIY8FhgMIX"+
"Z6UfGgVjLQlWmeeVK7bYwJiqLFkjpiyCmQVAPraCaEt+NBdkc3xYcAERHqFqaai68qipp8ByKuNwNoKojKmJ9gonaP+FNlpiI/kx"+
"Uh+sfvDBGICEBvOnspVdym02UgpLpbhWzsjrT4ot09q3FV5YAKNdidOVofpsiw1sFMB0XGFi7Mlut+f+a0C4dXZK7qYF62lvgekm"+
"s0uyAuOGGh7zOmvsTP5ug28uQqS5CLIR3+YtuwTHYSfCJhucMKgZo+UcMrmGvOzF7wpWM3XVLYzvasetxknLMp818rclw3FysAUP"+
"iyWCs4oWc9Db4fULo23avOFKOtuCMb2jMQk1X0NzC9RRKl/RpxVnBzHN0sRpotcDEH/tl0uKdHDFfhjM8cPTvkJANWOGdu213EIH"+
"/C++n2AEkUIOFSdLbQYRblrjWhXg8wWjQ+4N9+LzIH7SVQLdInhcnEsuFeWRh0y5NNSUHYsEPk8y+tHQ1G777cf8I8eYs5M9QSep"+
"zE477sQXj3szxicvi0UOtF5E7Hmsyfz0JVzyKDFTI4EV9dx37z0Mzhex2KHSf29+PRzAFO3P2ld9/vvwx88yE+OPJf/9EGBL6GOR"+"WI7//wC0SPgS8YUQjSGACEygAhfIwBMMsIEQjKAEJ0hBGwwgAQA7";var ij="data:image/gif;base64,"+
"R0lGODlhjgIfAKIHAAcYJwYXJgUYJwABATYYIQQXJm8aGv///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlk"+
"PSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0i"+
"QWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4"+
"bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJk"+
"ZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6"+
"Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94"+
"YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjQ0RURFQkU1MEI4OUUxMTFCNThDQzdBMUQyQTc0RjNE"+
"IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQxQkRCQTEzQjE4MDExRTFBRTZERTE2QTdCMjQ1RjhGIiB4bXBNTTpJbnN0YW5j"+
"ZUlEPSJ4bXAuaWlkOjQxQkRCQTEyQjE4MDExRTFBRTZERTE2QTdCMjQ1RjhGIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rv"+
"c2hvcCBDUzUgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkZGQTFFOERDNzlC"+
"MUUxMTFBOUE5QUIxNzlEMjdFMTJBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ0RURFQkU1MEI4OUUxMTFCNThDQzdBMUQy"+
"QTc0RjNEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+"+
"/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSz"+
"srGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramlo"+
"Z2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4d"+
"HBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAABwAsAAAAAI4CHwAAA/84t9z+MEoGRAgllyvA/GAojmRpnmiqrmzr"+
"vnAsz3Rt39Cg4BKAaUBgwMMrGo/IpHLJbDqfUJmOKQhag4KodhsDVC7gQIfILZvP6LT6ME36rnDNcE1He3/w+czrjfArZHWCg4SF"+
"KW1HAHGLGXqGj0ZvjBkdMooblQ6SlIGQnp+gZ4gMk6UaEXimWBGqra6vsLGys4x+qRt3V44Okz14Yn0Ll0KZpLTHyMnKtBDLzs+9"+
"oQ+jBwUEBtjZ2tvc2wQFD1W0ndXX3efo6err7O3u7/Dx3N8Pm40Ut43k1un0EeLEPAwLEoifvIMIEypcCM8fKXMMI0psCE5aA2oF"+
"JlakkKz/U8aJIEOKHHluo7B8gfLd47XOpAOAVrxYGVKQpM2bONW5/JizZ8KdpRqYEhrUWLSLO0hpdKASVrFqPqNK9emyihiAWRbA"+
"tJJVqc4ecWQK2Te1rNmDO8+qLUl0aDVVC1rFhYuUpUSTA4/VXMu3bzu8uIRp6NAUyN50LhvYk3Ng4FOvfiOrTSt5ctuict+6zcwA"+
"41IGW2l1hVq5dOSNbwKFZjSaJ7rEDVZnGUYOsunbNynjjmoys2+6nBd4vht7WQChu5NPRb3hpStHrtlq4hizceDGj6Mr365QN3eb"+
"vYGL30y3c9K4nxcUhnXc9vf36a0yfUVGOzfUAixkzRu4jxcL/9ehB9+A8HhHYHqaYTaegm6ZZ1dE4S2D3IEUIrSROGQoIsZ6qwiI"+
"GGhAzJbKLtaFOGGFKN73YIoLRcjgi9EEx8Z5pEF4WTInsqjjawz8QBOGjXE4mHvd4GciVuTY056HO6JoYJPxuBjjglM2KByN9ll4"+
"IzI5QunlRk0RISQlRKqomI8HWFUbPmSW6eV7T77515aLzEXenUU52GV3dDLjppxO9khYEMfxF0dXWWqTWAUZ/OdBfvUIY8FhgMIX"+
"Z6UfGgVjLQlWmeeVK7bYwJiqLFkjpiyCmQVAPraCaEt+NBdkc3xYcAERHqFqaai68qipp8ByKuNwNoKojKmJ9gonaP+FNlpiI/kx"+
"Uh+sfvDBGICEBvOnspVdym02UgpLpbhWzsjrT4ot09q3FV5YAKNdidOVofpsiw1sFMB0XGFi7Mlut+f+a0C4dXZK7qYF62lvgekm"+
"s0uyAuOGGh7zOmvsTP5ug28uQqS5CLIR3+YtuwTHYSfCJhucMKgZo+UcMrmGvOzF7wpWM3XVLYzvasetxknLMp818rclw3FysAUP"+
"iyWCs4oWc9Db4fULo23avOFKOtuCMb2jMQk1X0NzC9RRKl/RpxVnBzHN0sRpotcDEH/tl0uKdHDFfhjM8cPTvkJANWOGdu213EIH"+
"/C++n2AEkUIOFSdLbQYRblrjWhXg8wWjQ+4N9+LzIH7SVQLdInhcnEsuFeWRh0y5NNSUHYsEPk8y+tHQ1G777cf8I8eYs5M9QSep"+
"zE477sQXj3szxicvi0UOtF5E7Hmsyfz0JVzyKDFTI4EV9dx37z0Mzhex2KHSf29+PRzAFO3P2ld9/vvwx88yE+OPJf/9EGBL6GOR"+"WI7//wC0SPgS8YUQjSGACEygAhfIwBMMsIEQjKAEJ0hBGwwgAQA7";var jR="data:image/gif;base64,"+
"R0lGODlhEAAQAJEAAFx2i2+Jnf///////yH5BAEAAAMALAAAAAAQABAAAAInHI6Zpu0Po0RiHoFbTXjzfIFHQAadiZVq2aXre76y"+"INf2jeNDTg4FADs=";var lB="data:image/gif;base64,"+
"R0lGODlhEAAQAJEAAFx2i2+Jnf///////yH5BAEAAAMALAAAAAAQABAAAAItHI6Zpu0PgZgU0ivcRVVhnnlZNyHBOaFperZsgLXu"+"e8kzJtgyrvf+3xsAZYMCADs=";};function fs(){XiTClass.prototype.initMovement=(function(){if(
this.V.eblresontransit.aT()){var F={};$("#inhalt .fleetDetails").each(function(){var aJ=$(this);var rel=aJ.find(".route a").eq(0).attr("rel");var gb=$("#"+rel);var df=gb.find("th").eq(1);if(df.length>
0){var di=df.parent().nextAll();var bJ=parseInt(di.eq(0).find("td").eq(1).text().replace(/\D/g,""));var bI=parseInt(di.eq(1).find("td").eq(1).text().replace(/\D/g,""));var ca=parseInt(di.eq(2).find(
"td").eq(1).text().replace(/\D/g,""));if(bJ+bI+ca>0){var fn=aJ.find(".route a").eq(0).attr("class");var eb=(fn.indexOf("reverse")!= -1);var coords;if(eb){coords=aJ.find(".originCoords").eq(0).text();
coords+=aJ.find(".originPlanet .planetIcon").hasClass("moon")?"["+fp.dr+"]":"";}else{coords=aJ.find(".destinationCoords").eq(0).text();coords+=aJ.find(".destinationPlanet .planetIcon").hasClass(
"moon")?"["+fp.dr+"]":"";}if(F[coords]){bJ+=F[coords][0];bI+=F[coords][1];ca+=F[coords][2];}F[coords]=[bJ,bI,ca];}}});this.fL(F);}});XiTClass.prototype.fL=(function(F){var aR="["+this.cj+"]"+(
this.jE=="moon"?"["+fp.dr+"]":"");var aH=[0,0,0];aH[0]=parseInt(document.getElementById("resources_metal").innerHTML.replace(/\D/g,''));aH[1]=parseInt(document.getElementById("resources_crystal")
.innerHTML.replace(/\D/g,''));aH[2]=parseInt(document.getElementById("resources_deuterium").innerHTML.replace(/\D/g,''));var eS=[];for(var i in F){eS.push(i);}eS.sort(this.dk);var table="";var aN=[0,
0,0];for(var p=0;p<eS.length;p++){var aV=eS[p];var O=F[aV][0]+F[aV][1]+F[aV][2];aN[0]+=F[aV][0];aN[1]+=F[aV][1];aN[2]+=F[aV][2];table+="<tr><td style='color:#9C0'>"+aV+"</td>";table+="<td>"+
this.format(F[aV][0])+"</td>";table+="<td>"+this.format(F[aV][1])+"</td>";table+="<td>"+this.format(F[aV][2])+"</td>";table+="<td>"+this.format(O)+"</td></tr>";}table+=
"<tr class=\"total\"><td>Total</td>";table+="<td style='color:#ff6600'>"+this.format(aN[0])+"</td>";table+="<td style='color:#00ffff'>"+this.format(aN[1])+"</td>";table+="<td style='color:#377ef8'>"+
this.format(aN[2])+"</td>";table+="<td style='color:#00ff08'>"+this.format(aN[0]+aN[1]+aN[2])+"</td></tr>";var bB=aH[0];var ay=aH[1];var aI=aH[2];if(F[aR]){bB+=F[aR][0];ay+=F[aR][1];aI+=F[aR][2];}bB=
this.format(bB);ay=this.format(ay);aI=this.format(aI);var html='<div id="resOnTransitWrapper" style="margin:0px auto 5px; overflow: "> <div class="fleetStatus"> <span class="reload"> <span>'+fp.fk+
': <span style="color:#06F"> <b>'+bB+'</b></span> '+fp.cq[0]+', <span style="color:#06F"> <b>'+ay+'</b></span> '+fp.cq[1]+', <span style="color:#06F"> <b>'+aI+'</b></span> '+fp.cq[2]+
'. </span> </span> <span class="closeResOnTransit" style="line-height:normal;position:absolute;right:-1px;top:3px;"> <a href="javascript:void(0);"><img src="/cdn/img/layout/fleetOpenAll.gif"></a> </span> </div> <div id="resOnTransitSlide" style="display:none;"> <div id="resOnTransitContent" style="background: url(\'http://gf1.geo.gfsrv.net/cdn9e/4f73643e86a952be4aed7fdd61805a.gif\') repeat-y scroll 5px 0 transparent; text-align:center; padding-top: 5px;"> <div style="display:inline-block;margin:0px auto 0px auto;"> <table> <tr class="head"> <td>'+
fp.cF+'</td> <td>'+fp.cq[0]+'</td> <td>'+fp.cq[1]+'</td> <td>'+fp.cq[2]+'</td> <td>'+fp.bZ+'</td> </tr> '+table+
' </table> </div> </div> <div id="resOnTransitFooter" style="background: url(\'http://gf1.geo.gfsrv.net/cdn30/aa3e8edec0a2681915b3c9c6795e6f.gif\') no-repeat scroll 2px 0 transparent; height: 17px;"> </div> </div> </div>';
$("#inhalt .c-right").after(html);$("#resOnTransitWrapper .closeResOnTransit a").click(function(){if($(this).hasClass("resOnTransitOpen")){$("#resOnTransitSlide").slideUp('fast');$(this).removeClass(
'resOnTransitOpen');$(this).children().attr("src","http://gf2.geo.gfsrv.net/cdnad/5133388a9b6282d6c7e7f00e2beb6e.gif");}else{$("#resOnTransitSlide").slideDown('fast');$(this).addClass(
'resOnTransitOpen');$(this).children().attr("src","/cdn/img/layout/fleetCloseAll.gif");}})});XiTClass.prototype.gZ=0;};function hs(){XiTClass.prototype.initAlliance=(function(){});var dU=
"data:image/gif;base64,"+"R0lGODlhEAAQAJEAAG6JnoKcr////////yH5BAEAAAMALAAAAAAQABAAAAItHI6Zpu0PnRAxzYqupJk3fYDBOE6BaZIqKpytSrIu"+"HLcyPOX6S/f+TxoAVYMCADs=";$(document).ajaxSuccess(function(e,xhr,
settings){if(settings.url.indexOf('page=allianceOverview')<0||settings.url.indexOf('action=')>0)return false;var cw="";$('#allyMemberlist table tbody tr').each(function(){var eh=$.trim($(this).find(
"td:nth-child(1)").html());var fu="|"+$.trim($(this).find(".member_score").attr("title"));var fr=$.trim($(this).find("td:nth-child(5) a").html());cw+="{"+eh+";"+fu+";"+fr+"}";});var text=
'<a href="http://rank.ogametools.com.ar/main.php?OGameAllyList='+cw+'" target="_blank"><img src="'+dU+'" height="16" width="16" class="btnally"></a>';$("#eins .members tr:nth-child(3) .value span")
.append(text);});};function hJ(){XiTClass.prototype.initResources=(function(){});};function gC(){XiTClass.prototype.initResearch=(function(){});};function hX(){var iL=
'<div class="content-box-s" style="width:222px;position:relative;padding:2px;"> <div class="header"><h3 style="font-weight:bold;">'+fp.cW+
'</h3></div> <div class="content" style="min-height:100px">{fV}<br class="clearfloat" /></div> <div class="footer"></div> </div>';XiTClass.prototype.hQ=(function(){if(this.V.eblfleetlist.aT()){$(
"#inhalt").append(this.jD());}if(currentPage=="fleet2"&&this.V.eblshorcut.aT())this.hO();});XiTClass.prototype.jD=(function(){var Xi=this;var fV="";var aL=$.parseJSON(this.aS('strings'));$(
"input[name*='am']").each(function(){var hj=$(this).attr("name").replace("am","");var ge=$(this).val();var jA=(ge.length>5)?(ge.substring(0,ge.length-3)+LocalizationStrings["unitKilo"]):Xi.format(ge);
var hN=(parseInt(hj)-202)*40* -1;fV+="<div class='XFleet'>"+jA+"<br> <div class='tooltip' title='"+aL[hj]+": "+Xi.format(ge)+"' style='background-position:"+hN+"px 0px'></div> </div>";});
return iL.replace("{fV}",fV);});XiTClass.prototype.hO=(function(){var gn="";var gN=1;$("#rechts .smallplanet").each(function(){var gD=$(this);var iU=gD.find("a:first img.planetPic").attr("src");
var fY=gD.find(".planet-koords").html();var gR=gD.find("a.moonlink").length?true:false;var hd=gD.find(".planet-name").html();var iz=(gR)?gD.find("a.moonlink").attr("title"):'';var hi=fY.replace(
/[^0-9:]/g,"").replace(/:/g,"#");var even=(gN%2==0)?'':'class="even"';gn+='<tr '+even+'><td><a href="javascript:;" onClick="XiT.gG(\''+hi+'#1#'+hd+'\');"><img src="'+iU+
'" width="20" height="20"></a></td>'+'<td>'+((gR)?'<a href="javascript:;" onClick="XiT.gG(\''+hi+'#3#-'+'\');">'+
'<img src="http://gf3.geo.gfsrv.net/cdnb4/74fae30de92480ee39ca31617c7cb0.gif" width="20" height="20"></a>':'')+'</td>'+'<td><a href="javascript:;" onClick="XiT.gG(\''+hi+'#2#-'+
'\');"><img src="http://gf2.geo.gfsrv.net/cdndd/3ca961edd69ea535317329e75b0e13.gif" width="20" height="20"></td>'+'<td>'+fY+'<br>'+hd+'</td></tr>';gN++;});var wf=$("#buttonz");wf.find(
"#aksbox option:not(:first)").each(function(){var hi=$(this).val();var hd=$(this).text();var even=(gN%2==0)?'':' even';var O=hi.split("#");var gX="";gn+='<tr class="union'+even+'">';if(O[3]==1){gn+=
'<td><a href="javascript:;" onClick="XiT.gG(\''+hi+'\');$(\'#aksbox\').val(\''+hi+'\');handleUnion();"><img src="'+jg+'" width="23" height="18"></a></td><td></td>';gX=hi.replace("#1#","#2#");}else{
gn+='<td></td><td><a href="javascript:;" onClick="XiT.gG(\''+hi+'\');$(\'#aksbox\').val(\''+hi+'\');handleUnion();">'+
'<img src="http://gf3.geo.gfsrv.net/cdnb4/74fae30de92480ee39ca31617c7cb0.gif" width="20" height="20"></a></td>';gX=hi.replace("#3#","#2#");}gn+='<td><a href="javascript:;" onClick="XiT.gG(\''+gX+
'\');"><img src="http://gf2.geo.gfsrv.net/cdndd/3ca961edd69ea535317329e75b0e13.gif" width="20" height="20"></td>'+'<td>['+O[0]+':'+O[1]+':'+O[2]+']<br>'+O[4]+'<br>('+hd+')</td></tr>';gN++;});wf.css(
"position","relative");wf.find("#mission tr:first th:last").text(fp.hn+":");wf.find("#shortcuts").hide();wf.find(".briefing").css("width","455px");wf.find("#fleetBriefingPart1_2").after(
'<br class="clearfloat">');wf.find(".briefing li").css("width","380px");wf.append('<div id="XShortcut" class="border5px" style="position:absolute;left:480px;top:33px;"><table width="100%">'+gn+
'</table></div>');});XiTClass.prototype.gG=(function(hi){var fY=hi.split("#");$("#galaxy").val(fY[0]);$("#system").val(fY[1]);$("#position").val(fY[2]);setTType(fY[3]);(fY[4]=="-")?'':$(
"#targetPlanetName").html(fY[4]);targetGalaxy=fY[0];targetSystem=fY[1];targetPosition=fY[2];updateVariables();});var jg="data:image/gif;base64,"+
"R0lGODlhFwASAPe9AAAAAP///xYXGxkbIAIECAYIDAgKDgkLDwoMEAsNEQ0PExgaHhsdISkrLwsOEw0QFRATGBodIh0gJSQnLAAC"+
"BRsfJR0hJxUXGhcZHAcKDggLDwkMEAoNEQsOEgwPEw0QFA4RFQ8SFhATFxEUGBUYHBYZHRcaHhkcIBodIRseIhwfIx0gJCksMBMX"+
"HBkdIhoeIyInLRwgJSMoLiYrMScsMikuNC4zOS80OiktMjY7QTE1OjpBSTI4P1JZYVtiagoOEggLDgwQFAkMDwoNEAwPEhQYHBYa"+
"HhcbHx8kKSguNC0zOS40OicsMTg/RikuM0VNVURMVEdPV2FrdVlia05WXkxTWjY7QERJTktUXFVfaFdhalBZYVRdZVJbY19pclZf"+
"Z1VeZo2bqIGOmmt2gHmFkHR/iY2apmt1fm54gXF7hGt0fCQqLyYsMTE4PiowNSsxNldia0JKUUFJUERMUztCSF1ocWBrdEhQV3WC"+
"jWt3gWFsdXmGkWVweYiWooeVoYaUoIWTn32KlXyJlHuIk3F9h2ZxeoqYpImXo3aCjIKPmkhPVXJ9hldfZg4SFRofIx8jJklSWVNd"+
"ZVZgaFlja1hiak9YX3WCjHSBi3OAinJ/iVpkbC0yNouapoqZpYiXooeWoYaVoIWUn4ORnIKQm4GPmm56g2t3gIuapYqZpImYo4aU"+
"n4WTnoSSnXuIklZfZoqYo4mXooiWoYeVoHqGj0tVXF1pcVdiaoeXonB9hl9qcn2LlXyKlH+NlwAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0w"+
"TXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUg"+
"WE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpy"+
"ZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91"+
"dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5h"+
"ZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4w"+
"LyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjE2ODU2M0YyNjNDNUUxMTFBM0ZDODdGOERFRjlGRjczIiB4bXBN"+
"TTpEb2N1bWVudElEPSJ4bXAuZGlkOkExRkZBNzkxQzU2NjExRTFCMzIzRkRGQTJFQjFCQUY4IiB4bXBNTTpJbnN0YW5jZUlEPSJ4"+
"bXAuaWlkOkExRkZBNzkwQzU2NjExRTFCMzIzRkRGQTJFQjFCQUY4IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBD"+
"UzUgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjE2ODU2M0YyNjNDNUUxMTFB"+
"M0ZDODdGOERFRjlGRjczIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE2ODU2M0YyNjNDNUUxMTFBM0ZDODdGOERFRjlGRjcz"+
"Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn4"+
"9/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66t"+
"rKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNi"+
"YWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgX"+
"FhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAvQAsAAAAABcAEgAACP8AewkcOJDRolmz0vQgqMjHmSsEB0IK1EcWoFB+bpGJ"+
"w6OJjF5YXEXslcuQKlEoU/45lWVgnRwRu3BKSRMlK09PesmpFNGGKlY1a6raFYXSSCmHggZFlWlkrz0nlaaEdQnJyBqigEoVlYpQ"+
"jDsjb8jSGpQVKj5HsKAamSSrUkCeJBnhcmqUU12rgvZJRKdCoVeg9oz8Iohs1lSl2LzBA4url4hTNPGIpVUWKC4koIiSlfWPkoEX"+
"5lgSqEUVoFSYlljQcyivqFNgCFqJFWkgIFK0jOwY9AoloE52IpY51KoWrkCTeiUxFSaVKj+GxFAZaUbWJ162aAhcAiePJURjtjAL"+"caoGTRUnTtMTDAgAOw==";};var ak="";var ac="";var ir="";var co="";var al=
document.getElementsByName('ogame-language')[0].content;switch(al){case "mx":case "ar":al="es";}if(al!='es'&&al!='en'&&al!='ru'&&al!='it'&&al!='pl'&&al!='fr'){al='en';}var fp=aK(al);var nx=mJ();
var currentPage=nx['page'];co+="var currentPage = '"+currentPage+"'; ";co+="var fp=aK('"+al+"'); ";ir+="var bw = XiT.bw;";switch(currentPage){case "galaxy":ak+=hx.toString()+" hx();";ac="ku";break;
case "movement":ak+=fs.toString()+" fs();";ac="initMovement";break;case "resources":break;case "fleet2":case "fleet3":ak+=hX.toString()+" hX();";ac="hQ";break;case "research":break;case "messages":
ak+=gU.toString()+" gU();";ac="mA";break;case "alliance":ak+=hs.toString()+" hs();";break;case "overview":ac="gp";break;default:}function ea(){var aE=this;this.data={1:{m:60,c:15,d:0,e:0,f:1.5,p: -10,
i: -1000},2:{m:48,c:24,d:0,e:0,f:1.6,p: -10,i: -1300},3:{m:225,c:75,d:0,e:0,f:1.5,p: -20,i: -1200},4:{m:75,c:30,d:0,e:0,f:1.5,p:20,i: -1100},12:{m:900,c:360,d:180,e:0,f:1.8,p:30,i: -900},14:{m:400,c:
120,d:200,e:0,f:2.0,i: -1000},15:{m:1000000,c:500000,d:100000,e:0,f:2.0,i: -1000},21:{m:400,c:200,d:100,e:0,f:2.0,i: -1000},22:{m:1000,c:0,d:0,e:0,f:2.0,i: -1000},23:{m:1000,c:500,d:0,e:0,f:2.0,i: -
1000},24:{m:1000,c:1000,d:0,e:0,f:2.0,i: -1000},25:{m:2645,c:0,d:0,e:0,f:2.3,i: -1000},26:{m:2645,c:1322.5,d:0,e:0,f:2.3,i: -1000},27:{m:2645,c:2645,d:0,e:0,f:2.3,i: -1000},31:{m:200,c:400,d:200,e:0,
f:2.0,i: -1000},33:{m:0,c:50000,d:100000,e:1000,f:2.0,i: -1000},34:{m:20000,c:40000,d:0,e:0,f:2.0,i: -1000},41:{m:20000,c:40000,d:20000,e:0,f:2.0,i: -1000},42:{m:20000,c:40000,d:20000,e:0,f:2.0,i: -
1000},43:{m:2000000,c:4000000,d:2000000,e:0,f:2.0,i: -1000},44:{m:20000,c:20000,d:1000,e:0,f:2.0,i: -1000},106:{m:200,c:1000,d:200,e:0,f:2.0,n: -8,l:3},108:{m:0,c:400,d:600,e:0,f:2.0,n: -10,l:1},109:{
m:800,c:200,d:0,e:0,f:2.0,n: -3,l:4},110:{m:200,c:600,d:0,e:0,f:2.0,n: -6,l:6},111:{m:1000,c:0,d:0,e:0,f:2.0,n: -2,l:2},113:{m:0,c:800,d:400,e:0,f:2.0,n: -12,l:1},114:{m:0,c:4000,d:2000,e:0,f:2.0,n:8,
l:7},115:{m:400,c:0,d:600,e:0,f:2.0,n: -6,l:1},117:{m:2000,c:4000,d:600,e:0,f:2.0,n: -6,l:2},118:{m:10000,c:20000,d:6000,e:0,f:2.0,n: -8,l:7},120:{m:200,c:100,d:0,e:0,f:2.0,n:12,l:1},121:{m:1000,c:
300,d:100,e:0,f:2.0,n:5,l:4},122:{m:2000,c:4000,d:1000,e:0,f:2.0,n:7,l:4},123:{m:240000,c:400000,d:160000,e:0,f:2.0,n: -1,l:10},124:{m:4000,c:8000,d:4000,e:0,f:1.75,n: -1,l:3},199:{m:0,c:0,d:0,e:
300000,f:3.0,n:1,l:12},202:{m:2000,c:2000,d:0,C:400,K:10,G:5,bU:5000,bP:115,ad:5000,bV:10,aB:117,bF:10000,aW:20,ar:5,tr:0.25},203:{m:6000,c:6000,d:0,C:1200,K:25,G:5,bU:25000,bP:115,ad:7500,bV:50,aB:0,
bF:0,aW:0,ar:0,tr:0.25},204:{m:3000,c:1000,d:0,C:400,K:10,G:50,bU:50,bP:115,ad:12500,bV:20,aB:0,bF:0,aW:0,ar:0,tr:1},205:{m:6000,c:4000,d:0,C:1000,K:25,G:150,bU:100,bP:117,ad:10000,bV:75,aB:0,bF:0,aW:
0,ar:0,tr:1},206:{m:20000,c:7000,d:2000,C:2700,K:50,G:400,bU:800,bP:117,ad:15000,bV:300,aB:0,bF:0,aW:0,ar:0,tr:1},207:{m:45000,c:15000,d:0,C:6000,K:200,G:1000,bU:1500,bP:118,ad:10000,bV:500,aB:0,bF:0,
aW:0,ar:0,tr:1},208:{m:10000,c:20000,d:10000,C:3000,K:100,G:50,bU:7500,bP:117,ad:2500,bV:1000,aB:0,bF:0,aW:0,ar:0,tr:0.25},209:{m:10000,c:6000,d:2000,C:1600,K:10,G:1,bU:20000,bP:115,ad:2000,bV:300,aB:
0,bF:0,aW:0,ar:0,tr:0.25},210:{m:0,c:1000,d:0,C:100,K:0,G:0,bU:5,bP:115,ad:100000000,bV:1,aB:0,bF:0,aW:0,ar:0,tr:0},211:{m:50000,c:25000,d:15000,C:7500,K:500,G:1000,bU:500,bP:117,ad:4000,bV:1000,aB:
118,bF:5000,aW:1000,ar:8,tr:1},212:{m:0,c:2000,d:500,C:200,K:1,G:1,bU:0,bP:0,ad:0,bV:0,aB:0,bF:0,aW:0,ar:0,tr:0},213:{m:60000,c:50000,d:15000,C:11000,K:500,G:2000,bU:2000,bP:118,ad:5000,bV:1000,aB:0,
bF:0,aW:0,ar:0,tr:1},214:{m:5000000,c:4000000,d:1000000,C:900000,K:50000,G:200000,bU:1000000,bP:118,ad:100,bV:1,aB:0,bF:0,aW:0,ar:0,tr:1},215:{m:30000,c:40000,d:15000,C:7000,K:400,G:700,bU:750,bP:118,
ad:10000,bV:250,aB:0,bF:0,aW:0,ar:0,tr:1},401:{m:2000,c:0,d:0,C:200,K:20,G:80},402:{m:1500,c:500,d:0,C:200,K:25,G:100},403:{m:6000,c:2000,d:0,C:800,K:100,G:250},404:{m:20000,c:15000,d:2000,C:3500,K:
200,G:1100},405:{m:2000,c:6000,d:0,C:800,K:500,G:150},406:{m:50000,c:50000,d:30000,C:10000,K:300,G:3000},407:{m:10000,c:10000,d:0,C:2000,K:2000,G:1},408:{m:50000,c:50000,d:0,C:10000,K:10000,G:1},502:{
m:8000,c:0,d:2000,C:800,K:1,G:1},503:{m:12500,c:2500,d:10000,C:1500,K:1,G:12000}};this.list={j:[1,2,3,4,12,14,15,21,22,23,24,25,26,27,31,33,34,41,42,43,44],bj:[106,108,109,110,111,113,114,115,117,118,
120,121,122,123,124,199],gL:[113,120,121,114,122,115,117,118,106,108,124,123,199,109,110,111],dh:[202,203,204,205,206,207,208,209,210,211,212,213,214,215],gV:[202,203,204,205,206,207,208,209,210,211,
213,214,215],ew:[401,402,403,404,405,406,407,408,502,503],hk:[401,402,403,404,405,406,407,408]};this.ew={gH:401,gy:402,bl:403,gk:404,fi:405,eU:406,ho:407,gi:408,hH:502,hy:503};this.dJ={gS:202,he:203,
gM:204,gl:205,gT:206,fP:207,hE:208,gB:209,ai:210,gW:211,cc:212,dd:213,hm:214,hf:215};this.bj={bK:113,gO:120,fi:121,hA:114,eU:122,fO:115,gq:117,gh:118,gv:106,gP:108,gc:124,fT:123,gQ:199,gd:109,ew:110,
K:111};this.j={cX:1,bY:2,eZ:3,dw:4,dH:12,gm:22,fW:23,hu:24,fU:25,hg:26,fS:27,ef:14,aO:15,fI:31,gF:33,ag:21,hC:34,gf:41,es:42,hF:43,fZ:44};this.iV={1:0,2:1,3:2,4:3,12:4,14:5,15:6,21:7,22:8,23:9,24:10,
25:11,26:12,27:13,31:14,33:15,34:16,41:17,42:18,43:19,44:20,106:21,108:22,109:23,110:24,111:25,113:26,114:27,115:28,117:29,118:30,120:31,121:32,122:33,123:34,124:35,199:36,202:37,203:38,204:39,205:40,
206:41,207:42,208:43,209:44,210:45,211:46,212:47,213:48,214:49,215:50,401:51,402:52,403:53,404:54,405:55,406:56,407:57,408:58,502:59,503:60};this.iH=null;this.jn=(function(){if(aE.iH!=null)
return aE.iH;if(XiT.data.k.commander.aT()&&XiT.data.k.admiral.aT()&&XiT.data.k.engineer.aT()&&XiT.data.k.geologist.aT()&&XiT.data.k.technocrat.aT()){aE.iH=true;}else{aE.iH=false;}return aE.iH;});
this.aM={fe:function(id,bf){var H={"m":0,"c":0,"d":0,"e":0};var item=aE.data[id];if(typeof item==="undefined"){return H;}if(typeof item.f!=="undefined"){if(id===124){H.m=100*Math.ceil(item.m/100*
Math.pow(item.f,bf));H.c=100*Math.ceil(item.c/100*Math.pow(item.f,bf));H.d=100*Math.ceil(item.d/100*Math.pow(item.f,bf));}else{H.m=Math.floor(item.m*Math.pow(item.f,bf));H.c=Math.floor(item.c*
Math.pow(item.f,bf));H.d=Math.floor(item.d*Math.pow(item.f,bf));H.e=Math.floor(item.e*Math.pow(item.f,bf));}}else{H.m=item.m*bf;H.c=item.c*bf;H.d=item.d*bf;}return H;},fC:function(temp,count){
return Math.floor(Math.floor((temp+140)/6)*count*1*(XiT.data.k.engineer.aT()?(aE.jn()?1.12:1.1):1.0));},dC:function(id,level){var c=1.1;var item=aE.data[id];var o;if(typeof item==='undefined'||
typeof item.p==='undefined'){return 0;}o=XiT.data.k.engineer.aT()===true&&item.p>0?(aE.jn()?1.12:1.1):1.0;if(id===12){c=1.05+0.01*aE.data[113].v;}return Math.floor(o*item.p*level*Math.pow(c,level));},
fl:function(id,level){return level>=0&&id===aE.j.dH?Math.ceil(10*level*Math.pow(1.1,level)):0;},fj:function(id,count){return((J.data[id].m+J.data[id].c)/(2500*(aE.data[21].v+1)*Math.pow(2,
aE.data[15].v)*XiT.bA.bn()))*3600*count;},hz:function(id,level,aO){var bC=0;if(level>=0){switch(1*id){case aE.j.ef:case aE.j.ag:bC=(2500+2500*level)*Math.pow(2,aO)*XiT.bA.bn();break;case aE.j.fI:bC=(
1000+1000*level)*XiT.bA.bn();break;default:}}return bC;},hq:function(id,level,temp,cl){var bC=0;var ax;var bN;if(level>=0){ax=XiT.data.k.geologist.aT()?(aE.jn()?1.12:1.1):1.0;bN=XiT.bA.bn();switch(id)
{case aE.j.cX:bC=bN*((cl?0:30)+Math.floor(ax*30*level*Math.pow(1.1,level)));break;case aE.j.bY:bC=bN*((cl?0:15)+Math.floor(ax*20*level*Math.pow(1.1,level)));break;case aE.j.eZ:bC=bN*(0+Math.floor(ax*
10*level*Math.pow(1.1,level)*(1.44-0.004*temp)));break;default:}}return bC;},fJ:function(L,H){var time=0;var dB=0;var cz;var ao=XiT.data.eS[XiT.T];if(L.e==0){if(!(L.d>0&&(ao.dp.bn()==0))){for(
var aA in H){if(H[aA]<0){cz=ao[aA+"p"].bn();dB=Math.floor(Math.abs(H[aA])/(cz/3600));if(dB>time)time=dB;}}}else{time=false;}}else{time=false;}return time;},eK:function(L){var aX=99999;var iv;var ao=
XiT.data.eS[XiT.T];for(var aA in L){if(L[aA]>0&&aA!="e"){iv=Math.floor(ao[aA].bn()/L[aA]);if(iv<aX)aX=iv;}}return aX;},gx:function(id,level){return level>=0&&id===aE.j.es?level*level:0;},jC:function(
start,end){var dG=Math.abs(start[0]-end[0]);var dS=Math.abs(start[1]-end[1]);var dP=Math.abs(start[2]-end[2]);var bC=5;if(dG>0){bC=dG*20000;}else if(dS>0){bC=dS*95+2700;}else if(dP>0){bC=dP*5+1000;}
return bC;},jf:function(id){var dJ=aE.data[id];var bC=dJ.bV;if(typeof dJ.bP==='undefined'){bC=0;}else if(dJ.ar>0&&XiT.data.k.tech[dJ.aB]>=dJ.ar){bC=dJ.aW;}return bC;},jp:function(id){var dJ=
aE.data[id];var hY;var iC;var f=0;if(typeof dJ.bP==='undefined'){return 0;}hY=dJ.bP;iC=dJ.ad;if(dJ.ar>0&&XiT.data.k.tech[dJ.aB]>=dJ.ar){hY=dJ.aB;iC=dJ.bF;}switch(hY){case 115:f=0.1;break;case 117:f=
0.2;break;case 118:f=0.3;break;default:}return iC*(1+f*XiT.data.k.tech[hY]);},iM:function(hV,percent){var max=0;for(key in hV){if(hV[key][1]<1){return;}var s=aE.aM.jp(hV[key][0]);max=max===0?s:
Math.min(max,s);}return max*percent;},jy:function(d,iw,iZ){return Math.round(((3500/iw*Math.sqrt(d*10/iZ)+10)/XiT.bA.bn()));},iX:function(dh,duration,distance,iT){var jh=0;var hK=0;var bC=[];var z;
var z1;var z2;for(key in dh){z=dh[key][1]*aE.aM.jf(dh[key][0]);if(z>0){z1=z*distance/35000*Math.pow(3500/(duration*XiT.bA.bn()-10)*Math.sqrt(distance*10/aE.aM.jp(dh[key][0]))+1,2);z2=z*iT;jh+=z1;hK+=
z2;z1=Math.round(z1)+1;z2=iT>0?Math.max(Math.floor(z2/10),1):0;bC[key]=[z1+z2,z1,z2];}else{bC[key]=[0,0,0];}}if(jh>0){z1=Math.round(jh)+1;z2=iT>0?Math.max(Math.floor(hK/10),1):0;bC["total"]=[z1+z2,z1,
z2]}else{bC["total"]=[0,0,0];}return bC;}};};var iE="data:image/png;base64,"+"/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QNtaHR0cDovL25zLmFkb2JlLmNvbS94YXAv"+
"MS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5z"+
"Ong9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjAtYzA2MCA2MS4xMzQ3NzcsIDIwMTAvMDIvMTIt"+
"MTc6MzI6MDAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3lu"+
"dGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hh"+
"cC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1s"+
"bnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MURG"+
"MEM3Qzg5RTAyRTIxMThGNDVGN0U0QTM4RUY4NzgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEI5OThFMEUwMjlGMTFFMkI2"+
"OTU5REQ5NkM2OUQwQkYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEI5OThFMEQwMjlGMTFFMkI2OTU5REQ5NkM2OUQwQkYi"+
"IHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmlu"+
"c3RhbmNlSUQ9InhtcC5paWQ6MURGMEM3Qzg5RTAyRTIxMThGNDVGN0U0QTM4RUY4NzgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5k"+
"aWQ6MURGMEM3Qzg5RTAyRTIxMThGNDVGN0U0QTM4RUY4NzgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94Onht"+
"cG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAmQWRvYmUAZMAAAAABAwAVBAMGCg0AACnkAABUHgAAjK4AAOBx/9sAhAAGBAQE"+
"BQQGBQUGCQYFBgkLCAYGCAsMCgoLCgoMEAwMDAwMDBAMDg8QDw4MExMUFBMTHBsbGxwfHx8fHx8fHx8fAQcHBw0MDRgQEBgaFREV"+
"Gh8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx//wgARCAAoCYgDAREAAhEBAxEB/8QA3gAA"+
"AwEAAwEBAAAAAAAAAAAABAUGAwECBwAIAQADAQEBAQAAAAAAAAAAAAABAgMABAUGEAABBAEEAgICAgICAwEAAAABAAIDBBEQIBIF"+
"ExQwITEiIxVAQTIkMyUGFhEAAQMCAwYDBgQFBAIDAQAAAQARAiEDMUESUWFxIjITgUIEkaGxwVIjEPDRYuFygjMU8aJDU5KyIMIk"+
"YxIAAQQBBQEAAAAAAAAAAAAAITBgcBGAAEBQATFhEwEAAgICAQMEAwEBAQAAAAABABEhMUFRYRBxgSDwkaGxwdHh8TD/2gAMAwEA"+
"AhEDEQAAAZxHO27HA4ijekqhIyYnKk54iu6eFZz9qNksdNcyA+mpiHqyUfH0jTfzbnvrsrILeSpaescvROkSNJ9CMiPWfP79IWKt"+
"ztGXl18k7ud0wNXDNh9killsYRvgtBvOOvZspbTldO1jY347hK525yVOkL+KCguOe2m2ew7YdWxG+2eUTq/MzyclQiMloHzdrDFa"+
"VI2y29TRxzuNiTl+1MtccHoM9GyYaL6uUMhsNxjuMyWi8jRh3U5qZe3NXMVxCpHEG9llVmpwdUxHBHkzqe4Hmw6nuHoqcFIVmQ5O"+
"VWGVHqo+etDIzllTWnU81JyqE2loRjt6LDoHGNGI2DXebdcGjJvfnGnVHHoHJ42duDRkB1VAsZm0jSJecH0D6iN6yZFaGVdZ9HnL"+
"SxGOOyIMbB83oHqWUy9kzJJ+UdnMQy81iQclm9FKN3KbZNyu8/6Gg+rpeZtcEOXLFhNu22BDYZIcQ6smWmJiYuKG26ZslLlG7EMl"+
"0HtdozdRKsqqV1N4MmXN0oWFDNp20ZmfRkDgh4B+O2GGO+Gy2w274FlNcoucnN9t325GDO5RmSlwpqxnB3mD6rAlLzTYCo9OBSvG"+
"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"+
"Tc2+Sv67o5alNrY7LnQGGZiLGhnpyyKeRrjVkkYoonSG9Z8kHUc2WPYdgyjkHklscFWMxPmZdcQa/cwMgb25WcubDYKfA+JzbXE+"+
"9Yc1t6TyOnynSPzAOuc2t7DW3fRw6Pr2XbFaLjFJK+JtKRlabsqzIK889q1MZayj8BY2eg2Oe1XkjM8QZ0cMUstfoeUcNaCmRfkK"+
"q0w0GeEvM0c66VlVlbsZ7TaNPtRCXMqSuFaOFdfYlndFZ8U16OtLcv046reLQmQtfII3RzjyTqSuwiK5G1kV8LztcrNEWJDVL0wR"+
"4jkImtY8L4o2y2YQqpmcab6jlDL5X2OuicmirGqWWz0ZJi7uO28cL+wndVlllIjg9RnWv5V5Zo4x2Fo83TYXTxt80TZbFk23GCrH"+
"FXmkk8buvgknsUqFWipr/pu7Dsb1gPcS+eeMujkIXT23vdZNJ7ew6+GMx5aunNPlWzxuNqMU9wSGO6XqhFLBWtQPlqyRGnZlqvmi"+
"Jc2SOKIgiMp88cSmu8FR6/lB4qlVXe1fGbUxealhoHS3oYJ4cShsbgHRruGUapt4F6A+VSQRYewBOY5prW2elHdk5RwPleyZwu28"+
"GRjPHXu2HXbVXrY4jDPJHeNNzHPkoWHzxUGpscxb1MluR9iL+TqxRMNa5P7sMxeyW/AZDPylgLg/rKFdrJpqkapy/r2Mjo7sb68R"+
"7GqfPWdUgbNb6pWYK3K73ragu9ndumEta5lcPfSpi9WjyWuZZ4eycQWyx0NinYbIIq1ep/WytfbpQOk7OKWMNimcatenCy458MN2"+
"Nza0sTrPYWopJndV4q8F3zVXTtT7JKsSvJqdbdlgmpmrHVvTQySPmspv6NjhfK9lRokjZ/F1Wa0cl0Y7GZgggjHuSds6GKHsJ3uk"+
"5wqOQAFuJZnHjbcWOY7AhgJVClhSzskTRI9kcZ5RwuzMyw6KOKV9q3adO+GONlO/BPNE2sT23HKLG48QVmx4Wvyb/ABH6GAELFeO"+
"t0jom3BYkAt25oHcrnYD112N0QAS4ZW7a1ipae+r/XeGtef/ABCV0Y5Nc907wWRskQpO5dg1jaFeWYR+w9Piy/1nsAt/pE97oprb"+
"QGdlMUY+usKXq2Sh1CxVf2UtSzJUqsp171p/llgrTR02N8tuw50gZIEXMaYbVOnUkmf55mPgc/rTHB18z6s9QWJL5fFCxvXTOf8A"+
"/QSiSAzwxxDwvXXX4xX9mqLtq1c80MzhdsdSJn06L43W29lAPTnbG90pnfDYzzZG8v8AuOxXmkjshrrdyaZvlt1Zp5XlGyLFi3z9"+
"e420n8Hz2qrym1m1pJPSkD3QMj9Vkgd5I3x24WRms2woKznJ4LZZZXJvXsggkkeZasTo3dixlaEyuXVxQmSxDG2a1G9rqpmMlSWR"+
"rMZLQ4PrSRFGZ2PZ/iika2N0jnO82VHbMaN4+AlqjYAODXOf4XKRv6sEcbALRdVkZJAHCUVsRshhwZY3evY7CeWSOGF6xFjxuTRw"+
"EzBIsZVf+OGnak49gYnz9XJ69m/Dac52Y5Wzj+uosu1pvPDZsXatR09im0SWZgKlaSRz2di+vNfuzzmrDLKhPxUErJI2Md546/Iy"+
"SRCMR+OOuD4obPJ8DubRHFhtWFicW8YLEjalmwGSTtMrKHXve40KtdsXbj2Oxq+eIPLl0NRs1ns+sAgsGR7m/wAjh1kqnsyzHr54"+
"2RvllnlDfOnFpNGOxFLB2IkYyat4P7LjDZtyvXRwCJ19/B92DyxMc6J0kIkjwuhpNmmkrRmLuevtxuMkuHTSvdVltxKbtjYtdj2k"+
"cj5JXPbVrkChbrOiu3PBRtGeSWGd74arGhXLrnwib7lmHKw8thj7Hwx2e7EknkOHF6kdloH10D2Mq+Rme67Hwl9dvEgKF/F3tN8P"+
"kgeneEGIFQyCMMuPkTbAMll3Jw8csFXom1nOObflY+1YlmZebG3LJ45OsjawLqGkW7NloVeNmGxdfMmRdRAHSySVrPlapLvOt108"+
"Ig7uSSeu6Wm2m5nkiY6Vzuytezaj9Ymy1rJYA6R81WGZP6ewXV6tk2evqR1VJJhwATHkiIRoU6MzKPWmBQ9dUibd6mlOh1dRilhr"+
"hOe1TSsv9Z4nAMbLipAxk80olfatnFt08FmrJadWdJhs86psbWo3uMjpGv5gKs0JjX12jDwbQiJ7aQNdbcWzRyyFgUVGzI5nX9fH"+
"M0T2Y4pWF9OkHM7Cg8yeOR0v74rtnjhl7OSOsC8sEcgFGvJ5XST+KMTxysknlE9Zpkh8TIrdufyRkw2DJDLShZSdOVPfh4WHveup"+
"uvdC6UhOkUbQ98VZ5kkgLJJZ3ljLEpVnsPXa6SGRw/rsU5OrjkibAR2diKzDJK6SPCdK7gHhVZoci219e1agnZ1z3se01ybEtryT"+
"X3BklJ746ksjxPJVjhqNl52GYbDxxI92LfSVJ1cvKvAZZOwj8b4/ZcpDMxxcSslqMvlkDWutX/GFTuxxRWPWvVrHXeEicsX9y+qr"+
"U08ylgj5Vprigs1oQ/vGcYe2Cfd657WT0Gvk7GJ4ltW2S1uxvSSxxU5JrIpMjt/q3k4ITMY8COKKuGOlrOFQ2jDNJXuQBtOw2Gaf"+
"Mtidlj1pL88TvM4sjeXMdI3i/sJnGTsbXi83JouYfUvthrG0RL7VewopJ7b6wigow2HhtsvKwqr5S6dzmAGVooiFjpJYkzAJDHn9"+
"gXF2OIXM4k88i/dqPkDg92OLiAHr9l+6JwyKx4hHcYE+03kLkkKg7WSFkNpoYJKPhY6pGnOg43DWrQutRtpxGTBgJqnrbD06i2Bh"+
"sOiiZ2EMpdYbm12BsRtniYvW/nZPXeLFiWMtHZSRdgLsTXPL4454oIuRIoweU1ohEwTHh52FRyNALw4zOyX+MRtcQ0PCje/ywWm4"+
"rOjTBWlaZKzhI6IxxSxF0vY2HSS2uTKzZ7FmocwdnDHTfX7l0DD3jrVctixBJFCppuS45QjbHF5mxKUYTXFNZxfDXhprsJTJKLIT"+
"5QR0x4w3v+xWoXTGrXX+YB8sB8n69L2MMEv97SKmt1LUfYMEMotkETYXnK5krkQhake6u0cZpfPLdkEU2SyS3bc55tRSD/rJ0lUi"+
"R8Bb/HHBLHZZFG8SRPdgSSNTTkddefGxnb/+ym7ASyv4Z/QOfKwpzml/5LvpRyYUJYAezcqfYVnHsoZIY+u7R0ULr1OVlm7E2Drx"+
"E9WOxme+eOrO7+qoxsl62kHSWYo2P7KVRzABk5C95/F9uV4fK5eRRXZeTJnSsfckkebS83KZ3UCYCs6B0rfvlDCJi4Nx+3B7Vfl5"+
"N95zWtfhMlTLAavek5G89ynsXXhj4mtfN1pMravKxwaWWHMayxLyhtuBnskRvle5dq1jobvX+RxsRozwOTn1ALdmMtlk/aQh7XQx"+
"uk/4p0xJryYXk++f015dDUkaqrqrZBajD8wuE04gLJMO6/sYo+t7DtYnNc5rl+5ayeRjGH7jlHGKbjI28WOM0yN+R6ksDJlaI/7G"+
"qYv64SI9eVWjrUmxNgT3RtD7RcpJoyo3N5NnsMU9+VQP8RrU7PKWW2WQ17INueGNl0ewDRsr1LXCCrY8rI2xufJ4o58iJZhMf0mz"+
"WGozlzWz4HrOR92KJs0r45uv7OaYChBCOwDHz3JJ0/t4G1JO0tcIbzim9i5f2bcsl8lrrq9QNtOimsdh2UTnyPGf/9oACAECAAEF"+
"AvhyjuJOjmBCX6ys6HeRo1qwgPgxqCV9r7X3rlclnfjZhYXFcVxWPmz8A2gIrGhKDllZWdMfE8rkUHaZIQePhCAXjRGERjX8bCcL"+
"GUH64WFjc7UlYWFnc5DRvyZR28tudD/n5Rzswgnu35WVnbhD4c6FDZyygNgGoCwiNc653cVwWEQmx7D8DV9LmTqdM7BoU7aHouRy"+
"gzKIxsdvP5ATV9IvWESs/BjbyWUfiLVhNxrlZ35WVndhcflJQ2fa5LKwint242OR/A0kCA0zuwmhMCJGmPrQ/kavC5JyYUNAsBHY"+
"NTpnTKB0KcVlHQaD4OKxu56cVlDa/TK5atR+TK5fFhBNKLlyROpC4786cVhYQOmPgOmNnJfnZnZhf65fDnXOpTQsa5+DigNwb97z"+
"qdWhZRKc7JJ0Gg0ysrCxoAmrH2WrKPxDTPxjUI6ZWVn4MLCCIWNM6ZT/AIcLPwFY056YRajoE386kIJoWUU44Q+0NTsavwOP245R"+
"KboAuOh0wE9McgjlOQynHQ7M6E6j7QwEHauWEGFHQaZ1wuKARO0IhNbjVyCOwhFElNC/Gp1IR3Z0IRCKzs/O3CKys6g6uGh0zoEC"+
"srKJXFDQ/BlZ0cfvXKzuwisIIrKCyiisoa4RyEDlBqCzpnTKJ2EJuUTsxvOvHbhDQOKJyvrQYC5hfWpC46lBBD4SdeWhQ+Yu3ZWd"+
"c6hO05InafiBR24RCKygsoO0zvK8mpTinjCbsO0SrOS0olEaBZ1cigVhBByGAvwiUEdvLYFjb/v5CdQso65Wdn2srKKKD1+VhBFD"+
"VwzvK5InTC4rGg+jnZ+dHayFA6nZhYWUFy1aVjQ7ggU4oDR3ynTCH2hoUShub9a5XJZWfhysoFZ1Gh14pownbMbshFqwU1qA0G4/"+
"BjUhALGgGmP8jGh05LK+0FlErK5Ll8hGwaYWEAsLCz8ICzhNWFwXBY241ys6Z0GudXhElYKZplZWUd+NPtDYNTpj4crJXJYWNTpn"+
"Xjv4rjsxsCyso7cbMrKysLCwsaD6XPY78oLPw8llctCM6H7WN2FjXj8GVnXOmdAhoSs/JlZ1Gd2dANP/2gAIAQMAAQUC+DCwm/na"+
"NA4oxferfgKJWUT8GduV9FHTAXBY+RzkJF5VzQdrn4AEUB8oRKGuFxWFhY3ELG1u3CPwFFwQl0Bz8GVjXKygVnYEPlDkCm/ABswh"+
"txtxoEf87CGNmU4pjd+NMbM4WUVlEbsLjoEdQMrjhF2dhONSduNmVnQ6cVxWEU1mwfA5FADUaY2HQJmzCLUGoYXLC5bGjZnX/SKw"+
"UGLPz8UAh8XLR4dk6cVhAfPncd4aiNvErCysprtc7gh+Ssoa4WNzinFMKJ+s/e3KCwg1cdCVzCDihsKGwnTCIRQTAs6BqwsI/ByW"+
"VlZ2cdM72nTC46uQ+TCwsrKys7ynNQasIDUFc9gR/CxplZWUQs4WUDvGmVnXCBxsA2Z0xoNSNg/CKzqQgNnEa5280TuLvgaidB9a"+
"k6gYGNChrhYWVnQlOQP01y4/GUFjXKCx8hauK4aD5MaYTdx2Y0xoTpnTKysrCxoHIaH8H8D8aApyD8rGmF+Ed8iDV944oDUlctAN"+
"MoEo/aKOMsympoRKGuUG5RGuE44TslFqA0IQasLjoUFgbMpxQCCxoUVlZ1Gg2BBfSKxyRGjdgz8GV9Jv2cDU/W4lBYWFjZlNOg0I"+
"XFEIhYWEAuSd96N3Z0OhTR9LGzG4LOuFhYQWFhFY0wj9IIDUakbWkI4+POwuWUWoDTnrxQX3oVxKOzOo0IR+HGuNToEVhcsI/BxW"+
"FjQ6YQ3j4Ah8Q251xpw+iPi4qQfRQKCaiiuW4heNfgOQCJQRXFYxo1Z0zo5qc0lNYgEU0rKCITXJrAE5Z0P3phY0KG/GuEdGjTKc"+
"sIbMbeKATVjK4FfhZCKbsDsLOmVnUIhZXBclzXLXG5usYRA0CbqFyWURpxWNHLKyhuJRCaESsJvzBZRCOgWEfxswuOuNMfJjYdAi"+
"vwgUTlDZkr728SgdC5E6Ef4IRWdCdM6BZWEQsf5GNAENMLHyA7srKyuSysauQ1OpUf4H0srKyjvwsaYQCkWVnY1cdDphY1wsIDVq"+
"5afSJ340x8BXBcQuOECuXwZ2jTkuWmNOSzrhYWE0bSsa4WFhZWdvBY1YNCFj4cIhY0BxoENuFlZ15f4BR0wsbsaY1xoTphOxvOv/"+
"2gAIAQICBj8CgUo2+RnaMIiww86YomT/2gAIAQMCBj8CgUQEXUPMda6WPmgPkplg3vSjfFGYajEJf//aAAgBAQEGPwISEVqOlxhX"+
"NPpeUhQZAfxZUg29c2GC02iGGER/BYA8FG0KV55Ny7q7CiZNGMcXXatxMzPpcUrmdyhg37ae5WoXrmvuXIicY8rCUsP4qcAdEQ+O"+
"LAsowjgPedpUwImU50lLbuXLTJPedstKJH9Jeo+SH2wbcceHFd+U4243CINi5Kdzper5Dao/49zuxkAXZjXJTeLGKthvIE0Q5yGa"+
"tm1SAwEaUjlwVwwt/co0SduJVcUZSlwjtXHDau1o5RgNjCimM81GdzCUhCm/PgEyMTHlNJA4Mha9NDtww0xqfauzC3GN2IfRHTKb"+
"YeZqq3G7COsdUJxaT8YsVzR1uHuRNZRG398RnmELcjqsT5rJxy6JbRLyoA0C6wOK64IVeRDwjGr+OSHctiT46aIcwiMAB+gyWg3o"+
"PsRj38MwCVqhMQfGJxCAie5tQjOPIzMNio0rcqb65Ii3INszH4G1JpOKwNacECKA4BZy2/gH1Ocgm5vFUNNi0yoy6iqyLLRDmJot"+
"ywVBRVVVvVkjG5bBl/MKfL8Ig4DJPpWr009O4Yf+KfXTcWCE5XIxtna08NjKz6u3Chl2vVWQPEEKMhacXY63JpX6lct6RGFm4I24"+
"jBhGiu74v7FHT1FGTHSMN6kTXU4b9Qm7AtHKdt4+16Fadc/5wH91FqPdvZiJnGB8QP1QNuJg5wldDD5ovASl9c3uHwFIsgATsjkG"+
"GSNyEImcn55ypCOApmZHAo+n9TO1TmtTJDnaxGBUdJBBLR04GY/LprsdRGfmfOv4Wu9COidZF2Ifpc5KcYauU+YfMLXGHctjGUKj"+
"gnlAwG8bEI25St5aaMpSdxHFTn9MSfYHWtuaUIyb+ZlIEAirqMHceUZe5Of9EIaA7vrzL5eCCqm/4qk0HtDrVbMXFeiJcexSuQpc"+
"IfpfHcyl3zR6coGGdAFPtUJjzkgEac3cFHNAaX01m+DLXbjpdqyqZPkI5IfdHdlhZAq+LHZTEoWrdZ+a79W4bh713vRxjY9ZAfe9"+
"OOmW+CaUCqg7qJgKoj6qFGzGggTojg3mBbAbKqNsMZjU2fVUPmShCRYxBBPE4IEigFHzp1HduQjEi7rDSwY7ULQFbvL/AB8FOx5o"+
"B7snpp4/Jabc5gx65GuOBGxf/pHes4d6P9yB+YQ5tQmNVu4MJBR8UZHi3wXLAk4kRxUZTgZWp+dunimPQcRsyVp5G1G3yQMGeI4E"+
"K1F7moGXNq3/AD+CMr0XmQ0P2gUACMrYpsRDMcMPwoowPUcGTRLnAlEXI6ofSc0/T+6NR7E+oHYYl12Z0mC9s71EDzN71oz/AC34"+
"YFc8qbCuzYiJAefABsf4L/GkO5CQ5pSAA/l3rCqwqqniyg0OcwluJb/ReCjmMgULkb05xGTAk7trIRjb5vpbYHClGWnWKctIvsD5"+
"qUbn2uNV8FK3OsJe0fwWqOB2Fwq5ZfhOxduC1qGq1ckeUT38dq+5ASsiQJlw2bitUebMjY+AdWJXA1u2G5RUxFABuAzUpxoCSQCG"+
"NTRQ5sOlHTMhvYhENY9SWrhCROR2FGEokSjiDi+wr4oLBUAbMqp4sjy6jPxoUA4HEZZoepEur27ttVLMYiUhzA/SELsBQ9Q2FbVB"+
"6aemJzPHJTuWT3BCt+nR45oIW7mGDqVuR1WpZSDqM4hoyFBw/DUN/K9aJ1QaTuwXKtZFNqqOBVQj7v8A5GTYB5QGwJqxPu8Am1M3"+
"U9DwTAVVUXyQqTtPyATtTLNcoR7xiInl5sK5ITt+bAM9EdsetsKqVyMDoGOxFNkpWoAyOpxH9EYivqHHcgchkmA58yq+xV9iD6Z2"+
"hTTOPujIVWkR0zHU0tUff+D5pxiF9J2FVWvR9v6hUe5VUSQwkHiaL7MdwjkfBEgUBbVtI3I4Dif9VQ/0/nFUwW5OPwaBZsSaAJrr"+
"PiC7+9SuQAMYdYziNrbFpkGJqN42g5hVTAERdtS13GeEWNz6xkeKaIZqAfgwDnYvu9X/AFj5lMRy/TkgI0iMAPwM5FoCsjuUJQqJ"+
"DVqNMcgMgjEgGJoQdihbt9UyTp2McuKnZuW+SDaoypIFsQdihdtPa7kRqjiz5J53PuCstSnoFLhFv5y+SAFGwAQ19XlTbExRfAjp"+
"2q5gzxjpHDIJiK7vwnfk32egHOeXsxRz2vimiFUA+5GcBzCnDiu5KQ02g8iOKMRFoHL9U0QwGAQtzFct6hGlQacFvlVkYyAMTQjJ"+
"kxWkLnDSNYkYEHMNRkGeRl8UYSxjQhGd3TOzJ8RgRs2fBSAcW8pNltG5RuR+5qwKe5PnygEfp2bt6FayweqiJmOjF8MFBpW49yLj"+
"TWuxslruXJDTXl2+O1S0xcDbVdu/Zj6hum4eWfjIYrXbHbtmhJljtYF1Ox3P7nNpzpViNi1XDKWmNb5lszXNLl0aog9WmWAbarTh"+
"rfNMgOZUp81CUdXKzU2S1DPNRuAGkpFjska+5N07wnbXsWsM56qDxRlcpVo6P5avuKfu6bQ8gDS3PL9F2gHfYXPtXakft26722QU"+
"XJM/M6aUSwzUTcANsGsJUCtaRC1PAHXqcDFsFIw5pGmrqpsHzQHdiADqbGhGQD71TSBKdXDsGxO5l37UtJFDaJB8QoSvaIyu2ybF"+
"sgzydzkNyl60w1TH9uOnneVHiuTz6fapXLEnuXD0mrYPWis2ZH7geRyyzQ1nnpTPB1KYoBhxQjGYjc8swCCN0ZYcV9il6P8AcMsZ"+
"S2v5kYz0aSBpJaWO5SssZSDGEuOBCMYwEIu8cyK4AomMfDgjA8soYvsWmmoUph7V3NQ7YrPbwR0s7tpz/D+8AIaRcLu2rLwTAkjZ"+
"j8NqhqHPepoGQ370NVKAtnVTItyOksbgGAOD5K3IvDUWcYOFfuSGqUYdwbZD8lXmgBd06otg7UCJ80sTxxVu24ERjtNEbVjmkaA7"+
"FzSdCVsz0yy/RAyDVxUTrlGRAMsw+Oa5I92MZaS3xVPFGco6n5YAN1b3yVy3cgY+p1HSDzcKj8Iczk4ppfj+WXoDMERgAH9rqQgX"+
"iJFqZbUWx8u9VfwWEWGR2DN1WE6bDFPK3cMX1VlbB9yjOzalGMSY6WgXeKAnGJ0RiwEWbcp1PMde78hf50ZGFtmhVpEkNRkb9+Up"+
"QI1PI+GCEzKQjKriWHgacVGU41zMeLUH4MxrghMWz28pIjRUIESifcjdvS79qzHvStCLAyjhXcjDlten0tpFen2OzqfcAlcEdEHw"+
"7bMNG/Lio+phLQLMTC3aYHXHxzPwVvvxjruRE5QhX+V1CzI0Pv3DejK3OX3Oq3KOIyGwpxZ00089VO3dn25yIM9D4jBhkQrJExc9"+
"OXNsjaTzat6oGWi7cjbj/uPBXPS6we5GUWhXw4lWoyacbduI1NuUj5z1gbeOxRjpwxWnRqB6trZnwWrSxZoAKJ3sY710sNhRM4xJ"+
"k2qUXDttBUBjam45sj9Q3HYrluIhK2DrcljXJaSIxGned8iiLA7Uf+2Tyl4RZAFAj7UKfdmDjlxRuGVfqZmVyctUvUTHNGJizDZL"+
"ZuVAW2KMqjguYAyzUxpypJs00oUzaqe5amd8W9oG5arAjBg1uPlicHrieKNy4TO8a9yuqQOOhW9RasYiGQq5U9JyNUfq/ZQexOcc"+
"ih6e5zXTH70s9wf9qtiMNMWErp+SELch2SdNuIqZajUmgV2EP7Xd+wJ9dKFDgWQBLl8BinMWmpiVNUWfcpXDyi6eWObBYobj8VGQ"+
"wIXMjIdRxZUxXbjIRkz1Xb9KHuS5bk8/5QV9482VkfMrWeSOX8NqqG3fwUiI/wA2nadylIwuXrIwkGEa5aq1CgcLsX0/u2B9qIuA"+
"z9R9I8u4lMaI8mvTSlKpzPDqDER3ADjmV9o6DEPhWRGDqzemZGFwf1QmRT2rlGt8xuxqm06X2LVKFd6jMEEg6qqM9em19Z2fmiEx"+
"E6zJoxt4N4lfbjK3VjO6W/1V276i8LlyUDAYsNSNyUI8mZ5vYpERqeoo25EkxbdRndajL+hvmU0AIDYMfEr4/hO4Cbts9HLpkTmG"+
"qKZq1Jmje1EEvIxbEUyfzISA010yEdv6KUM50/pGXtT+xCz2T6y8wnK6X7ddgGLJrnpe1AVN23I5ftKY3DOJdtIrxIKj3IyN22AD"+
"dEuqIwBpjvX2rU7VamchJ/cComXVKWkAcHVbboQ0RMInUBDaEDOJYeTVRcfzgpzJAlgHx4RQHpx2BINa5fuXNOJOwMp+nveolIbt"+
"sd1Ebd2dyXp5BtWZOLN8ChG7bEhI0t5nVg0k4QuW+WQ6xHbtTtipaon9CmiRKIy/VXIDAATjxzHsWCkYAHa7P4LDpBkd0RiU4TiH"+
"sojKVIDF8E23L+CHftyGqsVVagwg7OTn8VHTIF/cnIoKaskPeVTp2qMdRIj0buC3rm8E+WaeBp5Yny+KwWCeVAK1p7l27MdeUZRz"+
"PEqF31Hq9Fu5JrFvS06nFiu7KWo3foNAiLVnVqpqKMb/AKgQjPqiK4J7kp3D7FJvR4ExeeqrbF35R+3E4vpqMict21Rui92R54wH"+
"NH9xzlxCj97V6bK4Za4k8fKtBDY40wz4fg5nRmXzWPwWodf/ABgebcnnbMcwcfgtfqRA2ohyZflytNj01yH0ymfkjdhb/ojJ5F09"+
"60bQwefKjplEliY/uEcWWgipDRkKMV6e0Ydy7o5+3yyIzBxzGS7rtOXUeqhw0n2KZLQJ5iD8gmXNVC3CLzkeUBPOEZTH9zUTpi+D"+
"srVi2Q93mtaWJtk4aTmE1znhYDS0yZtwyxTx5JYxuDF9m8Fco0gVMchvAyfctMZaX80uUKLCUpybTcJ5d7BC6XPM/PtH4DTbLE6R"+
"I5ncBVawdBbp2Pv2p/xPclUDU2bKN6cfs42be398vknKbatIk0Q8nw4qGuspkRiDsGVUQIiAGzco3Ltoc3NDZjjvKgJcoFDRuY1J"+
"+X4NkVrN2IALTk9AUKM9Yn5gqrmW2OCwXeONwkDgMFHVLnOWGO8q3DVqtWwwuRYMMuXNkTG4J6cf4nD8ZQNIXI6SThuKMYS1HXzk"+
"YbRVDSDr8xOCZBRkIxHOwd3bA4bVryyVAqxwTMU0464CujBv5TkuRmHXB+auXiiduKnbtdFwNLFn+pHExJaoIY/ujkoeluROiHmP"+
"lJy4LuXGMJMe4CDy7TxRaLWDJ4vn/Mc01uPiS66BpzYO6hYjaBu4yJpJh7l/+iFsyI5TUS3lPG0CAWMg+eHiv8i1LmgWu2/pfMbV"+
"pl/dssC1HGRA9yt2jzRs6oPLMxqOOK5P7MD9x8J3Inp/pxKuTlTVQ8AtbVgXiH2hmVOkV9g/ggZYPTwqn16oyqApQ1NoY6BnvRGm"+
"VeDL1lj08B/kWoxnRsM9KAEqbyjZtDuXbtHRjpOiLFz0lgiJdVPcpauV8lG2I8pbTHfmX3oRIa5E6hn7lCQkdZHNVqnYtXbtMCzy"+
"1++qtwt2oRLmUjbNQTtO9Wu5bMMY6iMNrKIYSkBzjWaEI3e0dJ83ck7btysxjx9i9SR/xjHiykBgw0+xS0S5pCHvgHKFsdMUwfCu"+
"x82Ub037fnkDpOg0puU/Tw0W7jjRGRy2OcJMjGcWfzhssHTjgUOY+IpufajcLuRz5yJVzVHkiwxrX4rtwOuUz9y3PlGkbN+aM5S1"+
"TqzVEZZajwqrZgY2btlowpWT4l8G3Ltzixk2s4DcULYJFxzQYtkQVGcL5hC0AWYyabdXin1mR35719u5ojIRNyP1VqrfNE8mmNuR"+
"0xAbbt1KdsyPe7BjO2ciDD9EL2dqvhmQn7fh81J1vKhdlzPiULluTE80Q+SrEibg/qoQNTEAFgVLRZkXLvgrvJzuWkCfYovbnper"+
"RJXSaMXq1VJx/KsX04J5VyZUCwWoxM9LBtXU/wBOxabXpHJoLlyWUtx+aGv0wuenbnvsI3BllitPqNJhHmjGHLrBwL5b1L/F1a8e"+
"2Oam6QJ9qJuer5idMYhqkbXyRu3DLQBy2rfMOJxop9iEbd1gYy7cPHEIRlcc1IdoB9zMie4SJNq0l+bAjaWAqmk/cOflHzXa0C4I"+
"uw5nG1sCpxaQBFA2PihEA8v5KvSkdIthw/u8Qu5J9RbtWJUJfMq5cmYSaXblIVLjFnZl27Vt4gFpkc2DVwxdXJequiIgBoFSJbS+"+
"5StxpE50qjatXCeW4JxiPtdJYme0Mu7evc4p1EdvhpzkpXYd0OdFqUhzNVy2NcHUR6m0ZaBoFwdUfA7ELkLIHpvTykL94mku6Klj"+
"XxXcvdUPKMzsTGfbeHJclV9vBsl2y9aRltp7EbdyPbuS5o5Y5DaeKjCJM8TdcaTF8KLqCAcRC7FyAudoGdHyi/MyPbYzuRNzSPK2"+
"SgZT+0Y8tcuCgZV19JBdYzB/cFURmB07QoztnS2MURAvoLSAL4LVOcgRR9QJ/wDKKiO+SKPh/wC2xG/arctCshV45jepSuXBA+Q8"+
"xdzTcKLqjMVd3+DqMX6ah8vFRN55yh0mRIZ8U3/FgAjC7phCODARl7RUhaREzHsCgWqChcmdw2VWkSHcH01r4rt6zquc12ZNdwGx"+
"atcjvdSjcnFpS/gz5r+Vn8KK3qP/ACRHFStQHRSZ27lGIwRnOpsDVG2c5D4tiudwOp5FgANu5TtDVcmftxgBTiJZqVsPc9Q1YwBI"+
"c5PVGFy8DttenhrYZPMqFqzWci1dm1O2q4T/AHjjI58FIM4xbYpG23bOMW5h4ZrbLfT2oG2DpGD5+COl6qIvAxiE1yQRlaviUdhK"+
"EmoXYncvv4gcsw76tpbNHRyBy9uY97oTuQM7hHVl7UTGOpsBkB4KsVEG0HuVOnJ9qn6S3AR1RZz0q7alATuRoJF/c21R1TlrEeLj"+
"Gu8IN5K194TxpAVJOAG9R0/24nUN52lBm64QffIr08Yf2jLmj+3/AFLqcLlMJR2g4FapY+9duLPmPkn85xCnZuXBB8BcjrhXa1Yr"+
"XffSzacYlzieClchITtyP2zuRfcp0fV1b0B6a1VnujHTsG5XxkJkDwUtRdgG4BYutyY45o+mNjn1axcjLSWzCcxJiGhbcPygvRsF"+
"q6IE8o3KFvQ1uZ0D6g+bo01AeCjK9JhGtPgv8GzSeZNN9W2KXp2ErhDXLrYHELmjR+3N/pNCp0cQlpfgu3fFwziBgek4s4RPpb04"+
"xFCZPjsdl9n7sP2UZt8ao2L7kiOsTPWA7NvqtERyYznI1AHzURdGtnlchhwLoTnMm6BJpvXDxVgk80b45mw1fqVPRF5aqacmkCNu"+
"wrVKBjGDGMdpBz3KmOw19oUbjdt4vKEsB7fmoXbXp5XRbpGY5YPljjVG+/2mJlbkXhplWjh1IGIgzaNODNQja6cjSAIvvJ2fNG2G"+
"eNakDl21RuXhalXSItrwxIxBVzVG4DeiYmUAMDTAlAWp8zB3GkVwOfuQEnnePTbH/wBl92fJlbjSI/XxWrCYw2sdiJczi9cX4b1K"+
"cLfZ7Z0Ri60BgcXPwdObeqAxlGqOks/v3KHct6ImoNW4o9nllGuiXy2odoMLj67rPp2RGx1IzuzEzh3Qz8D0qfb5natD7y7JrtvX"+
"IeZ4R9mmIWmPLPZl7UL99y5aMRmWdZPSkeV3y25ZJ5WNJbSIj+1LjwzUZxMBcjF7kYuYy0eavnip3uYXJbRszf8ARXDaI/y5DlMg"+
"8dWxird0UEo1Gw4Ee1ZrlH4S0f8AC8+2a13b1HXcfXEGBA+rLcQjHpLAjTQHiME4lGn1SAHsRHcjcliRCreKEYxxw2UxPBSELgkG"+
"5dbRqMVG4xIn0BqHaRmucR1SqfqG7YnEm3FWtGruyNX2AfxQJ6YeUYICI5XflphjghIznKOwjH4YK3IxlBg+nzSB37FrJ5so70Ls"+
"T91nYUdCc4tcMjI5ptUJ9wAynHFFC4328/BRuG3ERMX7sTo3McfFlds+n0SjbgZXnoOXGOn5oXJXGBkIVeg28EYgatnAIFGMC+4n"+
"4IR7R7seYg8uG1CjdvlXO5HmffhTFti7dieiedWcKFvUJNpN0jpPbGzaVtVW4I/BOBqkcIfMnygJrl6k9IN6OTjfimGAoyKeR4rl"+
"t6r0zzXT5Y5xA37VK5JhiLUZYOdvhmueMdUjUbGyVqcJxjbgHrUviBTatd2RjMR5eWhiavX8Ixsgd0x1a7hpGtKKYnc0m6Mh7+C7"+
"N6eojA8B+aoTJAbGT7nX+R6p46g8LQzGWo5KMXMoOe3ugKMPYhUSG0H5IPSRamIXWJxDtGIp+QuUsdic4KWmooD+c1OnmBIZmpsX"+
"9se1aBjmiSG0h2NFGWNdX+50LpHJmyI1ahmStN23rG+L08E+nSd1QpW/Tz1mNCBkdhUJGEpxjiImvtXdtR7VzzjB+I2qMIh5HqKk"+
"AeR9Or6iNie5cNm7H/kHPqG/grcDa71kk88QzNhqH0bl9UI4aenhvTHmk/QUNLm7gbdJR4KNy3aGyIrW5ma+WKuSk9zvQe7tpgNi"+
"ugdNyLTj/uDcFcvjUYf8ILOBmbmzNRvDGP8Auiae9QNu4Y3ZzpcnXHauqIiMsT/qrl4we1cIBmKlvdigIy5fppzPvULcZfcOL0iP"+
"FR7dyVz67oi0I7xmQo2rv9+HKYtVhh7l/kapm50i3HZ/KoSkCW/5BEs5xAGQUfUMIaABOBckZDfijctR7cps8cIiXmpnHggLcgOV"+
"je0+Z8tW6jJ3F23hyB/C5bOPgU4kIyAfB0S0dUssa7lG5GFR5iRqfOmxCV2GqDabmZOzgy/bGlRpRiABqoe5Tm+l0TAGMrfXHgpW"+
"TcMjMtCMS0ny0spAyIuHVWQgaja6BuiBYdNbfw4of48ddu3QEO5OJbBSuN27UxzDIEnNUie3pEqVcGmpASLTNoGpwbBP8Fan6mcB"+
"E8+nqPDT+q79+9pNdGTl8KUYDBO8bwnExBhgI/nah299dLZZsjA1VuXZjPUGL0AMc/1XekB6e3N9Eo0HHStWMQalSk+HTxKnbhKM"+
"AwcyzkcOACMvUYM5fFuH6oWPSVtQykdQL7dngu3KQsv/AHL4rJtgOQQ7M5AyBjqdgYDyiPxTUTSetCA36SK+2DHVSVvqLHA82ahO"+
"7b+3GJhKOodyXhjRC56U6IRfl2PT3qdq6JS0nRhl4fNFVoiPUDWIjkCNu3QeV1KBqdowQ4BO7Rj1SOAUoWOSJrdvEVP6I29IGlw7"+
"nV8VOIjiD5i1fFMR4qrSByWqUBADyhRNvMYIl1EUiLkRpunB/MHyKcRuiIqJQj3BxopWCPuRi8Zb9i7cjEwBeZxjBx0g7ScAEbfp"+
"7hsz06jbnbIm/wC1uUhCUrxu2YYxh1cACv8AJr2g3Z9MOQQf6grjyNyyeWWrDClEZap/thy4/otOudoj9r+9ygwXTzCYoaUz9y7g"+
"DR1S6fpiMWwXzV4YicIn3oRExCGrlncqXAwgFGPci+Nz0wfS/wBTR81UbV0wIvW2IDy1l+XHMKbwlj9uIcCLYkiTKVubXG+k0fcQ"+
"oWoQ1003fTRbVKOEyAM6uvTQNsCJumczLqjqGhpIaLn9onVOD9ZozqFu5bMrvqSe3KLRk4xJlhVS9ELktPpoSuepvEM2ekDZs3lW"+
"QanVhwCpUnJPamWBbcRwWp22adnHFC5ckZCOEDXDcjtHtRtT5XkJZNTAna2xTPpJnQzTlGUQC2wSehUpiei4KXImWjlyw35KNq3S"+
"UHeQoS+MZBHm1Cfk+aBheNwNUS5WAGb1b9yGoFsN8U2Gmh28UdMerE7TtK1+umYsKWBMSkfZyxUdIjbPljiG2yJRt39M4S5pRBEK"+
"ZN8UAJd2zL+1KgpmjG0bUnppdvYcPAqPc+yBzaji20BQua+Qh+flL+K7baY/Leu7DqFaZrTFwX6d2zfwXMNUIn8lSnDGIpVuKNX3"+
"oQHNI0YIC9KMIA831J5l2Vycjyfkj4rVo1afINm5Nz9uIpHUDKO4PiFSLZcd61wuUtPI1cVBXblb06qk2wTUYOoWBOXp7RYfu1Yv"+
"4q7Yk8uZ/t8usfuOQKIPLHK3CkfYvUXoBjNoD9r9X8FahhGo/RD1FoarmljHKQ/XYoyi9y39XTOJ+RUpTjG5EdRNLg/mTbMkNYou"+
"2A0cmWqEiYpjioguRCIhCIwAUJtS1WIeLDwCt3Lo+3DG1F2K024DtR6DLmbwTCSeZEYjGX5xWid1hb6HLHij6i3dGujPgclO7M/e"+
"L6jhVCMS12FbZGLx/gubqziVC3bGiAGEdq5pcuIrmFFpUBEp/BSMhzNpiaHHP2LVPRCA6iZCnsRNgNI9V2Qw3AIkSYYmRREgBqDu"+
"erw3rA/nauU6eCiJXdUiWbYtGoasWz4rsxLTzuM4i+CkROpNXfFVWqMWG0+xRiAdQPB4vvwW9DMbUD7NiBbwC2AYzwC1xi8sP3e1"+
"XGJDDU5zbL30Ua0kPiEDCb8wkfD9UObAu4wi2OpGcY6iZHSr+kUkeZxTBduXJ3DGIIpJmeceJ96uQhEwnEkNHKD/AKLSP7v1RcKN"+
"zCMH1Ha4ZkXhy5tVfVCXUFzwFuTCMZW+Ut8HRiIFpUuAyJjTdmtPprY7WEtNI0VVCGquqrUcb9rK0DHk6q5nbVAWNJAc3IEs7ijE"+
"ZoWLX29QrHHV/NL5IWLnl/s3DUROx/pnsyKt25zEjbiRqOYHS+9G63IOWHAfqrVqY1cpNxqNI1YS+K02yTbFNUqVVzGcgxpWn6BA"+
"y0SLMxcHcNcfmCnhCIh/1xk8/wDcyGj09Kx5/e5Woy1Szl5Rujs8cUDEtbIyD/6Ki0hRibcTEZEIweXpxVmLx9hw8FGdyUDN3MDU"+
"0wMCM0eV9usv7k9u4fT7o1if6MkTdvzn/LHSPio11S8y0x5QoGMO3dsyftk9bhn8EYMHxCLOImhOGCiX+4KtH5nFTleixwgchx2o"+
"l+Z2iMnK7pv4El7dIE+Zh5nKF2UhqkC0m6nz4LTEf1KppuQbzV8FOEsSGJ34oRFJO34SO2lVCenmuAmW0DL9Vr0tcnS2Mtmpsl2Y"+
"y1W7dH3jEjxTA821RkT1D4UKtMHgHB3V2I6oUty7Z3RAwDYkyK5tNhhQANKuP5K7ugmZpJyWorn+YPsnpjTVHe+ar7VDIdUp5gCq"+
"lHliZDuSFeUZDjVdq1UjDAYcVgW2rt2ubu9YxBf9FH0tnH/lmdoXa1NHFv1QEnbKKidONAMnO1NbJEYjleg4rXOeoZ7JKWuTWwfY"+
"Pmj2RKdo9Z3jZLYeCunSNEaRm5c8XZwpmOqNqkbZAxJ+knLehIQuEg9IAaT5LuRlIQljKNJDTi/6LpwcgXOaRO0vsXzUtFgazIG5"+
"KTO+GCehbKJifc6Ni5/chWG+P8E5wNAnPgyEcBqCnEkREZganwc/oowNO2ACFolHULEzWJaXNt9i1Sjp1AaYZDahKQBctHHEVUZX"+
"Jykw0h4jAHNDuXJsH5QGf3KMjKeo05o0qjZtyOp3MMosoyE2F2sfn7FGPbY2uUlyUIoQA0tnn4rm9oVT2TlIn5oX5kCJydziyEPT"+
"yPcBcvsGxSEzFmJlIl6cUNd+ANAzxzwCMj/5VRBlUwbx2qz/AI7zBHM+kMpWe4bM4NGccfg7qPc5bccTIcxKiJOauGxTgx7uM4xw"+
"hxIqtUJ/cPV5SUJyHc00lEYmP6hSNvkulfbqTyx/cd37VcBHOKMMttScdyGuTACrZnY0cl9uM4xudIiKca4Bc0nPuB+ayEfpHz2q"+
"itDyjSPmWR/kZvH84q4RsYlDVPuP1WpYP8lZPpCBp5dBHm3ruWZatGEZ5t8kJXIwBGpm6WwJHyVuEhqt6Nuk6hRjwT3T6Yg1EG9l"+
"XR1HTu/LoxtXZCAFcyAEdfqbkpyxgQJxP54p7d2D7JCvhgtVy1rJztn3sUO/3KZ6f0T2717t/wDXKLtwJWgen17BcP5qhLSP8eA8"+
"rDRtLZhs0JXb2q3B2iWNSPeu7KA1u/KTEPwTmGq5dDQcuB+56Kgq5rlVYOcyaoG/94Gkbo6gPmFc5O/C6XjdgWiIjJsnOK1Qk0xU"+
"B2bgVKkbjuRrrjjVXI6BZskg2hHANnJAdjVCPSCc9u9G7IymZDzH4LuWrs4Sl02tTCL4iMlCEfTTuXoBu9FgTvKuXLvoZjVECT7h"+
"i7LTI56gc3UbZaTHP85KIEZdwnnEm07vyULfcEohoDUKtiA8WdNGcIRjy6LcAFGMZiIixrQFsvGiEjU5krU323McfcQtQi/wXOBb"+
"mNjRPEGgPBSE5/b65nERfNlP1UbRtGEGjqpOR/dxlgoxPMY+xR1Z/Afg8S20p3k1NZj7sVGQEM6kj3gVXcJ+3lRvFijKNwM5JkPn"+
"JPUrCQ4hUHuWawZVcjKMfzRCnLlEYBaAKDqLYn+CdjVVHtCoumiav4FSALCQwxHswQ+3DeQJx/8AUqTSPbPSG/VRlHmIDasvCI+K"+
"k0u6DAmMpUOoUxVJVZwcwNoKPUQf3M59teKlalHHYark6cDXPeoCOi/cNZTdwNw3I2/StG7/ANjaqH85Im7c7kwKbl3QOjVHcaiK"+
"kbMdcY5x4stV6TSasRUDZXbuUL8RqhL6SxjuZYdvOtB7k4mDwUbfqLhuxjWD4jxxXJFt67gOm2B9ue6VSR+qjbt2WtWObQf7Yk/L"+
"Xer1ixZlG36g652wCc8lq9VKzCJrbjKPQTiW+pS7mqEfUSeUZScybbtTHKoVvzSk8rkI/wC0SPyQUJFSPRZHM8qYZl1+4Z7kwOnl"+
"q+3YiHnqfqB2blcnGrczFZVANPmoE3K7IY13phpnbkAWLknZq4JuzK3M+cSePsUI29Wk4a6U2sOkL7nT5tg3rp6SG/VRhdN0Xr09"+
"MNAHtqVyznFwwOkYSjJs9gUoQkZxHNb1BuY4om8ZQLbNQPEOnhxwohKQ1GXv+ZUBCOuermls4lCJ6o0K/wA4Wu4BW5D/AOyFn0cB"+
"at+eRrOXijauUmN9JDZxUgzasVQAHbmndYKBHNM80i9GyCMLc9MuqE4ypXIr7tucb31GjjLlyXzUAZD7lI1EfGmSlOxzQmBrEsC2"+
"xFni9A9fzuXz/X8HflJmGzoAx96Eo1048FISHJhOB8p/QqXqPTZ1kxxTEkVdjh7U7ufpyUZyLRzG9UmiHCLF3wIQ04ANpq34YplW"+
"WCxc4J8T5p7F2Y9I6j8lGDdLVzojXNwVCIlrMeqdKvlwCaUq+PxWP6KsUNy/dcZydijclLRbiaWnDnVm36qUMSPJx8x3ZJ4YsRLU"+
"enaGXI+9VnxGCELXLb+snq8FG7iwMDPa9HG7YFPuxY9LbgiQXgX/ANVXmjszZGknwt1dgpERYZbvBV/D3Vy3hd25LkFA2JO5fbiI"+
"Q9vxTepg3/8AWFCE9u53fTXMJjF9hCAI7lvy1quYzAPkdStenj24y65SLykpX5H7VmsnzOQRE62yXi/xVqdsgyB1xmMMM/BHvXD3"+
"T5oHD+nMb0Nc58dXMfDJQaAjaZhtp8+KJ1gwZgMCDtG8Jm0n6hjwVDRMMtlD7UxmWKCrVskZSkXZn3bl3TF/T2Ix7wJYGtI/1KU5"+
"HmkXKoWQlE+yuKJjyAdMqkcN5TxYyG3BO1cz4o/47gZzJrvHBW5GXdjIZctsbGOJQ73SGEmi5B4ZqMp3oS182Ln8stLDtRMe7HU7"+
"k/HSi8iYgdWEmGJ8Pxdq/hU12p4x1RlX7dXfemvQnDYR1IwHq9G3XFveuX1UJeLD2rVqD/8AWK/BMHWO8DLgukkbCvtsJ4yHzXM5"+
"4oC3Cd+c+e2YdIG3VgAUL3d7g6rsSGYbAUDp1QI5PktM4TBHisKZvuQ0F40YjBkUxxyOzeEZHA+UJso0Us9eKnclL7cWMog1eP8A"+
"bHtT4KmO1TGJhzjhhL5KOtjvdEiIDkvcdzXesjHAhcxByIGw4JwdOjzSwPFOFG9d5RJ9I4KfZxmXmU46lOU5NAnmhGjna2ClbiWj"+
"Lq37kaP+ik2fKcAPZtWDxGC2NQSUZTuR7dPtxqZeOVFrdvpi2XgjGE3tEuQIt7s0bnMGrGOkFGN3lllCO3eclGcvUdy2zwI4UOxl"+
"T1Df0/xVyE74lGdWl+arVEAvUEDNGUqRFZE0DDMqOrMuWzYYqEWAwjMj6RktNk9oiLkSLOXwBT6WI24/qg9K1WuBiJEEeGxRmPTD"+
"l5hIQ/ijKYEadQ0ykPAHYn7BZxqf+OKEbhmCKx5aNm4yUDaMafUWpluQ0xDfzBGHbLeChrtyjDUNRYEAbVK5I6PNLwWmVY6jK3IY"+
"82IA2FRnA8l2p/mFKqiL0uZKqxDeBHwQi/abYQccVH7xphyOtWoB/wCn5IgCPbAxEgWCHb1zj5RQiqM7tiUYEuZUdvBHXAX5QHLG"+
"WR3lahbtgxH29AZuO1AzkZmOAK7HpwzY3DUnau1EtbxwAMuLZLGu9Y+K16gHDnY4xRELheR+5fjgIZCK1DpybD8700W7Nqty6cB+"+
"pX2OUYe3avmv/9oACAEBAwE/IV9ivAFfrUrCBLwfa4x2wd5GG8ZhaoBzh/MS6CdsCvGahrobQwHyAIjfxUu0zivDXTY7lJ6OSkOc"+
"OWNADy0fkI5hzRSFcnFZmfFQ+AvQBhS3lbrhFFEAvYq7C2zVzCGvGabs9tdcQmcnSGiaqA7VD4Gq8Sy4bTC/tg1DbVWg3k2uFwxR"+
"3wO9BA4BBw4bxXxUJ4FXXUuz2lzXKkdHE4JA32/zBIoCGO//ACW0PpyvggYLOtDSsNioo95Kr4IARE4Df2Qx4Rrl8vAQSLxahy6A"+
"LWMWqCqi2j1EFjI/SHwpDZv+IyzsBormBCJoNpYRObjxS69lZq1W0XwHMcWE95hFmnTPYQy6RAxsmLqZL6GlID7REuXpEuyGAZXx"+
"AMeTj/kDovGl+ztmdK+HryYjQ3pjV3kD3hwCvyPw2VFm4DMgfoEonbW1+dQ4AcrPe6KzXOYZ7pdnTs8wZMZu2fEEt83E/wDiEmqV"+
"UtbCDkmcoWP8EApyYYfk1jWW7WxiA0B8DqOAamkXO4xu1P5gqp4HZELCdPCXixcAY3GDJ4aX3j/0JXbLOXUqLKgfeXQGGiZtSt5m"+
"e4HM1hnDlfG/5geGdKK5/m5YxjItCaJjdI7NHe5TBPyJbys1iIiGvLrhV0e0rqexkvbFX1DNaaXq6cgdRVhySZ8BlNM4iShR/sao"+
"lAWk0OI1VdRFpqw+7/srLDIOmsf1HN5N8AuedTWgsWHe+BuN25jYfk/ATJVBtNfGi2nczgK9zago+LRo3V7rNz0E19jwgeWZSX5I"+
"KSMaoL8bIlgLQB0b2Y2MRv0hHLMCsqV4mI8W+dvsoyviCD3QxCuWx7fxNsU5p7iynNcibALaneyMuTAG/Fjf4ixro9a8unxULEBo"+
"aBdt8kpImgymuOsSjPA/47hzpq3jN/SUGLtW7E/csk1Allc2dQWZlQhgviBbejPB+HVQ0YspFPA5CUvXMqhWua/cKYo3itZgSpdy"+
"atZQ9RcSYUwZ5fGodCsmgtW5I/UDbsh4u8rWwgiwEALXACv5m6ThW982Tf4UXv51neghJniut4UOSxELc8WmRoAtMExcLdfOtmRy"+
"NfeBAA0aGupRwrLjEv4u1q/OpYxTcFkwauEeJQ+7UZLOEaW1mUzAzuWFfY51DxiFgoy7OjUMwUGgoaob0xymkBNi4rDI+0tpA70D"+
"xIGIVEALva2zylOYD8cBycxaLN+cqtr5pogz/wAEJzNHilmtjn4jUV1h36TIf4G89fqVtRzo20fLvDAoPjlbPjNJFlRVg0VAZdv4"+
"1HBrAxWYLRgqUkYkI2Aal1VRu/rv+PaEdyl2MlVmxagLOpzB3/kNBV63N+3MrQYeEdg9yiBMOQDsbhp7cH5dj4n/AI6kDpL9oJY2"+
"4YM09XqcW7v8eaimztXKteziWY0Qzae3+S8EHITn31RNLDDv+UHHaYbJ4OvS2qNXLefAf2wwyVs0Ql0fk/iMhoB0RY7TVqlPgiIs"+
"iitDxQaqZJXWyzZC1sXcMNS3ArbZdJnTEwfNQlS8yE0R6prfB3BLI0/t37RC7WK28/LmF7WJJ1VZ1Li2fkz48Q++5x1gAnHEDjpi"+
"YtgZXa898pzEatmhriFV1r+JcLhlC9BgpZe1l96yxGhscTFWdV44PiCQifPQxrM2D4HPGrCLV6mFI2OP6EHnmnLnOpoC+ami22Xe"+
"ZX0Pg+BmAJryhi7vBKM4imqIdezLryL2KMg3WIirE12e9im4JgGcIW0w3vMZ6YvwWPNS4xlLqUq3EXeOe2bjJ26Awu0LwX0SqOk4"+
"zmcMKmlXqHLFwbjIucZxDl4AwGieKg1E1HCrt0clrn4mYcYrGn3sZbC2/wDLiHVQvbykbVu//Nw20B4MPzzOBglGzr/UN3MnDcWo"+
"4zCsvEtXGoQrqk5dyDh8xvgDl4u6MrcFpK8ItLR946uGLB26Hi2ZGozD7+Vj8ytXdngrlG3ywYOizav1mD1keJsyEbkb+8rEWmFm"+
"aUNKRtjTZM7AEaxUWkbfC+PbEuCr3RxcwWq7fWe5vswqrG17GRxF7cxMpkY1DPQEZp0PtM6rbjoStWY7WkcZ7mIqhFfVQBr8TLYK"+
"DCdWBs95aff6itlW/J/cs05qCvnmzuL3h5OCXThMilVdBXq21fMoI2Ryis+Fp94NoAxMexwfbEo37nmGAgM0JV88R2bFecPHZx4l"+
"RtvbeSykssHEcvxb+7i2BgZp+6qOUaxe7YLTq78xuQbvIwZ8uCHMwAAEdIbEZigujZwMW+aamgmF2NoWE4SCUarb/VTQ4qce1HMf"+
"WpCGNND0wwJITQwAcHtOLL5EwDMsV8pn+r23KQsaAaPFSjoFAoA0HggyOYEQdnj5ambQ6FSZDM9nL7QgQ0litiOxlQGJuVGXu1L+"+
"FzlQQ8r1qUyWc5BeXtNI1sIXod8S2CgDsD5xwgiAkMAA1XtHY2Lw3XIeYDd7YfHEHBTf+z2Xrn6djMilJRK2oKNlS8wTV5fGYTO7"+
"4un8QfZnxP7LL2jbm20sl78srGIYL4PbRExJ/L8zKFS7o8qcYjoQ7MX/AGgLLxzw9ubh4Y1EFAaqMBG7NeNdxRa2+9+WpkGcbief"+
"aUxKrBS2PdwA4HmCaIvD1/5AZXhg4h8i8SnaFAGXpURQn3GrI1K2ZLJleLnJdiK3ZttlwZbcTUe3Xj8cUxzar4fjtz7EAKoF8wXO"+
"hmFTzXmefEuQXy1TNRyc0QViMuQGmtaeIsFrk2NdWLtzDJY6Kg/GoT04hprWQTzCys06dF9Wau4HGb6aWq6sdEztrLXXOtcczVIf"+
"M8DAqzHbB2UJ01QFrvcPMbuxSqLgof7gAiD52ccWhIg+afsuFMA1oTQSYhTNfymsI4IrpdkttEyZv4FcRem8rTDzt+4A0bL8nwaX"+
"9EvERSwXrJijiFRziddP+y9yGRg88aJTB3OOWIMdM2BCn5GaMxfiurmLMhoR0dkt0LqNYYUc+0D5VpBZYRWHncztla7GDmA+Ub5R"+
"BdjRR0LeJmjos6BfvWJ4yDaglTLGvMCCb9VMjO0A1NLVckf2jE66w3/xGN+GMPNTATNvfzGGYcnOLVxLp11A8oxfKy694gv1RmZw"+
"lN52dReorm7sM0OoFbWW8w8Ng3EoAuUReHq5d+irj/BkjupCu3kJl+TMpFXM7uWjDqOWl4vV4YpdrDQuVNX35ivAW65Xr2Gwj+xa"+
"mRuqnq1645ilOVhjZxzVZSUVDpQDAmAvJmX0Cu2AGenKfmc7zKUS78A0xD69uO4FyuJWVvu7+zPMZw0Y+Bt6lGOIMV86jFIuTicI"+
"lMc1wv6hL6cFu4Cw2dSnYPZiShbSdGjkPaIgXQosar2iG5d7a+qZYTQQNKBVdHcC8bhgNDx4jnP95IN+GCPlhDTd4x8pWhC11e02"+
"tEUVTm1Fr3VMU5N8Ht7VKxRF3nx+5Ro+fVWxGn8kIfd0teFCoIsC1ypSAa4JfV0scpwDdV+ILwJYGlum2F1Vf8OVvnS4mmQycQM+"+
"G/8AZTx8vLxaGKS/aoL1s8o4GxU4sRapVpCnS9CuJpxx0f7ChkYr+J3QwcbQ/KMBgtl4O/bUfwOU0O8tXUpEa05WxSjk1nMqIvQe"+
"WOTZIVwEMKGxAWcpts7jQKO47K5N1tpct90sQGy94us+G5nm9o4QZdGRLLCkXM2DdBi+I0c6u33dcVcURlCOxakcr8RUARaJUrc1"+
"TnZLSGF07hlB4Xbwe7hb0tCw1dnJizccKyGyNdw2U2l2nTerHUfRLFvMor/BHDkrEBTysFcqnONSgtovQfcPV6maberLmJ1Q2stP"+
"KrUG92has9lmFZhcBipGYr4vrEG6gRQWcID8HMVEbKUB1UHO3MHgB4BV/wCNQ0T34Mgqi1csXXixULyZqNJWkjbgUzp0v9RRPmDU"+
"Idyb3/HMONJ2Cy/GZezU2X7LW/aAEPAVD8FKuNyk6Aj/ACFexFmZuaJVrgJzhKDMsNGUb84Vy+IM33RfPOLU3EsxXv2q/uUijgIL"+
"jaruuJXS+Jw3j8wKmW/O5DRoe5hpNZKKydODL7wNNtrqBdgQluLqOWCViv7lRc1U93P6ZZfmnO9vMM7lhtt+6IlouPDzcuDMqJyp"+
"gmL/AFKKU5sf+mIp+F/hfVxeLBmdIspcq6Md+8qYcUBOh4lmGQr8HCC3acRdnX79gimj44KhupweD4Vipjc4BfOmnZlMt0Qsyion"+
"g2s3xLgJ2Euh4BRmaAU9rWqPfMoBHkyVrtlVru2v5HFeSLVilsT2GVfI6isz4EulVaBTASuqX7I4RCeIgFBaiwqoW6ZZ0MKyXxc4"+
"PD4+KP8AYFuwVeOkNWYqHvDWlfErvHygpNgA/NNwJH80DHAGntDwqFAKXneioELvjN8cG7lEJ7w2+3IMQ01BM1Zyq7wSvucVz/hi"+
"B5zcv2sFPnHsZvyzT4Bo9jgUci/EKHVXYVRY6qDB0DiF4VtMwEDdD1TrxtKF4a97i9Cay09eJXiUEBVJWfccy4zJsTK2ww8QethV"+
"Lm2bAMVULXvkORNi6pxF13WrhrAAzCTuO2K398Vqbkju6x4OoFg2tHyUt7lwZaI2vOrhit7cV4BDXTuZccI90xE/PIxguKF4qu3m"+
"xU6p73ARoOmi0hvvFvQAUlpXZKhJcbnFQxSaiJgqZz4jE7GHcunsPL47zGRV8le4/Gomc9mGuTliBnPtEP8AZMFQ+I1AJRCo7b5H"+
"yZidpqLroJ0EJ0djNoB5H8HMrCcl6ulvBmNuzkWH8eE1wlBQoXbfj2lZya3q6vG7q6fMbsLTu1BlY6Jiue7AXVqzPXdh2ffUpLrk"+
"4l4U7+fUE4oD3VhnFw1q+XcaSn3f7L0zoLdeK09MYQi9u6NvzAViK6h9/wBxqqGa53i7ZC8T5gDNFvBdXQFzJaD2BCm5vTXzFi1m"+
"/ad7vuYztYKKvm6OCViC57hqgriZqA2lg/V4jkov0ycgo1mWNluNSHmZt4VowwdF/l4wp7PU04Q272Ns36iy0w5vYdI5u43gzzZn"+
"8StS8kFL5yShuDlZPD8y2zxvw9vHMokv3Lv4f1zFQAweX5Z7hgLgsnHQnRe5fa58F3VQ+WAzvFiRoVj9szGUq7PXdQVNjFjshWdz"+
"eJtmDHvTD3w3geOGRL5RCVr2FM45cUiCgLit8ZLo5isVWYecbv8AMv5UQHzTV3/BBfbQTWgA41eZUDRoIDyxM2/hjB86CRnGCvZy"+
"wgyGUoaNNdBgtqw2Nzukvg2hMaxAsA27qgiL0OQjlBWiq98zGoKsq20jmol4MyyItqVRaWFh3glmC0BVjts/wlA/Jf7uMN1KxfqA"+
"4OC5+CYo9xk/meOuYM2f2y2vgVmLKqY9K5fGmAt82A4m2wEAlGUiHKv4jXHGyF4OSsnEEq3gd9RdUqQWcMQ+wxHz7YdF52SyzA80"+
"40Kh3XJBfyf6gcvlX8+8J43x24sHhRbIsumZu/a7iItqEpaVv8mmEA7pQHoVv7S+or9Ea66RqxlHwkr1qGaKsOCq8QQp7wvZXMWx"+
"uMA0mnphpIRvgLaAW8yuotHglbIxxcJz8dQTWQsr+Y2mfrck7eY1mBqx03iCtX56mUOVpg/HiF+TOGkJSMXUTVzRyyiZtv8AZcKC"+
"igG5b5i7H8zDrf8AfBK9VxADsAiX1Q0N1LhjlZ8c6mxcUG17s7lR7lUHmzsbYArTm8g5ceKlFgLv2C2aHzGF8Gtg2NZVwYiik1tb"+
"0ABVQkCfkHtgcMTjEDS5VaYgzqlvLRNxgclarcf+wbLEWVq1D08+0bXdSmy0L/FJma5F3kPzUDdrecA5P0x9t4bt58cXLvE1FpA7"+
"uziW7MEZCvfaPe4wrjjB+2KM5Bo8d/Mw2ltrtvi2VCh4Y4Y8y5aILTjH8e8FUUP0jC+GcVOMZxUxZ0/Uqs/zwDOKlIx4IBVvkoIX"+
"AbiVyK0c/uBV+phFMrCKcSguFA0P67iDGrb4rGXZhit22pdNYtWI0C5nk/qX+wYc1Wv4lbov3rEO6qCXHCfGIRTibXQuTR3LjQA4"+
"itCrtCDOI5abvm3MvtDF/wDjk045x1Lx52eO/eI85KNyTo4EXaiGejN6MG1gyLtsBoX/AIgzklWi53w2yfiIj5BY+U+AzibcOk59"+
"ztZZR7ShUFKNF3Y0J7SyrLfyYBGuKhiTdLL4ixXveJTlpq6drul2hGsl7dF62823D4bwSBMcnQdZhXomBdqzoHISCpFCC9qzsgMq"+
"StXDYeGaIYLXmqcbiwDzymMYjlvkoziAExAM43R4Mxb74BSUmsF7i0o6Q2Y4GdNFVYtHLe4e3cpOwF3uJ2WZAdXRHo0VanANa2RB"+
"Zy+w+8prVlt3jiUJ1cvDmveYnxd/MUHjzLwdq+DY4gbzaShzULrFkQW695FhfCSMoBhTG9cQHoJms51Z0C7mybyLisNoM2rrcvmI"+
"ERsFIOXtGlKlaw1Rh4EOjTFrbNLXxLikEVJqwFt4mD+VYJHd2BaIah/JuErJeYo2UHUu0HKOINqGFHgWuqqHvFq5u+2OSd5E74pk"+
"LMzSh6bgDK0W31UGaURRqG5m3uUgQBDgOKhol/HJLTGxX8/aCfSclYOTTXiGIOUiqyqMLxK5B74qPMLybjuoDTPYwFsAzmFw7xsz"+
"XGeymFGaVRhETVmUu7jLt6Laj1OJQqDbVjw9oxBWiEzyMeBxKUTAEXuKATVJYpqGoDm1W+4Dst2nP/Is9U5OdcKroh0Ao1Zs2xbM"+
"VUVkLsHRZW6d0S8KCtq7ZNlMu/Ht1s+L5gEOIrJ+NwomZ/I/D+oGh5alvdcf3Kob1X3sPFsMlmUEfgw6gmslbS9YVSuC9hxheq1Q"+
"bIxgctDgDve0t3yYvzo4Fw7NDFu7az/yLq7IZuheLeN/xKxV0W+l0Dcu2k4DbzWZdJC/El6OWrsvtjzoFD2/7KwA9lntTZXcJm8g"+
"j2LIuNWtTQdvTlhjIFZf1mUhn/sQh0p8RkM2xU0Cx81FakRlX5gbaXM/XsSvArgcr4jpGO176jSLDCL6qzHheIQchtgYOFltzLQX"+
"d+GOACbQJGHK5g26l3WlkO+hin5jbGIF9yq0K3CGtCi6VNgvVblSWQ4ssfJZODoLg+y3J2ReohiuTw4DrmOMJVlo2WrMaxGELbVr"+
"dl/M8Vp0L99RieOMsIsmzQ/mUjO/m3RfNPEpapmALlyOnUw1isbV4sznnMyCgVx7tRUIEqAOBxhKOl98y6j6HwbvXG6mbjHER6C1"+
"fFR5Q2BRN5jNpXyBd5Ie82/iLZEdqeMnveJVqhukHhmh1KHSnx06/JiILlIcFIX2phpedxZaXqvwJrkXon+QlZpern2G2VhoL6us"+
"OZfhSoWDx8vPEzGUoqAG2zy6YotZ+4DBTg9ZjACqeel8VLwWtD2IFh5Fs6VVe3EPJYXkXa5rKM0S9CZV84IVW/A1wVrNQaT9Ge+4"+
"vqu1/wBYioaFUvssz7MBYTr6mXauLiARyCjqDbON6mL2sYpu4o7lVlXU0Yd2Fi9hCqYxp3cJWPa1V1huArQzuqqzs0OO/Mw8IWrl"+
"L/iUB7rgf0lw1bUPJYs7qEhaKxYWsAIbKi1DtDd8VwONwwmrAm1xesJYZhH4EtLIGkooeJdUOARyyh+nc392cGtts0GCpmUyrlVS"+
"a6dBNUBMqMnPOxLmALzlUaNx5Ix5jtWUob1HuCnwIUTrolgiK6VHnhVQ61dAbVDbJxAbVGDKW0dU30QRDbbdpsYoMyjgvhi5b0u6"+
"4RXIgklqEo/UpTN97xXRuGKpV1UJx+AvEqoMC1GXDyObblGjcCvKzRNtcn9aF/KArVWV1oIvNy1s0LgfJyzxxmGCzgm6ObAHMeOx"+
"wy8aGwX1F2nsYv8AuAsgVPB7DY+YI0OiKva7s7qCBQmFyZ9h694vcal03HCXZmAAFoPrnVWp1MBQGtYKG9w6e5TqHGQx5j/MWibw"+
"zwOO5USNV3Y2cYMwRaTalGTNORyBMxwis9cOG2yMBq5gcUGjQO7cQQLRdmsC6ujEBm+DKmT9C3UHH+txXleQpDN/k8viXwL3y/ru"+
"M9ldFGJdcoBtAtxstAwChQ3RtdIMtwxdBAdFld2PvLDPt+xhbCWeP3AbgNBt6nPaifkOgZZzbiU5Htev3AELizA6GFVvUt95yfK8"+
"quhn4IfMbWNiKx/a+CF9wdTRbqLrPIvJMTNVTTZaWqYvlXyQZtb2ZGotVKrRGMcU5lcNr/hMCjLAh8q5MQDNmrZP2PeOblXPA9LG"+
"mlD+5eMHAd9st+9kW/wPeGP9mOEK1yXuXhI7UyBWYDa2+ZuwktC8uheCMEIcz8nWppHPF/dy/mu2hb5cPvMmC0DyvQHnmNTTcj5c"+
"+Nl6m2WWbrTy4FvlM+U81nydbSZEJrXl/kvfzKJrL+46lTykP5zM6/1/5HHL3BvBqqyrviMwrzeFUt0acXw3KpiAHga/UIjaGDt/"+
"7DGF14Z8RIVLZd/QLT4TADnDVg0rcOzBYat1N9tWSl8MFJrQC0NPEtDZLUayYCvFS49+0QINcUtMO1yzVqjU3m2mQy7lXne4HF5d"+
"UOvhMSSDDaNjnMVkan0Uxs3buq95dTkbPABcZVxRKW2k1xaqpXC0mI3jFPvcUNYAlHgt38IBhXlGpCte2upS29ZWFvQ8GorN3IXA"+
"v/UsLfIYP7lypyHPj4lbCS8NovnwTJHJeWm0y0Jwe1nNQKUMJQL0UJbGLwF/uLtjzA/A39gm+AL4LOTXxLX7Yy3uHN5pJn3aKwU5"+
"DB7Jh9byLo/z8xpP5TaplQXB4tqA3pSKzzQvfHL7yg4U2PMTWWbYeeI+LAYCvy5v3KAG9xW84KZW3IC03lZTfW5rIOS/GNB+oy7w"+
"taK7ozQbDF1KTCxOdJ0WWMBCqlQE6FR0rZUG/cU4EC8gfxHSh8hcjTZApV+RZvi8mVMCBh5xdAVZTJAVjCswlnBxQZlmE0VkZ51a"+
"DuESQuZqJ4Y7xCXa3GJK9xhmN9olq6RVYeLuJ/C4Qcvgu4mrWqyc5jgb8QSTKA8ndkckF42i35sICuRxH+1NKy6saVi7o0fYzmOM"+
"8LMwNEKrA3qhvsxNCXfyHdgOCXtIw1ul/ogOuiqfpeN7mqDN0o2DDeE1LxkmBcqbeQveYLOHmAClVVNvMqnEnaNqsp4YqhCN7Oeg"+
"rCQACkdAKDGfEoNVR8aCnabh9PCKuA1suqThgMFjkKQeCIZIX0S/Z/UomVXnL5NZ4w5jvGnKcl0NF8wQc4Bp3VORb37I4NrA3HhQ"+
"0XgrFw4gOOtGa6qFBescguwTMJ0r5UNczbxLeiA7fl6MQ1ZBeVYPO7ilwioPIcQr33LNjBZDYrq30mEAiKVXlR0Mb4g8SndU+QVc"+
"ZeZmBidCIcUXl5q1uLvR7Sk+C0Im80iqvUq9yxcRfKFcGA4TiPN+DSYjwLzLNNlu8NxM1wNAoGgDZ2xqi27x7zGlvJA7ROp9764m"+
"fbv7ejv+I0pms19DzO7Gy4xI62zcvfRAhp5hLNHDo3ER/wBhhKZ5lomMhSp0q4jMtycfPGYWaIuaP6iDUSgaTtVcxaLsywxjUVNz"+
"1xldv0oSv+zs4EB71ymmzTwLy6eYpaVZnhgN0sjPzLAJbx5bMDWYIRC7oDJY58ZgKa0lUsl5g2DtgJkkHtQFBZdGe4ERAZi1vnHh"+
"Vxo1lnQ4yhYHwRTLW9Gd6rvc2Fu9C64U5VmbsJ9sinAHzG5LEPg+a8wO4AvFcfKRi2WsL5m5F9vMayYqpAbeIW1t8QshLaQZ0v2I"+
"JhQuczRFo6lEbDZbbzgvXUDYI3vFtNDtZKYFJWdAAoKTmG+SiUKzbjANVFmIcNDFUdWI5hUBI6aoChDRZzgm+KLpnB71fMFHLdA1"+
"fir3M2BO/cXlRj3lR4W6Ab4o2Unc/N6EqpXDGFaNGMvb4jCvGMmzyiBctgUMLsrNS0RWultbbUa/qUC2lsCtFbz5hCN0os8cEfaI"+
"u8tTpQOLAGpzucnHBvJjzMopC1yq4Ht5mCIZGVwWc4ISZEGzxigvGbgmqVrXQ3qABcB83kwvBgQDKBY5X1CtBfD5qKvuAVuhv7HS"+
"xodKzFB5DeepitwmcvFXP5mNonQVht2b+ZU5DqUw6tvZMvrR/QuiibfHUtWaL88BjOOQ9Bwx4LJ3pZW1/wCw5XSAXnqZiGENs7OH"+
"xAmCUfEsYkMG1WgPNiUKmbM6DOmWt4jDHMU8fBbhwFzGoB2yOV6XmVHGKaiusmbhFdOZOBHOMqBChCtWuLlq2+7iGYXyXswjdLYZ"+
"l8R6oVBgKbo7hyNot7vCqMo7BjD86e4TNp2rbeOQpt3DqsV7ATmj8TJF0Gbqu8/MQvBwt5mXzh8SikChhFwnxt/2bqp9s4TVlXGP"+
"OXtlDiznC5ycvceRcXaH6GBq/wAG1ulgqXSeeP0UGJpWRHF9FXb2mgHB1pw3XiXHXw17wqytxYZa3n4a6xPmbCC490kAAVlk3jfl"+
"qAtGXQ0r9cRgFHE9wcFWajHF8cU6HNE7SBwbN2ODSENKFgV7Xa8TUz1pXjK/MSoiOVVfzi2YgyAXhd2wrcW0sxk2+7NzULDd3ra4"+
"x4inWGtO2jW/md8SlywYw3Vy8pQLrglYynJqUJoHkcvJmB0fYc+2qj3TVVe8i8c+JWWousNQHZmWt1aqa/TGFSn4dQmPGbPTf4uY"+
"QA8VnH/sDOY1foNxDU8eVZ8iwzKCJWzmLDkxCqOPRHwYey5g7mkp3982pj1E5L32DIFDM7ZCtAriZOB06AsvTF00dSQy4Gyu4c0H"+
"vyHRnNXO9w5NDk9wOsV3iWsqtq+Q5vH4l9ROWNuBP5uoHXnHe8VMfZokuVnJ3WpuloWciul6OJjNEol2o6y7ZltTjEdjSxFLNMLs"+
"7gs1Wac+ez595TETdRkVOx8wa7BdzHInv2xPzoQH30zdKnVywABqsLyY3TALoQLxht6VbDVeIK2M+QcicNCW9OHWtS4vYGOHuoFL"+
"pteGi2nOgRwidW0Hbd7cQrAp4FbXFU8uIUWb2z81LztCX4g4PvRVL2wL0/MyyTrPPtPeOk/m81OBqmbTG9y3tOYPEA21R7p/MiP6"+
"H6mZMOSONj+iodQ2Kob1mzji8TDkHjS8UcdsHuPm7/MYkpWlLGltjnNXDV3OFu/0+Jm8XOpyPdvGpcG4NwVq/cY1C4101oHQbtTj"+
"zAl0OewFuNuKIIIYUueXfkO4Rl1EdF4w7/EpCUFtf3RV9+Iq/tAN+MTl+KezO/LHnOgFPJ1hnwIz+O5a5xTrqVNmA/ZiMQxmP42z"+
"5QabM3O2m7PXXJCCKoThKjapyJ10Munn3PMfrVg8LofJEOmrc5WXTYBDukjF2m8jYTqG2oxjCvDsxlHKalmW1I1YVCXZmt3oOHN7"+
"xKTwcbaj84KAGgZe3FRNKPWZcRjPaWZ9wog3aCNLdDBq+r1NpJDCBcOQAXZ5mlqcvI12YOSe/jMC8vJ1N/Bheew0TOZchwLNGrqK"+
"NoaOxrLivMvKV0y1bLBrm6gIB50trJnTqZcgsqx7zBgc3Ghao2W+UPDWJVKwKnzsroR4xNQY0xgrI3BmcSclhbWcMFLWIlA3kIg+"+
"6mx1t4H/AGPXNEzTQ3r+ohRZYoINt8Ax0HPYVflDu7+GEDUli1bV0d4zMu3YMPZzHY6Hb+jLL30FYwr5sBohCfKDn+pnz0UDCssV"+
"VTqWpaoM5Kw0Lm4ZS6pFG1Z1FXmfVNpGOXG5ewsIeC82MzWLlAJ9NXN8KjUW6zU0arD459oqodGsOMMqrDMRvqATQU4M+YPyaC++"+
"PeVa+Fn4XJmLcahZVBkKms9wStTNlJZEWFvIL+JZaxQ6KvLG841C8HxTBeS61U5iRbBN3IVZMxznCgPnEQy0uFyKU8DBjYBpb5Ll"+
"eZ4AZOOQGp3UmWnNnL0QXt8ZDO+JyhMhizTBXeXEwhtGBY+APiYpmC2jdVvcd5ITh3C9/wARN2QoYecGwV8ykstgss7AHhw7uYB0"+
"mdR6AGGRTUTvhkFavYTm9ERpEt09YpacPiHpl/P5WWL5ekMIXXOOpVrdAG8vhcwONUxGnsZo+UbUL8Ie0ubF1S2Xachd9zFbU5T0"+
"6luF3ObAKLs6b1SeNEXpCrQCgVu+0FAJsBc1XFJupUiIFZqsigbHiNQjpDh/Ks+CFCINU0Boqk4zMZdBEXkXsfKXgpOqDwomOH4i"+
"KrMrHTjDq3i4GcirRL3S7LjBSlcg8ULhFSEQKs04tKS0Gyx2eVt8hTB6ugYWcNYTJqyd+Q/2NgNYIbasMuOWYgNEo6dOnEN2w27j"+
"76gQaI5PdaumZGAYaZvVwfhiDWooL2EzRqGFHEcL3k3ncB2DwIKfBarLM6nzizWzK32GjCttMnFS6cLZoJchmrqoS0p17vkt0+5F"+
"QWYs4LWVdW8RzqDAYcs+YZ9gvv1Z1kQ91kBi3SrUSoeolDULZage440xWAl1ltws9+DpeHLX2RUXJkpjg1EaPBBL42NNZjKhNDp5"+
"eUOoGxDXg9ul5UygRkhsHyK6O40qFOhx7VPgStlPO1/4kcTVOOv9Fcz/AKiBTooaQT8xEkVC5ArClNp7xQNpV9C3WSa7lUdlKBA5"+
"6JwZh8wk+KrXI0aCoMLZnBZMQybFKPao7M0b0zH0oXusf6yguw/Uw3g9hrthGVA1q+LvzC0VvD8Hxw/MsxVaq8+IhmDnF+54buAS"+
"17N+80aLPTAoFoDYTMFycxUwIacl7XpjJOTp/IOEib0SWGl1dtEsbehVudCqvGx7wkMDoOAoq7bq5iZayA+UDLPKR3y84U27Sym+"+
"eY3kbwlBvqUg08zls2/NR28Oiy/coGdXBNS4oHvN0VmA+RpcLbz5m8vtaIV88dS2BgCH5Gi8TQbdYhdtHDMFJxBslXajWOY0Ks6P"+
"JmlLDCiaVmvHJEsXz7Me34ZRW/s+HLKULgh23AXY1Apc+uRb5d2MBhkhXmPS0OYsIFUysILvVVcK2cDOAiz2f5LP2/rYT2qC68OW"+
"ziH4e+4AHv8AqZggc190eZVDI/LOFq96lhi/cX4dwFmckqE5pW/EUNgJjBlR5S0A8QILSHjMoKwR93HslddF8QXtjDKVYxUbDwnQ"+
"/UKC0j5YsWuP6iXeQFKea2cb7lhSgLngM2cFEr+wNluVdsPmC4ULvRZ5mzoCRu9s958QshGipQoXCeZiGnim5sFJ+5fTN0CnwCWA"+
"b4F26zYfMwzZUFvnM1XiIPrD+SK8HWMCarmfyIEyuh7E4KKOHadD9x4OZ/x0RO+oD+UquW8z2mLv77nnhAXa66LuZvLhwKDblKuq"+
"u7IyvGgpHIsDY6ZnrxlkyzY2kewvCPY033Y0t011j3jgdwVaNhV0XwjuMXnt5Gi60SyX4ibBaG6fmhh1C7+32tgfFNTR95Ty18/i"+
"YxjjfMaPEwb9u4cpkV5Ig5vQgoH4SY0jTcQaZnQ7mXfqlz8VkYT7LSQd5MMrRWZKRzebbSBph8AfxBv6Mbtt/n4hWyOt7r53UG26"+
"KXoPHAe0JwJaa9vlnPLj7f8ASUPJlWbK06xcqZTIP5ElUvXbTcX35oEGLgoflRohlsm//Epi/qvioVF1ke7/AJ1NMOQscgPjuHCp"+
"WwTAOchv4Sg18oUN7I4QHsczebS0Qdhd5YBGg7/oz3AE3+EHl7YHWXjW4zH8/wBwbLYczc4CiW/knYsB0UfqXXMr2x7DEAbtZH5B"+
"0M6xDuu2/LfERAmRf9AQQFeMFTo/y4zSrUo/+AktY1nuBaZoc4C3y7QXm9Z9wpkYUuJqUNuMY+Op0aLweB6i1P6R20j3OtaXnTup"+
"jzxGofkthPWHMM6PvLdhhLDS+Da2TDbkou90DGTlEyjVlNjnsRi9aumuDjGpuyy+dqDns5rPe9o3zjfsK+DAS55W/wAcQCj2LWP2"+
"1FiGRO69uiFMkO2F6Tx21j2qWT3WNHUcdHUsnu+FdzOV+rh9lbmN9eODxECmtijT5ZULqsP5nu8zM6Sx9yHozT1OjiV3041zL0LO"+
"mzk2fcqFRKVsaJSOMieKsCzpmJ3k3EFtuyosh+9q4iqRkFHjebexqBZo9GtCgbqbw4sHUR1oQNHWboZ6iKcMB/kS5N+1Y+fMLDxo"+
"CPECxVy13BbXNAPyyFReSc2P6C5WtVhuz3p1GRC+TA72qZEG7zr/ALMhs6GT4cDPlso11V1UUuTomc/s8QnJe7X8dQpzi1Gze9Tj"+
"tNSocDSJShvAWFwQNQAPFcecR91kHW+tJdSpFQaKryutQ0EDerhVbKISxi2/vtmA1M0Wo1oRJdFs0F8t/wBRQcDp+dyzKfJlb8yz"+
"2+06nWU2YpVo1nqOylPdv3xc3XRyvCvxlL/Gb2E4fiLJeJDJy8t0V8yqWDIyV/LM1c5rXgfp4ifHK6E/ETaYhCFd5/UIqz5fL4ua"+
"r85L0Z4OAjRXnZzn5uC07ZFeKmsO6nFRs3Tk7rxKE03dZDsHjiEQJxVBx5WzcPAKNHf595iIoUnVtvxm/eLMYpals0yf8RvAG7P0"+
"iqLbAYfs1phy3AZwjcvtdH8QXQ1ArtcpoS6/R5dwNtoOtzEdCm/wrwjQFCWCinvKKK8sXfK3N1MKHQwMimCgl4WQfB0LSg2OhPD4"+
"ZlmP3e8AsShLidjlqLu9rtAU2WXOOusSyR8zeWFXqxm+MNmPwEr9RwZwwHDs44cQX+ScHKchsmYJlXZmGics58hxXRkLlfdw6WDe"+
"VS7dLl4mEWB3Vp01dmIQ9YcDe2YYW21EMsXgCm7lKlqlgjyGy4tsAThrA7rPzLaH5e/DOiAVsXp6uHP5EpKUVVn7HKIgK1hiaKDv"+
"JKQtay1daLYvh2rbr2TWJ2KyAS7pzkzNpTTiDJbtribt4F/IawaCcwIE2ObQc+MTqwcfLs5PMS2aF53jEyOKUzsg4tihW21IvIZ8"+
"I+Y8qHHvjmBM+Zdf2acRWzYnwNq/cY40CFDTzhu1dxBTk8C78rjMGKa3B346K9iC1I8rb5U/qWtVcf/aAAgBAgMBPyH0qV616D6N"+
"PQ9cTiVGBLWoZ2PQRf8A8NGHNwMfQG/W/SpR6EIMR6K6QrBfRXzNMxMX6z6vlCWT0n/51hF9F/TmXBElejM9wHqX6QWvpcep9GvR"+
"iURnHpd7++P8iJfoR9KiQPQvHM45zP8AUnxvVqLuYPaV6YWSVbl3AhDLFelQZWfVfpP5RG+T0mfVjEMWIsX01H0v1v0kfeP0IMcy"+
"5v0WEb9BLt9WbI//ADP/AILF+glL2lSvTKCcJ6H0X9IuXKuYb9B6DX0VL+k36WE/6IJ9COXX39+fRYdZj0gHv6s3L+jcWDCWMXPo"+
"dnp5lsy+tW/QIjpYJcuLqD6mP0L9L9cVMqjEo51L1Rm4ZZpN+lED1FzdfpsTBiWiEJH0v0JcYRXpfpa5hF619BLlj6JjKBuHo+g+"+
"nf0mKS5foQqUdxR9R9G4RPQREzF9CKczOBIMR2a9SaXx9HfmY+UvWIEsIT7w3XMIuV616i3MJ+ZTt6n4JuBCtvQypeQuRRIIUFup"+
"lvEaLhX2h6V6H0tLSUjzKS2EwlHn0VgjqAgRXMwJUr0IQUYqUei3KgXUpeZW7buP1I9HCEj6L0JK/wDoVKlSpX1MpT6D9BF9NfRm"+
"6l+iiMX9NEAZlK+teqj6CcpdS/R+guVUWi8xblxgy/XaX6j0Nx1z6iWl+lfTnvUolRZ/PqmS4m/RPoq/SE5iv1zF69FWXUyHb6Bb"+
"MYzCVKSvoY8zbBG31oJn0uL6O9RcRkj63Xov0L0qBZbn0It6b9FjMn1CwmX0KRS/U9D1Y6el+gRKlRgx6P5lI+oNQJvODhjv0qIa"+
"hedQPSMQe0svEFQ9B6V6K8RYUAuD74lfo8yzv5iiy2FPUxuuUfQpqYO088+SXe04iDFcJUqNJl9Crgb7h0nzZZFjB1G+pQzuWGFv"+
"ocQX0BSs9Bi+g4mHocCZ59BNPQnpn1mjK30DCZyu5iZMQV61H6FsQmBiWiLKTmXcG01Lj6BIvUv0B+PSvUHUDErFi+gKfTjqZIfR"+
"j61LgTcTXoukZcv1Fg3Lly/QcRkXjqKnv1EelV6ierkai6RibehlPQw9GpcsicSjc/B6HoercqpVSoI6mWEV6MPQCcei5mZQnPcY"+
"ekfhHEzLIUblXK9REw9LhfoSpXq36HQuP7msu79GEuVcPpIQqcJiXLly/Q9Spgz216bZ1KceiID6EH1MPruWF+ol+vJcXcZGcy9+"+
"JVLj6aPTUcvoqPM6YuNs8xFeZnqLRggfQwSw3iMGmcu0Fk2z5kjyllR+hp9M2oKhejCBqEKNy6eY76D1KiQYkcKhCGWFJ5wZfowi"+
"4lsv1uX6jBi+hUr00uOXOfRnK9H0VN7jH7ywweZmAoqjtnSPptEqvRJXraCNy6H038v0MX0u0qUH0CUYjEuL6ajH1ie8rBlXC5mE"+
"SVPWvURlnFDvxLhv6M+m5r6X0VGc3oxNPQNPqypcB6CM5+gi5v1r0u/SlQn8v09Z9BqJcem5SVzUZcxKlfQr0oJdiHVRIq8RYxub"+
"iuXFl39AfSvVlegJUz+kStTFcq5h6P1VKlSpcbh619SfQGO4qMsoInUsm0BMv/hUa9GUfQpXoIo9W51M+oy5fpxUGIjSuo8I3yuf"+
"QRXpUqWXxBv29CW8CErHZDESHaWEYmyJ4T0lj0PVq5fpcX0qXJn0Bmb9Kr6GEB+fqEfQfSyLRt6dSuYrg+gYSnrUoI+iYVhL9dV6"+
"r1HK9U9FS/S3qN/UIqZJXXn6HcBFXtNPrTMczBgYSS5KlBEH0kp8+mvQX1VC/U39CkMzGL6FuH7+u/XAlpUCHlv6WPbUI3xCf//a"+
"AAgBAwMBPyH0uX9LF5aHccRb9LlOdej9Fxno/wDzXyYjz6Z/8Bf0GWSseapSEPijliCgMv6b+gWU+iyS9y/Vf10Pqqj9OPRZfpUU"+
"44pfrfV/D0v0CE/JCX9SiXjPoPRDfpVxhS/Q+lQG4mbMQb8p876rh6G0qosfVQS5fpp6alSpeL4l/hlRiy/RiG5Zoi1Tv1H0HpZ6"+
"16VXt6V62+ioxfo0lUetww//AEWDL+qpX0MgHmXB9CvtEnLAj9FRg9VSp2TLWo/aBZZKv0uLUGZfQ1leiKjcT3+D/Y3s6ly/QRRv"+
"7+/HoTJ6D6nrqOUPoM/Rg/SVp/8Ag8EZLMFv0qCV6H0PoO8XMb9GMlkZIIyY3CxcIxMTJNer6Aqd4qUTtFJnlYf/ABv6a1ElpUuX"+
"61GVMkIWIKoOZuAfTm/+lxuZNQx8/wDyampcFjwYS/Tol4wQEq5j0XLLrn1IJR8JtGHF/EqMX+syRW67+2CYbh8lZ9TUfQh5jlEZ"+
"aLG0blTu/wDeiI1iOveL9DP2jLgXOmLcHK4l1M5Y1qMs/ghhCKX3MR9WMZXiH0AKgzCY9T9FeoWYynqz9L+mvor0P0gv6blyWSiH"+
"pK9FITf0KZSrlZT6H3+i+Wih8+lfpj6BOJVlyPfrfSNrncr0tmvWkHPpD1jU6JSeo2itx9fQsiXbCX9Qv0PRp7y30D6ArHqPovpd"+
"eimcQ+jETi7lQODcCmENHrOfS0FfqXipr9ote0r8yc79bHrXphubeIdo+ihlh8XLJ6V9CeixqWcS5bKERUCA9GUk/ib9WD9CyH0n"+
"v/8AEXEhn0XD0MvWGvQqypl8Jn5Ey+EJqWx1VRB6Lg2B8oo/VgWSyKsjXwffUF7sMjDMolX0c9B1UJH5TS53P9I1+xH9/wAx0Vm/"+
"vXcr3KpcNbmXEGYemo94npnBn4MaUQlfmb/f0vSVN5lGD6XKTJBfSRUGbiuENvRYr9NvqqBcVlQ9Aair0Jcu9pRH0uX6lPMylchb"+
"6TKlocTf0IwfQLzUpD3PSvNzHKil5isPUB6FnoptMMT5l/SxiG9QG4oG0Jer4lSpUIoDzKlSvUeg16lvVMLmn0FoSzJ6iBKmT0v0"+
"BlrMu1A+i/ouDCL9NQJ4S1iRxx6M+iIK1LXvGBZRLfMMzDBqUqXUu/Qxt8fQfR9LiwfpU88QhKeoy9dT5ErePpYyods+pX0Iz6US"+
"rIHpXpfpfQV9Z9KjBn0ZXqNQPS6qB930IvoMxAog+83C/o1WOncyeIIrx9MPTLr0sI9NR4IeufTx+Yp2iGD9HaEZYqOZy8xC8vEy"+
"3k6L4hkMKssPLLMPQw0SwWW4rYwsrF8EfoFPTxK9cSkr0YMBlkIl9FoPWphL+iz6Fh8TF6GIKQXBRGHrM5f0R6QgIjb6aelt3EU+"+
"lVQfzMiV6XZipTdc+pcPUISJ6tfmX4jjDlHZ639FinJ6DCr0fo1NxJXqejxGKpaE2hCuL+i0wgV6EEPQkqVcoJcq5k161GK+otcI"+
"75cEhYQYr6VLqUkuXLXURzMtwc3zGgMJR6BKqVfoSvS/Uly/oPPpCZ6JqZemEQvzMvRT63Ll+hH6wz6V6kplQPRU5eYJUZx+upcL"+
"ieln0Mv1G3qge41XosejJLlpUWCyMfFLuuJh6WMoHpcv1Yw9H0gzO0I9pv06PopPW+jUD1uaB6OVY16Al49LuPostK9B9Y4IH0iy"+
"U+jc8Qx9a/S1iqEHGVv6DL1fUcnonoRM2ldzA5lXMZH6ly/RzLeipmUEWE+8Tfrr1uECveNyJGWVIQJPP6GNpb49K+lPS/W/or1r"+
"0qMy9R6Won009D6W9EjCF7H0PpXPPoqiM//aAAwDAQACEQMRAAAQkk8+iCvu9ZQloXyq602lgv8A4l6aOobyDRbAqe+y4a2/CQ4p"+
"V1Mzqfdueuss9M7Mt+6sxhbfRxIURttWwNmfnl6P9kf0z3dJZdv159JZENhKwYWTU7LBPybyutWttiZf8b7xxz6K3fSF497c3ODN"+
"/D8TDeqFN681nYcnLtdl3gpM0LilopcZzPXG+/dg/VEOVvwg/ntLb/GLng6kM2KPl/Ia16/VSKev+MYjNqe3kyU6aSt6EgbPL1vp"+
"hx1AKyD4hX5uz7P9L84mt8FpprtP6UjfgEevH7iGnNZnapr/ADfxicO2Z/HZv8/CZziE6z7W63X/AEinLHlvUyiCoeD8adfC2iOq"+
"ul3A8uHUnupv3SGctZOVdt95NGDjTk6vWvTRpT0CUk79CuWeZe2bWnbJmwdSL4szMqEYi8kGiHM0UmTJpQXRS+zz6dk2oklmviZ1"+
"M1VWcciXzpa39zdtz/tEep+JBssrSu+0v/VERh17g1iqDk++s+87LnSfrRO5Q8Ns5v0fst7p049VGBYjxcwdRs/vUfrvBxixv3Wy"+
"k/li98PXmdeTGpPKf3aqSca93r9kvw9bTJn28Hzc1nO/3yMPZuvk22UOojEv9B2u832lEu72orsEuIvFn7nPmKoUaWfSmscho9mj"+
"+R0kJ9XfQQa3I2NP82pt1/wl8HNaV3gRIjdXMFttD01xrSn+lbmvXnZhlyidnWW7TlueazPHDC+RBK/GNkUBnLtyeNYovewOuUXi"+
"1zmttuDL+tmF6M4W5+//2gAIAQEDAT8QHdkG2DgsUdIEipEW1FUXgMZaHFV8AkKWeo3nUWXTygaIQadCCwBZjJEGZgqCgFMpFxHx"+
"kMA84QiDoDAMkNI1f7i7qSorsYPEaTcrWFZFsOEHBvmkpVAFpKluYbpZRNPXEA1m2gId0PNM9d7WOC0lB2hstSto4Gr7ZcwhUwBk"+
"BxRIY0jb1XECy0eLqXNVAg52oaBUqakCSUDJGvN18QsTpq1bLLn4C5UAyjN2AgUQfLx0OlpsoMqhYeEviHihqraA0KVQeIoEkhLC"+
"W2grcCG+hVAK0CtBBhYBCQCtUoGpfZ4IYTYlC+9+IcImrUI8GVAEyZnlCS0oPlTXqQrVWkylwSupsdOLYtmwTriDG0CbAaKU9JAp"+
"+oyDlaYTXwSkRQ2UVXQlQIexCKkEAabmcX+uQtWh1KPsgA6oNbhKfi8xxkgGEDWWjX7IDZcUtucOgrk1bFgd23MJFQ3cnuuXlUCp"+
"QWsOPCACIRoQnBcAEPjMRRKBeUyhTDywEFFZL/mGToJZHQGtNjmBqyW4oUMDfUpzxVGoi3U395cLxQY4IUGeCHJyqgRRUAwUzniJ"+
"9AikF0EURd6hfGtxUKKooR/kywwClAo0mkj6VqyIYuoqe8Utr0rpoaa8MpXjAI9GxQabj2Qca06G7uCWL7oNDjdmdxJN7UpK1fCW"+
"6rlu8qca7jFsQ6IXhLxFR8nPgpML+4CjVujQ5W241svd5mficJRjd2rMCm2jw4WrNuFWvBKUAG+Xxe4URGpVl+RidUa4a9pUXXNI"+
"ul9sOkFefasDThSKwPCMPEIH3gZUukBUXS01uOSeGgNQVGt1iFiBBitHm9ViKk1kEJWAABhwXqDtgC75IMd1HRYXbS/hF1wqEIkJ"+
"g2xrh1HvulqLsC5H+VCuA93QKYC1AMVDk4DA4ZWsKrxjEGhaAKmrrln5lbEpF01QchS+YE2fNI7IWCi2xkpylIFeS7W8y8WIIXte"+
"DLk5+IVtDUyl4P2PIJdZtPIwFm75K8cy9HlbQUS+B5iqCMWZMrkIDfQlb2CZJraJ4lZzL2HFC5X2LInhco8kz3pWAJg8O5cuc1oU"+
"IBncR8IFxnolAxWOriz/AFALxMnD4dw50wyALMGVzDz2B6iVRTlMhFi7aFipQyJfUEACiOKE0kBWA6jKD7YLBasFUglV1UpvFMVc"+
"tS3RtAiC8heOOMuI1AwlhzMWOFDd0axXcEPL0qMMBVhg9ADVLCKqKMNoOZxaVLFumN1KjQUFxDEFHNH71G6p0rNBZrEYvOt1QHo5"+
"GBAKVz6Q4ThCEYaFPbCUiXjFFY1VC++oKPRuErrdVfsiHH0oTA5CDWNXLhmtEFQ2Le3cm0R7iw3lhYfmobdAaCwQlgBQN8XTfV6l"+
"AlnohrLiqoCqCwRKoAGh43tQJIqqC1bqxSNE6itg5cOENEAjdWc47uEtDh1orWNkE8E40EzQxyh1B8pPrVGwc3/CAz51sSQAFjOp"+
"DWx+HKEyflTWIyqAITVgOV3DhlthJHJQrz/5BW1XWBYIlSxY1mYFB3xAuwY0c0QeNgCUC9r2Hts0o3L7LDX9B3EilLXBo1QF90pM"+
"k0VzwFXRbA9FCdUNrDAjRBcA3KIApi/8SNyt94rKB4GbhxsK1O7y4wpWuBLaFyw1FpwixwMsoVIQpUCgG2OWM5apzSqpBhtiM5Ba"+
"hBBQILdf7CM0nCGENYl6O4PF1VCvUF/lTYMB7H/Y6s9Glg2JpHMXeGqACBGSnMqyOK226aKT/wAkBo6mOWuDS6YuFNWDwlRODIfP"+
"GEpAVVrxAYVVNt7wDDlRLJqYMarFAGpQ+eWB+RcMv0Tg3gdhItucU4kYGcOF7YCI1I/OPLkE5OzMEh0tIVSbD3h7f82B0GLV5iBr"+
"0gCxCkAIfmDrDjHAcUN3/nHGgVbqhDC0+IxpxrQAAqAhpI0nQK21u9wgcbnlowMWCq+SajmrRQQClrDfiEeVSWXYWmG/mA22UCgI"+
"MRKcIOI5QtKYUNhp3nuCiHLUKUgaKNSpiVCnIVFA+UClWNtqlg001iLWwqlJqdnAtHCyO1ftuLCV9AI0IvMYuiIiWyixR2Mx4Idk"+
"KoKKzcQW4LTvuDEWcgaYtQLDqI84MKpU6cFUtAVaKO4VRxpg7AFJK2YJ7qpF3Qp4d4hkCHQCxQyVsEx8wXTYiylOLUq3cGXCxJBG"+
"t5IGTebVCjYwFpRKlKVSCistRRjziY5gnoa2KwvNNOE1KKCBA94C8kQKBh1cf7SoUGj4FnV4tM/biLO+2FpdEaLPxuIIxFLCkTO8"+
"MsHaqSAIALXAMxBtDwvaEYPUZeatsGO4BFNNvOSIYJCcGLsUbWC6+YyvhiAplmWC0kF4MKAiBrB0CCqab4IgFkwgALNKU4suGCjK"+
"lsFaUlVHvAiAio4t0iVp71KcM6MbGUVFzDui0oAW0VZ38Q6+0RFVLVODcHYiUWhHptzioiKsqGbG8WAGpbk7vn3gkKFgPa9R8LYs"+
"+DLdtVDiquk11/MArLcvPGu4r8IOmy0DGn4hjjONQS3RzxbXtFrJCLnADRRwznceu3Yi7E5KSvBKgWaMWU7uAsDiKFFqgNBTcDQ6"+
"igkGwgvV0RjhcPGCrWg2/wCSuLGCEpSkz7RRy64O6vEU3j9QvAQVvkyj/Zg8m6WSkRTIizqAwR5lgRWBUl0yBc1uORJJssgrKr/c"+
"HyG9INrwB8VHMK/0BCAIHR8t/iAbCV8AuRwNsYy1KnZmhzlgUthzaBoGwVKcYxNAC9IM3hTE68b7tgEo05EAqbptQtUwewiZFSKF"+
"ilmAQsvrSVcUcbaHyOqjFi3KUXSpYsUOULBSqvZ3cakSqcLaZXwjQDRQ1Q1XHmXD+t81GxoJByDBwChAmgqqgj4vlQhmtVYi5VDp"+
"MZga2gsxnELVUEKQCNTaG1jW5s3gqaItL5BMcSgWhBRA2DrPvGRoFTQBlQbQoI7UbC0bbyZzcrUUk3lKrbagMuovAJd3aEQYb8QV"+
"EBeEKPQPK2xEgIIhvW6j7dRO+ijLFMKGdwzSAIIVKIilPaVw8zwhuiF75CPiDAlAAAAxNhIllLT8cQMowRSugDKswUIprVvOCzHh"+
"CdmwoGwQ7G7zcT8HXWAAAAOIxYlfbf5iyFpiBu1BtuOBwgQqBBWacHKK6ONEIAQDL19cACEW0UynMVPkkGqg7BWPeG2dGmW28qrF"+
"kHORjiS0ihpgltD7zRODsftIb4QAAABQAOImmhLBBpzhCqHUFTnFaXyU+InxZatIcB4LlkIvZRDsFICFQ5yxFVKC5qUeC0zZqsBn"+
"caMEhvt5yxY6xoUSMK+KQYOkujextpaoG0blKQQhMBQAqgjg/gtCL2Ec+IgZdpBjaSxfg8Qxriy5AgNN0xC+dRybBMFw+0A64gGo"+
"AKAIXnCACBfiwx3H2tCrapQAtLyQRQuB5HKXIniEBjHEQCIA5iALoEZavhgVKc1jblS8DMUYmYPyek5/1Ai+T2lkDLVOY0my2IYH"+
"K0KqCKjJQRaJKZWUVkgDsFSEsHRwHJzKqzc1ooljIK94J8mkOhyU7RNRbbOQIgA5YcQAcKVoq1bVz/ErFxb1yoeAl70St9qb4RrS"+
"l18YhysVgJCBqXihyX60FLZZTTmUHVQdYBOYxa65mDeDItoKv9BcZ+iq+SIEZ1lWXUZV5vAKay2rY+WZTs3wIdoxQn3hiX7m4emE"+
"rmlBREJSrdX6B9IaNKhES17Ut9EAvVQJSm6BCREn0tAEqxHuo4gKBjAhdZZgjEg0ELA2OT58xsYeakpU4puorFtw7moxJsSU1RAk"+
"RkKQFuihCFHgQijkNqs2zGpfrFE3W4rOjLuH3+AlMbP+XUp9/E3tzBGcfi4Q1MDRYEK1NvjUK7/okfBlDQ5YoK8zWNk1X6CDcFHs"+
"0+IbsLlvVHBm1lIBqBi2owYCG0O1ZisdQQCNllSC8Frdu4lqmQbVAqJHQUQFQU9xxIGziuAF0QKoeOphaXsfjMYsc3tlVpLy88I1"+
"iAu2mZeAkIxWwxsgpowqsoEnbG1E2CE6D7i8ehhpFYHUSpq/iWxKjSlBboB7okV6BRM4F5JopqYGhAxlHwxQSv4IlSfkSjoTYRg3"+
"KijLAFLCW6GQRMVfFQGqsMa41ECx8guB35I+U0FAQUTu6CYUAFPrkeAqhbgEEUXVNQHYZgQMLDT5HcALGFHhNtHD9kzl+YiCCiAF"+
"5GLhrKDkwDLb5fohnTaffklwOH4Q6GipQXCBWX55gmEoTWw0AX7e8R5fbHylAAhzIcNfhV+ZaSBgoco5zqYSClSmgFzDRnEa76IA"+
"G7/ILMJbJQLOfhuJmCZ4CmbHFe8EMTLRmHdopzrFQujAzLrIAQAWuucNQIFCscJxs3LMW81QLKoCDFACwbFIBcqMPFsyliFVCw/M"+
"CbgYEUwlNBiANSgArGyAJAWrKChyLoSjHOEUxQq1Ao3gmCBRG0KiVCZjmcXr90omRbgrD3p+zaBRv2IxaVzVNwKgrBVS9vpoKsFR"+
"QQdIjpVJ1C0ntVi7VaHbqmUoAxwVpkukVqATFM7qUoYXRSKFovzq6lmUDYFKb23YjUAMNS3gUrDTUAUIai20oo4UsLgFCirkqBqU"+
"WKEUK/AMx0MkgJKyyb3EMnHgi6MCfWpWC1j+9pUlWGVU2YcrqzfSEwc1ngku7PH0qKgr9gFxrJbw5UQ4UTtT1UMOpQMba8BruWiz"+
"YirQHwyyJ880EJ/WOihWnAQGPNPgQIicPQFQUWzJUCApZHVCj7rGswJ2nU0r8iW+SAscUXQHe3UYvMROUqa4HPglzZaGKObYXheY"+
"GlQCoi1Lg8HxMsOiWAKCl4CerAohuiWvAjg05jCpaCiDZdQd7aOYKbLFuZpg9CIbDThsmno71Ce50sleVRQfFXEATt85o5qaKsYR"+
"aAtwKA5j/NEM1KpUFaQLvkQB6QMCCOjWbfaDCLrGBRRcDvcXPKj1KWjzB050AzDRdRxahVwF6ALr8FJyVqpn1WFNRbVBvfmXfyQt"+
"3QL7AKw8y+cWgAYt4ADy1CealAEqwAFs/wAVD+9TgA/FE3UIVqQAATMnWg6p2AZ1G2Y4V7sro1DbUKTGdJXx40+wWTK2e43XiqNs"+
"AVttiMAKYZUKSVqZaZdy6xUwCkOSsHR8onaiLsRqXm0Q4slXwwGksdBKWqoxECDAgWDS0XJBNXq9iBVHVvmINKrWBgsLryQOfg8m"+
"icIK86zEOXEVZ0hzQHuZWIi0KgVRXNhp5jUukVGhBmrQQozQCNqZIrTTVks91vEKUsEEU5DocVFUEDTnbeMJhgW5wZFC9Mx8ti4b"+
"iYsVyhIzMWKhp3YNbivF0OoKQVne2N6FZhIu8qhMqU2MwIaaHDXEaYDN6WhPCRlEEsLACIA/ixK528LAGHGdfDBFrQkjRrYThzGC"+
"xUtALRWwOJ/MN4qpANXp8WjTS2JbQRfIAm63VfMIsHGyhIJdeORUaYjrWy0wUFofmExGKuA4thV+Ihs3gBRpse8fylPPvZzHLq2r"+
"Mwmo5hs0GnJraWjaiuzZYTJTrcF9XRGKugJN/lDFbBoq7XRFGC4UDdGDayaDA20+Y3pOqCW0ssQ1KT6JsuZftsQ+SpvZgi1EzlpY"+
"hRcWE9295tZPaVg5KA3ewcO4psiKq0i+0AG14QE+gvait2XMy0xFpZpsuNZl6tss1WiYakOY43MQDihCA/tSYTXtGwhnAcg4rUJD"+
"uC4ZAhv9DUwB6mJehVsrXYXaQGxmlqbaAq2n8wPD3lww1FSWuYn5ybVQJQ047jL9Mjk25W3ogCGVVaALVQxtmGM5YOMVhjKz5hsa"+
"UtweALTmXoqpsFtWUGU0RCWVSMBA572veDxCOC4/qWHgXojJ1SJaqvYGYZAd6sb9YXj1Vcw2N0tmWgi44ceJasmUmG+C26uDOEqy"+
"ZZC2i3cApImoc1NAygFRIF1xFUFbKXruMiW3JAwhLcIPZTsER4hW1AlNhbpKWLd40sYfumoRWI3FSLo0qQhqw5OIHIugxhbXTsxK"+
"ii7GJeaose0TAUKA7LAUGZYOBcmuAAoK4PGtREW6EhA0oFL7RWhoSgGihCfwvDWSRg0Keza8kSoSzFASINW3EVw6NWKUHJa1GCAM"+
"AS10JWxl0mwBTJoAXlxCULBNUFWAFlqHWnJKFgc3jYxpu5ERWsoItCb0iAuBTaWBPBMPn0qZMm6L5/EcALCgMjnfvLioQS1EF1Vb"+
"VHA9B0xCtgfYjMiRXC262Ie70AyWrO1C2GljML9EGhLWA0Gbh+Y/QokFC1JRN2dytTQQQrICw7S0W8Dy4AoqR3TpbJLIVAtmGWAj"+
"6myA2IWKpxxLdCi1svwoXk66gVXkhwAGAtjU5ZU/0Vjryv8AwAVma1AKFQDNW0nn5lTlZqgUm0se8/zC2iyqKQoAtePfMIqLQYKq"+
"U0HSLy9plDyj3WjwITl3ygh98KAWUAaEEKLI+VtAparis6RIK2Cy8rA3qSBiC8CFMI5kSLyHTZYW60/ENb+5kKwAaZzsj5Nc1kRA"+
"GSW5lZGF4CHSzAkvjmMogDuZzgSLQ2cZmaTyKhQSlAhGzaM4lKg8pFZtIiqt17jFosLQAqzXJF0AWaClxJYfmoxEfp4YgAHxCY1i"+
"tPacaSMIwWU12bhOEtSrZyPeOnmLO3wcVr1LK4vdD44HlBXC5NkAuCStBVlh1dIWqKEtqWNwfkiA9sq9mf6hxOg2uaTG3c4Lilxq"+
"UAWVYG6o4RkgAtaAVlSQPlgQdEXpyJEUsGmuR3arAIX2agasFuePzBDAQso4CSrt2lON1AUMHK2pfe4/HKsTTj4phtdAIaEi1cIK"+
"GjY5IU0DWfMtMHpYCME2QAGQAMnMZd/0iKqUgEIUBWQ/7Gg0fH8x3dFMWlaWBfDAYWaNiwL7LqLJMUojgoN0NyjZN0AUzyH6wloB"+
"2CmFRUt5ZuAuV5lUcyUVzExh5wBGkgKN43xAm4n9FFbD+ZmFKgetqhFfNgyshMKXbeYlmUM9N1fECyMwBXhAaBnmDfdVwFbPgFUs"+
"hxMtGsRgju5WBpVp2l15qOCaJuQbGzkSJfzoVxdJlid3EoLCBqRKCvATLWpdg1731AddpRFaGDtbgCaKWGnJYp3DD2Be5KbJrcXd"+
"RvVqbR4Wpw8CheovDHJGS7rAQRRC1rC9wahErO9RaLUAsQFcl6xWQQ1vH0YzbKZ+c4JCplmkkFotpVWnFxJxx6ikAJA4pQl2MNDF"+
"nO1RFLPUQtWzal494l9JS5jIBd0aqmBVa4WKgAGvVp6xV3Twlk4qm3ilbhLHxcCUjQrUmXZKf5raE9ZMBxfMOdssBMaFuTwWTJYK"+
"6XRmkQF568wnUBFqcRlNBd4hfCSsggAoR8IRwZXSJBy/EiHWI+QEAl+zB1XUOx5eS8nEvAo0jAWMDYWn8GI4sMFFBAaNrIsICLTl"+
"cGSoD+CFR5UBRzRgtvmBcAJAAiANN24TB0LRVXkApw33jEDq9NEgrJss2RgjoZptC8NKuUGK9hQXpIQyFIG7PdGJJTUU/leoBG0I"+
"kIlhCRoqBkWbBaI4GGoeiKE601IuYIwtmXwoSiKKNMMz0HKBQKt48WZ0VMWGwI+w2XH3RRmElodBUeXHrgE2IALUX9igAXBZwKrq"+
"FNqCQeuFhWVkis82IU+azGyVRhBsJ6HhzBGP2mDuJNOKW8y8tkCjE0Cvgs6AVYHFsIA0hax+iWDtkLY0KCGzdkQl+RY4sSKDfG+J"+
"VVf0QIGB+UQQC/ZDSrdWTZgN7UkyFG0HDrEcsdbRFhYWBjMXU4RKyKFZXc0bXhC3PhXeC0d/HMUUKIqAuXesFGb2LaGEwN8mGY3L"+
"L0OIpMjXRW7hyupMK1DcI5WL5N1WjsNIAQdHEWkFObNVWoYnXJUjASx/JxE3UhXRDQi3L78QNFY4Fsyyrl0pQfA4i2ojNDzyCj4J"+
"UYqmVeCtQF0mmZTXbStKX0KXuFhuNrWa1V3HJGxvJBdWp4lrBR0IKpgBlnZ1C1gqhC0hj9oo1SGb25tJh9VgWBoo6hv+sYFKTtrG"+
"983CKaCAselsXAINragHGEQSRBZx7sULoQLeuUC2CDcWC/y3rDUOrVgUlIW++wY7x6cq2qoI3g9Jm5UIfmCUABlLpKJbMK3OLXip"+
"g6OA51F9LbYyuRFPMb6lsPRyE0gVaz5uYEsE2CsAINXWI6Fm+KJq2xLQ1uEh0ASlATOkaDgiuZAmQgDnJcPEYD8nKxdKls/tlctg"+
"aRI2ALcG4GLC8FUrbRC78S2IMFJVESjCas9QpaMxlXr1j8NQ1+bUCLYsb9/lzhrWIsANHGEOvBCcUAlBC8oQHkEY93Js28NpXEms"+
"hCwrLws0GoQqk0iA0DdlK6hWBU0YEsYlfNbgWCYQQ8RuLrRLC1gRyQJoL/iXv2SEOhQiNr4z4gaKrKpKhuOfUj53bwlWisuZdDFq"+
"yGGI4GquWCAKtGSoXkptcMLSwS74ZSWl3FJzYgmsKLn1gNRt6SQsDhexDKnhBm8k1LjRmKfcAOQF0QGiztBS5ncQYBqWKlifpOGG"+
"bcLnmE3erBYq0qqGYIUa+gCy59Ay4A6trY0DFm+YaSF34gviDluECe8IAsFDIdJjF3au5CsGGHWY2xvTAsOZFW1T7Q1/ME2NGYCx"+
"Q0BVZho5odKzDbW/LAIgLeCiCIQDoNS6FJ3GFHQPxM4lV6Bz4Q0NQZXTTDa2Ss7IbDWtUI4pMCHHPbqAQourd3LH+Ycrrmc5nzCI"+
"xA6UFEQLLmlMhV5OKKvwowUY6VkSVfBBqNm0iwcQB+MCUzV2UCoXQob8CM4pvMQVVm7cX5j6BeNggDniM7cYrNwGIbUX9CXMHV4O"+
"hLJsDap57lAEup0FbpGww3cEoC1fSEBcPaMUMGQS4EDcOMQ4U1xqFBQ0g0ZbYo+aFsggyPIVqJUAFiPNUhEqehj3AoAsb+V8DEWP"+
"9QuBWC59m2swLF6dBBQFpZpUSuwiqiuyhgiKbCDbrzmLIRZFvFOlsBknRCZSkElnbcTcgFJN2doYr4cwtbHjLKhMy2naPiVQVBzd"+
"dD7w8Iqy4uHZriFI+qVtD5LVgBAg1LDtqGXsCUX5qNuq4BRU7ZWmCkYaLgjeowvM7WQCNBk576jQZiCNio4aQWMDNARbKfyDUAx0"+
"FCE4SGHBxHGCioRODWCZ6l/17DULQLT8WjMhViIiDVlCCX+4FIoUCTgALLXiYAGG5TpXdjfUvNNsoqFLVW8BFvdfoBVYjS25ySgA"+
"hwGcbQNqn8rdW+IVykWHo/MS7LZWw8DmrtiaMQdQbq6xOzuImjdG5RUXO/FXGnvUFqIQTSDFwccgtzo1MMS0JfBRXtkjAWWVgoq7"+
"pCFjWbJRdo3AIRdqC4BRVU/xK5SZHktDBcVLwY/b2kJCcBQeoN6tdgbmDyNyu21FtFhRqSNkDJ0HFgKWrDF7Y4RYSMWCAdvvxFWS"+
"LAA5prQqBb/Y4GGTkqYCDSxCuFU2qRgFpagoflhpNvGXnEZ1rBiAouHb8I5QS3QTbhvcVuOP2KUlywB1oziGDsBkaepQv5uMy5HS"+
"Kkrpbhsbdupljv5ZEocRW9yrEJN90GAvItRvrct3zUiWhAr2bGDquWQDqRiNW6LlZ6LEqYUbQxC32tBa6UWBoQ/h0VvZPIloxV8R"+
"yAAdRcojT8imEfi3KggXDLVxW2pBUmiKhY2agH3FC6oS20VlGZd5i0FQnC2Y45lflfQt/wC6VWXXMv8AYjkEPntdw11bYFEHgrKa"+
"eXqD17hDSVCyw4t+IOgw7AEAraWceJVFuz0rq9b2hZWxIk1bIuW/eWVBJqg8pV/tFNZw9HsS0F4lDvyNSsoBGMG4bMt5WtCPMfhM"+
"X1oFFSxTPOVdIWlAq4BYmdWppZEloS6iWGmmGGu4nlYAB3MgZbDyRFH2JUo5Km3lAES2S0QUAUQQ1fmyLpBWur0XB8Lcvuy13oIV"+
"KhT5UjFoGicV1HAzp1XIDGU3TmGv/IkS6vANDuN3PNOwVhS6TyrFQ/nENkxwAoaviZQRQC4To0GpemjYuq7tqwYSxUKFAiN25aD/"+
"AJHVV/4VJumKLsdLUzrUnQXsX7qOpU2lgDVAuVMNMANCiZI2IljVa4lwTL7AJRhDUupVJqFLT5J4JT0Qa4BAVFBp7EOrXzMUYMii"+
"ste2RBQDAsCwT4Ad25gkBWgiy6vIAzFIvuVJEHNgy+EHoEJowDdLfMAnoARUo1IUK9kPU9Q0aRG14K8jlibSwqmKLbF3eMRBRKa1"+
"QICCe8UYZQgoOSBa3lxq4757hgmVRB8rbEqCafbGQAnWka2URZrl5QA58w8c3dhGKCCt0M5lNnYWSouRJvZehiwp+dAmwNuF2cQG"+
"OuYbVBhA935dM0EK2FXhSMCoKjoFWiNUHdkJSTSUCytoL18UlBltcNAXNJvVMNU5SFGSBdNQ/KE0uy1gqsl1bpmUSqBaJDS2P2Gs"+
"x9LNzixb0o+BY7YHEtLttZtq3LLAEwS2VdCFS8+I3RsuqIBAsKvRhLAlrChtY3y/A7Rlk9QLKpqA8DZ1FNVR6AACbwgFLhHYGDHa"+
"UjKIaAbIC8CzFlslDYt0w2qrjpXlLbcpWBjBJWGw2AEBEP7DAYQtuBeAfynUXUY2YVVEa5BmoCZUoAzbjkZTdFgHYBTGXFQglNBG"+
"tDBXoZoq+pmGKCxhwlNlrQRAgXWtRU5xwyApgAzU2jUVdrrZ6QYDcdxTfLACBQpVpt94UJ2A6ZKX8d5DtfrVqrclNnLUKUihfa8h"+
"W2FvGhWgBuk3VxUG/eNKOK3NQFBoUBoSBK0wvUJpYVnJhbcQuijoOwBViCoU0lOLKsiBBhNKKrMgREuWywCuSmxK1ucw4tKqiSxu"+
"Crjw4FYxFiBKOkJ110ZycUl7QtjcOFtAOQ4/aYDskzlUFbKoJeuO3yAaG+ZcGBOM6aDAO89ONofSLWiKN8xHvwUHdIKIgKqht0Dn"+
"UooxYUjUVcn8nAmyB+dbGVx6e0UbxBAQEcAF5ZpJZeHWZIquHdxtAA1SKW2Xv88siO9Qj14Fm48EH8SAUFsGhD18w6mYqsMvLVLZ"+
"LAILoaTM2Acv9oklxYgbQLAqjFxR30EhKrUlKr2wt1qQVu7CBoHFlnOmxgVDK3kmdG4HMp1ECB2Dngl1TBTisRsJ4NR7cxllak4C"+
"mH3xK4S2CYgcNMtRFO83phJPBhfiDdQA69ptXVzIJVGmKCONrrcALwGlnBeDTyLgSAC3aIK8LEBeIJLsUqgbtEPeTjiDQyObMXWY"+
"+NGIxaZZ5BJpNZ5wl2NFVRBeelriMlaILCxQWrHAZdy6zwytoCRoDpTD24YHToVEDe3zFwPftIi0vA0YL7/YjQGQbW9bhcGaIq3R"+
"DErdw9JqbLKjMkK7a2AAAB0HiWrUyK+Au0h49zcyYfUQRRQ6MyqixhVtKpQbDA8gwYIqIs65GihL0iDIZR5UAxbz4ge3m0lZEBua"+
"hbRSAAWZWAPyCZOgpAzFoMdH/Y29blQLAGIzKVEWWImxV1c1vMKZ18U5QQKDaJKHcBIDQlqQcF9UJS0Wjb/IwFEI6pREbLBIAFKb"+
"oF71f3wtw/U5xm2VKl03wv45vJQt2zeeAGnMliVpMCU1pjw7mLgoMKqEl3zFBOC+1KMcExTfitSjEDikMb0CRRAZFTbMU2ONQ6VK"+
"KKLu8kyViqC1ylJXNQ11yntGci08jWA7J/uIobi5UFuymgcAKIeSbAJXkwOJbAKmBu6X9w3XFnZUdy8GXibNliFpkNy1sNGJWgyL"+
"UXlPhO6ijAeNbmKMnDdQAzKNwdhP7I/DMotIU8tYqa9AjstSPyh9A6dZ2wuzzBhYOwOoNNlayncTI6PlO1Q3gyi+PeY73Ick7elJ"+
"QX5hNfjNdCdw6B2hT2RsEq2m7ynvDc/uUhOpSFZjpqGmPeiKHbFil2HQfZrhQYEZRC0IkmW9XhoZL9pDVW2+KT9hOLiRu4RUqu4t"+
"CYTCu8LgZCq0tlw1Fl9sVEAs4Dm/7lK2MKIA0WZASkxa4hqRZf6H6ix+JKESKLaHRyYZ/qGE19DcfFQkISG2AovbpiA0iQa7ACA4"+
"GfdguEFQA2dBwgGJBAqI6ormZ6jAW+XGwq3R5mog3nIKiBYVLrqOpm0qjrZUoz7iFgDYFzQM4Y4URFaK+CiBTNizBmVqOm4YFoLK"+
"UWONYzgrcsY+UTgbkJroDuDeG1ejVqpUSxrPGYIkCjVVQQKWMMPWNwqpbDtQcQr0mwm4IhrP55iiSQoAli1i2nGYJFsUIWFDibfE"+
"Lwm8rQiA0TzvhuUTr9mq0JZ4dUolSlvoSV0sNUIAiGAFKU0EVlhB2IcVIsIwPMuzwk2WaaJ2uoavI0SumKEQ9qjaeq/BdAhB7GYo"+
"1kxwNBDzli27CJuJoC3Ms3TRbELO0R0hNIFM5dR9pyxtJehuT8yYyzQYVBDbZK1OeJWltUCBaCBwMJu8k5aGRJR/bjAL50UWAXe8"+
"+I8uoyaOOjdBoybJdLChgUlEurQZihT3xUKLFl1MZPrJlBikoGWPaLCQldAaUGCnOIZi+KIhICq+ExmBFumqCmJZyvMNFCrRwiIm"+
"5tM+SZi+bqGwTkaYg4VJI0kmzQqa2xtKqw3V08kqjMnT7OaXt+WCQF8LasxOAa02KNwcoCIcopYAN5ZkX2IVgNF3QkIydulNGg5a"+
"EI4uzqrybJX1ahzQ0WjbChBsdeen4qLrm1hOGynxAFloFRFBfkeyM2RVJViRSwvUNDUEUAwXGWcoFAdOLEErb4VUAEVA3jcD7EHB"+
"lAC7W7Rtg7ZpcBKUoBm1y7F6sRFtVCkxmddULRKS0ZjJJGwNFStfwEvn0Bg7IXgMUXhZGJYtYaFeNwCXbUpNBwNqTWYqISANLEXS"+
"aqfwj9AiSAsgyvw6BrJVjUZ0hlEDHMiLZCkxt+0ciiKViqCtLcz8xzPSoi7LZXnXzAniLwLLEtDDVnRWLG0vOAG4O8RRqDRUFM8/"+
"EBU2bgjaZP8ARiktY9oaZHDDoi4cgAUXK6QckIs0QPS5AFsFhrRe2C7KWsRaSzTokIXsFS1uW+sPuGgrVrd+UM10ASqktZFeYsCw"+
"oaBbdnIeIEB1Z7hTKie51uXUXsCDUYoZNPxFgW9DMVt6KojiEtgKJhIZRYWexFVWCndsoI1lLXLZpQBPhEZbs9QQoWwh8QbVp98i"+
"iiiHF95cYdwS7UmXkbxBb4QAugOtBMjE2IBEqgDbIes1cp+msuI5WjC3fUbcJWY1goXmGtXzEGZ0BRqote+rZZg0Gtg8StSogVAL"+
"wAtnvFzYOgAIKXELWy/UCLYYk2kGZmHFGo85NuSDSJnm8OIAxAGcoSgyrGxlm/YLCsKbBfzQ/E7ZpQqCyVAqXAjQXSG8hjRbKWAC"+
"Fjlxsj1iiKsNEUBVkuWL+SqOGUwxVA+Edd/q2KyivJ5OBiunbx0BLAPEFM+pm+gUZcZpGNuCW8FPoMa5NYVjWItkFgr24FAeyksN"+
"YozSBdVofyR2PbmVbSAIzIw7ISBEaNCcVFWdQ07daUbE6P0BHjoDUy2S1LjjrRCBZ4hVYaBaQ+cO5nqBVC1s3gHwYFWBSpoaygLU"+
"8agFTREVFfmsXcItWSqmhSArBHMQsQpUNCKIp2RgKgfzNqkDbyEVvKuNRuaJb044gZTFGgBu9F6h8OZShNhRJvF2cw0OXOPBuxaL"+
"2QkhquiDFJVuh+MRJFBbpWcoBbmJJCmw0CkQGgS+8m1C0AN6H2QovrKghEV8C8QVDx4FWzVlKi/hDNdH7u08gUw21SULSlUNvI26"+
"I1ZWAqEJX7BYyRRUO4BROWWFwgvYT7ilDZss0/KC6WyCIVUUAXuGQMFUECxYguCA5AomXltayYi1L0hVIItNgR1LUJeFAqNnxBjw"+
"I1Qo2Y0BE8cLaUFPzHPONpcNhoh6BgxXO5NWRpQ96oN7Crj4IKAiANhMKBjDmIO20qsiKpCS/cuyhcMAY654g93jYFqGa7O0pnm0"+
"dJCm07BZ/QbC1gVDwgeMC9wPIogTYL2FVxWTBZBToBWKAVgsHESqqgkgAkosHmYNtVJU1VFBul3dERZuFwAotFcX7S0ZFGtFYa0c"+
"6jEA92z5SWUZDagjAtcQNTQti2MWtykmypBulAUYVfxGcIbkRFqF4Myw3pYmALUFS/fJyjneIVK5yrjhuolXQrtAdl6a5od5lg1s"+
"drF4jNqc2R5eOhroj7Sh6LGOkX4QgHLSYWCRleBzbD1RjlW1cPoERDyUACBggZlwDXebmFDaB4XtgiYgxGNFXmjY4lx8xghibRqt"+
"AIrepdGNkMzWJef7bCMjjhji6i96h4v1lLB04iIVNIEDpEF2solgIBq8lWQPjcZ3AIl7EsweiNM0QSwtYtXtzqQhmgzheq0V2uqA"+
"POOpnahdIIwGiLrwq9Eho2nAbblyIhjIBophXvW4xoshLuJDuBrBqLyAHqOwplA43CpQ1m4pJGJ8sbqELZDJxQ6yWVSBF0ygrLNm"+
"0UfriRW3eEg2BgO0qWoUBQ6oVh7ibdAroBrbviAlpASWip4UhU04FGhxitaPKKBlIAAIwi35JnC1HUuZG4/cWu4tpkFJVIhBFTUI"+
"pMrYcPUCtatghoGsePzG83UsbS7SvAZSgHTFG6WDxnjlghqBWiRIXBGAICCJvATEWt6RMjOAFLuqMdadZuBLFVjwUQqSvHIyQ1hi"+
"0mVLpEtaZVbNmQsGDhAmVnMRyW51IgoYKvbiIrz4CZlQqKUI90XTCjlQlj+4SZh7bi6Bqst8IPAspZQSxat94rgRBMqIwpKbg3te"+
"VAVWWWnxKDCuqNUBboYQw1TQAdBktgnMfz8Ejpg2gLrzqXoNdV4bigOzIYlpUsNSJyfAl0kTWIoV31Zb943L9iNbMdJVP4ZVQIhm"+
"mtPAvGB4EYKYEzQxAoNTgQxMqnvxGZEaiXVLGf2Slrbcotpce/EgDC84JarHaQv9NSgB3sNiJF551GC5XeyLdoeR8Z2Tzx2ilgI0"+
"1DnfqzPQAH851tDNQV33sADm8HENDw1QbGjfZ7DjUaCLoKrMJZnA0SKqRQtxpGzcPE2EIbXQpMN9w19GrjZL8CqtXNNYhupNFAT9"+
"gT2pzSFvlKJQ7LWoglIFISy9T0QMbJjGsuyNzXGI4zKMACI5UN1qsQASXCkXtd4CqD4hRN4xikdmScbixXKuhdgQfNmjJMxkBEuI"+
"ocoOI1QCBFQFo1HbF5ZRjQQaMGiH5HvIg94z1dS/zcSXIp+eHiAR6l3CJOK8X8Ra71oEDbQ2PwZjZ2sZqJpHJP8AyIbi1ZDYCIYF"+
"VvpcGdEV5T8xbfvKtGBqiZxmBWDzNbKTHt1O+HuwscxHagMmpoIpKtMhMLQpYsdtm7DqpXJsUsRRGihS7/Eab7bYApEIjxGB+E2K"+
"SMTd7W8QxmeeDZYxa5R4snOAvOQcJbtJc2ewVFAINwbyrLyAkOMu6SIrwoAkE7IgJCoXuLSS1To8Qu6ZVmTs3KDQGQR8HD2zN8UW"+
"sOcuXKteWFQ2GnVt3V84F7MlfHllUUGUbWg8dogYOo89/iA7wBZUPIfaGYCaICcPmVxh4oTymFpVTEUDC2pnuY1MGMkv0oCjyVbR"+
"mGpBzhDUXyb5uX2IluXUWdHyBQwh3pZoS2qjmfMsVFm7IIC9w93FkiKkpLbI9q9+orUGhwso0sSHuYhxLKcCmws1mBG3R0qGe7mW"+
"Wnogqc6AQbIIqdg7jhV7iAKBJapiFYSNglsVRTB+TEUbkrEElXmQ5gltWYYFrzMP3zD56hxQiB2jzE+tLWoViOI6/cvJ9XipFUGB"+
"1UdaQjYCxqqphIlcVaYWEqkq3BiR2hbXRaJQ54u7j8mHFcoLYq7tPZC7qCdLhVKZMDBuFoyGt7g8UJmbSAko5jMrRtwDoQzbIi2q"+
"KhtomVXsKSnAhe0qvBGVVUYxacekuVlW1Vo1vDYy3akmCgbKQDlO2OQtRqWHSbpIxEm67TVqrZcH5g5J4RlsKAh3xcsGti5Hwhtp"+
"OqFIyyGa5JmokgtaRetKfMMneU8RIpd1tamsCi4QNLmA2z8oJxaOVFDzkod1+IdjSKUxRLSMsClQMaqFAVprEonhbGFiHdrykqt/"+
"axuHQ/ct4o360yMJ3eX4gM+yGsJe4C+T3GXF9VNatmBsiuoA+XoVcHXDiLzA36QKYgbNNSvrlNYdKxxAltQQ4YIGkphczSAUUhbd"+
"HwwTBvkgoaPcf1mazoilXWLLZWaiBSET7YsVoeSGjRcK1QaVdQQAZG1aIC1rdIKdRyCIjSCFt3xBB3teFVABf5J2zGw0OC9JTeSI"+
"CqJoWKIFIlB5IZodAkm2VnDTLNr8VWIzItfLnqTvVjzahVL0X8whGyAebhqaUTKxWgotBjI5hRipPq8bbMF/CFyVjUUFFLEf6Szt"+
"WksiKLKoYnsgib0ciQoTNjNZ7i4yajSsosF8HUDJ0qIpG21ex7sMuIdc1iC2VpJm3IusIN3bUQuNQolLLI8yIPovhCgQFpRxEfL5"+
"tkQEBYqViAKzYoVeBDjB4up9y8MMCqaLQHucQwpcEkCbB8D7Id0LaGnVAAAwgTRACDdBcPF+ZRiNi2LZLOwZfMLRxPQFVuxAZhiD"+
"W1aKqxuIJJHTXBkyXfl7hgHoKoKFbXoiKB7DAISxKCNcyiOit0wuLwKoeImCNFW0AyPANILhhJ4TxhlsXwzcY6oMAEm5LVR8JdaT"+
"CdKUGCHJhEBjtKNU51AZ+WUA0tlyIFVrpi5R7C1LZWYRUNEc29aQS0GUFqqVDzp6lLsEAMh8mMgPVLVEwN5Q31NABK3CwocQEHIA"+
"2CG5kaiTaZyKLBNYsgV85il7KRAGQCz8QQJdJABu0q1GEVNacq0SZwVRK4qIFGotGQHEXjLphLS4U5dEOK4WVBcDlsw5gvdxtIIv"+
"6nEewM03jY3ygTriiChVcBs0QT61AILsMCsU4goRNCotPlYbYqHeTSiRNGjJAIh1qilsqbwCH0es0FHBshcl2jXfWMota+swdohK"+
"0iFlJaxKnwOaIWVB1YcRgStlQowwG8KuBUAUiAsgqBZbAJdZvg5KIpvuBgLU0ExXOkc6sadgdS4oUAfBHWwMNY05q8UeYKDxAwRa"+
"hLKtycyw3iFqKSlY6CoUs9ZAV0TV124gjwuoPEcEoeB4j5/W2gXszlWAHzu7NDVMCU8XFKWJtARALLWxdMwyTluxAUSIawhXiQ2Z"+
"FgNKo+IeDq9m1UiMnYN4hdErGg7cUjwnkGlUJBlg0lIee6WW7eK5HJDy81aaqI0BtuCWtu3PqCgVnyZfZAh3QZGV5xlsrXx4hKBR"+
"BBFKPhNwgLDBSLN8IkTK6tDShYKNOpTqGBUaO9x/diOiw3sDVETThVsW8pUMUEJeoIwhVJsV5jRWkK3sCTduSMB7SqYEohM0xne1"+
"kWy5vmLRMbDIqzYcDcLgSZaMwqsGmEGyraUbZY4IfWpEuAFwsAbzBwknViULDfYukS2RkmBOXDYKVfMcGZcNSAAAudQLKq5trYdJ"+
"aoWTtqwFV1Wj49og9ZglSnYSwrdwfGygVpc0ryS/wQXcwougYz7xhyo2LmgFhRpDCpoUoAs5cJHbNgYVWqrlh4YkDqCKBwa/gauh"+
"BKFKlrwXzBCfJdINsWFodbvkqOgK6ISBbCAMRQuwRBVwl0UbbMjxIZZ8AutRY6BzzBKjFSCAVlsKP2JSJkVGwbAB4BKvMscRsqdN"+
"0U2QNChxGoGDoYXK8l21WC2bBcAYAFgMLeQBBOYKnIh8XDwnxa5iOn4JQKOQu7U83DdLCyVSNgLvauiHtyKwTYjR4EAKjWa02UAo"+
"SzM25ewhLi7KDBYZiSiNAm+YJpinlamwFeNaYXLQowUNJpSZ6qpUvtJxSGDQ/txNAn01pXK2YDcCIRCDZkgajRmOgppFAHCVq5lj"+
"TAAQD8RefVlKUVn7PMUVLtMUKALWFpXaCkGFiK9VHK8OOKUVoW43zAWUjgBEkFyDvEtMNpIFLiqu7x7RAwUGqFAIOU02DobmOFE7"+
"WUhqzZQGKu1Mlqs9IbrVa8Ftyhj3MyrSWdFwOu8wuCE5ElBRI6Dk+ZdBWwCWvqbWDSBSkDXDKgKQXIYjIio7DhFM4ENAICTj3iYV"+
"rCwClkDJfcIqrnzDmACZeY31qol02WxheYbwtREpgl8jSMVt2ViQAgJbYf4iopS0LtAVS8OdkAYsroQKQqQEKRovHrSBauvxKL0j"+
"9wIsEKcmnm5YiqiZllzCF7S45XGdSRCZGIpl1G0UUwapn2gPmocEADg6DBgW8qeZMLV05QylQgZk4CMxwjwoVAFCxYWhnuHlEBhq"+
"twByAxRL5hBsqqHz8rAUqVY5XBekBKC6GQUsBBDyxDu76LWLYpq/ymJ6ZghWcixC26jK5O5QuBajcvNx9aeoYioNkfuZzULnlsAI"+
"USCKeNS1gWVN02qoZq5//9oACAECAwE/EKWAwSS0MMTslIFc3McAXCWhdLLLRERzLXHEtAUVMIzMV0NRtoOZm158xwjN3EpiKkvq"+
"WVcbG+YN7YUEWX1ET3n/AH74l6HqXj4IlA4jCViCXxETqDCOPHoG3UCaZoOZRxiYEuGFg/3B8xdoFr8RA2VFba+It20zv9wqEN99"+
"xBZBWXUuWzPpbcsMuDANj2JcRqxF5jSEEFuXuuH0uKS0lkGc+gp8zZ9oYizIxuCCuoCc3My26hfMRRTA2wbscQd5gpqCtzO7ff3X"+
"cE4YJ1+pzTuA4iLUXTW44VGztiCoNLhsXFipkiT2itQM3G1riLAwRbxUQU5MRgRmvv8A8mZYD/1/rv8ACCWOIBMQgBzBFW2NrYAZ"+
"lFMFKVdn2/EVQLcJRNEMKIn5X7xEF2tQKDzcKysZAtLAYXmBQ1lLQRmANudeD/e4WCsgVY+lZE4leOZaUJmPnOBjYVABjcWPkRKw"+
"Sst+3EoIxwczKNUA1AC4KY0ZkklOAVLlo+/aVhKlMLlei25mINwEgruKQzqXAqKY2/n+/wCYK3FzBrUVuPCY7xbVwS4xFckKFkxZ"+
"cRO4FAGGJcBd8SgKlLiDcpGyLEg8S/poNuohcpMwzKuVKlQYHEW2BcHbeDmDmtxQWCgXGjE6iEN5gg5zEBSUrCjiC1mMajWCIo5h"+
"dqC1cZsbglgtfu4B7X1/sHFMJKCcrcKWoFagXFG5c3KsVYqPMSFmoUxxBuIFWiCuYBy/o5/qWNZXa7fvrBA8RF4lYtiAlU1/Xt+/"+
"0lEvW3MUaZbiD01AMsBp8/f9RQiYOH+Y5xo3KJUTJNnocaj6iLaxzTDcYlSgZWIZTcGoAWIpnMol0Ea4lRPRwXBEshsM4x9/7uBN"+
"uYTd2zEGCwy5lCOHaKai71BsyQcjE8xA4iKwAUfbGwMGijcBqPcGXBnBu4LG1R+YlWvaOhBWTacRBzCliVGo6DSn3+YN8ffmIMQO"+
"dSlpJmmlwxVaIoHFQ7lT+fDFs6gxFzcZVYU3AFxUBz3LMktlCKbqCtdxgZidQtlYFSyoaPv9QbajlIU/dy+2SC61FbgJGs1uXcGZ"+
"S5MYY5qIWSIYZdfiPBBiEYVkqN1B6g1cA2yzTK09RxMzIQ4ziPAIgwiiGT1GCOoMMwHmcYgVBqpwyyhBGxi3qGEXMEscxYLVhce1"+
"RJpTJRCAgmDzECmyXomYibIDCNG4qg2X9TJozKd8xaIABOD9+YE05ddwgnyuWmY4psYXmsc13/vcdMNh+/vUwFwz1OkoI5hgrFah"+
"JbuCnjo8/wDrAwXX5Y/MakcbGj+9cRVwNsd+a8QGh4jJbOGiIECXrPMURcEEA3KHJDauoDqbK9kDdwce3bm/Y7isin4+/P8Ac1hh"+
"AksrJC2TUQpfEqZcsEuWaZY1R3/5G6nTEUCrH9f8ibluMqIQC50FsQWEKGrK8xnKlsARBR/P3+Yiq1fooCJSWb9S6iuB4jMscmNW"+
"Y+/v+4vdxQvmJlzF0S5toiBqlxIIoRKJbNkWKe8SiwgppLjBY39+INQAI6gruXSrZiplxqI5NxdV6oMWBfMWselNRamCww5v1q6j"+
"NiLFhbxFdGWKoXiMwrWYw1Bd1BIg73FjjcIRMxYYbfxLDTv0cRTmDhEaNZuDcOZcYKfEQMME2kEDTGV5qOqF5grXoYsfaLEtgPEs"+
"MTC2bluM4iYuGWrggwxY1ADEsqKMBCo2qBFGCVTcKcjiAMBW38S69NmssVUcHMLlEIiKC/v9zpZ+7uMoSmI45I9mL6NqyypwRbKa"+
"uWNxlRRIIsykIprEB1KZgxDTxEIBqopLEpvEqK1XMMFECWhSAMRK2Rqo3Cru7hZcFEWrGojs1AqyLzAoWpYYY1YjWrf1ESGKQMgq"+
"FDUFuqbhKEyz9+8MMwKPQ+8efaI2+SDQ8x6oMjb3FRTEtKxxChtiZSxQscwCcwXbFBt1KmnLLhfMpFMOYtAVtg01xEVTmUBYffxD"+
"BZLLqKpdNwWrlrzFcwWsYYDpEIoObhFB9+IG8kFwLC4oh7RCt1KH0HM5iTHMMGxBqK3COJTv0r3mZRWog0bjFWy0+/vqBks+95g2"+
"Ygt0y10uZgKxI0kagq4kBZYQQyxWHEBEWZNRAK3FRcZiLSBcRWKgvMCGY1eIGZZk0xIicuP5+/5qNmaqDcXmVaiQ1pwwAef3F3m4"+
"EObjWRbWFEvhqBS0bQtpaxuEdkQ5FuC5ceYiayShwsSBTmAyfb/ENI8xAZSrZnQWxSl7ff5uAbVuIMAYhKHqYEyesfuaJTl56L6P"+
"vMuJiiDDfcNlTISs1zDGVWYyHh+/3/7BdrfBv7++JbAuu1z7Q4OLdrP4xjxvMYKFO1X6JS+339+alypg5iOGVaWKLfX8yiXx9/eI"+
"wMxlRqKmlEijSFx2tuGmxwTGvnHvKiOStn2f8jGsVdff/k4C/MVgK7iBFcSt74uKQLYSrmAF8TKhefv76ghzqZ0mlRmjDV3K1rcA"+
"rCCwWRykCn3+4iTLPO/Z8wjVeP4JZLdrf/kbGeP3z+I8GYaFd/z6AbNwCN22I0QAOf7iGiZ4qHawYeFe/n/yAUoWtEQXSDwWQpyK"+
"MKrMMCWdxUYW4CVRUTL5ICzXERKabmkcodxTVzcVbmyGkKtECiquAvPEUf8Af+ahvBcAGMsqJeGWgSXXEAtG4OYCswypXJ9/zLAq"+
"iU5u5mBRgwRQsrTGQKo+/tlC8VMAQxFRrxC1lReZW0sRcUwrKou6iqG1mJcvWKgCNy7avMs2iZO5Vpir/wCxQc4jYUi+DJBLVffv"+
"NimpvgqFd8JktgCNiyu4qPPH31/ESpAeaIy6xTqMVhAWXEDGZjVEtPEqtDmWhSHlK2hz9/ZGR1n78QpxKRUAU8xFhVwgahC13px9"+
"/MOy4ZCirglMKzEAvLL0pdDFbctc/v8A2ZqoAqjMWUMN0czIqXE7ajSINsQLuCtwqdwCwMkEQXMUxKWWYESlMRarCAB5iAtijdRk"+
"vj71NzW4CoPA6i09RxauUjcoJdBBW6YwVq/vEU7YNHvEDdxKVctd3BjWGINBgihxG5ft9+8DWgD+II0pEqF2EVQGXGMr5hpYYgAz"+
"mAMyoG5TQmGrhoy1LVKwXmKgvdRLikwZlVgRtatI0MyieI3YYgjS0wuQSguAKWfxAAq5dSwFLa0y4tNwX0q+cQF9xzAYjQRiRhGa"+
"zWVZWiPWl+2dY1NekUuJFRFxEBQEVYOIlN+SU8VMgBFEQAVVfPM0XiCcjFL1C24Bc9QDDFqO0PMKa3LVki2QqoMHFyi1F1B4gzUC"+
"jz/sVhC9EVNxbhirljydxAUtOLlAH9pQGLPaIJ5ffEbIGEUAQqSljSqYYBrEUgqG8/xHY3liCVzHwB8pYRCRxf8A5UoMcNNJAnp+"+
"44DzEUbB+/8AsINekEqtSlCPMULUDzEIIS9dQDaaihTmLdOmPv8AvMRsi235LnH+ncdh1PlPv8czMUmSnW5i0n3/AHNbMVSpYLSn"+
"jUv0hAJYRbEaKcJUZrleXvj8RxLtb6/75mIvE0uJdibImJs9pcUylu8xEae0xK+8wNablAIqAFsKqqC4rMoGFuB6CWsqITEPAW/v"+
"44+YZFksrJFXBxBLbBeJnxCnCzDcshBdEqaCNF95Y2wULWIhapQtRZ8fZFoLKbjYhBre2OokMZirVQfSgnUokJaObjaLD+o1FqPx"+
"f+QpaffxNhNzIbiFFDTURXeYispqFGS5vVn81LrvfoTFxM+YqLbcxmkoIXVb4+YqwRa43Bjn+ZhuABRKMKIN1n2uBcjFVV3LjWIC"+
"GIKg3EoGz9xJC8QXZqKwQCBiOB1KpY4nERhRGlToEF44iVt2xBABtiApVffzFmrzDTO5QJwwhhnuIS+cHcGgHx+PvcG1mFwxW/H3"+
"9/8AsEudS4oksRIgGpYNIAKP9ocK3BoBk+9fzM1RqCjfMFXzMj/JmKrLAAXqWOoJ62pgpqLEBorq4IncTQuIBvIRVkiMM3UDDFQS"+
"YHe4F4YsalGN8MBo7jbiKt9wBqV4MLGJkTqNMcMUVH399RQ5zMrUtxBRsldiA8xCy0Qla3ACrIE6X1Bg7ZSAUsqAvD9/zGKqX+q1"+
"zFbFaIbWxezV/ZFY1X3/ADE5biDaQLKLqFGFYI6eZa7FI26C5uLj3gbIz+4pgMzKzDofv+odQRK5iNppIvaUqCnpjZrqU7MSurBq"+
"u4iNrmKyioFA1cAXx/EAuEgA3EBuHN3A1dQDL1PE7RW1cyoBlLZCFcL91ByNv8RVBho+fTKAhriClMGiC3llR+hsPMam0Vl+hPWn"+
"0sgCsaiXNwO4L5Le8s5CKorEGwXcCjUqCcTEAxcxouH/ANiqHDAujOfn/wAly5iUemyiLcCorqClcSygCLEQF1kuECLNgxLHSmUF"+
"LxAFSu3E3EaialgU2voOYC1m4niN8kG9wLswffzAL/5GAvPX+RAjtV+4TlWcxmot196/HmKoFsgBRqA4JqF4pWtQyFdoaaSAE1Km"+
"0yShXEsa4mCobFAeJZe8DcIoWYgxKbI4CtGOaHtcAbzNJwwL3FIS5XLVkGsECNmupn8XNLHFv/yGYDMOIAcJBPliLPRCkTcLBPvx"+
"7xK0wE5iZ1Bk8wwrt9/ohSGXMRTqCjcBqoqYnhx6UlsXxCZG/eGa1AyGFdEum9ff5gUyxFSxASCCiIlVmZWG5QU2P59EmlSxYZhG"+
"OogqsQkvNw0THUBqCdEqhi22xStw26iEagWyklrXEBi6hiJWpbAVSEoFRZoxLUwxJpgHKxFwFbAaqNpkzAEYioH3/EEfKh/rLtR3"+
"M7uGXF3GaYo9zaggBslK3yxbbYi4t9AlXEMosB0efu5Wiitf+xxdlS/BMUlDXWfvuYljaY/8iJZTGCsxPRIV8RhiomUDCTDlggFw"+
"nbC1C9+ZZsuW8EvxFWNtSmFMeJVaKvEslvcCO4LCsQYUli3f38xqywPCFtcBG9xaywaS6mdBA+UqrjD+IZIpEzFEzDG24BuD4mXN"+
"RoaWB7II4auCeW5TEF1gA1EvUTuBVjwy4a+/MuUTT9yt3UQ3VQWsz//aAAgBAwMBPxC5ZCkpLGX1BYt7JmjYRgNWrG0IwWwRdYgh"+
"k3Nr5gStoKCIhtcfdSjEQiWXAphw+8pgiVxEqIsr0MzW48de0oKRlo3EG4KZiY9a9LlyKdkFvEReYA2SrE7GILyQBKb+/iIAHnco"+
"VQrGoihFXANO4TGJvKmPUMAlRIjj8y1BvMN1qI8xQziISWWX1KQFQQfSn6Kj2hsvzEpIZU6lPeKPFSggG5iGUAI1gTyMxaxEMv1H"+
"oGD+/v8AiK7qVMOGVizUDA6gBL1NrvECGoAGJGoC6lhCOEgrnbUIefz9/wDZ0YARN/fmUfA/dfeJVwVO7gF3ec4/7CDaGc5lBZ9+"+
"8QaSUsGsafiKpXEGsS4vECrv76+YIrAPv88RNsL7zDVtOnD/AJBKuBsl7niFrg1ESKvvKwW1EFAGP3D0wv4gxTKJWwBtl3tAFXLG"+
"pe9ShvqKlcyFgdSpATYtPzLIKXYY/vqYxgRepZ3xDIRo3K1lfj9RUA31XiXFHswe2f5mJSQzEG2J16XN6YpoiJoiixA1qAFe4BXq"+
"KIEckBXoEGLrECKBqBmAcwtMGNMQkQoTEamSJccQtEpcFSC4iWVD67jViKELnpcuXLg4Ln1q8R0LNxABDZxLIMW45UUlFEPCMwAi"+
"EqNcQWAyruCw47lKuIXUJTAUFRLqieTz7Sku0xinDKlktpVRsLSKdw9rgtkrokUWQA3Bbpq9xItw/wC/eI294lQQC/0+9wcVZ1ze"+
"/Tz+FlMOBoaPvuPnDsy7QOYr3sf9Xt4DA8wWCiIYMHvcdcGI8ku5Qqb+7v8AqLiXZFDZARYOICXUa3HoDmATJbtizIsNhxDagO4o"+
"iuSZWWtDLQUHEsFdn2wZcsJcG2oiNMsweTzj58fwxl0V468fHctVVQS1bGlxiXYKtxKZ6gU3BTQwe4C4EM4l1FbbAC8ibCYhVuIY"+
"wzBZmVoCr6jgACvaIy595iNaff8AEIQbgVlgzGFKkXUTlmWnMFv5jIVCrzWoAtzAFLYy/A9+PaoAoOH+pWIYT4jIHcQaX7+8e+Ib"+
"xExVRPSrmsRVLfQcRlaaCKsAAXbxAau4PQuw/wCxS19+IAt7hYsIHd59BmVGMWZQboaZmWpgsKs1zn9S1e7GrYmUITWHzKlVXvEz"+
"ElSiVKSVklEHMciswUVKol5MIaFo6fTUt8xAZrMcscqYgFOoNKqCZf8AYBKMESqeJV1GjUabzCoQ/wAyrKIEtYI5gC0hsHEBaZXV"+
"NxWUxk+I5jFPiK/mFFCrMtS6xuqhEfb+IUS/f3zBII+GIagaXio7dMM1p9/fEtgBqXFzBjDRqWIOEfn/AIfu4izdquv+f7lQXu5+"+
"a7mCvtNRxcUGIwIHcEuEtyjKIIZpC4k0lRiPQReuNFwqFL/Vai85vnuri1D5f8/iCKX7fxDZatDFDF5lgUiRZiLHBAZojqlH/Pb7"+
"84gXhYfn41X3VEehQH3xFmpQtiijUTs4gsmyX9/EQUx8wjpp7lgqltPthGhh8TzQCiohl/sIcy5cF8xqWEQuQwRzH2/v2l/MyGmm"+
"CsDMbadTQpqFkYpF8wQ5I70VKNw2FQrmZu+Ji85iNpEBFx8RLKiIJuIF1KupZFmzqIFy8VcBcIQYDqo0aleiiwvHMSBfiJLslUsl"+
"dwMqxiegHOoEsJsd4hLCk4S+iCMKZYC5IwIwFpKJVBNSoFwKWTEtCqxKPMQyFRBu2oLTEEKy/Hz1AlFNQjVgyhS0JGiDaL9oO4Iw"+
"6hgqsxaUx8SkKdQAdShcYgmTLVVmKBiVOFypR2yxKZredf5CpSqDOIjdJTEFlRQUbYFyoaOIDZlKzMtC0QhYuPupcdCcRHIxFGSm"+
"CO9xzEEuYhZKgqQIwkEiiQBjcYBq+IkcQDFsljktX8QEUd3/ABAYFZRJaYIC74lt3AQn3+fupzKuNmHcJ20TWOPQIqgRSAGeZi6i"+
"3T8So7R4lXCyAFoTGrhIHeINpNxhlvGpagjVnH+ymDZXzKyLB9/qbRmwtQonITNTBsiunQRW2StW8xbdEXLAgAJGuKJYMGIJo7lt"+
"3ZClev7QOCys87fxBFsbD81mUu7xd/f34gVklt7i25lYiXA5ESVjUBEBzkh3GYHJNPvEuVU0xBax1GAGF+/jzAldh9/f8QojDUDO"+
"z0163ymGG4wHUc2z1cL1LGH3i73mklO5cMxa2cRN4S+JRzkftjht4QAKagu7g3CVhma4KWxF1KOMxYQiHLuVtuoBtlU2QRUuIjtG"+
"rxELjURrMKHOpiKq+NwbKu5QLrEMau/vuULibOq/UAlYJteKhKCGoMKOZYAqlRVXFbjQph/EoFufxCjY7/Esgwspn5feGlGGrmyL"+
"ZqUKVqCkud/H+zAim6fc+/mCW13CiMJUSCVS+ksBzGWV1L2sHEXmXBvcTtC/v/fNVHQCX25+/wDsYEnpo7v9cvxDorg4/uuvH5lZ"+
"QX4zn76hKl1b3j7+7hC+f6ggHEBJeCl11X/cwFqZtEcEU00YE6JUr9NcvjP/AHcFRALsqrj3J+XEAApUq8rzgIfzKVqoMUG323FB"+
"BSVHTXNTJoqI6ItB5a5Xx90cxLyff/vPL8EayPT+oVLUUEL4f0/riV8EiAXHiJhLkaiBl/P3fuERUtmncKjzr9RS3Zb9/b/INSrr"+
"nw9dwZe8Ja1wdwHMQaIqNStVEuZaqyQjLmJC1jYLzKkpuYgl1DuXKhXEAwpA0bI7ogXIKgt2uYNh7xA3KjbN8SoRqOyKK+/+wKAU"+
"vf3iUNRil1UEt3UFdES6gwzmXXP2+/iAFxGEim1uHlOjKEiIYiilwgooZjViOP7z+5bsr2xCBQYhdbGELMn7/mKkLHm5WW4Zl4qK"+
"rLiyCqANwtEoQ5madVfv/kGogh+CMoRAigtMMqc6iNNThG6ghkhNYzABpzO9wkSG5kAlwxtZUpbjRRX+RQmBfMLpXEu1qAgrFHUr"+
"lghLG8RTeUcCm/vcsccTEj4gC7iFhAPXutTH3iKF6VXUUt3mCWEXEXbHauWlpp3KiNX6QiCZWF6jiFUOmNnBFUrqYUrmJSyn+pSG"+
"8MpwQZkxFaCOBuIXjJUsiVgirWong1Bs8bgo0su7qY4sgRWkisNn3n46xfcpC1TmU5crEtjb5gIZjTHpuFG43/MBpYF019/e4WYN"+
"uNxAVZcBkbr8SiUMTKdP3+4IMIQhVXuc/fMo5DH9RQhWJdNpHNpmF0MGlK/b2hQHUTMZYEySlziFalzFSwi5D+Yoiq/mWFswW1Ar"+
"io8wenT9f5mZKHUFNQM51KOWFVbmAdS0YIJYmKjCwuJUs2hFNK+Ea1Rj3lVQSoAVEKi5YSCFtxFtjvFypLWv6lwcd3+Zcv6Abj+c"+
"y37HREbmbv8AiXtYL8S0KMxWYdPeJeIanFxwKzUow9QG7GOOxIEM9/qKGJkwxxUVDEC5NyrlBfEXmIXuBTURuMSmK81M1cyWuJYx"+
"cIS7qKbZkZlSUGCdDBGKP3LchLqhv+IxoqUSuUC16iVmUcQxSwXgKfv7v4iGFxKQppc/+xgA1fjHGIV2g+/vJBFi09oGVoEYVOTM"+
"WmQPw7jKdo7/AH7S8thppuOwbz+4qzwRFYFZfcWUgK4IgNLx4+6gIF7gKJiod0/t/P6/MJZofxBo0Pt9kIybvcpRFCD1GiA94BZz"+
"MgZOuYAN0ZgAaai3buKGGmEaWGlR1piw95NYiITM8KHj355+KhKYBixj7W1x2zSEZZcDAOO5gE+x14iw7/2ZL/PtHKFRVqvLrf5Y"+
"TPEA0lRA4jRVYujRE3eIK9YfSlZCKyBWftllRbcIU16FmYqKrMs5Yk5YiNkTS7lLXMYgXmULaiwPiGYKiLC8wQcy0LlDBsQjYplA"+
"FVKQJQwoOZwz9594hhI6HSAHyYiV0WTNeT/EYoZWodSgKpjS2Vq4JUII6iVuIDKM2Euvv+IBuLmoVyFwU2xOQphXZc8iIAKdRowf"+
"f8y/FMSWpaqYowkrGYARSUFv38QC1/D/ACBsaLZRc7ihrUVKIJSZqJKmHEFZYFtgW2EpViDKFwQUaiu3JFIhEum7uDq6wxpkuKsd"+
"QEtsRWn5eiJSjXEUFKWChKE8zTzFlZwygRgFjcqS1RKaS3+PvuEo21mMVdQC7YFKzKqYuYgC0xVPcUylS3Ur0oIupaqsEtVvvGF6"+
"gmwzEDAwI0sDl5mVIQZ2fZF2CysLBac4ntHig8AxHspiNOr1EQQgNkcb4uVWZiXqCWiF1ViORWo2csQKS4GxZC98RFQrMWBepY+I"+
"khLidxUImyBXDJpitVNfbxMo4F/fvKJ5COEzd/8AkTagef8AyJwMAY/5+5SOT7+T9QykXxHcON8SlUg4hhthhBvwRSw9/wDsQCWA"+
"0QhL7hFHcVcQEW2RKLlunMs7SZLNTCYhptuKzS1f3/5MhtuYGmXipdkXEENDFXdxeZfEQgXmEpNXFhEXtqNXEX/2WBnJ6LK5YB7f"+
"f3UTYtpZky8QgAPoNfQAuUJlAJUZREj7eiSOVjmGIYY+5d1BhvMUG9zDMAGYqtS337Qy16/iZlxC6zLC3GPov0DljSNwP/Yg2blJ"+
"a85gU3AbQlNe/kixYEHJBEMWyIuw5jK5Y0xAUktUMCOoDJz3KeIwg3USFCYM3/EdzVf9IOxTH3mUFhm4Ab2xXmKjWKlIFaf8gCHL"+
"7/8APPxK0AxAiumItrmJwWUYi1KAdxIYu4iBY3FbluBww2cxaL5jLf3/ANiDqIBOT7++4XDgRTXX5gqWMQw3EGOrxDzLmBH0gVtI"+
"talkpCsYIitShMluYtOeP5hkJWiPMahZArpxFRkajDxKGG2KjbABH78wgWRp4mDuFlqxQIblhHmKzzMEfMuOYESIvJAbywYpK++Y"+
"uSIKTES81KtdfuCjYzD+ErllC3UcOIlFuoJcGJk9Ao3KFXiILJQdQ7d5qWB7RlmVdxTmJPzCh8wMVC1pmYYIQi8NjKxQXG9l3LIj"+
"zEntEc4i8oF2zHQbgYBhijiokBCDCiK7jLNxoKG4kWmKv/z4mAI4guKlUtQIQ+3o0K/b+4hLzMBXECiiCcBuGIsKMQmGBkZ+34ua"+
"Rb35+/1AtA+/fcx2/wDkzEiIJeaJZwlXmKYbgXNgg16NwNbpiZXDapA20rMFaMntGguosZ5h5uDOWFQQ3K+YtsacJiAGCKSagEE5"+
"iEtxUwNxisgRK1AvUa7q5QFig8XDKfQGJEPEB4IU0QEEXO2NmMkqqGIQCjuJChlPME1/R/19/gIqlMQhfEC0nX/sC8uoIAGX6iaB"+"yxORLlLxP//Z";var eT=''+
"#XiTOptions,#XiTMail{background-color:#0D1014;border:2px solid #000;color:#6F9FC8;-moz-border-radius:7px;margin:1px auto 0px 1px;overflow:hidden;}#XiTOptions{height:380px;width:690px;overflow:hidden;}#XiTMail{min-height:270px;min-width:690px;}.XiT-button:link, .XiT-button:visited{background:url(http://gf1.geo.gfsrv.net/cdna8/32e4c8b3352f36cbc0c7e458c22457.gif) no-repeat;text-decoration:none;margin:0px 10px 00px 10px;padding:0px;height:38px;width:104px;float:left;cursor:pointer;overflow:hidden;}.XiT-button:link span, .XiT-button:visited span{display:block;color:#fff;text-align:center;height:38px;line-height:38px;overflow:hidden;font-weight:bold;text-transform:uppercase;font-size:12px;}.XiT-button.off:link{background-position:-208px 0;cursor:auto;}.XiT-button.cancel:link{background-position:0px -38px;}.XiT-button.on:hover{background-position:-104px 0;}.XiT-button.cancel:hover{background-position:-104px -38px;}#XiOptionContent{display:block;height:265px;position:relative;}#XiOptionContent .leftCol, #XiOptionContent .rightCol{float:left;width:327px;margin:8px;display:block;}.leftCol .fieldrow, .rightCol .fieldrow{display:block;border-bottom:#666666 solid 1px;clear:both;}.leftCol .fieldrow .fieldlabel, .rightCol .fieldrow .fieldlabel{padding:8px 5px 8px 5px;display:block;color:#FFF;font-size:11px;width:195px;float:left;}.leftCol .fieldrow .fieldvalue, .rightCol .fieldrow .fieldvalue{padding:0px 5px 0px 5px;display:block;width:110px;float:right;text-align:center;}.l100{width:100% !important;}#XiOptionContent .leftCol input[type=text], #XiOptionContent .rightCol input[type=text]{width:50px;height:10px;padding:4px;margin:5px 0px;border-radius:3px;border:1px solid #D9D9D9;color:gray;text-align:center;font-size:11px;box-shadow:0 1px 1px rgba(0, 0, 0, 0.07);}#XiOptionContent .leftCol select, #XiOptionContent .rightCol select{height:25px;width:90px;padding:5px;margin-top:3px;}#XiOptionContent input[type=checkbox]{margin-top:8px;}#XiOptionButtons{/*padding:15px 0 0 221px;*/ margin:5px 0 5px 221px;height:38px;width:250px;overflow:hidden;display:block;}#XiTMail .content{margin:8px;display:block;border:#C00 1px solid;padding:5px 5px 5px 5px;text-align:center;}#XiTMail .content textarea{background-color:#B3C3CB;border:1px solid #668599;border-bottom-color:#D3D9DE;border-radius:3px;box-shadow:inset 0 1px 3px 0 #454F54;color:black;font-size:12px;font-family:Arial,Helvetica,sans-serif;min-width:600px;min-height:160px;padding:5px;margin:10px;overflow:auto;}.clearfloat{clear:both;}#statusdb{color:lime;font-weight:bold;}#galaxy .btnmark{margin:2px 0px 0px 7px}.player-more{clear:both;line-height:12px;margin:4px 5px;}#resOnTransitContent td{padding:2px 5px 2px 5px;font-size:11px;}#resOnTransitContent .head td{background:#1A2128;color:#6F9FC8;font-weight:bold;min-width:100px;}#resOnTransitContent .total td{background:#1A2128;font-weight:bold;color:#6F9FC8;}#trmarked td div{display:inline-block;margin:0px auto 0px auto;}#trmarked td div td{padding:2px 5px 2px 5px;min-height:130px;font-size:11px;}#trmarked a{color:#9C0;text-decoration:none;}#eins .btnally{margin:0px 0px -3px 7px;}#XiToolsLinks{margin-top:10px;text-align:center;}#XiToolsLinks span{padding:2px 10px 2px 10px;}#XiToolsLinks span a:link,#XiToolsLinks span a:visited{color:gold !important;text-decoration:none !important;font:bold 11px Tahoma, Geneva, sans-serif;}#XiTsilidertabs {margin:0px 0px -1px 0px;}.XiTslidertab{border:1px solid #06F;padding:3px 12px 0px 12px;margin-left:5px;}.XiTslidertab.on{background-color:#06F;padding:6px 12px 0px 12px;}.XiTslidertab a:link,.XiTslidertab a:visited{text-decoration:none !important;color:#FFF !important;font-weight:bold !important;}#XiTsliders{border:1px solid #06F;width:688px;height:240px;position:relative;overflow:hidden;}#XiTslidersContent{width:4140px;}.XiTslider{width:688px;height:238px;float:left;}.XFleet{text-align:center;font-size:10px;margin:1px 4px 5px 4px;float:left;width:40px;}.XFleet div{background-image:url(http://gf3.geo.gfsrv.net/cdn8d/c13a372d6297a63b29edc4f923b607.png);background-repeat:no-repeat;background-size:560px;width:40px;height:40px;}#XShortcut{z-index:2;font-size:9px;width:165px;min-height:115px;padding:5px 3px;background:-moz-linear-gradient(top,#0D1014 0,#0D1014 48%,#192026 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#0D1014),color-stop(48%,#0D1014),color-stop(100%,#192026));filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#0d1014',endColorstr='#192026',GradientType=0);}#XShortcut tr.even{background-color:#1A2128;}#XShortcut td{color:#6F9FC8;min-width:20px;}#XShortcut tr.even td{color:#9C0;}#XShortcut tr.union td{color:#F00 !important;}.lw{color:#FFF !important;text-decoration:none;}.lr{color:#D43635 !important;text-decoration:none;}#transpdiv{background-color:#0d1114;border:2px solid #000;padding:2px;margin:2px 6px;}#transpdiv td{padding:0px 7px;}.Xelemt{background-image:url("+
iE+
");background-repeat:no-repeat;width:40px;height:28px;cursor:pointer;padding-top:12px;}ul#transplist li {position:relative;width:40px;float:left;margin:1px 3px;list-style-type:none;}ul#transplist li div.text {text-align:center;color:white;font-weight:bold;font-size:100%;background-color:rgba(0, 0, 0, 0.5);text-shadow:black -1px -1px 2px, black 1px 1px 2px, black -1px 1px 2px, black 1px -1px 2px;}ul#transplist li img {margin-top:2px;cursor:pointer;}.XiCMet{color:#ff6600;}.XiCCry{color:#00ffff;}.XiCDeu{color:#377ef8;}#XiInfoProducction{padding:8px;}#XiInfoProducction a{text-decoration:none;}#XiInfoProducction a span{font-weight:bold;color:yellow;}.XiTinfotable{border-collapse:collapse;clear:both;border:1px solid black;background-color:#0D1014;}.XiTinfotable th{color:#6F9FC8;padding:4px 4px;font-size:12px;font-weight:bold;text-align:center;}.XiTinfotable td{color:#FFFFFF;padding:2px 4px;}#XiTtactical div{margin:6px;text-align:center;font-size:16px;font-weight:bold;}#XiTtactical th{color:#fff;padding:2px;font-weight:bold;}#XiTtactical td{text-align:center;padding:2px;}#XiTtactical input{width:50px;height:10px;padding:4px;border-radius:3px;border:1px solid #D9D9D9;color:gray;text-align:center;font-size:11px;box-shadow:0 1px 1px rgba(0, 0, 0, 0.07);}#XiInfoProducShip td,#XiInfoProducDef td{text-align:right;padding:2px;}.XiTWAct table tbody tr:nth-child(odd) td {background-color:#12171c;}.XiTWAct th{color:#fff;padding:4px 2px;font-weight:bold;background-color:#090B0D;}.XiTWAct tbody td{text-align:center;color:#FFF;padding:2px;}.XiTWAct tbody tr td:nth-child(1) {}.XiTWAct tbody td a{color:#9C0;text-decoration:none;}.XiTWAct tfoot td{padding:4px 6px;color:#FC0;background-color:#090B0D;}";
var cv=document.createElement("style");cv.setAttribute("type","text/css");cv.innerHTML=eT;document.body.insertBefore(cv,document.body.firstChild);var fo=''+
'<div id="XiTMail"><div class="content"><textarea id="XiTMailText" onKeyUp="javascript:XiT.hb(2000)"></textarea><br> <input class="btn_blue" type="button" value="'+fp.send+
'" onClick="XiT.hI();"> </div> </div>';var aC=document.createElement("div");aC.setAttribute("id","XiTMailtb");aC.setAttribute("style","display:none");aC.innerHTML=fo;document.body.insertBefore(aC,
document.body.firstChild);var fq=''+
'<div id="XiTOptions"> <br><br> <div id="XiOptionContent"> <div id="XiTsilidertabs"> <span class="XiTslidertab on"><a href="javascript:void(0);" onClick="XiT.fa(0);">'+fp.cA+
'</a></span> <span class="XiTslidertab"><a href="javascript:void(0);" onClick="XiT.fa(1);">'+fp.dO+'</a></span> <span class="XiTslidertab"><a href="javascript:void(0);" onClick="XiT.fa(2);">'+fp.dM+
'</a></span> <span class="XiTslidertab"><a href="javascript:void(0);" onClick="XiT.fa(3);">'+fp.cW+'</a></span> <span class="XiTslidertab"><a href="javascript:void(0);" onClick="XiT.fa(4);">'+fp.kP+
'</a></span> <span class="XiTslidertab"><a href="javascript:void(0);" onClick="XiT.fa(5);XiT.eQ();">'+fp.fm+
'</a></span> </div> <div id="XiTsliders"> <div id="XiTslidersContent"> <div id="sliderOther" class="XiTslider"> <div class="leftCol"> <div class="fieldrow"> <div class="fieldlabel">'+fp.cZ+
'</div> <div class="fieldvalue"> <select id="XiTupdatetime"> <option value="0">'+fp.cr+'</option> <option value="1">1 '+fp.aF+'</option> <option value="2">2 '+fp.aF+'</option> <option value="5">5 '+
fp.aF+'</option> <option value="10">10 '+fp.aF+'</option> <option value="15">15 '+fp.aF+'</option> <option value="30">30 '+fp.aF+
'</option> </select> </div> </div> <div class="fieldrow"><div class="fieldlabel l100">'+fp.jX+
': <span id="XiTunispeed" style="color:lime"></span></div></div> <div class="fieldrow"><div class="fieldlabel l100">'+fp.kk+
': <span id="XiTdebrisf" style="color:lime"></span></div></div> <div class="fieldrow"><div class="fieldlabel l100">'+fp.kN+
': <span id="XiTdebrisd" style="color:lime"></span></div></div> <div class="fieldrow"><div class="fieldlabel l100">XiTools plugin: <span id="XiTversion" style="color:lime"></span></div></div> <div class="fieldrow"></div> </div> <div class="rightCol"></div> <div style="text-align:center;clear:both; padding-top:30px"> <input class="btn_blue" type="button" value="'+
fp.iq+'" onClick="XiT.ig();"> </div> </div><!-- Other --> <div id="sliderBuldings" class="XiTslider"> <div class="leftCol"> <div class="fieldrow"> <div class="fieldlabel">'+fp.cn+
'</div><div class="fieldvalue"> <input type="checkbox" id="XiTeblbuildingextend" value="1"></div> </div> <div class="fieldrow"> <div class="fieldlabel">'+fp.cJ+
' <font style="color:#FF2525;">(1)</font></div><div class="fieldvalue"> <input type="checkbox" id="XiTeblshortenvalue" value="1"></div> </div> <div class="fieldrow"> <div class="fieldlabel">'+fp.jd+
' <font style="color:#FF2525;">(1)</font></div><div class="fieldvalue"> <input type="checkbox" id="XiTebleasytransp" value="1"></div> </div> <div class="fieldrow"></div> <font style=" display:block;color:#FF2525;margin-top:30px;font-size:11px;"> (1): Extended details on construction required<br> </font> </div> <div class="rightCol"></div> </div><!-- Buldings --> <div id="XiTsliderGalaxy" class="XiTslider"> <div class="leftCol"> <div class="fieldrow"> <div class="fieldlabel">'+
fp.du+'</div><div class="fieldvalue"> <input type="checkbox" id="XiTeblhld" value="1"></div> </div> <div class="fieldrow"> <div class="fieldlabel">'+fp.aU+
'</div><div class="fieldvalue"> <input type="checkbox" id="XiTeblrank" value="1"></div> </div> <div class="fieldrow"> <div class="fieldlabel">'+fp.cs+
'</div><div class="fieldvalue"> <input type="checkbox" id="XiTeblhlba" value="1"></div> </div> <div class="fieldrow"> <div class="fieldlabel">'+fp.db+
'</div><div class="fieldvalue"> <input type="checkbox" id="XiTeblcoordlink" value="1"></div> </div> <div class="fieldrow"> <div class="fieldlabel">'+fp.cC+
'</div><div class="fieldvalue"> <input type="checkbox" id="XiTeblspy" value="1"></div> </div> <div class="fieldrow"> <div class="fieldlabel">'+fp.cY+
'</div><div class="fieldvalue"> <input type="checkbox" id="XiTeblrecy" value="1"></div> </div> <div class="fieldrow"></div> </div> <div class="rightCol"> <div class="fieldrow"> <div class="fieldlabel">'+
fp.cQ+'</div><div class="fieldvalue"> <input id="XiTdebrislow" type="text" value=""></div> </div> <div class="fieldrow"> <div class="fieldlabel">'+fp.dz+
'</div><div class="fieldvalue"> <input id="XiTdebrishigh" type="text" value=""></div> </div> <div class="fieldrow"></div> </div> </div><!-- Galaxy --> <div id="sliderFleet" class="XiTslider"> <div class="leftCol"> <div class="fieldrow"> <div class="fieldlabel">'+
fp.cP+'</div><div class="fieldvalue"> <input type="checkbox" id="XiTeblresontransit" value="1"></div> </div> <div class="fieldrow"> <div class="fieldlabel">'+fp.ht+
'</div><div class="fieldvalue"> <input type="checkbox" id="XiTeblfleetlist" value="1"></div> </div> <div class="fieldrow"> <div class="fieldlabel">'+fp.hG+
'</div><div class="fieldvalue"> <input type="checkbox" id="XiTeblshorcut" value="1"></div> </div> <div class="fieldrow"></div> </div> <div class="rightCol"></div> </div><!-- Fleets --> <div id="sliderMessages" class="XiTslider"> <div class="leftCol"> <div class="fieldrow"> <div class="fieldlabel">'+
fp.lbleblselbytype+'</div><div class="fieldvalue"> <input type="checkbox" id="XiTeblselmess" value="1"></div> </div> <div class="fieldrow"> <div class="fieldlabel">'+fp.jQ+
'</div><div class="fieldvalue"> <input type="checkbox" id="XiTeblspioplunder" value="1"></div> </div> <div class="fieldrow"> <div class="fieldlabel">'+fp.jK+
'</div><div class="fieldvalue"> <input type="checkbox" id="XiTeblspiodf" value="1"></div> </div> <div class="fieldrow"> <div class="fieldlabel">'+fp.jZ+
'</div> <div class="fieldvalue"> <input type="checkbox" id="XiTeblspiosim" value="1"></div> <div class="fieldlabel">(OSimulate-WebSim-DragoSim)</div> <div class="fieldvalue"><input type="checkbox" id="XiTeblosim" value="1"> <input type="checkbox" id="XiTeblwebsim" value="1"> <input type="checkbox" id="XiTebldragosim" value="1"></div> </div> <div class="fieldrow"></div> </div> <div class="rightCol"></div> </div><!-- Messages --> <div id="sliderInfo" class="XiTslider"> <div id="XiInfoProducction"> <span><b>'+
fp.ap+'</b> <font style="color:#FF2525;font-size:11px;">(1)</font></span> <table class="list XiTinfotable" style="width:665px;"> <tr class="alt"> <td width="210"></td> <td><span style="color:lime">'+
fp.bZ+'</span> (<span class="XiCMet">'+fp.cq[0]+'</span> / <span class="XiCCry">'+fp.cq[1]+'</span> / <span class="XiCDeu">'+fp.cq[2]+
'</span>)</td> <td width="70"></td> </tr> <tr> <td colspan="3" style="text-align:center"> | <a href="javascript:void(0);" class="overlay" data-overlay-title="'+fp.mo+
'" data-overlay-inline="#XiInfoProducShip"><span>'+fp.mo+'</span></a> | <a href="javascript:void(0);" class="overlay" data-overlay-title="'+fp.lQ+'" data-overlay-inline="#XiInfoProducDef"><span>'+
fp.lQ+
'</span></a> | </td> </tr> </table> <font style=" display:block;color:#FF2525;margin-top:30px;font-size:11px;"> (1): Extended details on construction required<br> </font> </div> <div id="XiInfoProducDay" style="display:none"></div> <div id="XiInfoProducWeek" style="display:none"></div> <div id="XiInfoProducShip" style="display:none"></div> <div id="XiInfoProducDef" style="display:none"></div> </div><!-- Info --> </div> <!-- SlidersContent --> </div> <!-- Slider --> </div> <div id="XiOptionButtons"> <a class="XiT-button on" href="javascript:void(0);" onClick="XiT.gu();"><span>'+
fp.save+'</span></a> <a class="XiT-button cancel" href="javascript:void(0);" onClick="$(\'#XiTOptionstb\').dialog(\'close\');"><span>'+fp.cancel+
'</span></a> <div class="clearfloat"></div> </div> <div id="XiToolsLinks"> <span><a href="http://cr.ogametools.com.ar" target="_blank">'+fp.bD+
'</a></span> <span><a href="http://sac.ogametools.com.ar" target="_blank">'+fp.aq+
'</a></span> <span><a href="http://userscripts.org/scripts/show/137752" target="_blank">XiTools Plugin</a></span> </div> </div>';ba=document.createElement("div");ba.setAttribute("id","XiTOptionstb");
ba.setAttribute("style","display:none");ba.innerHTML=fq;document.body.insertBefore(ba,document.body.firstChild);var script=document.createElement("script");script.setAttribute("type",
"text/javascript");script.textContent=aK.toString()+co+XiTClass.toString()+" "+ak+"  "+ea.toString()+";J = new ea(); var XiT = new XiTClass('"+ac+"');"+ir;document.body.appendChild(script);