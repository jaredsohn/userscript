// ==UserScript==
// @name           BNScript: BlogNomic Utility Script
// @namespace      blognomic
// @description    Original by Sparrow, vote-counting added by alethiophile, updates by lilomar, and idler tracking by coppro
// @include        http://*blognomic.com/
// @include        http://*blognomic.com/archive/*
// @include        http://*blognomic.com/blognomic/archive/*
// @include        http://*blognomic.com/blognomic/
// @require        http://jqueryjs.googlecode.com/files/jquery-1.2.3.pack.js
// ==/UserScript==

//VERSION 1.11.7.21

var settings_default = {
  'showNew': true,
  'showTotal': true,
  'debug': false,
  'emperor': '',
  'colorPassed': '#00cc00',
  'colorFailed': '#ff0000',
  'colorNew': '#ff0000'
};

var form_data =
  'Show new comments: <input type="checkbox" name="showNew" /><br />' +
  'Show vote totals: <input type="checkbox" name="showTotal" /><br />' +
  'Debug mode: <input type="checkbox" name="debug" /><br />' +
  'Current Emperor: <input type="text" name="emperor" /><br />' +
  'Color of passed counts: <input type="text" name="colorPassed" /><br />' +
  'Color of failed counts: <input type="text" name="colorFailed" /><br />' +
  'Color of new comments: <input type="text" name="colorNew" /><br />' +
  '<button type="button">Save</button>';

inputs = document.getElementsByTagName("input");
for (i=0; i<inputs.length; ++i) {
  if(inputs[i].name == "notify_me") inputs[i].checked = false;
}

// This whole block from http://umkk.eu/wp-content/uploads/2009/10/json.js
var JSON=JSON||{};(
  function() {
    function f(n) {
      return n<10 ? '0' + n : n;
    }
    if (typeof Date.prototype.toJSON !== 'function') {
      Date.prototype.toJSON = function(key) {
return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' +
f(this.getUTCMonth()+1) + '-' + f(this.getUTCDate()) + 'T' +
f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' +
f(this.getUTCSeconds()) + 'Z' : null;
      };
      String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key) {
return this.valueOf();
      }
    }
    var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;
    function quote(string) {
      escapable.lastIndex=0;
      return escapable.test(string) ? '"' +
string.replace(escapable, function(a) {
   var c=meta[a];
   return typeof c === 'string' ? c : '\\u' +
     ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
 }) + '"' : '"' + string + '"'
}
    function str(key,holder) {
      var i, k, v, length, mind=gap, partial, value=holder[key];
      if (value && typeof value === 'object' &&
 typeof value.toJSON === 'function') {
value=value.toJSON(key);
      }
      if (typeof rep === 'function') {
value = rep.call(holder,key,value);
      }
      switch (typeof value) {
      case'string':
return quote(value);
      case'number':
return isFinite(value) ? String(value) : 'null';
      case'boolean':
      case'null':
return String(value);
      case'object':
if(!value) {
 return'null';
}
gap += indent;
partial=[];
if (Object.prototype.toString.apply(value) === '[object Array]') {
 length=value.length;
 for (i=0; i<length; i+=1) {
   partial[i] = str(i,value) || 'null';
 }
 v = partial.length === 0 ? '[]' : gap ? '[\n' + gap +
   partial.join(',\n' + gap) + '\n' + mind + ']' : '[' +
   partial.join(',') + ']';
 gap = mind;
 return v;
}
if (rep && typeof rep === 'object') {
 length = rep.length;
 for(i=0; i<length; i+=1) {
   k=rep[i];
   if(typeof k === 'string') {
     v=str(k,value);
     if (v) {
partial.push(quote(k) + (gap ? ': ' : ':') + v);
     }
   }
 }
}
else {
 for(k in value) {
   if (Object.hasOwnProperty.call(value,k)) {
     v = str(k,value);
     if (v) {
partial.push(quote(k) + (gap ? ': ' : ':') + v);
     }
   }
 }
}
v = partial.length === 0 ? '{}' : gap ? '{\n' + gap +
 partial.join(',\n' + gap) + '\n' + mind + '}' : '{' +
 partial.join(',') + '}';
gap = mind;
return v;
      }
    }
    if (typeof JSON.stringify !== 'function') {
      JSON.stringify = function(value,replacer,space) {
var i;
gap = '';
indent = '';
if (typeof space === 'number') {
 for (i=0; i<space; i+=1) {
   indent+=' ';
 }
}
else if (typeof space === 'string') {
 indent = space;
}
rep = replacer;
if (replacer && typeof replacer !== 'function' &&
   (typeof replacer !== 'object' || typeof replacer.length !==
    'number')) {
 throw new Error('JSON.stringify');
}
return str('',{'':value});
      }
    }
    if (typeof JSON.parse !== 'function') {
      JSON.parse = function(text,reviver) {
var j;
function walk(holder,key) {
 var k, v, value=holder[key];
 if (value && typeof value === 'object') {
   for (k in value) {
     if (Object.hasOwnProperty.call(value,k)) {
v = walk(value,k);
if (v!==undefined) {
 value[k] = v;
}
else {
 delete value[k];
}
     }
   }
 }
 return reviver.call(holder,key,value);
}
cx.lastIndex=0;
if (cx.test(text)) {
 text=text.replace(cx,function(a) {
     return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
   });
}
if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,'')))
{
 j = eval('(' + text + ')');
 return typeof reviver === 'function' ? walk({'':j},'') : j;
}
throw new SyntaxError('JSON.parse');
      }
    }
  }());
