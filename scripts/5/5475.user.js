// ==UserScript==

// @name Emoticon  [dog]
          
// @namespace      http://www.orkut.com/Profile.aspx?uid=1010865412680808803     

// @author 	   Shelby

// @description    Um Script Com O Emotion - [dog]

// @include        http://www.orkut.com/*

// ==/UserScript==





/*

#############################################################################################
#
#cachorro imagem by sam
#
# 
#                                                    
#############################################################################################
  
*/



/*

################################
# Codigo do emoticon novo->[dog]#
################################

*/



image = "http://img177.imageshack.us/img177/2330/caoce9.gif" 
		




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

x=x.replace(/\[dog\]/g,"<img border='0' src="+image+">");

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

