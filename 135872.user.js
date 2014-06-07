// ==UserScript==
// @name        le meilleur coin
// @namespace   meilleurcoin
// @description améliore leboncoin
// @include     *.leboncoin.fr/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version     1
// ==/UserScript==









//--- This handles both page-load delays, and AJAX changes.
//alert("");

//http://maps.googleapis.com/maps/api/directions/json?origin=Boston,MA&destination=Concord,MA&waypoints=Charlestown,MA|Lexington,MA&sensor=false


//var obj = jQuery.parseJSON('{"name":"John"}');


GM_xmlhttpRequest({method: "GET", url: "http://maps.googleapis.com/maps/api/directions/json?origin=lille&destination=paris&region=fr&sensor=false", onload: function(response) {
    alert(response.responseText);
  }
  
});

/*
*/

//alert($.load('http://maps.googleapis.com/maps/api/directions/json?origin=lille&destination=paris&region=fr&sensor=false'));       



	

//alert content;

//alert (obj);



//alert(obj.name);

$('.background').hide();

$('.oas-top').hide();

$('.gallery-zone').hide();

$('.google').hide();

$('div.list-ads div.clear').remove();

$('div.ad-lbc').css('border-top', "0px");
$('div.ad-lbc').css('position', 'relative');

//$('div.detail').remove();

$('a').has('div').css('display', 'inline-block');
$('a').has('div').css('position', 'relative');
$('a').has('div').css('width', '200');
$('a').has('div').css('height', '120');


$("div.image").css('position', 'absolute');
$("div.image").css('top', '0');
$("div.image").css('left', '0');

$("div.detail").css('position', 'absolute');
$("div.detail").css('top', '0');
$("div.detail").css('left', '0');

$("div.placement").css('background', 'yellow');

$("div.placement").css('width','150');

$("div.price").css('color', 'Redding');
$("div.price").css('height', '14');
$("div.price").css('font-size', '12');


$('div.image-and-nb').height(120);

/*
$('div.detail').css('display', 'inline');
$('div.detail').css('position', 'absolute');
$('div.detail').css('top', '10');
$('div.detail').css('left', '10');
*/
$('div.ad-lbc .date').remove();

$('div.ad-lbc .title').remove();
$('div.ad-lbc .category').remove();

$('div.page_width').width("100%");

//$('div.detail').remove();

$('div.list-ads').width("100%");

$('div.list-ads').css('float','right');
$('div.list-ads').css('display','inline-block');

//$('div.content-color').remove();

$('div#page_width').css('padding','0 0');

$('div.image').height(120);
//$('div.image').width('');



$('div.content-color').append("<div class=toto></div>");

//$.load('http://www.leboncoin.fr/annonces/offres/nord_pas_de_calais/?o=2'));



//$('div.list-ads').load('http://www.leboncoin.fr/annonces/offres/nord_pas_de_calais/?o=2');


/*
$.get('ajax/test.html', function(data) {
  $('.result').html(data);
  alert('Load was performed.');
});

*/

(function(open) {

    XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {

        this.addEventListener("readystatechange", function() {
            console.log(this.readyState);
        }, false);

        open.call(this, method, url, async, user, pass);
    };

})(XMLHttpRequest.prototype.open);

