// ==UserScript==
// @name          Google Financial Statement Analyzer
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Analyzes Google Finance Balance Sheet and Income Statement
// @include       http://www.google.com/finance?fstype*
// @author        Srinivas Singanamalla
// ==/UserScript==


// callback for mouseover
function setStatementAndPeriodType() {
    var ids = ["inc", "bal", "cas"];
    for(var i=0; i<ids.length; i++) {
        var elem = document.getElementById(ids[i]);
        if("ac" == elem.getAttribute("class")) {
            GM_setValue("statementType", ids[i]);
            break;
        }
    }

    ids = ["interim", "annual"];
    for(var i=0; i<ids.length; i++) {
        var elem = document.getElementById(ids[i]);
        if("ac" == elem.getAttribute("class")) {
            GM_setValue("periodType", ids[i]);
            break;
        }
    }

}
function addAnalyzeAndClearBtn() {
    var divs = document.body.getElementsByTagName('div');
    var heading = null;
    for(var i=0; i<divs.length; i++) {
        if("hdg" == divs[i].getAttribute('class')) {
            heading = divs[i];
            break;
        }
    }
    heading.style.position = 'relative';

    var div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.right = 0;
    div.style.top = 0;
    heading.appendChild(div);

    var analyzeBtn = document.createElement('button');
    analyzeBtn.setAttribute("id", "analyzeBtn");
    analyzeBtn.appendChild(document.createTextNode("Analyze"));
    analyzeBtn.addEventListener("click", analyze, false);
    div.appendChild(analyzeBtn);

    var clearBtn = document.createElement('button');
    clearBtn.appendChild(document.createTextNode("Clear"));
    clearBtn.style.marginLeft = '3px';
    clearBtn.addEventListener("click", clear, false);
    div.appendChild(clearBtn);
}


function setupSheets(x) {
    for (var i = 0; i < x.length; i++) {
        switch (x[i].n) {
            case 'balannual':
                annualBal = x[i];
                break;
            case 'balinterim':
                interimBal = x[i];
                break;
            case 'incannual':
                annualInc = x[i];
                break;
            case 'incinterim':
                interimInc = x[i];
                break;
            case 'casannual':
                annualCas = x[i];
                break;
            case 'casinterim':
                interimCas = x[i];
                break;
        }
    }
}

function getCurrentSheet() {
    var periodType = GM_getValue("periodType");
    var statementType = GM_getValue("statementType");
    var current = null;
    var key = statementType+periodType;
        switch (key) {
        case 'balannual':
            current = annualBal;
            break;
        case 'balinterim':
            current = interimBal;
            break;
        case 'incannual':
            current = annualInc;
            break;
        case 'incinterim':
            current = interimInc;
            break;
        case 'casannual':
            current = annualCas;
            break;
        case 'casinterim':
            current = interimCas;
            break;
    }
    return current;
}

function getAnnualBal() {
    return annualBal;
}

function getInterimBal() {
    return interimBal;
}

function getAnnualInc() {
    return annualInc;
}
function getInterimInc() {
    return interimInc;
}

function getAnnualCas() {
    return annualCas;
}
function getInterimCas() {
    return interimCas;
}


function analyze() {
    var f = new GFinanceDomParser();
    var x = f.parseDom();
    setupSheets(x);
    _domParsed = true;
    showMessages();
}


function showMessages() {
    if(!_domParsed) return;

    clearSvgAlertsDiv();
    var liContents = '';
    var title = "Alerts for ";
    var statementType = GM_getValue("statementType");
    var periodType = GM_getValue("periodType");
    var messages = null;
    switch (statementType) {
        case 'inc':
            if(periodType == 'annual') {
                messages = Analyzer.analyzeAnnualIncomeStatement(getAnnualInc());
            } else if(periodType == 'interim') {
                messages = Analyzer.analyzeInterimIncomeStatement(getInterimInc());
            }
            title += "Income Statement";
            break;
        case 'cas':
            if(periodType == 'annual') {
                messages = Analyzer.analyzeAnnualCashFlow(getAnnualCas());
            } else if(periodType == 'interim') {
                messages = Analyzer.analyzeInterimCashFlow(getInterimCas());
            }
            title += "Cash Flow";
            break;
        case 'bal':
            if(periodType == 'annual') {
                messages = Analyzer.analyzeAnnualBalanceSheet(getAnnualBal());
            } else if(periodType == 'interim') {
                messages = Analyzer.analyzeInterimBalanceSheet(getInterimBal());
            }
            title += "Balance Sheet";
            break;
        default:
            break;
    }

    if(messages) {
        for(var i in messages) {
            liContents = liContents.concat('<li>' + messages[i] + '</li>\r\n');
        }
    }
    if(messages && messages.length >0) {
        title +=" (recent period) "
        getAlertsDiv().innerHTML = "<h3 style=\"color:black;\">" + title + "</h3>" +
        "<ul style=\"color:#AA0033; text-font:bold\">\r\n" +
        liContents +
        "</ul>\r\n";
    }
}

function clearSvgAlertsDiv() {
	getAlertsDiv().innerHTML = "";
    getSvgDiv().innerHTML = "";
}
function clear() {
    clearSvgAlertsDiv();
    _domParsed = false;
}

function getAlertsDiv() {
    return document.getElementById("alerts");
}
function getSvgDiv() {
    return document.getElementById("svgDiv");
}

