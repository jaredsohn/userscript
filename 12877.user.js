// ==UserScript==
// @name		ImageFap Auto-Access to Full images V1.51
// @namespace		http://none
// @description		With this script you can access auto the full version of images into ImageFap. I build this script because the other scripts I found into userscripts are not working with the new version of imagefap pages. The script is created with a help of some older scripts that i found for imagefap – Thanks for your help guys - but also i add new features. Features:  view user profile,galleries,fan base,gallery name, search for more with the name of gallery in Imagefap or Google. Warning !!!! IM NOT AN EXPERT at javascript, so forgive me for any errors.
// @include		http://www.imagefap.com/gallery.php?*gid*
// ==/UserScript==

var obj = document.getElementsByTagName('img');
var url_regex = /(.*images\.imagefap\.com\/images\/thumb\/.*)\/(.*)$/i;
var newBody = "<html><head>" +
"<style type=\"text/css\"><!--" +
"body {background: #000000}"+
"#www {height:62px; width:62px; background:#345342; }" +
"a { text-decoration: none;" +
	"width: 45px;" + 
	"height: 32px;" +
	"color: #ffffff;" +
	"font-family: \"Courier New\", Courier, monospace;" +
	"font-size: 22px;" +
	"font-align:center;" +
	"background-color: #000011;" +
	"border: solid 1px #FFFF00; }" +
"a:hover { background-color: #FF6600; }" +	
"--></style><head><body>";

for(i = 0 ; i < obj.length; i++) {
	if (url_regex.test(obj[i].src)) {
		var temp = url_regex.exec(obj[i].src);

		newBody += "<span style=\"backgound-color: #000000; position: absolute; padding: 5px; -moz-opacity:0.5;\">" +
			"<a href=\"http://www.imagefap.com/image.php?id=" +temp[2]+ "\" target=\"_blank\">" +temp[2]+ "</a></span>" +
//			"<img src=\"http://images1.imagefap.com/full/getimg.php?img=" +temp[2]+ "\" onload=\"" +
			"<img style=\"border:5px solid #669900\" src=\"" +temp[0].replace(/thumb/, 'full')+ "\" onload=\"" +
			"this.alt = window.innerWidth / this.width;" +
			"if (window.innerHeight / this.height < this.alt) this.alt = window.innerHeight / this.height;" +
			"if (this.alt < 1) this.width = this.width * this.alt - 25; else this.alt = 1;\"" +
			"onclick=\"this.style.width = (this.style.width == 'auto' && this.alt < 1) ? this.width * this.alt - 25 + 'px' : 'auto';\"/><p />";
	}
}
//newBody='';
newBody += "<div style=\" font-size:18px; color:#CCFF00; width:100%; height:10px; border-top:dashed 1px #CCFF00; padding-top:3px; border-bottom:dashed 1px #CCFF00; padding-bottom:15px;\"> Navigation </div>";
newBody += "<div style=\"padding:10px\";>";
var objAnchors = document.getElementsByTagName('a');
var firstobj='';

    for (var intAnchorsPos = 0; intAnchorsPos < objAnchors.length; intAnchorsPos++) {
      if (objAnchors[intAnchorsPos].href.match("#")) {  //when onClick is active for a link, it ends with '#'
	
	var strAnchorQueryFile = new String(objAnchors[intAnchorsPos].getAttribute('onClick'));
	
	if (strAnchorQueryFile) {
		  var objAnchorQueryFile = strAnchorQueryFile.split("'");
		  
		  if (firstobj=='') {
		  	
		  	firstobj=objAnchors[intAnchorsPos].text;
			  }
			else if (objAnchors[intAnchorsPos].text==firstobj) {
				
				break
				}
				
		  		newBody += "<span style=\"font-size: 22px;\">";
		  		
		  		if (objAnchors[intAnchorsPos].text==":: prev ::") {
				newBody += "<a style=\"border:none; background:none;\" href=\"gallery.php?" + objAnchorQueryFile[1] + "\"> <img src=\"http://images.imagefap.com/full/20/12f6e2a08fbf3fca11992d0b688c72b7/102266337.png\" align=\"bottom\" width=\"32\" height=\"32\" > </a>&nbsp;&nbsp;&nbsp; ";	
				}
				else if (objAnchors[intAnchorsPos].text==":: next ::") {
				newBody += "<a style=\"border:none; background:none;\" href=\"gallery.php?" + objAnchorQueryFile[1] + "\"> <img src=\"http://images.imagefap.com/full/25/32bcb8403e57186ae3d2a913a3c45fa2/816233873.png\" align=\"bottom\" width=\"32\" height=\"32\" > </a>&nbsp;&nbsp;&nbsp; ";	
				}else {newBody += "<a href=\"gallery.php?" +objAnchorQueryFile[1]+ "\">" +objAnchors[intAnchorsPos].text+ "</a>&nbsp;&nbsp;&nbsp;"};


    }
}

}


