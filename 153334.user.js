// ==UserScript==
// @name			Wider Youtube Videos
// @version			0.1.0
// @author			Deekshith Allamaneni
// @namespace		http://www.deekshith.in
// @description		View all youtube videos in wide mode so as to have a clear and focused youtube experience.
// @include			*youtube.com/watch?*
// @include			http://www.youtube.com/watch?*
// @include			https://www.youtube.com/watch?*
// @run-at document-start
// @copyright 2012, Deekshith Allamaneni (http://www.deekshith.in)
// @license GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==+

/*
___________________________________________________________


 Author:          Deekshith Allamaneni
 Support Website: <http://www.deekshith.in>
 Support Email:   dkh <dot> hyd <at> gmail <dot> com
 For quick support visit: <http://www.facebook.com/deekshithallamaneni>
 Userscripts.org URL: <http://userscripts.org/scripts/show/127774>

___________________________________________________________

*/

(function(){

if(getVar('wide') == ''){
	document.location.href = document.location.href+"&wide=1";
}
create_feedback_button();

function getVar(name)
{
	get_string = document.location.search;         
	return_value = '';
	do 
	{ //This loop is made to catch all instances of any get variable.
		name_index = get_string.indexOf(name + '=');
		if(name_index != -1)
		{
			get_string = get_string.substr(name_index + name.length + 1, get_string.length - name_index);
			end_of_value = get_string.indexOf('&');
			if(end_of_value != -1)                
				value = get_string.substr(0, end_of_value);                
			else                
				value = get_string;                
			if(return_value == '' || value == '')
				return_value += value;
			else
				return_value += ', ' + value;
		}
	} while(name_index != -1);
	space = return_value.indexOf('+');
	while(space != -1)
	{ 
		return_value = return_value.substr(0, space) + ' ' + 
		return_value.substr(space + 1, return_value.length);
		space = return_value.indexOf('+');
	}
	return(return_value);        
}	

function create_feedback_button() {
if(document.body){
	var a = document.createElement('span');
	a.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.deekshith.in/p/contact.html?wyv=001\" target='_blank'>Feedback?</a>";
	var c = "opacity:0.7;position:fixed;text-align:right;right:10px;bottom:0px;z-index:50000;";
	c+="border: 2px solid;-moz-border-top-colors: ThreeDLightShadow ThreeDHighlight;-moz-border-right-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-bottom-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-left-colors: ThreeDLightShadow ThreeDHighlight;padding: 3px;color: MenuText;background-color: Menu;font-size:9pt;font-family:arial,sans-serif;cursor:pointer;";
	a.style.cssText = c;
	a.addEventListener('mouseover', function(){ a.style.opacity = 1; }, false);
	a.addEventListener('mouseout', function(){ a.style.opacity = 0.5; }, false);
	a.addEventListener('click', function(){ window.scrollTo(0,0); }, false);
	document.body.appendChild(a);
	}
};

})();
