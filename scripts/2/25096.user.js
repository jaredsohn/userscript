// ==UserScript==
// @name           LDRHatebuCountListenable
// @namespace      http://polog.org/
// @include        http://fastladder.com/reader/
// @include        http://reader.livedoor.com/reader/
// ==/UserScript==
// based on
// http://d.hatena.ne.jp/brazil/20071003/1191381382
// http://d.hatena.ne.jp/brazil/20071206/1196905366
// http://d.hatena.ne.jp/kusigahama/20051207
// thx brazil & kusigahama

var CHORD = [0,4,7]; // C

var w = unsafeWindow;
var id2count = {};
var link2id = {};

/* utils for getting hatebu count */
String.prototype.htmlescape = function() {
    return this.replace(/&/, "&amp;").replace(/</g, "&lt;");
}

function callXmlrpc(requestbody) {
    const endpoint = "http://b.hatena.ne.jp/xmlrpc";
    function onload(response) {
        var pattern = /<name>([^<]+)<\/name>\s*<value><int>(\d+)/g;
        var m;
        while (m = pattern.exec(response.responseText)) {
            id2count[link2id[m[1]]] = m[2];
        }
    }
    window.setTimeout(function(){
        GM_xmlhttpRequest({method: "POST", url: endpoint, data: requestbody, onload: onload});
    }, 0);
}

/* utils for making midies */
function setAttributes(elm, attrs){
    for(var attr in attrs)
        elm.setAttribute(attr, attrs[attr]);
    return elm;
}

var Midi = function(){
    this.midies = [];
    this.makeMidiSets();
    this.playing = 0;
}
Midi.prototype.makeMidi = function(num){
    var MIDI_DATA = 'data:audio/midi,' +
        'MThd%00%00%00%06%00%01%00%01%00%C0' + // ファイルヘッダ
        'MTrk%00%00%00%0E' + // トラックヘッダー(データ長)
        '%00%C0%11' +      // 音色変更
        '%00%90%' + num.toString(16) + '%64' + //'%00%90%30%64' +   // ノートオン
        '%58%30%00' +      // ノートオフ
        '%00%FF%2F%00';      // エンドオブトラック

    return w.document.body.appendChild(setAttributes(document.createElement('embed'), {
        src : MIDI_DATA,
        type : 'video/quicktime',
        autoplay : 'false',
        controller : 'true',
        loop : 'false',
        width : '1px',
        height : '1px',
        style: 'position: absolute; z-index: 100; top: 1px; left:' + num + 'px'
    }));
}
Midi.prototype.makeMidiSets = function(){
    var self = this;
    var k = 0;
    for(var i = 24 ; i < 96; i += 12){
        CHORD.forEach(function(j){
            var midi = self.makeMidi(i + j);
            setTimeout(function(){midi.Play()}, 700 * k);
            self.midies.push(midi);
            k++;
        })
    }
}
Midi.prototype.play = function(idx){
    var self = this;
    setTimeout(function(){
        self.midies[self.playing].Stop();
        self.midies[idx].Play();
        self.playing = idx;
    });
}

/* hatebu count => midi index converter */
var Rank = function(){
    this.max_rank = 17;
    this.max = 200;
    this.absorb = 20;
}
Rank.prototype.get = function(count){
    count = parseInt(count);
    if(this.max < count) return this.max_rank;
    return Math.ceil(this.max_rank - ((this.max_rank * this.absorb) / (this.absorb + count)))
}

w.midies = new Midi();
rank = new Rank();

w.register_hook('BEFORE_PRINTFEED', function(feed) {
    var items = feed.items.map(function(item){
        return {
            'link': item.link,
            'id': item.id
        };
    });
    var length = items.length
    link2id = {};
    id2count = {};
    for(var idx = 0; idx < length; idx += 50){
        var _request = ['<?xml version="1.0"?>\n<methodCall>\n<methodName>bookmark.getCount</methodName>\n<params>\n'];
        items.splice(0, 50).forEach(function(item){
            link2id[item.link] = item.id;
            _request.push("<param><value><string>" + item.link.htmlescape() + "</string></value></param>\n");
        });
        _request.push("</params>\n</methodCall>\n");
        callXmlrpc(_request.join(''));
    }
});


with(w){
    function midiPlayByItem(item){
        if(!item) return;
        count = id2count[item.item_id] || 0;
        midies.play(rank.get(count));
    }

    Control._scroll_next_item = Control.scroll_next_item;
    Control._scroll_prev_item = Control.scroll_prev_item;
    Control.scroll_next_item = function(){
        Control._scroll_next_item();
        midiPlayByItem(get_active_item(1));
    }
    Control.scroll_prev_item = function(){
        Control._scroll_prev_item();
        midiPlayByItem(get_active_item(1));
    }
}
