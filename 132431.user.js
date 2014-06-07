// ==UserScript==
// @name			HF Scripts - Mentor List
// @namespace 		xerotic/hfmentorlist
// @description 	Mentor list for HackForums.
// @include  		*hackforums.net/mentors*
// @version  		1.0.0
// ==/UserScript==

theHTML = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><!-- start: error -->';
theHTML = theHTML + '<html xml:lang="en" lang="en" xmlns="http://www.w3.org/1999/xhtml">';
theHTML = theHTML + '<head>';
theHTML = theHTML + '<title>Mentor List - By Xerotic</title>';
theHTML = theHTML + '<link type="text/css" rel="stylesheet" href="http://cdn2.hackforums.net/cache/themes/theme3/global.css" />';
theHTML = theHTML + '</head>';
theHTML = theHTML + '<body>';

theHTML = theHTML + '<div id="container">';
theHTML = theHTML + '		<a name="top" id="top"></a>';
theHTML = theHTML + '		<div id="header">';
theHTML = theHTML + '			<div class="logo"><a href="http://www.hackforums.net/"><img src="http://cdn2.hackforums.net/images/blackreign/logo.jpg" alt="Hack Forums" title="Hack Forums" /></a></div>';
theHTML = theHTML + '			<div class="menu">';
theHTML = theHTML + '				<ul>';
theHTML = theHTML + '					<li><a href="http://www.hackforums.net/"><img src="http://cdn2.hackforums.net/images/blackreign/toplinks/home.gif" alt="Home Page" title="Hack Forums" />Home</a></li>';
theHTML = theHTML + '					<li><a href="http://www.hackforums.net/upgrade.php"><img src="http://cdn2.hackforums.net/images/blackreign/toplinks/subscribe.gif" alt="" title="upgrade your account" />Upgrade</a></li>';
theHTML = theHTML + '					<li><a href="http://www.hackforums.net/search.php"><img src="http://cdn2.hackforums.net/images/blackreign/toplinks/search.gif" alt="" title="" />Search</a></li>';
theHTML = theHTML + '					<li><a href="http://www.hackforums.net/memberlist.php"><img src="http://cdn2.hackforums.net/images/blackreign/toplinks/memberlist.gif" alt="" title="" />Member List</a></li>';
theHTML = theHTML + '					<li><a href="http://www.hackforums.net/misc.php?action=help"><img src="http://cdn2.hackforums.net/images/blackreign/toplinks/help.gif" alt="" title="" />Help</a></li>';
theHTML = theHTML + '					<li><a href="http://twitter.com/hackforumsnet"><img src="http://cdn2.hackforums.net/images/blackreign/toplinks/twitter.gif" alt="contact" title="twitter" />Follow</a></li>';
theHTML = theHTML + '					<li><a href="contact.php"><img src="http://cdn2.hackforums.net/images/blackreign/toplinks/contact.gif" alt="contact" title="contact" />Contact</a></li>';
theHTML = theHTML + '				</ul>';
theHTML = theHTML + '			</div>';
theHTML = theHTML + '			<hr class="hidden" />';
theHTML = theHTML + '			<div id="panel">';
theHTML = theHTML + '		<strong>Mentor List - Created by, <a href="http://www.hackforums.net/member.php?action=profile&uid=175033">xerotic</a><br />';
theHTML = theHTML + '			</div>';
theHTML = theHTML + '		</div>';

theHTML = theHTML + '<hr class="hidden" />';
theHTML = theHTML + '		<br class="clear" />';
theHTML = theHTML + '		<div id="content">';
theHTML = theHTML + '<div class="navigation">';
theHTML = theHTML + '<a href="http://www.hackforums.net/index.php">Hack Forums</a>';
theHTML = theHTML + ' / ';
theHTML = theHTML + '<span class="active">Mentor List</span>';
theHTML = theHTML + '</div>';
theHTML = theHTML + '<br />';
theHTML = theHTML + '<div class="quick_keys">';
theHTML = theHTML + '<br />';
theHTML = theHTML + '<table border="0" cellspacing="1" cellpadding="4" class="tborder">';
theHTML = theHTML + '<tr>';
theHTML = theHTML + '<td class="thead"><span class="smalltext"><strong>Forum Mentors</strong></span></td>';
theHTML = theHTML + '</tr>';

theHTML = theHTML + '<tr><td class="trow1">';


theHTML = theHTML + '<a href="http://www.hackforums.net/member.php?action=profile&amp;uid=175033"><strong>xerotic</strong></a><br />';

theHTML = theHTML + '<a href="http://www.hackforums.net/member.php?action=profile&uid=619030"><strong>iNviZ</strong></a><br />';

