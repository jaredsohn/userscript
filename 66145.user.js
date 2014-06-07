// ==UserScript==
// @name           Ogame
// @namespace      Made by raul_dios
// @description    Ogame cheat
// @include        www.ogame.es
// ==/UserScript==



<div class="contentBoxBody">

<noscript>
	<div id="messagecenter">
		<div id="javamessagebox">
		    <span class="overmark">
		       <strong>Por favor, activa el JavaScript para poder continuar con el juego.</strong>
		    </span>
	    </div>
	</div>
</noscript>
<div id="ie_message">
	<p><img src="img/icons/info.gif" height="16" width="16">El navegador usado actualmente es antiguo y puede causar errores en la pantalla de esta página web. Por favor, actualiza tu navegador a la versión más nueva: <a href="http://www.microsoft.com/upgrade/">Internet Explorer</a> o <a href="http://www.mozilla-europe.org/de/firefox/">Mozilla Firefox</a></p>
</div>


<!-- HEADER -->
<div id="boxBG">
<div id="box">
	<a name="anchor"></a>
	<div id="info">
		<div id="clearAdvice"></div>
	   	<a class="tips" title="|Notas de versión" id="changelog_link" href="index.php?page=changelog&amp;session=e89c185b3c6a">
	   	       Notas de versión	   	   </a>
    	<div id="playerName">
    	    Jugadores: <span class="textBeefy">raul_dios</span></div>
        <div id="bar">
            <ul>
            	<li>
                                     <a class="ajax_thickbox" accesskey="" href="index.php?page=buddies&amp;session=e89c185b3c6a&amp;ajax=1&amp;height=500&amp;width=770&amp;TB_iframe=1">
                       Amigos</a>
                                 </li>
				<li>
				    <a href="#" onclick="popupWindow('index.php?page=notices&amp;session=e89c185b3c6a&amp;notice_id=','Notice','auto','no','0','0','no','690','470','no');" accesskey="">
                        Notas</a>
                </li>
                <li>
                	<a href="index.php?page=statistics&amp;session=e89c185b3c6a" accesskey="">Clasificación</a>
                (799)                </li>
                <li><a class="ajax_thickbox" href="index.php?page=search&amp;session=e89c185b3c6a&amp;ajax=1&amp;height=500&amp;width=770&amp;TB_iframe=1" accesskey="">Búsqueda</a>
                </li>
                <li><a href="index.php?page=preferences&amp;session=e89c185b3c6a" accesskey="">Opciones</a></li>
                <li><a href="index.php?page=logout&amp;session=e89c185b3c6a" accesskey="">Salir</a></li>
            </ul>
        </div>        <div id="OGameClock">10.01.2010 <span>21:22:17</span></div>
    	<ul id="resources">
        	<li id="metal_box" class="metal tips reloadTips" title="|&lt;B&gt;Metal:&lt;/B&gt; &lt;br&gt;&lt;span class=''&gt;413.953/865.000&lt;/span&gt;&lt;br&gt;&lt;span class='undermark'&gt;(+6.198)&lt;/span&gt;">
                <img src="/game/img/layout/ressourcen_metall.gif">
                    <span class="value">
                        <span id="resources_metal" class="">413.958</span>
                   </span>
            </li>
        	<li id="crystal_box" class="crystal tips reloadTips" title="|&lt;B&gt;Cristal:&lt;/B&gt; &lt;br&gt;&lt;span class=''&gt;70.633/865.000&lt;/span&gt;&lt;br&gt;&lt;span class='undermark'&gt;(+2.334)&lt;/span&gt;">
                <img src="/game/img/layout/ressourcen_kristal.gif">
                <span class="value">
                    <span id="resources_crystal" class="">70.635</span>
                </span>
            </li>
        	<li id="deuterium_box" class="deuterium tips reloadTips" title="|&lt;B&gt;Deuterio:&lt;/B&gt; &lt;br&gt;&lt;span class=''&gt;96.636/470.000&lt;/span&gt;&lt;br&gt;&lt;span class='undermark'&gt;(+513)&lt;/span&gt;">
                <img src="/game/img/layout/ressourcen_deuterium.gif">
                <span class="value">
                	<span id="resources_deuterium" class="">96.636</span>
               	</span>
            </li>
        	<li id="energy_box" class="energy tips reloadTips" title="|&lt;B&gt;Energía:&lt;/B&gt; &lt;br&gt;&lt;span class=''&gt;141&lt;/span&gt;&lt;br&gt;&lt;span class=''&gt;(3.977/4.118)&lt;/span&gt;">
				<img src="/game/img/layout/ressourcen_energie.gif">
                    <span class="value">
                    	<span id="resources_energy" class="">
							141						</span>
                    </span>
            </li>
        	<li id="darkmatter_box" class="darkmatter tips reloadTips" title="|&lt;B&gt;Materia Oscura:&lt;/B&gt; 30.000">
				<a href="index.php?page=premium&amp;session=e89c185b3c6a&amp;openDetail=1">
					<img src="/game/img/layout/ressourcen_DM.gif">
				</a>
                <span class="value">
                	<span id="resources_darkmatter">
						30.000					</span>
                </span>
            </li>
      </ul>
      	<div id="officers">
      				<a href="index.php?page=premium&amp;session=e89c185b3c6a&amp;openDetail=2" class="tips" title="|&lt;STRONG&gt;Contratar comandante&lt;/STRONG&gt;&lt;br&gt;&lt;br&gt;Lista de construcción, Visión de imperio, Visión de galaxia mejorada,
