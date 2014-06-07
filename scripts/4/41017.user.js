// ==UserScript==
// @name           anonymizer
// @namespace      http://www.linux.org.ru/*
// @description    Anonymizes everyone on the linux.org.ru site
// ==/UserScript==

function hasClass(classname){
  var xp = "count(//div[@class='"+classname+"'])";
  var res = document.evaluate(xp, document, null, XPathResult.ANY_TYPE, null);
  return res.numberValue > 0;
}

function detectPageType(){
  var p = hasClass('forum')?'forum':(hasClass('messages')?'messages':(hasClass('newsblog')?'newsblog':(hasClass("news")?"news":"*")));
  return p;
}

function anonymizer(ptype){
  this.prop = 1;
  switch(ptype){
  case "messages":
    this.messages();
    break;
  case "forum":
    this.forum();
    break;
  case "news":
  case "newsblog":
    this.newsblog();
    break;
  }
}

doForeach = function(what, fn){
	for(var i=what.length-1; i>=0; i--)
		fn(what[i])
}	

anonymizer.prototype.xp = function(ex){
  return document.evaluate(ex, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
};

anonymizer.prototype.something = function(res, fn){
  var tNode = res.iterateNext();
  var nodes = []
  while(tNode){
    nodes.push(tNode)
    tNode = res.iterateNext();
  }
  doForeach(nodes, fn)
}

anonymizer.prototype.nodes = function(node){with(node){
    	doForeach(getElementsByTagName('img'), function(i){i.parentNode.removeChild(i)})
    	innerHTML = innerHTML.replace(/^[A-Za-z0-9-_]+ *\(<a.+?\/a>\)/, 'anonymous (<a href="whois.jsp?nick=anonymous">*</a>)').
    		replace(/<i>Проверено: [A-Za-z0-9-_]+ *\(<a.+?\/a>\)/, '<i>Проверено: anonymous (<a href="whois.jsp?nick=anonymous">*</a>)')
}};

anonymizer.prototype.titles = function(node){
  	with(node){
      innerHTML = innerHTML.replace(/\[<a href=\"delete\.jsp.+?\/a>\]/, '').
      replace(/a> от [A-Za-z0-9-_]+ /, 'a> от anonymous ').
      replace(/<strong>Сообщение удалено [A-Za-z0-9_-]+ по/, '<strong>Сообщение удалено anonymous по')
  	}
};

anonymizer.prototype.table = function(node){with(node){
  	var nn = (childNodes.length == 4)?1:0;  
    var x = childNodes[nn].innerHTML;
    childNodes[nn].innerHTML = x.replace(/\([A-Za-z0-9-_]+\)$/, '(anonymous)')
}}

anonymizer.prototype.boxlets = function(node){with(node){
  innerHTML = innerHTML.replace(/Вы вошли как <b>[A-Za-z0-9_-]+<\/b>\n<br>\(статус:[^\)]+\)<br>/, 'Вы вошли как <b>anonymous</b><br/>(статус: анонимный)<br/>').	
  replace(/<a href=\"show-(topics|comments).jsp\?nick=[^\"]+\">/g, '<a href="show-topics.jsp?nick=anonymous">')
  innerHTML = innerHTML.replace(/ от <a href=\"whois.jsp\?nick=[A-Za-z0-9_-]+\">[A-Za-z0-9_-]+<\/a>/g, ' от <a href="whois.jsp?nick=anonymous">anonymous</a>');
  innerHTML = innerHTML.replace(/Используется профиль: <em>[A-Za-z0-9_-]+<\/em>/g, 'Используется профиль: <em>anonymous</em>');
}}

anonymizer.prototype.forum = function(){with(this)
  something(xp("//div[@class='forum']//table[@class='message-table']/tbody/tr"), table);
}

anonymizer.prototype.replies = function(node){with(node){ // Get rid of "delete" links
    innerHTML = innerHTML.replace(/\[<a href=\"delete_comment\.jsp\?.+?\/a>\]$/, '')
}}

anonymizer.prototype.messages = function(){with(this){
  something(xp("//div[@class='messages']//div[@class='sign']"), nodes);
  something(xp("//div[@class='title']"), titles);
  something(xp("//div[@class='reply']"), replies);
}};

anonymizer.prototype.newsblog = function(){with(this){
  something(xp("//div[@class='news']//div[@class='sign']"), nodes);
  something(xp("//div[@class='boxlet']"), boxlets);
}};

var x = new anonymizer(detectPageType());
