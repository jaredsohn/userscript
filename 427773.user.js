// ==UserScript==
// @name        CafeCommerce Pack and Ship
// @namespace   http://bo33b.dyndns.org
// @include     https://*.mycafecommerce.com/admin/store/orders.php*
// @include     https://*.mycafecommerce.com/admin/store/orders_update.php?$$$*
// @version     1.1
// @grant       none
// ==/UserScript==

var company = {


    name:     'Weathering Solutions',
    email:    'mail@weatheringsolutions.com',
    website:  'www.weatheringsolutions.com',
    address1: '4594 Briargate Dr',
    address2: 'St. Charles, MO 63304',
    country:  'United States',
    logoURL:  '/images/592d548c99/logos/logo2.jpg',
    footer:   'Visit www.weatheringsolutions.com for the latest products, news, and promotions.<br>Thank you for your purchase!'


}

var links = [],
    orders = [],
    country = {'US':'','AF':'Afghanistan','AX':'Aland Islands','AL':'Albania','DZ':'Algeria','AS':'American Samoa','AD':'Andorra','AO':'Angola','AI':'Anguilla','AQ':'Antarctica','AG':'Antigua and Barbuda','AR':'Argentina','AM':'Armenia','AW':'Aruba','AU':'Australia','AT':'Austria','AZ':'Azerbaijan','BS':'Bahamas','BH':'Bahrain','BD':'Bangladesh','BB':'Barbados','BY':'Belarus','BE':'Belgium','BZ':'Belize','BJ':'Benin','BM':'Bermuda','BT':'Bhutan','BO':'Bolivia','BQ':'Bonaire', 'BA':'Bosnia','BW':'Botswana','BV':'Bouvet Island','BR':'Brazil','IO':'British Indian Ocean Territory','BN':'Brunei Darussalam','BG':'Bulgaria','BF':'Burkina Faso','BI':'Burundi','KH':'Cambodia','CM':'Cameroon','CA':'Canada','CV':'Cape Verde','KY':'Cayman Islands','CF':'Central African Republic','TD':'Chad','CL':'Chile','CN':'China','CX':'Christmas Island','CC':'Cocos Islands','CO':'Colombia','KM':'Comoros','CG':'Congo','CD':'The Congo','CK':'Cook Islands','CR':'Costa Rica','CI':'Ivory Coast','HR':'Croatia','CU':'Cuba','CW':'Curaçao','CY':'Cyprus','CZ':'Czech Republic','DK':'Denmark','DJ':'Djibouti','DM':'Dominica','DO':'Dominican Republic','EC':'Ecuador','EG':'Egypt','SV':'El Salvador','GQ':'Equatorial Guinea','ER':'Eritrea','EE':'Estonia','ET':'Ethiopia','FK':'Falkland Isle (Malvinas)','FO':'Faroe Islands','FJ':'Fiji','FI':'Finland','FR':'France','GF':'French Guiana','PF':'French Polynesia','TF':'France','GA':'Gabon','GM':'Gambia','GE':'Georgia','DE':'Germany','GH':'Ghana','GI':'Gibraltar','GR':'Greece','GL':'Greenland','GD':'Grenada','GP':'Guadeloupe','GU':'Guam','GT':'Guatemala','GG':'Guernsey','GN':'Guinea','GW':'Guinea-Bissau','GY':'Guyana','HT':'Haiti','HM':'Heard &amp; McDonald Islands','VA':'Vatican City','HN':'Honduras','HK':'Hong Kong','HU':'Hungary','IS':'Iceland','IN':'India','ID':'Indonesia','IR':'Iran','IQ':'Iraq','IE':'Ireland','IM':'Isle of Man','IL':'Israel','IT':'Italy','JM':'Jamaica','JP':'Japan','JE':'Jersey','JO':'Jordan','KZ':'Kazakhstan','KE':'Kenya','KI':'Kiribati','KP':'North Korea','KR':'South Korea','KW':'Kuwait','KG':'Kyrgyzstan','LA':'Laos','LV':'Latvia','LB':'Lebanon','LS':'Lesotho','LR':'Liberia','LY':'Libya','LI':'Liechtenstein','LT':'Lithuania','LU':'Luxembourg','MO':'Macao','MK':'Macedonia','MG':'Madagascar','MW':'Malawi','MY':'Malaysia','MV':'Maldives','ML':'Mali','MT':'Malta','MH':'Marshall Islands','MQ':'Martinique','MR':'Mauritania','MU':'Mauritius','YT':'Mayotte','MX':'Mexico','FM':'Micronesia','MD':'Moldova','MC':'Monaco','MN':'Mongolia','ME':'Montenegro','MS':'Montserrat','MA':'Morocco','MZ':'Mozambique','MM':'Myanmar','NA':'Namibia','NR':'Nauru','NP':'Nepal','NL':'Netherlands','NC':'New Caledonia','NZ':'New Zealand','NI':'Nicaragua','NE':'Niger','NG':'Nigeria','NU':'Niue','NF':'Norfolk Isle','MP':'Northern Mariana Islands','NO':'Norway','OM':'Oman','PK':'Pakistan','PW':'Palau','PS':'Palestinian Territory, Occupied','PA':'Panama','PG':'Papua New Guinea','PY':'Paraguay','PE':'Peru','PH':'Philippines','PN':'Pitcairn','PL':'Poland','PT':'Portugal','PR':'Puerto Rico','QA':'Qatar','RE':'Réunion','RO':'Romania','RU':'Russia','RW':'Rwanda','BL':'Saint Barthélemy','SH':'Saint Helena','KN':'Saint Kitts and Nevis','LC':'Saint Lucia','MF':'Saint Martin','PM':'Saint Pierre and Miquelon','VC':'Saint Vincent and the Grenadines','WS':'Samoa','SM':'San Marino','ST':'Sao Tome and Principe','SA':'Saudi Arabia','SN':'Senegal','RS':'Serbia','SC':'Seychelles','SL':'Sierra Leone','SG':'Singapore','SX':'Sint Maarten','SK':'Slovakia','SI':'Slovenia','SB':'Solomon Islands','SO':'Somalia','ZA':'South Africa','GS':'South Georgia','SS':'South Sudan','ES':'Spain','LK':'Sri Lanka','SD':'Sudan','SR':'Suriname','SJ':'Svalbard and Jan Mayen','SZ':'Swaziland','SE':'Sweden','CH':'Switzerland','SY':'Syrian Arab Republic','TW':'Taiwan','TJ':'Tajikistan','TZ':'Tanzania','TH':'Thailand','TL':'Timor-Leste','TG':'Togo','TK':'Tokelau','TO':'Tonga','TT':'Trinidad and Tobago','TN':'Tunisia','TR':'Turkey','TM':'Turkmenistan','TC':'Turks and Caicos','TV':'Tuvalu','UG':'Uganda','UA':'Ukraine','AE':'United Arab Emirates','GB':'United Kingdom','UM':'United States Minor Outlying Islands','UY':'Uruguay','UZ':'Uzbekistan','VU':'Vanuatu','VE':'Venezuela','VN':'Viet Nam','VG':'British Virgin Islands','VI':'US Virgin Islands','WF':'Wallis and Futuna','EH':'Western Sahara','YE':'Yemen','ZM':'Zambia','ZW':'Zimbabwe'},
    box = document.getElementById('OrderShipped'),
    num = document.getElementById('OrderTrackingNumber'),
    msg = document.querySelector('div.notification:nth-child(1)'),
    btn = document.getElementById('delete-test-orders'),
    ovr = document.getElementById('overlay-orders-delete');

