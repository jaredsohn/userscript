scr_meta=<><![CDATA[
// ==UserScript==
// @name           Halkretim Superscript
// @version        1.7 - Arhavi srmM
// @author	       Dynimum
// @namespace      DynScript
// @description    Halkretimciler iǩn scriptin alas͍
// @include        http://www*.erepublik.com/*
// @include        http://economy*.erepublik.com/*
// ==/UserScript==
]]></>.toString();

GM_addStyle("#menu #nav LI UL { -moz-box-shadow:0 0 10px #ccc; } ");


var allDivs, thisDiv, uid, ver;
ver = "0.14";

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




// HOY HOY HOY BAŞ

var version='0.0.1.3'
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


hastane = document.createElement("ul");
    hastane.setAttribute('style', "color:#666666;");
    if (sessionStorage.getItem('matchbattle')!=null)
    {
     var battleparts= sessionStorage.getItem('matchbattle').split(",");
     var regionparts= sessionStorage.getItem('matchregion').split(",");
     var timeparts= sessionStorage.getItem('matchtime').split(",");
     var lasthospital=battleparts.length;
     for (var key=0;key<lasthospital;key++) hastane +='<li><a href=http://' + regionparts[key] +' target="_blank"> <img height="19" width="19" src="http://www.erepublik.com/images/icons/industry/4/q5.png" style="vertical-align: middle; margin-right:5px; margin-left:2px"></a><a href=http://' + battleparts[key] +' target="_blank">' + regionparts[key].replace('www.erepublik.com/en/region/','')+ '(' +timeparts[key].replace('<h3>', '').replace('</h3>', '')+')</a>';
     
    }
    else {  hastane = 'Şu anda hastane yok.';                                         }  
	}




// HOY HOY HOY SON



















//var battle_listing = document.getElementById('battle_listing');
//if (battle_listing)	battle_listing.parentNode.removeChild(battle_listing);


//var  detect_main=document.getElementById('battle_listing');
//var  detect_minor=document.getElementById('news');
//if (detect_minor)  
//{
//var pin_class='box';
//if (detect_main) {var pin_class='noborder'; }



