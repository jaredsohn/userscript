// ==UserScript==
// @name           SzpaQ
// @namespace      dop
// @include        http://*.desert-operations.com/*
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
	
	function surowiec(){
		var resNumber = BodySeek(window.location.toString(), ['&object_id=','&go']);
		if(resNumber=='r_2')return 1200;
		if(resNumber=='r_3') return 600;
		if(resNumber=='r_4') return 8;
	}
	try {
		var amount = document.getElementsByClassName("odd")[1].innerHTML.match(/\d[\.,0-9]{1,}\d/)[0].replace(/\./g, "").replace(/,/, ".");
		var resStr = document.getElementsByClassName("odd")[1].innerHTML;
		var obrazek = BodySeek(resStr, ['src="','.png']);
		var liczba=  BodySeek(resStr, ['<td height="20">','</']);
		//liczba = parseInt(liczba.replace(/\./g, ""));
		if (resStr.indexOf("M") != -1 || resStr.indexOf("M") != -1 || resStr.indexOf("M") != -1) {
			amount = amount * 10000;
		};

	} 	
	catch(er) {
	}
	function iConvert(ilosc){
		var liczbaa;

		var Mi = BodySeek(ilosc, [',','M']);
		if (Mi){
			liczbaa = sreplace(',','',ilosc);
			liczbaa = parseInt(liczbaa.replace(/\./g, ""));
			
			return liczbaa*100000;
		}else{
			liczbaa = parseInt(ilosc.replace(/\./g, ""));
			return liczbaa;
		}
	}
	
	function wyplac(ile){
		var ilosc = ile;
		ilekasy = ilosc * surowiec();
		var rameczka = document.createElement('iframe');
		rameczka.id='iframka';
		//rameczka.style.visibility='hidden';
		rameczka.name='iframka';
		dc.body.appendChild(rameczka);
		var dv = document.createElement('div');
		//dv.style.visibility='hidden';
		var formaa = dc.createElement('form');
		formaa.method='post';
		formaa.action='bank.php';
		formaa.target='iframka';
		formaa.innerHTML='<table class="standard"><tbody><tr class="even"><td>Kwota</td><td></td></tr>		<tr class="odd"><td><input value="'+ilekasy+'" style="text-align: center; width: 150px;" name="count2" id="count2"> <img align="absmiddle" onmouseout="UnTip();" alt="" src="images/dollar.gif">	<div tabindex="1" id="slider2" style="width: 150px;" class="horizontal dynamic-slider-control slider">					<input name="slider-input2" id="slider-input2" class="slider-input">				<div class="line" style="top: 10.5px; left: 7.5px; width: 133px;"><div style="width: 131px;"></div></div><div class="handle" style="left: 0px; top: 5.5px;"><div>&nbsp;</div></div></div>				<script type="text/javascript">var s2 = new Slider(document.getElementById("slider2"),document.getElementById("slider-input2")); s2.setMaximum(\'59199568327085\'); s2.onchange = function() { document.getElementById(\'count2\').value = nf_thousand(s2.getValue()); }</script></td><td>				<div align="right"></div>			</td>		</tr>	</tbody></table>	<input type="hidden" value="db7d3bdd18f5c4e4550265a9c4458e2c" name="PHPSESSID"><input type="submit" class="payButton" style="width: 150px;" value="Wypłata" name="payOut">';//</form>';
		dv.appendChild(formaa);/*'<form method="post" action="bank.php" id="wyplata" target="iframka">*/
		//		<form method="post" id="wyplata"action="bank.php" target="iframka"><input value="0" style="text-align: center; width: 150px;" name="count2" id="count2"><input type="hidden" value="db7d3bdd18f5c4e4550265a9c4458e2c" name="PHPSESSID"></form>';
		document.body.appendChild(dv);
	}
	function menuH(){
		/* linki potrzebne:
		Minimalne złoto
		-||- ropa
		-||- amunicja

		Najwyzsza liczba złota
		-||- ropy
		-||- amunicji

		jakieś pole textowe
		od kogo chce kupic :D

		do dzieła
		*/

		var cM = document.createElement('div');
		var pN = document.createElement('input');
		var bN = document.createElement('input');
		pN.id = 'pn';
		pN.type = 'text';
		bN.type='button';
		bN.value='wybierz';
		bN.setAttribute('onClick', "javascript: var siemana = document.getElementById('pn'); window.open('handel.php?mode=1&username='+siemana.value+'&skrypt=active&username_partly=1&search_user=Szukaj+oferty', '0')");
		cM.style.position='relative';
		cM.style.top='0px';
		cM.style.right='0px';
		/*zawartosc*/
		cM.innerHTML = '<div class="infopanel"><a style="display: block;color:lime" href="handel.php?mode=1&object_id=r_2&goods_partly=1&skrypt=active&co=1&search_goods=Szukaj+oferty" target="0"><img id="friendsArrow" src="images/classic/arrow_down.jpg" class="icon"> <strong>Minimalna - Złoto</strong></a><a style="display: block;color:lime" href="handel.php?mode=1&object_id=r_2&goods_partly=1&skrypt=active&co=2&search_goods=Szukaj+oferty" target="0"><img id="friendsArrow" src="images/classic/arrow_down.jpg" class="icon"> <strong>Najwięcej - Złoto</strong></a><a style="display: block;color:lime" href="handel.php?mode=1&object_id=r_3&goods_partly=1&skrypt=active&co=1&search_goods=Szukaj+oferty" target="0"><img id="friendsArrow" src="images/classic/arrow_down.jpg" class="icon"> <strong>Minimalna - Ropa</strong></a><a style="display: block;color:lime" href="handel.php?mode=1&object_id=r_3&goods_partly=1&skrypt=active&co=2&search_goods=Szukaj+oferty" target="0"><img id="friendsArrow" src="images/classic/arrow_down.jpg" class="icon"> <strong>Najwięcej - Ropa</strong></a><a style="display: block;color:lime" href="handel.php?mode=1&object_id=r_4&goods_partly=1&skrypt=active&co=1&search_goods=Szukaj+oferty" target="0"><img id="friendsArrow" src="images/classic/arrow_down.jpg" class="icon"> <strong>Minimalna - Ammo</strong></a><a style="display: block;color:lime" href="handel.php?mode=1&object_id=r_4&goods_partly=1&skrypt=active&co=2&search_goods=Szukaj+oferty" target="0"><img id="friendsArrow" src="images/classic/arrow_down.jpg" class="icon"> <strong>Najwięcej - Ammo</strong></a></div>';
		document.body.appendChild(cM);
		cM.appendChild(pN);
		cM.appendChild(bN);

	}

	function Handel(co){
		
		var odkogos = BodySeek(window.location.toString(), ['&username=','&']);
		var zlotko = BodySeek(document.body.innerHTML, ["images/classic/2009_tradeOffer0", "ng"]);
		var zlotkoa = BodySeek(document.body.innerHTML, ["images/classic/2009_tradeOffer1", "ng"]);
		var zlotkob = BodySeek(document.body.innerHTML, ["images/classic/2009_tradeOffer2", "ng"]);
		var ktoss = BodySeek(document.body.innerHTML, ["images/classic/2009_tradeOffer", "ng"]);
		var gdziejestem = window.location;
		
		


		if(odkogos && !ktoss){
			window.location=gdziejestem;
		}else{
			if(((co == '1') && ( zlotko || zlotkoa || zlotkob || (odkogos && ktoss)) || ((!co) &&  (odkogos && ktoss))) || ((co == '2') && (iConvert(liczba)>100000000 || iConvert(liczba)<5000000))){
					//wyplac(iConvert(liczba));
					//document.getElementsByName('payOut')[0].click();
					var foremki = document.getElementsByName('queryString');
					for(var er=0;er<foremki.length; er++){
						foremki[er].value=window.location;		
					}
					window.location = 'javascript: function captcha(eForm,res) {    if ($("captchaForm") != null) {        $("captchaForm").remove();    }    var scrOff = getScrollY();    var top = posy - 195 + scrOff;    var splitCount = 0;    if (eForm.splitted_count != undefined && eForm.splitted_count != null) {        if(true) {splitCount = (eForm.splitted_count.value * 2);} else {splitCount = ('+amount+')}    } if (res > 0) {splitCount = res}    var tid = eForm.tid.value;    var qs = eForm.queryString.value;    new (Ajax.Request)("Webservices/getCaptcha.php", {parameters: {splitCount: splitCount, tid: tid, buy: "OK", qs: qs, imgPrfx: "images/classic", top: top}, method: "post", onSuccess: function (transport) {elements = $$("body");elements[0].insert(transport.responseText);new (Effect.Grow)("captchaForm", {duration: 0.0, direction: "top-left"});}});}; captcha(document.forms[2], 0); void 0; ';//
			}else{
					window.location=gdziejestem;
			}
		}
		
		
	}
	function odpal(){
		var strona=BodySeek(window.location.toString(), ['world1/','.php']);
		var strona2=BodySeek(window.location.toString(), ['world2/','.php']);
		var skrypt=BodySeek(window.location.toString(), ['&skrypt=','&']);
		var co=BodySeek(window.location.toString(), ['co=','&']);
		var mode=BodySeek(window.location.toString(), ['mode=','&']);

		if(strona == 'uebersicht' || strona2 == 'uebersicht' || strona == '/uebersicht' || strona2 == '/uebersicht') menuH();
		if((strona =='handel' || strona2 == 'handel' || strona =='/handel' || strona2 == '/handel') && mode=='1' && skrypt=='active') var hh= Handel(co);
		//if(hh==false)window.location=window.location;
	}
	odpal();
	

	//unsafeWindow.document.forms[2].submit();
