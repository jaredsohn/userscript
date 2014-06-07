// ==UserScript==
// @name           Sortable
// @author         Endy
// @namespace      http://www.erepublik.com/en/newspaper/freedom-post-180922/1
// @include        http://www.erepublik.com/en/company-employees/*
// ==/UserScript==

// Based on the more general Table Sorter found here: http://userscripts.org/scripts/show/25406

if (CODEBOX===undefined){
    var CODEBOX={};
}

CODEBOX.tabsorter = {
    'processTable' : function(tableElement){
        if ( !checkTableStructureOk(tableElement) ){
            return null;
        }

     // State is initialised here
        var rowObjects           = [];
        var currentSortColIndex  = null;
        var currentSortAscending = null;
        var linkTds              = [];
        var rowWithArrows, rowWithOptions;
        var colCount             = 0;
        var sortTypes = {
            'NONE' : {
                'text' : 'none',
                'fn'   : sortRestore
            },
            'ALPHA' : {
                'text' : 'alpha',
                'fn'   : sortColByAlpha
            },
            'NUM' : {
                'text' : 'num',
                'fn'   : sortColByNum
            }
        };
        var currentSortType = sortTypes.NONE;


        function sortRestore(){
            rowObjects.sort(function(a,b){
                return a.getOriginalIndex()    - b.getOriginalIndex();
            });
            redraw();
        }

        function sortColByAlpha(col, ascending){
            if (col<colCount){
                var multiplier = ascending ? 1 : -1;
                rowObjects.sort(function(a,b){
                    var aItem = a.getCellValue(col);
                    aItem = aItem ? aItem.toLowerCase() : aItem;

                    var bItem = b.getCellValue(col);
                    bItem = bItem ? bItem.toLowerCase() : bItem;

                    if (aItem){
                        if (bItem){
                            if (aItem > bItem){
                                return 1 * multiplier;
                            } else if (aItem < bItem){
                                return -1 * multiplier;
                            } else {
                                return 0;
                            }
                        } else {
                            return 1 * multiplier;
                        }
                    } else {
                        if (bItem){
                            return -1 * multiplier;
                        } else {
                            return 0;
                        }
                    }
                    CODEBOX.assert(false);
                });
            }
            redraw();
        }

        function sortColByNum(col, ascending){
            function makeNumFromText(txt){
                return parseFloat(txt.replace(/,/g, '').replace(/[^0-9\.+\-]+/, ' '));
            }
            if (col<colCount){
                var multiplier = ascending ? 1 : -1;
                rowObjects.sort(function(a,b){
                    var aNum = makeNumFromText(a.getCellValue(col));
                    if (isNaN(aNum)){
                     // Make non-numeric values go to the bottom of the list
                        return Infinity;
                    }
                    var bNum = makeNumFromText(b.getCellValue(col));
                    if (isNaN(bNum)){
                     // Make non-numeric values go to the bottom of the list
                        return -Infinity;
                    }
                    return (aNum - bNum) * multiplier;
                });
            }
            redraw();
        }

     // Populate rowObjects array
        CODEBOX.forEach(tableElement.getElementsByTagName("TR"), function(item, i){
            var rowObject = buildRowObject(item, i);
            if (rowObject){
                rowObjects.push(rowObject);
                colCount = ( (colCount < rowObject.getCellCount()) ? rowObject.getCellCount() : colCount);
            }
        });

        setupSortRows();


        function checkTableStructureOk(tableElement){
            CODEBOX.assert(tableElement);

         // tables that contain other tables are not processed...
             var nestedTables = tableElement.getElementsByTagName("TABLE");
             if (nestedTables.length > 0){
                 return false;
             }

         // tables that have less than 2 rows are not processed...
             var rows = tableElement.getElementsByTagName("TR");
             if (rows.length < 2){
                 return false;
             }

         // tables that don't have any text nodes are not processed...
              function checkForTextNodeChildren(item){
                  CODEBOX.assert(item);
                  var childNodes = item.childNodes;

                  if (!childNodes){
                      return false;
                  }

                  var childNode;
                  var TEXT_NODE_TYPE = 3;
                  var TRIM_REGEX     = /^\s+|\s+$/;
                  for (var i=0, l=childNodes.length; i<l; i++){
                      childNode = childNodes[i];
                      if (childNode.nodeType===TEXT_NODE_TYPE){
                          var text = childNode.nodeValue;
                          text = text.replace(TRIM_REGEX, '');
                          if (text.length > 0){
                              return true;
                          }
                      } else {
                          if ( checkForTextNodeChildren(childNode) ){
                              return true;
                          }
                      }
                  }
                  return false;
              }
              if (!checkForTextNodeChildren(tableElement)){
                  return false;
              }

            return true;
        }

        function buildRowObject(trElement, index){
            if (trElement.parentNode.tagName==='THEAD'){
             // Any rows inside a header are ignored
                return null;
            }

            var tdElements = trElement.getElementsByTagName("TD");
            if (tdElements.length===0){
             // Rows without any TDs are ignored, these are usually headers with THs instead
                return null;
            }

            var obj = {};

            obj.getTr = function(){
                return trElement;
            };

            var parent = trElement.parentNode;
            var cellToElementMappingArray = [];
            var cellIndex=0;

         /* Produces a mapping from 'virtual' cells to TD elements
            so if the third cell has colspan='3' then virtual cells 2,3 and 4 all map to TD 2
             |A|B|  C  |
             [0,1,2,2,2] */
             CODEBOX.forEach(tdElements, function(item, i){
                var colSpan = +(item.colSpan);
                if (isNaN(colSpan) || colSpan===0){
                    colSpan = 1;
                }
                CODEBOX.assert(colSpan);
                for(var j=0; j<colSpan; j++){
                    cellToElementMappingArray[cellIndex++] = i;
                }
             });

            obj.getCellCount = function(){
                return cellToElementMappingArray.length;
            };

            obj.getCellValue = function(index){
                if (index >= cellToElementMappingArray.length){
                    return null;
                } else {
                    var tdIndex = cellToElementMappingArray[index];
                    CODEBOX.assert( tdIndex < tdElements.length );

                    var cellContent = tdElements[tdIndex].innerHTML;
                 // This might contain markup, eg <span class='tdText>cell text</span>, so clean it out
                     var STRIP_MARKUP_REGEX = /<[^<]*>/g;
                    cellContent = cellContent.replace(STRIP_MARKUP_REGEX, '');

                    return cellContent;
                }
            };

            obj.getOriginalIndex = function(){
                return index;
            };

            obj.removeFromParent = function(){
                parent.removeChild(trElement);
            };
            obj.attachToParent = function(){
                parent.appendChild(trElement);
            };

            return obj;
        }


        function setSortType(sortType){
            currentSortType = sortType;

         // Adjust the styles of the sort-type links
            CODEBOX.forEachObject(sortTypes, function(thisSortType){
                var isSelectedSortType = (thisSortType===currentSortType);
                
                thisSortType.link.style.color          = (isSelectedSortType ? 'black' : 'gray');
                thisSortType.link.style.textDecoration = (isSelectedSortType ? '' : 'underline');
                thisSortType.link.style.cursor         = (isSelectedSortType ? '' : 'pointer'  );
            });
            
         // Hide the sort arrows if we aren't sorting
            rowWithArrows.style.display = (sortType===sortTypes.NONE) ? 'none' : '';
            
         // Reset any 'selected' arrow from the previous sort
            if (currentSortColIndex !== null){
                updateLinkCell(currentSortColIndex, false, false);
            }
        }

        function setupSortRows(){
            var firstRow = rowObjects[0].getTr();

         // Add a new row for the options
             rowWithOptions = document.createElement("TR");
             firstRow.parentNode.insertBefore(rowWithOptions, firstRow);

            var optionsTd = document.createElement("TD");
            optionsTd.style.fontSize = '0.7em';
            optionsTd.colSpan        = colCount;

            var optionsSpan = document.createElement("SPAN");
            optionsSpan.style.paddingLeft = '1em';
            optionsSpan.innerHTML         = 'Sort Type: ';
            optionsSpan.style.fontSize   = 'medium';

            var optionAlphaSortLink = document.createElement("A");
            optionAlphaSortLink.style.paddingLeft    = '0.5em';
            optionAlphaSortLink.style.textDecoration = 'underline';
            optionAlphaSortLink.style.cursor         = 'pointer';
            optionAlphaSortLink.innerHTML            = 'Alpha';
            optionAlphaSortLink.style.fontSize   = 'medium';
            optionAlphaSortLink.addEventListener('click',
                    function(e){
                        setSortType( sortTypes.ALPHA );
                    }, false);
            sortTypes.ALPHA.link = optionAlphaSortLink;

            var optionNoSortLink = document.createElement("A");
            optionNoSortLink.style.paddingLeft    = '0.5em';
            optionNoSortLink.style.textDecoration = 'underline';
            optionNoSortLink.style.cursor         = 'pointer';
            optionNoSortLink.innerHTML            = 'none';
            optionNoSortLink.style.fontSize   = 'medium';
            optionNoSortLink.addEventListener('click',
                    function(e){
                        setSortType( sortTypes.NONE );
                        sortTypes.NONE.fn();
                    }, false);
            sortTypes.NONE.link = optionNoSortLink;

            var optionNumSortLink = document.createElement("A");
            optionNumSortLink.style.paddingLeft    = '0.5em';
            optionNumSortLink.style.textDecoration = 'underline';
            optionNumSortLink.style.cursor         = 'pointer';
            optionNumSortLink.style.fontSize   = 'medium';
            optionNumSortLink.innerHTML            = 'num';
            optionNumSortLink.addEventListener('click',
                    function(e){
                        setSortType( sortTypes.NUM );
                    }, false);
            sortTypes.NUM.link = optionNumSortLink;

            optionsTd.appendChild(optionsSpan);
            optionsTd.appendChild(optionAlphaSortLink);
            optionsTd.appendChild(optionNumSortLink);
            optionsTd.appendChild(optionNoSortLink);
            rowWithOptions.appendChild(optionsTd);

         // Add a new row for the sort arrows
             rowWithArrows = document.createElement("TR");
             firstRow.parentNode.insertBefore(rowWithArrows, firstRow);
             var linkTd, linkElement;
             for(var i=0; i<colCount; i++){
                linkTd = document.createElement("TD");
                linkTd.style.fontSize   = 'medium';
                linkTd.style.fontWeight = 'bold';
                linkTd.style.textAlign  = 'center';

                linkTds.push(linkTd);

                linkElement = document.createElement("A");
                linkTd.appendChild(linkElement);

                rowWithArrows.appendChild(linkTd);

                setCellImages(i, false, false);
             }

             setSortType(sortTypes.NONE);
        }

        function updateLinkCell(colIndex, isAscending, isDescending){
            if (currentSortColIndex === null){
             // No column is currently selected, so we don't need to reset anything
                setCellImages(colIndex, isAscending, isDescending);

            } else {
             // There is already a column selected
                if ( colIndex == currentSortColIndex){
                 // The new column is the same as the current one...
                    if (currentSortAscending != null && ((currentSortAscending && isAscending) || (!currentSortAscending && isDescending))){
                         // The new sort order the the same as the current one, so do nothing
                    } else {
                     // The column is the same, but the order is different
                        setCellImages(colIndex, isAscending, isDescending);
                    }
                } else {
                 // The new column is different to the current one so reset the current one
                    setCellImages(currentSortColIndex, false, false);
                 // Set up the new one
                     setCellImages(colIndex, isAscending, isDescending);
                }
            }
        }

        function setCellImages(colIndex, isAscending, isDescending){
            var DATA_URL_UP         = "data:image/gif;base64,R0lGODlhCAAEAPcAAAAAAPfvc/8Avf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAAIALAAAAAAIAAQAAAgSAAUIBABAoEGCBA8iTLhwYUAAADs=";
            var DATA_URL_UP_FADED   = "data:image/gif;base64,R0lGODlhCAAEAPcAAAAAAP8Avf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAAEALAAAAAAIAAQAAAgWAAMIBABAoEEAAgQUHJgwYUGCECEGBAA7";
            var DATA_URL_DOWN       = "data:image/gif;base64,R0lGODlhCAAEAPcAAAAAAPfvc/8Avf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAAIALAAAAAAIAAQAAAgTAAEIHChQAMGCAgwOTMgQoYCAAAA7";
            var DATA_URL_DOWN_FADED = "data:image/gif;base64,R0lGODlhCAAEAPcAAAAAAP8Avf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAAEALAAAAAAIAAQAAAgXAAEIHCgwAAABCAUACMDwoEKGEAsyDAgAOw==";

            var linkCell = linkTds[colIndex];

         // Remove the current images...
            while(linkCell.firstChild){
                linkCell.removeChild(linkCell.firstChild);
            }

            var upArrowImage = document.createElement('IMG');
            upArrowImage.src = (isAscending ? DATA_URL_UP : DATA_URL_UP_FADED);
            upArrowImage.style.cursor = 'pointer';
            upArrowImage.addEventListener('click',
                    function(e){
                        updateLinkCell(colIndex, true, false);
                        currentSortColIndex  = colIndex;
                        currentSortAscending = true;
                        currentSortType.fn(colIndex, true);
                    }, false);

            var downArrowImage = document.createElement('IMG');
            downArrowImage.src = (isDescending ? DATA_URL_DOWN : DATA_URL_DOWN_FADED);
            downArrowImage.style.cursor = 'pointer';
            downArrowImage.addEventListener('click',
                    function(e){
                        updateLinkCell(colIndex, false, true);
                        currentSortColIndex  = colIndex;
                        currentSortAscending = false;
                        currentSortType.fn(colIndex, false);
                    }, false);

            linkCell.appendChild(upArrowImage);
            linkCell.appendChild(downArrowImage);
        }


        function redraw(){
            CODEBOX.forEach(rowObjects, function(item){
                item.removeFromParent();
            });

            CODEBOX.forEach(rowObjects, function(item){
                item.attachToParent();
            });
        }

    }
};


