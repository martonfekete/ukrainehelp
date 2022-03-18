const ftp = require("ftp");
console.log(process.env);
console.log(process.argv);

const ftpClient = new ftp();

ftpClient.on("ready", function () {
  ftpClient.list((err, list) => {
    if (err) {
      console.log("Error retrieving directory");
      throw err;
    }

    const dirs = list
      .filter((item) => item.type === "d")
      .map((item) => item.name);

    console.log(dirs);

    ftpClient.end();
  });
});

ftpClient.connect({
  host: process.argv[2],
  user: process.argv[3],
  password: process.argv[4],
});
