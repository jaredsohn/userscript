// ==UserScript==
// @name           Translate Code Monster and Code Maven to Hebrew (Feminine) - Work in progress
// @namespace      splintor.userscript.org
// @description    Translate Crunchzilla's Code Monster and Code Maven to Hebrew, using a feminine form. Still need to finish translating...
// @include        http://www.crunchzilla.com/*
// @author:        Shnulik Flint (splintor@gmail.com )
// @version        0.1
// ==/UserScript==

var t = {};
t["Getting Started"] = "פתיחה";
t["I'm Code Monster! (click on my words to see what's next)"] = "אני תיכנותפלצת! (צריך ללחוץ על מה שאני אומרת כדי להתקדם)";
t["You're going to learn some programming! (click again)"] = "תיכף נלמד פה קצת תכנות! (עכשיו צריך ללחוץ שוב)";
t["Below me, on the left, is Javascript code, on the right, what it does."] = "מתחתי, בצד שמאל, יש קוד ג'אווהסקיפט, ובצד ימין יש את מה שהקוד הזה עושה.";
t["You can use fillRect() to draw a box. See the number 50?  Can you change that to 150?"] = "משתמשים ב-fillRect כדי לצייר תיבה. רואה את המספר 50? רוצה לראות מה קורה כשמשנים את זה ל-150?"
t["Parameters and Drawing"] = "פרמטרים וציור";
t["That made the box wider. What do you think the other numbers do? Try changing them."] = "זה הפך את התיבה לרחבה יותר. מה לדעתך שאר המספרים עושים? נסי לנסות ולראות!"; // female
t["Did you figure it out?  The numbers are how far from the left side to draw the box, how far from the top, how wide to draw the box, and how tall."] = "הבנת? המספרים קובעים כמה רחוק מצד שמאל, כמה רחוק מלמעלה, כמה רחבה וכמה גבוהה תהיה התיבה.";
t["Try changing all the numbers!  Play with it!"] = "יאללה! נסי לנסות ולשחק עם כל המספרים!"; // female
t["Two boxes. Can you change the numbers to make them bigger?"] = "שתי קופסאות. איך אפשר לשנות את המספרים כדי לעשות אותן גדולות יותר?";
t["Can you change the numbers to move them around?"] = "את יכולה לשנות את המספרים כדי להזיז אותן?"; // female
t["Can you change the numbers so that one covers the other?"] = "נראה אותך משנה את זה כך שאחת תכסה את השניה!";
t["Monster like boxes square."] = "תיכנותפלצת אוהבת ריבועים!";
t["A square has the same width and height.  This box has the same width and height, both are 80."] = "לריבוע יש אורך וגובה שווים. לתיבה הזו יש את אותו רוחב וגובה - שניהם 80.";
t["Variables"] = "משתנים";
t["Hey, look, this does the same thing!"] = "ואו! זה עושה את אותו הדבר!";
t["Why does that do the same thing?  Any ideas?"] = "למה זה עושה את אותו הדבר? יש לך רעיון?";
t["var means variable. What we did is create a variable, called it <span class=tutor-code>size</span>, set it equal to 80, and now we can use <span class=tutor-code>size</span> where we would have used 80. Do you know why we might want that?"] = "var זה קיצור של variable - משתנה. מה שעשינו זה ליצור משתנה שוקראים לו <span class=tutor-code>size</span>, וקבענו את הערך שלו ל-80 ועכשיו אנחנו יכולים להשתמש ב-<span class=tutor-code>size</span> במקום 80. למה נראה לך שנרצה דבר כזה?";
t["What happens if you change 80 to 220?"] = "מה קורה כשמשנים את 80 ל-220?";
t["And look!  Wider and taller box, both at the same time!"] = "וואו! תיבה יותר רחבה ויותר גבוהה - באותו הזמן!";
t["Can you change the other numbers to move the box around?"] = "את יכולה לשנות את המספרים האחרים כדי להזיז את התיבה?"; //female
t["Can you make the box very small?"] = "את יכולה לעשות את התיבה מאוד קטנה?"; // female
t["What happens if you make <span class=tutor-code>size</span> equal to 0? Or to something really big like 5000?"] = "ומה יקרה אם נשנה את <span class=tutor-code>size</span> ל-0? או למשהו ממש גדול כמו 5000?";
t["Monster want two boxes."] = "תיכנותפלצת רוצה שתי תיבות";
t["Both boxes have the same size.  That's a neat trick."] = "לשתי התיבות יש את אותו הגודל. מגניב, לא?";
t["You can change what <span class=tutor-code>size</span> is equal to.  That will grow or shrink both boxes at once! Try changing 80 to 180!"] = "אפשר לשנות את הערך של <span class=tutor-code>size</span>. זה יגרום לשתי התיבות לגדול או לקטון ביחד. אולי ננסה לשנות את 80 ל-180?";
t["Can you move each of the boxes around by changing some of the numbers?"] = "את יכולה להזיז את התיבות על-ידי שינוי חלק המספרים?"; // female
t["Monster want more boxes.  Three boxes!"] = "תיכנותפלצת רוצה עוד תיבות. שלוש תיבות!";
t["Now what happens when you change what <span class=tutor-code>size</span> is equal to?"] = "מה יקרה עכשיו אם נשנה את הערך של <span class=tutor-code>size</span>?";
t["More boxes!  Try changing size now!"] = "עוד תיבות! תנסי לשנות את הגודל עכשיו!"; // female
t["Color"] = "צבע";
t["Ooo!  Color!  Pretty!"] = "היי ! צבע! יפה!";
t["Many colors work.  Try \"green\" or \"purple\" or \"gold\"."] = "אפשר להשתמש בהרבה שמות של צבעים (באנגלית). אפשר \"green\" (ירוק) או \"purple\" (סגול) או \"gold\" (זהב).";
t["How about two pink boxes?"] = "ומה לגבי תיבות ורודות?";
t["One pink and one silver."] = "ואולי אחד ורוד ואחד כסף?";
t["Can you make the silver box gold instead?  And the pink one blue instead?"] = "את יכולה להחליף את הכסף בזהב (gold) ואת הורוד בכחול (blue)?"; // female
t["Here are two boxes that are the same color again.  Now can you make the two boxes be different colors?"] = "הנה שוב שתי תיבות באותו צבע. אפשר לשנות אותם להיות בצבעים שונים?";
t["Here is one version.  I like red and blue."] = "הנה אפשרות אחת. אני אוהבת אדום וכחול.";
t["Red, green, and blue.  That's nice."] = "אדום, ירוק כחול. זה נחמד.";
t["Wha... This does the same thing!  What could rgb() be?"] = "רגע - זה עושה את אותו הדבר. מה זה יכול להיות ה-rgb הזה?";
t["Try changing any of the zeroes to 200 or so.  And try changing any of the 255 to 0. What do the numbers seem to do?"] = "נסי לשנות את האפסים ל-200 או משהו כזה. נסי לשנות את אחד מה-255 ל-0. מה נראה לך שהמספרים האלה עושים?"; // female
t["Did you figure it out?  rgb() refers to red, green, and blue.  The numbers go from 0 to 255. So, <span class=tutor-code>rgb(0, 255, 0)</span> means no red or blue, but all the green you got!"] = 
    "הצלחת להבין? ()rgb מתייחס לאדום (red), ירוק (green), וכחול (blue). המספרים הם בין 0 ל-255, אז המשמעות של <span class=tutor-code>(rgb(0, 255, 0</span> היא שאין אדום, אין כחול ויש המון ירוק.";
