// ==UserScript==
// @name           Google Classic
// @namespace      http://chartreuse.shell.tor.hu/
// @description    Google as it use to be
// @include        http://www.google.com/
// @include        http://www.google.*/
// @include        http://www.google.com/webhp*
// @include        http://www.google.*/webhp*
// ==/UserScript==

// Remove fade in
var css =  "#fctr,#ghead,#pmocntr,#sbl,#tba,#tbe,.fade,.gbh { opacity: 1 !important; filter:alpha(opacity=100) !important; }";
var style = document.createElement('style');
style.type = "text/css";
style.innerHTML = css;
document.getElementsByTagName('head')[0].appendChild(style);

// Remove the iframe
var alliframes, thisiframe;
alliframes = document.getElementsByTagName('iframe');
for (var i = 0; i < alliframes.length; i++) 
{
    thisiframe = alliframes[i];
    if (thisiframe) 
	{
		thisiframe.parentNode.removeChild(thisiframe);
	}
}
// Remove unused textareas
var textarea = document.getElementById('csi');
if (textarea) {
    textarea.parentNode.removeChild(textarea);
}
textarea = document.getElementById('wgjc');
if (textarea) {
    textarea.parentNode.removeChild(textarea);
}
textarea = document.getElementById('csi');
if (textarea) {
    textarea.parentNode.removeChild(textarea);
}
textarea = document.getElementById('hcache');
if (textarea) {
    textarea.parentNode.removeChild(textarea);
}
// Remove the user bar
var userbar = document.getElementById('guser');
if (userbar) {
    userbar.parentNode.removeChild(userbar);
}
// Remove some extra divs
var barseperator = document.getElementById('gbi');
if (barseperator) {
    barseperator.parentNode.removeChild(barseperator);
}
var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@class='gbh']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
	thisDiv.parentNode.removeChild(thisDiv);
}
var someDiv = document.getElementById('xjsd');
if (someDiv) {
    someDiv.parentNode.removeChild(someDiv);
}
someDiv = document.getElementById('xjsi');
if (someDiv) {
    someDiv.parentNode.removeChild(someDiv);
}
// Add prefrences link to old spot
var languageLinks, languageLink;
languageLinks = document.evaluate(
    "//a[@href='/language_tools?hl=en']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < languageLinks.snapshotLength; i++) {
    languageLink = languageLinks.snapshotItem(i);
	if(languageLink)
	{
		var preflink = document.createElement("a");
		preflink.href = "/preferences?hl=en";
		preflink.class = "ab4";
		preflink.innerHTML = "Preferences";
		languageLink.parentNode.insertBefore(preflink, languageLink);
		var newline = document.createElement("br");
		languageLink.parentNode.insertBefore(newline, languageLink);
	}
}	
// Move gBar above search box
gBar = document.getElementById('gbar');
var searchForms, searchForm;
searchForms = document.evaluate(
    "//form[@name='f']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < searchForms.snapshotLength; i++) {
    searchForm = searchForms.snapshotItem(i);
	if(searchForm)
	{
		gBar.style.cssFloat = 'none';
		searchForm.parentNode.insertBefore(gBar, searchForm);

	}
}	
