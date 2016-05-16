var route = process.argv[2]||'.',
	 base = 'volumenes/',
	 walk = require('walk'),
	  obj = {},
	   t1 = new Date();
	   fs = require('fs');

// Walker options
var walker  = walk.walk(route, { 
	followLinks: false, 
	filters: [
		"node_modules",
		"WoW 4.3.2 Pandashan",
		"Spotlight-V100"
	]
});

walker.on("names", function (root, nodeNamesArray) {
	nodeNamesArray.sort(function (a, b) {
		if (a > b) return -1;
		if (a < b) return 1;
		return 0;
	});
});

walker.on('file', function(root, stat, next) {
    var entry = obj[stat.size]||[];
    var element = {};
    element[stat.name] = root;
    entry.push(element);
    obj[stat.size] = entry;
    next();
});

walker.on('end', function() {
    //console.log(obj);
    var filename = 'ficheros.json';
    var file = route.split('/');
    var a, t2 = new Date(), t = t2.getTime()-t1.getTime(), f = Math.floor;
    for( var a in obj ) {
    	//console.log( a );
    	if( obj[a].length>1 ) console.log(a + ' : ' + JSON.stringify(obj[a],null,2));
    }
    console.log("T: "+(t)/1000);
    console.log("T: "+(a=f(t/60000))+'m'+(f(t/1000)-60*a));
    if( file.length>0 ) fs.writeFile(base+file[file.length-1]+'.json', JSON.stringify(obj,null,2));
    fs.writeFile(route+'/'+filename, JSON.stringify(obj,null,2));
});