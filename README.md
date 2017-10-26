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



## Built With

* [Sharp](https://github.com/lovell/sharp/) - High Performance image processing for Node.JS
* [Commander](https://github.com/tj/commander.js/) - Commander

## Authors

* **Bart van den Berg**  - [Blue Giraffe Games](https://www.bluegiraffegames.com)

## License

This project is licensed under the MIT License
