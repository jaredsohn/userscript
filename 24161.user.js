/*
--------------------------------------------------------------------
  How to Install a Greasemonkey Script
--------------------------------------------------------------------

- You need the Firefox web browser - Download and install
  http://www.mozilla.com/en-US/firefox/

- You need to install Greasemonkey - How-To
  http://internetducttape.com/2007/08/23/howto-install-firefox-extensions-screenshots/

- Install this script - How-To
  http://internetducttape.com/2007/08/24/howto-use-firefox-greasemonkey-userscripts-screenshots/

*/

// ==UserScript==
// @name           Friend Feed By Service
// @namespace      http://InternetDuctTape.com
// @description    Search through FriendFeed by specific services
// @include        http://friendfeed.com/*
// @exclude        http://friendfeed.com/settings*
// @exclude        http://friendfeed.com/account*
// @version        0.64
// ==/UserScript==

/*

- BUGFIX: Works with Even More Expander
- BUGFIX: the By Service fixed position menu wasn't clickable after scrolling
- BUGFIX: the 'click to share this script' link should be hidden unless you're hovering
- Change the promote link to go to the new documentation

 */

var friendfeedbyservice_version = "0.64";

(function() {
  // Script updates itself every two weeks.
  autoUpdateFromUserscriptsDotOrg({
    name: 'Friend Feed By Service',
	url: 'http://userscripts.org/scripts/source/24161.user.js',
	version: friendfeedbyservice_version,
	});

  window.IDT_BYSERVICE_HIDE_LIST = [];

  // Function for going through the list and hiding related services.
  window.IDT_BYSERVICE_HIDE_SERVICE = function(node) {
    window.IDT_BYSERVICE_HIDE_LIST.forEach( function(service) {
					 $(node).find('.icon a[@href="?service='+service+'"]').parents('.cluster').hide();
					 });

  }

  window.IDT_BYSERVICE_SETPOPUPMENU = function (B, E, STYLE) {
    // This is a copy of FriendFeed's setPopupMenu routine because it
    // has to handle fixed positioning.
    var A = $(".popupmenu");
    if (A.length && A[0].menulink == E) {
      unsafeWindow.closePopupMenu();
      return;
    }
    unsafeWindow.closePopupMenu();
    var F = $("<div class=\"popupmenu\" "+STYLE+">");
    var H = $("<div class=\"shadow\">");
    var C = $("<div class=\"foreground\">");
    F.append(H);
    F.append(C);
    F[0].menulink = E;    
    $.each(B, function (K, L) {
	     var J = $.extend({href:"#"}, L.attrs || {});
	     var I = $(unsafeWindow.tag("a", J, L.l));
	     if (L.onclick) {
	       I.click(function (M) {
			 L.onclick(M);
			 unsafeWindow.closePopupMenu();
			 return false;
		       });
	     }
	     C.append(I);
	   });
    if (!B.length) {
      C.append("No options :(");
    }
    $("body").append(F);
    var G = $(E).offset();
    G.top += $(E).height() + 2;
    F.css(G);
    var D = 2;
    H.width(C.width() + D);
    H.height(C.height() + D);
  }

  // Create a callback after FF's addExtraLinks task to run the HIDE_SERVICE method.
  if ('function' != typeof(unsafeWindow.origAddExtraLinks)) {
    unsafeWindow.origAddExtraLinks = unsafeWindow.addExtraLinks;
    unsafeWindow.addExtraLinks = function(B, C) {
      //      console.log("addExtraLinks: ",B, C);
      unsafeWindow.origAddExtraLinks(B, C);
      window.IDT_BYSERVICE_HIDE_SERVICE(B);
    };
  }  

  GM_addStyle('.idt-services .idt-promote { visibility:hidden;  } .idt-services:hover .idt-promote { visibility:visible; } .popupmenu a { white-space:nowrap; } .popupmenu { margin-left: -70px; }');

  function friendFeedByService() {   
    loadServicesFromGM();
    var IDT_FF_SERVICES = [];
    var IDT_FF_SERVICES_LOADING = 0;
    var ff_by_service_promote = '<div class="idt-promote" style="padding-bottom: 0.5em;"><a title="Click to share Friend Feed By Service script with your friends" target="_blank" href="http://friendfeed.com/share?url=http://internetducttape.com/2008/04/10/friendfeed-scripts-unsubscribe-who-service/%23byservice&title=Add%20links%20to%20Friend%20Feed%20to%20filter%20by%20service">Click to share this script</a></div>';

    function loadServicesFromGM() {
      var now = new Date().getTime();
      var ONE_DAY = 24 * 60 * 60 * 1000;
      var lastChecked = GM_getValue('IDT_SERVICES_LAST_CHECKED', null);
      if (lastChecked && (now - lastChecked) < ONE_DAY) {
	// Less than a day, don't check
	return;
      }
      else {
	// More than a day, check for new services
	GM_setValue('IDT_FF_SERVICES', ''); // Reset the services
	GM_setValue('IDT_SERVICES_LAST_CHECKED', now.toString());    
      }
    }

    function loadServiceLinks() {
      GM_xmlhttpRequest({url:'http://friendfeed.com/search/advanced', 
			    method:"GET",
			    headers:{
			    "Content-Type": "application/x-www-form-urlencoded"},
			    data:'',
			    onload:function(xhr){
			    var services = [];
			    xhr.responseText.match(/option value="[^\"]+"/g).forEach(function(i) {
									   var service = i.split('"')[1];
									   if ('friendfeed' == service) {
									     service = 'internal';
									   }
									   services.push(service);
									 });
			    GM_setValue('IDT_FF_SERVICES', services.join(',') );
			    //			    console.log("got services ", services);
			  },
			    onerror:function(xhr){
			    alert("Unable to download service list from Friend Feed.");
			  }
			});
    }

    function checkServices() {
      IDT_FF_SERVICES = GM_getValue('IDT_FF_SERVICES', '').split(',');
      //      console.log("checkServices ", "loading: ", IDT_FF_SERVICES_LOADING, "length: ", IDT_FF_SERVICES.length);
      if ((0 == IDT_FF_SERVICES_LOADING) && (1 == IDT_FF_SERVICES.length)) {
	//	console.log("loading services");
	IDT_FF_SERVICES_LOADING = 1;
	loadServiceLinks();
      }
      if ((1 == IDT_FF_SERVICES_LOADING) && (1 == IDT_FF_SERVICES.length)) {
	//	console.log("waiting for services ", IDT_FF_SERVICES_LOADING);
	setTimeout(checkServices, 100);
      }
      else {
	//	console.log("have services ", IDT_FF_SERVICES);
	window.IDT_FF_SERVICES = IDT_FF_SERVICES;
	if ((document.location.pathname != '/') &&
	    (document.location.pathname != '/public')
	    ) {
	  buildServiceFilterSidebar();
	  buildServiceClickHandler("")
	}
	else {
	  buildServiceLinks();
	  buildServiceClickHandler('style="position:fixed;"')
	}
      }
    }

    function buildServiceClickHandler(style) {
      // Because I can never remember how setPopupMenu works.
      // unsafeWindow.clickHandlers.options = function(B) { console.log("clickHandlers.options: ", B); }
      // unsafeWindow.setPopupMenu = function(B, E) { console.log("setPopupMenu: ", B, E); };
      // unsafeWindow.clickHandlers.idt_byservice = function(B) { console.log("clickHandlers.idt_byservice: ", B); }
      unsafeWindow.clickHandlers.idt_byservice = function(B) {
	var service = B.attr('service');
	var D = [];
	D.push({
	  l:"Filter by "+service,
	      attrs:{
	      'class':"noframe",
		href:'?q=&service='+service+'&num='+unsafeWindow.gFeedArgs.num+'&who='
		}
	  });
	var pos = $.inArray(service, window.IDT_BYSERVICE_HIDE_LIST);
	// Hide/Show is a toggle. One or the other shows depending on the current setting.
	if (pos == -1) {
	  D.push({
	    l:"Hide "+service,
		onclick:function() {
		var pos = $.inArray(service, window.IDT_BYSERVICE_HIDE_LIST);
		if (pos >= 0) { window.IDT_BYSERVICE_HIDE_LIST.splice(pos, 1); }
		window.IDT_BYSERVICE_HIDE_LIST.push(service);
		$('.cluster > .icon a[@href="?service='+service+'"]').parents('.cluster').hide();
		window.idtUpdateHideBox();
	      }});
	}
	else {
	  D.push({
	    l:"Show "+service,
		onclick:function() {
		var pos = $.inArray(service, window.IDT_BYSERVICE_HIDE_LIST);
		if (pos >= 0) { window.IDT_BYSERVICE_HIDE_LIST.splice(pos, 1); }
		$('.cluster > .icon a[@href="?service='+service+'"]').parents('.cluster').show();
		window.idtUpdateHideBox();
	      }});
	}
	// Hide everything always shows.
	D.push({
	  l:"Hide everything<br /> but "+service,
	      onclick:function() {
	      // Copy all services
	      window.IDT_BYSERVICE_HIDE_LIST = window.IDT_FF_SERVICES.slice();
	      var pos = $.inArray(service, window.IDT_BYSERVICE_HIDE_LIST);
	      if (pos >= 0) { window.IDT_BYSERVICE_HIDE_LIST.splice(pos, 1); }
	      window.IDT_BYSERVICE_HIDE_LIST.forEach( function(s) {
		  $('.cluster > .icon a[@href="?service='+s+'"]').parents('.cluster').hide();
						 });
	      window.idtUpdateHideBox();
	    }});
	window.IDT_BYSERVICE_SETPOPUPMENU(D, B, style);
      };    
    }

    function buildServiceLinks() {
      var services = IDT_FF_SERVICES;

      // &public=1
      var extra_opts = '';
      if ('/public' == document.location.pathname) {
	extra_opts += '&public=1';
      }

      var text = '<div id="infobox" class="idt-services" style="position:fixed; right:0pt; top:250px; width:190px; z-index:1; }"><div class="rounded"><div class="t"><div class="l"><div class="r"><div class="b"><div class="bl"><div class="br"><div class="tl"><div class="tr"><div class="body"><div class="section"><h3>Filter By Service</h3>';

      var num = '';
      if (unsafeWindow.gFeedArgs) {
	num = '&num='+unsafeWindow.gFeedArgs.num;
      }
      // #?q=&service='+s+extra_opts+num+'&who=
      services.forEach(function(s) {
			   text += ' <a service="'+s+'" class="l_idt_byservice" title="'+s+'" href="#"><img height="16" width="16" src="http://friendfeed.com/static/images/icons/'+s+'.png" alt="'+s+'"/></a>';
			 }
			 );
      //      text += '</div>';
      text += '<div id="idt-byservice-hidden"></div>';
      text += ff_by_service_promote;
      text += '</div></div></div></div></div></div></div></div></div></div></div></div>';
      $('#body').prepend( text );
      text = null;
      window.idtUpdateHideBox();
    };

    function buildServiceFilterSidebar() {
      var insert = '<div class="section idt-services"><h3>Filter By Service</h3>';
      insert += '<a service="internal" class="l_idt_byservice"  title="Filter by FriendFeed" href="#"><img width="16" height="16" alt="internal" src="http://friendfeed.com/static/images/icons/internal.png"/></a>';
      var last = '';
      $('.section img.icon[alt]').each( function(i) {
					  var alt = $(this).attr('alt');
					  if (last != alt) {
					    last = alt;
					    // ?q=&service='+alt.replace(/\./g,'').toLowerCase()+'&num='+unsafeWindow.gFeedArgs.num+'&who=
					    var s = alt.replace(/\./g,'').toLowerCase();
					    insert += '<a service="'+s+'" class="l_idt_byservice" title="Filter by '+alt+'" href="#">'+$(this).parent().html()+'</a>';
					  }
					});
      insert += '<div id="idt-byservice-hidden"></div>';
      insert += ff_by_service_promote;
      insert += '</div>';
      $('.section:first').after(insert);
      insert = null;
      window.idtUpdateHideBox();
    }

    function addFilter(func, i) {
      i = i || 4;
      if (window.AutoPagerize && window.AutoPagerize.addFilter) {
	window.AutoPagerize.addFilter(function (nodes) {
					// Have to rebuild the click handler for every page for some reason.
					//					buildServiceClickHandler();
					nodes.forEach(func);
				      });
      }
      else if (i > 1) {
	setTimeout(arguments.callee, 1000, func, i - 1);
      }
      else {
	(function () {
	  func(document);
	  setTimeout(arguments.callee, 200);
	})();
      }
    }

    function idtUpdateHideBox() {
      function idtByServiceMakeUrl(s) {
	return '<a service="'+s+'" class="l_idt_byservice" href="#">'+s+'</a>';
      }
      if (window.IDT_BYSERVICE_HIDE_LIST.length > 0) {
	var permalink = document.location.href;
	if (document.location.search == "") {
	  permalink += '?hide_service='+window.IDT_BYSERVICE_HIDE_LIST.join('-');
	}
	else {
	  permalink += '&hide_service='+window.IDT_BYSERVICE_HIDE_LIST.join('-');
	}
	$('#idt-byservice-hidden').html('<ul style="list-style: none; padding-left: 10px;"><li>Hiding: '+
					window.IDT_BYSERVICE_HIDE_LIST.map(idtByServiceMakeUrl).join(', ')+
					'</li><li>Save: <a title="Permalink to this page" href="'+
					permalink+
					'">Permalink</a></li></ul>'
					);
      }
      else {
	$('#idt-byservice-hidden').html('&nbsp;');
      }
    }

    function hideByUrlParams() {
      // Let users turn off services by command line urls.
      document.location.search.split(/[\?&]/).forEach( function(param) {
							 var pair = param.split('=');
							 if (pair[0] == "hide_service") {
							   window.IDT_BYSERVICE_HIDE_LIST = pair[1].split('-');
							 }
						       });
      window.IDT_BYSERVICE_HIDE_LIST.forEach(function(service) {
					  $('.cluster > .icon a[@href="?service='+service+'"]').parents('.cluster').hide();
					});
      window.idtUpdateHideBox();
    }

    // main
    window.IDT_BYSERVICE_HIDE_LIST = window.IDT_BYSERVICE_HIDE_LIST || [];
    window.idtUpdateHideBox = idtUpdateHideBox;
    hideByUrlParams();
    checkServices();
    addFilter(window.IDT_BYSERVICE_HIDE_SERVICE);    
  };

  function jquery_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(jquery_wait,100); }
    else { $ = unsafeWindow.jQuery; friendFeedByService(); }
  }
  jquery_wait();
 })();


