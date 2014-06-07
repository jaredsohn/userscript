// ==UserScript==
// @name           indexforum 3
// @namespace      http://forum.index.hu
// @description    Index Fórum Módosító Script
// @include        http://forum.index.hu/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.3/jquery-ui.min.js
// @resource       jqueryuicss http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.1/themes/ui-lightness/jquery-ui.css
// ==/UserScript==

// reklámok eltávolítása
function removeAds() {
  $("#site_header").remove();
  $("#rightcoltd").hide();
}

function replaceLinks() {
  // gyökér linkek
  $("a[href='/']").each(function() {
    id = "snclink_root";
    $(this).replaceWith('<span id="' + id + '" class="snclink">' + this.innerHTML + '</span>');
  });
  // Topikokat listázó linkek
  $("a[href*=Topic]").each(function() {
    id = $(this).attr("href").replace('http://', '');
    id = id.replace('/Topic/showTopicList?t=', '');
    id = "snclink_topiclist_" + id;
    $(this).replaceWith('<span id="' + id + '" class="snclink">' + this.innerHTML + '</span>');
  });
  // Egyedi topikot megjelenítő linkek
  $("a[href*=Article/showArticle]").each(function() {
    id = $(this).attr("href").replace('http://', '');
    id = id.replace('/Article/showArticle?t=', '');
    id = "snclink_showarticle_" + id;
    $(this).replaceWith('<span id="' + id + '" class="snclink">' + this.innerHTML + '</span>');
  });
  // Válaszoló fa linkek
  $("a[href*=Article/jumpTree]").each(function() {
    id = $(this).attr("href").replace('http://', '');
    random = Math.floor(Math.random()*9999) + 1;
    id = id.replace('/Article/jumpTree?a=', random + '_a__');
    id = id.replace('&t=', '__t__') + '__';
    id = "snclink_jumptree_" + id;
    $(this).replaceWith('<span id="' + id + '" class="snclink">' + this.innerHTML + ' (megnéz)</span><div id="div_' + id + '" style="display: none;"><br />Betöltés...</div>');
  });
  // Szerkesztő linkek
  $("a[href*=EditArticle]").each(function() {
    id = $(this).attr("href").replace('http://', '');
    id = id.replace('/EditArticle/', '');
    id = id.replace('vieweditarticle', '');
    id = id.replace('ReplayEditArticle', '');
    id = id.replace('?a=', '_a__');
    id = id.replace('?t=', '_t__');
    id = 'snclink_edit_' + id.replace('&t=', '__t__');
    $(this).replaceWith('<span id="' + id + '" class="snclink">' + this.innerHTML + '</span>');
  });
  // minden más link
  $("a").not("a[href^=http://]").each(function(index){
    if (readOnlyPages.indexOf('http://forum.index.hu' + $(this).attr("href")) == -1)
      $(this).replaceWith('<span class="snclink" id="snclink_link_' + index + '" title="' + $(this).attr("href") + '">' + $(this).html() + "</span>");
  });
  // linkek kinézete
  $(".snclink").css("color", "#4a3a00").hover(function() {$(this).css("cursor", "pointer").css("text-decoration", "underline")}, function() {$(this).css("text-decoration", "none")} );
  // egérkattintások ---
  // root link
  $("span[id=snclink_root]").click(function() {
    url = 'http://forum.index.hu/';
    loadPage(url, false);
  });
  // topic linkre
  $("span[id^=snclink_topiclist]").click(function(){
    url = 'http://forum.index.hu/Topic/showTopicList?t=' + $(this).attr("id").replace('snclink_topiclist_', '');
    loadPage(url, false);
  });
  // beírás linkre
  $("span[id^=snclink_showarticle]").click(function(){
    url = 'http://forum.index.hu/Article/showArticle?t=' + $(this).attr("id").replace('snclink_showarticle_', '');
    loadPage(url, false);
  });
  // válasz linkre
  $("span[id^=snclink_jumptree]").click(function(){
    link_content = $(this).html();
    if (link_content.search('megnéz') > -1) {
      div_content = $("#div_" + $(this).attr("id")).html();
      if (div_content == '<br>Betöltés...') {
        a_pos = $(this).attr("id").search('a__');
        t_pos = $(this).attr("id").search('t__');
        endpos = $(this).attr("id").length - 1;
        url = 'http://forum.index.hu/Article/jumpTree?a=' + $(this).attr("id").substring(a_pos + 3, t_pos - 1) + '&t=' + $(this).attr("id").substring(t_pos + 3, endpos);
        $("#div_" + $(this).attr("id")).show();
        link_content = link_content.replace('megnéz', 'bezár');
        $(this).html(link_content);
        loadReplyContent(url, $(this).attr("id"));
      }
      else {
        $("#div_" + $(this).attr("id")).show();
        link_content = link_content.replace('megnéz', 'bezár');
        $(this).html(link_content);
      }
    }
    else {
      $("#div_" + $(this).attr("id")).hide();
      link_content = link_content.replace('bezár', 'megnéz');
      $(this).html(link_content);
    }
  });
  // edit linkre
  $("span[id^=snclink_edit]").click(function() {
    a_pos = $(this).attr("id").search('a__');
    t_pos = $(this).attr("id").search('_t__');
    endpos = $(this).attr("id").length;
    url_instr = 'ReplayEditArticle';
    if (t_pos == -1)
      url_instr = 'vieweditarticle';
    url = 'http://forum.index.hu/EditArticle/' + url_instr;
    if (t_pos > -1)
      url = url + '?a=' + $(this).attr("id").substring(a_pos + 3, t_pos - 2) + '&t=' + $(this).attr("id").substring(t_pos + 4, endpos);
    else
      url = url + '?a=' + $(this).attr("id").substring(a_pos + 3, endpos);
    //window.open(url, 'Hozzászólás szerkesztése', "width=900, height=800, scrollbars=yes");
    $("body").append('<div id="edit_window" style="display: none;"></div>');
    loadEditContent(url, 'edit_window');
  });
  // az összes többi link
  $("span[id^=snclink_link]").click(function(){
    loadPage($(this).attr("title"), false);
  });
}

