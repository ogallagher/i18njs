# i18njs

Internationalisation library for JS projects

For more information, demo and examples please checkout [http://i18njs.com](http://i18njs.com)

Available via npm as ```npm install roddeh-i18n```


## Use with TypeScript

i18njs comes with typings for TypeScript. To use these typings in your project, they have to be imported explicitly. Simply create a `*.d.ts` file in your project folder and add the following content to it:

```TypeScript
declare module "roddeh-i18n" {
  import i18n from "roddeh-i18n/typings";
  export default i18n;
}
```

## `ogallagher-i18n` features

### Support promises as extension method returns

Both of the following patterns should work as of version `1.2.3`:

```javascript
const i18n = require('i18n')

const en = i18n.create({values: {
  '%n is even': {
    'even': 'yes, %n is even',
    'odd': 'no, %n is not even'
  }
}})

// existing pattern, extension as plain function
en.extend((text, num, formatting, data) => data[num % 2 === 0 ? 'even' : 'odd'])
console.log(en('%n is even', 2)) // yes, 2 is even

// new pattern, extension as simple promise
en.extend((text, num, formatting, data) => new Promise((res) => {
  res(data[num % 2 === 0 ? 'even' : 'odd'])
}))
en('%n is even', 2).then(console.log) // yes, 2 is even
```

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.


## Authors

* **Simon Rodwell** - *Initial work* - [roddeh](https://github.com/roddeh)

See also the list of [contributors](https://github.com/roddeh/i18njs/contributors) who participated in this project.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
