const fs = require('fs')
const request = require('request')
// console.log(process.argv)

if (process.argv.length === 4) {
  const Resource = process.argv[2];
  const FilePath = process.argv[3];
  
  request(Resource, (error, status, body) => {
    if (!error) {
      if (body && status.statusCode === 200) {
        fs.writeFile(FilePath, body, (error) => {
          if (!error) {
            fs.stat(FilePath, (error, stats) => {
              if (!error) {
                console.log(`downloaded & saved ${stats.size} bytes to ${FilePath} successfully.`);
              } else {
                console.log('Could not obtain the file size.');
              }
            });
          } else {
            console.log("Could not save to the the specified path.", error);
          }
        });
      } else {
        console.log("Body of the requested URL is empty or the statusCode recived was not 200");
        console.log(`Status Code: ${status.statusCode} \r\n Staus: \r\n ${status} \r\n Body: \r\n ${body}`);
      }
    } else {
      console.log("Could not fetch the specified webpage.", error);
    }
  });
} else {
  console.log("Expected");
  console.log("node fetcher '[URL]' '[LOCAL FILE PATH]' \r\n\r\n\r\n");

  console.log("Help: Try the following command");
  console.log("node fetcher http://example.com/ ./index.html");
}