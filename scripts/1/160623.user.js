// ==UserScript==
// @name        JVC Rang Preview
// @namespace   jvcRangsPreview
// @description NPlay
// @include     http://www.jeuxvideo.com/profil/*.html
// @include     http://www1.jeuxvideo.com/profil/*.html
// @version     1
// ==/UserScript==


(function(){

	function formatNumber(num) {
		return num > 999 ? (num*1e-3).toFixed(3) : num;
	}
	
	function cleanNumber(num) {
		return num.replace('.','');
	}
	
	
	
	
	
	var rangs = ['carton','bronze','argent','or','rubis','saphir','emeraude','diamant'];
	var posts = [0,50,200,1000,10000,30000,75000,150000];
	var pseudo = {};
	
	
	
	
	
	for(var i in rangs)
	{
		if(document.body.className.split(' ')[0] === rangs[i])
			break;
	}
	i = parseInt(i);
	
	
	
	
	
	pseudo.rang = rangs[i];
	pseudo.post = cleanNumber(document.getElementById('td_pts').getElementsByTagName('strong')[0].innerHTML);
	

	
	
	
	
	document.onkeydown = function(e){

		e = e.keyCode || event.keyCode;

		if(e===39 || e===37)
		{
		
			i = ((i+e-38) >-1 && (i+e-38) < rangs.length ) ? i+e-38 : i;
			
			document.body.className = rangs[i];
			
			if(document.getElementById('prang')!==null)
			{
				document.getElementById('prang').style.display = i+1===rangs.length ? 'none' : 'block';
				if(i!==rangs.length-1)
				{
					document.getElementById('prang').getElementsByTagName('strong')[0].innerHTML = formatNumber(posts[i+1]-posts[i])+' points';
					document.getElementById('prang').getElementsByTagName('strong')[1].innerHTML = '"'+rangs[i+1].toUpperCase()+'"';
				}
				
			}
			if(document.getElementById('pniv')!==null)
			{
				document.getElementById('pniv').style.display = i+1===rangs.length ? 'none' : 'block';
			}
			
			document.getElementById('td_rang').getElementsByTagName('strong')[0].innerHTML = rangs[i].toUpperCase();
			document.getElementById('td_pts').getElementsByTagName('strong')[0].innerHTML = formatNumber(posts[i]);
			
			
			
			return false;
		}
	}
	
	
	
	
	if(document.getElementById('msg_visible') !== null && location.host === 'www.jeuxvideo.com')
	{
		var newtab = document.createElement('li');
		var lien = document.createElement('a');
		var text = document.createTextNode('Vue extérieure');
		
		lien.href = '#';
		lien.appendChild(text);
		lien.onclick = function(e){e.preventDefault();location.href=location.href.replace('http://www.','http://www1.')}
		
		newtab.appendChild(lien);
		
		document.getElementById('onglets').insertBefore(newtab,document.getElementById('o_moncompte'));
	}
	
	
	
	
	
	
	
	
})()