export default [
// {
//     "key": "checkstyle:com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck",
//     "repo": "checkstyle",
//     "name": "Cyclomatic Complexity",
//     "createdAt": "2017-10-02T21:16:26+1000",
//     "htmlDesc": "<p>\nChecks cyclomatic complexity of methods against a specified limit. The complexity is measured by the number of if, while, do, for, ?:, catch, switch, case  statements, and operators &amp;&amp; and || (plus one) in the body of a constructor, method, static initializer, or instance initializer. It is a measure of the minimum number of possible paths through the source and therefore the number of required tests. Generally 1-4 is considered good, 5-7 ok, 8-10 consider re-factoring, and 11+ re-factor now !\n</p>\n\n<p>\n</p>",
//     "mdDesc": "<p>\nChecks cyclomatic complexity of methods against a specified limit. The complexity is measured by the number of if, while, do, for, ?:, catch, switch, case  statements, and operators &amp;&amp; and || (plus one) in the body of a constructor, method, static initializer, or instance initializer. It is a measure of the minimum number of possible paths through the source and therefore the number of required tests. Generally 1-4 is considered good, 5-7 ok, 8-10 consider re-factoring, and 11+ re-factor now !\n</p>\n\n<p>\n</p>",
//     "severity": "MAJOR",
//     "status": "READY",
//     "internalKey": "Checker/TreeWalker/CyclomaticComplexity",
//     "isTemplate": false,
//     "tags": [],
//     "sysTags": [
//     "size"
// ],
//     "lang": "java",
//     "langName": "Java",
//     "params": [
//     {
//         "key": "switchBlockAsSingleDecisionPoint",
//         "htmlDesc": "whether to treat the whole switch block as a single decision point",
//         "defaultValue": "false",
//         "type": "BOOLEAN"
//     },
//     {
//         "key": "max",
//         "htmlDesc": "the maximum threshold allowed.",
//         "defaultValue": "10",
//         "type": "INTEGER"
//     },
//     {
//         "key": "tokens",
//         "htmlDesc": "tokens to check",
//         "defaultValue": "LITERAL_WHILE,LITERAL_DO,LITERAL_FOR,LITERAL_IF,LITERAL_SWITCH,LITERAL_CASE,LITERAL_CATCH,QUESTION,LAND,LOR",
//         "type": "SINGLE_SELECT_LIST,multiple=true,values=\"LITERAL_WHILE,LITERAL_DO,LITERAL_FOR,LITERAL_IF,LITERAL_SWITCH,LITERAL_CASE,LITERAL_CATCH,QUESTION,LAND,LOR,\""
//     }
// ],
//     "defaultDebtRemFnType": "CONSTANT_ISSUE",
//     "defaultDebtRemFnOffset": "3h",
//     "debtOverloaded": false,
//     "debtRemFnType": "CONSTANT_ISSUE",
//     "debtRemFnOffset": "3h",
//     "defaultRemFnType": "CONSTANT_ISSUE",
//     "defaultRemFnBaseEffort": "3h",
//     "remFnType": "CONSTANT_ISSUE",
//     "remFnBaseEffort": "3h",
//     "remFnOverloaded": false,
//     "type": "CODE_SMELL"
// },
//     {
//         "key": "checkstyle:com.puppycrawl.tools.checkstyle.checks.naming.MethodNameCheck",
//         "repo": "checkstyle",
//         "name": "Method Name",
//         "createdAt": "2017-10-02T21:16:26+1000",
//         "htmlDesc": "Checks that method names conform to the specified format\n\n<p>\n</p>",
//         "mdDesc": "Checks that method names conform to the specified format\n\n<p>\n</p>",
//         "severity": "MAJOR",
//         "status": "READY",
//         "internalKey": "Checker/TreeWalker/MethodName",
//         "isTemplate": false,
//         "tags": [],
//         "sysTags": [
//             "naming"
//         ],
//         "lang": "java",
//         "langName": "Java",
//         "params": [
//             {
//                 "key": "allowClassName",
//                 "htmlDesc": "Controls whether to allow a method name to have the same name as the residing class name. This is not to be confused with a constructor. An easy mistake is to place a return type on a constructor declaration which turns it into a method.",
//                 "defaultValue": "false",
//                 "type": "BOOLEAN"
//             },
//             {
//                 "key": "applyToPackage",
//                 "htmlDesc": "Controls whether to apply the check to package-private member.",
//                 "defaultValue": "true",
//                 "type": "BOOLEAN"
//             },
//             {
//                 "key": "format",
//                 "htmlDesc": "Regular expression",
//                 "defaultValue": "^[a-z][a-zA-Z0-9]*$",
//                 "type": "STRING"
//             },
//             {
//                 "key": "applyToPublic",
//                 "htmlDesc": "Controls whether to apply the check to public member.",
//                 "defaultValue": "true",
//                 "type": "BOOLEAN"
//             },
//             {
//                 "key": "applyToPrivate",
//                 "htmlDesc": "Controls whether to apply the check to private member.",
//                 "defaultValue": "true",
//                 "type": "BOOLEAN"
//             },
//             {
//                 "key": "applyToProtected",
//                 "htmlDesc": "Controls whether to apply the check to protected member.",
//                 "defaultValue": "true",
//                 "type": "BOOLEAN"
//             }
//         ],
//         "defaultDebtRemFnType": "CONSTANT_ISSUE",
//         "defaultDebtRemFnOffset": "10min",
//         "debtOverloaded": false,
//         "debtRemFnType": "CONSTANT_ISSUE",
//         "debtRemFnOffset": "10min",
//         "defaultRemFnType": "CONSTANT_ISSUE",
//         "defaultRemFnBaseEffort": "10min",
//         "remFnType": "CONSTANT_ISSUE",
//         "remFnBaseEffort": "10min",
//         "remFnOverloaded": false,
//         "type": "CODE_SMELL"
//     },
    {
        "key": "squid:UndocumentedApi",
        "repo": "squid",
        "name": "Public types, methods and fields (API) should be documented with Javadoc",
        "createdAt": "2017-09-13T20:09:07+1000",
        "htmlDesc": "<p>Try to imagine using the standard Java API (Collections, JDBC, IO, ...) without Javadoc. It would be a nightmare, because Javadoc is the only way\nto understand of the contract of the API. Documenting an API with Javadoc increases the productivity of the developers consuming it.</p>\n<p>On top of a main description for each member of a public API, the following Javadoc elements are required to be described:</p>\n<ul>\n  <li> Parameters, using <code>@param parameterName</code>. </li>\n  <li> Thrown exceptions, using <code>@throws exceptionName</code>. </li>\n  <li> Method return values, using <code>@return</code>. </li>\n  <li> Generic types, using <code>@param &lt;T&gt;</code>. </li>\n</ul>\n<p>Furthermore the following guidelines should be followed:</p>\n<ul>\n  <li> At least 1 line of description which should have more than one word. </li>\n  <li> All parameters documented with <code>@param</code>, and names should match. </li>\n  <li> All checked exceptions documented with <code>@throws</code> </li>\n  <li> <code>@return</code> present and documented when not <code>void</code>. </li>\n  <li> Placeholders like \"TODO\", \"FIXME\", \"...\" should be avoided. </li>\n</ul>\n<p>The following public methods and constructors are not taken into account by this rule:</p>\n<ul>\n  <li> Getters and setters. </li>\n  <li> Methods with <code>@Override</code> annotation. </li>\n  <li> Empty constructors. </li>\n  <li> Static constants. </li>\n</ul>\n<h2>Noncompliant Code Example</h2>\n<pre>\n/**\n  * This is a Javadoc comment\n  */\npublic class MyClass&lt;T&gt; implements Runnable {    // Noncompliant - missing '@param &lt;T&gt;'\n\n  public static final DEFAULT_STATUS = 0;    // Compliant - static constant\n  private int status;                           // Compliant - not public\n\n  public String message;                  // Noncompliant\n\n  public MyClass() {                         // Noncompliant - missing documentation\n    this.status = DEFAULT_STATUS;\n  }\n\n  public void setStatus(int status) {  // Compliant - setter\n    this.status = status;\n  }\n\n  @Override\n  public void run() {                          // Compliant - has @Override annotation\n  }\n\n  protected void doSomething() {    // Compliant - not public\n  }\n\n  public void doSomething2(int value) {  // Noncompliant\n  }\n\n  public int doSomething3(int value) {  // Noncompliant\n    return value;\n  }\n}\n</pre>\n<h2>Compliant Solution</h2>\n<pre>\n/**\n  * This is a Javadoc comment\n  * @param &lt;T&gt; the parameter of the class\n  */\npublic class MyClass&lt;T&gt; implements Runnable {\n\n  public static final DEFAULT_STATUS = 0;\n  private int status;\n\n  /**\n    * This is a Javadoc comment\n    */\n  public String message;\n\n  /**\n   * Class comment...\n   */\n  public MyClass() {\n    this.status = DEFAULT_STATUS;\n  }\n\n  public void setStatus(int status) {\n    this.status = status;\n  }\n\n  @Override\n  public void run() {\n  }\n\n  protected void doSomething() {\n  }\n\n  /**\n    * Will do something.\n    * @param value the value to be used\n    */\n  public void doSomething(int value) {\n\n  /**\n    *  {@inheritDoc}\n    */\n  public int doSomething(int value) {\n    return value;\n  }\n}\n</pre>",
        "mdDesc": "<p>Try to imagine using the standard Java API (Collections, JDBC, IO, ...) without Javadoc. It would be a nightmare, because Javadoc is the only way\nto understand of the contract of the API. Documenting an API with Javadoc increases the productivity of the developers consuming it.</p>\n<p>On top of a main description for each member of a public API, the following Javadoc elements are required to be described:</p>\n<ul>\n  <li> Parameters, using <code>@param parameterName</code>. </li>\n  <li> Thrown exceptions, using <code>@throws exceptionName</code>. </li>\n  <li> Method return values, using <code>@return</code>. </li>\n  <li> Generic types, using <code>@param &lt;T&gt;</code>. </li>\n</ul>\n<p>Furthermore the following guidelines should be followed:</p>\n<ul>\n  <li> At least 1 line of description which should have more than one word. </li>\n  <li> All parameters documented with <code>@param</code>, and names should match. </li>\n  <li> All checked exceptions documented with <code>@throws</code> </li>\n  <li> <code>@return</code> present and documented when not <code>void</code>. </li>\n  <li> Placeholders like \"TODO\", \"FIXME\", \"...\" should be avoided. </li>\n</ul>\n<p>The following public methods and constructors are not taken into account by this rule:</p>\n<ul>\n  <li> Getters and setters. </li>\n  <li> Methods with <code>@Override</code> annotation. </li>\n  <li> Empty constructors. </li>\n  <li> Static constants. </li>\n</ul>\n<h2>Noncompliant Code Example</h2>\n<pre>\n/**\n  * This is a Javadoc comment\n  */\npublic class MyClass&lt;T&gt; implements Runnable {    // Noncompliant - missing '@param &lt;T&gt;'\n\n  public static final DEFAULT_STATUS = 0;    // Compliant - static constant\n  private int status;                           // Compliant - not public\n\n  public String message;                  // Noncompliant\n\n  public MyClass() {                         // Noncompliant - missing documentation\n    this.status = DEFAULT_STATUS;\n  }\n\n  public void setStatus(int status) {  // Compliant - setter\n    this.status = status;\n  }\n\n  @Override\n  public void run() {                          // Compliant - has @Override annotation\n  }\n\n  protected void doSomething() {    // Compliant - not public\n  }\n\n  public void doSomething2(int value) {  // Noncompliant\n  }\n\n  public int doSomething3(int value) {  // Noncompliant\n    return value;\n  }\n}\n</pre>\n<h2>Compliant Solution</h2>\n<pre>\n/**\n  * This is a Javadoc comment\n  * @param &lt;T&gt; the parameter of the class\n  */\npublic class MyClass&lt;T&gt; implements Runnable {\n\n  public static final DEFAULT_STATUS = 0;\n  private int status;\n\n  /**\n    * This is a Javadoc comment\n    */\n  public String message;\n\n  /**\n   * Class comment...\n   */\n  public MyClass() {\n    this.status = DEFAULT_STATUS;\n  }\n\n  public void setStatus(int status) {\n    this.status = status;\n  }\n\n  @Override\n  public void run() {\n  }\n\n  protected void doSomething() {\n  }\n\n  /**\n    * Will do something.\n    * @param value the value to be used\n    */\n  public void doSomething(int value) {\n\n  /**\n    *  {@inheritDoc}\n    */\n  public int doSomething(int value) {\n    return value;\n  }\n}\n</pre>",
        "severity": "MAJOR",
        "status": "READY",
        "internalKey": "S1176",
        "isTemplate": false,
        "tags": [],
        "sysTags": [
            "convention"
        ],
        "lang": "java",
        "langName": "Java",
        "params": [
            {
                "key": "forClasses",
                "htmlDesc": "Pattern of classes which should adhere to this constraint. Ex : *<strong>.api.</strong>*",
                "defaultValue": "**.api.**",
                "type": "STRING"
            },
            {
                "key": "exclusion",
                "htmlDesc": "Pattern of classes which are excluded from adhering to this constraint.",
                "defaultValue": "**.internal.**",
                "type": "STRING"
            }
        ],
        "defaultDebtRemFnType": "CONSTANT_ISSUE",
        "defaultDebtRemFnOffset": "10min",
        "debtOverloaded": false,
        "debtRemFnType": "CONSTANT_ISSUE",
        "debtRemFnOffset": "10min",
        "defaultRemFnType": "CONSTANT_ISSUE",
        "defaultRemFnBaseEffort": "10min",
        "remFnType": "CONSTANT_ISSUE",
        "remFnBaseEffort": "10min",
        "remFnOverloaded": false,
        "type": "CODE_SMELL"
    },
    {
        "key": "squid:CallToDeprecatedMethod",
        "repo": "squid",
        "name": "\"@Deprecated\" code should not be used",
        "createdAt": "2017-09-13T20:09:07+1000",
        "htmlDesc": "<p>Once deprecated, classes, and interfaces, and their members should be avoided, rather than used, inherited or extended. Deprecation is a warning\nthat the class or interface has been superseded, and will eventually be removed. The deprecation period allows you to make a smooth transition away\nfrom the aging, soon-to-be-retired technology.</p>\n<h2>Noncompliant Code Example</h2>\n<pre>\n/**\n * @deprecated  As of release 1.3, replaced by {@link #Fee}\n */\n@Deprecated\npublic class Fum { ... }\n\npublic class Foo {\n  /**\n   * @deprecated  As of release 1.7, replaced by {@link #doTheThingBetter()}\n   */\n  @Deprecated\n  public void doTheThing() { ... }\n\n  public void doTheThingBetter() { ... }\n}\n\npublic class Bar extends Foo {\n  public void doTheThing() { ... } // Noncompliant; don't override a deprecated method or explicitly mark it as @Deprecated\n}\n\npublic class Bar extends Fum {  // Noncompliant; Fum is deprecated\n\n  public void myMethod() {\n    Foo foo = new Foo();  // okay; the class isn't deprecated\n    foo.doTheThing();  // Noncompliant; doTheThing method is deprecated\n  }\n}\n</pre>\n<h2>See</h2>\n<ul>\n  <li> <a href=\"http://cwe.mitre.org/data/definitions/477.html\">MITRE, CWE-477</a> - Use of Obsolete Functions </li>\n  <li> <a href=\"https://www.securecoding.cert.org/confluence/x/KgAVAg\">CERT, MET02-J.</a> - Do not use deprecated or obsolete classes or methods </li>\n</ul>",
        "mdDesc": "<p>Once deprecated, classes, and interfaces, and their members should be avoided, rather than used, inherited or extended. Deprecation is a warning\nthat the class or interface has been superseded, and will eventually be removed. The deprecation period allows you to make a smooth transition away\nfrom the aging, soon-to-be-retired technology.</p>\n<h2>Noncompliant Code Example</h2>\n<pre>\n/**\n * @deprecated  As of release 1.3, replaced by {@link #Fee}\n */\n@Deprecated\npublic class Fum { ... }\n\npublic class Foo {\n  /**\n   * @deprecated  As of release 1.7, replaced by {@link #doTheThingBetter()}\n   */\n  @Deprecated\n  public void doTheThing() { ... }\n\n  public void doTheThingBetter() { ... }\n}\n\npublic class Bar extends Foo {\n  public void doTheThing() { ... } // Noncompliant; don't override a deprecated method or explicitly mark it as @Deprecated\n}\n\npublic class Bar extends Fum {  // Noncompliant; Fum is deprecated\n\n  public void myMethod() {\n    Foo foo = new Foo();  // okay; the class isn't deprecated\n    foo.doTheThing();  // Noncompliant; doTheThing method is deprecated\n  }\n}\n</pre>\n<h2>See</h2>\n<ul>\n  <li> <a href=\"http://cwe.mitre.org/data/definitions/477.html\">MITRE, CWE-477</a> - Use of Obsolete Functions </li>\n  <li> <a href=\"https://www.securecoding.cert.org/confluence/x/KgAVAg\">CERT, MET02-J.</a> - Do not use deprecated or obsolete classes or methods </li>\n</ul>",
        "severity": "MINOR",
        "status": "READY",
        "internalKey": "S1874",
        "isTemplate": false,
        "tags": [],
        "sysTags": [
            "cert",
            "cwe",
            "obsolete"
        ],
        "lang": "java",
        "langName": "Java",
        "params": [],
        "defaultDebtRemFnType": "CONSTANT_ISSUE",
        "defaultDebtRemFnOffset": "15min",
        "debtOverloaded": false,
        "debtRemFnType": "CONSTANT_ISSUE",
        "debtRemFnOffset": "15min",
        "defaultRemFnType": "CONSTANT_ISSUE",
        "defaultRemFnBaseEffort": "15min",
        "remFnType": "CONSTANT_ISSUE",
        "remFnBaseEffort": "15min",
        "remFnOverloaded": false,
        "type": "CODE_SMELL"
    },
    // {
    //     "key": "checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.MissingSwitchDefaultCheck",
    //     "repo": "checkstyle",
    //     "name": "Missing Switch Default",
    //     "createdAt": "2017-10-02T21:16:26+1000",
    //     "htmlDesc": "Checks that switch statement has default clause.",
    //     "mdDesc": "Checks that switch statement has default clause.",
    //     "severity": "MAJOR",
    //     "status": "READY",
    //     "internalKey": "Checker/TreeWalker/MissingSwitchDefault",
    //     "isTemplate": false,
    //     "tags": [],
    //     "sysTags": [],
    //     "lang": "java",
    //     "langName": "Java",
    //     "params": [],
    //     "defaultDebtRemFnType": "CONSTANT_ISSUE",
    //     "defaultDebtRemFnOffset": "30min",
    //     "debtOverloaded": false,
    //     "debtRemFnType": "CONSTANT_ISSUE",
    //     "debtRemFnOffset": "30min",
    //     "defaultRemFnType": "CONSTANT_ISSUE",
    //     "defaultRemFnBaseEffort": "30min",
    //     "remFnType": "CONSTANT_ISSUE",
    //     "remFnBaseEffort": "30min",
    //     "remFnOverloaded": false,
    //     "type": "CODE_SMELL"
    // },
    {
        "key": "squid:S1151",
        "repo": "squid",
        "name": "\"switch case\" clauses should not have too many lines of code",
        "createdAt": "2017-09-13T20:09:07+1000",
        "htmlDesc": "The 'switch' statement should be used only to clearly define some new branches in the control flow. As soon as a 'case' clause contains too many statements this highly decreases the readability of the overall control flow statement. In such case, the content of the 'case' clause should be extracted into a dedicated method.",
        "mdDesc": "<p>The <code>switch</code> statement should be used only to clearly define some new branches in the control flow. As soon as a <code>case</code>\nclause contains too many statements this highly decreases the readability of the overall control flow statement. In such case, the content of the\n<code>case</code> clause should be extracted into a dedicated method.</p>\n<h2>Noncompliant Code Example</h2>\n<p>With the default threshold of 5:</p>\n<pre>\nswitch (myVariable) {\n  case 0: // 6 lines till next case\n    methodCall1(\"\");\n    methodCall2(\"\");\n    methodCall3(\"\");\n    methodCall4(\"\");\n    break;\n  case 1:\n  ...\n}\n</pre>\n<h2>Compliant Solution</h2>\n<pre>\nswitch (myVariable) {\n  case 0:\n    doSomething()\n    break;\n  case 1:\n  ...\n}\n...\nprivate void doSomething(){\n    methodCall1(\"\");\n    methodCall2(\"\");\n    methodCall3(\"\");\n    methodCall4(\"\");\n}\n</pre>",
        "severity": "MAJOR",
        "status": "READY",
        "isTemplate": false,
        "tags": [],
        "sysTags": [
            "brain-overload"
        ],
        "lang": "java",
        "langName": "Java",
        "params": [
            {
                "key": "max",
                "htmlDesc": "Maximum number of lines",
                "defaultValue": "5",
                "type": "INTEGER"
            }
        ],
        "defaultDebtRemFnType": "CONSTANT_ISSUE",
        "defaultDebtRemFnOffset": "5min",
        "debtOverloaded": false,
        "debtRemFnType": "CONSTANT_ISSUE",
        "debtRemFnOffset": "5min",
        "defaultRemFnType": "CONSTANT_ISSUE",
        "defaultRemFnBaseEffort": "5min",
        "remFnType": "CONSTANT_ISSUE",
        "remFnBaseEffort": "5min",
        "remFnOverloaded": false,
        "type": "CODE_SMELL"
    },
    // {
    //     "key": "checkstyle:com.puppycrawl.tools.checkstyle.checks.indentation.CommentsIndentationCheck",
    //     "repo": "checkstyle",
    //     "name": "Comments Indentation",
    //     "createdAt": "2017-10-02T21:16:26+1000",
    //     "htmlDesc": "<div >\n<h2><a name=\"CommentsIndentation\"></a>CommentsIndentation</h2>\n      \n<div class=\"section\">\n<h3><a name=\"Description\"></a>Description</h3>\n        \n<p>\n          Controls the indentation between Comments and surrounding code.\n          Comments are indented at the same level as the surrounding code.\n          Detailed info about such convention can be found <a class=\"externalLink\" href=\"http://checkstyle.sourceforge.net/reports/google-java-style.html#s4.8.6.1-block-comment-style\">\n          here</a>\n        </p>\n        \n<p>Please take a look at the following examples to understand how the check works:</p>\n\n        \n<p>Example #1: Block Comments.</p>\n        \n<div class=\"source\">\n<pre>1   /*\n2    * it is Ok\n3    */\n4   boolean bool = true;\n5\n6     /* violation\n7      * (block comment should have the same indentation level as line 9)\n8      */\n9   double d = 3.14;\n        </pre></div>\n        \n<p>Example #2: Comment is placed at the end of the block and has previous statement.</p>\n        \n<div class=\"source\">\n<pre>1   public void foo1() {\n2       foo2();\n3       // it is OK\n4   }\n5\n6   public void foo2() {\n7       foo3();\n8          // violation (comment should have the same indentation level as line 7)\n9   }\n        </pre></div>\n        \n<p>Example #3: Comment is used as a single line border to separate groups of methods.</p>\n        \n<div class=\"source\">\n<pre>1   /////////////////////////////// it is OK\n2\n3   public void foo7() {\n4      int a = 0;\n5   }\n6\n7     /////////////////////////////// violation (should have the same indentation level as line 9)\n8\n9   public void foo8() {}\n        </pre></div>\n        \n<p>Example #4: Comment has destributed previous statement.</p>\n        \n<div class=\"source\">\n<pre>1   public void foo11() {\n2       CheckUtils\n3           .getFirstNode(new DetailAST())\n4           .getFirstChild()\n5           .getNextSibling();\n6       // it is OK\n7   }\n8\n9   public void foo12() {\n10       CheckUtils\n11          .getFirstNode(new DetailAST())\n12          .getFirstChild()\n13          .getNextSibling();\n14                // violation (should have the same indentation level as line 10)\n15  }\n        </pre></div>\n        \n<p>\n          Example #5: Single line block comment is placed within an empty code block.\n          Note, if comment is placed at the end of the empty code block, we have Checkstyle's\n          limitations to clearly detect user intention of explanation target - above or below. The\n          only case we can assume as a violation is when a single line comment within the empty\n          code block has indentation level that is lower than the indentation level of the closing\n          right curly brace.\n        </p>\n        \n<div class=\"source\">\n<pre>1   public void foo46() {\n2       // comment\n3       // block\n4       // it is OK (we cannot clearly detect user intention of explanation target)\n5   }\n6\n7   public void foo46() {\n8  // comment\n9  // block\n10 // violation (comment hould have the same indentation level as line 11)\n11  }\n        </pre></div>\n        \n<p>Example #6: 'fallthrough' Comments and similar.</p>\n        \n<div class=\"source\">\n<pre>0   switch(a) {\n1     case \"1\":\n2        int k = 7;\n3        // it is OK\n4     case \"2\":\n5        int k = 7;\n6     // it is OK\n7     case \"3\":\n8        if (true) {}\n9           // violation (should have the same indentation level as line 8 or 10)\n10    case \"4\":\n11    case \"5\": {\n12        int a;\n13    }\n14    // fall through (it is OK)\n15    case \"12\": {\n16        int a;\n17    }\n18    default:\n19        // it is OK\n20  }\n        </pre></div>\n        \n<p>Example #7: Comment is placed within a destributed statement.</p>\n        \n<div class=\"source\">\n<pre>1   String breaks = \"J\"\n2   // violation (comment should have the same indentation level as line 3)\n3       + \"A\"\n4       // it is OK\n5       + \"V\"\n6       + \"A\"\n7   // it is OK\n8   ;\n        </pre></div>\n        \n<p>\n          Examnple #8: Comment is placed within an empty case block.\n          Note, if comment is placed at the end of the empty case block, we have Checkstyle's\n          limitations to clearly detect user intention of explanation target - above or below. The\n          only case we can assume as a violation is when a single line comment within the empty case\n          block has indentation level that is lower than the indentation level of the next case\n          token.\n        </p>\n        \n<div class=\"source\">\n<pre>1   case 4:\n2     // it is OK\n3   case 5:\n4  // violation (should have the same indentation level as line 3 or 5)\n5   case 6:\n        </pre></div>\n        \n<p>Example #9: Single line block comment has previous and next statement.</p>\n        \n<div class=\"source\">\n<pre>1   String s1 = \"Clean code!\";\n2      s.toString().toString().toString();\n3   // single line\n4   // block\n5   // comment (it is OK)\n6   int a = 5;\n7\n8   String s2 = \"Code complete!\";\n9    s.toString().toString().toString();\n10            // violation (should have the same indentation level as line 11)\n11       // violation (should have the same indentation level as line 12)\n12     // violation (should have the same indentation level as line 13)\n13  int b = 18;\n        </pre></div>\n        \n<p>Example #10: Comment within the block tries to describe the next code block.</p>\n        \n<div class=\"source\">\n<pre>1   public void foo42() {\n2      int a = 5;\n3      if (a == 5) {\n4         int b;\n5         // it is OK\n6      } else if (a ==6) { ... }\n7   }\n8\n9   public void foo43() {\n10     try {\n11        int a;\n12     // Why do we catch exception here? - violation (should have the same indenatation as line 11)\n13     } catch (Exception e) { ... }\n14  }\n        </pre></div>\n      </div>\n      \n<div >\n<h3><a name=\"Properties\"></a>Properties</h3>\n        \n<table class=\"bodyTable\" border=\"0\">\n          \n<tbody><tr class=\"a\">\n            \n<th>name</th>\n            \n<th>description</th>\n            \n<th>type</th>\n            \n<th>default value</th>\n          </tr>\n            \n<tr class=\"b\">\n            \n<td>tokens</td>\n            \n<td>tokens to check</td>\n            \n<td>\n              subset of tokens\n              <a href=\"http://checkstyle.sourceforge.net/apidocs/com/puppycrawl/tools/checkstyle/api/TokenTypes.html#SINGLE_LINE_COMMENT\">SINGLE_LINE_COMMENT</a>,\n              <a href=\"http://checkstyle.sourceforge.net/apidocs/com/puppycrawl/tools/checkstyle/api/TokenTypes.html#BLOCK_COMMENT_BEGIN\">BLOCK_COMMENT_BEGIN</a>.\n            </td>\n            \n<td>\n              <a href=\"http://checkstyle.sourceforge.net/pidocs/com/puppycrawl/tools/checkstyle/api/TokenTypes.html#SINGLE_LINE_COMMENT\">SINGLE_LINE_COMMENT</a>,\n              <a href=\"http://checkstyle.sourceforge.net/apidocs/com/puppycrawl/tools/checkstyle/api/TokenTypes.html#BLOCK_COMMENT_BEGIN\">BLOCK_COMMENT_BEGIN</a>.\n            </td>\n          </tr>\n        </tbody></table>\n      </div>",
    //     "mdDesc": "<div >\n<h2><a name=\"CommentsIndentation\"></a>CommentsIndentation</h2>\n      \n<div class=\"section\">\n<h3><a name=\"Description\"></a>Description</h3>\n        \n<p>\n          Controls the indentation between Comments and surrounding code.\n          Comments are indented at the same level as the surrounding code.\n          Detailed info about such convention can be found <a class=\"externalLink\" href=\"http://checkstyle.sourceforge.net/reports/google-java-style.html#s4.8.6.1-block-comment-style\">\n          here</a>\n        </p>\n        \n<p>Please take a look at the following examples to understand how the check works:</p>\n\n        \n<p>Example #1: Block Comments.</p>\n        \n<div class=\"source\">\n<pre>1   /*\n2    * it is Ok\n3    */\n4   boolean bool = true;\n5\n6     /* violation\n7      * (block comment should have the same indentation level as line 9)\n8      */\n9   double d = 3.14;\n        </pre></div>\n        \n<p>Example #2: Comment is placed at the end of the block and has previous statement.</p>\n        \n<div class=\"source\">\n<pre>1   public void foo1() {\n2       foo2();\n3       // it is OK\n4   }\n5\n6   public void foo2() {\n7       foo3();\n8          // violation (comment should have the same indentation level as line 7)\n9   }\n        </pre></div>\n        \n<p>Example #3: Comment is used as a single line border to separate groups of methods.</p>\n        \n<div class=\"source\">\n<pre>1   /////////////////////////////// it is OK\n2\n3   public void foo7() {\n4      int a = 0;\n5   }\n6\n7     /////////////////////////////// violation (should have the same indentation level as line 9)\n8\n9   public void foo8() {}\n        </pre></div>\n        \n<p>Example #4: Comment has destributed previous statement.</p>\n        \n<div class=\"source\">\n<pre>1   public void foo11() {\n2       CheckUtils\n3           .getFirstNode(new DetailAST())\n4           .getFirstChild()\n5           .getNextSibling();\n6       // it is OK\n7   }\n8\n9   public void foo12() {\n10       CheckUtils\n11          .getFirstNode(new DetailAST())\n12          .getFirstChild()\n13          .getNextSibling();\n14                // violation (should have the same indentation level as line 10)\n15  }\n        </pre></div>\n        \n<p>\n          Example #5: Single line block comment is placed within an empty code block.\n          Note, if comment is placed at the end of the empty code block, we have Checkstyle's\n          limitations to clearly detect user intention of explanation target - above or below. The\n          only case we can assume as a violation is when a single line comment within the empty\n          code block has indentation level that is lower than the indentation level of the closing\n          right curly brace.\n        </p>\n        \n<div class=\"source\">\n<pre>1   public void foo46() {\n2       // comment\n3       // block\n4       // it is OK (we cannot clearly detect user intention of explanation target)\n5   }\n6\n7   public void foo46() {\n8  // comment\n9  // block\n10 // violation (comment hould have the same indentation level as line 11)\n11  }\n        </pre></div>\n        \n<p>Example #6: 'fallthrough' Comments and similar.</p>\n        \n<div class=\"source\">\n<pre>0   switch(a) {\n1     case \"1\":\n2        int k = 7;\n3        // it is OK\n4     case \"2\":\n5        int k = 7;\n6     // it is OK\n7     case \"3\":\n8        if (true) {}\n9           // violation (should have the same indentation level as line 8 or 10)\n10    case \"4\":\n11    case \"5\": {\n12        int a;\n13    }\n14    // fall through (it is OK)\n15    case \"12\": {\n16        int a;\n17    }\n18    default:\n19        // it is OK\n20  }\n        </pre></div>\n        \n<p>Example #7: Comment is placed within a destributed statement.</p>\n        \n<div class=\"source\">\n<pre>1   String breaks = \"J\"\n2   // violation (comment should have the same indentation level as line 3)\n3       + \"A\"\n4       // it is OK\n5       + \"V\"\n6       + \"A\"\n7   // it is OK\n8   ;\n        </pre></div>\n        \n<p>\n          Examnple #8: Comment is placed within an empty case block.\n          Note, if comment is placed at the end of the empty case block, we have Checkstyle's\n          limitations to clearly detect user intention of explanation target - above or below. The\n          only case we can assume as a violation is when a single line comment within the empty case\n          block has indentation level that is lower than the indentation level of the next case\n          token.\n        </p>\n        \n<div class=\"source\">\n<pre>1   case 4:\n2     // it is OK\n3   case 5:\n4  // violation (should have the same indentation level as line 3 or 5)\n5   case 6:\n        </pre></div>\n        \n<p>Example #9: Single line block comment has previous and next statement.</p>\n        \n<div class=\"source\">\n<pre>1   String s1 = \"Clean code!\";\n2      s.toString().toString().toString();\n3   // single line\n4   // block\n5   // comment (it is OK)\n6   int a = 5;\n7\n8   String s2 = \"Code complete!\";\n9    s.toString().toString().toString();\n10            // violation (should have the same indentation level as line 11)\n11       // violation (should have the same indentation level as line 12)\n12     // violation (should have the same indentation level as line 13)\n13  int b = 18;\n        </pre></div>\n        \n<p>Example #10: Comment within the block tries to describe the next code block.</p>\n        \n<div class=\"source\">\n<pre>1   public void foo42() {\n2      int a = 5;\n3      if (a == 5) {\n4         int b;\n5         // it is OK\n6      } else if (a ==6) { ... }\n7   }\n8\n9   public void foo43() {\n10     try {\n11        int a;\n12     // Why do we catch exception here? - violation (should have the same indenatation as line 11)\n13     } catch (Exception e) { ... }\n14  }\n        </pre></div>\n      </div>\n      \n<div >\n<h3><a name=\"Properties\"></a>Properties</h3>\n        \n<table class=\"bodyTable\" border=\"0\">\n          \n<tbody><tr class=\"a\">\n            \n<th>name</th>\n            \n<th>description</th>\n            \n<th>type</th>\n            \n<th>default value</th>\n          </tr>\n            \n<tr class=\"b\">\n            \n<td>tokens</td>\n            \n<td>tokens to check</td>\n            \n<td>\n              subset of tokens\n              <a href=\"http://checkstyle.sourceforge.net/apidocs/com/puppycrawl/tools/checkstyle/api/TokenTypes.html#SINGLE_LINE_COMMENT\">SINGLE_LINE_COMMENT</a>,\n              <a href=\"http://checkstyle.sourceforge.net/apidocs/com/puppycrawl/tools/checkstyle/api/TokenTypes.html#BLOCK_COMMENT_BEGIN\">BLOCK_COMMENT_BEGIN</a>.\n            </td>\n            \n<td>\n              <a href=\"http://checkstyle.sourceforge.net/pidocs/com/puppycrawl/tools/checkstyle/api/TokenTypes.html#SINGLE_LINE_COMMENT\">SINGLE_LINE_COMMENT</a>,\n              <a href=\"http://checkstyle.sourceforge.net/apidocs/com/puppycrawl/tools/checkstyle/api/TokenTypes.html#BLOCK_COMMENT_BEGIN\">BLOCK_COMMENT_BEGIN</a>.\n            </td>\n          </tr>\n        </tbody></table>\n      </div>",
    //     "severity": "MINOR",
    //     "status": "READY",
    //     "internalKey": "Checker/TreeWalker/CommentsIndentation",
    //     "isTemplate": false,
    //     "tags": [],
    //     "sysTags": [],
    //     "lang": "java",
    //     "langName": "Java",
    //     "params": [
    //         {
    //             "key": "tokens",
    //             "htmlDesc": "tokens to check",
    //             "defaultValue": "SINGLE_LINE_COMMENT,BLOCK_COMMENT_BEGIN",
    //             "type": "SINGLE_SELECT_LIST,multiple=true,values=\"SINGLE_LINE_COMMENT,BLOCK_COMMENT_BEGIN,\""
    //         }
    //     ],
    //     "defaultDebtRemFnType": "LINEAR",
    //     "defaultDebtRemFnCoeff": "5min",
    //     "debtOverloaded": false,
    //     "debtRemFnType": "LINEAR",
    //     "debtRemFnCoeff": "5min",
    //     "defaultRemFnType": "LINEAR",
    //     "defaultRemFnGapMultiplier": "5min",
    //     "remFnType": "LINEAR",
    //     "remFnGapMultiplier": "5min",
    //     "remFnOverloaded": false,
    //     "type": "CODE_SMELL"
    // },
    // {
    //     "key": "checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.EqualsHashCodeCheck",
    //     "repo": "checkstyle",
    //     "name": "Equals Hash Code",
    //     "createdAt": "2017-10-02T21:16:26+1000",
    //     "htmlDesc": "Checks that classes that override equals() also override hashCode().",
    //     "mdDesc": "Checks that classes that override equals() also override hashCode().\n\n<p>\n</p>",
    //     "severity": "CRITICAL",
    //     "status": "READY",
    //     "internalKey": "Checker/TreeWalker/EqualsHashCode",
    //     "isTemplate": false,
    //     "tags": [],
    //     "sysTags": [],
    //     "lang": "java",
    //     "langName": "Java",
    //     "params": [],
    //     "defaultDebtRemFnType": "CONSTANT_ISSUE",
    //     "defaultDebtRemFnOffset": "30min",
    //     "debtOverloaded": false,
    //     "debtRemFnType": "CONSTANT_ISSUE",
    //     "debtRemFnOffset": "30min",
    //     "defaultRemFnType": "CONSTANT_ISSUE",
    //     "defaultRemFnBaseEffort": "30min",
    //     "remFnType": "CONSTANT_ISSUE",
    //     "remFnBaseEffort": "30min",
    //     "remFnOverloaded": false,
    //     "type": "BUG"
    // },
    // {
    //     "key": "checkstyle:com.puppycrawl.tools.checkstyle.checks.coding.StringLiteralEqualityCheck",
    //     "repo": "checkstyle",
    //     "name": "String Literal Equality",
    //     "createdAt": "2017-10-02T21:16:26+1000",
    //     "htmlDesc": "Checks that string literals are not used with == or !=.",
    //     "mdDesc": "Checks that string literals are not used with == or !=.\n\n<p>\n</p>",
    //     "severity": "CRITICAL",
    //     "status": "READY",
    //     "internalKey": "Checker/TreeWalker/StringLiteralEquality",
    //     "isTemplate": false,
    //     "tags": [],
    //     "sysTags": [],
    //     "lang": "java",
    //     "langName": "Java",
    //     "params": [],
    //     "defaultDebtRemFnType": "CONSTANT_ISSUE",
    //     "defaultDebtRemFnOffset": "5min",
    //     "debtOverloaded": false,
    //     "debtRemFnType": "CONSTANT_ISSUE",
    //     "debtRemFnOffset": "5min",
    //     "defaultRemFnType": "CONSTANT_ISSUE",
    //     "defaultRemFnBaseEffort": "5min",
    //     "remFnType": "CONSTANT_ISSUE",
    //     "remFnBaseEffort": "5min",
    //     "remFnOverloaded": false,
    //     "type": "CODE_SMELL"
    // },
    // {
    //     "key": "checkstyle:com.puppycrawl.tools.checkstyle.checks.sizes.LineLengthCheck",
    //     "repo": "checkstyle",
    //     "name": "Line Length",
    //     "createdAt": "2017-10-02T21:16:26+1000",
    //     "htmlDesc": "Checks for long lines.",
    //     "mdDesc": "<p>\nChecks for long lines.\n</p>",
    //     "severity": "MAJOR",
    //     "status": "READY",
    //     "internalKey": "Checker/TreeWalker/LineLength",
    //     "isTemplate": false,
    //     "tags": [],
    //     "sysTags": [
    //         "size"
    //     ],
    //     "lang": "java",
    //     "langName": "Java",
    //     "params": [
    //         {
    //             "key": "max",
    //             "htmlDesc": "maximum allowable line length. Default is 80.",
    //             "defaultValue": "80",
    //             "type": "INTEGER"
    //         },
    //         {
    //             "key": "tabWidth",
    //             "htmlDesc": "number of expanded spaces for a tab character (''\t'')",
    //             "defaultValue": "8",
    //             "type": "INTEGER"
    //         },
    //         {
    //             "key": "ignorePattern",
    //             "htmlDesc": "pattern for lines to ignore",
    //             "type": "STRING"
    //         }
    //     ],
    //     "defaultDebtRemFnType": "LINEAR",
    //     "defaultDebtRemFnCoeff": "5min",
    //     "debtOverloaded": false,
    //     "debtRemFnType": "LINEAR",
    //     "debtRemFnCoeff": "5min",
    //     "defaultRemFnType": "LINEAR",
    //     "defaultRemFnGapMultiplier": "5min",
    //     "remFnType": "LINEAR",
    //     "remFnGapMultiplier": "5min",
    //     "remFnOverloaded": false,
    //     "type": "CODE_SMELL"
    // }
]