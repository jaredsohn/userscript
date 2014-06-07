// ==UserScript==
// @name           dAS User Stock Check
// @namespace      dAS User Stock Check
// @description    dAS User Stock Check
// @include        http://*.deviantart.com/art/*
// ==/UserScript==

if(unsafeWindow.deviantART.deviant.username!="DeviantArtSecret"){
	var account = unsafeWindow.deviantART.pageData.deviation_artist_username;
	if(document.getElementById('catbutton').parentNode.innerHTML.indexOf('Resources &amp; Stock Images')>-1){
		var secret = document.createElement('span');
		secret.setAttribute("style", "position:absolute; top:-28px;font-size:13px; right:0px; text-align:right;");	
		secret.setAttribute("id", "secret_isstock");					
		document.getElementById('catbutton').parentNode.style.position="relative";
		document.getElementById('catbutton').parentNode.appendChild(secret);
		GM_xmlhttpRequest({
			method:'GET',
			url:'http://deviantartsecret.deviantart.com/journal/',
			onload:function(responseDetails){
			  var data=responseDetails.responseText;
			  datanotuse = data.match(/<div align="center"><br \/><b>Some Stock accounts dont(.*?)know\.(.*?)<\/div>/i)[2];
			  datanotuse=datanotuse.replace(/\s/, '').replace(/<br \/>/g, '').replace(/<br>/g, '').replace(/ href="([^"]*)"/g, '').replace(/<em>(.*?)<\/em>/,'').replace(/<strong>(.*?)<\/strong>/,'').replace(/<b>(.*?)<\/b>/,'').replace(/\((.*?)\)/,'');
			  if(datanotuse.indexOf(account)>-1){
				  document.getElementById('secret_isstock').innerHTML="<font color=red><b><u><i>Do not use for DAS</i></u></b></font></sup>";
				  return; 
			  }
			  data = data.match(/<div align="center"><strong><u>Below(.*?)<\/div>/gi)[0];
			  data=data.substr(data.indexOf('####</b>')+8).replace(/\s/, '').replace(/<span class="shadow-holder">(.*?)<\/span>/g, '[youtube]').replace(/<br \/>/g, '').replace(/ href="([^"]*)"/g, '').replace(/<em>(.*?)<\/em>/,'').replace(/<strong>(.*?)<\/strong>/,'').replace(/\((.*?)\)/,'');
			  datasplit=data.split('</a>');
			  v='';
			  if(data.indexOf(account)>-1){
				  notfound=true;
				  for (var i =0; i<datasplit.length; i++){
					  var stuff = datasplit[i];
					   var user = stuff.substr(stuff.lastIndexOf('>')+1);
					   if(user.toLowerCase()==account.toLowerCase()){
						  notfound=false;
					  	  document.getElementById('secret_isstock').innerHTML="<font color=green><b>Can be used for DAS</b></font></sup>";			
						  return;
					   }
				  }
				  if(notfound){
					  document.getElementById('secret_isstock').innerHTML="<font color=green><b><i>Not listed, can be used</i></b></font></sup>";
				  }
			  } else {
				  document.getElementById('secret_isstock').innerHTML="<font color=green><b><i>Not listed, can be used</i></b></font></sup>";
			  }
			}
		});
	} else {
		// NOT STOCK IMAGE
	}
}