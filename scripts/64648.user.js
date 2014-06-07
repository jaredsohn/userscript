// ==UserScript==
// @name Polish torrents magnet
// @description Adding magnet link for polish torrents
// @include http://polskie-torrenty.pl/*
// @include http://bitnova.info/*
// @include http://vtorrent.pl/*
// @include http://www.torrent-polska.eu/*
// @include http://tnttorrent.info/*
// @include http://tik2.akate.pl/*
// @include http://torrent-polska.info/*
// @include http://www.cracksearchengine.net/*
// @include http://torrentbay.pl/*
// @include http://www.torrentz.ru/*
// @include http://darmowe-torrenty.org/*
// @include http://itorrent.net.pl/*
// @include http://torrent-y.net/*
// @include http://www.torrenthound.com/*
// @include http://torrents24.pl/*
// @include http://www.imdb.com/*
// @include http://pro.imdb.com/*
// @include http://www.redmp3.pl/*
// @include http://www.torrentsdownload.net/*
// @include http://viptorrent.pl/*
// @include http://torrentrs.com/*
// @include http://www.picktorrent.com/*
// @include http://www.elitetorrent.pl/*
// @include http://torrentday.pl/*
// @include http://btjunkie.org/*
// @include http://bitstrefa.net/*
// @include http://torrentos.com.pl/*
// @include http://e-torrent.pl/*
// @include http://torrentsearch.pl/*
// @include http://www.asiatorrents.com/*
// @include http://torrentfile.info/*
// @include http://torrent-spider.pl/*
// @include http://torrentosy.pl/*
// @include http://www.rockstargames.com/*
// @include http://www28.zippyshare.com/*
// @include http://isohunt.com/*
// @include http://best-torrents.pl/*
// @include http://thepiratebay.org/*
// @include http://www.monova.org/*
// @include http://zalukaj.pl/*
// ==/UserScript==

document.onLoad = createMagnetLink();

function createMagnetLink()
{
  var p1 = new RegExp("[\\s|>]([0123456789abcdef]{40})(\\s|<)");
  var p2 = new RegExp("[\\s|>]([ABCDEFGHIJKLMNOPQRSTUVWXYZ234567]{32})(\\s|<)");
  var html = document.body.innerHTML;
  html = html.replace(p1, '<a href="magnet:?xt=urn:btih:$1"><img border="0" src="' + getDownloadImageBase64() + '"></a>$2');
  html = html.replace(p2, '<a href="magnet:?xt=urn:btih:$1"><img border="0" src="' + getDownloadImageBase64() + '"></a>$2');
  document.body.innerHTML = html;
}

function getDownloadImageBase64() {
	return "data:image/png;base64,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";
}