// ==UserScript==
// @name			Display My IP In Google Analytics
// @namespace		gaMyIPForFilter
// @include			https://www.google.com/analytics/settings/add_profile_filter?*
// @match			https://www.google.com/analytics/settings/add_profile_filter?*
// @include			https://www.google.com/analytics/settings/edit_profile_filter?*
// @match			https://www.google.com/analytics/settings/edit_profile_filter?*
// @datecreated		2010-01-05
// @lastupdated		2010-01-05
// @version			0.1
// @author			Erik Vergobbi Vold
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description		This userscript will display your IP address in the Google Analytics filter add/edit pages.
// ==/UserScript==

(function(){
	var d=document,
	q=d.evaluate("//td[contains(@class,'page_question')]//li[contains(@class,'admin_question_list')]",d,null,9,null).singleNodeValue;
	if(!q) return;
	q=q.parentNode;
	var newLi=d.createElement('li');
	newLi.innerHTML="<a target='_blank' href='http://whatismyip.com/'>What is my IP?</a><br/>";
	newLi.className='admin_question_list';
	q.appendChild(newLi);

	GM_xmlhttpRequest({
		method: "GET",
		url: "http://ipinfodb.com/ip_query.php?output=json",
		onload: function(response){
			if (response.readyState !== 4 || response.status !== 200) return;
			var data = JSON.parse(response.responseText);
			newLi.innerHTML+=data.Ip;
		}
	});
})();