Filtro de mensajes, Accesos rápidos, Libertad de publicidad">
            	<img src="/game/img/layout/commander_ikon_un.gif">
            </a>
      				<a href="index.php?page=premium&amp;session=e89c185b3c6a&amp;openDetail=3" class="tips" title="|&lt;STRONG&gt;Contratar almirante&lt;/STRONG&gt;&lt;br&gt;&lt;br&gt;+2 huecos de flota máximos">
            	<img src="/game/img/layout/admiral_ikon_un.gif">
            </a>
      				<a href="index.php?page=premium&amp;session=e89c185b3c6a&amp;openDetail=4" class="tips" title="|&lt;STRONG&gt;Contratar ingeniero&lt;/STRONG&gt;&lt;br&gt;&lt;br&gt;Minimiza las perdidas de las defensas a la mitad, +10% de producción de energía">
            	<img src="/game/img/layout/ingenieur_ikon_un.gif">
            </a>
      				<a href="index.php?page=premium&amp;session=e89c185b3c6a&amp;openDetail=5" class="tips" title="|&lt;STRONG&gt;Contratar geólogo&lt;/STRONG&gt;&lt;br&gt;&lt;br&gt;+10% producción de minas">
            	<img src="/game/img/layout/geologe_ikon_un.gif">
            </a>
      				<a href="index.php?page=premium&amp;session=e89c185b3c6a&amp;openDetail=6" class="tips" title="|&lt;STRONG&gt;Contratar tecnócrata&lt;/STRONG&gt;&lt;br&gt;&lt;br&gt;+2 al nivel de espionaje,&lt;br&gt;-25% menos tiempo de investigación">
            	<img src="/game/img/layout/technokrat_ikon_un.gif">
            </a>
        </div>
 		<div id="message-wrapper">
  		    <div>
	  		    <a href="index.php?page=messages&amp;session=e89c185b3c6a" id="message_alert_box" class="tips emptyMessage" title="|0 mensaje(s) no leídos">
		            <span>
		                		            </span>
	        	</a>
        	</div>
			<div id="messages_collapsed" style="position: relative;">
        		<div id="eventboxFilled" style="display: none;" onclick="tb_open('index.php?page=eventList&amp;session=e89c185b3c6a&amp;ajax=1&amp;height=500&amp;width=690&amp;TB_iframe=1&amp;modal=false')">
	<table id="eventtype" style="border-collapse: collapse;" border="0" width="100%">
		<tbody><tr>
	        <td class="friendly col1" width="152">Misiones propias: <span id="eventFriendly"></span></td>
	        <td class="neutral col2" width="156">Misiones amigas: <span id="eventNeutral"></span></td>
	        <td class="hostile col3" width="152">Misiones hostiles: <span id="eventHostile"></span></td>
		</tr>
	</tbody></table>
	<table id="eventdetails" style="border-collapse: collapse;" border="0" width="100%">
		<tbody><tr id="eventClass" class="">
	    	<td class="col1" width="152"><div class="countdown" id="tempcounter" name="countdown"></div></td>
	        <td class="col2" width="208"><div class="text" id="eventContent"></div></td>
	        <td class="col3" width="100">
	            <a class="tips thickbox" href="index.php?page=eventList&amp;session=e89c185b3c6a&amp;ajax=1&amp;height=500&amp;width=690&amp;TB_iframe=1&amp;modal=false" title="|Más detalles">	            </a>
			</td>
		</tr>
	</tbody></table>
</div>
<div id="eventboxLoading" class="textCenter textBeefy" style="display: none;">
	<img src="img/ajax-loader.gif" height="16" width="16"> Loading...
</div>
<div id="eventboxBlank" class="textCenter" style="">
No hay movimientos de flota</div>			</div>
						<div id="attack_alert" style="visibility: hidden;">
                <a href="index.php?page=eventList&amp;session=e89c185b3c6a&amp;ajax=1&amp;height=500&amp;width=770&amp;TB_iframe=1&amp;modal=true" class="tips thickbox" title="|¡Ataque!">
	                    <img src="img/layout/pixel.gif" height="13" width="25">
                </a>
	        </div>
	        <br class="clearfloat">
		</div><!-- #message-wrapper -->
		<div id="helper">
            <a class="tips" href="index.php?page=tutorial&amp;session=e89c185b3c6a" title="|Visión general del tutorial">
            </a>
        </div>
        <div id="selectedPlanetName" class="textCenter">Counter-Strike</div>
 </div><!-- Info -->

<!-- ERRORBOX -->
<div id="decisionTB" style="display: none;">
    <div id="errorBoxDecision">
        <div id="wrapper">
            <h4 id="errorBoxDecisionHead">-</h4>
            <p id="errorBoxDecisionContent">-</p>
            <div id="response">
                <div style="float: left; width: 195px; height: 25px;">
                    <a href="#" onclick="handleErrorBoxClick('yes');return false;" class="yes"><span id="errorBoxDecisionYes">.</span></a>
                </div>
                <div style="float: left; width: 195px; height: 25px;">
                    <a href="#" onclick="handleErrorBoxClick('no');return false;" class="no"><span id="errorBoxDecisionNo">.</span></a>
                </div>
                <br class="clearfloat">
            </div>
        </div>    
    </div> 
</div>

<div id="fadeBox" class="fadeBox" style="display: none;">
  <div>
        <span id="fadeBoxStyle" class="success"></span>
    <p id="fadeBoxContent"></p>
    <br class="clearfloat">
  </div>
