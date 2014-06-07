// ==UserScript==
// @name           BBC blog  Disemvoweller
// @namespace      fleem
// @description    Add the names of the people you wish to disemvowel on BBC blogs, and it will abuse thier comments in a variety of ways.Stolen from Cleek, http://ok-cleek.com
// @include        http://www.bbc.co.uk/blogs/*
// @include        http://aquamarinejotv.wordpress.com/*
// @require 	     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

/*------------------------------------------------------*/
// this is the stuff you can edit

/*------------------------------------------------------
  the bad guys. if you want to edit your list by hand, you can do it here.
  ex:
  var baddies = new Array("bad guy 1", "BADGUY2", "someone else");

  by default, this is empty because you can now add baddies directly
  from the web page.
------------------------------------------------------*/

var baddies = new Array("SAINTIXE56","Saintixe56");

// how to abuse the comment:
// 0 = replace text with big white-on-black "REDACTED"  (see redactedText. below)
// 1 = make them tell you how much they love pie
var abuseStyle = 1;

// set this to true, to knock out the "Share This" gadgets
var noShareThingy = true;

// contact ok-cleek.com to load addtional pie messages ?
// set to false if you don't trust me.
// turning this off may also speed-up rendering, since you don't
// have to talk to my server before drawing the page. but then you'll
// be stuck with the same old pie messages...
var dynamicPieText = true;

var redactedText = "&nbsp;&nbsp;&nbsp;TWADDLE&nbsp;&nbsp;&nbsp;";

// don't edit below here unless you know what you're doing!
/*------------------------------------------------------*/

var ambientPieListName = "cleeksBJPieList";

var redactedTextArrayBuiltIn = new Array(
"Gosh, you know, I really like pie.",
"It's pie for me, guys!",
"All I really know for sure is that nothing picks me up like a nice piece of pie.",
"Pie? You bet!",
"I think that pie may be one of the best foods we have.</p><p>No, wait, <i>the</i> best food we have.",
"Me, when I'm feeling down, I like some pie.",
"I don't know about all this stuff, guys, but I do know that I like pie.",
"Who can argue with pie? Not me.",
"That all may be so, but I notice that you didn't say anything about pie.",
"Peach, strawberry, apple, blueberry, pecan, even mincemeat, they're all damned good. Because they're <i>pies</i>.",
"It may look like I talk about pies a lot, but I'm actually restraining myself from bringing them up more often. They're <i>that</i> good!",
"Pie. Pie. Pie. Pie.</p><p>Ever notice how totally great that word sounds?",
"That's great. Anyone have any pie?",
"That's total crap. <i>My</i> mother made the best apple pie.",
"I just ate some pie, and darned if I don't want some more already.",
"I'd just like to say that I agree with all the positive comments made about pie. It's a pleasure being around commenters who have their heads on straight and really know what pie is all about.",
"Excuse the language, but goddamn! Pie is good!",
"When all is said and done, pie is still excellent.",
"Churchill liked pie, you know. And not that Ward guy. The other one, the British guy, he liked pies.",
"I'm not really sure why I like pies so much. The roundness? The delicious crust? I dunno, man, I dunno.",
"I like pie. A lot.",
"Pies suck!</p><p>Ha ha, I'm joking, of course. Pies RULE!!",
"You guys don't mention pie enough.",
"For God loves us so, he gave us pie.",
"Imagine a world without pie. Sad, isn't it?",
"OT: Pie!",
"Getting back on topic: Pie is not only delicious, it's round, too!",
"I thought we were talking about pie?",
"You can have your cakes, petit fors, and tarts. For me it's pie, or nothing at all!",
"Your comment reminds me, I could really use some pie!",
"If we're not talking about pie, I don't want any part of it.",
"I don't want to live in a world without pie.",
"Q: What's round, brown and full of hot steamy goodness?<br><br>A: <b>PIE!</b>",
"So, if it comes to that, and I'm not saying it will, but if it does, <i>what about the pie</i>?",
"I think you misunderstand; I'm really talking about pie.",
"Pie!",
"Give me pie lots of pie / 'neath the starry skies above / Don't fence me in - without pie, that is.",
"I pledge allegiance <i>to pie!</i>",
"Ever see \"American Pie\"? That's how much I like pie.",
"What's hot, moist, and crusty around the edges? Pie!",
"It doesn't always have to be steamy you know. Some cold pies can be excellent as well!",
"In the beginning, there was pie. Praise Jesus!",
"This is a fascinating topic, but I have to go now. The pie is ready.",
"The sad part is that this entire controversy could end right here, if we could all sit down and share some pie!",
"PIE! I EAT IT!",
"You can learn more about pie, <a href='http://en.wikipedia.org/wiki/Pie'>here</a>!",
"Bottom-crust-only pies may be known as tarts or tartlets.",
"\"Pieing\" can result in injury to the target and assault or more serious charges against the pie throwers. Don't throw pies!",
"Whether or not what we experienced was an According to Hoyle miracle is insignificant. What is significant is that I smelled pie. Pie was involved.",
"Pie is the cornerstone of any nutritious breakfast.",
"Your ideas intrigue me. Would you care to discuss them with me over pie?",
"Sweet Home Ala<i>bama</i> but I could use me some pie!",
"Remember <i>Warrant</i>? That was a good band. Any band with a song about pie knows what's important."
);


