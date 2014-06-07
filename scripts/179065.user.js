// ==UserScript==
// @name       	Unixy : Galaxie scan
// @version    	0.1
// @description Parcours une galaxie à la recherche de joueurs selon les paramètres choisis par l'utilisateur
// @include		*unixy.fr/index.php?page=galaxie&galaxietogo=*
// @include		*unixy.fr/index.php?*
// @require		http://code.jquery.com/jquery-1.10.0.min.js
// @copyright  	2013+, Xavier BRIN
// ==/UserScript==

var scanForm = 	'<div id="scanBlock" style="display:none;position:absolute;top:50px;left:50px;text-align:left;background-color:#113;border:2px solid gray;-moz-border-radius:20px;-webkit-border-radius:20px;padding:20px;z-index:9999;">';
scanForm +=			'<a id="closeBlock" href="#" style="display:inline;width:15px;height:15px;position:absolute;top:8px;right:8px;background-color:#511; padding:0px; margin:0px;">[X]</a>';
scanForm += 		'<form>';
scanForm += 			'<p>';
scanForm +=					'Numéro de galaxie : <select id="scanNum">';
for (var i = 1; i < 10; i++) {
    scanForm += 				'<option value="'+i+'">'+i+'</option>'; 
}
scanForm +=					'</select>';
scanForm +=				'</p>';
scanForm +=				'<p>';
scanForm += 				'Inactif 2 semaines <input type="checkbox" id="scanI2" checked="checked"/>';
scanForm +=				'</p>';
scanForm +=				'<p>';
scanForm +=					'Joueur fort <input type="checkbox" id="scanF"/>';
scanForm +=				'</p>';
scanForm +=				'<p><input type="button" id="launchScan" value="Scanner"/></p>';
scanForm += 		'</form>';
scanForm += 	'</div>';

$('a[href="index.php?page=galaxie"]').parent().after('<div class="bouton_vide"><a href="#" id="galaxie_scan">Scan de galaxie</a>'+scanForm+'</div>');
$('a#galaxie_scan').click(function() {
    $('div#scanBlock').show(600);
    return false;
});
$('a#closeBlock').click(function() {
    $('div#scanBlock').hide(150); 
    return false;
});
$('input#launchScan').click(function() {
    var url = 'index.php?page=galaxie&galaxietogo=';
    url += $('select#scanNum').val();
    url += '&systemetogo=1';
    url += '&i2='+($('input#scanI2').attr('checked') == 'checked');
    url += '&f='+($('input#scanF').attr('checked') == 'checked');
    url += '&scan=true';
   	window.open(url, '_blank');
    $('div#scanBlock').hide(100);
});
                              
                              if(window.location.href.indexOf('page=galaxie') > 0) {
    var autoSearch = window.location.href.indexOf('&scan=true') > 0;
    
    function scan (i2, f) {
        var href = window.location.href;
        if(href.indexOf('galaxietogo=') > 0 && href.indexOf('systemetogo=') > 0) {
            var index =  href.indexOf('galaxietogo=') + 12;
            var galaxie = parseInt(href.substring(index, index+1));
            href = href.substring(href.indexOf('systemetogo='));
            var systeme = parseInt(href.substring(12));
            
            $('title').text('['+systeme+'/499] Scan Unixy galaxie '+galaxie);
            
            if(galaxie > 0 && systeme > 0) {
                $('table.galaxie_table tr > td:nth-child(7)').each(function() {
                    if ($(this).text() != String.fromCharCode(160)) {
                        var firstLink = $(this).find('a:first').attr('href');
                        if(firstLink == '#espionner') {
                            var pseudo = $(this).parent().find('td:nth-child(4)');
                            
                            var found = true;
                            if( f && !(pseudo.find('a.fort').size() > 0)) {
                                found = false;   
                            }
                            if( i2 && !(pseudo.find('a.inactif_lvl_2').size() > 0)) {
                                found = false;
                            }
                            if(found) {
                                pseudo.css('border', '1px solid silver');
                                var planete = parseInt($(this).parent().find('td:nth-child(1)').text());
                                galaxieSend(6,99,galaxie,systeme,planete);
                            }
                        }
                    }
                });
                if(++systeme < 500) {
                    window.location.href = 'index.php?page=galaxie&galaxietogo='+galaxie+'&systemetogo='+systeme+'&scan=true';
                }
            }
        }
    }
    
    if(autoSearch) {
        var url = window.location.href;
        url = url.substring(url.indexOf('&i2=') + '&i2='.length);
        var i2 = (url.substring(0, url.indexOf('&')) === 'true');
        url = url.substring(url.indexOf('&f=') + '&f='.length);
        var f = (url.substring(0,url.indexOf('&')) === 'true');
        scan(i2, f);
    }
}