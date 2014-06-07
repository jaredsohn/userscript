// ==UserScript==
// @author        t0H
// @name          Travian All In One eng
// @description   All Scripts for Travian in One Script =)
// @include       *.travian.*
// @exclude       http://forum.travian.*
// @exclude       http://www.travian.*
// ==/UserScript==

var tmpInputs = document.getElementsByTagName('input');

for(var i=0; i<tmpInputs.length; i++){
	if(tmpInputs[i].type.indexOf('text') != -1){
		tmpInputs[i].focus();
		tmpInputs[i].select();
		break;
		}
	}

function img(ref, lang_dependant){ 
	return (!lang_dependant ? pack_grafico + "img/un/" + ref : pack_grafico + "img/" + idioma + '/' + ref); }
	
function pop(wc){
	xc=window.open(wc,"map","top=100,left=25,width=975,height=550,scrollbars=yes,resizable=yes");
	xc.focus();
	return false;
	}

function basename(path) { return path.replace( /.*\//, "" ); }
function get(id){ return document.getElementById(id); }

function removeElement(elem){ if (elem) elem.parentNode.removeChild(elem) }
function moveElement(elem, dest){
	removeElement(elem);
	dest.appendChild(elem);
	}
function insertAfter(node, referenceNode) {
	node.parentNode.insertBefore(referenceNode, node.nextSibling);
	}
	
function elem(tag, content){ 
	var ret = document.createElement(tag);  
	ret.innerHTML = content;  
	return ret;
	}
	
function gup( name ){
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href );
	if( results == null )	return "";
		else return results[1];
	}

function getElementsByClassName(oElm, strTagName, strClassName){ 
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);		
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];      
		if(oRegExp.test(oElement.className))
			arrReturnElements.push(oElement);
		}
	return (arrReturnElements);
	}	
//  
function create( name, attributes ) {
  var el = document.createElement( name );
  if ( typeof attributes == 'object' )
    for ( var i in attributes ) {
      el.setAttribute( i, attributes[i] );
      if ( i.toLowerCase() == 'class' ) el.className = attributes[i];  // for IE compatibility
      	else 
					if ( i.toLowerCase() == 'style' ) el.style.cssText = attributes[i]; // for IE compatibility
    }
  for ( var i = 2; i<arguments.length; i++ ) {
    var val = arguments[i];
    if ( typeof val == 'string' ) val = document.createTextNode( val );
    el.appendChild( val );
  }
  return el;
}
// 
function xy2id(x, y){ return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400))); }

function getElemText(node){
    return node.text || node.textContent || (function(node){
        var _result = "";
        if (node == null) {
            return _result;
        }
        var childrens = node.childNodes;
        var i = 0;
        while (i < childrens.length) {
            var child = childrens.item(i);
            switch (child.nodeType) {
                case 1: // ELEMENT_NODE
                case 5: // ENTITY_REFERENCE_NODE
                    _result += arguments.callee(child);
                    break;
                case 3: // TEXT_NODE
                case 2: // ATTRIBUTE_NODE
                case 4: // CDATA_SECTION_NODE
                    _result += child.nodeValue;
                    break;
                case 6: // ENTITY_NODE
                case 7: // PROCESSING_INSTRUCTION_NODE
                case 8: // COMMENT_NODE
                case 9: // DOCUMENT_NODE
                case 10: // DOCUMENT_TYPE_NODE
                case 11: // DOCUMENT_FRAGMENT_NODE
                case 12: // NOTATION_NODE
                // skip
                break;
            }
            i++;
        }
        return _result;
    }(node));
}

// coolies
function createCookie(name, value, days){
	if (days){
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
		}else var expires = "";
	document.cookie = name + "=" + value + expires + "; path=/";
	}
function readCookie(name){
		var ca = document.cookie.split(';');
		var nameEQ = name + "=";
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length); // Elimina espacios
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	}
function eraseCookie(name){ createCookie(name, "", -1); }

//  GET 
function getParam(paramName){   
	var url=document.URL.replace(paramName,'');
  if ((left=url.indexOf('?='))<0) 
		if ((left=url.indexOf('&='))<0) return null;
  return (right=url.indexOf('&',left+1))<0?url.substr(left+2):url.substr(left+2,right-left-2);
}
//-----------------------------------------------------------------------------------------------------------------//	
//     +
function GetPlus(){
	Img=document.getElementsByTagName('img');
	for (var i=0; i < Img.length; i++)
		if(Img[i].className=='logo'&&Img[i].src.indexOf('travian1.gif')!=-1)return true;
	return false;
	}
//----------------------------------------------------------------------------------------------------------------------//
//      
function cityLinks(){
   	var div = get('lright1');
		var cities = div.getElementsByTagName('tr');						
    if (!cities) return;
			
		for (var i = 0; i < cities.length; i++){
			var city = cities[i];
			getElemText(city).search(/\((.*)\n?\|\n?(.*)\)/);
			var id = xy2id(RegExp.$1, RegExp.$2);
			city.appendChild(elem("TD", "<a href='a2b.php?z=" + id + "'><img src='" + img('a/def1.gif') + "' border='0' title='إرسال تعزيزات'></a>"));
			city.appendChild(elem("TD", "<a href='build.php?z=" + id + "&gid=17'><img src='" + img('r/4.gif') + "' border='0' title='إرسال موارد'></a>"));
			i++;
		}
	}
