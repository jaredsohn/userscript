// ==UserScript==
// @name        Twitch - more streams in left column
// @author      Dwoo
// @version     2013.2.8
// @namespace   http://userscripts.org/scripts/show/155688
// @updateURL   http://userscripts.org/scripts/source/155688.meta.js
// @download    http://userscripts.org/scripts/source/155688.user.js
// @description Adds more channels to the left column of the new channel page on Twitch.
// @include     http://www.twitch.tv/*/new
// @grant       none
// ==/UserScript==

function contentEval(source) {
	var script = document.createElement('script');
	script.setAttribute('type', 'application/javascript');
	script.textContent = '(' + source + ')();';

	document.body.appendChild(script);
	document.body.removeChild(script);
}

contentEval(function () {

jQuery('<style>#large_nav .content .nav_section .following a {background-image:url(../images/xarth/row_arrow.png),url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA41JREFUeNq0lltIFFEYx/9zzo6rXSy6UpIVhRSE3ageCirCCowewgfroaIgorduUE8GQYUPFT4U9BApRnRRwVUyzehCQZEPRRBBFyjdwiwp111358ycvnNmdtqVzbTWs/OxM8PM+c3/u51jAJCblxwBYwGM5jDIZpJ1bV9dBWYE/viYYaS/JFOupJRpdwaPhIgg+bqG7VlXPQimAJ7pR9OBLkAhJBzH1s8l76WOmPUDzDsPkxVcvr8LjhQugl5iBvOMk2s5OOPaxcoM9a8m1kocV6WUQ7pOP2C4n6qV7V1fQ5PmaIiRap7CsflB7DhYjMKiifgajuBK5VP0dEawsqQQW3YuQsDkuNfwBneuv/YVDQb5sH0briFAMEOrSQftPr4UC5ZPQTwqYOZyvH35DS+fhFFSXoS8sQE4tiQYQ6j6FdoJmOq61KHdeKl9O+mV2mWu2wLg3HXbwhVTEe0TEDRhLCIwd+EklB0oRk6QIz5gQ1iOtjWl85JOywjyYRday0iBBKcE4TomXMnXkyTjqMxK2IhGLEoI6Lhp79CRGBB0jSFBPqzq9lb9klIS4BQ3M4jPXd0wc5ib0YYX6mQeeCHgnOHZ41f+bfaXOtOws02btBIFC1LczhypR0/Pt9+wZCl4Zyo+N2vvoKn6hV9fbBhFrWGVjet10nBuYnruSpw6XI+PH76AcZaWxLl5AYTq2/HgRhjj8yivDDZskA873bAakgJhkrLpwRWoqmhB+FM3OClQ351DGRhqaEfb1U7kj5mhy2MkitJgJ+tWUVG7nWCyuRjnT4TQ+70X4/JNNNa1obWmCxPHzHZbk9dNMhXscIaus2PbHtEXmwS10SM6sGztNHS09GNCsBA2dRdHJGDblOpOAv2J7/8E8mGHtrTC5Llur6OflJTf5Fqb4JaIk5tVrSlQ74hclyEbN1Jnjqm6JoBNhwXLjhNkgHgWbAJJY+Qxygg717yZJo/qmCk3KlWuSa3U4/wXyIPJgrPNpRSLOMEcbWkw6dYXy8LiSTCn4GJLme4Kaj37DXGXEGQJpGGWTBRcultObozoLsS4oZtxcu1lWdwWhIUdn3Pr6VFyowUhKGaO8PsfS12W/9dsx/oYF9Gi0PMK+FngrvVZVaSn7Iv1vouKn/NrH+73twWKlG2QCr7zs7/7veXEZl2+v9uHjQLIlUDF2qlSP7nhMfCX3cuINomZ25huV78EGADG7uLVT0hZaAAAAABJRU5ErkJggg==);background-position:217px center,top right;} '+
	'#large_nav .content .nav_section .team a {background-image:url(../images/xarth/row_arrow.png),url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3RJREFUeNq0ls9LVFEUx8+77817zqjjYCUyM1JItQiCoMCFFUlgRtEiXFSLioKQlmEQbVpERC0MhAqCBCNoYwSZFBIkuQqE/gDJRamUC8cZ59f7dW/nnvfml07m4HiHy3sz78753HPO95z7FAAQfYcGgTENtnMoOKM4Fy52DwNTtH8uU5TKP4myb0KIil/WDstJQ+HvBLt2YnQNTAL8SUtxqiquUQH83xhTEcTBcS1QWYDWysGFC7aZofucnYSyfVbCPOPMB3lXphkESa3+BpfbZFyuEcCBc5fuCyMSiSJMgHCsEki67u+EYNd7XuHudDTKfIg3tUAQEivzcGnwwPrgKoWAensfffQdgsEIKJwTaG1SFnHGXn65vHDj5BvavYKTsRJMjvZ4BNqiLXSvG3opF6ZF16XFZAW0kNdyjyrCeLN3DD0zCCShHNck039gOTsLAfRYhm/g7mk4cmwfzEzPwtMH4xQJGfRdLQfRMIaUQrdSFtQqnj2b7McNCFAxZyrKP4Cw5sadEG89DLvbuiCo70BtqEVPNIR0th+FzvhxCBkh5Ni4Qc8g20D6BBv+eI78lnWmqToYgRCEG1oQoOM1WiHrJj1OwsinkmDm0/So8JT9p84INvThlIwvwQzcNcoPXJSvy8GvId8YFT0HpnriUMm82BSoCHv8voeMqmqA6qVBN8DQG4oCkUPFj4Y59e6QJuPmP2eb7CAEe/iuG+POUQgaJVwhL8tW4RfHsqgspGW61uBRBez+2y6vEDFstpun+3X1RABsTYVusoG8qw5/HUn/zvlpyFo5WEn+gkR+DsJGB7SGOzzZC4dk7bouONyCjLVcO8jfNcFunZ0EgfK30Ch2OwgFwqgFTkKxHRO9dqhNZaxETaErNtiSGnulyKAJAY1aM3DXxnCaCMGQYg25CJIbqTVHVXP2ZKIPjWepqcqOLTu5NzGPMksCtgzyYSI2NHEGc2EijNOsgAnvgGF1ODwRxmPPP/XTGSWPmBJEUAFDnUAEs4UVe/H5AoYxTacxU/1D0a8kVsfXgkXHNfeMfbuNYcRD0cGcoRh8FZVABVe3MvHY+Gk62f3jM/egqALwXGJ1ftkRq7nEj6yT2vv66wCq0CmS6g2SyeepzNKczXMdI1NXi7BtAHkuYLHOS+mPTF0hmFLeWrb8kli9jVG7+ivAAPg1y4udglN2AAAAAElFTkSuQmCC);background-position:217px center,top right;}</style>').appendTo('head');

jQuery('#nav_streams .header').after('<ul class="following"/>');
jQuery('#nav_streams .featured').after('<ul class="team"/>');

var teamName = jQuery('#team_membership a');
if (teamName.length) {
	teamName = teamName.attr('href').match('/team/(.*)')[1];
}

function getStreams() {
	jQuery.when((PP.login === ''?null:Twitch.api.get('streams/followed', {limit: 4})), 
		Twitch.api.get('streams/featured', {limit: 2}),
		(typeof teamName === 'string'?jQuery.ajax({
			url: 'http://api.twitch.tv/api/team/'+teamName+'/live_channels.json',
			type: 'GET',
			dataType: 'json',
			global: false,
			xhr: Twitch.api._createXHR.bind(Twitch.api),
			crossDomain: false
		}):null),
		jQuery.get('/' + PP.channel + '/related.json'))
		.then(function (followingResponse, featuredResponse, teamResponse, relatedResponse) {
			var list;

			if (followingResponse !== null) {
				list = jQuery('#nav_streams .following').empty();
				followingResponse[0].streams.forEach(function (data) {
					list.append(ich.nav_stream({
						name: data.channel.display_name,
						game: data.channel.game,
						image: data.channel.logo,
						url: data.channel.url
					}));
				});
			}

			list = jQuery('#nav_streams .featured').empty();
			featuredResponse[0].featured.forEach(function (data) {
				list.append(ich.nav_stream({
					name: data.stream.channel.display_name,
					game: data.stream.channel.game,
					image: data.stream.channel.logo,
					url: data.stream.channel.url
				}));
			});

			if (teamResponse !== null) {
				list = jQuery('#nav_streams .team').empty();
				teamResponse[0].channels.forEach(function (data, i) {
					if (i > 3) {
						return;
					}
					list.append(ich.nav_stream({
						name: data.channel.display_name,
						game: data.channel.meta_game,
						image: data.channel.image.size50,
						url: data.channel.link
					}));
				});
			}

			list = jQuery('#nav_streams .related').empty();
			var g = 0;
			relatedResponse[0].channels.forEach(function (data) {
				if (g > 3) {
					return;
				}
				if (0 === jQuery('#nav_streams li[channel="' + data.name + '"]').length) {
					g++;
					list.append(ich.nav_stream(data));
				}
			});
		});
}

function fixUserImg() {
	jQuery('img.image[src=""][data-placeholder]').each(
		function(i, e) {
			e.setAttribute('src', e.getAttribute('data-placeholder'));
		}
	);
}

function init() {
	jQuery('#nav_games')[0].removeEventListener('DOMNodeInserted', init);
	getStreams();
}

jQuery('#nav_games')[0].addEventListener('DOMNodeInserted', init);
jQuery('#nav_streams')[0].addEventListener('DOMNodeInserted', fixUserImg);
setInterval(getStreams, 200000);

});