</div>

<div id="notifyTB" style="display: none;">
   <div id="errorBoxNotify">
        <div id="wrapper">
            <h4 id="errorBoxNotifyHead">-</h4>
            <p id="errorBoxNotifyContent">-</p>
            <div id="response">
                <div>
                    <a href="#" onclick="handleErrorBoxClick('ok');return false;" class="ok">
                        <span id="errorBoxNotifyOk">.</span>
                    </a>
                </div>
                <br class="clearfloat">
            </div>
        </div>    
    </div> 
</div>
<!-- END ERRORBOX -->

<!-- END HEADER -->

<!-- LEFTMENU -->

<div id="links">

    <ul id="menuTable">

        <li class="menubutton_table">
        <span class="menu_icon">
                              	    <img src="img/navigation/navi_ikon_overview_a.gif" height="29" width="38">
          	                </span>
            <a class="menubutton " href="index.php?page=overview&amp;session=e89c185b3c6a" accesskey="" target="_self">
                <span class="textlabel">Visión general</span>
            </a>
    </li>

        <li class="menubutton_table">
        <span class="menu_icon">
                                    <a href="index.php?page=resourceSettings&amp;session=e89c185b3c6a" class="" target="_self">
          	        <img class="mouseSwitch" src="img/navigation/navi_ikon_resources_b.gif" rel="img/navigation/navi_ikon_resources_c.gif" height="29" width="38">
          	    </a>
          	                </span>
            <a class="menubutton selected" href="index.php?page=resources&amp;session=e89c185b3c6a" accesskey="" target="_self">
                <span class="textlabel">Recursos</span>
            </a>
    </li>

        <li class="menubutton_table">
        <span class="menu_icon">
                              	    <img src="img/navigation/navi_ikon_station_a.gif" height="29" width="38">
          	                </span>
            <a class="menubutton " href="index.php?page=station&amp;session=e89c185b3c6a" accesskey="" target="_self">
                <span class="textlabel">Instalaciones</span>
            </a>
    </li>

        <li class="menubutton_table">
        <span class="menu_icon">
                              	    <img src="img/navigation/navi_ikon_trader_a.gif" height="29" width="38">
          	                </span>
            <a class="menubutton " href="index.php?page=trader&amp;session=e89c185b3c6a" accesskey="" target="_self">
                <span class="textlabel">Mercader</span>
            </a>
    </li>

        <li class="menubutton_table">
        <span class="menu_icon">
                              	    <img src="img/navigation/navi_ikon_research_a.gif" height="29" width="38">
          	                </span>
            <a class="menubutton " href="index.php?page=research&amp;session=e89c185b3c6a" accesskey="" target="_self">
                <span class="textlabel">Investigación</span>
            </a>
    </li>

        <li class="menubutton_table">
        <span class="menu_icon">
                              	    <img src="img/navigation/navi_ikon_shipyard_a.gif" height="29" width="38">
          	                </span>
            <a class="menubutton " href="index.php?page=shipyard&amp;session=e89c185b3c6a" accesskey="" target="_self">
                <span class="textlabel">Hangar</span>
            </a>
    </li>

        <li class="menubutton_table">
        <span class="menu_icon">
                              	    <img src="img/navigation/navi_ikon_defense_a.gif" height="29" width="38">
          	                </span>
            <a class="menubutton " href="index.php?page=defense&amp;session=e89c185b3c6a" accesskey="" target="_self">
                <span class="textlabel">Defensa</span>
            </a>
    </li>

        <li class="menubutton_table">
        <span class="menu_icon">
                                    <a href="index.php?page=movement&amp;session=e89c185b3c6a" class="" target="_self">
          	        <img class="mouseSwitch" src="img/navigation/navi_ikon_fleet1_a.gif" rel="img/navigation/navi_ikon_fleet1_b.gif" height="29" width="38">
          	    </a>
          	                </span>
            <a class="menubutton " href="index.php?page=fleet1&amp;session=e89c185b3c6a" accesskey="" target="_self">
                <span class="textlabel">Flota</span>
            </a>
    </li>

        <li class="menubutton_table">
        <span class="menu_icon">
                              	    <img src="img/navigation/navi_ikon_galaxy_a.gif" height="29" width="38">
          	                </span>
            <a class="menubutton " href="index.php?page=galaxy&amp;session=e89c185b3c6a" accesskey="" target="_self">
                <span class="textlabel">Galaxia</span>
            </a>
    </li>

        <li class="menubutton_table">
        <span class="menu_icon">
                              	    <img src="img/navigation/navi_ikon_network_a.gif" height="29" width="38">
          	                </span>
            <a class="menubutton " href="index.php?page=network&amp;session=e89c185b3c6a" accesskey="" target="_self">
                <span class="textlabel">Alianza</span>
            </a>
    </li>

        <li class="menubutton_table">
        <span class="menu_icon">
                              	    <img src="img/navigation/navi_ikon_premium_a.gif" height="29" width="38">
          	                </span>
            <a class="menubutton " href="index.php?page=premium&amp;session=e89c185b3c6a" accesskey="" target="_self">
                <span class="textlabel">Casino</span>
            </a>
    </li>

    </ul>

    <div class="adviceWrapper">
        <div id="advice-bar">
	
    
    
    </div>
    </div>

    <br class="clearfloat">
</div>

<!-- END LEFTMENU -->

<!-- CONTENT AREA -->

