// ==UserScript==
// @name           Last.fm Quickfind - Taran's Version
// @namespace      
// @description    Quickly and easily browse through your favourite artists on Last.fm.
// @include        http://*.last.fm/*
// ==/UserScript==

var textboxWidth = 200;  // optimized for 200px

function xpath(query) {
    return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function sortFunction(b, a) {
    var curA = new Array();
    var curB = new Array();
    curA[0] = unescape(a[0]);
    curA[1] = a[1];
    curB[0] = unescape(b[0]);
    curB[1] = b[1];
    if (curA[1] < curB[1]) {
      return -1;
    }
    if (curA[1] > curB[1]) {
      return 1;
    }
    var aNoThe = curA[0];
    var bNoThe = curB[0];
    if (curA[0].indexOf("The ") == 0) {
      aNoThe = curA[0].substr(4);
    }
    if (curB[0].indexOf("The ") == 0) {
      bNoThe = curB[0].substr(4);
    }
    if (aNoThe == bNoThe) {
      return 0;
    }
    var sorted = new Array;
    sorted[0] = aNoThe;
    sorted[1] = bNoThe;
    sorted.sort();
    if (sorted[0] == aNoThe) {
      return 1;
    }
    return -1;
}

function addArtist(artist) {
    var commaArtists = GM_getValue("quickArtists", "");
    var equalArtists = commaArtists.split(",");
    var artists = new Array();
    for (var i = 0; i < equalArtists.length; i++) {
      artists[i] = equalArtists[i].split("=");
    }
    var match = 0;
    for (var i = 0; i < artists.length; i++) {
      if (unescape(artists[i][0]) == artist) {
        match = 1;
        artists[i][1]++;
        commaArtists = "";
        for (var j = 0; j < artists.length; j++) {
          commaArtists += (j == 0 ? "" : ",") + artists[j][0] + "=" + artists[j][1];
        }
        break;
      }
    }
    if (!match) {
      commaArtists += (commaArtists == "" ? "" : ",") + escape(artist) + "=1";
    }
    GM_setValue("quickArtists", commaArtists);
}

function reset(e) {
	GM_setValue("quickArtists", "");
	GM_setValue("lastQuickArtist", "");
	window.location.reload();
}

(function (){

		GM_registerMenuCommand("Reset Last.fm Quickfind", reset);
		
		var tarannewstyle = "div#headerQuickSearchBox {padding: 0px 4px 7px 4px; background: url('http://static.last.fm/depth/header/navextention_red.gif')"
			+ " top left no-repeat; position: absolute; z-index: 98; width: "+textboxWidth+"px; display: block; right: 203px; height: 36px;}"
			+ " body.black #headerQuickSearchBox {background: url('http://static.last.fm/depth/header/navextention_black.gif') top left no-repeat;}"
			+ " .degayed #headerQuickSearchBox {background-image: url();} #headerQuickSearchBox a { color: #ddd;}"
			+ " body.black .degayed #headerQuickSearchBox {background-image: url();} #headerQuickSearchBox a { color: #ddd;}"
			+ " #headerQuickSearchBox a:hover {background: none !important; color: #fff; text-decoration: underline !important; }";

		var taranss = document.createElement("style"); var tarant = document.createTextNode(tarannewstyle);
    var taranroot = (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]); taranss.appendChild(tarant); taranroot.appendChild(taranss);
    
    var headline = xpath("//div[@id='LastHeadline']");
    if (headline.snapshotLength == 0) {
      headline.innerHTML = "<h1></h1>";
    }
    
    headline = headline.snapshotItem(0);
    var added = 0;
    if (location.href.match(/^http:\/\/www\.last\.fm\/music\/[^\/]+(?:\/|)$/) &&
        !headline.innerHTML.match(/<h1>404 Page not found<\/h1>/)) {
      re = /http:\/\/www\.last\.fm\/music\/([^\/]+)\/?.*/;
      re.exec(location.href);
      var artist = xpath("//h1[@class='h1artist']").snapshotItem(0).innerHTML;
      addArtist(artist);
      var added = 1;
    }
    var scriptHTML = 'var quickArtists = new Array();';
    var commaArtists = GM_getValue("quickArtists", "");
    var equalArtists = commaArtists.split(",");
    var artists = new Array();
    for (var i = 0; i < equalArtists.length; i++) {
      artists[i] = equalArtists[i].split("=");
    }
    if (artists.length > 1) {
      artists.sort(sortFunction);
    }
    var anyArtists = (artists.length > 0 && artists[0][0] != "");
    scriptHTML += 'var selectDisplay = ' + anyArtists + ';' +
                  'function encodeURIComponent2(str) {var esc = plusify(escape(encodeURIComponent(str)));' +
                  'while (esc.indexOf("%20") > -1) {esc = esc.replace("%20", "+");}' +
                  'return esc;}' +
                  'function plusify(str) {while (str.indexOf("%2520") > -1) {str = str.replace("%2520", "+");' +
                  '} return str;}' +
                  'function doArtist() {if ((selectDisplay ? "selectQuickArtist" : "textQuickArtist") != "") {' +
                  'location.href="http://www.last.fm/music/"+encodeURIComponent2(document.getElementById' +
                  '((selectDisplay ? "selectQuickArtist" : "textQuickArtist")).value);}}' +
                  'function quickSwitch() {if (selectDisplay) {' +
                  'document.getElementById("selectQuickArtist").style.display = "none";' +
                  'document.getElementById("textQuickArtist").style.display = "inline";' +
                  'selectDisplay = 0;} else {' +
                  'document.getElementById("textQuickArtist").style.display = "none";' +
                  'document.getElementById("selectQuickArtist").style.display = "inline";' +
                  'selectDisplay = 1;}}';
    var head = document.getElementsByTagName("head")[0];
    var scriptEl = document.createElement("script");
    scriptEl.innerHTML = scriptHTML;
    head.appendChild(scriptEl);
    var maybeblack='';
    if (document.getElementsByTagName("body")[0].className=='black'){
			maybeblack='_blk';
		}
    var html = '<a style="font-size: 10px; margin: 4px 0px 0px -4px; border-bottom: none; float: left;" href="javascript: quickSwitch();">switch &gt;</a>' +
               '<form style="display: inline" onsubmit="doArtist(); return false;">' +
               '<input style="float: right; margin: 4px -4px 0px 0px !important;" type="image" class="sbutton" src="http://static.last.fm/depth/header/searchbutton_nav' + maybeblack + '.gif" onclick="doArtist();" /></form>' +
               '<select style="float: right; margin: 4px 4px 0px 0px !important; display: ' + (anyArtists ? "inline" : "none") + '; width: ' +
               (textboxWidth - 80) + 'px;" id="selectQuickArtist" onchange="doArtist();">';
    var selectedDone = 1;
    if (anyArtists) {
      var lastArtist = GM_getValue("lastQuickArtist", "");
      selectedDone = 0;
      if (artists.length > 1) {
        for (var i = 0; i < artists.length; i++) {
          html += '<option' + (lastArtist == artists[i][0] ? ' selected="selected"' : '') + '>' +
                  unescape(artists[i][0]) + '</option>';
          if (lastArtist == artists[i][0]) {
            selectedDone = 1;
          }
        }
        if (!selectedDone && lastArtist != "") {
          html += '<option selected="selected">' + unescape(lastArtist) + '</option>';
        } else {
          if (artists.length > i + 1) {
            html += '<option' + (lastArtist == artists[i][0] ? ' selected="selected"' : '') + '>' +
                    unescape(artists[i][0]) + '</option>';
          }
        }
      } else {
        html += '<option>' + unescape(artists[0][0]) + '</option>';
      }
    }
    html += '</select>' +
            '<input style="float: right; display: ' + (anyArtists ? "none" : "inline") + '; margin: 4px 4px 0px 0px !important; width: ' +
            (textboxWidth - 84) +'px;" type="text" class="sbox" id="textQuickArtist" />';
    headline.innerHTML = "<div id=\"headerQuickSearchBox\"><div style=\"padding: 0px 10px 0px 10px;\">"+html+"</div></div>"+headline.innerHTML;
    if (added) {
      GM_setValue("lastQuickArtist", escape(artist));
    }
})();
