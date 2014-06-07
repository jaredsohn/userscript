// ==UserScript==
// @name			SF.net Help Wanted - Create Job
// @namespace		sf-jobs-create
// @include			https://sourceforge.net/p/*/admin/*
// @datecreated		2012-06-30
// @lastupdated		2013-08-03
// @version			1.2
// @author			Volkan K.
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description		This userscript will redirect you to Create Job page for the SF.net Jobs.
// ==/UserScript==

GM_registerMenuCommand("SF.net Help Wanted - Create Job", function(){
var matches=window.location.href.match(/\/([^\/]+?)\/admin\//);
if (matches != null) {
	prname=matches[1];

	GM_xmlhttpRequest({
	method: "GET",
	url: "https://sourceforge.net/projects/"+prname+"/",
	onerror: function(oEvent){ alert("Error " + oEvent.target.status + " occurred while receiving the document."); },
	onload: function(response){
		if (response.readyState !== 4 || response.status !== 200) return;
		// we can parse now
		var myregexp = /\?group_id=(\d+?)(?:"|')/;
		var match = myregexp.exec(response.responseText);
		if (match != null) {
			// got match
			SF_GROUP_ID = match[1];
			alert('Redirecting to : Help Wanted - Create Job for '+prname+' project (Group ID: '+SF_GROUP_ID+')'); // for testing
			//window.location.replace('https://sourceforge.net/people/createjob.php?group_id='+SF_GROUP_ID);
			window.location.href='https://sourceforge.net/people/createjob.php?group_id='+SF_GROUP_ID;
		} else {
			// no match, error
			alert("I couldn't find your SF.net Group ID :(");
		}
	}
	});

} else {
	alert('Match attempt failed for project unix name.');
}

});

(function(){
	//dummy function :P
})();
