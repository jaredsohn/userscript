
// ==UserScript== No Follow External Links
// @name            Lizee Helene
// @version         1.0
// ==/UserScript==
// Wordpress Function 

add_filter('the_content', 'my_nofollow');
add_filter('the_excerpt', 'my_nofollow');
function my_nofollow($content) {
    return preg_replace_callback('/<a[^>]+/', 'my_nofollow_callback', $content);
}
function my_nofollow_callback($matches) {
    $link = $matches[0];
    $site_link = get_bloginfo('url');
    if (strpos($link, 'rel') === false) {
        $link = preg_replace("%(href=\S(?!$site_link))%i", 'rel="nofollow" $1', $link);
    } elseif (preg_match("%href=\S(?!$site_link)%i", $link)) {
        $link = preg_replace('/rel=\S(?!nofollow)\S*/i', 'rel="nofollow"', $link);
    }
    return $link;
}