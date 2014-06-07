// ==UserScript==
// @namespace     http://snowplow.org/martin/greasemonkey
// @name          LJ_TotalOblivion / killfile
// @description   Provides a killfile for certain blogs.  Covers livejournal, haloscan comments, most typepad blogs, most blogspot blogs, scienceblogs.com, and more as I add them.  Trolls can be killfiled with a single click.

// ==/UserScript==
//
// When this asks you to upgrade, DON'T! 
//
// NOTE This is NOT the original Killfile by Daniel Martin. 
// It is a cheap scab rip-off version which TOTALLY DESTROYS (well kinda)
// the comments (but not posts) of trolls, exes, family members, anyone 
// you decide you don't like and decide to hide by pressing OBLITERATE!
//
// Most of the code (99.8%) is actually Killfile though. 
// It's a "tribute", maaaan!
//
// Works OK on pcs and even seems to coexist with the original to some
// extent, apparently. 
//
//  Andy Wade 

// This is a script for greasemonkey 0.6, a plugin for the FireFox
// web browser. (http://greasemonkey.mozdev.org/)
// It likely will NOT work in earlier versions of
// greasemonkey, nor will it work in any other browser.
//
// The intention of this script is to hide the comments of commentors
// you, the reader, do not wish to hear from.  In that respect, it's
// like an old usenet killfile.  It does not affect what other
// visitors to the site will see, nor does it affect what you see
// before the page finishes loading (due to some limitations in
// Mozilla, you really don't want to rewrite HTML that's not entirely
// there yet).  This is not a tool meant for handling spam, only for
// an individual comment reader to avoid having to see comments they
// don't wish to see.
//
// Acknowledgements:
// Daniel Martin, who wrote most of the actual script and understands how 
// it works - I'm just a script kiddie really!

var ourVersion = "20070116.1";

var ourURL = 'http://snowplow.org/martin/greasemonkey/killfile.user.js';

function upgrade() {
  window.open(ourURL,"killfile");
}

GM_registerMenuCommand("Get latest killfile script", upgrade);

function checkVersion() {
  GM_xmlhttpRequest({
	method:"GET",
		url:"http://snowplow.org/martin/greasemonkey/versions.xml?killfile-"+ourVersion,
		headers:{
		"User-Agent":"Greasemonkey/0.6",
		  "Accept":"application/xml,text/xml",
		  },
		onload:
	  function(responseDetails) {
		var parser = new DOMParser();
        var dom = parser.parseFromString(responseDetails.responseText,
                                         "application/xml");
        var programNodes = dom.getElementsByTagName('program');
		if (!programNodes) {
		  GM_log("Can't find program: " + responseDetails.responseText);
		}
		for (var i=0; i < programNodes.length; i++) {
		  if (programNodes[i].getAttribute('id') == 'killfile') {
			var programNode = programNodes[i];
			var version = programNode.getElementsByTagName("version")[0];
			if (version.textContent > ourVersion)
			  {
				alert("There's a new version of killfile available.\n" +
					  "You are running version " + ourVersion + "\n" +
					  "The latest available version is " + version.textContent + "\n" +
					  "You can upgrade from the 'Tools->User script commands' menu");
			  }
			GM_setValue('lastVersionCheckTime',Math.round((new Date()).getTime()/1000));
		  }
		}
	  }
	});
}

function autoCheckVersion() {
  var nowsecs = Math.round((new Date()).getTime()/1000);
  var prevcheck = GM_getValue('lastVersionCheckTime',0);
  if (nowsecs > prevcheck + 60*60*24*3) {
	checkVersion();
  }
}

function showComment(spot) {
  spot.childNodes[0].style.display = 'block';
  spot.childNodes[1].style.display = 'none';
}
function hideComment(spot) {
  spot.childNodes[0].style.display = 'none';
  spot.childNodes[1].style.display = 'block';
}

