const httpStatus = require('http-status');
const catchAsync = require('../utils/cathAsync');
const { authService, userService, tokenService } = require('../services/index');
const { Stock } = require('../models/index');
const { response } = require("../config/response")
const csvParser = require('csv-parser');
const exceljs = require('exceljs');
const fs = require("fs")
const path = require("path")
const absolutePath = path.join(__dirname, '..')

const fileUploader = catchAsync(async (req, res) => {
    const results = [];
    fs.createReadStream(`${absolutePath}/uploads/${req.file.originalname}`)
      .pipe(csvParser())
      .on('data', (row) => {
        results.push(row);
      })
      .on('end', async () => {
        console.log("results---->>>", results)
        try {
          await Stock.bulkCreate(results);
          response(res, '', "File upload successfully", 200)
        } catch (error) {
          console.error('Database insertion error: ', error);
          response(res, '', "Internal Server Error", 500)
        }
      });
});

const generateFile = catchAsync(async (req, res) => {
    try{
        const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Stock Data');
    const rows = await Stock.findAll();
  
    worksheet.columns = [
      { header: 'SKU', key: 'sku', width: 15 },
      { header: 'Stock IDs', key: 'stock_ids', width: 30 },
    ];
  
    worksheet.addRows(rows.map((row) => row.toJSON()));
  
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=StockData.xlsx'
    );
  
    await workbook.xlsx.write(res);
    res.end();
    }catch(err){
        console.log("err---->>>",)
    }
});



module.exports = {
 fileUploader, generateFile
};