///////////////////////////////////

getAmbientNames();

var redactedTextArray = redactedTextArrayBuiltIn;

if (dynamicPieText)
{
  // async call to ok-cleek.com to get additional pie text
  GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://ok-cleek.com/stuff/pie_strings.json',
      headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload: function(responseDetails)
    {
      if (responseDetails.status == 200) // 200 = HTTP success
      {
        // parse them
        var redactedTextArrayJSON = JSON.parse(responseDetails.responseText);

        // append them to the builtins
        redactedTextArray = redactedTextArrayBuiltIn.concat(redactedTextArrayJSON);
      }
      // if that failed, we'll just use the builtins. no big deal.

      replaceText();
      }
  });
}
else
{
  replaceText();
}

addPieControls();

killShareStuff();

///////////////////////////////////

String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g,"");
}
String.prototype.ltrim = function() {
  return this.replace(/^\s+/,"");
}
String.prototype.rtrim = function() {
  return this.replace(/\s+$/,"");
}

function GetFirstChildOfType(par, typ)
{
  if (par != null)
  {
      for (var i=0;i < par.childNodes.length;i++)
      {
          if (par.childNodes[i].tagName!=null &&
          par.childNodes[i].tagName.toLowerCase()==typ)
          {
        return par.childNodes[i];
          }
      }
  }
  return null;
}

function GetFirstChildOfTypeAndClass(par, typ, cls)
{
  if (par != null)
  {
      for (var i=0;i < par.childNodes.length;i++)
      {
          if (par.childNodes[i].tagName!=null &&
          par.childNodes[i].tagName.toLowerCase()==typ &&
          par.childNodes[i].className.toLowerCase()==cls)
          {
        return par.childNodes[i];
          }
      }
  }
  return null;
}

function GetNextSiblingOfType(cur, typ)
{
  var nxt = cur.nextSibling;
  while (nxt != null)
  {
    if (nxt.tagName!=null && nxt.tagName.toLowerCase()==typ)
    {
      return nxt;
    }

    nxt = nxt.nextSibling;
  }

  return null;
}

function GetBadNameIdx(name)
{
  var nameText = name.toLowerCase();

  // see if the text of that href matches anyone in our baddies list
  for (var baddiesIdx=0;baddiesIdx<baddies.length;baddiesIdx++)
  {
    if (nameText == baddies[baddiesIdx].toLowerCase())
    {
      return baddiesIdx;
    }
  }

    return -1;
}

function GetPieText()
{
   var pieText = "";

   if (abuseStyle==1) // pie
   {
      var randomNum = Math.floor( Math.random() * redactedTextArray.length );
      return redactedTextArray[ randomNum ];
   }
   else
   {
      return "<span style='background:black;color:white;font-weight:bold'>" + redactedText + "</span>";
   }
}

///////////////////////////////////



///////////////////////////////////

function replaceText()
{

for (var baddiesIdx=0;baddiesIdx<baddies.length;baddiesIdx++)

  { $("cite:contains('"+baddies[baddiesIdx]+"')").next("div.comment-text").replaceWith(GetPieText());
  	$("div .comment-heading:contains('"+baddies[baddiesIdx]+"')").next("div.comment-text").replaceWith(GetPieText());
  }
}

//////////

function killShareStuff()
{
  if (noShareThingy==true)
  {
    // <div class="addtoany_share_save_container">
    var shareDivs;
    shareDivs = document.evaluate(
      "//div[@class='addtoany_share_save_container']",
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null);

    for (var x=0;x<shareDivs.snapshotLength; x++)
    {
      var thisDiv = shareDivs.snapshotItem(x);
      thisDiv.innerHTML = "";
    }
  }
}

//////////

// add ambient pie names
function getAmbientNames()
{
  var ambientList = "";

  var ambientListJSON = GM_getValue( ambientPieListName, "");
  if (ambientListJSON != "")
  {
    ambientList = JSON.parse(ambientListJSON);
    baddies = baddies.concat(ambientList);
  }
}

//////////

Array.prototype.unique = function()
{
  var o = {}, i, l = this.length, r = [];
  for(i=0; i<l;i+=1) o[this[i]] = this[i];
  for(i in o) r.push(o[i]);
  return r;
};

function removeByElement(arrayName, arrayElement)
{
  for(var i=0; i<arrayName.length;i++ )
  {
    if(arrayName[i]==arrayElement)
      arrayName.splice(i,1);
  }
}


function addToAmbientPieFilters(targetName)
{
  var listJSON = GM_getValue( ambientPieListName, "");

  var list;
  if (listJSON != "")
  {
    list = JSON.parse(listJSON);
    list.push(targetName);
    list = list.unique();
  }
  else
  {
    list = new Array(targetName)
  }

  var js_list = JSON.stringify(list);

  GM_setValue( ambientPieListName, js_list );
}

