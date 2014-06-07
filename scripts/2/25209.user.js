// ==UserScript==

// @name           Gmail2 Label Hider

// @description    Hides selected labels from the Labels box

// @version        1.2.1

//

// @include        http://gmail.google.com/*

// @include        https://gmail.google.com/*

// @include        http://mail.google.com/*

// @include        https://mail.google.com/*



// ==/UserScript==



GM_registerMenuCommand("Set list of Gmail labels to hide", setLabelList);



function setLabelList() {

    var hideList = GM_getValue('hideList', null);

    var list = prompt("List of labels to hide, separated by '|'", hideList);

    GM_setValue('hideList', list);

    window.location.reload(false);

}



window.addEventListener('load', function() {

    var interval = window.setInterval(initLabelHider, 300);

    var root;

    var clickedLabelRow;

    var labelsMenuHideItem;
    var labelsHideLink;

    var showAll = true;



    function initLabelHider()

    {

        var canvas = document.getElementById("canvas_frame")

        if (canvas) {

            root = canvas.contentDocument;

            

            if (!root.getElementById("X4_g2lh_labels_hide")) {

                // adds hide link before "Edit labels" at the bottom of the label list

                var labelsTableParentXpath = "//table[@class = 'H7Bo8e']/..";

                var tableDiv = root.evaluate(labelsTableParentXpath, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

                                

                labelsHideLink = tableDiv.nextSibling.cloneNode (true);

                labelsHideLink.setAttribute ("id", "X4_g2lh_labels_hide");
                labelsHideLink.innerHTML = "Hide";

                var list = GM_getValue('hideList', null);
                if(list == null || list == '') {
                    labelsHideLink.style.display = "none";
                }
                tableDiv.parentNode.insertBefore(labelsHideLink, tableDiv.nextSibling);

                

                // adds event for setting last clicked lable 

                var labelsTableXpath = "//table[@class = 'H7Bo8e']";

                var labels = root.evaluate(labelsTableXpath, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

                

                if (labels && labels.rows.length == 0) {

                    labels = null;

                }



                if (labels) {

                    for(var i = 0; i < labels.rows.length; i++) {

                        var colorCell = labels.rows[i].cells[1];

                        colorCell.addEventListener('click', onLabelMenuActivated, true);

                    }

                }

                

                // adds 'Hide Label' to label menu

                var labelsMenuItemXpath = "//div[@class = 'IHs6ib']/div/div[3]";

                var labelsMenuItem = root.evaluate(labelsMenuItemXpath, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

                labelsMenuHideItem = labelsMenuItem.cloneNode (true);

                labelsMenuHideItem.addEventListener('mousedown', onHideMenuItemClicked  , true);

                

                labelsMenuHideItem.addEventListener('mouseover', function(event){

                    this.setAttribute('class', 'goog-menuitem goog-menuitem-highlight')

                }, true);

                labelsMenuHideItem.addEventListener('mouseout', function(event){

                    this.setAttribute('class', 'goog-menuitem')

                }, true);



                labelsMenuItem.parentNode.appendChild(labelsMenuHideItem);

                

                hideSomeLabels(null);

            }

        }

    }

    

    function onHideMenuItemClicked (event){
        labelsHideLink.style.display = "";
        

        klass=clickedLabelRow.getAttribute("class");

        if(klass.search(/ X4_g2lh_label_hidden/)>=0) {

            klass=klass.replace(/ X4_g2lh_label_hidden/g, "");

            clickedLabelRow.setAttribute("class", klass);

            clickedLabelRow.style.fontStyle = 'normal';

            clickedLabelRow.style.fontSize = '';

            

            var hideList = GM_getValue('hideList', null);

            var hidenLabels = hideList.split('|');

            var labelName = clickedLabelRow.cells[0].textContent;

            labelName=labelName.replace(/\s\(\d+\)$/, "");

            var i = hidenLabels.indexOf(labelName);

            hidenLabels.splice(i,1);

            hideList=hidenLabels.join('|');

            GM_setValue('hideList', hideList);

        } else {

            klass+=" X4_g2lh_label_hidden";

            clickedLabelRow.setAttribute("class", klass);

            

            if(!showAll)

                clickedLabelRow.style.display = 'none';

            clickedLabelRow.style.fontStyle = 'italic';

            clickedLabelRow.style.fontSize = 'smaller';



            var hideList = GM_getValue('hideList', null);

            var labelName = clickedLabelRow.cells[0].textContent;

            labelName=labelName.replace(/\s\(\d+\)$/, "");
            if(hideList == "")
                hideList=labelName;
            else

                hideList+="|"+labelName;

            GM_setValue('hideList', hideList);

        }

    }

    

    function onLabelMenuActivated(){

        clickedLabelRow=this.parentNode;



        if(clickedLabelRow.getAttribute("class").search(/ X4_g2lh_label_hidden/)>=0) {

            labelsMenuHideItem.textContent = "Show label";

        } else {

            labelsMenuHideItem.textContent = "Hide label";

        }

    }

    

    function toggleLink(link)

    {

        showAll ^= true;

        if (labelsHideLink.innerHTML.match(/Hide/)) {

            labelsHideLink.innerHTML = "Show all labels";

            labelsHideLink.removeEventListener('click', hideSomeLabels, true);

            labelsHideLink.addEventListener('click', showAllLabels, true);

        } else {

            labelsHideLink.innerHTML = "Hide some labels";

            labelsHideLink.removeEventListener('click', showAllLabels, true);

            labelsHideLink.addEventListener('click', hideSomeLabels, true);

        } 

     }

    

    function showAllLabels(event) {

        event.cancelBubble=true;
        toggleLink();



        var labelsTableXpath = "//table[@class = 'H7Bo8e']";

        var labels = root.evaluate(labelsTableXpath, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        

        if (labels && labels.rows.length == 0) {

            labels = null;

        }



        if (labels) {

            for(var i = 0; i < labels.rows.length; i++) {

                var labelRow = labels.rows[i];

                var div = labelRow.cells[0].firstChild.firstChild;

                    // fix for folders4gmail

                if (div.nextSibling) div = div.nextSibling;

                

                 labelRow.style.display = null;

            }

        }

    }



    

    function hideSomeLabels(event)

    {

        if(event)

            event.cancelBubble=true;


        toggleLink();

        

        var labelsTableXpath = "//table[@class = 'H7Bo8e']";

        var labels = root.evaluate(labelsTableXpath, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;



        var hideList = GM_getValue('hideList', null);

        if (!hideList) return;



        var hidenLabels = hideList.split('|');

        

        if (labels && labels.rows.length == 0)

            labels = null;



        if (labels) {

            for(var i = 0; i < labels.rows.length; i++) {

                var labelRow = labels.rows[i];

                var div = labelRow.cells[0].firstChild.firstChild;

                    // fix for folders4gmail

                if (div.nextSibling) div = div.nextSibling;

                var labelName = div.firstChild.textContent;

                

                for (var j = 0; j < hidenLabels.length; j++) {

                    var regex = new RegExp("^" + hidenLabels[j], "i");



                    if (labelName.match(regex)) {

                        labelRow.style.display = "none";

                        labelRow.style.fontStyle = 'italic';

                        labelRow.style.fontSize = 'smaller';

                        

                        klass=labelRow.getAttribute("class");

                        if(klass.search(/ X4_g2lh_label_hidden/)==-1)

                            labelRow.setAttribute ("class", klass+" X4_g2lh_label_hidden");

                        

                        break;

                    }

                }

            }

        }

        

        return labels != null;

    }

}, true);