function addAlertsAndSvgDiv() {
    var divs = document.body.getElementsByTagName('div');
    var insertBeforeThisDiv = null;
    var dbody = null;
    for(var i=0; i<divs.length; i++) {
        if("dbody" == divs[i].getAttribute('class')) {
            dbody = divs[i];
            continue;
        }
        if("incinterimdiv" == divs[i].getAttribute('id')) {
            insertBeforeThisDiv = divs[i];
            break;
        }
    }

    var svgDiv = window.document.createElement('div');
    svgDiv.setAttribute("id", "svgDiv");
    dbody.insertBefore(svgDiv, insertBeforeThisDiv);

    var alertsDiv = window.document.createElement('div');
    alertsDiv.setAttribute("id", "alerts");
    alertsDiv.style.clear = "both";
    dbody.insertBefore(alertsDiv, insertBeforeThisDiv);
}


function updateAnalyzeButtonText() {
    var statementType = GM_getValue("statementType");
    var periodType = GM_getValue("periodType");

    var btnText;
    switch (statementType) {
        case 'inc':
            if(periodType == 'annual') {
                btnText = 'Analyze Annual Income Statement';
            } else if(periodType == 'interim') {
                btnText = 'Analyze Interim Income Statement';
            }
            break;
        case 'cas':
            if(periodType == 'annual') {
                btnText = 'Analyze Annual Cashflow Statement';
            } else if(periodType == 'interim') {
                btnText = 'Analyze Interim Cashflow Statement';
            }
            break;
        case 'bal':
            if(periodType == 'annual') {
                btnText = 'Analyze Annual BalanceSheet';
            } else if(periodType == 'interim') {
                btnText = 'Analyze Interim BalanceSheet';
            }
            break;
        default:
            break;
    }

    if(btnText) {
        document.getElementById("analyzeBtn").innerHTML = btnText;
    }
    if('cas' == statementType) {
        document.getElementById("analyzeBtn").disabled = true;
    } else {
        document.getElementById("analyzeBtn").disabled = false;
    }
}

//finance site dependent
function attachListenerToStatementLinks() {
    var inc = document.getElementById("inc");
    inc.addEventListener("click", function(event) {
        GM_setValue("statementType", "inc");
        //updateAnalyzeButtonText();
        //clear();
        showMessages();
            }, false);
    var bal = document.getElementById("bal");
    bal.addEventListener("click", function() {
        GM_setValue("statementType", "bal");
                //updateAnalyzeButtonText();
        //clear();
        showMessages();
    }, false);

    var cas = document.getElementById("cas");
    cas.addEventListener("click", function() {
        GM_setValue("statementType", "cas");
                //updateAnalyzeButtonText();
        //clear();
        showMessages();
    }, false);

    var annual = document.getElementById("annual");
    annual.addEventListener("click", function() {
                GM_setValue("periodType", "annual");
        //updateAnalyzeButtonText();
        //clear();
        showMessages();
    }, false);
    var interim = document.getElementById("interim");
    interim.addEventListener("click", function() {
        GM_setValue("periodType", "interim");
                //updateAnalyzeButtonText();
        //clear();
        showMessages();
    }, false);
}

/**
 *
**/

function main() {
    setStatementAndPeriodType();
    addAnalyzeAndClearBtn();
    addAlertsAndSvgDiv();
    attachListenerToStatementLinks();
}

function FinanceDomParser() {
}

FinanceDomParser.prototype.parseDom = function() {
    }

FinanceDomParser.trim = function(str){
    var lIndex = 0;
    var rIndex = str.length-1;

    while(lIndex<str.length) {
        if(String(str.charAt(lIndex)).search(/\s/) == 0) {
            lIndex++;

        } else {
            break;
        }
    }

    if(lIndex == str.length) return '';

    while(rIndex>0) {
        if(String(str.charAt(rIndex)).search(/\s/) == 0) {
            rIndex--;
        } else {
            break;
        }
    }
    return str.substring(lIndex, rIndex+1);
}


/**
  * @extends FinanceDomParser
  */
function GFinanceDomParser() {
    this.inherits = FinanceDomParser;
    this.inherits();
    this.b = 11;
    delete this.inherits;
}

GFinanceDomParser.prototype = new FinanceDomParser();
GFinanceDomParser.prototype.constructor = GFinanceDomParser;

GFinanceDomParser.getBrowserIndependentMap = function(){
    var map = new Array();

    map['incinterimdiv'] = 'incinterim';
    map['casinterimdiv'] = 'casinterim';
    map['balinterimdiv'] = 'balinterim';
    map['incannualdiv'] = 'incannual';
    map['casannualdiv'] = 'casannual';
    map['balannualdiv'] = 'balannual';

    // Income Statement
    map['Total Revenue'] = IncomeStatement.TOTAL_REVENUE;
    map['Cost of Revenue, Total'] = IncomeStatement.TOTAL_COST_OF_REVENUE;
    map['Gross Profit'] = IncomeStatement.GROSS_PROFIT;
    map['Research & Development'] = IncomeStatement.RESEARCH_AND_DEVELOPMENT;
    map['Total Operating Expense'] = IncomeStatement.TOTAL_OPERATING_EXPENSES;
    map['Operating Income'] = IncomeStatement.OPERATING_INCOME;
    map['Unusual Expense (Income)'] = IncomeStatement.UNUSUAL_INCOME_EXPENSE;
    map['Net Income'] = IncomeStatement.NET_INCOME;
    map['Net Income Before Extra. Items'] = IncomeStatement.NET_INCOME_BEFORE_EXTRA_ITEMS;

    // Balance Sheet
    map['Cash and Short Term Investments'] = BalanceSheet.CASH_AND_SHORT_TERM_INVESTMENTS;
    map['Total Receivables, Net'] = BalanceSheet.TOTAL_RECEIVABLES_NET;
    map['Total Inventory'] = BalanceSheet.TOTAL_INVENTORY;
    map['Total Current Assets'] = BalanceSheet.TOTAL_CURRENT_ASSETS;
    map['Goodwill, Net'] = BalanceSheet.NET_GOODWILL;
    map['Intangibles, Net'] = 'in';
    map['Total Assets'] = BalanceSheet.TOTAL_ASSETS;
    map['Total Current Liabilities'] = BalanceSheet.TOTAL_CURRENT_LIABILITIES;
    map['Total Long Term Debt'] = 'tltb';
    map['Total Debt'] = BalanceSheet.TOTAL_DEBT;
    map['Total Liabilities'] = BalanceSheet.TOTAL_LIABILITIES;
    map['Retained Earnings (Accumulated Deficit)'] = 're';
    map['Total Equity'] = BalanceSheet.TOTAL_EQUITY;
    map['Total Liabilities & Shareholders\' Equity'] = 'tlse';
    map['Total Common Shares Outstanding'] = BalanceSheet.TOTAL_COMMON_SHARES_OUTSTANDING;

    // CASH FLOW
    map['Net Income/Starting Line'] = 'nisl';
    map['Cash from Operating Activities'] = 'coa';
    map['Cash from Investing Activities'] = 'cia';
    map['Cash from Financing Activities'] = 'cfa';
    map['Net Change in Cash'] = 'ncc';
    return map;
}

