// ==UserScript==
// @name           Photobucket WebURL Uploader Script
// @namespace      userscripts.org
// @description    Photobucket WebURL Uploader Script
// @include        *
// ==/UserScript==

(function() {

	var grabBod = document.getElementsByTagName('body')[0];
  
	var rClickBox = document.createElement('div');
	rClickBox.setAttribute('style','position:absolute;background-color:grey;border:2px solid black;height:200px;width:100px;');
	
	var c = document.createElement('a');
	c.textContent = 'Close';
	c.href ='#';
	c.setAttribute('style','float:right;color:blue;padding:5px;');
	rClickBox.appendChild(c);
	c.addEventListener('click', function(e) {

			rClickBox.parentNode.removeChild(rClickBox);
				
		}, false); 	
	
	var py = document.createElement('p');
	py.textContent = 'Save to photobucket account';
	rClickBox.appendChild(py);
	
	/*var inp = document.createElement('input');
	inp.setAttribute('type', 'textbox');
	rClickBox.appendChild(inp);		*/
	
	var sav = document.createElement('button');
	sav.textContent = 'Save';
	sav.setAttribute('style','float:left;');
	py.appendChild(sav);
  
	document.addEventListener('mouseup', function(e) {

		if(e.which==3){
			
			if(e.target.tagName == 'IMG'){
			
				rClickBox.style.left = ''+e.pageX-115+'px';
				rClickBox.style.top = ''+e.pageY+'px';
			
				grabBod.appendChild(rClickBox);

				var imgsrc = e.target.src;
				
				sav.addEventListener('mouseup', function(evnt) {

					function gotoPB(){
				
						var u = 'http://photobucket.com';
					
						if(GM_getValue('photobucketurl')){
						
							u = GM_getValue('photobucketurl')+'?action=uploadweb&the_web='+imgsrc+'&json=1';
						
						}

						GM_xmlhttpRequest({
							method: 'GET',
							url: u,
							headers: {
								'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
								'Accept': 'application/atom+xml,application/xml,text/xml',
							},
							onload: function(responseDetails) {
							
								var rt = responseDetails.responseText;
							
								//var responseHolder = document.createElement('div');
								//responseHolder.innerHTML = rt;

								if(rt.indexOf('{"response":{"stat":"')>-1){
								
									var jsonRT = eval('(' + rt + ')');

									if(jsonRT.response.stat == 'ok'){
								
										//inp.value = GM_getValue('photobucketurl')+jsonRT.response.filename;
										
										var plinkResponse = document.createElement('a');
										plinkResponse.textContent = 'Your Photobucket Picture';
										plinkResponse.href=GM_getValue('photobucketurl')+jsonRT.response.filename;
										rClickBox.appendChild(plinkResponse);
										
									}
									else{
									
										var ajError = document.createElement('p');
										ajError.setAttribute('style', 'color:red;');
										ajError.textContent = 'summin broke  :'+rt;
										rClickBox.appendChild(ajError);										
									
									}
																		
								}	
								else if(rt.indexOf('id="welcomeUser"')>-1){
									
									var pbU = rt.split('" id="welcomeUser"')[0].split('class="header_group_item" href="')[1];
									
									GM_setValue('photobucketurl', ''+pbU+'');
									
									gotoPB();

								}									
								else{
								
									var ajError = document.createElement('p');
									ajError.setAttribute('style', 'color:red;');
									ajError.textContent = 'Error: you are not logged in.';
									rClickBox.appendChild(ajError);											
								
								}									
								
							},
							onerror: function(responseDetails){
							
								var ajError2 = document.createElement('p');
								ajError2.setAttribute('style', 'color:red;');
								ajError2.textContent = 'summin broke  :'+responseDetails.responseText;
								rClickBox.appendChild(ajError2);
							
							
							}
						});
						
					}	
					
					gotoPB();
					
					sav.parentNode.removeChild(sav);
								
				}, false); 	
			
			}
		
		}

				
	}, false);  
  
 })();