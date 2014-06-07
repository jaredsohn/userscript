// ==UserScript==
// @name         GR.jQ (PlanetRomeo/GayRomeo meets jQuery)
// @description  Enlarge profile images (in search results and profile)
// @match        http://www.gayromeo.com/*
// @match        http://www.planetromeo.com/*
// @match        http://83.98.143.20/*
// @match        https://www.gayromeo.com/*
// @match        https://www.planetromeo.com/*
// @match        https://83.98.143.20/*
// @version      1.4
// @icon         http://www.planetromeo.com/v1/img/touch-icon.png
// ==/UserScript==


// from http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", self.location.protocol + "//code.jquery.com/jquery-1.10.2.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

addJQuery(function() {
  // img for big image in upper right corner
  var big_img = $('<img id="bigimg">').css({
    'top': '0',
    'right': '0',
    'position': 'fixed',
    'max-width': '90%',
    'max-height': '90%'
  }).hide().appendTo($('body'));
  // upper left corner for profile views
  $('body.setcard #bigimg, body.mainPage #bigimg').css({
    'right': 'auto',
    'left': '0',
    'z-index': '100'
  });

  // for each thumb: load popup page containing the href to full-sized image, attach mouseover/mouseout
  $('img.thumb').each(function(seq, img) {
    var img_src = img.src.match(/[^\/]+\.jpg/);
    if (!img_src) return;
    var img_id = self.location.protocol + '//' + self.location.host + '/auswertung/pix/popup.php/' + img_src[0];
    $.ajax({
      url: img_id,
      cache: true
    }).done(function(i) {
      $(img).mouseover(function() {
        big_img.attr('src', $(i).find('img')[0].src).show();
      }).mouseout(function() {
        big_img.hide();
      });
    });
  });

  // doubleclick on profileHead closes profile window
  $('.profileHead').attr('title', 'Double-click to close window').dblclick(function() {
      window.close();
  });
});