//-----------------------------------------------------------------------------------------------------------------//	
//    
// ------------------------------//
function CommonLinks(){
	// Stable
	link1='<a href="build.php?gid=20">'+
					'<img src="'+img('g/g20.gif')+'" title="اسطبل" style="margin:0 0px"/><br>اسطبل'+'</a>';
	// Barracks 
	link2='<a href="build.php?gid=19">'+
					'<img src="'+img('g/g19.gif')+'" title="الثكنة" style="margin:0 0px"/><br>الثكنة'+'</a>';
	// Rally point
	link3='<br style="line-height:40px"/><a  href="build.php?gid=16">'+
					'<img src="'+img('g/g16.gif')+'" title="نقطة التجمع" style="margin:0 0px"/><br>نقطة التجمع'+'</a>';
	// Embassy
	link6='<a href="allianz.php">'+
					'<img src="'+img('g/g18.gif')+'" title="السفارة" style="margin:0 0px"/><br>السفارة'+'</a>';
	// Marketplace
	link5='<a href="build.php?gid=17">'+
					'<img src="'+img('g/g17.gif')+'" title="السوق" style="margin:0 0px"/><br>السوق'+'</a>';
	// Workshop
	link4='<a href="build.php?gid=21">'+
					'<img src="'+img('g/g21.gif')+'" title="المصانع الحربية" style="margin:0 0px"/><br>المصانع الحربية'+'</a>';
	// Hero's Mansion
	link7='<a href="build.php?gid=37">'+
					'<img src="'+img('g/g37.gif')+'" title="قصر الأبطال" style="margin:0 0px"/><br>قصر الأبطال'+'</a>';
	// Residence
	link8='<a href="build.php?gid=25">'+
					'<img src="'+img('g/g25.gif')+'" title="السكن" style="margin:0 0px"/><br>السكن'+'</a>';
	// Palace
	link9='<a href="build.php?gid=26">'+
					'<img src="'+img('g/g26.gif')+'" title="القصر" style="margin:0 0px"/><br>القصر'+'</a>';					
					
	txt='<p class="p1" style="width:229px; height:349px;"><table width="229" border="0" cellspacing="0">'+
	'<tr valign="bottom"><td align="center">'+ 
	link1 + '</td><td align="center">'+ 
	link2 + '</td><td align="center">'+ 
	link3 + '</td></tr>'+	
	'<tr valign="bottom"><td align="center">'+
	link4 + '</td><td align="center">'+
	link5 + '</td><td align="center">'+
	link7 + '</td></tr>'+	
	'<tr valign="bottom"><td align="center">'+
	link8 + '</td><td align="center">'+
	link9 + '</td><td align="center">'+
	link6 + '</td></tr>'+	
	'</table></p>';

	if(get("lright1")){
		var layer=get("lright1");
		layer.innerHTML+=txt;
		return true;
			}else{
				var layer=get("lmidall");
				var table;
				var td;				
				layer.appendChild(el = create( "div", { id:"lright1"}, 
					create("p",{id:'Sloy',className:'p1',style:"width:229px; height:326px;"},  
					 create( "table", {width:"229", border:"0",valign:"bottom", cellspacing:"0",cols:"0"}, 
						 create( "tbody", {},
							 	create( "tr", {valign:"bottom"}, 
								 create( "td", {id:"bookmark_1",valign:"bottom",align:"center"}, ""),
								 create( "td", {id:"bookmark_2",valign:"bottom",align:"center"}, "")),
								create( "tr", {valign:"bottom"}, 
								 create( "td", {id:"bookmark_3",valign:"bottom",align:"center"}, ""),
								 create( "td", {id:"bookmark_4",valign:"bottom",align:"center"}, "")),
								create( "tr", {valign:"bottom"}, 
								 create( "td", {id:"bookmark_5",valign:"bottom",align:"center"}, ""),
								 create( "td", {id:"bookmark_6",valign:"bottom",align:"center"},""))									
							 )))));
		get("bookmark_1").innerHTML=link1;	get("bookmark_2").innerHTML=link2;
		get("bookmark_3").innerHTML=link3;	get("bookmark_4").innerHTML=link4;
		get("bookmark_5").innerHTML=link5;	get("bookmark_6").innerHTML=link6;
		return true;
		}
	}

function Army(){
//-----------------------------------------------------------------------------------------------------------------//
//     ": "
	if (location.href.indexOf('a2b.php') != -1){
		var form=document.getElementsByTagName('form');
		if(form[0].name=='snd')
				var snd_form=form[0];
		if(snd_form)
			if(document.snd.c[1].disabled!=true) document.snd.c[1].checked=true;// 1 - 
				else document.snd.c[2].checked=true;// 2 - 
//-----------------------------------------------------------------------------------------------------------------//
//    ...  
		sd=getElementsByClassName(document,"td","f8");
		for (var i=0; i < sd.length; i++){
			txt=null;
			var a=sd[i].getElementsByTagName('A');
			if(a.length!=0)
				txt=a[0].onclick.toString().substr(a[0].onclick.toString().indexOf('document'),
																					 a[0].onclick.toString().indexOf('=')-
																						a[0].onclick.toString().indexOf('document')+1);
			if(txt)
				if(txt.length!=0)
					sd[i].innerHTML="<table><tr><td><a href=\"#\" style=\"color:#FF0000\" onClick=\""+
						txt+
						"''; return false;\">"+" <img src='" + img('a/del.gif') + "' width='12' height='12' border='0' title='Clear'>"+"</a>&nbsp;</td><td>"+
						sd[i].innerHTML+
						"</td></tr></table>";
			}
		}			
	}
//-----------------------------------------------------------------------------------------------------------------//		
//   
function DeleteMSG(){
	var value = gup( 'id' );
	logo=get('lmid2');
	//  
	if(location.href.match(/berichte.php($|\?id=)(\d+)/)){	
		logo.innerHTML = logo.innerHTML+
			'<table width="437px" class="tbg" cellspacing="1" cellpadding="2"><tr class="rbg"><td>'+
			'<form method="post" action="http://'+server+'.travian.'+idioma+'/berichte.php" name="msg">'+
			'<input type="hidden" name="n1" value="' + value + '">	'+
			'<input name="del"  class="rbg"  type="Submit" value="Delete" style="width:100%; border: 0px solid #000000;">'+
			'</form></td></tr></tbody></table>';
		}
	//  
	if(location.href.match(/nachrichten.php($|\?id=)(\d+)/)){
		logo.innerHTML = logo.innerHTML+
			'<table  class="tbg" style="width:280px;" cellspacing="1" cellpadding="2"><tr class="rbg"><td>'+
			'<form method="post" action="http://'+server+'.travian.'+idioma+'/nachrichten.php" name="msg">	'+
			'<input type="hidden" name="n1" value="' + value + '">	'+
			'<input name="delmsg" type="Submit"  class="rbg"  value="Delete" style="width:437px; border: 0px solid #000000;">'+
			'</form></td></tr></tbody></table>';
		}
	}
//----------------------------------------------------------------------------------------------------------------------//
//  ..      
function AddQuickLinks(){
	var links = document.getElementsByTagName("a");
	for(var i = 0; i < links.length; i++){
		if(links[i].href.search(/spieler.php\?uid=(\d+$)/) > 0) {
			var a = RegExp.$1;
			if (a == 0) continue;
			if (links[i].parentNode.className == 'menu') continue;

			var igmlink = elem('a', "&nbsp;<img src='" + 
																img("a/external.gif") + 
																"' style='margin:3px 0px 1px 3px; display: inline' height='10' width='10' title='" +
																'إرسال رسالة' + 
																"' alt='" + 
																'إرسال رسالة' + 
																"' border='0'>");
			igmlink.href = 'nachrichten.php?t=1&id=' + a;
			links[i].parentNode.insertBefore(igmlink, links[i].nextSibling);
			}else 
				if (links[i].href.search(/karte.php\?d=(\d+)/) > 0){
					var a = RegExp.$1;
					var atklink = elem('a',
														 "&nbsp;<img src='" + 
																img("a/att_all.gif") + 
																"' style='margin:3px 0px 1px 3px; display: inline'  title='" +
																'إرسال جيش' + 
																"' alt='" + 
																'إرسال جيش' + 
																"' border='0'>");
					atklink.href = 'a2b.php?z=' + a;
					links[i].parentNode.insertBefore(atklink, links[i].nextSibling);
					}else 
						if (links[i].href.search(/allianz.php\?aid=(\d+$)/) > 0){
							var a = RegExp.$1;
							if (a == 0) continue;
							}
		}return false;
	}	
