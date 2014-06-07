// ==UserScript==
// @name          DHTML Lemmings Codes
// @namespace     http://loucypher.wordpress.com/
// @include       http://elizium.nu/scripts/lemmings/*
// @description	  Automatically insert codes when select a level
// ==/UserScript==

window.setTimeout(function() {
  var docTitle = document.getElementsByTagName('h1')[0];
  if(!docTitle) return;

  var levels = [
    'lvl1', 'lvl2', 'lvl3', 'lvl4', 'lvl5',
    'lvl6', 'lvl7', 'lvl8', 'lvl9', 'lvl10'
  ]

  var funCodes = [
    'BAJHLDHBCL', 'IJJLDLCCCL', 'NJLDLCADCY', 'HNLHCIOECW', 'LDLCAJNFCK',
    'DLCIJNLGCT', 'HCAONNLHCX', 'CINNLDLICJ', 'CEJHMDLJCN', 'IKHMDLCKCT'
  ]

  var trickyCodes = [
    'HCENNONPDW', 'CIOLMFLQDU', 'CAJJDLMBEV', 'MKJNLICCEJ', 'NHLDMCEDEN',
    'HLDMCIOEET', 'LDMCAJNFEN', 'DICMJNNGEY', 'MCENLLDHEV', 'CMNLLDMIEO'
  ]

  var taxingCodes = [
    'ONICAJNNFP', 'FMCIKLMOFR', 'ICENNONPFJ', 'CINNMFMQFY', 'GEJJNDHBGM',
    'MJJNLHGCGN', 'NHNKHGADGU', 'HLDLGIOEGY', 'LDLGAJNFGS', 'DLGIJNLGGL'
  ]

  var mayhemCodes = [
    'NJMFLGALHM', 'JONHGINMHL', 'ONHGEKNNHJ', 'FLGIJNMOHX', 'HGAOLMNPHX',
    'GINNONHQHT', 'GAJJLDMBIN', 'IJHLDMGCIU', 'NHLDMGADIR', 'HLDMGIOEIL'
  ]

  var rating = docTitle.lastChild.nodeValue;
  switch(rating) {
    case 'fun':
      var codes = funCodes;
      break;
    case 'tricky':
      var codes = trickyCodes;
      break;
    case 'taxing':
      var codes = taxingCodes;
      break;
    case 'mayhem':
      var codes = mayhemCodes;
      break;
  }

  for(var i = 0; i < levels.length; i++) {
    var level = document.getElementById(levels[i]);
    level.setAttribute('onclick',
      level.getAttribute('onclick') + '; ' +
      'document.getElementById(\'code\').value=\'' +
      codes[i] + '\'');
  }
});

