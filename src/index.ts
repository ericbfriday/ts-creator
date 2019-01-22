import { transformSourceFile } from './transformer'
import { createPrinter, createSourceFile, ScriptTarget } from 'typescript'

import { Options as PrettierOptions, format } from 'prettier/standalone'
import tsPlugin from 'prettier/parser-typescript'

export interface Options {
  prettierOptions?: Options
}

const defaultPrettierOptions: PrettierOptions = {
  parser: 'typescript',
  plugins: [tsPlugin],
  semi: false,
  singleQuote: true,
  jsxSingleQuote: false,
  bracketSpacing: true,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'none',
  proseWrap: 'preserve'
}

export default function create(code: string, options: Options = {}): string {
  const printer = createPrinter()
  const file = createSourceFile('templory.ts', code, ScriptTarget.Latest)
  const factoryFile = transformSourceFile(file)
  const factoryCode = printer.printFile(factoryFile)

  const prettierOptions = {
    ...defaultPrettierOptions,
    ...options.prettierOptions
  }
  return format(factoryCode, prettierOptions)
}

export { transformNode, transformSourceFile } from './transformer'