function reviewContent() {
  var trolllist = GM_getValue("Trolllist", ';');
  var snap = document.evaluate("//div[@class='dtm_killfile_commentholder']", document, null,
                               XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
  for (var i=0; i < snap.snapshotLength; i++) {
    var spot = snap.snapshotItem(i);
    if (trolllist.indexOf(";" + spot.getAttribute("dtm_killfile_user") + ";") > -1) {
      hideComment(spot);
    } else {
      showComment(spot);
    }
  }
}

function addTroll(troll) {
  var trolllist = GM_getValue("Trolllist", ';');
  if (trolllist.indexOf(";" + troll + ";") < 0) {
    trolllist = trolllist + troll + ";";
    GM_setValue("Trolllist", trolllist);
  }
  reviewContent();
}

function delTroll(troll) {
  var trolllist = GM_getValue("Trolllist", ';');
  if (trolllist.indexOf(";" + troll + ";") > -1) {
    trolllist = trolllist.replace(";" + troll + ";",";");
    GM_setValue("Trolllist", trolllist);
  }
  reviewContent();
}

function handleClick(evt) {
  var holderdiv = this;
  var evtar = evt.target;
  var clazz = evtar.getAttribute('class');
  if (clazz == "dtm_killfile_show") {
    evt.preventDefault();
    showComment(holderdiv);
  } else if (clazz == "dtm_killfile_hide") {
    evt.preventDefault();
    hideComment(holderdiv);
  } else if (clazz == "dtm_killfile_kill") {
    evt.preventDefault();
    addTroll(holderdiv.getAttribute('dtm_killfile_user'));
  } else if (clazz == "dtm_killfile_unkill") {
    evt.preventDefault();
    delTroll(holderdiv.getAttribute('dtm_killfile_user'));
  }
}

// the basic scenario is essentially wordpress-like, so the
// wordpress scenarios below are pretty short
function basicScenario() {
  return {
  commenttopxpath: "//ol[@class='commentlist']/li",
      sigbit: ".//cite[1]",
      replaceXpath: "child::node()",
      mangleBefore: null,
      mangleAppend: null,
      tabXpath: null,
      precedingBit: '',
      followingBit: '',
      sigUserMatch: '$2',
      sigHrefMatch: '$1',
      get sigpat() {
        var s = ('^\\s*' + this.precedingBit + 
                 '\\s*(?:<a [^>]*?(?:\\bhref\\s*="([^>"]*)")?[^>]*>)?(\\S[^<]*[^\\s<]|[^\\s<])\\s*(?:</a>)?\\s*' + 
                 this.followingBit + '.*');
        return new RegExp(s,"");
      },
      foreachComment:
    function(loopBody) {
      if (!loopBody) {return null;}
      var snap = document.evaluate(this.commenttopxpath,
                                   document, null, 
                                   XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
      for (var i=0; i < snap.snapshotLength; i++) {
        loopBody(snap.snapshotItem(i));
      }
    },
      getUserspec:
    function(commentNode) {
      if (!commentNode) {return null;}
      var sigsnap = document.evaluate(this.sigbit, commentNode, null,
                                      XPathResult.ANY_UNORDERED_NODE_TYPE, null );
      var nd = sigsnap.singleNodeValue;
      if (nd == null) {return null;}
      var sigHTML = nd.innerHTML;
      if (!sigHTML) {sigHTML = nd.textContent;}
      else {sigHTML = sigHTML.replace(/\&nbsp;/g, ' ');}
      sigHTML.replace(/\s+/g, ' ');
      // in case people match on attribute tags
      var sigre = this.sigpat;
      if (! sigre.test(sigHTML)) {
        progresslog("Didn't match: html " + sigHTML.toSource() + " and regexp " + sigre.toSource());
        return null;
      }
      var user = sigHTML.replace(sigre,this.sigUserMatch);
      var href = sigHTML.replace(sigre,this.sigHrefMatch);
      return [user, escape(user) + "!" + escape(href)];
    },
      divHTML:
    '<div class="dtm_killfile_shown"></div>' +
      '<div class="dtm_killfile_hidden" style="display:none"><I></I>&nbsp;' +
      ' ' +
      '&#8203;' +
      '</p></div>',
      divHTMLuser:
    function(user, userspec) {
      return this.divHTML.replace(/__SHORTUSER__/g,user).replace(/__USER__/g,userspec);
    },
      getEmptyHolder:
    function(commentNode, user, userspec) {
      var ddiv = document.createElement('div');
      ddiv.innerHTML = this.divHTMLuser(user, userspec);
      if (this.tabXpath) {
        var tabNode = document.evaluate(this.tabXpath, commentNode, null,
                                        XPathResult.ANY_UNORDERED_NODE_TYPE, null);
        tabNode = tabNode.singleNodeValue;
        if (tabNode) {
          var tabtarget = ddiv.childNodes[1].childNodes[0];
          tabtarget.insertBefore(tabNode.cloneNode(true),tabtarget.firstChild);
        }
      }
      ddiv.setAttribute("class", "dtm_killfile_commentholder");
      ddiv.setAttribute("dtm_killfile_user", userspec);
      return ddiv;
    },
      spanHTML: '[<a href="tag:killfile%20user" class="dtm_killfile_kill">OBLITERATE!</a>]' +
      '&#8203;[<a href="tag:hide%20comment" class="dtm_killfile_hide">hide&nbsp;comment</a>]',
      spanHTMLuser:
    function(user, userspec) {
      return this.spanHTML.replace(/__SHORTUSER__/g,user).replace(/__USER__/g,userspec);
    },
      mangleCommentContent:
    function(contentNode, user, userspec) {
      if (!contentNode) {return null;}
      var snap3 = null;
      var useBefore = true;
      if (this.mangleBefore) {
        snap3 = document.evaluate(this.mangleBefore, contentNode, null,
                                  XPathResult.ANY_UNORDERED_NODE_TYPE, null);
      } else if (this.mangleAppend) {
        snap3 = document.evaluate(this.mangleAppend, contentNode, null,
                                  XPathResult.ANY_UNORDERED_NODE_TYPE, null);
        useBefore = false;
      }
      if (snap3 && snap3.singleNodeValue) {
        var target = snap3.singleNodeValue;
        var cspan = document.createElement('span');
        cspan.innerHTML = this.spanHTMLuser(user, userspec);
        if (useBefore) {
          target.parentNode.insertBefore(cspan,target);
        } else {
          target.appendChild(cspan);
        }
        return contentNode;
      }
      progresslog("Can't find insertion point for kill button");
      progresslog(contentNode);
      progresslog(contentNode.childNodes[0]);
      return null;
    },
      insertCommentHolder:
    function(commentNode, holderDiv) {
      if (! (commentNode && holderDiv)) {return null;}
      var snap2 = document.evaluate(this.replaceXpath, commentNode, null,
                                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
      if (snap2.snapshotLength == 0) {return null;}
      snap2.snapshotItem(0).parentNode.insertBefore(holderDiv,snap2.snapshotItem(0));
      var contentNode = holderDiv.firstChild;
      for (var j=0; j < snap2.snapshotLength; j++) {
        var removedNode = snap2.snapshotItem(j).parentNode.removeChild(snap2.snapshotItem(j));
        contentNode.appendChild(removedNode);
      }
      holderDiv.addEventListener('click', handleClick, false);
      return contentNode;
    },
      handleComment:
    function(commentNode) {
      progresslog("Comment found " + location.href);
      var us = this.getUserspec(commentNode);
      if (! us) {progresslog("Can't find user");return null;}
      var ddiv = this.getEmptyHolder(commentNode, us[0], us[1]);
      if (! ddiv) {progresslog("Can't get empty holder");return null;}
      var contentdiv = this.insertCommentHolder(commentNode, ddiv);
      if (! contentdiv) {progresslog("Can't insert comment holder");return null;}
      this.mangleCommentContent(contentdiv, us[0], us[1]);
    },
      manglePage:
    function () {
      var me = this;
      this.foreachComment(function (c) {me.handleComment(c)});
    }
  };
}

var kf_debug = GM_getValue("debug",0);
function progresslog(logstr) {
  if (kf_debug) {GM_log(logstr);}
}

function wordpressScenario() {
  return {
    get mangleBefore() {return this.sigbit + '/following::*'},
      __proto__:basicScenario()
      };
}

function riotactScenario() {
  return {
    get mangleAppend() {return this.sigbit + '/..'},
    precedingBit: 'Comment by ',
    followingBit: ' [-\u2014] ',
    commenttopxpath: "//ol[@id='commentlist']/li",
    __proto__:basicScenario()
  };
}

function pandagonScenario() {
  return {
  sigbit: "span[1]",
      __proto__:wordpressScenario()
      };
}

function livejournalScenario() {
  return {
  commenttopxpath: "//table[starts-with(@id,'ljcmt') and .//span[@class='ljuser']]",
      sigbit: "descendant::span[@class='ljuser'][1]",
      replaceXpath: ".",
      get mangleBefore() {return this.sigbit + "/following::*[1]";},
      tabXpath: 'descendant::img[1]',
      precedingBit: '(?:.*?</a>)?',
      __proto__:basicScenario()
      };
}

function livejournalScenario2() {
  return {
  commenttopxpath: "//div[@class='comment_wrapper']",
      sigbit: ".//div[@class='comment_postedby']/*[1]",
      tabXpath: '',
      __proto__:livejournalScenario()
      };
}

function livejournalScenario3() {
  return {
  commenttopxpath: "//div[starts-with(@id,'ljcmt') and child::div[@class='entry']]",
      replaceXpath: "./h3|./div[@class='entry']|./div[@class='talklinks']",
      tabXpath: '',
      __proto__:livejournalScenario()
      };
}

function livejournalScenario4() {
  return {
  commenttopxpath: "//div[starts-with(@id,'ljcmt')]",
      replaceXpath: "child::node()",
      tabXpath: '',
      __proto__:livejournalScenario()
      };
}

function livejournalScenario5() {
  return {
    commenttopxpath: "//td[@id='content']//table[@class='heading_bar']/following-sibling::div",
    get mangleAppend() {return this.sigbit + "/parent::node()";},
    mangleBefore: null,
    __proto__:livejournalScenario4()
  };
}
function livejournalScenario6() {
  return {
    commenttopxpath: "//table[@class='entrybox'][2]/tbody/tr/td/table/tbody/tr/td/div",
    __proto__:livejournalScenario5()
  };
}

function ljfriendsScenario() {
  // If you want this, see the comments in "scenariolist" below
  return {
  commenttopxpath: "//table[not(ancestor::table) and " + 
      "(preceding::a[starts-with(@href,'http://www.livejournal.com/userinfo.bml?')]) " +
      "and (descendant::a[substring-after(@href,'.livejournal.com/')=''])]",
      sigbit: "descendant::a[contains(@href,'livejournal.com/') and " +
      "substring-after(@href,'livejournal.com/')=''][1]/@href",
      replaceXpath: ".",
      sigpat: /(http:\/\/(\w+)\..*)/,
      sigUserMatch: '$2',
      sigHrefMatch: '$1',
      mangleAppend: "descendant::a[contains(@href,'livejournal.com/') and " +
      "substring-after(@href,'livejournal.com/')=''][1]/..",
      spanHTML: '<br>[<a href="tag:killfile%20user" class="dtm_killfile_kill">kill</a>]' +
      '&#8203;[<a href="tag:hide%20comment" class="dtm_killfile_hide">hide&nbsp;comment</a>]',
      __proto__:basicScenario()
      };
}

function pandasThumbScenario() {
  return {
  commenttopxpath: "//div[@id='extras']/div[@class='comments-body']",
      sigbit: "p[@class='comments-post']",
      precedingBit: 'Posted by ',
      followingBit: ' on \\w+ *\\d+, +\\d+ +\\d+:\\d+ +\\w+\\s*<a [^>]*>\\(e\\)</a>[^<]*$',
      mangleAppend: "p[@class='comments-post']",
      __proto__:basicScenario()
  };
}

function blogspotDLScenario() {
  return {
    commenttopxpath: "//dl/dt[@class='comment-data']",
      sigbit: ".",
      precedingBit: '<a [^>]*></a>[^<]*<a [^>]*>[^<]*</a>,',
      followingBit: '\\b\\w*\\W*',
      mangleAppend: "dt",
      replaceXpath: ".|following-sibling::dd[1]",
      __proto__:basicScenario()
  };
}

function blogspotDivScenario() {
  return {
  commenttopxpath: "//div[@class='blogComments']/div[@class='blogComment']",
      sigbit: "div[@class='byline']",
      precedingBit: '<a[^>]*>#</a> posted by (?:<span[^>]*>)?',
      followingBit: '(?:</span>)? ?: ',
      mangleAppend: "div[@class='byline']",
      __proto__:basicScenario()
  };
}

function pharyngulaScenario() {
  return {
  commenttopxpath: "//div[@id='comments']//div[@class='commentContent']",
      sigbit: "p[@class='commentFooter']",
      precedingBit: 'Posted by:',
      followingBit: '(?:<a [^>]*><img [^>]*></a>)?\\s*\\|[^|]*$',
      mangleAppend: "p[@class='commentFooter']",
      __proto__:basicScenario()
  };
}

function typepadScenario() {
  return {
  commenttopxpath: "//div[@class='comments-content']/div[@class='comment']",
      sigbit: "p[@class='comment-footer']",
      mangleAppend: "p[@class='comment-footer']",
      __proto__:pharyngulaScenario()
  };
}

function haloscanScenario() {
    return {
    commenttopxpath: "//table[@class='MainTable']//td[@class='MessageCell']",
        sigbit: "descendant::span[@class='byline']",
        mangleAppend: "descendant::span[@class='byline']",
        mangleBefore: null,
        replaceXpath: "child::node()[position() > 2 and position() < last()]",
        sigUserMatch: '$1',
        sigHrefMatch: '$2',
        sigpat: /^\s*(\S[^|]*.*?\S|\S)\s*\|\s*(?:<a href="([^\"]*)"[^>]*>Homepage<\/a>\s*\|)?[^|]*\|[^|]*$/,
        __proto__:basicScenario()
  };
}

function giveemhellharryScenario1() {
  return {
  commenttopxpath: "//h3[@id='comment']/following-sibling::ol[1]/li",
      sigbit: "small[last()]",
      followingBit: '\\s\\w+\\s+\\d+,[^,]*<a',
      mangleAppend: "small[last()]",
      precedingBit: '[^<]*',
      __proto__:basicScenario()
  }
}

function giveemhellharryScenario2() {
  return {
  commenttopxpath: "//div[@class='comments']//div[@class='comment']",
      sigbit: "div[@class='commentauthor']",
      replaceXpath: "div[@class='commenttitle' or @class='commenttext' or @class='commentauthor']",
      mangleAppend: "div[@class='commentauthor']",
      precedingBit: ' *[Bb][Yy] *',
      __proto__:basicScenario()
  }
}

function truthoutScenario() {
  return {
  commenttopxpath: "//div[@class='commenthead']",
      replaceXpath: ".|following-sibling::div[1]",
      sigbit: "following-sibling::div[1]//a[starts-with(@href,'/blog/user/')][last()]",
      mangleBefore: ".//br[last()]",
      __proto__:basicScenario()
  };
}

function athleticsNationScenario() {
  return {
      commenttopxpath: "//a[@name='commenttop'][1]/following-sibling::form//table",
      sigbit: "./tbody/tr[last()]//a[1]",
      replaceXpath: ".",
      mangleBefore: "descendant::br[last()]",
      __proto__:basicScenario()
      };
}

var scenariolist = {
  escapepod:[{scenario:wordpressScenario,hrefpat:"^[^/]*//[^/]*/[0-9]"}],
  pandagon:[{scenario:pandagonScenario,hrefpat:"^[^/]*//[^/]*/[0-9]"}],
  feministe:[{scenario:wordpressScenario,hrefpat:"^[^/]*//[^/]*/blog/archives/"}],
  amptoons:[{scenario:wordpressScenario,hrefpat:"^[^/]*//[^/]*/blog/archives/"}],
  'the-riotact':[{scenario:riotactScenario, // wordpress 1.5 ?
   xpath:"//ol[@id='commentlist']/li[1]//cite"}],
  wordpress:[
  {scenario:wordpressScenario, // wordpress 1.5 ?
   xpath:"//ol[@class='commentlist']/li[1]/descendant::*[self::cite or self::span][1][self::cite]"},
  {scenario:pandagonScenario,  // wordpress 2 ?
   xpath:"//ol[@class='commentlist']/li[1]/span[1][@class='commentauthor']"},
  ],
  blogspot:[
  {scenario:blogspotDLScenario,
   xpath:"//dl[@id='comments-block']/dt[@class='comment-data']"},
  {scenario:blogspotDivScenario,
    xpath:"//div[@class='blogComments']/div[@class='blogComment']"}
  ],
  livejournal:[
  {scenario:livejournalScenario2,
   hrefpat:"^[^/]*//((syndicated|community)\\.[^/]*/)?[^/]*/[0-9]",
   xpath:"//div[@class='comment_wrapper']",
  },
  {scenario:livejournalScenario3,
   xpath: "//div[@class='box' and starts-with(@id,'ljcmt')]",
   hrefpat:"^[^/]*//((syndicated|community)\\.[^/]*/)?[^/]*/[0-9]",
  },
  {scenario:livejournalScenario4,
   xpath: "//div[starts-with(@id,'ljcmt') and descendant::span[@class='ljuser']]",
   hrefpat:"^[^/]*//((syndicated|community)\\.[^/]*/)?[^/]*/[0-9]",
  },
  {scenario:livejournalScenario5,
   xpath: "//td[@id='content']//table[@class='heading_bar']/following-sibling::div",
   hrefpat:"^[^/]*//((syndicated|community)\\.[^/]*/)?[^/]*/[0-9]",
  },
  {scenario:livejournalScenario6,
   xpath: "//table[@class='entrybox'][2]/tbody/tr/td/table/tbody/tr/td/div",
   hrefpat:"^[^/]*//((syndicated|community)\\.[^/]*/)?[^/]*/[0-9]",
  },
  {scenario:livejournalScenario,
   hrefpat:"^[^/]*//((syndicated|community)\\.[^/]*/)?[^/]*/[0-9]",
  },
  // Commented out because I think it's ugly.  Your taste may vary, so you can
  // uncomment this next line to kill/unkill people on your lj friends list.
  // Intended primarily for communities you like mostly, but one or two
  // posters get on your nerves.
  // {scenario:ljfriendsScenario,hrefpat:"^[^/]*//[^/]*/friends"},
  ],
  journalfen:   // Basically, old livejournal code
  [
  {scenario:livejournalScenario2,
   hrefpat:".*/[0-9]*\\.html",
   xpath:"//div[@class='comment_wrapper']",
  },
  {scenario:livejournalScenario3,
   xpath: "//div[@class='box' and starts-with(@id,'ljcmt')]",
   hrefpat:".*/[0-9]*\\.html",
  },
  {scenario:livejournalScenario4,
   xpath: "//div[starts-with(@id,'ljcmt') and descendant::span[@class='ljuser']]",
   hrefpat:".*/[0-9]*\\.html",
  },
  {scenario:livejournalScenario5,
   xpath: "//td[@id='content']//table[@class='heading_bar']/following-sibling::div",
   hrefpat:".*/[0-9]*\\.html",
  },
  {scenario:livejournalScenario6,
   xpath: "//table[@class='entrybox'][2]/tbody/tr/td/table/tbody/tr/td/div",
   hrefpat:".*/[0-9]*\\.html",
  },
  {scenario:livejournalScenario,
   hrefpat:".*/[0-9]*\\.html",
  },
  // Commented out because I think it's ugly.  Your taste may vary, so you can
  // uncomment this next line to kill/unkill people on your lj friends list.
  // Intended primarily for communities you like mostly, but one or two
  // posters get on your nerves.
  // {scenario:ljfriendsScenario,hrefpat:".*/friends\\b"},
  ],
  scienceblogs:
  [
  {scenario:pharyngulaScenario,hrefpat:"^[^/]*//[^/]*/\\w+/[0-9]"},
  // Do all blogs at scienceblogs.com fit this format?
  ],
  feministing:
  [
  {scenario:typepadScenario,hrefpat:"^[^/]*//[^/]*/archives/[0-9]"}
  ],
  typepad:
  [
  {scenario:typepadScenario,hrefpat:"^[^/]*//[^/]*/\\w+/[0-9]",
   xpath:"//div[@class='comments-content'][1]/div[@class='comment'][1]/p[@class='comment-footer']"},
  // There are some other typepad pages with a VERY BAD comment structure
  // (no surrounding element to grab ahold of, so that you have to
  // divide up the comment stream where-ever you see P's of a certain class)
  // Not that I won't get to them eventually, but it's going to take some
  // serious xpath voodoo
  ],
  pandasthumb:[
  {scenario:pandasThumbScenario,hrefpat:"^[^/]*//[^/]*/archives/"}
  ],
  haloscan:[
  {scenario:haloscanScenario,
   xpath:"//body/table[@class='MainTable']//td[@class='MessageCell']"}
  ],
  giveemhellharry:[
  {scenario:giveemhellharryScenario1, hrefpat:"^[^/]*//[^/]*/blog/"},
  {scenario:giveemhellharryScenario2, hrefpat:"^[^/]*//[^/]*/page/community/",
   xpath: "//div[@class='comments']"}
  ],
  truthout:[
  {scenario:truthoutScenario,
   hrefpat:"^https?://forum.truthout.org/blog/story/"}
  ],
  athleticsnation:[
  {scenario:athleticsNationScenario,
  xpath:"//a[@name='commenttop']"
  }
  ],
};

// sbNation.com is really a family of related blogs
var sbNation =
   ("beyondtheboxscore minorleagueball halosheaven lookoutlanding "+
    "lonestarball bluebirdbanter draysbay camdenchat overthemonster pinstripealley letsgotribe " +
    "royalsreview blessyouboys twinkietown southsidesox azsnakepit truebluela mccoveychronicles " +
    "gaslampball purplerow talkingchop fishstripes amazinavenue federalbaseball thegoodphight " +
    "crawfishboxes brewcrewball vivaelbirdos bleedcubbieblue bucsdugout redreporter blogabull " +
    "clipsnation sactownroyalty mavsmoneyball poundingtherock blazersedge goldenstateofmind badlefthook " +
    "sundaymorningqb cornnation burntorangenation crimsonandcreammachine dawgsports rollbamaroll " +
    "swampball andthevalleyshook rockytoptalk aseaofblue conquestchronicles bruinsnation udubdish " +
    "buildingthedam aroundtheoval blackshoediaries schembechlerhall blacksburgbeacon tomahawknation " +
    "carolinamarch ramblinracket provopride blocku rakesofmallow podiumcafe faketeams bloggingtheboys " +
    "bleedinggreennation hogshaven windycitygridiron prideofdetroit dailynorseman fieldgulls patspulpit " +
    "cincyjungle dawgsbynature behindthesteelcurtain stampedeblue bigcatcountry musiccitymiracles " +
    "arrowheadpride milehighreport globalfutbol").split(" ");
for (c in sbNation) {
  scenariolist[sbNation[c]] = scenariolist['athleticsnation'];
}

function findScenario() {
  var domain = location.host.replace(/^(?:.*[.])?((?!www\.)[a-zA-Z0-9-]+)(?:\.\w{3}|(?:\.\w{2})+)$/,'$1');
  domain = domain.toLowerCase();
  var matchl = scenariolist[domain];
  var re;
  if (matchl) {
    var matchind;
    for (matchind in matchl) {
      var match = matchl[matchind];
      var found = true;
      if (found && match.hrefpat) {
        re = new RegExp(match.hrefpat);
        found = re.test(location.href);
      }
      if (found && match.xpath) {
        GM_log(match.xpath);
        found = document.evaluate(match.xpath, document, null, XPathResult.BOOLEAN_TYPE,null);
        if (found) {found = found.booleanValue;}
      }
      if (found) {
        return match.scenario();
      }
    }
  }
  return null;
}
// main.  i.e. "onload"
var model = findScenario();
if (model) {
  window.addEventListener("load", reviewContent, false);
  window.addEventListener("load", autoCheckVersion, false);
  model.manglePage();
}


/// Local Variables: ///
/// mode: C++ ///
/// tab-width: 4 ///
/// indent-tabs-mode: nil ///
/// c-basic-offset: 2 ///
/// End: ///
