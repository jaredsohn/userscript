// FlickrQuoter GreaseMonkey User Script
// by Stephen Fernandez aka Steeev http://steeev.freehostia.com/ http://flickr.com/photos/steeev

// ==UserScript==
// @name          flickrQuoter
// @description	  Adds a "quote" link to flickr discussions, and photo comments making it easier to quote people
// @version       1.96 5th March 2009
// @namespace     http://steeev.f2o.org/greasemonkey
// @author        Steeev with additional code by users Kastner + Scragz + Mortimerpa
// @include       http://flickr.com/groups/*
// @include       http://www*.flickr.com/groups/*
// @include       http://www*.flickr.com/help/forum/*
// @include       http://flickr.com/help/forum/*
// @include       http://www*.flickr.com/groups_topic.gne?*
// @include       http://flickr.com/groups_topic.gne?*
// @include       http://www*.flickr.com/messages_write.gne*
// @include       http://flickr.com/messages_write.gne*
// @include       http://www.flickr.com/photos/*
// @include       http://flickr.com/photos/*
// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need FireFox  http://www.mozilla.org/firefox and the firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
// Install the Greasemonkey extension then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "flickrQuoter", and click Uninstall.
//
// --------------------------------------------------------------------

// Script Usage Instructions
// ------------------
// After installing the script, you can select the text of a users post in the flickr forum/groups/flickrmail,
// then click the "quote" link and the selected text will be added to the text input box at the
// bottom of the page, nicely formatted and ready for you to add your reply.
// you can also click the quote link without selecting any text, if you do that, the whole post will be quoted


// Whats New
// =========
// v1.96 2009-03-05 fixed quote function on photo pages
// v1.95 2008-06-07 fixed backlinks when quoting in help forum
// v1.94 2008-06-05 got script working on photo pages, fixed bug with quoting deleted users
// v1.93 2007-05-11 added backlink functionality
// v1.92 2007-05-10 made script more compatible with other scripts that also place a textarea on the page, also got script to work on new "all in one" help forum
// v1.91 2007-04-10 fixed quoting of moderators (thanks tux for the report)
// v1.9 2006-07-20 improved quoting when no text has been selected
// v1.8 2006-06-29 fixed bug where you couldnt quote a post that had been edited, and did some code refactoring
// v1.7 2006-06-27 fixed bug in the quoting function for flickrmail replies
// v1.6 2006-06-27 improved the quoting function to add '>' the beginning of each quoted line on flickrmail replies
// v1.5 2006-06-25 added basic quoting function for flickr mail replies
// v1.4 2006-05-27 fixed full post quote (when theres no selection)
// v1.3 2006-05-26 thanks to mortimerpa_ for updates for Flickr Gamma.
// v1.2 2006-05-04 fixed the "partial quote via mouse selection" part of the code
// v1.1 2006-04-29 thanks to scragz for updates for GM 0.6.4
// v0.06 updated include directives to match new Flickr Group URLs
// v0.05 made compatible with gm 0.3.3
// v0.04 Added the help,bugs and ideas forums back to the includes, so the script should work in those forums too now. Also added a Whats new section.
// v0.03 Added installation and uninstallation instructions, and added bold tag to user quotation string, plus added back some of the removed includes.
// v0.02 thanks to Kastner for help in getting the quoting mechanism to work, cheers mate!
// v0.01 initial release, with very basic functionality - proof of concept stage


