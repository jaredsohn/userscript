// ==UserScript==
// @name        Projanmo Forum Dropdown Menu
// @namespace   http://forum.projanmo.com
// @description  Dropdown sub-menus to the existing navigation menu for Projanmo Forum for Mozilla Firefox and Google Chrome browsers
// @match      http://forum.projanmo.com/*
// @copyright  2012+, Zelal (zelalbd@gmail.com) 
// @updateURL  https://userscripts.org/scripts/source/151166.user.js
// @downloadURL  https://userscripts.org/scripts/source/151166.user.js
// @version     1.3
// ==/UserScript==

if(document.getElementById("navprofile"))
{
	var link_html = document.getElementById("navprofile").childNodes[0].href;
	var link_html_array = link_html.split(".html");
	var link_html_1 = link_html_array[0];
	var user_pos = link_html_1.indexOf("user");
	var user_id = link_html_1.substring(user_pos+4);
	var user_profile_page = "/user" + user_id + ".html";
	var user_profile_shuchona_page = "/user" + user_id + "-about.html";
	var user_profile_search_posts_page = "/search-posts-user" + user_id + ".html";
	var user_profile_search_topics_page = "/search-topics-user" + user_id + ".html";
	var user_profile_search_subscriptions_page = "/search-subscriptions" + user_id + ".html";
	var user_profile_reputations_page = "/extensions/reputation/reputation.php?action=show&amp;uid=" + user_id;
	var user_profile_warnings_page = "/extensions/pun_warning/userwarnings.php?action=show&amp;uid=" + user_id;
	var user_profile_search_favorite_page = "/search-favorite" + user_id + ".html";
	var user_profile_identity_page = "/user" + user_id + "-identity.html";
	var user_profile_settings_page = "/user" + user_id + "-settings.html";
	var user_profile_signature_page = "/user" + user_id + "-signature.html";
	var user_profile_avatar_page = "/user" + user_id + "-avatar.html";
}


