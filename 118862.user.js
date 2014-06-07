// ==UserScript==
// @name           Conferma Cuochi
// @namespace      by matteo466
// @description    Chiede conferma prima di inviare un attacco, occupazione, difendi citt�, schiera truppe senza cuochi
// @include        http://s*.*.ikariam.com/index.php?view=plunder&destinationCityId=*
// @include        http://s*.*.ikariam.com/index.php?view=occupy&destinationCityId=*
// @include        http://s*.*.ikariam.com/index.php?view=defendCity&destinationCityId=*
// @include        http://s*.*.ikariam.com/index.php?view=deployment&deploymentType=army&destinationCityId=*
// ==/UserScript==
var script = document.createElement('script'); 
script.type = "text/javascript"; 
script.innerHTML = (<><![CDATA[
	pagina=document.body.id;
	if (pagina=='deployment' || pagina=='defendCity'){
		selectArmy=document.getElementById('selectArmy');
		centerButton=selectArmy.getElementsByClassName('centerButton')[0];
		input=centerButton.getElementsByTagName('input')[0];
		input.onclick=function(){
			cuochi_input=document.getElementById('cargo_army_310');
			if(cuochi_input==null || cuochi_input.value==0 || isNaN(cuochi_input.value))
				return confirm('Non stai mandando cuochi\nVuoi continuare comunque?');
			return true;
		}
	}
	if(pagina=='plunder' || pagina=='occupy'){
		plunderbutton=document.getElementById('plunderbutton');
		plunderbutton.onclick=function (){
			cuochi_input=document.getElementById('cargo_army_310');
			if(cuochi_input==null || cuochi_input.value==0 || isNaN(cuochi_input.value)){
				if (confirm('Non stai mandando cuochi\nVuoi continuare comunque?'))	
					Dom.get('plunderForm').submit();
			}
			else
				Dom.get('plunderForm').submit();
		};
	}
]]></>).toString();
document.getElementsByTagName('head')[0].appendChild(script);