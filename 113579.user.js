// ==UserScript==
// @name           FSR Army Orders
// @namespace      www.erepublik.com
// @description    Orders for FSR Army
// @author         just-me(original script by Morion)
// @redactor       just-me
// @version        1.0
// @include 	   http://www.erepublik.com/*

// ==/UserScript==
var version='1.0'
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
             url : 'http://erepublik-market.com/hospital.html',
             onload : function(response) {
                 if (response.status == 200 && response.statusText == "OK" && response.readyState == 4) {
				 	var matchbattle = response.responseText.match(/www\.erepublik\.com\/en\/military\/battlefield\/[0-9]{4,5}/g);
				 	var matchregion = response.responseText.match(/www\.erepublik\.com\/en\/region\/[A-z,\-]{4,20}/g);
				 	var matchtime = response.responseText.replace(/(\r\n|\n|\r)/gm, "").replace(/(<br\/>)/gm, " ~ ").match(/<h3>(.*?)<\/h3>/g);
				 	var matchnull = response.responseText.match('No hospitals are available');
				 	sessionStorage.removeItem('matchbattle');
				 	sessionStorage.removeItem('matchregion');
				 	sessionStorage.removeItem('matchtime');
				 	sessionStorage.setItem('matchbattle', matchbattle);
				 	sessionStorage.setItem('matchregion', matchregion);
				 	sessionStorage.setItem('matchtime', matchtime);
				 }      
}
});
}

GM_xmlhttpRequest({
  method: 'GET',
  url: 'http://fsrarmy.uv.ro/ordine.php',
  
  onload:function(response){       
    var order_string = response.responseText;
    var tags = order_string.split('#');
    integr=document.getElementsByClassName( pin_class, document.getElementById('content') )[0];   
      
    order1 = document.createElement("span");
    order1.innerHTML = '<embed width="250" height="28" src="http://www.erepublik.com/flash/graublau.swf" quality="best"  flashvars="txt='+ tags[0] + '&amp;&amp;textcolor=#737373&amp;hovercolor=null&amp;linkcolor=null&amp;w=250&amp;h=28" wmode="transparent" bgcolor="transparent" sifr="true" type="application/x-shockwave-flash" class="sIFR-flash"  style="width: 250px; height: 28px;"><br>';
     
    if (tags[1].split(",")[0]=='' || tags[1].split(",")[0]=='#') {order2 = document.createElement("span"); order2.setAttribute('style', "color:#666666;");}
    else {order2 = document.createElement("a");  order2.setAttribute('href', tags[1].split(",")[0]); }
    order2.innerHTML = tags[1].split(",")[1];
    order2.setAttribute('target', '_blank');

	if (tags[2].split(",")[0]=='' || tags[2].split(",")[0]=='#') {order3 = document.createElement("span"); order3.setAttribute('style', "color:#666666;");}
    else {order3 = document.createElement("a");  order3.setAttribute('href', tags[2].split(",")[0]); }
    order3.innerHTML = tags[2].split(",")[1];
	order3.setAttribute('target', '_blank');

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
    else {  order5.innerHTML = 'No Hospitals for now.';                                         }  
    
    spacer=document.createElement("span");
    spacerpic=document.createElement("img");
    spacerpic.setAttribute('style', "margin-top:3px; margin-bottom:3px; display:block; float:left;");
    spacerpic.setAttribute('src', 'http://fsrarmy.uv.ro/spacer.gif'); 
    spacer.appendChild(spacerpic);
    spacer.appendChild(document.createElement("br")); 
     
       icons = document.createElement("span");
        icons.innerHTML+= '<a href="http://egov4you.info/group/view/341" target="_blank"><img src="http://egov4you.info/favicon.ico" height="22" width="22" style="vertical-align: middle;">&nbsp;Stats</a>&nbsp;&nbsp;';
    icons.innerHTML+= '<a href="http://www.erepublik.com/en/main/group-show/58" target="_blank"><img src="http://static.erepublik.com/uploads/avatars/Groups/2011/03/01/66f041e16a60928b05a7e228a89c3799_medium.jpg" height="22" width="22" style="vertical-align: middle;">&nbsp;SK-Dragons</a>&nbsp;&nbsp;';
    icons.innerHTML+= '<a href="http://www.erepublik.com/en/main/group-show/66" target="_blank"><img src="http://static.erepublik.com/uploads/avatars/Groups/2011/03/01/3295c76acbf4caaed33c36b1b5fc2cb1_medium.jpg" height="22" width="22" style="vertical-align: middle;">&nbsp;FSR</a>&nbsp;&nbsp;';
    icons.innerHTML+= '<a href="http://www.erepublik.com/en/newspaper/fortele-speciale-romane-185464/1" target="_blank"><img src="http://static.erepublik.com/uploads/avatars/Groups/2011/03/01/3295c76acbf4caaed33c36b1b5fc2cb1_medium.jpg" height="22" width="22" style="vertical-align: middle;">&nbsp;Ziarul FSR</a>&nbsp;&nbsp;';
   
    pic1=document.createElement("img");  
    pic1.setAttribute('src', 'http://www.erepublik.com/images/icons/industry/2/q5.png');
    pic1.setAttribute('style', "vertical-align: middle; margin-right:5px; margin-left:2px");
    pic1.setAttribute('height', '19');
    pic1.setAttribute('width', '19');

    pic2=pic1.cloneNode(true);    
    pic2.setAttribute('src', 'http://www.erepublik.com/images/icons/industry/2/q2.png');

     
    pic3=pic1.cloneNode(true); 
    pic3.setAttribute('src', 'http://www.erepublik.com/images/icons/industry/2/q1.png');


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