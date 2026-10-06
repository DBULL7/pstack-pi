---
name: principle-test-behavior-not-implementation
description: "Apply when you write, change, or keep a test. Call the code the way its users do and assert an observable result or effect against an independent expectation. Judge the test by the regression it catches, not its matcher names."
disable-model-invocation: true
---

# Test Behavior, Not Implementation

A test calls the code the way its users do and asserts an observable result or effect against an independent expectation. Use literal expected values for concrete examples, or a relation or invariant when that is the contract.

**The check:** Name the regression the test should catch. When coverage is uncertain, run it against the pre-fix implementation or a targeted mutation and confirm it fails for the intended reason. A subject that returns `undefined` is one possible mutation, not a universal test-quality gate. Passing that mutation does not prove a test catches nothing.

**Why:** Tests should protect behavior while allowing the implementation to change. Matcher names alone do not establish whether a test observes behavior.

**Review the assertion in context:**

- **Concrete results.** `expect(search("missing")).toEqual([])` checks an observable empty result and fails if the subject returns `undefined` or an unexpected item. `toBeDefined`, `toBeTruthy`, and `toHaveLength(0)` also reject `undefined`; choose the assertion that captures the required behavior.
- **Absence and side effects.** An absent result, no exception, or a forbidden call can be the contract. Exercise the trigger and check the observable absence or effect. Add a contrasting input when it proves the setup is sensitive, without requiring both cases in one test.
- **Mocks.** Prefer observable output, state, or a boundary payload over internal call choreography. A call or call count is appropriate when the interaction itself is the contract, such as sending a notification exactly once.
- **Independent expectations.** `expect(f(a)).toBe(f(a))` cannot detect a consistently wrong result. Avoid deriving the expected value through the same implementation. Test the mechanism that consumes a constant unless the constant itself is a public contract.
- **Fixtures.** The subject must run before the observation. Setup hooks are valid; assertions that only read untouched fixture data do not test the subject.

Strengthen or remove a test only after examining what it executes and which defect its assertion detects. Do not delete regression coverage solely because it uses one of these matchers.

Keep useful property, relation, and compile-time tests, including table consistency checks and `*.test-d.ts` files.
