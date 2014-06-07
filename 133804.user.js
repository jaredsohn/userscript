// ==UserScript==
// @name        MoltenVote
// @namespace   MoltenVote
// @description A script that will add a menu box to Molten-WoW's website allowing you to vote for molten on all top sites by clicking one button.
// @include     https://www.molten-wow.com/*
// @include     https://www.molten-wow.com/account/*
// @include		http://www.xtremetop100.com/sitedetails-1132296123
// @include		http://www.top100arena.com/site.asp?i=44178
// @include		http://www.openwow.com/
// @include		http://www.gtop100.com/worldofwarcraft/sitedetails-41841
// @include		http://topg.org/details-348911
// @version     1.1
// ==/UserScript==
window.onload = function () {
	switch (window.location.href) {
	case 'http://www.xtremetop100.com/sitedetails-1132296123':
		document.querySelector('div#middlebdbb2 a').target = "";
		document.querySelector('div#middlebdbb2 a').click();
		break;
	case 'http://www.top100arena.com/site.asp?i=44178' :
		document.querySelector('a[href="http://www.top100arena.com/out.asp?id=44178"]').target = "";
		document.querySelector('a[href="http://www.top100arena.com/out.asp?id=44178"]').click();
		break;
	case 'http://www.openwow.com/':
		document.querySelector('.tl-lBanner:nth-of-type(1)').setAttribute("onclick", "window.location = '/?visit=6';");
		document.querySelector('.tl-lBanner:nth-of-type(1)').click();
		break;
	case 'http://www.gtop100.com/worldofwarcraft/sitedetails-41841':
		document.querySelector('td.desc:nth-of-type(1) a').target = "";
		document.querySelector('td.desc:nth-of-type(1) a').click();
		break;
	case 'http://topg.org/details-348911':
		document.querySelector('td div a img:nth-of-type(1)').parentNode.target = "";
		document.querySelector('td div a img:nth-of-type(1)').parentNode.click();
		break;
	default:
		if (window.location.href == 'https://www.molten-wow.com/?oneclickvote') {
			window.open('http://www.xtremetop100.com/sitedetails-1132296123');
			window.open('http://www.top100arena.com/site.asp?i=44178');
			window.open('http://www.openwow.com/');
			window.open('http://www.gtop100.com/worldofwarcraft/sitedetails-41841');
			window.open('http://topg.org/details-348911');
		}
		var leftMenu = document.getElementById('content-left');

		/*********** - Divider - ***********/
		var divider = document.createElement("div");
		divider.style.height = "32px";

		leftMenu.appendChild(divider);

		/*********** - Header Div - ***********/
		var headerDiv = document.createElement("div");
		headerDiv.className = "header";

		var title = document.createElement("p");
		title.appendChild(document.createTextNode("One-Click Vote"));

		headerDiv.appendChild(title);

		leftMenu.appendChild(headerDiv);

		/*********** - Middle Div - ***********/
		var midDiv = document.createElement("div");
		midDiv.className = "mid";

		var container = document.createElement("div");
		container.id = "placehere";
		container.style.position = "relative";
		container.style.paddingTop = "4px";
		container.style.paddingBottom = "4px";
		container.style.marginLeft = "12px;";
		container.style.color = "#99cc00";
		container.style.textAlign = "center";

		midDiv.appendChild(container);
		leftMenu.appendChild(midDiv);

		/*********** - Bottom Div - ***********/
		var bottomDiv = document.createElement("div");
		bottomDiv.className = "bottom";

		leftMenu.appendChild(bottomDiv);
		
		var linkBox = document.getElementById("placehere");

		var voteLinkContainer = document.createElement("div");
		voteLinkContainer.className = 'cpBtn';
		voteLinkContainer.style.width = '100px';
		voteLinkContainer.style.marginLeft = 'auto';
		voteLinkContainer.style.marginRight = 'auto';
		
		var voteLink = document.createElement("p");
		voteLink.addEventListener('click', function (e) { window.location.href='https://www.molten-wow.com/?oneclickvote'; }, false);
		voteLink.appendChild(document.createTextNode("Vote"));
		voteLinkContainer.appendChild(voteLink);
		linkBox.appendChild(voteLinkContainer);
		break;
	}
}