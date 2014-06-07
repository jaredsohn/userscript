// ==UserScript==
// @name          Yelp Stats Links  
// @namespace     http://www.geocities.com/sam_hughes/scripts
// @description   Links the Compliments, Useful,  Funny, and  Cool Stats to your profile page with the right sort order on it
// @include       http://www.yelp.com/home
// ==/UserScript==

statsBox = document.getElementById('statsBox');
if (statsBox != null)
{
    statsBox.innerHTML = statsBox.innerHTML.replace('Useful', '<a target="_blank" href="http://www.yelp.com/user_details_reviews_self?review_sort=useful">Useful</a>');
    statsBox.innerHTML = statsBox.innerHTML.replace('Cool', '<a target="_blank" href="http://www.yelp.com/user_details_reviews_self?review_sort=cool">Cool</a>');
    statsBox.innerHTML = statsBox.innerHTML.replace('Funny', '<a target="_blank" href="http://www.yelp.com/user_details_reviews_self?review_sort=funny">Funny</a>');
    statsBox.innerHTML = statsBox.innerHTML.replace('compliments', '<a target="_blank" href="http://www.yelp.com/user_details_thanx?">compliments</a>');
}