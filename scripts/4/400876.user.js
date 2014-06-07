// ==UserScript==
// @name        Manga Subscriber 
// @namespace   Manga Subscriber 
// @description Allows manga subscription and shows subscribed updates in home page
// @include     http://www.mangareader.net/*
// @grant 	none
// @version     1
// ==/UserScript==


/* Initialize home page of a manga */
function initMangaPage() 
{
	/* Get the division of manga properties */
	var properties = document.getElementById("mangaproperties");
	
	/* If the element "mangaproperties" cannot be found. The user is not on a manga page */
	if (null == properties) {
		return;
	}

	/* Title of the manga */
	var title = properties.getElementsByTagName("h1")[0];

	/* Create subscribe/unsubscribe button */
	var button = document.createElement("button");
	button.type = "button";

	if (isSubscribedManga(title.innerHTML.replace(" Manga", ""))) {
		/* Unsubscribe to manga */
		button.innerHTML = "UNSUBSCRIBE";
		button.addEventListener("click", function() 
			{ 
				unsubscribeManga(title.innerHTML.replace(" Manga", ""));
			}	
			, false);
	}
	else {
		/* Subscribe to manga */
		button.innerHTML = "SUBSCRIBE";	
		button.addEventListener("click", function() 
			{
				subscribeManga(title.innerHTML.replace(" Manga", ""));
			}
			, false);
	}

	button.style.fontSize = "xx-large";
	properties.insertBefore(button, title);

	/* Unsubscribe to the manga */
	function unsubscribeManga(manga)
	{
        /* Fetch array of subscribed mangas */
        var subscribedMangas = JSON.parse(localStorage.getItem("subscribedMangas"));

        /* Remove current manga from array */
        subscribedMangas.splice(subscribedMangas.indexOf(manga), 1);

        /* Put the new array of subscribed mangas into local storage */
        localStorage.setItem("subscribedMangas", JSON.stringify(subscribedMangas));
	    location.reload();
	}
	
	/* Subscribe to the manga */
	function subscribeManga(manga)
	{
		/* Fetch array of subscribed mangas */
		var subscribedMangas = JSON.parse(localStorage.getItem("subscribedMangas"));

		/* If no subscriptions exist, create new array */
		if (null == subscribedMangas) {
			subscribedMangas = new Array();
		}

		/* Add new manga to the list of subscriptions */
		subscribedMangas.push(manga);

		/* Set the new array of subscribed mangas into local storage */
		localStorage.setItem("subscribedMangas", JSON.stringify(subscribedMangas));
		location.reload();
	}
	
	/* Check if manga is subscribed */
	function isSubscribedManga(manga)
	{
		/* Fetch array of subscribed mangas */
		var subscribedMangas = JSON.parse(localStorage.getItem("subscribedMangas"));

		/* No subscriptions */
		if (null == subscribedMangas) {
			return false
		}

		/* Determine whether current manga is in the array object */
		if (-1 == subscribedMangas.indexOf(manga)) {
			return false;
		}
		else {
			return true;
		}
	}

    /* Cross out manga chapters that have already been read */
    var list = document.getElementById("listing");
    var chapters = list.getElementsByTagName("tr");
    var chaptersRead = JSON.parse(localStorage.getItem(title.innerHTML.replace(" Manga", "")));
    for (var i = 0; i < chaptersRead.length; i++) {
        var originalText = chapters[parseInt(chaptersRead[i])].children[0].innerHTML;
        chapters[parseInt(chaptersRead[i])].children[0].innerHTML = "<del>" + originalText + "</del>";
    }
    
    /* Cross out manga chapters in the latest chapters section */
    list = document.getElementById("latestchapters");
    chapters = list.getElementsByTagName("li");
    for (var i = 0; i < chapters.length; i++) {
        var chapterNum = chapters[i].getElementsByTagName("a")[0].innerHTML.replace(title.innerHTML.replace(" Manga", "") + " ", "");
        if (chaptersRead.indexOf(chapterNum) > -1) {
            chapters[i].innerHTML = "<del>" + chapters[i].innerHTML + "</del>";
        }
    }
}

