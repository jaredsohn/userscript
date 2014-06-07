// ==UserScript==
// @name           Orkut - AJAX Style Album 
// @namespace      http://www.devilsworkshop.org/2007/07/04/ajax-style-orkut-album-navigate-albums-the-fastest-and-simplest-way/
// @description    Album navigation changed forever
// @include        http://*.orkut.*/Album.aspx*
// @author	   Rahul Bansal
// ==/UserScript==

//Auxillary Functions
function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function addGlobalJSfun(func) {
    var head, jsfun;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    jsfun = document.createElement('script');
    jsfun.type = 'text/javascript';
    jsfun.innerHTML = func;
    head.appendChild(jsfun);
}

function createXMLHttpRequest() {
            try {
                return new XMLHttpRequest;
            } catch (e) {
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP");
                } catch (e) {
                    try {
                        return new ActiveXObject("Microsoft.XMLHTTP");
                    } catch (e) {
                        alert("Its navigating n \ xE3o possesss support \ xE0 technology AJAX!");
                        return false;
                    }
                }
            }
        }


//Lets REEL ITTTTT
window.addEventListener(
	'load',
	function() {

//START
//ADD CSS to take care of scrolling effect
addGlobalStyle('#dscroll {width:190px; height:' + (window.screen.height * .65 ) +  ' ; overflow:scroll; overflow-y: auto; overflow-x:hidden;}');

addGlobalStyle( '#dscroll img:hover {border:medium solid #BFD0EA;}' );

//ADD createXMLHttpRequest function
addGlobalJSfun('function createXMLHttpRequest() {'
+ 'try { return new XMLHttpRequest; } catch (e) {'
+ 'try { return new ActiveXObject(\"Msxml2.XMLHTTP\"); '
+ '} catch (e) { try { return new ActiveXObject(\"Microsoft.XMLHTTP\"); ' 
+ '} catch (e) { return false;'
+ '}}}'
+ '} ');

//ADD Load-img function
addGlobalJSfun('function load_image(path, txt ) {'
+ 'var xml = createXMLHttpRequest();'
+ 'xml.open(\"GET\", path, true);'
+ 'xml.onreadystatechange = function () {if (xml.readyState == 4) {var xmlr = xml.responseText;'
+ 'xmlr = xmlr.split(\'id=\"image\"\');'
+ 'xmlr = xmlr[1].split(\'src=\');'
+ 'xmlr = xmlr[1].split(\'\"\');'
+ 'document.getElementById(\"dwimg\").src = xmlr[1] ;'
+ 'document.getElementById(\"dwtext\").innerHTML = txt ;'
+ '}};'
+ 'xml.send(null);'
+ '} ');

//Make new Panel Header

//New Table
	var newtable = document.createElement("table");
	newtable.width = "100%"
	newtable.innerHTML = '<tr>';
	var oldpan = xpath('/html/body/table[2]/tbody/tr/td[3]/table[1]/tbody/tr[1]');

	newtable.innerHTML += '<td class=\"panelHeader\"><span style=\"text-transform: none;\">AJAX Style Orkut Album by : <a href=\"http://www.devilsworkshop.org\">Devils Workshop</a></span></td>'
		+ oldpan.snapshotItem(0).innerHTML
		+ '<td class=\"panelHeader\"><span style=\"text-transform: none;\"><a href=\"http://www.devilsworkshop.org/2007/07/04/ajax-style-orkut-album-navigate-albums-the-fastest-and-simplest-way/\">Contact US (Help, Suggestion, etc...) </a></span></td>'
		+'</tr>';

	var targetname = oldpan.snapshotItem(0).innerHTML;
	targetname = targetname.split(">");
	targetname = targetname[2].split("<")[0];

	var targetlink = location.href.split("uid=")[1];

			//Make new subpanel for backlinks
	newtable.innerHTML += '<tr>';
	newtable.innerHTML += '<td colspan="2" class=\"panelHeader\"><span style=\"text-transform: none; text-align: center\">View '+ targetname + '\'s \- '
	+ '<a href=\"/Profile.aspx?uid='+targetlink+'\">Profile</a> | '
	+ '<a href=\"/Scrapbook.aspx?uid='+targetlink+'\">Scrapbook</a> | '
	+ '<a href=\"/FriendsList.aspx?uid='+targetlink+'\">Friends</a> | '
	+ '<a href=\"/FavoriteVideos.aspx?uid='+targetlink+'\">Videos</a> | '
	+ '<a href=\"/ProfileF.aspx?uid='+targetlink+'\">Fans</a> || '
	+ '<a href=\"/FriendAdd.aspx?uid='+targetlink+'\">Add '+ targetname + ' as a friend</a>'
	+'</td>'
	+'<td class=\"panelHeader\"><span style=\"text-transform: none\"><a href=\"http://www.orkut.com/Community.aspx?cmm=19587001\">Devils Workshop ORKUT Community</a>'
	+'</td>';
	newtable.innerHTML += '</tr>';

	var maintab = xpath('/html/body/table[1]');
  maintab.snapshotItem(0).parentNode.insertBefore(newtable,maintab.snapshotItem(0).nextSibling);




//Make vertical bar
//First prepare some variable for complex HTML
	var picarr = xpath('/html/body/table[3]/tbody/tr/td[3]/table/tbody/tr[2]/td/table/tbody/tr/td') ;


//check if object is null - NO PICS 
//Also Check if album is urs
var testself = xpath ('//input[@name=\'uploadPicture\']');
if (!testself.snapshotLength) {
if (picarr.snapshotLength){
//Create a Scrolling DIV Element i.e. SIDEBAR
	var picroll = document.createElement("div");
	picroll.id = "dscroll";



//Main Loop to Create REEL

	for (var i=0; i<picarr.snapshotLength; i++)
	{
		//skip item 0,4,8,12
		if ( (i+1) % 4) {
		var tmpcell = picarr.snapshotItem(i).innerHTML;
		tmpcell = tmpcell.split('<br>');
		var imgtxt = tmpcell[1];
		var getsrc = tmpcell[0].split('"');

//		var newa = document.createElement("a");
//		newa.href =  getsrc[1];

		var newimg = document.createElement("img");
		newimg.src = getsrc[3];
		GM_log (getsrc[1]);
		imgtxt = imgtxt.toSource();
		imgtxt = imgtxt.split('"');		
		imgtxt = imgtxt[1].replace(/\'/g,"\\\'");

		newimg.setAttribute('onclick' , 'load_image(\'' + getsrc[1] + '\'' + ', '+ '\''+ imgtxt + '\')\;');

		picroll.innerHTML += '<tr><td>' ;

	//	newa.appendChild(newimg);
		picroll.appendChild(newimg);

		picroll.innerHTML += '<br>' + tmpcell[1] + '<br><br>' + '</td></tr>';
		//GM_log ( newimg );
		}
	}

//CLOSE DIV

//Replace Profile with vertical Bar
	var sidepan = xpath('/html/body/table[3]/tbody/tr/td') ;

	sidepan.snapshotItem(0).parentNode.replaceChild(picroll, sidepan.snapshotItem(0));

//Open First pic on right side
	var mainpan = xpath('/html/body/table[3]/tbody/tr/td[2]/table/tbody');
	
	var maindiv = document.createElement("div");
	maindiv.align = "center";
	maindiv.class = ""

//add image
	var mainimg = document.createElement("img");
	mainimg.id = "dwimg";
	mainimg.valign = "middle";
	maindiv.appendChild(mainimg);

//add text
	var maintext = document.createElement("p");
	maintext.id = "dwtext";
	maindiv.appendChild(maintext);
	mainpan.snapshotItem(0).parentNode.insertBefore(maindiv, mainpan.snapshotItem(0));
	mainpan.snapshotItem(0).parentNode.removeChild(mainpan.snapshotItem(0));

//Call of fun
//calculate image
var init_img = picarr.snapshotItem(0).innerHTML;
init_img = init_img.split('<br>');
var init_text = init_img[1];
init_img = init_img[0].split('"');
init_img = init_img[1];
//GM_log(init_img);
var xml = createXMLHttpRequest();
xml.open("GET", init_img, true);
xml.onreadystatechange = function () {if (xml.readyState == 4) {var xmlr = xml.responseText;
xmlr = xmlr.split('id="image"');
xmlr = xmlr[1].split('src=');
xmlr = xmlr[1].split('"');
document.getElementById("dwimg").src = xmlr[1];
document.getElementById("dwtext").innerHTML = init_text;
}};
xml.send(null);

//Small fix
var fixbg = xpath('/html/body/table[3]/tbody/tr/td[2]/table');
fixbg.snapshotItem(0).setAttribute('class','');
//END
}
}
	},
	true);

