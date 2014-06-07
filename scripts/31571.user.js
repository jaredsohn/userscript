// ==UserScript==
// @name           AppleDaily News Loader
// @namespace      mt@live.hk
// @description    Load All News In One Page
// @include        http://*hk.apple.nextmedia.com/template/apple*/art_main.php?*
// ==/UserScript==

// Author:			FatTunG
// Contact:			mt@live.hk
// Version:			2.4

/**
 * === Version History ===
 * Version 2.4 (10 JUNE 2009)
 *   - Fix: Blank page problem
 *   - Add: Remove video in news page
 * 
 * Version 2.3 (24 MAY 2009)
 *   - Modify: Disable ANL in some pages which have different structure from standard page
 * 
 * Version 2.2 (22 MAY 2009)
 *   - Add: Original link of each news, this script will be temporarily disabled if 
 *          user click on this link because I added "#stopanl" at the end of the original link
 * 
 * Version 2.1 (19 MAY 2009)
 *   - Fix: Problem occurs when selecting multiple images in intro photo box 
 * 
 * Version 2.0 (18 MAY 2009)
 *   - Fix: Compatible with the new php version of appledaily
 *   - Add: Change the link of image to point to the real image directly
 * 
 * Version 1.2 (7 SEP 2008)
 *   - Fix: Hitrate display problem
 * 
 * Version 1.1 (13 AUG 2008)
 *   - Modify: Add info at the top-right-hand corner
 *   - Modify: Remove useless div and tidy up the layout
 *   - Feature Add: Show loading icon when loading the news
 *
 * Version 1.0 (11 AUG 2008)
 *   - First Release
 */

