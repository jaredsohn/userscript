scr_meta=<><![CDATA[
// ==UserScript==
// @name           Facebook Tycoons Harvester
// @namespace      HiddenChilli-Tycoons-Harvester
// @description    Auto harvest stock every 5-10 minutes in Facebook Tycoons (http://apps.facebook.com/supertycoons/).
// @include        http://tycoons.fb.ironsidegames.com/*
// @resource       jQuery        http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js
// @resource       jQueryUI      http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js
// @resource       jQueryUICSS   https://chillicdn.appspot.com/stylesheets/jquery.ui.1.8.css
// @license        Proprietary License
// @version        20100604
// @copyright      2010 HiddenChilli
// ==/UserScript==
]]></>.toString();

// Inject jQuery
(function() {
  var head = document.getElementsByTagName('head')[0];
 
  var script = document.createElement('script');
  script.type = 'text/javascript';
 
  var jQuery = GM_getResourceText('jQuery');
  var jQueryUI = GM_getResourceText('jQueryUI');
 
  script.innerHTML = jQuery + jQueryUI;
  head.appendChild(script);
 
  //prevent conflict with the $ in Tycoons
  unsafeWindow.jQuery.noConflict();
  
  $ = unsafeWindow.jQuery;
})();


// Load jQuery UI CSS
(function() {
    var head = document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';
    var css = GM_getResourceText('jQueryUICSS');
    style.innerHTML = css;
    style.innerHTML += " .ui-progressbar-value { background-image: url(https://chillicdn.appspot.com/images/jqueryui/1.8/pbar-ani.gif); } "
    + " .ui-progressbar {height: 22px;}";
    head.appendChild(style);
})();


var min = 0;
var max = 0;
var randomSeconds = 0;
var refresh = 0;
var originalRefresh = 0;

function init() {
  min = 300; //in seconds
  max = 600; //in seconds
  randomSeconds = Math.floor(Math.random() * (max - min)) * 1000;
  refresh = (min * 1000) + (randomSeconds);
  originalRefresh = refresh;
}
init();

/* Type of method.
 * 1 = Form: Harvests by clicking on the Harvest Now button. Only works at Home and Business pages. (Recommended)
 * 2 = Ajax: Harvests resources, without refreshing the page. Works at every page. (Not recommended)
 */
var method = GM_getValue('method', 1);

var originToken = '';

var harvesting = false;
var forceMethod2 = false;
if ((location.href.indexOf('home') == -1 && location.href.indexOf('businesses') == -1) && method == 1) {
  //if user uses method 1 and runs the script on pages that does not support method 1, user is forced to use method 2 and an alert is shown.
  forceMethod2 = true;
  method = 2;
}


var harvest = $('.mogul-header:eq(0)');


var harvestBar = $('<p>\
<div class="ui-widget" id="forcemethod2" style="display:none;">\
	<div style="margin-top: 20px; padding: 0pt 0.7em;" class="ui-state-highlight ui-corner-all"> \
		<p style="font-size:12px;"><span style="float: left; margin-right: 0.3em;" class="ui-icon ui-icon-info"></span>\
		<strong style="font-size:14px;">Using Method 2.</strong> You are running Tycoons Harvester on a page that does not support Method 1.</p>\
	</div>\
</div>\
<div class="ui-widget" id="harvestlogdiv" style="display:none;">\
	<div style="margin-top: 20px; padding: 0pt 0.7em;" class="ui-state-highlight ui-corner-all"> \
		<p style="font-size:12px;"><span style="float: left; margin-right: 0.3em;" class="ui-icon ui-icon-info"></span>\
		<strong style="font-size:14px;">Harvest Status (Method 2)</strong> <span id="harvestlog"></span></p>\
	</div>\
</div>\
<span id="harvestDisplay" title="Click to pause/unpause"></span>\
<span id="ufo">Harvest Now</span>\
<span id="harvestersettings">Settings</span> \
</p> \
<div id="harvestprogressbar"></div>\
');