function autoUpdateFromUserscriptsDotOrg(SCRIPT) {
  // Update code from Junk Blocker: http://loonyone.livejournal.com/
  // usage example
  // autoUpdateFromUserscriptsDotOrg({
  //   name: 'RSS+Atom Feed Subscribe Button Generator',
  //   url: 'http://userscripts.org/scripts/source/688.user.js',
  //   version: "1.2",
  // });
  try {
    if (!GM_getValue) return; // Older version of Greasemonkey. Can't run.

    // avoid a flood of dialogs e.g. when opening a browser with multiple tabs set to homepage
    // and a script with * includes or opening a tabgrop
    var DoS_PREVENTION_TIME = 2 * 60 * 1000;
    var isSomeoneChecking = GM_getValue('CHECKING', null);
    var now = new Date().getTime();
    GM_setValue('CHECKING', now.toString());

    if (isSomeoneChecking && (now - isSomeoneChecking) < DoS_PREVENTION_TIME) return;

    // check daily
    var ONE_DAY = 24 * 60 * 60 * 1000;
    var ONE_WEEK = 7 * ONE_DAY;
    var TWO_WEEKS = 2 * ONE_WEEK;
    var lastChecked = GM_getValue('LAST_CHECKED', null);
    if (lastChecked && (now - lastChecked) < TWO_WEEKS) return;

    GM_xmlhttpRequest({
      method: 'GET',
	  url: SCRIPT.url + '?source', // don't increase the 'installed' count just for update checks
	  onload: function(result) {
	  if (!result.responseText.match(/@version\s+([\d.]+)/)) return;     // did not find a suitable version header

	  var theOtherVersion = parseFloat(RegExp.$1);
	  if (theOtherVersion <= parseFloat(SCRIPT.version)) return;      // no updates or older version on userscripts.orge site

	  if (window.confirm('A new version ' + theOtherVersion + ' of greasemonkey script "' + SCRIPT.name + '" is available.\nYour installed version is ' + SCRIPT.version + ' .\n\nUpdate now?\n')) {
	    GM_openInTab(SCRIPT.url);   // better than location.replace as doing so might lose unsaved data
	  }
	}
      });
    GM_setValue('LAST_CHECKED', now.toString());
  } catch (ex) {
  }
}
