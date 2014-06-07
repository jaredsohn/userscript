// ==UserScript==
// @name           TPBPlus
// @namespace      tpbplus
// @include        http://thepiratebay.se/torrent/*
// @include        http://thepiratebay.sx/torrent/*
// @include        http://www.thepiratebay.se/torrent/*
// @include        http://www.thepiratebay.sx/torrent/*
// ==/UserScript==

function removeAds(){
	document.getElementById('sky-banner').parentNode.removeChild(document.getElementById('sky-banner'));
}

var BBCodeHTML = function() {
  var me = this;            // stores the object instance
  var token_match = /{[A-Z_]+[0-9]*}/ig;

  // regular expressions for the different bbcode tokens
  var tokens = {
    'URL' : '((?:(?:[a-z][a-z\\d+\\-.]*:\\/{2}(?:(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})+|[0-9.]+|\\[[a-z0-9.]+:[a-z0-9.]+:[a-z0-9.:]+\\])(?::\\d*)?(?:\\/(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})*)*(?:\\?(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?(?:#(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?)|(?:www\\.(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})+(?::\\d*)?(?:\\/(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})*)*(?:\\?(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?(?:#(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?)))',
    'LINK' : '([a-z0-9\-\./]+[^"\' ]*)',
    'EMAIL' : '((?:[\\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*(?:[\\w\!\#$\%\'\*\+\-\/\=\?\^\`{\|\}\~]|&)+@(?:(?:(?:(?:(?:[a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(?:\\d{1,3}\.){3}\\d{1,3}(?:\:\\d{1,5})?))',
    'TEXT' : '(.*?)',
    'SIMPLETEXT' : '([a-zA-Z0-9-+.,_ ]+)',
    'INTTEXT' : '([a-zA-Z0-9-+,_. ]+)',
    'IDENTIFIER' : '([a-zA-Z0-9-_]+)',
    'COLOR' : '([a-z]+|#[0-9abcdef]+)',
    'NUMBER'  : '([0-9]+)'
  };

  var bbcode_matches = [];        // matches for bbcode to html

  var html_tpls = [];             // html templates for html to bbcode

  var html_matches = [];          // matches for html to bbcode

  var bbcode_tpls = [];           // bbcode templates for bbcode to html

  /**
   * Turns a bbcode into a regular rexpression by changing the tokens into
   * their regex form
   */
  var _getRegEx = function(str) {
    var matches = str.match(token_match);
    var nrmatches = matches.length;
    var i = 0;
    var replacement = '';

    if (nrmatches <= 0) {
      return new RegExp(preg_quote(str), 'g');        // no tokens so return the escaped string
    }

    for(; i < nrmatches; i += 1) {
      // Remove {, } and numbers from the token so it can match the
      // keys in tokens
      var token = matches[i].replace(/[{}0-9]/g, '');

      if (tokens[token]) {
        // Escape everything before the token
        replacement += preg_quote(str.substr(0, str.indexOf(matches[i]))) + tokens[token];

        // Remove everything before the end of the token so it can be used
        // with the next token. Doing this so that parts can be escaped
        str = str.substr(str.indexOf(matches[i]) + matches[i].length);
      }
    }

    replacement += preg_quote(str);      // add whatever is left to the string

    return new RegExp(replacement, 'gi');
  };

  /**
   * Turns a bbcode template into the replacement form used in regular expressions
   * by turning the tokens in $1, $2, etc.
   */
  var _getTpls = function(str) {
    var matches = str.match(token_match);
    var nrmatches = matches.length;
    var i = 0;
    var replacement = '';
    var positions = {};
    var next_position = 0;

    if (nrmatches <= 0) {
      return str;       // no tokens so return the string
    }

    for(; i < nrmatches; i += 1) {
      // Remove {, } and numbers from the token so it can match the
      // keys in tokens
      var token = matches[i].replace(/[{}0-9]/g, '');
      var position;

      // figure out what $# to use ($1, $2)
      if (positions[matches[i]]) {
        position = positions[matches[i]];         // if the token already has a position then use that
      } else {
        // token doesn't have a position so increment the next position
        // and record this token's position
        next_position += 1;
        position = next_position;
        positions[matches[i]] = position;
      }

      if (tokens[token]) {
        replacement += str.substr(0, str.indexOf(matches[i])) + '$' + position;
        str = str.substr(str.indexOf(matches[i]) + matches[i].length);
      }
    }

    replacement += str;

    return replacement;
  };

  /**
   * Adds a bbcode to the list
   */
  me.addBBCode = function(bbcode_match, bbcode_tpl) {
    // add the regular expressions and templates for bbcode to html
    bbcode_matches.push(_getRegEx(bbcode_match));
    html_tpls.push(_getTpls(bbcode_tpl));

    // add the regular expressions and templates for html to bbcode
    html_matches.push(_getRegEx(bbcode_tpl));
    bbcode_tpls.push(_getTpls(bbcode_match));
  };

  /**
   * Turns all of the added bbcodes into html
   */
  me.bbcodeToHtml = function(str) {
    var nrbbcmatches = bbcode_matches.length;
    var i = 0;

    for(; i < nrbbcmatches; i += 1) {
      str = str.replace(bbcode_matches[i], html_tpls[i]);
    }

    return str;
  };

  /**
   * Turns html into bbcode
   */
  me.htmlToBBCode = function(str) {
    var nrhtmlmatches = html_matches.length;
    var i = 0;

    for(; i < nrhtmlmatches; i += 1) {
      str = str.replace(html_matches[i], bbcode_tpls[i]);
    }

    return str;
  }

  /**
   * Quote regular expression characters plus an optional character
   * taken from phpjs.org
   */
  function preg_quote (str, delimiter) {
    return (str + '').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
  }

  // adds BBCodes and their HTML
  me.addBBCode('[b]{TEXT}[/b]', '<strong>{TEXT}</strong>');
  me.addBBCode('[i]{TEXT}[/i]', '<em>{TEXT}</em>');
  me.addBBCode('[u]{TEXT}[/u]', '<span style="text-decoration:underline;">{TEXT}</span>');
  me.addBBCode('[s]{TEXT}[/s]', '<span style="text-decoration:line-through;">{TEXT}</span>');
  me.addBBCode('[url={URL}]{TEXT}[/url]', '<a href="{URL}" title="link" target="_blank">{TEXT}</a>');
  me.addBBCode('[url]{URL}[/url]', '<a href="{URL}" title="link" target="_blank">{URL}</a>');
  me.addBBCode('[url={LINK}]{TEXT}[/url]', '<a href="{LINK}" title="link" target="_blank">{TEXT}</a>');
  me.addBBCode('[url]{LINK}[/url]', '<a href="{LINK}" title="link" target="_blank">{LINK}</a>');
  me.addBBCode('[img={URL} width={NUMBER1} height={NUMBER2}]{TEXT}[/img]', '<a href="{URL}" title="link" target="_blank">{URL}</a>');
  me.addBBCode('[img]{URL}[/img]', '<a href="{URL}" title="link" target="_blank">{URL}</a>');
  me.addBBCode('[img={LINK} width={NUMBER1} height={NUMBER2}]{TEXT}[/img]', '<a href="{LINK}" title="link" target="_blank">{LINK}</a>');
  me.addBBCode('[img]{LINK}[/img]', '<a href="{LINK}" title="link" target="_blank">{LINK}</a>');
  me.addBBCode('[color=COLOR]{TEXT}[/color]', '<span style="{COLOR}">{TEXT}</span>');
  me.addBBCode('[highlight={COLOR}]{TEXT}[/highlight]', '<span style="background-color:{COLOR}">{TEXT}</span>');
  me.addBBCode('[quote="{TEXT1}"]{TEXT2}[/quote]', '<div class="quote"><cite>{TEXT1}</cite><p>{TEXT2}</p></div>');
  me.addBBCode('[quote]{TEXT}[/quote]', '<cite>{TEXT}</cite>');
  me.addBBCode('[blockquote]{TEXT}[/blockquote]', '<blockquote>{TEXT}</blockquote>');
};
var bbcodeParser = new BBCodeHTML();