if (box) {
    box.checked = true;
    num.value = new Date();
    box.form.submit();
} else if (msg) {
    msg.innerHTML = 'All orders have been shipped!';
} else if (btn) {
    btn.innerHTML = 'Pack &amp; Ship';
    ovr.innerHTML = '<p style="text-align:center;font-size:larger">Please wait...</p>';
    btn.onclick = function () {
        var datarows = document.getElementsByClassName('data') [0].getElementsByTagName('tr');
        for (var d in datarows) if (d > 0) links.push(datarows[d].getElementsByTagName('a')[0]);
        for (var l in links) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', links[l], true);
            xhr.responseType = 'document';
            xhr.onload = xhrResponse;
            xhr.send();
        }
        return false;
    }
}

function xhrResponse() {
    var doc = this.responseXML;
    var status = doc.getElementsByTagName('select')[0];
    status.outerHTML = status.options[status.selectedIndex].value.bold();
    var order = {
        e : doc.getElementById('OrderEmail').value.toLowerCase(),
        n : doc.getElementById('OrderShipName').value.toTitleCase().replace("'",'&#39;'),
        a : doc.getElementById('OrderShipAddress').value.toTitleCase().replace("'",'&#39;'),
        c : doc.getElementById('OrderCity').value.toTitleCase().replace("'",'&#39;'),
        z : doc.getElementById('OrderZip').value.toUpperCase().replace(" ",'&nbsp;'),
        s : doc.getElementById('OrderState').value.toTitleCase(),
        cc : country[doc.getElementById('OrderCountry').value],
        items : doc.getElementsByClassName('data')[0].outerHTML.replace(/[\f\n]/g,' ').replace(/'/g,'&#39;'),
        summary : doc.getElementsByTagName('fieldset')[0].innerHTML.replace(/\s{2,}/g,' ').replace(/\(.{1,19}\)/g,'')
    }
    if (orders.push(order) == links.length) {
        var w = window.open();
        if (!w) {
            ovr.firstChild.innerHTML = '<b>Disable the pop-up blocker</b>';
        } else {
            w.close();
            doShippingLabels();
            doPackingSlips();
        }
    }
}

function doShippingLabels() {
    var html = '\n'+
        'var w=window.open(); \n'+
        'var d=w.document; \n'+
        'd.writeln(\'<!DOCTYPE html>\'); \n'+
        'd.writeln(\'<html><head><title>Print Shipping Labels</title><style>'+
        ' @media screen { body{padding:50px} div.label{border:1px dotted} }'+
        ' body{font:16pt Arial;margin:0 5px;text-transform:uppercase}'+
        ' div.label{width:333px;height:210px;padding:5px;display:table;page-break-after:always}'+
        ' input{position:fixed;top:0;left:0;width:100%;font-size:34px}'+
        ' p{display:table-cell;vertical-align:middle}'+
        ' input,iframe{display:none}'+
        ' </style></head><body>\'); \n'+
        'd.writeln(\'<input type="button" onclick="this.style.display=\\\'none\\\';window.print();this.nextElementSibling.style.display=\\\'block\\\';"'+
        ' value="Click here to print '+orders.length+' label'+(orders.length>1?'s':'')+' (choose label printer)" style="display:block">\'); \n'+
        'd.writeln(\'<input type="button" onclick="this.value=\\\'Please wait...\\\';var i=document.getElementsByTagName(\\\'iframe\\\');'+
        ' for(var j in i) i[j].src=i[j].innerHTML;" value="Mark all as shipped" style="top:240px">\'); \n';
    for (var o in orders) {
        html += 'd.writeln(\'<div style="display:inline-block"><div class="label"><p>'+orders[o].n+'<br>'+orders[o].a;
        html += '<br>'+orders[o].c+', '+orders[o].s+'&ensp;'+orders[o].z+'<br>'+orders[o].cc+'</p><iframe onload="';
        html += (o==orders.length-1) ? 'if(this.src.length>0){window.opener.document.location.reload(false);setTimeout(function(){window.close()},2200)}' : '';
        html += '">'+links[o].pathname+'?$$$&'+links[o].search.substr(1)+'</iframe></div></div>\'); \n';
    }
    html += 'd.writeln(\'</body></html>\'); \nd.close(); \n';
    var s = document.createElement('script');
    s.innerHTML = html;
    document.body.appendChild(s);
}

function doPackingSlips() {
    var html = '\n'+
        'var w=window.open(); \n'+
        'var d=w.document; \n'+
        'd.writeln(\'<!DOCTYPE html>\'); \n'+
        'd.writeln(\'<html><head><title>Print Packing Slips</title><link rel="stylesheet" href="/webassist/themes/tribute/css/admin.css"><style>'+
        ' @media screen { div.page{border:1px dotted} }'+
        ' body{background:#fff;min-width:700px;margin:1px;padding:0}'+
        ' input{position:fixed;top:0;left:0;width:100%;font-size:34px}'+
        ' div.page{width:7.4in;padding:0.5in;margin:auto;page-break-after:always}'+
        ' img{float:left;margin:0 45px 10px}'+
        ' h1,h4{text-align:center;padding:35px}'+
        ' </style></head><body>\'); \n'+
        'd.writeln(\'<input type="button" value="Click here to print '+orders.length+' order'+(orders.length>1?'s':'')+' (choose laser printer)"'+
        ' onclick="this.style.display=\\\'none\\\';window.print();window.close();">\'); \n';
    for (var o in orders) {
        html += 'd.writeln(\'<div class="page"><img src="'+company.logoURL+'"><h1>Packing Slip</h1>'+
            '<table style="width:100%" cellspacing="6"><tbody><tr>'+
            '<td align="right" valign="top" width="16%">Ship To:   </td><td width="1%"> </td>'+
            '<td align="left " valign="top" width="33%"><b>'+orders[o].n+'</b></td>'+
            '<td align="right" valign="top" width="16%">Ship From: </td><td width="1%"> </td>'+
            '<td align="left " valign="top" width="33%">'+company.name+'<br>'+company.website+'</td></tr><tr>'+
            '<td align="right" valign="top" width="16%">Address:   </td><td width="1%"> </td>'+
            '<td align="left " valign="top" width="33%">'+orders[o].a+'<br>'+orders[o].c+', '+orders[o].s+' '+orders[o].z+'<br>'+orders[o].cc+'</td>'+
            '<td align="right" valign="top" width="16%">Address:   </td><td width="1%"> </td>'+
            '<td align="left " valign="top" width="33%">'+company.address1+'<br>'+company.address2+'<br>'+company.country+'</td></tr><tr>'+
            '<td align="right" valign="top" width="16%">Email:     </td><td width="1%"> </td>'+
            '<td align="left " valign="top" width="33%">'+orders[o].e+'</td>'+
            '<td align="right" valign="top" width="16%">Email:     </td><td width="1%"> </td>'+
            '<td align="left " valign="top" width="33%">'+company.email+'</td></tr></tbody>'+
            '</table><p>'+orders[o].items+'</p>'+
            '<div style="float:right;padding:1px 8px"><p> <label>Tax'+orders[o].summary.split('Tax')[1]+'</div>'+
            '<div style="background-color:#f2f2f2;padding:1px 70px">'+orders[o].summary.split('Tax')[0]+'</label></div>'+
            '<h4  style="padding:15px">'+company.footer+'</h4></div>\'); \n';
    }
    html += 'd.writeln(\'</body></html>\'); \nd.close(); \n';
    var s = document.createElement('script');
    s.innerHTML = html;
    document.body.appendChild(s);
}

/* 
  * To Title Case 2.1 – http://individed.com/code/to-title-case/
  * Copyright © 2008–2013 David Gouch. Licensed under the MIT License.
 */

String.prototype.toTitleCase = function() {
  var smallWords = /^(de|der|van)$/i;
  return this.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title){
    if (index > 0 && index + match.length !== title.length &&
      match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
      (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
      title.charAt(index - 1).search(/[^\s-]/) < 0) {
      return match.toLowerCase();
    }
    if (match.substr(1).search(/[A-Z]|\../) > -1) {
      return match;
    }
    return match.charAt(0).toUpperCase() + match.substr(1);
  });
}
