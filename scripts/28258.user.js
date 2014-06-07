// ==UserScript==
// @name           Travian: Extended map with window
// @version        2.2.0
// @author         MeXaon
// @email          svgmail@mail.ru
// @namespace      Travian
// @description    Extended Map v2.2.0
// @include        http://*.travian*/dorf1.php*
// @include        http://*.travian*/dorf2.php*
// @include        http://*.travian*/karte.php*
// @include        http://*.travian*/karte2.php*
// @include        http://*.travian*/statistiken.php*
// @include        http://*.travian*/berichte.php*
// @include        http://*.travian*/nachrichten.php*
// @include        http://*.travian*/allianz.php*
// @include        http://*.travian*/spieler.php*
// @include        http://*.travian*/build.php*
// @exclude        http://forum.travian*
// @exclude        http://www.travian*
// ==/UserScript==

var ScriptName=' GOLD KING تعريب';
var ScriptAutor='MeXaon';
var ScriptVersion='منتدى ترافيان العربي';
var ScriptLink='http://ar-travian.com/forumdisplay.php?f=3';

// ******* SETTING ***************************
var hidenewmap=1;
var DEBUG=0;
// *******************************************

var lang=window.location.href.match(/travian\d*(\.[a-zA-Z\.]+)/).pop();
var langfile=new Array();

