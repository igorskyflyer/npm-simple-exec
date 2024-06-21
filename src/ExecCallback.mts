// Author: Igor Dimitrijević (@igorskyflyer)

import { ExecResult } from './ExecResult.mjs'

export interface ExecCallback {
 (result: ExecResult): void
}