<div id="inhalt">
    <div id="planet" style="background-image: url(http://Draco.ogame.com.es/headerCache/resources/ice_1_2_3_4.png);">
        <div id="header_text">
            <h2>Recursos - Counter-Strike</h2>
        </div>
        <div id="slot01" class="slot">
            <a href="index.php?page=resourceSettings&amp;session=e89c185b3c6a">
				Opciones de recursos            </a>
        </div>

        <form method="POST" action="index.php?page=resources&amp;session=e89c185b3c6a" name="form" onkeydown="formSubmitOnEnter(this.name, event);">
            <input name="token" value="cb78b8d87efbd57af6b51f1a3f482174" type="hidden">	        <div id="detail" class="detail_screen">
	            <div id="techDetailLoading"></div>
	        </div>
        </form>

    </div>
    <div class="c-left"></div>
    <div class="c-right"></div>
    
    
    

<div id="buttonz">
    <h2>
        Edificios de recursos	</h2>
    <ul id="building">
        
        <li id="button1" class="disabled">
    	            <div class="supply1">
	                <div class="buildingimg">
        	                    <a class="detail_button tips slideIn" title="|Mina de metal&lt;br&gt;La cola está llena" ref="1" id="details" href="#">
	                        <span class="ecke">
	                            <span class="level">
	                               <span class="textlabel">
	                                   Mina de metal 
	                               </span>
	                               23	                           </span>
	                        </span>
	                    <span id="buidingETA" ref="1" class="time" style="margin: -10px 1px 0px 0px; padding: 0px; font-weight: 200; opacity: 0.75;">1d 17h 51m <br>1d 17h 51m <br>-</span></a>
	                </div>
	            </div>
                </li>
            
        <li id="button2" class="disabled">
    	            <div class="supply2">
	                <div class="buildingimg">
        	                    <a class="detail_button tips slideIn" title="|Mina de cristal&lt;br&gt;La cola está llena" ref="2" id="details" href="#">
	                        <span class="ecke">
	                            <span class="level">
	                               <span class="textlabel">
	                                   Mina de cristal 
	                               </span>
	                               19	                           </span>
	                        </span>
	                    <span id="buidingETA" ref="2" class="time" style="margin: -10px 1px 0px 0px; padding: 0px; font-weight: 200; opacity: 0.75;">-<br>1d 23h 25m <br>-</span></a>
	                </div>
	            </div>
                </li>
            
        <li id="button3" class="disabled">
    	            <div class="supply3">
	                <div class="buildingimg">
        	                    <a class="detail_button tips slideIn" title="|Sintetizador de deuterio&lt;br&gt;La cola está llena" ref="3" id="details" href="#">
	                        <span class="ecke">
	                            <span class="level">
	                               <span class="textlabel">
	                                   Sintetizador de deuterio 
	                               </span>
	                               12	                           </span>
	                        </span>
	                    <span id="buidingETA" ref="3" class="time" style="margin: -10px 1px 0px 0px; padding: 0px; font-weight: 200; opacity: 0.75;"></span></a>
	                </div>
	            </div>
                </li>
            
        <li id="button4" class="off">
                                <div class="supply4 tips" title="|Planta de energía solar">  
	<div class="buildingimg">
 
		<div class="construction">
            <div class="pusher" id="b_supply4" style="height: 50px; margin-bottom: -50px;">
            	<a id="timeLink" class="slideIn" href="#" ref="4">
                	<span class="time" id="test" name="zeit">23h 40m</span>
                </a>
            </div>      
			<a class="detail_button slideIn" id="details4" ref="4" href="#">
				<span class="eckeoben">
					<span style="color: lime; font-family: Arial; font-size: 11px;">24</span>
				</span>
				<span class="ecke">
					<span class="level">23</span>
				</span>
			</a>
		</div>  		
	</div> 
</div>      

                        </li>
            
        <li id="button5" class="disabled">
    	            <div class="supply12">
	                <div class="buildingimg">
        	                    <a class="detail_button tips slideIn" title="|Planta de fusión&lt;br&gt;La cola está llena" ref="12" id="details" href="#">
	                        <span class="ecke">
	                            <span class="level">
	                               <span class="textlabel">
	                                   Planta de fusión 
	                               </span>
	                               0	                           </span>
	                        </span>
	                    <span id="buidingETA" ref="12" class="time" style="margin: -10px 1px 0px 0px; padding: 0px; font-weight: 200; opacity: 0.75;"></span></a>
	                </div>
	            </div>
                </li>
            
        <li id="button6" class="on">
    	            <div class="supply212">
	                <div class="buildingimg">
        	                    <a class="detail_button tips slideIn" title="|Satélite solar (0)" ref="212" id="details" href="#">
	                        <span class="ecke">
	                            <span class="level">
	                               <span class="textlabel">
	                                   Satélite solar 
	                               </span>
	                               0	                           </span>
	                        </span>
	                    </a>
	                </div>
	            </div>
                </li>
                        </ul>
        <ul id="storage">
                                        <li id="button7" class="disabled">
    	            <div class="supply22">
	                <div class="buildingimg">
	                    <a class="tips slideIn" href="#" title="|Almacén de metal&lt;br&gt;La cola está llena" ref="22" id="details">
	                        <span class="ecke">
	                            <span class="level">
	                               <span class="textlabel">
	                                   Almacén de metal	                               </span>
	                               7	                           </span>
	                        </span>
	                    <span id="buidingETA" ref="22" class="time" style="margin: -10px 1px 0px 0px; padding: 0px; font-weight: 200; opacity: 0.75;"></span></a>
        	                </div>
	            </div>
                </li>
                    <li id="button8" class="disabled">
    	            <div class="supply23">
	                <div class="buildingimg">
	                    <a class="tips slideIn" href="#" title="|Almacén de cristal&lt;br&gt;La cola está llena" ref="23" id="details">
	                        <span class="ecke">
	                            <span class="level">
	                               <span class="textlabel">
	                                   Almacén de cristal	                               </span>
	                               7	                           </span>
	                        </span>
	                    <span id="buidingETA" ref="23" class="time" style="margin: -10px 1px 0px 0px; padding: 0px; font-weight: 200; opacity: 0.75;"></span></a>
        	                </div>
	            </div>
                </li>
                    <li id="button9" class="disabled">
    	            <div class="supply24">
	                <div class="buildingimg">
	                    <a class="tips slideIn" href="#" title="|Contenedor de deuterio&lt;br&gt;La cola está llena" ref="24" id="details">
	                        <span class="ecke">
	                            <span class="level">
	                               <span class="textlabel">
	                                   Contenedor de deuterio	                               </span>
	                               6	                           </span>
	                        </span>
	                    <span id="buidingETA" ref="24" class="time" style="margin: -10px 1px 0px 0px; padding: 0px; font-weight: 200; opacity: 0.75;"></span></a>
        	                </div>
	            </div>
                </li>
           </ul>
    </div>

