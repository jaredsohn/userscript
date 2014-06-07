// ==UserScript==
// @name           Twitter - kATakOto SPEAKER
// @namespace      http://d.hatena.ne.jp/koyachi/
// @description    icanspeakjapanese
// @include        http://twitter.com/*
// ==/UserScript==
//
// 2008-06-05 t.koyachi
//   suuji chot yome masu
//
// 2008-06-04 t.koyachi
//

(function(){

function log(msg) {
  if (console && console.log) console.log(msg);
}

function extend(self, other){
  for (var key in other) self[key] = other[key];
  return self;
}

function keys(obj) {
  var rval = [];
  for (var prop in obj) {
    rval.push(prop);
  }
  return rval;
}

Array.prototype.forEach = function(callback, thisObject) {
  for (var i=0, length=this.length; i < length; i++) {
	callback.call(thisObject, this[i], i, this);
  }
};

function makeRequestUrl(baseUrl, paramHash) {
  var params = [];
  keys(paramHash).forEach(function(k) {
    params.push(k + '=' + paramHash[k]);
  });
  return baseUrl + '?' + params.join('&');
}
  
with(D()) {
  var Yahoo = {};
  Yahoo.MAService = {
    _defaultOption: {
      appid: 'YahooDemo'
//    sentence: '',
//    results: 'ma,uniq',
//    response: 'reading'
//    filter: '',
//    ma_response: '',
//    ma_filter: '',
//    uniq_response: '',
//    uniq_filter: '9|10'
//    uniq_by_baseform: ''
    }
    ,
    request: function(params) {
      extend(params, Yahoo.MAService._defaultOption);
      params.sentence = encodeURIComponent(params.sentence);
      var url = makeRequestUrl('http://api.jlp.yahoo.co.jp/MAService/V1/parse',
                               params);
      log(url);
      return xhttp.get(url);
    }
  };
  Yahoo.SpeechEnglish = {
    request: function(sentence) {
      var url = makeRequestUrl('http://tts.eng.stepup.yahoo.co.jp/tts/tts4.php?spell%3D' + encodeURIComponent(sentence));
      log(url);
      return xhttp.get(url).next(function(data){
        var proxy_url = data.responseText.match(/<fname>(.*?)<\/fname>/)[1];
        log(proxy_url);
        return proxy_url;
      });
    }
  };

  function japaneseYomi(sentence) {
    return Yahoo.MAService.request({
      sentence: sentence,
      response: 'reading'
    }).next(function(data) {
      var yomi = "";
      var re = /<\s*?reading\s*?>(.*?)<\s*?\/reading\s?>/g;
      while (re.exec(data.responseText)) {
        yomi += RegExp.$1 + " ";
      }
      return yomi;
    });
  }

/*
    var hiragana = ["ぁあぃいぅうぇえぉおかがきぎくぐけげこご",
                    "さざしじすずせぜそぞただちぢっつづてでとど",
                    "なにぬねのはばぱひびぴふぶぷへべぺほぼぽ",
                    "まみむめもゃやゅゆょよらりるれろゎわゐゑをん"
    ].join('');
    var cp_start = 0x3041;
    var cp_end = 0x3093;
*/
  var dic_hira2roma = {};
  var dic_digit = {
    10: "ju",
    100: "hyaku",
    1000: "senn",
    10000: "man"
  };
  var digit_inverted_index = keys(dic_digit).sort(function(a,b){ return b - a });
  unsafeWindow.dic_hira2roma = dic_hira2roma;
  (function mkdic() {
    var shiin = "aiueo".split('');
    [
     { hira: "ぁぃぅぇぉ", boin: '' },
     { hira: "あいうえお", boin: '' },
     { hira: "かきくけこ", boin: 'k' },
     { hira: "がぎぐげご", boin: 'g' },
     { hira: "さしすせそ", boin: 's' },
     { hira: "ざじずぜぞ", boin: 'z' },
     { hira: "たちつてと", boin: 't' },
     { hira: "だぢづでど", boin: 'd' },
     { hira: "なにぬねの", boin: 'n' },
     { hira: "はひふへほ", boin: 'f' },
     { hira: "ばびぶべぼ", boin: 'b' },
     { hira: "ぱぴぷぺぽ", boin: 'p' },
     { hira: "まみむめも", boin: 'm' },
     { hira: "らりるれろ", boin: 'r' }
    ].forEach(function(h) {
      h.hira.split('').forEach(function(aiueo, i) {
        dic_hira2roma[aiueo] = h.boin + shiin[i];
      });
    });
    var shiin2 = "auo".split('');
    [
     { hira: "やゆよ", boin: 'y' },
     { hira: "ゃゅょ", boin: 'hy' }
    ].forEach(function(h) {
      h.hira.split('').forEach(function(auo, i) {
        dic_hira2roma[auo] = h.boin + shiin2[i];
      });
    });
    /*var xxx = "っわゐゑをん";*/
    extend(dic_hira2roma, {
        "っ": "",
        "わ": "wa",
        "ゐ": "i",
        "ゑ": "e",
        "を": "wo",
        "ん": "n"
    });
    extend(dic_hira2roma, {
      "0": "zero",
      "1": "ichi",
      "2": "ni",
      "3": "sann",
      "4": "she",
      "5": "go",
      "6": "rock",
      "7": "shichi",
      "8": "hachi",
      "9": "qck"
    });
  })();
  function HiraganaToRoman(hira) {
    var result = '';
    var words = hira.split(' ');
    words.forEach(function(word){
      word = word.toLowerCase();
      if (word.match(/[a-z]/)) {
        result += word;
      }
      else if (word.match(/[0-9]/)) {
        var digitStack = [];
        while (word.length) {
          for (var i=0,length=digit_inverted_index.length; i < length; i++) {
            var keta = digit_inverted_index[i];
            if (word / keta >= 1) {
              var digit = dic_hira2roma[word.slice(0,1)];
              if (digit == "1") digit = "";
              digitStack.push(digit,
                              dic_digit[keta]);
              word = word.slice(1);
              break;
            }
          }
          if (i == length) {
            digitStack.push(dic_hira2roma[word.slice(0,1)]);
            break;
          }
        }
        result += digitStack.join(" ");
      }
      else {
        word.split('').forEach(function(h) {
          result += (dic_hira2roma[h]) ? dic_hira2roma[h] : ' ';
        });
      }
      result += ' ';
    });
    log(result);
    return result;
  }

// main ----------------------------------------------------------------------
  function getKatakotoMP3(sentence){
    return japaneseYomi(sentence/*"今夜が山田"*/)
    .next(function(yomi) {
      return Yahoo.SpeechEnglish.request(HiraganaToRoman(yomi));
    });
  }


// many functions stolen from http://userscripts.org/scripts/show/25484

// HoHoHo! : Design : Brand Spanking New
// http://www.brandspankingnew.net/archive/2006/12/hohoho.html
var IMG_SAVE = 'data:image/gif,GIF89a%0A%00%0A%00%B3%00%00333%E1%E1%E1%C3%C3%C3%7F%7F%7Ffff%FF%FF%FF%99%99%99%90%90%90%FF%CC%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%07%00%08%00%2C%00%00%00%00%0A%00%0A%00%00%04)P%9CI%0FBD%98P%BA%B1%D9%D6%15%86%40%84%9CgfC%EB%AEB%2C%C7%A70%8Ep%A0%EF%F0%DD%99%02%80p(%14D%00%00%3B';
var IMG_SOUND = 'data:image/gif,GIF89a%0A%00%0A%00%A2%00%00333%DC%DC%DC%99%99%99%90%90%90fff%C5%C5%C5%FF%CC%FF%F0%F0%F0!%F9%04%01%07%00%06%00%2C%00%00%00%00%0A%00%0A%00%00%03%25h%BA%B3n%83%3C5%8E4d%8CR%83%94%5BA%04%A2%92%15%A2Pb%000%00%85%F0%3D%F0u-%C0%3D%01K%02%00%3B';

var imgSound = new Image();
imgSound.src = IMG_SOUND;
imgSound.style.cursor = 'pointer';

function appendSpeaker(ctxs){
  [].concat(ctxs).forEach(function(ctx){
    [].concat($x('.//span[contains(@class,"entry-content")]', ctx), $x('.//div[@class="desc"]/p[1]', ctx)).forEach(function(e){
      var img = imgSound.cloneNode(false);
      var link = document.createElement('a');
      link.appendChild(img);
      insertAfter(e, link).addEventListener('click', function(){
        link.removeEventListener('click', arguments.callee, true);
      
        getKatakotoMP3(e.textContent).next(function(mp3_url){
          img.src = IMG_SAVE;
          link.href = mp3_url;

          var mp3 = update(unsafeWindow.document.createElement('embed'), {
            width : 200,
            height : 30,
            enablejavascript : true,
            autostart : false,
            loop : false,
            panel : 1,
            src : mp3_url,
            postdomevents : true,
            type : 'audio/mpeg',
            kioskmode : false,
            controller : true
          });
          insertAfter(insertAfter(link, document.createElement('br')), mp3);
        
          var id = setInterval(function(){
            switch (mp3.GetPluginStatus()) {
              case 'Playable':
              case 'Complete':
              clearInterval(id);
              mp3.SetRate(0.7 + Math.random() * 0.6);
              break;
            }
          }, 16);
        });
      }, true);
    });
  });
}

  appendSpeaker(document);
  window.AutoPagerize && window.AutoPagerize.addFilter(appendSpeaker);
}

// lib -----------------------------------------------------------------------

// cho45 - http://lowreal.net/
function $x(exp, context) {
  var Node = unsafeWindow.Node;
  if (!context) context = document;
    var resolver = function (prefix) {
      var o = document.createNSResolver(context)(prefix);
      return o ? o : (document.contentType == "text/html") ? "" :
        "http://www.w3.org/1999/xhtml";
      }
  var exp = document.createExpression(exp, resolver);
  
  var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
  switch (result.resultType) {
    case XPathResult.STRING_TYPE : return result.stringValue;
    case XPathResult.NUMBER_TYPE : return result.numberValue;
    case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
    case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
      result = exp.evaluate(context,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      var ret = [];
      for (var i = 0, len = result.snapshotLength; i < len ; i++) {
        var item = result.snapshotItem(i);
        switch (item.nodeType) {
          case Node.ELEMENT_NODE:
          ret.push(item);
          break;
          case Node.ATTRIBUTE_NODE:
          case Node.TEXT_NODE:
          ret.push(item.textContent);
          break;
          }
        }
      return ret;
      }
    }
  return null;
}

function trim(str){
  return str.replace(/^\s+|\s+$/g, '');
}

function insertAfter(target, node){
  return target.parentNode.insertBefore(node, target.nextSibling);
}

function update(obj, params){
  if(obj.setAttribute){
    for(var key in params)
      obj.setAttribute(key, params[key]);
    } else {
      for(var key in params)
        obj[key] = params[key];
      }
  return obj;
}

// Usage:: with (D()) { your code }
// JSDefeered 0.2.1 (c) Copyright (c) 2007 cho45 ( www.lowreal.net )
// See http://coderepos.org/share/wiki/JSDeferred
function D () {


function Deferred () { return (this instanceof Deferred) ? this.init(this) : new Deferred() }
Deferred.prototype = {
	init : function () {
		this._next    = null;
		this.callback = {
			ok: function (x) { return x },
			ng: function (x) { throw  x }
		};
		return this;
	},

	next  : function (fun) { return this._post("ok", fun) },
	error : function (fun) { return this._post("ng", fun) },
	call  : function (val) { return this._fire("ok", val) },
	fail  : function (err) { return this._fire("ng", err) },

	cancel : function () {
		(this.canceller || function () {})();
		return this.init();
	},

	_post : function (okng, fun) {
		this._next =  new Deferred();
		this._next.callback[okng] = fun;
		return this._next;
	},

	_fire : function (okng, value) {
		var self = this, next = "ok";
		try {
			value = self.callback[okng].call(self, value);
		} catch (e) {
			next  = "ng";
			value = e;
		}
		if (value instanceof Deferred) {
			value._next = self._next;
		} else {
			if (self._next) self._next._fire(next, value);
		}
		return this;
	}
};

Deferred.parallel = function (dl) {
	var ret = new Deferred(), values = {}, num = 0;
	for (var i in dl) if (dl.hasOwnProperty(i)) {
		(function (d, i) {
			d.next(function (v) {
				values[i] = v;
				if (--num <= 0) {
					if (dl instanceof Array) {
						values.length = dl.length;
						values = Array.prototype.slice.call(values, 0);
					}
					ret.call(values);
				}
			}).error(function (e) {
				ret.fail(e);
			});
			num++;
		})(dl[i], i);
	}
	if (!num) Deferred.next(function () { ret.call() });
	ret.canceller = function () {
		for (var i in dl) if (dl.hasOwnProperty(i)) {
			dl[i].cancel();
		}
	};
	return ret;
};

Deferred.wait = function (n) {
	var d = new Deferred(), t = new Date();
	var id = setTimeout(function () {
		clearTimeout(id);
		d.call((new Date).getTime() - t.getTime());
	}, n * 1000)
	d.canceller   = function () { try { clearTimeout(id) } catch (e) {} };
	return d;
};

Deferred.next = function (fun) {
	var d = new Deferred();
	var id = setTimeout(function () { clearTimeout(id); d.call() }, 0);
	if (fun) d.callback.ok = fun;
	d.canceller   = function () { try { clearTimeout(id) } catch (e) {} };
	return d;
};

Deferred.call = function (f, args) {
	args = Array.prototype.slice.call(arguments);
	f    = args.shift();
	return Deferred.next(function () {
		return f.apply(this, args);
	});
};

Deferred.loop = function (n, fun) {
	var o = {
		begin : n.begin || 0,
		end   : n.end   || (n - 1),
		step  : n.step  || 1,
		last  : false,
		prev  : null
	};
	var ret, step = o.step;
	return Deferred.next(function () {
		function _loop (i) {
			if (i <= o.end) {
				if ((i + step) > o.end) {
					o.last = true;
					o.step = o.end - i + 1;
				}
				o.prev = ret;
				ret = fun.call(this, i, o);
				if (ret instanceof Deferred) {
					return ret.next(function (r) {
						ret = r;
						return Deferred.call(_loop, i + step);
					});
				} else {
					return Deferred.call(_loop, i + step);
				}
			} else {
				return ret;
			}
		}
		return Deferred.call(_loop, o.begin);
	});
};

Deferred.register = function (name, fun) {
	this.prototype[name] = function () {
		return this.next(Deferred.wrap(fun).apply(null, arguments));
	};
};

Deferred.wrap = function (dfun) {
	return function () {
		var a = arguments;
		return function () {
			return dfun.apply(null, a);
		};
	};
};

Deferred.register("loop", Deferred.loop);
Deferred.register("wait", Deferred.wait);

Deferred.define = function (obj, list) {
	if (!list) list = ["parallel", "wait", "next", "call", "loop"];
	if (!obj)  obj  = (function () { return this })();
	for (var i = 0; i < list.length; i++) {
		var n = list[i];
		obj[n] = Deferred[n];
	}
	return Deferred;
};



function xhttp (opts) {
	var d = Deferred();
	if (opts.onload)  d = d.next(opts.onload);
	if (opts.onerror) d = d.error(opts.onerror);
	opts.onload = function (res) {
		d.call(res);
	};
	opts.onerror = function (res) {
		d.fail(res);
	};
	GM_xmlhttpRequest(opts);
	return d;
}
xhttp.get  = function (url)       { return xhttp({method:"get",  url:url}) }
xhttp.post = function (url, data) { return xhttp({method:"post", url:url, data:data, headers:{"Content-Type":"application/x-www-form-urlencoded"}}) }


function http (opts) {
	var d = Deferred();
	var req = new XMLHttpRequest();
	req.open(opts.method, opts.url, true);
	if (opts.headers) {
		for (var k in opts.headers) if (opts.headers.hasOwnProperty(k)) {
			req.setRequestHeader(k, opts.headers[k]);
		}
	}
	req.onreadystatechange = function () {
		if (req.readyState == 4) d.call(req);
	};
	req.send(opts.data || null);
	d.xhr = req;
	return d;
}
http.get  = function (url)       { return http({method:"get",  url:url}) }
http.post = function (url, data) { return http({method:"post", url:url, data:data, headers:{"Content-Type":"application/x-www-form-urlencoded"}}) }

Deferred.Deferred = Deferred;
Deferred.http     = http;
Deferred.xhttp    = xhttp;
return Deferred;
}// End of JSDeferred

})();
