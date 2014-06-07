// ==UserScript==
// @id             readable-google-reader
// @name           Readable Google Reader
// @namespace      http://leonid.shevtsov.me
// @author         Leonid Shevtsov
// @description    
// @version       0.2.1
// @include        https://www.google.com/reader/readable_settings
// @include        http://www.google.com/reader/readable_settings
// @include        https://www.google.com/reader/view/*
// @include        http://www.google.com/reader/view/*
// ==/UserScript==

var protocol = location.href.indexOf('https')==0 ? 'https' : 'http';

var widths = [
  ['Default', 'auto'],
  ['1200px', '1200px'],
  ['960px', '960px'],
  ['800px', '800px']
];

var font_families = [
  ['Georgia', 'Georgia, "Times New Roman", Times, serif'],
  ['Palatino', 'Palatino, serif'],
  ['Helvetica', 'Helvetica, "Helvetica Neue", Arial, sans-serif'],
  ['Corbel', 'Corbel, "Segoe UI", Tahoma, sans-serif']
];

var font_sizes = [
  ['12px', '12px'],
  ['14px', '14px'],
  ['16px', '16px'],
  ['18px', '18px'],
  ['20px', '20px'],
  ['24px', '24px']
];

var selected_width = GM_getValue('text_width', '1200px');
var selected_font_family = GM_getValue('font_family', font_families[0][1]);
var selected_font_size = GM_getValue('font_size', '16px');

function makeInputs(name, options, selected) {
  var i = 0;
  var result = '';
  for (i=0; i<options.length; ++i) {
    result += "<label><input type='radio' name='"+name+"' value='"+options[i][1]+"'"+(selected==options[i][1] ? ' checked' : '')+"> "+options[i][0]+"</label><br>"
  }
  return result;
}

function getRadiobuttonValue(name) {
  var i =0;
  var elements = document.forms[0].elements[name];
  for (i=0; i<elements.length; ++i) {
    if (elements[i].checked) return elements[i].value;
  }
  return '';
}

if (location.href.indexOf('google.com/reader/readable_settings') >= 0) {
  document.head.innerHTML = '<style>body {font-family: Georgia; margin: 0 auto; width: 500px;padding-top:100px}</style>';
  document.body.innerHTML = 
    "<h1>Readable Reader settings</h1>"+
    "<form id='readable_settings'>"+
      "<table width='500px' border='0'><tr><td width='33%' valign='top'>"+
      "<h2>Text width</h2>"+
      makeInputs('width', widths, selected_width)+
      "</td><td width='33%' valign='top'>"+
      "<h2>Font family</h2>"+
      makeInputs('font_family', font_families, selected_font_family)+
      "</td><td width='33%' valign='top'>"+
      "<h2>Font size</h2>"+
      makeInputs('font_size', font_sizes, selected_font_size)+
      "</td></tr><tr><td colspan='3' align='center'>"+
      "<input type='submit' value='Save'>"+
      " or <a href='"+protocol+"://www.google.com/reader/view'>cancel</a>"+
      "</td></tr></table>"+
    "</form>";
  document.title = 'Readable Reader settings';
  document.forms[0].addEventListener('submit', function(e) {
    e.preventDefault();
    GM_setValue('text_width',getRadiobuttonValue('width'));
    GM_setValue('font_family',getRadiobuttonValue('font_family'));
    GM_setValue('font_size',getRadiobuttonValue('font_size'));
    location.href = protocol+'://www.google.com/reader/view';
  });
} else {
  GM_addStyle('.card-content { width: '+selected_width+' !important; font-family: '+selected_font_family+' !important; font-size: '+selected_font_size+' !important; line-height: 1.5em; margin: 1.5em auto !important;}');
  var div = document.createElement('div');
  div.innerHTML = '<a href="'+protocol+'://www.google.com/reader/readable_settings">Readable Reader settings</a>';
  div.style.cssText = 'float: right';
  document.getElementById('viewer-top-controls').appendChild(div);
}