<div class="content-box-s">
	<div class="header">
    	<h3>Edificios</h3>
    </div>
		<div class="content">
			<table class="construction" cellpadding="0" cellspacing="0">
										<tbody><tr>
					<th colspan="2">Planta de energía solar</th>
                </tr>
				<tr class="data">
					<td class="building" rowspan="3" bla="blubb">
                        <a href="#" class="tips" onclick="cancelProduction(4,1,'¿Cancelar la mejora de Planta de energía solar al Nivel 24?'); return false;" title="|¿Cancelar la mejora de Planta de energía solar al Nivel 24?">
                            <img class="queuePic" src="img/small/small_4.jpg" alt="Planta de energía solar">
                        </a>
                        <a href="#" class="tips abortNow" onclick="cancelProduction(4,1,'¿Cancelar la mejora de Planta de energía solar al Nivel 24?'); return false;" title="|¿Cancelar la mejora de Planta de energía solar al Nivel 24?">
                            <img src="img/layout/pixel.gif" height="15" width="15">
                        </a>
                    </td>
					<td class="desc ausbau">Subiendo al 
						<span class="level">Nivel 24</span>
                    </td>
				</tr>
				<tr class="data">
					<td class="desc">Duración:</td>
                </tr>
                <tr class="data">
                	<td class="desc timer">
                	   <span id="Countdown">23h 40m 56s</span>
					</td>
				</tr>
					 
					
  
			</tbody></table>
		</div>
	<div class="footer"></div>
</div>

	  
<div class="content-box-s">
    <div class="header"><h3>Producción actual:</h3></div>
        <div class="content">    
                <table class="construction" cellpadding="0" cellspacing="0">
                <tbody>
                            <tr class="data">
	                <th colspan="2">Láser pequeño</th>
                </tr>
                <tr class="data">
	                <td title="|Producción de 18 Láser pequeño en progreso" class="building tips" rowspan="2" valign="top">
	                <a href="%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20index.php?page=defense&amp;session=e89c185b3c6a&amp;openTech=402%20%20%20%20%20%20%20%20%20%20%20%20" onclick="            ">
	                <img alt="Láser pequeño" src="img/small/402_40x40.jpg" height="40" width="40">
	                </a>
	                <br>
	                <div id="shipSumCount" class="textCenter">18</div>
	                </td>
	                <td class="desc timeProdShip">
	                Tiempo de producción <span id="shipCountdown">29s</span>
	                </td>
                </tr>
                <tr class="data">
	                <td class="desc timeProdAll">
	                Tiempo total: <br><span id="shipAllCountdown">16h 53m</span>
	                </td>
                </tr>
                <tr class="queue">
                    <td colspan="2">
                        <table>
                            <tbody><tr>
                                    
                            
                                <td class="tips" title="|6 Cañón Gauss Construir">
                                    <a href="%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20index.php?page=defense&amp;session=e89c185b3c6a&amp;openTech=404%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20">
                                        <img src="img/tiny/tiny_404.jpg" alt="Cañón Gauss" height="28" width="28">
                                    </a>
                                    <br>
                                    6                                </td>
                                    
                            
                                <td class="tips" title="|14 Láser pequeño Construir">
                                    <a href="%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20index.php?page=defense&amp;session=e89c185b3c6a&amp;openTech=402%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20">
                                        <img src="img/tiny/tiny_402.jpg" alt="Láser pequeño" height="28" width="28">
                                    </a>
                                    <br>
                                    14                                </td>
                                    
                            
                                <td class="tips" title="|9 Nave grande de carga Construir">
                                    <a href="%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20index.php?page=shipyard&amp;session=e89c185b3c6a&amp;openTech=203%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20">
                                        <img src="img/tiny/tiny_203.jpg" alt="Nave grande de carga" height="28" width="28">
                                    </a>
                                    <br>
                                    9                                </td>
                                    
                                </tr>
                        </tbody></table>
                    </td>
                </tr>
                </tbody>
                </table>
        </div>
    <div class="footer"></div>
</div>
	</div><!-- END CONTENT AREA -->

