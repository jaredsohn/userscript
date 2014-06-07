// version 1.0.0 
// 28/10/2010
// ==UserScript==
// @name          Riduci.Unita.max
// @include       http://vendetta-plus.com/*
// @include       http://www.vendetta-plus.com/*
// ==/UserScript==			
			//Elimina banner
			var logo = document.getElementById("logo");
			logo.style.display = "none";
			var risorse = document.getElementById("barraRecursos");
			risorse.style.top = "35px";
			//Elimina truppe inutili
			if (location.pathname.search('reclutamiento') != -1) {
			var divUnita = document.getElementsByTagName("div");
			lunghezza = divUnita.length;
			var temp = 0;
			for (i =0; i<lunghezza-1; i++) {
				if ((divUnita[i].getAttribute("class") == "left") && (divUnita[i].innerHTML.search("Espia") == -1) && (divUnita[i].innerHTML.search("Transportista") == -1) &&(divUnita[i].innerHTML.search("Mercenario") == -1)) {
				divUnita[i].style.display = "none";
				divUnita[i+3].style.display = "none";
				if (divUnita[i].innerHTML.search("Maton") != -1) { temp = i }
				
			}
			else {
			if (divUnita[i].getAttribute("class") == "left") {
				divUnita[i+1].style.display = "none";
			         }
			       }
			     }
			divUnita[temp-2].innerHTML = divUnita[temp-2].innerHTML.replace(/<br>/g,"");
		        }
			document.body.innerHTML.replace("<br />","");

			
			var max=document.getElementsByName("crear");
			for(i=0;i<max.length;i++)
				{
					newDiv = document.createElement("div");
					newDiv.innerHTML = '<input id="max" value="MAX" type="button" >'; 
					var parentDiv = max[i].parentNode;
					parentDiv.insertBefore(newDiv, max[i]);
					newDiv.addEventListener("click", function (event) {
					//prendere le risorse dagli edifici
					arr = document.getElementsByTagName( "td" );
					var Armes,Munictions,Dollars;
					for(var i=0; i < arr.length; i++)
           				 {
                  				  var tagObj = document.getElementsByTagName( "td" ).item(i);
						  var sss=tagObj.innerHTML.split(" ");
						  if(i==0)
						    Armes=sss[0];
						  if(i==1)
						    Munictions=sss[0];
						  if(i==3)
						    Dollars=sss[0];
                        			  //alert(tagObj.innerHTML); 
                       
            				}
					Armes= String(Armes.replace(/\./g, ""));
					Munictions = String(Munictions.replace(/\./g, ""));
					Dollars = String(Dollars.replace(/\./g, ""));
					var couts_armes=80000;
					var couts_munitions=120000;
					var couts_dollars=50000;
					var max_armes=parseInt(Armes)/couts_armes;
					var max_munitions=parseInt(Munictions)/couts_munitions;
					var max_dollars=parseInt(Dollars)/couts_dollars;
				        var maximum=parseInt(Math.floor(Math.min(max_armes,max_munitions,max_dollars)));
					var conta=document.getElementsByName('total').length;
					for(i=0;i<conta;i++)
					document.getElementsByName('total')[i].value=maximum;
                        		}, false);
					
									
		                }
