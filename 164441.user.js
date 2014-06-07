// ==UserScript==
// @name          Fakku Blacklist and Highlighting
// @copyright     2013, Kai Hänel aka. Thasidar
// @namespace     fakku.net/thasidar
// @description   Removes Posts with the Tags specified in a blacklist and highlights others, as specified
// @include       http://www.fakku.net/
// @include       http://www.fakku.net/page/*
// @include       http://www.fakku.net/tags/*
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_deleteValue
// @version       2.0.1
// ==/UserScript==

const remove_news = false;

// loading the saved Lists
tags = GM_getValue("tags", "").split(",");
blacklist = GM_getValue("blacklist", "").split(",");
artists = GM_getValue("artists", "").split(",");
series = GM_getValue("series", "").split(",");

// some predefined Colors:
const light_blue = '#e6e6fa';  const blue = '#9b9beb';
const light_green = '#e6fae6'; const green = '#9beb9b';
const light_red = '#fae6e6';   const red = '#eb9b9b';


// Color assignment for easier changes and overview
const tags_color = light_green;
const artist_color = light_blue;
const series_color = light_red;


window.main = function(){

    var listet;
    var j;

    var content = document.getElementById('content');

    var bar = document.getElementsByClassName('content-row')[0].cloneNode(false);
    bar.id = 'ubersichtsleiste';

    bar.style.paddingLeft = '5px';
    bar.style.paddingTop = '1px';
    bar.style.paddingRight = '5px'
    bar.style.paddingBottom = '1px';
    bar.style.borderStyle = 'solid';
    bar.style.borderColor = 'lightgray';
    bar.style.borderWidth = '1px';
    bar.style.borderRadius = '3px';
    bar.style.height = '118px';

/*************************************************************************************************************************
 *  Tags in die Übersicht listen und passend Links dazu erstellen
 *************************************************************************************************************************/

    var row1 = document.createElement('div');
    row1.id = 'row1'
    row1.setAttribute("class", "row");

    var row1_left = document.createElement('div');
    row1_left.id = 'row1_left';
    row1_left.setAttribute("class", "left");
    row1_left.style.backgroundColor = tags_color
        row1_left.innerHTML = "Tag highlighting:";
    row1.appendChild(row1_left);


    var row1_right = document.createElement('div');
    row1_right.id = 'row1_right';
    row1_right.setAttribute("class", "right");
    row1_right.style.backgroundColor = tags_color
    row1_right.style.fontSize = 'smaller';
        listet = '<a href="http://www.fakku.net/tags/' + tags[0].replace(RegExp("[ ]","g"),"") + '">' + tags[0] + '</a>';
        for(j = 1; tags[j] != null; j++)
        {
            listet += ', <a href="http://www.fakku.net/tags/' + tags[j].replace(RegExp("[ ]","g"),"") + '">' + tags[j] + '</a> ';
        }
        row1_right.innerHTML = listet;
    row1.appendChild(row1_right);


    bar.appendChild(row1);

/*************************************************************************************************************************
 *  Artists in die Übersicht listen und passend Links dazu erstellen
 *************************************************************************************************************************/

    var row2 = document.createElement('div');
    row2.id = 'row2'
    row2.setAttribute("class", "row");

    var row2_left = document.createElement('div');
    row2_left.id = 'row2_left';
    row2_left.setAttribute("class", "left");
    row2_left.style.backgroundColor = artist_color
        row2_left.innerHTML = "Artist highlighting:";
    row2.appendChild(row2_left);


    var row2_right = document.createElement('div');
    row2_right.id = 'row2_right';
    row2_right.setAttribute("class", "right");
    row2_right.style.backgroundColor = artist_color
    row2_right.style.fontSize = 'smaller';
        listet = '<a href="http://www.fakku.net/artists/' + artists[0].replace(RegExp("[ ]","g"),"-").replace(RegExp("[.]","g"),"") + '">' + artists[0] + '</a>';
        for(j = 1; artists[j] != null; j++)
        {
            listet += ', <a href="http://www.fakku.net/artists/' + artists[j].replace(RegExp("[ ]","g"),"-").replace(RegExp("[.]","g"),"") + '">' + artists[j] + '</a>';
        }
        row2_right.innerHTML = listet;
    row2.appendChild(row2_right);


    bar.appendChild(row2);

/*************************************************************************************************************************
 *  Serien in die Übersicht listen und passend Links dazu erstellen
 *************************************************************************************************************************/

    var row3 = document.createElement('div');
    row3.id = 'row3'
    row3.setAttribute("class", "row");

    var row3_left = document.createElement('div');
    row3_left.id = 'row3_left';
    row3_left.setAttribute("class", "left");
    row3_left.style.backgroundColor = series_color
        row3_left.innerHTML = "Followed series:";
    row3.appendChild(row3_left);


    var row3_right = document.createElement('div');
    row3_right.id = 'row3_right';
    row3_right.setAttribute("class", "right");
    row3_right.style.backgroundColor = series_color
    row3_right.style.fontSize = 'smaller';
        listet = '<a href="http://www.fakku.net/search/' + series[0].replace(RegExp(/[^A-Za-z0-9 \-_]/g),"") + '">' + series[0] + '</a>';
        for(j = 1; series[j] != null; j++)
        {
            listet += ', <a href="http://www.fakku.net/search/' + series[j].replace(RegExp(/[^A-Za-z0-9 \-_]/g),"") + '">' + series[j] + '</a>';
        }
        row3_right.innerHTML = listet;
    row3.appendChild(row3_right);


    bar.appendChild(row3);

/*************************************************************************************************************************
 *  Blacklist in die Übersicht listen und passend Links dazu erstellen
 *************************************************************************************************************************/

    var row4 = document.createElement('div');
    row4.id = 'row4'
    row4.setAttribute("class", "row");

    var row4_left = document.createElement('div');
    row4_left.id = 'row4_left';
    row4_left.setAttribute("class", "left");
        row4_left.innerHTML = "Blacklist:";
    row4.appendChild(row4_left);


    var row4_right = document.createElement('div');
    row4_right.id = 'row4_right';
    row4_right.setAttribute("class", "right");
    row4_right.style.fontSize = 'smaller';
        listet = blacklist[0];
        for(j = 1; blacklist[j] != null; j++)
        {
            listet += ", " + blacklist[j]
        }
        row4_right.innerHTML = listet;
    row4.appendChild(row4_right);


    bar.appendChild(row4);

/*************************************************************************************************************************
 * Auswahl und Eingabefeld einfügen
 *************************************************************************************************************************/


    var row5 = document.createElement('div');
    row5.id = 'row5'
    row5.setAttribute("class", "row");

    var row5_left = document.createElement('div');
    row5_left.id = 'row5_left';
    row5_left.setAttribute("class", "left");
        listet = '<select style="width:120px; background-color:' + tags_color + '; border:1px solid #aaAAaa;" id="list_change_menu">' +
                    '<option selected="" >Tag</option>' +
                    '<option>Artist</option>' +
                    '<option>Series</option>' +
                    '<option>Blacklist</option> </select>';
        row5_left.innerHTML = listet;
    row5.appendChild(row5_left);


    var row5_right = document.createElement('div');
    row5_right.id = 'row5_right';
    row5_right.setAttribute("class", "right");
    row5_right.style.fontSize = 'smaller';
        listet = '<form id="frm">' +
                 '<input type="text" id="list_change_input" style="background-color:' + tags_color + '; border:1px solid #aaAAaa;" value="" size="40" >' +
                 '<input type="button" id="list_change_button" value=">|" on>' +
                 '</form>';
        row5_right.innerHTML = listet;
    row5.appendChild(row5_right);


    bar.appendChild(row5);







/*************************************************************************************************************************
 * Wirkliches Einfügen der Leiste mit den Listen und so
 *************************************************************************************************************************/

    content.insertBefore(bar,content.firstChild);

/*************************************************************************************************************************
 * Farben ändern, abhängig des Dropdownmenüs
 ************************************************************************************************************************/

    document.getElementById("list_change_menu").addEventListener("change", function()
    {
        menu = document.getElementById("list_change_menu").value;
        if(menu == "Tag")
        {
            document.getElementById("list_change_menu").style.backgroundColor = tags_color;
            document.getElementById("list_change_input").style.backgroundColor = tags_color;
        }
        else if(menu == "Artist")
        {
            document.getElementById("list_change_menu").style.backgroundColor = artist_color;
            document.getElementById("list_change_input").style.backgroundColor = artist_color;
        }
        else if(menu == "Series")
        {
            document.getElementById("list_change_menu").style.backgroundColor = series_color;
            document.getElementById("list_change_input").style.backgroundColor = series_color;
        }
        else
        {
            document.getElementById("list_change_menu").style.backgroundColor = '#ffFFff';
            document.getElementById("list_change_input").style.backgroundColor = '#ffFFff';
        }

    }, true);


/*************************************************************************************************************************
 * Hinzufügen und Entfernen von Einträgen aus den Listen
 ************************************************************************************************************************/

    document.getElementById("list_change_button").addEventListener("click", function()
    {
        wert = document.getElementById("list_change_input").value;
        menu = document.getElementById("list_change_menu").value;
        new_wert = null;
        gleichheit = -1;
        wert = wert.replace(/^\s\s*/, '').replace(/\s\s*$/, '');    // Entfernen von Leerzeichen am Anfand und Ende

// Auswahl des Arrays mit dem gearbeitet werden soll.
        if(menu == "Tag")
        {
            arbeits_array = tags;
        }
        else if(menu == "Artist")
        {
            arbeits_array = artists;
        }
        else if(menu == "Series")
        {
            arbeits_array = series;
        }
        else
        {
            arbeits_array = blacklist;
        }

// Eigentliches Umarbeiten des gewählten Arrays
        if(wert != "")
        {
            for(j = 0; arbeits_array[j] != null; j++)
            {
                if(new String(arbeits_array[j].toLowerCase()).valueOf() == new String(wert.toLowerCase()).valueOf())
                {
                    gleichheit = j;
                }
            }

            if(gleichheit != -1)
            {
                for(j = 0; j < gleichheit; j++)
                {
                    if(new_wert == null)
                    {
                        new_wert = arbeits_array[j];
                    } else {
                        new_wert += "," + arbeits_array[j];
                    }
                }
                for(j = gleichheit; j < arbeits_array.length - 1; j++)
                {
                    arbeits_array[j] = arbeits_array[j+1];
                    if(new_wert == null)
                    {
                        new_wert = arbeits_array[j];
                    } else {
                        new_wert += "," + arbeits_array[j];
                    }
                }
            }
            else // (gleichheit == -1)
            {
                for(j = 0; arbeits_array[j] != null; j++)
                {
                    if(new_wert == null)
                    {
                        new_wert = arbeits_array[j];
                    } else {
                        new_wert += "," + arbeits_array[j];
                    }
                }
                if(new_wert == "")
                {
                    new_wert = wert;
                } else {
                    new_wert += "," + wert;
                }
            }

// Speichern des geänderten Arrays
            if(menu == "Tag")
            {
                if(new_wert == null)
                {
                    GM_deleteValue("tags");
                } else {
                    GM_setValue("tags", new_wert);
                }
            }
            else if(menu == "Artist")
            {
                if(new_wert == null)
                {
                    GM_deleteValue("artists");
                } else {
                    GM_setValue("artists", new_wert);
                }
            }
            else if(menu == "Series")
            {
                if(new_wert == null)
                {
                    GM_deleteValue("series");
                } else {
                    GM_setValue("series", new_wert);
                }
            }
            else
            {
                if(new_wert == null)
                {
                    GM_deleteValue("blacklist");
                } else {
                    GM_setValue("blacklist", new_wert);
                }
            }
        }

        document.location.reload(true);
    }, true);





/*************************************************************************************************************************************************************************/

/*************************************************************************************************************************************************************************/

/*************************************************************************************************************************
 * Ein paar allgemeinere Variablen für die kommenden Teile
 ************************************************************************************************************************/

    var posts;
    var posts_length;
    var old_child;
    var post_text;
    var i;

/*************************************************************************************************************************
 *  Removing news entries
 *************************************************************************************************************************/
    if(remove_news == true)
    {
        var newsfields = document.getElementsByClassName('news-row');

        for(;newsfields.length != 0;)
        {
            newsfields = document.getElementsByClassName('news-row');
            old_child = document.getElementById('content').removeChild(newsfields[0]);
        }
    }

/*************************************************************************************************************************
 *  Coloring the new ones
 *************************************************************************************************************************
    posts = document.getElementsByClassName('content-row');
    posts_length = posts.length;

    if(last_seen != "")
    {
        for(i = 0; i < posts.length; i++)
        {
            post_text = posts[i].textContent.toLowerCase();
            post_text = post_text.slice(0,post_text.lastIndexOf('series:'));

            if (post_text.indexOf(last_seen.toLowerCase()) != -1)
            {
                break;
            } else {
                posts[i].style.borderColor = red;
                posts[i].style.borderWidth = '2px';
            }
        }
    } */

/*************************************************************************************************************************
 *  Tag highlighting
 *************************************************************************************************************************/
    posts = document.getElementsByClassName('content-row');
    posts_length = posts.length;

    if(tags[0] != "")
    {
        for(i = 0; i < posts.length; i++)
        {
            post_text = posts[i].textContent.toLowerCase();
            post_text = post_text.slice(post_text.lastIndexOf('tags:'),post_text.length);

            for(j = 0; j < tags.length; j++)
            {
                if (post_text.indexOf(tags[j].toLowerCase()) != -1)
                {
                    posts[i].style.backgroundColor = tags_color;
                }
            }
        }
    }

/*************************************************************************************************************************
 *  Artist highlighting
 *************************************************************************************************************************/
    posts = document.getElementsByClassName('content-row');
    posts_length = posts.length;

    if(artists[0] != "")
    {
        for(i = 0; i < posts.length; i++)
        {
            post_text = posts[i].textContent.toLowerCase();
            post_text = post_text.slice(post_text.lastIndexOf('artist:'),post_text.lastIndexOf('tags:'));

            for(j = 0; j < artists.length; j++)
            {
                if (post_text.indexOf(artists[j].toLowerCase()) != -1)
                {
                    posts[i].style.backgroundColor = artist_color;
                }
            }
        }
    }

/*************************************************************************************************************************
 *  Series highlighting
 *************************************************************************************************************************/
    posts = document.getElementsByClassName('content-row');
    posts_length = posts.length;

    if(series[0] != "")
    {
        for(i = 0; i < posts.length; i++)
        {
            post_text = posts[i].textContent.toLowerCase();
            post_text = post_text.slice(0,post_text.lastIndexOf('series:'));

            for(j = 0; j < series.length; j++)
            {
                if (post_text.indexOf(series[j].toLowerCase()) != -1)
                {
                    posts[i].style.backgroundColor = series_color;
                }
            }
        }
    }

/*************************************************************************************************************************
 *  Removing blacklist entries (when they are note highlighted)
 *************************************************************************************************************************/
    posts = document.getElementsByClassName('content-row');
    posts_length = posts.length;

    if(blacklist[0] != "")
    {
        for(i = 0; i < posts.length; i++)
        {
            post_text = posts[i].textContent.toLowerCase();
            post_text = post_text.slice(post_text.lastIndexOf('tags:'),post_text.length);

            for(j = 0; j < blacklist.length; j++)
            {
                if (post_text.indexOf(blacklist[j].toLowerCase()) != -1)
                {
                    if(posts[i].style.backgroundColor == '')
                    {
                        old_child = document.getElementById('content').removeChild(posts[i]);
                        i--;
                        break;
                    }
                }
            }
        }
    }
}

window.setTimeout(main,60);



/*************************************************************************************************************************
 *  Just to search for Elements by Classname
 *************************************************************************************************************************/
function getElementsByClassName(node, classname) {
    var a = [];
    var re = new RegExp('(^| )'+classname+'( |$)');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}