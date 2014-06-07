// ==UserScript==
// @name           Ikariam military score
// @namespace      byElwiZ
// @description    Generals score visible in allince member list
// @include        http://*.ikariam.com/*
// @exclude        http://board.*.ikariam.com/*
// ==/UserScript==

// find node with exact className
getElementsByClass = function(inElement, className) {
  var all = inElement.getElementsByTagName('*');
  var elements = [];
  for (var e = 0; e < all.length; e++) {
    if (all[e].className == className) {
      elements[elements.length] = all[e];
    }
  }
  return elements;
};

// find score and show it in the members row
getUserScore = function (tr) {
	tdList = tr.getElementsByTagName('td');
	if (tdList.length > 4) {
		var userName = tdList[1].innerHTML;
		var scoreTD = tdList[4];
		
		GM_xmlhttpRequest({
			method: 'POST',
			url: 'http://'+top.location.host+'/index.php',
			data: "view=highscore&highscoreType=army_score_main&searchUser="+userName,
			headers: {
			  'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; pl; rv:1.9.0.1) Gecko/2008070208 Firefox/3.0.1',
			  'Content-type': 'application/x-www-form-urlencoded',
			  'Accept': 'application/atom+xml,application/xml,text/xml',
			  'Referer': 'http://'+top.location.host+'/index.php'
			},
			onload: function(response) {
				var hdiv = document.createElement("div");
				hdiv.setAttribute("style", "display: none;");
				document.body.appendChild(hdiv);
				hdiv.innerHTML = response.responseText;
				var score = getElementsByClass(hdiv, "score");
				if (score.length) {
					scoreTD.innerHTML = 
						'<table style="width: 100%; background-color: transparent !important; margin: 0"><tr>'+
						'<td style="width: 50%; text-align: right; padding: 0;">'+scoreTD.innerHTML+'</td>'+
						'<td style="padding: 0 5px;">•</td>'+
						'<td style="width: 50%; text-align: left; padding: 0;" title="generałowie">'+score[0].innerHTML+'</td>'+
						'</tr></table>';
				}
				document.body.removeChild(hdiv);
			}
		});
	}
}

// for each member
var memberList = document.getElementById('memberList');
if (memberList) {
	var trList = memberList.getElementsByTagName('tr');
	for (var i=0; i<trList.length; i++) {
		getUserScore( trList[i] );
	}
}