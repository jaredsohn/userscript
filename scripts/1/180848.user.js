// ==UserScript==
// @name        BorosAdmin
// @description Mod/Admin tools for ouroboros based sites.
// @namespace   com.xch3l.userscripts
// @version     1.56 (090214)
// @include     *://e621.net/*
// @include     *://e926.net/*
// @include     *://twentypercentcooler.net/*
// @include     *://gallery.agn.ph/*
// @include     *://beta.ouroboros.ws/*
// @downloadURL http://userscripts.org/scripts/source/180848.user.js
// @grant       none
// @icon        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QAAAAAAAD5Q7t/AAAE7ElEQVR42u1Xa0wcVRS+QovNhoA2tVqtmrRpfYVWQixWGwzRxBglKVVb0yg/8NFYf9T+MIIktWqh+kdtohJD0tqERFIrxmpTY4tFBJaXsBQWdtnX7OzOvmZ2Z2Z33jN31zPFaBBKWRj/9SY3s8neO+ec73znO2cQurGWsbJZfBPWEuuw6r8Xq9SGLFaL/nejhuzdpCePNaqRqsuy55aU5iswDKIA60SBoQfWyEpg+5hCHTqhcd1PmA5aZ1jybJbJl77V/Ks0bQZhYQTlUv0oR/eiXAKeUdgh+B2Gp+hEWAvADj00qaY6d6/YuMK075fcxWl+AuHkABjpQTkSDFHgRPwKwoxzdieuwH+DKEf8hnKxbnDEgXKqH+GMt7YTa/S6ZRmXI0ePSK4CTNnBaB9EOoZwOlhgyPHyMZ0//Kkhtr2G5fb9WP6mLiu3NGrsC98JobXJ+DjCJiL0H+DIJNyZ2uIxxOmteRr/sElxIxyHqCmIjAf4df6Ntqw+s3Vxcoo2QzxVJ0c3eaOjCFO/oxwLT8F1V8iQZrYsybia+mG3CgRjhwBWcECK3prC6oVn8qoSnLFp7IFWGtIUvAwc6Qcn3A9MYZ0tXfQi1uK3yYH1sfTILLEkao2ElZ6q5XJITzc3McAfD3Aj5UBYCtafWvxC7NDnGkBPwgXOi7AhfPHWSoms8wdaoyMIR4HAsgdKNt2765rRSzO2DAORRyDvGlM5kM3qhSsWLcyXiuQdFAF84AFZlXzq4sLEi392WICSCkH0aYheF/PL+2JL44+/e7U64N1QWYYhuu6fd0giqrpDUG5m2UnUfW4rov8HXT16e9pXpBBAyAxwQgy3NP4HJnW14LJlpn8F8gFMOvv2CaulXIpUDBGgDTSkN+2p7Zwrt2rwHma8ADvOo5wLDinsV29a7YDCPH+WAISDQMbU5GO9c5mqejdHAZqxn1Bu4iJUQOTo+1Y7INM150iIfroLZNy5Y2BujnCmOO5erTkvoJwHHGDDr5y2PAVU+Z8E9JEp4AHtr+6ad4Altjn9UCp+UzSIfR2Wzg9YvlnylnBBaFR+UFiWqj8571CGaW709IF+DyHMBQ+2WjpLSMMVMrRy4hJ0yymogtTJ+gUaiVqUJN/7KGyHvk83HLfUAbbpGA/dNAD5T3pXaYYW2XDNw1Hnk5fS7hIuq4XvtAR+gy3VwutjMUhvACpMiD79y6IXhGTHPnLAVOZnz1shRkby1TbB7IoAfwQakir8/Nx1Bk69MDJVPsoAZHpq7xmTQMs2nv7yoOpD2JySgsCvhG9n/9K0Wx4vizlsGXrEVNHqrqwW2pjf1KwXGvwn76gwyJizo9d0YNwmapJj+5Jfoma+35MYL1LMqUj2rU1i/uMGM5/X1X2hq1pPPGqXzYkKVM8JuuIdLlIk7sze/LuY8GNN0lXCRewIp4YRVvzFnMG+2IHFr1/Hsr0Sq8G7sxq5EUs9u4x0S4NBPzyqA+TcMMyRkHN/N8Le4VJO4s7VLH+gUJwPxjyVgwToQxjgZACRDLRtGVq2Rvy9YRSXp2EKBsNX2Q7lFgSnGd/jfbq8QOvN/0tILxSSp+tirrIJk8kkvNwcMEjYVN9seRHgXMh0EoZQ2lM2ofLtL1vZ0v9NizRSISWbG7nQnrMMuWOQCW1z0MROOx2o7eSiHxxRxaFHbny85rP+AjtJjEQu11glAAAAAElFTkSuQmCC
// ==/UserScript==

// Created:  22/10/13  5:00Pm
// Modified: 09/02/14  6:17Pm

