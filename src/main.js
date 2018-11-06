if (typeof require !== 'undefined') {
  var Prism = require('./prism.js')
}


//alertのない環境(node.js)に対応するために実装
if (typeof alert === 'undefined') {
  alert = function (message) {
    console.log(message);
  };
}

var main = function (code, outstream) {
  // The code snippet you want to highlight, as a string
  // var code = "var data = 1;";

  // Returns a highlighted HTML string
  var html = Prism.highlight(code, Prism.languages.javascript, 'javascript');

  if (typeof outstream === 'undefined'){
    var outstream = {};
    if( typeof outstream.WriteText === 'undefined') {
      outstream.WriteText = function (stringData, num) {
        console.log(stringData);
      };
    }
  }
  
  outstream.WriteText(html, 0);
  return;
};

if (typeof module !== 'undefined') {
  module.exports = main;
}