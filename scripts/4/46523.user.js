// ==UserScript==
// @name            Webcat Plus で三重大学附属図書館での所蔵の有無を表示するスクリプト
// @namespace       http://penguinlab.jp/
// @include         http://webcatplus.nii.ac.jp/assoc.cgi*
// @include         http://webcatplus-equal.nii.ac.jp/libportal/EqualFromForm*
// @include         http://webcatplus-equal.nii.ac.jp/libportal/EqualMovePage*
// @include         http://webcatplus-equal.nii.ac.jp/libportal/EqualLink*
// @include         http://webcatplus-equal.nii.ac.jp/libportal/ChildrenList*
// ==/UserScript==

(function(){
	//検索URL：NCIDの前まで
	var searchurl_before = "http://opac.lib.mie-u.ac.jp/cgi-bin/opc/seek.cgi?ncid=";
	//検索URL：NCIDの後
	var searchurl_after = "";
	//ヒットしなかった際に表示される文字列
	var nohitstring = "検索に該当する書誌情報はありませんでした。";
	//ヒットした際に挿入するHTML（リンクはあとで付与）
	var html_hit = "<img src=\"http://www.mie-u.ac.jp/favicon.ico\" border=\"0\" />";
	//ヒットしなかった際に挿入するHTML
	var html_nohit = "<span style=\"color:red;\">×</span>";

    var contents = document.evaluate('/HTML[1]/BODY[1]/DIV[1]/TABLE[4]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/TABLE', document ,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var chain = new Chain();
    var ncids = new Array(contents.snapshotLength - 1);
    var htmls = new Array(contents.snapshotLength - 1);
    var nodes = new Array(contents.snapshotLength - 1);
    var count = 0;

	for ( var j = 1 ; j < contents.snapshotLength; j++ )
	{
        var content = document.evaluate('TBODY[1]/TR[1]/TD[4]/DIV[1]', contents.snapshotItem(j), null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
    	try{
			var ncid = document.evaluate('FONT[1]/A[1]/@HREF', content, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.nodeValue;
        }catch(e){
			var ncid = document.evaluate('FONT[1]/B[1]/A[1]/@HREF', content, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.nodeValue;
        }
        ncid = ncid.replace(/.*:/g,"");
        ncid = ncid.replace(/.*%3A/g,"");
        ncids[j - 1] = ncid;
        htmls[j - 1] = "<a href=\"" + searchurl_before + ncid + searchurl_after + "\">" + html_hit + "</a>";
        nodes[j - 1] = content.lastChild;
        
	    chain.addRequestFunction(function(){
	    return{
	        method:"GET",
	        url:searchurl_before + ncids[count] + searchurl_after,
	        onload:function(details){
		        if(details.responseText.match(nohitstring)){
					html_insert_after(html_nohit, nodes[count]);
		        }else{
					html_insert_after(htmls[count], nodes[count]);
		        }
	            count++;
	        }
	    }});
	}
	chain.doChain();
})();

function html_insert_after(html, node){
	var e = document.createElement('span');
	e.innerHTML = html;
	e.setAttribute('class','amazon_book_in_library');
	if(node.nextSibling != null){
		node.parentNode.insertBefore(e, node.nextSibling);
	}else{
		node.parentNode.appendChild(e);
	};
}

// チェーンを順番に実行していくクラス。
// http://d.hatena.ne.jp/drgqst/20080110/1199976698
// より転載。
function Chain() {
    // コンストラクタ
    this.jobs = [];
    this.container = {};
    
   // チェーンに GM_xmlhttpRequest の引数を返す関数を追加する。
    this.addRequestFunction = function( f ) {
        this.jobs.push({ type: 'request', func: f })
    };
    
    // チェーンに普通の関数を追加する。
    this.addFunction = function( f ) {
       this.jobs.push({ type: 'function', func: f })
    };
    
    // 先頭のジョブを返す
    this.shift = function() {
        return this.jobs.shift();
    };
    
    // チェーンを順番に実行して行く。
    this.doChain = function () {
        // 先頭のジョブを取り出す。何もなかったらおしまい。
        var job = this.jobs.shift();
        if( ! job ) return;
        
        if( job.type == 'function' ) {
            // ただの関数ならそのまま実行する。
            job.func.apply( this );
            // 終わったら次のジョブを実行する。
            this.doChain();
        } else if( job.type == 'request' ) {
            // リクエストだったら GM_xmlhttpRequest のパラメーターをちょっと改ざんして実行する。
            var obj  = job.func.apply( this );
            obj.chain = this;
            if( obj.onload ) {
                // onloadを改ざん。関数を実行した後に次のジョブを実行してもらう。
                obj.$onload = obj.onload;
                obj.onload = function( response ) {
                    obj.$onload.apply( this.chain, [response] );
                    this.chain.doChain();
                };
            }
            GM_xmlhttpRequest( obj );
        }
    };
}
