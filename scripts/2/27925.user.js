// ==UserScript==
// @name           HWM_Advanced_Mail
// @description   HWM_Advanced_Mail - adds more comfort to PM
// @version       0.61
// @namespace      http://www.heroeswm.ru
// @include        http://www.heroeswm.ru/sms.php*
// @include        http://www.heroeswm.ru/sms_clans.php*
// ==/UserScript==

// ======================================== 

//alert("HWM_Advanced_Mail");

var url_cur = location.href ;

makeAdvLinks();

addPanel();



function makeAdvLinks(){
	var a = document.getElementsByTagName( 'a' ) ;
	var el;
	//
	var set = false;
	for (var i=0; i < a.length; i++)
	{
		el = a[i];
		if (el.href.indexOf('/sms.php?sms_id=') != -1 || (el.href.indexOf('/sms_clans.php') != -1 && el.href.indexOf('read=') != -1)){
			if (set)
			{
				set = false;
				continue;
			}else
			{
				set = true;
			}
			//
			sa = document.createElement( 'a' );
			sa.href = el.href;
			sa.target = "sms_w_iframe";
			sa.innerHTML = '&nbsp;&nbsp;&nbsp;<b>[#]</b>';
			
			el.parentNode.insertBefore(sa, el.nextSibling);
			
			//alert("innerHTML = "+el.innerHTML);
			if(el.innerHTML=="&nbsp;" || el.innerHTML.match(/Re:\&nbsp\;/) || el.innerHTML.match(/Re\(\d+\):\&nbsp\;/) ){
				el.innerHTML += "[\u0431\u0435\u0437 \u0442\u0435\u043C\u044B]";
			}
		}
	}
}



function addPanel(){
		//alert("addPanel");
	if(url_cur.indexOf('/sms.php?sms_id=') != -1){ return; }
	if(url_cur.indexOf('/sms_create.php') != -1){ return; }
	if(url_cur.indexOf('?notebook') != -1){ return; }
	//	
	var d = document.createElement( 'div' );
	//
	d.innerHTML = 
'<table width="850" border="0" align="center" cellpadding="0" cellspacing="0" style="position:absolute; top:645px; left:auto; " background="none">'+
'<tr><td>'+

'<iframe width="850" height="400" name="sms_w_iframe" id="sms_w_iframe" '+
'frameBorder="1" frameSpacing="0" marginWidth="0" marginHeight="0" src="" ></iframe>'+

'<br>&nbsp;</td></tr></table>' ;
	
	document.body.appendChild( d ) ;
	
	//
	document.getElementById('sms_w_iframe').addEventListener( "load", smsIframeLoaded , false );
	
}


function smsIframeLoaded(){
		//alert("smsIframeLoaded");
	var my_iframe = document.getElementById('sms_w_iframe');
	//
	my_iframe.contentWindow.scrollTo(130, 140);
		
}




