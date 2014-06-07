// ==UserScript==
// @name        LJ Filter
// @description Filters out user entries based on tags/keywords (present or absent).
// @namespace   http://the-xtina.livejournal.com/
// @include     http://*.livejournal.com/friends
// @include     http://*.livejournal.com/friends/*
// @include     http://*.livejournal.com/friends?*
// ==/UserScript==

/*
The original was created by lj:slobin, then updated by lj:dimrub.  I've updated
it here because I wanted this to work for all styles (or as many as I can get
away with), and I'm impatient.
*/

var DEBUG = false;

var DOCS = "# To only view posts with certain tags:\n"
         + "#   username: +tag1 +tag2\n"
         + "#\n"
         + "# To never see posts with certain tags:\n"
         + "#   username: -tag1 -tag2\n"
         + "#\n"
         + "# To include spaces in tags:\n"
         + "#   username: -tag~with~spaces\n"
         + "#\n"
         + "# To filter by keywords rather than tags,\n" 
         + "# use -- and ++ instead of - and +.\n";

var ITER = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
var SNAP = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
var NODE = XPathResult.FIRST_ORDERED_NODE_TYPE;

var filter, errors, editWindow;

function debug(message)
{
  if (DEBUG) GM_log(message);
}

/*
'query' is a valid Xpath expression.
'root' is the node relative to which the query is performed (usually document).
'type' is one of the following:
- ITER = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
- SNAP = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
- NODE = XPathResult.FIRST_ORDERED_NODE_TYPE;

This returns 'undefined' if the query has failed.
*/

function xpath(query, root, type)
{
  var res;
  try {
    res = document.evaluate(query, root, null, type, null);
  } catch (e) {
    debug("Failed to run \"" + query + "\", got exception <" + e.name + ">, error was: <" + e.message + ">");
  } finally {
    return res;
  }
}

function setRules(rules)
{
  GM_setValue("rules", escape(rules));
}

function getRules(defvalue)
{
  return unescape(GM_getValue("rules", defvalue));
}

function parseRules(rules)
{
  debug("parseRules");
  filter = new Object();
  errors = new Array();
  rules = rules.split("\n");
  for (var i = 0; i < rules.length; i++) {
    var line = rules[i];
    if (!line.length || line[0] == '#') continue;

    var pair = line.split(/:/, 2);
    var user = pair[0];
    var tags = pair[1];
    if (tags == undefined) {
      errors.push({line: i+1, message: "Line must be in this format: <username>: <list of tags/keywords>"});
      return;
    }
    filter[user] = new Object();
    var userFilter = filter[user];
    userFilter.has_positive = false;
    userFilter.positive = new Object();
    userFilter.negative = new Object();
    userFilter.positive_kw = new Object();
    userFilter.negative_kw = new Object();
    tags = tags.split(/ +/);
    for (var j = 0; j < tags.length; j++) {
      var tag = tags[j];
      tag = tag.replace(/~/g, " ");
      if (tag.length) {
        switch (tag[0]) {
        case "+":
          if (tag[1] == '+') {
            userFilter.has_positive = true;
            userFilter.positive_kw[tag.slice(2)] = true;
          } else {
            userFilter.has_positive = true;
            userFilter.positive[tag.slice(1)] = true;
          }
          break;
        case "-":
          if (tag[1] == '-') {
            userFilter.negative_kw[tag.slice(2)] = true;
          } else {
            userFilter.negative[tag.slice(1)] = true;
          }
          break;
        default:
          errors.push({line: i+1, message: "Unrecognized symbol at the beginning of a tag/keyword."});
          break;
        }
      }
    }
  }
}

