// ==UserScript==
// @name           lnk.ms url decoder
// @description    lnk.ms url decoder
// @include        http://home.myspace.com/*
// @include        http://www.myspace.com/*
// @include        http://friends.myspace.com/*
// @include        http://profile.myspace.com/*
// ==/UserScript==

// this will create mouseover/mouseout events for lnk.ms hrefs on MySpace 
// the full url will show like a title tag, hopefully somewhere near the actual link.

var lnks = new Object();

function lnkms_decoder_init(element) {
  lnks_all = element.getElementsByTagName("a");
  lnks_len = lnks_all.length;

  for (var i=0; i < lnks_len; i++) {
    if (lnks_all[i].href.slice(0,14) == "http://lnk.ms/") {
      var id = lnks_all[i].href.slice(14,19);
      var a = lnks_all[i];
      a.id = id;

      // will hold the span element after lazy loading of the image
      lnks[id] = 0;
      
      var span = document.createElement("span");
      span.id = id+"_span"
      span.style.display = "none";
      span.style.position = "absolute";
      span.style.background = "#cbdef3";
      span.style.padding = "2px";
      span.style.border = "1px solid #999999";
      span.style.zindex = 100;
      a.parentNode.appendChild(span);

      a.addEventListener('mouseover',function (e) {
        var i = this.id;
        if (!lnks[i]) {
          lnks[i] = document.getElementById(i+"_span");
          // height is 13 to override div.basicInfoDetails.img.height of 15 
          lnks[i].innerHTML = '<img height="13" id="'+i+
                              '_img" src="http://lnk.ms/decode/'+i+'.png">';
          this.parentNode.appendChild(lnks[i]);
          lnks[i].style.marginLeft = (this.offsetLeft-(this.offsetWidth/2)-
                                   (lnks[i].childNodes[0].width / 2)) + "px";
        }

        lnks[i].style.display = "block";
      },false);

      a.addEventListener('mouseout',function (e) {
        lnks[this.id].style.display = "none";
      },false);
    } // if lnk.ms href
  } // for
} //lnks_decoder_init

// http://friends.myspace.com/index.cfm?fuseaction=profile.friendmoods
var fstatus = document.getElementById("Statusleft")
// http://home.myspace.com/index.cfm?fuseaction=user
var ustatus = document.getElementById("userstatus")
// http://www.myspace.com/vanity
// http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&friendid=
// div.basicInfoDetails.img.height of 15 conflics with the img's 13 
var basicinfo = document.getElementById("modulebasicInfo");
var row0  = document.getElementById("row0");
var row1  = document.getElementById("row1");
var row2  = document.getElementById("row2");

if (fstatus) lnkms_decoder_init(fstatus); 
if (ustatus) lnkms_decoder_init(ustatus); 
if (basicinfo) lnkms_decoder_init(basicinfo); 
if (row0) lnkms_decoder_init(row0); 
if (row1) lnkms_decoder_init(row1); 
if (row2) lnkms_decoder_init(row2);