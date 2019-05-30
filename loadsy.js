var http = require('http');
var url = require('url');
const PORT = 8181
var srv = http.createServer(function(req, res){
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  res.setHeader('Content-Type', 'application/json');
  res.write("[")
  res.write(JSON.stringify(query))
  let len = query['l'] || query['len'] || 10
  for (let i=0;i<len-1;i++){
    res.write(",")
    res.write(JSON.stringify(query))
  }
  res.write("]")
  res.end()
});

srv.listen(PORT, function(){
  console.log("listening on " + PORT)
})
