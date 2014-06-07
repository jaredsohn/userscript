// ==UserScript==
// @name            QLRanks.com Donations Progress
// @version         0.2
// @homepage        http://www.esreality.com
// @description     Adds donations progess stats
// @author          ejjpi
// @include         http://qlranks.com/donate/
// @include         http://*.qlranks.com/donate/
// ==/UserScript==

var scripts = [
  '//ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js'
];

var numScripts = scripts.length, loadedScripts = 0;

function main() {
  jQuery.noConflict(); // if window.$ has been used by other libs
  jQuery(document).ready(function($) {
    var total = 0;
    var donors = 0;
    var $table = $('.left-third').find('table');
    $table.find('tr').each(function() {
      var valueCell = $(this).find('td').eq(1).text();
      if (isNaN(valueCell) || valueCell === '')
        return;
      total += parseFloat(valueCell);
      donors++;
    });
    $('.mid-third').find('.box').append("<div class='box'><h2>Donations Progress</h2><div style='background-color:#DDD;border-radius:5px;height:20px;margin:10px'><div id='donationProgress' style='background-color:#87C442;border-radius:5px;height:20px;'></div></div><ul style='display:inline-block;list-style-type:none;position:relative;left:35px;'><li style='float:left;margin:10px'><strong id='percent2' style='display:block;'></strong>FUNDED</li><li style='float:left;margin:10px'><strong id='total' style='display:block;'></strong>PLEDGED</li><li style='float:left;margin:10px'><strong><div id='donors' style='display:block;'></div></strong>DONORS</li></ul></div>");
    var percent = total >= 2400 ? 100 : parseInt(total * 100 / 2400);
    $('#donationProgress').width(percent + '%');
    $('#percent2').html(percent + '%');
    $('#total').html('&euro;' + parseInt(total));
    $('#donors').html(donors);
  });
}

var i, protocol = document.location.protocol;
for (i = 0; i < numScripts; i++) {
  var script = document.createElement("script");
  script.setAttribute("src", protocol + scripts[i]);
  script.addEventListener('load', function() {
    loadedScripts += 1;
    if (loadedScripts < numScripts) {
      return;
    }
    var script = document.createElement("script");
    script.textContent = "(" + main.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}