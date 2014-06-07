// ==UserScript==
// @name           ILoveHerCommand
// @namespace      http://d.hatena.ne.jp/Constellation/
// @description    press shift-u key and fall in love with her
// @include        http://fastladder.com/reader/*
// @include        http://fastladder.com/public/*
// @include        http://reader.livedoor.com/reader/*
// @include        http://reader.livedoor.com/public/*
// @include        http://4u.straightline.jp/*
// @author         Constellation
// @version        0.0.1
// ==/UserScript==

(function(w){

if(!window.Minibuffer) return;
var $X = window.Minibuffer.$X;
var D  = window.Minibuffer.D

function is4UURL(url){
  return (url.indexOf('http://4u.straightline.jp') == 0)? true : false;
}

function is4UEachPage(url){
  return (url.indexOf('http://4u.straightline.jp/image/') == 0)? true : false;
}

function spClearPins(url){
  unsafeWindow.pin.remove(url);
}

function iLoveHer(link){
  window.Minibuffer.status('4U'+link, "I love her...");
  var d = D();
  d.xhttp.get(link).
  next(function(res){
    return parseHTML(res.responseText);
  }).
  next(getData).
  next(function(url){
    if (!url) throw "you have already post this photo";
    return d.xhttp.get(url);
  }).
  next(function(res){
    window.Minibuffer.status('4U'+link, "I love her...OK", 100);
    d.call();
  }).
  error(function(e){
    window.Minibuffer.status('4U'+link, "I love her...You're turned down by her.", 300);
    d.call();
  });
  return d;
}

function getData(doc){
  // if (trimspace($X('id("content")/descendant::div[contains(concat(" ",@class," "), " fitem ")]/descendant::a', doc)[0].textContent) != 'i love her')
  //   return false;
  var d = 'http://4u.straightline.jp/user/manage/do_register?';
  var src = 'http://' + $X('id("content")/descendant::p[@class="entry-img-src"]', doc)[0].textContent;
  var title = $X('id("content")/descendant::h2/a', doc)[0].textContent;
  var url = d+'src='+encodeURIComponent(src)+'&found_image_site_title='+encodeURIComponent(title);
  return url;
}

function trimspace (str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '')
}

// copied from Pagerization (c) id:ofk
// a little modified
function parseHTML(str) {
  str = str.replace(/^[\s\S]*?<html(?:\s[^>]+?)?>|<\/html\s*>[\S\s]*$/ig, '');
  var res = document.implementation.createDocument(null, 'html', null);
  var range = document.createRange();
  range.setStartAfter(document.body);
  var fragment = range.createContextualFragment(str);
  try {
    fragment = res.adoptNode(fragment); //for Firefox3 beta4
  } catch (e) {
    fragment = res.importNode(fragment, true);
  }
  res.documentElement.appendChild(fragment);
  return res;
}

function getCommand(){
	var fc = '', lc = '', enable = true;
	var loc = window.location.href;
	if(loc == "http://fastladder.com/reader/" ||
	   loc == "http://reader.livedoor.com/reader/"){
		fc = 'pinned-or-current-link';
    lc = '-c';
	}else if(is4UEachPage(loc)){
		fc = 'location';
	}else if(window.LDRize){
		fc = 'pinned-or-current-link';
    lc = '| clear-pin';
	}else {
    enable = false;
  }
	return [fc, lc, enable];
}

window.Minibuffer.addCommand({
  name:'iloveher',
  command: function(stdin){
    var args = this.args;
    var loc = window.location.href
    var urls = []
    var spclearpins = false;

    if(loc == "http://fastladder.com/reader/" ||
        loc== "http://reader.livedoor.com/reader/"){
      var ret = [];
      stdin.forEach(function(url, index){
        ret[index] = url;
      });
      urls = ret;
      spclearpins = true;
    } else if(stdin.every(function(a){return typeof a == 'string'})){
      urls = stdin;
    } else if(stdin.every(function(a){return a && a.nodeName == 'A'})){
      urls = stdin.map(function(node){return node.href});
    }

    urls = urls.filter(is4UURL);
    if(!urls.length) return stdin;

    if(args.length = 1 && args[0] == '-c' && spclearpins){
      urls.forEach(spClearPins);
    }

    var lst = urls.map(iLoveHer);
    if(lst.length > 1){
      with(D()){
        parallel(lst).
        wait(2).
        next(function(){
          window.Minibuffer.status('iloveherCommand', 'Everything is OK', 1000);
        });
      }
    }

    return stdin;
  }
});

window.Minibuffer.addShortcutkey({
    key: 'U',
    description: 'i love her',
    command: function(){
      var fc, lc, enable;
      [fc, lc, enable] = getCommand();
      if(window.location.href == "http://fastladder.com/reader/" ||
        window.location.href == "http://reader.livedoor.com/reader/"){
        if(!window.Minibuffer.execute(fc).filter(is4UURL).length){
          fc = 'current-link';
          lc = '';
        }
      }
      if(enable)
      window.Minibuffer.execute(fc + ' | iloveher ' + lc);
    }
});

})(this.unsafeWindow || this);
