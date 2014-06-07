var meta_data = <><![CDATA[
// ==UserScript==
// @name           OGame Fleet Tool
// @namespace      de.figgecrew.ogame.fleettool
// @include        http://*/game/index.php?page=*&session=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js

// @description    OGame Fleet Tool - Enhance your OGame for faster mining
// @version        0.30

// @history        0.30 fix for the poland server
// @history        0.29 Menulabel could now have the homeworld coordinates as text, disableable in the options
// @history        0.28 filter fix for Firefox 5
// @history        0.27 new language supported: serbian; digits grouping bug hopefully fixed
// @history        0.26 new feature: select debris field as target when recycler are in fleet
// @history        0.25 fixes again the "more than 999 cargos" bug. Didn't worked in 0.24
// @history        0.24 fixes more than 999 cargos bug (just replace . with nothing)
// @history        0.23 "more cargoes than exist"-bug finally fixed, thanks for the hint vess!
// @history        0.22 Double miningmode fixed, better calculation if resource left configured, "more cargoes than exist"-bug fixed
// @history        0.21 quick fix for id change of resource input field. Should now work with both id versions
// @history        0.20 back button in fleet page works now; Moonlinks should now also contain miningmode (no guarantee for that)
// @history        0.19 small bugfix in the language selection
// @history        0.18 External languages are now possible. Also a moon could be automatically selected as target. Small cargos could be prefered
// @history        0.17 Added greek language. Some more texts are translated (Menu item, update info box).
// @history        0.16 Shows the installed script version in the option header
// @history        0.15 Added script update info
// @history        0.14 Added button to take first planet from list as homeplanet
// @history        0.13 Added check if coordinates are well formed.
// @history        0.12 Complete rewritten option feature. SUpports now multi universe and multi server use.
// @history        0.11 Added ne Menu-item for selecting transport or normal fleet pages 
// @history        0.10 Replaced mission-button click, so it is even faster
// @history        0.09 Added option to preselect homeworld coords
// @history        0.08 Added option to leave a special amount of each resource on the planet
// @history        0.07 Option button now also visible when no fleet at planet exists.
// @history        0.06 this version uses now jQuery for checking if a mission is selected.
// @history        0.05 small bugfix. You know, one feature comes in, and with it a few bugs :-)
// @history        0.04 Don't do something when preselection of mission was done. Config for no mission text added.
// @history        0.03 Added function to select transport as default mission and take all resources. Customizable througth option button in fleet page 1
// @history        0.02 Added all universes on all server
// @history        0.01 Initial release
// ==/UserScript==
]]></>;

