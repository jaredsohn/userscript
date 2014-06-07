// ==UserScript==
// @name           Remax to Map
// @namespace      http://userscripts.org/users/53471
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://www.remax-oa.com/*
// ==/UserScript==

var clipSet = function(textToCopy) {
  try {
    var tc = textToCopy.replace(/\n\n/g, '\n');
    unsafeWindow.netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
    const clipboardHelper = Components.classes
        ["@mozilla.org/widget/clipboardhelper;1"].
        getService(Components.interfaces.nsIClipboardHelper);
    clipboardHelper.copyString(tc);
  } catch(err) {
    err = String(err);
    var msg = 'The text you need to paste into the Google Maps waypoint is below.\n';
    if (err.indexOf('UniversalXPConnect') >= 0) {
      msg += 'I tried to copy it to your clipboard, but was denied access.\n';
      //msg += err + '\n';
    } else {
      msg += err + '\n';
    }
    msg += textToCopy;
    alert(msg);
  }
}

var el = function(id) {
  return document.getElementById(id);  
}

var clt = function(cl, idx) {
  if (idx == undefined) idx = 0;
  var matches = document.getElementsByClassName(cl);
  if (idx > matches.length - 1) return '';
  return matches[idx].textContent;
}

var textAfterLabel = function(label, idx) {
  if (idx == undefined) idx = 0;
  var filter = 'div.grid_label:contains("' + label + '")';
  var result = jQuery(filter);
  if (result != null) {
    result = result.next();
    if (result != null) {
      if (result.length >= 0) {
        result = result[0];
        if (result != undefined) {
          return result.textContent;
        }        
      }
    }
  }
  return '';
}

var getImages = function() {
  var imgs = new Array();
  for (var i = 1; i < 30; i++) {
    var img = document.getElementById('listingThumbnail' + i);
    if (img == null || img == undefined) {
      return imgs;
    } else {
      imgs.push(img.getAttribute('src'));
    }
  }
}

var addDiv = function(html, content) {
  return html + '\n<div dir="ltr">' + content + '</div>';
}

var addHeadered = function(html, labelcontent) {  
  var inner = '';
  for (var i = 0; i < labelcontent.length; i+=2) {
    if (i > 0) inner += '&nbsp;&nbsp;&nbsp;';
    inner += '<b>' + jQuery.trim(labelcontent[i]) + ':</b> ' + jQuery.trim(labelcontent[i+1]);
  }
  return addDiv(html, inner);
}

var addBlankLine = function(html) {
  return html + '\n<div>&nbsp;</div>';
}

var btnClick = function() {
  var address = clt('street-address', 0);
  var city = clt('locality');
  var prov = clt('region');
  var postal = clt('postal-code');
  var mls = clt('standardTextFont text_mls', 2);
  var price = el('propTitlePrice').childNodes[1].textContent;
  var bedrooms = textAfterLabel('Bedrooms:');
  var bathrooms = textAfterLabel('Bathrooms:');  
  var age = textAfterLabel('Age/Yr. Built:');
  var propsize = textAfterLabel('Property Size:');
  var taxes = textAfterLabel('Taxes:');
  var parking = textAfterLabel('Parking Spaces:');
  var basement = textAfterLabel('Basement:');
  var heating = textAfterLabel('Heating/Fuel Desc:');
  var cooling = textAfterLabel('Cooling:');
  var features = textAfterLabel('Features:');
  var blurb = clt('propDescText propDescArea');
  var agent = el('ctl00_ctl02_g_3a5713af_24bd_4bd5_a1b6_4109e531eecb_ctl00_propertyDetails_firstAgentName').textContent;  
  var phone = el('ctl00_ctl02_g_3a5713af_24bd_4bd5_a1b6_4109e531eecb_ctl00_propertyDetails_propOfficeAddress').innerHTML;
  if (phone != null && phone.lastIndexOf('<br>') > 0) {
    phone = phone.substr(phone.lastIndexOf('<br>') + 4);
  }
  
  /* // FOR TESTING
  var text =
      address + ', ' + city + ', ' + prov + ', ' + postal + '\n' +
      mls + ', ' + price + ', Taxes: ' + taxes + '\n' +
      bedrooms + ' BR, ' + bathrooms + ' Baths, ' + parking + ' Park' + '\n' +
      'Basement: ' + basement + '\n' +
      'Heating: ' + heating + '\n' +
      'Cooling: ' + cooling + '\n' +
      'Features: ' + features + '\n' +
      blurb + '\n\n' +
      'Agent: ' + agent + ', ' + phone;
  alert(text);
  */
    
  var mlslink = '<a href="' + window.location + '" target="_blank">' + mls + '</a>';
  
  var images = getImages(); var imagesHtml = '';
  for (var i = 0; i < images.length; i++) {
    imagesHtml = addDiv(imagesHtml, '<a href="' + images[i] + '" target="_blank"><img src="' + images[i] + '" style="width:285px"></a>');
    imagesHtml = addBlankLine(imagesHtml);
  }
  
  var notes = unsafeWindow.prompt('Enter any ad-hoc notes you want to include in the waypoint', '');
  
  var html = '';
  html = addHeadered(html, ['MLS', mlslink, 'Price', price]);
  html = addHeadered(html, ['Tax', taxes, 'Age', age]);
  html = addHeadered(html, ['Property', propsize]);
  html = addHeadered(html, ['Bed', bedrooms, 'Bath', bathrooms, 'Parking', parking]);  
  html = addHeadered(html, ['Basement', basement]);
  html = addHeadered(html, ['Heat', heating]);
  html = addHeadered(html, ['Cool', cooling]);
  html = addBlankLine(html);
  html = addDiv(html, notes);
  html = addBlankLine(html);
  html += imagesHtml;
  html = addDiv(html, '<b>Features / blurb:</b>');
  html = addDiv(html, features);
  html = addDiv(html, blurb);
  html = addBlankLine(html);
  html = addHeadered(html, ['Agent', agent]);
  html = addHeadered(html, ['Phone', phone]);
  
  clipSet(html);

}

var main = function() {
  var sibling = document.getElementById('QR').parentNode.parentNode;
  var tr = document.createElement('TR');
  var td = document.createElement('TD');
  td.setAttribute('style', 'position:relative; text-align:center;');
  var btn = document.createElement('BUTTON');
  btn.setAttribute('type', 'button');
  btn.innerHTML = 'Copy Waypoint HTML';
  td.appendChild(btn);
  tr.appendChild(td);
  sibling.parentNode.appendChild(tr);
  btn.addEventListener('click', btnClick, false);
}

main();


/*

Tried both of these; neither worked.
Also tried attaching copy function to unsafeWindow.

To allow access to clipboard, create user.js file in directory:

C:\Users\Richard\AppData\Roaming\Mozilla\Firefox\Profiles\<profileid>.default

with contents:

user_pref("capability.policy.policynames", "allowclipboard");
user_pref("capability.policy.allowclipboard.sites", "http://www.example.com");
user_pref("capability.policy.allowclipboard.Clipboard.cutcopy", "allAccess");
user_pref("capability.policy.allowclipboard.Clipboard.paste", "allAccess");

OR, install clipboard helper extension from:

https://addons.mozilla.org/en-US/firefox/addon/allowclipboard-helper/

*/
