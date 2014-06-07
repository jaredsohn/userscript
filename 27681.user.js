// ==UserScript==
// @name           NicoVideo My Ranking
// @namespace      http://endflow.net/
// @description    This script replaces default ranking with your favorite ranking on NicoVideo.
// @include        http://www.nicovideo.jp/*
// ==/UserScript==
// @author         Yuki KODAMA (twitter:kuy, skype:netkuy)
// @version        0.1.1 [2008-06-02]
// @history        [2008-06-02] 0.1.0 first version
//                 [2008-06-23] 0.1.1 update for "NicoVideo Simple UI"

(function(){
/////////////// configurations ////////////////
var cfg = {
	// all, music, ent, anime, game, radio, sport, science, cooking, politics, animal,
	// history, nature, lecture, play, sing, dance, owner, diary, que, chat, test, tw, other
	category: 'game',
	// view, res, mylist
	target: 'view',
	// newarrival, daily, weekly, monthly, total
	period: 'daily'
}
///////////////////////////////////////////////
var ranking = $x('id("PAGEHEADER")//a').filter(function(a){return a.href.indexOf('ranking') != -1})[0];
ranking.href = 'http://www.nicovideo.jp/ranking/' + cfg.target + '/' + cfg.period + '/' + cfg.category;
function $x(x,c){c=c||document;var res=document.evaluate(x,c,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
for(var i,nodes=[];i=res.iterateNext();nodes.push(i));return nodes;}
})();
