// ==UserScript==
// @name jira-to-scp
// @match https://jira.openmindonline.it/*
// ==/UserScript==


  var e = document.querySelector('#key-val[data-issue-key]'),
    re = /(\w+)-(\d+)/,
    issue = e && e.dataset.issueKey,
    text = issue && issue.replace(re, "SCP-$2"),
    url = issue && issue.replace(re, "http://www.scp-wiki.net/scp-$2"),
    link = document.createElement('a'),
    bc = document.querySelector('.aui-nav-breadcrumbs'),
    li = document.createElement('li');

  link.href = url
  link.innerText = text
  link.target = '_blank'

  li.appendChild(link)
  bc.appendChild(li)
