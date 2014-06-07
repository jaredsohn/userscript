// ==UserScript==
// @name           C++ Codeforces Sample Generator
// @namespace      http://mezhaka.com
// @description    Generate C++ stub for the codeforces problem description.
// @include        http://codeforces.com/contest/*/problem/*
// @include        http://codeforces.ru/contest/*/problem/*
// @include        http://codeforces.com/problemset/problem/*/*
// @include        http://codeforces./problemset/problem/*/*
// @include        http://www.codeforces.com/contest/*/problem/*
// @include        http://www.codeforces.ru/contest/*/problem/*
// @include        http://www.codeforces.com/problemset/problem/*/*
// @include        http://www.codeforces./problemset/problem/*/*
// ==/UserScript==

String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) { 
    return typeof args[number] != 'undefined'
      ? args[number]
      : match
    ;
  });
};


function GetContentElements(rootList) {
    var contentElementsList = [];
    for (var i = 0; i < rootList.length; i++) {
        var rootContentList = rootList[i].getElementsByTagName('pre');
        contentElementsList.push(rootContentList[0].innerHTML); 
    }
    return contentElementsList;
}

function SubstituteBrForNewline(myString) {
    var length;
    do {
        length = myString.length;
        myString = myString.replace('<br>', '\\n');
    } while (length != myString.length);

    if (myString[length - 2] == '\\' &&
        myString[length - 1] == 'n') {
        myString = myString.slice(0, length - 2);
    }
    return myString;
}

function GetInputsOutputs() {
    var inputs = document.getElementsByClassName('input');
    var outputs = document.getElementsByClassName('output');

    inputs = GetContentElements(inputs);
    outputs = GetContentElements(outputs);

    for (var i = 0; i < inputs.length; i++) {
        inputs[i] = SubstituteBrForNewline(inputs[i]);
        outputs[i] = SubstituteBrForNewline(outputs[i]);
    }

    var sampleTests = new Object;
    sampleTests.inputs = inputs;
    sampleTests.outputs = outputs;
    return sampleTests;
}


var cppTemplate = '#include&nbsp&ltalgorithm><br /> #include&nbsp&ltiostream><br /> #include&nbsp&ltsstream><br /> #include&nbsp&ltstring><br /> #include&nbsp&ltvector><br /> #include&nbsp&ltqueue><br /> #include&nbsp&ltset><br /> #include&nbsp&ltmap><br /> #include&nbsp&ltcstdio><br /> #include&nbsp&ltcstdlib><br /> #include&nbsp&ltcctype><br /> #include&nbsp&ltcmath><br /> #include&nbsp&ltnumeric><br /> #include&nbsp&ltiterator><br /> #include&nbsp&ltstack><br /> #include&nbsp&ltlist><br /> <br /> <br /> #define&nbspfori(i,start,end)&nbspfor(int(i)=int(start);(i)&ltint(end);(i)++)<br /> #define&nbspall(a)&nbsp(a).begin(),&nbsp(a).end()<br /> #define&nbsprep(i,&nbspend)&nbspfori((i),&nbsp0,&nbsp(end))<br /> <br /> using&nbspnamespace&nbspstd;<br /> <br /> #ifndef&nbspONLINE_JUDGE<br /> void&nbspcompare(int&nbsptest_number,&nbspstringstream&&nbspoutput,&nbspstringstream&&nbspsolution)&nbsp{<br /> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspcout&nbsp&lt&lt&nbsp"Test&nbsp"&nbsp&lt&lt&nbsptest_number&nbsp&lt&lt&nbsp":&nbsp";<br /> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspif&nbsp(solution.str()&nbsp!=&nbspoutput.str())&nbsp{<br /> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspcout&nbsp&lt&lt&nbsp"not&nbspok.\\nExpected:\n"&nbsp&lt&lt&nbspsolution.str()&nbsp&lt&lt&nbsp"\\nRecieved:\\n"&nbsp&lt&lt&nbspoutput.str()&nbsp&lt&lt&nbsp"\\n";<br /> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp}&nbspelse&nbsp{<br /> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspcout&nbsp&lt&lt&nbsp"ok.\n";<br /> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp}<br /> }<br /> #endif<br /> <br /> <br /> void&nbspTheSolution(istream&&nbspinput,&nbspostream&&nbspoutput)&nbsp{<br /> <br /> }<br /> <br /> <br /> int&nbspmain()&nbsp{<br /> #ifdef&nbspONLINE_JUDGE<br /> &nbsp&nbsp&nbsp&nbspTheSolution(cin,&nbspcout);<br /> #else<br />{0}<br /> <br /> #endif<br /> &nbsp&nbsp&nbsp&nbspreturn&nbsp0;<br /> }<br />';

var cppSampleTemplate ='&nbsp&nbsp&nbsp&nbsp{<br />&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspstringstream&nbspinput;<br /> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspinput&nbsp&lt&lt&nbsp"{0}";<br /> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspstringstream&nbspsolution;<br /> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspsolution&nbsp&lt&lt&nbsp"{1}";<br /> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<br /> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspstringstream&nbspoutput;<br /> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspTheSolution(input,&nbspoutput);<br /> <br /> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspcompare({2},&nbspoutput,&nbspsolution);<br /> &nbsp&nbsp&nbsp&nbsp}<br />';

function GenerateSampleCode(template, samples) {
    var sampleCode = '';
    for (var i = 0; i < samples.inputs.length; i++) {
        var sample = template.format(samples.inputs[i], samples.outputs[i], i);
        sampleCode = sampleCode.concat(sample);
    }

    return sampleCode;
}

function main() {
    sampleTests = GetInputsOutputs();
    var stubCode = document.createElement('div');
    var formattedSamples = GenerateSampleCode(cppSampleTemplate, sampleTests);
    stubCode.innerHTML = cppTemplate.format(formattedSamples);
    document.body.appendChild(stubCode);
}


main();
