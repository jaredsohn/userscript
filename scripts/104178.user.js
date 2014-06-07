// ==UserScript==
// @name            Crafting short cut
// @description	    Creates a short cut to crafting next to the character info.
// @namespace       Leones
// @include         http://*.the-west.*/game.php*
// ==/UserScript==

var url = window.location.href;
if (url.indexOf(".the-west.") != -1) 
{
    var insertBeforeElement = document.getElementById('left_top');
    var newScriptElement = document.createElement('script');
    newScriptElement.setAttribute('type', 'text/javascript');
    //timer opvragen zonder handelaar te openen
    newScriptElement.innerHTML = "function eerst(){var dta;var nodig = '';Ajax.remoteCall('item_trader','index','',function(json){var dedata=Json.toString(json);dta=dedata;var eerstechar=(dta.indexOf('ItemTraderpage.setTime'));var laatstechar=(dta.indexOf(';', eerstechar));nodig = nodig+dta.slice(eerstechar,laatstechar+1).toString();var insertBeforeElement2 = document.getElementById('left_top');var newScriptElement2 = document.createElement('script');newScriptElement2.setAttribute('type', 'text/javascript');newScriptElement2.innerHTML = ''+nodig;insertBeforeElement2.parentNode.insertBefore(newScriptElement2, insertBeforeElement2);});}";
    insertBeforeElement.parentNode.insertBefore(newScriptElement, insertBeforeElement);
}

var ni = document.getElementById('character_stats');

var newscript = document.createElement('script');

var newdiv = document.createElement('div');
var newdiv2 = document.createElement('div');
var newdiv3 = document.createElement('div');
var newdiv4 = document.createElement('div');

var craftinfo = document.createElement('script');

newscript.setAttribute('type','text/javascript');

newdiv.setAttribute('id','craft');
newdiv2.setAttribute('id','trader');
newdiv3.setAttribute('id','wisselbox');
newdiv3.setAttribute('style', 'position:absolute;left:450px;top:35px;');
newdiv4.setAttribute('id','tijdhier');
newdiv4.setAttribute('style', 'position:absolute;left:450px;top:50px;');

craftinfo.setAttribute('type','text/javascript');
//script voor crafting
craftinfo.innerHTML ="function getInfoCraft(){var popupMsg2='<table border=\"1\">';Ajax.remoteCall('crafting','',{},function(json){for(var i=0;i<json.recipes_content.length;i++){Crafting.recipes[json.recipes_content[i].item_id];if(json.recipes_content[i].available_resources){var popupMsg = '<tr><td>'+json.recipes_content[i].craftitem.name+'</td>';popupMsg = popupMsg+'<td><img src =\"http://www.the-west.nl/'+json.recipes_content[i].craftitem.image_micro+'\" style=\"background-image:url(../images/itemtrader/haendler_itembg.png);position: relative;\"></img></td></tr>';popupMsg2=popupMsg2+' '+popupMsg;};} var txt = 'Handwerk';var p = Character.profession;if (p == 0){} if(p==1){ txt = txt+': Veldkok';}else if(p==2){ txt = txt+': Kwakzalver';}else if(p==3){ txt = txt+': Smid';}else if(p==4){ txt = txt+': Zadelmeester';}else{}var txt_popup = '<b>'+txt+'</b><br/>'+'<b>Grondstoffen aanwezig voor:</b><br/><br/>'+popupMsg2+'</table>';document.getElementById('craft').addMousePopup(new MousePopup(txt_popup));});}";

//script voor handelaar
newscript.innerHTML = "var timeout; function ikhebgeklikt(){var t = new Date().getTime()-ItemTraderpage.timediff;var dt = (ItemTraderpage.time-t)/1000;var dt2 = dt.formatDuration();var nit = document.getElementById('tijdhier');nit.innerHTML = dt2;var nit2 =document.getElementById('wisselbox');nit2.innerHTML ='Wisselen in:';var hours=Math.floor(dt/3600);var minutes=Math.floor(dt/60-hours*60);var seconds=Math.floor(dt%60);timeout = setTimeout(\"ikhebgeklikt()\",999); if ( hours == 0 && minutes == 0 && seconds == 0){var timebox = document.getElementById('tijdhier');timebox.innerHTML = '';var wisselen =document.getElementById('wisselbox');wisselen.innerHTML ='<p style=\"color:red;\"><b><a href=\"javascript:laden();\">Handelaar</br>vernieuwen</a></b></p></a>';clearTimeout(timeout);}}function laden(){AjaxWindow.show(\'item_trader\', {action: 'index', h: h});setTimeout(\"ikhebgeklikt()\",2000);}function getTraderInfo(){document.getElementById('trader').addMousePopup(new MousePopup(\"Reizende handelaar\"));}";
//buttons
newdiv.innerHTML = "<img src=\"http://www.the-west.nl/images/crafting/select.png\" width=\"62\" height=\"60\"id=\"knop\" onMouseover=\"javascript:getInfoCraft();\" onclick=\"javascript:Crafting.open();\" style=\"position:absolute;left:300px;top:20px;cursor:pointer;\" />";
newdiv2.innerHTML = "<img src=\"http://www.the-west.nl/images/itemtrader/haendler_btn.jpg\" width=\"68\" height=\"66\ id=\"knop2\" onMouseover=\"javascript:getTraderInfo();\" onload=\"javascript:eerst();ikhebgeklikt();\" onclick=\"javascript:laden();\" style=\"position:absolute;left:370px;top:18px;cursor:pointer;\" />";

ni.appendChild(newscript);
ni.appendChild(craftinfo);
ni.appendChild(newdiv);
ni.appendChild(newdiv2);
ni.appendChild(newdiv3);
ni.appendChild(newdiv4);
