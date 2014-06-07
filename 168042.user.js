// ==UserScript==
// @name         li_endorse
// @namespace    li_endorse
// @include      *linkedin*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @require      http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
// @resource     animateCSS https://github.com/daneden/animate.css/blob/master/animate.min.css
// @author       Pete Rusev
// @description  Add endorsements members are known for on search results and profile top card.
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);
var mini_profile_id = 0;

$(document).ready(function() { 
  var newCSS = GM_getResourceText ("animateCSS");
  GM_addStyle(newCSS);

  $(document).on("DOMSubtreeModified", ".new-miniprofile-content", function(){ 
    var temp = $('.new-miniprofile-content p.name a').attr('href').match(/id=(\d+)/)[1];
    if(temp == mini_profile_id) return; // run only once per hovercard
    mini_profile_id = temp;
    if(!miniprofile_skills[temp]) return; // this member has no top endorsed skills
  
    $(this).find('.miniprofile-body').css('height', '120px');
    $(this).find('.miniprofile-body div.title').after('<div class="title skill_list" style="margin: 5px 0;"><span>Known for: </span>' + miniprofile_skills[temp] + '</div>');
    $('.skill_list').effect("highlight", {}, 10000);
    $('.skill_list').addClass('animated pulse');
  });
  
  $(document).on("DOMSubtreeModified", "div.listener-initialized", function(){ 
    var temp = $(this).find('h2.mini > a').attr('href').match(/show\/(\d+)\?/)[1];
    if(temp == mini_profile_id) return; // run only once per hovercard
    mini_profile_id = temp;
    if(!miniprofile_skills[temp]) return; // this member has no top endorsed skills
    
    $(this).find('ul.position').append('<li class="skill_list" style="margin: 5px 0;"><span>Known for: </span>' + miniprofile_skills[temp] + '</li>');
    $('.skill_list').effect("highlight", {}, 10000);
    $('.skill_list').addClass('animated pulse');
  });

  var grep = document.URL.match(/view\?id=(\d+)/);
  var profile_id = grep ? grep[1] : false;
  var grep2 = document.URL.match(/show\/(\d+)\?/);
  var cap_profile_id = grep2 ? grep2[1] : false;
  
  var mids = new Array();
  // GRAB LIST OF ALL MEMBER IDs ON SRP
  if(!profile_id && !cap_profile_id) {
    // SRP ON MAIN SITE
    $('.people div.bd h3 > a').each(function(){
      var temp = $(this).attr('href').match(/id=(\d+)/);
      mids.push(temp[1]);
    });
    // SRP ON CAP
    $('h2.name > a').each(function(){
      var temp = $(this).attr('href').match(/show\/(\d+)\?/);
      mids.push(temp[1]);
    });
  }
  // USE MEMBER ID FROM PROFILE
  else {
    mids.push(profile_id || cap_profile_id);
  }

  //if (mids.length == 0) return;  // no members ids on this page  
  
  // GET TOP 3 ENDORSEMENTS FOR THAT SET OF MEMBER IDs  
  var skills_url = "http://prusev-ld.linkedin.biz:2000/endorsements/top?mids=" + mids.toString() + "&format=json"
  GM_xmlhttpRequest({
    method: "GET",
    url: skills_url,
    onload: function(response) {
      var skills = jQuery.parseJSON(response.responseText);
      
      // DECORATE EACH SEARCH RESULT WITH THE APPROPRIATE ENDORSEMENTS 
      if (!profile_id && !cap_profile_id) {
        var i = 0;
        // MAIN SITE
        $('.people div.bd').each(function(){
          mid = mids[i].toString();
          i++;
          if (!skills[mid]) return;  // no endorsements for this member
          $(this).append('<dl class="snippet skill_list"><dt class="label">Known for</dt><dd><p class="abstract">' + skills[mid] + '</p></dd></dl>');
          $(this).find('.skill_list').effect('highlight', {color: '#FFFFCC'}, 10000);
          $('.skill_list').addClass('animated pulse');
        });
        // CAP
        setTimeout(function(){
        $('dl.career-info').each(function(){
          mid = mids[i].toString();
          i++;
          if (!skills[mid]) return;  // no endorsements for this member
          $(this).prepend('<dt class="skill_list">Skills</dt><dd class="skill_list"><span class="block">' + skills[mid] + '</span></dd></dl>');
          $(this).find('.skill_list').effect('highlight', {color: '#FFFFCC'}, 10000);
          $('.skill_list').addClass('animated pulse');
        });
        }, 5000);
      }
      // DECORATE PROFILE
      else {
        if (!skills[mids[0]]) return;  // no endorsements for this member
        setTimeout(function(){
        $('.profile-overview-content tbody').append("<tr id='overview-summary-skills'><th scope='row'><a href='#background-skills'>Top Skills</a></th><td><ol><li>" + skills[profile_id.toString()] + "</li></ol></td></tr>");
        $('dl.demographic-info').after("<dl id='overview-summary-skills'><dt>Top Skills</dt><dd>" + skills[cap_profile_id.toString()] + "</dd></dl>");
        
        $('#overview-summary-skills').effect("highlight", {}, 10000);
        $('#overview-summary-skills').addClass('animated pulse');
        }, 5000);
      }
    }
  });
  
  var miniprofile_skills = {}
  
  setTimeout(function(){
    var miniprofile_ids = new Array();
    $('.new-miniprofile-container, .miniprofile-container a').each(function(){
      var mid = 0;
      unsafeWindow.console.log(!profile_id && !cap_profile_id && $(this).attr('data-li-url'));
      unsafeWindow.console.log(profile_id > 0 && $(this).attr('href'));
      unsafeWindow.console.log(cap_profile_id > 0);
      
      if (!profile_id && !cap_profile_id && $(this).attr('data-li-url')) 
        mid = $(this).attr('data-li-url').match(/id=(\d+)/)[1];
      if (profile_id > 0 && $(this).attr('data-li-url') && $(this).attr('data-li-url').match(/id=(\d+)/))
        mid = $(this).attr('data-li-url').match(/id=(\d+)/)[1];
      if (cap_profile_id > 0) 
        mid = $(this).attr('href').match(/show\/(\d+)\?/)[1];
      miniprofile_ids.push(mid);
    });
    var uniq_miniprofile_ids = miniprofile_ids.sort().filter(function(el,i,a){return i==a.indexOf(el);})
    var miniprofile_url = "http://prusev-ld.linkedin.biz:2000/endorsements/top?mids=" + uniq_miniprofile_ids.toString() + "&format=json"
    GM_xmlhttpRequest({
    method: "GET",
    url: miniprofile_url,
    onload: function(response) {
      miniprofile_skills = jQuery.parseJSON(response.responseText);
    }
    });
  }, 10000); 

});