var forum_sub = '<ul style="z-index:1;width: 300px; position: absolute; padding: 10px 5px; background: none repeat scroll 0px 0px rgb(17, 60, 94); left: 0; top:17px; display: none;" id="navextra1_forum_sub">';
	forum_sub += '<li id = "navextra1_forum_sub_0" onmouseover = "this.style.backgroundColor = \'olive\';" onmouseout = "this.style.backgroundColor = \'transparent\';" style="position:relative;border-bottom:1px solid;display:block;width:100%;">' + 
					'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/index.php" style="display:block">মূল পাতা</a>' + 
				'</li>' + 
				'<li id = "navextra1_forum_sub_1" onmouseover = "this.style.backgroundColor = \'olive\'; this.childNodes[1].style.display = \'block\'" onmouseout = "this.style.backgroundColor = \'transparent\'; this.childNodes[1].style.display = \'none\'" style="position:relative;border-bottom:1px solid;display:block;width:100%;">' + 
					'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum2.html" style="display:block">নোটিসবোর্ড</a>' + 
					'<ul id = "navextra1_forum_sub_1_1" style="z-index:1;padding:0; position:absolute;width:300px;background: none repeat scroll 0px 0px rgb(17, 60, 94); left: 300px; top:0;display:none">' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "display:block" href="/forum2.html">মূল বিভাগ</a>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "display:block" href="/forum40.html">নতুন সুবিধা (ফিচার)</a>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "display:block;padding:0 5px">' + 
							'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "display:block" href="/forum50.html">হোমপেজ নোটিশ</a>' + 
						'</li>' + 
					'</ul>' + 
				'</li>' + 
				'<li id = "navextra1_forum_sub_2" onmouseover = "this.style.backgroundColor = \'olive\'; this.childNodes[1].style.display = \'block\'" onmouseout = "this.style.backgroundColor = \'transparent\'; this.childNodes[1].style.display = \'none\'" style="position:relative;border-bottom:1px solid;display:block;width:100%;">' + 
					'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum9.html" style="display:block">অভ্যর্থনা কক্ষ</a>' + 
					'<ul id = "navextra1_forum_sub_2_1" style="z-index:1;padding:0; position:absolute;width:300px;background: none repeat scroll 0px 0px rgb(17, 60, 94); left: 300px; top:0;display:none">' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum9.html">মূল বিভাগ</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic9.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum29.html">খেলাঘর</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic29.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
					'</ul>' + 
				'</li>' + 
				'<li id = "navextra1_forum_sub_3" onmouseover = "this.style.backgroundColor = \'olive\'; this.childNodes[1].style.display = \'block\'" onmouseout = "this.style.backgroundColor = \'transparent\'; this.childNodes[1].style.display = \'none\'" style="position:relative;border-bottom:1px solid;display:block;width:100%;">' + 
					'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum1.html" style="display:block">প্রজন্ম বিষয়ক পরামর্শ-সমস্যা-সমাধান</a>' + 
					'<ul id = "navextra1_forum_sub_3_1" style="z-index:1;padding:0; position:absolute;width:300px;background: none repeat scroll 0px 0px rgb(17, 60, 94); left: 300px; top:0;display:none">' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum1.html">মূল বিভাগ</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic1.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
						'<li style = "display:block;padding:0 5px">' + 
							'<span style = "color: grey;display:block" href="#">[উপবিভাগ নেই]</span>' + 
						'</li>' + 
					'</ul>' + 
				'</li>' + 
				'<li id = "navextra1_forum_sub_4" onmouseover = "this.style.backgroundColor = \'olive\'; this.childNodes[1].style.display = \'block\'" onmouseout = "this.style.backgroundColor = \'transparent\'; this.childNodes[1].style.display = \'none\'" style="position:relative;border-bottom:1px solid;display:block;width:100%;">' + 
					'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum7.html" style="display:block">সাহিত্য-সংস্কৃতি</a>' + 
					'<ul id = "navextra1_forum_sub_4_1" style="z-index:1;padding:0; position:absolute;width:300px;background: none repeat scroll 0px 0px rgb(17, 60, 94); left: 300px; top:0;display:none">' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum7.html">মূল বিভাগ</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic7.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum44.html">ছড়া-কবিতা</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic44.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum59.html">গল্প-উপন্যাস</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic59.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum37.html">সঙ্গীত</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic37.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum41.html">ইতিহাস</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic41.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
					'</ul>' + 
				'</li>' + 
				'<li id = "navextra1_forum_sub_5" onmouseover = "this.style.backgroundColor = \'olive\'; this.childNodes[1].style.display = \'block\'" onmouseout = "this.style.backgroundColor = \'transparent\'; this.childNodes[1].style.display = \'none\'" style="position:relative;border-bottom:1px solid;display:block;width:100%;">' + 
					'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum15.html" style="display:block">খেলাধূলা</a>' + 
					'<ul id = "navextra1_forum_sub_5_1" style="z-index:1;padding:0; position:absolute;width:300px;background: none repeat scroll 0px 0px rgb(17, 60, 94); left: 300px; top:0;display:none">' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum15.html">মূল বিভাগ</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic15.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum28.html">ক্রিকেট</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic28.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum27.html">ফুটবল</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic27.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum30.html">কম্পিউটার গেম</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic30.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
					'</ul>' + 
				'</li>' + 
				'<li id = "navextra1_forum_sub_6" onmouseover = "this.style.backgroundColor = \'olive\'; this.childNodes[1].style.display = \'block\'" onmouseout = "this.style.backgroundColor = \'transparent\'; this.childNodes[1].style.display = \'none\'" style="position:relative;border-bottom:1px solid;display:block;width:100%;">' + 
					'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum17.html" style="display:block">বিজ্ঞান</a>' + 
					'<ul id = "navextra1_forum_sub_6_1" style="z-index:1;padding:0; position:absolute;width:300px;background: none repeat scroll 0px 0px rgb(17, 60, 94); left: 300px; top:0;display:none">' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum17.html">মূল বিভাগ</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic17.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum43.html">জানা-অজানা</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic43.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
					'</ul>' + 
				'</li>' + 
				'<li id = "navextra1_forum_sub_7" onmouseover = "this.style.backgroundColor = \'olive\'; this.childNodes[1].style.display = \'block\'" onmouseout = "this.style.backgroundColor = \'transparent\'; this.childNodes[1].style.display = \'none\'" style="position:relative;border-bottom:1px solid;display:block;width:100%;">' + 
					'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum11.html" style="display:block">তথ্য ও যোগাযোগ প্রযুক্তি</a>' + 
					'<ul id = "navextra1_forum_sub_7_1" style="z-index:1;padding:0; position:absolute;width:450px;background: none repeat scroll 0px 0px rgb(17, 60, 94); left: 300px; top:0;display:none">' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum11.html">মূল বিভাগ</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic11.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum52.html">অপারেটিং সিস্টেম</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic52.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum12.html">ওপেন সোর্স ও বাংলা কম্পিউটিং</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic12.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum25.html">মুঠোফোন</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic25.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum31.html">ট্রাবলশুটিং</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic31.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum39.html">টিউটোরিয়াল, টিপস এন্ড ট্রিকস</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic39.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum46.html">সফটওয়্যার</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic46.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum48.html">প্রোগ্রামিং</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic48.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
					'</ul>' + 
				'</li>' + 
				'<li id = "navextra1_forum_sub_8" onmouseover = "this.style.backgroundColor = \'olive\'; this.childNodes[1].style.display = \'block\'" onmouseout = "this.style.backgroundColor = \'transparent\'; this.childNodes[1].style.display = \'none\'" style="position:relative;border-bottom:1px solid;display:block;width:100%;">' + 
					'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum6.html" style="display:block">পড়াশোনা</a>' + 
					'<ul id = "navextra1_forum_sub_8_1" style="z-index:1;padding:0; position:absolute;width:350px;background: none repeat scroll 0px 0px rgb(17, 60, 94); left: 300px; top:0;display:none">' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum6.html">মূল বিভাগ</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic6.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum5.html">উচ্চশিক্ষা ও কর্মজীবন</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic5.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
					'</ul>' + 
				'</li>' + 
				'<li id = "navextra1_forum_sub_9" onmouseover = "this.style.backgroundColor = \'olive\'; this.childNodes[1].style.display = \'block\'" onmouseout = "this.style.backgroundColor = \'transparent\'; this.childNodes[1].style.display = \'none\'" style="position:relative;border-bottom:1px solid;display:block;width:100%;">' + 
					'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum49.html" style="display:block">কর্ম খালি আছে</a>' + 
					'<ul id = "navextra1_forum_sub_9_1" style="z-index:1;padding:0; position:absolute;width:250px;background: none repeat scroll 0px 0px rgb(17, 60, 94); left: 300px; top:0;display:none">' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum49.html">মূল বিভাগ</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic49.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
						'<li style = "display:block;padding:0 5px">' + 
							'<span style = "color: grey;display:block" href="#">[উপবিভাগ নেই]</span>' + 
						'</li>' + 
					'</ul>' + 
				'</li>' + 
				'<li id = "navextra1_forum_sub_10" onmouseover = "this.style.backgroundColor = \'olive\'; this.childNodes[1].style.display = \'block\'" onmouseout = "this.style.backgroundColor = \'transparent\'; this.childNodes[1].style.display = \'none\'" style="position:relative;border-bottom:1px solid;display:block;width:100%;">' + 
					'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum19.html" style="display:block">রোমাঞ্চ</a>' + 
					'<ul id = "navextra1_forum_sub_10_1" style="z-index:1;padding:0; position:absolute;width:250px;background: none repeat scroll 0px 0px rgb(17, 60, 94); left: 300px; top:0;display:none">' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum19.html">মূল বিভাগ</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic19.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum47.html">ভ্রমণ</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic47.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
					'</ul>' + 
				'</li>' + 
				'<li id = "navextra1_forum_sub_11" onmouseover = "this.style.backgroundColor = \'olive\'; this.childNodes[1].style.display = \'block\'" onmouseout = "this.style.backgroundColor = \'transparent\'; this.childNodes[1].style.display = \'none\'" style="position:relative;border-bottom:1px solid;display:block;width:100%;">' + 
					'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum10.html" style="display:block">দৈনন্দিন</a>' + 
					'<ul id = "navextra1_forum_sub_11_1" style="z-index:1;padding:0; position:absolute;width:300px;background: none repeat scroll 0px 0px rgb(17, 60, 94); left: 300px; top:0;display:none">' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum10.html">মূল বিভাগ</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic10.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum57.html">স্বাস্থ্য</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic57.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum36.html">চায়ের কাপে ঝড়</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic36.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum45.html">দূর-পরবাস</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic45.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum32.html">সংবাদ বিশ্লেষন</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic32.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
					'</ul>' + 
				'</li>' + 
				'<li id = "navextra1_forum_sub_12" onmouseover = "this.style.backgroundColor = \'olive\'; this.childNodes[1].style.display = \'block\'" onmouseout = "this.style.backgroundColor = \'transparent\'; this.childNodes[1].style.display = \'none\'" style="position:relative;border-bottom:1px solid;display:block;width:100%;">' + 
					'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum20.html" style="display:block">অর্থনীতি</a>' + 
					'<ul id = "navextra1_forum_sub_12_1" style="z-index:1;padding:0; position:absolute;width:250px;background: none repeat scroll 0px 0px rgb(17, 60, 94); left: 300px; top:0;display:none">' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum20.html">মূল বিভাগ</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic20.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum58.html">বিনিয়োগ</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic58.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
					'</ul>' + 
				'</li>' + 
				'<li id = "navextra1_forum_sub_13" onmouseover = "this.style.backgroundColor = \'olive\'; this.childNodes[1].style.display = \'block\'" onmouseout = "this.style.backgroundColor = \'transparent\'; this.childNodes[1].style.display = \'none\'" style="position:relative;border-bottom:1px solid;display:block;width:100%;">' + 
					'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum33.html" style="display:block">বিবিধ</a>' + 
					'<ul id = "navextra1_forum_sub_13_1" style="z-index:1;padding:0; position:absolute;width:250px;background: none repeat scroll 0px 0px rgb(17, 60, 94); left: 300px; top:0;display:none">' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum33.html">মূল বিভাগ</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic33.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum34.html">বটগাছ</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic34.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum21.html">হাসির বাক্স</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic21.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
					'</ul>' + 
				'</li>' + 
				'<li id = "navextra1_forum_sub_14" onmouseover = "this.style.backgroundColor = \'olive\'; this.childNodes[1].style.display = \'block\'" onmouseout = "this.style.backgroundColor = \'transparent\'; this.childNodes[1].style.display = \'none\'" style="position:relative; display:block;width:100%;">' + 
					'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum61.html" style="display:block">চারুকলা</a>' + 
					'<ul id = "navextra1_forum_sub_14_1" style="z-index:1;padding:0; position:absolute;width:300px;background: none repeat scroll 0px 0px rgb(17, 60, 94); left: 300px; top:0;display:none">' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum61.html">মূল বিভাগ</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic61.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum42.html">আলোকচিত্র</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic42.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "display:block;padding:0 5px">' + 
							'<span style = "display:block"><a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/forum62.html">গ্রাফিক্স ডিজাইন</a>&nbsp;&nbsp;<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "font-size:.85em" href = "/new-topic62.html">(নতুন টপিক পোস্ট করুন)</a></span>' + 
						'</li>' + 
					'</ul>' + 
				'</li>' + 
