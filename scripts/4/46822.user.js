// ==UserScript==
// @name           Expand url shortening service urls
// @namespace      http://code.google.com/p/ecmanaut/
// @description    Punch through shortened URLs, to unpack the link target
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @include        *
// ==/UserScript==

var busy = "expanding url; one moment...", sites = {}, debug = false;
var count = maybe(function(what) { console.count(what + ":"); });
var log = maybe(function(x) { console.info(x); });

// tested and working (mostly at http://userscripts.org/scripts/show/40582):
add("0rz.tw 55c.cc alturl.com alturl.com b23.ru bacn.me bit.ly bitly.com bloat.me budurl.com burnurl.com chilp.it cli.gs cloakreferer.com digg.com doiop.com dwarfurl.com fff.to gol.ly href.in hub.tm hurl.me i5.be idek.net is.gd kl.am korta.nu lin.cr linkbee.com ln-s.net lnkd.in merky.de migre.me minify.me minurl.fr moourl.com moveto.ws ninjalink.com peaurl.com piurl.com pnt.me ponyurl.com poprl.com r.im reallytinyurl.com reque.st rubyurl.com short.ie short.la smallr.com snipr.com snipurl.com snurl.com so-smart.be tighturl.com tii.li tiny.cc tinyurl.com to.ly togoto.us tr.im tra.kz twurl.nl u.mavrev.com ur1.ca url.az url.ie urlcut.com urlenco.de wurl.ws xii.li xrl.us yep.it zurl.ws zz.gd");

// stuff listed on http://mashable.com/2008/01/08/url-shortening-services/ that
// hasn't been tested if they work automagically, or need custom tuning, below:
add("a2n.eu azqq.com b65.us beam.to c-o.in canurl.com curio.us cuturls.com decenturl.com digipills.com dn.vc durl.us easyurl.net ezurl.eu faceto.us fhurl.com flingk.com fly2.ws get-shorty.com get-url.com groups.to hotredirect.com hurl.it iscool.net just.as ks37024.kimsufi.com linkslice.com liteurl.net lnk.in memurl.com metamark.net myurl.in nanoref.com ne1.net netshortcut.com notlong.com nutshellurl.com oboeyasui.com paulding.net profile.to quickurl.co.uk redirx.com shim.net shorl.com shortenurl.com shorterlink.com shortio.com shortlinks.co.uk shorturl.com shoturl.us shrinkr.com shrinkurl.us shurl.net sitelutions.com starturl.com tiniuri.com traceurl.com truncurl.com tubeurl.com turo.us tweetl.com twittu.ms u76.org ulimit.com url.co.uk url.lotpatrol.com urlao.com urlbee.com urlcutter.com urlhawk.com urltea.com vdirect.com wapurl.co.uk x.se");

// other services handled by longurl.org that we maybe handle natively too:
add("›.ws ✩.ws ✿.ws ❥.ws ➔.ws ➞.ws ➡.ws ➨.ws ➯.ws ➹.ws ➽.ws 2tu.us a.gg a.nf ad.vu adjix.com atu.ca b65.com buk.me cliccami.info ff.im fwdurl.net g8l.us go.9nl.com goshrink.com hex.io hurl.ws icanhaz.com liip.to liltext.com linkgap.com liurl.cn lnkurl.com lru.jp lurl.no minilien.com nn.nf offur.com onsaas.info parv.us ping.fm plumurl.com ptiturl.com redirects.ca ri.ms s3nt.com s7y.us shink.de shredurl.com shrinkify.com shrtnd.com shw.me smurl.com sn.im sn.vc snadr.it spedr.com srs.li surl.co.uk ta.gd tgr.me tinylink.com twiturl.de ub0.cc urlborg.com urlbrief.com urlkiss.com urlpire.com urlvi.be wipi.es xil.in yatuc.com zi.ma");

// Stuff at http://userscripts.org/scripts/show/40582 that we don't yet support
//add("6url.com lnk.by arm.in kissa.be nsfw.in ow.ly qurlyq.com short.to shuurl.com simurl.com slnk.me unhub.com w3t.org shortener.net elfurl.com");

expand();
listen();
window.addEventListener("unload", unlisten, true);

// also tested and not working:
// p.zurl.ws => api
// 6url.com  => landing page with "Click here to proceed" link forward

// function add(p) { p.split(" ").forEach(function(u) { s[u]=s["www."+u]=u; }); }
//function sub(p) { x={};p.split(" ").map(function(u) { if(!s[u])x[u]=1; return x; }); }
// prompt(1,keys(sub()).sort().join(" "));

function add(hostnames) {
  hostnames.split(" ").forEach(function(u) {
    count("#services");
    sites[u] = sites["www."+u] = u;
  });
}

function maybe(what) {
  return debug ? what : function() {};
}

function listen() {
  document.body.addEventListener("DOMSubtreeModified", expand, false);
}

function unlisten() {
  document.body.removeEventListener("DOMSubtreeModified", expand, false);
}

function expand(event) {
  if (event)
    $x('.//a[@href]', event.target).filter(isShort).forEach(getLink);
  else
    Array.filter(document.links, isShort).forEach(getLink);
}

function isShort(a) {
  return sites[a.hostname] &&
    location.hostname != a.hostname &&
    /^\/[^\/]+\/?$/.test((a.pathname || "") + (a.search || ""));
}

function getLink(a) {
  count("peeked at");
  if (busy == a.title) return;
  a.setAttribute("ot", a.title);
  a.title = busy;
  setTimeout(GM_xmlhttpRequest, 0,
	     { method:"HEAD", url:a.href, a:a, onload:fixLink, onerror:ugh });
}

function ugh() {
  count("failures");
}

function fixLink({ finalUrl:url }) {
  unlisten(); // don't retrigger over these changes:

  var to = urlParse(url);
  var from = this.a;
  var original = from.getAttribute("original-url");
  if (!original) from.setAttribute("original-url", original = from.href);
  var title = (from.getAttribute("route")||"") + sites[from.host] +" => ";
  from.href = url;
  from.title = "";
  if (isShort(to)) {
    count("recursive");
    from.setAttribute("route", title);
    getLink(from, fixLink);
  } else if (urlParse(original).host == to.host) {
    count("unhandled");
    log(url);
  } else {
    count("elongated");
    from.title = title + to.host;
    // if the link content was the useless short url: expand it to the real url
    if (original == from.textContent)
      from.textContent = url;
    else if (trimProtocol(original) == from.textContent)
      from.textContent = trimProtocol(url);
  }

  listen(); // start listening again
}

function urlParse(url) {
  url = url.replace(/^[^:]+:\/*/, "");
  var host = url.split("/")[0];
  var path = url.slice(host.length);
  return { host: host, pathname: path };
}

function trimProtocol(url) {
  return url.replace(/^[^:]*:\/\//, "");
}