// End borrowed code

var settings;

function getComments(text) {
  return parseInt(text.replace(/[^0-9]/g, ''))
}

function set(k,v) { // hack
  window.setTimeout(function() {
    GM_setValue(k,v)
  }, 0)
}

function get(k,v, callback) { // hack
  window.setTimeout(function() {
    callback(GM_getValue(k,v))
  }, 0)
}

function mainPage() {
  $("<button type=\"button\">BNScript settings</button>").prependTo("#sidebar2").click(settings_query);
  $("a[title='Comments']").each(function(i) {
    var link = this
    
    get(this.href, false, function(old_comments) {
      var num_comments = getComments(link.text)
      var num_new_comments = num_comments - (old_comments || 0)
      
      if ((!old_comments && num_comments > 0) || num_comments > old_comments) {
        $(link).append(' <span style="color: ' + settings['colorNew'] + '">(' + num_new_comments + ' new)</span>')
      }
      
      $(link).click(function() {
        set(link.href, num_comments)
      })
      
      if (settings['showNew']) {
        if (num_new_comments > 0) {
          $('#header').append('<a href="' + link.href + '" style="color: ' + settings['colorNew'] + '">' + (num_new_comments) + '</a> ')
        } else {
         $('#header').append('0 ')
        }
      }
    })
  })
}

function archivePage() {
  $("a[title='Comments']").each(function(i) {
      set(this.href, getComments(this.text));
    });
  var votes = new Object();
  var proposer;
  proposer = $("p[class=post-footer]").children().filter("em").
    children().filter("a").html();
  var isProposal;
  isProposal = /^Proposal\:/.test($("h3[class^=post-title]").html());
  var quorum;
  quorum = $("#PlayerList").next().html();
  quorum = /\D*(\d+)\D*(\d+)/.exec(quorum);
  var numPlayers = parseInt(quorum[1]);
  quorum = parseInt(quorum[2]);
  GM_log('Number of players: ' + numPlayers);
  GM_log('Quorum: ' + quorum);
  var failQuorum = quorum - 1 + numPlayers % 2;
  GM_log('Failure quorum: ' + failQuorum);
  $("div[class='comment']").
    each(
      function(i) {
var comment = this;
var name = $(comment).children().filter('h3').children().
 filter('a').html();
var cbody = $(comment).children().filter('div.commentbody');
if (settings['debug']) {
 GM_log('In vote-counter: voter #' + i + ': ' + name);
}
$(cbody).find("img").each(
 function(j) {
	    var cb = this;
	    var vote = cb.getAttribute('alt');
     if (settings['debug']) {
	      GM_log('In vote-counter: vote #' + j + ': ' + 
		     vote);
   }
            if (vote == 'for' || vote == 'against' ||
                (vote == 'imperial' && isProposal) ||
                (vote == 'veto' && isProposal && settings[emperor] != '' && name == settings[emperor]))
              votes[name] = vote;
            else if (settings['debug'])
              GM_log('Vote not counted');
 });
      });
  var players = {};
  $("#PlayerList > a").each(function(i) {
      players[$(this).text().replace(/\*$/, "")] = true;
  });
  var numFor = 0;
  var numAgainst = 0;
  var numImp = 0;
  var emperor = '';
  var veto = false;
  var sk = false;
  if (votes[proposer] == undefined)
    votes[proposer] = 'for';
  if (settings['debug']) {
    GM_log('In vote-counter: Vote count: ' + JSON.stringify(votes));
    GM_log('In vote-counter: Proposer: ' + proposer);
    GM_log('In vote-counter: isProposal: ' + isProposal);
  }
  for (key in votes) {
    if (!players[key])
      continue;
    if (settings[emperor] != '' && key == settings['emperor'])
      emperor = votes[key];
    if (votes[key] == 'for')
      numFor++;
    if (votes[key] == 'against')
      numAgainst++;
    if (votes[key] == 'imperial')
      numImp++;
  }
  if (isProposal && emperor == 'veto')
    veto = true;
  if (isProposal && (votes[proposer] == 'against' || (votes[proposer] == 'imperial' && emperor == 'against')))
    sk = true;
  if (settings['debug']) {
    GM_log('In vote-counter: emperor\'s vote: ' + emperor);
    GM_log('In vote-counter: vote numbers: ' + numFor + ' ' +
  numAgainst + ' ' + numImp);
    GM_log('In vote-counter: veto/s-k: ' + veto + '/' + sk);
  }
  var foradj = numFor, agadj = numAgainst, impadj = numImp;
  if (emperor == 'for') {
    foradj += impadj;
    impadj = 0;
  }
  if (emperor == 'against') {
    agadj += impadj;
    impadj = 0;
  }
  var sstring;
  sstring = "text-align: left";
  if (foradj >= quorum)
    sstring += '; color: ' + settings['colorPassed'];
  if (agadj >= failQuorum || veto || sk)
    sstring += '; color: ' + settings['colorFailed'];
  var pstring;
  if (veto)
    pstring = '<span style="' + sstring + '">Vetoed; votes: ';
  else if (sk)
    pstring = '<span style="' + sstring + '">Self-killed; votes: ';
  else
    pstring = '<span style="' + sstring + '">Votes: ';
  if (emperor != '' && numImp != 0 && emperor != 'imperial') {
    pstring += foradj + '-' + agadj + ' (' + numFor + '-' + numAgainst +
      '-' + numImp +')</span>';
  }
  else {
    pstring += foradj + '-' + agadj +
      (impadj != 0 ? '-' + impadj : '') + '</span>';
  }
  if (settings['showTotal'])
    $("#main2").prepend(pstring);
}

