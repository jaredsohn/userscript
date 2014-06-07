// ==UserScript==
// @name           navbar javascript
// @author         GuyintheMiddle-Orkutwares
// @description    to produce a navbar
// UserScript

/ if (document.all.clicksound==null){ //uncomment this line if you plan on having multiple navbars on one web page
//used for storing the sound position in the web page
document.write('<bgsound id="oversound">');
document.write('<bgsound id="clicksound">');


if (document.images) {
	//Button Image definitions go here		!!!!!
//***************   START IMAGE DEFINITION    **********************//
//** test IMAGE START **//
                test0_over=new Image(112, 26);
                test0_over.src="http://bp1.blogger.com/_vtZVyEb1rDw/R4uEzgGOZeI/AAAAAAAAA04/yhGUWn_nlow/s1600/test0_over.gif";
                test0_off=new Image(112, 26);
                test0_off.src="http://bp1.blogger.com/_vtZVyEb1rDw/R4uEzgGOZdI/AAAAAAAAA0w/A3K6kyLyoPQ/s1600/test0.gif";

                test1_over=new Image(221, 26);
                test1_over.src="http://bp2.blogger.com/_vtZVyEb1rDw/R4uEzwGOZgI/AAAAAAAAA1I/pX_Xb_VRrkI/s1600/test1_over.gif";
                test1_off=new Image(221, 26);
                test1_off.src="http://bp1.blogger.com/_vtZVyEb1rDw/R4uEzgGOZfI/AAAAAAAAA1A/mLNZWFGJdTE/s1600/test1.gif";

                test2_over=new Image(327, 26);
                test2_over.src="test2_over.gif";
                test2_off=new Image(327, 26);
                test2_off.src="test2.gif";

//** test IMAGE END **//



//***************   END IMAGE DEFINITION    **********************//
               }  //CLOSING FOR IMAGE DEFINITION AREA

               
//***************   START MENU DEFINITION    **********************//
//** test MENU START **//
//** test MENU END **//


//***************   END MENU DEFINITION    **********************//
//}     //uncomment this line if you plan on having multiple navbars on one web page


//********************* DO NOT MODIFY ANYTHING BELOW THIS LINE!!!!  *************************************//
function DL_GetElementLeft(eElement){var nLeftPos = eElement.offsetLeft;var eParElement = eElement.offsetParent;while (eParElement != null){nLeftPos += eParElement.offsetLeft;eParElement = eParElement.offsetParent;}return nLeftPos;}function DL_GetElementTop(eElement){var nTopPos = eElement.offsetTop;var eParElement = eElement.offsetParent;while (eParElement != null){nTopPos += eParElement.offsetTop;eParElement = eParElement.offsetParent;}return nTopPos;}function ActiveOverImage(NavBar_Subitem){var JN_nav;var JN_Complete;NavBar_imageOn(NavBar_Subitem);if(document.getElementById){JN_Complete = "document.getElementById('" + NavBar_Subitem + "Menu')";}else if(document.all){JN_Complete = "document.all['" + NavBar_Subitem + "Menu']";}JN_Nav = eval(JN_Complete);if (JN_Nav){if (JN_Nav.menupos==1){document.getElementById(NavBar_Subitem+'Menu').style.pixelLeft=DL_GetElementLeft(document.getElementById(NavBar_Subitem));document.getElementById(NavBar_Subitem+'Menu').style.pixelTop=DL_GetElementTop(document.getElementById(NavBar_Subitem))+document.getElementById(NavBar_Subitem).offsetHeight;}else{document.getElementById(NavBar_Subitem+'Menu').style.pixelLeft=DL_GetElementLeft(document.getElementById(NavBar_Subitem))+document.getElementById(NavBar_Subitem).offsetWidth;document.getElementById(NavBar_Subitem+'Menu').style.pixelTop=DL_GetElementTop(document.getElementById(NavBar_Subitem));}JN_Nav.style.visibility = 'visible';}}function InActiveImage(NavBar_Subitem){var JN_Nav;var JN_Complete;NavBar_imageOff(NavBar_Subitem);if(document.getElementById){JN_Complete = "document.getElementById('" + NavBar_Subitem + "Menu')";}else if(document.all){JN_Complete = "document.all['" + NavBar_Subitem + "Menu']";}JN_Nav = eval(JN_Complete);if (JN_Nav){JN_Nav.style.visibility = 'hidden';}}function NavBar_imageOn(iname){if (document.images){document[iname].src = eval(iname + "_over.src");}}function NavBar_imageOff(iname){if (document.images){document[iname].src = eval(iname + "_off.src");}}function Generate_Menu(NavBar_Menu, JN_backcolor, JN_overcolor, JN_textcolor, JN_overtextcolor, JN_linecolor){if ((document.all) || (document.getElementById)){var NavBar_Subitem = "";for (j = 0; j < NavBar_Menu.length; j++){NavBar_Subitem += "<div id=\"" + NavBar_Menu[j][0] + "Menu\" menupos=\""+ NavBar_Menu[j][1] +"\" style=\"z-index:999; position: absolute; left: 0;  width: " + NavBar_Menu[j][2] + ";  visibility: hidden\" onmouseover=\"ActiveOverImage('" + NavBar_Menu[j][0] + "');\" onmouseout=\"InActiveImage('" + NavBar_Menu[j][0] + "');\">";NavBar_Subitem += "<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"" + NavBar_Menu[j][2] + "\">";NavBar_Subitem += "<tr>";NavBar_Subitem += "<td colspan=\"2\" bgcolor=\"" + JN_linecolor + "\" height=\"1\"><img src=\"pixel.gif\" width=\"1\" height=\"1\"></td>";NavBar_Subitem += "</tr>";for (i=3; i < NavBar_Menu[j].length-1; i=i+2){NavBar_Subitem += "<tr>";NavBar_Subitem += "<td width=\"1\" bgcolor=\"" + JN_linecolor + "\"><img src=\"pixel.gif\" width=\"1\" height=\"22\"></td>";if( document.isRemoteHosted == 'local' ){NavBar_Subitem += "<td width=\"108\" bgcolor=\"" + JN_backcolor + "\" class=\"NavbarMenu\" onClick=\"document.location.href='" + NavBar_Menu[j][i+1] + "'\" onmouseover=\"this.bgColor='" + JN_overcolor + "';this.style.color='" + JN_overtextcolor+ "';\" onmouseout=\"this.bgColor='" + JN_backcolor + "';this.style.color='" + JN_textcolor + "'\" style=\"color: " + JN_textcolor + "\"><div style=\"padding-left:12px;\">" + NavBar_Menu[j][i] + "</a></div></td>";}else if( !(IsRelativeURL( NavBar_Menu[j][i+1] )) ) {NavBar_Subitem += "<td width=\"108\" bgcolor=\"" + JN_backcolor + "\" class=\"NavbarMenu\" onClick=\"document.location.href='" + NavBar_Menu[j][i+1] + "'\" onmouseover=\"this.bgColor='" + JN_overcolor + "';this.style.color='" + JN_overtextcolor+ "';\" onmouseout=\"this.bgColor='" + JN_backcolor + "';this.style.color='" + JN_textcolor + "'\" style=\"color: " + JN_textcolor + "\"><div style=\"padding-left:12px;\">" + NavBar_Menu[j][i] + "</a></div></td>";}else{NavBar_Subitem += "<td width=\"108\" bgcolor=\"" + JN_backcolor + "\" class=\"NavbarMenu\" onClick=\"document.location.href='" + NavBar_Menu[j][i+1] + "'\" onmouseover=\"this.bgColor='" + JN_overcolor + "';this.style.color='" + JN_overtextcolor+ "';\" onmouseout=\"this.bgColor='" + JN_backcolor + "';this.style.color='" + JN_textcolor + "'\" style=\"color: " + JN_textcolor + "\"><div style=\"padding-left:12px;\">" + NavBar_Menu[j][i] + "</a></div></td>";}NavBar_Subitem += "<td width=\"1\" bgcolor=\"" + JN_linecolor + "\"><img src=\"pixel.gif\" width=\"1\" height=\"22\"></td>";NavBar_Subitem += "</tr>";NavBar_Subitem += "<tr>";NavBar_Subitem += "<td colspan=\"3\" bgcolor=\"" + JN_linecolor + "\" height=\"1\"><img src=\"pixel.gif\" width=\"1\" height=\"1\"></td>";NavBar_Subitem += "</tr>";}NavBar_Subitem += "</table>";NavBar_Subitem += "</div>";}document.write(NavBar_Subitem);}}function IsRelativeURL (url){if (url.indexOf('http://') == 0){return false;}else if (url.indexOf('https://') == 0) {return false;}else if (url.indexOf('ftp://') == 0){return false;}else if(url.indexOf('mailto://') == 0){return false;}else{return true;}}function playMouseOver(WaveName){if (document.all) {document.all.oversound.src = WaveName;}}function playMouseClick(WaveName){if (document.all){document.all.clicksound.src = WaveName;}}
