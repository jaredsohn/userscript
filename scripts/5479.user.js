// ==UserScript==

// @name Emoticon  [tia]
          
// @namespace      http://www.orkut.com/Profile.aspx?uid=13775786596605941689      

// @author 	   Sam

// @description    Um Script Com O Emotion - [tia]

// @include        http://www.orkut.com/*

// ==/UserScript==





/*

#############################################################################################
#
#pinto bebado
#
# 
#                                                    
#############################################################################################
  
*/



/*

################################
# Codigo do emoticon novo->[tia]#
################################

*/



image = "http://i109.photobucket.com/albums/n48/samwinch/Animation3.gif" 
		




var x = document.body.innerHTML;

if(x.indexOf("<textarea") > -1){
	var backup = new Array();
	backup = document.getElementsByTagName("textarea");
	var y=0;
	storage_textarea = new Array();
	while(backup[y] != null){
		storage_textarea[y]=escape(document.getElementsByTagName("textarea").item(y).value);
		y++;
	}
}
if(x.indexOf("<input") > -1){
	var backup_input = new Array();
	backup_input = document.getElementsByTagName("input");
	y=0;
	storage_input = new Array();
	while(backup_input[y] != null){
		storage_input[y] = escape(document.getElementsByTagName("input").item(y).value);
		y++;
	}
}

x=x.replace(/\[tia\]/g,"<img border='0' src="+image+">");

document.body.innerHTML = x;

if(x.indexOf("<textarea") > -1){
	y=0;
	while(storage_textarea[y] != null){
		document.getElementsByTagName("textarea").item(y).value = unescape(storage_textarea[y]);
		y++;
	}

}
if(x.indexOf("<input") > -1){
	y=0;
	while(storage_input[y] != null){
		document.getElementsByTagName("input").item(y).value = unescape(storage_input[y]);
		y++;
	}
}