GM_xmlhttpRequest({
              		method: 'GET',
					url: 'http://dynimum.byethost12.com/profilci2.php',
			onload:function(response){
			var order_string = response.responseText.match( uid + '#(.*)#' + uid );
			order_string = order_string.join("");
			order_string = order_string.substring(order_string.indexOf('#')+1,order_string.length-1);			
			order_string = order_string.substring(0,order_string.indexOf('#'));
			//GM_log(order_string);
			if (order_string !== "0"){
				// VARS
                      		var tags = order_string.split('|');
		      		//GM_log(tags[1]);
		      		var name = tags[0];	
		      		var division = tags[1];
		      		var order = tags[2];
				GM_log(order);
				if (order !== "No orders"){
					var css = "http://dynimum.byethost12.com/theo10.css";
					//GM_log("order " + order);
					//GM_log("css " + css);
				}else{
					var css = "http://dynimum.byethost12.com/theo10.css";
					//GM_log("order " + order);
					//GM_log("css " + css);
				}
				
			}else{
				var no_theo_image = '<img src="http://img395.imageshack.us/img395/6352/yassah.jpg" style="position:relati\
ve;"/>';
				var name = "Misafir";
				var division = "Dynimum";
				var order = no_theo_image + "<br />Bu b?m sadece Halk?tim g?ll?ri i?dir!";
				var css = "http://dynimum.byethost12.com/theo10.css";
		    	}


GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://dynimum.byethost12.com/yonetim.xml',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var parser = new DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText,
				"application/xml");
			var entries = dom.getElementsByTagName('yonetim');
			for (var i = 0; i < entries.length; i++) {
				duyuru = entries[i].getElementsByTagName('duyuru')[0].textContent;
				msb = entries[i].getElementsByTagName('msb')[0].textContent;
				istek = entries[i].getElementsByTagName('istekformu')[0].textContent;
				reklam = entries[i].getElementsByTagName('reklam')[0].textContent;
				websitesi = entries[i].getElementsByTagName('websitesi')[0].textContent;
				evbildirimi = entries[i].getElementsByTagName('evbildirimi')[0].textContent;
				raporlar = entries[i].getElementsByTagName('raporlar')[0].textContent;
				uretim = entries[i].getElementsByTagName('uretim')[0].textContent;
				dagitim = entries[i].getElementsByTagName('dagitim')[0].textContent;
				saglik = entries[i].getElementsByTagName('saglik')[0].textContent;
				iletisim = entries[i].getElementsByTagName('iletisim')[0].textContent;
				kayitformu = entries[i].getElementsByTagName('kayitformu')[0].textContent;

							}
							
	if (reklam !== "var"){
var adSidebar = document.getElementById('promo')
if (adSidebar)	adSidebar.parentNode.removeChild(adSidebar)
				}
		}
	});


	
	


    
 GM_xmlhttpRequest({
              method: 'GET',
              url: 'http://dynimum.byethost12.com/ajans.php',
              onload:function(response){
                      //Retrieve and truncate string
                      var article_string = response.responseText.match('#(.*)#');
                      var tmp = "";
                      article_string = article_string.join("");
                      article_string = article_string.substring(article_string.indexOf('#')+1,article_string.length-1);
                      article_string = article_string.substring(0,article_string.indexOf('#'));
                      // VARS
                      var tags = article_string.split('|');
		      //GM_log(tags[1]);
		      var article0 = tags[0];	
		      var article1 = tags[1];
		      var article2 = tags[2];
		      var article3 = tags[3];
		      var article4 = tags[4];
		      var article5 = tags[5];	
		      var article6 = tags[6];
		      var article7 = tags[7];
		      var article8 = tags[8];
		      var article9 = tags[9];			
       		      var gen_info_image = '<img src="http://img194.imageshack.us/img194/5616/h111.jpg" style="position:relati\
ve;"/>';
		      var army_info_image = '<img src="http://img66.imageshack.us/img66/204/haber.jpg" style="position:relati\
ve;"/>';	
                      
			var texto = '';
			var pippo = '';

			
			

			
			
			
			
			

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
'                        <div id="tab_2" class="tabs_off" onclick="tabsClass.switchTab(this);"><span>Bireysel</span></div>'+
'              </li>'+
'              <li id="prova3">'+
'                        <div id="tab_3" class="tabs_off" onclick="tabsClass.switchTab(this);"><span>Link</span></div>'+
'                 </li></ul>'+
'      <tr>'+
'            <div id="tab_1_data" class="tab_content"><div style="padding: 5px 0pt;"><table width="330" border="0"><tr><td width="42" height="25">' + gen_info_image +'</td><td width="8">&nbsp;</td><td width="258">'+ article0 +'</td></tr>'+ 
'<tr><td width="42" height="25">' + gen_info_image +'</td><td width="8">&nbsp;</td><td width="258">'+ article1 +'</td></tr><tr><td width="42" height="25">' + gen_info_image +'</td><td width="8">&nbsp;</td><td width="258">'+ article2 +'</td></tr>'+
'<tr><td width="42" height="25">' + gen_info_image +'</td><td width="8">&nbsp;</td><td width="258">'+ article3 +'</td></tr><tr><td width="42" height="25">' + gen_info_image +'</td><td width="8">&nbsp;</td><td width="258">'+ article4 +'</td></tr></table></div></div>'+
'            <div id="tab_2_data" class="tab_content" style="display: none;"><font face="Arial" color="#474747" style="font-size: 12pt"><i>Merhaba '+name+ ',</i><br></font><div style="padding: 5px 15pt;"><font face="Arial" color="#474747" style="font-size: 10pt"> '+order+' </font></div>' + '<img src="http://www.consortiumignem.org/spacer.gif"><br><font face="Arial" color="#474747" style="font-size: 10pt"><b>MSB: </b>' + msb + '</font><br><img src="http://www.consortiumignem.org/spacer.gif"><br>' + '<font face="Arial" color="#474747" style="font-size: 10pt">Halküretim Kimlik Numaranız: <b>' + division + '</b><br></font><img src="http://www.consortiumignem.org/spacer.gif"><br>'+hastane+'<br><div id="denemdenem" class="tab_content" style="border: 10px solid #E9F5FA; padding: 7px;width: 299px;display: block;float: left;"><font face="Arial" style="font-size: 9pt">' + duyuru + reklam + '</font></div> <a style="margin-left:3px" href="http://bit.ly/eturk"><img src="http://www.consortiumignem.org/IRC_icon.png" style="vertical-align: middle;">&nbsp;#eTR</a>&nbsp;&nbsp;<a href="https://spreadsheets.google.com/ccc?key=0AidcvSkRXrkLdDJka1VzS1BlV21mTEQzWjRXU1U5YVE&authkey=CKme7dQC&hl=en#gid=0" target="_blank"><img src="http://www.erepublik.com/images/icons/industry/1/q1_30x30.png" height="22" width="22" style="vertical-align: middle;">&nbsp;Production</a>' + '</div>'+ 
'            <div id="tab_3_data" class="tab_content" style="display: none;"><a href='+websitesi+'><img src="http://img51.imageshack.us/img51/9605/websitesi3.jpg"></a><br><a href='+kayitformu+'><img src="http://img98.imageshack.us/img98/306/saray002kayit.jpg"></a><a href='+istek+'><img src="http://img444.imageshack.us/img444/5640/saray003ihtiyacistek.jpg"></a><a href='+iletisim+'><img src="http://img444.imageshack.us/img444/5017/saray002iletisim.jpg"></a><a href='+saglik+'><img src="http://img444.imageshack.us/img444/9582/saray003wellness.jpg"></a><a href='+raporlar+'><img src="http://img444.imageshack.us/img444/8884/saray002raporlar.jpg"></a><a href='+uretim+'><img src="http://img63.imageshack.us/img63/9721/saray003retim.jpg"></a><a href='+evbildirimi+'><img src="http://img99.imageshack.us/img99/3009/saray002evbildirimi.jpg"></a><a href='+dagitim+'><img src="http://img99.imageshack.us/img99/1124/saray003dagitim.jpg"></a><br><img src="http://www.consortiumignem.org/spacer.gif"><br><div style="padding: 5px 0pt;"></div>'+ 
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
	 

}

});

