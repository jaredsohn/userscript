// ==UserScript==
// @name           test
// @namespace      Test123
// @include        http://s2.kingsage.nl/*
// ==/UserScript==

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
		info = "";
		//183
		for(i=1;i<100;i++)
		{
			temp = $("a:eq("+i+")").attr("onmouseover");
			if(temp != undefined)
			{
				temp = temp.toString();
				//pak alles tussen tooltipDetails( en ), PADDING
				stripped = temp.match("tooltipDetails\(\(.*\)\)\, PADDING");
				
				//verwijderd haakjes aan begin en einde)
				stripped2 = stripped[1].substring(1, stripped[1].length-1)
				
				eval("sendData("+stripped2+")");
				
				//sendData(5213, "b-boys Nederzetting (566|549) K55", "2.180", "b-boy (2.180 Punten)", "Cafe The Hood (18.200 Punten)", "100%", "", "561.553.566.549", "", "", "", "");
				
				info += stripped2;
			}
		}
	
		if(info != "")
		{
			//alert("\n\n"+info);
		}
		
		
    }
	function sendData(townId, townNameCoordsSection, points, playernamePoints, alliantie, moraal, dunno5, coords, dunno1, dunno2, dunno3, dunno4)
	{			
			$.ajax({
				type: "GET",
				cache: false,
				url: "http://fabian.icebox.nl/koa.php",
				data: "ajax=1&townNameCoordsSection="+townNameCoordsSection+"&points="+points+"&townId="+townId+"&playernamePoints="+playernamePoints+"&dunno5="+dunno5+"&moraal="+moraal+"&alliantie="+alliantie+"&coords="+coords+"&dunno1="+dunno1+"&dunno2="+dunno2+"&dunno3="+dunno3+"&dunno4="+dunno4,
				success: function(msg){alert(msg)}
			});
	}