theHTML = theHTML + '<a href="http://www.hackforums.net/member.php?action=profile&uid=70881"><strong>Paradoxum</strong></a><br />';

theHTML = theHTML + '<a href="http://www.hackforums.net/member.php?action=profile&uid=128873"><strong>T3h Hack3r</strong></a><br />';

theHTML = theHTML + '<a href="http://www.hackforums.net/member.php?action=profile&uid=7807"><strong>VipVince</strong></a><br />';

theHTML = theHTML + '<a href="http://www.hackforums.net/member.php?action=profile&uid=646916"><strong>Genuine</strong></a><br />';

theHTML = theHTML + '<a href="http://www.hackforums.net/member.php?action=profile&uid=545127"><strong>Joey Tribbiani</strong></a><br />';

theHTML = theHTML + '<a href="http://www.hackforums.net/member.php?action=profile&uid=79121"><strong>Richie</strong></a><br />';

theHTML = theHTML + '<a href="http://www.hackforums.net/member.php?action=profile&uid=65581"><strong>Skill</strong></a><br />';

theHTML = theHTML + '<a href="http://www.hackforums.net/member.php?action=profile&uid=47970"><strong>Rusty_v</strong></a><br />';

theHTML = theHTML + '<a href="http://www.hackforums.net/member.php?action=profile&uid=70909"><strong>AsSaSs@iN</strong></a><br />';

theHTML = theHTML + '<a href="http://www.hackforums.net/member.php?action=profile&uid=43626"><strong>kutmustakurt</strong></a><br />';

theHTML = theHTML + '<a href="http://www.hackforums.net/member.php?action=profile&uid=49806"><strong>N3w_2_H@Ck1n</strong></a><br />';

theHTML = theHTML + '<a href="http://www.hackforums.net/member.php?action=profile&uid=2103"><strong>Crow</strong></a><br />';

theHTML = theHTML + '<a href="http://www.hackforums.net/member.php?action=profile&uid=143654"><strong>Kr4z1</strong></a><br />';

theHTML = theHTML + '<a href="http://www.hackforums.net/member.php?action=profile&uid=81075"><strong>Robbieava</strong></a><br />';

theHTML = theHTML + '<a href="http://www.hackforums.net/member.php?action=profile&uid=100071"><strong>cobija</strong></a><br />';

theHTML = theHTML + '<a href="http://www.hackforums.net/member.php?action=profile&uid=8480"><strong>Soldier of Fortune</strong></a><br />';

theHTML = theHTML + '<a href="http://www.hackforums.net/member.php?action=profile&uid=11960"><strong>Kn1ght</strong></a><br />';

theHTML = theHTML + '<a href="http://www.hackforums.net/member.php?action=profile&uid=657392"><strong>Astonish is NJ</strong></a><br />';

theHTML = theHTML + '<a href="http://www.hackforums.net/member.php?action=profile&uid=30595"><strong>The Rated R Superstar</strong></a><br />';


theHTML = theHTML + '</td></tr>';
theHTML = theHTML + '</table>';


theHTML = theHTML + '</div><br />';
theHTML = theHTML + '			<div class="bottommenu">';
theHTML = theHTML + '				<div>';
theHTML = theHTML + '					<span class="smalltext"><a href="contact.php">Contact Us</a> | <a href="/">Hack Forums</a> | <a href="#top">Return to Top</a> | <a href="#content">Return to Content</a> | <a href="http://www.hackforums.net/archive/index.php">Lite (Archive) Mode</a> | <a href="http://www.hackforums.net/misc.php?action=syndication">RSS Syndication</a> | <a href="http://www.hackforums.net/stafflist.php">Staff</a>  | <a href="http://www.hackforums.net/myawards.php">Awards</a> | <a href="http://www.hackforums.net/misc.php?action=help&amp;hid=12">Legal Policies</a></span>';
theHTML = theHTML + '				</div>';
theHTML = theHTML + '			</div>';
theHTML = theHTML + '<br />';
theHTML = theHTML + '			</div>';
theHTML = theHTML + '		<hr class="hidden" />';
theHTML = theHTML + '			<div id="copyright">';
theHTML = theHTML + '				<div id="debug"></div>';
theHTML = theHTML + 'Powered By <a href="http://www.mybboard.net" target="_blank">MyBB</a>, &copy; 2002-2012 <a href="http://www.mybboard.net" target="_blank">MyBB Group</a>.<br />';
theHTML = theHTML + '				<br />';
theHTML = theHTML + '<br class="clear" />';





theHTML = theHTML + '</body>';
theHTML = theHTML + '</html>';
document.write(theHTML);