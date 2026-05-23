import { describe, expect, it } from "vitest"
import { createBetterAuth } from "./create-better-auth.ts"

const createAuthForTest = () =>
  createBetterAuth({
    client: { db: {} } as never,
    baseUrl: "http://localhost:3000",
    secret: "test-secret-with-at-least-32-characters",
    googleClientId: "google-client-id",
    googleClientSecret: "google-client-secret",
    githubClientId: "github-client-id",
    githubClientSecret: "github-client-secret",
    sendMagicLink: async () => {},
    sendInvitationEmail: async () => {},
  })

describe("createBetterAuth", () => {
  it("hardens OAuth account linking and state validation", async () => {
    const auth = createAuthForTest()

    expect(auth.options.account).toMatchObject({
      storeStateStrategy: "database",
      skipStateCookieCheck: false,
      accountLinking: {
        disableImplicitLinking: true,
        allowDifferentEmails: false,
        updateUserInfoOnLink: false,
      },
    })
  })

  it("does not let OAuth sign-in overwrite local user profile fields", async () => {
    const auth = createAuthForTest()

    const googleProvider = auth.options.socialProviders.google
    if (!googleProvider) throw new Error("Google provider should be configured")

    const google = await googleProvider()

    expect(google).not.toHaveProperty("overrideUserInfoOnSignIn")
    expect(auth.options.socialProviders.github).not.toHaveProperty("overrideUserInfoOnSignIn")
  })
})
