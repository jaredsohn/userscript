// ==UserScript==
// @name           Travian: Extended map
// @version        1.1.0
// @author         MeXaon
// @email          svgmail@mail.ru
// @namespace      Travian
// @description    Extended Map
// @include        http://*.travian*
// @exclude        http://forum.travian*
// @exclude        http://www.travian*
// ==/UserScript==

var ScriptName='Travian: Extended map';
var ScriptAutor='MeXaon';
var ScriptVersion='1.1.0';
var ScriptLink='http://userscripts.org/scripts/show/11724';

// ******* SETTING ***************************
var hidenewmap=1;
// *******************************************

var lang=window.location.href.match(/travian\d*(\.[a-zA-Z\.]+)/).pop();
var langfile=new Array();

switch(lang){
	case'.ru':
		langfile=['Название деревни','Игрок','Альянс','Население','Действие','Покинутая долина']
		break;
	default:
		langfile=['Village Name','Player','Ally','Population','Actions','Abandoned valley']
		break;
};



const NAMEVILL=0,IGROK=1,ALLY=2,NASELENIE=3,DEYSTVIE=4,POKINUTAYADOLINA=5

var imgmarker='data:image/gif;base64,R0lGODlhSgBKALMMAP4AAf8AAf4AAvgACvUDFv0ABPsBCPwBBvkAC/oBCvkACv8AAP///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJFAAMACwAAAAASgBKAAAE4ZDJSau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyKRyyWw6n9CodEpFLgKLBTXL5UK7YO8SC5aEtcezRT1kY8JB9wbeo4PAAp191BXka3slci6BKGAJaCyFK1kEBWKGiy0GZSaDM5JzAJV6nBxdB1lAmWakOZelXWl7pqOcqk5wolJdA7BPXQqtcWAIDKhCg8B1mbs2m7caxjHIkB1hATvDymAAN9PPyyTYd54t2h/gn97f4hfcKehv5pbg6i/L7OXJ5+Q+qO84bvnSZ/ZW/qaImhUjAgAh+QQFFAAMACwAAAAASgBKAAAEVpDJSau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/4LB4TC6bz+i0es1uu9/wuHxOr9vveFAEADs=';
var imgenter='data:image/gif;base64,R0lGODlhDQANAJEDAJkPAM/P2I6Pof///yH5BAEAAAMALAAAAAANAA0AAAIknI85wi26gnyIRkvZwTlYI3jgNACReCVhhm3Zhi6qFFeOBuUFADs=';
var imgnw='data:image/gif;base64,R0lGODlhDgAMANU5AIyMn3x9kYCBlJmYqWBgdtzc48nJ04iIm8/P2IGClJmZqqiot5WVpubm6+Xl6bS0wdbX3r+/y9jY4Kysu2Nkeuno7XBwhczN1nV1ipOUpdHT2rCwv+Pj6ZqarJeXqHl5jdXW3eHh57y8yNra4o6PodTT2+bo6+Dg5mprgOrq7uLj6X1+kc7P2JubrGxtgomKnMLBzbe4xWdnfcLCztPU3Nna4ZGQo4SFl52drv///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADkALAAAAAAOAAwAAAZtwJxwSCzicC2FDXC4JYwzWOSxmSwCxc7Ag1N4MsvmMzdIVXARUYxqxeYYlUYHzLwJAh+hzeQYNDgnBRIgGhhCJA4qDBwhBSMQJQgWQgIrHy+ChCwXBhRFNzUQNAicBgRFAhgWLigyFASnRbJDQQA7';
var imgatt='data:image/gif;base64,R0lGODlhEAAQAOZ/APT09Lq6ut7e3uKdOP39/bCwsOPj46WlpY+Pj7W1tfv7+8zMzKuGUfb29s/Pz+G6gb29vbmrlpOTk5SUlKmpqZ2dne/v76enp/7+/qiDTuzs7Orj19ra2ubm5s3Nzbi4uNLBqLGxsaGhodTBp9/f37KyspSBZLixp6x4Lefn57OISvDw8KOjo/j4+KaZhqWKYqRvJLe3t3R0dLN/NpiYmMSXU6x2Jf/QiLutl7V5JMTCv/+8WZaWltrSx+3t7c2LKunm4tPT06V4NsOHMczO0deQKtm4h9+gRrOEP/P2+vv49J99Sr+cae3r6MWAHKurq9CXQ8nJyYWFhaKkpf/Je+XayuTo7eDe3eXn6qNzL4V0XNeiVGlRL8Sxle3s6+zZvPbbtaSgmvT086yqqYeIiYFTEuCjS+inSbCys5dvNdXV1drVz4KCgq2mnejo6Ovr68zMzdyPIM25nbqwo5GRke2uUff39vf39/Ly8reRWo2NjYCAgLm5udHR0aioqP///yH5BAEAAH8ALAAAAAAQABAAAAfHgA4hIgl/hoeGAhUUMVILBAt8iIYWFAQaNAJ7QQAeHIgrHw0dEwd/BnpRdx8ChyUAAiwBh24yagoBHngIFik8E5MObBwtCRA+GgWmk399BwINdG8QfhjMhgESJB0IEteHT8oGChXMQEZdcERJZFNYVmgnDz2GG0hZKmAjYToRXw8wZoBAhOPGmR9LGNgYQIWJGERjUAyRo4RLmSob0hTRAsDQnBxO2hiy48XQFSFxTDR5AWVHBmvMXAyowyCDmS0Rvq3Jc6RGIAA7';
var imgclosebutton = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAIAAAAmdTLBAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gYKECMhBqiEGQAAADJ0RVh0Q29tbWVudABFcnN0ZWxsdCB2b24gRmxvcmlhbiBTY2hyZWllciBtaXQgVGhlIEdJTVCOHcWrAAADLUlEQVR42pWUPYhdRRiG32/OuTdZXTcas0n2ZiVVYBttLFLFQuNPZTQgiIIphGBAtNTC0lZBRRQVEYWoBAyk8ActRFCRLa3SpNH9icm699695+6Z+X5ei7Obtc1UH+/MM+/M9w4jJD0wnNi9czVuZ3iwSlKbQ5ohP3rzn+FGTBvmlqbUgpRgBQDdAbC0AOAepbV2ezI3v/Txd+nuQ0Jy4+3XqsMDqeqYjHxryJJRCiPgRneAMKU7rbBktlNrtoaj0WrvrpMXlxMAH29Kf5/0+6hqqXtS16h7SImpkqqSVCHVkipIQqq6NanuTdZXDs7VNQA2WzEZS12znTJvM2eWQi1UpSnDqQUgtcCVpnRHSqmqACQA1BKToY83oxnPPvz0/BvvR9OwaaKZeDOO8TC2NmP077FPfjzw/CvM23STlKTu3eKV04bbE+a8/8FTAI6+dTG00Aq00DK1LF78HcDs6bNwAwPcSaHjc5TCXKh6/fVz3cTggytwQzjc7vt6uRP/OrOEcGEAAXKHB8DcRm5pCvf1V5/pxGOf/kT64pd/7MBPnoArXEEXUrDLRztFyVCFOSMoXH35TMcsfvFrV6ycXUqJIiFwoUmYROz6mzK30LJ7Nwq5+tITt57a6rP3S6IIk0TqeBrC9/oXVhjOcGGIAAmDD7+/xQ+++jMl7PmHwlXC9vrHkqkFYWSQXHjvSkeun3+oK458tizdFjAJEytpz98KNdMK3Ri+8M43O/CFRwBef/EkALlj7sila4IQBlzFC013+bLjT9WFdy938NqFx0CCBHjj3AOdePjyqoSmDv7f+Qtzy9JS8/SXbwGsnT8NN3b5hzP8xnMnALQ/fI5wmkELzQAIyWun5qsD98jMbNq3X6oaAjAEAYRQJYpYFi+wgtKyFMtlPPWrW3zqatQAVEu020kqiZCqliQIh6CLOoXCi1iBFahRzdTVQh0A6pujaA4OuHkDyqqfUdWAgCFCYQi9gsNVwukqZjQ35UghC8cByDSTG3///MKjo7WVfq+mSEhCRJVEAKFXdAlPDPdAeMUozjh6/PFLv/UPDYRkVuzr3dbfh5sjv3OmmunjP4EhhHJu9NM9AAAAAElFTkSuQmCC";