var settingsBox = $('<div title="Settings" id="settingsBox">\
<p>Harvest Method:</p>\
<label><input type="radio" name="harvestmethod" id="hmethod1" value="1" /> Method 1 (Form)</label><br />\
<span style="font-size:12px;">Harvests by clicking the "Harvest All Resources" button. Works only at Home and Businesses pages. </span><br />\
<label><input type="radio" name="harvestmethod" id="hmethod2" value="2" /> Method 2 (Ajax)</label><br />\
<span style="font-size:12px;">Harvests without refreshing the page. Works on every page.</span><br />\
<hr />\
<p>\
<a href="http://yz102.byethost14.com/survey" target="_blank" title="Donate by taking a quick survey.">Donate by Survey</a> | \
<a href="http://userscripts.org/scripts/show/63989" target="_blank">Script Page</a> | \
<a href="#" id="checkforupdates">Check for Updates</a> | \
<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=10450802" target="_blank">Donate</a> | \
</p>\
</div>');

var updateBox = $('<div title="Update" id="updateBox">\
<p>Update Available</p>\
<p style="font-size:12px;">An update to Facebook Tycoons Harvester is available (<span id="newupdateversion"></span>). Click <a href="https://userscripts.org/scripts/source/63989.user.js" target="_blank" id="thupdate">here</a> to update.</p>\
</div>');

var noUpdateBox = $('<div title="Update" id="updateBox">\
<p>No updates available.</p>\
<p style="font-size:12px;">You are running the latest version of Facebook Tycoons Harvester.</p>\
</div>');

var saveSettingsBox = $('<div title="Save Settings" id="saveSettingsBox">\
<p style="font-size:12px;">Please refresh the page for the changes to take effect.</p>\
</div>');

harvestBar.insertAfter(harvest);
settingsBox.insertAfter(harvest).dialog({
  autoOpen: false,
  modal: true,
  buttons: {
    'Save': function() {
			saveSettingsBox.dialog('open');
      saveSettings();
		},
		Cancel: function() {
			settingsBox.dialog('close');
		}
	},
  width: 600,
  height: 300
});
updateBox.insertAfter(harvest).dialog({
  autoOpen: false,
  modal: true,
  buttons: {
		'Close': function() {
			updateBox.dialog('close');
		}
	}
});
noUpdateBox.insertAfter(harvest).dialog({
  autoOpen: false,
  modal: true,
  buttons: {
    'Ok': function() {
			noUpdateBox.dialog('close');
		}
	}
});
saveSettingsBox.insertAfter(harvest).dialog({
  autoOpen: false,
  modal: true,
  buttons: {
    'Ok': function() {
			saveSettingsBox.dialog('close');
			settingsBox.dialog('close');
		}
	}
});
$("#harvestprogressbar").progressbar();

if (forceMethod2) {
  $('#forcemethod2').fadeIn(2000);
}

function saveSettings() {
  //setTimeout is used to fix the Greasemonkey bug.
  setTimeout(function() {
    var nmethod = $(':radio[name="harvestmethod"]:checked').val();
    GM_setValue('method', nmethod);
  }, 0);
}

function loadSettings() {
  //setTimeout is used to fix the Greasemonkey bug.
  setTimeout(function() {
    var meth = GM_getValue('method',1);
    $(':radio[name="harvestmethod"][value="'+meth+'"]').click();
  }, 0);
}

$('#checkforupdates').click(function() {
  //setTimeout is used to fix the Greasemonkey bug.
  setTimeout(function() {
    AutoUpdater.call(true);
  }, 0);
  return false;
});

$('#harvestersettings').button({icons:{primary:'ui-icon-wrench'},label:'Settings'}).click(function() {
  settingsBox.dialog('open');
  loadSettings();
});
$('#ufo').button({icons:{primary:'ui-icon-arrowrefresh-1-s'},label:'Harvest Now'}).click(go);

var paused = false;
$('#harvestDisplay').button({icons:{
      primary: 'ui-icon-pause'
    }}).attr('title', 'Click to pause').click(togglePause);

function togglePause() {
  if (paused) {
    if (!harvesting) {
      hcontinue();
    }
	} else {
    hpause();
	}
}

function hpause() {
  $('#harvestDisplay').button("option", "icons", {
    primary: 'ui-icon-play'
  }).attr('title', 'Click to play');
  clearInterval(intervalv);
  paused = true;
}

function hcontinue() {
  $('#harvestDisplay').button("option", "icons", {
    primary: 'ui-icon-pause'
  }).attr('title', 'Click to pause');
  intervalv = setInterval(autoHarvest, interval);
  paused = false;
}

