// ==UserScript==
// @name           Auto change colour
// @namespace      
// @include        *.thestudentroom.co.uk/mgc_cb_evo.php?do=view_chatbox
// @include        *.thestudentroom.co.uk/forumdisplay.php?f=91
// @include        *.thestudentroom.co.uk/forumdisplay.php?f=33
// @include        *.thestudentroom.co.uk/forumdisplay.php?f=232
// @include        *.thestudentroom.co.uk/forumdisplay.php?f=143
// ==/UserScript==

var links=document.getElementsByTagName('img');
//var links2=document.getElementsByTagName('div');





for(var w=0;w<links.length;w++)
    {
        if(links[w].getAttribute('src')=='http://static.thestudentroom.co.uk/cpstyles/tsr-red/images/custom/mgc_cb_evo_team_nosel.gif')
        {
	    links[w].setAttribute('onclick',function()
            {
                alert("?")
            };)
	
        }
    }




/*

function changeColour() {

for(var x=0;x<links2.length;x++){
        if(links2[x].getAttribute('id')=='chats_container'){

for(var y=0;y<links2.length;y++){
        if(links2[y].getAttribute('class')=='only-child last-child'){

        links2[x].setAttribute('style','width:100%; height: 500px;overflow-y: auto;border: none; z-index: 1;float: left; background-color: #FFFCCF;')

}}}}

alert("hello")

}

*/