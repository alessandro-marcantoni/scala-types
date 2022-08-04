[![codecov](https://img.shields.io/codecov/c/gh/alessandro-marcantoni/scala-types?style=for-the-badge&token=XYLPRNEPSK)](https://codecov.io/gh/alessandro-marcantoni/scala-types)
[![GitHub](https://img.shields.io/github/license/alessandro-marcantoni/scala-types?style=for-the-badge)](/LICENSE)
[![GitHub release (latest SemVer including pre-releases)](https://img.shields.io/github/v/release/alessandro-marcantoni/scala-types?include_prereleases&style=for-the-badge)](https://github.com/alessandro-marcantoni/scala-types/releases)

# Scala Types

__Scala__ is a strong statically typed general-purpose programming language which supports both object-oriented programming and functional programming.  
Its standard library provides many types and data structures that make developers' life much easier and help write more functional, elegant and concise code.

Unfortunately, when it comes to web development (specially frontend development) there are no such convenient features.
So, this is an attempt to provide _Scala_'s most used and useful types and data structures for _Typescript_.

You can access the `npm` page of the library [here](https://www.npmjs.com/package/scala-types).

## Usage

To install the `npm` library in your _typescript_ project just use the following command:

```
npm i scala-types
```

The recommended configuration for your `tsconfig.json` is:

```json
{
    "compilerOptions": {
        "esModuleInterop": true,
        "module": "ES6",
        "target": "ES6",
        "moduleResolution": "node"
    }
}
```

Finally, you can just import and use the types you need in your project.

## Authors

* [Alessandro Marcantoni](http://github.com/alessandro-marcantoni) - alessandro.marcantoni.98@gmail.com

## License

The library is released and distributed under the [MIT License](LICENSE).

## Contributions

To suggest the introduction of other _Scala_ types or new features for the ones that are already implemented, please open an issue.

If you feel like contributing yourself to the library, please make sure you follow these steps:

* fork the repository;
* implement the feature you like;
* write documentation for the feature;
* test the features;
* make a pull request so that the feature can be merged into the main repository.

Please, note that for pull requests to be merged the coverage must not be lower than 90%.

[![Code Coverage](https://codecov.io/gh/alessandro-marcantoni/scala-types/branch/main/graphs/sunburst.svg?token=XYLPRNEPSK)](https://app.codecov.io/gh/alessandro-marcantoni/scala-types)
