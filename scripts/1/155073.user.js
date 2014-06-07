// ==UserScript==
// @name        Kra v6 - Compact - Fiche des commerces
// @namespace    
// @include     http://www.kraland.org/order.php?p1=*
// @grant      none
// @version     1.101
// @UpdateVersion 10
// @downloadURL http://userscripts.org/scripts/source/155073.user.js
// @updateURL   http://userscripts.org.nyud.net/scripts/source/155073.meta.js
// @require     http://code.jquery.com/jquery-latest.min.js
// @icon		http://www.kramages.org/2/star.gif
// ==/UserScript==

if(jQuery('h2').first().html() == "Bâtiment"){

jQuery("td.tdb").each(function(){
	// Retrait des objets non proposés : stocks (0/0)
	clone = jQuery(this).clone();
	clone.find('p').remove();
	tab = clone.html().split(' ');
	if(jQuery.inArray('(0/0)',tab) !== -1) {
		jQuery(this).parent().remove();
	}
});
	tmp = false;
jQuery("tr").each(function(){
	// Debug prisons

	if(jQuery(this).find('th.thb').html()=='COMMERCE'){
		tmp = true;
	}
	if(tmp){
		// Gestion des barres de titre
		jQuery(this).find('th').attr('class','thb');
		jQuery(this).find('th').next().remove();
		if(jQuery.type(jQuery(this).find('.thb').html())!=="undefined" ){
			jQuery(this).html(jQuery(this).html().toLowerCase());
			jQuery(this).css({textTransform:'capitalize'});
			jQuery(this).parent().append(jQuery(this));
		}
		// Retrait des prix indicatifs
		jQuery(this).find('td.tdb').first().next().find('p').next().remove();

		div = document.createElement('div');
		jQuery(div).attr('class','itemV6');
		if(
			jQuery.type(jQuery(this).find('td.tdbc').first().html())!=="undefined" 
		){
			if(jQuery.inArray('Caisse',jQuery(this).find('td.tdb').html().split(' ')) !== 0){
				// Gestion des objets en magasin
				jQuery(this).find('p').each(function(){
					// Retrait des textes personnalisés
					if(jQuery(this).html().substr(0,1) == "["){
						jQuery(this).remove();
					}
				});
				jQuery(div).html(jQuery(this).find('td.tdbc').first().html()+'<br>'+jQuery(this).find('td.tdb').html().replace('(','<br/>(')+jQuery(this).find('td.tdb').first().next().html())
				jQuery(div).css({maxWidth:'90px'});
			} else {
				// Gestion de la caisse
				jQuery(div).html(jQuery(this).find('td.tdbc').first().html()+'<br>'+jQuery(this).find('td.tdb').html())
			}
			jQuery(this).parent().append(div);
			jQuery(this).find('td').remove();
		}
		if(jQuery.type(jQuery(this).html())==""){
			jQuery(this).remove();
		}
	}
});
	jQuery('table').css({textAlign:'center',width:'580px',border:'1px solid #B9282D',background:'white'});
	jQuery('.itemV6').css({verticalAlign:'top',fontSize:'10px',textDecoration:'none',color:'black',borderRadius:'3px',margin:'1px',display:'inline-block',padding:'1px',textAlign:'center', border:'1px solid gray'});
}