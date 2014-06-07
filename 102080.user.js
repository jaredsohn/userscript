// ==UserScript==
// @name           Skripta za naredjenja
// @namespace      www.erepublik.com
// @description    Skripta za naredjenja prikazana na homepage-u erepublik.com
// @author         Nikola
// @version        0.0.1.0
// @include http://www.erepublik.com/*

// ==/UserScript==
var version='0.0.1.0'
function getElementsByClassName( strClassName, obj ) {
    var ar = arguments[2] || new Array();
    var re = new RegExp("\\b" + strClassName + "\\b", "g");
 if ( re.test(obj.className) ) {
        ar.push( obj );
    }
    for ( var i = 0; i < obj.childNodes.length; i++ )
        getElementsByClassName( strClassName, obj.childNodes[i], ar );
 return ar;
}

function trim(string)
{
return string.replace(/(^\s+)|(\s+$)/g, "");
}

  
var  detect_main=document.getElementById('battle_listing');
var  detect_minor=document.getElementById('news');
if (detect_minor)  
{
var pin_class='box';
if (detect_main) {var pin_class='noborder'; }

var now = new Date(); 
 if ((now.getTime()-sessionStorage.getItem('time'))>180000 || sessionStorage.getItem('matchbattle') == null)
 {
 sessionStorage.setItem('time', now.getTime() ); 
GM_xmlhttpRequest( {
             method : 'GET',
             url : 'http://erepublik-market.cz.cc/hospital.html',
             onload : function(response) {
                
                  var matchbattle = response.responseText.match(/www\.erepublik\.com\/en\/military\/battlefield\/[0-9]{4,5}/g);
                  var matchregion = response.responseText.match(/www\.erepublik\.com\/en\/region\/[A-z,\-]{4,20}/g);
                  var matchtime = response.responseText.replace(/(\r\n|\n|\r)/gm,"").replace(/(<br\/>)/gm," ~ ").match(/<h3>(.*?)<\/h3>/g); 
                  var matchnull = response.responseText.match('No hospitals are available');
sessionStorage.removeItem('matchbattle');  sessionStorage.removeItem('matchregion'); sessionStorage.removeItem('matchtime');
sessionStorage.setItem('matchbattle', matchbattle);
sessionStorage.setItem('matchregion', matchregion ); 
sessionStorage.setItem('matchtime', matchtime ); 
                    
}
});
}

if (sessionStorage.getItem('matchbattle')==null)
{
var start = new Date().getTime();
var cur = start
while(cur - start < 500)
{
cur = new Date().getTime();
} 
}

GM_xmlhttpRequest({
  method: 'GET',
  url: 'http://jurisnici.byethost13.com/text.txt',
  
  onload:function(response){       
    var order_string = response.responseText;
    var tags = order_string.split('|');
    integr=document.getElementsByClassName( pin_class, document.getElementById('content') )[0];   
     if (tags[5]!= version) {
	 	sessionStorage.setItem('time', now.getTime()-180000 ); 
    // if (confirm('Доступна новая ('+tags[5]+') версия Orders for Army. Хотите скачать?'))  //window.open('http://userscripts.org/scripts/source/109010.user.js', '_self');
                              }
    
    order1 = document.createElement("span");
    order1.innerHTML = '<embed width="250" height="28" src="http://www.erepublik.com/flash/graublau.swf" quality="best"  flashvars="txt='+ tags[0] + '&amp;&amp;textcolor=#737373&amp;hovercolor=null&amp;linkcolor=null&amp;w=250&amp;h=28" wmode="transparent" bgcolor="transparent" sifr="true" type="application/x-shockwave-flash" class="sIFR-flash"  style="width: 250px; height: 28px;"><br>';
     
    if (tags[1].split(",")[0]=='' || tags[1].split(",")[0]=='#') {order2 = document.createElement("span"); order2.setAttribute('style', "color:#666666;");}
    else {order2 = document.createElement("a");  order2.setAttribute('href', tags[1].split(",")[0]); }
    order2.innerHTML = tags[1].split(",")[1];
    order2.setAttribute('target', '_blank');

    order3 = document.createElement("span");
    order3.setAttribute('style', "color:#666666;");
    var parts= tags[2].split(",");
    var last=parts.length-1;
    order3.innerHTML=parts[last]; 
    for (var key=0;key<last;key++) if (parts[key]!='') {order3.innerHTML +=' <a href="' + parts[key] + '" target="_blank">' + parts[key].split("=")[1] +'</a>;'; }

    if (tags[4].split(",")[0]=='' || tags[4].split(",")[0]=='#') {order4 = document.createElement("span"); order4.setAttribute('style', "color:#666666;");}
    else {order4 = document.createElement("a");  order4.setAttribute('href', tags[4].split(",")[0]); }
    order4.innerHTML = tags[4].split(",")[1];
    order4.setAttribute('target', '_blank');
    
    order5 = document.createElement("ul");
    order5.setAttribute('style', "color:#666666;");
    if (sessionStorage.getItem('matchbattle')!=null)
    {
     var battleparts= sessionStorage.getItem('matchbattle').split(",");
     var regionparts= sessionStorage.getItem('matchregion').split(",");
     var timeparts= sessionStorage.getItem('matchtime').split(",");
     var lasthospital=battleparts.length;
     for (var key=0;key<lasthospital;key++) order5.innerHTML +='<li><a href=http://' + regionparts[key] +' target="_blank"> <img height="19" width="19" src="http://www.erepublik.com/images/icons/industry/4/q5.png" style="vertical-align: middle; margin-right:5px; margin-left:2px"></a><a href=http://' + battleparts[key] +' target="_blank">' + regionparts[key].replace('www.erepublik.com/en/region/','')+ '(' +timeparts[key].replace('<h3>', '').replace('</h3>', '')+')</a></li>';
     
    }
    else {  order5.innerHTML = 'Trenutno nema bolnica';                                         }  
    
    spacer=document.createElement("span");
    spacerpic=document.createElement("img");
    spacerpic.setAttribute('style', "margin-top:3px; margin-bottom:3px; display:block; float:left;");
    spacerpic.setAttribute('src', 'http://www.consortiumignem.org/spacer.gif'); 
    spacer.appendChild(spacerpic);
    spacer.appendChild(document.createElement("br")); 
     
    icons = document.createElement("span");
    icons.innerHTML='<a style="margin-left:3px" href="http://01.chat.mibbit.com/?channel=%23lav&server=irc.rizon.net&nick='+trim(document.getElementsByClassName( 'citizen_name', document.getElementById('miniprofile'))[0].innerHTML).replace(' ','_').replace('.','')+'" target="_blank"><img src="http://www.consortiumignem.org/IRC_icon.png" style="vertical-align: middle;">&nbsp;Irc</a>&nbsp;&nbsp;';
    icons.innerHTML+= '<a href="link do skripte" target="_blank"><img src="http://groups.google.com/groups/img/gsecs/pages_24.png" height="18" width="18" style="vertical-align: middle;">&nbsp;Verzija. '+ version +'</a>&nbsp;&nbsp;';
   
    pic1=document.createElement("img");  
    pic1.setAttribute('src', 'http://www.erepublik.com/images/icons/ranks/fieldmarshal.png');
    pic1.setAttribute('style', "vertical-align: middle; margin-right:5px; margin-left:2px");
    pic1.setAttribute('height', '19');
    pic1.setAttribute('width', '19');

    pic2=pic1.cloneNode(true);    
    pic2.setAttribute('src', 'http://www.erepublik.com/images/icons/skills/economyskill.png');
     
    pic3=pic1.cloneNode(true); 
    pic3.setAttribute('src', 'http://www.erepublik.com/images/icons/skills/tank.png');

 if(integr) {              
    integr.parentNode.insertBefore( order1, integr);
    integr.parentNode.insertBefore(pic1, integr);
    integr.parentNode.insertBefore(order2, integr);
    integr.parentNode.insertBefore(spacer, integr);
    integr.parentNode.insertBefore(pic2, integr);
    integr.parentNode.insertBefore(order3, integr);
    integr.parentNode.insertBefore(spacer.cloneNode(true), integr);
    integr.parentNode.insertBefore(pic3, integr);
    integr.parentNode.insertBefore(order4, integr);
    integr.parentNode.insertBefore(spacer.cloneNode(true), integr);
    integr.parentNode.insertBefore(order5, integr);
    integr.parentNode.insertBefore(spacer.cloneNode(true), integr);
    integr.parentNode.insertBefore(icons, integr);
    	    }
   }  
   }
  );
  }
  
 var blue_domination=document.getElementById('blue_domination');
  if (blue_domination)
  {
blue_domination.setAttribute('style', 'opacity: 1; -moz-opacity: 1;');
var  red_domination=document.getElementById('red_domination');
red_domination.setAttribute('style', 'opacity: 1; -moz-opacity: 1;');

function fixwidth() {
var getblue=document.getElementById('domination_bar').style.getPropertyValue("width");
blue_domination.innerHTML = getblue;
getred=(100-getblue.replace('%',''))+'';
red_domination.innerHTML = getred.substring(0,7) +'%';
	                }
setInterval(fixwidth, 4000);
}
