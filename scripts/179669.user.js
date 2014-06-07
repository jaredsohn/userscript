// ==UserScript==
// @name           pubmedplus
// @namespace      http://www.pubmedplus.org/
// @description    more data in pubmed
// @version        1.0.0
// @include        http://www.ncbi.nlm.nih.gov/sites/entrez*
// @include        http://www.ncbi.nlm.nih.gov/pubmed*
// @include        http://*.pubmedplus.org/*
// @author         Harvey,Chrisyue,Sigma
// @homepage	   http://www.pubmedplus.org/
// @contributionURL	https://me.alipay.com/duxing
// @contributionAmount	￥1.00
// @copyright      2013+, Harvey
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html 
// ==/UserScript==
function $(id) {
	return document.getElementById(id);
}

function c(n, p) {
	return (p || document).getElementsByClassName(n);
}

function t(n, p) {
	return (p || document).getElementsByTagName(n);
}

function create(e) {
	return document.createElement(e);
}

function append(e, t) {
	t.appendChild(e);
}

function after(e1, e2) {
	e2.parentNode.insertBefore(e1, e2.nextSibling);
}

function log(){
	if( arguments.length > 0 ){
		// console.log( '%cdebug:%c'+ msg ,"background:black;color:white;","auto");
		console.debug.apply( console, arguments );
	}
}

