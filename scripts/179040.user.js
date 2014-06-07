// ==UserScript==
// @name       	Unixy : Messagerie Fast attack
// @version    	0.1
// @description Permet d'attquer un joueur... à partir d'un rapport d'espionnage !
// @include		*.unixy.fr/index.php?page=messages*
// @include		*.unixy.fr/index.php?page=flottes&g=*
// @include		*.unixy.fr/index.php?page=flottes&op=endenvoi*
// @include		*.unixy.fr/index.php?page=flottes&op=envoyer*
// @require		http://code.jquery.com/jquery-1.10.0.min.js
// @copyright  	2013+, Xavier BRIN
// ==/UserScript==

var currentUrl = window.location.href;
var indexOfR = currentUrl.indexOf('&r=');
if(indexOfR > 0) {
    var r = parseInt(currentUrl.substring(indexOfR + 3));
    var n = parseInt(r / 10000000) + 1;
    console.log(n);
    var ligneMystral = $('a:contains(Mystral)').parent().parent();
    if(ligneMystral.size() > 0) {
        var mystral = parseInt(ligneMystral.find('td:nth-child(2)').text().replace(/ /g, ''));
        if(mystral >= n) {
            ligneMystral.find('td:last > input').val(n);
        }else{
            ligneMystral.find('td:last > input').val(mystral);
            ligneMystral.find('td:nth-child(2)').append(' <span style="color:orange;">Need '+ (n-mystral) + ' more</span>');
        }
    }
    var form = $('form[action="?page=flottes&op=envoyer"]');
    form.attr('action',form.attr('action')+'&autoclose=true');
}
else if(currentUrl.indexOf('page=messages') > 0) {    
    var seuilFrigo = 2000000000;
    
    $('select[name="typesuppr"] > option').removeAttr('selected');
    $('option[value="delete_coche"]').attr('selected','selected');
    
    var selected = 0;
    var max = 0;
    var maxTxt;
    
    $('a[href^="index.php?page=galaxie&galaxietogo="]').each(function(){
        var tbody = $(this).parent().parent().parent();
        var titaneCarbone = tbody.find('tr:nth-child(4)');
        var lignePluto = tbody.find('tr:nth-child(5)');
        var titane = parseInt(titaneCarbone.find('td:first').text().substring(9).replace(/ /g,''));
        var carbone = parseInt(titaneCarbone.find('td:last').text().substring(10).replace(/ /g,''));
        var plutonium = parseInt(lignePluto.find('td:first').text().substring(12).replace(/ /g,''));
        
        var split = $(this).text().split(':');
        var galaxie = split[0];
        var systeme = split[1];
        var planete = split[2];
        
        var fightUrl = 'index.php?page=flottes&g='+galaxie+'&s='+systeme+'&p='+planete+'&mission=3';
        
        var somme = titane+carbone+plutonium;
        var sommeTxt = somme+'';
        for(var i=sommeTxt.length - 3; i > 0; i-=3) {
            sommeTxt = sommeTxt.substring(0, i)+' '+sommeTxt.substring(i, sommeTxt.length);
        }
        lignePluto.find('td:last').html('Somme : <a class="newTab" href="'+fightUrl+'&r='+somme+'">'+sommeTxt+'</a>');
        
        if(somme < seuilFrigo) {
            $(this).parent().parent().parent().parent().parent().parent().prev().find('th:last > input[type="checkbox"]').attr('checked','checked');
            selected++;
        } else {
            if(somme > max) {
                max = somme;
                maxTxt = sommeTxt;
                $('a#idMax').removeAttr('id');
                $(this).attr('id', 'idMax');
            }
        }
        
        var href = $(this).attr('href');
        $(this).attr('href',fightUrl);
        $(this).after(' <a href="'+href+'">[Go]</a>');
        $(this).after(' <a href="#" class="spy" style=""><img src="http://skin.unixy.fr/defaut_bleu/images/icones/eye.png" alt="Espionner" title="Espionner"/><span style="display:none;" class="g">'+galaxie+'</span><span style="display:none;" class="s">'+systeme+'</span><span style="display:none;" class="p">'+planete+'</span></a>');
    });
    
    $('a.spy').click(function() {
        var mission = 6;
        var nombre = 99;
        var g = $(this).find('span.g').text();
        var s = $(this).find('span.s').text();
        var p = $(this).find('span.p').text();
        $.ajax({
            url: "index.php",
            data: {
                page: "flottes",
                op: "segalaxie",
                mission: mission,
                nombre: nombre,
                g: g,
                s: s,
                p: p
            },
            async: true,
            success: function(data) {
                var vararray = data.split('|');
                var file = vararray[0];
                
                var texte = '';
                if (file == 0) texte = '<span style="color: red;">Echec de l\'envoi vers '+g+':'+s+':'+p+' : la mission n\'existe pas</span>';
                if (file == 1) texte = '<span style="color: red;">Echec de l\'envoi vers '+g+':'+s+':'+p+' : pas assez de vaisseaux</span>';
                if (file == 2) texte = '<span style="color: red;">Echec de l\'envoi vers '+g+':'+s+':'+p+' : destination incorrecte</span>';
                if (file == 3) texte = '<span style="color: red;">Echec de l\'envoi vers '+g+':'+s+':'+p+' : pas assez de slots flottes</span>';
                if (file == 4) texte = '<span style="color: red;">Echec de l\'envoi vers '+g+':'+s+':'+p+' : impossible de s\'auto-espionner</span>';
                if (file == 5) texte = '<span style="color: red;">Echec de l\'envoi vers '+g+':'+s+':'+p+' : pas assez de capacité</span>';
                if (file == 6) texte = '<span style="color: lime;">Envoi réussi vers '+g+':'+s+':'+p+'</span>';
                if (file == 7) texte = '<span style="color: orange;">Flood detecté. Patientez avant de continuer</span>';
                if (file == 8) texte = '<span style="color: orange;">Désolé, la limite d\'essais d\'espionnages sur cette page a été atteinte.</span>';
                if (file == 9) texte = '<span style="color: red;">Echec de l\'envoi vers '+g+':'+s+':'+p+' : le joueur est en mode vacances</span>';
                if (file == 10) texte = '<span style="color: red;">Echec de l\'envoi vers '+g+':'+s+':'+p+' : le joueur est trop faible pour vous</span>';
                if (file == 11) texte = '<span style="color: red;">Echec de l\'envoi vers '+g+':'+s+':'+p+' : le joueur est trop fort pour vous</span>';
                if (file == 12) texte = '<span style="color: red;">Echec de l\'envoi vers '+g+':'+s+':'+p+' : le joueur visé est banni !</span>';
                if (file == 13) texte = '<span style="color: red;">Echec de l\'envoi vers '+g+':'+s+':'+p+' : Il n\'y a pas de joueur sur cette planète !</span>';
                $('form[action="index.php?page=messages&see=&op=del"] > p:first').append(texte+'<br/>');
                if (file == 6)
                {
                    document.getElementById('s_using').innerHTML = vararray[1];
                    document.getElementById('s_ok').innerHTML = vararray[2];
                    document.getElementById('s_status').innerHTML = vararray[3];
                }                
            }
        }); 
    });
    
    $('select[name="typesuppr"]').parent().append('<span>'+selected+' rapports selectionnées</span>');
    if(maxTxt != undefined) {
        $('form[action="index.php?page=messages&see=&op=del"] tbody:first > tr:nth-child(2) > td').append('<span>Max : <a href="#idMax">'+maxTxt+'</a></span>');
    }
    
    $('a.newTab').click(function() {
        var url = $(this).attr('href');
        var win=window.open(url, '_blank');
        var somme = parseInt(url.substring(url.lastIndexOf('=') + 1));
        url = url.substring(0,url.lastIndexOf('='))+'='+parseInt(somme/2);
        $(this).attr('href', url);
        return false;
    });
} else if(currentUrl.indexOf('op=endenvoi&autoclose=true') > 0) {
    window.close();
} else {
    var form = $('form[action^="?page=flottes"]');
    form.attr('action',form.attr('action')+'&autoclose=true');
}