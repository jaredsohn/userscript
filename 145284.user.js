// ==UserScript==
// @name        ImperiaBorsa
// @namespace   grHakan
// @include     http://*.imperiaonline.org/imperia/game_v5/game/village.php
// @version     1
// ==/UserScript==

function GetBlok(blok){
		var parameters='';
        var xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
        } 
        xmlhttp.onreadystatechange = function()
        {
           if (xmlhttp.readyState == 4) {
				$('#mesajlar').empty();
                var ss="";
                msg = xmlhttp.responseText;
                var jdata = jQuery.parseJSON(msg);
                var bilgi ={
                    x:'',
                    y:'',
                    obsid:'',
                    obstype:'',
                    arazitip:''
                }
                $.each(jdata.blocks[0].data, function(i, data){
                    bilgi.x=data.x;
                    bilgi.y=data.y;
                    bilgi.obsid=data.obs[0].id;
                    bilgi.obytype=data.obs[0].type;
                    bilgi.arazitip=data.obs[0].ttp[0].vl;
                    console.log(bilgi.x +":"+bilgi.y+ "  Arazi Tipi:"+bilgi.arazitip);
					$('#mesajlar').append(bilgi.x +":"+bilgi.y+ "  Arazi Tipi:"+bilgi.arazitip+"<br>");
        	   });
        	  
            }
        }
        xmlhttp.open("POST", "json/dynamic_map_objects.php?b="+blok, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(parameters);
} 
//hakan(27516);
var scriptCSS=	'.hakan{'
				+'	border:1px solid black;'
				+'}'
				+'.somButonStyle1{'
				+'	display:inline-block;height:10px;width:14px;background:url(\'http://ihcdn3.ioimg.org/iov5/gui/village-2/step-2.png\') no-repeat scroll 100% 100% transparent;'
				+'	background-position: -55px -5px;'
				+'	color:silver;'
				+'	font-size:9px;'
				+'	text-decoration:none;'
				+'	line-height:10px;'
				+'	text-align:center;'
				+'	border:1px solid #6F6F6F;'
				'}'
				;
				
				
//left-menu
var menuStyle =	 "	font-size: 12px;"
				+"	position: absolute;"
				+"	left: 5px;"
				+"	top: 6px;"
				+"	width: 80px;"
				+"	height: 68px;"
				+"	z-index: 1;"
				+" background:url(\'http://ihcdn3.ioimg.org/iov5/gui/village-2/step-3.png\') no-repeat scroll -99px 0 ;"
				;
var ulStyle	='margin:0;padding:0;';
var menuData =  '<div id="hakan" style="'+menuStyle+'">'
				+'<ul style="'+ulStyle+'">'
				+'<li><a id="getBlok" href="javascript:void(null);" style="display:inline-block;height:30px;width:30px;background:url(\'http://ihcdn3.ioimg.org/iov5/gui/village-2/step-3.png\') no-repeat scroll 100% 100% transparent;background-position: -105px -438px;"></a>'
				+'<div style="display:inline-block;width:30px;margin-left:5px;">'
				+'<input id="bloktext1" type="text" style="margin-top:1px;border:1px solid black;font-size:10px;width:33px;height:8px;background-color:#682626;color:silver;margin-left:0px;display:block;" value="0">'
				+'<input type="text" style="margin-top:1px;border:1px solid black;font-size:10px;width:33px;height:8px;background-color:#682626;color:silver;margin-left:0px;display:block;" value="0">'
				+'</div>'
				+'</li>'
				+'</ul>'
				+'<ul id="sonuc"><li><span id="kkk">hakan</span></li></ul>'
				+'</div>'
				;

var somButonStyle=''
				+'display:inline-block;height:30px;width:30px;background:url(\'http://ihcdn3.ioimg.org/iov5/gui/village-2/step-3.png\') no-repeat scroll 100% 100% transparent;'
				+'background-position: -105px -440px;color:silver;font-size:12px;font-weight:normal;text-decoration:none;padding:0px;line-height:30px;text-align:center;'
				;

				
var sonucMenu	='<div id="sonucdiv" style="padding:5px;position:absolute;left:5px;top:2px;width:168px;height:472px;z-index:1;background:url(\'http://78.188.42.47/zemin.jpg\') no-repeat scroll 0 0;">'
				+'</div>'
				;

/********************************************/
function createSomButton(id){
	var sonuc;
		sonuc='<a href="javascript:void(xajax_change_current_province(666,1,\'village.php\','+id+'));" class="somButonStyle1">'+id+'</a>';
		return sonuc;
}				
function createSomButtons(){
	var sonuc;
	sonuc='<div style="display:block;position:absolute;top:5px;left:85px;color:silver;width:80px;box-shadow: 0 8px 6px -6px black;"><ul>';
	for (i=1;i<=19;i++){
		sonuc +='<li style="display:inline-block;margin:0px;padding:0px;">'+createSomButton(i)+'</li>';
	}
	sonuc +='</ul></div>';
	return sonuc;
}				
function mesajPano(){
	return '<div id="mesajlar" style="font-size:11px;display:block;position:absolute;top:80px;left:5px;color:silver;width:165px;box-shadow: -6px -9px 6px -5px black;">Mesajlar</div>';
}

function addStyle(css) {
	var parent = document.getElementsByTagName("head")[0];
	if (!parent) {
		parent = document.documentElement;
	}
	var style = document.createElement("style");
	style.type = "text/css";
	var textNode = document.createTextNode(css);
	style.appendChild(textNode);
	parent.appendChild(style);
}

	
$(document).ready(function() {
	addStyle(scriptCSS);
	$('body').append(sonucMenu);
	$('#sonucdiv').append(menuData);
	$('#sonucdiv').append(createSomButtons());
	$('#sonucdiv').append(mesajPano());
	$('#getBlok').click(function() {
		//GetBlok(27516);
		GetBlok($('#bloktext1').val());
	});
});