//-----------------------------------------------------------------------------------------------------------------//	
// Select All	
function Select(){
	if((location.href.indexOf('nachrichten.php') != -1 || 
			location.href.indexOf('berichte.php') != -1)&&
		 (location.href.indexOf('id=')==-1)){
		if(document.msg.n1){
			var tbl = get('s10');
			if (!tbl){
				var messagesHtmlTable = null;
				
				var tmpTables = document.getElementsByTagName('table');
				for(var i=0; i<tmpTables.length; i++){
					if(tmpTables[i].className.indexOf('tbg') != -1){
						messagesHtmlTable = tmpTables[i];
						break;
						}
					}
				function selectAllCheckBoxes(e) {
					value = e.srcElement.checked;	
					for (var i = 1; messagesHtmlTable.tBodies[0].rows[i]; ++i) {
						messagesHtmlTable.tBodies[0].rows[i].cells[0].firstChild.checked = value;
						}
					}
				if (messagesHtmlTable) {
					var tableLength = messagesHtmlTable.tBodies[0].rows.length-1;
					if (document.location.href.match("berichte.php") && !document.location.href.match('id=')) {
						var newHeaderCell = document.createElement('td');
						newHeaderCell.setAttribute("width", "22");
						newHeaderCell.innerHTML = '<input type="Checkbox">';
						newHeaderCell.firstChild.attachEvent('onclick', selectAllCheckBoxes);
						
						messagesHtmlTable.tBodies[0].rows[tableLength].cells[0].colSpan = 1;
						messagesHtmlTable.tBodies[0].rows[tableLength].insertBefore(newHeaderCell, 
																																				messagesHtmlTable.tBodies[0].rows[tableLength].cells[0]);
						}
					if (document.location.href.match("nachrichten.php")) {
						messagesHtmlTable.tBodies[0].rows[tableLength].cells[0].innerHTML = '<input type="Checkbox">';
						messagesHtmlTable.tBodies[0].rows[tableLength].cells[0].firstChild.attachEvent('onclick', selectAllCheckBoxes);
						}
					}	
				}
			}
		}return false;
	}
//-----------------------------------------------------------------------------------------------------------------//	
//   +
function HideTravianPlus(){
	if(get("ltop5")){
		var barra = get("ltop5");
		var a=barra.getElementsByTagName('a');
		for (var i=0; i < a.length; i++)
			if(a[i].href=='http://'+server+'.travian.'+idioma+'/plus.php'){
				removeElement(a[i]);
				break;
				}
		}return false;
	}
//----------------------------------------------------------------------------------------------------------------------//
// 	
function CoolMap(){
	if(get("map_content")){
		var element = get('map_content');
		var x = get('x').innerHTML;
		var y = get('y').innerHTML;	
		var url = 'http://www.a-koss.ru/trav/map/'+server+'?'+'xp='+x+'&yp='+y;
		if (!plus) //  +  
			element.innerHTML +=
				"<a style=\"position:absolute; top:88px; left:26px; z-index:1000; position:absolute;\" href=\""+
				url+
				"\" target=\"_blank\" onClick=\"return pop('"+
				url+
				"');\"><img title=\"Big map\" alt=\"Big map\" src=\"img/un/m/max.gif\" /></a>";
				else{ //   ,    
					var link_ = map.getElementsByTagName("A")[0];
					link_.setAttribute("href", url);
					link_.setAttribute("onclick", "return pop('"+url+"')");								
					}
		}return false;
	}
//----------------------------------------------------------------------------------------------------------------------//
// 
function agregarElementoCookie(cookie, values){
	var nuevo = '';
	for (var i = 0; i < values.length; i++){ 
		if (values[i] != ''){ 
			nuevo += values[i]; 
			if (i != values.length - 1) nuevo += '$'; 
			}else return;
		}
	var a = readCookie(cookie + "_" + server);
	if (a != null && a != '') a += "$$" + nuevo;
	else a = nuevo;
	createCookie(cookie + "_" + server, a, 365);
	}	
function crearEventoEliminarCookie(cookie, num){
	var a = readCookie(cookie + "_" + server);
	if (a != null){
		a = a.split("$$");
		a.splice(num, 1);
		createCookie(cookie + "_" + server, a.join("$$"), 365);
		document.BOOKMARKS_FORM.submit();
		}
	}
function Bookmarks(){ 
	var a = prompt('Enter URL', 'http://'); 
	if (a == null || a == '') return;
	var b = prompt('Enter Name','Link name');
	if (b == null || b == '') return;
	agregarElementoCookie("BOOKMARKS", [b, a]);
	document.BOOKMARKS_FORM.submit();
	}
function obtenerValorCookie(cookie){
	var b = readCookie(cookie); if (b != null && b != ''){ createCookie(cookie + "_" + server, b, 365); eraseCookie(cookie); }
	var res = new Array();
	var a = readCookie(cookie + "_" + server);
	if (a != null && a != ''){
		a = a.split("$$");
		for (var i = 0; i < a.length; i++) res[i] = a[i].split("$");
		}
	return res;
	}
function CreateBookmarks(){	
	var leftmenu=get('lleft');
		if(leftmenu){
			leftmenu.innerHTML+='<br /><hr style="width:90%;border-top:1px #CCCCCC dashed; border-bottom:1px #FFFFFF solid;"><p id="leftCookies"  style="margin:13px;margin-top:5px;margin-right:0px"><b class="f10">'+ 
													'إضافة روابط '+
													'<a href="javascript:void(0)" onClick="Bookmarks();" style="font-size:10px">(+)</a><br /><br />'+
													'</b></p><p id="formCookies"><form name="BOOKMARKS_FORM" method="get"></form></p>';
		
		
		var bookmarks = obtenerValorCookie("BOOKMARKS");
		p=get('leftCookies');
		txt='<table style="width:135px;">';
		for (var i = 0; i < bookmarks.length; i++){
			url=bookmarks[i][1].substr(0,7);
			if(url!='http://')
				bookmarks[i][1]='http://'+bookmarks[i][1];
			txt+='<tr><td><a href="'+
										bookmarks[i][1]+
										'">'+
										bookmarks[i][0]+
										'</a></td><td><a href="javascript:void(0)" style="color:#FF0000" onclick="crearEventoEliminarCookie(\'BOOKMARKS\','+i+')">'+" <img src='" + img('a/del.gif') + "' width='12'  border='0' title='Delete'>"+'</a></td></tr>';
			}
		p.innerHTML+=txt+'</table>';
		}return false;
	}
//-----------------------------------------------------------------------------------------------------------------//	
//  
function opcionMenuSuperior(texto){
	var a = getElementsByClassName(document,"p",'txt_menue');
	if(a) a[0].innerHTML += texto;
	}
	
function opcionOcultaMensajes(){if (!plus) opcionMenuSuperior(' | <a href="nachrichten.php?t=3">الأرشيف</a>'); }
function opcionOcultaInformes(){if (!plus) opcionMenuSuperior(' | <a href="berichte.php?t=5">الأرشيف</a>'); }

function opcionesMensajes(){
	var a = getElementsByClassName(document,'td','s7');
	for (var i = 0; i < a.length; i++){
		var fila = a[i];
		if ((fila.firstChild != null) && (fila.firstChild.nodeName == "INPUT")){
			fila.innerHTML += '&nbsp;&nbsp;';
			if (!plus) fila.innerHTML += '<input style="font-weight:bold; font-size:8pt; height:14pt" name="archive" type="Submit" value="إضافة للأرشيف"/>';
			return;
			}
		}
	}
//-----------------------------------------------------------------------------------------------------------------//
//     :)  
function ReSize(id,size,geometry){
	var left=get(id);
	if(geometry=='w')
		left.style.width=size+'px';
		else
			left.style.height=size+'px';
	}
function LZ(n){	return (n > 9 ? n : '0' + n); }
function formatear_tiempo(s){
	if(s > -1){
		var horas = Math.floor(s/3600);
		var minutos = Math.floor(s/60) % 60;
		var segundos = s % 60;
		var t = horas + ":" + LZ(minutos) + ":" + LZ(segundos);
		}else var t = "0:00:0?";
		return t;
	}
