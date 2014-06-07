// ==UserScript==
// @name Google Append Links
// @author FaktorX
// @version 6.2
// @include https://www.google.*
// @include https://translate.google.*
// @require http://code.jquery.com/jquery-2.1.0.min.js
// ==/UserScript==
$('<style>',{
    text:'a.c{color:#404040;text-decoration:none;padding:4px 0 0 15px;}'+
         'a.c:hover{color:#000;text-decoration:underline;}'+
         '#b{color:#333;text-decoration:none;padding:0 8px;margin-right:0;float:right;cursor:pointer;}'
}).appendTo('head');
$('#gb').children().eq(0).children().eq(0).children().eq(0).append(
    '<a class="c" id="w">Web</a>'+
    '<a class="c" id="i">Obrázky</a>'+
    '<a class="c" id="t">Prekladač</a>'+
    '<a class="c" id="y">YouTube</a>'
).mousemove(function(){
    var v=$('#gbqfq,#lst-ib,#source').val();
    $('#w').attr('href',v==0?'//google.sk':'//google.sk/#q='+v);
    $('#i').attr('href',v==0?'//google.sk/imghp':'//google.sk/search?tbm=isch&q='+v);
    $('#t').attr('href',v==0?'//translate.google.sk':'//translate.google.sk/#sk/en/'+v);
    $('#y').attr('href',v==0?'//youtube.com':'//youtube.com/results?search_query='+v); 
});
location.pathname=='/imghp'?$('#i').remove():location.host.substring(0,9)=='translate'?$('#t').remove():$('#w,#i').remove();
$('#hplogo').children().attr('id')==undefined?$('#hplogo').children().remove():'';
$('#gt-lang-right').append('<div id="b" class="jfk-button-standard jfk-button trans-swap-button">Vyhladať</div>');
$('#b').click(function(){
    var h=$('#result_box').html().replace(/<span class="hps">|<\/span>/g,'');
    location.href=h==0?'//google.sk':'//google.sk/#q='+h;
});