// ==UserScript==
// @name           Bungie Ignore System
// @namespace      http://iggyhopper.dyndns.org/
// @description    A basic system for ignoring posts form certain users.
// @include        http://*bungie.net/Forums/posts.aspx*
// ==/UserScript==

var Url = location.toString();
if (Url.match("http://.*bungie.net/settings*."))
{
    var S = Query("settings");
    (S != false && S == "BIS") ? LoadIgnoreSettings() : false;
}
else
{
    IgnoreUsers();
}

/*
<ul id="ctl00_mainContent_postRepeater1_ctl01_ctl00_spam_collapsebar" class="spam_collapse_bar">
    <li>This post has been reported for violating the code of conduct. Click arrow to view at your own risk.</li>
    <li class="right">
        <a id="ctl00_mainContent_postRepeater1_ctl01_ctl00_expandItemLink" class="expanded_arrows_collapsed" href="javascript: forumPostArrowExpander('ctl00_mainContent_postRepeater1_ctl01_ctl00_expandItemLink','ctl00_mainContent_postRepeater1_ctl01_ctl00_post_display_container');">
            <img src="/images/spacer.gif" width="21px" height="20px" alt=""/>
        </a>
    </li>
</ul>
*/

function Query(Parameter)
{
    var Search = location.search.substring(1, location.search.length);
    var SearchParameter = { Name: null, Value: false };
    var Parameters = Search.split("&");
    for (var I = 0; I < Parameters.length; I++)
    {
        SearchParameter.Name = Parameters[I].substring(0, Parameters[I].indexOf("="));
        if (SearchParameter.Name == Parameter)
        {
            SearchParameter.Value = Parameters[I].substring(Parameters[I].indexOf("=") + 1);
        }
    }
    return SearchParameter.Value ? SearchParameter.Value : false;
}

function $(Id, Tag, Class)
{
    if (Id != null)
    {
        var Element = document.getElementById(Id);
        return Element != null ? Element : false;
    }
    else if (Tag != null)
    {
        if (Class == null)
        {
            var ElementArray = document.getElementsByTagName(Tag);
            return ElementArray != null ? (ElementArray.length == 1 ? ElementArray[0] : ElementArray) : false;
        }
        else
        {
            var ElementArray = document.getElementsByTagName(Tag);
            var ReturnArray = [];
            for (var I = 0, J = 0; I < ElementArray.length; I++)
            {
                if (ElementArray[I].className == Class)
                {
                    ReturnArray[J] = ElementArray[I];
                    J++;
                }
            }
            return ReturnArray.length == 1 ? ReturnArray[0] : ReturnArray;
        }
    }
    else
    {
        return false;
    }
}

function LoadIgnoreSettings()
{
    var _Date = new Date();
    var Settings = { PageHead: $(null, "head"), Header: $(null, "div", "block-b").childNodes[1], Body: $(null, "div", "list-a").childNodes[1], Footer: $(null, "ul", "arrow1") };
    Settings.PageHead.getElementsByTagName("style")[0].innerHTML +=
    "td.ColorPreview { width: 20px; border: solid 1px #CCCCCC; }";
    document.title = "Bungie Ignore System Settings";
    Settings.Header.innerHTML = "Bungie Ignore System Settings";
    Settings.Body.removeAttribute("class");
    Settings.Body.innerHTML =
    "<table cellpadding=\"0\" style=\"width: 100%;\">" +
        "<tbody>" +
            "<tr>" +
                "<td style=\"width: 50%;\">" +
                    "<fieldset>" +
                        "<legend>Users</legend>" +
                    "</fieldset>" +
                "</td>" +
                "<td style=\"width: 50%;\">" +
                    "<fieldset id=\"FieldsetIgnoreSettings\">" +
                        "<legend>Ignoring</legend>" +
                        "<table cellpadding=\"0\" style=\"width: 100%;\">" +
                            "<tbody>" +
                                "<tr>" +
                                    "<td style=\"width: 40%;\">Ignore Text Color:</td>" +
                                    "<td><input id=\"InputIgnoreTextColor\" type=\"text\" /></td>" +
                                    "<td class=\"ColorPreview\" style=\"background-color: " + GM_getValue("IgnoreTextColor", "#BBBBBB") + ";\"></td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td>Ignore Background Color:</td>" +
                                    "<td><input id=\"InputIgnoreBackgroundColor\" type=\"text\" /></td>" +
                                    "<td class=\"ColorPreview\" style=\"background-color: " + GM_getValue("IgnoreBackgroundColor", "#012A46") + "\"></td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td>Ignore Border Color:</td>" +
                                    "<td><input id=\"InputIgnoreBorderColor\" type=\"text\" /></td>" +
                                    "<td class=\"ColorPreview\" style=\"background-color: " + GM_getValue("IgnoreBorderColor", "#5F6062") + "\"></td>" +
                                "</tr>" +
                            "</tbody>" +
                        "</table>" +
                        "<ul id=\"ctl00_mainContent_postRepeater1_ctl01_ctl00_spam_collapsebar\" class=\"spam_collapse_bar\">" +
                            "<li>This post has been reported for violating the code of conduct. Click arrow to view at your own risk.</li>" +
                            "<li class=\"right\">" +
                                "<a id=\"ctl00_mainContent_postRepeater1_ctl01_ctl00_expandItemLink\" class=\"expanded_arrows_collapsed\">" +
                                    "<img src=\"/images/spacer.gif\" width=\"21px\" height=\"20px\" alt=\"\"/>" +
                                "</a>" +
                            "</li>" +
                        "</ul>" +
                    "</fieldset>" +
                "</td>" +
            "</tr>" +
        "</tbody>" +
    "</table>";
    Settings.Footer.innerHTML +=
    "<li>" +
        "<a href=\"" + Query("previousPage") + "\">Return To Previous Page</a>" +
    "</li>";
}