GFinanceDomParser.prototype._getTableRows = function(id) {
    var div = window.document.getElementById(id);
    var tables = div && div.getElementsByTagName('table');
    return tables && tables[0].rows;
}

GFinanceDomParser.prototype._extractDates = function(row){
    var colsLen = row.cells.length;
    var colsArray = new Array();
    for (var j = 1; j < colsLen; j++) {
        colsArray.push(FinanceDomParser.trim(row.cells[j].textContent));
    }
    return colsArray;
}

GFinanceDomParser.prototype._parseDomRowsAndCreateJson = function(id){
    
    var rows = this._getTableRows(id);
    if (!rows)
        return null;

    var fin = {};
    fin.n = GFinanceDomParser.getBrowserIndependentMap()[id];
    fin.val = new Array();
    var setDates = true;
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].cells.length > 1) {

            var textContent = FinanceDomParser.trim(rows[i].cells[0].textContent);
            if (setDates && textContent.search(/except for per share items/)) {
                fin.da = this._extractDates(rows[i]);
                setDates = false;
            }
            else {
                var implIndependentKey = GFinanceDomParser.getBrowserIndependentMap()[textContent];
                fin.name = textContent;
                if (implIndependentKey) {
                    var colsLen = rows[i].cells.length;
                    var colsArray = [];
                    for (var j = 1; j < colsLen; j++) {
                        var val = FinanceDomParser.trim(rows[i].cells[j].textContent).replace(/,/g,'');
                        if(isNaN(val)) {
                            colsArray.push(0.00);
                        }else {
                            colsArray.push((parseInt(val)));
                        }

                    }
                    fin.val[implIndependentKey] = colsArray;
                }
            }
        }
    }
    return fin;
}

GFinanceDomParser.prototype.parseDom = function() {
        var divIds = ['incinterimdiv','incannualdiv', 'balinterimdiv','balannualdiv', 'casinterimdiv', 'casannualdiv']

    var x = new Array();
    for(var id in divIds) {
        var fin = this._parseDomRowsAndCreateJson(divIds[id]);
        x.push(fin);
    }
        return x;
}

function Finance() {

}
Finance.BOOK_VALUE_PER_SHARE = 'bvps';
Finance.CURRENT_RATIO = 'cr';
Finance.DEBT_TO_EQUITY_RATIO = 'der';
Finance.INVENTORY_TO_CURRENT_ASSETS_RATIO = 'icar';
Finance.RETURN_ON_TOTAL_ASSETS = 'rta';
Finance.RECEIVABLE_TURN_IN_DAYS = 'rtd';

function Analyzer() {
}

Analyzer.analyzeInterimBalanceSheet = function(sheet) {
    var bs = new BalanceSheet(sheet);

    drawSVGChart(getSvgDiv(), bs.getValues(Finance.CURRENT_RATIO), "Current Ratio");
    drawSVGChart(getSvgDiv(), bs.getValues(Finance.DEBT_TO_EQUITY_RATIO), "Debt to Equity Ratio");
    drawSVGChart(getSvgDiv(), bs.getValues(Finance.INVENTORY_TO_CURRENT_ASSETS_RATIO), "Inv to Curr Assets Ratio");
    drawSVGChart(getSvgDiv(), bs.getValues(Finance.BOOK_VALUE_PER_SHARE), "Book value per share");

    var messages = bs.analyze();
    return messages;
}

Analyzer.analyzeAnnualBalanceSheet = function(sheet) {
    var bs = new BalanceSheet(sheet);

    drawSVGChart(getSvgDiv(), bs.getValues(Finance.CURRENT_RATIO), "Current Ratio");
    drawSVGChart(getSvgDiv(), bs.getValues(Finance.DEBT_TO_EQUITY_RATIO), "Debt to Equity Ratio");
    drawSVGChart(getSvgDiv(), bs.getValues(Finance.INVENTORY_TO_CURRENT_ASSETS_RATIO), "Inv to Curr Assets Ratio");
    drawSVGChart(getSvgDiv(), bs.getValues(Finance.BOOK_VALUE_PER_SHARE), "Book value per share");
    drawSVGChart(getSvgDiv(), bs.getValues(Finance.RETURN_ON_TOTAL_ASSETS), "Annual Return on Total Assets");
    drawSVGChart(getSvgDiv(), bs.getValues(Finance.RECEIVABLE_TURN_IN_DAYS), "Annual Receivable Turn In Days");

    var messages = bs.analyze();
    return messages;
}

