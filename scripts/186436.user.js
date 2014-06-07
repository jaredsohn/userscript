// ==UserScript==
// @name          Toggle HF Banner
// @namespace     http://diseasehf.us/
// @description   HackForums mod to allow the permanent toggling of the banner off and on.
// @include       http://*hackforums.net*
// @version       1.0.2
// ==/UserScript==

function HideLogo ()
{
  this.div      = document.createElement('div');
  this.img      = document.createElement('img');
  this.logo_div = document.getElementsByClassName('logo')[0];
  this.logo     = this.logo_div.getElementsByTagName('img')[0];
}

HideLogo.prototype = {
  
  init: function () {
    if (document.cookie.match(/hidelogo=true/))
      this.hide_logo();

    this.create_col_button ();
  },

  hide_logo: function () {
    this.logo.style.display = 'none';
  },

  create_col_button: function () {
    this.div.className    = 'expcolimage';
    this.div.style.cursor = 'pointer';
    this.img.src          = 'http://x.hackforums.net/images/modern_bl/collapse_collapsed.gif';
    this.img.id           = 'logo_img';
    this.img.className    = 'expander';
    this.img.alt          = '[-]';
    this.img.title        = '[-]';

    var logo_img = this.logo;

    this.div.onclick = function () {
      var exprDate = new Date();
      exprDate.setFullYear(exprDate.getFullYear() + 1);


      if (document.cookie.match(/hidelogo=true/)) {
        document.cookie = 'hidelogo=false; expires=' + exprDate.toGMTString() + ';';
      } else {
        document.cookie = 'hidelogo=true; expires=' + exprDate.toGMTString() + ';';
      }

      logo_img.style.display = (logo_img.style.display == 'none') ? '' : 'none';
    }

    this.div.appendChild(this.img);
    this.logo_div.appendChild(this.div);
  }

}

var hide_logo = new HideLogo;
hide_logo.init();