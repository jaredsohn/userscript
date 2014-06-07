// ==UserScript==
// @name           Better Facemouth
// @namespace      Splith
// @original       Dominic Burnard
// @version        0.51
// @description    Makes Facemouth work better.
// @include        http://www.facemouth.co.uk/*
// @include        http://facemouth.co.uk/*
// ==/UserScript==

//Get jQuery from FM
var $ = unsafeWindow.jQuery;

//Add some prototypes
String.prototype.startsWith = function(t, i) { if (i==false) { return
(t == this.substring(0, t.length)); } else { return (t.toLowerCase()
== this.substring(0, t.length).toLowerCase()); } }

//Globals
var PostsInThread = 0; //For feedback

function addGlobalStyle(css)
{
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function SetupExistingThreadTextBoxLimit()
{
	$("textarea[name=reply-content]").attr("style", "width:99%;");
}

function SetupNewThreadTextBoxLimits()
{
	$("textarea[name=post_content]").attr("style", "width:99%;");
	$("input[name=topic_subject]").attr("style", "width:99%;");
}

/*var SetupInPagePostLoading = function() {
    var items = $("div[class=frmPaging]");
    if (items.length == 0) {
        // No need to do anything as there is no paging
    } else {
        // Remap the paging controls to load the data into the page as requested.
               
    }
}*/

var FindLargeVersion = function(smallImageUrl)
{
	return smallImageUrl.substr(smallImageUrl.indexOf('image=')+6);
}

var FindImgWidth = function(smallImageUrl)
{
	smallImageUrl = smallImageUrl.substr(smallImageUrl.indexOf('width=')+6);
	smallImageUrl = smallImageUrl.substr(0, smallImageUrl.indexOf('&'));

	if (!(smallImageUrl > 0 && smallImageUrl < 640))
	{
		return 0;
	}
	else
	{
		return smallImageUrl;
	}
}

var CreateImageTooltip = function(imageUrl)
{
    var tooltip = document.createElement("div");
    var image = document.createElement("img");
    image.setAttribute("src", imageUrl);
    tooltip.appendChild(image);
    return tooltip;
}

var SetupThumbnailHoverShowsFullImage = function()
{
//    $("img[src^=image.php]").each(function()
    $("img").each(function()
    {
        //Fix for using page's jQuery version
        if (this.src.indexOf('image.php') >= 0)
        {
            var link = this;
            var tooltip = CreateImageTooltip(FindLargeVersion(link.getAttribute("src")));
            tooltip.style.display = 'none';
            tooltip.style.position = 'fixed';
            tooltip.style.top = '0px';
            tooltip.style.right = '0px';
        	tooltip.style.maxWidth = (document.body.clientWidth/2) + 'px';
            document.body.appendChild(tooltip);    
            link.addEventListener('mouseover', function(e)
	        {
                //show the tip
                tooltip.style.display = 'block';
                tooltip.className = "Popup" + (e.pageX>document.body.clientWidth/2 ? 'Left' : 'Right');
            }, false);
            link.addEventListener('mouseout', function() {
                //hide the tip    
                tooltip.style.display = 'none';   
            }, false);
        }
	//Replace small thumbnail with actual large image but with normal width set -- Version 0.4 REMOVED
//	this.style.width= + FindImgWidth(this.src) + 'px';
//	this.src = FindLargeVersion(link.getAttribute("src"));
    });
}

addGlobalStyle('' +
	'.PopupLeft { left:2px !important; top:2px; z-index: 1000; }'+
	'.PopupRight { right:2px !important; top:2px; z-index: 1000;  }' );

function RemoveNaviLinks()
{
	//Remove help and v3 info
	$("li").each(function()
	{
		if (this.innerHTML.indexOf("V3 Info") > 0 || this.innerHTML.indexOf("HELP") > 0)
		{
			this.style.display = 'none';
		}
	});
} 

/*var RemImgs = function()
{
	$("img[src^=image.php]").each(function()
	{
//this.style.display = 'none';
	});
}*/

function ReplaceLogo()
{
	$("img[id=logo]").each(function()
	{
		this.src = 'http://www.facemouth.co.uk/images/logo/logoODL.png';
	});
}

function RemoveYT()
{
//	$("iframe[src^=youtube.com]").each(function()
	$("iframe").each(function()
	{
		if (this.src.indexOf('youtube') > 0)
		{
			//YT embed!
//			this.src="about:blank";
			this.style.display="none";
            this.parentNode.innerHTML = this.parentNode.innerHTML.replace(/<iframe.*src="(.*)?".*<\/iframe>/gim, '[<a href="$1" target="_blank">Youtube Video</a>]');
		}
	});
}

function NewMessages()
{
	$("div[class=userbar]").each(function()
	{
		if (this.innerHTML.indexOf('New Message') > 0)
		{
			//Message(s) present
			var NumMsgs = this.innerHTML.substr(this.innerHTML.indexOf('messages.php'), 30);
			NumMsgs = NumMsgs.substring(NumMsgs.indexOf('>')+1, NumMsgs.indexOf(' '));
			$("li").each(function()
			{
				if (this.innerHTML.indexOf('MESSAGES') > 0)
				{
					this.innerHTML = this.innerHTML.substr(0, this.innerHTML.indexOf('>')) + ' style="colour:#ff2211;">' + NumMsgs + ' ' + (NumMsgs == 1 ? this.innerHTML.substr(this.innerHTML.indexOf('.php">')+6).replace('GES', 'GE') : this.innerHTML.substr(this.innerHTML.indexOf('.php">')+6));
					this.childNodes[0].style.color="#CC4477";
				}
		});
	}
	});
}

//All pages
//No longer needed!
//NewMessages(); //Highlight new messages
ReplaceLogo(); //Replace logo
RemoveNaviLinks(); //Remove 'help' and 'V3 info'
SetupThumbnailHoverShowsFullImage(); //Change pictures

//Thread pages
if (window.location.href.startsWith("http://www.facemouth.co.uk/topic.php") || window.location.href.startsWith("http://facemouth.co.uk/topic.php"))
{
//OPTIONAL:
//	RemoveYT(); //Replace YT videos with links
//No longer needed!
//	SetupExistingThreadTextBoxLimit(); //Enlarge input boxes
	DoUDSetup(); //Setup up/down feedback arrows!
}

if (window.location.href.startsWith("http://www.facemouth.co.uk/create_topic.php") || window.location.href.startsWith("http://facemouth.co.uk/create_topic.php"))
{
//No longer needed!
//	SetupNewThreadTextBoxLimits(); //Enlarge input boxes
}

//add comments to profiles (custom/disqus?)
//disable imgs (opt)
//disable caps (opt)
//add option dialogue (disable YT/imgs/caps/canvas/rainbow/swear/comments)
//message pending rainbow? (remove canvas… effort)
//swear filter?

//TAKEN FROM:http://www.webdeveloper.com/forum/showthread.php?228500-Can-I-clear-ALL-Timers-in-JS-w-out-TImerID-s
window.onload = function()
{
	clearAllTimeouts();
//	var auto_refresh = setInterval(function(){$('#main').load('indexcontent.php?id=', function() { Cufon.refresh(); });}, 10000);
};

//TAKEN FROM: http://www.webdeveloper.com/forum/showthread.php?228500-Can-I-clear-ALL-Timers-in-JS-w-out-TImerID-s
function clearAllTimeouts()
{
	var mx = setTimeout("i=0;",100);
	for(var i=0;i<=mx;i++)
	{
		clearTimeout(i);
	}
}
    
    //Function to add up/down feedback arrows to topics
    function DoUDSetup()
    {
        var SkipOne = false;
        $("a[href^=#pst]").each(function()
    	{
            if (SkipOne == false)
            {
                //Skip next one
                SkipOne = true;
    
                //Create A holders for links
                var NewA1 = document.createElement("a");
                var NewA2 = document.createElement("a");
                
                //Create A holder for vote data
                var NewA3 = document.createElement("a");
    
                //Create image holders
                var NewImg1 = document.createElement("img");
                var NewImg2 = document.createElement("img");
    
                //Setup image 1
                NewImg1.className = "right-align";
                NewImg1.style = "margin: 1px 1px 1px 1px;";
                NewImg1.src = "http://i.imgur.com/6dm5nwF.png";
                NewImg1.alt = "UpVote!";
                NewImg1.title = "UpVote!";
    
                //And image 2
                NewImg2.className = "right-align";
                NewImg2.style = "margin: 1px 1px 1px 1px;";
                NewImg2.src = "http://i.imgur.com/npWNxNh.png";
                NewImg2.alt = "DownVote!";
                NewImg2.title = "DownVote!";
    
                //Setup link/a 1
                NewA1.id = "VoteU_" + parseInt(this.href.substr(this.href.indexOf('pst')+3));
                NewA1.href = "javascript:void(0);";
                NewA1.addEventListener("click", DoUDVote);
                NewA1.appendChild(NewImg1);
    
                //And link/a 1
                NewA2.addEventListener("click", DoUDVote);
                NewA2.id = "VoteD_" + parseInt(this.href.substr(this.href.indexOf('pst')+3));
                NewA2.href = "javascript:void(0);";
                NewA2.appendChild(NewImg2);
                
                //Setup placeholder for vote data
                NewA3.id = "VoteS_" + parseInt(this.href.substr(this.href.indexOf('pst')+3));
                NewA3.innerHTML = "+0/-0";
                
                NewA3.className = "right-align";
                NewA3.style = "margin: 1px 1px 1px 1px;";
    
                //Append objects to the page
                this.parentNode.appendChild(NewA2);
                this.parentNode.appendChild(NewA3);
                this.parentNode.appendChild(NewA1);
                
                this.style.display='none';
                
                //Increase number of visible posts
                PostsInThread = PostsInThread+1;
            }
            else
            {
                //Set to this this one to set to run next time
                SkipOne = false;
                this.style.display='none';
            }
    	});
    	GetUDVotes();
    }

	function DoUDVote()
	{
	   //Check user is logged in...
	   if (!($(".userbar").html().toLowerCase().indexOf('sign in') > 0) && $(".userbar").children().children().text().toLowerCase().replace(/ /gi, '').length > 0 && $(".userbar").children().children().text().toLowerCase().replace(/ /gi, '').length < 30)
	   {
    	    //Logged in!
    	    var UserID = $(".userbar").children().children().text().toLowerCase().replace(/ /gi, '');
            var Vote;
            if (this.id.substr(0, 6) == 'VoteU_')
            {
                Vote = 1;
            }
            else
            {
                Vote = 0;
            }
            var PID = this.id.substr(6);
	   
            //Get thread ID from URL here
            var ThreadID = window.location.search.substring(1);
            ThreadID = ThreadID.substr(ThreadID.indexOf('id=')+3);
            if (ThreadID.indexOf('&') > 0)
            {
                ThreadID = ThreadID.substr(0, ThreadID.indexOf('&'));
            }
            ThreadID = parseInt(ThreadID);
            
            //Submit the vote
            GM_xmlhttpRequest({
            method: "GET",
            url: ('http://controlrods.failparty.co.uk/FMRATINGS.php?act=1&id=' + ThreadID + '&pst=' + UserID + '&rtg=' + Vote + '&pid=' + PID),
            onload: function(response)
            {
                //Refresh view
                GetUDVotes();
            }
            });
    	}
    	else
    	{
	        //Not logged in
            alert('Please login if you wish to add post feedback.');
        }
	}
	
	function DoneUDVote()
	{
    	//When the vote has been submitted, disable links and update results
	}
		
	function GetUDVotes()
	{
        //Get the votes and update the page
        var ThreadID = window.location.search.substring(1);
        ThreadID = ThreadID.substr(ThreadID.indexOf('id=')+3);
        if (ThreadID.indexOf('&') > 0)
        {
            ThreadID = ThreadID.substr(0, ThreadID.indexOf('&'));
        }
        ThreadID = parseInt(ThreadID);
        GM_xmlhttpRequest({
        method: "GET",
        url: ('http://controlrods.failparty.co.uk/FMRATINGS.php?act=2&id=' + ThreadID),
        onload: function(response)
        {
            //Parse each line of received data!
            ResetVoteTest();
            var RecDat = response.responseText.split("\r\n");
            var i = 0;
            while (i < RecDat.length)
            {
                if (RecDat[i].length > 6 && RecDat[i].length < 15)
                {
                    //  :#_PID_:_VOTE_:_COUNT_
                    var ThisRec = RecDat[i].replace(':#', '').split(':');
                    if (ThisRec[1] == 1)
                    {
                        //Dealing with upvotes
                        $(('#VoteS_' + ThisRec[0])).html(('+' + ThisRec[2] + '/' + $(('#VoteS_' + ThisRec[0])).html().split('/')[1]));
                    }
                    else
                    {
                        //Dealing with downvotes
                        $(('#VoteS_' + ThisRec[0])).html(($(('#VoteS_' + ThisRec[0])).html().split('/')[0] + '/' + '-' + ThisRec[2]));
                    }
                }
                ++i;
            }
        }
        });
	}
	
	function ResetVoteTest()
	{
    	//Resets all vote text to default
	    var i = 0;
        while (i < PostsInThread)
	    {
    	    $(('#VoteS_' + i)).html('+0/-0');
        	++i;
    	}
	}

//var auto_refresh = setInterval(function(){$('#main').load('indexcontent.php?id=', function() { Cufon.refresh(); });}, 1000);

//    var XXXX = document.createElement("script");
//    XXXX.setAttribute("src", 'https://trickstoo-rainbow-links.googlecode.com/svn/rainbow-links.js');
//        document.body.appendChild(XXXX);    