Analyzer.analyzeInterimIncomeStatement = function(sheet) {
    var inc = new IncomeStatement(sheet);

    drawSVGChart(getSvgDiv(), inc.getValues(IncomeStatement.GROSS_PROFIT_MARGIN), "Gross Profit Margin");
    drawSVGChart(getSvgDiv(), inc.getValues(IncomeStatement.NET_PROFIT_MARGIN), "Net Profit Margin");
    drawSVGChart(getSvgDiv(), inc.getValues(IncomeStatement.OPERATING_MARGIN), "Operating Margin");
    drawSVGChart(getSvgDiv(), inc.getValues(IncomeStatement.R_AND_D_TO_EXPENSE_RATIO), "R&D to Operating Expense");

    var messages = inc.analyze();
    return messages;
}

Analyzer.analyzeAnnualIncomeStatement = function(sheet) {
        var inc = new IncomeStatement(sheet);

    drawSVGChart(getSvgDiv(), inc.getValues(IncomeStatement.GROSS_PROFIT_MARGIN), "Gross Profit Margin");
    drawSVGChart(getSvgDiv(), inc.getValues(IncomeStatement.NET_PROFIT_MARGIN), "Net Profit Margin");
    drawSVGChart(getSvgDiv(), inc.getValues(IncomeStatement.OPERATING_MARGIN), "Operating Margin");
    drawSVGChart(getSvgDiv(), inc.getValues(IncomeStatement.R_AND_D_TO_EXPENSE_RATIO), "R&D to Operating Expense");

    var messages = inc.analyze();
    return messages;
}


Analyzer.analyzeInterimCashFlow = function(sheet) {
        return null;
}

Analyzer.analyzeAnnualCashFlow = function(sheet) {
        return null;
}

function BalanceSheet(sheet) {
    this.sheet = sheet;
}

BalanceSheet.TOTAL_INVENTORY = 'ti';
BalanceSheet.TOTAL_CURRENT_ASSETS = 'tca';
BalanceSheet.TOTAL_ASSETS = 'ta';
BalanceSheet.TOTAL_CURRENT_LIABILITIES = 'tcl';
BalanceSheet.NET_GOODWILL = 'gn';
BalanceSheet.TOTAL_LIABILITIES = 'tl';
BalanceSheet.TOTAL_RECEIVABLES_NET   = 'trn';
BalanceSheet.TOTAL_DEBT = 'db';
BalanceSheet.TOTAL_EQUITY = 'te';
BalanceSheet.TOTAL_COMMON_SHARES_OUTSTANDING = 'tcso';
BalanceSheet.CASH_AND_SHORT_TERM_INVESTMENTS = 'cesi';

BalanceSheet.prototype.analyze = function() {
    var messages = new Array();
    var index = 0;
    // CURRENT RATIO
    var currentRatio = this.getCurrentRatio(index);
        var crMessage = "Current Ratio is " + currentRatio + ". Current Ratio less than 1 may not be good";
    /**
    if (currentRatio > 4) {
        crMessage += "\nA number this high means that management has so much cash on hand, they may be doing a poor job of investing it.  This is one of the reasons it is important to read the annual report, 10k and 10q of a company.  Most of the time, the executives will discuss their plans in these reports.  If you notice a large pile of cash building up and the debt has not increased at the same rate (meaning the money is not borrowed), you may want to try to find out what is going on";
    }**/
    messages.push(crMessage);

    // Analyzing inventory to Current Assets If 70% of a company's current
    // assets are tied up in inventory and the business does not have a
    // relatively low turn rate (less than 30 days), it may be a signal that
    // something is seriously wrong and an inventory write-down is unavoidable.
    // calculating inventory turn rate current years cost of goods sold/avg.
    // inventory for the period


    var invToCurrAssetsRatio = this.getInvToCurrAssetsRatio(index);
    messages.push("Inventory to Current Assets Ratio is " + invToCurrAssetsRatio);
    if(invToCurrAssetsRatio>0) {
        messages.push("Inventory Turn is " + getInventoryTurnInDays(index) + " days");
    }
    messages.push("Receivable Turn is " + getReceivableTurnInDays(index) + " days");
    if(invToCurrAssetsRatio > 0.7) {
        if(getInventoryTurnInDays(index)>30) {
            messages.push("More than 70% of a company\'s current assets are tied up in inventory and the business has a relatively high inventory turn rate (>30) ");
        }
    }

    if(this.getTotalDebt(index) == 0) {
        messages.push("Total debt is Zero");
    }

    //DEBT TO EQUITY RATIO
    var debtEquityRatio = this.getTotalDebtToEquityRatio(index);
    crMessage = "Debt to Equity Ratio is " + debtEquityRatio;
    if(debtEquityRatio>0.45) {
        crMessage += ". Company having a debt to equity ratio of over 40 to 50% should be looked at more carefully looked upon for any liquidity problems.  If the company's working capital, and current / quick ratios drastically low, this could be a sign of trouble_b";
    }
    messages.push(crMessage);

    // Book Value per share
    messages.push("Book value per share " + this.getBookValuePerShare(index));

    // Return on Total Assets
    messages.push("Return on Total Assets " + getReturnOnAssets(index));
    // ". Companies like MSFT have high ROA, and its book value is much lower than the market price");

    return messages;
}


BalanceSheet.prototype.getTotalDebt = function(index) {
        return parseInt(this.sheet.val[BalanceSheet.TOTAL_DEBT][index]);
}
BalanceSheet.prototype.getCurrentRatio = function(index) {
    var currentRatio = parseInt(this.sheet.val[BalanceSheet.TOTAL_CURRENT_ASSETS][index])/parseInt(this.sheet.val[BalanceSheet.TOTAL_CURRENT_LIABILITIES][index]);
    return currentRatio.toFixed(2);
}