/* Mark manga chapter as read */
function markChapterRead()
{
	/* Get the division which holds all the lastest updates */
    var mangaChapter = document.getElementById("mangainfo");

	/* If the element cannot be found, the current page is not a chapter */
	if (null == mangaChapter) {
		return;
	}

	/* Get the full name of the chapter (name + number) */	
	mangaChapter = mangaChapter.getElementsByTagName("div")[0].getElementsByTagName("h1")[0];
	mangaChapter = mangaChapter.innerHTML;

	/* Separate into chapter name and chapter number */
	var mangaName = mangaChapter.substring(0, mangaChapter.lastIndexOf(" "));
	var chapterNumber = mangaChapter.substring(mangaChapter.lastIndexOf(" ") + 1, mangaChapter.length);

    /* Fetch array of read chapters */
    var chaptersRead = JSON.parse(localStorage.getItem(mangaName));

	/* If no chapters have been read, create new array */
    if (null == chaptersRead) {
     	chaptersRead = new Array();
    }

	/* Mark chapter as read unless it's already done so */
	if (-1 == chaptersRead.indexOf(chapterNumber)) {
	    /* Add new chapter to the list of read chapters */
       	chaptersRead.push(chapterNumber);
        	
		/* Set the new array of read chapters for this manga into local storage */
        localStorage.setItem(mangaName, JSON.stringify(chaptersRead));
	}
}

/* Initialize the home page of manga reader */
function initHomePage()
{
	/* Get the division which holds all the lastest updates */
	var updates = document.getElementById("latestchapters");

	/* Check that the division exists. If not, most likely current page is not the 
	 * home page so return.
	 */
	if (null == updates) {
		return;
	}

	/* First child node of all updates (used as a position reference for other headers) */
	var firstHeader = updates.getElementsByTagName("h3")[0];
	
	/* Create new header that will contain recent updates of manga subscriptions */
	var subscribedUpdates = document.createElement("h3");
	subscribedUpdates.innerHTML = "Subscribed Updates";
    var table = document.createElement("table");
    table.className += " updates";

	/* Show subscribed updates at top of the page */
    updates.insertBefore(table, firstHeader);
	updates.insertBefore(subscribedUpdates, table);
 
    /* Declarations */
    var parser = new DOMParser();
    var subscribedMangas = JSON.parse(localStorage.getItem("subscribedMangas"));
    var xmlhttp;
    var latestUpdates;
    var chapters;   
 
    if (window.XMLHttpRequest) {
        /* For IE7+, Firefox, Chrome, Opera, Safari */
        xmlhttp=new XMLHttpRequest();
    } else { 
        /* For code for IE6, IE5 */
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    /* HTTP request to mangareader.net/latest for a list of latest mangas and display subscribed updates */
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status==200) {
            
            /* Get list of chapters */
            latestUpdates = parser.parseFromString(xmlhttp.responseText, "text/html");
            chapters = latestUpdates.getElementsByClassName("updates")[0].getElementsByTagName("tr");
            var originalTable = table.innerHTML;    
 
            /* Display subscribed and updated chapters */
            for (var i = 0; i < chapters.length; i++) {
                if (-1 != subscribedMangas.indexOf(chapters[i].getElementsByTagName("strong")[0].innerHTML)) {
                    table.innerHTML += "<tr class\"c3\">" + chapters[i].innerHTML + "</tr>";
                }
            }            

            /* Check if user even has updates */
            if (originalTable == table.innerHTML) {
                table.innerHTML += "No new updates";
            }        

            /* Formatting issues for front page */
            table.innerHTML = table.innerHTML.replace("class=\"c1\"", "class=\"c2\"", 'g');
        }
    }
    xmlhttp.open("GET", "http://www.mangareader.net/latest/", true );
    xmlhttp.send();    
}



initMangaPage();
markChapterRead();
initHomePage();	
