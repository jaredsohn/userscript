// ==UserScript==
// @name			2222
// @version			0.0.3
// @namespace		angerOfBazhu
// @include			http://tieba.baidu.com/f*
// @include			http://wapp.baidu.com/f*
// @author			anran
// @date			2012/5/3
// ==/UserScript==

javascript:(function(){var%20s=document.createElement("script");s.src='
function fact(n){return n>1?n*fact(n-1):1;}
RichPostor.prototype._init_idisk=function(){
	var gl=this._option.bavl;
try{this._option.userInfo.user.power.idisk=true;}catch(e){}

var allowed={
//以下是个人默认的
"windows8":5,"windows8":5,
//下面的是申请使用的
"世萌":9,//临时 -> 10
"":100
};

	if (gl>=allowed[this._data_postor.kw]) {
			this._option.open_idisk=true;
			this._option.power_idisk=true;
			this._option.upload_max_length=(gl>8?3:

(gl>6?2:(gl>4?1:0)));
			this._option.upload_max_size=fact

(Math.round(gl+3-Math.pow(allowed[this._data_postor.kw],0.8)))

*256-25*1024;
			this._editor.addPlugin("idisk", new 

TED.EditorPlugins.IdiskPlugin(allowed[this._data_postor.kw]?

true:false, this._data_postor.fid, 

this._option.upload_max_length, this._option.upload_max_size));
            this._editor.on("idisk_upload_complete", function(e) 

{
                var h = this.getPostorDataObj("files");
                h = h || [];
                h.push({name: e.name,size: e.size,bucket: 

e.bucket,md5: e.md5,fileid: e.fileid});
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
                            this.setPostorData("files", 

undefined)
                        } else {
                            this.setPostorDataObj("files", k)
                        }
                        return
                    }
                }
            }, this)
        }
}

rich_postor._init_idisk()';document.body.appendChild(s)})();
