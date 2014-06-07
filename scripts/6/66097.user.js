// ==UserScript==
// @name           Flickr markdown code
// @description    Get markdown code for flickr photos
// @namespace      http://qingbo.net/
// @include        http://www.flickr.com/photos/*
// ==/UserScript==

function getAttr(name, str) {
  var re = new RegExp(name + '="(.*?)"');
  var match = re.exec(str);
  if (match) {
    return match[1];
  } else {
    return '';
  }
}

if (document.getElementById('share-menu-options-embed')) {
  console.log('hello');
  // Change labels
  header = document.getElementById('share-menu-options-embed').getElementsByClassName('share-menu-options-header')[0];
  header.innerHTML = '<span class="caret"></span> Grab the Markdown/BBCode';

  label = document.getElementById('code-types').getElementsByTagName('label')[0];
  label.innerHTML = 'Markdown';

  // Replace HTML code with Markdown
  var postfixes = ['', '-t', '-sq', '-s', '-m', '-z', '-l'];

  for (i in postfixes) {
    postfix = postfixes[i];
    textarea = document.getElementById('share-menu-options-embed-textarea' + postfix);
    if (textarea != null) {
      html = textarea.innerHTML;
      //html = html.replace(/(http:\/\/)(farm[35]\.static\.flickr\.com)/ig, '$1ac4.$2');

      var href = getAttr('href', html);
      var title = getAttr('title', html);
      var src = getAttr('src', html);
      var alt = getAttr('alt', html);
  
      var markdown = '[![' + alt + '](' + src + ')](' + href + ' "' + title + '")';
  
      textarea.innerHTML = markdown;
    }
  }
}
