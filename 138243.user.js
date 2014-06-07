// ==UserScript==
// @name   		pinchi hide
// @namespace  	meh
// @description	Adaptado para Pe-Chan.org por Alix y copiado para el chan temporal en:   no.uphero.com
// @include		*no.uphero.com*
// ==/UserScript==
// ==Authors==
//		Wriggle !!wvZ72pdJVA
//		TheGent
//==License==
//	The "Do Whatever the Fuck You Want License"
//		You are free to redistribute, edit, and otherwise mutilate this file to your hearts content
//		In doing so, you agree to keep the original authors listed in this file as they are.

try {
	var test = unsafeWindow;
} catch (e) {
	unsafeWindow = window;
};

// Add jQuery
(function () {
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js';
	script.addEventListener('load', function () {
		var script = document.createElement("script");
		script.textContent = "(" + jQueryLoaded + ")();";
		head.appendChild(script);
	}, false);

	head.appendChild(script);
})();

// All site code must be inside this function
function jQueryLoaded() {
	/*
		Initializes the script
		Checks for what sort of page the user is on, reacts accordingly
	*/
	init = function () {
		//Begin with checking for OP posts
		var threadOPs = $('div.op');
		if (threadOPs.length > 0) {
			preparePage();
		} else {
			//Exit Script, they're not on a board index or in a thread.
			return false;
		};
	};

	preparePage = function () {
	    //Get board name
		var currentBoardID = $('h1').text().replace(/^\/(.+)\/.+/, "$1");
		
		//Get all Posts
	    var posts = $('div.post');
	    var isIndex = $('div.post:first').parentsUntil('form').filter('div:not(.post)')[0];
	    var postsHide = posts;
		if(!isIndex){
			postsHide = posts.filter(':gt(0)');
	    };
var hideLink = postsHide.children('p.intro').prepend('<a class="hide" href=""><img src= "http://noko.zzn.com/WEB/1282143/hide.jpeg"></a><a> </a>').children('a.hide');
		//Bind the links' click events
		hideLink.bind('click', function () {
			var post = $(this).parent().parent();
			if (post.hasClass('op')) {
				var rawID = post
						.parent()
						.attr('id');
						
	           	hideThread( stripForID(rawID), currentBoardID );
			} else {
				var rawID = post.attr('id');
				hideReply( stripForID(rawID), currentBoardID );
			};
			return false;
		});
		
		
		
		
	    //Check to see if there's posts to hide, other database maintenance
var hideList=getHideList()[currentBoardID];
		var flush_len=0;
		var now=new Date();
		for(postID in hideList){
			var expDate=hideList[postID]['expDate'];
			if(expDate>now.getTime()){
				hidePost(postID, currentBoardID);
				flush_len++;
			} else {
				delFromHideList(postID, currentBoardID);
			};
		};

		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	    // Code for the Filter configuration box
	    var ConfigBox = "<div class='ConfigBox' style ='border: 1px solid; position: absolute; top: 100px; right:0px'>";

	    // All boxes are hidden
	    ConfigBox += "<div id='tab0' class='config_section'>";
	    ConfigBox += "</div>";

	    // The filter
	    ConfigBox += "<div id='tab1' class='config_section'>"; // style='background:#EEF2FF'>";
	    ConfigBox += "<center><span class='heading'>Filtro de Contenidos</span>";
	    ConfigBox += "<em>* Llena al menos un campo, evita el butthurt *<br>*Para fines prácticos utiliza Nombre o Tripcode*<br>El HIDE a OP debe ser Manual...</em></center>";
	    ConfigBox += "<table border='0'>";
	    ConfigBox += /*"<form>*/"<tr><td>Nombre:    </td><td><input class='filter' id='NameFilter' rows='1' cols='10'/></td></tr>";
	    ConfigBox += "<tr><td width=\"auto\">Trip:    </td><td><input class='filter' id='TripFilter' rows='1' cols='10'/></td></tr>";
	    ConfigBox += "<tr><td width=\"auto\">Email:   </td><td><input class='filter' id='EmailFilter' rows='1' cols='10'/></td></tr>";
	    ConfigBox += "<tr><td width=\"auto\">Tema: </td><td><input class='filter' id='SubjectFilter' rows='1' cols='10'/></td></tr>";
	    ConfigBox += "<tr><td width=\"auto\">Comentario: </td><td><input class='filter' id='CommentFilter' rows='1' cols='10'/></td></tr>";
	    ConfigBox += "<tr><td width=\"auto\">Apodo:</td><td><input class='filter' id='ForcedName' rows='1' cols='10'/></td></tr>"; /*</form>"; */
	    ConfigBox += "</table>";
	    ConfigBox += "<center><a class='filter' href=''>Aplicar Filtro</a> </center>";
	    ConfigBox += "</div>";

	    // Another config tab
	    ConfigBox += "<div id='tab2' class='config_section'>";
	    ConfigBox += '<a class="flush" href=""><center>[Aplicar]</center></a> <br><i>(Le quita el HIDE a todo)<br>Click en ¡NPN! para cerrar<br> esta ventana...</i>';
	    ConfigBox += "</div>";

	    // Another config tab
	    ConfigBox += "<div id='tab3' class='config_section'>";
	    ConfigBox += "<marquee>¡NPN! = ¡No puto, no! Cierra esta ventana y también la de filtros y flush...</marquee>";
	    ConfigBox += "</div>";
	    ConfigBox += "</div>";

	    // Links to the tabs themselves
	    ConfigBox += "<ul class='tabs' style='float: left;list-style: none; padding: 10px; position: absolute;top: 0px; right:0px'>";
	    ConfigBox += "<li><a href='#tab0'>¡NPN!</a></li>";
	    ConfigBox += "<li><a href='#tab1'>Filtros</a></li>";
	    ConfigBox += "<li><a href='#tab2'>Flush</a></li>";
	    ConfigBox += "<li><a href='#tab3'>?</a></li>";
	    ConfigBox += "</ul>";


	    $("ul.tabs.li").css("float", "left");
	    $('ul.tabs.li').css('list-style', 'none');
	    $('ul.tabs.li').css('position', 'relative');
	    $('ul.tabs.li').css('padding', '9px');
	    $('config_section').css('padding', '10px');
	    $('config_section').css('font-size', '1.2em');


	    $('body')
                .prepend(ConfigBox)
                .children('div.ConfigBox')
                .find('a.filter')
                .bind('click',
                function () {
                    // Get data
                    var NameFilter = $("#NameFilter").val();
                    var TripFilter = $("#TripFilter").val();
                    var EmailFilter = $("#EmailFilter").val();
                    var SubjectFilter = $("#SubjectFilter").val();
                    var CommentFilter = $("#CommentFilter").val();
                    var ForcedName = $("#ForcedName").val();

                    // Make it a JSON
                    var FilterData = {
                        'name': NameFilter,
                        'trip': TripFilter,
                        'subject': SubjectFilter,
                        'email': EmailFilter,
                        'comment': CommentFilter,
                        'forcedname': ForcedName
                    };

                    // store it
                    localStorage.setItem("FilterData", JSON.stringify(FilterData));
                });

	    //On Click Event
	    $("ul.tabs li").click(function () {

	        $("ul.tabs li").removeClass("active"); //Remove any "active" class
	        $(this).addClass("active"); //Add "active" class to selected tab
	        $(".config_section").hide(); //Hide all tab content

	        var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
	        $(activeTab).fadeIn(); //Fade in the active ID content
	        return false;
	    });

	    //hide all initially
	    $(".config_section").hide(); //Hide all content
	    $("ul.tabs li:first").addClass("active").show(); //Activate first tab
	    $(".config_section:first").show(); //Show first tab content

	    // bind to flush button
	    $('body').children('div.ConfigBox')
				.find('a.flush')
				.bind('click', function () {
				    localStorage.removeItem('hiddenPosts');
				    localStorage.removeItem('FilterData');
				    $('.unhide').click();
				    return false;
				});

	    // Set the stored filters into the text boxes
	    var CompleteFilterList = $.parseJSON(localStorage.getItem("FilterData"));
	    if (CompleteFilterList) {
	        $("#NameFilter").val(CompleteFilterList.name);
	        $("#TripFilter").val(CompleteFilterList.trip);
	        $("#EmailFilter").val(CompleteFilterList.email);
	        $("#SubjectFilter").val(CompleteFilterList.subject);
	        $("#CommentFilter").val(CompleteFilterList.comment);
	        $("#ForcedName").val(CompleteFilterList.forcedname);
	    }

	    // Disable Comment and Email fields because NOT_YET_IMPLEMENTED
	    $("#EmailFilter").attr('disabled', 'yes');
	    $("#CommentFilter").attr('disabled', 'yes');

	    filterByContent();

	};
	
	isThread = function (id) {
		var post = $('#thread_' + id);
		if (post[0]) {
			return true;
		} else {
			return false;
		}
	};

	stripForID = function (string) {
	    try { var ret = string.match(/(\d+)/)[1]; }
	    catch (e) { return false; }
	    //alert(ret);
	    return ret;
	};

	hidePost = function (id) {
		if (isThread(id)) {
			hideThread(id);
		} else {
			hideReply(id);
		};
	};

    getHideList = function (boardID) {
        var list = localStorage.getItem("hiddenPosts");
        if (list) {
            return $.parseJSON(list);
        } else {
            return {};
        };
    };

    addToHideList = function (postID, boardID) {
        //Set up data
        var postID = postID.toString(),
			    hideList = getHideList(),
			    expDate = new Date();
        expDate = expDate.setDate(expDate.getDate() + 30).toString();
        //Fill in Post data
        if (!hideList[boardID]) {
            hideList[boardID] = {};
        };
        hideList[boardID][postID] = {
            'expDate': expDate
        };
        //Set item into localStorage
        localStorage.setItem("hiddenPosts", JSON.stringify(hideList));
    };


    delFromHideList = function (postID, boardID) {
        //Get List
        hideList = getHideList();
        //Remove entry
        delete hideList[boardID][postID];
        //Save List
        localStorage.setItem("hiddenPosts", JSON.stringify(hideList));
	};
	
	hidePost = function (id, boardID) {
		if (isThread(id)) {
			hideThread(id, boardID);
		} else {
			hideReply(id, boardID);
		};
	};

	hideThread = function (id, boardID) {
		//Find Post (and picture, and posts) by id
		var post = $('#thread_' + id);
		//Check if it actually exists
		if (post[0]) {
			//Hide thread content
			post
				.children(':not(hr)')
				.hide();
			//Replace with "Thread Hidden [Unhide]"
			post
				.prepend('<div class="placeholder"><p><a class="unhide" href=""><img src= "http://noko.zzn.com/WEB/1282143/unhide.jpeg"></a></p></div>')
					.find('a.unhide')
					.bind('click', function () {
						var rawID = $(this).parent().parent().parent().attr('id');
						var id = stripForID(rawID);
						showThread(id, boardID);
						return false;
					});
			//Save change
			addToHideList(id, boardID);
        };
    };

	showThread = function (id, boardID) {
		//Find Hidden thread by id
		var post = $('#thread_' + id);
		//Check if it actually exists
		if (post[0]) {
			//Remove placeholder
			post.children('.placeholder').remove();
			//Show thread content
			post.children().show();
			//Save change
			delFromHideList(id, boardID);
		};
	};

	hideReply = function (id, boardID) {
		//Find Reply by id
		var post = $('#reply_' + id);
		//Check that it actually exists
		if (post[0]) {
			//Hide reply content
			post.children().hide();
			//Replace with "Post Hidden [Unhide]"
			post
				.prepend('<div class="placeholder"><p><a class="unhide" href=""><img src= "http://noko.zzn.com/WEB/1282143/unhide.jpeg"></a></p></div>')
					.find('a.unhide')
					.bind('click', function () {
						var rawID = $(this).parent().parent().parent().attr('id');
						var id = stripForID(rawID);
						showReply(id, boardID);
						return false;
					});
			//Save change
			addToHideList(id, boardID);
		};
	};

	showReply = function (id, boardID) {
		//Find Hidden Reply
		var post = $('#reply_' + id);
		//Check that it actually exists
		if (post[0]) {
			//Remove placeholder
			post.children('.placeholder').remove();
			//Show reply content
			post.children().show()
			//Save change
			delFromHideList(id);
		};
	};

	hideImageByPostID = function (id) {
		//Find Post by id, get it's picture

		//Hide Picture

		//Replace with "Image Hidden [Unhide]"
	};

	showImageByPostID = function (id) {
		//Find Post by id, find it's picture

		//Remove placeholder

		//Show Picture
	};

	filterByContent = function () {
	    var CompleteFilterList = $.parseJSON(localStorage.getItem("FilterData"));
	    var NameList, TripList, EmailList, SubjectList, CommentList, ForcedName;
	    if ((CompleteFilterList == 'null') || (CompleteFilterList == null)) return 0;
	    if (CompleteFilterList.name != "") NameList = CompleteFilterList.name.split(';');
	    if (CompleteFilterList.trip != "") TripList = CompleteFilterList.trip.split(';');
	    if (CompleteFilterList.email != "") EmailList = CompleteFilterList.email.split(';');
	    if (CompleteFilterList.subject != "") SubjectList = CompleteFilterList.subject.split(';');
	    if (CompleteFilterList.comment != "") CommentList = CompleteFilterList.comment.split(';');
	    if (CompleteFilterList.forcedname != "") ForcedName = CompleteFilterList.forcedname;

	    if (CompleteFilterList.name != "") filterSubroutine('name', NameList);
	    if (CompleteFilterList.subject != "") filterSubroutine('subject', SubjectList);

	    if (TripList[0] == "!") // filter all tripfriends
	    {
	        AllPost = $('div.post').find('span.' + 'trip');

	        AllPost.each(function (index) {
	            hidePost(stripForID($(this).parent().parent().parent().attr('id')));
	        });
	    }

	    if (CompleteFilterList.trip != "") filterSubroutine('trip', TripList);

	    if (CompleteFilterList.forcedname != '') {
	        $('div.post').find('span.trip').each(function (index) { $(this).text("") });
	        $('div.post').find('span.name').each(function (index) { $(this).text(ForcedName) });
	    }

	    // Find matching emails
	    if (CompleteFilterList.email != "") for (var i = 0; i < EmailList.length; i++) {
	    }

	    // find matching comments
	    if (CompleteFilterList.comment != "") for (var i = 0; i < CommentList.length; i++) {
	        ; //alert(CommentList[i] + "\n" + CommentList.length);
	    }
	}

	filterSubroutine = function (tag, TargetArray) {
	    for (var i = 0; i < TargetArray.length; i++) {
	        AllPost = $('div.post').find('span.' + tag);

	        AllPost.each(function (index) {
	            if ($(this).text() == TargetArray[i]) {
	                if (!$(this).parent().parent().attr('id')) { // we are dealing with a post with an email field
                        hidePost(stripForID($(this).parent().parent().parent().attr('id')));
	                }
                    else {
                        hidePost(stripForID($(this).parent().parent().parent().attr('id')));
	                }
	            }
	        }); // close AllPost.each()
	    }
	}

	init();
};