// ==UserScript==
// @name           Integrame Online
// @author         Onofrei Iulian http://iulianonofrei.com
// @namespace      http://userscripts.org/scripts/show/107555
// @version        1
// @require        http://sizzlemctwizzle.com/updater.php?id=107555&days=1
// @include        *://*.integrameonline.ro/*
// ==/UserScript==

window.addEventListener( "load" , function()
{
console.log("ENTERED @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

var i , j ,
    img = getImageCell();

window.addEventListener( "keydown" , _keyPress , false );
_Over();

function _keyPress(e)
{console.log("da");
    //left
    if( e.keyCode == "37")
    {
        e.preventDefault();
        e.stopPropagation();
        unMarkAll();
        unHighlightAllCells();

        if( img )
        {
        }
        else
        {
            if( activeCell.cellIndex == 0 )
            {
                activeCell = table.rows[ activeCell.parentNode.rowIndex ].cells[ table.rows[ activeCell.parentNode.rowIndex ].cells.length - 1 ];
                if( !$( activeCell ).hasClass( "definitionCell" ) && !$( activeCell ).hasClass( "completedCell" )  )
                {
                    markSelectedCell( activeCell.parentNode.rowIndex , table.rows[ activeCell.parentNode.rowIndex ].cells.length - 1 );
                }
                else
                {
                    activeCell.style.backgroundColor = "#ACA";
                }
            }
            else
            {
                activeCell = table.rows[ activeCell.parentNode.rowIndex ].cells[ activeCell.cellIndex - 1 ];
                if( !$( activeCell ).hasClass( "definitionCell" ) && !$( activeCell ).hasClass( "completedCell" )  )
                {
                    markSelectedCell( activeCell.parentNode.rowIndex , activeCell.cellIndex );
                }
                else
                {
                    activeCell.style.backgroundColor = "#ACA";
                }
            }
        }
    }
    //right
    else if( e.keyCode == "39")
    {
        e.preventDefault();
        e.stopPropagation();
        unMarkAll();
        unHighlightAllCells();

        if( img )
        {
        }
        else
        {
            if( activeCell.cellIndex == table.rows[ activeCell.parentNode.rowIndex ].cells.length - 1 )
            {
                activeCell = table.rows[ activeCell.parentNode.rowIndex ].cells[0];
                if( !$( activeCell ).hasClass( "definitionCell" ) && !$( activeCell ).hasClass( "completedCell" )  )
                {
                    markSelectedCell( activeCell.parentNode.rowIndex , 0 );
                }
                else
                {
                    activeCell.style.backgroundColor = "#ACA";
                }
            }
            else
            {
                activeCell = table.rows[ activeCell.parentNode.rowIndex ].cells[ activeCell.cellIndex + 1 ];
                if( !$( activeCell ).hasClass( "definitionCell" ) && !$( activeCell ).hasClass( "completedCell" )  )
                {
                    markSelectedCell( activeCell.parentNode.rowIndex , activeCell.cellIndex );
                }
                else
                {
                    activeCell.style.backgroundColor = "#ACA";
                }
            }
        }
    }
    //up
    if( e.keyCode == "38")
    {
        e.preventDefault();
        e.stopPropagation();
        unMarkAll();
        unHighlightAllCells();

        if( img )
        {
            if( activeCell.parentNode.rowIndex == 0 )
            {
                if( table.rows[ table.rows.length - 1 ].cells[ activeCell.cellIndex ] == undefined )
                {
                    activeCell = table.rows[ table.rows.length - img.rowSpan ].cells[ activeCell.cellIndex ];
                }
                else
                {
                    activeCell = table.rows[ table.rows.length - 1 ].cells[ activeCell.cellIndex ];
                }

                if( !$( activeCell ).hasClass( "definitionCell" ) && !$( activeCell ).hasClass( "completedCell" )  )
                {
                    markSelectedCell( table.rows.length - 1 , activeCell.cellIndex );
                }
                else
                {
                    activeCell.style.backgroundColor = "#ACA";
                }
            }
            else
            {
                if( activeCell.cellIndex < img.cellIndex )
                {
                    activeCell = table.rows[ activeCell.parentNode.rowIndex - 1 ].cells[ activeCell.cellIndex ];

                    if( !$( activeCell ).hasClass( "definitionCell" ) && !$( activeCell ).hasClass( "completedCell" )  )
                    {
                        markSelectedCell( activeCell.parentNode.rowIndex , activeCell.cellIndex );
                    }
                    else
                    {
                        activeCell.style.backgroundColor = "#ACA";
                    }
                }
                else if( activeCell.cellIndex >= img.cellIndex + img.colSpan )
                {
                    if( table.rows[ activeCell.parentNode.rowIndex - img.rowSpan ].cells[ img.cellIndex ] == img )
                    {
                        activeCell = table.rows[ activeCell.parentNode.rowIndex - 1 ].cells[ activeCell.cellIndex - img.colSpan ];
                
                        if( !$( activeCell ).hasClass( "definitionCell" ) && !$( activeCell ).hasClass( "completedCell" )  )
                        {
                            markSelectedCell( activeCell.parentNode.rowIndex , activeCell.cellIndex + img.colSpan );
                        }
                        else
                        {
                            activeCell.style.backgroundColor = "#ACA";
                        }
                    }
                    else
                    {
                        activeCell = table.rows[ activeCell.parentNode.rowIndex - 1 ].cells[ activeCell.cellIndex ];

                        if( !$( activeCell ).hasClass( "definitionCell" ) && !$( activeCell ).hasClass( "completedCell" )  )
                        {
                            markSelectedCell( activeCell.parentNode.rowIndex , activeCell.cellIndex );
                        }
                        else
                        {
                            activeCell.style.backgroundColor = "#ACA";
                        }
                    }
                }
                else
                {
                    if( table.rows[ activeCell.parentNode.rowIndex - img.rowSpan ].cells[ img.cellIndex ] == img )
                    {
                        activeCell = table.rows[ activeCell.parentNode.rowIndex - img.rowSpan - 1 ].cells[ activeCell.cellIndex ];
                    }
                    else
                    {
                        activeCell = table.rows[ activeCell.parentNode.rowIndex - 1 ].cells[ activeCell.cellIndex ];
                    }

                    if( !$( activeCell ).hasClass( "definitionCell" ) && !$( activeCell ).hasClass( "completedCell" )  )
                    {
                        markSelectedCell( activeCell.parentNode.rowIndex , activeCell.cellIndex );
                    }
                    else
                    {
                        activeCell.style.backgroundColor = "#ACA";
                    }
                }
            }
        }
        else
        {
            if( activeCell.parentNode.rowIndex == 0 )
            {
                activeCell = table.rows[ table.rows.length - 1 ].cells[ activeCell.cellIndex ];

                if( !$( activeCell ).hasClass( "definitionCell" ) && !$( activeCell ).hasClass( "completedCell" )  )
                {
                    markSelectedCell( activeCell.parentNode.rowIndex , activeCell.cellIndex );
                }
                else
                {
                    activeCell.style.backgroundColor = "#ACA";
                }
            }
            else
            {
                activeCell = table.rows[ activeCell.parentNode.rowIndex - 1 ].cells[ activeCell.cellIndex ];

                if( !$( activeCell ).hasClass( "definitionCell" ) && !$( activeCell ).hasClass( "completedCell" )  )
                {
                    markSelectedCell( activeCell.parentNode.rowIndex , activeCell.cellIndex );
                }
                else
                {
                    activeCell.style.backgroundColor = "#ACA";
                }
            }
        }
    }
    //down
    else if( e.keyCode == "40")
    {
        e.preventDefault();
        e.stopPropagation();
        unMarkAll();
        unHighlightAllCells();

        if( img )
        {
            if( activeCell.parentNode.rowIndex == table.rows.length - 1 )
            {
                if( table.rows[0].cells[ activeCell.cellIndex ] == undefined )
                {
                    activeCell = table.rows[ img.rowSpan ].cells[ activeCell.cellIndex ];
                }
                else
                {
                    activeCell = table.rows[0].cells[ activeCell.cellIndex ];
                }

                if( !$( activeCell ).hasClass( "definitionCell" ) && !$( activeCell ).hasClass( "completedCell" )  )
                {
                    markSelectedCell( 0 , activeCell.cellIndex );
                }
                else
                {
                    activeCell.style.backgroundColor = "#ACA";
                }
            }
            else
            {
                if( table.rows[ activeCell.parentNode.rowIndex + img.rowSpan ].cells[ img.cellIndex ] == img )
                {
                    activeCell = table.rows[0].cells[ activeCell.cellIndex ];
                }
                else
                {
                    activeCell = table.rows[ activeCell.parentNode.rowIndex + 1 ].cells[ activeCell.cellIndex ];
                }

                if( !$( activeCell ).hasClass( "definitionCell" ) && !$( activeCell ).hasClass( "completedCell" ) )
                {
                    markSelectedCell( activeCell.parentNode.rowIndex , activeCell.cellIndex );
                }
                else
                {
                    activeCell.style.backgroundColor = "#ACA";
                }
            }
        }
        else
        {
            if( activeCell.parentNode.rowIndex == table.rows.length - 1 )
            {
                activeCell = table.rows[ 0 ].cells[ activeCell.cellIndex ];

                if( !$( activeCell ).hasClass( "definitionCell" ) && !$( activeCell ).hasClass( "completedCell" )  )
                {
                    markSelectedCell( activeCell.parentNode.rowIndex , activeCell.cellIndex );
                }
                else
                {
                    activeCell.style.backgroundColor = "#ACA";
                }
            }
            else
            {
                activeCell = table.rows[ activeCell.parentNode.rowIndex + 1 ].cells[ activeCell.cellIndex ];

                if( !$( activeCell ).hasClass( "definitionCell" ) && !$( activeCell ).hasClass( "completedCell" )  )
                {
                    markSelectedCell( activeCell.parentNode.rowIndex , activeCell.cellIndex );
                }
                else
                {
                    activeCell.style.backgroundColor = "#ACA";
                }
            }
        }
    }
    else
    {
        if( $( activeCell ).hasClass( "definitionCell" ) || $( activeCell ).hasClass( "completedCell" )  )
        {
            e.preventDefault();
            e.stopPropagation();
            return false;
            console.log("stop");
        }
    }

}

function unMarkAll()
{
    for(i = 0 ; i < table.rows.length ; i++ )
    {
        for( j = 0 ; j < table.rows[i].cells.length ; j++ )
        {
            table.rows[i].cells[j].style.backgroundColor = "";

            if ( $( table.rows[i].cells[j] ).hasClass( "selectedCell" ) )
            {
                $( table.rows[i].cells[j] ).removeClass( "selectedCell" );
            }
        }
    }
}

function _Position()
{
    if( activeCell.parentNode.rowIndex < img.parentNode.rowIndex )
    {
        if( activeCell.cellIndex < img.cellIndex ) return 1;
        else if( activeCell.cellIndex >= img.cellIndex && activeCell.cellIndex < img.cellIndex + img.colSpan ) return 2;
        else if( activeCell.cellIndex >= img.cellIndex + img.colSpan ) return 3;
    }
    else if( activeCell.parentNode.rowIndex >= img.parentNode.rowIndex && activeCell.parentNode.rowIndex < img.parentNode.rowIndex + img.rowSpan )
    {
        if( activeCell.cellIndex < img.cellIndex ) return 4;
        else if( activeCell.cellIndex >= img.cellIndex ) return 6;
    }
    else if( activeCell.parentNode.rowIndex >= img.parentNode.rowIndex + img.rowSpan )
    {
        if( activeCell.cellIndex < img.cellIndex ) return 7;
        else if( activeCell.cellIndex >= img.cellIndex && activeCell.cellIndex < img.cellIndex + img.colSpan ) return 8;
        else if( activeCell.cellIndex >= img.cellIndex + img.colSpan ) return 9;
    }
}

function _Over()
{
    for(i = 0 ; i < table.rows.length ; i++ )
    {
        for( j = 0 ; j < table.rows[i].cells.length ; j++ )
        {
            table.rows[i].cells[j].addEventListener( "mouseover" , function()
                {
                    activeCell = this;

                    if( !$( activeCell ).hasClass( "definitionCell" ) && !$( activeCell ).hasClass( "completedCell" )  )
                    {
                        unMarkAll();
                        unHighlightAllCells();
                        markSelectedCell( activeCell.parentNode.rowIndex , activeCell.cellIndex );
                    }
                } , false );
        }
    }
}

/*
http://www.integrameonline.ro/page/integrama/objId/2303
http://www.integrameonline.ro/page/integrama/objId/2365
http://www.integrameonline.ro/page/integrama/objId/2287

DOMSubtreeModified


var img = getImageCell();

for(i = 0 ; i < table.rows.length ; i++ )
{
    for( j = 0 ; j < table.rows[i].cells.length ; j++ )
    {
        //table.rows[i].cells[j].textContent = i + ":" + j;
        activeCell = table.rows[i].cells[j];
        table.rows[i].cells[j].textContent = _Position();
    }
}

*/
} , true );