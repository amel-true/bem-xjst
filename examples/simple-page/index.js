var bemxjst = require('bem-xjst');
var bemhtml = bemxjst.bemhtml;
var prepareData = require('./prepare-data-to-view');
var templates = require('./templates');
var data = require('./data');
var bemjson = prepareData(data);

var bemhtmlRuntime = bemhtml.compile(templates, { xhtml: false });
var html = bemhtmlRuntime.apply(bemjson);

console.log(html);
