// ==UserScript==
// @name        landofice
// @namespace   http://userscripts.org/scripts/source/186357.542482.js
// @description upgrade landofice, change main dizajn, add smiles to chat/ali chat, ...
// @include     http://heaven.landofice.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require     http://loi-help.nezmar.info/alt_images/smiles/jquery.emoticons.js

// @version     1.35
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// ==/UserScript==

GM_xmlhttpRequest({
  method: "GET",
  url: "http://loi-help.nezmar.info/change.css?" + Math.random(),
  onload: function(response) {
    var css = response.responseText;
    GM_addStyle(css);
  }
});

var table;
var td;
var el;
var build;
var form;
var text;

jQuery.fn.justtext = function() {
    return $(this).clone().children().remove().end().text();
};



/** change main dizajn */
if(/main.php/.test(self.location.href)){
    
    GM_addStyle("body { background-color: #011121; background-image: url('http://loi-help.nezmar.info/alt_images/images/page_bg.png') !important; background-repeat: no-repeat !important; background-position: center top !important; }");
    $('body > center').css('margin-top', '66px');
    table = $('body > center > table').last();
    table.addClass('innerTable'); table = $('.innerTable');
    table.attr('width', '1100px').attr('align', 'center').css('margin','0 auto');
    $("body > center > table:first-child table td, body > center > table:first-child table a").css('background-color', '#011121');
    GM_addStyle("body > center > center { padding-left: 100px; width: 1000px; margin: 0 auto; }");
    
    // left menu
    $('.leftmenu').removeAttr('background').attr('width', '160').css('background-color', 'transparent').css('padding', '20px 31px 0 62px');
    $('.leftmenu > table > tbody > tr > td > br').remove();
    $('.leftmenu > table > tbody > tr > td > center > br').remove();
    $('.klanstats').css('color', 'white').css('margin-bottom', '35px');
    $('.klanstats td:contains("Tahu Odehráno:")').text('Odehráno:');
    $('.klanstats td:contains("Hodnota armády:")').text('Armáda:');
    $('.menulink a').css('color', '#b9b9b9');
    
    // content
    $('.innerTable > tbody > tr > td').last().addClass('contentBuildings');
    $('.contentBuildings > table').addClass('buildings');
    $('.buildings').css('width', '715px').attr('align', 'left');
    $('.buildings table').css('font-size', '14px').attr('border','0').css('border', '2px outset #6BA8CC').css('margin', '0 10px 10px 0').css('background-repeat', 'no-repeat').css('background-position', 'center').css('width', '225px');
    $('.buildings table td').css('padding', '2px 5px');
    $('.buildings table form').css('margin', '0');
    
    $('.buildings > tbody > tr > td > br').remove();
    
    // building barrack
    build = $(".buildings td:contains('Domobrana')").closest('table').last();               build.addClass('build-barracs').addClass('build-table');
    $('.build-barracs').css('background-image', 'url("http://loi-help.nezmar.info/alt_images/build/barracs.png")');
    
    // building elf village
    build = $(".buildings td:contains('Elfí stromová vesnice')").closest('table').last();   build.addClass('build-elf-village').addClass('build-table');
    $('.build-elf-village').css('background-image', 'url("http://loi-help.nezmar.info/alt_images/build/elf_village.png")');
    // building druid
    build = $(".buildings td:contains('Chýše druidů')").closest('table').last();   build.addClass('build-druid').addClass('build-table');
    $('.build-druid').css('background-image', 'url("http://loi-help.nezmar.info/alt_images/build/druid_build.png")');
    // building giant
    build = $(".buildings td:contains('Údolí obrů')").closest('table').last();   build.addClass('build-forest-giant').addClass('build-table');
    $('.build-forest-giant').css('background-image', 'url("http://loi-help.nezmar.info/alt_images/build/forest_giant.png")');
    // building wurm
    build = $(".buildings td:contains('Wurmý nory')").closest('table').last();   build.addClass('build-wurm').addClass('build-table');
    $('.build-wurm').css('background-image', 'url("http://loi-help.nezmar.info/alt_images/build/wurm_build.png")');



    $('.build-table tr').addClass('build-tr-inner');
    $('.build-table').each(function(){
        el = $(this).find('tr').first(); el.removeClass('build-tr-inner').addClass('build-tr-first');
        el = $(this).find('tr').last();  el.removeClass('build-tr-inner').addClass('build-tr-last');
    });
    
    $('.build-tr-inner').css('color', '#ffffff').css('font-size', '12px');//.css('text-shadow', '0 0 4px #6BA8CC');
    $('.build-tr-first, .build-tr-last').css('background-color', '#354682').css('color', '#9CD9FD');
        $('.build-tr-first td').css('padding', '6px 5px');
    $('.build-tr-inner td').css('padding', '6px 5px');
    $('.build-tr-last td').css('padding', '6px 5px');
    $('.build-tr-last form:contains("vybaveni")').each(function(){
        $(this).html($(this).html().split("vybaveni").join(""));
    });
    $('.build-tr-last form:contains("vybavení")').each(function(){
        $(this).html($(this).html().split("vybavení").join(""));
    });
} else
/** change dizajn for dobyvanie, jit se projit, trziste */
if(/dobyvani.php/.test(self.location.href)){
    GM_addStyle("body { background-image: url('http://loi-help.nezmar.info/alt_images/images/dobyvani.jpg') !important; background-repeat: no-repeat !important; background-position: center top !important; }");
    $('body > table').attr('width', '1000px').css('margin-top', '40px');    
} else if(/rpg/.test(self.location.href)){
    GM_addStyle("body { background-image: url('http://loi-help.nezmar.info/alt_images/images/rpg.jpg') !important; background-repeat: no-repeat !important; background-position: center top !important; }");
    $('body > table').attr('width', '1000px').css('margin-top', '40px');    
} else if(/trziste/.test(self.location.href)){
    GM_addStyle("body { background-image: url('http://loi-help.nezmar.info/alt_images/images/market.jpg') !important; background-repeat: no-repeat !important; background-position: center top !important; }");
    $('body > table').attr('width', '1000px').css('margin-top', '40px');    
} else if(/pleneni.php/.test(self.location.href)){
    GM_addStyle("body { background-image: url('http://loi-help.nezmar.info/alt_images/images/pleneni.jpg') !important; background-repeat: no-repeat !important; background-attachment:fixed !important; background-position: center top !important; }");
    $('body > table').attr('width', '1000px').css('margin-top', '40px');    
} else if(/stavby.php/.test(self.location.href)){
    GM_addStyle("body { background-image: url('http://loi-help.nezmar.info/alt_images/images/stavby.jpg') !important; background-repeat: no-repeat !important; background-attachment:fixed !important; background-position: center top !important; }");
    $('body > table').attr('width', '1000px').css('margin-top', '40px');    
} else if(/klanarmy.php/.test(self.location.href)){
    GM_addStyle("body { background-image: url('http://loi-help.nezmar.info/alt_images/images/klan_army.jpg') !important; background-repeat: no-repeat !important; background-attachment:fixed !important; background-position: center top !important; }");
    $('body > table').attr('width', '1000px').css('margin-top', '40px');    
    $('body > table table').css('background-color', 'black');
} else

