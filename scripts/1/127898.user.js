// ==UserScript==
// @name           num 2
// @namespace      num2
// @description    Desert Operations 
// @include        http://*.desert-operations.com/world*/handel.php?mode=1*
// ==/UserScript==

var dc=document;
function rand(minimum,maximum){  
   var losowe = minimum+(Math.random()*(maximum-minimum));  
   return Math.round(losowe);  
} 

function HTTP_Get( _url ) {
  var req;
  do {
    if( window.XMLHttpRequest ) { req = new XMLHttpRequest(); break; }
    if( window.ActiveXObject )  { req = new ActiveXObject("Microsoft.XMLHTTP"); break; }
	return;
  } while( false );
  if( req == null ) return;
  req.open("GET", _url, false);
  req.send(null);
  return req.responseText;
}

function sreplace(f, r, s){
	var ra = r instanceof Array, sa = s instanceof Array, l = (f = [].concat(f)).length, r = [].concat(r), i = (s = [].concat(s)).length;
	while(j = 0, i--)
		while(s[i] = s[i].split(f[j]).join(ra ? r[j] || "" : r[0]), ++j < l);
	return sa ? s : s[0];
}
function implode (glue, pieces) {
    var i = '', retVal='', tGlue='';
    if (arguments.length === 1) {        pieces = glue;
        glue = '';
    }
    if (typeof(pieces) === 'object') {
        if (pieces instanceof Array) {            return pieces.join(glue);
        }
        else {
            for (i in pieces) {
                retVal += tGlue + pieces[i];                tGlue = glue;
            }
            return retVal;
        }
    }    else {
        return pieces;
    }
}
function explode(item,delimiter) {
	tempArray=new Array(1);
	var Count=0;
	var tempString=new String(item);

	while (tempString.indexOf(delimiter)>0) {
		tempArray[Count]=tempString.substr(0,tempString.indexOf(delimiter));
		tempString=tempString.substr(tempString.indexOf(delimiter)+1,tempString.length-tempString.indexOf(delimiter)+1);
		Count=Count+1
	}

	tempArray[Count]=tempString;
	return tempArray;
} 
function StrSeek( Str, arr ) {
  var bck =Str;
  for( var i=0; i != arr.length-1; i++ ) {
    bck = bck.split( arr[i] );
	if( bck.length > 1 ) bck =bck[1];
	else return null;
  }
  bck =bck.split( arr[i] );
  return bck.length > 1 ? bck[0] : null;
}
function StrSeeek( Str, arr ) {
  var bck =Str;
  for( var i=0; i != arr.length-1; i++ ) {
    bck = bck.split( arr[i] );
	if( bck.length > 1 ) bck =bck[1];
	else return null;
  }
  bck =bck.split( arr[i] );
  return bck.length > 1 ? bck.length : null;
}
function BodySeek( gdzie, arr ) { return StrSeek( gdzie, arr ); }

var odd1 = document.getElementsByClassName("odd");
var eve1 = document.getElementsByClassName("even");
var dlugoscPetli = odd1.length + eve1.length;
/* Konwertuję Liczby z M na normalne liczby*/
function iConvert(ilosc){
	var liczbaa;
	
	if (ilosc.indexOf("M") != -1){
	
		liczbaa = parseInt(ilosc.replace(/\./g, ""));
		return liczbaa*1000000;
	}else{
		
		liczbaa = parseInt(ilosc.replace(/\./g, ""));
		return liczbaa;
	}
}
/* Oblicza  cena minimalna maksymalna czy godziwa nie koncze bo mam jeszcze premium :D*/
function jakaCena(ilosc, wartosc){
	// złoto ropa czy amunicja 2 to złoto 3 to ropa 4 to amunicja
	var surowiec=BodySeek(window.location.toString(), ["&object_id=r_", "&"]);
	//deklaruję ceny godziwe
	var cenaGodziwa;
	if(surowiec == 2) cenaGodziwa = 1000;
	if(surowiec == 3) cenaGodziwa = 500;
	if(surowiec == 4) cenaGodziwa = 7;
	
	var stosunek = wartosc / ilosc;
	if(stosunek > cenaGodziwa)return 'powyzej godziwej';
	else return 'Ponizej godziwej';
	
}


var ilosc;
var wartosc;
var konkret;
var odd2;
var eve2;
var tid;
var formy;
	var zlotko = BodySeek(document.body.innerHTML, ["images/classic/2009_tradeOffer0", "ng"]);
	var zlotkoa = BodySeek(document.body.innerHTML, ["images/classic/2009_tradeOffer1", "ng"]);
	var zlotkob = BodySeek(document.body.innerHTML, ["images/classic/2009_tradeOffer2", "ng"]);
	if(zlotko || zlotkoa || zlotkob){

		for(var i=1; i<dlugoscPetli;i++){
			odd2 = document.getElementsByClassName("odd")[i];
			ilosc = BodySeek(odd2.innerHTML, ['<td height="20">', '<']);
			wartosc = odd2.innerHTML;
			konkret = BodySeek(wartosc,['images/classic/2009_tradeOffer','.png']);
			if(konkret < 3){
				tid=BodySeek(wartosc, ['value="', '"']);
				wynik = iConvert(ilosc);
				formy = i*2;
				break;
			}
			eve2 = document.getElementsByClassName("even")[i+1];
			ilosc = BodySeek(eve2.innerHTML, ['<td height="20">', '<']);
			wartosc = eve2.innerHTML;
			konkret = BodySeek(wartosc,['images/classic/2009_tradeOffer','.png']);
			if(konkret < 3){
				tid=BodySeek(wartosc, ['value="', '"']);
				wynik = iConvert(ilosc);
				formy = (i+1)*2;
				break;
			}
		}
	}
	if(!tid)window.location=window.location;
	if(tid)window.location = 'javascript: function captcha(eForm,res) {    if ($("captchaForm") != null) {        $("captchaForm").remove();    }    var scrOff = getScrollY();    var top = posy - 195 + scrOff;    var splitCount = 0;    if (eForm.splitted_count != undefined && eForm.splitted_count != null) {        if(true) {splitCount = (eForm.splitted_count.value * 2);} else {splitCount = ('+wynik+')}    } if (res > 0) {splitCount = res}    var tid = eForm.tid.value;    var qs = eForm.queryString.value;    new (Ajax.Request)("Webservices/getCaptcha.php", {parameters: {splitCount: splitCount, tid: tid, buy: "OK", qs: qs, imgPrfx: "images/classic", top: top}, method: "post", onSuccess: function (transport) {elements = $$("body");elements[0].insert(transport.responseText);new (Effect.Grow)("captchaForm", {duration: 0.0, direction: "top-left"});}});}; captcha(document.forms['+formy+'], 0); void 0; ';//