switch(lang){
	case'.ru':
		langfile=['Название деревни','Игрок','Альянс','Население','Действие','Покинутая долина']
		break;
		case'.ae':
	    langfile=['اسم القرية/الواحة','الاعبين','التحالفات','السكان','العمليات','واحة مهجورة']
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
var img_ne='http://img161.imageshack.us/img161/6704/index4sv5.png';
var img_n='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAeCAYAAADtlXTHAAAAoUlEQVQIHQGWAGn/AAAAAAAAAAAAAQIAAAABAgAAAAMCAAAAAwIAAAAEAgAAAAUCAAAALgD5+fn/Avb29gAC+fn5AAL+/v4AAgAAAAACAAAAAAL+/v4AAv///wAC////AAL+/v4AAv///wAC/v7+AAL+/v4AAv7+/gAC/v7+AAL///8AAv39/QAC/v7+AAL+/v4AAv39/QAC/v7+AALCwsIAtd08GXg+5S0AAAAASUVORK5CYII=';
var img_nw='http://img74.imageshack.us/img74/8564/index3zq5.png';
var img_w='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAABCAYAAADXeS5fAAAATElEQVQIHQFBAL7/AQAAAF8AAAD0AAAA9AAAAPYAAAD2AAAA+AAAAPgAAAD5AAAA+QAAAPsAAAD8AAAA/AAAAP0AAAD9AAAA/wAAAP+74Q8CtSJeYAAAAABJRU5ErkJggg==';
var img_e='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAABCAYAAADXeS5fAAAATElEQVQIHQFBAL7/AQAAAAAAAAABAAAAAQAAAAMAAAADAAAABAAAAAQAAAAFAAAABwAAAAcAAAAIAAAACAAAAAoAAAAKAAAADAAAAAwHtQBhOkUfvgAAAABJRU5ErkJggg==';
var img_sw='http://img118.imageshack.us/img118/7890/index2mg2.png';
var img_s='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAoCAYAAAA/tpB3AAAA00lEQVQIHQHIADf/ALW1tf8A/////wL7+/sAAv39/QAC/v7+AAIAAAAAAgAAAAACAAAAAAL5+fkAAgYGBgACAQEBAAIBAQEAAgMDAwACAgICAAD/////AgAAAAAAAAAArwIAAAD5AgAAAPgCAAAA9wIAAAD3AgAAAPUCAAAA9QIAAAD0AgAAAPQCAAAA9AIAAAD1AgAAAPUCAAAA9wIAAAD3AgAAAPgCAAAA+QIAAAD5AgAAAPsDAAAABAMAAAACAwAAAAEDAAAAAAMAAAAAAAAAAACWDyhuTN3/eQAAAABJRU5ErkJggg==';
var img_se='http://img125.imageshack.us/img125/3176/indexha5.png';
var img_close='data:image/gif;base64,R0lGODlhDgAOAPcAAJ8jJKUpKqUqK30lJt+0tY1LTXA9P249P143OFw2N9ywst60tVoQFFkQFJMmLEsUF0cTFnUlKnUmKkwcH04dIIk1Ook2OlFAQWlVVmhVVq6bnK2bnFZAQj8zND0yM56UldTLzE1FRo2OjoyNjZM5LYBORn9ORotYUcqIf/ato/m1quKkmvm2rJ9DOKlIPahIPatOQqtOQ6tgWPqdk/qelPqhl/qkmfqon82Kg/qrofWpoN+fl3wSCIMaEIgcEo8lG5svJZouJZsxJ6Y4L6Y5L9ZTSdJVS85VS+JoXeVpX9txaN93b69kXYdVUO+YkPCbk4xiXodfW5WIh5SIh24JAnUMBXYQCn8SC4gbFIcbFIIeF8M5L6oxKcA4MKoxKo8uKcpCO5MxLMlKQcxLRNJRSM9aUtxjWuBlXNphWtZgWcVjXcVjXthvaNhwaaEoJJ4pJMRBO8dWUbMlI7EmI7QoJbcpJqAkJIM3NoE4NyMbGyIbG457e417e392dpmQkJiQkJyVldbNzZuVleXe3ubg4Dg3N8PBwcvKysLBwYSDg4OCgsrKyr29vby8vI6OjnZ2djw8PBMTE////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAJIALAAAAAAOAA4AAAjRACUJbPQIUqRIkB41EsjQUaEQffz86ROikCOGI/Rk0ABiEKFAGzDkESGpkYcEBQYoILBAwYACCDowUjShghUqWtao0ULFigUKiS5EsDPnSpUsWKpckQNAAgcIDuh0EeODBw8fY7bUcfCggQA4ZMwE6dEDyJkiYAIwOODlCJIhP4QI+UEkiREuBvi8SfOCRIsZNFqQcIHGzR5DeOKwgVHjRg4bMZSUuYNI0ocvbZzoUMEixZMlYT4wBNREBoodK3AwOSGIocBDU6KYKAFFyiKGAQEAOw==';
var img_minimize='data:image/gif;base64,R0lGODlhDgAPAPcAAHdUVaGIiVgqLZdnapZnajIWGGo7P1hLTGI6Pv/7lNzWe//5k/z3l+znkP/7oP/6ocO6VJiSQtvTePz1lKCcYe3nkv/1jfjtif/1jpqVYL+yUf/wiv/tg//uifjnh6Silv/qgurQZP/mf6CRVKWiluTGX//gcvvYbv/ecf3bcf/dc//eev/ge52MUrCMKf/bc6FyAKBxAJ5yAKyHKf/SYP/RYv/TYv/TY6FxAP/ITvjCTeq6SaFqAKFtAOyjCuqiC/WtIO+rIu6rI++uLPq6P/e9Tei1SeSXDuSZDuicFPKqIvCsLPi3POaYEtKNGtCNGumzWuq0W+q0Xeq1Xaqnoquoo51dAJ1fAJxfANyVLdmTLad7O6h8POaqVOSpVKFcAKFeANeQM51YANWNM62oopxUANSGLtSDLteTTPDaw+/axMjGxJpJAMZ6NcR6Ne7XwZlHAO7WwaOUipdpTOLAq5BAE5BAFJppTuPArL9vRr1vR6WUi4mHhsjGxZ9TLq5cNceRfsiRf34rGn4pGXctIpJQRpiRkIk0KZZRSFZLSuLX1sutq3hQT1tDQlpDQlcpKXhQUHhXV6GIiLShobOhoZiRke3l5ezk5J6bm56cnJyamomHh9HQ0Ozs7Orq6unp6ejo6Obm5tLS0sTExMPDw////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAKUALAAAAAAOAA8AAAjcAEsJHLXpQIECifiMEsgwUyMAAShNkhTJUSaGmh4NWKTI0iVFiwgIwFSKFIJCgPC8UZMmDp1AiAyQMkQoD5ouUaZIgeIFjZ5DlSD5OXPkh5AlQ4L4QGLmD6NBbprAKWMFy5UrYtgkaSPIzhglX3jgkAEjRg8wQMLUmaOFSQ4aL1awUGEjB5Esd+Q8KVIDhYgOG0CYuKHDyZ4+W4ycAGFhQQIMHFLs4LKmFJkZJTxMcPCAwYUQLsgwrNJCg4QGFRRAGEGFYalQnD5kiBCBAglRoVwLBNXp0ydPn1wHBAA7';
var img_maximize='data:image/gif;base64,R0lGODlhDgAPAPcAACwoLCsnLOPn5tXZ1tTY1auyrH6cgElbSn+cgABkAABjAABYAKzIrKyyrGptamtta+Xn5cXGxaGioQNjAAJiADdwNjdvNa3JrEuBR0pbSUyCRyxDKi5FKlFWUCJNFqSooxltAEqLN0uLOFZ1TR1yACM/GVZwTcfbwI6XiyRAGY6WiyR5ACR4ACZRFE6XLlCWL2mjTmqjT8ncwKSooip5ACp4AFh6RS94AGKdNjuEADqAAGOcN2GGPF+EO56ll6KjoWqkLGujLoi4VYi5VkuLAEmKAEuKAGaqGmWoG2ipIJ6kl2KeFGyrH2KaHWKZHmaRL5DDTpO+X5S9XnKnKoK7MHOnK5LIRpLGR5TGT6LXV6PXWJzOVa7fabDha63eaaTTZbDgba/ebL3uervqebzqerjnebrnebbid8bzhsn4isv6jMn1iXyYVXeQU8fwjXqzIIS7MIS5MGyVL5vKU5K3WJi9XdP8k8zzjnixG4S4MNb8lNb5nIicZYSXY4KnPYKmPXmTR9j4nXiRRrjVfbvVg8zlkuH7pdDnluL7pKeoo9DQz8bGxezs7Onp6ejo6Ofn5+bm5uPj49LS0sXFxcPDw5ycnJubm5qampKSkpCQkImJiYeHh1lZWVhYWExMTEtLS0RERENDQz8/PxgYGP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAKQALAAAAAAOAA8AAAjdAEkJnLTJ06hRnzZNEsiwEqhOmiT80MQpVCWGlwA4aEBAAIQBBR4EsESKkqgDCBicsGFDxgUDGURRyrRBA4whUhYsiCIkBgYOmDpUeIEET54JFOK8OeLCQocSIZIoAFHjxg0aJBIwEZHCww4qLHQUMWKESI4VcHC0MBHkipYwZpYsIdMlixUgI1Q4mcNlDJopVdKIAbOlCYoIPaCcWWPnjx89aspg4bEo0ownX9zsQWQo0B0vcmZEIvUoURs6gwodIlSHzYdHDCEpUtJHECA+PiRBYsiwEaNGwB3xDggAOw==';

var doc2;

var access=0;
var timeout=0;			// enetmapmove	ajax
var timeout2=0;			// popup
var grafpack='';
var newmapsize=60;
var marker=null;
var divpopup;
var ev,evx,evy;
var itext=['','(9)','<img src='+imgp('img/un/r/3.gif')+'>','(6)','<img src='+imgp('img/un/r/2.gif')+'>','<img src='+imgp('img/un/r/1.gif')+'>','(15)'];
var kid;
var hideshowtypemap='';
var gmresurstypemap='mapc';

// support karte2
var k2_isk2=false;
var k2_stradd='';
var k2_hrefparam='href';
var k2_start=8;
var k2_dl=7;
var k2_groundimg='//div[@id="map_content"]/div[@class="mdiv"]/img';
var k2_grounddata='//div[@id="map_content"]/map/area';
//end support karte2

// ************************* windows value *******************
var win_zIndex = 1000;
var win_sizeW = 16;
var win_sizeE = 16;
var win_sizeN = 30;
var win_sizeS = 40;
var win_minWidth = 160;
//var win_maxWidth = ...
var win_minHeight = 86;
//var win_maxHeight = ...
// ************************************************************


var _setValue, _getValue, _removeValue, glStorage, nameSpace = 'TEMWW.';

var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
function find(xpath,xpres){
  var ret = document.evaluate(xpath,document,null,xpres,null);
  return  xpres == XPFirst ? ret.singleNodeValue : ret;
}

function _log(str){
	if(DEBUG) GM_log(str);
}

function initSaveValue() {
	if (window.globalStorage) {
		glStorage = globalStorage.namedItem(nameSpace + document.domain)
		_setValue = function(name, value) {
			glStorage.setItem(name, value);
		};
		_getValue = function(name, defaultValue) {
			var data = glStorage.getItem(name);
			return (data) ? data.value : defaultValue;
		};
		_removeValue = function(name) {
			glStorage.removeItem(name);
		};
	} else if (typeof GM_setValue != "undefined") {
		_setValue = function(name, value) { GM_setValue(name, value)};
		_getValue = function(name,defaultValue) { return GM_getValue(name, defaultValue)};
		_removeValue = function(name) { GM_setValue(name, '')};
	} else {
		_setValue = function(name, value) {
			document.cookie = nameSpace + name + '=' + escape(value) + ';expires="";path=/';
		};
		_getValue = function(name, defaultValue) {
			var reg = new RegExp(nameSpace + name + "=([^;\n\r]*);?", "i");
			var data = reg.exec(document.cookie);
			if (data == null || data.length <= 1) {
			return defaultValue;	
			} else 	return unescape(data[1]);
		};
		_removeValue = function(name) {
			_setValue(name, '');
		};
	}
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
	
function removeNode(node) { node.parentNode.removeChild(node) }

function init(){
	_log('+init');
	initSaveValue();
	initmenu();
	// ********************** Ask for Ally status *******************************
	var askForAlly = elem('div', 'id', 'em_askForAlly', '', '');
	var cont = '<div id="em_askForAlly_input_id" style="display:none"></div>' +
						 '<table class="tbg">' +
							'<tr>'+
								'<td id="em_askForAlly_input" colspan ="2" style="font-weight:bold"></td>' +
								'<td id="em_askForAlly_del" class="menu_item"><img src="' + imgp('/img/un/a/del.gif') + '"></td>' +
							'</tr>'+
							'<tr>'+
								'<td id="em_askForAlly_ally" align="center" class="menu_item">تحالف</td>'+
								'<td id="em_askForAlly_war" align="center" class="menu_item">حرب</td>'+
								'<td id="em_askForAlly_nap" align="center" class="menu_item">عدم اعتداء</td>'+
							'</tr>'+
						'</table>';
	askForAlly.innerHTML = cont;
	//askForAlly.setAttribute('style','position:absolute; top:300px; left: 400px;z-index: 2000; border: 1px solid #000; background-color: #FEFFE3');
	askForAlly.style.width = '200px';
	document.body.appendChild(askForAlly);
	$('em_askForAlly_ally').addEventListener('click', function(){addAllyStatusClick(1)}, false);
	$('em_askForAlly_war').addEventListener('click', function(){addAllyStatusClick(2)}, false);
	$('em_askForAlly_nap').addEventListener('click', function(){addAllyStatusClick(5)}, false);
	$('em_askForAlly_del').addEventListener('click', function(){addAllyStatusClick(-1)}, false);
	var win = win_create('em_window_askForAlly',{title: 'تغيير وضع التحالف', closable: 1, minimizable: 1, left: '330px', top: '350px',});
	win_appendChild(win , askForAlly, true);
	// **************************************************************************
	// ********************** Show all Ally Status ******************************
	var allAllyStatus = elem('div', 'id', 'em_allyall', '', '');
	var cont = '<table class="tbg">' +
							'<tr class = "rbg">'+
								'<td>التحالف</td>'+
								'<td>الحرب</td>'+
								'<td>عدم الاعتداء</td>'+
							'</tr>'+
							'<tr>'+
								'<td id="em_allyall_ally" valign="top">-</td>'+
								'<td id="em_allyall_war" valign="top">-</td>'+
								'<td id="em_allyall_nap" valign="top">-</td>'+
							'</tr>'+
						'</table>';
	allAllyStatus.innerHTML = cont;
	//allyAll.setAttribute('style','position:absolute; top:200px; left: 150px;z-index: 2000; border: 1px solid #000; background-color: #FEFFE3');
	//allyAll.style.width = '450px';
	document.body.appendChild(allAllyStatus);
	doc2 = document.implementation.createDocument("", "", null);
	doc2.appendChild(allAllyStatus);
	var win = win_create('em_window_allAllyStatus',{title: 'احصائيات عن كل التحالفات', closable: 1, minimizable: 1, saving: 1,left: '150px', top: '200px', width: '450px', height: '150px'});
	win_appendChild(win , allAllyStatus, false);
	// **************************************************************************

	//
	var gp=find('//link[@rel="stylesheet"]',XPList);
	for(var i=0;i<gp.snapshotLength;i++){
		var csspos=gp.snapshotItem(i).href.indexOf('unx.css');
		if (csspos!=-1){
			grafpack=gp.snapshotItem(i).href.substring(0,csspos);
		}
	};
	if(window.location.href.match(/allianz.php/)) {
		allianzFill();
	}
	if(window.location.href.match(/karte.php/)){
		if ($('map_content') != null) {
			_setValue('mapc',_getValue('mapccrop',''));
			access=1;
		}
	}
	if(window.location.href.match(/karte2.php/)){
		access=1;
		k2_isk2=true;
		k2_stradd='_xxl';
		k2_hrefparam='onclick';
		k2_start=4;
		k2_dl=13;
		k2_groundimg='//html/body/div/img';
		k2_grounddata='//map[@name="map2"]/area';
	};
	if(access==0){
		_setValue('mapc','');
		return false;
	};
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
		// popup
	var divpopupo=document.createElement('DIV');
	divpopupo.setAttribute('style',"position:relative;left:43px;top:-387px;");
	divpopup = document.createElement("DIV");
	divpopup.setAttribute("id", "em_popup");
	divpopup.setAttribute("style", "position:absolute; padding: 1px; z-index: 1000; border: solid 1px #00C000; background-color: #FEFFE3; display: none;");
	divpopupo.appendChild(divpopup);
	if(k2_isk2){
		document.body.appendChild(divpopupo);
	} else {
		$('lmid2').appendChild(divpopupo);
	};
	// End Popup

	_log('-init');
}

function allianzFill(){
	_log('+allianzFill');
	var oldStatus = document.getElementsByName('em_allyStatus');
	var length = oldStatus.length
	for(var i=0; i < length; i++) {
		removeNode(oldStatus[0]);
	}
	var iallyStatus, ally, aid;
	var allyStatus = _getValue('allystatus', '');
	allyStatus = allyStatus.split(',');
	//allyLinks =find('//a[starts-with(@href, "allianz.php?aid=")]',XPList);
	allyLinks = document.evaluate('//a[starts-with(@href, "allianz.php?aid=")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	//
	for( var i = 0; i< document.links.length; i++){
		var a = document.links[i];
		if (a.href.indexOf('allianz.php?aid=') > -1 && a.href[a.href.length-1] != '#') {
			_log('i=' + i + ' href=' + a.href + ' last=' + a.href[a.href.length-1]);
//	}
	//
//		_log(allyLinks.snapshotLength);
//	for (var i = 0; i < allyLinks.snapshotLength; i++) {
//		var a = allyLinks.snapshotItem(i);
		ally = a.innerHTML;
		aid = a.href.match(/aid=(\d+)/).pop();
		iallyStatus = allyStatus.indexOf(ally);
		if (iallyStatus != -1) {
			var value = allyStatus[iallyStatus + 1];
			switch (value) {
				case '1':
					color = '#0C0';
					text = 'A';
					break;
				case '2':
					color = '#F00';
					text = 'W';
					break;
				case '5':
					color = '#00F';
					text = 'N';
					break;
				default:
					color = '';
					text = 'Err';
				}
		} else {
			color = '';
			text = 'X';
		}
		var el = elem('span', 'name', 'em_allyStatus', 'allyStatus', text);
		el.setAttribute('msg', ally + '_' + aid);
		el.style.color = color;
		el.addEventListener('click', function(){ 
				var p = this.getAttribute('msg').split('_');
				$('em_askForAlly_input').innerHTML = p[0];
				$('em_askForAlly_input_id').innerHTML = p[1];
				win_show($('em_window_askForAlly'));
				win_toFront($('em_window_askForAlly'));
			}, false);
		a.parentNode.insertBefore(el,a.nextSibling)
		//a.parentNode.appendChild(el);
		}
	}
	_log('-allianzFill');
}

function addAllyStatusClick(value) {
	_log('+addAllyStatusClick');
	win_close($('em_window_askForAlly'));
	var allyStr = $('em_askForAlly_input').innerHTML
	if (allyStr != '') {
		var allyId = $('em_askForAlly_input_id').innerHTML
		addAllyStatus(allyStr, value, allyId);
		$('em_askForAlly_input').innerHTML = '';
		$('em_askForAlly_input_id').innerHTML = '';
		//allianzFill();
		allAllyStatusFill();
	}
	_log('-addAllyStatusClick');
}
	
function addAllyStatus(ally, value, allyId) {
	_log('+addAllyStatus');
	var allyStatus = _getValue('allystatus', '');
	allyStatus = allyStatus.split(',');
	var iallyStatus = allyStatus.indexOf(ally);
	if (iallyStatus != -1 && value != -1) {
		allyStatus[iallyStatus + 1] = value;
		allyStatus[iallyStatus + 2] = allyId;
		allyStatus = allyStatus.join(',');
	}
	if (iallyStatus == -1 && value != -1){
		allyStatus = allyStatus.join(',') + ally + ',' + value + ',' + allyId + ',';
	}
	if (iallyStatus != -1 && value == -1){
		allyStatus.splice(iallyStatus, 3);
		allyStatus = allyStatus.join(',');
	}
	_setValue('allystatus', allyStatus);
	_log('-addAllyStatus');
}

function allAllyStatusFill() {
	_log('+allAllyStatusFill');
	$('em_allyall_ally').innerHTML ='';
	$('em_allyall_war').innerHTML ='';
	$('em_allyall_nap').innerHTML ='';
	var allyStatus = _getValue('allystatus', '');
	allyStatus = allyStatus.split(',');
	for(var i = 0; i < allyStatus.length -1; i+=3) {
		var allyName = allyStatus[i];
		var allyS = allyStatus[i+1];
		var allyId = allyStatus[i+2];
		switch (allyS) {
			case '1': var allyTd = 'em_allyall_ally'; break;
			case '2': var allyTd = 'em_allyall_war'; break;
			case '5': var allyTd = 'em_allyall_nap'; break;
//			default:GM_log('Error: allAllyStatusFill allyS=' + allyS); return;
		}
		var div = elem('div', '', '', '', '<a href="http://speed.travian.ru/allianz.php?aid=' + allyId + '" title="Id:' + allyId + '">' + allyName + '</a>');
		$(allyTd).appendChild(div);
	}
	allianzFill();
	_log('-allAllyStatusFill');
}

function infomap(){
	if(k2_isk2)return;
	var t=document.getElementById('em_infomap');
	if(t!=null){
		t.parentNode.removeChild(t);
	} else {
		var divTable = document.createElement('div');
		divTable.id = 'em_divTable';
		divTable.style.width = '500px';
		divTable.style.marginTop = '50px';
//		divTable.style.display = 'none';
		$('lmid2').appendChild(divTable);
	}
	var table = document.createElement('TABLE');
	table.setAttribute("id", "em_infomap");
	table.setAttribute("sortCol", '-1');
	table.setAttribute("class", "tbg");
	table.setAttribute("align", "center");
	table.setAttribute("cellspacing", "1");
	table.setAttribute("cellpadding", "2");
//	table.style.display=getSetting('em_infomap','');
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
//	table.style.position = 'absolute';
//	table.style.top = 460+'px';
	var divTable = $('em_divTable');
	divTable.appendChild(table);
//	document.getElementById('lmid1').appendChild(divTable);
};

function drawNewMap(){
	_log('+drawNewMap');
	var mapr=k2_dl;
	var cont=''
	var allyList = _getValue('allystatus', '');
	allyList = allyList.split(',');
	// Marker
	var grounddata=find(k2_grounddata,XPList);
	var groundimg=find(k2_groundimg,XPList);
	if(!k2_isk2)groundimg.snapshotItem(0).parentNode.appendChild(elem('div','','','','<img id="mapmarker" class="mt1" src='+imgmarker+' style="z-index: 100; color: RGB(249, 201, 16); display: none">'));
	marker=document.getElementById('mapmarker');
	// End Marker
if(!hidenewmap){
		var table = document.createElement('TABLE');
		table.setAttribute("id", "newmap");
		table.setAttribute("align", "center");
		table.setAttribute("cellspacing", "1");
		table.setAttribute("cellpadding", "0");
		table.setAttribute("class", "f8");
		table.setAttribute("bgcolor", "#00AA00");
		table.setAttribute("border", "0");
		var tbody = document.createElement("TBODY"); 
	};
	for(var i = 0; i<mapr; i++){
	if(!hidenewmap)var row = document.createElement('TR');
		for(var j = 0; j<mapr; j++){
			var count=parseInt(i*mapr+j);
			var cgd=grounddata.snapshotItem(count+k2_start);
			var cgi=groundimg.snapshotItem(count)
			if(k2_isk2){
				var k2_l=cgi.style.left;
				var k2_t=cgi.style.top;
				var divs=elem('div','style','position: absolute;left:'+k2_l+';top:'+k2_t,'','<div id="em_type'+parseInt(count+1)+'" t="0" style="position:relative;left:31px;top:43px;border: solid 1px #00C000; background-color: #FEFFE3;-moz-border-radius: 8px; display: none"></div>')
			} else {
				var divs=elem('div','','','mt'+parseInt(count+1) + ' f10','<div id="em_type'+parseInt(count+1)+'" t="0" style="position:relative;left:31px;top:43px;border: solid 1px #00C000; background-color: #FEFFE3;-moz-border-radius: 8px; display: none">*</div>')
			}
    	cgi.parentNode.appendChild(divs);

			cgi.src.match(/img\/un\/m\/(\w)(\d|(\d)(\d))\.gif/);
			_log(cgi.src + '\n1=' + RegExp.$1 + ';2=' + RegExp.$2 + ';3=' + RegExp.$3 + ';4=' + RegExp.$4 + ';5=' + RegExp.$5);
			var t  = RegExp.$1;
			var v  = RegExp.$2;
//			var v1 = RegExp.$3;
//			var v2 = RegExp.$4;
			if ( (t == 'd') && (!k2_isk2) ) {
				ally = cgd.getAttribute('onmouseover').split("','")[3];
				if(ally == '') ally = ' ';
				var ially = allyList.indexOf(ally);
				_log('this d "' + ally + '" "' + ially + '"'); 
				if ( ially != -1) {
					cgi.setAttribute('src', cgi.getAttribute('src').replace('4.gif', allyList[ially + 1] + '.gif'));
				}
			}
			if(!hidenewmap){
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
				};
				//var kid=cgd.href.match(/d=(\d+)\&/).pop();
				var td = elem('TD','','','',cont);
				td.setAttribute('bgcolor',imgsrc);
				td.setAttribute("align", "center");
				td.width=newmapsize+'px';
				td.height=newmapsize+'px';
				td.setAttribute('onmouseover',cgd.getAttribute('onmouseover'));
				td.setAttribute('onmouseout',cgd.getAttribute('onmouseout'));
				row.appendChild(td);
			};
			if(!k2_isk2){
				cgd.addEventListener('click',eventmapclick,false);
				cgd.setAttribute('xy',cgi.className);
				cgd.setAttribute('goto',cgd.getAttribute(k2_hrefparam));
				cgd.href='javascript:void(0)';
			}
			if(k2_isk2){
				cgd.setAttribute('xy',cgi.style.left+'_'+cgi.style.top);
				cgd.setAttribute('goto',cgd.getAttribute(k2_hrefparam).match(/href=\"(.{1,})\"/).pop());
				cgd.getAttribute(k2_hrefparam).match(/d=(\d+)\&c=(.{2})/)
				cgd.href='karte2.php?z='+RegExp.$1;
				cgd.setAttribute('onclick','var forNote="karte.php?z='+RegExp.$1+'"');
			};
			
			cgd.addEventListener('mouseover',eventmappopup,false);
			cgd.addEventListener('mouseout',function(){clearTimeout(timeout)},false);
//			cgd.setAttribute('onclick','');
			cgd.setAttribute('imgtype',t);
		};
	if(!hidenewmap)tbody.appendChild(row);
	};
	if(!k2_isk2){
		for(var i=0;i<k2_start;i++){
			var cgd=grounddata.snapshotItem(i)
			var kid=cgd.getAttribute('onclick').match(/z=(\d+)/).pop();
			cgd.setAttribute('goto','d='+kid);
			cgd.href='javascript:void(0)';
			cgd.addEventListener('click',eventmapclick,false);
			cgd.setAttribute('onclick','');
		};
	};

	if(!hidenewmap){
		table.setAttribute('style','position: absolute; top: 560px; z-index:5;');
		table.appendChild(tbody);
		document.body.appendChild(table);
	};
	_log('-drawNewMap');
}

function showtype(){
	var im, kid, reg, it;
	var grounddata=find(k2_grounddata,XPList);
	im=_getValue(gmresurstypemap,'');
	for(var i=k2_start;i<grounddata.snapshotLength;i++){
		gd=grounddata.snapshotItem(i);
		if(gd.getAttribute('goto')!=''){
			kid=gd.getAttribute('goto').match(/d=(\d+)/).pop();
			reg=new RegExp(kid+'\=(\\d+)');
			it=im.match(reg);
			var divtype=document.getElementById('em_type'+parseInt((i-k2_start+1)));
			if(it!=null){
				divtype.innerHTML=itext[it[1]];
				divtype.style.display=hideshowtypemap;
			};
		};
	}
}

function eventmapclick(ev){
	divpopup.style.display='none';
	clearTimeout(timeout2);
	var mid=ev.target.getAttribute('goto').match(/d=(\d+)/).pop();
	myajax('ajax.php?action=map_content&z='+mid, function(z){
		document.getElementById('map_content').innerHTML=z.responseText;
		drawNewMap();
		infomap();
		showtype();
		});
};

function eventmappopup(ev){
	// opener.location.href="karte.php?d=253786&c=e3", self.close()
	
	if(ev.target.getAttribute('goto')=='')return;
	
	var link=ev.target.getAttribute('goto');
	var kid=link.match(/d=(\d+)/).pop()
	var xy=ev.target.getAttribute('xy');
	
	divpopup.style.display='none';
	clearTimeout(timeout2);
	
	divpopup.innerHTML='';
	if(k2_isk2){
		xy=xy.split('_');
		divpopup.innerHTML ='<a href="javascript:void(0)" onclick="opener.location.href=\''+link+'\', self.close()"><img src='+imgenter+' height="16"></a>'
		divpopup.innerHTML+='<a href="javascript:void(0)" onclick="javascript:opener.location.href=\''+link+'\'"><img src='+imgnw+' height="16"></a>';
		divpopup.innerHTML+='<a href="javascript:void(0)" onclick="javascript:opener.location.href=\'a2b.php?z='+kid+'\', self.close(0)"><img src='+imgatt+' ></a>';
		divpopup.style.left=xy[0];
		divpopup.style.top=xy[1];
		divpopup.parentNode.style.left='72px';
		divpopup.parentNode.style.top='42px';
	} else {
		divpopup.innerHTML ='<a href='+link+'><img src='+imgenter+' height="16"></a>'
		divpopup.innerHTML+='<a target="_blank" href='+link+'><img src='+imgnw+' height="16"></a>';
		divpopup.innerHTML+='<a href="a2b.php?z='+kid+'"><img src='+imgatt+' ></a>';
		divpopup.className=xy;
	};
	timeout2=setTimeout(function(){if(timeout2==0)return;divpopup.style.display='';},1000);
	if(ev.target.getAttribute('imgtype')!='o'){
		var im=_getValue('mapc','');
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
	if(v==1||v==6) _setValue('mapccrop',_getValue('mapccrop','')+kid+'='+v+';');
	_setValue('mapc',_getValue('mapc','')+kid+'='+v+';');
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
	_log('+myajax\nParam: url='+url1);
	var g = new XMLHttpRequest();
	g.onreadystatechange=function(){
		if(g.readyState==4&&g.status==200){
			onfunc(g);
		};
	};
	g.open("GET",url1,true);
	g.send(null);
	_log('-myajax');
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
	_log('+mcheckallevent');
	var im, reg, it, link, counter=1;
	divpopup.style.display='none';
	var grounddata=find(k2_grounddata,XPList);
	im=_getValue('mapc','');
	for(var i=k2_start;i<grounddata.snapshotLength;i++){
		if(grounddata.snapshotItem(i).getAttribute('imgtype')!='o'){
			link=grounddata.snapshotItem(i).getAttribute('goto');
			kid=link.match(/d=(\d+)/).pop();
			reg=new RegExp(kid+'\=(\\d+)');
			it=im.match(reg);
			if(it==null){
				timeout=setTimeout(myajax,600*(counter++),link,gettyped);
//				document.body.appendChild(elem('div','style','z-index:1000','',counter));
		//		myajax(link,gettyped);
			}
		}
	}
	_log('-mcheckallevent');
}


function id(id){
	return document.getElementById(id);
};

function $(id){
	return document.getElementById(id);
}


function getSetting(value, defaultvalue){
	var set=_getValue('setting','');
	if((set=='') || (set == null)) return defaultvalue;
	set=set.split(',');
	var iset=set.indexOf(value);
	if(iset<0){
		return defaultvalue;
	}else{
		return set[iset+1];
	};
};

function setSetting(value,value2){
	var set=_getValue('setting','');
	var iset=set.indexOf(value);
	if(iset<0||set==''||set==null){
		set=set+value+','+value2+',';
	}else{
		set=set.split(',');
		iset=set.indexOf(value);
		set[iset+1]=value2;
		set=set.join(',');
	};
	_setValue('setting',set);
};

function mainmenuevent(){
	var mm=id('em_mainmenu');
	if(getSetting('em_mainmenu','none')=='none'){
		mm.style.display='';
		setSetting('em_mainmenu','')
	}else{
		mm.style.display='none';
		setSetting('em_mainmenu','none');
	};
};

function mtypehideshowevent(ev){
	if(getSetting('hideshowtypemap','')=='none'){
		hideshowtypemap='';
		id('em_hideshow').innerHTML='المصادر: اخفاء الكل/<b>عرض الكل</b>';
		setSetting('hideshowtypemap','')
	}else{
		if(getSetting('gmresurstypemap')=='mapccrop'){
			gmresurstypemap='mapc';
		};
		hideshowtypemap='none';
		id('em_hideshow').innerHTML='المصادر: <b>اخفاء الكل</b>/عرض الكل';
		setSetting('hideshowtypemap','none')
	};
	showtype();
	gmresurstypemap=getSetting('gmresurstypemap','');
};

function mtypeallcropevent(ev){
	if(getSetting('gmresurstypemap','mapc')=='mapc'){
		hideshowtypemap='none';
		showtype();
		gmresurstypemap='mapccrop';
        id('em_allcrop').innerHTML='المصادر: عرض الكل/<b>القمح فقط</b>';
        setSetting('gmresurstypemap','mapccrop')
	}else{
		gmresurstypemap='mapc';
        id('em_allcrop').innerHTML='المصادر: <b>عرض الكل</b>/القمح فقط';
        setSetting('gmresurstypemap','mapc')
	};
	hideshowtypemap=getSetting('hideshowtypemap','');
	showtype();
};

function mtablehideshowevent(ev){
	var mm=id('em_window_table');
	if(getSetting('em_infomap','')=='none'){
		mm.style.display='';
        id('em_table').innerHTML='الجدول: اخفاء/<b>عرض</b>';
        setSetting('em_infomap','')
	}else{
		mm.style.display='none';
        id('em_table').innerHTML='الجدول: <b>اخفاء</b>/عرض';
        setSetting('em_infomap','none')
	};
};

function mexportcropevent(ev){	// Export crop
	id('em_exportimportcrop_caption').innerHTML='Export crop';
	id('em_exportimportcrop_area').innerHTML='<textarea style="height:300px;width:196px">'+_getValue('mapccrop').split(';').join('\n')+'</textarea>';
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

function menu_swap(key) {
	var el = $(key + '_swap');
	if (getSetting(key, 0) == 1) {
		el.innerHTML = 'Hide/<b msg="' + key + '">Show</b>';
	} else {
		el.innerHTML = '<b msg="' + key + '">Hide</b>/Show';
	}
}
		
function mainMenuClick(ev) {
	_log('+mainMenuClick; target = "' + ev.target.getAttribute('msg') + '"');
	var msg = ev.target.getAttribute('msg');
	if (msg == null) return;
	switch (msg) {
		case 'em_WinAll':
		case 'em_WinDorf1':
		case 'em_WinDorf2':
		case 'em_WinKarte':
		case 'em_WinKarte2':
		case 'em_WinBerichte':
		case 'em_WinStatistiken':
		case 'em_WinNachrichten':
		case 'em_WinBuild':
		case 'em_WinAllianz':
		case 'em_WinSpieler':
		case 'em_WinLeftmenu':
		case 'em_WinCenter':
		case 'em_WinVillages':
		case 'em_WinInfotable':
		case 'em_WinResource':
			if (getSetting(msg, 0) == 1) {
				_log('hide');
				setSetting(msg, 0);
			} else {
				_log('show');
				setSetting(msg, 1);
			};
			menu_swap(msg);
			break;
		case 'em_allAllyStatus':
			$('em_askForAlly_input').innerHTML = '';
			allAllyStatusFill();
			win_show($('em_window_allAllyStatus'));
			win_toFront($('em_window_allAllyStatus'));
			break;
		case 'em_searchAllyThis':
			allAllyStatusFill();
			break;
	}
	switch (msg) {
		case 'em_WinAll':
			if (getSetting(msg, 0) == 1) {
				$('em_winHide').style.display = '';
			} else {
				$('em_winHide').style.display = 'none';
			}
			break;
		}
	_log('-mainMenuClick');
}

function initmenu(){
	_log('+initmenu');
	var isKarte = 0;
	var h = window.location.href;
	var mSeparator = function() { return document.createElement('hr')}
	if ( (h.indexOf('karte.php') > 0) || (h.indexOf('karte2.php') > 0) ) {
		isKarte = 1;
	}
	if(isKarte){
		// create menu
		mcheckall=elem('div','id','em_checkall','menu_item','المصادر: البحث عن الجميع');
		mcheckall.addEventListener('click',mcheckallevent,false);
	
		mtypehideshow=elem('div','id','em_hideshow','menu_item','المصادر: اخفاء الكل/<b>عرض الكل</b>');
		mtypehideshow.addEventListener('click',mtypehideshowevent,false);
	
		mtypeallcrop=elem('div','id','em_allcrop','menu_item','المصادر: <b>عرض الكل</b>/القمح فقط');
		mtypeallcrop.addEventListener('click',mtypeallcropevent,false);
	
        mtablehideshow=elem('div','id','em_table','menu_item','الجدول: اخفاء/<b>عرض</b>');
        mtablehideshow.addEventListener('click',mtablehideshowevent,false);
	
		mexportcrop=elem('div','id','em_exportcrop','menu_item','Export crop');
		mexportcrop.addEventListener('click',mexportcropevent,false);
	
		mimportcrop=elem('div','id','em_importcrop','menu_item','Import crop');
		mimportcrop.addEventListener('click',mimportcropevent,false);
	}
	mAddAllyStatus = elem('div', 'msg', 'em_allAllyStatus', 'menu_item', 'التحالفات: احصائيات التحالفات');
mSearchAllyThis = elem('div', 'msg', 'em_searchAllyThis', 'menu_item', 'التحالفات: البحث في هذه الصفحة');
mWinAll = elem('div', 'msg', 'em_WinAll', 'menu_item', 'Win: All <span id="em_WinAll_swap" msg="em_WinAll">اخفاء/<b msg="em_WinAll">عرض</b></span>');
	mWinDorf1 = elem('div', 'msg', 'em_WinDorf1', 'menu_item', 'Win: Dorf1 <span id="em_WinDorf1_swap" msg="em_WinDorf1">اخفاء/<b msg="em_WinDorf1">عرض</b></span>');
	mWinDorf2 = elem('div', 'msg', 'em_WinDorf2', 'menu_item', 'Win: Dorf2 <span id="em_WinDorf2_swap" msg="em_WinDorf2">اخفاء/<b msg="em_WinDorf2">عرض</b></span>');
	mWinKarte = elem('div', 'msg', 'em_WinKarte', 'menu_item', 'Win: Karte <span id="em_WinKarte_swap" msg="em_WinKarte">اخفاء/<b msg="em_WinKarte">عرض</b></span>');
	mWinkarte2 = elem('div', 'msg', 'em_WinKarte2', 'menu_item', 'Win: Karte2 <span id="em_WinKarte2_swap" msg="em_WinKarte2">اخفاء/<b msg="em_WinKarte2">عرض</b></span>');
	mWinBerichte = elem('div', 'msg', 'em_WinBerichte', 'menu_item', 'Win: Berichte <span id="em_WinBerichte_swap" msg="em_WinBerichte">اخفاء/<b msg="em_WinBerichte">عرض</b></span>');
	mWinStatistiken = elem('div', 'msg', 'em_WinStatistiken', 'menu_item', 'Win: Statistiken <span id="em_WinStatistiken_swap" msg="em_WinStatistiken">اخفاء/<b msg="em_WinStatistiken">عرض</b></span>');
	mWinNachrichten = elem('div', 'msg', 'em_WinNachrichten', 'menu_item', 'Win: Nachrichten <span id="em_WinNachrichten_swap" msg="em_WinNachrichten">اخفاء/<b msg="em_WinNachrichten"عرض</b></span>');
	mWinBuild = elem('div', 'msg', 'em_WinBuild', 'menu_item', 'Win: Build <span id="em_WinBuild_swap" msg="em_WinBuild">Hide/<b msg="em_WinBuild">عرض</b></span>');
	mWinAllianz = elem('div', 'msg', 'em_WinAllianz', 'menu_item', 'Win: Allianz <span id="em_WinAllianz_swap" msg="em_WinAllianz">Hide/<b msg="em_WinAllianz">عرض</b></span>');
	mWinSpieler = elem('div', 'msg', 'em_WinSpieler', 'menu_item', 'Win: Spieler <span id="em_WinSpieler_swap" msg="em_WinSpieler">اخفاء/<b msg="em_WinSpieler">عرض</b></span>');
	mWinLeftmenu = elem('div', 'msg', 'em_WinLeftmenu', 'menu_item', 'Win: Left menu <span id="em_WinLeftmenu_swap" msg="em_WinLeftmenu">اخفاء/<b msg="em_WinLeftmenu">عرض</b></span>');
	mWinCenter = elem('div', 'msg', 'em_WinCenter', 'menu_item', 'Win: Center <span id="em_WinCenter_swap" msg="em_WinCenter">اخفاء/<b msg="em_WinCenter">عرض</b></span>');
	mWinVillages = elem('div', 'msg', 'em_WinVillages', 'menu_item', 'Win: Villages <span id="em_WinVillages_swap" msg="em_WinVillages">اخفاء/<b msg="em_WinVillages">عرض</b></span>');
	mWinInfotable = elem('div', 'msg', 'em_WinInfotable', 'menu_item', 'Win: Infotable <span id="em_WinInfotable_swap" msg="em_WinInfotable">اخفاء/<b msg="em_WinInfotable">عرض</b></span>');
	mWinResource = elem('div', 'msg', 'em_WinResource', 'menu_item', 'Win: Resource <span id="em_WinResource_swap" msg="em_WinResource">اخفاء/<b msg="em_WinResource">عرض</b></span>');
	
	mWinDiv = elem('div', 'id' , 'em_winHide', '', '');

	mWinDiv.appendChild(mWinDorf1);
	mWinDiv.appendChild(mWinDorf2);
	mWinDiv.appendChild(mWinKarte);
//	mainmenu.appendChild(mWinkarte2);
	mWinDiv.appendChild(mWinBerichte);
	mWinDiv.appendChild(mWinStatistiken);
	mWinDiv.appendChild(mWinNachrichten);
	mWinDiv.appendChild(mWinBuild);
	mWinDiv.appendChild(mWinAllianz);
	mWinDiv.appendChild(mWinSpieler);
	mWinDiv.appendChild(mWinLeftmenu);
	mWinDiv.appendChild(mWinCenter);
	mWinDiv.appendChild(mWinVillages);


	mainmenu=elem('div','id','em_mainmenu','','');
	mainmenu.style.display = 'none';

	if(isKarte) {
		mainmenu.appendChild(mcheckall);
		mainmenu.appendChild(mtypehideshow);
		mainmenu.appendChild(mtypeallcrop);
		mainmenu.appendChild(mtablehideshow);
//	mainmenu.appendChild(mexportcrop);
//	mainmenu.appendChild(mimportcrop);
		mainmenu.appendChild(mSeparator());
	}
	mainmenu.appendChild(mAddAllyStatus);
	mainmenu.appendChild(mSearchAllyThis);
	mainmenu.appendChild(mSeparator());
	mainmenu.appendChild(mWinAll);
	mainmenu.appendChild(mWinDiv);
	mainmenu.appendChild(mWinInfotable);
	mainmenu.appendChild(mWinResource);
	mainmenu.appendChild(mSeparator());
	mainmenu.appendChild(elem('div','','','','<a href='+ScriptLink+' title="Go to http://userscripts.org" target="_blank">' + ScriptName + '<br>نسخة ' + ScriptVersion + '</a>'));
  mainmenu.addEventListener('click', mainMenuClick, false);
	document.body.appendChild(mainmenu);
	
	if(isKarte){
		// mainmenu
		var mm=id('em_mainmenu');
		if(getSetting('em_mainmenu','none')=='none'){
			mm.style.display='none';
		}else{
			mm.style.display='';
		};
		// type hide show
		if(getSetting('hideshowtypemap','')=='none'){
			hideshowtypemap='none';
            id('em_hideshow').innerHTML='المصادر: <b>اخفاء الكل</b>/عرض الكل';
            }else{
            id('em_hideshow').innerHTML='المصادر: اخفاء الكل/<b>عرض الكل</b>';
};
		// type all crop
		if(getSetting('gmresurstypemap','mapc')=='mapc'){
			id('em_allcrop').innerHTML='المصادر: <b>عرض الكل</b>/القمح فقط';
			gmresurstypemap='mapc';
		}else{
        	id('em_allcrop').innerHTML='المصادر: عرض الكل/<b>القمح فقط</b>';
        	gmresurstypemap='mapccrop';
		};
		// table hide sow
		mm=id('em_window_table');
		if(getSetting('em_infomap','')=='none'){
        id('em_table').innerHTML='الجدول : <b>اخفاء</b>/عرض';
        }else{
        id('em_table').innerHTML='الجدول: اخفاء/<b>عرض</b>';
        };
	}
	if (getSetting('em_WinAll', 0) == 1) {
		$('em_winHide').style.display = '';
	} else {
		$('em_winHide').style.display = 'none';
	}

	var menuarr = ['em_WinAll', 'em_WinDorf1', 'em_WinDorf2', 'em_WinKarte', 'em_WinBerichte',
								 'em_WinStatistiken', 'em_WinLeftmenu', 'em_WinCenter', 'em_WinVillages', 'em_WinInfotable',
								 'em_WinResource', 'em_WinNachrichten', 'em_WinBuild', 'em_WinAllianz', 'em_WinSpieler'];
	for (var i=0; i<menuarr.length; i++) {
		menu_swap(menuarr[i]);
	};
	_log('-initmenu');
};




function main(){
	_log('Travian: Extended map started\n+main');
	if(init()==false)return;
	drawNewMap();
	infomap();
	showtype();
	_log('-main');
};

main();

var css_s = '.menu_item { cursor: pointer; -moz-user-select:none; white-space: nowrap;}'+
						'.allyStatus {padding: 0px; border: solid 1px #000; background-color: #FEFFE3; font-weight: bold; cursor: pointer;}';

GM_addStyle(css_s);


//***************** Windows script ***********************
// **** Style mac_x_shadow on window prototype project *****
var css='.window_nw { background: transparent url(' + img_nw + ') no-repeat 0 0;width:24px; height:30px;}' +
				'.window_n { background: transparent url(' + img_n + ') repeat-x 0 0;	height:30px;}' +
				'.window_ne { background: transparent url(' + img_ne + ') no-repeat 0 0; width:31px; height:30px;}' +
				'.window_w { background: transparent url(' + img_w + ') repeat-y top left; width:16px;}' +
				'.window_e { background: transparent url(' + img_e + ') repeat-y top right; width:16px;}' +
				'.window_sw { background: transparent url(' + img_sw + ') no-repeat 0 0; width:31px; height:40px;}' +
				'.window_s { background: transparent url(' + img_s + ') repeat-x 0 0; height:40px;}' +
				'.window_se, .window_sizer { background: transparent url(' + img_se + ') no-repeat 0 0; width:31px; height:40px;}' +
				'.window_sizer { cursor:se-resize;}' +
				'.window_close { width: 19px;	height: 19px;	background: transparent url(' + img_close + ') no-repeat 0 0; position:absolute;	top:12px;	left:25px; cursor:pointer; z-index:1000;}' +
				'.window_minimize {	width: 19px; height: 19px; background: transparent url(' + img_minimize + ') no-repeat 0 0; position:absolute; top:12px;	left:45px; cursor:pointer; z-index:1000;}' +
				'.window_maximize {	width: 19px; height: 19px; background: transparent url(' + img_maximize + ') no-repeat 0 0; position:absolute; top:12px; left:45px; cursor:pointer; z-index:1000;}' +
				'.window_title { float:left; height:14px; font-family: Tahoma, Arial, sans-serif; font-size:12px; text-align:center; margin-top:8px; width:100%; color:#000; -moz-user-select:none;}' +
				'.window_content { overflow: auto; font-size: 10pt; background: #CCC}' +
				'.window_noselect { -moz-user-select:none;}' +
				'.dialog { display: block; position: absolute;}' +
				'.dialog table.table_window  { border-collapse: collapse;	border-spacing: 0; width: 100%; margin: 0px; padding:0px;}' +
				'.window_td  {padding: 0;}' +
				'.top_draggable, .bottom_draggable { cursor:move;}'
// **** Style mac_x_shadow on window prototype project *****

GM_addStyle(css);



// *** options:
// title: str
// closable: 1|0
// minizable: 1|0
// resizable: 1|0
// minimize: 1|0
// left: value + px
// top: value + px
// width: value + px
// height: value + px

function win_create(nameWindow, optionsWindow){
	_log('+win_create ' + nameWindow + ' ' + optionsWindow);
	if (nameWindow == '') return null;
	var win = document.createElement('DIV');
	win.id = nameWindow;
	win.className = 'dialog';
	win.style.display = 'none';
	win.style.zIndex = win_zIndex; win_zIndex++;

	
	var divClose = optionsWindow.closable ? '<div id="' + nameWindow + '_close" class="window_close"></div>' : '';
	var divMinimize = optionsWindow.minimizable ? '<div id="' + nameWindow + '_minimize" class="window_minimize"></div>' : '';
	var titleContent = optionsWindow.title ? optionsWindow.title : 'Window';
	var dialogContent = '&nbsp';
	
	win.innerHTML = divClose + divMinimize +
									'<table id="' + nameWindow + '_row1" class="table_window">' +
										'<tr id="' + nameWindow + '_top_drag">' +
											'<td id="' + nameWindow + '_nw" class="window_nw window_td window_noselect top_draggable">&nbsp</td>' +
											'<td id="' + nameWindow + '_n" class="window_n window_td window_noselect top_draggable"><div id="' + nameWindow + '_title" class="window_title top_draggable">' + titleContent + '</div></td>' +
											'<td class="window_ne window_td window_noselect top_draggable">&nbsp</td>' +
										'</tr>' +
									'</table>' +
									'<table id="' + nameWindow + '_row2" class="table_window">' +
										'<tr>' +
											'<td id="' + nameWindow + '_w" class="window_w window_td window_noselect">&nbsp</td>' +
											'<td class="window_td window_content" valign="top"><div id="' + nameWindow + '_content" class="window_content">' + dialogContent + '</div></td>' +
											'<td id="' + nameWindow + '_e" class="window_e window_td window_noselect">&nbsp</td>' +
										'</tr>' +
									'</table>' +
									'<table id="' + nameWindow + '_row3" class="table_window">' +
										'<tr>' +
											'<td class="window_sw window_td window_noselect">&nbsp</td>' +
											'<td id="' + nameWindow + '_s" class="window_s window_td window_noselect">&nbsp</td>' +
											'<td id="' + nameWindow + '_resize" class="window_se window_td window_noselect window_sizer">&nbsp</td>' +
										'</tr>' +
									'</table>';

	document.body.appendChild(win);
	
	if( typeof optionsWindow.saving != 'undefined') {
		var saving = optionsWindow.saving;
	} else {
		var saving = 0;
	}
	
	win.setAttribute('status','show;none;'+
														'minimize;0;'+
														'height;'+ parseInt(win_sizeN + win_sizeS) + 'px;' +
														'saving;' + saving + ';'+
														'loading;0');

	//if(saving == 0 && _win_load(win)) {
		if( typeof optionsWindow.width != 'undefined') {
			winWidth = optionsWindow.width;
		} else {
			winWidth = '200px';
		}
		if( typeof optionsWindow.height != 'undefined') {
			winHeight = optionsWindow.height;
		} else {
			winHeight = parseInt(win_sizeN + win_sizeS) + 'px';
			_log(winHeight + ' ' + win_sizeN + ' ' + win_sizeS);
		}
		if( typeof optionsWindow.left != 'undefined') {
			winLeft = optionsWindow.left;
		} else {
			var dw = getDocumentSize().width;
			var ww = parseInt(win.style.width);
			winLeft = parseInt(dw/2-ww/2) + 'px';
		}
		if( typeof optionsWindow.top != 'undefined') {
			winTop = optionsWindow.top;
		} else {
			var dh = getDocumentSize().height;
			var wh = parseInt(win.style.height);
			winTop = parseInt(dh/2-wh/2) + 'px';
		}
		if( typeof optionsWindow.minimize != 'undefined') {
			winMinimize = optionsWindow.minimize;
		} else {
			winMinimize = 0;
		}
	if(saving == 1) _win_load(win);
	if( (saving == 0) || (_win_getStatus(win, 'loading') != 1) ) {
		_log('win_create default ' + _win_getStatus(win, 'loading'));
		_win_save(win , {show: 0, minimize: winMinimize, width: winWidth, height: winHeight, left: winLeft, top: winTop});
		win_setLocation(win, {left: winLeft, top: winTop});
		win_setSize(win, {width: winWidth, height: winHeight});
		winMinimize ? win_minimize(win) : win_maximize(win);
	};

	if(divClose != '') $(nameWindow + '_close').addEventListener('click', function(){ win_close(win)}, false);
	if(divMinimize != '') $(nameWindow + '_minimize').addEventListener('click', function(){ win_changeMinimize(win)}, false);
	$(nameWindow + '_top_drag').addEventListener('mousedown', function(ev){ dnd_mouseDown(ev, win, 1)}, false);
	$(nameWindow + '_resize').addEventListener('mousedown', function(ev){ dnd_mouseDown(ev, win, 2)}, false);
	$(nameWindow).addEventListener('mousedown', function(ev){ win_toFront(win);}, false);

	// for background
	$(nameWindow + '_content').style.background = document.defaultView.getComputedStyle(document.body, '').backgroundColor;

//	win_sizeW = getElementSize($(nameWindow + '_w')).width;
//	win_sizeE = getElementSize($(nameWindow + '_w')).width;
//	win_sizeN = getElementSize($(nameWindow + '_w')).height;
//	win_sizeS = getElementSize($(nameWindow + '_w')).height;
	
//	_log('******************************************************************');
//	_log(document.defaultView.getComputedStyle($(nameWindow + '_w'), '')['width']);
//	_log(getElementSize($(nameWindow + '_w')).width);
	/*
	_log(document.defaultView.getComputedStyle($(nameWindow + '_e'), '').width);
	_log(document.defaultView.getComputedStyle($(nameWindow + '_n'), '').width);
	_log(document.defaultView.getComputedStyle($(nameWindow + '_s'), '').width);
	*/
//	_log('******************************************************************');
	
	_log('-win_create');
	return win;
};

function _win_setStatus(key, param, value) {
//	_log('+setStatus  ' + key.id + ' ' + param + ' ' + value);
	var status = key.getAttribute('status');
	status = status.split(';');
	var indexStatus = status.indexOf(param);
//	_log('status=' + status + '  index=' + indexStatus);
	status[indexStatus + 1] = value;
	status = status.join(';');
//	_log('status=' + status + '\n-setStatus');
	key.setAttribute('status', status);
}

function _win_getStatus(key, param) {
	var status = key.getAttribute('status');
	status = status.split(';');
	var indexStatus = status.indexOf(param);
	return status[indexStatus + 1];

}


function win_show(key) {
	_win_setStatus(key, 'show', '');
	key.style.display = '';
	_win_save(key, {show: ''});
}

function win_hide(key) {
	_win_setStatus(key, 'show', 'none');
	key.style.display = 'none';
	_win_save(key, {show: 'none'});
}
	
function win_close(key) {
	_win_setStatus(key, 'show', 'none');
	key.style.display = 'none';
	_win_save(key, {show: 'none'});
}

function win_changeMinimize(key) {
	if(_win_getStatus(key, 'minimize') == 1) {
		win_maximize(key);
	} else {
		win_minimize(key);
	}
}		

function win_minimize(key) {
	_log('+win_minimize\n' + parseInt(win_sizeN + win_sizeS) + 'px');
	_win_setStatus(key, 'minimize', '1');
	$(key.id + '_row2').style.display = 'none';
	$(key.id + '_minimize').className = 'window_maximize';
	_win_setStatus(key, 'height', key.style.height);
	key.style.height = parseInt(win_sizeN + win_sizeS) + 'px';
	_win_save(key, {minimize: 1});
	_log('-win_minimize');
};

function win_maximize(key) {
	_log('+win_maximize ' + key.id);
	_win_setStatus(key, 'minimize', '0');
	$(key.id + '_row2').style.display = '';
	$(key.id + '_minimize').className = 'window_minimize';
	_win_save(key, {minimize: 0});
	key.style.height = _win_getStatus(key, 'height');
	_log('-win_maximize ' + key.id);
}

function win_appendChild(key, node, autoSize, autoPosition) {
	if(!node){_log('Nothing Node');return false;}
	_log('+win_appendChild ' + key.id + ' ' + node.id + ' '+ autoSize + ' ' + autoPosition);
	if(autoPosition && _win_getStatus(key, 'loading') != 1) {
		var n = getElementSize(node);
		var w = getDocumentSize();
		win_setLocation(key, {left: (w.width/2-n.width/2), top: (w.height/2-n.height/2)} );
	}
	if(autoSize && _win_getStatus(key, 'loading') != 1) {
		var nodeSize = getElementSize(node);
		win_setSize(key, nodeSize, true);
//		if(_win_getStatus(key, 'minimize') == 1) _win_setStatus(key, 'height', nodeSize.height + win_sizeN + win_sizeS + 'px');
	}
	$(key.id + '_content').innerHTML = '';
	$(key.id + '_content').appendChild(node);
	node.style.display = '';
	_log('-win_appendChild');
	return true;
}

function win_setSize(key, size, content) {
	_log('+win_setSize ' + key.id + ' ' + size.width + 'x' +size.height + ' ' + content);
	size.width  = parseInt(size.width);
	size.height = parseInt(size.height);
	var p1w = 0;
	var p1h = 0;
	var p2w = 0;
	var p2h = 0;
	var keyWidth, keyHeight, contWidth, contHeight;
	if (content) {
		p1w = win_sizeW + win_sizeE;
		p1h = win_sizeN + win_sizeS;
	} else {
		p2w = win_sizeW + win_sizeE;
		p2h = win_sizeN + win_sizeS;
	}
	keyWidth  = size.width + p1w;
	contWidth = size.width - p2w;
	if(_win_getStatus(key, 'minimize') == 1) {
		//_win_setStatus(key, 'height', key.style.height);
		keyHeight = win_sizeN + win_sizeS;
		contHeight = size.height;
		_win_setStatus(key, 'height', keyHeight + size.height + 'px');
	} else {
		keyHeight  = size.height + p1h;
		contHeight = size.height - p2h;
		keyHeight  = keyHeight < win_minHeight ? win_minHeight : keyHeight;
		contHeight = (contHeight + (win_sizeN + win_sizeS)) < win_minHeight ? (win_minHeight - (win_sizeN + win_sizeS)) : contHeight;
		_win_setStatus(key, 'height', keyHeight + 'px');
	}
	
	key.style.width = (keyWidth < win_minWidth ? win_minWidth : keyWidth) + 'px';
	key.style.height =  keyHeight+ 'px';
	$(key.id + '_content').style.width = ( (contWidth + (win_sizeW + win_sizeE)) < win_minWidth ? (win_minWidth - (win_sizeW + win_sizeE)) : contWidth ) + 'px';
	$(key.id + '_content').style.height = contHeight + 'px';
	_win_save(key, {width: parseInt(key.style.width), height: parseInt(key.style.height)} );
	_log('-win_setSize ' + key.id);
}

function win_setLocation(key, position) {
	_log('+setPosition  ' + key.id + ' left=' + position.left + ' top=' + position.top);
//	key.style.left = position.left < 0 ? 0 + 'px' : position.left + 'px';
//	key.style.top  = position.top  < 0 ? 0 + 'px' : position.top  + 'px';
	key.style.left = parseInt(position.left) + 'px';
	key.style.top  = parseInt(position.top)  + 'px';
	_win_save(key, {left: parseInt(key.style.left), top: parseInt(key.style.top)});
	_log('-setPosition ' + key.id);
}

function win_toFront(key) {
//	_log(key + '\n' + key.id + '"');
	if (key.style.zIndex != win_zIndex) {
		key.style.zIndex = win_zIndex + 1;
		win_zIndex += 1;
	}
}


function _win_save(key, options) {
	_log('+_win_save ' + options.show +' '+ options.minimize +' '+ options.left +' '+ options.top +' '+ options.width +' '+ options.height); 
	var show     =(typeof options.show     == 'undefined') ? _win_getStatus(key, 'show')             : options.show;
	var minimize =(typeof options.minimize == 'undefined') ? _win_getStatus(key, 'minimize')         : options.minimize;
	var left     =(typeof options.left     == 'undefined') ? parseInt(key.style.left)                : options.left;
	var top      =(typeof options.top      == 'undefined') ? parseInt(key.style.top)                 : options.top;
	var width    =(typeof options.width    == 'undefined') ? parseInt(key.style.width)               : options.width;
	var height   =(typeof options.height   == 'undefined') ? parseInt(_win_getStatus(key, 'height')) : options.height;
	
	var value = show + ';' + minimize + ';' + left + ';' + top + ';' + width + ';' + height;
	_log('_win_save ' + key.id + '=' + value + '"');
	setSetting(key.id, value)
}

function _win_load(key) {
	value = getSetting(key.id, null);
	_log('+_win_load ' + key.id + ' ' + value);
	if (value == null) return false;
	value = value.split(';');
	_log('_win_load ' + key.id + ' ' +value + '"');
	win_setLocation(key, {left: value[2], top: value[3]});
	win_setSize(key, {width: value[4], height: value[5]});
	(value[1] == 1) ? win_minimize(key) : win_maximize(key);
	_win_setStatus(key, 'loading', '1');
	return true;
//	value[1] ? win_show(key) : win_hide (key);
};
	
// **************** Extended functions *********************

function getElementSize(node) {
	var tmpNode = node.cloneNode(true);
	document.body.appendChild(tmpNode);
	tmpNode.style.visibility = 'hidden';
	tmpNode.style.display = 'block';
	var width = tmpNode.clientWidth;
	var height = tmpNode.clientHeight;
	tmpNode.parentNode.removeChild(tmpNode);
//	_log('getElementSize width=' + node.clientWidth + ' height=' + node.clientHeight);
	return {width: width, height: height};
}

function getDocumentScroll() {
	var top  = self.pageYOffset || (document.documentElement && document.documentElement.scrollTop)  || (document.body && document.body.scrollTop);
	var left = self.pageXOffset || (document.documentElement && document.documentElement.scrollLeft) || (document.body && document.body.scrollLeft);
	return {left: left, top: top};
}

function getDocumentSize() {
	var width  = document.compatMode=='CSS1Compat' && !window.opera ? document.documentElement.clientWidth  : document.body.clientWidth;
	var height = document.compatMode=='CSS1Compat' && !window.opera ? document.documentElement.clientHeight : document.body.clientHeight;
//	_log('getDocumentSize  width=' + width + ' height=' + height);
	return {width: width, height: height};
}

// ****************** Windows scripts **********************


// ******************* Mouse scripts ***********************

var dnd_object = null;
var dnd_mouseOffset = {x: 0, y: 0};
var dnd_status = 0;							// 1 - move, 2 - resize

function dnd_mouseMove(ev) {
	if (dnd_object) {
		switch(dnd_status) {
			case 1:
				left = (ev.pageX - dnd_mouseOffset.x);
				top  = (ev.pageY - dnd_mouseOffset.y);
				win_setLocation(dnd_object, {left: left, top:top});
				break;
			case 2:
				var w = ev.pageX - parseInt(dnd_object.style.left) + dnd_mouseOffset.x;
				var h = ev.pageY - parseInt(dnd_object.style.top)  + dnd_mouseOffset.y;
				win_setSize(dnd_object, {width: w, height: h});
				break;
		}
	}
}

function dnd_mouseDown(ev, obj, status) {
	_log('+dnd_mouseDown\nObject = ' + obj);
	dnd_mouseOffset.x = ev.pageX - parseInt(obj.style.left);
	dnd_mouseOffset.y = ev.pageY - parseInt(obj.style.top);
	if (status == 2) {
		dnd_mouseOffset.x = parseInt(obj.style.width)  - dnd_mouseOffset.x;
		dnd_mouseOffset.y = parseInt(obj.style.height) - dnd_mouseOffset.y;
	}
	dnd_object = obj;
	dnd_status = status;
	_log('-dnd_mouseDown');
}

function dnd_mouseUp() {
	dnd_object = null;
}

document.addEventListener('mousemove', dnd_mouseMove, false);
document.addEventListener('mouseup', dnd_mouseUp, false);

// ******************* Mouse scripts ***********************

function windows() {
_log('+windows');
//spieler.php allianz.php


//	var menuarr = ['em_WinAll', 'em_WinDorf1', 'em_WinDorf2', 'em_WinKarte', 'em_WinKarte2', 'em_WinBerichte',
//	 'em_WinStatistiken', 'em_WinLeftmenu', 'em_WinCenter', 'em_WinVillages', 'em_WinInfotable', 'em_WinResource'];

var access = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
access[0] = 0;
access[1] = getSetting('em_WinAll', '0');
access[2] = getSetting('em_WinDorf1', '0');
access[3] = getSetting('em_WinDorf2', '0');
access[4] = getSetting('em_WinKarte' , '0');
access[5] = getSetting('em_WinKarte2' , '0');
access[6] = getSetting('em_WinBerichte' , '0');
access[7] = getSetting('em_WinStatistiken' , '0');
access[8] = getSetting('em_WinNachrichten' , '0');
access[9] = getSetting('em_WinBuild' , '0');
access[10] = getSetting('em_WinLeftmenu' , '0');
access[11] = getSetting('em_WinCenter' , '0');
access[12] = getSetting('em_WinVillages' , '0');
access[13] = getSetting('em_WinInfotable' , '0');
access[14] = getSetting('em_WinResource' , '0');
access[15] = getSetting('em_WinAllianz' , '0');
access[16] = getSetting('em_WinSpieler' , '0');

curpage = 0;

var h = window.location.href;
if (h.indexOf('dorf1.php') > 0) curpage = 2;
if (h.indexOf('dorf2.php') > 0) curpage = 3;
if (h.indexOf('karte.php') > 0) curpage = 4;
if (h.indexOf('karte2.php') > 0) curpage = 5;
if (h.indexOf('berichte.php') > 0) curpage = 6;
if (h.indexOf('statistiken.php') > 0) curpage = 7;
if (h.indexOf('nachrichten.php') > 0) curpage = 8;
if (h.indexOf('build.php') > 0) curpage = 9;
if (h.indexOf('allianz.php') > 0) curpage = 15;
if (h.indexOf('spieler.php') > 0) curpage = 16;

_log('curpage=' + curpage + ' access=' + access[curpage]);

if( (access[1] != 0) && (access[curpage] != 0) )	{
	
	if( access[12] != 0) {
		var win = win_create('em_window_Villages',{title: 'Villages', closable: 1, minimizable: 1, saving: 1, left: '710px', top: '80px', close: 0});
		if(win_appendChild(win , $('lright1'), true))	win_show(win);
	}

	if( access[10] != 0) {
		var win = win_create('em_window_menu',{title: 'Menu', closable: 1, minimizable: 1, saving: 1, left: '-5px', top: '80px'});
		win_appendChild(win , $('lleft'), true);
		win_show(win);
	}

	if( access[11] != 0) {
		var win = win_create('em_window_center',{title: 'Center', closable: 1, minimizable: 1, saving: 1, left: '150px', top: '120px'});
		win_appendChild(win, $('lmid2'), true);
		win_show(win);
	}
}

if( (access[13] != 0) && (curpage == 4) ) {
	var win = win_create('em_window_table',{title: 'Info table', closable: 1, minimizable: 1, minimize: 1, saving: 1, left: '490px', top: '370px'});
	$('em_divTable').style.marginTop = '0px';
	if(win_appendChild(win, $('em_divTable'), true)) {
		if(getSetting('em_infomap','') != 'none') win_show(win);
	}
}

var ttq_history_counter = 0;
var ttq_tasklist_counter = 0;
var blocktimer_counter = 0;

for_ttq_history();		// fix z-index ttq_history
for_ttq_tasklist();	// fix z-index ttq_tasklist
if ( (access[14] != 0) ) for_blocktimer();			// Add resource in win

function for_ttq_history() {
	var win = $('ttq_history');
	if (win == null) {
		if (ttq_history_counter < 10 )	setTimeout(for_ttq_history, 500);
		ttq_history_counter++;
		return;
	}
	/*
	var title = $('ttq_history').firstChild.innerHTML;
	$('ttq_history').setAttribute('style', '');
	$('ttq_history').firstChild.style.display = 'none';
	var mywin3 = win_create('em_window_ttq_history',{title: 'TTQ ' + title, closable: 1, minimizable: 1, saving: 1, left: '710px', top: '400px'});
	win_appendChild(mywin3, $('ttq_history'), true);
	win_show(mywin3);
	*/
	win.style.zIndex = 999;
	win.addEventListener('mousedown', function(ev){ win_toFront(win);}, false);
};


function for_ttq_tasklist() {
	var win = $('ttq_tasklist');
	if (win == null) {
		if(ttq_tasklist_counter < 10 )	setTimeout(for_ttq_tasklist, 1000);
//		ttq_history_counter++;
		return;
	}
	/*
	var title = $('ttq_tasklist').firstChild.innerHTML;
	$('ttq_tasklist').setAttribute('style', '');
	$('ttq_tasklist').firstChild.style.display = 'none';
	var mywin3 = win_create('em_window_ttq_tasklist',{title: 'TTQ ' + title, closable: 1, minimizable: 1, saving: 1, left: '710px', top: '600px'});
	win_appendChild(mywin3, $('ttq_tasklist'), true);
	win_show(mywin3);
	*/
	win.style.zIndex = 999;
	win.addEventListener('mousedown', function(ev){ win_toFront(win);}, false);
};

function for_blocktimer() {
	if($('blocktimer') == null) {
		if(blocktimer_counter < 10 )	setTimeout(for_blocktimer, 500);
		blocktimer_counter++;
		return;
	}
	$('blocktimer').setAttribute('style', '');
	var mywin3 = win_create('em_window_blocktimer',{title: 'Resourse ++', closable: 1, minimizable: 1, saving: 1, left: '710px', top: '600px', width: '500px'});
	win_appendChild(mywin3, $('blocktimer'), false);
	win_show(mywin3);
	/*
	var tds = $('blocktimer').getElementsByTagName('TD');
	for(var i = 0; i < tds.length; i++) {
		tds[i].setAttribute('style', tds[i].getAttribute('style') + '; padding: 1px;');
	}
	*/
}

if( (access[curpage] != 0) || (curpage == 4) || (curpage == 5) ) {
	var win = win_create('em_window_system',{title: 'System', closable: 0, minimizable: 1, minimize: 1, saving: 1, left: '710px', top: '300px', width: '170px', height: '230px'});
	if(win_appendChild(win, $('em_mainmenu'), false)) win_show(win);
}
_log('-windows');
} // windows

windows();