t["You can make lots of colors this way if you change some of the numbers.  Try it!"] = "את יכולה ליצור הרבה צבעים ככה אם את משנה את הצבעים. נסי ותראי!"; // female
t["Quiz: Color"] = "חידון: צבע";
t["Here is a fun game.  Can you make these two boxes the same color?"] = "הנה משחק נחמד. את יכולה לגרום לשתי התיבות להיות באותו הצבע?"; // female
t["Can you make these both blue?"] = "את יכולה לעשות את שתיהן כחולות?"; // female
t["Can you figure out what the rgb() numbers should be to make these both yellow?"] = "את יכולה לחשוב מה המספרים המתאימים כדי ששתי אלו יהיו צהובות?"; // female
t["Can you figure out what the rgb() numbers should be to make these both teal?"] = "את יכולה לחשוב מה המספרים המתאימים כדי ששתי אלו יהיו דומות לטורקיז?"; // female
t["Okay, this one is really hard.  Can you make these two exactly match?  Can you figure out what the rgb() numbers should be to make these both crimson? Don't worry if you don't get it exactly, just see how close you can get!"] = 
    "אוקיי, זה באמת קשה. את יכולה לעשות את שני אלו תואמים בדיוק? את יכולה למצוא איזה מספרי ()rgb יכולים להרכיב את צבע הארגמן הזה? לא נורא אם זה לא מדויק, פשוט תנסי להגיע הכי קרוב שאת יכולה."; // female
t["Here it is.  Whew, that's a hard one!  How close did you get?"] = "אוקיי. הנה אחד ממש קשה. כמה קרוב הגעת?";
t["If you want to try others, put \"olive\", \"purple\", \"aqua\", or any other color you can think of as the color for the first box, then try to find the rgb numbers that match it!"] = 
    "אם את רוצה להמשיך לנוסת, את יכולה לנסות \"olive\", \"purple\", \"aqua\", או כל צבע אחר באנגלית בשביל התיבה הראשונה ואז נסי למצוא את צבעי ה-rgb שמתאימים לו ";
t["Color and Transparency"] = "צבע ושקיפות";
t["rgba() is a crazy version of rgb(). See what this does?  It's got one more number at the end that's 0.5.  What is that last number doing? Try changing the 0.5 to 0.1.  Or to 0.8.  What does it do?"] = 
    "()rgba היא הגרסה המשוגעת של ()rgb. שמת לב מה היא עושה? יש לה עוד מספר בסוף - 0.5. מה המספר הזה עושה? מה קורה אם משנים אותו ל-0.1? או ל-0.8?";
t["The a in rgba means alpha (how transparent the box is) from 0.0 (invisible) to 1.0 (solid)"] = "ה-a ב-rgba מתייחס למשהו שנקרא אלפא והוא קובע כמה שקוף התיבה תהיה - מ-0.0 (שקוף לגמרי) עד 1.0 (אטום - לא שקוף בכלל)";
t["You can do pretty cool things with rgba().  Look at this!  Try changing some of the 0.5 alphas to 0.2 or 0.8!"] = "את יכולה לעשות דברים ממש קוליים עם ()rgba. תראי את זה! נסי לשנות את האלפא 0.5 ל-0.2 או 0.8!"; // female
t["Try changing the size from 80 to 180!  You can get some fun effects when the colors overlap. Play with it!"] = "נסי לשנות את הגודל מ-80 ל-180! אפשר לשיג אפקטים נחמדים כשהצבעים חופפים. שחקי עם זה!"; // female
t["Operators and Assignment"] = "אופרטורים והשמה";
t["Let's go back to variables. Monster no like to repeat numbers. Can you replace both the 20 numbers with <span class=tutor-code>offset</span>?"] = "בואי נחזןר למשתנים. תיכנותפלצת לא אוהבת לחזור על מספרים. את יכולה להחליף את שני מספרי ה-20 ב-<span class=tutor-code>offset</span>?"; // female
t["Now try changing what <span class=tutor-code>offset</span> is equal to from 30 to 50.  See how you can move the first box?"] = "כעת נסי לשנות את הערך של <span class=tutor-code>offset</span> מ-30 ל-50. את רואה איך את יכולה להזיז את התיבה הראשונה?"; // female
t["Variables can be set to new values.  See how offset is set to 100 before being used by the second box?"] = "אפשר לתת למשתנים ערך אחר. את רואה איך offset משתנה ל-100 לפני שמתמשים בו בתיבה השניה?"; // female
t["Try moving the second box.  Change the 100 to 50 or 150."] = "נסי להזיז את התיבה השניה. שני את ה-100 ל-50 או ל-150."; // female
t["Try moving the first box too."] = "נסי להזיז את התיבה הראשונה גם."; // female
t["Can you put the boxes on top of each other so it looks like just one box?"] = "את יכולה לשים את התיבות אחת על השניה כך שהן יראו כמו תיבה אחת?"; // female
t["You can also add numbers to a variable. See what this is doing? It changes offset with <span class=tutor-code>offset = offset + 50</span>"] = "אפשר גם להוסיף מספרים למשתנה. את רואה איך עושים את זה? משנים את ה-offset על-ידי <span class=tutor-code>offset = offset + 50</span>."; // female
t["<span class=tutor-code>offset = offset + 50</span> means take offset, add 50 to it, then make offset equal that now.  In other words, make offset 50 more than it used to be."] = 
"הכוונה ב-<span class=tutor-code>offset = offset + 50</span> היא לקחת את offset להוסיף לו 50, ואז לשים את התוצאה ב-offset. במילים אחרות - לקחת את offset ולהגדיל אותו ב-50.";
t["Quiz: Variables and Operators"] = "חידון: משתנים ואופרטורים";
t["How about you try it?  Can you replace both the 90 numbers used for the (left, top) of the second box with a variable? Hint: Either create a new variable or change offset and then use offset."] = 
    "בואי ננסה את זה, טוב? את יכולה להחליף את שני מספרי ה-90 שמשתמשים בהם כדי למקם את התיבה השניה למשתנים? רמז: או שתגדירי משתנה חדש, או שתשני את offset ותשתמשי בו."; // female
t["Monsters like adding.  Me add good.  Okay, now try changing <span class=tutor-code>offset</span> from 30 to 80.  See what happens?"] = "מפלצות אוהבות חיבור.";
t["Ooo, you can move both boxes together!  Change the offset and move 'em around!"] = "הי! אפשר להזיז את שתי התיבות ביחד! משנים את offset והם זזים בבת אחת!";
t["More Operators"] = "עוד אופרטורים";




