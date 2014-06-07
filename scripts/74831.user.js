// ==UserScript==
// @name           FreakShare Autodownload
// @namespace      alcomxet
// @description    Descarga archivos de forma automatica. No lo uses si tienes cuenta premium. Recomendable estar logueado con una cuenta gratuita.
// @version        1.0.1
// @include        http://freakshare.com/files/*
// @include        http://www.freakshare.com/files/*
// @include        http://*.freakshare.com/get.php?dlid=*
// ==/UserScript==

function set_cookie ( name, value, exp_y, exp_m, exp_d, path, domain, secure ) {
	var cookie_string = name + "=" + escape ( value );
	if ( exp_y ) {var expires = new Date ( exp_y, exp_m, exp_d );cookie_string += "; expires=" + expires.toGMTString();}
	if ( path ){	cookie_string += "; path=" + escape ( path );}
	if ( domain ){ cookie_string += "; domain=" + escape ( domain );}
	if ( secure ){ cookie_string += "; secure";}
	document.cookie = cookie_string;
}
if(!document.cookie.match( /tiempo=\d+(\d)/i )){
	//set_cookie ( "tiempo", "120000", "","" , "", "/", "freakshare.net", "" );
	document.cookie = "tiempo=60000;";  
}

function CustAction1(tiempo2){
	var allElements = document.getElementsByTagName('*');
	for( var i = 0; i < allElements.length; i++ ) {
		if(allElements[i].value == 'benefit') {
			tooltip(tiempo2);
			window.setTimeout(function (){ 
				document.forms[1].submit();
			},tiempo2);
			break;
		}
	}
}
function CustAction2(){
	var allElements = document.getElementsByTagName('*');
	for( var i = 0; i < allElements.length; i++ ) {
		if(allElements[i].id == 'recaptcha_image') {
			//set_cookie ( "tiempo", "600000", "","" , "", "/", "freakshare.net", "" );
			//document.location.href = document.location.href;
			break;
		}else{
			if(allElements[i].value == 'waitingtime') {
				document.title = "Descargando - " + String.slice(window.location, 37, -5);
				tooltip(1000);
				window.setTimeout(function (){
					document.forms[0].submit();
					set_cookie ( "tiempo", "120000", "","" , "", "/", "freakshare.net", "" );
				},2000);
				break;
			}	
		}
	}
	if(document.body.innerHTML == 'bad try'){
		set_cookie ( "tiempo", "600000", "","" , "", "/", "freakshare.net", "" );
		history.go(-2);
	}
}
document.title = window.location;
var cookiet = document.cookie.match( /tiempo=\d+(\d)/i );
var cokstr = String.substring(cookiet, 7, 12);
//alert(cokstr);
CustAction1(cokstr);
CustAction2();