if(/aliance_chat.php/.test(self.location.href)){
    GM_addStyle("body { background-image: url('http://loi-help.nezmar.info/alt_images/images/chat.jpg') !important; background-repeat: no-repeat !important; background-attachment:fixed !important; background-position: center center !important; text-align:center; }");
    GM_addStyle("h1 { margin-top: 0.7em; color: #000000; text-shadow: 2px 2px #778899; }");
    GM_addStyle("body > form { background-color: #BDC1C4; width: 1000px; margin: 0 auto; padding: 0.5em 2em; }");
    
    el = $('body > form > table.text').addClass('posts');
    GM_addStyle('.posts { color: black; }');
    GM_addStyle(".posts td { padding: 2px 3px; border: 1px solid #778899; }");
    
    $('body > form > table').first().css('margin', '0 auto');
    $('body > form > table form').css('margin', '0');
    
    var users = [];
    var index;
    var id_user;
    var max_id = 0;
    var min_id = 999999;
    var rgb_max = 16843008;
    var color_max = 0;
    var color_int = 0;
    var color_nas = 0;
    var color_string = '';
    $('.posts tr').each(function(){
        $(this).find('td').last().addClass('msg');
        
        el = $(this).find('b').first();
        el.after( '<span class="user-post">' + $(this).find('td').last().justtext() + '</span>' );
        $(this).find('td').last().contents().filter(function(){ return this.nodeType != 1; }).remove();
    
        index = el.text().indexOf(')');
        if(index != -1){
            id_user = parseInt(el.text().substring(1, index));
            users[id_user] = { r: 0, g: 0, b: 0 };
            if(id_user < min_id)    min_id = id_user;
            if(id_user > max_id)    max_id = id_user;
        }
    });
    
    if(min_id > 0){
        color_max = max_id - min_id + 2;
        color_nas = rgb_max / color_max;
        for( var key in users){
            if (key === 'length' || !users.hasOwnProperty(key)) continue;
            color_int = parseInt((key - min_id + 1) * color_nas);
            users[key]['b'] = color_int % 256;
            users[key]['g'] = ((color_int - users[key]['b']) / 256) % 256;
            users[key]['r'] = (color_int - users[key]['g']*256 - users[key]['r']) / (256*256);
            users[key]['b'] = parseInt(users[key]['b'] / 3);
            users[key]['g'] = parseInt(users[key]['g'] / 3);
            users[key]['r'] = parseInt(users[key]['r'] / 3);
            color_string = '#' + ((users[key]['r'] < 16)?'0':'') + users[key]['r'].toString(16) + ((users[key]['g'] < 16)?'0':'') + users[key]['g'].toString(16) + ((users[key]['b'] < 16)?'0':'') + users[key]['b'].toString(16);
            el = $('.posts tr td').find('b:contains("('+key+')")');
            el.css('color', color_string);
        }        
    }
    
    $(".user-post").emoticons('http://loi-help.nezmar.info/alt_images/smiles/emoticons');
} else
/** change dizajn for chat */
if(/chat.php/.test(self.location.href)){
    GM_addStyle("body { background-image: url('http://loi-help.nezmar.info/alt_images/images/chat.jpg') !important; background-repeat: no-repeat !important; background-attachment:fixed !important; background-position: center center !important; }");

    $('a[href="http://nezmar.freehostia.com/loi/faq.php"]').attr('href', 'http://loi-help.nezmar.info/faq.php').addClass('nezmarPage').attr('target', '_blank');
    $('a.nezmarPage').after(' | <a href="http://loi-help.nezmar.info" target="_blank" >LOI Help</a>');
    
    var reload = false;
    var stopReload = false;
    var maxInterval = 5;
    var interval = maxInterval;
    $('.tlacitko[value="Obnovit"]').addClass('tlacitkoObnovit');
    $('.tlacitkoObnovit').after('<input type="button" class="stopReload tlacitko" value="stop" />').closest('td').attr('width', '300');
    $('.stopReload').click(function(e){
        if(stopReload)
            $(this).attr('value', 'stop');
        else
            $(this).attr('value', 'start');
        stopReload = !stopReload;
    });
    window.setInterval(function(){
        if($('.pole[name="text"]').val().length != 0 || stopReload)
            interval = maxInterval;
            
        if(interval == 0)
            reload = true;
            
        if(reload){
            $('.tlacitkoObnovit').click();
            interval = maxInterval;
        } else {
            $('.tlacitkoObnovit').attr('value', "Obnovit ("+interval+")");
            interval = interval - 1;
        }     
    }, 1000);
    
    $('body > table > tbody > tr').last().addClass('user-posts');
    $('body > table > tbody > tr').first().addClass('add-post');
    
    var users_image = [];
    $.ajax({
        type: 'POST',
        url: "http://loi-help.nezmar.info/alt_images/users/check_image.php",
        crossDomain: true,
        success: function(data){
            if(data !== 'false'){
                var items = data.split(";");
                for(var i=0; i<items.length;i++){
                    item = items[i].split("=>");
                    users_image[item[0]] = item[1];
                }
            }
        },
        async: false
    });
    
    var index;
    $('.user-posts table').each(function(){
        $(this).find('tr').last().addClass('posted');
        
        el = $(this).find('span.id');
        index = el.text().replace( /[^0-9]/g, '');
        if(typeof users_image[index] != 'undefined') {
            //el.text('x');
            tr = el.closest('tr');
            tr.prepend('<td rowspan="2" valign="top"><img src="http://loi-help.nezmar.info/alt_images/users/'+users_image[index]+'" /></td>');
            tr.find('td').removeAttr('width');
            tr.find('td').first().attr('width', '100');
            tr.find('td').last().attr('width', '20%');
        }
    });
    $(".posted").emoticons('http://loi-help.nezmar.info/alt_images/smiles/emoticons');
    
}

