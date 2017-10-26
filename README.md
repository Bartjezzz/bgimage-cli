# BG Image (Command-line)

Command line tool for rendering images

## Getting Started

Install the command line tool

```
npm install bgimage-cli -g
```

### Usage

Create task json

```
{
  "Jobs": [
        {
          "platform": "android",
          "input": "master_icon.png",
          "output": "icon.png",
          "outputDir":"android.gradle/game/src/main/res/drawable-xxxhdpi",
          "height": 192,
          "width": 192,
          "rounded":48
        }
    ]
}
```
and run

```
bgimage-cli i <file.json>
```

## Issues with installing on Windows?
Are you missing Python dependencies or can't compile c++?

f you haven't got python installed along with all the node-gyp dependecies, simply execute:

```
npm install --global --production windows-build-tools
```
and then to install the package

```
npm install --global node-gyp
```
once installed, you will all the node-gyp dependencies downloaded, but you still need the environment variable. Validate Python is indeed found in the correct folder:

```
C:\Users\ben\.windows-build-tools\python27\python.exe
```
Note - it uses python 2.7 not 3.x as it is not supported

If it doesn't moan, go ahead and create your (user) environment variable:

```
setx PYTHON "%USERPROFILE%\.windows-build-tools\python27\python.exe"
```
restart cmd, and verify the variable exists via set PYTHON which should return the variable

```
Lastly re-apply npm install <module>
```


## Built With

* [Sharp](https://github.com/lovell/sharp/) - High Performance image processing for Node.JS
* [Commander](https://github.com/tj/commander.js/) - Commander

## Authors

* **Bart van den Berg**  - [Blue Giraffe Games](https://www.bluegiraffegames.com)

## License

This project is licensed under the MIT License