BalanceSheet.prototype.getInvToCurrAssetsRatio = function(index) {
    var invToCurrAssetsRatio = parseInt(this.sheet.val[BalanceSheet.TOTAL_INVENTORY][index])/parseInt(this.sheet.val[BalanceSheet.TOTAL_CURRENT_ASSETS][index]);
    return invToCurrAssetsRatio.toFixed(2);
}

BalanceSheet.prototype.getEquity = function(index) {
    return parseInt(this.sheet.val[BalanceSheet.TOTAL_EQUITY][index]);
}


BalanceSheet.prototype.getTotalDebtToEquityRatio = function(index) {
    var ratio = this.getTotalDebt(index)/this.getEquity(index);
    return ratio.toFixed(2);
}

BalanceSheet.prototype.getBookValue = function(index) {
    var bv = parseInt(this.sheet.val[BalanceSheet.TOTAL_ASSETS][index]) - parseInt(this.sheet.val[BalanceSheet.TOTAL_LIABILITIES][index]);
    return bv;
}

BalanceSheet.prototype.getValues = function(key){
    var len = this.sheet.val[BalanceSheet.TOTAL_ASSETS].length;
    var values = new Array();
    var value = null;
    for (var i = 0; i < len; i++) {
        switch (key) {
            case Finance.BOOK_VALUE_PER_SHARE:
                value = this.getBookValuePerShare(i);
                break;
            case Finance.CURRENT_RATIO:
                value = this.getCurrentRatio(i);
                break;
            case Finance.DEBT_TO_EQUITY_RATIO:
                value = this.getTotalDebtToEquityRatio(i);
                break;
            case Finance.INVENTORY_TO_CURRENT_ASSETS_RATIO:
                value = this.getInvToCurrAssetsRatio(i);
                break;
            case Finance.RETURN_ON_TOTAL_ASSETS:
                value = getReturnOnAssets(i);
                break;
            case Finance.RECEIVABLE_TURN_IN_DAYS:
                value = getReceivableTurnInDays(i);
                break;
        }
        if (value != null) {
            values.push(value);
        }
    }
    return values;
}



BalanceSheet.prototype.getBookValuePerShare = function(index) {
    var bvps = this.getBookValue(index)/parseInt(this.sheet.val[BalanceSheet.TOTAL_COMMON_SHARES_OUTSTANDING][index]);
    return bvps.toFixed(2);
}


IncomeStatement.TOTAL_COST_OF_REVENUE = 'tcr';
IncomeStatement.TOTAL_REVENUE = 'tr';

IncomeStatement.GROSS_PROFIT = 'gp';
IncomeStatement.GROSS_PROFIT_MARGIN = 'gpm';
IncomeStatement.NET_PROFIT_MARGIN = 'npm';
IncomeStatement.RESEARCH_AND_DEVELOPMENT = 'rd';
IncomeStatement.R_AND_D_TO_EXPENSE_RATIO = 'rder';
IncomeStatement.TOTAL_OPERATING_EXPENSES = 'toe';
IncomeStatement.OPERATING_INCOME = 'oi';
IncomeStatement.OPERATING_MARGIN = 'om';
IncomeStatement.UNUSUAL_INCOME_EXPENSE = 'uie';

IncomeStatement.ACCOUNTING_CHANGE = 'ac';
IncomeStatement.NET_INCOME_BEFORE_EXTRA_ITEMS = 'nibei';
IncomeStatement.NET_INCOME = 'ni';

IncomeStatement.prototype.analyze = function() {
    var messages = new Array();
    var index = 0;
    // Gross Profit Margin
    var gpm = this.getGrossProfitMargin(index);
    messages.push("Gross Profit Margin is " + gpm + ". Sudden change in gross profit margin as compared to historical levels should be investigated.");
    //If there is an unusual expense, report it.
    if(this.getUnusualExpense(index)>0) {
        var unusualFactor = (this.getUnusualExpense(index)/this.getTotalOperatingExpense(index)).toFixed(2);
        messages.push("The Unusual Expense is " + unusualFactor + " of the total operating expenses. If the unusual expenses were not present, the Operating income would have been increased to " + parseFloat(this.getUnusualExpense(index) + this.getOperatingIncome(index)) );
    }

    if(this.getNetIncome() - this.sheet.val[IncomeStatement.NET_INCOME_BEFORE_EXTRA_ITEMS][index]>0) {
        messages.push("There are some expenses for Accounting Charge, Discontinued Operations or Extraordinary. These may be one time. Please investigate.")
    }
    messages.push("Operating Margin is " + this.getOperatingMargin(index) + ". Its a measure of management efficiency. Compare it with the competitors.")

    //Interest Coverage Ratio
    return messages;
}

IncomeStatement.prototype.getTotalRevenue = function(index) {
    return this.sheet.val[IncomeStatement.TOTAL_REVENUE][index];
}

IncomeStatement.prototype.getGrossProfit = function(index) {
    return this.sheet.val[IncomeStatement.GROSS_PROFIT][index];
}

IncomeStatement.prototype.getGrossProfitMargin = function(index) {
    var gpm = this.getGrossProfit(index)/this.getTotalRevenue(index)
    return gpm.toFixed(2);
}
IncomeStatement.prototype.getUnusualExpense = function(index) {
    return this.sheet.val[IncomeStatement.UNUSUAL_INCOME_EXPENSE][index];
}

IncomeStatement.prototype.getTotalOperatingExpense = function(index) {
    return this.sheet.val[IncomeStatement.TOTAL_OPERATING_EXPENSES][index];
}

