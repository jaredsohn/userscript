// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  
// @version    0.1
// @description  enter something useful
// @match http://news.sbs.co.kr/section_news/news_read.jsp?news_id=*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @require		http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js
// @require		http://jsplumb.googlecode.com/files/jquery.jsPlumb-1.3.16-all-min.js
// @copyright  2012+, You
// ==/UserScript==

$(document).ready(function () {
 
    var content = $('#content').contents().filter(function() { return this.nodeType == Node.TEXT_NODE;}).text();	
    $.ajax({type: "POST",
            url: "http://rt.kaist.ac.kr:1234/cgi-bin/hello.py",
            //url: "http://rt.kaist.ac.kr:1234/cgi-bin/anno.py",
            data : "value="+content,
            success: whenSuccess,
            error: whenError
           });
});

jsPlumb.bind("ready", function() {
	//alert('jsPlumb');
});	

function whenSuccess(e) {
    //alert('ajax success! : '+ typeof e + ' ' + e.length);
    //alert('ajax success! : '+ e);
	
    block = e.split('<s>');
    block.shift();
    var nClause = Number(block[block.length-1]);
    block.pop();
	//r(var i = 0;i<block.length;i++)
	//lert('i : '+i+' - <' + block[i] +'>');
    
    var contents = $('#content').contents();
    var nodeIdxs = [-1];
    var texts = [];
    for(var i = 0;i<contents.length;i++) {
        if(contents[i].nodeType != Node.TEXT_NODE)
            nodeIdxs.push(i);
        else
            texts.push(contents[i]);
    }
    
    nodeIdxs.push(contents.length);
    
    contents.filter(function() { return this.nodeType == Node.TEXT_NODE;}).remove();
    
    var nowIdx = 1, textIdx = 0;
    while(nowIdx < nodeIdxs.length-1) {
        //alert('from ' + nodeIdxs[nowIdx-1] + ' to ' + nodeIdxs[nowIdx]);
        for(var i = 0;i<nodeIdxs[nowIdx]-nodeIdxs[nowIdx-1]-1;i++) {
            var tempDiv = document.createElement('span');
            //tempDiv.style.backgroundColor = 'yellow';
            //tempDiv.style.fontSize = 15
            tempDiv.innerHTML = block[textIdx++];
            contents.eq(nodeIdxs[nowIdx]).before(tempDiv);
            //contents.eq(nodeIdxs[nowIdx]).before(texts[textIdx++]);
        }
        nowIdx++;
    } 
    
    for(var i = 0;i<nodeIdxs[nowIdx]-nodeIdxs[nowIdx-1]-1;i++) {
        //contents.eq(nodeIdxs[nowIdx]).before($('<div>HAHA</div>'));
        //ert('text : ' + textIdx + '<' + texts[textIdx].data + '>');
        var tempDiv = document.createElement('span');
        //tempDiv.style.backgroundColor = 'yellow';
        //tempDiv.style.fontSize = 15
        tempDiv.innerHTML = block[textIdx];
       	contents.eq(nodeIdxs[nowIdx-1]).after(tempDiv);
        //contents.eq(nodeIdxs[nowIdx-1]).after(texts[textIdx++]);
    }
    
    //var inst = jsPlumb.getInstance();
    for(var i = 0;i<nClause;i++) {
        var from  = i*2;
        var to = i*2+1;
        jsPlumb.connect({
            source:String(from), 
            target:String(to),
            overlays:["Arrow"],
            paintStyle:{lineWidth:3, strokeStyle:'rgba(0,51,51, 0.5)'},
            anchors:["TopCenter", "TopCenter"],
            connector:["Flowchart", {stub:10}],
            detachable:false,
            endpoint:["Rectangle", {width:5, height:5}]
        });
    }
}

function whenError(e) {
    alert('ajax error! : '+e);
}
    
/*
content = document.getElementById('content');
for(var i = 0;i<6;i++) {//content.childNodes.length;i++) {
	temp = content.childNodes[i];
	if(temp.nodeType == 3 && temp.data != '\n') {
		var tempDiv = document.createElement('div');
		tempDiv.style.backgroundColor = 'yellow';
		temp.data.replace('서울', '');
        alert('<' + temp.data.charAt(0) + '>');
		tempDiv.innerText = content.childNodes[i].data;
        tempDiv.innerText.replace(temp.data.charAt(0), '');
        alert('<' + tempDiv.innerText + '>');
		content.replaceChild(tempDiv, content.childNodes[i]);
	}
}*/