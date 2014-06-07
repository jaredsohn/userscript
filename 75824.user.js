// ==UserScript==
// @name           iViewMonkey
// @namespace      iViewMonkey
// @description    Helps you download from iView with rtmpdump in OSX
// @include        http://www.abc.net.au/iview/*
// ==/UserScript==

var iViewFox = {
		hashReg:new RegExp(/http:\/\/www.abc.net.au\/iview\/#\/view\/[0-9]{6}/),
		seriesIndex:null,
		init:function(){
			if(document.location.href.match(iViewFox.hashReg)){
				GM_xmlhttpRequest({
					method:"GET",
					url:"http://173.230.146.115/iview/api/?seriesIndex",
					onload:function(response) {
						var rT = response.responseText;
						iViewFox.seriesIndex=JSON.parse(rT);
						var locSplit=document.location.href.split('#/view/');
						iViewFox.findEpDetails(locSplit[1]);
						document.location.href=locSplit[0]+'#';							     
					},
					onerror:function(eResponse){
						console.log('error'+eResponse);
					}
				});	
			}
		},
		findEpDetails:function(epNumber){
			iViewFox.seriesIndex.forEach(function(item, index, array){
				var seriesNumber=item[0];
				item[5].forEach(function(item, index, array){
					if(item[0]==epNumber){
						GM_xmlhttpRequest({
							method:"GET",
							url:'http://173.230.146.115/iview/api/?series='+seriesNumber,
							onload:function(response) {
								var rT = response.responseText;
								var jPar=JSON.parse(rT);
								if(jPar[0][5]){
									jPar[0][5].forEach(function(item, index, array){
										if(item[0] == epNumber){
											iViewFox.handshake(item[13]);								
										}
									});
								}							     
							},
							onerror:function(eResponse){
								console.log('error'+eResponse);
							}
						});
					}
				});
			});
		
		},
		handshake:function(epDS){
			GM_xmlhttpRequest({
				method:"GET",
				url:'http://www2b.abc.net.au/iView/Services/iViewHandshaker.asmx/isp',
				onload:function(response) {
					var rT = response.responseText;
					var x= new DOMParser().parseFromString(rT, "text/xml");
					var xStore={};
					[].forEach.call(x.querySelectorAll('*'),function(item,index,array){xStore[item.nodeName]=item.textContent;});
					iViewFox.grabEpisode(epDS, xStore);							     
				},
				onerror:function(eResponse){
					console.log('error'+eResponse);
				}
			});
		},
		grabEpisode:function(epDS, xStore){
			var args ={
				'rtmpdump':'"Desktop/iViewDownloads/rtmpdump/rtmpdump"',
				'-r':'"rtmp://cp53909.edgefcs.net////flash/playback/_definst_/'+epDS+'"',
				'-a':'"ondemand?auth='+xStore.token+'"',
				'-o':'"Desktop/iViewDownloads/'+epDS+'"',
				'-W':'"http://www.abc.net.au/iview/images/iview.jpg"'
				};
			var fTypeSplit = epDS.split('.');
			if(xStore.host=='Hostworks'){
				var fileEx;
				if(fTypeSplit[1]=='mp4'){
					fileEx='mp4:';
				}
				else{
					fileEx='flv:';
				}

				args['-r']='"rtmp://203.18.195.10/"';
				args['-y']='"'+fileEx+fTypeSplit[0]+'"';
			}
			var divOverlay = document.createElement('div');
			divOverlay.setAttribute('style','position:absolute;z-index:101;color:black;padding:20px;font-size:20px;'+
									'width:400px;height:350px;background-color:white;border:3px solid grey;top:100px;');
			divOverlay.style.left=((document.width-400)/2)+'px';

			var p = document.createElement('p');
			p.innerHTML='<strong>Copy and paste the text below into the terminal</strong>';
			divOverlay.appendChild(p);
			
			var preel = document.createElement('pre');
			preel.setAttribute('style','background-color:beige;padding:5px;white-space:pre-wrap;overflow:auto;');
			var preText='';
			for(var i in args){
				if(i=='rtmpdump'){
					preText+=args[i]+' ';
				}
				else{
					preText+=i+' '+args[i]+' ';
				}
			}
			preel.textContent=preText;
			divOverlay.appendChild(preel);

			var closeA = document.createElement('a');
			closeA.href='#';
			closeA.textContent='Close';
			closeA.setAttribute('style','float:right;');
			closeA.addEventListener('click',function(e){
				document.getElementById('website').style.display='block';
				document.body.removeChild(divOverlay);
			}, false);
			divOverlay.appendChild(closeA);
			document.getElementById('website').style.display='none';
			document.body.insertBefore(divOverlay, document.body.firstElementChild);
		}
};
window.addEventListener('hashchange',function(e){
	iViewFox.init();
},false);
iViewFox.init();