IncomeStatement.prototype.getOperatingIncome = function(index) {
    return this.sheet.val[IncomeStatement.OPERATING_INCOME][index];
}

IncomeStatement.prototype.getOperatingMargin = function(index) {
    return (this.getOperatingIncome(index)/this.getTotalRevenue(index)).toFixed(2);
}

IncomeStatement.prototype.getNetIncome = function(index) {
    return this.sheet.val[IncomeStatement.NET_INCOME][index];
}

IncomeStatement.prototype.getNetProfitMargin = function(index) {
    return (this.getNetIncome(index)/this.getTotalRevenue(index)).toFixed(2);
}

IncomeStatement.prototype.getRAndDToExpenseRatio = function(index) {
    return (this.sheet.val[IncomeStatement.RESEARCH_AND_DEVELOPMENT][index]/this.getTotalOperatingExpense(index)).toFixed(2);
}

IncomeStatement.prototype.getValues = function(key){
    var len = this.sheet.val[IncomeStatement.TOTAL_REVENUE].length;
    var values = new Array();
    var value = null;
    for (var i = 0; i < len; i++) {
        switch (key) {
            case IncomeStatement.GROSS_PROFIT_MARGIN:
                value = this.getGrossProfitMargin(i);
                break;
            case IncomeStatement.NET_PROFIT_MARGIN:
                value = this.getNetProfitMargin(i);
                break;
            case IncomeStatement.OPERATING_MARGIN:
                value = this.getOperatingMargin(i);
                break;
            case IncomeStatement.R_AND_D_TO_EXPENSE_RATIO:
                value = this.getRAndDToExpenseRatio(i);
                break;
        }
        if (value != null) {
            values.push(value);
        }
    }
    return values;
}

function IncomeStatement(sheet) {
    this.sheet = sheet;
}

function getReturnOnAssets(index) {
    var ni = parseInt(getAnnualInc().val[IncomeStatement.NET_INCOME][index]);
    var totalAssets = parseInt(getAnnualBal().val[BalanceSheet.TOTAL_ASSETS][index]);
    var perc = (ni/totalAssets)*100;
    return perc.toFixed(2);
}

function getInventoryTurnInDays(index) {
    if (index + 1 > getAnnualBal().val[BalanceSheet.TOTAL_INVENTORY].length - 1) {
                return -9999;
    }
    else {
        var costOfRev = parseInt(getAnnualInc().val[IncomeStatement.TOTAL_COST_OF_REVENUE][index]);
        var avgInv = (parseInt(getAnnualBal().val[BalanceSheet.TOTAL_INVENTORY][index]) + parseInt(getAnnualBal().val[BalanceSheet.TOTAL_INVENTORY][index + 1])) / 2;
                        var turns = 365 * avgInv / costOfRev
        return turns.toFixed(2);
    }
}

function getReceivableTurnInDays(index) {
    if (index + 1 > getAnnualBal().val[BalanceSheet.TOTAL_RECEIVABLES_NET].length - 1) {
        return null;
    }
    else {
        var totalRev = parseInt(getAnnualInc().val[IncomeStatement.TOTAL_REVENUE][index]);
        var avgReceivables = (parseInt(getAnnualBal().val[BalanceSheet.TOTAL_RECEIVABLES_NET][index]) + parseInt(getAnnualBal().val[BalanceSheet.TOTAL_RECEIVABLES_NET][index + 1])) / 2;
        var turns = 365 * avgReceivables / totalRev;
        console.log("index " + index);
        console.log("rturns " + turns);
        return turns.toFixed(2);
    }
}

//invoke the main function
main();


function Utils() {

}

Utils.getInnerRect = function(rect, dx, dy) {
    var left = right = rect.w*dx;
    var top = bottom = rect.h*dy;
    return new Rect(rect.x + left, rect.y + top, (rect.w - left - right), rect.h - top - bottom);
}

Utils.getTransformedPoint = function(dataPoint, srcRect, destRect ) {
    var scaleX = destRect.w/srcRect.w;
    var scaleY = destRect.h/srcRect.h;

    var xdash = destRect.x + (dataPoint.x - srcRect.x)*scaleX;
    var ydash = destRect.y + destRect.h - (dataPoint.y - srcRect.y)*scaleY;

    return new Point(xdash, ydash);
}



function Rect(x, y, w, h) { /* this is the class constructor */
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
};

Rect.prototype.toString = function() {
    var str = 'x, y: (' + this.x + ',' + this.y + ') w, h : (' + this.w + ', ' + this.h + ')';
    return str;
}

Rect.prototype.clone = function() {
    return new Rect(this.x, this.y, this.w, this.h);
}

BasicStyle = (function() {

    function BS(fillColor, filled, strokeColor, stroked, strokeWeight) {

        if(isNotNull()) {
            this.fillColor = fillColor;
            this.filled = filled;
            this.strokeColor = strokeColor;
            this.stroked = stroked;
            this.strokeWeight = strokeWeight;
        }
        function isNotNull() {
            return fillColor != null && filled != null && strokeColor != null && stroked != null && strokeWeight != null;
        }
    };

    BS.prototype.setFillColor = function(fillColor) {
        this.fillColor = fillColor;
    }

    BS.prototype.getFillColor = function() {
        return this.fillColor;
    }

    BS.prototype.setStrokeColor = function(strokeColor) {
        this.strokeColor = strokeColor;
    }

    BS.prototype.getStrokeColor = function() {
        return this.strokeColor;
    }
    BS.prototype.isFilled = function() {
        return this.filled;
    }
    BS.prototype.isStroked = function() {
        return this.stroked;
    }
    BS.prototype.getStrokeWeight = function() {
        return this.strokeWeight;
    }

    return BS;
})();