var details = document.getElementById('details').getElementsByClassName('nfo')[0].childNodes[1];
details.innerHTML = bbcodeParser.bbcodeToHtml(details.innerHTML);

var newdiv = document.createElement('div');
var newtable = document.createElement('table');
newdiv.id = 'newdiv';
newdiv.class = 'nfo';
newdiv.align = 'center';
newdiv.style.clear = 'both';
var newh = document.createElement('dt');
newh.innerHTML = 'Images:';
document.getElementsByClassName('col1')[0].appendChild(newh);
var check = ['png','jpg','jpeg','bmp','gif'];
for (var i=0;i<document.links.length;i++)
	if(document.links[i].href){
		var tlink = document.links[i].href.toString();
		for (var j=0;j<check.length;j++)
		{
			if(tlink.lastIndexOf("." + check[j]) != -1){
			var imgtr = document.createElement('tr');
			var imgtd = document.createElement('td');
			var imghref = document.createElement('a');
			var img = document.createElement('img');
			imghref.href = tlink;
			img.style.cssText = 'max-width: 640px; height: auto';
			img.src = tlink;
			imghref.appendChild(img);
			imgtd.appendChild(imghref);
			imgtr.appendChild(imgtd);
			newtable.appendChild(imgtr);
		}
	}
}
newdiv.appendChild(newtable);
document.getElementById('details').insertBefore(newdiv, document.getElementById('CommentDiv'));

removeAds();