/** change images for attack */
if(/utok.php/.test(self.location.href)){
    
    form = $('form[action^="utok.php"]');
    form.after('<div id="pom_el"></div>');
    $('#pom_el').html(form.html()); form.html('');
    
    form.append('<div class="send_clan_army"></div>');
    form.append('<div class="form_action"></div>');
    form.append('<div class="attack_place"></div>');
    form.append('<div class="f_clear"></div>');
    
    $('#pom_el').find('table').first().appendTo($('.send_clan_army'));
    $('.form_action').html($('#pom_el').html()); $('#pom_el').remove();
    //$('.send_clan_army').html(form.find('table').first().html());form.find('table').first().remove();
    
    $('.send_clan_army, .attack_place, .form_action').css('float', 'left');
    $('.form_action').css('margin', '0 30px');
    $('.f_clear').css('clear', 'both');
    form.closest('.text').addClass('attack-text');
    $('.attack_place').append('<p>' + $('.attack-text').justtext() + '</p>');
    //form.closest('text').get(0).lastChild.nodeValue = "";
    $('.attack-text').contents().filter(function(){ return this.nodeType != 1; }).remove();
    
    $('.attack_place').css('width', '400px');//.css('height', '200px');//.css('background-color', 'gray');
    $('.attack_place p').css('text-indent', '30px').css('text-align', 'justify');
    
    if(/utok=vesnice&/.test(form.attr('action'))){ // dedina
        $('.attack_place p').before('<img src="http://loi-help.nezmar.info/alt_images/attack/dedina.jpg">');
    } else if(/utok=osada&/.test(form.attr('action'))){ // osada
        $('.attack_place p').before('<img src="http://loi-help.nezmar.info/alt_images/attack/osada.jpg">');
    } else if(/utok=mesto&/.test(form.attr('action'))){ // mesto
        $('.attack_place p').before('<img src="http://loi-help.nezmar.info/alt_images/attack/mesto.jpg">');
    } else if(/utok=opevnene_mesto&/.test(form.attr('action'))){ // opevnene mesto
        $('.attack_place p').before('<img src="http://loi-help.nezmar.info/alt_images/attack/opevnene_mesto.jpg">');
    } else
    
    if(/utok=chram1&/.test(form.attr('action'))){ // chram zivota
        $('.attack_place p').before('<img src="http://loi-help.nezmar.info/alt_images/attack/chram_zivota.jpg">');
    } else if(/utok=chram5&/.test(form.attr('action'))){ // chram zivota
        $('.attack_place p').before('<img src="http://loi-help.nezmar.info/alt_images/attack/posvatny_chram_zeme.jpg">');
    } else if(/utok=chram3&/.test(form.attr('action'))){ // chram ledu
        $('.attack_place p').before('<img src="http://loi-help.nezmar.info/alt_images/attack/chram_ladu.jpg">');
    } else if(/utok=chram4&/.test(form.attr('action'))){ // aethrov chram
        $('.attack_place p').before('<img src="http://loi-help.nezmar.info/alt_images/attack/aethrov_chram.jpg">');
    } else if(/utok=chram2&/.test(form.attr('action'))){ // chram ohna
        $('.attack_place p').before('<img src="http://loi-help.nezmar.info/alt_images/attack/chram_ohna.jpg">');
    } else
    
    if(/utok=eternane1&/.test(form.attr('action'))){ // eternan svatina
        $('.attack_place p').before('<img src="http://loi-help.nezmar.info/alt_images/attack/eternan_svatina.jpg">');
    } else if(/utok=eternane2&/.test(form.attr('action'))){ // eternan chram
        $('.attack_place p').before('<img src="http://loi-help.nezmar.info/alt_images/attack/eternan_chram.jpg">');
    } else if(/utok=eternane3&/.test(form.attr('action'))){ // eternan hrobka
        $('.attack_place p').before('<img src="http://loi-help.nezmar.info/alt_images/attack/eternan_hrobka.jpg">');
    } else if(/utok=eternane4&/.test(form.attr('action'))){ // eternan citadela
        $('.attack_place p').before('<img src="http://loi-help.nezmar.info/alt_images/attack/eternan_citadela.jpg">');
    } else
    
    if(/utok=levent1&/.test(form.attr('action'))){ // velke pohrebisko
        $('.attack_place p').before('<img src="http://loi-help.nezmar.info/alt_images/attack/velke_pohrebisko.jpg">');
    } else
    
    // viac eventov v jednom
    if(/utok=eventy_2&/.test(form.attr('action'))){ // rozne eventy - goblinia opevnena krcma
    //    $('.attack_place p').before('<img src="http://loi-help.nezmar.info/alt_images/attack/goblinia_opevnena_krcma.jpg">');
    }
    
    
}

