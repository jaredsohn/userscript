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
		langfile=['ÐÐ°Ð·Ð²Ð°Ð½Ð¸Ðµ Ð´ÐµÑ€ÐµÐ²Ð½Ð¸','Ð˜Ð³Ñ€Ð¾Ðº','ÐÐ»ÑŒÑÐ½Ñ','ÐÐ°ÑÐµÐ»ÐµÐ½Ð¸Ðµ','Ð”ÐµÐ¹ÑÑ‚Ð²Ð¸Ðµ','ÐŸÐ¾ÐºÐ¸Ð½ÑƒÑ‚Ð°Ñ Ð´Ð¾Ð»Ð¸Ð½Ð°']
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
	 * Realiza una comparaciï¿½n entre las casillas de la misma columna en distintas filas
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
							'<textarea style="height:300px;width:196px">