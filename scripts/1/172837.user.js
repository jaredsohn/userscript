// ==UserScript==
// @name        Baza ID Ferajny
// @namespace   http://shoxteam.net
// @description Automatycznie wysyla ID atakow do bazy plemiennej. By Slay
// @include     http://pl64.plemiona.pl/game.php?*village=*&screen=place
// @exclude     http://pl64.plemiona.pl/game.php?*village=*&try=confirm&screen=place
// @version     1.3.0
// ==/UserScript==

function GM_wait() {

  if (typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(GM_wait, 100);
  } else {
    $ = unsafeWindow.jQuery;
    letsJQuery();
  }

}

// Main()
function letsJQuery()
{
  if (typeof unsafeWindow == 'undefined') {
    unsafeWindow = window;
  }
	$(document).ready(function()
	{
		var fromx = unsafeWindow.game_data.village.coord.split("|")[0];
		var fromy = unsafeWindow.game_data.village.coord.split("|")[1];
		var tabela = $("th:contains(Własne rozkazy)").parent().parent().parent();
		if(tabela[0]!=undefined)
		{
			var ilosc_atakow = tabela[0].rows.length-1;
			for(var i=1;i<=ilosc_atakow;i++)
			{
				if(tabela[0].rows[i].cells.length==4)
				{
					if(tabela[0].rows[i].cells[3].innerHTML.indexOf("Anuluj")>-1)
					{
						var id=tabela[0].rows[i].cells[0].children[1].id.substring(6);
						id = id.substring(0, id.length - 1)
						var czas=tabela[0].rows[i].cells[2].children[0].innerHTML;
						var nazwa=tabela[0].rows[i].cells[0].children[1].children[0].children[0].innerHTML;
						var start=nazwa.lastIndexOf("(");
						var stop=nazwa.lastIndexOf(")");
						var coords=nazwa.substring(start+1, stop).split('|');
						var tox=coords[0];
						var toy=coords[1];
						var odl = round(Math.sqrt(Math.pow((parseInt(tox)-parseInt(fromx)), 2) + Math.pow((parseInt(toy)-parseInt(fromy)), 2)), 4);
						if(odl>11) //przy zbyt malej odleglosci moze zliczac jeden ID dla kilku godzin przy paru odwiedzinach placu (bo przerwij wyswietla sie az 10min)
						{
							//info o szlachcie nie wysylamy zeby nie lagowac ludziom synchro
							var tarankata_min=odl*30;
							var miecz_min=odl*22;
							var toppikluk_min=odl*18;
							var ck_min=odl*11;
							var ryclklnk_min=odl*10;
							var zwiad_min=odl*9;
							var time = czas.split(/:/);
							var time_min=(parseInt(time[0],10)*60)+(parseInt(time[1],10))+(parseInt(time[2],10)/60);
							
							if((time_min<zwiad_min && (zwiad_min-time_min)<(3/60)) || time_min==zwiad_min || (time_min-zwiad_min)<1/60)
								send_id(id,encodeURI($("#serverTime").html()),encodeURI($("#serverDate").html()),encodeURI(unsafeWindow.game_data.player.name),unsafeWindow.game_data.player.ally,"z");
							else
							{
								if((time_min<ryclklnk_min && (ryclklnk_min-time_min)<(3/60)) || time_min==ryclklnk_min || (time_min-ryclklnk_min)<1/60)
									send_id(id,encodeURI($("#serverTime").html()),encodeURI($("#serverDate").html()),encodeURI(unsafeWindow.game_data.player.name),unsafeWindow.game_data.player.ally,"rll");
								else
								{
									if((time_min<ck_min && (ck_min-time_min)<(3/60)) || time_min==ck_min || (time_min-ck_min)<1/60)
										send_id(id,encodeURI($("#serverTime").html()),encodeURI($("#serverDate").html()),encodeURI(unsafeWindow.game_data.player.name),unsafeWindow.game_data.player.ally,"c");
									else
									{
										if((time_min<toppikluk_min && (toppikluk_min-time_min)<(3/60)) || time_min==toppikluk_min || (time_min-toppikluk_min)<1/60)
											send_id(id,encodeURI($("#serverTime").html()),encodeURI($("#serverDate").html()),encodeURI(unsafeWindow.game_data.player.name),unsafeWindow.game_data.player.ally,"tpl");
										else
										{
											if((time_min<miecz_min && (miecz_min-time_min)<(3/60)) || time_min==miecz_min || (time_min-miecz_min)<1/60)
												send_id(id,encodeURI($("#serverTime").html()),encodeURI($("#serverDate").html()),encodeURI(unsafeWindow.game_data.player.name),unsafeWindow.game_data.player.ally,"m");
											else
											{
												if((time_min<tarankata_min && (tarankata_min-time_min)<(3/60)) || time_min==tarankata_min || (time_min-tarankata_min)<1/60)
													send_id(id,encodeURI($("#serverTime").html()),encodeURI($("#serverDate").html()),encodeURI(unsafeWindow.game_data.player.name),unsafeWindow.game_data.player.ally,"tk");
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	});
}

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}


GM_wait();

function log(text)
{
	unsafeWindow.console.log(text);
}

function send_id(a,b,c,d,e,f)
{
	$.ajax({dataType:'jsonp',data:'',jsonp:'z',url:'http://bazafer.tk/api/push_id.php?a='+a+'&b='+b+'&c='+c+'&d='+d+'&e='+e+'&f='+f+'&rnd='+new Date()});
}

function round (value, precision, mode) {
  // http://kevin.vanzonneveld.net
  // +   original by: Philip Peterson
  // +    revised by: Onno Marsman
  // +      input by: Greenseed
  // +    revised by: T.Wild
  // +      input by: meo
  // +      input by: William
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +      input by: Josep Sanz (http://www.ws3.es/)
  // +    revised by: Rafał Kukawski (http://blog.kukawski.pl/)
  // %        note 1: Great work. Ideas for improvement:
  // %        note 1:  - code more compliant with developer guidelines
  // %        note 1:  - for implementing PHP constant arguments look at
  // %        note 1:  the pathinfo() function, it offers the greatest
  // %        note 1:  flexibility & compatibility possible
  // *     example 1: round(1241757, -3);
  // *     returns 1: 1242000
  // *     example 2: round(3.6);
  // *     returns 2: 4
  // *     example 3: round(2.835, 2);
  // *     returns 3: 2.84
  // *     example 4: round(1.1749999999999, 2);
  // *     returns 4: 1.17
  // *     example 5: round(58551.799999999996, 2);
  // *     returns 5: 58551.8
  var m, f, isHalf, sgn; // helper variables
  precision |= 0; // making sure precision is integer
  m = Math.pow(10, precision);
  value *= m;
  sgn = (value > 0) | -(value < 0); // sign of the number
  isHalf = value % 1 === 0.5 * sgn;
  f = Math.floor(value);

  if (isHalf) {
    switch (mode) {
    case 'PHP_ROUND_HALF_DOWN':
      value = f + (sgn < 0); // rounds .5 toward zero
      break;
    case 'PHP_ROUND_HALF_EVEN':
      value = f + (f % 2 * sgn); // rouds .5 towards the next even integer
      break;
    case 'PHP_ROUND_HALF_ODD':
      value = f + !(f % 2); // rounds .5 towards the next odd integer
      break;
    default:
      value = f + (sgn > 0); // rounds .5 away from zero
    }
  }

  return (isHalf ? value : Math.round(value)) / m;
}