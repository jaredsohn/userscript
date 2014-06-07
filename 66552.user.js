// ==UserScript==
// @name           Test! Test! >.> Don't install.
// @description    Adds a search box to Gaia's navigation bar.
// @include        http://www.gaiaonline.com/*
// @include        http://gaiaonline.com/*
// ==/UserScript==
if(getId('newmenu')){
	var ql=getId('quickLinks');
	if(ql){ql.setAttribute('style','border-right: 1px solid rgb(156, 150, 156) ! important;')}
	var newElement = document.createElement('li');
	newElement.id='gm_search';
	newElement.setAttribute('class','standard');
	newElement.innerHTML=(<><![CDATA[
		<a class="header" href="http://userscripts.org/scripts/show/56399">Search</a>
		<ul><li class="first">
		<form id="GM_Search_Form" onsubmit="return false">
		<select name="type" id="GM_Search_Type" onfocus="this.parentNode.style.height='343px';" onblur="this.parentNode.style.height='';">
			<option class="one" value="undefined">Search...</option>
			<option class="one" value="google.gaia">Entire Site</option>
			<optgroup label="Community">
				<option class="two" value="">Entire Community</option>
				<option class="two" value="users.username">Users by Username</option>
				<option class="two" value="users.interest">Users by Interest</option>
				<option class="two" value="topics.tag">Forums</option>
					<option class="three" value="topics.user">Topics by User</option>
					<option class="three" value="posts.user">Post by User</option>
				<option class="two" value="guilds.tag">Guilds</option>
			</optgroup>
			<optgroup label="Marketplace">
				<option class="two" value="market">Using the Marketplace</option>
				<option class="two" value="tektek">Using TekTek.org</option>
			</optgroup>
			<optgroup label="Arenas">
				<option class="two" value="user">Submissions by user</option>
				<option class="two" value="username">Entries by username</option>
				<option class="two" value="all">All Categories</option>
				<option class="two" value="8">Homes</option>
				<option class="two" value="avatar">Avatar</option>
					<option class="three" value="7">Original</option>
					<option class="three" value="27">Cosplay</option>
				<option class="two" value="picture">Art</option>
					<option class="three" value="1">Comics</option>
					<option class="three" value="2">Painting and Drawing</option>
					<option class="three" value="3">Photography</option>
				<option class="two" value="text">Writing</option>
					<option class="three" value="4">Fiction</option>
					<option class="three" value="5">Non-Fiction</option>
					<option class="three" value="6">Poetry and Lyrics</option>
					<option class="three" value="32">High School Flashback</option>
			</optgroup>
		</select>
		<input name="text" id="GM_Search_Text" value="Gaia Search" type="text" name="val" onfocus="if(this.value=='Gaia Search'){this.value='';}" onblur="if(this.value==''){this.value='Gaia Search';}"/>
		<input id="GM_Search_Gbtn" type="submit"/>
		</form>
		</li></ul>