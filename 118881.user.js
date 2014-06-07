// ==UserScript==
// @name            HackForums Easy Junk/Close/Edit
// @namespace       xerotic/easyjunkcloseedit
// @description     Easy options to junk/close/edit your threads in search results.
// @include         http://hackforums.net/search.php*
// @include         http://www.hackforums.net/search.php*
// @version         1.0
// ==/UserScript==

var tds = document.getElementsByTagName("td");
var as = document.getElementsByTagName("a");
var imgs = document.getElementsByTagName("img");
var imgc = 0;
var imgx = new Array();
var e;
var c = 0;
var tids = new Array();
var t = 0;
var junk;
var status;
var postkey = document.head.innerHTML.split('my_post_key = "')[1];
var mypostkey = postkey.split('"')[0];
var n = document.getElementById('panel').innerHTML.split('>Welcome back, <a href="http://www.hackforums.net/member.php?action=profile&amp;uid=')[1];
var na = n.split('">')[1];
var nam = na.split("</a>")[0];

var regex = new RegExp(nam,"g");
var countname = document.body.innerHTML.match(regex);  

if(countname.length > 20){

	for(var i = 0; i<imgs.length; i++){
		e = imgs[i];
		if(e.src.indexOf('folder') != -1){
			if(e.src.indexOf('lock') != -1){
				imgx[imgc] = "selfopen";
			}else{
				imgx[imgc] = "selfclose";
			}
			imgc = imgc + 1;
		}
	}

	for(var i = 0; i<as.length; i++){
			e = as[i];
			if(e.id.indexOf("tid_") != -1){
				tids[t] = e.id.split("tid_")[1];
				t = t + 1;
			}
		}

	if(document.body.innerHTML.indexOf("Thread</a> </strong> /") != -1){
		for(var i = 0; i<tds.length; i++){
			e = tds[i];
			if(e.innerHTML=="&nbsp;"){
				if(imgx[c] == 'selfclose'){
					status = 'Close';
				}else{
					status = 'Open';
				}
				junk = '<form action="moderation.php" method="post"><input type="hidden" name="tid" value="'+tids[c]+'" /><input type="hidden" name="action" value="'+imgx[c]+'" /><input type="hidden" name="my_post_key" value="'+mypostkey+'" />&nbsp;<input type="submit" class="bitButton" style="margin-top:-15px;" value="'+status+'"  /></form><form action="moderation.php" method="post" onsubmit="return confirm(\'Are you sure? Really really sure?\');"><input type="hidden" name="tid" value="'+tids[c]+'" /><input type="hidden" name="action" value="ub3rjunk" /><input type="hidden" name="my_post_key" value="'+mypostkey+'" /><input type="submit" class="bitButton" value="Junk" /></form>';
				e.innerHTML = junk;
				c = c + 1;
			}
		}
	}
	
}

