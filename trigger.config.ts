import { defineConfig } from "@trigger.dev/sdk/v3";
import { additionalPackages } from "@trigger.dev/build/extensions/core";
import { prismaExtension } from "@trigger.dev/build/extensions/prisma";

export default defineConfig({
  build: {
    extensions: [
      prismaExtension({
        schema: "prisma/schema.prisma",
        /**
         * Not providing a version does not detect the `@prisma/client` version and fails silently.
         * Providing a version does not fix the issue as `@prisma/client` is not added to the generated `package.json`.
         */
        // version: "5.22.0",
      }),

      /**
       * This workaround fixes the `prismaExtension`'s auto-detection of the `@prisma/client` version and adds `@prisma/client` to the generated `package.json`.
       */
      // additionalPackages({
      //   packages: ["@prisma/client@5.22.0"],
      // }),
    ],
  },
  dirs: ["src/trigger"],
  logLevel: "log",
  machine: "micro",
  maxDuration: 300,
  project: "proj_xkdjiokwjkrbdyuoadjd", // TODO: replace with your project ID
  retries: {
    default: {
      factor: 2,
      maxAttempts: 3,
      maxTimeoutInMs: 10000,
      minTimeoutInMs: 1000,
      randomize: true,
    },
    enabledInDev: false,
  },
});