function applyFilter()
{
  debug("applyFilter");

  var parents = Array();
  var elements = Array();
  var recognized = false;

  function remember(parent, element)
  {
    parents.push(parent);
    elements.push(element);
  }

/*
The description of a style consists of the following fields:
- 'name': Name of the style.
- 'entryXpath': The XPath to the entry's node (the uppermost node that the
whole single entry is contained within).
- 'userXpath': The XPath to the node containing the username, relative to the
entry's XPath above.
- 'tagXpath': The XPath to the node containing the tags for the entry, relative
to the entry's XPath above.
- 'textXpath': The XPath to the entry's text, relative to the entry's XPath
above.
- 'matchXpath': The XPath that, if returns true, uniquely identifies this
style.
- 'removeFunction': A function that given an entry node, removes it and any
other node pertaining to the entry.

This is a full list of the basic journal styles.  Items with slashes are
similar enough to not have to separate them.  The key:

- 'u': It works for a username only.
- '*': It works for both a user and a community, woo!
- 'x': I can't get it to work and I don't know *why*.  Nrr.

You can see the styles here:  http://www.livejournal.com/customize/

* 3 Column
* A Novel Conundrum
x A Sturdy Gesture [can't get the user]
* Bloggish
u Classic
* Clean and Simple
x Component
u Cuteness Attack
* Digital Multiplex (OSWD)
* Disjointed
* Expressive / Expressive Winter / Mixit
* Flexible Squares
* Generator
* Gradient Strip
u Haven [users in a post have span:ljuser; post text/header foo is together]
* Magazine
* Nebula
* Notepad / Punquin Elegant
u Opal (Libra OSWD)
* Dear Diary... / Quite Lickable
* Refried Paper
* Smooth Sailing
* Tabular Indent
u The Boxer [aren't we in the future yet?? containers!!]
u Tranquility II
x Unearthed
x Variable Flow

Currently, I'm testing them one at a time.  There may be conflicts with others,
frex if the content holder for one is the same as the other.  Let me know and
I'll fixinate it.

Testing involves checking against a user and a community, tags and text.
*/

  var styles = [

    // 3 Columns
    {
      name: '3 Columns',
      entryXpath: '//div[@class="comment_wrapper"]',
      userXpath: './/div[@class="comment_postedby"]//a/b/text()',
      tagXpath: './/div[@class="ljtags"]//text()',
      textXpath: './/div[@class="entrytext"]',
      removeFunction: function(entry) {
        par = entry.parentNode;
        remember(par, entry.previousSibling.previousSibling);
        remember(par, entry.previousSibling);
        remember(par, entry);
        remember(par, entry.nextSibling);
        remember(par, entry.nextSibling.nextSibling);
      }
    },

    // A Novel Conundrum
    {
      name: 'A Novel Conundrum',
      entryXpath: '//div[@class="bodybox"]',
      userXpath: './/div[@class="author"]/a[last()]/text()',
      tagXpath: './/div[@class="ljtags"]//text()',
      textXpath: './/div[@class="body"]',
      removeFunction: function(entry) {
        par = entry.parentNode[3];
        remember(par, entry);
      }
    },

/*
    // A Sturdy Gesture
    {
      name: 'A Sturdy Gesture',
      entryXpath: "//div[@class='box']",
      userXpath: ".//span[@class='ljuser']//text()",
      tagXpath: ".//div[@class='ljtags']/a[@rel=\'tag\']/text()",
      textXpath: ".//div[@class='entry']",
      removeFunction: function(entry) {
        par = entry.parentNode;
        remember(par, entry);
      }
    },
*/

    // Bloggish
    {
      name: 'Bloggish',
      entryXpath: "//div[@class='alpha-inner']/div[@class='entry']",
      userXpath: ".//p[@class='poster']/span[last()]//b/text()",
      tagXpath: ".//div[@class='ljtags']/a[@rel='tag']/text()",
      textXpath: ".//div[@class='entry-content']",
      removeFunction: function(entry) {
        par = entry.parentNode;
        remember(par, entry);
        remember(par, entry.nextSibling);
      }
    },

/*
    // Classic
    {
      name: 'Classic',
      entryXpath: "//span[@class='view_links2']/table",
      userXpath: ".//strong/a/text()",
      tagXpath: ".//p/a[@rel='tag']//text()",
      textXpath: ".//td[@class='entry']",
      removeFunction: function(entry) {
        par = entry.parentNode[3];
        remember(par, entry);
      }
    },
*/

    // Clean and Simple
    {
      name: 'Clean and Simple',
      entryXpath: "//div[@id='entries']/div[@class='day']/div[@class='entry']",
      userXpath: ".//span[@class='entryheading']/a/text()",
      tagXpath: ".//div[@class='entrytext']/a[@rel='tag']/text()",
      textXpath: ".//div[@class='entrytext']",
      removeFunction: function(entry) {
        par = entry.parentNode;
        remember(par, entry);
      }
    },

/*
    // Component
    {
      name: 'Component',
      entryXpath: "//table[tbody/tr/td/@class='entryHolderBg']",
      userXpath: ".//span[@class='ljuser']/a/b/text()",
      tagXpath: ".//p/a[@rel='tag']/text()",
      textXpath: ".//td[@class='entryHolderBg'][3]//td[@class='entry']/div[not(contains(@class, 'entry'))]", //div",
      removeFunction: function(entry) {
        par = entry.parentNode;
        remember(par, entry);
      }
    },
*/

    // Cuteness Attack
// There's a[@class=user], then there's a[@class=comm].  Hm.
    {
      name: "Cuteness Attack",
      entryXpath: "//div[@id='entries-content']/div[@class='ind-entry']",
      userXpath: ".//a[@class='user']/text()",
      tagXpath: ".//div[@class='ljtags']//text()",
      textXpath: ".//div[@class='entry-item']",
      removeFunction: function(entry) {
        par = entry.parentNode;
        remember(par, entry);
      }
    },

/*    // Dear Diary... / Quite Lickable
    {
      name: 'Dear Diary... or Quite Lickable',
      entryXpath: "//div[@class='day']/div[@class='entry']",
      userXpath: ".//div[@class='entryposter']/span[last()]//b/text()",
      tagXpath: ".//div[@class='ljtags']/a[@rel='tag']/text()",
      textXpath: ".//div[@class='entrycontent']",
      removeFunction: function(entry) {
        par = entry.parentNode;
        remember(par, entry);
      }
    },
*/

    // Digital Multiplex (OSWD)
    {
      name: 'Digital Multiplex (OSWD)',
      entryXpath: "//table[@class='full_entry']",
      userXpath: ".//table[@class='full_entry_userpic']/tbody/tr/td/span[last()]//b/text()",
      tagXpath: ".//div[@class='ljtags']/a[@rel='tag']/text()",
      textXpath: ".//tbody/tr/td[2]",
      removeFunction: function(entry) {
        par = entry.parentNode;
        remember(par, entry.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling);
        remember(par, entry.previousSibling.previousSibling.previousSibling.previousSibling);
        remember(par, entry.previousSibling.previousSibling.previousSibling);
        remember(par, entry.previousSibling.previousSibling);
        remember(par, entry.previousSibling);
        remember(par, entry);
      }
    },

    // Disjointed
    {
      name: 'Disjointed',
      entryXpath: "//table[@class='entries']",
      userXpath: ".//td[@class='altposter']/a/text()",
      tagXpath: ".//table[@class='currbox']/tbody/tr/td/div[2]/a/text()",
      textXpath: ".//td[@class='entrybox']",
      removeFunction: function(entry) {
        par = entry.parentNode;
        remember(par, entry);
        remember(par, entry.nextSibling);
      }
    },

    // Expressive / Expressive Winter / Mixit
    {
      name: 'Expressive, Expressive Winter, or Mixit',
      entryXpath: "//div[@class='post-asset asset']",
      userXpath: ".//div[@class='user-icon']/span[last()]/span[@class='ljuser']//b/text()",
      tagXpath: ".//ul[@class='asset-tags-list']//a[contains(@href, 'tag')]/text()",
      textXpath: ".//div[@class='asset-content']",
      removeFunction: function(entry) {
        par = entry.parentNode;
        remember(par, entry);
        remember(par, entry.nextSibling);
      }
    },

    // Flexible Squares - checked (sciuro)
    {
      name: 'Flexible Squares',
      entryXpath: "//div[@class='subcontent']",
      userXpath: ".//div[@class='userpicfriends']//a[last()]/font/text()",
      tagXpath: ".//a[@rel='tag']/text()",
      textXpath: ".//div[@class='entry_text']",
      removeFunction: function(entry) {
        par = entry.parentNode;
        remember(par, entry);
        remember(par, entry.nextSibling);
        remember(par, entry.nextSibling.nextSibling);
      }
    },

    // Generator
    {
      name: 'Generator',
      entryXpath: '//table[@class="entrybox"]',
      userXpath: './/a[@class="index"]//text()',
      tagXpath: './/a[@rel="tag"]/text()',
      textXpath: './/tbody/tr/td/table/tbody/tr[2]',
      removeFunction: function(entry) {
        par = entry.parentNode;
        remember(par, entry);
        remember(par, entry.nextSibling);
      }
    },

    // Gradient Strip
    {
      name: 'Gradient Strip',
      entryXpath: '//div[@class="contentholder"]',
      userXpath: './/span[last()][@class="ljuser"]//b/text()',
      tagXpath: './/a[@class="tag"]/text()',
      textXpath: './/div[@class="contentbody"]',
      removeFunction: function(entry) {
        par = entry.parentNode;
        remember(par, entry);
      }
    },

    // Haven
    {
      name: 'Haven',
      entryXpath: "//div[@class='content']/div[@class='entry']",
      userXpath: ".//span[@class='ljuser']//b/text()",
      tagXpath: ".//div[@class='ljtags']/a[@rel='tag']/text()",
      textXpath: ".//div[@class='text']",
      removeFunction: function(entry) {
        par = entry.parentNode;
        remember(par, entry.previousSibling.previousSibling);
        remember(par, entry.previousSibling);
        remember(par, entry);
        remember(par, entry.nextSibling);
      }
    },

    // Magazine
    {
      name: 'Magazine',
      entryXpath: "//div[@class='H3Holder']",
      userXpath: ".//div[@class='Picture']/div/a/small/text()",
      tagXpath: ".//div[@class='ljtags']/a[@rel='tag']/text()",
      textXpath: ".//p",
      removeFunction: function(entry) {
        par = entry.parentNode;
        remember(par, entry);
      }
    },

    // Nebula
    {
      name: 'Nebula',
      entryXpath: "//div[@id='content']/div[@class='entry']",
      userXpath: ".//span[@class='subHeading']/span[last()]//b/text()",
      tagXpath: ".//span[@class='ljtags']/a[@rel='tag']/text()",
      textXpath: ".//div[@class='entryText']",
      removeFunction: function(entry) {
        par = entry.parentNode;
        remember(par, entry.previousSibling.previousSibling);
        remember(par, entry.previousSibling);
        remember(par, entry);
        remember(par, entry.nextSibling);
      }
    },

    // Notepad / Punquin Elegant
    {
      name: 'Notepad or Punquin Elegant',
      entryXpath: "//table[@class='entry']",
      userXpath: ".//a[1]/text()",
      tagXpath: ".//div[@class='ljtags']/a[@rel='tag']/text()",
      textXpath: ".//tbody/tr/td[2]",
      removeFunction: function(entry) {
        par = entry.parentNode;
        remember(par, entry.nextSibling);
        remember(par, entry);
      }
    },

/*
    // Opal (Libra OSWD)
    {
      name: 'Opal (Libra OSWD)',
      entryXpath: "//div[@class='entries']/div[@class='entry']",
      userXpath: ".//a[@class='friendname']/text()",
      tagXpath: ".//div[@class='ljtags']/a[@rel='tag']/text()",
      textXpath: ".//div[@class='entrytext']",
      removeFunction: function(entry) {
        par = entry.parentNode;
        remember(par, entry);
      }
    },
*/

    // Refried Paper
    {
      name: 'Refried Paper',
      entryXpath: "//div[@class='entry']",
      userXpath: ".//span[@class='ljuser']//b/text()",
      tagXpath: ".//table[1]//table[1]//td[last()]/a/text()",
      textXpath: ".//p",
      removeFunction: function(entry) {
        par = entry.parentNode;
        remember(par, entry);
      }
    },

    // Smooth Sailing
    {
      name: 'Smooth Sailing',
      entryXpath: "//div[@class='entryHolder']",
      userXpath: ".//div[@class='entryUserinfo-username']/span[last()]//b/text()",
      tagXpath: ".//span[@class='entryMetadata-content']/a[contains(@href, 'tag')]/text()",
      textXpath: ".//div[@class='entryText']",
      removeFunction: function(entry) {
        par = entry.parentNode;
        remember(par, entry.previousSibling.previousSibling);
        remember(par, entry.previousSibling);
        remember(par, entry);
        remember(par, entry.nextSibling);
      }
    },

    // Tabular Indent
    {
      name: 'Tabular Indent',
      entryXpath: '//h3[@class="page-header"]/following-sibling::div',
      userXpath: './/div[1]/a[last()]/text()',
      tagXpath: ".//a[@rel='tag']/text()",
      textXpath: './/table',
      removeFunction: function(entry) {
        par = entry.parentNode;
        remember(par, entry.previousSibling);
        remember(par, entry);
        remember(par, entry.nextSibling);
      }
    },

    // The Boxer
    {
      name: 'The Boxer',
      entryXpath: "//table[@class='new']",
      userXpath: ".//a[1]/text()",
      tagXpath: ".//a[@rel='tag']/text()",
      textXpath: ".//div[@class='entrycontent']",
      removeFunction: function(entry) {
        par = entry.parentNode;
        remember(par, entry);
        remember(par, entry.nextSibling);
      }
    },

    // Tranquility II
    {
      name: 'Tranquility II',
      entryXpath: '//div[@class="ind-entry"]',
      userXpath: './/span[@class="ljuser"]//b/text()',
      tagXpath: './/div[@class="ljtags"]//text()',
      textXpath: './/div[@class="entry-item"]',
      removeFunction: function(entry) {
        par = entry.parentNode;
        remember(par, entry);
      }
    },

/*
    // Unearthed
    {
      name: 'Unearthed',
      entryXpath: "//table[@class='DropShadow']",
      userXpath: ".//td[@class='BoxSideBarContents']/span[last()]/a[2]/b/text()",
      tagXpath: ".//div[@class='ljtags']/a[@rel='tag']/text()",
      textXpath: ".//td[@class='BoxContents']",
      removeFunction: function(entry) {
        par = entry.parentNode;
        remember(par, entry);
      }
    },
*/

/*
    // Variable Flow
    {
      name: 'Variable Flow',
      entryXpath: "//div[@id='page']/div[@class='day']/div[@class='entry']",
      userXpath: ".//h2[@class='entryheading']/span[2]//b/text()",
      tagXpath: ".//div[@class='ljtags']/a[@rel='tag']/text()",
      textXpath: ".//div[@class='entrytext']",
      removeFunction: function(entry) {
        par = entry.parentNode;
        remember(par, entry);
      }
    }
*/

  ];

  for (var i = 0; i < styles.length; i++) {
    var style = styles[i];
    debug("Style name: " + style.name);
    var allEntries = xpath(style.entryXpath, document, ITER);
    if (!allEntries) continue;
    while (entryNode = allEntries.iterateNext()) {
      if (!recognized) debug("The style is probably " + style.name + ".");
      recognized = true;

      var userNode = xpath(style.userXpath, entryNode, NODE);
      if (userNode) {
        var user = userNode.singleNodeValue.nodeValue;
        debug("LJ user: " + user);
      } else {
        debug("Didn't find a username!");
        continue;
      }

      var userFilter = filter[user];
      if (userFilter) {
        var positive = !userFilter.has_positive;
        var negative = false;
        var allTags = xpath(style.tagXpath, entryNode, ITER);
        var tagNode;
        while (allTags && (tagNode = allTags.iterateNext())) {
          var tag = tagNode.nodeValue;
          debug("Found tag: " + tag);
          if (userFilter.positive[tag]) positive = true;
          if (userFilter.negative[tag]) negative = true;
        }
        if (style.textXpath) {
          var textNode = xpath(style.textXpath, entryNode, NODE);
          if (textNode) {
            var text = textNode.singleNodeValue.innerHTML;
            debug("Entry text: " + text);
            for (var kw in userFilter.positive_kw) {
              debug("Looking up the keyword <" + kw + ">.");
              if (text.indexOf(kw) >= 0) {
                positive = true;
                debug("Found!");
              }
            }
            for (var kw in userFilter.negative_kw) {
              debug("Looking up the keyword <" + kw + ">.");
              if (text.indexOf(kw) >= 0) {
                negative = true;
                debug("Found!");
              }
            }
          }
        }
        if (!positive || negative) {
          debug("Removing the offending entry.");
          style.removeFunction(entryNode);
        }
      }
    }
    if (recognized) break;
  }

  for (var i = 0; i < parents.length; i++) {
     parents[i].removeChild(elements[i]);
  }
}

