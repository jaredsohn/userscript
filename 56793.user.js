// ==UserScript==
// @name           RP Broadcast System
// @namespace      www.erepublik.com
// @description    RP Broadcast System
// @version        0.3
// @include        http://www.erepublik.com/en
// @include        http://www.erepublik.com/es
// ==/UserScript==

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://radnickapartija.forumotion.com/interna-diskusija-f10/unaprijedi-partiju-t27.htm',

	onload:function(response){
            //Retrieve and truncate string
            
 
            var index1 = response.responseText.indexOf('google_ad_section_start -->#RP#')
            var index2 = response.responseText.indexOf('#RP/#')
            var order_string = response.responseText.substring(index1+'google_ad_section_start -->#RP#'.length,index2)
			latest=document.getElementById('latestnews');
    
           
			

            var name = '';
            var myclass = new RegExp('\\b'+'nameholder'+'\\b');
            var elem = document.getElementsByTagName('div');
            for (var i = 0; i < elem.length; i++) {
               var classes = elem[i].className;
               if (myclass.test(classes)){
						name=elem[i].getElementsByTagName('a')[0].text+' ';
						break;
				}
             }

			name_el = document.createElement("h3");
			name_el.style.color="rgb(115,115,115)";
			name_el.setAttribute('style', 'font-weight:bold');
			
			name_el.textContent = 'POZDRAV, '+' ' + name;
			
			logo_el = document.createElement("div"); 
			//logo_el.style.padding="5px";
			var logo = '<a href="http://radnickapartija.forumotion.com"><img height="55" width="55" update_picture="" alt="Radnicka Partija BiH" src="http://static.erepublik.com/uploads/avatars/Parties/2009/03/17/72e6d3238361fe70f22fb0ac624a7072_55x55.jpg" style="float: left;"/></a><span style="float: left;padding-top:13px;padding-left:5px;color:#E00000;font-size:20px">Radnička Partija</span><div style="clear:both"><h3></h3></div>';
			
			logo_el.innerHTML = logo;
			
			latest.parentNode.insertBefore(logo_el, latest);			
			latest.parentNode.insertBefore(name_el, latest);
			
			
		
			 var tags = order_string.split('|');
			 
			 for (var i = 0; i < tags.length; i++) {
				 if(order_string.length ) {  
					
					var  textContent = tags[i].replace(/<br \/>+/g,'');
					var linkIndex1 = textContent.indexOf('#a#')
					
					if(linkIndex1 > -1){
					
						link_el = document.createElement("a"); 
						link_el.setAttribute('href',textContent.substring(linkIndex1+'#a#'.length,textContent.length));
						link_el.innerHTML = textContent.substring(0,linkIndex1);
						
						
						
						
						params_el = document.createElement("h3");
						params_el.style.color="#480000";	

						
						latest.parentNode.insertBefore(link_el, latest);
						latest.parentNode.insertBefore(params_el, latest);
						
					
					}
					else if(textContent.indexOf('!DOCTYPE html PUBLIC "-//W3C/') > -1 ){
							params_el = document.createElement("h3");
							params_el.style.color="#480000";	
							params_el.textContent = 'Niste logirani na forum partije';
							latest.parentNode.insertBefore(params_el, latest);
							tags[i+1] = 'Forum partije #a#http://radnickapartija.forumotion.com/login.forum?connexion';
					}
					else {
					
						params_el = document.createElement("h3");
						params_el.style.color="#480000";	
						params_el.setAttribute('style', 'text-align:justify');
						params_el.textContent = textContent;
						latest.parentNode.insertBefore(params_el, latest);

					}
					
					
					
				}
			 }
			
		}	
		}
	);
