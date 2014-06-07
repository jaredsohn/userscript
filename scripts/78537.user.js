// ==UserScript==
// @name           OGame Fleet Tool
// @namespace      de.figgecrew.ogame.fleettool
// @include        http://*.ogame.*/game/index.php?page=*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_info
// @grant          GM_xmlhttpRequest
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js

// @description    OGame Fleet Tool - Enhance your OGame for faster mining
// @version        0.44

// @history        0.44 intenational warriders.de links. Not working for every country
// @history        0.43 small cargos as default
// @history        0.42 New language detection (URL or OGame XML API based), settings via link, better chrome support
// @history        0.41 Bugfix fur Scriptish (https://github.com/scriptish/scriptish/wiki)
// @history        0.40 Bugfix for OGame 5.3.0, war-riders.de links in alliance page
// @history        0.39 OGame 5.2.0 fix
// @history        0.38 loaded resources order fix
// @history        0.37 OGame 5.x fix
// @history        0.36 Update box has overwritten last "normal" box, in my case the shipyard box 
// @history        0.35 OGame 4.0.1 ready
// @history        0.34 Check for OGame version before making OGame 3.X fix
// @history        0.33 OGame3.0.0 ready
// @history        0.32 icon beautifying
// @history        0.31 fixes icon issues
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

if (typeof jQuery !== "undefined") {
    main ($);
} else {
    add_jQuery (main, "1.7.2");
}

function add_jQuery (callbackFn, jqVersion) {
    var jqVersion   = jqVersion || "1.7.2";
    var D           = document;
    var targ        = D.body || D.documentElement;
    var scriptNode  = D.createElement ('script');
    scriptNode.src  = 'http://ajax.googleapis.com/ajax/libs/jquery/'
                    + jqVersion
                    + '/jquery.min.js'
                    ;
    scriptNode.addEventListener ("load", function () {
        var scriptNode          = D.createElement ("script");
        scriptNode.textContent  =
            'var gm_jQuery  = jQuery.noConflict (true);\n'
            + '(' + callbackFn.toString () + ')(gm_jQuery);'
        ;
        targ.appendChild (scriptNode);
    }, false);
    targ.appendChild (scriptNode);
}