//-----------------------------------------------------------------------------------------------------------------//
//  
function calculateFillTime(){
	for (var i = 0; i < 4; i++){
		if (produccion[i] < 0) var tiempo = Math.round(actual[i] / -produccion[i]);
			else if (produccion[i] == 0) var tiempo = -1;
				else var tiempo = Math.round((total[i] - actual[i]) / produccion[i]);

		var produccionHora = get('l' + (4-i)).title;
		var tiempoRestante = "<span id='timeouta_"+i+"' style='font-weight:bold;'>" + formatear_tiempo(tiempo) + "</span>";
		var celda = elem("DIV", "<span style='font-size:9px; position: absolute; top:13px; height: 20px;'>(" + 
														'<font color="#0066FF">'+
														(produccionHora > 0 ? '+' : '') + 
														produccionHora + 
														'</font>, ' + 
														(produccionHora < 0 ? '<font color="#003399">' + tiempoRestante + '</font>' : tiempoRestante) + 
														')</span>');
		var a = get('l'+(4-i)).previousSibling;
		if (a.nodeName == '#text') a = a.previousSibling;
		a.appendChild(celda);
		celda.align='center';
		}
	}
function calcular_segundos(myElement) {
	var p = myElement.split(":");
	return (p[0] * 3600) + (p[1] * 60) + (p[2] * 1);
	}
	
function setTimers(){
	setInterval(
		function () {
			for (var i = 0; i < 4; i++){										
				var relojes = get('timeouta_'+i);
				var tiempo = calcular_segundos(relojes.innerHTML) - 1;
				if (tiempo >= 0) relojes.innerHTML = formatear_tiempo(tiempo);
				}
			}
		,1000);
	}
//-----------------------------------------------------------------------------------------------------------------//
//    
var actual = new Array(4);		
var total = new Array(4);	
var produccion = new Array(4);

function GetDate(){
	for (var i = 0; i < 4; i++){
		var a = get('l' + (4-i));
		actual[i] = a.innerHTML.split("/")[0];
		total[i] = a.innerHTML.split("/")[1];
		produccion[i] = a.title/3600;
		}
	}	
//-----------------------------------------------------------------------------------------------------------------//
//    
function CutMenu(){
	var menu = getElementsByClassName(document,'td','menu')[0];
	for (var j = 0; j < 2; j++) 
		for (var i = 0; i < menu.childNodes.length; i++){
			if (menu.childNodes[i].nodeName == 'BR') removeElement(menu.childNodes[i]);	
			if(menu.childNodes[i].nodeName == 'A')
				if(menu.childNodes[i].href.indexOf('support.php')!=-1||
					 menu.childNodes[i].href.indexOf('logout.php')!=-1||
//						menu.childNodes[i].href.indexOf('forum.travian.')!=-1||
						menu.childNodes[i].href.indexOf('chat.php')!=-1)removeElement(menu.childNodes[i]);}
			
	for (var j = 0; j < 2; j++) 
		for (var i = 0; i < menu.childNodes.length; i++)
			if (menu.childNodes[i].nodeName == 'BR') removeElement(menu.childNodes[i]);	
var links = [	['محاكي المعركة', "warsim.php"],
						 //戰鬥模擬器;
						 0,
						 ['تسجيل الخروج', "login.php"]
						 //,['Exit','logout.php'] 
						 ];			
		for(var i = 0; i < links.length; i++){
			if(links[i]){
				var a = elem("A", links[i][0]);
				a.href = links[i][1];
				if(links[i][2]) a.setAttribute('target', links[i][2]);
				menu.appendChild(a);
			}else menu.appendChild(document.createElement('BR'));
			}
}

