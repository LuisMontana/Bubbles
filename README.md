## Miigo Apps

### WireFrame

The base wireframe for the apps can be found [here](https://www.justinmind.com/usernote/tests/20063560/20064115/20064124/index.html#/screens/f7d9f9cf-34e2-479c-bbae-75f2909dc032)

### Wishing Well dream tracker

Savings goals planer and tracker, get points for saving money.

### Credit Card Simulator CardSim

Simulate different types of credit cards, periods of payment and points (milles) acomulated in your mobile phone.

### Dependencies

Before building from source you need to make sure to meet the requirements in your enviroment:

* NodeJS - v4.x recommended, needed for both cordova and the Ionic CLI, building and scaffolding. To install nodejs visit https://nodejs.org

* Cordova - Used for building multiplatform apps with a shared web codebase. Install in console with the command `npm install -g cordova`

* Ionic Framework - Recommended for CLI tools and preview, but the libraries are already included in the source. To install, in the console use the command `npm install -g ionic`

* Android SDK - Needed if you want to build for Android with cordova, visit the Android developer website for [more info](http://developer.android.com/sdk/index.html#downloads).

* Other SDK - To build for other platforms, like iOS, see the information in the [cordova documentation](https://cordova.apache.org/docs/en/latest/reference/cordova-cli/index.html#cordova-platform-command).

## Prepare the platforms

To restore the cordova project plugins and platforms information run: `cordova prepare`

To see the requirements to build for a especific platform use `cordova requirements`

To see the current platforms targeted in the project use `cordova platforms -l`

## Building commands

To build for Andriod use `cordova build android`

To build for all added platforms `cordova build`

To test the app in the browser use `cordova run browser` (previewsly added with `cordova platforms add browser`)