var timeout=0;
var timeout2=0;
var grafpack='';
var newmapsize=60;
var marker=null;
var divpopup;
var ev,evx,evy;
var itext=['','(9)','<img src='+imgp('img/un/r/3.gif')+'>','(6)','<img src='+imgp('img/un/r/2.gif')+'>','<img src='+imgp('img/un/r/1.gif')+'>','(15)'];
var kid;
var hideshowtypemap='';
var gmresurstypemap='mapc';


var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
function find(xpath,xpres){
  var ret = document.evaluate(xpath,document,null,xpres,null);
  return  xpres == XPFirst ? ret.singleNodeValue : ret;
}

function imgp(src){
	if(grafpack!=''){
		return grafpack+src;
	}else return src;
}
function elem(tag,idt,idv,class,content){
	var ret=document.createElement(tag);
	if(content)ret.innerHTML=content;
	if(idt)ret.setAttribute(idt,idv);
	if(class)ret.className=class;
	return ret;
};

function getElementsByClassName(oElm, strTagName, strClassName){ // searches the oElm for strTagName objects with strClassName class
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
	* Ordena en orden ascendete y descendente 
	*
	* Params: 
	* 	sTableID: 	ID de la tabla a ordenar 
	* 	iCol: 		Indice de la columna a ordenar 
	* 	sDataType:	Tipo de datos de la columna, valor por defecto:texto 
	*/ 
	function sortTable(sTableID, iCol, sDataType) { 
		return function(){
			var oTable = document.getElementById(sTableID); 
			var oTBody = oTable.tBodies[0]; 
			var colDataRows = oTBody.rows; 
			var aTRs = new Array; 

			for (var i = 0; i < colDataRows.length; i++) aTRs[i] = colDataRows[i]; 
			if (oTable.getAttribute("sortCol") == iCol) aTRs.reverse(); 
			else aTRs.sort(generateCompareTRs(iCol, sDataType)); 

			var oFragment = document.createDocumentFragment(); 
			for (var i = 0; i < aTRs.length; i++) oFragment.appendChild(aTRs[i]); 

			oTBody.appendChild(oFragment); 
			oTable.setAttribute("sortCol", iCol); 
		};
	}

	/**
	 * Realiza una comparaci�n entre las casillas de la misma columna en distintas filas
	 *
	 * Params:
	 *	iCol: numero de columna dentro de la fila a comparar
	 *	sDataType: tipo de datos de la comparacion
	 *
	 * Returns:
	 * 	Devuelve -1, 1 o 0 segun el resultado de la comparacion
	 */
	function generateCompareTRs(iCol, sDataType) {       
		return function compareTRs(oTR1, oTR2) { 
			var vValue1 = convert(oTR1.cells[iCol].firstChild, sDataType); 
			var vValue2 = convert(oTR2.cells[iCol].firstChild, sDataType); 

			if (vValue1 < vValue2) return -1; 
			else if (vValue1 > vValue2) return 1; 
			else return 0; 
		}; 
	}
	/**
	 * Convierte un elemento a un determinado tipo segun un argumento
	 *
	 * Params:
	 *	elemento: elemento a convertir
	 *	sDataType: nuevo tipo de datos (int o float)
	 *
	 * Returns:
	 *	El elemento convertido al nuevo tipo de datos
	 */
	function convert(element, sDataType) { 
		switch(sDataType) { 
			case "int": return ((element.nodeValue == null) || !element.nodeValue.match(/\d+/)) ? 0 : parseInt(element.nodeValue); 
			case "float": return ((element.nodeValue == null) || !element.nodeValue.match(/\d+/)) ? 0 : parseFloat(element.nodeValue); 
			default: return (element == null) ? '' : element.textContent.toLowerCase();
		} 
	} 
	
	
function init(){
	if(document.getElementById('map_content')==null)return false;
	//
	var gp=find('//link[@rel="stylesheet"]',XPList);
	for(var i=0;i<gp.snapshotLength;i++){
		var csspos=gp.snapshotItem(i).href.indexOf('unx.css');
		if (csspos!=-1){
			grafpack=gp.snapshotItem(i).href.substring(0,csspos);
		}
	};
	// popup
	var divpopupo=document.createElement('DIV');
	divpopupo.setAttribute('style',"position:relative;left:195px;top:47px;");
	divpopup = document.createElement("DIV");
	divpopup.setAttribute("id", "em_popup");
	divpopup.setAttribute("style", "position:absolute; padding: 1px; z-index: 100; border: solid 1px #00C000; background-color: #FEFFE3; display: none;");
	divpopupo.appendChild(divpopup);
	document.body.appendChild(divpopupo);
	// End Popup
	// Export/Import crop
	var eicrop=elem('mywindow','id','em_exportimportcrop','','');
	eicrop.setAttribute('style','z-index: 1000; top: 180px; left: 300px; position: absolute; width: 200px; display: none');
	var content='<table class="tbg"><tbody>'+
							'<tr class="rbg">'+
							'<td><span id="em_exportimportcrop_closebutton" style="float:right;cursor:pointer"><img src='+imgclosebutton+'></span>'+
							'<span id="em_exportimportcrop_caption">Export Crop</span></td>'+
							'</tr>'+
							'<tr>'+
							'<td id="em_exportimportcrop_area">'+
							'<textarea style="height:300px;width:196px"></textarea>'+
							'</td>'+
							'</tr>'+
							'</tbody></table>';
	eicrop.innerHTML=content;
	document.body.appendChild(eicrop);
	id('em_exportimportcrop_closebutton').addEventListener('click',closebutton,false);
	// End Export/Import crop
	GM_setValue('mapc',GM_getValue('mapccrop',''));
	initmenu()
}

function infomap(){
	var t=document.getElementById('em_infomap');
	if(t!=null)t.parentNode.removeChild(t);
	var table = document.createElement('TABLE');
	table.setAttribute("id", "em_infomap");
	table.setAttribute("sortCol", '-1');
	table.setAttribute("class", "tbg");
	table.setAttribute("align", "center");
	table.setAttribute("cellspacing", "1");
	table.setAttribute("cellpadding", "2");
	table.style.display=getsetting('em_infomap','');
	var thead = document.createElement("THEAD"); 
	var tbody = document.createElement("TBODY"); 
	tbody.style.display='';
	var row = document.createElement('TR');
	row.setAttribute('class', "rbg");
	thead.appendChild(row); 
	table.appendChild(thead);
	var toptable=[IGROK,ALLY,NAMEVILL,NASELENIE,DEYSTVIE];
	for(var i = 0; i < 4; i++){
		var td = elem('TD','','','c1 b',langfile[toptable[i]]);
		if (i < 4){
				switch(i){
					case 3: td.addEventListener("click", sortTable('em_infomap', i, 'int'), 0); break;
					default: td.addEventListener("click", sortTable('em_infomap', i), 0); 
				}
				td.style.cursor = "pointer";
			}
//		td.style.cursor = 'pointer';
		row.appendChild(td);
	}
	var groundimg=find('//div[@id="map_content"]/div[@class="mdiv"]/img',XPList);
	var grounddata=find('//div[@id="map_content"]/map/area[@onmouseover]',XPList);
//alert(groundimg.snapshotLength);
	for(var i=0;i<grounddata.snapshotLength;i++){
		var onmo=grounddata.snapshotItem(i).getAttribute('onmouseover')
		var groundhref=grounddata.snapshotItem(i).getAttribute('goto');
		var typeground=groundimg.snapshotItem(i).src.match(/img\/un\/m\/(\w)\d+\.gif/).pop();
		var ni='-',na='-',nv='',np='-',mt='';
		if(typeground=='o'&&onmo.indexOf('map')!=0){
			nv=langfile[POKINUTAYADOLINA];
		};
		if(onmo.indexOf('map')==0){
			var tiledata=onmo.substring(4,onmo.length-1)
			var mas=tiledata.split(',');
			ni=mas[1].substring(1,mas[1].length-1);
			na=mas[3].substring(1,mas[3].length-1);
			nv=mas[0].substring(1,mas[0].length-1);
			np=mas[2].substring(1,mas[2].length-1);
		}
		if(nv!=''){
			mt='mt'+(i+1);
			var vill=elem('TD','mt',mt,'','<a mt='+mt+' href='+groundhref+'>'+nv+'</a><a  mt='+mt+' target="_blank" href='+groundhref+'><img mt='+mt+' src='+imgnw+'></a>');
			var rowt = document.createElement('TR');
			rowt.setAttribute('mt',mt);
			rowt.addEventListener('mouseover',eventtableover,false);
			rowt.addEventListener('mouseout',function(){marker.style.display='none';},false);
			rowt.appendChild(elem('TD','','','',ni));
			rowt.appendChild(elem('TD','','','',na));
			rowt.appendChild(vill);
			rowt.appendChild(elem('TD','','','',np));
//			rowt.appendChild(elem('TD','','','',''));
			tbody.appendChild(rowt);
		};
	};
	table.appendChild(tbody);
	table.style.position = 'absolute';
	table.style.top = 460+'px';

	document.getElementById('lmid1').appendChild(table);
};

function drawNewMap(){
	var mapr=7;
	var cont=''
	// Marker
	var grounddata=find('//div[@id="map_content"]/map/area',XPList);
	var groundimg=find('//div[@id="map_content"]/div[@class="mdiv"]/img',XPList);
	groundimg.snapshotItem(0).parentNode.appendChild(elem('div','','','','<img id="mapmarker" class="mt1" src='+imgmarker+' style="z-index: 100; color: RGB(249, 201, 16); display: none">'));
	marker=document.getElementById('mapmarker');
	// End Marker
	// CheckAll
	var mmt=elem('a','href','javascript:void(0)','','Main menu');
	mmt.addEventListener('click',mainmenuevent,false);
	find('//div[@class="map_show_xy"]',XPFirst).appendChild(mmt);
	//
	var t=groundimg.snapshotItem(0).parentNode;
	for(var i=1;i<50;i++){
		var divs=elem('div','','','mt'+i,'<div id="em_type'+i+'" t="0" style="position:relative;left:31px;top:43px;border: solid 1px #00C000; background-color: #FEFFE3;-moz-border-radius: 8px; display: none"></div>')
		t.appendChild(divs);
	};
	// End CheckAll
	var table = document.createElement('TABLE');
	table.setAttribute("id", "newmap");
	table.setAttribute("align", "center");
	table.setAttribute("cellspacing", "1");
	table.setAttribute("cellpadding", "0");
	table.setAttribute("class", "f8");
	table.setAttribute("bgcolor", "#00AA00");
	table.setAttribute("border", "0");
	var tbody = document.createElement("TBODY"); 
	for(var i = 0; i<mapr; i++){
	var row = document.createElement('TR');
		for(var j = 0; j<mapr; j++){
			var cgd=grounddata.snapshotItem(parseInt(i*mapr+j)+8);
			groundimg.snapshotItem(parseInt(i*mapr+j)).src.match(/img\/un\/m\/(\w)(\d+)\.gif/).pop();
			var t=RegExp.$1;
			var v=RegExp.$2;
			switch(t){
				case 'o':
					switch(v){
						case '1':
						case '2':
							cont='+25%<img src='+imgp('img/un/r/1.gif')+'>';
							break;
						case '3':
							cont='+25%<img src='+imgp('img/un/r/1.gif')+'><br>+25%<img src='+imgp('img/un/r/4.gif')+'>';
							break;
						case '4':
						case '5':
							cont='+25%<img src='+imgp('img/un/r/2.gif')+'>';
							break;
						case '6':
							cont='+25%<img src='+imgp('img/un/r/2.gif')+'><br>+25%<img src='+imgp('img/un/r/4.gif')+'>';
							break;
						case '7':
						case '8':
							cont='+25%<img src='+imgp('img/un/r/3.gif')+'>';
							break;
						case '9':
							cont='+25%<img src='+imgp('img/un/r/3.gif')+'><br>+25%<img src='+imgp('img/un/r/4.gif')+'>';
							break;
						case '10':
						case '11':
							cont='+25%<img src='+imgp('img/un/r/4.gif')+'>';
							break;
						case '12':
							cont='+50%<img src='+imgp('img/un/r/4.gif')+'>';
							break;
						default:
							cont='err<img src='+imgp('img/un/a/del.gif')+'>'
				};
					imgsrc='yellow';
					break;
				case 'd':
					cont='';
					imgsrc='#00BBFF';
					break;
				case 't':
					cont='';
					imgsrc='#00FF00';
					break;
				default:
					imgsrc='img/un/a/del.gif';
					break;
			}
			//var kid=cgd.href.match(/d=(\d+)\&/).pop();
			var td = elem('TD','','','',cont);
			td.setAttribute('bgcolor',imgsrc);
			td.setAttribute("align", "center");
			td.width=newmapsize+'px';
			td.height=newmapsize+'px';
			td.setAttribute('onmouseover',cgd.getAttribute('onmouseover'));
			td.setAttribute('onmouseout',cgd.getAttribute('onmouseout'));
			
			cgd.addEventListener('click',eventmapclick,false);
			cgd.addEventListener('mouseover',eventmappopup,false);
			cgd.addEventListener('mouseout',function(){clearTimeout(timeout)},false);
			cgd.setAttribute('goto',cgd.href);
			cgd.setAttribute('xy',groundimg.snapshotItem(parseInt(i*mapr+j)).className);
			cgd.href='javascript:void(0)';
			cgd.setAttribute('onclick','');
			cgd.setAttribute('imgtype',t);
			row.appendChild(td);
		}
	tbody.appendChild(row);
	}
	for(var i=0;i<8;i++){
		var cgd=grounddata.snapshotItem(i)
		var kid=cgd.getAttribute('onclick').match(/z=(\d+)/).pop();
		cgd.setAttribute('goto','d='+kid);
		cgd.href='javascript:void(0)';
		cgd.addEventListener('click',eventmapclick,false);
		cgd.setAttribute('onclick','');
	}
	table.appendChild(tbody);
	table.setAttribute('style','position: absolute; top: 560px; z-index:5;');
	if(hidenewmap)table.style.display='none';
	document.body.appendChild(table);
}

function showtype(){
	var im, kid, reg, it;
	var grounddata=find('//div[@id="map_content"]/map/area',XPList);
	im=GM_getValue(gmresurstypemap,'');
	for(var i=8;i<grounddata.snapshotLength;i++){
		gd=grounddata.snapshotItem(i);
		if(gd.getAttribute('goto')!=''){
			kid=gd.getAttribute('goto').match(/d=(\d+)/).pop();
			reg=new RegExp(kid+'\=(\\d+)');
			it=im.match(reg);
			var divtype=document.getElementById('em_type'+(i-7)) 
			if(it!=null){
				divtype.innerHTML=itext[it[1]];
				divtype.style.display=hideshowtypemap;
			};
		};
	}
}

function eventmapclick(ev){
	divpopup.style.display='none';
	var mid=ev.target.getAttribute('goto').match(/d=(\d+)/).pop();
	myajax('ajax.php?action=map_content&z='+mid, function(z){
		document.getElementById('map_content').innerHTML=z.responseText;
		drawNewMap();
		infomap();
		showtype();
		});
};

function eventmappopup(ev){
	if(ev.target.getAttribute('goto')=='')return;
	var link=ev.target.getAttribute('goto');
	var kid=link.match(/d=(\d+)/).pop()
	divpopup.style.display='none';
	clearTimeout(timeout2);
	divpopup.innerHTML='';
	divpopup.innerHTML ='<a href='+link+'><img src='+imgenter+' height="16"></a>'
	divpopup.innerHTML+='<a target="_blank" href='+link+'><img src='+imgnw+' height="16"></a>';
	divpopup.innerHTML+='<a href="a2b.php?z='+kid+'"><img src='+imgatt+' ></a>';
	divpopup.className=ev.target.getAttribute('xy')
	timeout2=setTimeout(function(){if(timeout2==0)return;divpopup.style.display='';},1000);
	if(ev.target.getAttribute('imgtype')!='o'){
		var im=GM_getValue('mapc','');
		var reg=new RegExp(kid+'\=(\\d+)');
		var it=im.match(reg);
		if(it==null){
			timeout=setTimeout(function(){if(timeout==0)return;myajax(link,gettyped);},500);;
		}
	}
}

function gettyped(z){
	var v=0;
	var ans = document.createElement('DIV');
	ans.innerHTML = z.responseText;
	var ansdoc = document.implementation.createDocument("", "", null);
	ansdoc.appendChild(ans);
	if (ansdoc.evaluate("//div[starts-with(@id, 'f')]", ans, null, XPFirst, null).singleNodeValue){
		ansdoc.evaluate("//div[starts-with(@id, 'f')]", ans, null, XPFirst, null).singleNodeValue.id.search(/f(\d)/);
		v=RegExp.$1;
	}else {
		ansdoc.evaluate("//img[@id='resfeld']", ans, null, XPFirst, null).singleNodeValue.src.search(/\/f(\d)\.jpg$/);
		v=RegExp.$1;
		if(ansdoc.evaluate("//img[@id='resfeld']", ans, null, XPFirst, null).singleNodeValue.src.search(/img\/un\/m\/w/)!=''){
			v=0;
		}
	}
	var kid=ansdoc.evaluate('//div[@class="map_details_actions"]/table/tbody/tr/td/a', ans, null, XPFirst, null).singleNodeValue.href.match(/z=(\d+)/).pop()
	if(v==1||v==6) GM_setValue('mapccrop',GM_getValue('mapccrop','')+kid+'='+v+';');
	GM_setValue('mapc',GM_getValue('mapc','')+kid+'='+v+';');
	showtype();
}


function eventtableover(ev){
	var tar=ev.target
	for(var i=0;i<5;i++){
		if(tar.nodeName!='TR'){
			tar=tar.parentNode;
		}else break;
	}
	marker.className=tar.getAttribute('mt');
	marker.style.display='';
};


	
function myajax(url1, onfunc){
	var g = new XMLHttpRequest();
	g.onreadystatechange=function(){
		if(g.readyState==4&&g.status==200){
			onfunc(g);
		};
	};
	g.open("GET",url1,true);
	g.send(null);
}

function closebutton(ev){
	var tar=ev.target
	for(var i=0;i<10;i++){
		if(tar.nodeName!='MYWINDOW'){
			tar=tar.parentNode;
		}else break;
	}
	tar.style.display='none';
};

function mcheckallevent(){
	var im, reg, it, link;
	divpopup.style.display='none';
	var grounddata=find('//div[@id="map_content"]/map/area',XPList);
	im=GM_getValue('mapc','');
	for(var i=8;i<grounddata.snapshotLength;i++){
		if(grounddata.snapshotItem(i).getAttribute('imgtype')!='o'){
			link=grounddata.snapshotItem(i).getAttribute('goto');
			kid=link.match(/d=(\d+)/).pop();
			reg=new RegExp(kid+'\=(\\d+)');
			it=im.match(reg);
			if(it==null){
				myajax(link,gettyped);
			}
		}
	}
}

function id(id){
	return document.getElementById(id);
};

function getsetting(value, defaultvalue){
	var set=GM_getValue('setting','');
	if(set=='') return defaultvalue;
	set=set.split(',');
	var iset=set.indexOf(value);
	if(iset<0){
		return defaultvalue;
	}else{
		return set[iset+1];
	};
};

function setsetting(value,value2){
	var set=GM_getValue('setting','');
	var iset=set.indexOf(value);
	if(iset<0||set==''){
		set=set+value+','+value2+',';
	}else{
		set=set.split(',');
		iset=set.indexOf(value);
		set[iset+1]=value2;
		set=set.join(',');
	};
	GM_setValue('setting',set);
};

function mainmenuevent(){
	var mm=id('em_mainmenu');
	if(getsetting('em_mainmenu','none')=='none'){
		mm.style.display='';
		setsetting('em_mainmenu','')
	}else{
		mm.style.display='none';
		setsetting('em_mainmenu','none');
	};
};

function mtypehideshowevent(ev){
	if(getsetting('hideshowtypemap','')=='none'){
		hideshowtypemap='';
		id('em_hideshow').innerHTML='Type: Hide/<b>Show</b>';
		setsetting('hideshowtypemap','')
	}else{
		if(getsetting('gmresurstypemap')=='mapccrop'){
			gmresurstypemap='mapc';
		};
		hideshowtypemap='none';
		id('em_hideshow').innerHTML='Type: <b>Hide</b>/Show';
		setsetting('hideshowtypemap','none')
	};
	showtype();
	gmresurstypemap=getsetting('gmresurstypemap','');
};

function mtypeallcropevent(ev){
	if(getsetting('gmresurstypemap','mapc')=='mapc'){
		hideshowtypemap='none';
		showtype();
		gmresurstypemap='mapccrop';
		id('em_allcrop').innerHTML='Type: All/<b>Crop</b>';
		setsetting('gmresurstypemap','mapccrop')
	}else{
		gmresurstypemap='mapc';
		id('em_allcrop').innerHTML='Type: <b>All</b>/Crop';
		setsetting('gmresurstypemap','mapc')
	};
	hideshowtypemap=getsetting('hideshowtypemap','');
	showtype();
};

function mtablehideshowevent(ev){
	var mm=id('em_infomap');
	if(getsetting('em_infomap','')=='none'){
		mm.style.display='';
		id('em_table').innerHTML='Table: Hide/<b>Show</b>';
		setsetting('em_infomap','')
	}else{
		mm.style.display='none';
		id('em_table').innerHTML='Table: <b>Hide</b>/Show';
		setsetting('em_infomap','none')
	};
};

function mexportcropevent(ev){	// Export crop
	id('em_exportimportcrop_caption').innerHTML='Export crop';
	id('em_exportimportcrop_area').innerHTML='<textarea style="height:300px;width:196px">'+GM_getValue('mapccrop').split(';').join('\n')+'</textarea>';
	id('em_exportimportcrop').style.display='';
};

function mimportcropevent(ev){
	id('em_exportimportcrop_caption').innerHTML='Import crop';
	id('em_exportimportcrop_area').innerHTML='<textarea style="height:300px;width:196px"></textarea><div id="em_exportimportcrop_import" class="fm b" style="cursor:pointer;font-size:10pt">Import</div>';
	id('em_exportimportcrop_import').addEventListener('click',exportimportcrop_import_event,false);
	id('em_exportimportcrop').style.display='';
};

function exportimportcrop_import_event(ev){
	var txt=id('em_exportimportcrop_area').firstChild.value.split("\n");
	//if(txt[txt.length-1]!=';')txt=txt+';';
	
	alert(txt+'\n'+txt[0].match(/^\d+=\d$/));
};

function initmenu(){
	// create menu
	mcheckall=elem('div','id','em_checkall','','Type: Check all');
	mcheckall.setAttribute('style','cursor:pointer');
	mcheckall.addEventListener('click',mcheckallevent,false);

	mtypehideshow=elem('div','id','em_hideshow','','Type: Hide/<b>Show</b>');
	mtypehideshow.setAttribute('style','cursor:pointer');
	mtypehideshow.addEventListener('click',mtypehideshowevent,false);

	mtypeallcrop=elem('div','id','em_allcrop','','Type: <b>All</b>/Crop');
	mtypeallcrop.setAttribute('style','cursor:pointer');
	mtypeallcrop.addEventListener('click',mtypeallcropevent,false);

	mtablehideshow=elem('div','id','em_table','','Table: Hide/<b>Show</b>');
	mtablehideshow.setAttribute('style','cursor:pointer');
	mtablehideshow.addEventListener('click',mtablehideshowevent,false);

	mexportcrop=elem('div','id','em_exportcrop','','Export crop');
	mexportcrop.setAttribute('style','cursor:pointer');
	mexportcrop.addEventListener('click',mexportcropevent,false);

	mimportcrop=elem('div','id','em_importcrop','','Import crop');
	mimportcrop.setAttribute('style','cursor:pointer');
	mimportcrop.addEventListener('click',mimportcropevent,false);

	mainmenu=elem('div','id','em_mainmenu','','');
	mainmenu.setAttribute('style','position: absolute; left: 155px; top: 185px; z-index: 700; border: 1px solid; background-color: #FEFFE3; padding: 2px; display: ');

	mainmenu.appendChild(mcheckall);
	mainmenu.appendChild(mtypehideshow);
	mainmenu.appendChild(mtypeallcrop);
	mainmenu.appendChild(mtablehideshow);
//	mainmenu.appendChild(mexportcrop);
//	mainmenu.appendChild(mimportcrop);

	document.body.appendChild(mainmenu);
	// mainmenu
	var mm=id('em_mainmenu');
	if(getsetting('em_mainmenu','none')=='none'){
		mm.style.display='none';
	}else{
		mm.style.display='';
	};
	// type hide show
	if(getsetting('hideshowtypemap','')=='none'){
		hideshowtypemap='none';
		id('em_hideshow').innerHTML='Type: <b>Hide</b>/Show';
	}else{
		id('em_hideshow').innerHTML='Type: Hide/<b>Show</b>';
	};
	// type all crop
	if(getsetting('gmresurstypemap','mapc')=='mapc'){
		id('em_allcrop').innerHTML='Type: <b>All</b>/Crop';
		gmresurstypemap='mapc';
	}else{
		id('em_allcrop').innerHTML='Type: All/<b>Crop</b>';
		gmresurstypemap='mapccrop';
	};
	// table hide sow
	mm=id('em_infomap');
	if(getsetting('em_infomap','')=='none'){
		id('em_table').innerHTML='Table: <b>Hide</b>/Show';
	}else{
		id('em_table').innerHTML='Table: Hide/<b>Show</b>';
	};
};




function main(){
	if(init()==false)return;
	drawNewMap();
	infomap();
	showtype();
};

main();


//*************** Show Version script **********************
function verhideshow(){
	if(id('MeXaon_ver_pm').innerHTML=='-'){
		id('MeXaon_ver_tbody').style.display='none';
		id('MeXaon_ver_c').style.display='none';
		id('MeXaon_ver_table').style.width='10px';
		id('MeXaon_ver_pm').innerHTML='+';
		setsetting('MeXaon_ver','+');
	}else{
		id('MeXaon_ver_tbody').style.display='';
		id('MeXaon_ver_c').style.display='';
		id('MeXaon_ver_table').style.width='300px';
		id('MeXaon_ver_pm').innerHTML='-';
		setsetting('MeXaon_ver','-');
	}
};
var findver=find('//mywindow[@id="MeXaon_ver"]/table/tbody',XPFirst);
if(!findver){
var content='<table id="MeXaon_ver_table" class="tbg" style="position:absolute;top:80px;left:680px;z-index:150;width:300px;cellspacing:1;cellspacing;1">'+
						'<thead><tr class="rbg"><td colspan="3"><span id="MeXaon_ver_pm" style="float:left;cursor:pointer">-</span><span id="MeXaon_ver_c">Scripts Version</span></td></tr></thead>'+
						'<tbody id="MeXaon_ver_tbody"></tbody>'+
						'</table>';
var ver=document.createElement('mywindow');
ver.id='MeXaon_ver';
ver.innerHTML=content;
document.body.appendChild(ver);
id('MeXaon_ver_pm').addEventListener('click',verhideshow,false);
if(getsetting('MeXaon_ver','-')!=id('MeXaon_ver_pm').innerHTML) verhideshow();
}
var findver=find('//mywindow[@id="MeXaon_ver"]/table/tbody',XPFirst);
var tr=document.createElement('tr');
var td1=document.createElement('td');
if(ScriptLink!=''){
	content='<a href='+ScriptLink+' title="Go to http://userscripts.org" target="_blank">'+ScriptName+'</a>';
} else content=ScriptName;
td1.innerHTML=content;
td2=document.createElement('td');
td2.innerHTML=ScriptVersion;
tr.appendChild(td1);
tr.appendChild(td2);
findver.appendChild(tr);
// ************** End Show version script ******************