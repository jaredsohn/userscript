// ==UserScript==
// @name           Enhanced SAP SDN forums threads
// @namespace      http://forums.sdn.sap.com
// @description    Minor tweaks for individual SAP SDN forum message threads
// @include        http://forums.sdn.sap.com/thread.jspa*
// @include        https://forums.sdn.sap.com/thread.jspa*
// @include        http://forums.sdn.sap.com/message.jspa*
// @include        https://forums.sdn.sap.com/message.jspa*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

/* Use the following configuration options for enabling or disabling
   certain features within the script.
   To enable an option set the value to true, otherwise use false.
*/
var mySDN= {
   // Use posting times like 1h 10min ago instead of absolute time stamps
   useRelativePostingTimes : true,
   // Show the location of the user via a country flag and country description
   showCountry : true,
   // Show the total number of points (if enabled on business card)
   showTotalPoints : true,
   // Show the company URL of the user (if entered on the business card)
   showCompanyURL: true,
   // Show the e-mail address of the user (if entered on the business card)
   showEmailAddress : true,
};

//------------------------------------------------------------------------------

mySDN.addBusinessCardDetails= function(bcURL, nodes) {
  var baseURL= bcURL.replace(/(http[s]?:\/\/[^\/]*).*/, '$1');
  GM_xmlhttpRequest({
    method: 'GET',
    url: bcURL,
    // Add to each message the additional info from the business card
    onload: function(response) {
      // Retrieve the country flag from the business card and correct source URL
      var countryElem= $('#title', response.responseText);
      var countryFlag= $('img[alt="Country"]', countryElem);
      var countryText= $('select option[selected="true"]', countryElem).text();
      countryFlag.attr('src', baseURL+countryFlag.attr('src'));
      // Get the total number of points
      var pdNode= $('#personalData', response.responseText);
      var totalPoints= $('#bcValPoints a[href*="Point"]', pdNode).text();
      totalPoints= new Number(totalPoints);
      // Get company name and company URL
      var company= $('#bcValCompany p.bcViewElement', pdNode).text();
      var companyURL= $('#bcValCompanyUrl a.bcViewElement', pdNode).attr('href');
      // Use link to company's URL if present (add http:// prefix if missing)
      if(companyURL && !companyURL.match(/^\s*$/)) {
        if(companyURL.indexOf('://')<0) {
          companyURL= 'http://'+companyURL;
        }
        company= '<a style="font-size:8pt!important" href="'+
          companyURL+'" target="_blank">'+company+'</a>';
      }
      // Get e-mail ID of user
      var email= $('#bcValEmail a.bcViewElement', pdNode).text();
      // Add info to user details
      nodes.forEach(function(node) {
        if(mySDN.showTotalPoints && totalPoints.valueOf()!==0) {
          $(node).append('<br/>Total Points: '+totalPoints.toLocaleString());
        }
        if(mySDN.showCountry) {
          $(node).append('<br/><br/>').append(countryFlag.clone());
          $(node).append(' &nbsp;&nbsp;'+countryText);
        }
        if(mySDN.showCompanyURL && company && !company.match(/^\s*$/)) {
          $(node).append('<br/>'+company);
        }
        if(mySDN.showEmailAddress && email && !email.match(/^\s*$/)) {
          $(node).append(
            '<br/><a style="font-size:8pt!important" href="mailto:"'+
            email+'">'+email+'</a>');
        }
      });
    }
  });
}

