// ==UserScript==
// @name        Kra v6 Compact ( Matériel )
// @namespace    
// @include     http://www.kraland.org*
// @version     1.1
// @UpdateVersion 4
// @downloadURL http://userscripts.org/scripts/source/154962.user.js
// @updateURL   http://userscripts.org.nyud.net/scripts/source/154962.meta.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @icon		http://www.kramages.org/2/star.gif
// @grant       GM_addStyle
// ==/UserScript==
if(jQuery.type(jQuery('li.on').find('a').html()) != "undefined" && jQuery('li.on').find('a').html() == "Matériel"){

	jQuery('div.left-frame').find('table').attr('id','matos');
	jQuery('div.left-frame').append('<table id="matosV6"><tbody></tbody></table>');

	jQuery('#matos').find('tr').each(function(){
		var img = jQuery(this).find('td.tdbc').first().find('img');

		if(jQuery(this).find('th.ths')){
			mot = jQuery(this).find('th').first().text().split(' ');
			if(mot[0].length>1){
				if(mot[0] == "Charge"){
					jQuery('#matosV6').append('<tr><th style="text-align:center;border-bottom:1px solid #B9282D">'+jQuery(this).find('th.ths').html()+'</th></tr>');
				}
			}
		}
		
		if(jQuery(this).find('td.tdbc')!= -1){
			detail = jQuery(this).find('td.tdb').clone();
			detail.find('p').remove();
			detail.find('a').remove();
			detail = detail.text().replace('(','');
			detail = detail.replace(')',' x ');
			detail = detail + jQuery(this).find('a').text() + '<hr><p>'+jQuery(this).find('p.gr').text()+'</p>';
			detail = detail.replace("'","\\'");

			var td = jQuery(this).find('td.tdb').clone();


			img.attr('title',td.find('a').html());

			td.find('a').remove();

			var lien = jQuery(this).find('td.tdb').find('a').first();
			lien.html(img);

			txt = td.text() + jQuery(this).find('td.tdbc').text();
			perso = "";
			if(jQuery(this).find('img').attr('height') == "12") { perso = "perso" ; detail += '<em>objet personnalisé</em>' }
			if (img.attr('title') !== "Trésor") {
				if(txt.substr(2,3)=="0/0"){txt=txt.split(' '); txt='<span class="nostock">'+txt[1]+'</span><br/>'+txt[2]+'abc'+txt[3]; } 
				div = '<a onmouseover="document.getElementById(\'zoom\').innerHTML = this.innerHTML +\''+detail+'\'" class="itemV6 border ' + perso + ' " onclick="'+ jQuery(this).find('td.tdb').find('a').first().attr('onclick') +'" href=" ' + jQuery(this).find('td.tdb').find('a').first().attr('href')  + ' ">'+ lien.html() + '</a>';
			} else {
				div = '<tr><td><a class="itemV6 gold" onclick="'+ jQuery(this).find('td.tdb').find('a').first().attr('onclick') +'" href="' + jQuery(this).find('td.tdb').find('a').first().attr('href')  + ' ">'+ lien.html() + '<span style="vertical-align:top;line-height:32px">' + txt + '</span></a></td></tr>';
			}
			if( jQuery.type(img.attr('title')) !== "undefined" ){
				jQuery('#matosV6').find('tbody').append(div);
			}
		}
	});

	jQuery('#matos').remove();

	jQuery('#matosV6').append('<tr><th class="thb">Détails :</th></tr>');
	jQuery('#matosV6').append('<tr><td id="zoom"></td></tr>');
	jQuery('#matosV6').css({width:'280px',border:'1px solid #B9282D',background:'white'});
	jQuery('#matosV6').find('td').css({display:'block'});

	jQuery('.itemV6').css({border:'1px solid rgb(185, 40, 45)',textDecoration:'none',color:'white',padding:'1px',margin:'1px',display:'inline-block',textAlign:'center'});
	jQuery('.perso').css({border:'1px solid green'});


	jQuery('.gold').css({width:'100%',color:'#B9282D',borderRadius:'0px',border:'none',borderBottom:'1px solid #B9282D',background:'none'});
	GM_addStyle("#zoom img{height:64px;float:left;margin-right:5px;width:64px;}");
}