// SVG
/** creational methods */
VGFactory = (function(){
    var Factory = {};
    var SVG_NS = 'http://www.w3.org/2000/svg';
    /* properties & methods go here */

    Factory.setupVGHookInBrowser = function setupVGHookInBrowser() {
        // Add xml namespace definition:
        document.documentElement.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
    }


    Factory.createSVGElement = function(tagName, id) {
        var element = document.createElementNS('http://www.w3.org/2000/svg', tagName);
        if(id != null) {
            element.setAttributeNS(null, 'id', id);
        }
        return element;
    }
    /**
     * @param basicStyle {BasicStyle}
     */
    Factory.setBasicStyle = function (element, basicStyle) {
        if(basicStyle.isFilled()) {
            element.setAttributeNS(null, 'fill', basicStyle.getFillColor() );
        } else {
            element.setAttributeNS(null, 'fill', 'none' );
        }

        if(basicStyle.isStroked()) {
            element.setAttributeNS(null, 'stroke', basicStyle.getStrokeColor());
        } else {
            element.setAttributeNS(null, 'stroke', 'none');
        }
        if(basicStyle.getStrokeWeight()) {
            element.setAttributeNS(null, 'stroke-width', basicStyle.getStrokeWeight());
        }
    }


    Factory.setBounds = function(element, rect) {
        element.setAttributeNS(null, 'x', rect.x);
        element.setAttributeNS(null, 'y', rect.y);
        element.setAttributeNS(null,'width', rect.w);
        element.setAttributeNS(null, 'height', rect.h);
    }

    Factory.setCoords = function(element, coordRect) {
        if(coordRect == null) {
            alert('coordRect cannot be null in the VGFactory : setCoords');
            return;
        }
        var coordStr = coordRect.x + ' ' + coordRect.y + ' ' + coordRect.w + ' ' + coordRect.h;
        element.setAttributeNS(null, 'viewBox', coordStr);
        return element;
    }

    Factory.createRectangleElement = function createRectangleElement(id, rectStyle, styleBoundary) {
        var element = Factory.createSVGElement('rect', id);
        Factory.setBasicStyle(element, rectStyle);
        Factory.setBounds(element, styleBoundary)
        return element;
    }

    Factory.createCircleElement = function(id, datapointStyle, center, radius) {
        var element = Factory.createSVGElement('circle', id);
        Factory.setBasicStyle(element, datapointStyle);
        element.setAttributeNS(null, "cx", center.getX());
        element.setAttributeNS(null, "cy", center.getY());
        element.setAttributeNS(null, "r", radius);

        return element;
    }

    Factory.createLineElement = function createLineElement(id, lineStyle, line) {
        var element = Factory.createSVGElement('line', id);
        Factory.setBasicStyle(element, lineStyle);
        element.setAttributeNS(null, "y2", line.y2);
        element.setAttributeNS(null, "x2", line.x2);
        element.setAttributeNS(null, "y1", line.y1);
        element.setAttributeNS(null, "x1", line.x1);
        return element;
    }

    Factory.createTextElement = function(id, text, textStyle) {
        var element = Factory.createSVGElement('text', id);
        Factory.setBasicStyle(element, textStyle);
        text != null ? element.appendChild(document.createTextNode(text)) : "";
        return element;
    }

    Factory.createFitTextPathElement = function (id, text, textpathStyle, styleBoundary, pathFitLine) {
        var element = Factory.createSVGElement('text', id);
        Factory.setBasicStyle(element, textpathStyle);

        var x = 0.5*(pathFitLine.x1 + pathFitLine.x2);
        var y = 0.5*(pathFitLine.y1 + pathFitLine.y2);

        element.setAttributeNS(null, 'x', x);
        element.setAttributeNS(null, 'y', y);
        element.setAttributeNS(null, 'text-anchor', 'middle');

        if(textpathStyle.getFontSize() != null) {
            element.setAttributeNS(null, 'font-size', textpathStyle.getFontSize());
        }


        text != null ? element.appendChild(document.createTextNode(text)) : "";
        return element;
    }
    /**
     * creates a group element. ignores styleBoundary and coordRect property
     */
    Factory.createGroupElement = function createGroupElement(id, styleBoundary, coordRect) {
        var element = Factory.createSVGElement('g', id);
        return element;
    }

    /**
     * donot preserve the aspect ratio
     */
    Factory.createRootElement = function createRootElement(id, styleBoundary, coordRect) {
        var element = Factory.createSVGElement('svg', id);
        element.setAttributeNS(null, 'preserveAspectRatio', 'none');
        Factory.setBounds(element, styleBoundary);
        Factory.setCoords(element, coordRect);
        return element;
    }

    Factory.createPolyline = function(id, datapointStyle, ptsArray){
        var element = VGFactory.createSVGElement('polyline', id);
        VGFactory.setBasicStyle(element, datapointStyle);
                var polyStr = '';

        for (var i = 0; i < ptsArray.length; i++) {
            polyStr += ptsArray[i].x + ',' + ptsArray[i].y + ' ';
        }
        element.setAttributeNS(null, "points", polyStr);
        return element;
    }

    return Factory;
})();

function SvgElem() {}
SvgElem.setVisibility = function(element, visible) {
    var visibleVal = visible ? "visible" : "hidden";
    element.setAttributeNS(null, 'visibility', visibleVal);
}
SvgElem.setOpacity = function(element, value) {
    element.setAttributeNS(null, 'opacity', value)
}