'</ul>';

document.getElementById("navextra1").innerHTML = document.getElementById("navextra1").innerHTML + forum_sub;
document.getElementById("navextra1").style.position = "relative";
document.getElementById("navextra1").onmouseover = function(){document.getElementById("navextra1_forum_sub").style.display = "block"; };
document.getElementById("navextra1").onmouseout = function(){document.getElementById("navextra1_forum_sub").style.display = "none"};


var rules_sub = '<ul style="z-index:1;width: 300px; position: absolute; padding: 10px 5px; background: none repeat scroll 0px 0px rgb(17, 60, 94); left: 0; top:17px; display: none;" id="navrules_rules_sub">';
	rules_sub += '<li id = "navrules_rules_sub_0" onmouseover = "this.style.backgroundColor = \'olive\';" onmouseout = "this.style.backgroundColor = \'transparent\';" style="position:relative;border-bottom:1px solid;display:block;width:100%;">' + 
					'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/rules.html" style="display:block">সংক্ষিপ্ত নিয়মাবলী</a>' + 
				'</li>' + 
				'<li id = "navrules_rules_sub_1" onmouseover = "this.style.backgroundColor = \'olive\'; " onmouseout = "this.style.backgroundColor = \'transparent\'; " style="position:relative;display:block;width:100%;">' + 
					'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/t8496.html" style="display:block">বিস্তারিত নিয়মাবলী</a>' + 
				'</li>' + 
