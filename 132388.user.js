// ==UserScript==
// @name           TiebaDisk
// @namespace      tieba
// @include        http://tieba.baidu.com/*
// ==/UserScript==

function jscode(){
function fact(n){return n>1?n*fact(n-1):1;}
RichPostor.prototype._init_idisk=function(){var gl=this._option.bavl;try{this._option.userInfo.user.power.idisk=true;}catch(e){} 
var allowed={"":100};allowed[$('div.p_nav a:contains("\u5427"):last,.nav_left a:contains("\u5427"):last')[0].text.match(/(.*)\u5427/)[1]]=5;
if (gl>=allowed[this._data_postor.kw]) {
    this._option.open_idisk=true;
    this._option.power_idisk=true;
    this._option.upload_max_length=(gl>8?3:(gl>6?2:(gl>4?1:0)));
    this._option.upload_max_size=fact(Math.round(gl+3-Math.pow(allowed[this._data_postor.kw],0.8)))*256-25*1024;
    this._editor.addPlugin("idisk", new TED.EditorPlugins.IdiskPlugin(allowed[this._data_postor.kw]?true:false, this._data_postor.fid, this._option.upload_max_length, this._option.upload_max_size));
    this._editor.on("idisk_upload_complete", function(e) {
        var h = this.getPostorDataObj("files");
        h = h || [];
        h.push({name: e.name,size: e.size,bucket: e.bucket,md5: e.md5,fileid: e.fileid});
        this.setPostorDataObj("files", h)
    }, this);
    this._editor.on("idisk_remove_file", function(l) {
        var k = this.getPostorDataObj("files");
        if (!k) {
            return
        }
        for (var h = 0, e = k.length; h < e; h++) {
            if (k[h]["bucket"] === l) {
                k.splice(h, 1);
                if (k.length === 0) {
                    this.setPostorData("files", undefined)
                } else {
                    this.setPostorDataObj("files", k)
                }
                return
            }
        }
    }, this)
}
}
 
rich_postor._init_idisk();
};

setTimeout(function(){var s=document.createElement("script");s.textContent="("+jscode.toString()+")();";;document.body.appendChild(s)},3000);