function Calculate_Report(){
	var DEF_UNDERSCORE = "_";
	var DEF_PARTKEY_PREFIX = getServerName() + DEF_UNDERSCORE + getUserId() + DEF_UNDERSCORE;
	var DEF_PARTKEY_REPORTSACTION = "reportsAction";
	var DEF_GRAPHIC_PACK_PREFIX = "";
	
	//tribes
	var DEF_TRIBE_ROMAN = 0;
	var DEF_TRIBE_GAUL = 1;
	var DEF_TRIBE_TEUTON = 2;
	var DEF_TRIBE_NATURE = 3;
	var DEF_TRIBE_NATAR = 4;
	var DEF_TRIBE_UNDISCLOSED = 5;
	
	//troops cost (wood, clay, iron, wheat, crop usage)
	var DEF_TROOPS_COST = new Array();
	DEF_TROOPS_COST[DEF_TRIBE_ROMAN]  = [ [120,100,180,40,1], [100,130,160,70,1], [150,160,210,80,1], [140,160, 20,40,2], [550,440,320,100,3], [550,640,800,180,4], [ 900,360,500,70,3], [950,1350,600,90,6], [30750,27200,45000,37500,5], [5800,5300,7200,5500,1] ];
	DEF_TROOPS_COST[DEF_TRIBE_GAUL]   = [ [100,130, 55,30,1], [140,150,185,60,1], [170,150, 20,40,2], [350,450,230,60,2], [360,330,280,120,2], [500,620,675,170,3], [ 950,555,330,75,3], [960,1450,630,90,6], [30750,45400,31000,37500,4], [5500,7000,5300,4900,1] ];
	DEF_TROOPS_COST[DEF_TRIBE_TEUTON] = [ [ 95, 75, 40,40,1], [145, 70, 85,40,1], [130,120,170,70,1], [160,100, 50,50,1], [370,270,290, 75,2], [450,515,480, 80,3], [1000,300,350,70,3], [900,1200,600,60,6], [35500,26600,25000,27200,4], [7200,5500,5800,6500,1] ];
	DEF_TROOPS_COST[DEF_TRIBE_NATURE] = [ [  0,  0,  0, 0,1], [  0,  0,  0, 0,1], [  0,  0,  0, 0,1], [  0,  0,  0, 0,1], [  0,  0,  0,  0,2], [  0,  0,  0,  0,2], [   0,  0,  0, 0,3], [  0,   0,  0, 0,3], [    0,    0,    0,    0,3], [   0,   0,   0,   0,5] ];
	DEF_TROOPS_COST[DEF_TRIBE_NATAR]  = [ [  0,  0,  0, 0,0], [  0,  0,  0, 0,0], [  0,  0,  0, 0,0], [  0,  0,  0, 0,0], [  0,  0,  0,  0,0], [  0,  0,  0,  0,0], [   0,  0,  0, 0,0], [  0,   0,  0, 0,0], [    0,    0,    0,    0,0], [   0,   0,   0,   0,0] ];
	
	//troops attributes (attack, infantry defense, cavalry defense, speed)
	var DEF_TROOPS_ATTRIBUTES = new Array();
	DEF_TROOPS_ATTRIBUTES[DEF_TRIBE_ROMAN]  = [ [40,35,50, 6], [30,65,35, 5], [70,40,25, 7], [ 0,20,10,16], [120, 65,50,14], [180,80,105,10], [ 60, 30, 75, 4], [ 75, 60, 10, 3], [ 50, 40, 30, 4], [  0, 80, 80, 5] ];
	DEF_TROOPS_ATTRIBUTES[DEF_TRIBE_GAUL]   = [ [15,40,50, 7], [65,35,20, 6], [ 0,20,10,17], [90,25,40,19], [ 45,115,55,16], [140,50,165,13], [ 50, 30,105, 4], [ 70, 45, 10, 3], [ 40, 50, 50, 5], [  0, 80, 80, 5] ];
	DEF_TROOPS_ATTRIBUTES[DEF_TRIBE_TEUTON] = [ [40,20, 5, 7], [10,35,60, 7], [60,30,30, 6], [ 0,10, 5, 9], [ 55,100,40,10], [150,50, 75, 9], [ 65, 30, 80, 4], [ 50, 60, 10, 3], [ 40, 60, 40, 4], [ 10, 80, 80, 5] ];
	DEF_TROOPS_ATTRIBUTES[DEF_TRIBE_NATURE] = [ [10,25,10,20], [20,35,40,20], [60,40,60,20], [80,66,50,20], [ 50, 70,33,20], [100,80, 70,20], [250,140,200,20], [450,380,240,20], [200,170,250,20], [600,440,520,20] ];
	DEF_TROOPS_ATTRIBUTES[DEF_TRIBE_NATAR]  = [ [ 0, 0, 0, 0], [ 0, 0, 0, 0], [ 0, 0, 0, 0], [ 0, 0, 0, 0], [  0,  0, 0, 0], [  0, 0,  0, 0], [  0,  0,  0, 0], [  0,  0,  0, 0], [  0,  0,  0, 0], [  0,  0,  0, 0] ];
	
	// bounty each troop can carry, troops ordered by each tribe, tribe ordered by: romans, gauls, teutons
	var DEF_TROOPS_BOUNTY_LOAD = new Array();
	DEF_TROOPS_BOUNTY_LOAD[DEF_TRIBE_ROMAN]  = [ 40, 20, 50, 0, 100, 70, 0, 0, 0, 3000, 0 ];
	DEF_TROOPS_BOUNTY_LOAD[DEF_TRIBE_GAUL]   = [ 30, 45, 0, 75,  35, 65, 0, 0, 0, 3000, 0 ];
	DEF_TROOPS_BOUNTY_LOAD[DEF_TRIBE_TEUTON] = [ 60, 40, 50, 0, 110, 80, 0, 0, 0, 3000, 0 ];
	DEF_TROOPS_BOUNTY_LOAD[DEF_TRIBE_NATURE] = [  0,  0,  0, 0,   0,  0, 0, 0, 0,    0, 0 ];
	DEF_TROOPS_BOUNTY_LOAD[DEF_TRIBE_NATAR]  = [  0,  0,  0, 0,   0,  0, 0, 0, 0,    0, 0 ];
	
	//troop type: infantry, cavalry or other (used when displaying attack value)
	var DEF_TROOP_TYPE_INFANTRY = 0;
	var DEF_TROOP_TYPE_CAVALRY = 1;
	var DEF_TROOP_TYPE_OTHER = 2;
	
	var DEF_TROOPS_TYPE = new Array();
	DEF_TROOPS_TYPE[DEF_TRIBE_ROMAN] = [ DEF_TROOP_TYPE_INFANTRY, DEF_TROOP_TYPE_INFANTRY, DEF_TROOP_TYPE_INFANTRY, DEF_TROOP_TYPE_CAVALRY, DEF_TROOP_TYPE_CAVALRY, DEF_TROOP_TYPE_CAVALRY, DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER ];
	DEF_TROOPS_TYPE[DEF_TRIBE_GAUL] = [ DEF_TROOP_TYPE_INFANTRY, DEF_TROOP_TYPE_INFANTRY, DEF_TROOP_TYPE_CAVALRY, DEF_TROOP_TYPE_CAVALRY, DEF_TROOP_TYPE_CAVALRY, DEF_TROOP_TYPE_CAVALRY, DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER ];
	DEF_TROOPS_TYPE[DEF_TRIBE_TEUTON] = [ DEF_TROOP_TYPE_INFANTRY, DEF_TROOP_TYPE_INFANTRY, DEF_TROOP_TYPE_INFANTRY, DEF_TROOP_TYPE_INFANTRY, DEF_TROOP_TYPE_CAVALRY, DEF_TROOP_TYPE_CAVALRY, DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER ];
	DEF_TROOPS_TYPE[DEF_TRIBE_NATURE] = [ DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER ];
	DEF_TROOPS_TYPE[DEF_TRIBE_NATAR] = [ DEF_TROOP_TYPE_INFANTRY, DEF_TROOP_TYPE_INFANTRY, DEF_TROOP_TYPE_INFANTRY, DEF_TROOP_TYPE_INFANTRY, DEF_TROOP_TYPE_CAVALRY, DEF_TROOP_TYPE_CAVALRY, DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER ];
	DEF_TROOPS_TYPE[DEF_TRIBE_UNDISCLOSED] = [ DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER, DEF_TROOP_TYPE_OTHER ];
	
	//space for the field name information
	var fields= [];
	
	/** 
	 * get the table containing the items (messages or reports)
	 */ 
	var itemsHtmlTable = null;
	var tmpTables = document.getElementsByTagName('table');
	for(var i=0; i<tmpTables.length; i++){
		if(tmpTables[i].className.indexOf('tbg') != -1){
			itemsHtmlTable = tmpTables[i];
			break;
		}
	}
	//now check if this table is the address book
	if (itemsHtmlTable) {
		var tds = itemsHtmlTable.getElementsByTagName('td');
		for (var i=0;i<tds.length;i++) {
			if (tds[i].className.indexOf('addr')!=-1) {
				itemsHtmlTable = null;
				break;
				}
			}
		}
	
	//gets the graphic pack path if it is active
	getGraphicPackPathPrefix();
	
	//gets the name of the resource fields
	fields=getResourceFieldNames();
	
	/**
	 * note abote the href check in delete report by type section:
	 *  
	 * when deleting a report from any other page then main (berichte.php without the t param)
	 * Travian server refreshes the page and instead of getting back to that report type page
	 * it redirects the browser to main reports page. this interferes with auto deletion sequence
	 * which is designed to delete reports of the given kind, then refresh the page with reports
	 * of that kind and if still any exist, delete them, refresh the page, etc. since refreshing 
	 * gets us back to main page we have to make sure that the URL check doesn't trigger the
	 * action to stop. that is why we have:
	 *    document.location.href.indexOf(load_ReportsAction()) > -1
	 * instead of:
	 *    document.location.href == load_ReportsAction
	 * this, on the other hand, has the effect that when clicking to delete reports of any kind
	 * (all button) and then skipping to any other report type page before the delete action
	 * finishes, instead of canceling the action, the action will continue to execute.
	 * yet, since chosing to delete all reports this doesn't really matter   
	 */ 
	
	if (isThisBattleReportPage()) {
		//if this is single item page, check if it's battle report and then add the additional info
	
		addBattleInfo();
	
	} else if (itemsHtmlTable) {
		//if table exists add auto next page function and do the transformations
			
		//add a checkbox to quickly select all items
		//addSelectAllCheckBox();
		//add a event listener for key down
		document.onkeydown = action_goToNextPage;
		
		//if this is reports page add delete by type buttons
		if (document.location.href.match("berichte.php")) {
	
			//addDeleteReportByTypeButtons();
			
			//if we got here after pressing a delete by type button which refreshes the page
			//it means that a delete action is waiting to be executed
			if (exists_ReportsAction()) {
				if (load_ReportsAction().indexOf(document.location.href)>-1) {
					//if we are on the correct report type page, do the deletion
					deleteReportsOfGivenKind();
				} else {
					//if not, it's possible that the user canceled the action in browser so remove the action flag
					reset_ReportsAction();
					}
				}
			}
	
	}
	
	/**
	 * adds a select all checkbox to messages/reports list
	 * the code is different for reports and messages pages since they have
	 * different items html table structures  
	 */ 
	function addSelectAllCheckBox() {
		var tableLength = itemsHtmlTable.rows.length-1;
	
		if (document.location.href.match("berichte.php") && !document.location.href.match('id=')) {
			//this is for reports page
	
			//create the checkbox
			var chkbox = document.createElement('input');
			chkbox.type = 'checkbox';
			chkbox.id = 'selectallchkbox';
			chkbox.onclick = selectAllCheckBoxes;
			
			//table cell for the checkbox
			var newHeaderCell = document.createElement('td');
			newHeaderCell.width = 22;
			newHeaderCell.appendChild(chkbox);
			
			//append the table cell
			itemsHtmlTable.rows[tableLength].cells[0].colSpan = 1;
			itemsHtmlTable.rows[tableLength].insertBefore(newHeaderCell, itemsHtmlTable.rows[tableLength].cells[0]);
		
		} else if (document.location.href.match("nachrichten.php")) {
			//this is for messages page
	
			//create the checkbox
			var chkbox = document.createElement('input');
			chkbox.type = 'checkbox';
			chkbox.onclick = selectAllCheckBoxes;
	
			//add the checkbox to the table
			itemsHtmlTable.rows[tableLength].cells[0].appendChild(chkbox);
	
		}
	}
	
	/**
	 * event handler for select all checkbox
	 * first checks if the table is not empty, i.e. if first cell of the second 
	 * table row contains an input tag (checkbox)
	 * then iterates through table rows and sets checked property of each checkbox   
	 */ 
	function selectAllCheckBoxes() {
	
		if (itemsHtmlTable.rows[1].cells[0].firstChild.nodeName!='INPUT')
			return;
	
		value = event.srcElement.checked;
		for (var i = 1; itemsHtmlTable.rows[i]; i++) {
			itemsHtmlTable.rows[i].cells[0].firstChild.checked = value;
		}
	
	}
	
	/**
	 * adds buttons that delete reports by type
	 * button titles are fetched from links on all reports page so that they are displayed in server's language
	 * buttons are added next to existing 'delete' button and because of limited space
	 * their names are truncated to only first three letters of each report type name    
	 */ 
	function addDeleteReportByTypeButtons() {
	
		//this is already existing delete button which deletes only selected items
		var inputs = document.getElementsByTagName('input');
		var deleteButton = null;
		for (var i=0;i<inputs.length;i++) {
			if (inputs[i].className=='std') {
				deleteButton = inputs[i];
				break;
				}
			}
	
		//make sure we're not on a single report page
		if (!deleteButton)
			return;
		
		//fetch titles and add buttons with appropriate event handlers
		var td = deleteButton.parentNode;
		var as = document.getElementById('lmid2').getElementsByTagName('p')[0].getElementsByTagName('a');
		for (var i=0;i<as.length;i++) {
			var button = document.createElement('input');
			button.type = 'button';
			button.className = 'std';
			button.id = as[i].href;
			button.value = as[i].innerHTML.substr(0,3);
			button.onclick = action_deleteReports;
			td.appendChild(button);
			}
	}
	
	/**
	 * deletes the reports of the given type on current and following pages (if any exist)
	 */ 
	function deleteReportsOfGivenKind() {
		//check if there are any reports by counting checkboxes
		if (itemsHtmlTable.rows[1].cells[0].firstChild.nodeName!='INPUT') {
			//if there are no more reports for deletion, remove the action and go back to all reports page
			reset_ReportsAction();
			document.location.href = document.getElementById('lmid2').getElementsByTagName('p')[0].getElementsByTagName('a')[0].href;
		} else {
			//delete everything on the current page
			document.getElementById('selectallchkbox').click();
			//this forces the form to submit and thus refreshes the page repeating the action until there are no more reports
			itemsHtmlTable.rows[itemsHtmlTable.rows.length-1].cells[1].getElementsByTagName('input')[0].click();
			}
	}
	
	/**
	 * event listener for delete reports buttons
	 * saves the action to delete reports of a certain type
	 * then changes current page to the page with reports of that type where the deletion occurs   
	 */ 
	function action_deleteReports() {
		save_ReportsAction(this.id);
		document.location.href = this.id;
	}
	
	/**
	 * event listener for next page shortcut functionality on space bar press
	 */ 
	function action_goToNextPage() {
	
		if(String.fromCharCode(event.keyCode)==" ") {
		
			var DEF_CHAR_RAQUO = unescape('%BB');
			//find an <a> with righ angle quotes char
			var links = document.getElementsByTagName("a");
			var i;
			for(i=0; i<links.length; i++) {
				if (links[i].innerHTML.indexOf(DEF_CHAR_RAQUO) == 0) {
					break;
					}
			 }
			if (i != links.length) {
				//now go to that page
				document.location.href = links[i].href;
				}
			
			//prevents browser from handling the space bar press (usually it's used to scroll down)
			return false;
		}
	
	}
	
	/**
	 * checks if the current page is a battle report details page
	 * this is done by searching for a <td> with class="unit"
	 */  
	function isThisBattleReportPage() {
		
		var retVal = false;
		if (document.getElementById('lmid2').getElementsByTagName('table').length>1) {
			
			var trs = document.getElementById('lmid2').getElementsByTagName('table')[1].getElementsByTagName('tr');
			for (var i=0;i<trs.length;i++) {
				if (trs[i].className=='unit') {
					retVal = true;
					break;
					}
				}
			
		}
		
		return retVal;
		
		}
	
	/**
	 * adds additional information to the battle report such as cost of lost units
	 * and some extra statistics (still haven't decided what) :)
	 * 
	 * there are multiple HTML structures of this page depending of type of battle
	 * report (reinforcements were attacked, battle report with no return information,
	 * battle report with none or many reinforcement tribes, etc.)
	 * yet, the basic structure is the same: inside lmid2 is a table that contains
	 * player details and attack time. inside it are multiple child table elements,
	 * each containing information about single player's military losses (and possible bounty)
	 * 
	 * TODO: add support for translation of table titles
	 * TODO: add total training time for lost troops (maybe)    
	 */  
	function addBattleInfo() {
	
		//get all the tables that hold military information for each player
		var tables = document.getElementById('lmid2').getElementsByTagName('table')[0].getElementsByTagName('table');
		var totalResLosses;
		var totalBounty;
		var attackersBounty = 0;    //holds info about how much resources the attacker got, this is later added to first defenders losses
		
		//transform each table
		for (var i=0;i<tables.length;i++) {
	
			//get tribe data, used to calculate troop information later
			var tribe = getTribeBySettlerImage(i);
	
			//add the transformations
			if (tables[i].rows.length>3) {
				transformBattleReport_addSurvivors(tables[i]);
				totalBounty = transformBattleReport_addBountySums(tables[i], tribe);
				if (i==0) attackersBounty=totalBounty;
				totalResLosses = transformBattleReport_addLostUnitsCost(tables[i], tribe);
				transformBattleReport_addTotals(tables[i], tribe, totalResLosses, totalBounty,(i==1)?attackersBounty:0, i==0);
				}
			}
	
		}
	
	/**
	 * adds a row with number of survived troops
	 */ 
	function transformBattleReport_addSurvivors(table) {
		var row = table.insertRow(4);
		var cell;
		for (var survived=0,cellc=table.rows[2].cells.length-1;cellc>0;cellc--) {
			cell = row.insertCell(0);
			survived = table.rows[2].cells[cellc].innerText - table.rows[3].cells[cellc].innerText;
			cell.appendChild(document.createTextNode(survived));
			if (survived==0)
				cell.className='c';
			}
		cell = row.insertCell(0);
		cell.appendChild(document.createTextNode('الناجون'));
		}
	
	/**
	 * adds total bounty and success percent
	 */ 
	function transformBattleReport_addBountySums(table, tribe) {
		var bounty = getBountyRow(table);
		var bountyValues = new Array(0,0,0,0);
		var totalBounty = 0;
		
		if (bounty) {
			//calculate the total obtained bounty 
			var bountyValues = bounty.getElementsByTagName('td')[1].innerText.split(' ');
			for (var k=0;k<bountyValues.length;k++)
				totalBounty += parseInt(bountyValues[k]);
			
			//possible bounty depends of sent troops and their load capacity
			var possibleBounty = 0;
			for (var k=1;k<11;k++) {    //skip heroes
				possibleBounty += table.rows[4].cells[k].innerText * DEF_TROOPS_BOUNTY_LOAD[tribe][k-1];
				}
			var bountyValue = '  ['+totalBounty;
			if (possibleBounty!=0)
				bountyValue += ' / '+Math.round(totalBounty/possibleBounty*100)+'%';
			bountyValue += ']';
			bounty.getElementsByTagName('td')[1].appendChild(document.createTextNode(bountyValue));
			}
		
		return totalBounty;
		
		}
		
	/**
	 * adds total resource cost for lost troops
	 */ 
	function transformBattleReport_addLostUnitsCost(table, tribe) {
			var resLosses = new Array(0,0,0,0);
			var totalResLosses = 0;    
			var totalUnits = 0;
			var totalLost = 0;
			
			var row = table.insertRow(table.rows.length);
			row.className = 'cbg1';
			//calculate resource cost for lost troops
			for (var losses=0, k=1;k<11;k++) {
				totalUnits += parseInt(table.rows[2].cells[k].innerText);
				losses = parseInt(table.rows[3].cells[k].innerText);
				totalLost += losses;
				if (losses>0) {
					for (r=0;r<4;r++) {
						resLosses[r] += losses*DEF_TROOPS_COST[tribe][k-1][r];
						}
					}
				}
				
			//add the cell with images and cost values
			cell = row.insertCell(0);
			cell.colSpan = 11;
			cell.className = 's7';
			for (r=0; r<4; r++) {
				img = document.createElement('img');
				img.className = 'res';
				img.title = fields[r];
				img.src = DEF_GRAPHIC_PACK_PREFIX+'img/un/r/'+(r+1)+'.gif';
				cell.appendChild(img);
				cell.appendChild(document.createTextNode(resLosses[r]+' '));
				totalResLosses += resLosses[r];
				}
			//add total resource losses value
			var totalValue = ' ['+totalResLosses;
			if (totalUnits!=0)
				totalValue += ' / '+Math.round(totalLost/totalUnits*100)+'%';
			totalValue += ']';
			cell.appendChild(document.createTextNode(totalValue));
			//title cell, text is in server language
			cell = row.insertCell(0);
			cell.appendChild(document.createTextNode(table.rows[3].cells[0].innerText));
			
			return totalResLosses;
		}
	
	/**
	 * adds summary data (attack and defense strengths, resource gain/loss)
	 * for attacker display separate attack values for infantry and cavalry
	 * for defenders display only defence value  
	 */ 
	function transformBattleReport_addTotals(table, tribe, totalResLosses, totalBounty,attackersBounty, isAttacker) {
			row = table.insertRow(table.rows.length);
			row.className = 'cbg1';
			cell = row.insertCell(0);
			cell.colSpan = 11;
			cell.className = 's7';
			
			var strength = new Array(0,0,0);
			var troopType = 0;
			
			for (var i=1;i<11;i++) {
				if (isAttacker) {
					troopType = DEF_TROOPS_TYPE[tribe][i-1];
					strength[troopType] += table.rows[2].cells[i].innerText*DEF_TROOPS_ATTRIBUTES[tribe][i-1][0];
				} else {
					for (var j=0;j<2;j++) {
						strength[j] += table.rows[2].cells[i].innerText*DEF_TROOPS_ATTRIBUTES[tribe][i-1][j+1];
						}
				}
			}
	
			var title = ' ';
			if (isAttacker) {
				title = '';
				img = document.createElement('img');
				img.title = 'قوة هجوم المشاة';
				img.src = DEF_GRAPHIC_PACK_PREFIX+'img/un/a/att_all.gif';
				cell.appendChild(img);
			}
			img = document.createElement('img');
			img.title = 'قوة الدفاع ضد المشاه '+title;
			img.src = DEF_GRAPHIC_PACK_PREFIX+'img/un/a/def_i.gif';
			cell.appendChild(img);
			cell.appendChild(document.createTextNode(strength[0]+' '));
	
			if (isAttacker) {
				title = ' ';
				img = document.createElement('img');
				img.title = 'قوة هجوم الفرسان';
				img.src = DEF_GRAPHIC_PACK_PREFIX+'img/un/a/att_all.gif';
				cell.appendChild(img);
			}
			img = document.createElement('img');
			img.title = 'قوة الدفاع ضد الفرسان'+title;
			img.src = DEF_GRAPHIC_PACK_PREFIX+'img/un/a/def_c.gif';
			cell.appendChild(img);
			cell.appendChild(document.createTextNode(strength[1]+' '));
			
			
			var span = document.createElement('span');
			var result = totalBounty-totalResLosses-attackersBounty;
			span.className = (result<0)?'c2 b':'c1 b';
			img = document.createElement('img');
			img.src = DEF_GRAPHIC_PACK_PREFIX+'img/un/r/6.gif';
			img.title = 'Total Loose Resouce'
			span.appendChild(img);
			span.appendChild(document.createTextNode(result));
			cell.appendChild(span);
	
			//title cell
			cell = row.insertCell(0);
			cell.appendChild(document.createTextNode('المجمـوع'));
	
		}
	
	/**
	 * iterates through table searching for row with bounty values
	 * it is the row with 4 <img> tags
	 */  
	function getBountyRow(table) {
		var bounty = null;
		var trs = table.getElementsByTagName('tr');
		for (var j=0;j<trs.length;j++) {
			if (trs[j].className=='cbg1') {
				if (trs[j].getElementsByTagName('img').length==4) {
					bounty = trs[j];
					break;
					}
				}
			}
		return bounty;
	}
	
	/**
	* gets the tribe name by looking at the gifs of the settlers
	* pos - if multiple tribes are present, which one to get info about 
	*/
	function getTribeBySettlerImage(pos) {
		
		var imgs = document.getElementById('lmid2').getElementsByTagName('img');
		var settlerImgs = new Array();
		for (var i=0;i<imgs.length;i++) {
			if (imgs[i].src.indexOf('img/un/u/')!=-1 && imgs[i].src.indexOf('0.gif')!=-1)
				settlerImgs.push(imgs[i]); 
			}
		
		var imgNo = parseInt(settlerImgs[pos].src.substr(settlerImgs[pos].src.indexOf("0.gif") - 1, 2));
	
		switch (imgNo) {
			case 10: return DEF_TRIBE_ROMAN;
			case 20: return DEF_TRIBE_TEUTON;
			case 30: return DEF_TRIBE_GAUL;
			case 40: return DEF_TRIBE_NATURE;
			case 50: return DEF_TRIBE_NATAR;
			case 60: return DEF_TRIBE_UNDISCLOSED;
			default: alert("New tribe?!?!?"); return;
		}
	}
	
	/**
	 * Gets current server name
	 * used to differentiate users when saving settings  
	 */
	function getServerName() {
		return location.href.match(/([\w]+[.]travian([\d]?).[\w]+([.][\w]+)?)/i)[1];
	}
	
	/**
	 * Gets the current player id from profile link
	 * used to differentiate users when saving settings  
	 */ 	
	function getUserId() {
		var as = document.getElementsByTagName('a');
		var userID = null;
		for (var i=0;i<as.length;i++) {
			if (as[i].href.indexOf('spieler.php?uid=')!=-1) {
				userID = as[i];
				break;
				}
			}
		return getParamFromUrl(userID.href, "uid");
	}
	
	/**
	 * getParamFromUrl
	 * url - The string of the URL
	 * urlParam - The param being searched in the URL
	 */
	function getParamFromUrl(url, urlParam) {
		var res = "&" + url.substring(url.indexOf("?") + 1); //exclude "?" and before that
		//first check if urlParam is not the only param and not the first param
		var searchStr = "&" + urlParam + "=";
		var pos = res.indexOf(searchStr);
		if (pos != -1) {
			//now check if urlParam is the first parameter in URL
			res = res.substring(res.indexOf(searchStr) + searchStr.length);
			//check if there are more parameters following the urlParam and strip them
			var moreParams = res.indexOf("&");
			if (moreParams != -1) {
				res = res.substring(0, moreParams);
			}
			//finally remove the hash mark (browsers sometimes add these to the end of the URL)
			return res.replace("#", "");
		} else {
			return "";
		}
	}
	
	/**
	 * checks if graphics pack is active and gets its path
	 */ 
	function getGraphicPackPathPrefix() {
		var woodImgUrl = "img/un/r/1.gif";
		var imgs = document.getElementsByTagName('img');
		for (var i=0;i<imgs.length;i++) {
			if (imgs[i].src.indexOf('img/un/r/1.gif')>-1) {
				var imgSrc = imgs[i].src;
				DEF_GRAPHIC_PACK_PREFIX = unescape(imgSrc.replace(woodImgUrl, "").replace("///", "//"));
				break;
				}
			}
	}
	
	/** 
	 * gets the resource filed names from the resources div
	 */
	function getResourceFieldNames(){
		var orgbar=returnObjById('lres0');
		if(!orgbar) {orgbar=getElementsByClassName(document, 'div', 'div4')[0];}
		if(!orgbar) {orgbar=returnObjById('lres');}
		if(!orgbar) return;
		var resbar=orgbar.getElementsByTagName('img');
		return [resbar[0].title, resbar[1].title, resbar[2].title, resbar[3].title]
	}
	
	/**
	 * searches the oElm for strTagName objects with strClassName class
	 */ 
	function getElementsByClassName(oElm, strTagName, strClassName){
			var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
			var arrReturnElements = new Array();
			strClassName = strClassName.replace(/\-/g, "\\-");
			var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
			var oElement;
			for(var i=0; i<arrElements.length; i++){
					oElement = arrElements[i];      
					if(oRegExp.test(oElement.className)){
				 arrReturnElements.push(oElement);
					}   
			}
			return (arrReturnElements)
	}
	
	/**
	 * this is cross browser compatible
	 */ 
	function returnObjById( id ){ 
			if (document.getElementById)
					return document.getElementById(id);
			else if (document.all)
					return document.all[id];
			else if (document.layers)
					return document.layers[id];
	}
	
	/** save, reset, load, createKey, exists - ReportsAction - <server>_<userId>_reportsAction */
	// Saved info: url of type of report to delete
	function save_ReportsAction(reportAction) { PRO_setValue(key_ReportsAction(), reportAction); }
	function reset_ReportsAction() { save_ReportsAction(""); }
	function load_ReportsAction() { return PRO_getValue(key_ReportsAction(), ""); }
	function key_ReportsAction() { return DEF_PARTKEY_PREFIX + DEF_PARTKEY_REPORTSACTION; }
	function exists_ReportsAction() { return (load_ReportsAction() != ""); }	
	}

