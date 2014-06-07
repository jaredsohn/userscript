// ==UserScript==
// @name           Investools Portfolio
// @namespace      Namespace
// @description    Places the name of the portfolio in the title of the page
// @include        http://toolbox.investools.com/portfolio/*
// ==/UserScript==

NodeSelect = document.getElementById('cboPList');
NodeOptionList = NodeSelect.childNodes;

for(i = 0; i < NodeOptionList.length; i += 2)
  if(NodeOptionList[i].getAttribute('selected') != null)
  {
    CurrentPortfolio = NodeOptionList[i].innerHTML;
    break;
  }

if(location.href.search(/edit/) != -1)
  PortfolioPageType = 'Edit';
else
  PortfolioPageType = 'View';

document.title = CurrentPortfolio + " | Portfolio " + PortfolioPageType;
