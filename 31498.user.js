// ==UserScript==
// @name           LDR - OpenGoogleStreetView
// @namespace      http://polog.org/
// @include        http://fastladder.com/reader/*
// @include        http://reader.livedoor.com/reader/*
// ==/UserScript==
// c.f) http://pathtraq.com/analytics?q=http%3A%2F%2Fmaps.google.co.jp%2F*panoid%20http%3A%2F%2Fmaps.google.com%2F*panoid
// some of fuctions are copied from
// LDR Full Feed http://userscripts.org/scripts/show/22702 (c)Constellation 

const KEY = 'S';
const StreetViewMatcher = new RegExp('^http://maps\.google\.(co\.jp|com)\/.*panoid');
var w = unsafeWindow;

var loadStreetView = function(i){
    var c = (i) ? new getItem(i) : new getItem();
    if(!c.item ||
       !(typeof(c.itemURL) == "string" &&
	 c.itemURL.match(StreetViewMatcher)))
	return;
    c.item_container.getElementsByClassName('body')[0].innerHTML = [
	'<iframe width="425" height="240" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="',
	c.itemURL.replace(/maps\.google\.(co\.jp|com)\/.*?\?/, 'maps.google.co.jp/maps/sv?'),
	'"></iframe><br /><small><a href="http://maps.google.co.jp/maps?hl=ja&amp;ie=UTF8&amp;layer=c&amp;cbll=35.718931,139.721788&amp;panoid=dATCc-RfIupptoaBUpz3-g&amp;cbp=1,307.87358189683005,,2,-17.69807871732563&amp;t=h&amp;ll=35.732109,139.723735&amp;spn=0.031423,0.055618&amp;z=15&amp;source=embed" style="color:#0000FF;text-align:left">大きな地図で見る</a></small>'
    ].join('');
}

var timer = setTimeout(function() {
  if (timer) clearTimeout(timer);
  if (typeof w.Keybind != 'undefined' && typeof w.entry_widgets != 'undefined') {
    w.Keybind.add(KEY, function() {
	loadStreetView()
    });
  } else {
    timer = setTimeout(arguments.callee, 100);
  }
});

var getItem = function(item){
  if(item){
    this.item = item;
  } else {
    this.item = w.get_active_item(true);
  }
  if(!this.item) return;
  this.feed = w.get_active_feed();
  this.itemURL = this.item.link;
  this.feedURL = this.feed.channel.link;
  this.id = this.item.id;
  this.item_container = w.$('item_' + this.id);
  this.title = this.item.title;
  this.found = false;
};