//////////

function removeFromAmbientPieFilters(targetName)
{
  var listJSON = GM_getValue( ambientPieListName, "");

  var list;
  if (listJSON != "")
  {
    list = JSON.parse(listJSON);
    removeByElement(list, targetName);
    list = list.unique();

    removeByElement(baddies, targetName);
  }
  else
  {
    list = new Array(targetName)
  }

  var js_list = JSON.stringify(list);

  GM_setValue( ambientPieListName, js_list );
}

//////////

function doAddPie()
{
  var txt = getSelText() + ''; // + '' to cvt to string
  txt = txt.trim();

  if (txt != "")
  {
    if (confirm('Add "' + txt + '" to pie filter?'))
    {
      addToAmbientPieFilters(txt);
      getAmbientNames();
      replaceText();
    }
  }
}

//////////

function doRemovePie()
{
  var txt = getSelText() + ''; // + '' to cvt to string
  txt = txt.trim();

  if (txt != "")
  {
    if (confirm('Remove "' + txt + '" from pie filter?'))
    {
      removeFromAmbientPieFilters(txt);
      location.reload(true);
    }
  }
}

//////////

function doQuote()
{
    var txt = getSelText();
    insertAtCaret("comment", "<blockquote>" + txt + "</blockquote>");
}

function insertAtCaret(areaId,text)
{
  var txtarea = document.getElementById(areaId);
  var scrollPos = txtarea.scrollTop;
  var strPos = 0;
  var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? "ff" : (document.selection ? "ie" : false ) );
  if (br == "ie")
  {
    txtarea.focus();
    var range = document.selection.createRange();
    range.moveStart ('character', -txtarea.value.length);
    strPos = range.text.length;
  }
  else if (br == "ff")
    strPos = txtarea.selectionStart;
  var front = (txtarea.value).substring(0,strPos);
  var back = (txtarea.value).substring(strPos,txtarea.value.length);
  txtarea.value=front+text+back;
  strPos = strPos + text.length;
  if (br == "ie")
  {
    txtarea.focus();
    var range = document.selection.createRange();
    range.moveStart ('character', -txtarea.value.length);
    range.moveStart ('character', strPos);
    range.moveEnd ('character', 0);
    range.select();
  }
  else if (br == "ff")
  {
    txtarea.selectionStart = strPos;
    txtarea.selectionEnd = strPos;
    txtarea.focus();
  }
  txtarea.scrollTop = scrollPos;
}

//////////

function getSelText()
{
  var txt = '';
  if (window.getSelection)
  {
    txt = window.getSelection();
  }
  else if (document.getSelection) // FireFox
  {
    txt = document.getSelection();
  }
  else if (document.selection)  // IE 6/7
  {
    txt = document.selection.createRange().text;
  }

  return txt;
}

//////////

function addButtonListeners()
{
  var button1 = document.getElementById("cleeksAddPieButton");
  button1.addEventListener('click',doAddPie,true);

  var button2 = document.getElementById("cleeksRemovePieButton");
  button2.addEventListener('click',doRemovePie,true);

  var button3 = document.getElementById("cleeksQuoteButton");
  button3.addEventListener('click',doQuote,true);
}

//////////

function addPieControls()
{
  var commentForm;
  commentForm = document.evaluate(
    "//div[@id='comment-form']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

    if (commentForm.snapshotLength == 1)
    {
      var thisDiv = commentForm.snapshotItem(0);

      // try to make the pie box as wide as the comment box
      var taw = "100%";
      var frm = GetFirstChildOfType(thisDiv, "form");
      if (frm != null)
      {
        var ta = GetFirstChildOfType(frm, "textarea");
        if (ta != null)
        {

          taw = ta.offsetWidth;
          taw += 'px';
        }
      }

      // can't touch the innerHTML of the comment form, breaks other JS on the page.
      // so, do it the OO/DOM way...
      var el = document.createElement("div");
      el.innerHTML =
        '&nbsp;Pie filter stuff&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
        '<input id="cleeksAddPieButton" type="button" value="Add selected" style="color:#404040" title="Highlight the person\'s name and click this to add him/her to your pie filter."/>' +
        '&nbsp;' +
        '<input id="cleeksRemovePieButton" type="button" value="Remove selected"  style="color:#404040" title="Highlight the person\'s name and click this to remove him/her from your pie filter."/>' +
        '&nbsp;' +
        '<input id="cleeksQuoteButton" type="button" value="Quote"  style="color:#404040" title="Copies and blockquotes the selected text into the comment box."/>';

      el.style.color = '#606060';
      el.style.border='solid 1px #b0b0b0';
      el.style.padding='2px';
      el.style.backgroundColor='#f0f0f0';
      el.style.width = taw;

      thisDiv.appendChild(el);

      addButtonListeners();
    }
}