function settings_query(event) {
  var dbody = document.body;
  var bgcolor = $(dbody).css("background-color");
  var form;
  GM_log('At start: ' + JSON.stringify(settings));
  $(dbody).empty();
  $(dbody).css("background-color", bgcolor);
  $(dbody).append('<form></form>');
  form = $(dbody).children().filter('form');
  $(form).submit(function () {
      settings_save($(this));
      return false;
    });
  $(form).append(form_data);
  if (settings['showNew'])
    $(form).children().filter('[name=showNew]').attr('checked', 'checked');
  if (settings['showTotal'])
    $(form).children().filter('[name=showTotal]').attr('checked', 'checked');
  if (settings['debug'])
    $(form).children().filter('[name=debug]').attr('checked', 'checked');
  $(form).children().filter('[name=emperor]').
    attr('value', settings['emperor']);
  $(form).children().filter('[name=colorPassed]').
    attr('value', settings['colorPassed']);
  $(form).children().filter('[name=colorFailed]').
    attr('value', settings['colorFailed']);
  $(form).children().filter('[name=colorNew]').
    attr('value', settings['colorNew']);
  $(form).children().filter('button').click(function (event) {
      settings_save($(this).parent());
    });
}

function settings_save(form) {
  settings['showNew'] = form.children().filter('[name=showNew]').
    attr('checked') == true ? true : false;
  settings['showTotal'] = form.children().filter('[name=showTotal]').
    attr('checked') == true ? true : false;
  settings['debug'] = form.children().filter('[name=debug]').
    attr('checked') == true ? true : false;
  settings['emperor'] = form.children().filter('[name=emperor]').attr('value');
  settings['colorPassed'] = form.children().filter('[name=colorPassed]').
    attr('value');
  settings['colorFailed'] = form.children().filter('[name=colorFailed]').
    attr('value');
  settings['colorNew'] = form.children().filter('[name=colorNew]').
    attr('value');
  GM_log(JSON.stringify(settings));
  set("settings", JSON.stringify(settings));
  unsafeWindow.location.reload();
}
      
var setstr = GM_getValue("settings");

$(document).ready(function() {
    if (setstr)
      settings = JSON.parse(setstr);
    else
      settings = settings_default;
    if (/^http:\/\/(www\.)?blognomic.com\/(blognomic\/)?archive\/.*$/.
test(location.href)) {
      archivePage();
    }
    else if (/^http:\/\/(www\.)?blognomic.com\/(blognomic\/)?$/.
    test(location.href)) {
      mainPage();
    }
  });
