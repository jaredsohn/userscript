// coding: utf-8
// ==UserScript==
// @name           Test0122
// @namespace      ikariammuchreso.js
// @include        http://s*.ikariam.com*/
// ==/UserScript==

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
		LocalizationStrings['resources']['sulfur'] = 'Sump';
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
						serverTime : "1235656597",
						currentView : "city"						},
				currentCity : {
						resources : {
								wood: 262411,
								wine: 324215,
								marble: 150038,
								crystal: 142252,
								sulfur: 42221						},
						maxCapacity : {
								wood: 1472000,
								wine: 1452500,
								marble: 1455200,
								crystal: 1452500,
								sulfur: 1452500						}
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
