<div align="center">
  <img src="https://raw.githubusercontent.com/igorskyflyer/npm-simple-exec/main/media/simple-exec.png" alt="Icon of SimpleExec" width="256" height="256">
<h1 align="center">SimpleExec</h1>
</div>

<br>

<div align="center">
  🕺 Command. Execution. Made. Simple. ▶
</div>

<br>
<br>

## 📃 Table of Contents

- [Features](#-features)
- [Usage](#-usage)
- [API](#-api)
- [Changelog](#-changelog)
- [Support](#-support)
- [License](#-license)
- [Related](#-related)
- [Author](#-author)

<br>
<br>

## 🤖 Features

- ⚡ Synchronous command execution with trimmed output
- ⏳ Asynchronous command execution with error handling
- 📞 Callback-based result delivery for executed commands
- 📤 Promise-based command execution returning standard output
- 🧩 Parallel execution of multiple commands in one call
- 🛡️ Input validation with descriptive error messages
- 🗂️ Flexible support for both rest parameters and string arrays
- 🧹 Automatic trimming of standard output for clean results

<br>
<br>

## 🕵🏼 Usage

Install it by executing any of the following, depending on your preferred package manager:

```bash
pnpm add @igorskyflyer/simple-exec
```

```bash
yarn add @igorskyflyer/simple-exec
```

```bash
npm i @igorskyflyer/simple-exec
```

<br>
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
import { executeSync } from '@igorskyflyer/simple-exec'

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
import { executeCallback } from '@igorskyflyer/simple-exec'

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
import { execute } from '@igorskyflyer/simple-exec'

try {
  const result: string = await execute('npm --version')

  console.log(result) // log NPM version
} catch(exp) {
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
import { executeParallel } from '@igorskyflyer/simple-exec'

try {
  const results: string[] = await executeParallel('npm --version', 'node --version', 'npm pack')
  console.log(results) // log the results which is a string array
} catch(exp) {
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
import { executeParallel } from '@igorskyflyer/simple-exec'

try {
 const results: string[] = executeParallel(['npm --version', 'node --version', 'npm pack'])
  console.log(results) // log the results which is a string array
} catch(exp) {
  console.error(exp) // log the error
}
```

---

## ✨ Examples

`example.ts`
```ts
import { executeParallel } from '@igorskyflyer/simple-exec'

const result: string[] = await executeParallel([
  'npm --version',
  'node --version',
  'npm --version'
]) // will log ['<npm version>', '<Node version>', '<npm version>']
  // e.g. [ '10.8.2', 'v22.5.1', '10.8.2' ]
```



<br>
<br>

## 📝 Changelog

📑 The changelog is available here, [CHANGELOG.md](https://github.com/igorskyflyer/npm-simple-exec/blob/main/CHANGELOG.md).

<br>
<br>

## 🪪 License

Licensed under the MIT license which is available here, [MIT license](https://github.com/igorskyflyer/npm-simple-exec/blob/main/LICENSE.txt).

<br>
<br>

## 💖 Support

<div align="center">
  I work hard for every project, including this one and your support means a lot to me!
  <br>
  Consider buying me a coffee. ☕
  <br>
  <br>
  <a href="https://ko-fi.com/igorskyflyer" target="_blank"><img src="https://raw.githubusercontent.com/igorskyflyer/igorskyflyer/main/assets/ko-fi.png" alt="Donate to igorskyflyer" width="180" height="46"></a>
  <br>
  <br>
  <em>Thank you for supporting my efforts!</em> 🙏😊
</div>

<br>
<br>

## 🧬 Related

[@igorskyflyer/mp3size](https://www.npmjs.com/package/@igorskyflyer/mp3size)

> _🧮 Calculates an estimated file size of Mp3 files. 🎶_

<br>

[@igorskyflyer/windev](https://www.npmjs.com/package/@igorskyflyer/windev)

> _🍃 Provides ways of checking whether a path is a legacy Windows device. 💾_

<br>

[@igorskyflyer/emojilyzer](https://www.npmjs.com/package/@igorskyflyer/emojilyzer)

> _💬 Emojifies strings, converting textual representations of emojis to graphical ones. 🖌️_

<br>

[@igorskyflyer/astro-post-excerpt](https://www.npmjs.com/package/@igorskyflyer/astro-post-excerpt)

> _⭐ An Astro component that renders post excerpts for your Astro blog - directly from your Markdown and MDX files. Astro v2+ collections are supported as well! 💎_

<br>

[@igorskyflyer/scrollend-polyfill](https://www.npmjs.com/package/@igorskyflyer/scrollend-polyfill)

> _🛴 A performant and light (< 1.5KB) JavaScript polyfill for the scrollend Event. ⛸️_

<br>
<br>
<br>

## 👨🏻‍💻 Author
Created by **Igor Dimitrijević** ([*@igorskyflyer*](https://github.com/igorskyflyer/)).