function showSvgTooltip(evt) {
	// update position
	var xPos = evt.clientX;
	var yPos = evt.clientY;
  	var tipTitle = document.getElementById('tipTitle');
  	var tipDesc = document.getElementById('tipDesc');
  	tipTitle.firstChild.nodeValue = title;
  	tipDesc.firstChild.nodeValue = '(' + x + ', ' + (343-y) +')';
	var tipText = document.getElementById('tipText');
	var tipBox = document.getElementById('tipbox');
	var toolTip = document.getElementById('ToolTip');
	var outline = tipText.getBBox();
	tipBox.setAttributeNS(null, 'width', Number(outline.width) + 10);
	tipBox.setAttributeNS(null, 'height', Number(outline.height) + 10);

	toolTip.setAttributeNS(null, 'transform', 'translate(' + xPos + ',' + yPos + ')');
	toolTip.setAttributeNS(null, 'visibility', 'visible');

  }

function Point(x, y) { /* this is the class constructor */
    this.x = x;
    this.y = y;
};

Point.prototype.getX = function() {
    return this.x;
}
Point.prototype.getY = function() {
    return this.y;
}

function Line(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
};
Line.prototype.toString = function toString() {
    var str = 'from: ' + this.x1 + ',' + this.y1 + ' to: ' + this.x2 + ', ' + this.y2;
    return str;
}


function drawSVGChart(insertChartHere, dataArray, title) {
    var max = Math.max.apply(null, dataArray);
    var min = Math.min.apply(null, dataArray);
    var dataRangeText = '[' + min + ' - ' + max + ']';

    //setup svg coordinates
    var divRect = new Rect(0, 0, 200, 100);
    var vgCoordRect = divRect.clone();
    VGFactory.setupVGHookInBrowser();
    var datapointsGroup = null;
    if (divRect != null) {
        var plotDiv = document.createElement('div');
        plotDiv.setAttribute('name', 'plotDiv');
        //var newTitle = title + ' ' + Math.min.apply(null, dataArray) + ', ' + Math.max.apply.(null, dataArray);
        var rootGroupElement = createSVGShellAndGetRoot(insertChartHere, plotDiv, divRect, 'root', vgCoordRect, title, dataRangeText);
        datapointsGroup = VGFactory.createGroupElement('datapoints', vgCoordRect, null);
        rootGroupElement.appendChild(datapointsGroup);
    }

    //BACKGROUND RECTANGLE
    var rectStyle = new BasicStyle('rgb(240, 240, 240)', true, '#000000', false, 4);
    datapointsGroup.appendChild(VGFactory.createRectangleElement('boundary', rectStyle, vgCoordRect));

    // MEDIAN LINE
    var medianStyle = new BasicStyle('rgb(255, 0, 0)', false, 'rgb(255, 0, 0)', true, 1);
    var medianLine = new Line(vgCoordRect.x, vgCoordRect.y + vgCoordRect.h/2, vgCoordRect.x + vgCoordRect.w, vgCoordRect.y + vgCoordRect.h/2);
    datapointsGroup.appendChild(VGFactory.createLineElement('median', medianStyle, medianLine));

    //ADD DATAPOINTS
    var dataRect = ((max - min) > 0) ?  new Rect(0, min, dataArray.length-1, max - min) : new Rect(0, min-100, dataArray.length-1, min + 200)
    var svgPlotRect = Utils.getInnerRect(vgCoordRect, 0.1, 0.2);

    var ptsArray = new Array();
    for(var i=0; i<dataArray.length; i++) {
        var svgPoint = Utils.getTransformedPoint(new Point(i,dataArray[i]), dataRect, svgPlotRect);
        ptsArray.push(svgPoint);
    }

    //polyline connecting the points
    var polyStyle = new BasicStyle('rgb(0, 0, 0)', false, '#000000', true, 1);
    datapointsGroup.appendChild(VGFactory.createPolyline('poly', polyStyle, ptsArray));

    for(i=0; i<ptsArray.length; i++) {
        var datapointStyle = new BasicStyle('rgb(0, 0, 0)', true, '#000000', false, 4);
        var pointElem = VGFactory.createCircleElement(null, datapointStyle, ptsArray[i], 3 /** DIAMETER* */);
        pointElem.setAttribute("tp_y", dataArray[i]);

        pointElem.addEventListener("mouseover", function() {
               plotDiv.childNodes[0].innerHTML = this.getAttribute("tp_y");
        }, false);

        pointElem.addEventListener("mouseout", function() {
               plotDiv.childNodes[0].innerHTML = "&nbsp;&nbsp;"
        }, false);

        datapointsGroup.appendChild(pointElem);
    }
}

function createSVGShellAndGetRoot(chartParentDiv, div, divRect, rootID, vgCoordRect, title, dataRangeText){
    chartParentDiv.appendChild(div);
    // add style
    div.style.top = divRect.y;
    div.style.left = divRect.x;
    div.style.width = divRect.w;
    div.style.height = divRect.h;

    div.style.padding = '10px';
    div.style.cssFloat = "left" // IE has styleFloat property
    if (title) {
        var tooltipDiv = document.createElement('div');
        tooltipDiv.style.cssFloat = 'none';
        tooltipDiv.innerHTML ="&nbsp;&nbsp;";
        div.appendChild(tooltipDiv);
    }
    var rootGroupElement = VGFactory.createRootElement(rootID, divRect, vgCoordRect);
    div.appendChild(rootGroupElement);
    if (title) {
        var titleDiv = document.createElement('div');
        titleDiv.style.cssFloat = 'none';
        titleDiv.appendChild(document.createTextNode(title));
        titleDiv.appendChild(document.createElement('br'));
        titleDiv.appendChild(document.createTextNode(dataRangeText))
        div.appendChild(titleDiv);
    }

    return rootGroupElement;
}