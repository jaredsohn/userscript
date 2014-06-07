// ==UserScript==
// @name           grepotools listing, by rbss. 
// @namespace      rbss
// @description    affiche le listing des cités lors d'une recherche de viles dans grepotools.
// @include        http://fr.grepo-world.com/*search_town*
// @version        0.9.2
// ==/UserScript==

function get_all_player()
{
	var my_regexp = new RegExp("^http://fr.grepo-world.com/statistic.php?");
	var my_regexp2 = new RegExp("player");
	var my_regexp3 = new RegExp("target_town");
	var all_url = document.getElementsByTagName("a");
	var i;
	var str = "";
	var tmp = "";
	for (i = 0; i < all_url.length; i++)
	{
		if (my_regexp.test(all_url[i].href) && my_regexp2.test(all_url[i]))
				str += all_url[i] + "player=";
			tmp += all_url[i] + "\n";
		}
	alert(test_player(str));
	//http://fr.grepo-world.com/statistic.php?view=player_details&land=fr&world=14&player=Tchou%20Tchou

}

function test_player(chaine)
{
	var str = "";
	var i;
	var j = 0;
	var tableau = chaine.split('player=');
//	alert("tableau de 0\n" + tableau[1]);

	for (i = 1; i < tableau.length ; i += 2)
		{
			str += "[player]" + tableau[i] + "\[/player\]";
			str += "\n";
			if (i >= 100 && j == 0)
				{
					alert (str);
					str = "";
					j++;
				}
			
		}
	return (str);
}
function aff_tab_content(all)
{
	
	var i;
	var str = "aff_tab\n";
	for (i = 0; i < all.length; i++)
	str += all[i] + "\n";
	alert(str);
}

function test(chaine)
{
	var str = "";
	var i;
	var j = 0;
	var tableau = chaine.split('id=');
//	alert("tableau de 0\n" + tableau[1]);

	for (i = 1; i < tableau.length ; i += 2)
			str += "[town]" + tableau[i] + "\[/town\]" + "\n";
	return (str);
}
function get_all_id()
{
	var all_url = document.getElementsByTagName("a");
	var url_mod = new Array; 
	var i;
	var tableau;
	var str = "";
	var my_regexp = new RegExp("^http://fr[0-9]");
	var my_regexp2 = new RegExp("[0-9]$");
	var my_regexp3 = new RegExp("target_town");
	var j = 0;
    for (i =0; i < all_url.length; i++)
	{
		if (my_regexp.test(all_url[i].href) && my_regexp2.test(all_url[i].href) && my_regexp3.test(all_url[i].href))
			{
					
					url_mod  += all_url[i] + "id=";
				/*tableau	 = str.split('id=');
					 url_mod[j++] = tableau[i];
					 */
			}	
	}
	//i = url_mod[0];
	confirm(test(url_mod));
	//aff_tab_content(url_mod);
}
function quoi()
{
	alert("test rbs");
}
function  get_search_link()
{
	var i;
	var all_url = document.getElementsByTagName("a");
	var my_reg = new RegExp("search.php$");
	var temp;
	for (i = 0; i < all_url.length; i++)
		if (my_reg.test(all_url[i]))
			{
				temp = all_url[i];
				break;
			}
	temp.href = "http://rbs.fr";
	temp.onclick= quoi;
	get_all_id();
}

/*main
*/
get_all_id();

//get_all_player();
//get_search_link();
//document.write("rbstest\nnouveautest");