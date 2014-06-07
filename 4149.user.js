// ==UserScript==
// @name           Stumbler Comments
// @namespace      http://strangej.stumbleupon.com/
// @description    Allows you to add comments about people!
// @include        http://*.stumbleupon.com/
// ==/UserScript==

//GM_setValue(name, value);
//GM_getValue(name);

(function(){

var jj;
var nm;
for (jj=0;jj<document.links.length;jj++)
{
	if (document.links[jj].innerHTML.indexOf("http://www.stumbleupon.com/images/profile.png")>0 || document.links[jj].innerHTML.indexOf("My Groups")>0)
	{
		nm = document.links[jj].href;
		nm = nm.split("/");
		nm = nm[2].split(".");
		nm = nm[0];
	}
}

function butt(id, title){
        var style = 'border:1px solid; border-color:#FC9 #630 #330 #F96; padding:1px 4px 1px 4px; font:bold 10px verdana,sans-serif;color:#FFF;background:#F60;text-decoration:none;margin:0;';
        return ' <a id="'+id+'" href="javascript:void(0)" style="'+style+'">'+title+'</a>';
}

function comm_commit() {
	GM_setValue("sucomment_"+nm, document.getElementById('comm_txt').value);
	document.getElementById('comm_txt').style.backgroundColor="yellow";
}

function comm_enlarge() {
	var x;
	x=document.getElementById('comm_txt');
	x.rows += 10;
}

function comm_clear() {
	document.getElementById('comm_txt').style.backgroundColor="white";
}

function comm_text() {
	var style = "width:715px;";
	var add = "<br><center><textarea style="+style+" id=\"comm_txt\" rows=10>";
	if (GM_getValue("sucomment_"+nm) != undefined)
	{
		add += GM_getValue("sucomment_"+nm);
	}
	add += "</textarea><br>";
	add += butt('comm_commit', "Commit Changes");
	add += butt('comm_enlarge', 'Enlarge Textarea');
	add += "</center><br>"
	
	document.getElementById('changetag').disabled=true;
	document.getElementById('displayurls').innerHTML=add;
	document.getElementById('comm_txt').addEventListener('keyDown', comm_clear, false);
	document.getElementById('comm_txt').addEventListener('click', comm_clear, false);
	document.getElementById('comm_txt').addEventListener('focus', comm_clear, false);
	document.getElementById('comm_commit').addEventListener('click', comm_commit, false);
	document.getElementById('comm_enlarge').addEventListener('click', comm_enlarge, false);
}

function init(){
    
        var btn = butt('comm_btn', 'Show Comments');

        var xpath2  = "//td[@class='lightbg']/span[@class='mini']";
        var result2 = document.evaluate ( xpath2, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
        

		if (document.getElementById('stt_btn'))
		{
			btn = document.createElement('a');
			btn.id="comm_btn";
			btn.innerHTML="Show Comments";
			btn.href="javascript:void(0)";
			document.getElementById('stt_btn').parentNode.appendChild(btn);
			btn=document.getElementById('comm_btn');
			btn.style.border="1px solid";
			btn.style.borderColor="#FC9 #630 #330 #F96";
			btn.style.padding="1px 4px 1px 4px";
			btn.style.font="bold 10px verdana,sans-serif";
			btn.style.color="#FFF";
			btn.style.background="#F60";
			btn.style.textDecoration="none";
			btn.style.margin="0";
		} else {
			for ( var i = 0; i < result2.snapshotLength; i++ ) {
				if (result2.snapshotItem(i).innerHTML.indexOf('Joined') != -1 ){
					result2.snapshotItem(i).parentNode.innerHTML += "<br/><br/>" + btn;
				}
			}
		}

        document.getElementById('comm_btn').addEventListener('click', comm_text, false);
}
    
init();

}) ();