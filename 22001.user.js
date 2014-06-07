// ==UserScript==
// @name           LDR Ad-Entry Blocker
// @namespace      http://endflow.net/
// @description    Block advertisement entries such as "AD: ...", "PR: ..." on LDR and fLDR.
// @include        http://reader.livedoor.com/reader/*
// @include        http://fastladder.com/reader/*
// @version        0.1.7
// ==/UserScript==
// @author         Yuki KODAMA {twitter: kuy, skype: netkuy}
// @history        [2007-11-05] 0.1.0 first version
//                 [2007-11-20] 0.1.1 cleaned
//                 [2007-12-07] 0.1.2 added option: skip ad-entry
//                 [2008-02-01] 0.1.3 supported Opera
//                 [2008-06-19] 0.1.4 supported fLDR
//                 [2009-04-20] 0.1.5 fixed to skip consecutive blocked entries
//                 [2009-04-30] 0.1.6 bugfix: infinite-loop
//                 [2010-06-11] 0.1.7 bugfix: yet another infinite-loop

(function(){
/////////////// configurations ////////////////
var cfg = {
    // judgement patterns of entry title
    patterns: [/^[\s【]*(AD|PR|ＡＤ|ＰＲ)[\s】]*[:：]/i],
    // advertisement entries style (apply this style to title link <a>)
    style: {
        color: '#aaa',
        fontSize: '12px'
    },
    // apply interval
    interval: 1000,
    // skip ad-entry
    skip: true
}
///////////////////////////////////////////////
var w = this.unsafeWindow || window;
w.addEventListener('load', function(){with(w){
    register_hook('AFTER_PRINTFEED', function() {
        var hist = [];
        var isComp = function(){
            var len = hist.length;
            if(len < 3) return false;
            return hist[len-1] == hist[len-2] && hist[len-2] == hist[len-3];
        }
        var blocker = function(){
            var titles = $x('//h2[@class="item_title"]/a');
            hist.push(titles.length);
            for(var i = 0; i < titles.length; i++){
                var title = titles[i];
                for(var j = 0; j < cfg.patterns.length; j++){
                    if((new RegExp(cfg.patterns[j])).test(title.innerHTML)){
                        setStyle(title, cfg.style);
                        addClass(title.parentNode, 'laeb_blocked');
                        var childs = title.parentNode.parentNode.parentNode.childNodes;
                        for(var k = 0; k < childs.length; k++){
                            if(childs[k].nodeType !== 1 || hasClass(childs[k], 'item_header')) continue;
                            DOM.hide(childs[k]);
                        }
                        break;
                    }
                }
            }
            isComp() || setTimeout(blocker, cfg.interval);
        }
        setTimeout(blocker, cfg.interval);
    });
    if(cfg.skip){
        var isEnd = function(dir){
            var pos = get_active_item();
            return dir ? pos == get_active_feed().items.length - 1 : pos == 0
        }
        var j_func = Keybind._keyfunc['j'];
        Keybind.add('j|enter', function(){
            do{
                j_func();
            }while(!isEnd(true) && hasClass(get_active_item(true).element, 'laeb_blocked'));
        });
        var k_func = Keybind._keyfunc['k'];
        Keybind.add('k|shift+enter', function(){
            do{
                k_func();
            }while(!isEnd(false) && hasClass(get_active_item(true).element, 'laeb_blocked'));
        });
    }
}}, false);
function $x(x,c){c=c||document;var res=document.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=res.iterateNext();nodes.push(i));return nodes}
})();
