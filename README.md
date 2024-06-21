<p align="center">
	<img src="https://github.com/igorskyflyer/npm-simple-exec/raw/main/assets/simple-exec.png" title="SimpleExec - Command. Execution. Made. Simple." alt="SimpleExec" width="180" height="180">
</p>

<h2 align="center">SimpleExec</h2>

<p align="center">
	<em>Command.</em> <strong>Execution.</strong> <em>Made.</em> <strong>Simple.</strong>
</p>

<br>


<p align="center">
 <a href="#table-of-contents">Table of contents</a>
 &nbsp;&#8226;&nbsp;
 <a href="#install">Install</a>
 &nbsp;&#8226;&nbsp;
 <a href="#releases">Releases</a>
 &nbsp;&#8226;&nbsp;
 <a href="#api">API</a>
</p>

<br>
<br>

<div align="center">
	<blockquote>
		<h4>💖 Support further development</h4>
		<span>I work hard for every project, including this one and your support means a lot to me!
		<br>
		Consider buying me a coffee. ☕
		<br>
		<strong>Thank you for supporting my efforts! 🙏😊</strong></span>
		<br>
		<br>
		<a href="https://ko-fi.com/igorskyflyer" target="_blank"><img src="https://raw.githubusercontent.com/igorskyflyer/igorskyflyer/main/assets/ko-fi.png" alt="Donate to igorskyflyer" width="150"></a>
		<br>
		<br>
		<a href="https://github.com/igorskyflyer"><em>@igorskyflyer</em></a>
		<br>
		<br>
	</blockquote>
</div>

<br>
<br>
<br>

## Table of contents

- [Usage](#-usage)
- [API](#-api)
  - [executeSync&#40;&#41;](#executesynccommand-string-execresult)
  - [executeCallback&#40;&#41;](#executecallbackcommand-string-callback-execcallback-void)
  - [execute&#40;&#41;](#executecommand-string-promisestring)
  - [executeParallel&#40;&#41;](#executeparallelargs-string-promisestring)
- [Test](#-test)
- [License](#-license)
- [Related](#-related)

<br>

## 🕵🏼 Usage

Install it by executing:

```shell
npm i "@igor.dvlpr/simple-exec"
```

<br>

## 🤹🏼 API

### `ExecResult { error: string, output: string }`

### `ExecCallback(result: ExecResult)`

<br>

### `executeSync(command: string): ExecResult`

_Synchronously runs the specified command._

<br>

```js
import * as simple from 'simple-exec'

const result = simple.executeSync('dir /b')

if (result.error) {
  console.error(result.error) // log the error
} else {
  console.log(result.output) // log the contents of the directory
}
```

<br>

### `executeCallback(command: string, callback: ExecCallback): void`

_Asynchronously, with a callback runs the specified command._

<br>

```js
import * as simple from 'simple-exec'

simple.executeCallback('node --version', (result) => {
  if (result.error) {
    console.error(result.error) // log the error
  } else {
    console.log(result.output) // log Node version
  }
})
```

<br>

### `execute(command: string): Promise<string>`

_Asynchronously runs the specified command._

<br>

#### Example 1 - async/await

```js
import * as simple from 'simple-exec'

try {
  const result = await simple.execute('npm --version')

  console.log(result) // log NPM version
} catch (exp) {
  console.error(result.error) // log the error
}
```

<br>

#### Example 2 - async/then

```js
import * as simple from 'simple-exec'

simple
  .execute('npm --version')
  .then((version) => {
    console.log(version) // log NPM version
  })
  .catch((error) => {
    console.error(error) // log the error
  })
```

<br>

### `executeParallel(args: ...string): Promise<string[]>;`

_Asynchronously and in parallel runs the specified commands._

```js
import * as simple from 'simple-exec'

simple
  .executeParallel('npm --version', 'node --version', 'npm pack')
  .then((results) => {
    console.log(results) // log the results which is a string array
  })
  .catch((error) => {
    console.error(error) // log the error
  })
```

<br>

### `executeParallel(args: string[]): Promise<string[]>`

_Asynchronously and in parallel runs the specified commands._

```js
import * as simple from 'simple-exec'

simple
  .executeParallel(['npm --version', 'node --version', 'npm pack'])
  .then((results) => {
    console.log(results) // log the results which is a string array
  })
  .catch((error) => {
    console.error(error) // log the error
  })
```

<br>

## 🧪 Test

```js
npm i && npm test
```

---

## 🪪 License

Licensed under the MIT license which is available here, [MIT license](https://github.com/igorskyflyer/npm-simple-exec/blob/main/LICENSE).

---

## 🧬 Related

[]()

> __

[]()

> __

[]()

> __

[]()

> __

[]()

> __
