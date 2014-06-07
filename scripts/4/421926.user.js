// ==UserScript==
// @name       WIMPlus
// @namespace  http://hcweb.dk/
// @version    0.1
// @description  Resizes video player on http://wimp.com/
// @match      http://wimp.com/*
// @include      http://*.wimp.com/*
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}
function main(){
    $(document).ready(function()
                      {
                          setTimeout(function(){
                              /*$('.fluid_types').val('Liquid');
                              $('.fluid_types').triggerHandler('change');
                              setTimeout(function(){
                                  $('.fluids').val('Ammonia');
                              },500);*/
                              $('.fluid_types').triggerHandler('change');
                              $('.flow_unit_1').val('lb');
                              $('.flow_unit_2').val('sec');
                              $('.min_flow').val(1);
                              $('.nom_flow').val(2);
                              $('.max_flow').val(8);
                              $('.min_temp').val(280);
                              $('.nom_temp').val(280);
                              $('.max_temp').val(280);
                              //$('.min_press').val(10);
                              //$('.nom_press').val(10);
                              //$('.max_press').val(20);
                              setTimeout(function(){
                                  $('#button_calc').triggerHandler('click');
                                  setTimeout(function(){
                                      $('.icon_size').triggerHandler('click');
                                  },500);
                              },500);
                          },2000);
                      });
}

// load jQuery and execute the main function
addJQuery(main);

function addSocials(callback) {
    var twitter = document.createElement("script");
    twitter.setAttribute("src", "https://jquery-twitterbutton-js.googlecode.com/files/jquery.twitterbutton.1.1.js");
    document.head.appendChild(twitter);
    
    var gplus = document.createElement("script");
    gplus.setAttribute("src", "https://jquery-gplusone-js.googlecode.com/files/jquery.gplusone.1.1.js");
    document.head.appendChild(gplus);
}

var d = document;

var embedcode = d.getElementById('player');
var embed = embedcode.getElementsByTagName('embed');

embed[0].height = 700;
embed[0].width = 1000;

if(d.getElementById('url') != null)
{
    var InfoUrl = d.getElementById('url').value;
    var reper = d.getElementById('url');
    var parinte = reper.parentNode;
    var link = d.createElement('a');
    link.href = InfoUrl;
    link.target = '_blank';
    link.textContent = InfoUrl;
    if(reper) { parinte.insertBefore(link, reper);}
    reper.style.display = 'none';
}

function goToPlayer() {
	d.getElementsByTagName('table')[8].getElementsByTagName('td')[2].getElementsByTagName('a')[0].setAttribute('name', 'play');
//	embedcode.setAttribute("name","play");
	window.location.assign(location.pathname + "#play");
}

/*
(function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    document.head.appendChild(po);
})();	
var gButton = d.createElement("div");
gButton.setAttribute("class","g-plusone");
gButton.setAttribute("id","gButton");
var br = d.createElement("br");
$('body');
d.getElementById("maintable").$('td')[1].appendChild(gButton);
$("<br>").insertAfter(d.getElementById("maintable").getElementsByTagName('td')[1].getElementsByTagName('table')[0]);
*/

//Twitter
!function(d,s,id){
    var js,fjs=d.getElementsByTagName(s)[0],
        p=/^http:/.test(d.location)?'http':'https';
    if(!d.getElementById(id)){
        js=d.createElement(s);
        js.id=id;
        js.src=p+'://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js,fjs);
    }
}(document, 'script', 'twitter-wjs');

$(document).ready(function () {
  $('#gplusone').gplusone();
});


var tButton = d.createElement("a");
tButton.setAttribute("href","https://twitter.com/share");
tButton.setAttribute("class","twitter-share-button");
tButton.setAttribute("data-size","large");
tButton.setAttribute("id","tButton");
$(' <a href="https://twitter.com/share" class="twitter-share-button">Tweet</a> ').insertBefore(" .like-button ");

window.onload = goToPlayer();
