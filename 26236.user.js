// ==UserScript==
// @name           Microformatize
// @namespace      http://d.hatena.ne.jp/Constellation/
// @description    apply microformats to this page.
// @include        http://*
// @include        https://*
// @version        0.0.3
// @author         Constellation
//
// for hAtom and xFolk
// ==/UserScript==

const SCRIPT_VERSION = "2008.05.11";

// ------------------------------------------------------------------
// user siteinfo
// ------------------------------------------------------------------
const SITEINFO = [
];

// ------------------------------------------------------------------
// URLS
// ------------------------------------------------------------------
const SITEINFO_URLS = [
'http://wedata.net/databases/Microformatize/items.json'
];

// ------------------------------------------------------------------
// vocabulary
// ------------------------------------------------------------------

const VOCABULARY = {
'HATOM': {
  'class': [
    {name:'hAtom_hfeed',         cl:'hfeed',        },
    {name:'hAtom_hentry',        cl:'hentry',       },
    {name:'hAtom_entry-title',   cl:'entry-title',  },
    {name:'hAtom_entry-content', cl:'entry-content',},
    {name:'hAtom_entry-summary', cl:'entry-summary',},
    {name:'hAtom_updated',       cl:'update',       },
    {name:'hAtom_published',     cl:'published',    },
    {name:'hAtom_author',        cl:'author',       },
  ],
},

'XFOLK': {
  'class': [
    {name:'xFolk_xfolkentry',    cl:'xfolkentry',   },
    {name:'xFolk_taggedlink',    cl:'taggedlink',   },
    {name:'xFolk_description',   cl:'description',  },
  ],
},

// 対応してほしいものがあればいくらでもどうぞ。
'HCARD': {
  'class': [
    {name:'hCard_vcard',         cl:'vcard',        },
    {name:'hCard_fn',            cl:'fn',           },
    {name:'hCard_n',             cl:'n',            },
    {name:'hCard_url',           cl:'url',          },
    {name:'hCard_tel',           cl:'tel',          },
    {name:'hCard_adr',           cl:'adr',          },
    {name:'hCard_geo',           cl:'geo',          },
    {name:'hCard_org',           cl:'org',          },
  ],
},

}

const ALL = {
  'class': [],
  'rel': [
    {name:'next',                cl:'next',         },
    {name:'prev',                cl:'prev',         },
    {name:'bookmark',            cl:'bookmark',     },
  ],
}


// ------------------------------------------------------------------
// phase
// ------------------------------------------------------------------

const PHASE = [
  {type:'SBM'                            },
  {type:'INDIVIDUAL',         sub:'IND'  },
  {type:'SUBGENERAL',         sub:'SUB'  },
  {type:'GENERAL',            sub:'GEN'  },
  {type:'MICROFORMATS',       sub:'MIC'  }
];

const DEBUG = false;
// ------------------------------------------------------------------
// APPLICATION
// ------------------------------------------------------------------

if(!window.Minibuffer) return;
var $X = window.Minibuffer.$X;
var $N = window.Minibuffer.$N;

var Class = function(){return function(){this.initialize.apply(this,arguments)}}

var Microformatize =  new Class();
Microformatize.prototype = {
  initialize: function(){
    this.siteinfo_cache = arguments[0];
    this.siteinfo_local = SITEINFO;
    var self = this;
    window.Microformatize = {
      getMicroformats: function(){return self.getMicroformats()},
    }

    this.initSiteinfo();
    this.initMicroformatize();
  },

  initMicroformatize: function(){
    if(!this.setup) return;
    var self = this;
    this.initMicroformats(document);
    // for AutoPagerize
    var i = 10;
    setTimeout(function(){
      if (window.AutoPagerize && window.AutoPagerize.addDocumentFilter)
        window.AutoPagerize.addDocumentFilter(function(doc){
          self.initMicroformats.apply(self, [doc]);
        });
      else{
        if(i-- > 0)
        setTimeout(arguments.callee, 1000);
      }
    }, 0);
  },

  initMicroformats: function(doc){
    var self = this;
    var fa = this.siteinfo_current.format.split(/\s+/);

    for(var t in ALL){
      ALL[t].forEach(function(e){
        if(self.siteinfo_current[e.name]){
          switch (t){
            case 'class':
              var af = DOM.addClass;
              break;
            case 'rel':
              var af = DOM.addRel;
              break;
          }
          $X(self.siteinfo_current[e.name], doc).
            forEach(function(element){
              af(element, e.cl)
            });
        }
      });
    }

    fa.forEach(function(format){
      var v = VOCABULARY[format.toUpperCase()];
      for(var t in v){
        v[t].forEach(function(e){
          if(self.siteinfo_current[e.name]){
            switch (t){
              case 'class':
                var f = DOM.addClass;
                break;
              case 'rel':
                var f = DOM.addRel;
                break;
            }
            $X(self.siteinfo_current[e.name], doc).
              forEach(function(element){
                f(element, e.cl);
              });
          }
        });
      }
    });
  },

  initSiteinfo: function(){
    if(!this.siteinfo_cache && !this.siteinfo_local.length) return;
    var loc = location.href, self = this;

    this.setup = this.siteinfo_local.some(function(info){
      var re = new RegExp(info.url);
      if(re.test(loc)){
        self.siteinfo_current = info;
        return true;
      }
      return false;
    });

    if(!this.setup)
    this.setup = PHASE.some(function(i){
      return (self.siteinfo_cache[i.type].some(function(info){
        var re = new RegExp(info.url);
        if(re.test(loc)){
          self.siteinfo_current = info;
          return true;
        }
        return false;
      }))? true : false;
    });
  },

  // getter
  getMicroformats: function(){ return this.siteinfo_current },

}

