// ==UserScript==
// @name         BA orders 
// @version        2.5
// @author	   nysex
// @description    Orders for BA, Script 
//based on the theocratic
// @include        http://www.erepublik.com/en
// @include        http://www.erepublik.com/es
// @include        http://www.erepublik.com/pt
// @include        http://www.erepublik.com/ru
// @include        http://www.erepublik.com/fr
// @include        http://www.erepublik.com/de
// ==/UserScript==



GM_xmlhttpRequest({
              		method: 'GET',
              		url: 'http://forum.ebulgaria.biz/viewtopic.php?f=10&t=60',
			onload:function(response){
                        var army_image = '<img src="http://esa.ucoz.net/military_icon_normal.png" style="position:relative;"/>';
                        var order_string = response.responseText.match('#####(.*)#####');
			order_string = army_image + order_string.join("");
			order_string = army_image + order_string.substring(order_string.indexOf('#####')+5,order_string.length-1);			
			order_string = order_string.substring(0,order_string.indexOf('#####'));
			if (order_string !== "0"){
				if (order_string !== "No orders"){
					var css = "http://esa.ucoz.net/css2.css";
				}else{
					var css = "http://esa.ucoz.net/css1.css";
				}
			}else{
				var no_eba_image = '<img src="http://esa.ucoz.net/beer_mug1.jpg" style="position:relative;"/>';
				var order_string = no_eba_image + "Съжалявам, ти не си от Българската Армия";
				var css = "http://esa.ucoz.net/css1.css";
		    	}


    
 GM_xmlhttpRequest({
              method: 'GET',
              url: 'http://forum.ebulgaria.biz/viewtopic.php?f=10&t=61',
              onload:function(response){
                      //Retrieve and truncate string
                      var article_string = response.responseText.match('#####(.*)#####');
                      var tmp = "";
                      article_string = article_string.join("");
                      article_string = article_string.substring(article_string.indexOf('#####')+5,article_string.length-1);
                      article_string = article_string.substring(0,article_string.indexOf('#####'));
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
		      var article10 = tags[10];
		      var article11 = tags[11];
		      var article12 = tags[12];
		      var article13 = tags[13];
		      var article14 = tags[14];
		      var article15 = tags[15];
		      var article16 = tags[16];
		      var article17 = tags[17];
		      var article18 = tags[18];
		      var article19 = tags[19];		
       		      
		      var news_image = '<img src="http://esa.ucoz.net/light_bulb1.jpg" style="position:relative;"/>';
		      var government_image = '<img src="http://esa.ucoz.net/livescribe_pen1.jpg" style="position:relative;"/>';
                      var info_image = '<img src="http://esa.ucoz.net/beer_mug1.jpg" style="position:relative;"/>';
  
                      
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
'              <h1 class="sIFR-replaced"><embed style="width: 250px; height: 28px;" class="sIFR-flash" type="application/x-shockwave-flash" sifr="true" bgcolor="transparent" wmode="transparent" flashvars="txt=Bulgarian Army&amp;&amp;textcolor=#737373&amp;hovercolor=null&amp;linkcolor=null&amp;w=250&amp;h=28" quality="best" src="/flash/delicious.swf" height="28" width="250"><span class="sIFR-alternate">Bulgarian Army</span></h1>'+
'       </div>'+
'          <ul id="tabContainer" class="tabs">'+
'              <li id="prova3">'+
'                        <div id="tab_3" class="tabs_on" onclick="tabsClass.switchTab(this);"><span>Заповеди</span></div>'+
'              </li>'+
'              <li id="prova2">'+
'                        <div id="tab_2" class="tabs_off" onclick="tabsClass.switchTab(this);"><span>Информация</span></div>'+
'              </li>'+
'              <li id="prova">'+
'                        <div id="tab_1" class="tabs_off" onclick="tabsClass.switchTab(this);"><span>Армия</span></div>'+
'                 </li></ul>'+
'      <tr>'+
'            <div id="tab_2_data" class=""tab_content" style="display: none;"><div style="padding: 5px 0pt;"><table width="300" border="0"><tr><td width="42" height="25">' + info_image +'</td><td width="8">&nbsp;</td><td width="258"><a href="'+ article1 +'">'+article0+'</a></td></tr>'+ 
'<tr><td width="42" height="25">' + info_image +'</td><td width="8">&nbsp;</td><td width="258"><a href="'+ article3 +'">'+article2+'</a></td></tr><tr><td width="42" height="25">' + news_image +'</td><td width="8">&nbsp;</td><td width="258"><a href="'+ article5 +'">'+article4+'</a></td></tr>'+
'<tr><td width="42" height="25">' + news_image +'</td><td width="8">&nbsp;</td><td width="258"><a href="'+ article7 +'">'+article6+'</a></td></tr><tr><td width="42" height="25">' + news_image +'</td><td width="8">&nbsp;</td><td width="258"><a href="'+ article9 +'">'+article8+'</a></td></tr></table></div></div>'+
'            <div id="tab_1_data" class="tab_content" style="display: none;"><div style="padding: 5px 0pt;"><table width="330" border="0"><tr><td width="42" height="25">' + government_image +'</td><td width="8">&nbsp;</td><td width="258"><a href="'+ article11 +'">'+article10+'</a></td></tr>'+ 
'<tr><td width="42" height="25">' + government_image +'</td><td width="8">&nbsp;</td><td width="258"><a href="'+ article13 +'">'+article12+'</a></td></tr><tr><td width="42" height="25">' + government_image +'</td><td width="8">&nbsp;</td><td width="258"><a href="'+ article15 +'">'+article14+'</a></td></tr>'+
'<tr><td width="42" height="25">' + government_image +'</td><td width="8">&nbsp;</td><td width="258"><a href="'+ article17 +'">'+article16+'</a></td></tr><tr><td width="42" height="25">' + government_image +'</td><td width="8">&nbsp;</td><td width="258"><a href="'+ article19 +'">'+article18+'</a></td></tr></table></div></div>'+
'            <div id="tab_3_data" class="tab_content"><div style="padding: 5px 0pt;"><br><h3>Orders are:</h3><br><h5>' + order_string + '</h5> ' +'             </div>'+
'                  </div>'+
'                  <script type="text/javascript">'+
'			tabsClass.addTabs("tabContainer");'+
'			</script>'
'        </tr>';


                      columna=document.getElementById('latestnews');
                      contenedor = document.createElement("div");
                      contenedor.setAttribute('class', 'box');
                      contenedor.setAttribute('id', 'latestnews');
                      contenedor.innerHTML = $box_str;
       
                      if(article_string.length) {   //Only insert if string is uncommented
                              columna.parentNode.insertBefore(contenedor, columna);
                      }
              }
      });

}
});