/** change images for units */
if(/klanarmy.php/.test(self.location.href) || /utok.php/.test(self.location.href)) {

    $("img[src*='jednotky/1.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/oz_vesnican.jpg');
    td = $("table.text td:contains('Katapult')").closest('tr').find('td').first();    td.find('br').remove();
    td.append('<img src="http://loi-help.nezmar.info/alt_images/units/katapult.jpg">');
    $("img[src*='jednotky/0.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/others/vudce_klanu.jpg');
    td = $("table.text td:contains('Otrok s kopím')").closest('tr').find('td').first();    td.find('br').remove();
    td.append('<img src="http://loi-help.nezmar.info/alt_images/units/others/otrok_kopi.jpg">');
    td = $("table.text td:contains('Otrok s oštěpy')").closest('tr').find('td').first();    td.find('br').remove();
    td.append('<img src="http://loi-help.nezmar.info/alt_images/units/others/otrok_ostep.jpg">');
    td = $("table.text td:contains('Otrok štítonoš')").closest('tr').find('td').first();    td.find('br').remove();
    td.append('<img src="http://loi-help.nezmar.info/alt_images/units/others/otrok_stit.jpg">');
    // Hnijící vesničan
    // Generál starého impéria
    
    // dralgar imagar
    $("img[src*='jednotky/110.gif']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/dralgar/druid.jpg');
    $("img[src*='jednotky/100.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/dralgar/elf.jpg');
    $("img[src*='jednotky/120.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/dralgar/lesny_obor.jpg');
    $("img[src*='jednotky/121.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/dralgar/lesny_bizon.jpg');
    $("img[src*='jednotky/130.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/dralgar/wurm.jpg');
    td = $("table.text td:contains('Lesní obr jezdíci na Posvátném Wurmovi')").closest('tr').find('td').first();    td.find('br').remove();
    td.append('<img src="http://loi-help.nezmar.info/alt_images/units/dralgar/wurm_with_giant.jpg">');
    
    // Aether
    //$("img[src*='jednotky/201.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/aethar/ice_mag.jpg');
    $("img[src*='jednotky/210.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/aethar/ice_prizrak.jpg');
    $("img[src*='jednotky/211.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/aethar/ancient_ice_prizrak.jpg');
    $("img[src*='jednotky/212.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/aethar/water_element.jpg');
    $("img[src*='jednotky/220.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/aethar/ice_giant.jpg');
    
    // Dhar
    $("img[src*='jednotky/310.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/dhar/stone_golem.jpg'); 
    $("img[src*='jednotky/311.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/dhar/mramor_golem.jpg'); 
    $("img[src*='jednotky/312.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/dhar/onyx_golem.jpg'); 
    $("img[src*='jednotky/313.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/dhar/topaz_golem.jpg'); 
    $("img[src*='jednotky/320.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/dhar/stone_giant.jpg'); 
    $("img[src*='jednotky/330.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/dhar/earth_mage.jpg'); 
    
    // dread
    $("img[src*='jednotky/1000.gif']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/dread/zombie.jpg');
    $("img[src*='jednotky/1010.gif']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/dread/lich.jpg');
    //$("img[src*='jednotky/1012.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/ice_mag.jpg');
    $("img[src*='jednotky/1020.gif']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/dread/shade.jpg');
    $("img[src*='jednotky/1023.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/dread/black_knight.jpg');
    $("img[src*='jednotky/1024.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/dread/knight_darkness.jpg');
    $("img[src*='jednotky/1030.gif']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/dread/dark_prizrak.jpg');
    $("img[src*='jednotky/1034.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/dread/nekromant.jpg');
    $("img[src*='jednotky/1091.gif']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/dread/dread_vyvoleny.jpg');
    // Nemrtvý ledový kouzelník

    // Vulkan
    $("img[src*='jednotky/1091.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/vulkan/efreet.jpg'); 
    $("img[src*='jednotky/1100.gif']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/vulkan/fire_mage.jpg'); 
    $("img[src*='jednotky/1101.gif']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/vulkan/fire_arcimage.jpg');
    $("img[src*='jednotky/1191.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/vulkan/efreet.jpg'); 
    $("img[src*='jednotky/1110.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/vulkan/fire_golem.jpg');
    $("img[src*='jednotky/1111.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/vulkan/lava_golem.jpg'); 
    $("img[src*='jednotky/1112.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/vulkan/magma_golem.jpg'); 
    $("img[src*='jednotky/1120.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/vulkan/fenix.jpg');
    $("img[src*='jednotky/1121.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/vulkan/ice_fenix.jpg');
    $("img[src*='jednotky/1130.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/vulkan/flamekeeper.jpg');
    
    // ghoro
    $("img[src*='jednotky/2000.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/ghoro/goblin.jpg');
    $("img[src*='jednotky/2011.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/ghoro/goblin_bomb.jpg');
    td = $("table.text td:contains('Goblin s Prakem')").closest('tr').find('td').first();    td.find('br').remove();
    td.append('<img src="http://loi-help.nezmar.info/alt_images/units/ghoro/goblin_prak.jpg">');
    td = $("table.text td:contains('Goblin Fanatik')").closest('tr').find('td').first();    td.find('br').remove();
    td.append('<img src="http://loi-help.nezmar.info/alt_images/units/ghoro/goblin_fanatik.jpg">');
    td = $("table.text td:contains('Gobliní Exterminátor')").closest('tr').find('td').first();    td.find('br').remove();
    td.append('<img src="http://loi-help.nezmar.info/alt_images/units/ghoro/goblin_exterminator.jpg">');
    td = $("table.text td:contains('Goblin Pyroman')").closest('tr').find('td').first();    td.find('br').remove();
    td.append('<img src="http://loi-help.nezmar.info/alt_images/units/ghoro/goblin_pyroman.jpg">');
    td = $("table.text td:contains('Gobliní Vzducholoď')").closest('tr').find('td').first();    td.find('br').remove();
    td.append('<img src="http://loi-help.nezmar.info/alt_images/units/ghoro/goblin_airship.jpg">');
    td = $("table.text td:contains('Gobliní Sabotér')").closest('tr').find('td').first();    td.find('br').remove();
    td.append('<img src="http://loi-help.nezmar.info/alt_images/units/ghoro/goblin_saboter.jpg">');
    td = $("table.text td:contains('Gobliní Hrdina')").closest('tr').find('td').first();    td.find('br').remove();
    td.append('<img src="http://loi-help.nezmar.info/alt_images/units/ghoro/goblin_hrdina.jpg">');
    td = $("table.text td:contains('Gobliní Patriarcha')").closest('tr').find('td').first();    td.find('br').remove();
    td.append('<img src="http://loi-help.nezmar.info/alt_images/units/ghoro/goblin_patriarcha.jpg">');
    
    // crinis
    //$("img[src*='jednotky/2300.jpg']").attr('src', 'http://loi-help.nezmar.info/alt_images/units/ice_mag.jpg'); valecnik
    
    
}