(function() {
  var scriptMetadata=parseMetadata(meta_data.toString());function parseMetadata(headerBlock){var lines=headerBlock.split(/[\r\n]+/).filter( function(i) { return /\/\/ @/.test(i); });var metadata={include:[],exclude:[],require:[],resource:{}};for each(var line in lines){[line,name,value]=line.match(/\/\/ @(\S+)\s*(.*)/);if(metadata[name]instanceof Array)metadata[name].push(value);else if(metadata[name]instanceof Object){[rName,rValue]=value.split(/\s+/);metadata[name][rName]=rValue}else metadata[name]=value}return metadata}
  String.format=String.prototype.format=function(){var string=this;var i=0;if(typeof(this)=="function"){string=arguments[0];i++}for(;i<arguments.length;i++)string=string.replace(/\{\d+?\}/,arguments[i]);return string}
  
  var uni_server_prefix = '';
  /*
   * new language detection, credits for that goes to "Tarja The Witch"
   * I hope it is ok that i use this code-snippet. 
   */ 
  var lang, uni, host, uni_prefix;
  var url = document.location.href;
  var server = url.match(/http:\/\/([^\\\/]+[\\\/])/i);
  
  if (server) server = server[1].toUpperCase();
  server = server.replace(/\\/i, '/');
  
  if    (server.indexOf('AR.OGAME.ORG/') > -1)  lang = 'AR'; // Argentina
  else if (server.indexOf('BA.OGAME.ORG/') > -1)  lang = 'BA'; // Balkan countries
  else if (server.indexOf('BG.OGAME.ORG/') > -1)  lang = 'BG'; // Bulgaria
  else if (server.indexOf('OGAME.COM.BR/') > -1)  lang = 'BR'; // Brasil
  else if (server.indexOf('CN.OGAME.ORG/') > -1)  lang = 'CN'; // China
  else if (server.indexOf('OGAME.CZ/') > -1)  lang = 'CZ'; // Czech Republic
  else if (server.indexOf('OGAME.DE/') > -1)  lang = 'DE'; // Germany
  else if (server.indexOf('OGAME.DK/') > -1)  lang = 'DK'; // Denmark
  else if (server.indexOf('OGAME.COM.ES/') > -1)  lang = 'ES'; // Spain
  else if (server.indexOf('FI.OGAME.ORG/') > -1)  lang = 'FI'; // Finnland
  else if (server.indexOf('OGAME.FR/') > -1)  lang = 'FR'; // France
  else if (server.indexOf('OGAME.GR/') > -1)  lang = 'GR'; // Greece
  else if (server.indexOf('OGAME.COM.HR/') > -1)  lang = 'HR'; // Croatia
  else if (server.indexOf('OGAME.HU/') > -1)  lang = 'HU'; // Hungary
  else if (server.indexOf('OGAME.IT/') > -1)  lang = 'IT'; // Italy
  else if (server.indexOf('OGAME.JP/') > -1)  lang = 'JP'; // Japan
  else if (server.indexOf('OGAME2.CO.KR/') > -1)  lang = 'KR'; // Korea
  else if (server.indexOf('OGAME.LT/') > -1)  lang = 'LT'; // Lithuania
  else if (server.indexOf('OGAME.LV/') > -1)  lang = 'LV'; // Latvia
  else if (server.indexOf('MX.OGAME.ORG/') > -1)  lang = 'MX'; // Mexico
  else if (server.indexOf('OGAME.NL/') > -1)  lang = 'NL'; // Netherlands
  else if (server.indexOf('OGAME.NO/') > -1)  lang = 'NO'; // Norway
  else if (server.indexOf('OGAME.PL/') > -1)  lang = 'PL'; // Poland
  else if (server.indexOf('OGAME.COM.PT/') > -1)  lang = 'PT'; // Portugal
  else if (server.indexOf('OGAME.RO/') > -1)  lang = 'RO'; // Romania
  else if (server.indexOf('OGAME.RU/') > -1)  lang = 'RU'; // Russia
  else if (server.indexOf('OGAME.SE/') > -1)  lang = 'SE'; // Sweden
  else if (server.indexOf('OGAME.SI/') > -1)  lang = 'SI'; // Slovenia
  else if (server.indexOf('OGAME.SK/') > -1)  lang = 'SK'; // Slovakia
  else if (server.indexOf('OGAME.COM.TR/') > -1)  lang = 'TR'; // Turkey
  else if (server.indexOf('OGAME.TW/') > -1)  lang = 'TW'; // Taiwan
  else if (server.indexOf('OGAME.US/') > -1 ) lang = 'US'; // USA
  else if (server.indexOf('OGAME.ORG/') > -1) lang = 'ORG'; // UK
  else if (server.indexOf('OGAME.RS/') > -1) lang = 'RS'; // Serbia
  
  if (lang == 'US' || lang == 'ORG') lang = 'EN';
  else if (lang == 'AR' || lang == 'MX') lang = 'ES';
  
  uni = url.toUpperCase().match(/:\/\/([a-z0-9]+)\./i);
  uni = uni ? uni[1] : '0';
  
  host = server.substring(server.indexOf('OGAME.') + 6, server.length - 1);
  
  var uni_server = host + '.' + uni + '.' + lang;
  
  uni_prefix = uni_server.replace(/[\.\-]/g, '_'); 
  uni_server_prefix = uni_prefix.toLowerCase() + '_';
  
  //var text = 'server: ' + server + '\n';
  //text += 'uni_prefix: '+ uni_prefix + '\n';
  //text += 'uni_server_prefix: '+ uni_server_prefix + '\n';
  //text += 'host: '+ host;
  
  //alert(text);
    
  var strings = new Array();
  strings = {
    'DE' : { 
      transport:"Transport",
      fleet_tool:"Fleet Tool",
      homeworld:"Heimatplanet Koordinaten",
      homeworldhelp:"Hier kannst Du die Koordinaten Deines Heimatplaneten eintragen. Diese werden dann automatisch im Transport-menü vorbelegt. Klicke auf den obigen Button um den ersten Planeten aus der rechten Liste als Deinen Heimatplaneten zu nehmen.",
      homeworld_btn:"Koordinaten holen",
      label_coords:"Koordinaten als Menülabel",
      moon:"Nimm den Mond des Heimatplaneten als Ziel",
      wrong_coords_format:"Die Koordinaten des Heimatplaneten entsprechen nicht der Form 2:123:5, bitte korrigieren.",
      transportasmission:"Transport Mission",
      useallresources:"Alle Resourcen einladen",
      metalleft:"Verbleibendes Metall",
      crystalleft:"Verbleibendes Kristall",
      deuteriumleft:"Verbleibendes Deuterium",
      prefered_small_cargo:"Kleine Transporter bevorzugen",
      select_debris_on_recycler:"Trümmerfeld als Ziel wenn Recycler in der Flotte sind",
      table_source:"Start",
      table_target:"Ziel",
      new_version_available:"Neue Version {0} verfügbar",
      install_tooltip:"Script aktualisieren",
      install_version:"Version installieren",
      visit_script_page:"Info Seite besuchen" }, 
    'EN' : { 
      transport:"Transport",
      fleet_tool:"Fleet tool",
      homeworld:"Homeworld coords" ,
      homeworldhelp:"This option allows you to set the coordinates of your homeplanet. If you set this option, the coordinates are inserted automatically at the transport menu. Click the button above to take the first planet in the list on the right as your homeworld.",
      homeworld_btn:"Get coords",
      label_coords:"Homeworld coordinates are menu caption",
      moon:"Set moon as target on homeworld",
      wrong_coords_format:"The coordinates are not well formed. Should be like 2:123:5. Please try again.",
      transportasmission:"Transport mission",
      useallresources:"Use all resources",
      metalleft:"Metal leave",
      crystalleft:"Crystal leave",
      deuteriumleft:"Deut leave",
      prefered_small_cargo:"Use small cargos as prefered cargos",
      select_debris_on_recycler:"Select debrisfield as target if recyler is in fleet",
      table_source:"Source",
      table_target:"Target",
      new_version_available:"New version {0} available",
      install_tooltip:"Update script to new version",
      install_version:"install new version",
      visit_script_page:"view script page" },
    'GR' : {
      transport:"Μεταφορά",    
      fleet_tool:"Εργαλείο στόλου",
      homeworld:"Αρχικές συντεταγμένες" ,
      homeworldhelp:"Αυτή η επιλογή σου επιτρέπει να επιλέξεις τις συντεταγμένες του αρχικού πλανήτη σου. Αν θέσεις αυτή την επιλογή, οι συντεταγμένες εισέρχονται αυτόματα στο μενού των μεταφορών. Κάνε κλικ στο παραπάνω κουμπί ώστε να ο πρώτος πλανήτης που εμφανίζεται στα δεξιά, να επιλεχθεί ως ο αρχικός σου.",
      homeworld_btn:"Προσθήκη συντεταγμένων",
      label_coords:"Homeworld coordinates are menu caption",
      moon:"Θέσε το φεγγάρι ως στόχο στις αρχικές συντεταγμένες",
      wrong_coords_format:"Οι συντεταγμένες δεν είναι σωστά διαμορφομένες. Θα έπρεπε να είναι για παράδειγμα 2:123:5. Προσπάθησε ξανά.",
      transportasmission:"Αποστολή μεταφοράς",
      useallresources:"Χρησιμοποίησε όλους τους πόρους",
      metalleft:"Άφησε μέταλλο",
      crystalleft:"Άφησε Κρύσταλλο",
      deuteriumleft:"Άφησε Δευτέριο",
      prefered_small_cargo:"Χρησιμοποίησε μικρά μεταγωγικά για τις μεταφορές",
      select_debris_on_recycler:"Select debrisfield as target if recyler is in fleet",
      table_source:"Source",
      table_target:"Target",
      new_version_available:"Η νέα έκδοση {0} είναι διαθέσιμη",
      install_tooltip:"Ενημέρωση του script στη νεότερη έκδοση",
      install_version:"Εγκατέστησε τη νέα έκδοση",
      visit_script_page:"Μεταφορά στη σελιδα του script" },   
  }
  // look for external languages
  var external_lang;
  try { external_lang = unsafeWindow.fleet_tool_lang; }
  catch(e) { external_lang = window.fleet_tool_lang; }
  if(external_lang) {
    for(var exLang in external_lang) {
      strings[exLang] = external_lang[exLang];
    }
  }
  // fallback if language is not available
  if(strings[lang] == undefined) {
    lang = 'EN';
  } 
  
  disable_update_box = function() { GM_setValue('show_update_box', false); }
  show_update_box=function(version_text){var html='<div class="header"><h3>'+strings[lang]['fleet_tool']+'</h3></div><div class="content"><table class="construction" cellpadding="0" cellspacing="0"><tbody><tr><td colspan="2" class="idle">';html+=strings[lang]['new_version_available'].format(version_text)+'</td></tr><tr><td colspan="2" class="idle"><a id="update_script_link" class="tipsStandard" title="'+strings[lang]['install_tooltip']+' '+version_text+'" href="http://userscripts.org/scripts/source/78537.user.js">'+strings[lang]['install_version']+'</a><br>';html+='<a class="tipsStandard" title="'+strings[lang]['visit_script_page']+'" href="http://userscripts.org/scripts/show/78537" target="_blank">'+strings[lang]['visit_script_page']+'</a>';html+='</td></tr></tbody></table></div></div><div class="footer"></div>';var div_box=document.createElement('div');div_box.setAttribute('class','content-box-s');if($('#inhalt > div.content-box-s').length!=0){$('#inhalt > div.content-box-s').each(function(){if($(this).next().length==0||!($(this).next().is('.content-box-s'))||$(this).next().is('#newDivIFC')){$(this).after(div_box)}})}$('div.content-box-s:last').html(html);document.getElementById('update_script_link').addEventListener("click",disable_update_box,false)}
  // Update-check
  var show_box = GM_getValue('show_update_box', false);
  if(document.location.href.indexOf('page=overview') != -1 && (show_box||(parseInt(GM_getValue('last_update','0'))+86400000<=(new Date().getTime())))){GM_setValue('last_update',new Date().getTime()+'');var url='http://userscripts.org/scripts/source/78537.meta.js';GM_xmlhttpRequest({method:'GET',headers:{'Cache-Control':'no-cache'},url:url,onload:function(response){var meta,remote_version,local_version,version_text;meta=response.responseText;version_text=/@version\s*(.*?)\s*$/m.exec(meta)[1];remote_version=parseFloat(version_text);local_version=parseFloat(scriptMetadata["version"]);if(local_version!=-1){if(remote_version>local_version){GM_setValue('show_update_box',true);show_update_box(version_text)}}}})}
  
  on_get_coords=function(){var planet=$('.planetlink.tipsStandard').attr('title');var i=planet.indexOf('[');var j=planet.indexOf(']');$("input[name='"+uni_server_prefix+'homeworld'+"']").val(planet.substring(i+1,j));$("input[name='"+uni_server_prefix+'homeworld'+"']").focus()}
  get=function(key,default_val){var unique_key=uni_server_prefix+key;var value=GM_getValue(unique_key);if(typeof(value) !== 'undefined'){return value}else{try{var host_suffix=host.toLowerCase()+'_';var s=unique_key.indexOf(host_suffix)+host_suffix.length;var key=unique_key.substring(s,unique_key.length);value=GM_getValue(key);if(typeof(value) !== 'undefined'){return value}else{return default_val}}catch(e){return default_val}}}
  store_option=function(){var value;if($(this).attr('type')=='checkbox'){value=$(this).is(':checked')}else{value=$(this).val()}if(value&&$(this).attr('name')==uni_server_prefix+'homeworld'){if(check_coords(value)){GM_setValue($(this).attr('name'),value)}else{alert(strings[lang]['wrong_coords_format'])}}else{GM_setValue($(this).attr('name'),value)}}
  create_option=function(type,parent,id){var div_wrap=document.createElement('div');div_wrap.setAttribute('class','fieldwrapper');parent.appendChild(div_wrap);var label_wrap=document.createElement('label');label_wrap.setAttribute('class','styled textBeefy');label_wrap.appendChild(document.createTextNode(strings[lang][id]));div_wrap.appendChild(label_wrap);var div_field=document.createElement('div');div_field.setAttribute('class','thefield');var stored_info;var input=document.createElement('input');if(type=='text'){stored_info=get(id,'');input.setAttribute('value',stored_info?stored_info:'');if(id=='homeworld'){input.setAttribute('class','textInput');input.setAttribute('style','width: 80px;')}else{input.setAttribute('class','textInput w150')}input.setAttribute('size','20')}else{stored_info=(id=='moon'||id=='prefered_small_cargo')?get(id,false):get(id,true);if(stored_info){input.setAttributeNode(document.createAttribute('checked'))}}input.setAttribute('name',uni_server_prefix+id);input.setAttribute('type',type);input.addEventListener("blur",store_option,false);div_field.appendChild(input);var btn;if(id=='homeworld'){btn=document.createElement('input');btn.setAttribute('type','button');btn.setAttribute('class','button188');btn.setAttribute('name','homeworld_btn');btn.setAttribute('value',strings[lang]['homeworld_btn']);btn.addEventListener("click",on_get_coords,false)}div_wrap.appendChild(div_field);if(btn){parent.appendChild(btn)}}
  create_help_text=function(parent,text_key){var div_wrap=document.createElement('div');div_wrap.setAttribute('class','fieldwrapper');parent.appendChild(div_wrap);var p=document.createElement('p');div_wrap.appendChild(p);var text=strings[lang][text_key];if(!text){text="?"+text_key+"?"}p.appendChild(document.createTextNode(text))}
  check_coords=function(value){return value.match(/^\d+:\d+:\d+$/)!=null;}
 
  showLangs=function(parent) {
    var div_wrap = document.createElement('div');
    div_wrap.setAttribute('id', 'languagediv');
    div_wrap.setAttribute('class', 'fieldwrapper');
    //div_wrap.setAttribute('style', 'text-align: center;');
    parent.appendChild(div_wrap);
    var html = '<p>All loaded languages:<ul>';
    for(var lang in strings) {
      html += '<li><span style="color: #6F9FC8; width: 150px; font-weight: 700;">'+ lang + '</span>';
      html += '<ul>';
      for(var text in strings[lang]) {
        html += '<li style="margin-left: 25px;">'+ text + ': ' + strings[lang][text];
      }
      html += '</ul>';
    }
    html += '</ul></p>';
    $('#languagediv').html(html);   
  }
  
  if(document.location.href.indexOf('page=preferences') != -1) {
    // insert options
    var $four=$('#four');var div_header=document.createElement('div');div_header.setAttribute('class','fieldwrapper alt bar');$four.append(div_header);var label=document.createElement('label');label.setAttribute('class','styled textBeefy');label.appendChild(document.createTextNode('OGame '+strings[lang]['fleet_tool']+' v'+scriptMetadata["version"]));div_header.appendChild(label);var div_content=document.createElement('div');div_content.setAttribute('class','group bborder');create_option('text',div_content,'homeworld');create_help_text(div_content,'homeworldhelp');create_option('checkbox', div_content, 'label_coords');create_option('checkbox',div_content,'moon');create_option('checkbox',div_content,'transportasmission');create_option('checkbox',div_content,'useallresources');create_option('text',div_content,'metalleft');create_option('text',div_content,'crystalleft');create_option('text',div_content,'deuteriumleft');create_option('checkbox',div_content,'prefered_small_cargo');create_option('checkbox',div_content,'select_debris_on_recycler');$four.append(div_content);if(get('show_all_lang',false)){showLangs(div_content)}
  }
  
  var session;
  try { session = unsafeWindow.session; }
  catch(e) { session = window.session; }
  
  // we only do something when mining-mode is activated, so someone clicked on the "transport" menu item
  var mining_mode = document.location.href.indexOf('&miningmode=on') != -1;
  
  var fleet_item = document.getElementById('menuTable');
  try {
    // stuff to create and set the "transport" menu item
    var menu_item = document.createElement('li');
    menu_item.appendChild(document.createTextNode(''));
    var span_item = document.createElement('span');
    span_item.setAttribute('class', 'menu_icon');
    menu_item.appendChild(span_item);
    var a_item = document.createElement('a');
    a_item.setAttribute('href', 'index.php?page=movement&session='+session);
    a_item.setAttribute('class', ''); 
    a_item.setAttribute('target', '_self');
    span_item.appendChild(a_item);
    var img_item = document.createElement('img');
    img_item.setAttribute('class', 'mouseSwitch');
    img_item.setAttribute('src', 'img/navigation/navi_ikon_fleet1_a.gif');
    img_item.setAttribute('rel', 'img/navigation/navi_ikon_fleet1_b.gif');
    img_item.setAttribute('height', '29');
    img_item.setAttribute('width', '38');
    a_item.appendChild(img_item);
    
    var a_item2 = document.createElement('a');
    var style;
    if(mining_mode) {
      style = 'menubutton selected';
      // deselect the normal fleet button
      $('.menubutton.selected').removeClass('selected');
      // set the mining attribute to all planetlinks on the rigth side
      // for changing planets and stay on transport page
      $('.planetlink.tipsStandard').each(function(i, e){
        var href = $(this).attr('href');
        href += '&miningmode=on';
        $(this).attr('href', href);
      });
      $('.moonlink.tipsStandard').each(function(i, e){
        var href = $(this).attr('href');
        href += '&miningmode=on';
        $(this).attr('href', href);
      });
    } else {
      style = 'menubutton';
    }
    a_item2.setAttribute('class', style);
    a_item2.setAttribute('href', 'index.php?page=fleet1&session='+session+'&miningmode=on');
    a_item2.setAttribute('accesskey', '');
    a_item2.setAttribute('target', '_self');
    menu_item.appendChild(a_item2);
    var span_item2 = document.createElement('span');
    span_item2.setAttribute('class', 'textlabel');
    var transport_text = strings[lang]['transport'];
    if(get('label_coords', false) == true && get('homeworld', '') != '') {
       transport_text = get('homeworld', transport_text);
    }
    span_item2.appendChild(document.createTextNode(transport_text));
    a_item2.appendChild(span_item2);
    var fleet_item = document.getElementById('menuTable').getElementsByTagName('li')[7];
    fleet_item.parentNode.insertBefore(menu_item, fleet_item.nextSibling);
  } catch(e) {}
  
  if (mining_mode && document.location.href.indexOf ('page=fleet1') != -1) {
    // change the action of the form so our miningmode is carried to page fleet 2
    $("form[name='shipsChosen']").each(function(i, e){
      var action = $(this).attr('action');
      action += '&miningmode=on';
      $(this).attr('action', action);
window.setTimeout(function() { document.getElementById('continue').click() }, 500);
    });  
  }
  
  // only do something when no mission was selected
  if (mining_mode && document.location.href.indexOf ('page=fleet1') != -1 && $("input[name='mission']").val() == 0) {
    if(get('transportasmission', true) == true) {
      // set mission to transport
      $("input[name='mission']").val(3);
    }
    
    try {
      // check how many small and big transporters are there
      var ktCount = parseInt(document.getElementById('button202').firstChild.nextSibling.firstChild.nextSibling.firstChild.nextSibling.firstChild.nextSibling.lastChild.nodeValue.replace(/\D+/g, ''));
      var gtCount = parseInt(document.getElementById('button203').firstChild.nextSibling.firstChild.nextSibling.firstChild.nextSibling.firstChild.nextSibling.lastChild.nodeValue.replace(/\D+/g, ''));
    } catch(err) {
      // there is no fleet
      return;
    }
    // collecting some resource values
    var metaltext = document.getElementById('resources_metal').firstChild.nodeValue.trim().replace(/\D+/g, '');
    var crystaltext = document.getElementById('resources_crystal').firstChild.nodeValue.trim().replace(/\D+/g, '');
    var deuteriumtext = document.getElementById('resources_deuterium').firstChild.nodeValue.trim().replace(/\D+/g, '');
    
    var sc_pref = get('prefered_small_cargo', false);
    // calculate the sum and how much big transporters are needed
    var metal_amount = Math.max(parseInt(metaltext) - get('metalleft', 0), 0);
    var crystal_amount = Math.max(parseInt(crystaltext) - get('crystalleft', 0), 0);
    var deut_amount = Math.max(parseInt(deuteriumtext)- get('deuteriumleft', 0), 0);
    var sum =  metal_amount + crystal_amount + deut_amount;
    
    var kt = sc_pref ? Math.round(sum / 5000) : 0;
    var gt = !(sc_pref) ? Math.round(sum / 25000) : 0;
    if(sc_pref) {
      if((kt * 5000) < sum) {
        kt = kt +1;
      }
      // if we don't have so many small transporters ...
      if((kt - ktCount) > 0) {
        kt = ktCount;
        var diff = sum - (ktCount * 5000);
        // .. try to use big transportes also if there are one
        if(gtCount && gtCount > 0) {
          gt = Math.round(diff / 25000);
          if((gt * 25000) < diff) {
            gt = gt + 1;
          }
          // check if so many cargos are available
          if(gt > gtCount) {
            gt = gtCount;
          }
        }
      }
    } else {
      if((gt * 25000) < sum) {
        gt = gt +1;
      }
      // if we don't have so many big transporters ...
      if((gt - gtCount) > 0) {
        gt = gtCount;
        var diff = sum - (gtCount * 25000);
        // .. try to use small transportes also if there are one
        if(ktCount && ktCount > 0) {
          kt = Math.round(diff / 5000);
          if((kt * 5000) < diff) {
            kt = kt + 1;
          }
          // check if so many cargos are available
          if(kt > ktCount) {
            kt = ktCount;
          }
        }
      }
    }
    // when we have to use small transporters, fill the input field
    if( kt != 0) {
      document.getElementById('ship_202').value = kt;
    }
    // same for big transporters
    if( gt != 0) {
      document.getElementById('ship_203').value = gt;
    } 
    
    // if homeworld is set in options, preselect galaxy, system and position
    var homeworld = get('homeworld', '');
    var moon = get('moon', false);
    if(homeworld && homeworld != '') {
      var coords = homeworld.split(':');
      $('input[name="galaxy"]').val(coords[0]);
      $('input[name="system"]').val(coords[1]);
      $('input[name="position"]').val(coords[2]);
      if(moon) {
        $('input[name="type"]').val(3);
      }
    }
  }
  
  // if we are in transport mode, change the action of the form so our miningmode is carried to page fleet 3
  if (document.location.href.indexOf('page=fleet2') != -1) {
    if(mining_mode) {
      $("form[name='details']").each(function(i, e){
        var action = $(this).attr('action');
        action += '&miningmode=on';
        $(this).attr('action', action);
window.setTimeout(function() { document.getElementById('continue').click() }, 500);
      });
      try { if(unsafeWindow.returnLink) { unsafeWindow.returnLink += '&miningmode=on'; } }
      catch(e) { if(window.returnLink) { window.returnLink += '&miningmode=on'; } }
    } else {
      if(get('select_debris_on_recycler', true)) {
        // select debris field as target if minimum one recycler is in the fleet
        var $rField = $("input[name='am209']");
        if(($rField.size() > 0) && (parseInt($rField.val()) != 0)) {
          $("input[name='type']").val(2);
        }
      }
    }
  }
  
  if (document.location.href.indexOf('page=fleet3') != -1) { 
    if(mining_mode) {
      // if there was no mission selected or mission is transport, do it
      if($("input[name='mission']").val() == 0 || $("input[name='mission']").val() == 3) {
        // stay in transport mode, even after sending fleet
        $("form[name='sendForm']").each(function(i, e){
          var action = $(this).attr('action');
          action += '&miningmode=on';
          $(this).attr('action', action);
window.setTimeout(function() { document.getElementById('start').click() }, 1000);
        });
        try { if(unsafeWindow.returnLink) { unsafeWindow.returnLink += '&miningmode=on'; } }
        catch(e) { if(window.returnLink) { window.returnLink += '&miningmode=on'; } }
        
        if(get('useallresources', true) == true) {
          // collecting some resource values
          var metaltext = document.getElementById('resources_metal').firstChild.nodeValue.trim().replace(/\D+/g, '');
          var crystaltext = document.getElementById('resources_crystal').firstChild.nodeValue.trim().replace(/\D+/g, '');
          var deuteriumtext = document.getElementById('resources_deuterium').firstChild.nodeValue.trim().replace(/\D+/g, '');
          var metal_amount = Math.max(parseInt(metaltext) - get('metalleft', 0), 0);
          var crystal_amount = Math.max(parseInt(crystaltext) - get('crystalleft', 0), 0);
          var deut_amount = Math.max(parseInt(deuteriumtext)- get('deuteriumleft', 0), 0);
          
          var field_m = $('#metal') ? $('#metal') : $('#resource1');
          field_m.val(metal_amount);
          var field_c = $('#crystal') ? $('#crystal') : $('#resource2');
          field_c.val(crystal_amount);
          var field_d = $('#deuterium') ? $('#deuterium') : $('#resource3');
          field_d.val(deut_amount);
          
          try { unsafeWindow.checkRes(); } catch(e) { window.checkRes(); }
          
        }   
      }
    } else {
      // try to leave resources on planet if set in options
    }
  }
  
  if (mining_mode && document.location.href.indexOf('page=movement') != -1) {
    /* 
     * after sending fleet we are automatically on the movement page.
     * we want to send fleet fast from multiple planets, so change target to 
     * transport in the small planet list on the right (fleet1 and miningmode).
     */   
    $('.planetlink.tipsStandard').each(function(i, e){
      var href = $(this).attr('href').replace(/page=movement/, 'page=fleet1');
      $(this).attr('href', href);
    });
    $('.moonlink.tipsStandard').each(function(i, e){
      var href = $(this).attr('href').replace(/page=movement/, 'page=fleet1');
      $(this).attr('href', href);
    });
  }
})();