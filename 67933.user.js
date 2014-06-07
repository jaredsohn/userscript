// ==UserScript==
// @name           Gmail Signatures
// @namespace      http*://mail.google.com*
// @description    Añade automaticamente una firma a gmail
// @include        http*://mail.google.com*
// ==/UserScript==
window.__nav;
window.__lastlocation;
function click_element(e){var v=document.createEvent("MouseEvents");v.initMouseEvent("click",true,true,document.defaultView,1,0,0,0,0,false,false,false,false,0,null);e.dispatchEvent(v);return;}
window.__change = function(data){

	try{
		var canvasWindow = unsafeWindow.document.getElementById("canvas_frame").contentWindow;

		if( data == "#compose" && data != __lastlocation ){
			var composeWindow = canvasWindow.document.getElementsByTagName('iframe')[0].contentWindow;
			var composeBody = composeWindow.document.body;
			var currentValue = ( composeBody.innerHTML ) ? composeBody.innerHTML : "";
		
			currentSignature = GM_getValue('gmail_default_signature' );
			composeBody.innerHTML = currentSignature + currentValue;
		}



		if( data == "#settings/accounts" ){
			if( __nav ){
				window.setTimeout(function(){
					try{
						__nav = false;

						var links=canvasWindow.document.evaluate(".//span[contains(.,'Comprobar si tengo correo ahora')]",canvasWindow.document,null,4,null);

						while(link=links.iterateNext())

						{

							click_element(link);

						}

						top.location.href='./#inbox';
					}catch(e){}
				},1400);
			}

		}
	


		if( data == "#inbox" ){
				var divs = canvasWindow.document.evaluate(".//div[contains(.,'Actualizar') and @act='20']",canvasWindow.document,null,6,null);
				i=0;
				while(thediv=divs.snapshotItem(i++)){

					if(thediv.added)return;

					thediv.added=true;

					//POP

					var divPOP3=document.createElement('span');

					divPOP3.className='goog-inline-block';

					var divPOP3_2=document.createElement('span');

					divPOP3_2.className='AP';

					divPOP3_2.appendChild(document.createTextNode('Actualizar POP3'));

					divPOP3.appendChild(divPOP3_2);

					divPOP3_2.addEventListener('click',function(){

						top.location.href='./#settings/accounts';

						__nav = data;

						return;

					},false);
					thediv.parentNode.parentNode.appendChild(divPOP3);


					//FIRMAS
					var div=document.createElement('span');

					div.className='goog-inline-block';

					var div2=document.createElement('span');

					div2.className='AP';

					div2.appendChild(document.createTextNode('Definir firma'));

					div.appendChild(div2);
					div.addEventListener('click',function(){

						var floatDiv = document.createElement("div");
							floatDiv.style.border = "1px solid lightBlue";
							floatDiv.style.position = "absolute";
							floatDiv.style.top = "10px";
							floatDiv.style.right = "30px";
							floatDiv.style.width = "480px";
							floatDiv.style.backgroundColor = "#fff";
						
						var closeDiv = document.createElement("div");
							closeDiv.style.backgroundColor = "lightBlue";
							closeDiv.style.padding = "4px";
							closeDiv.style.cursor = "pointer";
							closeDiv.innerHTML = "Cerrar";
							closeDiv.addEventListener('click',function(){
								unsafeWindow.document.body.removeChild(floatDiv);
							},false);
							floatDiv.appendChild(closeDiv);

						var containerDiv = document.createElement('div');
							containerDiv.style.padding = "10px";
							floatDiv.appendChild(containerDiv);

						currentSignature = GM_getValue('gmail_default_signature' );
						var textArea = document.createElement('textarea');
							textArea.style.width = "98%";
							textArea.style.height = "120px";
							textArea.style.fontSize = "12px";
							textArea.style.padding = "2px";
							textArea.style.border = "1px solid lightBlue";
							textArea.style.fontFamily = "sans-serif";
							textArea.value = currentSignature;
							textArea.addEventListener('keyup',function(){
								divPreview.innerHTML = textArea.value;
							}, false);
							containerDiv.appendChild(textArea);

						var divPreview = document.createElement("div");
							divPreview.style.margin = "10px 0";
							divPreview.style.borderTop = "1px solid lightBlue";
							divPreview.style.padding = "4px 0 0 0";
							divPreview.innerHTML = currentSignature;

						var buttonSave = document.createElement('button');
							buttonSave.style.margin = "4px 0 0 0";
							buttonSave.innerHTML = "Guardar Firma";
							buttonSave.addEventListener('click',function(){
								var value = textArea.value;
								GM_setValue('gmail_default_signature', value );
								unsafeWindow.document.body.removeChild(floatDiv);
								return;
							},false);
							containerDiv.appendChild(buttonSave);
					
						var buttonPreview = document.createElement('button');
							buttonPreview.style.margin = "4px 0 0 0";
							buttonPreview.innerHTML = "Previsualizar";
							buttonPreview.addEventListener('click',function(){
								divPreview.innerHTML = textArea.value;
								return;
							},false);
							containerDiv.appendChild(buttonPreview);
					
							containerDiv.appendChild(divPreview);

						unsafeWindow.document.body.appendChild(floatDiv);
						return;

					},false);
					thediv.parentNode.parentNode.appendChild(div);
				}
		}


		if( (data.indexOf("#all/") != -1 || data.indexOf("#drafts/") != -1)  && data != __lastlocation  ){
			if( data.indexOf("#drafts/") != -1 && __lastlocation == "#compose" ){

			} else {
				try{
					var writableSearch = window.setInterval(function(){
						var writable = canvasWindow.document.querySelector("div.fN");

						if( writable ){
							var composeWindow = canvasWindow.document.getElementsByTagName('iframe')[0].contentWindow;
							var composeBody = composeWindow.document.body;
							var currentValue = ( composeBody.innerHTML ) ? composeBody.innerHTML : "";
							var stringControl = '<!-- FIRMA -->';
							if( currentValue.indexOf(stringControl) != 0 ){
								currentSignature = stringControl + GM_getValue('gmail_default_signature' );
								composeBody.innerHTML = currentSignature + currentValue;
							}
						}
					},1000);
				}catch(e){  }
			}
		} else {
			if( writableSearch ){
				clearInterval(writableSearch);
			}
		}


	} catch(e){ 
		//alert(e); 
	}

	__lastlocation = data;
};
window.__check = function(){
	try{
		if( unsafeWindow.__hash != unsafeWindow.location.hash ){
			unsafeWindow.__hash = unsafeWindow.location.hash;
			__change( unsafeWindow.__hash );
		}
	}catch(e){};
};
window.__iniciar = function(){
	try{
		if( unsafeWindow.gmonkey ){
			try{
				if( document.getElementById("canvas_frame") ){
					unsafeWindow.__hash = "";
					
					window.setInterval( function(){ __check(unsafeWindow);}, 1000 );
				}
			}catch(e){};	
		} else {
			window.setTimeout( __iniciar, 2400 );
		}

	}catch(e){  };
};
document.addEventListener("load", function(){
	window.setTimeout(function(){
		__iniciar();
	}, 1000);
}, true);

