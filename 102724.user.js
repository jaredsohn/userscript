// ==UserScript==
// @name           www.debian.org edit helper
// @namespace      http://userscripts.org/scripts/show/102724
// @description    (especially for translating) helper tool to edit www.debian.org
// @include        http://127.0.0.1/*
// @include        http://localhost/*
// @include        http://*.localhost/*
// @include        http://www.debian.org/*
// @include        http://www-staging.debian.org/*
// @require        http://userscripts.org/scripts/source/49700.user.js
// @require        http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
// @version        0.0.1.4
// ==/UserScript==
(function(){
var cpl=[]; var cps=[]; var cpt=[]; var ls=[];


//setting start
var langs = ['ja','en'];	// 2-letter language code ie.:***.[en].html
// below become <tag><a href="cpl[i]">cps[i]</a></tag>
//  <tag attr><a title="cvs log for ..." href="http://cvs....">ls[0]ls[3]ls[1]</a></tag>
//eg.: <sup><a href="http://127.0.0.1/deb/cp.cgi?t=index">[cp]</a></sup>
//eg.: <sup><a title="cvs log for english" href="http://cvs.debian.org/webwml/english/index.wml?view=log&amp;cvsroot=webwml">(log)</a></sup>
//var tag = 'sup';
//cpl[0] = 'http://127.0.0.1/deb/cp.cgi?file=1;t=_target_';	// link for copypage, _target_ is replaced with target location
//cps[0] = '[cp]';						// link string for copypage
//cpt is option, adds title attr if defined
//cpl and cps pair can be added more but its index must be a number
var tag = 'sup';
var attr = '';	//start from a space if define such as: var attr = ' class="log"';
ls[0] = '(';
ls[1] = ')';
ls[2] = 'log'; //link string
ls[3] = 'cvs log for ';	// title for log link, become ls[3] lang
cpl[0] = 'http://127.0.0.1/deb/cp.cgi?t=_target_';
cps[0] = '[cp]';
cpt[0] = 'copypage';
cpl[1] = 'http://127.0.0.1/deb/cp.cgi?file=1;t=_target_';
cps[1] = '[file]';
cpt[1] = 'copypage, file direct';
//setting end

var host = location.href.replace(/[^\/]+$/,"");	//実はホストではなく当該ディレクトリまでのURI
// eg.: http://www.debian.org/security/2011/dsa-2226 -> http://www.debian.org/security/2011/
langContainer();

function langContainer(){
  var alllinks = document.getElementsByTagName('a');	//collect all links
  var langs_ = new Array();	// langs_ stores langs already processed
  var i;

  //create div#pageLang if the page has no translation,
  //which means no div#pageLang here so no link will be shown without this
  if(! document.getElementById("langContainer")){
    var ftr = document.getElementById("footer");
    var lc = '<div id="langSelector"><div id="langContainer"></div></div>';
    var fm = '<div id="footermap">';
    ftr.innerHTML = ftr.innerHTML.replace(fm, lc + fm);
  }

  var lc = document.getElementById("langContainer");

  for (i = 0; i < alllinks.length; ++i) {	//look into all links
    var f = alllinks[i].href;	//get link address
    if(f.match(host)){	// exclude other/upper location
      var log = document.createElement(tag);
      // process only links in langContainer since links in langContainer have hreflang attr and others don't
      if(alllinks[i].hreflang){
	link = make_link(alllinks[i].href,alllinks[i].hreflang);
	log.innerHTML = link;
	langs_.push(alllinks[i].hreflang);	//collect langs already processed
	alllinks[i].parentNode.insertBefore(log, alllinks[i].nextSibling);}	//add log link
      //document.getElementById("langContainer").innerHTML += loc(alllinks[i].href) + "<br>"; //for debug
    }
  }

  // check if the URI has lang extension and add to the array if exists
  var hhl = href_have_lang(location.href);
  if(hhl){langs.push(hhl);} langs=u(langs);	//add to the array and uniq
  var i,j;
  var l=[];
  for (i = 0; i < langs.length; ++i) {
    var m = langs[i];
    l[m]=0;	//include first
    for (j = 0; j < langs_.length; ++j) {
      if(m==langs_[j]){l[m]=1;}	// exclude if already processed
    }
    if(l[m]==0){	//process if not yet
      l[m] = '  <' + tag + attr + '>' + make_link(loc(location.href),m,m) + '</' + tag + '>\n';
      lc.innerHTML += l[m];
    }
  }

  for (i = 0; i < cpl.length; ++i) {
    if(cpl[i].length && cps[i].length){	//only do if both are defined
      var cp = cpl[i]; var title;
      if(cpt[i].length){title=' title="' + cpt[i] + '"';}
      cp  = '  <' + tag + attr + '><a'+ title + ' href="' + cp.replace('_target_',loc(location.href)) + '">';
      cp += cps[i] + '</a></' + tag + '>\n';
      lc.innerHTML += cp;
    }
  }
  lc.innerHTML = www_staging() + lc.innerHTML;
}
// lang selection done


// www <-> staging
// 
function www_staging(){
  var e = '';
  var h = location.host;
  if(h != 'www.debian.org'){e += link('www');}
  if(h != 'www-staging.debian.org'){e += link('www-staging');}
  return e;
  function link(host){
    return '<a title="go to ' + host + '" href="'
		+ location.href.replace(h,host + '.debian.org') + '">' 
		+ host.replace(".debian.org","").replace("www-","") + '</a> ';
  }
}


// check if the URI has lang extension and return if exists
function href_have_lang(la){
  la = la.replace(/%00/g,'');
  la = la.replace(/\?.*/,'');
  la = la.replace(/\.html$/,'');
  la = la.match(/\.(en|fr|ja|de|da|sv|es|pt|it|ru|fi|pl|nl|hr|ca|bg|uk|cs|zh|ko|hu|sk|ro|nb|id|tr|el|ar|fa|gl|lt|he|ta|eo|hy|vi|sl)(\-(cn|hk|tw))?$/);
  return RegExp.$1;
}

function make_link(t,hl,here){	//eg.t:http://www.debian.org/distrib/index.bg.html hl:bg
  var lang, link;
  var l = ''; var p = '';
  if(here){l=here.substr(0,2)+' ';}
  lang = find_lang(hl);
//  link = '<a title="' + ls[3] + lang + '" href="http://cvs.debian.org/webwml/';
//  link = '<a title="' + ls[3] + lang + '" href="http://cvs.debian.org/scm/viewvc.php/webwml/';
//  link+= lang + '/' + loc(t) + '.wml?view=log&amp;root=webwml">' + ls[0] + l + ls[2] + ls[1] + '</a>';
  link = '<a title="' + ls[3] + lang + '" href="http://anonscm.debian.org/viewvc/webwml/webwml/';
  link+= lang + '/' + loc(t) + '.wml?view=log">' + ls[0] + l + ls[2] + ls[1] + '</a>';
  return link;
}

// http://blog.macaroniworks.net/2009/06/javascript%e3%81%ae%e9%85%8d%e5%88%97%e5%86%85%e3%81%ae%e9%87%8d%e8%a4%87%e3%82%92%e9%99%a4%e3%81%8f/
function u(array) {
  var storage = {};
  var uniqueArray = [];
  var i,value;
  for ( i=0; i<array.length; i++) {
    value = array[i];
    if (!(value in storage)) {
      storage[value] = true;
      uniqueArray.push(value);
    }
  }
  return uniqueArray;
}

// take 2 bytes lang code(taken from hreflang attr) and return corresponding directory
function find_lang(t){
  if(t=='fr'){return 'french';}
  if(t=='de'){return 'german';}
  if(t=='da'){return 'danish';}
  if(t=='sv'){return 'swedish';}
  if(t=='ja'){return 'japanese';}
  if(t=='es'){return 'spanish';}
  if(t=='pt'){return 'portuguese';}
  if(t=='it'){return 'italian';}
  if(t=='ru'){return 'russian';}
  if(t=='fi'){return 'finnish';}
  if(t=='pl'){return 'polish';}
  if(t=='nl'){return 'dutch';}
  if(t=='hr'){return 'croatian';}
  if(t=='ca'){return 'catalan';}
  if(t=='bg'){return 'bulgarian';}
  if(t=='uk'){return 'ukrainian';}
  if(t=='cs'){return 'czech';}
  if((t=='zh')||(t=='zh-CN')||(t=='zh-HK')||(t=='zh-TW')){return 'chinese';}
  if(t=='ko'){return 'korean';}
  if(t=='hu'){return 'hungarian';}
  if(t=='sk'){return 'slovak';}
  if(t=='ro'){return 'romanian';}
  if(t=='nb'){return 'norwegian';}
  if(t=='id'){return 'indonesian';}
  if(t=='el'){return 'greek';}
  if(t=='tr'){return 'turkish';}
  if(t=='ar'){return 'arabic';}
  if(t=='fa'){return 'persian';}
  if(t=='lt'){return 'lithuanian';}
  if(t=='he'){return 'hebrew';}
  if(t=='ta'){return 'tamil';}
  if(t=='eo'){return 'esperanto';}
  if(t=='vi'){return 'vietnames';}
  if(t=='hy'){return 'armenian';}
  if(t=='sl'){return 'slovene';}
  if(t=='gl'){return 'galician';}
  if(t=='en'){return 'english';}
}

// take a URI and return location (drop scheme, host and extensions)
function loc(t){
  var a,b,c;
/*  var h = location.host;
  if(h == 'anonscm.debian.org' || h == 'cvs.debian.org'){
  a=t.split('english/')[1];
  if(!a){a=location.href.split('japanese/')[1]};
    for( i=0; i<langs.length; i++){
      console.log(i + langs[i]);
      a=t.split(find_lang(langs[i]) + "/")[1];
      if(a){break;};
    }
    if(a){b=a.split('.diff')[0];
      a=b.split('?')[0];
      b=a.replace('Attic/','');
      c=b.replace('.wml','');
    }
  }else{*/
    a=t.split('debian.org/')[1];
    if(!a){a=t.split('localhost/')[1]}; //for local build
    if(!a){a=t.split('deb/')[1]}; //for local test
    if(!a){a=t};
    a=a.replace(/.*debian.org\//,'');
    b=a.split('.html')[0];
    c=b.replace(/\.(en|fr|de|da|sv|ja|es|pt|it|ru|fi|pl|nl|hr|ca|bg|uk|cs|ko|hu|sk|ro|nb|id|el|tr|ar|fa|lt|he|ta|eo|vi|hy|sl|gl|zh\-(cn|hk|tw))$/,'');
//  };
  if(c.match("/$")){c=c+'index'};
  if(c==""){c='index'};
  return c;
}

})();
