// ==UserScript==
// @name           Reddit AMA helper
// @namespace      http://m0.to/
// @description    Lists the questions and answers for AmA threads!
// @include        http://www.reddit.com/r/*/comments/*
// @version        0.002
// ==/UserScript==

if(location.href.match(/\/r\/(i|casuali|)ama\//i)){
	var QA = [];
	var depth = 0;

	function unescapeHTML(html) {
		var htmlNode = document.createElement("DIV");
		htmlNode.innerHTML = html;
		if(htmlNode.innerText)
			return htmlNode.innerText; // IE
		return htmlNode.textContent; // FF
	}

	function QAEntry(question,answer){
		this.answer = unescapeHTML(answer.data.body_html);
	}
	function QAEntryRaw(question,answer){
		this.asker = "";
		for(var i=0;i<depth;i++)
			this.asker+=">";
		this.asker += question.data.author;
		this.question = unescapeHTML(question.data.body_html);
		this.answer = answer;
		this.id = question.data.id;
	}

	function parseReply(reply,author){
		if(reply.data.replies.data){
			var replies = reply.data.replies.data.children;
			var answers = [];
			for(var i=0;i<replies.length;i++){
				if(replies[i].kind == "t1"){
					if(replies[i].data.author == author){
						answers.push(new QAEntry(reply,replies[i]));
					}
				}
			}
			if(answers.length>0){
				var combinedAnswer = "";
				for(var j=0;j<answers.length;j++){
					if(j>0)
						combinedAnswer+="<hr>";
					combinedAnswer+=answers[j].answer;
				}
				QA.push(new QAEntryRaw(reply,combinedAnswer));
				depth++;
			}
			
			for(var i=0;i<replies.length;i++){
				if(replies[i].kind == "t1"){
					parseReply(replies[i],author);
				}
			}
			if(answers.length>0)
				depth--;
		}
	}

	var match = location.href.match(/\/r\/(.*)\/comments\/(.*\/.*)\//);
	if(match){
		var requestURL = "http://www.reddit.com/r/"+match[1]+"/comments/"+match[2]+"/.json";
		var threadID = match[1].split('/')[0];
		GM_xmlhttpRequest({
			method:"GET",
			url:requestURL,
			onload:function(response){
				var result = JSON.parse(response.responseText);
				console.log(requestURL);
				var OP = result[0];
				var author = OP.data.children[0].data.author;
				var commentData = result[1];
				var replies = commentData.data.children;
				for(var i=0;i<replies.length;i++){
					if(replies[i].kind == "t1")
						parseReply(replies[i],author);
				}
				if(QA.length>0){
					var container = document.createElement("div");
					container.setAttribute("style","padding:5px;z-index:9001;border:2px solid silver;position:fixed;top:5%;left:5%;background:#f0f0f0;width:90%;height:90%;overflow:auto;visibility:hidden");
					var hideButton = document.createElement("button");
					hideButton.addEventListener("click",function(cont){return function(){cont.style.visibility = "hidden";}}(container));
					hideButton.innerHTML = "Hide Q&A!";
					hideButton.style.position = "fixed";
					hideButton.style.zIndex = "1001";
					container.appendChild(hideButton);
					
					var table = document.createElement("table");
					table.style.position = "relative";
					table.style.top = "25px";
					table.style.tableLayout = "fixed";
					table.style.width = "100%";
					table.setAttribute("border","2");
					var header = document.createElement("tr");
					{
						header.innerHTML += "<th style='padding:5px;width:100px;'>From</th><th style='padding:5px;'>Question</th><th style='padding:5px;'>Answer</th>";
					}
					table.appendChild(header);
					for(var i=0;i<QA.length;i++){
						var row = document.createElement("tr");
						row.innerHTML += 	"<td style='padding:5px; word-wrap: break-word; vertical-align: top;'>"+QA[i].asker+"</td>" +
											"<td style='padding:5px; vertical-align: top;'>"+QA[i].question+"</td>"+
											"<td style='padding:5px; vertical-align: top;'>"+QA[i].answer+"</td>";
						row.style.cursor = "alias";
						row.addEventListener("mouseover",function(self){return function(){self.style.background = "lightgray"; self.style.color = "blue";}}(row));
						row.addEventListener("mouseout",function(self){return function(){self.style.background = ""; self.style.color = "";}}(row));
						row.addEventListener("click",function(id,cont){return function(){location.hash = ""; location.hash = id;cont.style.visibility = "hidden";}}(QA[i].id,container));
						table.appendChild(row);
					}
					container.appendChild(table);
					document.body.appendChild(container);
					
					var buttonContainer = document.createElement("div");
					buttonContainer.setAttribute("style","padding:5px;background:gray;position:fixed;bottom:5%;right:5%;");
					var showButton = document.createElement("button");
					showButton.innerHTML = "Toggle Questions + Answers!";
					showButton.addEventListener("click",function(cont){return function(){
						if(cont.style.visibility == "hidden")
							cont.style.visibility = "";
						else
							cont.style.visibility = "hidden";
					}}(container));
					buttonContainer.appendChild(showButton);
					document.body.appendChild(buttonContainer);
				}
			}});
	}
}