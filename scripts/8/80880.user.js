scr_meta=<><![CDATA[
// ==UserScript==
// @name           Vérifier les attaques sur CdR pour les russes
// @namespace    Vérifier les attaques sur CdR pour les russes
// @description   permet d'empêcher les attaques entres russes en demandant confirmation avant l'attaque d'un russe et en enlevant le lien permettant d'attaquer en cliquant sur un perso russe
// @include        http://*campagne-de-russie.com/jeu*
// @version        1.1.1
// ==/UserScript==
]]></>.toString();

var classe = "attaque_rus";
initialise_attaque();

function verifie_attaque()
{

	var form = document.forms[2];//on sélection le formulaire à envoyer
	
	//on sélectionne les 2 listes déroulantes (attaque et mêlée)
	var select = document.getElementsByName("attaque")[0];
	var select2 = document.getElementsByName("melee")[0];
	
	
	var attaque = select.options[select.selectedIndex].className;//on prend la classe de l'option sélectionnée (attaque_rus ou bien attaque_fra) pour l'attaque
	var melee =select2.options[select2.selectedIndex].className;//on prend la classe de l'option sélectionnée (attaque_rus ou bien attaque_fra) pour la mêlée
	
	if (attaque != classe && melee != classe)// s'il n'attaque ni en salve ni en mêlée un français
	{
		
		form.submit();// on envoie le formulaire
		
	}
	else 
	{
		var confirmation = prompt("Êtes-vous bien sûr de vouloir attaquer une unité russe ? En soit, c'est une bonne idée mais ce choix pourrait vous faire avoir des problèmes avec la justice. Tapez 'oui' si vous le voulez vraiment.");
		if (confirmation == "oui")
		{
			if (confirm("C'est vrai ?!? Vous voulez vraiment attaquer un de vos alliés ? Cliquez sur 'ok' pour confirmer !"))
			{
				alert("Vous avez fait un choix que je comprends même s'il est cndamnable.");
				form.submit();
			}
			else alert("Vous avez fait le bon choix !");
		}
		else alert("Vous avez fait le bon choix !");
	}
}

function initialise_attaque()
{
	/*Maintenant on change la partie avec le lien pour attaquer (le plus dangereux)*/

	var allies = document.getElementsByClassName(classe);// on sélectionne tous les alliés
	var i =0;
	var source = document.body.innerHTML;

	while (allies[i])
	{
		
		source = source.replace("AffMenuContextuel("+allies[i].value+",1", "AffMenuContextuel("+allies[i].value+",0");// on remplace le menu contextuel par un où il n'y a pas de lien pour attaquer
		//alert(allies[i].value);
		i++;
	}
	
	document.body.innerHTML = unescape(source);
	/* Cette partie change les deux listes (attaque et mêlée)*/
	var submit;
	if (document.location.href.search("jeu3D.php") == -1)
	submit = document.getElementsByName("Submit")[2];
	else submit = document.getElementsByName("Submit")[1];
	submit.type = 'button';//on transforme le bouton submit en button pour pouvoir faire des vérifications avant la soumisson du formulaire
    submit.addEventListener("click",
                verifie_attaque,
                false);
}

var AnotherAutoUpdater = {
 // Config values, change these to match your script
 id: '80880', // Script id on Userscripts.org
 days: 1, // Days to wait between update checks

 // Don't edit after this line, unless you know what you're doing ;-)
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
 time: new Date().getTime(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  onload: function(xpr) {AnotherAutoUpdater.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      this.xversion = this.xversion[1].replace(/\./g, '');
      this.xname = this.xname[1];
    } else {
      if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
	GM_setValue('updated_'+this.id, 'off');
      return false;
    }
    if ( (+this.xversion > +this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
      GM_setValue('updated_'+this.id, this.time+'');
      top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
    } else if ( (this.xversion) && (+this.xversion > +this.version) ) {
      if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated_'+this.id, 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); AnotherAutoUpdater.call(true);});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated_'+this.id, this.time+'');
      }
    } else {
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated_'+this.id, this.time+'');
    }
  },
  check: function() {
    if (GM_getValue('updated_'+this.id, 0) == "off")
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true)});
    else {
      if (+this.time > (+GM_getValue('updated_'+this.id, 0) + 1000*60*60*24*this.days)) {
        GM_setValue('updated_'+this.id, this.time+'');
        this.call();
      }
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true)});
    }
  }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AnotherAutoUpdater.check();