export default [
    {
        "name": "WMC - Weighted Methods per Class",
        "htmlDesc": "<p>\nThe sum of the complexities of a class methods. Gets assigned a value of 1 that makes it equal the number of methods in a class. High number of methods prevents further class reuse and maintenace as it makes it more application specific\n</p>\n\n<p>\n</p>",
        
    },{
        "name": "DIT - Depth of Inheritance Tree",
        "htmlDesc": "<p>\nMeasure of the inheritance levels from the object hierarchy top. Count of classes that a class inherits from\n</p>\n\n<p>\n</p>",
        
    },{
        "name": "NOC - Number of Children",
        "htmlDesc": "<p>\nMeasures the number of inmediate descendants. Greater number of children could provide a greate chance of reusability\n</p>\n\n<p>\n</p>",
        
    },{
        "name": "CBO - Coupling Between Object Classes",
        "htmlDesc": "<p>\nRepresents the number of classes coupled to a given class. This coupling can occur through method calls, field accesses, inheritance, arguments, return types, and exceptions. Refers to where the methods of one class call or access the methods or variables of another one\n</p>\n\n<p>\n</p>",
        
    },{
        "name": "RFC - Response for a Class",
        "htmlDesc": "<p>\nMeasures the number of different methods that can be executed when an object of that class receives a message. The larger the number of methods invoked the higher level of understanding required for maintenance\n</p>\n\n<p>\n</p>",
        
    },{
        "name": "LCOM - Lack of Cohesion in Methods",
        "htmlDesc": "<p>\nCounts the sets of methods in a class that are not related through the sharing of some of the class's fields.\n</p>\n\n<p>\n</p>",
        
    },{
        "name": "Ca - Afferent Couplings",
        "htmlDesc": "<p>\nMeasure of how many other classes use the specific class.\n</p>\n\n<p>\n</p>",
        
    },{
        "name": "NPM - Number of Public Methods",
        "htmlDesc": "<p>\nCounts all the methods in a class that are declared as public.\n</p>\n\n<p>\n</p>",
        
    }
]