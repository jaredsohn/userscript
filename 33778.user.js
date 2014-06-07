// <![CDATA[
// ==UserScript==
// @name          YouTube Enhancer
// @fullname      YouTube Enhancer
// @author        GIJoe
// @version       2008-09-14
// @licence       (cc) by-nc
// @namespace     http://userscripts.org/scripts/show/33042
// @description   Download Link + Quality Selector + Media Controller
// @include       http://*.youtube.*/*
// @include       http://youtube.*/*
// ==/UserScript==

// fmt=0  -> flv: 320x200 (flv1) / mp3
// fmt=6  -> flv: 480x360 (flv1) / mp3
// fmt=18 -> mp4: 480x360 (H264) / AAC

// YouTube URL: http://[lang].youtube.com/watch?v=[video_id] &fmt=[selected_fmt]
// YouTube download link: http://[lang].youtube.com/get_video?video_id=[video_id]&t=[t_id]&fmt=[download_fmt]
( function() {

// Global variables
var ytPlayerDivName    = 'watch-player-div';
var ytPlayerEmbedName  = 'movie_player';
var ytTitleDivName     = 'watch-vid-title';
var ytRatingsViewsName = 'watch-main-area';


//*************************************** Languages support **********************************************//
function get_text_DL(lang,variable) {
  switch(variable) {
    case "dlink": switch (lang) {
        default: return "تحميل";
        case "fr": return "T&#233;l&#233;charger";
        case "jp":
        case "ja": return "&#12480;&#12454;&#12531;&#12525;&#12540;&#12489;";
    }
    case "menu": switch (lang) {
        default: return "خيارات";
        case "fr": return "Options";
    }
    case "qual1": switch (lang) {
        default: return "1: تحميل نفس نوعية ملف الفيديو الحاليه";
        case "fr": return "1: Lien de t&#233;l&#233;chargement vers la vid&#233;o de m&#234;me qualit&#233; que celle affich&#233;";
    }
    case "qual2": switch (lang) {
        default: return "2: تحميل جودة عالية لملف الفيديو بصيغة (FLV أو MP4)";
        case "fr": return "2: Lien de t&#233;l&#233;chargement vers la vid&#233;o en haute qualit&#233; (FLV ou MP4)";
    }
    case "qual3": switch (lang) {
        default: return "3: تحميل الملف بجودة عالية بصيغة MP3";
        case "fr": return "3: Lien de t&#233;l&#233;chargement vers la vid&#233;o en MP4 de haute qualit&#233;";
    }
    case "auto1": switch (lang) {
        default: return "1: تشغيل تلقائي يعمل";
        case "fr": return "1: D&#233;marrage manuel";
    }
    case "auto2": switch (lang) {
        default: return "2: تشغيل تلقائي لايعمل";
        case "fr": return "2: D&#233;marrage automatique";
    }
  }
  return "";
}
function get_text_QS(lang,variable) {
  switch(variable) {
    case "link1": switch (lang) {
        default: return "عرض جودة منخفضة (flv)";
        case "fr": return "Voir en Basse Qualit&#233; (flv)";
    }
    case "link2": switch (lang) {
        default: return "عرض جودة عاليه (flv)";
        case "fr": return "Voir en Haute Qualit&#233; (flv)";
    }
    case "link3": switch (lang) {
        default: return "عرض جودة عاليه (mp4)";
        case "fr": return "Voir en Haute Qualit&#233; (mp4)";
    }
  }
  return "";
}
function get_text_MC(lang,variable) {
  switch(variable) {
    case "stop": switch (lang) {
        default: return "توقف";
        case "fr": return "Arr&#234;t";
    }
    case "step": switch (lang) {
        default: return "الخطوة";
        case "fr": return "Pas &#224; pas";
    }
    case "play": switch (lang) {
        default: return "تشغيل / استئناف";
        case "fr": return "Lire / Relancer";
    }
    case "pause": switch (lang) {
        default: return "ايقاف مؤقت";
        case "fr": return "Pause";
    }
    case "begin": switch (lang) {
        default: return "يبدأ";
        case "fr": return "D&#233;but";
    }
    case "loop": switch (lang) {
        default: return "التفاف";
        case "fr": return "En boucle";
    }
    case "rewind": switch (lang) {
        default: return "رجوع";
        case "fr": return "Retour arri&#232;re";
    }
    case "end": switch (lang) {
        default: return "النهاية";
        case "fr": return "Fin";
    }
    case "kill": switch (lang) {
        default: return "انقر نقره مزدوجه لايقاف العرض";
        case "fr": return "Double click pour stopper le NetStream et le lecteur Vid&#233;o";
    }
    case "embed": switch (lang) {
        default: return "فتح في لسان جديد";
        case "fr": return "Lien Embed";
    }
    case "fscr": switch (lang) {
        default: return "ملء الشاشة";
        case "fr": return "Lien plein &#233;cran";
    }
  }
  return "";
}


//***************************************** Page settings ************************************************//
// Get youtube locale (for languages support)
function get_page_lang() {
  // new method... on watch page
  var llplw=document.getElementById('lang-locale-picker-links-wrapper');
  if(llplw) {
    var locale=llplw.getElementsByTagName('a');
    var language=locale[1].textContent;
    var languages=unsafeWindow.gUILanguages;
    var languages_nb=languages.length;
    for(h=0;h<languages_nb;h++) {
      if(HtmlUnicodeDecode(languages[h][1])==language) {
        var lang=languages[h][0].toLowerCase();
        GM_setValue("Youtube_Download_Locale_Setting",lang);
        return lang;
      }
    }
  }
  // new method... on user page
  var smld=document.getElementById('small-masthead-language-dropdown');
  if(smld) {
    var dd=smld.parentNode.childNodes[3];
    var locale=dd.getElementsByTagName('a');
    var language=locale[0].firstChild.textContent;
    var languages=smld.getElementsByTagName('a');
    var languages_nb=languages.length;
    for(h=0;h<languages_nb;h++) {
      if(languages[h].textContent==language) {
        var cmd=languages[h].getAttribute('onclick');
        var lang=cmd.match(/\(\'(.*?)\'/)[1].toLowerCase();
        return lang;
      }
    }
  }
  // via hostname ?
  var language=window.location.host.match(/^(\w+?)\.youtube\.\w+$/i);
  if(language!=null) {
    lang=language[1].toLowerCase();
    return lang;
  }
  lang=GM_getValue("Youtube_Download_Locale_Setting","www");
  return lang;
}

function get_page_fmt() {
  var selected_fmt=window.location.search.match(/[?&]fmt=(\d*)/i);
  if(selected_fmt==null) { selected_fmt=0; } else { selected_fmt=selected_fmt[1]; }
  if(!(isPositiveInteger(selected_fmt))) { selected_fmt=0; }
  return(selected_fmt);
}


function check_on_youtube() {
  if(window.location.host.match(/^\w+?\.youtube\.\w+$/i)) { return 1; }
  return 0;
}

function check_on_watchpage() {
  if(window.location.pathname.match(/^\/watch$/i)) { return 1; }
  return 0;
}

function check_on_youtubewatchpage() {
  return check_on_youtube() && check_on_watchpage();
}

//************************************************************
//***** Download Link ****************************************
//************************************************************
function clean_filename(filename) {
  // Clean filename (UNICODE Method)
  //filename = filename.replace(/\ /g,String.fromCharCode(65279));
  filename = filename.replace(/\:/g,String.fromCharCode(65306));
  filename = filename.replace(/\\/g,String.fromCharCode(65340));
  filename = filename.replace(/\//g,String.fromCharCode(65295));
  filename = filename.replace(/\</g,String.fromCharCode(65308));
  filename = filename.replace(/\>/g,String.fromCharCode(65310));
  filename = filename.replace(/\*/g,String.fromCharCode(65290));
  filename = filename.replace(/\?/g,String.fromCharCode(65311));
  filename = filename.replace(/\"/g,String.fromCharCode(65282));
  filename = filename.replace(/\|/g,String.fromCharCode(65372));
  // Clean filename (Underline Method)
  //filename = filename.replace(/[\:\\\/\<\>\?\*\"\|]/g, "_");
  return filename;
}

function add_ext(filename,fmt) {
  if(fmt==18) { return(filename+".mp4"); }
  return(filename+".flv");
}

function url_fmt(fmt) {
  if(fmt==0) { return(""); }
  return("&fmt="+fmt);
}

function get_dl_fmt(fmt,fmt_map,quality_setting) {
  var dl_fmt=fmt;
  switch(quality_setting) {
    case 1:
      if(!(fmt_map)) { dl_fmt=0; }
      break;
    case 2:
      if(fmt!=18) { dl_fmt=6; }
      if(!(fmt_map)) { dl_fmt=0; }
      break;
    case 3:
      dl_fmt=18;
      if(fmt==18 && !(fmt_map)) { dl_fmt=0; }
      break;
  }
  return dl_fmt;
}

function add_dl_qual_links(page_lang, selected_fmt) {
  var wpd = document.getElementById(ytPlayerDivName);
  if(!(wpd)) { show_alert('Download Link Disabled : "'+ytPlayerDivName+'" not found'); return; }
  var playerEmbed = document.getElementById(ytPlayerEmbedName);
  if(!(playerEmbed)) { show_alert('Download Link Disabled : "'+ytPlayerEmbedName+'" not found'); return; }
  var wvt = document.getElementById(ytTitleDivName);
  if(!(wvt)) { show_alert('Download Link Disabled : "'+ytTitleDivName+'" not found'); return; }

  var Options_title = HtmlUnicodeDecode(get_text_DL(page_lang,"menu"));

  var flashvars = playerEmbed.getAttribute('flashvars');
  var t_id      = flashvars.match(/\&t=([^(\&|$)]*)/i)[1];
  var video_id  = flashvars.match(/video_id=([^(\&|$)]*)/i)[1];
  var video_url = window.location.protocol+'//'+window.location.host+'/get_video?video_id=' + video_id + '&t=' + t_id;

  // Retrieve fmt
  var fmt_map=(flashvars.search(/fmt_map\=\d+/i)>=0)
  var download_fmt = get_dl_fmt(selected_fmt,fmt_map,GM_getValue("Youtube_Download_Quality_Setting",2));

  // === Add the download link and the filename ready to copy
  // Retrieve filename
  var filename = clean_filename(wvt.getElementsByTagName("*")[0].textContent);
  if(filename.length<1) {filename="video";}

  // Insert the new element code
  var newElement = document.createElement('div');
  var newElement1 = document.createElement('div');
  newElement1.setAttribute('id','Youtube_download_posmenu');
  newElement1.setAttribute('style','position:absolute;');
  newElement.appendChild(newElement1);
  var newElement2 = document.createElement('table');
  newElement2.setAttribute('style','border:1px solid #DDDDDD; margin:0 0 5px 0; padding:0; width:876px; background:#F0F0F0');
  var newElement2tr = document.createElement('tr');
  var newElement2td1 = document.createElement('td');
  newElement2td1.setAttribute('id','Youtube_download_openmenu');
  newElement2td1.setAttribute('style','width:18px;');
  var newElement2td1Div = document.createElement('div');
  newElement2td1Div.setAttribute('title',Options_title);
  newElement2td1Div.setAttribute('style','line-height:18px;font-size:18px;cursor:pointer; color:#8888FF; background:#F0E0E0;');
  newElement2td1Div.textContent=String.fromCharCode(10070);
  newElement2td1.appendChild(newElement2td1Div);
  newElement2tr.appendChild(newElement2td1);
  var newElement2td2 = document.createElement('td');
  newElement2td2.setAttribute('style','width:auto; padding:0 1px 0 5px; white-space:nowrap;');
  var newElement2td2A = document.createElement('a');
  newElement2td2A.setAttribute('id','Youtube_download_link');
  newElement2td2A.setAttribute('target','_blank');
  newElement2td2A.setAttribute('class','hLink');
  newElement2td2A.setAttribute('href',video_url+url_fmt(download_fmt));
  newElement2td2A.textContent=HtmlUnicodeDecode(get_text_DL(page_lang,"dlink"));
  newElement2td2.appendChild(newElement2td2A);
  newElement2tr.appendChild(newElement2td2);
  var newElement2td3 = document.createElement('td');
  newElement2td3.setAttribute('style','width:100%;');
  var newElement2td3Div = document.createElement('div');
  var newElement2td3Input = document.createElement('input');
  newElement2td3Input.setAttribute('id','Youtube_download_filename');
  newElement2td3Input.setAttribute('style','border:0; width:500px; background:#F0F0F0;');
  newElement2td3Input.setAttribute('type','text');
  newElement2td3Input.setAttribute('readonly','readonly');
  newElement2td3Input.setAttribute('onClick','this.focus();this.select();');
  newElement2td3Input.setAttribute('value',add_ext(filename,download_fmt));
  newElement2td3Div.appendChild(newElement2td3Input);
  newElement2td3.appendChild(newElement2td3Div);
  newElement2tr.appendChild(newElement2td3);
  newElement2.appendChild(newElement2tr);
  newElement.appendChild(newElement2);

  var wvt_td=newElement.getElementsByTagName('td');
  if(wvt_td.length>2) { block_text_select(wvt_td[0]); block_text_select(wvt_td[1]); }
  wvt.parentNode.insertBefore(newElement, wvt);

  // Cosmetic change
  var ydf=document.getElementById("Youtube_download_filename");
  if(ydf) { ydf.style.width=ydf.parentNode.clientWidth+"px"; }
  var mh=document.getElementById('masthead');
  if(mh) { mh.style.paddingBottom="8px"; }
}

function set_quality(quality, selected_fmt) {
  // Set new quality value
  GM_setValue("Youtube_Download_Quality_Setting",quality);

  // Retrieve fmt
  var download_fmt=0;
  var playerEmbed = document.getElementById(ytPlayerEmbedName);
  if(playerEmbed) {
    var flashvars = playerEmbed.getAttribute('flashvars');
    var fmt_map=(flashvars.search(/fmt_map\=\d+/i)>=0)
    download_fmt = get_dl_fmt(selected_fmt,fmt_map,quality);
  }

  // Change download link
  var linkdl = window.document.getElementById('Youtube_download_link');
  if (linkdl) {
    var linktext = linkdl.href.replace(/(\&?fmt\=\d+)/gi,"");
    linkdl.href=linktext+url_fmt(download_fmt);
  }

  // Change filename
  var YDF = window.document.getElementById('Youtube_download_filename');
  if (YDF) {
    var filename= YDF.value.match(/^(.*)\.[\w\d]{3,4}$/);
    if(filename!=null) { YDF.value=add_ext(filename[1],download_fmt); }
  }
}

function set_autoplay(autoplay) {
  GM_setValue("Youtube_Download_Autoplay_Setting",autoplay);
}

function menu_quality(value) {
  // Change the position of the ">" in the menu box and close it
  var MenuElem = window.document.getElementById('Youtube_Download_Menu');
  if(MenuElem) {
    SetItem=window.document.getElementById('Youtube_Download_Menu_Setting');
    if(SetItem) {
      var div_Elem=SetItem.getElementsByTagName("div");
      div_Elem[0].style.visibility="hidden";
      div_Elem[1].style.visibility="hidden";
      div_Elem[2].style.visibility="hidden";
      div_Elem[value-1].style.visibility="visible";
    }
    MenuElem.style.display="none";
  }
}

function menu_autoplay(value) {
  // Change the position of the ">" in the menu box and close it
  var MenuElem = window.document.getElementById('Youtube_Download_Menu');
  if(MenuElem) {
    AutoItem=window.document.getElementById('Youtube_Download_Menu_Autoplay');
    if(AutoItem) {
      var div_Elem=AutoItem.getElementsByTagName("div");
      div_Elem[0].style.visibility="hidden";
      div_Elem[1].style.visibility="hidden";
      div_Elem[value].style.visibility="visible";
    }
    MenuElem.style.display="none";
  }
}

function menu_function_setQual(quality, selected_fmt) {
  switch (quality) {
    case 1:
    case 2:
    case 3:
      menu_quality(quality);
      set_quality(quality, selected_fmt);
  }
}

function menu_function_auto(autoplay) {
  switch (autoplay) {
    case 0:
    case 1:
      menu_autoplay(autoplay);
      set_autoplay(autoplay);
  }
}

function make_options_menu(page_lang, selected_fmt) {
  var posMenuelem  = window.document.getElementById('Youtube_download_posmenu');
  var OpenMenuElem = window.document.getElementById('Youtube_download_openmenu');
  if(posMenuelem && OpenMenuElem) {
    //== Make a menubox for Quality setting
    var MenuElem = document.createElement('div');
    MenuElem.id="Youtube_Download_Menu";
    MenuElem.setAttribute("style", "display:none; position: absolute; z-index: 99; margin:0; padding:0; width: 540px;");

    var arrow = document.createElement('div')
    arrow.setAttribute('style','float:left; width:1em; font-weight:bold;');
    arrow.textContent='>';

    var u1_Elem = document.createElement('ul');
    u1_Elem.id="Youtube_Download_Menu_Setting";
    u1_Elem.setAttribute("style","list-style-type:none; cursor:pointer; margin:1px; padding:0; border: 1px solid black; background-color: #DDDDFF;width:540px;");
    var li_Elem=new Array();
    for(var h=0;h<=2;h++) {
      li_Elem[h] = document.createElement('li');
      li_Elem[h].setAttribute("style","margin:0; padding:5px;");
      li_Elem[h].appendChild(arrow.cloneNode(true));
      li_Elem[h].appendChild(document.createTextNode(HtmlUnicodeDecode(get_text_DL(page_lang,"qual"+(h+1)))));
      li_Elem[h].addEventListener('mouseover' , function() { this.style.backgroundColor="#CCCCFF"; }, true);
      li_Elem[h].addEventListener('mouseout'  , function() { this.style.backgroundColor=""; }, true);
      li_Elem[h].value=h+1;
      li_Elem[h].addEventListener('click'     , function() { menu_function_setQual(this.value, selected_fmt); }, true);
      u1_Elem.appendChild(li_Elem[h]);
    }
    MenuElem.appendChild(u1_Elem);

    //== Make a menubox for autostart
    var u2_Elem = document.createElement('ul');
    u2_Elem.id="Youtube_Download_Menu_Autoplay";
    u2_Elem.setAttribute("style","list-style-type:none; cursor:pointer; margin:1px; padding:0; border: 1px solid black; background-color: #FFDDDD; width:540px;");
    for(var h=3;h<=4;h++) {
      li_Elem[h] = document.createElement('li');
      if(h==3) { li_Elem[h].setAttribute("style","margin:0; padding:5px; width:255px; border-right: 1px solid #888888;"); }
      else     { li_Elem[h].setAttribute("style","margin:0; padding:5px; width:264px; position:absolute; top:2px; left:268px;"); }
      li_Elem[h].appendChild(arrow.cloneNode(true));
      li_Elem[h].appendChild(document.createTextNode(HtmlUnicodeDecode(get_text_DL(page_lang,"auto"+(h-2)))));
      li_Elem[h].addEventListener('mouseover' , function() { this.style.backgroundColor="#FFCCCC"; }, true);
      li_Elem[h].addEventListener('mouseout'  , function() { this.style.backgroundColor=""; }, true);
      li_Elem[h].value=h-3;
      li_Elem[h].addEventListener('click'     , function() { menu_function_auto(this.value); }, true);
      u2_Elem.appendChild(li_Elem[h]);
    }
    MenuElem.insertBefore(u2_Elem,u1_Elem);

    // Select position of the menubox on top of the button
    arrow=null;
    block_text_select(MenuElem);
    posMenuelem.appendChild(MenuElem);
    MenuElem.style.left = "-1px";
    MenuElem.style.top  = (1-getHeight(MenuElem))+"px";

    //== Make the openbutton to link to the menubox
    OpenMenuElem.addEventListener('click', function() { swap_display(MenuElem); }, true);

    // Update the menubox from the setting
    menu_quality(GM_getValue("Youtube_Download_Quality_Setting",2))
    menu_autoplay(GM_getValue("Youtube_Download_Autoplay_Setting",1))
  }
}

//** === Download Link === **//
function add_download_link(page_lang, selected_fmt) {
  if(check_on_youtubewatchpage()) {
    add_dl_qual_links(page_lang, selected_fmt);
    make_options_menu(page_lang, selected_fmt);
  }
}

//************************************************************
//***** Quality Selector *************************************
//************************************************************
function add_quality_selector(page_lang, selected_fmt) {
  if(!check_on_youtubewatchpage()) { return; }
  var wrv=document.getElementById(ytRatingsViewsName);
  if(!(wrv)) { show_alert('Quality Selector Disabled : "'+ytRatingsViewsName+'" not found'); return; }

  // Delete the original video quality setting switch (Cosmetic change)
  var wvqs=document.getElementById("watch-video-quality-setting");
  if (wvqs) { wvqs.parentNode.removeChild(wvqs); }
  wrv.style.marginTop="10px"

  // Clean URL
  var vurl = window.location.href;
  vurl=vurl.replace(/\#$/,"");
  vurl=vurl.replace(/\&?fmt\=\d+(\&|$)/gi,"");
  vurl=vurl.replace(/\&?feature\=(relate|user)[^(\&|$)]*/gi,"");

  // fmt_map ?
  var fmt_map=1;
  var playerEmbed = document.getElementById(ytPlayerEmbedName);
  if(playerEmbed) {
    var flashvars = playerEmbed.getAttribute('flashvars');
    fmt_map=(flashvars.search(/fmt_map\=\d+/i)>=0)
  }

  // Create links
  var link1=null; var link2=null; var link3=null;
  if(selected_fmt==6 || selected_fmt==18) {
    link1=document.createElement("a");
    link1.setAttribute('class','hLink');
    link1.setAttribute('href',vurl+url_fmt(0));
  } else { link1=document.createElement("span"); }
  if(selected_fmt!=6)  {
    link2=document.createElement("a");
    link2.setAttribute('class','hLink');
    link2.setAttribute('href',vurl+url_fmt(6));
  } else { link2=document.createElement("span"); }
  if(selected_fmt!=18) {
    link3=document.createElement("a");
    link3.setAttribute('class','hLink');
    link3.setAttribute('href',vurl+url_fmt(18));
  } else { link3=document.createElement("span"); }

  link1.textContent = HtmlUnicodeDecode(get_text_QS(page_lang,"link1"));
  link2.textContent = HtmlUnicodeDecode(get_text_QS(page_lang,"link2"));
  link3.textContent = HtmlUnicodeDecode(get_text_QS(page_lang,"link3"));

  if(selected_fmt!=6 && selected_fmt!=18) { link1.setAttribute('style','font-weight:bold;'); }
  if(selected_fmt==6)    {  if(fmt_map)   { link2.setAttribute('style','font-weight:bold;'); } else { link1.setAttribute('style','font-weight:bold;'); } }
  if(selected_fmt==18)   {  if(fmt_map)   { link3.setAttribute('style','font-weight:bold;'); } else { link1.setAttribute('style','font-weight:bold;'); } };

  // Add the Quality Video links
  var newElement = document.createElement('div');
  newElement.setAttribute('style','width:480px; margin-top:4px;');
  var table = document.createElement('table');
  table.setAttribute('style','border:1px solid #CCCCCC; margin:3px 0 0px 0; padding:0; text-align:center; width:480px; color:#880000; background:#F0F0F0;');
  newElement.appendChild(table);
  var tr    = document.createElement('tr');
  table.appendChild(tr);
  var td1 = document.createElement('td'); td1.appendChild(link1); tr.appendChild(td1);
  var td2 = document.createElement('td'); td2.appendChild(link2); tr.appendChild(td2);
  var td3 = document.createElement('td'); td3.appendChild(link3); tr.appendChild(td3);
  block_text_select(newElement);
  wrv.parentNode.insertBefore(newElement, wrv);
}

//**********************
//*** change_links() ***
//**********************
function clean_link_and_add_fmt(link,fmt) {
  // Clean URL
  link=link.replace(/\#$/,'');
  link=link.replace(/\&?fmt\=\d+(\&|$)/gi,'');
  link=link.replace(/\&?feature\=(relate|user)[^(\&|$)]*/gi,'');
  // Add fmt to URL
  return link+url_fmt(fmt);
}

var change_links_with_fmt_fail=0;
function change_links_with_fmt(element,fmt) {
  if(!(element)) { return; }
  var links=null;
  try { links=document.evaluate('.//a[@href]',element,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); } catch(err) { links=null; }
  if(links) {
    var links_lg=links.snapshotLength;
    for(var h=0;h<links_lg;h++) {
      var link=links.snapshotItem(h).href;
      if(link.match(/youtube\.\w+\/watch\?/i)) { links.snapshotItem(h).href=clean_link_and_add_fmt(link,fmt); }
    }
    return;
  }
  try { links=element.getElementsByTagName("a"); } catch(err) { links=null; }
  if(links) {
    var links_nb=links.length;
    for(var h=0;h<links_nb;h++) {
      var link=links[h].href;
      if(link.match(/youtube\.\w+\/watch\?/i)) { links[h].href=clean_link_and_add_fmt(link,fmt); }
    }
    return;
  }
  var msg="change_links: Impossible to get links (XPath and getElementsByTagName failed)";
  if(change_links_with_fmt_fail) { GM_log(msg+' ('+Math.random()+')'); }
  else { change_links_with_fmt_fail+=1; show_alert(msg,1); }
}

//** === change_links === **//
function change_links(selected_fmt) {
  var last_fmt=GM_getValue("Youtube_Download_fmt",0);
  if(check_on_youtubewatchpage()) { //== Watch pages
    if(last_fmt!=0) {
      var wurl=window.location.href;
      // Link from the Flash player ? (NR=1)
      if (wurl.search(/[?&]NR\=\d+/i)>=0) {
        wurl=wurl.replace(/\&?NR\=\d+(\&|$)/gi,'');
        clean_link_and_add_fmt(wurl,last_fmt);
        window.location.replace(wurl);
        return;
      }
    }
    GM_setValue("Youtube_Download_fmt",selected_fmt);
    // Change links of User videos after loading it
    var wmf=document.getElementById("watch-more-from");
    if(wmf)  {  wmf.addEventListener('load', function() { change_links_with_fmt(wmf,  selected_fmt); }, true); }
    // Change links of Related videos box after loading it
    var wrvb=document.getElementById("watch-related-vids-body");
    if(wrvb) { wrvb.addEventListener('load', function() { change_links_with_fmt(wrvb, selected_fmt); }, true); }
    // Playlist panel support
    var playlist=document.getElementById("playlist-panel");
    if(playlist) { playlist.addEventListener('load', function() { change_links_with_fmt(playlist, selected_fmt); }, true); }
    // Change all links in the page
    change_links_with_fmt(window.document.body, selected_fmt);
  } else { //== Other pages
    // Change all links in the page
    change_links_with_fmt(window.document.body, last_fmt);
  }
}

//************************************************************
//***** Media Controller *************************************
//************************************************************
var get_movie_player_fail=0;
function get_movie_player(ytplayer_name) {
  if(!ytplayer_name) { ytplayer_name=ytPlayerEmbedName; } 
  ytplayer=unsafeWindow.document.getElementById(ytplayer_name);
  if(!ytplayer) {
    var msg='Media Controller warning : "'+ytplayer_name+'" not found';
    if(get_movie_player_fail) { GM_log(msg+' ('+Math.random()+')'); }
    else { get_movie_player_fail+=1; show_alert(msg); }
  }
  return ytplayer;
}

// N/A (-2), unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5). 
function get_player_state(ytplayer) {
  var state=-1; try { state=ytplayer.getPlayerState(); } catch(err) { state=-2; }
  if(state==-2) {
    GM_log('Media Controller warning : "'+ytplayer.id+'" state not available ('+Math.random()+')');
    if(ytplayer.getAttribute('ytembedtype')==1) {
      // Check allowscriptaccess (must be 'always')
      var allowScript=ytplayer.getAttribute('allowscriptaccess');
      if(!(allowScript) || !(allowScript.match(/^always$/i))) {
        ytplayer.setAttribute('allowscriptaccess','always');
        show_alert('Media Controller Notice: Reloading the player "'+ytplayer.id+'" to allow script access');
        player_revive(ytplayer.id); // Revive it...
      }
    }
  }
  return state;
}

// §§§ Stop §§§
function player_stop(ytplayer_name) {
  var ytplayer=get_movie_player(ytplayer_name);
  if(ytplayer) {
    var state=get_player_state(ytplayer);
    if(state==-1) { window.setTimeout( function() { player_stop(); }, 50); return; }
    if(state<0 || state>3) { return; }
    ytplayer.pauseVideo(); ytplayer.seekTo(0,1); player_pause(ytplayer_name);
  }
}

// §§§ Step §§§
function player_frame(ytplayer_name) {
  var frame_cursor=0;
  var ytplayer=get_movie_player(ytplayer_name);

  function player_frame_pause(ytplayer) {
    var state=get_player_state(ytplayer);
    if(state<=0) { return; }
    var new_pos=ytplayer.getCurrentTime();
    //GM_log(frame_cursor+"/"+new_pos+" ("+Math.random()+")");
    if(new_pos==frame_cursor || state==3) {
      window.setTimeout( function() { player_frame_pause(ytplayer); }, 2);
      return;
    }
    ytplayer.pauseVideo(ytplayer.id);
  }

  if(ytplayer) {
    var state=get_player_state(ytplayer);
    if(state<=0 || state==3) { return; }
    frame_cursor=ytplayer.getCurrentTime();
    ytplayer.playVideo(ytplayer_name);
    player_frame_pause(ytplayer);
  }
}

// §§§ Play §§§
function player_play(ytplayer_name) {
  if(player_killed!=0) { player_revive(ytplayer_name); return; }
  var ytplayer=get_movie_player(ytplayer_name);
  if(ytplayer) {
    var state=get_player_state(ytplayer);
    if(state==-1) { window.setTimeout( function() { player_play(); }, 50); return; }
    if(state<0) { return; }
    ytplayer.playVideo();
  }
}
// Revive the player
var player_killed=0;
function player_revive(ytplayer_name) {
  var ytplayer = document.getElementById(ytplayer_name);
  if(!(ytplayer)) { show_alert('Revive Failed : "'+ytplayer_name+'" not found'); return; }

  // Make autoplay on
  if(ytplayer.getAttribute('ytembedtype')==1) {
    var flashvars = ytplayer.getAttribute('flashvars');
    var autoplay  = flashvars.match(/autoplay\=(\d+)/i);
    if(autoplay) { flashvars=flashvars.replace(/autoplay\=\d+/i,"autoplay=1"); }
    else { flashvars=flashvars+'&autoplay=1'; }
    ytplayer.setAttribute('flashvars',flashvars);
  } else { // ytembedtype==2
    var srcvars = ytplayer.getAttribute('src');
    var autoplay  = srcvars.match(/autoplay\=(\d+)/i);
    if(autoplay) { srcvars=srcvars.replace(/autoplay\=\d+/i,"autoplay=1"); }
    else { srcvars=srcvars+'&autoplay=1'; }
    ytplayer.setAttribute('src',srcvars);
  }

  // Revive the video player
  flushNode(ytplayer);
  player_killed=0;

  // Test if a loop is set
  player_check_limit(ytplayer_name);
}

// §§§ Pause §§§
function player_pause(ytplayer_name) {
  var ytplayer=get_movie_player(ytplayer_name);
  if(ytplayer) {
    var state=get_player_state(ytplayer);
    if(state==-1 || state==3) { window.setTimeout( function() { player_pause(ytplayer_name); }, 50); return; }
    if(state<=0) { return; }
    ytplayer.pauseVideo();
  }
}


// §§§ Begin §§§
function player_memo(ytplayer_name) {
  var ytplayer=get_movie_player(ytplayer_name);
  if(get_player_state(ytplayer)<-1) { return; }
  var bt_state=document.getElementById(ytplayer_name+'-Memo_state');
  if(ytplayer && bt_state) {
    if(get_player_state(ytplayer)<=0) {
      bt_state.style.display="none";
      bt_state.setAttribute('value',0);
      return;
    }
    if(bt_state.style.display=="none") {
      var new_pos=ytplayer.getCurrentTime();
      ytplayer.seekTo(new_pos,1); // Get real seek time
      new_pos=ytplayer.getCurrentTime();
      if(new_pos<0) { new_pos=0; }
      bt_state.style.display="block";
      bt_state.setAttribute('value',new_pos.toString());
    } else {
      bt_state.style.display="none";
      bt_state.setAttribute('value',0);
    }
  }
}

// §§§ Loop §§§
function player_loop(ytplayer_name) {
  var bt_state=document.getElementById(ytplayer_name+'-Loop_state');
  if(bt_state) {
    if(bt_state.style.display=="none") {
      var ytplayer=get_movie_player(ytplayer_name);
      if(get_player_state(ytplayer)<-1) { return; }
      bt_state.style.display="block";
      player_check_limit(ytplayer_name);
    } else {
      bt_state.style.display="none";
    }
  }
}

// §§§ Rewind §§§
function player_rewind(ytplayer_name) {
  var ytplayer=get_movie_player(ytplayer_name);
  if(ytplayer) {
    var state=get_player_state(ytplayer);
    if(state<0) { return; }
    var memo_pos=0;
    var memo_state=document.getElementById(ytplayer_name+'-Memo_state');
    if(memo_state) { memo_pos=parseFloat(memo_state.getAttribute('value'),9); }
    var player_pos=ytplayer.getCurrentTime();
    if(memo_pos>=player_pos) {
      ytplayer.seekTo(0,1);
    } else {
      ytplayer.seekTo(memo_pos,1);
    }
  }
}

// §§§ End §§§
function player_limit(ytplayer_name) {
  var ytplayer=get_movie_player(ytplayer_name);
  if(get_player_state(ytplayer)<-1) { return; }
  var bt_state=document.getElementById(ytplayer_name+'-Limit_state');
  if(ytplayer && bt_state) {
    if(get_player_state(ytplayer)<0) {
      bt_state.style.display="none";
      bt_state.setAttribute('value',0);
      return;
    }
    if(bt_state.style.display=="none") {
      var new_pos=ytplayer.getCurrentTime();
      if(new_pos<0) { new_pos=0; }
      bt_state.style.display="block";
      bt_state.setAttribute('value',new_pos.toString());
      player_check_limit(ytplayer_name);
    } else {
      bt_state.style.display="none";
      bt_state.setAttribute('value',0);
    }
  }
}

// §§§ Kill §§§ (Double click for this one)
var player_freeze_number=0;
function player_freeze(ytplayer_name) {
  player_freeze_number = player_freeze_number+1;
  window.setTimeout( function() { player_freeze_number=0; }, 250);
  if(player_freeze_number>1) {
    var ytplayer=get_movie_player(ytplayer_name);
    if(get_player_state(ytplayer)>=-1) { ytplayer.pauseVideo(); ytplayer.stopVideo(); }
    player_killed=1;
  }
}


function startTimer() {
    myTimer = setTimeout=('myFunction()',10000); // myTimer holds the id of the timer
    timerRunning = true; // whenever you start a timer set the timerRunning flag to true 
}

function stopTimer() {
    if (timerRunning)
        clearTimeout(myTimer); 
}


// Need a serial of interrupts to check the end of the selection
var player_check_limit_timerid=null;
function player_check_limit_routine(ytplayer_name) {
  if(player_killed) { return; }
  var ytplayer=get_movie_player(ytplayer_name);
  if(!ytplayer) { return; }

  var M_state=document.getElementById(ytplayer_name+'-Memo_state');
  var L_state=document.getElementById(ytplayer_name+'-Limit_state');
  var Loop_state=document.getElementById(ytplayer_name+'-Loop_state');
  if(L_state && M_state && Loop_state) {
    if(Loop_state.style.display=='none') { return; }

    var state=get_player_state(ytplayer);
    if(state<0) { player_check_limit_timerid=window.setTimeout( function() { player_check_limit_timerid=null; player_check_limit_routine(ytplayer_name); }, 1000); return; }

    var pos=ytplayer.getCurrentTime();
    // Test Infinite buffering
    if(state==3) { // video buffering
      if(pos>ytplayer.getDuration()-0.5) {
        if(ytplayer.getVideoStartBytes()+ytplayer.getVideoBytesLoaded()>=ytplayer.getVideoBytesTotal())
          { state=0; }
      }
    }

    var vmemo=parseFloat(M_state.getAttribute('value'),9);
    var vlimit=parseFloat(L_state.getAttribute('value'),9);
    if((pos>=vlimit && L_state.style.display!='none') || state==0) { ytplayer.seekTo(vmemo,1); if(state==0) { player_play(ytplayer_name); } }

    // On watch page, onMediaControllerPlayerStateChange take care of the video end, so we end here
    if(L_state.style.display=='none' && check_on_youtubewatchpage()) { return; }
    player_check_limit_timerid=window.setTimeout( function() { player_check_limit_timerid=null; player_check_limit_routine(ytplayer_name); }, 50);
    return;
  }
}
function player_check_limit(ytplayer_name) {
  window.clearTimeout(player_check_limit_timerid);
  player_check_limit_routine(ytplayer_name);
}

function get_fullscreenURL() {
  var url=unsafeWindow.fullscreenUrl;
  if(url) { return window.location.protocol+"//"+window.location.host+url.toString(); }
  return null;
}

function get_embedURL() {
  var url=unsafeWindow.embedUrl;
  if(url) { return url.toString(); }
  return null;
}

// *********************************************************************************************************** //
// Bind Player Event for the End of video
function bind_movie_player_event() {
  // Only for youtube watch pages
  if(!check_on_youtubewatchpage()) { return; }

  //~~~~~~~~ Startof innerscript ~~~~~~//
  var innerscript = function() {

function check_movie_player() {
  var playerEmbed = document.getElementById('__movie_player');
  if(playerEmbed) { return; }
  var wpd = document.getElementById('__watch-player-div');
  if(!wpd) { return; }
  var temp=null;
  try { temp=wpd.getElementsByTagName("embed"); } catch(err) { temp=null; }
  if(temp) { temp[0].setAttribute('id','__movie_player'); }
}

function check_allowscriptaccess(ytplayer) { // Check for allowscriptaccess (must be 'always')
  allowScript=ytplayer.getAttribute('allowscriptaccess');
  if(!(allowScript) || !(allowScript.match(/^always$/i))) {
    ytplayer.setAttribute('allowscriptaccess','always');
    return 1;
  }
  return 0;
}

function set_autoplay(ytplayer,new_autoplay) {
  // Autoplay setting is only for the watch pages (no more use)
  //if(!(window.location.pathname.match(/^\/watch$/i))) { return 0; }
  var flashvars = ytplayer.getAttribute('flashvars');
  var autoplay=flashvars.match(/autoplay\=(\d+)/i);
  if(new_autoplay!="1") {
    if(!(autoplay)) {
      ytplayer.setAttribute('flashvars',flashvars+'&autoplay=0');
      return 1;
    } else if (autoplay[1]!=0) {
      ytplayer.setAttribute('flashvars',flashvars.replace(/autoplay\=\d+/i,"autoplay=0"));
      return 1;
    }
  } else {
    if(autoplay) {
      if(autoplay[1]!=1) {
        ytplayer.setAttribute('flashvars',flashvars.replace(/autoplay\=\d+/i,"autoplay=1"));
        return 1;
      }
    }
  }
  return 0;
}

function check_for_loop(ytplayer) {
  var loop_state=window.document.getElementById('__movie_player-Loop_state');
  if(loop_state.style.display!="none") {
    var memo_state=window.document.getElementById('__movie_player-Memo_state');
    if(memo_state) {
      var memo_pos=parseFloat(memo_state.getAttribute('value'),9);
      ytplayer.seekTo(memo_pos,1);
      window.setTimeout( function() { ytplayer.playVideo(); }, 50);
      return 1;
    }
  }
  return 0;
}

function check_still_buffering() {
  var player=window.document.getElementById('__movie_player');
  if(!player) { return; }
  var state=-1; try { state=player.getPlayerState(); } catch(err) { state=-2; }
  if(state==3) {
    if(player.getCurrentTime()>player.getDuration()-0.5)
      { check_for_loop(); }
  }
}

onMediaControllerPlayerStateChange = function(newState) {
  var player=window.document.getElementById('__movie_player');
  if(!player) { return; }
  // Test Infinite buffering
  if(newState==3) { // video buffering
    if(player.getCurrentTime()>player.getDuration()-0.5) {
      if(player.getVideoStartBytes()+player.getVideoBytesLoaded()>=player.getVideoBytesTotal()) {
        newState=0;
      } else {
        window.setTimeout( function() { check_still_buffering(); }, 1500);
      }
    }
  }
  // Check for Loop
  if(newState==0) { if(check_for_loop(player)) { return; } }
  // Original Youtube Script (if no loop)
  try { handleWatchPagePlayerStateChange(newState); } catch(err) {}
}

// Flush to remove the initial event since there no removeEventListener ?
var initialflush=0; // Don't do it since i see no problem :p
function bind_MediaControllerPlayerStateChange() {
  check_movie_player();
  var ytplayer=window.document.getElementById('__movie_player');
  if(ytplayer) {
    var flush=initialflush; initialflush=0;
    flush += check_allowscriptaccess(ytplayer);
    flush += set_autoplay(ytplayer,'__autoplay');
    if(flush) { ytplayer.parentNode.replaceChild(ytplayer.cloneNode(true),ytplayer); }
    var state=-1; try { state=ytplayer.getPlayerState(); } catch(err) { state=-2; }
    if(state<0) { // Still loading the player...
      window.setTimeout( function() { bind_MediaControllerPlayerStateChange(); }, 500);
    } else { // Loaded, so add an event
      ytplayer.addEventListener("onStateChange", "onMediaControllerPlayerStateChange");
    }
  }
}

// Redefine onYouTubePlayerReady (warning: can cause conflict with an other script)
onYouTubePlayerReady = function(playerid) {
  bind_MediaControllerPlayerStateChange();
}
bind_MediaControllerPlayerStateChange();
  } //~~~~~~~ Endof innerscript ~~~~~~~//

  innerscript=innerscript.toString().replace(/__movie_player/g,ytPlayerEmbedName)
             .replace(/__watch-player-div/,ytPlayerDivName)
             .replace(/__autoplay/,GM_getValue("Youtube_Download_Autoplay_Setting",1));

  var script=document.createElement("script");
  script.setAttribute('id','Youtube_Enhancer-PlayerStateChange');
  script.setAttribute('type','text/javascript');
  script.textContent="("+innerscript+")();";
  document.body.appendChild(script);
}
// *********************************************************************************************************** //


//** === Media Controller === **//
function media_controller(page_lang,ytplayer_name) {
  var ytplayer = document.getElementById(ytplayer_name);
  if(!(ytplayer)) { show_alert('Media Controller Disabled : "'+ytplayer_name+'" not found'); return; }

  // Media Controller display mode
  var ytplayer_width=ytplayer.getAttribute('width');
  var MC_height=26; var MC_leftB2=152; var MC_topB2=-1; var MC_leftB3=314;
  if(ytplayer_width<344) { MC_leftB2=(ytplayer_width-270)/2+115; MC_leftB3=ytplayer_width-30; }
  if(ytplayer_width<276) { MC_leftB2=8; MC_leftB3=116; MC_topB2=26; }

  var yt_p=ytplayer.parentNode; var yt_ns;
  if(yt_p.tagName=="OBJECT") { yt_ns=yt_p.nextSibling; yt_p=yt_p.parentNode; } else { yt_ns=ytplayer.nextSibling; }
  var center_style=""; if(yt_p.offsetLeft!=ytplayer.offsetLeft) { center_style="margin-left:auto; margin-right:auto;"; }

  mediabar=document.createElement('div');
  mediabar.setAttribute('id','Youtube_Media_Control-'+ytplayer_name);
  mediabar.setAttribute('style','position:relative; width:'+ytplayer_width+'px; '+center_style+'margin-bottom:3px; padding-bottom:3px; '
                       +'height:'+(MC_height+MC_topB2-1)+'px; border:0px; font-family:Arial,sans-serif;');

  var loop_display_init='none'; // use 'block' (loop enabled at start) or 'none' (loop disabled at start)

  // === Unicode player buttons ===
  // Stop
  var buttonStopDiv=document.createElement('div');
  buttonStopDiv.setAttribute('style','position:absolute; top:-9px; left:6px; font-size:26px; line-height:38px;');
  buttonStopDiv.textContent=String.fromCharCode(9632);

  // Step
  var buttonFrameDiv1=document.createElement('div');
  buttonFrameDiv1.setAttribute('style','position:absolute; top:0px; left:5px; font-size:12px; line-height:26px;');
  buttonFrameDiv1.textContent=String.fromCharCode(9613);
  var buttonFrameDiv2=document.createElement('div');
  buttonFrameDiv2.setAttribute('style','position:absolute; top:0px; left:8px; font-size:18px; line-height:26px;');
  buttonFrameDiv2.textContent=String.fromCharCode(9658);
  var buttonFrameDiv=document.createElement('div');
  buttonFrameDiv.appendChild(buttonFrameDiv1);
  buttonFrameDiv.appendChild(buttonFrameDiv2);

  // Play
  var buttonPlayDiv=document.createElement('div');
  buttonPlayDiv.setAttribute('style','position:absolute; top:-2px; left:5px; font-size:20px; line-height:30px;');
  buttonPlayDiv.textContent=String.fromCharCode(9658);

  // Pause
  var buttonPauseDiv1=document.createElement('div');
  buttonPauseDiv1.setAttribute('style','position:absolute; top:3px; left:8px; font-size:16px; line-height:21px;');
  buttonPauseDiv1.textContent=String.fromCharCode(9613);
  var buttonPauseDiv2=document.createElement('div');
  buttonPauseDiv2.setAttribute('style','position:absolute; top:3px; left:16px; font-size:16px; line-height:21px;');
  buttonPauseDiv2.textContent=String.fromCharCode(9613);
  var buttonPauseDiv=document.createElement('div');
  buttonPauseDiv.appendChild(buttonPauseDiv1);
  buttonPauseDiv.appendChild(buttonPauseDiv2);

  // Begin
  var buttonMemoDiv1=document.createElement('div');
  buttonMemoDiv1.setAttribute('style','position:absolute; top:-1px; left:6px; font-size:18px; line-height:28px; z-index:2;');
  buttonMemoDiv1.textContent=String.fromCharCode(12302);
  var buttonMemoDiv2=document.createElement('div');
  buttonMemoDiv2.setAttribute('id',ytplayer_name+'-Memo_state');
  buttonMemoDiv2.setAttribute('style','display:none; position:absolute; left:1px; top:1px; width:26px; height:'+(MC_height-2)+'px; z-index:1; background:#FFDD00;');
  buttonMemoDiv2.setAttribute('value',0);
  var buttonMemoDiv=document.createElement('div');
  buttonMemoDiv.appendChild(buttonMemoDiv1);
  buttonMemoDiv.appendChild(buttonMemoDiv2);

  // Loop
  var buttonLoopDiv1=document.createElement('div');
  buttonLoopDiv1.setAttribute('style','position:absolute; top:-10px; width:38; left:5px; font-size:42px; line-height:50px; z-index:2;');
  buttonLoopDiv1.textContent=String.fromCharCode(8617);
  var buttonLoopDiv2=document.createElement('div');
  buttonLoopDiv2.setAttribute('id',ytplayer_name+'-Loop_state');
  buttonLoopDiv2.setAttribute('style','display:'+loop_display_init+'; position:absolute; left:1px; top:1px; width:36px; height:'+(MC_height-2)+'px; z-index:1; background:#BBBBFF;');
  var buttonLoopDiv=document.createElement('div');
  buttonLoopDiv.appendChild(buttonLoopDiv1);
  buttonLoopDiv.appendChild(buttonLoopDiv2);

  // Rewind
  var buttonRewindDiv1=document.createElement('div');
  buttonRewindDiv1.setAttribute('style','position:absolute; top:-1px; left:7px; font-size:14px; line-height:25px;');
  buttonRewindDiv1.textContent='|';
  var buttonRewindDiv2=document.createElement('div');
  buttonRewindDiv2.setAttribute('style','position:absolute; top:1px; left:9px; font-size:24px; line-height:26px;');
  buttonRewindDiv2.textContent=String.fromCharCode(9664);
  var buttonRewindDiv=document.createElement('div');
  buttonRewindDiv.appendChild(buttonRewindDiv1);
  buttonRewindDiv.appendChild(buttonRewindDiv2);

  // End
  var buttonLimitDiv1=document.createElement('div');
  buttonLimitDiv1.setAttribute('style','position:absolute; top:-1px; left:14px; font-size:18px; line-height:26px; z-index:2;');
  buttonLimitDiv1.textContent=String.fromCharCode(12303);
  var buttonLimitDiv2=document.createElement('div');
  buttonLimitDiv2.setAttribute('id',ytplayer_name+'-Limit_state');
  buttonLimitDiv2.setAttribute('style','display:none; position:absolute; left:1px; top:1px; width:26px; height:'+(MC_height-2)+'px; z-index:1; background:#FFDD00;');
  buttonLimitDiv2.setAttribute('value',0);
  var buttonLimitDiv=document.createElement('div');
  buttonLimitDiv.appendChild(buttonLimitDiv1);
  buttonLimitDiv.appendChild(buttonLimitDiv2);

  // Kill
  var buttonFreezeDiv=document.createElement('div');
  buttonFreezeDiv.setAttribute('style','position:absolute; top:0px; left:2px; font-size:24px; line-height:27px;');
  buttonFreezeDiv.textContent=String.fromCharCode(9760);


  // === Media Controller Bar ===
  // 1st group
  var buttonStop=document.createElement('div');
  buttonStop.setAttribute('title',HtmlUnicodeDecode(get_text_MC(page_lang,"stop")));
  buttonStop.setAttribute('style','left: 0px; position:absolute; width:28px; height:'+MC_height+'px; border: 1px solid #CCCCCC; cursor:pointer; background:#E8E8E8; border-top:0;');
  buttonStop.appendChild(buttonStopDiv);
  buttonStop.addEventListener('mouseover', function() { this.style.color="#E00000"; }, true);
  buttonStop.addEventListener('mouseout',  function() { this.style.color=""; }, true);
  buttonStop.addEventListener('click',     function() { player_stop(ytplayer_name); }, true);
  block_text_select(buttonStop);
  mediabar.appendChild(buttonStop);

  var buttonFrame=document.createElement('div');
  buttonFrame.setAttribute('title',HtmlUnicodeDecode(get_text_MC(page_lang,"step")));
  buttonFrame.setAttribute('style','left:29px; position:absolute; width:28px; height:'+MC_height+'px; border: 1px solid #CCCCCC; cursor:pointer; background:#E8E8E8; border-top:0;');
  buttonFrame.appendChild(buttonFrameDiv);
  buttonFrame.addEventListener('mouseover', function() { this.style.color="#E00000"; }, true);
  buttonFrame.addEventListener('mouseout',  function() { this.style.color=""; }, true);
  buttonFrame.addEventListener('click',     function() { player_frame(ytplayer_name); }, true);
  block_text_select(buttonFrame);
  mediabar.appendChild(buttonFrame);

  var buttonPlay=document.createElement('div');
  buttonPlay.setAttribute('title',HtmlUnicodeDecode(get_text_MC(page_lang,"play")));
  buttonPlay.setAttribute('style','left:58px; position:absolute; width:28px; height:'+MC_height+'px; border: 1px solid #CCCCCC; cursor:pointer; background:#E8E8E8; border-top:0;');
  buttonPlay.appendChild(buttonPlayDiv);
  buttonPlay.addEventListener('mouseover', function() { this.style.color="#E00000"; }, true);
  buttonPlay.addEventListener('mouseout',  function() { this.style.color=""; }, true);
  buttonPlay.addEventListener('click',     function() { player_play(ytplayer_name); }, true);
  block_text_select(buttonPlay);
  mediabar.appendChild(buttonPlay);

  var buttonPause=document.createElement('div');
  buttonPause.setAttribute('title',HtmlUnicodeDecode(get_text_MC(page_lang,"pause")));
  buttonPause.setAttribute('style','left:87px; position:absolute; width:28px; height:'+MC_height+'px; border: 1px solid #CCCCCC; cursor:pointer; background:#E8E8E8; border-top:0;');
  buttonPause.appendChild(buttonPauseDiv);
  buttonPause.addEventListener('mouseover', function() { this.style.color="#E00000"; }, true);
  buttonPause.addEventListener('mouseout',  function() { this.style.color=""; }, true);
  buttonPause.addEventListener('click',     function() { player_pause(ytplayer_name); }, true);
  block_text_select(buttonPause);
  mediabar.appendChild(buttonPause);


  // 2nd group
  var buttonMemo=document.createElement('div');
  buttonMemo.setAttribute('title',HtmlUnicodeDecode(get_text_MC(page_lang,"begin")));
  buttonMemo.setAttribute('style','left:'+MC_leftB2+'px; top:'+(MC_topB2+1)+'px; position:absolute; width:28px; height:'+MC_height+'px; border: 1px solid #CCCCCC; cursor:pointer; background:#E8E8E8; border-top:0;');
  buttonMemo.appendChild(buttonMemoDiv);
  buttonMemo.addEventListener('mouseover', function() { this.style.color="#00C040"; }, true);
  buttonMemo.addEventListener('mouseout',  function() { this.style.color=""; }, true);
  buttonMemo.addEventListener('click',     function() { player_memo(ytplayer_name); }, true);
  block_text_select(buttonMemo);
  mediabar.appendChild(buttonMemo);

  var buttonLoop=document.createElement('div');
  buttonLoop.setAttribute('title',HtmlUnicodeDecode(get_text_MC(page_lang,"loop")));
  buttonLoop.setAttribute('style','left:'+(MC_leftB2+29)+'px; top:'+(MC_topB2+1)+'px; position:absolute; width:38px; height:'+MC_height+'px; border: 1px solid #CCCCCC; cursor:pointer; background:#E8E8E8; border-top:0;');
  buttonLoop.appendChild(buttonLoopDiv);
  buttonLoop.addEventListener('mouseover', function() { this.style.color="#00C040"; }, true);
  buttonLoop.addEventListener('mouseout',  function() { this.style.color=""; }, true);
  buttonLoop.addEventListener('click',     function() { player_loop(ytplayer_name); }, true);
  block_text_select(buttonLoop);
  mediabar.appendChild(buttonLoop);

  var buttonRewind=document.createElement('div');
  buttonRewind.setAttribute('title',HtmlUnicodeDecode(get_text_MC(page_lang,"rewind")));
  buttonRewind.setAttribute('style','left:'+(MC_leftB2+68)+'px; top:'+(MC_topB2+1)+'px; position:absolute; width:28px; height:'+MC_height+'px; border: 1px solid #CCCCCC; cursor:pointer; background:#E8E8E8; border-top:0;');
  buttonRewind.appendChild(buttonRewindDiv);
  buttonRewind.addEventListener('mouseover', function() { this.style.color="#E00000"; }, true);
  buttonRewind.addEventListener('mouseout',  function() { this.style.color=""; }, true);
  buttonRewind.addEventListener('click',     function() { player_rewind(ytplayer_name); }, true);
  block_text_select(buttonRewind);
  mediabar.appendChild(buttonRewind);

  var buttonLimit=document.createElement('div');
  buttonLimit.setAttribute('title',HtmlUnicodeDecode(get_text_MC(page_lang,"end")));
  buttonLimit.setAttribute('style','left:'+(MC_leftB2+97)+'px; top:'+(MC_topB2+1)+'px; position:absolute; width:28px; height:'+MC_height+'px; border: 1px solid #CCCCCC; cursor:pointer; background:#E8E8E8; border-top:0;');
  buttonLimit.appendChild(buttonLimitDiv);
  buttonLimit.addEventListener('mouseover', function() { this.style.color="#00C040"; }, true);
  buttonLimit.addEventListener('mouseout',  function() { this.style.color=""; }, true);
  buttonLimit.addEventListener('click',     function() { player_limit(ytplayer_name); }, true);
  block_text_select(buttonLimit);
  mediabar.appendChild(buttonLimit);


  // 3rd group
  var buttonFreeze=document.createElement('div');
  buttonFreeze.setAttribute('title',HtmlUnicodeDecode(get_text_MC(page_lang,"kill")));
  buttonFreeze.setAttribute('style','left:'+MC_leftB3+'px; position:absolute; width:28px; height:'+MC_height+'px; border: 1px solid #CCCCCC; cursor:pointer; background:#FFF0F0; border-top:0;');
  buttonFreeze.appendChild(buttonFreezeDiv);
  buttonFreeze.addEventListener('mouseover', function() { this.style.color="#E00000"; }, true);
  buttonFreeze.addEventListener('mouseout',  function() { this.style.color=""; }, true);
  buttonFreeze.addEventListener('click',     function() { player_freeze(ytplayer_name); }, true);
  block_text_select(buttonFreeze);
  mediabar.appendChild(buttonFreeze);


  // 4th group
  if(check_on_youtubewatchpage()) {
    var eurl=get_embedURL();
    if(eurl) {
      var buttonEUInner=document.createElement('div');
      buttonEUInner.setAttribute('title',HtmlUnicodeDecode(get_text_MC(page_lang,"embed")));
      buttonEUInner.setAttribute('style','color:#0000F0; font-size:14px; position:absolute; top:-1px; left:1px; width:38px; text-align:center; line-height:28px;');
      buttonEUInner.textContent=String.fromCharCode(10065);

      var buttonEU=document.createElement('div');
      buttonEU.setAttribute('style','left:376px; position:absolute; width:39px; height:'+MC_height+'px; border: 1px solid #CCCCCC; cursor:pointer; background:#F0F0FF; border-top:0;');
      buttonEU.appendChild(buttonEUInner);
      buttonEU.addEventListener('mouseover' , function() { this.style.background="#E0E0FF"; buttonEUInner.style.textDecoration="underline"; }, true);
      buttonEU.addEventListener('mouseout'  , function() { this.style.background="#F0F0FF"; buttonEUInner.style.textDecoration="none"; }, true);
      buttonEU.addEventListener('click'     , function() { player_pause(ytplayer_name); }, true);
      block_text_select(buttonEU);

      var buttonEULink=document.createElement('a');
      buttonEULink.setAttribute('href',eurl);
      buttonEULink.setAttribute('target','_blank');
      buttonEULink.appendChild(buttonEU);
      mediabar.appendChild(buttonEULink);
    } else { GM_log('Media Controller : Global variable for "Embed URL" not found'); }

    var fsurl=get_fullscreenURL();
    if(fsurl) {
      var buttonFSInner=document.createElement('div');
      buttonFSInner.setAttribute('title',HtmlUnicodeDecode(get_text_MC(page_lang,"fscr")));
      buttonFSInner.setAttribute('style','color:#0000F0; font-size:14px; position:absolute; top:-1px; left:1px; width:60px; text-align:center; line-height:28px;');
      buttonFSInner.textContent=String.fromCharCode(8738,8194,8194,8194,10065);

      var buttonFS=document.createElement('div');
      buttonFS.setAttribute('style','left:416px; position:absolute; width:62px; height:'+MC_height+'px; border: 1px solid #CCCCCC; cursor:pointer; background:#F0F0FF; border-top:0;');
      buttonFS.appendChild(buttonFSInner);
      buttonFS.addEventListener('mouseover' , function() { this.style.background="#E0E0FF"; buttonFSInner.style.textDecoration="underline"; }, true);
      buttonFS.addEventListener('mouseout'  , function() { this.style.background="#F0F0FF"; buttonFSInner.style.textDecoration="none"; }, true);
      buttonFS.addEventListener('click'     , function() { player_pause(ytplayer_name); }, true);
      block_text_select(buttonFS);

      var buttonFSLink=document.createElement('a');
      buttonFSLink.setAttribute('href',fsurl);
      buttonFSLink.setAttribute('target','_blank');
      buttonFSLink.appendChild(buttonFS);
      mediabar.appendChild(buttonFSLink);
    } else { GM_log('Media Controller : Global variable for "Fullscreen URL" not found'); }
  }

  //ytplayer.parentNode.appendChild(mediabar);
  yt_p.insertBefore(mediabar, yt_ns);

  // Vertical offset fix
  var ytplayer_height=ytplayer.getAttribute('height');
  var topdiff=mediabar.offsetTop-ytplayer_height-ytplayer.offsetTop;
  if(topdiff!=0) { mediabar.style.top=(-topdiff)+'px'; }

  player_check_limit(ytplayer_name);
}

function check_jsapi(vars) {
  var temp=vars.match(/enablejsapi\=(\d+)/i);
  if(temp) { if(temp[1]!="1") { return vars+temp.replace(/enablejsapi\=\d+/i,'enablejsapi=1'); } }
  else { return vars+'&enablejsapi=1'; }
}

function bind_player_with_media_controller(page_lang,player,number) {
  var player_src=player.src;
  if(player_src.match(/^http\:\/\/(\w+\.)?youtube\.com\/v\//)) { // Object Embeded youtube video
    if(!player.id) { player.setAttribute('id','Youtube_movie-'+number); }
    player.setAttribute('src',check_jsapi(player_src));
    player.setAttribute('allowscriptaccess','always');
    player.setAttribute('ytembedtype',2);
    flushNode(player);
    media_controller(page_lang,player.id);
  } else if(player_src.match(/^http\:\/\/(\w+\.)?ytimg\.com\//)) { // Normal youtube video
    if(!player.id) { player.setAttribute('id','Youtube_movie-'+number); }
    player.setAttribute('ytembedtype',1);
    media_controller(page_lang,player.id);
  }
}

function bind_media_players(page_lang) {
  var players=null;
  try { players=document.evaluate('//embed[@src]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); } catch(err) { players=null; }
  if(players) {
    var players_lg=players.snapshotLength;
    for(var h=0;h<players_lg;h++) { bind_player_with_media_controller(page_lang,players.snapshotItem(h),h); }
    return;
  }
  try { players=document.getElementsByTagName("embed"); } catch(err) { players=null; }
  if(players) {
    var players_lg=players.length;
    for(var h=0;h<players_lg;h++) { bind_player_with_media_controller(page_lang,players[h],h); }
    return;
  }
  var msg="Media Controller: Impossible to get media players (XPath and getElementsByTagName failed)";
  show_alert(msg,1);
}

function add_media_controller(page_lang) {
  bind_media_players(page_lang);
}

//**************************************** Miscellaneous *************************************************//
function remove_watch_promoted_container() {
  if(check_on_youtubewatchpage()) {
    var wpc=document.getElementById('watch-promoted-container');
    if(wpc) { var pwpc=wpc.parentNode; pwpc.parentNode.removeChild(pwpc); }
  }
}

//************************************** Useful Sub-routines *********************************************//
function HtmlUnicodeDecode(str) {
  // Change HTML code "&#xxxxx;" to Unicode
  var out="";
  if(str==null) { return(out); }
  var l=str.length;
  for (var i=0; i<l; i++) {
    var ch=str.charAt(i);
    if(ch=='&') {
      var sci=str.indexOf(';',i+1);
      if(sci>0) {
        var entity=str.substring(i+1,sci);
        if(entity.length>1 && entity.charAt(0)=='#') {
          entity=entity.substring(1);
          if(entity.charAt(0).toLowerCase()=='x') { ch=String.fromCharCode(parseInt('0'+entity)); }
          else { ch=String.fromCharCode(parseInt(entity)); }
        }
        i=sci;
      }
    }
    out+=ch;
  }
  return out;
}

function getHeight(element) {
  // All Width and Height properties give 0 on elements with display none,
  // so enable the element temporarily
  var els = element.style;
  var originalVisibility = els.visibility;
  var originalPosition = els.position;
  var originalDisplay = els.display;
  els.visibility = 'hidden';
  els.position = 'absolute';
  els.display = 'block';
  var originalHeight = element.clientHeight;
  els.display = originalDisplay;
  els.position = originalPosition;
  els.visibility = originalVisibility;
  return originalHeight;
}

function isPositiveInteger(value) { // Check if positive integer
  return (value.toString().search(/^\d+$/)==0);
}

function flushNode(element) { // Flush a node
  element.parentNode.replaceChild(element.cloneNode(true),element);
}

function swap_display(element) {
  var els = element.style;
  if(els.display=="none") { els.display="block"; } else { els.display="none"; }
}

function block_text_select(element) { // Try to make a text non selectable
  var els = element.style;
  if(els.userSelect!=undefined) {els.userSelect="none";}
  else if (els.MozUserSelect!=undefined) {els.MozUserSelect="none";}
}

function show_alert(msg, force) {
  GM_log(msg+' ('+Math.random()+')');
  // Show a HTML alert box (only for watch pages or if forced)
  if(force==1 || check_on_youtubewatchpage()) {
    warningelem=document.createElement('div');
    warningelem.setAttribute("style","color:#FFFFFF; background:#FF8000; width:auto; text-align:center; font-size:24px; border: 3px solid #CC0088; margin:2px;");
    warningelem.textContent=msg;
    document.body.insertBefore(warningelem, document.body.firstChild);
    //document.body.appendChild(warningelem);
  }
}

//******************************************* Main() *****************************************************//
function main() {
  // Clear onYouTubePlayerReady
  unsafeWindow.onYouTubePlayerReady=function() {};

  // Bind event for loop and autoplay (for watch pages only)
  try { bind_movie_player_event(); } catch(err) { show_alert('bind_movie_player_event => '+err); }

  // Get page info
  var page_lang="www"; var page_fmt=0;
  try { page_fmt=get_page_fmt(); page_lang=get_page_lang(); } catch(err) { show_alert('Initialisation failed: '+err); }

  // Miscellaneous
  remove_watch_promoted_container();

  // change_links (part of Quality Selector) (change_links must be the first to run)
  try { change_links(page_fmt);                    } catch(err) { show_alert('change_links => '+err); }
  // Download Link
  try { add_download_link(page_lang, page_fmt);    } catch(err) { show_alert('download_link => '+err); }
  // Quality Selector
  try { add_quality_selector(page_lang, page_fmt); } catch(err) { show_alert('quality_selector => '+err); }
  // Media Controller
  try { add_media_controller(page_lang);           } catch(err) { show_alert('media_controller => '+err); }
}
main();

} )();
// ]]>
