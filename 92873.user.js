scr_meta=<><![CDATA[
// ==UserScript==
// @name           Halküretim Superscript
// @version        2.0.1 - Marmara sürümü
// @author		   Dynimum
// @description    Halküretimciler için scriptin alası
// @include        http://www*.erepublik.com/*
// @include        http://economy*.erepublik.com/*
// ==/UserScript==
]]></>.toString();

var version='2.0.1';

// MENÜLER BAŞ

GM_addStyle("#menu #nav LI UL { -moz-box-shadow:0 0 10px #ccc; } ");

// MENÜLER SON

// UİD ALMACA BAŞ

var allDivs, thisDiv, uid;

allDivs = document.evaluate(
	"//a[@class='citizen_name']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    
	thisDiv = allDivs.snapshotItem(i);
	var ind = thisDiv.href.lastIndexOf('/');
	uid = thisDiv.href.substring(ind+1);
};

// UİD ALMACA SON

//HASTANEBAŞ

// HOY HOY HOY BAŞ


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
                  var matchtime = response.responseText.match(/<h3>.*/g); 
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


// HOY HOY HOY ARA


hastane = "";

    if (sessionStorage.getItem('matchbattle')!=null)
    {
     var battleparts= sessionStorage.getItem('matchbattle').split(",");
     var regionparts= sessionStorage.getItem('matchregion').split(",");
     var timeparts= sessionStorage.getItem('matchtime').split(",");
     var lasthospital=battleparts.length;
     for (var key=0;key<lasthospital;key++) hastane +='<li><a href=http://' + regionparts[key] +' target="_blank"> <img height="19" width="19" src="http://www.erepublik.com/images/icons/industry/4/q5.png" style="vertical-align: middle; margin-right:5px; margin-left:2px"></a><a href=http://' + battleparts[key] +' target="_blank">' + regionparts[key].replace('www.erepublik.com/en/region/','')+ ' ( ' +timeparts[key].replace('<h3>', '').replace('</h3>', '')+')</a>';
     
    }
    else {  hastane = '<img height="19" width="19" src="http://www.erepublik.com/images/icons/industry/4/q5.png" style="vertical-align: middle; margin-right:5px; margin-left:2px"><b>Hastane:</b> Şu anda hastane bulunmamaktadır.';                                         }  
	}




// HOY HOY HOY SON


//HASTANESON



