// ==UserScript==
// @id             Facebook likes
// @name           Likes
// @namespace      http://anibobeira.com
// @description    Use nas discurssões novos tipos de curtir!
// @author         baseado no código fonte de "Delzon"
// @icon           http://youpix.com.br/wp-content/uploads/2011/02/fb_button_oversharing.jpg
// @include http://*.facebook.com/*
// @include https://*.facebook.com/*
// @include	http://www.youtube.com/*
// @include	http://www.twitter.com/#!/*
// @include	http://www.anibobeira.com/*
// @include	https://plus.google.com/*
// @include	http://plus.google.com/*
// @include	https://www.tumblr.com/*
// @include	http://www.tumblr.com/*
// @include	http://*.facebook.com/plugins/comments.php*
// @include	https://*.facebook.com/plugins/comments.php*
// @exclude http://*.youtube.com/embed/*
// @exclude https://*.youtube.com/embed/*
// @exclude http://*.facebook.com/plugins/likebox.php*
// @exclude https://*.facebook.com/plugins/likebox.php*
// @exclude http://*.facebook.com/plugins/like.php*
// @exclude https://*.facebook.com/plugins/like.php* 
// @exclude http://*.facebook.com/connect/connect.php?*
// @exclude https://*.facebook.com/connect/connect.php?*
// @exclude http://*.facebook.com/plugins/recommendations.php*
// @exclude https://*.facebook.com/plugins/recommendations.php*
// @exclude http://*.facebook.com/plugins/activity.php*
// @exclude https://*.facebook.com/plugins/activity.php*
// @exclude http://plus.google.com/u/0/_/notifications/*
// @exclude https://plus.google.com/u/0/_/notifications/*
// @version        1.3
// ==/UserScript==

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "50px";
	div.style.left = "0px";
	div.style.color = "#888";
	div.style.border = "0px solid #888";
	div.style.zIndex = "999999";
	div.style.padding = "0px";
	div.innerHTML = "<style></style><a title=\"Ver codigos\" style=\"text-decoration:none;color:#888;\" href=\"http://oficineros.livreforum.com/h11-likes-script-codigos\" target=\"_blank\" onClick=\"window.open(this.href, this.target, 'scrollbars=yes,toolbar=no,menubar=no,status=no,width=300,height=400'); return false\"><img  src=\"http://i.imgur.com/BSVER.png\" /></a>"
	body.appendChild(div);
}

String.prototype.isPrefixOf = function(str, from){
	if (arguments.length < 2) 
		from = 0;
	else 
		from = parseInt(from);
	
	if (from < 0 || from >= str.length) 
		return false;
	
	if (from + this.length > str.length) 
		return false;
	
	for (var i = 0; i < this.length; i++) 
		if (this.charCodeAt(i) != str.charCodeAt(from + i)) 
			return false;
	
	return true;
}
	
	
	var emoticons = [];
	

//--MEMES++ 
emoticons[":top:"] = { src: "http://i.imgur.com/E7IiG.gif", alt: "Toppost" }; 
emoticons[":naocurti:"] = { src: "http://i.imgur.com/KrdTm.gif", alt: "Naocurti" }; 
emoticons[":suave:"] = { src: "http://i.imgur.com/NRSM8.gif", alt: "Suave" }; 
emoticons[":loser:"] = { src: "http://i.imgur.com/EMCJc.gif", alt: "Perdedor" }; 
emoticons[":ahmorre:"] = { src: "http://i.imgur.com/TwrIN.jpg", alt: "Morrediabo" }; 
emoticons[":metal:"] = { src: "http://i.imgur.com/OeGDW.jpg", alt: "Metal!" }; 
emoticons[":startrek:"] = { src: "http://i.imgur.com/UqDu5.jpg", alt: "Piece and Prosperity" };
emoticons[":stop:"] = { src: "http://i.imgur.com/YAtpM.jpg", alt: "STOP!!1" };
emoticons[":fight:"] = { src: "http://i.imgur.com/EEOLM.jpg", alt: "Round 1!" };
emoticons[":fuckyou:"] = { src: "http://i.imgur.com/KG4wQ.jpg", alt: "Fuck you boy!" };


	
var emotxt = [];
var yemo = [];
var c;
for (var emo in emoticons) 
	if (!(emoticons[emo] instanceof Function)) {
		c = emo.charCodeAt(0);
		if (!yemo[c]) 
			yemo[c] = [];
		
		yemo[c].push({
			emoticon: emo,
			src: emoticons[emo].src
		});
	}
	
