// ==UserScript==
// @name           IBList simpleWEM
// @namespace      http://www.iblist.com/editorial
// @description    Abbreviated WEM form
// @version         1.1
// @include         http://www.iblist.com/editorial/initial_record.php
// @include         http://www.iblist.com/editorial/initial_record.php?addto=*
// @include         http://www.iblist.com/editorial/genre_selection_popup.php*
// ==/UserScript==

(function () {

  var DEBUG = false;

  if (GM_getValue) {
    // SCRIPT UPDATE CHECKER by 'Jarett' http://userscripts.org/scripts/show/20145
    var version_scriptNum = 26876; // Change this to the number given to the script by userscripts.org (check the address bar)
    var version_timestamp = 1228216167485; // (new Date()).getTime() Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.
    function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand("++ " + GM_getValue("targetScriptName", "IBList simpleWEM") + " - Manual Update Check ++", function() {updateCheck(true);}); updateCheck(false);
    // ENDS UPDATE CHECKER
  }

 // If the window context is "genre_selection_popup" override the windows js "post" code and exit
  if (/genre_selection_popup/.test(document.location.pathname)) {
   // override the "genre_popup" in-page javascript function so the genre value is plugged in correctly
    unsafeWindow.submitGenre = function(idx) {
      var swgenre = top.window.opener.document.getElementById("swgenre");
      if (swgenre.value != "") {
        swgenre.value += ",";
      }
      swgenre.value += idx;
      top.window.opener.document.forms.namedItem("booksubmit").elements.namedItem("work_genreidx").value = swgenre.value;
      window.close();
    }
    return;
  }
  
  function wem2sw(formelName, swid) {
    if (form.elements.namedItem(formelName).value != "") {
      document.getElementById(swid).value = form.elements.namedItem(formelName).value;
    }
  }
  
  function populateForm() {
    wem2sw("work_title", "swtitle");
    wem2sw("work_otitle", "swotitle");
    wem2sw("work_language", "swlanguage");
    wem2sw("work_format", "swformat");
    wem2sw("work_copyright_date", "swdate");
    wem2sw("work_genreidx", "swgenre");
    wem2sw("work_summarysource", "swsumsource");
    wem2sw("work_summary", "swsummary");
    populateManifest();
  }
  
  function populateManifest() {
    wem2sw("manifest_isbn", "swisbn");
    wem2sw("manifest_extent", "swextent");
    wem2sw("manifest_medium", "swmedium");
    wem2sw("manifest_publisher", "swpublisher");
    wem2sw("manifest_publication", "swpubplace");
    wem2sw("manifest_copyright_month", "swpubmonth");
    wem2sw("manifest_copyright_day", "swpubday");
    wem2sw("manifest_copyright_date", "swpubdate");
    wem2sw("manifest_dimensions_w", "swdimw");
    wem2sw("manifest_dimensions_h", "swdimh");
    wem2sw("manifest_dimensions_d", "swdimd");
  }
  
  function swOnChange() {
    if(DEBUG) {GM_log(this.id +":"+this.value);}
    switch(this.id) {
      case "swtitle"    : form.elements.namedItem("work_title").value = this.value;
                          form.elements.namedItem("express_title").value = this.value;
                          form.elements.namedItem("manifest_title").value = this.value;
                          break;
      case "swotitle"   : form.elements.namedItem("work_otitle").value = this.value;
                          break;
      case "swlanguage" : form.elements.namedItem("work_language").value = this.value;
                          break;
      case "swformat"   : form.elements.namedItem("work_format").value = this.value;
                          break;
      case "swdate"     : form.elements.namedItem("work_copyright_date").value = this.value;
                          form.elements.namedItem("express_copyright_date").value = this.value;
                          break;
      case "swgenre"    : form.elements.namedItem("work_genreidx").value = this.value;
                          break;
      case "swisbn"     : form.elements.namedItem("manifest_isbn").value = this.value;
                          break;
      case "swextent"   : form.elements.namedItem("manifest_extent").value = this.value;
                          break;
      case "swmedium"   : form.elements.namedItem("manifest_medium").value = this.value;
                          break;
      case "swpublisher": form.elements.namedItem("manifest_publisher").value = this.value;
                          break;
      case "swpubplace": form.elements.namedItem("manifest_publication").value = this.value;
                          break;
      case "swpubmonth" : form.elements.namedItem("manifest_copyright_month").value = this.value;
                          break;
      case "swpubday"   : form.elements.namedItem("manifest_copyright_day").value = this.value;
                          break;
      case "swpubdate"  : form.elements.namedItem("manifest_copyright_date").value = this.value;
                          break;
      case "swdimw"     : form.elements.namedItem("manifest_dimensions_w").value = this.value;
                          break;
      case "swdimh"     : form.elements.namedItem("manifest_dimensions_h").value = this.value;
                          break;
      case "swdimd"     : form.elements.namedItem("manifest_dimensions_d").value = this.value;
                          break;
      case "swsumsource": form.elements.namedItem("work_summarysource").value = this.value;
                          break;
      case "swsummary"  : form.elements.namedItem("work_summary").value = this.value;
                          break;
    }
  }

  function addFormEvents() {
    var ocEvents = ["swtitle", "swotitle", "swlanguage", "swformat", "swdate", "swgenre", 
                    "swisbn", "swextent", "swmedium", "swpublisher", "swpubplace", "swpubmonth", "swpubday", "swpubdate", 
                    "swdimw", "swdimh", "swdimd", "swsumsource", "swsummary"];
    for (var i=0; i < ocEvents.length; i++) {
      document.getElementById(ocEvents[i]).addEventListener("change", swOnChange, false);
    }
    
    document.getElementById("amazon2wem").addEventListener("click", 
      function() {
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("click",true,true,document.defaultView,1,0,0,0,0,false,false,false,false,0,null);
        document.getElementById("IBList").dispatchEvent(evt);
        function inner() {
          clearInterval(timer);
          populateManifest();
        }
        var timer = setInterval(inner, 500);
      }
    ,false);
    
    document.getElementById("swclose").addEventListener("click", 
      function() {
        document.getElementById("pngOverlay").style.display = "none";
      }
    ,false);
    
    document.getElementById("swpost").addEventListener("click", 
      function() {
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("click",true,true,document.defaultView,1,0,0,0,0,false,false,false,false,0,null);
        form.elements.namedItem("add").dispatchEvent(evt);
      }
    ,false);
  }

  function init() {
    var lbox = document.body.appendChild(document.createElement("div"));
    lbox.id = "pngOverlay";
    var sw = lbox.appendChild(document.createElement("div"));
    sw.id = "simplewem";
    sw.innerHTML = ''+
    '<img src="data:image/png;base64,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">'+
    '<div class="wrap title">'+
    '<p><label for="swtitle">Title, the</label><input size="48" id="swtitle" maxlength="255" value="" type="text"></p>'+
    '<p><label for="swotitle">The Original Title</label><input size="48" id="swotitle" maxlength="255" value="" type="text"></p>'+
    '<div class="wrap">'+
    '<p><label for="swlanguage">Language</label><select id="swlanguage"></select></p>'+
    '<p><label for="swformat">Format</label><select id="swformat"></select></p>'+
    '<p><label for="swdate">Copyright Year</label><input id="swdate" value="" type="text"></p>'+
    '<p><label for="swgenre">Genre</label><input class="formfield" size="10" id="swgenre" type="text"><input value="Browse..." onclick="window.open(\'http://www.iblist.com/editorial/genre_selection_popup.php?formname=booksubmit&fieldname=swgenre\', \'gensel\', \'width=300,height=250,scrollbars=auto,resizable\');" id="swgenrebtn" type="button"></p></div></div>'+
    '<div class="wrap manifest"><div class="wrap left">'+
    '<p><label for="swisbn"><strong>ISBN</strong></label><input id="swisbn" value="" type="text"></p>'+
    '<p><label for="swextent">Pages</label><input id="swextent" value="" type="text"></p>'+
    '<p><label for="swmedium">Medium</label><select id="swmedium"></select></p></div>'+
    '<div class="wrap publisher">'+
    '<p><label for="swpublisher">Publisher</label><select id="swpublisher"></select></p></div>'+
    '<div class="wrap pubdate">'+
    '<p><label for="swpubdate">M-D-Y of Publication</label><input id="swpubmonth" value="" size="3" maxlength="2" type="text">-<input id="swpubday" value="" size="3" maxlength="2" type="text">-<input id="swpubdate" value="" size="5" type="text"></p>'+
    '<p class="dimensions"><label for="manifest_dimensions">Dimensions (in inches)</label><input id="swdimw" value="W" style="width: 40px;" onclick="if(this.value==\'W\'){this.value=\'\';}" type="text">x<input id="swdimh" value="H" style="width: 40px;" onclick="if(this.value==\'H\'){this.value=\'\';}" type="text">x<input id="swdimd" value="D" style="width: 40px;" onclick="if(this.value==\'D\'){this.value=\'\';}" type="text"></p></div>'+
	'<div class="wrap place"><p><label for="swpubplace">Place of Publication</label><input type="text" id="swpubplace" value=""/></p></div>'+
    '<button title="Paste Amazon info into manifestation." id="amazon2wem">amazon2wem</button>'+
    '<div class="wrap summary">'+
    '<p><label for="swsumsource">Summary Source</label><select id="swsumsource"><option value="0"></option><option value="1">From the publisher</option><option value="2">IBList user synopsis</option><option value="3">Library of Congress description</option><option value="4">From the author</option></select><label for="swsummary">Summary</label><textarea id="swsummary" style="width: 500px; height: 100px;"></textarea></p></div></div>'+
    '<br style="clear:both"><div class="swbuttons"><button title="Close simple form and revert to standard form." id="swclose">Close</button><button title="Post form." id="swpost">Post</button></div>'+
    '';

    css = ''+
    '#showsimpleform {margin-left:20px;}'+
    '#pngOverlay {float:left; z-index:10000000; height:'+(window.scrollMaxY-(window.outerHeight-window.innerHeight))+'px; width:100%; background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAPSURBVHjaYmJgYDgDEGAAANsAz1TKIeAAAAAASUVORK5CYII%3D); background-repeat:repeat;}'+
    '#pngOverlay {position:absolute; top:0; left:0;}'+
    '#simplewem {width:845px; margin: 20px auto;}'+
    '#simplewem img {width:187; margin: 10px auto;}'+
    '#simplewem input, #simplewem  select {font-size:12px;}'+
    '#simplewem input {padding-left:3px;}'+
    '#simplewem p label {color:#CC9933; font-size:10px; font-weight:bold; display:block;}'+
    '#simplewem button {-moz-outline:black solid 2px; -moz-outline-radius:5px;}'+
    '#simplewem div.wrap {padding:5px; float:left; margin:0; border:2px ridge maroon;}'+
    '#simplewem div p {clear:left; margin:0;}'+
    '#simplewem div p + p {margin-top:10px;}'+
    '#simplewem div.title {width:272px; margin-right:20px; padding:5px 10px;}'+
    '#simplewem div.title div.wrap {width:165px; float:none; margin:20px auto 17px auto; padding:5px 10px; border-style:groove; border-width:2px;}'+
    '#simplewem div.manifest {width:515px;}'+
    '#simplewem div.manifest div.left {margin-right:20px;}'+
    '#simplewem div.manifest div {border-width:0; padding-top:0;}'+
    '#simplewem div.manifest div.pubdate, #simplewem div.manifest div.summary, #simplewem div.manifest div.place {padding-top:5px;}'+
	'#simplewem div.manifest div.place {margin-left:20px;}'+
    '#simplewem input#swgenrebtn {margin-left:10px;}'+
    '#simplewem button#amazon2wem {margin-left:40px; margin-top:20px; -moz-outline:red solid 2px; -moz-outline-radius:0; position:relative; top:20px;}'+
    '#simplewem div.swbuttons {width:200px; margin: 20px auto;}'+
    '#simplewem div.swbuttons button {margin: 0 22px;}'+
    '';
    GM_addStyle(css);

    addFormEvents();
    populateForm();
   
   // build the option lists for ...
   // work language
    document.getElementById("swlanguage").innerHTML = form.elements.namedItem("work_language").innerHTML;
   // format
    document.getElementById("swformat").innerHTML = form.elements.namedItem("work_format").innerHTML;
   // medium
    document.getElementById("swmedium").innerHTML = form.elements.namedItem("manifest_medium").innerHTML;
   // publisher name
    document.getElementById("swpublisher").innerHTML = form.elements.namedItem("manifest_publisher").innerHTML;
   // summary source
    document.getElementById("swsumsource").innerHTML = form.elements.namedItem("work_summarysource").innerHTML;
   
   // make English the default language in the WEM form
    form.elements.namedItem("work_language").value = 1;
    document.getElementById("swlanguage").value = 1;
   
   // settup a button to re-display the "simplifiedWEM" form if swclose button is clicked
    var s = document.getElementById("main").getElementsByTagName("h3")[0].appendChild(document.createElement("span"));
    s.innerHTML = '<button title="Show &quot;SimpleWEM&quot; form" id="showsimpleform">simpleWEM</button>';
    document.getElementById("showsimpleform").addEventListener("click",
      function() {
        document.getElementById("pngOverlay").style.display = "block";
       // in case some values were entered while the simple form was hidden
        populateForm();
      }
    ,false);
    
   // does the user have the amazon2wem script installed and active?
    if (!document.getElementById("IBList")) {
      document.getElementById("amazon2wem").style.display = "none";
    }
  }

  var form = document.forms.namedItem("booksubmit");
 
  init();
  
})();