<!-- RIGHTMENU -->
<div id="rechts">
        
<div id="norm">
<div id="myWorlds">

<div id="countColonies">    
    <p class="textCenter tips" title="|Número de posibles planetas">
        <span>5/5</span> Planetas    </p>    
</div>

	    <div class="smallplanet">
             <a href="#" class="planetlink active tips reloadTips" title="|&lt;B&gt; [2:201:10]&lt;/B&gt;&lt;BR&gt;12.800km (126/163)&lt;BR&gt;de -21 °C  a 19 °C">
     			<img class="planetPic" src="img/planets/ice_2_3.gif">
        	<span class="planet-name">Counter-Strike</span>
        	<span class="planet-koords">[2:201:10]</span>
         </a>
    		        <a class="constructionIcon tips reloadTips" title="|Planta de energía solar"><img src="img/icons/wrench.gif" height="12" width="12"></a>
        </div>
	    <div class="smallplanet">
             <a href="index.php?page=resources&amp;session=e89c185b3c6a&amp;cp=33690915" title="|&lt;B&gt; [2:179:6]&lt;/B&gt;&lt;BR&gt;14.282km (114/163)&lt;BR&gt;de 18 °C  a 58 °C" class="planetlink  tips reloadTips">
     			<img class="planetPic" src="img/planets/jungle_6_3.gif">
        	<span class="planet-name">Counter-Strike ...</span>
        	<span class="planet-koords">[2:179:6]</span>
         </a>
    		    </div>
	    <div class="smallplanet">
             <a href="index.php?page=resources&amp;session=e89c185b3c6a&amp;cp=33698553" title="|&lt;B&gt; [4:405:4]&lt;/B&gt;&lt;BR&gt;12.754km (109/163)&lt;BR&gt;de 61 °C  a 101 °C" class="planetlink  tips reloadTips">
     			<img class="planetPic" src="img/planets/normal_10_3.gif">
        	<span class="planet-name">Planeta Principal</span>
        	<span class="planet-koords">[4:405:4]</span>
         </a>
    		    </div>
	    <div class="smallplanet">
             <a href="index.php?page=resources&amp;session=e89c185b3c6a&amp;cp=33721371" title="|&lt;B&gt; [2:246:4]&lt;/B&gt;&lt;BR&gt;13.984km (105/163)&lt;BR&gt;de 61 °C  a 101 °C" class="planetlink  tips reloadTips">
     			<img class="planetPic" src="img/planets/dry_1_3.gif">
        	<span class="planet-name">Planeta Principal</span>
        	<span class="planet-koords">[2:246:4]</span>
         </a>
    		    </div>
	    <div class="smallplanet">
             <a href="index.php?page=resources&amp;session=e89c185b3c6a&amp;cp=33761523" title="|&lt;B&gt; [2:208:5]&lt;/B&gt;&lt;BR&gt;13.225km (81/163)&lt;BR&gt;de 43 °C  a 83 °C" class="planetlink  tips reloadTips">
     			<img class="planetPic" src="img/planets/dry_4_3.gif">
        	<span class="planet-name">Planeta Principal</span>
        	<span class="planet-koords">[2:208:5]</span>
         </a>
    		        <a class="constructionIcon tips reloadTips" title="|Fábrica de Robots"><img src="img/icons/wrench.gif" height="12" width="12"></a>
        </div>
</div>
</div></div>
<!-- END RIGHTMENU -->

        <br class="clearfloat">

<!-- JAVASCRIPT -->

<script type="text/javascript" src="http://uni104.ogame.com.es/game/js/jquery.js"></script>
<script type="text/javascript" src="http://uni104.ogame.com.es/game/js/jquery.dimensions.js"></script>
<script type="text/javascript" src="http://uni104.ogame.com.es/game/js/jquery.hoverIntent.js"></script>
<script type="text/javascript" src="http://uni104.ogame.com.es/game/js/jquery.cluetip.js"></script>
<script type="text/javascript" src="http://uni104.ogame.com.es/game/js/jquery.configcluetip.js"></script>
<script type="text/javascript" src="http://uni104.ogame.com.es/game/js/jquery-ui.packed.js"></script>
<script type="text/javascript" src="http://uni104.ogame.com.es/game/js/jquery.dump.js"></script>
<script type="text/javascript" src="http://uni104.ogame.com.es/game/js/thickbox.js"></script>
<script type="text/javascript" src="http://uni104.ogame.com.es/game/js/tools.js"></script>
<script type="text/javascript" src="http://uni104.ogame.com.es/game/js/slider.js"></script>
<script type="text/javascript" src="http://uni104.ogame.com.es/game/js/helpers.js"></script>
<script type="text/javascript" src="http://uni104.ogame.com.es/game/js/tooltip.js"></script>
<script type="text/javascript" src="http://uni104.ogame.com.es/game/js/countdown.js"></script>
<script type="text/javascript" src="http://uni104.ogame.com.es/game/js/resourceTicker.js"></script>
<script type="text/javascript" src="http://uni104.ogame.com.es/game/js/utilities.js"></script>
<script type="text/javascript" src="http://uni104.ogame.com.es/game/js/errorBox.js"></script>
<script type="text/javascript" src="http://uni104.ogame.com.es/game/js/messageSlider.js"></script>
<script type="text/javascript" src="http://uni104.ogame.com.es/game/js/ajaxreload.js"></script>
<script type="text/javascript" src="http://uni104.ogame.com.es/game/js/cookies.js"></script>
<script type="text/javascript" src="http://uni104.ogame.com.es/game/js/jquery.cookie.min.js"></script>
<script type="text/javascript" src="http://uni104.ogame.com.es/game/js/timetick.js"></script>
<script type="text/javascript">
var TB_open = 0;
var session = 'e89c185b3c6a';
var vacation = 0;

