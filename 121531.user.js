// ==UserScript==
// @name	HWM_colored_res
// @version	0.0.5
// @description	HWM Colored Resources
// @homepage      http://userscripts.org/scripts/show/121531
// @include       http://*heroeswm.*/pl_info.php?*
// @include       http://178.248.235.15/pl_info.php?*
// @include        http://209.200.152.144/pl_info.php?*
// @include       http://173.231.37.114/pl_info.php?*
// @include       http://*heroes-wm.*/pl_info.php?*
// @include       http://*hommkingdoms.info/pl_info.php?*
// @include       http://*hmmkingdoms.com/pl_info.php?*
// @include       http://*герои.рф/pl_info.php?*

// ==/UserScript==

// (c) 2011-2012, перф

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

var url_cur = location.href ;
var all_td= document.getElementsByTagName('td');


// ======= array elemets for highlight =======
hl_elem = []
var o;
// == create elemets with color info
o = {};
o.elem = "&nbsp;&nbsp;&nbsp;&nbsp;<b>ядовитый гриб</b>";
o.colr = "";
hl_elem.push(o);
//
o = {};
o.elem = "&nbsp;&nbsp;&nbsp;&nbsp;<b>цветок папоротника</b>";
o.colr = "";
hl_elem.push(o);
//
o = {};
o.elem = "&nbsp;&nbsp;&nbsp;&nbsp;<b>цветок ветров</b>";
o.colr = "";
hl_elem.push(o);
//
o = {};
o.elem = "&nbsp;&nbsp;&nbsp;&nbsp;<b>цветок ведьм</b>";
o.colr = "";
hl_elem.push(o);
//
o = {};
o.elem = "&nbsp;&nbsp;&nbsp;&nbsp;<b>осколок метеорита</b>";
o.colr = "";
hl_elem.push(o);
//
o = {};
o.elem = "&nbsp;&nbsp;&nbsp;&nbsp;<b>огненный кристалл</b>";
o.colr = "";
hl_elem.push(o);
//
o = {};
o.elem = "&nbsp;&nbsp;&nbsp;&nbsp;<b>лунный камень</b>";
o.colr = "";
hl_elem.push(o);
//
o = {};
o.elem = "&nbsp;&nbsp;&nbsp;&nbsp;<b>ледяной кристалл</b>";
o.colr = "";
hl_elem.push(o);
//
o = {};
o.elem = "&nbsp;&nbsp;&nbsp;&nbsp;<b>клык тигра</b>";
o.colr = "";
hl_elem.push(o);
//
o = {};
o.elem = "&nbsp;&nbsp;&nbsp;&nbsp;<b>змеиный яд</b>";
o.colr = "";
hl_elem.push(o);
//
o = {};
o.elem = "&nbsp;&nbsp;&nbsp;&nbsp;<b>абразив</b>";
o.colr = "";
hl_elem.push(o);
//
o = {};
o.elem = "&nbsp;&nbsp;&nbsp;&nbsp;<b>\u0421\u0442\u0430\u043b\u044c</b>"; //Steel
o.colr = "#5C5C5C";
hl_elem.push(o);
//
o = {};
o.elem = "&nbsp;&nbsp;&nbsp;&nbsp;<b>\u041e\u0440\u0438\u0445\u0430\u043b\u043a</b>"; //Orichalcum
o.colr = "#7F2E37";
hl_elem.push(o);
//
o = {};
o.elem = "&nbsp;&nbsp;&nbsp;&nbsp;<b>\u041d\u0438\u043a\u0435\u043b\u044c</b>" //Nickel
o.colr = "darkslategray";
hl_elem.push(o);
//
o = {};
o.elem = "&nbsp;&nbsp;&nbsp;&nbsp;<b>\u041c\u0438\u0444\u0440\u0438\u043b</b>" //Mithril
o.colr = "slategray";
hl_elem.push(o);
//
o = {};
o.elem = "&nbsp;&nbsp;&nbsp;&nbsp;<b>\u0412\u043e\u043b\u0448\u0435\u0431\u043d\u044b\u0439 \u043f\u043e\u0440\u043e\u0448\u043e\u043a</b>" //Magic powder
o.colr = "#00507F";
hl_elem.push(o);
//
o = {};
o.elem = "&nbsp;&nbsp;&nbsp;&nbsp;<b>\u041e\u0431\u0441\u0438\u0434\u0438\u0430\u043d</b>"; //obsidian
o.colr = "#100020";
hl_elem.push(o);
//
o = {};
o.elem = "&nbsp;&nbsp;&nbsp;&nbsp;<b>\u041c\u0438\u0444\u0440\u0438\u043b\u043e\u0432\u0430\u044f \u0440\u0443\u0434\u0430</b>" //Mithril ore
o.colr = "#1D1D1D";
hl_elem.push(o);
//
o = {};
o.elem = "&nbsp;&nbsp;&nbsp;&nbsp;<b>\u041a\u043e\u0436\u0430</b>" //Skin
o.colr = "#FFA600";
hl_elem.push(o);

// ============================================


for (var i=all_td.length; i--;)
{
  var el = all_td[i];
  if (el.innerHTML=="<b>\u0420\u0435\u0441\u0443\u0440\u0441\u044b</b>")
	{
	el_edit=all_td[i+3].innerHTML;
	for(var j=0; j<hl_elem.length; j++)
	{
		el_start=el_edit.indexOf(hl_elem[j].elem);
		if (el_start>-1)
		{
                el_end=el_edit.indexOf("<br>",el_start);
		el_edit="<font style=color:"+hl_elem[j].colr+">"+hl_elem[j].elem+"</font style>" + el_edit.substring(el_start+hl_elem[j].elem.length, el_end)+'<br>'+el_edit.substring(0,el_start)+el_edit.substring(el_end+4);
		}else if (GM_getValue( "hwm_check_display" ) && GM_getValue( "hwm_check_display" ) == 1)
		{
		el_edit="<font style=color:"+hl_elem[j].colr+">"+hl_elem[j].elem+"</font style>" + ": <font style=color:#808080>0</font style>"+'<br>'+el_edit;
		}
 	}

        all_td[i+3].innerHTML='<div><label for="id_check_display" style="cursor:pointer;"><input type="checkbox" id="id_check_display">\u041f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c 0.</div>'+el_edit;
	var check_display = $('id_check_display');
	check_display.checked = ( GM_getValue( "hwm_check_display" ) && GM_getValue( "hwm_check_display" ) == 1 ) ? 'checked' : '' ;
	check_display.addEventListener( "click", setCheckDisplay , false );

        break;
	}
}

// ============================================

function setCheckDisplay()
{
	if( GM_getValue( "hwm_check_display" ) && GM_getValue( "hwm_check_display" ) == 1 )
	{
		GM_setValue( "hwm_check_display" , 0 );
	} else
	{
		GM_setValue( "hwm_check_display" , 1 );
	}
}

function $( id ) { return document.getElementById( id ); }