function main ($) {
  // needed since chrome does not support MetaData parsing
  var version="0.44";
  var chrome = typeof GM_xmlhttpRequest == 'undefined'; 
  if (chrome) {
    GM_getValue = function(name, defaultValue) {
        var value = localStorage.getItem(name);
        if (!value)
            return defaultValue;
        var type = value[0];
        value = value.substring(1);
        switch (type) {
            case 'b':
                return value == 'true';
            case 'n':
                return Number(value);
            default:
                return value;
        }
    }
    GM_setValue = function(name, value) {
        value = (typeof value)[0] + value;
        localStorage.setItem(name, value);
    }
    GM_xmlhttpRequest=function(obj) {
        var request=new XMLHttpRequest();
        request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
        request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
        try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
        if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
        request.send(obj.data); return request;
    }
  }
  
  // getting meta data from source dom, like universe, language and ogame version
  var get_meta_data=function(){var domain,server,universe;var language=$('meta[name="ogame-language"]').attr('content');var version=$('meta[name="ogame-version"]').attr('content');var uni=$('meta[name="ogame-universe"]').attr('content');var session=$('meta[name="ogame-session"]').attr('content');var fields=uni.match(/([a-z0-9]*)-([a-z]{2}).ogame.gameforge.com/);if(fields){domain=fields[0];language=fields[2];regexp=/[0-9]+/;universe=regexp.exec(fields[1])[0];server=language+universe}return{'domain':domain,'server':server,'universe':universe,'language':language,'session':session,'version':version}}
  // prefix build from universe number, server id and language, needed as prefix for storing preferences
  var uni_server_prefix = '';
  var data = get_meta_data();
  if(data != undefined) {
    lang = data.language.toUpperCase();
    uni_server_prefix = data.server + '_uni' + data.universe + '_' + data.language + '_';     
  }
  
  var strings = new Array();
  strings = {
    'DE' : { 
      transport:"Transport",
      fleet_tool:"Fleet Tool",
      fleet_tool_settings:"Einstellungen",
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
      visit_script_page:"Info Seite besuchen",
      alliance_links:"Links zu war-riders.de auf Allianzseite anlegen"}, 
    'EN' : { 
      transport:"Transport",
      fleet_tool:"Fleet tool",
      fleet_tool_settings:"settings",
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
      visit_script_page:"view script page",
      alliance_links:"Create links for members on alliance page to war-riders.de" },
    'GR' : {
      transport:"Μεταφορά",    
      fleet_tool:"Εργαλείο στόλου",
      fleet_tool_settings:"settings",
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
      visit_script_page:"Μεταφορά στη σελιδα του script",
      alliance_links:"Create links for members on alliance page to war-riders.de" },   
  }
  
  // get Gameversion for several style and use switches
  var session_param="";
  var newLinkClass="";
  ogame_version=data.version;
  var matchStr = ogame_version.match("^[0-9]"); // only major version is needed
  if(matchStr) {
    var iMatch = parseInt(matchStr);
    if(iMatch < 3){session_param = "&session=" + data.session;}
    if(iMatch >= 5){newLinkClass="true"}
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
  
  //console.log('lang='+ lang + '; prefix=' + uni_server_prefix);    
  
  var disable_update_box = function() { GM_setValue('show_update_box', false); }
  var show_update_box=function(version_text){var html='<div class="header"><h3>'+strings[lang]['fleet_tool']+'</h3></div><div class="content"><table class="construction" cellpadding="0" cellspacing="0"><tbody><tr><td colspan="2" class="idle">';html+=strings[lang]['new_version_available'].format(version_text)+'</td></tr><tr><td colspan="2" class="idle"><a id="update_script_link" class="tipsStandard" title="'+strings[lang]['install_tooltip']+' '+version_text+'" href="http://userscripts.org/scripts/source/78537.user.js">'+strings[lang]['install_version']+'</a><br>';html+='<a class="tipsStandard" title="'+strings[lang]['visit_script_page']+'" href="http://userscripts.org/scripts/show/78537" target="_blank">'+strings[lang]['visit_script_page']+'</a>';html+='</td></tr></tbody></table></div></div><div class="footer"></div>';var div_box=document.createElement('div');div_box.setAttribute('class','content-box-s');var found=false;$content_boxes=$('div.content-box-s');if($content_boxes.length!=0){$content_boxes.each(function(){if($(this).next().length==0||!($(this).next().is('.content-box-s'))||$(this).next().is('.clearfloat')){$(this).after(div_box);found=true}})}if(found==true){$('div.content-box-s:last').html(html);document.getElementById('update_script_link').addEventListener("click",disable_update_box,false)}}
  // Update-check
  var show_box = GM_getValue('show_update_box', false);
  if(!chrome && document.location.href.indexOf('page=overview')!=-1&&(show_box||(parseInt(GM_getValue('last_update','0'))+86400000<=(new Date().getTime())))){GM_setValue('last_update',new Date().getTime()+'');var url='http://userscripts.org/scripts/source/78537.meta.js';try{GM_xmlhttpRequest({method:'GET',headers:{'Cache-Control':'no-cache'},url:url,onload:function(response){var meta,remote_version,local_version,version_text;meta=response.responseText;version_text=/@version\s*(.*?)\s*$/m.exec(meta)[1];remote_version=parseFloat(version_text);local_version=parseFloat(version);if(local_version!=-1){if(remote_version>local_version){GM_setValue('show_update_box',true);show_update_box(version_text)}}}})}catch(e){console.log(e)}}
  
  var on_get_coords=function(){$_links = newLinkClass == "" ? $('.planetlink.tipsStandard') : $('.planetlink.tooltipRight.js_hideTipOnMobile');var planet=$_links.attr('title');var i=planet.indexOf('[');var j=planet.indexOf(']');$("input[name='"+uni_server_prefix+'homeworld'+"']").val(planet.substring(i+1,j));$("input[name='"+uni_server_prefix+'homeworld'+"']").focus()}
  var get=function(key,default_val){var unique_key=uni_server_prefix+key;var value=GM_getValue(unique_key);if(typeof(value) !== 'undefined'){return value}else{try{var host_suffix=host.toLowerCase()+'_';var s=unique_key.indexOf(host_suffix)+host_suffix.length;var key=unique_key.substring(s,unique_key.length);value=GM_getValue(key);if(typeof(value) !== 'undefined'){return value}else{return default_val}}catch(e){return default_val}}}
  var store_option=function(){var value;if($(this).attr('type')=='checkbox'){value=$(this).is(':checked')}else{value=$(this).val()}if(value&&$(this).attr('name')==uni_server_prefix+'homeworld'){if(check_coords(value)){GM_setValue($(this).attr('name'),value)}else{alert(strings[lang]['wrong_coords_format'])}}else{GM_setValue($(this).attr('name'),value)}}
  var create_option=function(type,parent,id){var div_wrap=document.createElement('div');div_wrap.setAttribute('class','fieldwrapper');parent.appendChild(div_wrap);var label_wrap=document.createElement('label');label_wrap.setAttribute('class','styled textBeefy');label_wrap.appendChild(document.createTextNode(strings[lang][id]));div_wrap.appendChild(label_wrap);var div_field=document.createElement('div');div_field.setAttribute('class','thefield');var stored_info;var input=document.createElement('input');if(type=='text'){stored_info=get(id,'');input.setAttribute('value',stored_info?stored_info:'');if(id=='homeworld'){input.setAttribute('class','textInput');input.setAttribute('style','width: 80px;')}else{input.setAttribute('class','textInput w150')}input.setAttribute('size','20')}else{stored_info=(id=='moon'||id=='label_coords')?get(id,false):get(id,true);if(stored_info){input.setAttributeNode(document.createAttribute('checked'))}}input.setAttribute('name',uni_server_prefix+id);input.setAttribute('type',type);if(type=='text'){input.addEventListener("blur",store_option,false)}else{input.addEventListener("change",store_option,false)}div_field.appendChild(input);var btn;if(id=='homeworld'){btn=document.createElement('input');btn.setAttribute('type','button');btn.setAttribute('class','btn_blue');btn.setAttribute('name','homeworld_btn');btn.setAttribute('value',strings[lang]['homeworld_btn']);btn.addEventListener("click",on_get_coords,false)}div_wrap.appendChild(div_field);if(btn){var div_center=document.createElement('div');div_center.setAttribute('class','textCenter');div_center.appendChild(btn);parent.appendChild(div_center)}}
  var create_help_text=function(parent,text_key){var div_wrap=document.createElement('div');div_wrap.setAttribute('class','fieldwrapper');parent.appendChild(div_wrap);var p=document.createElement('p');div_wrap.appendChild(p);var text=strings[lang][text_key];if(!text){text="?"+text_key+"?"}p.appendChild(document.createTextNode(text))}
  var check_coords=function(value){return value.match(/^\d+:\d+:\d+$/)!=null}
  var showLangs=function(parent){var div_wrap=document.createElement('div');div_wrap.setAttribute('id','languagediv');div_wrap.setAttribute('class','fieldwrapper');parent.appendChild(div_wrap);var html='<p>All loaded languages:<ul>';for(var lang in strings){html+='<li><span style="color: #6F9FC8; width: 150px; font-weight: 700;">'+lang+'</span>';html+='<ul>';for(var text in strings[lang]){html+='<li style="margin-left: 25px;">'+text+': '+strings[lang][text]}html+='</ul>'}html+='</ul></p>';$('#languagediv').html(html)}
  var collectResourceAmounts=function(){metaltext=$('#resources_metal').text().replace(/\D+/g,'');crystaltext=$('#resources_crystal').text().replace(/\D+/g,'');deuteriumtext=$('#resources_deuterium').text().replace(/\D+/g,'');metal_amount=Math.max(parseInt(metaltext)-get('metalleft',0),0);crystal_amount=Math.max(parseInt(crystaltext)-get('crystalleft',0),0);deut_amount=Math.max(parseInt(deuteriumtext)-get('deuteriumleft',0),0);sum=metal_amount+crystal_amount+deut_amount;result={'metal':metal_amount,'crystal':crystal_amount,'deuterium':deut_amount,'sum':sum};console.log('resources: sum='+result.sum+'; metal='+result.metal+'; crystal='+result.crystal+'; deuterium='+result.deuterium);return result}
  
  if(document.location.href.indexOf('page=alliance') != -1 && get('alliance_links', true)) {
    // On alliance page create link for each member to the war-riders.de page
    window.setTimeout('$("#form_assignRank > table > tbody > tr").each(function(i){var uname=$(this).find("td:first").html().trim();var link="http://www.war-riders.de/?lang=\"+$(\"meta[name=\'ogame-language\']\").attr(\"content\")+\"&uni=\"+$(\"meta[name=\'ogame-universe\']\").attr(\"content\")+\"&page=search&post=1&type=player&name="+uname;var aref="<a href=\\""+ link +"\\" target=\\"_blank\\">"+uname+"</a>";$(this).find("td:first").html(aref);});', 1500);    
  }
  
  // we only do something when mining-mode is activated, so someone clicked on the "transport" menu item
  var mining_mode = document.location.href.indexOf('&miningmode=on') != -1;
  
  if(document.location.href.indexOf('page=preferences')!=-1){var $four=$('#four');var div_header=document.createElement('div');div_header.setAttribute('class','category fieldwrapper alt bar');$four.append(div_header);var label=document.createElement('label');label.setAttribute('class','styled textBeefy');label.appendChild(document.createTextNode(' OGame '+strings[lang]['fleet_tool']+' v'+version));div_header.appendChild(label);var div_content=document.createElement('div');div_content.setAttribute('class','group bborder');div_content.setAttribute('style','display: none;');create_option('text',div_content,'homeworld');create_help_text(div_content,'homeworldhelp');create_option('checkbox',div_content,'label_coords');create_option('checkbox',div_content,'moon');create_option('checkbox',div_content,'transportasmission');create_option('checkbox',div_content,'useallresources');create_option('text',div_content,'metalleft');create_option('text',div_content,'crystalleft');create_option('text',div_content,'deuteriumleft');create_option('checkbox',div_content,'prefered_small_cargo');create_option('checkbox',div_content,'select_debris_on_recycler');create_option('checkbox',div_content,'alliance_links');var div_wrap2=document.createElement('div');div_wrap2.setAttribute('class','textCenter');var a=document.createElement('a');a.setAttribute('href','https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=KWXJYVWUXGSUC');a.setAttribute('target','_blank');var i=document.createElement('img');i.setAttribute('src','https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif');i.setAttribute('alt','PayPal - The safer, easier way to pay online!');a.appendChild(i);div_wrap2.appendChild(a);div_content.appendChild(div_wrap2);$four.append(div_content);if(get('show_all_lang',false)){showLangs(div_content)}if(mining_mode){window.setTimeout("$('#tabExtended').click(); $('#four div.group:nth-child(2)').css('display', 'none'); $('#four div.group:nth-child(6)').css('display', 'block')",250)}}
  
  var fleet_icon = 'http://gf1.geo.gfsrv.net/cdn32/17802a56c19935ccbc4ef329c0c867.gif'
  var fleet_icon_hover = 'http://gf1.geo.gfsrv.net/cdn70/fca390c937463b33442bcb7b255d1f.gif';
  var fleet_icon_movement = 'http://gf1.geo.gfsrv.net/cdn41/3306093fa95dd704a1420b192110e5.gif';
  
  $fleetItem = $('#menuTable li:nth-child(8)');
  $fleetIconItem = $fleetItem.find('.menuImage');
  var fleet_item = $fleetItem[0];
  var fleet_icon_item = $fleetIconItem[0]; 
  var movement = false;
  

  try {
    // stuff to create and set the "transport" menu item
    var menu_item = document.createElement('li');
    menu_item.appendChild(document.createTextNode(''));
    var span_item = document.createElement('span');
    span_item.setAttribute('class', 'menu_icon');
    menu_item.appendChild(span_item);
    var a_item = document.createElement('a');
    a_item.setAttribute('href', 'index.php?page=preferences&miningmode=on'+session_param);
    a_item.setAttribute('class', 'tooltipRight js_hideTipOnMobile');
    a_item.setAttribute('title', strings[lang]['fleet_tool'] +' '+ strings[lang]['fleet_tool_settings']);  
    a_item.setAttribute('target', '_self');
    span_item.appendChild(a_item);
    var img_item = document.createElement('img');
    img_item.setAttribute('class', 'mouseSwitch');
    img_item.setAttribute('src', movement ? fleet_icon_movement : fleet_icon);
    img_item.setAttribute('rel', fleet_icon_hover);
    img_item.setAttribute('height', '29');
    img_item.setAttribute('width', '38');
    a_item.appendChild(img_item);
    
    var a_item2 = document.createElement('a');
    var style;
    if(mining_mode) {
      style = 'menubutton selected';
      // deselect the normal fleet button
      $('.menubutton.selected').removeClass('selected');
      img_item.setAttribute('src', movement ? fleet_icon_movement : fleet_icon_hover);
      fleet_icon_item.setAttribute('src', movement ? fleet_icon_movement : fleet_icon);
      fleet_icon_item.setAttribute('rel', fleet_icon_hover);
      // set the mining attribute to all planetlinks on the rigth side
      // for changing planets and stay on transport page
      $_links=newLinkClass==""?$('.planetlink.tipsStandard'):$('.planetlink.tooltipRight.js_hideTipOnMobile');$_links.each(function(i,e){var href=$(this).attr('href');href+='&miningmode=on';$(this).attr('href',href)});$_moonLinks=newLinkClass==""?$('.moonlink.tipsStandard'):$('.moonlink');$_moonLinks.each(function(i,e){var href=$(this).attr('href');href+='&miningmode=on';$(this).attr('href',href)});                         
    } else {
      style = 'menubutton';
    }
    a_item2.setAttribute('class', style);
    a_item2.setAttribute('href', 'index.php?page=fleet1&miningmode=on'+session_param);
    a_item2.setAttribute('accesskey', '');
    a_item2.setAttribute('target', '_self');
    menu_item.appendChild(a_item2);
    var span_item2 = document.createElement('span');
    span_item2.setAttribute('class', 'textlabel');
    var transport_text = strings[lang]['transport'];
    if(get('label_coords', false) == true && get('homeworld', '') != '') {
       transport_text = get('homeworld', transport_text);
    }
    if(get('moon', false)) {
       transport_text += ' M'; 
    }
    span_item2.appendChild(document.createTextNode(transport_text));
    a_item2.appendChild(span_item2);
    fleet_item.parentNode.insertBefore(menu_item, fleet_item.nextSibling);    
  } catch(e) { console.log(e);}
  
  if (mining_mode && document.location.href.indexOf ('page=fleet1') != -1) {
    // change the action of the form so our miningmode is carried to page fleet 2
    $("form[name='shipsChosen']").each(function(i, e){
      var action = $(this).attr('action');
      action += '&miningmode=on';
      $(this).attr('action', action);
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
      var ktCount = parseInt($('#button202').find('.level').text().replace(/\D+/g, ''));
      var gtCount = parseInt($('#button203').find('.level').text().replace(/\D+/g, ''));
    } catch(err) {
      // there is no fleet
      return;
    }
    var sc_pref = get('prefered_small_cargo', true);
   
    var amounts = collectResourceAmounts();
    // calculate the sum and how much big transporters are needed
    var metal_amount = amounts.metal;
    var crystal_amount = amounts.crystal;
    var deut_amount = amounts.deuterium;
    var sum =  amounts.sum;
    
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
      $('#ship_202').val(kt).change();
    }
    // same for big transporters
    if( gt != 0) {
      $('#ship_203').val(gt).change();
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
        });
        try { if(unsafeWindow.returnLink) { unsafeWindow.returnLink += '&miningmode=on'; } }
        catch(e) { if(window.returnLink) { window.returnLink += '&miningmode=on'; } }
        
        if(get('useallresources', true) == true) {
          // collecting some resource values
          var amounts = collectResourceAmounts();
          var field_m = $('#metal') ? $('#metal') : $('#resource1');
          field_m.val(amounts.metal);
          var field_c = $('#crystal') ? $('#crystal') : $('#resource2');
          field_c.val(amounts.crystal);
          var field_d = $('#deuterium') ? $('#deuterium') : $('#resource3');
          field_d.val(amounts.deuterium);          
          try{unsafeWindow.updateVariables();unsafeWindow.checkRessourceByType('metal');unsafeWindow.updateVariables();unsafeWindow.checkRessourceByType('crystal');unsafeWindow.updateVariables();unsafeWindow.checkRessourceByType('deuterium');unsafeWindow.updateVariables()}catch(e){window.updateVariables();window.checkRessourceByType('metal');window.updateVariables();window.checkRessourceByType('crystal');window.updateVariables();window.checkRessourceByType('deuterium');window.updateVariables()}
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
    $_links=newLinkClass==""?$('.planetlink.tipsStandard'):$('.planetlink.tooltipRight.js_hideTipOnMobile');$_links.each(function(i,e){var href=$(this).attr('href').replace(/page=movement/,'page=fleet1');$(this).attr('href',href)});$_moonLinks=newLinkClass==""?$('.moonlink.tipsStandard'):$('.moonlink');$_moonLinks.each(function(i,e){var href=$(this).attr('href').replace(/page=movement/,'page=fleet1');$(this).attr('href',href)});
 }
}