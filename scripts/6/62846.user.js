// ==UserScript==
// @name           Ikariam Alliance Highlighter
// @author         PhasmaExMachina
// @namespace      PhasmaExMachina
// @description    Cambia de color.
// @include        http://s*.ikariam.*/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/57377.user.js
// @require        http://userscripts.org/scripts/source/57756.user.js
//
// @version        0.01
//
//
// ==/UserScript==

IkaTools.init({trackData:false});

ScriptUpdater.check(61389, "0.01");

AllianceColor = {
	init:function() {		
		AllianceColor.startTime = new Date();
		var input = document.createElement('input');
		input.id = 'allianceColorSetValue';
		input.type = 'hidden';
		AllianceColor.lastColorVal = '';
		document.body.appendChild(input);
		GM_addStyle('.alliesHighlighterSelector { position:relative; display:inline; margin-left:5px; }\
						.alliesHighlighterSelector a { display:block; margin-bottom:.5em; }\
						.alliesHighlighterSelector img { display:inline !important; vertical-align:middle; height:14px; cursor:pointer; }\
						.alliesHighlighterSelector div { display:none; position:absolute; background-color:#F6EBBA; border:1px solid #DCA354; top:15px; left:0; padding:1em 1em .5em 1em; left:-5px;  z-index:11000 !important; }\
						.alliesHighlighterSelector:hover div { display:block; }\
						');
		if(typeof(AllianceColor.views[IkaTools.getView()]) == 'function')
			AllianceColor.views[IkaTools.getView()]();
		var d = new Date();
//		IkaTools.debug("Allies Highlighter: " + (d.getTime() - AllianceColor.startTime.getTime()));
	},
	addAllianceColorSelector:function(a) {
		a = typeof(a[0]) != 'undefined' ? a[0] : a;
		try { var allianceId = a.href.match(/allyId=(\d+)/)[1]; } catch(e) { var allianceId = false; }
		if(allianceId) {
			var div = document.createElement('div');
			div.className = "alliesHighlighterSelector";
			div.innerHTML = '<img src="' + AllianceColor.icons.color + '"/><div>\
				<a href="javascript:allianceColorSet(' + allianceId + ', \'none\')" style="color:#7E2D04;">Normal</a>\
				<a href="javascript:allianceColorSet(' + allianceId + ', \'red\');" style="color:#cc0000;">Rojo</a>\
				<a href="javascript:allianceColorSet(' + allianceId + ', \'cian\');" style="color:#6bd8ea;">Cian</a>\
				<a href="javascript:allianceColorSet(' + allianceId + ', \'green\');" style="color:#00cc00;">Verde</a>\
				<a href="javascript:allianceColorSet(' + allianceId + ', \'blue\');" style="color:#0000cc;">Azul</a>\
				<a href="javascript:allianceColorSet(' + allianceId + ', \'purple\');" style="color:#880088;">Purpura</a>\
				</div>\
			';
			$(a).after(div);
		}
	},	
	loadAlliances:function() {
//		AllianceColor.alliances = typeof(AllianceColor.alliances) == 'undefined' ? (typeof(IkaTools.getVal('alliances') == 'undefined') ? {} : IkaTools.getVal('alliances')) : AllianceColor.alliances;
		AllianceColor.alliances = IkaTools.getVal('alliances');
	}, 
	getAllianceById:function(id) {
		if(id) {
			AllianceColor.loadAlliances();
			var alliance = (typeof(AllianceColor.alliances) != 'undefined' && typeof(AllianceColor.alliances[id]) != 'undefined') ? AllianceColor.alliances[id] : false;
			return alliance;
		} else
			return false;
	},
	setAllianceColor:function(allianceId, color) {
		$('#allianceColorSetValue')[0].value = allianceId + '_' + color;
	},
	startChangeListener:function() {
		setInterval(function() {
			if($('#allianceColorSetValue')[0].value != AllianceColor.lastColorVal) {
				AllianceColor.lastColorVal = $('#allianceColorSetValue')[0].value;
				var val = AllianceColor.lastColorVal;
				AllianceColor.loadAlliances();
				var allianceId = val.match(/^\d+/)[0];
				var color = val.match(/_(.+)$/)[1];
				var alliance = AllianceColor.getAllianceById(allianceId);
				alliance = alliance ? alliance : {};
				alliance.id = allianceId;
				alliance.color = color;
				AllianceColor.alliances[allianceId] = alliance;
				IkaTools.setVal('alliances', AllianceColor.alliances);
				AllianceColor.updateColors();
			}
		}, 500);
	},
	updateColors:function() {
		switch(IkaTools.getView()) {
			case 'allyHighscore':
				$('#mainview .contentBox01h .content .table01 tr').each(function() {
					try { var allyLink = $('a.allyLink', this)[0]; } catch(e) { var allyLink = false; }
					if(allyLink) {
						try { var ally = AllianceColor.getAllianceById(allyLink.href.match(/allyId=(\d+)/)[1]); } catch(e) { var ally = false; }
						if(ally) {
							this.className = this.className.replace(/allianceColor_[^\s]+/	, '') + ' allianceColor_' + ally.color;
						}
					}
				});
				case 'island': 
				$('ul#cities li').each(function() {
					try { var allyId = this.innerHTML.match(/allyId=(\d+)/)[1]; } catch(e) { var allyId = false; }
					var alliance = AllianceColor.getAllianceById(allyId);
					if(allyId && alliance) {
						this.className = this.className.replace(/allianceColor[^\s*]/, '') + ' allianceColor_' + alliance.color;
					}
				});
				break;		
			case 'highscore':
				$('#mainview .contentBox01h .content .table01 tr').each(function() {
					try { var allyLink = $('a.allyLink', this)[0]; } catch(e) { var allyLink = false; }
					if(allyLink) {
						try { var ally = AllianceColor.getAllianceById(allyLink.href.match(/allyId=(\d+)/)[1]); } catch(e) { var ally = false; }
						if(ally) {
							this.className = this.className.replace(/allianceColor_[^\s]+/	, '') + ' allianceColor_' + ally.color;
						}
					}
				});
				break;
		}
	},
	views:{
		allyHighscore:function() {
			GM_addStyle('#mainview .contentBox01h .content .table01 tr.allianceColor_red * { color:red; }\
						#mainview .contentBox01h .content .table01 tr.allianceColor_green * { color:green; }\
						#mainview .contentBox01h .content .table01 tr.allianceColor_cian * { color:cian; }\
						#mainview .contentBox01h .content .table01 tr.allianceColor_blue * { color:blue; }\
						#mainview .contentBox01h .content .table01 tr.allianceColor_purple * { color:purple; }');
			$('#mainview .contentBox01h .content .table01 tr').each(function() {
				try { var allyLink = $('a.allyLink', this)[0]; } catch(e) { var allyLink = false; }
				if(allyLink) {
					AllianceColor.addAllianceColorSelector(allyLink);
					try { var ally = AllianceColor.getAllianceById(allyLink.href.match(/allyId=(\d+)/)[1]); } catch(e) { var ally = false; }
					if(ally) {
						this.className = this.className.replace(/allianceColor_[^\s]+/	, '') + ' allianceColor_' + ally.color;
					}
				}
			});
			AllianceColor.startChangeListener();
		},
		island:function() {
			GM_addStyle('#cities li.allianceColor_red .textLabel .before { background-image:url(' + AllianceColor.icons.scroll.red.left + ') !important; }\
						#cities li.allianceColor_red .textLabel .after { background-image:url(' + AllianceColor.icons.scroll.red.right + ') !important; }\
						#cities li.allianceColor_red .textLabel { background-image:url(' + AllianceColor.icons.scroll.red.bg + ') !important; }\
						#cities li.allianceColor_green .textLabel .before { background-image:url(' + AllianceColor.icons.scroll.green.left + ') !important; }\
						#cities li.allianceColor_green .textLabel .after { background-image:url(' + AllianceColor.icons.scroll.green.right + ') !important; }\
						#cities li.allianceColor_green .textLabel { background-image:url(' + AllianceColor.icons.scroll.green.bg + ') !important; }\
						#cities li.allianceColor_blue .textLabel .before { background-image:url(' + AllianceColor.icons.scroll.blue.left + ') !important; }\
						#cities li.allianceColor_blue .textLabel .after { background-image:url(' + AllianceColor.icons.scroll.blue.right + ') !important; }\
						#cities li.allianceColor_blue .textLabel { background-image:url(' + AllianceColor.icons.scroll.blue.bg + ') !important; }\
						#cities li.allianceColor_cian .textLabel .before { background-image:url(' + AllianceColor.icons.scroll.cian.left + ') !important; }\
						#cities li.allianceColor_cian .textLabel .after { background-image:url(' + AllianceColor.icons.scroll.cian.right + ') !important; }\
						#cities li.allianceColor_cian .textLabel { background-image:url(' + AllianceColor.icons.scroll.cian.bg + ') !important; }\
						#cities li.allianceColor_purple .textLabel .before { background-image:url(' + AllianceColor.icons.scroll.purple.left + ') !important; }\
						#cities li.allianceColor_purple .textLabel .after { background-image:url(' + AllianceColor.icons.scroll.purple.right + ') !important; }\
						#cities li.allianceColor_purple .textLabel { background-image:url(' + AllianceColor.icons.scroll.purple.bg + ') !important; }');
			
			$('ul#cities li').each(function() {
				try { var allyId = this.innerHTML.match(/allyId=(\d+)/)[1]; } catch(e) { var allyId = false; }
				if(allyId) {
					AllianceColor.addAllianceColorSelector($('ul.cityinfo li.ally a', this).eq(0));
				}
			});
			AllianceColor.updateColors();
			AllianceColor.startChangeListener();
		},
		highscore:function() {
			$('#mainview .contentBox01h .content .table01 tr').each(function() {
				try { var allyLink = $('a.allyLink', this)[0]; } catch(e) { var allyLink = false; }
				if(allyLink) {
					if(!allyLink.href.match(/allyId=0/))
						AllianceColor.addAllianceColorSelector(allyLink);
					try { var ally = AllianceColor.getAllianceById(allyLink.href.match(/allyId=(\d+)/)[1]); } catch(e) { var ally = false; }
					if(ally) {
						this.className = this.className.replace(/allianceColor_[^\s]+/	, '') + ' allianceColor_' + ally.color;
					}
				}
			});
			GM_addStyle('#mainview .contentBox01h .content .table01 tr.allianceColor_red * { color:red; }\
						#mainview .contentBox01h .content .table01 tr.allianceColor_green * { color:green; }\
						#mainview .contentBox01h .content .table01 tr.allianceColor_cian * { color:cian; }\						#mainview .contentBox01h .content .table01 tr.allianceColor_blue * { color:blue; }\
						#mainview .contentBox01h .content .table01 tr.allianceColor_purple * { color:purple; }');
			AllianceColor.startChangeListener();
		},
	},
	icons:{
		color:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMnSURBVHjaVJNJaBNhFMf/38w3M5l0MknTPWltVVyLbaGCgjtYQVGseBGKV/HgyZuiB8GDF0FE9CaCXtSDoOCCu4goiCJIoS5Nl5jYGjOdJJNtls/nUtFveLxv4P3/7/ceM0wIgfnDxky5qVrZs4iFRnqY3tstyYl2CX6r5E63yfU3PXrt8tJk7T7+OWzeQBldt0hxM6dXa4nhTdEB9EUWIKGaiEoMIW8OSnWS4qar5ucu6hn3aMPWev6vARs70GP62Rs7jOUDW1pWIaL7qOIzYnDQQUWdMNCGFWBOEfX0Q/DU3TvyaHFEPiwszlInVF2Kn9ke7h8YaluGd+pbhGBhIXTKJsII6FYB916ClXQwbRuELLbXnVvHdeAwB2vd2a+Fd29u7sVbdZokCTTRY5DQJKlJ2SASVtKAbzOQC5/hN2xEkHty0N7LrvCQ1jnSrzSD63HIqCNOgma4hO+iARxRGkGrFQFLoqgBk18gJ5aCtwzp+ZfX9nGVJ/uS4Ta8ByPcJPUEdRVk4qOR7obwATsH5CrAV9rbV5VIPkCWE3BzymoOqasjpkQxFTBCBVEIqGRmMPzqrjjOb/FMCMiSOC0DdQtIJOF9Y10cec0PVBUB1bjiT5CwQrlMYdYikGxiKRZ+R8UGgircqgrPbfS5+4Wn52SxMlxicMoAlSBP1DKNq9LYBjGZdhMwRyROCahSdHCUZ2fgerEUr2TVVxNCrFwfZ3g8TiISiyrgUzaIOkaG4WIYfJYovtMy7QKCNa2wX43B84xnHJ/Epeuj7v6+DTKPFjhmp2hEMlAUIqGRTRojUmaIF8jKIr5Vy2CNp2G9yNJmY1clcVx55nyoXrj9yMHyqI9mwv4+QcRpMiAza5LeM0T+c4kr2lHQNUw/TaNcD50cFPfG+a8fwXaPPbhV6fQ+1vZsHYxiYEhDgcYR1MMlw6CTDBI+iqkKpu5MwH5TONsI4/x/PxPrzhjI5I8YYId2rY+YvYsj6IopaAx88JkSgk/0DbzOZdXAOhXH7LlBcTD4z2D+hNi7vhYUh1vgrW1iortV+H47ydshni+BfmNYbEz9W/9DgAEAHjlV3dGNk1wAAAAASUVORK5CYII%3D',
		scroll:{
			red:{
				left:'data:image/gif;base64,R0lGODlhDAAXANUnAHQREdIeHuZPT8EcHORCQupra+lkZIkUFJUWFvW4uJoWFpwXF7YaGtYfH9cfH7QaGpEVFXAQEOVISJcWFvW5udQfH3IREbMaGm0QEPa/v6UYGPSxseM9PedUVPrZ2e2Dg+EqKvvg4OAlJet1dfvl5ffHx+liYv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACcALAAAAAAMABcAAAZwwJNGszicjsjjUGFMHjOESwRRAQwCAkMhQWBYEA4rVkvamECcjmj0KXlC5XN63X7H0Wq2G27G0/d3c3p2fYJ1fHJ5h4GKgIWNhIl/kX6DiJWLj5OXho6SlhQEDxgQAWJZW10AEw2nWhJDRU5IS01OQQA7',
				bg:'data:image/gif;base64,R0lGODlhAQAXAJECAOpra/vg4P///wAAACH5BAEAAAIALAAAAAABABcAAAIHlAChy41WAAA7',
				right:'data:image/gif;base64,R0lGODlhDAAXANUjALQaGuRCQokUFOlkZJoWFpwXF5UWFrYaGvW4uPa/v/W5ubMaGpEVFXQREdcfH5cWFtQfH3AQEHIREdIeHm0QENYfH+ZPT6UYGOpra/SxseM9PedUVPrZ2eEqKvGamvvl5eliYvvg4PfHx////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACMALAAAAAAMABcAAAZwwJFwOLpcCgIi0UhIYjADiwWQCCwiBsgzOkUEDhKDIxTiiESeTwbU0WzIZrSa7Yaf0+v2u3yf6+1yeXV8gXR7cXiGgIl/hIyDiH6QfYKHlIqOkpaFjZGVW1IACgEAFAwToF1fDQ8VSkJGSK+wF00jQQA7',	
			},
			green:{
				left:'data:image/gif;base64,R0lGODlhDAAXANUnAC10EVDSHnnmT2/kQo7qa4npZDWJFErBHDycF8n1uDmVFjuaFkW2Gsr1uVHUHzqXFitwECxyEVLWH3TlSEW0GiptEEWzGs72v1LXHziRFT+lGIjpYlngJeL62WvjPaHtg13hKuj74NT3x33nVMT0sZbrdev75f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACcALAAAAAAMABcAAAZwwJNGgzCcjsjjcGFMHi8DC0ThABwCggIhMWBEFBgrVmsibUCeEaf0EXVC5XN63X7H0Wq2G27G0/d3c3p2fYJ1fHJ5h4GKgIWNhIl/kX6DiJWLj5OXho6Slg0DFBUZAWJZW10ADxKnWhNDRU5IS01OQQA7',
				bg:'data:image/gif;base64,R0lGODlhAQAXAJECAI7qa+j74P///wAAACH5BAEAAAIALAAAAAABABcAAAIHlAChy41WAAA7',
				right:'data:image/gif;base64,R0lGODlhDAAXANUjAEW0Gm/kQonpZDWJFDuaFsn1uEW2GjycFzmVFjqXFi10Ec72v1HUH1LXH0WzGitwEMr1uSptEFDSHlLWHziRFSxyEXnmT47qaz+lGIjpYuL62WvjPV3hKrLxmn3nVMT0sev75ej74NT3x////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACMALAAAAAAMABcAAAZwwJFwOMJgDgMi0UhIXi4CiwWwCDgeCMYzOi0EDBVEIxTSiEQd0CfD2XjIZrSa7Yaf0+v2u3yf6+1yeXV8gXR7cXiGgIl/hIyDiH6QfYKHlIqOkpaFjZGVW1IAEAEAERQSoF1fCgkTSkJGSK+wGE0jQQA7',	
			},
			cian:{
				left:'http://i92.servimg.com/u/f92/12/62/02/65/izq10.gif',
				bg:'http://i92.servimg.com/u/f92/12/62/02/65/cen10.gif',
				right:'http://i92.servimg.com/u/f92/12/62/02/65/der10.gif',	
			},
			blue:{
				left:'data:image/gif;base64,R0lGODlhDAAXANUnABEjdB4/0k9r5muC6hw6wWR96RQqiUJg5BYtlRo3trjD9RYumhcwnBo2sxAicB9B10hl5b/J9hYulx9A1B9B1ho2tBAhbREjcrnE9RUskRgypVRv57G99HWL69nf+j1c42J76eDl+8fQ9yVH4IOX7SpM4eXp+////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACcALAAAAAAMABcAAAZwwJNGwzCcjsjjcGFMHiOHhgMxARACgsJAcUhcEA8rVmvigEqfzahDEnlC5XN63X7H0Wq2G27G0/d3c3p2fYJ1fHJ5h4GKgIWNhIl/kX6DiJWLj5OXho6SlhgHFRYZAWJZW10AEhSnWhBDRU5IS01OQQA7',
				bg:'data:image/gif;base64,R0lGODlhAQAXAJECAGuC6uDl+////wAAACH5BAEAAAIALAAAAAABABcAAAIHlAChy41WAAA7',
				right:'data:image/gif;base64,R0lGODlhDAAXANUjABo2tBQqiUJg5GR96bjD9RYtlRYumho3thcwnBAhbREjch9B1hEjdL/J9h9B1x4/0hAicBo2sxYul7nE9RUskR9A1E9r5hgypWuC6lRv57G99Jqq8dnf+j1c42J76SpM4eXp++Dl+8fQ9////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACMALAAAAAAMABcAAAZwwJFwOLpcEAEi0WhIYjADiwXQEEQghcozOiUIDoqCIxTiiEQbkMbz6WTIZrSa7Yaf0+v2u3yf6+1yeXV8gXR7cXiGgIl/hIyDiH6QfYKHlIqOkpaFjZGVW1IAEwIACRQPoF1fDBILSkJGSK+wF00jQQA7',	
			},
			purple:{
				left:'data:image/gif;base64,R0lGODlhDAAXANUnAJ4e0lgRdLZC5MNk6cZr6pIcwWgUibtP5nQWmuS49XYXnHEWlYkatuS59aIf13IWl1UQcKIf1m4Vkea/9lYRcrhI5Ycas1IQbYgatKAf1H0Ypb1U5/HZ+uGx9Ml16/Pg+/Xl+8+D7aol4K0q4cJi6enH97M94////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACcALAAAAAAMABcAAAZwwJNGozCcjsjjEGFMHicCC2SRCRQAhwEhIWBQFg4rVgvqkEamjcgTKnE+5XN63X7H0Wq2G27G0/d3c3p2fYJ1fHJ5h4GKgIWNhIl/kX6DiJWLj5OXho6Slg0CGBcSAGJZW10BDxGnWhVDRU5IS01OQQA7',
				bg:'data:image/gif;base64,R0lGODlhAQAXAJECAMZr6vPg+////wAAACH5BAEAAAIALAAAAAABABcAAAIHlAChy41WAAA7',
				right:'data:image/gif;base64,R0lGODlhDAAXANUjAIgatLZC5MNk6WgUiXEWleS49XQWmnYXnIkatlUQcG4Vkea/9qAf1J4e0lYRclgRdIcas3IWl6If1qIf11IQbeS59cZr6rtP5n0Ypb1U59ia8fHZ+uGx9PXl+60q4cJi6bM94/Pg++nH9////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACMALAAAAAAMABcAAAZwwJFwOMJgDgMi0WhIWiyCywWwCEASBMYzOi0EEA7CJBTaiESaDufjAWXIZrSa7Yaf0+v2u3yf6+1yeXV8gXR7cXiGgIl/hIyDiH6QfYKHlIqOkpaFjZGVW1IAFQEAFAoNoF1fDxESSkJGSK+wGE0jQQA7',	
			},
		},
	}
};

unsafeWindow.allianceColorSet = function(allianceId, color) {
	$('#allianceColorSetValue')[0].value = allianceId + '_' + color;
};

AllianceColor.init();