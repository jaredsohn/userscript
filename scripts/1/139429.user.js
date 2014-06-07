// ==UserScript==
// @name            Parse trivia questions
// @description     This is just for sharing C# code, don't install in browser
// ==/UserScript==

        static void Main(string[] args)
        {
            string[] lines = File.ReadAllLines(@"c:\temp\tb.sql");
            const string insert = "INSERT INTO `questions` VALUES ";
            string[] splitter = new string[1];
            splitter[0] = "),(";
            string[] splitter2 = new string[1];
            splitter2[0] = ",'";
            StringBuilder sb = new StringBuilder();
            foreach(string line in lines)
            {
                if (!line.StartsWith(insert))
                    continue;
                string s = line.Replace(insert, "").Replace("\\r","");
                Console.WriteLine("line length: " + s.Length);
                string[] fields1 = s.Split(splitter, StringSplitOptions.RemoveEmptyEntries);
                Console.WriteLine("  and " + fields1.Length + " fields");
                foreach(string s1 in fields1)
                {
                    string[] fields2 = s1.Split(splitter2, StringSplitOptions.RemoveEmptyEntries);
                    if (fields2.Length != 3)
                    {
                        Console.WriteLine("ERROR with [" + s1 + "]");
                        sb.Append("BUGBUG: " + s1);
                        continue;
                    }
                    sb.Append("{'question': '" +fields2[1] + ", 'answers':['" + fields2[2] + "]},\n");
                }
            }
            Console.WriteLine("final size is " + sb.Length);
            File.WriteAllText(@"c:\temp\tb2.txt", sb.ToString());
        }
