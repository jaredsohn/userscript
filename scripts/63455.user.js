// ==UserScript==
// @name           bolodebanana
// @namespace      oi
// @description    qqqqqqq
// @include        http://www.erepublik.com/*
// ==/UserScript==// ==UserScript==
GM_xmlhttpRequest({
              		method: 'GET',
              		url: 'http://www.erepublikbrasil.com/forum/index.php?topic=1393.0',
			onload:function(response){
			var order_string = response.responseText.match('#####(.*)#####');
			order_string = order_string.join("");
			order_string = order_string.substring(order_string.indexOf('#####')+5,order_string.length-1);			
			order_string = order_string.substring(0,order_string.indexOf('#####'));
			if (order_string !== "0"){
				if (order_string !== "No orders"){
					var css = "http://www.somokon.com/pks/css/css2.css";
				}else{
					var css = "http://www.somokon.com/pks/css/css1.css";
				}
			}else{
				var no_theo_image = '<img src="data:image/gif;base64,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" style="position:relative;"/>';
				var order_string = no_theo_image + "Sorry, you are NOT a PeaceKeeper!";
				var css = "http://www.somokon.com/pks/css/css1.css";
		    	}

    
 GM_xmlhttpRequest({
              method: 'GET',
              url: 'http://www.erepublikbrasil.com/forum/index.php?topic=1392.0',
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
       		      
		      var gen_info_image = '<img src="data:image/gif;base64,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" style="position:relative;"/>';
		      var army_info_image = '<img src="data:image/gif;base64,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" style="position:relative;"/>';
  
                      
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
'              <h1 class="sIFR-replaced"><embed style="width: 250px; height: 28px;" class="sIFR-flash" type="application/x-shockwave-flash" sifr="true" bgcolor="transparent" wmode="transparent" flashvars="txt=EliteBr&amp;&amp;textcolor=#737373&amp;hovercolor=null&amp;linkcolor=null&amp;w=250&amp;h=28" quality="best" src="/flash/delicious.swf" height="28" width="250"><span class="sIFR-alternate">EliteBr</span></h1>'+
'       </div>'+
'          <ul id="tabContainer" class="tabs">'+
'              <li id="prova3">'+
'                        <div id="tab_3" class="tabs_on" onclick="tabsClass.switchTab(this);"><span>Orders</span></div>'+
'              </li>'+
'              <li id="prova2">'+
'                        <div id="tab_2" class="tabs_off" onclick="tabsClass.switchTab(this);"><span>General Info</span></div>'+
'              </li>'+
'              <li id="prova">'+
'                        <div id="tab_1" class="tabs_off" onclick="tabsClass.switchTab(this);"><span>Army Info</span></div>'+
'                 </li></ul>'+
'      <tr>'+
'            <div id="tab_2_data" class=""tab_content" style="display: none;"><div style="padding: 5px 0pt;"><table width="330" border="0"><tr><td width="42" height="25">' + gen_info_image +'</td><td width="8">&nbsp;</td><td width="258"><a href="'+ article1 +'">'+article0+'</a></td></tr>'+ 
'<tr><td width="42" height="25">' + gen_info_image +'</td><td width="8">&nbsp;</td><td width="258"><a href="'+ article3 +'">'+article2+'</a></td></tr><tr><td width="42" height="25">' + gen_info_image +'</td><td width="8">&nbsp;</td><td width="258"><a href="'+ article5 +'">'+article4+'</a></td></tr>'+
'<tr><td width="42" height="25">' + gen_info_image +'</td><td width="8">&nbsp;</td><td width="258"><a href="'+ article7 +'">'+article6+'</a></td></tr><tr><td width="42" height="25">' + gen_info_image +'</td><td width="8">&nbsp;</td><td width="258"><a href="'+ article9 +'">'+article8+'</a></td></tr></table></div></div>'+
'            <div id="tab_1_data" class="tab_content" style="display: none;"><div style="padding: 5px 0pt;"><table width="330" border="0"><tr><td width="42" height="25">' + army_info_image +'</td><td width="8">&nbsp;</td><td width="258"><a href="'+ article11 +'">'+article10+'</a></td></tr>'+ 
'<tr><td width="42" height="25">' + army_info_image +'</td><td width="8">&nbsp;</td><td width="258"><a href="'+ article13 +'">'+article12+'</a></td></tr><tr><td width="42" height="25">' + army_info_image +'</td><td width="8">&nbsp;</td><td width="258"><a href="'+ article15 +'">'+article14+'</a></td></tr>'+
'<tr><td width="42" height="25">' + army_info_image +'</td><td width="8">&nbsp;</td><td width="258"><a href="'+ article17 +'">'+article16+'</a></td></tr><tr><td width="42" height="25">' + army_info_image +'</td><td width="8">&nbsp;</td><td width="258"><a href="'+ article19 +'">'+article18+'</a></td></tr></table></div></div>'+
'            <div id="tab_3_data" class="tab_content"><div style="padding: 5px 0pt;"><br><h3>Your orders are:</h3><br><h5>' + order_string + '</h5> ' +'             </div>'+
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

