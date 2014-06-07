// ==UserScript==
// @name           Dumpert pagination
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @namespace      achmad.abed
// @include        dumpert.nl/filmpjes/
// @include        www.dumpert.nl/filmpjes/
// @include        http://dumpert.nl/filmpjes/
// @include        http://www.dumpert.nl/filmpjes/
// ==/UserScript==
var pageNr = 1;
var top = $('#uploadcontainer').height();
var w = $(window);

$('.catoverview').append('<img id="loadCircle" src="http://www.amitsati.net/wp-content/uploads/2011/05/arrow-down.gif" style="width:25px;height:25px;position:relative;left:450px;"></img>');
$('.catoverview').append('<div id="result" style="display:hidden"></div>');

$('#result').hide();

$('#uploadcontainer').css('vertical-align', 'bottom');
$('#uploadcontainer').css('position', 'relative');


function loadNextPage() {
    $('#loadCircle').show();

    if ($('.catoverview').find('#filmpjes' + pageNr).length > 0) return;

    $('.catoverview').append('<span id="' + "filmpjes" + pageNr + '" class="item" style="height:15px;'+
    			'font-weight:bold; width:965px; margin-bottom:10px; text-align:center">Filmpjes ' + pageNr + '</span>');

    $('#result').load(window.location + pageNr + '/ #tagcontainer', function() {
        var container = $('#uploadcontainer');

        $('#result').find('.item').each(function(i, v) {
            $('.catoverview').append(v);
        });
        
        $('#loadCircle').hide();
        container.css('top', $('.catoverview').height());

        pageNr++;
    });

    top = $('.catoverview').height();
}

w.scroll(function() {
    var scrollY = w.scrollTop() + w.height();
    
    if (scrollY > parseInt($('#uploadcontainer').css('top')) + 150) {
        loadNextPage();
    }
});