(function() {
  var cookies  = parseCookies(); // GET ALL THE COOKIES!
  var loc      = window.location.pathname.split("/"); // Split the path part of the URL for easier lookup
  var defset   = {version:'101113', textSize:14, contactInfo:'', contactMail:'', uselog:false, floatinglog:false}; // Default settings. Also used to check save versions.
  var set      = window.localStorage.baSettings; // Settings (as raw text) -- not very useful
  var settings = (set?eval("/*BorosAdmin Settings*/\n"+set):defset); // Settings (as an object) -- useful!

  if(cookies.login) { // This script will work ONLY if the user is logged in
    // First check user level //
    if(!window.localStorage.userID || !window.localStorage.userLV) { // If the UserID and UserLevel were not saved already...
      query("/user/index.json?name="+fixUsername(), function(j, x, t) { // ...retrieve and store them.
        for(var i=0; i<j.length; i++) {
          var id = j[i].id;
          var lv = j[i].level;

          if(j[i].name==cookies.login) {
            window.localStorage.userID = id;
            window.localStorage.userLV = lv;
          }
        }
      }, "userinfo");
    }

    // Write a CSS for this extension //
    // Check first if the eSixExtend UserScript is installed or create a new CSS if it isn't
    var css = document.createElement("style");
    css.type = "text/css";
    css.id = "BorosAdmin_CSS";
    css.innerHTML = ".floatingPanel {position:absolute; border-radius:4px; padding:4px; font-size:80%; z-index:100; max-width:50%; max-height:50%; overflow-y:auto; opacity:1; transition:opacity 100ms ease-out 0ms;}"+
      ".floatingPanel .panelTitle {position:relative; left:-4px; top:-4px; width:100%; box-shadow:0px 0px 6px #000; padding:2px 4px;}"+
      ".floatingPanel .option, .floatingPanel .close, .floatingPanel .help {cursor:pointer;}"+
      ".floatingPanel .close {position:absolute; right:4px; top:0px;}"+
      ".floatingPanel .help {position:absolute; right:3ex; top:-1px;}"+
      ".floatingPanel .close:hover, .floatingPanel .option:hover, .floatingPanel .help:hover, .closebutton:hover {font-weight:bold; text-shadow: 0px 0px 3px #FFF;}"+
      ".floatingPanel .close:active, .floatingPanel .option:active, .floatingPanel .help:active, .closebutton:active {font-weight:bold; text-shadow:0px 0px 3px #000;}"+
      "fieldset {border:1px solid currentColor; border-radius:6px;} "+
      "fieldset legend {padding:0em 1ex; border-left:1px solid currentColor; border-right:1px solid currentColor;} "+
      ".settingsPane fieldset {margin-bottom:1em;} "+
      ".ta {width:99%; font-size:"+settings.textSize+"px; font-family:Sans-serif;}";
    document.head.appendChild(css);

    if(loc[1] == "user" && loc[2] == "edit") {
      // Settings tab
      var content = document.getElementById("content");
      var userEdit = document.getElementById("user-edit");

      var paneHolder = document.getElementById("paneHolder");
      if(!paneHolder) {
        paneHolder = document.createElement("div");
        paneHolder.id = "paneHolder";
        paneHolder.className = "rounded formsection";
        content.insertBefore(paneHolder, content.firstChild);
      }

      if(userEdit.className != "settingsPane")
        userEdit.className = "settingsPane";
      userEdit.style.display = "none";
      paneHolder.appendChild(userEdit);

      var style = document.getElementById("panesStyle");
      if(!style) {
        style = document.createElement("style");
        style.type = "text/css";
        style.id = "panesStyle";
        style.innerHTML = "ul#settingsPanes {list-style:none; margin-bottom:0px; font-weight:bold; font-size:1.5ex; background:none;} "+
          "ul#settingsPanes li {display:inline-block; cursor:pointer; padding:1ex; margin:0px 1em 0px 0px; border-radius:4px 4px 0px 0px; box-shadow:none;position:relative; z-index:1;}"+
          "ul#settingsPanes li.inactive {opacity:0.75; padding-bottom:0px; top:1ex;}";
        content.insertBefore(style, paneHolder);
      }

      var tabs = document.getElementById("settingsPanes");
      if(!tabs) {
        tabs = document.createElement("ul");
        tabs.id = "settingsPanes";
        content.insertBefore(tabs, paneHolder);
      }

      var userSettings = document.getElementById("userSettings");
      if(!userSettings) {
        userSettings = document.createElement("li");
        userSettings.id = "userSettings";
        userSettings.innerHTML = "Account Settings";
        userSettings.className = "rounded formsection inactive";
        userSettings.addEventListener("click", function() {
          $j("#settingsPanes > li").addClass("inactive");
          $j(userSettings).removeClass("inactive");
          $j("#paneHolder > .settingsPane").slideUp();
          $j("#user-edit").slideDown();
        }, true);
        tabs.appendChild(userSettings);
      }

      var BorosAdminSettings = document.createElement("li");
      BorosAdminSettings.innerHTML = "BorosAdmin Settings";
      BorosAdminSettings.className = "rounded formsection inactive";
      BorosAdminSettings.addEventListener("click", function() {
        $j("#settingsPanes > li").addClass("inactive");
        $j(BorosAdminSettings).removeClass("inactive");
        $j("#paneHolder > .settingsPane").slideUp();
        $j("#BorosAdminSettings").slideDown();
      }, true);
      tabs.appendChild(BorosAdminSettings);

      var baPane = document.createElement("div");
      baPane.className = "settingsPane";
      baPane.id = "BorosAdminSettings";
      baPane.style.position = "relative";
      baPane.style.display = "none";
      baPane.innerHTML = "<small>These settings don't affect normal usage of the entire site, just this userscript.</small><br/><br/>"+

        // General script settings
        "<fieldset><legend><h5>General settings</h5></legend>"+
        "<label for='ba_textsize'>Font size: </label><input type='number' onChange='document.getElementById(\"ba_btnSave\").disabled=false' id='ba_textsize' value='"+settings.textSize+"' /><br/>"+
        "<input type='checkbox' onChange='document.getElementById(\"ba_btnSave\").disabled=false' id='ba_uselog'"+(settings.uselog?" checked":"")+" /><label for='ba_uselog'>Log messages to console (Dev related, if you're curious you can check it too)</label>"+
        "<div style='margin-left:2em;"+(window.devbug?" display:none;":"")+"'><input type='checkbox' onChange='document.getElementById(\"ba_btnSave\").disabled=false' id='ba_floatinglog'"+(settings.floatinglog?" checked":"")+" /><label for='floatinglog'>Use floating textarea</label></div></fieldset>"+

        // Contact info
        "<fieldset><legend><h5>Contact info</h5></legend>"+
        "<p>Enter here the information that should be pasted when clicking &quot;Contact info&quot; on the records form</p>"+
        "<textarea id='ba_contactInfo' onChange='document.getElementById(\"ba_btnSave\").disabled=false' style='width:100%; height:200px;'>"+settings.contactInfo+"</textarea>"+
        "<label for='ba_contactMail'>Contact eMail:</label> <input type='text' id='ba_contactMail' value='"+settings.contactMail+"' onChange='document.getElementById(\"ba_btnSave\").disabled=false' />"+
        "</fieldset>"+

        // Buttons
        "<input type='button' id='ba_btnDefaults' value='Defaults' /> "+
        "<input type='button' id='ba_btnSave' value='Save' "+(window.localStorage.baSettings && settings.saveVersion==defset.saveVersion?"disabled":"")+" /> <sup id='ba_msgSaved' class='newoption-label' style='display:none'>Settings saved!</sup>"+
        "<br/><small>Saves settings in the localStorage. For these to be persistent between pages, localStorage must be enabled in your browser.</small>"+
        "<small style='position:absolute; right:1em; top:1ex; text-align:right'>Version code: "+defset.version+"</small>";
      paneHolder.appendChild(baPane);

      if(window.eSixExtend) {
        window.eSixExtend.createFormattingButtons("ba_contactInfo");
      }

      document.getElementById("ba_btnDefaults").addEventListener("click", function() {
        window.localStorage.baSettings = "({version:'"+defset.version+"'"+
          ", textSize:"+defset.textSize+
          ", contactInfo:"+defset.contactInfo+
          ", contactMail:"+defset.contactMail+
          ", uselog:"+defset.uselog+
          ", floatinglog:"+defset.floatinglog+"})";
        window.location.reload();
      }, true);
      document.getElementById("ba_btnSave").addEventListener("click", writeSettings, true);

      if(window.location.hash == "#BorosAdminSettings") {
        BorosAdminSettings.className = "rounded formsection";
        baPane.style.display = "block";
      } else {
        userSettings.className = "rounded formsection";
        userEdit.style.display = "block";
      }
    }

    if(window.localStorage.userLV >= 40) { // Mod+ level operations
      var validLoc1 = /(user_record|user)/;
      var validLoc2 = /(create|block)/;

      if(validLoc1.test(loc[1]) && validLoc2.test(loc[2])) {
        // The section we'll be using for adding buttons
        var grpButtons = document.createElement("span");
        var ta = document.getElementById(loc[1]=="user_record"?"user_record_body":"ban_reason");
        var fbtns = document.getElementById("fbtns_user_record_body");
        ta.parentNode.insertBefore(grpButtons, (fbtns?fbtns:ta));

        // "CoC Violation" button
        var btnCocViolation = document.createElement("input");
        btnCocViolation.type = "button";
        btnCocViolation.value = "CoC Violation";
        btnCocViolation.style.marginRight = "1ex";
        btnCocViolation.addEventListener("click", function() {
          var page = 0;
          var fp = createFloatingPanel(null, null);
          fp.addCloseButton();
          fp.parentNode.style.position = "fixed";
          fp.parentNode.style.width = "80%";
          fp.parentNode.style.maxHeight = (window.innerHeight*0.95)+"px"; // 95% of the window height
          fp.innerHTML = "<h1 class='panelTitle'>Violation of the Code of Conduct</h1>"+
            "<style type='text/css'>sup.pop {cursor:pointer;}</style>"+
            "<span class='help'>?</span>"+

            // Page 1: Rules broken (Last updated: 16/11/13)
            "<fieldset><legend><h3>Rules broken</h3></legend>"+
            "<p>Please select all that apply from the options below:</p>"+
            "<div class='fitPanel' style='max-height:"+(window.innerHeight*0.75)+"px; overflow-y:auto; margin-bottom:1ex'>"+
            "<div><input type='checkbox' id='ba_abuseOfSiteTools' /><label for='ba_abuseOfSiteTools'>Abuse of Site Tools</label><sup class='pop' onClick='window.open(\"/wiki/show?title=abuse_of_site_tools\")'>(?)</sup></div>"+
            "<div><input type='checkbox' id='ba_advertising' /><label for='ba_advertising'>Advertising</label><sup class='pop' onClick='window.open(\"/wiki/show?title=advertising\")'>(?)</sup></div>"+
            "<div><input type='checkbox' id='ba_youngUser' /><label for='ba_youngUser'>Age Restrictions</label><sup class='pop' onClick='window.open(\"/wiki/show?title=age_restrictions\")'>(?)</sup></div>"+
            "<div><input type='checkbox' id='ba_backseatModding' /><label for='ba_backseatModding'>Backseat Moderating</label><sup class='pop' onClick='window.open(\"/wiki/show?title=backseat_moderating\")'>(?)</sup></div>"+
            "<div><input type='checkbox' id='ba_bestiality' /><label for='ba_bestiality'>Bestiality</label><sup class='pop' onClick='window.open(\"/wiki/show?title=bestiality\")'>(?)</sup></div>"+
            "<div><input type='checkbox' id='ba_noBlacklisting' /><label for='ba_noBlacklisting'>Not using blacklist</label><sup class='pop' onClick='window.open(\"/wiki/show?title=blacklist\")'>(?)</sup></div>"+
            "<div><input type='checkbox' id='ba_banEvading' onChange='$j(\"#banevadername\").toggle()' /><label for='ba_banEvading'>Circumventing a Suspension / Ban</label><sup class='pop' onClick='window.open(\"/wiki/show?title=circumventing_a_suspension_%2F_ban\")'>(?)</sup></div><div id='banevadername' style='display:none; margin-left:2em;'><label for='evadername'>Alt account: </label><input type='text' id='evadername' placeHolder='Name or ID' /></div>"+
            "<div><input type='checkbox' id='ba_dupeThreads' /><label for='ba_dupeThreads'>Creating Duplicate Threads</label><sup class='pop' onClick='window.open(\"/wiki/show?title=creating_duplicate_threads\")'>(?)</sup></div>"+
            "<div><input type='checkbox' id='ba_creepy' /><label for='ba_creepy'>Creepy Comments</label><sup class='pop' onClick='window.open(\"/wiki/show?title=creepy_comments\")'>(?)</sup></div>"+
            "<div><input type='checkbox' id='ba_pointlessThreads' /><label for='ba_pointlessThreads'>Cross Linking Threads</label><sup class='pop' onClick='window.open(\"/wiki/show?title=cross_linking_threads\")'>(?)</sup></div>"+
            "<div><input type='checkbox' id='ba_publicRecords' /><label for='ba_publicRecords'>Discussing Disciplinary Actions</label><sup class='pop' onClick='window.open(\"/wiki/show?title=discussing_disciplinary_actions\")'>(?)</sup></div>"+
            "<div><input type='checkbox' id='ba_rlInfo' /><label for='ba_rlInfo'>Distribution of Real-Life Personal Information</label><sup class='pop' onClick='window.open(\"/wiki/show?title=distribution_of_real-life_personal_information\")'>(?)</sup></div>"+
            "<div><input type='checkbox' id='ba_extremism' /><label for='ba_extremism'>Extreme Sexuality / Violence</label><sup class='pop' onClick='window.open(\"/wiki/show?title=extreme_sexuality_%2F_violence\")'>(?)</sup></div>"+
            "<div><input type='checkbox' id='ba_harassing' /><label for='ba_harassing'>Harassing or Defamatory</label><sup class='pop' onClick='window.open(\"/wiki/show?title=harassing_or_defamatory\")'>(?)</sup></div>"+
            "<div><input type='checkbox' id='ba_religionOrPolitics' /><label for='ba_religionOrPolitics'>Major Religions, Religious Figures, Political Parties, or Political Figures</label><sup class='pop' onClick='window.open(\"/wiki/show?title=major_religions,_religious_figures,_political_parties,_or_political_figures\")'>(?)</sup></div>"+
            "<div><input type='checkbox' id='ba_nationalHatred' /><label for='ba_nationalHatred'>National Hatred</label><sup class='pop' onClick='window.open(\"/wiki/show?title=national_hatred\")'>(?)</sup></div>"+
            "<div><input type='checkbox' id='ba_drugs' /><label for='ba_drugs'>Illegal Drugs or Activities</label><sup class='pop' onClick='window.open(\"/wiki/show?title=illegal_drugs_or_activities\")'>(?)</sup></div>"+
            "<div><input type='checkbox' id='ba_impersonating' /><label for='ba_impersonating'>Impersonating an Employee</label><sup class='pop' onClick='window.open(\"/wiki/show?title=impersonating_an_employee\")'>(?)</sup></div>"+
            "<div><input type='checkbox' id='ba_postVandal' /><label for='ba_postVandal'>Posting Abuse</label><sup class='pop' onClick='window.open(\"/wiki/show?title=posting_abuse\")'>(?)</sup></div>"+
            "<div><input type='checkbox' id='ba_postingWarez' /><label for='ba_postingWarez'>Posting Cheats, Hacks, Trojan Horses or Malicious Programs</label><sup class='pop' onClick='window.open(\"/wiki/show?title=posting_cheats,_hacks,_trojan_horses_or_malicious_programs\")'>(?)</sup></div>"+
            "<div><input type='checkbox' id='ba_postingDNP' onChange='$j(\"#dnpartistname\").toggle()' /><label for='ba_postingDNP'>Posting DNP Art</label><sup class='pop' onClick='window.open(\"/wiki/show?title=avoid_posting\")'>(?)</sup></div><div id='dnpartistname' style='display:none; margin-left:2em;'><label for='artistname'>Artist: </label><input type='text' id='artistname' placeHolder='Name or ID' /></div>"+
            "<div><input type='checkbox' id='ba_postingHacking' /><label for='ba_postingHacking'>Posting Unreleased Content / Hacking Data Files</label><sup class='pop' onClick='window.open(\"/wiki/show?title=posting_unreleased_content_%2F_hacking_data_files\")'>(?)</sup></div>"+
            "<div><input type='checkbox' id='ba_racialHatred' /><label for='ba_racialHatred'>Racial / Ethnic Hatred</label><sup class='pop' onClick='window.open(\"/wiki/show?title=racial_%2F_ethnic_hatred\")'>(?)</sup></div>"+
            "<div><input type='checkbox' id='ba_rlThreats' /><label for='ba_rlThreats'>Real-Life Threats</label><sup class='pop' onClick='window.open(\"/wiki/show?title=real-life_threats\")'>(?)</sup></div>"+
            "<div><input type='checkbox' id='ba_rping' /><label for='ba_rping'>Role-Play</label><sup class='pop' onClick='window.open(\"/wiki/show?title=role-play\")'>(?)</sup></div>"+
            "<div><input type='checkbox' id='ba_sexori' /><label for='ba_sexori'>Sexual Orientation</label><sup class='pop' onClick='window.open(\"/wiki/show?title=sexual_orientation\")'>(?)</sup></div>"+
            "<div><input type='checkbox' id='ba_spamming' /><label for='ba_spamming'>Spamming or Trolling</label><sup class='pop' onClick='window.open(\"/wiki/show?title=spamming_or_trolling\")'>(?)</sup></div>"+
            "<div><input type='checkbox' id='ba_taggingVandal' /><label for='ba_taggingVandal'>Tagging Abuse / Tagging Vandalism</label><sup class='pop' onClick='window.open(\"/wiki/show?title=tagging_abuse_%2F_tagging_vandalism\")'>(?)</sup></div>"+
            "</div><small>Clicking a <sup>(?)</sup> will open a new page with that rule's Wiki.</small></fieldset>"+

            // Page 2: Offending sources
            "<fieldset style='display:none'><legend><h3>Offending sources</h3></legend>"+
            "<p>Each ID on a single line</p>"+
            "<strong>Comments</strong><textarea id='offComments' class='ta' rows='6'></textarea>"+
            "<div style='text-align:right'><input type='checkbox' id='ba_incComments' /><label for='ba_incComments'>Include all user's comments</label></div>"+
            "<strong>Forum posts</strong><textarea id='offPosts' class='ta' rows='6'></textarea>"+
            "<div style='text-align:right'><input type='checkbox' id='ba_incPosts' /><label for='ba_incPosts'>Include all user's forum posts</label></div>"+
            "<strong>Blips</strong><textarea id='offBlips' class='ta' rows='6'></textarea>"+
            "<div style='text-align:right'><input type='checkbox' id='ba_incBlips' /><label for='ba_incBlips'>Include all user's blips</label></div>"+
            "<input type='checkbox' id='noIDs'"+(window.localStorage.noIDs=="true"?" checked":"")+" onChange='window.localStorage.noIDs=this.checked' /><label for='noIDs'>Not using IDs</label><br/>"+
            "<small>When checked, textboxes will not process IDs (This option is saved)</small></fieldset>"+

            // Page 3: Additional information
            "<fieldset style='display:none'><legend><h3>Additional information</h3></legend>"+
            "<textarea id='extrainfo' rows='10' class='ta'></textarea>"+
            (loc[2]=="block"?"<br/><input type='checkbox' id='appeal' checked /><label for='appeal'>User can appeal ban</label>":"")+
            "<br><input type='checkbox' id='cbContactEmail' /><label for='cbContactEmail'>Include contact eMail</label>"+
            "</fieldset>"+

            // Navigation
            "<div style='position:absolute; right:2.5ex; bottom:1em;'>"+
            "<input type='button' id='prev' value='&#9668; Previous' style='margin-right:1ex; display:none;' />"+
            "<input type='button' id='next' value='Next &#9658;' style='margin-right:1ex;' />"+
            "<input type='button' id='done' value='&#10003; Done' /></div>";

          var pages = fp.getElementsByTagName("fieldset");
          var next = document.getElementById("next");
          var prev = document.getElementById("prev");
          var done = document.getElementById("done");

          prev.addEventListener("click", function() {
            if(page > 1)
              next.style.display = "inline";
            else
              this.style.display = "none";

            pages[page].style.display = "none";
            page--;
            pages[page].style.display = "block";
            fp.center();
          }, true);

          next.addEventListener("click", function() {
            if(page < pages.length-2) 
              prev.style.display = "inline";
            else
              this.style.display = "none";

            pages[page].style.display = "none";
            page++;
            pages[page].style.display = "block";
            fp.center();
          }, true);

          done.addEventListener("click", function() {
            // Checklist for the broken rules
            var ba_abuseOfSiteTools = document.getElementById("ba_abuseOfSiteTools").checked;
            var ba_advertising = document.getElementById("ba_advertising").checked;
            var ba_youngUser = document.getElementById("ba_youngUser").checked;
            var ba_backseatModding = document.getElementById("ba_backseatModding").checked;
            var ba_bestiality = document.getElementById("ba_bestiality").checked;
            var ba_noBlacklisting = document.getElementById("ba_noBlacklisting").checked;
            var ba_banEvading = document.getElementById("ba_banEvading").checked;
            var ba_dupeThreads = document.getElementById("ba_dupeThreads").checked;
            var ba_creepy = document.getElementById("ba_creepy").checked;
            var ba_pointlessThreads = document.getElementById("ba_pointlessThreads").checked;
            var ba_publicRecords = document.getElementById("ba_publicRecords").checked;
            var ba_rlInfo = document.getElementById("ba_rlInfo").checked;
            var ba_extremism = document.getElementById("ba_extremism").checked;
            var ba_harassing = document.getElementById("ba_harassing").checked;
            var ba_religionOrPolitics = document.getElementById("ba_religionOrPolitics").checked;
            var ba_nationalHatred = document.getElementById("ba_nationalHatred").checked;
            var ba_drugs = document.getElementById("ba_drugs").checked;
            var ba_impersonating = document.getElementById("ba_impersonating").checked;
            var ba_postVandal = document.getElementById("ba_postVandal").checked;
            var ba_postingWarez = document.getElementById("ba_postingWarez").checked;
            var ba_postingDNP = document.getElementById("ba_postingDNP").checked;
            var ba_postingHacking = document.getElementById("ba_postingHacking").checked;
            var ba_racialHatred = document.getElementById("ba_racialHatred").checked;
            var ba_rlThreats = document.getElementById("ba_rlThreats").checked;
            var ba_rping = document.getElementById("ba_rping").checked;
            var ba_sexori = document.getElementById("ba_sexori").checked;
            var ba_spamming = document.getElementById("ba_spamming").checked;
            var ba_taggingVandal = document.getElementById("ba_taggingVandal").checked;

            // Input boxes for the offending items
            var offComments = document.getElementById("offComments").value.replace(/(\x0D|\x0A)/g, "\xFF").split("\xFF");
            var offPosts = document.getElementById("offPosts").value.replace(/(\x0D|\x0A)/g, "\xFF").split("\xFF");
            var offBlips = document.getElementById("offBlips").value.replace(/(\x0D|\x0A)/g, "\xFF").split("\xFF");
            var noIDs = document.getElementById("noIDs").checked;

            // Additional information
            var extrainfo = document.getElementById("extrainfo").value;
            var appeal = (document.getElementById("appeal")?document.getElementById("appeal").checked:false);

            var rulesMask = ba_abuseOfSiteTools+ba_advertising+ba_youngUser+ba_backseatModding+ba_bestiality+ba_noBlacklisting+ba_banEvading+ba_dupeThreads+ba_creepy+ba_pointlessThreads+ba_publicRecords+ba_rlInfo+ba_extremism+ba_harassing+ba_religionOrPolitics+ba_nationalHatred+ba_drugs+ba_impersonating+ba_postVandal+ba_postingWarez+ba_postingDNP+ba_postingHacking+ba_racialHatred+ba_rlThreats+ba_rping+ba_sexori+ba_spamming+ba_taggingVandal;
            if(rulesMask != 0) {
              ta.value += "You are receiving this [b]"+getReasonKind()+"[/b] for violating the following rule"+(rulesMask!=1?"s":"")+":\n\n"+
                (ba_abuseOfSiteTools?"* [[Abuse of Site Tools]]\n":"")+
                (ba_advertising?"* [[Advertising]]\n":"")+
                (ba_youngUser?"* [[Age Restrictions]]\n":"")+
                (ba_backseatModding?"* [[Backseat Moderating]]\n":"")+
                (ba_bestiality?"* [[Bestiality]]\n":"")+
                (ba_noBlacklisting?"* [[Blacklist]]\n":"")+
                (ba_banEvading?"* [[Circumventing a Suspension / Ban]]\n":"")+
                (ba_dupeThreads?"* [[Creating Duplicate Threads]]\n":"")+
                (ba_creepy?"* [[Creepy Comments]]\n":"")+
                (ba_pointlessThreads?"* [[Cross Linking Threads]]\n":"")+
                (ba_publicRecords?"* [[Discussing Disciplinary Actions]]\n":"")+
                (ba_rlInfo?"* [[Distribution of Real-Life Personal Information]]\n":"")+
                (ba_extremism?"* [[Extreme Sexuality / Violence]]\n":"")+
                (ba_harassing?"* [[Harassing or Defamatory]]\n":"")+
                (ba_religionOrPolitics?"* [[Major Religions, Religious Figures, Political Parties, or Political Figures]]\n":"")+
                (ba_nationalHatred?"* [[National Hatred]]\n":"")+
                (ba_drugs?"* [[Illegal Drugs or Activities]]\n":"")+
                (ba_impersonating?"* [[Impersonating an Employee]]\n":"")+
                (ba_postVandal?"* [[Posting Abuse]]\n":"")+
                (ba_postingWarez?"* [[Posting Cheats, Hacks, Trojan Horses or Malicious Programs]]\n":"")+
                (ba_postingDNP?"* [[avoid_posting|Posting DNP]]\n":"")+
                (ba_postingHacking?"* [[Posting Unreleased Content / Hacking Data Files]]\n":"")+
                (ba_racialHatred?"* [[Racial / Ethnic Hatred]]\n":"")+
                (ba_rlThreats?"* [[Real-Life Threats]]\n":"")+
                (ba_rping?"* [[Role-Play]]\n":"")+
                (ba_sexori?"* [[Sexual Orientation]]\n":"")+
                (ba_spamming?"* [[Spamming or Trolling]]\n":"")+
                (ba_taggingVandal?"* [[Tagging Abuse / Tagging Vandalism]]\n":"");
            }

            if(offComments != "") {
              ta.value += "\n[section=Offending comments]\n";
              for(i=0; i<offComments.length; i++) {
                var comm = offComments[i];
                if(/[0-9]/.test(comm[0])) { // Line contains IDs
                  new devbug("comm", "LineType", "Number");
                  
                }
              }/**/
              for(i=0; i<offComments.length; i++) {if(offComments[i].length > 0) ta.value += (noIDs?offComments[i]:"* comment #"+offComments[i].replace(/[^0-9 \xFF]/gi, "")+"\n");}
              ta.value += "[/section]\n";
            }

            if(offPosts != "") {
              ta.value += "\n[section=Offending forum posts]\n";
              for(i=0; i<offPosts.length; i++) {if(offPosts[i].length > 0) ta.value += (noIDs?offPosts[i]:"* forum #"+offPosts[i].replace(/[^0-9 \xFF]/gi, "")+"\n");}
              ta.value += "[/section]\n";
            }

            if(offBlips != "") {
              ta.value += "\n[section=Offending blips]\n";
              for(i=0; i<offBlips.length; i++) {if(offBlips[i].length > 0) ta.value += (noIDs?offBlips[i]:"* blip #"+offBlips[i].replace(/[^0-9 \xFF]/gi, "")+"\n");}
              ta.value += "[/section]\n";
            }

            if(extrainfo) ta.value += "\n[section=Additional information]\n"+extrainfo+"[/section]\n";
            if(loc[2] == "block" && appeal) ta.value += '\nIf you wish to appeal your ban, you may "contact the Lead Admin":'+window.location.protocol+'//'+window.location.hostname+'/static/contact';
            ta.value += "\nIf you have any questions, please reply to this message"+(settings.contactMail?" or contact me via email at "+settings.contactMail:"");

            hidePanels();
          }, true);
        }, true);
        grpButtons.appendChild(btnCocViolation);

        // "Add useful links" button
        var btnUsefulLinks = document.createElement("input");
        btnUsefulLinks.type = "button";
        btnUsefulLinks.value = "Add useful links";
        btnUsefulLinks.style.marginRight = "1ex";
        btnUsefulLinks.addEventListener("click", function() {
          var links = createFloatingPanel(null, true);
          links.center();
          links.innerHTML = "<h1 class='panelTitle'>Useful links</h1>"+
            "<div><input type='checkbox' id='sitehelp' /><label for='sitehelp'>Site Help</label></div>"+
            "<div><input type='checkbox' id='wikihelp' /><label for='wikihelp'>Help: Home</label></div>"+
            "<div><input type='checkbox' id='twys' /><label for='twys'>Tag What You See (TWYS)</label></div>"+
            "<div style='padding-left:2em;'><input type='checkbox' id='twys2' /><label for='twys2'>TWYS Explained</label></div>"+
            "<div><input type='checkbox' id='cheatsheet' /><label for='cheatsheet'>Tag Cheatsheet</label></div>"+
            "<div><input type='checkbox' id='blacklist' /><label for='blacklist'>How to blacklist</label></div>"+
            "<div style='padding-left:2em;'><input type='checkbox' id='blacklist2' /><label for='blacklist2'>Blacklist help</label></div>"+
            "<div><input type='checkbox' id='dnp' /><label for='dnp'>&quot;Do Not Post&quot; list (DNP)</label></div>"+
            "<div><input type='checkbox' id='checklist' /><label for='checklist'>Tagging checklist</label></div>"+
            "<div><input type='checkbox' id='faq' /><label for='faq'>Frequently Asked Questions (FAQ)</label></div>"+
            "<div style='text-align:right;'>"+
            "<input type='button' id='done' value='&#10003; Done' /></div>";

          document.getElementById("done").addEventListener("click", function() {
            var sitehelp = document.getElementById("sitehelp").checked;
            var wikihelp = document.getElementById("wikihelp").checked;
            var twys = document.getElementById("twys").checked;
            var twys2 = document.getElementById("twys2").checked;
            var cheatsheet = document.getElementById("cheatsheet").checked;
            var blacklist = document.getElementById("blacklist").checked;
            var blacklist2 = document.getElementById("blacklist2").checked;
            var dnp = document.getElementById("dnp").checked;
            var checklist = document.getElementById("checklist").checked;
            var faq = document.getElementById("faq").checked;

            var linksMask = sitehelp+wikihelp+twys+twys2+cheatsheet+blacklist+blacklist2+dnp+checklist+faq;

            if(linksMask != 0) {
              ta.value += (ta.value.length!=0?"\n\n":"")+"Useful information:\n\n"+
                (sitehelp?'* "Site help":https://e621.net/help\n':"")+
                (wikihelp?'* "Help: Home":https://e621.net/wiki/show?title=help%3Ahome\n':"")+
                (twys?'* "Tag what you see (TWYS)":https://e621.net/wiki/show?title=tag_what_you_see\n':"")+
                (twys2?'* "TWYS Explained":https://e621.net/wiki/show?title=e621%3Atag_what_you_see_%28explained%29\n':"")+
                (cheatsheet?'* "Tag Cheatsheet":https://e621.net/help/cheatsheet\n':"")+
                (blacklist?'* "How to blacklist":https://e621.net/help/blacklist\n':"")+
                (blacklist2?'* "Blacklist help":https://e621.net/wiki/show?title=help%3Ablacklist\n':"")+
                (dnp?'* "\'\'Do Not Post\'\' list (DNP)":https://e621.net/wiki/show?title=avoid_posting\n':"")+
                (checklist?'* "Tagging checklist":https://e621.net/wiki/show?title=e621%3Atagging_checklist\n':"")+
                (faq?'* "Frequently Asked Questions (FAQ)":https://e621.net/wiki/show?title=e621%3Afaq\n':"");
              }
            hidePanels();
          }, true);
        }, true);
        grpButtons.appendChild(btnUsefulLinks);

        // "Contact info" button
        var btnContactInfo = document.createElement("input");
        btnContactInfo.type = "button";
        btnContactInfo.value = "Add contact info";
        btnContactInfo.style.marginRight = "1ex";
        btnContactInfo.addEventListener("click", function() {
          ta.value += (ta.value.length!=0?"\n\n":"")+settings.contactInfo;
        }, true);
        grpButtons.appendChild(btnContactInfo);
      }
    } else

    // Notify when an user is not allowed to use this script (and don't do it if that user is the creator of this script)
    if(window.localStorage.userLV < 40 && window.localStorage.userID != 41519) {
      var notif = createFloatingPanel(null, true), p = notif.parentNode;
      p.style.position = "fixed";
      p.style.top = "auto";
      p.style.bottom = "1em";
      p.style.left = "1em";
      notif.innerHTML = "<h6>BorosAdmin:<br/>You are not allowed to use this script. Minimum required level is <em>Mod</em> and your account level is <em>"+getLevelName()+"</em></h6>";
    }
  }

  function getLevelName() {
    switch(parseInt(window.localStorage.userLV)) {
      case 0: return "Unactivated"; break;
      case 10: return "Blocked"; break;
      case 20: return "Member"; break;
      case 30: return "Privileged"; break;
      case 33: return "Contributor"; break;
      case 34: return "Test Janitor"; break;
      case 35: return "Janitor"; break;
      case 40: return "Mod"; break;
      case 50: return "Admin"; break;
    }
  }

  function getReasonKind() {
    if(loc[2] == "block") {
      return "Ban Notification";
    } else {
      switch(parseInt(document.getElementById("user_record_score").value)) {
        case -1: return "Negative Record"; break;
        case  0: return "Neutral Record";  break;
        case  1: return "Positive Record"; break;
      }
    }
  }

  /* fixUsername()
      Fixes the username (stored in cookies.login) by replacing spaces with an undescore and
      returns it */
  function fixUsername() {
    return (cookies.login?cookies.login.toLowerCase().replace(" ","_"):"");
  }

  /* parseCookies()
      Parses all of the current website cookies and returns a JSON object based off of them for
      easier access to each cookie.

      Returns:
        A JSON Object with all of the cookies' names as attributes of that object. Note that
        changing the value of an attribute of this object will not change the actual cookie.
        Unfortunately. For that, [document.cookie = "{cookie name}={value}";] is still an
        option. */
  function parseCookies() {
    var c = document.cookie; // Open cookie jar
    var q = c.substr(0, c.length).split("; "); // Separate cookies
    var v = "({";

    // Divide cookies
    for(var i=0; i<q.length; i++) {
      var p = q[i].split("=");
      v += '"'+p[0]+'":"'+p[1]+'",';
    }

    // Share cookies
    return eval("/*Cookie parser*/\n"+v.substr(0, v.length-1)+"})");
  }

  /* query(url, callback, grouptag)
      Makes a request for a resource on a website and executes the callback with the responseText
      and responseXML as a JSON Object and a DOM Object (respectively) as parameters.

      Parameters:
        url       The url of the resource to request
        callback  The callback to execute when the request is received (State=200 and Status=4)
        grouptag  Tag to group similar requests (to minimize DevBug entries) */
  function query(url, callback, grouptag) {
    if(!url || !callback) throw "Query error: URL or Callback are missing";

    var req = new window.XMLHttpRequest();
    var gtag = grouptag || url;

    logIt(gtag, "Query: "+url, "Request initiated");
    req.onreadystatechange = function() {
      if(req.readyState == 4) {
        switch(req.status) {
          case 200: {
            logIt(gtag, "Query: "+url, "Request OK");
            var json, text = req.responseText;

            try {json = eval("/*Query: Parse to JSON Object*/\n("+text+")");}
            catch (except) {json = null;}

            try {
              callback(json, req.responseXML, text);
            } catch(except) {
              logIt(gtag, "Query: "+url, "Callback error\n"+except.name+"\n"+except.message+(except.lineNumber?"\nLine: "+except.lineNumber:""));
            }
            break;
          }

          case 403: logIt(gtag, "Query: "+url+" [Forbidden]", "Access denied"); break;
          case 404: logIt(gtag, "Query: "+url+" [Not Found]", "Not found"); break;
          case 420: logIt(gtag, "Query: "+url+" [Invalid Record]", "Record could not be saved"); break;
          case 421: logIt(gtag, "Query: "+url+" [User Throttled]", "User is throttled, try again later"); break;
          case 422: logIt(gtag, "Query: "+url+" [Locked]", "The resource is locked and cannot be modified"); break;
          case 423: logIt(gtag, "Query: "+url+" [Already Exists]", "Resource already exists"); break;
          case 424: logIt(gtag, "Query: "+url+" [Invalid Parameters]", "The given parameters were invalid"); break;
          case 500: logIt(gtag, "Query: "+url+" [Internal Server Error]", "Some unknown error occurred on the server"); break;
          case 503: logIt(gtag, "Query: "+url+" [Service Unavailable]", "Server cannot currently handle the request, try again later"); break;
        }
      }
    };

    try {
      req.open("GET", url, true);
      req.send();
    } catch (except) {
      logIt(gtag, "Query: "+url, "Error: "+except);
    }
  }


  /* createFloaingPanel(parent, closeButton)
      Creates a new floating panel with a close button (if specified) and a DIV and returns the DIV
      to add a content.

      Parameters:
        parent       The parent object from which retrieve its position and size
        closeButton  Indicates if a close button should be used (true) instead of closing the panel
                     by clicking anywhere else (false) */
  function createFloatingPanel(parent, closeButton) {
    var xywh = [0, 0, 64, 16];

    if(parent != null) {
      xywh = [parent.offsetTop-6, parent.offsetLeft-6, parent.offsetWidth+6, parent.offsetHeight+6];
    }

    var floatingPanel = document.createElement("div");
    floatingPanel.className = "floatingPanel rounded";
    floatingPanel.style.top = xywh[0]+"px";
    floatingPanel.style.left = xywh[1]+"px";
    floatingPanel.style.minWidth = xywh[2]+"px";
    floatingPanel.style.minHeight = xywh[3]+"px";
    document.body.appendChild(floatingPanel);

    var floatingContent = document.createElement("div");
    floatingPanel.appendChild(floatingContent);

    floatingContent.center = function() { // Utility function to center the panel
      var dis = this.parentNode;
      window.setTimeout(function() {
        dis.style.left = ((window.innerWidth/2)-(dis.offsetWidth/2))+"px";
        dis.style.top = ((window.innerHeight/2)-(dis.offsetHeight/2))+"px";
      }, 1);
    };

    floatingContent.addCloseButton = function(beforeClose) {
      var closeButton = document.createElement("small");
      closeButton.className = "close";
      closeButton.innerHTML = "X";
      closeButton.title = "Click to close";
      closeButton.addEventListener("click", function() {
        if(beforeClose) beforeClose();
        hidePanels();
      }, true);
      this.parentNode.appendChild(closeButton);
    };

    floatingContent.remove = function() {
      floatingPanel.style.opacity = "0";
      window.setTimeout(function(){document.body.removeChild(floatingPanel)}, 100);
    }

    switch(closeButton) {
      case true: floatingContent.addCloseButton(null); break;
      case false: document.body.addEventListener("click", hidePanels, true); break;
      case null: floatingContent.center(); break;
    }

    return floatingContent;
  }

  /* hidePanels()
      Hides (removes from the document, actually) all floating panels that are in the page */
  function hidePanels() {
    var i, fps = document.querySelectorAll(".floatingPanel");

    for(i=0; i<fps.length; i++) {
      var fp = fps[i];
      if(fp) fp.remove();
    }
    document.body.removeEventListener("click", hidePanels, true);
  }

  /* logIt(tag, title, message)
      Adds a new log to the error console with the title and the message arranged in separate lines.
      If the DevBug extension exists, it will create a new DevLog entry with the title and the
      message specified */
  function logIt(tag, title, message) {
    if(settings.uselog) {
      if(devbug)
        new devbug("{BorosAdmin} "+tag, "{BorosAdmin} "+title.replace(/\n/gm, "<br/>"), message.replace(/\n/gm, "<br/>"), false);
      else {
        console.log("{BorosAdmin} "+title+(message?"\n\t"+message.replace(/\n/gm, "\n\t"):""));

        if(settings.floatinglog) {
          var dbg = document.getElementById("dbgTextarea");
          if(!dbg) {
            dbg = document.createElement("textarea");
            dbg.id = "dbgTextarea";
            dbg.style = "display:block; position:fixed; left:1em; bottom:1em; right:auto; top:auto; width:80%; height:4em; z-index:10";
            dbg.value = "";
            dbg.addEventListener("focus", function() {
              this.style.height = "25%";
            }, true);
            dbg.addEventListener("blur", function() {
              this.style.height = "5em";
            }, true);
            document.body.appendChild(dbg);
          }
          dbg.value += (dbg.value.length>0?"\n\n":"")+"{BorosAdmin} "+title+(message?"\n\t"+message.replace(/\n/gm, "\n\t"):"");
          dbg.scrollTop = dbg.scrollHeight;
        }
      }
    }
  }

  function writeSettings() {
    if(window.localStorage) {
      var contactInfo = document.getElementById("ba_contactInfo").value;
      var contactMail = document.getElementById("ba_contactMail").value;
      var textSize = document.getElementById("ba_textsize").value;
      var uselog = document.getElementById("ba_uselog").checked;
      var floatinglog = document.getElementById("ba_floatinglog").checked;

      window.localStorage.baSettings = "({version:'"+defset.version+"'"+
          ", textSize:"+textSize+
          ", contactInfo:'"+contactInfo+"'"+
          ", contactMail:'"+contactMail+"'"+
          ", uselog:"+uselog+
          ", floatinglog:"+floatinglog+"})";;

      var m = document.getElementById("ba_msgSaved").style;
      m.display = "inline";
      window.setTimeout(function() {m.display = "none";}, 1000);
    } else {
      window.alert("localStorage is disabled in your browser");
    }
    document.getElementById("ba_btnSave").disabled = true;
  }

})();
