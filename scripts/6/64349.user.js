// ==UserScript==
// @name           SpeedySurfer's Awesome Quotes
// @namespace      SpeedyQuote
// @description    Super Awesome Quotes
// @include        http://*.astroempires.com/*
// @exclude     http://forum.astroempires.com/*
// @exclude        *.astroempires.com/home.aspx*
// @exclude        *.astroempires.com/login.aspx*
// @exclude            http://wiki.astroempires.com/*
// @exclude            http://support.astroempires.com/*
// ==/UserScript==

function addQuoteLinks(){
textBox = document.getElementById("body");
if(textBox){
boardTable = document.getElementById("board_main").getElementsByClassName("layout listing")[0]

boardTable.rows[0].cells[1].colSpan = parseInt(boardTable.rows[0].cells[1].colSpan)+1
if(boardTable.rows[1].innerHTML.match("Jump first unread")){
boardTable.rows[1].cells[0].colSpan = parseInt(boardTable.rows[1].cells[0].colSpan)+1
boardTable.rows[2].cells[3].width = "20%"
boardTable.rows[2].insertCell(4)
boardTable.rows[2].cells[4].width = "10%"
modifier=1
}else{
boardTable.rows[1].cells[3].width = "20%"
boardTable.rows[1].insertCell(4)
boardTable.rows[1].cells[4].width = "10%"
modifier=0
}

for(i=2+modifier; i<boardTable.rows.length-(4+(modifier*2)); i=i+2){
if(boardTable.rows[i].innerHTML.match("<iframe")){
i++;
}
	boardTable.rows[i].cells[1].id = "quotename"+((i/2)-1)
	boardTable.rows[i].insertCell(4)
	if(boardTable.rows[i+1].cells[0].getElementsByClassName("battle-report")[0]){
	}else{
	boardTable.rows[i].cells[4].innerHTML = "<a href=\"javascript:void(0);\" id=\"quote"+((i/2)-1)+"\">Quote</a>"
	boardTable.rows[i+1].cells[0].id = "quotebody"+((i/2)-1)
	
	document.getElementById("quote" + ((i/2)-1)).addEventListener('click', function() {
                var postNumber = this.id.slice(5);                
                var postContents = replaceTags(document.getElementById("quotebody" + postNumber).innerHTML);
                var textBox = document.getElementById("body");
                var currentName = replaceTags(document.getElementById("quotename" + postNumber).innerHTML);


                if (textBox.value) {
                    textBox.value += '\n\n[list][b]' + currentName + ' said:[/b]\n"'
                        + postContents + '"[/list]\n';
                    javascript:scroll(0,0);
                    textBox.focus();

                }
                else {
                    textBox.value += '[list][b]' + currentName + ' said:[/b]\n"'
                        + postContents + '"[/list]\n';
                    javascript:scroll(0,0);
                    textBox.focus();
                }


                }, false);
				}
				boardTable.rows[i+1].cells[0].colSpan = parseInt(boardTable.rows[i+1].cells[0].colSpan)+1
}
	boardTable.rows[i].cells[0].colSpan = parseInt(boardTable.rows[i].cells[0].colSpan)+1
	boardTable.rows[i+1].cells[0].colSpan = parseInt(boardTable.rows[i+1].cells[0].colSpan)+1
	boardTable.rows[i+2].cells[0].colSpan = parseInt(boardTable.rows[i+2].cells[0].colSpan)+1
	boardTable.rows[i+3].cells[0].colSpan = parseInt(boardTable.rows[i+3].cells[0].colSpan)+1
	if(modifier>0)boardTable.rows[i+4].cells[0].colSpan = parseInt(boardTable.rows[i+4].cells[0].colSpan)+1
	
}
}

function replaceTags(userPost){
	userPost=userPost.replace(/\n/gim, "")
	userPost=userPost.replace(/<img src="http:\/\/graphics2.astroempires.com\/skins\/darkAstros\/images\/stars\/Red%20Giant.jpg" height="10px" width="10px">/gim, "");
	userPost=userPost.replace(/<i>(.*?)<\/i>/gim, "[i]$1[/i]")
	userPost=userPost.replace(/<b>(.*?)<\/b>/gim, "[b]$1[/b]")
	userPost=userPost.replace(/<u>(.*?)<\/u>/gim, "[u]$1[/u]")
	userPost=userPost.replace(/<font color="(.*?)">(.*?)<\/font>/gim, "[color='$1']$2[/color]")
	userPost=userPost.replace(/<font size="(.*?)">(.*?)<\/font>/gim, "[size='$1']$2[/size]")
	userPost=userPost.replace(/<code>(.*?)<\/code>/gim, "[code]$1[/code]")
	userPost=userPost.replace(/<ul>(.*?)<\/ul>/gim, "[list]$1[/list]")
	userPost=userPost.replace(/<li>(.*?)<\/li>/gim, "[*]$1")
	userPost=userPost.replace(/<a target="_blank" href="redirect.aspx\?(.*?)">(.*?)<\/a>/gim, "[url='$1']$2[/url]")
	userPost=userPost.replace(/<a href="mailto:(.*?)">(.*?)<\/a>/gim, "[mail='$1']$2[/mail]")
	userPost=userPost.replace(/<img src="(.*?)"(.*?)>/gim, "[img]$1[/img]")
	userPost=userPost.replace(/<div align="(.*?)">(.*?)<\/div>/gim, "[$1]$2[/$1]")
	userPost=userPost.replace(/<br(.*?)>/gim, "\n")
	userPost=userPost.replace(/<(.*?)>/gim, "")
	userPost=userPost.replace(/&lt;/gim, "<")
	userPost=userPost.replace(/&gt;/gim, ">")
	userPost=userPost.replace(/&amp;/gim, "&")
	return(userPost)
}
if(document.location.href.match("board.aspx")){
addQuoteLinks()
}