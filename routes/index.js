var express = require('express');
var router = express.Router();
const path = require("path");
const fs = require("fs");

/*-- GET Navbar */
router.get('/nav', function(req, res, next) {
  res.render('nav');
});

/* GET home page. */
router.get("/", function(req, res, next) {
  const files = fs.readdirSync(
      path.join(__dirname, "..", "public", "FileSystem")
  );
  res.render("index", { files, filedata: null, filename: null});
});

router.post("/create", function (req, res, next) {
    const filename = req.body.filename;
    fs.writeFileSync(
        path.join(__dirname, "..", "public", "FileSystem", filename),
        "//Start writing here..."
    );
    res.redirect("/file/" + filename);
});

router.get("/delete/:filename", function (req, res, next) {
  const filename = req.params.filename;
  fs.unlinkSync(path.join(__dirname, "..", "public", "FileSystem", filename));          
  res.redirect("/");
});

router.get("/file/:filename", function (req, res, next) {
    const files = fs.readdirSync(
        path.join(__dirname, "..", "public", "FileSystem")
    );
    const filename = req.params.filename;
    const filedata = fs.readFileSync(
        path.join(__dirname, "..", "public", "FileSystem", filename),
        "utf-8"
    );
  res.render("index", { filedata, files, filename });
});

router.post("/update/:filename", function (req, res, next) {
  const filename = req.params.filename;
  fs.writeFileSync(
      path.join(__dirname, "..", "public", "FileSystem", filename),
      req.body.filedata
  );
  res.redirect("/file/" + filename);
});

module.exports = router;



module.exports = router;
