
// ==UserScript==
// @name Herramientas para la alianza V de Vendeta
// @namespace 
// @description Añade los botones de nuestra alianza, nuestro galaxytool y el chatbox al ogame
// @include http://uni116.ogame.com.es/*/*
// ==/UserScript==


var usersession = unsafeWindow.session; 

var LinkDiv = document.createElement('div');
LinkDiv.id = 'LinkDiv';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="http://forozona.com/avatars/mastah64.gif?type=sigpic&dateline=1297708744" height="28" width="28"></span><a class="menubutton " href="http://vdvendeta.foroactivo.net/" accesskey="" target="_blank"><span class="textlabel">Foro Alianza</span></a></li><li class="menubutton_table"><span class="menu_icon"><img src="http://www.jovenastronomo.mendoza.edu.ar/images/galaxia_small.jpg" height="29" width="28"></span><a class="menubutton " href="http://vdvendetagt.webcindario.com/" accesskey="" target="_blank"><span class="textlabel">Galaxy</span></a></li>';
document.getElementById('menuTable').appendChild(LinkDiv);

(function ()
 {    
    var chatHTML = '<div id="shouttab" onclick="showshout()" ondblclick="hideshout()"><a style="height:100%;width:100%;"></a></div>'
   + '<div style="color:#f10707; line-height: 15px; font-size: 10px; font-weight: bold;width:150px;position:absolute;top:0px;right:-0px;height:90px;">'
   + '<br/><a style="color: #f10707;"" target="_blank" href="" ></a><br/><a style="color: #f10707;" href="" target="_blank"></a> <br/> <a style="color: #f10707;"  target="_blank" href="" ></a>" </div>'
   + '<div id="shoutframe"><iframe src="http://vdvendeta.foroactivo.net/chatbox" width="650" height="300" frameborder="0" allowtransparency="true"></iframe></div>'

   + '<div style="width:150px;position:absolute;bottom:0px;right:-100px;height:3px;background-repeat:no-repeat;"></div>'
        
    var targetElement = document.getElementById('overviewBottom');
    var origHTML = targetElement.innerHTML;
    
    targetElement.innerHTML =origHTML+chatHTML;
 }
) ();