// [Cache Manage]

var Cache =  new Class();
Cache.prototype = {
  initialize: function(){
    var self = this;
    this.state = 'normal';
    this.getSiteinfo();
    if(DEBUG) log(this.cacheInfo);
    GM_registerMenuCommand('Microformatize - reset cache', function(){ self.resetSiteinfo.apply(self, []); });
    if(this.state == 'first') this.resetSiteinfo();
  },

  getSiteinfo: function (){
    if(!(this.cacheInfo = eval(GM_getValue('cache')))){
      if(DEBUG) log('CACHE: first');
      this.state = 'first';
      var t = {info:{}};
      PHASE.forEach(function(i){t.info[i.type] = []});
      this.cacheInfo = t;
    }
  },

  resetSiteinfo: function(){
    if(this.state == 'loading') return;
    this.state = 'loading'
    this.tmp = {};
    var self = this;
    PHASE.forEach(function(i){
      self.tmp[i.type] = [];
    });
    SITEINFO_URLS.forEach(function(url, index) {
      var opt = {
        method: 'GET',
        url: url,
        headers: {
          'User-Agent': navigator.userAgent + ' Greasemonkey (Microformatize)'
        },
        onload: function(res){
          self.setSiteinfo.apply(self, [res, url, index]);
        },
        onerror: function(res){
        },
      }
      window.setTimeout(GM_xmlhttpRequest, 0, opt);
    });
  },

  setSiteinfo: function(res, url, index){
    var self = this;
    var info = [];
    var data = {};
    info = eval(res.responseText)
        .map(function(i){
          var d = i.data;
          d.name = i.name;
          return d;
        })
        .filter(function(i){ return (Cache.isValid(i))? true : false});
    PHASE.forEach(function(i){
      info.filter(function(d){ return (d.type.toUpperCase() == i.type
          || (i.sub && d.type.toUpperCase() == i.sub))? true : false })
          .forEach(function(d){ self.tmp[i.type].push(d) });
      self.tmp[i.type].sort(function(a,b){ return a.urlIndex - b.urlIndex});
      if(DEBUG) log('CACHE: ' + i.type + ':ok');
    });
  
    if (this.tmp) {
      this.cacheInfo = {
        info: this.tmp,
      }
      GM_setValue('cache', this.cacheInfo.toSource());
      if(DEBUG) log(this.cacheInfo)
      this.state = 'normal'
    }
  },
}

Cache.isValid = function(info) {
  var infoProp = ['url', 'format', 'type'];
  if (infoProp.some(function(i){
    if (!info[i])
        return true;
  })) return false;

  try{
    new RegExp(info.url);
  } catch(e) {
    return false;
  }
  return true;
}

var DOM = {};

DOM = {
  addClass: function(e, c){
    var cl = e.className;
    if(!contain(cl, c))
      e.setAttribute('class', cl + ' ' + c);
  },
  addRel: function(e, r){
    var rl = e.getAttribute('rel');
    if(!rl)
      e.setAttribute('rel', r);
    else if(!contain(rl, r))
      e.setAttribute('rel', rl + ' ' + r);
  },
}

function contain(a, b){ return a.indexOf(b) != -1 }

function log() {if(console) console.log.apply(console, Array.slice(arguments));}

var cache = new Cache ();
var microformatize = new Microformatize (cache.cacheInfo.info);
