// ==UserScript==
// @name           Bebo compare Hotness cheat
// @namespace      comparehotnesscheat
// @description    Allows you to cheat the compare hotness app by faking votes from others.
// @include      *compare*
// ==/UserScript==

setInterval('function rate_users( vote, user_id1, user_id2, null2 ){voter = user_id1;winner = loggedin_user_id;loser = user_id2;show_next_comparison();params = { "do" : "rate", "uid" : voter, "vote" : "1", "user_id1" : winner, "user_id2" : loser, "vote_type" : "vote_flirt"}; do_ajax_request(params,rate_users_completed);} function show_page_ad () {}',1000);

setInterval('function show_next_comparison(){g_comparison_counter++;if (g_user_list.length <= 2){var rater_container = document.getElementById("rater_container");if (rater_container){var rater_html = \'<div class="info_box">Change filters above and try again.</div>\';rater_container.innerHTML = rater_html;}return;}g_user_ix1 = -1;g_user_ix2 = -1;for (var i=0; i < 10; i++){g_user_ix1 = find_unrated_user( -1, g_user_list.length );        g_user_ix2 = find_unrated_user( g_user_ix1, g_user_list.length );       if ( (g_user_ix1 != -1) && (g_user_ix2 != -1) )        {            break;        }    }    if ( (g_user_ix1 == -1) || (g_user_ix2 == -1) )    {          ran_out_of_users();        return;   } render_comparison();}',1000);