// --------- ---------------------//

if(get("lres0")){
	var server = window.location.host.match(/^(.*?)[.]/)[1];
	var img_=document.getElementsByTagName('img');
	for(var i = 0; i < img.length; i++) 
		if(img_[i].src.indexOf('plus.gif')!=-1){
			img_[i].src.search(/\/img\/([^\/]+)\//);
			var idioma = RegExp.$1;
			break;
			}
	if(idioma==null)	idioma ='ru';
		
	var css=document.getElementsByTagName('link');
	var pack_grafico='';
	if(css[1]){
		css=css[1].href.search(/^(.*\/)(.*)\.css$/);
		pack_grafico = RegExp.$1;
		if(pack_grafico==server)
			pack_grafico='';
		}

	var plus = GetPlus();
	
	GetDate();

	CutMenu();
	ReSize('lleft',150,'w');
	cityLinks();
	CommonLinks();
	Army();
	DeleteMSG();
	AddQuickLinks()
	Select();
	HideTravianPlus();
	CoolMap();
	CreateBookmarks();
	calculateFillTime();
	setTimers();

	if (location.href.indexOf('nachrichten.php') != -1)	opcionOcultaMensajes();
	if (location.href.indexOf('berichte.php') != -1)	opcionOcultaInformes();
	if (location.href.match(/nachrichten.php($|\?t=|\?s=)/) || location.href.match(/berichte.php($|\?t=|\?s=)/)){ 
		opcionesMensajes();		
		}
	Calculate_Report()
}



	
// ----------------------------------------------------------------------------------------------------------//

	/*
<table cellspacing="1" cellpadding="2" class="tbg">
	<tbody>
		<tr>
			<td class="s7">
				<img width="1" height="15" src="file://C:/travian/caesars/img/un/a/x.gif"/>
				<img src="file://C:/travian/caesars/img/un/r/1.gif" class="res"/>170|
				<img src="file://C:/travian/caesars/img/un/r/2.gif" class="res"/>150|
				<img src="file://C:/travian/caesars/img/un/r/3.gif" class="res"/>20|
				<img src="file://C:/travian/caesars/img/un/r/4.gif" class="res"/>40|
				<img src="file://C:/travian/caesars/img/un/r/5.gif" class="res"/>2 | 
				<img src="file://C:/travian/caesars/img/un/a/clock.gif" class="clock"/> 0:03:40</td>
		</tr>
	</tbody>
</table>
	*/
// ----------------------------------------------------------------------------------------------------------//
function CalcResourse(){
	var div=get('lmid2');
	var table=getElementsByClassName(div,"table",'tbg');
	var tr=getElementsByClassName(table[0],"td",'s7');

	}

//CalcResourse();