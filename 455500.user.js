// ==UserScript==
// @name       Github Pull Request Checkbox Task Summary
// @namespace  http://davidmason.org
// @version    0.6
// @description  Show lists of TODO and Done items based on checkboxes in github comments. Click the 'o' button at the top right. Click titles to toggle lists, click items to scroll comments into view.
// @match      https://github.com/*/pull/*
// @copyright  2014+, drdmason@gmail.com
// ==/UserScript==

(function () {

  var showHideBtn = document.createElement('button');
  showHideBtn.classList.add('minibutton');
  showHideBtn.style.zIndex = 9999;
  showHideBtn.style.position = 'fixed';
  showHideBtn.style.top = 0;
  showHideBtn.style.right = 0;
  showHideBtn.addEventListener('click', toggleDiv);

  var iconSpan = document.createElement('span');
  iconSpan.classList.add('icon');
  var listIcon = document.createElement('b');
  listIcon.classList.add('octicon');
  listIcon.classList.add('octicon-file-text');
  iconSpan.appendChild(listIcon);
  showHideBtn.appendChild(iconSpan);

  document.body.appendChild(showHideBtn);


  var div = document.createElement('div');
  div.classList.add('bubble');
  div.style.zIndex = 9998;
  div.style.position = 'fixed';
  div.style.top = 0;
  div.style.bottom = 0;
  div.style.overflow = 'auto';
  div.style.left = '110%';
  div.style.width = '30%';
  document.body.appendChild(div);
  
  function toggleDiv () {
    if (div.style.left === '70%') {
      div.style.left = '110%';
      showHideBtn.classList.remove('selected');
    } else {
      div.style.left = '70%';
      showHideBtn.classList.add('selected');
      refreshList();
    }
  }

  var toggleOldDiffsBtn = document.createElement('button');
  toggleOldDiffsBtn.textContent = 'show old diffs';
  toggleOldDiffsBtn.classList.add('minibutton');
  toggleOldDiffsBtn.style.float = 'right';
  toggleOldDiffsBtn.style.marginRight = '44px';
  toggleOldDiffsBtn.addEventListener('click', function () {
    toggleOldDiffsBtn.classList.toggle('selected');
    var containers = document.querySelectorAll('.outdated-diff-comment-container'),
        showOutdated = toggleOldDiffsBtn.classList.contains('selected'),
        i;
    for (i=0; i<containers.length; i++) {
      containers[i].classList.toggle('open', showOutdated);
    }

  });
  div.appendChild(toggleOldDiffsBtn);

  var refreshBtn = document.createElement('button');
  refreshBtn.textContent = 'refresh tasks';
  refreshBtn.classList.add('minibutton');
  refreshBtn.style.float = 'right';
  refreshBtn.style.marginRight = '8px';
  refreshBtn.addEventListener('click', refreshList);
  div.appendChild(refreshBtn);

  function addList (title) {
    //
    var newList = document.createElement('ul');
    newList.classList.add('list-group');
    newList.classList.add('selected');
    newList.style.backgroundColor = '#fff';
    var listHeading = document.createElement('h2');
    listHeading.innerText = title;
    listHeading.classList.add('minibutton');
    listHeading.addEventListener('click', function () {
      newList.classList.toggle('hidden');
      listHeading.classList.toggle('selected');
    });
    div.appendChild(listHeading);
    div.appendChild(newList);

    return newList;
  }

  todoList = addList('TODO');
  div.appendChild(document.createElement('br'));
  doneList = addList('Done');

  (function () {
    var checkboxes = document.querySelectorAll('.task-list-item-checkbox'),
        i;
    for (i=0; i < checkboxes.length; i++) {
      checkboxes[i].addEventListener('change', refreshList);
    }
  })()

  function refreshList () {
    var todoChecks = document.querySelectorAll('.task-list-item-checkbox:not(:checked)'),
        doneChecks = document.querySelectorAll('.task-list-item-checkbox:checked'),
        checkbox, item, i;

    empty(todoList);


    for (i=0; i < todoChecks.length; i++) {
      todoList.appendChild(createListItem(todoChecks[i]));
    }

    empty(doneList);
    for (i=0; i < doneChecks.length; i++) {
      doneList.appendChild(createListItem(doneChecks[i]));
    }

    function createListItem(checkbox) {
      item = document.createElement('li');
      item.textContent = checkbox.parentElement.textContent.trim();
      item.classList.add('list-group-item');
      item.addEventListener('mouseover', highlight(item));
      item.addEventListener('mouseout', unhighlight(item));
      item.addEventListener('click', scrollTo(checkbox));
      item.style.cursor = 'default';
      return item;
    }

    function highlight (item) {
      return function () {
        item.classList.add('navigation-focus');
      };
    }

    function unhighlight (item) {
      return function () {
        item.classList.remove('navigation-focus');
      }
    }

    function scrollTo (element) {
      return function () {
        element.scrollIntoViewIfNeeded();
        for (var time=0; time < 350; time=time+100) {
          setTimeout(function () { element.parentElement.classList.toggle('heat1'); }, time);
        }
      }
    }

    function empty(element) {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    }
  }
})();