function f(o1, o2){
	if (o1.emoticon.isPrefixOf(o2.emoticon)) 
		return 1;
	
	if (o1.emoticon > o2.emoticon) 
		return 1;
	
	if (o1.emoticon < o2.emoticon) 
		return -1;
	
	return 0;
}
var i;	
for (i = 0; i < yemo.length; i++) 
	if (yemo[i]) 
		yemo[i].sort(f);
	
function replaceTextNode(textNode, sortedEmoticonSet)
{
	var content = textNode.textContent;
	var currentStopPosition;
	var i, j;
	var firstChar;
	var found = false;
	var htmls = [];
	var img;
	currentStopPosition = i = 0;
	while (i < content.length) {
		firstChar = content.charCodeAt(i);
		if (sortedEmoticonSet[firstChar]) 
			for (j = 0; j < sortedEmoticonSet[firstChar].length; j++) 
				if (sortedEmoticonSet[firstChar][j].emoticon.length && sortedEmoticonSet[firstChar][j].emoticon.isPrefixOf(content, i)) {
					if (currentStopPosition < i) 
						htmls.push(document.createTextNode(content.substr(currentStopPosition, i - currentStopPosition)))
					
					img = document.createElement('img');
					img.src = sortedEmoticonSet[firstChar][j].src;
					img.title = sortedEmoticonSet[firstChar][j].emoticon;
					htmls.push(img);
					
					
					i += sortedEmoticonSet[firstChar][j].emoticon.length;
					currentStopPosition = i;
					found = true;
					break;
				}
		
		if (found) {
			found = false;
			continue;
		}
		i++;
	}
	
	if(currentStopPosition>0&&currentStopPosition<content.length-1)
		htmls.push(document.createTextNode(content.substr(currentStopPosition)));
	
	var span=null;
	if (htmls.length) {
		span=document.createElement('span');
		for (i = 0; i < htmls.length; i++) 
			span.appendChild(htmls[i]);
	}
	return span;
}

function replaceElement(element, emos){
	var pathResult = document.evaluate(".//text()", element, null, 7, null);
	
	for (i = 0; i < pathResult.snapshotLength; i++) {
		var tNode = pathResult.snapshotItem(i);
		if (tNode.parentNode) {
			var span = replaceTextNode(tNode, emos);
			if (span) 
				tNode.parentNode.replaceChild(span, tNode);
		}
	}
}

replaceElement(document, yemo);

function listen(evt)
{
	var node = evt.target;
	if (node.nodeType == document.ELEMENT_NODE) 
		replaceElement(node, yemo);
	
	if (node.nodeType == document.TEXT_NODE) {
		var parent = node.parentNode;
		var span = replaceTextNode(node, yemo);
		if (span) 
			parent.replaceChild(span, node);
	}
}		

document.body.addEventListener('DOMNodeInserted', listen, true);


//Auto
var SUC_script_num = 114888; // Change this to the number given to the script by userscripts.org (check the address bar)

try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 3600000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version)
							{
								if(confirm('Há uma atualização para "'+script_name+'."\nQuer ir para a página de atualizações? Só dar um click no Install'))
								{
									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced)
								alert('Nenhum update avaliado para "'+script_name+'."');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert('Um erro ocorrido...Checando Updates:\n'+err);
			}
		}
	}
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update', function()
	{
	GM_openInTab("http://userscripts.org/scripts/show/117294");
	});
	updateCheck(false);
}
catch(err)
{}