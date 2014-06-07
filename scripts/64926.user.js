// ==UserScript==
// @name           PSummary_Filter
// @namespace      -
// @description    Filter projects by type on Folding@home Project Summary pages
// @include        http://fah-web.stanford.edu/psummary*
// ==/UserScript==

var insertTargets, insertTarget, newElement;
// Find insertion point -- just before table
insertTargets = document.getElementsByTagName('table');

if (insertTargets.length>0)
{
    insertTarget = insertTargets.item(0);

    // Include all insertable elements into a div
    newElement = document.createElement('div');

    allProjectsLink = document.createElement('a');
    allProjectsLink.setAttribute('href', '#all');
    allProjectsLink.addEventListener("click", toggleFunctionAll, false);
    allProjectsLink.appendChild(document.createTextNode('all'));

    classicProjectsLink = document.createElement('a');
    classicProjectsLink.setAttribute('href', '#classic');
    classicProjectsLink.addEventListener("click", toggleFunctionClassic, false);
    classicProjectsLink.appendChild(document.createTextNode('classic'));

    smpProjectsLink = document.createElement('a');
    smpProjectsLink.setAttribute('href', '#smp');
    smpProjectsLink.addEventListener("click", toggleFunctionSMP, false);
    smpProjectsLink.appendChild(document.createTextNode('smp'));

    gpuProjectsLink = document.createElement('a');
    gpuProjectsLink.setAttribute('href', '#gpu');
    gpuProjectsLink.addEventListener("click", toggleFunctionGPU, false);
    gpuProjectsLink.appendChild(document.createTextNode('gpu'));

    ps3ProjectsLink = document.createElement('a');
    ps3ProjectsLink.setAttribute('href', '#ps3');
    ps3ProjectsLink.addEventListener("click", toggleFunctionPS3, false);
    ps3ProjectsLink.appendChild(document.createTextNode('ps3'));

    newElement.appendChild(document.createTextNode('Filter page by Project type: '));
    newElement.appendChild(allProjectsLink);

    newElement.appendChild(document.createTextNode(' | '));
    newElement.appendChild(classicProjectsLink);

    newElement.appendChild(document.createTextNode(' | '));
    newElement.appendChild(smpProjectsLink);

    newElement.appendChild(document.createTextNode(' | '));
    newElement.appendChild(gpuProjectsLink);

    newElement.appendChild(document.createTextNode(' | '));
    newElement.appendChild(ps3ProjectsLink);

    insertTarget.parentNode.insertBefore(newElement, insertTarget.previousSibling);
}
recolorRows();

// Fix color schemes. Group projects by server.
function recolorRows()
{
    var allRows = document.getElementsByTagName('table').item(0).getElementsByTagName('tr');

    // Shrink columns to fit page in window
    if (allRows.length > 0)
    {
        var headerRow = allRows.item(0);

        var headerCell0 = headerRow.getElementsByTagName('th').item(0);
        headerCell0.innerHTML = 'Project<br/>Number';

        //var headerCell1 = headerRow.getElementsByTagName('th').item(1);
        //headerCell1.innerHTML = 'Server IP';

        //var headerCell2 = headerRow.getElementsByTagName('th').item(2);
        //headerCell2.innerHTML = 'Work Unit Name';

        var headerCell3 = headerRow.getElementsByTagName('th').item(3);
        headerCell3.innerHTML = 'Number<br/>of Atoms';

        var headerCell4 = headerRow.getElementsByTagName('th').item(4);
        headerCell4.innerHTML = 'Preferred<br/>(days)';

        var headerCell5 = headerRow.getElementsByTagName('th').item(5);
        headerCell5.innerHTML = 'Final<br/>(days)';
    }

    var currentRow, previousRow, currentRowCell, previousRowCell;
    allRows.item(1).setAttribute('bgcolor', '#ffffff');

    var previousBGColor = '#ffffff';
    var previousRowNumber = 1;

    for(var i = 2; i <= allRows.length - 1; i++)
    {
        currentRow = allRows.item(i);
        previousRow = allRows.item(previousRowNumber);
        currentRowCell = currentRow.getElementsByTagName('td').item(1);
        previousRowCell = previousRow.getElementsByTagName('td').item(1);

        currentRow.getElementsByTagName('td').item(2).setAttribute('align','left');
        previousRow.getElementsByTagName('td').item(2).setAttribute('align','left');

        if (currentRow.style.display != 'none')
        {
            previousRowNumber = i;
            if (currentRowCell.innerHTML == previousRowCell.innerHTML)
            {
                currentRow.setAttribute('bgcolor', previousBGColor);
            }
            else
            {
                if (previousBGColor == '#ffffff')
                {
                    currentRow.setAttribute('bgcolor', '#dfdfdf');
                    previousBGColor = '#dfdfdf';
                }
                else
                {
                    currentRow.setAttribute('bgcolor', '#ffffff');
                    previousBGColor = '#ffffff';
                }
            }
        }
    }
}

function toggleFunctionAll()
{
    toggleFunction('all');
}

function toggleFunctionClassic()
{
    toggleFunction('classic');
}

function toggleFunctionSMP()
{
    toggleFunction('smp');
}

function toggleFunctionGPU()
{
    toggleFunction('gpu');
}

function toggleFunctionPS3()
{
    toggleFunction('ps3');
}

function toggleFunction(projectType)
{
    var rows = insertTarget.getElementsByTagName('tr');

    for(var i = 0; i <= rows.length - 1; i++)
    {
        var row = rows.item(i);

        if (projectType == 'all')
        {
            row.style.display = '';
        }
        else
        {
            var cells = row.getElementsByTagName('td');
            if (cells.length > 8)
            {

                var cell = cells.item(8);
                var cellContents = cell.innerHTML;

                if (projectType == 'classic')
                {
                    if (cellContents == 'GROMACS' || cellContents == 'AMBER' || cellContents == 'TINKER' ||
                        cellContents == 'GROST' || cellContents == 'GBGROMACS' || cellContents == 'GROSIMT' ||
                        cellContents == 'DGROMACS' || cellContents == 'DGROMACSB' || cellContents == 'DGROMACSC' ||
                        cellContents == 'GROMACS33' || cellContents == 'GRO-A4' || cellContents == 'ProtoMol' ||
                        cellContents == 'Desmond' || cellContents == 'QMD' )
                    {
                        row.style.display = '';
                    }
                    else
                    {
                        row.style.display = 'none';
                    }
                }
                else if (projectType == 'smp')
                {
                    if (cellContents == 'SHARPEN' || cellContents == 'GRO-SMP' || cellContents == 'GROCVS' ||
                        cellContents == 'GRO-A3')
                    {
                        row.style.display = '';
                    }
                    else
                    {
                        row.style.display = 'none';
                    }
                }
                else if (projectType == 'gpu')
                {
                    if (cellContents == 'GROGPU2' || cellContents == 'ATI-DEV' || cellContents == 'NVIDIA-DEV' ||
                        cellContents == 'GroGPU2-MT' || cellContents == 'GROGPU')
                    {
                        row.style.display = '';
                    }
                    else
                    {
                        row.style.display = 'none';
                    }
                }
                else if (projectType == 'ps3')
                {
                    if (cellContents == 'GRO-PS3')
                    {
                        row.style.display = '';
                    }
                    else
                    {
                        row.style.display = 'none';
                    }
                }
            }
        }
    }

    recolorRows();
}
