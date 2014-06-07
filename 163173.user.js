// ==UserScript==
// @name       E-Informatyk - oznaczanie nieaktywnych przedmiotów
// @namespace  http://maciejzysk.com
// @version    1.2
// @description  Naprawia gównianego moodle'a
// @match      http://e-informatyk.wsinf.edu.pl/*
// @copyright  2012+, You
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(function() {
  
    var przedmioty_nieaktywne = GM_listValues();
    var nazwa;
    var przedmioty = [];
    var przedmioty_nazwy = [];
    
    console.log(przedmioty_nieaktywne);
    
    $( ".unlist li" ).each(function( index ) {
        nazwa = $(this).children().children().children('.name').children('a').html();
        if(nazwa != undefined)
        {
            przedmioty.push($.trim(podmien(nazwa)));
            przedmioty_nazwy.push(nazwa);
            
            if($.inArray($.trim(podmien(nazwa)), przedmioty_nieaktywne) != -1)
            {
               $(this).css("opacity", "0.4");
               $(this).remove();
               $('.unlist').append($(this));
            }
        }
        
        
	});
    console.log(przedmioty);
    
    var content = "<div style='margin-bottom:10px;border:1px solid #e1e1e1;padding:5px;'><h3>Zarządzaj kursami</h3><h4>Zaznacz kursy, które chcesz ukryć na głównym ekranie.</h4>";
    
    $.each(przedmioty_nazwy, function(index, value) {
       if($.inArray($.trim(podmien(value)), przedmioty_nieaktywne) != -1)
           checkbox = "checked='checked'";
        else
            checkbox = "";
        content = content + "<div style='float:left;display:inline-block;margin: 0 10px 0 0;font-size:10px;'><input type='checkbox' class='przedmiot' value='"+$.trim(podmien(value))+"' name='przedmioty[]' id='"+$.trim(podmien(value))+"'"+checkbox+"/><label class='przedmiot_label' for='"+$.trim(podmien(value))+"'>"+value+"</label></div>";
    });
    content = content + "<div style='clear:both;height:1px;'></div><button style='float:right;' onClick='javascript:location.reload(true);'>przeładuj widok</button><div style='clear:both;height:1px;'></div>";
    
    $('.headingblock.header').after(content);
    
    $('.przedmiot').mousedown(function() {
        if (!$(this).is(':checked')) {
            GM_setValue($(this).val(), "on");
        }
        else
        {
            GM_deleteValue($(this).val(), "on");
        }
    });
    
    $('.przedmiot_label').mousedown(function() {
        if (!$(this).parent().children('input').is(':checked')) {
            GM_setValue($(this).parent().children('input').val(), "on");
        }
        else
        {
            GM_deleteValue($(this).parent().children('input').val(), "on");
        }
    });

    
    function podmien(napis)
    {
      napis=napis.replace("ę","e");
      napis=napis.replace("ó","o");
      napis=napis.replace("ą","a");
      napis=napis.replace("ś","s");
      napis=napis.replace("ł","l");
      napis=napis.replace("ż","z");
      napis=napis.replace("ź","z");
      napis=napis.replace("ć","c");
      napis=napis.replace("ń","n");
      napis=napis.replace("(","");
      napis=napis.replace(")","");
      napis=napis.replace(/\s+/g, '');
      return napis.toLowerCase();
    }
    
    GM_log(GM_listValues());
    
});
