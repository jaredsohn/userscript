// ==UserScript==
// @name          Flickr Pixaco Order
// @namespace     http://cgommel.de
// @include       http://www.flickr.com/photos/*/*
// @description	  Gives Germans an option to order flickr pictures from pixaco.de
// ==/UserScript==
// Changelog:
// Inspired by the View Multi Sizes script I wrote a script that uses the 

(function() {
  var test = document.getElementById('button_bar');
  if(!test) return;

  //get image id
  var divs, imgId;
  divs = document.getElementsByTagName('div');
  for(i = 0; i < divs.length; i++) {
    if(divs[i].hasAttribute('id') && divs[i].id.match(/photoImgDiv/)) {
      imgId = divs[i].id.match(/\d+/);
    }
  }
  //make span
  var imgSizes, newSpan;
  imgSizes = document.getElementById('photo_gne_button_print');
  newSpan = document.createElement('span');
  imgSizes.parentNode.insertBefore(newSpan, imgSizes);
  newSpan.appendChild(imgSizes);
 if(unsafeWindow) w = unsafeWindow;
    else w = window;
    global_photos = w.global_photos;
    
  //insert menu
  var sizeMenu = document.createElement('div');
      sizeMenu.setAttribute('id', 'allSizes');
      sizeMenu.innerHTML = (
        '<img src="http://images.pixaco.com/pixaco_88_31.gif" alt="pixaco"'+
        '<br/><img src="http://ad.zanox.com/ppv/?3448332C1220810376" align="bottom" width="1" height="1" border="0" hspace="1"/>Format w&auml;hlen:'+
        '<ul>' +                       
        '<li><a href="#" onclick="'+"javascript:window.open('http://ad.zanox.com/ppc/?3448332C1220810376T&ULP=[[&smm=cookie&cmd=addimage&url0=http://static.flickr.com/"+ global_photos[imgId].server+'/'+imgId+'_'+global_photos[imgId].secret+"_o_d.jpg&productid=1]]','popup','width=310,height=250, menubar=no,status=no,scrollbars=no,resizable=yes,left=50,top=50')"+';">Foto 9x13</a></li>'+
        '<li><a href="#" onclick="'+"javascript:window.open('http://ad.zanox.com/ppc/?3448332C1220810376T&ULP=[[&smm=cookie&cmd=addimage&url0=http://static.flickr.com/"+ global_photos[imgId].server+'/'+imgId+'_'+global_photos[imgId].secret+"_o_d.jpg&productid=2]]','popup','width=310,height=250, menubar=no,status=no,scrollbars=no,resizable=yes,left=50,top=50')"+';">Foto 10x15</a></li>'+
        '<li><a href="#" onclick="'+"javascript:window.open('http://ad.zanox.com/ppc/?3448332C1220810376T&ULP=[[&smm=cookie&cmd=addimage&url0=http://static.flickr.com/"+ global_photos[imgId].server+'/'+imgId+'_'+global_photos[imgId].secret+"_o_d.jpg&productid=8]]','popup','width=310,height=250, menubar=no,status=no,scrollbars=no,resizable=yes,left=50,top=50')"+';">Foto 11x17</a></li>'+
        
        '<li><a href="#" onclick="'+"javascript:window.open('http://ad.zanox.com/ppc/?3448332C1220810376T&ULP=[[&smm=cookie&cmd=addimage&url0=http://static.flickr.com/"+ global_photos[imgId].server+'/'+imgId+'_'+global_photos[imgId].secret+"_o_d.jpg&productid=4]]','popup','width=310,height=250, menubar=no,status=no,scrollbars=no,resizable=yes,left=50,top=50')"+';">Foto-Poster 20x30</a></li>'+
        '<li><a href="#" onclick="'+"javascript:window.open('http://ad.zanox.com/ppc/?3448332C1220810376T&ULP=[[&smm=cookie&cmd=addimage&url0=http://static.flickr.com/"+ global_photos[imgId].server+'/'+imgId+'_'+global_photos[imgId].secret+"_o_d.jpg&productid=5]]','popup','width=310,height=250, menubar=no,status=no,scrollbars=no,resizable=yes,left=50,top=50')"+';">Foto-Poster 30x45</a></li>'+
        '<li><a href="#" onclick="'+"javascript:window.open('http://ad.zanox.com/ppc/?3448332C1220810376T&ULP=[[&smm=cookie&cmd=addimage&url0=http://static.flickr.com/"+ global_photos[imgId].server+'/'+imgId+'_'+global_photos[imgId].secret+"_o_d.jpg&productid=6]]','popup','width=310,height=250, menubar=no,status=no,scrollbars=no,resizable=yes,left=50,top=50')"+';">Foto-Poster 40x60</a></li>'+
        '<li><a href="#" onclick="'+"javascript:window.open('http://ad.zanox.com/ppc/?3448332C1220810376T&ULP=[[&smm=cookie&cmd=addimage&url0=http://static.flickr.com/"+ global_photos[imgId].server+'/'+imgId+'_'+global_photos[imgId].secret+"_o_d.jpg&productid=7]]','popup','width=310,height=250, menubar=no,status=no,scrollbars=no,resizable=yes,left=50,top=50')"+';">Foto-Poster 50x75</a></li>'+        
        '</ul>'
      );     
  newSpan.appendChild(sizeMenu);
  //add stylesheet for the menu
  var head, style;
  head = document.getElementsByTagName('head')[0];
  style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = (
    '#allSizes {' +
    '  display: none;' +
    '  background-color: #ffffff;' +
    '  border: 1px solid #000000;' +
    '  -moz-border-radius: 0;' +
    '  position: absolute;' +
    '  margin-left: -49px;' +
    '  margin-top: 24px;' +
    '  padding-top: 3px;' +
    '  padding-left: 3px;' +
    '  padding-right: 3px;' +
    '}' +
    
    '#button_bar > span:hover > #allSizes {' +
    '  display: inline;' +
    '}' +
    
    '#allSizes ul {' +
    '  list-style: none;' +
    '  padding: 0 1em;' +
    '}' +
    
    '#allSizes a {' +
    '  display: block;' +
    '}'
  );
  head.appendChild(style);

})();
