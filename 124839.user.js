// remerciements à shikiryu et sa fonction getGlobal, SpaceFrog pour son aide dans la correction du code.
//
// ==UserScript==
// @name          smileys persos chat.developpez.com
// @namespace     http://rotrevrep.alwaysdata.net
// @description   Adding smileys in http://chat.developpez.com/
// @include       http://chat.developpez.com/
// ==/UserScript==

function getGlobal(callback) {
	
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);
	
}
var lock=0;
function main() {

$("#barreOutils").append('<input onclick="$(\'#zoneSaisie\').val(\'/listsmileys\');envoyerTexte();$(this).hide()" type="button" id="envoyer" class="bouton boutonalt" value="Smileys perso" />');
var isset =0;
var tab = ["http://breizh-team-moto-club.org/images/smilies/smiley007.gif",
"http://www.gifsmaniac.com/gifs-animes/animaux/singes/animaux-singes-55.gif",
"http://www.ihatejillbeach.com/forum/uploads/muggs/2008-06-25_122030_Fozzy.png"];
	function session(){

var listeSmileys = document.getElementsByTagName("div")[43].getElementsByTagName('ul')[0];
var data = '';
for(var k=0;k<tab.length;k++){
data += '<a href="#" onclick="$(\'#zoneSaisie\').val($(\'#zoneSaisie\').val()+\'[IMG]'+tab[k]+'[/IMG]\');$(\'#listeSmileys\').dialog(\'close\');"><img width="64" src="'+tab[k]+'" alt="" title=":breizh:" /></a>';}
		if(typeof(listeSmileys)!="Undefined"){
			var smileys = listeSmileys.getElementsByTagName('li');
			for(var i=0;i<smileys.length;i++)
			{
				var img = smileys[i].getElementsByTagName('img')[0];
				data += '<a href="#" onclick="ajouterSmiley(\''+img.title+'\'); return false;"><img src="'+img.src+'" alt="" title="'+img.title+'" /></a>';
			}
		if(isset==0){isset=1;$('#listeSmileys').append(data); 
		$('#listeSmileys').css({'overflow':'auto'});
		$(listeSmileys).hide();
		$("#listeSmileys").show().dialog({autoOpen:true,width:500,height:500,title:"liste des smileys personnalisés"});}
		}
	}
		
	$(document).ajaxComplete(function(){session();});
	
}

getGlobal(main);