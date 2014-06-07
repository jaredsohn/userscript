// ==UserScript==
// @name        gomiview
// @namespace   daifukuobake.co.cc
// @description gomi
// @include		http://now.ameba.jp/
// ==/UserScript==

var gomibtn = document.createElement("input");
	gomibtn.type="button";
	gomibtn.value="gomi";
	gomibtn.addEventListener("click", gomi, false);
document.getElementById("subArea").appendChild(gomibtn);

function gomi()
{
	GM_addStyle(<><![CDATA[
		body, html, #frame {
			margin:0;
			padding:0;
			border:0;
			width:auto;
		}
		body {
			padding:0.5em;
		}
		#amebaBar, #subArea, #headerArea, #sliderFrame, #footerArea, #myNowReloadBtn {
			display:none!important;
		}
		#inputHeading {
			margin-bottom:5px;
			font-size:2em;
		}
		#nowListHeading {
			height:25px;
			border-bottom:2px solid #CCCCCC;
			margin-bottom:2px;
		}
		#mainArea {
			width:98%;
			padding:1em;
		}
		#mainAreaIn,
		#inputArea {
			width:auto;
		}
		#counterArea {
			font-size:0.5em;
		}
		#entryTextArea {
			height:2em;
			width:90%;
		}
		#mainAreaIn ol li,
		#mainAreaIn ol li imgList {
			width:auto;
			padding:0;
			margin:0;
			min-height:0;
		}
		#mainAreaIn ol li span.entry span.time,
		#nowListArea li p {
			display:inline;
		}
		#mainAreaIn ol li a.func,
		#mainAreaIn ol li span.photo,
		#mainAreaIn ol li span.photo a,
		#mainAreaIn ol li.imgList .entry {
			display:inline;
			float:none;
			width:auto;
			height:auto;
			border:0;
		}
		#mainAreaIn ol li span.photo a img {
			width:auto!important;
			height:15px!important;
		}
		ol#nowListArea li.dny0 em,
		ol#nowListArea li.dny0 em a,
		ol#nowListArea li.dny0 em a img {
			width:15px;
			height:15px;
		}
		ol#nowListArea li.dny0 em {
			margin:2px 0;
		}
	]]></>);
	
	document.getElementById("inputHeading").innerHTML = "<em>gomi</em>";
	document.title = unsafeWindow.AN.NEWENTRIES.title = "gomi";
}