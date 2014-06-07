// ==UserScript==
// @name        NeopetsAdditionalThings
// @namespace   NPstuff
// @include		http://*.neopets.com/*
// @include		http://neopets.com/*
// @match		http://*.neopets.com/*
// @match		http://neopets.com/*
// @version     1
// ==/UserScript==


if($("#boards_table").length) {
   /* doing stuff to pet images on the boards */
   $(".topicAuthor.sf").each(function(){
   petname = $(this).find("a[href*=petlookup]").text();

   $(this).css('background', 'url(http://pets.neopets.com/cpn/' + petname + '/1/4.png) center');
   });

   $("#boards_table").after("<div id=\"newboards\"></div>");

   $("#boards_table > tbody > tr:last-of-type").remove();
   $("#boards_table > tbody > tr:nth-of-type(n+2)").each(function(){
      $(this).nextAll().slice(0, 2).wrapAll("<div class=\"newboardpost\"/>");
   });

   var postcount = 0;

   $("#boards_table > tbody > .newboardpost").each(function(){
      postcontent = $(this).find(".newboardpost > tr > td.topic").html();
      postauthor = $(this).find("tr > td.topicAuthor > a > strong.medText").text();
      $(this).find("tr > td.topicAuthor > table > tbody > tr:first-of-type > td.sf > i").remove();
      postjoindate = $(this).find("tr > td.topicAuthor > table > tbody > tr:first-of-type > td.sf").html();
      regex = /(.*)<b/;
      postjoindate = $(postjoindate.match(regex)[1]).text();
      postgender = $(this).find("tr > td.topicAuthor > table > tbody > tr:first-of-type > td.sf > b").text();
      postavatar = $(this).find("tr > td.topicAuthor > table > tbody > tr > td > a > img[src*=\"avatars\"]").attr("src");
      postpet = $(this).find("tr > td > table > tbody > tr > td.sf > a[href*=\"/petlookup.phtml?pet=\"] > b").text();
      $(this).find("tr > td.topicPosted > table > tbody > tr > td.topicSmall > strong").remove();
      posttime = $(this).find("tr > td.topicPosted > table > tbody > tr > td.topicSmall:first-of-type").text();
      postreport = $(this).find("tr > td.topicPosted > table > tbody > tr > td.topicSmall:nth-of-type(2) > a").attr("href");
      if(postgender == "Female"){gendercolour="#FF9FEE";}else{gendercolour="#9FDEFF";}


      $("#newboards").append("<div class=\"newpost\"><div class=\"postinfo\"><a href=\"http://www.neopets.com/userlookup.phtml?user=" + postauthor + "\"><img src=\"" + postavatar + "\"></a><span class=\"postinfoline1\"><a href=\"http://www.neopets.com/userlookup.phtml?user=" + postauthor + "\">" + postauthor + "</a>&nbsp;&nbsp;&nbsp;<span style=\"color: " + gendercolour + "\" class=\"postinfominor\">" + postgender + "</span>&nbsp;&nbsp;&nbsp;<span style=\"color: #B8B8B8\" class=\"postinfominor\">" + postjoindate + "</span></span><span class=\"postinfoline2\"><a href=\"http://www.neopets.com/petlookup.phtml?pet=" + postpet + "\">Pet: " + postpet + "</a></span><span class=\"postinfodate\">" + posttime + "</span></div><div class=\"petpreview\" style=\"background: url('http://pets.neopets.com/cpn/" + postpet + "/1/4.png') no-repeat -100px top #D4D4D4;\"></div><div class=\"postcontent\">" + postcontent + "</div><span class=\"postreport\"><a href=\"" + postreport + "\">[Report this message]</a></span></div>");
   });

   $(".content > b > span.pointer").parent().addClass("boardbreadcrumbs");

   $(".content > b > span.pointer").remove();

   var posttitle = $(".content").first().contents().filter(function() {
      return this.nodeType == 3;
   });

   posttitle.wrap("<div id=\"posttitle\">");

   $(".content > div > form[name*=\"message_form\"] > table").wrap("<div id=\"boardsreply\">");
}



