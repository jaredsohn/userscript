// ==UserScript==
// @name          UNSW WebTeach Beautifier
// @namespace     http://jcr1234.org/download/
// @description   BEautifies the UNSW web teach
// @include       http://wt3.mbt.unsw.edu.au/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function xpath(query, doc) {
	var d =doc || document;
	return d.evaluate(query, d, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
function countWords(text){
	return text.match(/\w+/g).length;
}


addGlobalStyle('.Comment { font-size:13px; font-family:"Trebuchet MS",Verdana,Helvetica,Arial,sans-serif !important;} .CommentHead { font-size:14px;} .WordCount{ font-size:12px;}');

window.addEventListener('load',
	function() {
		if(window.top==this){
			var nodes = xpath("//frameset[@rows='70,*,20']");
			if(nodes.snapshotLength>0) nodes.snapshotItem(0).rows='25,*,20';
			nodes = xpath("//frameset[@rows='50,20']");
			if(nodes.snapshotLength>0) nodes.snapshotItem(0).rows='0,20';
			nodes=xpath("//frame[@id='SRMContent']");
			if(nodes.snapshotLength>0) {
				var frame = nodes.snapshotItem(0);
				var doc = frame.contentDocument;
				var commts = xpath("//span[@class='Comment']", doc);
				for(var i=0;i<commts.snapshotLength;i++){
					var commSpan = commts.snapshotItem(i);
					var wordCount = countWords(commSpan.innerHTML.replace(/<[^>]+>/g,""));
					var newElem = doc.createElement('SPAN');
					newElem.innerHTML=" <i class='WordCount'>(" + wordCount+" words) </i>"
					commSpan.parentNode.insertBefore(newElem,commSpan);
				}
			}
		}
	},true);


if(/\/(add_sr_item\.cfm|add_cs_item\.cfm)/.test(document.URL)){
	//resize table and textarea
	var tables = xpath("//table[@width]");
	if(tables.snapshotLength>0){
		var table = tables.snapshotItem(0);
		table.style.width='95%';
		table.rows[0].style.display='none';
	}

	//add word counter
	var textareas = xpath("//textarea[@name='textdata']");
	if(textareas.snapshotLength>0){
		var ta =textareas.snapshotItem(0);
		ta.style.width='100%';
		commentDoc = ta.ownerDocument;
		ta.addEventListener('change',
			function(){
				var count = countWords(this.value);
				var countSpan = document.getElementById('words');
				if(countSpan==null){
					countSpan = document.createElement('SPAN');
					countSpan.id='words';
					this.parentNode.insertBefore(countSpan,this.nextSibling);
				}
				countSpan.innerHTML='<i class=WordCount>' + count + ' words</i>';
		}, false);
	}

	//fix p tags
	nodes=xpath("//p");
	for(var i=0;i<nodes.snapshotLength;i++){
		var p = nodes.snapshotItem(i);
		p.style.dislay='inline';
		p.style.margin='0px';
		p.style.padding='0px';
	}
}