mySDN.addUserDetails= function() {
  // Collect all unique user ID references within this thread
  var usrMap= {};
  $('.jive-first a[href*=profile.jspa]').each(function() {
    if(!usrMap[this.href]) {
      usrMap[this.href]= [];
    }
    usrMap[this.href].push(
      $(this).parents('table').siblings('span.jive-description'));
  });
  // Lookup for each user the number of questions/posts and update their info
  $.each(usrMap, function(usrRef,nodes) {
    GM_xmlhttpRequest({
      method: 'GET',
      url: usrRef,
      onload: function(response) {
        var numPsts= 0, numQstn= 0, bcURL='';
        $('div.jive-profile-box td.jive-label', response.responseText).each(function() {
          if($(this).text().match('Posts')) {
            numPsts= $(this).next().text();
          } else if($(this).text().match('Questions')) {
            numQstn= $(this).next().text().replace('unresolved','open');
            numQstn= numQstn.replace(
              /(\(\d\d+\s+open\))/,'<span style="color:red;">$1</span>');
          } else if($(this).text().match('Name')) {
            bcURL= $(this).next().children('a').attr('href').replace(
              /[^']*'(http[^']*)'[^']*'([^']*?)'.*/, '$1$2');
          }
        });
        var usrInfo= 'Posts: '+numPsts+'<br/>Questions: '+numQstn+'<br/>';
        nodes.forEach(function(node,index) {
          var usrPnts= $('a',usrMap[usrRef][index]).clone();
          $(node).html(usrInfo).append(usrPnts);
        });
        // Follow reference to user's business card to collect further details
        mySDN.addBusinessCardDetails(bcURL, nodes);
      }
    });
  });
};
  

mySDN.secondsToString= function (t) {
  var units=['year','month','day','h','m'];
  var secPerUnt= [31104000,2592000,86400,3600,60];
  var s= '', d;
  for(i=0, n=0; i<units.length && n<2; i++) {
    d= ((n<1 && i<units.length-1) ? Math.floor : Math.round)(t/secPerUnt[i]);
    s+= (d===0) ? '' : ' '+d+units[i]+((d>1&&i<3) ? 's':'');
    n+= (d>0 || n>0) ? 1 : 0;
    t= t % secPerUnt[i];
  }
  return s;
};


mySDN.relativePostingTimes= function() {
  // Get all message posting times...
  var now= new Date().getTime();
  // Default timezone for users not logged on seems to be GMT+2
  var timezone= '';
  $('#identity .welcomemessage:contains("Guest")').each(function() {
    timezone= ' GMT+2';
  });
  $('span.jive-subject ~ span.jive-description:contains("Posted")').each(function() {
    // Determine number of elapsed seconds since posting
    var d= new Date($(this).text().replace(
        /\s*posted\s*:\s*|\s*in\s*response[\w\W]*/gi,'')+timezone);
    var response= $('nobr', this).clone();
    $(this).html('Posted <span class="postingTime" title="'+
        d.toLocaleString()+'"></span> ago').append(response);
  });
  // ...and replace it with relative posting times which update every minute
  var updatePostedTimes= function updatePostedTimes() {
    var now= new Date().getTime();
    $('.postingTime').each(function() {
      var d= new Date($(this).attr('title'));
      var t= mySDN.secondsToString((now - d.getTime())/1000);

      $(this).html(t);
    });
    window.setTimeout(updatePostedTimes,60000);
  };
  updatePostedTimes();
};


mySDN.fixCssIssues= function() {
  // Limit content width to force scroll bars if somebody entered overlong
  // coding/quotes
  $('jive-pre, code').css({
    'font-family':'arial monospaced for sap, courier new, monospaced',
    'font-size':'9pt',
    'width':'58.75em'
  });
  $('.jive-message-body').css('width','58.75em');
  // Left justify quotes
  $('.jive-quote').css('text-align','left');
};


mySDN.localizeLinksToOriginalMessage= function() {
  var anchors= {};
  $('a[name]').each(function() {
    anchors[$(this).attr('name')]= this;
  });
  $('td.jive-last .jive-subject ~ span.jive-description a').each(function() {
    var ref= $(this).attr('href').replace(/^[^#]*#/,'');
    if(anchors[ref]) {
      $(this).attr('href', '#'+ref);
    }
  });
}


mySDN.addUserDetails();
mySDN.fixCssIssues();
if(mySDN.useRelativePostingTimes) {
  mySDN.relativePostingTimes();
}
mySDN.localizeLinksToOriginalMessage();
