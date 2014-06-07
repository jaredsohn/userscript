// ==UserScript==
// @name           Rozkazy MON na stronie glownej
// @namespace      erepublik.com
// @include        http://www.erepublik.com/pl
// @include        http://www.erepublik.com/en
// ==/UserScript==


        var ordersDiv = document.createElement('div');
        ordersDiv.className = 'box';
		ordersDiv.style.marginTop = '0px';
        ordersDiv.innerHTML = 
		
		"<h1 class='sIFR-replaced'>"+
			"<embed width='250' height='28' src='http://www.erepublik.com/flash/delicious.swf' quality='best' flashvars='txt=Rozkazy&amp;&amp;textcolor=#737373&amp;hovercolor=null&amp;linkcolor=null&amp;w=250&amp;h=28' wmode='transparent' bgcolor='transparent' sifr='true' type='application/x-shockwave-flash' class='sIFR-flash' style='width: 250px; height: 28px;'><span class='sIFR-alternate'>Rozkazy</span>"+
		
		"</h1>"+
		
		
		"<object width='330' height='330'>" +
				"<param name='movie' value='http://blip.pl/widget.swf' />" +
				"<param name='wmode' value='transparent' />" +
				"<param name='flashvars' value='blip_user=ministerobronynarodowej&color_scheme=mojageneracja-blue&corner_radius=12&'>" +
			"<embed src='http://blip.pl/widget.swf' wmode='transparent' width='330' height='330' flashvars='blip_user=ministerobronynarodowej&color_scheme=mojageneracja-blue&corner_radius=6&' type='application/x-shockwave-flash' />" +
			
			"</object>";
	   
	   shouts = document.getElementById('shouts');
       shouts.parentNode.insertBefore(ordersDiv, shouts);