const PythonShell = require("python-shell");

var options = {
    pythonPath: 'C:/Python27/python.exe',
    scriptPath: __dirname + '/../python',
};

module.exports.runScript = function runScript(source, script, query){
    options.args = [query];

    return new Promise(function(resolve, reject) {
        PythonShell.PythonShell.run(script, options, function (err, results) {
            if (err)
                reject(err);
            resolve({source:source, results:results});
        });
    });
};