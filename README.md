<div align="center">
  <img src="https://github.com/igorskyflyer/npm-simple-exec/raw/main/assets/simple-exec.png" title="SimpleExec - Command. Execution. Made. Simple." alt="SimpleExec" width="180" height="180">
</div>

<h1 align="center">SimpleExec</h1>

<br>

<div align="center">
  <em>🕺Command.</em> <strong>Execution.</strong> <em>Made.</em> <strong>Simple. ▶</strong>
</div>

<br>
<br>

<div align="center">
  <blockquote>
    <br>
    <h4>💖 Support further development</h4>
    <span>I work hard for every project, including this one
    <br>
    and your support means a lot to me!
    <br>
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
    <br>
  </blockquote>
</div>

<br>
<br>

## 📃 Table of contents

- [Usage](#-usage)
- [API](#-api)
  - [Types](#types)
    - [ExecResult](#execresult)
    - [ExecCallback](#execcallback)
  - [Functions](#functions)
    - [executeSync()](#executesynccommand-string-execresult)
    - [executeCallback()](#executecallbackcommand-string-callback-execcallback-void)
    - [execute()](#executecommand-string-promisestring)
    - [executeParallel(...commands)](#executeparallelcommands-string-promisestring)
    - [executeParallel(commands)](#executeparallelcommands-string-promisestring-1)
- [Examples](#-examples)
- [Changelog](#-changelog)
- [License](#-license)
- [Related](#-related)
- [Author](#-author)

<br>
<br>

## 🕵🏼 Usage

Install it by executing:

```shell
npm i '@igor.dvlpr/simple-exec'
```

<br>

## 🤹🏼 API

The API exposes two types:

- `ExecResult`
- `ExecCallback`

<br>

### Types

#### `ExecResult`

A simple object structured as:  

```ts
{ 
  error: string,
  output: string
}
```

<br>

#### `ExecCallback`

A callback with the method signature of:  

```ts
type ExecCallback = (result: ExecResult) => void
```

---

### Functions

#### `executeSync(command: string): ExecResult`

*Synchronously executes the specified command.*  

`command` - Command to execute.  

<br>

Will throw an error if no command is provided.  
Returns the `ExecResult` object with standard and error outputs.

<br>

```js
import { executeSync } from '@igor.dvlpr/simple-exec'

const result = executeSync('dir /b')

if (result.error) {
  console.error(result.error) // log the error
} else {
  console.log(result.output) // log the contents of the directory
}
```

---

#### `executeCallback(command: string, callback: ExecCallback): void`

*Asynchronously, with a callback executes the specified command.*  

`command` - Command to execute.  
`callback` - The function to call after the command is executed.

<br>

Will throw an error if no command is provided.

<br>

```js
import { executeCallback } from '@igor.dvlpr/simple-exec'

executeCallback('node --version', (result) => {
  if (result.error) {
    console.error(result.error) // log the error
  } else {
    console.log(result.output) // log Node version
  }
})
```

---

#### `execute(command: string): Promise<string>`

*Asynchronously executes the specified command.*  

`command` - Command to execute.  

<br>

Will throw an error if no command is provided.  
Returns the standard output.

<br>

```js
import { execute } from '@igor.dvlpr/simple-exec'

try {
  const result: string = await execute('npm --version')

  console.log(result) // log NPM version
} catch (exp) {
  console.error(exp) // log the error
}
```

---

#### `executeParallel(...commands: string[]): Promise<string[]>;`

*Asynchronously and in parallel executes the specified commands.*  

`commands` - Commands to execute, rest string parameters, e.g. `executeParallel('command-one', 'command-two', 'command-three')`.  

<br>

Will throw an error if any of the commands causes an error.  
Returns the standard output of each command.

<br>

```js
import { executeParallel } from '@igor.dvlpr/simple-exec'

try {
  const results: string[] = await executeParallel('npm --version', 'node --version', 'npm pack')
  console.log(results) // log the results which is a string array
}
catch(exp) {
  console.error(exp) // log the error
}
```

---

#### `executeParallel(commands: string[]): Promise<string[]>`

*Asynchronously and in parallel executes the specified commands.*  

`commands` - Commands to execute, a string array, e.g. `executeParallel(['command-one', 'command-two', 'command-three'])`.  

<br>

Will throw an error if any of the commands causes an error.  
Returns the standard output of each command.

<br>

```js
import { executeParallel } from '@igor.dvlpr/simple-exec'

try {
 const results: string[] = executeParallel(['npm --version', 'node --version', 'npm pack'])
  console.log(results) // log the results which is a string array
}
catch(exp) {
  console.error(exp) // log the error
}
```

---

## ✨ Examples

`example.ts`
```ts
import { executeParallel } from '@igor.dvlpr/simple-exec'

const result: string[] = await executeParallel([
  'npm --version',
  'node --version',
  'npm --version'
]) // will log ['<npm version>', '<Node version>', '<npm version>']
  // e.g. [ '10.8.2', 'v22.5.1', '10.8.2' ]
```

---

## 📝 Changelog

📑 The changelog is available here: [CHANGELOG.md](https://github.com/igorskyflyer/npm-simple-exec/blob/main/CHANGELOG.md).

---

## 🪪 License

Licensed under the MIT license which is available here, [MIT license](https://github.com/igorskyflyer/npm-simple-exec/blob/main/LICENSE).

---

## 🧬 Related

[@igor.dvlpr/mp3size](https://www.npmjs.com/package/@igor.dvlpr/mp3size)

> _🧮 Calculates an estimated file size of Mp3 files. 🎶_

<br>

[@igor.dvlpr/windev](https://www.npmjs.com/package/@igor.dvlpr/windev)

> _🍃 Provides ways of checking whether a path is a legacy Windows device. 💾_

<br>

[@igor.dvlpr/emojilyzer](https://www.npmjs.com/package/@igor.dvlpr/emojilyzer)

> _💬 Emojifies strings, converting textual representations of emojis to graphical ones. 🖌️_

<br>

[@igor.dvlpr/astro-post-excerpt](https://www.npmjs.com/package/@igor.dvlpr/astro-post-excerpt)

> _⭐ An Astro component that renders post excerpts for your Astro blog - directly from your Markdown and MDX files. Astro v2+ collections are supported as well! 💎_

<br>

[@igor.dvlpr/scrollend-polyfill](https://www.npmjs.com/package/@igor.dvlpr/scrollend-polyfill)

> _🛴 A performant and light (< 1.5KB) JavaScript polyfill for the scrollend Event. ⛸️_

---

<br>

### 👨🏻‍💻 Author
Created by **Igor Dimitrijević** ([*@igorskyflyer*](https://github.com/igorskyflyer/)).
