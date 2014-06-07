	
Code:
// ==UserScript==
// @name           openEBA
// @namespace      openEBA
// @description    openEBA
// @include        http://eatenbyants.de/*
// @include        http://*.eatenbyants.de/*
// @exclude        http://forum.eatenbyants.de/*
// @version        14
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_listValues
// @grant          GM_deleteValue
// @grant          GM_log
// ==/UserScript==

const configItems = {
  "eba_disable_reload"              : [disableReloadOnFinish, "Auto-Reload ausschalten"],
  "eba_enable_sound_on_job_end"     : [enableSoundOnJobEnd, "Am Ende des Countdowns einen Sound abspielen"],
  "eba_enable_note"                 : [insertNote, "Notitzblock"],
  "eba_sort_filter_options"         : [sortAndFilterOptions, "Alle Auswahllisten sortieren und filtern"],
  "eba_modify_small_ad_link"        : [modifySmallAdLink, "Internet-Link auf Kleinanzeigen/Sonstige umbiegen"],
  "eba_modify_shop_link"            : [modifyShopLink, "Ameisenshop-Link auf Ankauf umbiegen"],
  "eba_enable_shop_move_form"       : [shopMoveForm, "Formular in den Kleinanzeigen &uuml;ber die Tabelle schieben"],
  "eba_enable_shop_separator"       : [shopSeparator, "Kleinanzeigen-Eintr&auml;ge trennen"],
  "eba_enable_shop_move_selection"  : [shopMoveSelection, "Selektierte Kleinanzeigen-Eintr&auml;ge nach oben schieben"],
  "eba_enable_stock_filter"         : [processStock, "Lager zusammenfassen"],
  "eba_enable_copy_percentages"     : [copyHungerPercentages, "Hunger-Prozente mit Nachkommastelle"],
  "eba_enable_formi_move_form"      : [processSingleFormicariumView, "Futtertabelle unter F&uuml;tterformular verschieben"],
  "eba_enable_key_navi"             : [enableKeyNavi, "Mit v und n (bzw. q und e) zwischen Formicarien navigieren, z bzw. p f&uuml;ttern"],
  "eba_enable_highlight_shop_prices": [highlightShopPrices, "Ameisenshop-Preise f&auml;rben"],
  "eba_enable_stat_beautify"        : [statBeautify, "Statistik verbessern"],
  "eba_enable_process_jobs"         : [processJobOffers, "Jobs mit Informationen anreichern"],
  "eba_enable_formi_statistic"      : [updateFormiStatistic, "Formicarien-Statistik"],
  "eba_enable_mark_unread"          : [enableMarkUnread, "Option zum Markieren von ungelesenen Nachrichten einblenden"],
  "eba_modify_gui"                  : [modifyGUI, "GUI anpassen"],
  "eba_enableBookmarks"             : [enableBookmarks, "Bookmarks einblenden (Definition unten)"],
  "eba_snow"                        : [initSnow, "Schnee"]
}
const shopPriceLimits = {
  "Camponotus ligniperda": 6.34,
  "Formica fusca": 4.39,
  "Lasius flavus": 2.44,
  "Lasius niger": 1.47,
  "Myrmica rubra": 3.03,
  "Crematogaster scutellaris": 10.24,
  "Messor barbarus": 8.29,
  "Pheidole pallidula": 12.19,
  "Camponotus substitutus": 23.89,
  "Polyrhachis dives": 43.39,
  "Acromyrmex spec.": 49.24
}
enableConfig();
$.each(configItems, function(k, v) {
  GM_getValue(k, false) && v[0]();
});
function enableMarkUnread() {
  if(!$("h3:contains('Private Nachrichten : Posteingang')").length){return}
  $("input[type='submit']").before("<input id='eba_mark_unread' type='button' value='Ungelesene markieren'><br>");
  $("#eba_mark_unread").on("click", function(e) {
    $("a[href^='message.php?action=readmessage&id=']:has(b)").each(function(){
      var id = /id=(\d*)/.exec(this.href)[1];
      $("input[name='delmulti\["+id+"\]']").prop("checked", true);
    });
  });
}
function modifySmallAdLink() {
  $("#mainmenu a:contains('Internet')").attr("href", "/internet.php?cat=2&subcat=0&action=showitems");
}
function modifyShopLink() {
  $("#mainmenu a:contains('Ameisenshop')").attr("href", "/shop.php?cat=99");
}
function highlightShopPrices() {
  if (!$("center b:contains('Ameisen verkaufen')").length){return}
  $("table.liste tr").each(function () {
    var ant = $(this).find("td").eq(0).text();
    var price = parseFloat($(this).find("td").eq(1).text().replace(/,/, "."));
    if (shopPriceLimits[ant]<=price) {
      $(this).css("color", "red");
    } else if (shopPriceLimits[ant]*0.9<=price) {
      $(this).css("color", "yellow");
    }
  });
}
function updateFormiStatistic() {
  if(!$("h3:contains('Deine Formicarien')").length){return}
//  var timer = new Date().getTime(), time;
  $("div[id='shopitem']:contains('Larven')").each(function(i, e) {
    var div = $(this);
    var cells = div.find("table.liste td").add(div.find("div[id='group'] table.inner td")).filter(":odd");
    var queens = parseInt(cells.eq(0).text());
    var ants = parseInt(cells.eq(1).text());
    var eggs = parseInt(cells.eq(2).text());
    var larvae = parseInt(cells.eq(3).text());
    var cocoons = parseInt(cells.eq(4).text());
    var kind = cells.eq(5).text();
    var points = parseInt(cells.eq(6).text());
    var nest = cells.eq(7).text();
    var formicarium = cells.eq(8).text();
    var id = cells.eq(9).find("span").attr("id").substr(11);
    var sugarHunger = parseFloat(cells.eq(9).get(0).childNodes[2].nodeValue).toString().replace(/\./, ",");
    var proteinHunger = parseFloat(cells.eq(10).get(0).childNodes[2].nodeValue).toString().replace(/\./, ",");
    var hours = Math.floor($.now()/3600000);
    var dataLine = queens+"\t"+ants+"\t"+eggs+"\t"+larvae+"\t"+cocoons+"\t"+points+"\t"+nest+"\t"+formicarium+"\t"+sugarHunger+"\t"+proteinHunger;
    var savedData = GM_getValue("eba_statistic_"+id, null);
    if (savedData==null) {
      savedData=hours+"\t"+kind+"\n0\t"+dataLine;
      GM_setValue("eba_statistic_"+id, savedData);
    }
    var firstData = parseInt(savedData.substring(0, savedData.indexOf("\t")));
    var hoursSinceFirst = hours-firstData;
    var lastDataLine = savedData.substr(savedData.lastIndexOf("\n")+1);
    //new data collected
    if (hoursSinceFirst > parseInt(lastDataLine.substring(0,lastDataLine.indexOf("\t")))) {
      savedData+="\n"+hoursSinceFirst+"\t"+dataLine;
      GM_setValue("eba_statistic_"+id, savedData);
    }
    //show development
    var previousValues = savedData.substring(savedData.lastIndexOf("\n", savedData.lastIndexOf("\n")-1)+1, savedData.lastIndexOf("\n")).split("\t");
    var hoursPassed = hoursSinceFirst-parseInt(previousValues[0]);
    var applier = function(pos, index, newVal) {
      var t = (newVal-parseInt(previousValues[index]))/hoursPassed;
      t = Math.round(t*10)/10;
      t = t<0? ""+t: "+"+t;
      cells.eq(pos).attr("title", t);
    }
    applier(1, 2, ants);
    applier(2, 3, eggs);
    applier(3, 4, larvae);
    applier(4, 5, cocoons);
    applier(6, 6, points);
    //enable show statistic
    div.find("div[id='group'] center").append("<br><a id='eba_statistic_show_"+id+"' href='javascript:void(0)'>Statistik</a>");
    $("#eba_statistic_show_"+id).on("click", function(e) {
      var mainArea = $("td[width='700px']");
      mainArea.empty();
      var statisticHTML = "<div id='shopitem'><textarea id='eba_statistic_area' style='height:300px;width:100%;padding:0;border:1px solid #3aab54;'></textarea>";
      statisticHTML += "<button id='eba_statistic_ok' type='button'>OK</button></div>";
      mainArea.append(statisticHTML);
      var headLines = savedData.substring(0, savedData.indexOf("\n"))+"\nHours\tQueens\tAnts\tEggs\tLarvae\tCocoons\tPoints\tNest\tFormicarium\tSugar Hunger\tProtein hunger\n";
      $("#eba_statistic_area").val(headLines+savedData.substr(savedData.indexOf("\n")+1)).select();
      $("#eba_statistic_ok").on("click", function(e) {
        window.location.href = window.location.href.replace(/\?.*/, '');
      });
    });
  });
//  time = new Date().getTime(); GM_log("clean "+(time-timer)); timer=time;
}
function disableReloadOnFinish() {
  //change original script do prevent auto reload
  var script = $("script:contains('function taskcounter')");
  //only if present
  if (!script.length) {return}
  var t = script.html();
  var pre = t.substr(0, 556); var post = t.substr(t.length-798);
  if (pre.charAt(pre.length-1)==';' && post.charAt(0)=='}') { //only if unchanged
    var result = pre+"return;"+post;
//do it old style because jquery breaks on this:
//    $("body").append("<script type='text/javascript'>"+result+"</script>");
    var newS = document.createElement("script");
    newS.type = "application/javascript";
    newS.text = result;
    document.body.appendChild(newS);
    //remove original
    script.remove();
  } else {
    alert("Function changed!"); //cancel!
    return;
  }
}
function enableSoundOnJobEnd() {
  //establish own action on job finish
  var fishedReceived = false;
  $("#status").on("DOMNodeInserted", "#headercountdown", function(e){
    if ($("#headercountdown").text().indexOf("fertig")>=0 && !fishedReceived) {
      fishedReceived = true;
      var a = document.createElement('audio');
      a.src='http://ftp.tux.org/pub/X-Windows/games/freeciv/incoming/sounds/sonar2.wav';
      a.load();
      a.play(0);
    }
  });
}
function copyHungerPercentages() {
  if (!$("h3:contains('Formicarium'),h3:contains('Deine Formicarien')").length || ($("h3:contains('einrichten')").length)) {return;}
//  $("div[id='shopitem']").css("width", 650);
  $("div[id='shopitem']:contains('Larven')").each(function(i, e) {
    var div = $(this);
    var sugarSpan = div.find("span[id^='sugarhunger']");
    var sugarHunger = parseFloat(/.*\s+([\d\.]+),/.exec(sugarSpan.next().html())[1]);
    sugarSpan.parent().get(0).childNodes[2].nodeValue = " "+sugarHunger+"%";
    var proteinSpan = div.find("span[id^='proteinhunger']");
    var proteinHunger = parseFloat(/.*\s+([\d\.]+),/.exec(proteinSpan.next().html())[1]);
    proteinSpan.parent().get(0).childNodes[2].nodeValue = " "+proteinHunger+"%";
  });
}
function enableKeyNavi() {
  if (!$("h3:contains('Formicarium')").length || ($("h3:contains('einrichten')").length)) {return;}
  $(document).keypress(function(e) {
    var link;
    if (e.which==110 || e.which==101) { //next
      link = $("a:contains('chstes')").attr('href');
    } else if (e.which==118 || e.which==113) { //prev
      link = $("a:contains('voriges')").attr('href');
    } else if (e.which==122) { //feed sugar
      $("select[name='foodid']").eq(0).parent().submit();
    } else if (e.which==112) { //feed protein
      $("select[name='foodid']").eq(1).parent().submit();
    }
    if (link!=null) window.location.href = link;
  });
}
function processSingleFormicariumView() {
  if (!$("h3:contains('Formicarium')").length || ($("h3:contains('einrichten')").length)) {return}
  //move food table
  var foodTable = $("div[id='shopitem'] b:contains('Futter') ~ div[id='text'] > table.liste");
  foodTable.appendTo(foodTable.parent());
}
function shopMoveForm() {
  if (!$("center b:contains('Kleinanzeigen')").length){return}
  $("#shopitem").insertBefore($("table.liste"));
}
function shopSeparator() {
  if (!$("center b:contains('Kleinanzeigen')").length){return}
  var last = "Name";
  $("table.liste").find("tr").each(function() {
    var text = $(this).children().first().text();
    if (text!=last) {
      last = text;
      $(this).children().css({"padding-top":2, "border-top":"1px solid #3CAC56"});
    }
  });
}
function shopMoveSelection() {
  if (!$("center b:contains('Kleinanzeigen')").length){return}
  var inMisc = $("#shopitem").find("h3:contains('Sonstiges')").length;
  //separate each first new item
  $("#shopitem select").on("change", function(e){
    var text = $("#shopitem option:selected").text();
    text = text.substring(0, text.indexOf("(")-1);
    GM_setValue("eba_last_small_ads_"+inMisc, text); //remember last
    var trs = $("table.liste").find("tr");
    trs.filter(function(i){
      return $(this).html().indexOf(">"+text)>0;
    }).insertAfter(trs.eq(0));
  });
  //select a default
  var last = GM_getValue("eba_last_small_ads_"+inMisc);
  $("#shopitem option:contains('"+last+"')").prop("selected", true);
  $("#shopitem select").change();
}
function processStock() {
  if (!$("h3:contains('Dein Lager')").length) {return}
  var table = $("table.liste").first();
  var rows = table.find("tr");
  var header = rows.first();
  header.append("<td class='liste'><b>Anzahl</b></td>");
  header.find("td").first().css("min-width", "");

  var data = new Object();
  //<td class="liste">Myrmecia chrysogaster</td><td class="liste"><center>1</center></td><td class="liste"><center>0</center></td><td class="liste"><center>Reagenzglas</center></td>
  var regexp = /<td class="liste">(.*)<\/td><td class="liste"><center>(.*)<\/center><\/td><td class="liste"><center>(.*)<\/center><\/td><td class="liste"><center>(.*)<\/center><\/td>/;
  rows.slice(1).each(function(){
    var html = $(this).html();
    var result = regexp.exec(html);
    var key = result[1]+":"+result[2]+":"+result[3]+":"+result[4];
    if (typeof(data[key])==="undefined") {
      data[key]=1;
    } else {
      data[key]++;
    }
  });
 
  var results = new Array();
  $.each(data, function(k,v){
    var result = new Object();
    var values=k.split(":");
    result.kind=values[0];
    result.queens=values[1];
    result.ants=values[2];
    result.nest=values[3];
    result.count=v;
    results.push(result);
  });
 
  results.sort(function(a,b){
    if (a.kind > b.kind) return 1;
    if (a.kind < b.kind) return -1;
    var diff = a.queens - b.queens;
    if (diff!=0) return diff;
    diff = a.ants - b.ants;
    if (diff!=0) return diff;
    return (a.nest > b.nest)? 1 : -1;
  });
 
  // fast variant like with the dropboxes
  // table.empty();//400
  var t = table.get(0); var ct = t.cloneNode(false); t.parentNode.replaceChild(ct, t);table=$(ct);//6

  var html = "";
  $.each(results, function(i,e){
    html +=
      "<tr><td class='liste'>"+e.kind+"</td>"+
      "<td class='liste'><center>"+e.queens+"</center></td>"+
      "<td class='liste'><center>"+e.ants+"</center></td>"+
      "<td class='liste'><center>"+e.nest+"</center></td>"+
      "<td class='liste'><center>"+e.count+"</center></td></tr>";
  });
  rows = table.append(header).append(html).find("tr").slice(1);
  rows.filter(":odd").addClass("color2");
  rows.filter(":even").addClass("color1");
}
function sortAndFilterOptions() {
  $("select.dropdown").each(function (){
    var select = $(this);
    var data = new Object();
   
    var options = select.find("option").each(function(){
      var key = this.text;
      if (typeof(data[key])==="undefined") {
        data[key]=[1, this.value];
      } else {
        data[key][0]++;
      }
    });

    var results = new Array();
    $.each(data, function(k,v){
      var result = new Object();
      result.text=k;
      result.val=v[1];
      result.count=v[0];
      results.push(result);
    });

    results.sort(function(a,b) {
      if (a.text.toUpperCase() > b.text.toUpperCase()) return 1;
      if (a.text.toUpperCase() < b.text.toUpperCase()) return -1;
      return 0;
    });

    var html = "";
    $.each(results, function(i,e){
      html += "<option value='"+e.val+"'>"+e.text;
      if (e.count>1) {
        html += " ["+e.count+"]";
      }
      html += "</option>";
    });
   
    // various possibilities with significant different runtimes
    // var newSelect = $(this.cloneNode(false));select.replaceWith(newSelect);select = newSelect;//20
    var cs = this.cloneNode(false); this.parentNode.replaceChild(cs, this);select=$(cs);//2
    // this.innerHTML = "";//150
    // select.empty();//220
    // select.html("");//150
    // options.remove();//300

    select.append(html);
  });
}
function modifyGUI() {
  var sheet= document.styleSheets[0];
  sheet.insertRule('#shopmenucats a{padding:6px 4px 6px 4px; height:auto; margin:0}', sheet.cssRules.length);
  sheet.insertRule('#shopmenucats > br{display:none}', sheet.cssRules.length);
  sheet.insertRule('div#text{margin-top:0;padding:5px}', sheet.cssRules.length);
  if ($("center b:contains('Kleinanzeigen')").length) {
    //prevent wrapping of cells
    sheet.insertRule('table.liste td { white-space: nowrap; }', sheet.cssRules.length);
  }
  //message in formis are #error elsewhere #message
  var message = $("#message,#error");
  //only if one found
  if (message) {
    $("center #error").unwrap(); //only error ist wraped in <center>
    //remove <br> surrounding message
    message.siblings("br").remove();
    //move message to status
    $("#status").append(message).css("position", "relative");
    message.css({"position":"absolute", "color":"white", "background":"#004E12", "bottom":10, "right":300, "width":300});
  }
}
function insertNote() {
  if (!$("#shopmenucats").length){return}
  $("table.shop").first().parent().append("<br>Notizen:<br><textarea id='eba_note' style='height:750px;width:100%;padding:0;border:1px solid #3aab54;'></textarea>");
  $("#eba_note").on("blur", function(){
    GM_setValue("eba_note", $(this).val());
  }).val(GM_getValue("eba_note", ""));
}
function processJobOffers() {
  if(!$("h3:contains('Aktionen'),h3:contains('Forschung'),h3:contains('Arbeitsamt')").length) {return}
  const weekday = new Array("Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag");
  //start from now
  var starttime = new Date().getTime();
  //start from end of current if any
  var to = $("#headercountdown span").text();
  if (to!="") {
    var result = /(\d+).(\d+).(\d+) (\d+):(\d+):(\d+)/.exec(to.substring(4));
    var runTo = new Date(result[3], result[2]-1, result[1], result[4], result[5], result[6]);
    starttime = runTo.getTime();
  }
  $("form:contains('Dauer')").each(function() {
    var form = $(this);
    var nodes = form.contents().filter(function() {
      var result = this.nodeType === 3 && //text
        ((this.nodeValue.indexOf("Dauer")===0 && this.nextSibling!=null) || //starts with "Dauer", is not the current countdown
          this.nodeValue.indexOf(" Lohn")===0 || //starts with "Lohn"
          this.nodeValue.indexOf(" Kosten")===0); //starts with "Kosten"
      return result;
    }).get();
    if (nodes.length!=2) return true; //not found correctly => try next
    //duration nodes[0]
    var result = /(\d+):(\d+):(\d+)/.exec(nodes[0].nodeValue.substring(7));
    var sec = parseInt(result[1])*60*60 + parseInt(result[2])*60 + parseInt(result[3]);
    var end = new Date(starttime+sec*1000);
    var target = " [Endet "+weekday[end.getDay()]+", ";
    if (end.getHours()<10) target += "0";
    target += end.getHours() + ":";
    if (end.getMinutes()<10) target += "0";
    target += end.getMinutes() + "]";
    nodes[0].nodeValue = nodes[0].nodeValue+target;
    //earnings nodes[1], only with "Lohn"
    if (nodes[1].nodeValue.indexOf(" Lohn")==0) {
      result = /(\d+),(\d+) /.exec(nodes[1].nodeValue.substring(6));
      var mon = parseInt(result[1])*100 + parseInt(result[2]);
      var hourly = parseFloat(parseInt((mon)/(sec/3600)))/100;
      nodes[1].nodeValue = nodes[1].nodeValue+" [Stundenlohn "+hourly+"]";
    }
  });
}
function statBeautify() {
  insertPointsDiff();
  if (!$("#shopmenu:contains('Statistik')").length){return}
  //insert diff if on total points
  var ownPoints=null;
  if ($("#shopmenucats a b:contains('Gesamtpunktzahl')").length) {
    ownPoints = parseInt(/<br>Punkte: (.*?)<br>/.exec($("div#status").html())[1].replace(/\./g, ""));
  }
  //format 1000000 => 1.000.000
  $("table.liste td").each(function() {
    var td = $(this);
    var text = td.text();
    if (/^\d{4,}$/.test(text)) {
      if (ownPoints!=null) {
        var diff = parseInt(text)-ownPoints;
        td.attr("title", ((diff>0? "+":"")+diff).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."));
      }
      td.text(text.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."));
    }
  });
}
function insertPointsDiff() {
  //determine current hours
  var hours = parseInt((new Date().getTime()) / (1000*60*60));
  //find current value
  //div#status => Punkte xxx => first group => remove points => parseInt
  var status = $("div#status");
  var result = /Punkte:\s*([\.\d]*)/.exec(status.html());
  if (result==null) {return;} //reoccuring error for some users
  var currentPoints = parseInt(result[1].replace(/\./g, ""));
  var oldPoints1 = GM_getValue("eba_points1", 0);
  var oldPoints2 = GM_getValue("eba_points2", 0);
  var oldHours1 = GM_getValue("eba_hours1", 0);
  var oldHours2 = GM_getValue("eba_hours2", 0);
 
  if (hours>oldHours2) {
    //save new values and shift
    oldPoints1 = oldPoints2; GM_setValue("eba_points1", oldPoints1);
    oldPoints2 = currentPoints; GM_setValue("eba_points2", oldPoints2);
    oldHours1 = oldHours2; GM_setValue("eba_hours1", oldHours1);
    oldHours2 = hours; GM_setValue("eba_hours2", oldHours2);
  }
  var hourDiff = oldHours2 - oldHours1;
  var pointsDiff = oldPoints2 - oldPoints1;
  $("div#status img").attr("title", "+"+(pointsDiff/hourDiff).toFixed(1));
}
function enableBookmarks() {
  if (!$("#shopmenucats").length) {return}
  var html = "<hr>";
  var bookmarks = GM_getValue("eba_bookmarks", "").split("\n");
  $.each(bookmarks, function(i, bm) {
    var tl = bm.split(";");
    html+="<a href='"+tl[1]+"'>"+tl[0]+"</a>";
  });
  $("#shopmenucats").append(html);
}
function enableConfig() {
  if (!$("#shopmenu:contains('Statistik')").length) {return}
  $("#shopmenucats").append("<a href='/stats.php?limitplayers=14'>14-Tage-Statistik</a>");
  $("#shopmenucats").append("<hr><a id='eba_config_start' href='javascript:void(0)'>openEBA</a>");
  $("#eba_config_start").on("click", function(e) {
    if($("#eba_config_cancel").length) {
      return;
    }
    var mainArea = $("td[width='700px']");
    //save original content
    var original = mainArea.html();
    //show config
    mainArea.empty();
    var configHTML = "<div id='shopitem'>";
    $.each(configItems, function(k, v) {
      configHTML += "<input type='checkbox' id='"+k+"'>"+v[1]+"<br>";
    });
    configHTML += "<br>Bookmarks (&lt;Text&gt;;&lt;Link&gt;):<br><textarea id='eba_bookmarks' style='height:100px;width:90%'></textarea>";
    configHTML += "<div style='text-align:left;'><button id='eba_config_ok' type='button'>OK</button>";
    configHTML += "<button id='eba_config_cancel' type='button'>Abbruch</button></div>";
    configHTML += "<div style='text-align:right;'><button id='eba_config_reset' type='button'>Alle gespeicherten Daten l&ouml;schen</button></div>";
    configHTML += "</div>";
    mainArea.append(configHTML);
   
    //init config with current values
    $.each(configItems, function(k) {
      $("#"+k).prop("checked", GM_getValue(k, false));
    });
    $("#eba_bookmarks").val(GM_getValue("eba_bookmarks", ""));

    //on Cancel, replace with original
    $("#eba_config_cancel").on("click", function(e) {
      mainArea.html(original);
    });
   
    //on OK save values and reload
    $("#eba_config_ok").on("click", function(e) {
      $.each(configItems, function(k) {
        GM_setValue(k, $("#"+k).prop("checked"));
      });
      GM_setValue("eba_bookmarks", $("#eba_bookmarks").val());
      window.location.href = window.location.href.replace(/\?.*/, '');
    });
   
    //on reset delete all
    $("#eba_config_reset").on("click", function(e) {
      $.each(GM_listValues(), function(i, e){
        GM_deleteValue(e);
      });
      mainArea.html(original);
    });
  });
}
// Nach einer Idee von Fabian Schlieper (http://www.fabi.me/)
function randInt(from, to) { return from + Math.floor(Math.random() * (to - from)); }
function initSnow(){
  var header = $("#header").css("position", "relative");
  var bl = header.offset().left;
  var bt = 20;
  var br = bl + 580;
  var bb = bt + 140; 

  var fonts  = ['Arial Black', 'Arial Narrow', 'Times', 'Comic Sans MS'];
  var colors = ['#AAAACC','#DDDDFF','#CCCCDD','#F3F3F3','#F0FFFF'];
  var flakesHTML=""; for (var i = 0; i < 30; i++) { flakesHTML+='<span class="snowflake">*</span>'; }
  header.append(flakesHTML);
  $("span.snowflake").each(function (i, flake){   
    $(flake).css({
      position: "absolute",
      zIndex: 99,
      fontFamily: fonts[randInt(0, fonts.length)],
      fontSize: randInt(10, 22),
      color: colors[randInt(0, colors.length)],
      left: randInt(bl, br),
      top: randInt(bt, bb),
      marginLeft: 0
    });
  });
  window.setInterval(function() { return function() {
    $("span.snowflake").each(function (i, flake){
      var size = parseInt(flake.style.fontSize);
      var ym = Math.round(parseInt(flake.style.top) + 0.08 * size);
      var xm = Math.round(size * Math.sin(new Date().getTime()/(50*size)));
      if (ym > bb) {
        ym = bt;
      }
      flake.style.marginLeft = xm+"px";
      flake.style.top = ym+"px";
    });
  } }(), 50);
}