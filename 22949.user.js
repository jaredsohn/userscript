// ==UserScript==
// @name           Wurzelzeit V0.3
// @namespace      http://userscripts.org
// @description    Zeigt neben den Dekupunkten an, wenn wieder was im Wurzelimperium zu tun ist.
// @include        http://s*.wurzelimperium.de/main.php?page=garden
// @include        http://s*.wurzelimperium.de/menu.php
// ==/UserScript==


  function GetFrameNrByName(Name,Wndw2)
{
	
	for(var i=0 ;i< Wndw2.frames.length;i++){
	   if(Wndw2.frames[i].name == Name) return i;
	}

}

window.addEventListener('load',function () {

				var lasttime = 9999999999;
				var str;
				var src;
				var Werte1; 
				var Werte2;
				var Script1;
				
				//alert("0");
				var Wndw = parent.window;
				if (Wndw){} else{ Wndw = window;}
				Script1=Wndw.frames[GetFrameNrByName('garten',Wndw)].document.getElementsByTagName('SCRIPT');
				src = Script1[0].innerHTML;
				

				Werte1 =  src.match(/, 4 \)\',[-\d]\d\d+[/.\d]\d*/g);
				
				for(var i=0 ;i< Werte1.length;i++){
					Werte2 = parseInt(Werte1[i].substring(7));
					if (lasttime > 	Werte2) lasttime=Werte2;
				}			

				var remains = lasttime/1000;
				var std = Math.floor(remains/3600);
			        if( std.toString().length == 1 ) std = "0"+std.toString();
                               var min = Math.floor((remains%3600)/60);
                                  if( min.toString().length == 1 ) min = "0"+min.toString();				

				
	 			//window.defaultStatus = "Wieder zu tun in " + std+":"+min ;
				var OutText = Wndw.frames[GetFrameNrByName('menuframe',Wndw)].document.getElementById('deko')
				OutText.innerHTML = OutText.innerHTML + "   " + "ZuTun " +  std+":"+min;
 }, true)