(function() {

  var getElementsByClassName = function (classname,tagname) {
    //N.B tagname is optional
    return unsafeWindow.Y.U.Dom.getElementsByClassName(classname,tagname);
    //return unsafeWindow.document.getElementsByClass(classname,tagname)
  }

  String.prototype.normalise = function() {
    return this.replace(/^\s+|\s+$/g, '').replace(/\s{2,}/g, ' ');
  };

// if we are on a group or forum page:
if (!location.href.match('messages\_write\.gne')) {

  var flickr_quoter_backlinks = 1; // set to 0 if you dont want backlinks
  var authorname_start_marker = "<b>";
  var authorname_end_marker = "</b> ";
  var author_adjective = "wrote";
  var author_start_quote = " <blockquote><i>";
  var author_end_quote = "</i></blockquote>";
  var author_name = "someone";
  
  if(location.href.match(/\/help\/forum/)) {
    permahrefstart='#reply';
    permahrefpos=5;
  }
  else if (location.href.match(/flickr.com\/photos\//)) {
    permahrefstart='#';
    permahrefpos=4; //6
  }
  else {
    permahrefstart='#comment';
    permahrefpos=5;
  }

  unsafeWindow.flickrquote = function(node) {

    var quoteBody = "";
    if (node.textContent.match(/ \[deleted\]/))
      author_name =	node.innerHTML.split('<h4>')[1].split(' [deleted]')[0] + ' [deleted]';
    else
      author_name = node.getElementsByTagName("a")[0].innerHTML.replace(/\n/g,"").normalise();
    
    if (author_name.match(/is a group administrator\"/))
      author_name=author_name.split("alt=\"")[1].split(" is a group administrator")[0];

    if (author_name.match(/is a group moderator\"/))
      author_name=author_name.split("alt=\"")[1].split(" is a group moderator")[0];

    if(flickr_quoter_backlinks) {
      permalink=node.getElementsByTagName('small')[0].getElementsByTagName('a')[0].getAttribute('href');
      if (permalink.split('/')[permahrefpos])
        permahref=permahrefstart + permalink.split('/')[permahrefpos];
      else
        permahref="#";//permahrefstart + permalink.split('/')[permahrefpos];
      author_link="<a href='" + permahref + "'>" + author_adjective + "</a>";  
    }
    else
      author_link=author_adjective;

    //check whether they have actually selected any text
    if (unsafeWindow.getSelection()=='') {
      quoteBody=(node.innerHTML.split('</h4>')[1].split('<small>')[0]).normalise().replace('<br>','','g').replace('<p>','','g').replace('</p>','','g');

      if (quoteBody+''=='')
        quoteBody=quoteBody.substring(0,quoteBody.indexOf('<small>'));
    } else {
        quoteBody = unsafeWindow.getSelection();
    }

    //check whether we are on the help forums or normal forums because the textareas name is different for each
    if (location.href.match(/forum/)) {
       taname="body";
    }else {
       taname="message";
    }
    tas=document.getElementsByTagName('textarea');
    if(typeof(tas[0])=='undefined')
      return;
    for(k=0;k<tas.length;k++)
      if(tas[k].getAttribute('name')==taname) {
        theta=tas[k];
        break;
      }
    if(typeof(theta)=='undefined')return;

    theta.value += authorname_start_marker + author_name + authorname_end_marker + author_link + author_start_quote + quoteBody + author_end_quote;
  }
   //add quote link to the bottom of each post in forum or group
   if (!location.href.match(/\/photos\//))
     dtds=getElementsByClassName('Said','td');
   else 
     dtds=getElementsByClassName('comment-content','div');
     
   for(i=0;i<dtds.length;i++) {
     var quote_link = document.createElement("a");
     quote_link.href = "javascript:;";
     quote_link.innerHTML = 'quote';
     //quote_link.addEventListener('mousedown', function() { flickrquote(this.parentNode);}, true); //alert(this.parentNode);
     quote_link.setAttribute("onClick","flickrquote(this.parentNode);return false");
     dtds[i].appendChild(quote_link);
   }
     
} // end if we are on a group or forum page (location.href !matches messages_write.gne)

// if we are on flickr mail reply page:
if (location.href.match(/messages\_write\.gne*/)) {

  insertNthChar = function(string,chr,nth) {
    var output = '';
    for (var i=0; i<string.length; i++) {
      if (i>0 && i%nth == 0)
        output += chr;
      output += string.charAt(i);
    }
    return output;
  }

  emailquote=function(){
    var wholequote=0;
    if (unsafeWindow.getSelection()=='') {
      quoteBody = getElementsByClassName("Reply",'td')[0].textContent.replace(/						quote$/,''); //.replace(/^[ \t]+/g,'')
      wholequote=1;
    } else {
      quoteBody = unsafeWindow.getSelection()+"";
      wholequote=0;
    }
    qbArr=quoteBody.split('\n');
    
    for(i=0;i<=qbArr.length-1;i++) {
      if(wholequote && (i==1))
	qbArr[i]='\n'+qbArr[i].replace(/^[ \t]+/,'')+'\n';
      else if (wholequote && (i==2))
        qbArr[i]='\n>'+qbArr[i].replace(/^[ \t]+/,'');
      else
         if (qbArr[i] && qbArr[i].replace(/^[ \t]+/,'').length)
           qbArr[i]='\n> '+insertNthChar(qbArr[i],'\n> ',75);
         else
           qbArr[i]='\n';
    }
    
    if (wholequote)
      document.getElementsByTagName('textarea')[0].value+=qbArr.join('').replace('\n','').replace('\n','');
    else
      document.getElementsByTagName('textarea')[0].value+=qbArr.join('').replace('\n','');
  }
  //add quote link at bottom of mail
  inpoint=getElementsByClassName ('Reply','td')[0];
  var quote_link = document.createElement("a");
  quote_link.href = "javascript:;";
  quote_link.innerHTML = 'quote';
  quote_link.addEventListener('mousedown', function() { emailquote();}, true);
  inpoint.appendChild(quote_link);
}


})();