var interval = 1000;
var intervalv = setInterval(autoHarvest, interval);

function autoHarvest() {
  //if (paused) return;
  if (refresh > 0) {
    refresh -= interval;
    var hpercent = 100 - (refresh / originalRefresh * 100);
    $('#autoharvest').css('width', hpercent + '%');
    $("#harvestprogressbar").progressbar("option", "value", hpercent);
    
    var nice = Math.floor(((refresh / (5 * 60 * 1000)) * 300)) + 's';
    
    $('#autoharvestdiv').attr('title', nice);
    $('#autoharvest2').text(nice);
    $("#harvestDisplay").button("option", "label", nice);
  } else {
    clearInterval(intervalv);
    go();
  }
}

function go() {
  if (method == 1) {
    method1();
  } else {
    method2();
  }
}

function method1() {
  //setTimeout is used to fix the Greasemonkey bug.
  setTimeout(function() {
    ($('.businesses-harvest-all-form')[0]) ? $('.businesses-harvest-all-form').submit() : $('.home-harvest-all-form').submit();
  }, 0);
}

function method2() {
  //setTimeout is used to fix the Greasemonkey bug.
  setTimeout(function() {
    if (!harvesting) {
      $('#harvestlogdiv:hidden').fadeIn(1000);
      getOriginToken();
      $('#harvestlog').text('Harvesting now.');
      harvesting = true;
      $("#harvestDisplay").button( "option", "disabled", true);
      $("#ufo").button( "option", "disabled", true);
      $("#harvestprogressbar").progressbar( "option", "disabled", true);
      hpause();
    }
  }, 0);
}

function method2step2() {
  //setTimeout is used to fix the Greasemonkey bug.
  setTimeout(function() {
  GM_xmlhttpRequest({
    url: 'http://tycoons.fb.ironsidegames.com/?a=formhandler',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: 'next_url=%2Fhome&formname=RpcApiMogul_HarvestAllBusinessInstances&origin_token='+originToken,
    onload: function(resp){
      try {
        var harvested = resp.responseText.match(/(You harvested .*\.)"/)[1];
        $('#harvestlog').html('Last harvest: ' + harvested);
        //harvestIn = 300;//5 Minutes (300 seconds)
        init();
        //intervalv = setInterval(autoHarvest, interval);
        harvesting = false;
        $("#harvestDisplay").button( "option", "disabled", false);
        $("#ufo").button( "option", "disabled", false);
        $("#harvestprogressbar").progressbar( "option", "disabled", false);
        hcontinue();
        //setTimeout(autoHarvest, interval);
      } catch (e) {
        $('#harvestlog').text('Harvest failed (e2). Retrying.');
        getOriginToken();
      } finally {
        //restart();
      }
    },
    onerror: function(){
      getOriginToken();
    }
  });
  }, 0);
}

function getOriginToken() {
  GM_xmlhttpRequest({
    url: 'http://tycoons.fb.ironsidegames.com/home',
    method: 'GET',
    onload: function(resp){
      tycoons = $(resp.responseText).filter('#template_body');
      originalForm = tycoons.find('.home-harvest-all-form');
      originToken = originalForm.find('input[name="origin_token"]').val();
      $('#harvestlog').text('Submitting form.');
      method2step2();
    },
    onerror: function(){
      $('#harvestlog').text('Harvest failed (e1). Retrying.');
      getOriginToken();
    }
  });
}


var AutoUpdater = {
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'https://userscripts.org/scripts/source/63989.user.js',
      onload: function(xpr) {
        AutoUpdater.compare(xpr,response);
      }
    });
  },
 compare: function(xpr, response) {
    this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      this.xversion = this.xversion[1].replace(/\./g, '');
      this.xname = this.xname[1];
    } else {
      return false;
    }
    if (+this.xversion > +this.version) {
      updateBox.dialog('open');
      $("#newupdateversion").text(this.xversion);
    } else {
      if (response) noUpdateBox.dialog('open');
    }
  },
  checkNow: function() {
    AutoUpdater.call(false);
  },
  init: function() {
    setInterval(AutoUpdater.checkNow, 1000 * 60 * 60 * 1);
  }
};
AutoUpdater.init();