var pubmedplus = {
	pmids:[],//搜索结果id
	db:{},
	setStyle : function(){
		var style = ".pubmedplus-data {" + 
			"background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4RkEzNEE0OTU0MUJFMzExOTAzMkVENjM1RDg5QzVDOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4OUZBMDAyNTFCOEYxMUUzOTdGM0JEMEJCRTMyQzAwMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4OUZBMDAyNDFCOEYxMUUzOTdGM0JEMEJCRTMyQzAwMCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjkyQTM0QTQ5NTQxQkUzMTE5MDMyRUQ2MzVEODlDNUM4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjhGQTM0QTQ5NTQxQkUzMTE5MDMyRUQ2MzVEODlDNUM4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+MD88jgAAAO1QTFRFETRqHD5x+/z9/Pz9Ql6IGjxw7O/z4+fuEzZr/v7+DTFnCy9mGz1xGDpuzNTf+Pn7ME99EjVr/P399fb5DzNp8/X46+7yPFmF5+rwWnKYTmiRrLjLP1yHU22UucPTkaG6JUV2K0t7jJ23FjhtEDRqOVaD/v//HT9yM1KApLHGJ0d3MVB+qLXJ3ePqqrfK4ubta4Gi3OHp/f7+SWSN4+ft8PL17/H1sLzOj6C5Q1+JNFOA+/v8f5KwytLez9bh6ezxoa/E2N3mHD5yM1F/XXWaaH+gt8LS0tnjzdXgCS5lFDdsDjJoR2KM////////ZN3GbQAAAE90Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////AD1WsLMAAACmSURBVHjaTNDVEoNADAVQ6OLF60rd3d2Vlvz/5xQoLNynzJlsJlkCAFDECQ9uCADrVu6q6pUavXygooSTmjD04PuhH3IuZQpZyweSAXhKHKdgYAESJS4eC3ccJK2J8IyiPKib7woeajrR1tsA6Iu4MRTAIO7ZeSO5CIA82uWuHQIWxr389KT7q1dnwPQL9zP/h0ynlbabV0vvCegI2UfAxP2AnwADAC+0N4mG1bx2AAAAAElFTkSuQmCC) no-repeat #F8F8F8;"+
			"border: 1px solid transparent;border-radius: 4px;" + 
			" padding-left:16px; " +
			" font-size: 0.923em;height:16px;line-height: 1.4em; " +
			"  -moz-border-radius: 4px;" + "  -webkit-border-radius: 4px;" + "  display: block;" + "}" + 

			".pubmedplus-data,.pubmedplus-data > span, .pubmedplus-data a{color:#C0C0C0;}"+
			// 鼠标mouseover
			".pubmedplus-data:hover{border-color:#E0E0E0;}"+

			".pubmedplus-data > a ,.pubmedplus-data > span {" + 
			"  margin: 0 3px" + "}" +

			"a.pubmedplus-green {" + 
				"color: #95B195;" + 
			"}";
		GM_addStyle(style);
	},
	compatibility:function(){
		if( !document.all ){
			this.getJtitle = function( rs ){
				try {
					return c("jrnl", rs)[0].textContent;
				} catch (e) {
					return t("a", c("citation", rs)[0])[0].textContent.replace(/\.$/, '');
				}
			}
		}
	},
	run:function(){
		this.compatibility();
		this.setStyle();
		var oe = document.querySelectorAll(".rslt");
		for( var i = 0 ,len = oe.length; i < len ; i ++ ){
			var c = oe[i];
			var pmid = this.getPmId( c );
			var jtitle = this.getJtitle( c );
			//插入view
			var d = this.createPlusDiv();
			var id = "_plus_"+ pmid;
			if( !$(id) ){
				d.id = id;
				append( d , c );
			}
			//缓存
			var p = {
				'originElem':c,
				'plusElem':d,
				'jtitle':jtitle,
				'id':id
			};
			this.db[pmid] = p;
			// this.pmids.push( pmid );
			if( !this.setIF( pmid ) ){
				this.waitingIFofPmid.push( ''+pmid );
				this.waitingIF[ jtitle.toLowerCase() ] = -1;//如此可用于去重
			}
			this.getGoogleScholar( p );
		}
		this.getIF();
		log( this.db );
	},
	createPlusDiv : function(){
		var div = create("div");
		div.className = 'pubmedplus-data';
		div.title = 'Pubmedplus Toolbar';
		return div;
	},
	getPmId: function(rs) {
		try {
			return /\d+/.exec(c("rprtid", rs)[0].innerHTML)[0];
		} catch (e) {
			try {
				return /\d+/.exec(c("pmid", rs)[0].innerHTML)[0];
			} catch (e) {
				return null;
			}
		}
	},
	getJtitle: function(rs) { //杂志名称
		try {
			return c("jrnl", rs)[0].innerText;
		} catch (e) {
			return t("a", c("citation", rs)[0])[0].innerText.replace(/\.$/, '');
		}
	},
	waitingIF:{},
	waitingIFofPmid:[],
	setIF:function( pmid ){
		var jtitle = this.db[pmid].jtitle.toLowerCase();
		var _if = localStorage.getItem( 'IF-' + jtitle );
		if( _if != null ){
			$( '_plus_' + pmid ).innerHTML+='<span>IF('+ _if +')</span>';
			return true;
		}else{
			return false;
		}
	},
	getIF:function(){
		var _db = this.db;
		var _jtitles = [];
		// log( 'waitingIF', JSON.stringify( this.waitingIF , '', '\t' ) );
		for( var i in this.waitingIF ){
			_jtitles.push( i );
		}
		if( _jtitles.length > 0 ){
			var url = "http://www.pubmedplus.org/ext/if.php?jtitles=" + encodeURIComponent( _jtitles.join(",") );
			GM_xmlhttpRequest({
				method: "GET",
				url: url,
				onload: function( response ) {
					//add code
					var ifs = eval( '(' + response.responseText + ')' );
					for( var i in ifs ){//遍历接口里的字段
						var _j = i.toLowerCase();
						localStorage.setItem( 'IF-' + _j , ifs[i]||0 );//缓存
						_jtitles.splice( _jtitles.indexOf( _j ) ,1);
					}
					while( _jtitles.length ){
						localStorage.setItem( 'IF-' + _jtitles.shift().toLowerCase() , 0 );
					}
					while( pubmedplus.waitingIFofPmid.length ){
						pubmedplus.setIF( pubmedplus.waitingIFofPmid.shift() );
					}
				}
			});
		}
	},
	getGoogleScholar:function( p ) {
		var url = 'http://scholar.google.com/scholar?as_q=&as_occt=title&as_allsubj=all&as_epq=' + p.jtitle;
		// log( 'citedBy：' +　url );
		GM_xmlhttpRequest({
			method: "GET",
			url: url,
			onload: function(response) {
				// googleScholorResultText
				var gsrt = response.responseText;
				var container = $(p.id);
				// var reg = /<a[^<]+>Cited by \d+<\/a>/;
				var reg = /<a[^<]+>被引用次数：\d+<\/a>/;
				var html = reg.exec( gsrt );
				if (html && html.length) {
					log( html[0] );
					container.innerHTML += html[0].replace(/被引用次数/, "Cited");
					// get <a />
					var as = t("a", container);
					for( var i = 0,l = as.length; i < l; i++ ){
						var a = as[i],
							_href = a.getAttribute("href");
						if ( /^\//.test(_href) ) {
							// a.href = "http://scholar.google.com" + a.getAttribute("href");
							a.href = "http://scholar.google.com" + _href;
							a.title = 'Cited';
							break;
						}
					}
				} else {
					container.innerHTML += "Cited(0)";
				}
				// 含有pdf的页面
				// http://scholar.google.com/scholar?as_q=&as_occt=title&as_allsubj=all&as_epq=Cellular%20Kinetics%of%20Perivascular%20MSC%20Precursors

				// <a href="http://downloads.hindawi.com/journals/sci/2013/983059.pdf" onmousedown="return scife_clk(this.href,'gga','gga','0')" target="_blank">
				// var pdfReg = /<a href="([^<]+)" class=yC1>[^<]+<\/a> <font size=-2 class=f>\[PDF\]<\/font>/;
				var pdfReg = /<a href="([^<]+)" onmousedown="return scife_clk\(this\.href,'gga','gga','\d'\)"[^>]*>/;
				html = pdfReg.exec( gsrt );
				if ( html && html.length ) {
					var _outHref = html[1];
					var _categoryReg = /<span class=gs_ctg2>\[(PDF|HTML)\]<\/span>/;//链接的分类
					var _category = _categoryReg.exec( gsrt );
					if( _category && _category.length ){
						container.innerHTML += '<a class="pubmedplus-green" href="' + _outHref + '" target=_blank title="Fulltxt">Fulltxt</a> ';
					}
				}
			}
		});
	}
};

pubmedplus.run();