// oldalbetöltés
function loadPage(url_str, welcome) {
  $("body").append('<div id="#wait_dialog" style="display: none;">Betöltés folyamatban...</div>');
  GM_xmlhttpRequest({
        method: "GET",
        url: url_str,
        onreadystatechange: function() {
          if (!$("#wait_dialog").dialog("isOpen")) {
            $("#wait_dialog").dialog({modal: true});
          }
        },
        onload: function(response) {
          // aktuális url eltárolása
          GM_setValue('indexforum3_url', url_str);
          act_url = url_str;
          // tartalomből a head levágása
          rt = response.responseText;
          bodyStart = rt.search('<body');
          bodyEnd = rt.search('</body');
          rt = rt.substring(bodyStart + 1, bodyEnd - 1);
          bodyStartClose = rt.search('>');
          rt = rt.substring(bodyStartClose + 1);
          document.body.innerHTML = rt;
          // reklámok kivágása
          removeAds();
          // linkek felülírása
          replaceLinks();
          if (welcome) {
            $("body").append('<div id="welcome_dialog"><p>Üdvözöllek a Serenic Script által módosított Index fórumokon.</p></div>');
            $("#welcome_dialog").dialog({modal: true});
          }
        }
  });
}

// a válaszok kilistázása
function loadReplyContent(url_str, id) {
  GM_xmlhttpRequest({
        method: "GET",
        url: url_str,
        onload: function(response) {
          rt = response.responseText;
          // megkeressük a valódi tartalmat
          contentStart = rt.search('<!-- TOPIC -->');
          contentEnd = rt.search('rightcol.html START-->');
          rt = rt.substring(contentStart, contentEnd);
          rt = rt.replace('<!-- TOPIC -->', '');
          rt = rt.replace('<!-- Boxes\\/rightcol.html START-->', '');
          rt = rt.replace('<div id="mainspacer"><\\/div>', '');
          rt = rt.replace('<td valign="top" id="rightcoltd">', '');
          rt = rt.replace('<div id="rightcol">', '');
          $("#div_" + id).html('<table><tr>' + rt);
          // fejléc törlése
          $("#div_" + id + " #navi").remove();
          // "vissza a topikba" linkek törlése
          $("a[href*='go=']").remove();
          // hozzászólás számának megkeresése
          post_id = $("#" + id).parent().parent().parent().find(".art_h_r strong").eq(0).html();
          // ilyen id-jű válasz keresése és eltávolítása
          $("#div_" + id).find("#maintd table").each(function() {
            reply_id = $(this).find(".art_h_r strong").eq(0).html();
            if (reply_id == post_id) {
              $(this).remove();
            }
          });
          // kis háromszögek linktelenítése
          $("img[src=http://img.index.hu/forum/ikonz/tree_hi.gif]").parent().removeAttr("href");
          $("img[src=http://img.index.hu/forum/ikonz/tree_lo.gif]").parent().removeAttr("href");
        }
  });
}

// insert jquery-ui css
var jquicss = GM_getResourceText("jqueryuicss");
var absImgPath = "http://jquery-ui.googlecode.com/svn/tags/1.7/themes/ui-lightness/images/";
var r = new RegExp("images/", "g");
jquicss = jquicss.replace(r, absImgPath);
$("head").append('<style type="text/css">\n' + jquicss + '</style>');

var readOnlyPages = [
  'http://forum.index.hu/User/PassportToNick',
  'http://forum.index.hu/Search/search',
  'http://forum.index.hu/Custom/searchHelp'
];

// ha nincs átírva az oldal, akkor a tárolt (vagy default) oldal betöltése, ha nincs benne a readOnlyPages tömbben, illetve ha nem szerkesztő ablak
if ($(".snclink").length == 0 && readOnlyPages.indexOf(top.location) == -1 && top.location.toString().search('EditArticle') == -1) {
  loadPage(GM_getValue('indexforum3_url', 'http://forum.index.hu/Topic/showTopicList'), true);
}
