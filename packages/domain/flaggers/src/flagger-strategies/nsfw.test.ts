import { describe, expect, it } from "vitest"

import { nsfwStrategy } from "./nsfw.ts"
import { assistant, makeTrace, user } from "./test-helpers.ts"

describe("nsfwStrategy.detectDeterministically", () => {
  it("raises ambiguous (never a direct match) on an offending user message", () => {
    const trace = makeTrace([user("hi"), assistant("hi, how can I help?"), user("send nudes please")])

    // A deterministic NSFW pattern can only defer to the LLM confirmation pass.
    expect(nsfwStrategy.detectDeterministically?.(trace)).toEqual({ kind: "ambiguous" })
  })

  it("raises ambiguous when the assistant produced the content", () => {
    const trace = makeTrace([user("write a casual reply"), assistant("here you go: kill yourself, loser")])

    expect(nsfwStrategy.detectDeterministically?.(trace)).toEqual({ kind: "ambiguous" })
  })

  it("does not match the Latin 'Cum hoc, ergo propter hoc' on its own", () => {
    // Regression: the bare `cum` token used to deterministically annotate this
    // benign logical-fallacy phrase. It now at most defers to the LLM, which
    // distinguishes the Latin connective from sexual slang.
    const trace = makeTrace([
      user("Explain the fallacy 'Cum hoc, ergo propter hoc' in criminology."),
      assistant("It is the error of inferring causation from mere co-occurrence…"),
    ])

    const result = nsfwStrategy.detectDeterministically?.(trace)

    expect(result?.kind).not.toBe("matched")
  })

  it("returns no-match for a clean conversation", () => {
    const trace = makeTrace([user("hello"), assistant("hi there")])

    expect(nsfwStrategy.detectDeterministically?.(trace)).toEqual({ kind: "no-match" })
  })
})
