// ==UserScript==
// @name __kauboj__ikariam
// @namespace akage_no_fan
// @description http://ress.jp/*
// @include http://mixi.jp/*
// ==/UserScript==


// åå‰ç©ºé–“
(function(){
//
// ã‚¯ãƒ©ã‚¹å®šç¾©
//


//--------------------------------------------------

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="de" />
        <meta name="author" content="Gameforge AG" />
        <meta name="publisher" content="Gameforge AG" />
        <meta name="copyright" content="Gameforge AG" />
        <meta name="page-type" content="Browsergame, Browser game" />
        <meta name="page-topic" content="Browser igra, strateška igra, online igra" />
        <meta name="audience" content="all" />
        <meta name="Expires" content="never" />
        <meta name="Keywords" content="Ikariam, antički svijet, strateška igra, igraj besplatno, online igra, role play igra, browser igra, igra, antique world, strategy game, play for free, online game, role play game, browser game, game"/>
        <meta name="Description" content="Ikariam je besplatna browser igra. Imate zadaću voditi naciju kroz antički svijet, gradeći zgrade, trgujući i osvajajući otoke." />
        <meta name="robots" content="index,follow" />
        <meta name="Revisit" content="After 14 days" />
        <title>Ikariam - Svijet Beta </title>
		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
        <link href="/skin/ik_common_0.3.0.css" rel="stylesheet" type="text/css" media="screen" />
        <link href="/skin/ik_city_0.3.0.css" rel="stylesheet" type="text/css" media="screen" />


		<script type="text/javascript" src="/js/complete-0.3.0.js"></script>
				<script type="text/javascript">
		/* <![CDATA[ */
		var Event = YAHOO.util.Event,
		Dom   = YAHOO.util.Dom,
		lang  = YAHOO.lang;

		var LocalizationStrings = {};
		LocalizationStrings['timeunits'] = {};
		LocalizationStrings['timeunits']['short'] = {};
		LocalizationStrings['timeunits']['short']['day'] = 'D';
		LocalizationStrings['timeunits']['short']['hour'] = 'h';
		LocalizationStrings['timeunits']['short']['minute'] = 'm';
		LocalizationStrings['timeunits']['short']['second'] = 's';
		LocalizationStrings['language']                     = 'yu';
		LocalizationStrings['decimalPoint']               = '.';
		LocalizationStrings['thousandSeperator']     = ',';
		
		LocalizationStrings['resources'] = {};
		LocalizationStrings['resources']['wood'] = 'Drvo';
		LocalizationStrings['resources']['wine'] = 'Vino';
		LocalizationStrings['resources']['marble'] = 'Mramor';
		LocalizationStrings['resources']['crystal'] = 'Kristal';
		LocalizationStrings['resources']['sulfur'] = 'Sumpor';
		LocalizationStrings['resources'][0] = LocalizationStrings['resources']['wood'];
		LocalizationStrings['resources'][1] = LocalizationStrings['resources']['wine'];
		LocalizationStrings['resources'][2] = LocalizationStrings['resources']['marble'];
		LocalizationStrings['resources'][3] = LocalizationStrings['resources']['crystal'];
		LocalizationStrings['resources'][4] = LocalizationStrings['resources']['sulfur'];
		
		LocalizationStrings['warnings'] = {};
		LocalizationStrings['warnings']['premiumTrader_lackingStorage'] = "Für folgende Rohstoffe fehlt dir Speicherplatz: $res";
		LocalizationStrings['warnings']['premiumTrader_negativeResource'] = "Du hast zuwenig $res für diesen Handel";
		
		IKARIAM = {
				phpSet : {
						serverTime : "1235654089",
						currentView : "city"						},
				currentCity : {
						resources : {
								wood: 120116,
								wine: 105374,
								marble: 120745,
								crystal: 120834,
								sulfur: 12056						},
						maxCapacity : {
 								wood: 123000,
								wine: 121500,
								marble: 121500,
								crystal: 121500,
								sulfur: 121500						}
				},
				view : {
						get : function() {
								return IKARIAM.phpSet.currentView;
								},
						is : function(viewName) {
								return (IKARIAM.phpSet.currentView == viewName)? true : false;
								}
						}
				};
				IKARIAM.time = {
						serverTimeDiff : IKARIAM.phpSet.serverTime*1000-(new Date()).getTime()
				};
		
		
		
		/**
		* switches one item on and the other off.. but only if they share the same groupname.
		*/
		selectGroup = {
			groups:new Array(), //[groupname]=item
			getGroup:function(group) {
				if(typeof(this.groups[group]) == "undefined") {
					this.groups[group] = new Object();
					this.groups[group].activeItem = "undefined";
					this.groups[group].onActivate = function(obj) {};
					this.groups[group].onDeactivate = function(obj) {};
					}
				return this.groups[group];
			},
			activate:function(obj, group) {
				g = this.getGroup(group);
				if(typeof(g.activeItem) != "undefined") {
					g.onDeactivate(g.activeItem);
					}
				g.activeItem=obj;
				g.onActivate(obj);
			}
		};
		selectGroup.getGroup('cities').onActivate = function(obj) {
			YAHOO.util.Dom.addClass(obj.parentNode, "selected");
		}
		selectGroup.getGroup('cities').onDeactivate = function(obj) {
			YAHOO.util.Dom.removeClass(obj.parentNode, "selected");
		}

		/**
		 * - will COPY all child nodes of the source-node that are marked with a CSS class to be child nodes of the target.
		 * - will purge all children of the TARGET element that are marked the same special CSS class at each call, so previously copied will be deleted before copying new
		 * - expects either an Id or an object.
		 */
		function showInContainer(source, target, exchangeClass) {
			//objects or Id-strings, i don't care
			if(typeof source == "string") { source = Dom.get(source); }
			if(typeof target == "string") {target = Dom.get(target); }
			if(typeof exchangeClass != "string") { alert("Error: IKARIAM.showInContainer -> Forgot to add an exchangeClass?"); }
			//removal
			for(i=0; i<target.childNodes.length; i++) {
				if(typeof(target.childNodes[i].className) != "undefined" && target.childNodes[i].className==exchangeClass) {
					target.removeChild(target.childNodes[i]);
				}
			}
			//clone new
			for(i=0; i<source.childNodes.length; i++) {
				if(typeof(source.childNodes[i].className) != "undefined" && source.childNodes[i].className==exchangeClass) {
					clone = source.childNodes[i].cloneNode(true);
					target.insertBefore(clone, target.firstChild.nextSibling);
				}
			}
		}

		selectedCity = -1;
		function selectCity(cityNum, cityId, viewAble) {
		    if(selectedCity == cityNum) {
		        if(viewAble) document.location.href="?view=city&id="+cityId;
		        else document.location.href="#";
		    } else {
		        selectedCity = cityNum;
		    }
			showInContainer("cityLocation"+cityNum,"information", "cityinfo");
			showInContainer("cityLocation"+cityNum,"actions", "cityactions");
			var container = document.getElementById("cities");
			var citySelectedClass = "selected";
		}

		//IE6 CSS Background-Flicker fix
		(function(){
			/*Use Object Detection to detect IE6*/
			var  m = document.uniqueID /*IE*/
			&& document.compatMode  /*>=IE6*/
			&& !window.XMLHttpRequest /*<=IE6*/
			&& document.execCommand ;
			try{
				if(!!m){
					m("BackgroundImageCache", false, true) /* = IE6 only */
				}
			}catch(oh){};
		})();
		/* ]]> */

		function myConfirm(message, target) {
		    bestaetigt = window.confirm (message);
		    if (bestaetigt == true)
              window.location.href = target;
		}
		</script>
	</head>
	<body id="city">
		<div id="container">
			<div id="container2">
							<div id="header">
					<h1>Ikariam</h1>
					<h2>Živi u antičkom svijetu!</h2>
				</div>
<div id="breadcrumbs"><h3>Vi ste ovdje:</h3><a href="?view=worldmap_iso&amp;islandX=74&amp;islandY=61" title="Nazad na kartu svijeta"><img src="skin/layout/icon-world.gif" alt="Svijet" /></a><span>&nbsp;&gt;&nbsp;</span><a href="?view=island&amp;id=1089" class="island" title="Nazad na otok">Lihios[74:61]</a><span>&nbsp;&gt;&nbsp;</span><span class="city">Krca city__۞۞</span></div><!-- -------------------------------------------------------------------------------------
     ////////////////////////////////////////////////////////////////////////////////////
     ///////////////////////////// dynamic side-boxes. //////////////////////////////////
     //////////////////////////////////////////////////////////////////////////////////// -->
    <div id="information" class="dynamic">
        <h3 class="header">инфо</h3>
        <div class="content">
            <ul class="cityinfo">
                <li class="name"><span class="textLabel">Ime: </span>Krca city__۞۞</li>
                <li class="citylevel"><span class="textLabel">Grad: </span>20</li>
                <li class="owner">
                    <span class="textLabel">Igrač: </span>__kauboj__                </li>
                <li class="ally">
                    <span class="textLabel">Savez: </span>
                    <a href="?view=allyPage&allyId=1385&oldView=island&id=1089">SBP</a>
                </li>
            </ul>
        </div><!-- end content -->
        <div class="footer"></div>
    </div>
    <div class="dynamic" id="reportInboxLeft">
        <h3 class="header">Inspekcija vojske</h3>
            <div class="content">
                <img width="203" height="85" src="skin/layout/militaer_inspizieren.jpg"/>
                <p>Pregledaj trupe koje se nalaze u gradu</p>
                <div class="centerButton">
                <a href="?view=cityMilitary-army&id=35511" class="button">Trupe u gradu</a>
            </div>
    		</div>
        <div class="footer"></div>
    </div>


<!---------------------------------------------------------------------------------------
     ////////////////////////////////////////////////////////////////////////////////////
     ///////////////// the main view. take care that it stretches. //////////////////////
     //////////////////////////////////////////////////////////////////////////////////// -->
    <div id="mainview" class="phase20">
        <ul id="locations">

              <li id="position0" class="townHall">
                    <div class="buildingimg"></div>
                    <a href="?view=townHall&amp;id=35511&amp;position=0" title="Gradska Vijećnica Level 20"><span class="textLabel">Gradska Vijećnica Level 20</span></a>
               </li>
                  <li id="position1" class="port">
                    <div class="buildingimg"></div>
                    <a href="?view=port&amp;id=35511&amp;position=1" title="Trgovačka luka Level 14"><span class="textLabel">Trgovačka luka Level 14</span></a>
               </li>
                  <li id="position2" class="shipyard">
                    <div class="buildingimg"></div>
                    <a href="?view=shipyard&amp;id=35511&amp;position=2" title="Brodogradilište Level 8"><span class="textLabel">Brodogradilište Level 8</span></a>
               </li>
                  <li id="position3" class="tavern">
                    <div class="buildingimg"></div>
                    <a href="?view=tavern&amp;id=35511&amp;position=3" title="Taverna Level 12"><span class="textLabel">Taverna Level 12</span></a>
               </li>
                  <li id="position4" class="workshop">
                    <div class="buildingimg"></div>
                    <a href="?view=workshop&amp;id=35511&amp;position=4" title="Radionica Level 7"><span class="textLabel">Radionica Level 7</span></a>
               </li>
                  <li id="position5" class="branchOffice">
                    <div class="buildingimg"></div>
                    <a href="?view=branchOffice&amp;id=35511&amp;position=5" title="Market Level 16"><span class="textLabel">Market Level 16</span></a>
               </li>
                  <li id="position6" class="museum">
                    <div class="buildingimg"></div>
                    <a href="?view=museum&amp;id=35511&amp;position=6" title="Muzej Level 6"><span class="textLabel">Muzej Level 6</span></a>
               </li>
                  <li id="position7" class="warehouse">
                    <div class="buildingimg"></div>
                    <a href="?view=warehouse&amp;id=35511&amp;position=7" title="Skladište Level 15"><span class="textLabel">Skladište Level 15</span></a>
               </li>
                  <li id="position8" class="barracks">
                    <div class="buildingimg"></div>
                    <a href="?view=barracks&amp;id=35511&amp;position=8" title="Barake Level 18"><span class="textLabel">Barake Level 18</span></a>
               </li>
                  <li id="position9" class="academy">
                    <div class="buildingimg"></div>
                    <a href="?view=academy&amp;id=35511&amp;position=9" title="Akademija Level 11"><span class="textLabel">Akademija Level 11</span></a>
               </li>
                  <li id="position10" class="palace">
                    <div class="buildingimg"></div>
                    <a href="?view=palace&amp;id=35511&amp;position=10" title="Palača Level 4"><span class="textLabel">Palača Level 4</span></a>
               </li>
                  <li id="position11" class="safehouse">
                    <div class="buildingimg"></div>
                    <a href="?view=safehouse&amp;id=35511&amp;position=11" title="Sklonište Level 17"><span class="textLabel">Sklonište Level 17</span></a>
               </li>
                  <li id="position12" class="embassy">
                    <div class="buildingimg"></div>
                    <a href="?view=embassy&amp;id=35511&amp;position=12" title="Veleposlanstvo Level 8"><span class="textLabel">Veleposlanstvo Level 8</span></a>
               </li>
                  <li id="position13" class="vineyard">
                    <div class="buildingimg"></div>
                    <a href="?view=vineyard&amp;id=35511&amp;position=13" title="Vinska preša Level 16"><span class="textLabel">Vinska preša Level 16</span></a>
               </li>
                  <li id="position14" class="wall">
                    <div class="buildingimg"></div>
                    <a href="?view=wall&amp;id=35511&amp;position=14" title="Gradski bedem Level 21"><span class="textLabel">Gradski bedem Level 21</span></a>
               </li>
    




	        


		            <li class="garnison"></li>
	        

        </ul>

 
<!--[if lt IE 7]>
<style type="text/css">
#city #container #mainview #locations .garnison,
#city #container #mainview #locations .garnisonGate1,
#city #container #mainview #locations .garnisonGate2,
#city #container #mainview #locations .garnisonCenter,
#city #container #mainview #locations .garnisonOutpost
{
    background-image:url(skin/img/city/garnison.gif);

}
</style>
<![endif]-->

    </div><!-- END mainview -->
<!-- Navigational elements for changing the city or the view. May perform different actions on every screen. -->
				<div id="cityNav">
					<form id="changeCityForm" action="index.php" method="POST">
						<fieldset style="display:none;">
							<input type="hidden" name="action" value="header" />
							<input type="hidden" name="function" value="changeCurrentCity" />
							<input type="hidden" name="actionRequest" value="c9783dd89e692ed453f54d992f135a0c" />
							<input type="hidden" name="oldView" value="city" />
													</fieldset>

<!-- Navigation -->
						<h3>Gradska navigacija</h3>
						<ul>
							<li>
								<label for="citySelect">Trenutni grad:</label>
								<select id="citySelect" class="citySelect smallFont" name="cityId" tabindex="1" onchange="this.form.submit()">
<option class="avatarCities tradegood1" value="35511" selected="selected" title="[74:61]" >Krca city__۞۞</option><option class="avatarCities tradegood2" value="36674" title="[37:74]" >۞Krca_City__2۞</option><option class="avatarCities tradegood3" value="38664" title="[38:74]" >۞Krca_city__3۞</option><option class="avatarCities tradegood1" value="54350" title="[37:73]" >۞Krca_city__4۞</option><option class="avatarCities tradegood2" value="78714" title="[36:72]" >۞Krca_City__5۞</option>								</select>
								</li>
								<li class="previousCity"><a href="#changeCityPrevious" tabindex="2" title="Prebaci se na zadnji grad"><span class="textLabel">Prethodni grad</span></a></li>
								<li class="nextCity"><a href="#changeCityNext" tabindex="3" title="Prebaci se na sljedeći grad"><span class="textLabel">Sljedeći grad</span></a></li>
								<li class="viewWorldmap"><a href="?view=worldmap_iso" tabindex="4" title="Prikaži odabrani grad na karti svijeta"><span class="textLabel">Svijet</span></a></li>
								<li class="viewIsland"><a href="?view=island&amp;id=1089" tabindex="5" title="Prebaci na kartu otoka odabranog grada"><span class="textLabel">Otok</span></a></li>
								<li class="viewCity"><a href="?view=city&amp;id=35511" tabindex="6" title="Pogledaj odabrani grad"><span class="textLabel">Grad</span></a></li>
							</ul>
						</form>
					</div>
	
<!-- TODO Goldbalance... -->
				<div id="globalResources">
					<h3>Resursi u vašem carstvu</h3>
					<ul>
						<li class="transporters" title="Trgovački brodovi - Dostupno/(Ukupno)"><a href="?view=merchantNavy"><span class="textLabel">Trgovački brodovi: </span><span id="value_transAvail" class="transAvail">82</span><span id="value_transSum" class="transSum">(82)</span></a></li>
						<li class="gold" title="102,352 Zlato"><a href="?view=finances"><span class="textLabel">Zlato: </span><span id="value_gold">102,352</span></a></li>
						<li class="goldBalance negative"><span class="textLabel">Dohodak: </span>234</li>
					</ul>
				</div>
	
<!-- Resources of the city. Finished. Identical on every page. -->
				<div id="cityResources">
					<h3>Gradski resursi</h3>
					<ul class="resources">
						<li class="population" title="Populacija">
							<span class="textLabel">Populacija: </span>
							<span id="value_inhabitants" style="display:block;width:80px;">838 (1,311)</span>
						</li>
						<li class="actions" title="Akcijski bodovi">
							<span class="textLabel">Akcijski bodovi: </span>
							<span id="value_maxActionPoints">8</span>
						</li>
						<li class="wood">
							<span class="textLabel">Drvo: </span>
							<span id="value_wood" class="">14,116</span>
							<div class="tooltip"><span class="textLabel">Kapacitet skladišta Drvo: </span>123,000</div>
						</li>
						<li class="wine">
							<span class="textLabel">Vino: </span>
							<span id="value_wine" class="storage_danger">105,374</span>
							<div class="tooltip"><span class="textLabel">Kapacitet skladišta Vino: </span>121,500</div>
						</li>
						<li class="marble">
							<span class="textLabel">Mramor: </span>
							<span id="value_marble" class="">13,745</span>
							<div class="tooltip"><span class="textLabel">Kapacitet skladišta Mramor: </span>121,500</div>
						</li>
						<li class="glass">
							<span class="textLabel">Kristal: </span>
							<span id="value_crystal" class="">834</span>
							<div class="tooltip"><span class="textLabel">Kapacitet skladišta Kristal: </span>121,500</div>
						</li>
						<li class="sulfur">
							<span class="textLabel">Sumpor: </span>
							<span id="value_sulfur" class="">56</span>
							<div class="tooltip"><span class="textLabel">Kapacitet skladišta Sumpor: </span>121,500</div>
						</li>
					</ul>

				</div>

<!-----------------------------------------------------
  ////////////////////// ADVISORS /////////////////////
  ----------------------------------------------------->
				<div id="advisors">
					<h3>Pregledi</h3>
					<ul>
						<li id="advCities" >
							<a href="?view=tradeAdvisor&oldView=city" title="Pregled gradova i financija" class="normal">
								<span class="textLabel">Gradovi</span>
							</a>
													</li>
						<li id="advMilitary">
							<a href="?view=militaryAdvisorMilitaryMovements&oldView=city" title="Vojni pregled" class="normal">
								<span class="textLabel">Vojska</span>
							</a>
													</li>
						<li id="advResearch">
							<a href="?view=researchAdvisor&oldView=city" title="Pregled istraživanja" class="normal">
								<span class="textLabel">Istraživanje</span>
							</a>
													</li>
						<li id="advDiplomacy">
							<a href="?view=diplomacyAdvisor&oldView=city" title="Pregled poruka i diplomacije" class="normal">
								<span class="textLabel">Diplomacija</span>
							</a>
													</li>
					</ul>
				</div>
<!-- ADVISORS END -->

<!-- Page footer  -->
				<div id="footer">
					<span class="copyright">&copy; 2009 by <a title="Gameforge" id="gflink" target="_blank" href="http://www.gameforge.de">Gameforge</a><a href="/index.php?view=credits" style="margin:0px;">.</a> Sva prava pridržana</span>
					<a target="_blank" href="http://ba.ikariam.com/rules.php" title="Pravila">Pravila</a>
					<a target="_blank" href="http://agb.gameforge.de/index.php?lang=yu&art=tac&special=&&f_text=000000&f_text_hover=804000&f_text_h=9ebde4&f_text_hr=DED3B9&f_text_hrbg=DED3B9&f_text_hrborder=804000&f_text_font=verdana%2C+arial%2C+helvetica%2C+sans-serif&f_bg=DED3B9" title="T&C">T&C</a>
					<a target="_blank" href="http://agb.gameforge.de/index.php?lang=yu&art=impressum&special=&&f_text=000000&f_text_hover=804000&f_text_h=9ebde4&f_text_hr=DED3B9&f_text_hrbg=DED3B9&f_text_hrborder=804000&f_text_font=verdana%2C+arial%2C+helvetica%2C+sans-serif&f_bg=DED3B9" title="Imprint">Imprint</a>
				</div>
<!-- END page footer -->
	
<!-- Generic Divs for styling purposes. -->
				<div id="conExtraDiv1"><span></span></div>
				<div id="conExtraDiv2"><span></span></div>
				<div id="conExtraDiv3"><span></span></div>
				<div id="conExtraDiv4"><span></span></div>
				<div id="conExtraDiv5"><span></span></div>
				<div id="conExtraDiv6"><span></span></div>
<!-- END generic Divs -->

			</div>
		</div>
		
<!-- Top-toolbar with extragame options. -->
		<div id="GF_toolbar">
			<h3>Ostale opcije</h3>
			<ul>
				<li class="help"><a href="/index.php?view=informations&articleId=10000&mainId=10000" title="Pomoć"><span class="textLabel">Pomoć</span></a></li>
				<li class="premium"><a href="/index.php?view=premium" title="Ikariam PLUS"><span class="textLabel">Ikariam PLUS (0)</span></a></li>				<li class="highscore"><a href="/index.php?view=highscore&showMe=1" title="Statistike"><span class="textLabel">Statistike</span></a></li>
				<li class="options"><a href="/index.php?view=options" title="Podešavanja"><span class="textLabel">Opcije</span></a></li>
				<li class="forum"><a href="http://board.ba.ikariam.com" title="Ploča s porukama" target="_blank"><span class="textLabel">Forum</span></a></li>
				<li class="logout"><a href="/index.php?action=loginAvatar&function=logout" title="Odjava"><span class="textLabel">Odjavi se</span></a></li>
								<li class="version"><a href="?view=version" title="Version"><span class="textLabel">v.0.3.0</span></a></li>
				<li class="serverTime"><a><span class="textLabel" id="servertime">26.02.2009 14:14:49</span></a></li>
			</ul>
		</div>
<!-- END Top-toolbar -->

	


<!-- Even more generic Divs for styling purposes. -->
		<div id="extraDiv1"><span></span></div>
		<div id="extraDiv2"><span></span></div>
		<div id="extraDiv3"><span></span></div>
		<div id="extraDiv4"><span></span></div>
		<div id="extraDiv5"><span></span></div>
		<div id="extraDiv6"><span></span></div>
<!-- END even more generic Divs -->

<!-----------------------------------------------------
  /////////////// JAVASCRIPT (obviously) ////////////// 
  ----------------------------------------------------->
<script type="text/javascript">

// Adds a "down" css-class to a supplied element.
function makeButton(ele) {
    var Event = YAHOO.util.Event;
    var Dom = YAHOO.util.Dom;
    Event.addListener(ele, "mousedown", function() {
        YAHOO.util.Dom.addClass(ele, "down");
    });
    Event.addListener(ele, "mouseup", function() {
        YAHOO.util.Dom.removeClass(ele, "down");
    });
    Event.addListener(ele, "mouseout", function() {
        YAHOO.util.Dom.removeClass(ele, "down");
    });
}

//removed "childTooltip"-code. Don't duplicate code, just nest normal tooltips!
function ToolTips() {
    var tooltips = Dom.getElementsByClassName ( "tooltip" , "div" , document , function() {
        Dom.setStyle(this, "display", "none");
    })
    for(i=0;i<tooltips.length;i++) {
        Event.addListener ( tooltips[i].parentNode , "mouseover" , function() {
            Dom.getElementsByClassName ( "tooltip" , "div" , this , function() {
                Dom.setStyle(this, "display", "block");
            });
        });
        Event.addListener ( tooltips[i].parentNode , "mouseout" , function() {
            Dom.getElementsByClassName ( "tooltip" , "div" , this , function() {
                Dom.setStyle(this, "display", "none");
            });
        });
    }
}

Event.onDOMReady( function() {
    var links = document.getElementsByTagName("a");
    for(i=0; i<links.length; i++) {
        makeButton(links[i]);
    }
    ToolTips();
    replaceSelect(Dom.get("citySelect"));
});

/* One for the wood... */
var woodCounter = getResourceCounter({
	startdate: 1235654089,
	interval: 2000,
	available: 14116,
	limit: [0, 123000],
	production: 0.0694444444444,
	valueElem: "value_wood"
	});
if(woodCounter) {
	woodCounter.subscribe("update", function() {
		IKARIAM.currentCity.resources.wood = woodCounter.currentRes;
		});
	}

/* ...one for the tradegood... */
var tradegoodCounter = getResourceCounter({
	startdate: 1235654089,
	interval: 2000,
	available: 105374,
	limit: [0, 121500],
	production: 0.0427777777778,
	spendings: [{amount: 78, tickInterval: 1200}],	valueElem: "value_wine"
	});
if(tradegoodCounter) {
	tradegoodCounter.subscribe("update", function() {
		IKARIAM.currentCity.resources.wine = tradegoodCounter.currentRes;
		});
	}


var localTime = new Date();
var startServerTime = localTime.getTime() - (3600000) - localTime.getTimezoneOffset()*60*1000; // GMT+1+Sommerzeit - offset

var obj_ServerTime = 0;
Event.onDOMReady(function() {
    var ev_updateServerTime = setInterval("updateServerTime()", 500);
    obj_ServerTime = document.getElementById('servertime');
});
function updateServerTime() {
    var currTime = new Date();
    currTime.setTime((1235654089000-startServerTime)+ currTime.getTime()) ;
    str = getFormattedDate(currTime.getTime(), 'd.m.Y G:i:s');
    obj_ServerTime.innerHTML = str;
}

</script>

	</body>
</html>