function initHovers() {
      $('#planet .slot').hover(function() {
        $(this).addClass('slot-hover');
      }, function() {
        $(this).removeClass('slot-hover');
      });

      $('.construction img.queuePic').hover(function() {
        $(this).addClass('queuePic-hover');
      }, function() {
        $(this).removeClass('queuePic-hover');
      });

      $('#officers img').hover(function() {
        $(this).addClass('queuePic-hover');
      }, function() {
        $(this).removeClass('queuePic-hover');
      });

      $('#eventboxFilled').hover(function() {
        $(this).addClass('eventboxHover');
      }, function() {
        $(this).removeClass('qeventboxHover');
      });
}

var TimezoneOffset = 1  // adjust for server time zone
var localTime = new Date();
if (navigator.appName == "Microsoft Internet Explorer"){
	localTS = localTime.getTime();
} else {
	var localTS = localTime.getTime();
    //- (localTime.getTimezoneOffset() * 60000)
    //- TimezoneOffset * 3600000;
}

var serverTime = new Date(1263154935000);


LocalizationStrings = new Array();
LocalizationStrings.timeunits = new Array();
LocalizationStrings.timeunits.short = new Array();
LocalizationStrings.timeunits['short'].day = 'd';
LocalizationStrings.timeunits['short'].hour = 'h';
LocalizationStrings.timeunits['short'].minute = 'm';
LocalizationStrings.timeunits['short'].second = 's';
LocalizationStrings.status = new Array();
LocalizationStrings.status.ready = 'listo';

LocalizationStrings['decimalPoint'] = ",";
LocalizationStrings['thousandSeperator'] = ".";
LocalizationStrings['unitMega'] = 'M';
LocalizationStrings['unitKilo'] = 'K';
LocalizationStrings['unitMilliard'] = 'Bn';

OGConfig = new Array();
OGConfig.sliderOn = 1;

function initTooltips() {
    var allChildNodes = getChildNodesWithClassName(document.getElementsByTagName('body')[0], 'tooltip_plain');
    for(i in allChildNodes) {
        if(typeof(allChildNodes[i])!='object')continue;
        var eventNode = allChildNodes[i];
        var temp = new tooltip(eventNode);
    }

    var allChildNodes = getChildNodesWithClassName(document.getElementsByTagName('body')[0], 'tooltip_sticky');
    for(i in allChildNodes) {
        if(typeof(allChildNodes[i])!='object')continue;
        var eventNode = allChildNodes[i];
        var temp = new tooltip(eventNode);
    }
}

function initAjaxEventbox()
{
	$.get(
		"index.php?page=fetchEventbox&session=e89c185b3c6a&ajax=1",
		reloadEventbox,
		"text"
	);
}

function initAjaxResourcebox()
{
	$.get(
		"index.php?page=fetchResources&session=e89c185b3c6a&ajax=1",
		reloadResources,
		"text"
	);
}

 
 
/* var mySlider = new MessageSlider(document.getElementById('messagebox'));

addListener(window, 'load', function() {
    if (document.getElementById('messages_container')) {
    	var inhalt = document.getElementById('messages_container');
    	var windowHeight = document.documentElement.clientHeight;
    	var contentHeight = inhalt.offsetHeight;
    	inhalt.style.height = Math.min( (windowHeight-160), (contentHeight) ) +'px';
    }
});
*/

var resourceTickerMetal = {
    available: 413953.951983,
    limit: [0, 865000],
    production: 1.72166666667,
    valueElem: "resources_metal"
};
var resourceTickerCrystal = {
    available: 70633.7525775,
    limit: [0, 865000],
    production: 0.648333333333,
    valueElem: "resources_crystal"
};
var resourceTickerDeuterium = {
    available: 96636.0144755,
    limit: [0, 470000],
    production: 0.1425,
    valueElem: "resources_deuterium"
};

vacation = 0;
if (!vacation) {
	new resourceTicker(resourceTickerMetal);
	new resourceTicker(resourceTickerCrystal);
	new resourceTicker(resourceTickerDeuterium);
}            
 
function UhrzeitAnzeigen()
{
    var Sekunden = serverTime.getSeconds();
    serverTime.setSeconds(Sekunden+1);
    
    
    Uhrzeitanzeige = getFormatedDate(serverTime.getTime(), '[d].[m].[Y] <span>[H]:[i]:[s]</span>');
 
    if(document.getElementById)
    {
        document.getElementById("OGameClock").innerHTML = Uhrzeitanzeige
    }
    else if(document.all)
    {
        Uhrzeit.innerHTML = Uhrzeitanzeige;
    }
 
}
setInterval("UhrzeitAnzeigen()", 1000);

 
 
function initMouseOverImageSwitch() 
{
    $('img.mouseSwitch').bind(
        'mouseenter', 
        function(){
            var tempSrc = $(this).attr('src');
            $(this).attr('src', $(this).attr('rel'));
            $(this).attr('rel', tempSrc);
        }
    ).bind(
        'mouseleave', 
        function(){
            var tempSrc = $(this).attr('src');
            $(this).attr('src', $(this).attr('rel'));
            $(this).attr('rel', tempSrc);
        }
    );     
}

 
 
