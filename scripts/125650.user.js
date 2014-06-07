// ==UserScript==
// @name            HF Script - test
// @namespace       Yellows/test
// @description     test
// @include         http://www.hackforums.net/*
// @include         http://hackforums.net/*
// @version         1.3
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
       var elmTextarea = arTextareas[i];
        //##Template:
        // elmTextarea.value = elmTextarea.value.replace(regex,replace);
        
        
        
        //HelpDocs Section Start
        
        
        
        //ContactStaff
        
        re = /\[contactstaff]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=27][color=#1E90FF]When to Contact Staff[/color][/url]");

        re = /\[cs]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=27][color=#1E90FF]When to Contact Staff[/color][/url]");    
        
            //ContactStaffhere

        re = /\[contactstaffh]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=27][color=#1E90FF]here[/color][/url]");        
        
        re = /\[csh]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=27][color=#1E90FF]here[/color][/url]");
        
        
        
        
        //RulesandEtiquette
        
        re = /\[RulesandEtiquette]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=10url][color=#1E90FF]Rules and Etiquette[/color][/url]");
        
        re = /\[rae]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=10url][color=#1E90FF]Rules and Etiquette[/color][/url]");
        
        
            //RulesandEtiquettehere
        
        re = /\[RulesandEtiquetteh]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=10url][color=#1E90FF]here[/color][/url]");
        
        re = /\[raeh]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=10url][color=#1E90FF]here[/color][/url]");
        
        
        
        //ReportingPosts
        
        re = /\[ReportingPosts]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=11][color=#1E90FF]Reporting Posts[/color][/url]");
        
        re = /\[rp\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=11][color=#1E90FF]Reporting Posts[/color][/url]");
        
            //ReportingPostshere
            
            re = /\[ReportingPostsh]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=11][color=#1E90FF]here[/color][/url]");
        
        re = /\[rph]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=11][color=#1E90FF]here[/color][/url]");
        
        
        
        //DisallowedBlackHatActivity
        
        re = /\[DisallowedBlackHatActivity]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=21][color=#1E90FF]Disallowed BlackHat Activity[/color][/url]");
        
        re = /\[bha]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=21][color=#1E90FF]Disallowed BlackHat Activity[/color][/url]");
        
            //DisallowedBlackHatActivityhere
        
        re = /\[DisallowedBlackHatActivityh]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=21][color=#1E90FF]here[/color][/url]");
        
        re = /\[bhah]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=21][color=#1E90FF]here[/color][/url]");
        
        
        
        //ReputationSystem
        
        re = /\[ReputationSystem]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=20][color=#1E90FF]Reputation System[/color][/url]");
        
        re = /\[rep]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=20][color=#1E90FF]Reputation System[/color][/url]");
        
            //ReputationSystemhere
        
        re = /\[ReputationSystemh]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=20][color=#1E90FF]here[/color][/url]");
        
        re = /\[reph]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=20][color=#1E90FF]here[/color][/url]");
        
        
        
        //CopyrightInfringementandDMCA
        
        re = /\[CopyrightInfringementandDMCA]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=14][color=#1E90FF]Copyright Infringement and DMCA[/color][/url]");
        
        re = /\[Copyright]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=14][color=#1E90FF]Copyright Infringement and DMCA[/color][/url]");
        
            //CopyrightInfringementandDMCAhere
            
        re = /\[CopyrightInfringementandDMCAh]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=14][color=#1E90FF]here[/color][/url]");
        
        re = /\[Copyrighth]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=14][color=#1E90FF]here[/color][/url]");
        
        
        
        //ProtectingYourselfFromHFandMembers
        
        re = /\[ProtectingYourselfFromHFandMembers]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=18][color=#1E90FF]Protecting Yourself From HF and Members[/color][/url]");
        
        re = /\[Protect]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=18][color=#1E90FF]Protecting Yourself From HF and Members[/color][/url]");
        
            //ProtectingYourselfFromHFandMembershere
        
        re = /\[ProtectingYourselfFromHFandMembersh]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=18][color=#1E90FF]here[/color][/url]");
        
        re = /\[Protecth]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=18][color=#1E90FF]here[/color][/url]");
        
        
        
        //HFSiteAccessProblemsandLoadingErrors
        
        re = /\[HFSiteAccessProblemsandLoadingErrors]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=19][color=#1E90FF]HF Site Access Problems and Loading Errors[/color][/url]");

        re = /\[access]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=19][color=#1E90FF]HF Site Access Problems and Loading Errors[/color][/url]");
                
            //HFSiteAccessProblemsandLoadingErrorshere
            
        re = /\[HFSiteAccessProblemsandLoadingErrors]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=19][color=#1E90FF]here[/color][/url]");

        re = /\[access\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=19][color=#1E90FF]here[/color][/url]");
        
        
        
        //ProfilePoliciesViolationsandRules

        re = /\[ProfilePoliciesViolationsandRules\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=22][color=#1E90FF]Profile Policies, Violations, and Rules[/color][/url]");

        re = /\[profile\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=22][color=#1E90FF]Profile Policies, Violations, and Rules[/color][/url]");
        
            //ProfilePoliciesViolationsandRuleshere
        
        re = /\[ProfilePoliciesViolationsandRulesh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=22][color=#1E90FF]here[/color][/url]");

        re = /\[profileh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=22][color=#1E90FF]here[/color][/url]");
        
        
        
        //AdvertisingwithHackForums
        
        re = /\[AdvertisingwithHackForums\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=25][color=#1E90FF]Advertising with Hack Forums[/color][/url]");
        
        re = /\[Advert\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=25][color=#1E90FF]Advertising with Hack Forums[/color][/url]");
        
            //AdvertisingwithHackForumshere
        
        re = /\[AdvertisingwithHackForumsh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=25][color=#1E90FF]here[/color][/url]");
        
        re = /\[Adverth\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=25][color=#1E90FF]here[/color][/url]");
        
        
        
        //Whoisonstaff
        
        re = /\[Whoisonstaff\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=26][color=#1E90FF]Who is on staff?[/color][/url]");
        
        re = /\[onstaff\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=26][color=#1E90FF]Who is on staff?[/color][/url]");
        
            //Whoisonstaffhere
            
        re = /\[Whoisonstaffh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=26][color=#1E90FF]here[/color][/url]");
        
        re = /\[onstaffh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=26][color=#1E90FF]here[/color][/url]");
        
        
        
        //MarketplaceViolations
        
        re = /\[MarketplaceViolations\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=35][color=#1E90FF]Marketplace Violations[/color][/url]");
        
        re = /\[marketv\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=35][color=#1E90FF]Marketplace Violations[/color][/url]");
        
            //MarketplaceViolationshere
        
        re = /\[MarketplaceViolationsh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=35][color=#1E90FF]here[/color][/url]");
        
        re = /\[marketvh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=35][color=#1E90FF]here[/color][/url]");
        
        
        
        //MarketplaceSafeTradingandScamReports
        
        re = /\[MarketplaceSafeTradingandScamReports\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=15][color=#1E90FF]Marketplace, Safe Trading, and Scam Reports[/color][/url]");
        
        re = /\[safetrade\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=15][color=#1E90FF]Marketplace, Safe Trading, and Scam Reports[/color][/url]");
        
            //MarketplaceSafeTradingandScamReportshere
        
        re = /\[MarketplaceSafeTradingandScamReportsh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=15][color=#1E90FF]here[/color][/url]");
        
        re = /\[safetradeh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=15][color=#1E90FF]here[/color][/url]");
        
        
        
        //PremiumEbookBazaarProceduresandPolicies

        re = /\[PremiumEbookBazaarProceduresandPolicies\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=34][color=#1E90FF]Premium Ebook Bazaar Procedures and Policies[/color][/url]");
        
        re = /\[ebook\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=34][color=#1E90FF]Premium Ebook Bazaar Procedures and Policies[/color][/url]");
        
            //PremiumEbookBazaarProceduresandPolicieshere
            
        re = /\[PremiumEbookBazaarProceduresandPoliciesh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=34][color=#1E90FF]here[/color][/url]");
        
        re = /\[ebookh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=34][color=#1E90FF]here[/color][/url]");
        
        
        
        //SocialConnections
        
        re = /\[/SocialConnections\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=28][color=#1E90FF]Social Connections[/color][/url]");
        
        re = /\[/Social\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=28][color=#1E90FF]Social Connections[/color][/url]");
        
            //SocialConnectionshere
        
        re = /\[/SocialConnectionsh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=28][color=#1E90FF]here[/color][/url]");
        
        re = /\[/Socialh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=28][color=#1E90FF]here[/color][/url]");
        
        
        
        //OurAmazonAstore
        
        re = /\[OurAmazonAstore\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=29][color=#1E90FF]Our Amazon Astore[/color][/url]");
        
        re = /\[store\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=29][color=#1E90FF]Our Amazon Astore[/color][/url]");
        
            //OurAmazonAstorehere
        
        re = /\[OurAmazonAstoreh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=29][color=#1E90FF]here[/color][/url]");
        
        re = /\[storeh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=29][color=#1E90FF]here[/color][/url]");
        
        
        
        //Awards
        
        re = /\[Awards\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=9][color=#1E90FF]Awards[/color][/url]");
        
            //Awardshere
            
        re = /\[Awardsh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=9][color=#1E90FF]here[color][/url]");
        
        
        
        //CustomUserGroups
        
        re = /\[CustomUserGroups\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=32][color=#1E90FF]Custom User Groups[/color][/url]");
        
        re = /\[Groups\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=32][color=#1E90FF]Custom User Groups[/color][/url]");
        
                //CustomUserGroupshere
        
        re = /\[CustomUserGroupsh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=32][color=#1E90FF]here[/color][/url]");
        
        re = /\[Groupsh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=32][color=#1E90FF]here[/color][/url]");
        
        
        
        //HFAdBanners
        
        re = /\[HFAdBanners\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=33][color=#1E90FF]HF Ad Banners[/color][/url]");
        
        re = /\[banners\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=33][color=#1E90FF]HF Ad Banners[/color][/url]");
        
            //HFAdBannershere
        
        re = /\[HFAdBannersh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=33][color=#1E90FF]here[/color][/url]");
        
        re = /\[bannersh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=33][color=#1E90FF]here[/color][/url]");
        
        
        
        //PrivacyPoliciesandLegalDisclaimer
        
        re = /\[PrivacyPoliciesandLegalDisclaimer\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=12][color=#1E90FF]Privacy Policies and Legal Disclaimer[/color][/url]");
        
        re = /\[Privacy\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=12][color=#1E90FF]Privacy Policies and Legal Disclaimer[/color][/url]");

            //PrivacyPoliciesandLegalDisclaimerhere

        re = /\[PrivacyPoliciesandLegalDisclaimerh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=12][color=#1E90FF]here[/color][/url]");
        
        re = /\[Privacyh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=12][color=#1E90FF]here[/color][/url]");
        
        
        
        //Upgradingtol33torub3r
        
        re = /\[Upgradingtol33torub3r\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=13][color=#1E90FF]Upgrading to l33t or ub3r[/color][/url]");
        
        re = /\[Upgrade\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=13][color=#1E90FF]Upgrading to l33t or ub3r[/color][/url]");
        
            //Upgradingtol33torub3rhere
        
        re = /\[Upgradingtol33torub3rh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=13][color=#1E90FF]here[/color][/url]");
        
        re = /\[Upgradeh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=13][color=#1E90FF]here[/color][/url]");
        
        
        
        //StolenHFAccounts
        
        re = /\[StolenHFAccounts\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=17][color=#1E90FF]Stolen HF Accounts[/color][/url]");
        
        re = /\[stolen\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=17][color=#1E90FF]Stolen HF Accounts[/color][/url]");
        
            //StolenHFAccountshere
        
        re = /\[StolenHFAccountsh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=17][color=#1E90FF]here[/color][/url]");
        
        re = /\[stolenh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=17][color=#1E90FF]here[/color][/url]");
        
        
    
        //BecomingStaff
        
        re = /\[BecomingStaff\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=16][color=#1E90FF]Becoming Staff[/color][/url]");
        
            //BecomingStaffhere
            
        re = /\[BecomingStaffh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=16][color=#1E90FF]here[/color][/url]");
        
        
        
        //UserRegistration
        
        re = /\[UserRegistration\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=1][color=#1E90FF]User Registration[/color][/url]");
        
        re = /\[Register\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=1][color=#1E90FF]User Registration[/color][/url]");
        
            //UserRegistrationhere
        
        re = /\[UserRegistrationh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=1][color=#1E90FF]here[/color][/url]");
        
        re = /\[Registerh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=1][color=#1E90FF]here[/color][/url]");
        
        
        
        //ProfilesandYourUserCP
        
        re = /\[ProfilesandYourUserCP\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=1][color=#1E90FF]User Registration[/color][/url]");
        
        re = /\[profilesUserCP\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=1][color=#1E90FF]User Registration[/color][/url]");
        
            //ProfilesandYourUserCPhere
        
        re = /\[ProfilesandYourUserCPh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=1][color=#1E90FF]here[/color][/url]");
        
        re = /\[profilesUserCPh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=1][color=#1E90FF]here[/color][/url]");
        
        
        
        //UseofCookiesonmyBB
        
        re = /\[UseofCookiesonmyBB\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=3][color=#1E90FF]Use of Cookies on myBB[/color][/url]");
        
        re = /\[cookies\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=3][color=#1E90FF]Use of Cookies on myBB[/color][/url]");
        
            //UseofCookiesonmyBBhere
        
        re = /\[UseofCookiesonmyBBh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=3][color=#1E90FF]here[/color][/url]");
        
        re = /\[cookiesh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=3][color=#1E90FF]here[/color][/url]");
        
        
        
        //LoggingInandOut
        
        re = /\[LoggingInandOut\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=4][color=#1E90FF]Logging In and Out[/color][/url]");
        
        re = /\[login\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=4][color=#1E90FF]Logging In and Out[/color][/url]");
        
            //LoggingInandOuthere
        
        re = /\[LoggingInandOuth\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=4][color=#1E90FF]here[/color][/url]");
        
        re = /\[loginh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=4][color=#1E90FF]here[/color][/url]");
        
        
        
        //AccountPruning
        
        re = /\[AccountPruning\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=24][color=#1E90FF]Account Pruning[/color][/url]");
        
        re = /\[Pruning\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=24][color=#1E90FF]Account Pruning[/color][/url]");
        
            //AccountPruninghere
        
        re = /\[AccountPruningh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=24][color=#1E90FF]here[/color][/url]");
        
        re = /\[Pruningh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=24][color=#1E90FF]here[/color][/url]");
        
        
        
        //PostingaNewTopic
        
        re = /\[PostingaNewTopic\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=5][color=#1E90FF]Posting a New Topic[/color][/url]");
        
        re = /\[NewTopic\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=5][color=#1E90FF]Posting a New Topic[/color][/url]");
        
            //PostingaNewTopichere
        
        re = /\[PostingaNewTopich\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=5][color=#1E90FF]here[/color][/url]");
        
        re = /\[NewTopich\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=5][color=#1E90FF]here[/color][/url]");
        
        
        
        //PostingaReply
        
        re = /\[PostingaReply\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=6][color=#1E90FF]Posting a Reply[/color][/url]");
        
        re = /\[reply\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=6][color=#1E90FF]Posting a Reply[/color][/url]");
        
            //PostingaReplyhere
        
        re = /\[PostingaReplyh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=6][color=#1E90FF]here[/color][/url]");
        
        re = /\[replyh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=6][color=#1E90FF]here[/color][/url]");
                
            //HelpDocs Section Finished

//myCode
        
        re = /\[myCode\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=7][color=#1E90FF]myCode[/color][/url]");
        
            //myCodehere
            
        re = /\[myCodeh\]/gi;
        elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help&hid=7][color=#1E90FF]here[/color][/url]");
  }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;