t["This looks the same, but it's a little different.  What's that <span class=tutor-code>*</span> doing?  What happens if you change <span class=tutor-code>* 3</span> to <span class=tutor-code>* 2</span>?  Try changing it to <span class=tutor-code>* 1</span>.  Try changing the offset too.  Did you figure out what <span class=tutor-code>*</span> means?"] = 
    "";
t["<span class=tutor-code>*</span> means multiply.  <span class=tutor-code>2 * 2</span> would be 4.  So, <span class=tutor-code>offset = offset * 3</span> means make offset three times bigger."] = "";
t["<span class=tutor-code>*</span> means multiply and <span class=tutor-code>/</span> means divide.  So, what we set size equal to below is just a complicated way of saying make size equal to 100.  See?"] = "";
t["If and Comparisons"] = "משפטי תנאי";
t["We can also compare numbers.  See this code?  We will only draw a second box when <span class=tutor-code>size</span> is less than 80."] = "";
t["Try changing size to 150.  See what happens? Try changing size to 79.  Then change it to 80."] = "";
t["Quiz: Variables and Color"] = "חידון: משתנים וצבע";
t["Okay, let's see what you know!  Here are two boxes.  Can you add a third box (offset by another 60 from the second box)?"] = "";
t["Here is one way to do it. Try changing the size or offset!"] = "";
t["Remember rgba()?  Monster like.  Can you make me three boxes with different colors?"] = "";
t["Here is one way.  Ooo!  Pretty!  Try changing size, offset, or the red, blue, and green numbers!"] = "";
t["For Loops"] = "לולאות";
t["Monster no like writing code more than once.  Lots of writing the same code more than once here, me not like."] = "";
t["This is called a <span class=tutor-code>for</span> loop.  It repeats code without writing it more than once.  Me like.  Try changing the 3 to 5!"] = "";
t["For loops have three parts, where to start (<span class=tutor-code>i = 0</span>), when to keep going (<span class=tutor-code>i < 5</span>), and how much to change each time (<span class=tutor-code>i = i + 1</span>). Can you make ten boxes?"] = "";
t["Argh!  They don't fit?  How can you make ten boxes fit?"] = "";
t["Here is one way!"] = "הנה דרך אחת!";
t["Smaller boxes also fit.  Try playing with size, offset, and changing 10!"] = "";
t["Fun with For Loops"] = "נהנים עם לולאות";
t["Remember rgba()? What's this doing?  Play with it!"] = "";
t["Complicated!  That means use 0 blue light for the first box, 25 for the second, then 50, 75, 100..."] = "";
t["Here is another one, this one changing alpha!  Neat-o!"] = "";
t["Quiz: Write Code Yourself"] = "חידון: כתוב קוד בעצמך";
t["Can you show me what you learned?  Draw me a square! Hint: Remember <span class=tutor-code>c.fillRect(<i>left, top, width, height</i>);</span> to draw a box."] = "";
t["Can you add another square?"] = "את יכולה להוסיף עוד ריבוע?"; // female
t["Now can you make the second square red? (Hint: <span class=tutor-code>c.fillStyle = \"blue\";</span> before fillRect() will make the rect blue)"] = "";
t["Great! Did you get something like this? If not, try playing with the numbers a bit to see how it works!"] = "";
t["Lines"] = "קווים";
t["Monster draw line. What do you think moveTo() does? lineTo()? Try changing 20 to 50."] = "";
t["Try changing the other numbers too.  Can you figure out what moveTo() and lineTo() do?"] = "";
t["moveTo(left, top) moves the pen to a spot without drawing.  lineTo(left, top) draws a line from wherever the pen is to a spot."] = "";
t["Here is what happens if we do a second lineTo().  The second line starts from where the first ended."] = "";
t["So, we're drawing a path, a trail of lines all connected together.  We start the path with beginPath() and draw everything with stroke()."] = "";
t["If we put a moveTo() before the second lineTo(), we'll move the pen without drawing.  See?"] = "";
t["You try it!  Add another line, put a second c.lineTo() after the first going to (50, 115)."] = "";
t["Did that do what you expected?  Try adding a third line!"] = "עשית מה שרציתי? נסי להוסיף קו שלישי!"; // female
t["Can you make a triangle?"] = "את יכולה לעשות משולש?"; // female
t["Here is one way, a triangle!"] = "";
t["Okay, an orange triangle.  Like blue better.  Can you make it blue?"] = "";
t["I was trying to make two triangles, but forgot a moveTo().  See what happened?"] = "";
t["That's not good.  Can you add <span class=tutor-code>c.moveTo(200, 130);</span> to make it two separate triangles?"] = "";
t["Lines and Loops"] = "קווים ולולאות";
t["I want a lot of triangles. We need to use <span class=tutor-code>for</span>!  This for loop draws two triangles."] = "";
t["This for loop starts at 30 and increases by 30 every time.  So, until it is told to stop, it counts 30, 60, 90, 120...  Right now, the for loop is told to stop at 60."] = "";
t["So, can you make this for loop draw three triangles? Five?"] = "";
t["Can you make more triangles by changing how the for loop goes up?  What if it counted by 10 each time, so it would count 30, 40, 50, 60... Can you do try that?"] = "";
t["Aieee!  Look at this!  Forty green triangles!"] = "";
t["Play with it more!  Can you change the color?  Can you make even more triangles?"] = "";
t["Coding It Easy"] = "תכנות זה קל";
t["Two boxes, one using strokeRect(), the other using four lines."] = "";
t["Sure takes a lot more code to draw it with lines. Can you add a third box?"] = "";
t["strokeRect() is easier, isn't it?  Here are three boxes all using strokeRect(). Can you add a fourth?"] = "";
t["Avoid Repeating Code"] = "המנעות מחזרה על הקוד";
t["What if we want even more boxes?  Lots of copying.  Yuck-o."] = "";
t["I know!  Use for loop!  Can you make more boxes for Code Monster?"] = "";
t["Can you make more than ten boxes?  And still fit all of them on the screen?"] = "";
t["Variables Make It Easy Too"] = "גם משתנים הופכים את זה לקלות";
t["Is it easier now to make more boxes? Why is that?"] = "";
t["This works by having <span class=tutor-code>i</span> count up 1, 2, 3... then putting each box's (left, top) at <span class=tutor-code>i * offset</span>, so, since offset is 30, the top left of the first box is (30, 30), the second is at (60, 60), then (90, 90) ..."] = "";
t["Try changing size, num, and offset.  See what happens?  Play with it!"] = "";
t["It's often good to have variables that control things (like size, num, and offset) together so they are easy to change.  Like it?"] = "";
t["Quiz: For Loops"] = "חידון: לולאות";
t["Can you show me some of what you know? Draw a box. <br>Hint: <span class=tutor-code>c.strokeRect(<i>left, top, width, height</i>);</span> draws a box."] = "";
t["Now draw four boxes. Hint: Making four boxes is easy using for. Remember, for loop look like this: <span class=tutor-code>for (var i = 0; i < 3; i += 1) {</span>"] = "";
t["Can you make it so you can change the size of all your boxes all at once? Hint: To make a variable named size set to 50, you use <span class=tutor-code>var size = 50;</span>"] = "";
t["Wow, you're learning to program!  Lots of ways you could do this, but did you get something like this? If not, try changing some stuff, figure out how it works!"] = "";
t["Your Own Functions"] = "פונציות משלך";
t["Code Monster no like repeating self.  No like.  No like.  For loops avoid repeating.  Me now show you functions too. Functions also avoid repeating."] = "";
t["This is a new function, strokeSquare().  It is just like strokeRect(), but draws squares."] = "";
t["strokeSquare() uses strokeRect() to draw a rectangle with the same width and height. See how it works?"] = "";
t["So, the first square starts at (30, 100) and then has a height and width of 50. See?"] = "";
t["Can you add a fourth square below the others using strokeSquare()?"] = "את יכולה להוסיף ריבוע רביעי מתחת לאחרים בעזרת strokeSquare()?"; // female
t["More Lines"] = "עוד קוים";
t["Ooo! A star! Pretty! Change some of the numbers!  Mess it up!"] = "";
t["Wait, stars aren't green.  Can you make it yellow or gold?"] = "";
t["Ooo! A solid gold star! Did you know you can do that? Change some of the numbers!  Mess it up!"] = "";
t["Variables make it easy to change and add more stars. Try changing x, y, and size (or anything else)!"] = "";
t["Here are two stars, but all that repeating myself hurts. No like. What we do?"] = "";
t["More Functions"] = "עוד פונקציות";
t["Functions! It's fillStar()! Can you add a third star?"] = "פונקציות! זהו fillStar()! את יכולה להוסיף עוד כוכב?"; // female
t["Four stars in a row!  Can you make it eight?"] = "ארבעה כוכבים בשורה! את יכולה להפוך את זה לשמונה?"; // female
t["Nested Loops"] = "לולאות מקוננות";
t["Two loops!  Try changing size or the number of stars!"] = "";
t["Did you know you could do two loops like that, one inside the other?"] = "";
t["Do you know how it works?"] = "את יודעת איך זה עובד?"; // female
t["<span class=tutor-code>j</span> will count 0, 1, 2.  The first time <span class=tutor-code>j</span> counts 0, 1, 2, <span class=tutor-code>i</span> will be 0.  The next time j counts 0, 1, 2, i will be 1."] = "";
t["So, for the first star, i = 0 and j = 0.  On the second star, i = 0 and j = 1.  Third, i = 0 and j = 2. Then, i = 1 and j = 0, i = 1 and j = 1, i = 1 and j = 2, and so on."] = "";
t["Can you figure out what order it draws the stars?  Which star is drawn first?  Which star is the second star drawn?"] = "";
t["The first star will be the one at the top left.  The second drawn is the one below it.  Do you see why?"] = "";
t["Fun with Stars"] = "נהנים עם כוכבים";
t["Wow!  Full of stars! Try changing size!"] = "";
t["Wow!  Five stars, randomly placed, changing every time. Can you have it draw fifty stars? A hundred?  How about bigger stars or smaller stars?"] = "";
t["Even More Functions"] = "עוד יותר פונקציות";
t["Ugh, me tired of seeing stars.  Lines where it's at.  Here two separate lines. See how much is repeated? No like. What can we do?"] = "";
t["Need drawLine() function.  Here it is.  Now draw one line from (20, 20) to (200, 20) and another from (20, 50) to (200, 50)."] = "";
t["Did you get it? Here is one version.  Can you add a third line below the other two?"] = "";
t["Fun with Lines"] = "נהנים עם קוים";
t["Three vertical lines using for loop.  Can you make it ten lines?"] = "";
t["Ten lines coming to a point.  Try moving the point!"] = "";
t["Ready for something harder?  Now the lines fan to the right.  Can you also add in the ones we saw last, going to the left?"] = "";
t["Did you get it?  This is one way to do it.  Try moving the point now!"] = "";
t["Ooo!  Me like!  Try changing num, px, or py!"] = "";
t["Can you make lines from all sides?  You will need four drawLine() and your two new ones will use 0 instead of w and h.  Can you do it?"] = "";
t["I like mine blue.  Play with it!"] = "אני אוהב את שלי כחול. שחקי עם זה!"; // female
t["More Fun with Lines"] = "";
t["When me little monster, me draw these.  You like too?  Change number of lines!"] = "";
t["Can you add another curve at top right? You will need another drawLine() but use x, 0, w, y."] = "";
t["Pretty!  Try other colors and changing the number of lines!"] = "";
t["Can you make it so the two curves are two different colors?"] = "";
t["Here is one version.  Try changing the colors!"] = "";
t["Here is a crazy fun random colors changing version.  It's complicated, but take a look.  Can you guess how it works? And try changing num!"] = "";
t["Quiz: Functions"] = "";
t["You know programming?  Show me!  Can make a function called fillSquare() and then use that to draw a second bigger square? Hint: You'll need something like <span class=tutor-code>function fillSquare(left, top, size) {</span>"] = "";
t["Did you get it?  Something like this? Now can you make the first square also use fillSquare() instead of calling fillRect()?"] = "";
t["Look, one line. Huh. Want more. It would be easier to add more lines if we had that drawLine() function again.  Can you write that and then make this line use it? Hint: Create a function with <span class=tutor-code>function doStuff(a, b, c, d) {</span>"] = "";
t["Ahh, isn't that better?  Add another line below this one.  Wasn't that easy now?"] = "";
t["So easy to add more lines, I want lots more.  Give me ten lines total, one on top of the other, separated by 10! Hint: Easier with for loop. For loop looks like <span class=tutor-code>for (var i = 0; i < 3; i += 1) {</span>"] = "";
t["You get something like this?  You getting good!  Try playing with the numbers! I like n of 40 and dy of 5!"] = "";
t["Erasing"] = "";
t["Me miss boxes.  Hey, look, boxes, can erase!  Try moving the white box from (50, 50) to (20, 20)!"] = "";
t["Order matters.  Last one to draw gets to stay!  Try moving the white box now!"] = "";
t["Another way to erase is with clearRect().  Can you make a little blue smiley face using these?  It is almost done.  You just need to move them."] = "";
t["Me like this guy.  Ooo, friend."] = "";
t["A big clearRect() erases everything.  Uncomment the big clearRect() (remove the <span class=tutor-code>//</span>) and see what happens."] = "";
t["Comments"] = "";
t["<span class=tutor-code>//</span> at the beginning of a line makes the line get ignored.  That's called commenting out.  Try adding <span class=tutor-code>//</span> before some of the other lines and see what happens!"] = "";
t["Rotation and Translation"] = "";
t["A box.  But how did it get that far away from the edge?  Try changing x and y."] = "";
t["The fillRect() says to make the (left, top) at (0, 0), so wouldn't you think the box would be at the upper left corner? But, wait, what is translate()?"] = "";
t["translate() changes where (0, 0) is. After translate(50, 50), for example, anything that tries to draw at (0, 0) will draw at (50, 50).  Drawing at (20, 20) would draw at (70, 70), since 50 + 20 = 70.  See?"] = "";
t["Why does this do what it does?  What will happen if you uncomment save() and restore()? Try it. Was it what you expected?"] = "";
t["The second box becomes black and gets drawn right on top of the first box!  Why?"] = "";
t["restore() eliminates all the changes since the last save().  So, if you save, then change the fillStyle color or do translate(), then restore, everything goes back to what it was right before the save."] = "";
t["We can rotate stuff too.  Try changing angle!"] = "";
t["You might be used to degrees?  Angles in Javascript are in radians.  45 degrees is about 0.8 in radians.  Try changing angle from 0.1 to 0.8!"] = "";
t["Spinning all the way around is 360 degrees, right?  In radians, it is about 6.28."] = "";
t["Did you notice that this box is pivoting through its top left corner when you rotate it?  That's the same spot we said to go with translate(), right?"] = "";
t["Try changing angle now.  How is this different?"] = "";
t["Kind of weird that the strokeRect() uses -50 for the left and top, isn't it?  But the top left of the box is still at (50, 50), because we translated to (100, 100), and 100 - 50 = 50."] = "";
t["When we rotate, we rotate around (100, 100) because of the translate().  Oh, and (100, 100) is the center of the box!  So, this box is rotating around its center!"] = "";
t["translate() and rotate() add to any earlier translate() and rotate(), unless you restore() the old state.  Try changing angle or uncommenting save() and restore()!"] = "";
t["Did that do what you expected?  You see why it did what it did?  With the save() and restore(), the second box is black and gets drawn right on top of the first purple box."] = "";
t["Can you move the black box off the purple box?  So you can see both?"] = "";
t["Here is one way. See how the translate() is to a different spot?  Try changing angle now!  Did you try a negative number of angle like -0.2?"] = "";
t["Boxes rotated relative to their center are usually what you want.  Look, a function that makes boxes rotated to different angles!  Can you add a few more boxes?"] = "";
t["Quiz: Rotation and Translation"] = "";
t["You coder now? Show me! Draw a box rotated by -0.5.  Hint: Use c.rotate(); and c.strokeRect();"] = "";
t["Oh, that too easy? You want harder problems? Draw five boxes on top of each other, each rotated by 0.3 more than the last.<br>Hint: c.translate() might be useful<br>Hint: For loops look like <span class=tutor-code>for (var i = 0; i < 5; i += 1) {</span>"] = "";
t["Did you get something like this? See how this works?  It first moves a spot with translate(), then repeatedly draws squares around that spot and rotates around that spot."] = "";
t["Play with it a bit!  Try changing num and angle!"] = "";
t["A Hard Problem"] = "";
t["Let's say we want to try to draw a tree.  How might you do that?"] = "";
t["Trees have branches.  Here is a start. Can you add more branches?"] = "";
t["Oog, that a lot of work."] = "";
t["Me try using variables.  Does that make it easier?  Not sure it does. What do you think?"] = "";
t["Bleah, that still too much work. For loop maybe?  How might that work? I don't know.  How would we draw two branches from every branch? I'm not sure.  What do you think?"] = "";
t["No, I can't see a way to draw trees easily using a for loop.  What else we got?  Can we use functions?"] = "";
t["Maybe a function could draw a branch.  But how could every branch draw two more branches?"] = "";
t["Let's start with a function that draws a branch.  Here's one.  It takes four numbers, where to start (x,y), the length <span class=tutor-code>l</span>, and the <span class=tutor-code>direction</span> which says whether to draw left, right, or straight."] = "";
t["<span class=tutor-code>direction</span> works by slanting the branch left (for negative numbers) or right (for positive).  See?  Try changing it!"] = "";
t["How can we make this draw two more branches now?"] = "";
t["Recursion"] = "";
t["Ah, me know, make function use itself! Can you see what this is doing?"] = "";
t["That crazy! Here's a version that's easier to twiddle.  Try playing with it!  Change <span class=tutor-code>xScale</span>, <span class=tutor-code>yScale</span>, or <span class=tutor-code>minLength</span>!  Cool, huh?"] = "";
t["There are a couple new things here.  Monster stop to explain."] = "";
t["drawBranch() is a <i>recursive</i> function.  That means it calls itself."] = "";
t["drawBranch() only calls itself if <span class=tutor-code>l > minLength</span>.  <span class=tutor-code>l</span> gets smaller and smaller every time drawBranch() calls itself, so drawBranch() stops calling itself eventually when the length of a branch gets small enough."] = "";
t["Recursive functions are neat, but tricky! Let's do a bit more. Change this to call <span class=tutor-code>nSquareRecursive(4);</span> instead of <span class=tutor-code>nSquare(4);</span>"] = "";
t["Other than not being blue, it's the same, right?  Do you see how they both work?"] = "";
t["nSquare() uses a for loop, starts at 4, and counts down: 4, 3, 2, 1."] = "";
t["nSquareRecursive() calls itself with one less each time.  So, when called with 4, it calls itself with 3, and that call calls itself with 2, and that call calls itself with 1.  At one, it says, stop calling yourself, so it stops.  And, on each call, it draws a box located at (n * 30, n * 30).  See?"] = "";
t["This little piece of code draws a shrinking pile of boxes. See how it works?"] = "";
t["The way it works is it does a translate() to the bottom right corner of the box, then draws the box back up behind it, so a box size big starting at (-size, -size).  Then, as long as the boxes haven't gotten too small, it does that again by calling itself, but shrinking the size of the box the next time."] = "";
t["Here is the same thing using a for loop instead. Compare the two. See how they both work?"] = "";
t["The for loop starts by drawing a box of size 100, then one of 65, and so on.  So does the recursive version, but the recursive version does it by calling itself."] = "";
t["You can change them if you want!  Go experiment!"] = "";
t["Rotation, Translation, and Recursion"] = "";
t["Back to trees.  Ooo!  An even better tree!"] = "";
t["See how this works? It uses translate() to move to the end of a branch, then rotate() to tilt the branches off to one side or the other."] = "";
t["Try changing <span class=tutor-code>angle</span>, <span class=tutor-code>branchScale</span>, <span class=tutor-code>l</span>, and <span class=tutor-code>minL</span>!  If you experiment a bit, you can get some really cool drawings.  Play with it!"] = "";
t["I think it would look even more like a tree if <span class=tutor-code>angle</span> was a little more random.  Can you make angle bigger and then make rotate() use a number between 0 and angle? (Hint: <span class=tutor-code>Math.random()</span> makes a number from 0.0 to 1.0)"] = "";
t["Here is one version.  Can you make the <span class=tutor-code>branchScale</span> more random too?"] = "";
t["Ooo!  That's very tree-like!"] = "";
t["Try changing <span class=tutor-code>angle</span>, <span class=tutor-code>branchScale</span>, <span class=tutor-code>l</span>, and <span class=tutor-code>minL</span>!  If you experiment a bit, you can get some pretty wild stuff!"] = "";
t["Drawing Your Own Tree"] = "";
t["I bet you can draw your own trees now!  Want to try?  I'll help you!"] = "";
t["Let's draw different trees than we did before.  Let's make this plant alternate between splitting off branches right and left.  Some plants do that.  Ready to start?  I'll guide you through it!"] = "";
t["So, first we need a branch.  Let's make a function drawBranch() that takes two values, a length called <span class=tutor-code>l</span> and a <span class=tutor-code>direction</span>."] = "";
t["Do you remember how to write a function like that?  You don't need to make it do anything yet, just declare a function called drawBranch()."] = "";
t["Were you thinking something like this?"] = "";
t["I've added some comments about what do to next.  We need to start drawing our tree.  Can you write the code beneath each of the comments?"] = "";
t["Okay, so you translate() so you start at the right spot and then you try to draw a branch.  Now we need to make drawBranch() do something!  Can you do what the comments say to do?  You should get a single branch (which will look like the trunk of the tree) when you are done."] = "";
t["You should have something like this now.  Let's keep going!  Look for the comments to tell you what to do next!"] = "";
t["Great!  Now you have drawn your first branch, moved to the end of that branch, and you're ready to draw more branches!"] = "";
t["Let's stop for a second and think about what we're going to want to do next."] = "";
t["This plant is going to split off two branches, one going up, one going off to the side.  We want the ones going off to the side to alternative, first right, then left, then right, then left."] = "";
t["We'll keep splitting and drawing and splitting and drawing until the branches get very short."] = "";
t["Let's add that next.  We should only draw more branches if the length <span class=tutor-code>l</span> is more than 5.  Can you add that?"] = "";
t["You should have this now."] = "";
t["Let's add just the branch going straight up.  Let's make it a little shorter that the last branch we drew.  Follow the instructions in the comments."] = "";
t["Do you have this now?  See what it does?  It repeatedly draws a branch straight up, making the branch a little shorter each time.  It looks like a line, but it's really a bunch of branches piled on top of each other."] = "";
t["Pretty boring so far?"] = "";
t["It's about to get a lot more exciting!"] = "";
t["Let's add the second branch!  For that branch, we are going to rotate to the side indicated by direction, then draw a shorter branch.  Follow the instructions in the comments."] = "";
t["Aieeee!  What did you do?"] = "";
t["Just kidding!  It's all fine!"] = "";
t["This is just part of what is called debugging, getting the bugs (the problems) out."] = "";
t["So, that didn't do what you expected it to do, did it?"] = "";
t["Any idea what's wrong?"] = "";
t["What's happening is that all those translate() and rotate() calls are pilled on top of each other.  We didn't really want that.  When it's time to draw the second branch, we really want everything to be the way it was when we did the first branch, but it's not, we've translated and rotated all over the place."] = "";
t["Save and restore to the rescue!  Can you add <span class=tutor-code>c.save();</span> and <span class=tutor-code>c.restore();</span> where the comments say to add them?"] = "";
t["That's mostly better.  But it's only drawing one side of the tree!  Why is that?"] = "";
t["Figure it out?"] = "";
t["It's because we didn't switch direction.  Direction is always the same as what it was at the start, it is always 1.  It should alternate, 1, -1, 1, -1 ..."] = "";
t["Can you make it so both of the drawBranch() calls inside of drawBranch() use -direction instead of direction?"] = "";
t["Do you know have this?  Wow, nice work!"] = "";
t["Play with Your Tree"] = "";
t["Try playing with it more! Try changing the 0.8, 0.7, and 0.5 to see what happens!"] = "";
t["Look! Green leaves on the ends of the branches!"] = "";
t["See how that works? The little size 4 green squares are the leaves! They are only added when we get to the end of the branch."] = "";
t["Can you make the branches brown?"] = "";
t["Fun with Ferns"] = "";
t["Let me show you something really cool that is only a minor change from what you just did!"] = "";
t["This fern is drawn just by doing three branches from each branch, each rotated at -80, 10, and 100 degrees.  See how it works?"] = "";
t["Every time it draws a branch, it draws three more branches from the end of that branch.  It keeps doing that and doing that, smaller and smaller, and you get what looks like a fern!"] = "";
t["Fractals"] = "";
t["All this stuff with trees and ferns are a type of pattern called a <i>fractal</i>. Fractals are crazy cool fun with math."] = "";
t["This fractal is called the Terdragon."] = "";
t["If you make l bigger, you can zoom in and see it's made of little triangles!"] = "";
t["Can you figure out how it works? Take a look at the code."] = "";
t["Try making <span class=tutor-code>l=10</span> and then <span class=tutor-code>n=1</span> and then <span class=tutor-code>n=2</span> then <span class=tutor-code>n=3</span>, and you'll see how it grows."] = "";
t["Quiz: Challenge Problem"] = "";
t["Okay, it's time for the last quiz.  This one is hard, so don't worry if you can't finish it.  There is a lot of good stuff coming after this.  Whatever you do, don't quit here, make sure to keep going so you can see all the fun stuff!"] = "";
t["For the quiz, I want you to write something entirely yourself.  Make a checkerboard pattern, a black square, then a white, then a black, and so on, at least four rows of them (like a 6 x 4 grid).  Can you do it?"] = "";
t["If you did it, good job, this is really hard, I'm impressed!  If you didn't get it, no worries, here's a hint, you might need two for loops, one inside the other, you'll use at least one c.fillRect(), and don't forget a for loop looks like <span class=tutor-code>for (var i = 0; i < 3; i += 1) {</span>"] = "";
t["Ready to see different ways to solve it?"] = "";
t["Many Ways to Code"] = "";
t["Here is one way.  See how this works?"] = "";
t["If not, try commenting out one of the fillSquare() lines (using <span class=tutor-code>//</span>) so you can see what the other is drawing."] = "";
t["It draws the first and third rows, starting at (0, 0), then doing (0, 100), then doing (100, 0), then (100, 100), and so on.  Then it draws the second and fourth rows, starting at (50, 50), then (50, 150), and so on.  Make sense?"] = "";
t["Let's look at a few more ways of doing a checkboard.  Here is another version. See how this works?"] = "";
t["Every time through the loop, it draws two squares, below and to the right of the other."] = "";
t["Then, it does that three times across and twice down, skipping over the white squares.  Cool, huh?"] = "";
t["Modulo"] = "";
t["Here is yet another way of doing a checkboard.  Any idea how this works?  What's that <span class=tutor-code>i % 2</span> doing?"] = "";
t["<span class=tutor-code>%</span> mean modulo, it gives the remainder after dividing."] = "";
t["So, <span class=tutor-code>1 % 2</span> is 1, <span class=tutor-code>2 % 2</span> is 0 (because 2 divides 2 evenly with no remainder), <span class=tutor-code>3 % 2</span> is 1 again, <span class=tutor-code>4 % 2</span> is 0."] = "";
t["So, how does that complicated expression -- <span class=tutor-code>(i % 2 + j % 2) % 2</span> -- work? When i is even, <span class=tutor-code>i % 2</span> will be 0.  Same for j.  If both are odd, then you get (1 + 1) % 2, which is 0. So, that expression will be 0 if both i and j are even or both i and j are odd."] = "";
t["For if statements, 0 means false and anything else is true.  So, we'll do what's inside the if statement only when only one of i or j is odd."] = "";
t["So, what this does is visit all the squares in the 6 x 4 grid, but only draw a black square in the ones where either the column number or row number is odd but not both.  Make sense now?"] = "";
t["See how many ways there are to solve a problem like this?  There is usually not just one solution to something you want to do, lots of strategies might work.  Isn't that neat?"] = "";
t["Animation"] = "";
t["Okay, time for some fun! Let's do animation!"] = "";
t["Moving stuff is fun but a little weird.  You need to make something happen every 1/20th of a second or so. What is this doing?"] = "";
t["The way this works is that, every time we are told to do drawStep(), we erase the screen, move the box, draw the box, and, unless we hit the edge, we say to do drawStep() again a little while later."] = "";
t["Try changing <span class=tutor-code>vx</span>, <span class=tutor-code>vy</span>, and <span class=tutor-code>step</span>. You can change the speed of the box and make it move different directions!"] = "";
t["Try commenting out the clearRect().  That's kind of cool, isn't it?"] = "";
t["Rotating Movement"] = "";
t["Spinning a box is fun.  Can you make it go faster?"] = "";
t["This works the same way as the moving box.  Every time it is told to do drawStep(), it clears the screen, rotates, draws the box, and then says to do drawStep() again in a little while later."] = "";
t["What happens if you comment out the clearRect()?"] = "";
t["Try adding more boxes. Did it do what you expected?"] = "";
t["I like this version.  It's like a solar system!  Try changing the speed now!"] = "";
t["Objects"] = "";
t["Stop for a sec.  Sit back and think about how you might create three moving boxes."] = "";
t["Well, you'd need the x and y position of each, right?  And the size of each.  And maybe the dx and dy velocity of each?  And the angle?"] = "";
t["You could create variables x1, x2, x3, y1, y2, y3, dx1 ... ugh.  That's getting painful, isn't it?"] = "";
t["There's another way to do this, we can make objects!  Objects are little bundles of variables and code. Here's a box object.  Take a look at it.  See how it works?"] = "";
t["What is going on is <span class=tutor-code>new Box(10, 10, 100)</span> creates an object, then immediately calls the Box() function to set it up.  Box() then uses <span class=tutor-code>this.x</span> to set a variable named x in the object to the x that was passed into the function."] = "";
t["It does the same thing to set up all the other variables in our new Box object.  Once the object is created and set up, we set our variable <span class=tutor-code>b</span> to that.  Later, we can get at the x and y and other variables of our box using <span class=tutor-code>b.x</span>, <span class=tutor-code>b.y</span>, and so forth."] = "";
t["Our box object is just a little bundle of variables that describe our box.  It says where the box is, its velocity (dx and dy), how big it is, everything that it means to be a box."] = "";
t["We can even have box objects know how to draw themselves."] = "";
t["See how <span class=tutor-code>this.stroke</span> is set equal to a function?  And that function calls strokeRect() to draw this box?  Then, later, we create a box called b1 and tell it to draw itself with <span class=tutor-code>b1.stroke()</span>. That's pretty cool, isn't it?"] = "";
t["Canvas Object"] = "";
t["You know, monster has a secret.  Monster been hiding something from you."] = "";
t["Have you been wondering why we use c.strokeRect() to draw a box?  What's the deal with that <span class=tutor-code>c.</span>?  Why is that there?"] = "";
t["Turns out all this time you have been using an object to draw, an object called the canvas object."] = "";
t["Monster added some code for you to get that object from the web page and put it in a variable named <span class=tutor-code>c</span>, so you could use it.  Let me show you what that hidden code looks like."] = "";
t["That code asks the document object (which is the web page) to give us the element in the web page called 'pane' (which is the id in the web page of the canvas where we draw), and then gets the 2d drawing canvas from that element.  We name that canvas object <span class=tutor-code>c</span> and use all its drawing functions, which is why we use <span class=tutor-code>c.</span> in front of every use of strokeRect()."] = "";
t["Using Objects"] = "";
t["That's useful to know if you write your own Javascript for your own drawing in web pages later!  But, for now, let me hide it again, so we can focus on Box objects."] = "";
t["Can you create a couple more boxes and have them draw themselves? For each one, you'll have to use new and stroke(), like we did for the box we called b1."] = "";
t["That's pretty nice, but calling each box b1, b2, b3, or whatever is painful. What if I want ten boxes?  Or a hundred?"] = "";
t["Lists (Arrays)"] = "";
t["What I need is a list of boxes, like this!"] = "";
t["A big new thing here.  Monster explain."] = "";
t["<span class=tutor-code>[]</span> creates what is called an <i>array</i>, which basically is a list that holds stuff.  These lists can hold objects, numbers, whatever we want."] = "";
t["So, <span class=tutor-code>var boxes = []</span> means create an empty list and call it boxes."] = "";
t["<span class=tutor-code>boxes.push()</span> adds something to the end of the list.  Here, we use it to add a new box.  Because it is in a for loop that counts 0, 1, 2 and then stops, we will add three boxes to the end of the list."] = "";
t["Take a look at the second for loop.  <span class=tutor-code>boxes.length</span> is the length of the list.  <span class=tutor-code>boxes[0]</span> is the first box in the list, <span class=tutor-code>boxes[1]</span> the second, and so forth.  So, that second for loop goes through every box in the list and tells it to draw itself by calling <span class=tutor-code>boxes[i].stroke();</span>"] = "";
t["Can you add some more boxes?"] = "";
t["Methods on Objects"] = "";
t["So far, we haven't really done that much that requires Box objects.  But let's go a step further.  Let's make boxes that are animated and move!"] = "";
t["Let's start by making all our boxes draw to whatever angle they are supposed to be at.  See how this new version of stroke() works?"] = "";
t["Whenever a box is told to draw itself, we do that by moving to the center of the box, rotating around that center to match the angle of the box, and then draw the box around its center.  Kind of like what we did before for rotated boxes, right?"] = "";
t["Now let's make the boxes spin!  Look at the new function updateAll().  See what it is doing?"] = "";
t["updateAll() starts by clearing the screen, then rotates each box a little more before drawing it.  Finally, it says, call me again in 1/20th of a second.  So, 20 times a second, we rotate each box a little and redraw it.  Cool, huh?"] = "";
t["Can you make the boxes spin faster?"] = "";
t["Can you make them spin the other direction (counter-clockwise instead of clockwise)?"] = "";
t["Can you add more boxes?  You'll have to change three things to fit them all on the canvas, but I bet you can figure it out.  I liked it with 60 of them, looks really weird!"] = "";
t["All those fast spinning boxes make Monster dizzy.  Let's slow it down again and let me show you something else.  We can move the update into each Box object.  That will be handy when we make the update do more.  See what this does now?"] = "";
t["updateAll() just calls the update() of the box.  update() on the box changes the angle and then draws the box.  Each box knows how to update and draw itself now."] = "";
t["Velocity and Collisions"] = "";
t["Let's make the boxes move too!  All we have to do is have update use <span class=tutor-code>dx</span> and <span class=tutor-code>dy</span>.  Take a look at <span class=tutor-code>Box</span> and how it is updated now!"] = "";
t["It's a little more complicated, but only a little.  Every time a box is told to update(), it moves by its velocity (<span class=tutor-code>dx</span> and <span class=tutor-code>dy</span>) and rotates by its angular velocity (<span class=tutor-code>da</span>)."] = "";
t["If a box gets off the edge of the screen, we reverse its velocities, making it appear to bounce!  Cool!"] = "";
t["Bitwise Operators (And and Or)"] = "";
t["One thing that is new here.  When the box checks if it is off the screen, there's something you haven't seen before, <span class=tutor-code>||</span>"] = "";
t["<span class=tutor-code>||</span> means <i>or</i>, as in either-or, so the first if statement checks if the box has either gone off the left or right edge, and the second checks if it has gone off the top or bottom.  Make sense?"] = "";
t["There is also a way to say <i>and</i>, as in both have to be true, which is <span class=tutor-code>&&</span>.  So, <span class=tutor-code>||</span> means <i>or</i> and <span class=tutor-code>&&</span> means <i>and</i>."] = "";
t["Easy with Objects"] = "";
t["Back to the fun.  Have you tried putting in a lot of boxes yet?  Try it!  Make it so there are 10 boxes!  Or 50!"] = "";
t["See how easy it is to keep track of all these boxes, their position, angle, velocity, and everything else, using objects?  Once you say what a Box object is, it's easy to create lots and lots of them!"] = "";
t["Circles, Arcs, and Balls"] = "";
t["You're nearing the end of the lessons now.  But I still have a couple fun things to show you."] = "";
t["Now that you know about objects with velocity, we actually are really close to being able to do cool things like make a ball bounce.  All we need is a little physics, some acceleration to go with our velocities!"] = "";
t["Here's a <span class=tutor-code>Ball</span> object.  It's a lot like the Box object you saw before, but has differences.  Take a look at the code."] = "";
t["One big difference is that a ball is round, so angle doesn't matter.  Look at the code.  There is no angle any more, right?"] = "";
t["Another big difference is that we use arc() to draw circles.  Arcs are cool, but they're a little complicated for just drawing a circle. Let me explain how they work."] = "";
t["To draw a circle in Javascript, you call <span class=tutor-code>c.arc(x, y, r, 0, Math.PI * 2);</span>, where (x, y) is the center of the circle, r is the radius, and then 0 and <span class=tutor-code>Math.PI * 2</span> says to draw an arc from 0 degrees to 360 degrees (since 2 * pi in radians is 360 degrees)."] = "";
t["Because we draw circles from the center, a bunch of other things change, such as exactly how we check of whether we need to bounce off the sides."] = "";
t["Take a look at the code again.  Does it make more sense now?"] = "";
t["Acceleration, Velocity, and Physics"] = "";
t["Okay, now we want to make a bouncing ball.  To do physics, we need velocity and acceleration.  So far, we have had velocity, but no acceleration.  Let's add acceleration!  Here it is!"] = "";
t["Do you see it?  Now, every time we update() on a Ball (and the ball isn't bouncing, to simplify things), we change the downward velocity (<span class=tutor-code>dy</span>) by whatever gravity is."] = "";
t["Pretty cool!  Try adding 10-15 balls and watch it for a while.  It's a full physics simulation with gravity and bouncing!  Very fun!"] = "";
t["Collisions and Physics"] = "";
t["Let me show you one more thing before we move on from bouncing balls.  What is called a partially elastic collision."] = "";
t["In the real world, when things collide, they usually bounce off each other slower than before.  That's why, when you drop a ball, it doesn't keep bouncing forever."] = "";
t["If you look at the code in update, there is now a friction force applied when the balls bounce off the walls.  It makes them bounce off slower than they came in.  Eventually, the balls all stop bouncing and slowly roll along the bottom."] = "";
t["Cool simulation, and adds some realism.  Play with it a bit!  Change the friction, add more balls, increase gravity, change timeStep.  Try messing around with it!"] = "";
t["Mouse Events"] = "";
t["For our last lessons, let's work a bit with tracking the mouse.  This is a lot of fun!"] = "";
t["Here is a ball that sticks to the mouse.  Every time the mouse moves, the ball redraws on top of the mouse."] = "";
t["How does it work?  It starts by setting the variable pane to the element of the web page called 'pane', which happens to be the one our drawing canvas is in."] = "";
t["<span class=tutor-code>pane.onmousemove = function(evt) {};</span> is really important.  That code binds a function to the <i>onmousemove</i> event on the 'pane' element, which means this function is called any time the mouse moves inside the drawing canvas."] = "";
t["Our function then asks the event where the mouse is (the <span class=tutor-code>clientX</span> and <span class=tutor-code>clientY</span>) and draws a big circle around it.  Make sense?"] = "";
t["Springs and Physics"] = "";
t["What's really cool about this is that we can combine it with animation.  Look at this!"] = "";
t["What this does is, every time the mouse moves in the canvas area, it sets <span class=tutor-code>mouseX</span> and <span class=tutor-code>mouseY</span> to the location of the mouse."] = "";
t["Then, when each ball is updated, it figures out how far away from the mouse it is, and accelerates toward it."] = "";
t["The acceleration is the square root of the distance, so it pulls harder when it is really far away.  Imagine all the balls being connected to the mouse by little rubber bands or springs.  It's a little like that."] = "";
t["Try making the balls smaller!  And add more of them!  I like it with about 40 small balls chasing the mouse."] = "";
t["The End"] = "";
t["Great job! Like what you learned? Was it fun?"] = "";
t["Wow, you did everything!  Congratulations, nice work!  A lot of these are really hard. I'm impressed you finished!  I hope you enjoyed it!"] = "";

var count = 0;
var notFound = [];
for(var i = 0; i < lessons.length; ++i)
{
    var l = lessons[i];
    if(l.message)
    {
        var n = t[l.message];
        if(n) 
        {
            l.message = n;
            ++count;
        }
        else
        {
            notFound.push(l.message);
        }
    }
    
    if(l.lessonSection)
    {
        var n = t[l.lessonSection];
        if(n) 
        {
            l.lessonSection = n;
            ++count;
        }
        else
        {
            notFound.push(l.lessonSection);
        }
    }
}

eval(updatePreview.toString().replace("updatePreview", "updatePreviewNew").replace("Great, you did it!", "מעולה, עשית זאת!").replace("you did it!", "עשית זאת!"));
updatePreview = updatePreviewNew;
initCode();
initLesson();

$("#back-button").html("חזרה");
$("#reset-button").html("איפוס");
$("#tutor-message").css("direction", "rtl");
unsafeWindow.console.log(count + " strings was replaced, " + notFound.length + " still not found");