function tooltip(timesec){
	add_tooltip_style();

	var  configurationinnerHTML = <><![CDATA[
		<div class="popup_block">
			<div class="popup">
				<a href='#'>
					<img id='imghideshow' title="Cerrar" class="cntrl" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAfCAYAAAD0ma06AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAY1SURBVHjapFZbbFRVFN0zd6Yz08dMoUNf9EGxUItJK62I4AOJEYiQoqE+0OgHCiqG+PgQozH6ofyIJiYEMRqNJpggHySlrRM+hCAtajAUaGgEi9BBSilMO0PnfWeOa597bjt9AEVvsubOPWefs/br7H0sQgj6P4/FYrk9+WkSuoAHgCrgLvV9DLgMdID02rQZmfAmaAJaxS2edDr9s67rL7EB/9XCUuALoEl+pZJEvTAo8A9s6iVKxojKYWheAWxuIMr2GGKp1KHh4eF3vF4vW59me6ZD2Ajsle6LXify7SI68iNROIgtIKtpBvQEB5DI7iC6Zw3Rmi1EM0vlBsFg8OX8/PxvWQdFKm5E2KhiQ9R9iOjL17E6QFRUhAGQpFNjklYrhhT6YbndTtT8LtGjG+T0lStXNhcVFTGpnkE8jpAT4hdgNvm+Ivr+AyIHtM+Fu3Ss0RUZO8pqqos/NiDLblgcQO48/CzRpk/l9KlTp56oq6s7gL8JkzST0AespN9/Itq2Hu7xQnsbRFOcWSBKT50FVpMUHrBD/iKsXb+V6KmtFI/H/3Q6nZzdEZPU1PVFSXbtEoltz0Nzm2HRqleIvjsLa/9CoiSnBs99cwaym4lCYSRSHr4/REg64SBHTX9//2fqGNmVevJ5jn/0Xe+Rhd2SBVdGkInr3hizZI8fOibGg8fM5/EthgIJwxPJ7a/Jd05Ozn14uQEHGRGXsVtOIwHS2nbDlTOIYlHoMoUL9w0Q/GSA/0/KeXglFmEWsp/uIjp9FAbnzWttbV3H3ECWFWdnubTuSBulQ9AwDs2jcSPGby6evGn7sIGJzwuzDUViMekdAZ0jrXvlVGVl5RK8ctlKq6ZpHFSKdBzCwSVjQRILAzh3508TPe29dbl6ZibiB/lrQeWBGFmykGe/dcjpwsLCeuVWpw1ZWskFWO/rM45ZNGWkPXt0ZIR/iJbigHfeoOYuU9UsbmbtWI2x+i+acWSt8yShCiaJVFwq50zeZrsYmapAgz/KFCmzo2gqhk7WJ8SDCY+bomF2qdI2E3/cpKPwXKYs1qdAlozwnjlSJBaLcbVxyqRBlT8rB+fUkJuzGotEXB1TRvc02hfLKHk9btT6BCyPzJ0rpwcGBoLqHGpWVIMjsmLVPkTZhXgbMacUW3pGTB2z+4HA5fHjkE3EDELeYyaSJjx/qZzq6uq6pKJrsR4/flwSeh98mIbmVpET7khBU20qw+4GEbda1ndZyaTpLDLWOtnSchdZVj4pxw8fPuzPLOD2SCSylxvpr9u3C1GDylkClAM73xrrsnfiu4JErMCAqAIW0Nj8DsiWktBnGXJdr24QiURCTuXm5n4MnmZWmQm1EydOPMITg4ODom/VEiHKsGgOyQ14sSQvJhF2j8eoYhXGvPzGmqF7K0V3d7ckQ5XhHHkbeAyoNU9ODpqmvEp0dHSIQEOVsRhWjGSTuOq4OQJOMpQEWXS+RxzYs0cgGSUhCvgO7L+Jg6DKqLyHOGpra0tYgAV9Pp/oX1wnBLunXlnrgVXYfEAzEMzCmFsRLSIpG6opFa27d4twOCzJWlpa2Lr3lTsXAiUmIRcAN1z6Awuy7zs7O8WxjRtFvDDH2JhJG4ClCo1AtUGq59tEz9q1UlGTrK2t7QL2/ATYKJsDUTUwQzZgVAKrSrI89K+dxcXFzbiJUR/K3cmTJ2nWwYNUcfQoeS+cJcdwQGZeIjuHAmV30KWGBjq/YgUtWLiQqquryWazUXt7u3/16tX7IIYbF50D+vjWwUXGJLQYlxZZDdx+v//zsrKyZtnX0ONwcAnWUygUQhtMSELeGK2HCgoKqKSkhNDZ5fj+/fvPNTU1teDvBQW/IuMWEx29g6rkYSv5zlfu8Xgae3p6fGKaD1z4N0i/xtqPALR/WgssAuawK1XNto7eaZSVVhVPl6ruM9Baiuvr6+fBzRUul2sWxPKQWA5Yqg0NDekIwfXe3t4h3EfZ10PAVWXRIMBj16VlRvFLj7smTiB1qArPxPnKcrdqpE5VG0lVEC6EYdUIgsp9ITXGc0mzaU26CGeQampTp7I4W8GlXK/R2MUxoTaOZMAk0jNv4VNe9RXpRGK7IrIrD2QS6mrzpCKfSDRK8q8AAwCF/L1ktjcKFAAAAABJRU5ErkJggg%3D%3D"/>
				</a>
				<h3 id='h3hideshowtitle'>FreakShare Auto-Descarga</h3>
				<p id='time'></p>  
			</div>
		</div>
	]]></>;

	var divhideshow = document.createElement("div"); 
	divhideshow.id = "hideshow";
	divhideshow.setAttribute('style', 'visibility: visible;');
	divhideshow.innerHTML = configurationinnerHTML;
	document.body.appendChild(divhideshow);

	itsthefinalcountdown(parseInt(timesec)+1000);

	var imgClose=document.getElementById("imghideshow");
	imgClose.addEventListener("click", closeConfigurationBox, false);
}
	
function closeConfigurationBox(){	
	configurationBox = document.getElementById('hideshow');
	configurationBox.parentNode.removeChild(configurationBox);	
}	
	
function itsthefinalcountdown(timeinms){
	timesec = parseInt(timeinms)/1000;
	if ((timesec>0) && (timesec>150)){
		window.setTimeout(function() { 
			document.getElementById('time').innerHTML="Por favor espere "+parseInt(timesec/60)+" min ("+timesec+" seg)";
			var newtimeinms = timeinms-1000;
			itsthefinalcountdown(newtimeinms);
		}, 1000);
	}else if  ((timesec>0) && (timesec<=150)){
		window.setTimeout(function() { 
			document.getElementById('time').innerHTML="Por favor espere "+timesec+" seg";
			var newtimeinms = timeinms-1000;
			itsthefinalcountdown(newtimeinms);
		}, 1000);
	}else{
		document.getElementById('time').innerHTML="Descarga Iniciada";
	}
	
}
	
function add_tooltip_style(){

var  configcss = <><![CDATA[
	#h3hideshowtitle,font-size:1.1em{font-size:1.1em;}
	#time{font-size:0.8em;}
	#imghideshow {border: none;}
	#plusimage{display:inline;}
	#hideshow {
    position: inline;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    font-size:12px;
     z-index:211;
    text-align:left;
	}
   .popup_block {
	background:#DDDDDD none repeat scroll 0 0;
	bottom:2%;
	color:black;
	float:left;
	left:21%;
	margin:0 0 0 -250px;
	opacity:0.8;
	padding:10px 20px;
	position:absolute;
	width:224px;
	z-index:100;
	-moz-border-radius:17px;   
   }
   .popup_block .popup {
    float: left;
    width: 100%;
    background: #fff;
    margin: 10px 0;
    padding: 10px 0;
    border: 1px solid #bbb;
	-moz-border-radius:13px;
   }
   .popup h3 {
	border-bottom:1px solid #BBBBBB;
	font-weight:normal;
	margin:0 0 20px;
	padding:1px 10px;
   }
   .popup p {
    padding: 0px 10px;
    margin: 5px 0;
   }
   .popup img.cntrl {
    position: absolute;
    right: -20px;
    top: -20px;
   }
]]></>;

	GM_addStyle(configcss);
}