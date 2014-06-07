// ==UserScript==

// @name           FWZ: Vanilla Forum Linker

// @namespace      SPACEKADT LIKES VANILLA SCOOPS OM NOM NOM

// @description    Links to forums on the Vanilla page :O :O :O

// @include        http://*.forumwarz.com/domination/vanilla
// @include        http://forumwarz.com/domination/vanilla

// ==/UserScript==



forum_list = [];

function get_forums(lol_url){

	GM_xmlhttpRequest({

		method: "GET",

		url: lol_url,

		onload: function(response) {

			table = response.responseText.replace(/\n/g,"").match(/<table.*?<\/table>/gi)[0];

			forums = table.match(/<a href="[^#]*?">[^<>]+?<\/a>/g);

			//alert(forums[0]);alert(forums[1]);alert(forums[2]);alert("wat");return;

			for(i in forums){

				forums[i] = forums[i].replace(/.*?<b>/,"");

				name = forums[i].replace(/(.*?">|<\/a>)/g,"").replace(/&.*?;/,"ug");

				url = forums[i].replace(/(<a href="|".*)/g,"");

				forum_list[name] = url;

			}

			vanilla_table = document.getElementsByTagName("table")[1].children[0].children;

			for(i=1;i<vanilla_table.length;i++){

				forum_name = vanilla_table[i].children[0].innerHTML.replace(/<.*/,"");

				forum_ug = forum_name.replace(/&.*?;/,"ug");

				forum_html = '<a href="'+forum_list[forum_ug]+'">'+forum_name+"</a>";

				if(forum_list[forum_ug]!==undefined){

					vanilla_table[i].children[0].innerHTML = vanilla_table[i].children[0].innerHTML.replace(forum_name,forum_html);

				}

			}

		}

	});

}

get_forums("http://www.forumwarz.com/bookmarks/community");