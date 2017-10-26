#!/usr/bin/env node

'use strict';

const program = require('commander');
const sharp = require('sharp');
var fs = require('fs');
const path = require('path');

console.log("Blue Giraffe Image Processor CLI Version 0.0.2 installed")
program
    .version('0.0.2')
    .usage('i <json task file...>')
    .arguments('i <json task file...>')
    .command('inputFile <inputfile.json>')
    .alias('i')
    .description('Input JSON file which contains task(s)')
    .action((inputFile)=> {
    jsonProcess(inputFile);
});

const mkdirSync = function (dirPath)
{
    try
    {
        fs.mkdirSync(dirPath)
    }
    catch (err)
    {
        if (err.code !== 'EEXIST') throw err
    }
}

const mkdirpSync = function (dirPath)
{
    const parts = dirPath.split(path.sep)

    for (let i = 1; i <= parts.length; i++)
    {
        mkdirSync(path.join.apply(null, parts.slice(0, i)))
    }
}

function jsonProcess(inputfile)
{
    var inputJson = JSON.parse(fs.readFileSync(inputfile, 'utf8'));

    for(var job in inputJson.Jobs)
    {
        if(inputJson.Jobs[job].outputDir)
        {
            mkdirpSync(inputJson.Jobs[job].outputDir);
            imageProcess(inputJson.Jobs[job], function result(result,err)
            {
                if (!err)
                {
                    console.log(result);
                }
                else
                {
                    console.log(err);
                }
            });
        }
    }
}

function imageProcess(task, callback)
{
    var inputFile = task.input;
    var outputFile = task.output;
    var rounded = task.rounded;
    var height = task.height;
    var width = task.width;
    var outputDir = task.outputDir;

    if(outputDir)
    {
        outputFile = outputDir + "/" + outputFile;
    }

    // Square
    if (rounded && rounded>0)
    {
        const roundedCorners = new Buffer('<svg><rect x="0" y="0" width="' + width + '" height="' + height + '" rx="' + rounded + '" ry="' + rounded + '"/></svg>');

        sharp(inputFile)
            .resize(height,width,{
            kernel: sharp.kernel.lanczos3,
                interpolator: sharp.interpolator.nohalo
        })
            .overlayWith(roundedCorners, { cutout: true })
            .png()
            .toFile(outputFile, (err, info) => {
                if (!err) {
                    callback("Written " + outputFile + " with size: " + info.size,null)
                }
                else {
                    callback(null,"Error: " + err)
                }
            });
    }
    else
    {
        sharp(inputFile)
            .resize(height,width,{
                kernel: sharp.kernel.lanczos2,
                interpolator: sharp.interpolator.nohalo
            })
            .png()
            .toFile(outputFile, (err, info) => {
                if (!err) {
                    callback("Written " + outputFile + " with size: " + info.size,null)
                }
                else {
                    callback(null,"Error: " + err)
                }
            });
    }
}


program.parse(process.argv);