var ANL = {
    "version": "2.4",
    
    "stopFlag": "stopanl",

    "init": function()
    {
		var enable = this.checkEnable();
		if (enable)
		{
	        this.addCssStyle();
	        this.appendANLInfo();
	        this.loadNews();
		}
    },

    "checkEnable": function()
    {
    	if (location.href.indexOf("#" + this.stopFlag) > -1) return false; else return true;
    },
    
    "pageCleanUp": function()
    {
        // Remove current content
        document.getElementById("container").style.display = "none";
    },

    "addCssStyle": function()
    {
        var strBodyFontCss = '* { font-family: "微軟正黑體","新細明體","細明體" !important; }';
        var strGroupNameCss = '.groupname { padding-left: 3px; font-size: 160%; background-color: #CCFF99; }';
        var strNewsTitleCss = '.newstitle { font-size:24px; font-weight: bold; line-height: 1.2em; border-bottom: 3px dotted; margin-left: 0px !important; margin-bottom: 5px !important; width: auto !important; }';
        var strNewsContentCss = '#NewContent p {font-size: 16px } #NewContent h2 { font-size: 18px; font-weight: bold }';
        var strPhotoBoxPCss = 'div.articlePhotoBoxContent p, div#articleReleatedLink li { font-size: 16px }';
        var strSeperatorCss = '.seperator { height: 5px; background-color: Red; color: Red; margin: 20px 0 10px }';
        var strSpacerCss = '#NewContent #articleContent div.spacer { height: 15px }';
        var strMenuCss = '.menu { text-align: center; }';
        var strIntroPhotoBox = '.introPhotoBox { float: left; margin-right: 15px !important }';
        var strHitrateCss = '.hitrate { float: right; color: #2D5391; margin-top: 5px }';
        var strTopBarLink = '.top { float: right; margin: 5px 2px 0px 5px }';
        var strOriginalLinkCss = '.olink { float:right; margin: 5px 2px 0px 5px }';
        var strLoading = '.loading {  height: 50px; background: transparent url(' + ANL.Res.LoadingGif + ') no-repeat scroll center; border-bottom: solid 5px red;}';
        this.addGlobalStyle(strBodyFontCss + strGroupNameCss + strNewsTitleCss + strNewsContentCss + strPhotoBoxPCss + strSpacerCss + 
        		strHitrateCss + strSeperatorCss + strMenuCss + strIntroPhotoBox + strTopBarLink + strOriginalLinkCss + strLoading);
    },

    "appendANLInfo": function()
    {
        var topBar = document.getElementById("siteNav");
        var spaceDiv = $x("//div[@class='spacer']", topBar, XPathResult.FIRST_ORDERED_NODE_TYPE);
        
        spaceDiv.parentNode.removeChild(spaceDiv); // remove userless spacer

        var scriptName = document.createElement("div");
        scriptName.setAttribute("style", 'float: right; margin-top: 5px; margin-right: 5px;');
        scriptName.innerHTML = "<a style='color: #CC0000; font-weight: bold; text-decoration: underline;' href='http://userscripts.org/scripts/show/31571' target='_blank'>Modded By ANL " + this.version + "</a>";

        topBar.appendChild(scriptName);
    },

    "loadNews": function()
    {
        // Add new content wrapper
        var divWrapper = document.getElementById("wrapperMain");
        if (divWrapper == null) divWrapper = document.getElementById("wrapper");

        var sltArticleMenu = document.getElementById("sltArticleMenu");
        if (sltArticleMenu == null) return; // No articles menu, stop loading news
        var opgGroups = sltArticleMenu.getElementsByTagName("OPTGROUP");

        this.pageCleanUp(); // Clean page content
        
        var divOldContent = document.getElementById("container");
        var divNewContent = document.createElement("div");
        divNewContent.setAttribute("id", "NewContent");
        
        divWrapper.insertBefore(divNewContent, divOldContent);
        appendMenu();

        for (var i = 0; i < opgGroups.length; i++) 
        {
            if (opgGroups[i].label == "客戶資訊") continue;
            appendGroupName(opgGroups[i].label);
            loadNewsInGroup(opgGroups[i]);
        }


        // Helper functions
        function appendMenu()
        {
            var newMenu = sltArticleMenu.cloneNode(true);
            newMenu.setAttribute("onchange", "var opt = dojo.fromJson(this.options[this.selectedIndex].value);document.getElementById(opt.art_id).scrollIntoView();");
            var newDiv = document.createElement("div");
            newDiv.setAttribute("class", "menu");
            newDiv.appendChild(newMenu);
            divNewContent.appendChild(newDiv);
        }

        function appendGroupName(label)
        {
            var groupNameNode = document.createElement("div");
            groupNameNode.setAttribute("class", "groupname");
            groupNameNode.innerHTML = label;

            divNewContent.appendChild(groupNameNode);
        }

        function loadNewsInGroup(group)
        {
            var optNewsInGroup = group.getElementsByTagName("OPTION");
            for (var i = 0; i < optNewsInGroup.length; i++) {
                var optValue = optNewsInGroup[i].getAttribute("value");
                var articleId = unsafeWindow.dojo.fromJson(optValue).art_id;

                var newsNode = document.createElement("div");
                newsNode.setAttribute("id", articleId); // Set id to article ID
                newsNode.setAttribute("class", "loading");
                newsNode.style.overflow = "hidden";
                divNewContent.appendChild(newsNode);

                var newsUrl = getUrl(optNewsInGroup[i].getAttribute("value"));
                getNewsContent(newsUrl, articleId);
            }

            function getUrl(opt)
            {
            	var objInfo = unsafeWindow.dojo.fromJson(opt);
            	
                var iss_id = document.getElementsByName("issue_id")[0].getAttribute("value");
                var sec_id = objInfo.sec_id;
                var subsec_id = objInfo.subsec_id;
                var art_id = objInfo.art_id;
                var cat_id = objInfo.cat_id;
                var coln_id = objInfo.coln_id;
                
                return ANL.getUrlPrefix() + "art_main.php?" + "iss_id=" + iss_id + "&sec_id=" + sec_id +
	                    "&subsec_id=" + subsec_id + "&art_id=" + art_id +
	                    (cat_id == 0 || cat_id == null ? "" : "&cat_id=" + cat_id) +
	                    (coln_id == 0 || coln_id == null ? "" : "&coln_id=" + coln_id);
            }

            function getNewsContent(url, id)
            {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: url,
                    onerror: function()
                    {
                        alert("Error");
                    },
                    onload: function(rs)
                    {
                        // Get useful content in response text
                        var divFullContent = document.createElement("div");
                        divFullContent.innerHTML = rs.responseText;

                        var contentHead = getSingleNode('//*[@id="articleTitle"]/h1', divFullContent);
                        var articleContent = getSingleNode('//*[@id="articleContent"]', divFullContent);
                        var introPhotoBox = getSingleNode('//*[@id="articleIntroPhoto"]', divFullContent);
                        
                        var targetNode = document.getElementById(id);
                        
                        if (contentHead) {
                            contentHead.setAttribute("class", "newstitle");
                            targetNode.appendChild(contentHead);
                        }
                        
                        if (introPhotoBox)
                    	{
                    		introPhotoBox.setAttribute("class", "introPhotoBox");
                    		
                    		var scriptNode = nextSibling(introPhotoBox);
                            // Modify the script
                            scriptNode.innerHTML = scriptNode.innerHTML.replace(/NMI_intro_photo/g, "NMI_intro_photo" + id);
                            scriptNode.innerHTML = scriptNode.innerHTML.replace(/document\.getElementById\(\"intro_photo_prev\"\)/g,
	                                'document.evaluate(\'//div[@id="' + id +
	                                '"]//*[@id="intro_photo_prev"]\', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue');
                            scriptNode.innerHTML = scriptNode.innerHTML.replace(/document\.getElementById\(\"intro_photo_next\"\)/g,
	                                'document.evaluate(\'//div[@id="' + id +
	                                '"]//*[@id="intro_photo_next"]\', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue');
                            scriptNode.innerHTML = scriptNode.innerHTML.replace(/document\.getElementById\(\"intro_photo_zoom_btn\"\)/g,
	                                'document.evaluate(\'//div[@id="' + id +
	                                '"]//*[@id="intro_photo_zoom_btn"]\', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue');
                            scriptNode.innerHTML = scriptNode.innerHTML.replace(/document\.getElementById\(\"intro_photo_caption\"\)/g,
	                                'document.evaluate(\'//div[@id="' + id +
	                                '"]//*[@id="intro_photo_caption"]\', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue');
                            scriptNode.innerHTML = scriptNode.innerHTML.replace(/document\.getElementById\(\"articleIntroPhoto\"\)/g,
	                                'document.evaluate(\'//div[@id="' + id +
	                                '"]//*[@id="articleIntroPhoto"]\', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue');
                            scriptNode.innerHTML = scriptNode.innerHTML.replace(/document\.getElementById\(\"articleIntroPhotoController\"\)/g,
	                                'document.evaluate(\'//div[@id="' + id +
	                                '"]//*[@id="articleIntroPhotoController"]\', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue');
                            scriptNode.innerHTML = scriptNode.innerHTML.replace(/document\.getElementById\(\"intro_photo_count\"\)/g,
	                                'document.evaluate(\'//div[@id="' + id +
	                                '"]//*[@id="intro_photo_count"]\', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue');
                            scriptNode.innerHTML = scriptNode.innerHTML.replace(/document\.getElementById\(\"intro_photo_link_img\"\)/g,
	                                'document.evaluate(\'//div[@id="' + id +
	                                '"]//*[@id="intro_photo_link_img"]\', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue');
                            scriptNode.innerHTML = scriptNode.innerHTML.replace(/document\.getElementById\(\"intro_photo_link_flv\"\)/g,
	                                'document.evaluate(\'//div[@id="' + id +
	                                '"]//*[@id="intro_photo_link_flv"]\', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue');
                            scriptNode.innerHTML = scriptNode.innerHTML.replace(/document\.getElementById\(\"intro_photo_img\"\)/g,
	                                'document.evaluate(\'//div[@id="' + id +
	                                '"]//*[@id="intro_photo_img"]\', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue');
                            scriptNode.innerHTML = scriptNode.innerHTML.replace(/document\.getElementById\(\"articleIntroPhotoBox\"\)/g,
	                                'document.evaluate(\'//div[@id="' + id +
	                                '"]//*[@id="articleIntroPhotoBox"]\', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue');
                            scriptNode.innerHTML = scriptNode.innerHTML.replace(/document\.getElementById\(\"div_art_photo_flv\"\)/g,
	                                'document.evaluate(\'//div[@id="' + id +
	                                '"]//*[@id="div_art_photo_flv"]\', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue');
                            scriptNode.innerHTML = scriptNode.innerHTML.replace(/document\.getElementById\(\"div_art_photo_img\"\)/g,
	                                'document.evaluate(\'//div[@id="' + id +
	                                '"]//*[@id="div_art_photo_img"]\', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue');
                            scriptNode.innerHTML = scriptNode.innerHTML.replace(/document\.getElementById\(\"left_picviewer_info\"\)/g,
	                                'document.evaluate(\'//div[@id="' + id +
	                                '"]//*[@id="left_picviewer_info"]\', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue');
                            
                            // Override the next/prev function
                            scriptNode.innerHTML = scriptNode.innerHTML.replace(/this\.controller\.next\(\);/g,
	                                'this.controller.next();return false;');
                            scriptNode.innerHTML = scriptNode.innerHTML.replace(/this\.controller\.prev\(\);/g,
                            		'this.controller.prev();return false;');
                            
                            // Point to the real image
                            scriptNode.innerHTML = scriptNode.innerHTML.replace("#TB_inline?height=&width=&inlineId=imgDiv&modal=true&imageUrl=", "");
                            
                    		targetNode.appendChild(introPhotoBox);
                            targetNode.appendChild(scriptNode);
                    	}
                        
                        if (articleContent)
                        {
                        	removeNode(getSingleNode('//*[@class="adArticleRight"]', articleContent)); // remove the ads
                        	removeNode(getSingleNode('//*[@class="videoPanel"]', articleContent)); // remove video node
                        	removeNode(getSingleNode('/link', articleContent)); // remove link node
                        	var scriptNodes = getOrderedSnapshot('/script', articleContent), item; // remove script
                        	for (var i = 0; i < scriptNodes.length; i++) removeNode(scriptNodes[i]);
                        	
                        	targetNode.appendChild(articleContent);
                        }
                        
                        // Add a seperator
                        var hr = document.createElement("hr");
                        hr.setAttribute("class", "seperator");
                        targetNode.appendChild(hr);

                        // Clear loading icon
                        targetNode.setAttribute("class", "");
                        
                        // Open in new tab
                        var linkNodes = $x('//div[@class="articlePhotoBoxContent"]//a', targetNode, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
                        for (var i = 0; i < linkNodes.length; i++)
                        {
                        	linkNodes[i].setAttribute("target", "_blank");
                        	linkNodes[i].href = linkNodes[i].href.replace(/.*imageUrl=/, "");
                        }
                        
                        // Add view# and remove reply#
                        var hitrate = 0;
                        if (typeof(unsafeWindow.today_top_rank) != "undefined")
                        {
	                        var maxcount = unsafeWindow.today_top_rank.ART_RANKING.ARTICLE_ID.length;
	                        for (var i = 0; i < maxcount; i++)
	                        {
	                            if (unsafeWindow.today_top_rank.ART_RANKING.ARTICLE_ID[i] == id)
	                            {
	                                hitrate = Math.round(unsafeWindow.today_top_rank.ART_RANKING.PV_SCORE[i] * 100 / 3);
	                                hitrate = unsafeWindow.dojo.number.format(hitrate, { pattern: "#,##0" });
	                                break;
	                            }
	                        }
                        }

                        var newHitrate = document.createElement("span");
                        newHitrate.innerHTML = "瀏覽人次 : " + hitrate;
                        newHitrate.setAttribute("class", "hitrate");
                        targetNode.insertBefore(newHitrate, contentHead);
                        
                        // Original link
                        var originalLink = document.createElement("a");
                        originalLink.setAttribute("href", url + "#" + ANL.stopFlag);
                        originalLink.setAttribute("target", "_blank");
                        originalLink.setAttribute("class", "olink");
                        originalLink.innerHTML = "原文連結";
                        targetNode.insertBefore(originalLink, newHitrate);
                        
                        // Add top link
                        var topLink = document.createElement("a");
                        topLink.setAttribute("onclick", 'scrollTo(0,0)');
                        topLink.setAttribute("href", "#");
                        topLink.setAttribute("class", "top");
                        topLink.innerHTML = "Top";
                        targetNode.insertBefore(topLink, originalLink);
                        
                        // Helper function
                        function getSingleNode(path, root)
                        {
                            return $x(path, root, XPathResult.FIRST_ORDERED_NODE_TYPE);
                        }
                        
                        function getOrderedSnapshot(path, root)
                        {
                        	return $x(path, root, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, false);
                        }
                        function removeNode(node)
                        {
                        	if (node != null && node.parentNode != null) node.parentNode.removeChild(node);
                        }
                    }
                });
            }
        }
    },

    "getUrlPrefix": function()
    {
    	var lastSharp = location.href.lastIndexOf("#");
    	var link = lastSharp != -1 ? location.href.substring(0, lastSharp) : location.href;
    	
        return link.substring(0, location.href.lastIndexOf("/") + 1);
    },

    "addGlobalStyle": function(css)
    {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }
};

ANL.Res = {
    "LoadingGif": "data:image/gif;base64,R0lGODlhIgAiAPQAADk5OVJSUlpaWmtra3t7e4SEhIyMjJSUlJycnKWlpa2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAgFAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAIgAiAAAFhiAljmRJLYmprqx4AG1cBgb5yjjVCDacxxKBYnT7lQoI0mBA9BlHEOToIYC4nE9RNCUa1CjFLLTAdQQmYKyYshUJkodAVhFBQwkpB2OtSygYEVMFVnwjDSh0hSwSDX6EiioOj5CUJRIPEJiamJATERESn6CflaWmp6ipqqusra6vsLGys6ohACH5BAgFAAAALAAAAAAiACIAhCEhISkpKVpaWmNjY2tra3Nzc4SEhIyMjJSUlKWlpa2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWTICWOZElJiqmuZkMqAiurUPHG4wNEM2ukIsWAJAj0SBPSwzASjiQA15HyUCRFEoPUKSIApqNF4kpBALkUwAIctoqWSW4BQGYv3BTDmhs4sEsKQAx%2BCjYJABBTDg91EwprKCQJBGwQixIjjg5%2FLBAPDhF1nCwRDw%2BJoz0SmKmtrq%2BwsbKztLW2t7i5uru8vb6%2FwL4hACH5BAgFAAAALAAAAAAiACIAhCEhISkpKTk5OUJCQkpKSlJSUlpaWmNjY3Nzc4SEhIyMjJSUlJycnK2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWT4CWOZCk6ZqqaFAkha5xSjJuQiiHHTTRCt1FBsltNGj%2BYaKEriiQTUoXRugBHB%2BSoEpBFoiMHRPQSPQqVEQUg2H3VNWswobxMAIOiBTrqXR43FQU%2BdnhOFxZvFxFIEAsXDE0SAASHIntRFYRmPpMFliOJVSkAn6BOQaeqq6ytrq%2BwsbKztLW2t7i5uru8vb6%2FwIchACH5BAgFAAAALAAAAAAiACIAhCEhIUJCQlJSUlpaWnNzc4SEhIyMjJSUlJycnKWlpa2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWVICWOZCk2Zqqu4qOwcDk55JOQShGvTzS6JMNrl3o8frdWwUc0TR6T1pCCMJAag2YL0kpKCtyTYEqUHClASm6kGBy0I4fPJiqcGQOyFnKEvBYFUW0IcCQTTCIONHiEJBIMhSUSAo0iDAEAABKRJEwSCpkBBJwmDgKZBIikJAUBOquwsbKztLW2t7i5uru8vb6%2FwMHCsCEAIfkECAUAAAAsAAAAACIAIgCEISEhKSkpQkJCWlpaY2Nja2tre3t7hISEjIyMlJSUnJycra2ttbW1vb29xsbGzs7O1tbW3t7e5%2Bfn7%2B%2Fv9%2Ff3%2F%2F%2F%2FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYlgJY5kKU5mqq7nw76vBJGRAt%2FV5I4Ng8OyEWUh%2Bb0mM5FjQaIcjKWgSFE8GRJQkk70YJ4O2OxISrXaxKNJpNKlVCSHM7oUcbzjpQdhPsKfHAMDT3wVDVwGgQluhCIQBAMFcowiDAlrk5g4CZucnIt8AgEAogClAAiZqaqrrK2ur7CxsrO0tbavIQAh%2BQQIBQAAACwAAAAAIgAiAIQhISEpKSlKSkpra2t7e3uEhISMjIyUlJScnJylpaWtra21tbW9vb3GxsbOzs7W1tbe3t7n5%2Bfv7%2B%2F39%2Ff%2F%2F%2F8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFjCAljmRpnmiqriwbPW1cOpJsS7AtQxA5KbqUYzL6LYInSI4iURyRpkeN6YSaIg6RJMGwmiTEZte3tHJJkAOh4BVlmY8CIVH2QhCFArBdYiQafIE6BwaFBgSIBGNehAYIj48Lb4KUIgkElSQKAAADPZkUCgEAAgagFAwCnAOnEQsARKeys7S1tre4uYEhACH5BAgFAAAALAAAAAAiACIAhCEhIUJCQkpKSlJSUlpaWmNjY2tra4yMjJSUlJycnK2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWEICWOZGmeaKqubOu%2BcCzP6EOvk2Pf6PRAvN4vePIBiSVjMkIcjiILRYIoEU0gUsaRGGEkFI4JcvRg7MboVYOxbrjd1WDiQK%2FTGen8ArFNPwoDBVNoYhQPCQQDCExBCgANIzmJBkQEAA4lEINBlph5IgMAZ3mhfWkCAKZoAQCfrq%2BwsS8hACH5BAgFAAAALAAAAAAiACIAhCEhIUJCQkpKSlJSUlpaWnNzc4SEhIyMjJSUlJycnKWlpa2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWCYCWOZGmeaKqubOu%2BcCzPdG3feK7T1D5SkcfDN4E8IhId0Jj0SZC%2BaCoCqVqrucVCse0qHNLdgxGuPAwFxoQoghgMCUhOMmiMIgjDYVEzgBMDfCMTDQY1AQMiCQR2OggAaxWLgjkAlAuBOgUAJIAIcwCNIgsEOgIBZZuRUqFlPWUsIQAh%2BQQIBQAAACwAAAAAIgAiAIQxMTFSUlJaWlpjY2Nzc3OEhISMjIyUlJScnJylpaWtra21tbW9vb3GxsbOzs7W1tbe3t7n5%2Bfv7%2B%2F39%2Ff%2F%2F%2F8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFgSAljmRpnmiqrmzrvnAsz3Rt33iu73zv%2F8DgSRIhGosTHOTBbDIjwhvEAYQkFI2kD6JIMCA5BwEqiiwU2BqDmiiARxKrLHCgHAQiRIFsA9QlAVQUenw0fiIFBCN6En11FA4BfAgEWjOHIgMIJHo1mHYCljefFIE6pAZ4OaQ8B28uIQAh%2BQQIBQAAACwAAAAAIgAiAIQhISEpKSlCQkJSUlJaWlpjY2Nra2tzc3N7e3uEhISMjIyUlJScnJylpaWtra21tbW9vb3GxsbW1tbe3t7n5%2Bfv7%2B%2F39%2Ff%2F%2F%2F8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFkOAljmRpnmiqrmzrvnAsz3Rt33iu73zv%2F8CgcEgcVShAS0QyqfwskigSR2k4RRaKJDJtRRqkyOQCcXSxkhfgcHEg2gpR%2BSqDAJAOw2WSmEKsMwIDInkiCg4jfxYxEwAPhAUiDwmLkg6VLgwBIw6RIglpIw9gamyQnAk1diSdIxYJYzMBnoQEJAsLOg62T4gvIQAh%2BQQIBQAAACwAAAAAIgAiAIQhISFaWlpjY2Nzc3N7e3uEhISMjIycnJylpaWtra21tbW9vb3GxsbOzs7W1tbe3t7n5%2Bfv7%2B%2F39%2Ff%2F%2F%2F8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFkeAkjmRpnmiqrmzrvnAsz3Rt33iu73zv%2F8CgcEgs2hpAAiCCkjQkM6Vi4kiQHJDJw8GEDQDWycAwSSwmjKm20W19DyJIAHmYPhLdbVv1Hi0CIgdnZQ4jD2wrXwgkAXATCGoNYSJ6KgCOIg0BUBOCIwhZhkgvAgWfkwyTMhEBg2WuEqA0miQIqgqjOAquPQy5LSEAIfkECAUAAAAsAAAAACIAIgCEISEhMTExOTk5SkpKWlpaY2Nja2trc3Nze3t7hISEjIyMnJycra2ttbW1vb29xsbGzs7O1tbW3t7e5%2Bfn7%2B%2Fv9%2Ff3%2F%2F%2F%2FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABY%2BgJY5kaZ5oqq5s675wLM90bd94ru987%2F%2FAoHCIexgWPUQAIHjoJgYAoAARVXADaeMqigwit2ZJQkhYJNURhTuTDMyWRMPiAEvAs0m5m7gywBURbC8TAwgjC0gWDXgREzEUBAdqCXh%2FIhNpL5IkEHCLeBYRFDYJDCOXInc1EocjjJ2DMAqnqKFntzapPoIwIQAh%2BQQIBQAAACwAAAAAIgAiAIQ5OTlSUlJaWlpra2t7e3uEhISMjIyUlJScnJylpaWtra29vb3GxsbOzs7W1tbe3t7n5%2Bfv7%2B%2F39%2Ff%2F%2F%2F8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFguAkjmRpnmiqrmzrvnAsz3Rt33iu73zv%2F0DYAUAsEgO4xWHJZAaDEsSi9zAEBI7dYRAYNEQPnEEgIGRFiYLkJmhESOnsI6xLEOiK7%2BNtQxToDwkiDhB9fyMKDGCFNH50ExAKfA58M4cjCwojlDoSeZuMOBCCIw%2BhN4kknD%2BrPhGVLSEAIfkECAUAAAAsAAAAACIAIgCEISEhKSkpQkJCWlpaY2Nja2trc3Nze3t7hISEjIyMlJSUpaWlra2ttbW1vb29xsbG1tbW3t7e5%2Bfn7%2B%2Fv9%2Ff3%2F%2F%2F%2FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYRgJY5kaZ5oqq5s675wLM90bd94HgMOpZcEAAAB%2BZEMAYDAYRw9BkJmszI5LKY%2FCmPL5eIYA4K4QC4ksOhRhCH9NRIIRUQ3YSAQDIloflPciyMODDhyJYJ6FBM%2FDguKFRB6OQ0MjhMPOow%2Be3w3k5oVFBCONwyfFRKAUw%2BRTaFoq2mxNyEAIfkECAUAAAAsAAAAACIAIgCEISEhWlpaY2Njc3Nze3t7hISEjIyMnJycpaWlra2ttbW1vb29xsbGzs7O1tbW3t7e5%2Bfn7%2B%2Fv9%2Ff3%2F%2F%2F%2FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYLgJI5kaZ5oqq5s675wLJPAMLdIfbOHvqsK3w%2B1ABCGokakFBQgAwFBgxRkIBcF6AIiWiJFEoMgMHB8TQ1D4swmOQ4IBFyOWA8bi8RCwc8v2oApDwxmbQ0JCQpcXxIMdQ5eEkiICYsiD4U%2FSiWYXm2dgaCAmJKjkIETDpaorK2ur4AhACH5BAgFAAAALAAAAAAiACIAhCEhITExMTk5OVJSUlpaWmNjY2tra3Nzc3t7e4SEhIyMjJycnKWlpa2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWM4CWOZGmeaKqurDCw8PkAVWyPgHGrRD06gF3qMKCMKgCEEHUgGEWFwBKFKIoggMj0VJ2IArqpwktKDCQXiGLLSCQivkuCYNmSGu4FOm03QdoJZH0mFQ5ag4gnEg4ODYyODQ%2BDFhKVlpaJmTAWFHGJFJaefRMSEROidqQRdZoXEqytsbKztLW2t7i5tCEAOw%3D%3D"
};

// Helper Functions
function $x()
{
	var x = '', // default values
	node = document, 
	type = 0, 
	fix = true, 
	i = 0, 
	toAr = function(xp)
	{ // XPathResult to array
		var final = [], next;
		while (next = xp.iterateNext())
			final.push(next);
		return final;
	}, 
	cur;
	
	while (cur = arguments[i++])
	{
		// argument handler
		switch (typeof cur)
		{
			case "string":
				x += (x == '') ? cur : " | " + cur;
				continue;
			case "number":
				type = cur;
				continue;
			case "object":
				node = cur;
				continue;
			case "boolean":
				fix = cur;
				continue;
		}
	}
	
	if (fix)
	{ // array conversion logic
		if (type == 6) type = 4;
		if (type == 7) type = 5;
	}
	
	if (!/^\//.test(x)) x = "//" + x; // selection mistake helper
	if (node != document && !/^\./.test(x)) x = "." + x; // context mistake helper
	var temp = document.evaluate(x, node, null, type, null); // evaluate!
	if (fix)
	{
		switch (type)
		{ // automatically return special type
			case 1:
				return temp.numberValue;
			case 2:
				return temp.stringValue;
			case 3:
				return temp.booleanValue;
			case 8:
				return temp.singleNodeValue;
			case 9:
				return temp.singleNodeValue;
		}
	}
	return fix ? toAr(temp) : temp;
}

function nextSibling(startSib)
{
	if (!(nextSib = startSib.nextSibling)) return false;
	while (nextSib.nodeType != 1) if (!(nextSib = nextSib.nextSibling)) return false;
	return nextSib;
}

window.onload = ANL.init();