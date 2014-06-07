// ==UserScript==
// @name           	Ikariam code GO
// @namespace      	PhasmaExMachina
// @description    	Tools to be included in your Ikariam Greasemonkey scripts.
// @author			PhasmaExMachina
// @version			0.37
//
// @history			0.37 Fixed bug in handling of occuppied or deployed cities
// @history			0.37 Fixed IkaTools.reloadAllMilitary() to include occuppied or deployed cities
// @history			0.36 Fixed redirection loop on island links in town advisor page
// @history			0.35 Added IkaTools.cityIsOwn(city) method
// @history			0.35 Additional error checking for data collection
// @history			0.34 City names are now read as text instead of HTML (strips out &nbsp; etc.)
// @history			0.34 Links in Town Advisor now perform city change
// @history			0.32 Added IkaTools.reloadAllMilitary() method
// @history			0.32 IkaTools.views["cityMilitary-army"] now takes 2 parameters, root (document root) and cityId for remote unit updating
// @history			0.32 Added IkaTools.saveCity(city) method
// @history			0.31 Improved stability of moving from one city to another using IkaTools.goTo()
// @history			0.30 Fixed calculation of wine consumption when consumption is 0 
// @history			0.29 Improved integration with ScriptUpdater (http://userscripts.org/scripts/show/57756) 
// @history			0.28 Added IkaTools.addOptionsLink() method (requires http://userscripts.org/scripts/show/62718)
// @history			0.27 Fixed bad language reference to temple
// @history			0.26 Fixed income
// @history			0.25 Number of troops in town now updated on deploy units
// @history			0.22 Added type property to city objects (city.type) which is false for own cities or class name for occuppied or deployed cities
// @history			0.21 Fixed error in calculation of finances on finances page
// @history			0.20 IkaTools.getRemoteDocument() now mimics the browser's user agent
// @history			0.19 Put in a fix to help reduce data loss on page errors 
// @history			0.18 Simplified IkaTools.getView()
// @history			0.17 Fixed bug in saving current construction right after build
// @history			0.16 Added IkaTools.getText() method
// @history			0.16 Minor code improvements
// @history			0.16 Added public IkaTools.buildingTypes array that contains all building types
// @history			0.15 Fixed corruption of current city data when viewing someone else's city with a spy
// @history			0.14 Fixed addInfoBox() not working on some pages
// @history			0.13 Added some trackData config parameters (to be documented later)
// @history			0.12 Added IkaTools.formatMilliseconds() method
// @history			0.12 Added IkaTools.formatSeconds() method
// @history			0.12 Added IkaTools.getMovements() method
// @history			0.12 Added IkaTools.getMovementsUpdate() method
// @history			0.11 Fixed detection of cities of glass tradegood type
// @history			0.11 Added IkaTools.addCommas() method
// @history			0.10 Cleaned up the code a bit
// @history			0.10 Fixed bug where troop production in barracks would make the script think the barracks was being upgraded
// @history			0.09 Wine consumption is now taken into account
// @history			0.09 Resource gain no longer is calculated beyond max capacity
// @history			0.09 Added IkaTools.cityGetWineConsumption() method
//
// ==/UserScript==

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="de" />
        <meta name="author" content="مجموعة غيم فورج Gameforge" />
        <meta name="publisher" content="مجموعة Gameforge" />
        <meta name="copyright" content="مجموعة غيم فورج Gameforge" />
        <meta name="page-type" content="لعبة متصفح، لعب المتصفح" />
        <meta name="page-topic" content="لعبة متصفح، لعبة إستراتيجية، لعبة أونلاين، لعب المتصفح" />
        <meta name="audience" content="all" />
        <meta name="Expires" content="never" />
        <meta name="Keywords" content="إيكاريام، عصور قديمة، لعبة إستراتيجية, لعبة مجانية، لعبة أونلاين، لعبة أدوار، لعبة متصفح، غيم إنترنت، لعبة"/>
        <meta name="Description" content="إيكاريام لعبة متصفح مجانية. يهدف اللعب فيها توجيه وقيادة شعب عبر العصور القديمة، وبناء المدن وتطوير التجارة وغزو وإحتلال الجزر." />
        <meta name="robots" content="index,follow" />
        <meta name="Revisit" content="After 14 days" />
        <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
        <title>
        	إيكاريام Ikariam - 1د 17ث - 
        	عالم Iota		</title>
		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
        <link href="/skin/ik_rtl_common_0.3.2.css" rel="stylesheet" type="text/css" media="screen" />
        <link href="/skin/ik_rtl_city_0.3.2.css" rel="stylesheet" type="text/css" media="screen" />


		<script type="text/javascript" src="/js/complete-0.3.2.js"></script>
				<script type="text/javascript">
		/* <![CDATA[ */
		var Event = YAHOO.util.Event,
		Dom   = YAHOO.util.Dom,
		lang  = YAHOO.lang;
        
		var LocalizationStrings = {};
		LocalizationStrings['timeunits'] = {};
		LocalizationStrings['timeunits']['short'] = {};
		LocalizationStrings['timeunits']['short']['day'] = 'ي';
		LocalizationStrings['timeunits']['short']['hour'] = 'ساعة';
		LocalizationStrings['timeunits']['short']['minute'] = 'د';
		LocalizationStrings['timeunits']['short']['second'] = 'ث';
		LocalizationStrings['language']                     = 'ae';
		LocalizationStrings['decimalPoint']               = '.';
		LocalizationStrings['thousandSeperator']     = ',';
		
		LocalizationStrings['resources'] = {};
		LocalizationStrings['resources']['wood'] = 'مادة صناعية';
		LocalizationStrings['resources']['wine'] = 'مشروب العنب';
		LocalizationStrings['resources']['marble'] = 'رخام';
		LocalizationStrings['resources']['crystal'] = 'بلور';
		LocalizationStrings['resources']['sulfur'] = 'كبريت';
		LocalizationStrings['resources'][0] = LocalizationStrings['resources']['wood'];
		LocalizationStrings['resources'][1] = LocalizationStrings['resources']['wine'];
		LocalizationStrings['resources'][2] = LocalizationStrings['resources']['marble'];
		LocalizationStrings['resources'][3] = LocalizationStrings['resources']['crystal'];
		LocalizationStrings['resources'][4] = LocalizationStrings['resources']['sulfur'];
		
		
		LocalizationStrings['warnings'] = {};
		LocalizationStrings['warnings']['premiumTrader_lackingStorage'] = "Für folgende Rohstoffe fehlt dir Speicherplatz: $res";
		LocalizationStrings['warnings']['premiumTrader_negativeResource'] = "Du hast zuwenig $res für diesen Handel";
		LocalizationStrings['warnings']['tolargeText'] = 'انتباه! يشمل نصك على عدد حروف أكبر من العدد المسموح به!';
		
		IKARIAM = {
				phpSet : {
						serverTime : "1263819794",
						currentView : "city"
						},
				currentCity : {
						resources : {
								wood: 33500,
								wine: 33500,
								marble: 33500,
								crystal: 33500,
								sulfur: 33500						},
						maxCapacity : {
								wood: 33500,
								wine: 33500,
								marble: 33500,
								crystal: 33500,
								sulfur: 33500						}
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
		function selectBarbarianVillage() {
		  showInContainer("barbarianVilliage","information", "cityinfo");
          showInContainer("barbarianVilliage","actions", "cityactions");
          selectedCity = 0;
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
					<h1>إيكاريام Ikariam</h1>
					<h2>عش في العصور القديمة!</h2>
				</div>
				<div id="avatarNotes"></div>
<div id="breadcrumbs"><h3>أنت هنا:</h3><a href="?view=worldmap_iso&amp;islandX=99&amp;islandY=55" title="عودة إلى خارطة العالم"><img src="skin/layout/icon-world.gif" alt="عالم" /></a><span>&nbsp;&gt;&nbsp;</span><a href="?view=island&amp;id=4562" class="island" title="عودة إلى الجزيرة">Dajios[99:55]</a><span>&nbsp;&gt;&nbsp;</span><span class="city">القاتل السرش</span></div><!-- -------------------------------------------------------------------------------------
     ////////////////////////////////////////////////////////////////////////////////////
     ///////////////////////////// dynamic side-boxes. //////////////////////////////////
     //////////////////////////////////////////////////////////////////////////////////// -->
    <div id="information" class="dynamic" style="z-index:1;">        <h3 class="header">مدينة</h3>
        <div class="content">
        	            <ul class="cityinfo">
            	<li class="name"><span class="textLabel">اسم: </span>القاتل السرش</li>
                <li class="citylevel"><span class="textLabel">قياس: </span>9</li>
	
	 <div class="centerButton">
           <a href="?view=cityMilitary-army&id=31124" class="button">القوات في المدينة</a>
     </div>
   	     
	
            </ul>
        </div><!-- end content -->
        <div class="footer"></div>
    </div>
    <div class="dynamic" id="reportInboxLeft">
        <h3 class="header">لائحة بناء المباني</h3>
            <div class="content">
                <img width="203" height="85" src="skin/research/area_economy.jpg"/>
                <p>لاستعمال لائحة البناء، يجب الحصول على حساب مُمتاز وتفعيله.</p>
                <div class="centerButton">
                <a href="?view=premium" class="button">إيكاريام بلاس</a>
            </div>
    		</div>
        <div class="footer"></div>
    </div>


<!---------------------------------------------------------------------------------------
     ////////////////////////////////////////////////////////////////////////////////////
     ///////////////// the main view. take care that it stretches. //////////////////////
     //////////////////////////////////////////////////////////////////////////////////// -->
    <div id="mainview" class="phase9">
        <ul id="locations">

              <li id="position0" class="townHall">
                    <div class="buildingimg"></div>
                    <a href="?view=townHall&amp;id=31124&amp;position=0" title="دار البلدية مستوى 19"><span class="textLabel">دار البلدية مستوى 9</span></a>
               </li>
                  <li id="position1" class="port">
                    <div class="buildingimg"></div>
                    <a href="?view=port&amp;id=31124&amp;position=1" title="مرفأ تجاري مستوى 19"><span class="textLabel">مرفأ تجاري مستوى 3</span></a>
               </li>
                  <li id="position2" class="shipyard">
                    <div class="buildingimg"></div>
                    <a href="?view=shipyard&amp;id=31124&amp;position=2" title="حوض بناء السفن الحربية مستوى 19"><span class="textLabel">حوض بناء السفن الحربية مستوى 3</span></a>
               </li>
                  <li id="position3" class="palace">
                    <div class="buildingimg"></div>
                    <a href="?view=palace&amp;id=31124&amp;position=3" title="قصر مستوى 10"><span class="textLabel">قصر مستوى 2</span></a>
               </li>
                  <li id="position4" class="carpentering">
                    <div class="buildingimg"></div>
                    <a href="?view=carpentering&amp;id=31124&amp;position=4" title="مبنى النجارة مستوى 19"><span class="textLabel">مبنى النجارة مستوى 10</span></a>
               </li>
                  <li id="position5" class="safehouse">
                    <div class="buildingimg"></div>
                    <a href="?view=safehouse&amp;id=31124&amp;position=5" title="مخبأ مستوى 19"><span class="textLabel">مخبأ مستوى 2</span></a>
               </li>
                  <li id="position6" class="warehouse">
                    <div class="buildingimg"></div>
                    <a href="?view=warehouse&amp;id=31124&amp;position=6" title="منزل التخزين مستوى 2"><span class="textLabel">منزل التخزين مستوى 2</span></a>
               </li>
                  <li id="position7" class="warehouse">
                    <div class="buildingimg"></div>
                    <a href="?view=warehouse&amp;id=31124&amp;position=7" title="منزل التخزين مستوى 2"><span class="textLabel">منزل التخزين مستوى 2</span></a>
               </li>
                  <li id="position8" class="embassy">
                    <div class="buildingimg"></div>
                    <a href="?view=embassy&amp;id=31124&amp;position=8" title="سفارة مستوى 19"><span class="textLabel">سفارة مستوى 1</span></a>
               </li>
                  <li id="position9" class="academy">
                    <div class="buildingimg"></div>
                    <a href="?view=academy&amp;id=31124&amp;position=9" title="أكاديمية مستوى 19"><span class="textLabel">أكاديمية مستوى 4</span></a>
               </li>
                  <li id="position10" class="branchOffice">
                    <div class="buildingimg"></div>
                    <a href="?view=branchOffice&amp;id=31124&amp;position=10" title="متجر مستوى 19"><span class="textLabel">متجر مستوى 3</span></a>
               </li>
                  <li id="position11" class="tavern">
                    <div class="buildingimg"></div>
                    <a href="?view=tavern&amp;id=31124&amp;position=11" title="استراحة مستوى 19"><span class="textLabel">استراحة مستوى 5</span></a>
               </li>
                  <li id="position12" class="barracks">
                    <div class="buildingimg"></div>
                    <a href="?view=barracks&amp;id=31124&amp;position=12" title="ثكنة مستوى 19"><span class="textLabel">ثكنة مستوى 9</span></a>
               </li>
                  <li id="position13" class="buildingGround land">
                    <div></div>
                    <a href="#" title="لكي تبني هنا عليك أن تكتشف البيروقراطية."><span class="textLabel">لكي تبني هنا عليك أن تكتشف البيروقراطية.</span></a>
               </li>
                  <li id="position14" class="wall">
                    <div class="buildingimg"></div>
                    <a href="?view=wall&amp;id=31124&amp;position=14" title="جدار المدينة مستوى 19"><span class="textLabel">جدار المدينة مستوى 4</span></a>
               </li>
    



            <li class="transporter"></li>
    
    
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
<fieldset style="display: none;"><input type="hidden" name="action"
	value="header" /> <input type="hidden" name="function"
	value="changeCurrentCity" /> <input type="hidden" name="actionRequest"
	value="b3ae52aef0329bb57e848b27182677c8" /> <input type="hidden"
	name="oldView" value="city" /> </fieldset>

<!-- Navigation -->
<h3>ملاحة في المدن:</h3>
<ul>
	<li><label for="citySelect">المدينة الحالية:</label> <select
		id="citySelect"
		class="citySelect smallFont"
		name="cityId" tabindex="1" onchange="this.form.submit()">
		<option class="tradegood1" value="31124" selected="selected" title="[99:55]" ><p>القاتل السرش</p></option><option class="tradegood2" value="45821" title="[98:54]" ><p>الثعبان السام</p></option>	</select></li>
	<li class="previousCity"><a href="#changeCityPrevious" tabindex="2"
		title="تبديل مدينة قبل"><span class="textLabel">المدينة السابقة</span></a></li>
	<li class="nextCity"><a href="#changeCityNext" tabindex="3"
		title="التنقل نحو مدينة إلى الأمام"><span class="textLabel">المدينة التالية</span></a></li>
	<li class="viewWorldmap"><a href="?view=worldmap_iso" tabindex="4"
		title="توسيط المدينة المختارة على خارطة العالم"><span class="textLabel">خارطة العالم</span></a></li>
	<li class="viewIsland"><a
		href="?view=island&amp;id=4562"
		tabindex="5" title="الانتقال إلى خارطة الجزيرة للمدينة المختارة"><span
		class="textLabel">الجزيرة</span></a></li>
			<li class="viewCity"><a
		href="?view=city&amp;id=31124"
		tabindex="6" title="عرض المدينة المختارة"><span
		class="textLabel">المدينة</span></a></li>
		</ul>
</form>
</div>

<!-- TODO Goldbalance... -->
<div id="globalResources">
<h3>موارد إمبراطوريتك</h3>
<ul>
	<li class="transporters"
		title="سفن تجارية متوفرة/مجموع"><a
		href="?view=merchantNavy"><span class="textLabel">سفن تجارية:
	</span><span>31 (39)</span></a></li>
	<li class="ambrosia"
		title="0 أمبروزيا"><a
		href="?view=premium"><span class="textLabel">أمبروزيا:
	</span><span>0</span></a></li>	
	<li class="gold"
		title="700,174 ذهب"><a
		href="?view=finances"><span class="textLabel">ذهب:
	</span><span id="value_gold">700,174</span></a></li>
</ul>
</div>

<!-- Resources of the city. Finished. Identical on every page. -->
<div id="cityResources"><h3>موارد المدينة</h3>
<ul class="resources">
	<li class="population"
		title="سكان"><span
		class="textLabel">السكان: </span> <span
		id="value_inhabitants" style="display: block; width: 80px;">1800 (1800)</span>
	</li>
	<li class="actions" title="نقاط التحرك">
	<span class="textLabel">نقاط التحرك: </span>
	<span id="value_maxActionPoints">4</span>
	</li>
	<li class="wood"><span class="textLabel">مواد البناء:
	</span> <span id="value_wood"
		class="">33,500</span>
	<div class="tooltip"><span class="textLabel">سعة التخزين	مادة البناء: </span>33,500</div>
	</li>
	<li class="wine"><span class="textLabel">مشروب العنب:
	</span> <span id="value_wine"
		class="">33,500</span>
	<div class="tooltip"><span class="textLabel">سعة التخزين	مشروب العنب: </span>33,500</div>
	</li>
	<li class="marble"><span class="textLabel">رخام:
	</span> <span id="value_marble"
		class="">33,500</span>
	<div class="tooltip"><span class="textLabel">سعة التخزين	رخام: </span>33,500</div>
	</li>
	<li class="glass"><span class="textLabel">بلور:
	</span> <span id="value_crystal"
		class="">33,500</span>
	<div class="tooltip"><span class="textLabel">سعة التخزين	بلور: </span>33,500</div>
	</li>
	<li class="sulfur"><span class="textLabel">كبريت:
	</span> <span id="value_sulfur"
		class="">33,500</span>
	<div class="tooltip"><span class="textLabel">سعة التخزين	كبريت: </span>33,500</div>
	</li>
</ul>
	</div>

<!-----------------------------------------------------
  ////////////////////// ADVISORS /////////////////////
  ----------------------------------------------------->
<div id="advisors">
<h3>نظرات عامة</h3>
<ul>
	<li id="advCities"><a href="?view=tradeAdvisor&oldView=city"
		title="نظرة عامة على المدن والتمويلات"
		class="normal"> <span
		class="textLabel">مدن</span> </a> 
			<a class="plusteaser" href="?view=premiumDetails" title="إلى النظرة العامة"><span class="textLabel">إلى النظرة العامة</span></a>	</li>
	<li id="advMilitary"><a href="?view=militaryAdvisorMilitaryMovements&oldView=city"
		title="نظرة عامة على الجيش"
		class="normal"> <span
		class="textLabel">جيش</span> </a> 
			<a class="plusteaser" href="?view=premiumDetails" title="إلى النظرة العامة"><span class="textLabel">إلى النظرة العامة</span></a>	</li>
	</li>
	<li id="advResearch"><a href="?view=researchAdvisor&oldView=city"
		title="نظرة عامة على البحوث"
		class="normal"> <span
		class="textLabel">أبحاث</span> </a> 
		<a class="plusteaser" href="?view=premiumDetails" title="إلى النظرة العامة"><span class="textLabel">إلى النظرة العامة</span></a>	</li>
	</li>
	<li id="advDiplomacy"><a href="?view=diplomacyAdvisor&oldView=city"
		title="نظرة عامة على الدبلوماسية والأخبار"
		class="normal"> <span
		class="textLabel">دبلوماسية</span> </a> 
		<a class="plusteaser" href="?view=premiumDetails" title="إلى النظرة العامة"><span class="textLabel">إلى النظرة العامة</span></a>	</li>
	</li>
</ul>
</div>
<!-- ADVISORS END -->


<!-- Page footer  -->
<div id="footer"><span class="copyright">&copy; 2010 by <a	title="Gameforge" id="gflink" target="_blank"
										href="http://www.gameforge.de">Gameforge</a><a
										href="/index.php?view=credits" style="margin: 0px;">.</a> كل الحقوق محفوظة.</span><a target="_blank" href="http://ae.ikariam.com/rules.php"
	title="قواعد">قواعد</a> <a target="_blank"
	href="http://agb.gameforge.de/index.php?lang=ae&art=tac&special=&&f_text=000000&f_text_hover=804000&f_text_h=9ebde4&f_text_hr=DED3B9&f_text_hrbg=DED3B9&f_text_hrborder=804000&f_text_font=verdana%2C+arial%2C+helvetica%2C+sans-serif&f_bg=DED3B9"
	title="شروط الاستخدام">شروط الاستخدام</a>
<a target="_blank"
	href="http://agb.gameforge.de/index.php?lang=ae&art=impressum&special=&&f_text=000000&f_text_hover=804000&f_text_h=9ebde4&f_text_hr=DED3B9&f_text_hrbg=DED3B9&f_text_hrborder=804000&f_text_font=verdana%2C+arial%2C+helvetica%2C+sans-serif&f_bg=DED3B9"
	title="الإشعار القانوني">الإشعار القانوني</a></div>
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
<h3>خيارات أخرى للعبة:</h3>
<ul>
	<li class="help"><a
		href="/index.php?view=informations&articleId=10000&mainId=10000"
		title="مساعدة"><span class="textLabel">مساعدة</span></a></li>
		<li class="premium"><a href="/index.php?view=premium" title="إيكريام بلاس"><span class="textLabel">إيكريام بلاس (0)</span></a></li>	<li class="highscore"><a href="/index.php?view=highscore&showMe=1"
		title="الترتيب"><span class="textLabel">الترتيب</span></a></li>
	<li class="options"><a href="/index.php?view=options"
		title="إعدادات"><span class="textLabel">خصائص</span></a></li>
	<li class="notes"><a href="javascript:switchNoteDisplay()"
		title="ملاحظات"><span class="textLabel">ملاحظات</span></a></li>
	<li class="forum"><a href="http://board.ae.ikariam.com"
		title="إلى منتدى النقاش" target="_blank"><span
		class="textLabel">منتدى</span></a></li>
	<li class="logout"><a
		href="/index.php?action=loginAvatar&function=logout"
		title="إنهاء جلسة اللعب"><span class="textLabel">خروج</span></a></li>
			<li class="version"><a href="?view=version" title="Version"><span
		class="textLabel">v.0.3.2</span></a></li>
	<li class="serverTime"><a><span class="textLabel" id="servertime">18.01.2010 14:29:14</span></a></li>
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
	startdate: 1263819794,
	interval: 2000,
	available: 33500,
	limit: [0, 33500],
	production: 0.0316666666667,
	valueElem: "value_wood"
	});
if(woodCounter) {
	woodCounter.subscribe("update", function() {
		IKARIAM.currentCity.resources.wood = woodCounter.currentRes;
		});
	}

/* ...one for the tradegood... */
var tradegoodCounter = getResourceCounter({
	startdate: 1263819794,
	interval: 2000,
	available: 33,500,
	limit: [0, 33500],
	production: 0.0183333333333,
	spendings: [{amount: 24, tickInterval: 1200}],	valueElem: "value_wine"
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
    currTime.setTime((1263819794000-startServerTime)+ currTime.getTime()) ;
    str = getFormattedDate(currTime.getTime(), 'd.m.Y G:i:s');
    obj_ServerTime.innerHTML = str;
}

function jsTitleTag(nextETA) {
    this.nextETA = nextETA;
    var thisObj = this;
    
    var cnt = new Timer(nextETA, 1263819795, 1);
    //cnt.currentdate *= 1000; <- obsolete?
    
    //top.document.title = "إيكاريام Ikariam - عالم Iota";
    
    cnt.subscribe("update", function() {
        var timeargs = this.enddate - Math.floor(this.currenttime/1000) *1000;
        var title = "إيكاريام Ikariam - ";
        
        if (timeargs != "")
            title += getTimestring(timeargs, 3, undefined, undefined, undefined, true) + " - ";

        title += "عالم Iota";

        top.document.title = title;
    })
    
    cnt.subscribe("finished", function() {
        top.document.title = "إيكاريام Ikariam" + " - عالم Iota";
    });
    
    cnt.startTimer();
    return cnt;
}

titleTag = new jsTitleTag(1263819872)

/*
    Notizzettel
*/

var avatarNotes = null;

function switchNoteDisplay() {
    document.cookie = 'notes=0; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    var noteLayer = Dom.get("avatarNotes");
    if (noteLayer.style.display == "block") {
        avatarNotes.save();
        noteLayer.style.display = "none";
    } else {
        if (noteLayer.innerHTML == "") { // nur AjaxRequest starten, wenn Notizen noch nicht geladen sind
            ajaxRequest('?view=avatarNotes', updateNoteLayer);
            document.cookie = 'notes=1;';
        }
        noteLayer.style.display = "block";
   }   
}

// Notizzettel automatisch einblenden bei reload...
if (getCookie('notes') == 1) {
    switchNoteDisplay(); 
}

function updateNoteLayer(responseText) {
    var noteLayer = Dom.get("avatarNotes");
    noteLayer.innerHTML = responseText;
  
    // Create a panel Instance, from the 'resizablepanel' DIV standard module markup
            var panel = new YAHOO.widget.Panel("resizablepanel", {
                draggable: true,
                width: getCookie("ikariam_notes_width", "470px"), 
                height: getCookie("ikariam_notes_height", "320px"), 
                autofillheight: "body", // default value, specified here to highlight its use in the example
                constraintoviewport:true,
                context: ["tl", "bl"]
            });
            panel.render();

            // Create Resize instance, binding it to the 'resizablepanel' DIV 
            var resize = new YAHOO.util.Resize("resizablepanel", {
                handles: ["br"],
                autoRatio: false,
                minWidth: 220,
                minHeight: 110,
                status: false 
            });

            // Setup startResize handler, to constrain the resize width/height
            // if the constraintoviewport configuration property is enabled.
            resize.on("startResize", function(args) {

                if (this.cfg.getProperty("constraintoviewport")) {
                    var D = YAHOO.util.Dom;

                    var clientRegion = D.getClientRegion();
                    var elRegion = D.getRegion(this.element);

                    resize.set("maxWidth", clientRegion.right - elRegion.left - YAHOO.widget.Overlay.VIEWPORT_OFFSET);
                    resize.set("maxHeight", clientRegion.bottom - elRegion.top - YAHOO.widget.Overlay.VIEWPORT_OFFSET);
                } else {
                    resize.set("maxWidth", null);
                    resize.set("maxHeight", null);
                }

            }, panel, true);

            // Setup resize handler to update the Panel's 'height' configuration property 
            // whenever the size of the 'resizablepanel' DIV changes.

            // Setting the height configuration property will result in the 
            // body of the Panel being resized to fill the new height (based on the
            // autofillheight property introduced in 2.6.0) and the iframe shim and 
            // shadow being resized also if required (for IE6 and IE7 quirks mode).
            resize.on("resize", function(args) {
                
                var panelHeight = args.height;
                this.cfg.setProperty("height", panelHeight + "px");
                Dom.get("message").style.height = (panelHeight-75) + "px";
            }, panel, true);
            
        
            avatarNotes = new Notes();
            avatarNotes.setMaxChars(200);
            avatarNotes.init(Dom.get("message"), Dom.get("chars"));
            
            Dom.get("resizablepanel_c").style.top = getCookie("ikariam_notes_y", "80px");
            Dom.get("resizablepanel_c").style.left = getCookie("ikariam_notes_x", "-375px");
            Dom.get("message").style.height = (parseInt(getCookie("ikariam_notes_height", "320px")) - 75 ) + "px";            
}

window.onunload = function() { 
    if (avatarNotes instanceof Notes) {
        setCookie( 'ikariam_notes_x', Dom.get("resizablepanel_c").style.left, '9999', '', '', '' );
        setCookie( 'ikariam_notes_y', Dom.get("resizablepanel_c").style.top, '9999', '', '', '' );
        setCookie( 'ikariam_notes_width', Dom.get("resizablepanel").style.width, '9999', '', '', '' );
        setCookie( 'ikariam_notes_height', Dom.get("resizablepanel").style.height, '9999', '', '', '' );
        avatarNotes.save();
    }
}

function setCookie(name, value, expires, path, domain, secure)
{
	var today = new Date();
	today.setTime( today.getTime() );

    if ( expires ) {
        expires = expires * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date( today.getTime() + (expires) );
    document.cookie = name + "=" +escape( value ) + ((expires) ? ";expires=" + expires_date.toGMTString() : "" ) + ((path) ? ";path=" + path : "" ) + ((domain) ? ";domain=" + domain : "" ) + ((secure) ? ";secure" : "" );
}

function getCookie ( check_name, def_val ) {
    var a_all_cookies = document.cookie.split( ';' );
    var a_temp_cookie = '';
    var cookie_name = '';
    var cookie_value = '';
    var b_cookie_found = false;

    for (i=0; i<a_all_cookies.length; i++) {
        a_temp_cookie = a_all_cookies[i].split( '=' );
        cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
        if ( cookie_name == check_name ) {
            b_cookie_found = true;
            if ( a_temp_cookie.length > 1 ) {
                cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
            }
            return cookie_value;
            break;
        }
        a_temp_cookie = null;
        cookie_name = '';
    }
    if (!b_cookie_found ) {
        return def_val;
    }
}

</script>


</body>
</html>