GM_xmlhttpRequest({
              		method: 'GET',
					url: 'http://dynimum.byethost12.com/' + uid + '.php',
			onload:function(response){
			var order_string = response.responseText.match('#(.*)#');
			order_string = order_string.join("");
			order_string = order_string.substring(order_string.indexOf('#')+1,order_string.length-1);			
			order_string = order_string.substring(0,order_string.indexOf('#'));
			if (order_string !== "0"){
                    var tags = order_string.split('|');
		      		var name = tags[0];	
		      		var division = tags[1];
		      		var order = tags[2];
				GM_log(order);
				if (order !== "No orders"){
					var css = "http://dynimum.byethost12.com/theo10.css";
				}else{
					var css = "http://dynimum.byethost12.com/theo10.css";
				}
			}else{
				var no_theo_image = '<img src="http://img395.imageshack.us/img395/6352/yassah.jpg" style="position:relati\
ve;"/>';
				var name = "Misafir";
				var division = "Dynimum";
				var order = no_theo_image + "<br />Bu bölüm sadece Halküretim gönüllüleri içindir!";
				var css = "http://dynimum.byethost12.com/theo10.css";
		    	}

				
				
// GENEL DUYURU BAŞ

	GM_xmlhttpRequest({
              		method: 'GET',
					url: 'http://dynimum.byethost12.com/genel.php',
			onload:function(response){
			var genelduyurual = response.responseText;
			var genelbolumler = genelduyurual.split("|");
			var genelduyuru = genelbolumler[0];
     if (genelbolumler[5]!= version) {
     if (confirm('Halküretim iletişim scriptinin '+genelbolumler[5]+' sürümü yayınlandı. Şimdi yüklemek istiyor musunuz?'))  window.open('http://userscripts.org/scripts/source/92873.user.js', '_self');
                              }
			
// GENEL DUYURU SON
				
				
				
				

// LİNK SAYFASI BAŞ
	
	GM_xmlhttpRequest({
              		method: 'GET',
					url: 'http://dynimum.byethost12.com/sinanay.html',
			onload:function(response){
			var linksayfasi = response.responseText;

// LİNK SAYFASI SON



// HOPE HOPEFULL BAŞ
	
	GM_xmlhttpRequest({
              		method: 'GET',
					url: 'http://halkuretimpanel.byethost8.com/msb.html',
			onload:function(response){
			var hopehopefull = response.responseText;

// HOPE HOPEFULL SON



    
 GM_xmlhttpRequest({
              method: 'GET',
              url: 'http://dynimum.byethost12.com/ajans.php',
              onload:function(response){
                      var article_string = response.responseText.match('#(.*)#');
                      var tmp = "";
                      article_string = article_string.join("");
                      article_string = article_string.substring(article_string.indexOf('#')+1,article_string.length-1);
                      article_string = article_string.substring(0,article_string.indexOf('#'));
                      var tags = article_string.split('|');
		      var resim1 = tags[0];	
		      var makale1 = tags[1];
		      var resim2 = tags[2];
		      var makale2 = tags[3];
		      var resim3 = tags[4];
		      var makale3 = tags[5];	
		      var resim4 = tags[6];
		      var makale4 = tags[7];
		      var resim5 = tags[8];
		      var makale5 = tags[9];
       		      var gen_info_image = '<img src="http://img194.imageshack.us/img194/5616/h111.jpg" style="position:relati\
ve;"/>';
		      var army_info_image = '<img src="http://img66.imageshack.us/img66/204/haber.jpg" style="position:relati\
ve;"/>';	
                      

			
			

			// String
                      var $box_str =  '<script type="text/javascript">'+
'var tabsClass = {'+
'	tabSetArray: 	new Array(),'+
'	classOn: 		"tabs_on",'+
'	classOff: 		"tabs_off",'+
'	addTabs: function (tabsContainer) {'+
'		tabs = document.getElementById(tabsContainer).getElementsByTagName("div");'+
'		for (x in tabs) {'+
'			if (typeof(tabs[x].id) != "undefined") {'+
'				this.tabSetArray.push(tabs[x].id);'+
'			} else {}'+
'		}'+
'	},'+
'	switchTab: function (element) {'+
'		for (x in this.tabSetArray) {'+
'			tabItem = this.tabSetArray[x];'+
'			dataElement = document.getElementById(tabItem + "_data");'+
'			if (dataElement) {'+
'				if (dataElement.style.display != "none") {'+
'					dataElement.style.display = "none";'+
'				} else {}'+
'			} else {}'+
'			tabElement = document.getElementById(tabItem);'+
'			if (tabElement) {'+
'				if (tabElement.className != this.classOff) {'+
'					tabElement.className = this.classOff;'+
'				} else {}'+
'			} else {}'+
'		}'+
'		document.getElementById(element.id + "_data").style.display = "";'+
'		element.className = this.classOn;'+
'	}'+
'};'+
'</script>'+
'<link rel="stylesheet" href="'+ css +'" type="text/css" media="screen"></link>'+
'        <div class="title">'+
'              <h1>Halküretim</h1>'+
'       </div>'+
'          <ul id="tabContainer" class="tabs">'+
'              <li id="prova">'+
'                        <div id="tab_1" class="tabs_on" onclick="tabsClass.switchTab(this);"><span>Haber</span></div>'+
'              </li>'+
'              <li id="prova2">'+
'                        <div id="tab_2" class="tabs_off" onclick="tabsClass.switchTab(this);"><span>İletişim</span></div>'+
'              </li>'+
'              <li id="prova3">'+
'                        <div id="tab_3" class="tabs_off" onclick="tabsClass.switchTab(this);"><span>Link</span></div>'+
'                 </li></ul>'+
'      <tr>'+
'            <div id="tab_1_data" class="tab_content"><div style="padding: 5px 0pt;"><table width="330" border="0"><tr><td width="42" height="25">' + resim1 +'</td><td width="8">&nbsp;</td><td width="258">'+ makale1 +'</td></tr>'+ 
'<tr><td width="42" height="25">' + resim2 +'</td><td width="8">&nbsp;</td><td width="258">'+ makale2 +'</td></tr><tr><td width="42" height="25">' + resim3 +'</td><td width="8">&nbsp;</td><td width="258">'+ makale3 +'</td></tr>'+
'<tr><td width="42" height="25">' + resim4 +'</td><td width="8">&nbsp;</td><td width="258">'+ makale4 +'</td></tr><tr><td width="42" height="25">' + resim5 +'</td><td width="8">&nbsp;</td><td width="258">'+ makale5 +'</td></tr></table></div></div>'+
'            <div id="tab_2_data" class="tab_content" style="display: none;"><font face="Arial" color="#474747" style="font-size: 12pt"><i>Merhaba '+ name + ',</i><br></font><div style="padding: 5px 15pt;"><font face="Arial" color="#474747" style="font-size: 10pt"> '+ order +' </font></div>' + '<br>' + genelduyuru + '<div style="padding: 0px 5pt;"><font face="Arial" color="#474747" style="font-size: 10pt"><br>' + hopehopefull + '</font></div><img src="http://www.consortiumignem.org/spacer.gif"><br><div style="padding: 5px 15pt;"><font face="Arial" color="#474747" style="font-size: 10pt">'+hastane+'</div></font><img src="http://www.consortiumignem.org/spacer.gif"><br><a style="margin-left:3px" href="http://bit.ly/eturk"><img src="http://www.consortiumignem.org/IRC_icon.png" style="vertical-align: middle;">&nbsp;#eTR</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://wbe02.mibbit.com/?server=irc.rizon.net&channel=%23halkuretim"><img src="http://www.consortiumignem.org/IRC_icon.png" style="vertical-align: middle;">&nbsp;#halkuretim</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://userscripts.org/scripts/show/92873" target="_blank"><img src="http://groups.google.com/groups/img/gsecs/pages_24.png" height="18" width="18" style="vertical-align: middle;">&nbsp;Script versiyon: '+ version +'</a></div>'+ 
'            <div id="tab_3_data" class="tab_content" style="display: none;">' + linksayfasi + '<br><img src="http://www.consortiumignem.org/spacer.gif"><br><font face="Arial" color="#474747" style="align: center;">Halküretim Kimlik Numaranız: <b>' + division + '</b><br></font></div>'+ 
'                  </div>'+
'                  <script type="text/javascript">'+
'			tabsClass.addTabs("tabContainer");'+
'			</script>'
'        </tr>';

                      columna=document.getElementById('shouts');
                      contenedor = document.createElement("div");
                      contenedor.setAttribute('class', 'box');
                      contenedor.setAttribute('id', 'news');
                      contenedor.innerHTML = $box_str;
       
                      if(article_string.length) {   //Only insert if string is uncommented
                              columna.parentNode.insertBefore(contenedor, columna);
                      }
              }
      });
	 }                    //lombak
			});           //lombak
	 }                    //genelduyuru
			});           //genelduyuru
	 }                    //hopehopefull
			});           //hopehopefull
}

});

