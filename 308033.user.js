// ==UserScript==
// @name				Github Clone URL Username Adder
// @id					github-clone-url-username-adder
// @namespace			github-username-adder

// @description			Adds username to clone URL and a button to clone using TortoiseGit
// @version				0.1.1
// @screenshot			http://i.imgur.com/9pRgUAU.png

// @author				KOLANICH
// @copyright			KOLANICH, 2014
// @contributionURL		http://userscripts.org/scripts/show/308033
// @contributionAmount	feel free to contribute

// @include				/https?://github.com/[\w_ -]+/.+/?/
// @grant				none
// @noframes			1
// @run-at				document-idle
// @optimize			1
// ==/UserScript==
const githubForWindowsPrefix="github-windows://openRepo/";
const tortoiseGitPrefix="tgit://clone/";
try{
	var authorName=document.getElementsByName("octolytics-dimension-user_login")[0].content;
	var cloneURLBox=document.querySelector('[data-protocol-type="http"]').getElementsByTagName("INPUT")[0];
	var link=document.createElement("A");
	link.href=cloneURLBox.value;
	link.username=authorName;
	cloneURLBox.value=link.href;
	link.href=tortoiseGitPrefix+link.href;
	link.className="minibutton sidebar-button";
	link.innerHTML="<span class=\"octicon octicon-device-desktop\"></span> Clone to TortoiseGit";
	var cloneGHBtn=document.getElementsByClassName("clone-options")[0].nextElementSibling;
	cloneGHBtn.href=cloneGHBtn.href.substring(githubForWindowsPrefix.length);
	cloneGHBtn.username=authorName;
	cloneGHBtn.href=githubForWindowsPrefix+cloneGHBtn.href;
	cloneGHBtn.parentNode.insertBefore(link,cloneGHBtn.nextElementSibling);
	delete cloneGHBtn;
	delete cloneURLBox;
	delete link;
	delete authorName;
}catch(err){
	console.error(err);
}