CODEBOX.addNamespace = function (namespaceName){
    function addNamespaceToObject(obj, namespace){
        if (!obj){
            obj = CODEBOX;
        }
        if (obj[namespace]===undefined){
            obj[namespace] = {};
        }
        return obj[namespace];
    }

    var namespaceParts = namespaceName.split('.');
    var parentNamespace = null;
    var thisPart;

    for( var i=0; i<namespaceParts.length; i++) {
        thisPart = namespaceParts[i];
        parentNamespace = addNamespaceToObject(parentNamespace, thisPart);
    }
};

CODEBOX.addNamespace('consts');
CODEBOX.consts.assert = true;
CODEBOX.consts.dialogOnAssert = true;

CODEBOX.assert = function( expression, msg, location ){
    if (CODEBOX.consts.assert){
        if (!expression){
            var errMsg = 'ASSERTION FAILED';
            if (msg){
                errMsg += ': ' + msg;
                if (location){
                    errMsg += ' at ' + location;
                }
            }
            if (CODEBOX.consts.dialogOnAssert){
                alert(errMsg);
            }
            throw new Error(errMsg);
        }
    }
};

CODEBOX.forEach = function(arr, fnDoThis){
    var len = arr.length;
    for (var i=0; i < len; i++){
        fnDoThis(arr[i], i);
    }
};

CODEBOX.forEachObject = function(obj, fnDoThis){
    for (var item in obj){
        if (obj.hasOwnProperty(item)){
            fnDoThis(obj[item]);
        }
    }
};

var allTables = window.document.documentElement.getElementsByTagName("TABLE");
CODEBOX.forEach(allTables, function(table){
    CODEBOX.tabsorter.processTable(table);
});