function IgnoreUsers()
{
    //var Head = $("ctl00_Head1"), Style = document.createElement("style");
    //Style.innerHTML = "a.IgnoreQV : hover { cursor: hand; }";
    //Head.appendChild(Style);
    unsafeWindow.BIS = {};
    for (var I = 1; I <= 25; I++)
    {
        var IString = I.toString();
        IString.length == 1 ? IString = "0" + IString : false;
        if ($("ctl00_mainContent_postRepeater1_ctl" + IString + "_ctl00_postControl_skin_usernameLink"))
        {
            var Post =
            {
                Element: $("ctl00_mainContent_postRepeater1_ctl" + IString + "_ctl00_post_display_container"),
                PosterName: $("ctl00_mainContent_postRepeater1_ctl" + IString + "_ctl00_postControl_skin_usernameLink").innerHTML,
                PosterId: $("ctl00_mainContent_postRepeater1_ctl" + IString + "_ctl00_postControl_skin_usernameLink").search.split("=")[1],
                MoreDivider: $("ctl00_mainContent_postRepeater1_ctl" + IString + "_ctl00_postControl_skin_userDiv")
            };
            
            unsafeWindow.BIS["Post" + IString] = Post;
            
            //Post.MoreNode.innerHTML = Post.MoreNode.innerHTML.replace("more", "<a href=\"\">more</a>");
            Post.MoreDivider.style.height = "173px";
            Post.MoreDivider.childNodes[1].style.height = "65px";
            Post.MoreDivider.childNodes[3].innerHTML +=
            "<li><input " + (GM_getValue("Ignore" + Post.PosterId, false) ? "checked" : "") + " id=\"Ignore" + IString + "\" ignoreuserid=\"" + Post.PosterId + "\" type=\"checkbox\"/><label style=\"position: absolute; margin-top: 3px;\" for=\"Ignore" + IString + "\">Ignore User</label></li>";
            var Checkbox = $("Ignore" + IString);
            Checkbox.addEventListener("change", function()
            {
                GM_setValue("Ignore" + this.getAttribute("ignoreuserid"), this.checked);
                unsafeWindow.BIS["GMVALS" + this.id] = [Post.PosterId, this.checked];
            }, true);
            
            if (!$("ctl00_mainContent_postRepeater1_ctl" + IString + "_ctl00_spam_collapsebar") && GM_getValue("Ignore" + Post.PosterId, false))
            {
                var IgnoreBar = document.createElement("ul");
                IgnoreBar.id = "ctl00_mainContent_postRepeater1_ctl" + IString + "_ctl00_spam_collapsebar";
                IgnoreBar.className = "spam_collapse_bar";
                IgnoreBar.style.backgroundColor = GM_getValue("IgnoreBackgroundColor", "#012A46");
                IgnoreBar.innerHTML =
                "<li style=\"color: #71CAEF;\"><a style=\"cursor: pointer;\" onmouseover=\"forumPostArrowExpander(&quot;ctl00_mainContent_postRepeater1_ctl" + IString + "_ctl00_expandItemLink&quot;, &quot;ctl00_mainContent_postRepeater1_ctl" + IString + "_ctl00_post_display_container&quot;)\" onmouseout=\"forumPostArrowExpander(&quot;ctl00_mainContent_postRepeater1_ctl" + IString + "_ctl00_expandItemLink&quot;, &quot;ctl00_mainContent_postRepeater1_ctl" + IString + "_ctl00_post_display_container&quot;)\">[Quick View]&nbsp;</a></li><li>This user has been ignored, the user is " + Post.PosterName + ", click arrow to view post.</li>" +
                "<li class=\"right\">" +
                    "<a id=\"ctl00_mainContent_postRepeater1_ctl" + IString + "_ctl00_expandItemLink\" class=\"expanded_arrows_collapsed\" href=\"javascript: forumPostArrowExpander(&quot;ctl00_mainContent_postRepeater1_ctl" + IString + "_ctl00_expandItemLink&quot;, &quot;ctl00_mainContent_postRepeater1_ctl" + IString + "_ctl00_post_display_container&quot;);\">" +
                        "<img src=\"/images/spacer.gif\" width=\"21px\" height=\"20px\" alt=\"\"/>" +
                    "</a>" +
                "</li>";
                Post.Element.style.display = "none";
                Post.Element.parentNode.insertBefore(IgnoreBar, Post.Element);
                
                
                
            }
        }
    }
}