newBody += "</div>";
newBody += "<div style=\"border:1px solid #ffffff; marging:50px; text-align:center;\">";
var objAnchors = document.getElementsByTagName('font');
var Username='';

    for (var intAnchorsPos = 0; intAnchorsPos < objAnchors.length; intAnchorsPos++) {
       	if (objAnchors[intAnchorsPos].childNodes[0].nodeType==3) {
        	//newBody += objAnchors[intAnchorsPos].childNodes[0].nodeValue + " ";
			if (!(objAnchors[intAnchorsPos].childNodes[0].nodeValue.match("profile")==null)){
        newBody +=  "<span style=\"color:#ffffff; \"> This gallery is from : </span> <span style=\"color:#CCFF00;\"> " + objAnchors[intAnchorsPos].childNodes[0].nodeValue + "</span>";
        Username=objAnchors[intAnchorsPos].childNodes[0].nodeValue.split("'");	
			}
		}
    }
    
    
newBody += "<div style=\"border:1px solid #ffffff; marging:50px; text-align:center;\">";

var objAnchors = document.getElementsByTagName('font');
var firstobj='';

    for (var intAnchorsPos = 0; intAnchorsPos < objAnchors.length; intAnchorsPos++) {
       	
		   if ( objAnchors[intAnchorsPos].getAttribute("size")==4) {
       		
        	newBody += " <span style=\"color:#ffffff; \"> Gallery nane: </span> <span style=\"color:#FFFF00; font-size:22px; font-weight:bold;  \">  " + objAnchors[intAnchorsPos].childNodes[0].childNodes[0].nodeValue + "</span> ";

        	newBody += "<div>";
			newBody += "<a style=\"font-size:15px; \" href=\"http://www.imagefap.com/gallery.php?search=%22" + objAnchors[intAnchorsPos].childNodes[0].childNodes[0].nodeValue + "%22&submit=Search%21&type=1\"> Search for more in ImageFap (EXACT phrase) </a>&nbsp;&nbsp;&nbsp;" ;
        	newBody += "<a style=\"font-size:15px; \" href=\"http://www.imagefap.com/gallery.php?search=" + objAnchors[intAnchorsPos].childNodes[0].childNodes[0].nodeValue + "&submit=Search%21&type=1\"> Search for more in ImageFap (ANY word) </a>&nbsp;&nbsp;&nbsp;" ;
        	newBody +="</div> <div>";
        	newBody += "<a style=\"font-size:15px; \" href=\"http://www.google.com/search?q=%22" + objAnchors[intAnchorsPos].childNodes[0].childNodes[0].nodeValue + "%22\"> Search for more with Google (Exact phrase) </a>&nbsp;&nbsp;&nbsp;" ;
        	newBody += "<a style=\"font-size:15px; \" href=\"http://www.google.com/search?q=" + objAnchors[intAnchorsPos].childNodes[0].childNodes[0].nodeValue + "\"> Search for more with Google (Any Word) </a>" ;
        	newBody += "</div>";
		
		break;
		}
    }

newBody += "</div>";
// --------- Closed Div gallery name --------

var objAnchors = document.getElementsByTagName('a');
var UserID='';
//===== Start div menu ------------
newBody += "<div style=\"border:1px solid #ffffff; marging:50px; text-align:center;\">";
// ----- Add hyperlink for user profile ----
newBody += "<a href=\"http://www.imagefap.com/profile.php?user=" + Username[0] + " \" > profile user </a> &nbsp;&nbsp;&nbsp;";
    for (var intAnchorsPos = 0; intAnchorsPos < objAnchors.length; intAnchorsPos++) {
       
	  if (objAnchors[intAnchorsPos].href.match("usergallery.php") ) {  //search for user id 
	  UserID = objAnchors[intAnchorsPos].href.split("="); //Split Id of user
	  // Add hyperlink for user galleries
	newBody += "<a href=\"/usergallery.php?userid=" + UserID[1] + " \"> <b> Galleries </b> </a>&nbsp;&nbsp;&nbsp; ";
	  // Add hyperlink for user Favorites
	newBody += "<a href=\"/showfavorites.php?userid=" + UserID[1] + " \"> <b>  Favorites </b> </a>&nbsp;&nbsp;&nbsp; ";
	  // Add hyperlink for user Fanbase
	newBody += "<a href=\"/fanbase.php?userid=" + UserID[1] + " \"> <b>  Fanbase </b> </a>&nbsp;&nbsp;&nbsp; ";
    //var strAnchorQueryFile = new String(objAnchors[intAnchorsPos].getAttribute('onClick'));
	

		}			

}
newBody += "</div>"; 
// --------- Close div menu


// -------  Close main div bottom
newBody += "</div>"; 
newBody += "</body></html>";

//check if new page is loaded
var objAnchors = document.getElementsByTagName('font');


    for (var intAnchorsPos = 0; intAnchorsPos < objAnchors.length; intAnchorsPos++) {
       	if (objAnchors[intAnchorsPos].childNodes[0].nodeType==3) {
        	//newBody += objAnchors[intAnchorsPos].childNodes[0].nodeValue + " ";
			if (!(objAnchors[intAnchorsPos].childNodes[0].nodeValue.match("profile")==null)){
    	document.write(newBody);
			}
		}
    }
 

//window.addEventListener('load', function() { document.write(newBody); }, true);
