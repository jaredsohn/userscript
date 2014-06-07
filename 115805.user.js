// ==UserScript==
// @name       OSU Carmen Auto Grade Calculator
// @version    0.3
// @description  Parses, calculates, and displays overall grades on OSU's Carmen online grading system automagically.
// @include    https://carmen.osu.edu/d2l/lms/grades/my_grades/*
// @copyright  2011+, Zane Geiger
// ==/UserScript==

//Put the total and possible points in these variables
var overall = 0;
var total = 0;

//Use CSS selectors to get the grade elements
var cells = document.body.querySelectorAll( "*:not([class]) > .d_gn label, .d_gd > .d_gn label" );

//Skip the non-weighted grades, use every other element
for( var cell = 1; cell < cells.length; cell += 2 )
{
    //Parse the element's contents to get the points and possible points
    var num = cells[ cell ].innerHTML.split( " / " );
    
    //Ignore all zero grades (will cause mistakes if an assignment is in fact zero)
    if( num[ 0 ] !== "0" )
    {
        //Add to the total and possible points
        overall += parseFloat( num[ 0 ] );
        total += parseFloat( num[ 1 ] );
    }
}

//Clone the 'Daily Assignments' row and append to the grades table
var zc = document.getElementById( "z_c" ).appendChild( document.getElementsByClassName( "d_ggl1" )[ 0 ].cloneNode( true ) );

//Replace the new row's text
zc.querySelectorAll( "strong" )[ 0 ].innerHTML = "Overall Grade";

//Remove the unused statistics image and link
zc.querySelectorAll( "a" )[ 0 ].parentNode.removeChild( zc.querySelectorAll( "a" )[ 0 ] );

//Replace the new row's number with the calculated percentage grade
zc.querySelectorAll( "label" )[ 0 ].innerHTML = Math.round( overall / total * 100 ) + " / 100";

void( 0 );