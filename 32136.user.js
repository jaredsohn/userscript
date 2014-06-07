// ==UserScript==
// @name           crewbux
// @namespace      crewbux
// @include        http://www.crewbux.com/surf_banners.php
// ==/UserScript==

var mywindow;
var bodybefore;
var adfound;

var reloading = 0;

	function setTimers(){
		// Calcula cada cuantos segundos debe actualizar cada contador de recursos restantes para 
		// aprovechar el temporizador del resto de relojes
		
	
		MyInt1 = setInterval(function () {
			timena = document.body.innerHTML.substring(0,document.body.innerHTML.search(/Sec/));
			if (adfound)
			{
				var aaq = mywindow.document.forms.namedItem('frm');
				var ccq = aaq.elements.namedItem('clock').value;
			}
			else
			{
				ccq = 'Done';
			}
			if (ccq == 'Done')
			{
				timena = timena - 1; 
			}
			else
			{
				timena = parseInt(ccq) + 10; 
			}
			
			document.body.innerHTML = timena + " Sec " + ccq + " << " + bodybefore;
			if (parseInt(timena)<0)
			{ 
				if (reloading==0)
				{
				   document.location.href = document.location.href;
				}
				reloading=1;
			}
		},1000);
	}




if (document.location.href.search(/surf_banners.php/) >=0)
{
	bodybefore = document.body.innerHTML; 
	document.body.innerHTML = "60 Sec" + document.body.innerHTML;
	if (document.body.innerHTML.search(/view.php/)>=0)
	{
		var boxtourl = document.body.innerHTML.substring(document.body.innerHTML.search(/view.php/));
		boxtourl = boxtourl.substring(0,boxtourl.search(/"/));
		mywindow = window.open (boxtourl, 'test');
		adfound=true;
	}
	else
	{
		adfound=false;
	}
	
	setTimers();
}