function editRules()
{
  debug("editRules");
  editWindow = window.open("about:blank", "_blank",
               "width=500, height=400, resizable=1");
  editWindow.document.writeln("<form name='edit' action='about:blank'>");
  editWindow.document.writeln("<textarea name='rules' cols='50' rows='15'>");
  editWindow.document.writeln(getRules());
  editWindow.document.writeln("</textarea>");
  if (errors.length) {
    for (var i = 0; i < errors.length; i++) {
      editWindow.document.writeln("<P>Error in line: " + errors[i].line + ": " + errors[i].message + "</P>");
    }
  }                 
  editWindow.document.writeln("<p><input type='submit' value='Submit'>");
  editWindow.document.writeln("</form>");
  editWindow.document.close();
  var form = editWindow.document.forms.namedItem("edit");
  form.addEventListener("submit", processForm, true); 
  editWindow.focus();
}

function processForm()
{
  debug("processForm");
  var form = editWindow.document.forms.namedItem("edit");
  var elem = form.elements.namedItem("rules");
  var rules = elem.value;
  rules = rules.replace(/\n*$/, "\n");
  setRules(rules);
  parseRules(rules);
  editWindow.close();
  if (errors.length) {
    editRules();
  } else {
    location.reload();
  }
}

GM_registerMenuCommand("Edit LJ filters", editRules);
setRules(getRules(DOCS));
parseRules(getRules());
applyFilter();
