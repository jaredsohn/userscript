// ==UserScript==
// @name           mdx timetable
// @namespace      mihai-rotaru
// @include        https://misis.mdx.ac.uk/mislve/bwskfshd.P_CrseSchd*
// ==/UserScript==
( function() {
    if (document.getElementsByClassName == undefined) {
        // from: http://forums.devshed.com/javascript-development-115/javascript-get-all-elements-of-class-abc-24349.html 
        document.getElementsByClassName = function(className)
            {
                    var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
                    var allElements = document.getElementsByTagName("*");
                    var results = [];

                    var element;
                    for (var i = 0; (element = allElements[i]) != null; i++) 
                    {
                        var elementClass = element.className;
                        if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass))
                            results.push(element);
                    }

                return results;
            }
    }

    // CSS code to hide unnecessary elements
    var css = '.pagetitlediv, .infotextdiv, .headerwrapperdiv { display: none; }'; 

    // add a border to the timetable
    css += 'TABLE.datadisplaytable { border-color: #4a6c85; border-style: solid; border-width: 1px; border-spacing: 0px; }';

    // links
    css += 'A:link { color: #c2e078; text-decoration: none; } A:visited { color: #c2e078;} ';

    // padding
    css += 'TABLE TD.ddlabel { border-color: #222; border-style:solid; border-width: 2px; padding: 10px; }';

    // table header
    css += 'TABLE TH.ddheader { width: 30px; height: 30px; vertical-align: middle; }';

    // locations
    css += '.college_building     { color: white; background-color: #ee3124; }';
    css += '.hatchcroft_building  { color: white; background-color: #9a4e9e; }';
    css += '.grove_building       { color: white; background-color: #8dc63f; }';
    css += '.hendon_town_hall     { color: white; background-color: #8dc63f; }';
    css += '.hendon_town_hall     { color: white; background-color: #8dc63f; }';
    css += '.sheppard_library     { color: white; background-color: #13b5ea; }';
    css += '.williams_building    { color: white; background-color: #00b1b0; }';
    css += '.the_forum            { color: white; background-color: #f8971d; }';
    css += '.musu                 { color: white; background-color: #629081; }';

    // inject the CSS code into the 'head' element
    try {
        var elmHead, elmStyle;
        elmHead = document.getElementsByTagName('head')[0];
        elmStyle = document.createElement('style');
        elmStyle.type = 'text/css';
        elmHead.appendChild( elmStyle );
        elmStyle.innerHTML = css;
        //alert( "elmStyle.innerHTML: " + elmStyle.innerHTML ); 
    } catch( e ) {
        if( !document.styleSheets.length ) {
            document.createStyleSheet();
        }
        document.styleSheets[0].cssText += css;
        //          alert( "document.styleSheets[0]: " + document.styleSheets[0] ); 
    }

    // no need for the banner
    body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = 'none';

    console.debug("TEST");

    // zebra table
    timetable = document.getElementsByClassName('datadisplaytable')[0];
    var rows = timetable.rows;
    for( var i = 0; i < rows.length; i++ )
    {
        if( i%2 == 0 )
            rows[i].style.backgroundColor = '#badcdd'; 
        else
            rows[i].style.backgroundColor = '#cbf1f2';

        var cells = rows[i].cells;
        if( cells )
            for( var j = 0; j < cells.length; j++ )
            {
                cell = cells[j];
                
                // lectures/labs/seminars
                if( cell.attributes[0].value == 'ddlabel' )
                {
                    cell.style.backgroundColor = '#212b40';
                    
                    ih = cell.innerHTML;
                    console.debug( ih );
                    
                    // link to the course
                    var href = ih.match('<a href="(.*)">CMT')[1];
                    console.info( href );

                    // module code
                    var re_module_code = /<a href=".*">(CMT\s\d+)/
                    var module_code = ih.match( re_module_code )[1];
                    console.info( module_code );

                    // type - lecture, seminar, lab
                    var re_type = /<br>\d+\s(Laboratory|Lecture|Seminar)<br>/
                    var type = ih.match( re_type )[1];
                    console.info( type );

                    var type_char;
                    switch( type ) {
                        case 'Lecture':    type_char = 'C'; break;
                        case 'Laboratory': type_char = 'L'; break;
                        case 'Seminar':    type_char = 'S'; break;
                        default:           type_char = '?';
                    }

                    // time
                    var re_time = /<br>(\d{1,2}:\d{2}\s(?:AM|PM))-(\d{1,2}:\d{2}\s(?:AM|PM))<br>/
                    var item_time_start = ih.match( re_time )[1];
                    var item_time_end   = ih.match( re_time )[2];
                    console.info( item_time_start );
                    console.info( item_time_end );

                    // location
                    var re_location = /<br>\w+\s(\w{1,2}\d+\w?)/
                    var item_location = ih.match( re_location )[1];
                    console.info( item_location );

                    var location_class;
                    switch(item_location[0]) {
                        case 'C': location_class = 'college_building';    break;
                        case 'H': location_class = 'hatchcroft_building'; break;
                        case 'W': location_class = 'williams_building';   break;
                        case 'G': location_class = 'grove_building';      break;
                        case 'S': location_class = 'sheppard_library';    break;
                        case 'T': location_class = 'hendon_town_hall';    break;
                        default: location_class = 'musu'; // dark, greyish green
                    }

                    cell.innerHTML = '<a href=\"' + href + '">' 
                        + module_code + ' ' + type_char + '<br>' 
                        + '<span class="' + location_class + '">' + item_location + '</span><br>'
                        + item_time_start + '<br>'
                        + item_time_end;
                }
            }
    }
    console.info( "END!!!");

}) ();
