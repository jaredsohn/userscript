// ==UserScript==
// @name           Investools Graphs
// @namespace      Namespace
// @description    Edit Title of Pages
// @include        http://toolbox.investools.com/graphs/*
// ==/UserScript==

SpanNodeList = document.getElementsByTagName('span');
for(i = 0; i < SpanNodeList.length; i++)
  if(SpanNodeList[i].className == 'pagetitle')
  {
    PageTitleSpan = SpanNodeList[i];
    break;
  }

PageTitle = PageTitleSpan.firstChild.data;
symbol = document.getElementById('fQP_symbol').value;

// Snapshot
if(PageTitle.search(/Corporate Snapshot/) != -1 || PageTitle.search(/Option Snapshot/) != -1)
{
  document.title = symbol + " | Snapshot";
}

// ProphetCharts
else if(PageTitle.search(/ProphetCharts/) != -1)
{
  document.title = symbol + " | ProphetCharts";
}

// Comparison Chart
else if(PageTitle.search(/Comparison Snapshot/) != -1)
{
  document.title = symbol + " | Comparison";
}

// Financials
else if(PageTitle.search(/Financials/) != -1)
{
  document.title = symbol + " | Financials";
}

// Earnings Estimates
else if(PageTitle.search(/Earnings Estimates/) != -1)
{
  document.title = symbol + " | Earnings Estimates";
}

// Listed Options
else if(PageTitle.search(/Listed Options/) != -1)
{
  document.title = symbol + " | Options";
}

// Option Greeks
else if(PageTitle.search(/Options Greeks/) != -1)
{
  document.title = symbol + " | Greeks";
}

// Over/Under Evaluation
else if(PageTitle.search(/Over Under/) != -1)
{
  document.title = symbol + " | Over/Under Evaluation";
}

// Probability Calculator
else if(PageTitle.search(/Probability Calculator/) != -1)
{
  document.title = symbol + " | Probability Calculator";
}

// Insider Trading
else if(PageTitle.search(/Insider Trading/) != -1)
{
  document.title = symbol + " | Insider Trading";
}

// Historical Quotes
else if(PageTitle.search(/Historical Quotes/) != -1)
{
  document.title = symbol + " | Historical Quotes";
}

// Company News
else if(PageTitle.search(/Company News/) != -1)
{
  document.title = symbol + " | Company News";
}

// Income Statement
else if(PageTitle.search(/Income Statement/) != -1)
{
  document.title = symbol + " | Income Statement";
}

// Balance Sheet
else if(PageTitle.search(/Balance Sheet/) != -1)
{
  document.title = symbol + " | Balance Sheet";
}

// Cash Flow Statement
else if(PageTitle.search(/Cash Flow/) != -1)
{
  document.title = symbol + " | Cash Flow";
}

// Quarterly Earnings
else if(PageTitle.search(/Quarterly Earnings/) != -1)
{
  document.title = symbol + " | Quarterly Earnings";
}

// Trend Analysis
else if(PageTitle.search(/Trend/) != -1)
{
  document.title = symbol + " | Trend Analysis";
}

// Valuation Analysis
else if(PageTitle.search(/Valuation/) != -1)
{
  document.title = symbol + " | Valuation Analysis";
}

// Industry Snapshot
else if(PageTitle.search(/Industry Snapshot/) != -1)
{
  document.title = symbol + " | Industry";
}

// Industry Snapshot
else if(PageTitle.search(/Index Snapshot/) != -1)
{
  document.title = symbol + " | Index";
}