function initResources() {
	var load_done=1;
	gfSlider = new GFSlider(getElementByIdWithCache('planet'));

    }

var action=0;
var id;

var demolish_id;

function loadDetails(type)
{
    $.post(
        "index.php?page=resources&session=e89c185b3c6a&ajax=1",
        { type: type},
        function(data){
            $("#detail").html(data);
            $("#techDetailLoading").hide();
            $("input[type='text']:first", document.forms["form"]).focus();
            
            reloadCluetip();
        }
    );
}

function sendForm()
{
    document.form.submit();
    return false;
}

function demolishBuilding(id,question) {
    demolish_id = id;
    errorBoxDecision("Atención",""+question+"","Sí","No",demolishStart);
}

function demolishStart()
{
    window.location.replace("index.php?page=resources&session=e89c185b3c6a&modus=3&type="+demolish_id);
    closeErrorBox();
}

function cancelProductionStart()
{
    window.location.replace("index.php?page=resources&session=e89c185b3c6a&modus=2&listid="+cancel_id);
    closeErrorBox();
}
function productionRefreshed()
{
	initAjaxResourcebox();
	tb_open_new('index.php?page=resourcelayer&session=e89c185b3c6a&height=380&width=680');
}

$(document).ready(function(){
      $('#ranks tr').hover(function() {
        $(this).addClass('hover');
      }, function() {
        $(this).removeClass('hover');
      });
});


 
 
new bauCountdown(
    getElementByIdWithCache('b_supply4'),
    85258,
    169687, 
    'index.php?page=resources&session=e89c185b3c6a'
);

 
 
var cancelProduction_id;
var production_listid;
    
function cancelProduction(id,listid,question)
{
    cancelProduction_id = id;
    production_listid = listid;
    errorBoxDecision("Atención",""+question+"","Sí","No",cancelProductionStart);
}

function cancelProductionStart()
{
    window.location.replace("index.php?page=resources&session=e89c185b3c6a&modus=2&techid="+cancelProduction_id+"&listid="+production_listid);
    closeErrorBox();
}

 
 
new baulisteCountdown(getElementByIdWithCache("Countdown"), 85258, "index.php?page=resources&session=e89c185b3c6a");

	 
 	
	    new shipCountdown(
	        getElementByIdWithCache('shipAllCountdown'),
	        getElementByIdWithCache('shipCountdown'),
	        getElementByIdWithCache('shipSumCount'),
	        320,
	        31,
	        60834,
	        18,
	        'index.php?page=resources&session=e89c185b3c6a');
	        
	
	 
 


$(document).ready(function() {
                            initHovers();
initTooltips();
initMouseOverImageSwitch();
initResources();

initCluetip();
initAjaxEventbox();
});

 
 </script><!-- END JAVASCRIPT -->

			<div class="push"></div>
       </div><!-- box -->
   </div><!-- boxBG -->
</div><!-- contentBoxBody -->
        <div id="siteFooter">
            <div class="content">
                <div class="fleft textLeft">
                    <a href="index.php?page=changelog&amp;session=e89c185b3c6a" class="tips" title="|Notas de versión">
                                                    1.1                                            </a>
                    <a class="homeLink" href="http://www.gameforge.de" target="_blank">
                        © 2003 - 2010 Gameforge Productions GmbH                    </a>
                </div>
                <div class="fright textRight">
                    <a href="http://tutorial.ogame.de/?lang=es" target="_blank">Ayuda</a>|
                    <a href="http://board.ogame.com.es/" target="_blank">Foro</a>|
                    <a href="http://ogame.com.es/?ajax=true&amp;page=rules" target="_blank">Reglas</a>|
                    <a href="http://impressum.gameforge.de/index.php?lang=es&amp;art=impress&amp;special=&amp;&amp;f_text=b1daf2&amp;f_text_hover=ffffff&amp;f_text_h=061229&amp;f_text_hr=061229&amp;f_text_hrbg=061229&amp;f_text_hrborder=9EBDE4&amp;f_text_font=arial%2C+arial%2C+arial%2C+sans-serif&amp;f_bg=000000" target="_blank">Aviso legal</a>
                </div>
                <br class="clearfloat">
            </div><!-- -->
       </div>
    <div style="position: absolute; display: none;" id="cluetip-waitimage"></div><div style="display: none; position: absolute;" id="cluetip"><div style="z-index: 9996; opacity: 0.1; top: 1px; left: 1px; position: absolute; background-color: rgb(0, 0, 0);"></div><div style="z-index: 9996; opacity: 0.1; top: 2px; left: 2px; position: absolute; background-color: rgb(0, 0, 0);"></div><div style="z-index: 9996; opacity: 0.1; top: 3px; left: 3px; position: absolute; background-color: rgb(0, 0, 0);"></div><div style="z-index: 9996; opacity: 0.1; top: 4px; left: 4px; position: absolute; background-color: rgb(0, 0, 0);"></div><div style="z-index: 9996; opacity: 0.1; top: 5px; left: 5px; position: absolute; background-color: rgb(0, 0, 0);"></div><div style="z-index: 9996; opacity: 0.1; top: 6px; left: 6px; position: absolute; background-color: rgb(0, 0, 0);"></div><div style="position: relative; z-index: 9997;" id="cluetip-outer"><h3 id="cluetip-title"></h3><div id="cluetip-inner"></div></div><div id="cluetip-extra"></div><div id="cluetip-arrows" class="cluetip-arrows"></div></div>