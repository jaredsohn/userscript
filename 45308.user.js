// ==UserScript==
// @name           Bungie Auto Links
// @author         Greg Brown (Sprool) & PKF 647
// @version        1.0
// @namespace      http://www.bungie.net/
// @description    Auto Links Certain Text to Forums On Bungie
// @include        http://*bungie.net/*Forums/posts.aspx*
// @include        http://*bungie.net/*Forums/createpost.aspx*
// @include        http://*bungie.net/settings
// ==/UserScript==

// Author: Sprool
// Youtube Functionality Upgrade: CAVX
// Auto Link Upgrade by PKF 647

var Url = location.toString();
if (Url.match("http://.*bungie.net/Forums/createpost*."))
{
    window.addEventListener("load", CreateButton, true);
}


function $(Flag, Value)
{
    if (Flag == "id") { return document.getElementById(Value); }
    else if (Flag == "tag") { return document.getElementsByTagName(Value); }
}

function getElementByClassName(Class)
{
    var Elets = document.getElementsByTagName("*");
    for (var i = 0; i < Elets.length; i++)
    {
        if (Elets[i].className == Class)
        {
            return Elets[i];
        }
    }
}

function ParseSmileys()
{
    for (var I = 1; I < 25; I++)
    {
        var IString = (I.toString().length == 1) ? "0" + I : I;
        var Post;
        if (Post = document.getElementById("ctl00_mainContent_postRepeater1_ctl" + IString + "_ctl00_postControl_skin_PostBlock") || document.getElementById("ctl00_mainContent_postForm_skin_originalPost_skin_PostBlock"))
        {
			            Post.innerHTML = Post.innerHTML.replace("Halo 3 Forum", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=105242>Halo 3 Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("Halo 3 forum", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=105242>Halo 3 Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("halo 3 forum", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=105242>Halo 3 Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("Halo 2 Forum", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=6>Halo 2 Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("Halo 2 forum", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=6>Halo 2 Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("halo 2 forum", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=6>Halo 2 Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("Classifieds", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=9>Classifieds Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("Classifieds Forum", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=9>Classifieds Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("Classifieds forum", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=9>Classifieds Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("classifieds forum", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=9>Classifieds Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("classifieds", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=9>Classifieds Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("Septagon Forum", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=3>Septagon Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("Septagon forum", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=3>Septagon Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("septagon forum", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=3>Septagon Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("Community Forum", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=3>Community Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("Community forum", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=3>Community Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("community forum", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=3>Community Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("Underground Forum", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=1>Underground Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("Underground forum", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=1>Underground Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("underground forum", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=1>Underground Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("Gallery Forum", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=4>Gallery Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("Gallery forum", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=4>Gallery Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("gallery forum", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=4>Gallery Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("Voting Booth", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=8>Voting Booth Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("Voting booth", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=8>Voting Booth Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("voting booth", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=8>Voting Booth Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("Halo Forum", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=7>Halo CE Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("Halo forum", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=7>Halo CE Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("halo forum", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=7>Halo CE Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("Flood forum", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=10>Flood Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("Flood Forum", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=10>Flood Forum</a>");
			            Post.innerHTML = Post.innerHTML.replace("flood forum", "<a href=http://www.bungie.net/Forums/topics.aspx?forumID=10>Flood Forum</a>");
			        }
			    }
			}

			function ParseBBCode()
			{
			    var LinkList = $("tag", "a");
			    for (var I = 0; I < LinkList.length; I++)
			    {
			        if (LinkList[I].href.indexOf("http:///#") >= 0 && LinkList[I].hash.split("#")[2])
			        {
			            var BBCode =
			            {
			                Id: LinkList[I].hash.split("#")[1],
			                Color: LinkList[I].hash.split("#")[2],
			                Element: LinkList[I],
			                Parent: LinkList[I].parentNode
			            };
			            var Regex =
			            {
			                Opening: new RegExp("<a target=\"_blank\" href=\"http://" + BBCode.Element.hash + "\"></a>", "g"),
			                Closing: new RegExp("<a target=\"_blank\" href=\"http://#" + BBCode.Id + "\"></a>", "g")
			            };
			            var Html = BBCode.Parent.innerHTML.replace(Regex.Opening, "<a></a><span style=\"color: " + BBCode.Color + "; \">");
			            Html = Html.replace(Regex.Closing, "</span>");
			            BBCode.Parent.innerHTML = Html;
			        }
			    }
			    var ImageTypeArray = [".bmp", ".gif", ".jpg", ".png", ".jpeg"];
			    var VideoTypeArray = ["youtube.com/watch", "gamevee.com/viewVideo"];
			    var ImageNo = 0, VideoNo = 0;
			    for (var I = 0; I < LinkList.length; I++)
			    {
			        for (var J = 0; J < ImageTypeArray.length; J++)
			        {
			            if (LinkList[I].href.match(ImageTypeArray[J] + "$"))
			            {
			                var Image = document.createElement("img");
			                Image.id = "BBImage" + ImageNo;
			                ImageNo++;
			                Image.src = LinkList[I].href;
			                Image.setAttribute("onload", "checkimg(this);");
			                LinkList[I].parentNode.insertBefore(Image, LinkList[I].nextSibling);

			                if (document.getElementById("ctl00_forumHeader_forumTitleImage").alt.indexOf("Flood") >= 0)
			                {
			                    Image.style.display = "none";
			                    LinkList[I].setAttribute("onmouseover", "document.getElementById('BBImage" + ImageNo + "').style.display = 'block'");
			                    LinkList[I].setAttribute("onmouseout", "document.getElementById('BBImage" + ImageNo + "').style.display = 'none'");
			                    if (LinkList[I].innerHTML == "")
			                    {
			                        LinkList[I].innerHTML = "[BBImage]"
			                    }
			                }
			                else
			                {
			                    LinkList[I].innerHTML = "";
			                }
			            }
			        }

			        for (var K = 0; K < VideoTypeArray.length; K++)
			        {
			            if (LinkList[I].href.match(VideoTypeArray[K]))
			            {
			                var Video = document.createElement("embed");
			                if (K == 0)
			                {
			                    Video.src = LinkList[I].href.replace("/watch\?v=", "/v/") + "&hl=en&fs=1";
			                    Video.style.width = "425px";
			                }
			                else if (K == 1)
			                {
			                    var VideoId = LinkList[I].pathname.split("/")[5];
			                    Video.src = "http://www.gamevee.com/public/gameveeplayer.swf?video=" + VideoId + "&embed=on";
			                    Video.style.width = "390px";
			                    Video.style.height = "340px";
			                }
			                Video.id = "BBVideo" + VideoNo;
			                VideoNo++;
			                Video.style.height = "344px";
			                LinkList[I].parentNode.insertBefore(Video, LinkList[I].nextSibling);
			                LinkList[I].innerHTML = "";
			            }
			        }
			    }
			}

			function checkimg(obj)
			{
			    if (obj.width > 560)
			    {
			        obj.style.width = "80%";
			        obj.style.height = "80%";
			    }
			}

			function CreateButton()
			{
			    var Script = document.createElement("script");
			    Script.innerHTML = WinPrompt;
			    document.getElementById("ctl00_Head1").appendChild(Script);
			    var bbButton = document.createElement("input");
			    bbButton.id = "bbButton";
			    bbButton.type = "button";
			    bbButton.value = "BBCode";
			    bbButton.setAttribute("onclick", "WinPrompt();");
			    document.getElementById("googlebutton").parentNode.insertBefore(bbButton, document.getElementById("googlebutton").nextSibling);
			}

			function Addscript()
			{
			    var Script = document.createElement("script");
			    Script.innerHTML = checkimg;
			    document.getElementById("ctl00_Head1").appendChild(Script);
			}

			function WinPrompt()
			{
			    var date = new Date();
			    var uid = getCookie("BungieDisplayName").substring(0, 1) + date.getMilliseconds() + date.getSeconds();
			    search = window.prompt('BBCode - What Color?','');
			    if(search!='')
			    {url=encodeURIComponent(search);
			    url=url.replace('%20','+');
			    var textbox=document.getElementById('ctl00_mainContent_postForm_skin_body');
			    var startPos = textbox.selectionStart;
			    var endPos = textbox.selectionEnd;
			    inserttext= "[url=http://#" + uid + "#" + search + "][/url]TEXT[url=http://#" + uid + "][/url]";
			    textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length);
			    document.getElementById('ctl00_mainContent_postForm_skin_body').focus();
			    caretPos=startPos+inserttext.length; textbox.setSelectionRange(caretPos, caretPos);}
			}

			Addscript();
			ParseSmileys();
			ParseBBCode();