'</ul>';

document.getElementById("navrules").innerHTML = document.getElementById("navrules").innerHTML + rules_sub;
document.getElementById("navrules").style.position = "relative";
document.getElementById("navrules").onmouseover = function(){document.getElementById("navrules_rules_sub").style.display = "block"; };
document.getElementById("navrules").onmouseout = function(){document.getElementById("navrules_rules_sub").style.display = "none"};

if(document.getElementById("navprofile"))
{
var profile_sub = '<ul style="z-index:1;width: 300px; position: absolute; padding: 10px 5px; background: none repeat scroll 0px 0px rgb(17, 60, 94); left: 0; top:17px; display: none;" id="navprofile_profile_sub">';
	profile_sub += '<li id = "navprofile_profile_sub_1" onmouseover = "this.style.backgroundColor = \'olive\'; this.childNodes[1].style.display = \'block\'" onmouseout = "this.style.backgroundColor = \'transparent\'; this.childNodes[1].style.display = \'none\'" style="position:relative;border-bottom:1px solid;display:block;width:100%;">' + 
					'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="' + user_profile_shuchona_page + '" style="display:block">সূচনা</a>' + 
					'<ul id = "navprofile_profile_sub_1_1" style="z-index:1;padding:0; position:absolute;width:300px;background: none repeat scroll 0px 0px rgb(17, 60, 94); left: 300px; top:0;display:none">' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "display:block" href="' + user_profile_shuchona_page + '">মূল পাতা</a>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "display:block" href="' + user_profile_search_posts_page + '">নিজের সকল পোস্ট দেখুন</a>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "display:block" href="' + user_profile_search_topics_page + '">নিজের সকল টপিক দেখুন</a>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "display:block" href="' + user_profile_search_subscriptions_page + '">নিজের সকল সাবস্ক্রিপশন দেখুন</a>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "display:block" href="' + user_profile_reputations_page + '">নিজের সম্মাননাসমূহ দেখুন</a>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "border-bottom:1px solid;display:block;padding:0 5px">' + 
							'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "display:block" href="' + user_profile_warnings_page + '">নিজের সতর্কতা বার্তাসমূহ দেখুন</a>' + 
						'</li>' + 
						'<li onmouseover = "this.style.backgroundColor = \'olive\'" onmouseout = "this.style.backgroundColor = \'transparent\'" style = "display:block;padding:0 5px">' + 
							'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" style = "display:block" href="' + user_profile_search_favorite_page + '">নিজের পছন্দের বিষয়সমূহ দেখুন</a>' + 
						'</li>' + 
					'</ul>' + 
				'</li>' + 
				'<li id = "navprofile_profile_sub_2" onmouseover = "this.style.backgroundColor = \'olive\';" onmouseout = "this.style.backgroundColor = \'transparent\';" style="position:relative;border-bottom:1px solid;display:block;width:100%;">' + 
					'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="' + user_profile_identity_page + '" style="display:block">পরিচিতি</a>' + 
				'</li>' + 
				'<li id = "navprofile_profile_sub_3" onmouseover = "this.style.backgroundColor = \'olive\';" onmouseout = "this.style.backgroundColor = \'transparent\';" style="position:relative;border-bottom:1px solid;display:block;width:100%;">' + 
					'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="' + user_profile_settings_page + '" style="display:block">সেটিংস</a>' + 
				'</li>' + 
				'<li id = "navprofile_profile_sub_4" onmouseover = "this.style.backgroundColor = \'olive\';" onmouseout = "this.style.backgroundColor = \'transparent\';" style="position:relative;border-bottom:1px solid;display:block;width:100%;">' + 
					'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="' + user_profile_signature_page + '" style="display:block">স্বাক্ষর</a>' + 
				'</li>' + 
				'<li id = "navprofile_profile_sub_5" onmouseover = "this.style.backgroundColor = \'olive\';" onmouseout = "this.style.backgroundColor = \'transparent\';" style="position:relative;display:block;width:100%;">' + 
					'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="' + user_profile_avatar_page + '" style="display:block">ছবি</a>' + 
				'</li>' + 
'</ul>';

document.getElementById("navprofile").innerHTML = document.getElementById("navprofile").innerHTML + profile_sub;
document.getElementById("navprofile").style.position = "relative";
document.getElementById("navprofile").onmouseover = function(){document.getElementById("navprofile_profile_sub").style.display = "block"; };
document.getElementById("navprofile").onmouseout = function(){document.getElementById("navprofile_profile_sub").style.display = "none"};
}

