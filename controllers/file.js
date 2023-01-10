const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

//upload file
exports.uplaodSingleFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(422).json({ message: "Please upload the file" });
    }
    const url = await `${req.headers.host}/${req.file.filename}`;
    const fileName = await req.file.originalname;
    res
      .status(200)
      .json({ message: "File uplaoded", name: fileName, url: url });
  } catch (error) {
    return res.status(422).json({ message: "Unable to upload" });
  }
};

exports.uplaodFiles = async (req, res, next) => {
  try {
    if (!req.files) {
      return res.status(422).json({ message: "Please upload the file" });
    }
    const host = await req.headers.host;
    const files = await req.files.map((result) => {
      return { name: result.originalname, url: `${host}/${result.filename}` };
    });
    res.status(200).json({ message: "File uplaoded", files });
  } catch (error) {
    return res.status(422).json({ message: "Unable to upload" });
  }
};

//download file
exports.downloadFile = (req, res, next) => {
  try {
    const date = Date.now();

    const fileName = "file-" + date + ".pdf";
    const filePath = path.join("assets", fileName);
    const pdfDoc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="' + fileName + '"');
    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.pipe(res);

    pdfDoc.fontSize(26).text("Invoice", {
      underline: true,
    });
    pdfDoc.text("-----------------------");

    pdfDoc.text("---");

    pdfDoc.end();
  } catch (error) {
    return res.status(422).json({ message: "Unable to download" });
  }
};
