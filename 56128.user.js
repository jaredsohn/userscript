// ==UserScript==
// @name           werwer
// @namespace      
// @description    rweerwrew
// @copyright      rewre
// @version        0.1
// @include        http://game*.margonem.pl/*
// @exclude        http://game8.margonem.pl/*
// ==/UserScript==


// Add jQuery

jQuery('<div id="dod1">Kliknij aby wybrać outfit</div>').css({position: 'relative', top: '2mm', left: '2mm', background: 'blue', border: '1px black solid', float: 'left', padding: '3px', fontWeight: 'bold', zIndex: 369}).click(function() { $("#dod1menu").show("fast"); }).appendTo("body"); 
jQuery('<div id="dod1menu">Wybierz outfit:<br><div id=dod1duch>- Duch</div><div id=dod1wiatr>- Żywioł Powietrza</div><div id=dod1ziemia>- Żywioł Ziemi</div><div id=dod1woda>- Żywioł Wody</div><div id=dod1ogien>- Żywioł Ognia</div><div id=dod1roan>- Roan</div><div id=dod1foka>- Foka</div><div id=dod1król>- Król</div><div id=dod1kapitan>- Kapitan</div><div id=dod1farmer>- Farmer</div><div id=dod1diabeł>- Diabeł</div><div id=dod1kucharz>- Kucharz</div><div id=dod1klaun>- Klaun</div><br><button id=dod1close>Schowaj Outfity</button></div>').css({position: 'fixed', top: '50px', right: '100px', background: 'blue', border: '1px black solid', float: 'left', padding: '3px', fontWeight: 'bold', zIndex: 1000}).appendTo("body").hide(); 
$("#dod1duch").click(function() { $("#hero").css({background: 'url(http://i32.tinypic.com/9qd3kx.jpg)'}); }); 
$("#dod1diabeł").click(function() { $("#hero").css({background: 'url(http://i26.tinypic.com/2d8hmpd.jpg)'}); }); 
$("#dod1klaun").click(function() { $("#hero").css({background: 'url(http://i30.tinypic.com/2u8hqhs.jpg)'}); }); 
$("#dod1kucharz").click(function() { $("#hero").css({background: 'url(http://i26.tinypic.com/9fmk46.jpg)'}); }); 
$("#dod1farmer").click(function() { $("#hero").css({background: 'url(ht'+'tp://'+'i28.tinypic.com/347xuty.jpg)'}); }); 
$("#dod1kapitan").click(function() { $("#hero").css({background: 'url(http://i26.tinypic.com/5z2yd5.jpg)'}); }); 
$("#dod1król").click(function() { $("#hero").css({background: 'url(http://i27.tinypic.com/9qfacx.jpg)'}); }); 
$("#dod1foka").click(function() { $("#hero").css({background: 'url(http://i30.tinypic.com/15i2sqv.jpg)'}); }); 
$("#dod1roan").click(function() { $("#hero").css({background: 'url(http://i31.tinypic.com/2rorofl.jpg)'}); }); 
$("#dod1ogien").click(function() { $("#hero").css({background: 'url(http://i25.tinypic.com/svo3h4.jpg)'}); }); 
$("#dod1woda").click(function() { $("#hero").css({background: 'url(http://i28.tinypic.com/15wc4te.jpg)'}); }); 
$("#dod1ziemia").click(function() { $("#hero").css({background: 'url(http://i26.tinypic.com/ok5w12.jpg)'}); }); 
$("#dod1wiatr").click(function() { $("#hero").css({background: 'url(http://i25.tinypic.com/atvf9z.jpg)'}); }); 
$("#dod1close").click(function() { $("#dod1menu").hide("fast"); });