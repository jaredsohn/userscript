// ==UserScript==
// @name        Send to Kindle
// @description Do článku na vybraných serverech přidá tlačítko umožňující odeslat obsah článku na čtečku KINDLE (bez obrázků).
// @namespace   http://userscripts.org/scripts/source/164358.user.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     https://d1xnn692s7u6t6.cloudfront.net/widget.js
// @grant       GM_addStyle
// @include     http://*.wikipedia.org/wiki/*
// @include     http://www.national-geographic.cz/detail/*
// @include     http://*.idnes.cz/*.aspx*
// @include     http://www.novinky.cz/*.html
// @include     http://www.sport.cz/*.html*
// @include     http://*blisty.cz/art/*.html
// @include     http://ydiot.com/texty/*
// @include     http://prigl.cz/*
// @include     http://www.parlamentnilisty.cz/*
// @version     1.05
// ==/UserScript==

var servers = {
  'idnes.cz': {
    'key' : '\.idnes\.cz$',
    'todo': function () {
      if (document.getElementById('eTargetContent')) {
        $('#eTargetContent').before('<div class="kindleWidget" style="float: right; display: block; padding: 3px; cursor: pointer; font-size: 11px; font-family:sans-serif;white-space:nowrap;line-height:1;border-radius:3px;border:#ccc thin solid;color:black;background:transparent url(\'https://d1xnn692s7u6t6.cloudfront.net/button-gradient.png\') repeat-x;background-size:contain;"><img style="vertical-align:middle;margin:0;padding:0;border:none;" src="https://d1xnn692s7u6t6.cloudfront.net/white-15.png" /><span style="vertical-align:middle;margin-left:3px;">Poslat článek na Kindle</span></div>');
        (
          function k () {
            window.$SendToKindle&&window.$SendToKindle.Widget?$SendToKindle.Widget.init({
              "content": "div.art-full",
              "exclude": "div#art-related, div#art-add-2",
              "title": "title",
              "author": "div.authors span[itemprop=name]",
              "published":"span.time-date"
            }):setTimeout(k,500);
          }
        )();
      }
    }
  },
  'blisty.cz': {
    'key' : '\.?blisty\.cz$',
    'todo': function () {
      $('div.sharethis').append('<div class="kindleWidget" style="display:inline-block;padding:3px;cursor:pointer;font-size:11px;font-family:sans-serif;white-space:nowrap;line-height:1;border-radius:3px;border:#ccc thin solid;color:black;background:transparent url(\'https://d1xnn692s7u6t6.cloudfront.net/button-gradient.png\') repeat-x;background-size:contain;"><img style="vertical-align:middle;margin:0;padding:0;border:none;" src="https://d1xnn692s7u6t6.cloudfront.net/white-15.png" /><span style="vertical-align:middle;margin-left:3px;">Poslat článek na Kindle</span></div>');
      (
        function k () {
          window.$SendToKindle&&window.$SendToKindle.Widget?$SendToKindle.Widget.init({
            "content": "div.topart div.telo, div.art div.telo",
            "title": "title",
            "author": "div.autori",
            "published": "div.datum"
          }):setTimeout(k,500);
        }
      )();
    }
  },
  'ydiot.com/texty': {
    'key' : 'ydiot\.com',
    'todo': function () {
      $('#mailform_block').append('<h4>Pošlete si na čtečku Kindle</h4><div class="kindleWidget" style="display:inline-block;padding:3px;cursor:pointer;font-size:11px;font-family:Arial;white-space:nowrap;line-height:1;border-radius:3px;border:#ccc thin solid;color:black;background:transparent url(\'https://d1xnn692s7u6t6.cloudfront.net/button-gradient.png\') repeat-x;background-size:contain;"><img style="vertical-align:middle;margin:0;padding:0;border:none;" src="https://d1xnn692s7u6t6.cloudfront.net/white-15.png" /><span style="vertical-align:middle;margin-left:3px;">Send to Kindle</span></div>');
      (
        function k () {
          window.$SendToKindle&&window.$SendToKindle.Widget?$SendToKindle.Widget.init({
            "content": "div#obsah",
            "exclude": "div#mailform_block, h1",
            "title": "title",
            "author": "meta[name=author]"
          }):setTimeout(k,500);
        }
      )();
    }
  },
  'novinky.cz': {
    'key' : 'novinky\.cz',
    'todo': function () {
      $('#discussionEntry').after('<div class="kindleWidget" style="display:inline-block;padding:3px;cursor:pointer;font-size:11px;font-family:Arial;white-space:nowrap;line-height:1;border-radius:3px;border:#ccc thin solid;color:black;background:transparent url(\'https://d1xnn692s7u6t6.cloudfront.net/button-gradient.png\') repeat-x;background-size:contain;"><img style="vertical-align:middle;margin:0;padding:0;border:none;" src="https://d1xnn692s7u6t6.cloudfront.net/white-15.png" /><span style="vertical-align:middle;margin-left:3px;">Send to Kindle</span></div>');
      (
        function k () {
          $('#articleBody').prepend(
            '<p style="display:none"><em>' + $('p.perex').html() + '</em></p>'
          );
          $('#articleBody p.publicDate').remove();
          window.$SendToKindle&&window.$SendToKindle.Widget?$SendToKindle.Widget.init({
            "content": "#contentArticleBox",
            "exclude": "",
            "title": "div.articleHeader h1",
            "author": "#movedArticleAuthors",
            "published": "#articleDate"
          }):setTimeout(k,500);
        }
      )();
    }
  },
  'sport.cz': {
    'key' : 'sport\.cz',
    'todo': function () {
      $('#sklik').before('<div style="display: block; margin: .5em 0; text-align: right;"><div class="kindleWidget" style="display:inline-block;padding:3px;cursor:pointer;font-size:11px;font-family:Arial;white-space:nowrap;line-height:1;border-radius:3px;border:#ccc thin solid;color:black;background:transparent url(\'https://d1xnn692s7u6t6.cloudfront.net/button-gradient.png\') repeat-x;background-size:contain;"><img style="vertical-align:middle;margin:0;padding:0;border:none;" src="https://d1xnn692s7u6t6.cloudfront.net/white-15.png" /><span style="vertical-align:middle;margin-left:3px;">Send to Kindle</span></div></div>');
      (
        function k () {
          $('#article-text').prepend(
            '<p style="display:none"><em>' + $('#perex').html() + '</em></p>'
          );
          window.$SendToKindle&&window.$SendToKindle.Widget?$SendToKindle.Widget.init({
            "content": "#article-text",
            "exclude": "",
            "title": "h1#article-title",
            "author": "div.author",
            "published": "div#article-content span.date"
          }):setTimeout(k,500);
        }
      )();
    }
  },
  'national-geographic.cz': {
    'key' : 'national\-geographic\.cz',
    'todo': function () {
      $('div#center-in > div.left > div.socials ul').append('<li><div style="display: block; margin: .5em 0; text-align: right;"><div class="kindleWidget" style="display:inline-block;padding:3px;cursor:pointer;font-size:11px;font-family:Arial;white-space:nowrap;line-height:1;border-radius:3px;border:#ccc thin solid;color:black;background:transparent url(\'https://d1xnn692s7u6t6.cloudfront.net/button-gradient.png\') repeat-x;background-size:contain;"><img style="vertical-align:middle;margin:0;padding:0;border:none;" src="https://d1xnn692s7u6t6.cloudfront.net/white-15.png" /><span style="vertical-align:middle;margin-left:3px;">Send to Kindle</span></div></div></li>');
      (
        function k () {
          $('div#center-in > div.left > div.mceTemp').prepend(
            '<p style="display:none">' + $('div#center-in > div.left > div.fllb > p.perex').html() + '</p>'
          );
          window.$SendToKindle&&window.$SendToKindle.Widget?$SendToKindle.Widget.init({
            "content": "div#center-in > div.left > div.mceTemp",
            "exclude": "",
            "title": "h1.over-image > span",
            "author": "div#center-in > div.left > div.profile-a > h3",
            "published": "div#center-in > div.left div.date"
          }):setTimeout(k,500);
        }
      )();
    }
  },
  'wikipedia.org': {
    'key' : '\.wikipedia\.org',
    'todo': function () {
      $('#content').prepend('<div style="display: block; margin: .5em 0;"><div class="kindleWidget" style="display:inline-block;padding:3px;cursor:pointer;font-size:11px;font-family:Arial;white-space:nowrap;line-height:1;border-radius:3px;border:#ccc thin solid;color:black;background:transparent url(\'https://d1xnn692s7u6t6.cloudfront.net/button-gradient.png\') repeat-x;background-size:contain;"><img style="vertical-align:middle;margin:0;padding:0;border:none;" src="https://d1xnn692s7u6t6.cloudfront.net/white-15.png" /><span style="vertical-align:middle;margin-left:3px;">Send to Kindle</span></div></div>');
      (
        function k () {
          $('#article-text').prepend(
            '<p style="display:none"><em>' + $('#perex').html() + '</em></p>'
          );
          window.$SendToKindle&&window.$SendToKindle.Widget?$SendToKindle.Widget.init({
            "content": "#mw-content-text",
            "exclude": "",
            "title": "h1#firstHeading",
            "author": "",
            "published": ""
          }):setTimeout(k,500);
        }
      )();
    }
  },
  'prigl.cz': {
    'key' : 'prigl\.cz',
    'todo': function () {
      $('#column-left > article').after('<div style="display: inline-block; margin: 0 2em 0 0; vertical-align: top; border: 1px solid #999999; border-radius: 2px; height: 45px; padding: .5em; background: linear-gradient(#fee, #fff) #fee"><div class="kindleWidget" style="display:inline-block;padding:3px;cursor:pointer;font-size:11px;font-family:Arial;white-space:nowrap;line-height:1;border-radius:3px;border:#ccc thin solid;color:black;background:transparent url(\'https://d1xnn692s7u6t6.cloudfront.net/button-gradient.png\') repeat-x;background-size:contain;"><img style="vertical-align:middle;margin:0;padding:0;border:none;" src="https://d1xnn692s7u6t6.cloudfront.net/white-15.png" /><span style="vertical-align:middle;margin-left:3px;">Send to Kindle</span></div></div>');
      (
        function k () {
          $('#article-text').prepend(
            '<p style="display:none"><em>' + $('#perex').html() + '</em></p>'
          );
          window.$SendToKindle&&window.$SendToKindle.Widget?$SendToKindle.Widget.init({
            "content": "#column-left > article",
            "exclude": "",
            "title": "title",
            "author": "",
            "published": ""
          }):setTimeout(k,500);
        }
      )();
    }
  },
  'parlamentnilisty.cz': {
    'key' : 'www\.parlamentnilisty\.cz',
    'todo': function () {
      $('section.article-header div.social-media-buttons').prepend('<div class="kindleWidget" style="display:inline-block;padding:3px;cursor:pointer;font-size:11px;font-family:Arial;border-radius:3px;border:#ccc thin solid;color:black;background:transparent url(\'https://d1xnn692s7u6t6.cloudfront.net/button-gradient.png\') repeat-x;background-size:contain;"><img style="vertical-align:middle;margin:0;padding:0;border:none;" src="https://d1xnn692s7u6t6.cloudfront.net/white-15.png" /><span style="vertical-align:middle;margin-left:3px;">Send to Kindle</span></div>');
      (
        function k () {
          $('section.article-content').prepend(
            '<p style="display:none"><em>' + $('section.article-header > p.brief').html() + '</em></p>'
          );
          window.$SendToKindle&&window.$SendToKindle.Widget?$SendToKindle.Widget.init({
            "content": "section.article-content",
            "exclude": "section.article-content section",
            "title": ".article-header > h1",
            "author": "section.section-inarticle > strong",
            "published": "section.article-header div.time"
          }):setTimeout(k,500);
        }
      )();
    }
  }

  
};

var h = this.location.host;
for (var i in servers) {
  if (h.match(servers[i]['key'])) {
    servers[i]['todo']();
  }
}
