const http = require('http');
const url = require('url');
const words = require('./words.js');

const PORT = 8181

const srv = http.createServer(function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.write("[")
  let isFirst = true
  const types = {}
  let len = query['l'] || query['len'] || 10
  types.t = query['t'] || query['txt'] || 0
  types.s = query['s'] || query['str'] || 0
  types.i = query['i'] || query['int'] || 0
  types.f = query['f'] || query['float'] || 0
  types.u = query['u'] || query['img'] || 0
  const handlers = {}
  handlers.s = function() {
    return words[Math.floor(Math.random() * words.length)]
  }
  handlers.t = function() {
    let usedwords = []
    for (let i = 0; i < 10; i++) {
      usedwords.push(words[Math.floor(Math.random() * words.length)])
    }
    return usedwords.join(" ")
  }
  handlers.i = function() {
    return Math.floor(Math.random() * 100)
  }
  handlers.f = function() {
    return Math.random() * 100
  }
  handlers.u = function() {
    return "https://via.placeholder.com/100?text=" + words[Math.floor(Math.random() * words.length)]
  }
  for (let i = 0; i < len; i++) {
    let nxt = {}
    Object.keys(types).forEach(function(key) {
      for (let j = 0; j < types[key]; j++) {
        nxt[key + j] = handlers[key]()
      }
    });
    if (isFirst) {
      isFirst = false
    } else {
      res.write(",")
    }
    res.write(JSON.stringify(nxt))
  }
  res.write("]")
  res.end()
});

srv.listen(PORT, function() {
  console.log("listening on " + PORT)
})