if ($(".sidebar").length > 0) {
   /* setting a new, higher resolution image of your active neopet */
   var petname = $(".sidebar > .sidebarModule:first-of-type > .sidebarTable > tbody > tr:first-of-type > td > a").text();
   var petimg = $(".activePet > a > img");

   petimg.replaceWith("<div id=\"activepet\" style=\"background: url('http://pets.neopets.com/cpn/" + petname + "/1/4.png') center;\"><span id=\"activepetname\">" + petname + "</span></div>");


   /* notification stuff */
   notifications = $(".eventIcon");
   notificationslink = $(".eventIcon > a:first-of-type").attr("href");

   if(!notificationslink) {
      
   } else {
      $("title").prepend("[&#9993;] ");
      /*$(".sidebar > .sidebarModule:first-of-type").prepend("<a href=\"" + notificationslink + "\"><div class=\"sidebarModule\" id=\"notification\">U got mail</div></a>");*/
   }
} else {
   $(".content").before("<td width=\"178\" align=\"center\" class=\"sidebar\"><div class=\"sidebarModule dummy\"></div><div style=\"margin-bottom: 7px;\" class=\"sidebarModule\">	<table width=\"158\" border=\"0\" cellspacing=\"0\" cellpadding=\"2\" class=\"sidebarTable\">		<tbody><tr>			<td valign=\"middle\" class=\"sidebarHeader medText\">Search Neopets</td>		</tr>		<tr>			<td align=\"center\" class=\"neofriend\">				<form style=\"padding-top: 4px; padding-bottom: 4px;\" onsubmit=\"search_handle(this);\">					<input type=\"text\" onblur=\"if( this.value=='' ) { this.style.color='#A5A5A5'; this.value='Enter search text...'; }\" onfocus=\"this.style.color='#000000'; if( this.value=='Enter search text...' ) { this.value=''; }\" style=\"width: 135px; color: #a5a5a5; padding: 2px;\" value=\"Enter search text...\" maxlength=\"255\" name=\"q\" class=\"sf\"><br>					<input type=\"submit\" class=\"sf\" value=\"Go!\">					<input type=\"hidden\" value=\"pub-9208792519293771\" name=\"client\">					<input type=\"hidden\" value=\"1\" name=\"forid\">					<input type=\"hidden\" value=\"ISO-8859-1\" name=\"ie\">					<input type=\"hidden\" value=\"ISO-8859-1\" name=\"oe\">					<input type=\"hidden\" value=\"active\" name=\"safe\">					<input type=\"hidden\" value=\"www.neopets.com\" name=\"domains\">					<input type=\"hidden\" value=\"GALT:#FFFFFF;GL:1;DIV:#000066;VLC:FFFFFF;AH:center;BGC:FFFFFF;LBGC:000066;ALC:FFFFFF;LC:FFFFFF;T:000000;GFNT:000066;GIMP:000077;FORID:1\" name=\"cof\">					<input type=\"hidden\" value=\"en\" name=\"hl\">					<input type=\"hidden\" name=\"s\">				</form>			</td>		</tr>	</tbody></table></div><div class=\"sidebarModule dummy\"></div></td>");
}

   username = $("#header .user.medText > a[href*='/userlookup.phtml?user=']").text();
   neopoints = $("#header .user.medText > a[href*='inventory']").text();
   if ($("#template_neocash_amt").length > 0) {
   }

   /*$("#nst").prependTo(".sidebar");
   $("#nst").wrap("<div class=\"welcome\" id=\"NSTclock\"></div>");*/
   $(".sidebar").prepend("<div class=\"welcome\"></div>");
   $(".welcome").append("<a href=\"http://www.neopets.com/userlookup.phtml?user=" + username + "\">" + username + "</a><br><a href=\"http://www.neopets.com/inventory.phtml\">NP: " + neopoints + "</a>");
   if ($("#template_neocash_amt").length > 0) {
      neocash = $("#template_neocash_amt").text();
      $(".welcome").append("<br>NC: " + neocash);
   }
   $("#nst").appendTo(".welcome")