if(document.getElementById("nav_pun_pm"))
{
var pm_sub = '<ul style="z-index:1;width: 300px; position: absolute; padding: 10px 5px; background: none repeat scroll 0px 0px rgb(17, 60, 94); left: 0; top:17px; display: none;" id="nav_pun_pm_sub">';
	pm_sub += '<li id = "nav_pun_pm_sub_0" onmouseover = "this.style.backgroundColor = \'olive\';" onmouseout = "this.style.backgroundColor = \'transparent\';" style="position:relative;border-bottom:1px solid;display:block;width:100%;">' + 
					'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/pun_pm-inbox.html" style="display:block">আগত (ইনবক্স)</a>' + 
				'</li>' + 
				'<li id = "navprofile_profile_sub_1" onmouseover = "this.style.backgroundColor = \'olive\';" onmouseout = "this.style.backgroundColor = \'transparent\';" style="position:relative;border-bottom:1px solid;display:block;width:100%;">' + 
					'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/pun_pm-outbox.html" style="display:block">প্রেরিত</a>' + 
				'</li>' + 
				'<li id = "navprofile_profile_sub_2" onmouseover = "this.style.backgroundColor = \'olive\';" onmouseout = "this.style.backgroundColor = \'transparent\';" style="position:relative;display:block;width:100%;">' + 
					'<a onmouseover = "this.style.fontWeight = \'bold\'" onmouseout = "this.style.fontWeight = \'normal\'" href="/pun_pm-write.html" style="display:block">বার্তা লিখুন</a>' + 
				'</li>' + 
'</ul>';

document.getElementById("nav_pun_pm").innerHTML = document.getElementById("nav_pun_pm").innerHTML + pm_sub;
document.getElementById("nav_pun_pm").style.position = "relative";
document.getElementById("nav_pun_pm").onmouseover = function(){document.getElementById("nav_pun_pm_sub").style.display = "block"; };
document.getElementById("nav_pun_pm").onmouseout = function(){document.getElementById("nav_pun_pm_sub").style.display = "none"};
}